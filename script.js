/* begin Page */
/* Created by Artisteer v3.1.0.56360 */
// css helper
(function($) {
    var data = [
        {str:navigator.userAgent,sub:'Chrome',ver:'Chrome',name:'chrome'},
        {str:navigator.vendor,sub:'Apple',ver:'Version',name:'safari'},
        {prop:window.opera,ver:'Opera',name:'opera'},
        {str:navigator.userAgent,sub:'Firefox',ver:'Firefox',name:'firefox'},
        {str:navigator.userAgent,sub:'MSIE',ver:'MSIE',name:'ie'}];
    for (var n=0;n<data.length;n++)	{
        if ((data[n].str && (data[n].str.indexOf(data[n].sub) != -1)) || data[n].prop) {
            var v = function(s){var i=s.indexOf(data[n].ver);return (i!=-1)?parseInt(s.substring(i+data[n].ver.length+1)):'';};
            $('html').addClass(data[n].name+' '+data[n].name+v(navigator.userAgent) || v(navigator.appVersion)); break;			
        }
    }
})(jQuery);
/* end Page */

/* begin Menu */
jQuery(function () {
    if (!jQuery.browser.msie || parseInt(jQuery.browser.version) > 7) return;
    jQuery('ul.blndr_hmenu>li:not(:first-child)').each(function () { jQuery(this).prepend('<span class="blndr_hmenu-separator"> </span>'); });
    if (!jQuery.browser.msie || parseInt(jQuery.browser.version) > 6) return;
    jQuery('ul.blndr_hmenu li').each(function () {
        this.j = jQuery(this);
        this.UL = this.j.children('ul:first');
        if (this.UL.length == 0) return;
        this.A = this.j.children('a:first');
        this.onmouseenter = function () {
            this.j.addClass('blndr_hmenuhover');
            this.UL.addClass('blndr_hmenuhoverUL');
            this.A.addClass('blndr_hmenuhoverA');
        };
        this.onmouseleave = function() {
            this.j.removeClass('blndr_hmenuhover');
            this.UL.removeClass('blndr_hmenuhoverUL');
            this.A.removeClass('blndr_hmenuhoverA');
        };
    });
});

jQuery(function() { setHMenuOpenDirection({container: "div.blndr_sheet-body", defaultContainer: "#blndr_main", menuClass: "blndr_hmenu", leftToRightClass: "blndr_hmenu-left-to-right", rightToLeftClass: "blndr_hmenu-right-to-left"}); });

function setHMenuOpenDirection(menuInfo) {
    var defaultContainer = jQuery(menuInfo.defaultContainer);
    defaultContainer = defaultContainer.length > 0 ? defaultContainer = jQuery(defaultContainer[0]) : null;

    jQuery("ul." + menuInfo.menuClass + ">li>ul").each(function () {
        var submenu = jQuery(this);
        var submenuWidth = submenu.outerWidth();
        var submenuLeft = submenu.offset().left;

        var mainContainer = submenu.parents(menuInfo.container);
        mainContainer = mainContainer.length > 0 ? mainContainer = jQuery(mainContainer[0]) : null;

        var container = mainContainer || defaultContainer;
        if (container != null) {
            var containerLeft = container.offset().left;
            var containerWidth = container.outerWidth();

            if (submenuLeft + submenuWidth >=
                    containerLeft + containerWidth) 
                /* right to left */
                submenu.addClass(menuInfo.rightToLeftClass).find("ul").addClass(menuInfo.rightToLeftClass);
            if (submenuLeft <= containerLeft)
                /* left to right */
                submenu.addClass(menuInfo.leftToRightClass).find("ul").addClass(menuInfo.leftToRightClass);
        }
    });
}

jQuery(function ($) {
    $("ul.blndr_hmenu a:not([href])").attr('href', '#').click(function (e) { e.preventDefault(); });
});
/* end Menu */

/* begin MenuSubItem */

