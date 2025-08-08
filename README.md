<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>땅콩위키 - 자유로운 지식 공유</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');
        body {
            font-family: 'Noto Sans KR', sans-serif;
        }
        .wiki-content {
            line-height: 1.8;
        }
        .wiki-content h1 { font-size: 1.875rem; font-weight: 700; margin: 1.5rem 0 1rem 0; }
        .wiki-content h2 { font-size: 1.5rem; font-weight: 600; margin: 1.25rem 0 0.75rem 0; }
        .wiki-content h3 { font-size: 1.25rem; font-weight: 500; margin: 1rem 0 0.5rem 0; }
        .wiki-content p { margin: 0.75rem 0; }
        .wiki-content ul, .wiki-content ol { margin: 0.75rem 0; padding-left: 1.5rem; }
        .wiki-content li { margin: 0.25rem 0; }
        .wiki-table { border-collapse: collapse; margin: 1rem 0; }
        .wiki-table td { border: 1px solid #ddd; padding: 8px; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <header class="bg-orange-600 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <h1 class="text-2xl font-bold cursor-pointer" onclick="showMainPage()">🥜 땅콩위키</h1>
                    <nav class="hidden md:flex space-x-4">
                        <button onclick="showMainPage()" class="hover:text-orange-200 transition-colors">메인</button>
                        <button onclick="showRandomPage()" class="hover:text-orange-200 transition-colors">랜덤</button>
                        <button onclick="showRecentChanges()" class="hover:text-orange-200 transition-colors">최근 변경</button>
                        <button onclick="showHelp()" class="hover:text-orange-200 transition-colors">도움말</button>
                        <button onclick="showWikiStats()" class="hover:text-orange-200 transition-colors">통계</button>
                        <button id="adminMenu" onclick="showAdminPanel()" class="hover:text-orange-200 transition-colors bg-orange-800 px-2 py-1 rounded" style="display: none;">👑 관리</button>
                    </nav>
                </div>
                <div class="flex items-center space-x-4">
                    <span id="userInfo" class="text-sm cursor-pointer" onclick="showUserStats()" title="내 통계 보기"></span>
                    <button id="registerBtn" onclick="showRegisterPage()" class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition-colors text-sm">
                        회원가입
                    </button>
                    <button id="loginBtn" onclick="toggleLogin()" class="bg-orange-700 hover:bg-orange-800 px-3 py-1 rounded transition-colors">
                        로그인
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- 검색 바 -->
    <div class="bg-white border-b shadow-sm">
        <div class="container mx-auto px-4 py-3">
            <div class="flex items-center space-x-2">
                <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="문서 제목을 검색하세요..."
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    onkeypress="if(event.key==='Enter') searchWiki()"
                >
                <button onclick="searchWiki()" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors">
                    검색
                </button>
                <button onclick="showCreatePage()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                    + 새 문서
                </button>
            </div>
        </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <main class="container mx-auto px-4 py-6">
        <div class="flex flex-col gap-6">
            <!-- 메인 컨텐츠 영역 -->
            <div class="w-full">
                <div id="mainContent" class="bg-white rounded-lg shadow-sm p-6">
                    <!-- 메인 페이지 -->
                    <div id="mainPage">
                        <!-- 대문 헤더 -->
                        <div class="text-center mb-8">
                            <h1 class="text-4xl font-bold text-orange-600 mb-2">🥜 땅콩위키</h1>
                            <p class="text-lg text-gray-600">자유로운 지식 공유의 공간</p>

                        </div>



                        <!-- 접기/펼치기 섹션들 -->
                        <div class="space-y-4">
                            <!-- 위키 특징 (접힌 상태로 시작) -->
                            <div class="border border-gray-200 rounded-lg">
                                <div class="bg-orange-50 p-4 cursor-pointer hover:bg-orange-100 transition-colors" onclick="toggleSection('wikiFeatures')">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-xl font-semibold text-orange-800 flex items-center">
                                            📝 위키 특징
                                        </h2>
                                        <span id="wikiFeatures-icon" class="text-orange-600 text-xl">▶</span>
                                    </div>
                                </div>
                                <div id="wikiFeatures-content" class="p-4 border-t border-orange-200" style="display: none;">
                                    <div class="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 class="font-semibold text-gray-800 mb-2">🔐 보안 시스템</h3>
                                            <ul class="text-gray-700 space-y-1 text-sm">
                                                <li>• IP 기반 편집 권한 관리</li>
                                                <li>• 본인 작성 문서만 편집 가능</li>
                                                <li>• 편집자 신원 영구 보존</li>
                                                <li>• 무단 편집 완전 차단</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-gray-800 mb-2">🛡️ 스팸 차단</h3>
                                            <ul class="text-gray-700 space-y-1 text-sm">
                                                <li>• 뻘문서 자동 감지 및 차단</li>
                                                <li>• 짧은 내용 문서 차단</li>
                                                <li>• 의미없는 반복 문자 필터링</li>
                                                <li>• 실시간 품질 검사</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="mt-4 p-3 bg-orange-100 rounded">
                                        <div class="font-semibold text-orange-800 mb-1">💡 나무위키 문법 완벽 지원</div>
                                        <div class="text-sm text-orange-700">
                                            테이블(||), 제목(==), 링크([[문서명]]), 분류([[분류:카테고리]]), 나이계산([age(1990-01-01)]) 등 모든 문법을 지원합니다.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 편집 가이드 -->
                            <div class="border border-gray-200 rounded-lg">
                                <div class="bg-blue-50 p-4 cursor-pointer hover:bg-blue-100 transition-colors" onclick="toggleSection('editGuide')">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-xl font-semibold text-blue-800 flex items-center">
                                            ✏️ 편집 가이드
                                        </h2>
                                        <span id="editGuide-icon" class="text-blue-600 text-xl">▶</span>
                                    </div>
                                </div>
                                <div id="editGuide-content" class="p-4 border-t border-blue-200" style="display: none;">
                                    <div class="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 class="font-semibold text-gray-800 mb-2">📋 편집 규칙</h3>
                                            <ul class="text-gray-700 space-y-1 text-sm">
                                                <li>• 본인이 작성한 문서만 편집 가능</li>
                                                <li>• 100자 이상의 의미있는 내용 작성</li>
                                                <li>• 반복 문자 사용 금지</li>
                                                <li>• 편집 요약 작성 권장</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold text-gray-800 mb-2">🎯 권장사항</h3>
                                            <ul class="text-gray-700 space-y-1 text-sm">
                                                <li>• 정확하고 객관적인 정보 작성</li>
                                                <li>• 적절한 분류 태그 사용</li>
                                                <li>• 관련 문서와의 링크 연결</li>
                                                <li>• 이미지 및 자료 첨부</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="mt-4 flex space-x-2">
                                        <button onclick="showCreatePage()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                                            새 문서 작성하기
                                        </button>
                                        <button onclick="usePersonTemplate(); showCreatePage()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                                            인물 템플릿 사용
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- 파일 업로드 시스템 -->
                            <div class="border border-gray-200 rounded-lg">
                                <div class="bg-purple-50 p-4 cursor-pointer hover:bg-purple-100 transition-colors" onclick="toggleSection('fileSystem')">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-xl font-semibold text-purple-800 flex items-center">
                                            📎 파일 업로드 시스템
                                        </h2>
                                        <span id="fileSystem-icon" class="text-purple-600 text-xl">▶</span>
                                    </div>
                                </div>
                                <div id="fileSystem-content" class="p-4 border-t border-purple-200" style="display: none;">
                                    <div class="mb-4">
                                        <p class="text-sm text-purple-700 mb-3">
                                            땅콩위키는 다양한 파일 형식을 지원합니다. 
                                            파일을 업로드하고 [[파일:파일명]] 문법으로 문서에 삽입해보세요!
                                        </p>
                                    </div>
                                    
                                    <div class="mb-4 space-y-3">
                                        <div class="flex items-center space-x-2">
                                            <input 
                                                type="file" 
                                                id="demoFileUpload" 
                                                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                                                class="hidden"
                                                onchange="handleDemoFileUpload(event)"
                                            >
                                            <button onclick="document.getElementById('demoFileUpload').click()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors">
                                                📎 파일 업로드
                                            </button>
                                            <span class="text-sm text-gray-600">이미지, 동영상, 문서 파일 지원</span>
                                        </div>
                                        
                                        <div class="bg-gray-50 p-3 rounded border">
                                            <div class="text-sm text-gray-700 mb-2">
                                                <strong>파일 문법 예시:</strong>
                                            </div>
                                            <div class="font-mono text-xs bg-white p-2 rounded border space-y-1">
                                                <div>[[파일:example.jpg]] - 이미지 표시</div>
                                                <div>[[파일:video.mp4]] - 동영상 플레이어</div>
                                                <div>[[파일:audio.mp3]] - 오디오 플레이어</div>
                                                <div>[[파일:document.pdf]] - 문서 다운로드</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div id="demoFileResult" class="mt-4"></div>
                                    <div id="demoUploadedFiles" class="mt-4"></div>
                                    
                                    <div class="mt-4 p-3 bg-purple-100 rounded">
                                        <div class="font-semibold text-purple-800 mb-2">📋 지원 파일 형식</div>
                                        <div class="text-xs text-purple-700 space-y-1">
                                            <div>• <strong>이미지:</strong> JPG, PNG, GIF, WebP (썸네일 자동 생성)</div>
                                            <div>• <strong>동영상:</strong> MP4, WebM, AVI (플레이어 제공)</div>
                                            <div>• <strong>오디오:</strong> MP3, WAV, OGG (플레이어 제공)</div>
                                            <div>• <strong>문서:</strong> PDF, DOC, DOCX, TXT (다운로드 링크)</div>
                                            <div>• <strong>최대 크기:</strong> 10MB per file</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <!-- 문서 보기 페이지 -->
                    <div id="viewPage" style="display: none;">
                        <div class="flex items-center justify-between mb-4">
                            <h1 id="pageTitle" class="text-3xl font-bold text-gray-800"></h1>
                            <div class="flex space-x-2">
                                <button id="editBtn" onclick="editPage()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                                    편집
                                </button>
                                <button onclick="showHistory()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors">
                                    역사
                                </button>
                            </div>
                        </div>
                        <div id="pageContent" class="wiki-content text-gray-700"></div>
                        <div class="mt-6 pt-4 border-t border-gray-200">
                            <div class="text-sm text-gray-500">
                                <div>작성자: <span id="pageAuthor"></span></div>
                                <div>최종 수정: <span id="pageModified"></span></div>
                                <div>편집 횟수: <span id="pageEdits"></span>회</div>
                            </div>
                        </div>
                    </div>

                    <!-- 문서 편집 페이지 -->
                    <div id="editPage" style="display: none;">
                        <div class="flex items-center justify-between mb-4">
                            <h1 id="editTitle" class="text-2xl font-bold text-gray-800"></h1>
                            <div class="flex space-x-2">
                                <button onclick="savePage()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                                    저장
                                </button>
                                <button onclick="cancelEdit()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors">
                                    취소
                                </button>
                            </div>
                        </div>
                        <textarea 
                            id="editContent" 
                            class="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 font-mono"
                            placeholder="문서 내용을 입력하세요..."
                        ></textarea>
                        <div class="mt-4">
                            <div class="flex items-center space-x-2 mb-4">
                                <input 
                                    type="file" 
                                    id="editFileUpload" 
                                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                                    class="hidden"
                                    onchange="handleEditFileUpload(event)"
                                >
                                <button onclick="document.getElementById('editFileUpload').click()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors">
                                    📎 파일 업로드
                                </button>
                                <button onclick="insertFileTemplate()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                                    📄 파일 문법 삽입
                                </button>
                                <span class="text-sm text-gray-600">이미지, 동영상, 문서 파일 지원</span>
                            </div>
                            <div id="editUploadedFiles" class="mb-4"></div>
                            <input 
                                type="text" 
                                id="editSummary" 
                                placeholder="편집 요약 (선택사항)"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            >
                        </div>
                    </div>

                    <!-- 문서 생성 페이지 -->
                    <div id="createPage" style="display: none;">
                        <h1 class="text-2xl font-bold text-gray-800 mb-4">새 문서 만들기</h1>
                        <div class="mb-4">
                            <input 
                                type="text" 
                                id="newPageTitle" 
                                placeholder="문서 제목을 입력하세요..."
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                oninput="updateCreatePreview()"
                            >
                        </div>
                        
                        <!-- 편집/미리보기 탭 -->
                        <div class="mb-4">
                            <div class="flex border-b border-gray-200">
                                <button 
                                    id="createEditTab" 
                                    onclick="switchCreateTab('edit')" 
                                    class="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                                >
                                    ✏️ 편집
                                </button>
                                <button 
                                    id="createPreviewTab" 
                                    onclick="switchCreateTab('preview')" 
                                    class="px-4 py-2 font-medium text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                                >
                                    👁️ 미리보기
                                </button>
                            </div>
                        </div>
                        
                        <!-- 편집 영역 -->
                        <div id="createEditArea">
                            <textarea 
                                id="newPageContent" 
                                class="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 font-mono"
                                placeholder="문서 내용을 입력하세요..."
                                oninput="updateCreatePreview()"
                            ></textarea>
                        </div>
                        
                        <!-- 미리보기 영역 -->
                        <div id="createPreviewArea" style="display: none;">
                            <div class="w-full h-96 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                                <div class="bg-white p-6 rounded shadow-sm min-h-full">
                                    <h1 id="createPreviewTitle" class="text-3xl font-bold text-gray-800 mb-4">문서 제목</h1>
                                    <div id="createPreviewContent" class="wiki-content text-gray-700">
                                        <div class="text-gray-500 italic">내용을 입력하면 여기에 미리보기가 표시됩니다...</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 flex space-x-2">
                            <button onclick="createNewPage()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors">
                                문서 생성
                            </button>
                            <button onclick="usePersonTemplate()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                                인물 템플릿 사용
                            </button>
                            <button onclick="showMainPage()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors">
                                취소
                            </button>
                        </div>
                    </div>

                    <!-- 검색 결과 페이지 -->
                    <div id="searchResultsPage" style="display: none;">
                        <div class="flex items-center justify-between mb-4">
                            <h1 id="searchResultsTitle" class="text-2xl font-bold text-gray-800"></h1>
                            <button onclick="showMainPage()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors">
                                메인으로
                            </button>
                        </div>
                        
                        <div class="bg-blue-50 p-4 rounded-lg mb-6">
                            <h3 class="font-semibold text-blue-800 mb-2">🔍 검색 결과</h3>
                            <p class="text-sm text-blue-700">검색어와 일치하는 문서들을 찾았습니다.</p>
                        </div>
                        
                        <div id="searchResultsList" class="space-y-4">
                            <!-- 검색 결과 목록이 여기에 표시됩니다 -->
                        </div>
                    </div>

                    <!-- 문서 역사 페이지 -->
                    <div id="historyPage" style="display: none;">
                        <div class="flex items-center justify-between mb-4">
                            <h1 id="historyTitle" class="text-2xl font-bold text-gray-800"></h1>
                            <div class="flex space-x-2">
                                <button onclick="backToPage()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                                    문서로 돌아가기
                                </button>
                                <button onclick="showMainPage()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors">
                                    메인으로
                                </button>
                            </div>
                        </div>
                        
                        <div class="bg-yellow-50 p-4 rounded-lg mb-6">
                            <h3 class="font-semibold text-yellow-800 mb-2">📚 문서 역사</h3>
                            <p class="text-sm text-yellow-700">이 문서의 편집 기록과 변경 사항을 확인할 수 있습니다.</p>
                        </div>
                        
                        <div id="historyList" class="space-y-4">
                            <!-- 편집 기록이 여기에 표시됩니다 -->
                        </div>
                    </div>

                    <!-- 관리자 패널 페이지 -->
                    <div id="adminPanel" style="display: none;">
                        <div class="flex items-center justify-between mb-6">
                            <h1 class="text-2xl font-bold text-gray-800 flex items-center">
                                👑 관리자 패널
                                <span class="ml-2 text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">전지유님 전용</span>
                            </h1>
                            <button onclick="showMainPage()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors">
                                메인으로
                            </button>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- 시스템 통계 -->
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                                    📊 시스템 통계
                                </h3>
                                <div id="adminStats" class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span>총 문서 수:</span>
                                        <span id="totalPages" class="font-medium">0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>총 사용자 수:</span>
                                        <span id="totalUsers" class="font-medium">0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>업로드된 파일:</span>
                                        <span id="totalFiles" class="font-medium">0</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>총 편집 횟수:</span>
                                        <span id="totalEdits" class="font-medium">0</span>
                                    </div>
                                </div>
                                <button onclick="refreshAdminStats()" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                                    통계 새로고침
                                </button>
                            </div>
                            
                            <!-- 관리 도구 -->
                            <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-red-800 mb-4 flex items-center">
                                    🛠️ 관리 도구
                                </h3>
                                <div class="space-y-3">
                                    <button onclick="showAllPages()" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors text-sm">
                                        📄 모든 문서 관리
                                    </button>
                                    <button onclick="showAllUsers()" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors text-sm">
                                        👥 사용자 관리
                                    </button>
                                    <button onclick="showFileManager()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm">
                                        📁 파일 관리
                                    </button>
                                    <button onclick="clearSpamFilter()" class="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors text-sm">
                                        🧹 스팸 필터 초기화
                                    </button>
                                    <button onclick="exportWikiData()" class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors text-sm">
                                        💾 데이터 내보내기
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 최근 활동 -->
                        <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h3 class="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                                📈 최근 활동
                            </h3>
                            <div id="recentActivity" class="text-sm text-yellow-700">
                                <div class="italic">최근 활동을 불러오는 중...</div>
                            </div>
                        </div>
                    </div>

                    <!-- 회원가입 페이지 -->
                    <div id="registerPage" style="display: none;">
                        <h1 class="text-2xl font-bold text-gray-800 mb-6">🥜 땅콩위키 회원가입</h1>
                        
                        <div class="max-w-md mx-auto">
                            <div class="bg-orange-50 p-4 rounded-lg mb-6">
                                <h3 class="font-semibold text-orange-800 mb-2">회원가입 혜택</h3>
                                <ul class="text-sm text-orange-700 space-y-1">
                                    <li>• 본인이 작성한 문서 편집 권한</li>
                                    <li>• 편집 기록 및 통계 제공</li>
                                    <li>• 문서 작성자로 영구 기록</li>
                                    <li>• IP 주소 대신 사용자명 표시</li>
                                </ul>
                            </div>

                            <form onsubmit="registerUser(event)" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">사용자명</label>
                                    <input 
                                        type="text" 
                                        id="regUsername" 
                                        placeholder="3-20자의 영문, 숫자, 한글"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                        required
                                        minlength="3"
                                        maxlength="20"
                                    >
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                                    <input 
                                        type="password" 
                                        id="regPassword" 
                                        placeholder="6자 이상의 비밀번호"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                        required
                                        minlength="6"
                                    >
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
                                    <input 
                                        type="password" 
                                        id="regPasswordConfirm" 
                                        placeholder="비밀번호를 다시 입력하세요"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                                        required
                                    >
                                </div>



                                <div class="flex space-x-2 pt-4">
                                    <button type="submit" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg transition-colors font-medium">
                                        회원가입
                                    </button>
                                    <button type="button" onclick="showMainPage()" class="px-6 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition-colors">
                                        취소
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- 로그인 모달 -->
    <div id="loginModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" onclick="if(event.target === this) closeLoginModal()">
        <div class="bg-white rounded-lg p-6 w-96 max-w-90vw" onclick="event.stopPropagation()">
            <h2 class="text-xl font-bold text-gray-800 mb-4">로그인</h2>
            <div class="mb-4">
                <input 
                    type="text" 
                    id="username" 
                    placeholder="사용자명"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    onkeypress="if(event.key==='Enter') login()"
                >
            </div>
            <div class="mb-4">
                <input 
                    type="password" 
                    id="password" 
                    placeholder="비밀번호"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    onkeypress="if(event.key==='Enter') login()"
                >
            </div>
            <div class="flex space-x-2">
                <button onclick="login()" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition-colors">
                    로그인
                </button>
                <button onclick="closeLoginModal()" class="px-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition-colors">
                    취소
                </button>
            </div>
        </div>
    </div>

    <script>
        // 전역 변수
        let currentUser = null;
        let currentPage = null;
        let userIP = null;
        let wikiData = JSON.parse(localStorage.getItem('wikiData') || '{}');
        let users = JSON.parse(localStorage.getItem('wikiUsers') || '{}');
        let blockedContent = JSON.parse(localStorage.getItem('blockedContent') || '[]');
        let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');

        // IP 주소 생성 (시뮬레이션)
        function generateIP() {
            return `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 254) + 1}`;
        }

        // 뻘문서 검사 (강화된 버전)
        function isSpamContent(title, content) {
            const lowTitle = title.toLowerCase().replace(/\s/g, '');
            const lowContent = content.toLowerCase().replace(/\s/g, '');
            
            let spamScore = 0;
            let detectedReasons = [];

            // 1. 내용 길이 검사 (더 엄격하게)
            if (content.trim().length < 150) {
                spamScore += 25;
                detectedReasons.push(`내용이 너무 짧음 (${content.trim().length}자, 최소 150자 필요)`);
            }

            // 2. 의미없는 반복 문자 검사
            if (/(.)\1{4,}/.test(content)) {
                spamScore += 30;
                detectedReasons.push('의미없는 반복 문자 사용');
            }

            // 3. 유명하지 않은 인물 문서 검사
            const unknownPersonKeywords = [
                '친구', '동생', '형', '누나', '언니', '오빠', '동네', '학교', '반친구', 
                '같은반', '우리반', '내친구', '지인', '아는사람', '동창', '선배', '후배',
                '옆집', '이웃', '사촌', '조카', '삼촌', '이모', '고모', '외삼촌'
            ];
            
            const hasUnknownPersonKeywords = unknownPersonKeywords.some(keyword => 
                lowTitle.includes(keyword) || lowContent.includes(keyword)
            );
            
            if (hasUnknownPersonKeywords) {
                spamScore += 40;
                detectedReasons.push('유명하지 않은 개인에 대한 문서로 판단됨');
            }

            // 4. 개인정보 포함 검사
            const personalInfoKeywords = [
                '전화번호', '핸드폰', '주소', '집주소', '학번', '생년월일', 
                '주민등록번호', '계좌번호', '카카오톡', '인스타그램', '페이스북'
            ];
            
            const hasPersonalInfo = personalInfoKeywords.some(keyword => 
                lowContent.includes(keyword)
            );
            
            if (hasPersonalInfo) {
                spamScore += 35;
                detectedReasons.push('개인정보가 포함된 부적절한 내용');
            }

            // 5. 필요없는/중요하지 않은 내용 검사
            const unnecessaryKeywords = [
                '심심해서', '재미없어서', '할일없어서', '그냥', '아무거나', 
                '테스트', '실험', '연습', '아무말', '의미없는', '별거아닌',
                '뻘글', '뻘문서', '장난', '놀이', '게임'
            ];
            
            const hasUnnecessaryContent = unnecessaryKeywords.some(keyword => 
                lowTitle.includes(keyword) || lowContent.includes(keyword)
            );
            
            if (hasUnnecessaryContent) {
                spamScore += 30;
                detectedReasons.push('필요없거나 중요하지 않은 내용으로 판단됨');
            }

            // 6. 단순 나열이나 목록만 있는 경우
            const listOnlyPattern = /^[\s\-\*\•\d\.\)]*(.{1,20}[\s\-\*\•\d\.\)]*){3,}$/;
            if (listOnlyPattern.test(content.trim())) {
                spamScore += 20;
                detectedReasons.push('단순 나열이나 목록만으로 구성된 내용');
            }

            // 7. 욕설이나 부적절한 언어 검사
            const inappropriateWords = [
                '바보', '멍청이', '병신', '미친', '개새끼', '씨발', '좆', '존나'
            ];
            
            const hasInappropriateWords = inappropriateWords.some(word => 
                lowTitle.includes(word) || lowContent.includes(word)
            );
            
            if (hasInappropriateWords) {
                spamScore += 25;
                detectedReasons.push('부적절한 언어 사용');
            }

            // 8. 의미있는 문장 구조 검사
            const sentences = content.split(/[.!?]/).filter(s => s.trim().length > 10);
            if (sentences.length < 3) {
                spamScore += 15;
                detectedReasons.push('의미있는 문장 구조 부족');
            }

            const isSpam = spamScore >= 25; // 기준을 25점으로 상향
            
            if (isSpam) {
                window.lastSpamReasons = detectedReasons;
                window.lastSpamScore = spamScore;
            }

            return isSpam;
        }

        // 관리자 권한 확인
        function isAdmin(username) {
            return users[username] && users[username].isAdmin === true;
        }

        // 사용자 인증 (강화된 편집 권한 시스템)
        function canEditPage(pageTitle) {
            if (!wikiData[pageTitle]) return true; // 새 문서는 누구나 생성 가능
            
            const page = wikiData[pageTitle];
            const pageAuthor = page.author;
            
            // 관리자는 모든 문서 편집 가능
            if (currentUser && isAdmin(currentUser)) {
                return true;
            }
            
            // 로그인된 사용자의 경우
            if (currentUser) {
                // 로그인된 계정으로 작성된 문서는 같은 계정만 편집 가능
                if (!pageAuthor.includes('.')) { // 계정으로 작성된 문서
                    return currentUser === pageAuthor;
                }
                // IP로 작성된 문서는 로그인된 사용자 편집 불가
                return false;
            }
            
            // 비로그인 사용자(IP)의 경우
            // IP로 작성된 문서는 같은 IP만 편집 가능
            if (pageAuthor.includes('.')) { // IP로 작성된 문서
                return userIP === pageAuthor;
            }
            
            // 계정으로 작성된 문서는 IP 사용자 편집 불가
            return false;
        }

        // 초기화
        function init() {
            userIP = generateIP();
            
            if (Object.keys(wikiData).length === 0) {
                createSampleData();
            }
            
            updateUserInfo();
        }

        // 샘플 데이터 생성
        function createSampleData() {
            const samplePages = {
                '땅콩위키': {
                    content: '땅콩위키는 자유로운 지식 공유를 목적으로 하는 위키입니다.\n\n== 특징 ==\n- IP 기반 편집 시스템\n- 뻘문서 자동 차단\n- 편집자 보호 시스템\n- 나무위키 문법 지원\n\n== 편집 규칙 ==\n본인이 작성한 문서만 편집할 수 있으며, 유명하지 않은 인물 문서는 금지됩니다.',
                    author: '192.168.1.1',
                    created: new Date(Date.now() - 86400000 * 7).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 2).toISOString(),
                    editCount: 15,
                    views: 1247,
                    history: [
                        {
                            timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
                            author: '192.168.1.1',
                            summary: '문서 생성',
                            type: 'create'
                        },
                        {
                            timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
                            author: '192.168.1.1',
                            summary: '특징 섹션 추가',
                            type: 'edit'
                        },
                        {
                            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
                            author: '192.168.1.1',
                            summary: '편집 규칙 업데이트',
                            type: 'edit'
                        }
                    ]
                },
                '분류:인물': {
                    content: '이 분류는 실존 인물들을 다루는 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n역사적 인물부터 현대의 유명인까지 다양한 인물들의 문서가 포함됩니다.\n\n== 하위 분류 ==\n- [[분류:정치인]]\n- [[분류:연예인]]\n- [[분류:스포츠인]]\n- [[분류:학자]]\n- [[분류:작가]]\n- [[분류:예술가]]\n- [[분류:기업인]]\n- [[분류:종교인]]\n- [[분류:군인]]\n- [[분류:의료인]]\n\n== 지역별 분류 ==\n- [[분류:한국 인물]]\n- [[분류:일본 인물]]\n- [[분류:중국 인물]]\n- [[분류:미국 인물]]\n- [[분류:유럽 인물]]\n\n== 시대별 분류 ==\n- [[분류:고대 인물]]\n- [[분류:중세 인물]]\n- [[분류:근세 인물]]\n- [[분류:근현대 인물]]\n- [[분류:현대 인물]]',
                    author: '192.168.1.10',
                    created: new Date(Date.now() - 86400000 * 6).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 8,
                    views: 892,
                    history: []
                },
                '분류:역사': {
                    content: '역사 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n세계사와 각국의 역사, 역사적 사건, 시대구분 등을 다룹니다.\n\n== 하위 분류 ==\n- [[분류:한국사]]\n- [[분류:세계사]]\n- [[분류:고대사]]\n- [[분류:중세사]]\n- [[분류:근세사]]\n- [[분류:근현대사]]\n- [[분류:전쟁]]\n- [[분류:혁명]]\n- [[분류:왕조]]\n- [[분류:제국]]\n\n== 지역별 역사 ==\n- [[분류:아시아 역사]]\n- [[분류:유럽 역사]]\n- [[분류:아메리카 역사]]\n- [[분류:아프리카 역사]]\n- [[분류:오세아니아 역사]]\n\n== 주제별 역사 ==\n- [[분류:정치사]]\n- [[분류:경제사]]\n- [[분류:사회사]]\n- [[분류:문화사]]\n- [[분류:종교사]]\n- [[분류:과학사]]\n- [[분류:기술사]]',
                    author: '192.168.1.11',
                    created: new Date(Date.now() - 86400000 * 5).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 6,
                    views: 654,
                    history: []
                },
                '분류:지리': {
                    content: '지리 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n세계 각국의 지역, 도시, 자연지리, 인문지리 등을 다룹니다.\n\n== 하위 분류 ==\n- [[분류:국가]]\n- [[분류:도시]]\n- [[분류:지역]]\n- [[분류:산]]\n- [[분류:강]]\n- [[분류:바다]]\n- [[분류:섬]]\n- [[분류:사막]]\n- [[분류:평원]]\n- [[분류:고원]]\n\n== 대륙별 분류 ==\n- [[분류:아시아]]\n- [[분류:유럽]]\n- [[분류:북아메리카]]\n- [[분류:남아메리카]]\n- [[분류:아프리카]]\n- [[분류:오세아니아]]\n- [[분류:남극]]\n\n== 한국 지리 ==\n- [[분류:서울특별시]]\n- [[분류:부산광역시]]\n- [[분류:경기도]]\n- [[분류:강원도]]\n- [[분류:충청도]]\n- [[분류:전라도]]\n- [[분류:경상도]]\n- [[분류:제주특별자치도]]',
                    author: '192.168.1.12',
                    created: new Date(Date.now() - 86400000 * 5).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 7,
                    views: 543,
                    history: []
                },
                '분류:문화': {
                    content: '문화 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n예술, 문학, 음악, 영화, 게임 등 다양한 문화 콘텐츠를 다룹니다.\n\n== 하위 분류 ==\n- [[분류:예술]]\n- [[분류:문학]]\n- [[분류:음악]]\n- [[분류:영화]]\n- [[분류:드라마]]\n- [[분류:애니메이션]]\n- [[분류:만화]]\n- [[분류:게임]]\n- [[분류:방송]]\n- [[분류:축제]]\n\n== 예술 분야 ==\n- [[분류:미술]]\n- [[분류:조각]]\n- [[분류:건축]]\n- [[분류:사진]]\n- [[분류:디자인]]\n- [[분류:공예]]\n- [[분류:서예]]\n\n== 대중문화 ==\n- [[분류:K-POP]]\n- [[분류:아이돌]]\n- [[분류:연예계]]\n- [[분류:패션]]\n- [[분류:뷰티]]\n- [[분류:트렌드]]\n\n== 전통문화 ==\n- [[분류:한국 전통문화]]\n- [[분류:민속]]\n- [[분류:전통 예술]]\n- [[분류:전통 음식]]\n- [[분류:전통 의상]]',
                    author: '192.168.1.13',
                    created: new Date(Date.now() - 86400000 * 4).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 9,
                    views: 789,
                    history: []
                },
                '분류:과학': {
                    content: '과학 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n자연과학, 응용과학, 기술 등 과학의 모든 분야를 다룹니다.\n\n== 자연과학 ==\n- [[분류:물리학]]\n- [[분류:화학]]\n- [[분류:생물학]]\n- [[분류:지구과학]]\n- [[분류:천문학]]\n- [[분류:수학]]\n- [[분류:통계학]]\n\n== 응용과학 ==\n- [[분류:의학]]\n- [[분류:공학]]\n- [[분류:농학]]\n- [[분류:약학]]\n- [[분류:수의학]]\n- [[분류:간호학]]\n- [[분류:치의학]]\n\n== 기술 분야 ==\n- [[분류:정보기술]]\n- [[분류:컴퓨터]]\n- [[분류:인터넷]]\n- [[분류:소프트웨어]]\n- [[분류:하드웨어]]\n- [[분류:인공지능]]\n- [[분류:로봇공학]]\n- [[분류:나노기술]]\n- [[분류:바이오기술]]\n\n== 환경과학 ==\n- [[분류:환경]]\n- [[분류:생태학]]\n- [[분류:기후]]\n- [[분류:날씨]]\n- [[분류:자연재해]]',
                    author: '192.168.1.14',
                    created: new Date(Date.now() - 86400000 * 4).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 11,
                    views: 923,
                    history: []
                },
                '분류:사회': {
                    content: '사회 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n정치, 경제, 법률, 교육, 사회제도 등을 다룹니다.\n\n== 정치 ==\n- [[분류:정치]]\n- [[분류:정부]]\n- [[분류:국회]]\n- [[분류:선거]]\n- [[분류:정당]]\n- [[분류:외교]]\n- [[분류:국제관계]]\n\n== 경제 ==\n- [[분류:경제]]\n- [[분류:기업]]\n- [[분류:금융]]\n- [[분류:증권]]\n- [[분류:부동산]]\n- [[분류:산업]]\n- [[분류:무역]]\n- [[분류:화폐]]\n\n== 법률 ==\n- [[분류:법률]]\n- [[분류:헌법]]\n- [[분류:민법]]\n- [[분류:형법]]\n- [[분류:상법]]\n- [[분류:행정법]]\n- [[분류:국제법]]\n\n== 교육 ==\n- [[분류:교육]]\n- [[분류:학교]]\n- [[분류:대학교]]\n- [[분류:학과]]\n- [[분류:학문]]\n- [[분류:시험]]\n\n== 사회제도 ==\n- [[분류:복지]]\n- [[분류:의료제도]]\n- [[분류:연금]]\n- [[분류:보험]]\n- [[분류:노동]]',
                    author: '192.168.1.15',
                    created: new Date(Date.now() - 86400000 * 3).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 8,
                    views: 667,
                    history: []
                },
                '분류:스포츠': {
                    content: '스포츠 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n각종 스포츠 종목, 선수, 팀, 대회 등을 다룹니다.\n\n== 구기 종목 ==\n- [[분류:축구]]\n- [[분류:야구]]\n- [[분류:농구]]\n- [[분류:배구]]\n- [[분류:테니스]]\n- [[분류:탁구]]\n- [[분류:골프]]\n- [[분류:핸드볼]]\n- [[분류:하키]]\n- [[분류:럭비]]\n\n== 개인 종목 ==\n- [[분류:육상]]\n- [[분류:수영]]\n- [[분류:체조]]\n- [[분류:격투기]]\n- [[분류:태권도]]\n- [[분류:유도]]\n- [[분류:검도]]\n- [[분류:복싱]]\n- [[분류:레슬링]]\n- [[분류:사격]]\n- [[분류:양궁]]\n\n== 동계 스포츠 ==\n- [[분류:스키]]\n- [[분류:스케이팅]]\n- [[분류:아이스하키]]\n- [[분류:컬링]]\n- [[분류:봅슬레이]]\n\n== 대회 ==\n- [[분류:올림픽]]\n- [[분류:월드컵]]\n- [[분류:아시안게임]]\n- [[분류:프로리그]]\n\n== e스포츠 ==\n- [[분류:e스포츠]]\n- [[분류:게임 대회]]\n- [[분류:프로게이머]]',
                    author: '192.168.1.16',
                    created: new Date(Date.now() - 86400000 * 3).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 7,
                    views: 834,
                    history: []
                },
                '분류:종교': {
                    content: '종교 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n세계 각종 종교, 종파, 종교 인물, 종교 문화 등을 다룹니다.\n\n== 주요 종교 ==\n- [[분류:기독교]]\n- [[분류:이슬람교]]\n- [[분류:불교]]\n- [[분류:힌두교]]\n- [[분류:유대교]]\n- [[분류:도교]]\n- [[분류:신토]]\n- [[분류:시크교]]\n\n== 기독교 ==\n- [[분류:가톨릭]]\n- [[분류:개신교]]\n- [[분류:정교회]]\n- [[분류:성경]]\n- [[분류:교회]]\n- [[분류:성인]]\n- [[분류:교황]]\n\n== 불교 ==\n- [[분류:대승불교]]\n- [[분류:소승불교]]\n- [[분류:선불교]]\n- [[분류:정토불교]]\n- [[분류:사찰]]\n- [[분류:스님]]\n- [[분류:불경]]\n\n== 한국 종교 ==\n- [[분류:한국 기독교]]\n- [[분류:한국 불교]]\n- [[분류:유교]]\n- [[분류:무속신앙]]\n- [[분류:신종교]]\n\n== 종교 문화 ==\n- [[분류:종교 예술]]\n- [[분류:종교 음악]]\n- [[분류:종교 건축]]\n- [[분류:종교 축제]]',
                    author: '192.168.1.17',
                    created: new Date(Date.now() - 86400000 * 2).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 6,
                    views: 456,
                    history: []
                },
                '분류:언어': {
                    content: '언어 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n세계 각국의 언어, 언어학, 문자, 번역 등을 다룹니다.\n\n== 언어계통 ==\n- [[분류:인도유럽어족]]\n- [[분류:중국티베트어족]]\n- [[분류:알타이어족]]\n- [[분류:아프로아시아어족]]\n- [[분류:니제르콩고어족]]\n- [[분류:오스트로네시아어족]]\n\n== 주요 언어 ==\n- [[분류:한국어]]\n- [[분류:중국어]]\n- [[분류:일본어]]\n- [[분류:영어]]\n- [[분류:스페인어]]\n- [[분류:프랑스어]]\n- [[분류:독일어]]\n- [[분류:러시아어]]\n- [[분류:아랍어]]\n- [[분류:힌디어]]\n\n== 문자 ==\n- [[분류:한글]]\n- [[분류:한자]]\n- [[분류:히라가나]]\n- [[분류:가타카나]]\n- [[분류:라틴 문자]]\n- [[분류:키릴 문자]]\n- [[분류:아랍 문자]]\n- [[분류:데바나가리]]\n\n== 언어학 ==\n- [[분류:음성학]]\n- [[분류:음운론]]\n- [[분류:형태론]]\n- [[분류:통사론]]\n- [[분류:의미론]]\n- [[분류:화용론]]\n- [[분류:사회언어학]]\n- [[분류:심리언어학]]',
                    author: '192.168.1.18',
                    created: new Date(Date.now() - 86400000 * 2).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 5,
                    views: 378,
                    history: []
                },
                '분류:교통': {
                    content: '교통 관련 문서들을 모아놓은 분류입니다.\n\n== 개요 ==\n교통수단, 교통시설, 교통정책, 교통사고 등을 다룹니다.\n\n== 교통수단 ==\n- [[분류:자동차]]\n- [[분류:기차]]\n- [[분류:지하철]]\n- [[분류:버스]]\n- [[분류:비행기]]\n- [[분류:선박]]\n- [[분류:자전거]]\n- [[분류:오토바이]]\n\n== 교통시설 ==\n- [[분류:도로]]\n- [[분류:철도]]\n- [[분류:공항]]\n- [[분류:항구]]\n- [[분류:터미널]]\n- [[분류:주차장]]\n- [[분류:휴게소]]\n- [[분류:톨게이트]]\n\n== 대중교통 ==\n- [[분류:서울지하철]]\n- [[분류:KTX]]\n- [[분류:시내버스]]\n- [[분류:시외버스]]\n- [[분류:고속버스]]\n- [[분류:택시]]\n\n== 항공교통 ==\n- [[분류:항공사]]\n- [[분류:공항]]\n- [[분류:항공기]]\n- [[분류:항공노선]]\n\n== 해상교통 ==\n- [[분류:선박회사]]\n- [[분류:항구]]\n- [[분류:페리]]\n- [[분류:크루즈]]\n\n== 교통정책 ==\n- [[분류:교통법규]]\n- [[분류:교통안전]]\n- [[분류:교통사고]]\n- [[분류:교통체증]]',
                    author: '192.168.1.19',
                    created: new Date(Date.now() - 86400000 * 1).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 4,
                    views: 289,
                    history: []
                },
                '홍길동': {
                    content: '홍길동은 조선시대의 전설적인 의적입니다.\n\n== 생애 ==\n홍길동은 1440년 한성부에서 태어났으며, 부패한 관리들을 응징하고 백성들을 도왔습니다.\n\n== 업적 ==\n- 백성 구제 활동\n- 의적 활동\n- 사회 정의 실현\n\n== 관련 문서 ==\n- [[조선시대]]\n- [[의적]]',
                    author: '10.0.0.15',
                    created: new Date(Date.now() - 86400000 * 5).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 8,
                    views: 892,
                    history: [
                        {
                            timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
                            author: '10.0.0.15',
                            summary: '홍길동 문서 생성',
                            type: 'create'
                        },
                        {
                            timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
                            author: '10.0.0.15',
                            summary: '업적 섹션 추가',
                            type: 'edit'
                        },
                        {
                            timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
                            author: '10.0.0.15',
                            summary: '관련 문서 링크 추가',
                            type: 'edit'
                        }
                    ]
                },
                '조선시대': {
                    content: '조선시대는 1392년부터 1897년까지 존재했던 한국의 왕조입니다.\n\n== 개요 ==\n조선은 이성계가 건국한 왕조로, 500년 이상 지속되었습니다.\n\n== 주요 인물 ==\n- [[홍길동]] - 전설적인 의적\n\n== 관련 문서 ==\n- [[홍길동]]',
                    author: '172.16.0.5',
                    created: new Date(Date.now() - 86400000 * 3).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 3,
                    views: 456,
                    history: [
                        {
                            timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
                            author: '172.16.0.5',
                            summary: '조선시대 문서 생성',
                            type: 'create'
                        },
                        {
                            timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
                            author: '172.16.0.5',
                            summary: '주요 인물 섹션 추가',
                            type: 'edit'
                        }
                    ]
                },
                '의적': {
                    content: '의적은 정의를 위해 활동하는 도적을 말합니다.\n\n== 개요 ==\n의적은 부패한 권력에 맞서 백성을 위해 활동하는 사람들입니다.\n\n== 대표적인 의적 ==\n- [[홍길동]] - 조선시대 최고의 의적\n\n== 관련 문서 ==\n- [[홍길동]]\n- [[조선시대]]',
                    author: '10.0.0.20',
                    created: new Date(Date.now() - 86400000 * 2).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                    editCount: 2,
                    views: 234,
                    history: [
                        {
                            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
                            author: '10.0.0.20',
                            summary: '의적 문서 생성',
                            type: 'create'
                        },
                        {
                            timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
                            author: '10.0.0.20',
                            summary: '관련 문서 링크 추가',
                            type: 'edit'
                        }
                    ]
                }
            };

            // 출생년도별 분류 문서 생성 (1900년~2024년)
            for (let year = 1900; year <= 2024; year++) {
                const categoryTitle = `분류:${year}년 출생`;
                samplePages[categoryTitle] = {
                    content: `${year}년에 출생한 인물들을 모아놓은 분류입니다.\n\n== 개요 ==\n${year}년에 태어난 실존 인물들의 문서가 이 분류에 포함됩니다.\n\n== 관련 분류 ==\n- [[분류:인물]]\n- [[분류:${year}년]]\n- [[분류:${Math.floor(year/10)*10}년대 출생]]\n- [[분류:${Math.floor(year/100)*100}년대 출생]]\n\n== 같은 시대 출생 ==\n${year > 1900 ? `- [[분류:${year-1}년 출생]]` : ''}\n${year < 2024 ? `- [[분류:${year+1}년 출생]]` : ''}\n\n== 주요 사건 ==\n${year}년은 다음과 같은 해였습니다:\n- (${year}년의 주요 사건들을 추가하세요)\n\n== 통계 ==\n현재 이 분류에 포함된 문서: 0개\n\n[[분류:출생년별 인물]][[분류:${year}년]][[분류:${Math.floor(year/10)*10}년대]]`,
                    author: 'system',
                    created: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 30)).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 7)).toISOString(),
                    editCount: 1,
                    views: Math.floor(Math.random() * 100) + 10,
                    history: [
                        {
                            timestamp: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 30)).toISOString(),
                            author: 'system',
                            summary: `${year}년 출생 분류 생성`,
                            type: 'create'
                        }
                    ]
                };
            }

            // 연대별 출생 분류 생성 (1900년대~2020년대)
            for (let decade = 1900; decade <= 2020; decade += 10) {
                const categoryTitle = `분류:${decade}년대 출생`;
                samplePages[categoryTitle] = {
                    content: `${decade}년대(${decade}년~${decade+9}년)에 출생한 인물들을 모아놓은 분류입니다.\n\n== 개요 ==\n${decade}년대에 태어난 실존 인물들의 문서가 이 분류에 포함됩니다.\n\n== 하위 분류 ==\n${Array.from({length: 10}, (_, i) => `- [[분류:${decade+i}년 출생]]`).join('\n')}\n\n== 관련 분류 ==\n- [[분류:인물]]\n- [[분류:출생년별 인물]]\n- [[분류:${decade}년대]]\n- [[분류:${Math.floor(decade/100)*100}년대 출생]]\n\n== 시대적 배경 ==\n${decade}년대는 다음과 같은 시대였습니다:\n- (${decade}년대의 주요 특징을 추가하세요)\n\n== 통계 ==\n현재 이 분류에 포함된 하위 분류: 10개\n\n[[분류:출생년별 인물]][[분류:${decade}년대]][[분류:${Math.floor(decade/100)*100}년대]]`,
                    author: 'system',
                    created: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 30)).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 7)).toISOString(),
                    editCount: 1,
                    views: Math.floor(Math.random() * 200) + 50,
                    history: [
                        {
                            timestamp: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 30)).toISOString(),
                            author: 'system',
                            summary: `${decade}년대 출생 분류 생성`,
                            type: 'create'
                        }
                    ]
                };
            }

            // 세기별 출생 분류 생성
            const centuries = [
                { title: '분류:19세기 출생', range: '1801년~1900년', years: '19세기' },
                { title: '분류:20세기 출생', range: '1901년~2000년', years: '20세기' },
                { title: '분류:21세기 출생', range: '2001년~2100년', years: '21세기' }
            ];

            centuries.forEach(century => {
                samplePages[century.title] = {
                    content: `${century.years}(${century.range})에 출생한 인물들을 모아놓은 분류입니다.\n\n== 개요 ==\n${century.years}에 태어난 실존 인물들의 문서가 이 분류에 포함됩니다.\n\n== 하위 분류 ==\n${century.years === '20세기' ? 
                        Array.from({length: 10}, (_, i) => `- [[분류:${1900+i*10}년대 출생]]`).join('\n') :
                        century.years === '21세기' ?
                        Array.from({length: 3}, (_, i) => `- [[분류:${2000+i*10}년대 출생]]`).join('\n') :
                        '- [[분류:1800년대 출생]]\n- [[분류:1810년대 출생]]\n- (기타 19세기 연대별 분류)'
                    }\n\n== 관련 분류 ==\n- [[분류:인물]]\n- [[분류:출생년별 인물]]\n- [[분류:${century.years}]]\n\n== 시대적 특징 ==\n${century.years}는 다음과 같은 시대였습니다:\n- (${century.years}의 주요 특징을 추가하세요)\n\n== 통계 ==\n현재 이 분류에 포함된 하위 분류: 다수\n\n[[분류:출생년별 인물]][[분류:${century.years}]]`,
                    author: 'system',
                    created: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 30)).toISOString(),
                    lastModified: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 7)).toISOString(),
                    editCount: 1,
                    views: Math.floor(Math.random() * 500) + 100,
                    history: [
                        {
                            timestamp: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 30)).toISOString(),
                            author: 'system',
                            summary: `${century.years} 출생 분류 생성`,
                            type: 'create'
                        }
                    ]
                };
            });

            // 출생년별 인물 메인 분류
            samplePages['분류:출생년별 인물'] = {
                content: '출생년도별로 분류된 인물들을 모아놓은 상위 분류입니다.\n\n== 개요 ==\n실존 인물들을 출생년도에 따라 체계적으로 분류한 카테고리입니다.\n\n== 세기별 분류 ==\n- [[분류:19세기 출생]] (1801년~1900년)\n- [[분류:20세기 출생]] (1901년~2000년)\n- [[분류:21세기 출생]] (2001년~현재)\n\n== 연대별 분류 ==\n=== 20세기 ===\n- [[분류:1900년대 출생]]\n- [[분류:1910년대 출생]]\n- [[분류:1920년대 출생]]\n- [[분류:1930년대 출생]]\n- [[분류:1940년대 출생]]\n- [[분류:1950년대 출생]]\n- [[분류:1960년대 출생]]\n- [[분류:1970년대 출생]]\n- [[분류:1980년대 출생]]\n- [[분류:1990년대 출생]]\n\n=== 21세기 ===\n- [[분류:2000년대 출생]]\n- [[분류:2010년대 출생]]\n- [[분류:2020년대 출생]]\n\n== 연도별 분류 ==\n=== 최근 연도 ===\n- [[분류:2020년 출생]]\n- [[분류:2021년 출생]]\n- [[분류:2022년 출생]]\n- [[분류:2023년 출생]]\n- [[분류:2024년 출생]]\n\n== 사용법 ==\n인물 문서에 출생년도 분류를 추가할 때는 다음과 같이 사용합니다:\n- 예시: [[분류:1995년 출생]]\n- 나이 계산: [age(1995-01-01)]\n\n== 관련 분류 ==\n- [[분류:인물]]\n- [[분류:사망년별 인물]]\n- [[분류:연도별 분류]]\n\n== 통계 ==\n- 총 출생년도 분류: 125개 (1900년~2024년)\n- 연대별 분류: 13개\n- 세기별 분류: 3개\n\n[[분류:인물]][[분류:연도별 분류]]',
                author: 'system',
                created: new Date(Date.now() - 86400000 * 30).toISOString(),
                lastModified: new Date(Date.now() - 86400000 * 1).toISOString(),
                editCount: 5,
                views: 1250,
                history: [
                    {
                        timestamp: new Date(Date.now() - 86400000 * 30).toISOString(),
                        author: 'system',
                        summary: '출생년별 인물 분류 생성',
                        type: 'create'
                    },
                    {
                        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
                        author: 'system',
                        summary: '2024년 분류까지 업데이트',
                        type: 'edit'
                    }
                ]
            };

            const sampleUsers = {
                'admin': {
                    password: 'admin123',
                    email: 'admin@peanut.wiki',
                    joinDate: new Date(Date.now() - 86400000 * 30).toISOString(),
                    editCount: 45,
                    createdPages: 12
                },
                '전지유': {
                    password: '205080y@@',
                    email: 'admin@peanut.wiki',
                    joinDate: new Date(Date.now() - 86400000 * 60).toISOString(),
                    editCount: 150,
                    createdPages: 50,
                    isAdmin: true,
                    adminLevel: 'super'
                }
            };

            wikiData = samplePages;
            users = sampleUsers;
            
            localStorage.setItem('wikiData', JSON.stringify(wikiData));
            localStorage.setItem('wikiUsers', JSON.stringify(users));
        }

        // 사용자 정보 업데이트
        function updateUserInfo() {
            const userInfo = document.getElementById('userInfo');
            const loginBtn = document.getElementById('loginBtn');
            const registerBtn = document.getElementById('registerBtn');
            const adminMenu = document.getElementById('adminMenu');
            
            if (currentUser) {
                const adminBadge = isAdmin(currentUser) ? ' 👑' : '';
                userInfo.innerHTML = `<span class="font-medium">${currentUser}님${adminBadge}</span>`;
                userInfo.title = isAdmin(currentUser) ? '관리자 계정' : '일반 사용자';
                loginBtn.textContent = '로그아웃';
                registerBtn.style.display = 'none';
                
                // 관리자 메뉴 표시/숨김
                if (isAdmin(currentUser)) {
                    adminMenu.style.display = 'inline-block';
                } else {
                    adminMenu.style.display = 'none';
                }
            } else {
                userInfo.innerHTML = `<span class="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm font-medium">📍 게스트</span>`;
                userInfo.title = '게스트 사용자 - 클릭하여 내 통계 보기';
                loginBtn.textContent = '로그인';
                registerBtn.style.display = 'inline-block';
                adminMenu.style.display = 'none';
            }
        }



        // 로그인 토글
        function toggleLogin() {
            const modal = document.getElementById('loginModal');
            if (currentUser) {
                currentUser = null;
                updateUserInfo();
                showMainPage();
                alert('로그아웃되었습니다.');
            } else {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }
        }

        // 로그인
        function login() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                alert('사용자명과 비밀번호를 입력하세요.');
                return;
            }
            
            if (users[username] && users[username].password === password) {
                currentUser = username;
                
                const modal = document.getElementById('loginModal');
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                
                updateUserInfo();
                alert(`${username}님, 환영합니다!`);
            } else {
                alert('잘못된 사용자명 또는 비밀번호입니다.');
            }
        }

        // 로그인 모달 닫기
        function closeLoginModal() {
            const modal = document.getElementById('loginModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        // 회원가입 페이지 표시
        function showRegisterPage() {
            hideAllPages();
            document.getElementById('registerPage').style.display = 'block';
            currentPage = null;
        }

        // 회원가입 처리
        function registerUser(event) {
            event.preventDefault();
            
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value;
            const passwordConfirm = document.getElementById('regPasswordConfirm').value;
            
            if (!username || !password || !passwordConfirm) {
                alert('필수 항목을 모두 입력하세요.');
                return;
            }
            
            if (password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            
            if (users[username]) {
                alert('이미 존재하는 사용자명입니다.');
                return;
            }
            
            users[username] = {
                password: password,
                joinDate: new Date().toISOString(),
                editCount: 0,
                createdPages: 0
            };
            
            localStorage.setItem('wikiUsers', JSON.stringify(users));
            
            alert(`${username}님, 회원가입이 완료되었습니다!`);
            
            currentUser = username;
            updateUserInfo();
            showMainPage();
        }

        // 메인 페이지 표시
        function showMainPage() {
            hideAllPages();
            document.getElementById('mainPage').style.display = 'block';
            currentPage = null;
        }

        // 모든 페이지 숨기기
        function hideAllPages() {
            const pages = ['mainPage', 'viewPage', 'editPage', 'createPage', 'registerPage', 'searchResultsPage', 'historyPage', 'adminPanel'];
            pages.forEach(page => {
                document.getElementById(page).style.display = 'none';
            });
        }

        // 관리자 패널 표시
        function showAdminPanel() {
            if (!currentUser || !isAdmin(currentUser)) {
                alert('관리자 권한이 필요합니다.');
                return;
            }
            
            hideAllPages();
            document.getElementById('adminPanel').style.display = 'block';
            refreshAdminStats();
            loadRecentActivity();
        }

        // 관리자 통계 새로고침
        function refreshAdminStats() {
            const totalPages = Object.keys(wikiData).length;
            const totalUsers = Object.keys(users).length;
            const totalFiles = Object.keys(uploadedFiles).length;
            
            let totalEdits = 0;
            Object.values(wikiData).forEach(page => {
                totalEdits += page.editCount || 0;
            });
            
            document.getElementById('totalPages').textContent = totalPages;
            document.getElementById('totalUsers').textContent = totalUsers;
            document.getElementById('totalFiles').textContent = totalFiles;
            document.getElementById('totalEdits').textContent = totalEdits;
        }

        // 최근 활동 로드
        function loadRecentActivity() {
            const activities = [];
            
            // 모든 문서의 편집 기록 수집
            Object.entries(wikiData).forEach(([title, page]) => {
                if (page.history) {
                    page.history.forEach(entry => {
                        activities.push({
                            ...entry,
                            pageTitle: title
                        });
                    });
                }
            });
            
            // 최신 순으로 정렬하고 최근 10개만 표시
            activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const recentActivities = activities.slice(0, 10);
            
            const activityDiv = document.getElementById('recentActivity');
            
            if (recentActivities.length === 0) {
                activityDiv.innerHTML = '<div class="italic text-gray-500">최근 활동이 없습니다.</div>';
                return;
            }
            
            activityDiv.innerHTML = recentActivities.map(activity => {
                const date = new Date(activity.timestamp);
                const timeAgo = getTimeAgo(date);
                const typeIcon = activity.type === 'create' ? '🆕' : '✏️';
                
                return `
                    <div class="flex items-center justify-between py-2 border-b border-yellow-200 last:border-b-0">
                        <div class="flex items-center space-x-2">
                            <span>${typeIcon}</span>
                            <span class="font-medium">${activity.pageTitle}</span>
                            <span class="text-xs text-yellow-600">by ${activity.author}</span>
                        </div>
                        <div class="text-xs text-yellow-600">${timeAgo}</div>
                    </div>
                `;
            }).join('');
        }

        // 시간 차이 계산
        function getTimeAgo(date) {
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);
            
            if (diffMins < 1) return '방금 전';
            if (diffMins < 60) return `${diffMins}분 전`;
            if (diffHours < 24) return `${diffHours}시간 전`;
            return `${diffDays}일 전`;
        }

        // 모든 문서 관리
        function showAllPages() {
            const pageList = Object.entries(wikiData).map(([title, page]) => {
                return `${title} (작성자: ${page.author}, 편집: ${page.editCount}회)`;
            }).join('\n');
            
            alert(`📄 전체 문서 목록 (${Object.keys(wikiData).length}개):\n\n${pageList}`);
        }

        // 모든 사용자 관리
        function showAllUsers() {
            const userList = Object.entries(users).map(([username, user]) => {
                const adminBadge = user.isAdmin ? ' [관리자]' : '';
                return `${username}${adminBadge} (편집: ${user.editCount}회, 가입: ${new Date(user.joinDate).toLocaleDateString()})`;
            }).join('\n');
            
            alert(`👥 전체 사용자 목록 (${Object.keys(users).length}명):\n\n${userList}`);
        }

        // 파일 관리
        function showFileManager() {
            const fileList = Object.entries(uploadedFiles).map(([filename, file]) => {
                return `${filename} (${file.size}, 업로드: ${file.uploader})`;
            }).join('\n');
            
            if (Object.keys(uploadedFiles).length === 0) {
                alert('📁 업로드된 파일이 없습니다.');
            } else {
                alert(`📁 업로드된 파일 목록 (${Object.keys(uploadedFiles).length}개):\n\n${fileList}`);
            }
        }

        // 스팸 필터 초기화
        function clearSpamFilter() {
            if (confirm('스팸 필터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
                blockedContent = [];
                localStorage.setItem('blockedContent', JSON.stringify(blockedContent));
                alert('🧹 스팸 필터가 초기화되었습니다.');
            }
        }

        // 데이터 내보내기
        function exportWikiData() {
            const exportData = {
                wikiData: wikiData,
                users: users,
                uploadedFiles: uploadedFiles,
                exportDate: new Date().toISOString()
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `peanut-wiki-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            alert('💾 위키 데이터가 내보내기되었습니다.');
        }

        // 위키 검색
        function searchWiki() {
            const query = document.getElementById('searchInput').value.trim();
            if (!query) {
                alert('검색어를 입력하세요.');
                return;
            }
            
            if (wikiData[query]) {
                showPage(query);
                return;
            }
            
            const matchingPages = Object.entries(wikiData).filter(([title, page]) => {
                const titleMatch = title.toLowerCase().includes(query.toLowerCase());
                const contentMatch = page.content.toLowerCase().includes(query.toLowerCase());
                return titleMatch || contentMatch;
            });
            
            if (matchingPages.length > 0) {
                showSearchResults(query, matchingPages);
            } else {
                if (confirm(`"${query}" 검색 결과가 없습니다. 새 문서를 만드시겠습니까?`)) {
                    showCreatePage(query);
                }
            }
        }

        // 검색 결과 표시
        function showSearchResults(query, results) {
            hideAllPages();
            document.getElementById('searchResultsPage').style.display = 'block';
            document.getElementById('searchResultsTitle').textContent = `"${query}" 검색 결과`;
            
            const resultsList = document.getElementById('searchResultsList');
            resultsList.innerHTML = results.map(([title, page]) => {
                const contentPreview = page.content.substring(0, 200) + (page.content.length > 200 ? '...' : '');
                
                return `
                    <div class="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="showPage('${title}')">
                        <h3 class="text-lg font-semibold text-blue-600 hover:underline mb-2">${title}</h3>
                        <div class="text-sm text-gray-600 mb-2">${contentPreview}</div>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span>작성자: ${page.author}</span>
                            <span>조회수: ${page.views || 0}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // 문서 보기
        function showPage(title) {
            if (!wikiData[title]) {
                alert('존재하지 않는 문서입니다.');
                return;
            }
            
            hideAllPages();
            document.getElementById('viewPage').style.display = 'block';
            
            const page = wikiData[title];
            document.getElementById('pageTitle').textContent = title;
            document.getElementById('pageContent').innerHTML = formatWikiContent(page.content);
            document.getElementById('pageAuthor').textContent = page.author;
            document.getElementById('pageModified').textContent = new Date(page.lastModified).toLocaleString('ko-KR');
            document.getElementById('pageEdits').textContent = page.editCount;
            
            const editBtn = document.getElementById('editBtn');
            if (canEditPage(title)) {
                editBtn.style.display = 'inline-block';
            } else {
                editBtn.style.display = 'none';
            }
            
            currentPage = title;
            
            page.views = (page.views || 0) + 1;
            localStorage.setItem('wikiData', JSON.stringify(wikiData));
        }

        // 위키 내용 포맷팅
        function formatWikiContent(content) {
            let formatted = content;
            
            // 테이블 처리 (|| 문법)
            formatted = formatted.replace(/(\|\|[^\n]+\|\|(?:\n\|\|[^\n]+\|\|)*)/g, function(match) {
                const rows = match.split('\n').filter(row => row.trim());
                let tableHtml = '<table class="wiki-table border-collapse border border-gray-400 my-4 bg-white">';
                
                rows.forEach((row, index) => {
                    const cells = row.split('||').filter(cell => cell.trim() !== '');
                    if (cells.length > 0) {
                        tableHtml += '<tr>';
                        cells.forEach((cell, cellIndex) => {
                            const cellContent = cell.trim();
                            const isHeader = cellContent.startsWith("'''") && cellContent.endsWith("'''");
                            
                            if (isHeader) {
                                const headerText = cellContent.replace(/'''/g, '');
                                tableHtml += `<td class="border border-gray-400 px-3 py-2 bg-gray-100 font-semibold text-gray-800">${headerText}</td>`;
                            } else {
                                tableHtml += `<td class="border border-gray-400 px-3 py-2">${cellContent}</td>`;
                            }
                        });
                        tableHtml += '</tr>';
                    }
                });
                
                tableHtml += '</table>';
                return tableHtml;
            });
            
            // 제목 처리
            formatted = formatted.replace(/^== (.*?) ==/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>');
            
            // 파일 링크 처리
            formatted = formatted.replace(/\[\[파일:([^\]]+)\]\]/g, function(match, filename) {
                if (uploadedFiles[filename]) {
                    const file = uploadedFiles[filename];
                    const fileType = file.type.split('/')[0];
                    
                    if (fileType === 'image') {
                        return `<div class="my-4 p-2 bg-gray-50 border rounded-lg">
                            <div class="text-sm text-gray-600 mb-2">📷 이미지: ${filename}</div>
                            <img src="${file.data}" alt="${filename}" class="max-w-full h-auto rounded border shadow-sm" style="max-height: 400px;">
                            <div class="text-xs text-gray-500 mt-1">크기: ${file.size} • 업로드: ${file.uploader}</div>
                        </div>`;
                    } else if (fileType === 'video') {
                        return `<div class="my-4 p-2 bg-gray-50 border rounded-lg">
                            <div class="text-sm text-gray-600 mb-2">🎥 동영상: ${filename}</div>
                            <video controls class="max-w-full h-auto rounded border shadow-sm" style="max-height: 400px;">
                                <source src="${file.data}" type="${file.type}">
                                브라우저가 비디오를 지원하지 않습니다.
                            </video>
                            <div class="text-xs text-gray-500 mt-1">크기: ${file.size} • 업로드: ${file.uploader}</div>
                        </div>`;
                    } else if (fileType === 'audio') {
                        return `<div class="my-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <div class="text-2xl">🎵</div>
                                <div class="flex-1">
                                    <div class="font-medium text-blue-800">${filename}</div>
                                    <div class="text-sm text-blue-600">오디오 파일 (${file.size})</div>
                                    <div class="text-xs text-blue-500">업로드: ${file.uploader}</div>
                                </div>
                            </div>
                            <audio controls class="w-full mt-2">
                                <source src="${file.data}" type="${file.type}">
                                브라우저가 오디오를 지원하지 않습니다.
                            </audio>
                        </div>`;
                    } else {
                        const fileIcon = getFileIcon(filename);
                        return `<div class="my-4 p-3 bg-gray-100 border rounded-lg">
                            <div class="flex items-center space-x-3">
                                <div class="text-2xl">${fileIcon}</div>
                                <div class="flex-1">
                                    <div class="font-medium text-gray-800">${filename}</div>
                                    <div class="text-sm text-gray-600">문서 파일 (${file.size})</div>
                                    <div class="text-xs text-gray-500">업로드: ${file.uploader}</div>
                                </div>
                                <button onclick="downloadFile('${filename}')" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                    다운로드
                                </button>
                            </div>
                        </div>`;
                    }
                } else {
                    return `<div class="my-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div class="flex items-center space-x-2">
                            <span class="text-red-600 text-xl">❌</span>
                            <div>
                                <div class="font-medium text-red-800">파일을 찾을 수 없음</div>
                                <div class="text-sm text-red-600">${filename}</div>
                                <div class="text-xs text-red-500">파일이 삭제되었거나 존재하지 않습니다.</div>
                            </div>
                        </div>
                    </div>`;
                }
            });
            
            // 나이 계산 처리 ([age(YYYY-MM-DD)] 및 [age(YYYY-MM-DD)세] 문법)
            formatted = formatted.replace(/\[age\((\d{4}-\d{2}-\d{2})\)세?\]/g, function(match, dateStr) {
                try {
                    const birthDate = new Date(dateStr);
                    const today = new Date();
                    
                    // 유효한 날짜인지 확인
                    if (isNaN(birthDate.getTime())) {
                        return `<span class="text-red-600 bg-red-50 px-2 py-1 rounded text-sm" title="잘못된 날짜 형식: ${dateStr}">❌ 날짜 오류</span>`;
                    }
                    
                    // 미래 날짜 확인
                    if (birthDate > today) {
                        return `<span class="text-orange-600 bg-orange-50 px-2 py-1 rounded text-sm" title="미래 날짜: ${dateStr}">⚠️ 미래</span>`;
                    }
                    
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    
                    // 생일이 아직 지나지 않았으면 나이에서 1을 뺌
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    
                    // 음수 나이 방지
                    if (age < 0) {
                        return `<span class="text-red-600 bg-red-50 px-2 py-1 rounded text-sm" title="계산 오류: ${dateStr}">❌ 계산 오류</span>`;
                    }
                    
                    const formattedBirthDate = birthDate.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    return `<span class="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium" title="생년월일: ${formattedBirthDate}">
                        <span class="mr-1">🎂</span>${age}세
                    </span>`;
                } catch (error) {
                    return `<span class="text-red-600 bg-red-50 px-2 py-1 rounded text-sm" title="처리 오류: ${dateStr}">❌ 오류</span>`;
                }
            });
            
            // 링크 처리
            formatted = formatted.replace(/\[\[([^\]]+)\]\]/g, function(match, title) {
                const exists = wikiData[title];
                const linkClass = exists ? 'text-blue-600 hover:underline' : 'text-red-600 hover:underline';
                const onclick = exists ? `showPage('${title}')` : `createPageFromLink('${title}')`;
                return `<a href="#" onclick="${onclick}" class="${linkClass}">${title}</a>`;
            });
            
            // 기본 마크다운 처리
            formatted = formatted.replace(/\n/g, '<br>');
            formatted = formatted.replace(/- (.*?)(<br>|$)/g, '<li>$1</li>');
            formatted = formatted.replace(/(<li>.*<\/li>)/g, '<ul class="list-disc ml-6 mb-4">$1</ul>');
            
            return formatted;
        }

        // 링크에서 문서 생성
        function createPageFromLink(title) {
            if (confirm(`"${title}" 문서가 존재하지 않습니다. 새로 만드시겠습니까?`)) {
                showCreatePage(title);
            }
        }

        // 접기/펼치기 섹션
        function toggleSection(sectionId) {
            const content = document.getElementById(sectionId + '-content');
            const icon = document.getElementById(sectionId + '-icon');
            
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.textContent = '▼';
            } else {
                content.style.display = 'none';
                icon.textContent = '▶';
            }
        }

        // 문서 편집
        function editPage() {
            if (!currentPage || !canEditPage(currentPage)) {
                const page = wikiData[currentPage];
                const pageAuthor = page.author;
                
                let message = '🔒 편집 권한이 없습니다.\n\n';
                
                if (currentUser) {
                    if (pageAuthor.includes('.')) {
                        message += `이 문서는 IP 사용자(${pageAuthor})가 작성했습니다.\n로그인된 계정으로는 IP 사용자가 작성한 문서를 편집할 수 없습니다.`;
                    } else {
                        message += `이 문서는 다른 계정(${pageAuthor})이 작성했습니다.\n본인이 작성한 문서만 편집할 수 있습니다.`;
                    }
                } else {
                    if (pageAuthor.includes('.')) {
                        message += `이 문서는 다른 IP(${pageAuthor})가 작성했습니다.\n현재 IP: ${userIP}\n\n같은 IP에서만 편집할 수 있습니다.`;
                    } else {
                        message += `이 문서는 등록된 계정(${pageAuthor})이 작성했습니다.\nIP 사용자는 계정으로 작성된 문서를 편집할 수 없습니다.`;
                    }
                }
                
                alert(message);
                return;
            }
            
            hideAllPages();
            document.getElementById('editPage').style.display = 'block';
            document.getElementById('editTitle').textContent = `"${currentPage}" 편집`;
            document.getElementById('editContent').value = wikiData[currentPage].content;
        }

        // 편집 취소
        function cancelEdit() {
            if (currentPage) {
                showPage(currentPage);
            } else {
                showMainPage();
            }
        }

        // 문서 저장
        function savePage() {
            const content = document.getElementById('editContent').value.trim();
            const summary = document.getElementById('editSummary').value.trim();
            
            if (!content) {
                alert('내용을 입력하세요.');
                return;
            }
            
            // 관리자가 아닌 경우에만 스팸 검사
            if (!isAdmin(currentUser) && isSpamContent(currentPage, content)) {
                const reasons = window.lastSpamReasons || ['알 수 없는 사유'];
                const score = window.lastSpamScore || 0;
                
                alert(`🚫 뻘문서로 판단되어 저장이 차단되었습니다.\n\n스팸 점수: ${score}점\n\n차단 사유:\n${reasons.map(r => `• ${r}`).join('\n')}`);
                return;
            }
            
            const page = wikiData[currentPage];
            const timestamp = new Date().toISOString();
            
            // 역사에 편집 기록 추가
            if (!page.history) {
                page.history = [];
            }
            
            page.history.push({
                timestamp: timestamp,
                author: currentUser || userIP,
                summary: summary || '편집 요약 없음',
                type: 'edit'
            });
            
            page.content = content;
            page.lastModified = timestamp;
            page.editCount++;
            
            // 사용자 통계 업데이트
            if (currentUser && users[currentUser]) {
                users[currentUser].editCount = (users[currentUser].editCount || 0) + 1;
                localStorage.setItem('wikiUsers', JSON.stringify(users));
            }
            
            localStorage.setItem('wikiData', JSON.stringify(wikiData));
            
            alert('문서가 저장되었습니다!');
            showPage(currentPage);
        }

        // 새 문서 생성 페이지
        function showCreatePage(title = '') {
            hideAllPages();
            document.getElementById('createPage').style.display = 'block';
            document.getElementById('newPageTitle').value = title;
            document.getElementById('newPageContent').value = '';
            
            // 탭 상태 초기화 (편집 탭 활성화)
            switchCreateTab('edit');
            
            currentPage = null;
        }

        // 새 문서 생성
        function createNewPage() {
            const title = document.getElementById('newPageTitle').value.trim();
            const content = document.getElementById('newPageContent').value.trim();
            
            if (!title || !content) {
                alert('제목과 내용을 모두 입력하세요.');
                return;
            }
            
            if (wikiData[title]) {
                alert('이미 존재하는 문서입니다.');
                return;
            }
            
            // 관리자가 아닌 경우에만 스팸 검사
            if (!isAdmin(currentUser) && isSpamContent(title, content)) {
                const reasons = window.lastSpamReasons || ['알 수 없는 사유'];
                const score = window.lastSpamScore || 0;
                
                alert(`🚫 뻘문서로 판단되어 생성이 차단되었습니다.\n\n스팸 점수: ${score}점\n\n차단 사유:\n${reasons.map(r => `• ${r}`).join('\n')}`);
                return;
            }
            
            const timestamp = new Date().toISOString();
            
            wikiData[title] = {
                content: content,
                author: currentUser || userIP,
                created: timestamp,
                lastModified: timestamp,
                editCount: 1,
                views: 0,
                history: [
                    {
                        timestamp: timestamp,
                        author: currentUser || userIP,
                        summary: '문서 생성',
                        type: 'create'
                    }
                ]
            };
            
            // 사용자 통계 업데이트
            if (currentUser && users[currentUser]) {
                users[currentUser].createdPages = (users[currentUser].createdPages || 0) + 1;
                users[currentUser].editCount = (users[currentUser].editCount || 0) + 1;
                localStorage.setItem('wikiUsers', JSON.stringify(users));
            }
            
            localStorage.setItem('wikiData', JSON.stringify(wikiData));
            
            // 문서 생성 후 자동으로 해당 문서 페이지로 이동
            showPage(title);
        }

        // 새 문서 생성 탭 전환
        function switchCreateTab(tab) {
            const editTab = document.getElementById('createEditTab');
            const previewTab = document.getElementById('createPreviewTab');
            const editArea = document.getElementById('createEditArea');
            const previewArea = document.getElementById('createPreviewArea');
            
            if (tab === 'edit') {
                // 편집 탭 활성화
                editTab.className = 'px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50';
                previewTab.className = 'px-4 py-2 font-medium text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300';
                editArea.style.display = 'block';
                previewArea.style.display = 'none';
            } else {
                // 미리보기 탭 활성화
                editTab.className = 'px-4 py-2 font-medium text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300';
                previewTab.className = 'px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50';
                editArea.style.display = 'none';
                previewArea.style.display = 'block';
                updateCreatePreview(); // 미리보기 업데이트
            }
        }
        
        // 새 문서 생성 미리보기 업데이트
        function updateCreatePreview() {
            const title = document.getElementById('newPageTitle').value.trim() || '문서 제목';
            const content = document.getElementById('newPageContent').value.trim();
            
            document.getElementById('createPreviewTitle').textContent = title;
            
            if (content) {
                document.getElementById('createPreviewContent').innerHTML = formatWikiContent(content);
            } else {
                document.getElementById('createPreviewContent').innerHTML = '<div class="text-gray-500 italic">내용을 입력하면 여기에 미리보기가 표시됩니다...</div>';
            }
        }

        // 인물 템플릿 사용
        function usePersonTemplate() {
            // 새 문서 생성 페이지가 아닌 경우 먼저 페이지를 표시
            if (document.getElementById('createPage').style.display === 'none') {
                showCreatePage();
            }
            
            // 제목이 없으면 기본 템플릿 제공
            let title = document.getElementById('newPageTitle').value.trim();
            if (!title) {
                title = '홍길동';
            }
            
            const template = `|| '''이름''' ||홍길동||
|| '''출생''' || 1999년 01월 01일 ([age(1999-01-01)])||
|| '''직업''' ||서울시장||
|| '''학력''' ||[[학교이름]](졸업)||

== 개요 ==
(내용입력)
== 생애 ==
(내용입력)
== 경력 ==
(내용입력)
== 병역 ==
(내용입력)
== 수상 ==
(내용입력)
== SNS ==
[[ 가로 안에 링크 주소를 넣으세요 ]]
== 여담 ==
(내용입력)

[[분류:인물]] [[분류:1999년 출생]]`;

            document.getElementById('newPageContent').value = template;
            
            // 미리보기 업데이트
            updateCreatePreview();
            
            // 제목이 비어있었다면 포커스를 제목 입력란으로
            if (document.getElementById('newPageTitle').value.trim() === '') {
                document.getElementById('newPageTitle').focus();
                alert('나무위키 스타일 인물 템플릿이 적용되었습니다!\n\n1. 먼저 문서 제목에 인물명을 입력하세요\n2. 템플릿의 정보표와 내용을 수정하여 사용하세요\n3. 나이 계산([age(1990-01-01)세])과 테이블 문법이 포함되어 있습니다\n4. "미리보기" 탭에서 결과를 확인할 수 있습니다');
            } else {
                alert('나무위키 스타일 인물 템플릿이 적용되었습니다! 정보표와 내용을 수정하여 사용하세요.\n나이 계산([age(1990-01-01)세]) 문법이 포함되어 있으며, "미리보기" 탭에서 결과를 확인할 수 있습니다.');
            }
        }

        // 데모 파일 업로드 처리
        function handleDemoFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            // 파일 크기 제한 (10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('파일 크기는 10MB 이하여야 합니다.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const filename = file.name;
                const fileData = {
                    data: e.target.result,
                    type: file.type,
                    size: formatFileSize(file.size),
                    uploadDate: new Date().toISOString(),
                    uploader: currentUser || userIP
                };
                
                uploadedFiles[filename] = fileData;
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
                
                displayDemoUploadedFile(filename, fileData);
                showDemoFileResult(filename, '업로드 완료');
            };
            
            reader.readAsDataURL(file);
        }
        
        // 데모 파일 결과 표시
        function showDemoFileResult(filename, action) {
            const resultDiv = document.getElementById('demoFileResult');
            const fileLink = `[[파일:${filename}]]`;
            
            resultDiv.innerHTML = `
                <div class="bg-green-100 border border-green-300 rounded-lg p-4">
                    <div class="flex items-center mb-2">
                        <span class="text-green-600 text-xl mr-2">✅</span>
                        <span class="font-semibold text-green-800">${action}</span>
                    </div>
                    <div class="text-sm text-green-700 mb-2">
                        <strong>파일명:</strong> ${filename}<br>
                        <strong>위키 문법:</strong> <code class="bg-white px-2 py-1 rounded">${fileLink}</code>
                    </div>
                    <div class="text-sm text-green-700">
                        이 문법을 문서에 사용하면 파일이 적절히 표시됩니다.
                    </div>
                </div>
            `;
            
            // 실제 파일 렌더링 미리보기
            if (uploadedFiles[filename]) {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'mt-3 p-3 bg-white border rounded';
                previewDiv.innerHTML = `
                    <div class="text-sm font-medium text-gray-700 mb-2">📋 문서에서 표시될 모습:</div>
                    ${formatWikiContent(fileLink)}
                `;
                resultDiv.appendChild(previewDiv);
            }
        }
        
        // 데모 업로드된 파일 표시
        function displayDemoUploadedFile(filename, fileData) {
            const container = document.getElementById('demoUploadedFiles');
            const fileType = fileData.type.split('/')[0];
            
            // 기존 파일 제거
            const existingFile = container.querySelector(`[data-filename="${filename}"]`);
            if (existingFile) {
                existingFile.remove();
            }
            
            let preview = '';
            if (fileType === 'image') {
                preview = `<img src="${fileData.data}" alt="${filename}" class="w-16 h-16 object-cover rounded border">`;
            } else if (fileType === 'video') {
                preview = `<video class="w-16 h-16 object-cover rounded border"><source src="${fileData.data}" type="${fileData.type}"></video>`;
            } else {
                preview = `<div class="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center text-2xl">${getFileIcon(filename)}</div>`;
            }
            
            const fileElement = document.createElement('div');
            fileElement.className = 'flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg';
            fileElement.setAttribute('data-filename', filename);
            fileElement.innerHTML = `
                ${preview}
                <div class="flex-1">
                    <div class="font-medium text-purple-800">${filename}</div>
                    <div class="text-sm text-purple-600">${fileData.size} • ${fileType}</div>
                    <div class="text-xs text-purple-500">업로드: ${fileData.uploader}</div>
                </div>
                <div class="text-right">
                    <div class="text-xs text-purple-600 mb-1">위키 문법:</div>
                    <code class="text-xs bg-white px-2 py-1 rounded border">[[파일:${filename}]]</code>
                </div>
            `;
            
            container.appendChild(fileElement);
        }

        // 랜덤 페이지
        function showRandomPage() {
            const pages = Object.keys(wikiData);
            if (pages.length === 0) {
                alert('문서가 없습니다.');
                return;
            }
            
            const randomPage = pages[Math.floor(Math.random() * pages.length)];
            showPage(randomPage);
        }

        // 최근 변경
        function showRecentChanges() {
            alert('최근 변경 기능은 준비 중입니다.');
        }

        // 도움말
        function showHelp() {
            alert('도움말 페이지는 준비 중입니다.');
        }

        // 위키 통계
        function showWikiStats() {
            alert('통계 페이지는 준비 중입니다.');
        }

        // 사용자 통계
        function showUserStats() {
            if (currentUser) {
                const user = users[currentUser];
                alert(`${currentUser}님의 통계:\n\n편집 횟수: ${user.editCount}회\n생성한 문서: ${user.createdPages}개\n가입일: ${new Date(user.joinDate).toLocaleDateString('ko-KR')}`);
            } else {
                alert('로그인 후 이용 가능합니다.');
            }
        }

        // 역사 보기
        function showHistory() {
            if (!currentPage || !wikiData[currentPage]) {
                alert('문서를 먼저 선택하세요.');
                return;
            }
            
            const page = wikiData[currentPage];
            const history = page.history || [];
            
            hideAllPages();
            document.getElementById('historyPage').style.display = 'block';
            document.getElementById('historyTitle').textContent = `"${currentPage}" 문서 역사`;
            
            const historyList = document.getElementById('historyList');
            
            if (history.length === 0) {
                historyList.innerHTML = `
                    <div class="bg-gray-100 p-6 rounded-lg text-center">
                        <div class="text-gray-600 mb-2">📝</div>
                        <div class="text-gray-700">편집 기록이 없습니다.</div>
                        <div class="text-sm text-gray-500 mt-1">이 문서는 아직 편집 기록이 저장되지 않았습니다.</div>
                    </div>
                `;
                return;
            }
            
            // 최신 순으로 정렬
            const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            historyList.innerHTML = sortedHistory.map((entry, index) => {
                const date = new Date(entry.timestamp);
                const typeIcon = entry.type === 'create' ? '🆕' : '✏️';
                const typeText = entry.type === 'create' ? '문서 생성' : '편집';
                const isLatest = index === 0;
                
                return `
                    <div class="bg-white border rounded-lg p-4 ${isLatest ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex items-center space-x-2">
                                <span class="text-lg">${typeIcon}</span>
                                <div>
                                    <div class="font-semibold text-gray-800">
                                        ${typeText}
                                        ${isLatest ? '<span class="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded ml-2">최신</span>' : ''}
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        ${date.toLocaleString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm font-medium text-gray-700">${entry.author}</div>
                                <div class="text-xs text-gray-500">
                                    ${entry.author.includes('.') ? 'IP 사용자' : '등록 사용자'}
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                            <div class="text-sm text-gray-700">
                                <strong>편집 요약:</strong> ${entry.summary}
                            </div>
                        </div>
                        
                        ${entry.type === 'create' ? `
                            <div class="mt-3 text-xs text-green-700 bg-green-50 p-2 rounded">
                                💡 이 시점에 문서가 처음 생성되었습니다.
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('');
        }
        
        // 문서로 돌아가기
        function backToPage() {
            if (currentPage) {
                showPage(currentPage);
            } else {
                showMainPage();
            }
        }

        // 파일 업로드 처리 (새 문서 생성)
        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            // 파일 크기 제한 (10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('파일 크기는 10MB 이하여야 합니다.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const filename = file.name;
                const fileData = {
                    data: e.target.result,
                    type: file.type,
                    size: formatFileSize(file.size),
                    uploadDate: new Date().toISOString(),
                    uploader: currentUser || userIP
                };
                
                uploadedFiles[filename] = fileData;
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
                
                displayUploadedFile(filename, fileData, 'uploadedFiles');
                
                // 텍스트 영역에 파일 링크 추가
                const textarea = document.getElementById('newPageContent');
                const fileLink = `[[파일:${filename}]]`;
                textarea.value += (textarea.value ? '\n\n' : '') + fileLink;
            };
            
            reader.readAsDataURL(file);
        }
        
        // 파일 업로드 처리 (편집)
        function handleEditFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            // 파일 크기 제한 (10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('파일 크기는 10MB 이하여야 합니다.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const filename = file.name;
                const fileData = {
                    data: e.target.result,
                    type: file.type,
                    size: formatFileSize(file.size),
                    uploadDate: new Date().toISOString(),
                    uploader: currentUser || userIP
                };
                
                uploadedFiles[filename] = fileData;
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
                
                displayUploadedFile(filename, fileData, 'editUploadedFiles');
                
                // 텍스트 영역에 파일 링크 추가
                const textarea = document.getElementById('editContent');
                const fileLink = `[[파일:${filename}]]`;
                textarea.value += (textarea.value ? '\n\n' : '') + fileLink;
            };
            
            reader.readAsDataURL(file);
        }
        
        // 업로드된 파일 표시
        function displayUploadedFile(filename, fileData, containerId) {
            const container = document.getElementById(containerId);
            const fileType = fileData.type.split('/')[0];
            
            let preview = '';
            if (fileType === 'image') {
                preview = `<img src="${fileData.data}" alt="${filename}" class="w-16 h-16 object-cover rounded border">`;
            } else if (fileType === 'video') {
                preview = `<video class="w-16 h-16 object-cover rounded border"><source src="${fileData.data}" type="${fileData.type}"></video>`;
            } else {
                preview = `<div class="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center text-2xl">📄</div>`;
            }
            
            const fileElement = document.createElement('div');
            fileElement.className = 'flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg';
            fileElement.innerHTML = `
                ${preview}
                <div class="flex-1">
                    <div class="font-medium text-green-800">${filename}</div>
                    <div class="text-sm text-green-600">${fileData.size} • ${fileType}</div>
                    <div class="text-xs text-green-500">[[파일:${filename}]] 형태로 문서에 삽입됩니다</div>
                </div>
                <button onclick="removeUploadedFile('${filename}', this.parentElement)" class="text-red-600 hover:text-red-800 p-1">
                    ❌
                </button>
            `;
            
            container.appendChild(fileElement);
        }
        
        // 업로드된 파일 제거
        function removeUploadedFile(filename, element) {
            if (confirm(`"${filename}" 파일을 삭제하시겠습니까?`)) {
                delete uploadedFiles[filename];
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
                element.remove();
            }
        }
        
        // 파일 크기 포맷팅
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // 파일 문법 삽입 (편집 페이지)
        function insertFileTemplate() {
            const filename = prompt('파일명을 입력하세요 (예: image.jpg, document.pdf):');
            if (filename && filename.trim()) {
                const textarea = document.getElementById('editContent');
                const fileLink = `[[파일:${filename.trim()}]]`;
                
                // 커서 위치에 삽입
                const cursorPos = textarea.selectionStart;
                const textBefore = textarea.value.substring(0, cursorPos);
                const textAfter = textarea.value.substring(textarea.selectionEnd);
                
                textarea.value = textBefore + fileLink + textAfter;
                
                // 커서를 삽입된 텍스트 뒤로 이동
                const newCursorPos = cursorPos + fileLink.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
                textarea.focus();
                
                alert(`파일 링크가 삽입되었습니다: ${fileLink}\n\n실제 파일을 업로드하려면 "📎 파일 업로드" 버튼을 사용하세요.`);
            }
        }

        // 파일 문법 삽입 (새 문서 생성 페이지)
        function insertFileTemplateCreate() {
            const filename = prompt('파일명을 입력하세요 (예: image.jpg, document.pdf):');
            if (filename && filename.trim()) {
                const textarea = document.getElementById('newPageContent');
                const fileLink = `[[파일:${filename.trim()}]]`;
                
                // 커서 위치에 삽입
                const cursorPos = textarea.selectionStart;
                const textBefore = textarea.value.substring(0, cursorPos);
                const textAfter = textarea.value.substring(textarea.selectionEnd);
                
                textarea.value = textBefore + fileLink + textAfter;
                
                // 커서를 삽입된 텍스트 뒤로 이동
                const newCursorPos = cursorPos + fileLink.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
                textarea.focus();
                
                alert(`파일 링크가 삽입되었습니다: ${fileLink}\n\n실제 파일을 업로드하려면 "📎 파일 업로드" 버튼을 사용하세요.`);
            }
        }

        // 파일 아이콘 가져오기
        function getFileIcon(filename) {
            const extension = filename.split('.').pop().toLowerCase();
            
            switch (extension) {
                case 'pdf':
                    return '📄';
                case 'doc':
                case 'docx':
                    return '📝';
                case 'xls':
                case 'xlsx':
                    return '📊';
                case 'ppt':
                case 'pptx':
                    return '📋';
                case 'txt':
                    return '📃';
                case 'zip':
                case 'rar':
                case '7z':
                    return '🗜️';
                default:
                    return '📎';
            }
        }

        // 파일 다운로드
        function downloadFile(filename) {
            if (uploadedFiles[filename]) {
                const file = uploadedFiles[filename];
                const link = document.createElement('a');
                link.href = file.data;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert('파일을 찾을 수 없습니다.');
            }
        }

        // 페이지 로드 시 초기화
        window.addEventListener('load', init);
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'96c2513434e0d1f5',t:'MTc1NDY5MDc0OC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
