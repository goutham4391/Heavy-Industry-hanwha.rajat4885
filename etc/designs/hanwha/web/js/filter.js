/*! * UTIL-CLASS */
(function() {
    var a = false,
        b = /xyz/.test(function() {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.Class = function() {};
    Class.extend = function(g) {
        var f = this.prototype;
        a = true;
        var e = new this();
        a = false;
        for (var d in g) {
            e[d] = typeof g[d] == "function" && typeof f[d] == "function" && b.test(g[d]) ? (function(h, i) {
                return function() {
                    var k = this._super;
                    this._super = f[h];
                    var j = i.apply(this, arguments);
                    this._super = k;
                    return j
                }
            })(d, g[d]) : g[d]
        }

        function c() {
            if (!a && this.init) {
                this.init.apply(this, arguments)
            }
        }
        c.prototype = e;
        c.prototype.constructor = c;
        c.extend = arguments.callee;
        return c
    }
})();

/*! * Common */
var _common = {
    _ui: {
        manager: null,
        iscomplete: false
    },
    _mode: null,
    _isRTL: $("html").hasClass("rtl"),
    _document_width: $(window).width(),
    init: function() {
        this.init_ui();
    },
    init_ui: function() {
        if (this._ui.manager == null) {
            var a = this;
            a._ui.manager = new UIManager();
        }
    }
};
$(document).ready(function() {
    _common.init();
});

/*! * @class	{Class} UIManager */
var UIManager = Class.extend({
    init: function() {
        this.reinit()
    },
    reinit: function(a) {
        switch (String(a).toUpperCase()) {
            default:
                this.init_filter();
                break
        }
    },
    init_filter: function() {
        $("*[data-role=ui-filter-list]").each(function(b) {
            $(this).data("filter", new FilterUI($(this)))
        })
    }
});
/*! * @class	{Class} CommonUI */
var CommonUI = Class.extend({
    init: function() {
        throw new Error("must be implemented by subclass!")
    },
    show: function(b, a) {}
});

/*! * @class	{Class} FilterUI */
var FilterUI = CommonUI.extend({
    init: function(a) {
        this._scope = a;
        this._container = null;
        this._content = null;
        this._result = null;
        this._area = null;
        this._mscope = $("*[data-role=ui-mfilter-list]");
        this._mcontent = null;
        this._mmenu = null;
        this._transition = {
            bool: false,
            sec: 300,
            open: false
        };
        this._margin_desktop = ["/business/insight"];
        this._margin_mobile = ["/business/partnerlocator"];
        this.reinit()
    },
    reinit: function() {
        this.build_container();
        this.build_content();
        this.build_event()
    },
    build_container: function() {
        var a = this;
        var b = $(a._scope).find("*[data-role=ui-filter-container]");
        a._container = b
    },
    build_content: function() {
        var b = this;
        var d = $(this._scope).find("*[data-role=ui-filter-content]");
        this._content = d;
        var a = $(this._scope).find("*[data-role=ui-filter-result]");
        this._result = a;
        var c = $(this._content).find("*[data-role=ui-filter-area]");
        this._area = c;
        c.find(">strong").first().text($(this._content).find("*[data-role=ui-filter-menu]").find("li").first().find(">a").text());
        $(this._content).find("*[data-role=ui-filter-menu]").find("li").each(function(f) {
            $(this).unbind().bind({
                click: function() {
					if ( $(this).hasClass("glance") || $(this).hasClass("newletter") )
					{
						$(".filter-content").hide();
					}
					else
					{
						$(".filter-content").show();
					}
						$this = $(this);
						$this.parent().find("li").removeClass("active");
						$this.addClass("active");
						c.find(">strong").first().text($this.find(">a").text());
						b.build_area(f);
					
                }
            })
        });
        b.match_checkbox($(this._area).find("div"));
        var e = b._scope.find("input[type=checkbox]:checked").length > 0 ? true : false;
        if (e) {
            $("*[data-role=btn-clear-all]").show()
        } else {
            $("*[data-role=btn-clear-all]").hide()
        }
    },
	/* for bibiana tab */
    build_area: function(b) {
        var a = this;
        $(a._content).find("*[data-role=ui-filter-area]>div>ul").each(function(c) {
            if (b === c) {
                $(this).addClass("active").show()
            } else {
                $(this).removeClass("active").hide()
            }
        })
    },
    build_event: function() {
        var a = this;
        var b = 0;
        $(a._area).find("input").each(function(c) {
            if ($(this).is(":checked")) {
                b += 1;
                $(a._area).find(">div>ul").each(function(d) {
                    if ($(this).find("input").is(":checked")) {
                        $("*[data-role=ui-filter-menu]>ul>li").removeClass("active");
                        $("*[data-role=ui-filter-menu]>ul>li:eq(" + d + ")").addClass("active");
                        $(this).show();
                        return false
                    } else {
                        $(this).hide()
                    }
                });
                a.add_item($(this).parent().attr("data-code"))
            } else {
                b += 0
            }
        });
        if (b > 0) {
            $("a[data-role=ui-filter-toggle]").removeClass("link-toggled");
            $(a._content).slideDown(a._transition.sec)
        }
		/*
        $("a[data-role=ui-filter-toggle]").unbind().bind({
            click: function() {
                var c = window.location.pathname;
                if ($(this).hasClass("link-toggled")) {
                    $(this).removeClass("link-toggled");
                    $(a._content).slideDown(a._transition.sec);
                    $.each(a._margin_desktop, function(e, d) {
                        if (window.location.pathname.indexOf(d) > -1) {
                            $(".filter-by-area.desktop-area").css("margin-bottom", "60px")
                        }
                    })
                } else {
                    $(this).addClass("link-toggled");
                    $(a._content).slideUp(a._transition.sec);
                    $.each(a._margin_desktop, function(e, d) {
                        if (window.location.pathname.indexOf(d) > -1) {
                            $(".filter-by-area.desktop-area").css("margin-bottom", "30px")
                        }
                    })
                }
                $("*[data-role=ui-layer-close]").trigger("click")
            }
        });
		*/
        $("*[data-role=btn-close-layer]").unbind().bind({
            click: function() {
                var c = $("a[data-role=ui-filter-toggle]");
                c.focus();
                $("a[data-role=ui-filter-toggle]").addClass("link-toggled");
				//alert( $(a._content).children(".filter-content").html() );
                $(a._content).children(".filter-content").slideUp(a._transition.sec);
                //$("*[data-role=ui-mfilter-toggle]").first().addClass("link-toggled");
                //$("*[data-role=ui-mfilter-content]").slideUp(a._transition.sec);
            }
        });
        $("*[data-role=btn-clear-all]").unbind().bind({
            click: function() {
                var c = $("*[data-role=ui-filter-area]").find("input:checkbox:visible:enabled").last();
                c.focus();
                $("*[data-role=ui-filter-area] input[type=checkbox]").each(function() {
                    if (!$(this).prop("disabled") && $(this).attr("value") != "") {
                        $(this).prop("checked", false)
                    }
                });
                $("*[data-role=ui-mfilter-content] input[type=checkbox]").each(function() {
                    if (!$(this).prop("disabled") && $(this).attr("value") != "") {
                        $(this).prop("checked", false)
                    }
                });
                $("*[data-role=ui-filter-result] span").remove();
                $(this).hide();
                if (typeof(changePage) != "undefined") {
                    changePage()
                }
            }
        });
        $("a[data-role=ui-mfilter-toggle]").each(function(c) {
            $(this).unbind().bind({
                click: function() {
                    var d = (c == 0) ? $(a._mscope).find("*[data-role=ui-mfilter-content]") : $(a._mscope).find("*[data-role=ui-mfilter-sort]");
                    var e = window.location.pathname;
                    if ($(this).hasClass("link-toggled")) {
                        $(this).parent().find("*[data-role=ui-mfilter-toggle]").addClass("link-toggled");
                        $(this).removeClass("link-toggled");
                        $(a._mscope).find(">div:not(:eq(0))").hide();
                        $(d).slideDown(a._transition.sec);
                        $.each(a._margin_desktop, function(g, f) {
                            if (window.location.pathname.indexOf(f) > -1) {
                                $("*[data-role=ui-mfilter-list]").css("margin-bottom", "60px")
                            }
                        })
                    } else {
                        $(this).addClass("link-toggled");
                        $(d).slideUp(a._transition.sec);
                        $.each(a._margin_desktop, function(g, f) {
                            if (window.location.pathname.indexOf(f) > -1) {
                                $("*[data-role=ui-mfilter-list]").css("margin-bottom", "30px")
                            }
                        })
                    }
                }
            })
        });
        $("*[data-role=ui-filter-sort]>ul>li").each(function(c) {
            $(this).unbind().bind({
                click: function() {
                    $(this).parent().find("li").removeClass("active");
                    $(this).addClass("active");
                    $("*[data-role=ui-mfilter-sort]>ul>li").removeClass("active");
                    $("*[data-role=ui-mfilter-sort]>ul>li:eq(" + c + ")").addClass("active");
                    $("*[data-role=ui-layer-close]").trigger("click")
                }
            })
        });
        $("*[data-role=ui-mfilter-sort]>ul>li").each(function(d) {
            $(this).unbind().bind({
                click: function() {
                    $(this).parent().find("li").removeClass("active");
                    $(this).addClass("active");
                    $("*[data-role=ui-filter-sort]>ul>li").removeClass("active");
                    $("*[data-role=ui-filter-sort]>ul>li:eq(" + d + ")").addClass("active")
                }
            })
        });
        a.resizeButtons();
    },
    match_checkbox: function(b) {
        var a = this;
        $(b).find(">ul>li").each(function(c) {
            $this_li = $(this);
            $this_li.data("data-code", c).attr("data-code", c);
            $this_li.find(">input[type=checkbox]").unbind().bind({
                click: function(g) {
                    var f = $(this);
                    dataCode = c;
                    f.parent().find(">label").removeClass("inpart");
                    $childs = $("*[data-code=" + c + "]").find("input[type=checkbox]");
                    if (f.is(":checked")) {
                        a.add_item(c);
                        $.each($childs, function() {
                            $child = $(this);
                            if (!$child.prop("disabled")) {
                                $child.prop("checked", true)
                            }
                        });
                        var d = f.attr("data-group-name");
                    } else {
                        a.remove_item(c);
                        $.each($childs, function() {
                            $child = $(this);
                            if (!$child.prop("disabled")) {
                                $child.prop("checked", false)
                            }
                        })
                    }
                    var h = a._scope.find("input[type=checkbox]:checked").length > 0 ? true : false;
                    if (h) {
                        $("*[data-role=btn-clear-all]").show()
                    } else {
                        $("*[data-role=btn-clear-all]").hide()
                    }
                    if (typeof(changePage) != "undefined") {
                        changePage()
                    }
                }
            });
            $(this).find(">ul>li").each(function(d) {
                $(this).attr("data-code", c + "-" + d);
                $(this).find("input[type=checkbox]").unbind().bind({
                    click: function() {
                        dataCode = c + "-" + d;
                        var h = $(this).parent().parent().find("input[type=checkbox]").not(":disabled").length;
                        var e = $(this).parent().parent().find("input[type=checkbox]:checked").length;
                        if (e == 0) {
                            $("*[data-code=" + c + "]").find(">input:first").prop("checked", false);
                            $("*[data-code=" + c + "]").find(">label:first").removeClass("inpart")
                        } else {
                            if (e == h) {
                                $("*[data-code=" + c + "]").find(">input:first").prop("checked", true);
                                $("*[data-code=" + c + "]").find(">label:first").removeClass("inpart")
                            } else {
                                $("*[data-code=" + c + "]").find(">input:first").prop("checked", true);
                                $("*[data-code=" + c + "]").find(">label:first").addClass("inpart")
                            }
                        }
                        var f = $("*[data-code=" + c + "-" + d + "]").find(">input:first");
                        if ($(this).is(":checked")) {
                            if (!f.prop("disabled") && f.attr("value") != "") {
                                f.prop("checked", true);
                                a.add_item(c + "-" + d)
                            }
                        } else {
                            if (!f.prop("disabled") && f.attr("value") != "") {
                                f.prop("checked", false);
                                a.remove_item(c + "-" + d)
                            }
                        }
                        var g = a._scope.find("input[type=checkbox]:checked").length > 0 ? true : false;
                        if (g) {
                            $("*[data-role=btn-clear-all]").show()
                        } else {
                            $("*[data-role=btn-clear-all]").hide()
                        }
                        if (typeof(changePage) != "undefined") {
                            changePage()
                        }
                    }
                })
            })
        })
    },
    add_item: function(e) {
        var a = this;
        var c = $(this._scope).find("li[data-code=" + e + "]");
        var b = "";
        if ($(c).find("ul").length > 0) {
            $(c).find(">ul>li").each(function(f) {
                var g = $(this).find(">input");
                if (!(g.is(":checked"))) {
                    if (!g.prop("disabled")) {
                        b += '<span class="word" data-code="' + e + "-" + f + '">' + $(this).find("label").text() + '<a href="javascript:void(0);" class="btn-close" data-role="btn-close-word"><span class="blind">Close</span></a></span>'
                    }
                }
            })
        } else {
            var d = true;
            a._result.find("span").each(function() {
                if ($(this).data("code") == e) {
                    d = false;
                    return false
                }
            });
            if (d) {
                b += '<span class="word" data-code="' + e + '">' + $(c).find("label").text() + '<a href="javascript:void(0);" class="btn-close" data-role="btn-close-word"><span class="blind">Close</span></a></span>'
            }
        }
        $(a._result).append(b);
        $("*[data-role=btn-close-word]").each(function(f) {
            $(this).unbind().bind({
                click: function() {
                    var k = $("*[data-role=ui-filter-result]").find("a").length;
                    if (k <= 1) {
                        var m = $("*[data-role=ui-filter-area]").find("input:checkbox:visible:enabled").last();
                        m.focus()
                    } else {
                        if (k > 1) {
                            var g = $("*[data-role=ui-filter-result]").find("a").index(this);
                            var h = g * 1 - 1;
                            var l = g * 1 + 1;
                            if (h < 0) {
                                $("*[data-role=ui-filter-result]").find("a").eq(l).focus()
                            } else {
                                $("*[data-role=ui-filter-result]").find("a").eq(h).focus()
                            }
                        }
                    }
                    var j = $(this).parent().attr("data-code");
                    var i = $("li[data-code=" + j + "]");
                    $(i).find(">input").prop("checked", false);
                    if ($(i).parent().find("input").is(":checked")) {
                        $(i).parent().parent().find(">label").addClass("inpart")
                    } else {
                        $(i).parent().parent().find(">input").prop("checked", false)
                    }
                    a.remove_item(j);
                    var n = a._scope.find("input[type=checkbox]:checked").length > 0 ? true : false;
                    if (n) {
                        $("*[data-role=btn-clear-all]").show()
                    } else {
                        $("*[data-role=btn-clear-all]").hide()
                    }
                    if (typeof(changePage) != "undefined") {
                        changePage()
                    }
                    return false
                }
            })
        })
    },
    remove_item: function(c) {
        var a = this;
        var b = $(a._scope).find("li[data-code=" + c + "]");
        if ($(b).find(">ul").length > 0) {
            $(b).find(">ul>li").each(function(d) {
                $(a._result).find("span[data-code=" + c + "-" + d + "]").remove()
            })
        } else {
            $(a._result).find("span[data-code=" + c + "]").remove()
        }
    },
    resizeButtons: function() {
        var a = this;
        var c = 0;
        var b = a._mscope.find("*[data-role=ui-mfilter-toggle]");
        b.each(function() {
            $(this).css("height", "")
        });
        b.each(function() {
            var d = $(this).outerHeight();
            if (c < d) {
                c = d
            }
        });
        b.each(function() {
            $(this).css("height", c)
        })
    }
});

/* add20161126 */
function category_search() {
    var category = $("#choose_category").data("key");
    nlPageNum = 1;
    nlCate = category == "All"? "" : category;
    $("#newsList > ul").empty();
    loadNewsletter();
}
/* //add20161126 */

/* add20161117 */
$(document).ready(function(){

 /*   $(".uiCheckbox_wrap").each(function(){
		$(this).find("input").prop("checked", false);
		$(this).attr("aria-checked", false);
		$(this).removeClass("checked");
	})*/

	initContent(cate);
	
	if(naCate!=""){
		$(this).find("input").prop("checked", false);
		$(this).attr("aria-checked", false);
		$(this).removeClass("checked");
		if(naCate == "glance"){
			$(".ico1").removeClass("active");
			$("#"+naCate).addClass("active"); 
			changeCate(naCate);
		}else{
			$(".ico1").removeClass("active");
			$("#"+naCate).addClass("active");
			if ( naCate == "rnd_story" ) {
				changeCate(naCate);
			}
			changeType(naCate); 
		}
		naCate="";
	}else if(indsCate!=""){
		tabType="";
		$(".uiCheckbox_wrap").each(function(){
			if($(this).find("input").val()==indsCate){
				$(this).addClass("checked").attr("aria-checked", true);
				$(this).find("input").prop("checked", true);
				$("#"+indsCate).show();
			}else{
				$(this).find("input").prop("checked", false);
				$(this).attr("aria-checked", false);
				$(this).removeClass("checked");
			}
		})
		filter();
	}else{
		$(this).find("input").prop("checked", false);
		$(this).attr("aria-checked", false);
		$(this).removeClass("checked");
	}
	
	if (cate == "newsletter") {
		$("#newsList > ul").empty();
		loadNewsletter();
	} else if (cate == "glance"){
		$("#newsList > ul").empty();
		$("#hanwhaataglance").load("/content/hanwha/"+lang+"/news_and_media/ifr-hanwha-at-a-glance.html .mNewRoom", function() {
			if(isMobile){
				playVideo();
			} else {
				layerSports();
			}
		});
	} else{
		filter();
	}

	$("#p-twodepth01all").click(function(){
		var chk = $(this).is(":checked");
		if(chk) $("#industryChk input").prop('checked', true);
		else  $("#industryChk input").prop('checked', false);
	});
	$("#p-twodepth02all").click(function(){
		var chk = $(this).is(":checked");
		if(chk) $("#affiliatesChk input").prop('checked', true);
		else  $("#affiliatesChk input").prop('checked', false);
	});
	$("#p-twodepth03all").click(function(){
		var chk = $(this).is(":checked");
		if(chk) $("#typeChk input").prop('checked', true);
		else  $("#typeChk input").prop('checked', false);
	});
	
	$(".filter-content li input[type=checkbox]").each(function(){
		$(this).click(function(){
			oneCheckFunc( $(this), $(this).parent().parent().children("li").eq(0).children().attr("id") );
		});
	});
	/* 체크박스 체크시 전체선택 체크 여부 */
	function oneCheckFunc( obj, allName )
	{
		//alert(allName);
		var allObj = $("#"+allName);
		var objName = $(obj).attr("name");

		if( $(obj).prop("checked") )
		{
			checkBoxLength = $("[name="+ objName +"]").length;
			checkedLength = $("[name="+ objName +"]:checked").length;

			if( checkBoxLength == checkedLength ) {
				allObj.prop("checked", true);
			} else {
				allObj.prop("checked", false);
			}
		}
		else
		{
			allObj.prop("checked", false);
		}

		filter();
	}
});
/* //add20161117 */
