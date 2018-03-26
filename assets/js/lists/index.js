// demo initializer
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
          field: 'List ID',
        },
        {
          field: 'Name',
        },
        {
          field: 'Number of subscribers',
          type :'number'
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
  DatatableHtmlTableDemo.init();
});
