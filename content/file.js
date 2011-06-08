var File = {
};

File.getFileName = function(iUrl){  
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
     var t = new Date().getTime(); 
     r = t + ".jpg";
  }else{
     r = fileName;
  }
  
  return r;
  
}

File.getTempDir = function(){
  var file = Components.classes["@mozilla.org/file/directory_service;1"].
           getService(Components.interfaces.nsIProperties).
           get("ProfD", Components.interfaces.nsIFile);
  //DefRt https://developer.mozilla.org/en/Code_snippets/File_I%2f%2fO           
  var r = file.path;
  return r;  
}



File.save = function(iUrl,oFileName,oDir,cbComplete){
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

File.remove = function(filePath){
  var file = this.getFileFormPath(filePath);
  alert(file.path);

  try{
  file.remove(true);
  }catch(e){
    alert(e);
  }


  
  alert("ok");
  
}

File.test = function(){
  this.complete();
}
File.complete = function(find){
  if(gPasteFilePath.lengah > 3 ){
    this.remove(gPasteFilePath);
  }
  var saveFlag = 0;  
  var saveSrc = find.getImgSrc();
  if(find.findFlag == 1){
    var saveFileName = this.getFileName(saveSrc);
    //const nsIFilePicker = Components.interfaces.nsIFilePicker;
    //var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
    //fp.init(window, "asdf", nsIFilePicker.modeGetFolder);
    //fp.show();
    var oDir = this.getTempDir();
    this.save(saveSrc,saveFileName,oDir
      ,function(filepath){        
        gPasteFilePath = filepath;
        gPasteFilePathFlag = 1;
        alert("You can use AlexPic Paste");
    });
  }
 
}


