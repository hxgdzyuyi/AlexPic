var Puzzle = {
  maxwidth: function (imgs) {
        var ret = 0;
        for (num in imgs) {
            if (imgs[num].width > ret) {
                ret = imgs[num].width;
            }
        }
        return ret;
    },
  maxheight: function (imgs) {
        var ret = 0;
        for (num in imgs) {
            ret += imgs[num].height+5;

        }
        return ret;
    },
  mergepic: function (imgurls) {
        var imgs = new Array();
        for (num in imgurls) {
            imgs[num] = new Image();
            imgs[num].src = imgurls[num];
        }
        var cw = this.maxwidth(imgs);
        var ch = this.maxheight(imgs);
        var doc = window.getBrowser().selectedBrowser.contentDocument;        
        var canvas = doc.createElementNS(AlexPic.ns.html, "canvas");
        canvas.setAttributeNS(null,"width", cw + 10);
        canvas.setAttributeNS(null,"height", ch);        
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0,0,cw + 10 , ch);
        var h = 0;
        var ch = 0;
        var tw;
        for (num in imgs) {
            tw = imgs[num].width;
            th = imgs[num].height;
            ctx.drawImage(imgs[num], (cw / 2 - tw / 2 + 5), ch);
            ch += th;
            ch += 5;
        } 

        return canvas;
    }
}

AlexPic.puzzle = Object.create(Puzzle);

AlexPic.puzzle.savePuzzle = function (imgs) {
   
  if( gIsRunning == 1 )
  {}else{
        try{  
          var canvas = this.mergepic(imgs);       
          var fp = AlexPic.file.getFp();
          var fpreturn = fp.show();}
        catch(e){
          AlexPic.noti.showToast(AlexPic.locale.error);
          gIsRunning = 0;
        }        
        var doc = window.getBrowser().selectedBrowser.contentDocument;
        if (fpreturn == 0) {         
          var progressListener = { 

          onProgressChange: function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {
          },


          onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
            if((aStateFlags & 0x00000010 ) == 0x00000010 ){
              //State is STATE_STOP 
              //https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIWebProgressListener#onStateChange%28%29
                AlexPic.noti.showToast(AlexPic.locale.pic_download_ok);
                gIsRunning = 0;
            }

          }

        };//progressListener end


        AlexPic.file.save(canvas.toDataURL("image/png", ""),doc.domain + '.png',fp.file.path,progressListener);
        }//if fpreturn == 0 end
        else{
          gIsRunning = 0;
        }
  }//gIsRunnning end         
}

AlexPic.puzzle.copyPuzzle = function (imgs) {
  if( gIsRunning == 1 )
  {}else{
       gIsRunning = 1;
       if(gPasteFilePath.length > 3 ){
        AlexPic.file.remove(gPasteFilePath);
       } 
        var doc = window.getBrowser().selectedBrowser.contentDocument;
        var saveFileName = doc.domain + ".jpg";
        
        var oDir = AlexPic.file.getTempDir();
        try{  
          var canvas = this.mergepic(imgs);       
        }
        catch(e){
          AlexPic.noti.showToast(AlexPic.locale.error);
          gIsRunning = 0;
        }    
       
        var progressListener = { 

          onProgressChange: function(aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {
          },


          onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus) {
            if((aStateFlags & 0x00000010 ) == 0x00000010 ){
              //State is STATE_STOP 
              //https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIWebProgressListener#onStateChange%28%29
               gIsRunning = 0;
               
               AlexPic.noti.showToast(AlexPic.locale.pic_copy_ok);
               
            }

          }

        };//progressListener end


        AlexPic.file.save(canvas.toDataURL("image/jpeg", ""),saveFileName,oDir,progressListener);
        var filepath = AlexPic.file.getPath(oDir,saveFileName);
        gPasteFilePath = filepath;
        gPasteFilePathFlag = 1;
        
  }//gIsRunnning end   
}


AlexPic.puzzle.test = function(w){
  alert("a");
}

