var Pref = {
  getPrefs:function(){
            
     var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.alexpic.");
     return prefs;    
  }        
}

AlexPic.pref = Object.create(Pref);


AlexPic.pref.getFpPath = function(){
  var prefs = this.getPrefs();
  var file =  prefs.getComplexValue("filepickfile", Components.interfaces.nsILocalFile);
  return file.path;
}
AlexPic.pref.getFpFile = function(){
  var prefs = this.getPrefs();
  var file =  prefs.getComplexValue("filepickfile", Components.interfaces.nsILocalFile);
  return file;
}
AlexPic.pref.setFpFile = function(iFile){
  var prefs = this.getPrefs();
  prefs.setComplexValue("filepickfile", Components.interfaces.nsILocalFile, iFile);
}
AlexPic.pref.hasPref = function(prefName){
  var prefs = this.getPrefs();
  if(prefs.prefHasUserValue(prefName)){
    return true;
  }else{
    return false;
  }
}
AlexPic.pref.isTrue = function(prefName){
  var prefs = this.getPrefs();
  if(prefs.prefHasUserValue(prefName)){
    var flag = prefs.getBoolPref(prefName);
    if(flag == true){
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
}
AlexPic.pref.setBool = function(prefName,flag){
  var prefs = this.getPrefs();
  prefs.setBoolPref(prefName, flag); 
}
