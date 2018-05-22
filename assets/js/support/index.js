// demo initializer
var DatatableHtmlTableDemo = function() {
  //== Private functions
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
        field: 'Ticket ID',
      },
      {
        field: 'Object',
      },
      {
        field: 'Service',
      },
      {
        field: 'Priority',
      },
      {
        field: 'Campaign',
      },
      {
        field: 'Created Date',
        type: 'date',
        format: 'YYYY-MM-DD',
      },
       {
        field: 'Status',
        title: 'Status',
        // callback function support for column rendering
        template: function(row) {
          var status = {
            'open': {'title': 'Open', 'class': 'm-badge--success'},
            'close': {'title': 'Close', 'class': ' m-badge--info'},
          };
          return '<span class="m-badge ' + status[row.Status].class + ' m-badge--wide">' + status[row.Status].title + '</span>';
        },
      },
    ],
  });

  $('#m_form_status').on('change', function() {
    datatable.search($(this).val().toLowerCase(), 'Status');
  });
  $('#m_form_status').selectpicker();

};
  var deleteModal=function () {
    /****Delete Modal ****/
    $('.deleteModal').click(function(evt) {
      $( "#deleteHref" ).attr( "href", "subscriber/destroy/?id="+$(this).attr('deleteId'));
    });
  };
  return {
    //== Public functions
    init: function() {
      // init dmeo
      demo();
      deleteModal();
    },
  };
}();


jQuery(document).ready(function() {
  DatatableHtmlTableDemo.init();

});
