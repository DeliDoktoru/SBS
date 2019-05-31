const express = require('express');
const router = express.Router();
const { check , validationResult } = require('express-validator/check');
const db= require('../selfContent/database');
const md5 = require('md5');
const multer  = require('multer');
const customValidation= require('../selfContent/customValidation');
const selfScript= require('../selfContent/selfScript');
/* #region  multer storage */
var storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/public/firmaImages/')
  },
  filename: function (req, file, cb) {
    if(req.session.user && req.session.user.firmaId){
      var fileName=req.session.user.firmaId+"-"+md5(Math.random())+".jpg";
      req.fileName=fileName;
      cb(null, fileName) ;
    }
    else{
      req.fileValidationError='yetkibulunamadi';
      return cb(null, false)
    }
  }
});
var uploadImage = multer({ storage: storageImage, limits: { fileSize: 1024 * 1024 * 1024 } ,
  fileFilter: function (req, file, cb) {
  if (req.session.user && req.session.user.firmaId ) {
    cb(null, true)
  }
  else{
    req.fileValidationError='yetkibulunamadi';
    return cb(null, false)
  }
  
}});
/* #endregion */
/* #region  uploadImage*/
router.post('/uploadImage',uploadImage.single('file'), async function(req, res, next) {
  var text="", status=0,fileName="" ;
  var l=res.locals.l;
  if(req.fileValidationError){
    text=l.getLanguage(req.fileValidationError);
  }
  else{
    status=1;
    fileName=req.fileName;
    text=l.getLanguage("resimbasariylayuklendikaydetebasmayiunutmayiniz");
  }
  
  res.send({
    message: text,
    status: status,
    fileName:fileName
  });
});
/* #endregion */
/* #region  changeLanguage */
router.post('/changeLanguage', async function(req, res, next) {
  req.session.language = req.body.language;
  res.send({});
});
/* #endregion */
/* #region  login */
router.post('/login',
[
check('kdata').exists(),
check('kdata.kullaniciEPosta').exists().not().isEmpty().withMessage("epostaalanigerekli").isEmail().withMessage("gecersizeposta").isLength({max: 100}).withMessage("epostamax100"),
check('kdata.kullaniciParola').exists().not().isEmpty().withMessage("paraloalanigerekli").isLength({min:4,max: 45}).withMessage("paralomin4max45")
]
,async function(req, res, next) {
  var l=res.locals.l;
  var data=req.body.kdata;
  var text, status=0 ;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.array();
    }
    var user=(await new db().selectQuery({
      kullaniciEPosta:data.kullaniciEPosta,
      kullaniciParola:md5(data.kullaniciParola)
    },"kullanicilar"));
    if(user && user.length>1){
      global.errorLoger({
        message:"kullancı sorgusunda birden fazla sonuç geldi",
        stack:"kullaniciEPosta:"+data.kullaniciEPosta+" kullaniciParola:"+md5(data.kullaniciParola)
      });
      throw "beklenmedikbirhataolustu";
    }
    else if (user && user.length==1 ) {
      req.session.user = user[0];
      req.session.user.tableNames=[];
    }
    else{
      throw "epostayadaparalohatali";
    }
    text = l.getLanguage("girisyapiliyor");
    status = 1;
  } catch (error) {
    status = 0;
    if (error.message != undefined)
      text = l.getLanguage(error.message);
    else if(Array.isArray(error)){
      text=error.map(x=> l.getLanguage(x.msg)+"<br>")
    }  
    else
      text = (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
  }
  
  res.send({
    message: text,
    status: status,
  });

});
/* #endregion */
/* #region  register */
router.post('/register',
 [
  check('kdata').exists(),
  check('kdata.kullaniciIsim').exists().not().isEmpty().withMessage("isimalanigerekli").isLength({max: 100}).withMessage("isimalanimax100"),
  check('kdata.kullaniciSoyisim').exists().not().isEmpty().withMessage("soyisimalanigerekli").isLength({max: 100}).withMessage("soyisimalanimax100"),
  check('kdata.kullaniciParola').exists().not().isEmpty().withMessage("paraloalanigerekli").isLength({min:4,max: 45}).withMessage("paralomin4max45"),
  check('kdata.ckullaniciParola').exists().not().isEmpty().withMessage("paraloalanigerekli").isLength({min:4,max: 45}).withMessage("paralomin4max45"),
  check('kdata.kullaniciTel').exists().not().isEmpty().withMessage("telalanigerekli").isLength({max: 45}).withMessage("kullanicitelmax45"),
  check('kdata.kullaniciEPosta').exists().not().isEmpty().withMessage("epostaalanigerekli").isEmail().withMessage("gecersizeposta").isLength({max: 100}).withMessage("epostamax100"),
  check('kdata.paketTercihi').exists().not().isEmpty().withMessage("pakettercihialanigerekli"),
  check('kdata.odemeTipi').exists().not().isEmpty().withMessage("odemetipialanigerekli"),
  check('kdata.firmaIli').exists().not().isEmpty().withMessage("firmailialanigerekli"),
  check('kdata.firmaAdi').exists().not().isEmpty().withMessage("firmaadialanigerekli").isLength({max: 100}).withMessage("firmaadimax100"),
  check('kdata.firmaAdres').exists().not().isEmpty().withMessage("firmadresialanigerekli").isLength({max: 100}).withMessage("firmaadresimax100"),
  check('kdata.firmaVergiDairesi').exists().not().withMessage("vergidairesalanigerekli").isEmpty().isLength({max: 100}).withMessage("firmavergidairesimax100"),
  check('kdata.firmaVergiNo').exists().not().isEmpty().withMessage("verginoalanigerekli").isLength({max: 45}).withMessage("firmavergino45"),
  check('kdata.firmaFaks').exists().not().isEmpty().withMessage("faksalanigerekli").isLength({max: 45}).withMessage("firmafaksmax45"),
  check('kdata.firmaTel').exists().not().isEmpty().withMessage("firmatelalanigerekli").isLength({max: 45}).withMessage("firmatelmax45"),
]
,async function(req, res, next) {
  var l=res.locals.l;
  var data=req.body.kdata;
  var text, status=0 ;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.array();
    }
    if(data.kullaniciParola!=data.ckullaniciParola){
      throw "parolalareslesmedi";
    }
    var isEmailUniqe=(await new db().selectQuery({
      kullaniciEPosta:data.kullaniciEPosta,
    },"kullanicilar"));
    if(isEmailUniqe && isEmailUniqe.length>1){
      global.errorLoger({
        message:"kullancı sorgusunda birden fazla sonuç geldi",
        stack:"kullaniciEPosta:"+data.kullaniciEPosta
      });
      throw "beklenmedikbirhataolustu";
    }
    else if (  !isEmailUniqe ||  ( isEmailUniqe  && isEmailUniqe.length>0) ) {
      throw "buepostaadresikullaniliyor";
    }
    var firmaId=(await new db().insert({ 
      firmaAdi : data.firmaAdi.toUpperCase() ,
      firmaAdres : data.firmaAdres,
      firmaVergiDairesi : data.firmaVergiDairesi.toUpperCase(),
      firmaVergiNo : data.firmaVergiNo,
      firmaFaks : data.firmaFaks,
      firmaTel : data.firmaTel,
      firmaIli : data.firmaIli,
      firmaYetkiliKisiAdi : data.kullaniciIsim.toUpperCase(),
      firmaYetkiliKisiSoyadi : data.kullaniciSoyisim.toUpperCase(),
      firmaYetkiliKisiTel : data.kullaniciTel,
      firmaEPosta : data.kullaniciEPosta
    }
    ,"firmalar")).insertId;
    await new db().insert({
      firmaId : firmaId,
      kullaniciUnvan : 1,
      kullaniciAdi: data.kullaniciEPosta,
      kullaniciParola : md5(data.kullaniciParola),
      kullaniciIsim : data.kullaniciIsim.toUpperCase(),
      kullaniciSoyisim : data.kullaniciSoyisim.toUpperCase(),
      kullaniciTel : data.kullaniciTel,
      kullaniciEPosta : data.kullaniciEPosta,
      kullaniciDilTercihi : l.language || "tr"
    }, "kullanicilar");
    await new db().insert(
      { firmaId : firmaId,
      abonelikleraboneTipId : data.paketTercihi,
      abonelikOdemeTipi : data.odemeTipi
      },"abonelikler"
    );
    var dbName="sbs_comp_"+firmaId;
    await new db().insert(
      {
        firmaId:firmaId,
        dbAdi:dbName
      },"dbler"
    );
    await new db().generateCariDatabase(dbName);
    text={};  
    text.title = l.getLanguage("kayıttamamlandi");
    text.content= "";
    text.footer=l.getLanguage("sorunmuyasiyorsunuz");
    text.contactus=l.getLanguage("bizeulasin");
    text.continuelogin=l.getLanguage("girissayfasinailerle");
    status = 1;
  } catch (error) {
    status = 0;
    if (error.message != undefined)
      text = l.getLanguage(error.message);
    else if(Array.isArray(error)){
      text=error.map(x=> l.getLanguage(x.msg)+"<br>")
    }  
    else
      text = (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
  }
  
  res.send({
    message: text,
    status: status,
  });
});
/* #endregion */
/* #region  kullanicilar */
router.post('/kullanicilar',
[
  check('kdata').exists(),
  check('kdata.kullaniciIsim').exists().not().isEmpty().withMessage("alanigerekli").isLength({max: 100}).withMessage("max100"),
  check('kdata.kullaniciSoyisim').exists().not().isEmpty().withMessage("alanigerekli").isLength({max: 100}).withMessage("max100"),
  check('kdata.kullaniciTel').exists().not().isEmpty().withMessage("alanigerekli").isLength({max: 45}).withMessage("max45"),
  check('kdata.kullaniciEPosta').exists().not().isEmpty().withMessage("alanigerekli").isEmail().withMessage("gecersizeposta").isLength({max: 100}).withMessage("max100"),
  check('kdata.kullaniciUnvan').exists().not().isEmpty().withMessage("alanigerekli").isLength({max: 11}).withMessage("max11"),
  check('ndata').exists(),
  check('ndata.method').exists().not().isEmpty().withMessage("alanigerekli")
],async function(req, res, next){
  var l=res.locals.l;
  var data=req.body.kdata;
  var text="", status=0 ;
  var session=req.session.user; 
  customValidation.removeNotAllowedProperties([
    "id","firmaId","kullaniciAdi","kullaniciFoto","kullaniciKayitTar",
  "kullaniciOlusturanId","kullaniciDuzenlemeTar","kullaniciDilTercihi","kullaniciDilTercihi","silindiMi"
  ],data);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.array();
    }
    switch (req.body.ndata.method) {
      case "update":
        if(!req.body.ndata.id){
          throw "idbulunamadi";
        }
        if(data.kullaniciParola && data.kullaniciParola!="" && data.kullaniciParola.length>=4){
          data.kullaniciParola=md5(data.kullaniciParola);         
        }else{
          delete data.kullaniciParola;
        }
        data.firmaId=session.firmaId;
        await new db().update(data,{id:req.body.ndata.id,firmaId:session.firmaId},"kullanicilar");
        text=l.getLanguage("guncellemebasarili");
        status = 1;
        break;
      case "delete":
        if(!req.body.ndata.id){
          throw "idbulunamadi";
        }
        var tmpData={id:req.body.ndata.id,firmaId:session.firmaId}
        await new db().setSilindi(tmpData,"kullanicilar");
        text=l.getLanguage("silmeislemibasarili");
        status = 1;
        break;
      case "create":
        if(!data.kullaniciParola || data.kullaniciParola=="" || data.kullaniciParola.length<4 ){
          throw "parolabulunamadi";
        }
        data.kullaniciParola=md5(data.kullaniciParola);         
        if(data.kullaniciParola){
          data.kullaniciParola=md5(data.kullaniciParola);         
        }
        data.firmaId=session.firmaId;
        data.kullaniciDilTercihi=session.kullaniciDilTercihi;
        data.kullaniciOlusturanId=session.id;
        data.kullaniciAdi=data.kullaniciEPosta;
        await new db().insert(data,"kullanicilar");
        text=l.getLanguage("eklemeislemibasarili");
        status = 1;
        break;
      default:
        text = "Eksik bilgi!";
        status = 0;
    }
  } catch (error) {
    status = 0;
    if (error.message != undefined)
      text = l.getLanguage(error.message);
    else if(Array.isArray(error)){
      text=error.map(x=> l.getLanguage(x.param.split(".")[1])+" "+l.getLanguage(x.msg)+"<br>")
    }  
    else
      text = (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
  }
  
  res.send({
    message: text,
    status: status,
  });

});
/* #endregion */
/* #region  cariler */
router.post('/cariler',
[
  /*check('kdata').exists(),
  check('kdata.cariAdi').exists().not().isEmpty().withMessage("cariAdialanigerekli").isLength({max: 100}).withMessage("cariAdialanimax100"),
  check('kdata.cariYetkiliKisiAdi').exists().isLength({max: 100}).withMessage("cariYetkiliKisiAdialanimax100"),
  check('kdata.cariYetkiliKisiSoyadi').exists().isLength({max: 100}).withMessage("cariYetkiliKisiSoyadialanimax100"),
  check('kdata.cariTel').exists().not().isEmpty().withMessage("cariTelgerekli").isLength({max: 45}).withMessage("cariTelmax45"),
  check('kdata.cariYetkiliKisiTel').exists().not().isEmpty().withMessage("cariYetkiliKisiTelgerekli").isLength({max: 45}).withMessage("cariYetkiliKisiTelmax45"),
  check('kdata.cariEPosta').exists().isEmail().withMessage("gecersizeposta").isLength({max: 100}).withMessage("epostamax100"),
  check('kdata.cariFaks').exists().isLength({max: 45}).withMessage("cariFaks"),
  check('kdata.cariYetkiliKisiSoyadi').exists().not().isEmpty().withMessage("telalanigerekli").isLength({max: 45}).withMessage("kullanicitelmax45"),
  check('ndata').exists(),
  check('ndata.method').exists().not().isEmpty().withMessage("methodgerekli")*/
],async function(req, res, next){
  var l=res.locals.l;
  var data=req.body.kdata;
  var text="", status=0 ;
  var dbName=(await new db().selectQuery({firmaId:req.session.user.firmaId},"dbler"))[0].dbAdi;
  customValidation.removeNotAllowedProperties([
    "id","silindiMi"
  ],data); 
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.array();
    }
    switch (req.body.ndata.method) {
      case "update":
        if(!req.body.ndata.id){
          throw "idbulunamadi";
        }
        await new db().update(data,{id:req.body.ndata.id},"cariler",null,dbName);
        text=l.getLanguage("guncellemebasarili");
        status = 1;
        break;
      case "delete":
        if(!req.body.ndata.id){
          throw "idbulunamadi";
        }
        var tmpData={id:req.body.ndata.id}
        await new db().setSilindi(tmpData,"cariler",null,dbName);
        text=l.getLanguage("silmeislemibasarili");
        status = 1;
        break;
      case "create":
        await new db().insert(data,"cariler",dbName);
        text=l.getLanguage("eklemeislemibasarili");
        status = 1;
        break;
      default:
        text = "Eksik bilgi!";
        status = 0;
    }
  } catch (error) {
    status = 0;
    if (error.message != undefined)
      text = l.getLanguage(error.message);
    else if(Array.isArray(error)){
      text=error.map(x=> l.getLanguage(x.param.split(".")[1])+" "+l.getLanguage(x.msg)+"<br>")
    }  
    else
      text = (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
  }
  
  res.send({
    message: text,
    status: status,
  });

});
/* #endregion */
/* #region  profile */
router.post('/profile',
[
  check('kdata').exists(),
  check('kdata.kullaniciIsim').exists().not().isEmpty().withMessage("isimalanigerekli").isLength({max: 100}).withMessage("isimalanimax100"),
  check('kdata.kullaniciSoyisim').exists().not().isEmpty().withMessage("soyisimalanigerekli").isLength({max: 100}).withMessage("soyisimalanimax100"),
  check('kdata.kullaniciTel').exists().not().isEmpty().withMessage("telalanigerekli").isLength({max: 45}).withMessage("kullanicitelmax45"),
  check('kdata.kullaniciEPosta').exists().not().isEmpty().withMessage("epostaalanigerekli").isEmail().withMessage("gecersizeposta").isLength({max: 100}).withMessage("epostamax100"),
  check('ndata').exists(),
  check('ndata.method').exists().not().isEmpty().withMessage("methodgerekli")
],async function(req, res, next){
  var l=res.locals.l;
  var data=req.body.kdata;
  var text="", status=0 ;
  var session=req.session.user; 
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors.array();
    }
    switch (req.body.ndata.method) {
      case "update":
        if(!req.body.ndata.id || req.body.ndata.id!=session.id){
          throw "idbulunamadi";
        }
        data.firmaId=session.firmaId;
        if(data.kullaniciParola && data.kullaniciParola!="" && data.kullaniciParola.length>=4){
          data.kullaniciParola=md5(data.kullaniciParola);         
        }else{
          delete data.kullaniciParola;
        }
        await new db().update(data,{id:req.body.ndata.id},"kullanicilar");
        text=l.getLanguage("guncellemebasarili");
        status = 1;
        break;
      default:
        text = "Eksik bilgi!";
        status = 0;
    }
  } catch (error) {
    status = 0;
    if (error.message != undefined)
      text = l.getLanguage(error.message);
    else if(Array.isArray(error)){
      text=error.map(x=> l.getLanguage(x.msg)+"<br>")
    }  
    else
      text = (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
  }
  
  res.send({
    message: text,
    status: status,
   
  });

});

