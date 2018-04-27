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
          field: 'Segment ID',
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

  var deleteModal=function () {
    /****Delete Modal ****/
    $('.deleteModal').click(function(evt) {
      $( "#deleteHref" ).attr( "href", "segment/destroy/?id="+$(this).attr('deleteId'));
    });
  };

  return {
    //== Public functions
    init: function() {
      // init demo
      demo();
      deleteModal();
    },
  };
}();


jQuery(document).ready(function() {
  DatatableHtmlTableDemo.init();
});
