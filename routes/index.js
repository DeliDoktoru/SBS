var express = require('express');
var router = express.Router();
const db= require('../selfContent/database');


/* GET home page. */
router.get('/', async function(req, res, next) {
  //var a=await new db().query( 'SELECT * FROM sbs.test;' );
  //console.log(/);
  res.write("registera gitcennn");
  res.end();
  //res.render('index', { title: 'Express' });
});
router.get('/register', async function(req, res, next) {
  var data={
    title:"register",
    iller: await new db().selectAll('iller'),
    abonelik_turleri: await new db().selectAll('abonelik_turleri'),
    odeme_tipleri: await new db().selectAll('odeme_tipleri')
  };
  res.render('register', data);
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
    //await new db().query('DELETE FROM sbs.test WHERE id= ?',[23]);
    //await new db().query({sql:'SELECT 1+:s FROM sbs.test',namedPlaceholders: true},{s:"a"});
    await new db().remove({a:"a",b:"c"},"test","AND")
    res.write("ok")
    res.end();
  } catch (error) {
    res.write(error.message || JSON.stringify(error))
    res.end();
  }
 
});
module.exports = router;
