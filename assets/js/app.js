/* =====================================================================
   Hotel Montree – Vanilla JS
   Verteilt die Werte aus config.js auf alle Seiten.
   Ohne JavaScript bleiben die im HTML hinterlegten Fallback-Werte stehen.
   ===================================================================== */
(function () {
  'use strict';

  var cfg = window.HOTEL_CONFIG || {};

  /* Wert aus der Konfiguration ueber einen Pfad holen: "legal.company" */
  function value(path) {
    return path.split('.').reduce(function (obj, key) {
      return (obj && obj[key] !== undefined) ? obj[key] : undefined;
    }, cfg);
  }

  /* Buchungslink: solange die Buchungsmaschine nicht eingetragen ist,
     leiten die Buttons auf die Kontaktseite. */
  function bookingHref() {
    var url = cfg.bookingUrl || '';
    if (!url || url.indexOf('example.com') !== -1) {
      return cfg.bookingFallback || 'kontakt.html';
    }
    return url;
  }

  function isExternalBooking() {
    return bookingHref().indexOf('http') === 0;
  }

  /* --- Texte --------------------------------------------------------- */
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var val = value(el.getAttribute('data-cfg'));
    if (val) { el.textContent = val; }
  });

  /* --- Links --------------------------------------------------------- */
  document.querySelectorAll('[data-cfg-href]').forEach(function (el) {
    var key = el.getAttribute('data-cfg-href');
    var val;

    if (key === 'booking') {
      val = bookingHref();
      if (isExternalBooking()) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    } else if (key === 'mailto') {
      val = 'mailto:' + (cfg.email || '');
    } else {
      val = value(key);
    }

    if (val) { el.setAttribute('href', val); }
  });

  /* --- Preise -------------------------------------------------------- */
  document.querySelectorAll('[data-price]').forEach(function (el) {
    var price = value('prices.' + el.getAttribute('data-price'));
    el.textContent = price ? price : 'Preis auf Anfrage';
  });

  /* --- Adresse am Stueck --------------------------------------------- */
  document.querySelectorAll('[data-cfg-address]').forEach(function (el) {
    el.textContent = [cfg.street, (cfg.zip || '') + ' ' + (cfg.city || '')]
      .join(', ').trim();
  });

  /* --- Jahreszahl im Footer ------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --- Kontaktformular ----------------------------------------------- */
  /* Kein Server, kein Tracking: das Formular oeffnet das E-Mail-Programm
     mit vorbereitetem Text. */
  var form = document.querySelector('[data-mail-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var get = function (n) {
        var f = form.elements[n];
        return f && f.value ? f.value.trim() : '';
      };

      var lines = [
        'Name: ' + get('name'),
        'E-Mail: ' + get('email'),
        'Telefon: ' + get('telefon'),
        'Anreise: ' + get('anreise'),
        'Abreise: ' + get('abreise'),
        'Personen: ' + get('personen'),
        'Zimmerwunsch: ' + get('zimmer'),
        '',
        'Nachricht:',
        get('nachricht')
      ];

      var subject = 'Direktbuchungsanfrage ' + (cfg.name || '');
      var href = 'mailto:' + (cfg.email || '') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      var note = form.querySelector('[data-mail-note]');
      if (note) { note.hidden = false; }

      window.location.href = href;
    });
  }
}());
