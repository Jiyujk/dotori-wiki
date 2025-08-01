# 🥜 땅콩위키 (Peanut Wiki)

한국어 위키 문법을 지원하는 간단하고 현대적인 위키 애플리케이션입니다.

## 🌟 주요 기능

- **사용자 인증**: 안전한 회원가입/로그인 시스템 (bcrypt 암호화)
- **위키 문법 지원**: 다양한 위키 마크업 문법 파싱
- **문서 관리**: 문서 생성, 수정, 조회 (작성자만 편집 가능)
- **템플릿 시스템**: 재사용 가능한 템플릿 (틀) 기능
- **현대적 UI**: 반응형 디자인과 아름다운 인터페이스
- **실시간 미리보기**: 위키 문법이 HTML로 실시간 변환

## 🛠️ 기술 스택

- **Backend**: Node.js, Express.js
- **Database**: SQLite3 (메모리 DB, 파일 DB로 변경 가능)
- **Authentication**: express-session, bcrypt
- **Frontend**: Vanilla JavaScript, CSS3

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd peanut-wiki
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 서버 실행
```bash
npm start
# 또는 개발 모드로
npm run dev
```

### 4. 웹 브라우저에서 접속
```
http://localhost:4000
```

## 📝 위키 문법 가이드

### 기본 문법

| 문법 | 결과 | 설명 |
|------|------|------|
| `'''굵은 글씨'''` | **굵은 글씨** | 텍스트를 굵게 표시 |
| `[[문서명]]` | [링크](링크) | 다른 문서로 링크 |
| `[[문서명\|표시텍스트]]` | [표시텍스트](링크) | 커스텀 링크 텍스트 |

### 표 만들기
```
||헤더1||헤더2||헤더3||
||셀1||셀2||셀3||
||셀4||셀5||셀6||
```

### 인용문
```
> 이것은 인용문입니다.
> 여러 줄도 가능합니다.
```

### 유튜브 동영상 삽입
```
[youtube(영상ID)]
```

### 템플릿 사용
```
[include(틀:국기, 국명=한국)]
```

## 🔧 API 엔드포인트

### 인증
- `POST /api/register` - 회원가입
- `POST /api/login` - 로그인
- `POST /api/logout` - 로그아웃
- `GET /api/me` - 로그인 상태 확인

### 문서 관리
- `GET /api/documents` - 문서 목록 조회
- `GET /api/documents/:id` - 특정 문서 조회
- `GET /api/documents/title/:title` - 제목으로 문서 조회
- `POST /api/documents` - 새 문서 생성 (로그인 필요)
- `PUT /api/documents/:id` - 문서 수정 (작성자만 가능)

## 📁 프로젝트 구조

```
peanut-wiki/
├── server.js              # 메인 서버 파일
├── package.json           # 프로젝트 설정
├── README.md             # 프로젝트 문서
└── public/               # 정적 파일
    ├── index.html        # 메인 페이지
    ├── wiki.html         # 문서 보기 페이지
    └── images/           # 이미지 파일
        └── flags/        # 국기 이미지 (템플릿용)
```

## 🎯 사용 방법

### 1. 회원가입 및 로그인
1. 첫 방문 시 회원가입을 진행합니다
2. 등록된 계정으로 로그인합니다

### 2. 문서 작성
1. 로그인 후 "새 문서 작성" 버튼을 클릭합니다
2. 제목과 내용을 입력합니다 (위키 문법 사용 가능)
3. "문서 생성" 버튼을 클릭하여 저장합니다

### 3. 문서 보기 및 편집
1. 문서 목록에서 원하는 문서를 클릭합니다
2. 작성자는 "문서 편집" 버튼으로 수정할 수 있습니다
3. 위키 링크를 통해 다른 문서로 이동할 수 있습니다

## 🔒 보안 기능

- **비밀번호 암호화**: bcrypt를 사용한 안전한 비밀번호 해싱
- **세션 관리**: express-session을 통한 사용자 세션 관리
- **권한 제어**: 문서 편집은 작성자만 가능
- **SQL 인젝션 방지**: 매개변수화된 쿼리 사용

## ⚙️ 설정 변경

### 데이터베이스 변경
`server.js`에서 메모리 DB를 파일 DB로 변경:
```javascript
// 변경 전
const db = new sqlite3.Database(':memory:');

// 변경 후 (파일 DB)
const db = new sqlite3.Database('./wiki.db');
```

### 포트 변경
`server.js` 마지막 부분에서 포트 변경:
```javascript
const PORT = 4000; // 원하는 포트로 변경
```

### 세션 시크릿 변경
`server.js`에서 세션 시크릿 변경:
```javascript
app.use(session({
  secret: 'your-secret-key-here', // 안전한 키로 변경
  resave: false,
  saveUninitialized: true,
}));
```

## 🎨 템플릿 추가

`server.js`의 `templates` 객체에 새로운 템플릿을 추가할 수 있습니다:

```javascript
const templates = {
  국기: ({ 국명 }) => `<img src="/images/flags/${국명}.png" alt="${국명} 국기" style="width:50px">`,
  인용: ({ 내용, 출처 }) => `<blockquote>"${내용}" - ${출처}</blockquote>`,
  // 새로운 템플릿 추가
};
```

## 🐛 문제 해결

### 일반적인 문제들

1. **서버가 시작되지 않는 경우**
   - 포트 4000이 이미 사용 중인지 확인
   - `npm install`로 의존성이 제대로 설치되었는지 확인

2. **로그인이 안 되는 경우**
   - 브라우저 쿠키/세션 삭제 후 재시도
   - 회원가입 시 사용한 정확한 아이디/비밀번호 확인

3. **문서가 표시되지 않는 경우**
   - 브라우저의 개발자 도구에서 콘솔 오류 확인
   - 서버 로그 확인

## 📄 라이센스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 있거나 개선 제안이 있으시면 이슈를 생성해주세요.

---

**Made with ❤️ for the Korean wiki community**