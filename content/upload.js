AlexPic.mod.upload = {};
AlexPic.mod.upload.paste = function(){
  
}
AlexPic.mod.upload.node = null;

AlexPic.mod.upload.submit = function(find){  
  this.node = find.getInputFile();

  if(find.findFlag == 1){    
    this.node.value = AlexPic.gPasteFilePath; 	
    this.simulateChange(this.node);
  }
}

AlexPic.mod.upload.simulateClick = function(node){
  var event = node.ownerDocument.createEvent("MouseEvents");  
              event.initMouseEvent("click",
                                 true, // can bubble
                                 true, // cancellable
                                 node.ownerDocument.defaultView, // contentWindow
                                 1, // clicks
                                 0, 0, // screen coordinates
                                 0, 0, // client coordinates
                                 false, false, false, false, // control/alt/shift/meta
                                 0, // button,
                                 node);  
             node.dispatchEvent(event);
}
AlexPic.mod.upload.simulateChange = function(node){
   var event = node.ownerDocument.createEvent("HTMLEvents");  
       event.initEvent("change",true,true);
       node.dispatchEvent(event);
}
