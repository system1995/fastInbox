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
        field: 'Subscriber ID',
      },
      {
        field: 'Full Name',
      },
      {
        field: 'Email',
        width: 200,
      },
      {
        field: 'Phone Number',
      },
      {
        field: 'Created Date',
        type: 'date',
        format: 'YYYY-MM-DD',
      },
      {
        field: 'Updated Date',
        type: 'date',
        format: 'YYYY-MM-DD',
      }, {

        field: 'Status',
        title: 'Status',
        // callback function support for column rendering
        template: function(row) {
          var status = {
            'new': {'title': 'New', 'class': 'm-badge--default'},
            'blocked': {'title': 'Blocked', 'class': 'm-badge--warning'},
            'active': {'title': 'Active', 'class': ' m-badge--success'},
            'invalid': {'title': 'Invalid', 'class': ' m-badge--danger'},
            'unsubscriber': {'title': 'Unsubscriber', 'class': ' m-badge--info'},
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
