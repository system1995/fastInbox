var FormControls = function () {
  //== Private functions
  var formList = function () {
    $( "#m_form_emailTemplate" ).validate({
      // define validation rules
      rules: {
        name: {
          required: true,
        },
        ImportFile: {
          required: true,
          extension: "html"
        },
      },
      //display error alert on form submit
      invalidHandler: function(event, validator) {
        mApp.scrollTo("#m_form_emailTemplate");
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
      formList();
    }
  };
}();


jQuery(document).ready(function() {
  FormControls.init();
});


