AlexPic.progress = {
  init:function(){
      var progress = document.getElementById("o_progress");           
      progress.setAttribute("style","display: block");
      progress.label = "AlexPic";
  },
  setText:function(text){
      var progress = document.getElementById("o_progress");           
      progress.label = text;         
  }              
};


