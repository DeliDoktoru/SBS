module.exports = function(request){
  const {buildSchema } = require('graphql');
  const db= require('../selfContent/database');
  const md5 = require('md5');
  var schema = buildSchema(`
      type Query {
          test: String 
          login(kullaniciEPosta: String,kullaniciParola: String): String 
      },
  `);
  var obj={
     test : async function(args,session) {
      return "gral";
    }
  }
  
  async function checkSession(args){
    var functionName=arguments[2].fieldName;
    const answer =await new Promise(function(resolve, reject){
      request.sessionStore.get(args.sessionID,function(err,result){
        if(result.user){
          resolve( obj[functionName](args,result));
        }
        else{
          resolve("");
        }
      });
    })
    return answer;
  }

  var login = async function({ kullaniciEPosta,kullaniciParola }) {
    var user=(await new db().selectQuery({
      kullaniciEPosta:kullaniciEPosta,
      kullaniciParola:md5(kullaniciParola)
    },"kullanicilar"));
    if (user && user.length==1 ) {
      //request.sessionStore.all(function(err,result){ console.log(result)})
      request.sessionStore.destroy(request.sessionID);
      request.sessionStore.set(request.sessionID,{user:user[0]});
      return request.sessionID;
    }
    return  "";
  }

  var root = {
    test: checkSession,
    login: login,
  };

  return {schema:schema, rootValue:root };

}