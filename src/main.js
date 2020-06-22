import Koa from 'koa';
import Router from 'koa-router';
import bodyParder from 'koa-bodyparser';
import mongoose from 'mongoose';

const { PORT } = process.env;
const app = new Koa();

const port = PORT || 4000;
app.listen(port, () => {
  console.log("Listening to port %d", port);
})