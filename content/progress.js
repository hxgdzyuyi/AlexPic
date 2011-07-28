AlexPic.progress = {
  show:function(){
      var progress = document.getElementById("o_progress");           
      progress.setAttribute("style","display: block");
      progress.label = "AlexPic";
  },
  setText:function(text){
      var progress = document.getElementById("o_progress");           
      progress.label = text;         
  },
  hide:function(){
      var progress = document.getElementById("o_progress");           
      progress.setAttribute("style","display: none");
      progress.label = "AlexPic";
  }
};


