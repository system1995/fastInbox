var FormControls = function () {
  //== Private functions
  var formprocInvEmail = function () {
    $( "#m_form_procInvEmail" ).validate({
      // define validation rules
      rules: {

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
      formprocInvEmail();
    }
  };
}();


jQuery(document).ready(function() {
  FormControls.init();
});


