$( document ).ready(function() {
  $("[rel='tooltip']").tooltip();

  $('.thumbnail').hover(
    function(){
      $(this).find('.caption').slideDown(300); //.fadeIn(250)
    },
    function(){
      $(this).find('.caption').slideUp(250); //.fadeOut(205)
    }
  );

  $( ".btnSelect" ).click(function() {
      $(this).parents('.thumbnail:first').css({'border-style': 'solid','border-color': '#716aca'})
      $(this).find('.caption').slideDown(300); //.fadeIn(250)
  });
});
