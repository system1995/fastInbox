$('#btnImage').click(function(){
  $('#image').click();
});

$("#image").change(function(){
  readURL(this);
  var formData = new FormData();
  formData.append('file', this.files[0]);
  $.ajax({
    url : '/profile/editImage',
    type : 'POST',
    data : formData,
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    success : function(data) {
      console.log(data);
      alert(data);
    }
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var fileType = file["type"];
    var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if ($.inArray(fileType, ValidImageTypes) < 0) {
      mApp.scrollTo("#m_form_emailTemplate");
      swal({
        "title": "",
        "text": "Image profile extension is invalid.",
        "type": "error",
        "confirmButtonClass": "btn btn-secondary m-btn m-btn--wide"
      });
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imgUpload').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}


var FormControls = function () {
  //== Private functions
  var formProfile = function () {
    $( "#m_form_profile" ).validate({
      // define validation rules
      rules: {
        username: {
          required: true,
        },
        email: {
          required: true,
        },
        linkedin:{
          url:true
        },
        facebook:{
          url:true
        },
        twitter:{
          url:true
        },
        instagram:{
          url:true
        }
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
      formProfile();
    }
  };
}();

jQuery(document).ready(function() {
  FormControls.init();
});

