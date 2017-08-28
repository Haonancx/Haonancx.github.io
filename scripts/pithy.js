﻿$(function() {
	$(".gotopBox").hide();
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
		var pagelink = "<br /><br />作者: FSUX<br />链接: <a href='" + url + "'>" + url + "</a>" + "<br />来源:FSUX.ME<br />著作权归 FSUX 网站所有,商业转载请联系作者获得授权,非商业转载请注明出处。";
		var copy_text = selection + pagelink;
		var new_div = document.createElement("div");
		new_div.style.left = "-99999px";
		new_div.style.position = "absolute";
		body_element.appendChild(new_div);
		new_div.innerHTML = copy_text;
		selection.selectAllChildren(new_div);
		window.setTimeout(function() {
			body_element.removeChild(new_div)
		}, 0)
	}
	document.body.oncopy = addLink;
	$(".octicon").click(function() {
		$this = $(this);
		var selectedTags = $this.html();
		$(".category").each(function() {
			_this = $(this);
			var searchTags = _this.html();
			if (selectedTags == searchTags) {
				var scrollTop = _this.offset().top - 50;
				$("html, body").animate({
					scrollTop: scrollTop
				}, 500)
			}
		})
	});

	$(".gotopBox").click(function() {
		jQuery("html,body").animate({
			scrollTop: 0
		}, 100)
	}), $(window).scroll(function() {
		$(this).scrollTop() > 300 ? $(".gotopBox").fadeIn("fast") : $(".gotopBox").stop().fadeOut("fast")
	});
	$(".RewardBtn a").click(function() {
		$(".rewardContent").toggle(500)
	});
	$(".well h2").click(function() {
		$this = $(this);
		$next = $this.next("ul");
		var statusYear = $next.css("display");
		if (statusYear == "none" || statusYear == "undefined") {
			$next.slideDown()
		} else {
			$next.slideUp()
		}
	});

	$(".awardBtn span").click(function() {
		$(".awardContent").slideToggle()
	});
});