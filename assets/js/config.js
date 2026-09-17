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

  /* --- Buchung ------------------------------------------------------- */
  /* TODO: URL der eigenen Buchungsmaschine eintragen.
     Solange hier ein Platzhalter steht, fuehren alle "Direkt buchen"-
     Buttons auf die Kontaktseite (siehe bookingFallback). */
  bookingUrl: 'https://buchung.example.com/hotel-montree',
  bookingFallback: 'kontakt.html',

  /* --- Telefon ------------------------------------------------------- */
  phone: '089-5427190',            // Anzeige-Schreibweise
  phoneLink: 'tel:+49895427190',   // technische Schreibweise fuer Klick-Anrufe

  /* --- E-Mail -------------------------------------------------------- */
  email: 'info@hotel-montree.de',

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
