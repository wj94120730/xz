const express=require('express');
//创建路由器对象
let router=express.Router();
//引入pool对象
const pool=require('../pool.js');
//1.商品列表 get /list
router.get('/list',(req,res)=>{
  //1.1获取数据
  let obj=req.query;
  console.log(obj);
  //1.2判断数据是否为空,若为空设置默认值
  if(!obj.pno){
    obj.pno=1;
  }
  if(!obj.count){
    obj.count=2;
  }
  //1.3计算start
  let start=(obj.pno-1)*obj.count;
  //将obj.count转为整型
  obj.count=parseInt(obj.count);
  //1.4执行SQL语句
  pool.query('SELECT * FROM xz_laptop LIMIT ?,?',[start,obj.count],(err,result)=>{
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
        msg:'商品为空'
      });
    }
  });
});
//2.商品详情 get /detail
router.get('/detail',(req,res)=>{
  //2.1获取数据
  let obj=req.query;
  console.log(obj);
  //2.2判断数据是否为空
  if(!obj.lid){
    res.send({
      code:401,
      msg:'lid resuired'
    });
    return;
  }
  //2.3执行SQL命令
  pool.query('SELECT * FROM xz_laptop WHERE lid=?',[obj.lid],(err,result)=>{
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
        msg:'无此商品'
      });
    }
  });
});
//3.删除商品 get /delete
router.get('/delete',(req,res)=>{
  //获取数据
  let obj=req.query;
  console.log(obj);
  //判断数据是否为空
  if(!obj.lid){
    res.send({
      code:401,
      msg:'商品编号为空'
    });
    return;
  }
  //执行sql语句
  pool.query('DELETE FROM xz_laptop WHERE lid=?',[obj.lid],(err,result)=>{
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
        msg:'商品删除成功'
      });
    }else{
      res.send({
        code:301,
        msg:'商品删除失败'
      });
    }
  });
});
//4.添加商品 post /add
router.post('/add',(req,res)=>{
  //获取数据
  let obj=req.body;
  console.log(obj);
  //判断数据是否为空
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
  //执行sql语句
  pool.query('INSERT INTO xz_laptop SET ?',[obj],(err,result)=>{
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
        msg:'商品添加成功'
      });
    }else{
      res.send({
        code:301,
        msg:'商品添加失败'
      });
    }
  });
});
//导出路由器对象
module.exports=router;