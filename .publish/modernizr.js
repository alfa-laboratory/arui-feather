"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (window) {
  if (window) {
    /*! modernizr 3.3.1 (Custom Build) | MIT *
    * http://modernizr.com/download/?-inputtypes-pointerevents-touchevents !*/
    !function (e, t, n) {
      function o(e, t) {
        return (typeof e === "undefined" ? "undefined" : _typeof(e)) === t;
      }function i() {
        var e, t, n, i, s, r, a;for (var d in l) {
          if (l.hasOwnProperty(d)) {
            if (e = [], t = l[d], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) {
              e.push(t.options.aliases[n].toLowerCase());
            }for (i = o(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) {
              r = e[s], a = r.split("."), 1 === a.length ? Modernizr[a[0]] = i : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = i), u.push((i ? "" : "no-") + a.join("-"));
            }
          }
        }
      }function s() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : p ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
      }function r() {
        var e = t.body;return e || (e = s(p ? "svg" : "body"), e.fake = !0), e;
      }function a(e, n, o, i) {
        var a,
            l,
            d,
            u,
            p = "modernizr",
            c = s("div"),
            h = r();if (parseInt(o, 10)) for (; o--;) {
          d = s("div"), d.id = i ? i[o] : p + (o + 1), c.appendChild(d);
        }return a = s("style"), a.type = "text/css", a.id = "s" + p, (h.fake ? h : c).appendChild(a), h.appendChild(c), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(t.createTextNode(e)), c.id = p, h.fake && (h.style.background = "", h.style.overflow = "hidden", u = f.style.overflow, f.style.overflow = "hidden", f.appendChild(h)), l = n(c, e), h.fake ? (h.parentNode.removeChild(h), f.style.overflow = u, f.offsetHeight) : c.parentNode.removeChild(c), !!l;
      }var l = [],
          d = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, t) {
          var n = this;setTimeout(function () {
            t(n[e]);
          }, 0);
        }, addTest: function addTest(e, t, n) {
          l.push({ name: e, fn: t, options: n });
        }, addAsyncTest: function addAsyncTest(e) {
          l.push({ name: null, fn: e });
        } },
          Modernizr = function Modernizr() {};Modernizr.prototype = d, Modernizr = new Modernizr();var u = [],
          f = t.documentElement,
          p = "svg" === f.nodeName.toLowerCase(),
          c = s("input"),
          h = "search tel url email datetime date month week time datetime-local number range color".split(" "),
          m = {};Modernizr.inputtypes = function (e) {
        for (var o, i, s, r = e.length, a = "1)", l = 0; r > l; l++) {
          c.setAttribute("type", o = e[l]), s = "text" !== c.type && "style" in c, s && (c.value = a, c.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(o) && c.style.WebkitAppearance !== n ? (f.appendChild(c), i = t.defaultView, s = i.getComputedStyle && "textfield" !== i.getComputedStyle(c, null).WebkitAppearance && 0 !== c.offsetHeight, f.removeChild(c)) : /^(search|tel)$/.test(o) || (s = /^(url|email)$/.test(o) ? c.checkValidity && c.checkValidity() === !1 : c.value != a)), m[e[l]] = !!s;
        }return m;
      }(h);var v = "Moz O ms Webkit",
          y = d._config.usePrefixes ? v.toLowerCase().split(" ") : [];d._domPrefixes = y;var g = function () {
        function e(e, t) {
          var i;return e ? (t && "string" != typeof t || (t = s(t || "div")), e = "on" + e, i = e in t, !i && o && (t.setAttribute || (t = s("div")), t.setAttribute(e, ""), i = "function" == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), i) : !1;
        }var o = !("onblur" in t.documentElement);return e;
      }();d.hasEvent = g, Modernizr.addTest("pointerevents", function () {
        var e = !1,
            t = y.length;for (e = Modernizr.hasEvent("pointerdown"); t-- && !e;) {
          g(y[t] + "pointerdown") && (e = !0);
        }return e;
      });var w = d._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];d._prefixes = w;var b = d.testStyles = a;Modernizr.addTest("touchevents", function () {
        var n;if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;else {
          var o = ["@media (", w.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");b(o, function (e) {
            n = 9 === e.offsetTop;
          });
        }return n;
      }), i(), delete d.addTest, delete d.addAsyncTest;for (var C = 0; C < Modernizr._q.length; C++) {
        Modernizr._q[C]();
      }e.Modernizr = Modernizr;
    }(window, document);
    module.exports = window.Modernizr;
  } else {
    module.exports = {};
  }
})(typeof window !== 'undefined' ? window : false);
//# sourceMappingURL=modernizr.js.map
