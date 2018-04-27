
var host = 'http://artf.github.io/grapesjs/';
var images = [
  host + 'img/grapesjs-logo.png',
  host + 'img/tmp-blocks.jpg',
  host + 'img/tmp-tgl-images.jpg',
  host + 'img/tmp-send-test.jpg',
  host + 'img/tmp-devices.jpg',
];

// Set up GrapesJS editor with the Newsletter plugin
var editor = grapesjs.init({
  clearOnRender: true,
  height: '100%',
  storageManager: {
    id: 'gjs-nl-',
  },
  assetManager: {
    assets: images,
    upload: 0,
    uploadText: 'Uploading is not available in this demo',
  },
  container : '#gjs',
  fromElement: true,
  plugins: ['gjs-preset-newsletter', 'gjs-aviary', 'gjs-plugin-ckeditor'],
  pluginsOpts: {
    'gjs-preset-newsletter': {
      modalLabelImport: 'Paste all your code here below and click import',
      modalLabelExport: 'Copy the code and use it wherever you want',
      codeViewerTheme: 'material',
      //defaultTemplate: templateImport,
      importPlaceholder: '<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
      cellStyle: {
        'font-size': '12px',
        'font-weight': 300,
        'vertical-align': 'top',
        color: 'rgb(111, 119, 125)',
        margin: 0,
        padding: 0,
      }
    },
    'gjs-plugin-ckeditor': {
      position: 'center',
      options: {
        startupFocus: true,
        extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
        allowedContent: true, // Disable auto-formatting, class removing, etc.
        enterMode: CKEDITOR.ENTER_BR,
        extraPlugins: 'sharedspace,justify,colorbutton,panelbutton,font',
        toolbar: [
          { name: 'styles', items: ['Font', 'FontSize' ] },
          ['Bold', 'Italic', 'Underline', 'Strike'],
          {name: 'paragraph', items : [ 'NumberedList', 'BulletedList']},
          {name: 'links', items: ['Link', 'Unlink']},
          {name: 'colors', items: [ 'TextColor', 'BGColor' ]},
        ],
      }
    }
  }
});


// Let's add in this demo the possibility to test our newsletters
var mdlClass = 'gjs-mdl-dialog-sm';
var pnm = editor.Panels;
var cmdm = editor.Commands;
var md = editor.Modal;
/*
var testContainer = document.getElementById("test-form");
var contentEl = testContainer.querySelector('input[name=body]');
cmdm.add('send-test', {
run(editor, sender) {
sender.set('active', 0);
var modalContent = md.getContentEl();
var mdlDialog = document.querySelector('.gjs-mdl-dialog');
var cmdGetCode = cmdm.get('gjs-get-inlined-html');
contentEl.value = cmdGetCode && cmdGetCode.run(editor);
mdlDialog.className += ' ' + mdlClass;
testContainer.style.display = 'block';
md.setTitle('Test your Newsletter');
md.setContent('');
md.setContent(testContainer);
md.open();
md.getModel().once('change:open', function() {
mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
//clean status
})
}
});
pnm.addButton('options', {
id: 'send-test',
className: 'fa fa-paper-plane',
command: 'send-test',
attributes: {
'title': 'Test Newsletter',
'data-tooltip-pos': 'bottom',
},
});

var statusFormElC = document.querySelector('.form-status');
var statusFormEl = document.querySelector('.form-status i');
var ajaxTest = ajaxable(testContainer).
onStart(function(){
statusFormEl.className = 'fa fa-refresh anim-spin';
statusFormElC.style.opacity = '1';
statusFormElC.className = 'form-status';
})
.onResponse(function(res){
if (res.data) {
statusFormElC.style.opacity = '0';
statusFormEl.removeAttribute('data-tooltip');
md.close();
} else if(res.errors || res.errors == '') {
var err = res.errors || 'Server error';
statusFormEl.className = 'fa fa-exclamation-circle';
statusFormEl.setAttribute('data-tooltip', err);
statusFormElC.className = 'form-status text-danger';
}
});
*/

