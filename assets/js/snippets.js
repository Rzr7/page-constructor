
/*
-------------------------------------------------------------------------------------------------------------------------
*/


/*
* Parallax effect on body background image
* negative speed makes background move "slower" than everything else
*
*/

(function(){

    var parallax = document.querySelectorAll("body"),
        speed = -0.1;
  
    window.onscroll = function(){
      [].slice.call(parallax).forEach(function(el,i){
  
        var windowYOffset = window.pageYOffset,
            elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
  
        el.style.backgroundPosition = elBackgrounPos;
  
      });
    };
  
  })();
  
  
  /*
  -------------------------------------------------------------------------------------------------------------------------
  */
