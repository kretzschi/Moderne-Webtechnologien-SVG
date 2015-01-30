jQuery.onFontResize=function(c){c(document).ready(function(){var a=c("<iframe />").attr("id","frame-onFontResize"+Date.parse(new Date)).css({width:"100em",height:"10px",position:"absolute",borderWidth:0,top:"-5000px",left:"-5000px"}).appendTo("body");if(c.browser.msie)a.bind("resize",function(){c.onFontResize.trigger(a[0].offsetWidth/100)});else{var b=a[0].contentWindow||a[0].contentDocument||a[0].document;b=b.document||b;b.open();b.write('<div id="em" style="width:100em;height:10px;"></div>');b.write('<script>window.onload = function(){var em = document.getElementById("em");window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};<\/script>');
b.close()}});return{trigger:function(a){c(document).trigger("fontresize",[a])}}}(jQuery);

function set_equal_height(columns) {
 var tallest_column = 0;
 columns.each(

   function() {
     current_height = $(this).height();
     if(current_height > tallest_column) {
       tallest_column  = current_height;
     }
   });

 columns.height(tallest_column);
 // columns.css("min-height",tallest_column);
 }

$(window).load(function() {
  $(".equalize_js").each(function () {
    set_equal_height($(this).find(".box"));
  });
});

$(document).bind("fontresize", function() {
  $(".equalize_js").each(function () {
    $(this).find(".box").removeAttr("style");
    set_equal_height($(this).find(".box"));
  });
});