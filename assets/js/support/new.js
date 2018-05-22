var FormControls = function () {
  //== Private functions
  var formTicket = function () {
    $( "#m_form_ticket" ).validate({
      // define validation rules
      rules: {
        object: {
          required: true,
        },
        message: {
          required: true,
        },
      },
      //display error alert on form submit
      invalidHandler: function(event, validator) {
        mApp.scrollTo("#m_form_list");
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
      formTicket();
    }
  };
}();


jQuery(document).ready(function() {
  FormControls.init();
});


