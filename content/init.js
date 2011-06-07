AlexPic.init= {
  showItem:function(){
    var menu = document.getElementById("contentAreaContextMenu");
    menu.addEventListener("popupshowing",AlexPic.init.showImageContext,false);
  },
  showImageContext:function(){    
    $("#ooi_pic").hidden = true;
    $("#o_pics_paste").hidden = false;
    if(gContextMenu.onImage){
      $("#ooi_pic").hidden = false;
    }

    if(gPasteFilePathFlag == 1){
      $("#o_pics_paste").hidden = false;
    }
    
  }                  
                   
};
window.addEventListener("load",AlexPic.init.showItem,false);
