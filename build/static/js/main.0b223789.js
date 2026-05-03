/*! For license information please see main.0b223789.js.LICENSE.txt */
(() => {
  'use strict';
  var e = {
      175: (e, t) => {
        const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
          r = /^[\u0021-\u003A\u003C-\u007E]*$/,
          i =
            /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
          o = /^[\u0020-\u003A\u003D-\u007E]*$/,
          a = Object.prototype.toString,
          s = (() => {
            const e = function () {};
            return (e.prototype = Object.create(null)), e;
          })();
        function l(e, t, n) {
          do {
            const n = e.charCodeAt(t);
            if (32 !== n && 9 !== n) return t;
          } while (++t < n);
          return n;
        }
        function u(e, t, n) {
          for (; t > n; ) {
            const n = e.charCodeAt(--t);
            if (32 !== n && 9 !== n) return t + 1;
          }
          return n;
        }
        function c(e) {
          if (-1 === e.indexOf('%')) return e;
          try {
            return decodeURIComponent(e);
          } catch (t) {
            return e;
          }
        }
      },
      730: (e, t, n) => {
        var r = n(43),
          i = n(853);
        function o(e) {
          for (
            var t =
                'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
              n = 1;
            n < arguments.length;
            n++
          )
            t += '&args[]=' + encodeURIComponent(arguments[n]);
          return (
            'Minified React error #' +
            e +
            '; visit ' +
            t +
            ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
          );
        }
        var a = new Set(),
          s = {};
        function l(e, t) {
          u(e, t), u(e + 'Capture', t);
        }
        function u(e, t) {
          for (s[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
        }
        var c = !(
            'undefined' === typeof window ||
            'undefined' === typeof window.document ||
            'undefined' === typeof window.document.createElement
          ),
          d = Object.prototype.hasOwnProperty,
          h =
            /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
          f = {},
          p = {};
        function m(e, t, n, r, i, o, a) {
          (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
            (this.attributeName = r),
            (this.attributeNamespace = i),
            (this.mustUseProperty = n),
            (this.propertyName = e),
            (this.type = t),
            (this.sanitizeURL = o),
            (this.removeEmptyString = a);
        }
        var g = {};
        'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
          .split(' ')
          .forEach(function (e) {
            g[e] = new m(e, 0, !1, e, null, !1, !1);
          }),
          [
            ['acceptCharset', 'accept-charset'],
            ['className', 'class'],
            ['htmlFor', 'for'],
            ['httpEquiv', 'http-equiv'],
          ].forEach(function (e) {
            var t = e[0];
            g[t] = new m(t, 1, !1, e[1], null, !1, !1);
          }),
          ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
            function (e) {
              g[e] = new m(e, 2, !1, e.toLowerCase(), null, !1, !1);
            }
          ),
          [
            'autoReverse',
            'externalResourcesRequired',
            'focusable',
            'preserveAlpha',
          ].forEach(function (e) {
            g[e] = new m(e, 2, !1, e, null, !1, !1);
          }),
          'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
            .split(' ')
            .forEach(function (e) {
              g[e] = new m(e, 3, !1, e.toLowerCase(), null, !1, !1);
            }),
          ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
            g[e] = new m(e, 3, !0, e, null, !1, !1);
          }),
          ['capture', 'download'].forEach(function (e) {
            g[e] = new m(e, 4, !1, e, null, !1, !1);
          }),
          ['cols', 'rows', 'size', 'span'].forEach(function (e) {
            g[e] = new m(e, 6, !1, e, null, !1, !1);
          }),
          ['rowSpan', 'start'].forEach(function (e) {
            g[e] = new m(e, 5, !1, e.toLowerCase(), null, !1, !1);
          });
        var v = /[\-:]([a-z])/g;
        function y(e) {
          return e[1].toUpperCase();
        }
        function A(e, t, n, r) {
          var i = g.hasOwnProperty(t) ? g[t] : null;
          (null !== i
            ? 0 !== i.type
            : r ||
              !(2 < t.length) ||
              ('o' !== t[0] && 'O' !== t[0]) ||
              ('n' !== t[1] && 'N' !== t[1])) &&
            ((function (e, t, n, r) {
              if (
                null === t ||
                'undefined' === typeof t ||
                (function (e, t, n, r) {
                  if (null !== n && 0 === n.type) return !1;
                  switch (typeof t) {
                    case 'function':
                    case 'symbol':
                      return !0;
                    case 'boolean':
                      return (
                        !r &&
                        (null !== n
                          ? !n.acceptsBooleans
                          : 'data-' !== (e = e.toLowerCase().slice(0, 5)) &&
                            'aria-' !== e)
                      );
                    default:
                      return !1;
                  }
                })(e, t, n, r)
              )
                return !0;
              if (r) return !1;
              if (null !== n)
                switch (n.type) {
                  case 3:
                    return !t;
                  case 4:
                    return !1 === t;
                  case 5:
                    return isNaN(t);
                  case 6:
                    return isNaN(t) || 1 > t;
                }
              return !1;
            })(t, n, i, r) && (n = null),
            r || null === i
              ? (function (e) {
                  return (
                    !!d.call(p, e) ||
                    (!d.call(f, e) &&
                      (h.test(e) ? (p[e] = !0) : ((f[e] = !0), !1)))
                  );
                })(t) &&
                (null === n ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
              : i.mustUseProperty
                ? (e[i.propertyName] = null === n ? 3 !== i.type && '' : n)
                : ((t = i.attributeName),
                  (r = i.attributeNamespace),
                  null === n
                    ? e.removeAttribute(t)
                    : ((n =
                        3 === (i = i.type) || (4 === i && !0 === n)
                          ? ''
                          : '' + n),
                      r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
        }
        'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
          .split(' ')
          .forEach(function (e) {
            var t = e.replace(v, y);
            g[t] = new m(t, 1, !1, e, null, !1, !1);
          }),
          'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
            .split(' ')
            .forEach(function (e) {
              var t = e.replace(v, y);
              g[t] = new m(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
            }),
          ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
            var t = e.replace(v, y);
            g[t] = new m(
              t,
              1,
              !1,
              e,
              'http://www.w3.org/XML/1998/namespace',
              !1,
              !1
            );
          }),
          ['tabIndex', 'crossOrigin'].forEach(function (e) {
            g[e] = new m(e, 1, !1, e.toLowerCase(), null, !1, !1);
          }),
          (g.xlinkHref = new m(
            'xlinkHref',
            1,
            !1,
            'xlink:href',
            'http://www.w3.org/1999/xlink',
            !0,
            !1
          )),
          ['src', 'href', 'action', 'formAction'].forEach(function (e) {
            g[e] = new m(e, 1, !1, e.toLowerCase(), null, !0, !0);
          });
        var b = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
          x = Symbol.for('react.element'),
          w = Symbol.for('react.portal'),
          S = Symbol.for('react.fragment'),
          k = Symbol.for('react.strict_mode'),
          E = Symbol.for('react.profiler'),
          P = Symbol.for('react.provider'),
          C = Symbol.for('react.context'),
          T = Symbol.for('react.forward_ref'),
          F = Symbol.for('react.suspense'),
          D = Symbol.for('react.suspense_list'),
          M = Symbol.for('react.memo'),
          R = Symbol.for('react.lazy');
        Symbol.for('react.scope'), Symbol.for('react.debug_trace_mode');
        var j = Symbol.for('react.offscreen');
        Symbol.for('react.legacy_hidden'),
          Symbol.for('react.cache'),
          Symbol.for('react.tracing_marker');
        var L = Symbol.iterator;
        function z(e) {
          return null === e || 'object' !== typeof e
            ? null
            : 'function' === typeof (e = (L && e[L]) || e['@@iterator'])
              ? e
              : null;
        }
        var N,
          B = Object.assign;
        function V(e) {
          if (void 0 === N)
            try {
              throw Error();
            } catch (n) {
              var t = n.stack.trim().match(/\n( *(at )?)/);
              N = (t && t[1]) || '';
            }
          return '\n' + N + e;
        }
        var O = !1;
        function I(e, t) {
          if (!e || O) return '';
          O = !0;
          var n = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            if (t)
              if (
                ((t = function () {
                  throw Error();
                }),
                Object.defineProperty(t.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                'object' === typeof Reflect && Reflect.construct)
              ) {
                try {
                  Reflect.construct(t, []);
                } catch (u) {
                  var r = u;
                }
                Reflect.construct(e, [], t);
              } else {
                try {
                  t.call();
                } catch (u) {
                  r = u;
                }
                e.call(t.prototype);
              }
            else {
              try {
                throw Error();
              } catch (u) {
                r = u;
              }
              e();
            }
          } catch (u) {
            if (u && r && 'string' === typeof u.stack) {
              for (
                var i = u.stack.split('\n'),
                  o = r.stack.split('\n'),
                  a = i.length - 1,
                  s = o.length - 1;
                1 <= a && 0 <= s && i[a] !== o[s];

              )
                s--;
              for (; 1 <= a && 0 <= s; a--, s--)
                if (i[a] !== o[s]) {
                  if (1 !== a || 1 !== s)
                    do {
                      if ((a--, 0 > --s || i[a] !== o[s])) {
                        var l = '\n' + i[a].replace(' at new ', ' at ');
                        return (
                          e.displayName &&
                            l.includes('<anonymous>') &&
                            (l = l.replace('<anonymous>', e.displayName)),
                          l
                        );
                      }
                    } while (1 <= a && 0 <= s);
                  break;
                }
            }
          } finally {
            (O = !1), (Error.prepareStackTrace = n);
          }
          return (e = e ? e.displayName || e.name : '') ? V(e) : '';
        }
        function U(e) {
          switch (e.tag) {
            case 5:
              return V(e.type);
            case 16:
              return V('Lazy');
            case 13:
              return V('Suspense');
            case 19:
              return V('SuspenseList');
            case 0:
            case 2:
            case 15:
              return (e = I(e.type, !1));
            case 11:
              return (e = I(e.type.render, !1));
            case 1:
              return (e = I(e.type, !0));
            default:
              return '';
          }
        }
        function Z(e) {
          if (null == e) return null;
          if ('function' === typeof e) return e.displayName || e.name || null;
          if ('string' === typeof e) return e;
          switch (e) {
            case S:
              return 'Fragment';
            case w:
              return 'Portal';
            case E:
              return 'Profiler';
            case k:
              return 'StrictMode';
            case F:
              return 'Suspense';
            case D:
              return 'SuspenseList';
          }
          if ('object' === typeof e)
            switch (e.$$typeof) {
              case C:
                return (e.displayName || 'Context') + '.Consumer';
              case P:
                return (e._context.displayName || 'Context') + '.Provider';
              case T:
                var t = e.render;
                return (
                  (e = e.displayName) ||
                    (e =
                      '' !== (e = t.displayName || t.name || '')
                        ? 'ForwardRef(' + e + ')'
                        : 'ForwardRef'),
                  e
                );
              case M:
                return null !== (t = e.displayName || null)
                  ? t
                  : Z(e.type) || 'Memo';
              case R:
                (t = e._payload), (e = e._init);
                try {
                  return Z(e(t));
                } catch (n) {}
            }
          return null;
        }
        function _(e) {
          var t = e.type;
          switch (e.tag) {
            case 24:
              return 'Cache';
            case 9:
              return (t.displayName || 'Context') + '.Consumer';
            case 10:
              return (t._context.displayName || 'Context') + '.Provider';
            case 18:
              return 'DehydratedFragment';
            case 11:
              return (
                (e = (e = t.render).displayName || e.name || ''),
                t.displayName ||
                  ('' !== e ? 'ForwardRef(' + e + ')' : 'ForwardRef')
              );
            case 7:
              return 'Fragment';
            case 5:
              return t;
            case 4:
              return 'Portal';
            case 3:
              return 'Root';
            case 6:
              return 'Text';
            case 16:
              return Z(t);
            case 8:
              return t === k ? 'StrictMode' : 'Mode';
            case 22:
              return 'Offscreen';
            case 12:
              return 'Profiler';
            case 21:
              return 'Scope';
            case 13:
              return 'Suspense';
            case 19:
              return 'SuspenseList';
            case 25:
              return 'TracingMarker';
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
              if ('function' === typeof t)
                return t.displayName || t.name || null;
              if ('string' === typeof t) return t;
          }
          return null;
        }
        function W(e) {
          switch (typeof e) {
            case 'boolean':
            case 'number':
            case 'string':
            case 'undefined':
            case 'object':
              return e;
            default:
              return '';
          }
        }
        function H(e) {
          var t = e.type;
          return (
            (e = e.nodeName) &&
            'input' === e.toLowerCase() &&
            ('checkbox' === t || 'radio' === t)
          );
        }
        function J(e) {
          e._valueTracker ||
            (e._valueTracker = (function (e) {
              var t = H(e) ? 'checked' : 'value',
                n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                r = '' + e[t];
              if (
                !e.hasOwnProperty(t) &&
                'undefined' !== typeof n &&
                'function' === typeof n.get &&
                'function' === typeof n.set
              ) {
                var i = n.get,
                  o = n.set;
                return (
                  Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return i.call(this);
                    },
                    set: function (e) {
                      (r = '' + e), o.call(this, e);
                    },
                  }),
                  Object.defineProperty(e, t, { enumerable: n.enumerable }),
                  {
                    getValue: function () {
                      return r;
                    },
                    setValue: function (e) {
                      r = '' + e;
                    },
                    stopTracking: function () {
                      (e._valueTracker = null), delete e[t];
                    },
                  }
                );
              }
            })(e));
        }
        function Y(e) {
          if (!e) return !1;
          var t = e._valueTracker;
          if (!t) return !0;
          var n = t.getValue(),
            r = '';
          return (
            e && (r = H(e) ? (e.checked ? 'true' : 'false') : e.value),
            (e = r) !== n && (t.setValue(e), !0)
          );
        }
        function X(e) {
          if (
            'undefined' ===
            typeof (e =
              e || ('undefined' !== typeof document ? document : void 0))
          )
            return null;
          try {
            return e.activeElement || e.body;
          } catch (t) {
            return e.body;
          }
        }
        function Q(e, t) {
          var n = t.checked;
          return B({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : e._wrapperState.initialChecked,
          });
        }
        function G(e, t) {
          var n = null == t.defaultValue ? '' : t.defaultValue,
            r = null != t.checked ? t.checked : t.defaultChecked;
          (n = W(null != t.value ? t.value : n)),
            (e._wrapperState = {
              initialChecked: r,
              initialValue: n,
              controlled:
                'checkbox' === t.type || 'radio' === t.type
                  ? null != t.checked
                  : null != t.value,
            });
        }
        function K(e, t) {
          null != (t = t.checked) && A(e, 'checked', t, !1);
        }
        function q(e, t) {
          K(e, t);
          var n = W(t.value),
            r = t.type;
          if (null != n)
            'number' === r
              ? ((0 === n && '' === e.value) || e.value != n) &&
                (e.value = '' + n)
              : e.value !== '' + n && (e.value = '' + n);
          else if ('submit' === r || 'reset' === r)
            return void e.removeAttribute('value');
          t.hasOwnProperty('value')
            ? ee(e, t.type, n)
            : t.hasOwnProperty('defaultValue') &&
              ee(e, t.type, W(t.defaultValue)),
            null == t.checked &&
              null != t.defaultChecked &&
              (e.defaultChecked = !!t.defaultChecked);
        }
        function $(e, t, n) {
          if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
            var r = t.type;
            if (
              !(
                ('submit' !== r && 'reset' !== r) ||
                (void 0 !== t.value && null !== t.value)
              )
            )
              return;
            (t = '' + e._wrapperState.initialValue),
              n || t === e.value || (e.value = t),
              (e.defaultValue = t);
          }
          '' !== (n = e.name) && (e.name = ''),
            (e.defaultChecked = !!e._wrapperState.initialChecked),
            '' !== n && (e.name = n);
        }
        function ee(e, t, n) {
          ('number' === t && X(e.ownerDocument) === e) ||
            (null == n
              ? (e.defaultValue = '' + e._wrapperState.initialValue)
              : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
        }
        var te = Array.isArray;
        function ne(e, t, n, r) {
          if (((e = e.options), t)) {
            t = {};
            for (var i = 0; i < n.length; i++) t['$' + n[i]] = !0;
            for (n = 0; n < e.length; n++)
              (i = t.hasOwnProperty('$' + e[n].value)),
                e[n].selected !== i && (e[n].selected = i),
                i && r && (e[n].defaultSelected = !0);
          } else {
            for (n = '' + W(n), t = null, i = 0; i < e.length; i++) {
              if (e[i].value === n)
                return (
                  (e[i].selected = !0), void (r && (e[i].defaultSelected = !0))
                );
              null !== t || e[i].disabled || (t = e[i]);
            }
            null !== t && (t.selected = !0);
          }
        }
        function re(e, t) {
          if (null != t.dangerouslySetInnerHTML) throw Error(o(91));
          return B({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: '' + e._wrapperState.initialValue,
          });
        }
        function ie(e, t) {
          var n = t.value;
          if (null == n) {
            if (((n = t.children), (t = t.defaultValue), null != n)) {
              if (null != t) throw Error(o(92));
              if (te(n)) {
                if (1 < n.length) throw Error(o(93));
                n = n[0];
              }
              t = n;
            }
            null == t && (t = ''), (n = t);
          }
          e._wrapperState = { initialValue: W(n) };
        }
        function oe(e, t) {
          var n = W(t.value),
            r = W(t.defaultValue);
          null != n &&
            ((n = '' + n) !== e.value && (e.value = n),
            null == t.defaultValue &&
              e.defaultValue !== n &&
              (e.defaultValue = n)),
            null != r && (e.defaultValue = '' + r);
        }
        function ae(e) {
          var t = e.textContent;
          t === e._wrapperState.initialValue &&
            '' !== t &&
            null !== t &&
            (e.value = t);
        }
        function se(e) {
          switch (e) {
            case 'svg':
              return 'http://www.w3.org/2000/svg';
            case 'math':
              return 'http://www.w3.org/1998/Math/MathML';
            default:
              return 'http://www.w3.org/1999/xhtml';
          }
        }
        function le(e, t) {
          return null == e || 'http://www.w3.org/1999/xhtml' === e
            ? se(t)
            : 'http://www.w3.org/2000/svg' === e && 'foreignObject' === t
              ? 'http://www.w3.org/1999/xhtml'
              : e;
        }
        var ue,
          ce,
          de =
            ((ce = function (e, t) {
              if (
                'http://www.w3.org/2000/svg' !== e.namespaceURI ||
                'innerHTML' in e
              )
                e.innerHTML = t;
              else {
                for (
                  (ue = ue || document.createElement('div')).innerHTML =
                    '<svg>' + t.valueOf().toString() + '</svg>',
                    t = ue.firstChild;
                  e.firstChild;

                )
                  e.removeChild(e.firstChild);
                for (; t.firstChild; ) e.appendChild(t.firstChild);
              }
            }),
            'undefined' !== typeof MSApp && MSApp.execUnsafeLocalFunction
              ? function (e, t, n, r) {
                  MSApp.execUnsafeLocalFunction(function () {
                    return ce(e, t);
                  });
                }
              : ce);
        function he(e, t) {
          if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType)
              return void (n.nodeValue = t);
          }
          e.textContent = t;
        }
        var fe = {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridArea: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          pe = ['Webkit', 'ms', 'Moz', 'O'];
        function me(e, t, n) {
          return null == t || 'boolean' === typeof t || '' === t
            ? ''
            : n ||
                'number' !== typeof t ||
                0 === t ||
                (fe.hasOwnProperty(e) && fe[e])
              ? ('' + t).trim()
              : t + 'px';
        }
        function ge(e, t) {
          for (var n in ((e = e.style), t))
            if (t.hasOwnProperty(n)) {
              var r = 0 === n.indexOf('--'),
                i = me(n, t[n], r);
              'float' === n && (n = 'cssFloat'),
                r ? e.setProperty(n, i) : (e[n] = i);
            }
        }
        Object.keys(fe).forEach(function (e) {
          pe.forEach(function (t) {
            (t = t + e.charAt(0).toUpperCase() + e.substring(1)),
              (fe[t] = fe[e]);
          });
        });
        var ve = B(
          { menuitem: !0 },
          {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
          }
        );
        function ye(e, t) {
          if (t) {
            if (
              ve[e] &&
              (null != t.children || null != t.dangerouslySetInnerHTML)
            )
              throw Error(o(137, e));
            if (null != t.dangerouslySetInnerHTML) {
              if (null != t.children) throw Error(o(60));
              if (
                'object' !== typeof t.dangerouslySetInnerHTML ||
                !('__html' in t.dangerouslySetInnerHTML)
              )
                throw Error(o(61));
            }
            if (null != t.style && 'object' !== typeof t.style)
              throw Error(o(62));
          }
        }
        function Ae(e, t) {
          if (-1 === e.indexOf('-')) return 'string' === typeof t.is;
          switch (e) {
            case 'annotation-xml':
            case 'color-profile':
            case 'font-face':
            case 'font-face-src':
            case 'font-face-uri':
            case 'font-face-format':
            case 'font-face-name':
            case 'missing-glyph':
              return !1;
            default:
              return !0;
          }
        }
        var be = null;
        function xe(e) {
          return (
            (e = e.target || e.srcElement || window).correspondingUseElement &&
              (e = e.correspondingUseElement),
            3 === e.nodeType ? e.parentNode : e
          );
        }
        var we = null,
          Se = null,
          ke = null;
        function Ee(e) {
          if ((e = Ai(e))) {
            if ('function' !== typeof we) throw Error(o(280));
            var t = e.stateNode;
            t && ((t = xi(t)), we(e.stateNode, e.type, t));
          }
        }
        function Pe(e) {
          Se ? (ke ? ke.push(e) : (ke = [e])) : (Se = e);
        }
        function Ce() {
          if (Se) {
            var e = Se,
              t = ke;
            if (((ke = Se = null), Ee(e), t))
              for (e = 0; e < t.length; e++) Ee(t[e]);
          }
        }
        function Te(e, t) {
          return e(t);
        }
        function Fe() {}
        var De = !1;
        function Me(e, t, n) {
          if (De) return e(t, n);
          De = !0;
          try {
            return Te(e, t, n);
          } finally {
            (De = !1), (null !== Se || null !== ke) && (Fe(), Ce());
          }
        }
        function Re(e, t) {
          var n = e.stateNode;
          if (null === n) return null;
          var r = xi(n);
          if (null === r) return null;
          n = r[t];
          e: switch (t) {
            case 'onClick':
            case 'onClickCapture':
            case 'onDoubleClick':
            case 'onDoubleClickCapture':
            case 'onMouseDown':
            case 'onMouseDownCapture':
            case 'onMouseMove':
            case 'onMouseMoveCapture':
            case 'onMouseUp':
            case 'onMouseUpCapture':
            case 'onMouseEnter':
              (r = !r.disabled) ||
                (r = !(
                  'button' === (e = e.type) ||
                  'input' === e ||
                  'select' === e ||
                  'textarea' === e
                )),
                (e = !r);
              break e;
            default:
              e = !1;
          }
          if (e) return null;
          if (n && 'function' !== typeof n) throw Error(o(231, t, typeof n));
          return n;
        }
        var je = !1;
        if (c)
          try {
            var Le = {};
            Object.defineProperty(Le, 'passive', {
              get: function () {
                je = !0;
              },
            }),
              window.addEventListener('test', Le, Le),
              window.removeEventListener('test', Le, Le);
          } catch (ce) {
            je = !1;
          }
        function ze(e, t, n, r, i, o, a, s, l) {
          var u = Array.prototype.slice.call(arguments, 3);
          try {
            t.apply(n, u);
          } catch (c) {
            this.onError(c);
          }
        }
        var Ne = !1,
          Be = null,
          Ve = !1,
          Oe = null,
          Ie = {
            onError: function (e) {
              (Ne = !0), (Be = e);
            },
          };
        function Ue(e, t, n, r, i, o, a, s, l) {
          (Ne = !1), (Be = null), ze.apply(Ie, arguments);
        }
        function Ze(e) {
          var t = e,
            n = e;
          if (e.alternate) for (; t.return; ) t = t.return;
          else {
            e = t;
            do {
              0 !== (4098 & (t = e).flags) && (n = t.return), (e = t.return);
            } while (e);
          }
          return 3 === t.tag ? n : null;
        }
        function _e(e) {
          if (13 === e.tag) {
            var t = e.memoizedState;
            if (
              (null === t &&
                null !== (e = e.alternate) &&
                (t = e.memoizedState),
              null !== t)
            )
              return t.dehydrated;
          }
          return null;
        }
        function We(e) {
          if (Ze(e) !== e) throw Error(o(188));
        }
        function He(e) {
          return null !==
            (e = (function (e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = Ze(e))) throw Error(o(188));
                return t !== e ? null : e;
              }
              for (var n = e, r = t; ; ) {
                var i = n.return;
                if (null === i) break;
                var a = i.alternate;
                if (null === a) {
                  if (null !== (r = i.return)) {
                    n = r;
                    continue;
                  }
                  break;
                }
                if (i.child === a.child) {
                  for (a = i.child; a; ) {
                    if (a === n) return We(i), e;
                    if (a === r) return We(i), t;
                    a = a.sibling;
                  }
                  throw Error(o(188));
                }
                if (n.return !== r.return) (n = i), (r = a);
                else {
                  for (var s = !1, l = i.child; l; ) {
                    if (l === n) {
                      (s = !0), (n = i), (r = a);
                      break;
                    }
                    if (l === r) {
                      (s = !0), (r = i), (n = a);
                      break;
                    }
                    l = l.sibling;
                  }
                  if (!s) {
                    for (l = a.child; l; ) {
                      if (l === n) {
                        (s = !0), (n = a), (r = i);
                        break;
                      }
                      if (l === r) {
                        (s = !0), (r = a), (n = i);
                        break;
                      }
                      l = l.sibling;
                    }
                    if (!s) throw Error(o(189));
                  }
                }
                if (n.alternate !== r) throw Error(o(190));
              }
              if (3 !== n.tag) throw Error(o(188));
              return n.stateNode.current === n ? e : t;
            })(e))
            ? Je(e)
            : null;
        }
        function Je(e) {
          if (5 === e.tag || 6 === e.tag) return e;
          for (e = e.child; null !== e; ) {
            var t = Je(e);
            if (null !== t) return t;
            e = e.sibling;
          }
          return null;
        }
        var Ye = i.unstable_scheduleCallback,
          Xe = i.unstable_cancelCallback,
          Qe = i.unstable_shouldYield,
          Ge = i.unstable_requestPaint,
          Ke = i.unstable_now,
          qe = i.unstable_getCurrentPriorityLevel,
          $e = i.unstable_ImmediatePriority,
          et = i.unstable_UserBlockingPriority,
          tt = i.unstable_NormalPriority,
          nt = i.unstable_LowPriority,
          rt = i.unstable_IdlePriority,
          it = null,
          ot = null;
        var at = Math.clz32
            ? Math.clz32
            : function (e) {
                return (e >>>= 0), 0 === e ? 32 : (31 - ((st(e) / lt) | 0)) | 0;
              },
          st = Math.log,
          lt = Math.LN2;
        var ut = 64,
          ct = 4194304;
        function dt(e) {
          switch (e & -e) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 4194240 & e;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              return 130023424 & e;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 1073741824;
            default:
              return e;
          }
        }
        function ht(e, t) {
          var n = e.pendingLanes;
          if (0 === n) return 0;
          var r = 0,
            i = e.suspendedLanes,
            o = e.pingedLanes,
            a = 268435455 & n;
          if (0 !== a) {
            var s = a & ~i;
            0 !== s ? (r = dt(s)) : 0 !== (o &= a) && (r = dt(o));
          } else 0 !== (a = n & ~i) ? (r = dt(a)) : 0 !== o && (r = dt(o));
          if (0 === r) return 0;
          if (
            0 !== t &&
            t !== r &&
            0 === (t & i) &&
            ((i = r & -r) >= (o = t & -t) || (16 === i && 0 !== (4194240 & o)))
          )
            return t;
          if ((0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
            for (e = e.entanglements, t &= r; 0 < t; )
              (i = 1 << (n = 31 - at(t))), (r |= e[n]), (t &= ~i);
          return r;
        }
        function ft(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 4:
              return t + 250;
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t + 5e3;
            default:
              return -1;
          }
        }
        function pt(e) {
          return 0 !== (e = -1073741825 & e.pendingLanes)
            ? e
            : 1073741824 & e
              ? 1073741824
              : 0;
        }
        function mt() {
          var e = ut;
          return 0 === (4194240 & (ut <<= 1)) && (ut = 64), e;
        }
        function gt(e) {
          for (var t = [], n = 0; 31 > n; n++) t.push(e);
          return t;
        }
        function vt(e, t, n) {
          (e.pendingLanes |= t),
            536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
            ((e = e.eventTimes)[(t = 31 - at(t))] = n);
        }
        function yt(e, t) {
          var n = (e.entangledLanes |= t);
          for (e = e.entanglements; n; ) {
            var r = 31 - at(n),
              i = 1 << r;
            (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
          }
        }
        var At = 0;
        function bt(e) {
          return 1 < (e &= -e)
            ? 4 < e
              ? 0 !== (268435455 & e)
                ? 16
                : 536870912
              : 4
            : 1;
        }
        var xt,
          wt,
          St,
          kt,
          Et,
          Pt = !1,
          Ct = [],
          Tt = null,
          Ft = null,
          Dt = null,
          Mt = new Map(),
          Rt = new Map(),
          jt = [],
          Lt =
            'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
              ' '
            );
        function zt(e, t) {
          switch (e) {
            case 'focusin':
            case 'focusout':
              Tt = null;
              break;
            case 'dragenter':
            case 'dragleave':
              Ft = null;
              break;
            case 'mouseover':
            case 'mouseout':
              Dt = null;
              break;
            case 'pointerover':
            case 'pointerout':
              Mt.delete(t.pointerId);
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
              Rt.delete(t.pointerId);
          }
        }
        function Nt(e, t, n, r, i, o) {
          return null === e || e.nativeEvent !== o
            ? ((e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: o,
                targetContainers: [i],
              }),
              null !== t && null !== (t = Ai(t)) && wt(t),
              e)
            : ((e.eventSystemFlags |= r),
              (t = e.targetContainers),
              null !== i && -1 === t.indexOf(i) && t.push(i),
              e);
        }
        function Bt(e) {
          var t = yi(e.target);
          if (null !== t) {
            var n = Ze(t);
            if (null !== n)
              if (13 === (t = n.tag)) {
                if (null !== (t = _e(n)))
                  return (
                    (e.blockedOn = t),
                    void Et(e.priority, function () {
                      St(n);
                    })
                  );
              } else if (
                3 === t &&
                n.stateNode.current.memoizedState.isDehydrated
              )
                return void (e.blockedOn =
                  3 === n.tag ? n.stateNode.containerInfo : null);
          }
          e.blockedOn = null;
        }
        function Vt(e) {
          if (null !== e.blockedOn) return !1;
          for (var t = e.targetContainers; 0 < t.length; ) {
            var n = Qt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
            if (null !== n)
              return null !== (t = Ai(n)) && wt(t), (e.blockedOn = n), !1;
            var r = new (n = e.nativeEvent).constructor(n.type, n);
            (be = r), n.target.dispatchEvent(r), (be = null), t.shift();
          }
          return !0;
        }
        function Ot(e, t, n) {
          Vt(e) && n.delete(t);
        }
        function It() {
          (Pt = !1),
            null !== Tt && Vt(Tt) && (Tt = null),
            null !== Ft && Vt(Ft) && (Ft = null),
            null !== Dt && Vt(Dt) && (Dt = null),
            Mt.forEach(Ot),
            Rt.forEach(Ot);
        }
        function Ut(e, t) {
          e.blockedOn === t &&
            ((e.blockedOn = null),
            Pt ||
              ((Pt = !0),
              i.unstable_scheduleCallback(i.unstable_NormalPriority, It)));
        }
        function Zt(e) {
          function t(t) {
            return Ut(t, e);
          }
          if (0 < Ct.length) {
            Ut(Ct[0], e);
            for (var n = 1; n < Ct.length; n++) {
              var r = Ct[n];
              r.blockedOn === e && (r.blockedOn = null);
            }
          }
          for (
            null !== Tt && Ut(Tt, e),
              null !== Ft && Ut(Ft, e),
              null !== Dt && Ut(Dt, e),
              Mt.forEach(t),
              Rt.forEach(t),
              n = 0;
            n < jt.length;
            n++
          )
            (r = jt[n]).blockedOn === e && (r.blockedOn = null);
          for (; 0 < jt.length && null === (n = jt[0]).blockedOn; )
            Bt(n), null === n.blockedOn && jt.shift();
        }
        var _t = b.ReactCurrentBatchConfig,
          Wt = !0;
        function Ht(e, t, n, r) {
          var i = At,
            o = _t.transition;
          _t.transition = null;
          try {
            (At = 1), Yt(e, t, n, r);
          } finally {
            (At = i), (_t.transition = o);
          }
        }
        function Jt(e, t, n, r) {
          var i = At,
            o = _t.transition;
          _t.transition = null;
          try {
            (At = 4), Yt(e, t, n, r);
          } finally {
            (At = i), (_t.transition = o);
          }
        }
        function Yt(e, t, n, r) {
          if (Wt) {
            var i = Qt(e, t, n, r);
            if (null === i) Wr(e, t, r, Xt, n), zt(e, r);
            else if (
              (function (e, t, n, r, i) {
                switch (t) {
                  case 'focusin':
                    return (Tt = Nt(Tt, e, t, n, r, i)), !0;
                  case 'dragenter':
                    return (Ft = Nt(Ft, e, t, n, r, i)), !0;
                  case 'mouseover':
                    return (Dt = Nt(Dt, e, t, n, r, i)), !0;
                  case 'pointerover':
                    var o = i.pointerId;
                    return Mt.set(o, Nt(Mt.get(o) || null, e, t, n, r, i)), !0;
                  case 'gotpointercapture':
                    return (
                      (o = i.pointerId),
                      Rt.set(o, Nt(Rt.get(o) || null, e, t, n, r, i)),
                      !0
                    );
                }
                return !1;
              })(i, e, t, n, r)
            )
              r.stopPropagation();
            else if ((zt(e, r), 4 & t && -1 < Lt.indexOf(e))) {
              for (; null !== i; ) {
                var o = Ai(i);
                if (
                  (null !== o && xt(o),
                  null === (o = Qt(e, t, n, r)) && Wr(e, t, r, Xt, n),
                  o === i)
                )
                  break;
                i = o;
              }
              null !== i && r.stopPropagation();
            } else Wr(e, t, r, null, n);
          }
        }
        var Xt = null;
        function Qt(e, t, n, r) {
          if (((Xt = null), null !== (e = yi((e = xe(r))))))
            if (null === (t = Ze(e))) e = null;
            else if (13 === (n = t.tag)) {
              if (null !== (e = _e(t))) return e;
              e = null;
            } else if (3 === n) {
              if (t.stateNode.current.memoizedState.isDehydrated)
                return 3 === t.tag ? t.stateNode.containerInfo : null;
              e = null;
            } else t !== e && (e = null);
          return (Xt = e), null;
        }
        function Gt(e) {
          switch (e) {
            case 'cancel':
            case 'click':
            case 'close':
            case 'contextmenu':
            case 'copy':
            case 'cut':
            case 'auxclick':
            case 'dblclick':
            case 'dragend':
            case 'dragstart':
            case 'drop':
            case 'focusin':
            case 'focusout':
            case 'input':
            case 'invalid':
            case 'keydown':
            case 'keypress':
            case 'keyup':
            case 'mousedown':
            case 'mouseup':
            case 'paste':
            case 'pause':
            case 'play':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerup':
            case 'ratechange':
            case 'reset':
            case 'resize':
            case 'seeked':
            case 'submit':
            case 'touchcancel':
            case 'touchend':
            case 'touchstart':
            case 'volumechange':
            case 'change':
            case 'selectionchange':
            case 'textInput':
            case 'compositionstart':
            case 'compositionend':
            case 'compositionupdate':
            case 'beforeblur':
            case 'afterblur':
            case 'beforeinput':
            case 'blur':
            case 'fullscreenchange':
            case 'focus':
            case 'hashchange':
            case 'popstate':
            case 'select':
            case 'selectstart':
              return 1;
            case 'drag':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'mousemove':
            case 'mouseout':
            case 'mouseover':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'scroll':
            case 'toggle':
            case 'touchmove':
            case 'wheel':
            case 'mouseenter':
            case 'mouseleave':
            case 'pointerenter':
            case 'pointerleave':
              return 4;
            case 'message':
              switch (qe()) {
                case $e:
                  return 1;
                case et:
                  return 4;
                case tt:
                case nt:
                  return 16;
                case rt:
                  return 536870912;
                default:
                  return 16;
              }
            default:
              return 16;
          }
        }
        var Kt = null,
          qt = null,
          $t = null;
        function en() {
          if ($t) return $t;
          var e,
            t,
            n = qt,
            r = n.length,
            i = 'value' in Kt ? Kt.value : Kt.textContent,
            o = i.length;
          for (e = 0; e < r && n[e] === i[e]; e++);
          var a = r - e;
          for (t = 1; t <= a && n[r - t] === i[o - t]; t++);
          return ($t = i.slice(e, 1 < t ? 1 - t : void 0));
        }
        function tn(e) {
          var t = e.keyCode;
          return (
            'charCode' in e
              ? 0 === (e = e.charCode) && 13 === t && (e = 13)
              : (e = t),
            10 === e && (e = 13),
            32 <= e || 13 === e ? e : 0
          );
        }
        function nn() {
          return !0;
        }
        function rn() {
          return !1;
        }
        function on(e) {
          function t(t, n, r, i, o) {
            for (var a in ((this._reactName = t),
            (this._targetInst = r),
            (this.type = n),
            (this.nativeEvent = i),
            (this.target = o),
            (this.currentTarget = null),
            e))
              e.hasOwnProperty(a) && ((t = e[a]), (this[a] = t ? t(i) : i[a]));
            return (
              (this.isDefaultPrevented = (
                null != i.defaultPrevented
                  ? i.defaultPrevented
                  : !1 === i.returnValue
              )
                ? nn
                : rn),
              (this.isPropagationStopped = rn),
              this
            );
          }
          return (
            B(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : 'unknown' !== typeof e.returnValue &&
                      (e.returnValue = !1),
                  (this.isDefaultPrevented = nn));
              },
              stopPropagation: function () {
                var e = this.nativeEvent;
                e &&
                  (e.stopPropagation
                    ? e.stopPropagation()
                    : 'unknown' !== typeof e.cancelBubble &&
                      (e.cancelBubble = !0),
                  (this.isPropagationStopped = nn));
              },
              persist: function () {},
              isPersistent: nn,
            }),
            t
          );
        }
        var an,
          sn,
          ln,
          un = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (e) {
              return e.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          cn = on(un),
          dn = B({}, un, { view: 0, detail: 0 }),
          hn = on(dn),
          fn = B({}, dn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: En,
            button: 0,
            buttons: 0,
            relatedTarget: function (e) {
              return void 0 === e.relatedTarget
                ? e.fromElement === e.srcElement
                  ? e.toElement
                  : e.fromElement
                : e.relatedTarget;
            },
            movementX: function (e) {
              return 'movementX' in e
                ? e.movementX
                : (e !== ln &&
                    (ln && 'mousemove' === e.type
                      ? ((an = e.screenX - ln.screenX),
                        (sn = e.screenY - ln.screenY))
                      : (sn = an = 0),
                    (ln = e)),
                  an);
            },
            movementY: function (e) {
              return 'movementY' in e ? e.movementY : sn;
            },
          }),
          pn = on(fn),
          mn = on(B({}, fn, { dataTransfer: 0 })),
          gn = on(B({}, dn, { relatedTarget: 0 })),
          vn = on(
            B({}, un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          yn = B({}, un, {
            clipboardData: function (e) {
              return 'clipboardData' in e
                ? e.clipboardData
                : window.clipboardData;
            },
          }),
          An = on(yn),
          bn = on(B({}, un, { data: 0 })),
          xn = {
            Esc: 'Escape',
            Spacebar: ' ',
            Left: 'ArrowLeft',
            Up: 'ArrowUp',
            Right: 'ArrowRight',
            Down: 'ArrowDown',
            Del: 'Delete',
            Win: 'OS',
            Menu: 'ContextMenu',
            Apps: 'ContextMenu',
            Scroll: 'ScrollLock',
            MozPrintableKey: 'Unidentified',
          },
          wn = {
            8: 'Backspace',
            9: 'Tab',
            12: 'Clear',
            13: 'Enter',
            16: 'Shift',
            17: 'Control',
            18: 'Alt',
            19: 'Pause',
            20: 'CapsLock',
            27: 'Escape',
            32: ' ',
            33: 'PageUp',
            34: 'PageDown',
            35: 'End',
            36: 'Home',
            37: 'ArrowLeft',
            38: 'ArrowUp',
            39: 'ArrowRight',
            40: 'ArrowDown',
            45: 'Insert',
            46: 'Delete',
            112: 'F1',
            113: 'F2',
            114: 'F3',
            115: 'F4',
            116: 'F5',
            117: 'F6',
            118: 'F7',
            119: 'F8',
            120: 'F9',
            121: 'F10',
            122: 'F11',
            123: 'F12',
            144: 'NumLock',
            145: 'ScrollLock',
            224: 'Meta',
          },
          Sn = {
            Alt: 'altKey',
            Control: 'ctrlKey',
            Meta: 'metaKey',
            Shift: 'shiftKey',
          };
        function kn(e) {
          var t = this.nativeEvent;
          return t.getModifierState
            ? t.getModifierState(e)
            : !!(e = Sn[e]) && !!t[e];
        }
        function En() {
          return kn;
        }
        var Pn = B({}, dn, {
            key: function (e) {
              if (e.key) {
                var t = xn[e.key] || e.key;
                if ('Unidentified' !== t) return t;
              }
              return 'keypress' === e.type
                ? 13 === (e = tn(e))
                  ? 'Enter'
                  : String.fromCharCode(e)
                : 'keydown' === e.type || 'keyup' === e.type
                  ? wn[e.keyCode] || 'Unidentified'
                  : '';
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: En,
            charCode: function (e) {
              return 'keypress' === e.type ? tn(e) : 0;
            },
            keyCode: function (e) {
              return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
            },
            which: function (e) {
              return 'keypress' === e.type
                ? tn(e)
                : 'keydown' === e.type || 'keyup' === e.type
                  ? e.keyCode
                  : 0;
            },
          }),
          Cn = on(Pn),
          Tn = on(
            B({}, fn, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            })
          ),
          Fn = on(
            B({}, dn, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: En,
            })
          ),
          Dn = on(
            B({}, un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          Mn = B({}, fn, {
            deltaX: function (e) {
              return 'deltaX' in e
                ? e.deltaX
                : 'wheelDeltaX' in e
                  ? -e.wheelDeltaX
                  : 0;
            },
            deltaY: function (e) {
              return 'deltaY' in e
                ? e.deltaY
                : 'wheelDeltaY' in e
                  ? -e.wheelDeltaY
                  : 'wheelDelta' in e
                    ? -e.wheelDelta
                    : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          Rn = on(Mn),
          jn = [9, 13, 27, 32],
          Ln = c && 'CompositionEvent' in window,
          zn = null;
        c && 'documentMode' in document && (zn = document.documentMode);
        var Nn = c && 'TextEvent' in window && !zn,
          Bn = c && (!Ln || (zn && 8 < zn && 11 >= zn)),
          Vn = String.fromCharCode(32),
          On = !1;
        function In(e, t) {
          switch (e) {
            case 'keyup':
              return -1 !== jn.indexOf(t.keyCode);
            case 'keydown':
              return 229 !== t.keyCode;
            case 'keypress':
            case 'mousedown':
            case 'focusout':
              return !0;
            default:
              return !1;
          }
        }
        function Un(e) {
          return 'object' === typeof (e = e.detail) && 'data' in e
            ? e.data
            : null;
        }
        var Zn = !1;
        var _n = {
          color: !0,
          date: !0,
          datetime: !0,
          'datetime-local': !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
        function Wn(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return 'input' === t ? !!_n[e.type] : 'textarea' === t;
        }
        function Hn(e, t, n, r) {
          Pe(r),
            0 < (t = Jr(t, 'onChange')).length &&
              ((n = new cn('onChange', 'change', null, n, r)),
              e.push({ event: n, listeners: t }));
        }
        var Jn = null,
          Yn = null;
        function Xn(e) {
          Vr(e, 0);
        }
        function Qn(e) {
          if (Y(bi(e))) return e;
        }
        function Gn(e, t) {
          if ('change' === e) return t;
        }
        var Kn = !1;
        if (c) {
          var qn;
          if (c) {
            var $n = 'oninput' in document;
            if (!$n) {
              var er = document.createElement('div');
              er.setAttribute('oninput', 'return;'),
                ($n = 'function' === typeof er.oninput);
            }
            qn = $n;
          } else qn = !1;
          Kn = qn && (!document.documentMode || 9 < document.documentMode);
        }
        function tr() {
          Jn && (Jn.detachEvent('onpropertychange', nr), (Yn = Jn = null));
        }
        function nr(e) {
          if ('value' === e.propertyName && Qn(Yn)) {
            var t = [];
            Hn(t, Yn, e, xe(e)), Me(Xn, t);
          }
        }
        function rr(e, t, n) {
          'focusin' === e
            ? (tr(), (Yn = n), (Jn = t).attachEvent('onpropertychange', nr))
            : 'focusout' === e && tr();
        }
        function ir(e) {
          if ('selectionchange' === e || 'keyup' === e || 'keydown' === e)
            return Qn(Yn);
        }
        function or(e, t) {
          if ('click' === e) return Qn(t);
        }
        function ar(e, t) {
          if ('input' === e || 'change' === e) return Qn(t);
        }
        var sr =
          'function' === typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e === 1 / t)) ||
                  (e !== e && t !== t)
                );
              };
        function lr(e, t) {
          if (sr(e, t)) return !0;
          if (
            'object' !== typeof e ||
            null === e ||
            'object' !== typeof t ||
            null === t
          )
            return !1;
          var n = Object.keys(e),
            r = Object.keys(t);
          if (n.length !== r.length) return !1;
          for (r = 0; r < n.length; r++) {
            var i = n[r];
            if (!d.call(t, i) || !sr(e[i], t[i])) return !1;
          }
          return !0;
        }
        function ur(e) {
          for (; e && e.firstChild; ) e = e.firstChild;
          return e;
        }
        function cr(e, t) {
          var n,
            r = ur(e);
          for (e = 0; r; ) {
            if (3 === r.nodeType) {
              if (((n = e + r.textContent.length), e <= t && n >= t))
                return { node: r, offset: t - e };
              e = n;
            }
            e: {
              for (; r; ) {
                if (r.nextSibling) {
                  r = r.nextSibling;
                  break e;
                }
                r = r.parentNode;
              }
              r = void 0;
            }
            r = ur(r);
          }
        }
        function dr(e, t) {
          return (
            !(!e || !t) &&
            (e === t ||
              ((!e || 3 !== e.nodeType) &&
                (t && 3 === t.nodeType
                  ? dr(e, t.parentNode)
                  : 'contains' in e
                    ? e.contains(t)
                    : !!e.compareDocumentPosition &&
                      !!(16 & e.compareDocumentPosition(t)))))
          );
        }
        function hr() {
          for (var e = window, t = X(); t instanceof e.HTMLIFrameElement; ) {
            try {
              var n = 'string' === typeof t.contentWindow.location.href;
            } catch (r) {
              n = !1;
            }
            if (!n) break;
            t = X((e = t.contentWindow).document);
          }
          return t;
        }
        function fr(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return (
            t &&
            (('input' === t &&
              ('text' === e.type ||
                'search' === e.type ||
                'tel' === e.type ||
                'url' === e.type ||
                'password' === e.type)) ||
              'textarea' === t ||
              'true' === e.contentEditable)
          );
        }
        function pr(e) {
          var t = hr(),
            n = e.focusedElem,
            r = e.selectionRange;
          if (
            t !== n &&
            n &&
            n.ownerDocument &&
            dr(n.ownerDocument.documentElement, n)
          ) {
            if (null !== r && fr(n))
              if (
                ((t = r.start),
                void 0 === (e = r.end) && (e = t),
                'selectionStart' in n)
              )
                (n.selectionStart = t),
                  (n.selectionEnd = Math.min(e, n.value.length));
              else if (
                (e =
                  ((t = n.ownerDocument || document) && t.defaultView) ||
                  window).getSelection
              ) {
                e = e.getSelection();
                var i = n.textContent.length,
                  o = Math.min(r.start, i);
                (r = void 0 === r.end ? o : Math.min(r.end, i)),
                  !e.extend && o > r && ((i = r), (r = o), (o = i)),
                  (i = cr(n, o));
                var a = cr(n, r);
                i &&
                  a &&
                  (1 !== e.rangeCount ||
                    e.anchorNode !== i.node ||
                    e.anchorOffset !== i.offset ||
                    e.focusNode !== a.node ||
                    e.focusOffset !== a.offset) &&
                  ((t = t.createRange()).setStart(i.node, i.offset),
                  e.removeAllRanges(),
                  o > r
                    ? (e.addRange(t), e.extend(a.node, a.offset))
                    : (t.setEnd(a.node, a.offset), e.addRange(t)));
              }
            for (t = [], e = n; (e = e.parentNode); )
              1 === e.nodeType &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
            for (
              'function' === typeof n.focus && n.focus(), n = 0;
              n < t.length;
              n++
            )
              ((e = t[n]).element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
          }
        }
        var mr = c && 'documentMode' in document && 11 >= document.documentMode,
          gr = null,
          vr = null,
          yr = null,
          Ar = !1;
        function br(e, t, n) {
          var r =
            n.window === n
              ? n.document
              : 9 === n.nodeType
                ? n
                : n.ownerDocument;
          Ar ||
            null == gr ||
            gr !== X(r) ||
            ('selectionStart' in (r = gr) && fr(r)
              ? (r = { start: r.selectionStart, end: r.selectionEnd })
              : (r = {
                  anchorNode: (r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                }),
            (yr && lr(yr, r)) ||
              ((yr = r),
              0 < (r = Jr(vr, 'onSelect')).length &&
                ((t = new cn('onSelect', 'select', null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = gr))));
        }
        function xr(e, t) {
          var n = {};
          return (
            (n[e.toLowerCase()] = t.toLowerCase()),
            (n['Webkit' + e] = 'webkit' + t),
            (n['Moz' + e] = 'moz' + t),
            n
          );
        }
        var wr = {
            animationend: xr('Animation', 'AnimationEnd'),
            animationiteration: xr('Animation', 'AnimationIteration'),
            animationstart: xr('Animation', 'AnimationStart'),
            transitionend: xr('Transition', 'TransitionEnd'),
          },
          Sr = {},
          kr = {};
        function Er(e) {
          if (Sr[e]) return Sr[e];
          if (!wr[e]) return e;
          var t,
            n = wr[e];
          for (t in n)
            if (n.hasOwnProperty(t) && t in kr) return (Sr[e] = n[t]);
          return e;
        }
        c &&
          ((kr = document.createElement('div').style),
          'AnimationEvent' in window ||
            (delete wr.animationend.animation,
            delete wr.animationiteration.animation,
            delete wr.animationstart.animation),
          'TransitionEvent' in window || delete wr.transitionend.transition);
        var Pr = Er('animationend'),
          Cr = Er('animationiteration'),
          Tr = Er('animationstart'),
          Fr = Er('transitionend'),
          Dr = new Map(),
          Mr =
            'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
              ' '
            );
        function Rr(e, t) {
          Dr.set(e, t), l(t, [e]);
        }
        for (var jr = 0; jr < Mr.length; jr++) {
          var Lr = Mr[jr];
          Rr(Lr.toLowerCase(), 'on' + (Lr[0].toUpperCase() + Lr.slice(1)));
        }
        Rr(Pr, 'onAnimationEnd'),
          Rr(Cr, 'onAnimationIteration'),
          Rr(Tr, 'onAnimationStart'),
          Rr('dblclick', 'onDoubleClick'),
          Rr('focusin', 'onFocus'),
          Rr('focusout', 'onBlur'),
          Rr(Fr, 'onTransitionEnd'),
          u('onMouseEnter', ['mouseout', 'mouseover']),
          u('onMouseLeave', ['mouseout', 'mouseover']),
          u('onPointerEnter', ['pointerout', 'pointerover']),
          u('onPointerLeave', ['pointerout', 'pointerover']),
          l(
            'onChange',
            'change click focusin focusout input keydown keyup selectionchange'.split(
              ' '
            )
          ),
          l(
            'onSelect',
            'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
              ' '
            )
          ),
          l('onBeforeInput', [
            'compositionend',
            'keypress',
            'textInput',
            'paste',
          ]),
          l(
            'onCompositionEnd',
            'compositionend focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          ),
          l(
            'onCompositionStart',
            'compositionstart focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          ),
          l(
            'onCompositionUpdate',
            'compositionupdate focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          );
        var zr =
            'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
              ' '
            ),
          Nr = new Set(
            'cancel close invalid load scroll toggle'.split(' ').concat(zr)
          );
        function Br(e, t, n) {
          var r = e.type || 'unknown-event';
          (e.currentTarget = n),
            (function (e, t, n, r, i, a, s, l, u) {
              if ((Ue.apply(this, arguments), Ne)) {
                if (!Ne) throw Error(o(198));
                var c = Be;
                (Ne = !1), (Be = null), Ve || ((Ve = !0), (Oe = c));
              }
            })(r, t, void 0, e),
            (e.currentTarget = null);
        }
        function Vr(e, t) {
          t = 0 !== (4 & t);
          for (var n = 0; n < e.length; n++) {
            var r = e[n],
              i = r.event;
            r = r.listeners;
            e: {
              var o = void 0;
              if (t)
                for (var a = r.length - 1; 0 <= a; a--) {
                  var s = r[a],
                    l = s.instance,
                    u = s.currentTarget;
                  if (((s = s.listener), l !== o && i.isPropagationStopped()))
                    break e;
                  Br(i, s, u), (o = l);
                }
              else
                for (a = 0; a < r.length; a++) {
                  if (
                    ((l = (s = r[a]).instance),
                    (u = s.currentTarget),
                    (s = s.listener),
                    l !== o && i.isPropagationStopped())
                  )
                    break e;
                  Br(i, s, u), (o = l);
                }
            }
          }
          if (Ve) throw ((e = Oe), (Ve = !1), (Oe = null), e);
        }
        function Or(e, t) {
          var n = t[mi];
          void 0 === n && (n = t[mi] = new Set());
          var r = e + '__bubble';
          n.has(r) || (_r(t, e, 2, !1), n.add(r));
        }
        function Ir(e, t, n) {
          var r = 0;
          t && (r |= 4), _r(n, e, r, t);
        }
        var Ur = '_reactListening' + Math.random().toString(36).slice(2);
        function Zr(e) {
          if (!e[Ur]) {
            (e[Ur] = !0),
              a.forEach(function (t) {
                'selectionchange' !== t &&
                  (Nr.has(t) || Ir(t, !1, e), Ir(t, !0, e));
              });
            var t = 9 === e.nodeType ? e : e.ownerDocument;
            null === t || t[Ur] || ((t[Ur] = !0), Ir('selectionchange', !1, t));
          }
        }
        function _r(e, t, n, r) {
          switch (Gt(t)) {
            case 1:
              var i = Ht;
              break;
            case 4:
              i = Jt;
              break;
            default:
              i = Yt;
          }
          (n = i.bind(null, t, n, e)),
            (i = void 0),
            !je ||
              ('touchstart' !== t && 'touchmove' !== t && 'wheel' !== t) ||
              (i = !0),
            r
              ? void 0 !== i
                ? e.addEventListener(t, n, { capture: !0, passive: i })
                : e.addEventListener(t, n, !0)
              : void 0 !== i
                ? e.addEventListener(t, n, { passive: i })
                : e.addEventListener(t, n, !1);
        }
        function Wr(e, t, n, r, i) {
          var o = r;
          if (0 === (1 & t) && 0 === (2 & t) && null !== r)
            e: for (;;) {
              if (null === r) return;
              var a = r.tag;
              if (3 === a || 4 === a) {
                var s = r.stateNode.containerInfo;
                if (s === i || (8 === s.nodeType && s.parentNode === i)) break;
                if (4 === a)
                  for (a = r.return; null !== a; ) {
                    var l = a.tag;
                    if (
                      (3 === l || 4 === l) &&
                      ((l = a.stateNode.containerInfo) === i ||
                        (8 === l.nodeType && l.parentNode === i))
                    )
                      return;
                    a = a.return;
                  }
                for (; null !== s; ) {
                  if (null === (a = yi(s))) return;
                  if (5 === (l = a.tag) || 6 === l) {
                    r = o = a;
                    continue e;
                  }
                  s = s.parentNode;
                }
              }
              r = r.return;
            }
          Me(function () {
            var r = o,
              i = xe(n),
              a = [];
            e: {
              var s = Dr.get(e);
              if (void 0 !== s) {
                var l = cn,
                  u = e;
                switch (e) {
                  case 'keypress':
                    if (0 === tn(n)) break e;
                  case 'keydown':
                  case 'keyup':
                    l = Cn;
                    break;
                  case 'focusin':
                    (u = 'focus'), (l = gn);
                    break;
                  case 'focusout':
                    (u = 'blur'), (l = gn);
                    break;
                  case 'beforeblur':
                  case 'afterblur':
                    l = gn;
                    break;
                  case 'click':
                    if (2 === n.button) break e;
                  case 'auxclick':
                  case 'dblclick':
                  case 'mousedown':
                  case 'mousemove':
                  case 'mouseup':
                  case 'mouseout':
                  case 'mouseover':
                  case 'contextmenu':
                    l = pn;
                    break;
                  case 'drag':
                  case 'dragend':
                  case 'dragenter':
                  case 'dragexit':
                  case 'dragleave':
                  case 'dragover':
                  case 'dragstart':
                  case 'drop':
                    l = mn;
                    break;
                  case 'touchcancel':
                  case 'touchend':
                  case 'touchmove':
                  case 'touchstart':
                    l = Fn;
                    break;
                  case Pr:
                  case Cr:
                  case Tr:
                    l = vn;
                    break;
                  case Fr:
                    l = Dn;
                    break;
                  case 'scroll':
                    l = hn;
                    break;
                  case 'wheel':
                    l = Rn;
                    break;
                  case 'copy':
                  case 'cut':
                  case 'paste':
                    l = An;
                    break;
                  case 'gotpointercapture':
                  case 'lostpointercapture':
                  case 'pointercancel':
                  case 'pointerdown':
                  case 'pointermove':
                  case 'pointerout':
                  case 'pointerover':
                  case 'pointerup':
                    l = Tn;
                }
                var c = 0 !== (4 & t),
                  d = !c && 'scroll' === e,
                  h = c ? (null !== s ? s + 'Capture' : null) : s;
                c = [];
                for (var f, p = r; null !== p; ) {
                  var m = (f = p).stateNode;
                  if (
                    (5 === f.tag &&
                      null !== m &&
                      ((f = m),
                      null !== h &&
                        null != (m = Re(p, h)) &&
                        c.push(Hr(p, m, f))),
                    d)
                  )
                    break;
                  p = p.return;
                }
                0 < c.length &&
                  ((s = new l(s, u, null, n, i)),
                  a.push({ event: s, listeners: c }));
              }
            }
            if (0 === (7 & t)) {
              if (
                ((l = 'mouseout' === e || 'pointerout' === e),
                (!(s = 'mouseover' === e || 'pointerover' === e) ||
                  n === be ||
                  !(u = n.relatedTarget || n.fromElement) ||
                  (!yi(u) && !u[pi])) &&
                  (l || s) &&
                  ((s =
                    i.window === i
                      ? i
                      : (s = i.ownerDocument)
                        ? s.defaultView || s.parentWindow
                        : window),
                  l
                    ? ((l = r),
                      null !==
                        (u = (u = n.relatedTarget || n.toElement)
                          ? yi(u)
                          : null) &&
                        (u !== (d = Ze(u)) || (5 !== u.tag && 6 !== u.tag)) &&
                        (u = null))
                    : ((l = null), (u = r)),
                  l !== u))
              ) {
                if (
                  ((c = pn),
                  (m = 'onMouseLeave'),
                  (h = 'onMouseEnter'),
                  (p = 'mouse'),
                  ('pointerout' !== e && 'pointerover' !== e) ||
                    ((c = Tn),
                    (m = 'onPointerLeave'),
                    (h = 'onPointerEnter'),
                    (p = 'pointer')),
                  (d = null == l ? s : bi(l)),
                  (f = null == u ? s : bi(u)),
                  ((s = new c(m, p + 'leave', l, n, i)).target = d),
                  (s.relatedTarget = f),
                  (m = null),
                  yi(i) === r &&
                    (((c = new c(h, p + 'enter', u, n, i)).target = f),
                    (c.relatedTarget = d),
                    (m = c)),
                  (d = m),
                  l && u)
                )
                  e: {
                    for (h = u, p = 0, f = c = l; f; f = Yr(f)) p++;
                    for (f = 0, m = h; m; m = Yr(m)) f++;
                    for (; 0 < p - f; ) (c = Yr(c)), p--;
                    for (; 0 < f - p; ) (h = Yr(h)), f--;
                    for (; p--; ) {
                      if (c === h || (null !== h && c === h.alternate)) break e;
                      (c = Yr(c)), (h = Yr(h));
                    }
                    c = null;
                  }
                else c = null;
                null !== l && Xr(a, s, l, c, !1),
                  null !== u && null !== d && Xr(a, d, u, c, !0);
              }
              if (
                'select' ===
                  (l =
                    (s = r ? bi(r) : window).nodeName &&
                    s.nodeName.toLowerCase()) ||
                ('input' === l && 'file' === s.type)
              )
                var g = Gn;
              else if (Wn(s))
                if (Kn) g = ar;
                else {
                  g = ir;
                  var v = rr;
                }
              else
                (l = s.nodeName) &&
                  'input' === l.toLowerCase() &&
                  ('checkbox' === s.type || 'radio' === s.type) &&
                  (g = or);
              switch (
                (g && (g = g(e, r))
                  ? Hn(a, g, n, i)
                  : (v && v(e, s, r),
                    'focusout' === e &&
                      (v = s._wrapperState) &&
                      v.controlled &&
                      'number' === s.type &&
                      ee(s, 'number', s.value)),
                (v = r ? bi(r) : window),
                e)
              ) {
                case 'focusin':
                  (Wn(v) || 'true' === v.contentEditable) &&
                    ((gr = v), (vr = r), (yr = null));
                  break;
                case 'focusout':
                  yr = vr = gr = null;
                  break;
                case 'mousedown':
                  Ar = !0;
                  break;
                case 'contextmenu':
                case 'mouseup':
                case 'dragend':
                  (Ar = !1), br(a, n, i);
                  break;
                case 'selectionchange':
                  if (mr) break;
                case 'keydown':
                case 'keyup':
                  br(a, n, i);
              }
              var y;
              if (Ln)
                e: {
                  switch (e) {
                    case 'compositionstart':
                      var A = 'onCompositionStart';
                      break e;
                    case 'compositionend':
                      A = 'onCompositionEnd';
                      break e;
                    case 'compositionupdate':
                      A = 'onCompositionUpdate';
                      break e;
                  }
                  A = void 0;
                }
              else
                Zn
                  ? In(e, n) && (A = 'onCompositionEnd')
                  : 'keydown' === e &&
                    229 === n.keyCode &&
                    (A = 'onCompositionStart');
              A &&
                (Bn &&
                  'ko' !== n.locale &&
                  (Zn || 'onCompositionStart' !== A
                    ? 'onCompositionEnd' === A && Zn && (y = en())
                    : ((qt = 'value' in (Kt = i) ? Kt.value : Kt.textContent),
                      (Zn = !0))),
                0 < (v = Jr(r, A)).length &&
                  ((A = new bn(A, e, null, n, i)),
                  a.push({ event: A, listeners: v }),
                  y ? (A.data = y) : null !== (y = Un(n)) && (A.data = y))),
                (y = Nn
                  ? (function (e, t) {
                      switch (e) {
                        case 'compositionend':
                          return Un(t);
                        case 'keypress':
                          return 32 !== t.which ? null : ((On = !0), Vn);
                        case 'textInput':
                          return (e = t.data) === Vn && On ? null : e;
                        default:
                          return null;
                      }
                    })(e, n)
                  : (function (e, t) {
                      if (Zn)
                        return 'compositionend' === e || (!Ln && In(e, t))
                          ? ((e = en()), ($t = qt = Kt = null), (Zn = !1), e)
                          : null;
                      switch (e) {
                        case 'paste':
                        default:
                          return null;
                        case 'keypress':
                          if (
                            !(t.ctrlKey || t.altKey || t.metaKey) ||
                            (t.ctrlKey && t.altKey)
                          ) {
                            if (t.char && 1 < t.char.length) return t.char;
                            if (t.which) return String.fromCharCode(t.which);
                          }
                          return null;
                        case 'compositionend':
                          return Bn && 'ko' !== t.locale ? null : t.data;
                      }
                    })(e, n)) &&
                  0 < (r = Jr(r, 'onBeforeInput')).length &&
                  ((i = new bn('onBeforeInput', 'beforeinput', null, n, i)),
                  a.push({ event: i, listeners: r }),
                  (i.data = y));
            }
            Vr(a, t);
          });
        }
        function Hr(e, t, n) {
          return { instance: e, listener: t, currentTarget: n };
        }
        function Jr(e, t) {
          for (var n = t + 'Capture', r = []; null !== e; ) {
            var i = e,
              o = i.stateNode;
            5 === i.tag &&
              null !== o &&
              ((i = o),
              null != (o = Re(e, n)) && r.unshift(Hr(e, o, i)),
              null != (o = Re(e, t)) && r.push(Hr(e, o, i))),
              (e = e.return);
          }
          return r;
        }
        function Yr(e) {
          if (null === e) return null;
          do {
            e = e.return;
          } while (e && 5 !== e.tag);
          return e || null;
        }
        function Xr(e, t, n, r, i) {
          for (var o = t._reactName, a = []; null !== n && n !== r; ) {
            var s = n,
              l = s.alternate,
              u = s.stateNode;
            if (null !== l && l === r) break;
            5 === s.tag &&
              null !== u &&
              ((s = u),
              i
                ? null != (l = Re(n, o)) && a.unshift(Hr(n, l, s))
                : i || (null != (l = Re(n, o)) && a.push(Hr(n, l, s)))),
              (n = n.return);
          }
          0 !== a.length && e.push({ event: t, listeners: a });
        }
        var Qr = /\r\n?/g,
          Gr = /\u0000|\uFFFD/g;
        function Kr(e) {
          return ('string' === typeof e ? e : '' + e)
            .replace(Qr, '\n')
            .replace(Gr, '');
        }
        function qr(e, t, n) {
          if (((t = Kr(t)), Kr(e) !== t && n)) throw Error(o(425));
        }
        function $r() {}
        var ei = null,
          ti = null;
        function ni(e, t) {
          return (
            'textarea' === e ||
            'noscript' === e ||
            'string' === typeof t.children ||
            'number' === typeof t.children ||
            ('object' === typeof t.dangerouslySetInnerHTML &&
              null !== t.dangerouslySetInnerHTML &&
              null != t.dangerouslySetInnerHTML.__html)
          );
        }
        var ri = 'function' === typeof setTimeout ? setTimeout : void 0,
          ii = 'function' === typeof clearTimeout ? clearTimeout : void 0,
          oi = 'function' === typeof Promise ? Promise : void 0,
          ai =
            'function' === typeof queueMicrotask
              ? queueMicrotask
              : 'undefined' !== typeof oi
                ? function (e) {
                    return oi.resolve(null).then(e).catch(si);
                  }
                : ri;
        function si(e) {
          setTimeout(function () {
            throw e;
          });
        }
        function li(e, t) {
          var n = t,
            r = 0;
          do {
            var i = n.nextSibling;
            if ((e.removeChild(n), i && 8 === i.nodeType))
              if ('/$' === (n = i.data)) {
                if (0 === r) return e.removeChild(i), void Zt(t);
                r--;
              } else ('$' !== n && '$?' !== n && '$!' !== n) || r++;
            n = i;
          } while (n);
          Zt(t);
        }
        function ui(e) {
          for (; null != e; e = e.nextSibling) {
            var t = e.nodeType;
            if (1 === t || 3 === t) break;
            if (8 === t) {
              if ('$' === (t = e.data) || '$!' === t || '$?' === t) break;
              if ('/$' === t) return null;
            }
          }
          return e;
        }
        function ci(e) {
          e = e.previousSibling;
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ('$' === n || '$!' === n || '$?' === n) {
                if (0 === t) return e;
                t--;
              } else '/$' === n && t++;
            }
            e = e.previousSibling;
          }
          return null;
        }
        var di = Math.random().toString(36).slice(2),
          hi = '__reactFiber$' + di,
          fi = '__reactProps$' + di,
          pi = '__reactContainer$' + di,
          mi = '__reactEvents$' + di,
          gi = '__reactListeners$' + di,
          vi = '__reactHandles$' + di;
        function yi(e) {
          var t = e[hi];
          if (t) return t;
          for (var n = e.parentNode; n; ) {
            if ((t = n[pi] || n[hi])) {
              if (
                ((n = t.alternate),
                null !== t.child || (null !== n && null !== n.child))
              )
                for (e = ci(e); null !== e; ) {
                  if ((n = e[hi])) return n;
                  e = ci(e);
                }
              return t;
            }
            n = (e = n).parentNode;
          }
          return null;
        }
        function Ai(e) {
          return !(e = e[hi] || e[pi]) ||
            (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
            ? null
            : e;
        }
        function bi(e) {
          if (5 === e.tag || 6 === e.tag) return e.stateNode;
          throw Error(o(33));
        }
        function xi(e) {
          return e[fi] || null;
        }
        var wi = [],
          Si = -1;
        function ki(e) {
          return { current: e };
        }
        function Ei(e) {
          0 > Si || ((e.current = wi[Si]), (wi[Si] = null), Si--);
        }
        function Pi(e, t) {
          Si++, (wi[Si] = e.current), (e.current = t);
        }
        var Ci = {},
          Ti = ki(Ci),
          Fi = ki(!1),
          Di = Ci;
        function Mi(e, t) {
          var n = e.type.contextTypes;
          if (!n) return Ci;
          var r = e.stateNode;
          if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
            return r.__reactInternalMemoizedMaskedChildContext;
          var i,
            o = {};
          for (i in n) o[i] = t[i];
          return (
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                t),
              (e.__reactInternalMemoizedMaskedChildContext = o)),
            o
          );
        }
        function Ri(e) {
          return null !== (e = e.childContextTypes) && void 0 !== e;
        }
        function ji() {
          Ei(Fi), Ei(Ti);
        }
        function Li(e, t, n) {
          if (Ti.current !== Ci) throw Error(o(168));
          Pi(Ti, t), Pi(Fi, n);
        }
        function zi(e, t, n) {
          var r = e.stateNode;
          if (
            ((t = t.childContextTypes), 'function' !== typeof r.getChildContext)
          )
            return n;
          for (var i in (r = r.getChildContext()))
            if (!(i in t)) throw Error(o(108, _(e) || 'Unknown', i));
          return B({}, n, r);
        }
        function Ni(e) {
          return (
            (e =
              ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
              Ci),
            (Di = Ti.current),
            Pi(Ti, e),
            Pi(Fi, Fi.current),
            !0
          );
        }
        function Bi(e, t, n) {
          var r = e.stateNode;
          if (!r) throw Error(o(169));
          n
            ? ((e = zi(e, t, Di)),
              (r.__reactInternalMemoizedMergedChildContext = e),
              Ei(Fi),
              Ei(Ti),
              Pi(Ti, e))
            : Ei(Fi),
            Pi(Fi, n);
        }
        var Vi = null,
          Oi = !1,
          Ii = !1;
        function Ui(e) {
          null === Vi ? (Vi = [e]) : Vi.push(e);
        }
        function Zi() {
          if (!Ii && null !== Vi) {
            Ii = !0;
            var e = 0,
              t = At;
            try {
              var n = Vi;
              for (At = 1; e < n.length; e++) {
                var r = n[e];
                do {
                  r = r(!0);
                } while (null !== r);
              }
              (Vi = null), (Oi = !1);
            } catch (i) {
              throw (null !== Vi && (Vi = Vi.slice(e + 1)), Ye($e, Zi), i);
            } finally {
              (At = t), (Ii = !1);
            }
          }
          return null;
        }
        var _i = [],
          Wi = 0,
          Hi = null,
          Ji = 0,
          Yi = [],
          Xi = 0,
          Qi = null,
          Gi = 1,
          Ki = '';
        function qi(e, t) {
          (_i[Wi++] = Ji), (_i[Wi++] = Hi), (Hi = e), (Ji = t);
        }
        function $i(e, t, n) {
          (Yi[Xi++] = Gi), (Yi[Xi++] = Ki), (Yi[Xi++] = Qi), (Qi = e);
          var r = Gi;
          e = Ki;
          var i = 32 - at(r) - 1;
          (r &= ~(1 << i)), (n += 1);
          var o = 32 - at(t) + i;
          if (30 < o) {
            var a = i - (i % 5);
            (o = (r & ((1 << a) - 1)).toString(32)),
              (r >>= a),
              (i -= a),
              (Gi = (1 << (32 - at(t) + i)) | (n << i) | r),
              (Ki = o + e);
          } else (Gi = (1 << o) | (n << i) | r), (Ki = e);
        }
        function eo(e) {
          null !== e.return && (qi(e, 1), $i(e, 1, 0));
        }
        function to(e) {
          for (; e === Hi; )
            (Hi = _i[--Wi]), (_i[Wi] = null), (Ji = _i[--Wi]), (_i[Wi] = null);
          for (; e === Qi; )
            (Qi = Yi[--Xi]),
              (Yi[Xi] = null),
              (Ki = Yi[--Xi]),
              (Yi[Xi] = null),
              (Gi = Yi[--Xi]),
              (Yi[Xi] = null);
        }
        var no = null,
          ro = null,
          io = !1,
          oo = null;
        function ao(e, t) {
          var n = Mu(5, null, null, 0);
          (n.elementType = 'DELETED'),
            (n.stateNode = t),
            (n.return = e),
            null === (t = e.deletions)
              ? ((e.deletions = [n]), (e.flags |= 16))
              : t.push(n);
        }
        function so(e, t) {
          switch (e.tag) {
            case 5:
              var n = e.type;
              return (
                null !==
                  (t =
                    1 !== t.nodeType ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                      ? null
                      : t) &&
                ((e.stateNode = t), (no = e), (ro = ui(t.firstChild)), !0)
              );
            case 6:
              return (
                null !==
                  (t = '' === e.pendingProps || 3 !== t.nodeType ? null : t) &&
                ((e.stateNode = t), (no = e), (ro = null), !0)
              );
            case 13:
              return (
                null !== (t = 8 !== t.nodeType ? null : t) &&
                ((n = null !== Qi ? { id: Gi, overflow: Ki } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                ((n = Mu(18, null, null, 0)).stateNode = t),
                (n.return = e),
                (e.child = n),
                (no = e),
                (ro = null),
                !0)
              );
            default:
              return !1;
          }
        }
        function lo(e) {
          return 0 !== (1 & e.mode) && 0 === (128 & e.flags);
        }
        function uo(e) {
          if (io) {
            var t = ro;
            if (t) {
              var n = t;
              if (!so(e, t)) {
                if (lo(e)) throw Error(o(418));
                t = ui(n.nextSibling);
                var r = no;
                t && so(e, t)
                  ? ao(r, n)
                  : ((e.flags = (-4097 & e.flags) | 2), (io = !1), (no = e));
              }
            } else {
              if (lo(e)) throw Error(o(418));
              (e.flags = (-4097 & e.flags) | 2), (io = !1), (no = e);
            }
          }
        }
        function co(e) {
          for (
            e = e.return;
            null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

          )
            e = e.return;
          no = e;
        }
        function ho(e) {
          if (e !== no) return !1;
          if (!io) return co(e), (io = !0), !1;
          var t;
          if (
            ((t = 3 !== e.tag) &&
              !(t = 5 !== e.tag) &&
              (t =
                'head' !== (t = e.type) &&
                'body' !== t &&
                !ni(e.type, e.memoizedProps)),
            t && (t = ro))
          ) {
            if (lo(e)) throw (fo(), Error(o(418)));
            for (; t; ) ao(e, t), (t = ui(t.nextSibling));
          }
          if ((co(e), 13 === e.tag)) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
              throw Error(o(317));
            e: {
              for (e = e.nextSibling, t = 0; e; ) {
                if (8 === e.nodeType) {
                  var n = e.data;
                  if ('/$' === n) {
                    if (0 === t) {
                      ro = ui(e.nextSibling);
                      break e;
                    }
                    t--;
                  } else ('$' !== n && '$!' !== n && '$?' !== n) || t++;
                }
                e = e.nextSibling;
              }
              ro = null;
            }
          } else ro = no ? ui(e.stateNode.nextSibling) : null;
          return !0;
        }
        function fo() {
          for (var e = ro; e; ) e = ui(e.nextSibling);
        }
        function po() {
          (ro = no = null), (io = !1);
        }
        function mo(e) {
          null === oo ? (oo = [e]) : oo.push(e);
        }
        var go = b.ReactCurrentBatchConfig;
        function vo(e, t, n) {
          if (
            null !== (e = n.ref) &&
            'function' !== typeof e &&
            'object' !== typeof e
          ) {
            if (n._owner) {
              if ((n = n._owner)) {
                if (1 !== n.tag) throw Error(o(309));
                var r = n.stateNode;
              }
              if (!r) throw Error(o(147, e));
              var i = r,
                a = '' + e;
              return null !== t &&
                null !== t.ref &&
                'function' === typeof t.ref &&
                t.ref._stringRef === a
                ? t.ref
                : ((t = function (e) {
                    var t = i.refs;
                    null === e ? delete t[a] : (t[a] = e);
                  }),
                  (t._stringRef = a),
                  t);
            }
            if ('string' !== typeof e) throw Error(o(284));
            if (!n._owner) throw Error(o(290, e));
          }
          return e;
        }
        function yo(e, t) {
          throw (
            ((e = Object.prototype.toString.call(t)),
            Error(
              o(
                31,
                '[object Object]' === e
                  ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                  : e
              )
            ))
          );
        }
        function Ao(e) {
          return (0, e._init)(e._payload);
        }
        function bo(e) {
          function t(t, n) {
            if (e) {
              var r = t.deletions;
              null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
            }
          }
          function n(n, r) {
            if (!e) return null;
            for (; null !== r; ) t(n, r), (r = r.sibling);
            return null;
          }
          function r(e, t) {
            for (e = new Map(); null !== t; )
              null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
                (t = t.sibling);
            return e;
          }
          function i(e, t) {
            return ((e = ju(e, t)).index = 0), (e.sibling = null), e;
          }
          function a(t, n, r) {
            return (
              (t.index = r),
              e
                ? null !== (r = t.alternate)
                  ? (r = r.index) < n
                    ? ((t.flags |= 2), n)
                    : r
                  : ((t.flags |= 2), n)
                : ((t.flags |= 1048576), n)
            );
          }
          function s(t) {
            return e && null === t.alternate && (t.flags |= 2), t;
          }
          function l(e, t, n, r) {
            return null === t || 6 !== t.tag
              ? (((t = Bu(n, e.mode, r)).return = e), t)
              : (((t = i(t, n)).return = e), t);
          }
          function u(e, t, n, r) {
            var o = n.type;
            return o === S
              ? d(e, t, n.props.children, r, n.key)
              : null !== t &&
                  (t.elementType === o ||
                    ('object' === typeof o &&
                      null !== o &&
                      o.$$typeof === R &&
                      Ao(o) === t.type))
                ? (((r = i(t, n.props)).ref = vo(e, t, n)), (r.return = e), r)
                : (((r = Lu(n.type, n.key, n.props, null, e.mode, r)).ref = vo(
                    e,
                    t,
                    n
                  )),
                  (r.return = e),
                  r);
          }
          function c(e, t, n, r) {
            return null === t ||
              4 !== t.tag ||
              t.stateNode.containerInfo !== n.containerInfo ||
              t.stateNode.implementation !== n.implementation
              ? (((t = Vu(n, e.mode, r)).return = e), t)
              : (((t = i(t, n.children || [])).return = e), t);
          }
          function d(e, t, n, r, o) {
            return null === t || 7 !== t.tag
              ? (((t = zu(n, e.mode, r, o)).return = e), t)
              : (((t = i(t, n)).return = e), t);
          }
          function h(e, t, n) {
            if (('string' === typeof t && '' !== t) || 'number' === typeof t)
              return ((t = Bu('' + t, e.mode, n)).return = e), t;
            if ('object' === typeof t && null !== t) {
              switch (t.$$typeof) {
                case x:
                  return (
                    ((n = Lu(t.type, t.key, t.props, null, e.mode, n)).ref = vo(
                      e,
                      null,
                      t
                    )),
                    (n.return = e),
                    n
                  );
                case w:
                  return ((t = Vu(t, e.mode, n)).return = e), t;
                case R:
                  return h(e, (0, t._init)(t._payload), n);
              }
              if (te(t) || z(t))
                return ((t = zu(t, e.mode, n, null)).return = e), t;
              yo(e, t);
            }
            return null;
          }
          function f(e, t, n, r) {
            var i = null !== t ? t.key : null;
            if (('string' === typeof n && '' !== n) || 'number' === typeof n)
              return null !== i ? null : l(e, t, '' + n, r);
            if ('object' === typeof n && null !== n) {
              switch (n.$$typeof) {
                case x:
                  return n.key === i ? u(e, t, n, r) : null;
                case w:
                  return n.key === i ? c(e, t, n, r) : null;
                case R:
                  return f(e, t, (i = n._init)(n._payload), r);
              }
              if (te(n) || z(n)) return null !== i ? null : d(e, t, n, r, null);
              yo(e, n);
            }
            return null;
          }
          function p(e, t, n, r, i) {
            if (('string' === typeof r && '' !== r) || 'number' === typeof r)
              return l(t, (e = e.get(n) || null), '' + r, i);
            if ('object' === typeof r && null !== r) {
              switch (r.$$typeof) {
                case x:
                  return u(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    i
                  );
                case w:
                  return c(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    i
                  );
                case R:
                  return p(e, t, n, (0, r._init)(r._payload), i);
              }
              if (te(r) || z(r))
                return d(t, (e = e.get(n) || null), r, i, null);
              yo(t, r);
            }
            return null;
          }
          function m(i, o, s, l) {
            for (
              var u = null, c = null, d = o, m = (o = 0), g = null;
              null !== d && m < s.length;
              m++
            ) {
              d.index > m ? ((g = d), (d = null)) : (g = d.sibling);
              var v = f(i, d, s[m], l);
              if (null === v) {
                null === d && (d = g);
                break;
              }
              e && d && null === v.alternate && t(i, d),
                (o = a(v, o, m)),
                null === c ? (u = v) : (c.sibling = v),
                (c = v),
                (d = g);
            }
            if (m === s.length) return n(i, d), io && qi(i, m), u;
            if (null === d) {
              for (; m < s.length; m++)
                null !== (d = h(i, s[m], l)) &&
                  ((o = a(d, o, m)),
                  null === c ? (u = d) : (c.sibling = d),
                  (c = d));
              return io && qi(i, m), u;
            }
            for (d = r(i, d); m < s.length; m++)
              null !== (g = p(d, i, m, s[m], l)) &&
                (e &&
                  null !== g.alternate &&
                  d.delete(null === g.key ? m : g.key),
                (o = a(g, o, m)),
                null === c ? (u = g) : (c.sibling = g),
                (c = g));
            return (
              e &&
                d.forEach(function (e) {
                  return t(i, e);
                }),
              io && qi(i, m),
              u
            );
          }
          function g(i, s, l, u) {
            var c = z(l);
            if ('function' !== typeof c) throw Error(o(150));
            if (null == (l = c.call(l))) throw Error(o(151));
            for (
              var d = (c = null), m = s, g = (s = 0), v = null, y = l.next();
              null !== m && !y.done;
              g++, y = l.next()
            ) {
              m.index > g ? ((v = m), (m = null)) : (v = m.sibling);
              var A = f(i, m, y.value, u);
              if (null === A) {
                null === m && (m = v);
                break;
              }
              e && m && null === A.alternate && t(i, m),
                (s = a(A, s, g)),
                null === d ? (c = A) : (d.sibling = A),
                (d = A),
                (m = v);
            }
            if (y.done) return n(i, m), io && qi(i, g), c;
            if (null === m) {
              for (; !y.done; g++, y = l.next())
                null !== (y = h(i, y.value, u)) &&
                  ((s = a(y, s, g)),
                  null === d ? (c = y) : (d.sibling = y),
                  (d = y));
              return io && qi(i, g), c;
            }
            for (m = r(i, m); !y.done; g++, y = l.next())
              null !== (y = p(m, i, g, y.value, u)) &&
                (e &&
                  null !== y.alternate &&
                  m.delete(null === y.key ? g : y.key),
                (s = a(y, s, g)),
                null === d ? (c = y) : (d.sibling = y),
                (d = y));
            return (
              e &&
                m.forEach(function (e) {
                  return t(i, e);
                }),
              io && qi(i, g),
              c
            );
          }
          return function e(r, o, a, l) {
            if (
              ('object' === typeof a &&
                null !== a &&
                a.type === S &&
                null === a.key &&
                (a = a.props.children),
              'object' === typeof a && null !== a)
            ) {
              switch (a.$$typeof) {
                case x:
                  e: {
                    for (var u = a.key, c = o; null !== c; ) {
                      if (c.key === u) {
                        if ((u = a.type) === S) {
                          if (7 === c.tag) {
                            n(r, c.sibling),
                              ((o = i(c, a.props.children)).return = r),
                              (r = o);
                            break e;
                          }
                        } else if (
                          c.elementType === u ||
                          ('object' === typeof u &&
                            null !== u &&
                            u.$$typeof === R &&
                            Ao(u) === c.type)
                        ) {
                          n(r, c.sibling),
                            ((o = i(c, a.props)).ref = vo(r, c, a)),
                            (o.return = r),
                            (r = o);
                          break e;
                        }
                        n(r, c);
                        break;
                      }
                      t(r, c), (c = c.sibling);
                    }
                    a.type === S
                      ? (((o = zu(a.props.children, r.mode, l, a.key)).return =
                          r),
                        (r = o))
                      : (((l = Lu(
                          a.type,
                          a.key,
                          a.props,
                          null,
                          r.mode,
                          l
                        )).ref = vo(r, o, a)),
                        (l.return = r),
                        (r = l));
                  }
                  return s(r);
                case w:
                  e: {
                    for (c = a.key; null !== o; ) {
                      if (o.key === c) {
                        if (
                          4 === o.tag &&
                          o.stateNode.containerInfo === a.containerInfo &&
                          o.stateNode.implementation === a.implementation
                        ) {
                          n(r, o.sibling),
                            ((o = i(o, a.children || [])).return = r),
                            (r = o);
                          break e;
                        }
                        n(r, o);
                        break;
                      }
                      t(r, o), (o = o.sibling);
                    }
                    ((o = Vu(a, r.mode, l)).return = r), (r = o);
                  }
                  return s(r);
                case R:
                  return e(r, o, (c = a._init)(a._payload), l);
              }
              if (te(a)) return m(r, o, a, l);
              if (z(a)) return g(r, o, a, l);
              yo(r, a);
            }
            return ('string' === typeof a && '' !== a) || 'number' === typeof a
              ? ((a = '' + a),
                null !== o && 6 === o.tag
                  ? (n(r, o.sibling), ((o = i(o, a)).return = r), (r = o))
                  : (n(r, o), ((o = Bu(a, r.mode, l)).return = r), (r = o)),
                s(r))
              : n(r, o);
          };
        }
        var xo = bo(!0),
          wo = bo(!1),
          So = ki(null),
          ko = null,
          Eo = null,
          Po = null;
        function Co() {
          Po = Eo = ko = null;
        }
        function To(e) {
          var t = So.current;
          Ei(So), (e._currentValue = t);
        }
        function Fo(e, t, n) {
          for (; null !== e; ) {
            var r = e.alternate;
            if (
              ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
              e === n)
            )
              break;
            e = e.return;
          }
        }
        function Do(e, t) {
          (ko = e),
            (Po = Eo = null),
            null !== (e = e.dependencies) &&
              null !== e.firstContext &&
              (0 !== (e.lanes & t) && (As = !0), (e.firstContext = null));
        }
        function Mo(e) {
          var t = e._currentValue;
          if (Po !== e)
            if (
              ((e = { context: e, memoizedValue: t, next: null }), null === Eo)
            ) {
              if (null === ko) throw Error(o(308));
              (Eo = e), (ko.dependencies = { lanes: 0, firstContext: e });
            } else Eo = Eo.next = e;
          return t;
        }
        var Ro = null;
        function jo(e) {
          null === Ro ? (Ro = [e]) : Ro.push(e);
        }
        function Lo(e, t, n, r) {
          var i = t.interleaved;
          return (
            null === i
              ? ((n.next = n), jo(t))
              : ((n.next = i.next), (i.next = n)),
            (t.interleaved = n),
            zo(e, r)
          );
        }
        function zo(e, t) {
          e.lanes |= t;
          var n = e.alternate;
          for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
            (e.childLanes |= t),
              null !== (n = e.alternate) && (n.childLanes |= t),
              (n = e),
              (e = e.return);
          return 3 === n.tag ? n.stateNode : null;
        }
        var No = !1;
        function Bo(e) {
          e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, interleaved: null, lanes: 0 },
            effects: null,
          };
        }
        function Vo(e, t) {
          (e = e.updateQueue),
            t.updateQueue === e &&
              (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
              });
        }
        function Oo(e, t) {
          return {
            eventTime: e,
            lane: t,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
          };
        }
        function Io(e, t, n) {
          var r = e.updateQueue;
          if (null === r) return null;
          if (((r = r.shared), 0 !== (2 & Tl))) {
            var i = r.pending;
            return (
              null === i ? (t.next = t) : ((t.next = i.next), (i.next = t)),
              (r.pending = t),
              zo(e, n)
            );
          }
          return (
            null === (i = r.interleaved)
              ? ((t.next = t), jo(r))
              : ((t.next = i.next), (i.next = t)),
            (r.interleaved = t),
            zo(e, n)
          );
        }
        function Uo(e, t, n) {
          if (
            null !== (t = t.updateQueue) &&
            ((t = t.shared), 0 !== (4194240 & n))
          ) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), yt(e, n);
          }
        }
        function Zo(e, t) {
          var n = e.updateQueue,
            r = e.alternate;
          if (null !== r && n === (r = r.updateQueue)) {
            var i = null,
              o = null;
            if (null !== (n = n.firstBaseUpdate)) {
              do {
                var a = {
                  eventTime: n.eventTime,
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: n.callback,
                  next: null,
                };
                null === o ? (i = o = a) : (o = o.next = a), (n = n.next);
              } while (null !== n);
              null === o ? (i = o = t) : (o = o.next = t);
            } else i = o = t;
            return (
              (n = {
                baseState: r.baseState,
                firstBaseUpdate: i,
                lastBaseUpdate: o,
                shared: r.shared,
                effects: r.effects,
              }),
              void (e.updateQueue = n)
            );
          }
          null === (e = n.lastBaseUpdate)
            ? (n.firstBaseUpdate = t)
            : (e.next = t),
            (n.lastBaseUpdate = t);
        }
        function _o(e, t, n, r) {
          var i = e.updateQueue;
          No = !1;
          var o = i.firstBaseUpdate,
            a = i.lastBaseUpdate,
            s = i.shared.pending;
          if (null !== s) {
            i.shared.pending = null;
            var l = s,
              u = l.next;
            (l.next = null), null === a ? (o = u) : (a.next = u), (a = l);
            var c = e.alternate;
            null !== c &&
              (s = (c = c.updateQueue).lastBaseUpdate) !== a &&
              (null === s ? (c.firstBaseUpdate = u) : (s.next = u),
              (c.lastBaseUpdate = l));
          }
          if (null !== o) {
            var d = i.baseState;
            for (a = 0, c = u = l = null, s = o; ; ) {
              var h = s.lane,
                f = s.eventTime;
              if ((r & h) === h) {
                null !== c &&
                  (c = c.next =
                    {
                      eventTime: f,
                      lane: 0,
                      tag: s.tag,
                      payload: s.payload,
                      callback: s.callback,
                      next: null,
                    });
                e: {
                  var p = e,
                    m = s;
                  switch (((h = t), (f = n), m.tag)) {
                    case 1:
                      if ('function' === typeof (p = m.payload)) {
                        d = p.call(f, d, h);
                        break e;
                      }
                      d = p;
                      break e;
                    case 3:
                      p.flags = (-65537 & p.flags) | 128;
                    case 0:
                      if (
                        null ===
                          (h =
                            'function' === typeof (p = m.payload)
                              ? p.call(f, d, h)
                              : p) ||
                        void 0 === h
                      )
                        break e;
                      d = B({}, d, h);
                      break e;
                    case 2:
                      No = !0;
                  }
                }
                null !== s.callback &&
                  0 !== s.lane &&
                  ((e.flags |= 64),
                  null === (h = i.effects) ? (i.effects = [s]) : h.push(s));
              } else
                (f = {
                  eventTime: f,
                  lane: h,
                  tag: s.tag,
                  payload: s.payload,
                  callback: s.callback,
                  next: null,
                }),
                  null === c ? ((u = c = f), (l = d)) : (c = c.next = f),
                  (a |= h);
              if (null === (s = s.next)) {
                if (null === (s = i.shared.pending)) break;
                (s = (h = s).next),
                  (h.next = null),
                  (i.lastBaseUpdate = h),
                  (i.shared.pending = null);
              }
            }
            if (
              (null === c && (l = d),
              (i.baseState = l),
              (i.firstBaseUpdate = u),
              (i.lastBaseUpdate = c),
              null !== (t = i.shared.interleaved))
            ) {
              i = t;
              do {
                (a |= i.lane), (i = i.next);
              } while (i !== t);
            } else null === o && (i.shared.lanes = 0);
            (Nl |= a), (e.lanes = a), (e.memoizedState = d);
          }
        }
        function Wo(e, t, n) {
          if (((e = t.effects), (t.effects = null), null !== e))
            for (t = 0; t < e.length; t++) {
              var r = e[t],
                i = r.callback;
              if (null !== i) {
                if (((r.callback = null), (r = n), 'function' !== typeof i))
                  throw Error(o(191, i));
                i.call(r);
              }
            }
        }
        var Ho = {},
          Jo = ki(Ho),
          Yo = ki(Ho),
          Xo = ki(Ho);
        function Qo(e) {
          if (e === Ho) throw Error(o(174));
          return e;
        }
        function Go(e, t) {
          switch ((Pi(Xo, t), Pi(Yo, e), Pi(Jo, Ho), (e = t.nodeType))) {
            case 9:
            case 11:
              t = (t = t.documentElement) ? t.namespaceURI : le(null, '');
              break;
            default:
              t = le(
                (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
                (e = e.tagName)
              );
          }
          Ei(Jo), Pi(Jo, t);
        }
        function Ko() {
          Ei(Jo), Ei(Yo), Ei(Xo);
        }
        function qo(e) {
          Qo(Xo.current);
          var t = Qo(Jo.current),
            n = le(t, e.type);
          t !== n && (Pi(Yo, e), Pi(Jo, n));
        }
        function $o(e) {
          Yo.current === e && (Ei(Jo), Ei(Yo));
        }
        var ea = ki(0);
        function ta(e) {
          for (var t = e; null !== t; ) {
            if (13 === t.tag) {
              var n = t.memoizedState;
              if (
                null !== n &&
                (null === (n = n.dehydrated) ||
                  '$?' === n.data ||
                  '$!' === n.data)
              )
                return t;
            } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
              if (0 !== (128 & t.flags)) return t;
            } else if (null !== t.child) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break;
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) return null;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
          return null;
        }
        var na = [];
        function ra() {
          for (var e = 0; e < na.length; e++)
            na[e]._workInProgressVersionPrimary = null;
          na.length = 0;
        }
        var ia = b.ReactCurrentDispatcher,
          oa = b.ReactCurrentBatchConfig,
          aa = 0,
          sa = null,
          la = null,
          ua = null,
          ca = !1,
          da = !1,
          ha = 0,
          fa = 0;
        function pa() {
          throw Error(o(321));
        }
        function ma(e, t) {
          if (null === t) return !1;
          for (var n = 0; n < t.length && n < e.length; n++)
            if (!sr(e[n], t[n])) return !1;
          return !0;
        }
        function ga(e, t, n, r, i, a) {
          if (
            ((aa = a),
            (sa = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (ia.current = null === e || null === e.memoizedState ? $a : es),
            (e = n(r, i)),
            da)
          ) {
            a = 0;
            do {
              if (((da = !1), (ha = 0), 25 <= a)) throw Error(o(301));
              (a += 1),
                (ua = la = null),
                (t.updateQueue = null),
                (ia.current = ts),
                (e = n(r, i));
            } while (da);
          }
          if (
            ((ia.current = qa),
            (t = null !== la && null !== la.next),
            (aa = 0),
            (ua = la = sa = null),
            (ca = !1),
            t)
          )
            throw Error(o(300));
          return e;
        }
        function va() {
          var e = 0 !== ha;
          return (ha = 0), e;
        }
        function ya() {
          var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          };
          return (
            null === ua ? (sa.memoizedState = ua = e) : (ua = ua.next = e), ua
          );
        }
        function Aa() {
          if (null === la) {
            var e = sa.alternate;
            e = null !== e ? e.memoizedState : null;
          } else e = la.next;
          var t = null === ua ? sa.memoizedState : ua.next;
          if (null !== t) (ua = t), (la = e);
          else {
            if (null === e) throw Error(o(310));
            (e = {
              memoizedState: (la = e).memoizedState,
              baseState: la.baseState,
              baseQueue: la.baseQueue,
              queue: la.queue,
              next: null,
            }),
              null === ua ? (sa.memoizedState = ua = e) : (ua = ua.next = e);
          }
          return ua;
        }
        function ba(e, t) {
          return 'function' === typeof t ? t(e) : t;
        }
        function xa(e) {
          var t = Aa(),
            n = t.queue;
          if (null === n) throw Error(o(311));
          n.lastRenderedReducer = e;
          var r = la,
            i = r.baseQueue,
            a = n.pending;
          if (null !== a) {
            if (null !== i) {
              var s = i.next;
              (i.next = a.next), (a.next = s);
            }
            (r.baseQueue = i = a), (n.pending = null);
          }
          if (null !== i) {
            (a = i.next), (r = r.baseState);
            var l = (s = null),
              u = null,
              c = a;
            do {
              var d = c.lane;
              if ((aa & d) === d)
                null !== u &&
                  (u = u.next =
                    {
                      lane: 0,
                      action: c.action,
                      hasEagerState: c.hasEagerState,
                      eagerState: c.eagerState,
                      next: null,
                    }),
                  (r = c.hasEagerState ? c.eagerState : e(r, c.action));
              else {
                var h = {
                  lane: d,
                  action: c.action,
                  hasEagerState: c.hasEagerState,
                  eagerState: c.eagerState,
                  next: null,
                };
                null === u ? ((l = u = h), (s = r)) : (u = u.next = h),
                  (sa.lanes |= d),
                  (Nl |= d);
              }
              c = c.next;
            } while (null !== c && c !== a);
            null === u ? (s = r) : (u.next = l),
              sr(r, t.memoizedState) || (As = !0),
              (t.memoizedState = r),
              (t.baseState = s),
              (t.baseQueue = u),
              (n.lastRenderedState = r);
          }
          if (null !== (e = n.interleaved)) {
            i = e;
            do {
              (a = i.lane), (sa.lanes |= a), (Nl |= a), (i = i.next);
            } while (i !== e);
          } else null === i && (n.lanes = 0);
          return [t.memoizedState, n.dispatch];
        }
        function wa(e) {
          var t = Aa(),
            n = t.queue;
          if (null === n) throw Error(o(311));
          n.lastRenderedReducer = e;
          var r = n.dispatch,
            i = n.pending,
            a = t.memoizedState;
          if (null !== i) {
            n.pending = null;
            var s = (i = i.next);
            do {
              (a = e(a, s.action)), (s = s.next);
            } while (s !== i);
            sr(a, t.memoizedState) || (As = !0),
              (t.memoizedState = a),
              null === t.baseQueue && (t.baseState = a),
              (n.lastRenderedState = a);
          }
          return [a, r];
        }
        function Sa() {}
        function ka(e, t) {
          var n = sa,
            r = Aa(),
            i = t(),
            a = !sr(r.memoizedState, i);
          if (
            (a && ((r.memoizedState = i), (As = !0)),
            (r = r.queue),
            Na(Ca.bind(null, n, r, e), [e]),
            r.getSnapshot !== t ||
              a ||
              (null !== ua && 1 & ua.memoizedState.tag))
          ) {
            if (
              ((n.flags |= 2048),
              Ma(9, Pa.bind(null, n, r, i, t), void 0, null),
              null === Fl)
            )
              throw Error(o(349));
            0 !== (30 & aa) || Ea(n, t, i);
          }
          return i;
        }
        function Ea(e, t, n) {
          (e.flags |= 16384),
            (e = { getSnapshot: t, value: n }),
            null === (t = sa.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (sa.updateQueue = t),
                (t.stores = [e]))
              : null === (n = t.stores)
                ? (t.stores = [e])
                : n.push(e);
        }
        function Pa(e, t, n, r) {
          (t.value = n), (t.getSnapshot = r), Ta(t) && Fa(e);
        }
        function Ca(e, t, n) {
          return n(function () {
            Ta(t) && Fa(e);
          });
        }
        function Ta(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var n = t();
            return !sr(e, n);
          } catch (r) {
            return !0;
          }
        }
        function Fa(e) {
          var t = zo(e, 1);
          null !== t && nu(t, e, 1, -1);
        }
        function Da(e) {
          var t = ya();
          return (
            'function' === typeof e && (e = e()),
            (t.memoizedState = t.baseState = e),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: ba,
              lastRenderedState: e,
            }),
            (t.queue = e),
            (e = e.dispatch = Xa.bind(null, sa, e)),
            [t.memoizedState, e]
          );
        }
        function Ma(e, t, n, r) {
          return (
            (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
            null === (t = sa.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (sa.updateQueue = t),
                (t.lastEffect = e.next = e))
              : null === (n = t.lastEffect)
                ? (t.lastEffect = e.next = e)
                : ((r = n.next),
                  (n.next = e),
                  (e.next = r),
                  (t.lastEffect = e)),
            e
          );
        }
        function Ra() {
          return Aa().memoizedState;
        }
        function ja(e, t, n, r) {
          var i = ya();
          (sa.flags |= e),
            (i.memoizedState = Ma(1 | t, n, void 0, void 0 === r ? null : r));
        }
        function La(e, t, n, r) {
          var i = Aa();
          r = void 0 === r ? null : r;
          var o = void 0;
          if (null !== la) {
            var a = la.memoizedState;
            if (((o = a.destroy), null !== r && ma(r, a.deps)))
              return void (i.memoizedState = Ma(t, n, o, r));
          }
          (sa.flags |= e), (i.memoizedState = Ma(1 | t, n, o, r));
        }
        function za(e, t) {
          return ja(8390656, 8, e, t);
        }
        function Na(e, t) {
          return La(2048, 8, e, t);
        }
        function Ba(e, t) {
          return La(4, 2, e, t);
        }
        function Va(e, t) {
          return La(4, 4, e, t);
        }
        function Oa(e, t) {
          return 'function' === typeof t
            ? ((e = e()),
              t(e),
              function () {
                t(null);
              })
            : null !== t && void 0 !== t
              ? ((e = e()),
                (t.current = e),
                function () {
                  t.current = null;
                })
              : void 0;
        }
        function Ia(e, t, n) {
          return (
            (n = null !== n && void 0 !== n ? n.concat([e]) : null),
            La(4, 4, Oa.bind(null, t, e), n)
          );
        }
        function Ua() {}
        function Za(e, t) {
          var n = Aa();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && ma(t, r[1])
            ? r[0]
            : ((n.memoizedState = [e, t]), e);
        }
        function _a(e, t) {
          var n = Aa();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && ma(t, r[1])
            ? r[0]
            : ((e = e()), (n.memoizedState = [e, t]), e);
        }
        function Wa(e, t, n) {
          return 0 === (21 & aa)
            ? (e.baseState && ((e.baseState = !1), (As = !0)),
              (e.memoizedState = n))
            : (sr(n, t) ||
                ((n = mt()), (sa.lanes |= n), (Nl |= n), (e.baseState = !0)),
              t);
        }
        function Ha(e, t) {
          var n = At;
          (At = 0 !== n && 4 > n ? n : 4), e(!0);
          var r = oa.transition;
          oa.transition = {};
          try {
            e(!1), t();
          } finally {
            (At = n), (oa.transition = r);
          }
        }
        function Ja() {
          return Aa().memoizedState;
        }
        function Ya(e, t, n) {
          var r = tu(e);
          if (
            ((n = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
            Qa(e))
          )
            Ga(t, n);
          else if (null !== (n = Lo(e, t, n, r))) {
            nu(n, e, r, eu()), Ka(n, t, r);
          }
        }
        function Xa(e, t, n) {
          var r = tu(e),
            i = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            };
          if (Qa(e)) Ga(t, i);
          else {
            var o = e.alternate;
            if (
              0 === e.lanes &&
              (null === o || 0 === o.lanes) &&
              null !== (o = t.lastRenderedReducer)
            )
              try {
                var a = t.lastRenderedState,
                  s = o(a, n);
                if (((i.hasEagerState = !0), (i.eagerState = s), sr(s, a))) {
                  var l = t.interleaved;
                  return (
                    null === l
                      ? ((i.next = i), jo(t))
                      : ((i.next = l.next), (l.next = i)),
                    void (t.interleaved = i)
                  );
                }
              } catch (u) {}
            null !== (n = Lo(e, t, i, r)) &&
              (nu(n, e, r, (i = eu())), Ka(n, t, r));
          }
        }
        function Qa(e) {
          var t = e.alternate;
          return e === sa || (null !== t && t === sa);
        }
        function Ga(e, t) {
          da = ca = !0;
          var n = e.pending;
          null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
            (e.pending = t);
        }
        function Ka(e, t, n) {
          if (0 !== (4194240 & n)) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), yt(e, n);
          }
        }
        var qa = {
            readContext: Mo,
            useCallback: pa,
            useContext: pa,
            useEffect: pa,
            useImperativeHandle: pa,
            useInsertionEffect: pa,
            useLayoutEffect: pa,
            useMemo: pa,
            useReducer: pa,
            useRef: pa,
            useState: pa,
            useDebugValue: pa,
            useDeferredValue: pa,
            useTransition: pa,
            useMutableSource: pa,
            useSyncExternalStore: pa,
            useId: pa,
            unstable_isNewReconciler: !1,
          },
          $a = {
            readContext: Mo,
            useCallback: function (e, t) {
              return (ya().memoizedState = [e, void 0 === t ? null : t]), e;
            },
            useContext: Mo,
            useEffect: za,
            useImperativeHandle: function (e, t, n) {
              return (
                (n = null !== n && void 0 !== n ? n.concat([e]) : null),
                ja(4194308, 4, Oa.bind(null, t, e), n)
              );
            },
            useLayoutEffect: function (e, t) {
              return ja(4194308, 4, e, t);
            },
            useInsertionEffect: function (e, t) {
              return ja(4, 2, e, t);
            },
            useMemo: function (e, t) {
              var n = ya();
              return (
                (t = void 0 === t ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
              );
            },
            useReducer: function (e, t, n) {
              var r = ya();
              return (
                (t = void 0 !== n ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                  pending: null,
                  interleaved: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Ya.bind(null, sa, e)),
                [r.memoizedState, e]
              );
            },
            useRef: function (e) {
              return (e = { current: e }), (ya().memoizedState = e);
            },
            useState: Da,
            useDebugValue: Ua,
            useDeferredValue: function (e) {
              return (ya().memoizedState = e);
            },
            useTransition: function () {
              var e = Da(!1),
                t = e[0];
              return (
                (e = Ha.bind(null, e[1])), (ya().memoizedState = e), [t, e]
              );
            },
            useMutableSource: function () {},
            useSyncExternalStore: function (e, t, n) {
              var r = sa,
                i = ya();
              if (io) {
                if (void 0 === n) throw Error(o(407));
                n = n();
              } else {
                if (((n = t()), null === Fl)) throw Error(o(349));
                0 !== (30 & aa) || Ea(r, t, n);
              }
              i.memoizedState = n;
              var a = { value: n, getSnapshot: t };
              return (
                (i.queue = a),
                za(Ca.bind(null, r, a, e), [e]),
                (r.flags |= 2048),
                Ma(9, Pa.bind(null, r, a, n, t), void 0, null),
                n
              );
            },
            useId: function () {
              var e = ya(),
                t = Fl.identifierPrefix;
              if (io) {
                var n = Ki;
                (t =
                  ':' +
                  t +
                  'R' +
                  (n = (Gi & ~(1 << (32 - at(Gi) - 1))).toString(32) + n)),
                  0 < (n = ha++) && (t += 'H' + n.toString(32)),
                  (t += ':');
              } else t = ':' + t + 'r' + (n = fa++).toString(32) + ':';
              return (e.memoizedState = t);
            },
            unstable_isNewReconciler: !1,
          },
          es = {
            readContext: Mo,
            useCallback: Za,
            useContext: Mo,
            useEffect: Na,
            useImperativeHandle: Ia,
            useInsertionEffect: Ba,
            useLayoutEffect: Va,
            useMemo: _a,
            useReducer: xa,
            useRef: Ra,
            useState: function () {
              return xa(ba);
            },
            useDebugValue: Ua,
            useDeferredValue: function (e) {
              return Wa(Aa(), la.memoizedState, e);
            },
            useTransition: function () {
              return [xa(ba)[0], Aa().memoizedState];
            },
            useMutableSource: Sa,
            useSyncExternalStore: ka,
            useId: Ja,
            unstable_isNewReconciler: !1,
          },
          ts = {
            readContext: Mo,
            useCallback: Za,
            useContext: Mo,
            useEffect: Na,
            useImperativeHandle: Ia,
            useInsertionEffect: Ba,
            useLayoutEffect: Va,
            useMemo: _a,
            useReducer: wa,
            useRef: Ra,
            useState: function () {
              return wa(ba);
            },
            useDebugValue: Ua,
            useDeferredValue: function (e) {
              var t = Aa();
              return null === la
                ? (t.memoizedState = e)
                : Wa(t, la.memoizedState, e);
            },
            useTransition: function () {
              return [wa(ba)[0], Aa().memoizedState];
            },
            useMutableSource: Sa,
            useSyncExternalStore: ka,
            useId: Ja,
            unstable_isNewReconciler: !1,
          };
        function ns(e, t) {
          if (e && e.defaultProps) {
            for (var n in ((t = B({}, t)), (e = e.defaultProps)))
              void 0 === t[n] && (t[n] = e[n]);
            return t;
          }
          return t;
        }
        function rs(e, t, n, r) {
          (n =
            null === (n = n(r, (t = e.memoizedState))) || void 0 === n
              ? t
              : B({}, t, n)),
            (e.memoizedState = n),
            0 === e.lanes && (e.updateQueue.baseState = n);
        }
        var is = {
          isMounted: function (e) {
            return !!(e = e._reactInternals) && Ze(e) === e;
          },
          enqueueSetState: function (e, t, n) {
            e = e._reactInternals;
            var r = eu(),
              i = tu(e),
              o = Oo(r, i);
            (o.payload = t),
              void 0 !== n && null !== n && (o.callback = n),
              null !== (t = Io(e, o, i)) && (nu(t, e, i, r), Uo(t, e, i));
          },
          enqueueReplaceState: function (e, t, n) {
            e = e._reactInternals;
            var r = eu(),
              i = tu(e),
              o = Oo(r, i);
            (o.tag = 1),
              (o.payload = t),
              void 0 !== n && null !== n && (o.callback = n),
              null !== (t = Io(e, o, i)) && (nu(t, e, i, r), Uo(t, e, i));
          },
          enqueueForceUpdate: function (e, t) {
            e = e._reactInternals;
            var n = eu(),
              r = tu(e),
              i = Oo(n, r);
            (i.tag = 2),
              void 0 !== t && null !== t && (i.callback = t),
              null !== (t = Io(e, i, r)) && (nu(t, e, r, n), Uo(t, e, r));
          },
        };
        function os(e, t, n, r, i, o, a) {
          return 'function' === typeof (e = e.stateNode).shouldComponentUpdate
            ? e.shouldComponentUpdate(r, o, a)
            : !t.prototype ||
                !t.prototype.isPureReactComponent ||
                !lr(n, r) ||
                !lr(i, o);
        }
        function as(e, t, n) {
          var r = !1,
            i = Ci,
            o = t.contextType;
          return (
            'object' === typeof o && null !== o
              ? (o = Mo(o))
              : ((i = Ri(t) ? Di : Ti.current),
                (o = (r = null !== (r = t.contextTypes) && void 0 !== r)
                  ? Mi(e, i)
                  : Ci)),
            (t = new t(n, o)),
            (e.memoizedState =
              null !== t.state && void 0 !== t.state ? t.state : null),
            (t.updater = is),
            (e.stateNode = t),
            (t._reactInternals = e),
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                i),
              (e.__reactInternalMemoizedMaskedChildContext = o)),
            t
          );
        }
        function ss(e, t, n, r) {
          (e = t.state),
            'function' === typeof t.componentWillReceiveProps &&
              t.componentWillReceiveProps(n, r),
            'function' === typeof t.UNSAFE_componentWillReceiveProps &&
              t.UNSAFE_componentWillReceiveProps(n, r),
            t.state !== e && is.enqueueReplaceState(t, t.state, null);
        }
        function ls(e, t, n, r) {
          var i = e.stateNode;
          (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Bo(e);
          var o = t.contextType;
          'object' === typeof o && null !== o
            ? (i.context = Mo(o))
            : ((o = Ri(t) ? Di : Ti.current), (i.context = Mi(e, o))),
            (i.state = e.memoizedState),
            'function' === typeof (o = t.getDerivedStateFromProps) &&
              (rs(e, t, o, n), (i.state = e.memoizedState)),
            'function' === typeof t.getDerivedStateFromProps ||
              'function' === typeof i.getSnapshotBeforeUpdate ||
              ('function' !== typeof i.UNSAFE_componentWillMount &&
                'function' !== typeof i.componentWillMount) ||
              ((t = i.state),
              'function' === typeof i.componentWillMount &&
                i.componentWillMount(),
              'function' === typeof i.UNSAFE_componentWillMount &&
                i.UNSAFE_componentWillMount(),
              t !== i.state && is.enqueueReplaceState(i, i.state, null),
              _o(e, n, i, r),
              (i.state = e.memoizedState)),
            'function' === typeof i.componentDidMount && (e.flags |= 4194308);
        }
        function us(e, t) {
          try {
            var n = '',
              r = t;
            do {
              (n += U(r)), (r = r.return);
            } while (r);
            var i = n;
          } catch (o) {
            i = '\nError generating stack: ' + o.message + '\n' + o.stack;
          }
          return { value: e, source: t, stack: i, digest: null };
        }
        function cs(e, t, n) {
          return {
            value: e,
            source: null,
            stack: null != n ? n : null,
            digest: null != t ? t : null,
          };
        }
        function ds(e, t) {
          try {
            console.error(t.value);
          } catch (n) {
            setTimeout(function () {
              throw n;
            });
          }
        }
        var hs = 'function' === typeof WeakMap ? WeakMap : Map;
        function fs(e, t, n) {
          ((n = Oo(-1, n)).tag = 3), (n.payload = { element: null });
          var r = t.value;
          return (
            (n.callback = function () {
              Wl || ((Wl = !0), (Hl = r)), ds(0, t);
            }),
            n
          );
        }
        function ps(e, t, n) {
          (n = Oo(-1, n)).tag = 3;
          var r = e.type.getDerivedStateFromError;
          if ('function' === typeof r) {
            var i = t.value;
            (n.payload = function () {
              return r(i);
            }),
              (n.callback = function () {
                ds(0, t);
              });
          }
          var o = e.stateNode;
          return (
            null !== o &&
              'function' === typeof o.componentDidCatch &&
              (n.callback = function () {
                ds(0, t),
                  'function' !== typeof r &&
                    (null === Jl ? (Jl = new Set([this])) : Jl.add(this));
                var e = t.stack;
                this.componentDidCatch(t.value, {
                  componentStack: null !== e ? e : '',
                });
              }),
            n
          );
        }
        function ms(e, t, n) {
          var r = e.pingCache;
          if (null === r) {
            r = e.pingCache = new hs();
            var i = new Set();
            r.set(t, i);
          } else void 0 === (i = r.get(t)) && ((i = new Set()), r.set(t, i));
          i.has(n) || (i.add(n), (e = Eu.bind(null, e, t, n)), t.then(e, e));
        }
        function gs(e) {
          do {
            var t;
            if (
              ((t = 13 === e.tag) &&
                (t = null === (t = e.memoizedState) || null !== t.dehydrated),
              t)
            )
              return e;
            e = e.return;
          } while (null !== e);
          return null;
        }
        function vs(e, t, n, r, i) {
          return 0 === (1 & e.mode)
            ? (e === t
                ? (e.flags |= 65536)
                : ((e.flags |= 128),
                  (n.flags |= 131072),
                  (n.flags &= -52805),
                  1 === n.tag &&
                    (null === n.alternate
                      ? (n.tag = 17)
                      : (((t = Oo(-1, 1)).tag = 2), Io(n, t, 1))),
                  (n.lanes |= 1)),
              e)
            : ((e.flags |= 65536), (e.lanes = i), e);
        }
        var ys = b.ReactCurrentOwner,
          As = !1;
        function bs(e, t, n, r) {
          t.child = null === e ? wo(t, null, n, r) : xo(t, e.child, n, r);
        }
        function xs(e, t, n, r, i) {
          n = n.render;
          var o = t.ref;
          return (
            Do(t, i),
            (r = ga(e, t, n, r, o, i)),
            (n = va()),
            null === e || As
              ? (io && n && eo(t), (t.flags |= 1), bs(e, t, r, i), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~i),
                Ws(e, t, i))
          );
        }
        function ws(e, t, n, r, i) {
          if (null === e) {
            var o = n.type;
            return 'function' !== typeof o ||
              Ru(o) ||
              void 0 !== o.defaultProps ||
              null !== n.compare ||
              void 0 !== n.defaultProps
              ? (((e = Lu(n.type, null, r, t, t.mode, i)).ref = t.ref),
                (e.return = t),
                (t.child = e))
              : ((t.tag = 15), (t.type = o), Ss(e, t, o, r, i));
          }
          if (((o = e.child), 0 === (e.lanes & i))) {
            var a = o.memoizedProps;
            if (
              (n = null !== (n = n.compare) ? n : lr)(a, r) &&
              e.ref === t.ref
            )
              return Ws(e, t, i);
          }
          return (
            (t.flags |= 1),
            ((e = ju(o, r)).ref = t.ref),
            (e.return = t),
            (t.child = e)
          );
        }
        function Ss(e, t, n, r, i) {
          if (null !== e) {
            var o = e.memoizedProps;
            if (lr(o, r) && e.ref === t.ref) {
              if (((As = !1), (t.pendingProps = r = o), 0 === (e.lanes & i)))
                return (t.lanes = e.lanes), Ws(e, t, i);
              0 !== (131072 & e.flags) && (As = !0);
            }
          }
          return Ps(e, t, n, r, i);
        }
        function ks(e, t, n) {
          var r = t.pendingProps,
            i = r.children,
            o = null !== e ? e.memoizedState : null;
          if ('hidden' === r.mode)
            if (0 === (1 & t.mode))
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                Pi(jl, Rl),
                (Rl |= n);
            else {
              if (0 === (1073741824 & n))
                return (
                  (e = null !== o ? o.baseLanes | n : n),
                  (t.lanes = t.childLanes = 1073741824),
                  (t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null,
                  }),
                  (t.updateQueue = null),
                  Pi(jl, Rl),
                  (Rl |= e),
                  null
                );
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                (r = null !== o ? o.baseLanes : n),
                Pi(jl, Rl),
                (Rl |= r);
            }
          else
            null !== o
              ? ((r = o.baseLanes | n), (t.memoizedState = null))
              : (r = n),
              Pi(jl, Rl),
              (Rl |= r);
          return bs(e, t, i, n), t.child;
        }
        function Es(e, t) {
          var n = t.ref;
          ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
            ((t.flags |= 512), (t.flags |= 2097152));
        }
        function Ps(e, t, n, r, i) {
          var o = Ri(n) ? Di : Ti.current;
          return (
            (o = Mi(t, o)),
            Do(t, i),
            (n = ga(e, t, n, r, o, i)),
            (r = va()),
            null === e || As
              ? (io && r && eo(t), (t.flags |= 1), bs(e, t, n, i), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~i),
                Ws(e, t, i))
          );
        }
        function Cs(e, t, n, r, i) {
          if (Ri(n)) {
            var o = !0;
            Ni(t);
          } else o = !1;
          if ((Do(t, i), null === t.stateNode))
            _s(e, t), as(t, n, r), ls(t, n, r, i), (r = !0);
          else if (null === e) {
            var a = t.stateNode,
              s = t.memoizedProps;
            a.props = s;
            var l = a.context,
              u = n.contextType;
            'object' === typeof u && null !== u
              ? (u = Mo(u))
              : (u = Mi(t, (u = Ri(n) ? Di : Ti.current)));
            var c = n.getDerivedStateFromProps,
              d =
                'function' === typeof c ||
                'function' === typeof a.getSnapshotBeforeUpdate;
            d ||
              ('function' !== typeof a.UNSAFE_componentWillReceiveProps &&
                'function' !== typeof a.componentWillReceiveProps) ||
              ((s !== r || l !== u) && ss(t, a, r, u)),
              (No = !1);
            var h = t.memoizedState;
            (a.state = h),
              _o(t, r, a, i),
              (l = t.memoizedState),
              s !== r || h !== l || Fi.current || No
                ? ('function' === typeof c &&
                    (rs(t, n, c, r), (l = t.memoizedState)),
                  (s = No || os(t, n, s, r, h, l, u))
                    ? (d ||
                        ('function' !== typeof a.UNSAFE_componentWillMount &&
                          'function' !== typeof a.componentWillMount) ||
                        ('function' === typeof a.componentWillMount &&
                          a.componentWillMount(),
                        'function' === typeof a.UNSAFE_componentWillMount &&
                          a.UNSAFE_componentWillMount()),
                      'function' === typeof a.componentDidMount &&
                        (t.flags |= 4194308))
                    : ('function' === typeof a.componentDidMount &&
                        (t.flags |= 4194308),
                      (t.memoizedProps = r),
                      (t.memoizedState = l)),
                  (a.props = r),
                  (a.state = l),
                  (a.context = u),
                  (r = s))
                : ('function' === typeof a.componentDidMount &&
                    (t.flags |= 4194308),
                  (r = !1));
          } else {
            (a = t.stateNode),
              Vo(e, t),
              (s = t.memoizedProps),
              (u = t.type === t.elementType ? s : ns(t.type, s)),
              (a.props = u),
              (d = t.pendingProps),
              (h = a.context),
              'object' === typeof (l = n.contextType) && null !== l
                ? (l = Mo(l))
                : (l = Mi(t, (l = Ri(n) ? Di : Ti.current)));
            var f = n.getDerivedStateFromProps;
            (c =
              'function' === typeof f ||
              'function' === typeof a.getSnapshotBeforeUpdate) ||
              ('function' !== typeof a.UNSAFE_componentWillReceiveProps &&
                'function' !== typeof a.componentWillReceiveProps) ||
              ((s !== d || h !== l) && ss(t, a, r, l)),
              (No = !1),
              (h = t.memoizedState),
              (a.state = h),
              _o(t, r, a, i);
            var p = t.memoizedState;
            s !== d || h !== p || Fi.current || No
              ? ('function' === typeof f &&
                  (rs(t, n, f, r), (p = t.memoizedState)),
                (u = No || os(t, n, u, r, h, p, l) || !1)
                  ? (c ||
                      ('function' !== typeof a.UNSAFE_componentWillUpdate &&
                        'function' !== typeof a.componentWillUpdate) ||
                      ('function' === typeof a.componentWillUpdate &&
                        a.componentWillUpdate(r, p, l),
                      'function' === typeof a.UNSAFE_componentWillUpdate &&
                        a.UNSAFE_componentWillUpdate(r, p, l)),
                    'function' === typeof a.componentDidUpdate &&
                      (t.flags |= 4),
                    'function' === typeof a.getSnapshotBeforeUpdate &&
                      (t.flags |= 1024))
                  : ('function' !== typeof a.componentDidUpdate ||
                      (s === e.memoizedProps && h === e.memoizedState) ||
                      (t.flags |= 4),
                    'function' !== typeof a.getSnapshotBeforeUpdate ||
                      (s === e.memoizedProps && h === e.memoizedState) ||
                      (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = p)),
                (a.props = r),
                (a.state = p),
                (a.context = l),
                (r = u))
              : ('function' !== typeof a.componentDidUpdate ||
                  (s === e.memoizedProps && h === e.memoizedState) ||
                  (t.flags |= 4),
                'function' !== typeof a.getSnapshotBeforeUpdate ||
                  (s === e.memoizedProps && h === e.memoizedState) ||
                  (t.flags |= 1024),
                (r = !1));
          }
          return Ts(e, t, n, r, o, i);
        }
        function Ts(e, t, n, r, i, o) {
          Es(e, t);
          var a = 0 !== (128 & t.flags);
          if (!r && !a) return i && Bi(t, n, !1), Ws(e, t, o);
          (r = t.stateNode), (ys.current = t);
          var s =
            a && 'function' !== typeof n.getDerivedStateFromError
              ? null
              : r.render();
          return (
            (t.flags |= 1),
            null !== e && a
              ? ((t.child = xo(t, e.child, null, o)),
                (t.child = xo(t, null, s, o)))
              : bs(e, t, s, o),
            (t.memoizedState = r.state),
            i && Bi(t, n, !0),
            t.child
          );
        }
        function Fs(e) {
          var t = e.stateNode;
          t.pendingContext
            ? Li(0, t.pendingContext, t.pendingContext !== t.context)
            : t.context && Li(0, t.context, !1),
            Go(e, t.containerInfo);
        }
        function Ds(e, t, n, r, i) {
          return po(), mo(i), (t.flags |= 256), bs(e, t, n, r), t.child;
        }
        var Ms,
          Rs,
          js,
          Ls,
          zs = { dehydrated: null, treeContext: null, retryLane: 0 };
        function Ns(e) {
          return { baseLanes: e, cachePool: null, transitions: null };
        }
        function Bs(e, t, n) {
          var r,
            i = t.pendingProps,
            a = ea.current,
            s = !1,
            l = 0 !== (128 & t.flags);
          if (
            ((r = l) ||
              (r = (null === e || null !== e.memoizedState) && 0 !== (2 & a)),
            r
              ? ((s = !0), (t.flags &= -129))
              : (null !== e && null === e.memoizedState) || (a |= 1),
            Pi(ea, 1 & a),
            null === e)
          )
            return (
              uo(t),
              null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
                ? (0 === (1 & t.mode)
                    ? (t.lanes = 1)
                    : '$!' === e.data
                      ? (t.lanes = 8)
                      : (t.lanes = 1073741824),
                  null)
                : ((l = i.children),
                  (e = i.fallback),
                  s
                    ? ((i = t.mode),
                      (s = t.child),
                      (l = { mode: 'hidden', children: l }),
                      0 === (1 & i) && null !== s
                        ? ((s.childLanes = 0), (s.pendingProps = l))
                        : (s = Nu(l, i, 0, null)),
                      (e = zu(e, i, n, null)),
                      (s.return = t),
                      (e.return = t),
                      (s.sibling = e),
                      (t.child = s),
                      (t.child.memoizedState = Ns(n)),
                      (t.memoizedState = zs),
                      e)
                    : Vs(t, l))
            );
          if (null !== (a = e.memoizedState) && null !== (r = a.dehydrated))
            return (function (e, t, n, r, i, a, s) {
              if (n)
                return 256 & t.flags
                  ? ((t.flags &= -257), Os(e, t, s, (r = cs(Error(o(422))))))
                  : null !== t.memoizedState
                    ? ((t.child = e.child), (t.flags |= 128), null)
                    : ((a = r.fallback),
                      (i = t.mode),
                      (r = Nu(
                        { mode: 'visible', children: r.children },
                        i,
                        0,
                        null
                      )),
                      ((a = zu(a, i, s, null)).flags |= 2),
                      (r.return = t),
                      (a.return = t),
                      (r.sibling = a),
                      (t.child = r),
                      0 !== (1 & t.mode) && xo(t, e.child, null, s),
                      (t.child.memoizedState = Ns(s)),
                      (t.memoizedState = zs),
                      a);
              if (0 === (1 & t.mode)) return Os(e, t, s, null);
              if ('$!' === i.data) {
                if ((r = i.nextSibling && i.nextSibling.dataset))
                  var l = r.dgst;
                return (
                  (r = l), Os(e, t, s, (r = cs((a = Error(o(419))), r, void 0)))
                );
              }
              if (((l = 0 !== (s & e.childLanes)), As || l)) {
                if (null !== (r = Fl)) {
                  switch (s & -s) {
                    case 4:
                      i = 2;
                      break;
                    case 16:
                      i = 8;
                      break;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                      i = 32;
                      break;
                    case 536870912:
                      i = 268435456;
                      break;
                    default:
                      i = 0;
                  }
                  0 !== (i = 0 !== (i & (r.suspendedLanes | s)) ? 0 : i) &&
                    i !== a.retryLane &&
                    ((a.retryLane = i), zo(e, i), nu(r, e, i, -1));
                }
                return mu(), Os(e, t, s, (r = cs(Error(o(421)))));
              }
              return '$?' === i.data
                ? ((t.flags |= 128),
                  (t.child = e.child),
                  (t = Cu.bind(null, e)),
                  (i._reactRetry = t),
                  null)
                : ((e = a.treeContext),
                  (ro = ui(i.nextSibling)),
                  (no = t),
                  (io = !0),
                  (oo = null),
                  null !== e &&
                    ((Yi[Xi++] = Gi),
                    (Yi[Xi++] = Ki),
                    (Yi[Xi++] = Qi),
                    (Gi = e.id),
                    (Ki = e.overflow),
                    (Qi = t)),
                  (t = Vs(t, r.children)),
                  (t.flags |= 4096),
                  t);
            })(e, t, l, i, r, a, n);
          if (s) {
            (s = i.fallback), (l = t.mode), (r = (a = e.child).sibling);
            var u = { mode: 'hidden', children: i.children };
            return (
              0 === (1 & l) && t.child !== a
                ? (((i = t.child).childLanes = 0),
                  (i.pendingProps = u),
                  (t.deletions = null))
                : ((i = ju(a, u)).subtreeFlags = 14680064 & a.subtreeFlags),
              null !== r
                ? (s = ju(r, s))
                : ((s = zu(s, l, n, null)).flags |= 2),
              (s.return = t),
              (i.return = t),
              (i.sibling = s),
              (t.child = i),
              (i = s),
              (s = t.child),
              (l =
                null === (l = e.child.memoizedState)
                  ? Ns(n)
                  : {
                      baseLanes: l.baseLanes | n,
                      cachePool: null,
                      transitions: l.transitions,
                    }),
              (s.memoizedState = l),
              (s.childLanes = e.childLanes & ~n),
              (t.memoizedState = zs),
              i
            );
          }
          return (
            (e = (s = e.child).sibling),
            (i = ju(s, { mode: 'visible', children: i.children })),
            0 === (1 & t.mode) && (i.lanes = n),
            (i.return = t),
            (i.sibling = null),
            null !== e &&
              (null === (n = t.deletions)
                ? ((t.deletions = [e]), (t.flags |= 16))
                : n.push(e)),
            (t.child = i),
            (t.memoizedState = null),
            i
          );
        }
        function Vs(e, t) {
          return (
            ((t = Nu(
              { mode: 'visible', children: t },
              e.mode,
              0,
              null
            )).return = e),
            (e.child = t)
          );
        }
        function Os(e, t, n, r) {
          return (
            null !== r && mo(r),
            xo(t, e.child, null, n),
            ((e = Vs(t, t.pendingProps.children)).flags |= 2),
            (t.memoizedState = null),
            e
          );
        }
        function Is(e, t, n) {
          e.lanes |= t;
          var r = e.alternate;
          null !== r && (r.lanes |= t), Fo(e.return, t, n);
        }
        function Us(e, t, n, r, i) {
          var o = e.memoizedState;
          null === o
            ? (e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: i,
              })
            : ((o.isBackwards = t),
              (o.rendering = null),
              (o.renderingStartTime = 0),
              (o.last = r),
              (o.tail = n),
              (o.tailMode = i));
        }
        function Zs(e, t, n) {
          var r = t.pendingProps,
            i = r.revealOrder,
            o = r.tail;
          if ((bs(e, t, r.children, n), 0 !== (2 & (r = ea.current))))
            (r = (1 & r) | 2), (t.flags |= 128);
          else {
            if (null !== e && 0 !== (128 & e.flags))
              e: for (e = t.child; null !== e; ) {
                if (13 === e.tag) null !== e.memoizedState && Is(e, n, t);
                else if (19 === e.tag) Is(e, n, t);
                else if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
                if (e === t) break e;
                for (; null === e.sibling; ) {
                  if (null === e.return || e.return === t) break e;
                  e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
              }
            r &= 1;
          }
          if ((Pi(ea, r), 0 === (1 & t.mode))) t.memoizedState = null;
          else
            switch (i) {
              case 'forwards':
                for (n = t.child, i = null; null !== n; )
                  null !== (e = n.alternate) && null === ta(e) && (i = n),
                    (n = n.sibling);
                null === (n = i)
                  ? ((i = t.child), (t.child = null))
                  : ((i = n.sibling), (n.sibling = null)),
                  Us(t, !1, i, n, o);
                break;
              case 'backwards':
                for (n = null, i = t.child, t.child = null; null !== i; ) {
                  if (null !== (e = i.alternate) && null === ta(e)) {
                    t.child = i;
                    break;
                  }
                  (e = i.sibling), (i.sibling = n), (n = i), (i = e);
                }
                Us(t, !0, n, null, o);
                break;
              case 'together':
                Us(t, !1, null, null, void 0);
                break;
              default:
                t.memoizedState = null;
            }
          return t.child;
        }
        function _s(e, t) {
          0 === (1 & t.mode) &&
            null !== e &&
            ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
        }
        function Ws(e, t, n) {
          if (
            (null !== e && (t.dependencies = e.dependencies),
            (Nl |= t.lanes),
            0 === (n & t.childLanes))
          )
            return null;
          if (null !== e && t.child !== e.child) throw Error(o(153));
          if (null !== t.child) {
            for (
              n = ju((e = t.child), e.pendingProps), t.child = n, n.return = t;
              null !== e.sibling;

            )
              (e = e.sibling),
                ((n = n.sibling = ju(e, e.pendingProps)).return = t);
            n.sibling = null;
          }
          return t.child;
        }
        function Hs(e, t) {
          if (!io)
            switch (e.tailMode) {
              case 'hidden':
                t = e.tail;
                for (var n = null; null !== t; )
                  null !== t.alternate && (n = t), (t = t.sibling);
                null === n ? (e.tail = null) : (n.sibling = null);
                break;
              case 'collapsed':
                n = e.tail;
                for (var r = null; null !== n; )
                  null !== n.alternate && (r = n), (n = n.sibling);
                null === r
                  ? t || null === e.tail
                    ? (e.tail = null)
                    : (e.tail.sibling = null)
                  : (r.sibling = null);
            }
        }
        function Js(e) {
          var t = null !== e.alternate && e.alternate.child === e.child,
            n = 0,
            r = 0;
          if (t)
            for (var i = e.child; null !== i; )
              (n |= i.lanes | i.childLanes),
                (r |= 14680064 & i.subtreeFlags),
                (r |= 14680064 & i.flags),
                (i.return = e),
                (i = i.sibling);
          else
            for (i = e.child; null !== i; )
              (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags),
                (r |= i.flags),
                (i.return = e),
                (i = i.sibling);
          return (e.subtreeFlags |= r), (e.childLanes = n), t;
        }
        function Ys(e, t, n) {
          var r = t.pendingProps;
          switch ((to(t), t.tag)) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return Js(t), null;
            case 1:
            case 17:
              return Ri(t.type) && ji(), Js(t), null;
            case 3:
              return (
                (r = t.stateNode),
                Ko(),
                Ei(Fi),
                Ei(Ti),
                ra(),
                r.pendingContext &&
                  ((r.context = r.pendingContext), (r.pendingContext = null)),
                (null !== e && null !== e.child) ||
                  (ho(t)
                    ? (t.flags |= 4)
                    : null === e ||
                      (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) ||
                      ((t.flags |= 1024),
                      null !== oo && (au(oo), (oo = null)))),
                Rs(e, t),
                Js(t),
                null
              );
            case 5:
              $o(t);
              var i = Qo(Xo.current);
              if (((n = t.type), null !== e && null != t.stateNode))
                js(e, t, n, r, i),
                  e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              else {
                if (!r) {
                  if (null === t.stateNode) throw Error(o(166));
                  return Js(t), null;
                }
                if (((e = Qo(Jo.current)), ho(t))) {
                  (r = t.stateNode), (n = t.type);
                  var a = t.memoizedProps;
                  switch (
                    ((r[hi] = t), (r[fi] = a), (e = 0 !== (1 & t.mode)), n)
                  ) {
                    case 'dialog':
                      Or('cancel', r), Or('close', r);
                      break;
                    case 'iframe':
                    case 'object':
                    case 'embed':
                      Or('load', r);
                      break;
                    case 'video':
                    case 'audio':
                      for (i = 0; i < zr.length; i++) Or(zr[i], r);
                      break;
                    case 'source':
                      Or('error', r);
                      break;
                    case 'img':
                    case 'image':
                    case 'link':
                      Or('error', r), Or('load', r);
                      break;
                    case 'details':
                      Or('toggle', r);
                      break;
                    case 'input':
                      G(r, a), Or('invalid', r);
                      break;
                    case 'select':
                      (r._wrapperState = { wasMultiple: !!a.multiple }),
                        Or('invalid', r);
                      break;
                    case 'textarea':
                      ie(r, a), Or('invalid', r);
                  }
                  for (var l in (ye(n, a), (i = null), a))
                    if (a.hasOwnProperty(l)) {
                      var u = a[l];
                      'children' === l
                        ? 'string' === typeof u
                          ? r.textContent !== u &&
                            (!0 !== a.suppressHydrationWarning &&
                              qr(r.textContent, u, e),
                            (i = ['children', u]))
                          : 'number' === typeof u &&
                            r.textContent !== '' + u &&
                            (!0 !== a.suppressHydrationWarning &&
                              qr(r.textContent, u, e),
                            (i = ['children', '' + u]))
                        : s.hasOwnProperty(l) &&
                          null != u &&
                          'onScroll' === l &&
                          Or('scroll', r);
                    }
                  switch (n) {
                    case 'input':
                      J(r), $(r, a, !0);
                      break;
                    case 'textarea':
                      J(r), ae(r);
                      break;
                    case 'select':
                    case 'option':
                      break;
                    default:
                      'function' === typeof a.onClick && (r.onclick = $r);
                  }
                  (r = i), (t.updateQueue = r), null !== r && (t.flags |= 4);
                } else {
                  (l = 9 === i.nodeType ? i : i.ownerDocument),
                    'http://www.w3.org/1999/xhtml' === e && (e = se(n)),
                    'http://www.w3.org/1999/xhtml' === e
                      ? 'script' === n
                        ? (((e = l.createElement('div')).innerHTML =
                            '<script><\/script>'),
                          (e = e.removeChild(e.firstChild)))
                        : 'string' === typeof r.is
                          ? (e = l.createElement(n, { is: r.is }))
                          : ((e = l.createElement(n)),
                            'select' === n &&
                              ((l = e),
                              r.multiple
                                ? (l.multiple = !0)
                                : r.size && (l.size = r.size)))
                      : (e = l.createElementNS(e, n)),
                    (e[hi] = t),
                    (e[fi] = r),
                    Ms(e, t, !1, !1),
                    (t.stateNode = e);
                  e: {
                    switch (((l = Ae(n, r)), n)) {
                      case 'dialog':
                        Or('cancel', e), Or('close', e), (i = r);
                        break;
                      case 'iframe':
                      case 'object':
                      case 'embed':
                        Or('load', e), (i = r);
                        break;
                      case 'video':
                      case 'audio':
                        for (i = 0; i < zr.length; i++) Or(zr[i], e);
                        i = r;
                        break;
                      case 'source':
                        Or('error', e), (i = r);
                        break;
                      case 'img':
                      case 'image':
                      case 'link':
                        Or('error', e), Or('load', e), (i = r);
                        break;
                      case 'details':
                        Or('toggle', e), (i = r);
                        break;
                      case 'input':
                        G(e, r), (i = Q(e, r)), Or('invalid', e);
                        break;
                      case 'option':
                      default:
                        i = r;
                        break;
                      case 'select':
                        (e._wrapperState = { wasMultiple: !!r.multiple }),
                          (i = B({}, r, { value: void 0 })),
                          Or('invalid', e);
                        break;
                      case 'textarea':
                        ie(e, r), (i = re(e, r)), Or('invalid', e);
                    }
                    for (a in (ye(n, i), (u = i)))
                      if (u.hasOwnProperty(a)) {
                        var c = u[a];
                        'style' === a
                          ? ge(e, c)
                          : 'dangerouslySetInnerHTML' === a
                            ? null != (c = c ? c.__html : void 0) && de(e, c)
                            : 'children' === a
                              ? 'string' === typeof c
                                ? ('textarea' !== n || '' !== c) && he(e, c)
                                : 'number' === typeof c && he(e, '' + c)
                              : 'suppressContentEditableWarning' !== a &&
                                'suppressHydrationWarning' !== a &&
                                'autoFocus' !== a &&
                                (s.hasOwnProperty(a)
                                  ? null != c &&
                                    'onScroll' === a &&
                                    Or('scroll', e)
                                  : null != c && A(e, a, c, l));
                      }
                    switch (n) {
                      case 'input':
                        J(e), $(e, r, !1);
                        break;
                      case 'textarea':
                        J(e), ae(e);
                        break;
                      case 'option':
                        null != r.value &&
                          e.setAttribute('value', '' + W(r.value));
                        break;
                      case 'select':
                        (e.multiple = !!r.multiple),
                          null != (a = r.value)
                            ? ne(e, !!r.multiple, a, !1)
                            : null != r.defaultValue &&
                              ne(e, !!r.multiple, r.defaultValue, !0);
                        break;
                      default:
                        'function' === typeof i.onClick && (e.onclick = $r);
                    }
                    switch (n) {
                      case 'button':
                      case 'input':
                      case 'select':
                      case 'textarea':
                        r = !!r.autoFocus;
                        break e;
                      case 'img':
                        r = !0;
                        break e;
                      default:
                        r = !1;
                    }
                  }
                  r && (t.flags |= 4);
                }
                null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              }
              return Js(t), null;
            case 6:
              if (e && null != t.stateNode) Ls(e, t, e.memoizedProps, r);
              else {
                if ('string' !== typeof r && null === t.stateNode)
                  throw Error(o(166));
                if (((n = Qo(Xo.current)), Qo(Jo.current), ho(t))) {
                  if (
                    ((r = t.stateNode),
                    (n = t.memoizedProps),
                    (r[hi] = t),
                    (a = r.nodeValue !== n) && null !== (e = no))
                  )
                    switch (e.tag) {
                      case 3:
                        qr(r.nodeValue, n, 0 !== (1 & e.mode));
                        break;
                      case 5:
                        !0 !== e.memoizedProps.suppressHydrationWarning &&
                          qr(r.nodeValue, n, 0 !== (1 & e.mode));
                    }
                  a && (t.flags |= 4);
                } else
                  ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                    r
                  ))[hi] = t),
                    (t.stateNode = r);
              }
              return Js(t), null;
            case 13:
              if (
                (Ei(ea),
                (r = t.memoizedState),
                null === e ||
                  (null !== e.memoizedState &&
                    null !== e.memoizedState.dehydrated))
              ) {
                if (
                  io &&
                  null !== ro &&
                  0 !== (1 & t.mode) &&
                  0 === (128 & t.flags)
                )
                  fo(), po(), (t.flags |= 98560), (a = !1);
                else if (((a = ho(t)), null !== r && null !== r.dehydrated)) {
                  if (null === e) {
                    if (!a) throw Error(o(318));
                    if (
                      !(a =
                        null !== (a = t.memoizedState) ? a.dehydrated : null)
                    )
                      throw Error(o(317));
                    a[hi] = t;
                  } else
                    po(),
                      0 === (128 & t.flags) && (t.memoizedState = null),
                      (t.flags |= 4);
                  Js(t), (a = !1);
                } else null !== oo && (au(oo), (oo = null)), (a = !0);
                if (!a) return 65536 & t.flags ? t : null;
              }
              return 0 !== (128 & t.flags)
                ? ((t.lanes = n), t)
                : ((r = null !== r) !==
                    (null !== e && null !== e.memoizedState) &&
                    r &&
                    ((t.child.flags |= 8192),
                    0 !== (1 & t.mode) &&
                      (null === e || 0 !== (1 & ea.current)
                        ? 0 === Ll && (Ll = 3)
                        : mu())),
                  null !== t.updateQueue && (t.flags |= 4),
                  Js(t),
                  null);
            case 4:
              return (
                Ko(),
                Rs(e, t),
                null === e && Zr(t.stateNode.containerInfo),
                Js(t),
                null
              );
            case 10:
              return To(t.type._context), Js(t), null;
            case 19:
              if ((Ei(ea), null === (a = t.memoizedState))) return Js(t), null;
              if (((r = 0 !== (128 & t.flags)), null === (l = a.rendering)))
                if (r) Hs(a, !1);
                else {
                  if (0 !== Ll || (null !== e && 0 !== (128 & e.flags)))
                    for (e = t.child; null !== e; ) {
                      if (null !== (l = ta(e))) {
                        for (
                          t.flags |= 128,
                            Hs(a, !1),
                            null !== (r = l.updateQueue) &&
                              ((t.updateQueue = r), (t.flags |= 4)),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child;
                          null !== n;

                        )
                          (e = r),
                            ((a = n).flags &= 14680066),
                            null === (l = a.alternate)
                              ? ((a.childLanes = 0),
                                (a.lanes = e),
                                (a.child = null),
                                (a.subtreeFlags = 0),
                                (a.memoizedProps = null),
                                (a.memoizedState = null),
                                (a.updateQueue = null),
                                (a.dependencies = null),
                                (a.stateNode = null))
                              : ((a.childLanes = l.childLanes),
                                (a.lanes = l.lanes),
                                (a.child = l.child),
                                (a.subtreeFlags = 0),
                                (a.deletions = null),
                                (a.memoizedProps = l.memoizedProps),
                                (a.memoizedState = l.memoizedState),
                                (a.updateQueue = l.updateQueue),
                                (a.type = l.type),
                                (e = l.dependencies),
                                (a.dependencies =
                                  null === e
                                    ? null
                                    : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext,
                                      })),
                            (n = n.sibling);
                        return Pi(ea, (1 & ea.current) | 2), t.child;
                      }
                      e = e.sibling;
                    }
                  null !== a.tail &&
                    Ke() > Zl &&
                    ((t.flags |= 128),
                    (r = !0),
                    Hs(a, !1),
                    (t.lanes = 4194304));
                }
              else {
                if (!r)
                  if (null !== (e = ta(l))) {
                    if (
                      ((t.flags |= 128),
                      (r = !0),
                      null !== (n = e.updateQueue) &&
                        ((t.updateQueue = n), (t.flags |= 4)),
                      Hs(a, !0),
                      null === a.tail &&
                        'hidden' === a.tailMode &&
                        !l.alternate &&
                        !io)
                    )
                      return Js(t), null;
                  } else
                    2 * Ke() - a.renderingStartTime > Zl &&
                      1073741824 !== n &&
                      ((t.flags |= 128),
                      (r = !0),
                      Hs(a, !1),
                      (t.lanes = 4194304));
                a.isBackwards
                  ? ((l.sibling = t.child), (t.child = l))
                  : (null !== (n = a.last) ? (n.sibling = l) : (t.child = l),
                    (a.last = l));
              }
              return null !== a.tail
                ? ((t = a.tail),
                  (a.rendering = t),
                  (a.tail = t.sibling),
                  (a.renderingStartTime = Ke()),
                  (t.sibling = null),
                  (n = ea.current),
                  Pi(ea, r ? (1 & n) | 2 : 1 & n),
                  t)
                : (Js(t), null);
            case 22:
            case 23:
              return (
                du(),
                (r = null !== t.memoizedState),
                null !== e &&
                  (null !== e.memoizedState) !== r &&
                  (t.flags |= 8192),
                r && 0 !== (1 & t.mode)
                  ? 0 !== (1073741824 & Rl) &&
                    (Js(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                  : Js(t),
                null
              );
            case 24:
            case 25:
              return null;
          }
          throw Error(o(156, t.tag));
        }
        function Xs(e, t) {
          switch ((to(t), t.tag)) {
            case 1:
              return (
                Ri(t.type) && ji(),
                65536 & (e = t.flags)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 3:
              return (
                Ko(),
                Ei(Fi),
                Ei(Ti),
                ra(),
                0 !== (65536 & (e = t.flags)) && 0 === (128 & e)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 5:
              return $o(t), null;
            case 13:
              if (
                (Ei(ea),
                null !== (e = t.memoizedState) && null !== e.dehydrated)
              ) {
                if (null === t.alternate) throw Error(o(340));
                po();
              }
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null;
            case 19:
              return Ei(ea), null;
            case 4:
              return Ko(), null;
            case 10:
              return To(t.type._context), null;
            case 22:
            case 23:
              return du(), null;
            default:
              return null;
          }
        }
        (Ms = function (e, t) {
          for (var n = t.child; null !== n; ) {
            if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
            else if (4 !== n.tag && null !== n.child) {
              (n.child.return = n), (n = n.child);
              continue;
            }
            if (n === t) break;
            for (; null === n.sibling; ) {
              if (null === n.return || n.return === t) return;
              n = n.return;
            }
            (n.sibling.return = n.return), (n = n.sibling);
          }
        }),
          (Rs = function () {}),
          (js = function (e, t, n, r) {
            var i = e.memoizedProps;
            if (i !== r) {
              (e = t.stateNode), Qo(Jo.current);
              var o,
                a = null;
              switch (n) {
                case 'input':
                  (i = Q(e, i)), (r = Q(e, r)), (a = []);
                  break;
                case 'select':
                  (i = B({}, i, { value: void 0 })),
                    (r = B({}, r, { value: void 0 })),
                    (a = []);
                  break;
                case 'textarea':
                  (i = re(e, i)), (r = re(e, r)), (a = []);
                  break;
                default:
                  'function' !== typeof i.onClick &&
                    'function' === typeof r.onClick &&
                    (e.onclick = $r);
              }
              for (c in (ye(n, r), (n = null), i))
                if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && null != i[c])
                  if ('style' === c) {
                    var l = i[c];
                    for (o in l)
                      l.hasOwnProperty(o) && (n || (n = {}), (n[o] = ''));
                  } else
                    'dangerouslySetInnerHTML' !== c &&
                      'children' !== c &&
                      'suppressContentEditableWarning' !== c &&
                      'suppressHydrationWarning' !== c &&
                      'autoFocus' !== c &&
                      (s.hasOwnProperty(c)
                        ? a || (a = [])
                        : (a = a || []).push(c, null));
              for (c in r) {
                var u = r[c];
                if (
                  ((l = null != i ? i[c] : void 0),
                  r.hasOwnProperty(c) && u !== l && (null != u || null != l))
                )
                  if ('style' === c)
                    if (l) {
                      for (o in l)
                        !l.hasOwnProperty(o) ||
                          (u && u.hasOwnProperty(o)) ||
                          (n || (n = {}), (n[o] = ''));
                      for (o in u)
                        u.hasOwnProperty(o) &&
                          l[o] !== u[o] &&
                          (n || (n = {}), (n[o] = u[o]));
                    } else n || (a || (a = []), a.push(c, n)), (n = u);
                  else
                    'dangerouslySetInnerHTML' === c
                      ? ((u = u ? u.__html : void 0),
                        (l = l ? l.__html : void 0),
                        null != u && l !== u && (a = a || []).push(c, u))
                      : 'children' === c
                        ? ('string' !== typeof u && 'number' !== typeof u) ||
                          (a = a || []).push(c, '' + u)
                        : 'suppressContentEditableWarning' !== c &&
                          'suppressHydrationWarning' !== c &&
                          (s.hasOwnProperty(c)
                            ? (null != u && 'onScroll' === c && Or('scroll', e),
                              a || l === u || (a = []))
                            : (a = a || []).push(c, u));
              }
              n && (a = a || []).push('style', n);
              var c = a;
              (t.updateQueue = c) && (t.flags |= 4);
            }
          }),
          (Ls = function (e, t, n, r) {
            n !== r && (t.flags |= 4);
          });
        var Qs = !1,
          Gs = !1,
          Ks = 'function' === typeof WeakSet ? WeakSet : Set,
          qs = null;
        function $s(e, t) {
          var n = e.ref;
          if (null !== n)
            if ('function' === typeof n)
              try {
                n(null);
              } catch (r) {
                ku(e, t, r);
              }
            else n.current = null;
        }
        function el(e, t, n) {
          try {
            n();
          } catch (r) {
            ku(e, t, r);
          }
        }
        var tl = !1;
        function nl(e, t, n) {
          var r = t.updateQueue;
          if (null !== (r = null !== r ? r.lastEffect : null)) {
            var i = (r = r.next);
            do {
              if ((i.tag & e) === e) {
                var o = i.destroy;
                (i.destroy = void 0), void 0 !== o && el(t, n, o);
              }
              i = i.next;
            } while (i !== r);
          }
        }
        function rl(e, t) {
          if (
            null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)
          ) {
            var n = (t = t.next);
            do {
              if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
              }
              n = n.next;
            } while (n !== t);
          }
        }
        function il(e) {
          var t = e.ref;
          if (null !== t) {
            var n = e.stateNode;
            e.tag, (e = n), 'function' === typeof t ? t(e) : (t.current = e);
          }
        }
        function ol(e) {
          var t = e.alternate;
          null !== t && ((e.alternate = null), ol(t)),
            (e.child = null),
            (e.deletions = null),
            (e.sibling = null),
            5 === e.tag &&
              null !== (t = e.stateNode) &&
              (delete t[hi],
              delete t[fi],
              delete t[mi],
              delete t[gi],
              delete t[vi]),
            (e.stateNode = null),
            (e.return = null),
            (e.dependencies = null),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.pendingProps = null),
            (e.stateNode = null),
            (e.updateQueue = null);
        }
        function al(e) {
          return 5 === e.tag || 3 === e.tag || 4 === e.tag;
        }
        function sl(e) {
          e: for (;;) {
            for (; null === e.sibling; ) {
              if (null === e.return || al(e.return)) return null;
              e = e.return;
            }
            for (
              e.sibling.return = e.return, e = e.sibling;
              5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

            ) {
              if (2 & e.flags) continue e;
              if (null === e.child || 4 === e.tag) continue e;
              (e.child.return = e), (e = e.child);
            }
            if (!(2 & e.flags)) return e.stateNode;
          }
        }
        function ll(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode),
              t
                ? 8 === n.nodeType
                  ? n.parentNode.insertBefore(e, t)
                  : n.insertBefore(e, t)
                : (8 === n.nodeType
                    ? (t = n.parentNode).insertBefore(e, n)
                    : (t = n).appendChild(e),
                  (null !== (n = n._reactRootContainer) && void 0 !== n) ||
                    null !== t.onclick ||
                    (t.onclick = $r));
          else if (4 !== r && null !== (e = e.child))
            for (ll(e, t, n), e = e.sibling; null !== e; )
              ll(e, t, n), (e = e.sibling);
        }
        function ul(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
          else if (4 !== r && null !== (e = e.child))
            for (ul(e, t, n), e = e.sibling; null !== e; )
              ul(e, t, n), (e = e.sibling);
        }
        var cl = null,
          dl = !1;
        function hl(e, t, n) {
          for (n = n.child; null !== n; ) fl(e, t, n), (n = n.sibling);
        }
        function fl(e, t, n) {
          if (ot && 'function' === typeof ot.onCommitFiberUnmount)
            try {
              ot.onCommitFiberUnmount(it, n);
            } catch (s) {}
          switch (n.tag) {
            case 5:
              Gs || $s(n, t);
            case 6:
              var r = cl,
                i = dl;
              (cl = null),
                hl(e, t, n),
                (dl = i),
                null !== (cl = r) &&
                  (dl
                    ? ((e = cl),
                      (n = n.stateNode),
                      8 === e.nodeType
                        ? e.parentNode.removeChild(n)
                        : e.removeChild(n))
                    : cl.removeChild(n.stateNode));
              break;
            case 18:
              null !== cl &&
                (dl
                  ? ((e = cl),
                    (n = n.stateNode),
                    8 === e.nodeType
                      ? li(e.parentNode, n)
                      : 1 === e.nodeType && li(e, n),
                    Zt(e))
                  : li(cl, n.stateNode));
              break;
            case 4:
              (r = cl),
                (i = dl),
                (cl = n.stateNode.containerInfo),
                (dl = !0),
                hl(e, t, n),
                (cl = r),
                (dl = i);
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              if (
                !Gs &&
                null !== (r = n.updateQueue) &&
                null !== (r = r.lastEffect)
              ) {
                i = r = r.next;
                do {
                  var o = i,
                    a = o.destroy;
                  (o = o.tag),
                    void 0 !== a &&
                      (0 !== (2 & o) || 0 !== (4 & o)) &&
                      el(n, t, a),
                    (i = i.next);
                } while (i !== r);
              }
              hl(e, t, n);
              break;
            case 1:
              if (
                !Gs &&
                ($s(n, t),
                'function' === typeof (r = n.stateNode).componentWillUnmount)
              )
                try {
                  (r.props = n.memoizedProps),
                    (r.state = n.memoizedState),
                    r.componentWillUnmount();
                } catch (s) {
                  ku(n, t, s);
                }
              hl(e, t, n);
              break;
            case 21:
              hl(e, t, n);
              break;
            case 22:
              1 & n.mode
                ? ((Gs = (r = Gs) || null !== n.memoizedState),
                  hl(e, t, n),
                  (Gs = r))
                : hl(e, t, n);
              break;
            default:
              hl(e, t, n);
          }
        }
        function pl(e) {
          var t = e.updateQueue;
          if (null !== t) {
            e.updateQueue = null;
            var n = e.stateNode;
            null === n && (n = e.stateNode = new Ks()),
              t.forEach(function (t) {
                var r = Tu.bind(null, e, t);
                n.has(t) || (n.add(t), t.then(r, r));
              });
          }
        }
        function ml(e, t) {
          var n = t.deletions;
          if (null !== n)
            for (var r = 0; r < n.length; r++) {
              var i = n[r];
              try {
                var a = e,
                  s = t,
                  l = s;
                e: for (; null !== l; ) {
                  switch (l.tag) {
                    case 5:
                      (cl = l.stateNode), (dl = !1);
                      break e;
                    case 3:
                    case 4:
                      (cl = l.stateNode.containerInfo), (dl = !0);
                      break e;
                  }
                  l = l.return;
                }
                if (null === cl) throw Error(o(160));
                fl(a, s, i), (cl = null), (dl = !1);
                var u = i.alternate;
                null !== u && (u.return = null), (i.return = null);
              } catch (c) {
                ku(i, t, c);
              }
            }
          if (12854 & t.subtreeFlags)
            for (t = t.child; null !== t; ) gl(t, e), (t = t.sibling);
        }
        function gl(e, t) {
          var n = e.alternate,
            r = e.flags;
          switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              if ((ml(t, e), vl(e), 4 & r)) {
                try {
                  nl(3, e, e.return), rl(3, e);
                } catch (g) {
                  ku(e, e.return, g);
                }
                try {
                  nl(5, e, e.return);
                } catch (g) {
                  ku(e, e.return, g);
                }
              }
              break;
            case 1:
              ml(t, e), vl(e), 512 & r && null !== n && $s(n, n.return);
              break;
            case 5:
              if (
                (ml(t, e),
                vl(e),
                512 & r && null !== n && $s(n, n.return),
                32 & e.flags)
              ) {
                var i = e.stateNode;
                try {
                  he(i, '');
                } catch (g) {
                  ku(e, e.return, g);
                }
              }
              if (4 & r && null != (i = e.stateNode)) {
                var a = e.memoizedProps,
                  s = null !== n ? n.memoizedProps : a,
                  l = e.type,
                  u = e.updateQueue;
                if (((e.updateQueue = null), null !== u))
                  try {
                    'input' === l &&
                      'radio' === a.type &&
                      null != a.name &&
                      K(i, a),
                      Ae(l, s);
                    var c = Ae(l, a);
                    for (s = 0; s < u.length; s += 2) {
                      var d = u[s],
                        h = u[s + 1];
                      'style' === d
                        ? ge(i, h)
                        : 'dangerouslySetInnerHTML' === d
                          ? de(i, h)
                          : 'children' === d
                            ? he(i, h)
                            : A(i, d, h, c);
                    }
                    switch (l) {
                      case 'input':
                        q(i, a);
                        break;
                      case 'textarea':
                        oe(i, a);
                        break;
                      case 'select':
                        var f = i._wrapperState.wasMultiple;
                        i._wrapperState.wasMultiple = !!a.multiple;
                        var p = a.value;
                        null != p
                          ? ne(i, !!a.multiple, p, !1)
                          : f !== !!a.multiple &&
                            (null != a.defaultValue
                              ? ne(i, !!a.multiple, a.defaultValue, !0)
                              : ne(i, !!a.multiple, a.multiple ? [] : '', !1));
                    }
                    i[fi] = a;
                  } catch (g) {
                    ku(e, e.return, g);
                  }
              }
              break;
            case 6:
              if ((ml(t, e), vl(e), 4 & r)) {
                if (null === e.stateNode) throw Error(o(162));
                (i = e.stateNode), (a = e.memoizedProps);
                try {
                  i.nodeValue = a;
                } catch (g) {
                  ku(e, e.return, g);
                }
              }
              break;
            case 3:
              if (
                (ml(t, e),
                vl(e),
                4 & r && null !== n && n.memoizedState.isDehydrated)
              )
                try {
                  Zt(t.containerInfo);
                } catch (g) {
                  ku(e, e.return, g);
                }
              break;
            case 4:
            default:
              ml(t, e), vl(e);
              break;
            case 13:
              ml(t, e),
                vl(e),
                8192 & (i = e.child).flags &&
                  ((a = null !== i.memoizedState),
                  (i.stateNode.isHidden = a),
                  !a ||
                    (null !== i.alternate &&
                      null !== i.alternate.memoizedState) ||
                    (Ul = Ke())),
                4 & r && pl(e);
              break;
            case 22:
              if (
                ((d = null !== n && null !== n.memoizedState),
                1 & e.mode
                  ? ((Gs = (c = Gs) || d), ml(t, e), (Gs = c))
                  : ml(t, e),
                vl(e),
                8192 & r)
              ) {
                if (
                  ((c = null !== e.memoizedState),
                  (e.stateNode.isHidden = c) && !d && 0 !== (1 & e.mode))
                )
                  for (qs = e, d = e.child; null !== d; ) {
                    for (h = qs = d; null !== qs; ) {
                      switch (((p = (f = qs).child), f.tag)) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          nl(4, f, f.return);
                          break;
                        case 1:
                          $s(f, f.return);
                          var m = f.stateNode;
                          if ('function' === typeof m.componentWillUnmount) {
                            (r = f), (n = f.return);
                            try {
                              (t = r),
                                (m.props = t.memoizedProps),
                                (m.state = t.memoizedState),
                                m.componentWillUnmount();
                            } catch (g) {
                              ku(r, n, g);
                            }
                          }
                          break;
                        case 5:
                          $s(f, f.return);
                          break;
                        case 22:
                          if (null !== f.memoizedState) {
                            xl(h);
                            continue;
                          }
                      }
                      null !== p ? ((p.return = f), (qs = p)) : xl(h);
                    }
                    d = d.sibling;
                  }
                e: for (d = null, h = e; ; ) {
                  if (5 === h.tag) {
                    if (null === d) {
                      d = h;
                      try {
                        (i = h.stateNode),
                          c
                            ? 'function' === typeof (a = i.style).setProperty
                              ? a.setProperty('display', 'none', 'important')
                              : (a.display = 'none')
                            : ((l = h.stateNode),
                              (s =
                                void 0 !== (u = h.memoizedProps.style) &&
                                null !== u &&
                                u.hasOwnProperty('display')
                                  ? u.display
                                  : null),
                              (l.style.display = me('display', s)));
                      } catch (g) {
                        ku(e, e.return, g);
                      }
                    }
                  } else if (6 === h.tag) {
                    if (null === d)
                      try {
                        h.stateNode.nodeValue = c ? '' : h.memoizedProps;
                      } catch (g) {
                        ku(e, e.return, g);
                      }
                  } else if (
                    ((22 !== h.tag && 23 !== h.tag) ||
                      null === h.memoizedState ||
                      h === e) &&
                    null !== h.child
                  ) {
                    (h.child.return = h), (h = h.child);
                    continue;
                  }
                  if (h === e) break e;
                  for (; null === h.sibling; ) {
                    if (null === h.return || h.return === e) break e;
                    d === h && (d = null), (h = h.return);
                  }
                  d === h && (d = null),
                    (h.sibling.return = h.return),
                    (h = h.sibling);
                }
              }
              break;
            case 19:
              ml(t, e), vl(e), 4 & r && pl(e);
            case 21:
          }
        }
        function vl(e) {
          var t = e.flags;
          if (2 & t) {
            try {
              e: {
                for (var n = e.return; null !== n; ) {
                  if (al(n)) {
                    var r = n;
                    break e;
                  }
                  n = n.return;
                }
                throw Error(o(160));
              }
              switch (r.tag) {
                case 5:
                  var i = r.stateNode;
                  32 & r.flags && (he(i, ''), (r.flags &= -33)),
                    ul(e, sl(e), i);
                  break;
                case 3:
                case 4:
                  var a = r.stateNode.containerInfo;
                  ll(e, sl(e), a);
                  break;
                default:
                  throw Error(o(161));
              }
            } catch (s) {
              ku(e, e.return, s);
            }
            e.flags &= -3;
          }
          4096 & t && (e.flags &= -4097);
        }
        function yl(e, t, n) {
          (qs = e), Al(e, t, n);
        }
        function Al(e, t, n) {
          for (var r = 0 !== (1 & e.mode); null !== qs; ) {
            var i = qs,
              o = i.child;
            if (22 === i.tag && r) {
              var a = null !== i.memoizedState || Qs;
              if (!a) {
                var s = i.alternate,
                  l = (null !== s && null !== s.memoizedState) || Gs;
                s = Qs;
                var u = Gs;
                if (((Qs = a), (Gs = l) && !u))
                  for (qs = i; null !== qs; )
                    (l = (a = qs).child),
                      22 === a.tag && null !== a.memoizedState
                        ? wl(i)
                        : null !== l
                          ? ((l.return = a), (qs = l))
                          : wl(i);
                for (; null !== o; ) (qs = o), Al(o, t, n), (o = o.sibling);
                (qs = i), (Qs = s), (Gs = u);
              }
              bl(e);
            } else
              0 !== (8772 & i.subtreeFlags) && null !== o
                ? ((o.return = i), (qs = o))
                : bl(e);
          }
        }
        function bl(e) {
          for (; null !== qs; ) {
            var t = qs;
            if (0 !== (8772 & t.flags)) {
              var n = t.alternate;
              try {
                if (0 !== (8772 & t.flags))
                  switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Gs || rl(5, t);
                      break;
                    case 1:
                      var r = t.stateNode;
                      if (4 & t.flags && !Gs)
                        if (null === n) r.componentDidMount();
                        else {
                          var i =
                            t.elementType === t.type
                              ? n.memoizedProps
                              : ns(t.type, n.memoizedProps);
                          r.componentDidUpdate(
                            i,
                            n.memoizedState,
                            r.__reactInternalSnapshotBeforeUpdate
                          );
                        }
                      var a = t.updateQueue;
                      null !== a && Wo(t, a, r);
                      break;
                    case 3:
                      var s = t.updateQueue;
                      if (null !== s) {
                        if (((n = null), null !== t.child))
                          switch (t.child.tag) {
                            case 5:
                            case 1:
                              n = t.child.stateNode;
                          }
                        Wo(t, s, n);
                      }
                      break;
                    case 5:
                      var l = t.stateNode;
                      if (null === n && 4 & t.flags) {
                        n = l;
                        var u = t.memoizedProps;
                        switch (t.type) {
                          case 'button':
                          case 'input':
                          case 'select':
                          case 'textarea':
                            u.autoFocus && n.focus();
                            break;
                          case 'img':
                            u.src && (n.src = u.src);
                        }
                      }
                      break;
                    case 6:
                    case 4:
                    case 12:
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                      break;
                    case 13:
                      if (null === t.memoizedState) {
                        var c = t.alternate;
                        if (null !== c) {
                          var d = c.memoizedState;
                          if (null !== d) {
                            var h = d.dehydrated;
                            null !== h && Zt(h);
                          }
                        }
                      }
                      break;
                    default:
                      throw Error(o(163));
                  }
                Gs || (512 & t.flags && il(t));
              } catch (f) {
                ku(t, t.return, f);
              }
            }
            if (t === e) {
              qs = null;
              break;
            }
            if (null !== (n = t.sibling)) {
              (n.return = t.return), (qs = n);
              break;
            }
            qs = t.return;
          }
        }
        function xl(e) {
          for (; null !== qs; ) {
            var t = qs;
            if (t === e) {
              qs = null;
              break;
            }
            var n = t.sibling;
            if (null !== n) {
              (n.return = t.return), (qs = n);
              break;
            }
            qs = t.return;
          }
        }
        function wl(e) {
          for (; null !== qs; ) {
            var t = qs;
            try {
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  var n = t.return;
                  try {
                    rl(4, t);
                  } catch (l) {
                    ku(t, n, l);
                  }
                  break;
                case 1:
                  var r = t.stateNode;
                  if ('function' === typeof r.componentDidMount) {
                    var i = t.return;
                    try {
                      r.componentDidMount();
                    } catch (l) {
                      ku(t, i, l);
                    }
                  }
                  var o = t.return;
                  try {
                    il(t);
                  } catch (l) {
                    ku(t, o, l);
                  }
                  break;
                case 5:
                  var a = t.return;
                  try {
                    il(t);
                  } catch (l) {
                    ku(t, a, l);
                  }
              }
            } catch (l) {
              ku(t, t.return, l);
            }
            if (t === e) {
              qs = null;
              break;
            }
            var s = t.sibling;
            if (null !== s) {
              (s.return = t.return), (qs = s);
              break;
            }
            qs = t.return;
          }
        }
        var Sl,
          kl = Math.ceil,
          El = b.ReactCurrentDispatcher,
          Pl = b.ReactCurrentOwner,
          Cl = b.ReactCurrentBatchConfig,
          Tl = 0,
          Fl = null,
          Dl = null,
          Ml = 0,
          Rl = 0,
          jl = ki(0),
          Ll = 0,
          zl = null,
          Nl = 0,
          Bl = 0,
          Vl = 0,
          Ol = null,
          Il = null,
          Ul = 0,
          Zl = 1 / 0,
          _l = null,
          Wl = !1,
          Hl = null,
          Jl = null,
          Yl = !1,
          Xl = null,
          Ql = 0,
          Gl = 0,
          Kl = null,
          ql = -1,
          $l = 0;
        function eu() {
          return 0 !== (6 & Tl) ? Ke() : -1 !== ql ? ql : (ql = Ke());
        }
        function tu(e) {
          return 0 === (1 & e.mode)
            ? 1
            : 0 !== (2 & Tl) && 0 !== Ml
              ? Ml & -Ml
              : null !== go.transition
                ? (0 === $l && ($l = mt()), $l)
                : 0 !== (e = At)
                  ? e
                  : (e = void 0 === (e = window.event) ? 16 : Gt(e.type));
        }
        function nu(e, t, n, r) {
          if (50 < Gl) throw ((Gl = 0), (Kl = null), Error(o(185)));
          vt(e, n, r),
            (0 !== (2 & Tl) && e === Fl) ||
              (e === Fl && (0 === (2 & Tl) && (Bl |= n), 4 === Ll && su(e, Ml)),
              ru(e, r),
              1 === n &&
                0 === Tl &&
                0 === (1 & t.mode) &&
                ((Zl = Ke() + 500), Oi && Zi()));
        }
        function ru(e, t) {
          var n = e.callbackNode;
          !(function (e, t) {
            for (
              var n = e.suspendedLanes,
                r = e.pingedLanes,
                i = e.expirationTimes,
                o = e.pendingLanes;
              0 < o;

            ) {
              var a = 31 - at(o),
                s = 1 << a,
                l = i[a];
              -1 === l
                ? (0 !== (s & n) && 0 === (s & r)) || (i[a] = ft(s, t))
                : l <= t && (e.expiredLanes |= s),
                (o &= ~s);
            }
          })(e, t);
          var r = ht(e, e === Fl ? Ml : 0);
          if (0 === r)
            null !== n && Xe(n),
              (e.callbackNode = null),
              (e.callbackPriority = 0);
          else if (((t = r & -r), e.callbackPriority !== t)) {
            if ((null != n && Xe(n), 1 === t))
              0 === e.tag
                ? (function (e) {
                    (Oi = !0), Ui(e);
                  })(lu.bind(null, e))
                : Ui(lu.bind(null, e)),
                ai(function () {
                  0 === (6 & Tl) && Zi();
                }),
                (n = null);
            else {
              switch (bt(r)) {
                case 1:
                  n = $e;
                  break;
                case 4:
                  n = et;
                  break;
                case 16:
                default:
                  n = tt;
                  break;
                case 536870912:
                  n = rt;
              }
              n = Fu(n, iu.bind(null, e));
            }
            (e.callbackPriority = t), (e.callbackNode = n);
          }
        }
        function iu(e, t) {
          if (((ql = -1), ($l = 0), 0 !== (6 & Tl))) throw Error(o(327));
          var n = e.callbackNode;
          if (wu() && e.callbackNode !== n) return null;
          var r = ht(e, e === Fl ? Ml : 0);
          if (0 === r) return null;
          if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = gu(e, r);
          else {
            t = r;
            var i = Tl;
            Tl |= 2;
            var a = pu();
            for (
              (Fl === e && Ml === t) ||
              ((_l = null), (Zl = Ke() + 500), hu(e, t));
              ;

            )
              try {
                yu();
                break;
              } catch (l) {
                fu(e, l);
              }
            Co(),
              (El.current = a),
              (Tl = i),
              null !== Dl ? (t = 0) : ((Fl = null), (Ml = 0), (t = Ll));
          }
          if (0 !== t) {
            if (
              (2 === t && 0 !== (i = pt(e)) && ((r = i), (t = ou(e, i))),
              1 === t)
            )
              throw ((n = zl), hu(e, 0), su(e, r), ru(e, Ke()), n);
            if (6 === t) su(e, r);
            else {
              if (
                ((i = e.current.alternate),
                0 === (30 & r) &&
                  !(function (e) {
                    for (var t = e; ; ) {
                      if (16384 & t.flags) {
                        var n = t.updateQueue;
                        if (null !== n && null !== (n = n.stores))
                          for (var r = 0; r < n.length; r++) {
                            var i = n[r],
                              o = i.getSnapshot;
                            i = i.value;
                            try {
                              if (!sr(o(), i)) return !1;
                            } catch (s) {
                              return !1;
                            }
                          }
                      }
                      if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
                        (n.return = t), (t = n);
                      else {
                        if (t === e) break;
                        for (; null === t.sibling; ) {
                          if (null === t.return || t.return === e) return !0;
                          t = t.return;
                        }
                        (t.sibling.return = t.return), (t = t.sibling);
                      }
                    }
                    return !0;
                  })(i) &&
                  (2 === (t = gu(e, r)) &&
                    0 !== (a = pt(e)) &&
                    ((r = a), (t = ou(e, a))),
                  1 === t))
              )
                throw ((n = zl), hu(e, 0), su(e, r), ru(e, Ke()), n);
              switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                  throw Error(o(345));
                case 2:
                case 5:
                  xu(e, Il, _l);
                  break;
                case 3:
                  if (
                    (su(e, r),
                    (130023424 & r) === r && 10 < (t = Ul + 500 - Ke()))
                  ) {
                    if (0 !== ht(e, 0)) break;
                    if (((i = e.suspendedLanes) & r) !== r) {
                      eu(), (e.pingedLanes |= e.suspendedLanes & i);
                      break;
                    }
                    e.timeoutHandle = ri(xu.bind(null, e, Il, _l), t);
                    break;
                  }
                  xu(e, Il, _l);
                  break;
                case 4:
                  if ((su(e, r), (4194240 & r) === r)) break;
                  for (t = e.eventTimes, i = -1; 0 < r; ) {
                    var s = 31 - at(r);
                    (a = 1 << s), (s = t[s]) > i && (i = s), (r &= ~a);
                  }
                  if (
                    ((r = i),
                    10 <
                      (r =
                        (120 > (r = Ke() - r)
                          ? 120
                          : 480 > r
                            ? 480
                            : 1080 > r
                              ? 1080
                              : 1920 > r
                                ? 1920
                                : 3e3 > r
                                  ? 3e3
                                  : 4320 > r
                                    ? 4320
                                    : 1960 * kl(r / 1960)) - r))
                  ) {
                    e.timeoutHandle = ri(xu.bind(null, e, Il, _l), r);
                    break;
                  }
                  xu(e, Il, _l);
                  break;
                default:
                  throw Error(o(329));
              }
            }
          }
          return ru(e, Ke()), e.callbackNode === n ? iu.bind(null, e) : null;
        }
        function ou(e, t) {
          var n = Ol;
          return (
            e.current.memoizedState.isDehydrated && (hu(e, t).flags |= 256),
            2 !== (e = gu(e, t)) && ((t = Il), (Il = n), null !== t && au(t)),
            e
          );
        }
        function au(e) {
          null === Il ? (Il = e) : Il.push.apply(Il, e);
        }
        function su(e, t) {
          for (
            t &= ~Vl,
              t &= ~Bl,
              e.suspendedLanes |= t,
              e.pingedLanes &= ~t,
              e = e.expirationTimes;
            0 < t;

          ) {
            var n = 31 - at(t),
              r = 1 << n;
            (e[n] = -1), (t &= ~r);
          }
        }
        function lu(e) {
          if (0 !== (6 & Tl)) throw Error(o(327));
          wu();
          var t = ht(e, 0);
          if (0 === (1 & t)) return ru(e, Ke()), null;
          var n = gu(e, t);
          if (0 !== e.tag && 2 === n) {
            var r = pt(e);
            0 !== r && ((t = r), (n = ou(e, r)));
          }
          if (1 === n) throw ((n = zl), hu(e, 0), su(e, t), ru(e, Ke()), n);
          if (6 === n) throw Error(o(345));
          return (
            (e.finishedWork = e.current.alternate),
            (e.finishedLanes = t),
            xu(e, Il, _l),
            ru(e, Ke()),
            null
          );
        }
        function uu(e, t) {
          var n = Tl;
          Tl |= 1;
          try {
            return e(t);
          } finally {
            0 === (Tl = n) && ((Zl = Ke() + 500), Oi && Zi());
          }
        }
        function cu(e) {
          null !== Xl && 0 === Xl.tag && 0 === (6 & Tl) && wu();
          var t = Tl;
          Tl |= 1;
          var n = Cl.transition,
            r = At;
          try {
            if (((Cl.transition = null), (At = 1), e)) return e();
          } finally {
            (At = r), (Cl.transition = n), 0 === (6 & (Tl = t)) && Zi();
          }
        }
        function du() {
          (Rl = jl.current), Ei(jl);
        }
        function hu(e, t) {
          (e.finishedWork = null), (e.finishedLanes = 0);
          var n = e.timeoutHandle;
          if ((-1 !== n && ((e.timeoutHandle = -1), ii(n)), null !== Dl))
            for (n = Dl.return; null !== n; ) {
              var r = n;
              switch ((to(r), r.tag)) {
                case 1:
                  null !== (r = r.type.childContextTypes) &&
                    void 0 !== r &&
                    ji();
                  break;
                case 3:
                  Ko(), Ei(Fi), Ei(Ti), ra();
                  break;
                case 5:
                  $o(r);
                  break;
                case 4:
                  Ko();
                  break;
                case 13:
                case 19:
                  Ei(ea);
                  break;
                case 10:
                  To(r.type._context);
                  break;
                case 22:
                case 23:
                  du();
              }
              n = n.return;
            }
          if (
            ((Fl = e),
            (Dl = e = ju(e.current, null)),
            (Ml = Rl = t),
            (Ll = 0),
            (zl = null),
            (Vl = Bl = Nl = 0),
            (Il = Ol = null),
            null !== Ro)
          ) {
            for (t = 0; t < Ro.length; t++)
              if (null !== (r = (n = Ro[t]).interleaved)) {
                n.interleaved = null;
                var i = r.next,
                  o = n.pending;
                if (null !== o) {
                  var a = o.next;
                  (o.next = i), (r.next = a);
                }
                n.pending = r;
              }
            Ro = null;
          }
          return e;
        }
        function fu(e, t) {
          for (;;) {
            var n = Dl;
            try {
              if ((Co(), (ia.current = qa), ca)) {
                for (var r = sa.memoizedState; null !== r; ) {
                  var i = r.queue;
                  null !== i && (i.pending = null), (r = r.next);
                }
                ca = !1;
              }
              if (
                ((aa = 0),
                (ua = la = sa = null),
                (da = !1),
                (ha = 0),
                (Pl.current = null),
                null === n || null === n.return)
              ) {
                (Ll = 1), (zl = t), (Dl = null);
                break;
              }
              e: {
                var a = e,
                  s = n.return,
                  l = n,
                  u = t;
                if (
                  ((t = Ml),
                  (l.flags |= 32768),
                  null !== u &&
                    'object' === typeof u &&
                    'function' === typeof u.then)
                ) {
                  var c = u,
                    d = l,
                    h = d.tag;
                  if (0 === (1 & d.mode) && (0 === h || 11 === h || 15 === h)) {
                    var f = d.alternate;
                    f
                      ? ((d.updateQueue = f.updateQueue),
                        (d.memoizedState = f.memoizedState),
                        (d.lanes = f.lanes))
                      : ((d.updateQueue = null), (d.memoizedState = null));
                  }
                  var p = gs(s);
                  if (null !== p) {
                    (p.flags &= -257),
                      vs(p, s, l, 0, t),
                      1 & p.mode && ms(a, c, t),
                      (u = c);
                    var m = (t = p).updateQueue;
                    if (null === m) {
                      var g = new Set();
                      g.add(u), (t.updateQueue = g);
                    } else m.add(u);
                    break e;
                  }
                  if (0 === (1 & t)) {
                    ms(a, c, t), mu();
                    break e;
                  }
                  u = Error(o(426));
                } else if (io && 1 & l.mode) {
                  var v = gs(s);
                  if (null !== v) {
                    0 === (65536 & v.flags) && (v.flags |= 256),
                      vs(v, s, l, 0, t),
                      mo(us(u, l));
                    break e;
                  }
                }
                (a = u = us(u, l)),
                  4 !== Ll && (Ll = 2),
                  null === Ol ? (Ol = [a]) : Ol.push(a),
                  (a = s);
                do {
                  switch (a.tag) {
                    case 3:
                      (a.flags |= 65536),
                        (t &= -t),
                        (a.lanes |= t),
                        Zo(a, fs(0, u, t));
                      break e;
                    case 1:
                      l = u;
                      var y = a.type,
                        A = a.stateNode;
                      if (
                        0 === (128 & a.flags) &&
                        ('function' === typeof y.getDerivedStateFromError ||
                          (null !== A &&
                            'function' === typeof A.componentDidCatch &&
                            (null === Jl || !Jl.has(A))))
                      ) {
                        (a.flags |= 65536),
                          (t &= -t),
                          (a.lanes |= t),
                          Zo(a, ps(a, l, t));
                        break e;
                      }
                  }
                  a = a.return;
                } while (null !== a);
              }
              bu(n);
            } catch (b) {
              (t = b), Dl === n && null !== n && (Dl = n = n.return);
              continue;
            }
            break;
          }
        }
        function pu() {
          var e = El.current;
          return (El.current = qa), null === e ? qa : e;
        }
        function mu() {
          (0 !== Ll && 3 !== Ll && 2 !== Ll) || (Ll = 4),
            null === Fl ||
              (0 === (268435455 & Nl) && 0 === (268435455 & Bl)) ||
              su(Fl, Ml);
        }
        function gu(e, t) {
          var n = Tl;
          Tl |= 2;
          var r = pu();
          for ((Fl === e && Ml === t) || ((_l = null), hu(e, t)); ; )
            try {
              vu();
              break;
            } catch (i) {
              fu(e, i);
            }
          if ((Co(), (Tl = n), (El.current = r), null !== Dl))
            throw Error(o(261));
          return (Fl = null), (Ml = 0), Ll;
        }
        function vu() {
          for (; null !== Dl; ) Au(Dl);
        }
        function yu() {
          for (; null !== Dl && !Qe(); ) Au(Dl);
        }
        function Au(e) {
          var t = Sl(e.alternate, e, Rl);
          (e.memoizedProps = e.pendingProps),
            null === t ? bu(e) : (Dl = t),
            (Pl.current = null);
        }
        function bu(e) {
          var t = e;
          do {
            var n = t.alternate;
            if (((e = t.return), 0 === (32768 & t.flags))) {
              if (null !== (n = Ys(n, t, Rl))) return void (Dl = n);
            } else {
              if (null !== (n = Xs(n, t)))
                return (n.flags &= 32767), void (Dl = n);
              if (null === e) return (Ll = 6), void (Dl = null);
              (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            }
            if (null !== (t = t.sibling)) return void (Dl = t);
            Dl = t = e;
          } while (null !== t);
          0 === Ll && (Ll = 5);
        }
        function xu(e, t, n) {
          var r = At,
            i = Cl.transition;
          try {
            (Cl.transition = null),
              (At = 1),
              (function (e, t, n, r) {
                do {
                  wu();
                } while (null !== Xl);
                if (0 !== (6 & Tl)) throw Error(o(327));
                n = e.finishedWork;
                var i = e.finishedLanes;
                if (null === n) return null;
                if (
                  ((e.finishedWork = null),
                  (e.finishedLanes = 0),
                  n === e.current)
                )
                  throw Error(o(177));
                (e.callbackNode = null), (e.callbackPriority = 0);
                var a = n.lanes | n.childLanes;
                if (
                  ((function (e, t) {
                    var n = e.pendingLanes & ~t;
                    (e.pendingLanes = t),
                      (e.suspendedLanes = 0),
                      (e.pingedLanes = 0),
                      (e.expiredLanes &= t),
                      (e.mutableReadLanes &= t),
                      (e.entangledLanes &= t),
                      (t = e.entanglements);
                    var r = e.eventTimes;
                    for (e = e.expirationTimes; 0 < n; ) {
                      var i = 31 - at(n),
                        o = 1 << i;
                      (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
                    }
                  })(e, a),
                  e === Fl && ((Dl = Fl = null), (Ml = 0)),
                  (0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags)) ||
                    Yl ||
                    ((Yl = !0),
                    Fu(tt, function () {
                      return wu(), null;
                    })),
                  (a = 0 !== (15990 & n.flags)),
                  0 !== (15990 & n.subtreeFlags) || a)
                ) {
                  (a = Cl.transition), (Cl.transition = null);
                  var s = At;
                  At = 1;
                  var l = Tl;
                  (Tl |= 4),
                    (Pl.current = null),
                    (function (e, t) {
                      if (((ei = Wt), fr((e = hr())))) {
                        if ('selectionStart' in e)
                          var n = {
                            start: e.selectionStart,
                            end: e.selectionEnd,
                          };
                        else
                          e: {
                            var r =
                              (n =
                                ((n = e.ownerDocument) && n.defaultView) ||
                                window).getSelection && n.getSelection();
                            if (r && 0 !== r.rangeCount) {
                              n = r.anchorNode;
                              var i = r.anchorOffset,
                                a = r.focusNode;
                              r = r.focusOffset;
                              try {
                                n.nodeType, a.nodeType;
                              } catch (x) {
                                n = null;
                                break e;
                              }
                              var s = 0,
                                l = -1,
                                u = -1,
                                c = 0,
                                d = 0,
                                h = e,
                                f = null;
                              t: for (;;) {
                                for (
                                  var p;
                                  h !== n ||
                                    (0 !== i && 3 !== h.nodeType) ||
                                    (l = s + i),
                                    h !== a ||
                                      (0 !== r && 3 !== h.nodeType) ||
                                      (u = s + r),
                                    3 === h.nodeType &&
                                      (s += h.nodeValue.length),
                                    null !== (p = h.firstChild);

                                )
                                  (f = h), (h = p);
                                for (;;) {
                                  if (h === e) break t;
                                  if (
                                    (f === n && ++c === i && (l = s),
                                    f === a && ++d === r && (u = s),
                                    null !== (p = h.nextSibling))
                                  )
                                    break;
                                  f = (h = f).parentNode;
                                }
                                h = p;
                              }
                              n =
                                -1 === l || -1 === u
                                  ? null
                                  : { start: l, end: u };
                            } else n = null;
                          }
                        n = n || { start: 0, end: 0 };
                      } else n = null;
                      for (
                        ti = { focusedElem: e, selectionRange: n },
                          Wt = !1,
                          qs = t;
                        null !== qs;

                      )
                        if (
                          ((e = (t = qs).child),
                          0 !== (1028 & t.subtreeFlags) && null !== e)
                        )
                          (e.return = t), (qs = e);
                        else
                          for (; null !== qs; ) {
                            t = qs;
                            try {
                              var m = t.alternate;
                              if (0 !== (1024 & t.flags))
                                switch (t.tag) {
                                  case 0:
                                  case 11:
                                  case 15:
                                  case 5:
                                  case 6:
                                  case 4:
                                  case 17:
                                    break;
                                  case 1:
                                    if (null !== m) {
                                      var g = m.memoizedProps,
                                        v = m.memoizedState,
                                        y = t.stateNode,
                                        A = y.getSnapshotBeforeUpdate(
                                          t.elementType === t.type
                                            ? g
                                            : ns(t.type, g),
                                          v
                                        );
                                      y.__reactInternalSnapshotBeforeUpdate = A;
                                    }
                                    break;
                                  case 3:
                                    var b = t.stateNode.containerInfo;
                                    1 === b.nodeType
                                      ? (b.textContent = '')
                                      : 9 === b.nodeType &&
                                        b.documentElement &&
                                        b.removeChild(b.documentElement);
                                    break;
                                  default:
                                    throw Error(o(163));
                                }
                            } catch (x) {
                              ku(t, t.return, x);
                            }
                            if (null !== (e = t.sibling)) {
                              (e.return = t.return), (qs = e);
                              break;
                            }
                            qs = t.return;
                          }
                      (m = tl), (tl = !1);
                    })(e, n),
                    gl(n, e),
                    pr(ti),
                    (Wt = !!ei),
                    (ti = ei = null),
                    (e.current = n),
                    yl(n, e, i),
                    Ge(),
                    (Tl = l),
                    (At = s),
                    (Cl.transition = a);
                } else e.current = n;
                if (
                  (Yl && ((Yl = !1), (Xl = e), (Ql = i)),
                  (a = e.pendingLanes),
                  0 === a && (Jl = null),
                  (function (e) {
                    if (ot && 'function' === typeof ot.onCommitFiberRoot)
                      try {
                        ot.onCommitFiberRoot(
                          it,
                          e,
                          void 0,
                          128 === (128 & e.current.flags)
                        );
                      } catch (t) {}
                  })(n.stateNode),
                  ru(e, Ke()),
                  null !== t)
                )
                  for (r = e.onRecoverableError, n = 0; n < t.length; n++)
                    (i = t[n]),
                      r(i.value, { componentStack: i.stack, digest: i.digest });
                if (Wl) throw ((Wl = !1), (e = Hl), (Hl = null), e);
                0 !== (1 & Ql) && 0 !== e.tag && wu(),
                  (a = e.pendingLanes),
                  0 !== (1 & a)
                    ? e === Kl
                      ? Gl++
                      : ((Gl = 0), (Kl = e))
                    : (Gl = 0),
                  Zi();
              })(e, t, n, r);
          } finally {
            (Cl.transition = i), (At = r);
          }
          return null;
        }
        function wu() {
          if (null !== Xl) {
            var e = bt(Ql),
              t = Cl.transition,
              n = At;
            try {
              if (((Cl.transition = null), (At = 16 > e ? 16 : e), null === Xl))
                var r = !1;
              else {
                if (((e = Xl), (Xl = null), (Ql = 0), 0 !== (6 & Tl)))
                  throw Error(o(331));
                var i = Tl;
                for (Tl |= 4, qs = e.current; null !== qs; ) {
                  var a = qs,
                    s = a.child;
                  if (0 !== (16 & qs.flags)) {
                    var l = a.deletions;
                    if (null !== l) {
                      for (var u = 0; u < l.length; u++) {
                        var c = l[u];
                        for (qs = c; null !== qs; ) {
                          var d = qs;
                          switch (d.tag) {
                            case 0:
                            case 11:
                            case 15:
                              nl(8, d, a);
                          }
                          var h = d.child;
                          if (null !== h) (h.return = d), (qs = h);
                          else
                            for (; null !== qs; ) {
                              var f = (d = qs).sibling,
                                p = d.return;
                              if ((ol(d), d === c)) {
                                qs = null;
                                break;
                              }
                              if (null !== f) {
                                (f.return = p), (qs = f);
                                break;
                              }
                              qs = p;
                            }
                        }
                      }
                      var m = a.alternate;
                      if (null !== m) {
                        var g = m.child;
                        if (null !== g) {
                          m.child = null;
                          do {
                            var v = g.sibling;
                            (g.sibling = null), (g = v);
                          } while (null !== g);
                        }
                      }
                      qs = a;
                    }
                  }
                  if (0 !== (2064 & a.subtreeFlags) && null !== s)
                    (s.return = a), (qs = s);
                  else
                    e: for (; null !== qs; ) {
                      if (0 !== (2048 & (a = qs).flags))
                        switch (a.tag) {
                          case 0:
                          case 11:
                          case 15:
                            nl(9, a, a.return);
                        }
                      var y = a.sibling;
                      if (null !== y) {
                        (y.return = a.return), (qs = y);
                        break e;
                      }
                      qs = a.return;
                    }
                }
                var A = e.current;
                for (qs = A; null !== qs; ) {
                  var b = (s = qs).child;
                  if (0 !== (2064 & s.subtreeFlags) && null !== b)
                    (b.return = s), (qs = b);
                  else
                    e: for (s = A; null !== qs; ) {
                      if (0 !== (2048 & (l = qs).flags))
                        try {
                          switch (l.tag) {
                            case 0:
                            case 11:
                            case 15:
                              rl(9, l);
                          }
                        } catch (w) {
                          ku(l, l.return, w);
                        }
                      if (l === s) {
                        qs = null;
                        break e;
                      }
                      var x = l.sibling;
                      if (null !== x) {
                        (x.return = l.return), (qs = x);
                        break e;
                      }
                      qs = l.return;
                    }
                }
                if (
                  ((Tl = i),
                  Zi(),
                  ot && 'function' === typeof ot.onPostCommitFiberRoot)
                )
                  try {
                    ot.onPostCommitFiberRoot(it, e);
                  } catch (w) {}
                r = !0;
              }
              return r;
            } finally {
              (At = n), (Cl.transition = t);
            }
          }
          return !1;
        }
        function Su(e, t, n) {
          (e = Io(e, (t = fs(0, (t = us(n, t)), 1)), 1)),
            (t = eu()),
            null !== e && (vt(e, 1, t), ru(e, t));
        }
        function ku(e, t, n) {
          if (3 === e.tag) Su(e, e, n);
          else
            for (; null !== t; ) {
              if (3 === t.tag) {
                Su(t, e, n);
                break;
              }
              if (1 === t.tag) {
                var r = t.stateNode;
                if (
                  'function' === typeof t.type.getDerivedStateFromError ||
                  ('function' === typeof r.componentDidCatch &&
                    (null === Jl || !Jl.has(r)))
                ) {
                  (t = Io(t, (e = ps(t, (e = us(n, e)), 1)), 1)),
                    (e = eu()),
                    null !== t && (vt(t, 1, e), ru(t, e));
                  break;
                }
              }
              t = t.return;
            }
        }
        function Eu(e, t, n) {
          var r = e.pingCache;
          null !== r && r.delete(t),
            (t = eu()),
            (e.pingedLanes |= e.suspendedLanes & n),
            Fl === e &&
              (Ml & n) === n &&
              (4 === Ll ||
              (3 === Ll && (130023424 & Ml) === Ml && 500 > Ke() - Ul)
                ? hu(e, 0)
                : (Vl |= n)),
            ru(e, t);
        }
        function Pu(e, t) {
          0 === t &&
            (0 === (1 & e.mode)
              ? (t = 1)
              : ((t = ct), 0 === (130023424 & (ct <<= 1)) && (ct = 4194304)));
          var n = eu();
          null !== (e = zo(e, t)) && (vt(e, t, n), ru(e, n));
        }
        function Cu(e) {
          var t = e.memoizedState,
            n = 0;
          null !== t && (n = t.retryLane), Pu(e, n);
        }
        function Tu(e, t) {
          var n = 0;
          switch (e.tag) {
            case 13:
              var r = e.stateNode,
                i = e.memoizedState;
              null !== i && (n = i.retryLane);
              break;
            case 19:
              r = e.stateNode;
              break;
            default:
              throw Error(o(314));
          }
          null !== r && r.delete(t), Pu(e, n);
        }
        function Fu(e, t) {
          return Ye(e, t);
        }
        function Du(e, t, n, r) {
          (this.tag = e),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.ref = null),
            (this.pendingProps = t),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null);
        }
        function Mu(e, t, n, r) {
          return new Du(e, t, n, r);
        }
        function Ru(e) {
          return !(!(e = e.prototype) || !e.isReactComponent);
        }
        function ju(e, t) {
          var n = e.alternate;
          return (
            null === n
              ? (((n = Mu(e.tag, t, e.key, e.mode)).elementType =
                  e.elementType),
                (n.type = e.type),
                (n.stateNode = e.stateNode),
                (n.alternate = e),
                (e.alternate = n))
              : ((n.pendingProps = t),
                (n.type = e.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = 14680064 & e.flags),
            (n.childLanes = e.childLanes),
            (n.lanes = e.lanes),
            (n.child = e.child),
            (n.memoizedProps = e.memoizedProps),
            (n.memoizedState = e.memoizedState),
            (n.updateQueue = e.updateQueue),
            (t = e.dependencies),
            (n.dependencies =
              null === t
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
            (n.sibling = e.sibling),
            (n.index = e.index),
            (n.ref = e.ref),
            n
          );
        }
        function Lu(e, t, n, r, i, a) {
          var s = 2;
          if (((r = e), 'function' === typeof e)) Ru(e) && (s = 1);
          else if ('string' === typeof e) s = 5;
          else
            e: switch (e) {
              case S:
                return zu(n.children, i, a, t);
              case k:
                (s = 8), (i |= 8);
                break;
              case E:
                return (
                  ((e = Mu(12, n, t, 2 | i)).elementType = E), (e.lanes = a), e
                );
              case F:
                return (
                  ((e = Mu(13, n, t, i)).elementType = F), (e.lanes = a), e
                );
              case D:
                return (
                  ((e = Mu(19, n, t, i)).elementType = D), (e.lanes = a), e
                );
              case j:
                return Nu(n, i, a, t);
              default:
                if ('object' === typeof e && null !== e)
                  switch (e.$$typeof) {
                    case P:
                      s = 10;
                      break e;
                    case C:
                      s = 9;
                      break e;
                    case T:
                      s = 11;
                      break e;
                    case M:
                      s = 14;
                      break e;
                    case R:
                      (s = 16), (r = null);
                      break e;
                  }
                throw Error(o(130, null == e ? e : typeof e, ''));
            }
          return (
            ((t = Mu(s, n, t, i)).elementType = e),
            (t.type = r),
            (t.lanes = a),
            t
          );
        }
        function zu(e, t, n, r) {
          return ((e = Mu(7, e, r, t)).lanes = n), e;
        }
        function Nu(e, t, n, r) {
          return (
            ((e = Mu(22, e, r, t)).elementType = j),
            (e.lanes = n),
            (e.stateNode = { isHidden: !1 }),
            e
          );
        }
        function Bu(e, t, n) {
          return ((e = Mu(6, e, null, t)).lanes = n), e;
        }
        function Vu(e, t, n) {
          return (
            ((t = Mu(
              4,
              null !== e.children ? e.children : [],
              e.key,
              t
            )).lanes = n),
            (t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation,
            }),
            t
          );
        }
        function Ou(e, t, n, r, i) {
          (this.tag = t),
            (this.containerInfo = e),
            (this.finishedWork =
              this.pingCache =
              this.current =
              this.pendingChildren =
                null),
            (this.timeoutHandle = -1),
            (this.callbackNode = this.pendingContext = this.context = null),
            (this.callbackPriority = 0),
            (this.eventTimes = gt(0)),
            (this.expirationTimes = gt(-1)),
            (this.entangledLanes =
              this.finishedLanes =
              this.mutableReadLanes =
              this.expiredLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = gt(0)),
            (this.identifierPrefix = r),
            (this.onRecoverableError = i),
            (this.mutableSourceEagerHydrationData = null);
        }
        function Iu(e, t, n, r, i, o, a, s, l) {
          return (
            (e = new Ou(e, t, n, s, l)),
            1 === t ? ((t = 1), !0 === o && (t |= 8)) : (t = 0),
            (o = Mu(3, null, null, t)),
            (e.current = o),
            (o.stateNode = e),
            (o.memoizedState = {
              element: r,
              isDehydrated: n,
              cache: null,
              transitions: null,
              pendingSuspenseBoundaries: null,
            }),
            Bo(o),
            e
          );
        }
        function Uu(e) {
          if (!e) return Ci;
          e: {
            if (Ze((e = e._reactInternals)) !== e || 1 !== e.tag)
              throw Error(o(170));
            var t = e;
            do {
              switch (t.tag) {
                case 3:
                  t = t.stateNode.context;
                  break e;
                case 1:
                  if (Ri(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e;
                  }
              }
              t = t.return;
            } while (null !== t);
            throw Error(o(171));
          }
          if (1 === e.tag) {
            var n = e.type;
            if (Ri(n)) return zi(e, n, t);
          }
          return t;
        }
        function Zu(e, t, n, r, i, o, a, s, l) {
          return (
            ((e = Iu(n, r, !0, e, 0, o, 0, s, l)).context = Uu(null)),
            (n = e.current),
            ((o = Oo((r = eu()), (i = tu(n)))).callback =
              void 0 !== t && null !== t ? t : null),
            Io(n, o, i),
            (e.current.lanes = i),
            vt(e, i, r),
            ru(e, r),
            e
          );
        }
        function _u(e, t, n, r) {
          var i = t.current,
            o = eu(),
            a = tu(i);
          return (
            (n = Uu(n)),
            null === t.context ? (t.context = n) : (t.pendingContext = n),
            ((t = Oo(o, a)).payload = { element: e }),
            null !== (r = void 0 === r ? null : r) && (t.callback = r),
            null !== (e = Io(i, t, a)) && (nu(e, i, a, o), Uo(e, i, a)),
            a
          );
        }
        function Wu(e) {
          return (e = e.current).child
            ? (e.child.tag, e.child.stateNode)
            : null;
        }
        function Hu(e, t) {
          if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
            var n = e.retryLane;
            e.retryLane = 0 !== n && n < t ? n : t;
          }
        }
        function Ju(e, t) {
          Hu(e, t), (e = e.alternate) && Hu(e, t);
        }
        Sl = function (e, t, n) {
          if (null !== e)
            if (e.memoizedProps !== t.pendingProps || Fi.current) As = !0;
            else {
              if (0 === (e.lanes & n) && 0 === (128 & t.flags))
                return (
                  (As = !1),
                  (function (e, t, n) {
                    switch (t.tag) {
                      case 3:
                        Fs(t), po();
                        break;
                      case 5:
                        qo(t);
                        break;
                      case 1:
                        Ri(t.type) && Ni(t);
                        break;
                      case 4:
                        Go(t, t.stateNode.containerInfo);
                        break;
                      case 10:
                        var r = t.type._context,
                          i = t.memoizedProps.value;
                        Pi(So, r._currentValue), (r._currentValue = i);
                        break;
                      case 13:
                        if (null !== (r = t.memoizedState))
                          return null !== r.dehydrated
                            ? (Pi(ea, 1 & ea.current), (t.flags |= 128), null)
                            : 0 !== (n & t.child.childLanes)
                              ? Bs(e, t, n)
                              : (Pi(ea, 1 & ea.current),
                                null !== (e = Ws(e, t, n)) ? e.sibling : null);
                        Pi(ea, 1 & ea.current);
                        break;
                      case 19:
                        if (
                          ((r = 0 !== (n & t.childLanes)),
                          0 !== (128 & e.flags))
                        ) {
                          if (r) return Zs(e, t, n);
                          t.flags |= 128;
                        }
                        if (
                          (null !== (i = t.memoizedState) &&
                            ((i.rendering = null),
                            (i.tail = null),
                            (i.lastEffect = null)),
                          Pi(ea, ea.current),
                          r)
                        )
                          break;
                        return null;
                      case 22:
                      case 23:
                        return (t.lanes = 0), ks(e, t, n);
                    }
                    return Ws(e, t, n);
                  })(e, t, n)
                );
              As = 0 !== (131072 & e.flags);
            }
          else (As = !1), io && 0 !== (1048576 & t.flags) && $i(t, Ji, t.index);
          switch (((t.lanes = 0), t.tag)) {
            case 2:
              var r = t.type;
              _s(e, t), (e = t.pendingProps);
              var i = Mi(t, Ti.current);
              Do(t, n), (i = ga(null, t, r, e, i, n));
              var a = va();
              return (
                (t.flags |= 1),
                'object' === typeof i &&
                null !== i &&
                'function' === typeof i.render &&
                void 0 === i.$$typeof
                  ? ((t.tag = 1),
                    (t.memoizedState = null),
                    (t.updateQueue = null),
                    Ri(r) ? ((a = !0), Ni(t)) : (a = !1),
                    (t.memoizedState =
                      null !== i.state && void 0 !== i.state ? i.state : null),
                    Bo(t),
                    (i.updater = is),
                    (t.stateNode = i),
                    (i._reactInternals = t),
                    ls(t, r, e, n),
                    (t = Ts(null, t, r, !0, a, n)))
                  : ((t.tag = 0),
                    io && a && eo(t),
                    bs(null, t, i, n),
                    (t = t.child)),
                t
              );
            case 16:
              r = t.elementType;
              e: {
                switch (
                  (_s(e, t),
                  (e = t.pendingProps),
                  (r = (i = r._init)(r._payload)),
                  (t.type = r),
                  (i = t.tag =
                    (function (e) {
                      if ('function' === typeof e) return Ru(e) ? 1 : 0;
                      if (void 0 !== e && null !== e) {
                        if ((e = e.$$typeof) === T) return 11;
                        if (e === M) return 14;
                      }
                      return 2;
                    })(r)),
                  (e = ns(r, e)),
                  i)
                ) {
                  case 0:
                    t = Ps(null, t, r, e, n);
                    break e;
                  case 1:
                    t = Cs(null, t, r, e, n);
                    break e;
                  case 11:
                    t = xs(null, t, r, e, n);
                    break e;
                  case 14:
                    t = ws(null, t, r, ns(r.type, e), n);
                    break e;
                }
                throw Error(o(306, r, ''));
              }
              return t;
            case 0:
              return (
                (r = t.type),
                (i = t.pendingProps),
                Ps(e, t, r, (i = t.elementType === r ? i : ns(r, i)), n)
              );
            case 1:
              return (
                (r = t.type),
                (i = t.pendingProps),
                Cs(e, t, r, (i = t.elementType === r ? i : ns(r, i)), n)
              );
            case 3:
              e: {
                if ((Fs(t), null === e)) throw Error(o(387));
                (r = t.pendingProps),
                  (i = (a = t.memoizedState).element),
                  Vo(e, t),
                  _o(t, r, null, n);
                var s = t.memoizedState;
                if (((r = s.element), a.isDehydrated)) {
                  if (
                    ((a = {
                      element: r,
                      isDehydrated: !1,
                      cache: s.cache,
                      pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                      transitions: s.transitions,
                    }),
                    (t.updateQueue.baseState = a),
                    (t.memoizedState = a),
                    256 & t.flags)
                  ) {
                    t = Ds(e, t, r, n, (i = us(Error(o(423)), t)));
                    break e;
                  }
                  if (r !== i) {
                    t = Ds(e, t, r, n, (i = us(Error(o(424)), t)));
                    break e;
                  }
                  for (
                    ro = ui(t.stateNode.containerInfo.firstChild),
                      no = t,
                      io = !0,
                      oo = null,
                      n = wo(t, null, r, n),
                      t.child = n;
                    n;

                  )
                    (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
                } else {
                  if ((po(), r === i)) {
                    t = Ws(e, t, n);
                    break e;
                  }
                  bs(e, t, r, n);
                }
                t = t.child;
              }
              return t;
            case 5:
              return (
                qo(t),
                null === e && uo(t),
                (r = t.type),
                (i = t.pendingProps),
                (a = null !== e ? e.memoizedProps : null),
                (s = i.children),
                ni(r, i)
                  ? (s = null)
                  : null !== a && ni(r, a) && (t.flags |= 32),
                Es(e, t),
                bs(e, t, s, n),
                t.child
              );
            case 6:
              return null === e && uo(t), null;
            case 13:
              return Bs(e, t, n);
            case 4:
              return (
                Go(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                null === e ? (t.child = xo(t, null, r, n)) : bs(e, t, r, n),
                t.child
              );
            case 11:
              return (
                (r = t.type),
                (i = t.pendingProps),
                xs(e, t, r, (i = t.elementType === r ? i : ns(r, i)), n)
              );
            case 7:
              return bs(e, t, t.pendingProps, n), t.child;
            case 8:
            case 12:
              return bs(e, t, t.pendingProps.children, n), t.child;
            case 10:
              e: {
                if (
                  ((r = t.type._context),
                  (i = t.pendingProps),
                  (a = t.memoizedProps),
                  (s = i.value),
                  Pi(So, r._currentValue),
                  (r._currentValue = s),
                  null !== a)
                )
                  if (sr(a.value, s)) {
                    if (a.children === i.children && !Fi.current) {
                      t = Ws(e, t, n);
                      break e;
                    }
                  } else
                    for (
                      null !== (a = t.child) && (a.return = t);
                      null !== a;

                    ) {
                      var l = a.dependencies;
                      if (null !== l) {
                        s = a.child;
                        for (var u = l.firstContext; null !== u; ) {
                          if (u.context === r) {
                            if (1 === a.tag) {
                              (u = Oo(-1, n & -n)).tag = 2;
                              var c = a.updateQueue;
                              if (null !== c) {
                                var d = (c = c.shared).pending;
                                null === d
                                  ? (u.next = u)
                                  : ((u.next = d.next), (d.next = u)),
                                  (c.pending = u);
                              }
                            }
                            (a.lanes |= n),
                              null !== (u = a.alternate) && (u.lanes |= n),
                              Fo(a.return, n, t),
                              (l.lanes |= n);
                            break;
                          }
                          u = u.next;
                        }
                      } else if (10 === a.tag)
                        s = a.type === t.type ? null : a.child;
                      else if (18 === a.tag) {
                        if (null === (s = a.return)) throw Error(o(341));
                        (s.lanes |= n),
                          null !== (l = s.alternate) && (l.lanes |= n),
                          Fo(s, n, t),
                          (s = a.sibling);
                      } else s = a.child;
                      if (null !== s) s.return = a;
                      else
                        for (s = a; null !== s; ) {
                          if (s === t) {
                            s = null;
                            break;
                          }
                          if (null !== (a = s.sibling)) {
                            (a.return = s.return), (s = a);
                            break;
                          }
                          s = s.return;
                        }
                      a = s;
                    }
                bs(e, t, i.children, n), (t = t.child);
              }
              return t;
            case 9:
              return (
                (i = t.type),
                (r = t.pendingProps.children),
                Do(t, n),
                (r = r((i = Mo(i)))),
                (t.flags |= 1),
                bs(e, t, r, n),
                t.child
              );
            case 14:
              return (
                (i = ns((r = t.type), t.pendingProps)),
                ws(e, t, r, (i = ns(r.type, i)), n)
              );
            case 15:
              return Ss(e, t, t.type, t.pendingProps, n);
            case 17:
              return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : ns(r, i)),
                _s(e, t),
                (t.tag = 1),
                Ri(r) ? ((e = !0), Ni(t)) : (e = !1),
                Do(t, n),
                as(t, r, i),
                ls(t, r, i, n),
                Ts(null, t, r, !0, e, n)
              );
            case 19:
              return Zs(e, t, n);
            case 22:
              return ks(e, t, n);
          }
          throw Error(o(156, t.tag));
        };
        var Yu =
          'function' === typeof reportError
            ? reportError
            : function (e) {
                console.error(e);
              };
        function Xu(e) {
          this._internalRoot = e;
        }
        function Qu(e) {
          this._internalRoot = e;
        }
        function Gu(e) {
          return !(
            !e ||
            (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
          );
        }
        function Ku(e) {
          return !(
            !e ||
            (1 !== e.nodeType &&
              9 !== e.nodeType &&
              11 !== e.nodeType &&
              (8 !== e.nodeType ||
                ' react-mount-point-unstable ' !== e.nodeValue))
          );
        }
        function qu() {}
        function $u(e, t, n, r, i) {
          var o = n._reactRootContainer;
          if (o) {
            var a = o;
            if ('function' === typeof i) {
              var s = i;
              i = function () {
                var e = Wu(a);
                s.call(e);
              };
            }
            _u(t, a, e, i);
          } else
            a = (function (e, t, n, r, i) {
              if (i) {
                if ('function' === typeof r) {
                  var o = r;
                  r = function () {
                    var e = Wu(a);
                    o.call(e);
                  };
                }
                var a = Zu(t, r, e, 0, null, !1, 0, '', qu);
                return (
                  (e._reactRootContainer = a),
                  (e[pi] = a.current),
                  Zr(8 === e.nodeType ? e.parentNode : e),
                  cu(),
                  a
                );
              }
              for (; (i = e.lastChild); ) e.removeChild(i);
              if ('function' === typeof r) {
                var s = r;
                r = function () {
                  var e = Wu(l);
                  s.call(e);
                };
              }
              var l = Iu(e, 0, !1, null, 0, !1, 0, '', qu);
              return (
                (e._reactRootContainer = l),
                (e[pi] = l.current),
                Zr(8 === e.nodeType ? e.parentNode : e),
                cu(function () {
                  _u(t, l, n, r);
                }),
                l
              );
            })(n, t, e, i, r);
          return Wu(a);
        }
        (Qu.prototype.render = Xu.prototype.render =
          function (e) {
            var t = this._internalRoot;
            if (null === t) throw Error(o(409));
            _u(e, t, null, null);
          }),
          (Qu.prototype.unmount = Xu.prototype.unmount =
            function () {
              var e = this._internalRoot;
              if (null !== e) {
                this._internalRoot = null;
                var t = e.containerInfo;
                cu(function () {
                  _u(null, e, null, null);
                }),
                  (t[pi] = null);
              }
            }),
          (Qu.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = kt();
              e = { blockedOn: null, target: e, priority: t };
              for (
                var n = 0;
                n < jt.length && 0 !== t && t < jt[n].priority;
                n++
              );
              jt.splice(n, 0, e), 0 === n && Bt(e);
            }
          }),
          (xt = function (e) {
            switch (e.tag) {
              case 3:
                var t = e.stateNode;
                if (t.current.memoizedState.isDehydrated) {
                  var n = dt(t.pendingLanes);
                  0 !== n &&
                    (yt(t, 1 | n),
                    ru(t, Ke()),
                    0 === (6 & Tl) && ((Zl = Ke() + 500), Zi()));
                }
                break;
              case 13:
                cu(function () {
                  var t = zo(e, 1);
                  if (null !== t) {
                    var n = eu();
                    nu(t, e, 1, n);
                  }
                }),
                  Ju(e, 1);
            }
          }),
          (wt = function (e) {
            if (13 === e.tag) {
              var t = zo(e, 134217728);
              if (null !== t) nu(t, e, 134217728, eu());
              Ju(e, 134217728);
            }
          }),
          (St = function (e) {
            if (13 === e.tag) {
              var t = tu(e),
                n = zo(e, t);
              if (null !== n) nu(n, e, t, eu());
              Ju(e, t);
            }
          }),
          (kt = function () {
            return At;
          }),
          (Et = function (e, t) {
            var n = At;
            try {
              return (At = e), t();
            } finally {
              At = n;
            }
          }),
          (we = function (e, t, n) {
            switch (t) {
              case 'input':
                if ((q(e, n), (t = n.name), 'radio' === n.type && null != t)) {
                  for (n = e; n.parentNode; ) n = n.parentNode;
                  for (
                    n = n.querySelectorAll(
                      'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
                    ),
                      t = 0;
                    t < n.length;
                    t++
                  ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                      var i = xi(r);
                      if (!i) throw Error(o(90));
                      Y(r), q(r, i);
                    }
                  }
                }
                break;
              case 'textarea':
                oe(e, n);
                break;
              case 'select':
                null != (t = n.value) && ne(e, !!n.multiple, t, !1);
            }
          }),
          (Te = uu),
          (Fe = cu);
        var ec = {
            usingClientEntryPoint: !1,
            Events: [Ai, bi, xi, Pe, Ce, uu],
          },
          tc = {
            findFiberByHostInstance: yi,
            bundleType: 0,
            version: '18.3.1',
            rendererPackageName: 'react-dom',
          },
          nc = {
            bundleType: tc.bundleType,
            version: tc.version,
            rendererPackageName: tc.rendererPackageName,
            rendererConfig: tc.rendererConfig,
            overrideHookState: null,
            overrideHookStateDeletePath: null,
            overrideHookStateRenamePath: null,
            overrideProps: null,
            overridePropsDeletePath: null,
            overridePropsRenamePath: null,
            setErrorHandler: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: b.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = He(e)) ? null : e.stateNode;
            },
            findFiberByHostInstance:
              tc.findFiberByHostInstance ||
              function () {
                return null;
              },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
            reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
          };
        if ('undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var rc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!rc.isDisabled && rc.supportsFiber)
            try {
              (it = rc.inject(nc)), (ot = rc);
            } catch (ce) {}
        }
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ec),
          (t.createPortal = function (e, t) {
            var n =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            if (!Gu(t)) throw Error(o(200));
            return (function (e, t, n) {
              var r =
                3 < arguments.length && void 0 !== arguments[3]
                  ? arguments[3]
                  : null;
              return {
                $$typeof: w,
                key: null == r ? null : '' + r,
                children: e,
                containerInfo: t,
                implementation: n,
              };
            })(e, t, null, n);
          }),
          (t.createRoot = function (e, t) {
            if (!Gu(e)) throw Error(o(299));
            var n = !1,
              r = '',
              i = Yu;
            return (
              null !== t &&
                void 0 !== t &&
                (!0 === t.unstable_strictMode && (n = !0),
                void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
                void 0 !== t.onRecoverableError && (i = t.onRecoverableError)),
              (t = Iu(e, 1, !1, null, 0, n, 0, r, i)),
              (e[pi] = t.current),
              Zr(8 === e.nodeType ? e.parentNode : e),
              new Xu(t)
            );
          }),
          (t.findDOMNode = function (e) {
            if (null == e) return null;
            if (1 === e.nodeType) return e;
            var t = e._reactInternals;
            if (void 0 === t) {
              if ('function' === typeof e.render) throw Error(o(188));
              throw ((e = Object.keys(e).join(',')), Error(o(268, e)));
            }
            return (e = null === (e = He(t)) ? null : e.stateNode);
          }),
          (t.flushSync = function (e) {
            return cu(e);
          }),
          (t.hydrate = function (e, t, n) {
            if (!Ku(t)) throw Error(o(200));
            return $u(null, e, t, !0, n);
          }),
          (t.hydrateRoot = function (e, t, n) {
            if (!Gu(e)) throw Error(o(405));
            var r = (null != n && n.hydratedSources) || null,
              i = !1,
              a = '',
              s = Yu;
            if (
              (null !== n &&
                void 0 !== n &&
                (!0 === n.unstable_strictMode && (i = !0),
                void 0 !== n.identifierPrefix && (a = n.identifierPrefix),
                void 0 !== n.onRecoverableError && (s = n.onRecoverableError)),
              (t = Zu(t, null, e, 1, null != n ? n : null, i, 0, a, s)),
              (e[pi] = t.current),
              Zr(e),
              r)
            )
              for (e = 0; e < r.length; e++)
                (i = (i = (n = r[e])._getVersion)(n._source)),
                  null == t.mutableSourceEagerHydrationData
                    ? (t.mutableSourceEagerHydrationData = [n, i])
                    : t.mutableSourceEagerHydrationData.push(n, i);
            return new Qu(t);
          }),
          (t.render = function (e, t, n) {
            if (!Ku(t)) throw Error(o(200));
            return $u(null, e, t, !1, n);
          }),
          (t.unmountComponentAtNode = function (e) {
            if (!Ku(e)) throw Error(o(40));
            return (
              !!e._reactRootContainer &&
              (cu(function () {
                $u(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[pi] = null);
                });
              }),
              !0)
            );
          }),
          (t.unstable_batchedUpdates = uu),
          (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
            if (!Ku(n)) throw Error(o(200));
            if (null == e || void 0 === e._reactInternals) throw Error(o(38));
            return $u(e, t, n, !1, r);
          }),
          (t.version = '18.3.1-next-f1338f8080-20240426');
      },
      391: (e, t, n) => {
        var r = n(950);
        (t.createRoot = r.createRoot), (t.hydrateRoot = r.hydrateRoot);
      },
      950: (e, t, n) => {
        !(function e() {
          if (
            'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
        })(),
          (e.exports = n(730));
      },
      153: (e, t, n) => {
        var r = n(43),
          i = Symbol.for('react.element'),
          o = Symbol.for('react.fragment'),
          a = Object.prototype.hasOwnProperty,
          s =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          l = { key: !0, ref: !0, __self: !0, __source: !0 };
        function u(e, t, n) {
          var r,
            o = {},
            u = null,
            c = null;
          for (r in (void 0 !== n && (u = '' + n),
          void 0 !== t.key && (u = '' + t.key),
          void 0 !== t.ref && (c = t.ref),
          t))
            a.call(t, r) && !l.hasOwnProperty(r) && (o[r] = t[r]);
          if (e && e.defaultProps)
            for (r in (t = e.defaultProps)) void 0 === o[r] && (o[r] = t[r]);
          return {
            $$typeof: i,
            type: e,
            key: u,
            ref: c,
            props: o,
            _owner: s.current,
          };
        }
        (t.Fragment = o), (t.jsx = u), (t.jsxs = u);
      },
      202: (e, t) => {
        var n = Symbol.for('react.element'),
          r = Symbol.for('react.portal'),
          i = Symbol.for('react.fragment'),
          o = Symbol.for('react.strict_mode'),
          a = Symbol.for('react.profiler'),
          s = Symbol.for('react.provider'),
          l = Symbol.for('react.context'),
          u = Symbol.for('react.forward_ref'),
          c = Symbol.for('react.suspense'),
          d = Symbol.for('react.memo'),
          h = Symbol.for('react.lazy'),
          f = Symbol.iterator;
        var p = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          m = Object.assign,
          g = {};
        function v(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || p);
        }
        function y() {}
        function A(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || p);
        }
        (v.prototype.isReactComponent = {}),
          (v.prototype.setState = function (e, t) {
            if ('object' !== typeof e && 'function' !== typeof e && null != e)
              throw Error(
                'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
              );
            this.updater.enqueueSetState(this, e, t, 'setState');
          }),
          (v.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
          }),
          (y.prototype = v.prototype);
        var b = (A.prototype = new y());
        (b.constructor = A), m(b, v.prototype), (b.isPureReactComponent = !0);
        var x = Array.isArray,
          w = Object.prototype.hasOwnProperty,
          S = { current: null },
          k = { key: !0, ref: !0, __self: !0, __source: !0 };
        function E(e, t, r) {
          var i,
            o = {},
            a = null,
            s = null;
          if (null != t)
            for (i in (void 0 !== t.ref && (s = t.ref),
            void 0 !== t.key && (a = '' + t.key),
            t))
              w.call(t, i) && !k.hasOwnProperty(i) && (o[i] = t[i]);
          var l = arguments.length - 2;
          if (1 === l) o.children = r;
          else if (1 < l) {
            for (var u = Array(l), c = 0; c < l; c++) u[c] = arguments[c + 2];
            o.children = u;
          }
          if (e && e.defaultProps)
            for (i in (l = e.defaultProps)) void 0 === o[i] && (o[i] = l[i]);
          return {
            $$typeof: n,
            type: e,
            key: a,
            ref: s,
            props: o,
            _owner: S.current,
          };
        }
        function P(e) {
          return 'object' === typeof e && null !== e && e.$$typeof === n;
        }
        var C = /\/+/g;
        function T(e, t) {
          return 'object' === typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { '=': '=0', ':': '=2' };
                return (
                  '$' +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })('' + e.key)
            : t.toString(36);
        }
        function F(e, t, i, o, a) {
          var s = typeof e;
          ('undefined' !== s && 'boolean' !== s) || (e = null);
          var l = !1;
          if (null === e) l = !0;
          else
            switch (s) {
              case 'string':
              case 'number':
                l = !0;
                break;
              case 'object':
                switch (e.$$typeof) {
                  case n:
                  case r:
                    l = !0;
                }
            }
          if (l)
            return (
              (a = a((l = e))),
              (e = '' === o ? '.' + T(l, 0) : o),
              x(a)
                ? ((i = ''),
                  null != e && (i = e.replace(C, '$&/') + '/'),
                  F(a, t, i, '', function (e) {
                    return e;
                  }))
                : null != a &&
                  (P(a) &&
                    (a = (function (e, t) {
                      return {
                        $$typeof: n,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      };
                    })(
                      a,
                      i +
                        (!a.key || (l && l.key === a.key)
                          ? ''
                          : ('' + a.key).replace(C, '$&/') + '/') +
                        e
                    )),
                  t.push(a)),
              1
            );
          if (((l = 0), (o = '' === o ? '.' : o + ':'), x(e)))
            for (var u = 0; u < e.length; u++) {
              var c = o + T((s = e[u]), u);
              l += F(s, t, i, c, a);
            }
          else if (
            ((c = (function (e) {
              return null === e || 'object' !== typeof e
                ? null
                : 'function' === typeof (e = (f && e[f]) || e['@@iterator'])
                  ? e
                  : null;
            })(e)),
            'function' === typeof c)
          )
            for (e = c.call(e), u = 0; !(s = e.next()).done; )
              l += F((s = s.value), t, i, (c = o + T(s, u++)), a);
          else if ('object' === s)
            throw (
              ((t = String(e)),
              Error(
                'Objects are not valid as a React child (found: ' +
                  ('[object Object]' === t
                    ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                    : t) +
                  '). If you meant to render a collection of children, use an array instead.'
              ))
            );
          return l;
        }
        function D(e, t, n) {
          if (null == e) return e;
          var r = [],
            i = 0;
          return (
            F(e, r, '', '', function (e) {
              return t.call(n, e, i++);
            }),
            r
          );
        }
        function M(e) {
          if (-1 === e._status) {
            var t = e._result;
            (t = t()).then(
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 2), (e._result = t));
              }
            ),
              -1 === e._status && ((e._status = 0), (e._result = t));
          }
          if (1 === e._status) return e._result.default;
          throw e._result;
        }
        var R = { current: null },
          j = { transition: null },
          L = {
            ReactCurrentDispatcher: R,
            ReactCurrentBatchConfig: j,
            ReactCurrentOwner: S,
          };
        function z() {
          throw Error(
            'act(...) is not supported in production builds of React.'
          );
        }
        (t.Children = {
          map: D,
          forEach: function (e, t, n) {
            D(
              e,
              function () {
                t.apply(this, arguments);
              },
              n
            );
          },
          count: function (e) {
            var t = 0;
            return (
              D(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              D(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!P(e))
              throw Error(
                'React.Children.only expected to receive a single React element child.'
              );
            return e;
          },
        }),
          (t.Component = v),
          (t.Fragment = i),
          (t.Profiler = a),
          (t.PureComponent = A),
          (t.StrictMode = o),
          (t.Suspense = c),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = L),
          (t.act = z),
          (t.cloneElement = function (e, t, r) {
            if (null === e || void 0 === e)
              throw Error(
                'React.cloneElement(...): The argument must be a React element, but you passed ' +
                  e +
                  '.'
              );
            var i = m({}, e.props),
              o = e.key,
              a = e.ref,
              s = e._owner;
            if (null != t) {
              if (
                (void 0 !== t.ref && ((a = t.ref), (s = S.current)),
                void 0 !== t.key && (o = '' + t.key),
                e.type && e.type.defaultProps)
              )
                var l = e.type.defaultProps;
              for (u in t)
                w.call(t, u) &&
                  !k.hasOwnProperty(u) &&
                  (i[u] = void 0 === t[u] && void 0 !== l ? l[u] : t[u]);
            }
            var u = arguments.length - 2;
            if (1 === u) i.children = r;
            else if (1 < u) {
              l = Array(u);
              for (var c = 0; c < u; c++) l[c] = arguments[c + 2];
              i.children = l;
            }
            return {
              $$typeof: n,
              type: e.type,
              key: o,
              ref: a,
              props: i,
              _owner: s,
            };
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: l,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: s, _context: e }),
              (e.Consumer = e)
            );
          }),
          (t.createElement = E),
          (t.createFactory = function (e) {
            var t = E.bind(null, e);
            return (t.type = e), t;
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: u, render: e };
          }),
          (t.isValidElement = P),
          (t.lazy = function (e) {
            return {
              $$typeof: h,
              _payload: { _status: -1, _result: e },
              _init: M,
            };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
          }),
          (t.startTransition = function (e) {
            var t = j.transition;
            j.transition = {};
            try {
              e();
            } finally {
              j.transition = t;
            }
          }),
          (t.unstable_act = z),
          (t.useCallback = function (e, t) {
            return R.current.useCallback(e, t);
          }),
          (t.useContext = function (e) {
            return R.current.useContext(e);
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e) {
            return R.current.useDeferredValue(e);
          }),
          (t.useEffect = function (e, t) {
            return R.current.useEffect(e, t);
          }),
          (t.useId = function () {
            return R.current.useId();
          }),
          (t.useImperativeHandle = function (e, t, n) {
            return R.current.useImperativeHandle(e, t, n);
          }),
          (t.useInsertionEffect = function (e, t) {
            return R.current.useInsertionEffect(e, t);
          }),
          (t.useLayoutEffect = function (e, t) {
            return R.current.useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return R.current.useMemo(e, t);
          }),
          (t.useReducer = function (e, t, n) {
            return R.current.useReducer(e, t, n);
          }),
          (t.useRef = function (e) {
            return R.current.useRef(e);
          }),
          (t.useState = function (e) {
            return R.current.useState(e);
          }),
          (t.useSyncExternalStore = function (e, t, n) {
            return R.current.useSyncExternalStore(e, t, n);
          }),
          (t.useTransition = function () {
            return R.current.useTransition();
          }),
          (t.version = '18.3.1');
      },
      43: (e, t, n) => {
        e.exports = n(202);
      },
      579: (e, t, n) => {
        e.exports = n(153);
      },
      234: (e, t) => {
        function n(e, t) {
          var n = e.length;
          e.push(t);
          e: for (; 0 < n; ) {
            var r = (n - 1) >>> 1,
              i = e[r];
            if (!(0 < o(i, t))) break e;
            (e[r] = t), (e[n] = i), (n = r);
          }
        }
        function r(e) {
          return 0 === e.length ? null : e[0];
        }
        function i(e) {
          if (0 === e.length) return null;
          var t = e[0],
            n = e.pop();
          if (n !== t) {
            e[0] = n;
            e: for (var r = 0, i = e.length, a = i >>> 1; r < a; ) {
              var s = 2 * (r + 1) - 1,
                l = e[s],
                u = s + 1,
                c = e[u];
              if (0 > o(l, n))
                u < i && 0 > o(c, l)
                  ? ((e[r] = c), (e[u] = n), (r = u))
                  : ((e[r] = l), (e[s] = n), (r = s));
              else {
                if (!(u < i && 0 > o(c, n))) break e;
                (e[r] = c), (e[u] = n), (r = u);
              }
            }
          }
          return t;
        }
        function o(e, t) {
          var n = e.sortIndex - t.sortIndex;
          return 0 !== n ? n : e.id - t.id;
        }
        if (
          'object' === typeof performance &&
          'function' === typeof performance.now
        ) {
          var a = performance;
          t.unstable_now = function () {
            return a.now();
          };
        } else {
          var s = Date,
            l = s.now();
          t.unstable_now = function () {
            return s.now() - l;
          };
        }
        var u = [],
          c = [],
          d = 1,
          h = null,
          f = 3,
          p = !1,
          m = !1,
          g = !1,
          v = 'function' === typeof setTimeout ? setTimeout : null,
          y = 'function' === typeof clearTimeout ? clearTimeout : null,
          A = 'undefined' !== typeof setImmediate ? setImmediate : null;
        function b(e) {
          for (var t = r(c); null !== t; ) {
            if (null === t.callback) i(c);
            else {
              if (!(t.startTime <= e)) break;
              i(c), (t.sortIndex = t.expirationTime), n(u, t);
            }
            t = r(c);
          }
        }
        function x(e) {
          if (((g = !1), b(e), !m))
            if (null !== r(u)) (m = !0), j(w);
            else {
              var t = r(c);
              null !== t && L(x, t.startTime - e);
            }
        }
        function w(e, n) {
          (m = !1), g && ((g = !1), y(P), (P = -1)), (p = !0);
          var o = f;
          try {
            for (
              b(n), h = r(u);
              null !== h && (!(h.expirationTime > n) || (e && !F()));

            ) {
              var a = h.callback;
              if ('function' === typeof a) {
                (h.callback = null), (f = h.priorityLevel);
                var s = a(h.expirationTime <= n);
                (n = t.unstable_now()),
                  'function' === typeof s
                    ? (h.callback = s)
                    : h === r(u) && i(u),
                  b(n);
              } else i(u);
              h = r(u);
            }
            if (null !== h) var l = !0;
            else {
              var d = r(c);
              null !== d && L(x, d.startTime - n), (l = !1);
            }
            return l;
          } finally {
            (h = null), (f = o), (p = !1);
          }
        }
        'undefined' !== typeof navigator &&
          void 0 !== navigator.scheduling &&
          void 0 !== navigator.scheduling.isInputPending &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        var S,
          k = !1,
          E = null,
          P = -1,
          C = 5,
          T = -1;
        function F() {
          return !(t.unstable_now() - T < C);
        }
        function D() {
          if (null !== E) {
            var e = t.unstable_now();
            T = e;
            var n = !0;
            try {
              n = E(!0, e);
            } finally {
              n ? S() : ((k = !1), (E = null));
            }
          } else k = !1;
        }
        if ('function' === typeof A)
          S = function () {
            A(D);
          };
        else if ('undefined' !== typeof MessageChannel) {
          var M = new MessageChannel(),
            R = M.port2;
          (M.port1.onmessage = D),
            (S = function () {
              R.postMessage(null);
            });
        } else
          S = function () {
            v(D, 0);
          };
        function j(e) {
          (E = e), k || ((k = !0), S());
        }
        function L(e, n) {
          P = v(function () {
            e(t.unstable_now());
          }, n);
        }
        (t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (e) {
            e.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            m || p || ((m = !0), j(w));
          }),
          (t.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (C = 0 < e ? Math.floor(1e3 / e) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return f;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return r(u);
          }),
          (t.unstable_next = function (e) {
            switch (f) {
              case 1:
              case 2:
              case 3:
                var t = 3;
                break;
              default:
                t = f;
            }
            var n = f;
            f = t;
            try {
              return e();
            } finally {
              f = n;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                e = 3;
            }
            var n = f;
            f = e;
            try {
              return t();
            } finally {
              f = n;
            }
          }),
          (t.unstable_scheduleCallback = function (e, i, o) {
            var a = t.unstable_now();
            switch (
              ('object' === typeof o && null !== o
                ? (o = 'number' === typeof (o = o.delay) && 0 < o ? a + o : a)
                : (o = a),
              e)
            ) {
              case 1:
                var s = -1;
                break;
              case 2:
                s = 250;
                break;
              case 5:
                s = 1073741823;
                break;
              case 4:
                s = 1e4;
                break;
              default:
                s = 5e3;
            }
            return (
              (e = {
                id: d++,
                callback: i,
                priorityLevel: e,
                startTime: o,
                expirationTime: (s = o + s),
                sortIndex: -1,
              }),
              o > a
                ? ((e.sortIndex = o),
                  n(c, e),
                  null === r(u) &&
                    e === r(c) &&
                    (g ? (y(P), (P = -1)) : (g = !0), L(x, o - a)))
                : ((e.sortIndex = s), n(u, e), m || p || ((m = !0), j(w))),
              e
            );
          }),
          (t.unstable_shouldYield = F),
          (t.unstable_wrapCallback = function (e) {
            var t = f;
            return function () {
              var n = f;
              f = t;
              try {
                return e.apply(this, arguments);
              } finally {
                f = n;
              }
            };
          });
      },
      853: (e, t, n) => {
        e.exports = n(234);
      },
    },
    t = {};
  function n(r) {
    var i = t[r];
    if (void 0 !== i) return i.exports;
    var o = (t[r] = { exports: {} });
    return e[r](o, o.exports, n), o.exports;
  }
  (n.m = e),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.f = {}),
    (n.e = (e) =>
      Promise.all(Object.keys(n.f).reduce((t, r) => (n.f[r](e, t), t), []))),
    (n.u = (e) => 'static/js/' + e + '.5ae43190.chunk.js'),
    (n.miniCssF = (e) => {}),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = {},
        t = 'tensor-agri-web-application:';
      n.l = (r, i, o, a) => {
        if (e[r]) e[r].push(i);
        else {
          var s, l;
          if (void 0 !== o)
            for (
              var u = document.getElementsByTagName('script'), c = 0;
              c < u.length;
              c++
            ) {
              var d = u[c];
              if (
                d.getAttribute('src') == r ||
                d.getAttribute('data-webpack') == t + o
              ) {
                s = d;
                break;
              }
            }
          s ||
            ((l = !0),
            ((s = document.createElement('script')).charset = 'utf-8'),
            (s.timeout = 120),
            n.nc && s.setAttribute('nonce', n.nc),
            s.setAttribute('data-webpack', t + o),
            (s.src = r)),
            (e[r] = [i]);
          var h = (t, n) => {
              (s.onerror = s.onload = null), clearTimeout(f);
              var i = e[r];
              if (
                (delete e[r],
                s.parentNode && s.parentNode.removeChild(s),
                i && i.forEach((e) => e(n)),
                t)
              )
                return t(n);
            },
            f = setTimeout(
              h.bind(null, void 0, { type: 'timeout', target: s }),
              12e4
            );
          (s.onerror = h.bind(null, s.onerror)),
            (s.onload = h.bind(null, s.onload)),
            l && document.head.appendChild(s);
        }
      };
    })(),
    (n.r = (e) => {
      'undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.p = '/'),
    (() => {
      var e = { 792: 0 };
      n.f.j = (t, r) => {
        var i = n.o(e, t) ? e[t] : void 0;
        if (0 !== i)
          if (i) r.push(i[2]);
          else {
            var o = new Promise((n, r) => (i = e[t] = [n, r]));
            r.push((i[2] = o));
            var a = n.p + n.u(t),
              s = new Error();
            n.l(
              a,
              (r) => {
                if (n.o(e, t) && (0 !== (i = e[t]) && (e[t] = void 0), i)) {
                  var o = r && ('load' === r.type ? 'missing' : r.type),
                    a = r && r.target && r.target.src;
                  (s.message =
                    'Loading chunk ' + t + ' failed.\n(' + o + ': ' + a + ')'),
                    (s.name = 'ChunkLoadError'),
                    (s.type = o),
                    (s.request = a),
                    i[1](s);
                }
              },
              'chunk-' + t,
              t
            );
          }
      };
      var t = (t, r) => {
          var i,
            o,
            a = r[0],
            s = r[1],
            l = r[2],
            u = 0;
          if (a.some((t) => 0 !== e[t])) {
            for (i in s) n.o(s, i) && (n.m[i] = s[i]);
            if (l) l(n);
          }
          for (t && t(r); u < a.length; u++)
            (o = a[u]), n.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
        },
        r = (self.webpackChunktensor_agri_web_application =
          self.webpackChunktensor_agri_web_application || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var r = n(43),
    i = n(391);
  function o(e) {
    return (
      (o =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            }),
      o(e)
    );
  }
  function a(e) {
    var t = (function (e, t) {
      if ('object' != o(e) || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var r = n.call(e, t || 'default');
        if ('object' != o(r)) return r;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return ('string' === t ? String : Number)(e);
    })(e, 'string');
    return 'symbol' == o(t) ? t : t + '';
  }
  function s(e, t, n) {
    return (
      (t = a(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function l(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function u(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? l(Object(n), !0).forEach(function (t) {
            s(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : l(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
    }
    return e;
  }
  function c(e, t) {
    if (null == e) return {};
    var n,
      r,
      i = (function (e, t) {
        if (null == e) return {};
        var n = {};
        for (var r in e)
          if ({}.hasOwnProperty.call(e, r)) {
            if (t.includes(r)) continue;
            n[r] = e[r];
          }
        return n;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (r = 0; r < o.length; r++)
        (n = o[r]),
          t.includes(n) ||
            ({}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]));
    }
    return i;
  }
  n(175);
  const d = ['page'],
    h = ['page', 'matches'],
    f = [
      'onClick',
      'discover',
      'prefetch',
      'relative',
      'reloadDocument',
      'replace',
      'state',
      'target',
      'to',
      'preventScrollReset',
      'viewTransition',
    ],
    p = [
      'aria-current',
      'caseSensitive',
      'className',
      'end',
      'style',
      'to',
      'viewTransition',
      'children',
    ],
    m = [
      'discover',
      'fetcherKey',
      'navigate',
      'reloadDocument',
      'replace',
      'state',
      'method',
      'action',
      'onSubmit',
      'relative',
      'preventScrollReset',
      'viewTransition',
    ];
  var g = 'popstate';
  function v() {
    return k(
      function (e, t) {
        let { pathname: n, search: r, hash: i } = e.location;
        return x(
          '',
          { pathname: n, search: r, hash: i },
          (t.state && t.state.usr) || null,
          (t.state && t.state.key) || 'default'
        );
      },
      function (e, t) {
        return 'string' === typeof t ? t : w(t);
      },
      null,
      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    );
  }
  function y(e, t) {
    if (!1 === e || null === e || 'undefined' === typeof e) throw new Error(t);
  }
  function A(e, t) {
    if (!e) {
      'undefined' !== typeof console && console.warn(t);
      try {
        throw new Error(t);
      } catch (n) {}
    }
  }
  function b(e, t) {
    return { usr: e.state, key: e.key, idx: t };
  }
  function x(e, t) {
    let n =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
      r = arguments.length > 3 ? arguments[3] : void 0;
    return u(
      u(
        {
          pathname: 'string' === typeof e ? e : e.pathname,
          search: '',
          hash: '',
        },
        'string' === typeof t ? S(t) : t
      ),
      {},
      {
        state: n,
        key: (t && t.key) || r || Math.random().toString(36).substring(2, 10),
      }
    );
  }
  function w(e) {
    let { pathname: t = '/', search: n = '', hash: r = '' } = e;
    return (
      n && '?' !== n && (t += '?' === n.charAt(0) ? n : '?' + n),
      r && '#' !== r && (t += '#' === r.charAt(0) ? r : '#' + r),
      t
    );
  }
  function S(e) {
    let t = {};
    if (e) {
      let n = e.indexOf('#');
      n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
      let r = e.indexOf('?');
      r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
        e && (t.pathname = e);
    }
    return t;
  }
  function k(e, t, n) {
    let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
      { window: i = document.defaultView, v5Compat: o = !1 } = r,
      a = i.history,
      s = 'POP',
      l = null,
      c = d();
    function d() {
      return (a.state || { idx: null }).idx;
    }
    function h() {
      s = 'POP';
      let e = d(),
        t = null == e ? null : e - c;
      (c = e), l && l({ action: s, location: p.location, delta: t });
    }
    function f(e) {
      let t =
          'null' !== i.location.origin ? i.location.origin : i.location.href,
        n = 'string' === typeof e ? e : w(e);
      return (
        (n = n.replace(/ $/, '%20')),
        y(
          t,
          'No window.location.(origin|href) available to create URL for href: '.concat(
            n
          )
        ),
        new URL(n, t)
      );
    }
    null == c &&
      ((c = 0), a.replaceState(u(u({}, a.state), {}, { idx: c }), ''));
    let p = {
      get action() {
        return s;
      },
      get location() {
        return e(i, a);
      },
      listen(e) {
        if (l) throw new Error('A history only accepts one active listener');
        return (
          i.addEventListener(g, h),
          (l = e),
          () => {
            i.removeEventListener(g, h), (l = null);
          }
        );
      },
      createHref: (e) => t(i, e),
      createURL: f,
      encodeLocation(e) {
        let t = f(e);
        return { pathname: t.pathname, search: t.search, hash: t.hash };
      },
      push: function (e, t) {
        s = 'PUSH';
        let r = x(p.location, e, t);
        n && n(r, e), (c = d() + 1);
        let u = b(r, c),
          h = p.createHref(r);
        try {
          a.pushState(u, '', h);
        } catch (f) {
          if (f instanceof DOMException && 'DataCloneError' === f.name) throw f;
          i.location.assign(h);
        }
        o && l && l({ action: s, location: p.location, delta: 1 });
      },
      replace: function (e, t) {
        s = 'REPLACE';
        let r = x(p.location, e, t);
        n && n(r, e), (c = d());
        let i = b(r, c),
          u = p.createHref(r);
        a.replaceState(i, '', u),
          o && l && l({ action: s, location: p.location, delta: 0 });
      },
      go: (e) => a.go(e),
    };
    return p;
  }
  var E = new Set(['lazy', 'caseSensitive', 'path', 'id', 'index', 'children']);
  function P(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
      r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    return e.map((e, i) => {
      let o = [...n, String(i)],
        a = 'string' === typeof e.id ? e.id : o.join('-');
      if (
        (y(
          !0 !== e.index || !e.children,
          'Cannot specify children on an index route'
        ),
        y(
          !r[a],
          'Found a route id collision on id "'.concat(
            a,
            '".  Route id\'s must be globally unique within Data Router usages'
          )
        ),
        (function (e) {
          return !0 === e.index;
        })(e))
      ) {
        let n = u(u(u({}, e), t(e)), {}, { id: a });
        return (r[a] = n), n;
      }
      {
        let n = u(u(u({}, e), t(e)), {}, { id: a, children: void 0 });
        return (
          (r[a] = n), e.children && (n.children = P(e.children, t, o, r)), n
        );
      }
    });
  }
  function C(e, t) {
    return T(
      e,
      t,
      arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '/',
      !1
    );
  }
  function T(e, t, n, r) {
    let i = _(('string' === typeof t ? S(t) : t).pathname || '/', n);
    if (null == i) return null;
    let o = D(e);
    !(function (e) {
      e.sort((e, t) =>
        e.score !== t.score
          ? t.score - e.score
          : (function (e, t) {
              let n =
                e.length === t.length &&
                e.slice(0, -1).every((e, n) => e === t[n]);
              return n ? e[e.length - 1] - t[t.length - 1] : 0;
            })(
              e.routesMeta.map((e) => e.childrenIndex),
              t.routesMeta.map((e) => e.childrenIndex)
            )
      );
    })(o);
    let a = null;
    for (let s = 0; null == a && s < o.length; ++s) {
      let e = Z(i);
      a = I(o[s], e, r);
    }
    return a;
  }
  function F(e, t) {
    let { route: n, pathname: r, params: i } = e;
    return {
      id: n.id,
      pathname: r,
      params: i,
      data: t[n.id],
      handle: n.handle,
    };
  }
  function D(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
      r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '',
      i = (e, i, o) => {
        let a = {
          relativePath: void 0 === o ? e.path || '' : o,
          caseSensitive: !0 === e.caseSensitive,
          childrenIndex: i,
          route: e,
        };
        a.relativePath.startsWith('/') &&
          (y(
            a.relativePath.startsWith(r),
            'Absolute route path "'
              .concat(a.relativePath, '" nested under path "')
              .concat(
                r,
                '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'
              )
          ),
          (a.relativePath = a.relativePath.slice(r.length)));
        let s = X([r, a.relativePath]),
          l = n.concat(a);
        e.children &&
          e.children.length > 0 &&
          (y(
            !0 !== e.index,
            'Index routes must not have child routes. Please remove all child routes from route path "'.concat(
              s,
              '".'
            )
          ),
          D(e.children, t, l, s)),
          (null != e.path || e.index) &&
            t.push({ path: s, score: O(s, e.index), routesMeta: l });
      };
    return (
      e.forEach((e, t) => {
        var n;
        if (
          '' !== e.path &&
          null !== (n = e.path) &&
          void 0 !== n &&
          n.includes('?')
        )
          for (let r of M(e.path)) i(e, t, r);
        else i(e, t);
      }),
      t
    );
  }
  function M(e) {
    let t = e.split('/');
    if (0 === t.length) return [];
    let [n, ...r] = t,
      i = n.endsWith('?'),
      o = n.replace(/\?$/, '');
    if (0 === r.length) return i ? [o, ''] : [o];
    let a = M(r.join('/')),
      s = [];
    return (
      s.push(...a.map((e) => ('' === e ? o : [o, e].join('/')))),
      i && s.push(...a),
      s.map((t) => (e.startsWith('/') && '' === t ? '/' : t))
    );
  }
  var R = /^:[\w-]+$/,
    j = 3,
    L = 2,
    z = 1,
    N = 10,
    B = -2,
    V = (e) => '*' === e;
  function O(e, t) {
    let n = e.split('/'),
      r = n.length;
    return (
      n.some(V) && (r += B),
      t && (r += L),
      n
        .filter((e) => !V(e))
        .reduce((e, t) => e + (R.test(t) ? j : '' === t ? z : N), r)
    );
  }
  function I(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      { routesMeta: r } = e,
      i = {},
      o = '/',
      a = [];
    for (let s = 0; s < r.length; ++s) {
      let e = r[s],
        l = s === r.length - 1,
        u = '/' === o ? t : t.slice(o.length) || '/',
        c = U(
          { path: e.relativePath, caseSensitive: e.caseSensitive, end: l },
          u
        ),
        d = e.route;
      if (
        (!c &&
          l &&
          n &&
          !r[r.length - 1].route.index &&
          (c = U(
            { path: e.relativePath, caseSensitive: e.caseSensitive, end: !1 },
            u
          )),
        !c)
      )
        return null;
      Object.assign(i, c.params),
        a.push({
          params: i,
          pathname: X([o, c.pathname]),
          pathnameBase: Q(X([o, c.pathnameBase])),
          route: d,
        }),
        '/' !== c.pathnameBase && (o = X([o, c.pathnameBase]));
    }
    return a;
  }
  function U(e, t) {
    'string' === typeof e && (e = { path: e, caseSensitive: !1, end: !0 });
    let [n, r] = (function (e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n =
            !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        A(
          '*' === e || !e.endsWith('*') || e.endsWith('/*'),
          'Route path "'
            .concat(e, '" will be treated as if it were "')
            .concat(
              e.replace(/\*$/, '/*'),
              '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'
            )
            .concat(e.replace(/\*$/, '/*'), '".')
        );
        let r = [],
          i =
            '^' +
            e
              .replace(/\/*\*?$/, '')
              .replace(/^\/*/, '/')
              .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
              .replace(
                /\/:([\w-]+)(\?)?/g,
                (e, t, n) => (
                  r.push({ paramName: t, isOptional: null != n }),
                  n ? '/?([^\\/]+)?' : '/([^\\/]+)'
                )
              );
        e.endsWith('*')
          ? (r.push({ paramName: '*' }),
            (i += '*' === e || '/*' === e ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
          : n
            ? (i += '\\/*$')
            : '' !== e && '/' !== e && (i += '(?:(?=\\/|$))');
        let o = new RegExp(i, t ? void 0 : 'i');
        return [o, r];
      })(e.path, e.caseSensitive, e.end),
      i = t.match(n);
    if (!i) return null;
    let o = i[0],
      a = o.replace(/(.)\/+$/, '$1'),
      s = i.slice(1);
    return {
      params: r.reduce((e, t, n) => {
        let { paramName: r, isOptional: i } = t;
        if ('*' === r) {
          let e = s[n] || '';
          a = o.slice(0, o.length - e.length).replace(/(.)\/+$/, '$1');
        }
        const l = s[n];
        return (e[r] = i && !l ? void 0 : (l || '').replace(/%2F/g, '/')), e;
      }, {}),
      pathname: o,
      pathnameBase: a,
      pattern: e,
    };
  }
  function Z(e) {
    try {
      return e
        .split('/')
        .map((e) => decodeURIComponent(e).replace(/\//g, '%2F'))
        .join('/');
    } catch (t) {
      return (
        A(
          !1,
          'The URL path "'
            .concat(
              e,
              '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('
            )
            .concat(t, ').')
        ),
        e
      );
    }
  }
  function _(e, t) {
    if ('/' === t) return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith('/') ? t.length - 1 : t.length,
      r = e.charAt(n);
    return r && '/' !== r ? null : e.slice(n) || '/';
  }
  function W(e, t, n, r) {
    return "Cannot include a '"
      .concat(e, "' character in a manually specified `to.")
      .concat(t, '` field [')
      .concat(JSON.stringify(r), '].  Please separate it out to the `to.')
      .concat(
        n,
        '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
      );
  }
  function H(e) {
    return e.filter(
      (e, t) => 0 === t || (e.route.path && e.route.path.length > 0)
    );
  }
  function J(e) {
    let t = H(e);
    return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase));
  }
  function Y(e, t, n) {
    let r,
      i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
    'string' === typeof e
      ? (r = S(e))
      : ((r = u({}, e)),
        y(
          !r.pathname || !r.pathname.includes('?'),
          W('?', 'pathname', 'search', r)
        ),
        y(
          !r.pathname || !r.pathname.includes('#'),
          W('#', 'pathname', 'hash', r)
        ),
        y(!r.search || !r.search.includes('#'), W('#', 'search', 'hash', r)));
    let o,
      a = '' === e || '' === r.pathname,
      s = a ? '/' : r.pathname;
    if (null == s) o = n;
    else {
      let e = t.length - 1;
      if (!i && s.startsWith('..')) {
        let t = s.split('/');
        for (; '..' === t[0]; ) t.shift(), (e -= 1);
        r.pathname = t.join('/');
      }
      o = e >= 0 ? t[e] : '/';
    }
    let l = (function (e) {
        let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : '/',
          {
            pathname: n,
            search: r = '',
            hash: i = '',
          } = 'string' === typeof e ? S(e) : e,
          o = n
            ? n.startsWith('/')
              ? n
              : (function (e, t) {
                  let n = t.replace(/\/+$/, '').split('/');
                  return (
                    e.split('/').forEach((e) => {
                      '..' === e
                        ? n.length > 1 && n.pop()
                        : '.' !== e && n.push(e);
                    }),
                    n.length > 1 ? n.join('/') : '/'
                  );
                })(n, t)
            : t;
        return { pathname: o, search: G(r), hash: K(i) };
      })(r, o),
      c = s && '/' !== s && s.endsWith('/'),
      d = (a || '.' === s) && n.endsWith('/');
    return l.pathname.endsWith('/') || (!c && !d) || (l.pathname += '/'), l;
  }
  var X = (e) => e.join('/').replace(/\/\/+/g, '/'),
    Q = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
    G = (e) => (e && '?' !== e ? (e.startsWith('?') ? e : '?' + e) : ''),
    K = (e) => (e && '#' !== e ? (e.startsWith('#') ? e : '#' + e) : '');
  var q = class {
    constructor(e, t, n) {
      let r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      (this.status = e),
        (this.statusText = t || ''),
        (this.internal = r),
        n instanceof Error
          ? ((this.data = n.toString()), (this.error = n))
          : (this.data = n);
    }
  };
  function $(e) {
    return (
      null != e &&
      'number' === typeof e.status &&
      'string' === typeof e.statusText &&
      'boolean' === typeof e.internal &&
      'data' in e
    );
  }
  var ee = ['POST', 'PUT', 'PATCH', 'DELETE'],
    te = new Set(ee),
    ne = ['GET', ...ee],
    re = new Set(ne),
    ie = new Set([301, 302, 303, 307, 308]),
    oe = new Set([307, 308]),
    ae = {
      state: 'idle',
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
    },
    se = {
      state: 'idle',
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
    },
    le = {
      state: 'unblocked',
      proceed: void 0,
      reset: void 0,
      location: void 0,
    },
    ue = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    ce = (e) => ({ hasErrorBoundary: Boolean(e.hasErrorBoundary) }),
    de = 'remix-router-transitions',
    he = Symbol('ResetLoaderData');
  function fe(e) {
    const t = e.window
        ? e.window
        : 'undefined' !== typeof window
          ? window
          : void 0,
      n =
        'undefined' !== typeof t &&
        'undefined' !== typeof t.document &&
        'undefined' !== typeof t.document.createElement;
    y(
      e.routes.length > 0,
      'You must provide a non-empty routes array to createRouter'
    );
    let r,
      i,
      o,
      a = e.mapRouteProperties || ce,
      s = {},
      l = P(e.routes, a, void 0, s),
      c = e.basename || '/',
      d = e.dataStrategy || Se,
      h = e.patchRoutesOnNavigation,
      f = u({}, e.future),
      p = null,
      m = new Set(),
      g = null,
      v = null,
      b = null,
      w = null != e.hydrationData,
      S = C(l, e.history.location, c),
      k = null;
    if (null == S && !h) {
      let t = Be(404, { pathname: e.history.location.pathname }),
        { matches: n, route: r } = Ne(l);
      (S = n), (k = { [r.id]: t });
    }
    if (S && !e.hydrationData) {
      et(S, l, e.history.location.pathname).active && (S = null);
    }
    if (S)
      if (S.some((e) => e.route.lazy)) i = !1;
      else if (S.some((e) => e.route.loader)) {
        let t = e.hydrationData ? e.hydrationData.loaderData : null,
          n = e.hydrationData ? e.hydrationData.errors : null;
        if (n) {
          let e = S.findIndex((e) => void 0 !== n[e.route.id]);
          i = S.slice(0, e + 1).every((e) => !ye(e.route, t, n));
        } else i = S.every((e) => !ye(e.route, t, n));
      } else i = !0;
    else {
      (i = !1), (S = []);
      let t = et(null, l, e.history.location.pathname);
      t.active && t.matches && (S = t.matches);
    }
    let E,
      D,
      M = {
        historyAction: e.history.action,
        location: e.history.location,
        matches: S,
        initialized: i,
        navigation: ae,
        restoreScrollPosition: null == e.hydrationData && null,
        preventScrollReset: !1,
        revalidation: 'idle',
        loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
        actionData: (e.hydrationData && e.hydrationData.actionData) || null,
        errors: (e.hydrationData && e.hydrationData.errors) || k,
        fetchers: new Map(),
        blockers: new Map(),
      },
      R = 'POP',
      j = !1,
      L = !1,
      z = new Map(),
      N = null,
      B = !1,
      V = !1,
      O = new Set(),
      I = new Map(),
      U = 0,
      Z = -1,
      W = new Map(),
      H = new Set(),
      J = new Map(),
      Y = new Map(),
      X = new Set(),
      Q = new Map(),
      G = null;
    function K(e) {
      let t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      M = u(u({}, M), e);
      let n = [],
        r = [];
      M.fetchers.forEach((e, t) => {
        'idle' === e.state && (X.has(t) ? n.push(t) : r.push(t));
      }),
        [...m].forEach((e) =>
          e(M, {
            deletedFetchers: n,
            viewTransitionOpts: t.viewTransitionOpts,
            flushSync: !0 === t.flushSync,
          })
        ),
        n.forEach((e) => be(e)),
        r.forEach((e) => M.fetchers.delete(e));
    }
    function q(t, n) {
      var i, o, a;
      let s,
        { flushSync: c } =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        d =
          null != M.actionData &&
          null != M.navigation.formMethod &&
          Je(M.navigation.formMethod) &&
          'loading' === M.navigation.state &&
          !0 !==
            (null === (i = t.state) || void 0 === i ? void 0 : i._isRedirect);
      s = n.actionData
        ? Object.keys(n.actionData).length > 0
          ? n.actionData
          : null
        : d
          ? M.actionData
          : null;
      let h = n.loaderData
          ? je(M.loaderData, n.loaderData, n.matches || [], n.errors)
          : M.loaderData,
        f = M.blockers;
      f.size > 0 && ((f = new Map(f)), f.forEach((e, t) => f.set(t, le)));
      let p,
        m =
          !0 === j ||
          (null != M.navigation.formMethod &&
            Je(M.navigation.formMethod) &&
            !0 !==
              (null === (o = t.state) || void 0 === o
                ? void 0
                : o._isRedirect));
      if (
        (r && ((l = r), (r = void 0)),
        B ||
          'POP' === R ||
          ('PUSH' === R
            ? e.history.push(t, t.state)
            : 'REPLACE' === R && e.history.replace(t, t.state)),
        'POP' === R)
      ) {
        let e = z.get(M.location.pathname);
        e && e.has(t.pathname)
          ? (p = { currentLocation: M.location, nextLocation: t })
          : z.has(t.pathname) &&
            (p = { currentLocation: t, nextLocation: M.location });
      } else if (L) {
        let e = z.get(M.location.pathname);
        e
          ? e.add(t.pathname)
          : ((e = new Set([t.pathname])), z.set(M.location.pathname, e)),
          (p = { currentLocation: M.location, nextLocation: t });
      }
      K(
        u(
          u({}, n),
          {},
          {
            actionData: s,
            loaderData: h,
            historyAction: R,
            location: t,
            initialized: !0,
            navigation: ae,
            revalidation: 'idle',
            restoreScrollPosition: $e(t, n.matches || M.matches),
            preventScrollReset: m,
            blockers: f,
          }
        ),
        { viewTransitionOpts: p, flushSync: !0 === c }
      ),
        (R = 'POP'),
        (j = !1),
        (L = !1),
        (B = !1),
        (V = !1),
        null === (a = G) || void 0 === a || a.resolve(),
        (G = null);
    }
    async function ee(t, n, i) {
      E && E.abort(),
        (E = null),
        (R = t),
        (B = !0 === (i && i.startUninterruptedRevalidation)),
        (function (e, t) {
          if (g && b) {
            let n = Ye(e, t);
            g[n] = b();
          }
        })(M.location, M.matches),
        (j = !0 === (i && i.preventScrollReset)),
        (L = !0 === (i && i.enableViewTransition));
      let o = r || l,
        a = i && i.overrideNavigation,
        s = C(o, n, c),
        d = !0 === (i && i.flushSync),
        h = et(s, o, n.pathname);
      if ((h.active && h.matches && (s = h.matches), !s)) {
        let { error: e, notFoundMatches: t, route: r } = He(n.pathname);
        return void q(
          n,
          { matches: t, loaderData: {}, errors: { [r.id]: e } },
          { flushSync: d }
        );
      }
      if (
        M.initialized &&
        !V &&
        (function (e, t) {
          if (e.pathname !== t.pathname || e.search !== t.search) return !1;
          if ('' === e.hash) return '' !== t.hash;
          if (e.hash === t.hash) return !0;
          if ('' !== t.hash) return !0;
          return !1;
        })(M.location, n) &&
        !(i && i.submission && Je(i.submission.formMethod))
      )
        return void q(n, { matches: s }, { flushSync: d });
      E = new AbortController();
      let f,
        p = Te(e.history, n, E.signal, i && i.submission);
      if (i && i.pendingError)
        f = [ze(s).route.id, { type: 'error', error: i.pendingError }];
      else if (i && i.submission && Je(i.submission.formMethod)) {
        let t = await (async function (e, t, n, r, i) {
          let o =
            arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
          he();
          let a,
            s = (function (e, t) {
              let n = {
                state: 'submitting',
                location: e,
                formMethod: t.formMethod,
                formAction: t.formAction,
                formEncType: t.formEncType,
                formData: t.formData,
                json: t.json,
                text: t.text,
              };
              return n;
            })(t, n);
          if ((K({ navigation: s }, { flushSync: !0 === o.flushSync }), i)) {
            let n = await tt(r, t.pathname, e.signal);
            if ('aborted' === n.type) return { shortCircuited: !0 };
            if ('error' === n.type) {
              let e = ze(n.partialMatches).route.id;
              return {
                matches: n.partialMatches,
                pendingActionResult: [e, { type: 'error', error: n.error }],
              };
            }
            if (!n.matches) {
              let { notFoundMatches: e, error: n, route: r } = He(t.pathname);
              return {
                matches: e,
                pendingActionResult: [r.id, { type: 'error', error: n }],
              };
            }
            r = n.matches;
          }
          let l = Xe(r, t);
          if (l.route.action || l.route.lazy) {
            if (
              ((a = (await re('action', M, e, [l], r, null))[l.route.id]),
              e.signal.aborted)
            )
              return { shortCircuited: !0 };
          } else
            a = {
              type: 'error',
              error: Be(405, {
                method: e.method,
                pathname: t.pathname,
                routeId: l.route.id,
              }),
            };
          if (Ze(a)) {
            let t;
            if (o && null != o.replace) t = o.replace;
            else {
              t =
                Ce(a.response.headers.get('Location'), new URL(e.url), c) ===
                M.location.pathname + M.location.search;
            }
            return (
              await ne(e, a, !0, { submission: n, replace: t }),
              { shortCircuited: !0 }
            );
          }
          if (Ue(a)) {
            let e = ze(r, l.route.id);
            return (
              !0 !== (o && o.replace) && (R = 'PUSH'),
              { matches: r, pendingActionResult: [e.route.id, a] }
            );
          }
          return { matches: r, pendingActionResult: [l.route.id, a] };
        })(p, n, i.submission, s, h.active, {
          replace: i.replace,
          flushSync: d,
        });
        if (t.shortCircuited) return;
        if (t.pendingActionResult) {
          let [e, r] = t.pendingActionResult;
          if (Ue(r) && $(r.error) && 404 === r.error.status)
            return (
              (E = null),
              void q(n, {
                matches: t.matches,
                loaderData: {},
                errors: { [e]: r.error },
              })
            );
        }
        (s = t.matches || s),
          (f = t.pendingActionResult),
          (a = Ge(n, i.submission)),
          (d = !1),
          (h.active = !1),
          (p = Te(e.history, p.url, p.signal));
      }
      let {
        shortCircuited: m,
        matches: v,
        loaderData: y,
        errors: A,
      } = await (async function (t, n, i, o, a, s, d, h, f, p, m) {
        let g = a || Ge(n, s),
          v = s || d || Qe(g),
          y = !B && !f;
        if (o) {
          if (y) {
            let e = te(m);
            K(u({ navigation: g }, void 0 !== e ? { actionData: e } : {}), {
              flushSync: p,
            });
          }
          let e = await tt(i, n.pathname, t.signal);
          if ('aborted' === e.type) return { shortCircuited: !0 };
          if ('error' === e.type) {
            let t = ze(e.partialMatches).route.id;
            return {
              matches: e.partialMatches,
              loaderData: {},
              errors: { [t]: e.error },
            };
          }
          if (!e.matches) {
            let { error: e, notFoundMatches: t, route: r } = He(n.pathname);
            return { matches: t, loaderData: {}, errors: { [r.id]: e } };
          }
          i = e.matches;
        }
        let A = r || l,
          [b, x] = ve(e.history, M, i, v, n, !0 === f, V, O, X, J, H, A, c, m);
        if (((Z = ++U), 0 === b.length && 0 === x.length)) {
          let e = De();
          return (
            q(
              n,
              u(
                u(
                  {
                    matches: i,
                    loaderData: {},
                    errors: m && Ue(m[1]) ? { [m[0]]: m[1].error } : null,
                  },
                  Le(m)
                ),
                e ? { fetchers: new Map(M.fetchers) } : {}
              ),
              { flushSync: p }
            ),
            { shortCircuited: !0 }
          );
        }
        if (y) {
          let e = {};
          if (!o) {
            e.navigation = g;
            let t = te(m);
            void 0 !== t && (e.actionData = t);
          }
          x.length > 0 &&
            (e.fetchers = (function (e) {
              return (
                e.forEach((e) => {
                  let t = M.fetchers.get(e.key),
                    n = Ke(void 0, t ? t.data : void 0);
                  M.fetchers.set(e.key, n);
                }),
                new Map(M.fetchers)
              );
            })(x)),
            K(e, { flushSync: p });
        }
        x.forEach((e) => {
          we(e.key), e.controller && I.set(e.key, e.controller);
        });
        let w = () => x.forEach((e) => we(e.key));
        E && E.signal.addEventListener('abort', w);
        let { loaderResults: S, fetcherResults: k } = await ie(M, i, b, x, t);
        if (t.signal.aborted) return { shortCircuited: !0 };
        E && E.signal.removeEventListener('abort', w);
        x.forEach((e) => I.delete(e.key));
        let P = Ve(S);
        if (P)
          return (
            await ne(t, P.result, !0, { replace: h }), { shortCircuited: !0 }
          );
        if (((P = Ve(k)), P))
          return (
            H.add(P.key),
            await ne(t, P.result, !0, { replace: h }),
            { shortCircuited: !0 }
          );
        let { loaderData: C, errors: T } = Re(M, i, S, m, x, k);
        f && M.errors && (T = u(u({}, M.errors), T));
        let F = De(),
          D = Me(Z),
          R = F || D || x.length > 0;
        return u(
          { matches: i, loaderData: C, errors: T },
          R ? { fetchers: new Map(M.fetchers) } : {}
        );
      })(
        p,
        n,
        s,
        h.active,
        a,
        i && i.submission,
        i && i.fetcherSubmission,
        i && i.replace,
        i && !0 === i.initialHydration,
        d,
        f
      );
      m ||
        ((E = null),
        q(
          n,
          u(u({ matches: v || s }, Le(f)), {}, { loaderData: y, errors: A })
        ));
    }
    function te(e) {
      return e && !Ue(e[1])
        ? { [e[0]]: e[1].data }
        : M.actionData
          ? 0 === Object.keys(M.actionData).length
            ? null
            : M.actionData
          : void 0;
    }
    async function ne(r, i, o) {
      let {
        submission: a,
        fetcherSubmission: s,
        preventScrollReset: l,
        replace: d,
      } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      i.response.headers.has('X-Remix-Revalidate') && (V = !0);
      let h = i.response.headers.get('Location');
      y(h, 'Expected a Location header on the redirect Response'),
        (h = Ce(h, new URL(r.url), c));
      let f = x(M.location, h, { _isRedirect: !0 });
      if (n) {
        let n = !1;
        if (i.response.headers.has('X-Remix-Reload-Document')) n = !0;
        else if (ue.test(h)) {
          const r = e.history.createURL(h);
          n = r.origin !== t.location.origin || null == _(r.pathname, c);
        }
        if (n) return void (d ? t.location.replace(h) : t.location.assign(h));
      }
      E = null;
      let p =
          !0 === d || i.response.headers.has('X-Remix-Replace')
            ? 'REPLACE'
            : 'PUSH',
        { formMethod: m, formAction: g, formEncType: v } = M.navigation;
      !a && !s && m && g && v && (a = Qe(M.navigation));
      let A = a || s;
      if (oe.has(i.response.status) && A && Je(A.formMethod))
        await ee(p, f, {
          submission: u(u({}, A), {}, { formAction: h }),
          preventScrollReset: l || j,
          enableViewTransition: o ? L : void 0,
        });
      else {
        let e = Ge(f, a);
        await ee(p, f, {
          overrideNavigation: e,
          fetcherSubmission: s,
          preventScrollReset: l || j,
          enableViewTransition: o ? L : void 0,
        });
      }
    }
    async function re(e, t, n, r, i, o) {
      let l,
        u = {};
      try {
        l = await ke(d, e, t, n, r, i, o, s, a);
      } catch (h) {
        return (
          r.forEach((e) => {
            u[e.route.id] = { type: 'error', error: h };
          }),
          u
        );
      }
      for (let [a, s] of Object.entries(l))
        if (Ie(s)) {
          let e = s.result;
          u[a] = { type: 'redirect', response: Pe(e, n, a, i, c) };
        } else u[a] = await Ee(s);
      return u;
    }
    async function ie(t, n, r, i, o) {
      let a = re('loader', t, o, r, n, null),
        s = Promise.all(
          i.map(async (n) => {
            if (n.matches && n.match && n.controller) {
              let r = (
                await re(
                  'loader',
                  t,
                  Te(e.history, n.path, n.controller.signal),
                  [n.match],
                  n.matches,
                  n.key
                )
              )[n.match.route.id];
              return { [n.key]: r };
            }
            return Promise.resolve({
              [n.key]: { type: 'error', error: Be(404, { pathname: n.path }) },
            });
          })
        );
      return {
        loaderResults: await a,
        fetcherResults: (await s).reduce((e, t) => Object.assign(e, t), {}),
      };
    }
    function he() {
      (V = !0),
        J.forEach((e, t) => {
          I.has(t) && O.add(t), we(t);
        });
    }
    function fe(e, t) {
      let n =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      M.fetchers.set(e, t),
        K(
          { fetchers: new Map(M.fetchers) },
          { flushSync: !0 === (n && n.flushSync) }
        );
    }
    function ge(e, t, n) {
      let r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
        i = ze(M.matches, t);
      be(e),
        K(
          { errors: { [i.route.id]: n }, fetchers: new Map(M.fetchers) },
          { flushSync: !0 === (r && r.flushSync) }
        );
    }
    function Ae(e) {
      return (
        Y.set(e, (Y.get(e) || 0) + 1),
        X.has(e) && X.delete(e),
        M.fetchers.get(e) || se
      );
    }
    function be(e) {
      let t = M.fetchers.get(e);
      !I.has(e) || (t && 'loading' === t.state && W.has(e)) || we(e),
        J.delete(e),
        W.delete(e),
        H.delete(e),
        X.delete(e),
        O.delete(e),
        M.fetchers.delete(e);
    }
    function we(e) {
      let t = I.get(e);
      t && (t.abort(), I.delete(e));
    }
    function Fe(e) {
      for (let t of e) {
        let e = qe(Ae(t).data);
        M.fetchers.set(t, e);
      }
    }
    function De() {
      let e = [],
        t = !1;
      for (let n of H) {
        let r = M.fetchers.get(n);
        y(r, 'Expected fetcher: '.concat(n)),
          'loading' === r.state && (H.delete(n), e.push(n), (t = !0));
      }
      return Fe(e), t;
    }
    function Me(e) {
      let t = [];
      for (let [n, r] of W)
        if (r < e) {
          let e = M.fetchers.get(n);
          y(e, 'Expected fetcher: '.concat(n)),
            'loading' === e.state && (we(n), W.delete(n), t.push(n));
        }
      return Fe(t), t.length > 0;
    }
    function Oe(e) {
      M.blockers.delete(e), Q.delete(e);
    }
    function _e(e, t) {
      let n = M.blockers.get(e) || le;
      y(
        ('unblocked' === n.state && 'blocked' === t.state) ||
          ('blocked' === n.state && 'blocked' === t.state) ||
          ('blocked' === n.state && 'proceeding' === t.state) ||
          ('blocked' === n.state && 'unblocked' === t.state) ||
          ('proceeding' === n.state && 'unblocked' === t.state),
        'Invalid blocker state transition: '
          .concat(n.state, ' -> ')
          .concat(t.state)
      );
      let r = new Map(M.blockers);
      r.set(e, t), K({ blockers: r });
    }
    function We(e) {
      let { currentLocation: t, nextLocation: n, historyAction: r } = e;
      if (0 === Q.size) return;
      Q.size > 1 && A(!1, 'A router only supports one blocker at a time');
      let i = Array.from(Q.entries()),
        [o, a] = i[i.length - 1],
        s = M.blockers.get(o);
      return s && 'proceeding' === s.state
        ? void 0
        : a({ currentLocation: t, nextLocation: n, historyAction: r })
          ? o
          : void 0;
    }
    function He(e) {
      let t = Be(404, { pathname: e }),
        n = r || l,
        { matches: i, route: o } = Ne(n);
      return { notFoundMatches: i, route: o, error: t };
    }
    function Ye(e, t) {
      if (v) {
        return (
          v(
            e,
            t.map((e) => F(e, M.loaderData))
          ) || e.key
        );
      }
      return e.key;
    }
    function $e(e, t) {
      if (g) {
        let n = Ye(e, t),
          r = g[n];
        if ('number' === typeof r) return r;
      }
      return null;
    }
    function et(e, t, n) {
      if (h) {
        if (!e) {
          return { active: !0, matches: T(t, n, c, !0) || [] };
        }
        if (Object.keys(e[0].params).length > 0) {
          return { active: !0, matches: T(t, n, c, !0) };
        }
      }
      return { active: !1, matches: null };
    }
    async function tt(e, t, n) {
      if (!h) return { type: 'success', matches: e };
      let i = e;
      for (;;) {
        let e = null == r,
          u = r || l,
          d = s;
        try {
          await h({
            path: t,
            matches: i,
            patch: (e, t) => {
              n.aborted || xe(e, t, u, d, a);
            },
          });
        } catch (o) {
          return { type: 'error', error: o, partialMatches: i };
        } finally {
          e && !n.aborted && (l = [...l]);
        }
        if (n.aborted) return { type: 'aborted' };
        let f = C(u, t, c);
        if (f) return { type: 'success', matches: f };
        let p = T(u, t, c, !0);
        if (
          !p ||
          (i.length === p.length &&
            i.every((e, t) => e.route.id === p[t].route.id))
        )
          return { type: 'success', matches: null };
        i = p;
      }
    }
    return (
      (o = {
        get basename() {
          return c;
        },
        get future() {
          return f;
        },
        get state() {
          return M;
        },
        get routes() {
          return l;
        },
        get window() {
          return t;
        },
        initialize: function () {
          if (
            ((p = e.history.listen((t) => {
              let { action: n, location: r, delta: i } = t;
              if (D) return D(), void (D = void 0);
              A(
                0 === Q.size || null != i,
                'You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.'
              );
              let o = We({
                currentLocation: M.location,
                nextLocation: r,
                historyAction: n,
              });
              if (o && null != i) {
                let t = new Promise((e) => {
                  D = e;
                });
                return (
                  e.history.go(-1 * i),
                  void _e(o, {
                    state: 'blocked',
                    location: r,
                    proceed() {
                      _e(o, {
                        state: 'proceeding',
                        proceed: void 0,
                        reset: void 0,
                        location: r,
                      }),
                        t.then(() => e.history.go(i));
                    },
                    reset() {
                      let e = new Map(M.blockers);
                      e.set(o, le), K({ blockers: e });
                    },
                  })
                );
              }
              return ee(n, r);
            })),
            n)
          ) {
            !(function (e, t) {
              try {
                let n = e.sessionStorage.getItem(de);
                if (n) {
                  let e = JSON.parse(n);
                  for (let [n, r] of Object.entries(e || {}))
                    r && Array.isArray(r) && t.set(n, new Set(r || []));
                }
              } catch (n) {}
            })(t, z);
            let e = () =>
              (function (e, t) {
                if (t.size > 0) {
                  let r = {};
                  for (let [e, n] of t) r[e] = [...n];
                  try {
                    e.sessionStorage.setItem(de, JSON.stringify(r));
                  } catch (n) {
                    A(
                      !1,
                      'Failed to save applied view transitions in sessionStorage ('.concat(
                        n,
                        ').'
                      )
                    );
                  }
                }
              })(t, z);
            t.addEventListener('pagehide', e),
              (N = () => t.removeEventListener('pagehide', e));
          }
          return (
            M.initialized || ee('POP', M.location, { initialHydration: !0 }), o
          );
        },
        subscribe: function (e) {
          return m.add(e), () => m.delete(e);
        },
        enableScrollRestoration: function (e, t, n) {
          if (((g = e), (b = t), (v = n || null), !w && M.navigation === ae)) {
            w = !0;
            let e = $e(M.location, M.matches);
            null != e && K({ restoreScrollPosition: e });
          }
          return () => {
            (g = null), (b = null), (v = null);
          };
        },
        navigate: async function t(n, r) {
          if ('number' === typeof n) return void e.history.go(n);
          let i = pe(
              M.location,
              M.matches,
              c,
              n,
              null === r || void 0 === r ? void 0 : r.fromRouteId,
              null === r || void 0 === r ? void 0 : r.relative
            ),
            { path: o, submission: a, error: s } = me(!1, i, r),
            l = M.location,
            d = x(M.location, o, r && r.state);
          d = u(u({}, d), e.history.encodeLocation(d));
          let h = r && null != r.replace ? r.replace : void 0,
            f = 'PUSH';
          !0 === h
            ? (f = 'REPLACE')
            : !1 === h ||
              (null != a &&
                Je(a.formMethod) &&
                a.formAction === M.location.pathname + M.location.search &&
                (f = 'REPLACE'));
          let p =
              r && 'preventScrollReset' in r
                ? !0 === r.preventScrollReset
                : void 0,
            m = !0 === (r && r.flushSync),
            g = We({ currentLocation: l, nextLocation: d, historyAction: f });
          g
            ? _e(g, {
                state: 'blocked',
                location: d,
                proceed() {
                  _e(g, {
                    state: 'proceeding',
                    proceed: void 0,
                    reset: void 0,
                    location: d,
                  }),
                    t(n, r);
                },
                reset() {
                  let e = new Map(M.blockers);
                  e.set(g, le), K({ blockers: e });
                },
              })
            : await ee(f, d, {
                submission: a,
                pendingError: s,
                preventScrollReset: p,
                replace: r && r.replace,
                enableViewTransition: r && r.viewTransition,
                flushSync: m,
              });
        },
        fetch: async function (t, n, i, o) {
          we(t);
          let a = !0 === (o && o.flushSync),
            s = r || l,
            u = pe(
              M.location,
              M.matches,
              c,
              i,
              n,
              null === o || void 0 === o ? void 0 : o.relative
            ),
            d = C(s, u, c),
            h = et(d, s, u);
          if ((h.active && h.matches && (d = h.matches), !d))
            return void ge(t, n, Be(404, { pathname: u }), { flushSync: a });
          let { path: f, submission: p, error: m } = me(!0, u, o);
          if (m) return void ge(t, n, m, { flushSync: a });
          let g = Xe(d, f),
            v = !0 === (o && o.preventScrollReset);
          p && Je(p.formMethod)
            ? await (async function (t, n, i, o, a, s, u, d, h) {
                function f(e) {
                  if (!e.route.action && !e.route.lazy) {
                    let e = Be(405, {
                      method: h.formMethod,
                      pathname: i,
                      routeId: n,
                    });
                    return ge(t, n, e, { flushSync: u }), !0;
                  }
                  return !1;
                }
                if ((he(), J.delete(t), !s && f(o))) return;
                let p = M.fetchers.get(t);
                fe(
                  t,
                  (function (e, t) {
                    let n = {
                      state: 'submitting',
                      formMethod: e.formMethod,
                      formAction: e.formAction,
                      formEncType: e.formEncType,
                      formData: e.formData,
                      json: e.json,
                      text: e.text,
                      data: t ? t.data : void 0,
                    };
                    return n;
                  })(h, p),
                  { flushSync: u }
                );
                let m = new AbortController(),
                  g = Te(e.history, i, m.signal, h);
                if (s) {
                  let e = await tt(a, i, g.signal);
                  if ('aborted' === e.type) return;
                  if ('error' === e.type)
                    return void ge(t, n, e.error, { flushSync: u });
                  if (!e.matches)
                    return void ge(t, n, Be(404, { pathname: i }), {
                      flushSync: u,
                    });
                  if (f((o = Xe((a = e.matches), i)))) return;
                }
                I.set(t, m);
                let v = U,
                  A = await re('action', M, g, [o], a, t),
                  b = A[o.route.id];
                if (g.signal.aborted)
                  return void (I.get(t) === m && I.delete(t));
                if (X.has(t)) {
                  if (Ze(b) || Ue(b)) return void fe(t, qe(void 0));
                } else {
                  if (Ze(b))
                    return (
                      I.delete(t),
                      Z > v
                        ? void fe(t, qe(void 0))
                        : (H.add(t),
                          fe(t, Ke(h)),
                          ne(g, b, !1, {
                            fetcherSubmission: h,
                            preventScrollReset: d,
                          }))
                    );
                  if (Ue(b)) return void ge(t, n, b.error);
                }
                let x = M.navigation.location || M.location,
                  w = Te(e.history, x, m.signal),
                  S = r || l,
                  k =
                    'idle' !== M.navigation.state
                      ? C(S, M.navigation.location, c)
                      : M.matches;
                y(k, "Didn't find any matches after fetcher action");
                let P = ++U;
                W.set(t, P);
                let T = Ke(h, b.data);
                M.fetchers.set(t, T);
                let [F, D] = ve(
                  e.history,
                  M,
                  k,
                  h,
                  x,
                  !1,
                  V,
                  O,
                  X,
                  J,
                  H,
                  S,
                  c,
                  [o.route.id, b]
                );
                D.filter((e) => e.key !== t).forEach((e) => {
                  let t = e.key,
                    n = M.fetchers.get(t),
                    r = Ke(void 0, n ? n.data : void 0);
                  M.fetchers.set(t, r),
                    we(t),
                    e.controller && I.set(t, e.controller);
                }),
                  K({ fetchers: new Map(M.fetchers) });
                let j = () => D.forEach((e) => we(e.key));
                m.signal.addEventListener('abort', j);
                let { loaderResults: L, fetcherResults: z } = await ie(
                  M,
                  k,
                  F,
                  D,
                  w
                );
                if (m.signal.aborted) return;
                m.signal.removeEventListener('abort', j),
                  W.delete(t),
                  I.delete(t),
                  D.forEach((e) => I.delete(e.key));
                let N = Ve(L);
                if (N) return ne(w, N.result, !1, { preventScrollReset: d });
                if (((N = Ve(z)), N))
                  return (
                    H.add(N.key), ne(w, N.result, !1, { preventScrollReset: d })
                  );
                let { loaderData: B, errors: _ } = Re(M, k, L, void 0, D, z);
                if (M.fetchers.has(t)) {
                  let e = qe(b.data);
                  M.fetchers.set(t, e);
                }
                Me(P),
                  'loading' === M.navigation.state && P > Z
                    ? (y(R, 'Expected pending action'),
                      E && E.abort(),
                      q(M.navigation.location, {
                        matches: k,
                        loaderData: B,
                        errors: _,
                        fetchers: new Map(M.fetchers),
                      }))
                    : (K({
                        errors: _,
                        loaderData: je(M.loaderData, B, k, _),
                        fetchers: new Map(M.fetchers),
                      }),
                      (V = !1));
              })(t, n, f, g, d, h.active, a, v, p)
            : (J.set(t, { routeId: n, path: f }),
              await (async function (t, n, r, i, o, a, s, l, u) {
                let c = M.fetchers.get(t);
                fe(t, Ke(u, c ? c.data : void 0), { flushSync: s });
                let d = new AbortController(),
                  h = Te(e.history, r, d.signal);
                if (a) {
                  let e = await tt(o, r, h.signal);
                  if ('aborted' === e.type) return;
                  if ('error' === e.type)
                    return void ge(t, n, e.error, { flushSync: s });
                  if (!e.matches)
                    return void ge(t, n, Be(404, { pathname: r }), {
                      flushSync: s,
                    });
                  i = Xe((o = e.matches), r);
                }
                I.set(t, d);
                let f = U,
                  p = await re('loader', M, h, [i], o, t),
                  m = p[i.route.id];
                I.get(t) === d && I.delete(t);
                if (h.signal.aborted) return;
                if (X.has(t)) return void fe(t, qe(void 0));
                if (Ze(m))
                  return Z > f
                    ? void fe(t, qe(void 0))
                    : (H.add(t),
                      void (await ne(h, m, !1, { preventScrollReset: l })));
                if (Ue(m)) return void ge(t, n, m.error);
                fe(t, qe(m.data));
              })(t, n, f, g, d, h.active, a, v, p));
        },
        revalidate: function () {
          G ||
            (G = (function () {
              let e,
                t,
                n = new Promise((r, i) => {
                  (e = async (e) => {
                    r(e);
                    try {
                      await n;
                    } catch (t) {}
                  }),
                    (t = async (e) => {
                      i(e);
                      try {
                        await n;
                      } catch (t) {}
                    });
                });
              return { promise: n, resolve: e, reject: t };
            })()),
            he(),
            K({ revalidation: 'loading' });
          let e = G.promise;
          return 'submitting' === M.navigation.state
            ? e
            : 'idle' === M.navigation.state
              ? (ee(M.historyAction, M.location, {
                  startUninterruptedRevalidation: !0,
                }),
                e)
              : (ee(R || M.historyAction, M.navigation.location, {
                  overrideNavigation: M.navigation,
                  enableViewTransition: !0 === L,
                }),
                e);
        },
        createHref: (t) => e.history.createHref(t),
        encodeLocation: (t) => e.history.encodeLocation(t),
        getFetcher: Ae,
        deleteFetcher: function (e) {
          let t = (Y.get(e) || 0) - 1;
          t <= 0 ? (Y.delete(e), X.add(e)) : Y.set(e, t),
            K({ fetchers: new Map(M.fetchers) });
        },
        dispose: function () {
          p && p(),
            N && N(),
            m.clear(),
            E && E.abort(),
            M.fetchers.forEach((e, t) => be(t)),
            M.blockers.forEach((e, t) => Oe(t));
        },
        getBlocker: function (e, t) {
          let n = M.blockers.get(e) || le;
          return Q.get(e) !== t && Q.set(e, t), n;
        },
        deleteBlocker: Oe,
        patchRoutes: function (e, t) {
          let n = null == r;
          xe(e, t, r || l, s, a), n && ((l = [...l]), K({}));
        },
        _internalFetchControllers: I,
        _internalSetRoutes: function (e) {
          (s = {}), (r = P(e, a, void 0, s));
        },
      }),
      o
    );
  }
  function pe(e, t, n, r, i, o) {
    let a, s;
    if (i) {
      a = [];
      for (let e of t)
        if ((a.push(e), e.route.id === i)) {
          s = e;
          break;
        }
    } else (a = t), (s = t[t.length - 1]);
    let l = Y(r || '.', J(a), _(e.pathname, n) || e.pathname, 'path' === o);
    if (
      (null == r && ((l.search = e.search), (l.hash = e.hash)),
      (null == r || '' === r || '.' === r) && s)
    ) {
      let e = Ye(l.search);
      if (s.route.index && !e)
        l.search = l.search ? l.search.replace(/^\?/, '?index&') : '?index';
      else if (!s.route.index && e) {
        let e = new URLSearchParams(l.search),
          t = e.getAll('index');
        e.delete('index'),
          t.filter((e) => e).forEach((t) => e.append('index', t));
        let n = e.toString();
        l.search = n ? '?'.concat(n) : '';
      }
    }
    return (
      '/' !== n && (l.pathname = '/' === l.pathname ? n : X([n, l.pathname])),
      w(l)
    );
  }
  function me(e, t, n) {
    if (
      !n ||
      !(function (e) {
        return (
          null != e &&
          (('formData' in e && null != e.formData) ||
            ('body' in e && void 0 !== e.body))
        );
      })(n)
    )
      return { path: t };
    if (n.formMethod && !He(n.formMethod))
      return { path: t, error: Be(405, { method: n.formMethod }) };
    let r,
      i,
      o = () => ({ path: t, error: Be(400, { type: 'invalid-body' }) }),
      a = (n.formMethod || 'get').toUpperCase(),
      s = Oe(t);
    if (void 0 !== n.body) {
      if ('text/plain' === n.formEncType) {
        if (!Je(a)) return o();
        let e =
          'string' === typeof n.body
            ? n.body
            : n.body instanceof FormData || n.body instanceof URLSearchParams
              ? Array.from(n.body.entries()).reduce((e, t) => {
                  let [n, r] = t;
                  return ''.concat(e).concat(n, '=').concat(r, '\n');
                }, '')
              : String(n.body);
        return {
          path: t,
          submission: {
            formMethod: a,
            formAction: s,
            formEncType: n.formEncType,
            formData: void 0,
            json: void 0,
            text: e,
          },
        };
      }
      if ('application/json' === n.formEncType) {
        if (!Je(a)) return o();
        try {
          let e = 'string' === typeof n.body ? JSON.parse(n.body) : n.body;
          return {
            path: t,
            submission: {
              formMethod: a,
              formAction: s,
              formEncType: n.formEncType,
              formData: void 0,
              json: e,
              text: void 0,
            },
          };
        } catch (c) {
          return o();
        }
      }
    }
    if (
      (y(
        'function' === typeof FormData,
        'FormData is not available in this environment'
      ),
      n.formData)
    )
      (r = Fe(n.formData)), (i = n.formData);
    else if (n.body instanceof FormData) (r = Fe(n.body)), (i = n.body);
    else if (n.body instanceof URLSearchParams) (r = n.body), (i = De(r));
    else if (null == n.body) (r = new URLSearchParams()), (i = new FormData());
    else
      try {
        (r = new URLSearchParams(n.body)), (i = De(r));
      } catch (c) {
        return o();
      }
    let l = {
      formMethod: a,
      formAction: s,
      formEncType: (n && n.formEncType) || 'application/x-www-form-urlencoded',
      formData: i,
      json: void 0,
      text: void 0,
    };
    if (Je(l.formMethod)) return { path: t, submission: l };
    let u = S(t);
    return (
      e && u.search && Ye(u.search) && r.append('index', ''),
      (u.search = '?'.concat(r)),
      { path: w(u), submission: l }
    );
  }
  function ge(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      r = e.findIndex((e) => e.route.id === t);
    return r >= 0 ? e.slice(0, n ? r + 1 : r) : e;
  }
  function ve(e, t, n, r, i, o, a, s, l, c, d, h, f, p) {
    let m = p ? (Ue(p[1]) ? p[1].error : p[1].data) : void 0,
      g = e.createURL(t.location),
      v = e.createURL(i),
      y = n;
    o && t.errors
      ? (y = ge(n, Object.keys(t.errors)[0], !0))
      : p && Ue(p[1]) && (y = ge(n, p[0]));
    let A = p ? p[1].statusCode : void 0,
      b = A && A >= 400,
      x = y.filter((e, n) => {
        let { route: i } = e;
        if (i.lazy) return !0;
        if (null == i.loader) return !1;
        if (o) return ye(i, t.loaderData, t.errors);
        if (
          (function (e, t, n) {
            let r = !t || n.route.id !== t.route.id,
              i = !e.hasOwnProperty(n.route.id);
            return r || i;
          })(t.loaderData, t.matches[n], e)
        )
          return !0;
        let s = t.matches[n],
          l = e;
        return be(
          e,
          u(
            u(
              {
                currentUrl: g,
                currentParams: s.params,
                nextUrl: v,
                nextParams: l.params,
              },
              r
            ),
            {},
            {
              actionResult: m,
              actionStatus: A,
              defaultShouldRevalidate:
                !b &&
                (a ||
                  g.pathname + g.search === v.pathname + v.search ||
                  g.search !== v.search ||
                  Ae(s, l)),
            }
          )
        );
      }),
      w = [];
    return (
      c.forEach((e, i) => {
        if (o || !n.some((t) => t.route.id === e.routeId) || l.has(i)) return;
        let c = C(h, e.path, f);
        if (!c)
          return void w.push({
            key: i,
            routeId: e.routeId,
            path: e.path,
            matches: null,
            match: null,
            controller: null,
          });
        let p = t.fetchers.get(i),
          y = Xe(c, e.path),
          x = !1;
        d.has(i)
          ? (x = !1)
          : s.has(i)
            ? (s.delete(i), (x = !0))
            : (x =
                p && 'idle' !== p.state && void 0 === p.data
                  ? a
                  : be(
                      y,
                      u(
                        u(
                          {
                            currentUrl: g,
                            currentParams:
                              t.matches[t.matches.length - 1].params,
                            nextUrl: v,
                            nextParams: n[n.length - 1].params,
                          },
                          r
                        ),
                        {},
                        {
                          actionResult: m,
                          actionStatus: A,
                          defaultShouldRevalidate: !b && a,
                        }
                      )
                    )),
          x &&
            w.push({
              key: i,
              routeId: e.routeId,
              path: e.path,
              matches: c,
              match: y,
              controller: new AbortController(),
            });
      }),
      [x, w]
    );
  }
  function ye(e, t, n) {
    if (e.lazy) return !0;
    if (!e.loader) return !1;
    let r = null != t && void 0 !== t[e.id],
      i = null != n && void 0 !== n[e.id];
    return (
      !(!r && i) &&
      (('function' === typeof e.loader && !0 === e.loader.hydrate) ||
        (!r && !i))
    );
  }
  function Ae(e, t) {
    let n = e.route.path;
    return (
      e.pathname !== t.pathname ||
      (null != n && n.endsWith('*') && e.params['*'] !== t.params['*'])
    );
  }
  function be(e, t) {
    if (e.route.shouldRevalidate) {
      let n = e.route.shouldRevalidate(t);
      if ('boolean' === typeof n) return n;
    }
    return t.defaultShouldRevalidate;
  }
  function xe(e, t, n, r, i) {
    var o;
    let a;
    if (e) {
      let t = r[e];
      y(t, 'No route found to patch children into: routeId = '.concat(e)),
        t.children || (t.children = []),
        (a = t.children);
    } else a = n;
    let s = P(
      t.filter((e) => !a.some((t) => we(e, t))),
      i,
      [
        e || '_',
        'patch',
        String((null === (o = a) || void 0 === o ? void 0 : o.length) || '0'),
      ],
      r
    );
    a.push(...s);
  }
  function we(e, t) {
    return (
      ('id' in e && 'id' in t && e.id === t.id) ||
      (e.index === t.index &&
        e.path === t.path &&
        e.caseSensitive === t.caseSensitive &&
        (!(
          (e.children && 0 !== e.children.length) ||
          (t.children && 0 !== t.children.length)
        ) ||
          e.children.every((e, n) => {
            var r;
            return null === (r = t.children) || void 0 === r
              ? void 0
              : r.some((t) => we(e, t));
          })))
    );
  }
  async function Se(e) {
    let { matches: t } = e,
      n = t.filter((e) => e.shouldLoad);
    return (await Promise.all(n.map((e) => e.resolve()))).reduce(
      (e, t, r) => Object.assign(e, { [n[r].route.id]: t }),
      {}
    );
  }
  async function ke(e, t, n, r, i, o, a, s, l, c) {
    let d = o.map((e) =>
        e.route.lazy
          ? (async function (e, t, n) {
              if (!e.lazy) return;
              let r = await e.lazy();
              if (!e.lazy) return;
              let i = n[e.id];
              y(i, 'No route found in manifest');
              let o = {};
              for (let a in r) {
                let e = void 0 !== i[a] && 'hasErrorBoundary' !== a;
                A(
                  !e,
                  'Route "'
                    .concat(i.id, '" has a static property "')
                    .concat(
                      a,
                      '" defined but its lazy function is also returning a value for this property. The lazy route property "'
                    )
                    .concat(a, '" will be ignored.')
                ),
                  e || E.has(a) || (o[a] = r[a]);
              }
              Object.assign(i, o),
                Object.assign(i, u(u({}, t(i)), {}, { lazy: void 0 }));
            })(e.route, l, s)
          : void 0
      ),
      h = o.map((e, n) => {
        let o = d[n],
          a = i.some((t) => t.route.id === e.route.id);
        return u(
          u({}, e),
          {},
          {
            shouldLoad: a,
            resolve: async (n) => (
              n &&
                'GET' === r.method &&
                (e.route.lazy || e.route.loader) &&
                (a = !0),
              a
                ? (async function (e, t, n, r, i, o) {
                    let a,
                      s,
                      l = (r) => {
                        let a,
                          l = new Promise((e, t) => (a = t));
                        (s = () => a()), t.signal.addEventListener('abort', s);
                        let u = (i) =>
                            'function' !== typeof r
                              ? Promise.reject(
                                  new Error(
                                    'You cannot call the handler for a route which defines a boolean "'
                                      .concat(e, '" [routeId: ')
                                      .concat(n.route.id, ']')
                                  )
                                )
                              : r(
                                  { request: t, params: n.params, context: o },
                                  ...(void 0 !== i ? [i] : [])
                                ),
                          c = (async () => {
                            try {
                              return {
                                type: 'data',
                                result: await (i ? i((e) => u(e)) : u()),
                              };
                            } catch (e) {
                              return { type: 'error', result: e };
                            }
                          })();
                        return Promise.race([c, l]);
                      };
                    try {
                      let i = n.route[e];
                      if (r)
                        if (i) {
                          let e,
                            [t] = await Promise.all([
                              l(i).catch((t) => {
                                e = t;
                              }),
                              r,
                            ]);
                          if (void 0 !== e) throw e;
                          a = t;
                        } else {
                          if ((await r, (i = n.route[e]), !i)) {
                            if ('action' === e) {
                              let e = new URL(t.url),
                                r = e.pathname + e.search;
                              throw Be(405, {
                                method: t.method,
                                pathname: r,
                                routeId: n.route.id,
                              });
                            }
                            return { type: 'data', result: void 0 };
                          }
                          a = await l(i);
                        }
                      else {
                        if (!i) {
                          let e = new URL(t.url);
                          throw Be(404, { pathname: e.pathname + e.search });
                        }
                        a = await l(i);
                      }
                    } catch (u) {
                      return { type: 'error', result: u };
                    } finally {
                      s && t.signal.removeEventListener('abort', s);
                    }
                    return a;
                  })(t, r, e, o, n, c)
                : Promise.resolve({ type: 'data', result: void 0 })
            ),
          }
        );
      }),
      f = await e({
        matches: h,
        request: r,
        params: o[0].params,
        fetcherKey: a,
        context: c,
      });
    try {
      await Promise.all(d);
    } catch (p) {}
    return f;
  }
  async function Ee(e) {
    let { result: t, type: n } = e;
    if (We(t)) {
      let e;
      try {
        let n = t.headers.get('Content-Type');
        e =
          n && /\bapplication\/json\b/.test(n)
            ? null == t.body
              ? null
              : await t.json()
            : await t.text();
      } catch (s) {
        return { type: 'error', error: s };
      }
      return 'error' === n
        ? {
            type: 'error',
            error: new q(t.status, t.statusText, e),
            statusCode: t.status,
            headers: t.headers,
          }
        : { type: 'data', data: e, statusCode: t.status, headers: t.headers };
    }
    if ('error' === n) {
      if (_e(t)) {
        var r, i;
        if (t.data instanceof Error)
          return {
            type: 'error',
            error: t.data,
            statusCode:
              null === (i = t.init) || void 0 === i ? void 0 : i.status,
          };
        t = new q(
          (null === (r = t.init) || void 0 === r ? void 0 : r.status) || 500,
          void 0,
          t.data
        );
      }
      return { type: 'error', error: t, statusCode: $(t) ? t.status : void 0 };
    }
    var o, a;
    return _e(t)
      ? {
          type: 'data',
          data: t.data,
          statusCode: null === (o = t.init) || void 0 === o ? void 0 : o.status,
          headers:
            null !== (a = t.init) && void 0 !== a && a.headers
              ? new Headers(t.init.headers)
              : void 0,
        }
      : { type: 'data', data: t };
  }
  function Pe(e, t, n, r, i) {
    let o = e.headers.get('Location');
    if (
      (y(
        o,
        'Redirects returned/thrown from loaders/actions must have a Location header'
      ),
      !ue.test(o))
    ) {
      let a = r.slice(0, r.findIndex((e) => e.route.id === n) + 1);
      (o = pe(new URL(t.url), a, i, o)), e.headers.set('Location', o);
    }
    return e;
  }
  function Ce(e, t, n) {
    if (ue.test(e)) {
      let r = e,
        i = r.startsWith('//') ? new URL(t.protocol + r) : new URL(r),
        o = null != _(i.pathname, n);
      if (i.origin === t.origin && o) return i.pathname + i.search + i.hash;
    }
    return e;
  }
  function Te(e, t, n, r) {
    let i = e.createURL(Oe(t)).toString(),
      o = { signal: n };
    if (r && Je(r.formMethod)) {
      let { formMethod: e, formEncType: t } = r;
      (o.method = e.toUpperCase()),
        'application/json' === t
          ? ((o.headers = new Headers({ 'Content-Type': t })),
            (o.body = JSON.stringify(r.json)))
          : 'text/plain' === t
            ? (o.body = r.text)
            : 'application/x-www-form-urlencoded' === t && r.formData
              ? (o.body = Fe(r.formData))
              : (o.body = r.formData);
    }
    return new Request(i, o);
  }
  function Fe(e) {
    let t = new URLSearchParams();
    for (let [n, r] of e.entries())
      t.append(n, 'string' === typeof r ? r : r.name);
    return t;
  }
  function De(e) {
    let t = new FormData();
    for (let [n, r] of e.entries()) t.append(n, r);
    return t;
  }
  function Me(e, t, n) {
    let r,
      i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
      o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
      a = {},
      s = null,
      l = !1,
      u = {},
      c = n && Ue(n[1]) ? n[1].error : void 0;
    return (
      e.forEach((n) => {
        if (!(n.route.id in t)) return;
        let d = n.route.id,
          h = t[d];
        if (
          (y(!Ze(h), 'Cannot handle redirect results in processLoaderData'),
          Ue(h))
        ) {
          let t = h.error;
          if ((void 0 !== c && ((t = c), (c = void 0)), (s = s || {}), o))
            s[d] = t;
          else {
            let n = ze(e, d);
            null == s[n.route.id] && (s[n.route.id] = t);
          }
          i || (a[d] = he),
            l || ((l = !0), (r = $(h.error) ? h.error.status : 500)),
            h.headers && (u[d] = h.headers);
        } else
          (a[d] = h.data),
            h.statusCode && 200 !== h.statusCode && !l && (r = h.statusCode),
            h.headers && (u[d] = h.headers);
      }),
      void 0 !== c && n && ((s = { [n[0]]: c }), (a[n[0]] = void 0)),
      { loaderData: a, errors: s, statusCode: r || 200, loaderHeaders: u }
    );
  }
  function Re(e, t, n, r, i, o) {
    let { loaderData: a, errors: s } = Me(t, n, r);
    return (
      i.forEach((t) => {
        let { key: n, match: r, controller: i } = t,
          a = o[n];
        if (
          (y(a, 'Did not find corresponding fetcher result'),
          !i || !i.signal.aborted)
        )
          if (Ue(a)) {
            let t = ze(
              e.matches,
              null === r || void 0 === r ? void 0 : r.route.id
            );
            (s && s[t.route.id]) ||
              (s = u(u({}, s), {}, { [t.route.id]: a.error })),
              e.fetchers.delete(n);
          } else if (Ze(a)) y(!1, 'Unhandled fetcher revalidation redirect');
          else {
            let t = qe(a.data);
            e.fetchers.set(n, t);
          }
      }),
      { loaderData: a, errors: s }
    );
  }
  function je(e, t, n, r) {
    let i = Object.entries(t)
      .filter((e) => {
        let [, t] = e;
        return t !== he;
      })
      .reduce((e, t) => {
        let [n, r] = t;
        return (e[n] = r), e;
      }, {});
    for (let o of n) {
      let n = o.route.id;
      if (
        (!t.hasOwnProperty(n) &&
          e.hasOwnProperty(n) &&
          o.route.loader &&
          (i[n] = e[n]),
        r && r.hasOwnProperty(n))
      )
        break;
    }
    return i;
  }
  function Le(e) {
    return e
      ? Ue(e[1])
        ? { actionData: {} }
        : { actionData: { [e[0]]: e[1].data } }
      : {};
  }
  function ze(e, t) {
    return (
      (t ? e.slice(0, e.findIndex((e) => e.route.id === t) + 1) : [...e])
        .reverse()
        .find((e) => !0 === e.route.hasErrorBoundary) || e[0]
    );
  }
  function Ne(e) {
    let t =
      1 === e.length
        ? e[0]
        : e.find((e) => e.index || !e.path || '/' === e.path) || {
            id: '__shim-error-route__',
          };
    return {
      matches: [{ params: {}, pathname: '', pathnameBase: '', route: t }],
      route: t,
    };
  }
  function Be(e) {
    let {
        pathname: t,
        routeId: n,
        method: r,
        type: i,
        message: o,
      } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      a = 'Unknown Server Error',
      s = 'Unknown @remix-run/router error';
    return (
      400 === e
        ? ((a = 'Bad Request'),
          r && t && n
            ? (s = 'You made a '
                .concat(r, ' request to "')
                .concat(t, '" but did not provide a `loader` for route "')
                .concat(n, '", so there is no way to handle the request.'))
            : 'invalid-body' === i && (s = 'Unable to encode submission body'))
        : 403 === e
          ? ((a = 'Forbidden'),
            (s = 'Route "'.concat(n, '" does not match URL "').concat(t, '"')))
          : 404 === e
            ? ((a = 'Not Found'), (s = 'No route matches URL "'.concat(t, '"')))
            : 405 === e &&
              ((a = 'Method Not Allowed'),
              r && t && n
                ? (s = 'You made a '
                    .concat(r.toUpperCase(), ' request to "')
                    .concat(t, '" but did not provide an `action` for route "')
                    .concat(n, '", so there is no way to handle the request.'))
                : r &&
                  (s = 'Invalid request method "'.concat(
                    r.toUpperCase(),
                    '"'
                  ))),
      new q(e || 500, a, new Error(s), !0)
    );
  }
  function Ve(e) {
    let t = Object.entries(e);
    for (let n = t.length - 1; n >= 0; n--) {
      let [e, r] = t[n];
      if (Ze(r)) return { key: e, result: r };
    }
  }
  function Oe(e) {
    return w(u(u({}, 'string' === typeof e ? S(e) : e), {}, { hash: '' }));
  }
  function Ie(e) {
    return We(e.result) && ie.has(e.result.status);
  }
  function Ue(e) {
    return 'error' === e.type;
  }
  function Ze(e) {
    return 'redirect' === (e && e.type);
  }
  function _e(e) {
    return (
      'object' === typeof e &&
      null != e &&
      'type' in e &&
      'data' in e &&
      'init' in e &&
      'DataWithResponseInit' === e.type
    );
  }
  function We(e) {
    return (
      null != e &&
      'number' === typeof e.status &&
      'string' === typeof e.statusText &&
      'object' === typeof e.headers &&
      'undefined' !== typeof e.body
    );
  }
  function He(e) {
    return re.has(e.toUpperCase());
  }
  function Je(e) {
    return te.has(e.toUpperCase());
  }
  function Ye(e) {
    return new URLSearchParams(e).getAll('index').some((e) => '' === e);
  }
  function Xe(e, t) {
    let n = 'string' === typeof t ? S(t).search : t.search;
    if (e[e.length - 1].route.index && Ye(n || '')) return e[e.length - 1];
    let r = H(e);
    return r[r.length - 1];
  }
  function Qe(e) {
    let {
      formMethod: t,
      formAction: n,
      formEncType: r,
      text: i,
      formData: o,
      json: a,
    } = e;
    if (t && n && r)
      return null != i
        ? {
            formMethod: t,
            formAction: n,
            formEncType: r,
            formData: void 0,
            json: void 0,
            text: i,
          }
        : null != o
          ? {
              formMethod: t,
              formAction: n,
              formEncType: r,
              formData: o,
              json: void 0,
              text: void 0,
            }
          : void 0 !== a
            ? {
                formMethod: t,
                formAction: n,
                formEncType: r,
                formData: void 0,
                json: a,
                text: void 0,
              }
            : void 0;
  }
  function Ge(e, t) {
    if (t) {
      return {
        state: 'loading',
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      };
    }
    return {
      state: 'loading',
      location: e,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
    };
  }
  function Ke(e, t) {
    if (e) {
      return {
        state: 'loading',
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      };
    }
    return {
      state: 'loading',
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: t,
    };
  }
  function qe(e) {
    return {
      state: 'idle',
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: e,
    };
  }
  var $e = r.createContext(null);
  $e.displayName = 'DataRouter';
  var et = r.createContext(null);
  et.displayName = 'DataRouterState';
  var tt = r.createContext({ isTransitioning: !1 });
  tt.displayName = 'ViewTransition';
  var nt = r.createContext(new Map());
  nt.displayName = 'Fetchers';
  var rt = r.createContext(null);
  rt.displayName = 'Await';
  var it = r.createContext(null);
  it.displayName = 'Navigation';
  var ot = r.createContext(null);
  ot.displayName = 'Location';
  var at = r.createContext({ outlet: null, matches: [], isDataRoute: !1 });
  at.displayName = 'Route';
  var st = r.createContext(null);
  st.displayName = 'RouteError';
  function lt() {
    return null != r.useContext(ot);
  }
  function ut() {
    return (
      y(
        lt(),
        'useLocation() may be used only in the context of a <Router> component.'
      ),
      r.useContext(ot).location
    );
  }
  var ct =
    'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
  function dt(e) {
    r.useContext(it).static || r.useLayoutEffect(e);
  }
  function ht() {
    let { isDataRoute: e } = r.useContext(at);
    return e
      ? (function () {
          let { router: e } = wt('useNavigate'),
            t = kt('useNavigate'),
            n = r.useRef(!1);
          dt(() => {
            n.current = !0;
          });
          let i = r.useCallback(
            async function (r) {
              let i =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              A(n.current, ct),
                n.current &&
                  ('number' === typeof r
                    ? e.navigate(r)
                    : await e.navigate(r, u({ fromRouteId: t }, i)));
            },
            [e, t]
          );
          return i;
        })()
      : (function () {
          y(
            lt(),
            'useNavigate() may be used only in the context of a <Router> component.'
          );
          let e = r.useContext($e),
            { basename: t, navigator: n } = r.useContext(it),
            { matches: i } = r.useContext(at),
            { pathname: o } = ut(),
            a = JSON.stringify(J(i)),
            s = r.useRef(!1);
          dt(() => {
            s.current = !0;
          });
          let l = r.useCallback(
            function (r) {
              let i =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              if ((A(s.current, ct), !s.current)) return;
              if ('number' === typeof r) return void n.go(r);
              let l = Y(r, JSON.parse(a), o, 'path' === i.relative);
              null == e &&
                '/' !== t &&
                (l.pathname = '/' === l.pathname ? t : X([t, l.pathname])),
                (i.replace ? n.replace : n.push)(l, i.state, i);
            },
            [t, n, a, o, e]
          );
          return l;
        })();
  }
  var ft = r.createContext(null);
  function pt(e) {
    let { relative: t } =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      { matches: n } = r.useContext(at),
      { pathname: i } = ut(),
      o = JSON.stringify(J(n));
    return r.useMemo(() => Y(e, JSON.parse(o), i, 'path' === t), [e, o, i, t]);
  }
  function mt(e, t, n, i) {
    y(
      lt(),
      'useRoutes() may be used only in the context of a <Router> component.'
    );
    let { navigator: o } = r.useContext(it),
      { matches: a } = r.useContext(at),
      s = a[a.length - 1],
      l = s ? s.params : {},
      c = s ? s.pathname : '/',
      d = s ? s.pathnameBase : '/',
      h = s && s.route;
    {
      let e = (h && h.path) || '';
      Ct(
        c,
        !h || e.endsWith('*') || e.endsWith('*?'),
        'You rendered descendant <Routes> (or called `useRoutes()`) at "'
          .concat(c, '" (under <Route path="')
          .concat(
            e,
            '">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won\'t match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="'
          )
          .concat(e, '"> to <Route path="')
          .concat('/' === e ? '*' : ''.concat(e, '/*'), '">.')
      );
    }
    let f,
      p = ut();
    if (t) {
      var m;
      let e = 'string' === typeof t ? S(t) : t;
      y(
        '/' === d ||
          (null === (m = e.pathname) || void 0 === m
            ? void 0
            : m.startsWith(d)),
        'When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "'
          .concat(d, '" but pathname "')
          .concat(e.pathname, '" was given in the `location` prop.')
      ),
        (f = e);
    } else f = p;
    let g = f.pathname || '/',
      v = g;
    if ('/' !== d) {
      let e = d.replace(/^\//, '').split('/');
      v = '/' + g.replace(/^\//, '').split('/').slice(e.length).join('/');
    }
    let b = C(e, { pathname: v });
    A(
      h || null != b,
      'No routes matched location "'
        .concat(f.pathname)
        .concat(f.search)
        .concat(f.hash, '" ')
    ),
      A(
        null == b ||
          void 0 !== b[b.length - 1].route.element ||
          void 0 !== b[b.length - 1].route.Component ||
          void 0 !== b[b.length - 1].route.lazy,
        'Matched leaf route at location "'
          .concat(f.pathname)
          .concat(f.search)
          .concat(
            f.hash,
            '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'
          )
      );
    let x = bt(
      b &&
        b.map((e) =>
          Object.assign({}, e, {
            params: Object.assign({}, l, e.params),
            pathname: X([
              d,
              o.encodeLocation
                ? o.encodeLocation(e.pathname).pathname
                : e.pathname,
            ]),
            pathnameBase:
              '/' === e.pathnameBase
                ? d
                : X([
                    d,
                    o.encodeLocation
                      ? o.encodeLocation(e.pathnameBase).pathname
                      : e.pathnameBase,
                  ]),
          })
        ),
      a,
      n,
      i
    );
    return t && x
      ? r.createElement(
          ot.Provider,
          {
            value: {
              location: u(
                {
                  pathname: '/',
                  search: '',
                  hash: '',
                  state: null,
                  key: 'default',
                },
                f
              ),
              navigationType: 'POP',
            },
          },
          x
        )
      : x;
  }
  function gt() {
    let e = Et(),
      t = $(e)
        ? ''.concat(e.status, ' ').concat(e.statusText)
        : e instanceof Error
          ? e.message
          : JSON.stringify(e),
      n = e instanceof Error ? e.stack : null,
      i = 'rgba(200,200,200, 0.5)',
      o = { padding: '0.5rem', backgroundColor: i },
      a = { padding: '2px 4px', backgroundColor: i },
      s = null;
    return (
      console.error('Error handled by React Router default ErrorBoundary:', e),
      (s = r.createElement(
        r.Fragment,
        null,
        r.createElement('p', null, '\ud83d\udcbf Hey developer \ud83d\udc4b'),
        r.createElement(
          'p',
          null,
          'You can provide a way better UX than this when your app throws errors by providing your own ',
          r.createElement('code', { style: a }, 'ErrorBoundary'),
          ' or',
          ' ',
          r.createElement('code', { style: a }, 'errorElement'),
          ' prop on your route.'
        )
      )),
      r.createElement(
        r.Fragment,
        null,
        r.createElement('h2', null, 'Unexpected Application Error!'),
        r.createElement('h3', { style: { fontStyle: 'italic' } }, t),
        n ? r.createElement('pre', { style: o }, n) : null,
        s
      )
    );
  }
  var vt = r.createElement(gt, null),
    yt = class extends r.Component {
      constructor(e) {
        super(e),
          (this.state = {
            location: e.location,
            revalidation: e.revalidation,
            error: e.error,
          });
      }
      static getDerivedStateFromError(e) {
        return { error: e };
      }
      static getDerivedStateFromProps(e, t) {
        return t.location !== e.location ||
          ('idle' !== t.revalidation && 'idle' === e.revalidation)
          ? {
              error: e.error,
              location: e.location,
              revalidation: e.revalidation,
            }
          : {
              error: void 0 !== e.error ? e.error : t.error,
              location: t.location,
              revalidation: e.revalidation || t.revalidation,
            };
      }
      componentDidCatch(e, t) {
        console.error(
          'React Router caught the following error during render',
          e,
          t
        );
      }
      render() {
        return void 0 !== this.state.error
          ? r.createElement(
              at.Provider,
              { value: this.props.routeContext },
              r.createElement(st.Provider, {
                value: this.state.error,
                children: this.props.component,
              })
            )
          : this.props.children;
      }
    };
  function At(e) {
    let { routeContext: t, match: n, children: i } = e,
      o = r.useContext($e);
    return (
      o &&
        o.static &&
        o.staticContext &&
        (n.route.errorElement || n.route.ErrorBoundary) &&
        (o.staticContext._deepestRenderedBoundaryId = n.route.id),
      r.createElement(at.Provider, { value: t }, i)
    );
  }
  function bt(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
    if (null == e) {
      if (!n) return null;
      if (n.errors) e = n.matches;
      else {
        if (0 !== t.length || n.initialized || !(n.matches.length > 0))
          return null;
        e = n.matches;
      }
    }
    let i = e,
      o = null === n || void 0 === n ? void 0 : n.errors;
    if (null != o) {
      let e = i.findIndex(
        (e) =>
          e.route.id &&
          void 0 !== (null === o || void 0 === o ? void 0 : o[e.route.id])
      );
      y(
        e >= 0,
        'Could not find a matching route for errors on route IDs: '.concat(
          Object.keys(o).join(',')
        )
      ),
        (i = i.slice(0, Math.min(i.length, e + 1)));
    }
    let a = !1,
      s = -1;
    if (n)
      for (let r = 0; r < i.length; r++) {
        let e = i[r];
        if (
          ((e.route.HydrateFallback || e.route.hydrateFallbackElement) &&
            (s = r),
          e.route.id)
        ) {
          let { loaderData: t, errors: r } = n,
            o =
              e.route.loader &&
              !t.hasOwnProperty(e.route.id) &&
              (!r || void 0 === r[e.route.id]);
          if (e.route.lazy || o) {
            (a = !0), (i = s >= 0 ? i.slice(0, s + 1) : [i[0]]);
            break;
          }
        }
      }
    return i.reduceRight((e, l, u) => {
      let c,
        d = !1,
        h = null,
        f = null;
      n &&
        ((c = o && l.route.id ? o[l.route.id] : void 0),
        (h = l.route.errorElement || vt),
        a &&
          (s < 0 && 0 === u
            ? (Ct(
                'route-fallback',
                !1,
                'No `HydrateFallback` element provided to render during initial hydration'
              ),
              (d = !0),
              (f = null))
            : s === u &&
              ((d = !0), (f = l.route.hydrateFallbackElement || null))));
      let p = t.concat(i.slice(0, u + 1)),
        m = () => {
          let t;
          return (
            (t = c
              ? h
              : d
                ? f
                : l.route.Component
                  ? r.createElement(l.route.Component, null)
                  : l.route.element
                    ? l.route.element
                    : e),
            r.createElement(At, {
              match: l,
              routeContext: { outlet: e, matches: p, isDataRoute: null != n },
              children: t,
            })
          );
        };
      return n && (l.route.ErrorBoundary || l.route.errorElement || 0 === u)
        ? r.createElement(yt, {
            location: n.location,
            revalidation: n.revalidation,
            component: h,
            error: c,
            children: m(),
            routeContext: { outlet: null, matches: p, isDataRoute: !0 },
          })
        : m();
    }, null);
  }
  function xt(e) {
    return ''.concat(
      e,
      ' must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.'
    );
  }
  function wt(e) {
    let t = r.useContext($e);
    return y(t, xt(e)), t;
  }
  function St(e) {
    let t = r.useContext(et);
    return y(t, xt(e)), t;
  }
  function kt(e) {
    let t = (function (e) {
        let t = r.useContext(at);
        return y(t, xt(e)), t;
      })(e),
      n = t.matches[t.matches.length - 1];
    return (
      y(
        n.route.id,
        ''.concat(e, ' can only be used on routes that contain a unique "id"')
      ),
      n.route.id
    );
  }
  function Et() {
    var e;
    let t = r.useContext(st),
      n = St('useRouteError'),
      i = kt('useRouteError');
    return void 0 !== t
      ? t
      : null === (e = n.errors) || void 0 === e
        ? void 0
        : e[i];
  }
  var Pt = {};
  function Ct(e, t, n) {
    t || Pt[e] || ((Pt[e] = !0), A(!1, n));
  }
  var Tt = {};
  function Ft(e, t) {
    e || Tt[t] || ((Tt[t] = !0), console.warn(t));
  }
  function Dt(e) {
    let t = {
      hasErrorBoundary:
        e.hasErrorBoundary || null != e.ErrorBoundary || null != e.errorElement,
    };
    return (
      e.Component &&
        (e.element &&
          A(
            !1,
            'You should not include both `Component` and `element` on your route - `Component` will be used.'
          ),
        Object.assign(t, {
          element: r.createElement(e.Component),
          Component: void 0,
        })),
      e.HydrateFallback &&
        (e.hydrateFallbackElement &&
          A(
            !1,
            'You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.'
          ),
        Object.assign(t, {
          hydrateFallbackElement: r.createElement(e.HydrateFallback),
          HydrateFallback: void 0,
        })),
      e.ErrorBoundary &&
        (e.errorElement &&
          A(
            !1,
            'You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.'
          ),
        Object.assign(t, {
          errorElement: r.createElement(e.ErrorBoundary),
          ErrorBoundary: void 0,
        })),
      t
    );
  }
  var Mt = class {
    constructor() {
      (this.status = 'pending'),
        (this.promise = new Promise((e, t) => {
          (this.resolve = (t) => {
            'pending' === this.status && ((this.status = 'resolved'), e(t));
          }),
            (this.reject = (e) => {
              'pending' === this.status && ((this.status = 'rejected'), t(e));
            });
        }));
    }
  };
  function Rt(e) {
    let { router: t, flushSync: n } = e,
      [i, o] = r.useState(t.state),
      [a, s] = r.useState(),
      [l, u] = r.useState({ isTransitioning: !1 }),
      [c, d] = r.useState(),
      [h, f] = r.useState(),
      [p, m] = r.useState(),
      g = r.useRef(new Map()),
      v = r.useCallback(
        (e, i) => {
          let { deletedFetchers: a, flushSync: l, viewTransitionOpts: p } = i;
          a.forEach((e) => g.current.delete(e)),
            e.fetchers.forEach((e, t) => {
              void 0 !== e.data && g.current.set(t, e.data);
            }),
            Ft(
              !1 === l || null != n,
              'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
            );
          let v =
            null != t.window &&
            null != t.window.document &&
            'function' === typeof t.window.document.startViewTransition;
          if (
            (Ft(
              null == p || v,
              'You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.'
            ),
            p && v)
          ) {
            if (n && l) {
              n(() => {
                h && (c && c.resolve(), h.skipTransition()),
                  u({
                    isTransitioning: !0,
                    flushSync: !0,
                    currentLocation: p.currentLocation,
                    nextLocation: p.nextLocation,
                  });
              });
              let r = t.window.document.startViewTransition(() => {
                n(() => o(e));
              });
              return (
                r.finished.finally(() => {
                  n(() => {
                    d(void 0), f(void 0), s(void 0), u({ isTransitioning: !1 });
                  });
                }),
                void n(() => f(r))
              );
            }
            h
              ? (c && c.resolve(),
                h.skipTransition(),
                m({
                  state: e,
                  currentLocation: p.currentLocation,
                  nextLocation: p.nextLocation,
                }))
              : (s(e),
                u({
                  isTransitioning: !0,
                  flushSync: !1,
                  currentLocation: p.currentLocation,
                  nextLocation: p.nextLocation,
                }));
          } else n && l ? n(() => o(e)) : r.startTransition(() => o(e));
        },
        [t.window, n, h, c]
      );
    r.useLayoutEffect(() => t.subscribe(v), [t, v]),
      r.useEffect(() => {
        l.isTransitioning && !l.flushSync && d(new Mt());
      }, [l]),
      r.useEffect(() => {
        if (c && a && t.window) {
          let e = a,
            n = c.promise,
            i = t.window.document.startViewTransition(async () => {
              r.startTransition(() => o(e)), await n;
            });
          i.finished.finally(() => {
            d(void 0), f(void 0), s(void 0), u({ isTransitioning: !1 });
          }),
            f(i);
        }
      }, [a, c, t.window]),
      r.useEffect(() => {
        c && a && i.location.key === a.location.key && c.resolve();
      }, [c, h, i.location, a]),
      r.useEffect(() => {
        !l.isTransitioning &&
          p &&
          (s(p.state),
          u({
            isTransitioning: !0,
            flushSync: !1,
            currentLocation: p.currentLocation,
            nextLocation: p.nextLocation,
          }),
          m(void 0));
      }, [l.isTransitioning, p]);
    let y = r.useMemo(
        () => ({
          createHref: t.createHref,
          encodeLocation: t.encodeLocation,
          go: (e) => t.navigate(e),
          push: (e, n, r) =>
            t.navigate(e, {
              state: n,
              preventScrollReset:
                null === r || void 0 === r ? void 0 : r.preventScrollReset,
            }),
          replace: (e, n, r) =>
            t.navigate(e, {
              replace: !0,
              state: n,
              preventScrollReset:
                null === r || void 0 === r ? void 0 : r.preventScrollReset,
            }),
        }),
        [t]
      ),
      A = t.basename || '/',
      b = r.useMemo(
        () => ({ router: t, navigator: y, static: !1, basename: A }),
        [t, y, A]
      );
    return r.createElement(
      r.Fragment,
      null,
      r.createElement(
        $e.Provider,
        { value: b },
        r.createElement(
          et.Provider,
          { value: i },
          r.createElement(
            nt.Provider,
            { value: g.current },
            r.createElement(
              tt.Provider,
              { value: l },
              r.createElement(
                zt,
                {
                  basename: A,
                  location: i.location,
                  navigationType: i.historyAction,
                  navigator: y,
                },
                r.createElement(jt, {
                  routes: t.routes,
                  future: t.future,
                  state: i,
                })
              )
            )
          )
        )
      ),
      null
    );
  }
  var jt = r.memo(function (e) {
    let { routes: t, future: n, state: r } = e;
    return mt(t, void 0, r, n);
  });
  function Lt(e) {
    return (function (e) {
      let t = r.useContext(at).outlet;
      return t ? r.createElement(ft.Provider, { value: e }, t) : t;
    })(e.context);
  }
  function zt(e) {
    let {
      basename: t = '/',
      children: n = null,
      location: i,
      navigationType: o = 'POP',
      navigator: a,
      static: s = !1,
    } = e;
    y(
      !lt(),
      'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
    );
    let l = t.replace(/^\/*/, '/'),
      u = r.useMemo(
        () => ({ basename: l, navigator: a, static: s, future: {} }),
        [l, a, s]
      );
    'string' === typeof i && (i = S(i));
    let {
        pathname: c = '/',
        search: d = '',
        hash: h = '',
        state: f = null,
        key: p = 'default',
      } = i,
      m = r.useMemo(() => {
        let e = _(c, l);
        return null == e
          ? null
          : {
              location: { pathname: e, search: d, hash: h, state: f, key: p },
              navigationType: o,
            };
      }, [l, c, d, h, f, p, o]);
    return (
      A(
        null != m,
        '<Router basename="'
          .concat(l, '"> is not able to match the URL "')
          .concat(c)
          .concat(d)
          .concat(
            h,
            '" because it does not start with the basename, so the <Router> won\'t render anything.'
          )
      ),
      null == m
        ? null
        : r.createElement(
            it.Provider,
            { value: u },
            r.createElement(ot.Provider, { children: n, value: m })
          )
    );
  }
  r.Component;
  var Nt = 'get',
    Bt = 'application/x-www-form-urlencoded';
  function Vt(e) {
    return null != e && 'string' === typeof e.tagName;
  }
  var Ot = null;
  var It = new Set([
    'application/x-www-form-urlencoded',
    'multipart/form-data',
    'text/plain',
  ]);
  function Ut(e) {
    return null == e || It.has(e)
      ? e
      : (A(
          !1,
          '"'
            .concat(
              e,
              '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` and will default to "'
            )
            .concat(Bt, '"')
        ),
        null);
  }
  function Zt(e, t) {
    let n, r, i, o, a;
    if (Vt((s = e)) && 'form' === s.tagName.toLowerCase()) {
      let a = e.getAttribute('action');
      (r = a ? _(a, t) : null),
        (n = e.getAttribute('method') || Nt),
        (i = Ut(e.getAttribute('enctype')) || Bt),
        (o = new FormData(e));
    } else if (
      (function (e) {
        return Vt(e) && 'button' === e.tagName.toLowerCase();
      })(e) ||
      ((function (e) {
        return Vt(e) && 'input' === e.tagName.toLowerCase();
      })(e) &&
        ('submit' === e.type || 'image' === e.type))
    ) {
      let a = e.form;
      if (null == a)
        throw new Error(
          'Cannot submit a <button> or <input type="submit"> without a <form>'
        );
      let s = e.getAttribute('formaction') || a.getAttribute('action');
      if (
        ((r = s ? _(s, t) : null),
        (n = e.getAttribute('formmethod') || a.getAttribute('method') || Nt),
        (i =
          Ut(e.getAttribute('formenctype')) ||
          Ut(a.getAttribute('enctype')) ||
          Bt),
        (o = new FormData(a, e)),
        !(function () {
          if (null === Ot)
            try {
              new FormData(document.createElement('form'), 0), (Ot = !1);
            } catch (e) {
              Ot = !0;
            }
          return Ot;
        })())
      ) {
        let { name: t, type: n, value: r } = e;
        if ('image' === n) {
          let e = t ? ''.concat(t, '.') : '';
          o.append(''.concat(e, 'x'), '0'), o.append(''.concat(e, 'y'), '0');
        } else t && o.append(t, r);
      }
    } else {
      if (Vt(e))
        throw new Error(
          'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
        );
      (n = Nt), (r = null), (i = Bt), (a = e);
    }
    var s;
    return (
      o && 'text/plain' === i && ((a = o), (o = void 0)),
      { action: r, method: n.toLowerCase(), encType: i, formData: o, body: a }
    );
  }
  function _t(e, t) {
    if (!1 === e || null === e || 'undefined' === typeof e) throw new Error(t);
  }
  async function Wt(e, t) {
    if (e.id in t) return t[e.id];
    try {
      let n = await import(e.module);
      return (t[e.id] = n), n;
    } catch (n) {
      return (
        console.error(
          'Error loading route module `'.concat(
            e.module,
            '`, reloading page...'
          )
        ),
        console.error(n),
        window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
        window.location.reload(),
        new Promise(() => {})
      );
    }
  }
  function Ht(e) {
    return null != e && 'string' === typeof e.page;
  }
  function Jt(e) {
    return (
      null != e &&
      (null == e.href
        ? 'preload' === e.rel &&
          'string' === typeof e.imageSrcSet &&
          'string' === typeof e.imageSizes
        : 'string' === typeof e.rel && 'string' === typeof e.href)
    );
  }
  function Yt(e, t, n, r, i, o) {
    let a = (e, t) => !n[t] || e.route.id !== n[t].route.id,
      s = (e, t) => {
        var r;
        return (
          n[t].pathname !== e.pathname ||
          ((null === (r = n[t].route.path) || void 0 === r
            ? void 0
            : r.endsWith('*')) &&
            n[t].params['*'] !== e.params['*'])
        );
      };
    return 'assets' === o
      ? t.filter((e, t) => a(e, t) || s(e, t))
      : 'data' === o
        ? t.filter((t, o) => {
            let l = r.routes[t.route.id];
            if (!l || !l.hasLoader) return !1;
            if (a(t, o) || s(t, o)) return !0;
            if (t.route.shouldRevalidate) {
              var u;
              let r = t.route.shouldRevalidate({
                currentUrl: new URL(
                  i.pathname + i.search + i.hash,
                  window.origin
                ),
                currentParams:
                  (null === (u = n[0]) || void 0 === u ? void 0 : u.params) ||
                  {},
                nextUrl: new URL(e, window.origin),
                nextParams: t.params,
                defaultShouldRevalidate: !0,
              });
              if ('boolean' === typeof r) return r;
            }
            return !0;
          })
        : [];
  }
  function Xt(e) {
    return [...new Set(e)];
  }
  function Qt(e, t) {
    let n = new Set(),
      r = new Set(t);
    return e.reduce((e, i) => {
      if (t && !Ht(i) && 'script' === i.as && i.href && r.has(i.href)) return e;
      let o = JSON.stringify(
        (function (e) {
          let t = {},
            n = Object.keys(e).sort();
          for (let r of n) t[r] = e[r];
          return t;
        })(i)
      );
      return n.has(o) || (n.add(o), e.push({ key: o, link: i })), e;
    }, []);
  }
  function Gt(e) {
    return { __html: e };
  }
  Symbol('SingleFetchRedirect');
  function Kt(e) {
    let t =
      'string' === typeof e
        ? new URL(
            e,
            'undefined' === typeof window
              ? 'server://singlefetch/'
              : window.location.origin
          )
        : e;
    return (
      '/' === t.pathname
        ? (t.pathname = '_root.data')
        : (t.pathname = ''.concat(t.pathname.replace(/\/$/, ''), '.data')),
      t
    );
  }
  r.Component;
  function qt(e) {
    let { error: t, isOutsideRemixApp: n } = e;
    console.error(t);
    let i,
      o = r.createElement('script', {
        dangerouslySetInnerHTML: {
          __html:
            '\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."\n        );\n      ',
        },
      });
    if ($(t))
      return r.createElement(
        $t,
        { title: 'Unhandled Thrown Response!' },
        r.createElement(
          'h1',
          { style: { fontSize: '24px' } },
          t.status,
          ' ',
          t.statusText
        ),
        o
      );
    if (t instanceof Error) i = t;
    else {
      let e =
        null == t
          ? 'Unknown Error'
          : 'object' === typeof t && 'toString' in t
            ? t.toString()
            : JSON.stringify(t);
      i = new Error(e);
    }
    return r.createElement(
      $t,
      { title: 'Application Error!', isOutsideRemixApp: n },
      r.createElement(
        'h1',
        { style: { fontSize: '24px' } },
        'Application Error'
      ),
      r.createElement(
        'pre',
        {
          style: {
            padding: '2rem',
            background: 'hsla(10, 50%, 50%, 0.1)',
            color: 'red',
            overflow: 'auto',
          },
        },
        i.stack
      ),
      o
    );
  }
  function $t(e) {
    var t;
    let { title: n, renderScripts: i, isOutsideRemixApp: o, children: a } = e,
      { routeModules: s } = on();
    return null !== (t = s.root) && void 0 !== t && t.Layout && !o
      ? a
      : r.createElement(
          'html',
          { lang: 'en' },
          r.createElement(
            'head',
            null,
            r.createElement('meta', { charSet: 'utf-8' }),
            r.createElement('meta', {
              name: 'viewport',
              content: 'width=device-width,initial-scale=1,viewport-fit=cover',
            }),
            r.createElement('title', null, n)
          ),
          r.createElement(
            'body',
            null,
            r.createElement(
              'main',
              {
                style: { fontFamily: 'system-ui, sans-serif', padding: '2rem' },
              },
              a,
              i ? r.createElement(hn, null) : null
            )
          )
        );
  }
  function en(e) {
    return !e;
  }
  function tn() {
    let e = r.useContext($e);
    return (
      _t(
        e,
        'You must render this element inside a <DataRouterContext.Provider> element'
      ),
      e
    );
  }
  function nn() {
    let e = r.useContext(et);
    return (
      _t(
        e,
        'You must render this element inside a <DataRouterStateContext.Provider> element'
      ),
      e
    );
  }
  var rn = r.createContext(void 0);
  function on() {
    let e = r.useContext(rn);
    return (
      _t(e, 'You must render this element inside a <HydratedRouter> element'), e
    );
  }
  function an(e, t) {
    return (n) => {
      e && e(n), n.defaultPrevented || t(n);
    };
  }
  function sn(e, t, n) {
    if (n && !dn) return [e[0]];
    if (t) {
      let n = e.findIndex((e) => void 0 !== t[e.route.id]);
      return e.slice(0, n + 1);
    }
    return e;
  }
  function ln(e) {
    let { page: t } = e,
      n = c(e, d),
      { router: i } = tn(),
      o = r.useMemo(
        () => C(i.routes, t, i.basename),
        [i.routes, t, i.basename]
      );
    return o ? r.createElement(cn, u({ page: t, matches: o }, n)) : null;
  }
  function un(e) {
    let { manifest: t, routeModules: n } = on(),
      [i, o] = r.useState([]);
    return (
      r.useEffect(() => {
        let r = !1;
        return (
          (async function (e, t, n) {
            return Qt(
              (
                await Promise.all(
                  e.map(async (e) => {
                    let r = t.routes[e.route.id];
                    if (r) {
                      let e = await Wt(r, n);
                      return e.links ? e.links() : [];
                    }
                    return [];
                  })
                )
              )
                .flat(1)
                .filter(Jt)
                .filter((e) => 'stylesheet' === e.rel || 'preload' === e.rel)
                .map((e) =>
                  'stylesheet' === e.rel
                    ? u(u({}, e), {}, { rel: 'prefetch', as: 'style' })
                    : u(u({}, e), {}, { rel: 'prefetch' })
                )
            );
          })(e, t, n).then((e) => {
            r || o(e);
          }),
          () => {
            r = !0;
          }
        );
      }, [e, t, n]),
      i
    );
  }
  function cn(e) {
    let { page: t, matches: n } = e,
      i = c(e, h),
      o = ut(),
      { manifest: a, routeModules: s } = on(),
      { loaderData: l, matches: d } = nn(),
      f = r.useMemo(() => Yt(t, n, d, a, o, 'data'), [t, n, d, a, o]),
      p = r.useMemo(() => Yt(t, n, d, a, o, 'assets'), [t, n, d, a, o]),
      m = r.useMemo(() => {
        if (t === o.pathname + o.search + o.hash) return [];
        let e = new Set(),
          r = !1;
        if (
          (n.forEach((t) => {
            var n;
            let i = a.routes[t.route.id];
            i &&
              i.hasLoader &&
              ((!f.some((e) => e.route.id === t.route.id) &&
                t.route.id in l &&
                null !== (n = s[t.route.id]) &&
                void 0 !== n &&
                n.shouldRevalidate) ||
              i.hasClientLoader
                ? (r = !0)
                : e.add(t.route.id));
          }),
          0 === e.size)
        )
          return [];
        let i = Kt(t);
        return (
          r &&
            e.size > 0 &&
            i.searchParams.set(
              '_routes',
              n
                .filter((t) => e.has(t.route.id))
                .map((e) => e.route.id)
                .join(',')
            ),
          [i.pathname + i.search]
        );
      }, [l, o, a, f, n, t, s]),
      g = r.useMemo(
        () =>
          (function (e, t) {
            return Xt(
              e
                .map((e) => {
                  let n = t.routes[e.route.id];
                  if (!n) return [];
                  let r = [n.module];
                  return n.imports && (r = r.concat(n.imports)), r;
                })
                .flat(1)
            );
          })(p, a),
        [p, a]
      ),
      v = un(p);
    return r.createElement(
      r.Fragment,
      null,
      m.map((e) =>
        r.createElement(
          'link',
          u({ key: e, rel: 'prefetch', as: 'fetch', href: e }, i)
        )
      ),
      g.map((e) =>
        r.createElement('link', u({ key: e, rel: 'modulepreload', href: e }, i))
      ),
      v.map((e) => {
        let { key: t, link: n } = e;
        return r.createElement('link', u({ key: t }, n));
      })
    );
  }
  rn.displayName = 'FrameworkContext';
  var dn = !1;
  function hn(e) {
    let {
        manifest: t,
        serverHandoffString: n,
        isSpaMode: i,
        renderMeta: o,
      } = on(),
      { router: a, static: s, staticContext: l } = tn(),
      { matches: c } = nn(),
      d = en(i);
    o && (o.didRenderScripts = !0);
    let h = sn(c, null, i);
    r.useEffect(() => {
      dn = !0;
    }, []);
    let f = r.useMemo(() => {
        var i;
        let o = l
            ? 'window.__reactRouterContext = '
                .concat(n, ';')
                .concat(
                  'window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());'
                )
            : ' ',
          c = s
            ? ''
                .concat(
                  null !== (i = t.hmr) && void 0 !== i && i.runtime
                    ? 'import '.concat(JSON.stringify(t.hmr.runtime), ';')
                    : ''
                )
                .concat(d ? '' : 'import '.concat(JSON.stringify(t.url)), ';\n')
                .concat(
                  h
                    .map((e, n) =>
                      'import * as route'
                        .concat(n, ' from ')
                        .concat(
                          JSON.stringify(t.routes[e.route.id].module),
                          ';'
                        )
                    )
                    .join('\n'),
                  '\n  '
                )
                .concat(
                  d
                    ? 'window.__reactRouterManifest = '.concat(
                        JSON.stringify(
                          (function (e, t) {
                            let n = new Set(
                                t.state.matches.map((e) => e.route.id)
                              ),
                              r = t.state.location.pathname
                                .split('/')
                                .filter(Boolean),
                              i = ['/'];
                            for (r.pop(); r.length > 0; )
                              i.push('/'.concat(r.join('/'))), r.pop();
                            i.forEach((e) => {
                              let r = C(t.routes, e, t.basename);
                              r && r.forEach((e) => n.add(e.route.id));
                            });
                            let o = [...n].reduce(
                              (t, n) => Object.assign(t, { [n]: e.routes[n] }),
                              {}
                            );
                            return u(u({}, e), {}, { routes: o });
                          })(t, a),
                          null,
                          2
                        ),
                        ';'
                      )
                    : '',
                  '\n  window.__reactRouterRouteModules = {'
                )
                .concat(
                  h
                    .map((e, t) =>
                      ''.concat(JSON.stringify(e.route.id), ':route').concat(t)
                    )
                    .join(','),
                  '};\n\nimport('
                )
                .concat(JSON.stringify(t.entry.module), ');')
            : ' ';
        return r.createElement(
          r.Fragment,
          null,
          r.createElement(
            'script',
            u(
              u({}, e),
              {},
              {
                suppressHydrationWarning: !0,
                dangerouslySetInnerHTML: Gt(o),
                type: void 0,
              }
            )
          ),
          r.createElement(
            'script',
            u(
              u({}, e),
              {},
              {
                suppressHydrationWarning: !0,
                dangerouslySetInnerHTML: Gt(c),
                type: 'module',
                async: !0,
              }
            )
          )
        );
      }, []),
      p = h
        .map((e) => {
          let n = t.routes[e.route.id];
          return n ? (n.imports || []).concat([n.module]) : [];
        })
        .flat(1),
      m = dn ? [] : t.entry.imports.concat(p);
    return dn
      ? null
      : r.createElement(
          r.Fragment,
          null,
          d
            ? null
            : r.createElement('link', {
                rel: 'modulepreload',
                href: t.url,
                crossOrigin: e.crossOrigin,
              }),
          r.createElement('link', {
            rel: 'modulepreload',
            href: t.entry.module,
            crossOrigin: e.crossOrigin,
          }),
          ((g = m), [...new Set(g)]).map((t) =>
            r.createElement('link', {
              key: t,
              rel: 'modulepreload',
              href: t,
              crossOrigin: e.crossOrigin,
            })
          ),
          f
        );
    var g;
  }
  function fn() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return (e) => {
      t.forEach((t) => {
        'function' === typeof t ? t(e) : null != t && (t.current = e);
      });
    };
  }
  var pn =
    'undefined' !== typeof window &&
    'undefined' !== typeof window.document &&
    'undefined' !== typeof window.document.createElement;
  try {
    pn && (window.__reactRouterVersion = '7.1.0');
  } catch (Zb) {}
  function mn() {
    var e;
    let t =
      null === (e = window) || void 0 === e
        ? void 0
        : e.__staticRouterHydrationData;
    return t && t.errors && (t = u(u({}, t), {}, { errors: gn(t.errors) })), t;
  }
  function gn(e) {
    if (!e) return null;
    let t = Object.entries(e),
      n = {};
    for (let [r, i] of t)
      if (i && 'RouteErrorResponse' === i.__type)
        n[r] = new q(i.status, i.statusText, i.data, !0 === i.internal);
      else if (i && 'Error' === i.__type) {
        if (i.__subType) {
          let e = window[i.__subType];
          if ('function' === typeof e)
            try {
              let t = new e(i.message);
              (t.stack = ''), (n[r] = t);
            } catch (Zb) {}
        }
        if (null == n[r]) {
          let e = new Error(i.message);
          (e.stack = ''), (n[r] = e);
        }
      } else n[r] = i;
    return n;
  }
  var vn = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    yn = r.forwardRef(function (e, t) {
      let n,
        {
          onClick: i,
          discover: o = 'render',
          prefetch: a = 'none',
          relative: s,
          reloadDocument: l,
          replace: d,
          state: h,
          target: p,
          to: m,
          preventScrollReset: g,
          viewTransition: v,
        } = e,
        b = c(e, f),
        { basename: x } = r.useContext(it),
        S = 'string' === typeof m && vn.test(m),
        k = !1;
      if ('string' === typeof m && S && ((n = m), pn))
        try {
          let e = new URL(window.location.href),
            t = m.startsWith('//') ? new URL(e.protocol + m) : new URL(m),
            n = _(t.pathname, x);
          t.origin === e.origin && null != n
            ? (m = n + t.search + t.hash)
            : (k = !0);
        } catch (Zb) {
          A(
            !1,
            '<Link to="'.concat(
              m,
              '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.'
            )
          );
        }
      let E = (function (e) {
          let { relative: t } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          y(
            lt(),
            'useHref() may be used only in the context of a <Router> component.'
          );
          let { basename: n, navigator: i } = r.useContext(it),
            { hash: o, pathname: a, search: s } = pt(e, { relative: t }),
            l = a;
          return (
            '/' !== n && (l = '/' === a ? n : X([n, a])),
            i.createHref({ pathname: l, search: s, hash: o })
          );
        })(m, { relative: s }),
        [P, C, T] = (function (e, t) {
          let n = r.useContext(rn),
            [i, o] = r.useState(!1),
            [a, s] = r.useState(!1),
            {
              onFocus: l,
              onBlur: u,
              onMouseEnter: c,
              onMouseLeave: d,
              onTouchStart: h,
            } = t,
            f = r.useRef(null);
          r.useEffect(() => {
            if (('render' === e && s(!0), 'viewport' === e)) {
              let e = new IntersectionObserver(
                (e) => {
                  e.forEach((e) => {
                    s(e.isIntersecting);
                  });
                },
                { threshold: 0.5 }
              );
              return (
                f.current && e.observe(f.current),
                () => {
                  e.disconnect();
                }
              );
            }
          }, [e]),
            r.useEffect(() => {
              if (i) {
                let e = setTimeout(() => {
                  s(!0);
                }, 100);
                return () => {
                  clearTimeout(e);
                };
              }
            }, [i]);
          let p = () => {
              o(!0);
            },
            m = () => {
              o(!1), s(!1);
            };
          return n
            ? 'intent' !== e
              ? [a, f, {}]
              : [
                  a,
                  f,
                  {
                    onFocus: an(l, p),
                    onBlur: an(u, m),
                    onMouseEnter: an(c, p),
                    onMouseLeave: an(d, m),
                    onTouchStart: an(h, p),
                  },
                ]
            : [!1, f, {}];
        })(a, b),
        F = (function (e) {
          let {
              target: t,
              replace: n,
              state: i,
              preventScrollReset: o,
              relative: a,
              viewTransition: s,
            } = arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : {},
            l = ht(),
            u = ut(),
            c = pt(e, { relative: a });
          return r.useCallback(
            (r) => {
              if (
                (function (e, t) {
                  return (
                    0 === e.button &&
                    (!t || '_self' === t) &&
                    !(function (e) {
                      return !!(
                        e.metaKey ||
                        e.altKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      );
                    })(e)
                  );
                })(r, t)
              ) {
                r.preventDefault();
                let t = void 0 !== n ? n : w(u) === w(c);
                l(e, {
                  replace: t,
                  state: i,
                  preventScrollReset: o,
                  relative: a,
                  viewTransition: s,
                });
              }
            },
            [u, l, c, n, i, t, e, o, a, s]
          );
        })(m, {
          replace: d,
          state: h,
          target: p,
          preventScrollReset: g,
          relative: s,
          viewTransition: v,
        });
      let D = r.createElement(
        'a',
        u(
          u(u({}, b), T),
          {},
          {
            href: n || E,
            onClick:
              k || l
                ? i
                : function (e) {
                    i && i(e), e.defaultPrevented || F(e);
                  },
            ref: fn(t, C),
            target: p,
            'data-discover': S || 'render' !== o ? void 0 : 'true',
          }
        )
      );
      return P && !S
        ? r.createElement(r.Fragment, null, D, r.createElement(ln, { page: E }))
        : D;
    });
  yn.displayName = 'Link';
  var An = r.forwardRef(function (e, t) {
    let {
        'aria-current': n = 'page',
        caseSensitive: i = !1,
        className: o = '',
        end: a = !1,
        style: s,
        to: l,
        viewTransition: d,
        children: h,
      } = e,
      f = c(e, p),
      m = pt(l, { relative: f.relative }),
      g = ut(),
      v = r.useContext(et),
      { navigator: A, basename: b } = r.useContext(it),
      x =
        null != v &&
        (function (e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = r.useContext(tt);
          y(
            null != n,
            "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
          );
          let { basename: i } = wn('useViewTransitionState'),
            o = pt(e, { relative: t.relative });
          if (!n.isTransitioning) return !1;
          let a =
              _(n.currentLocation.pathname, i) || n.currentLocation.pathname,
            s = _(n.nextLocation.pathname, i) || n.nextLocation.pathname;
          return null != U(o.pathname, s) || null != U(o.pathname, a);
        })(m) &&
        !0 === d,
      w = A.encodeLocation ? A.encodeLocation(m).pathname : m.pathname,
      S = g.pathname,
      k =
        v && v.navigation && v.navigation.location
          ? v.navigation.location.pathname
          : null;
    i ||
      ((S = S.toLowerCase()),
      (k = k ? k.toLowerCase() : null),
      (w = w.toLowerCase())),
      k && b && (k = _(k, b) || k);
    const E = '/' !== w && w.endsWith('/') ? w.length - 1 : w.length;
    let P,
      C = S === w || (!a && S.startsWith(w) && '/' === S.charAt(E)),
      T =
        null != k &&
        (k === w || (!a && k.startsWith(w) && '/' === k.charAt(w.length))),
      F = { isActive: C, isPending: T, isTransitioning: x },
      D = C ? n : void 0;
    P =
      'function' === typeof o
        ? o(F)
        : [
            o,
            C ? 'active' : null,
            T ? 'pending' : null,
            x ? 'transitioning' : null,
          ]
            .filter(Boolean)
            .join(' ');
    let M = 'function' === typeof s ? s(F) : s;
    return r.createElement(
      yn,
      u(
        u({}, f),
        {},
        {
          'aria-current': D,
          className: P,
          ref: t,
          style: M,
          to: l,
          viewTransition: d,
        }
      ),
      'function' === typeof h ? h(F) : h
    );
  });
  An.displayName = 'NavLink';
  var bn = r.forwardRef((e, t) => {
    let {
        discover: n = 'render',
        fetcherKey: i,
        navigate: o,
        reloadDocument: a,
        replace: s,
        state: l,
        method: d = Nt,
        action: h,
        onSubmit: f,
        relative: p,
        preventScrollReset: g,
        viewTransition: v,
      } = e,
      A = c(e, m),
      b = En(),
      x = (function (e) {
        let { relative: t } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          { basename: n } = r.useContext(it),
          i = r.useContext(at);
        y(i, 'useFormAction must be used inside a RouteContext');
        let [o] = i.matches.slice(-1),
          a = u({}, pt(e || '.', { relative: t })),
          s = ut();
        if (null == e) {
          a.search = s.search;
          let e = new URLSearchParams(a.search),
            t = e.getAll('index');
          if (t.some((e) => '' === e)) {
            e.delete('index'),
              t.filter((e) => e).forEach((t) => e.append('index', t));
            let n = e.toString();
            a.search = n ? '?'.concat(n) : '';
          }
        }
        (e && '.' !== e) ||
          !o.route.index ||
          (a.search = a.search ? a.search.replace(/^\?/, '?index&') : '?index');
        '/' !== n && (a.pathname = '/' === a.pathname ? n : X([n, a.pathname]));
        return w(a);
      })(h, { relative: p }),
      S = 'get' === d.toLowerCase() ? 'get' : 'post',
      k = 'string' === typeof h && vn.test(h);
    return r.createElement(
      'form',
      u(
        u(
          {
            ref: t,
            method: S,
            action: x,
            onSubmit: a
              ? f
              : (e) => {
                  if ((f && f(e), e.defaultPrevented)) return;
                  e.preventDefault();
                  let t = e.nativeEvent.submitter,
                    n =
                      (null === t || void 0 === t
                        ? void 0
                        : t.getAttribute('formmethod')) || d;
                  b(t || e.currentTarget, {
                    fetcherKey: i,
                    method: n,
                    navigate: o,
                    replace: s,
                    state: l,
                    relative: p,
                    preventScrollReset: g,
                    viewTransition: v,
                  });
                },
          },
          A
        ),
        {},
        { 'data-discover': k || 'render' !== n ? void 0 : 'true' }
      )
    );
  });
  function xn(e) {
    return ''.concat(
      e,
      ' must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.'
    );
  }
  function wn(e) {
    let t = r.useContext($e);
    return y(t, xn(e)), t;
  }
  bn.displayName = 'Form';
  var Sn = 0,
    kn = () => '__'.concat(String(++Sn), '__');
  function En() {
    let { router: e } = wn('useSubmit'),
      { basename: t } = r.useContext(it),
      n = kt('useRouteId');
    return r.useCallback(
      async function (r) {
        let i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          { action: o, method: a, encType: s, formData: l, body: u } = Zt(r, t);
        if (!1 === i.navigate) {
          let t = i.fetcherKey || kn();
          await e.fetch(t, n, i.action || o, {
            preventScrollReset: i.preventScrollReset,
            formData: l,
            body: u,
            formMethod: i.method || a,
            formEncType: i.encType || s,
            flushSync: i.flushSync,
          });
        } else
          await e.navigate(i.action || o, {
            preventScrollReset: i.preventScrollReset,
            formData: l,
            body: u,
            formMethod: i.method || a,
            formEncType: i.encType || s,
            replace: i.replace,
            state: i.state,
            fromRouteId: n,
            flushSync: i.flushSync,
            viewTransition: i.viewTransition,
          });
      },
      [e, t, n]
    );
  }
  new TextEncoder();
  var Pn = n(950);
  function Cn(e) {
    return r.createElement(Rt, u({ flushSync: Pn.flushSync }, e));
  }
  const Tn = [
    { title: 'Home', link: '/#home' },
    { title: 'Services', link: '/#services' },
    { title: 'About Us', link: '/#about-us' },
    { title: 'Contact Us', link: '/#contact-us' },
  ];
  var Fn = n(579);
  function Dn(e) {
    let { title: t, link: n, className: r = '', expandToggle: i } = e;
    return (0, Fn.jsx)('li', {
      className:
        '\n    py-2 px-4  \n    sm:font-bold \n    lg:text-xl sm:text-sm text-xl \n    relative '.concat(
          r
        ),
      children: (0, Fn.jsx)(yn, {
        className:
          '\n  hover:text-blue-800 text-blue-900 \n  after:content-[""] \n  after:rounded-xl \n  after:absolute \n  after:left-0 after:bottom-0 \n  after:h-0.5 sm:after:h-1 after:w-0 \n  after:bg-blue-800 \n  after:transition-all after:duration-300 hover:after:w-3/4 \n ',
        href: n,
        children: t,
      }),
    });
  }
  var Mn = {
      color: void 0,
      size: void 0,
      className: void 0,
      style: void 0,
      attr: void 0,
    },
    Rn = r.createContext && r.createContext(Mn),
    jn = ['attr', 'size', 'title'];
  function Ln(e, t) {
    if (null == e) return {};
    var n,
      r,
      i = (function (e, t) {
        if (null == e) return {};
        var n = {};
        for (var r in e)
          if (Object.prototype.hasOwnProperty.call(e, r)) {
            if (t.indexOf(r) >= 0) continue;
            n[r] = e[r];
          }
        return n;
      })(e, t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (r = 0; r < o.length; r++)
        (n = o[r]),
          t.indexOf(n) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]));
    }
    return i;
  }
  function zn() {
    return (
      (zn = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      zn.apply(this, arguments)
    );
  }
  function Nn(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Bn(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? Nn(Object(n), !0).forEach(function (t) {
            Vn(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Nn(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
    }
    return e;
  }
  function Vn(e, t, n) {
    return (
      (t = (function (e) {
        var t = (function (e, t) {
          if ('object' != typeof e || !e) return e;
          var n = e[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(e, t || 'default');
            if ('object' != typeof r) return r;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return ('string' === t ? String : Number)(e);
        })(e, 'string');
        return 'symbol' == typeof t ? t : t + '';
      })(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function On(e) {
    return (
      e &&
      e.map((e, t) =>
        r.createElement(e.tag, Bn({ key: t }, e.attr), On(e.child))
      )
    );
  }
  function In(e) {
    return (t) =>
      r.createElement(Un, zn({ attr: Bn({}, e.attr) }, t), On(e.child));
  }
  function Un(e) {
    var t = (t) => {
      var n,
        { attr: i, size: o, title: a } = e,
        s = Ln(e, jn),
        l = o || t.size || '1em';
      return (
        t.className && (n = t.className),
        e.className && (n = (n ? n + ' ' : '') + e.className),
        r.createElement(
          'svg',
          zn(
            { stroke: 'currentColor', fill: 'currentColor', strokeWidth: '0' },
            t.attr,
            i,
            s,
            {
              className: n,
              style: Bn(Bn({ color: e.color || t.color }, t.style), e.style),
              height: l,
              width: l,
              xmlns: 'http://www.w3.org/2000/svg',
            }
          ),
          a && r.createElement('title', null, a),
          e.children
        )
      );
    };
    return void 0 !== Rn
      ? r.createElement(Rn.Consumer, null, (e) => t(e))
      : t(Mn);
  }
  function Zn(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 512 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L96 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z',
          },
          child: [],
        },
      ],
    })(e);
  }
  const _n = n.p + 'static/media/logo.6874b7e68e51ada0c4ee.png';
  function Wn(e) {
    let { isexpand: t, className: n } = e;
    return (0, Fn.jsx)(yn, {
      className: '\n      '
        .concat(
          n,
          '\n      logo-text \n      md:font-extrabold  \n      bg-gradient-to-tr from-blue-600 via-navy-900 to-blue-800 bg-clip-text \n      text-transparent '
        )
        .concat(t ? 'sm:text-5xl font-extrabold' : 'sm:text-3xl font-bold'),
      to: '/',
      children: (0, Fn.jsx)('img', {
        loading: 'lazy',
        alt: 'app-logo',
        className: 'lg:h-16 h-12 object-fill',
        src: _n,
      }),
    });
  }
  function Hn(e) {
    let { isexpand: t, expandtoggle: n } = e;
    return (0, Fn.jsx)(Fn.Fragment, {
      children: (0, Fn.jsxs)('nav', {
        className: '\n      '.concat(
          t ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
          ' \n      sm:translate-x-0 sm:opacity-100\n      transition-all ease-in-out duration-700\n      sm:block \n      bg-white sm:bg-transparent \n      w-3/4 lg:w-1/2 \n      h-screen sm:h-auto\n      fixed sm:relative \n      top-0\n      right-0 z-50\n    '
        ),
        children: [
          (0, Fn.jsxs)('ul', {
            className:
              'flex sm:flex-row flex-col  transition-all duration-700 ease-in-out sm:mt-0 items-center justify-end gap-x-6 mt-16 w-full',
            children: [
              t && (0, Fn.jsx)(Wn, {}),
              Tn.map((e, t) =>
                (0, r.createElement)(
                  Dn,
                  u(u({ expandToggle: n }, e), {}, { key: t })
                )
              ),
            ],
          }),
          (0, Fn.jsx)('button', {
            onClick: n,
            className:
              'hover:text-blue-700 text-blue-900 cursor-pointer absolute top-5 right-6 sm:hidden text-lg font-extrabold block z-10',
            children: (0, Fn.jsx)(Zn, {}),
          }),
        ],
      }),
    });
  }
  function Jn(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 320 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function Yn(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 448 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function Xn(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 448 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function Qn(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 448 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function Gn(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 448 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function Kn(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 448 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function qn(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 256 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function $n(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 256 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function er(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 512 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function tr(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 448 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function nr(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 512 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function rr(e) {
    return In({
      tag: 'svg',
      attr: { viewBox: '0 0 512 512' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z',
          },
          child: [],
        },
      ],
    })(e);
  }
  function ir(e) {
    const [t, n] = (0, r.useState)(!1),
      i = (0, r.useCallback)(() => (window.scrollY > e ? n(!0) : n(!1)), [e]);
    return (
      (0, r.useEffect)(
        () => (
          window.addEventListener('scroll', i),
          () => window.removeEventListener('scroll', i)
        ),
        [i]
      ),
      [t, n]
    );
  }
  function or() {
    const [e, t] = (0, r.useState)(!1),
      n = ut(),
      [i, o] = ir(100),
      a = (0, r.useMemo)(() => '/' === n.pathname, [n]),
      s = () => {
        t(!e);
      };
    return (
      (0, r.useEffect)(() => console.log(n), [n]),
      (0, Fn.jsxs)(Fn.Fragment, {
        children: [
          e &&
            (0, Fn.jsx)('div', {
              onClick: s,
              className:
                'sticky backdrop-blur-xl min-h-screen w-full top-0 left-bg-sky-900 z-30  transition-all duration-700 ease-in-out md:hidden block',
            }),
          (0, Fn.jsxs)('header', {
            className: ''.concat(
              !a || i ? 'bg-white shadow-lg' : 'sm:bg-transparent bg-white',
              ' fixed  top-0 left-0 w-full px-4 sm:px-10 py-2 flex justify-between items-center gap-x-20 z-50 '
            ),
            children: [
              !e && (0, Fn.jsx)(Wn, {}),
              (0, Fn.jsx)(Hn, { isexpand: e, expandtoggle: s }),
              !e &&
                (0, Fn.jsx)('button', {
                  onClick: s,
                  className:
                    'hover:text-blue-700 text-blue-900 cursor-pointer sm:hidden text-lg font-extrabold block z-10',
                  children: (0, Fn.jsx)(tr, {}),
                }),
            ],
          }),
        ],
      })
    );
  }
  function ar(e) {
    return In({
      tag: 'svg',
      attr: { version: '1.2', baseProfile: 'tiny', viewBox: '0 0 24 24' },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M12 3.172l-6.414 6.414c-.781.781-.781 2.047 0 2.828s2.047.781 2.828 0l1.586-1.586v7.242c0 1.104.895 2 2 2 1.104 0 2-.896 2-2v-7.242l1.586 1.586c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-6.414-6.414z',
          },
          child: [],
        },
      ],
    })(e);
  }
  const sr = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    lr = [
      {
        type: 'mail',
        link: 'mailto:tensoragri@gmail.com',
        icon: (0, Fn.jsx)(nr, {}),
        title: 'Email Us',
        content: 'Send us an email and we\u2019ll get back soon.',
        text: 'tensoragri@gmail.com',
      },
      {
        type: 'whatsapp',
        link: 'https://wa.me/+94770484739',
        icon: (0, Fn.jsx)(Qn, {}),
        title: 'WhatsApp Us',
        content: 'Message us on WhatsApp for instant support',
        text: '077 048 4739',
      },
      {
        type: 'call',
        link: 'tel:+9477 048 4739',
        icon: (0, Fn.jsx)(rr, {}),
        title: 'Call Us',
        content: 'Give us a call and let\u2019s discuss your project.',
        text: '077 048 4739',
      },
    ];
  function ur() {
    var e;
    const [t] = ir(100);
    return (0, Fn.jsxs)('div', {
      className:
        'fixed  flex md:flex-col flex-row-reverse gap-8 md:w-fit w-full justify-between md:px-auto px-5 bottom-2 md:bottom-6 right-0 md:right-10  z-10 ',
      children: [
        (0, Fn.jsx)(cr, {
          onClick: sr,
          className: ''.concat(
            t ? 'opacity-100' : 'opacity-0',
            ' text-blue-600  md:text-white md:bg-blue-600'
          ),
          children: (0, Fn.jsx)(ar, {}),
        }),
        (0, Fn.jsx)(cr, {
          className: 'text-white bg-green-600 hover:bg-green-700',
          href:
            null === (e = lr.find((e) => 'whatsapp' === e.type)) || void 0 === e
              ? void 0
              : e.link,
          children: (0, Fn.jsx)(Qn, { className: 'md:text-2xl text-4xl' }),
        }),
      ],
    });
  }
  function cr(e) {
    let {
      children: t,
      className: n = 'text-blue-600  md:text-white md:bg-blue-600',
      onClick: r,
      href: i,
    } = e;
    return i
      ? (0, Fn.jsx)('a', {
          href: i,
          className: ''.concat(
            n,
            ' \n        transition \n        duration-500\n        border-0 outline-0 \n        ease-in-out \n        md:p-3 p-1\n        rounded-full   \n        cursor-pointer\n        sm:text-2xl text-lg\n        hover:drop-shadow-2xl'
          ),
          children: t,
        })
      : (0, Fn.jsx)('button', {
          onClick: r,
          className: ''.concat(
            n,
            ' \n        transition \n        duration-100\n        border-0 outline-0 \n        ease-in-out \n        md:p-3 p-1\n        rounded-full\n        cursor-pointer   \n        sm:text-2xl text-lg \n        hover:drop-shadow-2xl\n        '
          ),
          children: t,
        });
  }
  function dr() {
    return (0, Fn.jsx)('footer', {
      className: 'bg-gray-100 text-gray-300 py-6',
      children: (0, Fn.jsxs)('div', {
        className: 'max-w-screen-xl mx-auto px-6',
        children: [
          (0, Fn.jsxs)('div', {
            className:
              'flex flex-col md:flex-row justify-center md:justify-between items-center',
            children: [
              (0, Fn.jsxs)('div', {
                className: 'mb-6 md:mb-0 md:text-justify text-center',
                children: [
                  (0, Fn.jsx)(Wn, {}),
                  (0, Fn.jsx)('p', {
                    className: 'text-blue-800 mt-1',
                    children:
                      'Building innovative solutions for a digital world.',
                  }),
                ],
              }),
              (0, Fn.jsx)('div', {
                className: 'flex gap-8',
                children: [
                  [(0, Fn.jsx)(Jn, {}), 'https://facebook.com'],
                  [(0, Fn.jsx)(Xn, {}), 'https://facebook.com'],
                  [(0, Fn.jsx)(Yn, {}), 'https://facebook.com'],
                ].map((e, t) => {
                  let [n, r] = e;
                  return (0, Fn.jsx)(
                    'a',
                    {
                      href: r,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'text-blue-600 text-xl hover:text-blue-800',
                      children: n,
                    },
                    t
                  );
                }),
              }),
            ],
          }),
          (0, Fn.jsx)('div', {
            className: 'mt-8 border-t border-blue-400 pt-4 text-center',
            children: (0, Fn.jsxs)('p', {
              className: 'text-blue-800',
              children: [
                '\xa9 ',
                new Date().getFullYear(),
                ' Your Company. All rights reserved.',
              ],
            }),
          }),
        ],
      }),
    });
  }
  const hr = (0, r.memo)(dr);
  function fr() {
    return (0, Fn.jsxs)(Fn.Fragment, {
      children: [
        (0, Fn.jsx)(or, {}),
        (0, Fn.jsxs)('main', {
          className: 'scroll-smooth transition-all duration-700',
          children: [(0, Fn.jsx)(ur, {}), (0, Fn.jsx)(Lt, {})],
        }),
        (0, Fn.jsx)(hr, {}),
      ],
    });
  }
  function pr(e) {
    let { children: t } = e;
    return (0, Fn.jsx)('h1', {
      className:
        'md:text-4xl text-2xl font-bold text-center text-blue-800 mb-12',
      children: t,
    });
  }
  function mr(e) {
    if ('undefined' === typeof Proxy) return e;
    const t = new Map();
    return new Proxy(
      function () {
        return e(...arguments);
      },
      {
        get: (n, r) =>
          'create' === r ? e : (t.has(r) || t.set(r, e(r)), t.get(r)),
      }
    );
  }
  function gr(e) {
    return null !== e && 'object' === typeof e && 'function' === typeof e.start;
  }
  const vr = (e) => Array.isArray(e);
  function yr(e, t) {
    if (!Array.isArray(t)) return !1;
    const n = t.length;
    if (n !== e.length) return !1;
    for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
    return !0;
  }
  function Ar(e) {
    return 'string' === typeof e || Array.isArray(e);
  }
  function br(e) {
    const t = [{}, {}];
    return (
      null === e ||
        void 0 === e ||
        e.values.forEach((e, n) => {
          (t[0][n] = e.get()), (t[1][n] = e.getVelocity());
        }),
      t
    );
  }
  function xr(e, t, n, r) {
    if ('function' === typeof t) {
      const [i, o] = br(r);
      t = t(void 0 !== n ? n : e.custom, i, o);
    }
    if (
      ('string' === typeof t && (t = e.variants && e.variants[t]),
      'function' === typeof t)
    ) {
      const [i, o] = br(r);
      t = t(void 0 !== n ? n : e.custom, i, o);
    }
    return t;
  }
  function wr(e, t, n) {
    const r = e.getProps();
    return xr(r, t, void 0 !== n ? n : r.custom, e);
  }
  const Sr = [
      'animate',
      'whileInView',
      'whileFocus',
      'whileHover',
      'whileTap',
      'whileDrag',
      'exit',
    ],
    kr = ['initial', ...Sr],
    Er = [
      'transformPerspective',
      'x',
      'y',
      'z',
      'translateX',
      'translateY',
      'translateZ',
      'scale',
      'scaleX',
      'scaleY',
      'rotate',
      'rotateX',
      'rotateY',
      'rotateZ',
      'skew',
      'skewX',
      'skewY',
    ],
    Pr = new Set(Er),
    Cr = (e) => 1e3 * e,
    Tr = (e) => e / 1e3,
    Fr = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
    Dr = { type: 'keyframes', duration: 0.8 },
    Mr = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
    Rr = (e, t) => {
      let { keyframes: n } = t;
      return n.length > 2
        ? Dr
        : Pr.has(e)
          ? e.startsWith('scale')
            ? {
                type: 'spring',
                stiffness: 550,
                damping: 0 === n[1] ? 2 * Math.sqrt(550) : 30,
                restSpeed: 10,
              }
            : Fr
          : Mr;
    };
  function jr(e, t) {
    return e ? e[t] || e.default || e : void 0;
  }
  const Lr = !1,
    zr = !1,
    Nr = !1,
    Br = (e) => null !== e;
  function Vr(e, t, n) {
    let { repeat: r, repeatType: i = 'loop' } = t;
    const o = e.filter(Br),
      a = r && 'loop' !== i && r % 2 === 1 ? 0 : o.length - 1;
    return a && void 0 !== n ? n : o[a];
  }
  const Or = (e) => e;
  const Ir = [
    'read',
    'resolveKeyframes',
    'update',
    'preRender',
    'render',
    'postRender',
  ];
  function Ur(e, t) {
    let n = !1,
      r = !0;
    const i = { delta: 0, timestamp: 0, isProcessing: !1 },
      o = () => (n = !0),
      a = Ir.reduce(
        (e, t) => (
          (e[t] = (function (e) {
            let t = new Set(),
              n = new Set(),
              r = !1,
              i = !1;
            const o = new WeakSet();
            let a = { delta: 0, timestamp: 0, isProcessing: !1 };
            function s(t) {
              o.has(t) && (l.schedule(t), e()), t(a);
            }
            const l = {
              schedule: function (e) {
                const i =
                  arguments.length > 2 &&
                  void 0 !== arguments[2] &&
                  arguments[2] &&
                  r
                    ? t
                    : n;
                return (
                  arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1] &&
                    o.add(e),
                  i.has(e) || i.add(e),
                  e
                );
              },
              cancel: (e) => {
                n.delete(e), o.delete(e);
              },
              process: (e) => {
                (a = e),
                  r
                    ? (i = !0)
                    : ((r = !0),
                      ([t, n] = [n, t]),
                      t.forEach(s),
                      t.clear(),
                      (r = !1),
                      i && ((i = !1), l.process(e)));
              },
            };
            return l;
          })(o)),
          e
        ),
        {}
      ),
      {
        read: s,
        resolveKeyframes: l,
        update: u,
        preRender: c,
        render: d,
        postRender: h,
      } = a,
      f = () => {
        const o = zr ? i.timestamp : performance.now();
        (n = !1),
          (i.delta = r ? 1e3 / 60 : Math.max(Math.min(o - i.timestamp, 40), 1)),
          (i.timestamp = o),
          (i.isProcessing = !0),
          s.process(i),
          l.process(i),
          u.process(i),
          c.process(i),
          d.process(i),
          h.process(i),
          (i.isProcessing = !1),
          n && t && ((r = !1), e(f));
      },
      p = Ir.reduce((t, o) => {
        const s = a[o];
        return (
          (t[o] = function (t) {
            let o =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              a =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return (
              n || ((n = !0), (r = !0), i.isProcessing || e(f)),
              s.schedule(t, o, a)
            );
          }),
          t
        );
      }, {});
    return {
      schedule: p,
      cancel: (e) => {
        for (let t = 0; t < Ir.length; t++) a[Ir[t]].cancel(e);
      },
      state: i,
      steps: a,
    };
  }
  const {
      schedule: Zr,
      cancel: _r,
      state: Wr,
      steps: Hr,
    } = Ur(
      'undefined' !== typeof requestAnimationFrame ? requestAnimationFrame : Or,
      !0
    ),
    Jr = (e, t, n) =>
      (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e;
  function Yr(e, t, n, r) {
    if (e === t && n === r) return Or;
    const i = (t) =>
      (function (e, t, n, r, i) {
        let o,
          a,
          s = 0;
        do {
          (a = t + (n - t) / 2),
            (o = Jr(a, r, i) - e),
            o > 0 ? (n = a) : (t = a);
        } while (Math.abs(o) > 1e-7 && ++s < 12);
        return a;
      })(t, 0, 1, e, n);
    return (e) => (0 === e || 1 === e ? e : Jr(i(e), t, r));
  }
  const Xr = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
    Qr = (e) => (t) => 1 - e(1 - t),
    Gr = Yr(0.33, 1.53, 0.69, 0.99),
    Kr = Qr(Gr),
    qr = Xr(Kr),
    $r = (e) =>
      (e *= 2) < 1 ? 0.5 * Kr(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
    ei = (e) => 1 - Math.sin(Math.acos(e)),
    ti = Qr(ei),
    ni = Xr(ei),
    ri = (e) =>
      /^0(?:[\0-\x08\x0E-\x1F!-\x2D\/-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+$/.test(
        e
      );
  let ii = Or,
    oi = Or;
  const ai = (e) => /^-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/.test(e),
    si = (e) => (t) => 'string' === typeof t && t.startsWith(e),
    li = si('--'),
    ui = si('var(--'),
    ci = (e) => !!ui(e) && di.test(e.split('/*')[0].trim()),
    di =
      /var\(--(?:[\x2D0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\x2D0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*,(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:(?![\t-\r \(\)\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uD800-\uDFFF\uFEFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\((?:(?:(?![\(\)\uD800-\uDFFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])|\((?:(?![\(\)\uD800-\uDFFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])*\))*\))+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)\)$/i,
    hi =
      /^var\(--(?:([\x2D0-9A-Z_a-z]+)|([\x2D0-9A-Z_a-z]+), ?([ #%\(\),-\.0-9A-Za-z]+))\)/;
  function fi(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
    oi(
      n <= 4,
      'Max CSS variable fallback depth detected in property "'.concat(
        e,
        '". This may indicate a circular fallback dependency.'
      )
    );
    const [r, i] = (function (e) {
      const t = hi.exec(e);
      if (!t) return [,];
      const [, n, r, i] = t;
      return ['--'.concat(null !== n && void 0 !== n ? n : r), i];
    })(e);
    if (!r) return;
    const o = window.getComputedStyle(t).getPropertyValue(r);
    if (o) {
      const e = o.trim();
      return ai(e) ? parseFloat(e) : e;
    }
    return ci(i) ? fi(i, t, n + 1) : i;
  }
  const pi = (e, t, n) => (n > t ? t : n < e ? e : n),
    mi = {
      test: (e) => 'number' === typeof e,
      parse: parseFloat,
      transform: (e) => e,
    },
    gi = u(u({}, mi), {}, { transform: (e) => pi(0, 1, e) }),
    vi = u(u({}, mi), {}, { default: 1 }),
    yi = (e) => ({
      test: (t) =>
        'string' === typeof t && t.endsWith(e) && 1 === t.split(' ').length,
      parse: parseFloat,
      transform: (t) => ''.concat(t).concat(e),
    }),
    Ai = yi('deg'),
    bi = yi('%'),
    xi = yi('px'),
    wi = yi('vh'),
    Si = yi('vw'),
    ki = u(
      u({}, bi),
      {},
      {
        parse: (e) => bi.parse(e) / 100,
        transform: (e) => bi.transform(100 * e),
      }
    ),
    Ei = new Set([
      'width',
      'height',
      'top',
      'left',
      'right',
      'bottom',
      'x',
      'y',
      'translateX',
      'translateY',
    ]),
    Pi = (e) => e === mi || e === xi,
    Ci = (e, t) => parseFloat(e.split(', ')[t]),
    Ti = (e, t) => (n, r) => {
      let { transform: i } = r;
      if ('none' === i || !i) return 0;
      const o = i.match(
        /^matrix3d\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)\)$/
      );
      if (o) return Ci(o[1], t);
      {
        const t = i.match(
          /^matrix\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)\)$/
        );
        return t ? Ci(t[1], e) : 0;
      }
    },
    Fi = new Set(['x', 'y', 'z']),
    Di = Er.filter((e) => !Fi.has(e));
  const Mi = {
    width: (e, t) => {
      let { x: n } = e,
        { paddingLeft: r = '0', paddingRight: i = '0' } = t;
      return n.max - n.min - parseFloat(r) - parseFloat(i);
    },
    height: (e, t) => {
      let { y: n } = e,
        { paddingTop: r = '0', paddingBottom: i = '0' } = t;
      return n.max - n.min - parseFloat(r) - parseFloat(i);
    },
    top: (e, t) => {
      let { top: n } = t;
      return parseFloat(n);
    },
    left: (e, t) => {
      let { left: n } = t;
      return parseFloat(n);
    },
    bottom: (e, t) => {
      let { y: n } = e,
        { top: r } = t;
      return parseFloat(r) + (n.max - n.min);
    },
    right: (e, t) => {
      let { x: n } = e,
        { left: r } = t;
      return parseFloat(r) + (n.max - n.min);
    },
    x: Ti(4, 13),
    y: Ti(5, 14),
  };
  (Mi.translateX = Mi.x), (Mi.translateY = Mi.y);
  const Ri = (e) => (t) => t.test(e),
    ji = [
      mi,
      xi,
      bi,
      Ai,
      Si,
      wi,
      { test: (e) => 'auto' === e, parse: (e) => e },
    ],
    Li = (e) => ji.find(Ri(e)),
    zi = new Set();
  let Ni = !1,
    Bi = !1;
  function Vi() {
    if (Bi) {
      const e = Array.from(zi).filter((e) => e.needsMeasurement),
        t = new Set(e.map((e) => e.element)),
        n = new Map();
      t.forEach((e) => {
        const t = (function (e) {
          const t = [];
          return (
            Di.forEach((n) => {
              const r = e.getValue(n);
              void 0 !== r &&
                (t.push([n, r.get()]), r.set(n.startsWith('scale') ? 1 : 0));
            }),
            t
          );
        })(e);
        t.length && (n.set(e, t), e.render());
      }),
        e.forEach((e) => e.measureInitialState()),
        t.forEach((e) => {
          e.render();
          const t = n.get(e);
          t &&
            t.forEach((t) => {
              let [n, r] = t;
              var i;
              null === (i = e.getValue(n)) || void 0 === i || i.set(r);
            });
        }),
        e.forEach((e) => e.measureEndState()),
        e.forEach((e) => {
          void 0 !== e.suspendedScrollY &&
            window.scrollTo(0, e.suspendedScrollY);
        });
    }
    (Bi = !1), (Ni = !1), zi.forEach((e) => e.complete()), zi.clear();
  }
  function Oi() {
    zi.forEach((e) => {
      e.readKeyframes(), e.needsMeasurement && (Bi = !0);
    });
  }
  class Ii {
    constructor(e, t, n, r, i) {
      let o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
      (this.isComplete = !1),
        (this.isAsync = !1),
        (this.needsMeasurement = !1),
        (this.isScheduled = !1),
        (this.unresolvedKeyframes = [...e]),
        (this.onComplete = t),
        (this.name = n),
        (this.motionValue = r),
        (this.element = i),
        (this.isAsync = o);
    }
    scheduleResolve() {
      (this.isScheduled = !0),
        this.isAsync
          ? (zi.add(this),
            Ni || ((Ni = !0), Zr.read(Oi), Zr.resolveKeyframes(Vi)))
          : (this.readKeyframes(), this.complete());
    }
    readKeyframes() {
      const {
        unresolvedKeyframes: e,
        name: t,
        element: n,
        motionValue: r,
      } = this;
      for (let i = 0; i < e.length; i++)
        if (null === e[i])
          if (0 === i) {
            const i = null === r || void 0 === r ? void 0 : r.get(),
              o = e[e.length - 1];
            if (void 0 !== i) e[0] = i;
            else if (n && t) {
              const r = n.readValue(t, o);
              void 0 !== r && null !== r && (e[0] = r);
            }
            void 0 === e[0] && (e[0] = o), r && void 0 === i && r.set(e[0]);
          } else e[i] = e[i - 1];
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete() {
      (this.isComplete = !0),
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
        zi.delete(this);
    }
    cancel() {
      this.isComplete || ((this.isScheduled = !1), zi.delete(this));
    }
    resume() {
      this.isComplete || this.scheduleResolve();
    }
  }
  const Ui = (e) => Math.round(1e5 * e) / 1e5,
    Zi = /-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)/g;
  const _i =
      /^(?:#[0-9a-f]{3,8}|(?:rgb|h[s\u017F]l)a?\((?:-?[\.0-9]+%?[\t-\r ,\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+){2}-?[\.0-9]+%?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:[,\/][\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?(?:\b[0-9]+(?:\.[0-9]+)?|\.[0-9]+)?%?\))$/i,
    Wi = (e, t) => (n) =>
      Boolean(
        ('string' === typeof n && _i.test(n) && n.startsWith(e)) ||
          (t &&
            !(function (e) {
              return null == e;
            })(n) &&
            Object.prototype.hasOwnProperty.call(n, t))
      ),
    Hi = (e, t, n) => (r) => {
      if ('string' !== typeof r) return r;
      const [i, o, a, s] = r.match(Zi);
      return {
        [e]: parseFloat(i),
        [t]: parseFloat(o),
        [n]: parseFloat(a),
        alpha: void 0 !== s ? parseFloat(s) : 1,
      };
    },
    Ji = u(
      u({}, mi),
      {},
      { transform: (e) => Math.round(((e) => pi(0, 255, e))(e)) }
    ),
    Yi = {
      test: Wi('rgb', 'red'),
      parse: Hi('red', 'green', 'blue'),
      transform: (e) => {
        let { red: t, green: n, blue: r, alpha: i = 1 } = e;
        return (
          'rgba(' +
          Ji.transform(t) +
          ', ' +
          Ji.transform(n) +
          ', ' +
          Ji.transform(r) +
          ', ' +
          Ui(gi.transform(i)) +
          ')'
        );
      },
    };
  const Xi = {
      test: Wi('#'),
      parse: function (e) {
        let t = '',
          n = '',
          r = '',
          i = '';
        return (
          e.length > 5
            ? ((t = e.substring(1, 3)),
              (n = e.substring(3, 5)),
              (r = e.substring(5, 7)),
              (i = e.substring(7, 9)))
            : ((t = e.substring(1, 2)),
              (n = e.substring(2, 3)),
              (r = e.substring(3, 4)),
              (i = e.substring(4, 5)),
              (t += t),
              (n += n),
              (r += r),
              (i += i)),
          {
            red: parseInt(t, 16),
            green: parseInt(n, 16),
            blue: parseInt(r, 16),
            alpha: i ? parseInt(i, 16) / 255 : 1,
          }
        );
      },
      transform: Yi.transform,
    },
    Qi = {
      test: Wi('hsl', 'hue'),
      parse: Hi('hue', 'saturation', 'lightness'),
      transform: (e) => {
        let { hue: t, saturation: n, lightness: r, alpha: i = 1 } = e;
        return (
          'hsla(' +
          Math.round(t) +
          ', ' +
          bi.transform(Ui(n)) +
          ', ' +
          bi.transform(Ui(r)) +
          ', ' +
          Ui(gi.transform(i)) +
          ')'
        );
      },
    },
    Gi = {
      test: (e) => Yi.test(e) || Xi.test(e) || Qi.test(e),
      parse: (e) =>
        Yi.test(e) ? Yi.parse(e) : Qi.test(e) ? Qi.parse(e) : Xi.parse(e),
      transform: (e) =>
        'string' === typeof e
          ? e
          : e.hasOwnProperty('red')
            ? Yi.transform(e)
            : Qi.transform(e),
    },
    Ki =
      /(?:#[0-9a-f]{3,8}|(?:rgb|h[s\u017F]l)a?\((?:-?[\.0-9]+%?[\t-\r ,\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+){2}-?[\.0-9]+%?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:[,\/][\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?(?:\b[0-9]+(?:\.[0-9]+)?|\.[0-9]+)?%?\))/gi;
  const qi = 'number',
    $i = 'color',
    eo =
      /var[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*--(?:[\x2D0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\x2D0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*,(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:(?![\t-\r \(\)\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uD800-\uDFFF\uFEFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\((?:(?:(?![\(\)\uD800-\uDFFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])|\((?:(?![\(\)\uD800-\uDFFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])*\))*\))+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)\)|#[0-9a-f]{3,8}|(?:rgb|h[s\u017F]l)a?\((?:-?[\.0-9]+%?[\t-\r ,\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+){2}-?[\.0-9]+%?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:[,\/][\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?(?:\b[0-9]+(?:\.[0-9]+)?|\.[0-9]+)?%?\)|-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)/gi;
  function to(e) {
    const t = e.toString(),
      n = [],
      r = { color: [], number: [], var: [] },
      i = [];
    let o = 0;
    const a = t
      .replace(
        eo,
        (e) => (
          Gi.test(e)
            ? (r.color.push(o), i.push($i), n.push(Gi.parse(e)))
            : e.startsWith('var(')
              ? (r.var.push(o), i.push('var'), n.push(e))
              : (r.number.push(o), i.push(qi), n.push(parseFloat(e))),
          ++o,
          '${}'
        )
      )
      .split('${}');
    return { values: n, split: a, indexes: r, types: i };
  }
  function no(e) {
    return to(e).values;
  }
  function ro(e) {
    const { split: t, types: n } = to(e),
      r = t.length;
    return (e) => {
      let i = '';
      for (let o = 0; o < r; o++)
        if (((i += t[o]), void 0 !== e[o])) {
          const t = n[o];
          i += t === qi ? Ui(e[o]) : t === $i ? Gi.transform(e[o]) : e[o];
        }
      return i;
    };
  }
  const io = (e) => ('number' === typeof e ? 0 : e);
  const oo = {
      test: function (e) {
        var t, n;
        return (
          isNaN(e) &&
          'string' === typeof e &&
          ((null === (t = e.match(Zi)) || void 0 === t ? void 0 : t.length) ||
            0) +
            ((null === (n = e.match(Ki)) || void 0 === n ? void 0 : n.length) ||
              0) >
            0
        );
      },
      parse: no,
      createTransformer: ro,
      getAnimatableNone: function (e) {
        const t = no(e);
        return ro(e)(t.map(io));
      },
    },
    ao = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
  function so(e) {
    const [t, n] = e.slice(0, -1).split('(');
    if ('drop-shadow' === t) return e;
    const [r] = n.match(Zi) || [];
    if (!r) return e;
    const i = n.replace(r, '');
    let o = ao.has(t) ? 1 : 0;
    return r !== n && (o *= 100), t + '(' + o + i + ')';
  }
  const lo =
      /\b([\x2Da-z]*)\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\)/g,
    uo = u(
      u({}, oo),
      {},
      {
        getAnimatableNone: (e) => {
          const t = e.match(lo);
          return t ? t.map(so).join(' ') : e;
        },
      }
    ),
    co = {
      borderWidth: xi,
      borderTopWidth: xi,
      borderRightWidth: xi,
      borderBottomWidth: xi,
      borderLeftWidth: xi,
      borderRadius: xi,
      radius: xi,
      borderTopLeftRadius: xi,
      borderTopRightRadius: xi,
      borderBottomRightRadius: xi,
      borderBottomLeftRadius: xi,
      width: xi,
      maxWidth: xi,
      height: xi,
      maxHeight: xi,
      top: xi,
      right: xi,
      bottom: xi,
      left: xi,
      padding: xi,
      paddingTop: xi,
      paddingRight: xi,
      paddingBottom: xi,
      paddingLeft: xi,
      margin: xi,
      marginTop: xi,
      marginRight: xi,
      marginBottom: xi,
      marginLeft: xi,
      backgroundPositionX: xi,
      backgroundPositionY: xi,
    },
    ho = {
      rotate: Ai,
      rotateX: Ai,
      rotateY: Ai,
      rotateZ: Ai,
      scale: vi,
      scaleX: vi,
      scaleY: vi,
      scaleZ: vi,
      skew: Ai,
      skewX: Ai,
      skewY: Ai,
      distance: xi,
      translateX: xi,
      translateY: xi,
      translateZ: xi,
      x: xi,
      y: xi,
      z: xi,
      perspective: xi,
      transformPerspective: xi,
      opacity: gi,
      originX: ki,
      originY: ki,
      originZ: xi,
    },
    fo = u(u({}, mi), {}, { transform: Math.round }),
    po = u(
      u(u({}, co), ho),
      {},
      {
        zIndex: fo,
        size: xi,
        fillOpacity: gi,
        strokeOpacity: gi,
        numOctaves: fo,
      }
    ),
    mo = u(
      u({}, po),
      {},
      {
        color: Gi,
        backgroundColor: Gi,
        outlineColor: Gi,
        fill: Gi,
        stroke: Gi,
        borderColor: Gi,
        borderTopColor: Gi,
        borderRightColor: Gi,
        borderBottomColor: Gi,
        borderLeftColor: Gi,
        filter: uo,
        WebkitFilter: uo,
      }
    ),
    go = (e) => mo[e];
  function vo(e, t) {
    let n = go(e);
    return (
      n !== uo && (n = oo),
      n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
    );
  }
  const yo = new Set(['auto', 'none', '0']);
  class Ao extends Ii {
    constructor(e, t, n, r, i) {
      super(e, t, n, r, i, !0);
    }
    readKeyframes() {
      const { unresolvedKeyframes: e, element: t, name: n } = this;
      if (!t || !t.current) return;
      super.readKeyframes();
      for (let s = 0; s < e.length; s++) {
        let n = e[s];
        if ('string' === typeof n && ((n = n.trim()), ci(n))) {
          const r = fi(n, t.current);
          void 0 !== r && (e[s] = r),
            s === e.length - 1 && (this.finalKeyframe = n);
        }
      }
      if ((this.resolveNoneKeyframes(), !Ei.has(n) || 2 !== e.length)) return;
      const [r, i] = e,
        o = Li(r),
        a = Li(i);
      if (o !== a)
        if (Pi(o) && Pi(a))
          for (let s = 0; s < e.length; s++) {
            const t = e[s];
            'string' === typeof t && (e[s] = parseFloat(t));
          }
        else this.needsMeasurement = !0;
    }
    resolveNoneKeyframes() {
      const { unresolvedKeyframes: e, name: t } = this,
        n = [];
      for (let i = 0; i < e.length; i++)
        ('number' === typeof (r = e[i])
          ? 0 === r
          : null === r || 'none' === r || '0' === r || ri(r)) && n.push(i);
      var r;
      n.length &&
        (function (e, t, n) {
          let r,
            i = 0;
          for (; i < e.length && !r; ) {
            const t = e[i];
            'string' === typeof t &&
              !yo.has(t) &&
              to(t).values.length &&
              (r = e[i]),
              i++;
          }
          if (r && n) for (const o of t) e[o] = vo(n, r);
        })(e, n, t);
    }
    measureInitialState() {
      const { element: e, unresolvedKeyframes: t, name: n } = this;
      if (!e || !e.current) return;
      'height' === n && (this.suspendedScrollY = window.pageYOffset),
        (this.measuredOrigin = Mi[n](
          e.measureViewportBox(),
          window.getComputedStyle(e.current)
        )),
        (t[0] = this.measuredOrigin);
      const r = t[t.length - 1];
      void 0 !== r && e.getValue(n, r).jump(r, !1);
    }
    measureEndState() {
      var e;
      const { element: t, name: n, unresolvedKeyframes: r } = this;
      if (!t || !t.current) return;
      const i = t.getValue(n);
      i && i.jump(this.measuredOrigin, !1);
      const o = r.length - 1,
        a = r[o];
      (r[o] = Mi[n](
        t.measureViewportBox(),
        window.getComputedStyle(t.current)
      )),
        null !== a && void 0 === this.finalKeyframe && (this.finalKeyframe = a),
        (null === (e = this.removedTransforms) || void 0 === e
          ? void 0
          : e.length) &&
          this.removedTransforms.forEach((e) => {
            let [n, r] = e;
            t.getValue(n).set(r);
          }),
        this.resolveNoneKeyframes();
    }
  }
  function bo(e) {
    return 'function' === typeof e;
  }
  let xo;
  function wo() {
    xo = void 0;
  }
  const So = {
      now: () => (
        void 0 === xo &&
          So.set(Wr.isProcessing || zr ? Wr.timestamp : performance.now()),
        xo
      ),
      set: (e) => {
        (xo = e), queueMicrotask(wo);
      },
    },
    ko = (e, t) =>
      'zIndex' !== t &&
      (!('number' !== typeof e && !Array.isArray(e)) ||
        !(
          'string' !== typeof e ||
          (!oo.test(e) && '0' !== e) ||
          e.startsWith('url(')
        ));
  function Eo(e, t, n, r) {
    const i = e[0];
    if (null === i) return !1;
    if ('display' === t || 'visibility' === t) return !0;
    const o = e[e.length - 1],
      a = ko(i, t),
      s = ko(o, t);
    return (
      ii(
        a === s,
        'You are trying to animate '
          .concat(t, ' from "')
          .concat(i, '" to "')
          .concat(o, '". ')
          .concat(
            i,
            ' is not an animatable value - to enable this animation set '
          )
          .concat(i, ' to a value animatable to ')
          .concat(o, ' via the `style` property.')
      ),
      !(!a || !s) &&
        ((function (e) {
          const t = e[0];
          if (1 === e.length) return !0;
          for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
        })(e) ||
          (('spring' === n || bo(n)) && r))
    );
  }
  const Po = [
    'autoplay',
    'delay',
    'type',
    'repeat',
    'repeatDelay',
    'repeatType',
  ];
  class Co {
    constructor(e) {
      let {
          autoplay: t = !0,
          delay: n = 0,
          type: r = 'keyframes',
          repeat: i = 0,
          repeatDelay: o = 0,
          repeatType: a = 'loop',
        } = e,
        s = c(e, Po);
      (this.isStopped = !1),
        (this.hasAttemptedResolve = !1),
        (this.createdAt = So.now()),
        (this.options = u(
          {
            autoplay: t,
            delay: n,
            type: r,
            repeat: i,
            repeatDelay: o,
            repeatType: a,
          },
          s
        )),
        this.updateFinishedPromise();
    }
    calcStartTime() {
      return this.resolvedAt && this.resolvedAt - this.createdAt > 40
        ? this.resolvedAt
        : this.createdAt;
    }
    get resolved() {
      return (
        this._resolved || this.hasAttemptedResolve || (Oi(), Vi()),
        this._resolved
      );
    }
    onKeyframesResolved(e, t) {
      (this.resolvedAt = So.now()), (this.hasAttemptedResolve = !0);
      const {
        name: n,
        type: r,
        velocity: i,
        delay: o,
        onComplete: a,
        onUpdate: s,
        isGenerator: l,
      } = this.options;
      if (!l && !Eo(e, n, r, i)) {
        if (Nr || !o)
          return (
            null === s || void 0 === s || s(Vr(e, this.options, t)),
            null === a || void 0 === a || a(),
            void this.resolveFinishedPromise()
          );
        this.options.duration = 0;
      }
      const c = this.initPlayback(e, t);
      !1 !== c &&
        ((this._resolved = u({ keyframes: e, finalKeyframe: t }, c)),
        this.onPostResolved());
    }
    onPostResolved() {}
    then(e, t) {
      return this.currentFinishedPromise.then(e, t);
    }
    flatten() {
      (this.options.type = 'keyframes'), (this.options.ease = 'linear');
    }
    updateFinishedPromise() {
      this.currentFinishedPromise = new Promise((e) => {
        this.resolveFinishedPromise = e;
      });
    }
  }
  const To = (e, t, n) => {
      const r = t - e;
      return 0 === r ? 1 : (n - e) / r;
    },
    Fo = function (e, t) {
      let n =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10,
        r = '';
      const i = Math.max(Math.round(t / n), 2);
      for (let o = 0; o < i; o++) r += e(To(0, i - 1, o)) + ', ';
      return 'linear('.concat(r.substring(0, r.length - 2), ')');
    };
  function Do(e, t) {
    return t ? e * (1e3 / t) : 0;
  }
  function Mo(e, t, n) {
    const r = Math.max(t - 5, 0);
    return Do(n - e(r), t - r);
  }
  const Ro = {
      stiffness: 100,
      damping: 10,
      mass: 1,
      velocity: 0,
      duration: 800,
      bounce: 0.3,
      visualDuration: 0.3,
      restSpeed: { granular: 0.01, default: 2 },
      restDelta: { granular: 0.005, default: 0.5 },
      minDuration: 0.01,
      maxDuration: 10,
      minDamping: 0.05,
      maxDamping: 1,
    },
    jo = 0.001;
  function Lo(e) {
    let t,
      n,
      {
        duration: r = Ro.duration,
        bounce: i = Ro.bounce,
        velocity: o = Ro.velocity,
        mass: a = Ro.mass,
      } = e;
    ii(r <= Cr(Ro.maxDuration), 'Spring duration must be 10 seconds or less');
    let s = 1 - i;
    (s = pi(Ro.minDamping, Ro.maxDamping, s)),
      (r = pi(Ro.minDuration, Ro.maxDuration, Tr(r))),
      s < 1
        ? ((t = (e) => {
            const t = e * s,
              n = t * r,
              i = t - o,
              a = No(e, s),
              l = Math.exp(-n);
            return jo - (i / a) * l;
          }),
          (n = (e) => {
            const n = e * s * r,
              i = n * o + o,
              a = Math.pow(s, 2) * Math.pow(e, 2) * r,
              l = Math.exp(-n),
              u = No(Math.pow(e, 2), s);
            return ((-t(e) + jo > 0 ? -1 : 1) * ((i - a) * l)) / u;
          }))
        : ((t = (e) => Math.exp(-e * r) * ((e - o) * r + 1) - 0.001),
          (n = (e) => Math.exp(-e * r) * (r * r * (o - e))));
    const l = (function (e, t, n) {
      let r = n;
      for (let i = 1; i < zo; i++) r -= e(r) / t(r);
      return r;
    })(t, n, 5 / r);
    if (((r = Cr(r)), isNaN(l)))
      return { stiffness: Ro.stiffness, damping: Ro.damping, duration: r };
    {
      const e = Math.pow(l, 2) * a;
      return { stiffness: e, damping: 2 * s * Math.sqrt(a * e), duration: r };
    }
  }
  const zo = 12;
  function No(e, t) {
    return e * Math.sqrt(1 - t * t);
  }
  const Bo = 2e4;
  function Vo(e) {
    let t = 0;
    let n = e.next(t);
    for (; !n.done && t < Bo; ) (t += 50), (n = e.next(t));
    return t >= Bo ? 1 / 0 : t;
  }
  const Oo = ['duration', 'bounce'],
    Io = ['stiffness', 'damping', 'mass'];
  function Uo(e, t) {
    return t.some((t) => void 0 !== e[t]);
  }
  function Zo() {
    let e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : Ro.visualDuration,
      t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : Ro.bounce;
    const n =
      'object' !== typeof e
        ? { visualDuration: e, keyframes: [0, 1], bounce: t }
        : e;
    let { restSpeed: r, restDelta: i } = n;
    const o = n.keyframes[0],
      a = n.keyframes[n.keyframes.length - 1],
      s = { done: !1, value: o },
      {
        stiffness: l,
        damping: c,
        mass: d,
        duration: h,
        velocity: f,
        isResolvedFromDuration: p,
      } = (function (e) {
        let t = u(
          {
            velocity: Ro.velocity,
            stiffness: Ro.stiffness,
            damping: Ro.damping,
            mass: Ro.mass,
            isResolvedFromDuration: !1,
          },
          e
        );
        if (!Uo(e, Io) && Uo(e, Oo))
          if (e.visualDuration) {
            const n = e.visualDuration,
              r = (2 * Math.PI) / (1.2 * n),
              i = r * r,
              o = 2 * pi(0.05, 1, 1 - e.bounce) * Math.sqrt(i);
            t = u(u({}, t), {}, { mass: Ro.mass, stiffness: i, damping: o });
          } else {
            const n = Lo(e);
            (t = u(u(u({}, t), n), {}, { mass: Ro.mass })),
              (t.isResolvedFromDuration = !0);
          }
        return t;
      })(u(u({}, n), {}, { velocity: -Tr(n.velocity || 0) })),
      m = f || 0,
      g = c / (2 * Math.sqrt(l * d)),
      v = a - o,
      y = Tr(Math.sqrt(l / d)),
      A = Math.abs(v) < 5;
    let b;
    if (
      (r || (r = A ? Ro.restSpeed.granular : Ro.restSpeed.default),
      i || (i = A ? Ro.restDelta.granular : Ro.restDelta.default),
      g < 1)
    ) {
      const e = No(y, g);
      b = (t) => {
        const n = Math.exp(-g * y * t);
        return (
          a -
          n * (((m + g * y * v) / e) * Math.sin(e * t) + v * Math.cos(e * t))
        );
      };
    } else if (1 === g) b = (e) => a - Math.exp(-y * e) * (v + (m + y * v) * e);
    else {
      const e = y * Math.sqrt(g * g - 1);
      b = (t) => {
        const n = Math.exp(-g * y * t),
          r = Math.min(e * t, 300);
        return (
          a - (n * ((m + g * y * v) * Math.sinh(r) + e * v * Math.cosh(r))) / e
        );
      };
    }
    const x = {
      calculatedDuration: (p && h) || null,
      next: (e) => {
        const t = b(e);
        if (p) s.done = e >= h;
        else {
          let n = 0;
          g < 1 && (n = 0 === e ? Cr(m) : Mo(b, e, t));
          const o = Math.abs(n) <= r,
            l = Math.abs(a - t) <= i;
          s.done = o && l;
        }
        return (s.value = s.done ? a : t), s;
      },
      toString: () => {
        const e = Math.min(Vo(x), Bo),
          t = Fo((t) => x.next(e * t).value, e, 30);
        return e + 'ms ' + t;
      },
    };
    return x;
  }
  function _o(e) {
    let {
      keyframes: t,
      velocity: n = 0,
      power: r = 0.8,
      timeConstant: i = 325,
      bounceDamping: o = 10,
      bounceStiffness: a = 500,
      modifyTarget: s,
      min: l,
      max: u,
      restDelta: c = 0.5,
      restSpeed: d,
    } = e;
    const h = t[0],
      f = { done: !1, value: h },
      p = (e) =>
        void 0 === l
          ? u
          : void 0 === u || Math.abs(l - e) < Math.abs(u - e)
            ? l
            : u;
    let m = r * n;
    const g = h + m,
      v = void 0 === s ? g : s(g);
    v !== g && (m = v - h);
    const y = (e) => -m * Math.exp(-e / i),
      A = (e) => v + y(e),
      b = (e) => {
        const t = y(e),
          n = A(e);
        (f.done = Math.abs(t) <= c), (f.value = f.done ? v : n);
      };
    let x, w;
    const S = (e) => {
      var t;
      ((t = f.value), (void 0 !== l && t < l) || (void 0 !== u && t > u)) &&
        ((x = e),
        (w = Zo({
          keyframes: [f.value, p(f.value)],
          velocity: Mo(A, e, f.value),
          damping: o,
          stiffness: a,
          restDelta: c,
          restSpeed: d,
        })));
    };
    return (
      S(0),
      {
        calculatedDuration: null,
        next: (e) => {
          let t = !1;
          return (
            w || void 0 !== x || ((t = !0), b(e), S(e)),
            void 0 !== x && e >= x ? w.next(e - x) : (!t && b(e), f)
          );
        },
      }
    );
  }
  const Wo = Yr(0.42, 0, 1, 1),
    Ho = Yr(0, 0, 0.58, 1),
    Jo = Yr(0.42, 0, 0.58, 1),
    Yo = (e) => Array.isArray(e) && 'number' === typeof e[0],
    Xo = {
      linear: Or,
      easeIn: Wo,
      easeInOut: Jo,
      easeOut: Ho,
      circIn: ei,
      circInOut: ni,
      circOut: ti,
      backIn: Kr,
      backInOut: qr,
      backOut: Gr,
      anticipate: $r,
    },
    Qo = (e) => {
      if (Yo(e)) {
        oi(
          4 === e.length,
          'Cubic bezier arrays must contain four numerical values.'
        );
        const [t, n, r, i] = e;
        return Yr(t, n, r, i);
      }
      return 'string' === typeof e
        ? (oi(void 0 !== Xo[e], "Invalid easing type '".concat(e, "'")), Xo[e])
        : e;
    },
    Go = (e, t) => (n) => t(e(n)),
    Ko = function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return t.reduce(Go);
    },
    qo = (e, t, n) => e + (t - e) * n;
  function $o(e, t, n) {
    return (
      n < 0 && (n += 1),
      n > 1 && (n -= 1),
      n < 1 / 6
        ? e + 6 * (t - e) * n
        : n < 0.5
          ? t
          : n < 2 / 3
            ? e + (t - e) * (2 / 3 - n) * 6
            : e
    );
  }
  function ea(e, t) {
    return (n) => (n > 0 ? t : e);
  }
  const ta = (e, t, n) => {
      const r = e * e,
        i = n * (t * t - r) + r;
      return i < 0 ? 0 : Math.sqrt(i);
    },
    na = [Xi, Yi, Qi];
  function ra(e) {
    const t = ((n = e), na.find((e) => e.test(n)));
    var n;
    if (
      (ii(
        Boolean(t),
        "'".concat(
          e,
          "' is not an animatable color. Use the equivalent color code instead."
        )
      ),
      !Boolean(t))
    )
      return !1;
    let r = t.parse(e);
    return (
      t === Qi &&
        (r = (function (e) {
          let { hue: t, saturation: n, lightness: r, alpha: i } = e;
          (t /= 360), (n /= 100), (r /= 100);
          let o = 0,
            a = 0,
            s = 0;
          if (n) {
            const e = r < 0.5 ? r * (1 + n) : r + n - r * n,
              i = 2 * r - e;
            (o = $o(i, e, t + 1 / 3)),
              (a = $o(i, e, t)),
              (s = $o(i, e, t - 1 / 3));
          } else o = a = s = r;
          return {
            red: Math.round(255 * o),
            green: Math.round(255 * a),
            blue: Math.round(255 * s),
            alpha: i,
          };
        })(r)),
      r
    );
  }
  const ia = (e, t) => {
      const n = ra(e),
        r = ra(t);
      if (!n || !r) return ea(e, t);
      const i = u({}, n);
      return (e) => (
        (i.red = ta(n.red, r.red, e)),
        (i.green = ta(n.green, r.green, e)),
        (i.blue = ta(n.blue, r.blue, e)),
        (i.alpha = qo(n.alpha, r.alpha, e)),
        Yi.transform(i)
      );
    },
    oa = new Set(['none', 'hidden']);
  function aa(e, t) {
    return (n) => qo(e, t, n);
  }
  function sa(e) {
    return 'number' === typeof e
      ? aa
      : 'string' === typeof e
        ? ci(e)
          ? ea
          : Gi.test(e)
            ? ia
            : ca
        : Array.isArray(e)
          ? la
          : 'object' === typeof e
            ? Gi.test(e)
              ? ia
              : ua
            : ea;
  }
  function la(e, t) {
    const n = [...e],
      r = n.length,
      i = e.map((e, n) => sa(e)(e, t[n]));
    return (e) => {
      for (let t = 0; t < r; t++) n[t] = i[t](e);
      return n;
    };
  }
  function ua(e, t) {
    const n = u(u({}, e), t),
      r = {};
    for (const i in n)
      void 0 !== e[i] && void 0 !== t[i] && (r[i] = sa(e[i])(e[i], t[i]));
    return (e) => {
      for (const t in r) n[t] = r[t](e);
      return n;
    };
  }
  const ca = (e, t) => {
    const n = oo.createTransformer(t),
      r = to(e),
      i = to(t);
    return r.indexes.var.length === i.indexes.var.length &&
      r.indexes.color.length === i.indexes.color.length &&
      r.indexes.number.length >= i.indexes.number.length
      ? (oa.has(e) && !i.values.length) || (oa.has(t) && !r.values.length)
        ? (function (e, t) {
            return oa.has(e)
              ? (n) => (n <= 0 ? e : t)
              : (n) => (n >= 1 ? t : e);
          })(e, t)
        : Ko(
            la(
              (function (e, t) {
                var n;
                const r = [],
                  i = { color: 0, var: 0, number: 0 };
                for (let o = 0; o < t.values.length; o++) {
                  const a = t.types[o],
                    s = e.indexes[a][i[a]],
                    l = null !== (n = e.values[s]) && void 0 !== n ? n : 0;
                  (r[o] = l), i[a]++;
                }
                return r;
              })(r, i),
              i.values
            ),
            n
          )
      : (ii(
          !0,
          "Complex values '"
            .concat(e, "' and '")
            .concat(
              t,
              "' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition."
            )
        ),
        ea(e, t));
  };
  function da(e, t, n) {
    if ('number' === typeof e && 'number' === typeof t && 'number' === typeof n)
      return qo(e, t, n);
    return sa(e)(e, t);
  }
  function ha(e, t) {
    let {
      clamp: n = !0,
      ease: r,
      mixer: i,
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const o = e.length;
    if (
      (oi(
        o === t.length,
        'Both input and output ranges must be the same length'
      ),
      1 === o)
    )
      return () => t[0];
    if (2 === o && e[0] === e[1]) return () => t[1];
    e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
    const a = (function (e, t, n) {
        const r = [],
          i = n || da,
          o = e.length - 1;
        for (let a = 0; a < o; a++) {
          let n = i(e[a], e[a + 1]);
          if (t) {
            const e = Array.isArray(t) ? t[a] || Or : t;
            n = Ko(e, n);
          }
          r.push(n);
        }
        return r;
      })(t, r, i),
      s = a.length,
      l = (t) => {
        let n = 0;
        if (s > 1) for (; n < e.length - 2 && !(t < e[n + 1]); n++);
        const r = To(e[n], e[n + 1], t);
        return a[n](r);
      };
    return n ? (t) => l(pi(e[0], e[o - 1], t)) : l;
  }
  function fa(e) {
    const t = [0];
    return (
      (function (e, t) {
        const n = e[e.length - 1];
        for (let r = 1; r <= t; r++) {
          const i = To(0, t, r);
          e.push(qo(n, 1, i));
        }
      })(t, e.length - 1),
      t
    );
  }
  function pa(e) {
    let {
      duration: t = 300,
      keyframes: n,
      times: r,
      ease: i = 'easeInOut',
    } = e;
    const o = ((e) => Array.isArray(e) && 'number' !== typeof e[0])(i)
        ? i.map(Qo)
        : Qo(i),
      a = { done: !1, value: n[0] },
      s = (function (e, t) {
        return e.map((e) => e * t);
      })(r && r.length === n.length ? r : fa(n), t),
      l = ha(s, n, {
        ease: Array.isArray(o)
          ? o
          : ((u = n), (c = o), u.map(() => c || Jo).splice(0, u.length - 1)),
      });
    var u, c;
    return {
      calculatedDuration: t,
      next: (e) => ((a.value = l(e)), (a.done = e >= t), a),
    };
  }
  const ma = (e) => {
      const t = (t) => {
        let { timestamp: n } = t;
        return e(n);
      };
      return {
        start: () => Zr.update(t, !0),
        stop: () => _r(t),
        now: () => (Wr.isProcessing ? Wr.timestamp : So.now()),
      };
    },
    ga = { decay: _o, inertia: _o, tween: pa, keyframes: pa, spring: Zo },
    va = (e) => e / 100;
  class ya extends Co {
    constructor(e) {
      super(e),
        (this.holdTime = null),
        (this.cancelTime = null),
        (this.currentTime = 0),
        (this.playbackSpeed = 1),
        (this.pendingPlayState = 'running'),
        (this.startTime = null),
        (this.state = 'idle'),
        (this.stop = () => {
          if (
            (this.resolver.cancel(),
            (this.isStopped = !0),
            'idle' === this.state)
          )
            return;
          this.teardown();
          const { onStop: e } = this.options;
          e && e();
        });
      const {
          name: t,
          motionValue: n,
          element: r,
          keyframes: i,
        } = this.options,
        o = (null === r || void 0 === r ? void 0 : r.KeyframeResolver) || Ii;
      (this.resolver = new o(
        i,
        (e, t) => this.onKeyframesResolved(e, t),
        t,
        n,
        r
      )),
        this.resolver.scheduleResolve();
    }
    flatten() {
      super.flatten(),
        this._resolved &&
          Object.assign(
            this._resolved,
            this.initPlayback(this._resolved.keyframes)
          );
    }
    initPlayback(e) {
      const {
          type: t = 'keyframes',
          repeat: n = 0,
          repeatDelay: r = 0,
          repeatType: i,
          velocity: o = 0,
        } = this.options,
        a = bo(t) ? t : ga[t] || pa;
      let s, l;
      a !== pa &&
        'number' !== typeof e[0] &&
        ((s = Ko(va, da(e[0], e[1]))), (e = [0, 100]));
      const c = a(u(u({}, this.options), {}, { keyframes: e }));
      'mirror' === i &&
        (l = a(
          u(
            u({}, this.options),
            {},
            { keyframes: [...e].reverse(), velocity: -o }
          )
        )),
        null === c.calculatedDuration && (c.calculatedDuration = Vo(c));
      const { calculatedDuration: d } = c,
        h = d + r;
      return {
        generator: c,
        mirroredGenerator: l,
        mapPercentToKeyframes: s,
        calculatedDuration: d,
        resolvedDuration: h,
        totalDuration: h * (n + 1) - r,
      };
    }
    onPostResolved() {
      const { autoplay: e = !0 } = this.options;
      this.play(),
        'paused' !== this.pendingPlayState && e
          ? (this.state = this.pendingPlayState)
          : this.pause();
    }
    tick(e) {
      let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      const { resolved: n } = this;
      if (!n) {
        const { keyframes: e } = this.options;
        return { done: !0, value: e[e.length - 1] };
      }
      const {
        finalKeyframe: r,
        generator: i,
        mirroredGenerator: o,
        mapPercentToKeyframes: a,
        keyframes: s,
        calculatedDuration: l,
        totalDuration: u,
        resolvedDuration: c,
      } = n;
      if (null === this.startTime) return i.next(0);
      const {
        delay: d,
        repeat: h,
        repeatType: f,
        repeatDelay: p,
        onUpdate: m,
      } = this.options;
      this.speed > 0
        ? (this.startTime = Math.min(this.startTime, e))
        : this.speed < 0 &&
          (this.startTime = Math.min(e - u / this.speed, this.startTime)),
        t
          ? (this.currentTime = e)
          : null !== this.holdTime
            ? (this.currentTime = this.holdTime)
            : (this.currentTime = Math.round(e - this.startTime) * this.speed);
      const g = this.currentTime - d * (this.speed >= 0 ? 1 : -1),
        v = this.speed >= 0 ? g < 0 : g > u;
      (this.currentTime = Math.max(g, 0)),
        'finished' === this.state &&
          null === this.holdTime &&
          (this.currentTime = u);
      let y = this.currentTime,
        A = i;
      if (h) {
        const e = Math.min(this.currentTime, u) / c;
        let t = Math.floor(e),
          n = e % 1;
        !n && e >= 1 && (n = 1), 1 === n && t--, (t = Math.min(t, h + 1));
        Boolean(t % 2) &&
          ('reverse' === f
            ? ((n = 1 - n), p && (n -= p / c))
            : 'mirror' === f && (A = o)),
          (y = pi(0, 1, n) * c);
      }
      const b = v ? { done: !1, value: s[0] } : A.next(y);
      a && (b.value = a(b.value));
      let { done: x } = b;
      v ||
        null === l ||
        (x = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
      const w =
        null === this.holdTime &&
        ('finished' === this.state || ('running' === this.state && x));
      return (
        w && void 0 !== r && (b.value = Vr(s, this.options, r)),
        m && m(b.value),
        w && this.finish(),
        b
      );
    }
    get duration() {
      const { resolved: e } = this;
      return e ? Tr(e.calculatedDuration) : 0;
    }
    get time() {
      return Tr(this.currentTime);
    }
    set time(e) {
      (e = Cr(e)),
        (this.currentTime = e),
        null !== this.holdTime || 0 === this.speed
          ? (this.holdTime = e)
          : this.driver &&
            (this.startTime = this.driver.now() - e / this.speed);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(e) {
      const t = this.playbackSpeed !== e;
      (this.playbackSpeed = e), t && (this.time = Tr(this.currentTime));
    }
    play() {
      if (
        (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
      )
        return void (this.pendingPlayState = 'running');
      if (this.isStopped) return;
      const { driver: e = ma, onPlay: t, startTime: n } = this.options;
      this.driver || (this.driver = e((e) => this.tick(e))), t && t();
      const r = this.driver.now();
      null !== this.holdTime
        ? (this.startTime = r - this.holdTime)
        : this.startTime
          ? 'finished' === this.state && (this.startTime = r)
          : (this.startTime =
              null !== n && void 0 !== n ? n : this.calcStartTime()),
        'finished' === this.state && this.updateFinishedPromise(),
        (this.cancelTime = this.startTime),
        (this.holdTime = null),
        (this.state = 'running'),
        this.driver.start();
    }
    pause() {
      var e;
      this._resolved
        ? ((this.state = 'paused'),
          (this.holdTime =
            null !== (e = this.currentTime) && void 0 !== e ? e : 0))
        : (this.pendingPlayState = 'paused');
    }
    complete() {
      'running' !== this.state && this.play(),
        (this.pendingPlayState = this.state = 'finished'),
        (this.holdTime = null);
    }
    finish() {
      this.teardown(), (this.state = 'finished');
      const { onComplete: e } = this.options;
      e && e();
    }
    cancel() {
      null !== this.cancelTime && this.tick(this.cancelTime),
        this.teardown(),
        this.updateFinishedPromise();
    }
    teardown() {
      (this.state = 'idle'),
        this.stopDriver(),
        this.resolveFinishedPromise(),
        this.updateFinishedPromise(),
        (this.startTime = this.cancelTime = null),
        this.resolver.cancel();
    }
    stopDriver() {
      this.driver && (this.driver.stop(), (this.driver = void 0));
    }
    sample(e) {
      return (this.startTime = 0), this.tick(e, !0);
    }
  }
  const Aa = new Set(['opacity', 'clipPath', 'filter', 'transform']);
  function ba(e) {
    let t;
    return () => (void 0 === t && (t = e()), t);
  }
  const xa = { linearEasing: void 0 };
  function wa(e, t) {
    const n = ba(e);
    return () => {
      var e;
      return null !== (e = xa[t]) && void 0 !== e ? e : n();
    };
  }
  const Sa = wa(() => {
    try {
      document
        .createElement('div')
        .animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
    } catch (Zb) {
      return !1;
    }
    return !0;
  }, 'linearEasing');
  function ka(e) {
    return Boolean(
      ('function' === typeof e && Sa()) ||
        !e ||
        ('string' === typeof e && (e in Pa || Sa())) ||
        Yo(e) ||
        (Array.isArray(e) && e.every(ka))
    );
  }
  const Ea = (e) => {
      let [t, n, r, i] = e;
      return 'cubic-bezier('
        .concat(t, ', ')
        .concat(n, ', ')
        .concat(r, ', ')
        .concat(i, ')');
    },
    Pa = {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      circIn: Ea([0, 0.65, 0.55, 1]),
      circOut: Ea([0.55, 0, 1, 0.45]),
      backIn: Ea([0.31, 0.01, 0.66, -0.59]),
      backOut: Ea([0.33, 1.53, 0.69, 0.99]),
    };
  function Ca(e, t) {
    return e
      ? 'function' === typeof e && Sa()
        ? Fo(e, t)
        : Yo(e)
          ? Ea(e)
          : Array.isArray(e)
            ? e.map((e) => Ca(e, t) || Pa.easeOut)
            : Pa[e]
      : void 0;
  }
  function Ta(e, t, n) {
    let {
      delay: r = 0,
      duration: i = 300,
      repeat: o = 0,
      repeatType: a = 'loop',
      ease: s = 'easeInOut',
      times: l,
    } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const u = { [t]: n };
    l && (u.offset = l);
    const c = Ca(s, i);
    return (
      Array.isArray(c) && (u.easing = c),
      e.animate(u, {
        delay: r,
        duration: i,
        easing: Array.isArray(c) ? 'linear' : c,
        fill: 'both',
        iterations: o + 1,
        direction: 'reverse' === a ? 'alternate' : 'normal',
      })
    );
  }
  function Fa(e, t) {
    (e.timeline = t), (e.onfinish = null);
  }
  const Da = ba(() => Object.hasOwnProperty.call(Element.prototype, 'animate')),
    Ma = ['onComplete', 'onUpdate', 'motionValue', 'element'],
    Ra = ['motionValue', 'onUpdate', 'onComplete', 'element'];
  const ja = { anticipate: $r, backInOut: qr, circInOut: ni };
  class La extends Co {
    constructor(e) {
      super(e);
      const {
        name: t,
        motionValue: n,
        element: r,
        keyframes: i,
      } = this.options;
      (this.resolver = new Ao(
        i,
        (e, t) => this.onKeyframesResolved(e, t),
        t,
        n,
        r
      )),
        this.resolver.scheduleResolve();
    }
    initPlayback(e, t) {
      var n;
      let {
        duration: r = 300,
        times: i,
        ease: o,
        type: a,
        motionValue: s,
        name: l,
        startTime: d,
      } = this.options;
      if (!(null === (n = s.owner) || void 0 === n ? void 0 : n.current))
        return !1;
      var h;
      if (
        ('string' === typeof o && Sa() && o in ja && (o = ja[o]),
        bo((h = this.options).type) || 'spring' === h.type || !ka(h.ease))
      ) {
        const t = this.options,
          { onComplete: n, onUpdate: s, motionValue: l, element: d } = t,
          h = c(t, Ma),
          f = (function (e, t) {
            const n = new ya(
              u(
                u({}, t),
                {},
                { keyframes: e, repeat: 0, delay: 0, isGenerator: !0 }
              )
            );
            let r = { done: !1, value: e[0] };
            const i = [];
            let o = 0;
            for (; !r.done && o < 2e4; )
              (r = n.sample(o)), i.push(r.value), (o += 10);
            return {
              times: void 0,
              keyframes: i,
              duration: o - 10,
              ease: 'linear',
            };
          })(e, h);
        1 === (e = f.keyframes).length && (e[1] = e[0]),
          (r = f.duration),
          (i = f.times),
          (o = f.ease),
          (a = 'keyframes');
      }
      const f = Ta(
        s.owner.current,
        l,
        e,
        u(u({}, this.options), {}, { duration: r, times: i, ease: o })
      );
      return (
        (f.startTime = null !== d && void 0 !== d ? d : this.calcStartTime()),
        this.pendingTimeline
          ? (Fa(f, this.pendingTimeline), (this.pendingTimeline = void 0))
          : (f.onfinish = () => {
              const { onComplete: n } = this.options;
              s.set(Vr(e, this.options, t)),
                n && n(),
                this.cancel(),
                this.resolveFinishedPromise();
            }),
        { animation: f, duration: r, times: i, type: a, ease: o, keyframes: e }
      );
    }
    get duration() {
      const { resolved: e } = this;
      if (!e) return 0;
      const { duration: t } = e;
      return Tr(t);
    }
    get time() {
      const { resolved: e } = this;
      if (!e) return 0;
      const { animation: t } = e;
      return Tr(t.currentTime || 0);
    }
    set time(e) {
      const { resolved: t } = this;
      if (!t) return;
      const { animation: n } = t;
      n.currentTime = Cr(e);
    }
    get speed() {
      const { resolved: e } = this;
      if (!e) return 1;
      const { animation: t } = e;
      return t.playbackRate;
    }
    set speed(e) {
      const { resolved: t } = this;
      if (!t) return;
      const { animation: n } = t;
      n.playbackRate = e;
    }
    get state() {
      const { resolved: e } = this;
      if (!e) return 'idle';
      const { animation: t } = e;
      return t.playState;
    }
    get startTime() {
      const { resolved: e } = this;
      if (!e) return null;
      const { animation: t } = e;
      return t.startTime;
    }
    attachTimeline(e) {
      if (this._resolved) {
        const { resolved: t } = this;
        if (!t) return Or;
        const { animation: n } = t;
        Fa(n, e);
      } else this.pendingTimeline = e;
      return Or;
    }
    play() {
      if (this.isStopped) return;
      const { resolved: e } = this;
      if (!e) return;
      const { animation: t } = e;
      'finished' === t.playState && this.updateFinishedPromise(), t.play();
    }
    pause() {
      const { resolved: e } = this;
      if (!e) return;
      const { animation: t } = e;
      t.pause();
    }
    stop() {
      if (
        (this.resolver.cancel(), (this.isStopped = !0), 'idle' === this.state)
      )
        return;
      this.resolveFinishedPromise(), this.updateFinishedPromise();
      const { resolved: e } = this;
      if (!e) return;
      const {
        animation: t,
        keyframes: n,
        duration: r,
        type: i,
        ease: o,
        times: a,
      } = e;
      if ('idle' === t.playState || 'finished' === t.playState) return;
      if (this.time) {
        const e = this.options,
          { motionValue: t, onUpdate: s, onComplete: l, element: d } = e,
          h = c(e, Ra),
          f = new ya(
            u(
              u({}, h),
              {},
              {
                keyframes: n,
                duration: r,
                type: i,
                ease: o,
                times: a,
                isGenerator: !0,
              }
            )
          ),
          p = Cr(this.time);
        t.setWithVelocity(f.sample(p - 10).value, f.sample(p).value, 10);
      }
      const { onStop: s } = this.options;
      s && s(), this.cancel();
    }
    complete() {
      const { resolved: e } = this;
      e && e.animation.finish();
    }
    cancel() {
      const { resolved: e } = this;
      e && e.animation.cancel();
    }
    static supports(e) {
      const {
        motionValue: t,
        name: n,
        repeatDelay: r,
        repeatType: i,
        damping: o,
        type: a,
      } = e;
      return (
        Da() &&
        n &&
        Aa.has(n) &&
        t &&
        t.owner &&
        t.owner.current instanceof HTMLElement &&
        !t.owner.getProps().onUpdate &&
        !r &&
        'mirror' !== i &&
        0 !== o &&
        'inertia' !== a
      );
    }
  }
  const za = ba(() => void 0 !== window.ScrollTimeline);
  class Na {
    constructor(e) {
      (this.stop = () => this.runAll('stop')),
        (this.animations = e.filter(Boolean));
    }
    then(e, t) {
      return Promise.all(this.animations).then(e).catch(t);
    }
    getAll(e) {
      return this.animations[0][e];
    }
    setAll(e, t) {
      for (let n = 0; n < this.animations.length; n++)
        this.animations[n][e] = t;
    }
    attachTimeline(e, t) {
      const n = this.animations.map((n) =>
        za() && n.attachTimeline ? n.attachTimeline(e) : t(n)
      );
      return () => {
        n.forEach((e, t) => {
          e && e(), this.animations[t].stop();
        });
      };
    }
    get time() {
      return this.getAll('time');
    }
    set time(e) {
      this.setAll('time', e);
    }
    get speed() {
      return this.getAll('speed');
    }
    set speed(e) {
      this.setAll('speed', e);
    }
    get startTime() {
      return this.getAll('startTime');
    }
    get duration() {
      let e = 0;
      for (let t = 0; t < this.animations.length; t++)
        e = Math.max(e, this.animations[t].duration);
      return e;
    }
    runAll(e) {
      this.animations.forEach((t) => t[e]());
    }
    flatten() {
      this.runAll('flatten');
    }
    play() {
      this.runAll('play');
    }
    pause() {
      this.runAll('pause');
    }
    cancel() {
      this.runAll('cancel');
    }
    complete() {
      this.runAll('complete');
    }
  }
  const Ba = [
    'when',
    'delay',
    'delayChildren',
    'staggerChildren',
    'staggerDirection',
    'repeat',
    'repeatType',
    'repeatDelay',
    'from',
    'elapsed',
  ];
  const Va = function (e, t, n) {
    let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
      i = arguments.length > 4 ? arguments[4] : void 0,
      o = arguments.length > 5 ? arguments[5] : void 0;
    return (a) => {
      const s = jr(r, e) || {},
        l = s.delay || r.delay || 0;
      let { elapsed: d = 0 } = r;
      d -= Cr(l);
      let h = u(
        u(
          {
            keyframes: Array.isArray(n) ? n : [null, n],
            ease: 'easeOut',
            velocity: t.getVelocity(),
          },
          s
        ),
        {},
        {
          delay: -d,
          onUpdate: (e) => {
            t.set(e), s.onUpdate && s.onUpdate(e);
          },
          onComplete: () => {
            a(), s.onComplete && s.onComplete();
          },
          name: e,
          motionValue: t,
          element: o ? void 0 : i,
        }
      );
      (function (e) {
        let {
            when: t,
            delay: n,
            delayChildren: r,
            staggerChildren: i,
            staggerDirection: o,
            repeat: a,
            repeatType: s,
            repeatDelay: l,
            from: u,
            elapsed: d,
          } = e,
          h = c(e, Ba);
        return !!Object.keys(h).length;
      })(s) || (h = u(u({}, h), Rr(e, h))),
        h.duration && (h.duration = Cr(h.duration)),
        h.repeatDelay && (h.repeatDelay = Cr(h.repeatDelay)),
        void 0 !== h.from && (h.keyframes[0] = h.from);
      let f = !1;
      if (
        ((!1 === h.type || (0 === h.duration && !h.repeatDelay)) &&
          ((h.duration = 0), 0 === h.delay && (f = !0)),
        (Nr || Lr) && ((f = !0), (h.duration = 0), (h.delay = 0)),
        f && !o && void 0 !== t.get())
      ) {
        const e = Vr(h.keyframes, s);
        if (void 0 !== e)
          return (
            Zr.update(() => {
              h.onUpdate(e), h.onComplete();
            }),
            new Na([])
          );
      }
      return !o && La.supports(h) ? new La(h) : new ya(h);
    };
  };
  function Oa(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function Ia(e, t) {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  }
  class Ua {
    constructor() {
      this.subscriptions = [];
    }
    add(e) {
      return Oa(this.subscriptions, e), () => Ia(this.subscriptions, e);
    }
    notify(e, t, n) {
      const r = this.subscriptions.length;
      if (r)
        if (1 === r) this.subscriptions[0](e, t, n);
        else
          for (let i = 0; i < r; i++) {
            const r = this.subscriptions[i];
            r && r(e, t, n);
          }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  }
  const Za = { current: void 0 };
  class _a {
    constructor(e) {
      var t = this;
      let n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      (this.version = '11.15.0'),
        (this.canTrackVelocity = null),
        (this.events = {}),
        (this.updateAndNotify = function (e) {
          let n =
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          const r = So.now();
          t.updatedAt !== r && t.setPrevFrameValue(),
            (t.prev = t.current),
            t.setCurrent(e),
            t.current !== t.prev &&
              t.events.change &&
              t.events.change.notify(t.current),
            n &&
              t.events.renderRequest &&
              t.events.renderRequest.notify(t.current);
        }),
        (this.hasAnimated = !1),
        this.setCurrent(e),
        (this.owner = n.owner);
    }
    setCurrent(e) {
      var t;
      (this.current = e),
        (this.updatedAt = So.now()),
        null === this.canTrackVelocity &&
          void 0 !== e &&
          (this.canTrackVelocity = ((t = this.current), !isNaN(parseFloat(t))));
    }
    setPrevFrameValue() {
      let e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : this.current;
      (this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt);
    }
    onChange(e) {
      return this.on('change', e);
    }
    on(e, t) {
      this.events[e] || (this.events[e] = new Ua());
      const n = this.events[e].add(t);
      return 'change' === e
        ? () => {
            n(),
              Zr.read(() => {
                this.events.change.getSize() || this.stop();
              });
          }
        : n;
    }
    clearListeners() {
      for (const e in this.events) this.events[e].clear();
    }
    attach(e, t) {
      (this.passiveEffect = e), (this.stopPassiveEffect = t);
    }
    set(e) {
      let t =
        !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      t && this.passiveEffect
        ? this.passiveEffect(e, this.updateAndNotify)
        : this.updateAndNotify(e, t);
    }
    setWithVelocity(e, t, n) {
      this.set(t),
        (this.prev = void 0),
        (this.prevFrameValue = e),
        (this.prevUpdatedAt = this.updatedAt - n);
    }
    jump(e) {
      let t =
        !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      this.updateAndNotify(e),
        (this.prev = e),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        t && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect();
    }
    get() {
      return Za.current && Za.current.push(this), this.current;
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      const e = So.now();
      if (
        !this.canTrackVelocity ||
        void 0 === this.prevFrameValue ||
        e - this.updatedAt > 30
      )
        return 0;
      const t = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
      return Do(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
    }
    start(e) {
      return (
        this.stop(),
        new Promise((t) => {
          (this.hasAnimated = !0),
            (this.animation = e(t)),
            this.events.animationStart && this.events.animationStart.notify();
        }).then(() => {
          this.events.animationComplete &&
            this.events.animationComplete.notify(),
            this.clearAnimation();
        })
      );
    }
    stop() {
      this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation();
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    destroy() {
      this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect();
    }
  }
  function Wa(e, t) {
    return new _a(e, t);
  }
  const Ha = ['transitionEnd', 'transition'];
  function Ja(e, t, n) {
    e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Wa(n));
  }
  const Ya = (e) => e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
    Xa = 'data-' + Ya('framerAppearId');
  function Qa(e) {
    return e.props[Xa];
  }
  const Ga = (e) => Boolean(e && e.getVelocity);
  function Ka(e, t) {
    const n = e.getValue('willChange');
    if (((r = n), Boolean(Ga(r) && r.add))) return n.add(t);
    var r;
  }
  const qa = ['transition', 'transitionEnd'];
  function $a(e, t) {
    let { protectedKeys: n, needsAnimating: r } = e;
    const i = n.hasOwnProperty(t) && !0 !== r[t];
    return (r[t] = !1), i;
  }
  function es(e, t) {
    let {
      delay: n = 0,
      transitionOverride: r,
      type: i,
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var o;
    let { transition: a = e.getDefaultTransition(), transitionEnd: s } = t,
      l = c(t, qa);
    r && (a = r);
    const d = [],
      h = i && e.animationState && e.animationState.getState()[i];
    for (const c in l) {
      const t = e.getValue(
          c,
          null !== (o = e.latestValues[c]) && void 0 !== o ? o : null
        ),
        r = l[c];
      if (void 0 === r || (h && $a(h, c))) continue;
      const i = u({ delay: n }, jr(a || {}, c));
      let s = !1;
      if (window.MotionHandoffAnimation) {
        const t = Qa(e);
        if (t) {
          const e = window.MotionHandoffAnimation(t, c, Zr);
          null !== e && ((i.startTime = e), (s = !0));
        }
      }
      Ka(e, c),
        t.start(
          Va(
            c,
            t,
            r,
            e.shouldReduceMotion && Pr.has(c) ? { type: !1 } : i,
            e,
            s
          )
        );
      const f = t.animation;
      f && d.push(f);
    }
    return (
      s &&
        Promise.all(d).then(() => {
          Zr.update(() => {
            s &&
              (function (e, t) {
                let n = wr(e, t) || {},
                  { transitionEnd: r = {}, transition: i = {} } = n,
                  o = c(n, Ha);
                o = u(u({}, o), r);
                for (const s in o)
                  Ja(e, s, ((a = o[s]), vr(a) ? a[a.length - 1] || 0 : a));
                var a;
              })(e, s);
          });
        }),
      d
    );
  }
  function ts(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var r;
    const i = wr(
      e,
      t,
      'exit' === n.type
        ? null === (r = e.presenceContext) || void 0 === r
          ? void 0
          : r.custom
        : void 0
    );
    let { transition: o = e.getDefaultTransition() || {} } = i || {};
    n.transitionOverride && (o = n.transitionOverride);
    const a = i ? () => Promise.all(es(e, i, n)) : () => Promise.resolve(),
      s =
        e.variantChildren && e.variantChildren.size
          ? function () {
              let r =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 0;
              const {
                delayChildren: i = 0,
                staggerChildren: a,
                staggerDirection: s,
              } = o;
              return (function (e, t) {
                let n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 0,
                  r =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : 0,
                  i =
                    arguments.length > 4 && void 0 !== arguments[4]
                      ? arguments[4]
                      : 1,
                  o = arguments.length > 5 ? arguments[5] : void 0;
                const a = [],
                  s = (e.variantChildren.size - 1) * r,
                  l =
                    1 === i
                      ? function () {
                          return (
                            (arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : 0) * r
                          );
                        }
                      : function () {
                          return (
                            s -
                            (arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : 0) *
                              r
                          );
                        };
                return (
                  Array.from(e.variantChildren)
                    .sort(ns)
                    .forEach((e, r) => {
                      e.notify('AnimationStart', t),
                        a.push(
                          ts(e, t, u(u({}, o), {}, { delay: n + l(r) })).then(
                            () => e.notify('AnimationComplete', t)
                          )
                        );
                    }),
                  Promise.all(a)
                );
              })(e, t, i + r, a, s, n);
            }
          : () => Promise.resolve(),
      { when: l } = o;
    if (l) {
      const [e, t] = 'beforeChildren' === l ? [a, s] : [s, a];
      return e().then(() => t());
    }
    return Promise.all([a(), s(n.delay)]);
  }
  function ns(e, t) {
    return e.sortNodePosition(t);
  }
  const rs = kr.length;
  function is(e) {
    if (!e) return;
    if (!e.isControllingVariants) {
      const t = (e.parent && is(e.parent)) || {};
      return void 0 !== e.props.initial && (t.initial = e.props.initial), t;
    }
    const t = {};
    for (let n = 0; n < rs; n++) {
      const r = kr[n],
        i = e.props[r];
      (Ar(i) || !1 === i) && (t[r] = i);
    }
    return t;
  }
  const os = ['transition', 'transitionEnd'],
    as = [...Sr].reverse(),
    ss = Sr.length;
  function ls(e) {
    return (t) =>
      Promise.all(
        t.map((t) => {
          let { animation: n, options: r } = t;
          return (function (e, t) {
            let n,
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {};
            if ((e.notify('AnimationStart', t), Array.isArray(t))) {
              const i = t.map((t) => ts(e, t, r));
              n = Promise.all(i);
            } else if ('string' === typeof t) n = ts(e, t, r);
            else {
              const i = 'function' === typeof t ? wr(e, t, r.custom) : t;
              n = Promise.all(es(e, i, r));
            }
            return n.then(() => {
              e.notify('AnimationComplete', t);
            });
          })(e, n, r);
        })
      );
  }
  function us(e) {
    let t = ls(e),
      n = hs(),
      r = !0;
    const i = (t) => (n, r) => {
      var i;
      const o = wr(
        e,
        r,
        'exit' === t
          ? null === (i = e.presenceContext) || void 0 === i
            ? void 0
            : i.custom
          : void 0
      );
      if (o) {
        const { transition: e, transitionEnd: t } = o,
          r = c(o, os);
        n = u(u(u({}, n), r), t);
      }
      return n;
    };
    function o(o) {
      const { props: a } = e,
        s = is(e.parent) || {},
        l = [],
        c = new Set();
      let d = {},
        h = 1 / 0;
      for (let t = 0; t < ss; t++) {
        const f = as[t],
          p = n[f],
          m = void 0 !== a[f] ? a[f] : s[f],
          g = Ar(m),
          v = f === o ? p.isActive : null;
        !1 === v && (h = t);
        let y = m === s[f] && m !== a[f] && g;
        if (
          (y && r && e.manuallyAnimateOnMount && (y = !1),
          (p.protectedKeys = u({}, d)),
          (!p.isActive && null === v) ||
            (!m && !p.prevProp) ||
            gr(m) ||
            'boolean' === typeof m)
        )
          continue;
        const A = cs(p.prevProp, m);
        let b = A || (f === o && p.isActive && !y && g) || (t > h && g),
          x = !1;
        const w = Array.isArray(m) ? m : [m];
        let S = w.reduce(i(f), {});
        !1 === v && (S = {});
        const { prevResolvedValues: k = {} } = p,
          E = u(u({}, k), S),
          P = (t) => {
            (b = !0),
              c.has(t) && ((x = !0), c.delete(t)),
              (p.needsAnimating[t] = !0);
            const n = e.getValue(t);
            n && (n.liveStyle = !1);
          };
        for (const e in E) {
          const t = S[e],
            n = k[e];
          if (d.hasOwnProperty(e)) continue;
          let r = !1;
          (r = vr(t) && vr(n) ? !yr(t, n) : t !== n),
            r
              ? void 0 !== t && null !== t
                ? P(e)
                : c.add(e)
              : void 0 !== t && c.has(e)
                ? P(e)
                : (p.protectedKeys[e] = !0);
        }
        (p.prevProp = m),
          (p.prevResolvedValues = S),
          p.isActive && (d = u(u({}, d), S)),
          r && e.blockInitialAnimation && (b = !1);
        b &&
          (!(y && A) || x) &&
          l.push(...w.map((e) => ({ animation: e, options: { type: f } })));
      }
      if (c.size) {
        const t = {};
        c.forEach((n) => {
          const r = e.getBaseTarget(n),
            i = e.getValue(n);
          i && (i.liveStyle = !0),
            (t[n] = null !== r && void 0 !== r ? r : null);
        }),
          l.push({ animation: t });
      }
      let f = Boolean(l.length);
      return (
        !r ||
          (!1 !== a.initial && a.initial !== a.animate) ||
          e.manuallyAnimateOnMount ||
          (f = !1),
        (r = !1),
        f ? t(l) : Promise.resolve()
      );
    }
    return {
      animateChanges: o,
      setActive: function (t, r) {
        var i;
        if (n[t].isActive === r) return Promise.resolve();
        null === (i = e.variantChildren) ||
          void 0 === i ||
          i.forEach((e) => {
            var n;
            return null === (n = e.animationState) || void 0 === n
              ? void 0
              : n.setActive(t, r);
          }),
          (n[t].isActive = r);
        const a = o(t);
        for (const e in n) n[e].protectedKeys = {};
        return a;
      },
      setAnimateFunction: function (n) {
        t = n(e);
      },
      getState: () => n,
      reset: () => {
        (n = hs()), (r = !0);
      },
    };
  }
  function cs(e, t) {
    return 'string' === typeof t ? t !== e : !!Array.isArray(t) && !yr(t, e);
  }
  function ds() {
    return {
      isActive: arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
      protectedKeys: {},
      needsAnimating: {},
      prevResolvedValues: {},
    };
  }
  function hs() {
    return {
      animate: ds(!0),
      whileInView: ds(),
      whileHover: ds(),
      whileTap: ds(),
      whileDrag: ds(),
      whileFocus: ds(),
      exit: ds(),
    };
  }
  class fs {
    constructor(e) {
      (this.isMounted = !1), (this.node = e);
    }
    update() {}
  }
  let ps = 0;
  const ms = {
      animation: {
        Feature: class extends fs {
          constructor(e) {
            super(e), e.animationState || (e.animationState = us(e));
          }
          updateAnimationControlsSubscription() {
            const { animate: e } = this.node.getProps();
            gr(e) && (this.unmountControls = e.subscribe(this.node));
          }
          mount() {
            this.updateAnimationControlsSubscription();
          }
          update() {
            const { animate: e } = this.node.getProps(),
              { animate: t } = this.node.prevProps || {};
            e !== t && this.updateAnimationControlsSubscription();
          }
          unmount() {
            var e;
            this.node.animationState.reset(),
              null === (e = this.unmountControls) ||
                void 0 === e ||
                e.call(this);
          }
        },
      },
      exit: {
        Feature: class extends fs {
          constructor() {
            super(...arguments), (this.id = ps++);
          }
          update() {
            if (!this.node.presenceContext) return;
            const { isPresent: e, onExitComplete: t } =
                this.node.presenceContext,
              { isPresent: n } = this.node.prevPresenceContext || {};
            if (!this.node.animationState || e === n) return;
            const r = this.node.animationState.setActive('exit', !e);
            t && !e && r.then(() => t(this.id));
          }
          mount() {
            const { register: e } = this.node.presenceContext || {};
            e && (this.unmount = e(this.id));
          }
          unmount() {}
        },
      },
    },
    gs = { x: !1, y: !1 };
  function vs() {
    return gs.x || gs.y;
  }
  const ys = (e) =>
    'mouse' === e.pointerType
      ? 'number' !== typeof e.button || e.button <= 0
      : !1 !== e.isPrimary;
  function As(e) {
    return { point: { x: e.pageX, y: e.pageY } };
  }
  function bs(e, t, n) {
    let r =
      arguments.length > 3 && void 0 !== arguments[3]
        ? arguments[3]
        : { passive: !0 };
    return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
  }
  function xs(e, t, n, r) {
    return bs(
      e,
      t,
      (
        (e) => (t) =>
          ys(t) && e(t, As(t))
      )(n),
      r
    );
  }
  const ws = (e, t) => Math.abs(e - t);
  class Ss {
    constructor(e, t) {
      let {
        transformPagePoint: n,
        contextWindow: r,
        dragSnapToOrigin: i = !1,
      } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      if (
        ((this.startEvent = null),
        (this.lastMoveEvent = null),
        (this.lastMoveEventInfo = null),
        (this.handlers = {}),
        (this.contextWindow = window),
        (this.updatePoint = () => {
          if (!this.lastMoveEvent || !this.lastMoveEventInfo) return;
          const e = Ps(this.lastMoveEventInfo, this.history),
            t = null !== this.startEvent,
            n =
              (function (e, t) {
                const n = ws(e.x, t.x),
                  r = ws(e.y, t.y);
                return Math.sqrt(n ** 2 + r ** 2);
              })(e.offset, { x: 0, y: 0 }) >= 3;
          if (!t && !n) return;
          const { point: r } = e,
            { timestamp: i } = Wr;
          this.history.push(u(u({}, r), {}, { timestamp: i }));
          const { onStart: o, onMove: a } = this.handlers;
          t ||
            (o && o(this.lastMoveEvent, e),
            (this.startEvent = this.lastMoveEvent)),
            a && a(this.lastMoveEvent, e);
        }),
        (this.handlePointerMove = (e, t) => {
          (this.lastMoveEvent = e),
            (this.lastMoveEventInfo = ks(t, this.transformPagePoint)),
            Zr.update(this.updatePoint, !0);
        }),
        (this.handlePointerUp = (e, t) => {
          this.end();
          const {
            onEnd: n,
            onSessionEnd: r,
            resumeAnimation: i,
          } = this.handlers;
          if (
            (this.dragSnapToOrigin && i && i(),
            !this.lastMoveEvent || !this.lastMoveEventInfo)
          )
            return;
          const o = Ps(
            'pointercancel' === e.type
              ? this.lastMoveEventInfo
              : ks(t, this.transformPagePoint),
            this.history
          );
          this.startEvent && n && n(e, o), r && r(e, o);
        }),
        !ys(e))
      )
        return;
      (this.dragSnapToOrigin = i),
        (this.handlers = t),
        (this.transformPagePoint = n),
        (this.contextWindow = r || window);
      const o = ks(As(e), this.transformPagePoint),
        { point: a } = o,
        { timestamp: s } = Wr;
      this.history = [u(u({}, a), {}, { timestamp: s })];
      const { onSessionStart: l } = t;
      l && l(e, Ps(o, this.history)),
        (this.removeListeners = Ko(
          xs(this.contextWindow, 'pointermove', this.handlePointerMove),
          xs(this.contextWindow, 'pointerup', this.handlePointerUp),
          xs(this.contextWindow, 'pointercancel', this.handlePointerUp)
        ));
    }
    updateHandlers(e) {
      this.handlers = e;
    }
    end() {
      this.removeListeners && this.removeListeners(), _r(this.updatePoint);
    }
  }
  function ks(e, t) {
    return t ? { point: t(e.point) } : e;
  }
  function Es(e, t) {
    return { x: e.x - t.x, y: e.y - t.y };
  }
  function Ps(e, t) {
    let { point: n } = e;
    return {
      point: n,
      delta: Es(n, Ts(t)),
      offset: Es(n, Cs(t)),
      velocity: Fs(t, 0.1),
    };
  }
  function Cs(e) {
    return e[0];
  }
  function Ts(e) {
    return e[e.length - 1];
  }
  function Fs(e, t) {
    if (e.length < 2) return { x: 0, y: 0 };
    let n = e.length - 1,
      r = null;
    const i = Ts(e);
    for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > Cr(t))); ) n--;
    if (!r) return { x: 0, y: 0 };
    const o = Tr(i.timestamp - r.timestamp);
    if (0 === o) return { x: 0, y: 0 };
    const a = { x: (i.x - r.x) / o, y: (i.y - r.y) / o };
    return a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a;
  }
  function Ds(e) {
    return (
      e &&
      'object' === typeof e &&
      Object.prototype.hasOwnProperty.call(e, 'current')
    );
  }
  function Ms(e) {
    return e.max - e.min;
  }
  function Rs(e, t, n) {
    let r =
      arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0.5;
    (e.origin = r),
      (e.originPoint = qo(t.min, t.max, e.origin)),
      (e.scale = Ms(n) / Ms(t)),
      (e.translate = qo(n.min, n.max, e.origin) - e.originPoint),
      ((e.scale >= 0.9999 && e.scale <= 1.0001) || isNaN(e.scale)) &&
        (e.scale = 1),
      ((e.translate >= -0.01 && e.translate <= 0.01) || isNaN(e.translate)) &&
        (e.translate = 0);
  }
  function js(e, t, n, r) {
    Rs(e.x, t.x, n.x, r ? r.originX : void 0),
      Rs(e.y, t.y, n.y, r ? r.originY : void 0);
  }
  function Ls(e, t, n) {
    (e.min = n.min + t.min), (e.max = e.min + Ms(t));
  }
  function zs(e, t, n) {
    (e.min = t.min - n.min), (e.max = e.min + Ms(t));
  }
  function Ns(e, t, n) {
    zs(e.x, t.x, n.x), zs(e.y, t.y, n.y);
  }
  function Bs(e, t, n) {
    return {
      min: void 0 !== t ? e.min + t : void 0,
      max: void 0 !== n ? e.max + n - (e.max - e.min) : void 0,
    };
  }
  function Vs(e, t) {
    let n = t.min - e.min,
      r = t.max - e.max;
    return (
      t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r }
    );
  }
  const Os = 0.35;
  function Is(e, t, n) {
    return { min: Us(e, t), max: Us(e, n) };
  }
  function Us(e, t) {
    return 'number' === typeof e ? e : e[t] || 0;
  }
  const Zs = () => ({ x: { min: 0, max: 0 }, y: { min: 0, max: 0 } });
  function _s(e) {
    return [e('x'), e('y')];
  }
  function Ws(e) {
    let { top: t, left: n, right: r, bottom: i } = e;
    return { x: { min: n, max: r }, y: { min: t, max: i } };
  }
  function Hs(e) {
    return void 0 === e || 1 === e;
  }
  function Js(e) {
    let { scale: t, scaleX: n, scaleY: r } = e;
    return !Hs(t) || !Hs(n) || !Hs(r);
  }
  function Ys(e) {
    return (
      Js(e) ||
      Xs(e) ||
      e.z ||
      e.rotate ||
      e.rotateX ||
      e.rotateY ||
      e.skewX ||
      e.skewY
    );
  }
  function Xs(e) {
    return Qs(e.x) || Qs(e.y);
  }
  function Qs(e) {
    return e && '0%' !== e;
  }
  function Gs(e, t, n) {
    return n + t * (e - n);
  }
  function Ks(e, t, n, r, i) {
    return void 0 !== i && (e = Gs(e, i, r)), Gs(e, n, r) + t;
  }
  function qs(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
      r = arguments.length > 3 ? arguments[3] : void 0,
      i = arguments.length > 4 ? arguments[4] : void 0;
    (e.min = Ks(e.min, t, n, r, i)), (e.max = Ks(e.max, t, n, r, i));
  }
  function $s(e, t) {
    let { x: n, y: r } = t;
    qs(e.x, n.translate, n.scale, n.originPoint),
      qs(e.y, r.translate, r.scale, r.originPoint);
  }
  const el = 0.999999999999,
    tl = 1.0000000000001;
  function nl(e, t) {
    (e.min = e.min + t), (e.max = e.max + t);
  }
  function rl(e, t, n, r) {
    let i =
      arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0.5;
    qs(e, t, n, qo(e.min, e.max, i), r);
  }
  function il(e, t) {
    rl(e.x, t.x, t.scaleX, t.scale, t.originX),
      rl(e.y, t.y, t.scaleY, t.scale, t.originY);
  }
  function ol(e, t) {
    return Ws(
      (function (e, t) {
        if (!t) return e;
        const n = t({ x: e.left, y: e.top }),
          r = t({ x: e.right, y: e.bottom });
        return { top: n.y, left: n.x, bottom: r.y, right: r.x };
      })(e.getBoundingClientRect(), t)
    );
  }
  const al = (e) => {
      let { current: t } = e;
      return t ? t.ownerDocument.defaultView : null;
    },
    sl = new WeakMap();
  class ll {
    constructor(e) {
      (this.openDragLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
        (this.visualElement = e);
    }
    start(e) {
      let { snapToCursor: t = !1 } =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      const { presenceContext: n } = this.visualElement;
      if (n && !1 === n.isPresent) return;
      const { dragSnapToOrigin: r } = this.getProps();
      this.panSession = new Ss(
        e,
        {
          onSessionStart: (e) => {
            const { dragSnapToOrigin: n } = this.getProps();
            n ? this.pauseAnimation() : this.stopAnimation(),
              t && this.snapToCursor(As(e).point);
          },
          onStart: (e, t) => {
            const {
              drag: n,
              dragPropagation: r,
              onDragStart: i,
            } = this.getProps();
            if (
              n &&
              !r &&
              (this.openDragLock && this.openDragLock(),
              (this.openDragLock =
                'x' === (o = n) || 'y' === o
                  ? gs[o]
                    ? null
                    : ((gs[o] = !0),
                      () => {
                        gs[o] = !1;
                      })
                  : gs.x || gs.y
                    ? null
                    : ((gs.x = gs.y = !0),
                      () => {
                        gs.x = gs.y = !1;
                      })),
              !this.openDragLock)
            )
              return;
            var o;
            (this.isDragging = !0),
              (this.currentDirection = null),
              this.resolveConstraints(),
              this.visualElement.projection &&
                ((this.visualElement.projection.isAnimationBlocked = !0),
                (this.visualElement.projection.target = void 0)),
              _s((e) => {
                let t = this.getAxisMotionValue(e).get() || 0;
                if (bi.test(t)) {
                  const { projection: n } = this.visualElement;
                  if (n && n.layout) {
                    const r = n.layout.layoutBox[e];
                    if (r) {
                      t = Ms(r) * (parseFloat(t) / 100);
                    }
                  }
                }
                this.originPoint[e] = t;
              }),
              i && Zr.postRender(() => i(e, t)),
              Ka(this.visualElement, 'transform');
            const { animationState: a } = this.visualElement;
            a && a.setActive('whileDrag', !0);
          },
          onMove: (e, t) => {
            const {
              dragPropagation: n,
              dragDirectionLock: r,
              onDirectionLock: i,
              onDrag: o,
            } = this.getProps();
            if (!n && !this.openDragLock) return;
            const { offset: a } = t;
            if (r && null === this.currentDirection)
              return (
                (this.currentDirection = (function (e) {
                  let t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 10,
                    n = null;
                  Math.abs(e.y) > t
                    ? (n = 'y')
                    : Math.abs(e.x) > t && (n = 'x');
                  return n;
                })(a)),
                void (
                  null !== this.currentDirection &&
                  i &&
                  i(this.currentDirection)
                )
              );
            this.updateAxis('x', t.point, a),
              this.updateAxis('y', t.point, a),
              this.visualElement.render(),
              o && o(e, t);
          },
          onSessionEnd: (e, t) => this.stop(e, t),
          resumeAnimation: () =>
            _s((e) => {
              var t;
              return (
                'paused' === this.getAnimationState(e) &&
                (null === (t = this.getAxisMotionValue(e).animation) ||
                void 0 === t
                  ? void 0
                  : t.play())
              );
            }),
        },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: r,
          contextWindow: al(this.visualElement),
        }
      );
    }
    stop(e, t) {
      const n = this.isDragging;
      if ((this.cancel(), !n)) return;
      const { velocity: r } = t;
      this.startAnimation(r);
      const { onDragEnd: i } = this.getProps();
      i && Zr.postRender(() => i(e, t));
    }
    cancel() {
      this.isDragging = !1;
      const { projection: e, animationState: t } = this.visualElement;
      e && (e.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        (this.panSession = void 0);
      const { dragPropagation: n } = this.getProps();
      !n &&
        this.openDragLock &&
        (this.openDragLock(), (this.openDragLock = null)),
        t && t.setActive('whileDrag', !1);
    }
    updateAxis(e, t, n) {
      const { drag: r } = this.getProps();
      if (!n || !ul(e, r, this.currentDirection)) return;
      const i = this.getAxisMotionValue(e);
      let o = this.originPoint[e] + n[e];
      this.constraints &&
        this.constraints[e] &&
        (o = (function (e, t, n) {
          let { min: r, max: i } = t;
          return (
            void 0 !== r && e < r
              ? (e = n ? qo(r, e, n.min) : Math.max(e, r))
              : void 0 !== i &&
                e > i &&
                (e = n ? qo(i, e, n.max) : Math.min(e, i)),
            e
          );
        })(o, this.constraints[e], this.elastic[e])),
        i.set(o);
    }
    resolveConstraints() {
      var e;
      const { dragConstraints: t, dragElastic: n } = this.getProps(),
        r =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : null === (e = this.visualElement.projection) || void 0 === e
              ? void 0
              : e.layout,
        i = this.constraints;
      t && Ds(t)
        ? this.constraints || (this.constraints = this.resolveRefConstraints())
        : (this.constraints =
            !(!t || !r) &&
            (function (e, t) {
              let { top: n, left: r, bottom: i, right: o } = t;
              return { x: Bs(e.x, r, o), y: Bs(e.y, n, i) };
            })(r.layoutBox, t)),
        (this.elastic = (function () {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Os;
          return (
            !1 === e ? (e = 0) : !0 === e && (e = Os),
            { x: Is(e, 'left', 'right'), y: Is(e, 'top', 'bottom') }
          );
        })(n)),
        i !== this.constraints &&
          r &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          _s((e) => {
            !1 !== this.constraints &&
              this.getAxisMotionValue(e) &&
              (this.constraints[e] = (function (e, t) {
                const n = {};
                return (
                  void 0 !== t.min && (n.min = t.min - e.min),
                  void 0 !== t.max && (n.max = t.max - e.min),
                  n
                );
              })(r.layoutBox[e], this.constraints[e]));
          });
    }
    resolveRefConstraints() {
      const { dragConstraints: e, onMeasureDragConstraints: t } =
        this.getProps();
      if (!e || !Ds(e)) return !1;
      const n = e.current;
      oi(
        null !== n,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
      );
      const { projection: r } = this.visualElement;
      if (!r || !r.layout) return !1;
      const i = (function (e, t, n) {
        const r = ol(e, n),
          { scroll: i } = t;
        return i && (nl(r.x, i.offset.x), nl(r.y, i.offset.y)), r;
      })(n, r.root, this.visualElement.getTransformPagePoint());
      let o = (function (e, t) {
        return { x: Vs(e.x, t.x), y: Vs(e.y, t.y) };
      })(r.layout.layoutBox, i);
      if (t) {
        const e = t(
          (function (e) {
            let { x: t, y: n } = e;
            return { top: n.min, right: t.max, bottom: n.max, left: t.min };
          })(o)
        );
        (this.hasMutatedConstraints = !!e), e && (o = Ws(e));
      }
      return o;
    }
    startAnimation(e) {
      const {
          drag: t,
          dragMomentum: n,
          dragElastic: r,
          dragTransition: i,
          dragSnapToOrigin: o,
          onDragTransitionEnd: a,
        } = this.getProps(),
        s = this.constraints || {},
        l = _s((a) => {
          if (!ul(a, t, this.currentDirection)) return;
          let l = (s && s[a]) || {};
          o && (l = { min: 0, max: 0 });
          const c = r ? 200 : 1e6,
            d = r ? 40 : 1e7,
            h = u(
              u(
                {
                  type: 'inertia',
                  velocity: n ? e[a] : 0,
                  bounceStiffness: c,
                  bounceDamping: d,
                  timeConstant: 750,
                  restDelta: 1,
                  restSpeed: 10,
                },
                i
              ),
              l
            );
          return this.startAxisValueAnimation(a, h);
        });
      return Promise.all(l).then(a);
    }
    startAxisValueAnimation(e, t) {
      const n = this.getAxisMotionValue(e);
      return (
        Ka(this.visualElement, e),
        n.start(Va(e, n, 0, t, this.visualElement, !1))
      );
    }
    stopAnimation() {
      _s((e) => this.getAxisMotionValue(e).stop());
    }
    pauseAnimation() {
      _s((e) => {
        var t;
        return null === (t = this.getAxisMotionValue(e).animation) ||
          void 0 === t
          ? void 0
          : t.pause();
      });
    }
    getAnimationState(e) {
      var t;
      return null === (t = this.getAxisMotionValue(e).animation) || void 0 === t
        ? void 0
        : t.state;
    }
    getAxisMotionValue(e) {
      const t = '_drag'.concat(e.toUpperCase()),
        n = this.visualElement.getProps(),
        r = n[t];
      return (
        r ||
        this.visualElement.getValue(e, (n.initial ? n.initial[e] : void 0) || 0)
      );
    }
    snapToCursor(e) {
      _s((t) => {
        const { drag: n } = this.getProps();
        if (!ul(t, n, this.currentDirection)) return;
        const { projection: r } = this.visualElement,
          i = this.getAxisMotionValue(t);
        if (r && r.layout) {
          const { min: n, max: o } = r.layout.layoutBox[t];
          i.set(e[t] - qo(n, o, 0.5));
        }
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      const { drag: e, dragConstraints: t } = this.getProps(),
        { projection: n } = this.visualElement;
      if (!Ds(t) || !n || !this.constraints) return;
      this.stopAnimation();
      const r = { x: 0, y: 0 };
      _s((e) => {
        const t = this.getAxisMotionValue(e);
        if (t && !1 !== this.constraints) {
          const n = t.get();
          r[e] = (function (e, t) {
            let n = 0.5;
            const r = Ms(e),
              i = Ms(t);
            return (
              i > r
                ? (n = To(t.min, t.max - r, e.min))
                : r > i && (n = To(e.min, e.max - i, t.min)),
              pi(0, 1, n)
            );
          })({ min: n, max: n }, this.constraints[e]);
        }
      });
      const { transformTemplate: i } = this.visualElement.getProps();
      (this.visualElement.current.style.transform = i ? i({}, '') : 'none'),
        n.root && n.root.updateScroll(),
        n.updateLayout(),
        this.resolveConstraints(),
        _s((t) => {
          if (!ul(t, e, null)) return;
          const n = this.getAxisMotionValue(t),
            { min: i, max: o } = this.constraints[t];
          n.set(qo(i, o, r[t]));
        });
    }
    addListeners() {
      if (!this.visualElement.current) return;
      sl.set(this.visualElement, this);
      const e = xs(this.visualElement.current, 'pointerdown', (e) => {
          const { drag: t, dragListener: n = !0 } = this.getProps();
          t && n && this.start(e);
        }),
        t = () => {
          const { dragConstraints: e } = this.getProps();
          Ds(e) &&
            e.current &&
            (this.constraints = this.resolveRefConstraints());
        },
        { projection: n } = this.visualElement,
        r = n.addEventListener('measure', t);
      n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()),
        Zr.read(t);
      const i = bs(window, 'resize', () =>
          this.scalePositionWithinConstraints()
        ),
        o = n.addEventListener('didUpdate', (e) => {
          let { delta: t, hasLayoutChanged: n } = e;
          this.isDragging &&
            n &&
            (_s((e) => {
              const n = this.getAxisMotionValue(e);
              n &&
                ((this.originPoint[e] += t[e].translate),
                n.set(n.get() + t[e].translate));
            }),
            this.visualElement.render());
        });
      return () => {
        i(), e(), r(), o && o();
      };
    }
    getProps() {
      const e = this.visualElement.getProps(),
        {
          drag: t = !1,
          dragDirectionLock: n = !1,
          dragPropagation: r = !1,
          dragConstraints: i = !1,
          dragElastic: o = Os,
          dragMomentum: a = !0,
        } = e;
      return u(
        u({}, e),
        {},
        {
          drag: t,
          dragDirectionLock: n,
          dragPropagation: r,
          dragConstraints: i,
          dragElastic: o,
          dragMomentum: a,
        }
      );
    }
  }
  function ul(e, t, n) {
    return (!0 === t || t === e) && (null === n || n === e);
  }
  const cl = (e) => (t, n) => {
    e && Zr.postRender(() => e(t, n));
  };
  const dl = (0, r.createContext)(null);
  const hl = (0, r.createContext)({}),
    fl = (0, r.createContext)({}),
    pl = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
  function ml(e, t) {
    return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
  }
  const gl = {
      correct: (e, t) => {
        if (!t.target) return e;
        if ('string' === typeof e) {
          if (!xi.test(e)) return e;
          e = parseFloat(e);
        }
        const n = ml(e, t.target.x),
          r = ml(e, t.target.y);
        return ''.concat(n, '% ').concat(r, '%');
      },
    },
    vl = {
      correct: (e, t) => {
        let { treeScale: n, projectionDelta: r } = t;
        const i = e,
          o = oo.parse(e);
        if (o.length > 5) return i;
        const a = oo.createTransformer(e),
          s = 'number' !== typeof o[0] ? 1 : 0,
          l = r.x.scale * n.x,
          u = r.y.scale * n.y;
        (o[0 + s] /= l), (o[1 + s] /= u);
        const c = qo(l, u, 0.5);
        return (
          'number' === typeof o[2 + s] && (o[2 + s] /= c),
          'number' === typeof o[3 + s] && (o[3 + s] /= c),
          a(o)
        );
      },
    },
    yl = {};
  const { schedule: Al, cancel: bl } = Ur(queueMicrotask, !1);
  class xl extends r.Component {
    componentDidMount() {
      const {
          visualElement: e,
          layoutGroup: t,
          switchLayoutGroup: n,
          layoutId: r,
        } = this.props,
        { projection: i } = e;
      var o;
      (o = Sl),
        Object.assign(yl, o),
        i &&
          (t.group && t.group.add(i),
          n && n.register && r && n.register(i),
          i.root.didUpdate(),
          i.addEventListener('animationComplete', () => {
            this.safeToRemove();
          }),
          i.setOptions(
            u(
              u({}, i.options),
              {},
              { onExitComplete: () => this.safeToRemove() }
            )
          )),
        (pl.hasEverUpdated = !0);
    }
    getSnapshotBeforeUpdate(e) {
      const {
          layoutDependency: t,
          visualElement: n,
          drag: r,
          isPresent: i,
        } = this.props,
        o = n.projection;
      return o
        ? ((o.isPresent = i),
          r || e.layoutDependency !== t || void 0 === t
            ? o.willUpdate()
            : this.safeToRemove(),
          e.isPresent !== i &&
            (i
              ? o.promote()
              : o.relegate() ||
                Zr.postRender(() => {
                  const e = o.getStack();
                  (e && e.members.length) || this.safeToRemove();
                })),
          null)
        : null;
    }
    componentDidUpdate() {
      const { projection: e } = this.props.visualElement;
      e &&
        (e.root.didUpdate(),
        Al.postRender(() => {
          !e.currentAnimation && e.isLead() && this.safeToRemove();
        }));
    }
    componentWillUnmount() {
      const {
          visualElement: e,
          layoutGroup: t,
          switchLayoutGroup: n,
        } = this.props,
        { projection: r } = e;
      r &&
        (r.scheduleCheckAfterUnmount(),
        t && t.group && t.group.remove(r),
        n && n.deregister && n.deregister(r));
    }
    safeToRemove() {
      const { safeToRemove: e } = this.props;
      e && e();
    }
    render() {
      return null;
    }
  }
  function wl(e) {
    const [t, n] = (function () {
        const e = (0, r.useContext)(dl);
        if (null === e) return [!0, null];
        const { isPresent: t, onExitComplete: n, register: i } = e,
          o = (0, r.useId)();
        (0, r.useEffect)(() => i(o), []);
        const a = (0, r.useCallback)(() => n && n(o), [o, n]);
        return !t && n ? [!1, a] : [!0];
      })(),
      i = (0, r.useContext)(hl);
    return (0, Fn.jsx)(
      xl,
      u(
        u({}, e),
        {},
        {
          layoutGroup: i,
          switchLayoutGroup: (0, r.useContext)(fl),
          isPresent: t,
          safeToRemove: n,
        }
      )
    );
  }
  const Sl = {
      borderRadius: u(
        u({}, gl),
        {},
        {
          applyTo: [
            'borderTopLeftRadius',
            'borderTopRightRadius',
            'borderBottomLeftRadius',
            'borderBottomRightRadius',
          ],
        }
      ),
      borderTopLeftRadius: gl,
      borderTopRightRadius: gl,
      borderBottomLeftRadius: gl,
      borderBottomRightRadius: gl,
      boxShadow: vl,
    },
    kl = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
    El = kl.length,
    Pl = (e) => ('string' === typeof e ? parseFloat(e) : e),
    Cl = (e) => 'number' === typeof e || xi.test(e);
  function Tl(e, t) {
    return void 0 !== e[t] ? e[t] : e.borderRadius;
  }
  const Fl = Ml(0, 0.5, ti),
    Dl = Ml(0.5, 0.95, Or);
  function Ml(e, t, n) {
    return (r) => (r < e ? 0 : r > t ? 1 : n(To(e, t, r)));
  }
  function Rl(e, t) {
    (e.min = t.min), (e.max = t.max);
  }
  function jl(e, t) {
    Rl(e.x, t.x), Rl(e.y, t.y);
  }
  function Ll(e, t) {
    (e.translate = t.translate),
      (e.scale = t.scale),
      (e.originPoint = t.originPoint),
      (e.origin = t.origin);
  }
  function zl(e, t, n, r, i) {
    return (
      (e = Gs((e -= t), 1 / n, r)), void 0 !== i && (e = Gs(e, 1 / i, r)), e
    );
  }
  function Nl(e, t, n, r, i) {
    let [o, a, s] = n;
    !(function (e) {
      let t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
        r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0.5,
        i = arguments.length > 4 ? arguments[4] : void 0,
        o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : e,
        a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : e;
      bi.test(t) &&
        ((t = parseFloat(t)), (t = qo(a.min, a.max, t / 100) - a.min));
      if ('number' !== typeof t) return;
      let s = qo(o.min, o.max, r);
      e === o && (s -= t),
        (e.min = zl(e.min, t, n, s, i)),
        (e.max = zl(e.max, t, n, s, i));
    })(e, t[o], t[a], t[s], t.scale, r, i);
  }
  const Bl = ['x', 'scaleX', 'originX'],
    Vl = ['y', 'scaleY', 'originY'];
  function Ol(e, t, n, r) {
    Nl(e.x, t, Bl, n ? n.x : void 0, r ? r.x : void 0),
      Nl(e.y, t, Vl, n ? n.y : void 0, r ? r.y : void 0);
  }
  function Il(e) {
    return 0 === e.translate && 1 === e.scale;
  }
  function Ul(e) {
    return Il(e.x) && Il(e.y);
  }
  function Zl(e, t) {
    return e.min === t.min && e.max === t.max;
  }
  function _l(e, t) {
    return (
      Math.round(e.min) === Math.round(t.min) &&
      Math.round(e.max) === Math.round(t.max)
    );
  }
  function Wl(e, t) {
    return _l(e.x, t.x) && _l(e.y, t.y);
  }
  function Hl(e) {
    return Ms(e.x) / Ms(e.y);
  }
  function Jl(e, t) {
    return (
      e.translate === t.translate &&
      e.scale === t.scale &&
      e.originPoint === t.originPoint
    );
  }
  class Yl {
    constructor() {
      this.members = [];
    }
    add(e) {
      Oa(this.members, e), e.scheduleRender();
    }
    remove(e) {
      if (
        (Ia(this.members, e),
        e === this.prevLead && (this.prevLead = void 0),
        e === this.lead)
      ) {
        const e = this.members[this.members.length - 1];
        e && this.promote(e);
      }
    }
    relegate(e) {
      const t = this.members.findIndex((t) => e === t);
      if (0 === t) return !1;
      let n;
      for (let r = t; r >= 0; r--) {
        const e = this.members[r];
        if (!1 !== e.isPresent) {
          n = e;
          break;
        }
      }
      return !!n && (this.promote(n), !0);
    }
    promote(e, t) {
      const n = this.lead;
      if (e !== n && ((this.prevLead = n), (this.lead = e), e.show(), n)) {
        n.instance && n.scheduleRender(),
          e.scheduleRender(),
          (e.resumeFrom = n),
          t && (e.resumeFrom.preserveOpacity = !0),
          n.snapshot &&
            ((e.snapshot = n.snapshot),
            (e.snapshot.latestValues = n.animationValues || n.latestValues)),
          e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
        const { crossfade: r } = e.options;
        !1 === r && n.hide();
      }
    }
    exitAnimationComplete() {
      this.members.forEach((e) => {
        const { options: t, resumingFrom: n } = e;
        t.onExitComplete && t.onExitComplete(),
          n && n.options.onExitComplete && n.options.onExitComplete();
      });
    }
    scheduleRender() {
      this.members.forEach((e) => {
        e.instance && e.scheduleRender(!1);
      });
    }
    removeLeadSnapshot() {
      this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
    }
  }
  const Xl = (e, t) => e.depth - t.depth;
  class Ql {
    constructor() {
      (this.children = []), (this.isDirty = !1);
    }
    add(e) {
      Oa(this.children, e), (this.isDirty = !0);
    }
    remove(e) {
      Ia(this.children, e), (this.isDirty = !0);
    }
    forEach(e) {
      this.isDirty && this.children.sort(Xl),
        (this.isDirty = !1),
        this.children.forEach(e);
    }
  }
  function Gl(e) {
    const t = Ga(e) ? e.get() : e;
    return (
      (n = t),
      Boolean(n && 'object' === typeof n && n.mix && n.toValue)
        ? t.toValue()
        : t
    );
    var n;
  }
  function Kl(e, t) {
    const n = So.now(),
      r = (i) => {
        let { timestamp: o } = i;
        const a = o - n;
        a >= t && (_r(r), e(a - t));
      };
    return Zr.read(r, !0), () => _r(r);
  }
  const ql = {
      type: 'projectionFrame',
      totalNodes: 0,
      resolvedTargetDeltas: 0,
      recalculatedProjection: 0,
    },
    $l = 'undefined' !== typeof window && void 0 !== window.MotionDebug,
    eu = ['', 'X', 'Y', 'Z'],
    tu = { visibility: 'hidden' };
  let nu = 0;
  function ru(e, t, n, r) {
    const { latestValues: i } = t;
    i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
  }
  function iu(e) {
    if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
    const { visualElement: t } = e.options;
    if (!t) return;
    const n = Qa(t);
    if (window.MotionHasOptimisedAnimation(n, 'transform')) {
      const { layout: t, layoutId: r } = e.options;
      window.MotionCancelOptimisedAnimation(n, 'transform', Zr, !(t || r));
    }
    const { parent: r } = e;
    r && !r.hasCheckedOptimisedAppear && iu(r);
  }
  function ou(e) {
    let {
      attachResizeListener: t,
      defaultParent: n,
      measureScroll: r,
      checkIsScrollRoot: i,
      resetTransform: o,
    } = e;
    return class {
      constructor() {
        let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null === n || void 0 === n
                ? void 0
                : n();
        (this.id = nu++),
          (this.animationId = 0),
          (this.children = new Set()),
          (this.options = {}),
          (this.isTreeAnimating = !1),
          (this.isAnimationBlocked = !1),
          (this.isLayoutDirty = !1),
          (this.isProjectionDirty = !1),
          (this.isSharedProjectionDirty = !1),
          (this.isTransformDirty = !1),
          (this.updateManuallyBlocked = !1),
          (this.updateBlockedByResize = !1),
          (this.isUpdating = !1),
          (this.isSVG = !1),
          (this.needsReset = !1),
          (this.shouldResetTransform = !1),
          (this.hasCheckedOptimisedAppear = !1),
          (this.treeScale = { x: 1, y: 1 }),
          (this.eventHandlers = new Map()),
          (this.hasTreeAnimated = !1),
          (this.updateScheduled = !1),
          (this.scheduleUpdate = () => this.update()),
          (this.projectionUpdateScheduled = !1),
          (this.checkUpdateFailed = () => {
            this.isUpdating &&
              ((this.isUpdating = !1), this.clearAllSnapshots());
          }),
          (this.updateProjection = () => {
            (this.projectionUpdateScheduled = !1),
              $l &&
                (ql.totalNodes =
                  ql.resolvedTargetDeltas =
                  ql.recalculatedProjection =
                    0),
              this.nodes.forEach(lu),
              this.nodes.forEach(mu),
              this.nodes.forEach(gu),
              this.nodes.forEach(uu),
              $l && window.MotionDebug.record(ql);
          }),
          (this.resolvedRelativeTargetAt = 0),
          (this.hasProjected = !1),
          (this.isVisible = !0),
          (this.animationProgress = 0),
          (this.sharedNodes = new Map()),
          (this.latestValues = e),
          (this.root = t ? t.root || t : this),
          (this.path = t ? [...t.path, t] : []),
          (this.parent = t),
          (this.depth = t ? t.depth + 1 : 0);
        for (let n = 0; n < this.path.length; n++)
          this.path[n].shouldResetTransform = !0;
        this.root === this && (this.nodes = new Ql());
      }
      addEventListener(e, t) {
        return (
          this.eventHandlers.has(e) || this.eventHandlers.set(e, new Ua()),
          this.eventHandlers.get(e).add(t)
        );
      }
      notifyListeners(e) {
        const t = this.eventHandlers.get(e);
        for (
          var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
          i < n;
          i++
        )
          r[i - 1] = arguments[i];
        t && t.notify(...r);
      }
      hasListeners(e) {
        return this.eventHandlers.has(e);
      }
      mount(e) {
        let n =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : this.root.hasTreeAnimated;
        if (this.instance) return;
        var r;
        (this.isSVG = (r = e) instanceof SVGElement && 'svg' !== r.tagName),
          (this.instance = e);
        const { layoutId: i, layout: o, visualElement: a } = this.options;
        if (
          (a && !a.current && a.mount(e),
          this.root.nodes.add(this),
          this.parent && this.parent.children.add(this),
          n && (o || i) && (this.isLayoutDirty = !0),
          t)
        ) {
          let n;
          const r = () => (this.root.updateBlockedByResize = !1);
          t(e, () => {
            (this.root.updateBlockedByResize = !0),
              n && n(),
              (n = Kl(r, 250)),
              pl.hasAnimatedSinceResize &&
                ((pl.hasAnimatedSinceResize = !1), this.nodes.forEach(pu));
          });
        }
        i && this.root.registerSharedNode(i, this),
          !1 !== this.options.animate &&
            a &&
            (i || o) &&
            this.addEventListener('didUpdate', (e) => {
              let {
                delta: t,
                hasLayoutChanged: n,
                hasRelativeTargetChanged: r,
                layout: i,
              } = e;
              if (this.isTreeAnimationBlocked())
                return (
                  (this.target = void 0), void (this.relativeTarget = void 0)
                );
              const o =
                  this.options.transition || a.getDefaultTransition() || wu,
                { onLayoutAnimationStart: s, onLayoutAnimationComplete: l } =
                  a.getProps(),
                c = !this.targetLayout || !Wl(this.targetLayout, i) || r,
                d = !n && r;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                d ||
                (n && (c || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(t, d);
                const e = u(
                  u({}, jr(o, 'layout')),
                  {},
                  { onPlay: s, onComplete: l }
                );
                (a.shouldReduceMotion || this.options.layoutRoot) &&
                  ((e.delay = 0), (e.type = !1)),
                  this.startAnimation(e);
              } else
                n || pu(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = i;
            });
      }
      unmount() {
        this.options.layoutId && this.willUpdate(),
          this.root.nodes.remove(this);
        const e = this.getStack();
        e && e.remove(this),
          this.parent && this.parent.children.delete(this),
          (this.instance = void 0),
          _r(this.updateProjection);
      }
      blockUpdate() {
        this.updateManuallyBlocked = !0;
      }
      unblockUpdate() {
        this.updateManuallyBlocked = !1;
      }
      isUpdateBlocked() {
        return this.updateManuallyBlocked || this.updateBlockedByResize;
      }
      isTreeAnimationBlocked() {
        return (
          this.isAnimationBlocked ||
          (this.parent && this.parent.isTreeAnimationBlocked()) ||
          !1
        );
      }
      startUpdate() {
        this.isUpdateBlocked() ||
          ((this.isUpdating = !0),
          this.nodes && this.nodes.forEach(vu),
          this.animationId++);
      }
      getTransformTemplate() {
        const { visualElement: e } = this.options;
        return e && e.getProps().transformTemplate;
      }
      willUpdate() {
        let e =
          !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked()))
          return void (
            this.options.onExitComplete && this.options.onExitComplete()
          );
        if (
          (window.MotionCancelOptimisedAnimation &&
            !this.hasCheckedOptimisedAppear &&
            iu(this),
          !this.root.isUpdating && this.root.startUpdate(),
          this.isLayoutDirty)
        )
          return;
        this.isLayoutDirty = !0;
        for (let i = 0; i < this.path.length; i++) {
          const e = this.path[i];
          (e.shouldResetTransform = !0),
            e.updateScroll('snapshot'),
            e.options.layoutRoot && e.willUpdate(!1);
        }
        const { layoutId: t, layout: n } = this.options;
        if (void 0 === t && !n) return;
        const r = this.getTransformTemplate();
        (this.prevTransformTemplateValue = r
          ? r(this.latestValues, '')
          : void 0),
          this.updateSnapshot(),
          e && this.notifyListeners('willUpdate');
      }
      update() {
        this.updateScheduled = !1;
        if (this.isUpdateBlocked())
          return (
            this.unblockUpdate(),
            this.clearAllSnapshots(),
            void this.nodes.forEach(du)
          );
        this.isUpdating || this.nodes.forEach(hu),
          (this.isUpdating = !1),
          this.nodes.forEach(fu),
          this.nodes.forEach(au),
          this.nodes.forEach(su),
          this.clearAllSnapshots();
        const e = So.now();
        (Wr.delta = pi(0, 1e3 / 60, e - Wr.timestamp)),
          (Wr.timestamp = e),
          (Wr.isProcessing = !0),
          Hr.update.process(Wr),
          Hr.preRender.process(Wr),
          Hr.render.process(Wr),
          (Wr.isProcessing = !1);
      }
      didUpdate() {
        this.updateScheduled ||
          ((this.updateScheduled = !0), Al.read(this.scheduleUpdate));
      }
      clearAllSnapshots() {
        this.nodes.forEach(cu), this.sharedNodes.forEach(yu);
      }
      scheduleUpdateProjection() {
        this.projectionUpdateScheduled ||
          ((this.projectionUpdateScheduled = !0),
          Zr.preRender(this.updateProjection, !1, !0));
      }
      scheduleCheckAfterUnmount() {
        Zr.postRender(() => {
          this.isLayoutDirty
            ? this.root.didUpdate()
            : this.root.checkUpdateFailed();
        });
      }
      updateSnapshot() {
        !this.snapshot && this.instance && (this.snapshot = this.measure());
      }
      updateLayout() {
        if (!this.instance) return;
        if (
          (this.updateScroll(),
          (!this.options.alwaysMeasureLayout || !this.isLead()) &&
            !this.isLayoutDirty)
        )
          return;
        if (this.resumeFrom && !this.resumeFrom.instance)
          for (let n = 0; n < this.path.length; n++) {
            this.path[n].updateScroll();
          }
        const e = this.layout;
        (this.layout = this.measure(!1)),
          (this.layoutCorrected = {
            x: { min: 0, max: 0 },
            y: { min: 0, max: 0 },
          }),
          (this.isLayoutDirty = !1),
          (this.projectionDelta = void 0),
          this.notifyListeners('measure', this.layout.layoutBox);
        const { visualElement: t } = this.options;
        t &&
          t.notify(
            'LayoutMeasure',
            this.layout.layoutBox,
            e ? e.layoutBox : void 0
          );
      }
      updateScroll() {
        let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'measure',
          t = Boolean(this.options.layoutScroll && this.instance);
        if (
          (this.scroll &&
            this.scroll.animationId === this.root.animationId &&
            this.scroll.phase === e &&
            (t = !1),
          t)
        ) {
          const t = i(this.instance);
          this.scroll = {
            animationId: this.root.animationId,
            phase: e,
            isRoot: t,
            offset: r(this.instance),
            wasRoot: this.scroll ? this.scroll.isRoot : t,
          };
        }
      }
      resetTransform() {
        if (!o) return;
        const e =
            this.isLayoutDirty ||
            this.shouldResetTransform ||
            this.options.alwaysMeasureLayout,
          t = this.projectionDelta && !Ul(this.projectionDelta),
          n = this.getTransformTemplate(),
          r = n ? n(this.latestValues, '') : void 0,
          i = r !== this.prevTransformTemplateValue;
        e &&
          (t || Ys(this.latestValues) || i) &&
          (o(this.instance, r),
          (this.shouldResetTransform = !1),
          this.scheduleRender());
      }
      measure() {
        let e =
          !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        const t = this.measurePageBox();
        let n = this.removeElementScroll(t);
        var r;
        return (
          e && (n = this.removeTransform(n)),
          Eu((r = n).x),
          Eu(r.y),
          {
            animationId: this.root.animationId,
            measuredBox: t,
            layoutBox: n,
            latestValues: {},
            source: this.id,
          }
        );
      }
      measurePageBox() {
        var e;
        const { visualElement: t } = this.options;
        if (!t) return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        const n = t.measureViewportBox();
        if (
          !(
            (null === (e = this.scroll) || void 0 === e ? void 0 : e.wasRoot) ||
            this.path.some(Cu)
          )
        ) {
          const { scroll: e } = this.root;
          e && (nl(n.x, e.offset.x), nl(n.y, e.offset.y));
        }
        return n;
      }
      removeElementScroll(e) {
        var t;
        const n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        if (
          (jl(n, e),
          null === (t = this.scroll) || void 0 === t ? void 0 : t.wasRoot)
        )
          return n;
        for (let r = 0; r < this.path.length; r++) {
          const t = this.path[r],
            { scroll: i, options: o } = t;
          t !== this.root &&
            i &&
            o.layoutScroll &&
            (i.wasRoot && jl(n, e), nl(n.x, i.offset.x), nl(n.y, i.offset.y));
        }
        return n;
      }
      applyTransform(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        const n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        jl(n, e);
        for (let r = 0; r < this.path.length; r++) {
          const e = this.path[r];
          !t &&
            e.options.layoutScroll &&
            e.scroll &&
            e !== e.root &&
            il(n, { x: -e.scroll.offset.x, y: -e.scroll.offset.y }),
            Ys(e.latestValues) && il(n, e.latestValues);
        }
        return Ys(this.latestValues) && il(n, this.latestValues), n;
      }
      removeTransform(e) {
        const t = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        jl(t, e);
        for (let n = 0; n < this.path.length; n++) {
          const e = this.path[n];
          if (!e.instance) continue;
          if (!Ys(e.latestValues)) continue;
          Js(e.latestValues) && e.updateSnapshot();
          const r = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          jl(r, e.measurePageBox()),
            Ol(
              t,
              e.latestValues,
              e.snapshot ? e.snapshot.layoutBox : void 0,
              r
            );
        }
        return Ys(this.latestValues) && Ol(t, this.latestValues), t;
      }
      setTargetDelta(e) {
        (this.targetDelta = e),
          this.root.scheduleUpdateProjection(),
          (this.isProjectionDirty = !0);
      }
      setOptions(e) {
        this.options = u(
          u(u({}, this.options), e),
          {},
          { crossfade: void 0 === e.crossfade || e.crossfade }
        );
      }
      clearMeasurements() {
        (this.scroll = void 0),
          (this.layout = void 0),
          (this.snapshot = void 0),
          (this.prevTransformTemplateValue = void 0),
          (this.targetDelta = void 0),
          (this.target = void 0),
          (this.isLayoutDirty = !1);
      }
      forceRelativeParentToResolveTarget() {
        this.relativeParent &&
          this.relativeParent.resolvedRelativeTargetAt !== Wr.timestamp &&
          this.relativeParent.resolveTargetDelta(!0);
      }
      resolveTargetDelta() {
        let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var t;
        const n = this.getLead();
        this.isProjectionDirty ||
          (this.isProjectionDirty = n.isProjectionDirty),
          this.isTransformDirty || (this.isTransformDirty = n.isTransformDirty),
          this.isSharedProjectionDirty ||
            (this.isSharedProjectionDirty = n.isSharedProjectionDirty);
        const r = Boolean(this.resumingFrom) || this !== n;
        if (
          !(
            e ||
            (r && this.isSharedProjectionDirty) ||
            this.isProjectionDirty ||
            (null === (t = this.parent) || void 0 === t
              ? void 0
              : t.isProjectionDirty) ||
            this.attemptToResolveRelativeTarget ||
            this.root.updateBlockedByResize
          )
        )
          return;
        const { layout: i, layoutId: o } = this.options;
        if (this.layout && (i || o)) {
          if (
            ((this.resolvedRelativeTargetAt = Wr.timestamp),
            !this.targetDelta && !this.relativeTarget)
          ) {
            const e = this.getClosestProjectingParent();
            e && e.layout && 1 !== this.animationProgress
              ? ((this.relativeParent = e),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = {
                  x: { min: 0, max: 0 },
                  y: { min: 0, max: 0 },
                }),
                (this.relativeTargetOrigin = {
                  x: { min: 0, max: 0 },
                  y: { min: 0, max: 0 },
                }),
                Ns(
                  this.relativeTargetOrigin,
                  this.layout.layoutBox,
                  e.layout.layoutBox
                ),
                jl(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          if (this.relativeTarget || this.targetDelta) {
            var a, s, l;
            if (
              (this.target ||
                ((this.target = {
                  x: { min: 0, max: 0 },
                  y: { min: 0, max: 0 },
                }),
                (this.targetWithTransforms = {
                  x: { min: 0, max: 0 },
                  y: { min: 0, max: 0 },
                })),
              this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.relativeParent &&
              this.relativeParent.target
                ? (this.forceRelativeParentToResolveTarget(),
                  (a = this.target),
                  (s = this.relativeTarget),
                  (l = this.relativeParent.target),
                  Ls(a.x, s.x, l.x),
                  Ls(a.y, s.y, l.y))
                : this.targetDelta
                  ? (Boolean(this.resumingFrom)
                      ? (this.target = this.applyTransform(
                          this.layout.layoutBox
                        ))
                      : jl(this.target, this.layout.layoutBox),
                    $s(this.target, this.targetDelta))
                  : jl(this.target, this.layout.layoutBox),
              this.attemptToResolveRelativeTarget)
            ) {
              this.attemptToResolveRelativeTarget = !1;
              const e = this.getClosestProjectingParent();
              e &&
              Boolean(e.resumingFrom) === Boolean(this.resumingFrom) &&
              !e.options.layoutScroll &&
              e.target &&
              1 !== this.animationProgress
                ? ((this.relativeParent = e),
                  this.forceRelativeParentToResolveTarget(),
                  (this.relativeTarget = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 },
                  }),
                  (this.relativeTargetOrigin = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 },
                  }),
                  Ns(this.relativeTargetOrigin, this.target, e.target),
                  jl(this.relativeTarget, this.relativeTargetOrigin))
                : (this.relativeParent = this.relativeTarget = void 0);
            }
            $l && ql.resolvedTargetDeltas++;
          }
        }
      }
      getClosestProjectingParent() {
        if (
          this.parent &&
          !Js(this.parent.latestValues) &&
          !Xs(this.parent.latestValues)
        )
          return this.parent.isProjecting()
            ? this.parent
            : this.parent.getClosestProjectingParent();
      }
      isProjecting() {
        return Boolean(
          (this.relativeTarget ||
            this.targetDelta ||
            this.options.layoutRoot) &&
            this.layout
        );
      }
      calcProjection() {
        var e;
        const t = this.getLead(),
          n = Boolean(this.resumingFrom) || this !== t;
        let r = !0;
        if (
          ((this.isProjectionDirty ||
            (null === (e = this.parent) || void 0 === e
              ? void 0
              : e.isProjectionDirty)) &&
            (r = !1),
          n &&
            (this.isSharedProjectionDirty || this.isTransformDirty) &&
            (r = !1),
          this.resolvedRelativeTargetAt === Wr.timestamp && (r = !1),
          r)
        )
          return;
        const { layout: i, layoutId: o } = this.options;
        if (
          ((this.isTreeAnimating = Boolean(
            (this.parent && this.parent.isTreeAnimating) ||
              this.currentAnimation ||
              this.pendingAnimation
          )),
          this.isTreeAnimating ||
            (this.targetDelta = this.relativeTarget = void 0),
          !this.layout || (!i && !o))
        )
          return;
        jl(this.layoutCorrected, this.layout.layoutBox);
        const a = this.treeScale.x,
          s = this.treeScale.y;
        !(function (e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          const i = n.length;
          if (!i) return;
          let o, a;
          t.x = t.y = 1;
          for (let s = 0; s < i; s++) {
            (o = n[s]), (a = o.projectionDelta);
            const { visualElement: i } = o.options;
            (i && i.props.style && 'contents' === i.props.style.display) ||
              (r &&
                o.options.layoutScroll &&
                o.scroll &&
                o !== o.root &&
                il(e, { x: -o.scroll.offset.x, y: -o.scroll.offset.y }),
              a && ((t.x *= a.x.scale), (t.y *= a.y.scale), $s(e, a)),
              r && Ys(o.latestValues) && il(e, o.latestValues));
          }
          t.x < tl && t.x > el && (t.x = 1), t.y < tl && t.y > el && (t.y = 1);
        })(this.layoutCorrected, this.treeScale, this.path, n),
          !t.layout ||
            t.target ||
            (1 === this.treeScale.x && 1 === this.treeScale.y) ||
            ((t.target = t.layout.layoutBox),
            (t.targetWithTransforms = {
              x: { min: 0, max: 0 },
              y: { min: 0, max: 0 },
            }));
        const { target: l } = t;
        l
          ? (this.projectionDelta && this.prevProjectionDelta
              ? (Ll(this.prevProjectionDelta.x, this.projectionDelta.x),
                Ll(this.prevProjectionDelta.y, this.projectionDelta.y))
              : this.createProjectionDeltas(),
            js(
              this.projectionDelta,
              this.layoutCorrected,
              l,
              this.latestValues
            ),
            (this.treeScale.x === a &&
              this.treeScale.y === s &&
              Jl(this.projectionDelta.x, this.prevProjectionDelta.x) &&
              Jl(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
              ((this.hasProjected = !0),
              this.scheduleRender(),
              this.notifyListeners('projectionUpdate', l)),
            $l && ql.recalculatedProjection++)
          : this.prevProjectionDelta &&
            (this.createProjectionDeltas(), this.scheduleRender());
      }
      hide() {
        this.isVisible = !1;
      }
      show() {
        this.isVisible = !0;
      }
      scheduleRender() {
        let e =
          !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        var t;
        if (
          (null === (t = this.options.visualElement) ||
            void 0 === t ||
            t.scheduleRender(),
          e)
        ) {
          const e = this.getStack();
          e && e.scheduleRender();
        }
        this.resumingFrom &&
          !this.resumingFrom.instance &&
          (this.resumingFrom = void 0);
      }
      createProjectionDeltas() {
        (this.prevProjectionDelta = {
          x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        }),
          (this.projectionDelta = {
            x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
            y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          }),
          (this.projectionDeltaWithTransform = {
            x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
            y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          });
      }
      setAnimationOrigin(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        const n = this.snapshot,
          r = n ? n.latestValues : {},
          i = u({}, this.latestValues),
          o = {
            x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
            y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          };
        (this.relativeParent && this.relativeParent.options.layoutRoot) ||
          (this.relativeTarget = this.relativeTargetOrigin = void 0),
          (this.attemptToResolveRelativeTarget = !t);
        const a = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } },
          s =
            (n ? n.source : void 0) !==
            (this.layout ? this.layout.source : void 0),
          l = this.getStack(),
          c = !l || l.members.length <= 1,
          d = Boolean(
            s && !c && !0 === this.options.crossfade && !this.path.some(xu)
          );
        let h;
        (this.animationProgress = 0),
          (this.mixTargetDelta = (t) => {
            const n = t / 1e3;
            var l, u, f, p, m, g;
            Au(o.x, e.x, n),
              Au(o.y, e.y, n),
              this.setTargetDelta(o),
              this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.layout &&
                this.relativeParent &&
                this.relativeParent.layout &&
                (Ns(
                  a,
                  this.layout.layoutBox,
                  this.relativeParent.layout.layoutBox
                ),
                (f = this.relativeTarget),
                (p = this.relativeTargetOrigin),
                (m = a),
                (g = n),
                bu(f.x, p.x, m.x, g),
                bu(f.y, p.y, m.y, g),
                h &&
                  ((l = this.relativeTarget),
                  (u = h),
                  Zl(l.x, u.x) && Zl(l.y, u.y)) &&
                  (this.isProjectionDirty = !1),
                h || (h = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
                jl(h, this.relativeTarget)),
              s &&
                ((this.animationValues = i),
                (function (e, t, n, r, i, o) {
                  i
                    ? ((e.opacity = qo(
                        0,
                        void 0 !== n.opacity ? n.opacity : 1,
                        Fl(r)
                      )),
                      (e.opacityExit = qo(
                        void 0 !== t.opacity ? t.opacity : 1,
                        0,
                        Dl(r)
                      )))
                    : o &&
                      (e.opacity = qo(
                        void 0 !== t.opacity ? t.opacity : 1,
                        void 0 !== n.opacity ? n.opacity : 1,
                        r
                      ));
                  for (let a = 0; a < El; a++) {
                    const i = 'border'.concat(kl[a], 'Radius');
                    let o = Tl(t, i),
                      s = Tl(n, i);
                    (void 0 === o && void 0 === s) ||
                      (o || (o = 0),
                      s || (s = 0),
                      0 === o || 0 === s || Cl(o) === Cl(s)
                        ? ((e[i] = Math.max(qo(Pl(o), Pl(s), r), 0)),
                          (bi.test(s) || bi.test(o)) && (e[i] += '%'))
                        : (e[i] = s));
                  }
                  (t.rotate || n.rotate) &&
                    (e.rotate = qo(t.rotate || 0, n.rotate || 0, r));
                })(i, r, this.latestValues, n, d, c)),
              this.root.scheduleUpdateProjection(),
              this.scheduleRender(),
              (this.animationProgress = n);
          }),
          this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
      }
      startAnimation(e) {
        this.notifyListeners('animationStart'),
          this.currentAnimation && this.currentAnimation.stop(),
          this.resumingFrom &&
            this.resumingFrom.currentAnimation &&
            this.resumingFrom.currentAnimation.stop(),
          this.pendingAnimation &&
            (_r(this.pendingAnimation), (this.pendingAnimation = void 0)),
          (this.pendingAnimation = Zr.update(() => {
            (pl.hasAnimatedSinceResize = !0),
              (this.currentAnimation = (function (e, t, n) {
                const r = Ga(e) ? e : Wa(e);
                return r.start(Va('', r, t, n)), r.animation;
              })(
                0,
                1e3,
                u(
                  u({}, e),
                  {},
                  {
                    onUpdate: (t) => {
                      this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t);
                    },
                    onComplete: () => {
                      e.onComplete && e.onComplete(), this.completeAnimation();
                    },
                  }
                )
              )),
              this.resumingFrom &&
                (this.resumingFrom.currentAnimation = this.currentAnimation),
              (this.pendingAnimation = void 0);
          }));
      }
      completeAnimation() {
        this.resumingFrom &&
          ((this.resumingFrom.currentAnimation = void 0),
          (this.resumingFrom.preserveOpacity = void 0));
        const e = this.getStack();
        e && e.exitAnimationComplete(),
          (this.resumingFrom =
            this.currentAnimation =
            this.animationValues =
              void 0),
          this.notifyListeners('animationComplete');
      }
      finishAnimation() {
        this.currentAnimation &&
          (this.mixTargetDelta && this.mixTargetDelta(1e3),
          this.currentAnimation.stop()),
          this.completeAnimation();
      }
      applyTransformsToTarget() {
        const e = this.getLead();
        let {
          targetWithTransforms: t,
          target: n,
          layout: r,
          latestValues: i,
        } = e;
        if (t && n && r) {
          if (
            this !== e &&
            this.layout &&
            r &&
            Pu(this.options.animationType, this.layout.layoutBox, r.layoutBox)
          ) {
            n = this.target || { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            const t = Ms(this.layout.layoutBox.x);
            (n.x.min = e.target.x.min), (n.x.max = n.x.min + t);
            const r = Ms(this.layout.layoutBox.y);
            (n.y.min = e.target.y.min), (n.y.max = n.y.min + r);
          }
          jl(t, n),
            il(t, i),
            js(this.projectionDeltaWithTransform, this.layoutCorrected, t, i);
        }
      }
      registerSharedNode(e, t) {
        this.sharedNodes.has(e) || this.sharedNodes.set(e, new Yl());
        this.sharedNodes.get(e).add(t);
        const n = t.options.initialPromotionConfig;
        t.promote({
          transition: n ? n.transition : void 0,
          preserveFollowOpacity:
            n && n.shouldPreserveFollowOpacity
              ? n.shouldPreserveFollowOpacity(t)
              : void 0,
        });
      }
      isLead() {
        const e = this.getStack();
        return !e || e.lead === this;
      }
      getLead() {
        var e;
        const { layoutId: t } = this.options;
        return (
          (t &&
            (null === (e = this.getStack()) || void 0 === e
              ? void 0
              : e.lead)) ||
          this
        );
      }
      getPrevLead() {
        var e;
        const { layoutId: t } = this.options;
        return t
          ? null === (e = this.getStack()) || void 0 === e
            ? void 0
            : e.prevLead
          : void 0;
      }
      getStack() {
        const { layoutId: e } = this.options;
        if (e) return this.root.sharedNodes.get(e);
      }
      promote() {
        let {
          needsReset: e,
          transition: t,
          preserveFollowOpacity: n,
        } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        const r = this.getStack();
        r && r.promote(this, n),
          e && ((this.projectionDelta = void 0), (this.needsReset = !0)),
          t && this.setOptions({ transition: t });
      }
      relegate() {
        const e = this.getStack();
        return !!e && e.relegate(this);
      }
      resetSkewAndRotation() {
        const { visualElement: e } = this.options;
        if (!e) return;
        let t = !1;
        const { latestValues: n } = e;
        if (
          ((n.z ||
            n.rotate ||
            n.rotateX ||
            n.rotateY ||
            n.rotateZ ||
            n.skewX ||
            n.skewY) &&
            (t = !0),
          !t)
        )
          return;
        const r = {};
        n.z && ru('z', e, r, this.animationValues);
        for (let i = 0; i < eu.length; i++)
          ru('rotate'.concat(eu[i]), e, r, this.animationValues),
            ru('skew'.concat(eu[i]), e, r, this.animationValues);
        e.render();
        for (const i in r)
          e.setStaticValue(i, r[i]),
            this.animationValues && (this.animationValues[i] = r[i]);
        e.scheduleRender();
      }
      getProjectionStyles(e) {
        var t, n;
        if (!this.instance || this.isSVG) return;
        if (!this.isVisible) return tu;
        const r = { visibility: '' },
          i = this.getTransformTemplate();
        if (this.needsReset)
          return (
            (this.needsReset = !1),
            (r.opacity = ''),
            (r.pointerEvents =
              Gl(null === e || void 0 === e ? void 0 : e.pointerEvents) || ''),
            (r.transform = i ? i(this.latestValues, '') : 'none'),
            r
          );
        const o = this.getLead();
        if (!this.projectionDelta || !this.layout || !o.target) {
          const t = {};
          return (
            this.options.layoutId &&
              ((t.opacity =
                void 0 !== this.latestValues.opacity
                  ? this.latestValues.opacity
                  : 1),
              (t.pointerEvents =
                Gl(null === e || void 0 === e ? void 0 : e.pointerEvents) ||
                '')),
            this.hasProjected &&
              !Ys(this.latestValues) &&
              ((t.transform = i ? i({}, '') : 'none'),
              (this.hasProjected = !1)),
            t
          );
        }
        const a = o.animationValues || o.latestValues;
        this.applyTransformsToTarget(),
          (r.transform = (function (e, t, n) {
            let r = '';
            const i = e.x.translate / t.x,
              o = e.y.translate / t.y,
              a = (null === n || void 0 === n ? void 0 : n.z) || 0;
            if (
              ((i || o || a) &&
                (r = 'translate3d('
                  .concat(i, 'px, ')
                  .concat(o, 'px, ')
                  .concat(a, 'px) ')),
              (1 === t.x && 1 === t.y) ||
                (r += 'scale('.concat(1 / t.x, ', ').concat(1 / t.y, ') ')),
              n)
            ) {
              const {
                transformPerspective: e,
                rotate: t,
                rotateX: i,
                rotateY: o,
                skewX: a,
                skewY: s,
              } = n;
              e && (r = 'perspective('.concat(e, 'px) ').concat(r)),
                t && (r += 'rotate('.concat(t, 'deg) ')),
                i && (r += 'rotateX('.concat(i, 'deg) ')),
                o && (r += 'rotateY('.concat(o, 'deg) ')),
                a && (r += 'skewX('.concat(a, 'deg) ')),
                s && (r += 'skewY('.concat(s, 'deg) '));
            }
            const s = e.x.scale * t.x,
              l = e.y.scale * t.y;
            return (
              (1 === s && 1 === l) ||
                (r += 'scale('.concat(s, ', ').concat(l, ')')),
              r || 'none'
            );
          })(this.projectionDeltaWithTransform, this.treeScale, a)),
          i && (r.transform = i(a, r.transform));
        const { x: s, y: l } = this.projectionDelta;
        (r.transformOrigin = ''
          .concat(100 * s.origin, '% ')
          .concat(100 * l.origin, '% 0')),
          o.animationValues
            ? (r.opacity =
                o === this
                  ? null !==
                      (n =
                        null !== (t = a.opacity) && void 0 !== t
                          ? t
                          : this.latestValues.opacity) && void 0 !== n
                    ? n
                    : 1
                  : this.preserveOpacity
                    ? this.latestValues.opacity
                    : a.opacityExit)
            : (r.opacity =
                o === this
                  ? void 0 !== a.opacity
                    ? a.opacity
                    : ''
                  : void 0 !== a.opacityExit
                    ? a.opacityExit
                    : 0);
        for (const u in yl) {
          if (void 0 === a[u]) continue;
          const { correct: e, applyTo: t } = yl[u],
            n = 'none' === r.transform ? a[u] : e(a[u], o);
          if (t) {
            const e = t.length;
            for (let i = 0; i < e; i++) r[t[i]] = n;
          } else r[u] = n;
        }
        return (
          this.options.layoutId &&
            (r.pointerEvents =
              o === this
                ? Gl(null === e || void 0 === e ? void 0 : e.pointerEvents) ||
                  ''
                : 'none'),
          r
        );
      }
      clearSnapshot() {
        this.resumeFrom = this.snapshot = void 0;
      }
      resetTree() {
        this.root.nodes.forEach((e) => {
          var t;
          return null === (t = e.currentAnimation) || void 0 === t
            ? void 0
            : t.stop();
        }),
          this.root.nodes.forEach(du),
          this.root.sharedNodes.clear();
      }
    };
  }
  function au(e) {
    e.updateLayout();
  }
  function su(e) {
    var t;
    const n =
      (null === (t = e.resumeFrom) || void 0 === t ? void 0 : t.snapshot) ||
      e.snapshot;
    if (e.isLead() && e.layout && n && e.hasListeners('didUpdate')) {
      const { layoutBox: t, measuredBox: r } = e.layout,
        { animationType: i } = e.options,
        o = n.source !== e.layout.source;
      'size' === i
        ? _s((e) => {
            const r = o ? n.measuredBox[e] : n.layoutBox[e],
              i = Ms(r);
            (r.min = t[e].min), (r.max = r.min + i);
          })
        : Pu(i, n.layoutBox, t) &&
          _s((r) => {
            const i = o ? n.measuredBox[r] : n.layoutBox[r],
              a = Ms(t[r]);
            (i.max = i.min + a),
              e.relativeTarget &&
                !e.currentAnimation &&
                ((e.isProjectionDirty = !0),
                (e.relativeTarget[r].max = e.relativeTarget[r].min + a));
          });
      const a = {
        x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
      };
      js(a, t, n.layoutBox);
      const s = {
        x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
      };
      o ? js(s, e.applyTransform(r, !0), n.measuredBox) : js(s, t, n.layoutBox);
      const l = !Ul(a);
      let u = !1;
      if (!e.resumeFrom) {
        const r = e.getClosestProjectingParent();
        if (r && !r.resumeFrom) {
          const { snapshot: i, layout: o } = r;
          if (i && o) {
            const a = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            Ns(a, n.layoutBox, i.layoutBox);
            const s = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            Ns(s, t, o.layoutBox),
              Wl(a, s) || (u = !0),
              r.options.layoutRoot &&
                ((e.relativeTarget = s),
                (e.relativeTargetOrigin = a),
                (e.relativeParent = r));
          }
        }
      }
      e.notifyListeners('didUpdate', {
        layout: t,
        snapshot: n,
        delta: s,
        layoutDelta: a,
        hasLayoutChanged: l,
        hasRelativeTargetChanged: u,
      });
    } else if (e.isLead()) {
      const { onExitComplete: t } = e.options;
      t && t();
    }
    e.options.transition = void 0;
  }
  function lu(e) {
    $l && ql.totalNodes++,
      e.parent &&
        (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
        e.isSharedProjectionDirty ||
          (e.isSharedProjectionDirty = Boolean(
            e.isProjectionDirty ||
              e.parent.isProjectionDirty ||
              e.parent.isSharedProjectionDirty
          )),
        e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
  }
  function uu(e) {
    e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
  }
  function cu(e) {
    e.clearSnapshot();
  }
  function du(e) {
    e.clearMeasurements();
  }
  function hu(e) {
    e.isLayoutDirty = !1;
  }
  function fu(e) {
    const { visualElement: t } = e.options;
    t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'),
      e.resetTransform();
  }
  function pu(e) {
    e.finishAnimation(),
      (e.targetDelta = e.relativeTarget = e.target = void 0),
      (e.isProjectionDirty = !0);
  }
  function mu(e) {
    e.resolveTargetDelta();
  }
  function gu(e) {
    e.calcProjection();
  }
  function vu(e) {
    e.resetSkewAndRotation();
  }
  function yu(e) {
    e.removeLeadSnapshot();
  }
  function Au(e, t, n) {
    (e.translate = qo(t.translate, 0, n)),
      (e.scale = qo(t.scale, 1, n)),
      (e.origin = t.origin),
      (e.originPoint = t.originPoint);
  }
  function bu(e, t, n, r) {
    (e.min = qo(t.min, n.min, r)), (e.max = qo(t.max, n.max, r));
  }
  function xu(e) {
    return e.animationValues && void 0 !== e.animationValues.opacityExit;
  }
  const wu = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
    Su = (e) =>
      'undefined' !== typeof navigator &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().includes(e),
    ku = Su('applewebkit/') && !Su('chrome/') ? Math.round : Or;
  function Eu(e) {
    (e.min = ku(e.min)), (e.max = ku(e.max));
  }
  function Pu(e, t, n) {
    return (
      'position' === e ||
      ('preserve-aspect' === e &&
        ((r = Hl(t)), (i = Hl(n)), (o = 0.2), !(Math.abs(r - i) <= o)))
    );
    var r, i, o;
  }
  function Cu(e) {
    var t;
    return (
      e !== e.root &&
      (null === (t = e.scroll) || void 0 === t ? void 0 : t.wasRoot)
    );
  }
  const Tu = ou({
      attachResizeListener: (e, t) => bs(e, 'resize', t),
      measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop,
      }),
      checkIsScrollRoot: () => !0,
    }),
    Fu = { current: void 0 },
    Du = ou({
      measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
      defaultParent: () => {
        if (!Fu.current) {
          const e = new Tu({});
          e.mount(window), e.setOptions({ layoutScroll: !0 }), (Fu.current = e);
        }
        return Fu.current;
      },
      resetTransform: (e, t) => {
        e.style.transform = void 0 !== t ? t : 'none';
      },
      checkIsScrollRoot: (e) =>
        Boolean('fixed' === window.getComputedStyle(e).position),
    }),
    Mu = {
      pan: {
        Feature: class extends fs {
          constructor() {
            super(...arguments), (this.removePointerDownListener = Or);
          }
          onPointerDown(e) {
            this.session = new Ss(e, this.createPanHandlers(), {
              transformPagePoint: this.node.getTransformPagePoint(),
              contextWindow: al(this.node),
            });
          }
          createPanHandlers() {
            const {
              onPanSessionStart: e,
              onPanStart: t,
              onPan: n,
              onPanEnd: r,
            } = this.node.getProps();
            return {
              onSessionStart: cl(e),
              onStart: cl(t),
              onMove: n,
              onEnd: (e, t) => {
                delete this.session, r && Zr.postRender(() => r(e, t));
              },
            };
          }
          mount() {
            this.removePointerDownListener = xs(
              this.node.current,
              'pointerdown',
              (e) => this.onPointerDown(e)
            );
          }
          update() {
            this.session &&
              this.session.updateHandlers(this.createPanHandlers());
          }
          unmount() {
            this.removePointerDownListener(),
              this.session && this.session.end();
          }
        },
      },
      drag: {
        Feature: class extends fs {
          constructor(e) {
            super(e),
              (this.removeGroupControls = Or),
              (this.removeListeners = Or),
              (this.controls = new ll(e));
          }
          mount() {
            const { dragControls: e } = this.node.getProps();
            e && (this.removeGroupControls = e.subscribe(this.controls)),
              (this.removeListeners = this.controls.addListeners() || Or);
          }
          unmount() {
            this.removeGroupControls(), this.removeListeners();
          }
        },
        ProjectionNode: Du,
        MeasureLayout: wl,
      },
    };
  function Ru(e, t, n) {
    var r;
    if (e instanceof Element) return [e];
    if ('string' === typeof e) {
      let i = document;
      t && (i = t.current);
      const o =
        null !== (r = null === n || void 0 === n ? void 0 : n[e]) &&
        void 0 !== r
          ? r
          : i.querySelectorAll(e);
      return o ? Array.from(o) : [];
    }
    return Array.from(e);
  }
  function ju(e, t) {
    const n = Ru(e),
      r = new AbortController();
    return [
      n,
      u(u({ passive: !0 }, t), {}, { signal: r.signal }),
      () => r.abort(),
    ];
  }
  function Lu(e) {
    return (t) => {
      'touch' === t.pointerType || vs() || e(t);
    };
  }
  function zu(e, t, n) {
    const { props: r } = e;
    e.animationState &&
      r.whileHover &&
      e.animationState.setActive('whileHover', 'Start' === n);
    const i = r['onHover' + n];
    i && Zr.postRender(() => i(t, As(t)));
  }
  const Nu = new WeakSet();
  function Bu(e) {
    return (t) => {
      'Enter' === t.key && e(t);
    };
  }
  function Vu(e, t) {
    e.dispatchEvent(
      new PointerEvent('pointer' + t, { isPrimary: !0, bubbles: !0 })
    );
  }
  const Ou = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']);
  const Iu = (e, t) => !!t && (e === t || Iu(e, t.parentElement));
  function Uu(e) {
    return ys(e) && !vs();
  }
  function Zu(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const [r, i, o] = ju(e, n),
      a = (e) => {
        const r = e.currentTarget;
        if (!Uu(e) || Nu.has(r)) return;
        Nu.add(r);
        const o = t(e),
          a = (e, t) => {
            window.removeEventListener('pointerup', s),
              window.removeEventListener('pointercancel', l),
              Uu(e) && Nu.has(r) && (Nu.delete(r), o && o(e, { success: t }));
          },
          s = (e) => {
            a(e, n.useGlobalTarget || Iu(r, e.target));
          },
          l = (e) => {
            a(e, !1);
          };
        window.addEventListener('pointerup', s, i),
          window.addEventListener('pointercancel', l, i);
      };
    return (
      r.forEach((e) => {
        (function (e) {
          return Ou.has(e.tagName) || -1 !== e.tabIndex;
        })(e) || (e.tabIndex = 0);
        (n.useGlobalTarget ? window : e).addEventListener('pointerdown', a, i),
          e.addEventListener(
            'focus',
            (e) =>
              ((e, t) => {
                const n = e.currentTarget;
                if (!n) return;
                const r = Bu(() => {
                  if (Nu.has(n)) return;
                  Vu(n, 'down');
                  const e = Bu(() => {
                    Vu(n, 'up');
                  });
                  n.addEventListener('keyup', e, t),
                    n.addEventListener('blur', () => Vu(n, 'cancel'), t);
                });
                n.addEventListener('keydown', r, t),
                  n.addEventListener(
                    'blur',
                    () => n.removeEventListener('keydown', r),
                    t
                  );
              })(e, i),
            i
          );
      }),
      o
    );
  }
  function _u(e, t, n) {
    const { props: r } = e;
    e.animationState &&
      r.whileTap &&
      e.animationState.setActive('whileTap', 'Start' === n);
    const i = r['onTap' + ('End' === n ? '' : n)];
    i && Zr.postRender(() => i(t, As(t)));
  }
  const Wu = ['root'],
    Hu = new WeakMap(),
    Ju = new WeakMap(),
    Yu = (e) => {
      const t = Hu.get(e.target);
      t && t(e);
    },
    Xu = (e) => {
      e.forEach(Yu);
    };
  function Qu(e, t, n) {
    const r = (function (e) {
      let { root: t } = e,
        n = c(e, Wu);
      const r = t || document;
      Ju.has(r) || Ju.set(r, {});
      const i = Ju.get(r),
        o = JSON.stringify(n);
      return (
        i[o] || (i[o] = new IntersectionObserver(Xu, u({ root: t }, n))), i[o]
      );
    })(t);
    return (
      Hu.set(e, n),
      r.observe(e),
      () => {
        Hu.delete(e), r.unobserve(e);
      }
    );
  }
  const Gu = { some: 0, all: 1 };
  const Ku = {
      inView: {
        Feature: class extends fs {
          constructor() {
            super(...arguments),
              (this.hasEnteredView = !1),
              (this.isInView = !1);
          }
          startObserver() {
            this.unmount();
            const { viewport: e = {} } = this.node.getProps(),
              { root: t, margin: n, amount: r = 'some', once: i } = e,
              o = {
                root: t ? t.current : void 0,
                rootMargin: n,
                threshold: 'number' === typeof r ? r : Gu[r],
              };
            return Qu(this.node.current, o, (e) => {
              const { isIntersecting: t } = e;
              if (this.isInView === t) return;
              if (((this.isInView = t), i && !t && this.hasEnteredView)) return;
              t && (this.hasEnteredView = !0),
                this.node.animationState &&
                  this.node.animationState.setActive('whileInView', t);
              const { onViewportEnter: n, onViewportLeave: r } =
                  this.node.getProps(),
                o = t ? n : r;
              o && o(e);
            });
          }
          mount() {
            this.startObserver();
          }
          update() {
            if ('undefined' === typeof IntersectionObserver) return;
            const { props: e, prevProps: t } = this.node,
              n = ['amount', 'margin', 'root'].some(
                (function (e) {
                  let { viewport: t = {} } = e,
                    { viewport: n = {} } =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                  return (e) => t[e] !== n[e];
                })(e, t)
              );
            n && this.startObserver();
          }
          unmount() {}
        },
      },
      tap: {
        Feature: class extends fs {
          mount() {
            const { current: e } = this.node;
            e &&
              (this.unmount = Zu(
                e,
                (e) => (
                  _u(this.node, e, 'Start'),
                  (e, t) => {
                    let { success: n } = t;
                    return _u(this.node, e, n ? 'End' : 'Cancel');
                  }
                ),
                { useGlobalTarget: this.node.props.globalTapTarget }
              ));
          }
          unmount() {}
        },
      },
      focus: {
        Feature: class extends fs {
          constructor() {
            super(...arguments), (this.isActive = !1);
          }
          onFocus() {
            let e = !1;
            try {
              e = this.node.current.matches(':focus-visible');
            } catch (Zb) {
              e = !0;
            }
            e &&
              this.node.animationState &&
              (this.node.animationState.setActive('whileFocus', !0),
              (this.isActive = !0));
          }
          onBlur() {
            this.isActive &&
              this.node.animationState &&
              (this.node.animationState.setActive('whileFocus', !1),
              (this.isActive = !1));
          }
          mount() {
            this.unmount = Ko(
              bs(this.node.current, 'focus', () => this.onFocus()),
              bs(this.node.current, 'blur', () => this.onBlur())
            );
          }
          unmount() {}
        },
      },
      hover: {
        Feature: class extends fs {
          mount() {
            const { current: e } = this.node;
            e &&
              (this.unmount = (function (e, t) {
                let n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {};
                const [r, i, o] = ju(e, n),
                  a = Lu((e) => {
                    const { target: n } = e,
                      r = t(e);
                    if (!r || !n) return;
                    const o = Lu((e) => {
                      r(e), n.removeEventListener('pointerleave', o);
                    });
                    n.addEventListener('pointerleave', o, i);
                  });
                return (
                  r.forEach((e) => {
                    e.addEventListener('pointerenter', a, i);
                  }),
                  o
                );
              })(
                e,
                (e) => (
                  zu(this.node, e, 'Start'), (e) => zu(this.node, e, 'End')
                )
              ));
          }
          unmount() {}
        },
      },
    },
    qu = { layout: { ProjectionNode: Du, MeasureLayout: wl } },
    $u = (0, r.createContext)({
      transformPagePoint: (e) => e,
      isStatic: !1,
      reducedMotion: 'never',
    }),
    ec = (0, r.createContext)({}),
    tc = 'undefined' !== typeof window,
    nc = tc ? r.useLayoutEffect : r.useEffect,
    rc = (0, r.createContext)({ strict: !1 });
  function ic(e, t, n, i, o) {
    var a, s;
    const { visualElement: l } = (0, r.useContext)(ec),
      u = (0, r.useContext)(rc),
      c = (0, r.useContext)(dl),
      d = (0, r.useContext)($u).reducedMotion,
      h = (0, r.useRef)(null);
    (i = i || u.renderer),
      !h.current &&
        i &&
        (h.current = i(e, {
          visualState: t,
          parent: l,
          props: n,
          presenceContext: c,
          blockInitialAnimation: !!c && !1 === c.initial,
          reducedMotionConfig: d,
        }));
    const f = h.current,
      p = (0, r.useContext)(fl);
    !f ||
      f.projection ||
      !o ||
      ('html' !== f.type && 'svg' !== f.type) ||
      (function (e, t, n, r) {
        const {
          layoutId: i,
          layout: o,
          drag: a,
          dragConstraints: s,
          layoutScroll: l,
          layoutRoot: u,
        } = t;
        (e.projection = new n(
          e.latestValues,
          t['data-framer-portal-id'] ? void 0 : oc(e.parent)
        )),
          e.projection.setOptions({
            layoutId: i,
            layout: o,
            alwaysMeasureLayout: Boolean(a) || (s && Ds(s)),
            visualElement: e,
            animationType: 'string' === typeof o ? o : 'both',
            initialPromotionConfig: r,
            layoutScroll: l,
            layoutRoot: u,
          });
      })(h.current, n, o, p);
    const m = (0, r.useRef)(!1);
    (0, r.useInsertionEffect)(() => {
      f && m.current && f.update(n, c);
    });
    const g = n[Xa],
      v = (0, r.useRef)(
        Boolean(g) &&
          !(null === (a = window.MotionHandoffIsComplete) || void 0 === a
            ? void 0
            : a.call(window, g)) &&
          (null === (s = window.MotionHasOptimisedAnimation) || void 0 === s
            ? void 0
            : s.call(window, g))
      );
    return (
      nc(() => {
        f &&
          ((m.current = !0),
          (window.MotionIsMounted = !0),
          f.updateFeatures(),
          Al.render(f.render),
          v.current && f.animationState && f.animationState.animateChanges());
      }),
      (0, r.useEffect)(() => {
        f &&
          (!v.current && f.animationState && f.animationState.animateChanges(),
          v.current &&
            (queueMicrotask(() => {
              var e;
              null === (e = window.MotionHandoffMarkAsComplete) ||
                void 0 === e ||
                e.call(window, g);
            }),
            (v.current = !1)));
      }),
      f
    );
  }
  function oc(e) {
    if (e)
      return !1 !== e.options.allowProjection ? e.projection : oc(e.parent);
  }
  function ac(e, t, n) {
    return (0, r.useCallback)(
      (r) => {
        r && e.mount && e.mount(r),
          t && (r ? t.mount(r) : t.unmount()),
          n && ('function' === typeof n ? n(r) : Ds(n) && (n.current = r));
      },
      [t]
    );
  }
  function sc(e) {
    return gr(e.animate) || kr.some((t) => Ar(e[t]));
  }
  function lc(e) {
    return Boolean(sc(e) || e.variants);
  }
  function uc(e) {
    const { initial: t, animate: n } = (function (e, t) {
      if (sc(e)) {
        const { initial: t, animate: n } = e;
        return {
          initial: !1 === t || Ar(t) ? t : void 0,
          animate: Ar(n) ? n : void 0,
        };
      }
      return !1 !== e.inherit ? t : {};
    })(e, (0, r.useContext)(ec));
    return (0, r.useMemo)(() => ({ initial: t, animate: n }), [cc(t), cc(n)]);
  }
  function cc(e) {
    return Array.isArray(e) ? e.join(' ') : e;
  }
  const dc = {
      animation: [
        'animate',
        'variants',
        'whileHover',
        'whileTap',
        'exit',
        'whileInView',
        'whileFocus',
        'whileDrag',
      ],
      exit: ['exit'],
      drag: ['drag', 'dragControls'],
      focus: ['whileFocus'],
      hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
      tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
      pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
      inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
      layout: ['layout', 'layoutId'],
    },
    hc = {};
  for (const Wb in dc)
    hc[Wb] = { isEnabled: (e) => dc[Wb].some((t) => !!e[t]) };
  const fc = Symbol.for('motionComponentSymbol');
  function pc(e) {
    let {
      preloadedFeatures: t,
      createVisualElement: n,
      useRender: i,
      useVisualState: o,
      Component: a,
    } = e;
    t &&
      (function (e) {
        for (const t in e) hc[t] = u(u({}, hc[t]), e[t]);
      })(t);
    const s = (0, r.forwardRef)(function (e, t) {
      let s;
      const l = u(u(u({}, (0, r.useContext)($u)), e), {}, { layoutId: mc(e) }),
        { isStatic: c } = l,
        d = uc(e),
        h = o(e, c);
      if (!c && tc) {
        !(function () {
          (0, r.useContext)(rc).strict;
          0;
        })();
        const e = (function (e) {
          const { drag: t, layout: n } = hc;
          if (!t && !n) return {};
          const r = u(u({}, t), n);
          return {
            MeasureLayout:
              (null === t || void 0 === t ? void 0 : t.isEnabled(e)) ||
              (null === n || void 0 === n ? void 0 : n.isEnabled(e))
                ? r.MeasureLayout
                : void 0,
            ProjectionNode: r.ProjectionNode,
          };
        })(l);
        (s = e.MeasureLayout),
          (d.visualElement = ic(a, h, l, n, e.ProjectionNode));
      }
      return (0, Fn.jsxs)(ec.Provider, {
        value: d,
        children: [
          s && d.visualElement
            ? (0, Fn.jsx)(s, u({ visualElement: d.visualElement }, l))
            : null,
          i(a, e, ac(h, d.visualElement, t), h, c, d.visualElement),
        ],
      });
    });
    return (s[fc] = a), s;
  }
  function mc(e) {
    let { layoutId: t } = e;
    const n = (0, r.useContext)(hl).id;
    return n && void 0 !== t ? n + '-' + t : t;
  }
  const gc = [
    'animate',
    'circle',
    'defs',
    'desc',
    'ellipse',
    'g',
    'image',
    'line',
    'filter',
    'marker',
    'mask',
    'metadata',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'rect',
    'stop',
    'switch',
    'symbol',
    'svg',
    'text',
    'tspan',
    'use',
    'view',
  ];
  function vc(e) {
    return (
      'string' === typeof e &&
      !e.includes('-') &&
      !!(gc.indexOf(e) > -1 || /[A-Z]/.test(e))
    );
  }
  function yc(e, t, n, r) {
    let { style: i, vars: o } = t;
    Object.assign(e.style, i, r && r.getProjectionStyles(n));
    for (const a in o) e.style.setProperty(a, o[a]);
  }
  const Ac = new Set([
    'baseFrequency',
    'diffuseConstant',
    'kernelMatrix',
    'kernelUnitLength',
    'keySplines',
    'keyTimes',
    'limitingConeAngle',
    'markerHeight',
    'markerWidth',
    'numOctaves',
    'targetX',
    'targetY',
    'surfaceScale',
    'specularConstant',
    'specularExponent',
    'stdDeviation',
    'tableValues',
    'viewBox',
    'gradientTransform',
    'pathLength',
    'startOffset',
    'textLength',
    'lengthAdjust',
  ]);
  function bc(e, t, n, r) {
    yc(e, t, void 0, r);
    for (const i in t.attrs) e.setAttribute(Ac.has(i) ? i : Ya(i), t.attrs[i]);
  }
  function xc(e, t) {
    let { layout: n, layoutId: r } = t;
    return (
      Pr.has(e) ||
      e.startsWith('origin') ||
      ((n || void 0 !== r) && (!!yl[e] || 'opacity' === e))
    );
  }
  function wc(e, t, n) {
    var r;
    const { style: i } = e,
      o = {};
    for (const a in i)
      (Ga(i[a]) ||
        (t.style && Ga(t.style[a])) ||
        xc(a, e) ||
        void 0 !==
          (null === (r = null === n || void 0 === n ? void 0 : n.getValue(a)) ||
          void 0 === r
            ? void 0
            : r.liveStyle)) &&
        (o[a] = i[a]);
    return o;
  }
  function Sc(e, t, n) {
    const r = wc(e, t, n);
    for (const i in e)
      if (Ga(e[i]) || Ga(t[i])) {
        r[
          -1 !== Er.indexOf(i)
            ? 'attr' + i.charAt(0).toUpperCase() + i.substring(1)
            : i
        ] = e[i];
      }
    return r;
  }
  function kc(e) {
    const t = (0, r.useRef)(null);
    return null === t.current && (t.current = e()), t.current;
  }
  const Ec = ['transitionEnd', 'transition'];
  const Pc = (e) => (t, n) => {
    const i = (0, r.useContext)(ec),
      o = (0, r.useContext)(dl),
      a = () =>
        (function (e, t, n, r) {
          let {
            scrapeMotionValuesFromProps: i,
            createRenderState: o,
            onMount: a,
          } = e;
          const s = { latestValues: Cc(t, n, r, i), renderState: o() };
          return a && (s.mount = (e) => a(t, e, s)), s;
        })(e, t, i, o);
    return n ? a() : kc(a);
  };
  function Cc(e, t, n, r) {
    const i = {},
      o = r(e, {});
    for (const c in o) i[c] = Gl(o[c]);
    let { initial: a, animate: s } = e;
    const l = sc(e),
      u = lc(e);
    t &&
      u &&
      !l &&
      !1 !== e.inherit &&
      (void 0 === a && (a = t.initial), void 0 === s && (s = t.animate));
    let d = !!n && !1 === n.initial;
    d = d || !1 === a;
    const h = d ? s : a;
    if (h && 'boolean' !== typeof h && !gr(h)) {
      const t = Array.isArray(h) ? h : [h];
      for (let n = 0; n < t.length; n++) {
        const r = xr(e, t[n]);
        if (r) {
          const { transitionEnd: e, transition: t } = r,
            n = c(r, Ec);
          for (const r in n) {
            let e = n[r];
            if (Array.isArray(e)) {
              e = e[d ? e.length - 1 : 0];
            }
            null !== e && (i[r] = e);
          }
          for (const r in e) i[r] = e[r];
        }
      }
    }
    return i;
  }
  const Tc = () => ({
      style: {},
      transform: {},
      transformOrigin: {},
      vars: {},
    }),
    Fc = () =>
      u(
        u({}, { style: {}, transform: {}, transformOrigin: {}, vars: {} }),
        {},
        { attrs: {} }
      ),
    Dc = (e, t) => (t && 'number' === typeof e ? t.transform(e) : e),
    Mc = {
      x: 'translateX',
      y: 'translateY',
      z: 'translateZ',
      transformPerspective: 'perspective',
    },
    Rc = Er.length;
  function jc(e, t, n) {
    const { style: r, vars: i, transformOrigin: o } = e;
    let a = !1,
      s = !1;
    for (const l in t) {
      const e = t[l];
      if (Pr.has(l)) a = !0;
      else if (li(l)) i[l] = e;
      else {
        const t = Dc(e, po[l]);
        l.startsWith('origin') ? ((s = !0), (o[l] = t)) : (r[l] = t);
      }
    }
    if (
      (t.transform ||
        (a || n
          ? (r.transform = (function (e, t, n) {
              let r = '',
                i = !0;
              for (let o = 0; o < Rc; o++) {
                const a = Er[o],
                  s = e[a];
                if (void 0 === s) continue;
                let l = !0;
                if (
                  ((l =
                    'number' === typeof s
                      ? s === (a.startsWith('scale') ? 1 : 0)
                      : 0 === parseFloat(s)),
                  !l || n)
                ) {
                  const e = Dc(s, po[a]);
                  l ||
                    ((i = !1),
                    (r += ''.concat(Mc[a] || a, '(').concat(e, ') '))),
                    n && (t[a] = e);
                }
              }
              return (
                (r = r.trim()),
                n ? (r = n(t, i ? '' : r)) : i && (r = 'none'),
                r
              );
            })(t, e.transform, n))
          : r.transform && (r.transform = 'none')),
      s)
    ) {
      const { originX: e = '50%', originY: t = '50%', originZ: n = 0 } = o;
      r.transformOrigin = ''.concat(e, ' ').concat(t, ' ').concat(n);
    }
  }
  function Lc(e, t, n) {
    return 'string' === typeof e ? e : xi.transform(t + n * e);
  }
  const zc = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
    Nc = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
  const Bc = [
    'attrX',
    'attrY',
    'attrScale',
    'originX',
    'originY',
    'pathLength',
    'pathSpacing',
    'pathOffset',
  ];
  function Vc(e, t, n, r) {
    let {
      attrX: i,
      attrY: o,
      attrScale: a,
      originX: s,
      originY: l,
      pathLength: u,
      pathSpacing: d = 1,
      pathOffset: h = 0,
    } = t;
    if ((jc(e, c(t, Bc), r), n))
      return void (e.style.viewBox && (e.attrs.viewBox = e.style.viewBox));
    (e.attrs = e.style), (e.style = {});
    const { attrs: f, style: p, dimensions: m } = e;
    f.transform && (m && (p.transform = f.transform), delete f.transform),
      m &&
        (void 0 !== s || void 0 !== l || p.transform) &&
        (p.transformOrigin = (function (e, t, n) {
          const r = Lc(t, e.x, e.width),
            i = Lc(n, e.y, e.height);
          return ''.concat(r, ' ').concat(i);
        })(m, void 0 !== s ? s : 0.5, void 0 !== l ? l : 0.5)),
      void 0 !== i && (f.x = i),
      void 0 !== o && (f.y = o),
      void 0 !== a && (f.scale = a),
      void 0 !== u &&
        (function (e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 1,
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 0,
            i =
              !(arguments.length > 4 && void 0 !== arguments[4]) ||
              arguments[4];
          e.pathLength = 1;
          const o = i ? zc : Nc;
          e[o.offset] = xi.transform(-r);
          const a = xi.transform(t),
            s = xi.transform(n);
          e[o.array] = ''.concat(a, ' ').concat(s);
        })(f, u, d, h, !1);
  }
  const Oc = (e) => 'string' === typeof e && 'svg' === e.toLowerCase(),
    Ic = {
      useVisualState: Pc({
        scrapeMotionValuesFromProps: Sc,
        createRenderState: Fc,
        onMount: (e, t, n) => {
          let { renderState: r, latestValues: i } = n;
          Zr.read(() => {
            try {
              r.dimensions =
                'function' === typeof t.getBBox
                  ? t.getBBox()
                  : t.getBoundingClientRect();
            } catch (Zb) {
              r.dimensions = { x: 0, y: 0, width: 0, height: 0 };
            }
          }),
            Zr.render(() => {
              Vc(r, i, Oc(t.tagName), e.transformTemplate), bc(t, r);
            });
        },
      }),
    },
    Uc = {
      useVisualState: Pc({
        scrapeMotionValuesFromProps: wc,
        createRenderState: Tc,
      }),
    };
  function Zc(e, t, n) {
    for (const r in t) Ga(t[r]) || xc(r, n) || (e[r] = t[r]);
  }
  function _c(e, t) {
    const n = {};
    return (
      Zc(n, e.style || {}, e),
      Object.assign(
        n,
        (function (e, t) {
          let { transformTemplate: n } = e;
          return (0, r.useMemo)(() => {
            const e = {
              style: {},
              transform: {},
              transformOrigin: {},
              vars: {},
            };
            return jc(e, t, n), Object.assign({}, e.vars, e.style);
          }, [t]);
        })(e, t)
      ),
      n
    );
  }
  function Wc(e, t) {
    const n = {},
      r = _c(e, t);
    return (
      e.drag &&
        !1 !== e.dragListener &&
        ((n.draggable = !1),
        (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = 'none'),
        (r.touchAction =
          !0 === e.drag ? 'none' : 'pan-'.concat('x' === e.drag ? 'y' : 'x'))),
      void 0 === e.tabIndex &&
        (e.onTap || e.onTapStart || e.whileTap) &&
        (n.tabIndex = 0),
      (n.style = r),
      n
    );
  }
  const Hc = new Set([
    'animate',
    'exit',
    'variants',
    'initial',
    'style',
    'values',
    'variants',
    'transition',
    'transformTemplate',
    'custom',
    'inherit',
    'onBeforeLayoutMeasure',
    'onAnimationStart',
    'onAnimationComplete',
    'onUpdate',
    'onDragStart',
    'onDrag',
    'onDragEnd',
    'onMeasureDragConstraints',
    'onDirectionLock',
    'onDragTransitionEnd',
    '_dragX',
    '_dragY',
    'onHoverStart',
    'onHoverEnd',
    'onViewportEnter',
    'onViewportLeave',
    'globalTapTarget',
    'ignoreStrict',
    'viewport',
  ]);
  function Jc(e) {
    return (
      e.startsWith('while') ||
      (e.startsWith('drag') && 'draggable' !== e) ||
      e.startsWith('layout') ||
      e.startsWith('onTap') ||
      e.startsWith('onPan') ||
      e.startsWith('onLayout') ||
      Hc.has(e)
    );
  }
  let Yc = (e) => !Jc(e);
  try {
    (Xc = require('@emotion/is-prop-valid').default) &&
      (Yc = (e) => (e.startsWith('on') ? !Jc(e) : Xc(e)));
  } catch (_b) {}
  var Xc;
  function Qc(e, t, n, i) {
    const o = (0, r.useMemo)(() => {
      const n = Fc();
      return (
        Vc(n, t, Oc(i), e.transformTemplate),
        u(u({}, n.attrs), {}, { style: u({}, n.style) })
      );
    }, [t]);
    if (e.style) {
      const t = {};
      Zc(t, e.style, e), (o.style = u(u({}, t), o.style));
    }
    return o;
  }
  function Gc() {
    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return (t, n, i, o, a) => {
      let { latestValues: s } = o;
      const l = (vc(t) ? Qc : Wc)(n, s, a, t),
        c = (function (e, t, n) {
          const r = {};
          for (const i in e)
            ('values' === i && 'object' === typeof e.values) ||
              ((Yc(i) ||
                (!0 === n && Jc(i)) ||
                (!t && !Jc(i)) ||
                (e.draggable && i.startsWith('onDrag'))) &&
                (r[i] = e[i]));
          return r;
        })(n, 'string' === typeof t, e),
        d = t !== r.Fragment ? u(u(u({}, c), l), {}, { ref: i }) : {},
        { children: h } = n,
        f = (0, r.useMemo)(() => (Ga(h) ? h.get() : h), [h]);
      return (0, r.createElement)(t, u(u({}, d), {}, { children: f }));
    };
  }
  function Kc(e, t) {
    return function (n) {
      let { forwardMotionProps: r } =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : { forwardMotionProps: !1 };
      return pc(
        u(
          u({}, vc(n) ? Ic : Uc),
          {},
          {
            preloadedFeatures: e,
            useRender: Gc(r),
            createVisualElement: t,
            Component: n,
          }
        )
      );
    };
  }
  const qc = { current: null },
    $c = { current: !1 };
  const ed = new WeakMap(),
    td = [...ji, Gi, oo],
    nd = ['willChange'],
    rd = [
      'AnimationStart',
      'AnimationComplete',
      'Update',
      'BeforeLayoutMeasure',
      'LayoutMeasure',
      'LayoutAnimationStart',
      'LayoutAnimationComplete',
    ];
  class id {
    scrapeMotionValuesFromProps(e, t, n) {
      return {};
    }
    constructor(e) {
      let {
          parent: t,
          props: n,
          presenceContext: r,
          reducedMotionConfig: i,
          blockInitialAnimation: o,
          visualState: a,
        } = e,
        s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      (this.current = null),
        (this.children = new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.values = new Map()),
        (this.KeyframeResolver = Ii),
        (this.features = {}),
        (this.valueSubscriptions = new Map()),
        (this.prevMotionValues = {}),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
        (this.render = () => {
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(
              this.current,
              this.renderState,
              this.props.style,
              this.projection
            ));
        }),
        (this.renderScheduledAt = 0),
        (this.scheduleRender = () => {
          const e = So.now();
          this.renderScheduledAt < e &&
            ((this.renderScheduledAt = e), Zr.render(this.render, !1, !0));
        });
      const { latestValues: l, renderState: d } = a;
      (this.latestValues = l),
        (this.baseTarget = u({}, l)),
        (this.initialValues = n.initial ? u({}, l) : {}),
        (this.renderState = d),
        (this.parent = t),
        (this.props = n),
        (this.presenceContext = r),
        (this.depth = t ? t.depth + 1 : 0),
        (this.reducedMotionConfig = i),
        (this.options = s),
        (this.blockInitialAnimation = Boolean(o)),
        (this.isControllingVariants = sc(n)),
        (this.isVariantNode = lc(n)),
        this.isVariantNode && (this.variantChildren = new Set()),
        (this.manuallyAnimateOnMount = Boolean(t && t.current));
      const h = this.scrapeMotionValuesFromProps(n, {}, this),
        { willChange: f } = h,
        p = c(h, nd);
      for (const u in p) {
        const e = p[u];
        void 0 !== l[u] && Ga(e) && e.set(l[u], !1);
      }
    }
    mount(e) {
      (this.current = e),
        ed.set(e, this),
        this.projection &&
          !this.projection.instance &&
          this.projection.mount(e),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((e, t) => this.bindToMotionValue(t, e)),
        $c.current ||
          (function () {
            if ((($c.current = !0), tc))
              if (window.matchMedia) {
                const e = window.matchMedia('(prefers-reduced-motion)'),
                  t = () => (qc.current = e.matches);
                e.addListener(t), t();
              } else qc.current = !1;
          })(),
        (this.shouldReduceMotion =
          'never' !== this.reducedMotionConfig &&
          ('always' === this.reducedMotionConfig || qc.current)),
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext);
    }
    unmount() {
      ed.delete(this.current),
        this.projection && this.projection.unmount(),
        _r(this.notifyUpdate),
        _r(this.render),
        this.valueSubscriptions.forEach((e) => e()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this);
      for (const e in this.events) this.events[e].clear();
      for (const e in this.features) {
        const t = this.features[e];
        t && (t.unmount(), (t.isMounted = !1));
      }
      this.current = null;
    }
    bindToMotionValue(e, t) {
      this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
      const n = Pr.has(e),
        r = t.on('change', (t) => {
          (this.latestValues[e] = t),
            this.props.onUpdate && Zr.preRender(this.notifyUpdate),
            n && this.projection && (this.projection.isTransformDirty = !0);
        }),
        i = t.on('renderRequest', this.scheduleRender);
      let o;
      window.MotionCheckAppearSync &&
        (o = window.MotionCheckAppearSync(this, e, t)),
        this.valueSubscriptions.set(e, () => {
          r(), i(), o && o(), t.owner && t.stop();
        });
    }
    sortNodePosition(e) {
      return this.current &&
        this.sortInstanceNodePosition &&
        this.type === e.type
        ? this.sortInstanceNodePosition(this.current, e.current)
        : 0;
    }
    updateFeatures() {
      let e = 'animation';
      for (e in hc) {
        const t = hc[e];
        if (!t) continue;
        const { isEnabled: n, Feature: r } = t;
        if (
          (!this.features[e] &&
            r &&
            n(this.props) &&
            (this.features[e] = new r(this)),
          this.features[e])
        ) {
          const t = this.features[e];
          t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    measureViewportBox() {
      return this.current
        ? this.measureInstanceViewportBox(this.current, this.props)
        : { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    }
    getStaticValue(e) {
      return this.latestValues[e];
    }
    setStaticValue(e, t) {
      this.latestValues[e] = t;
    }
    update(e, t) {
      (e.transformTemplate || this.props.transformTemplate) &&
        this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = e),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = t);
      for (let n = 0; n < rd.length; n++) {
        const t = rd[n];
        this.propEventSubscriptions[t] &&
          (this.propEventSubscriptions[t](),
          delete this.propEventSubscriptions[t]);
        const r = e['on' + t];
        r && (this.propEventSubscriptions[t] = this.on(t, r));
      }
      (this.prevMotionValues = (function (e, t, n) {
        for (const r in t) {
          const i = t[r],
            o = n[r];
          if (Ga(i)) e.addValue(r, i);
          else if (Ga(o)) e.addValue(r, Wa(i, { owner: e }));
          else if (o !== i)
            if (e.hasValue(r)) {
              const t = e.getValue(r);
              !0 === t.liveStyle ? t.jump(i) : t.hasAnimated || t.set(i);
            } else {
              const t = e.getStaticValue(r);
              e.addValue(r, Wa(void 0 !== t ? t : i, { owner: e }));
            }
        }
        for (const r in n) void 0 === t[r] && e.removeValue(r);
        return t;
      })(
        this,
        this.scrapeMotionValuesFromProps(e, this.prevProps, this),
        this.prevMotionValues
      )),
        this.handleChildMotionValue && this.handleChildMotionValue();
    }
    getProps() {
      return this.props;
    }
    getVariant(e) {
      return this.props.variants ? this.props.variants[e] : void 0;
    }
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode
        ? this
        : this.parent
          ? this.parent.getClosestVariantNode()
          : void 0;
    }
    addVariantChild(e) {
      const t = this.getClosestVariantNode();
      if (t)
        return (
          t.variantChildren && t.variantChildren.add(e),
          () => t.variantChildren.delete(e)
        );
    }
    addValue(e, t) {
      const n = this.values.get(e);
      t !== n &&
        (n && this.removeValue(e),
        this.bindToMotionValue(e, t),
        this.values.set(e, t),
        (this.latestValues[e] = t.get()));
    }
    removeValue(e) {
      this.values.delete(e);
      const t = this.valueSubscriptions.get(e);
      t && (t(), this.valueSubscriptions.delete(e)),
        delete this.latestValues[e],
        this.removeValueFromRenderState(e, this.renderState);
    }
    hasValue(e) {
      return this.values.has(e);
    }
    getValue(e, t) {
      if (this.props.values && this.props.values[e])
        return this.props.values[e];
      let n = this.values.get(e);
      return (
        void 0 === n &&
          void 0 !== t &&
          ((n = Wa(null === t ? void 0 : t, { owner: this })),
          this.addValue(e, n)),
        n
      );
    }
    readValue(e, t) {
      var n;
      let r =
        void 0 === this.latestValues[e] && this.current
          ? null !== (n = this.getBaseTargetFromProps(this.props, e)) &&
            void 0 !== n
            ? n
            : this.readValueFromInstance(this.current, e, this.options)
          : this.latestValues[e];
      var i;
      return (
        void 0 !== r &&
          null !== r &&
          ('string' === typeof r && (ai(r) || ri(r))
            ? (r = parseFloat(r))
            : ((i = r), !td.find(Ri(i)) && oo.test(t) && (r = vo(e, t))),
          this.setBaseTarget(e, Ga(r) ? r.get() : r)),
        Ga(r) ? r.get() : r
      );
    }
    setBaseTarget(e, t) {
      this.baseTarget[e] = t;
    }
    getBaseTarget(e) {
      var t;
      const { initial: n } = this.props;
      let r;
      if ('string' === typeof n || 'object' === typeof n) {
        const i = xr(
          this.props,
          n,
          null === (t = this.presenceContext) || void 0 === t
            ? void 0
            : t.custom
        );
        i && (r = i[e]);
      }
      if (n && void 0 !== r) return r;
      const i = this.getBaseTargetFromProps(this.props, e);
      return void 0 === i || Ga(i)
        ? void 0 !== this.initialValues[e] && void 0 === r
          ? void 0
          : this.baseTarget[e]
        : i;
    }
    on(e, t) {
      return (
        this.events[e] || (this.events[e] = new Ua()), this.events[e].add(t)
      );
    }
    notify(e) {
      if (this.events[e]) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
          r < t;
          r++
        )
          n[r - 1] = arguments[r];
        this.events[e].notify(...n);
      }
    }
  }
  class od extends id {
    constructor() {
      super(...arguments), (this.KeyframeResolver = Ao);
    }
    sortInstanceNodePosition(e, t) {
      return 2 & e.compareDocumentPosition(t) ? 1 : -1;
    }
    getBaseTargetFromProps(e, t) {
      return e.style ? e.style[t] : void 0;
    }
    removeValueFromRenderState(e, t) {
      let { vars: n, style: r } = t;
      delete n[e], delete r[e];
    }
    handleChildMotionValue() {
      this.childSubscription &&
        (this.childSubscription(), delete this.childSubscription);
      const { children: e } = this.props;
      Ga(e) &&
        (this.childSubscription = e.on('change', (e) => {
          this.current && (this.current.textContent = ''.concat(e));
        }));
    }
  }
  class ad extends od {
    constructor() {
      super(...arguments), (this.type = 'html'), (this.renderInstance = yc);
    }
    readValueFromInstance(e, t) {
      if (Pr.has(t)) {
        const e = go(t);
        return (e && e.default) || 0;
      }
      {
        const r = ((n = e), window.getComputedStyle(n)),
          i = (li(t) ? r.getPropertyValue(t) : r[t]) || 0;
        return 'string' === typeof i ? i.trim() : i;
      }
      var n;
    }
    measureInstanceViewportBox(e, t) {
      let { transformPagePoint: n } = t;
      return ol(e, n);
    }
    build(e, t, n) {
      jc(e, t, n.transformTemplate);
    }
    scrapeMotionValuesFromProps(e, t, n) {
      return wc(e, t, n);
    }
  }
  class sd extends od {
    constructor() {
      super(...arguments),
        (this.type = 'svg'),
        (this.isSVGTag = !1),
        (this.measureInstanceViewportBox = Zs);
    }
    getBaseTargetFromProps(e, t) {
      return e[t];
    }
    readValueFromInstance(e, t) {
      if (Pr.has(t)) {
        const e = go(t);
        return (e && e.default) || 0;
      }
      return (t = Ac.has(t) ? t : Ya(t)), e.getAttribute(t);
    }
    scrapeMotionValuesFromProps(e, t, n) {
      return Sc(e, t, n);
    }
    build(e, t, n) {
      Vc(e, t, this.isSVGTag, n.transformTemplate);
    }
    renderInstance(e, t, n, r) {
      bc(e, t, 0, r);
    }
    mount(e) {
      (this.isSVGTag = Oc(e.tagName)), super.mount(e);
    }
  }
  const ld = (e, t) =>
      vc(e) ? new sd(t) : new ad(t, { allowProjection: e !== r.Fragment }),
    ud = mr(Kc(u(u(u(u({}, ms), Ku), Mu), qu), ld));
  function cd(e) {
    let { children: t, id: n = '', className: r = '', title: i = '' } = e;
    return (0, Fn.jsxs)(ud.section, {
      id: n,
      className: ''.concat(r, ' min-h-screen mb-10 max-w-full'),
      children: [i && (0, Fn.jsx)(pr, { children: i }), t],
    });
  }
  const dd = n.p + 'static/media/3d_print.a8041e8c5f7e48f2d8e1219424ac807e.svg',
    hd = n.p + 'static/media/project1.c8f96b5c29226343ae9a.webp',
    fd = n.p + 'static/media/icon.605c7da41de377f928a2.webp';
  let pd = [
    {
      title: '3D Printing services',
      description:
        'Turn your ideas into reality with our precision 3D printing services. From supporting university \nprojects with high-quality prototypes to creating custom designs tailored to your specific needs, \nwe provide reliable, professional 3D printing solutions for academic, personal, and commercial \npurposes.',
      image: hd,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'CAD Modeling ',
      description:
        'Bring your concepts to life with our expert CAD modeling services. Whether designing \nagricultural tools like seed meters and electric hoes or advanced systems like Delta robots and \nbucket conveyors, we deliver precise, functional models that turn innovation into reality. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \nprototypes to production-ready solutions, we focus on delivering reliable designs that meet your \nexact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \nand systems that enable automation, remote monitoring, and data-driven decision-making, \nempowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \nadvanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \nyou to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n      workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n      program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n      practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description:
        'Make moments unforgettable with our personalized gifts and accessories. Choose from elegant \ntable calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and \ndurable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it \nperfect for gifts or decor. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \nhelp you bring your projects to life. Whether you're a student or a startup, we provide the \nresources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \nneed eye-catching logos, engaging branding, or striking promotional materials, we craft designs \nthat leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
  ];
  pd = pd.map((e) =>
    u(
      u({}, e),
      {},
      { slug: e.title.toLowerCase().trim().replace(/ /g, '-'), icon: fd }
    )
  );
  const md = pd,
    gd = {
      hero: {
        title:
          'Pioneering Sustainable Solutions with Advanced Engineering and Technology',
        content:
          'Our commitment is to provide sustainable, impactful technologies that address the challenges of today and tomorrow. ',
        image: dd,
      },
    },
    vd = { title: 'Our Services', services: md },
    yd = {
      title: 'About Us',
      content:
        'Tensor Lab, powered by Tensor Agri, is dedicated to advancing innovation in diverse areas. \nBuilding on Tensor Agri\u2019s advancements, we inspire creativity and foster practical problem\nsolving through research, development, and hands-on solutions.  \nAt Tensor Lab, we are shaping the future by enabling individuals to explore, design, and \nimplement transformative solutions that make a lasting impact. By connecting knowledge with \nreal-world applications, we foster the creation of cutting-edge innovations that drive progress. \n',
    },
    Ad = {
      title: 'Contact Us',
      content:
        'Have a question or want to discuss a project? Reach out to us through any of the following channels.',
      contactDetails: lr,
    };
  function bd(e) {
    let { icon: t, title: n, description: r, slug: i } = e;
    return (0, Fn.jsx)(yn, {
      to: '/services/'.concat(i),
      children: (0, Fn.jsxs)('div', {
        className:
          'shadow-md hover:shadow-2xl rounded-lg overflow-hidden transform transition duration-300 flex flex-col',
        children: [
          (0, Fn.jsx)('div', {
            children: (0, Fn.jsx)('img', {
              src: t,
              alt: n,
              className:
                'md:w-1/3 w-1/2 mx-auto md:ml-2 object-cover aspect-auto md:aspect-square',
            }),
          }),
          (0, Fn.jsxs)('div', {
            className: 'p-4 md:text-justify text-center',
            children: [
              (0, Fn.jsx)('h3', {
                className:
                  'md:text-xl text-2xl font-semibold text-gray-800 mb-2',
                children: n,
              }),
              (0, Fn.jsxs)('p', {
                className: 'text-gray-600 text-lg md:text-sm',
                children: [r.slice(0, 150), '...'],
              }),
            ],
          }),
        ],
      }),
    });
  }
  function xd() {
    var e;
    return (0, Fn.jsx)(cd, {
      id: 'services',
      children: (0, Fn.jsxs)('div', {
        className: 'max-w-screen-xl mx-auto px-6',
        children: [
          (0, Fn.jsx)(pr, { children: 'Our Services' }),
          (0, Fn.jsx)('div', {
            className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12',
            children:
              null === vd ||
              void 0 === vd ||
              null === (e = vd.services) ||
              void 0 === e
                ? void 0
                : e.slice(0, 5).map((e, t) => (0, Fn.jsx)(bd, u({}, e))),
          }),
          (0, Fn.jsx)('div', {
            className: 'flex items-center w-full justify-center mt-4',
            children: (0, Fn.jsxs)(yn, {
              to: '/services',
              className:
                'flex items-center font-semibold bg-blue-700 px-4 rounded-md text-white py-1',
              children: [
                'See More ',
                (0, Fn.jsx)(er, { className: 'text-xl ms-4' }),
              ],
            }),
          }),
        ],
      }),
    });
  }
  const wd = (0, r.createContext)(null),
    Sd = { duration: 2 };
  function kd(e) {
    let { length: t, children: n, delay: i } = e;
    const [o, a] = (0, r.useState)(0);
    return (
      (0, r.useEffect)(() => {
        const e = setInterval(() => {
          a((e) => (e === t - 1 ? 0 : e + 1));
        }, i);
        return () => clearInterval(e);
      }, []),
      (0, Fn.jsx)(wd.Provider, {
        value: { currentSlide: o, setCurrentSlide: a, animateTransition: Sd },
        children: n,
      })
    );
  }
  const Ed = () => (0, r.useContext)(wd),
    Pd = (0, r.createContext)(null);
  function Cd(e) {
    const t = (0, r.useRef)(null);
    return null === t.current && (t.current = e()), t.current;
  }
  const Td = (0, r.createContext)({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: 'never',
  });
  class Fd extends r.Component {
    getSnapshotBeforeUpdate(e) {
      const t = this.props.childRef.current;
      if (t && e.isPresent && !this.props.isPresent) {
        const e = this.props.sizeRef.current;
        (e.height = t.offsetHeight || 0),
          (e.width = t.offsetWidth || 0),
          (e.top = t.offsetTop),
          (e.left = t.offsetLeft);
      }
      return null;
    }
    componentDidUpdate() {}
    render() {
      return this.props.children;
    }
  }
  function Dd(e) {
    let { children: t, isPresent: n } = e;
    const i = (0, r.useId)(),
      o = (0, r.useRef)(null),
      a = (0, r.useRef)({ width: 0, height: 0, top: 0, left: 0 }),
      { nonce: s } = (0, r.useContext)(Td);
    return (
      (0, r.useInsertionEffect)(() => {
        const { width: e, height: t, top: r, left: l } = a.current;
        if (n || !o.current || !e || !t) return;
        o.current.dataset.motionPopId = i;
        const u = document.createElement('style');
        return (
          s && (u.nonce = s),
          document.head.appendChild(u),
          u.sheet &&
            u.sheet.insertRule(
              '\n          [data-motion-pop-id="'
                .concat(
                  i,
                  '"] {\n            position: absolute !important;\n            width: '
                )
                .concat(e, 'px !important;\n            height: ')
                .concat(t, 'px !important;\n            top: ')
                .concat(r, 'px !important;\n            left: ')
                .concat(l, 'px !important;\n          }\n        ')
            ),
          () => {
            document.head.removeChild(u);
          }
        );
      }, [n]),
      (0, Fn.jsx)(Fd, {
        isPresent: n,
        childRef: o,
        sizeRef: a,
        children: r.cloneElement(t, { ref: o }),
      })
    );
  }
  const Md = (e) => {
    let {
      children: t,
      initial: n,
      isPresent: i,
      onExitComplete: o,
      custom: a,
      presenceAffectsLayout: s,
      mode: l,
    } = e;
    const u = Cd(Rd),
      c = (0, r.useId)(),
      d = (0, r.useCallback)(
        (e) => {
          u.set(e, !0);
          for (const t of u.values()) if (!t) return;
          o && o();
        },
        [u, o]
      ),
      h = (0, r.useMemo)(
        () => ({
          id: c,
          initial: n,
          isPresent: i,
          custom: a,
          onExitComplete: d,
          register: (e) => (u.set(e, !1), () => u.delete(e)),
        }),
        s ? [Math.random(), d] : [i, d]
      );
    return (
      (0, r.useMemo)(() => {
        u.forEach((e, t) => u.set(t, !1));
      }, [i]),
      r.useEffect(() => {
        !i && !u.size && o && o();
      }, [i]),
      'popLayout' === l && (t = (0, Fn.jsx)(Dd, { isPresent: i, children: t })),
      (0, Fn.jsx)(Pd.Provider, { value: h, children: t })
    );
  };
  function Rd() {
    return new Map();
  }
  const jd = (0, r.createContext)({}),
    Ld = (e) => e;
  let zd = Ld,
    Nd = Ld;
  const Bd = (e) => e.key || '';
  function Vd(e) {
    const t = [];
    return (
      r.Children.forEach(e, (e) => {
        (0, r.isValidElement)(e) && t.push(e);
      }),
      t
    );
  }
  const Od = 'undefined' !== typeof window,
    Id = Od ? r.useLayoutEffect : r.useEffect,
    Ud = (e) => {
      let {
        children: t,
        exitBeforeEnter: n,
        custom: i,
        initial: o = !0,
        onExitComplete: a,
        presenceAffectsLayout: s = !0,
        mode: l = 'sync',
      } = e;
      Nd(!n, "Replace exitBeforeEnter with mode='wait'");
      const u = (0, r.useMemo)(() => Vd(t), [t]),
        c = u.map(Bd),
        d = (0, r.useRef)(!0),
        h = (0, r.useRef)(u),
        f = Cd(() => new Map()),
        [p, m] = (0, r.useState)(u),
        [g, v] = (0, r.useState)(u);
      Id(() => {
        (d.current = !1), (h.current = u);
        for (let e = 0; e < g.length; e++) {
          const t = Bd(g[e]);
          c.includes(t) ? f.delete(t) : !0 !== f.get(t) && f.set(t, !1);
        }
      }, [g, c.length, c.join('-')]);
      const y = [];
      if (u !== p) {
        let e = [...u];
        for (let t = 0; t < g.length; t++) {
          const n = g[t],
            r = Bd(n);
          c.includes(r) || (e.splice(t, 0, n), y.push(n));
        }
        return 'wait' === l && y.length && (e = y), v(Vd(e)), void m(u);
      }
      const { forceRender: A } = (0, r.useContext)(jd);
      return (0, Fn.jsx)(Fn.Fragment, {
        children: g.map((e) => {
          const t = Bd(e),
            n = u === g || c.includes(t);
          return (0, Fn.jsx)(
            Md,
            {
              isPresent: n,
              initial: !(d.current && !o) && void 0,
              custom: n ? void 0 : i,
              presenceAffectsLayout: s,
              mode: l,
              onExitComplete: n
                ? void 0
                : () => {
                    if (!f.has(t)) return;
                    f.set(t, !0);
                    let e = !0;
                    f.forEach((t) => {
                      t || (e = !1);
                    }),
                      e &&
                        (null === A || void 0 === A || A(),
                        v(h.current),
                        a && a());
                  },
              children: e,
            },
            t
          );
        }),
      });
    };
  function Zd(e) {
    if ('undefined' === typeof Proxy) return e;
    const t = new Map();
    return new Proxy(
      function () {
        return e(...arguments);
      },
      {
        get: (n, r) =>
          'create' === r ? e : (t.has(r) || t.set(r, e(r)), t.get(r)),
      }
    );
  }
  function _d(e) {
    return null !== e && 'object' === typeof e && 'function' === typeof e.start;
  }
  const Wd = (e) => Array.isArray(e);
  function Hd(e, t) {
    if (!Array.isArray(t)) return !1;
    const n = t.length;
    if (n !== e.length) return !1;
    for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
    return !0;
  }
  function Jd(e) {
    return 'string' === typeof e || Array.isArray(e);
  }
  function Yd(e) {
    const t = [{}, {}];
    return (
      null === e ||
        void 0 === e ||
        e.values.forEach((e, n) => {
          (t[0][n] = e.get()), (t[1][n] = e.getVelocity());
        }),
      t
    );
  }
  function Xd(e, t, n, r) {
    if ('function' === typeof t) {
      const [i, o] = Yd(r);
      t = t(void 0 !== n ? n : e.custom, i, o);
    }
    if (
      ('string' === typeof t && (t = e.variants && e.variants[t]),
      'function' === typeof t)
    ) {
      const [i, o] = Yd(r);
      t = t(void 0 !== n ? n : e.custom, i, o);
    }
    return t;
  }
  function Qd(e, t, n) {
    const r = e.getProps();
    return Xd(r, t, void 0 !== n ? n : r.custom, e);
  }
  const Gd = [
      'animate',
      'whileInView',
      'whileFocus',
      'whileHover',
      'whileTap',
      'whileDrag',
      'exit',
    ],
    Kd = ['initial', ...Gd],
    qd = [
      'transformPerspective',
      'x',
      'y',
      'z',
      'translateX',
      'translateY',
      'translateZ',
      'scale',
      'scaleX',
      'scaleY',
      'rotate',
      'rotateX',
      'rotateY',
      'rotateZ',
      'skew',
      'skewX',
      'skewY',
    ],
    $d = new Set(qd),
    eh = (e) => 1e3 * e,
    th = (e) => e / 1e3,
    nh = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
    rh = { type: 'keyframes', duration: 0.8 },
    ih = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
    oh = (e, t) => {
      let { keyframes: n } = t;
      return n.length > 2
        ? rh
        : $d.has(e)
          ? e.startsWith('scale')
            ? {
                type: 'spring',
                stiffness: 550,
                damping: 0 === n[1] ? 2 * Math.sqrt(550) : 30,
                restSpeed: 10,
              }
            : nh
          : ih;
    };
  function ah(e, t) {
    return e ? e[t] || e.default || e : void 0;
  }
  const sh = !1,
    lh = !1,
    uh = !1,
    ch = (e) => null !== e;
  function dh(e, t, n) {
    let { repeat: r, repeatType: i = 'loop' } = t;
    const o = e.filter(ch),
      a = r && 'loop' !== i && r % 2 === 1 ? 0 : o.length - 1;
    return a && void 0 !== n ? n : o[a];
  }
  const hh = [
    'read',
    'resolveKeyframes',
    'update',
    'preRender',
    'render',
    'postRender',
  ];
  function fh(e, t) {
    let n = !1,
      r = !0;
    const i = { delta: 0, timestamp: 0, isProcessing: !1 },
      o = () => (n = !0),
      a = hh.reduce(
        (e, t) => (
          (e[t] = (function (e) {
            let t = new Set(),
              n = new Set(),
              r = !1,
              i = !1;
            const o = new WeakSet();
            let a = { delta: 0, timestamp: 0, isProcessing: !1 };
            function s(t) {
              o.has(t) && (l.schedule(t), e()), t(a);
            }
            const l = {
              schedule: function (e) {
                const i =
                  arguments.length > 2 &&
                  void 0 !== arguments[2] &&
                  arguments[2] &&
                  r
                    ? t
                    : n;
                return (
                  arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1] &&
                    o.add(e),
                  i.has(e) || i.add(e),
                  e
                );
              },
              cancel: (e) => {
                n.delete(e), o.delete(e);
              },
              process: (e) => {
                (a = e),
                  r
                    ? (i = !0)
                    : ((r = !0),
                      ([t, n] = [n, t]),
                      t.forEach(s),
                      t.clear(),
                      (r = !1),
                      i && ((i = !1), l.process(e)));
              },
            };
            return l;
          })(o)),
          e
        ),
        {}
      ),
      {
        read: s,
        resolveKeyframes: l,
        update: u,
        preRender: c,
        render: d,
        postRender: h,
      } = a,
      f = () => {
        const o = lh ? i.timestamp : performance.now();
        (n = !1),
          (i.delta = r ? 1e3 / 60 : Math.max(Math.min(o - i.timestamp, 40), 1)),
          (i.timestamp = o),
          (i.isProcessing = !0),
          s.process(i),
          l.process(i),
          u.process(i),
          c.process(i),
          d.process(i),
          h.process(i),
          (i.isProcessing = !1),
          n && t && ((r = !1), e(f));
      },
      p = hh.reduce((t, o) => {
        const s = a[o];
        return (
          (t[o] = function (t) {
            let o =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              a =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return (
              n || ((n = !0), (r = !0), i.isProcessing || e(f)),
              s.schedule(t, o, a)
            );
          }),
          t
        );
      }, {});
    return {
      schedule: p,
      cancel: (e) => {
        for (let t = 0; t < hh.length; t++) a[hh[t]].cancel(e);
      },
      state: i,
      steps: a,
    };
  }
  const {
      schedule: ph,
      cancel: mh,
      state: gh,
      steps: vh,
    } = fh(
      'undefined' !== typeof requestAnimationFrame ? requestAnimationFrame : Ld,
      !0
    ),
    yh = (e, t, n) =>
      (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e;
  function Ah(e, t, n, r) {
    if (e === t && n === r) return Ld;
    const i = (t) =>
      (function (e, t, n, r, i) {
        let o,
          a,
          s = 0;
        do {
          (a = t + (n - t) / 2),
            (o = yh(a, r, i) - e),
            o > 0 ? (n = a) : (t = a);
        } while (Math.abs(o) > 1e-7 && ++s < 12);
        return a;
      })(t, 0, 1, e, n);
    return (e) => (0 === e || 1 === e ? e : yh(i(e), t, r));
  }
  const bh = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
    xh = (e) => (t) => 1 - e(1 - t),
    wh = Ah(0.33, 1.53, 0.69, 0.99),
    Sh = xh(wh),
    kh = bh(Sh),
    Eh = (e) =>
      (e *= 2) < 1 ? 0.5 * Sh(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
    Ph = (e) => 1 - Math.sin(Math.acos(e)),
    Ch = xh(Ph),
    Th = bh(Ph),
    Fh = (e) =>
      /^0(?:[\0-\x08\x0E-\x1F!-\x2D\/-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+$/.test(
        e
      );
  const Dh = (e) => /^-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/.test(e),
    Mh = (e) => (t) => 'string' === typeof t && t.startsWith(e),
    Rh = Mh('--'),
    jh = Mh('var(--'),
    Lh = (e) => !!jh(e) && zh.test(e.split('/*')[0].trim()),
    zh =
      /var\(--(?:[\x2D0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\x2D0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*,(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:(?![\t-\r \(\)\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uD800-\uDFFF\uFEFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\((?:(?:(?![\(\)\uD800-\uDFFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])|\((?:(?![\(\)\uD800-\uDFFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])*\))*\))+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)\)$/i,
    Nh =
      /^var\(--(?:([\x2D0-9A-Z_a-z]+)|([\x2D0-9A-Z_a-z]+), ?([ #%\(\),-\.0-9A-Za-z]+))\)/;
  function Bh(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
    Nd(
      n <= 4,
      'Max CSS variable fallback depth detected in property "'.concat(
        e,
        '". This may indicate a circular fallback dependency.'
      )
    );
    const [r, i] = (function (e) {
      const t = Nh.exec(e);
      if (!t) return [,];
      const [, n, r, i] = t;
      return ['--'.concat(null !== n && void 0 !== n ? n : r), i];
    })(e);
    if (!r) return;
    const o = window.getComputedStyle(t).getPropertyValue(r);
    if (o) {
      const e = o.trim();
      return Dh(e) ? parseFloat(e) : e;
    }
    return Lh(i) ? Bh(i, t, n + 1) : i;
  }
  const Vh = (e, t, n) => (n > t ? t : n < e ? e : n),
    Oh = {
      test: (e) => 'number' === typeof e,
      parse: parseFloat,
      transform: (e) => e,
    },
    Ih = u(u({}, Oh), {}, { transform: (e) => Vh(0, 1, e) }),
    Uh = u(u({}, Oh), {}, { default: 1 }),
    Zh = (e) => ({
      test: (t) =>
        'string' === typeof t && t.endsWith(e) && 1 === t.split(' ').length,
      parse: parseFloat,
      transform: (t) => ''.concat(t).concat(e),
    }),
    _h = Zh('deg'),
    Wh = Zh('%'),
    Hh = Zh('px'),
    Jh = Zh('vh'),
    Yh = Zh('vw'),
    Xh = u(
      u({}, Wh),
      {},
      {
        parse: (e) => Wh.parse(e) / 100,
        transform: (e) => Wh.transform(100 * e),
      }
    ),
    Qh = new Set([
      'width',
      'height',
      'top',
      'left',
      'right',
      'bottom',
      'x',
      'y',
      'translateX',
      'translateY',
    ]),
    Gh = (e) => e === Oh || e === Hh,
    Kh = (e, t) => parseFloat(e.split(', ')[t]),
    qh = (e, t) => (n, r) => {
      let { transform: i } = r;
      if ('none' === i || !i) return 0;
      const o = i.match(
        /^matrix3d\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)\)$/
      );
      if (o) return Kh(o[1], t);
      {
        const t = i.match(
          /^matrix\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)\)$/
        );
        return t ? Kh(t[1], e) : 0;
      }
    },
    $h = new Set(['x', 'y', 'z']),
    ef = qd.filter((e) => !$h.has(e));
  const tf = {
    width: (e, t) => {
      let { x: n } = e,
        { paddingLeft: r = '0', paddingRight: i = '0' } = t;
      return n.max - n.min - parseFloat(r) - parseFloat(i);
    },
    height: (e, t) => {
      let { y: n } = e,
        { paddingTop: r = '0', paddingBottom: i = '0' } = t;
      return n.max - n.min - parseFloat(r) - parseFloat(i);
    },
    top: (e, t) => {
      let { top: n } = t;
      return parseFloat(n);
    },
    left: (e, t) => {
      let { left: n } = t;
      return parseFloat(n);
    },
    bottom: (e, t) => {
      let { y: n } = e,
        { top: r } = t;
      return parseFloat(r) + (n.max - n.min);
    },
    right: (e, t) => {
      let { x: n } = e,
        { left: r } = t;
      return parseFloat(r) + (n.max - n.min);
    },
    x: qh(4, 13),
    y: qh(5, 14),
  };
  (tf.translateX = tf.x), (tf.translateY = tf.y);
  const nf = (e) => (t) => t.test(e),
    rf = [
      Oh,
      Hh,
      Wh,
      _h,
      Yh,
      Jh,
      { test: (e) => 'auto' === e, parse: (e) => e },
    ],
    of = (e) => rf.find(nf(e)),
    af = new Set();
  let sf = !1,
    lf = !1;
  function uf() {
    if (lf) {
      const e = Array.from(af).filter((e) => e.needsMeasurement),
        t = new Set(e.map((e) => e.element)),
        n = new Map();
      t.forEach((e) => {
        const t = (function (e) {
          const t = [];
          return (
            ef.forEach((n) => {
              const r = e.getValue(n);
              void 0 !== r &&
                (t.push([n, r.get()]), r.set(n.startsWith('scale') ? 1 : 0));
            }),
            t
          );
        })(e);
        t.length && (n.set(e, t), e.render());
      }),
        e.forEach((e) => e.measureInitialState()),
        t.forEach((e) => {
          e.render();
          const t = n.get(e);
          t &&
            t.forEach((t) => {
              let [n, r] = t;
              var i;
              null === (i = e.getValue(n)) || void 0 === i || i.set(r);
            });
        }),
        e.forEach((e) => e.measureEndState()),
        e.forEach((e) => {
          void 0 !== e.suspendedScrollY &&
            window.scrollTo(0, e.suspendedScrollY);
        });
    }
    (lf = !1), (sf = !1), af.forEach((e) => e.complete()), af.clear();
  }
  function cf() {
    af.forEach((e) => {
      e.readKeyframes(), e.needsMeasurement && (lf = !0);
    });
  }
  class df {
    constructor(e, t, n, r, i) {
      let o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
      (this.isComplete = !1),
        (this.isAsync = !1),
        (this.needsMeasurement = !1),
        (this.isScheduled = !1),
        (this.unresolvedKeyframes = [...e]),
        (this.onComplete = t),
        (this.name = n),
        (this.motionValue = r),
        (this.element = i),
        (this.isAsync = o);
    }
    scheduleResolve() {
      (this.isScheduled = !0),
        this.isAsync
          ? (af.add(this),
            sf || ((sf = !0), ph.read(cf), ph.resolveKeyframes(uf)))
          : (this.readKeyframes(), this.complete());
    }
    readKeyframes() {
      const {
        unresolvedKeyframes: e,
        name: t,
        element: n,
        motionValue: r,
      } = this;
      for (let i = 0; i < e.length; i++)
        if (null === e[i])
          if (0 === i) {
            const i = null === r || void 0 === r ? void 0 : r.get(),
              o = e[e.length - 1];
            if (void 0 !== i) e[0] = i;
            else if (n && t) {
              const r = n.readValue(t, o);
              void 0 !== r && null !== r && (e[0] = r);
            }
            void 0 === e[0] && (e[0] = o), r && void 0 === i && r.set(e[0]);
          } else e[i] = e[i - 1];
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete() {
      (this.isComplete = !0),
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
        af.delete(this);
    }
    cancel() {
      this.isComplete || ((this.isScheduled = !1), af.delete(this));
    }
    resume() {
      this.isComplete || this.scheduleResolve();
    }
  }
  const hf = (e) => Math.round(1e5 * e) / 1e5,
    ff = /-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)/g;
  const pf =
      /^(?:#[0-9a-f]{3,8}|(?:rgb|h[s\u017F]l)a?\((?:-?[\.0-9]+%?[\t-\r ,\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+){2}-?[\.0-9]+%?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:[,\/][\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?(?:\b[0-9]+(?:\.[0-9]+)?|\.[0-9]+)?%?\))$/i,
    mf = (e, t) => (n) =>
      Boolean(
        ('string' === typeof n && pf.test(n) && n.startsWith(e)) ||
          (t &&
            !(function (e) {
              return null == e;
            })(n) &&
            Object.prototype.hasOwnProperty.call(n, t))
      ),
    gf = (e, t, n) => (r) => {
      if ('string' !== typeof r) return r;
      const [i, o, a, s] = r.match(ff);
      return {
        [e]: parseFloat(i),
        [t]: parseFloat(o),
        [n]: parseFloat(a),
        alpha: void 0 !== s ? parseFloat(s) : 1,
      };
    },
    vf = u(
      u({}, Oh),
      {},
      { transform: (e) => Math.round(((e) => Vh(0, 255, e))(e)) }
    ),
    yf = {
      test: mf('rgb', 'red'),
      parse: gf('red', 'green', 'blue'),
      transform: (e) => {
        let { red: t, green: n, blue: r, alpha: i = 1 } = e;
        return (
          'rgba(' +
          vf.transform(t) +
          ', ' +
          vf.transform(n) +
          ', ' +
          vf.transform(r) +
          ', ' +
          hf(Ih.transform(i)) +
          ')'
        );
      },
    };
  const Af = {
      test: mf('#'),
      parse: function (e) {
        let t = '',
          n = '',
          r = '',
          i = '';
        return (
          e.length > 5
            ? ((t = e.substring(1, 3)),
              (n = e.substring(3, 5)),
              (r = e.substring(5, 7)),
              (i = e.substring(7, 9)))
            : ((t = e.substring(1, 2)),
              (n = e.substring(2, 3)),
              (r = e.substring(3, 4)),
              (i = e.substring(4, 5)),
              (t += t),
              (n += n),
              (r += r),
              (i += i)),
          {
            red: parseInt(t, 16),
            green: parseInt(n, 16),
            blue: parseInt(r, 16),
            alpha: i ? parseInt(i, 16) / 255 : 1,
          }
        );
      },
      transform: yf.transform,
    },
    bf = {
      test: mf('hsl', 'hue'),
      parse: gf('hue', 'saturation', 'lightness'),
      transform: (e) => {
        let { hue: t, saturation: n, lightness: r, alpha: i = 1 } = e;
        return (
          'hsla(' +
          Math.round(t) +
          ', ' +
          Wh.transform(hf(n)) +
          ', ' +
          Wh.transform(hf(r)) +
          ', ' +
          hf(Ih.transform(i)) +
          ')'
        );
      },
    },
    xf = {
      test: (e) => yf.test(e) || Af.test(e) || bf.test(e),
      parse: (e) =>
        yf.test(e) ? yf.parse(e) : bf.test(e) ? bf.parse(e) : Af.parse(e),
      transform: (e) =>
        'string' === typeof e
          ? e
          : e.hasOwnProperty('red')
            ? yf.transform(e)
            : bf.transform(e),
    },
    wf =
      /(?:#[0-9a-f]{3,8}|(?:rgb|h[s\u017F]l)a?\((?:-?[\.0-9]+%?[\t-\r ,\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+){2}-?[\.0-9]+%?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:[,\/][\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?(?:\b[0-9]+(?:\.[0-9]+)?|\.[0-9]+)?%?\))/gi;
  const Sf = 'number',
    kf = 'color',
    Ef =
      /var[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*--(?:[\x2D0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\x2D0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*,(?:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:(?![\t-\r \(\)\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uD800-\uDFFF\uFEFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\((?:(?:(?![\(\)\uD800-\uDFFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])|\((?:(?![\(\)\uD800-\uDFFF])[^]|[\uD800-\uDBFF][\uDC00-\uDFFF])*\))*\))+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)\)|#[0-9a-f]{3,8}|(?:rgb|h[s\u017F]l)a?\((?:-?[\.0-9]+%?[\t-\r ,\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+){2}-?[\.0-9]+%?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:[,\/][\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?(?:\b[0-9]+(?:\.[0-9]+)?|\.[0-9]+)?%?\)|-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)/gi;
  function Pf(e) {
    const t = e.toString(),
      n = [],
      r = { color: [], number: [], var: [] },
      i = [];
    let o = 0;
    const a = t
      .replace(
        Ef,
        (e) => (
          xf.test(e)
            ? (r.color.push(o), i.push(kf), n.push(xf.parse(e)))
            : e.startsWith('var(')
              ? (r.var.push(o), i.push('var'), n.push(e))
              : (r.number.push(o), i.push(Sf), n.push(parseFloat(e))),
          ++o,
          '${}'
        )
      )
      .split('${}');
    return { values: n, split: a, indexes: r, types: i };
  }
  function Cf(e) {
    return Pf(e).values;
  }
  function Tf(e) {
    const { split: t, types: n } = Pf(e),
      r = t.length;
    return (e) => {
      let i = '';
      for (let o = 0; o < r; o++)
        if (((i += t[o]), void 0 !== e[o])) {
          const t = n[o];
          i += t === Sf ? hf(e[o]) : t === kf ? xf.transform(e[o]) : e[o];
        }
      return i;
    };
  }
  const Ff = (e) => ('number' === typeof e ? 0 : e);
  const Df = {
      test: function (e) {
        var t, n;
        return (
          isNaN(e) &&
          'string' === typeof e &&
          ((null === (t = e.match(ff)) || void 0 === t ? void 0 : t.length) ||
            0) +
            ((null === (n = e.match(wf)) || void 0 === n ? void 0 : n.length) ||
              0) >
            0
        );
      },
      parse: Cf,
      createTransformer: Tf,
      getAnimatableNone: function (e) {
        const t = Cf(e);
        return Tf(e)(t.map(Ff));
      },
    },
    Mf = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
  function Rf(e) {
    const [t, n] = e.slice(0, -1).split('(');
    if ('drop-shadow' === t) return e;
    const [r] = n.match(ff) || [];
    if (!r) return e;
    const i = n.replace(r, '');
    let o = Mf.has(t) ? 1 : 0;
    return r !== n && (o *= 100), t + '(' + o + i + ')';
  }
  const jf =
      /\b([\x2Da-z]*)\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\)/g,
    Lf = u(
      u({}, Df),
      {},
      {
        getAnimatableNone: (e) => {
          const t = e.match(jf);
          return t ? t.map(Rf).join(' ') : e;
        },
      }
    ),
    zf = {
      borderWidth: Hh,
      borderTopWidth: Hh,
      borderRightWidth: Hh,
      borderBottomWidth: Hh,
      borderLeftWidth: Hh,
      borderRadius: Hh,
      radius: Hh,
      borderTopLeftRadius: Hh,
      borderTopRightRadius: Hh,
      borderBottomRightRadius: Hh,
      borderBottomLeftRadius: Hh,
      width: Hh,
      maxWidth: Hh,
      height: Hh,
      maxHeight: Hh,
      top: Hh,
      right: Hh,
      bottom: Hh,
      left: Hh,
      padding: Hh,
      paddingTop: Hh,
      paddingRight: Hh,
      paddingBottom: Hh,
      paddingLeft: Hh,
      margin: Hh,
      marginTop: Hh,
      marginRight: Hh,
      marginBottom: Hh,
      marginLeft: Hh,
      backgroundPositionX: Hh,
      backgroundPositionY: Hh,
    },
    Nf = {
      rotate: _h,
      rotateX: _h,
      rotateY: _h,
      rotateZ: _h,
      scale: Uh,
      scaleX: Uh,
      scaleY: Uh,
      scaleZ: Uh,
      skew: _h,
      skewX: _h,
      skewY: _h,
      distance: Hh,
      translateX: Hh,
      translateY: Hh,
      translateZ: Hh,
      x: Hh,
      y: Hh,
      z: Hh,
      perspective: Hh,
      transformPerspective: Hh,
      opacity: Ih,
      originX: Xh,
      originY: Xh,
      originZ: Hh,
    },
    Bf = u(u({}, Oh), {}, { transform: Math.round }),
    Vf = u(
      u(u({}, zf), Nf),
      {},
      {
        zIndex: Bf,
        size: Hh,
        fillOpacity: Ih,
        strokeOpacity: Ih,
        numOctaves: Bf,
      }
    ),
    Of = u(
      u({}, Vf),
      {},
      {
        color: xf,
        backgroundColor: xf,
        outlineColor: xf,
        fill: xf,
        stroke: xf,
        borderColor: xf,
        borderTopColor: xf,
        borderRightColor: xf,
        borderBottomColor: xf,
        borderLeftColor: xf,
        filter: Lf,
        WebkitFilter: Lf,
      }
    ),
    If = (e) => Of[e];
  function Uf(e, t) {
    let n = If(e);
    return (
      n !== Lf && (n = Df),
      n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
    );
  }
  const Zf = new Set(['auto', 'none', '0']);
  class _f extends df {
    constructor(e, t, n, r, i) {
      super(e, t, n, r, i, !0);
    }
    readKeyframes() {
      const { unresolvedKeyframes: e, element: t, name: n } = this;
      if (!t || !t.current) return;
      super.readKeyframes();
      for (let s = 0; s < e.length; s++) {
        let n = e[s];
        if ('string' === typeof n && ((n = n.trim()), Lh(n))) {
          const r = Bh(n, t.current);
          void 0 !== r && (e[s] = r),
            s === e.length - 1 && (this.finalKeyframe = n);
        }
      }
      if ((this.resolveNoneKeyframes(), !Qh.has(n) || 2 !== e.length)) return;
      const [r, i] = e,
        o = of(r),
        a = of(i);
      if (o !== a)
        if (Gh(o) && Gh(a))
          for (let s = 0; s < e.length; s++) {
            const t = e[s];
            'string' === typeof t && (e[s] = parseFloat(t));
          }
        else this.needsMeasurement = !0;
    }
    resolveNoneKeyframes() {
      const { unresolvedKeyframes: e, name: t } = this,
        n = [];
      for (let i = 0; i < e.length; i++)
        ('number' === typeof (r = e[i])
          ? 0 === r
          : null === r || 'none' === r || '0' === r || Fh(r)) && n.push(i);
      var r;
      n.length &&
        (function (e, t, n) {
          let r,
            i = 0;
          for (; i < e.length && !r; ) {
            const t = e[i];
            'string' === typeof t &&
              !Zf.has(t) &&
              Pf(t).values.length &&
              (r = e[i]),
              i++;
          }
          if (r && n) for (const o of t) e[o] = Uf(n, r);
        })(e, n, t);
    }
    measureInitialState() {
      const { element: e, unresolvedKeyframes: t, name: n } = this;
      if (!e || !e.current) return;
      'height' === n && (this.suspendedScrollY = window.pageYOffset),
        (this.measuredOrigin = tf[n](
          e.measureViewportBox(),
          window.getComputedStyle(e.current)
        )),
        (t[0] = this.measuredOrigin);
      const r = t[t.length - 1];
      void 0 !== r && e.getValue(n, r).jump(r, !1);
    }
    measureEndState() {
      var e;
      const { element: t, name: n, unresolvedKeyframes: r } = this;
      if (!t || !t.current) return;
      const i = t.getValue(n);
      i && i.jump(this.measuredOrigin, !1);
      const o = r.length - 1,
        a = r[o];
      (r[o] = tf[n](
        t.measureViewportBox(),
        window.getComputedStyle(t.current)
      )),
        null !== a && void 0 === this.finalKeyframe && (this.finalKeyframe = a),
        (null === (e = this.removedTransforms) || void 0 === e
          ? void 0
          : e.length) &&
          this.removedTransforms.forEach((e) => {
            let [n, r] = e;
            t.getValue(n).set(r);
          }),
        this.resolveNoneKeyframes();
    }
  }
  function Wf(e) {
    return 'function' === typeof e;
  }
  let Hf;
  function Jf() {
    Hf = void 0;
  }
  const Yf = {
      now: () => (
        void 0 === Hf &&
          Yf.set(gh.isProcessing || lh ? gh.timestamp : performance.now()),
        Hf
      ),
      set: (e) => {
        (Hf = e), queueMicrotask(Jf);
      },
    },
    Xf = (e, t) =>
      'zIndex' !== t &&
      (!('number' !== typeof e && !Array.isArray(e)) ||
        !(
          'string' !== typeof e ||
          (!Df.test(e) && '0' !== e) ||
          e.startsWith('url(')
        ));
  const Qf = [
    'autoplay',
    'delay',
    'type',
    'repeat',
    'repeatDelay',
    'repeatType',
  ];
  class Gf {
    constructor(e) {
      let {
          autoplay: t = !0,
          delay: n = 0,
          type: r = 'keyframes',
          repeat: i = 0,
          repeatDelay: o = 0,
          repeatType: a = 'loop',
        } = e,
        s = c(e, Qf);
      (this.isStopped = !1),
        (this.hasAttemptedResolve = !1),
        (this.createdAt = Yf.now()),
        (this.options = u(
          {
            autoplay: t,
            delay: n,
            type: r,
            repeat: i,
            repeatDelay: o,
            repeatType: a,
          },
          s
        )),
        this.updateFinishedPromise();
    }
    calcStartTime() {
      return this.resolvedAt && this.resolvedAt - this.createdAt > 40
        ? this.resolvedAt
        : this.createdAt;
    }
    get resolved() {
      return (
        this._resolved || this.hasAttemptedResolve || (cf(), uf()),
        this._resolved
      );
    }
    onKeyframesResolved(e, t) {
      (this.resolvedAt = Yf.now()), (this.hasAttemptedResolve = !0);
      const {
        name: n,
        type: r,
        velocity: i,
        delay: o,
        onComplete: a,
        onUpdate: s,
        isGenerator: l,
      } = this.options;
      if (
        !l &&
        !(function (e, t, n, r) {
          const i = e[0];
          if (null === i) return !1;
          if ('display' === t || 'visibility' === t) return !0;
          const o = e[e.length - 1],
            a = Xf(i, t),
            s = Xf(o, t);
          return (
            zd(
              a === s,
              'You are trying to animate '
                .concat(t, ' from "')
                .concat(i, '" to "')
                .concat(o, '". ')
                .concat(
                  i,
                  ' is not an animatable value - to enable this animation set '
                )
                .concat(i, ' to a value animatable to ')
                .concat(o, ' via the `style` property.')
            ),
            !(!a || !s) &&
              ((function (e) {
                const t = e[0];
                if (1 === e.length) return !0;
                for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
              })(e) ||
                (('spring' === n || Wf(n)) && r))
          );
        })(e, n, r, i)
      ) {
        if (uh || !o)
          return (
            null === s || void 0 === s || s(dh(e, this.options, t)),
            null === a || void 0 === a || a(),
            void this.resolveFinishedPromise()
          );
        this.options.duration = 0;
      }
      const c = this.initPlayback(e, t);
      !1 !== c &&
        ((this._resolved = u({ keyframes: e, finalKeyframe: t }, c)),
        this.onPostResolved());
    }
    onPostResolved() {}
    then(e, t) {
      return this.currentFinishedPromise.then(e, t);
    }
    flatten() {
      (this.options.type = 'keyframes'), (this.options.ease = 'linear');
    }
    updateFinishedPromise() {
      this.currentFinishedPromise = new Promise((e) => {
        this.resolveFinishedPromise = e;
      });
    }
  }
  const Kf = (e, t, n) => {
      const r = t - e;
      return 0 === r ? 1 : (n - e) / r;
    },
    qf = function (e, t) {
      let n =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10,
        r = '';
      const i = Math.max(Math.round(t / n), 2);
      for (let o = 0; o < i; o++) r += e(Kf(0, i - 1, o)) + ', ';
      return 'linear('.concat(r.substring(0, r.length - 2), ')');
    };
  function $f(e, t) {
    return t ? e * (1e3 / t) : 0;
  }
  function ep(e, t, n) {
    const r = Math.max(t - 5, 0);
    return $f(n - e(r), t - r);
  }
  const tp = {
      stiffness: 100,
      damping: 10,
      mass: 1,
      velocity: 0,
      duration: 800,
      bounce: 0.3,
      visualDuration: 0.3,
      restSpeed: { granular: 0.01, default: 2 },
      restDelta: { granular: 0.005, default: 0.5 },
      minDuration: 0.01,
      maxDuration: 10,
      minDamping: 0.05,
      maxDamping: 1,
    },
    np = 0.001;
  function rp(e) {
    let t,
      n,
      {
        duration: r = tp.duration,
        bounce: i = tp.bounce,
        velocity: o = tp.velocity,
        mass: a = tp.mass,
      } = e;
    zd(r <= eh(tp.maxDuration), 'Spring duration must be 10 seconds or less');
    let s = 1 - i;
    (s = Vh(tp.minDamping, tp.maxDamping, s)),
      (r = Vh(tp.minDuration, tp.maxDuration, th(r))),
      s < 1
        ? ((t = (e) => {
            const t = e * s,
              n = t * r,
              i = t - o,
              a = op(e, s),
              l = Math.exp(-n);
            return np - (i / a) * l;
          }),
          (n = (e) => {
            const n = e * s * r,
              i = n * o + o,
              a = Math.pow(s, 2) * Math.pow(e, 2) * r,
              l = Math.exp(-n),
              u = op(Math.pow(e, 2), s);
            return ((-t(e) + np > 0 ? -1 : 1) * ((i - a) * l)) / u;
          }))
        : ((t = (e) => Math.exp(-e * r) * ((e - o) * r + 1) - 0.001),
          (n = (e) => Math.exp(-e * r) * (r * r * (o - e))));
    const l = (function (e, t, n) {
      let r = n;
      for (let i = 1; i < ip; i++) r -= e(r) / t(r);
      return r;
    })(t, n, 5 / r);
    if (((r = eh(r)), isNaN(l)))
      return { stiffness: tp.stiffness, damping: tp.damping, duration: r };
    {
      const e = Math.pow(l, 2) * a;
      return { stiffness: e, damping: 2 * s * Math.sqrt(a * e), duration: r };
    }
  }
  const ip = 12;
  function op(e, t) {
    return e * Math.sqrt(1 - t * t);
  }
  const ap = 2e4;
  function sp(e) {
    let t = 0;
    let n = e.next(t);
    for (; !n.done && t < ap; ) (t += 50), (n = e.next(t));
    return t >= ap ? 1 / 0 : t;
  }
  const lp = ['duration', 'bounce'],
    up = ['stiffness', 'damping', 'mass'];
  function cp(e, t) {
    return t.some((t) => void 0 !== e[t]);
  }
  function dp() {
    let e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : tp.visualDuration,
      t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : tp.bounce;
    const n =
      'object' !== typeof e
        ? { visualDuration: e, keyframes: [0, 1], bounce: t }
        : e;
    let { restSpeed: r, restDelta: i } = n;
    const o = n.keyframes[0],
      a = n.keyframes[n.keyframes.length - 1],
      s = { done: !1, value: o },
      {
        stiffness: l,
        damping: c,
        mass: d,
        duration: h,
        velocity: f,
        isResolvedFromDuration: p,
      } = (function (e) {
        let t = u(
          {
            velocity: tp.velocity,
            stiffness: tp.stiffness,
            damping: tp.damping,
            mass: tp.mass,
            isResolvedFromDuration: !1,
          },
          e
        );
        if (!cp(e, up) && cp(e, lp))
          if (e.visualDuration) {
            const n = e.visualDuration,
              r = (2 * Math.PI) / (1.2 * n),
              i = r * r,
              o = 2 * Vh(0.05, 1, 1 - e.bounce) * Math.sqrt(i);
            t = u(u({}, t), {}, { mass: tp.mass, stiffness: i, damping: o });
          } else {
            const n = rp(e);
            (t = u(u(u({}, t), n), {}, { mass: tp.mass })),
              (t.isResolvedFromDuration = !0);
          }
        return t;
      })(u(u({}, n), {}, { velocity: -th(n.velocity || 0) })),
      m = f || 0,
      g = c / (2 * Math.sqrt(l * d)),
      v = a - o,
      y = th(Math.sqrt(l / d)),
      A = Math.abs(v) < 5;
    let b;
    if (
      (r || (r = A ? tp.restSpeed.granular : tp.restSpeed.default),
      i || (i = A ? tp.restDelta.granular : tp.restDelta.default),
      g < 1)
    ) {
      const e = op(y, g);
      b = (t) => {
        const n = Math.exp(-g * y * t);
        return (
          a -
          n * (((m + g * y * v) / e) * Math.sin(e * t) + v * Math.cos(e * t))
        );
      };
    } else if (1 === g) b = (e) => a - Math.exp(-y * e) * (v + (m + y * v) * e);
    else {
      const e = y * Math.sqrt(g * g - 1);
      b = (t) => {
        const n = Math.exp(-g * y * t),
          r = Math.min(e * t, 300);
        return (
          a - (n * ((m + g * y * v) * Math.sinh(r) + e * v * Math.cosh(r))) / e
        );
      };
    }
    const x = {
      calculatedDuration: (p && h) || null,
      next: (e) => {
        const t = b(e);
        if (p) s.done = e >= h;
        else {
          let n = 0;
          g < 1 && (n = 0 === e ? eh(m) : ep(b, e, t));
          const o = Math.abs(n) <= r,
            l = Math.abs(a - t) <= i;
          s.done = o && l;
        }
        return (s.value = s.done ? a : t), s;
      },
      toString: () => {
        const e = Math.min(sp(x), ap),
          t = qf((t) => x.next(e * t).value, e, 30);
        return e + 'ms ' + t;
      },
    };
    return x;
  }
  function hp(e) {
    let {
      keyframes: t,
      velocity: n = 0,
      power: r = 0.8,
      timeConstant: i = 325,
      bounceDamping: o = 10,
      bounceStiffness: a = 500,
      modifyTarget: s,
      min: l,
      max: u,
      restDelta: c = 0.5,
      restSpeed: d,
    } = e;
    const h = t[0],
      f = { done: !1, value: h },
      p = (e) =>
        void 0 === l
          ? u
          : void 0 === u || Math.abs(l - e) < Math.abs(u - e)
            ? l
            : u;
    let m = r * n;
    const g = h + m,
      v = void 0 === s ? g : s(g);
    v !== g && (m = v - h);
    const y = (e) => -m * Math.exp(-e / i),
      A = (e) => v + y(e),
      b = (e) => {
        const t = y(e),
          n = A(e);
        (f.done = Math.abs(t) <= c), (f.value = f.done ? v : n);
      };
    let x, w;
    const S = (e) => {
      var t;
      ((t = f.value), (void 0 !== l && t < l) || (void 0 !== u && t > u)) &&
        ((x = e),
        (w = dp({
          keyframes: [f.value, p(f.value)],
          velocity: ep(A, e, f.value),
          damping: o,
          stiffness: a,
          restDelta: c,
          restSpeed: d,
        })));
    };
    return (
      S(0),
      {
        calculatedDuration: null,
        next: (e) => {
          let t = !1;
          return (
            w || void 0 !== x || ((t = !0), b(e), S(e)),
            void 0 !== x && e >= x ? w.next(e - x) : (!t && b(e), f)
          );
        },
      }
    );
  }
  const fp = Ah(0.42, 0, 1, 1),
    pp = Ah(0, 0, 0.58, 1),
    mp = Ah(0.42, 0, 0.58, 1),
    gp = (e) => Array.isArray(e) && 'number' === typeof e[0],
    vp = {
      linear: Ld,
      easeIn: fp,
      easeInOut: mp,
      easeOut: pp,
      circIn: Ph,
      circInOut: Th,
      circOut: Ch,
      backIn: Sh,
      backInOut: kh,
      backOut: wh,
      anticipate: Eh,
    },
    yp = (e) => {
      if (gp(e)) {
        Nd(
          4 === e.length,
          'Cubic bezier arrays must contain four numerical values.'
        );
        const [t, n, r, i] = e;
        return Ah(t, n, r, i);
      }
      return 'string' === typeof e
        ? (Nd(void 0 !== vp[e], "Invalid easing type '".concat(e, "'")), vp[e])
        : e;
    },
    Ap = (e, t) => (n) => t(e(n)),
    bp = function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return t.reduce(Ap);
    },
    xp = (e, t, n) => e + (t - e) * n;
  function wp(e, t, n) {
    return (
      n < 0 && (n += 1),
      n > 1 && (n -= 1),
      n < 1 / 6
        ? e + 6 * (t - e) * n
        : n < 0.5
          ? t
          : n < 2 / 3
            ? e + (t - e) * (2 / 3 - n) * 6
            : e
    );
  }
  function Sp(e, t) {
    return (n) => (n > 0 ? t : e);
  }
  const kp = (e, t, n) => {
      const r = e * e,
        i = n * (t * t - r) + r;
      return i < 0 ? 0 : Math.sqrt(i);
    },
    Ep = [Af, yf, bf];
  function Pp(e) {
    const t = ((n = e), Ep.find((e) => e.test(n)));
    var n;
    if (
      (zd(
        Boolean(t),
        "'".concat(
          e,
          "' is not an animatable color. Use the equivalent color code instead."
        )
      ),
      !Boolean(t))
    )
      return !1;
    let r = t.parse(e);
    return (
      t === bf &&
        (r = (function (e) {
          let { hue: t, saturation: n, lightness: r, alpha: i } = e;
          (t /= 360), (n /= 100), (r /= 100);
          let o = 0,
            a = 0,
            s = 0;
          if (n) {
            const e = r < 0.5 ? r * (1 + n) : r + n - r * n,
              i = 2 * r - e;
            (o = wp(i, e, t + 1 / 3)),
              (a = wp(i, e, t)),
              (s = wp(i, e, t - 1 / 3));
          } else o = a = s = r;
          return {
            red: Math.round(255 * o),
            green: Math.round(255 * a),
            blue: Math.round(255 * s),
            alpha: i,
          };
        })(r)),
      r
    );
  }
  const Cp = (e, t) => {
      const n = Pp(e),
        r = Pp(t);
      if (!n || !r) return Sp(e, t);
      const i = u({}, n);
      return (e) => (
        (i.red = kp(n.red, r.red, e)),
        (i.green = kp(n.green, r.green, e)),
        (i.blue = kp(n.blue, r.blue, e)),
        (i.alpha = xp(n.alpha, r.alpha, e)),
        yf.transform(i)
      );
    },
    Tp = new Set(['none', 'hidden']);
  function Fp(e, t) {
    return (n) => xp(e, t, n);
  }
  function Dp(e) {
    return 'number' === typeof e
      ? Fp
      : 'string' === typeof e
        ? Lh(e)
          ? Sp
          : xf.test(e)
            ? Cp
            : jp
        : Array.isArray(e)
          ? Mp
          : 'object' === typeof e
            ? xf.test(e)
              ? Cp
              : Rp
            : Sp;
  }
  function Mp(e, t) {
    const n = [...e],
      r = n.length,
      i = e.map((e, n) => Dp(e)(e, t[n]));
    return (e) => {
      for (let t = 0; t < r; t++) n[t] = i[t](e);
      return n;
    };
  }
  function Rp(e, t) {
    const n = u(u({}, e), t),
      r = {};
    for (const i in n)
      void 0 !== e[i] && void 0 !== t[i] && (r[i] = Dp(e[i])(e[i], t[i]));
    return (e) => {
      for (const t in r) n[t] = r[t](e);
      return n;
    };
  }
  const jp = (e, t) => {
    const n = Df.createTransformer(t),
      r = Pf(e),
      i = Pf(t);
    return r.indexes.var.length === i.indexes.var.length &&
      r.indexes.color.length === i.indexes.color.length &&
      r.indexes.number.length >= i.indexes.number.length
      ? (Tp.has(e) && !i.values.length) || (Tp.has(t) && !r.values.length)
        ? (function (e, t) {
            return Tp.has(e)
              ? (n) => (n <= 0 ? e : t)
              : (n) => (n >= 1 ? t : e);
          })(e, t)
        : bp(
            Mp(
              (function (e, t) {
                var n;
                const r = [],
                  i = { color: 0, var: 0, number: 0 };
                for (let o = 0; o < t.values.length; o++) {
                  const a = t.types[o],
                    s = e.indexes[a][i[a]],
                    l = null !== (n = e.values[s]) && void 0 !== n ? n : 0;
                  (r[o] = l), i[a]++;
                }
                return r;
              })(r, i),
              i.values
            ),
            n
          )
      : (zd(
          !0,
          "Complex values '"
            .concat(e, "' and '")
            .concat(
              t,
              "' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition."
            )
        ),
        Sp(e, t));
  };
  function Lp(e, t, n) {
    if ('number' === typeof e && 'number' === typeof t && 'number' === typeof n)
      return xp(e, t, n);
    return Dp(e)(e, t);
  }
  function zp(e, t) {
    let {
      clamp: n = !0,
      ease: r,
      mixer: i,
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const o = e.length;
    if (
      (Nd(
        o === t.length,
        'Both input and output ranges must be the same length'
      ),
      1 === o)
    )
      return () => t[0];
    if (2 === o && e[0] === e[1]) return () => t[1];
    e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
    const a = (function (e, t, n) {
        const r = [],
          i = n || Lp,
          o = e.length - 1;
        for (let a = 0; a < o; a++) {
          let n = i(e[a], e[a + 1]);
          if (t) {
            const e = Array.isArray(t) ? t[a] || Ld : t;
            n = bp(e, n);
          }
          r.push(n);
        }
        return r;
      })(t, r, i),
      s = a.length,
      l = (t) => {
        let n = 0;
        if (s > 1) for (; n < e.length - 2 && !(t < e[n + 1]); n++);
        const r = Kf(e[n], e[n + 1], t);
        return a[n](r);
      };
    return n ? (t) => l(Vh(e[0], e[o - 1], t)) : l;
  }
  function Np(e) {
    const t = [0];
    return (
      (function (e, t) {
        const n = e[e.length - 1];
        for (let r = 1; r <= t; r++) {
          const i = Kf(0, t, r);
          e.push(xp(n, 1, i));
        }
      })(t, e.length - 1),
      t
    );
  }
  function Bp(e) {
    let {
      duration: t = 300,
      keyframes: n,
      times: r,
      ease: i = 'easeInOut',
    } = e;
    const o = ((e) => Array.isArray(e) && 'number' !== typeof e[0])(i)
        ? i.map(yp)
        : yp(i),
      a = { done: !1, value: n[0] },
      s = (function (e, t) {
        return e.map((e) => e * t);
      })(r && r.length === n.length ? r : Np(n), t),
      l = zp(s, n, {
        ease: Array.isArray(o)
          ? o
          : ((u = n), (c = o), u.map(() => c || mp).splice(0, u.length - 1)),
      });
    var u, c;
    return {
      calculatedDuration: t,
      next: (e) => ((a.value = l(e)), (a.done = e >= t), a),
    };
  }
  const Vp = (e) => {
      const t = (t) => {
        let { timestamp: n } = t;
        return e(n);
      };
      return {
        start: () => ph.update(t, !0),
        stop: () => mh(t),
        now: () => (gh.isProcessing ? gh.timestamp : Yf.now()),
      };
    },
    Op = { decay: hp, inertia: hp, tween: Bp, keyframes: Bp, spring: dp },
    Ip = (e) => e / 100;
  class Up extends Gf {
    constructor(e) {
      super(e),
        (this.holdTime = null),
        (this.cancelTime = null),
        (this.currentTime = 0),
        (this.playbackSpeed = 1),
        (this.pendingPlayState = 'running'),
        (this.startTime = null),
        (this.state = 'idle'),
        (this.stop = () => {
          if (
            (this.resolver.cancel(),
            (this.isStopped = !0),
            'idle' === this.state)
          )
            return;
          this.teardown();
          const { onStop: e } = this.options;
          e && e();
        });
      const {
          name: t,
          motionValue: n,
          element: r,
          keyframes: i,
        } = this.options,
        o = (null === r || void 0 === r ? void 0 : r.KeyframeResolver) || df;
      (this.resolver = new o(
        i,
        (e, t) => this.onKeyframesResolved(e, t),
        t,
        n,
        r
      )),
        this.resolver.scheduleResolve();
    }
    flatten() {
      super.flatten(),
        this._resolved &&
          Object.assign(
            this._resolved,
            this.initPlayback(this._resolved.keyframes)
          );
    }
    initPlayback(e) {
      const {
          type: t = 'keyframes',
          repeat: n = 0,
          repeatDelay: r = 0,
          repeatType: i,
          velocity: o = 0,
        } = this.options,
        a = Wf(t) ? t : Op[t] || Bp;
      let s, l;
      a !== Bp &&
        'number' !== typeof e[0] &&
        ((s = bp(Ip, Lp(e[0], e[1]))), (e = [0, 100]));
      const c = a(u(u({}, this.options), {}, { keyframes: e }));
      'mirror' === i &&
        (l = a(
          u(
            u({}, this.options),
            {},
            { keyframes: [...e].reverse(), velocity: -o }
          )
        )),
        null === c.calculatedDuration && (c.calculatedDuration = sp(c));
      const { calculatedDuration: d } = c,
        h = d + r;
      return {
        generator: c,
        mirroredGenerator: l,
        mapPercentToKeyframes: s,
        calculatedDuration: d,
        resolvedDuration: h,
        totalDuration: h * (n + 1) - r,
      };
    }
    onPostResolved() {
      const { autoplay: e = !0 } = this.options;
      this.play(),
        'paused' !== this.pendingPlayState && e
          ? (this.state = this.pendingPlayState)
          : this.pause();
    }
    tick(e) {
      let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      const { resolved: n } = this;
      if (!n) {
        const { keyframes: e } = this.options;
        return { done: !0, value: e[e.length - 1] };
      }
      const {
        finalKeyframe: r,
        generator: i,
        mirroredGenerator: o,
        mapPercentToKeyframes: a,
        keyframes: s,
        calculatedDuration: l,
        totalDuration: u,
        resolvedDuration: c,
      } = n;
      if (null === this.startTime) return i.next(0);
      const {
        delay: d,
        repeat: h,
        repeatType: f,
        repeatDelay: p,
        onUpdate: m,
      } = this.options;
      this.speed > 0
        ? (this.startTime = Math.min(this.startTime, e))
        : this.speed < 0 &&
          (this.startTime = Math.min(e - u / this.speed, this.startTime)),
        t
          ? (this.currentTime = e)
          : null !== this.holdTime
            ? (this.currentTime = this.holdTime)
            : (this.currentTime = Math.round(e - this.startTime) * this.speed);
      const g = this.currentTime - d * (this.speed >= 0 ? 1 : -1),
        v = this.speed >= 0 ? g < 0 : g > u;
      (this.currentTime = Math.max(g, 0)),
        'finished' === this.state &&
          null === this.holdTime &&
          (this.currentTime = u);
      let y = this.currentTime,
        A = i;
      if (h) {
        const e = Math.min(this.currentTime, u) / c;
        let t = Math.floor(e),
          n = e % 1;
        !n && e >= 1 && (n = 1), 1 === n && t--, (t = Math.min(t, h + 1));
        Boolean(t % 2) &&
          ('reverse' === f
            ? ((n = 1 - n), p && (n -= p / c))
            : 'mirror' === f && (A = o)),
          (y = Vh(0, 1, n) * c);
      }
      const b = v ? { done: !1, value: s[0] } : A.next(y);
      a && (b.value = a(b.value));
      let { done: x } = b;
      v ||
        null === l ||
        (x = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
      const w =
        null === this.holdTime &&
        ('finished' === this.state || ('running' === this.state && x));
      return (
        w && void 0 !== r && (b.value = dh(s, this.options, r)),
        m && m(b.value),
        w && this.finish(),
        b
      );
    }
    get duration() {
      const { resolved: e } = this;
      return e ? th(e.calculatedDuration) : 0;
    }
    get time() {
      return th(this.currentTime);
    }
    set time(e) {
      (e = eh(e)),
        (this.currentTime = e),
        null !== this.holdTime || 0 === this.speed
          ? (this.holdTime = e)
          : this.driver &&
            (this.startTime = this.driver.now() - e / this.speed);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(e) {
      const t = this.playbackSpeed !== e;
      (this.playbackSpeed = e), t && (this.time = th(this.currentTime));
    }
    play() {
      if (
        (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
      )
        return void (this.pendingPlayState = 'running');
      if (this.isStopped) return;
      const { driver: e = Vp, onPlay: t, startTime: n } = this.options;
      this.driver || (this.driver = e((e) => this.tick(e))), t && t();
      const r = this.driver.now();
      null !== this.holdTime
        ? (this.startTime = r - this.holdTime)
        : this.startTime
          ? 'finished' === this.state && (this.startTime = r)
          : (this.startTime =
              null !== n && void 0 !== n ? n : this.calcStartTime()),
        'finished' === this.state && this.updateFinishedPromise(),
        (this.cancelTime = this.startTime),
        (this.holdTime = null),
        (this.state = 'running'),
        this.driver.start();
    }
    pause() {
      var e;
      this._resolved
        ? ((this.state = 'paused'),
          (this.holdTime =
            null !== (e = this.currentTime) && void 0 !== e ? e : 0))
        : (this.pendingPlayState = 'paused');
    }
    complete() {
      'running' !== this.state && this.play(),
        (this.pendingPlayState = this.state = 'finished'),
        (this.holdTime = null);
    }
    finish() {
      this.teardown(), (this.state = 'finished');
      const { onComplete: e } = this.options;
      e && e();
    }
    cancel() {
      null !== this.cancelTime && this.tick(this.cancelTime),
        this.teardown(),
        this.updateFinishedPromise();
    }
    teardown() {
      (this.state = 'idle'),
        this.stopDriver(),
        this.resolveFinishedPromise(),
        this.updateFinishedPromise(),
        (this.startTime = this.cancelTime = null),
        this.resolver.cancel();
    }
    stopDriver() {
      this.driver && (this.driver.stop(), (this.driver = void 0));
    }
    sample(e) {
      return (this.startTime = 0), this.tick(e, !0);
    }
  }
  const Zp = new Set(['opacity', 'clipPath', 'filter', 'transform']);
  function _p(e) {
    let t;
    return () => (void 0 === t && (t = e()), t);
  }
  const Wp = { linearEasing: void 0 };
  function Hp(e, t) {
    const n = _p(e);
    return () => {
      var e;
      return null !== (e = Wp[t]) && void 0 !== e ? e : n();
    };
  }
  const Jp = Hp(() => {
    try {
      document
        .createElement('div')
        .animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
    } catch (Zb) {
      return !1;
    }
    return !0;
  }, 'linearEasing');
  function Yp(e) {
    return Boolean(
      ('function' === typeof e && Jp()) ||
        !e ||
        ('string' === typeof e && (e in Qp || Jp())) ||
        gp(e) ||
        (Array.isArray(e) && e.every(Yp))
    );
  }
  const Xp = (e) => {
      let [t, n, r, i] = e;
      return 'cubic-bezier('
        .concat(t, ', ')
        .concat(n, ', ')
        .concat(r, ', ')
        .concat(i, ')');
    },
    Qp = {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      circIn: Xp([0, 0.65, 0.55, 1]),
      circOut: Xp([0.55, 0, 1, 0.45]),
      backIn: Xp([0.31, 0.01, 0.66, -0.59]),
      backOut: Xp([0.33, 1.53, 0.69, 0.99]),
    };
  function Gp(e, t) {
    return e
      ? 'function' === typeof e && Jp()
        ? qf(e, t)
        : gp(e)
          ? Xp(e)
          : Array.isArray(e)
            ? e.map((e) => Gp(e, t) || Qp.easeOut)
            : Qp[e]
      : void 0;
  }
  function Kp(e, t, n) {
    let {
      delay: r = 0,
      duration: i = 300,
      repeat: o = 0,
      repeatType: a = 'loop',
      ease: s = 'easeInOut',
      times: l,
    } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const u = { [t]: n };
    l && (u.offset = l);
    const c = Gp(s, i);
    return (
      Array.isArray(c) && (u.easing = c),
      e.animate(u, {
        delay: r,
        duration: i,
        easing: Array.isArray(c) ? 'linear' : c,
        fill: 'both',
        iterations: o + 1,
        direction: 'reverse' === a ? 'alternate' : 'normal',
      })
    );
  }
  function qp(e, t) {
    (e.timeline = t), (e.onfinish = null);
  }
  const $p = _p(() => Object.hasOwnProperty.call(Element.prototype, 'animate')),
    em = ['onComplete', 'onUpdate', 'motionValue', 'element'],
    tm = ['motionValue', 'onUpdate', 'onComplete', 'element'];
  const nm = { anticipate: Eh, backInOut: kh, circInOut: Th };
  class rm extends Gf {
    constructor(e) {
      super(e);
      const {
        name: t,
        motionValue: n,
        element: r,
        keyframes: i,
      } = this.options;
      (this.resolver = new _f(
        i,
        (e, t) => this.onKeyframesResolved(e, t),
        t,
        n,
        r
      )),
        this.resolver.scheduleResolve();
    }
    initPlayback(e, t) {
      var n;
      let {
        duration: r = 300,
        times: i,
        ease: o,
        type: a,
        motionValue: s,
        name: l,
        startTime: d,
      } = this.options;
      if (!(null === (n = s.owner) || void 0 === n ? void 0 : n.current))
        return !1;
      var h;
      if (
        ('string' === typeof o && Jp() && o in nm && (o = nm[o]),
        Wf((h = this.options).type) || 'spring' === h.type || !Yp(h.ease))
      ) {
        const t = this.options,
          { onComplete: n, onUpdate: s, motionValue: l, element: d } = t,
          h = c(t, em),
          f = (function (e, t) {
            const n = new Up(
              u(
                u({}, t),
                {},
                { keyframes: e, repeat: 0, delay: 0, isGenerator: !0 }
              )
            );
            let r = { done: !1, value: e[0] };
            const i = [];
            let o = 0;
            for (; !r.done && o < 2e4; )
              (r = n.sample(o)), i.push(r.value), (o += 10);
            return {
              times: void 0,
              keyframes: i,
              duration: o - 10,
              ease: 'linear',
            };
          })(e, h);
        1 === (e = f.keyframes).length && (e[1] = e[0]),
          (r = f.duration),
          (i = f.times),
          (o = f.ease),
          (a = 'keyframes');
      }
      const f = Kp(
        s.owner.current,
        l,
        e,
        u(u({}, this.options), {}, { duration: r, times: i, ease: o })
      );
      return (
        (f.startTime = null !== d && void 0 !== d ? d : this.calcStartTime()),
        this.pendingTimeline
          ? (qp(f, this.pendingTimeline), (this.pendingTimeline = void 0))
          : (f.onfinish = () => {
              const { onComplete: n } = this.options;
              s.set(dh(e, this.options, t)),
                n && n(),
                this.cancel(),
                this.resolveFinishedPromise();
            }),
        { animation: f, duration: r, times: i, type: a, ease: o, keyframes: e }
      );
    }
    get duration() {
      const { resolved: e } = this;
      if (!e) return 0;
      const { duration: t } = e;
      return th(t);
    }
    get time() {
      const { resolved: e } = this;
      if (!e) return 0;
      const { animation: t } = e;
      return th(t.currentTime || 0);
    }
    set time(e) {
      const { resolved: t } = this;
      if (!t) return;
      const { animation: n } = t;
      n.currentTime = eh(e);
    }
    get speed() {
      const { resolved: e } = this;
      if (!e) return 1;
      const { animation: t } = e;
      return t.playbackRate;
    }
    set speed(e) {
      const { resolved: t } = this;
      if (!t) return;
      const { animation: n } = t;
      n.playbackRate = e;
    }
    get state() {
      const { resolved: e } = this;
      if (!e) return 'idle';
      const { animation: t } = e;
      return t.playState;
    }
    get startTime() {
      const { resolved: e } = this;
      if (!e) return null;
      const { animation: t } = e;
      return t.startTime;
    }
    attachTimeline(e) {
      if (this._resolved) {
        const { resolved: t } = this;
        if (!t) return Ld;
        const { animation: n } = t;
        qp(n, e);
      } else this.pendingTimeline = e;
      return Ld;
    }
    play() {
      if (this.isStopped) return;
      const { resolved: e } = this;
      if (!e) return;
      const { animation: t } = e;
      'finished' === t.playState && this.updateFinishedPromise(), t.play();
    }
    pause() {
      const { resolved: e } = this;
      if (!e) return;
      const { animation: t } = e;
      t.pause();
    }
    stop() {
      if (
        (this.resolver.cancel(), (this.isStopped = !0), 'idle' === this.state)
      )
        return;
      this.resolveFinishedPromise(), this.updateFinishedPromise();
      const { resolved: e } = this;
      if (!e) return;
      const {
        animation: t,
        keyframes: n,
        duration: r,
        type: i,
        ease: o,
        times: a,
      } = e;
      if ('idle' === t.playState || 'finished' === t.playState) return;
      if (this.time) {
        const e = this.options,
          { motionValue: t, onUpdate: s, onComplete: l, element: d } = e,
          h = c(e, tm),
          f = new Up(
            u(
              u({}, h),
              {},
              {
                keyframes: n,
                duration: r,
                type: i,
                ease: o,
                times: a,
                isGenerator: !0,
              }
            )
          ),
          p = eh(this.time);
        t.setWithVelocity(f.sample(p - 10).value, f.sample(p).value, 10);
      }
      const { onStop: s } = this.options;
      s && s(), this.cancel();
    }
    complete() {
      const { resolved: e } = this;
      e && e.animation.finish();
    }
    cancel() {
      const { resolved: e } = this;
      e && e.animation.cancel();
    }
    static supports(e) {
      const {
        motionValue: t,
        name: n,
        repeatDelay: r,
        repeatType: i,
        damping: o,
        type: a,
      } = e;
      return (
        $p() &&
        n &&
        Zp.has(n) &&
        t &&
        t.owner &&
        t.owner.current instanceof HTMLElement &&
        !t.owner.getProps().onUpdate &&
        !r &&
        'mirror' !== i &&
        0 !== o &&
        'inertia' !== a
      );
    }
  }
  const im = _p(() => void 0 !== window.ScrollTimeline);
  class om {
    constructor(e) {
      (this.stop = () => this.runAll('stop')),
        (this.animations = e.filter(Boolean));
    }
    then(e, t) {
      return Promise.all(this.animations).then(e).catch(t);
    }
    getAll(e) {
      return this.animations[0][e];
    }
    setAll(e, t) {
      for (let n = 0; n < this.animations.length; n++)
        this.animations[n][e] = t;
    }
    attachTimeline(e, t) {
      const n = this.animations.map((n) =>
        im() && n.attachTimeline ? n.attachTimeline(e) : t(n)
      );
      return () => {
        n.forEach((e, t) => {
          e && e(), this.animations[t].stop();
        });
      };
    }
    get time() {
      return this.getAll('time');
    }
    set time(e) {
      this.setAll('time', e);
    }
    get speed() {
      return this.getAll('speed');
    }
    set speed(e) {
      this.setAll('speed', e);
    }
    get startTime() {
      return this.getAll('startTime');
    }
    get duration() {
      let e = 0;
      for (let t = 0; t < this.animations.length; t++)
        e = Math.max(e, this.animations[t].duration);
      return e;
    }
    runAll(e) {
      this.animations.forEach((t) => t[e]());
    }
    flatten() {
      this.runAll('flatten');
    }
    play() {
      this.runAll('play');
    }
    pause() {
      this.runAll('pause');
    }
    cancel() {
      this.runAll('cancel');
    }
    complete() {
      this.runAll('complete');
    }
  }
  const am = [
    'when',
    'delay',
    'delayChildren',
    'staggerChildren',
    'staggerDirection',
    'repeat',
    'repeatType',
    'repeatDelay',
    'from',
    'elapsed',
  ];
  const sm = function (e, t, n) {
    let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
      i = arguments.length > 4 ? arguments[4] : void 0,
      o = arguments.length > 5 ? arguments[5] : void 0;
    return (a) => {
      const s = ah(r, e) || {},
        l = s.delay || r.delay || 0;
      let { elapsed: d = 0 } = r;
      d -= eh(l);
      let h = u(
        u(
          {
            keyframes: Array.isArray(n) ? n : [null, n],
            ease: 'easeOut',
            velocity: t.getVelocity(),
          },
          s
        ),
        {},
        {
          delay: -d,
          onUpdate: (e) => {
            t.set(e), s.onUpdate && s.onUpdate(e);
          },
          onComplete: () => {
            a(), s.onComplete && s.onComplete();
          },
          name: e,
          motionValue: t,
          element: o ? void 0 : i,
        }
      );
      (function (e) {
        let {
            when: t,
            delay: n,
            delayChildren: r,
            staggerChildren: i,
            staggerDirection: o,
            repeat: a,
            repeatType: s,
            repeatDelay: l,
            from: u,
            elapsed: d,
          } = e,
          h = c(e, am);
        return !!Object.keys(h).length;
      })(s) || (h = u(u({}, h), oh(e, h))),
        h.duration && (h.duration = eh(h.duration)),
        h.repeatDelay && (h.repeatDelay = eh(h.repeatDelay)),
        void 0 !== h.from && (h.keyframes[0] = h.from);
      let f = !1;
      if (
        ((!1 === h.type || (0 === h.duration && !h.repeatDelay)) &&
          ((h.duration = 0), 0 === h.delay && (f = !0)),
        (uh || sh) && ((f = !0), (h.duration = 0), (h.delay = 0)),
        f && !o && void 0 !== t.get())
      ) {
        const e = dh(h.keyframes, s);
        if (void 0 !== e)
          return (
            ph.update(() => {
              h.onUpdate(e), h.onComplete();
            }),
            new om([])
          );
      }
      return !o && rm.supports(h) ? new rm(h) : new Up(h);
    };
  };
  function lm(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function um(e, t) {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  }
  class cm {
    constructor() {
      this.subscriptions = [];
    }
    add(e) {
      return lm(this.subscriptions, e), () => um(this.subscriptions, e);
    }
    notify(e, t, n) {
      const r = this.subscriptions.length;
      if (r)
        if (1 === r) this.subscriptions[0](e, t, n);
        else
          for (let i = 0; i < r; i++) {
            const r = this.subscriptions[i];
            r && r(e, t, n);
          }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  }
  const dm = { current: void 0 };
  class hm {
    constructor(e) {
      var t = this;
      let n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      (this.version = '11.15.0'),
        (this.canTrackVelocity = null),
        (this.events = {}),
        (this.updateAndNotify = function (e) {
          let n =
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          const r = Yf.now();
          t.updatedAt !== r && t.setPrevFrameValue(),
            (t.prev = t.current),
            t.setCurrent(e),
            t.current !== t.prev &&
              t.events.change &&
              t.events.change.notify(t.current),
            n &&
              t.events.renderRequest &&
              t.events.renderRequest.notify(t.current);
        }),
        (this.hasAnimated = !1),
        this.setCurrent(e),
        (this.owner = n.owner);
    }
    setCurrent(e) {
      var t;
      (this.current = e),
        (this.updatedAt = Yf.now()),
        null === this.canTrackVelocity &&
          void 0 !== e &&
          (this.canTrackVelocity = ((t = this.current), !isNaN(parseFloat(t))));
    }
    setPrevFrameValue() {
      let e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : this.current;
      (this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt);
    }
    onChange(e) {
      return this.on('change', e);
    }
    on(e, t) {
      this.events[e] || (this.events[e] = new cm());
      const n = this.events[e].add(t);
      return 'change' === e
        ? () => {
            n(),
              ph.read(() => {
                this.events.change.getSize() || this.stop();
              });
          }
        : n;
    }
    clearListeners() {
      for (const e in this.events) this.events[e].clear();
    }
    attach(e, t) {
      (this.passiveEffect = e), (this.stopPassiveEffect = t);
    }
    set(e) {
      let t =
        !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      t && this.passiveEffect
        ? this.passiveEffect(e, this.updateAndNotify)
        : this.updateAndNotify(e, t);
    }
    setWithVelocity(e, t, n) {
      this.set(t),
        (this.prev = void 0),
        (this.prevFrameValue = e),
        (this.prevUpdatedAt = this.updatedAt - n);
    }
    jump(e) {
      let t =
        !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      this.updateAndNotify(e),
        (this.prev = e),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        t && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect();
    }
    get() {
      return dm.current && dm.current.push(this), this.current;
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      const e = Yf.now();
      if (
        !this.canTrackVelocity ||
        void 0 === this.prevFrameValue ||
        e - this.updatedAt > 30
      )
        return 0;
      const t = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
      return $f(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
    }
    start(e) {
      return (
        this.stop(),
        new Promise((t) => {
          (this.hasAnimated = !0),
            (this.animation = e(t)),
            this.events.animationStart && this.events.animationStart.notify();
        }).then(() => {
          this.events.animationComplete &&
            this.events.animationComplete.notify(),
            this.clearAnimation();
        })
      );
    }
    stop() {
      this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation();
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    destroy() {
      this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect();
    }
  }
  function fm(e, t) {
    return new hm(e, t);
  }
  const pm = ['transitionEnd', 'transition'];
  function mm(e, t, n) {
    e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, fm(n));
  }
  const gm = (e) => e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
    vm = 'data-' + gm('framerAppearId');
  function ym(e) {
    return e.props[vm];
  }
  const Am = (e) => Boolean(e && e.getVelocity);
  function bm(e, t) {
    const n = e.getValue('willChange');
    if (((r = n), Boolean(Am(r) && r.add))) return n.add(t);
    var r;
  }
  const xm = ['transition', 'transitionEnd'];
  function wm(e, t) {
    let { protectedKeys: n, needsAnimating: r } = e;
    const i = n.hasOwnProperty(t) && !0 !== r[t];
    return (r[t] = !1), i;
  }
  function Sm(e, t) {
    let {
      delay: n = 0,
      transitionOverride: r,
      type: i,
    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var o;
    let { transition: a = e.getDefaultTransition(), transitionEnd: s } = t,
      l = c(t, xm);
    r && (a = r);
    const d = [],
      h = i && e.animationState && e.animationState.getState()[i];
    for (const c in l) {
      const t = e.getValue(
          c,
          null !== (o = e.latestValues[c]) && void 0 !== o ? o : null
        ),
        r = l[c];
      if (void 0 === r || (h && wm(h, c))) continue;
      const i = u({ delay: n }, ah(a || {}, c));
      let s = !1;
      if (window.MotionHandoffAnimation) {
        const t = ym(e);
        if (t) {
          const e = window.MotionHandoffAnimation(t, c, ph);
          null !== e && ((i.startTime = e), (s = !0));
        }
      }
      bm(e, c),
        t.start(
          sm(
            c,
            t,
            r,
            e.shouldReduceMotion && $d.has(c) ? { type: !1 } : i,
            e,
            s
          )
        );
      const f = t.animation;
      f && d.push(f);
    }
    return (
      s &&
        Promise.all(d).then(() => {
          ph.update(() => {
            s &&
              (function (e, t) {
                let n = Qd(e, t) || {},
                  { transitionEnd: r = {}, transition: i = {} } = n,
                  o = c(n, pm);
                o = u(u({}, o), r);
                for (const s in o)
                  mm(e, s, ((a = o[s]), Wd(a) ? a[a.length - 1] || 0 : a));
                var a;
              })(e, s);
          });
        }),
      d
    );
  }
  function km(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var r;
    const i = Qd(
      e,
      t,
      'exit' === n.type
        ? null === (r = e.presenceContext) || void 0 === r
          ? void 0
          : r.custom
        : void 0
    );
    let { transition: o = e.getDefaultTransition() || {} } = i || {};
    n.transitionOverride && (o = n.transitionOverride);
    const a = i ? () => Promise.all(Sm(e, i, n)) : () => Promise.resolve(),
      s =
        e.variantChildren && e.variantChildren.size
          ? function () {
              let r =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 0;
              const {
                delayChildren: i = 0,
                staggerChildren: a,
                staggerDirection: s,
              } = o;
              return (function (e, t) {
                let n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : 0,
                  r =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : 0,
                  i =
                    arguments.length > 4 && void 0 !== arguments[4]
                      ? arguments[4]
                      : 1,
                  o = arguments.length > 5 ? arguments[5] : void 0;
                const a = [],
                  s = (e.variantChildren.size - 1) * r,
                  l =
                    1 === i
                      ? function () {
                          return (
                            (arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : 0) * r
                          );
                        }
                      : function () {
                          return (
                            s -
                            (arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : 0) *
                              r
                          );
                        };
                return (
                  Array.from(e.variantChildren)
                    .sort(Em)
                    .forEach((e, r) => {
                      e.notify('AnimationStart', t),
                        a.push(
                          km(e, t, u(u({}, o), {}, { delay: n + l(r) })).then(
                            () => e.notify('AnimationComplete', t)
                          )
                        );
                    }),
                  Promise.all(a)
                );
              })(e, t, i + r, a, s, n);
            }
          : () => Promise.resolve(),
      { when: l } = o;
    if (l) {
      const [e, t] = 'beforeChildren' === l ? [a, s] : [s, a];
      return e().then(() => t());
    }
    return Promise.all([a(), s(n.delay)]);
  }
  function Em(e, t) {
    return e.sortNodePosition(t);
  }
  const Pm = Kd.length;
  function Cm(e) {
    if (!e) return;
    if (!e.isControllingVariants) {
      const t = (e.parent && Cm(e.parent)) || {};
      return void 0 !== e.props.initial && (t.initial = e.props.initial), t;
    }
    const t = {};
    for (let n = 0; n < Pm; n++) {
      const r = Kd[n],
        i = e.props[r];
      (Jd(i) || !1 === i) && (t[r] = i);
    }
    return t;
  }
  const Tm = ['transition', 'transitionEnd'],
    Fm = [...Gd].reverse(),
    Dm = Gd.length;
  function Mm(e) {
    return (t) =>
      Promise.all(
        t.map((t) => {
          let { animation: n, options: r } = t;
          return (function (e, t) {
            let n,
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {};
            if ((e.notify('AnimationStart', t), Array.isArray(t))) {
              const i = t.map((t) => km(e, t, r));
              n = Promise.all(i);
            } else if ('string' === typeof t) n = km(e, t, r);
            else {
              const i = 'function' === typeof t ? Qd(e, t, r.custom) : t;
              n = Promise.all(Sm(e, i, r));
            }
            return n.then(() => {
              e.notify('AnimationComplete', t);
            });
          })(e, n, r);
        })
      );
  }
  function Rm(e) {
    let t = Mm(e),
      n = zm(),
      r = !0;
    const i = (t) => (n, r) => {
      var i;
      const o = Qd(
        e,
        r,
        'exit' === t
          ? null === (i = e.presenceContext) || void 0 === i
            ? void 0
            : i.custom
          : void 0
      );
      if (o) {
        const { transition: e, transitionEnd: t } = o,
          r = c(o, Tm);
        n = u(u(u({}, n), r), t);
      }
      return n;
    };
    function o(o) {
      const { props: a } = e,
        s = Cm(e.parent) || {},
        l = [],
        c = new Set();
      let d = {},
        h = 1 / 0;
      for (let t = 0; t < Dm; t++) {
        const f = Fm[t],
          p = n[f],
          m = void 0 !== a[f] ? a[f] : s[f],
          g = Jd(m),
          v = f === o ? p.isActive : null;
        !1 === v && (h = t);
        let y = m === s[f] && m !== a[f] && g;
        if (
          (y && r && e.manuallyAnimateOnMount && (y = !1),
          (p.protectedKeys = u({}, d)),
          (!p.isActive && null === v) ||
            (!m && !p.prevProp) ||
            _d(m) ||
            'boolean' === typeof m)
        )
          continue;
        const A = jm(p.prevProp, m);
        let b = A || (f === o && p.isActive && !y && g) || (t > h && g),
          x = !1;
        const w = Array.isArray(m) ? m : [m];
        let S = w.reduce(i(f), {});
        !1 === v && (S = {});
        const { prevResolvedValues: k = {} } = p,
          E = u(u({}, k), S),
          P = (t) => {
            (b = !0),
              c.has(t) && ((x = !0), c.delete(t)),
              (p.needsAnimating[t] = !0);
            const n = e.getValue(t);
            n && (n.liveStyle = !1);
          };
        for (const e in E) {
          const t = S[e],
            n = k[e];
          if (d.hasOwnProperty(e)) continue;
          let r = !1;
          (r = Wd(t) && Wd(n) ? !Hd(t, n) : t !== n),
            r
              ? void 0 !== t && null !== t
                ? P(e)
                : c.add(e)
              : void 0 !== t && c.has(e)
                ? P(e)
                : (p.protectedKeys[e] = !0);
        }
        (p.prevProp = m),
          (p.prevResolvedValues = S),
          p.isActive && (d = u(u({}, d), S)),
          r && e.blockInitialAnimation && (b = !1);
        b &&
          (!(y && A) || x) &&
          l.push(...w.map((e) => ({ animation: e, options: { type: f } })));
      }
      if (c.size) {
        const t = {};
        c.forEach((n) => {
          const r = e.getBaseTarget(n),
            i = e.getValue(n);
          i && (i.liveStyle = !0),
            (t[n] = null !== r && void 0 !== r ? r : null);
        }),
          l.push({ animation: t });
      }
      let f = Boolean(l.length);
      return (
        !r ||
          (!1 !== a.initial && a.initial !== a.animate) ||
          e.manuallyAnimateOnMount ||
          (f = !1),
        (r = !1),
        f ? t(l) : Promise.resolve()
      );
    }
    return {
      animateChanges: o,
      setActive: function (t, r) {
        var i;
        if (n[t].isActive === r) return Promise.resolve();
        null === (i = e.variantChildren) ||
          void 0 === i ||
          i.forEach((e) => {
            var n;
            return null === (n = e.animationState) || void 0 === n
              ? void 0
              : n.setActive(t, r);
          }),
          (n[t].isActive = r);
        const a = o(t);
        for (const e in n) n[e].protectedKeys = {};
        return a;
      },
      setAnimateFunction: function (n) {
        t = n(e);
      },
      getState: () => n,
      reset: () => {
        (n = zm()), (r = !0);
      },
    };
  }
  function jm(e, t) {
    return 'string' === typeof t ? t !== e : !!Array.isArray(t) && !Hd(t, e);
  }
  function Lm() {
    return {
      isActive: arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
      protectedKeys: {},
      needsAnimating: {},
      prevResolvedValues: {},
    };
  }
  function zm() {
    return {
      animate: Lm(!0),
      whileInView: Lm(),
      whileHover: Lm(),
      whileTap: Lm(),
      whileDrag: Lm(),
      whileFocus: Lm(),
      exit: Lm(),
    };
  }
  class Nm {
    constructor(e) {
      (this.isMounted = !1), (this.node = e);
    }
    update() {}
  }
  let Bm = 0;
  const Vm = {
      animation: {
        Feature: class extends Nm {
          constructor(e) {
            super(e), e.animationState || (e.animationState = Rm(e));
          }
          updateAnimationControlsSubscription() {
            const { animate: e } = this.node.getProps();
            _d(e) && (this.unmountControls = e.subscribe(this.node));
          }
          mount() {
            this.updateAnimationControlsSubscription();
          }
          update() {
            const { animate: e } = this.node.getProps(),
              { animate: t } = this.node.prevProps || {};
            e !== t && this.updateAnimationControlsSubscription();
          }
          unmount() {
            var e;
            this.node.animationState.reset(),
              null === (e = this.unmountControls) ||
                void 0 === e ||
                e.call(this);
          }
        },
      },
      exit: {
        Feature: class extends Nm {
          constructor() {
            super(...arguments), (this.id = Bm++);
          }
          update() {
            if (!this.node.presenceContext) return;
            const { isPresent: e, onExitComplete: t } =
                this.node.presenceContext,
              { isPresent: n } = this.node.prevPresenceContext || {};
            if (!this.node.animationState || e === n) return;
            const r = this.node.animationState.setActive('exit', !e);
            t && !e && r.then(() => t(this.id));
          }
          mount() {
            const { register: e } = this.node.presenceContext || {};
            e && (this.unmount = e(this.id));
          }
          unmount() {}
        },
      },
    },
    Om = { x: !1, y: !1 };
  function Im() {
    return Om.x || Om.y;
  }
  function Um(e, t) {
    const n = (function (e, t, n) {
        var r;
        if (e instanceof Element) return [e];
        if ('string' === typeof e) {
          let i = document;
          t && (i = t.current);
          const o =
            null !== (r = null === n || void 0 === n ? void 0 : n[e]) &&
            void 0 !== r
              ? r
              : i.querySelectorAll(e);
          return o ? Array.from(o) : [];
        }
        return Array.from(e);
      })(e),
      r = new AbortController();
    return [
      n,
      u(u({ passive: !0 }, t), {}, { signal: r.signal }),
      () => r.abort(),
    ];
  }
  function Zm(e) {
    return (t) => {
      'touch' === t.pointerType || Im() || e(t);
    };
  }
  const _m = (e) =>
      'mouse' === e.pointerType
        ? 'number' !== typeof e.button || e.button <= 0
        : !1 !== e.isPrimary,
    Wm = new WeakSet();
  function Hm(e) {
    return (t) => {
      'Enter' === t.key && e(t);
    };
  }
  function Jm(e, t) {
    e.dispatchEvent(
      new PointerEvent('pointer' + t, { isPrimary: !0, bubbles: !0 })
    );
  }
  const Ym = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']);
  const Xm = (e, t) => !!t && (e === t || Xm(e, t.parentElement));
  function Qm(e) {
    return _m(e) && !Im();
  }
  function Gm(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const [r, i, o] = Um(e, n),
      a = (e) => {
        const r = e.currentTarget;
        if (!Qm(e) || Wm.has(r)) return;
        Wm.add(r);
        const o = t(e),
          a = (e, t) => {
            window.removeEventListener('pointerup', s),
              window.removeEventListener('pointercancel', l),
              Qm(e) && Wm.has(r) && (Wm.delete(r), o && o(e, { success: t }));
          },
          s = (e) => {
            a(e, n.useGlobalTarget || Xm(r, e.target));
          },
          l = (e) => {
            a(e, !1);
          };
        window.addEventListener('pointerup', s, i),
          window.addEventListener('pointercancel', l, i);
      };
    return (
      r.forEach((e) => {
        (function (e) {
          return Ym.has(e.tagName) || -1 !== e.tabIndex;
        })(e) || (e.tabIndex = 0);
        (n.useGlobalTarget ? window : e).addEventListener('pointerdown', a, i),
          e.addEventListener(
            'focus',
            (e) =>
              ((e, t) => {
                const n = e.currentTarget;
                if (!n) return;
                const r = Hm(() => {
                  if (Wm.has(n)) return;
                  Jm(n, 'down');
                  const e = Hm(() => {
                    Jm(n, 'up');
                  });
                  n.addEventListener('keyup', e, t),
                    n.addEventListener('blur', () => Jm(n, 'cancel'), t);
                });
                n.addEventListener('keydown', r, t),
                  n.addEventListener(
                    'blur',
                    () => n.removeEventListener('keydown', r),
                    t
                  );
              })(e, i),
            i
          );
      }),
      o
    );
  }
  function Km(e) {
    return { point: { x: e.pageX, y: e.pageY } };
  }
  function qm(e, t, n) {
    let r =
      arguments.length > 3 && void 0 !== arguments[3]
        ? arguments[3]
        : { passive: !0 };
    return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
  }
  function $m(e, t, n, r) {
    return qm(
      e,
      t,
      (
        (e) => (t) =>
          _m(t) && e(t, Km(t))
      )(n),
      r
    );
  }
  const eg = (e, t) => Math.abs(e - t);
  class tg {
    constructor(e, t) {
      let {
        transformPagePoint: n,
        contextWindow: r,
        dragSnapToOrigin: i = !1,
      } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      if (
        ((this.startEvent = null),
        (this.lastMoveEvent = null),
        (this.lastMoveEventInfo = null),
        (this.handlers = {}),
        (this.contextWindow = window),
        (this.updatePoint = () => {
          if (!this.lastMoveEvent || !this.lastMoveEventInfo) return;
          const e = ig(this.lastMoveEventInfo, this.history),
            t = null !== this.startEvent,
            n =
              (function (e, t) {
                const n = eg(e.x, t.x),
                  r = eg(e.y, t.y);
                return Math.sqrt(n ** 2 + r ** 2);
              })(e.offset, { x: 0, y: 0 }) >= 3;
          if (!t && !n) return;
          const { point: r } = e,
            { timestamp: i } = gh;
          this.history.push(u(u({}, r), {}, { timestamp: i }));
          const { onStart: o, onMove: a } = this.handlers;
          t ||
            (o && o(this.lastMoveEvent, e),
            (this.startEvent = this.lastMoveEvent)),
            a && a(this.lastMoveEvent, e);
        }),
        (this.handlePointerMove = (e, t) => {
          (this.lastMoveEvent = e),
            (this.lastMoveEventInfo = ng(t, this.transformPagePoint)),
            ph.update(this.updatePoint, !0);
        }),
        (this.handlePointerUp = (e, t) => {
          this.end();
          const {
            onEnd: n,
            onSessionEnd: r,
            resumeAnimation: i,
          } = this.handlers;
          if (
            (this.dragSnapToOrigin && i && i(),
            !this.lastMoveEvent || !this.lastMoveEventInfo)
          )
            return;
          const o = ig(
            'pointercancel' === e.type
              ? this.lastMoveEventInfo
              : ng(t, this.transformPagePoint),
            this.history
          );
          this.startEvent && n && n(e, o), r && r(e, o);
        }),
        !_m(e))
      )
        return;
      (this.dragSnapToOrigin = i),
        (this.handlers = t),
        (this.transformPagePoint = n),
        (this.contextWindow = r || window);
      const o = ng(Km(e), this.transformPagePoint),
        { point: a } = o,
        { timestamp: s } = gh;
      this.history = [u(u({}, a), {}, { timestamp: s })];
      const { onSessionStart: l } = t;
      l && l(e, ig(o, this.history)),
        (this.removeListeners = bp(
          $m(this.contextWindow, 'pointermove', this.handlePointerMove),
          $m(this.contextWindow, 'pointerup', this.handlePointerUp),
          $m(this.contextWindow, 'pointercancel', this.handlePointerUp)
        ));
    }
    updateHandlers(e) {
      this.handlers = e;
    }
    end() {
      this.removeListeners && this.removeListeners(), mh(this.updatePoint);
    }
  }
  function ng(e, t) {
    return t ? { point: t(e.point) } : e;
  }
  function rg(e, t) {
    return { x: e.x - t.x, y: e.y - t.y };
  }
  function ig(e, t) {
    let { point: n } = e;
    return {
      point: n,
      delta: rg(n, ag(t)),
      offset: rg(n, og(t)),
      velocity: sg(t, 0.1),
    };
  }
  function og(e) {
    return e[0];
  }
  function ag(e) {
    return e[e.length - 1];
  }
  function sg(e, t) {
    if (e.length < 2) return { x: 0, y: 0 };
    let n = e.length - 1,
      r = null;
    const i = ag(e);
    for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > eh(t))); ) n--;
    if (!r) return { x: 0, y: 0 };
    const o = th(i.timestamp - r.timestamp);
    if (0 === o) return { x: 0, y: 0 };
    const a = { x: (i.x - r.x) / o, y: (i.y - r.y) / o };
    return a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a;
  }
  function lg(e) {
    return (
      e &&
      'object' === typeof e &&
      Object.prototype.hasOwnProperty.call(e, 'current')
    );
  }
  function ug(e) {
    return e.max - e.min;
  }
  function cg(e, t, n) {
    let r =
      arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0.5;
    (e.origin = r),
      (e.originPoint = xp(t.min, t.max, e.origin)),
      (e.scale = ug(n) / ug(t)),
      (e.translate = xp(n.min, n.max, e.origin) - e.originPoint),
      ((e.scale >= 0.9999 && e.scale <= 1.0001) || isNaN(e.scale)) &&
        (e.scale = 1),
      ((e.translate >= -0.01 && e.translate <= 0.01) || isNaN(e.translate)) &&
        (e.translate = 0);
  }
  function dg(e, t, n, r) {
    cg(e.x, t.x, n.x, r ? r.originX : void 0),
      cg(e.y, t.y, n.y, r ? r.originY : void 0);
  }
  function hg(e, t, n) {
    (e.min = n.min + t.min), (e.max = e.min + ug(t));
  }
  function fg(e, t, n) {
    (e.min = t.min - n.min), (e.max = e.min + ug(t));
  }
  function pg(e, t, n) {
    fg(e.x, t.x, n.x), fg(e.y, t.y, n.y);
  }
  function mg(e, t, n) {
    return {
      min: void 0 !== t ? e.min + t : void 0,
      max: void 0 !== n ? e.max + n - (e.max - e.min) : void 0,
    };
  }
  function gg(e, t) {
    let n = t.min - e.min,
      r = t.max - e.max;
    return (
      t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r }
    );
  }
  const vg = 0.35;
  function yg(e, t, n) {
    return { min: Ag(e, t), max: Ag(e, n) };
  }
  function Ag(e, t) {
    return 'number' === typeof e ? e : e[t] || 0;
  }
  const bg = () => ({ x: { min: 0, max: 0 }, y: { min: 0, max: 0 } });
  function xg(e) {
    return [e('x'), e('y')];
  }
  function wg(e) {
    let { top: t, left: n, right: r, bottom: i } = e;
    return { x: { min: n, max: r }, y: { min: t, max: i } };
  }
  function Sg(e) {
    return void 0 === e || 1 === e;
  }
  function kg(e) {
    let { scale: t, scaleX: n, scaleY: r } = e;
    return !Sg(t) || !Sg(n) || !Sg(r);
  }
  function Eg(e) {
    return (
      kg(e) ||
      Pg(e) ||
      e.z ||
      e.rotate ||
      e.rotateX ||
      e.rotateY ||
      e.skewX ||
      e.skewY
    );
  }
  function Pg(e) {
    return Cg(e.x) || Cg(e.y);
  }
  function Cg(e) {
    return e && '0%' !== e;
  }
  function Tg(e, t, n) {
    return n + t * (e - n);
  }
  function Fg(e, t, n, r, i) {
    return void 0 !== i && (e = Tg(e, i, r)), Tg(e, n, r) + t;
  }
  function Dg(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
      r = arguments.length > 3 ? arguments[3] : void 0,
      i = arguments.length > 4 ? arguments[4] : void 0;
    (e.min = Fg(e.min, t, n, r, i)), (e.max = Fg(e.max, t, n, r, i));
  }
  function Mg(e, t) {
    let { x: n, y: r } = t;
    Dg(e.x, n.translate, n.scale, n.originPoint),
      Dg(e.y, r.translate, r.scale, r.originPoint);
  }
  const Rg = 0.999999999999,
    jg = 1.0000000000001;
  function Lg(e, t) {
    (e.min = e.min + t), (e.max = e.max + t);
  }
  function zg(e, t, n, r) {
    let i =
      arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0.5;
    Dg(e, t, n, xp(e.min, e.max, i), r);
  }
  function Ng(e, t) {
    zg(e.x, t.x, t.scaleX, t.scale, t.originX),
      zg(e.y, t.y, t.scaleY, t.scale, t.originY);
  }
  function Bg(e, t) {
    return wg(
      (function (e, t) {
        if (!t) return e;
        const n = t({ x: e.left, y: e.top }),
          r = t({ x: e.right, y: e.bottom });
        return { top: n.y, left: n.x, bottom: r.y, right: r.x };
      })(e.getBoundingClientRect(), t)
    );
  }
  const Vg = (e) => {
      let { current: t } = e;
      return t ? t.ownerDocument.defaultView : null;
    },
    Og = new WeakMap();
  class Ig {
    constructor(e) {
      (this.openDragLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
        (this.visualElement = e);
    }
    start(e) {
      let { snapToCursor: t = !1 } =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      const { presenceContext: n } = this.visualElement;
      if (n && !1 === n.isPresent) return;
      const { dragSnapToOrigin: r } = this.getProps();
      this.panSession = new tg(
        e,
        {
          onSessionStart: (e) => {
            const { dragSnapToOrigin: n } = this.getProps();
            n ? this.pauseAnimation() : this.stopAnimation(),
              t && this.snapToCursor(Km(e).point);
          },
          onStart: (e, t) => {
            const {
              drag: n,
              dragPropagation: r,
              onDragStart: i,
            } = this.getProps();
            if (
              n &&
              !r &&
              (this.openDragLock && this.openDragLock(),
              (this.openDragLock =
                'x' === (o = n) || 'y' === o
                  ? Om[o]
                    ? null
                    : ((Om[o] = !0),
                      () => {
                        Om[o] = !1;
                      })
                  : Om.x || Om.y
                    ? null
                    : ((Om.x = Om.y = !0),
                      () => {
                        Om.x = Om.y = !1;
                      })),
              !this.openDragLock)
            )
              return;
            var o;
            (this.isDragging = !0),
              (this.currentDirection = null),
              this.resolveConstraints(),
              this.visualElement.projection &&
                ((this.visualElement.projection.isAnimationBlocked = !0),
                (this.visualElement.projection.target = void 0)),
              xg((e) => {
                let t = this.getAxisMotionValue(e).get() || 0;
                if (Wh.test(t)) {
                  const { projection: n } = this.visualElement;
                  if (n && n.layout) {
                    const r = n.layout.layoutBox[e];
                    if (r) {
                      t = ug(r) * (parseFloat(t) / 100);
                    }
                  }
                }
                this.originPoint[e] = t;
              }),
              i && ph.postRender(() => i(e, t)),
              bm(this.visualElement, 'transform');
            const { animationState: a } = this.visualElement;
            a && a.setActive('whileDrag', !0);
          },
          onMove: (e, t) => {
            const {
              dragPropagation: n,
              dragDirectionLock: r,
              onDirectionLock: i,
              onDrag: o,
            } = this.getProps();
            if (!n && !this.openDragLock) return;
            const { offset: a } = t;
            if (r && null === this.currentDirection)
              return (
                (this.currentDirection = (function (e) {
                  let t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 10,
                    n = null;
                  Math.abs(e.y) > t
                    ? (n = 'y')
                    : Math.abs(e.x) > t && (n = 'x');
                  return n;
                })(a)),
                void (
                  null !== this.currentDirection &&
                  i &&
                  i(this.currentDirection)
                )
              );
            this.updateAxis('x', t.point, a),
              this.updateAxis('y', t.point, a),
              this.visualElement.render(),
              o && o(e, t);
          },
          onSessionEnd: (e, t) => this.stop(e, t),
          resumeAnimation: () =>
            xg((e) => {
              var t;
              return (
                'paused' === this.getAnimationState(e) &&
                (null === (t = this.getAxisMotionValue(e).animation) ||
                void 0 === t
                  ? void 0
                  : t.play())
              );
            }),
        },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: r,
          contextWindow: Vg(this.visualElement),
        }
      );
    }
    stop(e, t) {
      const n = this.isDragging;
      if ((this.cancel(), !n)) return;
      const { velocity: r } = t;
      this.startAnimation(r);
      const { onDragEnd: i } = this.getProps();
      i && ph.postRender(() => i(e, t));
    }
    cancel() {
      this.isDragging = !1;
      const { projection: e, animationState: t } = this.visualElement;
      e && (e.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        (this.panSession = void 0);
      const { dragPropagation: n } = this.getProps();
      !n &&
        this.openDragLock &&
        (this.openDragLock(), (this.openDragLock = null)),
        t && t.setActive('whileDrag', !1);
    }
    updateAxis(e, t, n) {
      const { drag: r } = this.getProps();
      if (!n || !Ug(e, r, this.currentDirection)) return;
      const i = this.getAxisMotionValue(e);
      let o = this.originPoint[e] + n[e];
      this.constraints &&
        this.constraints[e] &&
        (o = (function (e, t, n) {
          let { min: r, max: i } = t;
          return (
            void 0 !== r && e < r
              ? (e = n ? xp(r, e, n.min) : Math.max(e, r))
              : void 0 !== i &&
                e > i &&
                (e = n ? xp(i, e, n.max) : Math.min(e, i)),
            e
          );
        })(o, this.constraints[e], this.elastic[e])),
        i.set(o);
    }
    resolveConstraints() {
      var e;
      const { dragConstraints: t, dragElastic: n } = this.getProps(),
        r =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : null === (e = this.visualElement.projection) || void 0 === e
              ? void 0
              : e.layout,
        i = this.constraints;
      t && lg(t)
        ? this.constraints || (this.constraints = this.resolveRefConstraints())
        : (this.constraints =
            !(!t || !r) &&
            (function (e, t) {
              let { top: n, left: r, bottom: i, right: o } = t;
              return { x: mg(e.x, r, o), y: mg(e.y, n, i) };
            })(r.layoutBox, t)),
        (this.elastic = (function () {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : vg;
          return (
            !1 === e ? (e = 0) : !0 === e && (e = vg),
            { x: yg(e, 'left', 'right'), y: yg(e, 'top', 'bottom') }
          );
        })(n)),
        i !== this.constraints &&
          r &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          xg((e) => {
            !1 !== this.constraints &&
              this.getAxisMotionValue(e) &&
              (this.constraints[e] = (function (e, t) {
                const n = {};
                return (
                  void 0 !== t.min && (n.min = t.min - e.min),
                  void 0 !== t.max && (n.max = t.max - e.min),
                  n
                );
              })(r.layoutBox[e], this.constraints[e]));
          });
    }
    resolveRefConstraints() {
      const { dragConstraints: e, onMeasureDragConstraints: t } =
        this.getProps();
      if (!e || !lg(e)) return !1;
      const n = e.current;
      Nd(
        null !== n,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
      );
      const { projection: r } = this.visualElement;
      if (!r || !r.layout) return !1;
      const i = (function (e, t, n) {
        const r = Bg(e, n),
          { scroll: i } = t;
        return i && (Lg(r.x, i.offset.x), Lg(r.y, i.offset.y)), r;
      })(n, r.root, this.visualElement.getTransformPagePoint());
      let o = (function (e, t) {
        return { x: gg(e.x, t.x), y: gg(e.y, t.y) };
      })(r.layout.layoutBox, i);
      if (t) {
        const e = t(
          (function (e) {
            let { x: t, y: n } = e;
            return { top: n.min, right: t.max, bottom: n.max, left: t.min };
          })(o)
        );
        (this.hasMutatedConstraints = !!e), e && (o = wg(e));
      }
      return o;
    }
    startAnimation(e) {
      const {
          drag: t,
          dragMomentum: n,
          dragElastic: r,
          dragTransition: i,
          dragSnapToOrigin: o,
          onDragTransitionEnd: a,
        } = this.getProps(),
        s = this.constraints || {},
        l = xg((a) => {
          if (!Ug(a, t, this.currentDirection)) return;
          let l = (s && s[a]) || {};
          o && (l = { min: 0, max: 0 });
          const c = r ? 200 : 1e6,
            d = r ? 40 : 1e7,
            h = u(
              u(
                {
                  type: 'inertia',
                  velocity: n ? e[a] : 0,
                  bounceStiffness: c,
                  bounceDamping: d,
                  timeConstant: 750,
                  restDelta: 1,
                  restSpeed: 10,
                },
                i
              ),
              l
            );
          return this.startAxisValueAnimation(a, h);
        });
      return Promise.all(l).then(a);
    }
    startAxisValueAnimation(e, t) {
      const n = this.getAxisMotionValue(e);
      return (
        bm(this.visualElement, e),
        n.start(sm(e, n, 0, t, this.visualElement, !1))
      );
    }
    stopAnimation() {
      xg((e) => this.getAxisMotionValue(e).stop());
    }
    pauseAnimation() {
      xg((e) => {
        var t;
        return null === (t = this.getAxisMotionValue(e).animation) ||
          void 0 === t
          ? void 0
          : t.pause();
      });
    }
    getAnimationState(e) {
      var t;
      return null === (t = this.getAxisMotionValue(e).animation) || void 0 === t
        ? void 0
        : t.state;
    }
    getAxisMotionValue(e) {
      const t = '_drag'.concat(e.toUpperCase()),
        n = this.visualElement.getProps(),
        r = n[t];
      return (
        r ||
        this.visualElement.getValue(e, (n.initial ? n.initial[e] : void 0) || 0)
      );
    }
    snapToCursor(e) {
      xg((t) => {
        const { drag: n } = this.getProps();
        if (!Ug(t, n, this.currentDirection)) return;
        const { projection: r } = this.visualElement,
          i = this.getAxisMotionValue(t);
        if (r && r.layout) {
          const { min: n, max: o } = r.layout.layoutBox[t];
          i.set(e[t] - xp(n, o, 0.5));
        }
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      const { drag: e, dragConstraints: t } = this.getProps(),
        { projection: n } = this.visualElement;
      if (!lg(t) || !n || !this.constraints) return;
      this.stopAnimation();
      const r = { x: 0, y: 0 };
      xg((e) => {
        const t = this.getAxisMotionValue(e);
        if (t && !1 !== this.constraints) {
          const n = t.get();
          r[e] = (function (e, t) {
            let n = 0.5;
            const r = ug(e),
              i = ug(t);
            return (
              i > r
                ? (n = Kf(t.min, t.max - r, e.min))
                : r > i && (n = Kf(e.min, e.max - i, t.min)),
              Vh(0, 1, n)
            );
          })({ min: n, max: n }, this.constraints[e]);
        }
      });
      const { transformTemplate: i } = this.visualElement.getProps();
      (this.visualElement.current.style.transform = i ? i({}, '') : 'none'),
        n.root && n.root.updateScroll(),
        n.updateLayout(),
        this.resolveConstraints(),
        xg((t) => {
          if (!Ug(t, e, null)) return;
          const n = this.getAxisMotionValue(t),
            { min: i, max: o } = this.constraints[t];
          n.set(xp(i, o, r[t]));
        });
    }
    addListeners() {
      if (!this.visualElement.current) return;
      Og.set(this.visualElement, this);
      const e = $m(this.visualElement.current, 'pointerdown', (e) => {
          const { drag: t, dragListener: n = !0 } = this.getProps();
          t && n && this.start(e);
        }),
        t = () => {
          const { dragConstraints: e } = this.getProps();
          lg(e) &&
            e.current &&
            (this.constraints = this.resolveRefConstraints());
        },
        { projection: n } = this.visualElement,
        r = n.addEventListener('measure', t);
      n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()),
        ph.read(t);
      const i = qm(window, 'resize', () =>
          this.scalePositionWithinConstraints()
        ),
        o = n.addEventListener('didUpdate', (e) => {
          let { delta: t, hasLayoutChanged: n } = e;
          this.isDragging &&
            n &&
            (xg((e) => {
              const n = this.getAxisMotionValue(e);
              n &&
                ((this.originPoint[e] += t[e].translate),
                n.set(n.get() + t[e].translate));
            }),
            this.visualElement.render());
        });
      return () => {
        i(), e(), r(), o && o();
      };
    }
    getProps() {
      const e = this.visualElement.getProps(),
        {
          drag: t = !1,
          dragDirectionLock: n = !1,
          dragPropagation: r = !1,
          dragConstraints: i = !1,
          dragElastic: o = vg,
          dragMomentum: a = !0,
        } = e;
      return u(
        u({}, e),
        {},
        {
          drag: t,
          dragDirectionLock: n,
          dragPropagation: r,
          dragConstraints: i,
          dragElastic: o,
          dragMomentum: a,
        }
      );
    }
  }
  function Ug(e, t, n) {
    return (!0 === t || t === e) && (null === n || n === e);
  }
  const Zg = (e) => (t, n) => {
    e && ph.postRender(() => e(t, n));
  };
  const _g = (0, r.createContext)({}),
    Wg = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
  function Hg(e, t) {
    return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
  }
  const Jg = {
      correct: (e, t) => {
        if (!t.target) return e;
        if ('string' === typeof e) {
          if (!Hh.test(e)) return e;
          e = parseFloat(e);
        }
        const n = Hg(e, t.target.x),
          r = Hg(e, t.target.y);
        return ''.concat(n, '% ').concat(r, '%');
      },
    },
    Yg = {
      correct: (e, t) => {
        let { treeScale: n, projectionDelta: r } = t;
        const i = e,
          o = Df.parse(e);
        if (o.length > 5) return i;
        const a = Df.createTransformer(e),
          s = 'number' !== typeof o[0] ? 1 : 0,
          l = r.x.scale * n.x,
          u = r.y.scale * n.y;
        (o[0 + s] /= l), (o[1 + s] /= u);
        const c = xp(l, u, 0.5);
        return (
          'number' === typeof o[2 + s] && (o[2 + s] /= c),
          'number' === typeof o[3 + s] && (o[3 + s] /= c),
          a(o)
        );
      },
    },
    Xg = {};
  const { schedule: Qg, cancel: Gg } = fh(queueMicrotask, !1);
  class Kg extends r.Component {
    componentDidMount() {
      const {
          visualElement: e,
          layoutGroup: t,
          switchLayoutGroup: n,
          layoutId: r,
        } = this.props,
        { projection: i } = e;
      var o;
      (o = $g),
        Object.assign(Xg, o),
        i &&
          (t.group && t.group.add(i),
          n && n.register && r && n.register(i),
          i.root.didUpdate(),
          i.addEventListener('animationComplete', () => {
            this.safeToRemove();
          }),
          i.setOptions(
            u(
              u({}, i.options),
              {},
              { onExitComplete: () => this.safeToRemove() }
            )
          )),
        (Wg.hasEverUpdated = !0);
    }
    getSnapshotBeforeUpdate(e) {
      const {
          layoutDependency: t,
          visualElement: n,
          drag: r,
          isPresent: i,
        } = this.props,
        o = n.projection;
      return o
        ? ((o.isPresent = i),
          r || e.layoutDependency !== t || void 0 === t
            ? o.willUpdate()
            : this.safeToRemove(),
          e.isPresent !== i &&
            (i
              ? o.promote()
              : o.relegate() ||
                ph.postRender(() => {
                  const e = o.getStack();
                  (e && e.members.length) || this.safeToRemove();
                })),
          null)
        : null;
    }
    componentDidUpdate() {
      const { projection: e } = this.props.visualElement;
      e &&
        (e.root.didUpdate(),
        Qg.postRender(() => {
          !e.currentAnimation && e.isLead() && this.safeToRemove();
        }));
    }
    componentWillUnmount() {
      const {
          visualElement: e,
          layoutGroup: t,
          switchLayoutGroup: n,
        } = this.props,
        { projection: r } = e;
      r &&
        (r.scheduleCheckAfterUnmount(),
        t && t.group && t.group.remove(r),
        n && n.deregister && n.deregister(r));
    }
    safeToRemove() {
      const { safeToRemove: e } = this.props;
      e && e();
    }
    render() {
      return null;
    }
  }
  function qg(e) {
    const [t, n] = (function () {
        const e = (0, r.useContext)(Pd);
        if (null === e) return [!0, null];
        const { isPresent: t, onExitComplete: n, register: i } = e,
          o = (0, r.useId)();
        (0, r.useEffect)(() => i(o), []);
        const a = (0, r.useCallback)(() => n && n(o), [o, n]);
        return !t && n ? [!1, a] : [!0];
      })(),
      i = (0, r.useContext)(jd);
    return (0, Fn.jsx)(
      Kg,
      u(
        u({}, e),
        {},
        {
          layoutGroup: i,
          switchLayoutGroup: (0, r.useContext)(_g),
          isPresent: t,
          safeToRemove: n,
        }
      )
    );
  }
  const $g = {
      borderRadius: u(
        u({}, Jg),
        {},
        {
          applyTo: [
            'borderTopLeftRadius',
            'borderTopRightRadius',
            'borderBottomLeftRadius',
            'borderBottomRightRadius',
          ],
        }
      ),
      borderTopLeftRadius: Jg,
      borderTopRightRadius: Jg,
      borderBottomLeftRadius: Jg,
      borderBottomRightRadius: Jg,
      boxShadow: Yg,
    },
    ev = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
    tv = ev.length,
    nv = (e) => ('string' === typeof e ? parseFloat(e) : e),
    rv = (e) => 'number' === typeof e || Hh.test(e);
  function iv(e, t) {
    return void 0 !== e[t] ? e[t] : e.borderRadius;
  }
  const ov = sv(0, 0.5, Ch),
    av = sv(0.5, 0.95, Ld);
  function sv(e, t, n) {
    return (r) => (r < e ? 0 : r > t ? 1 : n(Kf(e, t, r)));
  }
  function lv(e, t) {
    (e.min = t.min), (e.max = t.max);
  }
  function uv(e, t) {
    lv(e.x, t.x), lv(e.y, t.y);
  }
  function cv(e, t) {
    (e.translate = t.translate),
      (e.scale = t.scale),
      (e.originPoint = t.originPoint),
      (e.origin = t.origin);
  }
  function dv(e, t, n, r, i) {
    return (
      (e = Tg((e -= t), 1 / n, r)), void 0 !== i && (e = Tg(e, 1 / i, r)), e
    );
  }
  function hv(e, t, n, r, i) {
    let [o, a, s] = n;
    !(function (e) {
      let t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
        r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0.5,
        i = arguments.length > 4 ? arguments[4] : void 0,
        o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : e,
        a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : e;
      Wh.test(t) &&
        ((t = parseFloat(t)), (t = xp(a.min, a.max, t / 100) - a.min));
      if ('number' !== typeof t) return;
      let s = xp(o.min, o.max, r);
      e === o && (s -= t),
        (e.min = dv(e.min, t, n, s, i)),
        (e.max = dv(e.max, t, n, s, i));
    })(e, t[o], t[a], t[s], t.scale, r, i);
  }
  const fv = ['x', 'scaleX', 'originX'],
    pv = ['y', 'scaleY', 'originY'];
  function mv(e, t, n, r) {
    hv(e.x, t, fv, n ? n.x : void 0, r ? r.x : void 0),
      hv(e.y, t, pv, n ? n.y : void 0, r ? r.y : void 0);
  }
  function gv(e) {
    return 0 === e.translate && 1 === e.scale;
  }
  function vv(e) {
    return gv(e.x) && gv(e.y);
  }
  function yv(e, t) {
    return e.min === t.min && e.max === t.max;
  }
  function Av(e, t) {
    return (
      Math.round(e.min) === Math.round(t.min) &&
      Math.round(e.max) === Math.round(t.max)
    );
  }
  function bv(e, t) {
    return Av(e.x, t.x) && Av(e.y, t.y);
  }
  function xv(e) {
    return ug(e.x) / ug(e.y);
  }
  function wv(e, t) {
    return (
      e.translate === t.translate &&
      e.scale === t.scale &&
      e.originPoint === t.originPoint
    );
  }
  class Sv {
    constructor() {
      this.members = [];
    }
    add(e) {
      lm(this.members, e), e.scheduleRender();
    }
    remove(e) {
      if (
        (um(this.members, e),
        e === this.prevLead && (this.prevLead = void 0),
        e === this.lead)
      ) {
        const e = this.members[this.members.length - 1];
        e && this.promote(e);
      }
    }
    relegate(e) {
      const t = this.members.findIndex((t) => e === t);
      if (0 === t) return !1;
      let n;
      for (let r = t; r >= 0; r--) {
        const e = this.members[r];
        if (!1 !== e.isPresent) {
          n = e;
          break;
        }
      }
      return !!n && (this.promote(n), !0);
    }
    promote(e, t) {
      const n = this.lead;
      if (e !== n && ((this.prevLead = n), (this.lead = e), e.show(), n)) {
        n.instance && n.scheduleRender(),
          e.scheduleRender(),
          (e.resumeFrom = n),
          t && (e.resumeFrom.preserveOpacity = !0),
          n.snapshot &&
            ((e.snapshot = n.snapshot),
            (e.snapshot.latestValues = n.animationValues || n.latestValues)),
          e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
        const { crossfade: r } = e.options;
        !1 === r && n.hide();
      }
    }
    exitAnimationComplete() {
      this.members.forEach((e) => {
        const { options: t, resumingFrom: n } = e;
        t.onExitComplete && t.onExitComplete(),
          n && n.options.onExitComplete && n.options.onExitComplete();
      });
    }
    scheduleRender() {
      this.members.forEach((e) => {
        e.instance && e.scheduleRender(!1);
      });
    }
    removeLeadSnapshot() {
      this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
    }
  }
  const kv = (e, t) => e.depth - t.depth;
  class Ev {
    constructor() {
      (this.children = []), (this.isDirty = !1);
    }
    add(e) {
      lm(this.children, e), (this.isDirty = !0);
    }
    remove(e) {
      um(this.children, e), (this.isDirty = !0);
    }
    forEach(e) {
      this.isDirty && this.children.sort(kv),
        (this.isDirty = !1),
        this.children.forEach(e);
    }
  }
  function Pv(e) {
    const t = Am(e) ? e.get() : e;
    return (
      (n = t),
      Boolean(n && 'object' === typeof n && n.mix && n.toValue)
        ? t.toValue()
        : t
    );
    var n;
  }
  function Cv(e, t) {
    const n = Yf.now(),
      r = (i) => {
        let { timestamp: o } = i;
        const a = o - n;
        a >= t && (mh(r), e(a - t));
      };
    return ph.read(r, !0), () => mh(r);
  }
  const Tv = {
      type: 'projectionFrame',
      totalNodes: 0,
      resolvedTargetDeltas: 0,
      recalculatedProjection: 0,
    },
    Fv = 'undefined' !== typeof window && void 0 !== window.MotionDebug,
    Dv = ['', 'X', 'Y', 'Z'],
    Mv = { visibility: 'hidden' };
  let Rv = 0;
  function jv(e, t, n, r) {
    const { latestValues: i } = t;
    i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
  }
  function Lv(e) {
    if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
    const { visualElement: t } = e.options;
    if (!t) return;
    const n = ym(t);
    if (window.MotionHasOptimisedAnimation(n, 'transform')) {
      const { layout: t, layoutId: r } = e.options;
      window.MotionCancelOptimisedAnimation(n, 'transform', ph, !(t || r));
    }
    const { parent: r } = e;
    r && !r.hasCheckedOptimisedAppear && Lv(r);
  }
  function zv(e) {
    let {
      attachResizeListener: t,
      defaultParent: n,
      measureScroll: r,
      checkIsScrollRoot: i,
      resetTransform: o,
    } = e;
    return class {
      constructor() {
        let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null === n || void 0 === n
                ? void 0
                : n();
        (this.id = Rv++),
          (this.animationId = 0),
          (this.children = new Set()),
          (this.options = {}),
          (this.isTreeAnimating = !1),
          (this.isAnimationBlocked = !1),
          (this.isLayoutDirty = !1),
          (this.isProjectionDirty = !1),
          (this.isSharedProjectionDirty = !1),
          (this.isTransformDirty = !1),
          (this.updateManuallyBlocked = !1),
          (this.updateBlockedByResize = !1),
          (this.isUpdating = !1),
          (this.isSVG = !1),
          (this.needsReset = !1),
          (this.shouldResetTransform = !1),
          (this.hasCheckedOptimisedAppear = !1),
          (this.treeScale = { x: 1, y: 1 }),
          (this.eventHandlers = new Map()),
          (this.hasTreeAnimated = !1),
          (this.updateScheduled = !1),
          (this.scheduleUpdate = () => this.update()),
          (this.projectionUpdateScheduled = !1),
          (this.checkUpdateFailed = () => {
            this.isUpdating &&
              ((this.isUpdating = !1), this.clearAllSnapshots());
          }),
          (this.updateProjection = () => {
            (this.projectionUpdateScheduled = !1),
              Fv &&
                (Tv.totalNodes =
                  Tv.resolvedTargetDeltas =
                  Tv.recalculatedProjection =
                    0),
              this.nodes.forEach(Vv),
              this.nodes.forEach(Hv),
              this.nodes.forEach(Jv),
              this.nodes.forEach(Ov),
              Fv && window.MotionDebug.record(Tv);
          }),
          (this.resolvedRelativeTargetAt = 0),
          (this.hasProjected = !1),
          (this.isVisible = !0),
          (this.animationProgress = 0),
          (this.sharedNodes = new Map()),
          (this.latestValues = e),
          (this.root = t ? t.root || t : this),
          (this.path = t ? [...t.path, t] : []),
          (this.parent = t),
          (this.depth = t ? t.depth + 1 : 0);
        for (let n = 0; n < this.path.length; n++)
          this.path[n].shouldResetTransform = !0;
        this.root === this && (this.nodes = new Ev());
      }
      addEventListener(e, t) {
        return (
          this.eventHandlers.has(e) || this.eventHandlers.set(e, new cm()),
          this.eventHandlers.get(e).add(t)
        );
      }
      notifyListeners(e) {
        const t = this.eventHandlers.get(e);
        for (
          var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
          i < n;
          i++
        )
          r[i - 1] = arguments[i];
        t && t.notify(...r);
      }
      hasListeners(e) {
        return this.eventHandlers.has(e);
      }
      mount(e) {
        let n =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : this.root.hasTreeAnimated;
        if (this.instance) return;
        var r;
        (this.isSVG = (r = e) instanceof SVGElement && 'svg' !== r.tagName),
          (this.instance = e);
        const { layoutId: i, layout: o, visualElement: a } = this.options;
        if (
          (a && !a.current && a.mount(e),
          this.root.nodes.add(this),
          this.parent && this.parent.children.add(this),
          n && (o || i) && (this.isLayoutDirty = !0),
          t)
        ) {
          let n;
          const r = () => (this.root.updateBlockedByResize = !1);
          t(e, () => {
            (this.root.updateBlockedByResize = !0),
              n && n(),
              (n = Cv(r, 250)),
              Wg.hasAnimatedSinceResize &&
                ((Wg.hasAnimatedSinceResize = !1), this.nodes.forEach(Wv));
          });
        }
        i && this.root.registerSharedNode(i, this),
          !1 !== this.options.animate &&
            a &&
            (i || o) &&
            this.addEventListener('didUpdate', (e) => {
              let {
                delta: t,
                hasLayoutChanged: n,
                hasRelativeTargetChanged: r,
                layout: i,
              } = e;
              if (this.isTreeAnimationBlocked())
                return (
                  (this.target = void 0), void (this.relativeTarget = void 0)
                );
              const o =
                  this.options.transition || a.getDefaultTransition() || qv,
                { onLayoutAnimationStart: s, onLayoutAnimationComplete: l } =
                  a.getProps(),
                c = !this.targetLayout || !bv(this.targetLayout, i) || r,
                d = !n && r;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                d ||
                (n && (c || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(t, d);
                const e = u(
                  u({}, ah(o, 'layout')),
                  {},
                  { onPlay: s, onComplete: l }
                );
                (a.shouldReduceMotion || this.options.layoutRoot) &&
                  ((e.delay = 0), (e.type = !1)),
                  this.startAnimation(e);
              } else
                n || Wv(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = i;
            });
      }
      unmount() {
        this.options.layoutId && this.willUpdate(),
          this.root.nodes.remove(this);
        const e = this.getStack();
        e && e.remove(this),
          this.parent && this.parent.children.delete(this),
          (this.instance = void 0),
          mh(this.updateProjection);
      }
      blockUpdate() {
        this.updateManuallyBlocked = !0;
      }
      unblockUpdate() {
        this.updateManuallyBlocked = !1;
      }
      isUpdateBlocked() {
        return this.updateManuallyBlocked || this.updateBlockedByResize;
      }
      isTreeAnimationBlocked() {
        return (
          this.isAnimationBlocked ||
          (this.parent && this.parent.isTreeAnimationBlocked()) ||
          !1
        );
      }
      startUpdate() {
        this.isUpdateBlocked() ||
          ((this.isUpdating = !0),
          this.nodes && this.nodes.forEach(Yv),
          this.animationId++);
      }
      getTransformTemplate() {
        const { visualElement: e } = this.options;
        return e && e.getProps().transformTemplate;
      }
      willUpdate() {
        let e =
          !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked()))
          return void (
            this.options.onExitComplete && this.options.onExitComplete()
          );
        if (
          (window.MotionCancelOptimisedAnimation &&
            !this.hasCheckedOptimisedAppear &&
            Lv(this),
          !this.root.isUpdating && this.root.startUpdate(),
          this.isLayoutDirty)
        )
          return;
        this.isLayoutDirty = !0;
        for (let i = 0; i < this.path.length; i++) {
          const e = this.path[i];
          (e.shouldResetTransform = !0),
            e.updateScroll('snapshot'),
            e.options.layoutRoot && e.willUpdate(!1);
        }
        const { layoutId: t, layout: n } = this.options;
        if (void 0 === t && !n) return;
        const r = this.getTransformTemplate();
        (this.prevTransformTemplateValue = r
          ? r(this.latestValues, '')
          : void 0),
          this.updateSnapshot(),
          e && this.notifyListeners('willUpdate');
      }
      update() {
        this.updateScheduled = !1;
        if (this.isUpdateBlocked())
          return (
            this.unblockUpdate(),
            this.clearAllSnapshots(),
            void this.nodes.forEach(Uv)
          );
        this.isUpdating || this.nodes.forEach(Zv),
          (this.isUpdating = !1),
          this.nodes.forEach(_v),
          this.nodes.forEach(Nv),
          this.nodes.forEach(Bv),
          this.clearAllSnapshots();
        const e = Yf.now();
        (gh.delta = Vh(0, 1e3 / 60, e - gh.timestamp)),
          (gh.timestamp = e),
          (gh.isProcessing = !0),
          vh.update.process(gh),
          vh.preRender.process(gh),
          vh.render.process(gh),
          (gh.isProcessing = !1);
      }
      didUpdate() {
        this.updateScheduled ||
          ((this.updateScheduled = !0), Qg.read(this.scheduleUpdate));
      }
      clearAllSnapshots() {
        this.nodes.forEach(Iv), this.sharedNodes.forEach(Xv);
      }
      scheduleUpdateProjection() {
        this.projectionUpdateScheduled ||
          ((this.projectionUpdateScheduled = !0),
          ph.preRender(this.updateProjection, !1, !0));
      }
      scheduleCheckAfterUnmount() {
        ph.postRender(() => {
          this.isLayoutDirty
            ? this.root.didUpdate()
            : this.root.checkUpdateFailed();
        });
      }
      updateSnapshot() {
        !this.snapshot && this.instance && (this.snapshot = this.measure());
      }
      updateLayout() {
        if (!this.instance) return;
        if (
          (this.updateScroll(),
          (!this.options.alwaysMeasureLayout || !this.isLead()) &&
            !this.isLayoutDirty)
        )
          return;
        if (this.resumeFrom && !this.resumeFrom.instance)
          for (let n = 0; n < this.path.length; n++) {
            this.path[n].updateScroll();
          }
        const e = this.layout;
        (this.layout = this.measure(!1)),
          (this.layoutCorrected = {
            x: { min: 0, max: 0 },
            y: { min: 0, max: 0 },
          }),
          (this.isLayoutDirty = !1),
          (this.projectionDelta = void 0),
          this.notifyListeners('measure', this.layout.layoutBox);
        const { visualElement: t } = this.options;
        t &&
          t.notify(
            'LayoutMeasure',
            this.layout.layoutBox,
            e ? e.layoutBox : void 0
          );
      }
      updateScroll() {
        let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'measure',
          t = Boolean(this.options.layoutScroll && this.instance);
        if (
          (this.scroll &&
            this.scroll.animationId === this.root.animationId &&
            this.scroll.phase === e &&
            (t = !1),
          t)
        ) {
          const t = i(this.instance);
          this.scroll = {
            animationId: this.root.animationId,
            phase: e,
            isRoot: t,
            offset: r(this.instance),
            wasRoot: this.scroll ? this.scroll.isRoot : t,
          };
        }
      }
      resetTransform() {
        if (!o) return;
        const e =
            this.isLayoutDirty ||
            this.shouldResetTransform ||
            this.options.alwaysMeasureLayout,
          t = this.projectionDelta && !vv(this.projectionDelta),
          n = this.getTransformTemplate(),
          r = n ? n(this.latestValues, '') : void 0,
          i = r !== this.prevTransformTemplateValue;
        e &&
          (t || Eg(this.latestValues) || i) &&
          (o(this.instance, r),
          (this.shouldResetTransform = !1),
          this.scheduleRender());
      }
      measure() {
        let e =
          !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        const t = this.measurePageBox();
        let n = this.removeElementScroll(t);
        var r;
        return (
          e && (n = this.removeTransform(n)),
          ty((r = n).x),
          ty(r.y),
          {
            animationId: this.root.animationId,
            measuredBox: t,
            layoutBox: n,
            latestValues: {},
            source: this.id,
          }
        );
      }
      measurePageBox() {
        var e;
        const { visualElement: t } = this.options;
        if (!t) return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        const n = t.measureViewportBox();
        if (
          !(
            (null === (e = this.scroll) || void 0 === e ? void 0 : e.wasRoot) ||
            this.path.some(ry)
          )
        ) {
          const { scroll: e } = this.root;
          e && (Lg(n.x, e.offset.x), Lg(n.y, e.offset.y));
        }
        return n;
      }
      removeElementScroll(e) {
        var t;
        const n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        if (
          (uv(n, e),
          null === (t = this.scroll) || void 0 === t ? void 0 : t.wasRoot)
        )
          return n;
        for (let r = 0; r < this.path.length; r++) {
          const t = this.path[r],
            { scroll: i, options: o } = t;
          t !== this.root &&
            i &&
            o.layoutScroll &&
            (i.wasRoot && uv(n, e), Lg(n.x, i.offset.x), Lg(n.y, i.offset.y));
        }
        return n;
      }
      applyTransform(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        const n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        uv(n, e);
        for (let r = 0; r < this.path.length; r++) {
          const e = this.path[r];
          !t &&
            e.options.layoutScroll &&
            e.scroll &&
            e !== e.root &&
            Ng(n, { x: -e.scroll.offset.x, y: -e.scroll.offset.y }),
            Eg(e.latestValues) && Ng(n, e.latestValues);
        }
        return Eg(this.latestValues) && Ng(n, this.latestValues), n;
      }
      removeTransform(e) {
        const t = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        uv(t, e);
        for (let n = 0; n < this.path.length; n++) {
          const e = this.path[n];
          if (!e.instance) continue;
          if (!Eg(e.latestValues)) continue;
          kg(e.latestValues) && e.updateSnapshot();
          const r = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          uv(r, e.measurePageBox()),
            mv(
              t,
              e.latestValues,
              e.snapshot ? e.snapshot.layoutBox : void 0,
              r
            );
        }
        return Eg(this.latestValues) && mv(t, this.latestValues), t;
      }
      setTargetDelta(e) {
        (this.targetDelta = e),
          this.root.scheduleUpdateProjection(),
          (this.isProjectionDirty = !0);
      }
      setOptions(e) {
        this.options = u(
          u(u({}, this.options), e),
          {},
          { crossfade: void 0 === e.crossfade || e.crossfade }
        );
      }
      clearMeasurements() {
        (this.scroll = void 0),
          (this.layout = void 0),
          (this.snapshot = void 0),
          (this.prevTransformTemplateValue = void 0),
          (this.targetDelta = void 0),
          (this.target = void 0),
          (this.isLayoutDirty = !1);
      }
      forceRelativeParentToResolveTarget() {
        this.relativeParent &&
          this.relativeParent.resolvedRelativeTargetAt !== gh.timestamp &&
          this.relativeParent.resolveTargetDelta(!0);
      }
      resolveTargetDelta() {
        let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var t;
        const n = this.getLead();
        this.isProjectionDirty ||
          (this.isProjectionDirty = n.isProjectionDirty),
          this.isTransformDirty || (this.isTransformDirty = n.isTransformDirty),
          this.isSharedProjectionDirty ||
            (this.isSharedProjectionDirty = n.isSharedProjectionDirty);
        const r = Boolean(this.resumingFrom) || this !== n;
        if (
          !(
            e ||
            (r && this.isSharedProjectionDirty) ||
            this.isProjectionDirty ||
            (null === (t = this.parent) || void 0 === t
              ? void 0
              : t.isProjectionDirty) ||
            this.attemptToResolveRelativeTarget ||
            this.root.updateBlockedByResize
          )
        )
          return;
        const { layout: i, layoutId: o } = this.options;
        if (this.layout && (i || o)) {
          if (
            ((this.resolvedRelativeTargetAt = gh.timestamp),
            !this.targetDelta && !this.relativeTarget)
          ) {
            const e = this.getClosestProjectingParent();
            e && e.layout && 1 !== this.animationProgress
              ? ((this.relativeParent = e),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = {
                  x: { min: 0, max: 0 },
                  y: { min: 0, max: 0 },
                }),
                (this.relativeTargetOrigin = {
                  x: { min: 0, max: 0 },
                  y: { min: 0, max: 0 },
                }),
                pg(
                  this.relativeTargetOrigin,
                  this.layout.layoutBox,
                  e.layout.layoutBox
                ),
                uv(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          if (this.relativeTarget || this.targetDelta) {
            var a, s, l;
            if (
              (this.target ||
                ((this.target = {
                  x: { min: 0, max: 0 },
                  y: { min: 0, max: 0 },
                }),
                (this.targetWithTransforms = {
                  x: { min: 0, max: 0 },
                  y: { min: 0, max: 0 },
                })),
              this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.relativeParent &&
              this.relativeParent.target
                ? (this.forceRelativeParentToResolveTarget(),
                  (a = this.target),
                  (s = this.relativeTarget),
                  (l = this.relativeParent.target),
                  hg(a.x, s.x, l.x),
                  hg(a.y, s.y, l.y))
                : this.targetDelta
                  ? (Boolean(this.resumingFrom)
                      ? (this.target = this.applyTransform(
                          this.layout.layoutBox
                        ))
                      : uv(this.target, this.layout.layoutBox),
                    Mg(this.target, this.targetDelta))
                  : uv(this.target, this.layout.layoutBox),
              this.attemptToResolveRelativeTarget)
            ) {
              this.attemptToResolveRelativeTarget = !1;
              const e = this.getClosestProjectingParent();
              e &&
              Boolean(e.resumingFrom) === Boolean(this.resumingFrom) &&
              !e.options.layoutScroll &&
              e.target &&
              1 !== this.animationProgress
                ? ((this.relativeParent = e),
                  this.forceRelativeParentToResolveTarget(),
                  (this.relativeTarget = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 },
                  }),
                  (this.relativeTargetOrigin = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 },
                  }),
                  pg(this.relativeTargetOrigin, this.target, e.target),
                  uv(this.relativeTarget, this.relativeTargetOrigin))
                : (this.relativeParent = this.relativeTarget = void 0);
            }
            Fv && Tv.resolvedTargetDeltas++;
          }
        }
      }
      getClosestProjectingParent() {
        if (
          this.parent &&
          !kg(this.parent.latestValues) &&
          !Pg(this.parent.latestValues)
        )
          return this.parent.isProjecting()
            ? this.parent
            : this.parent.getClosestProjectingParent();
      }
      isProjecting() {
        return Boolean(
          (this.relativeTarget ||
            this.targetDelta ||
            this.options.layoutRoot) &&
            this.layout
        );
      }
      calcProjection() {
        var e;
        const t = this.getLead(),
          n = Boolean(this.resumingFrom) || this !== t;
        let r = !0;
        if (
          ((this.isProjectionDirty ||
            (null === (e = this.parent) || void 0 === e
              ? void 0
              : e.isProjectionDirty)) &&
            (r = !1),
          n &&
            (this.isSharedProjectionDirty || this.isTransformDirty) &&
            (r = !1),
          this.resolvedRelativeTargetAt === gh.timestamp && (r = !1),
          r)
        )
          return;
        const { layout: i, layoutId: o } = this.options;
        if (
          ((this.isTreeAnimating = Boolean(
            (this.parent && this.parent.isTreeAnimating) ||
              this.currentAnimation ||
              this.pendingAnimation
          )),
          this.isTreeAnimating ||
            (this.targetDelta = this.relativeTarget = void 0),
          !this.layout || (!i && !o))
        )
          return;
        uv(this.layoutCorrected, this.layout.layoutBox);
        const a = this.treeScale.x,
          s = this.treeScale.y;
        !(function (e, t, n) {
          let r =
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          const i = n.length;
          if (!i) return;
          let o, a;
          t.x = t.y = 1;
          for (let s = 0; s < i; s++) {
            (o = n[s]), (a = o.projectionDelta);
            const { visualElement: i } = o.options;
            (i && i.props.style && 'contents' === i.props.style.display) ||
              (r &&
                o.options.layoutScroll &&
                o.scroll &&
                o !== o.root &&
                Ng(e, { x: -o.scroll.offset.x, y: -o.scroll.offset.y }),
              a && ((t.x *= a.x.scale), (t.y *= a.y.scale), Mg(e, a)),
              r && Eg(o.latestValues) && Ng(e, o.latestValues));
          }
          t.x < jg && t.x > Rg && (t.x = 1), t.y < jg && t.y > Rg && (t.y = 1);
        })(this.layoutCorrected, this.treeScale, this.path, n),
          !t.layout ||
            t.target ||
            (1 === this.treeScale.x && 1 === this.treeScale.y) ||
            ((t.target = t.layout.layoutBox),
            (t.targetWithTransforms = {
              x: { min: 0, max: 0 },
              y: { min: 0, max: 0 },
            }));
        const { target: l } = t;
        l
          ? (this.projectionDelta && this.prevProjectionDelta
              ? (cv(this.prevProjectionDelta.x, this.projectionDelta.x),
                cv(this.prevProjectionDelta.y, this.projectionDelta.y))
              : this.createProjectionDeltas(),
            dg(
              this.projectionDelta,
              this.layoutCorrected,
              l,
              this.latestValues
            ),
            (this.treeScale.x === a &&
              this.treeScale.y === s &&
              wv(this.projectionDelta.x, this.prevProjectionDelta.x) &&
              wv(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
              ((this.hasProjected = !0),
              this.scheduleRender(),
              this.notifyListeners('projectionUpdate', l)),
            Fv && Tv.recalculatedProjection++)
          : this.prevProjectionDelta &&
            (this.createProjectionDeltas(), this.scheduleRender());
      }
      hide() {
        this.isVisible = !1;
      }
      show() {
        this.isVisible = !0;
      }
      scheduleRender() {
        let e =
          !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        var t;
        if (
          (null === (t = this.options.visualElement) ||
            void 0 === t ||
            t.scheduleRender(),
          e)
        ) {
          const e = this.getStack();
          e && e.scheduleRender();
        }
        this.resumingFrom &&
          !this.resumingFrom.instance &&
          (this.resumingFrom = void 0);
      }
      createProjectionDeltas() {
        (this.prevProjectionDelta = {
          x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        }),
          (this.projectionDelta = {
            x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
            y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          }),
          (this.projectionDeltaWithTransform = {
            x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
            y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          });
      }
      setAnimationOrigin(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        const n = this.snapshot,
          r = n ? n.latestValues : {},
          i = u({}, this.latestValues),
          o = {
            x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
            y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          };
        (this.relativeParent && this.relativeParent.options.layoutRoot) ||
          (this.relativeTarget = this.relativeTargetOrigin = void 0),
          (this.attemptToResolveRelativeTarget = !t);
        const a = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } },
          s =
            (n ? n.source : void 0) !==
            (this.layout ? this.layout.source : void 0),
          l = this.getStack(),
          c = !l || l.members.length <= 1,
          d = Boolean(
            s && !c && !0 === this.options.crossfade && !this.path.some(Kv)
          );
        let h;
        (this.animationProgress = 0),
          (this.mixTargetDelta = (t) => {
            const n = t / 1e3;
            var l, u, f, p, m, g;
            Qv(o.x, e.x, n),
              Qv(o.y, e.y, n),
              this.setTargetDelta(o),
              this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.layout &&
                this.relativeParent &&
                this.relativeParent.layout &&
                (pg(
                  a,
                  this.layout.layoutBox,
                  this.relativeParent.layout.layoutBox
                ),
                (f = this.relativeTarget),
                (p = this.relativeTargetOrigin),
                (m = a),
                (g = n),
                Gv(f.x, p.x, m.x, g),
                Gv(f.y, p.y, m.y, g),
                h &&
                  ((l = this.relativeTarget),
                  (u = h),
                  yv(l.x, u.x) && yv(l.y, u.y)) &&
                  (this.isProjectionDirty = !1),
                h || (h = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
                uv(h, this.relativeTarget)),
              s &&
                ((this.animationValues = i),
                (function (e, t, n, r, i, o) {
                  i
                    ? ((e.opacity = xp(
                        0,
                        void 0 !== n.opacity ? n.opacity : 1,
                        ov(r)
                      )),
                      (e.opacityExit = xp(
                        void 0 !== t.opacity ? t.opacity : 1,
                        0,
                        av(r)
                      )))
                    : o &&
                      (e.opacity = xp(
                        void 0 !== t.opacity ? t.opacity : 1,
                        void 0 !== n.opacity ? n.opacity : 1,
                        r
                      ));
                  for (let a = 0; a < tv; a++) {
                    const i = 'border'.concat(ev[a], 'Radius');
                    let o = iv(t, i),
                      s = iv(n, i);
                    (void 0 === o && void 0 === s) ||
                      (o || (o = 0),
                      s || (s = 0),
                      0 === o || 0 === s || rv(o) === rv(s)
                        ? ((e[i] = Math.max(xp(nv(o), nv(s), r), 0)),
                          (Wh.test(s) || Wh.test(o)) && (e[i] += '%'))
                        : (e[i] = s));
                  }
                  (t.rotate || n.rotate) &&
                    (e.rotate = xp(t.rotate || 0, n.rotate || 0, r));
                })(i, r, this.latestValues, n, d, c)),
              this.root.scheduleUpdateProjection(),
              this.scheduleRender(),
              (this.animationProgress = n);
          }),
          this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
      }
      startAnimation(e) {
        this.notifyListeners('animationStart'),
          this.currentAnimation && this.currentAnimation.stop(),
          this.resumingFrom &&
            this.resumingFrom.currentAnimation &&
            this.resumingFrom.currentAnimation.stop(),
          this.pendingAnimation &&
            (mh(this.pendingAnimation), (this.pendingAnimation = void 0)),
          (this.pendingAnimation = ph.update(() => {
            (Wg.hasAnimatedSinceResize = !0),
              (this.currentAnimation = (function (e, t, n) {
                const r = Am(e) ? e : fm(e);
                return r.start(sm('', r, t, n)), r.animation;
              })(
                0,
                1e3,
                u(
                  u({}, e),
                  {},
                  {
                    onUpdate: (t) => {
                      this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t);
                    },
                    onComplete: () => {
                      e.onComplete && e.onComplete(), this.completeAnimation();
                    },
                  }
                )
              )),
              this.resumingFrom &&
                (this.resumingFrom.currentAnimation = this.currentAnimation),
              (this.pendingAnimation = void 0);
          }));
      }
      completeAnimation() {
        this.resumingFrom &&
          ((this.resumingFrom.currentAnimation = void 0),
          (this.resumingFrom.preserveOpacity = void 0));
        const e = this.getStack();
        e && e.exitAnimationComplete(),
          (this.resumingFrom =
            this.currentAnimation =
            this.animationValues =
              void 0),
          this.notifyListeners('animationComplete');
      }
      finishAnimation() {
        this.currentAnimation &&
          (this.mixTargetDelta && this.mixTargetDelta(1e3),
          this.currentAnimation.stop()),
          this.completeAnimation();
      }
      applyTransformsToTarget() {
        const e = this.getLead();
        let {
          targetWithTransforms: t,
          target: n,
          layout: r,
          latestValues: i,
        } = e;
        if (t && n && r) {
          if (
            this !== e &&
            this.layout &&
            r &&
            ny(this.options.animationType, this.layout.layoutBox, r.layoutBox)
          ) {
            n = this.target || { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            const t = ug(this.layout.layoutBox.x);
            (n.x.min = e.target.x.min), (n.x.max = n.x.min + t);
            const r = ug(this.layout.layoutBox.y);
            (n.y.min = e.target.y.min), (n.y.max = n.y.min + r);
          }
          uv(t, n),
            Ng(t, i),
            dg(this.projectionDeltaWithTransform, this.layoutCorrected, t, i);
        }
      }
      registerSharedNode(e, t) {
        this.sharedNodes.has(e) || this.sharedNodes.set(e, new Sv());
        this.sharedNodes.get(e).add(t);
        const n = t.options.initialPromotionConfig;
        t.promote({
          transition: n ? n.transition : void 0,
          preserveFollowOpacity:
            n && n.shouldPreserveFollowOpacity
              ? n.shouldPreserveFollowOpacity(t)
              : void 0,
        });
      }
      isLead() {
        const e = this.getStack();
        return !e || e.lead === this;
      }
      getLead() {
        var e;
        const { layoutId: t } = this.options;
        return (
          (t &&
            (null === (e = this.getStack()) || void 0 === e
              ? void 0
              : e.lead)) ||
          this
        );
      }
      getPrevLead() {
        var e;
        const { layoutId: t } = this.options;
        return t
          ? null === (e = this.getStack()) || void 0 === e
            ? void 0
            : e.prevLead
          : void 0;
      }
      getStack() {
        const { layoutId: e } = this.options;
        if (e) return this.root.sharedNodes.get(e);
      }
      promote() {
        let {
          needsReset: e,
          transition: t,
          preserveFollowOpacity: n,
        } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        const r = this.getStack();
        r && r.promote(this, n),
          e && ((this.projectionDelta = void 0), (this.needsReset = !0)),
          t && this.setOptions({ transition: t });
      }
      relegate() {
        const e = this.getStack();
        return !!e && e.relegate(this);
      }
      resetSkewAndRotation() {
        const { visualElement: e } = this.options;
        if (!e) return;
        let t = !1;
        const { latestValues: n } = e;
        if (
          ((n.z ||
            n.rotate ||
            n.rotateX ||
            n.rotateY ||
            n.rotateZ ||
            n.skewX ||
            n.skewY) &&
            (t = !0),
          !t)
        )
          return;
        const r = {};
        n.z && jv('z', e, r, this.animationValues);
        for (let i = 0; i < Dv.length; i++)
          jv('rotate'.concat(Dv[i]), e, r, this.animationValues),
            jv('skew'.concat(Dv[i]), e, r, this.animationValues);
        e.render();
        for (const i in r)
          e.setStaticValue(i, r[i]),
            this.animationValues && (this.animationValues[i] = r[i]);
        e.scheduleRender();
      }
      getProjectionStyles(e) {
        var t, n;
        if (!this.instance || this.isSVG) return;
        if (!this.isVisible) return Mv;
        const r = { visibility: '' },
          i = this.getTransformTemplate();
        if (this.needsReset)
          return (
            (this.needsReset = !1),
            (r.opacity = ''),
            (r.pointerEvents =
              Pv(null === e || void 0 === e ? void 0 : e.pointerEvents) || ''),
            (r.transform = i ? i(this.latestValues, '') : 'none'),
            r
          );
        const o = this.getLead();
        if (!this.projectionDelta || !this.layout || !o.target) {
          const t = {};
          return (
            this.options.layoutId &&
              ((t.opacity =
                void 0 !== this.latestValues.opacity
                  ? this.latestValues.opacity
                  : 1),
              (t.pointerEvents =
                Pv(null === e || void 0 === e ? void 0 : e.pointerEvents) ||
                '')),
            this.hasProjected &&
              !Eg(this.latestValues) &&
              ((t.transform = i ? i({}, '') : 'none'),
              (this.hasProjected = !1)),
            t
          );
        }
        const a = o.animationValues || o.latestValues;
        this.applyTransformsToTarget(),
          (r.transform = (function (e, t, n) {
            let r = '';
            const i = e.x.translate / t.x,
              o = e.y.translate / t.y,
              a = (null === n || void 0 === n ? void 0 : n.z) || 0;
            if (
              ((i || o || a) &&
                (r = 'translate3d('
                  .concat(i, 'px, ')
                  .concat(o, 'px, ')
                  .concat(a, 'px) ')),
              (1 === t.x && 1 === t.y) ||
                (r += 'scale('.concat(1 / t.x, ', ').concat(1 / t.y, ') ')),
              n)
            ) {
              const {
                transformPerspective: e,
                rotate: t,
                rotateX: i,
                rotateY: o,
                skewX: a,
                skewY: s,
              } = n;
              e && (r = 'perspective('.concat(e, 'px) ').concat(r)),
                t && (r += 'rotate('.concat(t, 'deg) ')),
                i && (r += 'rotateX('.concat(i, 'deg) ')),
                o && (r += 'rotateY('.concat(o, 'deg) ')),
                a && (r += 'skewX('.concat(a, 'deg) ')),
                s && (r += 'skewY('.concat(s, 'deg) '));
            }
            const s = e.x.scale * t.x,
              l = e.y.scale * t.y;
            return (
              (1 === s && 1 === l) ||
                (r += 'scale('.concat(s, ', ').concat(l, ')')),
              r || 'none'
            );
          })(this.projectionDeltaWithTransform, this.treeScale, a)),
          i && (r.transform = i(a, r.transform));
        const { x: s, y: l } = this.projectionDelta;
        (r.transformOrigin = ''
          .concat(100 * s.origin, '% ')
          .concat(100 * l.origin, '% 0')),
          o.animationValues
            ? (r.opacity =
                o === this
                  ? null !==
                      (n =
                        null !== (t = a.opacity) && void 0 !== t
                          ? t
                          : this.latestValues.opacity) && void 0 !== n
                    ? n
                    : 1
                  : this.preserveOpacity
                    ? this.latestValues.opacity
                    : a.opacityExit)
            : (r.opacity =
                o === this
                  ? void 0 !== a.opacity
                    ? a.opacity
                    : ''
                  : void 0 !== a.opacityExit
                    ? a.opacityExit
                    : 0);
        for (const u in Xg) {
          if (void 0 === a[u]) continue;
          const { correct: e, applyTo: t } = Xg[u],
            n = 'none' === r.transform ? a[u] : e(a[u], o);
          if (t) {
            const e = t.length;
            for (let i = 0; i < e; i++) r[t[i]] = n;
          } else r[u] = n;
        }
        return (
          this.options.layoutId &&
            (r.pointerEvents =
              o === this
                ? Pv(null === e || void 0 === e ? void 0 : e.pointerEvents) ||
                  ''
                : 'none'),
          r
        );
      }
      clearSnapshot() {
        this.resumeFrom = this.snapshot = void 0;
      }
      resetTree() {
        this.root.nodes.forEach((e) => {
          var t;
          return null === (t = e.currentAnimation) || void 0 === t
            ? void 0
            : t.stop();
        }),
          this.root.nodes.forEach(Uv),
          this.root.sharedNodes.clear();
      }
    };
  }
  function Nv(e) {
    e.updateLayout();
  }
  function Bv(e) {
    var t;
    const n =
      (null === (t = e.resumeFrom) || void 0 === t ? void 0 : t.snapshot) ||
      e.snapshot;
    if (e.isLead() && e.layout && n && e.hasListeners('didUpdate')) {
      const { layoutBox: t, measuredBox: r } = e.layout,
        { animationType: i } = e.options,
        o = n.source !== e.layout.source;
      'size' === i
        ? xg((e) => {
            const r = o ? n.measuredBox[e] : n.layoutBox[e],
              i = ug(r);
            (r.min = t[e].min), (r.max = r.min + i);
          })
        : ny(i, n.layoutBox, t) &&
          xg((r) => {
            const i = o ? n.measuredBox[r] : n.layoutBox[r],
              a = ug(t[r]);
            (i.max = i.min + a),
              e.relativeTarget &&
                !e.currentAnimation &&
                ((e.isProjectionDirty = !0),
                (e.relativeTarget[r].max = e.relativeTarget[r].min + a));
          });
      const a = {
        x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
      };
      dg(a, t, n.layoutBox);
      const s = {
        x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
      };
      o ? dg(s, e.applyTransform(r, !0), n.measuredBox) : dg(s, t, n.layoutBox);
      const l = !vv(a);
      let u = !1;
      if (!e.resumeFrom) {
        const r = e.getClosestProjectingParent();
        if (r && !r.resumeFrom) {
          const { snapshot: i, layout: o } = r;
          if (i && o) {
            const a = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            pg(a, n.layoutBox, i.layoutBox);
            const s = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            pg(s, t, o.layoutBox),
              bv(a, s) || (u = !0),
              r.options.layoutRoot &&
                ((e.relativeTarget = s),
                (e.relativeTargetOrigin = a),
                (e.relativeParent = r));
          }
        }
      }
      e.notifyListeners('didUpdate', {
        layout: t,
        snapshot: n,
        delta: s,
        layoutDelta: a,
        hasLayoutChanged: l,
        hasRelativeTargetChanged: u,
      });
    } else if (e.isLead()) {
      const { onExitComplete: t } = e.options;
      t && t();
    }
    e.options.transition = void 0;
  }
  function Vv(e) {
    Fv && Tv.totalNodes++,
      e.parent &&
        (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
        e.isSharedProjectionDirty ||
          (e.isSharedProjectionDirty = Boolean(
            e.isProjectionDirty ||
              e.parent.isProjectionDirty ||
              e.parent.isSharedProjectionDirty
          )),
        e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
  }
  function Ov(e) {
    e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
  }
  function Iv(e) {
    e.clearSnapshot();
  }
  function Uv(e) {
    e.clearMeasurements();
  }
  function Zv(e) {
    e.isLayoutDirty = !1;
  }
  function _v(e) {
    const { visualElement: t } = e.options;
    t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'),
      e.resetTransform();
  }
  function Wv(e) {
    e.finishAnimation(),
      (e.targetDelta = e.relativeTarget = e.target = void 0),
      (e.isProjectionDirty = !0);
  }
  function Hv(e) {
    e.resolveTargetDelta();
  }
  function Jv(e) {
    e.calcProjection();
  }
  function Yv(e) {
    e.resetSkewAndRotation();
  }
  function Xv(e) {
    e.removeLeadSnapshot();
  }
  function Qv(e, t, n) {
    (e.translate = xp(t.translate, 0, n)),
      (e.scale = xp(t.scale, 1, n)),
      (e.origin = t.origin),
      (e.originPoint = t.originPoint);
  }
  function Gv(e, t, n, r) {
    (e.min = xp(t.min, n.min, r)), (e.max = xp(t.max, n.max, r));
  }
  function Kv(e) {
    return e.animationValues && void 0 !== e.animationValues.opacityExit;
  }
  const qv = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
    $v = (e) =>
      'undefined' !== typeof navigator &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().includes(e),
    ey = $v('applewebkit/') && !$v('chrome/') ? Math.round : Ld;
  function ty(e) {
    (e.min = ey(e.min)), (e.max = ey(e.max));
  }
  function ny(e, t, n) {
    return (
      'position' === e ||
      ('preserve-aspect' === e &&
        ((r = xv(t)), (i = xv(n)), (o = 0.2), !(Math.abs(r - i) <= o)))
    );
    var r, i, o;
  }
  function ry(e) {
    var t;
    return (
      e !== e.root &&
      (null === (t = e.scroll) || void 0 === t ? void 0 : t.wasRoot)
    );
  }
  const iy = zv({
      attachResizeListener: (e, t) => qm(e, 'resize', t),
      measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop,
      }),
      checkIsScrollRoot: () => !0,
    }),
    oy = { current: void 0 },
    ay = zv({
      measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
      defaultParent: () => {
        if (!oy.current) {
          const e = new iy({});
          e.mount(window), e.setOptions({ layoutScroll: !0 }), (oy.current = e);
        }
        return oy.current;
      },
      resetTransform: (e, t) => {
        e.style.transform = void 0 !== t ? t : 'none';
      },
      checkIsScrollRoot: (e) =>
        Boolean('fixed' === window.getComputedStyle(e).position),
    }),
    sy = {
      pan: {
        Feature: class extends Nm {
          constructor() {
            super(...arguments), (this.removePointerDownListener = Ld);
          }
          onPointerDown(e) {
            this.session = new tg(e, this.createPanHandlers(), {
              transformPagePoint: this.node.getTransformPagePoint(),
              contextWindow: Vg(this.node),
            });
          }
          createPanHandlers() {
            const {
              onPanSessionStart: e,
              onPanStart: t,
              onPan: n,
              onPanEnd: r,
            } = this.node.getProps();
            return {
              onSessionStart: Zg(e),
              onStart: Zg(t),
              onMove: n,
              onEnd: (e, t) => {
                delete this.session, r && ph.postRender(() => r(e, t));
              },
            };
          }
          mount() {
            this.removePointerDownListener = $m(
              this.node.current,
              'pointerdown',
              (e) => this.onPointerDown(e)
            );
          }
          update() {
            this.session &&
              this.session.updateHandlers(this.createPanHandlers());
          }
          unmount() {
            this.removePointerDownListener(),
              this.session && this.session.end();
          }
        },
      },
      drag: {
        Feature: class extends Nm {
          constructor(e) {
            super(e),
              (this.removeGroupControls = Ld),
              (this.removeListeners = Ld),
              (this.controls = new Ig(e));
          }
          mount() {
            const { dragControls: e } = this.node.getProps();
            e && (this.removeGroupControls = e.subscribe(this.controls)),
              (this.removeListeners = this.controls.addListeners() || Ld);
          }
          unmount() {
            this.removeGroupControls(), this.removeListeners();
          }
        },
        ProjectionNode: ay,
        MeasureLayout: qg,
      },
    };
  function ly(e, t, n) {
    const { props: r } = e;
    e.animationState &&
      r.whileHover &&
      e.animationState.setActive('whileHover', 'Start' === n);
    const i = r['onHover' + n];
    i && ph.postRender(() => i(t, Km(t)));
  }
  function uy(e, t, n) {
    const { props: r } = e;
    e.animationState &&
      r.whileTap &&
      e.animationState.setActive('whileTap', 'Start' === n);
    const i = r['onTap' + ('End' === n ? '' : n)];
    i && ph.postRender(() => i(t, Km(t)));
  }
  const cy = ['root'],
    dy = new WeakMap(),
    hy = new WeakMap(),
    fy = (e) => {
      const t = dy.get(e.target);
      t && t(e);
    },
    py = (e) => {
      e.forEach(fy);
    };
  function my(e, t, n) {
    const r = (function (e) {
      let { root: t } = e,
        n = c(e, cy);
      const r = t || document;
      hy.has(r) || hy.set(r, {});
      const i = hy.get(r),
        o = JSON.stringify(n);
      return (
        i[o] || (i[o] = new IntersectionObserver(py, u({ root: t }, n))), i[o]
      );
    })(t);
    return (
      dy.set(e, n),
      r.observe(e),
      () => {
        dy.delete(e), r.unobserve(e);
      }
    );
  }
  const gy = { some: 0, all: 1 };
  const vy = {
      inView: {
        Feature: class extends Nm {
          constructor() {
            super(...arguments),
              (this.hasEnteredView = !1),
              (this.isInView = !1);
          }
          startObserver() {
            this.unmount();
            const { viewport: e = {} } = this.node.getProps(),
              { root: t, margin: n, amount: r = 'some', once: i } = e,
              o = {
                root: t ? t.current : void 0,
                rootMargin: n,
                threshold: 'number' === typeof r ? r : gy[r],
              };
            return my(this.node.current, o, (e) => {
              const { isIntersecting: t } = e;
              if (this.isInView === t) return;
              if (((this.isInView = t), i && !t && this.hasEnteredView)) return;
              t && (this.hasEnteredView = !0),
                this.node.animationState &&
                  this.node.animationState.setActive('whileInView', t);
              const { onViewportEnter: n, onViewportLeave: r } =
                  this.node.getProps(),
                o = t ? n : r;
              o && o(e);
            });
          }
          mount() {
            this.startObserver();
          }
          update() {
            if ('undefined' === typeof IntersectionObserver) return;
            const { props: e, prevProps: t } = this.node,
              n = ['amount', 'margin', 'root'].some(
                (function (e) {
                  let { viewport: t = {} } = e,
                    { viewport: n = {} } =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                  return (e) => t[e] !== n[e];
                })(e, t)
              );
            n && this.startObserver();
          }
          unmount() {}
        },
      },
      tap: {
        Feature: class extends Nm {
          mount() {
            const { current: e } = this.node;
            e &&
              (this.unmount = Gm(
                e,
                (e) => (
                  uy(this.node, e, 'Start'),
                  (e, t) => {
                    let { success: n } = t;
                    return uy(this.node, e, n ? 'End' : 'Cancel');
                  }
                ),
                { useGlobalTarget: this.node.props.globalTapTarget }
              ));
          }
          unmount() {}
        },
      },
      focus: {
        Feature: class extends Nm {
          constructor() {
            super(...arguments), (this.isActive = !1);
          }
          onFocus() {
            let e = !1;
            try {
              e = this.node.current.matches(':focus-visible');
            } catch (Zb) {
              e = !0;
            }
            e &&
              this.node.animationState &&
              (this.node.animationState.setActive('whileFocus', !0),
              (this.isActive = !0));
          }
          onBlur() {
            this.isActive &&
              this.node.animationState &&
              (this.node.animationState.setActive('whileFocus', !1),
              (this.isActive = !1));
          }
          mount() {
            this.unmount = bp(
              qm(this.node.current, 'focus', () => this.onFocus()),
              qm(this.node.current, 'blur', () => this.onBlur())
            );
          }
          unmount() {}
        },
      },
      hover: {
        Feature: class extends Nm {
          mount() {
            const { current: e } = this.node;
            e &&
              (this.unmount = (function (e, t) {
                let n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {};
                const [r, i, o] = Um(e, n),
                  a = Zm((e) => {
                    const { target: n } = e,
                      r = t(e);
                    if (!r || !n) return;
                    const o = Zm((e) => {
                      r(e), n.removeEventListener('pointerleave', o);
                    });
                    n.addEventListener('pointerleave', o, i);
                  });
                return (
                  r.forEach((e) => {
                    e.addEventListener('pointerenter', a, i);
                  }),
                  o
                );
              })(
                e,
                (e) => (
                  ly(this.node, e, 'Start'), (e) => ly(this.node, e, 'End')
                )
              ));
          }
          unmount() {}
        },
      },
    },
    yy = { layout: { ProjectionNode: ay, MeasureLayout: qg } },
    Ay = (0, r.createContext)({}),
    by = (0, r.createContext)({ strict: !1 });
  function xy(e, t, n, i, o) {
    var a, s;
    const { visualElement: l } = (0, r.useContext)(Ay),
      u = (0, r.useContext)(by),
      c = (0, r.useContext)(Pd),
      d = (0, r.useContext)(Td).reducedMotion,
      h = (0, r.useRef)(null);
    (i = i || u.renderer),
      !h.current &&
        i &&
        (h.current = i(e, {
          visualState: t,
          parent: l,
          props: n,
          presenceContext: c,
          blockInitialAnimation: !!c && !1 === c.initial,
          reducedMotionConfig: d,
        }));
    const f = h.current,
      p = (0, r.useContext)(_g);
    !f ||
      f.projection ||
      !o ||
      ('html' !== f.type && 'svg' !== f.type) ||
      (function (e, t, n, r) {
        const {
          layoutId: i,
          layout: o,
          drag: a,
          dragConstraints: s,
          layoutScroll: l,
          layoutRoot: u,
        } = t;
        (e.projection = new n(
          e.latestValues,
          t['data-framer-portal-id'] ? void 0 : wy(e.parent)
        )),
          e.projection.setOptions({
            layoutId: i,
            layout: o,
            alwaysMeasureLayout: Boolean(a) || (s && lg(s)),
            visualElement: e,
            animationType: 'string' === typeof o ? o : 'both',
            initialPromotionConfig: r,
            layoutScroll: l,
            layoutRoot: u,
          });
      })(h.current, n, o, p);
    const m = (0, r.useRef)(!1);
    (0, r.useInsertionEffect)(() => {
      f && m.current && f.update(n, c);
    });
    const g = n[vm],
      v = (0, r.useRef)(
        Boolean(g) &&
          !(null === (a = window.MotionHandoffIsComplete) || void 0 === a
            ? void 0
            : a.call(window, g)) &&
          (null === (s = window.MotionHasOptimisedAnimation) || void 0 === s
            ? void 0
            : s.call(window, g))
      );
    return (
      Id(() => {
        f &&
          ((m.current = !0),
          (window.MotionIsMounted = !0),
          f.updateFeatures(),
          Qg.render(f.render),
          v.current && f.animationState && f.animationState.animateChanges());
      }),
      (0, r.useEffect)(() => {
        f &&
          (!v.current && f.animationState && f.animationState.animateChanges(),
          v.current &&
            (queueMicrotask(() => {
              var e;
              null === (e = window.MotionHandoffMarkAsComplete) ||
                void 0 === e ||
                e.call(window, g);
            }),
            (v.current = !1)));
      }),
      f
    );
  }
  function wy(e) {
    if (e)
      return !1 !== e.options.allowProjection ? e.projection : wy(e.parent);
  }
  function Sy(e, t, n) {
    return (0, r.useCallback)(
      (r) => {
        r && e.mount && e.mount(r),
          t && (r ? t.mount(r) : t.unmount()),
          n && ('function' === typeof n ? n(r) : lg(n) && (n.current = r));
      },
      [t]
    );
  }
  function ky(e) {
    return _d(e.animate) || Kd.some((t) => Jd(e[t]));
  }
  function Ey(e) {
    return Boolean(ky(e) || e.variants);
  }
  function Py(e) {
    const { initial: t, animate: n } = (function (e, t) {
      if (ky(e)) {
        const { initial: t, animate: n } = e;
        return {
          initial: !1 === t || Jd(t) ? t : void 0,
          animate: Jd(n) ? n : void 0,
        };
      }
      return !1 !== e.inherit ? t : {};
    })(e, (0, r.useContext)(Ay));
    return (0, r.useMemo)(() => ({ initial: t, animate: n }), [Cy(t), Cy(n)]);
  }
  function Cy(e) {
    return Array.isArray(e) ? e.join(' ') : e;
  }
  const Ty = {
      animation: [
        'animate',
        'variants',
        'whileHover',
        'whileTap',
        'exit',
        'whileInView',
        'whileFocus',
        'whileDrag',
      ],
      exit: ['exit'],
      drag: ['drag', 'dragControls'],
      focus: ['whileFocus'],
      hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
      tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
      pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
      inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
      layout: ['layout', 'layoutId'],
    },
    Fy = {};
  for (const Wb in Ty)
    Fy[Wb] = { isEnabled: (e) => Ty[Wb].some((t) => !!e[t]) };
  const Dy = Symbol.for('motionComponentSymbol');
  function My(e) {
    let {
      preloadedFeatures: t,
      createVisualElement: n,
      useRender: i,
      useVisualState: o,
      Component: a,
    } = e;
    t &&
      (function (e) {
        for (const t in e) Fy[t] = u(u({}, Fy[t]), e[t]);
      })(t);
    const s = (0, r.forwardRef)(function (e, t) {
      let s;
      const l = u(u(u({}, (0, r.useContext)(Td)), e), {}, { layoutId: Ry(e) }),
        { isStatic: c } = l,
        d = Py(e),
        h = o(e, c);
      if (!c && Od) {
        !(function () {
          (0, r.useContext)(by).strict;
          0;
        })();
        const e = (function (e) {
          const { drag: t, layout: n } = Fy;
          if (!t && !n) return {};
          const r = u(u({}, t), n);
          return {
            MeasureLayout:
              (null === t || void 0 === t ? void 0 : t.isEnabled(e)) ||
              (null === n || void 0 === n ? void 0 : n.isEnabled(e))
                ? r.MeasureLayout
                : void 0,
            ProjectionNode: r.ProjectionNode,
          };
        })(l);
        (s = e.MeasureLayout),
          (d.visualElement = xy(a, h, l, n, e.ProjectionNode));
      }
      return (0, Fn.jsxs)(Ay.Provider, {
        value: d,
        children: [
          s && d.visualElement
            ? (0, Fn.jsx)(s, u({ visualElement: d.visualElement }, l))
            : null,
          i(a, e, Sy(h, d.visualElement, t), h, c, d.visualElement),
        ],
      });
    });
    return (s[Dy] = a), s;
  }
  function Ry(e) {
    let { layoutId: t } = e;
    const n = (0, r.useContext)(jd).id;
    return n && void 0 !== t ? n + '-' + t : t;
  }
  const jy = [
    'animate',
    'circle',
    'defs',
    'desc',
    'ellipse',
    'g',
    'image',
    'line',
    'filter',
    'marker',
    'mask',
    'metadata',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'rect',
    'stop',
    'switch',
    'symbol',
    'svg',
    'text',
    'tspan',
    'use',
    'view',
  ];
  function Ly(e) {
    return (
      'string' === typeof e &&
      !e.includes('-') &&
      !!(jy.indexOf(e) > -1 || /[A-Z]/.test(e))
    );
  }
  function zy(e, t, n, r) {
    let { style: i, vars: o } = t;
    Object.assign(e.style, i, r && r.getProjectionStyles(n));
    for (const a in o) e.style.setProperty(a, o[a]);
  }
  const Ny = new Set([
    'baseFrequency',
    'diffuseConstant',
    'kernelMatrix',
    'kernelUnitLength',
    'keySplines',
    'keyTimes',
    'limitingConeAngle',
    'markerHeight',
    'markerWidth',
    'numOctaves',
    'targetX',
    'targetY',
    'surfaceScale',
    'specularConstant',
    'specularExponent',
    'stdDeviation',
    'tableValues',
    'viewBox',
    'gradientTransform',
    'pathLength',
    'startOffset',
    'textLength',
    'lengthAdjust',
  ]);
  function By(e, t, n, r) {
    zy(e, t, void 0, r);
    for (const i in t.attrs) e.setAttribute(Ny.has(i) ? i : gm(i), t.attrs[i]);
  }
  function Vy(e, t) {
    let { layout: n, layoutId: r } = t;
    return (
      $d.has(e) ||
      e.startsWith('origin') ||
      ((n || void 0 !== r) && (!!Xg[e] || 'opacity' === e))
    );
  }
  function Oy(e, t, n) {
    var r;
    const { style: i } = e,
      o = {};
    for (const a in i)
      (Am(i[a]) ||
        (t.style && Am(t.style[a])) ||
        Vy(a, e) ||
        void 0 !==
          (null === (r = null === n || void 0 === n ? void 0 : n.getValue(a)) ||
          void 0 === r
            ? void 0
            : r.liveStyle)) &&
        (o[a] = i[a]);
    return o;
  }
  function Iy(e, t, n) {
    const r = Oy(e, t, n);
    for (const i in e)
      if (Am(e[i]) || Am(t[i])) {
        r[
          -1 !== qd.indexOf(i)
            ? 'attr' + i.charAt(0).toUpperCase() + i.substring(1)
            : i
        ] = e[i];
      }
    return r;
  }
  const Uy = ['transitionEnd', 'transition'];
  const Zy = (e) => (t, n) => {
    const i = (0, r.useContext)(Ay),
      o = (0, r.useContext)(Pd),
      a = () =>
        (function (e, t, n, r) {
          let {
            scrapeMotionValuesFromProps: i,
            createRenderState: o,
            onMount: a,
          } = e;
          const s = { latestValues: _y(t, n, r, i), renderState: o() };
          return a && (s.mount = (e) => a(t, e, s)), s;
        })(e, t, i, o);
    return n ? a() : Cd(a);
  };
  function _y(e, t, n, r) {
    const i = {},
      o = r(e, {});
    for (const c in o) i[c] = Pv(o[c]);
    let { initial: a, animate: s } = e;
    const l = ky(e),
      u = Ey(e);
    t &&
      u &&
      !l &&
      !1 !== e.inherit &&
      (void 0 === a && (a = t.initial), void 0 === s && (s = t.animate));
    let d = !!n && !1 === n.initial;
    d = d || !1 === a;
    const h = d ? s : a;
    if (h && 'boolean' !== typeof h && !_d(h)) {
      const t = Array.isArray(h) ? h : [h];
      for (let n = 0; n < t.length; n++) {
        const r = Xd(e, t[n]);
        if (r) {
          const { transitionEnd: e, transition: t } = r,
            n = c(r, Uy);
          for (const r in n) {
            let e = n[r];
            if (Array.isArray(e)) {
              e = e[d ? e.length - 1 : 0];
            }
            null !== e && (i[r] = e);
          }
          for (const r in e) i[r] = e[r];
        }
      }
    }
    return i;
  }
  const Wy = () => ({
      style: {},
      transform: {},
      transformOrigin: {},
      vars: {},
    }),
    Hy = () =>
      u(
        u({}, { style: {}, transform: {}, transformOrigin: {}, vars: {} }),
        {},
        { attrs: {} }
      ),
    Jy = (e, t) => (t && 'number' === typeof e ? t.transform(e) : e),
    Yy = {
      x: 'translateX',
      y: 'translateY',
      z: 'translateZ',
      transformPerspective: 'perspective',
    },
    Xy = qd.length;
  function Qy(e, t, n) {
    const { style: r, vars: i, transformOrigin: o } = e;
    let a = !1,
      s = !1;
    for (const l in t) {
      const e = t[l];
      if ($d.has(l)) a = !0;
      else if (Rh(l)) i[l] = e;
      else {
        const t = Jy(e, Vf[l]);
        l.startsWith('origin') ? ((s = !0), (o[l] = t)) : (r[l] = t);
      }
    }
    if (
      (t.transform ||
        (a || n
          ? (r.transform = (function (e, t, n) {
              let r = '',
                i = !0;
              for (let o = 0; o < Xy; o++) {
                const a = qd[o],
                  s = e[a];
                if (void 0 === s) continue;
                let l = !0;
                if (
                  ((l =
                    'number' === typeof s
                      ? s === (a.startsWith('scale') ? 1 : 0)
                      : 0 === parseFloat(s)),
                  !l || n)
                ) {
                  const e = Jy(s, Vf[a]);
                  l ||
                    ((i = !1),
                    (r += ''.concat(Yy[a] || a, '(').concat(e, ') '))),
                    n && (t[a] = e);
                }
              }
              return (
                (r = r.trim()),
                n ? (r = n(t, i ? '' : r)) : i && (r = 'none'),
                r
              );
            })(t, e.transform, n))
          : r.transform && (r.transform = 'none')),
      s)
    ) {
      const { originX: e = '50%', originY: t = '50%', originZ: n = 0 } = o;
      r.transformOrigin = ''.concat(e, ' ').concat(t, ' ').concat(n);
    }
  }
  function Gy(e, t, n) {
    return 'string' === typeof e ? e : Hh.transform(t + n * e);
  }
  const Ky = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
    qy = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
  const $y = [
    'attrX',
    'attrY',
    'attrScale',
    'originX',
    'originY',
    'pathLength',
    'pathSpacing',
    'pathOffset',
  ];
  function eA(e, t, n, r) {
    let {
      attrX: i,
      attrY: o,
      attrScale: a,
      originX: s,
      originY: l,
      pathLength: u,
      pathSpacing: d = 1,
      pathOffset: h = 0,
    } = t;
    if ((Qy(e, c(t, $y), r), n))
      return void (e.style.viewBox && (e.attrs.viewBox = e.style.viewBox));
    (e.attrs = e.style), (e.style = {});
    const { attrs: f, style: p, dimensions: m } = e;
    f.transform && (m && (p.transform = f.transform), delete f.transform),
      m &&
        (void 0 !== s || void 0 !== l || p.transform) &&
        (p.transformOrigin = (function (e, t, n) {
          const r = Gy(t, e.x, e.width),
            i = Gy(n, e.y, e.height);
          return ''.concat(r, ' ').concat(i);
        })(m, void 0 !== s ? s : 0.5, void 0 !== l ? l : 0.5)),
      void 0 !== i && (f.x = i),
      void 0 !== o && (f.y = o),
      void 0 !== a && (f.scale = a),
      void 0 !== u &&
        (function (e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 1,
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 0,
            i =
              !(arguments.length > 4 && void 0 !== arguments[4]) ||
              arguments[4];
          e.pathLength = 1;
          const o = i ? Ky : qy;
          e[o.offset] = Hh.transform(-r);
          const a = Hh.transform(t),
            s = Hh.transform(n);
          e[o.array] = ''.concat(a, ' ').concat(s);
        })(f, u, d, h, !1);
  }
  const tA = (e) => 'string' === typeof e && 'svg' === e.toLowerCase(),
    nA = {
      useVisualState: Zy({
        scrapeMotionValuesFromProps: Iy,
        createRenderState: Hy,
        onMount: (e, t, n) => {
          let { renderState: r, latestValues: i } = n;
          ph.read(() => {
            try {
              r.dimensions =
                'function' === typeof t.getBBox
                  ? t.getBBox()
                  : t.getBoundingClientRect();
            } catch (Zb) {
              r.dimensions = { x: 0, y: 0, width: 0, height: 0 };
            }
          }),
            ph.render(() => {
              eA(r, i, tA(t.tagName), e.transformTemplate), By(t, r);
            });
        },
      }),
    },
    rA = {
      useVisualState: Zy({
        scrapeMotionValuesFromProps: Oy,
        createRenderState: Wy,
      }),
    };
  function iA(e, t, n) {
    for (const r in t) Am(t[r]) || Vy(r, n) || (e[r] = t[r]);
  }
  function oA(e, t) {
    const n = {};
    return (
      iA(n, e.style || {}, e),
      Object.assign(
        n,
        (function (e, t) {
          let { transformTemplate: n } = e;
          return (0, r.useMemo)(() => {
            const e = {
              style: {},
              transform: {},
              transformOrigin: {},
              vars: {},
            };
            return Qy(e, t, n), Object.assign({}, e.vars, e.style);
          }, [t]);
        })(e, t)
      ),
      n
    );
  }
  function aA(e, t) {
    const n = {},
      r = oA(e, t);
    return (
      e.drag &&
        !1 !== e.dragListener &&
        ((n.draggable = !1),
        (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = 'none'),
        (r.touchAction =
          !0 === e.drag ? 'none' : 'pan-'.concat('x' === e.drag ? 'y' : 'x'))),
      void 0 === e.tabIndex &&
        (e.onTap || e.onTapStart || e.whileTap) &&
        (n.tabIndex = 0),
      (n.style = r),
      n
    );
  }
  const sA = new Set([
    'animate',
    'exit',
    'variants',
    'initial',
    'style',
    'values',
    'variants',
    'transition',
    'transformTemplate',
    'custom',
    'inherit',
    'onBeforeLayoutMeasure',
    'onAnimationStart',
    'onAnimationComplete',
    'onUpdate',
    'onDragStart',
    'onDrag',
    'onDragEnd',
    'onMeasureDragConstraints',
    'onDirectionLock',
    'onDragTransitionEnd',
    '_dragX',
    '_dragY',
    'onHoverStart',
    'onHoverEnd',
    'onViewportEnter',
    'onViewportLeave',
    'globalTapTarget',
    'ignoreStrict',
    'viewport',
  ]);
  function lA(e) {
    return (
      e.startsWith('while') ||
      (e.startsWith('drag') && 'draggable' !== e) ||
      e.startsWith('layout') ||
      e.startsWith('onTap') ||
      e.startsWith('onPan') ||
      e.startsWith('onLayout') ||
      sA.has(e)
    );
  }
  let uA = (e) => !lA(e);
  try {
    !(function (e) {
      e && (uA = (t) => (t.startsWith('on') ? !lA(t) : e(t)));
    })(require('@emotion/is-prop-valid').default);
  } catch (_b) {}
  function cA(e, t, n, i) {
    const o = (0, r.useMemo)(() => {
      const n = Hy();
      return (
        eA(n, t, tA(i), e.transformTemplate),
        u(u({}, n.attrs), {}, { style: u({}, n.style) })
      );
    }, [t]);
    if (e.style) {
      const t = {};
      iA(t, e.style, e), (o.style = u(u({}, t), o.style));
    }
    return o;
  }
  function dA() {
    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    return (t, n, i, o, a) => {
      let { latestValues: s } = o;
      const l = (Ly(t) ? cA : aA)(n, s, a, t),
        c = (function (e, t, n) {
          const r = {};
          for (const i in e)
            ('values' === i && 'object' === typeof e.values) ||
              ((uA(i) ||
                (!0 === n && lA(i)) ||
                (!t && !lA(i)) ||
                (e.draggable && i.startsWith('onDrag'))) &&
                (r[i] = e[i]));
          return r;
        })(n, 'string' === typeof t, e),
        d = t !== r.Fragment ? u(u(u({}, c), l), {}, { ref: i }) : {},
        { children: h } = n,
        f = (0, r.useMemo)(() => (Am(h) ? h.get() : h), [h]);
      return (0, r.createElement)(t, u(u({}, d), {}, { children: f }));
    };
  }
  function hA(e, t) {
    return function (n) {
      let { forwardMotionProps: r } =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : { forwardMotionProps: !1 };
      return My(
        u(
          u({}, Ly(n) ? nA : rA),
          {},
          {
            preloadedFeatures: e,
            useRender: dA(r),
            createVisualElement: t,
            Component: n,
          }
        )
      );
    };
  }
  const fA = { current: null },
    pA = { current: !1 };
  const mA = new WeakMap(),
    gA = [...rf, xf, Df],
    vA = ['willChange'],
    yA = [
      'AnimationStart',
      'AnimationComplete',
      'Update',
      'BeforeLayoutMeasure',
      'LayoutMeasure',
      'LayoutAnimationStart',
      'LayoutAnimationComplete',
    ];
  class AA {
    scrapeMotionValuesFromProps(e, t, n) {
      return {};
    }
    constructor(e) {
      let {
          parent: t,
          props: n,
          presenceContext: r,
          reducedMotionConfig: i,
          blockInitialAnimation: o,
          visualState: a,
        } = e,
        s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      (this.current = null),
        (this.children = new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.values = new Map()),
        (this.KeyframeResolver = df),
        (this.features = {}),
        (this.valueSubscriptions = new Map()),
        (this.prevMotionValues = {}),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
        (this.render = () => {
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(
              this.current,
              this.renderState,
              this.props.style,
              this.projection
            ));
        }),
        (this.renderScheduledAt = 0),
        (this.scheduleRender = () => {
          const e = Yf.now();
          this.renderScheduledAt < e &&
            ((this.renderScheduledAt = e), ph.render(this.render, !1, !0));
        });
      const { latestValues: l, renderState: d } = a;
      (this.latestValues = l),
        (this.baseTarget = u({}, l)),
        (this.initialValues = n.initial ? u({}, l) : {}),
        (this.renderState = d),
        (this.parent = t),
        (this.props = n),
        (this.presenceContext = r),
        (this.depth = t ? t.depth + 1 : 0),
        (this.reducedMotionConfig = i),
        (this.options = s),
        (this.blockInitialAnimation = Boolean(o)),
        (this.isControllingVariants = ky(n)),
        (this.isVariantNode = Ey(n)),
        this.isVariantNode && (this.variantChildren = new Set()),
        (this.manuallyAnimateOnMount = Boolean(t && t.current));
      const h = this.scrapeMotionValuesFromProps(n, {}, this),
        { willChange: f } = h,
        p = c(h, vA);
      for (const u in p) {
        const e = p[u];
        void 0 !== l[u] && Am(e) && e.set(l[u], !1);
      }
    }
    mount(e) {
      (this.current = e),
        mA.set(e, this),
        this.projection &&
          !this.projection.instance &&
          this.projection.mount(e),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((e, t) => this.bindToMotionValue(t, e)),
        pA.current ||
          (function () {
            if (((pA.current = !0), Od))
              if (window.matchMedia) {
                const e = window.matchMedia('(prefers-reduced-motion)'),
                  t = () => (fA.current = e.matches);
                e.addListener(t), t();
              } else fA.current = !1;
          })(),
        (this.shouldReduceMotion =
          'never' !== this.reducedMotionConfig &&
          ('always' === this.reducedMotionConfig || fA.current)),
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext);
    }
    unmount() {
      mA.delete(this.current),
        this.projection && this.projection.unmount(),
        mh(this.notifyUpdate),
        mh(this.render),
        this.valueSubscriptions.forEach((e) => e()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this);
      for (const e in this.events) this.events[e].clear();
      for (const e in this.features) {
        const t = this.features[e];
        t && (t.unmount(), (t.isMounted = !1));
      }
      this.current = null;
    }
    bindToMotionValue(e, t) {
      this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
      const n = $d.has(e),
        r = t.on('change', (t) => {
          (this.latestValues[e] = t),
            this.props.onUpdate && ph.preRender(this.notifyUpdate),
            n && this.projection && (this.projection.isTransformDirty = !0);
        }),
        i = t.on('renderRequest', this.scheduleRender);
      let o;
      window.MotionCheckAppearSync &&
        (o = window.MotionCheckAppearSync(this, e, t)),
        this.valueSubscriptions.set(e, () => {
          r(), i(), o && o(), t.owner && t.stop();
        });
    }
    sortNodePosition(e) {
      return this.current &&
        this.sortInstanceNodePosition &&
        this.type === e.type
        ? this.sortInstanceNodePosition(this.current, e.current)
        : 0;
    }
    updateFeatures() {
      let e = 'animation';
      for (e in Fy) {
        const t = Fy[e];
        if (!t) continue;
        const { isEnabled: n, Feature: r } = t;
        if (
          (!this.features[e] &&
            r &&
            n(this.props) &&
            (this.features[e] = new r(this)),
          this.features[e])
        ) {
          const t = this.features[e];
          t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    measureViewportBox() {
      return this.current
        ? this.measureInstanceViewportBox(this.current, this.props)
        : { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    }
    getStaticValue(e) {
      return this.latestValues[e];
    }
    setStaticValue(e, t) {
      this.latestValues[e] = t;
    }
    update(e, t) {
      (e.transformTemplate || this.props.transformTemplate) &&
        this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = e),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = t);
      for (let n = 0; n < yA.length; n++) {
        const t = yA[n];
        this.propEventSubscriptions[t] &&
          (this.propEventSubscriptions[t](),
          delete this.propEventSubscriptions[t]);
        const r = e['on' + t];
        r && (this.propEventSubscriptions[t] = this.on(t, r));
      }
      (this.prevMotionValues = (function (e, t, n) {
        for (const r in t) {
          const i = t[r],
            o = n[r];
          if (Am(i)) e.addValue(r, i);
          else if (Am(o)) e.addValue(r, fm(i, { owner: e }));
          else if (o !== i)
            if (e.hasValue(r)) {
              const t = e.getValue(r);
              !0 === t.liveStyle ? t.jump(i) : t.hasAnimated || t.set(i);
            } else {
              const t = e.getStaticValue(r);
              e.addValue(r, fm(void 0 !== t ? t : i, { owner: e }));
            }
        }
        for (const r in n) void 0 === t[r] && e.removeValue(r);
        return t;
      })(
        this,
        this.scrapeMotionValuesFromProps(e, this.prevProps, this),
        this.prevMotionValues
      )),
        this.handleChildMotionValue && this.handleChildMotionValue();
    }
    getProps() {
      return this.props;
    }
    getVariant(e) {
      return this.props.variants ? this.props.variants[e] : void 0;
    }
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode
        ? this
        : this.parent
          ? this.parent.getClosestVariantNode()
          : void 0;
    }
    addVariantChild(e) {
      const t = this.getClosestVariantNode();
      if (t)
        return (
          t.variantChildren && t.variantChildren.add(e),
          () => t.variantChildren.delete(e)
        );
    }
    addValue(e, t) {
      const n = this.values.get(e);
      t !== n &&
        (n && this.removeValue(e),
        this.bindToMotionValue(e, t),
        this.values.set(e, t),
        (this.latestValues[e] = t.get()));
    }
    removeValue(e) {
      this.values.delete(e);
      const t = this.valueSubscriptions.get(e);
      t && (t(), this.valueSubscriptions.delete(e)),
        delete this.latestValues[e],
        this.removeValueFromRenderState(e, this.renderState);
    }
    hasValue(e) {
      return this.values.has(e);
    }
    getValue(e, t) {
      if (this.props.values && this.props.values[e])
        return this.props.values[e];
      let n = this.values.get(e);
      return (
        void 0 === n &&
          void 0 !== t &&
          ((n = fm(null === t ? void 0 : t, { owner: this })),
          this.addValue(e, n)),
        n
      );
    }
    readValue(e, t) {
      var n;
      let r =
        void 0 === this.latestValues[e] && this.current
          ? null !== (n = this.getBaseTargetFromProps(this.props, e)) &&
            void 0 !== n
            ? n
            : this.readValueFromInstance(this.current, e, this.options)
          : this.latestValues[e];
      var i;
      return (
        void 0 !== r &&
          null !== r &&
          ('string' === typeof r && (Dh(r) || Fh(r))
            ? (r = parseFloat(r))
            : ((i = r), !gA.find(nf(i)) && Df.test(t) && (r = Uf(e, t))),
          this.setBaseTarget(e, Am(r) ? r.get() : r)),
        Am(r) ? r.get() : r
      );
    }
    setBaseTarget(e, t) {
      this.baseTarget[e] = t;
    }
    getBaseTarget(e) {
      var t;
      const { initial: n } = this.props;
      let r;
      if ('string' === typeof n || 'object' === typeof n) {
        const i = Xd(
          this.props,
          n,
          null === (t = this.presenceContext) || void 0 === t
            ? void 0
            : t.custom
        );
        i && (r = i[e]);
      }
      if (n && void 0 !== r) return r;
      const i = this.getBaseTargetFromProps(this.props, e);
      return void 0 === i || Am(i)
        ? void 0 !== this.initialValues[e] && void 0 === r
          ? void 0
          : this.baseTarget[e]
        : i;
    }
    on(e, t) {
      return (
        this.events[e] || (this.events[e] = new cm()), this.events[e].add(t)
      );
    }
    notify(e) {
      if (this.events[e]) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
          r < t;
          r++
        )
          n[r - 1] = arguments[r];
        this.events[e].notify(...n);
      }
    }
  }
  class bA extends AA {
    constructor() {
      super(...arguments), (this.KeyframeResolver = _f);
    }
    sortInstanceNodePosition(e, t) {
      return 2 & e.compareDocumentPosition(t) ? 1 : -1;
    }
    getBaseTargetFromProps(e, t) {
      return e.style ? e.style[t] : void 0;
    }
    removeValueFromRenderState(e, t) {
      let { vars: n, style: r } = t;
      delete n[e], delete r[e];
    }
    handleChildMotionValue() {
      this.childSubscription &&
        (this.childSubscription(), delete this.childSubscription);
      const { children: e } = this.props;
      Am(e) &&
        (this.childSubscription = e.on('change', (e) => {
          this.current && (this.current.textContent = ''.concat(e));
        }));
    }
  }
  class xA extends bA {
    constructor() {
      super(...arguments), (this.type = 'html'), (this.renderInstance = zy);
    }
    readValueFromInstance(e, t) {
      if ($d.has(t)) {
        const e = If(t);
        return (e && e.default) || 0;
      }
      {
        const r = ((n = e), window.getComputedStyle(n)),
          i = (Rh(t) ? r.getPropertyValue(t) : r[t]) || 0;
        return 'string' === typeof i ? i.trim() : i;
      }
      var n;
    }
    measureInstanceViewportBox(e, t) {
      let { transformPagePoint: n } = t;
      return Bg(e, n);
    }
    build(e, t, n) {
      Qy(e, t, n.transformTemplate);
    }
    scrapeMotionValuesFromProps(e, t, n) {
      return Oy(e, t, n);
    }
  }
  class wA extends bA {
    constructor() {
      super(...arguments),
        (this.type = 'svg'),
        (this.isSVGTag = !1),
        (this.measureInstanceViewportBox = bg);
    }
    getBaseTargetFromProps(e, t) {
      return e[t];
    }
    readValueFromInstance(e, t) {
      if ($d.has(t)) {
        const e = If(t);
        return (e && e.default) || 0;
      }
      return (t = Ny.has(t) ? t : gm(t)), e.getAttribute(t);
    }
    scrapeMotionValuesFromProps(e, t, n) {
      return Iy(e, t, n);
    }
    build(e, t, n) {
      eA(e, t, this.isSVGTag, n.transformTemplate);
    }
    renderInstance(e, t, n, r) {
      By(e, t, 0, r);
    }
    mount(e) {
      (this.isSVGTag = tA(e.tagName)), super.mount(e);
    }
  }
  const SA = (e, t) =>
      Ly(e) ? new wA(t) : new xA(t, { allowProjection: e !== r.Fragment }),
    kA = Zd(hA(u(u(u(u({}, Vm), vy), sy), yy), SA));
  function EA(e) {
    let { images: t } = e;
    const { currentSlide: n, animateTransition: r } = Ed();
    return (0, Fn.jsx)('div', {
      className: 'relative w-full h-full flex items-center justify-center',
      children: (0, Fn.jsx)(Ud, {
        children: (0, Fn.jsx)(
          kA.div,
          {
            className: ' w-full max-w-xl rounded-xl overflow-hidden ',
            initial: {
              opacity: 0,
              y: 50,
              scale: 0.8,
              rotateY: -30,
              rotateX: -30,
            },
            animate: { opacity: 1, y: 0, scale: 1, rotateY: 0, rotateX: 0 },
            exit: { opacity: 0, y: -50, scale: 0.6, rotateY: 30, rotateX: 30 },
            transition: r,
            children: (0, Fn.jsx)(kA.img, {
              src: t[n],
              alt: 'Slide '.concat(n),
              className: 'w-full h-full object-cover',
            }),
          },
          n
        ),
      }),
    });
  }
  const PA = (0, r.memo)(EA);
  const CA =
    n.p +
    'static/media/Product_development_ang_prototype.86d7d2b7da371c244493f78ffb2593eb.svg';
  const TA =
    n.p + 'static/media/CAD_modeling.9658fc7e4b6567d31da768143cfd2b4c.svg';
  function FA(e) {
    let { keyPoints: t } = e;
    const { currentSlide: n, animateTransition: r } = Ed();
    return (0, Fn.jsx)('div', {
      className:
        'relative w-full flex md:justify-start justify-center items-center',
      children: (0, Fn.jsx)(Ud, {
        mode: 'wait',
        children: (0, Fn.jsx)(
          kA.h2,
          {
            className:
              'text-3xl lg:text-5xl font-extrabold text-center bg-gradient-to-r py-2 tracking-wide from-blue-600 via-blue-950  to-gray-700 drop-shadow-xl  bg-clip-text text-transparent',
            initial: { opacity: 0, x: -50, rotateX: -30, scale: 0.8 },
            animate: { opacity: 1, x: 0, rotateX: 0, scale: 1 },
            exit: { opacity: 0, x: 50, rotateX: 30, scale: 0.8 },
            transition: { animateTransition: r },
            children: t[n],
          },
          n
        ),
      }),
    });
  }
  const DA = (0, r.memo)(FA),
    MA = [dd, CA, TA];
  function RA() {
    var e, t;
    return (0, Fn.jsx)(kd, {
      delay: 1e4,
      length: MA.length,
      children: (0, Fn.jsx)(cd, {
        children: (0, Fn.jsxs)('div', {
          className:
            'relative md:bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-10 sm:py-20 md:py-18 lg:py-24 px-6  md:px-8 lg:px-12 min-h-screen flex items-center justify-center',
          children: [
            (0, Fn.jsx)('div', {
              className:
                'border-sky-700 md:border-l-2 lg:border-l-4 absolute inset-0 bg-gradient-to-bl from-sky-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-bl-none sm:rounded-bl-[18%] lg:rounded-bl-[38%] pointer-events-none',
            }),
            (0, Fn.jsxs)('div', {
              className:
                'relative lg:container lg:px-0 px-3 sm:px-6 mx-auto flex flex-col-reverse  md:flex-row  md:items-center md:gap-x-8 lg:gap-x-10 md:justify-between',
              children: [
                (0, Fn.jsxs)('div', {
                  className:
                    'text-center sm:text-left h-full w-full md:w-1/2 lg:w-3/5',
                  children: [
                    (0, Fn.jsx)('h1', {
                      className:
                        'text-3xl md:text-left text-center md:text-5xl md:font-bold lg:font-extrabold font-serif leading-tight mb-2 bg-gradient-to-tr from-blue-500 via-sky-900 to-blue-800 bg-clip-text text-transparent pt-4 pb-2',
                      children:
                        null === gd ||
                        void 0 === gd ||
                        null === (e = gd.hero) ||
                        void 0 === e
                          ? void 0
                          : e.title,
                    }),
                    (0, Fn.jsx)(DA, {
                      keyPoints: [
                        'Cad Modeling',
                        '3d Designing',
                        'Proto Typing',
                      ],
                    }),
                    (0, Fn.jsx)('p', {
                      className:
                        'text-lg lg:text-xl text-navy-700 leading-relaxed',
                      children:
                        null === gd ||
                        void 0 === gd ||
                        null === (t = gd.hero) ||
                        void 0 === t
                          ? void 0
                          : t.content,
                    }),
                  ],
                }),
                (0, Fn.jsx)('div', {
                  className:
                    'w-full h-full relative md:w-1/2 lg:w-2/5 mt-12 md:mt-0 ',
                  children: (0, Fn.jsx)(PA, { images: MA }),
                }),
              ],
            }),
          ],
        }),
      }),
    });
  }
  const jA = (0, r.memo)(RA);
  function LA() {
    return (0, Fn.jsx)(cd, { id: 'home', children: (0, Fn.jsx)(jA, {}) });
  }
  function zA() {
    return (0, Fn.jsx)(cd, {
      id: 'about-us',
      className: 'about-us flex items-center justify-center',
      children: (0, Fn.jsx)('div', {
        className: 'relative py-20 px-6 w-full bg-transparent',
        children: (0, Fn.jsxs)('div', {
          className:
            ' container mx-auto flex sm:flex-row flex-col items-center gap-10',
          children: [
            (0, Fn.jsx)('div', {
              className: 'w-full md:w-1/3',
              children: (0, Fn.jsx)('img', {
                src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBdRXhpZgAASUkqAAgAAAADAA4BAgATAAAAMgAAABoBBQABAAAARQAAABsBBQABAAAATQAAAAAAAABWZWN0b3IgaWxsdXN0cmF0aW9uLAEAAAEAAAAsAQAAAQAAAP/hBX9odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgcGhvdG9zaG9wOkNyZWRpdD0iR2V0dHkgSW1hZ2VzIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iMTQ3MzEyMTA2MSIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL2xlZ2FsL2xpY2Vuc2UtYWdyZWVtZW50P3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiBwbHVzOkRhdGFNaW5pbmc9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYvdm9jYWIvRE1JLVBST0hJQklURUQtRVhDRVBUU0VBUkNIRU5HSU5FSU5ERVhJTkciID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT50b3RhPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5WZWN0b3IgaWxsdXN0cmF0aW9uPC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6ZGVzY3JpcHRpb24+CjxwbHVzOkxpY2Vuc29yPjxyZGY6U2VxPjxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPjxwbHVzOkxpY2Vuc29yVVJMPmh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9waG90by9saWNlbnNlLWdtMTQ3MzEyMTA2MS0/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmw8L3BsdXM6TGljZW5zb3JVUkw+PC9yZGY6bGk+PC9yZGY6U2VxPjwvcGx1czpMaWNlbnNvcj4KCQk8L3JkZjpEZXNjcmlwdGlvbj4KCTwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InciPz4K/+0ATlBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAyHAJQAAR0b3RhHAJ4ABNWZWN0b3IgaWxsdXN0cmF0aW9uHAJuAAxHZXR0eSBJbWFnZXP/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wgARCAFYAmQDAREAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/9oADAMBAAIQAxAAAAH9mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHDfPvjoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB598vH14/T8/rAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHfPydeI+j5/UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABx3z8vTiB9Dh6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABx3jy9OQA9/D0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcd48/TkEAe7j6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABw6c+GuZaAD28u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAieffPnrIAAHs5dgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIefpyxZQAAD18uwAAAAAAAAAAAAAAAAAAAAAAEAAAAAABKFCDFnDfOApACgHq5dgAAAAAAAAAAAAAAAAAAAAAAAAqAIAAIAAE5bzy1gAAABLT1c+oAAAAAAAAAAAAAAAAAqiIAAAAAAIAAACIoROO8ZsAgAAAJXt49gAAAAAAAAAAAAAAAAAAICggAAAAIBYAAIYueW8ACAAAAlg9nHuAAAAAAAAAAAAAAAAAAAAAAIAigBAAAEzXPWM2AQAAAlEAHs49wAAAAAAAAAAAAAAABCkAFAgAEAAAASAVDFzjWQIAACUQAAD18uwAAAAAAAAAAAAAAAAAgAAAACQAAUIAYucayIAACgAKgBYC+jn0AAAAAAAAAAAAAAAAAAJAAKAEAABEAzZjWYCgKigAAgsS0pVRTedAAAChQQAFJAAAAAAKAAAgAAACQAUBAZszcwoKqFIAAlCxSygAAdJoAAAAAAAAAACAAAAAAJAAAKgAQCAzZLAAAAAALLSqEAAADc0AQoAAAAAAAAJABQQAAqAABAIABUQQlgAAAgAKWUCqKAIAAGpQpACkKAAAQoACABAUgAAgAAFCBAICWQAAAABC0SgAAUoUUAAiWWgAAAAAEAKQAAAAVICgQAQAAlggAAACQUBZaAAAAAAWWqABz1gWKtlq2AFIAEFAAEAAAgAAAJYBCIoWAIKAAAgLFUAAAAAAAULYoOesgAAWUUsopAAAAASghQIBAElQJChaAQAAAIAWqAAAAAEi0gAAS01Lz1kAAAEBQBQAIApAKEAQQUBEFWwUAgAEAFBFUAAAAAAAAAAACIAAAAAAoAAACAAIAAIClUAACIAABZdKACkQFACAJAAKAAAGpcpKAAABAABCkAAAAAsEBSygAAAoFBCllsooAAAAAABElEhLAAANTQJmogAAAAEsssFAgAAgABVsAAUKACAQq6loAAAAAAAAAAAMpKiSwamgCCEsAEAAAAAAQQUALKKCyigAgACF0tgAAAAAAAAAFAAAAJKyiiCAAiQCgAAACQAABbFWlEpFQAAACNtAAAAAAAAIAAAAAAChzuSAACChEAAAEoAAgFl1LVAAgAQAKhqXUoAAAAAAAAAAAAAAAA56xAAACUACCAAAIIK1LqasACCgAAQQG5qgAAAAAAAAQAAACgAAAf/8QAHxAAAgMAAgIDAAAAAAAAAAAAABEBAmBAUANwEjCQ/9oACAEBAAEFAv2bnyxE4vyXWMvdYy91jL3WMtfGWvjLWeLmUTLxc2Q3i5ti5lEy8XNsWyZeL+WLeLY+Cu5f3oXdv1ox49j6N9axjHx2MfUPgMYxjGMYxjGMY9EhZ9ZFCyC90f/EAB4RAAIDAAIDAQAAAAAAAAAAABFgAAECEFBAQXCQ/9oACAEDAQE/Af2bvYTN69JmtBM1oJmtJmtJmtJl6SzLspd6hS70lmXaXdpZhSyllLKWUs/NCoGHoz1phh8gww9QfAMMMMMPJ4MMMLGGAKIgUB9o/8QAGhEAAwEBAQEAAAAAAAAAAAAAARFgAgCQcP/aAAgBAgEBPwH2bGHGZzGZzGZzGDMYBGARgEYBFgRgEYotRii1FqLUWvv6kFykVy8rP//EABsQAAMAAgMAAAAAAAAAAAAAAAERYCExgJCg/9oACAEBAAY/Au5tRiEYhuMQjEIxCMQ4X49Lv//EACYQAAIBAwMEAgMBAAAAAAAAAAARARAwQCBQYCExUWFBcZCx0fD/2gAIAQEAAT8h/M30kfDPavmeGf6hcM9k/XDPYOGK8nnhn9jhcyocnZR24XBByT/XgTGMYxjGMj+xMpOdTGMfAvj1mMfAoO4l+nC/AN8KmEEnCjRPhfQpFO9T4ky9aEIQt/kzKdCFbU0KN3ZJmZkQrwt5Z6HfvdQt7Y7q0PcHYYx4rHZptLHeV52HI9LjzkMdHqcUOZvrCdpjVkHpeA9Ac4jox0Y6Mdl4ByNfAAHI9L4O8YQhCEIQhCEKRTfW0LXEYXQUUKbaxmMeHEZPQShThMeCrkRnITDY9Lo9CuxD3yIFfiPNGMdljGMeExjGMYx6HV6GMY6MiGKrox6GMdHSI2T/2gAMAwEAAgADAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJP/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AG2222222222222222222222222222222222222222222222222222222222222222222222222222//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/APgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPySSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSECSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSVtttttttttttttttttttttttttttttttttttttnaT/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/Lf+kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfkkgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL0tt/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbUaSSSUkkkkkkkkkkkkkkkkkkkkkkltttskklICSd37STtttttttttttttttttttttkkkkJLaSdskwSQCTcrbbbbbbbbbbbbbbbbbQLbbbSSSbYkkvS6SZNtkoSSSSSSSSSSSSSSSSSSSbSLNNkktrSQIqSNtskrZJJJJJJJJJJJJJL7bdIEkkktvSTbJE4SRttkpaSkkkkkkkkkkkkkkkklltpKSTZJkk/zMSJskpbbaSSSSSSSSTbaSSSSSSSZJJMkn/2yJF6NstyTZtrZttttttJJJJJJJJJIkkn/wDkkySBf9HYmZJJLXYjv/8A/wD2k22n/wD/AP8A/wD22kmSSAJ/8kSR40IJJKTFf/8A5JJJIABJJAJAlkm2yCf/AO0JIW8sTbbaSTdRN/8A/wDADAAAAASSSSf/ALe22JJIW/shSiSSSbNCvxAAkkt+f+WSSAWQAJJbCSSf+kgJS+jbbtsk8dttsjIAADy22SS23/3/AP8AaSG0hJP2yI2yySftqJJJJJJvEkgDuiSCSWkklpJJ/wD2krbua2/baSJPtttJtNJoJSSAACrVTf8ApJJSaAk3MR5wATbJZtySSSSSTy223VpJJJNraE2/9/kyF8AWhpJtt7aDySSSSSSSbbbbb/8A/wD/APtgAAACSS0kLYgAAC2224W2X+2iZ/8A0kkgB8kgQDbLffv/AGkkTaSSSCZIBBNkkkkkkkl49W220nP+kkklVoCSSJttEkuxJC35CAAAASSTbbbaPFbJKUSRJJttkk37SVSV22tsmg2222222222ltJJGECban/bZJADb+3PqUzbaSBwAAAAAAAJv/8A/wD/AP8A27/tvwVtJJSSAk9oADbftmBtttttkkkkAAAAAA20/wD7SkkJ22Sb9Ibb8kgBP6JJJJJJJJJbbbbSSSSX/8QAIREBAQEAAgICAwEBAAAAAAAAEQABEDAgYEBQITFRQZD/2gAIAQMBAT8Q/wCzeej0wfw9M/Wz9+mfrZ++T0kPxnpgfjPTP8M9L3Sb8Z6XuMz82vopmZmbDLV+59K/wzyZmZz75njcZab6X/GX0rcZbrfSkt/nvIjfut/i3XyIiIj75tm7u8kRHUbEZ9ozw2zd3eDxfMiPtWZ4e8R9Y8viz5M9p8dnlnlnlmepnl6We46Gek59QzPcdrPQ7wE5y/KZ5eDvefCeplyOT8VhyPJ0M8M8Ha9Dwe52UvEGeD4g7Oz4vU+R9c+bPDPDyzM+DPjkIiIjIyIiIjY3hmZnp3Ox4Z+AdBER45nwjIzgb0vB0sz0szM9Rwzwzw2Z8n8Q4G8szPYzMzMzM8Mzwz4PLMzM8ZMzMzMzMzMzMzMzPQZCe1mZmZmZnhn4OY/IZmZmZmZ4Z5ZnwfN4ZmeMyPJmfPM/szMzMzMzMzMzPczMzMzMzMzPDMzMzMzNmbtmEzMzMzMzMzxmfSf/xAAhEQEBAQABBQEBAAMAAAAAAAARAAEwECBAUGAhUTFBkP/aAAgBAgEBPxD/ALN6YfjG/d+MT934xP3fjG/d+Mf934z/AH78WMP7vxeZu2GfDEREWu2Yf47DodD4P+veRHwWY2Yz4vP7+KLM3bMZ8UWf1zsz7rJmd7MzPvSLJmHVmeNmfZHdkzMyZ5GfdEczPsTiI5Xxj054xHCN9SRzPMcBnUPMO0iOd8I4iM6hseKRER3kecRzERERERERERERH0DMzMzMzMzM876/d8JmZzjeMjsPL3fKdm/PKPMPIZ2I8E7SIjseXZ9Mdx3ncdN2efd5iIjwiIiIiI7ji3ZiIiI7COhHTYiIiIiIiIiIiIjwP//EACgQAQEBAAEDBAICAgMBAAAAABEAARAhMVEgQWFxMGBAUICBkbHR4f/aAAgBAQABPxD/AA0ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ/yCZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ/TdrjR77m+8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMDdevse0fpYt36u+wdd6x+lZ43R332b113ruxH6ThndH374td13Xdj9K6zX5eEediP0lHXp7+gRH6LhpoZnvbd7n/f8AS1x/9tbr09mesj+wZmZmZnZ30BT4/W+t9boudfCcDs55mZn4vpfTgP6lmZnh9LMzMzMzy26ddv8A0LXfS75lfSE55nPP9O8MzMzM8s8M8szMzYjr/V0jt4f2LwzPLM8szMzMzMzM2edOvfNutO67/WM8v4XhmeGZmZmZmbN6718XRO2eM/C+lmZmZmZmZmZmZmZmfUzMzMzMzwzMzMzMzMzwzM24w7pbb06fm3Xrv4GZ46xu+2y8XwXxTMzMzMzMzM+lmZmZnhmZnhmZnlmZmZmZmZmbd87Z506ttNO6+o3xOfmPmMPEZ49R/AZmZnhmZmeGZmZmZmZmZmZmZmZmbHOmddu4bPBsvMIzl5Z4zN3tk1mPfbPFZmZ2z8jMzMzMzMzMzMzMzMzMzMzMzMzMzM3RY5263ddlfLYzxwzMzPJu9ss19WY97MZ7etmZmZmZ4eGZ5eGZ5ZmZmZmZmZmZmZmZmbcZ323fs/3tub3Izx62Zmx2zz2zGflZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmbc5bvfjhmZmZmZuu3yszMmbI5yzPpZ4ZmZmZmZmZmZmcmZmZmZmZmZ4MzMzMLfG3W+8+pmZmzN2zMmZmZmzWWZn15n3zcs07bM7PoZmeGZ4ZmZmZmZmZmZmZmZmY/f1L6mZmZmfQ8Yu9mZn5M3c7WecvLPOZdt2z3DbMe7lm0ZmZmZmZmZmZmZmZ5HgzMzme9uXvb45fQjzrwz6GZmZs62eV0z+BmnvZ52a9t9TMyztu2Ze7Zr3yzPzJ7w3tuTMzwZmZmZmZmZmPmFvjlupvebMbMzJmZmZmZmZszzZuTweR5HkZmZmZsFnlZub2mfUzPDO+23zcD+JeL6R8Q8Qj8x+YQ8X0vpLxK+aXnZmZ4G7dpmZ4ZnhmZszd73aZ9L6XhmZmZmZm3p3yZmZmZmZ4eHlmZ4ZmZngzM2Y2GTMzMzMzdfEbG+bNb72Yz3jGMIxj5j5j5vvPznF8F18bMzM+pm03vb4cMzMzMzMzMzMzMzPLMzNmNmZkzM8m32jIzls69rDO/WZmZmZmZmZmbpvtbmva35r4bbl7W5ud82ZmZmZtN72+HpZmZmZmZmZmZ9AZsds6TM3WNjLpMzMzNpvfplhnaZmZ9TMz6GZmZtzXfMt07OW79tzbcO+TMzM27m254uszPLM8jMzMzMzMtmeZmzN2zy26Z7TMzM/MzNnXTLDO/eZmZmZmZmZmZmZn8O43vlvzTMzMzbazMzMzM8jMzweGY3azN2zPvt0ztMzMzMzM2n0sw7fxWZmZmZmZmZmZmZ5ZmZmZmZmZs3dv9m2eW2YTMzMzMzMze5/wn0B2dnZ2dnZ2dlKUpTs7MzMzMzMzMz+EAZmE5PBmfSDw16vazGTPB4KZn0B4Zu7pkH3MzMzMzMzMzMzMzMzMzMzMzM3/9k=',
                className: 'rounded-2xl shadow-inner shadow-md',
              }),
            }),
            (0, Fn.jsxs)('div', {
              className: 'w-full md:w-2/3',
              children: [
                (0, Fn.jsx)(pr, {
                  children: null === yd || void 0 === yd ? void 0 : yd.title,
                }),
                (0, Fn.jsx)('p', {
                  className:
                    'text-xl text-blue-900 mb-12 max-w-4xl md:text-justify text-center',
                  children: null === yd || void 0 === yd ? void 0 : yd.content,
                }),
              ],
            }),
          ],
        }),
      }),
    });
  }
  function NA(e) {
    let { icon: t, text: n, link: r, content: i, title: o } = e;
    return (0, Fn.jsxs)('div', {
      className:
        'bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/3 sm:w-1/2  text-center hover:shadow-xl transition-shadow duration-300',
      children: [
        (0, Fn.jsx)('div', {
          className:
            'inline-flex text-3xl md:text-4xl text-blue-800 mb-4 mx-auto',
          children: t,
        }),
        (0, Fn.jsx)('h3', {
          className: 'md:text-xl text-lg font-semibold text-gray-800 mb-2',
          children: o,
        }),
        (0, Fn.jsx)('p', {
          className: 'text-gray-600 mb-4 md:block hidden',
          children: i,
        }),
        (0, Fn.jsx)('a', {
          href: r,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'text-sky-800 font-semibold hover:underline',
          children: n,
        }),
      ],
    });
  }
  function BA() {
    var e;
    return (0, Fn.jsx)(cd, {
      id: 'contact-us',
      title: null === Ad || void 0 === Ad ? void 0 : Ad.title,
      children: (0, Fn.jsxs)('div', {
        className: 'max-w-screen-xl mx-auto px-6 text-center',
        children: [
          (0, Fn.jsx)('p', {
            className: 'text-gray-600 mb-12',
            children: null === Ad || void 0 === Ad ? void 0 : Ad.content,
          }),
          (0, Fn.jsx)('div', {
            className: 'flex flex-col sm:flex-row justify-center gap-8',
            children:
              null === Ad ||
              void 0 === Ad ||
              null === (e = Ad.contactDetails) ||
              void 0 === e
                ? void 0
                : e.map((e, t) =>
                    (0, r.createElement)(NA, u(u({}, e), {}, { key: t }))
                  ),
          }),
        ],
      }),
    });
  }
  const VA = new WeakMap();
  let OA;
  function IA(e) {
    let { target: t, contentRect: n, borderBoxSize: r } = e;
    var i;
    null === (i = VA.get(t)) ||
      void 0 === i ||
      i.forEach((e) => {
        e({
          target: t,
          contentSize: n,
          get size() {
            return (function (e, t) {
              if (t) {
                const { inlineSize: e, blockSize: n } = t[0];
                return { width: e, height: n };
              }
              return e instanceof SVGElement && 'getBBox' in e
                ? e.getBBox()
                : { width: e.offsetWidth, height: e.offsetHeight };
            })(t, r);
          },
        });
      });
  }
  function UA(e) {
    e.forEach(IA);
  }
  function ZA(e, t) {
    OA ||
      ('undefined' !== typeof ResizeObserver && (OA = new ResizeObserver(UA)));
    const n = Ru(e);
    return (
      n.forEach((e) => {
        let n = VA.get(e);
        n || ((n = new Set()), VA.set(e, n)),
          n.add(t),
          null === OA || void 0 === OA || OA.observe(e);
      }),
      () => {
        n.forEach((e) => {
          const n = VA.get(e);
          null === n || void 0 === n || n.delete(t),
            (null === n || void 0 === n ? void 0 : n.size) ||
              null === OA ||
              void 0 === OA ||
              OA.unobserve(e);
        });
      }
    );
  }
  const _A = new Set();
  let WA;
  function HA(e) {
    return (
      _A.add(e),
      WA ||
        ((WA = () => {
          const e = { width: window.innerWidth, height: window.innerHeight },
            t = { target: window, size: e, contentSize: e };
          _A.forEach((e) => e(t));
        }),
        window.addEventListener('resize', WA)),
      () => {
        _A.delete(e), !_A.size && WA && (WA = void 0);
      }
    );
  }
  const JA = {
    x: { length: 'Width', position: 'Left' },
    y: { length: 'Height', position: 'Top' },
  };
  function YA(e, t, n, r) {
    const i = n[t],
      { length: o, position: a } = JA[t],
      s = i.current,
      l = n.time;
    (i.current = e['scroll'.concat(a)]),
      (i.scrollLength = e['scroll'.concat(o)] - e['client'.concat(o)]),
      (i.offset.length = 0),
      (i.offset[0] = 0),
      (i.offset[1] = i.scrollLength),
      (i.progress = To(0, i.scrollLength, i.current));
    const u = r - l;
    i.velocity = u > 50 ? 0 : Do(i.current - s, u);
  }
  const XA = {
      Enter: [
        [0, 1],
        [1, 1],
      ],
      Exit: [
        [0, 0],
        [1, 0],
      ],
      Any: [
        [1, 0],
        [0, 1],
      ],
      All: [
        [0, 0],
        [1, 1],
      ],
    },
    QA = { start: 0, center: 0.5, end: 1 };
  function GA(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
      r = 0;
    if ((e in QA && (e = QA[e]), 'string' === typeof e)) {
      const t = parseFloat(e);
      e.endsWith('px')
        ? (r = t)
        : e.endsWith('%')
          ? (e = t / 100)
          : e.endsWith('vw')
            ? (r = (t / 100) * document.documentElement.clientWidth)
            : e.endsWith('vh')
              ? (r = (t / 100) * document.documentElement.clientHeight)
              : (e = t);
    }
    return 'number' === typeof e && (r = t * e), n + r;
  }
  const KA = [0, 0];
  function qA(e, t, n, r) {
    let i = Array.isArray(e) ? e : KA,
      o = 0,
      a = 0;
    return (
      'number' === typeof e
        ? (i = [e, e])
        : 'string' === typeof e &&
          (i = (e = e.trim()).includes(' ')
            ? e.split(' ')
            : [e, QA[e] ? e : '0']),
      (o = GA(i[0], n, r)),
      (a = GA(i[1], t)),
      o - a
    );
  }
  const $A = { x: 0, y: 0 };
  function eb(e, t, n) {
    const { offset: r = XA.All } = n,
      { target: i = e, axis: o = 'y' } = n,
      a = 'y' === o ? 'height' : 'width',
      s =
        i !== e
          ? (function (e, t) {
              const n = { x: 0, y: 0 };
              let r = e;
              for (; r && r !== t; )
                if (r instanceof HTMLElement)
                  (n.x += r.offsetLeft),
                    (n.y += r.offsetTop),
                    (r = r.offsetParent);
                else if ('svg' === r.tagName) {
                  const e = r.getBoundingClientRect();
                  r = r.parentElement;
                  const t = r.getBoundingClientRect();
                  (n.x += e.left - t.left), (n.y += e.top - t.top);
                } else {
                  if (!(r instanceof SVGGraphicsElement)) break;
                  {
                    const { x: e, y: t } = r.getBBox();
                    (n.x += e), (n.y += t);
                    let i = null,
                      o = r.parentNode;
                    for (; !i; )
                      'svg' === o.tagName && (i = o), (o = r.parentNode);
                    r = i;
                  }
                }
              return n;
            })(i, e)
          : $A,
      l =
        i === e
          ? { width: e.scrollWidth, height: e.scrollHeight }
          : (function (e) {
              return 'getBBox' in e && 'svg' !== e.tagName
                ? e.getBBox()
                : { width: e.clientWidth, height: e.clientHeight };
            })(i),
      u = { width: e.clientWidth, height: e.clientHeight };
    t[o].offset.length = 0;
    let c = !t[o].interpolate;
    const d = r.length;
    for (let h = 0; h < d; h++) {
      const e = qA(r[h], u[a], l[a], s[o]);
      c || e === t[o].interpolatorOffsets[h] || (c = !0), (t[o].offset[h] = e);
    }
    c &&
      ((t[o].interpolate = ha(t[o].offset, fa(r))),
      (t[o].interpolatorOffsets = [...t[o].offset])),
      (t[o].progress = t[o].interpolate(t[o].current));
  }
  function tb(e, t, n) {
    let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    return {
      measure: () =>
        (function (e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : e,
            n = arguments.length > 2 ? arguments[2] : void 0;
          if (((n.x.targetOffset = 0), (n.y.targetOffset = 0), t !== e)) {
            let r = t;
            for (; r && r !== e; )
              (n.x.targetOffset += r.offsetLeft),
                (n.y.targetOffset += r.offsetTop),
                (r = r.offsetParent);
          }
          (n.x.targetLength = t === e ? t.scrollWidth : t.clientWidth),
            (n.y.targetLength = t === e ? t.scrollHeight : t.clientHeight),
            (n.x.containerLength = e.clientWidth),
            (n.y.containerLength = e.clientHeight);
        })(e, r.target, n),
      update: (t) => {
        !(function (e, t, n) {
          YA(e, 'x', t, n), YA(e, 'y', t, n), (t.time = n);
        })(e, n, t),
          (r.offset || r.target) && eb(e, n, r);
      },
      notify: () => t(n),
    };
  }
  const nb = ['container'],
    rb = new WeakMap(),
    ib = new WeakMap(),
    ob = new WeakMap(),
    ab = (e) => (e === document.documentElement ? window : e);
  function sb(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      { container: n = document.documentElement } = t,
      r = c(t, nb),
      i = ob.get(n);
    i || ((i = new Set()), ob.set(n, i));
    const o = tb(
      n,
      e,
      {
        time: 0,
        x: {
          current: 0,
          offset: [],
          progress: 0,
          scrollLength: 0,
          targetOffset: 0,
          targetLength: 0,
          containerLength: 0,
          velocity: 0,
        },
        y: {
          current: 0,
          offset: [],
          progress: 0,
          scrollLength: 0,
          targetOffset: 0,
          targetLength: 0,
          containerLength: 0,
          velocity: 0,
        },
      },
      r
    );
    if ((i.add(o), !rb.has(n))) {
      const e = () => {
          for (const e of i) e.measure();
        },
        t = () => {
          for (const e of i) e.update(Wr.timestamp);
        },
        r = () => {
          for (const e of i) e.notify();
        },
        o = () => {
          Zr.read(e, !1, !0), Zr.read(t, !1, !0), Zr.update(r, !1, !0);
        };
      rb.set(n, o);
      const l = ab(n);
      window.addEventListener('resize', o, { passive: !0 }),
        n !== document.documentElement &&
          ib.set(
            n,
            ((s = o), 'function' === typeof (a = n) ? HA(a) : ZA(a, s))
          ),
        l.addEventListener('scroll', o, { passive: !0 });
    }
    var a, s;
    const l = rb.get(n);
    return (
      Zr.read(l, !1, !0),
      () => {
        var e;
        _r(l);
        const t = ob.get(n);
        if (!t) return;
        if ((t.delete(o), t.size)) return;
        const r = rb.get(n);
        rb.delete(n),
          r &&
            (ab(n).removeEventListener('scroll', r),
            null === (e = ib.get(n)) || void 0 === e || e(),
            window.removeEventListener('resize', r));
      }
    );
  }
  function lb(e, t) {
    let n;
    const r = () => {
      const { currentTime: r } = t,
        i = (null === r ? 0 : r.value) / 100;
      n !== i && e(i), (n = i);
    };
    return Zr.update(r, !0), () => _r(r);
  }
  const ub = ['axis'];
  const cb = new Map();
  function db() {
    let {
      source: e,
      container: t = document.documentElement,
      axis: n = 'y',
    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    e && (t = e), cb.has(t) || cb.set(t, {});
    const r = cb.get(t);
    return (
      r[n] ||
        (r[n] = za()
          ? new ScrollTimeline({ source: t, axis: n })
          : (function (e) {
              let { source: t, container: n, axis: r = 'y' } = e;
              t && (n = t);
              const i = { value: 0 },
                o = sb(
                  (e) => {
                    i.value = 100 * e[r].progress;
                  },
                  { container: n, axis: r }
                );
              return { currentTime: i, cancel: o };
            })({ source: t, axis: n })),
      r[n]
    );
  }
  function hb(e) {
    return e && (e.target || e.offset);
  }
  function fb(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      { axis: n = 'y' } = t;
    const r = u({ axis: n }, c(t, ub));
    return 'function' === typeof e
      ? (function (e, t) {
          return (function (e) {
            return 2 === e.length;
          })(e) || hb(t)
            ? sb((n) => {
                e(n[t.axis].progress, n);
              }, t)
            : lb(e, db(t));
        })(e, r)
      : (function (e, t) {
          if ((e.flatten(), hb(t)))
            return (
              e.pause(),
              sb((n) => {
                e.time = e.duration * n[t.axis].progress;
              }, t)
            );
          {
            const n = db(t);
            return e.attachTimeline
              ? e.attachTimeline(
                  n,
                  (e) => (
                    e.pause(),
                    lb((t) => {
                      e.time = e.duration * t;
                    }, n)
                  )
                )
              : Or;
          }
        })(e, r);
  }
  const pb = ['container', 'target', 'layoutEffect'];
  function mb(e, t) {
    ii(
      Boolean(!t || t.current),
      'You have defined a '.concat(
        e,
        " options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its `layoutEffect: false` option."
      )
    );
  }
  const gb = () => ({
    scrollX: Wa(0),
    scrollY: Wa(0),
    scrollXProgress: Wa(0),
    scrollYProgress: Wa(0),
  });
  function vb(e) {
    return 'number' === typeof e ? e : parseFloat(e);
  }
  function yb(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const { isStatic: n } = (0, r.useContext)($u),
      i = (0, r.useRef)(null),
      o = (function (e) {
        const t = kc(() => Wa(e)),
          { isStatic: n } = (0, r.useContext)($u);
        if (n) {
          const [, n] = (0, r.useState)(e);
          (0, r.useEffect)(() => t.on('change', n), []);
        }
        return t;
      })(Ga(e) ? vb(e.get()) : e),
      a = (0, r.useRef)(o.get()),
      s = (0, r.useRef)(() => {}),
      l = () => {
        const e = i.current;
        var n;
        e && 0 === e.time && e.sample(Wr.delta),
          c(),
          (i.current =
            ((n = u(
              u(
                {
                  keyframes: [o.get(), a.current],
                  velocity: o.getVelocity(),
                  type: 'spring',
                  restDelta: 0.001,
                  restSpeed: 0.01,
                },
                t
              ),
              {},
              { onUpdate: s.current }
            )),
            new ya(n)));
      },
      c = () => {
        i.current && i.current.stop();
      };
    return (
      (0, r.useInsertionEffect)(
        () =>
          o.attach(
            (e, t) =>
              n
                ? t(e)
                : ((a.current = e), (s.current = t), Zr.update(l), o.get()),
            c
          ),
        [JSON.stringify(t)]
      ),
      nc(() => {
        if (Ga(e)) return e.on('change', (e) => o.set(vb(e)));
      }, [o]),
      o
    );
  }
  function Ab() {
    const { scrollYProgress: e } = (function () {
        let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          { container: t, target: n, layoutEffect: i = !0 } = e,
          o = c(e, pb);
        const a = kc(gb);
        return (
          (i ? nc : r.useEffect)(
            () => (
              mb('target', n),
              mb('container', t),
              fb(
                (e, t) => {
                  let { x: n, y: r } = t;
                  a.scrollX.set(n.current),
                    a.scrollXProgress.set(n.progress),
                    a.scrollY.set(r.current),
                    a.scrollYProgress.set(r.progress);
                },
                u(
                  u({}, o),
                  {},
                  {
                    container:
                      (null === t || void 0 === t ? void 0 : t.current) ||
                      void 0,
                    target:
                      (null === n || void 0 === n ? void 0 : n.current) ||
                      void 0,
                  }
                )
              )
            ),
            [t, n, JSON.stringify(o.offset)]
          ),
          a
        );
      })(),
      t = yb(e, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (0, Fn.jsx)(ud.div, {
      style: { scaleX: t },
      className: 'fixed top-0 left-0 h-10 bg-sky-100 origin-top-left',
    });
  }
  const bb = (0, r.memo)(Ab);
  function xb() {
    return (0, Fn.jsxs)(Fn.Fragment, {
      children: [
        (0, Fn.jsx)(bb, {}),
        (0, Fn.jsx)(LA, {}),
        (0, Fn.jsx)(xd, {}),
        (0, Fn.jsx)(zA, {}),
        (0, Fn.jsx)(BA, {}),
      ],
    });
  }
  const wb = md.map((e) => (null === e || void 0 === e ? void 0 : e.slug));
  let Sb = [
    {
      title: '3D Printing services',
      description:
        'Turn your ideas into reality with our precision 3D printing services. From supporting university \nprojects with high-quality prototypes to creating custom designs tailored to your specific needs, \nwe provide reliable, professional 3D printing solutions for academic, personal, and commercial \npurposes.',
      image: hd,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description:
        'Make moments unforgettable with our personalized gifts and accessories. Choose from elegant \ntable calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and \ndurable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it \nperfect for gifts or decor. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'CAD Modeling ',
      description:
        'Bring your concepts to life with our expert CAD modeling services. Whether designing \nagricultural tools like seed meters and electric hoes or advanced systems like Delta robots and \nbucket conveyors, we deliver precise, functional models that turn innovation into reality. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \nhelp you bring your projects to life. Whether you're a student or a startup, we provide the \nresources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \nprototypes to production-ready solutions, we focus on delivering reliable designs that meet your \nexact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \nand systems that enable automation, remote monitoring, and data-driven decision-making, \nempowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n      workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n      program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n      practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \nadvanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \nyou to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \nneed eye-catching logos, engaging branding, or striking promotional materials, we craft designs \nthat leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: '3D Printing services',
      description:
        'Turn your ideas into reality with our precision 3D printing services. From supporting university \n  projects with high-quality prototypes to creating custom designs tailored to your specific needs, \n  we provide reliable, professional 3D printing solutions for academic, personal, and commercial \n  purposes.',
      image: hd,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description:
        'Make moments unforgettable with our personalized gifts and accessories. Choose from elegant \n  table calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and \n  durable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it \n  perfect for gifts or decor. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'CAD Modeling ',
      description:
        'Bring your concepts to life with our expert CAD modeling services. Whether designing \n  agricultural tools like seed meters and electric hoes or advanced systems like Delta robots and \n  bucket conveyors, we deliver precise, functional models that turn innovation into reality. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \n  help you bring your projects to life. Whether you're a student or a startup, we provide the \n  resources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \n  prototypes to production-ready solutions, we focus on delivering reliable designs that meet your \n  exact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \n  and systems that enable automation, remote monitoring, and data-driven decision-making, \n  empowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n        workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n        program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n        practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \n  advanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \n  you to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \n  need eye-catching logos, engaging branding, or striking promotional materials, we craft designs \n  that leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: '3D Printing services',
      description:
        'Turn your ideas into reality with our precision 3D printing services. From supporting university \n  projects with high-quality prototypes to creating custom designs tailored to your specific needs, \n  we provide reliable, professional 3D printing solutions for academic, personal, and commercial \n  purposes.',
      image: hd,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description:
        'Make moments unforgettable with our personalized gifts and accessories. Choose from elegant \n  table calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and \n  durable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it \n  perfect for gifts or decor. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'CAD Modeling ',
      description:
        'Bring your concepts to life with our expert CAD modeling services. Whether designing \n  agricultural tools like seed meters and electric hoes or advanced systems like Delta robots and \n  bucket conveyors, we deliver precise, functional models that turn innovation into reality. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \n  help you bring your projects to life. Whether you're a student or a startup, we provide the \n  resources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \n  prototypes to production-ready solutions, we focus on delivering reliable designs that meet your \n  exact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \n  and systems that enable automation, remote monitoring, and data-driven decision-making, \n  empowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n        workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n        program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n        practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \n  advanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \n  you to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \n  need eye-catching logos, engaging branding, or striking promotional materials, we craft designs \n  that leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: '3D Printing services',
      description:
        'Turn your ideas into reality with our precision 3D printing services. From supporting university \n  projects with high-quality prototypes to creating custom designs tailored to your specific needs, \n  we provide reliable, professional 3D printing solutions for academic, personal, and commercial \n  purposes.',
      image: hd,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description:
        'Make moments unforgettable with our personalized gifts and accessories. Choose from elegant \n  table calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and \n  durable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it \n  perfect for gifts or decor. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'CAD Modeling ',
      description:
        'Bring your concepts to life with our expert CAD modeling services. Whether designing \n  agricultural tools like seed meters and electric hoes or advanced systems like Delta robots and \n  bucket conveyors, we deliver precise, functional models that turn innovation into reality. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \n  help you bring your projects to life. Whether you're a student or a startup, we provide the \n  resources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \n  prototypes to production-ready solutions, we focus on delivering reliable designs that meet your \n  exact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \n  and systems that enable automation, remote monitoring, and data-driven decision-making, \n  empowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n        workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n        program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n        practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \n  advanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \n  you to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \n  need eye-catching logos, engaging branding, or striking promotional materials, we craft designs \n  that leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: '3D Printing services',
      description:
        'Turn your ideas into reality with our precision 3D printing services. From supporting university \n  projects with high-quality prototypes to creating custom designs tailored to your specific needs, \n  we provide reliable, professional 3D printing solutions for academic, personal, and commercial \n  purposes.',
      image: hd,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description:
        'Make moments unforgettable with our personalized gifts and accessories. Choose from elegant \n  table calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and \n  durable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it \n  perfect for gifts or decor. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'CAD Modeling ',
      description:
        'Bring your concepts to life with our expert CAD modeling services. Whether designing \n  agricultural tools like seed meters and electric hoes or advanced systems like Delta robots and \n  bucket conveyors, we deliver precise, functional models that turn innovation into reality. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \n  help you bring your projects to life. Whether you're a student or a startup, we provide the \n  resources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \n  prototypes to production-ready solutions, we focus on delivering reliable designs that meet your \n  exact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \n  and systems that enable automation, remote monitoring, and data-driven decision-making, \n  empowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n        workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n        program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n        practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \n  advanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \n  you to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \n  need eye-catching logos, engaging branding, or striking promotional materials, we craft designs \n  that leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: '3D Printing services',
      description:
        'Turn your ideas into reality with our precision 3D printing services. From supporting university \n  projects with high-quality prototypes to creating custom designs tailored to your specific needs, \n  we provide reliable, professional 3D printing solutions for academic, personal, and commercial \n  purposes.',
      image: hd,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description:
        'Make moments unforgettable with our personalized gifts and accessories. Choose from elegant \n  table calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and \n  durable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it \n  perfect for gifts or decor. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'CAD Modeling ',
      description:
        'Bring your concepts to life with our expert CAD modeling services. Whether designing \n  agricultural tools like seed meters and electric hoes or advanced systems like Delta robots and \n  bucket conveyors, we deliver precise, functional models that turn innovation into reality. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \n  help you bring your projects to life. Whether you're a student or a startup, we provide the \n  resources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \n  prototypes to production-ready solutions, we focus on delivering reliable designs that meet your \n  exact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \n  and systems that enable automation, remote monitoring, and data-driven decision-making, \n  empowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n        workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n        program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n        practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \n  advanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \n  you to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \n  need eye-catching logos, engaging branding, or striking promotional materials, we craft designs \n  that leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: '3D Printing services',
      description:
        'Turn your ideas into reality with our precision 3D printing services. From supporting university \n  projects with high-quality prototypes to creating custom designs tailored to your specific needs, \n  we provide reliable, professional 3D printing solutions for academic, personal, and commercial \n  purposes.',
      image: hd,
      technologies: ['PLA', 'Dual-layer', 'Prototypes'],
    },
    {
      title: 'Customized Gifts and Accessories',
      description:
        'Make moments unforgettable with our personalized gifts and accessories. Choose from elegant \n  table calendars, enchanting moon lamps, bespoke vases, creative wall-mounted hands, and \n  durable key tags. Each item is thoughtfully crafted to reflect your personality or brand, making it \n  perfect for gifts or decor. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'CAD Modeling ',
      description:
        'Bring your concepts to life with our expert CAD modeling services. Whether designing \n  agricultural tools like seed meters and electric hoes or advanced systems like Delta robots and \n  bucket conveyors, we deliver precise, functional models that turn innovation into reality. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \n  help you bring your projects to life. Whether you're a student or a startup, we provide the \n  resources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \n  prototypes to production-ready solutions, we focus on delivering reliable designs that meet your \n  exact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \n  and systems that enable automation, remote monitoring, and data-driven decision-making, \n  empowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n        workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n        program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n        practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \n  advanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \n  you to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \n  need eye-catching logos, engaging branding, or striking promotional materials, we craft designs \n  that leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Project Assistance',
      description:
        "We\u2019re your trusted partner in innovation, offering expert guidance and technical assistance to \n  help you bring your projects to life. Whether you're a student or a startup, we provide the \n  resources and support needed to achieve your goals. ",
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'PCB Designing',
      description:
        'Create efficient, high-performance circuit boards with our PCB designing services. From \n  prototypes to production-ready solutions, we focus on delivering reliable designs that meet your \n  exact specifications and industry standards. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'IoT Solutions',
      description:
        'Step into the future with our cutting-edge IoT solutions. We specialize in creating smart devices \n  and systems that enable automation, remote monitoring, and data-driven decision-making, \n  empowering individuals and businesses to thrive in a connected world. ',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
    {
      title: 'Learning and Development',
      description:
        'Discover a world of learning with our hands-on education programs. Build robots in interactive \n        workshops, explore STEM with innovative kits, master SolidWorks for CAD design, and learn to \n        program in C, C++, and Python. Our courses are designed to inspire curiosity and equip you with \n        practical skills for the future.',
      image: hd,
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
    },
    {
      title: 'R&D Innovation',
      description:
        'Innovate with purpose through our research and development services. Whether designing \n  advanced rovers for exploration or working on groundbreaking prototypes, we collaborate with \n  you to create impactful solutions that push the boundaries of technology and innovation. ',
      image: hd,
      technologies: ['Flutter', 'React Native', 'Firebase'],
    },
    {
      title: 'Expanded Services',
      description:
        'Expand your creative possibilities with our professional graphic design services. Whether you \n  need eye-catching logos, engaging branding, or striking promotional materials, we craft designs \n  that leave a lasting impression.',
      image: hd,
      technologies: ['Figma', 'Sketch', 'Adobe XD'],
    },
  ];
  Sb = Sb.map((e) =>
    u(
      u({}, e),
      {},
      {
        demo: 'https://www.youtube.com/embed/erSLZwmWfYQ?si=33Njc-bs2Qr36nop',
        slug: e.title.toLowerCase().trim().replace(/ /g, '-'),
        service: wb[Math.floor(Math.random() * wb.length)],
      }
    )
  );
  const kb = Sb,
    Eb = (0, r.createContext)(),
    Pb = (e) => {
      var t;
      let { children: n } = e;
      const { slug: i } = (function () {
          let { matches: e } = r.useContext(at),
            t = e[e.length - 1];
          return t ? t.params : {};
        })(),
        [o, a] = (0, r.useState)(md.find((e) => e.slug === i) || null),
        [s, l] = (0, r.useState)(
          i
            ? null !==
                (t = kb.filter((e) => {
                  let { service: t } = e;
                  return t === i;
                })) && void 0 !== t
              ? t
              : []
            : kb
        );
      return (
        (0, r.useEffect)(() => {
          var e;
          return (
            a(md.find((e) => e.slug === i)),
            l(
              i
                ? null !==
                    (e = kb.filter((e) => {
                      let { service: t } = e;
                      return t === i;
                    })) && void 0 !== e
                  ? e
                  : []
                : kb
            ),
            () => {
              a(null), l([]);
            }
          );
        }, [i]),
        (0, Fn.jsx)(Eb.Provider, {
          value: {
            activeTab: o,
            setActiveTab: a,
            selectedProjects: s,
            setSelectedProjects: l,
          },
          children: n,
        })
      );
    },
    Cb = () => (0, r.useContext)(Eb),
    Tb = () => {
      var e, t, n;
      const { activeTab: r } = Cb();
      return (0, Fn.jsxs)(
        kA.div,
        {
          className:
            'relative p-8 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-lg overflow-hidden h-48 py-3',
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 50 },
          transition: { duration: 0.5 },
          children: [
            (0, Fn.jsx)('img', {
              src:
                null !== (e = null === r || void 0 === r ? void 0 : r.image) &&
                void 0 !== e
                  ? e
                  : TA,
              alt: null === r || void 0 === r ? void 0 : r.title,
              className:
                'absolute inset-0 w-full h-full object-cover opacity-30',
            }),
            (0, Fn.jsxs)('div', {
              className: 'relative z-10',
              children: [
                (0, Fn.jsx)('h1', {
                  className: 'text-5xl font-bold drop-shadow-lg',
                  children:
                    null !==
                      (t = null === r || void 0 === r ? void 0 : r.title) &&
                    void 0 !== t
                      ? t
                      : gd.hero.title,
                }),
                (0, Fn.jsx)('p', {
                  className: 'mt-4 text-lg',
                  children:
                    null !==
                      (n =
                        null === r || void 0 === r ? void 0 : r.description) &&
                    void 0 !== n
                      ? n
                      : gd.hero.content,
                }),
              ],
            }),
          ],
        },
        null === r || void 0 === r ? void 0 : r.slug
      );
    },
    Fb = () => {
      const {
        activeTab: e,
        handleTabClick: t,
        tabs: n,
      } = ((e) => {
        const { activeTab: t } = Cb(),
          n = ht();
        return {
          activeTab: t,
          handleTabClick: (e) => {
            n(null === e ? '/services' : '/services/'.concat(e));
          },
          tabs: e,
        };
      })([{ title: 'All', slug: null }, ...md]);
      return (0, Fn.jsx)('div', {
        className: 'flex justify-start space-x-4 mt-4',
        children: n.map((n, r) =>
          (0, Fn.jsx)(
            'button',
            {
              className: 'py-2 px-4 text-xs font-bold rounded '.concat(
                (null === e || void 0 === e ? void 0 : e.slug) ===
                  (null === n || void 0 === n ? void 0 : n.slug) ||
                  (!e && null === n.slug)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              ),
              onClick: () => t(null === n || void 0 === n ? void 0 : n.slug),
              children: null === n || void 0 === n ? void 0 : n.title,
            },
            r
          )
        ),
      });
    };
  function Db(e) {
    let { isOpen: t, onClose: n, project: r } = e;
    if (!t) return null;
    const { image: i, title: o, description: a, demo: s, technologies: l } = r;
    return (0, Fn.jsx)(kA.div, {
      className:
        'fixed  inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50',
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: n,
      children: (0, Fn.jsxs)(kA.div, {
        className:
          'bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh] w-full max-w-3xl relative',
        initial: { scale: 0.8 },
        animate: { scale: 1 },
        exit: { scale: 0.8 },
        onClick: (e) => e.stopPropagation(),
        children: [
          (0, Fn.jsx)('button', {
            className:
              'absolute top-4 right-4 text-gray-500 hover:text-gray-800',
            onClick: n,
            children: '\u2716',
          }),
          (0, Fn.jsx)('img', {
            src: i,
            alt: o,
            className: 'w-full object-cover aspect-[4/2]',
          }),
          (0, Fn.jsxs)('div', {
            className: 'p-6',
            children: [
              (0, Fn.jsx)('h2', {
                className: 'text-2xl font-bold text-gray-800 mb-4',
                children: o,
              }),
              (0, Fn.jsx)('p', {
                className: 'text-gray-600 mb-4',
                children: a,
              }),
              l &&
                (0, Fn.jsxs)('div', {
                  className: 'mb-4',
                  children: [
                    (0, Fn.jsx)('h3', {
                      className: 'text-lg font-semibold mb-2',
                      children: 'Technologies:',
                    }),
                    (0, Fn.jsx)('ul', {
                      className: 'flex flex-wrap gap-2',
                      children: l.map((e, t) =>
                        (0, Fn.jsx)(
                          'li',
                          {
                            className:
                              'px-3 py-1 bg-gray-200 text-sm rounded-full',
                            children: e,
                          },
                          t
                        )
                      ),
                    }),
                  ],
                }),
              (0, Fn.jsxs)('div', {
                className: 'relative group',
                children: [
                  (0, Fn.jsx)('iframe', {
                    src: s,
                    className: 'w-full aspect-video mb-4 rounded-lg',
                    allow:
                      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                    allowFullScreen: !0,
                    title: 'Project Demo',
                  }),
                  (0, Fn.jsx)('button', {
                    className:
                      'absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white px-3 py-1 rounded hidden group-hover:block',
                    onClick: () => navigator.clipboard.writeText(s),
                    children: 'Share',
                  }),
                  (0, Fn.jsx)('a', {
                    href: s,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700',
                    children: 'Watch on YouTube',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  }
  function Mb(e) {
    let {
      image: t,
      title: n,
      description: r,
      technologies: i,
      demo: o,
      setIsModalOpen: a,
      setselectedProject: s,
    } = e;
    const l = { image: t, title: n, description: r, technologies: i, demo: o };
    return (0, Fn.jsx)(Fn.Fragment, {
      children: (0, Fn.jsxs)('div', {
        className:
          'shadow-md hover:shadow-2xl rounded-lg overflow-hidden transform transition duration-300 flex flex-col',
        children: [
          (0, Fn.jsx)('img', {
            src: t,
            alt: n,
            className: 'w-full object-cover aspect-[4/2]',
          }),
          (0, Fn.jsxs)('div', {
            className: 'p-4',
            children: [
              (0, Fn.jsx)('h3', {
                className: 'text-xl font-semibold text-gray-800 mb-2',
                children: n,
              }),
              (0, Fn.jsxs)('p', {
                className: 'text-gray-600 text-sm',
                children: [r.slice(0, 100), '...'],
              }),
              (0, Fn.jsx)('button', {
                className:
                  'mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700',
                onClick: () => {
                  s(l), a(!0);
                },
                children: 'Explore More',
              }),
            ],
          }),
        ],
      }),
    });
  }
  const Rb = (e, t) => {
    switch (t.type) {
      case 'FIRST':
        return 1;
      case 'LAST':
        return t.totalPages;
      case 'PREV':
        return e > 1 ? e - 1 : 1;
      case 'NEXT':
        return e < t.totalPages ? e + 1 : t.totalPages;
      default:
        return t.page >= 1 && t.page <= t.totalPages ? t.page : 1;
    }
  };
  const jb = () => {
      const { selectedProjects: e } = Cb(),
        [t, n] = (0, r.useState)(null),
        {
          currentPage: i,
          totalPages: o,
          paginatedItems: a,
          goToFirst: s,
          goToLast: l,
          goToPage: c,
          goToNext: d,
          goToPrev: h,
        } = (function (e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 9;
          const n = Math.ceil(
              ((null === e || void 0 === e ? void 0 : e.length) || 0) / t
            ),
            [i, o] = (0, r.useReducer)(Rb, 1),
            a = (0, r.useMemo)(
              () =>
                null === e || void 0 === e
                  ? void 0
                  : e.slice((i - 1) * t, i * t),
              [i, e]
            );
          return {
            currentPage: i,
            totalPages: n,
            paginatedItems: a,
            goToFirst: () => o({ type: 'FIRST' }),
            goToLast: () => o({ type: 'LAST', totalPages: n }),
            goToPrev: () => o({ type: 'PREV' }),
            goToNext: () => o({ type: 'NEXT', totalPages: n }),
            goToPage: (e) => () => o({ type: 'SET', page: e, totalPages: n }),
          };
        })(e, 9),
        [f, p] = (0, r.useState)(!1);
      return e.length < 1
        ? (0, Fn.jsx)(kA.div, {
            className: 'container',
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delayChildren: 0.2 },
            children: (0, Fn.jsx)('h1', { children: 'No Projects' }),
          })
        : (0, Fn.jsxs)('div', {
            className: 'container mx-auto py-12',
            children: [
              (0, Fn.jsx)(kA.div, {
                className:
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6',
                initial: { opacity: 0, y: 50 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delayChildren: 0.2 },
                children:
                  null === a || void 0 === a
                    ? void 0
                    : a.map((e, t) =>
                        (0, Fn.jsx)(
                          kA.div,
                          {
                            className:
                              'shadow-lg rounded-lg overflow-hidden bg-white',
                            initial: { opacity: 0, scale: 0.8 },
                            animate: { opacity: 1, scale: 1 },
                            whileHover: { scale: 1.05 },
                            transition: { duration: 0.4 },
                            children: (0, Fn.jsx)(
                              Mb,
                              u(
                                { setIsModalOpen: p, setselectedProject: n },
                                e
                              ),
                              t
                            ),
                          },
                          e.id || t
                        )
                      ),
              }),
              (0, Fn.jsxs)(kA.div, {
                className:
                  'flex flex-wrap justify-center items-center mt-8 space-x-2 lg:justify-end',
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: [
                  (0, Fn.jsx)('button', {
                    className:
                      'flex items-center text-blue-500 hover:text-blue-700 text-sm '.concat(
                        1 === i ? 'opacity-50 cursor-not-allowed' : ''
                      ),
                    onClick: s,
                    disabled: 1 === i,
                    'aria-label': 'First Page',
                    children: (0, Fn.jsx)(Gn, { className: 'mr-2' }),
                  }),
                  (0, Fn.jsx)('button', {
                    className:
                      'flex items-center text-blue-500 hover:text-blue-700 text-sm '.concat(
                        1 === i ? 'opacity-50 cursor-not-allowed' : ''
                      ),
                    onClick: h,
                    disabled: 1 === i,
                    'aria-label': 'Previous Page',
                    children: (0, Fn.jsx)(qn, { className: 'mr-2' }),
                  }),
                  Array.from({ length: o }, (e, t) =>
                    (0, Fn.jsx)(
                      'button',
                      {
                        className: 'px-3 py-1 text-sm rounded '.concat(
                          i === t + 1
                            ? 'bg-blue-500 text-white'
                            : 'text-blue-500 hover:text-blue-700 hover:bg-gray-200'
                        ),
                        onClick: c(t + 1),
                        children: t + 1,
                      },
                      t + 1
                    )
                  ),
                  (0, Fn.jsx)('button', {
                    className:
                      'flex items-center text-blue-500 hover:text-blue-700 text-sm '.concat(
                        i === o ? 'opacity-50 cursor-not-allowed' : ''
                      ),
                    onClick: d,
                    disabled: i === o,
                    'aria-label': 'Next Page',
                    children: (0, Fn.jsx)($n, { className: 'ml-2' }),
                  }),
                  (0, Fn.jsx)('button', {
                    className:
                      'flex items-center text-blue-500 hover:text-blue-700 text-sm '.concat(
                        i === o ? 'opacity-50 cursor-not-allowed' : ''
                      ),
                    onClick: l,
                    disabled: i === o,
                    'aria-label': 'Last Page',
                    children: (0, Fn.jsx)(Kn, { className: 'ml-2' }),
                  }),
                ],
              }),
              (0, Fn.jsx)(Db, { isOpen: f, onClose: () => p(!1), project: t }),
            ],
          });
    },
    Lb = (0, r.memo)(jb);
  function zb() {
    return (0, Fn.jsx)(cd, {
      className: 'mt-14',
      children: (0, Fn.jsx)(Pb, {
        children: (0, Fn.jsxs)('div', {
          className: 'min-h-screen flex flex-col items-center',
          children: [
            (0, Fn.jsx)(Tb, {}),
            (0, Fn.jsx)(Fb, {}),
            (0, Fn.jsx)(Lb, {}),
          ],
        }),
      }),
    });
  }
  function Nb() {
    const e = Et(),
      t = e.status.toString();
    return (0, Fn.jsx)('div', {
      className: 'grid place-items-center min-h-screen bg-gray-100',
      children: (0, Fn.jsxs)('div', {
        className: 'max-w-lg text-center space-y-8',
        children: [
          (0, Fn.jsxs)('h1', {
            className:
              'text-9xl font-extrabold text-gray-800 flex justify-center space-x-1',
            children: [
              (0, Fn.jsx)('span', {
                className: 'text-sky-700',
                children: t[0],
              }),
              (0, Fn.jsx)('span', {
                className: 'text-sky-300',
                children: t[1],
              }),
              (0, Fn.jsx)('span', {
                className: 'text-sky-700',
                children: t[2],
              }),
            ],
          }),
          (0, Fn.jsx)('h2', {
            className:
              'text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text',
            children: e.statusText,
          }),
          (0, Fn.jsx)('p', {
            className: 'text-lg text-slate-500',
            children: e.error.message,
          }),
          (0, Fn.jsx)('div', {
            children: (0, Fn.jsx)('a', {
              href: '/',
              className:
                'px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300',
              children: 'Go Back to Home',
            }),
          }),
        ],
      }),
    });
  }
  var Bb, Vb;
  const Ob =
    ((Bb = [
      {
        path: '/',
        element: (0, Fn.jsx)(fr, {}),
        errorElement: (0, Fn.jsx)(Nb, {}),
        children: [
          { path: '/', element: (0, Fn.jsx)(xb, {}) },
          {
            path: '/services/:slug',
            element: (0, Fn.jsx)(zb, {}),
            loader: (e) => {
              let { params: t } = e;
              return md.find((e) => e.slug === t.slug);
            },
          },
          {
            path: '/services',
            element: (0, Fn.jsx)(zb, {}),
            loader: (e) => {
              let { params: t } = e;
              return {};
            },
          },
        ],
      },
    ]),
    fe({
      basename: null === Vb || void 0 === Vb ? void 0 : Vb.basename,
      future: null === Vb || void 0 === Vb ? void 0 : Vb.future,
      history: v({ window: null === Vb || void 0 === Vb ? void 0 : Vb.window }),
      hydrationData:
        (null === Vb || void 0 === Vb ? void 0 : Vb.hydrationData) || mn(),
      routes: Bb,
      mapRouteProperties: Dt,
      dataStrategy: null === Vb || void 0 === Vb ? void 0 : Vb.dataStrategy,
      patchRoutesOnNavigation:
        null === Vb || void 0 === Vb ? void 0 : Vb.patchRoutesOnNavigation,
      window: null === Vb || void 0 === Vb ? void 0 : Vb.window,
    }).initialize());
  const Ib = function () {
      return (0, Fn.jsx)(Cn, { router: Ob });
    },
    Ub = (e) => {
      e &&
        e instanceof Function &&
        n
          .e(453)
          .then(n.bind(n, 453))
          .then((t) => {
            let { getCLS: n, getFID: r, getFCP: i, getLCP: o, getTTFB: a } = t;
            n(e), r(e), i(e), o(e), a(e);
          });
    };
  i
    .createRoot(document.getElementById('root'))
    .render((0, Fn.jsx)(r.StrictMode, { children: (0, Fn.jsx)(Ib, {}) })),
    Ub();
})();
//# sourceMappingURL=main.0b223789.js.map
