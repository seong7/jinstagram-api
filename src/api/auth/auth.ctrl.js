import User from '../../models/user';


/* 
  POST /api/auth/register
  {
    username: 'seongjin',
    password: '123'
  }
*/
export const register = ctx => {}

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