// Add info command
var infoContainer = document.getElementById("info-panel");
cmdm.add('open-info', {
  run(editor, sender) {
    sender.set('active', 0);
    var mdlDialog = document.querySelector('.gjs-mdl-dialog');
    mdlDialog.className += ' ' + mdlClass;
    infoContainer.style.display = 'block';
    md.setTitle('About this demo');
    md.setContent('');
    md.setContent(infoContainer);
    md.open();
    md.getModel().once('change:open', function() {
      mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
    })
  }
});
pnm.addButton('options', [{
  id: 'undo',
  className: 'fa fa-undo',
  attributes: {title: 'Undo'},
  command: function(){ editor.runCommand('core:undo') }
},{
  id: 'redo',
  className: 'fa fa-repeat',
  attributes: {title: 'Redo'},
  command: function(){ editor.runCommand('core:redo') }
},{
  id: 'clear-all',
  className: 'fa fa-trash icon-blank',
  attributes: {title: 'Clear canvas'},
  command: {
    run: function(editor, sender) {
      sender && sender.set('active', false);
      if(confirm('Are you sure to clean the canvas?')){
        editor.DomComponents.clear();
        setTimeout(function(){
          localStorage.clear()
        },0)
      }
    }
  }
},{
  id: 'view-info',
  className: 'fa fa-question-circle',
  command: 'open-info',
  attributes: {
    'title': 'About',
    'data-tooltip-pos': 'bottom',
  },
}]);

// Simple warn notifier
var origWarn = console.warn;
toastr.options = {
  closeButton: true,
  preventDuplicates: true,
  showDuration: 250,
  hideDuration: 150
};
console.warn = function (msg) {
  toastr.warning(msg);
  origWarn(msg);
};

// Beautify tooltips
var titles = document.querySelectorAll('*[title]');
for (var i = 0; i < titles.length; i++) {
  var el = titles[i];
  var title = el.getAttribute('title');
  title = title ? title.trim(): '';
  if(!title)
    break;
  el.setAttribute('data-tooltip', title);
  el.setAttribute('title', '');
}


// Do stuff on load
editor.on('load', function() {
  var $ = grapesjs.$;

  // Show logo with the version
  var logoCont = document.querySelector('.gjs-logo-cont');
  document.querySelector('.gjs-logo-version').innerHTML = 'v' + grapesjs.version;
  var logoPanel = document.querySelector('.gjs-pn-commands');
  logoPanel.appendChild(logoCont);
  // Move Ad
  $('#gjs').append($('.ad-cont'));
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','../www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-74284223-1', 'auto');
ga('send', 'pageview');


var FormControls = function () {
  //== Private functions
  var formList = function () {
    $( "#m_form_emailTemplate" ).validate({
      // define validation rules
      rules: {
        name: {
          required: true,
        },
        ImportFile: {
          required: true,
          extension: "html"
        },
      },
      //display error alert on form submit
      /*invalidHandler: function(event, validator) {
        mApp.scrollTo("#m_form_emailTemplate");
        swal({
          "title": "",
          "text": "There are some errors in your submission. Please correct them.",
          "type": "error",
          "confirmButtonClass": "btn btn-secondary m-btn m-btn--wide"
        });
      },*/
      submitHandler: function (form) {
        //form[0].submit(); // submit the form
      }
    });
  }
  return {
    // public functions
    init: function() {
      formList();
    }
  };
}();


jQuery(document).ready(function() {
  FormControls.init();
});


$.get(templateEmail, function(data, status){
  editor.setComponents(data);
});

$( "#save" ).click(function() {
  if($( "#m_form_emailTemplate" ).valid()) {
    $.post(postLink, {
      html: editor.getHtml(),
      name: $("#name").val(),
      category: $("#category").val(),
      description: $("#description").val()
    }).done(function (result) {
      window.location.href = "/emailsTemplate";
    });
  }
  else {
    mApp.scrollTo("#m_form_emailTemplate");
    swal({
      "title": "",
      "text": "There are some errors in your submission. Please correct them.",
      "type": "error",
      "confirmButtonClass": "btn btn-secondary m-btn m-btn--wide"
    });
  }
});







