var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
                var c, d, e, f, g = function() {
                        a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
                    },
                    h = _gsScope._gsDefine.globals,
                    i = {},
                    j = g.prototype = new a("css");
                j.constructor = g, g.version = "1.18.0", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
                };
                var k, l, m, n, o, p, q = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    r = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    s = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    t = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    u = /(?:\d|\-|\+|=|#|\.)*/g,
                    v = /opacity *= *([^)]*)/i,
                    w = /opacity:([^;]*)/i,
                    x = /alpha\(opacity *=.+?\)/i,
                    y = /^(rgb|hsl)/,
                    z = /([A-Z])/g,
                    A = /-([a-z])/gi,
                    B = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    C = function(a, b) {
                        return b.toUpperCase()
                    },
                    D = /(?:Left|Right|Width)/i,
                    E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    F = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    G = /,(?=[^\)]*(?:\(|$))/gi,
                    H = Math.PI / 180,
                    I = 180 / Math.PI,
                    J = {},
                    K = document,
                    L = function(a) {
                        return K.createElementNS ? K.createElementNS("http://www.w3.org/1999/xhtml", a) : K.createElement(a)
                    },
                    M = L("div"),
                    N = L("img"),
                    O = g._internals = {
                        _specialProps: i
                    },
                    P = navigator.userAgent,
                    Q = function() {
                        var a = P.indexOf("Android"),
                            b = L("a");
                        return m = P.indexOf("Safari") !== -1 && P.indexOf("Chrome") === -1 && (a === -1 || Number(P.substr(a + 8, 1)) > 3), o = m && Number(P.substr(P.indexOf("Version/") + 8, 1)) < 6, n = P.indexOf("Firefox") !== -1, (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(P) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(P)) && (p = parseFloat(RegExp.$1)), !!b && (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity))
                    }(),
                    R = function(a) {
                        return v.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    S = function(a) {
                        window.console && console.log(a)
                    },
                    T = "",
                    U = "",
                    V = function(a, b) {},
                    W = K.defaultView ? K.defaultView.getComputedStyle : function() {},
                    X = g.getStyle = function(a, b, c, d, e) {
                        var f;
                        return Q || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || W(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(z, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : R(a)
                    },
                    fa = function(a, b) {
                        return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a)
                    },
                    ga = function(a, b, c, d) {
                    },
                    ha = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    la = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (j in ha) la += "|" + j + "\\b";
                la = new RegExp(la + ")", "gi"), g.colorStringFilter = function(a) {
                }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
                var ma = function(a, b, c, d) {},
                    na = function(a) { },
                    oa = (O._setPluginRatio = function(a) {}, function(a, b, c, d, e) {}),
                    pa = (O._parseToProxy = function(a, b, c, d, e, f) {
                    }, O.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) {
                        this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof pa || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
                    }),
                    qa = function(a, b, c, d, e, f) {
                        var g = new pa(a, b, c, d - c, e, -1, f);
                        return g.b = c, g.e = g.xs0 = d, g
                    },
                    ra = g.parseComplex = function(a, b, c, d, e, f, g, h, i, j) {
                    },
                    sa = 9;
                for (j = pa.prototype, j.l = j.pr = 0; --sa > 0;) j["xn" + sa] = 0, j["xs" + sa] = "";
                j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function(a, b, c, d, e, f) {
                };
                var ta = function(a, b) {
                        b = b || {}, this.p = b.prefix ? V(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || ma(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
                    },
                    ua = O._registerComplexSpecialProp = function(a, b, c) {
                        "object" != typeof b && (b = {
                            parser: c
                        });
                        var d, e, f = a.split(","),
                            g = b.defaultValue;
                        for (c = c || [g], d = 0; d < f.length; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new ta(f[d], b)
                    },
                    va = function(a) {};
                j = ta.prototype, j.parseComplex = function(a, b, c, d, e, f) {
                }, j.parse = function(a, b, c, d, f, g, h) {
                }, g.registerSpecialProp = function(a, b, c) {
                }, g.useSVGTransformAttr = m || n;
                var wa, xa = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    ya = V("transform"),
                    za = T + "transform",
                    Aa = V("transformOrigin"),
                    Ba = null !== V("perspective"),
                    Ca = O.Transform = function() {
                    },
                    Da = window.SVGElement,
                    Ea = function(a, b, c) {
                    },
                    Fa = K.documentElement,
                    Ga = function() {
                        var a, b, c, d = p || /Android/i.test(P) && !window.chrome;
                    }(),
                    Ha = function(a, b, c, d, e) {
                    },
                    Ia = function(a) {
                    },
                    Ja = [1, 0, 0, 1, 0, 0],
                    Ka = function(a, b) {
                    },
                    La = O.getTransform = function(a, c, d, f) {
                    },
                    Ma = function(a) {
                    },
                    Na = O.set3DTransformRatio = O.setTransformRatio = function(a) {
                    };
                j = Ca.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ua("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                }), ua("boxShadow", {}), ua("borderRadius", {});
                var Oa = function(a) {};
                ua("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(a, b, c, d, f, g) {   /* need */
                        var h = parseFloat(X(a, "opacity", e, !1, "1")),
                            i = a.style,
                            j = "autoAlpha" === c;
                        return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === X(a, "visibility", e) && 0 !== b && (h = 0), Q ? f = new pa(i, "opacity", h, b - h, f) : (f = new pa(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Oa), j && (f = new pa(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
                    }
                });
                for (ua("clearProps", {}), j = "bezier,throwProps,physicsProps,physics2D".split(","), sa = j.length; sa--;) va(j[sa]);
                j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function(a, b, h) { /* need */
                    if (!a.nodeType) return !1;
                    this._target = a, this._tween = h, this._vars = b, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = W(a, ""), f = this._overwriteProps;
                    var j, n, p, q, r, s, t, u, v, x = a.style;
                    if (l && "" === x.zIndex && (j = X(a, "zIndex", e), "auto" !== j && "" !== j || this._addLazySet(x, "zIndex", 0)), "string" == typeof b && (q = x.cssText, j = $(a, e), x.cssText = q + ";" + b, j = _(a, j, $(a)).difs, !Q && w.test(b) && (j.opacity = parseFloat(RegExp.$1)), b = j, x.cssText = q), b.className ? this._firstPT = n = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = n = this.parse(a, b, null), this._transformType) {
                        for (v = 3 === this._transformType, ya ? m && (l = !0, "" === x.zIndex && (t = X(a, "zIndex", e), "auto" !== t && "" !== t || this._addLazySet(x, "zIndex", 0)), o && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (v ? "visible" : "hidden"))) : x.zoom = 1, p = n; p && p._next;) p = p._next;
                        u = new pa(a, "transform", 0, 0, null, 2), this._linkCSSP(u, null, p), u.setRatio = ya ? Na : Ma, u.data = this._transform || La(a, e, !0), u.tween = h, u.pr = -1, f.pop()
                    }
                    if (c) {
                        for (; n;) {
                            for (s = n._next, p = q; p && p.pr > n.pr;) p = p._next;
                            (n._prev = p ? p._prev : r) ? n._prev._next = n: q = n, (n._next = p) ? p._prev = n : r = n, n = s
                        }
                        this._firstPT = q
                    }
                    return !0
                }, j.parse = function(a, b, c, f) {
                    var g, h, j, l, m, n, o, p, q, r, s = a.style;
                    for (g in b) n = b[g], h = i[g], h ? c = h.parse(a, n, g, this, c, f, b) : (m = X(a, g, e) + "", q = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || g.indexOf("Color") !== -1 || q && y.test(n) ? (q || (n = ja(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = ra(s, g, m, n, !0, "transparent", c, 0, f)) : !q || n.indexOf(" ") === -1 && n.indexOf(",") === -1 ? (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", "" !== m && "auto" !== m || ("width" === g || "height" === g ? (j = ca(a, g, e), o = "px") : "left" === g || "top" === g ? (j = Z(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), r = q && "=" === n.charAt(1), r ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(u, "")) : (l = parseFloat(n), p = q ? n.replace(u, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (r ? l + j : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && j && (j = Y(a, g, j, o), "%" === p ? (j /= Y(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p ? j /= Y(a, g, 1, p) : "px" !== p && (l = Y(a, g, l, p), p = "px"), r && (l || 0 === l) && (n = l + j + p)), r && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== s[g] && (n || n + "" != "NaN" && null != n) ? (c = new pa(s, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && g.indexOf("Style") === -1 ? n : m) : S("invalid " + g + " tween value: " + b[g]) : (c = new pa(s, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p)) : c = ra(s, g, m, n, !0, null, c, 0, f)), f && c && !c.plugin && (c.plugin = f);
                    return c
                }, j.setRatio = function(a) {
                    var b, c, d, e = this._firstPT,
                        f = 1e-6;
                    if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; e;) {
                                if (b = e.c * a + e.s, e.r ? b = Math.round(b) : b < f && b > -f && (b = 0), e.type)
                                    if (1 === e.type)
                                        if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                        else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                else {
                                    for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                    e.t[e.p] = c
                                } else e.type === -1 ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                                else e.t[e.p] = b + e.xs0;
                                e = e._next
                            } else
                                for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
                        else
                            for (; e;) {
                                if (2 !== e.type)
                                    if (e.r && e.type !== -1)
                                        if (b = Math.round(e.s + e.c), e.type) {
                                            if (1 === e.type) {
                                                for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                                e.t[e.p] = c
                                            }
                                        } else e.t[e.p] = b + e.xs0;
                                else e.t[e.p] = e.e;
                                else e.setRatio(a);
                                e = e._next
                            }
                };
                return g.cascadeTo = function(a, c, d) {
                }, a.activate([g]), g
            }, !0)
    }), function(a, b) {
        "use strict";
        var c = a.GreenSockGlobals = a.GreenSockGlobals || a;
        if (!c.TweenLite) {
            var d, e, f, g, h, i = function(a) {
                    var b, d = a.split("."),
                        e = c;
                    for (b = 0; b < d.length; b++) e[d[b]] = e = e[d[b]] || {};
                    return e
                },
                j = i("com.greensock"),
                k = 1e-10,
                l = function(a) {
                },
                m = function() {},
                n = function() {
                }(),
                o = {},
                p = function(d, e, f, g) {
                    this.sc = o[d] ? o[d].sc : [], o[d] = this, this.gsClass = null, this.func = f;
                    var h = [];
                    this.check = function(j) {
                        for (var k, l, m, n, q, r = e.length, s = r; --r > -1;)(k = o[e[r]] || new p(e[r], [])).gsClass ? (h[r] = k.gsClass, s--) : j && k.sc.push(this);
                        if (0 === s && f)
                            for (l = ("com.greensock." + d).split("."), m = l.pop(), n = i(l.join("."))[m] = this.gsClass = f.apply(f, h), g && (c[m] = n, q = "undefined" != typeof module && module.exports, !q && "function" == typeof define && define.amd ? define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function() {
                                    return n
                                }) : d === b && q && (module.exports = n)), r = 0; r < this.sc.length; r++) this.sc[r].check()
                    }, this.check(!0)
                },
                q = a._gsDefine = function(a, b, c, d) {
                    return new p(a, b, c, d)
                },
                r = j._class = function(a, b, c) {
                    return b = b || function() {}, q(a, [], function() {
                        return b
                    }, c), b
                };
            q.globals = c;
            var s = [0, 0, 1, 1],
                t = [],
                u = r("easing.Ease", function(a, b, c, d) {
                    this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? s.concat(b) : s
                }, !0),
                v = u.map = {},
                w = u.register = function(a, b, c, d) {
                    for (var e, f, g, h, i = b.split(","), k = i.length, l = (c || "easeIn,easeOut,easeInOut").split(","); --k > -1;)
                        for (f = i[k], e = d ? r("easing." + f, null, !0) : j.easing[f] || {}, g = l.length; --g > -1;) h = l[g], v[f + "." + h] = v[h + f] = e[h] = a.getRatio ? a : a[h] || new a
                };
            for (f = u.prototype, f._calcEnd = !1, f.getRatio = function(a) {
                    if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
                    var b = this._type,
                        c = this._power,
                        d = 1 === b ? 1 - a : 2 === b ? a : a < .5 ? 2 * a : 2 * (1 - a);
                    return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : a < .5 ? d / 2 : 1 - d / 2
                }, d = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], e = d.length; --e > -1;) f = d[e] + ",Power" + e, w(new u(null, null, 1, e), f, "easeOut", !0), w(new u(null, null, 2, e), f, "easeIn" + (0 === e ? ",easeNone" : "")), w(new u(null, null, 3, e), f, "easeInOut");
            v.linear = j.easing.Linear.easeIn, v.swing = j.easing.Quad.easeInOut;
            var x = r("events.EventDispatcher", function(a) {
                this._listeners = {}, this._eventTarget = a || this
            });
            f = x.prototype, f.addEventListener = function(a, b, c, d, e) {
                e = e || 0;
                var f, i, j = this._listeners[a],
                    k = 0;
                for (null == j && (this._listeners[a] = j = []), i = j.length; --i > -1;) f = j[i], f.c === b && f.s === c ? j.splice(i, 1) : 0 === k && f.pr < e && (k = i + 1);
                j.splice(k, 0, {
                    c: b,
                    s: c,
                    up: d,
                    pr: e
                }), this !== g || h || g.wake()
            }, f.removeEventListener = function(a, b) {
                var c, d = this._listeners[a];
                if (d)
                    for (c = d.length; --c > -1;)
                        if (d[c].c === b) return void d.splice(c, 1)
            }, f.dispatchEvent = function(a) {
                var b, c, d, e = this._listeners[a];
                if (e)
                    for (b = e.length, c = this._eventTarget; --b > -1;) d = e[b], d && (d.up ? d.c.call(d.s || c, {
                        type: a,
                        target: c
                    }) : d.c.call(d.s || c))
            };
            var y = a.requestAnimationFrame,
                z = a.cancelAnimationFrame,
                A = Date.now || function() {
                    return (new Date).getTime()
                },
                B = A();
            for (d = ["ms", "moz", "webkit", "o"], e = d.length; --e > -1 && !y;) y = a[d[e] + "RequestAnimationFrame"], z = a[d[e] + "CancelAnimationFrame"] || a[d[e] + "CancelRequestAnimationFrame"];
            r("Ticker", function(a, b) {
                var c, d, e, f, i, j = this,
                    l = A(),
                    n = b !== !1 && y,
                    o = 500,
                    p = 33,
                    q = "tick",
                    r = function(a) {
                        var b, g, h = A() - B;
                        h > o && (l += h - p), B += h, j.time = (B - l) / 1e3, b = j.time - i, (!c || b > 0 || a === !0) && (j.frame++, i += b + (b >= f ? .004 : f - b), g = !0), a !== !0 && (e = d(r)), g && j.dispatchEvent(q)
                    };
                x.call(j), j.time = j.frame = 0, j.tick = function() {
                    r(!0)
                }, j.lagSmoothing = function(a, b) {
                    o = a || 1 / k, p = Math.min(b, o, 0)
                }, j.sleep = function() {
                    null != e && (n && z ? z(e) : clearTimeout(e), d = m, e = null, j === g && (h = !1))
                }, j.wake = function() {
                    null !== e ? j.sleep() : j.frame > 10 && (B = A() - o + 5), d = 0 === c ? m : n && y ? y : function(a) {
                        return setTimeout(a, 1e3 * (i - j.time) + 1 | 0)
                    }, j === g && (h = !0), r(2)
                }, j.fps = function(a) {
                    return arguments.length ? (c = a, f = 1 / (c || 60), i = this.time + f, void j.wake()) : c
                }, j.useRAF = function(a) {
                    return arguments.length ? (j.sleep(), n = a, void j.fps(c)) : n
                }, j.fps(a), setTimeout(function() {
                    n && j.frame < 5 && j.useRAF(!1)
                }, 1500)
            }), f = j.Ticker.prototype = new j.events.EventDispatcher, f.constructor = j.Ticker;
            var C = r("core.Animation", function(a, b) {
                if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, V) {
                    h || g.wake();
                    var c = this.vars.useFrames ? U : V;
                    c.add(this, c._time), this.vars.paused && this.paused(!0)
                }
            });
            g = C.ticker = new j.Ticker, f = C.prototype, f._dirty = f._gc = f._initted = f._paused = !1, f._totalTime = f._time = 0, f._rawPrevTime = -1, f._next = f._last = f._onUpdate = f._timeline = f.timeline = null, f._paused = !1;
            var D = function() {
                h && A() - B > 2e3 && g.wake(), setTimeout(D, 2e3)
            };
            D(), f.play = function(a, b) {
            }, f._enabled = function(a, b) { /* need */
            }, f._kill = function(a, b) {
            }, f.kill = function(a, b) {
                return this._kill(a, b), this
            }, f._uncache = function(a) {
            }, f._swapSelfInParams = function(a) {
            }, f._callback = function(a) {
            }, f.eventCallback = function(a, b, c, d) {
            }, f.totalDuration = function(a) { /* need */
            };
            var E = r("core.SimpleTimeline", function(a) {});
            f = E.prototype = new C, f.constructor = E, f.kill()._gc = !1, f._first = f._last = f._recent = null, f._sortChildren = !1, f.add = f.insert = function(a, b, c, d) {
                var e, f;
                if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)
                    for (f = a._startTime; e && e._startTime > f;) e = e._prev;
                return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
            }, f._remove = function(a, b) {
                return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, f.render = function(a, b, c) {
                var d, e = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
            }, f.rawTime = function() {
                return h || g.wake(), this._totalTime
            };
            var F = r("TweenLite", function(b, c, d) {
                    if (C.call(this, c, d), this.render = F.prototype.render, null == b) throw "Cannot tween a null target.";
                    this.target = b = "string" != typeof b ? b : F.selector(b) || b;
                    var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                        i = this.vars.overwrite;
                    if (this._overwrite = i = null == i ? T[F.defaultOverwrite] : "number" == typeof i ? i >> 0 : T[i], (h || b instanceof Array || b.push && n(b)) && "number" != typeof b[0])
                        for (this._targets = g = l(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(l(f))) : (this._siblings[e] = Y(f, this, !1), 1 === i && this._siblings[e].length > 1 && $(f, this, null, 1, this._siblings[e])) : (f = g[e--] = F.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
                    else this._propLookup = {}, this._siblings = Y(b, this, !1), 1 === i && this._siblings.length > 1 && $(b, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -k, this.render(-this._delay))
                }, !0),
                G = function(b) {
                    return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
                },
                H = function(a, b) {
                    var c, d = {};
                    for (c in a) S[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!P[c] || P[c] && P[c]._autoCSS) || (d[c] = a[c], delete a[c]);
                    a.css = d
                };
            f = F.prototype = new C, f.constructor = F, f.kill()._gc = !1, f.ratio = 0, f._firstPT = f._targets = f._overwrittenProps = f._startAt = null, f._notifyPluginsOfEnabled = f._lazy = !1, F.version = "1.18.0", F.defaultEase = f._ease = new u(null, null, 1, 1), F.defaultOverwrite = "auto", F.ticker = g, F.autoSleep = 120, F.lagSmoothing = function(a, b) {
                g.lagSmoothing(a, b)
            }, F.selector = a.$ || a.jQuery || function(b) {
                var c = a.$ || a.jQuery;
                return c ? (F.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
            };
            var I = [],
                J = {},
                K = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                L = function(a) {
                    for (var b, c = this._firstPT, d = 1e-6; c;) b = c.blob ? a ? this.join("") : this.start : c.c * a + c.s, c.r ? b = Math.round(b) : b < d && b > -d && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next
                },
                M = function(a, b, c, d) {
                },
                N = function(a, b, c, d, e, f, g, h) {
                },
                O = F._internals = {
                },
                P = F._plugins = {},
                Q = O.tweenLookup = {},
                R = 0,
                S = O.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1
                },
                T = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                U = C._rootFramesTimeline = new E,
                V = C._rootTimeline = new E,
                W = 30,
                X = O.lazyRender = function() {
                    var a, b = I.length;
                    for (J = {}; --b > -1;) a = I[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
                    I.length = 0
                };
            V._startTime = g.time, U._startTime = g.frame, V._active = U._active = !0, setTimeout(X, 1), C._updateRoot = F.render = function() {
                var a, b, c;
                if (I.length && X(), V.render((g.time - V._startTime) * V._timeScale, !1, !1), U.render((g.frame - U._startTime) * U._timeScale, !1, !1), I.length && X(), g.frame >= W) {
                    W = g.frame + (parseInt(F.autoSleep, 10) || 120);
                    for (c in Q) {
                        for (b = Q[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
                        0 === b.length && delete Q[c]
                    }
                    if (c = V._first, (!c || c._paused) && F.autoSleep && !U._first && 1 === g._listeners.tick.length) {
                        for (; c && c._paused;) c = c._next;
                        c || g.sleep()
                    }
                }
            }, g.addEventListener("tick", C._updateRoot);
            var Y = function(a, b, c) {
                    var d, e, f = a._gsTweenID;
                    if (Q[f || (a._gsTweenID = f = "t" + R++)] || (Q[f] = {
                            target: a,
                            tweens: []
                        }), b && (d = Q[f].tweens, d[e = d.length] = b, c))
                        for (; --e > -1;) d[e] === b && d.splice(e, 1);
                    return Q[f].tweens
                },
                Z = function(a, b, c, d) {
                    var e, f, g = a.vars.onOverwrite;
                    return g && (e = g(a, b, c, d)), g = F.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
                },
                $ = function(a, b, c, d, e) {
                    var f, g, h, i;
                    if (1 === d || d >= 4) {
                        for (i = e.length, f = 0; f < i; f++)
                            if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);
                            else if (5 === d) break;
                        return g
                    }
                    var j, l = b._startTime + k,
                        m = [],
                        n = 0,
                        o = 0 === b._duration;
                    for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || _(b, 0, o), 0 === _(h, j, o) && (m[n++] = h)) : h._startTime <= l && h._startTime + h.totalDuration() / h._timeScale > l && ((o || !h._initted) && l - h._startTime <= 2e-10 || (m[n++] = h)));
                    for (f = n; --f > -1;)
                        if (h = m[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
                            if (2 !== d && !Z(h, b)) continue;
                            h._enabled(!1, !1) && (g = !0)
                        }
                    return g
                },
                _ = function(a, b, c) {
                    for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                        if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
                        d = d._timeline
                    }
                    return f /= e, f > b ? f - b : c && f === b || !a._initted && f - b < 2 * k ? k : (f += a.totalDuration() / a._timeScale / e) > b + k ? 0 : f - b - k
                };
            f._init = function() {
                var a, b, c, d, e, f = this.vars,
                    g = this._overwrittenProps,
                    h = this._duration,
                    i = !!f.immediateRender,
                    j = f.ease;
                if (f.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
                    for (d in f.startAt) e[d] = f.startAt[d];
                    if (e.overwrite = !1, e.immediateRender = !0, e.lazy = i && f.lazy !== !1, e.startAt = e.delay = null, this._startAt = F.to(this.target, 0, e), i)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== h) return
                } else if (f.runBackwards && 0 !== h)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (i = !1), c = {};
                        for (d in f) S[d] && "autoCSS" !== d || (c[d] = f[d]);
                        if (c.overwrite = 0, c.data = "isFromStart", c.lazy = i && f.lazy !== !1, c.immediateRender = i, this._startAt = F.to(this.target, 0, c), i) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = j = j ? j instanceof u ? j : "function" == typeof j ? new u(j, f.easeParams) : v[j] || F.defaultEase : F.defaultEase, f.easeParams instanceof Array && j.config && (this._ease = j.config.apply(j, f.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (a = this._targets.length; --a > -1;) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], g ? g[a] : null) && (b = !0);
                else b = this._initProps(this.target, this._propLookup, this._siblings, g);
                if (b && F._onPluginEvent("_onInitAllProps", this), g && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), f.runBackwards)
                    for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
                this._onUpdate = f.onUpdate, this._initted = !0
            }, f._initProps = function(b, c, d, e) {
                var f, g, h, i, j, k;
                if (null == b) return !1;
                J[b._gsTweenID] && X(), this.vars.css || b.style && b !== a && b.nodeType && P.css && this.vars.autoCSS !== !1 && H(this.vars, b);
                for (f in this.vars)
                    if (k = this.vars[f], S[f]) k && (k instanceof Array || k.push && n(k)) && k.join("").indexOf("{self}") !== -1 && (this.vars[f] = k = this._swapSelfInParams(k, this));
                    else if (P[f] && (i = new P[f])._onInitTween(b, this.vars[f], this)) {
                    for (this._firstPT = j = {
                            _next: this._firstPT,
                            t: i,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: f,
                            pg: 1,
                            pr: i._priority
                        }, g = i._overwriteProps.length; --g > -1;) c[i._overwriteProps[g]] = this._firstPT;
                    (i._priority || i._onInitAllProps) && (h = !0), (i._onDisable || i._onEnable) && (this._notifyPluginsOfEnabled = !0), j._next && (j._next._prev = j)
                } else c[f] = N.call(this, b, f, "get", k, f, 0, null, this.vars.stringFilter);
                return e && this._kill(e, b) ? this._initProps(b, c, d, e) : this._overwrite > 1 && this._firstPT && d.length > 1 && $(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (J[b._gsTweenID] = !0), h)
            }, f.render = function(a, b, c) {
                var d, e, f, g, h = this._time,
                    i = this._duration,
                    j = this._rawPrevTime;
                if (a >= i) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 === a || j < 0 || j === k && "isPause" !== this.data) && j !== a && (c = !0, j > k && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : k);
                else if (a < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), a < 0 && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== k || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : k)), this._initted || (c = !0);
                else if (this._totalTime = this._time = a, this._easeType) {
                    var l = a / i,
                        m = this._easeType,
                        n = this._easePower;
                    (1 === m || 3 === m && l >= .5) && (l = 1 - l), 3 === m && (l *= 2), 1 === n ? l *= l : 2 === n ? l *= l * l : 3 === n ? l *= l * l * l : 4 === n && (l *= l * l * l * l), 1 === m ? this.ratio = 1 - l : 2 === m ? this.ratio = l : a / i < .5 ? this.ratio = l / 2 : this.ratio = 1 - l / 2
                } else this.ratio = this._ease.getRatio(a / i);
                if (this._time !== h || c) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, I.push(this), void(this._lazy = [a, b]);
                        this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== i || b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                    this._onUpdate && (a < 0 && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d) && this._callback("onUpdate")), e && (this._gc && !c || (a < 0 && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === k && g !== k && (this._rawPrevTime = 0)))
                }
            }, f._kill = function(a, b, c) {
                if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                b = "string" != typeof b ? b || this._targets || this.target : F.selector(b) || b;
                var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
                return i
            }, f.invalidate = function() {
                return this._notifyPluginsOfEnabled && F._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -k, this.render(-this._delay)), this
            }, f._enabled = function(a, b) {
                if (h || g.wake(), a && this._gc) {
                    var c, d = this._targets;
                    if (d)
                        for (c = d.length; --c > -1;) this._siblings[c] = Y(d[c], this, !0);
                    else this._siblings = Y(this.target, this, !0)
                }
                return C.prototype._enabled.call(this, a, b), !(!this._notifyPluginsOfEnabled || !this._firstPT) && F._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
            }, F.to = function(a, b, c) {
                return new F(a, b, c)
            }, F.from = function(a, b, c) {
                return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new F(a, b, c)
            }, F.fromTo = function(a, b, c, d) {
                return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new F(a, b, d)
            }, F.delayedCall = function(a, b, c, d, e) {
                return new F(b, 0, {
                    delay: a,
                    onComplete: b,
                    onCompleteParams: c,
                    callbackScope: d,
                    onReverseComplete: b,
                    onReverseCompleteParams: c,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: e,
                    overwrite: 0
                })
            }, F.set = function(a, b) {
                return new F(a, 0, b)
            }, F.getTweensOf = function(a, b) {
                if (null == a) return [];
                a = "string" != typeof a ? a : F.selector(a) || a;
                var c, d, e, f;
                if ((n(a) || G(a)) && "number" != typeof a[0]) {
                    for (c = a.length, d = []; --c > -1;) d = d.concat(F.getTweensOf(a[c], b));
                    for (c = d.length; --c > -1;)
                        for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
                } else
                    for (d = Y(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
                return d
            }, F.killTweensOf = F.killDelayedCallsTo = function(a, b, c) {
                "object" == typeof b && (c = b, b = !1);
                for (var d = F.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
            };
            var aa = r("plugins.TweenPlugin", function(a, b) {
                this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = aa.prototype
            }, !0);
            if (f = aa.prototype, aa.version = "1.18.0", aa.API = 2, f._firstPT = null, f._addTween = N, f.setRatio = L, f._kill = function(a) {
                    var b, c = this._overwriteProps,
                        d = this._firstPT;
                    if (null != a[this._propName]) this._overwriteProps = [];
                    else
                        for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
                    for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
                    return !1
                }, f._roundProps = function(a, b) {
                    for (var c = this._firstPT; c;)(a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")]) && (c.r = b), c = c._next
                }, F._onPluginEvent = function(a, b) {
                    var c, d, e, f, g, h = b._firstPT;
                    if ("_onInitAllProps" === a) {
                        for (; h;) {
                            for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
                            (h._prev = d ? d._prev : f) ? h._prev._next = h: e = h, (h._next = d) ? d._prev = h : f = h, h = g
                        }
                        h = b._firstPT = e
                    }
                    for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
                    return c
                }, aa.activate = function(a) {
                    for (var b = a.length; --b > -1;) a[b].API === aa.API && (P[(new a[b])._propName] = a[b]);
                    return !0
                }, q.plugin = function(a) {
                    if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
                    var b, c = a.propName,
                        d = a.priority || 0,
                        e = a.overwriteProps,
                        f = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        g = r("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
                            aa.call(this, c, d), this._overwriteProps = e || []
                        }, a.global === !0),
                        h = g.prototype = new aa(c);
                    h.constructor = g, g.API = a.API;
                    for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
                    return g.version = a.version, aa.activate([g]), g
                }, d = a._gsQueue) {
                for (e = 0; e < d.length; e++) d[e]();
                for (f in o) o[f].func || a.console.log("GSAP encountered missing dependency: com.greensock." + f)
            }
            h = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        var a = document.documentElement,
            b = window,
            c = function(c, d) {
                var e = "x" === d ? "Width" : "Height",
                    f = "scroll" + e,
                    g = "client" + e,
                    h = document.body;
                return c === b || c === a || c === h ? Math.max(a[f], h[f]) - (b["inner" + e] || a[g] || h[g]) : c[f] - c["offset" + e]
            },
            d = _gsScope._gsDefine.plugin({
                propName: "scrollTo",
                API: 2,
                version: "1.7.5",
                init: function(a, d, e) {
                },
                set: function(a) {
                }
            }),
            e = d.prototype;
        d.max = c, e.getX = function() {
        }, e.getY = function() {
        }, e._kill = function(a) {
        }
    }), Array.from || (Array.from = function() {
        var a = Object.prototype.toString,
            b = function(b) {
                return "function" == typeof b || "[object Function]" === a.call(b)
            },
            c = function(a) {
                var b = Number(a);
                return isNaN(b) ? 0 : 0 !== b && isFinite(b) ? (b > 0 ? 1 : -1) * Math.floor(Math.abs(b)) : b
            },
            d = Math.pow(2, 53) - 1,
            e = function(a) {
                var b = c(a);
                return Math.min(Math.max(b, 0), d)
            };
        return function(a) {
            var c = this,
                d = Object(a);
            if (null == a) throw new TypeError("Array.from requires an array-like object - not null or undefined");
            var f, g = arguments.length > 1 ? arguments[1] : void 0;
            if ("undefined" != typeof g) {
                if (!b(g)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                arguments.length > 2 && (f = arguments[2])
            }
            for (var h, i = e(d.length), j = b(c) ? Object(new c(i)) : new Array(i), k = 0; k < i;) h = d[k], g ? j[k] = "undefined" == typeof f ? g(h, k) : g.call(f, h, k) : j[k] = h, k += 1;
            return j.length = i, j
        }
    }()), Array.of || (Array.of = function() {
        return Array.prototype.slice.call(arguments)
    }), Array.prototype.copyWithin || (Array.prototype.copyWithin = function(a, b) {
    }), Array.prototype.fill || (Array.prototype.fill = function(a) {
    }), Array.prototype.find || (Array.prototype.find = function(a) {
    }), Array.prototype.findIndex || (Array.prototype.findIndex = function(a) {
    }), Array.prototype.includes || (Array.prototype.includes = function(a) {
    }),

    /*! Picturefill - v3.0.2
     * http://scottjehl.github.io/picturefill
     * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
     *  License: MIT
     */
    function(a, b, c) {
        "use strict";


        function e(b, c) {
            var d = new a.Image;
            return d.onerror = function() {
                A[b] = !1, ba()
            }, d.onload = function() {
                A[b] = 1 === d.width, ba()
            }, d.src = c, "pending"
        }

        b.createElement("picture");
        var o, p, q, r, s = {},
            t = !1,
            u = function() {},
            v = b.createElement("img"),
            w = v.getAttribute,
            x = v.setAttribute,
            y = v.removeAttribute,
            z = b.documentElement,
            A = {},
            B = {},
            C = "data-pfsrc",
            D = C + "set",
            E = navigator.userAgent,
            F = /rident/.test(E) || /ecko/.test(E) && E.match(/rv\:(\d+)/) && RegExp.$1 > 35,
            G = "currentSrc",
            H = /\s+\+?\d+(e\d+)?w/,
            I = /(\([^)]+\))?\s*(.+)/,
            J = a.picturefillCFG,
            K = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
            L = "font-size:100%!important;",
            M = !0,
            N = {},
            O = {},
            P = a.devicePixelRatio,
            Q = { },
            R = b.createElement("a"),
            S = !1,
            T = /^[ \t\n\r\u000c]+/,
            U = /^[, \t\n\r\u000c]+/,
            V = /^[^ \t\n\r\u000c]+/,
            W = /[,]+$/,
            X = /^\d+$/,
            Y = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
            Z = function(a, b, c, d) {},
            $ = function(a) {
            },
            _ = function() {
            }(),
            aa = function(a, b) {
            },
            ba = function(a) {
            };
        o = a.console && console.warn ? function(a) {
        } : u, G in v || (G = "src"), A["image/jpeg"] = !0, A["image/gif"] = !0, A["image/png"] = !0, A["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), s.ns = ("pf" + (new Date).getTime()).substr(0, 9), s.supSrcset = "srcset" in v, s.supSizes = "sizes" in v, s.supPicture = !!a.HTMLPictureElement, s.supSrcset && s.supPicture && !s.supSizes && ! function(a) {
        }(b.createElement("img")), s.supSrcset && !s.supSizes ? ! function() {
        }() : t = !0, s.selShort = "picture>img,img[srcset]", s.sel = s.selShort, s.cfg = B, s.DPR = P || 1, s.u = Q, s.types = A, s.setSize = u, s.makeUrl = $(function(a) {
        }), s.qsa = function(a, b) {
        }, s.matchesMedia = function() {
        }, s.mMQ = function(a) {
        }, s.calcLength = function(a) {
        }, s.supportsType = function(a) {
        }, s.parseSize = $(function(a) {
        }), s.parseSet = function(a) {
        }, s.getEmValue = function() {
        }, s.calcListLength = function(a) {
        }, s.setRes = function(a) {
        }, s.setRes.res = aa, s.applySetCandidate = function(a, b) {
        }, s.setSrc = function(a, b) {
        }, s.getSet = function(a) {
        }, s.parseSets = function(a, b, d) {
        }, s.fillImg = function(a, b) {
        }, s.setupRun = function() {
        }, s.supPicture ? (ba = u, s.fillImg = u) : ! function() {
        }(), s.picturefill = ba, s.fillImgs = ba, s.teardownRun = u, ba._ = s, a.picturefillCFG = {
        };
        for (; J && J.length;) a.picturefillCFG.push(J.shift());
        a.picturefill = ba, "object" == typeof module && "object" == typeof module.exports ? module.exports = ba : "function" == typeof define && define.amd && define("picturefill", function() {
            return ba
        }), s.supPicture || (A["image/webp"] = e("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
    }(window, document);

var __extends = this && this.__extends || function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
    },
    EventDispatcher = function() {
        function a() {
            this._events = {}
        }
        return a.prototype.dispatchEvent = function(a) {
            if (this._events && (a.target = this, a._stopImmediatePropagation = !1, a._isDefaultPrevented = !1, this._events[a.type])) {
                for (var b = [], c = this._events[a.type], d = 0, e = c.length; d < e; ++d) b.push(c[d].listener), c[d].once && (c[d].destruct(), d--, e--);
                for (var d = 0, e = b.length; d < e && (b[d].call(this, a), !a._stopImmediatePropagation); ++d);
                return !a._isDefaultPrevented
            }
            return !1
        }, a.prototype.dispatch = function(a, b) {
            return !!this.hasEventListener(a) && this.dispatchEvent(void 0 === b ? new BaseEvent(a) : new DataEvent(a, b))
        }, a.prototype.addEventListener = function(a, b, c, d) {
            void 0 === c && (c = 0), void 0 === d && (d = !1), a in this._events && "undefined" != typeof this._events[a] || (this._events[a] = []);
            for (var e = 0, f = this._events[a].length; e < f; ++e)
                if (this._events[a][e].listener === b) return this._events[a][e];
           // var g = new EventListenerData(this, a, b, c, d);
            return this._events[a].push(g), this._events[a].sort(this.sort), g
        }, a.prototype.hasEventListener = function(a) {
            return this._events && this._events[a] && this._events[a].length > 0
        }, a.prototype.removeEventListener = function(a, b) {
            if (this._events && a in this._events && this._events[a] instanceof Array)
                for (var c = 0, d = this._events[a].length; c < d; ++c)
                    if (this._events[a][c].listener === b) return this._events[a][c].dispatcher = null, this._events[a][c].destruct(), void this._events[a].splice(c, 1)
        }, a.prototype.removeAllEventListeners = function(a) {
            if (this._events)
                if ("undefined" == typeof a) {
                    for (a in this._events)
                        if (this._events[a] instanceof Array)
                            for (; this._events[a].length;) {
                                var b = this._events[a].shift();
                                b.dispatcher = null, b.destruct()
                            }
                } else if (a in this._events && this._events[a] instanceof Array)
                for (; this._events[a].length;) {
                    var b = this._events[a].shift();
                    b.dispatcher = null, b.destruct()
                }
        }, a.prototype.sort = function(a, b) {
            return b.priority - a.priority
        }, a.prototype.destruct = function() {
            this.removeAllEventListeners(), this._events = null
        }, a
    }(),
    DeviceStateEnum = function() {
        function a() {}
        return a.X_SMALL = 1, a.SMALL = 2, a.MEDIUM = 3, a.LARGE = 4, a
    }(),
    DeviceState = function(a) {
        function b() {
            a.call(this), this._indicatorElement = document.querySelector(".state-indicator"), this.handleWindowResize()
        }
        return __extends(b, a), b.prototype.handleWindowResize = function() {
            var a = window.getComputedStyle(this._indicatorElement, ":before").getPropertyValue("content"),
                c = this.state;
            this.state = parseInt(a.replace(/['"]/g, ""), 10), this.state !== c && this.dispatch(b.EVENT_STATE_CHANGE, {
                state: this.state
            })
        }, b.EVENT_STATE_CHANGE = "DeviceState.change_state", b
    }(EventDispatcher);
var IndustrySelector = function() {
        function a(a) {
            this._active = 0, this._wrapper = a, this._options = Array.from(this._wrapper.querySelectorAll(".js-option-item")), this._mainItems = Array.from(this._wrapper.querySelectorAll(".js-main-item")), this.init(), this.handleDeviceStateChange()
        }
        return a.prototype.init = function() {
            var a = this;
            this._options.forEach(function(b, c) {
                b.addEventListener("mouseenter", a.handleItemMouseEnter.bind(a, c));
                b.addEventListener("click", a.handleItemMouseEnter.bind(a, c));
            }), this.showCurrentItem(!0)
        }, a.prototype.handleItemMouseEnter = function(a) {
            GED.deviceState.state < DeviceStateEnum.MEDIUM || (this._options.forEach(function(b, c) {
                	
				var agt = navigator.userAgent.toLowerCase();
				if (agt.indexOf("msie") != -1) { // 익스플로러 일 경우
					var rv = -1;    
					if (navigator.appName == 'Microsoft Internet Explorer') {        
						var ua = navigator.userAgent;   
						var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");  
						if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);    
					}
				}
				if ( rv != "9")
				{
					b.classList[c == a ? "add" : "remove"]("is-active");
				}
            }), this._active = a, this.showCurrentItem())
        }, a.prototype.handleDeviceStateChange = function() {
            GED.deviceState.state < DeviceStateEnum.MEDIUM ? this._options.forEach(function(a, b) {
                a.classList.remove("is-active")
            }) : this.handleItemMouseEnter(this._active)
        }, a.prototype.showCurrentItem = function(a) {
            var b = this;
            void 0 === a && (a = !1), this._mainItems.forEach(function(c, d) {
                d !== b._active ? TweenLite.to(c, a ? 0 : .5, {
                    autoAlpha: 0,
                    ease: Linear.easeNone
                }) : TweenLite.to(c, a ? 0 : .5, {
                    autoAlpha: 1,
                    ease: Linear.easeNone
                })
            })
        }, a
    }(),
    App = function() {
        function a() {
			this.initIndustrySelector()
        }
        return a.prototype.initIndustrySelector = function() {
            Array.from(document.querySelectorAll(".js-rolling")).forEach(function(a) {
                new IndustrySelector(a)
            })
        }, a
    }();
GED = {}, GED.deviceState = new DeviceState, GED.app = new App;;