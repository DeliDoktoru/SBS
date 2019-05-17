const mysql = require( 'mysql' );
var config=require('../config');
var fs = require("fs");
var path = require('path');
class Database {
    constructor() {
        this.connection = mysql.createConnection( config.databaseServer );
    }
    query( sql, args, close=true ) {
        sqlLog(sql,args);
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )  return reject( err );//"veritabanihatasi"
                if ( close ) this.close();
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
    selectAll(tableName,databaseName="sbs"){
        var query=`SELECT * FROM ${databaseName}.${tableName};`;
        return this.query(query);
    }
    insert(data,tableName,databaseName="sbs"){
        if(!tableName || tableName==""){
            throw "tabloismibulunamadi";
        }
        if(!data){
            throw "veribulunamadi";
        }
        if(Array.isArray(data)){
            data.map(x=> {
                if(typeof(x)!="object"){
                    throw "veritipihatali";
                }
                var query="";
                query=insertConverter(tableName,databaseName,x);
                if(query==""){
                    throw "sorgubulunamadi";
                }
                return this.query(query,[ [ Object.keys(x).map(y=> x[y]) ] ],false);
            })
            this.close;
        }
        else if(typeof(data)=="object"){
            var query="";
            query=insertConverter(tableName,databaseName,data);
            if(query==""){
                throw "sorgubulunamadi";
            }
            return this.query(query,[ [ Object.keys(data).map(y=> data[y]) ] ]);
        }
        else{
            throw "veritipihatali";
        }
       
        return false;
    }
    remove(data,tableName,mode="AND",databaseName="sbs"){
        if(!tableName || tableName==""){
            throw "tabloismibulunamadi";
        }
        if(!data){
            throw "veribulunamadi";
        }
        var query="";
        query=removeConverter(tableName,databaseName,data,mode);
        if(query==""){
            throw "sorgubulunamadi";
        }
        return this.query(query,Object.keys(data).map(y=> data[y]));
    }
}
function insertConverter(_tableName,_databaseName,_object){
    return `INSERT INTO ${_databaseName}.${_tableName} (${Object.keys(_object).toString()}) VALUES  ?`; 
}
function removeConverter(_tableName,_databaseName,_object,_mode){
    return `DELETE FROM ${_databaseName}.${_tableName} WHERE ${Object.keys(_object).map(x=> x+"= ? ").join(_mode+" ")}`; 
}
function sqlLog(sql,args){
    fs.appendFile(path.join(__dirname, '../sql.log'),"'"+ sql  + "'\n->" + JSON.stringify(args[0]) + "\n", function (error) {
        if(error) console.log(error);
      });
}
module.exports = Database;