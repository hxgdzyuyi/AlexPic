AlexPic.init= {
  showItem:function(){
    var menu = document.getElementById("contentAreaContextMenu");    
    menu.addEventListener("popupshowing",AlexPic.init.showImageContext,false);
  },
  showImageContext:function(){    
    $("#ooi_pic").hidden = true;
    $("#o_pics_paste").hidden = true;
    if(gContextMenu.onImage){
      $("#ooi_pic").hidden = false;
    }
    if(gPasteFilePathFlag == 1){
      $("#o_pics_paste").hidden = false;
    }
    
  },
  closeWindow:function(){
    if(gPasteFilePath.length > 3){
      AlexPic.file.remove(gPasteFilePath);      
      gPasteFilePathFlag = 0;
    }
  }                   
};
AlexPic.upload = Upload;
window.addEventListener("load",AlexPic.init.showItem,false);
window.addEventListener("unload",AlexPic.init.closeWindow,false);