jQuery(function () {
    if (!jQuery.browser.msie) return;
    var ieVersion = parseInt(jQuery.browser.version);
    if (ieVersion > 7) return;

    /* Fix width of submenu items.
    * The width of submenu item calculated incorrectly in IE6-7. IE6 has wider items, IE7 display items like stairs.
    */
    jQuery.each(jQuery("ul.blndr_hmenu ul"), function () {
        var maxSubitemWidth = 0;
        var submenu = jQuery(this);
        var subitem = null;
        jQuery.each(submenu.children("li").children("a"), function () {
            subitem = jQuery(this);
            var subitemWidth = subitem.outerWidth();
            if (maxSubitemWidth < subitemWidth)
                maxSubitemWidth = subitemWidth;
        });
        if (subitem != null) {
            var subitemBorderLeft = parseInt(subitem.css("border-left-width"), 10) || 0;
            var subitemBorderRight = parseInt(subitem.css("border-right-width"), 10) || 0;
            var subitemPaddingLeft = parseInt(subitem.css("padding-left"), 10) || 0;
            var subitemPaddingRight = parseInt(subitem.css("padding-right"), 10) || 0;
            maxSubitemWidth -= subitemBorderLeft + subitemBorderRight + subitemPaddingLeft + subitemPaddingRight;
            submenu.children("li").children("a").css("width", maxSubitemWidth + "px");
        }
    });

    if (ieVersion > 6) return;
    jQuery("ul.blndr_hmenu ul>li:first-child>a").css("border-top-width", "0px");
});
/* end MenuSubItem */

/* begin Layout */
jQuery(function () {
    jQuery(window).bind('resize', function () {
        var bh = jQuery('body').height();
        var mh = 0;

        jQuery('#blndr_main').children().each(function() {
            if (jQuery(this).css('position') != 'absolute')
                mh += jQuery(this).outerHeight(true);
        });

        if (mh < bh)
        {
            var r = bh - mh;
            var c = jQuery('div.blndr_content');
            c.css('height', (c.outerHeight(true) + r) + 'px');
        }
    });

    if (jQuery.browser.msie && parseInt(jQuery.browser.version) < 8) {
        jQuery(window).bind('resize', function() {
            var c = $('div.blndr_content');
            var s = c.parent().children('.blndr_layout-cell:not(.blndr_content)');
            var w = 0;
            c.hide();
            s.each(function() { w += this.clientWidth; });
            c.w = c.parent().width(); c.css('width', c.w - w + 'px');
            c.show();
        });
    }

    jQuery(window).trigger('resize');
});
/* end Layout */

/* begin Button */
function artButtonSetup(className) {
    jQuery.each(jQuery("a." + className + ", button." + className + ", input." + className), function (i, val) {
        var b = jQuery(val);
        if (!b.parent().hasClass('blndr_button-wrapper')) {
            if (b.is('input')) b.val(b.val().replace(/^\s*/, '')).css('zoom', '1');
            if (!b.hasClass('blndr_button')) b.addClass('blndr_button');
            jQuery("<span class='blndr_button-wrapper'><span class='blndr_button-l'> </span><span class='blndr_button-r'> </span></span>").insertBefore(b).append(b);
            if (b.hasClass('active')) b.parent().addClass('active');
        }
        b.mouseover(function () { jQuery(this).parent().addClass("hover"); });
        b.mouseout(function () { var b = jQuery(this); b.parent().removeClass("hover"); if (!b.hasClass('active')) b.parent().removeClass('active'); });
        b.mousedown(function () { var b = jQuery(this); b.parent().removeClass("hover"); if (!b.hasClass('active')) b.parent().addClass('active'); });
        b.mouseup(function () { var b = jQuery(this); if (!b.hasClass('active')) b.parent().removeClass('active'); });
    });
}
jQuery(function() { artButtonSetup("blndr_button"); });

/* end Button */

/* begin VMenu */
jQuery(function() {
    if (!jQuery('html').hasClass('ie7')) return;
    jQuery('ul.blndr_vmenu li:not(:first-child),ul.blndr_vmenu li li li:first-child,ul.blndr_vmenu>li>ul').each(function () { jQuery(this).append('<div class="blndr_vmenu-separator"> </div><div class="blndr_vmenu-separator-bg"> </div>'); });
});


/* end VMenu */

/* begin VMenuItem */


jQuery(function() {
    jQuery('ul.blndr_vmenu a').click(function () {
        var a = jQuery(this);
        a.parents('ul.blndr_vmenu').find("ul, a").removeClass('active');
        a.parent().children('ul').addClass('active');
        a.parents('ul.blndr_vmenu ul').addClass('active');
        a.parents('ul.blndr_vmenu li').children('a').addClass('active');
    });
});
/* end VMenuItem */



