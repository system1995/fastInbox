$(function() {
  var content = "<input type='text' class='bss-input' style='border:0;margin:-3px;padding:3px;outline: none;color: #000;width: 99%;"+
    "' onKeyDown='event.stopPropagation();' onKeyPress='addSelectInpKeyPress(this,event)' onClick='event.stopPropagation()' placeholder='Add item'> <span class='glyphicon glyphicon-plus addnewicon' onClick='addSelectItem(this,event,1);'></span>";

  var divider = $('<option/>')
    .addClass('divider')
    .data('divider', true);


  var addoption = $('<option/>', {class: 'addItem'})
    .data('content', content)

  $('.fieldSelect')
    .append(divider)
    .append(addoption)
    .selectpicker();
});

function addSelectItem(t,ev)
{
  ev.stopPropagation();

  var bs = $(t).closest('.bootstrap-select')
  var txt=bs.find('.bss-input').val().replace(/[|]/g,"");
  var txt=$(t).prev().val().replace(/[|]/g,"");
  if ($.trim(txt)=='') return;

  // Changed from previous version to cater to new
  // layout used by bootstrap-select.
  var p=bs.find('select');
  var o=$('option', p).eq(-2);
  o.before( $("<option>", { "selected": true, "text": txt}) );
  p.selectpicker('refresh');
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


