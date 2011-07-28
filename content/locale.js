AlexPic.locale = {
  str:"",
  fp_name:"",
  pic_copy_ok:"",
  pic_download_ok:"",
  downlaod_info:"",
  init:function(){
    this.str = document.getElementById("alexpic-strings"); 
    this.pic_copy_ok = this.getString("pic_copy_ok");
    this.pic_download_ok = this.getString("pic_download_ok");
    this.fp_name = this.getString("fp_name");
    this.download_info = this.getString("download_info");    
  },
  getString:function(string){ 
  
	return this.str.getString(string); 
  }
  
}
