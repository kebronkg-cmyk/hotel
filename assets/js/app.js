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

  /* --- Buchungslink --------------------------------------------------
     Baut die URL zur Buchungsmaschine zusammen. Die Parameternamen stehen
     in config.js unter "bookingParams", damit sie ohne Eingriff in diesen
     Code an die jeweilige Buchungsmaschine angepasst werden koennen.
     Solange keine echte Buchungs-URL hinterlegt ist, wird auf die in
     "bookingFallback" genannte Seite verwiesen. */

  function bookingKonfiguriert() {
    var url = cfg.bookingUrl || '';
    return url.indexOf('http') === 0 && url.indexOf('example.com') === -1;
  }

  /* Datum aus einem <input type="date"> (immer JJJJ-MM-TT) in das Format
     bringen, das die Buchungsmaschine erwartet. */
  function datumFormatieren(iso) {
    if (!iso) { return ''; }
    var teile = iso.split('-');
    if (teile.length !== 3) { return iso; }
    var format = cfg.bookingDateFormat || 'YYYY-MM-DD';
    if (format === 'DD.MM.YYYY') { return teile[2] + '.' + teile[1] + '.' + teile[0]; }
    if (format === 'DD-MM-YYYY') { return teile[2] + '-' + teile[1] + '-' + teile[0]; }
    return iso;
  }

  /* daten = { arrival: '2026-10-01', departure: '2026-10-03', adults: '2' } */
  function bookingHref(daten) {
    if (!bookingKonfiguriert()) {
      return cfg.bookingFallback || 'kontakt.html';
    }

    var url = cfg.bookingUrl;
    var namen = cfg.bookingParams || {};
    var teile = [];

    Object.keys(daten || {}).forEach(function (schluessel) {
      var name = namen[schluessel];
      var wert = daten[schluessel];
      if (!name || !wert) { return; }
      if (schluessel === 'arrival' || schluessel === 'departure') {
        wert = datumFormatieren(wert);
      }
      teile.push(encodeURIComponent(name) + '=' + encodeURIComponent(wert));
    });

    if (!teile.length) { return url; }
    return url + (url.indexOf('?') === -1 ? '?' : '&') + teile.join('&');
  }

  function externeBuchung() {
    return bookingKonfiguriert();
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
      if (externeBuchung()) {
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

  /* --- Direktbuchungs-Vorteile ---------------------------------------
     Inhalte stehen in config.js unter "directBenefits". */
  var vorteileZiel = document.querySelector('[data-benefits]');
  if (vorteileZiel && Array.isArray(cfg.directBenefits) && cfg.directBenefits.length) {
    vorteileZiel.innerHTML = '';
    cfg.directBenefits.forEach(function (v) {
      var li = document.createElement('li');
      var stark = document.createElement('strong');
      stark.textContent = v.title || '';
      li.appendChild(stark);
      li.appendChild(document.createTextNode(v.text || ''));
      vorteileZiel.appendChild(li);
    });
  }

  /* --- Buchungsformular im Startbereich -------------------------------
     Die Datumsfelder werden als Parameter an die Buchungs-URL gehaengt. */
  document.querySelectorAll('[data-booking-form]').forEach(function (bf) {
    var hinweis = bf.querySelector('[data-booking-note]');

    /* Kein Datum in der Vergangenheit anbieten */
    var heute = new Date().toISOString().slice(0, 10);
    var an = bf.elements.arrival;
    var ab = bf.elements.departure;
    if (an) { an.min = heute; }
    if (ab) { ab.min = heute; }

    /* Abreise darf nicht vor der Anreise liegen */
    if (an && ab) {
      an.addEventListener('change', function () {
        ab.min = an.value || heute;
        if (ab.value && ab.value <= an.value) { ab.value = ''; }
      });
    }

    bf.addEventListener('submit', function (e) {
      e.preventDefault();
      var daten = {
        arrival: an ? an.value : '',
        departure: ab ? ab.value : '',
        adults: bf.elements.adults ? bf.elements.adults.value : ''
      };
      var ziel = bookingHref(daten);

      if (!bookingKonfiguriert()) {
        if (hinweis) { hinweis.hidden = false; }
        window.location.href = ziel;
        return;
      }
      window.open(ziel, '_blank', 'noopener');
    });
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
