AlexPic.init= {
  loadInit:function(){
    var menu = document.getElementById("contentAreaContextMenu");    
    menu.addEventListener("popupshowing",AlexPic.init.showImageContext,false);
    AlexPic.locale.init();
  },
  showImageContext:function(){    
    AlexPic.$("#ooi_pic").hidden = true;
    AlexPic.$("#o_pics_paste").hidden = true;
    if(gContextMenu.onImage){
      AlexPic.$("#ooi_pic").hidden = false;
    }
    if(AlexPic.gPasteFilePathFlag == 1){
      AlexPic.$("#o_pics_paste").hidden = false;
    }
    
  },
  closeWindow:function(){
    if(AlexPic.gPasteFilePath.length > 3){
      AlexPic.file.remove(AlexPic.gPasteFilePath);      
      AlexPic.gPasteFilePathFlag = 0;
    }
  }                   
};
AlexPic.upload = AlexPic.mod.upload;
window.addEventListener("load",AlexPic.init.loadInit,false);
window.addEventListener("unload",AlexPic.init.closeWindow,false);
