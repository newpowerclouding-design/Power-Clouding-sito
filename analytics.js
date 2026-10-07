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
