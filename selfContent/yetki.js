function yetki(){
    this.unvans={};
    var _this=this;
    const db= require('../selfContent/database');
    new db().selectAll( 'kullanici_unvanlar' ).then(result=> {
        new db().selectAll("sayfalar").then(x=>{
            for(item of result){
                if(item.sayfalar && item.sayfalar!=""){
                    var tmp=JSON.parse(item.sayfalar);
                    _this.unvans[item.id]=x.filter(y=> tmp.find(z=>y.id==z))
                } 
            }
        })
    });  
  } 
module.exports = new yetki();
