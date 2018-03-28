//== Class definition
var BootstrapTouchspin = function() {

  //== Private functions
  var demos = function() {
    // minimum setup
    $('#m_touchspin_1, #m_touchspin_2_1').TouchSpin({
      buttondown_class: 'btn btn-secondary',
      buttonup_class: 'btn btn-secondary',

      min: 0,
      max: 100,
      step: 0.1,
      decimals: 2,
      boostat: 5,
      maxboostedstep: 10,
    });
  }

  var validationStateDemos = function() {
    // validation state demos
    $('#m_touchspin_1_validate').TouchSpin({
      buttondown_class: 'btn btn-secondary',
      buttonup_class: 'btn btn-secondary',

      min: -1000000000,
      max: 1000000000,
      stepinterval: 50,
      maxboostedstep: 10000000,
      prefix: '$'
    });
  }

  return {
    // public functions
    init: function() {
      demos();
      validationStateDemos();
    }
  };
}();

var DatatableHtmlTableDemo = function() {
  //== Private functions
  // demo initializer
  var demo = function() {

    var datatable = $('.m-datatable').mDatatable({
      data: {
        saveState: {cookie: false},
      },
      search: {
        input: $('#generalSearch'),
      },
      columns: [
        {
          field: 'Import ID',
        },
        {
          field: 'Name',
        },
        {
          field: 'Progress',
        },
        {
          field: 'Lists',
        },
        {
          field: 'Created Date',
          type: 'date',
          format: 'YYYY-MM-DD',
        },
      ],
    });

    $('#m_touchspin_1').on('change', function() {
      datatable.search($(this).val(), 'Progress');
    });


    $('#m_touchspin_1').selectpicker();

  };

  return {
    //== Public functions
    init: function() {
      // init dmeo
      demo();
    },
  };
}();

jQuery(document).ready(function() {
  //BootstrapTouchspin.init();
  DatatableHtmlTableDemo.init();
});
