// demo initializer
var DatatableHtmlTableDemo = function() {
  //== Private functions
  var demo = function() {

  var datatableEmail = $('#html_table_email').mDatatable({
    data: {
      saveState: {cookie: false},
    },
    search: {
      input: $('#generalSearch_email'),
    },
    columns: [
      {
        field: 'Campaign ID',
      },
      {
        field: 'Name',
      },
      {
        field: 'Object',
      },
      {
        field: 'Owner',
      },
      {
        field: 'Status',
      },
      {
        field: 'Created Date',
        type: 'date',
        format: 'YYYY-MM-DD',
      }, {
        field: 'Status',
        title: 'Status',
        // callback function support for column rendering
        template: function(row) {
          var status = {
            'draft': {'title': 'Draft', 'class': 'm-badge--primary'},
            'inProgress': {'title': 'In Progress', 'class': ' m-badge--info'},
            'suspended': {'title': 'Suspended', 'class': ' m-badge--danger'},
            'sent': {'title': 'Sent', 'class': ' m-badge--success'},
            'scheduled': {'title': 'Scheduled', 'class': ' m-badge--warning'},
            'archived': {'title': 'Archived', 'class': ' m-badge--default'},
          };
          return '<span class="m-badge ' + status[row.Status].class + ' m-badge--wide">' + status[row.Status].title + '</span>';
        },
      },
    ],
  });

  $('#m_form_status_email').on('change', function() {
    datatableEmail.search($(this).val().toLowerCase(), 'Status');
  });
  $('#m_form_status_email').selectpicker();

    var datatableSMS = $('#html_table_sms').mDatatable({
      data: {
        saveState: {cookie: false},
      },
      search: {
        input: $('#generalSearch_sms'),
      },
      columns: [
        {
          field: 'Campaign ID',
        },
        {
          field: 'Name',
        },
        {
          field: 'Object',
        },
        {
          field: 'Owner',
        },
        {
          field: 'Status',
        },
        {
          field: 'Created Date',
          type: 'date',
          format: 'YYYY-MM-DD',
        }, {
          field: 'Status',
          title: 'Status',
          // callback function support for column rendering
          template: function(row) {
            var status = {
              'draft': {'title': 'Draft', 'class': 'm-badge--primary'},
              'inProgress': {'title': 'In Progress', 'class': ' m-badge--info'},
              'suspended': {'title': 'Suspended', 'class': ' m-badge--danger'},
              'sent': {'title': 'Sent', 'class': ' m-badge--success'},
              'scheduled': {'title': 'Scheduled', 'class': ' m-badge--warning'},
              'archived': {'title': 'Archived', 'class': ' m-badge--default'},
            };
            return '<span class="m-badge ' + status[row.Status].class + ' m-badge--wide">' + status[row.Status].title + '</span>';
          },
        },
      ],
    });

    $('#m_form_status_sms').on('change', function() {
      datatableEmail.search($(this).val().toLowerCase(), 'Status');
    });
    $('#m_form_status_sms').selectpicker();


  };
  var deleteModal=function () {
    /****Delete Modal ****/
    $('.deleteModal').click(function(evt) {
      $( "#deleteHref" ).attr( "href", "campaigns/destroy/?id="+$(this).attr('deleteId'));
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



