/*! For license information please see main.js.LICENSE.txt */
(() => {
  var e = {
      669: (e, t, r) => {
        e.exports = r(609);
      },
      448: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(26),
          i = r(372),
          a = r(327),
          u = r(97),
          s = r(109),
          c = r(985),
          f = r(874),
          l = r(648),
          p = r(644),
          d = r(205);
        e.exports = function (e) {
          return new Promise(function (t, r) {
            var h,
              v = e.data,
              y = e.headers,
              m = e.responseType;
            function b() {
              e.cancelToken && e.cancelToken.unsubscribe(h),
                e.signal && e.signal.removeEventListener("abort", h);
            }
            n.isFormData(v) &&
              n.isStandardBrowserEnv() &&
              delete y["Content-Type"];
            var g = new XMLHttpRequest();
            if (e.auth) {
              var O = e.auth.username || "",
                w = e.auth.password
                  ? unescape(encodeURIComponent(e.auth.password))
                  : "";
              y.Authorization = "Basic " + btoa(O + ":" + w);
            }
            var E = u(e.baseURL, e.url);
            function P() {
              if (g) {
                var n =
                    "getAllResponseHeaders" in g
                      ? s(g.getAllResponseHeaders())
                      : null,
                  i = {
                    data:
                      m && "text" !== m && "json" !== m
                        ? g.response
                        : g.responseText,
                    status: g.status,
                    statusText: g.statusText,
                    headers: n,
                    config: e,
                    request: g,
                  };
                o(
                  function (e) {
                    t(e), b();
                  },
                  function (e) {
                    r(e), b();
                  },
                  i
                ),
                  (g = null);
              }
            }
            if (
              (g.open(
                e.method.toUpperCase(),
                a(E, e.params, e.paramsSerializer),
                !0
              ),
              (g.timeout = e.timeout),
              "onloadend" in g
                ? (g.onloadend = P)
                : (g.onreadystatechange = function () {
                    g &&
                      4 === g.readyState &&
                      (0 !== g.status ||
                        (g.responseURL &&
                          0 === g.responseURL.indexOf("file:"))) &&
                      setTimeout(P);
                  }),
              (g.onabort = function () {
                g &&
                  (r(new l("Request aborted", l.ECONNABORTED, e, g)),
                  (g = null));
              }),
              (g.onerror = function () {
                r(new l("Network Error", l.ERR_NETWORK, e, g, g)), (g = null);
              }),
              (g.ontimeout = function () {
                var t = e.timeout
                    ? "timeout of " + e.timeout + "ms exceeded"
                    : "timeout exceeded",
                  n = e.transitional || f;
                e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                  r(
                    new l(
                      t,
                      n.clarifyTimeoutError ? l.ETIMEDOUT : l.ECONNABORTED,
                      e,
                      g
                    )
                  ),
                  (g = null);
              }),
              n.isStandardBrowserEnv())
            ) {
              var j =
                (e.withCredentials || c(E)) && e.xsrfCookieName
                  ? i.read(e.xsrfCookieName)
                  : void 0;
              j && (y[e.xsrfHeaderName] = j);
            }
            "setRequestHeader" in g &&
              n.forEach(y, function (e, t) {
                void 0 === v && "content-type" === t.toLowerCase()
                  ? delete y[t]
                  : g.setRequestHeader(t, e);
              }),
              n.isUndefined(e.withCredentials) ||
                (g.withCredentials = !!e.withCredentials),
              m && "json" !== m && (g.responseType = e.responseType),
              "function" == typeof e.onDownloadProgress &&
                g.addEventListener("progress", e.onDownloadProgress),
              "function" == typeof e.onUploadProgress &&
                g.upload &&
                g.upload.addEventListener("progress", e.onUploadProgress),
              (e.cancelToken || e.signal) &&
                ((h = function (e) {
                  g &&
                    (r(!e || (e && e.type) ? new p() : e),
                    g.abort(),
                    (g = null));
                }),
                e.cancelToken && e.cancelToken.subscribe(h),
                e.signal &&
                  (e.signal.aborted
                    ? h()
                    : e.signal.addEventListener("abort", h))),
              v || (v = null);
            var S = d(E);
            S && -1 === ["http", "https", "file"].indexOf(S)
              ? r(
                  new l("Unsupported protocol " + S + ":", l.ERR_BAD_REQUEST, e)
                )
              : g.send(v);
          });
        };
      },
      609: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(849),
          i = r(321),
          a = r(185),
          u = (function e(t) {
            var r = new i(t),
              u = o(i.prototype.request, r);
            return (
              n.extend(u, i.prototype, r),
              n.extend(u, r),
              (u.create = function (r) {
                return e(a(t, r));
              }),
              u
            );
          })(r(546));
        (u.Axios = i),
          (u.CanceledError = r(644)),
          (u.CancelToken = r(972)),
          (u.isCancel = r(502)),
          (u.VERSION = r(288).version),
          (u.toFormData = r(675)),
          (u.AxiosError = r(648)),
          (u.Cancel = u.CanceledError),
          (u.all = function (e) {
            return Promise.all(e);
          }),
          (u.spread = r(713)),
          (u.isAxiosError = r(268)),
          (e.exports = u),
          (e.exports.default = u);
      },
      972: (e, t, r) => {
        "use strict";
        var n = r(644);
        function o(e) {
          if ("function" != typeof e)
            throw new TypeError("executor must be a function.");
          var t;
          this.promise = new Promise(function (e) {
            t = e;
          });
          var r = this;
          this.promise.then(function (e) {
            if (r._listeners) {
              var t,
                n = r._listeners.length;
              for (t = 0; t < n; t++) r._listeners[t](e);
              r._listeners = null;
            }
          }),
            (this.promise.then = function (e) {
              var t,
                n = new Promise(function (e) {
                  r.subscribe(e), (t = e);
                }).then(e);
              return (
                (n.cancel = function () {
                  r.unsubscribe(t);
                }),
                n
              );
            }),
            e(function (e) {
              r.reason || ((r.reason = new n(e)), t(r.reason));
            });
        }
        (o.prototype.throwIfRequested = function () {
          if (this.reason) throw this.reason;
        }),
          (o.prototype.subscribe = function (e) {
            this.reason
              ? e(this.reason)
              : this._listeners
              ? this._listeners.push(e)
              : (this._listeners = [e]);
          }),
          (o.prototype.unsubscribe = function (e) {
            if (this._listeners) {
              var t = this._listeners.indexOf(e);
              -1 !== t && this._listeners.splice(t, 1);
            }
          }),
          (o.source = function () {
            var e;
            return {
              token: new o(function (t) {
                e = t;
              }),
              cancel: e,
            };
          }),
          (e.exports = o);
      },
      644: (e, t, r) => {
        "use strict";
        var n = r(648);
        function o(e) {
          n.call(this, null == e ? "canceled" : e, n.ERR_CANCELED),
            (this.name = "CanceledError");
        }
        r(867).inherits(o, n, { __CANCEL__: !0 }), (e.exports = o);
      },
      502: (e) => {
        "use strict";
        e.exports = function (e) {
          return !(!e || !e.__CANCEL__);
        };
      },
      321: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(327),
          i = r(782),
          a = r(572),
          u = r(185),
          s = r(97),
          c = r(875),
          f = c.validators;
        function l(e) {
          (this.defaults = e),
            (this.interceptors = { request: new i(), response: new i() });
        }
        (l.prototype.request = function (e, t) {
          "string" == typeof e ? ((t = t || {}).url = e) : (t = e || {}),
            (t = u(this.defaults, t)).method
              ? (t.method = t.method.toLowerCase())
              : this.defaults.method
              ? (t.method = this.defaults.method.toLowerCase())
              : (t.method = "get");
          var r = t.transitional;
          void 0 !== r &&
            c.assertOptions(
              r,
              {
                silentJSONParsing: f.transitional(f.boolean),
                forcedJSONParsing: f.transitional(f.boolean),
                clarifyTimeoutError: f.transitional(f.boolean),
              },
              !1
            );
          var n = [],
            o = !0;
          this.interceptors.request.forEach(function (e) {
            ("function" == typeof e.runWhen && !1 === e.runWhen(t)) ||
              ((o = o && e.synchronous), n.unshift(e.fulfilled, e.rejected));
          });
          var i,
            s = [];
          if (
            (this.interceptors.response.forEach(function (e) {
              s.push(e.fulfilled, e.rejected);
            }),
            !o)
          ) {
            var l = [a, void 0];
            for (
              Array.prototype.unshift.apply(l, n),
                l = l.concat(s),
                i = Promise.resolve(t);
              l.length;

            )
              i = i.then(l.shift(), l.shift());
            return i;
          }
          for (var p = t; n.length; ) {
            var d = n.shift(),
              h = n.shift();
            try {
              p = d(p);
            } catch (e) {
              h(e);
              break;
            }
          }
          try {
            i = a(p);
          } catch (e) {
            return Promise.reject(e);
          }
          for (; s.length; ) i = i.then(s.shift(), s.shift());
          return i;
        }),
          (l.prototype.getUri = function (e) {
            e = u(this.defaults, e);
            var t = s(e.baseURL, e.url);
            return o(t, e.params, e.paramsSerializer);
          }),
          n.forEach(["delete", "get", "head", "options"], function (e) {
            l.prototype[e] = function (t, r) {
              return this.request(
                u(r || {}, { method: e, url: t, data: (r || {}).data })
              );
            };
          }),
          n.forEach(["post", "put", "patch"], function (e) {
            function t(t) {
              return function (r, n, o) {
                return this.request(
                  u(o || {}, {
                    method: e,
                    headers: t ? { "Content-Type": "multipart/form-data" } : {},
                    url: r,
                    data: n,
                  })
                );
              };
            }
            (l.prototype[e] = t()), (l.prototype[e + "Form"] = t(!0));
          }),
          (e.exports = l);
      },
      648: (e, t, r) => {
        "use strict";
        var n = r(867);
        function o(e, t, r, n, o) {
          Error.call(this),
            (this.message = e),
            (this.name = "AxiosError"),
            t && (this.code = t),
            r && (this.config = r),
            n && (this.request = n),
            o && (this.response = o);
        }
        n.inherits(o, Error, {
          toJSON: function () {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: this.config,
              code: this.code,
              status:
                this.response && this.response.status
                  ? this.response.status
                  : null,
            };
          },
        });
        var i = o.prototype,
          a = {};
        [
          "ERR_BAD_OPTION_VALUE",
          "ERR_BAD_OPTION",
          "ECONNABORTED",
          "ETIMEDOUT",
          "ERR_NETWORK",
          "ERR_FR_TOO_MANY_REDIRECTS",
          "ERR_DEPRECATED",
          "ERR_BAD_RESPONSE",
          "ERR_BAD_REQUEST",
          "ERR_CANCELED",
        ].forEach(function (e) {
          a[e] = { value: e };
        }),
          Object.defineProperties(o, a),
          Object.defineProperty(i, "isAxiosError", { value: !0 }),
          (o.from = function (e, t, r, a, u, s) {
            var c = Object.create(i);
            return (
              n.toFlatObject(e, c, function (e) {
                return e !== Error.prototype;
              }),
              o.call(c, e.message, t, r, a, u),
              (c.name = e.name),
              s && Object.assign(c, s),
              c
            );
          }),
          (e.exports = o);
      },
      782: (e, t, r) => {
        "use strict";
        var n = r(867);
        function o() {
          this.handlers = [];
        }
        (o.prototype.use = function (e, t, r) {
          return (
            this.handlers.push({
              fulfilled: e,
              rejected: t,
              synchronous: !!r && r.synchronous,
              runWhen: r ? r.runWhen : null,
            }),
            this.handlers.length - 1
          );
        }),
          (o.prototype.eject = function (e) {
            this.handlers[e] && (this.handlers[e] = null);
          }),
          (o.prototype.forEach = function (e) {
            n.forEach(this.handlers, function (t) {
              null !== t && e(t);
            });
          }),
          (e.exports = o);
      },
      97: (e, t, r) => {
        "use strict";
        var n = r(793),
          o = r(303);
        e.exports = function (e, t) {
          return e && !n(t) ? o(e, t) : t;
        };
      },
      572: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(527),
          i = r(502),
          a = r(546),
          u = r(644);
        function s(e) {
          if (
            (e.cancelToken && e.cancelToken.throwIfRequested(),
            e.signal && e.signal.aborted)
          )
            throw new u();
        }
        e.exports = function (e) {
          return (
            s(e),
            (e.headers = e.headers || {}),
            (e.data = o.call(e, e.data, e.headers, e.transformRequest)),
            (e.headers = n.merge(
              e.headers.common || {},
              e.headers[e.method] || {},
              e.headers
            )),
            n.forEach(
              ["delete", "get", "head", "post", "put", "patch", "common"],
              function (t) {
                delete e.headers[t];
              }
            ),
            (e.adapter || a.adapter)(e).then(
              function (t) {
                return (
                  s(e),
                  (t.data = o.call(e, t.data, t.headers, e.transformResponse)),
                  t
                );
              },
              function (t) {
                return (
                  i(t) ||
                    (s(e),
                    t &&
                      t.response &&
                      (t.response.data = o.call(
                        e,
                        t.response.data,
                        t.response.headers,
                        e.transformResponse
                      ))),
                  Promise.reject(t)
                );
              }
            )
          );
        };
      },
      185: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = function (e, t) {
          t = t || {};
          var r = {};
          function o(e, t) {
            return n.isPlainObject(e) && n.isPlainObject(t)
              ? n.merge(e, t)
              : n.isPlainObject(t)
              ? n.merge({}, t)
              : n.isArray(t)
              ? t.slice()
              : t;
          }
          function i(r) {
            return n.isUndefined(t[r])
              ? n.isUndefined(e[r])
                ? void 0
                : o(void 0, e[r])
              : o(e[r], t[r]);
          }
          function a(e) {
            if (!n.isUndefined(t[e])) return o(void 0, t[e]);
          }
          function u(r) {
            return n.isUndefined(t[r])
              ? n.isUndefined(e[r])
                ? void 0
                : o(void 0, e[r])
              : o(void 0, t[r]);
          }
          function s(r) {
            return r in t ? o(e[r], t[r]) : r in e ? o(void 0, e[r]) : void 0;
          }
          var c = {
            url: a,
            method: a,
            data: a,
            baseURL: u,
            transformRequest: u,
            transformResponse: u,
            paramsSerializer: u,
            timeout: u,
            timeoutMessage: u,
            withCredentials: u,
            adapter: u,
            responseType: u,
            xsrfCookieName: u,
            xsrfHeaderName: u,
            onUploadProgress: u,
            onDownloadProgress: u,
            decompress: u,
            maxContentLength: u,
            maxBodyLength: u,
            beforeRedirect: u,
            transport: u,
            httpAgent: u,
            httpsAgent: u,
            cancelToken: u,
            socketPath: u,
            responseEncoding: u,
            validateStatus: s,
          };
          return (
            n.forEach(Object.keys(e).concat(Object.keys(t)), function (e) {
              var t = c[e] || i,
                o = t(e);
              (n.isUndefined(o) && t !== s) || (r[e] = o);
            }),
            r
          );
        };
      },
      26: (e, t, r) => {
        "use strict";
        var n = r(648);
        e.exports = function (e, t, r) {
          var o = r.config.validateStatus;
          r.status && o && !o(r.status)
            ? t(
                new n(
                  "Request failed with status code " + r.status,
                  [n.ERR_BAD_REQUEST, n.ERR_BAD_RESPONSE][
                    Math.floor(r.status / 100) - 4
                  ],
                  r.config,
                  r.request,
                  r
                )
              )
            : e(r);
        };
      },
      527: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(546);
        e.exports = function (e, t, r) {
          var i = this || o;
          return (
            n.forEach(r, function (r) {
              e = r.call(i, e, t);
            }),
            e
          );
        };
      },
      546: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = r(16),
          i = r(648),
          a = r(874),
          u = r(675),
          s = { "Content-Type": "application/x-www-form-urlencoded" };
        function c(e, t) {
          !n.isUndefined(e) &&
            n.isUndefined(e["Content-Type"]) &&
            (e["Content-Type"] = t);
        }
        var f,
          l = {
            transitional: a,
            adapter:
              (("undefined" != typeof XMLHttpRequest ||
                ("undefined" != typeof process &&
                  "[object process]" ===
                    Object.prototype.toString.call(process))) &&
                (f = r(448)),
              f),
            transformRequest: [
              function (e, t) {
                if (
                  (o(t, "Accept"),
                  o(t, "Content-Type"),
                  n.isFormData(e) ||
                    n.isArrayBuffer(e) ||
                    n.isBuffer(e) ||
                    n.isStream(e) ||
                    n.isFile(e) ||
                    n.isBlob(e))
                )
                  return e;
                if (n.isArrayBufferView(e)) return e.buffer;
                if (n.isURLSearchParams(e))
                  return (
                    c(t, "application/x-www-form-urlencoded;charset=utf-8"),
                    e.toString()
                  );
                var r,
                  i = n.isObject(e),
                  a = t && t["Content-Type"];
                if (
                  (r = n.isFileList(e)) ||
                  (i && "multipart/form-data" === a)
                ) {
                  var s = this.env && this.env.FormData;
                  return u(r ? { "files[]": e } : e, s && new s());
                }
                return i || "application/json" === a
                  ? (c(t, "application/json"),
                    (function (e, t, r) {
                      if (n.isString(e))
                        try {
                          return (0, JSON.parse)(e), n.trim(e);
                        } catch (e) {
                          if ("SyntaxError" !== e.name) throw e;
                        }
                      return (0, JSON.stringify)(e);
                    })(e))
                  : e;
              },
            ],
            transformResponse: [
              function (e) {
                var t = this.transitional || l.transitional,
                  r = t && t.silentJSONParsing,
                  o = t && t.forcedJSONParsing,
                  a = !r && "json" === this.responseType;
                if (a || (o && n.isString(e) && e.length))
                  try {
                    return JSON.parse(e);
                  } catch (e) {
                    if (a) {
                      if ("SyntaxError" === e.name)
                        throw i.from(
                          e,
                          i.ERR_BAD_RESPONSE,
                          this,
                          null,
                          this.response
                        );
                      throw e;
                    }
                  }
                return e;
              },
            ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            env: { FormData: r(623) },
            validateStatus: function (e) {
              return e >= 200 && e < 300;
            },
            headers: {
              common: { Accept: "application/json, text/plain, */*" },
            },
          };
        n.forEach(["delete", "get", "head"], function (e) {
          l.headers[e] = {};
        }),
          n.forEach(["post", "put", "patch"], function (e) {
            l.headers[e] = n.merge(s);
          }),
          (e.exports = l);
      },
      874: (e) => {
        "use strict";
        e.exports = {
          silentJSONParsing: !0,
          forcedJSONParsing: !0,
          clarifyTimeoutError: !1,
        };
      },
      288: (e) => {
        e.exports = { version: "0.27.2" };
      },
      849: (e) => {
        "use strict";
        e.exports = function (e, t) {
          return function () {
            for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
              r[n] = arguments[n];
            return e.apply(t, r);
          };
        };
      },
      327: (e, t, r) => {
        "use strict";
        var n = r(867);
        function o(e) {
          return encodeURIComponent(e)
            .replace(/%3A/gi, ":")
            .replace(/%24/g, "$")
            .replace(/%2C/gi, ",")
            .replace(/%20/g, "+")
            .replace(/%5B/gi, "[")
            .replace(/%5D/gi, "]");
        }
        e.exports = function (e, t, r) {
          if (!t) return e;
          var i;
          if (r) i = r(t);
          else if (n.isURLSearchParams(t)) i = t.toString();
          else {
            var a = [];
            n.forEach(t, function (e, t) {
              null != e &&
                (n.isArray(e) ? (t += "[]") : (e = [e]),
                n.forEach(e, function (e) {
                  n.isDate(e)
                    ? (e = e.toISOString())
                    : n.isObject(e) && (e = JSON.stringify(e)),
                    a.push(o(t) + "=" + o(e));
                }));
            }),
              (i = a.join("&"));
          }
          if (i) {
            var u = e.indexOf("#");
            -1 !== u && (e = e.slice(0, u)),
              (e += (-1 === e.indexOf("?") ? "?" : "&") + i);
          }
          return e;
        };
      },
      303: (e) => {
        "use strict";
        e.exports = function (e, t) {
          return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
        };
      },
      372: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = n.isStandardBrowserEnv()
          ? {
              write: function (e, t, r, o, i, a) {
                var u = [];
                u.push(e + "=" + encodeURIComponent(t)),
                  n.isNumber(r) &&
                    u.push("expires=" + new Date(r).toGMTString()),
                  n.isString(o) && u.push("path=" + o),
                  n.isString(i) && u.push("domain=" + i),
                  !0 === a && u.push("secure"),
                  (document.cookie = u.join("; "));
              },
              read: function (e) {
                var t = document.cookie.match(
                  new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
                );
                return t ? decodeURIComponent(t[3]) : null;
              },
              remove: function (e) {
                this.write(e, "", Date.now() - 864e5);
              },
            }
          : {
              write: function () {},
              read: function () {
                return null;
              },
              remove: function () {},
            };
      },
      793: (e) => {
        "use strict";
        e.exports = function (e) {
          return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
        };
      },
      268: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = function (e) {
          return n.isObject(e) && !0 === e.isAxiosError;
        };
      },
      985: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = n.isStandardBrowserEnv()
          ? (function () {
              var e,
                t = /(msie|trident)/i.test(navigator.userAgent),
                r = document.createElement("a");
              function o(e) {
                var n = e;
                return (
                  t && (r.setAttribute("href", n), (n = r.href)),
                  r.setAttribute("href", n),
                  {
                    href: r.href,
                    protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
                    host: r.host,
                    search: r.search ? r.search.replace(/^\?/, "") : "",
                    hash: r.hash ? r.hash.replace(/^#/, "") : "",
                    hostname: r.hostname,
                    port: r.port,
                    pathname:
                      "/" === r.pathname.charAt(0)
                        ? r.pathname
                        : "/" + r.pathname,
                  }
                );
              }
              return (
                (e = o(window.location.href)),
                function (t) {
                  var r = n.isString(t) ? o(t) : t;
                  return r.protocol === e.protocol && r.host === e.host;
                }
              );
            })()
          : function () {
              return !0;
            };
      },
      16: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = function (e, t) {
          n.forEach(e, function (r, n) {
            n !== t &&
              n.toUpperCase() === t.toUpperCase() &&
              ((e[t] = r), delete e[n]);
          });
        };
      },
      623: (e) => {
        e.exports = null;
      },
      109: (e, t, r) => {
        "use strict";
        var n = r(867),
          o = [
            "age",
            "authorization",
            "content-length",
            "content-type",
            "etag",
            "expires",
            "from",
            "host",
            "if-modified-since",
            "if-unmodified-since",
            "last-modified",
            "location",
            "max-forwards",
            "proxy-authorization",
            "referer",
            "retry-after",
            "user-agent",
          ];
        e.exports = function (e) {
          var t,
            r,
            i,
            a = {};
          return e
            ? (n.forEach(e.split("\n"), function (e) {
                if (
                  ((i = e.indexOf(":")),
                  (t = n.trim(e.substr(0, i)).toLowerCase()),
                  (r = n.trim(e.substr(i + 1))),
                  t)
                ) {
                  if (a[t] && o.indexOf(t) >= 0) return;
                  a[t] =
                    "set-cookie" === t
                      ? (a[t] ? a[t] : []).concat([r])
                      : a[t]
                      ? a[t] + ", " + r
                      : r;
                }
              }),
              a)
            : a;
        };
      },
      205: (e) => {
        "use strict";
        e.exports = function (e) {
          var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
          return (t && t[1]) || "";
        };
      },
      713: (e) => {
        "use strict";
        e.exports = function (e) {
          return function (t) {
            return e.apply(null, t);
          };
        };
      },
      675: (e, t, r) => {
        "use strict";
        var n = r(867);
        e.exports = function (e, t) {
          t = t || new FormData();
          var r = [];
          function o(e) {
            return null === e
              ? ""
              : n.isDate(e)
              ? e.toISOString()
              : n.isArrayBuffer(e) || n.isTypedArray(e)
              ? "function" == typeof Blob
                ? new Blob([e])
                : Buffer.from(e)
              : e;
          }
          return (
            (function e(i, a) {
              if (n.isPlainObject(i) || n.isArray(i)) {
                if (-1 !== r.indexOf(i))
                  throw Error("Circular reference detected in " + a);
                r.push(i),
                  n.forEach(i, function (r, i) {
                    if (!n.isUndefined(r)) {
                      var u,
                        s = a ? a + "." + i : i;
                      if (r && !a && "object" == typeof r)
                        if (n.endsWith(i, "{}")) r = JSON.stringify(r);
                        else if (n.endsWith(i, "[]") && (u = n.toArray(r)))
                          return void u.forEach(function (e) {
                            !n.isUndefined(e) && t.append(s, o(e));
                          });
                      e(r, s);
                    }
                  }),
                  r.pop();
              } else t.append(a, o(i));
            })(e),
            t
          );
        };
      },
      875: (e, t, r) => {
        "use strict";
        var n = r(288).version,
          o = r(648),
          i = {};
        ["object", "boolean", "number", "function", "string", "symbol"].forEach(
          function (e, t) {
            i[e] = function (r) {
              return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
            };
          }
        );
        var a = {};
        (i.transitional = function (e, t, r) {
          function i(e, t) {
            return (
              "[Axios v" +
              n +
              "] Transitional option '" +
              e +
              "'" +
              t +
              (r ? ". " + r : "")
            );
          }
          return function (r, n, u) {
            if (!1 === e)
              throw new o(
                i(n, " has been removed" + (t ? " in " + t : "")),
                o.ERR_DEPRECATED
              );
            return (
              t &&
                !a[n] &&
                ((a[n] = !0),
                console.warn(
                  i(
                    n,
                    " has been deprecated since v" +
                      t +
                      " and will be removed in the near future"
                  )
                )),
              !e || e(r, n, u)
            );
          };
        }),
          (e.exports = {
            assertOptions: function (e, t, r) {
              if ("object" != typeof e)
                throw new o(
                  "options must be an object",
                  o.ERR_BAD_OPTION_VALUE
                );
              for (var n = Object.keys(e), i = n.length; i-- > 0; ) {
                var a = n[i],
                  u = t[a];
                if (u) {
                  var s = e[a],
                    c = void 0 === s || u(s, a, e);
                  if (!0 !== c)
                    throw new o(
                      "option " + a + " must be " + c,
                      o.ERR_BAD_OPTION_VALUE
                    );
                } else if (!0 !== r)
                  throw new o("Unknown option " + a, o.ERR_BAD_OPTION);
              }
            },
            validators: i,
          });
      },
      867: (e, t, r) => {
        "use strict";
        var n,
          o = r(849),
          i = Object.prototype.toString,
          a =
            ((n = Object.create(null)),
            function (e) {
              var t = i.call(e);
              return n[t] || (n[t] = t.slice(8, -1).toLowerCase());
            });
        function u(e) {
          return (
            (e = e.toLowerCase()),
            function (t) {
              return a(t) === e;
            }
          );
        }
        function s(e) {
          return Array.isArray(e);
        }
        function c(e) {
          return void 0 === e;
        }
        var f = u("ArrayBuffer");
        function l(e) {
          return null !== e && "object" == typeof e;
        }
        function p(e) {
          if ("object" !== a(e)) return !1;
          var t = Object.getPrototypeOf(e);
          return null === t || t === Object.prototype;
        }
        var d = u("Date"),
          h = u("File"),
          v = u("Blob"),
          y = u("FileList");
        function m(e) {
          return "[object Function]" === i.call(e);
        }
        var b = u("URLSearchParams");
        function g(e, t) {
          if (null != e)
            if (("object" != typeof e && (e = [e]), s(e)))
              for (var r = 0, n = e.length; r < n; r++)
                t.call(null, e[r], r, e);
            else
              for (var o in e)
                Object.prototype.hasOwnProperty.call(e, o) &&
                  t.call(null, e[o], o, e);
        }
        var O,
          w =
            ((O =
              "undefined" != typeof Uint8Array &&
              Object.getPrototypeOf(Uint8Array)),
            function (e) {
              return O && e instanceof O;
            });
        e.exports = {
          isArray: s,
          isArrayBuffer: f,
          isBuffer: function (e) {
            return (
              null !== e &&
              !c(e) &&
              null !== e.constructor &&
              !c(e.constructor) &&
              "function" == typeof e.constructor.isBuffer &&
              e.constructor.isBuffer(e)
            );
          },
          isFormData: function (e) {
            var t = "[object FormData]";
            return (
              e &&
              (("function" == typeof FormData && e instanceof FormData) ||
                i.call(e) === t ||
                (m(e.toString) && e.toString() === t))
            );
          },
          isArrayBufferView: function (e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
              ? ArrayBuffer.isView(e)
              : e && e.buffer && f(e.buffer);
          },
          isString: function (e) {
            return "string" == typeof e;
          },
          isNumber: function (e) {
            return "number" == typeof e;
          },
          isObject: l,
          isPlainObject: p,
          isUndefined: c,
          isDate: d,
          isFile: h,
          isBlob: v,
          isFunction: m,
          isStream: function (e) {
            return l(e) && m(e.pipe);
          },
          isURLSearchParams: b,
          isStandardBrowserEnv: function () {
            return (
              ("undefined" == typeof navigator ||
                ("ReactNative" !== navigator.product &&
                  "NativeScript" !== navigator.product &&
                  "NS" !== navigator.product)) &&
              "undefined" != typeof window &&
              "undefined" != typeof document
            );
          },
          forEach: g,
          merge: function e() {
            var t = {};
            function r(r, n) {
              p(t[n]) && p(r)
                ? (t[n] = e(t[n], r))
                : p(r)
                ? (t[n] = e({}, r))
                : s(r)
                ? (t[n] = r.slice())
                : (t[n] = r);
            }
            for (var n = 0, o = arguments.length; n < o; n++)
              g(arguments[n], r);
            return t;
          },
          extend: function (e, t, r) {
            return (
              g(t, function (t, n) {
                e[n] = r && "function" == typeof t ? o(t, r) : t;
              }),
              e
            );
          },
          trim: function (e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
          },
          stripBOM: function (e) {
            return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
          },
          inherits: function (e, t, r, n) {
            (e.prototype = Object.create(t.prototype, n)),
              (e.prototype.constructor = e),
              r && Object.assign(e.prototype, r);
          },
          toFlatObject: function (e, t, r) {
            var n,
              o,
              i,
              a = {};
            t = t || {};
            do {
              for (o = (n = Object.getOwnPropertyNames(e)).length; o-- > 0; )
                a[(i = n[o])] || ((t[i] = e[i]), (a[i] = !0));
              e = Object.getPrototypeOf(e);
            } while (e && (!r || r(e, t)) && e !== Object.prototype);
            return t;
          },
          kindOf: a,
          kindOfTest: u,
          endsWith: function (e, t, r) {
            (e = String(e)),
              (void 0 === r || r > e.length) && (r = e.length),
              (r -= t.length);
            var n = e.indexOf(t, r);
            return -1 !== n && n === r;
          },
          toArray: function (e) {
            if (!e) return null;
            var t = e.length;
            if (c(t)) return null;
            for (var r = new Array(t); t-- > 0; ) r[t] = e[t];
            return r;
          },
          isTypedArray: w,
          isFileList: y,
        };
      },
    },
    t = {};
  function r(n) {
    var o = t[n];
    if (void 0 !== o) return o.exports;
    var i = (t[n] = { exports: {} });
    return e[n](i, i.exports, r), i.exports;
  }
  (r.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return r.d(t, { a: t }), t;
  }),
    (r.d = (e, t) => {
      for (var n in t)
        r.o(t, n) &&
          !r.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      var e = {};
      function t(e) {
        for (
          var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1;
          n < t;
          n++
        )
          r[n - 1] = arguments[n];
        throw Error(
          "[Immer] minified error nr: " +
            e +
            (r.length
              ? " " +
                r
                  .map(function (e) {
                    return "'" + e + "'";
                  })
                  .join(",")
              : "") +
            ". Find the full error at: https://bit.ly/3cXEKWf"
        );
      }
      function n(e) {
        return !!e && !!e[W];
      }
      function o(e) {
        return (
          !!e &&
          ((function (e) {
            if (!e || "object" != typeof e) return !1;
            var t = Object.getPrototypeOf(e);
            if (null === t) return !0;
            var r =
              Object.hasOwnProperty.call(t, "constructor") && t.constructor;
            return (
              r === Object ||
              ("function" == typeof r && Function.toString.call(r) === X)
            );
          })(e) ||
            Array.isArray(e) ||
            !!e[z] ||
            !!e.constructor[z] ||
            f(e) ||
            l(e))
        );
      }
      function i(e, t, r) {
        void 0 === r && (r = !1),
          0 === a(e)
            ? (r ? Object.keys : J)(e).forEach(function (n) {
                (r && "symbol" == typeof n) || t(n, e[n], e);
              })
            : e.forEach(function (r, n) {
                return t(n, r, e);
              });
      }
      function a(e) {
        var t = e[W];
        return t
          ? t.i > 3
            ? t.i - 4
            : t.i
          : Array.isArray(e)
          ? 1
          : f(e)
          ? 2
          : l(e)
          ? 3
          : 0;
      }
      function u(e, t) {
        return 2 === a(e)
          ? e.has(t)
          : Object.prototype.hasOwnProperty.call(e, t);
      }
      function s(e, t, r) {
        var n = a(e);
        2 === n ? e.set(t, r) : 3 === n ? (e.delete(t), e.add(r)) : (e[t] = r);
      }
      function c(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
      }
      function f(e) {
        return I && e instanceof Map;
      }
      function l(e) {
        return F && e instanceof Set;
      }
      function p(e) {
        return e.o || e.t;
      }
      function d(e) {
        if (Array.isArray(e)) return Array.prototype.slice.call(e);
        var t = K(e);
        delete t[W];
        for (var r = J(t), n = 0; n < r.length; n++) {
          var o = r[n],
            i = t[o];
          !1 === i.writable && ((i.writable = !0), (i.configurable = !0)),
            (i.get || i.set) &&
              (t[o] = {
                configurable: !0,
                writable: !0,
                enumerable: i.enumerable,
                value: e[o],
              });
        }
        return Object.create(Object.getPrototypeOf(e), t);
      }
      function h(e, t) {
        return (
          void 0 === t && (t = !1),
          y(e) ||
            n(e) ||
            !o(e) ||
            (a(e) > 1 && (e.set = e.add = e.clear = e.delete = v),
            Object.freeze(e),
            t &&
              i(
                e,
                function (e, t) {
                  return h(t, !0);
                },
                !0
              )),
          e
        );
      }
      function v() {
        t(2);
      }
      function y(e) {
        return null == e || "object" != typeof e || Object.isFrozen(e);
      }
      function m(e) {
        var r = V[e];
        return r || t(18, e), r;
      }
      function b() {
        return B;
      }
      function g(e, t) {
        t && (m("Patches"), (e.u = []), (e.s = []), (e.v = t));
      }
      function O(e) {
        w(e), e.p.forEach(P), (e.p = null);
      }
      function w(e) {
        e === B && (B = e.l);
      }
      function E(e) {
        return (B = { p: [], l: B, h: e, m: !0, _: 0 });
      }
      function P(e) {
        var t = e[W];
        0 === t.i || 1 === t.i ? t.j() : (t.O = !0);
      }
      function j(e, r) {
        r._ = r.p.length;
        var n = r.p[0],
          i = void 0 !== e && e !== n;
        return (
          r.h.g || m("ES5").S(r, e, i),
          i
            ? (n[W].P && (O(r), t(4)),
              o(e) && ((e = S(r, e)), r.l || A(r, e)),
              r.u && m("Patches").M(n[W].t, e, r.u, r.s))
            : (e = S(r, n, [])),
          O(r),
          r.u && r.v(r.u, r.s),
          e !== q ? e : void 0
        );
      }
      function S(e, t, r) {
        if (y(t)) return t;
        var n = t[W];
        if (!n)
          return (
            i(
              t,
              function (o, i) {
                return x(e, n, t, o, i, r);
              },
              !0
            ),
            t
          );
        if (n.A !== e) return t;
        if (!n.P) return A(e, n.t, !0), n.t;
        if (!n.I) {
          (n.I = !0), n.A._--;
          var o = 4 === n.i || 5 === n.i ? (n.o = d(n.k)) : n.o;
          i(3 === n.i ? new Set(o) : o, function (t, i) {
            return x(e, n, o, t, i, r);
          }),
            A(e, o, !1),
            r && e.u && m("Patches").R(n, r, e.u, e.s);
        }
        return n.o;
      }
      function x(e, t, r, i, a, c) {
        if (n(a)) {
          var f = S(
            e,
            a,
            c && t && 3 !== t.i && !u(t.D, i) ? c.concat(i) : void 0
          );
          if ((s(r, i, f), !n(f))) return;
          e.m = !1;
        }
        if (o(a) && !y(a)) {
          if (!e.h.F && e._ < 1) return;
          S(e, a), (t && t.A.l) || A(e, a);
        }
      }
      function A(e, t, r) {
        void 0 === r && (r = !1), e.h.F && e.m && h(t, r);
      }
      function R(e, t) {
        var r = e[W];
        return (r ? p(r) : e)[t];
      }
      function _(e, t) {
        if (t in e)
          for (var r = Object.getPrototypeOf(e); r; ) {
            var n = Object.getOwnPropertyDescriptor(r, t);
            if (n) return n;
            r = Object.getPrototypeOf(r);
          }
      }
      function T(e) {
        e.P || ((e.P = !0), e.l && T(e.l));
      }
      function N(e) {
        e.o || (e.o = d(e.t));
      }
      function C(e, t, r) {
        var n = f(t)
          ? m("MapSet").N(t, r)
          : l(t)
          ? m("MapSet").T(t, r)
          : e.g
          ? (function (e, t) {
              var r = Array.isArray(e),
                n = {
                  i: r ? 1 : 0,
                  A: t ? t.A : b(),
                  P: !1,
                  I: !1,
                  D: {},
                  l: t,
                  t: e,
                  k: null,
                  o: null,
                  j: null,
                  C: !1,
                },
                o = n,
                i = H;
              r && ((o = [n]), (i = $));
              var a = Proxy.revocable(o, i),
                u = a.revoke,
                s = a.proxy;
              return (n.k = s), (n.j = u), s;
            })(t, r)
          : m("ES5").J(t, r);
        return (r ? r.A : b()).p.push(n), n;
      }
      function D(e) {
        return (
          n(e) || t(22, e),
          (function e(t) {
            if (!o(t)) return t;
            var r,
              n = t[W],
              u = a(t);
            if (n) {
              if (!n.P && (n.i < 4 || !m("ES5").K(n))) return n.t;
              (n.I = !0), (r = U(t, u)), (n.I = !1);
            } else r = U(t, u);
            return (
              i(r, function (t, o) {
                (n &&
                  (function (e, t) {
                    return 2 === a(e) ? e.get(t) : e[t];
                  })(n.t, t) === o) ||
                  s(r, t, e(o));
              }),
              3 === u ? new Set(r) : r
            );
          })(e)
        );
      }
      function U(e, t) {
        switch (t) {
          case 2:
            return new Map(e);
          case 3:
            return Array.from(e);
        }
        return d(e);
      }
      r.r(e),
        r.d(e, {
          getPostToken: () => Ie,
          getUser: () => Le,
          sendComment: () => Be,
          updateText: () => Fe,
        });
      var k,
        B,
        L = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
        I = "undefined" != typeof Map,
        F = "undefined" != typeof Set,
        M =
          "undefined" != typeof Proxy &&
          void 0 !== Proxy.revocable &&
          "undefined" != typeof Reflect,
        q = L
          ? Symbol.for("immer-nothing")
          : (((k = {})["immer-nothing"] = !0), k),
        z = L ? Symbol.for("immer-draftable") : "__$immer_draftable",
        W = L ? Symbol.for("immer-state") : "__$immer_state",
        X =
          ("undefined" != typeof Symbol && Symbol.iterator,
          "" + Object.prototype.constructor),
        J =
          "undefined" != typeof Reflect && Reflect.ownKeys
            ? Reflect.ownKeys
            : void 0 !== Object.getOwnPropertySymbols
            ? function (e) {
                return Object.getOwnPropertyNames(e).concat(
                  Object.getOwnPropertySymbols(e)
                );
              }
            : Object.getOwnPropertyNames,
        K =
          Object.getOwnPropertyDescriptors ||
          function (e) {
            var t = {};
            return (
              J(e).forEach(function (r) {
                t[r] = Object.getOwnPropertyDescriptor(e, r);
              }),
              t
            );
          },
        V = {},
        H = {
          get: function (e, t) {
            if (t === W) return e;
            var r = p(e);
            if (!u(r, t))
              return (function (e, t, r) {
                var n,
                  o = _(t, r);
                return o
                  ? "value" in o
                    ? o.value
                    : null === (n = o.get) || void 0 === n
                    ? void 0
                    : n.call(e.k)
                  : void 0;
              })(e, r, t);
            var n = r[t];
            return e.I || !o(n)
              ? n
              : n === R(e.t, t)
              ? (N(e), (e.o[t] = C(e.A.h, n, e)))
              : n;
          },
          has: function (e, t) {
            return t in p(e);
          },
          ownKeys: function (e) {
            return Reflect.ownKeys(p(e));
          },
          set: function (e, t, r) {
            var n = _(p(e), t);
            if (null == n ? void 0 : n.set) return n.set.call(e.k, r), !0;
            if (!e.P) {
              var o = R(p(e), t),
                i = null == o ? void 0 : o[W];
              if (i && i.t === r) return (e.o[t] = r), (e.D[t] = !1), !0;
              if (c(r, o) && (void 0 !== r || u(e.t, t))) return !0;
              N(e), T(e);
            }
            return (
              (e.o[t] === r &&
                "number" != typeof r &&
                (void 0 !== r || t in e.o)) ||
              ((e.o[t] = r), (e.D[t] = !0), !0)
            );
          },
          deleteProperty: function (e, t) {
            return (
              void 0 !== R(e.t, t) || t in e.t
                ? ((e.D[t] = !1), N(e), T(e))
                : delete e.D[t],
              e.o && delete e.o[t],
              !0
            );
          },
          getOwnPropertyDescriptor: function (e, t) {
            var r = p(e),
              n = Reflect.getOwnPropertyDescriptor(r, t);
            return n
              ? {
                  writable: !0,
                  configurable: 1 !== e.i || "length" !== t,
                  enumerable: n.enumerable,
                  value: r[t],
                }
              : n;
          },
          defineProperty: function () {
            t(11);
          },
          getPrototypeOf: function (e) {
            return Object.getPrototypeOf(e.t);
          },
          setPrototypeOf: function () {
            t(12);
          },
        },
        $ = {};
      i(H, function (e, t) {
        $[e] = function () {
          return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
        };
      }),
        ($.deleteProperty = function (e, t) {
          return $.set.call(this, e, t, void 0);
        }),
        ($.set = function (e, t, r) {
          return H.set.call(this, e[0], t, r, e[0]);
        });
      var G = (function () {
          function e(e) {
            var r = this;
            (this.g = M),
              (this.F = !0),
              (this.produce = function (e, n, i) {
                if ("function" == typeof e && "function" != typeof n) {
                  var a = n;
                  n = e;
                  var u = r;
                  return function (e) {
                    var t = this;
                    void 0 === e && (e = a);
                    for (
                      var r = arguments.length,
                        o = Array(r > 1 ? r - 1 : 0),
                        i = 1;
                      i < r;
                      i++
                    )
                      o[i - 1] = arguments[i];
                    return u.produce(e, function (e) {
                      var r;
                      return (r = n).call.apply(r, [t, e].concat(o));
                    });
                  };
                }
                var s;
                if (
                  ("function" != typeof n && t(6),
                  void 0 !== i && "function" != typeof i && t(7),
                  o(e))
                ) {
                  var c = E(r),
                    f = C(r, e, void 0),
                    l = !0;
                  try {
                    (s = n(f)), (l = !1);
                  } finally {
                    l ? O(c) : w(c);
                  }
                  return "undefined" != typeof Promise && s instanceof Promise
                    ? s.then(
                        function (e) {
                          return g(c, i), j(e, c);
                        },
                        function (e) {
                          throw (O(c), e);
                        }
                      )
                    : (g(c, i), j(s, c));
                }
                if (!e || "object" != typeof e) {
                  if (
                    (void 0 === (s = n(e)) && (s = e),
                    s === q && (s = void 0),
                    r.F && h(s, !0),
                    i)
                  ) {
                    var p = [],
                      d = [];
                    m("Patches").M(e, s, p, d), i(p, d);
                  }
                  return s;
                }
                t(21, e);
              }),
              (this.produceWithPatches = function (e, t) {
                if ("function" == typeof e)
                  return function (t) {
                    for (
                      var n = arguments.length,
                        o = Array(n > 1 ? n - 1 : 0),
                        i = 1;
                      i < n;
                      i++
                    )
                      o[i - 1] = arguments[i];
                    return r.produceWithPatches(t, function (t) {
                      return e.apply(void 0, [t].concat(o));
                    });
                  };
                var n,
                  o,
                  i = r.produce(e, t, function (e, t) {
                    (n = e), (o = t);
                  });
                return "undefined" != typeof Promise && i instanceof Promise
                  ? i.then(function (e) {
                      return [e, n, o];
                    })
                  : [i, n, o];
              }),
              "boolean" == typeof (null == e ? void 0 : e.useProxies) &&
                this.setUseProxies(e.useProxies),
              "boolean" == typeof (null == e ? void 0 : e.autoFreeze) &&
                this.setAutoFreeze(e.autoFreeze);
          }
          var r = e.prototype;
          return (
            (r.createDraft = function (e) {
              o(e) || t(8), n(e) && (e = D(e));
              var r = E(this),
                i = C(this, e, void 0);
              return (i[W].C = !0), w(r), i;
            }),
            (r.finishDraft = function (e, t) {
              var r = (e && e[W]).A;
              return g(r, t), j(void 0, r);
            }),
            (r.setAutoFreeze = function (e) {
              this.F = e;
            }),
            (r.setUseProxies = function (e) {
              e && !M && t(20), (this.g = e);
            }),
            (r.applyPatches = function (e, t) {
              var r;
              for (r = t.length - 1; r >= 0; r--) {
                var o = t[r];
                if (0 === o.path.length && "replace" === o.op) {
                  e = o.value;
                  break;
                }
              }
              r > -1 && (t = t.slice(r + 1));
              var i = m("Patches").$;
              return n(e)
                ? i(e, t)
                : this.produce(e, function (e) {
                    return i(e, t);
                  });
            }),
            e
          );
        })(),
        Q = new G();
      function Y(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function Z(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function ee(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Z(Object(r), !0).forEach(function (t) {
                Y(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : Z(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function te(e) {
        return (
          "Minified Redux error #" +
          e +
          "; visit https://redux.js.org/Errors?code=" +
          e +
          " for the full message or use the non-minified dev environment for full errors. "
        );
      }
      Q.produce,
        Q.produceWithPatches.bind(Q),
        Q.setAutoFreeze.bind(Q),
        Q.setUseProxies.bind(Q),
        Q.applyPatches.bind(Q),
        Q.createDraft.bind(Q),
        Q.finishDraft.bind(Q);
      var re =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable",
        ne = function () {
          return Math.random().toString(36).substring(7).split("").join(".");
        },
        oe = {
          INIT: "@@redux/INIT" + ne(),
          REPLACE: "@@redux/REPLACE" + ne(),
          PROBE_UNKNOWN_ACTION: function () {
            return "@@redux/PROBE_UNKNOWN_ACTION" + ne();
          },
        };
      function ie(e) {
        if ("object" != typeof e || null === e) return !1;
        for (var t = e; null !== Object.getPrototypeOf(t); )
          t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t;
      }
      function ae(e, t, r) {
        var n;
        if (
          ("function" == typeof t && "function" == typeof r) ||
          ("function" == typeof r && "function" == typeof arguments[3])
        )
          throw new Error(te(0));
        if (
          ("function" == typeof t && void 0 === r && ((r = t), (t = void 0)),
          void 0 !== r)
        ) {
          if ("function" != typeof r) throw new Error(te(1));
          return r(ae)(e, t);
        }
        if ("function" != typeof e) throw new Error(te(2));
        var o = e,
          i = t,
          a = [],
          u = a,
          s = !1;
        function c() {
          u === a && (u = a.slice());
        }
        function f() {
          if (s) throw new Error(te(3));
          return i;
        }
        function l(e) {
          if ("function" != typeof e) throw new Error(te(4));
          if (s) throw new Error(te(5));
          var t = !0;
          return (
            c(),
            u.push(e),
            function () {
              if (t) {
                if (s) throw new Error(te(6));
                (t = !1), c();
                var r = u.indexOf(e);
                u.splice(r, 1), (a = null);
              }
            }
          );
        }
        function p(e) {
          if (!ie(e)) throw new Error(te(7));
          if (void 0 === e.type) throw new Error(te(8));
          if (s) throw new Error(te(9));
          try {
            (s = !0), (i = o(i, e));
          } finally {
            s = !1;
          }
          for (var t = (a = u), r = 0; r < t.length; r++) (0, t[r])();
          return e;
        }
        function d(e) {
          if ("function" != typeof e) throw new Error(te(10));
          (o = e), p({ type: oe.REPLACE });
        }
        function h() {
          var e,
            t = l;
          return (
            ((e = {
              subscribe: function (e) {
                if ("object" != typeof e || null === e) throw new Error(te(11));
                function r() {
                  e.next && e.next(f());
                }
                return r(), { unsubscribe: t(r) };
              },
            })[re] = function () {
              return this;
            }),
            e
          );
        }
        return (
          p({ type: oe.INIT }),
          ((n = { dispatch: p, subscribe: l, getState: f, replaceReducer: d })[
            re
          ] = h),
          n
        );
      }
      function ue(e, t) {
        return function () {
          return t(e.apply(this, arguments));
        };
      }
      function se() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return 0 === t.length
          ? function (e) {
              return e;
            }
          : 1 === t.length
          ? t[0]
          : t.reduce(function (e, t) {
              return function () {
                return e(t.apply(void 0, arguments));
              };
            });
      }
      function ce() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return function (e) {
          return function () {
            var r = e.apply(void 0, arguments),
              n = function () {
                throw new Error(te(15));
              },
              o = {
                getState: r.getState,
                dispatch: function () {
                  return n.apply(void 0, arguments);
                },
              },
              i = t.map(function (e) {
                return e(o);
              });
            return (
              (n = se.apply(void 0, i)(r.dispatch)),
              ee(ee({}, r), {}, { dispatch: n })
            );
          };
        };
      }
      function fe(e) {
        return function (t) {
          var r = t.dispatch,
            n = t.getState;
          return function (t) {
            return function (o) {
              return "function" == typeof o ? o(r, n, e) : t(o);
            };
          };
        };
      }
      var le = fe();
      le.withExtraArgument = fe;
      const pe = le;
      var de,
        he =
          ((de = function (e, t) {
            return (
              (de =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, t) {
                    e.__proto__ = t;
                  }) ||
                function (e, t) {
                  for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                }),
              de(e, t)
            );
          }),
          function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Class extends value " +
                  String(t) +
                  " is not a constructor or null"
              );
            function r() {
              this.constructor = e;
            }
            de(e, t),
              (e.prototype =
                null === t
                  ? Object.create(t)
                  : ((r.prototype = t.prototype), new r()));
          }),
        ve = function (e, t) {
          for (var r = 0, n = t.length, o = e.length; r < n; r++, o++)
            e[o] = t[r];
          return e;
        },
        ye = Object.defineProperty,
        me =
          (Object.defineProperties,
          Object.getOwnPropertyDescriptors,
          Object.getOwnPropertySymbols),
        be = Object.prototype.hasOwnProperty,
        ge = Object.prototype.propertyIsEnumerable,
        Oe = function (e, t, r) {
          return t in e
            ? ye(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: r,
              })
            : (e[t] = r);
        },
        we = function (e, t) {
          for (var r in t || (t = {})) be.call(t, r) && Oe(e, r, t[r]);
          if (me)
            for (var n = 0, o = me(t); n < o.length; n++)
              (r = o[n]), ge.call(t, r) && Oe(e, r, t[r]);
          return e;
        },
        Ee =
          "undefined" != typeof window &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : function () {
                if (0 !== arguments.length)
                  return "object" == typeof arguments[0]
                    ? se
                    : se.apply(null, arguments);
              };
      "undefined" != typeof window &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__;
      var Pe = (function (e) {
        function t() {
          for (var r = [], n = 0; n < arguments.length; n++)
            r[n] = arguments[n];
          var o = e.apply(this, r) || this;
          return Object.setPrototypeOf(o, t.prototype), o;
        }
        return (
          he(t, e),
          Object.defineProperty(t, Symbol.species, {
            get: function () {
              return t;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.concat = function () {
            for (var t = [], r = 0; r < arguments.length; r++)
              t[r] = arguments[r];
            return e.prototype.concat.apply(this, t);
          }),
          (t.prototype.prepend = function () {
            for (var e = [], r = 0; r < arguments.length; r++)
              e[r] = arguments[r];
            return 1 === e.length && Array.isArray(e[0])
              ? new (t.bind.apply(t, ve([void 0], e[0].concat(this))))()
              : new (t.bind.apply(t, ve([void 0], e.concat(this))))();
          }),
          t
        );
      })(Array);
      function je(e, t) {
        function r() {
          for (var r = [], n = 0; n < arguments.length; n++)
            r[n] = arguments[n];
          if (t) {
            var o = t.apply(void 0, r);
            if (!o) throw new Error("prepareAction did not return an object");
            return we(
              we(
                { type: e, payload: o.payload },
                "meta" in o && { meta: o.meta }
              ),
              "error" in o && { error: o.error }
            );
          }
          return { type: e, payload: r[0] };
        }
        return (
          (r.toString = function () {
            return "" + e;
          }),
          (r.type = e),
          (r.match = function (t) {
            return t.type === e;
          }),
          r
        );
      }
      Object.assign;
      var Se = "listenerMiddleware";
      je(Se + "/add"),
        je(Se + "/removeAll"),
        je(Se + "/remove"),
        (function () {
          function e(e, t) {
            var r = a[e];
            return (
              r
                ? (r.enumerable = t)
                : (a[e] = r =
                    {
                      configurable: !0,
                      enumerable: t,
                      get: function () {
                        var t = this[W];
                        return H.get(t, e);
                      },
                      set: function (t) {
                        var r = this[W];
                        H.set(r, e, t);
                      },
                    }),
              r
            );
          }
          function t(e) {
            for (var t = e.length - 1; t >= 0; t--) {
              var n = e[t][W];
              if (!n.P)
                switch (n.i) {
                  case 5:
                    o(n) && T(n);
                    break;
                  case 4:
                    r(n) && T(n);
                }
            }
          }
          function r(e) {
            for (
              var t = e.t, r = e.k, n = J(r), o = n.length - 1;
              o >= 0;
              o--
            ) {
              var i = n[o];
              if (i !== W) {
                var a = t[i];
                if (void 0 === a && !u(t, i)) return !0;
                var s = r[i],
                  f = s && s[W];
                if (f ? f.t !== a : !c(s, a)) return !0;
              }
            }
            var l = !!t[W];
            return n.length !== J(t).length + (l ? 0 : 1);
          }
          function o(e) {
            var t = e.k;
            if (t.length !== e.t.length) return !0;
            var r = Object.getOwnPropertyDescriptor(t, t.length - 1);
            if (r && !r.get) return !0;
            for (var n = 0; n < t.length; n++)
              if (!t.hasOwnProperty(n)) return !0;
            return !1;
          }
          var a = {};
          !(function (e, t) {
            V[e] || (V[e] = t);
          })("ES5", {
            J: function (t, r) {
              var n = Array.isArray(t),
                o = (function (t, r) {
                  if (t) {
                    for (var n = Array(r.length), o = 0; o < r.length; o++)
                      Object.defineProperty(n, "" + o, e(o, !0));
                    return n;
                  }
                  var i = K(r);
                  delete i[W];
                  for (var a = J(i), u = 0; u < a.length; u++) {
                    var s = a[u];
                    i[s] = e(s, t || !!i[s].enumerable);
                  }
                  return Object.create(Object.getPrototypeOf(r), i);
                })(n, t),
                i = {
                  i: n ? 5 : 4,
                  A: r ? r.A : b(),
                  P: !1,
                  I: !1,
                  D: {},
                  l: r,
                  t,
                  k: o,
                  o: null,
                  O: !1,
                  C: !1,
                };
              return Object.defineProperty(o, W, { value: i, writable: !0 }), o;
            },
            S: function (e, r, a) {
              a
                ? n(r) && r[W].A === e && t(e.p)
                : (e.u &&
                    (function e(t) {
                      if (t && "object" == typeof t) {
                        var r = t[W];
                        if (r) {
                          var n = r.t,
                            a = r.k,
                            s = r.D,
                            c = r.i;
                          if (4 === c)
                            i(a, function (t) {
                              t !== W &&
                                (void 0 !== n[t] || u(n, t)
                                  ? s[t] || e(a[t])
                                  : ((s[t] = !0), T(r)));
                            }),
                              i(n, function (e) {
                                void 0 !== a[e] ||
                                  u(a, e) ||
                                  ((s[e] = !1), T(r));
                              });
                          else if (5 === c) {
                            if (
                              (o(r) && (T(r), (s.length = !0)),
                              a.length < n.length)
                            )
                              for (var f = a.length; f < n.length; f++)
                                s[f] = !1;
                            else
                              for (var l = n.length; l < a.length; l++)
                                s[l] = !0;
                            for (
                              var p = Math.min(a.length, n.length), d = 0;
                              d < p;
                              d++
                            )
                              a.hasOwnProperty(d) || (s[d] = !0),
                                void 0 === s[d] && e(a[d]);
                          }
                        }
                      }
                    })(e.p[0]),
                  t(e.p));
            },
            K: function (e) {
              return 4 === e.i ? r(e) : o(e);
            },
          });
        })();
      var xe = r(669),
        Ae = r.n(xe);
      const Re = "SEND_COMMENT",
        _e = "GET_USER",
        Te = "UPDATE_TEXT",
        Ne = "GET_POST",
        Ce = { token: "", text: "", postUid: "" };
      function De(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r) e[n] = r[n];
        }
        return e;
      }
      var Ue = (function e(t, r) {
        function n(e, n, o) {
          if ("undefined" != typeof document) {
            "number" == typeof (o = De({}, r, o)).expires &&
              (o.expires = new Date(Date.now() + 864e5 * o.expires)),
              o.expires && (o.expires = o.expires.toUTCString()),
              (e = encodeURIComponent(e)
                .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                .replace(/[()]/g, escape));
            var i = "";
            for (var a in o)
              o[a] &&
                ((i += "; " + a),
                !0 !== o[a] && (i += "=" + o[a].split(";")[0]));
            return (document.cookie = e + "=" + t.write(n, e) + i);
          }
        }
        return Object.create(
          {
            set: n,
            get: function (e) {
              if ("undefined" != typeof document && (!arguments.length || e)) {
                for (
                  var r = document.cookie ? document.cookie.split("; ") : [],
                    n = {},
                    o = 0;
                  o < r.length;
                  o++
                ) {
                  var i = r[o].split("="),
                    a = i.slice(1).join("=");
                  try {
                    var u = decodeURIComponent(i[0]);
                    if (((n[u] = t.read(a, u)), e === u)) break;
                  } catch (e) {}
                }
                return e ? n[e] : n;
              }
            },
            remove: function (e, t) {
              n(e, "", De({}, t, { expires: -1 }));
            },
            withAttributes: function (t) {
              return e(this.converter, De({}, this.attributes, t));
            },
            withConverter: function (t) {
              return e(De({}, this.converter, t), this.attributes);
            },
          },
          {
            attributes: { value: Object.freeze(r) },
            converter: { value: Object.freeze(t) },
          }
        );
      })(
        {
          read: function (e) {
            return (
              '"' === e[0] && (e = e.slice(1, -1)),
              e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
            );
          },
          write: function (e) {
            return encodeURIComponent(e).replace(
              /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
              decodeURIComponent
            );
          },
        },
        { path: "/" }
      );
      const ke = Ue,
        Be = () => ({ type: Re }),
        Le = (e) => ({ type: _e, payload: e }),
        Ie = (e) => ({ type: Ne, payload: e }),
        Fe = (e) => ({ type: Te, payload: e }),
        Me = (function (e) {
          var t,
            r = function (e) {
              return (function (e) {
                void 0 === e && (e = {});
                var t = e.thunk,
                  r = void 0 === t || t,
                  n = (e.immutableCheck, e.serializableCheck, new Pe());
                return (
                  r &&
                    ((function (e) {
                      return "boolean" == typeof e;
                    })(r)
                      ? n.push(pe)
                      : n.push(pe.withExtraArgument(r.extraArgument))),
                  n
                );
              })(e);
            },
            n = e || {},
            o = n.reducer,
            i = void 0 === o ? void 0 : o,
            a = n.middleware,
            u = void 0 === a ? r() : a,
            s = n.devTools,
            c = void 0 === s || s,
            f = n.preloadedState,
            l = void 0 === f ? void 0 : f,
            p = n.enhancers,
            d = void 0 === p ? void 0 : p;
          if ("function" == typeof i) t = i;
          else {
            if (
              !(function (e) {
                if ("object" != typeof e || null === e) return !1;
                var t = Object.getPrototypeOf(e);
                if (null === t) return !0;
                for (var r = t; null !== Object.getPrototypeOf(r); )
                  r = Object.getPrototypeOf(r);
                return t === r;
              })(i)
            )
              throw new Error(
                '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
              );
            t = (function (e) {
              for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
                var o = t[n];
                "function" == typeof e[o] && (r[o] = e[o]);
              }
              var i,
                a = Object.keys(r);
              try {
                !(function (e) {
                  Object.keys(e).forEach(function (t) {
                    var r = e[t];
                    if (void 0 === r(void 0, { type: oe.INIT }))
                      throw new Error(te(12));
                    if (
                      void 0 === r(void 0, { type: oe.PROBE_UNKNOWN_ACTION() })
                    )
                      throw new Error(te(13));
                  });
                })(r);
              } catch (e) {
                i = e;
              }
              return function (e, t) {
                if ((void 0 === e && (e = {}), i)) throw i;
                for (var n = !1, o = {}, u = 0; u < a.length; u++) {
                  var s = a[u],
                    c = r[s],
                    f = e[s],
                    l = c(f, t);
                  if (void 0 === l) throw (t && t.type, new Error(te(14)));
                  (o[s] = l), (n = n || l !== f);
                }
                return (n = n || a.length !== Object.keys(e).length) ? o : e;
              };
            })(i);
          }
          var h = u;
          "function" == typeof h && (h = h(r));
          var v = ce.apply(void 0, h),
            y = se;
          c && (y = Ee(we({ trace: !1 }, "object" == typeof c && c)));
          var m = [v];
          return (
            Array.isArray(d)
              ? (m = ve([v], d))
              : "function" == typeof d && (m = d(m)),
            ae(t, l, y.apply(void 0, m))
          );
        })({
          reducer: (e = Ce, t) => {
            switch (t.type) {
              case Re:
                return (
                  e.text
                    ? Ae()
                        .post("/blog/add_comment", e)
                        .then((e) => {
                          let t = e.data,
                            r = document.createElement("div");
                          (r.className = "comment"),
                            (r.innerHTML = `<h1>Прокомментировал: <span>${t.username}</span></h1>\n                                    <p>Говорит, что: <span>${t.text}</span></p>`),
                            document.querySelector("#commentLine").append(r);
                        })
                    : alert("Сообщение не должно быть пустым"),
                  (document.querySelector("#comment").value = ""),
                  { ...e, text: "" }
                );
              case Te:
                return { ...e, text: t.payload };
              case Ne:
                return { ...e, postUid: t.payload };
              case _e:
                return { ...e, token: t.payload };
              default:
                return e;
            }
          },
        }),
        {
          updateText: qe,
          getUser: ze,
          sendComment: We,
          getPostToken: Xe,
        } = (function (e, t) {
          if ("function" == typeof e) return ue(e, t);
          if ("object" != typeof e || null === e) throw new Error(te(16));
          var r = {};
          for (var n in e) {
            var o = e[n];
            "function" == typeof o && (r[n] = ue(o, t));
          }
          return r;
        })(e, Me.dispatch);
      Me.subscribe(() => {
        console.log(Me.getState());
      }),
        document.querySelector("#comment")?.addEventListener("input", (e) => {
          qe(e.target.value);
        }),
        document.addEventListener("DOMContentLoaded", () => {
          const e = ke.get("token"),
            t = ke.get("post_uid");
          Xe(t), e && ze(e);
        }),
        document
          .querySelector("#submitButton")
          ?.addEventListener("click", (e) => {
            e.preventDefault(), We();
          });
    })();
})();
