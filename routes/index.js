const express = require('express');
const router = express.Router();
const db = require('../selfContent/database');
const { check, validationResult } = require('express-validator/check');
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
    //res.end();
    res.render('mapbox');
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
      res.render('includes/table', data);
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
      if(!data.targetData){
        res.redirect('/login'); return;
      }
      res.render('kullanicilar/form',data);
  }
});
router.get('/toplucariekle',async function(req,res,next){
  var l=res.locals.l;
  var data={
    title:l.getLanguage('toplucari'),
    cardHeader:l.getLanguage('toplucariekle')
  };
  res.render('cariler/toplucari', data);

});
router.get('/toplucarihareketiekle',async function(req,res,next){
  var l=res.locals.l;
  var data={
    title:l.getLanguage('topluCarihareketi'),
    cardHeader:l.getLanguage('toplucarihareketiekle')
  };
  res.render('cariler/topluCariHareketi', data);

});
router.get('/cariler/:id',async function(req,res,next){
  var l=res.locals.l; 
  var session=req.session.user;
  if(  !req.params.id){
    res.redirect('/login'); return;
  }
  var dbName=(await new db().selectQuery({firmaId:session.firmaId},"dbler"))[0].dbAdi;
  var data={
    title: l.getLanguage('carilistele'),
    bolgeler : await new db().selectAll('bolgeler',dbName),
    iller:[]
  };
  var colNameS=["id","bolgeId","cariAdi","cariIli","cariTel","cariFaks","cariEPosta","cariYetkiliKisiAdi","cariYetkiliKisiSoyadi","cariYetkiliKisiTel","cariAciklama"];
  switch(req.params.id) {
    case "table":
      data.iller=await new db().selectAll('iller',dbName);
      data.tableBody= (await new db().selectWithColumn(colNameS,"cariler",null,null,dbName)).map(
        x=>{
          x.bolgeId=data.bolgeler.find(y=> y.id==x.bolgeId).bolgeAdi;
          x.cariIli=data.iller.find(y=> y.id==x.cariIli).il_adi;
          return x;
        } 
      );
      data.tableHead= colNameS;
      data.cardHeader=l.getLanguage('carilistele');
      res.render('includes/table', data);
      break;
    case "form":
      data.illerHash=selfScript.generateHash(session,"iller",dbName,["il_adi"]);  
      colNameS=colNameS.concat(["carilerKoordinat","cariVergiDairesi","cariVergiNo","cariMernis","cariIlce","cariMahalle","cariSok_Cad","cariBinaNo","cariDaireNo","cariLogo"]);
      data.cardHeader=l.getLanguage('cariekle');
      data.targetData={}; 
      colNameS.map(x=> data.targetData[x]=""); 
      res.render('cariler/form',data);
    break;
    default:
      data.illerHash=selfScript.generateHash(session,"iller",dbName,["il_adi"]);
      colNameS=colNameS.concat(["cariKoorCap","carilerKoordinat","cariVergiDairesi","cariVergiNo","cariMernis","cariIlce","cariMahalle","cariSok_Cad","cariBinaNo","cariDaireNo","cariLogo"]);
      data.cardHeader=l.getLanguage('cariduzenle');
      data.targetData=(await new db().selectWithColumn(colNameS,"cariler",{id : req.params.id  },null,dbName))[0];
      if(!data.targetData){
        res.redirect('/login'); return;
      }
      data.iller=await new db().selectQuery({bolgeId:data.targetData.bolgeId},'iller',null,dbName);
      if(data.targetData.carilerKoordinat){
        data.targetData.Latitude=data.targetData.carilerKoordinat.split(",")[0];
        data.targetData.Longitude=data.targetData.carilerKoordinat.split(",")[1];
      }
      res.render('cariler/form',data);
  }
});
router.get('/bolgeler/:id',async function(req,res,next){
  var l=res.locals.l; 
  var session=req.session.user;
  if(  !req.params.id){
    res.redirect('/login'); return;
  }
  var dbName=(await new db().selectQuery({firmaId:session.firmaId},"dbler"))[0].dbAdi;
  var data={
    title: l.getLanguage('bolgeler')
  };
  switch(req.params.id) {
    case "table":
      var colNameS=["id","sorumluId","bolgeAdi"];
      data.iller=await new db().selectAll('iller',dbName);
      var sql=`
      SELECT bolgeler.id,CONCAT(kullanicilar.kullaniciIsim,' ',kullanicilar.kullaniciSoyisim) AS sorumluId,bolgeler.bolgeAdi FROM ${dbName}.bolgeler as bolgeler 
        LEFT JOIN sbs.kullanicilar as kullanicilar 
          on kullanicilar.id=bolgeler.sorumluId 
          WHERE bolgeler.silindiMi=0;
      `;
      data.tableBody= (await new db().query(sql));
      data.tableHead= colNameS;
      data.cardHeader=l.getLanguage('bolgeler');
      res.render('includes/table', data);
      break;
    case "form":
      var colNameS=["id","sorumluId","bolgeAdi","bolgelerAciklama"];
      data.cardHeader=l.getLanguage('bolgeekle');
      data.targetData={}; 
      colNameS.map(x=> data.targetData[x]="");
      data.kullanicilar=await new db().selectQuery({firmaId:session.firmaId},'kullanicilar');
      res.render('bolgeler/form',data);
    break;
    default:
      var colNameS=["id","sorumluId","bolgeAdi","bolgelerAciklama"];
      data.cardHeader=l.getLanguage('bolgeduzenle');
      data.targetData=(await new db().selectWithColumn(colNameS,"bolgeler",{id : req.params.id  },null,dbName))[0];
      if(!data.targetData){
        res.redirect('/login'); return;
      }
      data.kullanicilar=await new db().selectQuery({firmaId:session.firmaId},'kullanicilar');
      res.render('bolgeler/form',data);
  }
});
router.get('/belgetipleri/:id',async function(req,res,next){
  var l=res.locals.l; 
  var session=req.session.user;
  if(  !req.params.id){
    res.redirect('/login'); return;
  }
  var dbName=(await new db().selectQuery({firmaId:session.firmaId},"dbler"))[0].dbAdi;
  var data={
    title: l.getLanguage('belgetipleri')
  };
  var colNameS=["id","belgeTipAdi","belgeTipi"];
  switch(req.params.id) {
    case "table":
      belgeTipleri=await new db().selectAll('belge_tipleri',dbName);
      data.tableBody= belgeTipleri.map(x=>{ x.belgeTipi=x.belgeTipi=="a"?"alacak":"borc";  return x});
      data.tableHead= colNameS;
      data.cardHeader=l.getLanguage('belgetipleri');
      res.render('includes/table', data);
      break;
    case "form":
      data.cardHeader=l.getLanguage('belgetipiekle');
      data.targetData={}; 
      colNameS.map(x=> data.targetData[x]="");
      res.render('cariler/belgeTipleriForm',data);
    break;
    default:
      data.cardHeader=l.getLanguage('belgetipiduzenle');
      data.targetData=(await new db().selectWithColumn(colNameS,"belge_tipleri",{id : req.params.id  },null,dbName))[0];
      if(!data.targetData){
        res.redirect('/login'); return;
      }
      res.render('cariler/belgeTipleriForm',data);
  }
});
router.get('/iller/:id',async function(req,res,next){
  var l=res.locals.l; 
  var session=req.session.user;
  if(  !req.params.id){
    res.redirect('/login'); return;
  }
  var dbName=(await new db().selectQuery({firmaId:session.firmaId},"dbler"))[0].dbAdi;
  var data={
    title: l.getLanguage('iller')
  };
  var colNameS=["id","il_adi","plaka_no","bolgeId","tel_kod"];
  switch(req.params.id) {
    case "table":
      data.iller=await new db().selectAll('iller',dbName);
      var sql=`
      SELECT iller.id,iller.il_adi,iller.plaka_no,bolgeler.bolgeAdi AS bolgeId,iller.tel_kod FROM ${dbName}.iller as iller 
        LEFT JOIN ${dbName}.bolgeler as bolgeler 
          on iller.bolgeId=bolgeler.id 
          WHERE iller.silindiMi=0;
      `; 
      data.tableBody= (await new db().query(sql));
      data.tableHead= colNameS;
      data.cardHeader=l.getLanguage('iller');
      res.render('includes/table', data);
      break;
    case "form":
      data.cardHeader=l.getLanguage('ilekle');
      data.targetData={}; 
      colNameS.map(x=> data.targetData[x]="");
      data.bolgeler=await new db().selectAll('bolgeler',dbName);
      res.render('iller/form',data);
    break;
    default:
      data.cardHeader=l.getLanguage('ilduzenle');
      data.targetData=(await new db().selectWithColumn(colNameS,"iller",{id : req.params.id  },null,dbName))[0];
      if(!data.targetData){
        res.redirect('/login'); return;
      }
      data.bolgeler=await new db().selectAll('bolgeler',dbName);
      res.render('iller/form',data);
  }
});
router.get('/carihareketleri/:id',async function(req,res,next){
  var l=res.locals.l; 
  var session=req.session.user;
  if(  !req.params.id){
    res.redirect('/login'); return;
  }
  var dbName=(await new db().selectQuery({firmaId:session.firmaId},"dbler"))[0].dbAdi;
  var data={
    title: l.getLanguage('carihareketleri')
  };
  var colNameS=["id","cariId","belgeTipId","belgeNo","belgeTarihi","a","b"];
  switch(req.params.id) {
    case "table":
      data.iller=await new db().selectAll('iller',dbName);
      var sql=`
      SELECT cari_hareketler.id,cariler.cariAdi AS cariId,belge_tipleri.belgeTipAdi AS belgeTipId,cari_hareketler.belgeNo,cari_hareketler.belgeTarihi,cari_hareketler.a,cari_hareketler.b FROM ${dbName}.cari_hareketler as cari_hareketler 
        LEFT JOIN ${dbName}.belge_tipleri as belge_tipleri 
          on cari_hareketler.belgeTipId=belge_tipleri.id 
        LEFT JOIN ${dbName}.cariler as cariler 
          on cari_hareketler.cariId=cariler.id 
          WHERE cari_hareketler.silindiMi=0;
      `; 
      data.tableBody= (await new db().query(sql));
      data.tableHead= colNameS;
      data.cardHeader=l.getLanguage('carihareketleri');
      res.render('includes/table', data);
      break;
    case "form":
      data.cariler=JSON.stringify(await new db().selectWithColumn(['id','cariAdi','cariYetkiliKisiAdi','cariYetkiliKisiSoyadi','cariAciklama'],'cariler',null,null,dbName));
      data.cardHeader=l.getLanguage('carihareketiekle'); 
      data.targetData={}; 
      colNameS.map(x=> data.targetData[x]="");
      data.belgeTipleri=await new db().selectAll('belge_tipleri',dbName);
      res.render('cariler/cariHareketleriForm',data);
    break;
    default:
      data.cariler=JSON.stringify(await new db().selectWithColumn(['id','cariAdi','cariYetkiliKisiAdi','cariYetkiliKisiSoyadi','cariAciklama'],'cariler',null,null,dbName));
      data.cardHeader=l.getLanguage('carihareketiduzenle');
      data.targetData=(await new db().selectWithColumn(colNameS,"cari_hareketler",{id : req.params.id  },null,dbName))[0];
      if(!data.targetData){
        res.redirect('/login'); return;
      }
      data.belgeTipleri=await new db().selectAll('belge_tipleri',dbName);
      res.render('cariler/cariHareketleriForm',data);
  }
});
router.get('/anketler/:id',async function(req,res,next){
  var l=res.locals.l; 
  var session=req.session.user;
  if(  !req.params.id){
    res.redirect('/login'); return;
  }
  var dbName=(await new db().selectQuery({firmaId:session.firmaId},"dbler"))[0].dbAdi;
  var data={
    title: l.getLanguage('anketler')
  };
  var colNameS=["id","anketAdi","anketCinsi"];
  switch(req.params.id) {
    case "table":
      data.tableBody= await new db().selectAll('anketler',dbName);
      data.tableHead= colNameS;
      data.cardHeader=l.getLanguage('anketler');
      res.render('includes/table', data);
      break;
    case "form":
      data.anketSorulariHash=selfScript.generateHash(session,"anket_sorulari",dbName,["soruText","soruTipId","cevapText"]);
      data.anketSorulari=JSON.stringify([]);
      data.cardHeader=l.getLanguage('anketolustur');
      data.soruTipleri=await new db().selectAll('anket_soru_tipleri');
      data.anketler=await new db().selectAll('anketler',dbName);
      data.targetData={}; 
      colNameS.map(x=> data.targetData[x]="");
      res.render('anketler/form',data); 
    break;
    default:
      //data.cardHeader= bunun yerine anket adını gönderdim formda
      data.soruTipleri=await new db().selectAll('anket_soru_tipleri');
      data.targetData=(await new db().selectQuery({id : req.params.id  },"anketler",null,dbName))[0];
      data.anketSorulari=(await new db().selectQuery({anketId : req.params.id  },"anket_sorulari",null,dbName)).map(
        x=>{
          x.soruTipId=data.soruTipleri.find(y=> y.id==x.soruTipId).cevapTipi;
          return x;
        } 
      );
      if(!data.targetData){
        res.redirect('/login'); return;
      }
      res.render('anketler/anketGosterim',data);
  }
});
module.exports = router;
