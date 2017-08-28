! function(a, b) {
	"undefined" != typeof module && module.exports ? module.exports = b(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], function(a) {
		return b(a)
	}) : b(a.jQuery)
}(this, function(a) {
	var b = function(b, c) {
		this.$element = a(b), this.options = a.extend({}, a.fn.typeahead.defaults, c), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.select = this.options.select || this.select, this.autoSelect = "boolean" == typeof this.options.autoSelect ? this.options.autoSelect : !0, this.highlighter = this.options.highlighter || this.highlighter, this.render = this.options.render || this.render, this.updater = this.options.updater || this.updater, this.displayText = this.options.displayText || this.displayText, this.source = this.options.source, this.delay = this.options.delay, this.$menu = a(this.options.menu), this.$appendTo = this.options.appendTo ? a(this.options.appendTo) : null, this.shown = !1, this.listen(), this.showHintOnFocus = "boolean" == typeof this.options.showHintOnFocus ? this.options.showHintOnFocus : !1, this.afterSelect = this.options.afterSelect, this.addItem = !1
	};
	b.prototype = {
		constructor: b,
		select: function() {
			var a = this.$menu.find(".active").data("value");
			if (this.$element.data("active", a), this.autoSelect || a) {
				var b = this.updater(a);
				this.$element.val(this.displayText(b) || b).change(), this.afterSelect(b)
			}
			return this.hide()
		},
		updater: function(a) {
			return a
		},
		setSource: function(a) {
			this.source = a
		},
		show: function() {
			var b, c = a.extend({}, this.$element.position(), {
				height: this.$element[0].offsetHeight
			});
			return b = "function" == typeof this.options.scrollHeight ? this.options.scrollHeight.call() : this.options.scrollHeight, (this.$appendTo ? this.$menu.appendTo(this.$appendTo) : this.$menu.insertAfter(this.$element)).css({
				top: c.top + c.height + b
			}).show(), this.shown = !0, this
		},
		hide: function() {
			return this.$menu.hide(), this.shown = !1, this
		},
		lookup: function(b) {
			if (this.query = "undefined" != typeof b && null !== b ? b : this.$element.val() || "", this.query.length < this.options.minLength) {
				return this.shown ? this.hide() : this
			}
			var c = a.proxy(function() {
				a.isFunction(this.source) ? this.source(this.query, a.proxy(this.process, this)) : this.source && this.process(this.source)
			}, this);
			clearTimeout(this.lookupWorker), this.lookupWorker = setTimeout(c, this.delay)
		},
		process: function(b) {
			var c = this;
			return b = a.grep(b, function(a) {
				return c.matcher(a)
			}), b = this.sorter(b), b.length || this.options.addItem ? (b.length > 0 ? this.$element.data("active", b[0]) : this.$element.data("active", null), this.options.addItem && b.push(this.options.addItem), "all" == this.options.items ? this.render(b).show() : this.render(b.slice(0, this.options.items)).show()) : this.shown ? this.hide() : this
		},
		matcher: function(a) {
			var b = this.displayText(a);
			return ~b.toLowerCase().indexOf(this.query.toLowerCase())
		},
		sorter: function(a) {
			for (var b, c = [], d = [], e = []; b = a.shift();) {
				var f = this.displayText(b);
				f.toLowerCase().indexOf(this.query.toLowerCase()) ? ~f.indexOf(this.query) ? d.push(b) : e.push(b) : c.push(b)
			}
			return c.concat(d, e)
		},
		highlighter: function(b) {
			var c, d, e, f, g, h = a("<div></div>"),
				i = this.query,
				j = b.toLowerCase().indexOf(i.toLowerCase());
			if (c = i.length, 0 === c) {
				return h.text(b).html()
			}
			for (; j > -1;) {
				d = b.substr(0, j), e = b.substr(j, c), f = b.substr(j + c), g = a("<strong></strong>").text(e), h.append(document.createTextNode(d)).append(g), b = f, j = b.toLowerCase().indexOf(i.toLowerCase())
			}
			return h.append(document.createTextNode(b)).html()
		},
		render: function(b) {
			var c = this,
				d = this,
				e = !1;
			return b = a(b).map(function(b, f) {
				var g = d.displayText(f);
				return b = a(c.options.item).data("value", f), b.find("a").html(c.highlighter(g)), g == d.$element.val() && (b.addClass("active"), d.$element.data("active", f), e = !0), b[0]
			}), this.autoSelect && !e && (b.first().addClass("active"), this.$element.data("active", b.first().data("value"))), this.$menu.html(b), this
		},
		displayText: function(a) {
			return a.name || a
		},
		next: function() {
			var b = this.$menu.find(".active").removeClass("active"),
				c = b.next();
			c.length || (c = a(this.$menu.find("li")[0])), c.addClass("active")
		},
		prev: function() {
			var a = this.$menu.find(".active").removeClass("active"),
				b = a.prev();
			b.length || (b = this.$menu.find("li").last()), b.addClass("active")
		},
		listen: function() {
			this.$element.on("focus", a.proxy(this.focus, this)).on("blur", a.proxy(this.blur, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", a.proxy(this.keydown, this)), this.$menu.on("click", a.proxy(this.click, this)).on("mouseenter", "li", a.proxy(this.mouseenter, this)).on("mouseleave", "li", a.proxy(this.mouseleave, this))
		},
		destroy: function() {
			this.$element.data("typeahead", null), this.$element.data("active", null), this.$element.off("focus").off("blur").off("keypress").off("keyup"), this.eventSupported("keydown") && this.$element.off("keydown"), this.$menu.remove()
		},
		eventSupported: function(a) {
			var b = a in this.$element;
			return b || (this.$element.setAttribute(a, "return;"), b = "function" == typeof this.$element[a]), b
		},
		move: function(a) {
			if (this.shown) {
				switch (a.keyCode) {
					case 9:
					case 13:
					case 27:
						a.preventDefault();
						break;
					case 38:
						if (a.shiftKey) {
							return
						}
						a.preventDefault(), this.prev();
						break;
					case 40:
						if (a.shiftKey) {
							return
						}
						a.preventDefault(), this.next()
				}
				a.stopPropagation()
			}
		},
		keydown: function(b) {
			this.suppressKeyPressRepeat = ~a.inArray(b.keyCode, [40, 38, 9, 13, 27]), this.shown || 40 != b.keyCode ? this.move(b) : this.lookup()
		},
		keypress: function(a) {
			this.suppressKeyPressRepeat || this.move(a)
		},
		keyup: function(a) {
			switch (a.keyCode) {
				case 40:
				case 38:
				case 16:
				case 17:
				case 18:
					break;
				case 9:
				case 13:
					if (!this.shown) {
						return
					}
					this.select();
					break;
				case 27:
					if (!this.shown) {
						return
					}
					this.hide();
					break;
				default:
					this.lookup()
			}
			a.stopPropagation(), a.preventDefault()
		},
		focus: function() {
			this.focused || (this.focused = !0, this.options.showHintOnFocus && this.lookup(""))
		},
		blur: function() {
			this.focused = !1, !this.mousedover && this.shown && this.hide()
		},
		click: function(a) {
			a.stopPropagation(), a.preventDefault(), this.select(), this.$element.focus()
		},
		mouseenter: function(b) {
			this.mousedover = !0, this.$menu.find(".active").removeClass("active"), a(b.currentTarget).addClass("active")
		},
		mouseleave: function() {
			this.mousedover = !1, !this.focused && this.shown && this.hide()
		}
	};
	var c = a.fn.typeahead;
	a.fn.typeahead = function(c) {
		var d = arguments;
		return "string" == typeof c && "getActive" == c ? this.data("active") : this.each(function() {
			var e = a(this),
				f = e.data("typeahead"),
				g = "object" == typeof c && c;
			f || e.data("typeahead", f = new b(this, g)), "string" == typeof c && (d.length > 1 ? f[c].apply(f, Array.prototype.slice.call(d, 1)) : f[c]())
		})
	}, a.fn.typeahead.defaults = {
		source: [],
		items: 8,
		menu: '<ul class="typeahead dropdown-menu" role="listbox"></ul>',
		item: '<li><a href="#" role="option"></a></li>',
		minLength: 1,
		scrollHeight: 0,
		autoSelect: !0,
		afterSelect: a.noop,
		delay: 0,
		addItem: !1
	}, a.fn.typeahead.Constructor = b, a.fn.typeahead.noConflict = function() {
		return a.fn.typeahead = c, this
	}, a(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function() {
		var b = a(this);
		b.data("typeahead") || b.typeahead(b.data())
	})
});
$(function() {
	$(".gotopBox").hide();
	var url = document.location.href;
	if (!window.sessionStorage) {
		alert("浏览器不支持sessionStorage")
	} else {
		var storage = window.sessionStorage;
		var value = sessionStorage.getItem("globalColor");
		$(".globalColor").css("background", value);
		if (value == "#fff" || value == null) {
			$(".icon-eye").removeClass("icon-eyes-active")
		} else {
			$(".icon-eye").addClass("icon-eyes-active")
		}
	}

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

	function statusFn() {
		var status = $(".nav").css("bottom");
		if (status == "0px") {
			$(".nav").animate({
				bottom: "-100%"
			}, "300");
			$(".nav-bg").delay(400).hide(0)
		} else {
			$(".nav").animate({
				bottom: "0px"
			}, "100");
			$(".nav-bg").show(0)
		}
	}

	function noticeAnimate(msg) {
		$(".notice-banner span").html(msg);
		$(".notice-banner").animate({
			top: "0"
		}, "10");
		setTimeout(function() {
			$(".notice-banner").animate({
				top: "-45px"
			}, "10")
		}, 3000)
	}
	$(".navbar-toggle,.nav-bg,.closeTool").click(function() {
		statusFn()
	});
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
	$(".eye-pro").click(function() {
		var storage = window.sessionStorage;
		var currColor = sessionStorage.getItem("globalColor");
		if (currColor == "#f7f7f7" || currColor == null) {
			storage.setItem("globalColor", "#f5f5d5");
			$(".icon-eye").addClass("icon-eyes-active");
			noticeAnimate("护眼模式开启")
		} else {
			storage.setItem("globalColor", "#f7f7f7");
			$(".icon-eye").removeClass("icon-eyes-active");
			noticeAnimate("护眼模式关闭")
		}
		var value = sessionStorage.getItem("globalColor");
		$(".globalColor").css("background", value);
		statusFn()
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
	var time1 = 0;
	var show = false;
	var names = new Array();
	var urls = new Array();
	$("#cb-search-btn").click(function() {
		statusFn();
		$(".cb-search-tool").css("display", "block");
		show = true;
		$("#cb-search-content").val("");
		$("#cb-search-content").focus();
		time1 = 0
	});
	$("#cb-close-btn").click(function() {
		$(".cb-search-tool").css("display", "none");
		show = false;
		time1 = 0
	});
	$(".awardBtn span").click(function() {
		$(".awardContent").slideToggle()
	});
	$.getJSON("/scripts/cb-search.json").done(function(data) {
		if (data.code == 0) {
			for (var index in data.data) {
				var item = data.data[index];
				names.push(item.title);
				urls.push(item.url)
			}
			$("#cb-search-content").typeahead({
				source: names,
				afterSelect: function(item) {
					$(".cb-search-tool").css("display", "none");
					show = false;
					window.location.href = (urls[names.indexOf(item)]);
					return item
				}
			})
		}
	})
});