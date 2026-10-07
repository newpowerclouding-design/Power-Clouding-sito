/* Power Clouding - GA4 (G-QMWNGTEQY7) dietro consenso. Consent Mode v2: default negato in <head>. */
(function () {
  var ID = 'G-QMWNGTEQY7';
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', ID, { allow_google_signals: false, allow_ad_personalization_signals: false });

  function send(name, params) { gtag('event', name, params || {}); }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    var where = location.pathname;
    if (h.indexOf('tel:') === 0) send('click_telefono', { page_path: where });
    else if (h.indexOf('wa.me') > -1) send('click_whatsapp', { page_path: where });
    else if (h.indexOf('google.com/maps') > -1) send('click_indicazioni', { page_path: where });
    else if (/g\.page|maps\.app\.goo\.gl|google\.com\/search|business\.google/.test(h)) send('click_scheda_google', { page_path: where });
  }, true);

  if (location.pathname.indexOf('/guide/') === 0 && location.pathname !== '/guide/') {
    var done = false;
    window.addEventListener('scroll', function () {
      if (done) return;
      var d = document.documentElement;
      if ((window.scrollY + window.innerHeight) / d.scrollHeight >= 0.75) {
        done = true;
        send('lettura_guida', { guida: location.pathname });
      }
    }, { passive: true });
  }

  document.addEventListener('play', function (e) {
    if (e.target && e.target.tagName === 'VIDEO') send('play_video_hero', { page_path: location.pathname });
  }, true);
})();


