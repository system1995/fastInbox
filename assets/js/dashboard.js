//== Class definition
var Dashboard = function() {

  var daterangepickerInit = function() {
    if ($('#m_dashboard_daterangepicker').length == 0) {
      return;
    }

    var picker = $('#m_dashboard_daterangepicker');
    var start = moment();
    var end = moment();

    function cb(start, end, label) {
      var title = '';
      var range = '';

      if ((end - start) < 100) {
        title = 'Today:';
        range = start.format('MMM D');
      } else if (label == 'Yesterday') {
        title = 'Yesterday:';
        range = start.format('MMM D');
      } else {
        range = start.format('MMM D') + ' - ' + end.format('MMM D');
      }

      picker.find('.m-subheader__daterange-date').html(range);
      picker.find('.m-subheader__daterange-title').html(title);
    }

    picker.daterangepicker({
      startDate: start,
      endDate: end,
      opens: 'left',
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, cb);

    cb(start, end, '');
  }
  return {
    //== Init demos
    init: function() {
      // init daterangepicker
      daterangepickerInit();

    }
  };
}();

//== Class initialization on page load
jQuery(document).ready(function() {
  Dashboard.init();
});//== Class definition
var Dashboard = function() {
  var daterangepickerInit = function() {
    if ($('#m_dashboard_daterangepicker').length == 0) {
      return;
    }

    var picker = $('#m_dashboard_daterangepicker');
    var start = moment();
    var end = moment();

    function cb(start, end, label) {
      var title = '';
      var range = '';

      if ((end - start) < 100) {
        title = 'Today:';
        range = start.format('MMM D');
      } else if (label == 'Yesterday') {
        title = 'Yesterday:';
        range = start.format('MMM D');
      } else {
        range = start.format('MMM D') + ' - ' + end.format('MMM D');
      }

      picker.find('.m-subheader__daterange-date').html(range);
      picker.find('.m-subheader__daterange-title').html(title);
    }

    picker.daterangepicker({
      startDate: start,
      endDate: end,
      opens: 'left',
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, cb);

    cb(start, end, '');
  }
  return {
    //== Init demos
    init: function() {
      // init daterangepicker
      daterangepickerInit();
    }
  };
}();

//== Class initialization on page load
jQuery(document).ready(function() {
  Dashboard.init();
});
