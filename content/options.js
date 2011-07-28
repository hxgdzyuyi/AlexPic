function onDialogCancel()
{
  
}
function onDialogAccept()
{ 
  if(document.getElementById("isOrderFileName").checked == true){
     AlexPic.pref.setBool("isOrderFileName",true);
  }else{
     AlexPic.pref.setBool("isOrderFileName",false);
  }
}

function onLoad(){
  document.getElementById('path').value =  AlexPic.pref.getFpPath();
  document.getElementById("isOrderFileName").checked = AlexPic.pref.isTrue("isOrderFileName");
}

function onPickFolder(){
    
    var fp = AlexPic.file.getFp();
    var fpreturn = fp.show();
    if(fpreturn == 0){
      document.getElementById('path').value= fp.file.path;
      AlexPic.pref.setFpFile(fp.file);// setFpPath(iFile)
      
    }
}
     

