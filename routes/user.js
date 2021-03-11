//引入express模块
const express=require('express');
//引入连接池对象
const pool=require('../pool.js');
//创建路由器对象
let router=express.Router();
//1.用户注册 post /reg
router.post('/reg',(req,res)=>{
  //1.1获取点断提交的数据
  let obj=req.body;
  console.log(obj);
  //1.2验证数据是否为空
  let count=400;
  for(let key in obj){
    count++;
    if(!obj[key]){
      res.send({
        code:count,
        msg:key+' required'
      });
      return;
    }
  }
  //1.3执行sql语句
  pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
    if(err){
      res.send({
        code:500,
        msg:'server error'
      });
    }
    console.log(result);
    if(result.affectedRows>0){
      res.send({
        code:200,
        msg:'register success'
      });
    }else{
      res.send({
        code:301,
        msg:'register error'
      });
    }
  });
});
//2.用户登录  post /login
router.post('/login',(req,res)=>{
  //2.1获取数据
  let obj=req.body;
  console.log(obj);
  //2.2验证数据是否为空
  let count=400;
  for(let key in obj){
    count++;
    if(!obj[key]){
      res.send({
        code:count,
        msg:key+' required'
      });
      return;
    }
  }
  //2.3执行SQL语句
  pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
    if(err){
      res.send({
        code:500,
        msg:'server error'
      });
      return;
    }
    console.log(result);
    if(result.length>0){
      res.send({
        code:200,
        msg:'login success'
      });
    }else{
      res.send({
        code:301,
        msg:'uname or upwd error'
      });
    }
  });
});
//3.用户检索 get /detail
router.get('/detail',(req,res)=>{
  //3.1获取数据
  let obj=req.query;
  console.log(obj);
  //3.2验证数据是否为空
  if(!obj.uid){
    res.send({
      code:401,
      msg:'uid required'
    });
    return;
  }
  //3.3执行SQL命令
  pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err){
      res.send({
        code:500,
        msg:'server error'
      });
      return;
    }
    console.log(result);
    if(result.length>0){
      res.send({
        code:200,
        msg:'ok',
        data:result[0]
      });
    }else{
      res.send({
        code:301,
        msg:'未检索到用户'
      });
    }
  });
});
//4.删除用户 get /delete
router.get('/delete',(req,res)=>{
  //4.1获取数据
  let obj=req.query;
  console.log(obj);
  //4.2验证数据是否为空
  if(!obj.uid){
    res.send({
      code:401,
      msg:'uid required'
    });
    return;
  }
  //4.3执行SQL命令
  pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err){
      res.send({
        code:500,
        msg:'server error'
      });
      return;
    }
    console.log(result);
    if(result.affectedRows>0){
      res.send({
        code:200,
        msg:'delete success'
      });
    }else{
      res.send({
        code:301,
        msg:'delete error'
      });
    }
  });
});
//5.用户列表 get /list
router.get('/list',(req,res)=>{
  //5.1获取数据
  let obj=req.query;
  console.log(obj);
  //5.2判断数据是否为空,若为空设置默认值
  if(!obj.pno){
    obj.pno=1;
  }
  if(!obj.pagesize){
    obj.pagesize=2;
  }
  //计算start
  let start=(obj.pno-1)*obj.pagesize;
  //将每页大小转为整型
  obj.pagesize=parseInt(obj.pagesize);
  //5.3执行SQL命令
  pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,obj.pagesize],(err,result)=>{
    if(err){
      res.send({
        code:500,
        msg:'server error'
      });
      return;
    }
    console.log(result);
    if(result.length>0){
      res.send({
        code:200,
        msg:'ok',
        data:result
      });
    }else{
      res.send({
        code:301,
        msg:'无用户'
      });
    }
  });
});
//6.修改用户信息 post /update
router.post('/update',(req,res)=>{
  //6.1获取数据
  let obj=req.body;
  console.log(obj);
  //6.2判断数据是否为空
  let count=400;
  for(let key in obj){
    count++;
    if(!obj[key]){
      res.send({
        code:count,
        msg:key+' required'
      });
      return;
    }
  }
  //6.3执行SQL命令
  pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],(err,result)=>{
    if(err){
      res.send({
        code:500,
        msg:'server error'
      });
      return;
    }
    console.log(result);
    if(result.affectedRows>0){
      res.send({
        code:200,
        msg:'update success'
      });
    }else{
      res.send({
        code:301,
        msg:'update error'
      });
    }
  });
});
//导出路由器对象
module.exports=router;