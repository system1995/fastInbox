/***********Add field dynamically ***********/
$(function()
{
  $(document).on('click', '.btn-add', function(e)
  {
    e.preventDefault();
    var controlForm = $('.controls'),
      currentEntry = $(this).parents('.entry:first'),
      newEntry = $(currentEntry.clone()).appendTo(controlForm);
     currentEntry.find('input').prop('disabled', false);
     newEntry.find('input').val('').prop('disabled', true);
     controlForm.find('.entry:not(:last) .btn-add')
      .removeClass('btn-add').addClass('btn-remove')
      .removeClass('btn-success').addClass('btn-danger')
      .html('<i class="fas fa-times"></i>');
  }).on('click', '.btn-remove', function(e)
  {
    $(this).parents('.entry:first').remove();

    e.preventDefault();
    return false;
  });

  $(document).on("change paste keyup",'.addedField', function() {

    $(this).parent().find('.valueField').attr('name', 'ex_'+$(this).val());
  });

});
