# 학습 노트 등록 안내

현재는 Codex가 Markdown을 HTML로 수동 변환합니다. 서버·데이터베이스·빌드 도구·브라우저 Markdown 변환기는 사용하지 않습니다.

## 파일 대응 규칙

- 원고: `notes/ai-it/python/<slug>.md`
- 게시 페이지: `pages/ai-it/study/python/<slug>.html`
- 목록: `pages/ai-it/study/python/index.html`
- 첫 예제: `variables-and-types.md` ↔ `variables-and-types.html`

파일 이름은 영문 소문자와 하이픈을 권장합니다. SQL 등은 같은 규칙으로 주제 폴더를 추가하면 됩니다.

## 새 노트 추가

1. 원고 폴더에 Markdown을 작성합니다. 제목, 소제목, 목록, fenced code block, 표를 사용할 수 있습니다.
2. Codex에 원고 경로를 알려주고 같은 slug의 HTML로 변환하도록 요청합니다. 기존 노트 HTML의 문서 구조와 공통 CSS를 재사용합니다.
3. Python 목록에 제목과 실제 HTML 상대 경로 링크를 추가합니다.
4. 예제임을 나타내는 문구는 이 샘플에만 적용합니다. 실제 사용자 노트를 예제로 표시하지 않습니다.
5. Breadcrumb, 메인 복귀, Study 복귀, Python 목록 링크와 모바일 코드·표 스크롤을 확인합니다.
6. 변경된 Markdown·HTML·목록 파일을 함께 게시합니다. Commit과 Push는 사용자가 수행합니다.

## 기존 노트 수정

Markdown만 수정해도 HTML이 자동 갱신되지는 않습니다. Codex에 수정된 Markdown을 대응 HTML에 다시 반영하도록 요청하고, 제목·본문·코드·표가 일치하는지 검토합니다. 제목이나 요약이 바뀌었다면 목록도 갱신합니다.

변환 시 코드의 `<`, `>`, `&`는 HTML 엔티티로 이스케이프하고, 임의의 스크립트나 실행 가능한 HTML을 원고에서 그대로 삽입하지 않습니다. 코드 블록은 `pre > code`, 표는 `.table-scroll > table` 구조를 사용합니다.

AI / IT는 현재 별도 허브 없이 Study 페이지를 진입점으로 사용합니다.