/* #endregion */
/* #region  exit */
router.get('/exit', async function (req, res, next) {
  var l=res.locals.l;
  var text;
  if (req.session.user == undefined || req.session.user.id == undefined) {
    text = l.getLanguage("girisbilgilerinizbulunamadi");
    res.send({
      message: text,
      status: 0,
      color: "danger"
    });
  } else {
    req.session.destroy();
    text = l.getLanguage("cikisyapiliyor");
    res.send({
      message: text,
      status: 1,
      color: "success"
    });
  }
});
/* #endregion */
/* #region  dynajax */
router.post('/dyndata', async function (req, res, next) {
  var l=res.locals.l;
  var data=req.body.kdata;
  var text="", status=0;
  var session=req.session.user; 
  var result;
  try {
    if( !data.hash){
      throw "eksikbilgi";
    }
    var sorguBilgileri=selfScript.getValuesFromHash(session,data.hash);
    if(!sorguBilgileri){
      throw "eksikbilgi";
    }
    result=await new db().selectWithColumn(sorguBilgileri.colName,sorguBilgileri.tableName,data.where,null,sorguBilgileri.dbName);
    status=1;
  } catch (error) {
    status = 0;
    if (error.message != undefined)
      text = l.getLanguage(error.message);
    else if(Array.isArray(error)){
      text=error.map(x=> l.getLanguage(x.param.split(".")[1])+" "+l.getLanguage(x.msg)+"<br>")
    }  
    else
      text = (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
  }
  res.send({
    message: text,
    status: status,
    data:result,
    colName:sorguBilgileri.colName[1]
  });
});
/* #endregion */


module.exports = router;
