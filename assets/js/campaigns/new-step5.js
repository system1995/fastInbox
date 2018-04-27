jQuery(document).ready(function() {
  $("input[name='schedule']").on("change", function () {
    if(this.value!="later")
    {
      $("#m_datetimepicker_2").prop('disabled', true);
    }
    else $("#m_datetimepicker_2").prop('disabled', false);
  });
});

