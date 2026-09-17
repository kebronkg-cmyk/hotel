/* =====================================================================
   Hotel Montree – zentrale Konfiguration
   ---------------------------------------------------------------------
   ALLE Kontaktdaten, Links und Eckdaten stehen NUR hier.
   Wird eine Angabe hier geaendert, aendert sie sich auf allen Seiten.

   Platzhalter, die noch geprueft/ersetzt werden muessen, sind mit
   "TODO" markiert.
   ===================================================================== */

window.HOTEL_CONFIG = {

  /* --- Name ---------------------------------------------------------- */
  name: 'Hotel Montree',

  /* --- Buchung (BOOKING_URL) ----------------------------------------- */
  /* TODO: URL der eigenen Buchungsmaschine eintragen.
     Solange hier ein Platzhalter steht, fuehren alle "Direkt buchen"-
     Buttons auf die Kontaktseite (siehe bookingFallback). */
  bookingUrl: 'https://buchung.example.com/hotel-montree',
  bookingFallback: 'kontakt.html',

  /* Parameternamen der Buchungsmaschine.
     Jede Buchungsmaschine nennt die Felder anders - hier anpassen, z. B.
     arrival/departure, checkin/checkout, from/to, arrivalDate/departureDate.
     Ein leerer Wert bedeutet: dieser Parameter wird nicht angehaengt. */
  bookingParams: {
    arrival:   'arrival',     // Anreisedatum
    departure: 'departure',   // Abreisedatum
    adults:    'adults',      // Anzahl Personen
    rooms:     'rooms',       // Anzahl Zimmer
    roomType:  'roomType'     // Zimmertyp (wird vom Buchen-Button der Karte gesetzt)
  },

  /* Datumsformat, das die Buchungsmaschine erwartet:
     'YYYY-MM-DD' (Standard), 'DD.MM.YYYY' oder 'DD-MM-YYYY'. */
  bookingDateFormat: 'YYYY-MM-DD',

  /* --- Direktbuchungs-Vorteile im Startbereich ------------------------ */
  /* TODO: Texte durch die tatsaechlichen Konditionen des Hauses ersetzen.
     Drei Eintraege passen am besten ins Layout. */
  directBenefits: [
    {
      title: 'Bester Preis garantiert',
      text: 'Direkt gebucht zahlen Sie nie mehr als auf einem Buchungsportal.'
    },
    {
      title: 'Kostenlose Stornierung bis [X]',
      text: 'Bis [X Uhr am Anreisetag / X Tage vor Anreise] kostenfrei stornierbar.'
    },
    {
      title: 'Frühstücks-Rabatt',
      text: 'Bei Direktbuchung bekommen Sie das Frühstück für [X] statt [Y].'
    }
  ],

  /* --- Telefon ------------------------------------------------------- */
  phone: '089-5427190',            // Anzeige-Schreibweise
  phoneLink: 'tel:+49895427190',   // technische Schreibweise fuer Klick-Anrufe

  /* --- E-Mail -------------------------------------------------------- */
  email: 'info@hotel-montree.de',

  /* --- WhatsApp ------------------------------------------------------- */
  /* TODO: WhatsApp-Nummer im internationalen Format ohne Leer- und
     Sonderzeichen eintragen, z. B. '4917612345678'.
     Leer lassen = der WhatsApp-Button wird überall ausgeblendet. */
  whatsapp: '',

  /* --- Anfrageformular (anfrage.html) --------------------------------- */
  /* Leer lassen = das Formular öffnet das E-Mail-Programm (mailto).
     Alternativ die URL eines Formular-Dienstes eintragen
     (z. B. Formspree, Formsubmit, eigenes Skript). Dann werden die
     Felder per POST dorthin geschickt. */
  formEndpoint: '',

  /* --- Adresse ------------------------------------------------------- */
  street: 'Dachauer Straße 91',
  zip: '80335',
  city: 'München',
  country: 'Deutschland',

  /* --- Karten-Links (keine eingebetteten Karten, kein Tracking) ------- */
  mapUrl: 'https://www.openstreetmap.org/search?query=Dachauer%20Stra%C3%9Fe%2091%2C%2080335%20M%C3%BCnchen',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Dachauer+Stra%C3%9Fe+91%2C+80335+M%C3%BCnchen',

  /* --- Eckdaten ------------------------------------------------------ */
  /* TODO: Zeiten pruefen und ggf. anpassen. */
  checkIn: 'ab 15:00 Uhr',
  checkOut: 'bis 11:00 Uhr',
  receptionHours: '07:00 – 22:00 Uhr',
  breakfastHours: '07:00 – 10:00 Uhr',

  /* --- Zimmer ---------------------------------------------------------
     TODO: Namen, Größen, Ausstattung und Preise anpassen.
     price: Zahl als Text, z. B. '69'. Leer lassen = "Preis auf Anfrage".
     features: mögliche Werte sind
       'wlan', 'bad', 'tv', 'schreibtisch', 'safe', 'fenster'
     image: Dateiname in assets/img/ */
  rooms: [
    {
      id: 'einzelzimmer',
      name: 'Einzelzimmer',
      image: 'zimmer-einzel.jpg',
      size: 'ca. [X] m²',
      persons: '1 Person',
      price: '',
      text: 'Kompaktes Zimmer für Alleinreisende – ideal für kurze Geschäftsreisen.',
      features: ['wlan', 'bad', 'tv', 'schreibtisch']
    },
    {
      id: 'doppelzimmer',
      name: 'Doppelzimmer',
      image: 'zimmer-doppel.jpg',
      size: 'ca. [X] m²',
      persons: '2 Personen',
      price: '',
      text: 'Wahlweise mit Doppelbett oder zwei Einzelbetten – bitte bei der Buchung angeben.',
      features: ['wlan', 'bad', 'tv', 'schreibtisch']
    },
    {
      id: 'mehrbettzimmer',
      name: 'Mehrbettzimmer',
      image: 'zimmer-dreibett.jpg',
      size: 'ca. [X] m²',
      persons: '3 bis 4 Personen',
      price: '',
      text: 'Für Freunde, Kollegen oder kleine Familien, die zusammen übernachten möchten.',
      features: ['wlan', 'bad', 'tv']
    }
  ],

  /* --- Preise -------------------------------------------------------- */
  /* TODO: Ab-Preise eintragen, z. B. einzel: 'ab 69 €'.
     Leer lassen = auf der Seite erscheint "Preis auf Anfrage". */
  prices: {
    einzel:  '',
    doppel:  '',
    dreibett: '',
    familie: '',
    fruehstueck: ''
  },

  /* --- Impressum / rechtliche Angaben -------------------------------- */
  /* TODO: Durch die tatsaechlichen Angaben des Betreibers ersetzen. */
  legal: {
    company: 'Hotel Montree – [Betreibergesellschaft eintragen]',
    represented: '[Vertretungsberechtigte Person eintragen]',
    register: '[Registergericht und Registernummer eintragen]',
    vatId: '[USt-IdNr. gem. § 27a UStG eintragen]',
    supervisor: 'Kreisverwaltungsreferat der Landeshauptstadt München'
  }
};
