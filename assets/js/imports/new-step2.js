$(function() {
  /*********Add option********/
  var content = "<input type='text' class='bss-input' style='border:0;margin:-3px;padding:3px;outline: none;color: #000;width: 99%;"+
    "' onKeyDown='event.stopPropagation();' onKeyPress='addSelectInpKeyPress(this,event)' onClick='event.stopPropagation()' placeholder='Add item'> <span class='glyphicon glyphicon-plus addnewicon' onClick='addSelectItem(this,event,1);'></span>";

  var divider = $('<option/>')
    .addClass('divider')
    .data('divider', true);


  var addoption = $('<option/>', {class: 'addItem'})
    .data('content', content);

  $('.fieldSelect')
    .append(divider)
    .append(addoption)
    .selectpicker()
    ;

  /*********On Change and hover Select ********/
  var previous=null;
  var current=null;
  $(".bootstrap-select").hover(function () {
      previous = $(this).find('select').val();
  }).change(function () {
    var p=$(this).find('select');
    current=p.val();
    $('select.fieldSelect').each(function () {
      if ($(this).attr("name") != p.attr("name")) {
        $(this).find('[value="' + current + '"]').remove();
        if($(this).find('[value="' + previous + '"]').length == 0 && previous)
        {
            $(this).children("option").eq(1).before($("<option></option>").val(previous).text(previous));
        }
      }
      $(this).selectpicker('refresh');
    });
    previous=null;
  });

  /*********Delete field ********/

  $( ".btn-remove" ).click(function() {
    var select=$(this).parent().find('select');
    select.find('[value="' + select.val() + '"]').remove();
    select.val("");
    select.selectpicker('refresh');
  });

});

function addSelectItem(t,ev)
{
  ev.stopPropagation();
  var bs = $(t).closest('.bootstrap-select')
  var txt=bs.find('.bss-input').val().replace(/[|]/g,"");
  var txt=$(t).prev().val().replace(/[|]/g,"");
  if ($.trim(txt)=='') return;
  var p=bs.find('select');
  var previous=p.val();
  if(existSelectItem(txt)==false) {
    var o = $('option', p).eq(-2);
    if (p.attr("name") != p.attr("name")) o.before($("<option>", {"selected": false, "text": txt}));
    else o.before($("<option>", {"selected": true, "text": txt, "value": txt}));
    p.selectpicker('refresh');
    $('select.fieldSelect').each(function () {
      if ($(this).attr("name") != p.attr("name")) {
        if($(this).find('[value="' + previous + '"]').length == 0 && previous)
        {
          $(this).children("option").eq(1).before($("<option></option>").val(previous).text(previous));
        }
      }
      $(this).selectpicker('refresh');
    });
  }
  else alert("Option already exist !");

}

function existSelectItem(txt)
{
  return $("select.fieldSelect option[value='"+txt+"']").length > 0;
}

function addSelectInpKeyPress(t,ev)
{
  ev.stopPropagation();
  // do not allow pipe character
  if (ev.which==124) ev.preventDefault();

  // enter character adds the option
  if (ev.which==13)
  {
    ev.preventDefault();
    addSelectItem($(t).next(),ev);
  }
}

<!-- language: lang-js -->
$('select[name=team2]').on('change', function() {
  var self = this;
  $('select[name=team1]').find('option').prop('disabled', function() {
    return this.value == self.value
  });
});

$('select[name=team1]').on('change', function() {
  var self = this;
  $('select[name=team2]').find('option').prop('disabled', function() {
    return this.value == self.value
  });
});

/***************Validation of the form*********************/
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





