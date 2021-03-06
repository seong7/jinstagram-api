import jwt from "jsonwebtoken";
import User from "../models/user";

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("access_token");
  // console.log("jwtMiddleware");
  if (!token) return next(); // 토큰 없을 때
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("state: ", ctx.state);

    // decoded (해석된) 결과를 이후 미들웨어에서 사용하기위해 ctx.state 에 넣어줌
    ctx.state.user = {
      _id: decoded._id,
      userId: decoded.userId,
    };

    // 토큰의 남은 유효 기간이 3.5 일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly: true,
      });
    }
    // console.log("state: ", ctx.state);
    // console.log(decoded);
    return next();
  } catch (e) {
    // 토큰 검증 실패 : 그냥 다음 미들웨어로 넘어감
    return next();
  }
};

export default jwtMiddleware;
