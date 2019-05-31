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
  
  }
  module.exports = new selfScript();