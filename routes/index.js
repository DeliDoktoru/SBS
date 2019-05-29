var express = require('express');
var router = express.Router();
const db = require('../selfContent/database');
const { check, validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', async function(req, res, next) {
  //var a=await new db().query( 'SELECT * FROM sbs.test;' );
  res.write("registera gitcennn");
  res.end();
  //res.render('index', { title: 'Express' });
});
router.get('/dashboard', async function(req, res, next) {
  var l=res.locals.l;
  var data={
    title:l.getLanguage('dashboard'),
  };
  res.render('dashboard', data);
});
router.get('/test1', async function(req, res, next) {
  var l=res.locals.l;
  var data={
    title:l.getLanguage('register'),
    iller: await new db().selectAll('iller'),
    abonelik_turleri: await new db().selectAll('abonelik_turleri'),
    odeme_tipleri: await new db().selectAll('odeme_tipleri')
  };
  res.render('register1', data);
});
router.get('/register', async function(req, res, next) {
  var l=res.locals.l;
  var data={
    title:l.getLanguage('register'),
    iller: await new db().selectAll('iller'),
    abonelik_turleri: await new db().selectAll('abonelik_turleri'),
    odeme_tipleri: await new db().selectAll('odeme_tipleri')
  };
  res.render('register', data);
});
router.get('/login', async function(req, res, next) {
  var l=res.locals.l;
  var data={
    title:l.getLanguage('login'),
  };
  res.render('login', data);
});
router.get('/test', async function(req, res, next) {
  //var a= await new db().selectAll( 'abonelik_turleri' );
  /*try {
    await new db().insert( { a:"azxzcxzxczsol",b:"1231"},"test" );
    res.write("ok")
    res.end();
  } catch (error) {
    res.write(JSON.stringify(error))
    res.end();
  }*/
  
  try {
    //const yetki= require('../selfContent/yetki');
    //var a=new yetki();
    //console.log(a.pagesFromUnvanId(1));
    //await new db().query('DELETE FROM sbs.test WHERE id= ?',[23]);
    //await new db().query({sql:'SELECT 1+:s FROM sbs.test',namedPlaceholders: true},{s:"a"});
    //await new db().remove({a:"a",b:"b"},"test","AND")
    //console.log(await new db().insert({ a:"azxzcxzxczsol",b:"1231"},"test"))
    //var a=await new db().update({a:"a",b:"b"},{b:"b"},"test");
    //var a=await new db().selectIn("id",[1,2],"sayfalar");
    //res.write(JSON.stringify(a))
    //await new db().setSilindi({a:"azxzcxzxczsol"},"test");
    var a=await new db().selectWithColumn(["id","a"],"test");
    res.write(JSON.stringify(a))
    res.end();
  } catch (error) {
    res.write(error.message || JSON.stringify(error))
    res.end();
  }
 
});
router.get('/kullanicilar',async function(req,res,next){
  var l=res.locals.l;
  var colNameS=["id","kullaniciIsim","kullaniciSoyisim","kullaniciTel","kullaniciEPosta"];
  var data={
    title: l.getLanguage('kullanicilar'),
    tableBody: await new db().selectWithColumn(colNameS,"kullanicilar",{firmaId:req.session.user.firmaId}),
    tableHead: colNameS
  };
  res.render('kullanicilar', data);
});


module.exports = router;
