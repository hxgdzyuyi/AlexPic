var File = {
};

File.getTempDir = function(){
  var file = Components.classes["@mozilla.org/file/directory_service;1"].
           getService(Components.interfaces.nsIProperties).
           get("ProfD", Components.interfaces.nsIFile);
  //DefRt https://developer.mozilla.org/en/Code_snippets/File_I%2f%2fO           
  var r = file.path;
  return r;  
}
File.save = function(iUrl,oFileName,oDir,progressListener){
  var persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
              .createInstance(Components.interfaces.nsIWebBrowserPersist);
  var file = Components.classes["@mozilla.org/file/local;1"]
              .createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath(oDir);
  file.appendRelativePath(oFileName);
  var obj_URI = Components.classes["@mozilla.org/network/io-service;1"]
	              .getService(Components.interfaces.nsIIOService)
	              .newURI(iUrl, "UTF8", null);
  persist.persistFlags = Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
  persist.persistFlags = Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;
 
  persist.progressListener = progressListener;
  persist.saveURI(obj_URI, null, null, null, null, file);
  
  
}
File.save2 = function(iUrl,oFileName,oDir,cbComplete){
  var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
  var iUri = ios.newURI(iUrl , null , null);
  var channel = ios.newChannelFromURI(iUri);
  var observer = {
    onStreamComplete: function (aLoader, aContext, aStatus, aLength, aResult) {      
      var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
      file.initWithPath(oDir);
      file.appendRelativePath(oFileName);
                
      var stream = Components.classes["@mozilla.org/network/safe-file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
      stream.init(file, -1, -1, 0);
      
      var bstream = Components.classes["@mozilla.org/binaryoutputstream;1"].createInstance(Components.interfaces.nsIBinaryOutputStream);
      bstream.setOutputStream(stream);
      bstream.writeByteArray(aResult, aLength);
      if (stream instanceof Components.interfaces.nsISafeOutputStream){
         stream.finish();
      }else{
         stream.close();
      }
      var filepath = oDir + '\\' + oFileName;

      if(typeof cbComplete == "function"){
       cbComplete.call(this,filepath);
      }
    }
  }; //observer

  var streamLoader = Components.classes["@mozilla.org/network/stream-loader;1"].createInstance(Components.interfaces.nsIStreamLoader);
  streamLoader.init(observer);
  channel.asyncOpen(streamLoader , channel);
  
  
};

File.getFileFormPath = function(filePath){
  var file = Components.classes['@mozilla.org/file/local;1']
             .createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath(filePath);
  return file;  
}
File.getPath = function(oDir,oFileName){
  var file = Components.classes["@mozilla.org/file/local;1"]
              .createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath(oDir);
  file.appendRelativePath(oFileName);
  return file.persistentDescriptor;

}

File.remove = function(filePath){
  var file = this.getFileFormPath(filePath);

  try{
  file.remove(true);  
  }catch(e){
    alert(e);
  }   
}


AlexPic.file = Object.create(File);


AlexPic.file.getFileName = function(iUrl){
  var r = "";
  var nameExistFlag = 1;

  if(iUrl.charAt(iUrl.length - 1)=="/"){
    nameExistFlag = 0;
  }

  var fileName = iUrl.substring(iUrl.lastIndexOf('/')+1);    
  
  if(fileName.lastIndexOf('.') == -1 ){
    nameExistFlag = 0;      
  }else{
    var fileTypeName = fileName.substring(fileName.lastIndexOf('.')+1);
    if(fileTypeName.length > 4){
    nameExistFlag = 0;
    }
  }

  if(nameExistFlag == 0){  
     var pattern = /png|jpeg|gif|jpg/i;
     var t = new Date().getTime(); 
     var xhr = new XMLHttpRequest();
     xhr.open("GET",iUrl,false);
     xhr.send();
     var xhrR = xhr.getAllResponseHeaders();
     var match = pattern.exec(xhrR);
     if(match[0]){
      r = t + "." + match[0];
     }else{
      r = t + ".jpg";
     }
  }else{
     r = fileName;
  }
  return r;
  
}

AlexPic.file.copyImg = function(saveSrc){

  if(gPasteFilePath.length > 3 ){
    this.remove(gPasteFilePath);
  }  
  var saveFileName = this.getFileName(saveSrc);
  var oDir = this.getTempDir();

  var progressListener = { 
        onProgressChange: function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {
        },


        onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
          if((aStateFlags & 0x00000010 ) == 0x00000010 ){
            //State is STATE_STOP 
            //https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIWebProgressListener#onStateChange%28%29
             AlexPic.noti.showToast(AlexPic.locale.pic_copy_ok);
          }
          
        }
        
  };

  this.save(saveSrc,saveFileName,oDir
    ,progressListener);
  
  var filepath = this.getPath(oDir,saveFileName);
  gPasteFilePath = filepath;
  gPasteFilePathFlag = 1;
 
}

AlexPic.file.saveImgs = function(imgs){
    //win2bottom();
    if(gIsRunning == 1){
    }else{
      gIsRunning = 1;
      AlexPic.progress.show();
      var fp = this.getFp();    
      var fpreturn = fp.show();
      var totalImgNum = imgs.length;
      var downloadedImgNum = 1;
      var progressListener = { 
        onProgressChange: function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {
        },


        onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
          if((aStateFlags & 0x00000010 ) == 0x00000010 ){
            //State is STATE_STOP 
            //https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIWebProgressListener#onStateChange%28%29
            
            if(downloadedImgNum == totalImgNum){
                        
              gIsRunning = 0;
              AlexPic.noti.showToast(AlexPic.locale.pic_download_ok);
              AlexPic.progress.hide();
            }else{
             
              downloadedImgNum++;
            }
           AlexPic.progress.setText(AlexPic.locale.download_info + " " + downloadedImgNum+"/"+totalImgNum); 
          }
          
        }
        
      };
      //alert(fp.file.path);
      if (fpreturn == 0) {        
          for (var i = 0; i < imgs.length; i++) {
            var saveFileName = this.getFileName(imgs[i]);
           
            if(AlexPic.pref.isTrue("isOrderFileName")){
              saveFileName = i + saveFileName.substr(saveFileName.lastIndexOf("."));
            }
            this.save(imgs[i],saveFileName,fp.file.path,progressListener);
          }
         
      }else{
        gIsRunning = 0;
      }    
      }//if(gisRunning == 1) end 
    
  
}
AlexPic.file.getFp = function(filePickName){
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    if(filePickName){
      fp.init(window, filePickName , nsIFilePicker.modeGetFolder);
    }else{
      fp.init(window, AlexPic.locale.fp_name, nsIFilePicker.modeGetFolder);
    }
    
    
    if(AlexPic.pref.hasPref("filepickfile")){
      fp.displayDirectory = AlexPic.pref.getFpFile();
    }
   
    return fp;
}
