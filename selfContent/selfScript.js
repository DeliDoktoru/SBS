const md5 = require('md5');
function selfScript(){
    this.generateHash=function(session,tableName,dbName,colName){
        var foundIndex =session.tableNames.findIndex(x=>x.tableName==tableName && x.dbName==dbName);
        var hash=md5(Math.random());
        foundIndex==-1?session.tableNames.push(
        {
            hash:hash,
            tableName:tableName,
            dbName:dbName,
            colName:["id",colName]
        }):session.tableNames[foundIndex].hash=hash;
        return hash;
    },
    this.getValuesFromHash=function(session,hash){
        var foundIndex =session.tableNames.findIndex(x=>x.hash==hash);
        if(foundIndex==-1){
            throw "hashbulunamadi";
        }
        else{
            return session.tableNames[foundIndex];
        }
    }
    this.catchConverterError=function(error){
    if (error.message != undefined)
        return l.getLanguage(error.message);
    else if(Array.isArray(error)){
        return error.map(x=> l.getLanguage(x.param.split(".")[1])+" "+l.getLanguage(x.msg)+"<br>")
    }  
    else
        return (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
    }
    return "";
  }
  module.exports = new selfScript();