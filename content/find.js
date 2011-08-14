AlexPic.find = function(node){
  this.win = window.getBrowser().selectedBrowser.contentWindow;
  this.doc = window.getBrowser().selectedBrowser.contentDocument;
  this.findFlag = 0;
  this.node = XPCNativeWrapper.unwrap(node);
}
AlexPic.find.prototype.getImgSrc = function(){
  this.findFlag = 1;  
  return this.node.src;
}
AlexPic.find.prototype.getInputFile = function(){
  var r = null;
  r = this.getForm();
  return r;
};

AlexPic.find.prototype.getForm = function(){ 
 var r =  this._getForm(this.node);
 return r;
}
AlexPic.find.prototype._getForm = function(node){  
  var tNodes = node.getElementsByTagName("input");
  if(tNodes.length > 0){
    for(var i = 0; i < tNodes.length ; i++ ){
      if(tNodes[i].type == "file"){
        this.findFlag = 1;
        var r = tNodes[i];
        return r;
      }
    }

    if(node.nodeName == "BODY"){
      AlexPic.noti.showToast("can't find input");
    }else{
      node = node.parentNode;
      return this._getForm(node);
    }

  }else{
    if(node.nodeName == "BODY"){
      AlexPic.noti.showToast("can't find input");
    }else{
      node = node.parentNode;
      return this._getForm(node);
    }
  }
}

