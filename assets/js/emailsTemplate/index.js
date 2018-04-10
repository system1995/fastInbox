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
  $('#m_form_category').selectpicker();

  $('.deleteModal').click(function(evt) {
    $( "#deleteHref" ).attr( "href", "/emailsTemplate/destroy/?id="+$(this).attr('deleteId'));
  });
});
