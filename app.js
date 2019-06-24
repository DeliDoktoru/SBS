var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fs = require("fs");
var indexRouter = require('./routes/index');
var ajaxRouter = require('./routes/ajax');
var usersRouter = require('./routes/users');
var app = express();
const graphqlHTTP = require('express-graphql');
var MySQLStore = require('express-mysql-session')(session);
const db = require('./selfContent/database');
const selfScript = require('./selfContent/selfScript');
selfScript.initDatas(db);
/* #region  session */

var sessionStore = new MySQLStore({}, new db().createConnection("sbs") );
app.use(session({
  secret: '3D75D274B997B53CFD2892F69F54BC28',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  //cookie: { secure: true }
}));


/* #endregion */

/* #region  permission control */
function checkAllowed(txt) {
  var arr = ["/GraphQl","/test1","/test","/ajax/dyndata","/ajax/uploadImage","/ajax/changeLanguage","/ajax/login","/ajax/exit","/public/fonts","/public/images","/public/javascripts","/public/stylesheets", "/favicon.ico","/register"];
  for (val of arr) {
    if (txt.indexOf(val)==0)
      return true;
  }
  return false;
}
app.use(async function (req, res, next) {
  if (checkAllowed(req.url)) {
    next(); 
    return;
  }
  if (req.url == "/" || req.url == "/login" ) {
    if (req.session.user == undefined || req.session.user.id == undefined) {
      if(req.url == "/"){
        res.redirect('/login');
        next();
        return;
      }
      else{
        next();
        return;
      }
    } 
    else{
      res.redirect('/dashboard');
    }
  } else {
    if (req.session.user == undefined || req.session.user.id == undefined || req.session.user.firmaId==undefined)
      res.redirect('/login');
    else {
      var unvanId = req.session.user.kullaniciUnvan;
      if (unvanId == undefined) {
        res.redirect('/login');
        return;
      }
      //var unvanPages=yetki.unvans[unvanId];
      if (selfScript.yetkiler[unvanId]  == null || selfScript.sayfalar[unvanId] == null) {
        res.redirect('/login');
        return;
      }
      var url= decodeURIComponent(req.url);
      var str = url ;
      var skipMenu=false;
      if(str.indexOf("/ajax")==0){
        str=str.substring(5,str.length);
        skipMenu=true;
      }
      if(str.indexOf("/public/firmaImages")==0){
        str=str.substring(20,str.length);
        if(str=="image_placeholder.jpg"){
          next();
          return;  
        }
        var tmpFirmaId=str.substring(0,str.indexOf("-"))
        if(req.session.user.firmaId && tmpFirmaId && tmpFirmaId!="" && tmpFirmaId==req.session.user.firmaId){
          next();
          return;
        }else{
          res.redirect('/login');
          return;
        }
        
      }
      slashIndex=str.substr(1).indexOf("/");
      slashIndex!=-1?str=str.substring(0,slashIndex+1):null;
      //var result=unvanPages.find(x=>x.yetkiAdi && x.yetkiAdi!="" && str.indexOf(x.yetkiAdi)==0 );
      if (selfScript.yetkiler[unvanId][str] == null) {
        res.redirect('/');
        return;
      }  
      if(!skipMenu){ 
        res.locals.menu = selfScript.sayfalar[unvanId];
        var tmpActive=selfScript.sayfalar[unvanId].find(x=> x.url==url)
        res.locals.active = tmpActive && tmpActive!=-1 ? tmpActive.id : -1;
        res.locals.name = req.session.user.kullaniciIsim + " " +req.session.user.kullaniciSoyisim;
        res.locals.foto = req.session.user.kullaniciFoto;
        res.locals.kullaniciUnvan=req.session.user.kullaniciUnvan;
        res.locals.id=req.session.user.id;
      }
      next();  
    }
  }
}); 
/* #endregion */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* #region  error catchers */
process.on('uncaughtException', function (err) {
  global.errorLoger(err);

});
process.on('unhandledRejection', function (err) {
  global.errorLoger(err);

});
/* #endregion */
/* #region   morgan loger customize*/
//file
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})
app.use(logger(function (tokens, req, res) {
  return [
    (req.session && req.session.user && req.session.user.kullaniciIsim + " " +req.session.user.kullaniciSoyisim) || "anonymus",
    tokens.method(req, res),
    decodeURIComponent(tokens.url(req, res)),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
    req.connection.remoteAddress
  ].join(' ')
}, {
  skip: function (req, res) {
    return req.url.search("public") != -1
  },
  stream: accessLogStream
}));
//console
app.use(logger(function (tokens, req, res) {
  return [
    (req.session && req.session.user && req.session.user.kullaniciIsim + " " +req.session.user.kullaniciSoyisim) || "anonymus",
    tokens.method(req, res),
    decodeURIComponent(tokens.url(req, res)),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body),
    req.connection.remoteAddress
  ].join(' ')
}, {
  skip: function (req, res) {
    return req.url.search("public") != -1
  },
}));

/* #endregion */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

/* #region  dil arakatmanı */
app.use(function (req, res, next) {
  if(req.url.search("public") != -1){
    next();
    return;
  }
  res.locals.languages=selfScript.diller;
  res.locals.l= new selfScript.language(req.session.language||(req.session.user&&req.session.user.kullaniciDilTercihi)||1);
  next();
});
app.use(function (req, res, next){
  if(req.body.kdata){
    req.body.kdata=JSON.parse(req.body.kdata);
  }
  if(req.body.ndata){
    req.body.ndata=JSON.parse(req.body.ndata);
  }
  next();
})

/* #endregion */

app.use('/', indexRouter);
app.use('/ajax', ajaxRouter);
app.use('/users', usersRouter);

/* #region  GraphQl */
app.use('/GraphQl', graphqlHTTP((req,res)=>{
  let graphqlInitData = require('./selfContent/graphql.js')(req);
  var l=res.locals.l;
  return{
    schema: graphqlInitData.schema,
    rootValue: graphqlInitData.rootValue,
    graphiql: true,
    customFormatErrorFn:(err)=>{
      return l.getLanguage(err.message);
    }
  }
}));
/* #endregion */



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
