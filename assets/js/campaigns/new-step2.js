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
    $('#emailTemplate').val($(this).attr( "emailTemplate" ));
      var currentThumbnail=$(this).parents('.thumbnail:first');
      $(".thumbnail").each(function() {
          $(this).css({'border-style': '','border-color': ''});
      });
    currentThumbnail.css({'border-style': 'solid','border-color': '#716aca'});
  });

  $( "#save" ).click(function() {
    if(!($('#emailTemplate').val()))
    {
      mApp.scrollTo("#m_form_subscriber");
      swal({
        "title": "",
        "text": "Please choose a email Template.",
        "type": "error",
        "confirmButtonClass": "btn btn-secondary m-btn m-btn--wide"
      });
    }
    else {
      $( "#m_form_campaign" ).submit();
    }
  });


});
