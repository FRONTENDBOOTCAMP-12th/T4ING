# T4ING

![T4ING Top](https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/top.png)
[타잉 바로가기](https://t4ing.vercel.app)

## 📜 목차

1. [🌟 프로젝트 소개](#-프로젝트-소개)
2. [🧑‍🤝‍🧑 TEAM 4인머스켓](#-TEAM-4인머스켓)
3. [🛠️ 개발환경](#️-개발환경)
4. [🎯 개발목표 및 컨벤션](#-개발목표-및-컨벤션)
   - [기능 요구사항 충족](#기능-요구사항-충족)
   - [컨벤션](#컨벤션)
5. [📑 주요 기능](#-주요-기능)
6. [📂 프로젝트 구조](#-프로젝트-구조)
7. [🖥️ 애플리케이션 동작](#%EF%B8%8F-애플리케이션-동작)

## 🌟 프로젝트 소개

> 멋쟁이 사자처럼 프론트엔드 부트캠프 12기 바닐라 프로젝트  
> OTT 플랫폼 [TIVING](https://www.tving.com/)의 시안을 사용한 프로젝트입니다.

- **T4ING**은 **4인머스켓**이 [Lit](https://lit.dev), [PocketHost](https://pocketbase.io/), [Swiper](https://swiperjs.com/), [GSAP](https://greensock.com/gsap/) 등을 사용하여 개발한 **반응형 웹 애플리케이션**입니다.  
  가독성이 높고 직관적인 UI/UX를 제공합니다.
- 프로젝트 진행기간 : 2024.12.12. ~ 2025.01.03.

<br>

## 🧑‍🤝‍🧑 TEAM 4인머스켓

![4인머스켓 로고](/public/assets/images/og.png)

| 이름                                                                                                                                                                                   | 역할    | 주요 기여                                               | GitHub                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------- | ----------------------------------------- |
| <div align="center"><img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/icon.png?size=100" width="80" height="80" alt="윤헌주"/> <br> **윤헌주**</div> | 팀 리더 | 스크럼 마스터, 랜딩 페이지                              | [hunzooyun](https://github.com/hunzooyun) |
| <div align="center"><img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/icon.png?size=100" width="80" height="80" alt="박혜미"/> <br> **박혜미**</div> | 조원    | 프로필 편집, 검색 기능, 모달, 헤더, 푸터, 가이드 페이지 | [bohyemian](https://github.com/bohyemian) |
| <div align="center"><img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/icon.png?size=100" width="80" height="80" alt="김민규"/> <br> **김민규**</div> | 조원    | 백엔드 설계, 로그인, 회원가입, 프로젝트 배포            | [MinQyu](https://github.com/MinQyu)       |
| <div align="center"><img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/icon.png?size=100" width="80" height="80" alt="전혜림"/> <br> **전혜림**</div> | 조원    | 메인페이지, Swiper 공통 컴포넌트 설계                   | [mintnaka](https://github.com/mintnaka) |

<br>

## 🛠️ 개발환경

| 분류                    | 기술                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 프론트엔드              | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white) ![Lit](https://img.shields.io/badge/Lit-324FFF?style=for-the-badge&logo=lit&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) |
| 백엔드                  | ![Pocketbase](https://img.shields.io/badge/Pocketbase-009688?style=for-the-badge&logo=databricks&logoColor=white)                                                                                                                                                                                                                                                                                                 |
| 빌드 툴                 | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                                                                                                                                                                                                                   |
| 패키지 매니저           | ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                                                                                                                                                                                                                      |
| 협업 툴                 | ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                                                                                              |
| 코드 품질 툴            | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)                                                                                                                                                                                                 |
| 디자인 & 개발 환경(IDE) | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)                                                                                                                                                                                    |
| 호스팅                  | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                                                                                                                                                                             |

<br>

## 🎯 개발목표 및 컨벤션

### 기능 요구사항 충족

- 슬라이드가 필요한 ui에서는 [**swiper.js**](https://swiperjs.com/)를 사용
  - 각 슬라이드를 데이터로 받아 동적으로 렌더링 되도록 제작
  - 슬라이드의 `prev`, `next` 버튼도 구현
  - 키보드 키로도 작동되도록 구현
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 사용하여 “시청 중인 컨텐츠”의 UI를 구성
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 사용하여 검색기록이 남을 수 있도록 UI를 구성
- 랜딩페이지 애니메이션을 구현
- “회원가입 기능”을 구현
  - 최소한 이메일, 비밀번호 입력 필드(`input`), 제출 버튼(`button`)을 가지도록 구성
- 이메일과 비밀번호의 유효성을 확인
  - 이메일 조건 : 최소 `@`, `.` 포함
  - 비밀번호 조건 : 특수문자 포함 최소 6자 - 최대 16자
  - 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 구현
- 회원가입을 통해 사용자(user)를 생성하고 관리
  - 데이터 통신을 통해 유저를 생성하고 관리
  - 유저의 회원을 탈퇴할 수 있는 기능을 구현
  - 로그인된 유저를 인식하여 UI를 다르게 랜더링
  - 로그인되지 않은 사용자면 회원가입 페이지로 리디렉션
  - 회원가입시 중복된 유저가 있는지 체크

### 컨벤션

- [코딩 컨벤션](https://github.com/FRONTENDBOOTCAMP-12th/T4ING/wiki/%EC%BD%94%EB%94%A9-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [커밋 컨벤션](https://github.com/FRONTENDBOOTCAMP-12th/T4ING/wiki/%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98)

<br>

## 📑 주요 기능

- **사용자 인증**: PocketHost를 활용한 회원가입, 로그인, 회원 탈퇴 기능.
- **사용자 맞춤형 서비스**: 사용자 프로필 편집, 검색어 저장 기능.
- **반응형 UI**: 디바이스 크기별 반응형 UI 디자인.
- **swiper**: swiper.js를 이용한 인터랙티브 UI.
- **모듈화된 컴포넌트**: Lit을 사용한 재사용 가능한 웹 컴포넌트

<br>

## 📂 프로젝트 구조

```
T4ING
├─ .env
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierrc.cjs
├─ guide
├─ index.html
├─ index.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  ├─ fonts
│  │  ├─ images
│  │  │  ├─ bg
│  │  │  ├─ icon
│  │  │  ├─ logo
│  │  │  └─ profile
├─ README.md
├─ src
│  ├─ @types
│  ├─ api
│  ├─ components
│  │  ├─ goodbye
│  │  ├─ landing
│  │  ├─ layout
│  │  ├─ login
│  │  ├─ main
│  │  ├─ profile
│  │  ├─ register
│  │  ├─ search
│  │  └─ user
│  ├─ pages
│  │  ├─ goodbye
│  │  ├─ landing
│  │  ├─ login
│  │  ├─ main
│  │  ├─ profile
│  │  ├─ register
│  │  └─ user
│  ├─ styles
│  ├─ utils
│  └─ vite-env.d.ts
├─ tsconfig.json
└─ vite.config.js

```

<br>

## 🖥️ 애플리케이션 동작

### 메인

<img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/main.gif" alt="메인"/>

### 랜딩

<img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/landing.gif" alt="랜딩"/>

### 회원가입

<img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/join.gif" alt="회원가입"/>

### 로그인

<img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/login.gif" alt="로그인"/>

### 프로필 편집

<img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/profile.gif" alt="프로필 편집"/>

### 검색

<img src="https://raw.githubusercontent.com/wiki/FRONTENDBOOTCAMP-12th/T4ING/README/search.gif" alt="검색"/>

<br>

> [go top](#T4ING)
