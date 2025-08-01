const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const db = new sqlite3.Database(':memory:'); // 메모리 DB (실사용시 파일DB로 변경)

// DB 초기화
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
  db.run(`CREATE TABLE documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE,
    content TEXT,
    creator_id INTEGER,
    creator_ip TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(id)
  )`);
});

// 정적 파일 제공
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'peanutwiki_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// --- 회원가입 ---
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '아이디와 비밀번호 필요' });
  const hash = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function(err) {
    if (err) return res.status(400).json({ error: '이미 존재하는 아이디' });
    res.json({ message: '회원가입 성공' });
  });
});

// --- 로그인 ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '아이디와 비밀번호 필요' });
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: '아이디 또는 비밀번호 오류' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: '아이디 또는 비밀번호 오류' });
    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ message: '로그인 성공', username: user.username });
  });
});

// --- 로그아웃 ---
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: '로그아웃 완료' });
});

// --- 로그인 상태 확인 ---
app.get('/api/me', (req, res) => {
  if (!req.session.userId) return res.json({ loggedIn: false });
  res.json({ loggedIn: true, username: req.session.username });
});

// --- 틀 템플릿 함수 ---
const templates = {
  국기: ({ 국명 }) => `<img src="/images/flags/${국명}.png" alt="${국명} 국기" style="width:50px">`,
  // 필요한 틀들 여기에 추가 가능
};

// --- 틀 치환 함수 ---
function renderTemplates(text) {
  return text.replace(/\[include\(틀:([^\),]+)(?:, *([^\)]+))?\)\]/g, (m, tmplName, paramsStr) => {
    const params = {};
    if (paramsStr) {
      paramsStr.split(',').forEach(p => {
        const [k,v] = p.split('=');
        if (k && v) params[k.trim()] = v.trim();
      });
    }
    if (templates[tmplName]) return templates[tmplName](params);
    return m;
  });
}

// --- 위키 문법 파서 (기본) ---
function parseWiki(raw) {
  let html = raw;

  // 틀 치환
  html = renderTemplates(html);

  // 굵은 글씨 '''text'''
  html = html.replace(/'''(.*?)'''/g, '<b>$1</b>');

  // 링크 [[문서명]]
  html = html.replace(/\[\[([^\]|]+)(\|([^\]]+))?\]\]/g, (m, p1, p2, p3) => {
    const label = p3 || p1;
    const href = `/wiki/${encodeURIComponent(p1)}`;
    return `<a href="${href}">${label}</a>`;
  });

  // 간단 표 변환 (||cell||cell|| 형식, 여러줄 지원)
  const lines = html.split('\n');
  let insideTable = false;
  let tableHtml = '';
  const resultLines = [];

  lines.forEach(line => {
    if (line.includes('||')) {
      const cells = line.split('||').filter(Boolean).map(c => `<td>${c.trim()}</td>`).join('');
      if (!insideTable) {
        insideTable = true;
        tableHtml = `<table border="1" style="border-collapse: collapse;">`;
      }
      tableHtml += `<tr>${cells}</tr>`;
    } else {
      if (insideTable) {
        tableHtml += '</table>';
        resultLines.push(tableHtml);
        insideTable = false;
        tableHtml = '';
      }
      resultLines.push(line);
    }
  });
  if (insideTable) {
    tableHtml += '</table>';
    resultLines.push(tableHtml);
  }

  html = resultLines.join('<br>');

  // 인용문 > text
  html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');

  // 유튜브 [youtube(영상ID)]
  html = html.replace(/\[youtube\((.*?)\)\]/g, (m, id) => {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
  });

  // 줄바꿈
  html = html.replace(/\n/g, '<br>');

  return html;
}

// --- 문서 생성 ---
app.post('/api/documents', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: '로그인 필요' });
  const { title, content } = req.body;
  const ip = req.ip;
  if (!title || !content) return res.status(400).json({ error: '제목과 내용 필요' });

  db.run(
    'INSERT INTO documents (title, content, creator_id, creator_ip) VALUES (?, ?, ?, ?)',
    [title, content, req.session.userId, ip],
    function(err) {
      if (err) return res.status(400).json({ error: '문서 제목 중복 또는 오류' });
      res.json({ id: this.lastID, message: '문서 생성 성공' });
    }
  );
});

// --- 문서 수정 (작성자만 가능) ---
app.put('/api/documents/:id', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: '로그인 필요' });
  const id = req.params.id;
  const { content } = req.body;

  db.get('SELECT creator_id FROM documents WHERE id = ?', [id], (err, doc) => {
    if (err || !doc) return res.status(404).json({ error: '문서 없음' });
    if (doc.creator_id !== req.session.userId) return res.status(403).json({ error: '권한 없음' });

    db.run(
      'UPDATE documents SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [content, id],
      err => {
        if (err) return res.status(500).json({ error: '수정 실패' });
        res.json({ message: '문서 수정 완료' });
      }
    );
  });
});

// --- 문서 조회 (파싱된 HTML 포함) ---
app.get('/api/documents/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM documents WHERE id = ?', [id], (err, doc) => {
    if (err || !doc) return res.status(404).json({ error: '문서 없음' });
    const parsedContent = parseWiki(doc.content);
    res.json({
      id: doc.id,
      title: doc.title,
      rawContent: doc.content,
      parsedContent,
      creator_id: doc.creator_id,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    });
  });
});

// --- 문서 목록 ---
app.get('/api/documents', (req, res) => {
  db.all('SELECT id, title, created_at, updated_at FROM documents ORDER BY updated_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: '문서 목록 조회 실패' });
    res.json(rows);
  });
});

// --- 문서 제목으로 조회 ---
app.get('/api/documents/title/:title', (req, res) => {
  const title = decodeURIComponent(req.params.title);
  db.get('SELECT * FROM documents WHERE title = ?', [title], (err, doc) => {
    if (err || !doc) return res.status(404).json({ error: '문서 없음' });
    const parsedContent = parseWiki(doc.content);
    res.json({
      id: doc.id,
      title: doc.title,
      rawContent: doc.content,
      parsedContent,
      creator_id: doc.creator_id,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    });
  });
});

// --- 프론트엔드 라우팅 ---
app.get('/wiki/:title', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'wiki.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`땅콩위키 서버 실행 중 - http://localhost:${PORT}`);
});