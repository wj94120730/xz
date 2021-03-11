//创建web服务
const express=require('express');
let app=express();
app.listen(8080);
//引入body-parser中间件
const bodyParser=require('body-parser');
//托管静态资源到public
app.use(express.static('public'));
//使用body-parser中间件
app.use(bodyParser.urlencoded({
  extended:false
}));
//引入用户路由器
const userRouter=require('./routes/user.js');
//挂载路由
app.use('/user',userRouter);