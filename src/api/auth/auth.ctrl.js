import Joi from '@hapi/joi';
import User from '../../models/user';

/* 
  POST /api/auth/register
  {
    username: 'seongjin',
    password: '123'
  }
*/
export const register = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
      password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body); // 위에서 만든 틀에 맞춰 검증
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    // username 이 이미 존재하는지 확인 (중복 확인)
    const exists = await User.findByUsername(username); // Model 의 스태틱 메서드 사용
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
    })
    await user.setPassword(password); // 비밀번호 설정    // Model 의 인스턴스 메서드 사용
    await user.save(); // DB에 저장

    // 응답할 데이터에서 hashedPassword 필드 제거
    const data = user.toJSON();
    delete data.hasedPassword;
    ctx.body = data;

  } catch (e) {
    ctx.throw(500, e);
  }
}

/*
  POST /api/auth/login
  {
    username: 'seongjin',
    password: '123'
  }
*/
export const login = async ctx => {
  const { username, password } = ctx.request.body;

  if(!username || !password) {
    ctx.status = 401 // Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if(!user) {
      ctx.status = 401;
      return;
    }
    const isValid = await user.checkPassword(password);
    if(!isValid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();  // hashed password 삭제해줌

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 24 * 7, // 7일 유효
      httpOnly: true, // 보안 상 JavaScript 로 쿠키를 조회하지 못하도록 설정
    })
    console.log(token);
  } catch (e) {
    ctx.throw(500, e);
  }
}

/* 
  GET /api/auth/check
*/
export const check  = async ctx => {}

/* 
  POST /api/auth/logout
*/
export const logout = async ctx => {}