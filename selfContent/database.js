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
                if ( err )  {
                    global.errorLoger(err);
                    return reject( "veritabanihatasi" );
                }
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
        var query=`SELECT * FROM ${databaseName}.${tableName} WHERE silindiMi="0";`;
        return this.query(query);
    }
    selectQuery(where={},tableName,mode="AND",databaseName="sbs"){
        if(!tableName || tableName==""){
            throw "tabloismibulunamadi";
        }
        if(Object.keys(where).length==0){
            throw "sorgualanieksik";
        }
        var query="";
        query=selectQueryConverter(tableName,databaseName,where,mode);
        if(query==""){
            throw "sorgubulunamadi";
        }
        return this.query(query,Object.keys(where).map(y=> where[y]));
    }
    insert(data={},tableName,databaseName="sbs"){
        if(!tableName || tableName==""){
            throw "tabloismibulunamadi";
        }
        if(Object.keys(data).length==0){
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
    remove(where={},tableName,mode="AND",databaseName="sbs"){
        if(!tableName || tableName==""){
            throw "tabloismibulunamadi";
        }
        if( Object.keys(where).length==0){
            throw "sorgualanieksik";
        }
        var query="";
        query=removeConverter(tableName,databaseName,where,mode);
        if(query==""){
            throw "sorgubulunamadi";
        }
        return this.query(query,Object.keys(where).map(y=> where[y]));
    }
    update(data={},where={},tableName,mode="AND",databaseName="sbs"){
        if(!tableName || tableName==""){
            throw "tabloismibulunamadi";
        }
        if(Object.keys(where).length==0){
            throw "sorgualanieksik";
        }
        if(Object.keys(data).length==0){
            throw "veribulunamadi";
        }
        var query="";
        query=updateConverter(tableName,databaseName,data,where,mode);
        if(query==""){
            throw "sorgubulunamadi";
        }
        var arr1=Object.keys(data).map(y=> data[y])
        var arr2=Object.keys(where).map(y=> where[y])
        var concat= arr1.concat(arr2);
        return this.query(query,Object.keys(concat).map(y=> concat[y]));
    }
    selectIn(colName,data={},tableName,databaseName="sbs"){
        //data [1,2,3,4] şeklinde olmalı
        if(!tableName || tableName==""){
            throw "tabloismibulunamadi";
        }
        if(Object.keys(data).length==0){
            throw "veribulunamadi";
        }
        if(!colName){
            throw "kolonadibulanamadi";
        }
        var query="";
        query=selectInConverter(tableName,databaseName,colName);
        if(query==""){
            throw "sorgubulunamadi";
        }
        return this.query(query,[data]);
    
    }
    setSilindi(where={},tableName,mode="AND",databaseName="sbs"){
        if(!tableName || tableName==""){
            throw "tabloismibulunamadi";
        }
        if( Object.keys(where).length==0){
            throw "sorgualanieksik";
        }
        var query="";
        query=setSilindiConverter(tableName,databaseName,where,mode);
        if(query==""){
            throw "sorgubulunamadi";
        }
        return this.query(query,Object.keys(where).map(y=> where[y]));
    }
}
function insertConverter(_tableName,_databaseName,_object){
    return `INSERT INTO ${_databaseName}.${_tableName} (${Object.keys(_object).toString()}) VALUES  ?`; 
}
function removeConverter(_tableName,_databaseName,_where,_mode){
    return `DELETE FROM ${_databaseName}.${_tableName} WHERE ${Object.keys(_where).map(x=> x+"= ? ").join(_mode+" ")}`; 
}
function selectQueryConverter(_tableName,_databaseName,_where,_mode){
    return `SELECT * FROM ${_databaseName}.${_tableName} WHERE ( ${Object.keys(_where).map(x=> x+"= ? ").join(_mode+" ")} ) AND silindiMi="0"`;
}
function updateConverter(_tableName,_databaseName,_object,_where,_mode){
    return `UPDATE ${_databaseName}.${_tableName} SET ${Object.keys(_object).map(x=> x+"= ? ").toString()} WHERE ${Object.keys(_where).map(x=> x+"= ? ").join(_mode+" ")}`;
}
function selectInConverter(_tableName,_databaseName,colName){
    return `SELECT * FROM ${_databaseName}.${_tableName} WHERE ${colName} IN (?) AND silindiMi="0"`;
}
function setSilindiConverter(_tableName,_databaseName,_where,_mode){
    return `UPDATE ${_databaseName}.${_tableName} SET silindiMi="1" WHERE ${Object.keys(_where).map(x=> x+"= ? ").join(_mode+" ")}`;
}
function sqlLog(sql,args){
    fs.appendFile(path.join(__dirname, '../sql.log'),"'"+ sql  + "'\n->" + (args!=null?JSON.stringify(args):"")  + "\n", function (error) {
        if(error) console.log(error);
      });
}
module.exports = Database;