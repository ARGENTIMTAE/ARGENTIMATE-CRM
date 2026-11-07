/* Argentimate – Diseñador de grabado en virola v2
   Aparece en todos los productos con opción de grabado (Con/Sin grabado, o atributo "Grabado" Sí/No).
   Instalado desde Empretienda: Mi tienda > Etiquetas HTML. */
(function () {
  if (window.__amGrabado) return; window.__amGrabado = true;

  var WA = '5493415964302', AZUL = '#004aad', CREMA = '#fff7ed';

  // Nombres = los de la tabla de Argentimate. Fuente web = la más parecida disponible online.
  var FUENTES = [
    { n: 'CANDARA', f: 'Lato', w: 400 },
    { n: 'CLAREDON', f: 'Rokkitt', w: 700 },
    { n: 'SEGOE', f: 'Patrick Hand', w: 400 },
    { n: 'CORBEL LIGHT', f: 'Raleway', w: 300 },
    { n: 'KAWAMANN', f: 'Permanent Marker', w: 400 },
    { n: 'BRUSH SCRIPT', f: 'Kaushan Script', w: 400 },
    { n: 'SHOWCARD GOTHIC', f: 'Bowlby One SC', w: 400 },
    { n: 'BROADWEY', f: 'Limelight', w: 400 },
    { n: 'MYANMAR', f: 'Noto Sans', w: 500 },
    { n: 'BOOK ANTIGUA', f: 'EB Garamond', w: 400 },
    { n: 'ENGRAVERS', f: 'Cinzel', w: 700 },
    { n: 'FELIZ TITLING', f: 'Marcellus SC', w: 400 },
    { n: 'MISTRAL', f: 'Caveat', w: 500 },
    { n: 'STENCIL', f: 'Stardos Stencil', w: 700 },
    { n: 'GEOMETR', f: 'Jost', w: 500 }
  ];
  var SUP = {
    plantilla: { n: 'Plantilla', ring: '#ffffff', line: '#111', ink: '#111' },
    alpaca: { n: 'Alpaca', ring: '#e6e0d2', line: '#8c8473', ink: 'rgba(60,52,40,.9)' },
    acero: { n: 'Acero', ring: '#e9edf1', line: '#8d969f', ink: 'rgba(40,45,52,.9)' }
  };

  // ---------- ilustraciones (dibujadas en un cuadro de -1 a 1) ----------
  function poli(c, pts) { c.beginPath(); pts.forEach(function (p, i) { i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }); c.closePath(); c.fill(); }
  function estrellaPts(n, ro, ri) { var p = []; for (var i = 0; i < n * 2; i++) { var a = -Math.PI / 2 + i * Math.PI / n, r = i % 2 ? ri : ro; p.push([r * Math.cos(a), r * Math.sin(a)]); } return p; }
  function circ(c, x, y, r) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); }
  var ICONOS = {
    estrella: { n: 'Estrella', d: function (c) { poli(c, estrellaPts(5, 1, .42)); } },
    destello: { n: 'Destello', d: function (c) { poli(c, estrellaPts(4, 1, .22)); } },
    corazon: { n: 'Corazón', d: function (c) { c.beginPath(); c.moveTo(0, .9); c.bezierCurveTo(-1.3, 0, -1, -1, 0, -.45); c.bezierCurveTo(1, -1, 1.3, 0, 0, .9); c.fill(); } },
    flor: { n: 'Flor', d: function (c, bg) { for (var i = 0; i < 5; i++) { var a = i * 2 * Math.PI / 5 - Math.PI / 2; c.beginPath(); c.ellipse(.5 * Math.cos(a), .5 * Math.sin(a), .48, .33, a, 0, Math.PI * 2); c.fill(); } var f = c.fillStyle; c.fillStyle = bg; circ(c, 0, 0, .25); c.fillStyle = f; circ(c, 0, 0, .14); } },
    sol: { n: 'Sol', d: function (c) { circ(c, 0, 0, .45); for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6, b = .09; poli(c, [[.58 * Math.cos(a - b), .58 * Math.sin(a - b)], [Math.cos(a), Math.sin(a)], [.58 * Math.cos(a + b), .58 * Math.sin(a + b)]]); } } },
    luna: { n: 'Luna', d: function (c, bg) { circ(c, 0, 0, .9); var f = c.fillStyle; c.fillStyle = bg; circ(c, .42, -.28, .75); c.fillStyle = f; } },
    trebol: { n: 'Trébol', d: function (c) { [[0, -.45], [.45, 0], [0, .45], [-.45, 0]].forEach(function (p) { circ(c, p[0] * 1.05, p[1] * 1.05, .4); }); c.fillRect(-.06, .4, .12, .6); } },
    corona: { n: 'Corona', d: function (c) { poli(c, [[-1, -.5], [-.55, .05], [0, -.75], [.55, .05], [1, -.5], [.8, .55], [-.8, .55]]); c.fillRect(-.8, .65, 1.6, .2); } },
    infinito: { n: 'Infinito', d: function (c) { c.beginPath(); for (var t = 0; t <= 6.3; t += .05) { var s = Math.sin(t), q = 1 + s * s, x = Math.cos(t) / q, y = s * Math.cos(t) / q; t ? c.lineTo(x * .95, y * .95) : c.moveTo(x * .95, y * .95); } c.lineWidth = .17; c.strokeStyle = c.fillStyle; c.stroke(); } },
    rayo: { n: 'Rayo', d: function (c) { poli(c, [[.2, -1], [-.6, .15], [-.05, .15], [-.25, 1], [.6, -.2], [.05, -.2]]); } },
    nota: { n: 'Nota musical', d: function (c) { c.beginPath(); c.ellipse(-.35, .6, .35, .25, -.4, 0, Math.PI * 2); c.fill(); c.fillRect(-.06, -.95, .13, 1.55); poli(c, [[.06, -.95], [.6, -.6], [.6, -.35], [.06, -.62]]); } },
    mate: { n: 'Mate', d: function (c) { c.beginPath(); c.moveTo(-.6, -.35); c.bezierCurveTo(-.75, .5, -.4, .95, 0, .95); c.bezierCurveTo(.4, .95, .75, .5, .6, -.35); c.closePath(); c.fill(); c.fillRect(-.68, -.48, 1.36, .16); c.save(); c.translate(.25, -.55); c.rotate(.45); c.fillRect(-.05, -.5, .1, .7); c.restore(); c.save(); c.translate(.47, -1); c.rotate(.45); c.fillRect(-.12, -.04, .24, .08); c.restore(); } },
    laurel: { n: 'Rama', d: function (c) { c.lineWidth = .07; c.strokeStyle = c.fillStyle; c.beginPath(); c.moveTo(-.9, .6); c.quadraticCurveTo(0, -.2, .95, -.6); c.stroke(); for (var i = 0; i < 5; i++) { var t = i / 4.5, x = -.8 + t * 1.6, y = .5 - t * 1.05; [1, -1].forEach(function (s) { c.beginPath(); c.ellipse(x + .08 * s, y - .18 * s, .22, .09, -.6 + s * .9, 0, Math.PI * 2); c.fill(); }); } } },
    diamante: { n: 'Diamante', d: function (c) { poli(c, [[-.6, -.6], [.6, -.6], [1, -.15], [0, .95], [-1, -.15]]); } },
    ancla: { n: 'Ancla', d: function (c) { c.lineWidth = .14; c.strokeStyle = c.fillStyle; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, -.6); c.lineTo(0, .9); c.moveTo(-.4, -.35); c.lineTo(.4, -.35); c.moveTo(-.75, .3); c.quadraticCurveTo(-.6, .9, 0, .9); c.quadraticCurveTo(.6, .9, .75, .3); c.stroke(); c.beginPath(); c.arc(0, -.78, .18, 0, Math.PI * 2); c.stroke(); } },
    pata: { n: 'Huellita', d: function (c) { c.beginPath(); c.ellipse(0, .35, .45, .38, 0, 0, Math.PI * 2); c.fill(); [[-.6, -.15], [-.25, -.6], [.25, -.6], [.6, -.15]].forEach(function (p) { c.beginPath(); c.ellipse(p[0], p[1], .19, .25, p[0] * .5, 0, Math.PI * 2); c.fill(); }); } }
  };

  // ---------- estado ----------
  var CX = 350, CY = 350, R1 = 330, R0 = 228, RM = (R0 + R1) / 2;
  function nuevoTexto(ang) { return { t: 'text', txt: '', fuente: 0, tam: 58, ang: ang, r: RM, modo: 'curvo', esp: 2 }; }
  // Termo (vista de frente): zona grabable dentro del cuerpo
  var TZ = { x0: 248, x1: 452, y0: 205, y1: 625 };
  function nuevoTextoT(y) { return { t: 'text', txt: '', fuente: 0, tam: 40, x: 350, y: y, rot: 0, esp: 2 }; }
  var SUPT = {
    plantilla: { n: 'Plantilla', ring: '#ffffff', line: '#111', ink: '#111' },
    acero: { n: 'Acero', ring: '#d9dde1', line: '#7d858d', ink: 'rgba(45,50,58,.9)' },
    negro: { n: 'Negro', ring: '#2b2b2b', line: '#000', ink: '#cfd3d7' },
    blanco: { n: 'Blanco', ring: '#f6f6f6', line: '#9a9a9a', ink: '#80868c' }
  };
  var PZ = {
    virola: { pieza: 'virola', sup: 'plantilla', items: [nuevoTexto(-Math.PI / 2)], sel: 0 },
    termo: { pieza: 'termo', sup: 'plantilla', items: [nuevoTextoT(330)], sel: 0 }
  };
  var NOMBRE_PZ = { virola: 'Virola del mate', termo: 'Termo' };
  function piezasProducto() {
    var n = nombreProducto().toLowerCase(), t = /termo/.test(n), m = /\bmates?\b|calabaza|imperial|torpedo|camionero|virola|combo|set\b|kit/.test(n);
    if (t && m) return /^termo/.test(n) ? ['termo', 'virola'] : ['virola', 'termo'];
    return t ? ['termo'] : ['virola'];
  }
  var st = PZ.virola, piezaInicial = false;
  function sups() { return st.pieza === 'termo' ? SUPT : SUP; }
  function hayContenido(p) { return PZ[p].items.some(function (it) { return it.t !== 'text' || it.txt.trim(); }); }
  var resultado = null;

  // ---------- detectar la opción de grabado ----------
  function itemsGrabado() { // devuelve los botones del atributo de grabado, o null
    var attrs = document.querySelectorAll('.product-vip__attribute');
    for (var i = 0; i < attrs.length; i++) {
      var nom = (attrs[i].querySelector('.product-vip__attribute-name') || {}).textContent || '';
      var its = attrs[i].querySelectorAll('.product-vip__attribute-item');
      var vals = [].map.call(its, function (x) { return x.getAttribute('data-value') || ''; }).join('|');
      if (/grabad/i.test(vals) || /grabad/i.test(nom)) return its;
    }
    return null;
  }
  function conGrabado() {
    var its = itemsGrabado(); if (!its) return false;
    for (var i = 0; i < its.length; i++) if (its[i].classList.contains('product-vip__attribute-item--selected')) {
      var v = (its[i].getAttribute('data-value') || '').trim();
      return /con\s*grabad/i.test(v) || /^s[ií]\b/i.test(v) || (/grabad/i.test(v) && !/sin/i.test(v));
    }
    return false;
  }
  function nombreProducto() { var h = document.querySelector('h1'); return h ? h.textContent.trim() : document.title.split(' - ')[0]; }
  function fontStr(it) { var F = FUENTES[it.fuente]; return F.w + ' ' + it.tam + 'px "' + F.f + '"'; }
  function abajo(a) { return Math.sin(a) > 0.15; } // en la mitad de abajo se da vuelta para leerse derecho
  function norm(a) { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; }

  // ---------- fuentes y estilos (se cargan solo en productos con grabado) ----------
  var estilosListos = false;
  function cargarEstilos() {
    if (estilosListos) return; estilosListos = true;
    var fam = FUENTES.map(function (F) { return 'family=' + F.f.replace(/ /g, '+') + (F.w !== 400 ? ':wght@' + F.w : ''); }).join('&');
    var link = document.createElement('link'); link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + fam + '&family=Montserrat:wght@500;700&display=swap';
    document.head.appendChild(link);
    var css = document.createElement('style');
    css.textContent = [
      '.amg-box{margin:12px 0 4px;padding:14px;border:1.5px dashed ' + AZUL + ';border-radius:12px;background:' + CREMA + '}',
      '.amg-box p{margin:0 0 10px;color:#333;font-size:14px;line-height:1.4}',
      '.amg-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:0;border-radius:999px;padding:11px 18px;font-size:15px;font-weight:700;cursor:pointer;background:' + AZUL + ';color:#fff;font-family:Montserrat,system-ui,sans-serif}',
      '.amg-btn.sec{background:#fff;color:' + AZUL + ';border:1.5px solid ' + AZUL + '}',
      '.amg-btn.wa{background:#25d366}',
      '.amg-btn.sm{padding:7px 12px;font-size:13px}',
      '.amg-res{display:flex;gap:12px;align-items:center}',
      '.amg-res img{width:130px;height:auto;border-radius:8px;border:1px solid #ddd;background:#fff}',
      '.amg-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99999;display:flex;align-items:center;justify-content:center;padding:10px}',
      '.amg-m{position:relative;background:#fff;border-radius:16px;width:min(980px,100%);max-height:96vh;overflow:auto;display:grid;grid-template-columns:1fr 1fr;font-family:Montserrat,system-ui,sans-serif;color:#222}',
      '.amg-prev{background:' + CREMA + ';padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:sticky;top:0;align-self:start;box-sizing:border-box}',
      '.amg-prev canvas{width:100%;max-width:440px;height:auto;touch-action:none;cursor:pointer}',
      '.amg-prev small{color:#666;text-align:center;font-size:12px}',
      '.amg-ctl{padding:16px 18px;display:flex;flex-direction:column;gap:12px}',
      '.amg-ctl h3{margin:0;color:' + AZUL + ';font-size:20px;padding-right:36px}',
      '.amg-ctl h4{margin:0 0 6px;font-size:13px;color:#444}',
      '.amg-ctl label{font-size:12px;font-weight:700;color:#555;display:block;margin:6px 0 4px}',
      '.amg-ctl input[type=text]{width:100%;box-sizing:border-box;padding:10px;border:1.5px solid #ccc;border-radius:8px;font-size:16px}',
      '.amg-ctl input[type=range]{width:100%;accent-color:' + AZUL + '}',
      '.amg-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}',
      '.amg-ctl .amg-chips{justify-content:flex-start}',
      '.amg-chip{border:1.5px solid #ccc;background:#fff;border-radius:999px;padding:5px 11px;cursor:pointer;font-size:14px;color:#222;line-height:1.3}',
      '.amg-chip.on{border-color:' + AZUL + ';background:' + AZUL + ';color:#fff}',
      '.amg-fonts{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-height:190px;overflow:auto;padding:2px}',
      '.amg-fonts .amg-chip{border-radius:8px;font-size:12px;padding:8px 3px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.amg-icons{display:grid;grid-template-columns:repeat(8,1fr);gap:6px}',
      '.amg-ib{border:1.5px solid #ddd;background:#fff;border-radius:8px;padding:4px;cursor:pointer;aspect-ratio:1}',
      '.amg-ib:hover{border-color:' + AZUL + '}',
      '.amg-ib canvas{width:100%;height:100%;display:block}',
      '.amg-card{border:1.5px solid #e3e3e3;border-radius:12px;padding:10px 12px;background:#fafafa}',
      '.amg-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
      '.amg-x{position:absolute;top:10px;right:12px;border:0;background:#fff;border-radius:50%;width:36px;height:36px;font-size:22px;cursor:pointer;box-shadow:0 1px 6px rgba(0,0,0,.25);z-index:3}',
      '.amg-acc{display:flex;gap:8px;flex-wrap:wrap}',
      '.amg-del{background:none;border:0;color:#c0392b;font-size:13px;cursor:pointer;padding:4px 0;font-weight:700}',
      '.amg-nota{font-size:12px;color:#666;margin:0}',
      '.amg-m.amg-av{grid-template-columns:1fr;width:min(520px,100%)}',
      '.amg-av a.amg-btn{text-decoration:none}',
      '@media(max-width:760px){.amg-m{grid-template-columns:1fr;max-height:98vh}.amg-prev{position:sticky;top:0;z-index:2;padding:8px}.amg-prev canvas{max-width:240px}.amg-prev small{display:none}.amg-fonts{grid-template-columns:repeat(2,1fr)}.amg-icons{grid-template-columns:repeat(6,1fr)}}'
    ].join('');
    document.head.appendChild(css);
  }

  // ---------- logo subido ----------
  function logoGrabado(img, ink) {
    var m = 400, k = Math.min(1, m / Math.max(img.width, img.height));
    var cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
    var c = cv.getContext('2d'); c.drawImage(img, 0, 0, cv.width, cv.height);
    var d = c.getImageData(0, 0, cv.width, cv.height), p = d.data;
    var tmp = document.createElement('canvas').getContext('2d'); tmp.fillStyle = ink; tmp.fillRect(0, 0, 1, 1); var col = tmp.getImageData(0, 0, 1, 1).data;
    for (var i = 0; i < p.length; i += 4) { var lum = .299 * p[i] + .587 * p[i + 1] + .114 * p[i + 2]; var on = p[i + 3] > 40 && lum < 160; p[i] = col[0]; p[i + 1] = col[1]; p[i + 2] = col[2]; p[i + 3] = on ? 255 : 0; }
    c.putImageData(d, 0, 0); return cv;
  }

  // ---------- dibujo ----------
  function anchoAngular(c, it) {
    if (it.t === 'text') { c.font = fontStr(it); var s = it.txt || 'Escribí tu texto'; return (c.measureText(s).width + it.esp * s.length) / it.r; }
    return (it.tam * (it.t === 'img' ? 1.2 : 1)) / it.r;
  }
  function dibujarItem(c, it, S, preview) {
    c.save(); c.fillStyle = S.ink;
    if (it.t === 'text') {
      var txt = it.txt;
      if (!txt) { if (!preview) { c.restore(); return; } txt = 'Escribí tu texto'; c.fillStyle = 'rgba(0,0,0,.28)'; }
      c.font = fontStr(it); c.textAlign = 'center'; c.textBaseline = 'middle';
      var inv = abajo(it.ang);
      if (it.modo === 'recto') {
        c.translate(CX + it.r * Math.cos(it.ang), CY + it.r * Math.sin(it.ang));
        c.rotate(it.ang + (inv ? -Math.PI / 2 : Math.PI / 2)); c.fillText(txt, 0, 0);
      } else {
        var chars = Array.from(txt), ws = chars.map(function (ch) { return c.measureText(ch).width; });
        var total = ws.reduce(function (a, b) { return a + b; }, 0) + it.esp * (chars.length - 1), A = total / it.r;
        var pos = -A / 2; // recorrido angular desde el comienzo del texto
        chars.forEach(function (ch, i) {
          var mid = pos + ws[i] / 2 / it.r, phi = inv ? it.ang - mid : it.ang + mid;
          c.save(); c.translate(CX + it.r * Math.cos(phi), CY + it.r * Math.sin(phi));
          c.rotate(phi + (inv ? -Math.PI / 2 : Math.PI / 2)); c.fillText(ch, 0, 0); c.restore();
          pos += (ws[i] + it.esp) / it.r;
        });
      }
    } else {
      c.translate(CX + it.r * Math.cos(it.ang), CY + it.r * Math.sin(it.ang));
      c.rotate(it.ang + (abajo(it.ang) ? -Math.PI / 2 : Math.PI / 2) + (it.rot || 0) * Math.PI / 180);
      if (it.t === 'icon') { var s = it.tam / 2; c.scale(s, s); ICONOS[it.icon].d(c, S.ring); }
      else if (it.cache && it.cache[st.sup]) { var im = it.cache[st.sup], w = it.tam * 1.2, h = w * im.height / im.width; c.drawImage(im, -w / 2, -h / 2, w, h); }
      else { var q = it.tam * .6; c.strokeStyle = S.ink; c.lineWidth = 3; c.setLineDash([8, 6]); c.strokeRect(-q, -q * .7, q * 2, q * 1.4); c.setLineDash([]); c.font = '700 ' + Math.round(q * .45) + 'px Montserrat,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('LOGO', 0, 0); }
    }
    c.restore();
  }
  function dibujar(cv, preview) { return st.pieza === 'termo' ? dibujarTermo(cv, preview) : dibujarVirola(cv, preview); }

  // ---------- termo ----------
  function anchoT(c, it) {
    if (it.t === 'text') { c.font = fontStr(it); var s = Array.from(it.txt || 'Escribí tu texto'); return s.reduce(function (a, ch) { return a + c.measureText(ch).width; }, 0) + it.esp * (s.length - 1); }
    return it.tam * (it.t === 'img' ? 1.2 : 1);
  }
  function escalaT(c, it) { if (it.t !== 'text') return 1; var max = Math.abs(it.rot || 0) === 90 ? TZ.y1 - TZ.y0 : TZ.x1 - TZ.x0, w = anchoT(c, it); return w > max ? max / w : 1; }
  function altoT(it) { return it.t === 'text' ? it.tam * .95 : it.tam * (it.t === 'img' ? .9 : 1); }
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r); c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h); c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r); c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y); c.closePath(); }
  function dibujarItemT(c, it, S, preview) {
    c.save(); c.fillStyle = S.ink; c.translate(it.x, it.y); c.rotate((it.rot || 0) * Math.PI / 180);
    if (it.t === 'text') {
      var txt = it.txt;
      if (!txt) { if (!preview) { c.restore(); return; } txt = 'Escribí tu texto'; c.fillStyle = S.ring === '#2b2b2b' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.28)'; }
      var f = escalaT(c, it); if (f < 1) c.scale(f, f);
      c.font = fontStr(it); c.textAlign = 'left'; c.textBaseline = 'middle';
      var chars = Array.from(txt), x = -anchoT(c, it) / 2;
      chars.forEach(function (ch) { c.fillText(ch, x, 0); x += c.measureText(ch).width + it.esp; });
    } else if (it.t === 'icon') { var s = it.tam / 2; c.scale(s, s); ICONOS[it.icon].d(c, S.ring); }
    else if (it.cache && it.cache[st.sup]) { var im = it.cache[st.sup], w = it.tam * 1.2, h = w * im.height / im.width; c.drawImage(im, -w / 2, -h / 2, w, h); }
    else { var q = it.tam * .6; c.strokeStyle = S.ink; c.lineWidth = 3; c.setLineDash([8, 6]); c.strokeRect(-q, -q * .7, q * 2, q * 1.4); c.setLineDash([]); c.font = '700 ' + Math.round(q * .45) + 'px Montserrat,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('LOGO', 0, 0); }
    c.restore();
  }
  function dibujarTermo(cv, preview) {
    var c = cv.getContext('2d'), S = SUPT[st.sup];
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, 700, 700);
    if (!preview) { c.fillStyle = '#fff'; c.fillRect(0, 0, 700, 700); }
    function relleno(x0, x1) { if (st.sup === 'plantilla') return S.ring; var g = c.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, S.line); g.addColorStop(.25, S.ring); g.addColorStop(.45, st.sup === 'negro' ? '#444' : '#fff'); g.addColorStop(.7, S.ring); g.addColorStop(1, S.line); return g; }
    c.lineWidth = 5; c.strokeStyle = st.sup === 'plantilla' ? '#111' : S.line; c.lineJoin = 'round';
    // manija (media manija a la derecha)
    c.beginPath(); c.moveTo(470, 235); c.bezierCurveTo(560, 235, 560, 430, 470, 430); c.lineWidth = 22; c.strokeStyle = st.sup === 'plantilla' ? '#111' : S.line; c.stroke(); c.lineWidth = 12; c.strokeStyle = st.sup === 'plantilla' ? '#fff' : S.ring; c.stroke();
    c.lineWidth = 5; c.strokeStyle = st.sup === 'plantilla' ? '#111' : S.line;
    // tapa
    rr(c, 268, 48, 164, 78, 14); c.fillStyle = relleno(268, 432); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(268, 72); c.lineTo(432, 72); c.lineWidth = 3; c.stroke(); c.lineWidth = 5;
    // hombro y cuerpo
    c.beginPath(); c.moveTo(280, 126); c.lineTo(420, 126); c.quadraticCurveTo(470, 140, 474, 185); c.lineTo(474, 625); c.quadraticCurveTo(474, 662, 440, 662); c.lineTo(260, 662); c.quadraticCurveTo(226, 662, 226, 625); c.lineTo(226, 185); c.quadraticCurveTo(230, 140, 280, 126); c.closePath();
    c.fillStyle = relleno(226, 474); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(226, 192); c.lineTo(474, 192); c.lineWidth = 3; c.stroke();
    if (preview) { c.save(); c.setLineDash([6, 6]); c.lineWidth = 1.5; c.strokeStyle = st.sup === 'negro' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.2)'; c.strokeRect(TZ.x0, TZ.y0, TZ.x1 - TZ.x0, TZ.y1 - TZ.y0); c.restore(); }
    st.items.forEach(function (it) { dibujarItemT(c, it, S, preview); });
    if (preview && st.items[st.sel]) {
      var it = st.items[st.sel], fe = escalaT(c, it), w = anchoT(c, it) * fe + 16, h = altoT(it) * fe + 14;
      c.save(); c.translate(it.x, it.y); c.rotate((it.rot || 0) * Math.PI / 180); c.strokeStyle = AZUL; c.lineWidth = 2.5; c.setLineDash([8, 6]); c.strokeRect(-w / 2, -h / 2, w, h); c.restore();
    }
  }

  function dibujarVirola(cv, preview) {
    var c = cv.getContext('2d'), S = SUP[st.sup];
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, 700, 700);
    if (!preview) { c.fillStyle = '#fff'; c.fillRect(0, 0, 700, 700); }
    c.beginPath(); c.arc(CX, CY, R1, 0, Math.PI * 2); c.arc(CX, CY, R0, 0, Math.PI * 2, true);
    if (st.sup !== 'plantilla') { var g = c.createRadialGradient(CX - 80, CY - 120, 40, CX, CY, R1); g.addColorStop(0, '#fff'); g.addColorStop(.55, S.ring); g.addColorStop(1, S.line); c.fillStyle = g; } else c.fillStyle = S.ring;
    c.fill('evenodd');
    c.strokeStyle = S.line; c.lineWidth = 8; c.beginPath(); c.arc(CX, CY, R1 - 4, 0, Math.PI * 2); c.stroke();
    c.lineWidth = 5; c.beginPath(); c.arc(CX, CY, R0, 0, Math.PI * 2); c.stroke();
    if (preview) { c.fillStyle = '#fff'; c.beginPath(); c.arc(CX, CY, R0 - 3, 0, Math.PI * 2); c.fill(); }
    st.items.forEach(function (it) { dibujarItem(c, it, S, preview); });
    if (preview && st.items[st.sel]) {
      var it = st.items[st.sel], A = anchoAngular(c, it) / 2 + .04, h = it.tam * .62 + 6;
      c.save(); c.strokeStyle = AZUL; c.lineWidth = 2.5; c.setLineDash([8, 6]);
      c.beginPath(); c.arc(CX, CY, it.r + h, it.ang - A, it.ang + A); c.arc(CX, CY, Math.max(10, it.r - h), it.ang + A, it.ang - A, true); c.closePath(); c.stroke(); c.restore();
    }
    if (preview) { c.fillStyle = '#9a9a9a'; c.textAlign = 'center'; c.font = '500 22px Montserrat'; c.fillText('Vista superior de la virola', CX, CY - 6); c.font = '500 18px Montserrat'; c.fillText('Arrastrá cada elemento', CX, CY + 24); }
  }
  function iconoMini(key) {
    var cv = document.createElement('canvas'); cv.width = cv.height = 64; var c = cv.getContext('2d');
    c.translate(32, 32); c.scale(24, 24); c.fillStyle = '#222'; ICONOS[key].d(c, '#fff'); return cv;
  }

  // ---------- editor ----------
  function abrir() {
    var ov = document.createElement('div'); ov.className = 'amg-ov';
    ov.innerHTML =
      '<div class="amg-m"><button type="button" class="amg-x" aria-label="Cerrar">×</button>' +
      '<div class="amg-prev"><canvas width="700" height="700"></canvas><small id="amg-hint"></small>' +
      '<div class="amg-chips" id="amg-sup"></div></div>' +
      '<div class="amg-ctl"><h3 id="amg-tit">Diseñá tu grabado</h3>' +
      '<div id="amg-pzw" style="display:none"><h4>¿Dónde va el grabado?</h4><div class="amg-chips" id="amg-pz"></div><p class="amg-nota" style="margin-top:4px">Podés diseñar los dos: cambiá acá y seguí diseñando.</p></div>' +
      '<div class="amg-acc"><button type="button" class="amg-btn sm sec" id="amg-addt">+ Agregar texto</button>' +
      '<label class="amg-btn sm sec" style="margin:0;color:' + AZUL + '">+ Subir logo<input type="file" id="amg-logo" accept="image/*" style="display:none"></label></div>' +
      '<div id="amg-ed"></div>' +
      '<div><h4>Elementos gráficos (tocá para agregar)</h4><div class="amg-icons" id="amg-icons"></div></div>' +
      '<p class="amg-nota">La vista previa es aproximada. Antes de grabar te mandamos una muestra para que la apruebes. Si subís un logo o escudo, después te pedimos el archivo original.</p>' +
      '<div class="amg-acc"><button type="button" class="amg-btn" id="amg-ok">✓ Listo, usar este diseño</button></div>' +
      '</div></div>';
    document.body.appendChild(ov); document.body.style.overflow = 'hidden';
    var q = function (s) { return ov.querySelector(s); }, cv = q('canvas');
    function r() { dibujar(cv, true); }
    window.__amgR = r;

    var piezas = piezasProducto();
    if (!piezaInicial) { st = PZ[piezas[0]]; piezaInicial = true; }
    if (piezas.indexOf(st.pieza) < 0) st = PZ[piezas[0]];
    function marcarSup() { [].forEach.call(ov.querySelectorAll('[data-s]'), function (b) { b.classList.toggle('on', b.dataset.s === st.sup); }); }
    function armarPieza() {
      var S = sups();
      q('#amg-sup').innerHTML = Object.keys(S).map(function (k) { return '<button type="button" class="amg-chip" data-s="' + k + '">' + S[k].n + '</button>'; }).join('');
      q('#amg-hint').textContent = st.pieza === 'termo' ? 'Tocá un elemento para editarlo y arrastralo sobre el termo' : 'Tocá un elemento para editarlo y arrastralo alrededor de la virola';
      q('#amg-tit').textContent = st.pieza === 'termo' ? 'Diseñá el grabado de tu termo' : 'Diseñá el grabado de tu virola';
      [].forEach.call(ov.querySelectorAll('[data-pz]'), function (b) { b.classList.toggle('on', b.dataset.pz === st.pieza); });
      marcarSup();
    }
    if (piezas.length > 1) {
      q('#amg-pzw').style.display = '';
      q('#amg-pz').innerHTML = piezas.map(function (p) { return '<button type="button" class="amg-chip" data-pz="' + p + '">' + NOMBRE_PZ[p] + '</button>'; }).join('');
      q('#amg-pz').onclick = function (e) { var b = e.target.closest('[data-pz]'); if (!b) return; st = PZ[b.dataset.pz]; if (st.sel < 0 && st.items.length) st.sel = 0; armarPieza(); editor(); r(); };
    }
    q('#amg-sup').onclick = function (e) { var b = e.target.closest('[data-s]'); if (!b) return; st.sup = b.dataset.s; st.items.forEach(function (it) { if (it.t === 'img' && !it.cache[st.sup]) it.cache[st.sup] = logoGrabado(it.src, sups()[st.sup].ink); }); marcarSup(); r(); };
    armarPieza();

    Object.keys(ICONOS).forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'amg-ib'; b.title = ICONOS[k].n; b.setAttribute('aria-label', ICONOS[k].n); b.dataset.icon = k;
      b.appendChild(iconoMini(k)); q('#amg-icons').appendChild(b);
    });
    function nIconos() { return st.items.filter(function (i) { return i.t !== 'text'; }).length; }
    function lugarLibre() { var angs = [-Math.PI / 2 - .95, -Math.PI / 2 + .95, -Math.PI / 2 - 1.6, -Math.PI / 2 + 1.6, Math.PI / 2 - .9, Math.PI / 2 + .9, Math.PI / 2]; return angs[nIconos() % angs.length]; }
    function lugarLibreT() { var ps = [[350, 250], [350, 560], [290, 450], [410, 450], [290, 250], [410, 250]]; return ps[nIconos() % ps.length]; }
    q('#amg-icons').onclick = function (e) {
      var b = e.target.closest('[data-icon]'); if (!b) return;
      if (st.pieza === 'termo') { var p = lugarLibreT(); st.items.push({ t: 'icon', icon: b.dataset.icon, tam: 56, x: p[0], y: p[1], rot: 0 }); }
      else st.items.push({ t: 'icon', icon: b.dataset.icon, tam: 56, ang: lugarLibre(), r: RM, rot: 0 });
      st.sel = st.items.length - 1; editor(); r();
    };
    q('#amg-addt').onclick = function () {
      if (st.pieza === 'termo') { var ys = st.items.filter(function (it) { return it.t === 'text'; }).length; st.items.push(nuevoTextoT([330, 430, 520, 260][ys % 4])); }
      else { var hayArriba = st.items.some(function (it) { return it.t === 'text' && !abajo(it.ang); }); st.items.push(nuevoTexto(hayArriba ? Math.PI / 2 : -Math.PI / 2)); }
      st.sel = st.items.length - 1; editor(); r(); var i = q('#amg-txt'); if (i) i.focus();
    };
    q('#amg-logo').onchange = function () {
      var f = this.files[0]; if (!f) return; var fr = new FileReader();
      fr.onload = function () { var im = new Image(); im.onload = function () { var it = st.pieza === 'termo' ? { t: 'img', src: im, cache: {}, tam: 110, x: 350, y: 470, rot: 0 } : { t: 'img', src: im, cache: {}, tam: 90, ang: Math.PI / 2, r: RM, rot: 0 }; it.cache[st.sup] = logoGrabado(im, sups()[st.sup].ink); st.items.push(it); st.sel = st.items.length - 1; editor(); r(); }; im.src = fr.result; };
      fr.readAsDataURL(f); this.value = '';
    };

    function editor() {
      var ed = q('#amg-ed'), it = st.items[st.sel];
      if (!it) { ed.innerHTML = '<p class="amg-nota">Tocá un elemento para editarlo.</p>'; return; }
      var esT = st.pieza === 'termo';
      var grados = esT ? 0 : Math.round(norm(it.ang + Math.PI / 2) * 180 / Math.PI);
      var h = '<div class="amg-card">';
      if (it.t === 'text') {
        h += '<label>Texto</label><input type="text" id="amg-txt" maxlength="40" placeholder="Ej: Juan · 12/05/2026" value="' + it.txt.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '">' +
          '<label>Tipografía</label><div class="amg-fonts" id="amg-fonts">' + FUENTES.map(function (F, i) { return '<button type="button" class="amg-chip' + (i === it.fuente ? ' on' : '') + '" data-f="' + i + '" style="font-family:\'' + F.f + '\';font-weight:' + F.w + '">' + F.n + '</button>'; }).join('') + '</div>' +
          (esT
            ? '<label>Dirección</label><div class="amg-chips" id="amg-dir"><button type="button" class="amg-chip' + (!it.rot ? ' on' : '') + '" data-r="0">— Horizontal</button><button type="button" class="amg-chip' + (it.rot === -90 ? ' on' : '') + '" data-r="-90">│ Vertical</button></div>'
            : '<label>Forma</label><div class="amg-chips" id="amg-modo"><button type="button" class="amg-chip' + (it.modo === 'curvo' ? ' on' : '') + '" data-m="curvo">⌒ Curvo</button><button type="button" class="amg-chip' + (it.modo === 'recto' ? ' on' : '') + '" data-m="recto">— Recto</button></div>') +
          '<div class="amg-row"><div><label>Tamaño</label><input type="range" id="amg-tam" min="24" max="90" value="' + it.tam + '"></div>' +
          '<div><label>Espaciado</label><input type="range" id="amg-esp" min="-4" max="30" value="' + it.esp + '"></div></div>';
      } else {
        h += '<h4>' + (it.t === 'img' ? 'Logo subido' : ICONOS[it.icon].n) + '</h4>' +
          '<div class="amg-row"><div><label>Tamaño</label><input type="range" id="amg-tam" min="20" max="' + (it.t === 'img' ? 150 : 95) + '" value="' + it.tam + '"></div>' +
          '<div><label>Girar</label><input type="range" id="amg-rot" min="-180" max="180" value="' + (it.rot || 0) + '"></div></div>';
      }
      h += (esT
        ? '<div class="amg-acc" style="margin-top:8px"><button type="button" class="amg-btn sm sec" id="amg-cen">↔ Centrar</button></div>'
        : '<label>Posición alrededor de la virola</label><input type="range" id="amg-ang" min="-180" max="180" value="' + grados + '">') +
        '<button type="button" class="amg-del" id="amg-del">🗑 Quitar este elemento</button></div>';
      ed.innerHTML = h;
      var dr = q('#amg-dir'); if (dr) dr.onclick = function (e) { var b = e.target.closest('[data-r]'); if (!b) return; it.rot = +b.dataset.r; [].forEach.call(dr.children, function (x) { x.classList.toggle('on', x === b); }); limitarT(it); r(); };
      var cn = q('#amg-cen'); if (cn) cn.onclick = function () { it.x = 350; r(); };
      var tx = q('#amg-txt'); if (tx) tx.oninput = function () { it.txt = this.value; r(); };
      var fz = q('#amg-fonts'); if (fz) fz.onclick = function (e) { var b = e.target.closest('[data-f]'); if (!b) return; it.fuente = +b.dataset.f; [].forEach.call(fz.children, function (x) { x.classList.toggle('on', x === b); }); var F = FUENTES[it.fuente]; r(); if (document.fonts) document.fonts.load(F.w + ' 40px "' + F.f + '"').then(r, r); };
      var md = q('#amg-modo'); if (md) md.onclick = function (e) { var b = e.target.closest('[data-m]'); if (!b) return; it.modo = b.dataset.m; [].forEach.call(md.children, function (x) { x.classList.toggle('on', x === b); }); r(); };
      q('#amg-tam').oninput = function () { it.tam = +this.value; r(); };
      var es = q('#amg-esp'); if (es) es.oninput = function () { it.esp = +this.value; r(); };
      var ro = q('#amg-rot'); if (ro) ro.oninput = function () { it.rot = +this.value; r(); };
      var ag = q('#amg-ang'); if (ag) ag.oninput = function () { it.ang = +this.value * Math.PI / 180 - Math.PI / 2; r(); };
      q('#amg-del').onclick = function () { st.items.splice(st.sel, 1); st.sel = st.items.length - 1; editor(); r(); };
    }
    window.__amgEditor = editor;

    function punto(e) { var b = cv.getBoundingClientRect(), k = 700 / b.width; return { x: (e.clientX - b.left) * k, y: (e.clientY - b.top) * k }; }
    function limitarT(it) { it.x = Math.max(TZ.x0, Math.min(TZ.x1, it.x)); it.y = Math.max(TZ.y0, Math.min(TZ.y1, it.y)); }
    function buscar(p) {
      var c = cv.getContext('2d');
      if (st.pieza === 'termo') {
        for (var j = st.items.length - 1; j >= 0; j--) {
          var t = st.items[j], ro = -(t.rot || 0) * Math.PI / 180, dx = p.x - t.x, dy = p.y - t.y;
          var lx = dx * Math.cos(ro) - dy * Math.sin(ro), ly = dx * Math.sin(ro) + dy * Math.cos(ro);
          var fe = escalaT(c, t); if (Math.abs(lx) < anchoT(c, t) * fe / 2 + 12 && Math.abs(ly) < altoT(t) * fe / 2 + 12) return j;
        }
        return -1;
      }
      var a = Math.atan2(p.y - CY, p.x - CX), d = Math.hypot(p.x - CX, p.y - CY);
      for (var i = st.items.length - 1; i >= 0; i--) { var it = st.items[i], A = anchoAngular(c, it) / 2 + .05, h = it.tam * .6 + 12; if (Math.abs(norm(a - it.ang)) < A && Math.abs(d - it.r) < h) return i; }
      return -1;
    }
    var drag = null;
    cv.addEventListener('pointerdown', function (e) {
      var p = punto(e), i = buscar(p); if (i < 0) return;
      st.sel = i; editor(); r(); var it = st.items[i];
      drag = st.pieza === 'termo' ? { dx: p.x - it.x, dy: p.y - it.y } : { off: norm(Math.atan2(p.y - CY, p.x - CX) - it.ang), dr: Math.hypot(p.x - CX, p.y - CY) - it.r };
      cv.setPointerCapture(e.pointerId); e.preventDefault();
    });
    cv.addEventListener('pointermove', function (e) {
      if (!drag) return; var p = punto(e), it = st.items[st.sel];
      if (st.pieza === 'termo') { it.x = p.x - drag.dx; it.y = p.y - drag.dy; limitarT(it); r(); return; }
      it.ang = norm(Math.atan2(p.y - CY, p.x - CX) - drag.off);
      var pad = it.tam * .35; it.r = Math.max(R0 + pad, Math.min(R1 - pad, Math.hypot(p.x - CX, p.y - CY) - drag.dr));
      var s = q('#amg-ang'); if (s) s.value = Math.round(norm(it.ang + Math.PI / 2) * 180 / Math.PI); r();
    });
    cv.addEventListener('pointerup', function () { drag = null; });

    function cerrar() { ov.remove(); document.body.style.overflow = ''; }
    q('.amg-x').onclick = cerrar; ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(); });
    q('#amg-ok').onclick = function () {
      var hay = hayContenido('virola') || hayContenido('termo');
      if (!hay) { var t = q('#amg-txt'); if (t) { t.style.borderColor = 'red'; t.focus(); } return; }
      resultado = exportar(); cerrar(); pintarCaja();
    };
    if (st.sel < 0 && st.items.length) st.sel = 0;
    editor(); r();
    if (document.fonts) { document.fonts.ready.then(r); FUENTES.forEach(function (F) { document.fonts.load(F.w + ' 40px "' + F.f + '"').then(r, function () {}); }); }
  }

  // ---------- detalle del diseño (va en el mensaje y dentro de la imagen) ----------
  // Posiciones de Argentimate: 1 arriba, 3 derecha, 4 abajo, 2 izquierda (y "entre" en las diagonales)
  var POS = ['Posición 1', 'Entre 1 y 3', 'Posición 3', 'Entre 3 y 4', 'Posición 4', 'Entre 2 y 4', 'Posición 2', 'Entre 1 y 2'];
  function sector(ang) { var g = (norm(ang + Math.PI / 2) * 180 / Math.PI + 360 + 22.5) % 360; return Math.floor(g / 45); }
  function lineasTermo() {
    var filas = [], alto = TZ.y1 - TZ.y0, c = document.createElement('canvas').getContext('2d');
    st.items.forEach(function (it) {
      var d;
      if (it.t === 'text' && it.txt.trim()) d = '"' + it.txt + '" — letra ' + FUENTES[it.fuente].n + ', ' + (it.rot === -90 ? 'vertical' : 'horizontal');
      else if (it.t === 'icon') d = ICONOS[it.icon].n;
      else if (it.t === 'img') d = 'Logo propio (va el archivo aparte)';
      if (!d) return;
      var f = (it.y - TZ.y0) / alto, v = f < .34 ? 'Arriba' : f < .67 ? 'Al medio' : 'Abajo';
      var lado = it.x < 320 ? ' a la izquierda' : it.x > 380 ? ' a la derecha' : '';
      filas.push({ y: it.y, d: v + lado + ': ' + d });
    });
    filas.sort(function (a, b) { return a.y - b.y; });
    return filas.map(function (f) { return f.d; });
  }
  function conPieza(p, fn) { var prev = st; st = PZ[p]; try { return fn(); } finally { st = prev; } }
  function piezasConDiseno() { return (piezasLink || piezasProducto()).filter(hayContenido); }
  function lineasDetalle() { // todas las piezas con diseño, con título si hay más de una
    var ps = piezasConDiseno(), out = [];
    ps.forEach(function (p) {
      var ls = conPieza(p, function () { return p === 'termo' ? lineasTermo() : lineasVirola(); });
      if (ps.length > 1) out.push(NOMBRE_PZ[p].toUpperCase() + ':');
      out = out.concat(ls);
    });
    return out;
  }
  function lineasVirola() {
    var filas = [];
    st.items.forEach(function (it) {
      var s = sector(it.ang), d;
      if (it.t === 'text' && it.txt.trim()) d = '"' + it.txt + '" — letra ' + FUENTES[it.fuente].n + ', ' + it.modo;
      else if (it.t === 'icon') d = ICONOS[it.icon].n;
      else if (it.t === 'img') d = 'Logo propio (va el archivo aparte)';
      if (d) filas.push({ s: s, d: d });
    });
    var orden = [0, 2, 5, 6, 7, 4, 3, 1]; // 1, 1y2, 1y3, 2, 2y4, 3, 3y4, 4
    filas.sort(function (a, b) { return orden[a.s] - orden[b.s]; });
    return filas.map(function (f) { return POS[f.s] + ': ' + f.d; });
  }
  function exportar() { // imagen final: cada pieza diseñada + detalle escrito abajo
    var ps = piezasConDiseno(), dibs = ps.map(function (p) { return conPieza(p, function () { var k = document.createElement('canvas'); k.width = k.height = 700; dibujar(k, false); return k; }); });
    var prod = nombreProducto(), cab = 110, mc = document.createElement('canvas').getContext('2d'), det = [];
    mc.font = '500 20px Montserrat,sans-serif';
    lineasDetalle().forEach(function (l) { // partir renglones largos
      if (/:$/.test(l) && l === l.toUpperCase()) { det.push(l); return; }
      var pal = ('• ' + l).split(' '), lin = '';
      pal.forEach(function (p) { var prueba = lin ? lin + ' ' + p : p; if (mc.measureText(prueba).width > 640 && lin) { det.push(lin); lin = '   ' + p; } else lin = prueba; });
      det.push(lin);
    });
    var tituloPz = ps.length > 1 ? 40 : 0, altoDib = (700 + tituloPz) * dibs.length;
    var alto = cab + altoDib + 40 + det.length * 30 + 30;
    var cv = document.createElement('canvas'); cv.width = 700; cv.height = alto; var c = cv.getContext('2d');
    c.fillStyle = '#fff'; c.fillRect(0, 0, 700, alto);
    c.fillStyle = AZUL; c.fillRect(0, 0, 700, 64);
    c.fillStyle = '#fff'; c.font = '700 26px Montserrat,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('ARGENTIMATE · Diseño de grabado', 350, 32);
    c.fillStyle = '#222'; c.font = '700 21px Montserrat,sans-serif'; c.fillText(prod.length > 52 ? prod.slice(0, 50) + '…' : prod, 350, 90);
    dibs.forEach(function (k, i) {
      var y = cab + i * (700 + tituloPz);
      if (tituloPz) { c.fillStyle = AZUL; c.font = '700 22px Montserrat,sans-serif'; c.textAlign = 'center'; c.fillText(NOMBRE_PZ[ps[i]].toUpperCase(), 350, y + 22); }
      c.drawImage(k, 0, y + tituloPz);
    });
    c.textAlign = 'left'; c.fillStyle = '#333';
    det.forEach(function (l, i) { c.font = (/:$/.test(l) && l === l.toUpperCase() ? '700 ' : '500 ') + '20px Montserrat,sans-serif'; c.fillText(l, 30, cab + altoDib + 30 + i * 30); });
    return cv.toDataURL('image/png');
  }

  // ---------- link que muestra el diseño (todo va en la dirección, sin servidor) ----------
  function codPieza(p) {
    var P = PZ[p], S = p === 'termo' ? SUPT : SUP;
    return { s: Object.keys(S).indexOf(P.sup), i: P.items.map(function (it) {
      if (p === 'termo') {
        var x = Math.round(it.x), y = Math.round(it.y);
        if (it.t === 'text') return [0, it.txt, it.fuente, it.tam, x, y, it.rot || 0, it.esp];
        if (it.t === 'icon') return [1, it.icon, it.tam, x, y, it.rot || 0];
        return [2, it.tam, x, y, it.rot || 0];
      }
      var a = Math.round(it.ang * 1800 / Math.PI) / 10, r = Math.round(it.r);
      if (it.t === 'text') return [0, it.txt, it.fuente, it.tam, a, r, it.modo === 'recto' ? 1 : 0, it.esp];
      if (it.t === 'icon') return [1, it.icon, it.tam, a, r, it.rot || 0];
      return [2, it.tam, a, r, it.rot || 0];
    }).filter(function (x) { return x[0] !== 0 || String(x[1]).trim(); }) };
  }
  function codificar() {
    var d = { v: 2, z: {} };
    piezasConDiseno().forEach(function (p) { d.z[p === 'termo' ? 'T' : 'V'] = codPieza(p); });
    var b = btoa(unescape(encodeURIComponent(JSON.stringify(d))));
    return b.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function decPieza(p, z) {
    var P = PZ[p], S = p === 'termo' ? SUPT : SUP;
    P.sup = Object.keys(S)[z.s] || 'plantilla'; P.sel = -1;
    P.items = z.i.map(function (x) {
      var ic = x[0] === 1 && !ICONOS[x[1]] ? 'estrella' : x[1];
      if (p === 'termo') {
        if (x[0] === 0) return { t: 'text', txt: x[1], fuente: x[2], tam: x[3], x: x[4], y: x[5], rot: x[6], esp: x[7] };
        if (x[0] === 1) return { t: 'icon', icon: ic, tam: x[2], x: x[3], y: x[4], rot: x[5] };
        return { t: 'img', tam: x[1], x: x[2], y: x[3], rot: x[4] };
      }
      if (x[0] === 0) return { t: 'text', txt: x[1], fuente: x[2], tam: x[3], ang: x[4] * Math.PI / 180, r: x[5], modo: x[6] ? 'recto' : 'curvo', esp: x[7] };
      if (x[0] === 1) return { t: 'icon', icon: ic, tam: x[2], ang: x[3] * Math.PI / 180, r: x[4], rot: x[5] };
      return { t: 'img', tam: x[1], ang: x[2] * Math.PI / 180, r: x[3], rot: x[4] };
    });
  }
  var piezasLink = null; // en modo "ver diseño", las piezas vienen del link
  function decodificar(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '=';
    var d = JSON.parse(decodeURIComponent(escape(atob(s))));
    PZ.virola.items = []; PZ.termo.items = [];
    if (d.v === 1) { decPieza('virola', d); piezasLink = ['virola']; }
    else { piezasLink = []; if (d.z.V) { decPieza('virola', d.z.V); piezasLink.push('virola'); } if (d.z.T) { decPieza('termo', d.z.T); piezasLink.push('termo'); } }
    st = PZ[piezasLink[0] || 'virola'];
  }
  function linkDiseno() { return location.origin + location.pathname + '#grabado=' + codificar(); }

  function resumen() {
    var ps = piezasConDiseno(), que = ps.length > 1 ? 'virola y termo' : ps[0] === 'termo' ? 'termo' : 'virola';
    var t = 'Hola! Quiero este grabado de ' + que + ' para: *' + nombreProducto() + '*\n';
    lineasDetalle().forEach(function (l) { t += (/:$/.test(l) && l === l.toUpperCase() ? '\n*' + l + '*' : '• ' + l) + '\n'; });
    return t + '\nVer el diseño: ' + linkDiseno();
  }
  window.__amgResumen = resumen; window.__amgSt = st; window.__amgLink = linkDiseno;

  // ---------- enviar: imagen adjunta en el celu, copiada en la compu ----------
  function blobDe(dataUrl) { var p = dataUrl.split(','), b = atob(p[1]), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return new Blob([u], { type: 'image/png' }); }
  function urlWA(txt) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(txt); }
  function descargar() { var a = document.createElement('a'); a.href = resultado; a.download = 'grabado-argentimate.png'; document.body.appendChild(a); a.click(); a.remove(); }
  function aviso(html) {
    cargarEstilos(); var ov = document.createElement('div'); ov.className = 'amg-ov';
    ov.innerHTML = '<div class="amg-m amg-av"><button type="button" class="amg-x" aria-label="Cerrar">×</button><div class="amg-ctl">' + html + '</div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov || e.target.closest('.amg-x')) ov.remove(); });
    return ov;
  }
  function enviar() {
    var txt = resumen(), blob = blobDe(resultado), file = null;
    try { file = new File([blob], 'grabado-argentimate.png', { type: 'image/png' }); } catch (e) {}
    var movil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform));
    if (movil && file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], text: txt }).then(function () {
        aviso('<h3>¡Gracias! 🧉</h3><p class="amg-nota" style="font-size:14px">Si el mensaje te llegó sin el texto, tocá acá para mandarnos también el detalle:</p><a class="amg-btn wa" target="_blank" href="' + urlWA(txt) + '">Mandar el detalle por WhatsApp</a>');
      }, function (e) {
        if (e && e.name === 'AbortError') return;
        descargar(); window.open(urlWA(txt), '_blank');
      });
      return;
    }
    var abrirWA = '<a class="amg-btn wa" target="_blank" href="' + urlWA(txt) + '">Abrir WhatsApp</a>';
    function okCopiado() {
      aviso('<h3>✓ Imagen copiada</h3><p style="font-size:15px;margin:0">Se abrió el chat de WhatsApp con el mensaje. <b>Antes de enviarlo, pegá la imagen con Ctrl + V</b> (Cmd + V en Mac) y mandá todo junto.</p><div class="amg-acc">' + abrirWA + '<button type="button" class="amg-btn sec" id="amg-dl">Descargar imagen</button></div>');
      window.open(urlWA(txt), '_blank');
    }
    function sinCopiar() {
      descargar();
      aviso('<h3>Mandanos el diseño</h3><p style="font-size:15px;margin:0">Te descargamos la imagen del diseño. En el chat de WhatsApp <b>adjuntala con el clip 📎</b> y enviala junto con el mensaje.</p><div class="amg-acc">' + abrirWA + '</div>');
      window.open(urlWA(txt), '_blank');
    }
    try {
      if (navigator.clipboard && window.ClipboardItem) navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(okCopiado, sinCopiar);
      else sinCopiar();
    } catch (e) { sinCopiar(); }
  }

  // ---------- al abrir el link del mensaje: mostrar el diseño del cliente ----------
  function verDiseno() {
    var m = /#grabado=([A-Za-z0-9_-]+)/.exec(location.hash); if (!m) return;
    try { decodificar(m[1]); } catch (e) { return; }
    cargarEstilos();
    var usadas = st.items.filter(function (it) { return it.t === 'text'; }).map(function (it) { var F = FUENTES[it.fuente]; return document.fonts ? document.fonts.load(F.w + ' 40px "' + F.f + '"') : null; });
    usadas.push(document.fonts ? document.fonts.load('700 20px Montserrat') : null);
    Promise.all(usadas.map(function (p) { return p && p.catch ? p.catch(function () {}) : p; })).then(function () {
      resultado = exportar();
      var ov = aviso('<h3>Diseño de grabado del cliente</h3><img src="' + resultado + '" alt="Diseño del grabado" style="width:100%;border:1px solid #eee;border-radius:12px"><div class="amg-acc"><button type="button" class="amg-btn" id="amg-dl">Descargar imagen</button></div>');
      ov.querySelector('.amg-m').style.maxWidth = '560px';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', verDiseno); else verDiseno();
  window.addEventListener('hashchange', verDiseno);

  // ---------- caja debajo de la opción de grabado ----------
  function pintarCaja() {
    var cont = document.getElementById('product-vip__attributes'), caja = document.getElementById('amg-box');
    if (!cont || !conGrabado()) { if (caja) caja.style.display = 'none'; return; }
    cargarEstilos();
    if (!caja) { caja = document.createElement('div'); caja.id = 'amg-box'; caja.className = 'amg-box'; cont.parentNode.insertBefore(caja, cont.nextSibling); }
    caja.style.display = '';
    var clave = resultado ? resultado.length + ':' + resultado.slice(-40) : 'vacio';
    if (caja.getAttribute('data-k') === clave) return; caja.setAttribute('data-k', clave);
    caja.innerHTML = !resultado
      ? '<p>✨ <b>Elegiste con grabado.</b> Diseñá tu virola acá mismo: escribí, elegí la letra, curvá el texto y sumá estrellas, corazones y más.</p><button type="button" class="amg-btn" id="amg-open">✏️ Diseñar mi grabado</button>'
      : '<p><b>✓ Tu diseño está listo.</b> Agregá el producto al carrito y, cuando termines la compra, mandanos el diseño por WhatsApp con tu número de pedido.</p><div class="amg-res"><img alt="Diseño del grabado" src="' + resultado + '"><div class="amg-acc" style="flex-direction:column"><button type="button" class="amg-btn wa" id="amg-wa">Enviar diseño por WhatsApp</button><button type="button" class="amg-btn sec" id="amg-open">Editar diseño</button></div></div>';
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('#amg-open')) { e.preventDefault(); abrir(); return; }
    if (e.target.closest('#amg-wa')) { e.preventDefault(); enviar(); return; }
    if (e.target.closest('#amg-dl')) { e.preventDefault(); descargar(); return; }
    if (e.target.closest('.product-vip__attribute-item')) setTimeout(pintarCaja, 60);
    setTimeout(pintarCaja, 250);
  }, true);
  var n = 0, iv = setInterval(function () { pintarCaja(); if (++n > 20) clearInterval(iv); }, 500);
})();
