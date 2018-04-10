/*************File upload file repeater **************/
$(function()
{
  $(document).on('click', '.btn-add', function(e)
  {
    e.preventDefault();

    var controlForm = $('.controls:first'),
      currentEntry = $(this).parents('.entry:first'),
      newEntry = $(currentEntry.clone()).appendTo(controlForm);

    newEntry.find('input').val('');
    controlForm.find('.entry:not(:last) .btn-add')
      .removeClass('btn-add').addClass('btn-remove')
      .removeClass('btn-success').addClass('btn-danger')
      .html('<span class="fa fa-minus"></span>');
  }).on('click', '.btn-remove', function(e)
  {
    $(this).parents('.entry:first').remove();

    e.preventDefault();
    return false;
  });
});

/****************************Validaion *********************************/
var FormControls = function () {
  //== Private functions

  var formCampaign = function () {
    $( "#m_form_campaign" ).validate({
      // define validation rules
      rules: {
        name: {
          required: true,
        },
        object: {
          required: true,
        },
        nameSender: {
          required: true,
        },
        attachment: {
          required: true,
          extension: "pdf|word|rar"
        },
      },

      //display error alert on form submit
      invalidHandler: function(event, validator) {
        mApp.scrollTo("#m_form_subscriber");
        swal({
          "title": "",
          "text": "There are some errors in your submission. Please correct them.",
          "type": "error",
          "confirmButtonClass": "btn btn-secondary m-btn m-btn--wide"
        });
      },

      submitHandler: function (form) {
        form[0].submit(); // submit the form
      }
    });
  }
  return {
    // public functions
    init: function() {
      formCampaign();
    }
  };
}();

jQuery(document).ready(function() {
  FormControls.init();
});
