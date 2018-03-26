var FormControls = function () {
  //== Private functions
  var formImport = function () {
    $( "#m_form_import" ).validate({
      // define validation rules
      rules: {
        ImportFile: {
          required: true,
          extension: "xml|csv|xlsx"
        },
      },
      //display error alert on form submit
      invalidHandler: function(event, validator) {
        mApp.scrollTo("#m_form_import");
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
      formImport();
    }
  };
}();

jQuery(document).ready(function() {
  FormControls.init();
});


