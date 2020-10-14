# Web Api Server

Web API Server 의 repository 입니다.

Linux 환경의 AWS EC2 인스턴스에 배포되어 있습니다.

## Package List

<table>
  <thead>
    <tr>
      <th>Package</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>koa</td>
    <td>Nodejs Web-framework</td>
  </tr>
  <tr>
    <td>@koa/cors</td>
    <td>koa 로 구축한 server 의 cors 를 허용해주는 라이브러리</td>
  </tr>
  <tr>
    <td>koa-bodyparser</td>
    <td>ctx.request.body 를 사용하여 request body 내 데이터에 접근하게 해주는 라이브러리</td>
  </tr>
  <tr>
    <td>dotenv</td>
    <td>.env 파일내에 저장된 환경변수를 app 내에서 사용할 수 있게 해주는 라이브러리</td>
  </tr>
  <tr>
    <td>esm</td>
    <td>ECMAScript Module (import / export 기능 지원)</td>
  </tr>
  <tr>
    <td>mongoose</td>
    <td>MongoDB 기반의 ODM(Object Data Modeling) 라이브러리 (DB document 를 JS 객체처럼 사용 가능하게 해준다.)</td>
  </tr>
  <tr>
    <td>jsonwebtoken</td>
    <td>JWT 기능을 제공하는 라이브러리</td>
  </tr>
  <tr>
    <td>bcrypt</td>
    <td>password 암호화에 사용된 라이브러리</td>
  </tr>
  <tr>
    <td>@hapi/joi</td>
    <td>API request body 검증을 위한 라이브러리</td>
  </tr>
</table>
