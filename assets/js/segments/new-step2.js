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

    $(this).parent().find('#tags').tagsinput('add', $(this).find("option:selected").text());
    $(this).parent().find('#tags').tagsinput('refresh');
    var p=$(this).find('select');
    current=p.val();
    $('select.fieldSelect').each(function () {
      if ($(this).attr("name") != p.attr("name")) {
        $(this).find('[value="' + current + '"]').remove();
        if($(this).find('[value="' + previous + '"]').length == 0 && previous)
        {
          if(previous.includes("ex_")) $(this).children("option").eq(1).before($("<option></option>").val(previous).text(previous.split("_")[1]));
          else $(this).children("option").eq(1).before($("<option></option>").val(previous).text(previous));
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
    else o.before($("<option>", {"selected": true, "text": txt, "value": "ex_"+txt}));
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

/*************************Google map JS ****************************/
var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
    {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

