module.exports = function(language){
  this.language=language;
  this.getLanguage=function(languageParam){
    var language = require(`../languages/${this.language}.js`);
    return language[languageParam]||languageParam;
  }

}