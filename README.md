# Hotel Montree – Website

Statische Website für das Hotel Montree, Dachauer Straße 91, 80335 München.
Reines HTML, CSS und Vanilla JavaScript – keine Frameworks, kein Build-Schritt,
kein Tracking, keine Cookies, keine externen Schriften oder Karten.
Direkt über GitHub Pages veröffentlichbar.

Ziel der Seite: **möglichst viele Direktbuchungen** statt Buchungen über Portale.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Direktbuchungsvorteile, Zimmerübersicht, Lage, FAQ |
| `zimmer.html` | Zimmertypen, Ausstattung, Preise |
| `lage.html` | Lage, Entfernungen, Anfahrt, Parken |
| `muenchen-events.html` | Veranstaltungsjahr in München, wann früh gebucht werden sollte |
| `kontakt.html` | Kontaktdaten und Anfrageformular |
| `impressum.html` | Impressum |
| `datenschutz.html` | Datenschutzerklärung |

## Alle Daten an einer Stelle ändern

Sämtliche Kontaktdaten, Links und Eckdaten stehen ausschließlich in
**`assets/js/config.js`**. Eine Änderung dort wirkt auf allen Seiten:

```js
bookingUrl: 'https://buchung.example.com/hotel-montree',  // Buchungsmaschine
phone:      '089-5427190',
phoneLink:  'tel:+49895427190',
email:      'info@hotel-montree.de',
street:     'Dachauer Straße 91',
zip:        '80335',
city:       'München',
```

Dazu kommen Check-in-/Check-out-Zeiten, Rezeptions- und Frühstückszeiten,
Ab-Preise (`prices`) sowie die Impressumsangaben (`legal`).

Im HTML stehen dieselben Werte noch einmal als Rückfalltext, damit die Seite
auch ohne JavaScript vollständig lesbar und anrufbar bleibt. Für den laufenden
Betrieb genügt es, `config.js` zu pflegen; nur wenn die Seite ohne JavaScript
exakt stimmen soll, müssen die Rückfalltexte ebenfalls angepasst werden.

### Buchungslink

Solange in `bookingUrl` noch der Platzhalter mit `example.com` steht, führen
alle „Direkt buchen“-Buttons auf `kontakt.html`. Sobald die echte URL der
Buchungsmaschine eingetragen ist, zeigen sie automatisch dorthin (in einem
neuen Tab).

### Preise

`prices` ist zunächst leer – auf den Seiten erscheint dann „Preis auf Anfrage“.
Sobald dort z. B. `einzel: 'ab 69 €'` eingetragen wird, steht das auf allen
Seiten.

## Offene Punkte vor dem Live-Gang

Im Quelltext sind alle offenen Stellen mit `TODO` markiert:

1. **`noindex` entfernen.** Aktuell steht auf jeder Seite
   `<meta name="robots" content="noindex">`. Diese Zeile in allen sieben
   HTML-Dateien löschen, wenn die Seite in Suchmaschinen erscheinen soll:
   ```
   sed -i '/content="noindex"/d; /noch nicht fuer Suchmaschinen/,+1d' *.html
   ```
2. **Bilder austauschen.** Die Dateien in `assets/img/` sind Platzhalter mit
   sprechenden Namen (`aussen.jpg`, `bar.jpg`, `fruehstueck.jpg`,
   `zimmer-einzel.jpg` …). Einfach durch echte Fotos gleichen Namens ersetzen,
   dann muss kein HTML angefasst werden. Empfohlen: ca. 1600 px Breite,
   Seitenverhältnis 3:2, als JPEG.
3. **Impressum vervollständigen.** Betreibergesellschaft, vertretungsberechtigte
   Person, Registereintrag und USt-IdNr. in `config.js` unter `legal` eintragen.
4. **Datenschutzerklärung prüfen.** Hoster (z. B. GitHub Pages) und Anbieter der
   Buchungsmaschine namentlich eintragen und den Text rechtlich prüfen lassen.
5. **Inhalte bestätigen.** Preise, Check-in-Zeiten, Storno- und Parkhinweise
   sowie die Entfernungsangaben vom Haus gegenprüfen lassen.
6. **Bildnachweis** im Impressum ergänzen, sobald echte Fotos verwendet werden.

## Veröffentlichen über GitHub Pages

1. Im Repository: *Settings → Pages*.
2. Unter *Build and deployment* die Quelle **Deploy from a branch** wählen,
   Branch und Ordner `/ (root)` auswählen, speichern.
3. Nach wenigen Minuten ist die Seite unter der angezeigten Adresse erreichbar.

Die Datei `.nojekyll` sorgt dafür, dass GitHub Pages die Dateien unverändert
ausliefert. Ein Build-Schritt ist nicht nötig.

## Lokal ansehen

```
python3 -m http.server 8000
```
Danach `http://localhost:8000/` im Browser öffnen. (Ein Doppelklick auf
`index.html` funktioniert ebenfalls.)

## Aufbau

```
index.html, zimmer.html, lage.html, muenchen-events.html,
kontakt.html, impressum.html, datenschutz.html
assets/css/style.css     Layout und Gestaltung (mobile first)
assets/js/config.js      >> hier alle Daten pflegen <<
assets/js/app.js         verteilt die Konfiguration auf die Seiten
assets/img/*.jpg         Platzhalterbilder
.nojekyll                für GitHub Pages
```

## Technische Hinweise

* Mobile first; ab 40 rem und 52 rem Breite greifen zusätzliche Layoutregeln.
* Nur Systemschriften, keine Web-Fonts.
* Auf dem Smartphone liegt dauerhaft eine Leiste mit „Anrufen“ und
  „Direkt buchen“ am unteren Bildschirmrand.
* Das Kontaktformular sendet nichts an einen Server, sondern öffnet das
  E-Mail-Programm des Gastes mit vorbereitetem Text.
* Kartendienste werden nicht eingebettet, sondern nur verlinkt.
