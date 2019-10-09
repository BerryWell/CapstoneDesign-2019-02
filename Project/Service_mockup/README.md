## 공통

### 설치할 것들
- [nodejs](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/lang/en/) (설치하는 법: `npm install -g yarn`)

## 서버 개발시
```sh
cd capstone-api
yarn dev
```

## 프론트엔드 개발시
```sh
cd capstone-web
yarn dev # localhost:8000 접속하면 보임
```

## 프론트엔드 빌드시
```sh
cd capstone-web
yarn build # capstone-web/public 폴더가 생김. 이걸 정적 호스팅 서비스에 올리면 배포 끝
```
