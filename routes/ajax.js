var express = require('express');
var router = express.Router();
const { check , validationResult } = require('express-validator/check');
const db= require('../selfContent/database');
const md5 = require('md5');
router.post('/changeLanguage', async function(req, res, next) {
  req.session.language = req.body.language;
  res.send({});
});
router.post('/login',
[
check('kdata').exists(),
check('kdata.kullaniciEPosta').exists().not().isEmpty().withMessage("epostaalanigerekli").isEmail().withMessage("gecersizeposta").isLength({max: 100}).withMessage("epostamax100"),
check('kdata.kullaniciParola').exists().not().isEmpty().withMessage("paraloalanigerekli").isLength({min:4,max: 45}).withMessage("paralomin4max45")
]
,async function(req, res, next) {
  var l=res.locals.l;
  var data=req.body.kdata;
  var text,  status=0 ;
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
        stack:"kullaniciEPosta:"+kullaniciEPosta+" kullaniciParola:"+md5(data.kullaniciParola)
      });
      throw "beklenmedikbirhataolustu";
    }
    else if (user && user.length==1 ) {
      req.session.user = user[0];
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
  if (status == undefined || status != 1) {
    renk = "danger"
  } else {
    renk = "success"
  }
  res.send({
    message: text,
    status: status,
    color: renk
  });

});
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
  var text, renk, status=0 ;
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
        stack:"kullaniciEPosta:"+kullaniciEPosta
      });
      throw "beklenmedikbirhataolustu";
    }
    else if (  !isEmailUniqe ||  ( isEmailUniqe  && isEmailUniqe.length==0) ) {
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
  if (status == undefined || status != 1) {
    renk = "danger"
  } else {
    renk = "success"
  }
  res.send({
    message: text,
    status: status,
    color: renk
  });
});
router.post('/kullanicilar',
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
  var text="", renk, status=0 ;
  var session=req.session.user; 
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
        data.firmaId=session.firmaId;
        await new db().update(data,{id:req.body.ndata.id},"kullanicilar");
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
        if(!data.kullaniciParola || data.kullaniciParola==""){
          throw "parolabulunamadi";
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
      text=error.map(x=> l.getLanguage(x.msg)+"<br>")
    }  
    else
      text = (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
  }
  if (status == undefined || status != 1) {
    renk = "danger";
  } else {
    renk = "success";
  }
  res.send({
    message: text,
    status: status,
    color: renk
  });

})



router.get('/exit', async function (req, res, next) {
  var l=res.locals.l;
  var text, renk;
  if (req.session.user == undefined || req.session.user.id == undefined) {
    text = l.getLanguage("girisbilgilerinizbulunamadi");
    renk = "danger"
    res.send({
      message: text,
      status: 0,
      color: renk
    });
  } else {
    req.session.destroy();
    text = l.getLanguage("cikisyapiliyor");
    renk = "success"
    res.send({
      message: text,
      status: 1,
      color: renk
    });
  }
});
module.exports = router;
