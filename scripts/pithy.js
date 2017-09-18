﻿  $(function() {
    var url = document.location.href;

    function addLink(msg) {
      var body_element = document.getElementsByTagName("body")[0];
      var selection;
      if (window.getSelection) {
        selection = window.getSelection()
      } else {
        if (document.getSelection) {
          selection = document.getSelection()
        } else {
          if (document.selection) {
            selection = document.selection.createRange().text
          } else {
            selection = ""
          }
        }
      }
      var pagelink = "<br /><br />作者: RenChao Guan<br />链接: <a href='" + url + "'>" + url + "</a>" + "<br />来源:FSUX.ME<br />著作权归 FSUX 网站所有,商业转载请联系作者获得授权,非商业转载请注明出处。";
      var copy_text = selection + pagelink;
      var new_div = document.createElement("div");
      new_div.style.left = "-99999px";
      new_div.style.position = "absolute";
      body_element.appendChild(new_div);
      new_div.innerHTML = copy_text;
      selection.selectAllChildren(new_div);
      window.setTimeout(function() {
          body_element.removeChild(new_div)
        },
        0)
    }
    document.body.oncopy = addLink;
    $(".gotopBox").click(function() {
        jQuery("html,body").animate({
            scrollTop: 0
          },
          100)
      }),

      $.getJSON("/scripts/travel.json").done(function(data) {
        console.log(data)

      });

    $(window).scroll(function() {
      $(this).scrollTop() > 300 ? $(".gotopBox").css("opacity", "1") : $(".gotopBox").css("opacity", "0")
    });
  })