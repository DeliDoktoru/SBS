const md5 = require('md5');
function selfScript(){
    this.generateHash=function(session,tableName,dbName,colNames){
        var foundIndex =session.tableNames.findIndex(x=>x.tableName==tableName && x.dbName==dbName);
        var hash=md5(Math.random());
        foundIndex==-1?session.tableNames.push(
        {
            hash:hash,
            tableName:tableName,
            dbName:dbName,
            colName:["id"].concat(colNames)
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
    this.catchConverterError=function(error,l){
        var text="",extra="";
        if(error.colName || error.colData ){
            extra=`<br> ${error.colName?l.getLanguage(error.colName)+" : ":""} ${error.colData}`; 
        }
        if (error.message != undefined)
            text = l.getLanguage(error.message);
        else if(Array.isArray(error)){
            text = error.map(x=> l.getLanguage(x.param.split(".")[1])+" "+l.getLanguage(x.msg)+"<br>")
        }  
        else{
            text = (error && typeof(error))=="string"?l.getLanguage(error):l.getLanguage("bilinmeyenhata");
        }
        return text + extra;

    }
    this.removeNotAllowedProperties=function(notAllowedArr,obj){
        for(item of notAllowedArr){
           delete  obj[item];
        }
        return obj;
    }
  }
  module.exports = new selfScript();