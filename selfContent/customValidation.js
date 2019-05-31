function validator(){
    this.removeNotAllowedProperties=function(notAllowedArr,obj){
        for(item of notAllowedArr){
           delete  obj[item];
        }
        return obj;
    }
  
  }
  module.exports = new validator();