/* Power Clouding - WebMCP (strumenti in sola lettura per agenti AI) + assistente informativo */
(function () {
var INFO = {
nome: 'Power Clouding',
descrizione: 'Negozio di sigarette elettroniche a Roma dal 2011 e centro assistenza autorizzato KIWI.',
indirizzo: 'Via Tuscolana 1080, Roma (Cinecitta)',
telefono: '06 3105 5548',
tel_href: 'tel:+390631055548',
whatsapp: '339 468 5916',
wa_href: 'https://wa.me/393394685916',
maps: 'https://www.google.com/maps/dir/?api=1&destination=Via+Tuscolana+1080+Roma',
orari: 'Lunedi-Sabato 9:30-19:30, domenica chiuso',
metro: 'Metro A: Lucio Sestio a 240 m, Giulio Agricola a 350 m',
kiwi: 'Centro assistenza autorizzato KIWI: diagnosi e assistenza sui dispositivi KIWI. Dettagli su https://www.powerclouding.it/assistenza-kiwi/',
maggiorenni: 'La vendita e riservata ai maggiorenni (18+).'
};

function isOpenNow() {
try {
var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
var o = {};
p.forEach(function (x) { o[x.type] = x.value; });
var m = parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10);
if (o.weekday === 'Sun') return false;
return m >= 570 && m < 1170;
} catch (e) { return null; }
}

function txt(t) { return { content: [{ type: 'text', text: t }] }; }

var tools = [
{ name: 'get_shop_info', description: 'Informazioni essenziali su Power Clouding: chi e, dove si trova, cosa offre.', inputSchema: { type: 'object', properties: {} },
execute: function () { return txt(INFO.descrizione + ' Indirizzo: ' + INFO.indirizzo + '. ' + INFO.maggiorenni); } },
{ name: 'get_opening_hours', description: 'Orari di apertura del negozio e se e aperto in questo momento.', inputSchema: { type: 'object', properties: {} },
execute: function () { var o = isOpenNow(); return txt('Orari: ' + INFO.orari + '. Ora: ' + (o === null ? 'non determinabile' : (o ? 'aperto' : 'chiuso')) + '.'); } },
{ name: 'get_contacts', description: 'Telefono, WhatsApp e indirizzo del negozio.', inputSchema: { type: 'object', properties: {} },
execute: function () { return txt('Telefono: ' + INFO.telefono + '. WhatsApp: ' + INFO.whatsapp + ' (' + INFO.wa_href + '). Indirizzo: ' + INFO.indirizzo + '.'); } },
{ name: 'get_directions', description: 'Come arrivare al negozio: link indicazioni e fermate metro vicine.', inputSchema: { type: 'object', properties: {} },
execute: function () { return txt(INFO.indirizzo + '. ' + INFO.metro + '. Indicazioni: ' + INFO.maps + ' Pagina: https://www.powerclouding.it/come-arrivare/'); } },
{ name: 'get_kiwi_assistance_info', description: 'Informazioni sul centro assistenza autorizzato KIWI.', inputSchema: { type: 'object', properties: {} },
execute: function () { return txt(INFO.kiwi); } }
];

try {
var mc = (document.modelContext) || (navigator.modelContext);
if (mc) {
if (typeof mc.provideContext === 'function') mc.provideContext({ tools: tools });
else if (typeof mc.registerTool === 'function') tools.forEach(function (t) { mc.registerTool(t); });
}
} catch (e) {}

/* ---- Assistente informativo (nessun dato inviato a server esterni) ---- */
function init() {
if (document.getElementById('pc-bot')) return;
var css = document.createElement('style');
css.textContent = '#pc-bot-btn{position:fixed;right:16px;bottom:16px;z-index:9998;background:#111;color:#fff;border:0;border-radius:28px;padding:12px 18px;font:600 15px system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.3)}' +
'#pc-bot{position:fixed;right:16px;bottom:72px;z-index:9999;width:min(340px,calc(100vw - 32px));max-height:70vh;display:none;flex-direction:column;background:#fff;color:#111;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.3);font:14px/1.4 system-ui,sans-serif;overflow:hidden}' +
'#pc-bot.open{display:flex}#pc-bot-h{background:#111;color:#fff;padding:12px 14px;font-weight:600;display:flex;justify-content:space-between}' +
'#pc-bot-m{padding:12px;overflow:auto;flex:1;display:flex;flex-direction:column;gap:8px}' +
'.pc-b{background:#f1f1f1;border-radius:10px;padding:8px 10px;max-width:90%}.pc-u{background:#111;color:#fff;align-self:flex-end;border-radius:10px;padding:8px 10px;max-width:90%}' +
'.pc-b a{color:#0b57d0}#pc-bot-q{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px}#pc-bot-q button{border:1px solid #ccc;background:#fff;border-radius:14px;padding:5px 10px;font-size:13px;cursor:pointer}' +
'#pc-bot-f{display:flex;border-top:1px solid #eee}#pc-bot-f input{flex:1;border:0;padding:12px;font-size:14px;outline:0}#pc-bot-f button{border:0;background:#111;color:#fff;padding:0 16px;cursor:pointer}';
document.head.appendChild(css);

var box = document.createElement('div');
box.id = 'pc-bot';
box.setAttribute('role', 'dialog');
box.setAttribute('aria-label', 'Assistente Power Clouding');
box.innerHTML = '<div id="pc-bot-h"><span>Assistente Power Clouding</span><span id="pc-bot-x" style="cursor:pointer" aria-label="Chiudi">&times;</span></div><div id="pc-bot-m"></div><div id="pc-bot-q"></div><form id="pc-bot-f"><input type="text" placeholder="Scrivi una domanda..." aria-label="Domanda"><button type="submit">Invia</button></form>';
document.body.appendChild(box);
var btn = document.createElement('button');
btn.id = 'pc-bot-btn';
btn.type = 'button';
btn.textContent = 'Chiedi a noi';
document.body.appendChild(btn);

var msgs = box.querySelector('#pc-bot-m');
function add(cls, html) { var d = document.createElement('div'); d.className = cls; d.innerHTML = html; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; }
function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

var A = {
orari: function () { var o = isOpenNow(); return 'Siamo aperti ' + INFO.orari + '.' + (o === null ? '' : (o ? ' In questo momento siamo <b>aperti</b>.' : ' In questo momento siamo <b>chiusi</b>.')); },
dove: function () { return INFO.indirizzo + '. ' + INFO.metro + '. <a href="' + INFO.maps + '" target="_blank" rel="noopener">Apri le indicazioni</a>.'; },
contatti: function () { return 'Telefono: <a href="' + INFO.tel_href + '">' + INFO.telefono + '</a><br>WhatsApp: <a href="' + INFO.wa_href + '" target="_blank" rel="noopener">' + INFO.whatsapp + '</a>'; },
kiwi: function () { return 'Siamo centro assistenza autorizzato KIWI. Portaci il dispositivo in negozio o scrivici su WhatsApp. <a href="/assistenza-kiwi/">Dettagli assistenza KIWI</a>.'; },
guide: function () { return 'Trovi le nostre guide su <a href="/guide/">/guide/</a> e le risposte piu comuni nelle <a href="/domande-frequenti/">domande frequenti</a>.'; },
eta: function () { return INFO.maggiorenni + ' Nessuna vendita ai minori.'; },
chi: function () { return INFO.descrizione + ' ' + INFO.indirizzo + '.'; }
};
function reply(q) {
var s = q.toLowerCase();
if (/orar|apert|chius|quando|domenica/.test(s)) return A.orari();
if (/dove|indirizz|arriv|metro|mappa|parch/.test(s)) return A.dove();
if (/telefon|chiam|whatsapp|contatt|numero|scriv/.test(s)) return A.contatti();
if (/kiwi|assistenz|ripar|rotto|non funziona|guasto/.test(s)) return A.kiwi();
if (/guid|come si|consigl|domand|faq/.test(s)) return A.guide();
if (/minorenn|et[aà]|maggiorenn|18/.test(s)) return A.eta();
if (/chi siete|chi sei|negozio|storia|2011/.test(s)) return A.chi();
return 'Per questa domanda ti consiglio di scriverci su WhatsApp o chiamarci: ' + A.contatti();
}
function ask(q) { add('pc-u', esc(q)); add('pc-b', reply(q)); }

add('pc-b', 'Ciao! Posso darti informazioni su orari, come arrivare, contatti e assistenza KIWI.');
var qs = box.querySelector('#pc-bot-q');
[['Orari', 'Che orari avete?'], ['Dove siete', 'Dove siete?'], ['Contatti', 'Contatti'], ['Assistenza KIWI', 'Assistenza KIWI']].forEach(function (p) {
var b = document.createElement('button');
b.type = 'button';
b.textContent = p[0];
b.addEventListener('click', function () { ask(p[1]); });
qs.appendChild(b);
});
btn.addEventListener('click', function () { box.classList.toggle('open'); });
box.querySelector('#pc-bot-x').addEventListener('click', function () { box.classList.remove('open'); });
box.querySelector('#pc-bot-f').addEventListener('submit', function (e) {
e.preventDefault();
var i = e.target.querySelector('input');
var v = i.value.trim();
if (v) { ask(v); i.value = ''; }
});
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
