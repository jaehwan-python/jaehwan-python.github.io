# Markdown 학습 노트 자동 게시

## 최초 설정

이 자동화 파일들을 main에 반영한 뒤 GitHub 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 바꿉니다. 원격에 별도 Pages 워크플로가 있다면 중복 배포되지 않게 해제하세요. 현재 로컬에는 이전 워크플로가 없지만 원격 설정은 확인하지 못했습니다. Actions 실행을 허용하고 github-pages 환경의 배포 가능 브랜치에 main을 허용합니다.

## GitHub 웹에서 게시하는 순서

1. main 브랜치의 notes/AI-IT/, notes/English/, notes/KAU/ 중 원하는 카테고리 폴더로 이동합니다.
2. Add file → Create new file로 functions.md 같은 파일을 만듭니다.
3. 첫 줄에 # 함수처럼 제목을 쓰고 본문을 작성합니다.
4. Commit changes로 main에 반영합니다. 브랜치 보호 시 PR을 만들어 main에 병합합니다.
5. Actions → Build and deploy learning archive의 build와 deploy가 모두 성공했는지 확인합니다.
6. 사이트 카테고리 목록에서 노트를 열어 봅니다. 필요하면 브라우저를 새로고침합니다.

수정은 연필 버튼으로 Markdown을 편집하고 Commit하면 됩니다. 삭제도 Markdown 삭제 후 Commit합니다. HTML 변환·목록 갱신·배포는 다음 성공한 실행에서 자동으로 처리됩니다. VS Code나 Codex는 필요하지 않습니다.

## 경로 규칙

| Markdown 원고 | HTML 출력 |
| --- | --- |
| notes/AI-IT/python_basics.md | pages/ai-it/study/python_basics.html |
| notes/English/grammar_01.md | pages/english/grammar_01.html |
| notes/KAU/aviation_01.md | pages/kau/aviation_01.html |
| notes/AI-IT/python/functions.md | pages/ai-it/study/python/functions.html |

notes/ 최상위 학습 폴더는 **AI-IT, English, KAU**만 사용합니다. 대소문자를 정확히 맞추세요. AI-IT는 화면에서 AI/IT로 표시됩니다. 각 폴더 바로 아래에 .md 파일을 추가할 수 있고, 기존 python/ 같은 하위 폴더도 유지할 수 있습니다. 세 카테고리의 첫 페이지에 하위 폴더를 포함한 모든 문서 목록이 자동 생성됩니다. 하위 주제 목록도 기존 방식대로 갱신됩니다.

카테고리 아래 파일·폴더명은 영문 소문자, 숫자, 하이픈 또는 밑줄로 작성합니다. index.md는 목록용 예약 이름입니다. notes/AUTHORING.md와 .gitkeep은 게시 목록에 포함하지 않습니다. 첫 H1 제목을 목록에 사용하며 없으면 파일명을 사용합니다. 위 경로는 작성 예시이며 기존 문서의 존재를 뜻하지 않습니다. 원격에서 삭제한 기존 Python Markdown 문서는 복구하지 않습니다.

세 카테고리에는 각각 .gitkeep을 유지합니다. 학습 문서가 없더라도 폴더는 Git으로 관리되며 웹페이지에는 빈 목록 안내가 표시됩니다.

```text
notes/
├── AI-IT/.gitkeep
├── English/.gitkeep
├── KAU/.gitkeep
└── AUTHORING.md
```

## Markdown 문법

제목은 # 제목, 소제목은 ## 소제목을 사용합니다. 첫 H1이 없으면 파일명이 제목이 됩니다. 코드는 아래처럼 언어 이름을 붙입니다.

````markdown
# 함수

```python
def greet(name):
    return f"Hello, {name}"
```

| 항목 | 뜻 |
| --- | --- |
| name | 인자 |

- 핵심 정리
````

이미지는 원고 옆 images/ 폴더에 업로드하고 ![설명](images/example.png)처럼 연결합니다. 다른 노트는 [함수](functions.md)처럼 실제 존재하는 Markdown 원고 기준 상대 경로로 연결합니다. 빌더가 게시 HTML의 상대 경로로 바꿉니다. /assets/... 같은 사이트 루트 경로도 출력에서 상대 경로로 변환됩니다. 외부 https 링크도 지원합니다. 없는 이미지·링크·앵커는 검사를 실패시키므로 파일명과 대소문자를 확인하세요.

표·코드 블록·목록·링크·이미지를 지원합니다. GitHub 전용 Markdown 문법 전체를 지원하지는 않습니다. 스크립트, 이벤트 속성, 위험한 URL과 허용되지 않은 HTML은 정화됩니다.

## 생성 결과와 수동 파일

- 생성물은 _site/에만 저장하고 Git에 Commit하지 않습니다. 원본 Markdown, 메인 HTML/CSS/JS는 덮어쓰지 않습니다.
- 기존 수동 페이지는 복사해 유지합니다. Markdown과 같은 출력 경로의 수동 페이지가 있으면 빌드가 실패해 충돌을 알립니다.
- 기존 variables.html, variables-and-types.html은 scripts/legacy-notes.json에 Markdown 관리 경로로 등록했습니다. 원본 HTML은 보존되지만 배포 결과는 Markdown이 기준입니다. Markdown 삭제 시 옛 HTML이 다시 배포되지 않습니다.
- 카테고리 목록의 수동 링크는 보존하고 자동 노트는 한 번만 등록합니다. 새 기존 페이지를 Markdown 관리로 전환하려면 legacy-notes.json에 명시합니다.
- 빌드/검사가 실패하면 배포 작업을 실행하지 않아 기존 배포 사이트가 유지됩니다. 로그의 오류를 수정하고 다시 Commit하거나 Run workflow로 재실행합니다.
- 생성물을 main에 다시 Commit하는 단계가 없어 자동 Commit 루프가 생기지 않습니다.

## 로컬 확인 (선택)

Python 3.12에서 다음 명령을 실행합니다.

```text
python -m pip install -r requirements-build.txt
python -m unittest discover -s tests -v
python scripts/build_site.py
python scripts/build_site.py --check-only
```

_site/를 정적 HTTP 서버로 열어 확인합니다. 빌더는 자신이 만든 .generated-site 표시가 있는 _site/만 지우고 재생성합니다.

```text
python -m http.server 8000 --directory _site
```

http://localhost:8000 에서 카테고리와 문서를 확인하세요. 원본 폴더를 직접 열면 자동 생성 목록이 보이지 않습니다. 브라우저에서 폴더를 탐색하거나 JavaScript에 문서 경로를 등록할 필요가 없습니다.

## 검토 후 커밋·푸시

`git status --short`와 `git diff`로 변경 내용을 검토하고, 새 폴더·노트·빌더·테스트·안내서·index.html을 함께 커밋합니다. Windows의 대소문자 변경은 Git에서 `notes/ai-it/` 삭제와 `notes/AI-IT/` 추가(또는 이름 변경)로 잡혔는지 확인하세요. README.md와 기존 노트 내용은 수정할 필요가 없습니다. _site/, .build-deps/는 커밋하지 않습니다.

통합 브랜치의 결과를 검토하고 main에 반영한 뒤 푸시합니다. Actions의 build와 deploy 성공 여부와 실제 사이트의 새 문서를 확인합니다. 실제 배포 성공 여부는 푸시 후 확인해야 합니다. 테스트는 임시 폴더에 예제 문서를 생성하므로 저장소의 기존 학습 문서 유무에 의존하지 않습니다.
