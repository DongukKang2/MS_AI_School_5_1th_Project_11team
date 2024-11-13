# Microsoft AI School 5기 11팀 프로젝트
## 프로젝트 시연 영상 
- gradio로 배포한 영상입니다.
- 시연해보실 분은 이메일로 연락주시면 배포하겠습니다.
![최종_시연영상](https://github.com/user-attachments/assets/3dfee855-bf00-4843-a2a2-9343c90bcde4)


## 📋 프로젝트 개요

- 프로젝트명: [프로젝트 이름]
- 기간: 2024.10.31(목) ~ 2024.11.11(월) 
- 팀원: 강동욱, 강찬영, 김경민, 김령현, 이재이, 최연희

## 프로젝트 주제 정하기

- CustomVision을 통한 이미지 분석 및 영양 솔루션 제공 서비스
: 음식 이미지를 인식하고, 해당 음식의 영양 성분을 제공하여 
개인 맞춤형 추천 식단과 주변 식당 추천 시스템 개발 


## 🎯 프로젝트 목표
1. 프로젝트 주제 선정 배경 및 목적
- 현대인의 불균형한 식습관이 비만과 만성질환의 주된 원인으로 지목되었다는 기사를 통해 심각성을 인지함
- 니즈는 분명하나 시간이 부족한 현대인을 위해 자동화 서비스를 구현하고자 함
- 궁극적으로는 현대인의 식습관 개선을 돕고, 건강한 영양소 섭취를 지원하기 위함

2. 프로젝트 주제 컨셉 및 타겟 계층
- 건강관리에 관심이 많은 바쁜 현대인
- 대면 고객을 대상으로 하는 음식점

3. 프로젝트의 특장점 및 유사 제품과의 차별점
현대인의 식습관을 개선하기 위한 메뉴 추천 서비스
CF. 고카페인, 다이어트의 신 어플 

## 🔍 주요 기능

- 서비스 차별화를 위한 구현 방법(활용 기술) 및 활용 방안
· 지도 기반 서비스 통합
사용자의 위치를 기반으로 인근 음식점을 지도 위에 표시하고 추천

· 음식 이미지 인식 기술(Azure Custom Vision)
사용자가 업로드한 음식 이미지를 자동으로 인식, 
이를 통해 사용자의 일일 섭취량을 누적하고, 이를 보완할 수 있는 적절한 식단을 추천

· 사용자 피드백 및 학습 시스템(Feedback Loop)
사용자로부터 받은 피드백을 바탕으로 추천 알고리즘을 지속적으로 개선

## 🛠 기술 스택
- Frontend
HTML: 웹 페이지의 구조를 정의
CSS: 웹 페이지의 스타일링
JavaScript: 클라이언트 측 동적 기능 구현
Gradio: ML 모델을 위한 UI 생성 라이브러리

- Backend
Python: 서버 측 프로그래밍 언어
MySQL: 데이터베이스 관리 시스템
Nodejs: 서버 측 JavaScript 런타임


- AI/ML
Azure Machine Learning: 클라우드 기반 ML 플랫폼
Custom Vision: 컴퓨터 비전 서비스
Gradio: ML 모델을 위한 UI 생성 라이브러리


- Tools
Github: 버전 관리 및 협업 플랫폼
NPM: Node.js 패키지 관리자
Axios: HTTP 클라이언트 라이브러리

### Git/GitHub
- https://github.com/DongukKang2/MS_AI_School_5_1th_Project_11team

## 📁 프로젝트 구조
Copyproject-root/
│

├── frontend/
HTML
CSS
JavaScript
Gradio
├── backend/
Python
MySQL
Nodejs
├── model/
Azure Machine Learning
Custom Vision
Gradio
└── docs/
Github
NPM
Axios

## 👥 역할 분담
- 강동욱 : 데이터 수집 및 전처리, 위치 기반 지도 서비스 API 구현, 지도 BE/FE
- 강찬영 : Custom Vision 기반 이미지 분류 모델 개발, FE, Notion 문서화
- 김경민 : 식단 추천 AI Model 개발, 영양성분 DB 전처리, 권장섭취량 계산 툴 구현
- 김령현 : 데이터 분류, Custom Vision 기반 이미지 분류 모델 개발
- 이재이 : 식단 추천 AI Model 개발, KNN 활용 추천 알고리즘 개발
- 최연희 : Custom Vision 기반 이미지 분류 모델 개발, Figma UI 디자인, FE

## 📅 개발 일정

- 1~2일차{2024.10.31(목)~2024.11.01(금)}: 프로젝트 기획 및 환경 설정
- 3~4일차{2024.11.04(월)~2024.11.05(화)}: 프로젝트 연구
- 5~6일차{2024.11.06(수)~2024.11.08(목)}: 발표 준비
- 7~8일차{2024.11.09(금)~2024.11.11(월)}: 최종발표 준비

## 🏃‍♂️ 시작하기

### 저장소 클론

- bashCopygit clone https://github.com/DongukKang2/MS_AI_School_5_1th_Project_11team.git

### 필요한 패키지 설치

- bashCopypip install -r requirements.txt


- 프로젝트 문의: kdu79644@gmail.com
- GitHub Issues를 통한 버그 리포트 및 기능 제안


작성 날짜: 2024.10.31(목)


마지막 업데이트: 2024.11.11(월)
