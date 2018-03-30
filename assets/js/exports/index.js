
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
          field: 'Lists',
        },
        {
          field: 'Created Date',
          type: 'date',
          format: 'YYYY-MM-DD',
        },
      ],
    });

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
