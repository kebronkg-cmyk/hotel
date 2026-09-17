/* =====================================================================
   Hotel Montree – Vanilla JS
   Verteilt die Werte aus config.js auf alle Seiten.
   Ohne JavaScript bleiben die im HTML hinterlegten Fallback-Werte stehen.
   ===================================================================== */
(function () {
  'use strict';

  var cfg = window.HOTEL_CONFIG || {};

  /* --- Sprache ---------------------------------------------------------
     Die Sprache steht im lang-Attribut des <html>-Elements. Deutsch ist die
     Grundlage; für Englisch liegen die Übersetzungen in config.js unter
     "translations.en" und überschreiben die deutschen Werte. */
  var sprache = (document.documentElement.getAttribute('lang') || 'de')
                  .toLowerCase().indexOf('en') === 0 ? 'en' : 'de';

  var uebersetzung = (sprache === 'en' && cfg.translations && cfg.translations.en)
                     ? cfg.translations.en : {};

  /* Übersetzten Wert nehmen, sonst den deutschen aus der Konfiguration. */
  function inhalt(schluessel) {
    return uebersetzung[schluessel] !== undefined ? uebersetzung[schluessel] : cfg[schluessel];
  }

  /* Feste Oberflächentexte, die dieses Skript selbst erzeugt. */
  var TEXTE = {
    de: {
      preisAnfrage: 'Preis auf Anfrage',
      abProNacht: function (preis) { return 'ab <strong>' + preis + ' €</strong>/Nacht'; },
      buchen: function (zimmer) { return zimmer + ' buchen'; },
      bildAlt: function (zimmer) { return zimmer + ' im Hotel Montree'; },
      ausstattung: {
        wlan: 'Kostenfreies WLAN', bad: 'Dusche/WC im Zimmer', tv: 'TV',
        schreibtisch: 'Schreibtisch', safe: 'Safe', fenster: 'Zum Innenhof gelegen'
      },
      note: 'Note', von: 'von', bewertungenBei: function (anzahl, quelle) {
        return 'aus ' + anzahl + ' Bewertungen bei ' + quelle;
      },
      bewertungenLeer: 'aus [Anzahl] Bewertungen bei [Quelle]',
      platzhalter: 'Platzhalter',
      lbTitel: 'Bildansicht', lbSchliessen: 'Schließen',
      lbZurueck: 'Vorheriges Bild', lbWeiter: 'Nächstes Bild',
      karteTitel: function (haus) { return 'Karte mit der Lage des ' + haus; },
      termineFehler: function (telefon) {
        return 'Die Termine können gerade nicht geladen werden. Rufen Sie uns gern an: ' + telefon + '.';
      },
      anfrageFelder: {
        art: 'Art der Anfrage', name: 'Name', firma: 'Firma/Organisation',
        email: 'E-Mail', telefon: 'Telefon', personen: 'Personen',
        von: 'Zeitraum von', bis: 'Zeitraum bis', zimmer: 'Zimmeranzahl',
        nachricht: 'Nachricht'
      },
      anfrageBetreff: function (art, haus) { return 'Anfrage (' + art + ') – ' + haus; },
      anfrageStandardArt: 'Gruppe/Firma',
      wirdGesendet: 'Anfrage wird gesendet …',
      gesendet: 'Vielen Dank! Ihre Anfrage ist bei uns eingegangen. Wir melden uns so schnell wie möglich.',
      sendeFehler: function (email, telefon) {
        return 'Das Senden hat leider nicht geklappt. Bitte schreiben Sie uns an '
             + email + ' oder rufen Sie uns an: ' + telefon;
      },
      mailProgramm: function (email) {
        return 'Ihr E-Mail-Programm sollte sich jetzt öffnen. Falls nicht, schreiben Sie uns bitte an ' + email + '.';
      },
      kontaktFelder: {
        name: 'Name', email: 'E-Mail', telefon: 'Telefon', anreise: 'Anreise',
        abreise: 'Abreise', personen: 'Personen', zimmer: 'Zimmerwunsch'
      },
      kontaktBetreff: function (haus) { return 'Direktbuchungsanfrage ' + haus; },
      kontaktNachricht: 'Nachricht:'
    },
    en: {
      preisAnfrage: 'Price on request',
      abProNacht: function (preis) { return 'from <strong>€' + preis + '</strong>/night'; },
      buchen: function (zimmer) { return 'Book ' + zimmer.toLowerCase(); },
      bildAlt: function (zimmer) { return zimmer + ' at the Hotel Montree'; },
      ausstattung: {
        wlan: 'Free Wi-Fi', bad: 'Private shower and WC', tv: 'TV',
        schreibtisch: 'Desk', safe: 'Safe', fenster: 'Facing the courtyard'
      },
      note: 'Rating', von: 'out of', bewertungenBei: function (anzahl, quelle) {
        return 'based on ' + anzahl + ' reviews on ' + quelle;
      },
      bewertungenLeer: 'based on [number] reviews on [source]',
      platzhalter: 'Placeholder',
      lbTitel: 'Image viewer', lbSchliessen: 'Close',
      lbZurueck: 'Previous image', lbWeiter: 'Next image',
      karteTitel: function (haus) { return 'Map showing the location of ' + haus; },
      termineFehler: function (telefon) {
        return 'The dates cannot be loaded right now. Feel free to call us: ' + telefon + '.';
      },
      anfrageFelder: {
        art: 'Type of enquiry', name: 'Name', firma: 'Company/organisation',
        email: 'Email', telefon: 'Phone', personen: 'Guests',
        von: 'From', bis: 'To', zimmer: 'Number of rooms',
        nachricht: 'Message'
      },
      anfrageBetreff: function (art, haus) { return 'Enquiry (' + art + ') – ' + haus; },
      anfrageStandardArt: 'group/company',
      wirdGesendet: 'Sending your enquiry …',
      gesendet: 'Thank you! We have received your enquiry and will get back to you as soon as we can.',
      sendeFehler: function (email, telefon) {
        return 'Sorry, sending failed. Please email us at ' + email + ' or give us a call: ' + telefon;
      },
      mailProgramm: function (email) {
        return 'Your email programme should be opening now. If it does not, please write to ' + email + '.';
      },
      kontaktFelder: {
        name: 'Name', email: 'Email', telefon: 'Phone', anreise: 'Arrival',
        abreise: 'Departure', personen: 'Guests', zimmer: 'Preferred room'
      },
      kontaktBetreff: function (haus) { return 'Direct booking enquiry ' + haus; },
      kontaktNachricht: 'Message:'
    }
  };

  var T = TEXTE[sprache];

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
      return inhalt('bookingFallback') || 'kontakt.html';
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
    el.textContent = price ? price : T.preisAnfrage;
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
  var vorteileListe = inhalt('directBenefits');
  if (vorteileZiel && Array.isArray(vorteileListe) && vorteileListe.length) {
    vorteileZiel.innerHTML = '';
    vorteileListe.forEach(function (v) {
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

  /* --- WhatsApp -------------------------------------------------------
     Der Button erscheint nur, wenn in config.js eine Nummer hinterlegt ist. */
  var waNummer = (cfg.whatsapp || '').replace(/[^0-9]/g, '');
  document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
    if (!waNummer) { el.hidden = true; return; }
    el.setAttribute('href', 'https://wa.me/' + waNummer);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
    el.hidden = false;
  });

  /* --- Block "Direkt bei uns buchen lohnt sich" ------------------------ */
  var gruendeZiel = document.querySelector('[data-reasons]');
  var gruendeListe = inhalt('bookingReasons');
  if (gruendeZiel && Array.isArray(gruendeListe) && gruendeListe.length) {
    gruendeZiel.innerHTML = '';
    gruendeListe.forEach(function (g) {
      var li = document.createElement('li');
      var stark = document.createElement('strong');
      stark.textContent = g.title || '';
      li.appendChild(stark);
      li.appendChild(document.createTextNode(g.text || ''));
      gruendeZiel.appendChild(li);
    });
  }

  /* --- Anfrageformular (Gruppen, Langzeit, Firmen) ---------------------
     Ohne "formEndpoint" in config.js wird die Anfrage per E-Mail-Programm
     verschickt (mailto). Mit Endpunkt wird sie per POST dorthin gesendet. */
  var anfrage = document.querySelector('[data-request-form]');
  if (anfrage) {
    var meldung = anfrage.querySelector('[data-request-note]');

    var zeigen = function (text, erfolg) {
      if (!meldung) { return; }
      meldung.textContent = text;
      meldung.hidden = false;
      meldung.className = erfolg ? 'meldung meldung-ok' : 'meldung';
    };

    anfrage.addEventListener('submit', function (e) {
      e.preventDefault();

      var daten = {};
      Array.prototype.forEach.call(anfrage.elements, function (f) {
        if (!f.name || f.type === 'submit') { return; }
        if (f.type === 'checkbox') { daten[f.name] = f.checked ? 'ja' : 'nein'; return; }
        daten[f.name] = f.value;
      });

      var beschriftung = T.anfrageFelder;

      var endpunkt = cfg.formEndpoint || '';

      if (endpunkt) {
        var knopf = anfrage.querySelector('button[type="submit"]');
        if (knopf) { knopf.disabled = true; }
        zeigen(T.wirdGesendet, false);

        fetch(endpunkt, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(daten)
        }).then(function (antwort) {
          if (!antwort.ok) { throw new Error('Status ' + antwort.status); }
          anfrage.reset();
          zeigen(T.gesendet, true);
        })['catch'](function () {
          zeigen(T.sendeFehler(cfg.email || '', cfg.phone || ''), false);
        })['finally'](function () {
          if (knopf) { knopf.disabled = false; }
        });
        return;
      }

      var zeilen = Object.keys(beschriftung).map(function (k) {
        return beschriftung[k] + ': ' + (daten[k] || '');
      });

      var betreff = T.anfrageBetreff(daten.art || T.anfrageStandardArt, cfg.name || '');
      window.location.href = 'mailto:' + (cfg.email || '')
        + '?subject=' + encodeURIComponent(betreff)
        + '&body=' + encodeURIComponent(zeilen.join('\n'));

      zeigen(T.mailProgramm(cfg.email || ''), false);
    });
  }

  /* --- Zimmerkarten ----------------------------------------------------
     Die Zimmer stehen als Array in config.js unter "rooms". */
  var AUSSTATTUNG = {
    wlan:         { icon: 'ic-wlan',         label: T.ausstattung.wlan },
    bad:          { icon: 'ic-bad',          label: T.ausstattung.bad },
    tv:           { icon: 'ic-tv',           label: T.ausstattung.tv },
    schreibtisch: { icon: 'ic-schreibtisch', label: T.ausstattung.schreibtisch },
    safe:         { icon: 'ic-safe',         label: T.ausstattung.safe },
    fenster:      { icon: 'ic-fenster',      label: T.ausstattung.fenster }
  };

  function svgIcon(name) {
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
         + '<use href="#' + name + '"></use></svg>';
  }

  var zimmerZiel = document.querySelector('[data-rooms]');
  /* Aus dem Unterordner /en/ liegen die Bilder eine Ebene höher. */
  var bildBasis = (zimmerZiel && zimmerZiel.getAttribute('data-image-base')) || 'assets/img/';
  var zimmerListe = inhalt('rooms');
  if (zimmerZiel && Array.isArray(zimmerListe) && zimmerListe.length) {
    zimmerZiel.innerHTML = zimmerListe.map(function (z) {
      var preis = z.price
        ? T.abProNacht(z.price)
        : '<strong>' + T.preisAnfrage + '</strong>';

      var merkmale = (z.features || []).map(function (f) {
        var a = AUSSTATTUNG[f];
        if (!a) { return ''; }
        return '<li>' + svgIcon(a.icon) + '<span>' + a.label + '</span></li>';
      }).join('');

      var buchenZiel = bookingHref({ roomType: z.id });
      var neuerTab = bookingKonfiguriert() ? ' target="_blank" rel="noopener"' : '';

      return '<article class="karte">'
           + '<img src="' + bildBasis + z.image + '" alt="' + T.bildAlt(z.name) + '"'
           + ' width="1600" height="1067" loading="lazy">'
           + '<div class="karte-inhalt">'
           + '<h3>' + z.name + '</h3>'
           + '<p class="zimmer-eckdaten">' + (z.size || '') + ' · ' + (z.persons || '') + '</p>'
           + '<p class="preis">' + preis + '</p>'
           + '<p>' + (z.text || '') + '</p>'
           + '<ul class="ausstattung">' + merkmale + '</ul>'
           + '<a class="btn btn-haupt" href="' + buchenZiel + '"' + neuerTab + '>'
           + T.buchen(z.name) + '</a>'
           + '</div></article>';
    }).join('');
  }

  /* --- Fakten-Leiste --------------------------------------------------
     Werte stehen in config.js unter "facts". */
  var faktenZiel = document.querySelector('[data-facts]');
  var faktenListe = inhalt('facts');
  if (faktenZiel && Array.isArray(faktenListe) && faktenListe.length) {
    faktenZiel.innerHTML = faktenListe.map(function (f) {
      return '<li><span class="fakt-wert">' + (f.value || '') + '</span>'
           + '<span class="fakt-text">' + (f.label || '') + '</span></li>';
    }).join('');
  }

  /* --- Bewertungen -----------------------------------------------------
     Solange in config.js keine echten Werte stehen, wird der Block
     sichtbar als Platzhalter gekennzeichnet. */
  var bewertungen = inhalt('reviews') || {};

  var noteZiel = document.querySelector('[data-review-score]');
  if (noteZiel) {
    if (bewertungen.score) {
      noteZiel.innerHTML = '<span class="note-zahl">' + bewertungen.score + '</span>'
        + '<span class="note-skala">' + T.von + ' ' + (bewertungen.scoreMax || '5') + '</span>';
    } else {
      noteZiel.innerHTML = '<span class="note-zahl">[' + T.note + ']</span>'
        + '<span class="note-skala">' + T.von + ' ' + (bewertungen.scoreMax || '5') + '</span>';
    }
  }

  var quelleZiel = document.querySelector('[data-review-source]');
  if (quelleZiel) {
    if (bewertungen.count && bewertungen.source) {
      quelleZiel.textContent = T.bewertungenBei(bewertungen.count, bewertungen.source);
    } else {
      quelleZiel.textContent = T.bewertungenLeer;
    }
  }

  var zitatZiel = document.querySelector('[data-review-quotes]');
  if (zitatZiel && Array.isArray(bewertungen.quotes)) {
    var offenePlatzhalter = !bewertungen.score || bewertungen.quotes.some(function (z) {
      return (z.text || '').indexOf('[') === 0;
    });
    var platzhalterHinweis = document.querySelector('[data-review-placeholder-note]');
    if (platzhalterHinweis) { platzhalterHinweis.hidden = !offenePlatzhalter; }

    zitatZiel.innerHTML = bewertungen.quotes.map(function (z) {
      var text = z.text || '';
      var istPlatzhalter = text.indexOf('[') === 0;
      return '<figure class="zitat">'
           + (istPlatzhalter ? '<span class="badge badge-platzhalter">' + T.platzhalter + '</span>' : '')
           + '<blockquote>' + text + '</blockquote>'
           + '<figcaption>' + (z.author || '') + '</figcaption>'
           + '</figure>';
    }).join('');
  }

  /* --- Lightbox für die Galerie ---------------------------------------
     Ohne Bibliothek. Bedienbar mit Maus, Tastatur (Esc, Pfeiltasten) und
     per Klick auf den Hintergrund. */
  var galerie = document.querySelector('[data-lightbox]');
  if (galerie) {
    var knoepfe = Array.prototype.slice.call(galerie.querySelectorAll('[data-bild]'));
    var aktuell = 0;
    var vorher = null;
    var box = null;

    var bauen = function () {
      box = document.createElement('div');
      box.className = 'lightbox';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-label', T.lbTitel);
      box.innerHTML =
          '<button type="button" class="lb-knopf lb-schliessen" aria-label="' + T.lbSchliessen + '">&times;</button>'
        + '<button type="button" class="lb-knopf lb-zurueck" aria-label="' + T.lbZurueck + '">&lsaquo;</button>'
        + '<figure class="lb-figur">'
        + '<img alt="">'
        + '<figcaption class="lb-text"></figcaption>'
        + '</figure>'
        + '<button type="button" class="lb-knopf lb-weiter" aria-label="' + T.lbWeiter + '">&rsaquo;</button>';
      document.body.appendChild(box);

      box.querySelector('.lb-schliessen').addEventListener('click', schliessen);
      box.querySelector('.lb-zurueck').addEventListener('click', function () { blaettern(-1); });
      box.querySelector('.lb-weiter').addEventListener('click', function () { blaettern(1); });
      box.addEventListener('click', function (e) { if (e.target === box) { schliessen(); } });
      return box;
    };

    var anzeigen = function (index) {
      aktuell = (index + knoepfe.length) % knoepfe.length;
      var knopf = knoepfe[aktuell];
      var bild = box.querySelector('img');
      bild.src = knopf.getAttribute('data-bild');
      bild.alt = knopf.getAttribute('data-text') || '';
      box.querySelector('.lb-text').textContent = knopf.getAttribute('data-text') || '';
      var mehrere = knoepfe.length > 1;
      box.querySelector('.lb-zurueck').hidden = !mehrere;
      box.querySelector('.lb-weiter').hidden = !mehrere;
    };

    var blaettern = function (richtung) { anzeigen(aktuell + richtung); };

    var tasten = function (e) {
      if (e.key === 'Escape') { schliessen(); }
      else if (e.key === 'ArrowLeft') { blaettern(-1); }
      else if (e.key === 'ArrowRight') { blaettern(1); }
      else if (e.key === 'Tab') {
        /* Fokus in der Lightbox halten */
        var ziele = Array.prototype.slice.call(box.querySelectorAll('button:not([hidden])'));
        var i = ziele.indexOf(document.activeElement);
        var naechster = e.shiftKey ? i - 1 : i + 1;
        if (naechster < 0) { naechster = ziele.length - 1; }
        if (naechster >= ziele.length) { naechster = 0; }
        ziele[naechster].focus();
        e.preventDefault();
      }
    };

    function schliessen() {
      if (!box) { return; }
      box.classList.remove('offen');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', tasten);
      if (vorher) { vorher.focus(); }
    }

    var oeffnen = function (index, ausloeser) {
      if (!box) { bauen(); }
      vorher = ausloeser;
      anzeigen(index);
      box.classList.add('offen');
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', tasten);
      box.querySelector('.lb-schliessen').focus();
    };

    knoepfe.forEach(function (knopf, i) {
      knopf.addEventListener('click', function () { oeffnen(i, knopf); });
    });
  }

  /* --- Karte: Zwei-Klick-Lösung ----------------------------------------
     Die Karte von OpenStreetMap wird erst geladen, wenn die Besucherin
     oder der Besucher darauf klickt. Vorher verlässt kein Aufruf die Seite. */
  var kartenKnopf = document.querySelector('[data-map-load]');
  if (kartenKnopf) {
    kartenKnopf.addEventListener('click', function () {
      var halter = document.querySelector('[data-map]');
      if (!halter) { return; }

      var k = cfg.map || {};
      var lat = Number(k.lat) || 48.1493;
      var lon = Number(k.lon) || 11.5545;
      var r = Number(k.radius) || 0.004;
      var bbox = [lon - r * 1.6, lat - r, lon + r * 1.6, lat + r].join(',');

      var rahmen = document.createElement('iframe');
      rahmen.className = 'karte-rahmen';
      rahmen.title = T.karteTitel(cfg.name || 'Hotel Montree');
      rahmen.loading = 'lazy';
      rahmen.referrerPolicy = 'no-referrer';
      rahmen.src = 'https://www.openstreetmap.org/export/embed.html?bbox='
                 + encodeURIComponent(bbox) + '&layer=mapnik&marker='
                 + encodeURIComponent(lat + ',' + lon);

      halter.innerHTML = '';
      halter.appendChild(rahmen);
    });
  }

  /* --- Veranstaltungstermine ------------------------------------------
     Die Termine stehen in assets/data/events.json, damit sie ohne
     Eingriff ins HTML aktualisiert werden können. */
  var terminZiele = document.querySelectorAll('[data-events]');
  if (terminZiele.length) {
    /* Zweisprachige Felder: { "de": "…", "en": "…" } oder einfacher Text. */
    var sprachwert = function (wert) {
      if (wert && typeof wert === 'object') { return wert[sprache] || wert.de || ''; }
      return wert || '';
    };

    /* Aus dem Unterordner /en/ liegt die Datei eine Ebene höher. */
    var quelle = document.querySelector('[data-events-src]');
    var pfad = quelle ? quelle.getAttribute('data-events-src') : 'assets/data/events.json';

    fetch(pfad)
      .then(function (a) {
        if (!a.ok) { throw new Error('Status ' + a.status); }
        return a.json();
      })
      .then(function (daten) {
        (daten.kategorien || []).forEach(function (kat) {
          var ziel = document.querySelector('[data-events="' + kat.id + '"]');
          if (!ziel) { return; }

          ziel.innerHTML = '<table class="daten"><tbody>'
            + (kat.termine || []).map(function (t) {
                var name = sprachwert(t.name);
                var hinweis = sprachwert(t.hinweis);
                return '<tr><th>' + name + '</th><td>'
                     + '<strong>' + (t.zeitraum || '') + '</strong>'
                     + (hinweis ? '<br><span class="hinweis">' + hinweis + '</span>' : '')
                     + '</td></tr>';
              }).join('')
            + '</tbody></table>';
        });
      })['catch'](function () {
        terminZiele.forEach(function (ziel) {
          ziel.innerHTML = '<p class="hinweis">' + T.termineFehler(cfg.phone || '') + '</p>';
        });
      });
  }

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

      var kf = T.kontaktFelder;
      var lines = [
        kf.name + ': ' + get('name'),
        kf.email + ': ' + get('email'),
        kf.telefon + ': ' + get('telefon'),
        kf.anreise + ': ' + get('anreise'),
        kf.abreise + ': ' + get('abreise'),
        kf.personen + ': ' + get('personen'),
        kf.zimmer + ': ' + get('zimmer'),
        '',
        T.kontaktNachricht,
        get('nachricht')
      ];

      var subject = T.kontaktBetreff(cfg.name || '');
      var href = 'mailto:' + (cfg.email || '') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      var note = form.querySelector('[data-mail-note]');
      if (note) { note.hidden = false; }

      window.location.href = href;
    });
  }
}());
