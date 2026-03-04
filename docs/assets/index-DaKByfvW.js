(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const r of n)
      if (r.type === 'childList')
        for (const o of r.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(n) {
    const r = {};
    return (
      n.integrity && (r.integrity = n.integrity),
      n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : n.crossOrigin === 'anonymous'
          ? (r.credentials = 'omit')
          : (r.credentials = 'same-origin'),
      r
    );
  }
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const r = s(n);
    fetch(n.href, r);
  }
})();
function On(e) {
  const t = Object.create(null);
  for (const s of e.split(',')) t[s] = 1;
  return (s) => s in t;
}
const ye = {},
  ls = [],
  bt = () => {},
  uo = () => !1,
  Si = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Dn = (e) => e.startsWith('onUpdate:'),
  Ne = Object.assign,
  Rn = (e, t) => {
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1);
  },
  ea = Object.prototype.hasOwnProperty,
  ue = (e, t) => ea.call(e, t),
  Y = Array.isArray,
  as = (e) => Vs(e) === '[object Map]',
  Ai = (e) => Vs(e) === '[object Set]',
  cr = (e) => Vs(e) === '[object Date]',
  Z = (e) => typeof e == 'function',
  Ce = (e) => typeof e == 'string',
  vt = (e) => typeof e == 'symbol',
  he = (e) => e !== null && typeof e == 'object',
  fo = (e) => (he(e) || Z(e)) && Z(e.then) && Z(e.catch),
  ho = Object.prototype.toString,
  Vs = (e) => ho.call(e),
  ta = (e) => Vs(e).slice(8, -1),
  po = (e) => Vs(e) === '[object Object]',
  Fn = (e) =>
    Ce(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  xs = On(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  Ei = (e) => {
    const t = Object.create(null);
    return (s) => t[s] || (t[s] = e(s));
  },
  sa = /-\w/g,
  Ht = Ei((e) => e.replace(sa, (t) => t.slice(1).toUpperCase())),
  ia = /\B([A-Z])/g,
  Ut = Ei((e) => e.replace(ia, '-$1').toLowerCase()),
  mo = Ei((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  zi = Ei((e) => (e ? `on${mo(e)}` : '')),
  jt = (e, t) => !Object.is(e, t),
  ii = (e, ...t) => {
    for (let s = 0; s < e.length; s++) e[s](...t);
  },
  go = (e, t, s, i = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: i,
      value: s,
    });
  },
  Mi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  na = (e) => {
    const t = Ce(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let ur;
const $i = () =>
  ur ||
  (ur =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {});
function Pi(e) {
  if (Y(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const i = e[s],
        n = Ce(i) ? aa(i) : Pi(i);
      if (n) for (const r in n) t[r] = n[r];
    }
    return t;
  } else if (Ce(e) || he(e)) return e;
}
const ra = /;(?![^(]*\))/g,
  oa = /:([^]+)/,
  la = /\/\*[^]*?\*\//g;
function aa(e) {
  const t = {};
  return (
    e
      .replace(la, '')
      .split(ra)
      .forEach((s) => {
        if (s) {
          const i = s.split(oa);
          i.length > 1 && (t[i[0].trim()] = i[1].trim());
        }
      }),
    t
  );
}
function Ge(e) {
  let t = '';
  if (Ce(e)) t = e;
  else if (Y(e))
    for (let s = 0; s < e.length; s++) {
      const i = Ge(e[s]);
      i && (t += i + ' ');
    }
  else if (he(e)) for (const s in e) e[s] && (t += s + ' ');
  return t.trim();
}
const ca =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  ua = On(ca);
function bo(e) {
  return !!e || e === '';
}
function da(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let i = 0; s && i < e.length; i++) s = Us(e[i], t[i]);
  return s;
}
function Us(e, t) {
  if (e === t) return !0;
  let s = cr(e),
    i = cr(t);
  if (s || i) return s && i ? e.getTime() === t.getTime() : !1;
  if (((s = vt(e)), (i = vt(t)), s || i)) return e === t;
  if (((s = Y(e)), (i = Y(t)), s || i)) return s && i ? da(e, t) : !1;
  if (((s = he(e)), (i = he(t)), s || i)) {
    if (!s || !i) return !1;
    const n = Object.keys(e).length,
      r = Object.keys(t).length;
    if (n !== r) return !1;
    for (const o in e) {
      const l = e.hasOwnProperty(o),
        a = t.hasOwnProperty(o);
      if ((l && !a) || (!l && a) || !Us(e[o], t[o])) return !1;
    }
  }
  return String(e) === String(t);
}
function fa(e, t) {
  return e.findIndex((s) => Us(s, t));
}
const yo = (e) => !!(e && e.__v_isRef === !0),
  te = (e) =>
    Ce(e)
      ? e
      : e == null
        ? ''
        : Y(e) || (he(e) && (e.toString === ho || !Z(e.toString)))
          ? yo(e)
            ? te(e.value)
            : JSON.stringify(e, vo, 2)
          : String(e),
  vo = (e, t) =>
    yo(t)
      ? vo(e, t.value)
      : as(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (s, [i, n], r) => ((s[Yi(i, r) + ' =>'] = n), s),
              {},
            ),
          }
        : Ai(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((s) => Yi(s)) }
          : vt(t)
            ? Yi(t)
            : he(t) && !Y(t) && !po(t)
              ? String(t)
              : t,
  Yi = (e, t = '') => {
    var s;
    return vt(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e;
  };
let We;
class ha {
  constructor(t = !1) {
    ((this.detached = t),
      (this._active = !0),
      (this._on = 0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.__v_skip = !0),
      (this.parent = We),
      !t &&
        We &&
        (this.index = (We.scopes || (We.scopes = [])).push(this) - 1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = We;
      try {
        return ((We = this), t());
      } finally {
        We = s;
      }
    }
  }
  on() {
    ++this._on === 1 && ((this.prevScope = We), (We = this));
  }
  off() {
    this._on > 0 &&
      --this._on === 0 &&
      ((We = this.prevScope), (this.prevScope = void 0));
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, i;
      for (s = 0, i = this.effects.length; s < i; s++) this.effects[s].stop();
      for (this.effects.length = 0, s = 0, i = this.cleanups.length; s < i; s++)
        this.cleanups[s]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (s = 0, i = this.scopes.length; s < i; s++) this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const n = this.parent.scopes.pop();
        n &&
          n !== this &&
          ((this.parent.scopes[this.index] = n), (n.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function pa() {
  return We;
}
let xe;
const Gi = new WeakSet();
class wo {
  constructor(t) {
    ((this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      We && We.active && We.effects.push(this));
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), Gi.has(this) && (Gi.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || ko(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    ((this.flags |= 2), dr(this), To(this));
    const t = xe,
      s = rt;
    ((xe = this), (rt = !0));
    try {
      return this.fn();
    } finally {
      (_o(this), (xe = t), (rt = s), (this.flags &= -3));
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Bn(t);
      ((this.deps = this.depsTail = void 0),
        dr(this),
        this.onStop && this.onStop(),
        (this.flags &= -2));
    }
  }
  trigger() {
    this.flags & 64
      ? Gi.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    fn(this) && this.run();
  }
  get dirty() {
    return fn(this);
  }
}
let xo = 0,
  ks,
  Ts;
function ko(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ((e.next = Ts), (Ts = e));
    return;
  }
  ((e.next = ks), (ks = e));
}
function jn() {
  xo++;
}
function Hn() {
  if (--xo > 0) return;
  if (Ts) {
    let t = Ts;
    for (Ts = void 0; t; ) {
      const s = t.next;
      ((t.next = void 0), (t.flags &= -9), (t = s));
    }
  }
  let e;
  for (; ks; ) {
    let t = ks;
    for (ks = void 0; t; ) {
      const s = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (i) {
          e || (e = i);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function To(e) {
  for (let t = e.deps; t; t = t.nextDep)
    ((t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t));
}
function _o(e) {
  let t,
    s = e.depsTail,
    i = s;
  for (; i; ) {
    const n = i.prevDep;
    (i.version === -1 ? (i === s && (s = n), Bn(i), ma(i)) : (t = i),
      (i.dep.activeLink = i.prevActiveLink),
      (i.prevActiveLink = void 0),
      (i = n));
  }
  ((e.deps = t), (e.depsTail = s));
}
function fn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Co(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function Co(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === Ps) ||
    ((e.globalVersion = Ps),
    !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !fn(e)))
  )
    return;
  e.flags |= 2;
  const t = e.dep,
    s = xe,
    i = rt;
  ((xe = e), (rt = !0));
  try {
    To(e);
    const n = e.fn(e._value);
    (t.version === 0 || jt(n, e._value)) &&
      ((e.flags |= 128), (e._value = n), t.version++);
  } catch (n) {
    throw (t.version++, n);
  } finally {
    ((xe = s), (rt = i), _o(e), (e.flags &= -3));
  }
}
function Bn(e, t = !1) {
  const { dep: s, prevSub: i, nextSub: n } = e;
  if (
    (i && ((i.nextSub = n), (e.prevSub = void 0)),
    n && ((n.prevSub = i), (e.nextSub = void 0)),
    s.subs === e && ((s.subs = i), !i && s.computed))
  ) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep) Bn(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function ma(e) {
  const { prevDep: t, nextDep: s } = e;
  (t && ((t.nextDep = s), (e.prevDep = void 0)),
    s && ((s.prevDep = t), (e.nextDep = void 0)));
}
let rt = !0;
const So = [];
function Mt() {
  (So.push(rt), (rt = !1));
}
function $t() {
  const e = So.pop();
  rt = e === void 0 ? !0 : e;
}
function dr(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const s = xe;
    xe = void 0;
    try {
      t();
    } finally {
      xe = s;
    }
  }
}
let Ps = 0;
class ga {
  constructor(t, s) {
    ((this.sub = t),
      (this.dep = s),
      (this.version = s.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0));
  }
}
class Vn {
  constructor(t) {
    ((this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0),
      (this.__v_skip = !0));
  }
  track(t) {
    if (!xe || !rt || xe === this.computed) return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== xe)
      ((s = this.activeLink = new ga(xe, this)),
        xe.deps
          ? ((s.prevDep = xe.depsTail),
            (xe.depsTail.nextDep = s),
            (xe.depsTail = s))
          : (xe.deps = xe.depsTail = s),
        Ao(s));
    else if (s.version === -1 && ((s.version = this.version), s.nextDep)) {
      const i = s.nextDep;
      ((i.prevDep = s.prevDep),
        s.prevDep && (s.prevDep.nextDep = i),
        (s.prevDep = xe.depsTail),
        (s.nextDep = void 0),
        (xe.depsTail.nextDep = s),
        (xe.depsTail = s),
        xe.deps === s && (xe.deps = i));
    }
    return s;
  }
  trigger(t) {
    (this.version++, Ps++, this.notify(t));
  }
  notify(t) {
    jn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Hn();
    }
  }
}
function Ao(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let i = t.deps; i; i = i.nextDep) Ao(i);
    }
    const s = e.dep.subs;
    (s !== e && ((e.prevSub = s), s && (s.nextSub = e)), (e.dep.subs = e));
  }
}
const hn = new WeakMap(),
  Zt = Symbol(''),
  pn = Symbol(''),
  Ns = Symbol('');
function Re(e, t, s) {
  if (rt && xe) {
    let i = hn.get(e);
    i || hn.set(e, (i = new Map()));
    let n = i.get(s);
    (n || (i.set(s, (n = new Vn())), (n.map = i), (n.key = s)), n.track());
  }
}
function St(e, t, s, i, n, r) {
  const o = hn.get(e);
  if (!o) {
    Ps++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if ((jn(), t === 'clear')) o.forEach(l);
  else {
    const a = Y(e),
      c = a && Fn(s);
    if (a && s === 'length') {
      const u = Number(i);
      o.forEach((f, p) => {
        (p === 'length' || p === Ns || (!vt(p) && p >= u)) && l(f);
      });
    } else
      switch (
        ((s !== void 0 || o.has(void 0)) && l(o.get(s)), c && l(o.get(Ns)), t)
      ) {
        case 'add':
          a ? c && l(o.get('length')) : (l(o.get(Zt)), as(e) && l(o.get(pn)));
          break;
        case 'delete':
          a || (l(o.get(Zt)), as(e) && l(o.get(pn)));
          break;
        case 'set':
          as(e) && l(o.get(Zt));
          break;
      }
  }
  Hn();
}
function is(e) {
  const t = ce(e);
  return t === e ? t : (Re(t, 'iterate', Ns), et(e) ? t : t.map(ot));
}
function Ni(e) {
  return (Re((e = ce(e)), 'iterate', Ns), e);
}
function Ot(e, t) {
  return Pt(e) ? fs(es(e) ? ot(t) : t) : ot(t);
}
const ba = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ji(this, Symbol.iterator, (e) => Ot(this, e));
  },
  concat(...e) {
    return is(this).concat(...e.map((t) => (Y(t) ? is(t) : t)));
  },
  entries() {
    return Ji(this, 'entries', (e) => ((e[1] = Ot(this, e[1])), e));
  },
  every(e, t) {
    return kt(this, 'every', e, t, void 0, arguments);
  },
  filter(e, t) {
    return kt(
      this,
      'filter',
      e,
      t,
      (s) => s.map((i) => Ot(this, i)),
      arguments,
    );
  },
  find(e, t) {
    return kt(this, 'find', e, t, (s) => Ot(this, s), arguments);
  },
  findIndex(e, t) {
    return kt(this, 'findIndex', e, t, void 0, arguments);
  },
  findLast(e, t) {
    return kt(this, 'findLast', e, t, (s) => Ot(this, s), arguments);
  },
  findLastIndex(e, t) {
    return kt(this, 'findLastIndex', e, t, void 0, arguments);
  },
  forEach(e, t) {
    return kt(this, 'forEach', e, t, void 0, arguments);
  },
  includes(...e) {
    return Xi(this, 'includes', e);
  },
  indexOf(...e) {
    return Xi(this, 'indexOf', e);
  },
  join(e) {
    return is(this).join(e);
  },
  lastIndexOf(...e) {
    return Xi(this, 'lastIndexOf', e);
  },
  map(e, t) {
    return kt(this, 'map', e, t, void 0, arguments);
  },
  pop() {
    return ms(this, 'pop');
  },
  push(...e) {
    return ms(this, 'push', e);
  },
  reduce(e, ...t) {
    return fr(this, 'reduce', e, t);
  },
  reduceRight(e, ...t) {
    return fr(this, 'reduceRight', e, t);
  },
  shift() {
    return ms(this, 'shift');
  },
  some(e, t) {
    return kt(this, 'some', e, t, void 0, arguments);
  },
  splice(...e) {
    return ms(this, 'splice', e);
  },
  toReversed() {
    return is(this).toReversed();
  },
  toSorted(e) {
    return is(this).toSorted(e);
  },
  toSpliced(...e) {
    return is(this).toSpliced(...e);
  },
  unshift(...e) {
    return ms(this, 'unshift', e);
  },
  values() {
    return Ji(this, 'values', (e) => Ot(this, e));
  },
};
function Ji(e, t, s) {
  const i = Ni(e),
    n = i[t]();
  return (
    i !== e &&
      !et(e) &&
      ((n._next = n.next),
      (n.next = () => {
        const r = n._next();
        return (r.done || (r.value = s(r.value)), r);
      })),
    n
  );
}
const ya = Array.prototype;
function kt(e, t, s, i, n, r) {
  const o = Ni(e),
    l = o !== e && !et(e),
    a = o[t];
  if (a !== ya[t]) {
    const f = a.apply(e, r);
    return l ? ot(f) : f;
  }
  let c = s;
  o !== e &&
    (l
      ? (c = function (f, p) {
          return s.call(this, Ot(e, f), p, e);
        })
      : s.length > 2 &&
        (c = function (f, p) {
          return s.call(this, f, p, e);
        }));
  const u = a.call(o, c, i);
  return l && n ? n(u) : u;
}
function fr(e, t, s, i) {
  const n = Ni(e);
  let r = s;
  return (
    n !== e &&
      (et(e)
        ? s.length > 3 &&
          (r = function (o, l, a) {
            return s.call(this, o, l, a, e);
          })
        : (r = function (o, l, a) {
            return s.call(this, o, Ot(e, l), a, e);
          })),
    n[t](r, ...i)
  );
}
function Xi(e, t, s) {
  const i = ce(e);
  Re(i, 'iterate', Ns);
  const n = i[t](...s);
  return (n === -1 || n === !1) && Wn(s[0])
    ? ((s[0] = ce(s[0])), i[t](...s))
    : n;
}
function ms(e, t, s = []) {
  (Mt(), jn());
  const i = ce(e)[t].apply(e, s);
  return (Hn(), $t(), i);
}
const va = On('__proto__,__v_isRef,__isVue'),
  Eo = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(vt),
  );
function wa(e) {
  vt(e) || (e = String(e));
  const t = ce(this);
  return (Re(t, 'has', e), t.hasOwnProperty(e));
}
class Mo {
  constructor(t = !1, s = !1) {
    ((this._isReadonly = t), (this._isShallow = s));
  }
  get(t, s, i) {
    if (s === '__v_skip') return t.__v_skip;
    const n = this._isReadonly,
      r = this._isShallow;
    if (s === '__v_isReactive') return !n;
    if (s === '__v_isReadonly') return n;
    if (s === '__v_isShallow') return r;
    if (s === '__v_raw')
      return i === (n ? (r ? $a : Lo) : r ? No : Po).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(i)
        ? t
        : void 0;
    const o = Y(t);
    if (!n) {
      let a;
      if (o && (a = ba[s])) return a;
      if (s === 'hasOwnProperty') return wa;
    }
    const l = Reflect.get(t, s, Pe(t) ? t : i);
    if ((vt(s) ? Eo.has(s) : va(s)) || (n || Re(t, 'get', s), r)) return l;
    if (Pe(l)) {
      const a = o && Fn(s) ? l : l.value;
      return n && he(a) ? gn(a) : a;
    }
    return he(l) ? (n ? gn(l) : qn(l)) : l;
  }
}
class $o extends Mo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, i, n) {
    let r = t[s];
    const o = Y(t) && Fn(s);
    if (!this._isShallow) {
      const c = Pt(r);
      if (
        (!et(i) && !Pt(i) && ((r = ce(r)), (i = ce(i))), !o && Pe(r) && !Pe(i))
      )
        return (c || (r.value = i), !0);
    }
    const l = o ? Number(s) < t.length : ue(t, s),
      a = Reflect.set(t, s, i, Pe(t) ? t : n);
    return (
      t === ce(n) && (l ? jt(i, r) && St(t, 'set', s, i) : St(t, 'add', s, i)),
      a
    );
  }
  deleteProperty(t, s) {
    const i = ue(t, s);
    t[s];
    const n = Reflect.deleteProperty(t, s);
    return (n && i && St(t, 'delete', s, void 0), n);
  }
  has(t, s) {
    const i = Reflect.has(t, s);
    return ((!vt(s) || !Eo.has(s)) && Re(t, 'has', s), i);
  }
  ownKeys(t) {
    return (Re(t, 'iterate', Y(t) ? 'length' : Zt), Reflect.ownKeys(t));
  }
}
class xa extends Mo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const ka = new $o(),
  Ta = new xa(),
  _a = new $o(!0);
const mn = (e) => e,
  Xs = (e) => Reflect.getPrototypeOf(e);
function Ca(e, t, s) {
  return function (...i) {
    const n = this.__v_raw,
      r = ce(n),
      o = as(r),
      l = e === 'entries' || (e === Symbol.iterator && o),
      a = e === 'keys' && o,
      c = n[e](...i),
      u = s ? mn : t ? fs : ot;
    return (
      !t && Re(r, 'iterate', a ? pn : Zt),
      Ne(Object.create(c), {
        next() {
          const { value: f, done: p } = c.next();
          return p
            ? { value: f, done: p }
            : { value: l ? [u(f[0]), u(f[1])] : u(f), done: p };
        },
      })
    );
  };
}
function Qs(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
  };
}
function Sa(e, t) {
  const s = {
    get(n) {
      const r = this.__v_raw,
        o = ce(r),
        l = ce(n);
      e || (jt(n, l) && Re(o, 'get', n), Re(o, 'get', l));
      const { has: a } = Xs(o),
        c = t ? mn : e ? fs : ot;
      if (a.call(o, n)) return c(r.get(n));
      if (a.call(o, l)) return c(r.get(l));
      r !== o && r.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return (!e && Re(ce(n), 'iterate', Zt), n.size);
    },
    has(n) {
      const r = this.__v_raw,
        o = ce(r),
        l = ce(n);
      return (
        e || (jt(n, l) && Re(o, 'has', n), Re(o, 'has', l)),
        n === l ? r.has(n) : r.has(n) || r.has(l)
      );
    },
    forEach(n, r) {
      const o = this,
        l = o.__v_raw,
        a = ce(l),
        c = t ? mn : e ? fs : ot;
      return (
        !e && Re(a, 'iterate', Zt),
        l.forEach((u, f) => n.call(r, c(u), c(f), o))
      );
    },
  };
  return (
    Ne(
      s,
      e
        ? {
            add: Qs('add'),
            set: Qs('set'),
            delete: Qs('delete'),
            clear: Qs('clear'),
          }
        : {
            add(n) {
              !t && !et(n) && !Pt(n) && (n = ce(n));
              const r = ce(this);
              return (
                Xs(r).has.call(r, n) || (r.add(n), St(r, 'add', n, n)),
                this
              );
            },
            set(n, r) {
              !t && !et(r) && !Pt(r) && (r = ce(r));
              const o = ce(this),
                { has: l, get: a } = Xs(o);
              let c = l.call(o, n);
              c || ((n = ce(n)), (c = l.call(o, n)));
              const u = a.call(o, n);
              return (
                o.set(n, r),
                c ? jt(r, u) && St(o, 'set', n, r) : St(o, 'add', n, r),
                this
              );
            },
            delete(n) {
              const r = ce(this),
                { has: o, get: l } = Xs(r);
              let a = o.call(r, n);
              (a || ((n = ce(n)), (a = o.call(r, n))), l && l.call(r, n));
              const c = r.delete(n);
              return (a && St(r, 'delete', n, void 0), c);
            },
            clear() {
              const n = ce(this),
                r = n.size !== 0,
                o = n.clear();
              return (r && St(n, 'clear', void 0, void 0), o);
            },
          },
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((n) => {
      s[n] = Ca(n, e, t);
    }),
    s
  );
}
function Un(e, t) {
  const s = Sa(e, t);
  return (i, n, r) =>
    n === '__v_isReactive'
      ? !e
      : n === '__v_isReadonly'
        ? e
        : n === '__v_raw'
          ? i
          : Reflect.get(ue(s, n) && n in i ? s : i, n, r);
}
const Aa = { get: Un(!1, !1) },
  Ea = { get: Un(!1, !0) },
  Ma = { get: Un(!0, !1) };
const Po = new WeakMap(),
  No = new WeakMap(),
  Lo = new WeakMap(),
  $a = new WeakMap();
function Pa(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function Na(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Pa(ta(e));
}
function qn(e) {
  return Pt(e) ? e : Kn(e, !1, ka, Aa, Po);
}
function La(e) {
  return Kn(e, !1, _a, Ea, No);
}
function gn(e) {
  return Kn(e, !0, Ta, Ma, Lo);
}
function Kn(e, t, s, i, n) {
  if (!he(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = Na(e);
  if (r === 0) return e;
  const o = n.get(e);
  if (o) return o;
  const l = new Proxy(e, r === 2 ? i : s);
  return (n.set(e, l), l);
}
function es(e) {
  return Pt(e) ? es(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Pt(e) {
  return !!(e && e.__v_isReadonly);
}
function et(e) {
  return !!(e && e.__v_isShallow);
}
function Wn(e) {
  return e ? !!e.__v_raw : !1;
}
function ce(e) {
  const t = e && e.__v_raw;
  return t ? ce(t) : e;
}
function Ia(e) {
  return (
    !ue(e, '__v_skip') && Object.isExtensible(e) && go(e, '__v_skip', !0),
    e
  );
}
const ot = (e) => (he(e) ? qn(e) : e),
  fs = (e) => (he(e) ? gn(e) : e);
function Pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function se(e) {
  return Oa(e, !1);
}
function Oa(e, t) {
  return Pe(e) ? e : new Da(e, t);
}
class Da {
  constructor(t, s) {
    ((this.dep = new Vn()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = s ? t : ce(t)),
      (this._value = s ? t : ot(t)),
      (this.__v_isShallow = s));
  }
  get value() {
    return (this.dep.track(), this._value);
  }
  set value(t) {
    const s = this._rawValue,
      i = this.__v_isShallow || et(t) || Pt(t);
    ((t = i ? t : ce(t)),
      jt(t, s) &&
        ((this._rawValue = t),
        (this._value = i ? t : ot(t)),
        this.dep.trigger()));
  }
}
function fe(e) {
  return Pe(e) ? e.value : e;
}
const Ra = {
  get: (e, t, s) => (t === '__v_raw' ? e : fe(Reflect.get(e, t, s))),
  set: (e, t, s, i) => {
    const n = e[t];
    return Pe(n) && !Pe(s) ? ((n.value = s), !0) : Reflect.set(e, t, s, i);
  },
};
function Io(e) {
  return es(e) ? e : new Proxy(e, Ra);
}
class Fa {
  constructor(t, s, i) {
    ((this.fn = t),
      (this.setter = s),
      (this._value = void 0),
      (this.dep = new Vn(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Ps - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !s),
      (this.isSSR = i));
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && xe !== this))
      return (ko(this, !0), !0);
  }
  get value() {
    const t = this.dep.track();
    return (Co(this), t && (t.version = this.dep.version), this._value);
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function ja(e, t, s = !1) {
  let i, n;
  return (Z(e) ? (i = e) : ((i = e.get), (n = e.set)), new Fa(i, n, s));
}
const Zs = {},
  fi = new WeakMap();
let Gt;
function Ha(e, t = !1, s = Gt) {
  if (s) {
    let i = fi.get(s);
    (i || fi.set(s, (i = [])), i.push(e));
  }
}
function Ba(e, t, s = ye) {
  const {
      immediate: i,
      deep: n,
      once: r,
      scheduler: o,
      augmentJob: l,
      call: a,
    } = s,
    c = (T) => (n ? T : et(T) || n === !1 || n === 0 ? At(T, 1) : At(T));
  let u,
    f,
    p,
    y,
    k = !1,
    v = !1;
  if (
    (Pe(e)
      ? ((f = () => e.value), (k = et(e)))
      : es(e)
        ? ((f = () => c(e)), (k = !0))
        : Y(e)
          ? ((v = !0),
            (k = e.some((T) => es(T) || et(T))),
            (f = () =>
              e.map((T) => {
                if (Pe(T)) return T.value;
                if (es(T)) return c(T);
                if (Z(T)) return a ? a(T, 2) : T();
              })))
          : Z(e)
            ? t
              ? (f = a ? () => a(e, 2) : e)
              : (f = () => {
                  if (p) {
                    Mt();
                    try {
                      p();
                    } finally {
                      $t();
                    }
                  }
                  const T = Gt;
                  Gt = u;
                  try {
                    return a ? a(e, 3, [y]) : e(y);
                  } finally {
                    Gt = T;
                  }
                })
            : (f = bt),
    t && n)
  ) {
    const T = f,
      V = n === !0 ? 1 / 0 : n;
    f = () => At(T(), V);
  }
  const x = pa(),
    M = () => {
      (u.stop(), x && x.active && Rn(x.effects, u));
    };
  if (r && t) {
    const T = t;
    t = (...V) => {
      (T(...V), M());
    };
  }
  let b = v ? new Array(e.length).fill(Zs) : Zs;
  const P = (T) => {
    if (!(!(u.flags & 1) || (!u.dirty && !T)))
      if (t) {
        const V = u.run();
        if (n || k || (v ? V.some((K, G) => jt(K, b[G])) : jt(V, b))) {
          p && p();
          const K = Gt;
          Gt = u;
          try {
            const G = [V, b === Zs ? void 0 : v && b[0] === Zs ? [] : b, y];
            ((b = V), a ? a(t, 3, G) : t(...G));
          } finally {
            Gt = K;
          }
        }
      } else u.run();
  };
  return (
    l && l(P),
    (u = new wo(f)),
    (u.scheduler = o ? () => o(P, !1) : P),
    (y = (T) => Ha(T, !1, u)),
    (p = u.onStop =
      () => {
        const T = fi.get(u);
        if (T) {
          if (a) a(T, 4);
          else for (const V of T) V();
          fi.delete(u);
        }
      }),
    t ? (i ? P(!0) : (b = u.run())) : o ? o(P.bind(null, !0), !0) : u.run(),
    (M.pause = u.pause.bind(u)),
    (M.resume = u.resume.bind(u)),
    (M.stop = M),
    M
  );
}
function At(e, t = 1 / 0, s) {
  if (
    t <= 0 ||
    !he(e) ||
    e.__v_skip ||
    ((s = s || new Map()), (s.get(e) || 0) >= t)
  )
    return e;
  if ((s.set(e, t), t--, Pe(e))) At(e.value, t, s);
  else if (Y(e)) for (let i = 0; i < e.length; i++) At(e[i], t, s);
  else if (Ai(e) || as(e))
    e.forEach((i) => {
      At(i, t, s);
    });
  else if (po(e)) {
    for (const i in e) At(e[i], t, s);
    for (const i of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, i) && At(e[i], t, s);
  }
  return e;
}
function qs(e, t, s, i) {
  try {
    return i ? e(...i) : e();
  } catch (n) {
    Li(n, t, s);
  }
}
function lt(e, t, s, i) {
  if (Z(e)) {
    const n = qs(e, t, s, i);
    return (
      n &&
        fo(n) &&
        n.catch((r) => {
          Li(r, t, s);
        }),
      n
    );
  }
  if (Y(e)) {
    const n = [];
    for (let r = 0; r < e.length; r++) n.push(lt(e[r], t, s, i));
    return n;
  }
}
function Li(e, t, s, i = !0) {
  const n = t ? t.vnode : null,
    { errorHandler: r, throwUnhandledErrorInProduction: o } =
      (t && t.appContext.config) || ye;
  if (t) {
    let l = t.parent;
    const a = t.proxy,
      c = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, a, c) === !1) return;
      }
      l = l.parent;
    }
    if (r) {
      (Mt(), qs(r, null, 10, [e, a, c]), $t());
      return;
    }
  }
  Va(e, s, n, i, o);
}
function Va(e, t, s, i = !0, n = !1) {
  if (n) throw e;
  console.error(e);
}
const He = [];
let ft = -1;
const cs = [];
let Dt = null,
  os = 0;
const Oo = Promise.resolve();
let hi = null;
function Bt(e) {
  const t = hi || Oo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ua(e) {
  let t = ft + 1,
    s = He.length;
  for (; t < s; ) {
    const i = (t + s) >>> 1,
      n = He[i],
      r = Ls(n);
    r < e || (r === e && n.flags & 2) ? (t = i + 1) : (s = i);
  }
  return t;
}
function zn(e) {
  if (!(e.flags & 1)) {
    const t = Ls(e),
      s = He[He.length - 1];
    (!s || (!(e.flags & 2) && t >= Ls(s)) ? He.push(e) : He.splice(Ua(t), 0, e),
      (e.flags |= 1),
      Do());
  }
}
function Do() {
  hi || (hi = Oo.then(Fo));
}
function qa(e) {
  (Y(e)
    ? cs.push(...e)
    : Dt && e.id === -1
      ? Dt.splice(os + 1, 0, e)
      : e.flags & 1 || (cs.push(e), (e.flags |= 1)),
    Do());
}
function hr(e, t, s = ft + 1) {
  for (; s < He.length; s++) {
    const i = He[s];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid) continue;
      (He.splice(s, 1),
        s--,
        i.flags & 4 && (i.flags &= -2),
        i(),
        i.flags & 4 || (i.flags &= -2));
    }
  }
}
function Ro(e) {
  if (cs.length) {
    const t = [...new Set(cs)].sort((s, i) => Ls(s) - Ls(i));
    if (((cs.length = 0), Dt)) {
      Dt.push(...t);
      return;
    }
    for (Dt = t, os = 0; os < Dt.length; os++) {
      const s = Dt[os];
      (s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), (s.flags &= -2));
    }
    ((Dt = null), (os = 0));
  }
}
const Ls = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Fo(e) {
  try {
    for (ft = 0; ft < He.length; ft++) {
      const t = He[ft];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        qs(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ft < He.length; ft++) {
      const t = He[ft];
      t && (t.flags &= -2);
    }
    ((ft = -1),
      (He.length = 0),
      Ro(),
      (hi = null),
      (He.length || cs.length) && Fo());
  }
}
let Ze = null,
  jo = null;
function pi(e) {
  const t = Ze;
  return ((Ze = e), (jo = (e && e.type.__scopeId) || null), t);
}
function Ho(e, t = Ze, s) {
  if (!t || e._n) return e;
  const i = (...n) => {
    i._d && bi(-1);
    const r = pi(t);
    let o;
    try {
      o = e(...n);
    } finally {
      (pi(r), i._d && bi(1));
    }
    return o;
  };
  return ((i._n = !0), (i._c = !0), (i._d = !0), i);
}
function bn(e, t) {
  if (Ze === null) return e;
  const s = Hi(Ze),
    i = e.dirs || (e.dirs = []);
  for (let n = 0; n < t.length; n++) {
    let [r, o, l, a = ye] = t[n];
    r &&
      (Z(r) && (r = { mounted: r, updated: r }),
      r.deep && At(o),
      i.push({
        dir: r,
        instance: s,
        value: o,
        oldValue: void 0,
        arg: l,
        modifiers: a,
      }));
  }
  return e;
}
function qt(e, t, s, i) {
  const n = e.dirs,
    r = t && t.dirs;
  for (let o = 0; o < n.length; o++) {
    const l = n[o];
    r && (l.oldValue = r[o].value);
    let a = l.dir[i];
    a && (Mt(), lt(a, s, 8, [e.el, l, e, t]), $t());
  }
}
function Bo(e, t) {
  if (Ve) {
    let s = Ve.provides;
    const i = Ve.parent && Ve.parent.provides;
    (i === s && (s = Ve.provides = Object.create(i)), (s[e] = t));
  }
}
function _s(e, t, s = !1) {
  const i = vl();
  if (i || us) {
    let n = us
      ? us._context.provides
      : i
        ? i.parent == null || i.ce
          ? i.vnode.appContext && i.vnode.appContext.provides
          : i.parent.provides
        : void 0;
    if (n && e in n) return n[e];
    if (arguments.length > 1) return s && Z(t) ? t.call(i && i.proxy) : t;
  }
}
const Ka = Symbol.for('v-scx'),
  Wa = () => _s(Ka);
function yt(e, t, s) {
  return Vo(e, t, s);
}
function Vo(e, t, s = ye) {
  const { immediate: i, deep: n, flush: r, once: o } = s,
    l = Ne({}, s),
    a = (t && i) || (!t && r !== 'post');
  let c;
  if (Ds) {
    if (r === 'sync') {
      const y = Wa();
      c = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!a) {
      const y = () => {};
      return ((y.stop = bt), (y.resume = bt), (y.pause = bt), y);
    }
  }
  const u = Ve;
  l.call = (y, k, v) => lt(y, u, k, v);
  let f = !1;
  (r === 'post'
    ? (l.scheduler = (y) => {
        De(y, u && u.suspense);
      })
    : r !== 'sync' &&
      ((f = !0),
      (l.scheduler = (y, k) => {
        k ? y() : zn(y);
      })),
    (l.augmentJob = (y) => {
      (t && (y.flags |= 4),
        f && ((y.flags |= 2), u && ((y.id = u.uid), (y.i = u))));
    }));
  const p = Ba(e, t, l);
  return (Ds && (c ? c.push(p) : a && p()), p);
}
function za(e, t, s) {
  const i = this.proxy,
    n = Ce(e) ? (e.includes('.') ? Uo(i, e) : () => i[e]) : e.bind(i, i);
  let r;
  Z(t) ? (r = t) : ((r = t.handler), (s = t));
  const o = Ks(this),
    l = Vo(n, r.bind(i), s);
  return (o(), l);
}
function Uo(e, t) {
  const s = t.split('.');
  return () => {
    let i = e;
    for (let n = 0; n < s.length && i; n++) i = i[s[n]];
    return i;
  };
}
const qo = Symbol('_vte'),
  Ko = (e) => e.__isTeleport,
  Cs = (e) => e && (e.disabled || e.disabled === ''),
  pr = (e) => e && (e.defer || e.defer === ''),
  mr = (e) => typeof SVGElement < 'u' && e instanceof SVGElement,
  gr = (e) => typeof MathMLElement == 'function' && e instanceof MathMLElement,
  yn = (e, t) => {
    const s = e && e.to;
    return Ce(s) ? (t ? t(s) : null) : s;
  },
  Wo = {
    name: 'Teleport',
    __isTeleport: !0,
    process(e, t, s, i, n, r, o, l, a, c) {
      const {
          mc: u,
          pc: f,
          pbc: p,
          o: { insert: y, querySelector: k, createText: v, createComment: x },
        } = c,
        M = Cs(t.props);
      let { shapeFlag: b, children: P, dynamicChildren: T } = t;
      if (e == null) {
        const V = (t.el = v('')),
          K = (t.anchor = v(''));
        (y(V, s, i), y(K, s, i));
        const G = (j, ee) => {
            b & 16 && u(P, j, ee, n, r, o, l, a);
          },
          O = () => {
            const j = (t.target = yn(t.props, k)),
              ee = vn(j, t, v, y);
            j &&
              (o !== 'svg' && mr(j)
                ? (o = 'svg')
                : o !== 'mathml' && gr(j) && (o = 'mathml'),
              n &&
                n.isCE &&
                (
                  n.ce._teleportTargets || (n.ce._teleportTargets = new Set())
                ).add(j),
              M || (G(j, ee), ni(t, !1)));
          };
        (M && (G(s, K), ni(t, !0)),
          pr(t.props)
            ? ((t.el.__isMounted = !1),
              De(() => {
                (O(), delete t.el.__isMounted);
              }, r))
            : O());
      } else {
        if (pr(t.props) && e.el.__isMounted === !1) {
          De(() => {
            Wo.process(e, t, s, i, n, r, o, l, a, c);
          }, r);
          return;
        }
        ((t.el = e.el), (t.targetStart = e.targetStart));
        const V = (t.anchor = e.anchor),
          K = (t.target = e.target),
          G = (t.targetAnchor = e.targetAnchor),
          O = Cs(e.props),
          j = O ? s : K,
          ee = O ? V : G;
        if (
          (o === 'svg' || mr(K)
            ? (o = 'svg')
            : (o === 'mathml' || gr(K)) && (o = 'mathml'),
          T
            ? (p(e.dynamicChildren, T, j, n, r, o, l), Xn(e, t, !0))
            : a || f(e, t, j, ee, n, r, o, l, !1),
          M)
        )
          O
            ? t.props &&
              e.props &&
              t.props.to !== e.props.to &&
              (t.props.to = e.props.to)
            : ei(t, s, V, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const oe = (t.target = yn(t.props, k));
          oe && ei(t, oe, null, c, 0);
        } else O && ei(t, K, G, c, 1);
        ni(t, M);
      }
    },
    remove(e, t, s, { um: i, o: { remove: n } }, r) {
      const {
        shapeFlag: o,
        children: l,
        anchor: a,
        targetStart: c,
        targetAnchor: u,
        target: f,
        props: p,
      } = e;
      if ((f && (n(c), n(u)), r && n(a), o & 16)) {
        const y = r || !Cs(p);
        for (let k = 0; k < l.length; k++) {
          const v = l[k];
          i(v, t, s, y, !!v.dynamicChildren);
        }
      }
    },
    move: ei,
    hydrate: Ya,
  };
function ei(e, t, s, { o: { insert: i }, m: n }, r = 2) {
  r === 0 && i(e.targetAnchor, t, s);
  const { el: o, anchor: l, shapeFlag: a, children: c, props: u } = e,
    f = r === 2;
  if ((f && i(o, t, s), (!f || Cs(u)) && a & 16))
    for (let p = 0; p < c.length; p++) n(c[p], t, s, 2);
  f && i(l, t, s);
}
function Ya(
  e,
  t,
  s,
  i,
  n,
  r,
  {
    o: {
      nextSibling: o,
      parentNode: l,
      querySelector: a,
      insert: c,
      createText: u,
    },
  },
  f,
) {
  function p(x, M) {
    let b = M;
    for (; b; ) {
      if (b && b.nodeType === 8) {
        if (b.data === 'teleport start anchor') t.targetStart = b;
        else if (b.data === 'teleport anchor') {
          ((t.targetAnchor = b),
            (x._lpa = t.targetAnchor && o(t.targetAnchor)));
          break;
        }
      }
      b = o(b);
    }
  }
  function y(x, M) {
    M.anchor = f(o(x), M, l(x), s, i, n, r);
  }
  const k = (t.target = yn(t.props, a)),
    v = Cs(t.props);
  if (k) {
    const x = k._lpa || k.firstChild;
    (t.shapeFlag & 16 &&
      (v
        ? (y(e, t),
          p(k, x),
          t.targetAnchor || vn(k, t, u, c, l(e) === k ? e : null))
        : ((t.anchor = o(e)),
          p(k, x),
          t.targetAnchor || vn(k, t, u, c),
          f(x && o(x), t, k, s, i, n, r))),
      ni(t, v));
  } else
    v &&
      t.shapeFlag & 16 &&
      (y(e, t), (t.targetStart = e), (t.targetAnchor = o(e)));
  return t.anchor && o(t.anchor);
}
const Yn = Wo;
function ni(e, t) {
  const s = e.ctx;
  if (s && s.ut) {
    let i, n;
    for (
      t
        ? ((i = e.el), (n = e.anchor))
        : ((i = e.targetStart), (n = e.targetAnchor));
      i && i !== n;
    )
      (i.nodeType === 1 && i.setAttribute('data-v-owner', s.uid),
        (i = i.nextSibling));
    s.ut();
  }
}
function vn(e, t, s, i, n = null) {
  const r = (t.targetStart = s('')),
    o = (t.targetAnchor = s(''));
  return ((r[qo] = o), e && (i(r, e, n), i(o, e, n)), o);
}
const pt = Symbol('_leaveCb'),
  gs = Symbol('_enterCb');
function Ga() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Di(() => {
      e.isMounted = !0;
    }),
    Ri(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Qe = [Function, Array],
  zo = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Qe,
    onEnter: Qe,
    onAfterEnter: Qe,
    onEnterCancelled: Qe,
    onBeforeLeave: Qe,
    onLeave: Qe,
    onAfterLeave: Qe,
    onLeaveCancelled: Qe,
    onBeforeAppear: Qe,
    onAppear: Qe,
    onAfterAppear: Qe,
    onAppearCancelled: Qe,
  },
  Yo = (e) => {
    const t = e.subTree;
    return t.component ? Yo(t.component) : t;
  },
  Ja = {
    name: 'BaseTransition',
    props: zo,
    setup(e, { slots: t }) {
      const s = vl(),
        i = Ga();
      return () => {
        const n = t.default && Xo(t.default(), !0);
        if (!n || !n.length) return;
        const r = Go(n),
          o = ce(e),
          { mode: l } = o;
        if (i.isLeaving) return Qi(r);
        const a = br(r);
        if (!a) return Qi(r);
        let c = wn(a, o, i, s, (f) => (c = f));
        a.type !== Be && Is(a, c);
        let u = s.subTree && br(s.subTree);
        if (u && u.type !== Be && !Jt(u, a) && Yo(s).type !== Be) {
          let f = wn(u, o, i, s);
          if ((Is(u, f), l === 'out-in' && a.type !== Be))
            return (
              (i.isLeaving = !0),
              (f.afterLeave = () => {
                ((i.isLeaving = !1),
                  s.job.flags & 8 || s.update(),
                  delete f.afterLeave,
                  (u = void 0));
              }),
              Qi(r)
            );
          l === 'in-out' && a.type !== Be
            ? (f.delayLeave = (p, y, k) => {
                const v = Jo(i, u);
                ((v[String(u.key)] = u),
                  (p[pt] = () => {
                    (y(),
                      (p[pt] = void 0),
                      delete c.delayedLeave,
                      (u = void 0));
                  }),
                  (c.delayedLeave = () => {
                    (k(), delete c.delayedLeave, (u = void 0));
                  }));
              })
            : (u = void 0);
        } else u && (u = void 0);
        return r;
      };
    },
  };
function Go(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const s of e)
      if (s.type !== Be) {
        t = s;
        break;
      }
  }
  return t;
}
const Xa = Ja;
function Jo(e, t) {
  const { leavingVNodes: s } = e;
  let i = s.get(t.type);
  return (i || ((i = Object.create(null)), s.set(t.type, i)), i);
}
function wn(e, t, s, i, n) {
  const {
      appear: r,
      mode: o,
      persisted: l = !1,
      onBeforeEnter: a,
      onEnter: c,
      onAfterEnter: u,
      onEnterCancelled: f,
      onBeforeLeave: p,
      onLeave: y,
      onAfterLeave: k,
      onLeaveCancelled: v,
      onBeforeAppear: x,
      onAppear: M,
      onAfterAppear: b,
      onAppearCancelled: P,
    } = t,
    T = String(e.key),
    V = Jo(s, e),
    K = (j, ee) => {
      j && lt(j, i, 9, ee);
    },
    G = (j, ee) => {
      const oe = ee[1];
      (K(j, ee),
        Y(j) ? j.every((B) => B.length <= 1) && oe() : j.length <= 1 && oe());
    },
    O = {
      mode: o,
      persisted: l,
      beforeEnter(j) {
        let ee = a;
        if (!s.isMounted)
          if (r) ee = x || a;
          else return;
        j[pt] && j[pt](!0);
        const oe = V[T];
        (oe && Jt(e, oe) && oe.el[pt] && oe.el[pt](), K(ee, [j]));
      },
      enter(j) {
        if (V[T] === e) return;
        let ee = c,
          oe = u,
          B = f;
        if (!s.isMounted)
          if (r) ((ee = M || c), (oe = b || u), (B = P || f));
          else return;
        let ve = !1;
        j[gs] = (tt) => {
          ve ||
            ((ve = !0),
            tt ? K(B, [j]) : K(oe, [j]),
            O.delayedLeave && O.delayedLeave(),
            (j[gs] = void 0));
        };
        const Me = j[gs].bind(null, !1);
        ee ? G(ee, [j, Me]) : Me();
      },
      leave(j, ee) {
        const oe = String(e.key);
        if ((j[gs] && j[gs](!0), s.isUnmounting)) return ee();
        K(p, [j]);
        let B = !1;
        j[pt] = (Me) => {
          B ||
            ((B = !0),
            ee(),
            Me ? K(v, [j]) : K(k, [j]),
            (j[pt] = void 0),
            V[oe] === e && delete V[oe]);
        };
        const ve = j[pt].bind(null, !1);
        ((V[oe] = e), y ? G(y, [j, ve]) : ve());
      },
      clone(j) {
        const ee = wn(j, t, s, i, n);
        return (n && n(ee), ee);
      },
    };
  return O;
}
function Qi(e) {
  if (Ii(e)) return ((e = Vt(e)), (e.children = null), e);
}
function br(e) {
  if (!Ii(e)) return Ko(e.type) && e.children ? Go(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: s } = e;
  if (s) {
    if (t & 16) return s[0];
    if (t & 32 && Z(s.default)) return s.default();
  }
}
function Is(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), Is(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function Xo(e, t = !1, s) {
  let i = [],
    n = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const l = s == null ? o.key : String(s) + String(o.key != null ? o.key : r);
    o.type === ie
      ? (o.patchFlag & 128 && n++, (i = i.concat(Xo(o.children, t, l))))
      : (t || o.type !== Be) && i.push(l != null ? Vt(o, { key: l }) : o);
  }
  if (n > 1) for (let r = 0; r < i.length; r++) i[r].patchFlag = -2;
  return i;
}
function Qo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
function yr(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const mi = new WeakMap();
function Ss(e, t, s, i, n = !1) {
  if (Y(e)) {
    e.forEach((v, x) => Ss(v, t && (Y(t) ? t[x] : t), s, i, n));
    return;
  }
  if (As(i) && !n) {
    i.shapeFlag & 512 &&
      i.type.__asyncResolved &&
      i.component.subTree.component &&
      Ss(e, t, s, i.component.subTree);
    return;
  }
  const r = i.shapeFlag & 4 ? Hi(i.component) : i.el,
    o = n ? null : r,
    { i: l, r: a } = e,
    c = t && t.r,
    u = l.refs === ye ? (l.refs = {}) : l.refs,
    f = l.setupState,
    p = ce(f),
    y = f === ye ? uo : (v) => (yr(u, v) ? !1 : ue(p, v)),
    k = (v, x) => !(x && yr(u, x));
  if (c != null && c !== a) {
    if ((vr(t), Ce(c))) ((u[c] = null), y(c) && (f[c] = null));
    else if (Pe(c)) {
      const v = t;
      (k(c, v.k) && (c.value = null), v.k && (u[v.k] = null));
    }
  }
  if (Z(a)) qs(a, l, 12, [o, u]);
  else {
    const v = Ce(a),
      x = Pe(a);
    if (v || x) {
      const M = () => {
        if (e.f) {
          const b = v ? (y(a) ? f[a] : u[a]) : k() || !e.k ? a.value : u[e.k];
          if (n) Y(b) && Rn(b, r);
          else if (Y(b)) b.includes(r) || b.push(r);
          else if (v) ((u[a] = [r]), y(a) && (f[a] = u[a]));
          else {
            const P = [r];
            (k(a, e.k) && (a.value = P), e.k && (u[e.k] = P));
          }
        } else
          v
            ? ((u[a] = o), y(a) && (f[a] = o))
            : x && (k(a, e.k) && (a.value = o), e.k && (u[e.k] = o));
      };
      if (o) {
        const b = () => {
          (M(), mi.delete(e));
        };
        ((b.id = -1), mi.set(e, b), De(b, s));
      } else (vr(e), M());
    }
  }
}
function vr(e) {
  const t = mi.get(e);
  t && ((t.flags |= 8), mi.delete(e));
}
$i().requestIdleCallback;
$i().cancelIdleCallback;
const As = (e) => !!e.type.__asyncLoader,
  Ii = (e) => e.type.__isKeepAlive;
function Qa(e, t) {
  Zo(e, 'a', t);
}
function Za(e, t) {
  Zo(e, 'da', t);
}
function Zo(e, t, s = Ve) {
  const i =
    e.__wdc ||
    (e.__wdc = () => {
      let n = s;
      for (; n; ) {
        if (n.isDeactivated) return;
        n = n.parent;
      }
      return e();
    });
  if ((Oi(t, i, s), s)) {
    let n = s.parent;
    for (; n && n.parent; )
      (Ii(n.parent.vnode) && ec(i, t, s, n), (n = n.parent));
  }
}
function ec(e, t, s, i) {
  const n = Oi(t, e, i, !0);
  el(() => {
    Rn(i[t], n);
  }, s);
}
function Oi(e, t, s = Ve, i = !1) {
  if (s) {
    const n = s[e] || (s[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...o) => {
          Mt();
          const l = Ks(s),
            a = lt(t, s, e, o);
          return (l(), $t(), a);
        });
    return (i ? n.unshift(r) : n.push(r), r);
  }
}
const Lt =
    (e) =>
    (t, s = Ve) => {
      (!Ds || e === 'sp') && Oi(e, (...i) => t(...i), s);
    },
  tc = Lt('bm'),
  Di = Lt('m'),
  sc = Lt('bu'),
  ic = Lt('u'),
  Ri = Lt('bum'),
  el = Lt('um'),
  nc = Lt('sp'),
  rc = Lt('rtg'),
  oc = Lt('rtc');
function lc(e, t = Ve) {
  Oi('ec', e, t);
}
const ac = Symbol.for('v-ndc');
function ze(e, t, s, i) {
  let n;
  const r = s,
    o = Y(e);
  if (o || Ce(e)) {
    const l = o && es(e);
    let a = !1,
      c = !1;
    (l && ((a = !et(e)), (c = Pt(e)), (e = Ni(e))), (n = new Array(e.length)));
    for (let u = 0, f = e.length; u < f; u++)
      n[u] = t(a ? (c ? fs(ot(e[u])) : ot(e[u])) : e[u], u, void 0, r);
  } else if (typeof e == 'number') {
    n = new Array(e);
    for (let l = 0; l < e; l++) n[l] = t(l + 1, l, void 0, r);
  } else if (he(e))
    if (e[Symbol.iterator]) n = Array.from(e, (l, a) => t(l, a, void 0, r));
    else {
      const l = Object.keys(e);
      n = new Array(l.length);
      for (let a = 0, c = l.length; a < c; a++) {
        const u = l[a];
        n[a] = t(e[u], u, a, r);
      }
    }
  else n = [];
  return n;
}
const xn = (e) => (e ? (wl(e) ? Hi(e) : xn(e.parent)) : null),
  Es = Ne(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => xn(e.parent),
    $root: (e) => xn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => sl(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        zn(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Bt.bind(e.proxy)),
    $watch: (e) => za.bind(e),
  }),
  Zi = (e, t) => e !== ye && !e.__isScriptSetup && ue(e, t),
  cc = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0;
      const {
        ctx: s,
        setupState: i,
        data: n,
        props: r,
        accessCache: o,
        type: l,
        appContext: a,
      } = e;
      if (t[0] !== '$') {
        const p = o[t];
        if (p !== void 0)
          switch (p) {
            case 1:
              return i[t];
            case 2:
              return n[t];
            case 4:
              return s[t];
            case 3:
              return r[t];
          }
        else {
          if (Zi(i, t)) return ((o[t] = 1), i[t]);
          if (n !== ye && ue(n, t)) return ((o[t] = 2), n[t]);
          if (ue(r, t)) return ((o[t] = 3), r[t]);
          if (s !== ye && ue(s, t)) return ((o[t] = 4), s[t]);
          kn && (o[t] = 0);
        }
      }
      const c = Es[t];
      let u, f;
      if (c) return (t === '$attrs' && Re(e.attrs, 'get', ''), c(e));
      if ((u = l.__cssModules) && (u = u[t])) return u;
      if (s !== ye && ue(s, t)) return ((o[t] = 4), s[t]);
      if (((f = a.config.globalProperties), ue(f, t))) return f[t];
    },
    set({ _: e }, t, s) {
      const { data: i, setupState: n, ctx: r } = e;
      return Zi(n, t)
        ? ((n[t] = s), !0)
        : i !== ye && ue(i, t)
          ? ((i[t] = s), !0)
          : ue(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((r[t] = s), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: s,
          ctx: i,
          appContext: n,
          props: r,
          type: o,
        },
      },
      l,
    ) {
      let a;
      return !!(
        s[l] ||
        (e !== ye && l[0] !== '$' && ue(e, l)) ||
        Zi(t, l) ||
        ue(r, l) ||
        ue(i, l) ||
        ue(Es, l) ||
        ue(n.config.globalProperties, l) ||
        ((a = o.__cssModules) && a[l])
      );
    },
    defineProperty(e, t, s) {
      return (
        s.get != null
          ? (e._.accessCache[t] = 0)
          : ue(s, 'value') && this.set(e, t, s.value, null),
        Reflect.defineProperty(e, t, s)
      );
    },
  };
function wr(e) {
  return Y(e) ? e.reduce((t, s) => ((t[s] = null), t), {}) : e;
}
let kn = !0;
function uc(e) {
  const t = sl(e),
    s = e.proxy,
    i = e.ctx;
  ((kn = !1), t.beforeCreate && xr(t.beforeCreate, e, 'bc'));
  const {
    data: n,
    computed: r,
    methods: o,
    watch: l,
    provide: a,
    inject: c,
    created: u,
    beforeMount: f,
    mounted: p,
    beforeUpdate: y,
    updated: k,
    activated: v,
    deactivated: x,
    beforeDestroy: M,
    beforeUnmount: b,
    destroyed: P,
    unmounted: T,
    render: V,
    renderTracked: K,
    renderTriggered: G,
    errorCaptured: O,
    serverPrefetch: j,
    expose: ee,
    inheritAttrs: oe,
    components: B,
    directives: ve,
    filters: Me,
  } = t;
  if ((c && dc(c, i, null), o))
    for (const ke in o) {
      const me = o[ke];
      Z(me) && (i[ke] = me.bind(s));
    }
  if (n) {
    const ke = n.call(s, s);
    he(ke) && (e.data = qn(ke));
  }
  if (((kn = !0), r))
    for (const ke in r) {
      const me = r[ke],
        wt = Z(me) ? me.bind(s, s) : Z(me.get) ? me.get.bind(s, s) : bt,
        ss = !Z(me) && Z(me.set) ? me.set.bind(s) : bt,
        xt = Xe({ get: wt, set: ss });
      Object.defineProperty(i, ke, {
        enumerable: !0,
        configurable: !0,
        get: () => xt.value,
        set: (Fe) => (xt.value = Fe),
      });
    }
  if (l) for (const ke in l) tl(l[ke], i, s, ke);
  if (a) {
    const ke = Z(a) ? a.call(s) : a;
    Reflect.ownKeys(ke).forEach((me) => {
      Bo(me, ke[me]);
    });
  }
  u && xr(u, e, 'c');
  function _e(ke, me) {
    Y(me) ? me.forEach((wt) => ke(wt.bind(s))) : me && ke(me.bind(s));
  }
  if (
    (_e(tc, f),
    _e(Di, p),
    _e(sc, y),
    _e(ic, k),
    _e(Qa, v),
    _e(Za, x),
    _e(lc, O),
    _e(oc, K),
    _e(rc, G),
    _e(Ri, b),
    _e(el, T),
    _e(nc, j),
    Y(ee))
  )
    if (ee.length) {
      const ke = e.exposed || (e.exposed = {});
      ee.forEach((me) => {
        Object.defineProperty(ke, me, {
          get: () => s[me],
          set: (wt) => (s[me] = wt),
          enumerable: !0,
        });
      });
    } else e.exposed || (e.exposed = {});
  (V && e.render === bt && (e.render = V),
    oe != null && (e.inheritAttrs = oe),
    B && (e.components = B),
    ve && (e.directives = ve),
    j && Qo(e));
}
function dc(e, t, s = bt) {
  Y(e) && (e = Tn(e));
  for (const i in e) {
    const n = e[i];
    let r;
    (he(n)
      ? 'default' in n
        ? (r = _s(n.from || i, n.default, !0))
        : (r = _s(n.from || i))
      : (r = _s(n)),
      Pe(r)
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => r.value,
            set: (o) => (r.value = o),
          })
        : (t[i] = r));
  }
}
function xr(e, t, s) {
  lt(Y(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function tl(e, t, s, i) {
  let n = i.includes('.') ? Uo(s, i) : () => s[i];
  if (Ce(e)) {
    const r = t[e];
    Z(r) && yt(n, r);
  } else if (Z(e)) yt(n, e.bind(s));
  else if (he(e))
    if (Y(e)) e.forEach((r) => tl(r, t, s, i));
    else {
      const r = Z(e.handler) ? e.handler.bind(s) : t[e.handler];
      Z(r) && yt(n, r, e);
    }
}
function sl(e) {
  const t = e.type,
    { mixins: s, extends: i } = t,
    {
      mixins: n,
      optionsCache: r,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = r.get(t);
  let a;
  return (
    l
      ? (a = l)
      : !n.length && !s && !i
        ? (a = t)
        : ((a = {}),
          n.length && n.forEach((c) => gi(a, c, o, !0)),
          gi(a, t, o)),
    he(t) && r.set(t, a),
    a
  );
}
function gi(e, t, s, i = !1) {
  const { mixins: n, extends: r } = t;
  (r && gi(e, r, s, !0), n && n.forEach((o) => gi(e, o, s, !0)));
  for (const o in t)
    if (!(i && o === 'expose')) {
      const l = fc[o] || (s && s[o]);
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const fc = {
  data: kr,
  props: Tr,
  emits: Tr,
  methods: ws,
  computed: ws,
  beforeCreate: je,
  created: je,
  beforeMount: je,
  mounted: je,
  beforeUpdate: je,
  updated: je,
  beforeDestroy: je,
  beforeUnmount: je,
  destroyed: je,
  unmounted: je,
  activated: je,
  deactivated: je,
  errorCaptured: je,
  serverPrefetch: je,
  components: ws,
  directives: ws,
  watch: pc,
  provide: kr,
  inject: hc,
};
function kr(e, t) {
  return t
    ? e
      ? function () {
          return Ne(
            Z(e) ? e.call(this, this) : e,
            Z(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function hc(e, t) {
  return ws(Tn(e), Tn(t));
}
function Tn(e) {
  if (Y(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ws(e, t) {
  return e ? Ne(Object.create(null), e, t) : t;
}
function Tr(e, t) {
  return e
    ? Y(e) && Y(t)
      ? [...new Set([...e, ...t])]
      : Ne(Object.create(null), wr(e), wr(t ?? {}))
    : t;
}
function pc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = Ne(Object.create(null), e);
  for (const i in t) s[i] = je(e[i], t[i]);
  return s;
}
function il() {
  return {
    app: null,
    config: {
      isNativeTag: uo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let mc = 0;
function gc(e, t) {
  return function (i, n = null) {
    (Z(i) || (i = Ne({}, i)), n != null && !he(n) && (n = null));
    const r = il(),
      o = new WeakSet(),
      l = [];
    let a = !1;
    const c = (r.app = {
      _uid: mc++,
      _component: i,
      _props: n,
      _container: null,
      _context: r,
      _instance: null,
      version: Yc,
      get config() {
        return r.config;
      },
      set config(u) {},
      use(u, ...f) {
        return (
          o.has(u) ||
            (u && Z(u.install)
              ? (o.add(u), u.install(c, ...f))
              : Z(u) && (o.add(u), u(c, ...f))),
          c
        );
      },
      mixin(u) {
        return (r.mixins.includes(u) || r.mixins.push(u), c);
      },
      component(u, f) {
        return f ? ((r.components[u] = f), c) : r.components[u];
      },
      directive(u, f) {
        return f ? ((r.directives[u] = f), c) : r.directives[u];
      },
      mount(u, f, p) {
        if (!a) {
          const y = c._ceVNode || Te(i, n);
          return (
            (y.appContext = r),
            p === !0 ? (p = 'svg') : p === !1 && (p = void 0),
            e(y, u, p),
            (a = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            Hi(y.component)
          );
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a &&
          (lt(l, c._instance, 16),
          e(null, c._container),
          delete c._container.__vue_app__);
      },
      provide(u, f) {
        return ((r.provides[u] = f), c);
      },
      runWithContext(u) {
        const f = us;
        us = c;
        try {
          return u();
        } finally {
          us = f;
        }
      },
    });
    return c;
  };
}
let us = null;
const bc = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Ht(t)}Modifiers`] || e[`${Ut(t)}Modifiers`];
function yc(e, t, ...s) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || ye;
  let n = s;
  const r = t.startsWith('update:'),
    o = r && bc(i, t.slice(7));
  o &&
    (o.trim && (n = s.map((u) => (Ce(u) ? u.trim() : u))),
    o.number && (n = s.map(Mi)));
  let l,
    a = i[(l = zi(t))] || i[(l = zi(Ht(t)))];
  (!a && r && (a = i[(l = zi(Ut(t)))]), a && lt(a, e, 6, n));
  const c = i[l + 'Once'];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    ((e.emitted[l] = !0), lt(c, e, 6, n));
  }
}
const vc = new WeakMap();
function nl(e, t, s = !1) {
  const i = s ? vc : t.emitsCache,
    n = i.get(e);
  if (n !== void 0) return n;
  const r = e.emits;
  let o = {},
    l = !1;
  if (!Z(e)) {
    const a = (c) => {
      const u = nl(c, t, !0);
      u && ((l = !0), Ne(o, u));
    };
    (!s && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a));
  }
  return !r && !l
    ? (he(e) && i.set(e, null), null)
    : (Y(r) ? r.forEach((a) => (o[a] = null)) : Ne(o, r),
      he(e) && i.set(e, o),
      o);
}
function Fi(e, t) {
  return !e || !Si(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ue(e, t[0].toLowerCase() + t.slice(1)) || ue(e, Ut(t)) || ue(e, t));
}
function _r(e) {
  const {
      type: t,
      vnode: s,
      proxy: i,
      withProxy: n,
      propsOptions: [r],
      slots: o,
      attrs: l,
      emit: a,
      render: c,
      renderCache: u,
      props: f,
      data: p,
      setupState: y,
      ctx: k,
      inheritAttrs: v,
    } = e,
    x = pi(e);
  let M, b;
  try {
    if (s.shapeFlag & 4) {
      const T = n || i,
        V = T;
      ((M = mt(c.call(V, T, u, f, y, p, k))), (b = l));
    } else {
      const T = t;
      ((M = mt(
        T.length > 1 ? T(f, { attrs: l, slots: o, emit: a }) : T(f, null),
      )),
        (b = t.props ? l : wc(l)));
    }
  } catch (T) {
    ((Ms.length = 0), Li(T, e, 1), (M = Te(Be)));
  }
  let P = M;
  if (b && v !== !1) {
    const T = Object.keys(b),
      { shapeFlag: V } = P;
    T.length &&
      V & 7 &&
      (r && T.some(Dn) && (b = xc(b, r)), (P = Vt(P, b, !1, !0)));
  }
  return (
    s.dirs &&
      ((P = Vt(P, null, !1, !0)),
      (P.dirs = P.dirs ? P.dirs.concat(s.dirs) : s.dirs)),
    s.transition && Is(P, s.transition),
    (M = P),
    pi(x),
    M
  );
}
const wc = (e) => {
    let t;
    for (const s in e)
      (s === 'class' || s === 'style' || Si(s)) && ((t || (t = {}))[s] = e[s]);
    return t;
  },
  xc = (e, t) => {
    const s = {};
    for (const i in e) (!Dn(i) || !(i.slice(9) in t)) && (s[i] = e[i]);
    return s;
  };
function kc(e, t, s) {
  const { props: i, children: n, component: r } = e,
    { props: o, children: l, patchFlag: a } = t,
    c = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (s && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return i ? Cr(i, o, c) : !!o;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const p = u[f];
        if (rl(o, i, p) && !Fi(c, p)) return !0;
      }
    }
  } else
    return (n || l) && (!l || !l.$stable)
      ? !0
      : i === o
        ? !1
        : i
          ? o
            ? Cr(i, o, c)
            : !0
          : !!o;
  return !1;
}
function Cr(e, t, s) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let n = 0; n < i.length; n++) {
    const r = i[n];
    if (rl(t, e, r) && !Fi(s, r)) return !0;
  }
  return !1;
}
function rl(e, t, s) {
  const i = e[s],
    n = t[s];
  return s === 'style' && he(i) && he(n) ? !Us(i, n) : i !== n;
}
function Tc({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const i = t.subTree;
    if ((i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e))
      (((e = t.vnode).el = s), (t = t.parent));
    else break;
  }
}
const ol = {},
  ll = () => Object.create(ol),
  al = (e) => Object.getPrototypeOf(e) === ol;
function _c(e, t, s, i = !1) {
  const n = {},
    r = ll();
  ((e.propsDefaults = Object.create(null)), cl(e, t, n, r));
  for (const o in e.propsOptions[0]) o in n || (n[o] = void 0);
  (s ? (e.props = i ? n : La(n)) : e.type.props ? (e.props = n) : (e.props = r),
    (e.attrs = r));
}
function Cc(e, t, s, i) {
  const {
      props: n,
      attrs: r,
      vnode: { patchFlag: o },
    } = e,
    l = ce(n),
    [a] = e.propsOptions;
  let c = !1;
  if ((i || o > 0) && !(o & 16)) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let p = u[f];
        if (Fi(e.emitsOptions, p)) continue;
        const y = t[p];
        if (a)
          if (ue(r, p)) y !== r[p] && ((r[p] = y), (c = !0));
          else {
            const k = Ht(p);
            n[k] = _n(a, l, k, y, e, !1);
          }
        else y !== r[p] && ((r[p] = y), (c = !0));
      }
    }
  } else {
    cl(e, t, n, r) && (c = !0);
    let u;
    for (const f in l)
      (!t || (!ue(t, f) && ((u = Ut(f)) === f || !ue(t, u)))) &&
        (a
          ? s &&
            (s[f] !== void 0 || s[u] !== void 0) &&
            (n[f] = _n(a, l, f, void 0, e, !0))
          : delete n[f]);
    if (r !== l)
      for (const f in r) (!t || !ue(t, f)) && (delete r[f], (c = !0));
  }
  c && St(e.attrs, 'set', '');
}
function cl(e, t, s, i) {
  const [n, r] = e.propsOptions;
  let o = !1,
    l;
  if (t)
    for (let a in t) {
      if (xs(a)) continue;
      const c = t[a];
      let u;
      n && ue(n, (u = Ht(a)))
        ? !r || !r.includes(u)
          ? (s[u] = c)
          : ((l || (l = {}))[u] = c)
        : Fi(e.emitsOptions, a) ||
          ((!(a in i) || c !== i[a]) && ((i[a] = c), (o = !0)));
    }
  if (r) {
    const a = ce(s),
      c = l || ye;
    for (let u = 0; u < r.length; u++) {
      const f = r[u];
      s[f] = _n(n, a, f, c[f], e, !ue(c, f));
    }
  }
  return o;
}
function _n(e, t, s, i, n, r) {
  const o = e[s];
  if (o != null) {
    const l = ue(o, 'default');
    if (l && i === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && Z(a)) {
        const { propsDefaults: c } = n;
        if (s in c) i = c[s];
        else {
          const u = Ks(n);
          ((i = c[s] = a.call(null, t)), u());
        }
      } else i = a;
      n.ce && n.ce._setProp(s, i);
    }
    o[0] &&
      (r && !l ? (i = !1) : o[1] && (i === '' || i === Ut(s)) && (i = !0));
  }
  return i;
}
const Sc = new WeakMap();
function ul(e, t, s = !1) {
  const i = s ? Sc : t.propsCache,
    n = i.get(e);
  if (n) return n;
  const r = e.props,
    o = {},
    l = [];
  let a = !1;
  if (!Z(e)) {
    const u = (f) => {
      a = !0;
      const [p, y] = ul(f, t, !0);
      (Ne(o, p), y && l.push(...y));
    };
    (!s && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u));
  }
  if (!r && !a) return (he(e) && i.set(e, ls), ls);
  if (Y(r))
    for (let u = 0; u < r.length; u++) {
      const f = Ht(r[u]);
      Sr(f) && (o[f] = ye);
    }
  else if (r)
    for (const u in r) {
      const f = Ht(u);
      if (Sr(f)) {
        const p = r[u],
          y = (o[f] = Y(p) || Z(p) ? { type: p } : Ne({}, p)),
          k = y.type;
        let v = !1,
          x = !0;
        if (Y(k))
          for (let M = 0; M < k.length; ++M) {
            const b = k[M],
              P = Z(b) && b.name;
            if (P === 'Boolean') {
              v = !0;
              break;
            } else P === 'String' && (x = !1);
          }
        else v = Z(k) && k.name === 'Boolean';
        ((y[0] = v), (y[1] = x), (v || ue(y, 'default')) && l.push(f));
      }
    }
  const c = [o, l];
  return (he(e) && i.set(e, c), c);
}
function Sr(e) {
  return e[0] !== '$' && !xs(e);
}
const Gn = (e) => e === '_' || e === '_ctx' || e === '$stable',
  Jn = (e) => (Y(e) ? e.map(mt) : [mt(e)]),
  Ac = (e, t, s) => {
    if (t._n) return t;
    const i = Ho((...n) => Jn(t(...n)), s);
    return ((i._c = !1), i);
  },
  dl = (e, t, s) => {
    const i = e._ctx;
    for (const n in e) {
      if (Gn(n)) continue;
      const r = e[n];
      if (Z(r)) t[n] = Ac(n, r, i);
      else if (r != null) {
        const o = Jn(r);
        t[n] = () => o;
      }
    }
  },
  fl = (e, t) => {
    const s = Jn(t);
    e.slots.default = () => s;
  },
  hl = (e, t, s) => {
    for (const i in t) (s || !Gn(i)) && (e[i] = t[i]);
  },
  Ec = (e, t, s) => {
    const i = (e.slots = ll());
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? (hl(i, t, s), s && go(i, '_', n, !0)) : dl(t, i);
    } else t && fl(e, t);
  },
  Mc = (e, t, s) => {
    const { vnode: i, slots: n } = e;
    let r = !0,
      o = ye;
    if (i.shapeFlag & 32) {
      const l = t._;
      (l
        ? s && l === 1
          ? (r = !1)
          : hl(n, t, s)
        : ((r = !t.$stable), dl(t, n)),
        (o = t));
    } else t && (fl(e, t), (o = { default: 1 }));
    if (r) for (const l in n) !Gn(l) && o[l] == null && delete n[l];
  },
  De = Ic;
function $c(e) {
  return Pc(e);
}
function Pc(e, t) {
  const s = $i();
  s.__VUE__ = !0;
  const {
      insert: i,
      remove: n,
      patchProp: r,
      createElement: o,
      createText: l,
      createComment: a,
      setText: c,
      setElementText: u,
      parentNode: f,
      nextSibling: p,
      setScopeId: y = bt,
      insertStaticContent: k,
    } = e,
    v = (
      h,
      m,
      w,
      A = null,
      _ = null,
      C = null,
      R = void 0,
      L = null,
      N = !!m.dynamicChildren,
    ) => {
      if (h === m) return;
      (h && !Jt(h, m) && ((A = H(h)), Fe(h, _, C, !0), (h = null)),
        m.patchFlag === -2 && ((N = !1), (m.dynamicChildren = null)));
      const { type: S, ref: z, shapeFlag: F } = m;
      switch (S) {
        case ji:
          x(h, m, w, A);
          break;
        case Be:
          M(h, m, w, A);
          break;
        case ri:
          h == null && b(m, w, A, R);
          break;
        case ie:
          B(h, m, w, A, _, C, R, L, N);
          break;
        default:
          F & 1
            ? V(h, m, w, A, _, C, R, L, N)
            : F & 6
              ? ve(h, m, w, A, _, C, R, L, N)
              : (F & 64 || F & 128) && S.process(h, m, w, A, _, C, R, L, N, Le);
      }
      z != null && _
        ? Ss(z, h && h.ref, C, m || h, !m)
        : z == null && h && h.ref != null && Ss(h.ref, null, C, h, !0);
    },
    x = (h, m, w, A) => {
      if (h == null) i((m.el = l(m.children)), w, A);
      else {
        const _ = (m.el = h.el);
        m.children !== h.children && c(_, m.children);
      }
    },
    M = (h, m, w, A) => {
      h == null ? i((m.el = a(m.children || '')), w, A) : (m.el = h.el);
    },
    b = (h, m, w, A) => {
      [h.el, h.anchor] = k(h.children, m, w, A, h.el, h.anchor);
    },
    P = ({ el: h, anchor: m }, w, A) => {
      let _;
      for (; h && h !== m; ) ((_ = p(h)), i(h, w, A), (h = _));
      i(m, w, A);
    },
    T = ({ el: h, anchor: m }) => {
      let w;
      for (; h && h !== m; ) ((w = p(h)), n(h), (h = w));
      n(m);
    },
    V = (h, m, w, A, _, C, R, L, N) => {
      if (
        (m.type === 'svg' ? (R = 'svg') : m.type === 'math' && (R = 'mathml'),
        h == null)
      )
        K(m, w, A, _, C, R, L, N);
      else {
        const S = h.el && h.el._isVueCE ? h.el : null;
        try {
          (S && S._beginPatch(), j(h, m, _, C, R, L, N));
        } finally {
          S && S._endPatch();
        }
      }
    },
    K = (h, m, w, A, _, C, R, L) => {
      let N, S;
      const { props: z, shapeFlag: F, transition: W, dirs: Q } = h;
      if (
        ((N = h.el = o(h.type, C, z && z.is, z)),
        F & 8
          ? u(N, h.children)
          : F & 16 && O(h.children, N, null, A, _, en(h, C), R, L),
        Q && qt(h, null, A, 'created'),
        G(N, h, h.scopeId, R, A),
        z)
      ) {
        for (const we in z)
          we !== 'value' && !xs(we) && r(N, we, null, z[we], C, A);
        ('value' in z && r(N, 'value', null, z.value, C),
          (S = z.onVnodeBeforeMount) && dt(S, A, h));
      }
      Q && qt(h, null, A, 'beforeMount');
      const re = Nc(_, W);
      (re && W.beforeEnter(N),
        i(N, m, w),
        ((S = z && z.onVnodeMounted) || re || Q) &&
          De(() => {
            (S && dt(S, A, h),
              re && W.enter(N),
              Q && qt(h, null, A, 'mounted'));
          }, _));
    },
    G = (h, m, w, A, _) => {
      if ((w && y(h, w), A)) for (let C = 0; C < A.length; C++) y(h, A[C]);
      if (_) {
        let C = _.subTree;
        if (
          m === C ||
          (gl(C.type) && (C.ssContent === m || C.ssFallback === m))
        ) {
          const R = _.vnode;
          G(h, R, R.scopeId, R.slotScopeIds, _.parent);
        }
      }
    },
    O = (h, m, w, A, _, C, R, L, N = 0) => {
      for (let S = N; S < h.length; S++) {
        const z = (h[S] = L ? Ct(h[S]) : mt(h[S]));
        v(null, z, m, w, A, _, C, R, L);
      }
    },
    j = (h, m, w, A, _, C, R) => {
      const L = (m.el = h.el);
      let { patchFlag: N, dynamicChildren: S, dirs: z } = m;
      N |= h.patchFlag & 16;
      const F = h.props || ye,
        W = m.props || ye;
      let Q;
      if (
        (w && Kt(w, !1),
        (Q = W.onVnodeBeforeUpdate) && dt(Q, w, m, h),
        z && qt(m, h, w, 'beforeUpdate'),
        w && Kt(w, !0),
        ((F.innerHTML && W.innerHTML == null) ||
          (F.textContent && W.textContent == null)) &&
          u(L, ''),
        S
          ? ee(h.dynamicChildren, S, L, w, A, en(m, _), C)
          : R || me(h, m, L, null, w, A, en(m, _), C, !1),
        N > 0)
      ) {
        if (N & 16) oe(L, F, W, w, _);
        else if (
          (N & 2 && F.class !== W.class && r(L, 'class', null, W.class, _),
          N & 4 && r(L, 'style', F.style, W.style, _),
          N & 8)
        ) {
          const re = m.dynamicProps;
          for (let we = 0; we < re.length; we++) {
            const pe = re[we],
              Ue = F[pe],
              qe = W[pe];
            (qe !== Ue || pe === 'value') && r(L, pe, Ue, qe, _, w);
          }
        }
        N & 1 && h.children !== m.children && u(L, m.children);
      } else !R && S == null && oe(L, F, W, w, _);
      ((Q = W.onVnodeUpdated) || z) &&
        De(() => {
          (Q && dt(Q, w, m, h), z && qt(m, h, w, 'updated'));
        }, A);
    },
    ee = (h, m, w, A, _, C, R) => {
      for (let L = 0; L < m.length; L++) {
        const N = h[L],
          S = m[L],
          z =
            N.el && (N.type === ie || !Jt(N, S) || N.shapeFlag & 198)
              ? f(N.el)
              : w;
        v(N, S, z, null, A, _, C, R, !0);
      }
    },
    oe = (h, m, w, A, _) => {
      if (m !== w) {
        if (m !== ye)
          for (const C in m) !xs(C) && !(C in w) && r(h, C, m[C], null, _, A);
        for (const C in w) {
          if (xs(C)) continue;
          const R = w[C],
            L = m[C];
          R !== L && C !== 'value' && r(h, C, L, R, _, A);
        }
        'value' in w && r(h, 'value', m.value, w.value, _);
      }
    },
    B = (h, m, w, A, _, C, R, L, N) => {
      const S = (m.el = h ? h.el : l('')),
        z = (m.anchor = h ? h.anchor : l(''));
      let { patchFlag: F, dynamicChildren: W, slotScopeIds: Q } = m;
      (Q && (L = L ? L.concat(Q) : Q),
        h == null
          ? (i(S, w, A), i(z, w, A), O(m.children || [], w, z, _, C, R, L, N))
          : F > 0 &&
              F & 64 &&
              W &&
              h.dynamicChildren &&
              h.dynamicChildren.length === W.length
            ? (ee(h.dynamicChildren, W, w, _, C, R, L),
              (m.key != null || (_ && m === _.subTree)) && Xn(h, m, !0))
            : me(h, m, w, z, _, C, R, L, N));
    },
    ve = (h, m, w, A, _, C, R, L, N) => {
      ((m.slotScopeIds = L),
        h == null
          ? m.shapeFlag & 512
            ? _.ctx.activate(m, w, A, R, N)
            : Me(m, w, A, _, C, R, N)
          : tt(h, m, N));
    },
    Me = (h, m, w, A, _, C, R) => {
      const L = (h.component = Bc(h, A, _));
      if ((Ii(h) && (L.ctx.renderer = Le), Vc(L, !1, R), L.asyncDep)) {
        if ((_ && _.registerDep(L, _e, R), !h.el)) {
          const N = (L.subTree = Te(Be));
          (M(null, N, m, w), (h.placeholder = N.el));
        }
      } else _e(L, h, m, w, _, C, R);
    },
    tt = (h, m, w) => {
      const A = (m.component = h.component);
      if (kc(h, m, w))
        if (A.asyncDep && !A.asyncResolved) {
          ke(A, m, w);
          return;
        } else ((A.next = m), A.update());
      else ((m.el = h.el), (A.vnode = m));
    },
    _e = (h, m, w, A, _, C, R) => {
      const L = () => {
        if (h.isMounted) {
          let { next: F, bu: W, u: Q, parent: re, vnode: we } = h;
          {
            const ct = pl(h);
            if (ct) {
              (F && ((F.el = we.el), ke(h, F, R)),
                ct.asyncDep.then(() => {
                  De(() => {
                    h.isUnmounted || S();
                  }, _);
                }));
              return;
            }
          }
          let pe = F,
            Ue;
          (Kt(h, !1),
            F ? ((F.el = we.el), ke(h, F, R)) : (F = we),
            W && ii(W),
            (Ue = F.props && F.props.onVnodeBeforeUpdate) && dt(Ue, re, F, we),
            Kt(h, !0));
          const qe = _r(h),
            at = h.subTree;
          ((h.subTree = qe),
            v(at, qe, f(at.el), H(at), h, _, C),
            (F.el = qe.el),
            pe === null && Tc(h, qe.el),
            Q && De(Q, _),
            (Ue = F.props && F.props.onVnodeUpdated) &&
              De(() => dt(Ue, re, F, we), _));
        } else {
          let F;
          const { el: W, props: Q } = m,
            { bm: re, m: we, parent: pe, root: Ue, type: qe } = h,
            at = As(m);
          (Kt(h, !1),
            re && ii(re),
            !at && (F = Q && Q.onVnodeBeforeMount) && dt(F, pe, m),
            Kt(h, !0));
          {
            Ue.ce && Ue.ce._hasShadowRoot() && Ue.ce._injectChildStyle(qe);
            const ct = (h.subTree = _r(h));
            (v(null, ct, w, A, h, _, C), (m.el = ct.el));
          }
          if ((we && De(we, _), !at && (F = Q && Q.onVnodeMounted))) {
            const ct = m;
            De(() => dt(F, pe, ct), _);
          }
          ((m.shapeFlag & 256 ||
            (pe && As(pe.vnode) && pe.vnode.shapeFlag & 256)) &&
            h.a &&
            De(h.a, _),
            (h.isMounted = !0),
            (m = w = A = null));
        }
      };
      h.scope.on();
      const N = (h.effect = new wo(L));
      h.scope.off();
      const S = (h.update = N.run.bind(N)),
        z = (h.job = N.runIfDirty.bind(N));
      ((z.i = h), (z.id = h.uid), (N.scheduler = () => zn(z)), Kt(h, !0), S());
    },
    ke = (h, m, w) => {
      m.component = h;
      const A = h.vnode.props;
      ((h.vnode = m),
        (h.next = null),
        Cc(h, m.props, A, w),
        Mc(h, m.children, w),
        Mt(),
        hr(h),
        $t());
    },
    me = (h, m, w, A, _, C, R, L, N = !1) => {
      const S = h && h.children,
        z = h ? h.shapeFlag : 0,
        F = m.children,
        { patchFlag: W, shapeFlag: Q } = m;
      if (W > 0) {
        if (W & 128) {
          ss(S, F, w, A, _, C, R, L, N);
          return;
        } else if (W & 256) {
          wt(S, F, w, A, _, C, R, L, N);
          return;
        }
      }
      Q & 8
        ? (z & 16 && U(S, _, C), F !== S && u(w, F))
        : z & 16
          ? Q & 16
            ? ss(S, F, w, A, _, C, R, L, N)
            : U(S, _, C, !0)
          : (z & 8 && u(w, ''), Q & 16 && O(F, w, A, _, C, R, L, N));
    },
    wt = (h, m, w, A, _, C, R, L, N) => {
      ((h = h || ls), (m = m || ls));
      const S = h.length,
        z = m.length,
        F = Math.min(S, z);
      let W;
      for (W = 0; W < F; W++) {
        const Q = (m[W] = N ? Ct(m[W]) : mt(m[W]));
        v(h[W], Q, w, null, _, C, R, L, N);
      }
      S > z ? U(h, _, C, !0, !1, F) : O(m, w, A, _, C, R, L, N, F);
    },
    ss = (h, m, w, A, _, C, R, L, N) => {
      let S = 0;
      const z = m.length;
      let F = h.length - 1,
        W = z - 1;
      for (; S <= F && S <= W; ) {
        const Q = h[S],
          re = (m[S] = N ? Ct(m[S]) : mt(m[S]));
        if (Jt(Q, re)) v(Q, re, w, null, _, C, R, L, N);
        else break;
        S++;
      }
      for (; S <= F && S <= W; ) {
        const Q = h[F],
          re = (m[W] = N ? Ct(m[W]) : mt(m[W]));
        if (Jt(Q, re)) v(Q, re, w, null, _, C, R, L, N);
        else break;
        (F--, W--);
      }
      if (S > F) {
        if (S <= W) {
          const Q = W + 1,
            re = Q < z ? m[Q].el : A;
          for (; S <= W; )
            (v(null, (m[S] = N ? Ct(m[S]) : mt(m[S])), w, re, _, C, R, L, N),
              S++);
        }
      } else if (S > W) for (; S <= F; ) (Fe(h[S], _, C, !0), S++);
      else {
        const Q = S,
          re = S,
          we = new Map();
        for (S = re; S <= W; S++) {
          const Ye = (m[S] = N ? Ct(m[S]) : mt(m[S]));
          Ye.key != null && we.set(Ye.key, S);
        }
        let pe,
          Ue = 0;
        const qe = W - re + 1;
        let at = !1,
          ct = 0;
        const ps = new Array(qe);
        for (S = 0; S < qe; S++) ps[S] = 0;
        for (S = Q; S <= F; S++) {
          const Ye = h[S];
          if (Ue >= qe) {
            Fe(Ye, _, C, !0);
            continue;
          }
          let ut;
          if (Ye.key != null) ut = we.get(Ye.key);
          else
            for (pe = re; pe <= W; pe++)
              if (ps[pe - re] === 0 && Jt(Ye, m[pe])) {
                ut = pe;
                break;
              }
          ut === void 0
            ? Fe(Ye, _, C, !0)
            : ((ps[ut - re] = S + 1),
              ut >= ct ? (ct = ut) : (at = !0),
              v(Ye, m[ut], w, null, _, C, R, L, N),
              Ue++);
        }
        const or = at ? Lc(ps) : ls;
        for (pe = or.length - 1, S = qe - 1; S >= 0; S--) {
          const Ye = re + S,
            ut = m[Ye],
            lr = m[Ye + 1],
            ar = Ye + 1 < z ? lr.el || ml(lr) : A;
          ps[S] === 0
            ? v(null, ut, w, ar, _, C, R, L, N)
            : at && (pe < 0 || S !== or[pe] ? xt(ut, w, ar, 2) : pe--);
        }
      }
    },
    xt = (h, m, w, A, _ = null) => {
      const { el: C, type: R, transition: L, children: N, shapeFlag: S } = h;
      if (S & 6) {
        xt(h.component.subTree, m, w, A);
        return;
      }
      if (S & 128) {
        h.suspense.move(m, w, A);
        return;
      }
      if (S & 64) {
        R.move(h, m, w, Le);
        return;
      }
      if (R === ie) {
        i(C, m, w);
        for (let F = 0; F < N.length; F++) xt(N[F], m, w, A);
        i(h.anchor, m, w);
        return;
      }
      if (R === ri) {
        P(h, m, w);
        return;
      }
      if (A !== 2 && S & 1 && L)
        if (A === 0) (L.beforeEnter(C), i(C, m, w), De(() => L.enter(C), _));
        else {
          const { leave: F, delayLeave: W, afterLeave: Q } = L,
            re = () => {
              h.ctx.isUnmounted ? n(C) : i(C, m, w);
            },
            we = () => {
              (C._isLeaving && C[pt](!0),
                F(C, () => {
                  (re(), Q && Q());
                }));
            };
          W ? W(C, re, we) : we();
        }
      else i(C, m, w);
    },
    Fe = (h, m, w, A = !1, _ = !1) => {
      const {
        type: C,
        props: R,
        ref: L,
        children: N,
        dynamicChildren: S,
        shapeFlag: z,
        patchFlag: F,
        dirs: W,
        cacheIndex: Q,
      } = h;
      if (
        (F === -2 && (_ = !1),
        L != null && (Mt(), Ss(L, null, w, h, !0), $t()),
        Q != null && (m.renderCache[Q] = void 0),
        z & 256)
      ) {
        m.ctx.deactivate(h);
        return;
      }
      const re = z & 1 && W,
        we = !As(h);
      let pe;
      if ((we && (pe = R && R.onVnodeBeforeUnmount) && dt(pe, m, h), z & 6))
        Wi(h.component, w, A);
      else {
        if (z & 128) {
          h.suspense.unmount(w, A);
          return;
        }
        (re && qt(h, null, m, 'beforeUnmount'),
          z & 64
            ? h.type.remove(h, m, w, Le, A)
            : S && !S.hasOnce && (C !== ie || (F > 0 && F & 64))
              ? U(S, m, w, !1, !0)
              : ((C === ie && F & 384) || (!_ && z & 16)) && U(N, m, w),
          A && Gs(h));
      }
      ((we && (pe = R && R.onVnodeUnmounted)) || re) &&
        De(() => {
          (pe && dt(pe, m, h), re && qt(h, null, m, 'unmounted'));
        }, w);
    },
    Gs = (h) => {
      const { type: m, el: w, anchor: A, transition: _ } = h;
      if (m === ie) {
        Ki(w, A);
        return;
      }
      if (m === ri) {
        T(h);
        return;
      }
      const C = () => {
        (n(w), _ && !_.persisted && _.afterLeave && _.afterLeave());
      };
      if (h.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: R, delayLeave: L } = _,
          N = () => R(w, C);
        L ? L(h.el, C, N) : N();
      } else C();
    },
    Ki = (h, m) => {
      let w;
      for (; h !== m; ) ((w = p(h)), n(h), (h = w));
      n(m);
    },
    Wi = (h, m, w) => {
      const { bum: A, scope: _, job: C, subTree: R, um: L, m: N, a: S } = h;
      (Ar(N),
        Ar(S),
        A && ii(A),
        _.stop(),
        C && ((C.flags |= 8), Fe(R, h, m, w)),
        L && De(L, m),
        De(() => {
          h.isUnmounted = !0;
        }, m));
    },
    U = (h, m, w, A = !1, _ = !1, C = 0) => {
      for (let R = C; R < h.length; R++) Fe(h[R], m, w, A, _);
    },
    H = (h) => {
      if (h.shapeFlag & 6) return H(h.component.subTree);
      if (h.shapeFlag & 128) return h.suspense.next();
      const m = p(h.anchor || h.el),
        w = m && m[qo];
      return w ? p(w) : m;
    };
  let q = !1;
  const be = (h, m, w) => {
      let A;
      (h == null
        ? m._vnode && (Fe(m._vnode, null, null, !0), (A = m._vnode.component))
        : v(m._vnode || null, h, m, null, null, null, w),
        (m._vnode = h),
        q || ((q = !0), hr(A), Ro(), (q = !1)));
    },
    Le = {
      p: v,
      um: Fe,
      m: xt,
      r: Gs,
      mt: Me,
      mc: O,
      pc: me,
      pbc: ee,
      n: H,
      o: e,
    };
  return { render: be, hydrate: void 0, createApp: gc(be) };
}
function en({ type: e, props: t }, s) {
  return (s === 'svg' && e === 'foreignObject') ||
    (s === 'mathml' &&
      e === 'annotation-xml' &&
      t &&
      t.encoding &&
      t.encoding.includes('html'))
    ? void 0
    : s;
}
function Kt({ effect: e, job: t }, s) {
  s ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function Nc(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Xn(e, t, s = !1) {
  const i = e.children,
    n = t.children;
  if (Y(i) && Y(n))
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      let l = n[r];
      (l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = n[r] = Ct(n[r])), (l.el = o.el)),
        !s && l.patchFlag !== -2 && Xn(o, l)),
        l.type === ji &&
          (l.patchFlag === -1 && (l = n[r] = Ct(l)), (l.el = o.el)),
        l.type === Be && !l.el && (l.el = o.el));
    }
}
function Lc(e) {
  const t = e.slice(),
    s = [0];
  let i, n, r, o, l;
  const a = e.length;
  for (i = 0; i < a; i++) {
    const c = e[i];
    if (c !== 0) {
      if (((n = s[s.length - 1]), e[n] < c)) {
        ((t[i] = n), s.push(i));
        continue;
      }
      for (r = 0, o = s.length - 1; r < o; )
        ((l = (r + o) >> 1), e[s[l]] < c ? (r = l + 1) : (o = l));
      c < e[s[r]] && (r > 0 && (t[i] = s[r - 1]), (s[r] = i));
    }
  }
  for (r = s.length, o = s[r - 1]; r-- > 0; ) ((s[r] = o), (o = t[o]));
  return s;
}
function pl(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : pl(t);
}
function Ar(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function ml(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? ml(t.subTree) : null;
}
const gl = (e) => e.__isSuspense;
function Ic(e, t) {
  t && t.pendingBranch
    ? Y(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : qa(e);
}
const ie = Symbol.for('v-fgt'),
  ji = Symbol.for('v-txt'),
  Be = Symbol.for('v-cmt'),
  ri = Symbol.for('v-stc'),
  Ms = [];
let Je = null;
function E(e = !1) {
  Ms.push((Je = e ? null : []));
}
function Oc() {
  (Ms.pop(), (Je = Ms[Ms.length - 1] || null));
}
let Os = 1;
function bi(e, t = !1) {
  ((Os += e), e < 0 && Je && t && (Je.hasOnce = !0));
}
function bl(e) {
  return (
    (e.dynamicChildren = Os > 0 ? Je || ls : null),
    Oc(),
    Os > 0 && Je && Je.push(e),
    e
  );
}
function $(e, t, s, i, n, r) {
  return bl(g(e, t, s, i, n, r, !0));
}
function ts(e, t, s, i, n) {
  return bl(Te(e, t, s, i, n, !0));
}
function yi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Jt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const yl = ({ key: e }) => e ?? null,
  oi = ({ ref: e, ref_key: t, ref_for: s }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? Ce(e) || Pe(e) || Z(e)
        ? { i: Ze, r: e, k: t, f: !!s }
        : e
      : null
  );
function g(
  e,
  t = null,
  s = null,
  i = 0,
  n = null,
  r = e === ie ? 0 : 1,
  o = !1,
  l = !1,
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && yl(t),
    ref: t && oi(t),
    scopeId: jo,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: i,
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: Ze,
  };
  return (
    l
      ? (Zn(a, s), r & 128 && e.normalize(a))
      : s && (a.shapeFlag |= Ce(s) ? 8 : 16),
    Os > 0 &&
      !o &&
      Je &&
      (a.patchFlag > 0 || r & 6) &&
      a.patchFlag !== 32 &&
      Je.push(a),
    a
  );
}
const Te = Dc;
function Dc(e, t = null, s = null, i = 0, n = null, r = !1) {
  if (((!e || e === ac) && (e = Be), yi(e))) {
    const l = Vt(e, t, !0);
    return (
      s && Zn(l, s),
      Os > 0 &&
        !r &&
        Je &&
        (l.shapeFlag & 6 ? (Je[Je.indexOf(e)] = l) : Je.push(l)),
      (l.patchFlag = -2),
      l
    );
  }
  if ((Wc(e) && (e = e.__vccOpts), t)) {
    t = Rc(t);
    let { class: l, style: a } = t;
    (l && !Ce(l) && (t.class = Ge(l)),
      he(a) && (Wn(a) && !Y(a) && (a = Ne({}, a)), (t.style = Pi(a))));
  }
  const o = Ce(e) ? 1 : gl(e) ? 128 : Ko(e) ? 64 : he(e) ? 4 : Z(e) ? 2 : 0;
  return g(e, t, s, i, n, o, r, !0);
}
function Rc(e) {
  return e ? (Wn(e) || al(e) ? Ne({}, e) : e) : null;
}
function Vt(e, t, s = !1, i = !1) {
  const { props: n, ref: r, patchFlag: o, children: l, transition: a } = e,
    c = t ? Fc(n || {}, t) : n,
    u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: c,
      key: c && yl(c),
      ref:
        t && t.ref
          ? s && r
            ? Y(r)
              ? r.concat(oi(t))
              : [r, oi(t)]
            : oi(t)
          : r,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== ie ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: a,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Vt(e.ssContent),
      ssFallback: e.ssFallback && Vt(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return (a && i && Is(u, a.clone(u)), u);
}
function nt(e = ' ', t = 0) {
  return Te(ji, null, e, t);
}
function Qn(e, t) {
  const s = Te(ri, null, e);
  return ((s.staticCount = t), s);
}
function ne(e = '', t = !1) {
  return t ? (E(), ts(Be, null, e)) : Te(Be, null, e);
}
function mt(e) {
  return e == null || typeof e == 'boolean'
    ? Te(Be)
    : Y(e)
      ? Te(ie, null, e.slice())
      : yi(e)
        ? Ct(e)
        : Te(ji, null, String(e));
}
function Ct(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Vt(e);
}
function Zn(e, t) {
  let s = 0;
  const { shapeFlag: i } = e;
  if (t == null) t = null;
  else if (Y(t)) s = 16;
  else if (typeof t == 'object')
    if (i & 65) {
      const n = t.default;
      n && (n._c && (n._d = !1), Zn(e, n()), n._c && (n._d = !0));
      return;
    } else {
      s = 32;
      const n = t._;
      !n && !al(t)
        ? (t._ctx = Ze)
        : n === 3 &&
          Ze &&
          (Ze.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Z(t)
      ? ((t = { default: t, _ctx: Ze }), (s = 32))
      : ((t = String(t)), i & 64 ? ((s = 16), (t = [nt(t)])) : (s = 8));
  ((e.children = t), (e.shapeFlag |= s));
}
function Fc(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    for (const n in i)
      if (n === 'class')
        t.class !== i.class && (t.class = Ge([t.class, i.class]));
      else if (n === 'style') t.style = Pi([t.style, i.style]);
      else if (Si(n)) {
        const r = t[n],
          o = i[n];
        o &&
          r !== o &&
          !(Y(r) && r.includes(o)) &&
          (t[n] = r ? [].concat(r, o) : o);
      } else n !== '' && (t[n] = i[n]);
  }
  return t;
}
function dt(e, t, s, i = null) {
  lt(e, t, 7, [s, i]);
}
const jc = il();
let Hc = 0;
function Bc(e, t, s) {
  const i = e.type,
    n = (t ? t.appContext : e.appContext) || jc,
    r = {
      uid: Hc++,
      vnode: e,
      type: i,
      parent: t,
      appContext: n,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new ha(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(n.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ul(i, n),
      emitsOptions: nl(i, n),
      emit: null,
      emitted: null,
      propsDefaults: ye,
      inheritAttrs: i.inheritAttrs,
      ctx: ye,
      data: ye,
      props: ye,
      attrs: ye,
      slots: ye,
      refs: ye,
      setupState: ye,
      setupContext: null,
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (r.ctx = { _: r }),
    (r.root = t ? t.root : r),
    (r.emit = yc.bind(null, r)),
    e.ce && e.ce(r),
    r
  );
}
let Ve = null;
const vl = () => Ve || Ze;
let vi, Cn;
{
  const e = $i(),
    t = (s, i) => {
      let n;
      return (
        (n = e[s]) || (n = e[s] = []),
        n.push(i),
        (r) => {
          n.length > 1 ? n.forEach((o) => o(r)) : n[0](r);
        }
      );
    };
  ((vi = t('__VUE_INSTANCE_SETTERS__', (s) => (Ve = s))),
    (Cn = t('__VUE_SSR_SETTERS__', (s) => (Ds = s))));
}
const Ks = (e) => {
    const t = Ve;
    return (
      vi(e),
      e.scope.on(),
      () => {
        (e.scope.off(), vi(t));
      }
    );
  },
  Er = () => {
    (Ve && Ve.scope.off(), vi(null));
  };
function wl(e) {
  return e.vnode.shapeFlag & 4;
}
let Ds = !1;
function Vc(e, t = !1, s = !1) {
  t && Cn(t);
  const { props: i, children: n } = e.vnode,
    r = wl(e);
  (_c(e, i, r, t), Ec(e, n, s || t));
  const o = r ? Uc(e, t) : void 0;
  return (t && Cn(!1), o);
}
function Uc(e, t) {
  const s = e.type;
  ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, cc)));
  const { setup: i } = s;
  if (i) {
    Mt();
    const n = (e.setupContext = i.length > 1 ? Kc(e) : null),
      r = Ks(e),
      o = qs(i, e, 0, [e.props, n]),
      l = fo(o);
    if (($t(), r(), (l || e.sp) && !As(e) && Qo(e), l)) {
      if ((o.then(Er, Er), t))
        return o
          .then((a) => {
            Mr(e, a);
          })
          .catch((a) => {
            Li(a, e, 0);
          });
      e.asyncDep = o;
    } else Mr(e, o);
  } else xl(e);
}
function Mr(e, t, s) {
  (Z(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : he(t) && (e.setupState = Io(t)),
    xl(e));
}
function xl(e, t, s) {
  const i = e.type;
  e.render || (e.render = i.render || bt);
  {
    const n = Ks(e);
    Mt();
    try {
      uc(e);
    } finally {
      ($t(), n());
    }
  }
}
const qc = {
  get(e, t) {
    return (Re(e, 'get', ''), e[t]);
  },
};
function Kc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, qc),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Hi(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(Io(Ia(e.exposed)), {
          get(t, s) {
            if (s in t) return t[s];
            if (s in Es) return Es[s](e);
          },
          has(t, s) {
            return s in t || s in Es;
          },
        }))
    : e.proxy;
}
function Wc(e) {
  return Z(e) && '__vccOpts' in e;
}
const Xe = (e, t) => ja(e, t, Ds);
function zc(e, t, s) {
  try {
    bi(-1);
    const i = arguments.length;
    return i === 2
      ? he(t) && !Y(t)
        ? yi(t)
          ? Te(e, null, [t])
          : Te(e, t)
        : Te(e, null, t)
      : (i > 3
          ? (s = Array.prototype.slice.call(arguments, 2))
          : i === 3 && yi(s) && (s = [s]),
        Te(e, t, s));
  } finally {
    bi(1);
  }
}
const Yc = '3.5.29';
let Sn;
const $r = typeof window < 'u' && window.trustedTypes;
if ($r)
  try {
    Sn = $r.createPolicy('vue', { createHTML: (e) => e });
  } catch {}
const kl = Sn ? (e) => Sn.createHTML(e) : (e) => e,
  Gc = 'http://www.w3.org/2000/svg',
  Jc = 'http://www.w3.org/1998/Math/MathML',
  _t = typeof document < 'u' ? document : null,
  Pr = _t && _t.createElement('template'),
  Xc = {
    insert: (e, t, s) => {
      t.insertBefore(e, s || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, s, i) => {
      const n =
        t === 'svg'
          ? _t.createElementNS(Gc, e)
          : t === 'mathml'
            ? _t.createElementNS(Jc, e)
            : s
              ? _t.createElement(e, { is: s })
              : _t.createElement(e);
      return (
        e === 'select' &&
          i &&
          i.multiple != null &&
          n.setAttribute('multiple', i.multiple),
        n
      );
    },
    createText: (e) => _t.createTextNode(e),
    createComment: (e) => _t.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => _t.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, s, i, n, r) {
      const o = s ? s.previousSibling : t.lastChild;
      if (n && (n === r || n.nextSibling))
        for (
          ;
          t.insertBefore(n.cloneNode(!0), s),
            !(n === r || !(n = n.nextSibling));
        );
      else {
        Pr.innerHTML = kl(
          i === 'svg'
            ? `<svg>${e}</svg>`
            : i === 'mathml'
              ? `<math>${e}</math>`
              : e,
        );
        const l = Pr.content;
        if (i === 'svg' || i === 'mathml') {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, s);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        s ? s.previousSibling : t.lastChild,
      ];
    },
  },
  It = 'transition',
  bs = 'animation',
  Rs = Symbol('_vtc'),
  Tl = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  Qc = Ne({}, zo, Tl),
  Zc = (e) => ((e.displayName = 'Transition'), (e.props = Qc), e),
  eu = Zc((e, { slots: t }) => zc(Xa, tu(e), t)),
  Wt = (e, t = []) => {
    Y(e) ? e.forEach((s) => s(...t)) : e && e(...t);
  },
  Nr = (e) => (e ? (Y(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function tu(e) {
  const t = {};
  for (const B in e) B in Tl || (t[B] = e[B]);
  if (e.css === !1) return t;
  const {
      name: s = 'v',
      type: i,
      duration: n,
      enterFromClass: r = `${s}-enter-from`,
      enterActiveClass: o = `${s}-enter-active`,
      enterToClass: l = `${s}-enter-to`,
      appearFromClass: a = r,
      appearActiveClass: c = o,
      appearToClass: u = l,
      leaveFromClass: f = `${s}-leave-from`,
      leaveActiveClass: p = `${s}-leave-active`,
      leaveToClass: y = `${s}-leave-to`,
    } = e,
    k = su(n),
    v = k && k[0],
    x = k && k[1],
    {
      onBeforeEnter: M,
      onEnter: b,
      onEnterCancelled: P,
      onLeave: T,
      onLeaveCancelled: V,
      onBeforeAppear: K = M,
      onAppear: G = b,
      onAppearCancelled: O = P,
    } = t,
    j = (B, ve, Me, tt) => {
      ((B._enterCancelled = tt),
        zt(B, ve ? u : l),
        zt(B, ve ? c : o),
        Me && Me());
    },
    ee = (B, ve) => {
      ((B._isLeaving = !1), zt(B, f), zt(B, y), zt(B, p), ve && ve());
    },
    oe = (B) => (ve, Me) => {
      const tt = B ? G : b,
        _e = () => j(ve, B, Me);
      (Wt(tt, [ve, _e]),
        Lr(() => {
          (zt(ve, B ? a : r), Tt(ve, B ? u : l), Nr(tt) || Ir(ve, i, v, _e));
        }));
    };
  return Ne(t, {
    onBeforeEnter(B) {
      (Wt(M, [B]), Tt(B, r), Tt(B, o));
    },
    onBeforeAppear(B) {
      (Wt(K, [B]), Tt(B, a), Tt(B, c));
    },
    onEnter: oe(!1),
    onAppear: oe(!0),
    onLeave(B, ve) {
      B._isLeaving = !0;
      const Me = () => ee(B, ve);
      (Tt(B, f),
        B._enterCancelled ? (Tt(B, p), Rr(B)) : (Rr(B), Tt(B, p)),
        Lr(() => {
          B._isLeaving && (zt(B, f), Tt(B, y), Nr(T) || Ir(B, i, x, Me));
        }),
        Wt(T, [B, Me]));
    },
    onEnterCancelled(B) {
      (j(B, !1, void 0, !0), Wt(P, [B]));
    },
    onAppearCancelled(B) {
      (j(B, !0, void 0, !0), Wt(O, [B]));
    },
    onLeaveCancelled(B) {
      (ee(B), Wt(V, [B]));
    },
  });
}
function su(e) {
  if (e == null) return null;
  if (he(e)) return [tn(e.enter), tn(e.leave)];
  {
    const t = tn(e);
    return [t, t];
  }
}
function tn(e) {
  return na(e);
}
function Tt(e, t) {
  (t.split(/\s+/).forEach((s) => s && e.classList.add(s)),
    (e[Rs] || (e[Rs] = new Set())).add(t));
}
function zt(e, t) {
  t.split(/\s+/).forEach((i) => i && e.classList.remove(i));
  const s = e[Rs];
  s && (s.delete(t), s.size || (e[Rs] = void 0));
}
function Lr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let iu = 0;
function Ir(e, t, s, i) {
  const n = (e._endId = ++iu),
    r = () => {
      n === e._endId && i();
    };
  if (s != null) return setTimeout(r, s);
  const { type: o, timeout: l, propCount: a } = nu(e, t);
  if (!o) return i();
  const c = o + 'end';
  let u = 0;
  const f = () => {
      (e.removeEventListener(c, p), r());
    },
    p = (y) => {
      y.target === e && ++u >= a && f();
    };
  (setTimeout(() => {
    u < a && f();
  }, l + 1),
    e.addEventListener(c, p));
}
function nu(e, t) {
  const s = window.getComputedStyle(e),
    i = (k) => (s[k] || '').split(', '),
    n = i(`${It}Delay`),
    r = i(`${It}Duration`),
    o = Or(n, r),
    l = i(`${bs}Delay`),
    a = i(`${bs}Duration`),
    c = Or(l, a);
  let u = null,
    f = 0,
    p = 0;
  t === It
    ? o > 0 && ((u = It), (f = o), (p = r.length))
    : t === bs
      ? c > 0 && ((u = bs), (f = c), (p = a.length))
      : ((f = Math.max(o, c)),
        (u = f > 0 ? (o > c ? It : bs) : null),
        (p = u ? (u === It ? r.length : a.length) : 0));
  const y =
    u === It &&
    /\b(?:transform|all)(?:,|$)/.test(i(`${It}Property`).toString());
  return { type: u, timeout: f, propCount: p, hasTransform: y };
}
function Or(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((s, i) => Dr(s) + Dr(e[i])));
}
function Dr(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function Rr(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function ru(e, t, s) {
  const i = e[Rs];
  (i && (t = (t ? [t, ...i] : [...i]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : s
        ? e.setAttribute('class', t)
        : (e.className = t));
}
const Fr = Symbol('_vod'),
  ou = Symbol('_vsh'),
  lu = Symbol(''),
  au = /(?:^|;)\s*display\s*:/;
function cu(e, t, s) {
  const i = e.style,
    n = Ce(s);
  let r = !1;
  if (s && !n) {
    if (t)
      if (Ce(t))
        for (const o of t.split(';')) {
          const l = o.slice(0, o.indexOf(':')).trim();
          s[l] == null && li(i, l, '');
        }
      else for (const o in t) s[o] == null && li(i, o, '');
    for (const o in s) (o === 'display' && (r = !0), li(i, o, s[o]));
  } else if (n) {
    if (t !== s) {
      const o = i[lu];
      (o && (s += ';' + o), (i.cssText = s), (r = au.test(s)));
    }
  } else t && e.removeAttribute('style');
  Fr in e && ((e[Fr] = r ? i.display : ''), e[ou] && (i.display = 'none'));
}
const jr = /\s*!important$/;
function li(e, t, s) {
  if (Y(s)) s.forEach((i) => li(e, t, i));
  else if ((s == null && (s = ''), t.startsWith('--'))) e.setProperty(t, s);
  else {
    const i = uu(e, t);
    jr.test(s)
      ? e.setProperty(Ut(i), s.replace(jr, ''), 'important')
      : (e[i] = s);
  }
}
const Hr = ['Webkit', 'Moz', 'ms'],
  sn = {};
function uu(e, t) {
  const s = sn[t];
  if (s) return s;
  let i = Ht(t);
  if (i !== 'filter' && i in e) return (sn[t] = i);
  i = mo(i);
  for (let n = 0; n < Hr.length; n++) {
    const r = Hr[n] + i;
    if (r in e) return (sn[t] = r);
  }
  return t;
}
const Br = 'http://www.w3.org/1999/xlink';
function Vr(e, t, s, i, n, r = ua(t)) {
  i && t.startsWith('xlink:')
    ? s == null
      ? e.removeAttributeNS(Br, t.slice(6, t.length))
      : e.setAttributeNS(Br, t, s)
    : s == null || (r && !bo(s))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? '' : vt(s) ? String(s) : s);
}
function Ur(e, t, s, i, n) {
  if (t === 'innerHTML' || t === 'textContent') {
    s != null && (e[t] = t === 'innerHTML' ? kl(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === 'value' && r !== 'PROGRESS' && !r.includes('-')) {
    const l = r === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      a = s == null ? (e.type === 'checkbox' ? 'on' : '') : String(s);
    ((l !== a || !('_value' in e)) && (e.value = a),
      s == null && e.removeAttribute(t),
      (e._value = s));
    return;
  }
  let o = !1;
  if (s === '' || s == null) {
    const l = typeof e[t];
    l === 'boolean'
      ? (s = bo(s))
      : s == null && l === 'string'
        ? ((s = ''), (o = !0))
        : l === 'number' && ((s = 0), (o = !0));
  }
  try {
    e[t] = s;
  } catch {}
  o && e.removeAttribute(n || t);
}
function Xt(e, t, s, i) {
  e.addEventListener(t, s, i);
}
function du(e, t, s, i) {
  e.removeEventListener(t, s, i);
}
const qr = Symbol('_vei');
function fu(e, t, s, i, n = null) {
  const r = e[qr] || (e[qr] = {}),
    o = r[t];
  if (i && o) o.value = i;
  else {
    const [l, a] = hu(t);
    if (i) {
      const c = (r[t] = gu(i, n));
      Xt(e, l, c, a);
    } else o && (du(e, l, o, a), (r[t] = void 0));
  }
}
const Kr = /(?:Once|Passive|Capture)$/;
function hu(e) {
  let t;
  if (Kr.test(e)) {
    t = {};
    let i;
    for (; (i = e.match(Kr)); )
      ((e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0));
  }
  return [e[2] === ':' ? e.slice(3) : Ut(e.slice(2)), t];
}
let nn = 0;
const pu = Promise.resolve(),
  mu = () => nn || (pu.then(() => (nn = 0)), (nn = Date.now()));
function gu(e, t) {
  const s = (i) => {
    if (!i._vts) i._vts = Date.now();
    else if (i._vts <= s.attached) return;
    lt(bu(i, s.value), t, 5, [i]);
  };
  return ((s.value = e), (s.attached = mu()), s);
}
function bu(e, t) {
  if (Y(t)) {
    const s = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        (s.call(e), (e._stopped = !0));
      }),
      t.map((i) => (n) => !n._stopped && i && i(n))
    );
  } else return t;
}
const Wr = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  yu = (e, t, s, i, n, r) => {
    const o = n === 'svg';
    t === 'class'
      ? ru(e, i, o)
      : t === 'style'
        ? cu(e, s, i)
        : Si(t)
          ? Dn(t) || fu(e, t, s, i, r)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : vu(e, t, i, o)
              )
            ? (Ur(e, t, i),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                Vr(e, t, i, o, r, t !== 'value'))
            : e._isVueCE && (/[A-Z]/.test(t) || !Ce(i))
              ? Ur(e, Ht(t), i, r, t)
              : (t === 'true-value'
                  ? (e._trueValue = i)
                  : t === 'false-value' && (e._falseValue = i),
                Vr(e, t, i, o));
  };
function vu(e, t, s, i) {
  if (i)
    return !!(
      t === 'innerHTML' ||
      t === 'textContent' ||
      (t in e && Wr(t) && Z(s))
    );
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'autocorrect' ||
    (t === 'sandbox' && e.tagName === 'IFRAME') ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1;
  if (t === 'width' || t === 'height') {
    const n = e.tagName;
    if (n === 'IMG' || n === 'VIDEO' || n === 'CANVAS' || n === 'SOURCE')
      return !1;
  }
  return Wr(t) && Ce(s) ? !1 : t in e;
}
const wi = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1;
  return Y(t) ? (s) => ii(t, s) : t;
};
function wu(e) {
  e.target.composing = !0;
}
function zr(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')));
}
const ds = Symbol('_assign');
function Yr(e, t, s) {
  return (t && (e = e.trim()), s && (e = Mi(e)), e);
}
const _l = {
    created(e, { modifiers: { lazy: t, trim: s, number: i } }, n) {
      e[ds] = wi(n);
      const r = i || (n.props && n.props.type === 'number');
      (Xt(e, t ? 'change' : 'input', (o) => {
        o.target.composing || e[ds](Yr(e.value, s, r));
      }),
        (s || r) &&
          Xt(e, 'change', () => {
            e.value = Yr(e.value, s, r);
          }),
        t ||
          (Xt(e, 'compositionstart', wu),
          Xt(e, 'compositionend', zr),
          Xt(e, 'change', zr)));
    },
    mounted(e, { value: t }) {
      e.value = t ?? '';
    },
    beforeUpdate(
      e,
      { value: t, oldValue: s, modifiers: { lazy: i, trim: n, number: r } },
      o,
    ) {
      if (((e[ds] = wi(o)), e.composing)) return;
      const l =
          (r || e.type === 'number') && !/^0\d/.test(e.value)
            ? Mi(e.value)
            : e.value,
        a = t ?? '';
      l !== a &&
        ((document.activeElement === e &&
          e.type !== 'range' &&
          ((i && t === s) || (n && e.value.trim() === a))) ||
          (e.value = a));
    },
  },
  xu = {
    deep: !0,
    created(e, { value: t, modifiers: { number: s } }, i) {
      const n = Ai(t);
      (Xt(e, 'change', () => {
        const r = Array.prototype.filter
          .call(e.options, (o) => o.selected)
          .map((o) => (s ? Mi(xi(o)) : xi(o)));
        (e[ds](e.multiple ? (n ? new Set(r) : r) : r[0]),
          (e._assigning = !0),
          Bt(() => {
            e._assigning = !1;
          }));
      }),
        (e[ds] = wi(i)));
    },
    mounted(e, { value: t }) {
      Gr(e, t);
    },
    beforeUpdate(e, t, s) {
      e[ds] = wi(s);
    },
    updated(e, { value: t }) {
      e._assigning || Gr(e, t);
    },
  };
function Gr(e, t) {
  const s = e.multiple,
    i = Y(t);
  if (!(s && !i && !Ai(t))) {
    for (let n = 0, r = e.options.length; n < r; n++) {
      const o = e.options[n],
        l = xi(o);
      if (s)
        if (i) {
          const a = typeof l;
          a === 'string' || a === 'number'
            ? (o.selected = t.some((c) => String(c) === String(l)))
            : (o.selected = fa(t, l) > -1);
        } else o.selected = t.has(l);
      else if (Us(xi(o), t)) {
        e.selectedIndex !== n && (e.selectedIndex = n);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function xi(e) {
  return '_value' in e ? e._value : e.value;
}
const ku = ['ctrl', 'shift', 'alt', 'meta'],
  Tu = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => ku.some((s) => e[`${s}Key`] && !t.includes(s)),
  },
  Cl = (e, t) => {
    if (!e) return e;
    const s = e._withMods || (e._withMods = {}),
      i = t.join('.');
    return (
      s[i] ||
      (s[i] = (n, ...r) => {
        for (let o = 0; o < t.length; o++) {
          const l = Tu[t[o]];
          if (l && l(n, t)) return;
        }
        return e(n, ...r);
      })
    );
  },
  _u = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  Cu = (e, t) => {
    const s = e._withKeys || (e._withKeys = {}),
      i = t.join('.');
    return (
      s[i] ||
      (s[i] = (n) => {
        if (!('key' in n)) return;
        const r = Ut(n.key);
        if (t.some((o) => o === r || _u[o] === r)) return e(n);
      })
    );
  },
  Su = Ne({ patchProp: yu }, Xc);
let Jr;
function Au() {
  return Jr || (Jr = $c(Su));
}
const Eu = (...e) => {
  const t = Au().createApp(...e),
    { mount: s } = t;
  return (
    (t.mount = (i) => {
      const n = $u(i);
      if (!n) return;
      const r = t._component;
      (!Z(r) && !r.render && !r.template && (r.template = n.innerHTML),
        n.nodeType === 1 && (n.textContent = ''));
      const o = s(n, !1, Mu(n));
      return (
        n instanceof Element &&
          (n.removeAttribute('v-cloak'), n.setAttribute('data-v-app', '')),
        o
      );
    }),
    t
  );
};
function Mu(e) {
  if (e instanceof SVGElement) return 'svg';
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement)
    return 'mathml';
}
function $u(e) {
  return Ce(e) ? document.querySelector(e) : e;
}
const Pu = ['src', 'alt'],
  Nu = {
    key: 1,
    class:
      'w-8 h-12 bg-border shrink-0 flex items-center justify-center text-[10px] text-ink-lighter',
  },
  Lu = { class: 'min-w-0' },
  Iu = { class: 'text-sm font-medium text-ink truncate' },
  Ou = { class: 'text-xs text-ink-lighter' },
  Du = {
    __name: 'SearchResultItem',
    props: { movie: Object },
    emits: ['select'],
    setup(e) {
      return (t, s) => (
        E(),
        $(
          'button',
          {
            onClick: s[0] || (s[0] = (i) => t.$emit('select', e.movie.id)),
            onKeydown:
              s[1] ||
              (s[1] = Cu(
                Cl((i) => t.$emit('select', e.movie.id), ['prevent']),
                ['enter'],
              )),
            class:
              'flex items-center gap-3 w-full px-4 py-2.5 transition-colors text-left cursor-pointer hover:bg-cream-dark focus:bg-cream-dark focus:outline-none',
          },
          [
            e.movie.posterUrl
              ? (E(),
                $(
                  'img',
                  {
                    key: 0,
                    src: e.movie.posterUrl,
                    alt: e.movie.title,
                    class: 'w-8 h-12 object-cover shrink-0',
                  },
                  null,
                  8,
                  Pu,
                ))
              : (E(), $('div', Nu, ' ? ')),
            g('div', Lu, [
              g('p', Iu, te(e.movie.title), 1),
              g('p', Ou, te(e.movie.year), 1),
            ]),
          ],
          32,
        )
      );
    },
  },
  Ru = 'https://api.themoviedb.org/3',
  Fu = 'https://www.omdbapi.com',
  ju = 'https://image.tmdb.org/t/p';
async function ki(e, t = {}) {
  const s = new URL(`${Ru}${e}`);
  s.searchParams.set('api_key', '33159c82f72046c8b67817afb46492b9');
  for (const [n, r] of Object.entries(t)) s.searchParams.set(n, r);
  const i = await fetch(s);
  if (!i.ok) throw new Error(`TMDB error: ${i.status}`);
  return i.json();
}
async function Hu(e = {}) {
  const t = new URL(Fu);
  t.searchParams.set('apikey', 'e65ba89c');
  for (const [i, n] of Object.entries(e)) t.searchParams.set(i, n);
  const s = await fetch(t);
  if (!s.ok) throw new Error(`OMDB error: ${s.status}`);
  return s.json();
}
function An(e, t = 'w500') {
  return e ? `${ju}/${t}${e}` : null;
}
const Bu = {
  'TMDB': { label: 'TMDB', color: 'bar' },
  'Internet Movie Database': { label: 'IMDB', color: 'bar' },
  'Rotten Tomatoes': { label: 'RT', color: 'bar-rt' },
  'Metacritic': { label: 'METACRIT...', color: 'bar' },
};
function Vu(e, t) {
  if (e === 'Internet Movie Database') {
    const s = parseFloat(t);
    return isNaN(s) ? null : { score: Math.round(s * 10), display: `${s}/10` };
  }
  if (e === 'Rotten Tomatoes') {
    const s = parseInt(t);
    return isNaN(s) ? null : { score: s, display: `${s}%` };
  }
  if (e === 'Metacritic') {
    const s = parseInt(t);
    return isNaN(s) ? null : { score: s, display: `${s}/100` };
  }
  return null;
}
function Uu(e, t = []) {
  const s = {};
  for (const c of t) {
    const u = Bu[c.Source];
    if (!u) continue;
    const f = Vu(c.Source, c.Value);
    f !== null && (s[c.Source] = { ...f, ...u, source: c.Source });
  }
  const i = s['Internet Movie Database'],
    n = s['Rotten Tomatoes'],
    r = s.Metacritic,
    o = [
      i
        ? {
            source: 'Internet Movie Database',
            label: 'IMDB',
            score: i.score,
            display: i.display,
            color: 'bar',
          }
        : {
            source: 'Internet Movie Database',
            label: 'IMDB',
            score: null,
            display: 'N/A',
            color: 'bar',
          },
      n
        ? {
            source: 'Rotten Tomatoes',
            label: 'RT',
            score: n.score,
            display: n.display,
            color: 'bar-rt',
          }
        : {
            source: 'Rotten Tomatoes',
            label: 'RT',
            score: null,
            display: 'N/A',
            color: 'bar-rt',
          },
      r
        ? {
            source: 'Metacritic',
            label: 'METACRIT...',
            score: r.score,
            display: r.display,
            color: 'bar',
          }
        : {
            source: 'Metacritic',
            label: 'METACRIT...',
            score: null,
            display: 'N/A',
            color: 'bar',
          },
    ],
    l = o.filter((c) => c.score !== null),
    a =
      l.length > 0
        ? Math.round(l.reduce((c, u) => c + u.score, 0) / l.length)
        : null;
  return { ratings: o, overall: a };
}
function qu(e) {
  if (!e || !e.results) return null;
  const t = e.results.filter(
      (n) => n.site === 'YouTube' && n.type === 'Trailer',
    ),
    s = t.find((n) => n.official) || t[0];
  if (s) return s.key;
  const i = e.results.find(
    (n) => n.site === 'YouTube' && (n.type === 'Teaser' || n.type === 'Clip'),
  );
  return i ? i.key : null;
}
function Ku(e) {
  if (!e || !e.crew) return null;
  const t = e.crew.find((s) => s.job === 'Director');
  return t ? t.name : null;
}
async function Wu(e) {
  const t = await ki(`/movie/${e}`, {
    append_to_response: 'credits,videos,external_ids',
  });
  let s = [];
  const i = t.external_ids?.imdb_id || t.imdb_id;
  if (i)
    try {
      const l = await Hu({ i });
      l.Ratings && (s = l.Ratings);
    } catch {}
  const { ratings: n, overall: r } = Uu(t.vote_average, s),
    o = (t.credits?.cast || []).slice(0, 5).map((l) => ({
      name: l.name,
      character: l.character,
      profileUrl: An(l.profile_path, 'w185'),
    }));
  return {
    id: t.id,
    title: t.title,
    year: t.release_date ? t.release_date.substring(0, 4) : '',
    runtime: t.runtime ? `${t.runtime}m` : null,
    director: Ku(t.credits),
    overview: t.overview,
    posterUrl: An(t.poster_path, 'w500'),
    genres: (t.genres || []).map((l) => l.name),
    cast: o,
    ratings: n,
    overall: r,
    trailerKey: qu(t.videos),
  };
}
const Ke = se([]),
  ns = se(new Set()),
  ti = se(localStorage.getItem('sortOrder') || 'none');
function Sl(e) {
  const t = window.location.origin + window.location.pathname;
  return e.length ? `${t}?films=${e.join(',')}` : t;
}
function zu() {
  const e = Ke.value.map((t) => t.id);
  window.history.replaceState({}, '', Sl(e));
}
function Al() {
  const e = Ke.value.map((t) => t.id);
  return Sl(e);
}
function Yu() {
  const e = Ke.value.map((s) => s.title),
    t = Al();
  return e.length
    ? `Check out ${e.length === 1 ? 'this film' : 'these films'} on CinemaSync: ${e.join(', ')} — ${t}`
    : t;
}
function Bi() {
  const e = Xe(() =>
    ti.value === 'none'
      ? Ke.value
      : [...Ke.value].sort((r, o) => {
          const l = r.overall ?? -1,
            a = o.overall ?? -1;
          return ti.value === 'desc' ? a - l : l - a;
        }),
  );
  async function t(r) {
    if (!Ke.value.some((o) => o.id === r) && !ns.value.has(r)) {
      ns.value = new Set([...ns.value, r]);
      try {
        const o = await Wu(r);
        Ke.value.some((l) => l.id === r) || (Ke.value = [...Ke.value, o]);
      } finally {
        const o = new Set(ns.value);
        (o.delete(r), (ns.value = o));
      }
    }
  }
  function s(r) {
    Ke.value = Ke.value.filter((o) => o.id !== r);
  }
  function i() {
    Ke.value = [];
  }
  function n() {
    const o = new URLSearchParams(window.location.search).get('films');
    if (!o) return;
    const l = o.split(',').map(Number).filter(Boolean);
    for (const a of l) t(a);
  }
  return (
    yt(Ke, zu, { deep: !0 }),
    yt(ti, (r) => localStorage.setItem('sortOrder', r)),
    {
      movies: Ke,
      sortedMovies: e,
      loadingIds: ns,
      sortOrder: ti,
      addMovie: t,
      removeMovie: s,
      clearMovies: i,
      loadFromUrl: n,
      getShareUrl: Al,
      getShareMessage: Yu,
    }
  );
}
const Gu = ['disabled'],
  Ju = {
    class:
      'relative bg-cream border border-border-dark shadow-xl w-full max-w-md',
  },
  Xu = {
    class: 'flex items-center justify-between px-5 py-4 border-b border-border',
  },
  Qu = { class: 'px-5 py-4 space-y-4' },
  Zu = { class: 'flex items-center gap-2' },
  ed = { class: 'text-sm text-ink/80 truncate flex-1 min-w-0' },
  td = { class: 'border-t border-border pt-4' },
  sd = {
    class:
      'text-sm text-ink/80 leading-relaxed break-words whitespace-pre-wrap mb-3',
  },
  id = {
    __name: 'ShareButton',
    setup(e) {
      const { movies: t, getShareUrl: s, getShareMessage: i } = Bi(),
        n = se(!1),
        r = se(null),
        o = se(null),
        l = se(null);
      let a = null;
      function c() {
        ((r.value = null), (a = document.activeElement), (n.value = !0));
      }
      function u() {
        ((n.value = !1), (r.value = null), a && (a.focus(), (a = null)));
      }
      function f(v) {
        if (!o.value) return;
        const x = o.value.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!x.length) return;
        const M = x[0],
          b = x[x.length - 1];
        v.shiftKey && document.activeElement === M
          ? (v.preventDefault(), b.focus())
          : !v.shiftKey &&
            document.activeElement === b &&
            (v.preventDefault(), M.focus());
      }
      function p(v) {
        v.key === 'Escape' ? u() : v.key === 'Tab' && f(v);
      }
      yt(n, async (v) => {
        v
          ? ((document.body.style.overflow = 'hidden'),
            await Bt(),
            l.value?.focus())
          : (document.body.style.overflow = '');
      });
      async function y() {
        (await navigator.clipboard.writeText(s()),
          (r.value = 'link'),
          setTimeout(() => {
            r.value = null;
          }, 2e3));
      }
      async function k() {
        (await navigator.clipboard.writeText(i()),
          (r.value = 'message'),
          setTimeout(() => {
            r.value = null;
          }, 2e3));
      }
      return (v, x) => (
        E(),
        $(
          ie,
          null,
          [
            g(
              'button',
              {
                'onClick': c,
                'disabled': !fe(t).length,
                'class':
                  'border border-border-dark px-3 py-1.5 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink flex items-center gap-1.5',
                'aria-label': 'Share',
              },
              [
                ...(x[0] ||
                  (x[0] = [
                    Qn(
                      '<svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="3" r="2"></circle><circle cx="12" cy="13" r="2"></circle><circle cx="4" cy="8" r="2"></circle><path d="M6 7l4-3M6 9l4 3"></path></svg> Share ',
                      2,
                    ),
                  ])),
              ],
              8,
              Gu,
            ),
            (E(),
            ts(Yn, { to: 'body' }, [
              n.value
                ? (E(),
                  $(
                    'div',
                    {
                      'key': 0,
                      'ref_key': 'modal',
                      'ref': o,
                      'role': 'dialog',
                      'aria-modal': 'true',
                      'aria-label': 'Share',
                      'class':
                        'fixed inset-0 z-50 flex items-center justify-center p-4',
                      'onKeydown': p,
                    },
                    [
                      g('div', {
                        'class': 'fixed inset-0 bg-ink/40',
                        'aria-hidden': 'true',
                        'onClick': u,
                      }),
                      g('div', Ju, [
                        g('div', Xu, [
                          x[2] ||
                            (x[2] = g(
                              'h2',
                              {
                                class:
                                  'text-sm font-medium uppercase tracking-widest text-ink',
                              },
                              'Share',
                              -1,
                            )),
                          g(
                            'button',
                            {
                              'ref_key': 'closeBtn',
                              'ref': l,
                              'onClick': u,
                              'class':
                                'text-ink/50 hover:text-ink transition-colors cursor-pointer',
                              'aria-label': 'Close',
                            },
                            [
                              ...(x[1] ||
                                (x[1] = [
                                  g(
                                    'svg',
                                    {
                                      'class': 'w-4 h-4',
                                      'viewBox': '0 0 16 16',
                                      'fill': 'none',
                                      'stroke': 'currentColor',
                                      'stroke-width': '1.5',
                                    },
                                    [g('path', { d: 'M4 4l8 8M12 4l-8 8' })],
                                    -1,
                                  ),
                                ])),
                            ],
                            512,
                          ),
                        ]),
                        g('div', Qu, [
                          g('div', null, [
                            x[7] ||
                              (x[7] = g(
                                'p',
                                {
                                  class:
                                    'text-[11px] uppercase tracking-widest text-ink/50 mb-2',
                                },
                                'Link',
                                -1,
                              )),
                            g('div', Zu, [
                              g('p', ed, te(fe(s)()), 1),
                              g(
                                'button',
                                {
                                  onClick: y,
                                  class:
                                    'shrink-0 border border-border-dark px-3 py-1.5 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer flex items-center gap-1.5',
                                },
                                [
                                  r.value === 'link'
                                    ? (E(),
                                      $(
                                        ie,
                                        { key: 0 },
                                        [
                                          x[3] ||
                                            (x[3] = g(
                                              'svg',
                                              {
                                                'class': 'w-3.5 h-3.5',
                                                'viewBox': '0 0 16 16',
                                                'fill': 'none',
                                                'stroke': 'currentColor',
                                                'stroke-width': '1.5',
                                              },
                                              [
                                                g('path', {
                                                  d: 'M3 8.5l3.5 3.5L13 4',
                                                }),
                                              ],
                                              -1,
                                            )),
                                          x[4] || (x[4] = nt(' Copied ', -1)),
                                        ],
                                        64,
                                      ))
                                    : (E(),
                                      $(
                                        ie,
                                        { key: 1 },
                                        [
                                          x[5] ||
                                            (x[5] = g(
                                              'svg',
                                              {
                                                'class': 'w-3.5 h-3.5',
                                                'viewBox': '0 0 16 16',
                                                'fill': 'none',
                                                'stroke': 'currentColor',
                                                'stroke-width': '1.5',
                                              },
                                              [
                                                g('rect', {
                                                  x: '5',
                                                  y: '5',
                                                  width: '8',
                                                  height: '8',
                                                  rx: '1',
                                                }),
                                                g('path', { d: 'M3 11V3h8' }),
                                              ],
                                              -1,
                                            )),
                                          x[6] || (x[6] = nt(' Copy ', -1)),
                                        ],
                                        64,
                                      )),
                                ],
                              ),
                            ]),
                          ]),
                          g('div', td, [
                            x[12] ||
                              (x[12] = g(
                                'p',
                                {
                                  class:
                                    'text-[11px] uppercase tracking-widest text-ink/50 mb-2',
                                },
                                'Message',
                                -1,
                              )),
                            g('p', sd, te(fe(i)()), 1),
                            g(
                              'button',
                              {
                                onClick: k,
                                class:
                                  'border border-border-dark px-3 py-1.5 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer flex items-center gap-1.5',
                              },
                              [
                                r.value === 'message'
                                  ? (E(),
                                    $(
                                      ie,
                                      { key: 0 },
                                      [
                                        x[8] ||
                                          (x[8] = g(
                                            'svg',
                                            {
                                              'class': 'w-3.5 h-3.5',
                                              'viewBox': '0 0 16 16',
                                              'fill': 'none',
                                              'stroke': 'currentColor',
                                              'stroke-width': '1.5',
                                            },
                                            [
                                              g('path', {
                                                d: 'M3 8.5l3.5 3.5L13 4',
                                              }),
                                            ],
                                            -1,
                                          )),
                                        x[9] || (x[9] = nt(' Copied ', -1)),
                                      ],
                                      64,
                                    ))
                                  : (E(),
                                    $(
                                      ie,
                                      { key: 1 },
                                      [
                                        x[10] ||
                                          (x[10] = g(
                                            'svg',
                                            {
                                              'class': 'w-3.5 h-3.5',
                                              'viewBox': '0 0 16 16',
                                              'fill': 'none',
                                              'stroke': 'currentColor',
                                              'stroke-width': '1.5',
                                            },
                                            [
                                              g('rect', {
                                                x: '5',
                                                y: '5',
                                                width: '8',
                                                height: '8',
                                                rx: '1',
                                              }),
                                              g('path', { d: 'M3 11V3h8' }),
                                            ],
                                            -1,
                                          )),
                                        x[11] || (x[11] = nt(' Copy ', -1)),
                                      ],
                                      64,
                                    )),
                              ],
                            ),
                          ]),
                        ]),
                      ]),
                    ],
                    544,
                  ))
                : ne('', !0),
            ])),
          ],
          64,
        )
      );
    },
  };
let Xr = null;
function Qr(e) {
  return (e || []).slice(0, 8).map((t) => ({
    id: t.id,
    title: t.title,
    year: t.release_date ? t.release_date.substring(0, 4) : '',
    posterUrl: An(t.poster_path, 'w92'),
  }));
}
function nd() {
  const e = se(''),
    t = se([]),
    s = se([]),
    i = se(!1);
  async function n() {
    if (!s.value.length)
      try {
        const r = await ki('/movie/popular');
        s.value = Qr(r.results);
      } catch {}
  }
  return (
    yt(e, (r) => {
      if ((clearTimeout(Xr), !r || r.trim().length < 2)) {
        t.value = [];
        return;
      }
      ((i.value = !0),
        (Xr = setTimeout(async () => {
          try {
            const o = await ki('/search/movie', {
              query: r.trim(),
              include_adult: 'false',
            });
            t.value = Qr(o.results);
          } catch {
            t.value = [];
          } finally {
            i.value = !1;
          }
        }, 300)));
    }),
    { query: e, results: t, popular: s, loading: i, fetchPopular: n }
  );
}
const El = 'https://cinemas.taylor-295.workers.dev';
async function rd() {
  const e = await fetch(`${El}/cinemas`);
  if (!e.ok) throw new Error(`Cinemas API error: ${e.status}`);
  return e.json();
}
async function od(e, t) {
  const s = e.join(','),
    i = await fetch(`${El}/cinemas/${s}/films?date=${t}`);
  if (!i.ok) throw new Error(`Films API error: ${i.status}`);
  return i.json();
}
const rs = se([]),
  st = se([]),
  rn = se(new Date().toISOString().split('T')[0]),
  si = se([]),
  on = se(!1),
  ln = se(!1),
  ld = se(!1);
let Zr = !1;
function er() {
  const e = Xe(() => st.value.length > 0);
  async function t() {
    if (!Zr) {
      on.value = !0;
      try {
        const { cinemas: l } = await rd();
        ((rs.value = l), (Zr = !0));
      } catch {
        rs.value = [];
      } finally {
        on.value = !1;
      }
    }
  }
  function s(l) {
    st.value.findIndex((c) => c.id === l.id) >= 0
      ? (st.value = st.value.filter((c) => c.id !== l.id))
      : (st.value = [...st.value, l]);
  }
  async function i() {
    if (st.value.length) {
      ln.value = !0;
      try {
        const l = st.value.map((u) => u.id),
          { films: a } = await od(l, rn.value),
          c = new Map(rs.value.map((u) => [u.id, u.name]));
        for (const u of a)
          for (const f of u.cinemaShowtimes)
            f.cinemaName = c.get(f.cinemaId) || f.cinemaId;
        si.value = a;
      } catch {
        si.value = [];
      } finally {
        ln.value = !1;
      }
    }
  }
  function n(l) {
    ((rn.value = l), st.value.length && i());
  }
  function r(l) {
    if (!l) return rs.value;
    const a = l.toLowerCase();
    return rs.value.filter(
      (c) =>
        c.name.toLowerCase().includes(a) ||
        c.fullName.toLowerCase().includes(a) ||
        (c.address && JSON.stringify(c.address).toLowerCase().includes(a)),
    );
  }
  function o() {
    ((st.value = []), (si.value = []));
  }
  return {
    cinemas: rs,
    selectedCinemas: st,
    selectedDate: rn,
    loadingCinemas: on,
    loadingFilms: ln,
    showModal: ld,
    isActive: e,
    mergedFilms: si,
    loadAllCinemas: t,
    loadFilmsForSelectedCinemas: i,
    toggleCinema: s,
    setDate: n,
    filterCinemas: r,
    clear: o,
  };
}
const ad = { class: 'border-b border-border' },
  cd = {
    class:
      'max-w-[1400px] mx-auto px-6 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-2',
  },
  ud = { class: 'relative' },
  dd = ['aria-expanded'],
  fd = { key: 0, class: 'absolute right-3 top-1/2 -translate-y-1/2' },
  hd = {
    key: 0,
    id: 'search-listbox',
    role: 'listbox',
    class:
      'absolute top-full left-0 mt-1 w-full bg-cream border border-border-dark shadow-lg z-40',
  },
  pd = {
    key: 0,
    class:
      'px-4 py-2 text-[10px] uppercase tracking-widest text-ink-lighter font-medium border-b border-border',
  },
  md = { class: 'max-h-80 overflow-y-auto' },
  gd = {
    key: 1,
    class:
      'absolute top-full left-0 mt-1 w-full bg-cream border border-border-dark shadow-lg z-40',
  },
  bd = { class: 'flex items-center gap-2' },
  yd = { class: 'ml-auto flex items-center gap-2' },
  vd = {
    __name: 'SearchBar',
    setup(e, { expose: t }) {
      const {
          query: s,
          results: i,
          popular: n,
          loading: r,
          fetchPopular: o,
        } = nd(),
        { addMovie: l, sortOrder: a, movies: c, clearMovies: u } = Bi(),
        { showModal: f } = er(),
        p = se(!1),
        y = se(null),
        k = se(null);
      let v = !1;
      const x = Xe(() =>
          s.value.trim().length >= 2 ? i.value : p.value ? n.value : [],
        ),
        M = Xe(() => (s.value.trim().length >= 2 ? null : 'Popular Now'));
      function b() {
        if (v) {
          v = !1;
          return;
        }
        ((p.value = !0), o());
      }
      function P(G) {
        k.value?.contains(G.relatedTarget) || (p.value = !1);
      }
      function T() {
        ((p.value = !0), o(), Bt(() => y.value?.focus()));
      }
      function V(G) {
        (l(G),
          (s.value = ''),
          (i.value = []),
          (p.value = !1),
          (v = !0),
          y.value?.focus());
      }
      function K(G) {
        G.key === 'Escape' && ((p.value = !1), y.value?.blur());
      }
      return (
        t({ openSearch: T }),
        (G, O) => (
          E(),
          $('div', ad, [
            g('div', cd, [
              g(
                'div',
                {
                  ref_key: 'container',
                  ref: k,
                  class: 'relative flex-1 min-w-[180px] max-w-xs',
                  onFocusout: P,
                },
                [
                  g('div', ud, [
                    bn(
                      g(
                        'input',
                        {
                          'ref_key': 'searchInput',
                          'ref': y,
                          'onUpdate:modelValue':
                            O[0] ||
                            (O[0] = (j) => (Pe(s) ? (s.value = j) : null)),
                          'onFocus': b,
                          'onKeydown': K,
                          'type': 'text',
                          'role': 'combobox',
                          'aria-autocomplete': 'list',
                          'aria-expanded': p.value && x.value.length > 0,
                          'aria-controls': 'search-listbox',
                          'placeholder': 'Search films...',
                          'class':
                            'w-full px-3 py-1.5 pr-8 bg-white text-ink border border-border focus:border-ink focus:outline-none placeholder-ink-lighter text-sm',
                        },
                        null,
                        40,
                        dd,
                      ),
                      [[_l, fe(s)]],
                    ),
                    fe(r)
                      ? (E(),
                        $('div', fd, [
                          ...(O[5] ||
                            (O[5] = [
                              g(
                                'div',
                                {
                                  class:
                                    'w-3.5 h-3.5 border-2 border-ink border-t-transparent rounded-full animate-spin',
                                },
                                null,
                                -1,
                              ),
                            ])),
                        ]))
                      : fe(s)
                        ? (E(),
                          $(
                            'button',
                            {
                              'key': 1,
                              'onClick':
                                O[1] ||
                                (O[1] = (j) => {
                                  ((s.value = ''),
                                    (i.value = []),
                                    (p.value = !1));
                                }),
                              'class':
                                'absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors cursor-pointer',
                              'aria-label': 'Clear search',
                            },
                            [
                              ...(O[6] ||
                                (O[6] = [
                                  g(
                                    'svg',
                                    {
                                      'class': 'w-3.5 h-3.5',
                                      'viewBox': '0 0 16 16',
                                      'fill': 'none',
                                      'stroke': 'currentColor',
                                      'stroke-width': '1.5',
                                    },
                                    [g('path', { d: 'M4 4l8 8M12 4l-8 8' })],
                                    -1,
                                  ),
                                ])),
                            ],
                          ))
                        : ne('', !0),
                  ]),
                  p.value && x.value.length
                    ? (E(),
                      $('div', hd, [
                        M.value
                          ? (E(), $('p', pd, te(M.value), 1))
                          : ne('', !0),
                        g('div', md, [
                          (E(!0),
                          $(
                            ie,
                            null,
                            ze(
                              x.value,
                              (j) => (
                                E(),
                                ts(
                                  Du,
                                  {
                                    key: j.id,
                                    movie: j,
                                    role: 'option',
                                    onSelect: V,
                                  },
                                  null,
                                  8,
                                  ['movie'],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                      ]))
                    : p.value && fe(s).length >= 2 && !fe(r)
                      ? (E(),
                        $('div', gd, [
                          ...(O[7] ||
                            (O[7] = [
                              g(
                                'div',
                                {
                                  class:
                                    'px-4 py-6 text-center text-sm text-ink-lighter',
                                  role: 'status',
                                },
                                ' No results found ',
                                -1,
                              ),
                            ])),
                        ]))
                      : ne('', !0),
                ],
                544,
              ),
              O[11] ||
                (O[11] = g(
                  'div',
                  { class: 'border-l border-border h-6 hidden sm:block' },
                  null,
                  -1,
                )),
              g('div', bd, [
                O[9] ||
                  (O[9] = g(
                    'label',
                    {
                      for: 'sort-select',
                      class:
                        'text-[10px] uppercase tracking-widest text-ink-lighter font-medium shrink-0 hidden sm:block',
                    },
                    ' Sort ',
                    -1,
                  )),
                bn(
                  g(
                    'select',
                    {
                      'id': 'sort-select',
                      'onUpdate:modelValue':
                        O[2] || (O[2] = (j) => (Pe(a) ? (a.value = j) : null)),
                      'class':
                        'text-xs bg-white text-ink border border-border focus:border-ink focus:outline-none py-1.5 px-2 cursor-pointer',
                    },
                    [
                      ...(O[8] ||
                        (O[8] = [
                          g('option', { value: 'none' }, 'Order added', -1),
                          g(
                            'option',
                            { value: 'desc' },
                            'Score: high to low',
                            -1,
                          ),
                          g(
                            'option',
                            { value: 'asc' },
                            'Score: low to high',
                            -1,
                          ),
                        ])),
                    ],
                    512,
                  ),
                  [[xu, fe(a)]],
                ),
              ]),
              fe(c).length
                ? (E(),
                  $(
                    'button',
                    {
                      key: 0,
                      onClick: O[3] || (O[3] = (...j) => fe(u) && fe(u)(...j)),
                      class:
                        'border border-border-dark px-3 py-1.5 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer',
                    },
                    ' Clear All ',
                  ))
                : ne('', !0),
              g('div', yd, [
                g(
                  'button',
                  {
                    'onClick': O[4] || (O[4] = (j) => (f.value = !0)),
                    'class':
                      'px-3 py-1.5 text-sm uppercase tracking-widest font-medium text-ink/70 hover:text-ink hover:underline transition-colors cursor-pointer flex items-center gap-1.5',
                    'aria-label': 'Find Films',
                  },
                  [
                    ...(O[10] ||
                      (O[10] = [
                        g(
                          'svg',
                          {
                            class: 'w-3.5 h-3.5',
                            viewBox: '0 0 24 24',
                            fill: 'currentColor',
                          },
                          [
                            g('path', {
                              d: 'M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z',
                            }),
                          ],
                          -1,
                        ),
                        nt(' Find Films ', -1),
                      ])),
                  ],
                ),
                Te(id),
              ]),
            ]),
          ])
        )
      );
    },
  },
  wd = { class: 'flex items-center gap-3 text-xs' },
  xd = { class: 'w-16 shrink-0 text-ink-lighter uppercase tracking-wide' },
  kd = { class: 'flex-1 h-1.5 bg-bar-bg overflow-hidden' },
  Td = {
    __name: 'RatingBar',
    props: { label: String, score: Number, display: String, color: String },
    setup(e) {
      const t = { 'bar': 'bg-bar', 'bar-rt': 'bg-bar-rt' };
      return (s, i) => (
        E(),
        $('div', wd, [
          g('span', xd, te(e.label), 1),
          g('div', kd, [
            e.score !== null
              ? (E(),
                $(
                  'div',
                  {
                    key: 0,
                    class: Ge([
                      'h-full transition-all duration-500',
                      t[e.color] || 'bg-bar',
                    ]),
                    style: Pi({ width: e.score + '%' }),
                  },
                  null,
                  6,
                ))
              : ne('', !0),
          ]),
          g(
            'span',
            {
              class: Ge([
                'w-14 text-right font-medium tabular-nums',
                e.score !== null ? 'text-ink' : 'text-ink-lighter',
              ]),
            },
            te(e.display),
            3,
          ),
        ])
      );
    },
  },
  _d = { key: 0 },
  Cd = { class: 'border-t border-border pt-4 mt-4' },
  Sd = { class: 'space-y-2' },
  Ad = {
    __name: 'RatingDisplay',
    props: { ratings: Array, overall: Number },
    setup(e) {
      return (t, s) =>
        e.ratings
          ? (E(),
            $('div', _d, [
              g('div', Cd, [
                s[0] ||
                  (s[0] = g(
                    'p',
                    {
                      class:
                        'text-[10px] font-semibold text-ink-lighter uppercase tracking-widest mb-3',
                    },
                    'Ratings',
                    -1,
                  )),
                g('div', Sd, [
                  (E(!0),
                  $(
                    ie,
                    null,
                    ze(
                      e.ratings,
                      (i) => (
                        E(),
                        ts(
                          Td,
                          {
                            key: i.source,
                            label: i.label,
                            score: i.score,
                            display: i.display,
                            color: i.color,
                          },
                          null,
                          8,
                          ['label', 'score', 'display', 'color'],
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ]),
            ]))
          : ne('', !0);
    },
  },
  Ed = { class: 'w-72 shrink-0 flex flex-col' },
  Md = { class: 'flex justify-end mb-1 -mr-1' },
  $d = { class: 'border border-border relative group/poster bg-cream-dark' },
  Pd = ['src', 'alt'],
  Nd = {
    key: 1,
    class:
      'w-full aspect-[2/3] flex items-center justify-center text-ink-lighter text-sm px-4 text-center',
  },
  Ld = { class: 'mt-4' },
  Id = { class: 'font-serif text-3xl text-accent leading-none' },
  Od = { class: 'font-serif text-xl text-ink leading-tight mt-2' },
  Dd = {
    class: 'text-xs text-ink-lighter mt-1 flex items-center gap-1.5 flex-wrap',
  },
  Rd = { class: 'inline-flex items-center gap-0.5' },
  Fd = { class: 'inline-flex items-center gap-0.5' },
  jd = { key: 0, class: 'flex flex-wrap gap-1.5 mt-3' },
  Hd = {
    key: 1,
    class: 'text-sm text-ink-light leading-relaxed mt-3 line-clamp-3',
  },
  Bd = { key: 2, class: 'border-t border-border pt-4 mt-4' },
  Vd = { class: 'space-y-2.5' },
  Ud = ['src', 'alt'],
  qd = {
    key: 1,
    class:
      'w-7 h-7 rounded-full bg-cream-dark shrink-0 flex items-center justify-center text-[9px] text-ink-lighter font-medium',
  },
  Kd = { class: 'min-w-0' },
  Wd = { class: 'text-sm font-medium text-ink leading-tight truncate' },
  zd = { class: 'text-[11px] text-ink-lighter leading-tight truncate' },
  Yd = {
    __name: 'MovieCard',
    props: { movie: Object },
    emits: ['remove'],
    setup(e, { emit: t }) {
      const s = t,
        i = _s('openTrailer');
      return (n, r) => (
        E(),
        $('div', Ed, [
          g('div', Md, [
            g(
              'button',
              {
                'onClick': r[0] || (r[0] = (o) => s('remove', e.movie.id)),
                'class':
                  'w-6 h-6 m-0.5 flex items-center justify-center text-ink-lighter hover:text-ink cursor-pointer transition-colors',
                'aria-label': 'Remove film',
              },
              [
                ...(r[2] ||
                  (r[2] = [
                    g(
                      'svg',
                      {
                        'class': 'w-4 h-4',
                        'viewBox': '0 0 16 16',
                        'fill': 'none',
                        'stroke': 'currentColor',
                        'stroke-width': '1.5',
                      },
                      [g('path', { d: 'M4 4l8 8M12 4l-8 8' })],
                      -1,
                    ),
                  ])),
              ],
            ),
          ]),
          g('div', $d, [
            e.movie.posterUrl
              ? (E(),
                $(
                  'img',
                  {
                    key: 0,
                    src: e.movie.posterUrl,
                    alt: e.movie.title,
                    class: 'w-full aspect-[2/3] object-cover',
                  },
                  null,
                  8,
                  Pd,
                ))
              : (E(), $('div', Nd, te(e.movie.title), 1)),
            e.movie.trailerKey
              ? (E(),
                $(
                  'button',
                  {
                    'key': 2,
                    'onClick':
                      r[1] || (r[1] = (o) => fe(i)(e.movie.trailerKey)),
                    'class':
                      'group/play absolute inset-0 flex items-center justify-center bg-black/0 group-hover/poster:bg-black/40 focus:bg-black/40 transition-all cursor-pointer focus:outline-none',
                    'aria-label': 'Play trailer',
                  },
                  [
                    ...(r[3] ||
                      (r[3] = [
                        g(
                          'span',
                          {
                            class:
                              'w-12 h-12 flex items-center justify-center bg-white/90 opacity-0 group-hover/poster:opacity-100 group-focus/play:opacity-100 transition-opacity',
                          },
                          [
                            g(
                              'svg',
                              {
                                class: 'w-5 h-5 text-ink ml-0.5',
                                viewBox: '0 0 16 16',
                                fill: 'currentColor',
                              },
                              [g('path', { d: 'M4 2l10 6-10 6V2z' })],
                            ),
                          ],
                          -1,
                        ),
                      ])),
                  ],
                ))
              : ne('', !0),
          ]),
          g('div', Ld, [
            e.movie.overall !== null
              ? (E(),
                $(
                  ie,
                  { key: 0 },
                  [
                    g('span', Id, te(e.movie.overall), 1),
                    r[4] ||
                      (r[4] = g(
                        'span',
                        { class: 'text-sm text-ink-lighter ml-1' },
                        '/100',
                        -1,
                      )),
                  ],
                  64,
                ))
              : (E(),
                $(
                  ie,
                  { key: 1 },
                  [
                    r[5] ||
                      (r[5] = g(
                        'span',
                        {
                          class:
                            'font-serif text-3xl text-ink-lighter leading-none',
                        },
                        'N/A',
                        -1,
                      )),
                    r[6] ||
                      (r[6] = g(
                        'span',
                        { class: 'text-sm text-ink-lighter ml-1' },
                        '/ 100',
                        -1,
                      )),
                  ],
                  64,
                )),
          ]),
          g('h3', Od, te(e.movie.title), 1),
          g('p', Dd, [
            g('span', null, te(e.movie.year), 1),
            e.movie.runtime
              ? (E(),
                $(
                  ie,
                  { key: 0 },
                  [
                    r[8] || (r[8] = g('span', null, '·', -1)),
                    g('span', Rd, [
                      r[7] ||
                        (r[7] = g(
                          'svg',
                          {
                            'class': 'w-3 h-3',
                            'viewBox': '0 0 16 16',
                            'fill': 'none',
                            'stroke': 'currentColor',
                            'stroke-width': '1.5',
                          },
                          [
                            g('circle', { cx: '8', cy: '8', r: '6' }),
                            g('path', { d: 'M8 5v3.5l2.5 1.5' }),
                          ],
                          -1,
                        )),
                      nt(' ' + te(e.movie.runtime), 1),
                    ]),
                  ],
                  64,
                ))
              : ne('', !0),
            e.movie.director
              ? (E(),
                $(
                  ie,
                  { key: 1 },
                  [
                    r[10] || (r[10] = g('span', null, '·', -1)),
                    g('span', Fd, [
                      r[9] ||
                        (r[9] = g(
                          'svg',
                          {
                            'class': 'w-3 h-3',
                            'viewBox': '0 0 16 16',
                            'fill': 'none',
                            'stroke': 'currentColor',
                            'stroke-width': '1.5',
                          },
                          [
                            g('path', {
                              d: 'M8 2a3 3 0 100 6 3 3 0 000-6zM3 14c0-2.8 2.2-5 5-5s5 2.2 5 5',
                            }),
                          ],
                          -1,
                        )),
                      nt(' ' + te(e.movie.director), 1),
                    ]),
                  ],
                  64,
                ))
              : ne('', !0),
          ]),
          e.movie.genres.length
            ? (E(),
              $('div', jd, [
                (E(!0),
                $(
                  ie,
                  null,
                  ze(
                    e.movie.genres,
                    (o) => (
                      E(),
                      $(
                        'span',
                        {
                          key: o,
                          class:
                            'text-[10px] uppercase tracking-wide border border-border-dark text-ink px-2 py-0.5 font-medium',
                        },
                        te(o),
                        1,
                      )
                    ),
                  ),
                  128,
                )),
              ]))
            : ne('', !0),
          e.movie.overview
            ? (E(), $('p', Hd, te(e.movie.overview), 1))
            : ne('', !0),
          Te(
            Ad,
            { ratings: e.movie.ratings, overall: e.movie.overall },
            null,
            8,
            ['ratings', 'overall'],
          ),
          e.movie.cast.length
            ? (E(),
              $('div', Bd, [
                r[11] ||
                  (r[11] = g(
                    'p',
                    {
                      class:
                        'text-[10px] font-semibold text-ink-lighter uppercase tracking-widest mb-3',
                    },
                    'Cast',
                    -1,
                  )),
                g('div', Vd, [
                  (E(!0),
                  $(
                    ie,
                    null,
                    ze(
                      e.movie.cast,
                      (o) => (
                        E(),
                        $(
                          'div',
                          { key: o.name, class: 'flex items-center gap-2.5' },
                          [
                            o.profileUrl
                              ? (E(),
                                $(
                                  'img',
                                  {
                                    key: 0,
                                    src: o.profileUrl,
                                    alt: o.name,
                                    class:
                                      'w-7 h-7 rounded-full object-cover shrink-0',
                                  },
                                  null,
                                  8,
                                  Ud,
                                ))
                              : (E(),
                                $(
                                  'div',
                                  qd,
                                  te(
                                    o.name
                                      .split(' ')
                                      .map((l) => l[0])
                                      .join('')
                                      .slice(0, 2),
                                  ),
                                  1,
                                )),
                            g('div', Kd, [
                              g('p', Wd, te(o.name), 1),
                              g('p', zd, te(o.character), 1),
                            ]),
                          ],
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ]))
            : ne('', !0),
        ])
      );
    },
  },
  Gd = { class: 'relative' },
  Jd = { class: 'w-72 shrink-0 self-start' },
  Xd = {
    __name: 'ComparisonGrid',
    emits: ['add'],
    setup(e) {
      const { sortedMovies: t, loadingIds: s, removeMovie: i } = Bi(),
        n = se(null),
        r = se(!1),
        o = se(!1);
      function l() {
        if (!n.value) return;
        const u = n.value;
        ((r.value = u.scrollLeft > 1),
          (o.value = u.scrollLeft + u.clientWidth < u.scrollWidth - 1));
      }
      function a(u) {
        n.value && n.value.scrollBy({ left: u * 304, behavior: 'smooth' });
      }
      let c = null;
      return (
        Di(() => {
          (l(),
            n.value &&
              (n.value.addEventListener('scroll', l, { passive: !0 }),
              (c = new ResizeObserver(l)),
              c.observe(n.value)));
        }),
        Ri(() => {
          (n.value && n.value.removeEventListener('scroll', l),
            c?.disconnect());
        }),
        yt([t, s], () => {
          Bt(l);
        }),
        (u, f) => (
          E(),
          $('div', Gd, [
            r.value
              ? (E(),
                $(
                  'button',
                  {
                    'key': 0,
                    'onClick': f[0] || (f[0] = (p) => a(-1)),
                    'class':
                      'absolute left-0 top-0 bottom-0 z-10 w-10 flex items-start pt-36 justify-center bg-gradient-to-r from-cream to-transparent cursor-pointer',
                    'aria-label': 'Scroll left',
                  },
                  [
                    ...(f[3] ||
                      (f[3] = [
                        g(
                          'svg',
                          {
                            'class': 'w-5 h-5 text-ink',
                            'viewBox': '0 0 16 16',
                            'fill': 'none',
                            'stroke': 'currentColor',
                            'stroke-width': '2',
                          },
                          [g('path', { d: 'M10 3l-5 5 5 5' })],
                          -1,
                        ),
                      ])),
                  ],
                ))
              : ne('', !0),
            g(
              'div',
              {
                ref_key: 'track',
                ref: n,
                class: 'flex gap-8 overflow-x-auto hide-scrollbar pb-4',
              },
              [
                (E(!0),
                $(
                  ie,
                  null,
                  ze(
                    fe(t),
                    (p) => (
                      E(),
                      ts(
                        Yd,
                        { key: p.id, movie: p, onRemove: fe(i) },
                        null,
                        8,
                        ['movie', 'onRemove'],
                      )
                    ),
                  ),
                  128,
                )),
                (E(!0),
                $(
                  ie,
                  null,
                  ze(
                    fe(s),
                    (p) => (
                      E(),
                      $(
                        'div',
                        {
                          key: 'loading-' + p,
                          class: 'w-72 shrink-0 animate-pulse',
                        },
                        [
                          ...(f[4] ||
                            (f[4] = [
                              Qn(
                                '<div class="flex justify-end mb-1"><span class="text-lg leading-none invisible">×</span></div><div class="w-full aspect-[2/3] bg-cream-dark border border-border"></div><div class="mt-4 space-y-3"><div class="h-8 bg-cream-dark w-16"></div><div class="h-6 bg-cream-dark w-3/4"></div><div class="h-3 bg-cream-dark w-1/2"></div><div class="flex gap-1.5 mt-3"><div class="h-5 bg-cream-dark w-16"></div><div class="h-5 bg-cream-dark w-12"></div></div><div class="h-3 bg-cream-dark w-full mt-3"></div><div class="h-3 bg-cream-dark w-5/6"></div></div>',
                                3,
                              ),
                            ])),
                        ],
                      )
                    ),
                  ),
                  128,
                )),
                g('div', Jd, [
                  f[6] ||
                    (f[6] = g(
                      'div',
                      { class: 'flex justify-end mb-1' },
                      [
                        g(
                          'span',
                          { class: 'text-lg leading-none invisible' },
                          '×',
                        ),
                      ],
                      -1,
                    )),
                  g(
                    'button',
                    {
                      onClick: f[1] || (f[1] = (p) => u.$emit('add')),
                      class:
                        'w-full aspect-[2/3] border-2 border-dashed border-border hover:border-ink-lighter focus:border-ink-lighter transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group focus:outline-none',
                    },
                    [
                      ...(f[5] ||
                        (f[5] = [
                          g(
                            'span',
                            {
                              class:
                                'text-3xl text-ink-lighter group-hover:text-ink group-focus:text-ink transition-colors leading-none',
                            },
                            ' + ',
                            -1,
                          ),
                          g(
                            'span',
                            {
                              class:
                                'text-xs uppercase tracking-widest text-ink-lighter group-hover:text-ink group-focus:text-ink transition-colors font-medium',
                            },
                            ' Add Film ',
                            -1,
                          ),
                        ])),
                    ],
                  ),
                ]),
              ],
              512,
            ),
            o.value
              ? (E(),
                $(
                  'button',
                  {
                    'key': 1,
                    'onClick': f[2] || (f[2] = (p) => a(1)),
                    'class':
                      'absolute right-0 top-0 bottom-0 z-10 w-10 flex items-start pt-36 justify-center bg-gradient-to-l from-cream to-transparent cursor-pointer',
                    'aria-label': 'Scroll right',
                  },
                  [
                    ...(f[7] ||
                      (f[7] = [
                        g(
                          'svg',
                          {
                            'class': 'w-5 h-5 text-ink',
                            'viewBox': '0 0 16 16',
                            'fill': 'none',
                            'stroke': 'currentColor',
                            'stroke-width': '2',
                          },
                          [g('path', { d: 'M6 3l5 5-5 5' })],
                          -1,
                        ),
                      ])),
                  ],
                ))
              : ne('', !0),
          ])
        )
      );
    },
  };
function D(e, t, s) {
  return (
    (t = Zd(t)) in e
      ? Object.defineProperty(e, t, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = s),
    e
  );
}
function Qd(e, t) {
  if (typeof e != 'object' || !e) return e;
  var s = e[Symbol.toPrimitive];
  if (s !== void 0) {
    var i = s.call(e, t);
    if (typeof i != 'object') return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(e);
}
function Zd(e) {
  var t = Qd(e, 'string');
  return typeof t == 'symbol' ? t : t + '';
}
function ef(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function eo(e, t) {
  for (var s = 0; s < t.length; s++) {
    var i = t[s];
    ((i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      'value' in i && (i.writable = !0),
      Object.defineProperty(e, i.key, i));
  }
}
function tf(e, t, s) {
  return (t && eo(e.prototype, t), s && eo(e, s), e);
}
function sf(e, t, s) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = s),
    e
  );
}
function to(e, t) {
  var s = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    (t &&
      (i = i.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      s.push.apply(s, i));
  }
  return s;
}
function so(e) {
  for (var t = 1; t < arguments.length; t++) {
    var s = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? to(Object(s), !0).forEach(function (i) {
          sf(e, i, s[i]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s))
        : to(Object(s)).forEach(function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(s, i));
          });
  }
  return e;
}
var io = { addCSS: !0, thumbWidth: 15, watch: !0 };
function nf(e, t) {
  return function () {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }.call(e, t);
}
function rf(e, t) {
  if (e && t) {
    var s = new Event(t, { bubbles: !0 });
    e.dispatchEvent(s);
  }
}
var Ws = function (e) {
    return e != null ? e.constructor : null;
  },
  tr = function (e, t) {
    return !!(e && t && e instanceof t);
  },
  Ml = function (e) {
    return e == null;
  },
  $l = function (e) {
    return Ws(e) === Object;
  },
  of = function (e) {
    return Ws(e) === Number && !Number.isNaN(e);
  },
  Pl = function (e) {
    return Ws(e) === String;
  },
  lf = function (e) {
    return Ws(e) === Boolean;
  },
  af = function (e) {
    return Ws(e) === Function;
  },
  Nl = function (e) {
    return Array.isArray(e);
  },
  Ll = function (e) {
    return tr(e, NodeList);
  },
  cf = function (e) {
    return tr(e, Element);
  },
  uf = function (e) {
    return tr(e, Event);
  },
  df = function (e) {
    return (
      Ml(e) ||
      ((Pl(e) || Nl(e) || Ll(e)) && !e.length) ||
      ($l(e) && !Object.keys(e).length)
    );
  },
  Oe = {
    nullOrUndefined: Ml,
    object: $l,
    number: of,
    string: Pl,
    boolean: lf,
    function: af,
    array: Nl,
    nodeList: Ll,
    element: cf,
    event: uf,
    empty: df,
  };
function ff(e) {
  var t = ''.concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
}
function hf(e, t) {
  if (1 > t) {
    var s = ff(t);
    return parseFloat(e.toFixed(s));
  }
  return Math.round(e / t) * t;
}
var pf = (function () {
  function e(t, s) {
    (ef(this, e),
      Oe.element(t)
        ? (this.element = t)
        : Oe.string(t) && (this.element = document.querySelector(t)),
      Oe.element(this.element) &&
        Oe.empty(this.element.rangeTouch) &&
        ((this.config = so({}, io, {}, s)), this.init()));
  }
  return (
    tf(
      e,
      [
        {
          key: 'init',
          value: function () {
            e.enabled &&
              (this.config.addCSS &&
                ((this.element.style.userSelect = 'none'),
                (this.element.style.webKitUserSelect = 'none'),
                (this.element.style.touchAction = 'manipulation')),
              this.listeners(!0),
              (this.element.rangeTouch = this));
          },
        },
        {
          key: 'destroy',
          value: function () {
            e.enabled &&
              (this.config.addCSS &&
                ((this.element.style.userSelect = ''),
                (this.element.style.webKitUserSelect = ''),
                (this.element.style.touchAction = '')),
              this.listeners(!1),
              (this.element.rangeTouch = null));
          },
        },
        {
          key: 'listeners',
          value: function (t) {
            var s = this,
              i = t ? 'addEventListener' : 'removeEventListener';
            ['touchstart', 'touchmove', 'touchend'].forEach(function (n) {
              s.element[i](
                n,
                function (r) {
                  return s.set(r);
                },
                !1,
              );
            });
          },
        },
        {
          key: 'get',
          value: function (t) {
            if (!e.enabled || !Oe.event(t)) return null;
            var s,
              i = t.target,
              n = t.changedTouches[0],
              r = parseFloat(i.getAttribute('min')) || 0,
              o = parseFloat(i.getAttribute('max')) || 100,
              l = parseFloat(i.getAttribute('step')) || 1,
              a = i.getBoundingClientRect(),
              c = ((100 / a.width) * (this.config.thumbWidth / 2)) / 100;
            return (
              0 > (s = (100 / a.width) * (n.clientX - a.left))
                ? (s = 0)
                : 100 < s && (s = 100),
              50 > s
                ? (s -= (100 - 2 * s) * c)
                : 50 < s && (s += 2 * (s - 50) * c),
              r + hf((s / 100) * (o - r), l)
            );
          },
        },
        {
          key: 'set',
          value: function (t) {
            e.enabled &&
              Oe.event(t) &&
              !t.target.disabled &&
              (t.preventDefault(),
              (t.target.value = this.get(t)),
              rf(t.target, t.type === 'touchend' ? 'change' : 'input'));
          },
        },
      ],
      [
        {
          key: 'setup',
          value: function (t) {
            var s =
                1 < arguments.length && arguments[1] !== void 0
                  ? arguments[1]
                  : {},
              i = null;
            if (
              (Oe.empty(t) || Oe.string(t)
                ? (i = Array.from(
                    document.querySelectorAll(
                      Oe.string(t) ? t : 'input[type="range"]',
                    ),
                  ))
                : Oe.element(t)
                  ? (i = [t])
                  : Oe.nodeList(t)
                    ? (i = Array.from(t))
                    : Oe.array(t) && (i = t.filter(Oe.element)),
              Oe.empty(i))
            )
              return null;
            var n = so({}, io, {}, s);
            if (Oe.string(t) && n.watch) {
              var r = new MutationObserver(function (o) {
                Array.from(o).forEach(function (l) {
                  Array.from(l.addedNodes).forEach(function (a) {
                    Oe.element(a) && nf(a, t) && new e(a, n);
                  });
                });
              });
              r.observe(document.body, { childList: !0, subtree: !0 });
            }
            return i.map(function (o) {
              return new e(o, s);
            });
          },
        },
        {
          key: 'enabled',
          get: function () {
            return 'ontouchstart' in document.documentElement;
          },
        },
      ],
    ),
    e
  );
})();
const zs = (e) => (e !== null && typeof e < 'u' ? e.constructor : null),
  Nt = (e, t) => !!(e && t && e instanceof t),
  sr = (e) => e === null || typeof e > 'u',
  Il = (e) => zs(e) === Object,
  mf = (e) => zs(e) === Number && !Number.isNaN(e),
  Vi = (e) => zs(e) === String,
  gf = (e) => zs(e) === Boolean,
  Ol = (e) => typeof e == 'function',
  Dl = (e) => Array.isArray(e),
  bf = (e) => Nt(e, WeakMap),
  Rl = (e) => Nt(e, NodeList),
  yf = (e) => zs(e) === Text,
  vf = (e) => Nt(e, Event),
  wf = (e) => Nt(e, KeyboardEvent),
  xf = (e) => Nt(e, window.TextTrackCue) || Nt(e, window.VTTCue),
  kf = (e) => Nt(e, TextTrack) || (!sr(e) && Vi(e.kind)),
  Tf = (e) => Nt(e, Promise) && Ol(e.then);
function _f(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    e.nodeType === 1 &&
    typeof e.style == 'object' &&
    typeof e.ownerDocument == 'object'
  );
}
function Fl(e) {
  return (
    sr(e) ||
    ((Vi(e) || Dl(e) || Rl(e)) && !e.length) ||
    (Il(e) && !Object.keys(e).length)
  );
}
function Cf(e) {
  if (Nt(e, window.URL)) return !0;
  if (!Vi(e)) return !1;
  let t = e;
  (!e.startsWith('http://') || !e.startsWith('https://')) &&
    (t = `http://${e}`);
  try {
    return !Fl(new URL(t).hostname);
  } catch {
    return !1;
  }
}
var d = {
  nullOrUndefined: sr,
  object: Il,
  number: mf,
  string: Vi,
  boolean: gf,
  function: Ol,
  array: Dl,
  weakMap: bf,
  nodeList: Rl,
  element: _f,
  textNode: yf,
  event: vf,
  keyboardEvent: wf,
  cue: xf,
  track: kf,
  promise: Tf,
  url: Cf,
  empty: Fl,
};
const En = (() => {
  const e = document.createElement('span'),
    t = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend',
    },
    s = Object.keys(t).find((i) => e.style[i] !== void 0);
  return d.string(s) ? t[s] : !1;
})();
function jl(e, t) {
  setTimeout(() => {
    try {
      ((e.hidden = !0), e.offsetHeight, (e.hidden = !1));
    } catch {}
  }, t);
}
function Sf(e) {
  return JSON.parse(JSON.stringify(e));
}
function Hl(e, t) {
  return t.split('.').reduce((s, i) => s && s[i], e);
}
function Se(e = {}, ...t) {
  if (!t.length) return e;
  const s = t.shift();
  return d.object(s)
    ? (Object.keys(s).forEach((i) => {
        d.object(s[i])
          ? (Object.keys(e).includes(i) || Object.assign(e, { [i]: {} }),
            Se(e[i], s[i]))
          : Object.assign(e, { [i]: s[i] });
      }),
      Se(e, ...t))
    : e;
}
function Bl(e, t) {
  const s = e.length ? e : [e];
  Array.from(s)
    .reverse()
    .forEach((i, n) => {
      const r = n > 0 ? t.cloneNode(!0) : t,
        o = i.parentNode,
        l = i.nextSibling;
      (r.appendChild(i), l ? o.insertBefore(r, l) : o.appendChild(r));
    });
}
function Mn(e, t) {
  !d.element(e) ||
    d.empty(t) ||
    Object.entries(t)
      .filter(([, s]) => !d.nullOrUndefined(s))
      .forEach(([s, i]) => e.setAttribute(s, i));
}
function J(e, t, s) {
  const i = document.createElement(e);
  return (d.object(t) && Mn(i, t), d.string(s) && (i.textContent = s), i);
}
function Af(e, t) {
  !d.element(e) || !d.element(t) || t.parentNode.insertBefore(e, t.nextSibling);
}
function no(e, t, s, i) {
  d.element(t) && t.appendChild(J(e, s, i));
}
function Et(e) {
  if (d.nodeList(e) || d.array(e)) {
    Array.from(e).forEach(Et);
    return;
  }
  !d.element(e) || !d.element(e.parentNode) || e.parentNode.removeChild(e);
}
function ai(e) {
  if (!d.element(e)) return;
  let { length: t } = e.childNodes;
  for (; t > 0; ) (e.removeChild(e.lastChild), (t -= 1));
}
function Ti(e, t) {
  return !d.element(t) || !d.element(t.parentNode) || !d.element(e)
    ? null
    : (t.parentNode.replaceChild(e, t), e);
}
function ht(e, t) {
  if (!d.string(e) || d.empty(e)) return {};
  const s = {},
    i = Se({}, t);
  return (
    e.split(',').forEach((n) => {
      const r = n.trim(),
        o = r.replace('.', ''),
        a = r.replace(/[[\]]/g, '').split('='),
        [c] = a,
        u = a.length > 1 ? a[1].replace(/["']/g, '') : '';
      switch (r.charAt(0)) {
        case '.':
          d.string(i.class) ? (s.class = `${i.class} ${o}`) : (s.class = o);
          break;
        case '#':
          s.id = r.replace('#', '');
          break;
        case '[':
          s[c] = u;
          break;
      }
    }),
    Se(i, s)
  );
}
function Yt(e, t) {
  if (!d.element(e)) return;
  let s = t;
  (d.boolean(s) || (s = !e.hidden), (e.hidden = s));
}
function de(e, t, s) {
  if (d.nodeList(e)) return Array.from(e).map((i) => de(i, t, s));
  if (d.element(e)) {
    let i = 'toggle';
    return (
      typeof s < 'u' && (i = s ? 'add' : 'remove'),
      e.classList[i](t),
      e.classList.contains(t)
    );
  }
  return !1;
}
function _i(e, t) {
  return d.element(e) && e.classList.contains(t);
}
function Qt(e, t) {
  const { prototype: s } = Element;
  function i() {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }
  return (
    s.matches ||
    s.webkitMatchesSelector ||
    s.mozMatchesSelector ||
    s.msMatchesSelector ||
    i
  ).call(e, t);
}
function Ef(e, t) {
  const { prototype: s } = Element;
  function i() {
    let r = this;
    do {
      if (Qt.matches(r, t)) return r;
      r = r.parentElement || r.parentNode;
    } while (r !== null && r.nodeType === 1);
    return null;
  }
  return (s.closest || i).call(e, t);
}
function Fs(e) {
  return this.elements.container.querySelectorAll(e);
}
function Ee(e) {
  return this.elements.container.querySelector(e);
}
function an(e = null, t = !1) {
  d.element(e) && e.focus({ preventScroll: !0, focusVisible: t });
}
const ro = {
    'audio/ogg': 'vorbis',
    'audio/wav': '1',
    'video/webm': 'vp8, vorbis',
    'video/mp4': 'avc1.42E01E, mp4a.40.2',
    'video/ogg': 'theora',
  },
  Ae = {
    audio: 'canPlayType' in document.createElement('audio'),
    video: 'canPlayType' in document.createElement('video'),
    check(e, t) {
      const s = Ae[e] || t !== 'html5',
        i = s && Ae.rangeInput;
      return { api: s, ui: i };
    },
    pip:
      document.pictureInPictureEnabled && !J('video').disablePictureInPicture,
    airplay: d.function(window.WebKitPlaybackTargetAvailabilityEvent),
    playsinline: 'playsInline' in document.createElement('video'),
    mime(e) {
      if (d.empty(e)) return !1;
      const [t] = e.split('/');
      let s = e;
      if (!this.isHTML5 || t !== this.type) return !1;
      Object.keys(ro).includes(s) && (s += `; codecs="${ro[e]}"`);
      try {
        return !!(s && this.media.canPlayType(s).replace(/no/, ''));
      } catch {
        return !1;
      }
    },
    textTracks: 'textTracks' in document.createElement('video'),
    rangeInput: (() => {
      const e = document.createElement('input');
      return ((e.type = 'range'), e.type === 'range');
    })(),
    touch: 'ontouchstart' in document.documentElement,
    transitions: En !== !1,
    reducedMotion:
      'matchMedia' in window &&
      window.matchMedia('(prefers-reduced-motion)').matches,
  },
  Mf = (() => {
    let e = !1;
    try {
      const t = Object.defineProperty({}, 'passive', {
        get() {
          return ((e = !0), null);
        },
      });
      (window.addEventListener('test', null, t),
        window.removeEventListener('test', null, t));
    } catch {}
    return e;
  })();
function js(e, t, s, i = !1, n = !0, r = !1) {
  if (!e || !('addEventListener' in e) || d.empty(t) || !d.function(s)) return;
  const o = t.split(' ');
  let l = r;
  (Mf && (l = { passive: n, capture: r }),
    o.forEach((a) => {
      (this &&
        this.eventListeners &&
        i &&
        this.eventListeners.push({
          element: e,
          type: a,
          callback: s,
          options: l,
        }),
        e[i ? 'addEventListener' : 'removeEventListener'](a, s, l));
    }));
}
function le(e, t = '', s, i = !0, n = !1) {
  js.call(this, e, t, s, !0, i, n);
}
function Ui(e, t = '', s, i = !0, n = !1) {
  js.call(this, e, t, s, !1, i, n);
}
function ir(e, t = '', s, i = !0, n = !1) {
  const r = (...o) => {
    (Ui(e, t, r, i, n), s.apply(this, o));
  };
  js.call(this, e, t, r, !0, i, n);
}
function X(e, t = '', s = !1, i = {}) {
  if (!d.element(e) || d.empty(t)) return;
  const n = new CustomEvent(t, { bubbles: s, detail: { ...i, plyr: this } });
  e.dispatchEvent(n);
}
function $f() {
  this &&
    this.eventListeners &&
    (this.eventListeners.forEach((e) => {
      const { element: t, type: s, callback: i, options: n } = e;
      t.removeEventListener(s, i, n);
    }),
    (this.eventListeners = []));
}
function Pf() {
  return new Promise((e) =>
    this.ready
      ? setTimeout(e, 0)
      : le.call(this, this.elements.container, 'ready', e),
  ).then(() => {});
}
function gt(e) {
  d.promise(e) && e.then(null, () => {});
}
function $n(e) {
  return d.array(e) ? e.filter((t, s) => e.indexOf(t) === s) : e;
}
function Vl(e, t) {
  return !d.array(e) || !e.length
    ? null
    : e.reduce((s, i) => (Math.abs(i - t) < Math.abs(s - t) ? i : s));
}
function Ul(e) {
  return !window || !window.CSS ? !1 : window.CSS.supports(e);
}
const oo = [
  [1, 1],
  [4, 3],
  [3, 4],
  [5, 4],
  [4, 5],
  [3, 2],
  [2, 3],
  [16, 10],
  [10, 16],
  [16, 9],
  [9, 16],
  [21, 9],
  [9, 21],
  [32, 9],
  [9, 32],
].reduce((e, [t, s]) => ({ ...e, [t / s]: [t, s] }), {});
function ql(e) {
  return !d.array(e) && (!d.string(e) || !e.includes(':'))
    ? !1
    : (d.array(e) ? e : e.split(':')).map(Number).every(d.number);
}
function Ci(e) {
  if (!d.array(e) || !e.every(d.number)) return null;
  const [t, s] = e,
    i = (r, o) => (o === 0 ? r : i(o, r % o)),
    n = i(t, s);
  return [t / n, s / n];
}
function nr(e) {
  const t = (i) => (ql(i) ? i.split(':').map(Number) : null);
  let s = t(e);
  if (
    (s === null && (s = t(this.config.ratio)),
    s === null &&
      !d.empty(this.embed) &&
      d.array(this.embed.ratio) &&
      ({ ratio: s } = this.embed),
    s === null && this.isHTML5)
  ) {
    const { videoWidth: i, videoHeight: n } = this.media;
    s = [i, n];
  }
  return Ci(s);
}
function hs(e) {
  if (!this.isVideo) return {};
  const { wrapper: t } = this.elements,
    s = nr.call(this, e);
  if (!d.array(s)) return {};
  const [i, n] = Ci(s),
    r = Ul(`aspect-ratio: ${i}/${n}`),
    o = (100 / i) * n;
  if (
    (r
      ? (t.style.aspectRatio = `${i}/${n}`)
      : (t.style.paddingBottom = `${o}%`),
    this.isVimeo && !this.config.vimeo.premium && this.supported.ui)
  ) {
    const l =
        (100 / this.media.offsetWidth) *
        Number.parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
      a = (l - o) / (l / 50);
    this.fullscreen.active
      ? (t.style.paddingBottom = null)
      : (this.media.style.transform = `translateY(-${a}%)`);
  } else
    this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);
  return { padding: o, ratio: s };
}
function Kl(e, t, s = 0.05) {
  const i = e / t,
    n = Vl(Object.keys(oo), i);
  return Math.abs(n - i) <= s ? oo[n] : [e, t];
}
function Nf() {
  const e = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    ),
    t = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0,
    );
  return [e, t];
}
const Ft = {
    getSources() {
      return this.isHTML5
        ? Array.from(this.media.querySelectorAll('source')).filter((t) => {
            const s = t.getAttribute('type');
            return d.empty(s) ? !0 : Ae.mime.call(this, s);
          })
        : [];
    },
    getQualityOptions() {
      return this.config.quality.forced
        ? this.config.quality.options
        : Ft.getSources
            .call(this)
            .map((e) => Number(e.getAttribute('size')))
            .filter(Boolean);
    },
    setup() {
      if (!this.isHTML5) return;
      const e = this;
      ((e.options.speed = e.config.speed.options),
        d.empty(this.config.ratio) || hs.call(e),
        Object.defineProperty(e.media, 'quality', {
          get() {
            const s = Ft.getSources
              .call(e)
              .find((i) => i.getAttribute('src') === e.source);
            return s && Number(s.getAttribute('size'));
          },
          set(t) {
            if (e.quality !== t) {
              if (
                e.config.quality.forced &&
                d.function(e.config.quality.onChange)
              )
                e.config.quality.onChange(t);
              else {
                const i = Ft.getSources
                  .call(e)
                  .find((c) => Number(c.getAttribute('size')) === t);
                if (!i) return;
                const {
                  currentTime: n,
                  paused: r,
                  preload: o,
                  readyState: l,
                  playbackRate: a,
                } = e.media;
                ((e.media.src = i.getAttribute('src')),
                  (o !== 'none' || l) &&
                    (e.once('loadedmetadata', () => {
                      ((e.speed = a), (e.currentTime = n), r || gt(e.play()));
                    }),
                    e.media.load()));
              }
              X.call(e, e.media, 'qualitychange', !1, { quality: t });
            }
          },
        }));
    },
    cancelRequests() {
      this.isHTML5 &&
        (Et(Ft.getSources.call(this)),
        this.media.setAttribute('src', this.config.blankVideo),
        this.media.load(),
        this.debug.log('Cancelled network requests'));
    },
  },
  Lf = !!window.document.documentMode,
  If = /Edge/.test(navigator.userAgent),
  Of =
    'WebkitAppearance' in document.documentElement.style &&
    !/Edge/.test(navigator.userAgent),
  Df = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1,
  Rf =
    /iPad|iPhone|iPod/i.test(navigator.userAgent) &&
    navigator.maxTouchPoints > 1;
var Ie = { isIE: Lf, isEdge: If, isWebKit: Of, isIPadOS: Df, isIos: Rf };
function Ff(e) {
  return `${e}-${Math.floor(Math.random() * 1e4)}`;
}
function Pn(e, ...t) {
  return d.empty(e)
    ? e
    : e.toString().replace(/\{(\d+)\}/g, (s, i) => t[i].toString());
}
function jf(e, t) {
  return e === 0 || t === 0 || Number.isNaN(e) || Number.isNaN(t)
    ? 0
    : ((e / t) * 100).toFixed(2);
}
function $s(e = '', t = '', s = '') {
  return e.replace(
    new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'), 'g'),
    s.toString(),
  );
}
function Wl(e = '') {
  return e
    .toString()
    .replace(
      /\w\S*/g,
      (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
    );
}
function Hf(e = '') {
  let t = e.toString();
  return (
    (t = $s(t, '-', ' ')),
    (t = $s(t, '_', ' ')),
    (t = Wl(t)),
    $s(t, ' ', '')
  );
}
function Bf(e = '') {
  let t = e.toString();
  return ((t = Hf(t)), t.charAt(0).toLowerCase() + t.slice(1));
}
function Vf(e) {
  const t = document.createDocumentFragment(),
    s = document.createElement('div');
  return (t.appendChild(s), (s.innerHTML = e), t.firstChild.textContent);
}
function Uf(e) {
  const t = document.createElement('div');
  return (t.appendChild(e), t.innerHTML);
}
const lo = {
    pip: 'PIP',
    airplay: 'AirPlay',
    html5: 'HTML5',
    vimeo: 'Vimeo',
    youtube: 'YouTube',
  },
  $e = {
    get(e = '', t = {}) {
      if (d.empty(e) || d.empty(t)) return '';
      let s = Hl(t.i18n, e);
      if (d.empty(s)) return Object.keys(lo).includes(e) ? lo[e] : '';
      const i = { '{seektime}': t.seekTime, '{title}': t.title };
      return (
        Object.entries(i).forEach(([n, r]) => {
          s = $s(s, n, r);
        }),
        s
      );
    },
  };
class Hs {
  constructor(t) {
    (D(this, 'get', (s) => {
      if (!Hs.supported || !this.enabled) return null;
      const i = window.localStorage.getItem(this.key);
      if (d.empty(i)) return null;
      const n = JSON.parse(i);
      return d.string(s) && s.length ? n[s] : n;
    }),
      D(this, 'set', (s) => {
        if (!Hs.supported || !this.enabled || !d.object(s)) return;
        let i = this.get();
        (d.empty(i) && (i = {}), Se(i, s));
        try {
          window.localStorage.setItem(this.key, JSON.stringify(i));
        } catch {}
      }),
      (this.enabled = t.config.storage.enabled),
      (this.key = t.config.storage.key));
  }
  static get supported() {
    try {
      if (!('localStorage' in window)) return !1;
      const t = '___test';
      return (
        window.localStorage.setItem(t, t),
        window.localStorage.removeItem(t),
        !0
      );
    } catch {
      return !1;
    }
  }
}
function Ys(e, t = 'text', s = !1) {
  return new Promise((i, n) => {
    try {
      const r = new XMLHttpRequest();
      if (!('withCredentials' in r)) return;
      (s && (r.withCredentials = !0),
        r.addEventListener('load', () => {
          if (t === 'text')
            try {
              i(JSON.parse(r.responseText));
            } catch {
              i(r.responseText);
            }
          else i(r.response);
        }),
        r.addEventListener('error', () => {
          throw new Error(r.status);
        }),
        r.open('GET', e, !0),
        (r.responseType = t),
        r.send());
    } catch (r) {
      n(r);
    }
  });
}
function zl(e, t) {
  if (!d.string(e)) return;
  const s = 'cache',
    i = d.string(t);
  let n = !1;
  const r = () => document.getElementById(t) !== null,
    o = (l, a) => {
      ((l.innerHTML = a),
        !(i && r()) && document.body.insertAdjacentElement('afterbegin', l));
    };
  if (!i || !r()) {
    const l = Hs.supported,
      a = document.createElement('div');
    if ((a.setAttribute('hidden', ''), i && a.setAttribute('id', t), l)) {
      const c = window.localStorage.getItem(`${s}-${t}`);
      if (((n = c !== null), n)) {
        const u = JSON.parse(c);
        o(a, u.content);
      }
    }
    Ys(e)
      .then((c) => {
        if (!d.empty(c)) {
          if (l)
            try {
              window.localStorage.setItem(
                `${s}-${t}`,
                JSON.stringify({ content: c }),
              );
            } catch {}
          o(a, c);
        }
      })
      .catch(() => {});
  }
}
const Yl = (e) => Math.trunc((e / 60 / 60) % 60, 10),
  qf = (e) => Math.trunc((e / 60) % 60, 10),
  Kf = (e) => Math.trunc(e % 60, 10);
function qi(e = 0, t = !1, s = !1) {
  if (!d.number(e)) return qi(void 0, t, s);
  const i = (l) => `0${l}`.slice(-2);
  let n = Yl(e);
  const r = qf(e),
    o = Kf(e);
  return (
    t || n > 0 ? (n = `${n}:`) : (n = ''),
    `${s && e > 0 ? '-' : ''}${n}${i(r)}:${i(o)}`
  );
}
const I = {
  getIconUrl() {
    const e = new URL(this.config.iconUrl, window.location),
      t = window.location.host
        ? window.location.host
        : window.top.location.host,
      s = e.host !== t || (Ie.isIE && !window.svg4everybody);
    return { url: this.config.iconUrl, cors: s };
  },
  findElements() {
    try {
      return (
        (this.elements.controls = Ee.call(
          this,
          this.config.selectors.controls.wrapper,
        )),
        (this.elements.buttons = {
          play: Fs.call(this, this.config.selectors.buttons.play),
          pause: Ee.call(this, this.config.selectors.buttons.pause),
          restart: Ee.call(this, this.config.selectors.buttons.restart),
          rewind: Ee.call(this, this.config.selectors.buttons.rewind),
          fastForward: Ee.call(this, this.config.selectors.buttons.fastForward),
          mute: Ee.call(this, this.config.selectors.buttons.mute),
          pip: Ee.call(this, this.config.selectors.buttons.pip),
          airplay: Ee.call(this, this.config.selectors.buttons.airplay),
          settings: Ee.call(this, this.config.selectors.buttons.settings),
          captions: Ee.call(this, this.config.selectors.buttons.captions),
          fullscreen: Ee.call(this, this.config.selectors.buttons.fullscreen),
        }),
        (this.elements.progress = Ee.call(
          this,
          this.config.selectors.progress,
        )),
        (this.elements.inputs = {
          seek: Ee.call(this, this.config.selectors.inputs.seek),
          volume: Ee.call(this, this.config.selectors.inputs.volume),
        }),
        (this.elements.display = {
          buffer: Ee.call(this, this.config.selectors.display.buffer),
          currentTime: Ee.call(this, this.config.selectors.display.currentTime),
          duration: Ee.call(this, this.config.selectors.display.duration),
        }),
        d.element(this.elements.progress) &&
          (this.elements.display.seekTooltip =
            this.elements.progress.querySelector(
              `.${this.config.classNames.tooltip}`,
            )),
        !0
      );
    } catch (e) {
      return (
        this.debug.warn(
          'It looks like there is a problem with your custom controls HTML',
          e,
        ),
        this.toggleNativeControls(!0),
        !1
      );
    }
  },
  createIcon(e, t) {
    const s = 'http://www.w3.org/2000/svg',
      i = I.getIconUrl.call(this),
      n = `${i.cors ? '' : i.url}#${this.config.iconPrefix}`,
      r = document.createElementNS(s, 'svg');
    Mn(r, Se(t, { 'aria-hidden': 'true', 'focusable': 'false' }));
    const o = document.createElementNS(s, 'use'),
      l = `${n}-${e}`;
    return (
      'href' in o &&
        o.setAttributeNS('http://www.w3.org/1999/xlink', 'href', l),
      o.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l),
      r.appendChild(o),
      r
    );
  },
  createLabel(e, t = {}) {
    const s = $e.get(e, this.config),
      i = {
        ...t,
        class: [t.class, this.config.classNames.hidden]
          .filter(Boolean)
          .join(' '),
      };
    return J('span', i, s);
  },
  createBadge(e) {
    if (d.empty(e)) return null;
    const t = J('span', { class: this.config.classNames.menu.value });
    return (
      t.appendChild(J('span', { class: this.config.classNames.menu.badge }, e)),
      t
    );
  },
  createButton(e, t) {
    const s = Se({}, t);
    let i = Bf(e);
    const n = {
      element: 'button',
      toggle: !1,
      label: null,
      icon: null,
      labelPressed: null,
      iconPressed: null,
    };
    switch (
      (['element', 'icon', 'label'].forEach((o) => {
        Object.keys(s).includes(o) && ((n[o] = s[o]), delete s[o]);
      }),
      n.element === 'button' &&
        !Object.keys(s).includes('type') &&
        (s.type = 'button'),
      Object.keys(s).includes('class')
        ? s.class.split(' ').includes(this.config.classNames.control) ||
          Se(s, { class: `${s.class} ${this.config.classNames.control}` })
        : (s.class = this.config.classNames.control),
      e)
    ) {
      case 'play':
        ((n.toggle = !0),
          (n.label = 'play'),
          (n.labelPressed = 'pause'),
          (n.icon = 'play'),
          (n.iconPressed = 'pause'));
        break;
      case 'mute':
        ((n.toggle = !0),
          (n.label = 'mute'),
          (n.labelPressed = 'unmute'),
          (n.icon = 'volume'),
          (n.iconPressed = 'muted'));
        break;
      case 'captions':
        ((n.toggle = !0),
          (n.label = 'enableCaptions'),
          (n.labelPressed = 'disableCaptions'),
          (n.icon = 'captions-off'),
          (n.iconPressed = 'captions-on'));
        break;
      case 'fullscreen':
        ((n.toggle = !0),
          (n.label = 'enterFullscreen'),
          (n.labelPressed = 'exitFullscreen'),
          (n.icon = 'enter-fullscreen'),
          (n.iconPressed = 'exit-fullscreen'));
        break;
      case 'play-large':
        ((s.class += ` ${this.config.classNames.control}--overlaid`),
          (i = 'play'),
          (n.label = 'play'),
          (n.icon = 'play'));
        break;
      default:
        (d.empty(n.label) && (n.label = i), d.empty(n.icon) && (n.icon = e));
    }
    const r = J(n.element);
    return (
      n.toggle
        ? (r.appendChild(
            I.createIcon.call(this, n.iconPressed, { class: 'icon--pressed' }),
          ),
          r.appendChild(
            I.createIcon.call(this, n.icon, { class: 'icon--not-pressed' }),
          ),
          r.appendChild(
            I.createLabel.call(this, n.labelPressed, {
              class: 'label--pressed',
            }),
          ),
          r.appendChild(
            I.createLabel.call(this, n.label, { class: 'label--not-pressed' }),
          ))
        : (r.appendChild(I.createIcon.call(this, n.icon)),
          r.appendChild(I.createLabel.call(this, n.label))),
      Se(s, ht(this.config.selectors.buttons[i], s)),
      Mn(r, s),
      i === 'play'
        ? (d.array(this.elements.buttons[i]) || (this.elements.buttons[i] = []),
          this.elements.buttons[i].push(r))
        : (this.elements.buttons[i] = r),
      r
    );
  },
  createRange(e, t) {
    const s = J(
      'input',
      Se(
        ht(this.config.selectors.inputs[e]),
        {
          'type': 'range',
          'min': 0,
          'max': 100,
          'step': 0.01,
          'value': 0,
          'autocomplete': 'off',
          'role': 'slider',
          'aria-label': $e.get(e, this.config),
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          'aria-valuenow': 0,
        },
        t,
      ),
    );
    return (
      (this.elements.inputs[e] = s),
      I.updateRangeFill.call(this, s),
      pf.setup(s),
      s
    );
  },
  createProgress(e, t) {
    const s = J(
      'progress',
      Se(
        ht(this.config.selectors.display[e]),
        {
          'min': 0,
          'max': 100,
          'value': 0,
          'role': 'progressbar',
          'aria-hidden': !0,
        },
        t,
      ),
    );
    if (e !== 'volume') {
      s.appendChild(J('span', null, '0'));
      const i = { played: 'played', buffer: 'buffered' }[e],
        n = i ? $e.get(i, this.config) : '';
      s.textContent = `% ${n.toLowerCase()}`;
    }
    return ((this.elements.display[e] = s), s);
  },
  createTime(e, t) {
    const s = ht(this.config.selectors.display[e], t),
      i = J(
        'div',
        Se(s, {
          'class':
            `${s.class ? s.class : ''} ${this.config.classNames.display.time} `.trim(),
          'aria-label': $e.get(e, this.config),
          'role': 'timer',
        }),
        '00:00',
      );
    return ((this.elements.display[e] = i), i);
  },
  bindMenuItemShortcuts(e, t) {
    (le.call(
      this,
      e,
      'keydown keyup',
      (s) => {
        if (
          ![' ', 'ArrowUp', 'ArrowDown', 'ArrowRight'].includes(s.key) ||
          (s.preventDefault(), s.stopPropagation(), s.type === 'keydown')
        )
          return;
        const i = Qt(e, '[role="menuitemradio"]');
        if (!i && [' ', 'ArrowRight'].includes(s.key))
          I.showMenuPanel.call(this, t, !0);
        else {
          let n;
          s.key !== ' ' &&
            (s.key === 'ArrowDown' || (i && s.key === 'ArrowRight')
              ? ((n = e.nextElementSibling),
                d.element(n) || (n = e.parentNode.firstElementChild))
              : ((n = e.previousElementSibling),
                d.element(n) || (n = e.parentNode.lastElementChild)),
            an.call(this, n, !0));
        }
      },
      !1,
    ),
      le.call(this, e, 'keyup', (s) => {
        s.key === 'Return' && I.focusFirstMenuItem.call(this, null, !0);
      }));
  },
  createMenuItem({
    value: e,
    list: t,
    type: s,
    title: i,
    badge: n = null,
    checked: r = !1,
  }) {
    const o = ht(this.config.selectors.inputs[s]),
      l = J(
        'button',
        Se(o, {
          'type': 'button',
          'role': 'menuitemradio',
          'class':
            `${this.config.classNames.control} ${o.class ? o.class : ''}`.trim(),
          'aria-checked': r,
          'value': e,
        }),
      ),
      a = J('span');
    ((a.innerHTML = i),
      d.element(n) && a.appendChild(n),
      l.appendChild(a),
      Object.defineProperty(l, 'checked', {
        enumerable: !0,
        get() {
          return l.getAttribute('aria-checked') === 'true';
        },
        set(c) {
          (c &&
            Array.from(l.parentNode.children)
              .filter((u) => Qt(u, '[role="menuitemradio"]'))
              .forEach((u) => u.setAttribute('aria-checked', 'false')),
            l.setAttribute('aria-checked', c ? 'true' : 'false'));
        },
      }),
      this.listeners.bind(
        l,
        'click keyup',
        (c) => {
          if (!(d.keyboardEvent(c) && c.key !== ' ')) {
            switch (
              (c.preventDefault(), c.stopPropagation(), (l.checked = !0), s)
            ) {
              case 'language':
                this.currentTrack = Number(e);
                break;
              case 'quality':
                this.quality = e;
                break;
              case 'speed':
                this.speed = Number.parseFloat(e);
                break;
            }
            I.showMenuPanel.call(this, 'home', d.keyboardEvent(c));
          }
        },
        s,
        !1,
      ),
      I.bindMenuItemShortcuts.call(this, l, s),
      t.appendChild(l));
  },
  formatTime(e = 0, t = !1) {
    if (!d.number(e)) return e;
    const s = Yl(this.duration) > 0;
    return qi(e, s, t);
  },
  updateTimeDisplay(e = null, t = 0, s = !1) {
    !d.element(e) || !d.number(t) || (e.textContent = I.formatTime(t, s));
  },
  updateVolume() {
    this.supported.ui &&
      (d.element(this.elements.inputs.volume) &&
        I.setRange.call(
          this,
          this.elements.inputs.volume,
          this.muted ? 0 : this.volume,
        ),
      d.element(this.elements.buttons.mute) &&
        (this.elements.buttons.mute.pressed = this.muted || this.volume === 0));
  },
  setRange(e, t = 0) {
    d.element(e) && ((e.value = t), I.updateRangeFill.call(this, e));
  },
  updateProgress(e) {
    if (!this.supported.ui || !d.event(e)) return;
    let t = 0;
    const s = (i, n) => {
      const r = d.number(n) ? n : 0,
        o = d.element(i) ? i : this.elements.display.buffer;
      if (d.element(o)) {
        o.value = r;
        const l = o.getElementsByTagName('span')[0];
        d.element(l) && (l.childNodes[0].nodeValue = r);
      }
    };
    if (e)
      switch (e.type) {
        case 'timeupdate':
        case 'seeking':
        case 'seeked':
          ((t = jf(this.currentTime, this.duration)),
            e.type === 'timeupdate' &&
              I.setRange.call(this, this.elements.inputs.seek, t));
          break;
        case 'playing':
        case 'progress':
          s(this.elements.display.buffer, this.buffered * 100);
          break;
      }
  },
  updateRangeFill(e) {
    const t = d.event(e) ? e.target : e;
    if (!(!d.element(t) || t.getAttribute('type') !== 'range')) {
      if (Qt(t, this.config.selectors.inputs.seek)) {
        t.setAttribute('aria-valuenow', this.currentTime);
        const s = I.formatTime(this.currentTime),
          i = I.formatTime(this.duration),
          n = $e.get('seekLabel', this.config);
        t.setAttribute(
          'aria-valuetext',
          n.replace('{currentTime}', s).replace('{duration}', i),
        );
      } else if (Qt(t, this.config.selectors.inputs.volume)) {
        const s = t.value * 100;
        (t.setAttribute('aria-valuenow', s),
          t.setAttribute('aria-valuetext', `${s.toFixed(1)}%`));
      } else t.setAttribute('aria-valuenow', t.value);
      (!Ie.isWebKit && !Ie.isIPadOS) ||
        t.style.setProperty('--value', `${(t.value / t.max) * 100}%`);
    }
  },
  updateSeekTooltip(e) {
    var t, s;
    if (
      !this.config.tooltips.seek ||
      !d.element(this.elements.inputs.seek) ||
      !d.element(this.elements.display.seekTooltip) ||
      this.duration === 0
    )
      return;
    const i = this.elements.display.seekTooltip,
      n = `${this.config.classNames.tooltip}--visible`,
      r = (u) => de(i, n, u);
    if (this.touch) {
      r(!1);
      return;
    }
    let o = 0;
    const l = this.elements.progress.getBoundingClientRect();
    if (d.event(e)) {
      const u = e.pageX - e.clientX;
      o = (100 / l.width) * (e.pageX - l.left - u);
    } else if (_i(i, n)) o = Number.parseFloat(i.style.left, 10);
    else return;
    o < 0 ? (o = 0) : o > 100 && (o = 100);
    const a = (this.duration / 100) * o;
    i.textContent = I.formatTime(a);
    const c =
      (t = this.config.markers) === null ||
      t === void 0 ||
      (s = t.points) === null ||
      s === void 0
        ? void 0
        : s.find(({ time: u }) => u === Math.round(a));
    (c && i.insertAdjacentHTML('afterbegin', `${c.label}<br>`),
      (i.style.left = `${o}%`),
      d.event(e) &&
        ['mouseenter', 'mouseleave'].includes(e.type) &&
        r(e.type === 'mouseenter'));
  },
  timeUpdate(e) {
    const t =
      !d.element(this.elements.display.duration) && this.config.invertTime;
    (I.updateTimeDisplay.call(
      this,
      this.elements.display.currentTime,
      t ? this.duration - this.currentTime : this.currentTime,
      t,
    ),
      !(e && e.type === 'timeupdate' && this.media.seeking) &&
        I.updateProgress.call(this, e));
  },
  durationUpdate() {
    if (!this.supported.ui || (!this.config.invertTime && this.currentTime))
      return;
    if (this.duration >= 2 ** 32) {
      (Yt(this.elements.display.currentTime, !0),
        Yt(this.elements.progress, !0));
      return;
    }
    d.element(this.elements.inputs.seek) &&
      this.elements.inputs.seek.setAttribute('aria-valuemax', this.duration);
    const e = d.element(this.elements.display.duration);
    (!e &&
      this.config.displayDuration &&
      this.paused &&
      I.updateTimeDisplay.call(
        this,
        this.elements.display.currentTime,
        this.duration,
      ),
      e &&
        I.updateTimeDisplay.call(
          this,
          this.elements.display.duration,
          this.duration,
        ),
      this.config.markers.enabled && I.setMarkers.call(this),
      I.updateSeekTooltip.call(this));
  },
  toggleMenuButton(e, t) {
    Yt(this.elements.settings.buttons[e], !t);
  },
  updateSetting(e, t, s) {
    const i = this.elements.settings.panels[e];
    let n = null,
      r = t;
    if (e === 'captions') n = this.currentTrack;
    else {
      if (
        ((n = d.empty(s) ? this[e] : s),
        d.empty(n) && (n = this.config[e].default),
        !d.empty(this.options[e]) && !this.options[e].includes(n))
      ) {
        this.debug.warn(`Unsupported value of '${n}' for ${e}`);
        return;
      }
      if (!this.config[e].options.includes(n)) {
        this.debug.warn(`Disabled value of '${n}' for ${e}`);
        return;
      }
    }
    if (
      (d.element(r) || (r = i && i.querySelector('[role="menu"]')),
      !d.element(r))
    )
      return;
    const o = this.elements.settings.buttons[e].querySelector(
      `.${this.config.classNames.menu.value}`,
    );
    o.innerHTML = I.getLabel.call(this, e, n);
    const l = r && r.querySelector(`[value="${n}"]`);
    d.element(l) && (l.checked = !0);
  },
  getLabel(e, t) {
    switch (e) {
      case 'speed':
        return t === 1 ? $e.get('normal', this.config) : `${t}&times;`;
      case 'quality':
        if (d.number(t)) {
          const s = $e.get(`qualityLabel.${t}`, this.config);
          return s.length ? s : `${t}p`;
        }
        return Wl(t);
      case 'captions':
        return ae.getLabel.call(this);
      default:
        return null;
    }
  },
  setQualityMenu(e) {
    if (!d.element(this.elements.settings.panels.quality)) return;
    const t = 'quality',
      s = this.elements.settings.panels.quality.querySelector('[role="menu"]');
    d.array(e) &&
      (this.options.quality = $n(e).filter((r) =>
        this.config.quality.options.includes(r),
      ));
    const i = !d.empty(this.options.quality) && this.options.quality.length > 1;
    if (
      (I.toggleMenuButton.call(this, t, i), ai(s), I.checkMenu.call(this), !i)
    )
      return;
    const n = (r) => {
      const o = $e.get(`qualityBadge.${r}`, this.config);
      return o.length ? I.createBadge.call(this, o) : null;
    };
    (this.options.quality
      .sort((r, o) => {
        const l = this.config.quality.options;
        return l.indexOf(r) > l.indexOf(o) ? 1 : -1;
      })
      .forEach((r) => {
        I.createMenuItem.call(this, {
          value: r,
          list: s,
          type: t,
          title: I.getLabel.call(this, 'quality', r),
          badge: n(r),
        });
      }),
      I.updateSetting.call(this, t, s));
  },
  setCaptionsMenu() {
    if (!d.element(this.elements.settings.panels.captions)) return;
    const e = 'captions',
      t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
      s = ae.getTracks.call(this),
      i = !!s.length;
    if (
      (I.toggleMenuButton.call(this, e, i), ai(t), I.checkMenu.call(this), !i)
    )
      return;
    const n = s.map((r, o) => ({
      value: o,
      checked: this.captions.toggled && this.currentTrack === o,
      title: ae.getLabel.call(this, r),
      badge: r.language && I.createBadge.call(this, r.language.toUpperCase()),
      list: t,
      type: 'language',
    }));
    (n.unshift({
      value: -1,
      checked: !this.captions.toggled,
      title: $e.get('disabled', this.config),
      list: t,
      type: 'language',
    }),
      n.forEach(I.createMenuItem.bind(this)),
      I.updateSetting.call(this, e, t));
  },
  setSpeedMenu() {
    if (!d.element(this.elements.settings.panels.speed)) return;
    const e = 'speed',
      t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
    this.options.speed = this.options.speed.filter(
      (i) => i >= this.minimumSpeed && i <= this.maximumSpeed,
    );
    const s = !d.empty(this.options.speed) && this.options.speed.length > 1;
    (I.toggleMenuButton.call(this, e, s),
      ai(t),
      I.checkMenu.call(this),
      s &&
        (this.options.speed.forEach((i) => {
          I.createMenuItem.call(this, {
            value: i,
            list: t,
            type: e,
            title: I.getLabel.call(this, 'speed', i),
          });
        }),
        I.updateSetting.call(this, e, t)));
  },
  checkMenu() {
    const { buttons: e } = this.elements.settings,
      t = !d.empty(e) && Object.values(e).some((s) => !s.hidden);
    Yt(this.elements.settings.menu, !t);
  },
  focusFirstMenuItem(e, t = !1) {
    if (this.elements.settings.popup.hidden) return;
    let s = e;
    d.element(s) ||
      (s = Object.values(this.elements.settings.panels).find((n) => !n.hidden));
    const i = s.querySelector('[role^="menuitem"]');
    an.call(this, i, t);
  },
  toggleMenu(e) {
    const { popup: t } = this.elements.settings,
      s = this.elements.buttons.settings;
    if (!d.element(t) || !d.element(s)) return;
    const { hidden: i } = t;
    let n = i;
    if (d.boolean(e)) n = e;
    else if (d.keyboardEvent(e) && e.key === 'Escape') n = !1;
    else if (d.event(e)) {
      const r = d.function(e.composedPath) ? e.composedPath()[0] : e.target,
        o = t.contains(r);
      if (o || (!o && e.target !== s && n)) return;
    }
    (s.setAttribute('aria-expanded', n),
      Yt(t, !n),
      de(this.elements.container, this.config.classNames.menu.open, n),
      n && d.keyboardEvent(e)
        ? I.focusFirstMenuItem.call(this, null, !0)
        : !n && !i && an.call(this, s, d.keyboardEvent(e)));
  },
  getMenuSize(e) {
    const t = e.cloneNode(!0);
    ((t.style.position = 'absolute'),
      (t.style.opacity = 0),
      t.removeAttribute('hidden'),
      e.parentNode.appendChild(t));
    const s = t.scrollWidth,
      i = t.scrollHeight;
    return (Et(t), { width: s, height: i });
  },
  showMenuPanel(e = '', t = !1) {
    const s = this.elements.container.querySelector(
      `#plyr-settings-${this.id}-${e}`,
    );
    if (!d.element(s)) return;
    const i = s.parentNode,
      n = Array.from(i.children).find((r) => !r.hidden);
    if (Ae.transitions && !Ae.reducedMotion) {
      ((i.style.width = `${n.scrollWidth}px`),
        (i.style.height = `${n.scrollHeight}px`));
      const r = I.getMenuSize.call(this, s),
        o = (l) => {
          l.target !== i ||
            !['width', 'height'].includes(l.propertyName) ||
            ((i.style.width = ''),
            (i.style.height = ''),
            Ui.call(this, i, En, o));
        };
      (le.call(this, i, En, o),
        (i.style.width = `${r.width}px`),
        (i.style.height = `${r.height}px`));
    }
    (Yt(n, !0), Yt(s, !1), I.focusFirstMenuItem.call(this, s, t));
  },
  setDownloadUrl() {
    const e = this.elements.buttons.download;
    d.element(e) && e.setAttribute('href', this.download);
  },
  create(e) {
    const {
      bindMenuItemShortcuts: t,
      createButton: s,
      createProgress: i,
      createRange: n,
      createTime: r,
      setQualityMenu: o,
      setSpeedMenu: l,
      showMenuPanel: a,
    } = I;
    ((this.elements.controls = null),
      d.array(this.config.controls) &&
        this.config.controls.includes('play-large') &&
        this.elements.container.appendChild(s.call(this, 'play-large')));
    const c = J('div', ht(this.config.selectors.controls.wrapper));
    this.elements.controls = c;
    const u = { class: 'plyr__controls__item' };
    return (
      $n(d.array(this.config.controls) ? this.config.controls : []).forEach(
        (f) => {
          if (
            (f === 'restart' && c.appendChild(s.call(this, 'restart', u)),
            f === 'rewind' && c.appendChild(s.call(this, 'rewind', u)),
            f === 'play' && c.appendChild(s.call(this, 'play', u)),
            f === 'fast-forward' &&
              c.appendChild(s.call(this, 'fast-forward', u)),
            f === 'progress')
          ) {
            const p = J('div', {
                class: `${u.class} plyr__progress__container`,
              }),
              y = J('div', ht(this.config.selectors.progress));
            if (
              (y.appendChild(n.call(this, 'seek', { id: `plyr-seek-${e.id}` })),
              y.appendChild(i.call(this, 'buffer')),
              this.config.tooltips.seek)
            ) {
              const k = J(
                'span',
                { class: this.config.classNames.tooltip },
                '00:00',
              );
              (y.appendChild(k), (this.elements.display.seekTooltip = k));
            }
            ((this.elements.progress = y),
              p.appendChild(this.elements.progress),
              c.appendChild(p));
          }
          if (
            (f === 'current-time' &&
              c.appendChild(r.call(this, 'currentTime', u)),
            f === 'duration' && c.appendChild(r.call(this, 'duration', u)),
            f === 'mute' || f === 'volume')
          ) {
            let { volume: p } = this.elements;
            if (
              ((!d.element(p) || !c.contains(p)) &&
                ((p = J(
                  'div',
                  Se({}, u, { class: `${u.class} plyr__volume`.trim() }),
                )),
                (this.elements.volume = p),
                c.appendChild(p)),
              f === 'mute' && p.appendChild(s.call(this, 'mute')),
              f === 'volume' && !Ie.isIos && !Ie.isIPadOS)
            ) {
              const y = { max: 1, step: 0.05, value: this.config.volume };
              p.appendChild(
                n.call(this, 'volume', Se(y, { id: `plyr-volume-${e.id}` })),
              );
            }
          }
          if (
            (f === 'captions' && c.appendChild(s.call(this, 'captions', u)),
            f === 'settings' && !d.empty(this.config.settings))
          ) {
            const p = J(
              'div',
              Se({}, u, { class: `${u.class} plyr__menu`.trim(), hidden: '' }),
            );
            p.appendChild(
              s.call(this, 'settings', {
                'aria-haspopup': !0,
                'aria-controls': `plyr-settings-${e.id}`,
                'aria-expanded': !1,
              }),
            );
            const y = J('div', {
                class: 'plyr__menu__container',
                id: `plyr-settings-${e.id}`,
                hidden: '',
              }),
              k = J('div'),
              v = J('div', { id: `plyr-settings-${e.id}-home` }),
              x = J('div', { role: 'menu' });
            (v.appendChild(x),
              k.appendChild(v),
              (this.elements.settings.panels.home = v),
              this.config.settings.forEach((M) => {
                const b = J(
                  'button',
                  Se(ht(this.config.selectors.buttons.settings), {
                    'type': 'button',
                    'class': `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
                    'role': 'menuitem',
                    'aria-haspopup': !0,
                    'hidden': '',
                  }),
                );
                (t.call(this, b, M),
                  le.call(this, b, 'click', () => {
                    a.call(this, M, !1);
                  }));
                const P = J('span', null, $e.get(M, this.config)),
                  T = J('span', { class: this.config.classNames.menu.value });
                ((T.innerHTML = e[M]),
                  P.appendChild(T),
                  b.appendChild(P),
                  x.appendChild(b));
                const V = J('div', {
                    id: `plyr-settings-${e.id}-${M}`,
                    hidden: '',
                  }),
                  K = J('button', {
                    type: 'button',
                    class: `${this.config.classNames.control} ${this.config.classNames.control}--back`,
                  });
                (K.appendChild(
                  J('span', { 'aria-hidden': !0 }, $e.get(M, this.config)),
                ),
                  K.appendChild(
                    J(
                      'span',
                      { class: this.config.classNames.hidden },
                      $e.get('menuBack', this.config),
                    ),
                  ),
                  le.call(
                    this,
                    V,
                    'keydown',
                    (G) => {
                      G.key === 'ArrowLeft' &&
                        (G.preventDefault(),
                        G.stopPropagation(),
                        a.call(this, 'home', !0));
                    },
                    !1,
                  ),
                  le.call(this, K, 'click', () => {
                    a.call(this, 'home', !1);
                  }),
                  V.appendChild(K),
                  V.appendChild(J('div', { role: 'menu' })),
                  k.appendChild(V),
                  (this.elements.settings.buttons[M] = b),
                  (this.elements.settings.panels[M] = V));
              }),
              y.appendChild(k),
              p.appendChild(y),
              c.appendChild(p),
              (this.elements.settings.popup = y),
              (this.elements.settings.menu = p));
          }
          if (
            (f === 'pip' && Ae.pip && c.appendChild(s.call(this, 'pip', u)),
            f === 'airplay' &&
              Ae.airplay &&
              c.appendChild(s.call(this, 'airplay', u)),
            f === 'download')
          ) {
            const p = Se({}, u, {
              element: 'a',
              href: this.download,
              target: '_blank',
            });
            this.isHTML5 && (p.download = '');
            const { download: y } = this.config.urls;
            (!d.url(y) &&
              this.isEmbed &&
              Se(p, { icon: `logo-${this.provider}`, label: this.provider }),
              c.appendChild(s.call(this, 'download', p)));
          }
          f === 'fullscreen' && c.appendChild(s.call(this, 'fullscreen', u));
        },
      ),
      this.isHTML5 && o.call(this, Ft.getQualityOptions.call(this)),
      l.call(this),
      c
    );
  },
  inject() {
    if (this.config.loadSprite) {
      const o = I.getIconUrl.call(this);
      o.cors && zl(o.url, 'sprite-plyr');
    }
    this.id = Math.floor(Math.random() * 1e4);
    let e = null;
    this.elements.controls = null;
    const t = {
      id: this.id,
      seektime: this.config.seekTime,
      title: this.config.title,
    };
    let s = !0;
    (d.function(this.config.controls) &&
      (this.config.controls = this.config.controls.call(this, t)),
      this.config.controls || (this.config.controls = []),
      d.element(this.config.controls) || d.string(this.config.controls)
        ? (e = this.config.controls)
        : ((e = I.create.call(this, {
            id: this.id,
            seektime: this.config.seekTime,
            speed: this.speed,
            quality: this.quality,
            captions: ae.getLabel.call(this),
          })),
          (s = !1)));
    const i = (o) => {
      let l = o;
      return (
        Object.entries(t).forEach(([a, c]) => {
          l = $s(l, `{${a}}`, c);
        }),
        l
      );
    };
    s && d.string(this.config.controls) && (e = i(e));
    let n;
    (d.string(this.config.selectors.controls.container) &&
      (n = document.querySelector(this.config.selectors.controls.container)),
      d.element(n) || (n = this.elements.container));
    const r = d.element(e) ? 'insertAdjacentElement' : 'insertAdjacentHTML';
    if (
      (n[r]('afterbegin', e),
      d.element(this.elements.controls) || I.findElements.call(this),
      !d.empty(this.elements.buttons))
    ) {
      const o = (l) => {
        const a = this.config.classNames.controlPressed;
        (l.setAttribute('aria-pressed', 'false'),
          Object.defineProperty(l, 'pressed', {
            configurable: !0,
            enumerable: !0,
            get() {
              return _i(l, a);
            },
            set(c = !1) {
              (de(l, a, c),
                l.setAttribute('aria-pressed', c ? 'true' : 'false'));
            },
          }));
      };
      Object.values(this.elements.buttons)
        .filter(Boolean)
        .forEach((l) => {
          d.array(l) || d.nodeList(l)
            ? Array.from(l).filter(Boolean).forEach(o)
            : o(l);
        });
    }
    if ((Ie.isEdge && jl(n), this.config.tooltips.controls)) {
      const { classNames: o, selectors: l } = this.config,
        a = `${l.controls.wrapper} ${l.labels} .${o.hidden}`,
        c = Fs.call(this, a);
      Array.from(c).forEach((u) => {
        (de(u, this.config.classNames.hidden, !1),
          de(u, this.config.classNames.tooltip, !0));
      });
    }
  },
  setMediaMetadata() {
    try {
      'mediaSession' in navigator &&
        (navigator.mediaSession.metadata = new window.MediaMetadata({
          title: this.config.mediaMetadata.title,
          artist: this.config.mediaMetadata.artist,
          album: this.config.mediaMetadata.album,
          artwork: this.config.mediaMetadata.artwork,
        }));
    } catch {}
  },
  setMarkers() {
    var e, t;
    if (!this.duration || this.elements.markers) return;
    const s =
      (e = this.config.markers) === null ||
      e === void 0 ||
      (t = e.points) === null ||
      t === void 0
        ? void 0
        : t.filter(({ time: a }) => a > 0 && a < this.duration);
    if (!(s != null && s.length)) return;
    const i = document.createDocumentFragment(),
      n = document.createDocumentFragment();
    let r = null;
    const o = `${this.config.classNames.tooltip}--visible`,
      l = (a) => de(r, o, a);
    (s.forEach((a) => {
      const c = J('span', { class: this.config.classNames.marker }, ''),
        u = `${(a.time / this.duration) * 100}%`;
      (r &&
        (c.addEventListener('mouseenter', () => {
          a.label || ((r.style.left = u), (r.innerHTML = a.label), l(!0));
        }),
        c.addEventListener('mouseleave', () => {
          l(!1);
        })),
        c.addEventListener('click', () => {
          this.currentTime = a.time;
        }),
        (c.style.left = u),
        n.appendChild(c));
    }),
      i.appendChild(n),
      this.config.tooltips.seek ||
        ((r = J('span', { class: this.config.classNames.tooltip }, '')),
        i.appendChild(r)),
      (this.elements.markers = { points: n, tip: r }),
      this.elements.progress.appendChild(i));
  },
};
function Gl(e, t = !0) {
  let s = e;
  if (t) {
    const i = document.createElement('a');
    ((i.href = s), (s = i.href));
  }
  try {
    return new URL(s);
  } catch {
    return null;
  }
}
function Jl(e) {
  const t = new URLSearchParams();
  return (
    d.object(e) &&
      Object.entries(e).forEach(([s, i]) => {
        t.set(s, i);
      }),
    t
  );
}
const ae = {
    setup() {
      if (!this.supported.ui) return;
      if (!this.isVideo || this.isYouTube || (this.isHTML5 && !Ae.textTracks)) {
        d.array(this.config.controls) &&
          this.config.controls.includes('settings') &&
          this.config.settings.includes('captions') &&
          I.setCaptionsMenu.call(this);
        return;
      }
      if (
        (d.element(this.elements.captions) ||
          ((this.elements.captions = J(
            'div',
            ht(this.config.selectors.captions),
          )),
          this.elements.captions.setAttribute('dir', 'auto'),
          Af(this.elements.captions, this.elements.wrapper)),
        Ie.isIE && window.URL)
      ) {
        const n = this.media.querySelectorAll('track');
        Array.from(n).forEach((r) => {
          const o = r.getAttribute('src'),
            l = Gl(o);
          l !== null &&
            l.hostname !== window.location.href.hostname &&
            ['http:', 'https:'].includes(l.protocol) &&
            Ys(o, 'blob')
              .then((a) => {
                r.setAttribute('src', window.URL.createObjectURL(a));
              })
              .catch(() => {
                Et(r);
              });
        });
      }
      const e = navigator.languages || [
          navigator.language || navigator.userLanguage || 'en',
        ],
        t = $n(e.map((n) => n.split('-')[0]));
      let s = (
        this.storage.get('language') ||
        this.captions.language ||
        this.config.captions.language ||
        'auto'
      ).toLowerCase();
      s === 'auto' && ([s] = t);
      let i = this.storage.get('captions') || this.captions.active;
      if (
        (d.boolean(i) || ({ active: i } = this.config.captions),
        Object.assign(this.captions, {
          toggled: !1,
          active: i,
          language: s,
          languages: t,
        }),
        this.isHTML5)
      ) {
        const n = this.config.captions.update
          ? 'addtrack removetrack'
          : 'removetrack';
        le.call(this, this.media.textTracks, n, ae.update.bind(this));
      }
      setTimeout(ae.update.bind(this), 0);
    },
    update() {
      const e = ae.getTracks.call(this, !0),
        {
          active: t,
          language: s,
          meta: i,
          currentTrackNode: n,
        } = this.captions,
        r = !!e.find((o) => o.language === s);
      (this.isHTML5 &&
        this.isVideo &&
        e
          .filter((o) => !i.get(o))
          .forEach((o) => {
            (this.debug.log('Track added', o),
              i.set(o, { default: o.mode === 'showing' }),
              o.mode === 'showing' && (o.mode = 'hidden'),
              le.call(this, o, 'cuechange', () => ae.updateCues.call(this)));
          }),
        ((r && this.language !== s) || !e.includes(n)) &&
          (ae.setLanguage.call(this, s), ae.toggle.call(this, t && r)),
        this.elements &&
          de(
            this.elements.container,
            this.config.classNames.captions.enabled,
            !d.empty(e),
          ),
        d.array(this.config.controls) &&
          this.config.controls.includes('settings') &&
          this.config.settings.includes('captions') &&
          I.setCaptionsMenu.call(this));
    },
    toggle(e, t = !0) {
      if (!this.supported.ui) return;
      const { toggled: s } = this.captions,
        i = this.config.classNames.captions.active,
        n = d.nullOrUndefined(e) ? !s : e;
      if (n !== s) {
        if (
          (t || ((this.captions.active = n), this.storage.set({ captions: n })),
          !this.language && n && !t)
        ) {
          const r = ae.getTracks.call(this),
            o = ae.findTrack.call(
              this,
              [this.captions.language, ...this.captions.languages],
              !0,
            );
          ((this.captions.language = o.language),
            ae.set.call(this, r.indexOf(o)));
          return;
        }
        (this.elements.buttons.captions &&
          (this.elements.buttons.captions.pressed = n),
          de(this.elements.container, i, n),
          (this.captions.toggled = n),
          I.updateSetting.call(this, 'captions'),
          X.call(this, this.media, n ? 'captionsenabled' : 'captionsdisabled'));
      }
      setTimeout(() => {
        n &&
          this.captions.toggled &&
          (this.captions.currentTrackNode.mode = 'hidden');
      });
    },
    set(e, t = !0) {
      const s = ae.getTracks.call(this);
      if (e === -1) {
        ae.toggle.call(this, !1, t);
        return;
      }
      if (!d.number(e)) {
        this.debug.warn('Invalid caption argument', e);
        return;
      }
      if (!(e in s)) {
        this.debug.warn('Track not found', e);
        return;
      }
      if (this.captions.currentTrack !== e) {
        this.captions.currentTrack = e;
        const i = s[e],
          { language: n } = i || {};
        ((this.captions.currentTrackNode = i),
          I.updateSetting.call(this, 'captions'),
          t ||
            ((this.captions.language = n), this.storage.set({ language: n })),
          this.isVimeo && this.embed.enableTextTrack(n, null, !1),
          X.call(this, this.media, 'languagechange'));
      }
      (ae.toggle.call(this, !0, t),
        this.isHTML5 && this.isVideo && ae.updateCues.call(this));
    },
    setLanguage(e, t = !0) {
      if (!d.string(e)) {
        this.debug.warn('Invalid language argument', e);
        return;
      }
      const s = e.toLowerCase();
      this.captions.language = s;
      const i = ae.getTracks.call(this),
        n = ae.findTrack.call(this, [s]);
      ae.set.call(this, i.indexOf(n), t);
    },
    getTracks(e = !1) {
      return Array.from((this.media || {}).textTracks || [])
        .filter((s) => !this.isHTML5 || e || this.captions.meta.has(s))
        .filter((s) => ['captions', 'subtitles'].includes(s.kind));
    },
    findTrack(e, t = !1) {
      const s = ae.getTracks.call(this),
        i = (o) => Number((this.captions.meta.get(o) || {}).default),
        n = Array.from(s).sort((o, l) => i(l) - i(o));
      let r;
      return (
        e.every((o) => ((r = n.find((l) => l.language === o)), !r)),
        r || (t ? n[0] : void 0)
      );
    },
    getCurrentTrack() {
      return ae.getTracks.call(this)[this.currentTrack];
    },
    getLabel(e) {
      let t = e;
      return (
        !d.track(t) &&
          Ae.textTracks &&
          this.captions.toggled &&
          (t = ae.getCurrentTrack.call(this)),
        d.track(t)
          ? d.empty(t.label)
            ? d.empty(t.language)
              ? $e.get('enabled', this.config)
              : e.language.toUpperCase()
            : t.label
          : $e.get('disabled', this.config)
      );
    },
    updateCues(e) {
      if (!this.supported.ui) return;
      if (!d.element(this.elements.captions)) {
        this.debug.warn('No captions element to render to');
        return;
      }
      if (!d.nullOrUndefined(e) && !Array.isArray(e)) {
        this.debug.warn('updateCues: Invalid input', e);
        return;
      }
      let t = e;
      if (!t) {
        const n = ae.getCurrentTrack.call(this);
        t = Array.from((n || {}).activeCues || [])
          .map((r) => r.getCueAsHTML())
          .map(Uf);
      }
      const s = t.map((n) => n.trim()).join(`
`);
      if (s !== this.elements.captions.innerHTML) {
        ai(this.elements.captions);
        const n = J('span', ht(this.config.selectors.caption));
        ((n.innerHTML = s),
          this.elements.captions.appendChild(n),
          X.call(this, this.media, 'cuechange'));
      }
    },
  },
  Xl = {
    enabled: !0,
    title: '',
    debug: !1,
    autoplay: !1,
    autopause: !0,
    playsinline: !0,
    seekTime: 10,
    volume: 1,
    muted: !1,
    duration: null,
    displayDuration: !0,
    invertTime: !0,
    toggleInvert: !0,
    ratio: null,
    clickToPlay: !0,
    hideControls: !0,
    resetOnEnd: !1,
    disableContextMenu: !0,
    loadSprite: !0,
    iconPrefix: 'plyr',
    iconUrl: 'https://cdn.plyr.io/3.8.4/plyr.svg',
    blankVideo: 'https://cdn.plyr.io/static/blank.mp4',
    quality: {
      default: 576,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      forced: !1,
      onChange: null,
    },
    loop: { active: !1 },
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] },
    keyboard: { focused: !0, global: !1 },
    tooltips: { controls: !1, seek: !0 },
    captions: { active: !1, language: 'auto', update: !1 },
    fullscreen: { enabled: !0, fallback: !0, iosNative: !1 },
    storage: { enabled: !0, key: 'plyr' },
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'captions',
      'settings',
      'pip',
      'airplay',
      'fullscreen',
    ],
    settings: ['captions', 'quality', 'speed'],
    i18n: {
      restart: 'Restart',
      rewind: 'Rewind {seektime}s',
      play: 'Play',
      pause: 'Pause',
      fastForward: 'Forward {seektime}s',
      seek: 'Seek',
      seekLabel: '{currentTime} of {duration}',
      played: 'Played',
      buffered: 'Buffered',
      currentTime: 'Current time',
      duration: 'Duration',
      volume: 'Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      enableCaptions: 'Enable captions',
      disableCaptions: 'Disable captions',
      download: 'Download',
      enterFullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      frameTitle: 'Player for {title}',
      captions: 'Captions',
      settings: 'Settings',
      pip: 'PIP',
      menuBack: 'Go back to previous menu',
      speed: 'Speed',
      normal: 'Normal',
      quality: 'Quality',
      loop: 'Loop',
      start: 'Start',
      end: 'End',
      all: 'All',
      reset: 'Reset',
      disabled: 'Disabled',
      enabled: 'Enabled',
      advertisement: 'Ad',
      qualityBadge: {
        2160: '4K',
        1440: 'HD',
        1080: 'HD',
        720: 'HD',
        576: 'SD',
        480: 'SD',
      },
    },
    urls: {
      download: null,
      vimeo: {
        sdk: 'https://player.vimeo.com/api/player.js',
        iframe: 'https://player.vimeo.com/video/{0}?{1}',
        api: 'https://vimeo.com/api/oembed.json?url={0}',
      },
      youtube: {
        sdk: 'https://www.youtube.com/iframe_api',
        api: 'https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}',
      },
      googleIMA: { sdk: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js' },
    },
    listeners: {
      seek: null,
      play: null,
      pause: null,
      restart: null,
      rewind: null,
      fastForward: null,
      mute: null,
      volume: null,
      captions: null,
      download: null,
      fullscreen: null,
      pip: null,
      airplay: null,
      speed: null,
      quality: null,
      loop: null,
      language: null,
    },
    events: [
      'ended',
      'progress',
      'stalled',
      'playing',
      'waiting',
      'canplay',
      'canplaythrough',
      'loadstart',
      'loadeddata',
      'loadedmetadata',
      'timeupdate',
      'volumechange',
      'play',
      'pause',
      'error',
      'seeking',
      'seeked',
      'emptied',
      'ratechange',
      'cuechange',
      'download',
      'enterfullscreen',
      'exitfullscreen',
      'captionsenabled',
      'captionsdisabled',
      'languagechange',
      'controlshidden',
      'controlsshown',
      'ready',
      'statechange',
      'qualitychange',
      'adsloaded',
      'adscontentpause',
      'adscontentresume',
      'adstarted',
      'adsmidpoint',
      'adscomplete',
      'adsallcomplete',
      'adsimpression',
      'adsclick',
    ],
    selectors: {
      editable: 'input, textarea, select, [contenteditable]',
      container: '.plyr',
      controls: { container: null, wrapper: '.plyr__controls' },
      labels: '[data-plyr]',
      buttons: {
        play: '[data-plyr="play"]',
        pause: '[data-plyr="pause"]',
        restart: '[data-plyr="restart"]',
        rewind: '[data-plyr="rewind"]',
        fastForward: '[data-plyr="fast-forward"]',
        mute: '[data-plyr="mute"]',
        captions: '[data-plyr="captions"]',
        download: '[data-plyr="download"]',
        fullscreen: '[data-plyr="fullscreen"]',
        pip: '[data-plyr="pip"]',
        airplay: '[data-plyr="airplay"]',
        settings: '[data-plyr="settings"]',
        loop: '[data-plyr="loop"]',
      },
      inputs: {
        seek: '[data-plyr="seek"]',
        volume: '[data-plyr="volume"]',
        speed: '[data-plyr="speed"]',
        language: '[data-plyr="language"]',
        quality: '[data-plyr="quality"]',
      },
      display: {
        currentTime: '.plyr__time--current',
        duration: '.plyr__time--duration',
        buffer: '.plyr__progress__buffer',
        loop: '.plyr__progress__loop',
        volume: '.plyr__volume--display',
      },
      progress: '.plyr__progress',
      captions: '.plyr__captions',
      caption: '.plyr__caption',
    },
    classNames: {
      type: 'plyr--{0}',
      provider: 'plyr--{0}',
      video: 'plyr__video-wrapper',
      embed: 'plyr__video-embed',
      videoFixedRatio: 'plyr__video-wrapper--fixed-ratio',
      embedContainer: 'plyr__video-embed__container',
      poster: 'plyr__poster',
      posterEnabled: 'plyr__poster-enabled',
      ads: 'plyr__ads',
      control: 'plyr__control',
      controlPressed: 'plyr__control--pressed',
      playing: 'plyr--playing',
      paused: 'plyr--paused',
      stopped: 'plyr--stopped',
      loading: 'plyr--loading',
      hover: 'plyr--hover',
      tooltip: 'plyr__tooltip',
      cues: 'plyr__cues',
      marker: 'plyr__progress__marker',
      hidden: 'plyr__sr-only',
      hideControls: 'plyr--hide-controls',
      isTouch: 'plyr--is-touch',
      uiSupported: 'plyr--full-ui',
      noTransition: 'plyr--no-transition',
      display: { time: 'plyr__time' },
      menu: {
        value: 'plyr__menu__value',
        badge: 'plyr__badge',
        open: 'plyr--menu-open',
      },
      captions: {
        enabled: 'plyr--captions-enabled',
        active: 'plyr--captions-active',
      },
      fullscreen: {
        enabled: 'plyr--fullscreen-enabled',
        fallback: 'plyr--fullscreen-fallback',
      },
      pip: { supported: 'plyr--pip-supported', active: 'plyr--pip-active' },
      airplay: {
        supported: 'plyr--airplay-supported',
        active: 'plyr--airplay-active',
      },
      previewThumbnails: {
        thumbContainer: 'plyr__preview-thumb',
        thumbContainerShown: 'plyr__preview-thumb--is-shown',
        imageContainer: 'plyr__preview-thumb__image-container',
        timeContainer: 'plyr__preview-thumb__time-container',
        scrubbingContainer: 'plyr__preview-scrubbing',
        scrubbingContainerShown: 'plyr__preview-scrubbing--is-shown',
      },
    },
    attributes: {
      embed: {
        provider: 'data-plyr-provider',
        id: 'data-plyr-embed-id',
        hash: 'data-plyr-embed-hash',
      },
    },
    ads: { enabled: !1, publisherId: '', tagUrl: '' },
    previewThumbnails: { enabled: !1, src: '', withCredentials: !1 },
    vimeo: {
      byline: !1,
      portrait: !1,
      title: !1,
      speed: !0,
      transparent: !1,
      customControls: !0,
      referrerPolicy: null,
      premium: !1,
    },
    youtube: {
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      customControls: !0,
      noCookie: !1,
    },
    mediaMetadata: { title: '', artist: '', album: '', artwork: [] },
    markers: { enabled: !1, points: [] },
  },
  cn = { active: 'picture-in-picture', inactive: 'inline' },
  Rt = { html5: 'html5', youtube: 'youtube', vimeo: 'vimeo' },
  un = { audio: 'audio', video: 'video' };
function Wf(e) {
  return /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
    e,
  )
    ? Rt.youtube
    : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e)
      ? Rt.vimeo
      : null;
}
function dn() {}
class zf {
  constructor(t = !1) {
    ((this.enabled = window.console && t),
      this.enabled && this.log('Debugging enabled'));
  }
  get log() {
    return this.enabled
      ? Function.prototype.bind.call(console.log, console)
      : dn;
  }
  get warn() {
    return this.enabled
      ? Function.prototype.bind.call(console.warn, console)
      : dn;
  }
  get error() {
    return this.enabled
      ? Function.prototype.bind.call(console.error, console)
      : dn;
  }
}
class it {
  constructor(t) {
    (D(this, 'onChange', () => {
      if (!this.supported) return;
      const s = this.player.elements.buttons.fullscreen;
      d.element(s) && (s.pressed = this.active);
      const i =
        this.target === this.player.media
          ? this.target
          : this.player.elements.container;
      X.call(
        this.player,
        i,
        this.active ? 'enterfullscreen' : 'exitfullscreen',
        !0,
      );
    }),
      D(this, 'toggleFallback', (s = !1) => {
        if (s) {
          var i, n;
          this.scrollPosition = {
            x: (i = window.scrollX) !== null && i !== void 0 ? i : 0,
            y: (n = window.scrollY) !== null && n !== void 0 ? n : 0,
          };
        } else window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
        if (
          ((document.body.style.overflow = s ? 'hidden' : ''),
          de(this.target, this.player.config.classNames.fullscreen.fallback, s),
          Ie.isIos)
        ) {
          let r = document.head.querySelector('meta[name="viewport"]');
          const o = 'viewport-fit=cover';
          r ||
            ((r = document.createElement('meta')),
            r.setAttribute('name', 'viewport'));
          const l = d.string(r.content) && r.content.includes(o);
          s
            ? ((this.cleanupViewport = !l), l || (r.content += `,${o}`))
            : this.cleanupViewport &&
              (r.content = r.content
                .split(',')
                .filter((a) => a.trim() !== o)
                .join(','));
        }
        this.onChange();
      }),
      D(this, 'trapFocus', (s) => {
        if (Ie.isIos || Ie.isIPadOS || !this.active || s.key !== 'Tab') return;
        const i = document.activeElement,
          n = Fs.call(
            this.player,
            'a[href], button:not(:disabled), input:not(:disabled), [tabindex]',
          ),
          [r] = n,
          o = n[n.length - 1];
        i === o && !s.shiftKey
          ? (r.focus(), s.preventDefault())
          : i === r && s.shiftKey && (o.focus(), s.preventDefault());
      }),
      D(this, 'update', () => {
        if (this.supported) {
          let s;
          (this.forceFallback
            ? (s = 'Fallback (forced)')
            : it.nativeSupported
              ? (s = 'Native')
              : (s = 'Fallback'),
            this.player.debug.log(`${s} fullscreen enabled`));
        } else
          this.player.debug.log(
            'Fullscreen not supported and fallback disabled',
          );
        de(
          this.player.elements.container,
          this.player.config.classNames.fullscreen.enabled,
          this.supported,
        );
      }),
      D(this, 'enter', () => {
        this.supported &&
          (Ie.isIos && this.player.config.fullscreen.iosNative
            ? this.player.isVimeo
              ? this.player.embed.requestFullscreen()
              : this.target.webkitEnterFullscreen()
            : !it.nativeSupported || this.forceFallback
              ? this.toggleFallback(!0)
              : this.prefix
                ? d.empty(this.prefix) ||
                  this.target[`${this.prefix}Request${this.property}`]()
                : this.target.requestFullscreen({ navigationUI: 'hide' }));
      }),
      D(this, 'exit', () => {
        if (this.supported) {
          if (Ie.isIos && this.player.config.fullscreen.iosNative)
            (this.player.isVimeo
              ? this.player.embed.exitFullscreen()
              : this.target.webkitEnterFullscreen(),
              gt(this.player.play()));
          else if (!it.nativeSupported || this.forceFallback)
            this.toggleFallback(!1);
          else if (!this.prefix)
            (document.cancelFullScreen || document.exitFullscreen).call(
              document,
            );
          else if (!d.empty(this.prefix)) {
            const s = this.prefix === 'moz' ? 'Cancel' : 'Exit';
            document[`${this.prefix}${s}${this.property}`]();
          }
        }
      }),
      D(this, 'toggle', () => {
        this.active ? this.exit() : this.enter();
      }),
      (this.player = t),
      (this.prefix = it.prefix),
      (this.property = it.property),
      (this.scrollPosition = { x: 0, y: 0 }),
      (this.forceFallback = t.config.fullscreen.fallback === 'force'),
      (this.player.elements.fullscreen =
        t.config.fullscreen.container &&
        Ef(this.player.elements.container, t.config.fullscreen.container)),
      le.call(
        this.player,
        document,
        this.prefix === 'ms'
          ? 'MSFullscreenChange'
          : `${this.prefix}fullscreenchange`,
        () => {
          this.onChange();
        },
      ),
      le.call(this.player, this.player.elements.container, 'dblclick', (s) => {
        (d.element(this.player.elements.controls) &&
          this.player.elements.controls.contains(s.target)) ||
          this.player.listeners.proxy(s, this.toggle, 'fullscreen');
      }),
      le.call(this, this.player.elements.container, 'keydown', (s) =>
        this.trapFocus(s),
      ),
      this.update());
  }
  static get nativeSupported() {
    return !!(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }
  get useNative() {
    return it.nativeSupported && !this.forceFallback;
  }
  static get prefix() {
    if (d.function(document.exitFullscreen)) return '';
    let t = '';
    return (
      ['webkit', 'moz', 'ms'].some((i) =>
        d.function(document[`${i}ExitFullscreen`]) ||
        d.function(document[`${i}CancelFullScreen`])
          ? ((t = i), !0)
          : !1,
      ),
      t
    );
  }
  static get property() {
    return this.prefix === 'moz' ? 'FullScreen' : 'Fullscreen';
  }
  get supported() {
    return [
      this.player.config.fullscreen.enabled,
      this.player.isVideo,
      it.nativeSupported || this.player.config.fullscreen.fallback,
      !this.player.isYouTube ||
        it.nativeSupported ||
        !Ie.isIos ||
        (this.player.config.playsinline &&
          !this.player.config.fullscreen.iosNative),
    ].every(Boolean);
  }
  get active() {
    if (!this.supported) return !1;
    if (!it.nativeSupported || this.forceFallback)
      return _i(this.target, this.player.config.classNames.fullscreen.fallback);
    const t = this.prefix
      ? this.target.getRootNode()[`${this.prefix}${this.property}Element`]
      : this.target.getRootNode().fullscreenElement;
    return t && t.shadowRoot
      ? t === this.target.getRootNode().host
      : t === this.target;
  }
  get target() {
    var t;
    return Ie.isIos && this.player.config.fullscreen.iosNative
      ? this.player.media
      : (t = this.player.elements.fullscreen) !== null && t !== void 0
        ? t
        : this.player.elements.container;
  }
}
function ci(e, t = 1) {
  return new Promise((s, i) => {
    const n = new Image(),
      r = () => {
        (delete n.onload, delete n.onerror, (n.naturalWidth >= t ? s : i)(n));
      };
    Object.assign(n, { onload: r, onerror: r, src: e });
  });
}
const ge = {
  addStyleHook() {
    (de(
      this.elements.container,
      this.config.selectors.container.replace('.', ''),
      !0,
    ),
      de(
        this.elements.container,
        this.config.classNames.uiSupported,
        this.supported.ui,
      ));
  },
  toggleNativeControls(e = !1) {
    e && this.isHTML5
      ? this.media.setAttribute('controls', '')
      : this.media.removeAttribute('controls');
  },
  build() {
    if ((this.listeners.media(), !this.supported.ui)) {
      (this.debug.warn(`Basic support only for ${this.provider} ${this.type}`),
        ge.toggleNativeControls.call(this, !0));
      return;
    }
    (d.element(this.elements.controls) ||
      (I.inject.call(this), this.listeners.controls()),
      ge.toggleNativeControls.call(this),
      this.isHTML5 && ae.setup.call(this),
      (this.volume = null),
      (this.muted = null),
      (this.loop = null),
      (this.quality = null),
      (this.speed = null),
      I.updateVolume.call(this),
      I.timeUpdate.call(this),
      I.durationUpdate.call(this),
      ge.checkPlaying.call(this),
      de(
        this.elements.container,
        this.config.classNames.pip.supported,
        Ae.pip && this.isHTML5 && this.isVideo,
      ),
      de(
        this.elements.container,
        this.config.classNames.airplay.supported,
        Ae.airplay && this.isHTML5,
      ),
      de(this.elements.container, this.config.classNames.isTouch, this.touch),
      (this.ready = !0),
      setTimeout(() => {
        X.call(this, this.media, 'ready');
      }, 0),
      ge.setTitle.call(this),
      this.poster && ge.setPoster.call(this, this.poster, !1).catch(() => {}),
      this.config.duration && I.durationUpdate.call(this),
      this.config.mediaMetadata && I.setMediaMetadata.call(this));
  },
  setTitle() {
    let e = $e.get('play', this.config);
    if (
      (d.string(this.config.title) &&
        !d.empty(this.config.title) &&
        (e += `, ${this.config.title}`),
      Array.from(this.elements.buttons.play || []).forEach((t) => {
        t.setAttribute('aria-label', e);
      }),
      this.isEmbed)
    ) {
      const t = Ee.call(this, 'iframe');
      if (!d.element(t)) return;
      const s = d.empty(this.config.title) ? 'video' : this.config.title,
        i = $e.get('frameTitle', this.config);
      t.setAttribute('title', i.replace('{title}', s));
    }
  },
  togglePoster(e) {
    de(this.elements.container, this.config.classNames.posterEnabled, e);
  },
  setPoster(e, t = !0) {
    return t && this.poster
      ? Promise.reject(new Error('Poster already set'))
      : (this.media.setAttribute('data-poster', e),
        this.elements.poster.removeAttribute('hidden'),
        Pf.call(this)
          .then(() => ci(e))
          .catch((s) => {
            throw (e === this.poster && ge.togglePoster.call(this, !1), s);
          })
          .then(() => {
            if (e !== this.poster)
              throw new Error('setPoster cancelled by later call to setPoster');
          })
          .then(
            () => (
              Object.assign(this.elements.poster.style, {
                backgroundImage: `url('${e}')`,
                backgroundSize: '',
              }),
              ge.togglePoster.call(this, !0),
              e
            ),
          ));
  },
  checkPlaying(e) {
    (de(this.elements.container, this.config.classNames.playing, this.playing),
      de(this.elements.container, this.config.classNames.paused, this.paused),
      de(this.elements.container, this.config.classNames.stopped, this.stopped),
      Array.from(this.elements.buttons.play || []).forEach((t) => {
        (Object.assign(t, { pressed: this.playing }),
          t.setAttribute(
            'aria-label',
            $e.get(this.playing ? 'pause' : 'play', this.config),
          ));
      }),
      !(d.event(e) && e.type === 'timeupdate') && ge.toggleControls.call(this));
  },
  checkLoading(e) {
    ((this.loading = ['stalled', 'waiting'].includes(e.type)),
      clearTimeout(this.timers.loading),
      (this.timers.loading = setTimeout(
        () => {
          (de(
            this.elements.container,
            this.config.classNames.loading,
            this.loading,
          ),
            ge.toggleControls.call(this));
        },
        this.loading ? 250 : 0,
      )));
  },
  toggleControls(e) {
    const { controls: t } = this.elements;
    if (t && this.config.hideControls) {
      const s = this.touch && this.lastSeekTime + 2e3 > Date.now();
      this.toggleControls(
        !!(e || this.loading || this.paused || t.pressed || t.hover || s),
      );
    }
  },
  migrateStyles() {
    (Object.values({ ...this.media.style })
      .filter((e) => !d.empty(e) && d.string(e) && e.startsWith('--plyr'))
      .forEach((e) => {
        (this.elements.container.style.setProperty(
          e,
          this.media.style.getPropertyValue(e),
        ),
          this.media.style.removeProperty(e));
      }),
      d.empty(this.media.style) && this.media.removeAttribute('style'));
  },
};
class Yf {
  constructor(t) {
    (D(this, 'firstTouch', () => {
      const { player: s } = this,
        { elements: i } = s;
      ((s.touch = !0), de(i.container, s.config.classNames.isTouch, !0));
    }),
      D(this, 'global', (s = !0) => {
        const { player: i } = this;
        (i.config.keyboard.global &&
          js.call(i, window, 'keydown keyup', this.handleKey, s, !1),
          js.call(i, document.body, 'click', this.toggleMenu, s),
          ir.call(i, document.body, 'touchstart', this.firstTouch));
      }),
      D(this, 'container', () => {
        const { player: s } = this,
          { config: i, elements: n, timers: r } = s;
        (!i.keyboard.global &&
          i.keyboard.focused &&
          le.call(s, n.container, 'keydown keyup', this.handleKey, !1),
          le.call(
            s,
            n.container,
            'mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen',
            (a) => {
              const { controls: c } = n;
              c &&
                a.type === 'enterfullscreen' &&
                ((c.pressed = !1), (c.hover = !1));
              const u = ['touchstart', 'touchmove', 'mousemove'].includes(
                a.type,
              );
              let f = 0;
              (u && (ge.toggleControls.call(s, !0), (f = s.touch ? 3e3 : 2e3)),
                clearTimeout(r.controls),
                (r.controls = setTimeout(
                  () => ge.toggleControls.call(s, !1),
                  f,
                )));
            },
          ));
        const o = () => {
            if (!s.isVimeo || s.config.vimeo.premium) return;
            const a = n.wrapper,
              { active: c } = s.fullscreen,
              [u, f] = nr.call(s),
              p = Ul(`aspect-ratio: ${u} / ${f}`);
            if (!c) {
              p
                ? ((a.style.width = null), (a.style.height = null))
                : ((a.style.maxWidth = null), (a.style.margin = null));
              return;
            }
            const [y, k] = Nf(),
              v = y / k > u / f;
            p
              ? ((a.style.width = v ? 'auto' : '100%'),
                (a.style.height = v ? '100%' : 'auto'))
              : ((a.style.maxWidth = v ? `${(k / f) * u}px` : null),
                (a.style.margin = v ? '0 auto' : null));
          },
          l = () => {
            (clearTimeout(r.resized), (r.resized = setTimeout(o, 50)));
          };
        le.call(s, n.container, 'enterfullscreen exitfullscreen', (a) => {
          const { target: c } = s.fullscreen;
          if (c !== n.container || (!s.isEmbed && d.empty(s.config.ratio)))
            return;
          (o(),
            (a.type === 'enterfullscreen' ? le : Ui).call(
              s,
              window,
              'resize',
              l,
            ));
        });
      }),
      D(this, 'media', () => {
        const { player: s } = this,
          { elements: i } = s;
        if (
          (le.call(s, s.media, 'timeupdate seeking seeked', (r) =>
            I.timeUpdate.call(s, r),
          ),
          le.call(s, s.media, 'durationchange loadeddata loadedmetadata', (r) =>
            I.durationUpdate.call(s, r),
          ),
          le.call(s, s.media, 'ended', () => {
            s.isHTML5 &&
              s.isVideo &&
              s.config.resetOnEnd &&
              (s.restart(), s.pause());
          }),
          le.call(s, s.media, 'progress playing seeking seeked', (r) =>
            I.updateProgress.call(s, r),
          ),
          le.call(s, s.media, 'volumechange', (r) => I.updateVolume.call(s, r)),
          le.call(
            s,
            s.media,
            'playing play pause ended emptied timeupdate',
            (r) => ge.checkPlaying.call(s, r),
          ),
          le.call(s, s.media, 'waiting canplay seeked playing', (r) =>
            ge.checkLoading.call(s, r),
          ),
          s.supported.ui && s.config.clickToPlay && !s.isAudio)
        ) {
          const r = Ee.call(s, `.${s.config.classNames.video}`);
          if (!d.element(r)) return;
          le.call(s, i.container, 'click', (o) => {
            (![i.container, r].includes(o.target) && !r.contains(o.target)) ||
              (s.touch && s.config.hideControls) ||
              (s.ended
                ? (this.proxy(o, s.restart, 'restart'),
                  this.proxy(
                    o,
                    () => {
                      gt(s.play());
                    },
                    'play',
                  ))
                : this.proxy(
                    o,
                    () => {
                      gt(s.togglePlay());
                    },
                    'play',
                  ));
          });
        }
        (s.supported.ui &&
          s.config.disableContextMenu &&
          le.call(
            s,
            i.wrapper,
            'contextmenu',
            (r) => {
              r.preventDefault();
            },
            !1,
          ),
          le.call(s, s.media, 'volumechange', () => {
            s.storage.set({ volume: s.volume, muted: s.muted });
          }),
          le.call(s, s.media, 'ratechange', () => {
            (I.updateSetting.call(s, 'speed'),
              s.storage.set({ speed: s.speed }));
          }),
          le.call(s, s.media, 'qualitychange', (r) => {
            I.updateSetting.call(s, 'quality', null, r.detail.quality);
          }),
          le.call(s, s.media, 'ready qualitychange', () => {
            I.setDownloadUrl.call(s);
          }));
        const n = s.config.events.concat(['keyup', 'keydown']).join(' ');
        le.call(s, s.media, n, (r) => {
          let { detail: o = {} } = r;
          (r.type === 'error' && (o = s.media.error),
            X.call(s, i.container, r.type, !0, o));
        });
      }),
      D(this, 'proxy', (s, i, n) => {
        const { player: r } = this,
          o = r.config.listeners[n],
          l = d.function(o);
        let a = !0;
        (l && (a = o.call(r, s)), a !== !1 && d.function(i) && i.call(r, s));
      }),
      D(this, 'bind', (s, i, n, r, o = !0) => {
        const { player: l } = this,
          a = l.config.listeners[r],
          c = d.function(a);
        le.call(l, s, i, (u) => this.proxy(u, n, r), o && !c);
      }),
      D(this, 'controls', () => {
        const { player: s } = this,
          { elements: i } = s,
          n = Ie.isIE ? 'change' : 'input';
        if (
          (i.buttons.play &&
            Array.from(i.buttons.play).forEach((r) => {
              this.bind(
                r,
                'click',
                () => {
                  gt(s.togglePlay());
                },
                'play',
              );
            }),
          this.bind(i.buttons.restart, 'click', s.restart, 'restart'),
          this.bind(
            i.buttons.rewind,
            'click',
            () => {
              ((s.lastSeekTime = Date.now()), s.rewind());
            },
            'rewind',
          ),
          this.bind(
            i.buttons.fastForward,
            'click',
            () => {
              ((s.lastSeekTime = Date.now()), s.forward());
            },
            'fastForward',
          ),
          this.bind(
            i.buttons.mute,
            'click',
            () => {
              s.muted = !s.muted;
            },
            'mute',
          ),
          this.bind(i.buttons.captions, 'click', () => s.toggleCaptions()),
          this.bind(
            i.buttons.download,
            'click',
            () => {
              X.call(s, s.media, 'download');
            },
            'download',
          ),
          this.bind(
            i.buttons.fullscreen,
            'click',
            () => {
              s.fullscreen.toggle();
            },
            'fullscreen',
          ),
          this.bind(
            i.buttons.pip,
            'click',
            () => {
              s.pip = 'toggle';
            },
            'pip',
          ),
          this.bind(i.buttons.airplay, 'click', s.airplay, 'airplay'),
          this.bind(
            i.buttons.settings,
            'click',
            (r) => {
              (r.stopPropagation(),
                r.preventDefault(),
                I.toggleMenu.call(s, r));
            },
            null,
            !1,
          ),
          this.bind(
            i.buttons.settings,
            'keyup',
            (r) => {
              if ([' ', 'Enter'].includes(r.key)) {
                if (r.key === 'Enter') {
                  I.focusFirstMenuItem.call(s, null, !0);
                  return;
                }
                (r.preventDefault(),
                  r.stopPropagation(),
                  I.toggleMenu.call(s, r));
              }
            },
            null,
            !1,
          ),
          this.bind(i.settings.menu, 'keydown', (r) => {
            r.key === 'Escape' && I.toggleMenu.call(s, r);
          }),
          this.bind(i.inputs.seek, 'mousedown mousemove', (r) => {
            const o = i.progress.getBoundingClientRect(),
              l = r.pageX - r.clientX,
              a = (100 / o.width) * (r.pageX - o.left - l);
            r.currentTarget.setAttribute('seek-value', a);
          }),
          this.bind(
            i.inputs.seek,
            'mousedown mouseup keydown keyup touchstart touchend',
            (r) => {
              const o = r.currentTarget,
                l = 'play-on-seeked';
              if (
                d.keyboardEvent(r) &&
                !['ArrowLeft', 'ArrowRight'].includes(r.key)
              )
                return;
              s.lastSeekTime = Date.now();
              const a = o.hasAttribute(l),
                c = ['mouseup', 'touchend', 'keyup'].includes(r.type);
              a && c
                ? (o.removeAttribute(l), gt(s.play()))
                : !c && s.playing && (o.setAttribute(l, ''), s.pause());
            },
          ),
          Ie.isIos)
        ) {
          const r = Fs.call(s, 'input[type="range"]');
          Array.from(r).forEach((o) => this.bind(o, n, (l) => jl(l.target)));
        }
        (this.bind(
          i.inputs.seek,
          n,
          (r) => {
            const o = r.currentTarget;
            let l = o.getAttribute('seek-value');
            (d.empty(l) && (l = o.value),
              o.removeAttribute('seek-value'),
              (s.currentTime = (l / o.max) * s.duration));
          },
          'seek',
        ),
          this.bind(i.progress, 'mouseenter mouseleave mousemove', (r) =>
            I.updateSeekTooltip.call(s, r),
          ),
          this.bind(i.progress, 'mousemove touchmove', (r) => {
            const { previewThumbnails: o } = s;
            o && o.loaded && o.startMove(r);
          }),
          this.bind(i.progress, 'mouseleave touchend click', () => {
            const { previewThumbnails: r } = s;
            r && r.loaded && r.endMove(!1, !0);
          }),
          this.bind(i.progress, 'mousedown touchstart', (r) => {
            const { previewThumbnails: o } = s;
            o && o.loaded && o.startScrubbing(r);
          }),
          this.bind(i.progress, 'mouseup touchend', (r) => {
            const { previewThumbnails: o } = s;
            o && o.loaded && o.endScrubbing(r);
          }),
          Ie.isWebKit &&
            Array.from(Fs.call(s, 'input[type="range"]')).forEach((r) => {
              this.bind(r, 'input', (o) => I.updateRangeFill.call(s, o.target));
            }),
          s.config.toggleInvert &&
            !d.element(i.display.duration) &&
            this.bind(i.display.currentTime, 'click', () => {
              s.currentTime !== 0 &&
                ((s.config.invertTime = !s.config.invertTime),
                I.timeUpdate.call(s));
            }),
          this.bind(
            i.inputs.volume,
            n,
            (r) => {
              s.volume = r.target.value;
            },
            'volume',
          ),
          this.bind(i.controls, 'mouseenter mouseleave', (r) => {
            i.controls.hover = !s.touch && r.type === 'mouseenter';
          }),
          i.fullscreen &&
            Array.from(i.fullscreen.children)
              .filter((r) => !r.contains(i.container))
              .forEach((r) => {
                this.bind(r, 'mouseenter mouseleave', (o) => {
                  i.controls &&
                    (i.controls.hover = !s.touch && o.type === 'mouseenter');
                });
              }),
          this.bind(
            i.controls,
            'mousedown mouseup touchstart touchend touchcancel',
            (r) => {
              i.controls.pressed = ['mousedown', 'touchstart'].includes(r.type);
            },
          ),
          this.bind(i.controls, 'focusin', () => {
            const { config: r, timers: o } = s;
            (de(i.controls, r.classNames.noTransition, !0),
              ge.toggleControls.call(s, !0),
              setTimeout(() => {
                de(i.controls, r.classNames.noTransition, !1);
              }, 0));
            const l = this.touch ? 3e3 : 4e3;
            (clearTimeout(o.controls),
              (o.controls = setTimeout(
                () => ge.toggleControls.call(s, !1),
                l,
              )));
          }),
          this.bind(
            i.inputs.volume,
            'wheel',
            (r) => {
              const o = r.webkitDirectionInvertedFromDevice,
                [l, a] = [r.deltaX, -r.deltaY].map((f) => (o ? -f : f)),
                c = Math.sign(Math.abs(l) > Math.abs(a) ? l : a);
              s.increaseVolume(c / 50);
              const { volume: u } = s.media;
              ((c === 1 && u < 1) || (c === -1 && u > 0)) && r.preventDefault();
            },
            'volume',
            !1,
          ));
      }),
      (this.player = t),
      (this.lastKey = null),
      (this.focusTimer = null),
      (this.lastKeyDown = null),
      (this.handleKey = this.handleKey.bind(this)),
      (this.toggleMenu = this.toggleMenu.bind(this)),
      (this.firstTouch = this.firstTouch.bind(this)));
  }
  handleKey(t) {
    const { player: s } = this,
      { elements: i } = s,
      { key: n, type: r, altKey: o, ctrlKey: l, metaKey: a, shiftKey: c } = t,
      u = r === 'keydown',
      f = u && n === this.lastKey;
    if (o || l || a || c || !n) return;
    const p = (y) => {
      s.currentTime = (s.duration / 10) * y;
    };
    if (u) {
      const y = document.activeElement;
      if (d.element(y)) {
        const { editable: v } = s.config.selectors,
          { seek: x } = i.inputs;
        if (
          (y !== x && Qt(y, v)) ||
          (t.key === ' ' && Qt(y, 'button, [role^="menuitem"]'))
        )
          return;
      }
      switch (
        ([
          ' ',
          'ArrowLeft',
          'ArrowUp',
          'ArrowRight',
          'ArrowDown',
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'c',
          'f',
          'k',
          'l',
          'm',
        ].includes(n) && (t.preventDefault(), t.stopPropagation()),
        n)
      ) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          f || p(Number.parseInt(n, 10));
          break;
        case ' ':
        case 'k':
          f || gt(s.togglePlay());
          break;
        case 'ArrowUp':
          s.increaseVolume(0.1);
          break;
        case 'ArrowDown':
          s.decreaseVolume(0.1);
          break;
        case 'm':
          f || (s.muted = !s.muted);
          break;
        case 'ArrowRight':
          s.forward();
          break;
        case 'ArrowLeft':
          s.rewind();
          break;
        case 'f':
          s.fullscreen.toggle();
          break;
        case 'c':
          f || s.toggleCaptions();
          break;
        case 'l':
          s.loop = !s.loop;
          break;
      }
      (n === 'Escape' &&
        !s.fullscreen.usingNative &&
        s.fullscreen.active &&
        s.fullscreen.toggle(),
        (this.lastKey = n));
    } else this.lastKey = null;
  }
  toggleMenu(t) {
    I.toggleMenu.call(this.player, t);
  }
}
function Gf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var ui = { exports: {} },
  Jf = ui.exports,
  ao;
function Xf() {
  return (
    ao ||
      ((ao = 1),
      (function (e, t) {
        (function (s, i) {
          e.exports = i();
        })(Jf, function () {
          var s = function () {},
            i = {},
            n = {},
            r = {};
          function o(p, y) {
            p = p.push ? p : [p];
            var k = [],
              v = p.length,
              x = v,
              M,
              b,
              P,
              T;
            for (
              M = function (V, K) {
                (K.length && k.push(V), x--, x || y(k));
              };
              v--;
            ) {
              if (((b = p[v]), (P = n[b]), P)) {
                M(b, P);
                continue;
              }
              ((T = r[b] = r[b] || []), T.push(M));
            }
          }
          function l(p, y) {
            if (p) {
              var k = r[p];
              if (((n[p] = y), !!k))
                for (; k.length; ) (k[0](p, y), k.splice(0, 1));
            }
          }
          function a(p, y) {
            (p.call && (p = { success: p }),
              y.length ? (p.error || s)(y) : (p.success || s)(p));
          }
          function c(p, y, k, v) {
            var x = document,
              M = k.async,
              b = (k.numRetries || 0) + 1,
              P = k.before || s,
              T = p.replace(/[\?|#].*$/, ''),
              V = p.replace(/^(css|img|module|nomodule)!/, ''),
              K,
              G,
              O;
            if (((v = v || 0), /(^css!|\.css$)/.test(T)))
              ((O = x.createElement('link')),
                (O.rel = 'stylesheet'),
                (O.href = V),
                (K = 'hideFocus' in O),
                K &&
                  O.relList &&
                  ((K = 0), (O.rel = 'preload'), (O.as = 'style')));
            else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(T))
              ((O = x.createElement('img')), (O.src = V));
            else if (
              ((O = x.createElement('script')),
              (O.src = V),
              (O.async = M === void 0 ? !0 : M),
              (G = 'noModule' in O),
              /^module!/.test(T))
            ) {
              if (!G) return y(p, 'l');
              O.type = 'module';
            } else if (/^nomodule!/.test(T) && G) return y(p, 'l');
            ((O.onload =
              O.onerror =
              O.onbeforeload =
                function (j) {
                  var ee = j.type[0];
                  if (K)
                    try {
                      O.sheet.cssText.length || (ee = 'e');
                    } catch (oe) {
                      oe.code != 18 && (ee = 'e');
                    }
                  if (ee == 'e') {
                    if (((v += 1), v < b)) return c(p, y, k, v);
                  } else if (O.rel == 'preload' && O.as == 'style')
                    return (O.rel = 'stylesheet');
                  y(p, ee, j.defaultPrevented);
                }),
              P(p, O) !== !1 && x.head.appendChild(O));
          }
          function u(p, y, k) {
            p = p.push ? p : [p];
            var v = p.length,
              x = v,
              M = [],
              b,
              P;
            for (
              b = function (T, V, K) {
                if ((V == 'e' && M.push(T), V == 'b'))
                  if (K) M.push(T);
                  else return;
                (v--, v || y(M));
              },
                P = 0;
              P < x;
              P++
            )
              c(p[P], b, k);
          }
          function f(p, y, k) {
            var v, x;
            if ((y && y.trim && (v = y), (x = (v ? k : y) || {}), v)) {
              if (v in i) throw 'LoadJS';
              i[v] = !0;
            }
            function M(b, P) {
              u(
                p,
                function (T) {
                  (a(x, T), b && a({ success: b, error: P }, T), l(v, T));
                },
                x,
              );
            }
            if (x.returnPromise) return new Promise(M);
            M();
          }
          return (
            (f.ready = function (y, k) {
              return (
                o(y, function (v) {
                  a(k, v);
                }),
                f
              );
            }),
            (f.done = function (y) {
              l(y, []);
            }),
            (f.reset = function () {
              ((i = {}), (n = {}), (r = {}));
            }),
            (f.isDefined = function (y) {
              return y in i;
            }),
            f
          );
        });
      })(ui)),
    ui.exports
  );
}
var Qf = Xf(),
  Zf = Gf(Qf);
function rr(e) {
  return new Promise((t, s) => {
    Zf(e, { success: t, error: s });
  });
}
function eh(e) {
  if (d.empty(e)) return null;
  if (d.number(Number(e))) return e;
  const t = /^.*(vimeo.com\/|video\/)(\d+).*/,
    s = e.match(t);
  return s ? s[2] : e;
}
function th(e) {
  const t = /^.*(vimeo.com\/|video\/)(\d+)(\?.*h=|\/)+([\d,a-f]+)/,
    s = e.match(t);
  return s && s.length === 5 ? s[4] : null;
}
function ys(e) {
  (e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0),
    this.media.paused === e &&
      ((this.media.paused = !e),
      X.call(this, this.media, e ? 'play' : 'pause')));
}
const Nn = {
  setup() {
    const e = this;
    (de(e.elements.wrapper, e.config.classNames.embed, !0),
      (e.options.speed = e.config.speed.options),
      hs.call(e),
      d.object(window.Vimeo)
        ? Nn.ready.call(e)
        : rr(e.config.urls.vimeo.sdk)
            .then(() => {
              Nn.ready.call(e);
            })
            .catch((t) => {
              e.debug.warn('Vimeo SDK (player.js) failed to load', t);
            }));
  },
  ready() {
    const e = this,
      t = e.config.vimeo,
      { premium: s, referrerPolicy: i, ...n } = t;
    let r = e.media.getAttribute('src'),
      o = '';
    d.empty(r)
      ? ((r = e.media.getAttribute(e.config.attributes.embed.id)),
        (o = e.media.getAttribute(e.config.attributes.embed.hash)))
      : (o = th(r));
    const l = o ? { h: o } : {};
    s && Object.assign(n, { controls: !1, sidedock: !1 });
    const a = Jl({
        loop: e.config.loop.active,
        autoplay: e.autoplay,
        muted: e.muted,
        gesture: 'media',
        playsinline: e.config.playsinline,
        ...l,
        ...n,
      }),
      c = eh(r),
      u = J('iframe'),
      f = Pn(e.config.urls.vimeo.iframe, c, a);
    if (
      (u.setAttribute('src', f),
      u.setAttribute('allowfullscreen', ''),
      u.setAttribute(
        'allow',
        [
          'autoplay',
          'fullscreen',
          'picture-in-picture',
          'encrypted-media',
          'accelerometer',
          'gyroscope',
        ].join('; '),
      ),
      d.empty(i) || u.setAttribute('referrerPolicy', i),
      s || !t.customControls)
    )
      (u.setAttribute('data-poster', e.poster), (e.media = Ti(u, e.media)));
    else {
      const b = J('div', {
        'class': e.config.classNames.embedContainer,
        'data-poster': e.poster,
      });
      (b.appendChild(u), (e.media = Ti(b, e.media)));
    }
    (t.customControls ||
      Ys(Pn(e.config.urls.vimeo.api, f)).then((b) => {
        d.empty(b) ||
          !b.thumbnail_url ||
          ge.setPoster.call(e, b.thumbnail_url).catch(() => {});
      }),
      (e.embed = new window.Vimeo.Player(u, {
        autopause: e.config.autopause,
        muted: e.muted,
      })),
      (e.media.paused = !0),
      (e.media.currentTime = 0),
      e.supported.ui && e.embed.disableTextTrack(),
      (e.media.play = () => (ys.call(e, !0), e.embed.play())),
      (e.media.pause = () => (ys.call(e, !1), e.embed.pause())),
      (e.media.stop = () => {
        (e.pause(), (e.currentTime = 0));
      }));
    let { currentTime: p } = e.media;
    Object.defineProperty(e.media, 'currentTime', {
      get() {
        return p;
      },
      set(b) {
        const { embed: P, media: T, paused: V, volume: K } = e,
          G = V && !P.hasPlayed;
        ((T.seeking = !0),
          X.call(e, T, 'seeking'),
          Promise.resolve(G && P.setVolume(0))
            .then(() => P.setCurrentTime(b))
            .then(() => G && P.pause())
            .then(() => G && P.setVolume(K))
            .catch(() => {}));
      },
    });
    let y = e.config.speed.selected;
    Object.defineProperty(e.media, 'playbackRate', {
      get() {
        return y;
      },
      set(b) {
        e.embed
          .setPlaybackRate(b)
          .then(() => {
            ((y = b), X.call(e, e.media, 'ratechange'));
          })
          .catch(() => {
            e.options.speed = [1];
          });
      },
    });
    let { volume: k } = e.config;
    Object.defineProperty(e.media, 'volume', {
      get() {
        return k;
      },
      set(b) {
        e.embed.setVolume(b).then(() => {
          ((k = b), X.call(e, e.media, 'volumechange'));
        });
      },
    });
    let { muted: v } = e.config;
    Object.defineProperty(e.media, 'muted', {
      get() {
        return v;
      },
      set(b) {
        const P = d.boolean(b) ? b : !1;
        e.embed.setMuted(P ? !0 : e.config.muted).then(() => {
          ((v = P), X.call(e, e.media, 'volumechange'));
        });
      },
    });
    let { loop: x } = e.config;
    Object.defineProperty(e.media, 'loop', {
      get() {
        return x;
      },
      set(b) {
        const P = d.boolean(b) ? b : e.config.loop.active;
        e.embed.setLoop(P).then(() => {
          x = P;
        });
      },
    });
    let M;
    (e.embed
      .getVideoUrl()
      .then((b) => {
        ((M = b), I.setDownloadUrl.call(e));
      })
      .catch((b) => {
        this.debug.warn(b);
      }),
      Object.defineProperty(e.media, 'currentSrc', {
        get() {
          return M;
        },
      }),
      Object.defineProperty(e.media, 'ended', {
        get() {
          return e.currentTime === e.duration;
        },
      }),
      Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then(
        (b) => {
          const [P, T] = b;
          ((e.embed.ratio = Kl(P, T)), hs.call(this));
        },
      ),
      e.embed.setAutopause(e.config.autopause).then((b) => {
        e.config.autopause = b;
      }),
      e.embed.getVideoTitle().then((b) => {
        ((e.config.title = b), ge.setTitle.call(this));
      }),
      e.embed.getCurrentTime().then((b) => {
        ((p = b), X.call(e, e.media, 'timeupdate'));
      }),
      e.embed.getDuration().then((b) => {
        ((e.media.duration = b), X.call(e, e.media, 'durationchange'));
      }),
      e.embed.getTextTracks().then((b) => {
        ((e.media.textTracks = b), ae.setup.call(e));
      }),
      e.embed.on('cuechange', ({ cues: b = [] }) => {
        const P = b.map((T) => Vf(T.text));
        ae.updateCues.call(e, P);
      }),
      e.embed.on('loaded', () => {
        (e.embed.getPaused().then((b) => {
          (ys.call(e, !b), b || X.call(e, e.media, 'playing'));
        }),
          d.element(e.embed.element) &&
            e.supported.ui &&
            e.embed.element.setAttribute('tabindex', -1));
      }),
      e.embed.on('bufferstart', () => {
        X.call(e, e.media, 'waiting');
      }),
      e.embed.on('bufferend', () => {
        X.call(e, e.media, 'playing');
      }),
      e.embed.on('play', () => {
        (ys.call(e, !0), X.call(e, e.media, 'playing'));
      }),
      e.embed.on('pause', () => {
        ys.call(e, !1);
      }),
      e.embed.on('timeupdate', (b) => {
        ((e.media.seeking = !1),
          (p = b.seconds),
          X.call(e, e.media, 'timeupdate'));
      }),
      e.embed.on('progress', (b) => {
        ((e.media.buffered = b.percent),
          X.call(e, e.media, 'progress'),
          Number.parseInt(b.percent, 10) === 1 &&
            X.call(e, e.media, 'canplaythrough'),
          e.embed.getDuration().then((P) => {
            P !== e.media.duration &&
              ((e.media.duration = P), X.call(e, e.media, 'durationchange'));
          }));
      }),
      e.embed.on('seeked', () => {
        ((e.media.seeking = !1), X.call(e, e.media, 'seeked'));
      }),
      e.embed.on('ended', () => {
        ((e.media.paused = !0), X.call(e, e.media, 'ended'));
      }),
      e.embed.on('error', (b) => {
        ((e.media.error = b), X.call(e, e.media, 'error'));
      }),
      t.customControls && setTimeout(() => ge.build.call(e), 0));
  },
};
function sh(e) {
  if (d.empty(e)) return null;
  const t = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
    s = e.match(t);
  return s && s[2] ? s[2] : e;
}
function vs(e) {
  (e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0),
    this.media.paused === e &&
      ((this.media.paused = !e),
      X.call(this, this.media, e ? 'play' : 'pause')));
}
function ih(e) {
  if (e.noCookie) return 'https://www.youtube-nocookie.com';
  if (window.location.protocol === 'http:') return 'http://www.youtube.com';
}
const di = {
    setup() {
      if (
        (de(this.elements.wrapper, this.config.classNames.embed, !0),
        d.object(window.YT) && d.function(window.YT.Player))
      )
        di.ready.call(this);
      else {
        const e = window.onYouTubeIframeAPIReady;
        ((window.onYouTubeIframeAPIReady = () => {
          (d.function(e) && e(), di.ready.call(this));
        }),
          rr(this.config.urls.youtube.sdk).catch((t) => {
            this.debug.warn('YouTube API failed to load', t);
          }));
      }
    },
    getTitle(e) {
      const t = Pn(this.config.urls.youtube.api, e);
      Ys(t)
        .then((s) => {
          if (d.object(s)) {
            const { title: i, height: n, width: r } = s;
            ((this.config.title = i),
              ge.setTitle.call(this),
              (this.embed.ratio = Kl(r, n)));
          }
          hs.call(this);
        })
        .catch(() => {
          hs.call(this);
        });
    },
    ready() {
      const e = this,
        t = e.config.youtube,
        s = e.media && e.media.getAttribute('id');
      if (!d.empty(s) && s.startsWith('youtube-')) return;
      let i = e.media.getAttribute('src');
      d.empty(i) && (i = e.media.getAttribute(this.config.attributes.embed.id));
      const n = sh(i),
        r = Ff(e.provider),
        o = J('div', {
          'id': r,
          'data-poster': t.customControls ? e.poster : void 0,
        });
      if (((e.media = Ti(o, e.media)), t.customControls)) {
        const l = (a) => `https://i.ytimg.com/vi/${n}/${a}default.jpg`;
        ci(l('maxres'), 121)
          .catch(() => ci(l('sd'), 121))
          .catch(() => ci(l('hq')))
          .then((a) => ge.setPoster.call(e, a.src))
          .then((a) => {
            a.includes('maxres') ||
              (e.elements.poster.style.backgroundSize = 'cover');
          })
          .catch(() => {});
      }
      e.embed = new window.YT.Player(e.media, {
        videoId: n,
        host: ih(t),
        playerVars: Se(
          {},
          {
            autoplay: e.config.autoplay ? 1 : 0,
            hl: e.config.hl,
            controls: e.supported.ui && t.customControls ? 0 : 1,
            disablekb: 1,
            playsinline:
              e.config.playsinline && !e.config.fullscreen.iosNative ? 1 : 0,
            cc_load_policy: e.captions.active ? 1 : 0,
            cc_lang_pref: e.config.captions.language,
            widget_referrer: window ? window.location.href : null,
          },
          t,
        ),
        events: {
          onError(l) {
            if (!e.media.error) {
              const a = l.data,
                c =
                  {
                    2: 'The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.',
                    5: 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.',
                    100: 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.',
                    101: 'The owner of the requested video does not allow it to be played in embedded players.',
                    150: 'The owner of the requested video does not allow it to be played in embedded players.',
                  }[a] || 'An unknown error occurred';
              ((e.media.error = { code: a, message: c }),
                X.call(e, e.media, 'error'));
            }
          },
          onPlaybackRateChange(l) {
            const a = l.target;
            ((e.media.playbackRate = a.getPlaybackRate()),
              X.call(e, e.media, 'ratechange'));
          },
          onReady(l) {
            if (d.function(e.media.play)) return;
            const a = l.target;
            (di.getTitle.call(e, n),
              (e.media.play = () => {
                (vs.call(e, !0), a.playVideo());
              }),
              (e.media.pause = () => {
                (vs.call(e, !1), a.pauseVideo());
              }),
              (e.media.stop = () => {
                a.stopVideo();
              }),
              (e.media.duration = a.getDuration()),
              (e.media.paused = !0),
              (e.media.currentTime = 0),
              Object.defineProperty(e.media, 'currentTime', {
                get() {
                  return Number(a.getCurrentTime());
                },
                set(p) {
                  (e.paused && !e.embed.hasPlayed && e.embed.mute(),
                    (e.media.seeking = !0),
                    X.call(e, e.media, 'seeking'),
                    a.seekTo(p));
                },
              }),
              Object.defineProperty(e.media, 'playbackRate', {
                get() {
                  return a.getPlaybackRate();
                },
                set(p) {
                  a.setPlaybackRate(p);
                },
              }));
            let { volume: c } = e.config;
            Object.defineProperty(e.media, 'volume', {
              get() {
                return c;
              },
              set(p) {
                ((c = p),
                  a.setVolume(c * 100),
                  X.call(e, e.media, 'volumechange'));
              },
            });
            let { muted: u } = e.config;
            (Object.defineProperty(e.media, 'muted', {
              get() {
                return u;
              },
              set(p) {
                const y = d.boolean(p) ? p : u;
                ((u = y),
                  a[y ? 'mute' : 'unMute'](),
                  a.setVolume(c * 100),
                  X.call(e, e.media, 'volumechange'));
              },
            }),
              Object.defineProperty(e.media, 'currentSrc', {
                get() {
                  return a.getVideoUrl();
                },
              }),
              Object.defineProperty(e.media, 'ended', {
                get() {
                  return e.currentTime === e.duration;
                },
              }));
            const f = a.getAvailablePlaybackRates();
            ((e.options.speed = f.filter((p) =>
              e.config.speed.options.includes(p),
            )),
              e.supported.ui &&
                t.customControls &&
                e.media.setAttribute('tabindex', -1),
              X.call(e, e.media, 'timeupdate'),
              X.call(e, e.media, 'durationchange'),
              clearInterval(e.timers.buffering),
              (e.timers.buffering = setInterval(() => {
                ((e.media.buffered = a.getVideoLoadedFraction()),
                  (e.media.lastBuffered === null ||
                    e.media.lastBuffered < e.media.buffered) &&
                    X.call(e, e.media, 'progress'),
                  (e.media.lastBuffered = e.media.buffered),
                  e.media.buffered === 1 &&
                    (clearInterval(e.timers.buffering),
                    X.call(e, e.media, 'canplaythrough')));
              }, 200)),
              t.customControls && setTimeout(() => ge.build.call(e), 50));
          },
          onStateChange(l) {
            const a = l.target;
            switch (
              (clearInterval(e.timers.playing),
              e.media.seeking &&
                [1, 2].includes(l.data) &&
                ((e.media.seeking = !1), X.call(e, e.media, 'seeked')),
              l.data)
            ) {
              case -1:
                (X.call(e, e.media, 'timeupdate'),
                  (e.media.buffered = a.getVideoLoadedFraction()),
                  X.call(e, e.media, 'progress'));
                break;
              case 0:
                (vs.call(e, !1),
                  e.media.loop
                    ? (a.stopVideo(), a.playVideo())
                    : X.call(e, e.media, 'ended'));
                break;
              case 1:
                t.customControls &&
                !e.config.autoplay &&
                e.media.paused &&
                !e.embed.hasPlayed
                  ? e.media.pause()
                  : (vs.call(e, !0),
                    X.call(e, e.media, 'playing'),
                    (e.timers.playing = setInterval(() => {
                      X.call(e, e.media, 'timeupdate');
                    }, 50)),
                    e.media.duration !== a.getDuration() &&
                      ((e.media.duration = a.getDuration()),
                      X.call(e, e.media, 'durationchange')));
                break;
              case 2:
                (e.muted || e.embed.unMute(), vs.call(e, !1));
                break;
              case 3:
                X.call(e, e.media, 'waiting');
                break;
            }
            X.call(e, e.elements.container, 'statechange', !1, {
              code: l.data,
            });
          },
        },
      });
    },
  },
  Ql = {
    setup() {
      if (!this.media) {
        this.debug.warn('No media element found!');
        return;
      }
      (de(
        this.elements.container,
        this.config.classNames.type.replace('{0}', this.type),
        !0,
      ),
        de(
          this.elements.container,
          this.config.classNames.provider.replace('{0}', this.provider),
          !0,
        ),
        this.isEmbed &&
          de(
            this.elements.container,
            this.config.classNames.type.replace('{0}', 'video'),
            !0,
          ),
        this.isVideo &&
          ((this.elements.wrapper = J('div', {
            class: this.config.classNames.video,
          })),
          Bl(this.media, this.elements.wrapper),
          (this.elements.poster = J('div', {
            class: this.config.classNames.poster,
          })),
          this.elements.wrapper.appendChild(this.elements.poster)),
        this.isHTML5
          ? Ft.setup.call(this)
          : this.isYouTube
            ? di.setup.call(this)
            : this.isVimeo && Nn.setup.call(this));
    },
  };
function nh(e) {
  (e.manager && e.manager.destroy(),
    e.elements.displayContainer && e.elements.displayContainer.destroy(),
    e.elements.container.remove());
}
class rh {
  constructor(t) {
    (D(this, 'load', () => {
      this.enabled &&
        (!d.object(window.google) || !d.object(window.google.ima)
          ? rr(this.player.config.urls.googleIMA.sdk)
              .then(() => {
                this.ready();
              })
              .catch(() => {
                this.trigger(
                  'error',
                  new Error('Google IMA SDK failed to load'),
                );
              })
          : this.ready());
    }),
      D(this, 'ready', () => {
        (this.enabled || nh(this),
          this.startSafetyTimer(12e3, 'ready()'),
          this.managerPromise.then(() => {
            this.clearSafetyTimer('onAdsManagerLoaded()');
          }),
          this.listeners(),
          this.setupIMA());
      }),
      D(this, 'setupIMA', () => {
        ((this.elements.container = J('div', {
          class: this.player.config.classNames.ads,
        })),
          this.player.elements.container.appendChild(this.elements.container),
          google.ima.settings.setVpaidMode(
            google.ima.ImaSdkSettings.VpaidMode.ENABLED,
          ),
          google.ima.settings.setLocale(this.player.config.ads.language),
          google.ima.settings.setDisableCustomPlaybackForIOS10Plus(
            this.player.config.playsinline,
          ),
          (this.elements.displayContainer = new google.ima.AdDisplayContainer(
            this.elements.container,
            this.player.media,
          )),
          (this.loader = new google.ima.AdsLoader(
            this.elements.displayContainer,
          )),
          this.loader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            (s) => this.onAdsManagerLoaded(s),
            !1,
          ),
          this.loader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            (s) => this.onAdError(s),
            !1,
          ),
          this.requestAds());
      }),
      D(this, 'requestAds', () => {
        const { container: s } = this.player.elements;
        try {
          const i = new google.ima.AdsRequest();
          ((i.adTagUrl = this.tagUrl),
            (i.linearAdSlotWidth = s.offsetWidth),
            (i.linearAdSlotHeight = s.offsetHeight),
            (i.nonLinearAdSlotWidth = s.offsetWidth),
            (i.nonLinearAdSlotHeight = s.offsetHeight),
            (i.forceNonLinearFullSlot = !1),
            i.setAdWillPlayMuted(!this.player.muted),
            this.loader.requestAds(i));
        } catch (i) {
          this.onAdError(i);
        }
      }),
      D(this, 'pollCountdown', (s = !1) => {
        if (!s) {
          (clearInterval(this.countdownTimer),
            this.elements.container.removeAttribute('data-badge-text'));
          return;
        }
        const i = () => {
          const n = qi(Math.max(this.manager.getRemainingTime(), 0)),
            r = `${$e.get('advertisement', this.player.config)} - ${n}`;
          this.elements.container.setAttribute('data-badge-text', r);
        };
        this.countdownTimer = setInterval(i, 100);
      }),
      D(this, 'onAdsManagerLoaded', (s) => {
        if (!this.enabled) return;
        const i = new google.ima.AdsRenderingSettings();
        ((i.restoreCustomPlaybackStateOnAdBreakComplete = !0),
          (i.enablePreloading = !0),
          (this.manager = s.getAdsManager(this.player, i)),
          (this.cuePoints = this.manager.getCuePoints()),
          this.manager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            (n) => this.onAdError(n),
          ),
          Object.keys(google.ima.AdEvent.Type).forEach((n) => {
            this.manager.addEventListener(google.ima.AdEvent.Type[n], (r) =>
              this.onAdEvent(r),
            );
          }),
          this.trigger('loaded'));
      }),
      D(this, 'addCuePoints', () => {
        d.empty(this.cuePoints) ||
          this.cuePoints.forEach((s) => {
            if (s !== 0 && s !== -1 && s < this.player.duration) {
              const i = this.player.elements.progress;
              if (d.element(i)) {
                const n = (100 / this.player.duration) * s,
                  r = J('span', { class: this.player.config.classNames.cues });
                ((r.style.left = `${n.toString()}%`), i.appendChild(r));
              }
            }
          });
      }),
      D(this, 'onAdEvent', (s) => {
        const { container: i } = this.player.elements,
          n = s.getAd(),
          r = s.getAdData();
        switch (
          (((l) => {
            X.call(
              this.player,
              this.player.media,
              `ads${l.replace(/_/g, '').toLowerCase()}`,
            );
          })(s.type),
          s.type)
        ) {
          case google.ima.AdEvent.Type.LOADED:
            (this.trigger('loaded'),
              this.pollCountdown(!0),
              n.isLinear() ||
                ((n.width = i.offsetWidth), (n.height = i.offsetHeight)));
            break;
          case google.ima.AdEvent.Type.STARTED:
            this.manager.setVolume(this.player.volume);
            break;
          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            this.player.ended ? this.loadAds() : this.loader.contentComplete();
            break;
          case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            this.pauseContent();
            break;
          case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            (this.pollCountdown(), this.resumeContent());
            break;
          case google.ima.AdEvent.Type.LOG:
            r.adError &&
              this.player.debug.warn(
                `Non-fatal ad error: ${r.adError.getMessage()}`,
              );
            break;
        }
      }),
      D(this, 'onAdError', (s) => {
        (this.cancel(), this.player.debug.warn('Ads error', s));
      }),
      D(this, 'listeners', () => {
        const { container: s } = this.player.elements;
        let i;
        (this.player.on('canplay', () => {
          this.addCuePoints();
        }),
          this.player.on('ended', () => {
            this.loader.contentComplete();
          }),
          this.player.on('timeupdate', () => {
            i = this.player.currentTime;
          }),
          this.player.on('seeked', () => {
            const n = this.player.currentTime;
            d.empty(this.cuePoints) ||
              this.cuePoints.forEach((r, o) => {
                i < r &&
                  r < n &&
                  (this.manager.discardAdBreak(), this.cuePoints.splice(o, 1));
              });
          }),
          window.addEventListener('resize', () => {
            this.manager &&
              this.manager.resize(
                s.offsetWidth,
                s.offsetHeight,
                google.ima.ViewMode.NORMAL,
              );
          }));
      }),
      D(this, 'play', () => {
        const { container: s } = this.player.elements;
        (this.managerPromise || this.resumeContent(),
          this.managerPromise
            .then(() => {
              (this.manager.setVolume(this.player.volume),
                this.elements.displayContainer.initialize());
              try {
                (this.initialized ||
                  (this.manager.init(
                    s.offsetWidth,
                    s.offsetHeight,
                    google.ima.ViewMode.NORMAL,
                  ),
                  this.manager.start()),
                  (this.initialized = !0));
              } catch (i) {
                this.onAdError(i);
              }
            })
            .catch(() => {}));
      }),
      D(this, 'resumeContent', () => {
        ((this.elements.container.style.zIndex = ''),
          (this.playing = !1),
          gt(this.player.media.play()));
      }),
      D(this, 'pauseContent', () => {
        ((this.elements.container.style.zIndex = 3),
          (this.playing = !0),
          this.player.media.pause());
      }),
      D(this, 'cancel', () => {
        (this.initialized && this.resumeContent(),
          this.trigger('error'),
          this.loadAds());
      }),
      D(this, 'loadAds', () => {
        this.managerPromise
          .then(() => {
            (this.manager && this.manager.destroy(),
              (this.managerPromise = new Promise((s) => {
                (this.on('loaded', s), this.player.debug.log(this.manager));
              })),
              (this.initialized = !1),
              this.requestAds());
          })
          .catch(() => {});
      }),
      D(this, 'trigger', (s, ...i) => {
        const n = this.events[s];
        d.array(n) &&
          n.forEach((r) => {
            d.function(r) && r.apply(this, i);
          });
      }),
      D(
        this,
        'on',
        (s, i) => (
          d.array(this.events[s]) || (this.events[s] = []),
          this.events[s].push(i),
          this
        ),
      ),
      D(this, 'startSafetyTimer', (s, i) => {
        (this.player.debug.log(`Safety timer invoked from: ${i}`),
          (this.safetyTimer = setTimeout(() => {
            (this.cancel(), this.clearSafetyTimer('startSafetyTimer()'));
          }, s)));
      }),
      D(this, 'clearSafetyTimer', (s) => {
        d.nullOrUndefined(this.safetyTimer) ||
          (this.player.debug.log(`Safety timer cleared from: ${s}`),
          clearTimeout(this.safetyTimer),
          (this.safetyTimer = null));
      }),
      (this.player = t),
      (this.config = t.config.ads),
      (this.playing = !1),
      (this.initialized = !1),
      (this.elements = { container: null, displayContainer: null }),
      (this.manager = null),
      (this.loader = null),
      (this.cuePoints = null),
      (this.events = {}),
      (this.safetyTimer = null),
      (this.countdownTimer = null),
      (this.managerPromise = new Promise((s, i) => {
        (this.on('loaded', s), this.on('error', i));
      })),
      this.load());
  }
  get enabled() {
    const { config: t } = this;
    return (
      this.player.isHTML5 &&
      this.player.isVideo &&
      t.enabled &&
      (!d.empty(t.publisherId) || d.url(t.tagUrl))
    );
  }
  get tagUrl() {
    const { config: t } = this;
    if (d.url(t.tagUrl)) return t.tagUrl;
    const s = {
      AV_PUBLISHERID: '58c25bb0073ef448b1087ad6',
      AV_CHANNELID: '5a0458dc28a06145e4519d21',
      AV_URL: window.location.hostname,
      cb: Date.now(),
      AV_WIDTH: 640,
      AV_HEIGHT: 480,
      AV_CDIM2: t.publisherId,
    };
    return `https://go.aniview.com/api/adserver6/vast/?${Jl(s)}`;
  }
}
function Zl(e = 0, t = 0, s = 255) {
  return Math.min(Math.max(e, t), s);
}
function oh(e) {
  const t = [];
  return (
    e.split(/\r\n\r\n|\n\n|\r\r/).forEach((i) => {
      const n = {};
      (i.split(/\r\n|\n|\r/).forEach((o) => {
        if (d.number(n.startTime)) {
          if (!d.empty(o.trim()) && d.empty(n.text)) {
            const l = o.trim().split('#xywh=');
            (([n.text] = l), l[1] && ([n.x, n.y, n.w, n.h] = l[1].split(',')));
          }
        } else {
          const l = o.match(
            /(\d{2})?:?(\d{2}):(\d{2}).(\d{2,3})( ?--> ?)(\d{2})?:?(\d{2}):(\d{2}).(\d{2,3})/,
          );
          l &&
            ((n.startTime =
              Number(l[1] || 0) * 60 * 60 +
              Number(l[2]) * 60 +
              Number(l[3]) +
              +`0.${l[4]}`),
            (n.endTime =
              Number(l[6] || 0) * 60 * 60 +
              Number(l[7]) * 60 +
              Number(l[8]) +
              +`0.${l[9]}`));
        }
      }),
        n.text && t.push(n));
    }),
    t
  );
}
function co(e, t) {
  const s = t.width / t.height,
    i = {};
  return (
    e > s
      ? ((i.width = t.width), (i.height = (1 / e) * t.width))
      : ((i.height = t.height), (i.width = e * t.height)),
    i
  );
}
class Ln {
  constructor(t) {
    (D(this, 'load', () => {
      (this.player.elements.display.seekTooltip &&
        (this.player.elements.display.seekTooltip.hidden = this.enabled),
        this.enabled &&
          this.getThumbnails().then(() => {
            this.enabled &&
              (this.render(),
              this.determineContainerAutoSizing(),
              this.listeners(),
              (this.loaded = !0));
          }));
    }),
      D(
        this,
        'getThumbnails',
        () =>
          new Promise((s) => {
            const { src: i } = this.player.config.previewThumbnails;
            if (d.empty(i))
              throw new Error('Missing previewThumbnails.src config attribute');
            const n = () => {
              (this.thumbnails.sort((r, o) => r.height - o.height),
                this.player.debug.log('Preview thumbnails', this.thumbnails),
                s());
            };
            if (d.function(i))
              i((r) => {
                ((this.thumbnails = r), n());
              });
            else {
              const o = (d.string(i) ? [i] : i).map((l) =>
                this.getThumbnail(l),
              );
              Promise.all(o).then(n);
            }
          }),
      ),
      D(
        this,
        'getThumbnail',
        (s) =>
          new Promise((i) => {
            Ys(
              s,
              void 0,
              this.player.config.previewThumbnails.withCredentials,
            ).then((n) => {
              const r = { frames: oh(n), height: null, urlPrefix: '' };
              !r.frames[0].text.startsWith('/') &&
                !r.frames[0].text.startsWith('http://') &&
                !r.frames[0].text.startsWith('https://') &&
                (r.urlPrefix = s.substring(0, s.lastIndexOf('/') + 1));
              const o = new Image();
              ((o.onload = () => {
                ((r.height = o.naturalHeight),
                  (r.width = o.naturalWidth),
                  this.thumbnails.push(r),
                  i());
              }),
                (o.src = r.urlPrefix + r.frames[0].text));
            });
          }),
      ),
      D(this, 'startMove', (s) => {
        if (
          this.loaded &&
          !(!d.event(s) || !['touchmove', 'mousemove'].includes(s.type)) &&
          this.player.media.duration
        ) {
          if (s.type === 'touchmove')
            this.seekTime =
              this.player.media.duration *
              (this.player.elements.inputs.seek.value / 100);
          else {
            var i, n;
            const r = this.player.elements.progress.getBoundingClientRect(),
              o = (100 / r.width) * (s.pageX - r.left);
            ((this.seekTime = this.player.media.duration * (o / 100)),
              this.seekTime < 0 && (this.seekTime = 0),
              this.seekTime > this.player.media.duration - 1 &&
                (this.seekTime = this.player.media.duration - 1),
              (this.mousePosX = s.pageX),
              (this.elements.thumb.time.textContent = qi(this.seekTime)));
            const l =
              (i = this.player.config.markers) === null ||
              i === void 0 ||
              (n = i.points) === null ||
              n === void 0
                ? void 0
                : n.find(({ time: a }) => a === Math.round(this.seekTime));
            l &&
              this.elements.thumb.time.insertAdjacentHTML(
                'afterbegin',
                `${l.label}<br>`,
              );
          }
          this.showImageAtCurrentTime();
        }
      }),
      D(this, 'endMove', () => {
        this.toggleThumbContainer(!1, !0);
      }),
      D(this, 'startScrubbing', (s) => {
        (d.nullOrUndefined(s.button) || s.button === !1 || s.button === 0) &&
          ((this.mouseDown = !0),
          this.player.media.duration &&
            (this.toggleScrubbingContainer(!0),
            this.toggleThumbContainer(!1, !0),
            this.showImageAtCurrentTime()));
      }),
      D(this, 'endScrubbing', () => {
        ((this.mouseDown = !1),
          Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime)
            ? this.toggleScrubbingContainer(!1)
            : ir.call(this.player, this.player.media, 'timeupdate', () => {
                this.mouseDown || this.toggleScrubbingContainer(!1);
              }));
      }),
      D(this, 'listeners', () => {
        (this.player.on('play', () => {
          this.toggleThumbContainer(!1, !0);
        }),
          this.player.on('seeked', () => {
            this.toggleThumbContainer(!1);
          }),
          this.player.on('timeupdate', () => {
            this.lastTime = this.player.media.currentTime;
          }));
      }),
      D(this, 'render', () => {
        ((this.elements.thumb.container = J('div', {
          class: this.player.config.classNames.previewThumbnails.thumbContainer,
        })),
          (this.elements.thumb.imageContainer = J('div', {
            class:
              this.player.config.classNames.previewThumbnails.imageContainer,
          })),
          this.elements.thumb.container.appendChild(
            this.elements.thumb.imageContainer,
          ));
        const s = J('div', {
          class: this.player.config.classNames.previewThumbnails.timeContainer,
        });
        ((this.elements.thumb.time = J('span', {}, '00:00')),
          s.appendChild(this.elements.thumb.time),
          this.elements.thumb.imageContainer.appendChild(s),
          d.element(this.player.elements.progress) &&
            this.player.elements.progress.appendChild(
              this.elements.thumb.container,
            ),
          (this.elements.scrubbing.container = J('div', {
            class:
              this.player.config.classNames.previewThumbnails
                .scrubbingContainer,
          })),
          this.player.elements.wrapper.appendChild(
            this.elements.scrubbing.container,
          ));
      }),
      D(this, 'destroy', () => {
        (this.elements.thumb.container &&
          this.elements.thumb.container.remove(),
          this.elements.scrubbing.container &&
            this.elements.scrubbing.container.remove());
      }),
      D(this, 'showImageAtCurrentTime', () => {
        this.mouseDown
          ? this.setScrubbingContainerSize()
          : this.setThumbContainerSizeAndPos();
        const s = this.thumbnails[0].frames.findIndex(
            (r) => this.seekTime >= r.startTime && this.seekTime <= r.endTime,
          ),
          i = s >= 0;
        let n = 0;
        (this.mouseDown || this.toggleThumbContainer(i),
          i &&
            (this.thumbnails.forEach((r, o) => {
              this.loadedImages.includes(r.frames[s].text) && (n = o);
            }),
            s !== this.showingThumb &&
              ((this.showingThumb = s), this.loadImage(n))));
      }),
      D(this, 'loadImage', (s = 0) => {
        const i = this.showingThumb,
          n = this.thumbnails[s],
          { urlPrefix: r } = n,
          o = n.frames[i],
          l = n.frames[i].text,
          a = r + l;
        if (
          !this.currentImageElement ||
          this.currentImageElement.dataset.filename !== l
        ) {
          this.loadingImage &&
            this.usingSprites &&
            (this.loadingImage.onload = null);
          const c = new Image();
          ((c.src = a),
            (c.dataset.index = i),
            (c.dataset.filename = l),
            (this.showingThumbFilename = l),
            this.player.debug.log(`Loading image: ${a}`),
            (c.onload = () => this.showImage(c, o, s, i, l, !0)),
            (this.loadingImage = c),
            this.removeOldImages(c));
        } else
          (this.showImage(this.currentImageElement, o, s, i, l, !1),
            (this.currentImageElement.dataset.index = i),
            this.removeOldImages(this.currentImageElement));
      }),
      D(this, 'showImage', (s, i, n, r, o, l = !0) => {
        (this.player.debug.log(
          `Showing thumb: ${o}. num: ${r}. qual: ${n}. newimg: ${l}`,
        ),
          this.setImageSizeAndOffset(s, i),
          l &&
            (this.currentImageContainer.appendChild(s),
            (this.currentImageElement = s),
            this.loadedImages.includes(o) || this.loadedImages.push(o)),
          this.preloadNearby(r, !0)
            .then(this.preloadNearby(r, !1))
            .then(this.getHigherQuality(n, s, i, o)));
      }),
      D(this, 'removeOldImages', (s) => {
        Array.from(this.currentImageContainer.children).forEach((i) => {
          if (i.tagName.toLowerCase() !== 'img') return;
          const n = this.usingSprites ? 500 : 1e3;
          if (i.dataset.index !== s.dataset.index && !i.dataset.deleting) {
            i.dataset.deleting = !0;
            const { currentImageContainer: r } = this;
            setTimeout(() => {
              (r.removeChild(i),
                this.player.debug.log(`Removing thumb: ${i.dataset.filename}`));
            }, n);
          }
        });
      }),
      D(
        this,
        'preloadNearby',
        (s, i = !0) =>
          new Promise((n) => {
            setTimeout(() => {
              const r = this.thumbnails[0].frames[s].text;
              if (this.showingThumbFilename === r) {
                let o;
                i
                  ? (o = this.thumbnails[0].frames.slice(s))
                  : (o = this.thumbnails[0].frames.slice(0, s).reverse());
                let l = !1;
                (o.forEach((a) => {
                  const c = a.text;
                  if (c !== r && !this.loadedImages.includes(c)) {
                    ((l = !0),
                      this.player.debug.log(`Preloading thumb filename: ${c}`));
                    const { urlPrefix: u } = this.thumbnails[0],
                      f = u + c,
                      p = new Image();
                    ((p.src = f),
                      (p.onload = () => {
                        (this.player.debug.log(
                          `Preloaded thumb filename: ${c}`,
                        ),
                          this.loadedImages.includes(c) ||
                            this.loadedImages.push(c),
                          n());
                      }));
                  }
                }),
                  l || n());
              }
            }, 300);
          }),
      ),
      D(this, 'getHigherQuality', (s, i, n, r) => {
        if (s < this.thumbnails.length - 1) {
          let o = i.naturalHeight;
          (this.usingSprites && (o = n.h),
            o < this.thumbContainerHeight &&
              setTimeout(() => {
                this.showingThumbFilename === r &&
                  (this.player.debug.log(
                    `Showing higher quality thumb for: ${r}`,
                  ),
                  this.loadImage(s + 1));
              }, 300));
        }
      }),
      D(this, 'toggleThumbContainer', (s = !1, i = !1) => {
        const n =
          this.player.config.classNames.previewThumbnails.thumbContainerShown;
        (this.elements.thumb.container.classList.toggle(n, s),
          !s &&
            i &&
            ((this.showingThumb = null), (this.showingThumbFilename = null)));
      }),
      D(this, 'toggleScrubbingContainer', (s = !1) => {
        const i =
          this.player.config.classNames.previewThumbnails
            .scrubbingContainerShown;
        (this.elements.scrubbing.container.classList.toggle(i, s),
          s ||
            ((this.showingThumb = null), (this.showingThumbFilename = null)));
      }),
      D(this, 'determineContainerAutoSizing', () => {
        (this.elements.thumb.imageContainer.clientHeight > 20 ||
          this.elements.thumb.imageContainer.clientWidth > 20) &&
          (this.sizeSpecifiedInCSS = !0);
      }),
      D(this, 'setThumbContainerSizeAndPos', () => {
        const { imageContainer: s } = this.elements.thumb;
        if (this.sizeSpecifiedInCSS) {
          if (s.clientHeight > 20 && s.clientWidth < 20) {
            const i = Math.floor(s.clientHeight * this.thumbAspectRatio);
            s.style.width = `${i}px`;
          } else if (s.clientHeight < 20 && s.clientWidth > 20) {
            const i = Math.floor(s.clientWidth / this.thumbAspectRatio);
            s.style.height = `${i}px`;
          }
        } else {
          const i = Math.floor(
            this.thumbContainerHeight * this.thumbAspectRatio,
          );
          ((s.style.height = `${this.thumbContainerHeight}px`),
            (s.style.width = `${i}px`));
        }
        this.setThumbContainerPos();
      }),
      D(this, 'setThumbContainerPos', () => {
        const s = this.player.elements.progress.getBoundingClientRect(),
          i = this.player.elements.container.getBoundingClientRect(),
          { container: n } = this.elements.thumb,
          r = i.left - s.left + 10,
          o = i.right - s.left - n.clientWidth - 10,
          l = this.mousePosX - s.left - n.clientWidth / 2,
          a = Zl(l, r, o);
        ((n.style.left = `${a}px`),
          n.style.setProperty('--preview-arrow-offset', `${l - a}px`));
      }),
      D(this, 'setScrubbingContainerSize', () => {
        const { width: s, height: i } = co(this.thumbAspectRatio, {
          width: this.player.media.clientWidth,
          height: this.player.media.clientHeight,
        });
        ((this.elements.scrubbing.container.style.width = `${s}px`),
          (this.elements.scrubbing.container.style.height = `${i}px`));
      }),
      D(this, 'setImageSizeAndOffset', (s, i) => {
        if (!this.usingSprites) return;
        const n = this.thumbContainerHeight / i.h;
        ((s.style.height = `${s.naturalHeight * n}px`),
          (s.style.width = `${s.naturalWidth * n}px`),
          (s.style.left = `-${i.x * n}px`),
          (s.style.top = `-${i.y * n}px`));
      }),
      (this.player = t),
      (this.thumbnails = []),
      (this.loaded = !1),
      (this.lastMouseMoveTime = Date.now()),
      (this.mouseDown = !1),
      (this.loadedImages = []),
      (this.elements = { thumb: {}, scrubbing: {} }),
      this.load());
  }
  get enabled() {
    return (
      this.player.isHTML5 &&
      this.player.isVideo &&
      this.player.config.previewThumbnails.enabled
    );
  }
  get currentImageContainer() {
    return this.mouseDown
      ? this.elements.scrubbing.container
      : this.elements.thumb.imageContainer;
  }
  get usingSprites() {
    return Object.keys(this.thumbnails[0].frames[0]).includes('w');
  }
  get thumbAspectRatio() {
    return this.usingSprites
      ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h
      : this.thumbnails[0].width / this.thumbnails[0].height;
  }
  get thumbContainerHeight() {
    if (this.mouseDown) {
      const { height: t } = co(this.thumbAspectRatio, {
        width: this.player.media.clientWidth,
        height: this.player.media.clientHeight,
      });
      return t;
    }
    return this.sizeSpecifiedInCSS
      ? this.elements.thumb.imageContainer.clientHeight
      : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
  }
  get currentImageElement() {
    return this.mouseDown
      ? this.currentScrubbingImageElement
      : this.currentThumbnailImageElement;
  }
  set currentImageElement(t) {
    this.mouseDown
      ? (this.currentScrubbingImageElement = t)
      : (this.currentThumbnailImageElement = t);
  }
}
const In = {
  insertElements(e, t) {
    d.string(t)
      ? no(e, this.media, { src: t })
      : d.array(t) &&
        t.forEach((s) => {
          no(e, this.media, s);
        });
  },
  change(e) {
    if (!Hl(e, 'sources.length')) {
      this.debug.warn('Invalid source format');
      return;
    }
    (Ft.cancelRequests.call(this),
      this.destroy(() => {
        ((this.options.quality = []),
          Et(this.media),
          (this.media = null),
          d.element(this.elements.container) &&
            this.elements.container.removeAttribute('class'));
        const { sources: t, type: s } = e,
          [{ provider: i = Rt.html5, src: n }] = t,
          r = i === 'html5' ? s : 'div',
          o = i === 'html5' ? {} : { src: n };
        (Object.assign(this, {
          provider: i,
          type: s,
          supported: Ae.check(s, i, this.config.playsinline),
          media: J(r, o),
        }),
          this.elements.container.appendChild(this.media),
          d.boolean(e.autoplay) && (this.config.autoplay = e.autoplay),
          this.isHTML5 &&
            (this.config.crossorigin &&
              this.media.setAttribute('crossorigin', ''),
            this.config.autoplay && this.media.setAttribute('autoplay', ''),
            d.empty(e.poster) || (this.poster = e.poster),
            this.config.loop.active && this.media.setAttribute('loop', ''),
            this.config.muted && this.media.setAttribute('muted', ''),
            this.config.playsinline &&
              this.media.setAttribute('playsinline', '')),
          ge.addStyleHook.call(this),
          this.isHTML5 && In.insertElements.call(this, 'source', t),
          (this.config.title = e.title),
          Ql.setup.call(this),
          this.isHTML5 &&
            Object.keys(e).includes('tracks') &&
            In.insertElements.call(this, 'track', e.tracks),
          (this.isHTML5 || (this.isEmbed && !this.supported.ui)) &&
            ge.build.call(this),
          this.isHTML5 && this.media.load(),
          d.empty(e.previewThumbnails) ||
            (Object.assign(this.config.previewThumbnails, e.previewThumbnails),
            this.previewThumbnails &&
              this.previewThumbnails.loaded &&
              (this.previewThumbnails.destroy(),
              (this.previewThumbnails = null)),
            this.config.previewThumbnails.enabled &&
              (this.previewThumbnails = new Ln(this))),
          this.fullscreen.update());
      }, !0));
  },
};
class Bs {
  constructor(t, s) {
    if (
      (D(this, 'play', () =>
        d.function(this.media.play)
          ? (this.ads &&
              this.ads.enabled &&
              this.ads.managerPromise
                .then(() => this.ads.play())
                .catch(() => gt(this.media.play())),
            this.media.play())
          : null,
      ),
      D(this, 'pause', () =>
        !this.playing || !d.function(this.media.pause)
          ? null
          : this.media.pause(),
      ),
      D(this, 'togglePlay', (l) =>
        (d.boolean(l) ? l : !this.playing) ? this.play() : this.pause(),
      ),
      D(this, 'stop', () => {
        this.isHTML5
          ? (this.pause(), this.restart())
          : d.function(this.media.stop) && this.media.stop();
      }),
      D(this, 'restart', () => {
        this.currentTime = 0;
      }),
      D(this, 'rewind', (l) => {
        this.currentTime -= d.number(l) ? l : this.config.seekTime;
      }),
      D(this, 'forward', (l) => {
        this.currentTime += d.number(l) ? l : this.config.seekTime;
      }),
      D(this, 'increaseVolume', (l) => {
        const a = this.media.muted ? 0 : this.volume;
        this.volume = a + (d.number(l) ? l : 0);
      }),
      D(this, 'decreaseVolume', (l) => {
        this.increaseVolume(-l);
      }),
      D(this, 'airplay', () => {
        Ae.airplay && this.media.webkitShowPlaybackTargetPicker();
      }),
      D(this, 'toggleControls', (l) => {
        if (this.supported.ui && !this.isAudio) {
          const a = _i(
              this.elements.container,
              this.config.classNames.hideControls,
            ),
            c = typeof l > 'u' ? void 0 : !l,
            u = de(
              this.elements.container,
              this.config.classNames.hideControls,
              c,
            );
          if (
            (u &&
              d.array(this.config.controls) &&
              this.config.controls.includes('settings') &&
              !d.empty(this.config.settings) &&
              I.toggleMenu.call(this, !1),
            u !== a)
          ) {
            const f = u ? 'controlshidden' : 'controlsshown';
            X.call(this, this.media, f);
          }
          return !u;
        }
        return !1;
      }),
      D(this, 'on', (l, a) => {
        le.call(this, this.elements.container, l, a);
      }),
      D(this, 'once', (l, a) => {
        ir.call(this, this.elements.container, l, a);
      }),
      D(this, 'off', (l, a) => {
        Ui(this.elements.container, l, a);
      }),
      D(this, 'destroy', (l, a = !1) => {
        if (!this.ready) return;
        const c = () => {
          ((document.body.style.overflow = ''),
            (this.embed = null),
            a
              ? (Object.keys(this.elements).length &&
                  (Et(this.elements.buttons.play),
                  Et(this.elements.captions),
                  Et(this.elements.controls),
                  Et(this.elements.wrapper),
                  (this.elements.buttons.play = null),
                  (this.elements.captions = null),
                  (this.elements.controls = null),
                  (this.elements.wrapper = null)),
                d.function(l) && l())
              : ($f.call(this),
                Ft.cancelRequests.call(this),
                Ti(this.elements.original, this.elements.container),
                X.call(this, this.elements.original, 'destroyed', !0),
                d.function(l) && l.call(this.elements.original),
                (this.ready = !1),
                setTimeout(() => {
                  ((this.elements = null), (this.media = null));
                }, 200)));
        };
        (this.stop(),
          clearTimeout(this.timers.loading),
          clearTimeout(this.timers.controls),
          clearTimeout(this.timers.resized),
          this.isHTML5
            ? (ge.toggleNativeControls.call(this, !0), c())
            : this.isYouTube
              ? (clearInterval(this.timers.buffering),
                clearInterval(this.timers.playing),
                this.embed !== null &&
                  d.function(this.embed.destroy) &&
                  this.embed.destroy(),
                c())
              : this.isVimeo &&
                (this.embed !== null && this.embed.unload().then(c),
                setTimeout(c, 200)));
      }),
      D(this, 'supports', (l) => Ae.mime.call(this, l)),
      (this.timers = {}),
      (this.ready = !1),
      (this.loading = !1),
      (this.failed = !1),
      (this.touch = Ae.touch),
      (this.media = t),
      d.string(this.media) &&
        (this.media = document.querySelectorAll(this.media)),
      ((window.jQuery && this.media instanceof jQuery) ||
        d.nodeList(this.media) ||
        d.array(this.media)) &&
        (this.media = this.media[0]),
      (this.config = Se(
        {},
        Xl,
        Bs.defaults,
        s || {},
        (() => {
          try {
            return JSON.parse(this.media.getAttribute('data-plyr-config'));
          } catch {
            return {};
          }
        })(),
      )),
      (this.elements = {
        container: null,
        fullscreen: null,
        captions: null,
        buttons: {},
        display: {},
        progress: {},
        inputs: {},
        settings: { popup: null, menu: null, panels: {}, buttons: {} },
      }),
      (this.captions = { active: null, currentTrack: -1, meta: new WeakMap() }),
      (this.fullscreen = { active: !1 }),
      (this.options = { speed: [], quality: [] }),
      (this.debug = new zf(this.config.debug)),
      this.debug.log('Config', this.config),
      this.debug.log('Support', Ae),
      d.nullOrUndefined(this.media) || !d.element(this.media))
    ) {
      this.debug.error('Setup failed: no suitable element passed');
      return;
    }
    if (this.media.plyr) {
      this.debug.warn('Target already setup');
      return;
    }
    if (!this.config.enabled) {
      this.debug.error('Setup failed: disabled by config');
      return;
    }
    if (!Ae.check().api) {
      this.debug.error('Setup failed: no support');
      return;
    }
    const i = this.media.cloneNode(!0);
    ((i.autoplay = !1), (this.elements.original = i));
    const n = this.media.tagName.toLowerCase();
    let r = null,
      o = null;
    switch (n) {
      case 'div':
        if (((r = this.media.querySelector('iframe')), d.element(r))) {
          if (
            ((o = Gl(r.getAttribute('src'))),
            (this.provider = Wf(o.toString())),
            (this.elements.container = this.media),
            (this.media = r),
            (this.elements.container.className = ''),
            o.search.length)
          ) {
            const l = ['1', 'true'];
            (l.includes(o.searchParams.get('autoplay')) &&
              (this.config.autoplay = !0),
              l.includes(o.searchParams.get('loop')) &&
                (this.config.loop.active = !0),
              this.isYouTube
                ? ((this.config.playsinline = l.includes(
                    o.searchParams.get('playsinline'),
                  )),
                  (this.config.youtube.hl = o.searchParams.get('hl')))
                : (this.config.playsinline = !0));
          }
        } else
          ((this.provider = this.media.getAttribute(
            this.config.attributes.embed.provider,
          )),
            this.media.removeAttribute(this.config.attributes.embed.provider));
        if (
          d.empty(this.provider) ||
          !Object.values(Rt).includes(this.provider)
        ) {
          this.debug.error('Setup failed: Invalid provider');
          return;
        }
        this.type = un.video;
        break;
      case 'video':
      case 'audio':
        ((this.type = n),
          (this.provider = Rt.html5),
          this.media.hasAttribute('crossorigin') &&
            (this.config.crossorigin = !0),
          this.media.hasAttribute('autoplay') && (this.config.autoplay = !0),
          (this.media.hasAttribute('playsinline') ||
            this.media.hasAttribute('webkit-playsinline')) &&
            (this.config.playsinline = !0),
          this.media.hasAttribute('muted') && (this.config.muted = !0),
          this.media.hasAttribute('loop') && (this.config.loop.active = !0));
        break;
      default:
        this.debug.error('Setup failed: unsupported type');
        return;
    }
    if (
      ((this.supported = Ae.check(this.type, this.provider)),
      !this.supported.api)
    ) {
      this.debug.error('Setup failed: no support');
      return;
    }
    ((this.eventListeners = []),
      (this.listeners = new Yf(this)),
      (this.storage = new Hs(this)),
      (this.media.plyr = this),
      d.element(this.elements.container) ||
        ((this.elements.container = J('div')),
        Bl(this.media, this.elements.container)),
      ge.migrateStyles.call(this),
      ge.addStyleHook.call(this),
      Ql.setup.call(this),
      this.config.debug &&
        le.call(
          this,
          this.elements.container,
          this.config.events.join(' '),
          (l) => {
            this.debug.log(`event: ${l.type}`);
          },
        ),
      (this.fullscreen = new it(this)),
      (this.isHTML5 || (this.isEmbed && !this.supported.ui)) &&
        ge.build.call(this),
      this.listeners.container(),
      this.listeners.global(),
      this.config.ads.enabled && (this.ads = new rh(this)),
      this.isHTML5 &&
        this.config.autoplay &&
        this.once('canplay', () => gt(this.play())),
      (this.lastSeekTime = 0),
      this.config.previewThumbnails.enabled &&
        (this.previewThumbnails = new Ln(this)));
  }
  get isHTML5() {
    return this.provider === Rt.html5;
  }
  get isEmbed() {
    return this.isYouTube || this.isVimeo;
  }
  get isYouTube() {
    return this.provider === Rt.youtube;
  }
  get isVimeo() {
    return this.provider === Rt.vimeo;
  }
  get isVideo() {
    return this.type === un.video;
  }
  get isAudio() {
    return this.type === un.audio;
  }
  get playing() {
    return !!(this.ready && !this.paused && !this.ended);
  }
  get paused() {
    return !!this.media.paused;
  }
  get stopped() {
    return !!(this.paused && this.currentTime === 0);
  }
  get ended() {
    return !!this.media.ended;
  }
  set currentTime(t) {
    if (!this.duration) return;
    const s = d.number(t) && t > 0;
    ((this.media.currentTime = s ? Math.min(t, this.duration) : 0),
      this.debug.log(`Seeking to ${this.currentTime} seconds`));
  }
  get currentTime() {
    return Number(this.media.currentTime);
  }
  get buffered() {
    const { buffered: t } = this.media;
    return d.number(t)
      ? t
      : t && t.length && this.duration > 0
        ? t.end(0) / this.duration
        : 0;
  }
  get seeking() {
    return !!this.media.seeking;
  }
  get duration() {
    const t = Number.parseFloat(this.config.duration),
      s = (this.media || {}).duration,
      i = !d.number(s) || s === 1 / 0 ? 0 : s;
    return t || i;
  }
  set volume(t) {
    let s = t;
    const i = 1,
      n = 0;
    (d.string(s) && (s = Number(s)),
      d.number(s) || (s = this.storage.get('volume')),
      d.number(s) || ({ volume: s } = this.config),
      s > i && (s = i),
      s < n && (s = n),
      (this.config.volume = s),
      (this.media.volume = s),
      !d.empty(t) && this.muted && s > 0 && (this.muted = !1));
  }
  get volume() {
    return Number(this.media.volume);
  }
  set muted(t) {
    let s = t;
    (d.boolean(s) || (s = this.storage.get('muted')),
      d.boolean(s) || (s = this.config.muted),
      (this.config.muted = s),
      (this.media.muted = s));
  }
  get muted() {
    return !!this.media.muted;
  }
  get hasAudio() {
    return !this.isHTML5 || this.isAudio
      ? !0
      : !!this.media.mozHasAudio ||
          !!this.media.webkitAudioDecodedByteCount ||
          !!(this.media.audioTracks && this.media.audioTracks.length);
  }
  set speed(t) {
    let s = null;
    (d.number(t) && (s = t),
      d.number(s) || (s = this.storage.get('speed')),
      d.number(s) || (s = this.config.speed.selected));
    const { minimumSpeed: i, maximumSpeed: n } = this;
    ((s = Zl(s, i, n)),
      (this.config.speed.selected = s),
      setTimeout(() => {
        this.media && (this.media.playbackRate = s);
      }, 0));
  }
  get speed() {
    return Number(this.media.playbackRate);
  }
  get minimumSpeed() {
    return this.isYouTube
      ? Math.min(...this.options.speed)
      : this.isVimeo
        ? 0.5
        : 0.0625;
  }
  get maximumSpeed() {
    return this.isYouTube
      ? Math.max(...this.options.speed)
      : this.isVimeo
        ? 2
        : 16;
  }
  set quality(t) {
    const s = this.config.quality,
      i = this.options.quality;
    if (!i.length) return;
    let n = [
        !d.empty(t) && Number(t),
        this.storage.get('quality'),
        s.selected,
        s.default,
      ].find(d.number),
      r = !0;
    if (!i.includes(n)) {
      const o = Vl(i, n);
      (this.debug.warn(`Unsupported quality option: ${n}, using ${o} instead`),
        (n = o),
        (r = !1));
    }
    ((s.selected = n),
      (this.media.quality = n),
      r && this.storage.set({ quality: n }));
  }
  get quality() {
    return this.media.quality;
  }
  set loop(t) {
    const s = d.boolean(t) ? t : this.config.loop.active;
    ((this.config.loop.active = s), (this.media.loop = s));
  }
  get loop() {
    return !!this.media.loop;
  }
  set source(t) {
    In.change.call(this, t);
  }
  get source() {
    return this.media.currentSrc;
  }
  get download() {
    const { download: t } = this.config.urls;
    return d.url(t) ? t : this.source;
  }
  set download(t) {
    d.url(t) && ((this.config.urls.download = t), I.setDownloadUrl.call(this));
  }
  set poster(t) {
    if (!this.isVideo) {
      this.debug.warn('Poster can only be set for video');
      return;
    }
    ge.setPoster.call(this, t, !1).catch(() => {});
  }
  get poster() {
    return this.isVideo
      ? this.media.getAttribute('poster') ||
          this.media.getAttribute('data-poster')
      : null;
  }
  get ratio() {
    if (!this.isVideo) return null;
    const t = Ci(nr.call(this));
    return d.array(t) ? t.join(':') : t;
  }
  set ratio(t) {
    if (!this.isVideo) {
      this.debug.warn('Aspect ratio can only be set for video');
      return;
    }
    if (!d.string(t) || !ql(t)) {
      this.debug.error(`Invalid aspect ratio specified (${t})`);
      return;
    }
    ((this.config.ratio = Ci(t)), hs.call(this));
  }
  set autoplay(t) {
    this.config.autoplay = d.boolean(t) ? t : this.config.autoplay;
  }
  get autoplay() {
    return !!this.config.autoplay;
  }
  toggleCaptions(t) {
    ae.toggle.call(this, t, !1);
  }
  set currentTrack(t) {
    (ae.set.call(this, t, !1), ae.setup.call(this));
  }
  get currentTrack() {
    const { toggled: t, currentTrack: s } = this.captions;
    return t ? s : -1;
  }
  set language(t) {
    ae.setLanguage.call(this, t, !1);
  }
  get language() {
    return (ae.getCurrentTrack.call(this) || {}).language;
  }
  set pip(t) {
    if (!Ae.pip) return;
    const s = d.boolean(t) ? t : !this.pip;
    (d.function(this.media.webkitSetPresentationMode) &&
      this.media.webkitSetPresentationMode(s ? cn.active : cn.inactive),
      d.function(this.media.requestPictureInPicture) &&
        (!this.pip && s
          ? this.media.requestPictureInPicture()
          : this.pip && !s && document.exitPictureInPicture()));
  }
  get pip() {
    return Ae.pip
      ? d.empty(this.media.webkitPresentationMode)
        ? this.media === document.pictureInPictureElement
        : this.media.webkitPresentationMode === cn.active
      : null;
  }
  setPreviewThumbnails(t) {
    (this.previewThumbnails &&
      this.previewThumbnails.loaded &&
      (this.previewThumbnails.destroy(), (this.previewThumbnails = null)),
      Object.assign(this.config.previewThumbnails, t),
      this.config.previewThumbnails.enabled &&
        (this.previewThumbnails = new Ln(this)));
  }
  static supported(t, s) {
    return Ae.check(t, s);
  }
  static loadSprite(t, s) {
    return zl(t, s);
  }
  static setup(t, s = {}) {
    let i = null;
    return (
      d.string(t)
        ? (i = Array.from(document.querySelectorAll(t)))
        : d.nodeList(t)
          ? (i = Array.from(t))
          : d.array(t) && (i = t.filter(d.element)),
      d.empty(i) ? null : i.map((n) => new Bs(n, s))
    );
  }
}
Bs.defaults = Sf(Xl);
const lh = (e, t) => {
    const s = e.__vccOpts || e;
    for (const [i, n] of t) s[i] = n;
    return s;
  },
  ah = { class: 'relative w-full max-w-4xl' },
  ch = ['data-plyr-embed-id'],
  uh = {
    __name: 'TrailerModal',
    props: { videoId: String },
    emits: ['close'],
    setup(e, { emit: t }) {
      const s = e,
        i = t,
        n = se(null),
        r = se(null),
        o = se(null);
      let l = null,
        a = null;
      function c() {
        l && (l.destroy(), (l = null));
      }
      function u() {
        document.body.style.overflow = 'hidden';
      }
      function f() {
        document.body.style.overflow = '';
      }
      function p(k) {
        if (!n.value) return;
        const v = n.value.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), iframe',
        );
        if (!v.length) return;
        const x = v[0],
          M = v[v.length - 1];
        k.shiftKey && document.activeElement === x
          ? (k.preventDefault(), M.focus())
          : !k.shiftKey &&
            document.activeElement === M &&
            (k.preventDefault(), x.focus());
      }
      function y(k) {
        k.key === 'Escape' ? i('close') : k.key === 'Tab' && p(k);
      }
      return (
        yt(
          () => s.videoId,
          async (k, v) => {
            if ((c(), !k)) {
              (f(), a && (a.focus(), (a = null)));
              return;
            }
            ((a = document.activeElement),
              u(),
              await Bt(),
              o.value && (l = new Bs(o.value, { autoplay: !0 })),
              await Bt(),
              r.value?.focus());
          },
        ),
        Ri(() => {
          (c(), f());
        }),
        (k, v) => (
          E(),
          ts(Yn, { to: 'body' }, [
            Te(
              eu,
              { name: 'fade' },
              {
                default: Ho(() => [
                  e.videoId
                    ? (E(),
                      $(
                        'div',
                        {
                          'key': 0,
                          'ref_key': 'modal',
                          'ref': n,
                          'role': 'dialog',
                          'aria-modal': 'true',
                          'aria-label': 'Trailer',
                          'class':
                            'fixed inset-0 z-50 flex items-center justify-center p-4',
                          'onKeydown': y,
                        },
                        [
                          g('div', {
                            class: 'absolute inset-0 bg-black/85',
                            onClick: v[0] || (v[0] = (x) => i('close')),
                          }),
                          g('div', ah, [
                            g(
                              'button',
                              {
                                'ref_key': 'closeBtn',
                                'ref': r,
                                'onClick': v[1] || (v[1] = (x) => i('close')),
                                'class':
                                  'absolute -top-10 right-0 text-white hover:text-cream-dark text-xl cursor-pointer font-sans',
                                'aria-label': 'Close trailer',
                              },
                              ' × Close ',
                              512,
                            ),
                            g(
                              'div',
                              {
                                'ref_key': 'playerContainer',
                                'ref': o,
                                'data-plyr-provider': 'youtube',
                                'data-plyr-embed-id': e.videoId,
                              },
                              null,
                              8,
                              ch,
                            ),
                          ]),
                        ],
                        544,
                      ))
                    : ne('', !0),
                ]),
                _: 1,
              },
            ),
          ])
        )
      );
    },
  },
  dh = lh(uh, [['__scopeId', 'data-v-5daeab76']]),
  fh = '/icons/vue.png',
  hh = '/icons/cineworld.svg',
  ph = { class: 'select-none' },
  mh = { class: 'flex items-center justify-between mb-2' },
  gh = ['disabled'],
  bh = { class: 'text-xs font-medium uppercase tracking-widest text-ink' },
  yh = { class: 'grid grid-cols-7 mb-1' },
  vh = { class: 'grid grid-cols-7' },
  wh = ['onClick'],
  xh = { key: 0 },
  kh = {
    key: 1,
    class:
      'absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ink',
  },
  Th = {
    __name: 'DatePicker',
    props: { modelValue: { type: String, default: '' } },
    emits: ['select'],
    setup(e, { emit: t }) {
      const s = e,
        i = t,
        n = new Date();
      n.setHours(0, 0, 0, 0);
      const r = f(n),
        o = se(n.getFullYear()),
        l = se(n.getMonth()),
        a = Xe(() =>
          new Date(o.value, l.value, 1).toLocaleDateString('en-GB', {
            month: 'long',
            year: 'numeric',
          }),
        ),
        c = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        u = Xe(() => {
          const x = new Date(o.value, l.value, 1),
            M = new Date(o.value, l.value + 1, 0).getDate();
          let b = x.getDay() - 1;
          b < 0 && (b = 6);
          const P = [];
          for (let T = 0; T < b; T++) P.push({ day: null });
          for (let T = 1; T <= M; T++) {
            const V = new Date(o.value, l.value, T);
            V.setHours(0, 0, 0, 0);
            const K = f(V);
            P.push({
              day: T,
              dateStr: K,
              isToday: K === r,
              isPast: V < n,
              isSelected: K === s.modelValue,
            });
          }
          return P;
        });
      function f(x) {
        const M = x.getFullYear(),
          b = String(x.getMonth() + 1).padStart(2, '0'),
          P = String(x.getDate()).padStart(2, '0');
        return `${M}-${b}-${P}`;
      }
      function p() {
        l.value === 0 ? ((l.value = 11), o.value--) : l.value--;
      }
      function y() {
        l.value === 11 ? ((l.value = 0), o.value++) : l.value++;
      }
      function k() {
        return o.value > n.getFullYear() || l.value > n.getMonth();
      }
      function v(x) {
        !x.day || x.isPast || i('select', x.dateStr);
      }
      return (x, M) => (
        E(),
        $('div', ph, [
          g('div', mh, [
            g(
              'button',
              {
                'onClick': p,
                'disabled': !k(),
                'class':
                  'p-1 text-ink/50 hover:text-ink transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed',
                'aria-label': 'Previous month',
              },
              [
                ...(M[0] ||
                  (M[0] = [
                    g(
                      'svg',
                      {
                        'class': 'w-4 h-4',
                        'viewBox': '0 0 16 16',
                        'fill': 'none',
                        'stroke': 'currentColor',
                        'stroke-width': '1.5',
                      },
                      [g('path', { d: 'M10 3L5 8l5 5' })],
                      -1,
                    ),
                  ])),
              ],
              8,
              gh,
            ),
            g('span', bh, te(a.value), 1),
            g(
              'button',
              {
                'onClick': y,
                'class':
                  'p-1 text-ink/50 hover:text-ink transition-colors cursor-pointer',
                'aria-label': 'Next month',
              },
              [
                ...(M[1] ||
                  (M[1] = [
                    g(
                      'svg',
                      {
                        'class': 'w-4 h-4',
                        'viewBox': '0 0 16 16',
                        'fill': 'none',
                        'stroke': 'currentColor',
                        'stroke-width': '1.5',
                      },
                      [g('path', { d: 'M6 3l5 5-5 5' })],
                      -1,
                    ),
                  ])),
              ],
            ),
          ]),
          g('div', yh, [
            (E(),
            $(
              ie,
              null,
              ze(c, (b) =>
                g(
                  'div',
                  {
                    key: b,
                    class:
                      'text-center text-[10px] uppercase tracking-wider text-ink-lighter font-medium py-1',
                  },
                  te(b),
                  1,
                ),
              ),
              64,
            )),
          ]),
          g('div', vh, [
            (E(!0),
            $(
              ie,
              null,
              ze(
                u.value,
                (b, P) => (
                  E(),
                  $(
                    'div',
                    {
                      key: P,
                      onClick: (T) => v(b),
                      class: Ge([
                        'relative flex items-center justify-center py-1.5 text-xs transition-colors',
                        [
                          b.day && !b.isPast
                            ? 'cursor-pointer hover:bg-ink/5'
                            : '',
                          b.isPast
                            ? 'text-ink/20 cursor-not-allowed'
                            : 'text-ink',
                          b.isSelected ? 'bg-ink text-cream font-medium' : '',
                        ],
                      ]),
                    },
                    [
                      b.day ? (E(), $('span', xh, te(b.day), 1)) : ne('', !0),
                      b.isToday && !b.isSelected
                        ? (E(), $('span', kh))
                        : ne('', !0),
                    ],
                    10,
                    wh,
                  )
                ),
              ),
              128,
            )),
          ]),
        ])
      );
    },
  },
  _h = {
    class:
      'relative bg-cream border border-border-dark shadow-xl w-full max-w-xl flex flex-col max-h-[600px]',
  },
  Ch = {
    class:
      'flex items-center justify-between px-5 py-4 border-b border-border shrink-0',
  },
  Sh = { class: 'flex items-center gap-3' },
  Ah = { class: 'text-sm font-medium uppercase tracking-widest text-ink' },
  Eh = { class: 'px-5 py-3 border-b border-border shrink-0 space-y-2.5' },
  Mh = { class: 'relative' },
  $h = { class: 'flex items-center gap-1.5' },
  Ph = { class: 'flex-1 overflow-y-auto min-h-0' },
  Nh = { key: 0, class: 'px-5 py-8 text-center' },
  Lh = ['onClick'],
  Ih = { class: 'shrink-0' },
  Oh = {
    'key': 0,
    'class': 'w-2.5 h-2.5 text-cream',
    'viewBox': '0 0 16 16',
    'fill': 'none',
    'stroke': 'currentColor',
    'stroke-width': '2.5',
  },
  Dh = ['src', 'alt'],
  Rh = { class: 'min-w-0' },
  Fh = { class: 'text-sm font-medium text-ink' },
  jh = { key: 0, class: 'text-xs text-ink-lighter mt-0.5 truncate' },
  Hh = { key: 0, class: 'px-5 py-8 text-center text-sm text-ink-lighter' },
  Bh = { key: 0, class: 'px-5 py-3 border-t border-border shrink-0' },
  Vh = { class: 'px-5 py-3 border-b border-border shrink-0' },
  Uh = { key: 0, class: 'px-5 py-2.5 border-b border-border shrink-0' },
  qh = { class: 'flex flex-wrap items-center gap-2' },
  Kh = ['onClick'],
  Wh = ['src', 'alt'],
  zh = { class: 'flex-1 overflow-y-auto min-h-0' },
  Yh = { key: 0, class: 'px-5 py-8 text-center' },
  Gh = { class: 'flex items-start gap-3' },
  Jh = ['src', 'alt'],
  Xh = { class: 'flex-1 min-w-0' },
  Qh = { class: 'text-sm font-medium text-ink' },
  Zh = { class: 'text-xs text-ink-lighter mt-0.5' },
  ep = { key: 0 },
  tp = { key: 1 },
  sp = { key: 2 },
  ip = { class: 'flex items-center gap-1.5 mb-1' },
  np = ['src', 'alt'],
  rp = { class: 'text-[11px] text-ink-lighter font-medium' },
  op = { class: 'flex flex-wrap gap-1.5' },
  lp = ['onClick'],
  ap = { key: 2, class: 'px-5 py-8 text-center text-sm text-ink-lighter' },
  cp = {
    key: 1,
    class: 'px-5 py-3 border-t border-border shrink-0 flex items-center gap-2',
  },
  up = ['disabled'],
  dp = {
    __name: 'CinemaModal',
    emits: ['add-films'],
    setup(e, { emit: t }) {
      const s = t,
        {
          showModal: i,
          selectedCinemas: n,
          selectedDate: r,
          loadingCinemas: o,
          loadingFilms: l,
          mergedFilms: a,
          loadAllCinemas: c,
          loadFilmsForSelectedCinemas: u,
          toggleCinema: f,
          setDate: p,
          filterCinemas: y,
        } = er(),
        k = se(1),
        v = se(''),
        x = se(new Map()),
        M = se(null),
        b = se(null);
      let P = null;
      const T = se('all'),
        V = Xe(() => {
          let U = y(v.value);
          return (
            T.value !== 'all' && (U = U.filter((H) => H.chain === T.value)),
            U
          );
        }),
        K = Xe(() => n.value.length),
        G = se(new Set()),
        O = Xe(() =>
          G.value.size === 0
            ? a.value
            : a.value
                .map((U) => ({
                  ...U,
                  cinemaShowtimes: U.cinemaShowtimes.filter((H) =>
                    G.value.has(H.cinemaId),
                  ),
                }))
                .filter((U) => U.cinemaShowtimes.length > 0),
        );
      function j(U) {
        const H = new Set(G.value);
        (H.has(U) ? H.delete(U) : H.add(U), (G.value = H));
      }
      function ee(U) {
        return G.value.has(U);
      }
      const oe = Xe(() => {
        const U = new Set();
        for (const H of x.value.keys()) U.add(H.split('::')[0]);
        return U.size;
      });
      function B(U) {
        return n.value.some((H) => H.id === U.id);
      }
      function ve(U) {
        for (const H of x.value.keys()) if (H.startsWith(U + '::')) return !0;
        return !1;
      }
      function Me(U, H, q) {
        const be = `${U.title}::${H.cinemaId}::${q.time}`;
        return x.value.has(be);
      }
      function tt(U, H, q) {
        if (q.soldOut) return;
        const be = `${U.title}::${H.cinemaId}::${q.time}`,
          Le = new Map(x.value);
        (Le.has(be)
          ? Le.delete(be)
          : Le.set(be, { cinema: H.cinemaName, chain: H.chain, time: q.time }),
          (x.value = Le));
      }
      function _e(U) {
        return U === 'vue' ? '/icons/vue.png' : '/icons/cineworld.svg';
      }
      function ke() {
        ((k.value = 1), (v.value = ''), (T.value = 'all'));
      }
      function me(U) {
        f(U);
      }
      function wt() {
        n.value.length &&
          ((k.value = 2), (x.value = new Map()), (G.value = new Set()), u());
      }
      function ss(U) {
        (p(U), (x.value = new Map()), (G.value = new Set()));
      }
      function xt() {
        const U = new Map();
        for (const [H, q] of x.value) {
          const be = H.split('::')[0];
          if (!U.has(be)) {
            const Le = a.value.find((Js) => Js.title === be);
            U.set(be, {
              name: be,
              releaseYear: Le?.releaseYear || null,
              showtimes: [],
            });
          }
          U.get(be).showtimes.push(q);
        }
        (s('add-films', Array.from(U.values())), Fe());
      }
      function Fe() {
        ((i.value = !1), (x.value = new Map()), P && (P.focus(), (P = null)));
      }
      function Gs(U) {
        if (!M.value) return;
        const H = M.value.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!H.length) return;
        const q = H[0],
          be = H[H.length - 1];
        U.shiftKey && document.activeElement === q
          ? (U.preventDefault(), be.focus())
          : !U.shiftKey &&
            document.activeElement === be &&
            (U.preventDefault(), q.focus());
      }
      function Ki(U) {
        U.key === 'Escape' ? Fe() : U.key === 'Tab' && Gs(U);
      }
      function Wi(U) {
        if (!U) return '';
        const H = Math.floor(U / 60),
          q = U % 60;
        return H > 0 ? `${H}h ${q}m` : `${q}m`;
      }
      return (
        yt(i, async (U) => {
          U
            ? ((P = document.activeElement),
              (document.body.style.overflow = 'hidden'),
              c(),
              n.value.length > 0 ? ((k.value = 2), u()) : (k.value = 1),
              await Bt(),
              b.value?.focus())
            : (document.body.style.overflow = '');
        }),
        (U, H) => (
          E(),
          ts(Yn, { to: 'body' }, [
            fe(i)
              ? (E(),
                $(
                  'div',
                  {
                    'key': 0,
                    'ref_key': 'modal',
                    'ref': M,
                    'role': 'dialog',
                    'aria-modal': 'true',
                    'aria-label': 'Browse Cinemas',
                    'class':
                      'fixed inset-0 z-50 flex items-center justify-center p-4',
                    'onKeydown': Ki,
                  },
                  [
                    g('div', {
                      'class': 'fixed inset-0 bg-ink/40',
                      'aria-hidden': 'true',
                      'onClick': Fe,
                    }),
                    g('div', _h, [
                      g('div', Ch, [
                        g('div', Sh, [
                          k.value === 2
                            ? (E(),
                              $(
                                'button',
                                {
                                  'key': 0,
                                  'onClick': ke,
                                  'class':
                                    'text-ink/50 hover:text-ink transition-colors cursor-pointer',
                                  'aria-label': 'Back to cinema search',
                                },
                                [
                                  ...(H[6] ||
                                    (H[6] = [
                                      g(
                                        'svg',
                                        {
                                          'class': 'w-4 h-4',
                                          'viewBox': '0 0 16 16',
                                          'fill': 'none',
                                          'stroke': 'currentColor',
                                          'stroke-width': '1.5',
                                        },
                                        [g('path', { d: 'M10 3L5 8l5 5' })],
                                        -1,
                                      ),
                                    ])),
                                ],
                              ))
                            : ne('', !0),
                          g(
                            'h2',
                            Ah,
                            te(
                              k.value === 1
                                ? 'Find Cinema'
                                : `${K.value} Cinema${K.value !== 1 ? 's' : ''} Selected`,
                            ),
                            1,
                          ),
                        ]),
                        g(
                          'button',
                          {
                            'ref_key': 'closeBtn',
                            'ref': b,
                            'onClick': Fe,
                            'class':
                              'text-ink/50 hover:text-ink transition-colors cursor-pointer',
                            'aria-label': 'Close',
                          },
                          [
                            ...(H[7] ||
                              (H[7] = [
                                g(
                                  'svg',
                                  {
                                    'class': 'w-4 h-4',
                                    'viewBox': '0 0 16 16',
                                    'fill': 'none',
                                    'stroke': 'currentColor',
                                    'stroke-width': '1.5',
                                  },
                                  [g('path', { d: 'M4 4l8 8M12 4l-8 8' })],
                                  -1,
                                ),
                              ])),
                          ],
                          512,
                        ),
                      ]),
                      k.value === 1
                        ? (E(),
                          $(
                            ie,
                            { key: 0 },
                            [
                              g('div', Eh, [
                                g('div', Mh, [
                                  bn(
                                    g(
                                      'input',
                                      {
                                        'onUpdate:modelValue':
                                          H[0] || (H[0] = (q) => (v.value = q)),
                                        'type': 'text',
                                        'placeholder': 'Search cinemas...',
                                        'class':
                                          'w-full px-3 py-1.5 pr-8 bg-white text-ink border border-border focus:border-ink focus:outline-none placeholder-ink-lighter text-sm',
                                      },
                                      null,
                                      512,
                                    ),
                                    [[_l, v.value]],
                                  ),
                                  v.value
                                    ? (E(),
                                      $(
                                        'button',
                                        {
                                          'key': 0,
                                          'onClick':
                                            H[1] ||
                                            (H[1] = (q) => (v.value = '')),
                                          'class':
                                            'absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors cursor-pointer',
                                          'aria-label': 'Clear search',
                                        },
                                        [
                                          ...(H[8] ||
                                            (H[8] = [
                                              g(
                                                'svg',
                                                {
                                                  'class': 'w-3.5 h-3.5',
                                                  'viewBox': '0 0 16 16',
                                                  'fill': 'none',
                                                  'stroke': 'currentColor',
                                                  'stroke-width': '1.5',
                                                },
                                                [
                                                  g('path', {
                                                    d: 'M4 4l8 8M12 4l-8 8',
                                                  }),
                                                ],
                                                -1,
                                              ),
                                            ])),
                                        ],
                                      ))
                                    : ne('', !0),
                                ]),
                                g('div', $h, [
                                  g(
                                    'button',
                                    {
                                      onClick:
                                        H[2] ||
                                        (H[2] = (q) => (T.value = 'all')),
                                      class: Ge([
                                        'px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium border transition-colors cursor-pointer',
                                        T.value === 'all'
                                          ? 'border-ink bg-ink text-cream'
                                          : 'border-border text-ink-lighter hover:border-ink hover:text-ink',
                                      ]),
                                    },
                                    ' All ',
                                    2,
                                  ),
                                  g(
                                    'button',
                                    {
                                      onClick:
                                        H[3] ||
                                        (H[3] = (q) => (T.value = 'vue')),
                                      class: Ge([
                                        'flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium border transition-colors cursor-pointer',
                                        T.value === 'vue'
                                          ? 'border-ink bg-ink text-cream'
                                          : 'border-border text-ink-lighter hover:border-ink hover:text-ink',
                                      ]),
                                    },
                                    [
                                      ...(H[9] ||
                                        (H[9] = [
                                          g(
                                            'img',
                                            {
                                              src: fh,
                                              alt: 'Vue',
                                              class:
                                                'w-3.5 h-3.5 rounded shrink-0',
                                            },
                                            null,
                                            -1,
                                          ),
                                          nt(' Vue ', -1),
                                        ])),
                                    ],
                                    2,
                                  ),
                                  g(
                                    'button',
                                    {
                                      onClick:
                                        H[4] ||
                                        (H[4] = (q) => (T.value = 'cineworld')),
                                      class: Ge([
                                        'flex items-center gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium border transition-colors cursor-pointer',
                                        T.value === 'cineworld'
                                          ? 'border-ink bg-ink text-cream'
                                          : 'border-border text-ink-lighter hover:border-ink hover:text-ink',
                                      ]),
                                    },
                                    [
                                      ...(H[10] ||
                                        (H[10] = [
                                          g(
                                            'img',
                                            {
                                              src: hh,
                                              alt: 'Cineworld',
                                              class:
                                                'w-3.5 h-3.5 rounded shrink-0',
                                            },
                                            null,
                                            -1,
                                          ),
                                          nt(' Cineworld ', -1),
                                        ])),
                                    ],
                                    2,
                                  ),
                                ]),
                              ]),
                              g('div', Ph, [
                                fe(o)
                                  ? (E(),
                                    $('div', Nh, [
                                      ...(H[11] ||
                                        (H[11] = [
                                          g(
                                            'div',
                                            {
                                              class:
                                                'w-5 h-5 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto',
                                            },
                                            null,
                                            -1,
                                          ),
                                        ])),
                                    ]))
                                  : (E(),
                                    $(
                                      ie,
                                      { key: 1 },
                                      [
                                        (E(!0),
                                        $(
                                          ie,
                                          null,
                                          ze(
                                            V.value,
                                            (q) => (
                                              E(),
                                              $(
                                                'div',
                                                {
                                                  key: q.id,
                                                  onClick: (be) => me(q),
                                                  class:
                                                    'w-full text-left px-5 py-3 hover:bg-ink/5 transition-colors cursor-pointer border-b border-border last:border-b-0 flex items-center gap-3',
                                                },
                                                [
                                                  g('div', Ih, [
                                                    g(
                                                      'div',
                                                      {
                                                        class: Ge([
                                                          'w-4 h-4 border rounded-[3px] flex items-center justify-center transition-colors',
                                                          B(q)
                                                            ? 'bg-ink border-ink'
                                                            : 'border-border-dark/60',
                                                        ]),
                                                      },
                                                      [
                                                        B(q)
                                                          ? (E(),
                                                            $('svg', Oh, [
                                                              ...(H[12] ||
                                                                (H[12] = [
                                                                  g(
                                                                    'path',
                                                                    {
                                                                      d: 'M3 8.5l3.5 3.5L13 4',
                                                                    },
                                                                    null,
                                                                    -1,
                                                                  ),
                                                                ])),
                                                            ]))
                                                          : ne('', !0),
                                                      ],
                                                      2,
                                                    ),
                                                  ]),
                                                  g(
                                                    'img',
                                                    {
                                                      src: _e(q.chain),
                                                      alt: q.chain,
                                                      class:
                                                        'w-5 h-5 rounded shrink-0',
                                                    },
                                                    null,
                                                    8,
                                                    Dh,
                                                  ),
                                                  g('div', Rh, [
                                                    g('p', Fh, te(q.name), 1),
                                                    q.fullName !== q.name
                                                      ? (E(),
                                                        $(
                                                          'p',
                                                          jh,
                                                          te(q.fullName),
                                                          1,
                                                        ))
                                                      : ne('', !0),
                                                  ]),
                                                ],
                                                8,
                                                Lh,
                                              )
                                            ),
                                          ),
                                          128,
                                        )),
                                        V.value.length
                                          ? ne('', !0)
                                          : (E(),
                                            $('p', Hh, ' No cinemas found ')),
                                      ],
                                      64,
                                    )),
                              ]),
                              K.value > 0
                                ? (E(),
                                  $('div', Bh, [
                                    g(
                                      'button',
                                      {
                                        onClick: wt,
                                        class:
                                          'w-full border border-border-dark px-4 py-2 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer',
                                      },
                                      ' Browse Films (' +
                                        te(K.value) +
                                        ' cinema' +
                                        te(K.value !== 1 ? 's' : '') +
                                        ') ',
                                      1,
                                    ),
                                  ]))
                                : ne('', !0),
                            ],
                            64,
                          ))
                        : ne('', !0),
                      k.value === 2
                        ? (E(),
                          $(
                            ie,
                            { key: 1 },
                            [
                              g('div', Vh, [
                                Te(
                                  Th,
                                  { 'model-value': fe(r), 'onSelect': ss },
                                  null,
                                  8,
                                  ['model-value'],
                                ),
                              ]),
                              fe(n).length > 1 && !fe(l) && fe(a).length
                                ? (E(),
                                  $('div', Uh, [
                                    g('div', qh, [
                                      H[13] ||
                                        (H[13] = g(
                                          'span',
                                          {
                                            class:
                                              'text-[10px] uppercase tracking-widest text-ink-lighter font-medium shrink-0',
                                          },
                                          'Filter',
                                          -1,
                                        )),
                                      (E(!0),
                                      $(
                                        ie,
                                        null,
                                        ze(
                                          fe(n),
                                          (q) => (
                                            E(),
                                            $(
                                              'button',
                                              {
                                                key: q.id,
                                                onClick: (be) => j(q.id),
                                                class: Ge([
                                                  'flex items-center gap-1.5 px-2 py-1 text-xs transition-colors cursor-pointer border',
                                                  ee(q.id)
                                                    ? 'border-ink bg-ink text-cream'
                                                    : 'border-border text-ink-lighter hover:border-ink hover:text-ink',
                                                ]),
                                              },
                                              [
                                                g(
                                                  'img',
                                                  {
                                                    src: _e(q.chain),
                                                    alt: q.chain,
                                                    class:
                                                      'w-3.5 h-3.5 rounded shrink-0',
                                                  },
                                                  null,
                                                  8,
                                                  Wh,
                                                ),
                                                nt(' ' + te(q.name), 1),
                                              ],
                                              10,
                                              Kh,
                                            )
                                          ),
                                        ),
                                        128,
                                      )),
                                    ]),
                                  ]))
                                : ne('', !0),
                              g('div', zh, [
                                fe(l)
                                  ? (E(),
                                    $('div', Yh, [
                                      ...(H[14] ||
                                        (H[14] = [
                                          g(
                                            'div',
                                            {
                                              class:
                                                'w-5 h-5 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto',
                                            },
                                            null,
                                            -1,
                                          ),
                                        ])),
                                    ]))
                                  : O.value.length
                                    ? (E(!0),
                                      $(
                                        ie,
                                        { key: 1 },
                                        ze(
                                          O.value,
                                          (q) => (
                                            E(),
                                            $(
                                              'div',
                                              {
                                                key: q.title,
                                                class: Ge([
                                                  'px-5 py-3 border-b border-border last:border-b-0 transition-colors',
                                                  ve(q.title)
                                                    ? 'border-l-2 border-l-ink'
                                                    : '',
                                                ]),
                                              },
                                              [
                                                g('div', Gh, [
                                                  q.posterUrl
                                                    ? (E(),
                                                      $(
                                                        'img',
                                                        {
                                                          key: 0,
                                                          src: q.posterUrl,
                                                          alt: q.title,
                                                          class:
                                                            'w-10 h-14 object-cover shrink-0 border border-border',
                                                        },
                                                        null,
                                                        8,
                                                        Jh,
                                                      ))
                                                    : ne('', !0),
                                                  g('div', Xh, [
                                                    g('p', Qh, te(q.title), 1),
                                                    g('p', Zh, [
                                                      q.durationMins
                                                        ? (E(),
                                                          $(
                                                            'span',
                                                            ep,
                                                            te(
                                                              Wi(
                                                                q.durationMins,
                                                              ),
                                                            ),
                                                            1,
                                                          ))
                                                        : ne('', !0),
                                                      q.durationMins &&
                                                      q.releaseYear
                                                        ? (E(),
                                                          $('span', tp, ' · '))
                                                        : ne('', !0),
                                                      q.releaseYear
                                                        ? (E(),
                                                          $(
                                                            'span',
                                                            sp,
                                                            te(q.releaseYear),
                                                            1,
                                                          ))
                                                        : ne('', !0),
                                                    ]),
                                                    (E(!0),
                                                    $(
                                                      ie,
                                                      null,
                                                      ze(
                                                        q.cinemaShowtimes,
                                                        (be) => (
                                                          E(),
                                                          $(
                                                            'div',
                                                            {
                                                              key: be.cinemaId,
                                                              class: 'mt-2',
                                                            },
                                                            [
                                                              g('div', ip, [
                                                                g(
                                                                  'img',
                                                                  {
                                                                    src: _e(
                                                                      be.chain,
                                                                    ),
                                                                    alt: be.chain,
                                                                    class:
                                                                      'w-5 h-5 rounded shrink-0',
                                                                  },
                                                                  null,
                                                                  8,
                                                                  np,
                                                                ),
                                                                g(
                                                                  'span',
                                                                  rp,
                                                                  te(
                                                                    be.cinemaName,
                                                                  ),
                                                                  1,
                                                                ),
                                                              ]),
                                                              g('div', op, [
                                                                (E(!0),
                                                                $(
                                                                  ie,
                                                                  null,
                                                                  ze(
                                                                    be.showtimes,
                                                                    (
                                                                      Le,
                                                                      Js,
                                                                    ) => (
                                                                      E(),
                                                                      $(
                                                                        'span',
                                                                        {
                                                                          key: Js,
                                                                          onClick:
                                                                            Cl(
                                                                              (
                                                                                h,
                                                                              ) =>
                                                                                tt(
                                                                                  q,
                                                                                  be,
                                                                                  Le,
                                                                                ),
                                                                              [
                                                                                'stop',
                                                                              ],
                                                                            ),
                                                                          class:
                                                                            Ge([
                                                                              'inline-block px-2 py-0.5 text-xs border rounded transition-colors',
                                                                              Le.soldOut
                                                                                ? 'border-border text-ink-lighter line-through opacity-50 cursor-not-allowed'
                                                                                : Me(
                                                                                      q,
                                                                                      be,
                                                                                      Le,
                                                                                    )
                                                                                  ? 'bg-ink text-cream border-ink cursor-pointer'
                                                                                  : 'border-border-dark text-ink cursor-pointer hover:border-ink',
                                                                            ]),
                                                                        },
                                                                        te(
                                                                          Le.time,
                                                                        ),
                                                                        11,
                                                                        lp,
                                                                      )
                                                                    ),
                                                                  ),
                                                                  128,
                                                                )),
                                                              ]),
                                                            ],
                                                          )
                                                        ),
                                                      ),
                                                      128,
                                                    )),
                                                  ]),
                                                ]),
                                              ],
                                              2,
                                            )
                                          ),
                                        ),
                                        128,
                                      ))
                                    : (E(),
                                      $(
                                        'p',
                                        ap,
                                        te(
                                          G.value.size > 0
                                            ? 'No films at selected cinemas'
                                            : 'No films showing on this date',
                                        ),
                                        1,
                                      )),
                              ]),
                              fe(a).length
                                ? (E(),
                                  $('div', cp, [
                                    oe.value > 0
                                      ? (E(),
                                        $(
                                          'button',
                                          {
                                            key: 0,
                                            onClick:
                                              H[5] ||
                                              (H[5] = (q) =>
                                                (x.value = new Map())),
                                            class:
                                              'border border-border-dark px-4 py-2 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer shrink-0',
                                          },
                                          ' Clear ',
                                        ))
                                      : ne('', !0),
                                    g(
                                      'button',
                                      {
                                        onClick: xt,
                                        disabled: oe.value === 0,
                                        class:
                                          'flex-1 border border-border-dark px-4 py-2 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink',
                                      },
                                      ' Add ' +
                                        te(oe.value) +
                                        ' Film' +
                                        te(oe.value !== 1 ? 's' : ''),
                                      9,
                                      up,
                                    ),
                                  ]))
                                : ne('', !0),
                            ],
                            64,
                          ))
                        : ne('', !0),
                    ]),
                  ],
                  544,
                ))
              : ne('', !0),
          ])
        )
      );
    },
  },
  fp = { key: 0, class: 'border-b border-border bg-ink/[0.02]' },
  hp = { class: 'max-w-[1400px] mx-auto px-6 py-2 flex items-center gap-3' },
  pp = { class: 'flex items-center -space-x-1 shrink-0' },
  mp = ['src', 'alt'],
  gp = { class: 'flex items-center gap-2 text-xs text-ink min-w-0' },
  bp = { class: 'font-medium truncate' },
  yp = { class: 'text-ink-lighter shrink-0' },
  vp = { class: 'flex items-center gap-1 ml-auto shrink-0' },
  wp = {
    __name: 'CinemaBar',
    setup(e) {
      const {
          selectedCinemas: t,
          selectedDate: s,
          isActive: i,
          showModal: n,
          clear: r,
        } = er(),
        o = Xe(() =>
          s.value
            ? new Date(s.value + 'T00:00:00').toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })
            : '',
        ),
        l = Xe(() => {
          const a = t.value.length;
          return a === 0
            ? ''
            : a === 1
              ? t.value[0].name
              : `${t.value[0].name} +${a - 1} more`;
        });
      return (a, c) =>
        fe(i)
          ? (E(),
            $('div', fp, [
              g('div', hp, [
                g('div', pp, [
                  (E(!0),
                  $(
                    ie,
                    null,
                    ze(
                      fe(t).slice(0, 3),
                      (u) => (
                        E(),
                        $(
                          'img',
                          {
                            key: u.id,
                            src:
                              u.chain === 'vue'
                                ? '/icons/vue.png'
                                : '/icons/cineworld.svg',
                            alt: u.chain,
                            class: 'w-5 h-5 rounded border border-cream',
                          },
                          null,
                          8,
                          mp,
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
                g('div', gp, [
                  g('span', bp, te(l.value), 1),
                  c[2] ||
                    (c[2] = g('span', { class: 'text-ink-lighter' }, '·', -1)),
                  g('span', yp, te(o.value), 1),
                ]),
                g('div', vp, [
                  g(
                    'button',
                    {
                      'onClick': c[0] || (c[0] = (u) => (n.value = !0)),
                      'class':
                        'p-1.5 text-ink/50 hover:text-ink transition-colors cursor-pointer',
                      'aria-label': 'Edit cinema selection',
                    },
                    [
                      ...(c[3] ||
                        (c[3] = [
                          g(
                            'svg',
                            {
                              'class': 'w-3.5 h-3.5',
                              'viewBox': '0 0 16 16',
                              'fill': 'none',
                              'stroke': 'currentColor',
                              'stroke-width': '1.5',
                            },
                            [
                              g('path', {
                                d: 'M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z',
                              }),
                            ],
                            -1,
                          ),
                        ])),
                    ],
                  ),
                  g(
                    'button',
                    {
                      'onClick':
                        c[1] || (c[1] = (...u) => fe(r) && fe(r)(...u)),
                      'class':
                        'p-1.5 text-ink/50 hover:text-ink transition-colors cursor-pointer',
                      'aria-label': 'Clear cinema selection',
                    },
                    [
                      ...(c[4] ||
                        (c[4] = [
                          g(
                            'svg',
                            {
                              'class': 'w-3.5 h-3.5',
                              'viewBox': '0 0 16 16',
                              'fill': 'none',
                              'stroke': 'currentColor',
                              'stroke-width': '1.5',
                            },
                            [g('path', { d: 'M4 4l8 8M12 4l-8 8' })],
                            -1,
                          ),
                        ])),
                    ],
                  ),
                ]),
              ]),
            ]))
          : ne('', !0);
    },
  },
  xp = { class: 'min-h-screen flex flex-col' },
  kp = { class: 'flex-1 max-w-[1400px] mx-auto px-6 py-8 w-full' },
  Tp = {
    __name: 'App',
    setup(e) {
      const { loadFromUrl: t, addMovie: s } = Bi(),
        i = se(null),
        n = se(null);
      function r(a) {
        i.value = a;
      }
      function o() {
        i.value = null;
      }
      Bo('openTrailer', r);
      async function l(a) {
        for (const c of a)
          try {
            const u = { query: c.name };
            c.releaseYear && (u.year = c.releaseYear);
            const f = await ki('/search/movie', u);
            f.results && f.results.length > 0 && s(f.results[0].id);
          } catch {}
      }
      return (
        Di(t),
        (a, c) => (
          E(),
          $('div', xp, [
            c[1] ||
              (c[1] = Qn(
                '<header class="border-b border-border"><div class="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between"><h1 class="font-serif text-xl text-ink">CinemaSync</h1><div class="flex items-center gap-4"><p class="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-ink-lighter"> Built by <a href="https://taylordrayson.com" target="_blank" rel="noopener" aria-label="Taylor Drayson (opens in a new tab)" class="text-ink hover:text-accent transition-colors">Taylor Drayson</a></p><a href="https://github.com/tdrayson/cinema-clash" target="_blank" rel="noopener" aria-label="Open GitHub repo (opens in a new tab)" class="text-ink-lighter hover:text-ink transition-colors"><svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a></div></div></header>',
                1,
              )),
            Te(vd, { ref_key: 'searchBar', ref: n }, null, 512),
            Te(wp),
            g('main', kp, [
              Te(Xd, { onAdd: c[0] || (c[0] = (u) => n.value?.openSearch()) }),
            ]),
            c[2] ||
              (c[2] = g(
                'footer',
                { class: 'border-t border-border' },
                [
                  g('div', { class: 'max-w-[1400px] mx-auto px-6 py-4' }, [
                    g(
                      'p',
                      {
                        class:
                          'text-[10px] uppercase tracking-widest text-ink-lighter',
                      },
                      ' CinemaSync · Film Comparison Tool ',
                    ),
                  ]),
                ],
                -1,
              )),
            Te(dh, { 'video-id': i.value, 'onClose': o }, null, 8, [
              'video-id',
            ]),
            Te(dp, { onAddFilms: l }),
          ])
        )
      );
    },
  };
Eu(Tp).mount('#app');
