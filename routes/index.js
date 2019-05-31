const express = require('express');
const router = express.Router();
const db = require('../selfContent/database');
const { check, validationResult } = require('express-validator/check');
const customValidation= require('../selfContent/customValidation');
const selfScript= require('../selfContent/selfScript');
/* GET home page. */
router.get('/', async function(req, res, next) {
  //var a=await new db().query( 'SELECT * FROM sbs.test;' );
  //res.write("registera gitcennn");
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
    //var a=await new db().selectWithColumn(["id","a"],"test");
    //var a=await new db().selectAll('kullanici_unvanlar');
    /*var a=await new db().query(`
    CREATE TABLE \`sbs\`.\`test2\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`a\` varchar(22) NOT NULL,
      \`b\` varchar(45) DEFAULT NULL,
      \`silindiMi\` varchar(45) DEFAULT '0',
      PRIMARY KEY (\`id\`),
      UNIQUE KEY \`id_UNIQUE\` (\`id\`)
    ) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);*/
    //var a=require('../selfContent/databaseDump')();
    //var b=await new db().query(a);
    //await new db().insert({ a:"azxzcxzxczsol",b:"1231"},"test").then(x=>{ console.log(this.selectAll("test")); console.log(x)})
    //await new db().generateCariDatabase("sbs_comp_2");
    //var a={ b: "as" , c:"cd"};
    //customValidation.removeNotAllowedProperties(["b"],a)
    //res.write(JSON.stringify(a))
    res.end();
  } catch (error) {
    res.write(error.message || JSON.stringify(error))
    res.end();
  }
 
});
router.get('/profile/:id',async function(req, res, next){
  var l=res.locals.l;
  if( !req.params.id){
    res.redirect('/login'); return;
  }
  var unvanlar=await new db().selectAll('kullanici_unvanlar');
  var data={
    title: l.getLanguage('profil'),
    editable:false
  };
  var colNameS=["id","kullaniciIsim","kullaniciSoyisim","kullaniciUnvan","kullaniciTel","kullaniciEPosta","kullaniciFoto","hakkinda"];
  data.targetData=(await new db().selectWithColumn(colNameS,"kullanicilar",{id : req.params.id , firmaId:req.session.user.firmaId }))[0] ;
  if(!data.targetData || !data.targetData.id){
    res.redirect('/login'); return;
  }
  if(req.params.id==req.session.user.id){
    data.editable=true;
  }
  data.targetData.kullaniciUnvan=unvanlar.find(y=> y.id==data.targetData.kullaniciUnvan).unvanAdi;
  res.render('profile',data);
});

router.get('/kullanicilar/:id',async function(req,res,next){
  var l=res.locals.l;
  // session,firma ve id kontrolü
  if( !req.params.id){
    res.redirect('/login'); return;
  }
  var data={
    title: l.getLanguage('kullanicilar'),
    unvanlar : await new db().selectAll('kullanici_unvanlar')
  };
  var colNameS=["id","kullaniciIsim","kullaniciSoyisim","kullaniciUnvan","kullaniciTel","kullaniciEPosta"];
  switch(req.params.id) {
    case "table":
      data.tableBody= (await new db().selectWithColumn(colNameS,"kullanicilar",{firmaId:req.session.user.firmaId})).map(
        x=>{
          x.kullaniciUnvan=data.unvanlar.find(y=> y.id==x.kullaniciUnvan).unvanAdi;
          return x;
        }
      );
      data.tableHead= colNameS;
      data.cardHeader=l.getLanguage('kullanicilar');
      res.render('kullanicilar/table', data);
      break;
    case "form":
      data.cardHeader=l.getLanguage('kullaniciekle');
      data.targetData={}; 
      colNameS.map(x=> data.targetData[x]="");
      res.render('kullanicilar/form',data);
    break;
    default:
      data.cardHeader=l.getLanguage('kullaniciduzenle');
      data.targetData=(await new db().selectWithColumn(colNameS,"kullanicilar",{id : req.params.id , firmaId:req.session.user.firmaId }))[0];
      res.render('kullanicilar/form',data);
  }
});
router.get('/cariler/:id',async function(req,res,next){
  var l=res.locals.l; 
  var session=req.session.user;
  // session,firma ve id kontrolü
  if(  !req.params.id){
    res.redirect('/login'); return;
  }
  var dbName=(await new db().selectQuery({firmaId:session.firmaId},"dbler"))[0].dbAdi;
  var data={
    title: l.getLanguage('carilistele'),
    bolgeler : await new db().selectAll('bolgeler',dbName),
    iller:[]
  };
  var colNameS=["id","bolgeId","cariAdi","cariAdres","cariIliId","cariTel","cariFaks","cariEPosta","cariYetkiliKisiAdi","cariYetkiliKisiSoyadi","cariYetkiliKisiTel"];
  switch(req.params.id) {
    case "table":
      data.iller=await new db().selectAll('iller',dbName);
      data.tableBody= (await new db().selectWithColumn(colNameS,"cariler",null,null,dbName)).map(
        x=>{
          x.bolgeId=data.bolgeler.find(y=> y.id==x.bolgeId).bolgeAdi;
          x.cariIliId=data.iller.find(y=> y.id==x.cariIliId).il_adi;
          return x;
        }
      );
      data.tableHead= colNameS;
      data.cardHeader=l.getLanguage('carilistele');
      res.render('cariler/table', data);
      break;
    case "form":
      data.illerHash=selfScript.generateHash(session,"iller",dbName,"il_adi");  
      colNameS=colNameS.concat(["carilerKoordinat","cariVergiDairesi","cariVergiNo","cariMernis"]);
      data.cardHeader=l.getLanguage('cariekle');
      data.targetData={}; 
      colNameS.map(x=> data.targetData[x]="");
      res.render('cariler/form',data);
    break;
    default:
      data.illerHash=selfScript.generateHash(session,"iller",dbName,"il_adi");
      colNameS=colNameS.concat(["carilerKoordinat","cariVergiDairesi","cariVergiNo","cariMernis"]);
      data.cardHeader=l.getLanguage('cariduzenle');
      data.targetData=(await new db().selectWithColumn(colNameS,"cariler",{id : req.params.id  },null,dbName))[0];
      data.iller=await new db().selectQuery({bolgeId:data.targetData.bolgeId},'iller',null,dbName);
      res.render('cariler/form',data);
  }
});


module.exports = router;
