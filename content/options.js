AlexPic.opt = {}
AlexPic.opt.onDialogCancel = function()
{
  
}
AlexPic.opt.onDialogAccept = function()
{ 
  if(document.getElementById("isOrderFileName").checked == true){
     AlexPic.pref.setBool("isOrderFileName",true);
  }else{
     AlexPic.pref.setBool("isOrderFileName",false);
  }
}

AlexPic.opt.onLoad = function(){
  document.getElementById('path').value =  AlexPic.pref.getFpPath();
  document.getElementById("isOrderFileName").checked = AlexPic.pref.isTrue("isOrderFileName");
}

AlexPic.opt.onPickFolder = function(){
    var fp = AlexPic.file.getFp();
    var fpreturn = fp.show();
    if(fpreturn == 0){
      document.getElementById('path').value = fp.file.path;
      AlexPic.pref.setFpFile(fp.file);// setFpPath(iFile)
      
    }
}
     

