> 배포 레파지토리 [밍큐네 T4ING](https://github.com/MinQyu/T4ING)

# T4ING

![T4ING Top](/public/assets/images/README/top.png)

> 배포 레파지토리 [밍큐네 T4ING](https://github.com/MinQyu/T4ING)

## 🌟 프로젝트 소개

**T4ING**은 **4인머스켓**이 개발한 [Vite](https://vitejs.dev), [Lit](https://lit.dev), [TypeScript](https://www.typescriptlang.org), [PocketHost](https://pocketbase.io/), [Swiper](https://swiperjs.com/), [GSAP](https://greensock.com/gsap/) 등을 사용하여 개발된 **반응형 웹 애플리케이션**입니다.  
이 프로젝트는 직관적인 UI/UX를 제공하며, 최신 기술을 통해 빠르고 효율적인 웹 경험을 선사합니다.

---

## 🧑‍🤝‍🧑 TEAM 4인머스켓

![4인머스켓 로고](/public/assets/images/og.png)

| 이름                                                                                                                                 | 역할    | 주요 기여                                                        | GitHub                                    |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------- | ----------------------------------------- |
| <div align="center"><img src="https://github.com/hunzooyun.png?size=100" width="80" height="80" alt="윤헌주"/> <br> **윤헌주**</div> | 팀 리더 | 스크럼 마스터, 랜딩 페이지                                       | [hunzooyun](https://github.com/hunzooyun) |
| <div align="center"><img src="https://github.com/bohyemian.png?size=100" width="80" height="80" alt="박혜미"/> <br> **박혜미**</div> | 조원    | 가이드 페이지, 이미지 리소스 관리, 헤더, 푸터, 프로필 편집, 모달 | [bohyemian](https://github.com/bohyemian) |
| <div align="center"><img src="https://github.com/MinQyu.png?size=100" width="80" height="80" alt="김민규"/> <br> **김민규**</div>    | 조원    | 백엔드 설계, 로그인, 회원가입, 프로젝트 배포                     | [MinQyu](https://github.com/MinQyu)       |
| <div align="center"><img src="https://github.com/gofla1996.png?size=100" width="80" height="80" alt="전혜림"/> <br> **전혜림**</div> | 조원    | 메인페이지, Swiper 공통 컴포넌트 설계                            | [gofla1996](https://github.com/gofla1996) |

---

## 🛠️ 개발환경

| 분류                    | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 프론트엔드              | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) |
| 빌드 도구               | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                                                                                                                                                                                                                                        |
| 백엔드                  | ![Pocketbase](https://img.shields.io/badge/Pocketbase-009688?style=for-the-badge&logo=databricks&logoColor=white)                                                                                                                                                                                                                                                                                                                      |
| 패키지 매니저           | ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                                                                                                                                                                                                                                           |
| 협업 툴                 | ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                                                                                                                   |
| 코드 품질 도구          | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)                                                                                                                                                                                                                      |
| 디자인 & 개발 환경(IDE) | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)                                                                                                                                                                                                         |
| 호스팅                  | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                                                                                                                                                                                                  |

---

## 📑 주요 기능

1. **사용자 인증**: PocketHost를 활용한 회원가입, 로그인, 회원 탈퇴 기능
2. **애니메이션 효과**: GSAP을 활용한 부드러운 애니메이션
3. **인터랙티브 UI**: Swiper로 구현한 직관적인 UI 및 슬라이드 기능
4. **모듈화된 컴포넌트**: Lit을 사용한 재사용 가능한 웹 컴포넌트

---

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
