var FormControls = function () {
  //== Private functions

  $.validator.addMethod("regxPhone", function(value, element, regexpr) {
    return regexpr.test(value);
  }, "Please enter a valid phone");

  var formSubscriber = function () {
    $( "#m_form_subscriber" ).validate({
      // define validation rules
      rules: {
        fullName: {
          required: true,
        },
        email: {
          required: true,
          email: true
        },
        phoneNumber: {
          required: true,
          regxPhone: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
        },
        digits: {
          required: true,
          digits: true
        },
        creditcard: {
          required: true,
          creditcard: true
        },
        phone: {
          required: true,
          phoneUS: true
        },
        option: {
          required: true
        },
        options: {
          required: true,
          minlength: 2,
          maxlength: 4
        },
        memo: {
          required: true,
          minlength: 10,
          maxlength: 100
        },

        checkbox: {
          required: true
        },
        checkboxes: {
          required: true,
          minlength: 1,
          maxlength: 2
        },
        radio: {
          required: true
        }
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
      formSubscriber();
    }
  };
}();

var FormRepeater = function() {
  //== Private functions
  var demo1 = function() {
    $('#m_repeater_1').repeater({
      initEmpty: false,

      defaultValues: {
        'text-input': 'foo'
      },

      show: function () {
        $(this).slideDown();
        $(".valueField").each(function() {
          var String=$(this).attr("name").substring($(this).attr("name").lastIndexOf("[")+1,$(this).attr("name").lastIndexOf("]"));
          $(this).attr("name",String);
        });
      },

      hide: function (deleteElement) {
        $(this).slideUp(deleteElement);
      }
    });
    $(document).on("change paste keyup",'.addedField', function() {
      $(this).parents( ".subscriberAdditional" ).find('.valueField').attr('name', 'ex_'+$(this).val());
    });
  }
  return {
    // public functions
    init: function() {
      demo1();
    }
  };
}();


jQuery(document).ready(function() {
  FormControls.init();
  FormRepeater.init();
  $(".valueField").each(function() {
    if($(this).attr("name")) {
      var String = $(this).attr("name").substring($(this).attr("name").lastIndexOf("[") + 1, $(this).attr("name").lastIndexOf("]"));
      $(this).attr("name",String);
    }
  });

});


