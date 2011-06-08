var Upload = {};
Upload.paste = function(){
  
}
Upload.node = null;

Upload.submit = function(find){  
  this.node = find.getInputFile();

  if(find.findFlag == 1){    
    this.node.value = gPasteFilePath; 	
    this.simulateChange(this.node);
  }
}

Upload.simulateClick = function(node){
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
Upload.simulateChange = function(node){
   var event = node.ownerDocument.createEvent("HTMLEvents");  
       event.initEvent("change",true,true);
       node.dispatchEvent(event);
}
