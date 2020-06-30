import Joi from "@hapi/joi";
import User from "../../models/user";

/* 
  POST /api/auth/join
  {
    userId: 'seongjin',
    password: '123'
  }
*/
export const join = async (ctx) => {
  const schema = Joi.object().keys({
    userId: Joi.string().alphanum().min(2).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body); // 위에서 만든 틀에 맞춰 검증
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { userId, password } = ctx.request.body;
  try {
    // userId 이 이미 존재하는지 확인 (중복 확인)
    const exists = await User.findByUserId(userId); // Model 의 스태틱 메서드 사용
    if (exists) {
      ctx.status = 409; // Conflict
      ctx.body = "ID conflict";
      return;
    }

    const user = new User({
      userId,
    });
    await user.setPassword(password); // 비밀번호 설정    // Model 의 인스턴스 메서드 사용
    await user.save(); // DB에 저장

    ctx.body = user.serialize(); // hashed password 삭제해줌
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  POST /api/auth/login
  {
    userId: 'seongjin',
    password: '123'
  }
*/
export const login = async (ctx) => {
  const { userId, password } = ctx.request.body;
  // console.log(userId);
  // console.log(password);

  if (!userId || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUserId(userId);
    if (!user) {
      ctx.status = 401;
      ctx.body = "ID not found";
      return;
    }
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      ctx.status = 401;
      ctx.body = "Password not correct";
      return;
    }
    ctx.body = user.serialize(); // hashed password 삭제해줌

    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 24 * 7, // 7일 유효
      httpOnly: true, // 보안 상 JavaScript 로 쿠키를 조회하지 못하도록 설정
    });
    console.log(token);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 
  GET /api/auth/check
*/
export const check = async (ctx) => {};

/* 
  POST /api/auth/logout
*/
export const logout = async (ctx) => {};
