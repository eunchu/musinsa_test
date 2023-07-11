# MUSINSA 프론트엔드 과제

---

## 기술 스택

- React + Typescript
- Vite (빌드)

## Getting Started

```
yarn install
yarn dev
```

### 기능 목록

- ✅ 상단 타이틀, 필터 영역은 페이지 상단에 고정
- ✅ 단독상품일 경우 Label 표기
- ✅ 세일상품일 경우 할인률과 기존 가격 표기
- ✅ 무한 스크롤(스크롤 목록이 하단까지 내려왔을 경우)
- ✅ 필터의 토글 기능, 활성화 시 목록에 적용
- ✅ 필터 내 검색은 조회된 데이터에 한해 적용
- ✅ 검색은 키 입력에 따른 자동완성
- ✅ 품절상품은 비노출이 기본
- ✅ 필터에서 품절포함 선택 시 노출
- ✅ 이미지 없을 경우 대체이미지 사용
- ✅ 목록이 없을 경우 피그마에 디자인된 UI 출력

---

### 폴더구조

```
├── apis
│   ├── interface       # api관련 인터페이스
│   ├── goods.ts        # api관리
│   ├── query-keys.ts   # query key관리
├── components
│   ├── organisms       # 페이지 구성 컴포넌트
│   ├── pages           # 페이지 컴포넌트
├── utils               # 공통 함수 관리
├── routers             # 라우터 관리
├── styles              # 스타일 관리
├── assets              # 이미지파일 관리
└── ....etc
```

---

### 환경설정 / 설치된 라이브러리

- react router v6 (라우팅 기능 구현에 사용)
  - styled components, styled-normalize (styling)
  - vite-tsconfig-paths, @types/node (절대경로 설정을 위한 플러그인)
  - react query (서버 상태 관리)
  - axios (API 연동)

1. 경로(path alias) 설정

- 깔끔한 경로 관리를 위해 플러그인(vite-tsconfig-paths, @types/node) 설치 후, 관련 코드를 추가하였습니다.
  - `vite.config.ts`, `tsconfig.json (8-12line 추가)` 파일 변경

2. 폴더구조

- 아토믹 디자인 구조로 컴포넌트가 구성되어 있습니다.

---

### 기능 구현 설명

- 상품 목록

  - 중복으로 들어가있는 아이템이 제거된 목록 전체를 Default로 호출하였습니다.

- 필터/검색

  - 필터 기능 관련은 `components > pages > Main.tsx` 에 구현되어 있습니다.
  - 필터/검색이 적용된 상태에서는 다음 항목이 노출되지 않도록 무한스크롤 기능을 정지시켰습니다.

- 검색
  - 검색어는 추가로 계속 입력 가능하도록 구현되었습니다.
  - and검색으로 구현되었습니다.

### 그 외 사항

- 파일내부에 코드관련히여 간단한 주석을 달아두었습니다.
- 제공된 피그마의 아이콘 중 일부가, 이미지 파일로 다운로드 되지 않아 아이콘 이미지가 디자인과 동일하지 않은 부분이 있습니다.
