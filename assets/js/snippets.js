
/*
---------------------------------------------------------------------
*/


/*
* Parallax effect on body background image
* negative speed makes background move "slower" than everything else
*
*/

(function() {
  const parallax = document.querySelectorAll('body');
  const speed = -0.1;

  window.onscroll = function() {
    [].slice.call(parallax).forEach(function(el, i) {
      const windowYOffset = window.pageYOffset;
      const elBackgrounPos = '50% ' + (windowYOffset * speed) + 'px';

      el.style.backgroundPosition = elBackgrounPos;
    });
  };
})();


/*
  ------------------------------------------------------------------
  */
