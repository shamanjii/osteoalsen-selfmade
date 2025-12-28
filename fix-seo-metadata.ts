// Script to fix too-long titles and meta descriptions
// Title max: 60 chars, Description max: 160 chars

export const SEO_FIXES = {
  // Pages with titles >60 chars (need shortening)
  '/behandlungen/kopfschmerzen-migraene/': {
    oldTitle: 'Kopfschmerzen & Migräne ohne Medikamente behandeln Hamburg | Osteopathie',
    newTitle: 'Kopfschmerzen & Migräne | Osteopathie Hamburg',
    oldDescription: 'Kopfschmerzen & Migräne natürlich lindern ✓ Ohne Medikamente ✓ Ursachenbehandlung statt Symptombekämpfung ✓ VFO-Osteopath Hamburg ✓ Termine binnen 48h ⭐ Jetzt Termin buchen!',
    newDescription: 'Kopfschmerzen & Migräne ohne Medikamente behandeln ✓ Osteopathie Hamburg ✓ VFO-zertifiziert ✓ Termine binnen 48h ⭐ Jetzt Termin buchen!',
  },
  '/behandlungen/nackenschmerzen/': {
    oldTitle: 'Nackenschmerzen & HWS-Blockade lösen Hamburg Rotherbaum | Osteopathie',
    newTitle: 'Nackenschmerzen & HWS-Blockade lösen | Osteopathie',
    oldDescription: 'HWS-Blockaden sanft lösen ✓ Nackenschmerzen & Verspannungen behandeln ✓ Kopfschmerzen lindern ✓ VFO-Osteopath Hamburg Rotherbaum ✓ Termine binnen 48h ⭐ Jetzt buchen!',
    newDescription: 'HWS-Blockaden sanft lösen ✓ Nackenschmerzen behandeln ✓ VFO-Osteopath Hamburg ✓ Termine binnen 48h ⭐ Jetzt Termin buchen!',
  },
  '/osteopathie-rotherbaum/': {
    oldTitle: 'Osteopath Rotherbaum Hamburg | VFO-zertifiziert | Joshua Alsen',
    newTitle: 'Osteopath Rotherbaum | VFO-zertifiziert | J. Alsen',
    oldDescription: 'Ihr Osteopath in Rotherbaum ✓ Ganzheitliche Schmerzbehandlung ✓ VFO-zertifiziert ✓ Zentrale Lage Rappstraße 7 ✓ Termine binnen 48h ✓ Vollständige Kassenerstattung möglich ⭐ Jetzt buchen!',
    newDescription: 'Osteopath Rotherbaum ✓ VFO-zertifiziert ✓ Rappstraße 7 ✓ Termine binnen 48h ✓ Kassenerstattung möglich ⭐ Jetzt Termin buchen!',
  },
  '/behandlungen/arthrose-gelenkbeschwerden/': {
    oldTitle: 'Hilft Osteopathie bei Arthrose? Schmerzlinderung ohne OP | Hamburg',
    newTitle: 'Arthrose & Gelenkbeschwerden | Osteopathie Hamburg',
    oldDescription: 'Ja, Osteopathie hilft bei Arthrose! ✓ Natürliche Schmerzlinderung ✓ Mehr Beweglichkeit ohne OP ✓ VFO-Osteopath Hamburg ✓ Termine binnen 48h ⭐ Jetzt Termin buchen!',
    newDescription: 'Osteopathie bei Arthrose ✓ Schmerzlinderung ohne OP ✓ VFO-Osteopath Hamburg ✓ Termine binnen 48h ⭐ Jetzt Termin buchen!',
  },
  '/behandlungen/stress-burnout/': {
    oldTitle: 'Stress & Burnout Behandlung Hamburg | Osteopathie für Nervensystem',
    newTitle: 'Stress & Burnout Behandlung | Osteopathie Hamburg',
    oldDescription: 'Osteopathische Behandlung bei Stress, Erschöpfung und Burnout in Hamburg. Regulation des vegetativen Nervensystems durch sanfte craniosacrale Techniken. VFO-zertifiziert.',
    newDescription: 'Stress & Burnout mit Osteopathie behandeln ✓ Nervensystem regulieren ✓ VFO-zertifiziert ✓ Hamburg ✓ Termine binnen 48h ⭐ Jetzt buchen!',
  },
  '/behandlungen/sportosteopathie/': {
    oldTitle: 'Sportosteopathie Hamburg | Osteopathie für Sportler - Joshua Alsen',
    newTitle: 'Sportosteopathie Hamburg | Osteopathie für Sportler',
    oldDescription: 'Sportosteopathie in Hamburg: Verletzungsprävention, schnellere Regeneration & Leistungsoptimierung für Sportler. VFO-zertifizierter Osteopath. Jetzt Termin buchen!',
    newDescription: 'Sportosteopathie Hamburg ✓ Prävention & Regeneration ✓ VFO-zertifiziert ✓ Termine binnen 48h ⭐ Jetzt Termin buchen!',
  },
  '/faq/': {
    oldTitle: 'Häufige Fragen (FAQ) | Osteopathie Hamburg - Joshua Alsen',
    newTitle: 'FAQ | Osteopathie Hamburg - Joshua Alsen',
    oldDescription: 'Antworten auf häufige Fragen zur Osteopathie in Hamburg: Behandlungsablauf, Kosten, Kassenerstattung, Terminbuchung und mehr. VFO-zertifizierter Osteopath Joshua Alsen.',
    newDescription: 'FAQ zur Osteopathie in Hamburg ✓ Ablauf, Kosten, Kassenerstattung ✓ VFO-zertifiziert ✓ Termine binnen 48h ⭐ Jetzt buchen!',
  },
  '/was-ist-osteopathie/': {
    oldTitle: 'Was ist Osteopathie? | Osteopathie Hamburg - Joshua Alsen',
    newTitle: 'Was ist Osteopathie? | Hamburg - Joshua Alsen',
    oldDescription: 'Osteopathie Hamburg: Ganzheitliche Heilmethode erklärt. VFO-zertifizierter Osteopath Joshua Alsen in Rotherbaum & Eimsbüttel. Behandlung von Rückenschmerzen, Kopfschmerzen & mehr.',
    newDescription: 'Osteopathie erklärt ✓ VFO-Osteopath Hamburg ✓ Rotherbaum & Eimsbüttel ✓ Rückenschmerzen, Kopfschmerzen & mehr ✓ Jetzt buchen!',
  },
  '/ueber-mich/': {
    oldTitle: 'Über mich - Joshua Alsen | Osteopath Hamburg',
    newTitle: 'Über mich | Osteopath Hamburg - Joshua Alsen',
    oldDescription: 'Joshua Alsen ✓ VFO-zertifizierter Osteopath & Heilpraktiker ✓ BAO-Ausbildung (5.000+ Std.) ✓ Internationale Erfahrung ✓ 2 Standorte in Hamburg ⭐ Jetzt kennenlernen!',
    newDescription: 'Joshua Alsen ✓ VFO-Osteopath & Heilpraktiker ✓ 5.000+ Std. Ausbildung ✓ 2 Standorte Hamburg ⭐ Jetzt kennenlernen!',
  },
  '/behandlungen/': {
    oldTitle: 'Osteopathische Behandlungen Hamburg | Joshua Alsen',
    newTitle: 'Osteopathie Behandlungen Hamburg | Joshua Alsen',
    oldDescription: 'Osteopath Hamburg ✓ VFO-zertifiziert ✓ Rückenschmerzen, Kopfschmerzen, Verdauung, Sport & mehr ✓ 60 Min. Behandlung ✓ 2 Standorte ✓ Kassenzuschuss ⭐ Jetzt Termin buchen!',
    newDescription: 'Osteopath Hamburg ✓ VFO-zertifiziert ✓ Rücken, Kopf, Verdauung, Sport ✓ 60 Min. ✓ Kassenzuschuss ⭐ Jetzt Termin buchen!',
  },
  '/osteopathie-eimsbuettel/': {
    oldTitle: 'Osteopathie Hamburg Eimsbüttel | Joshua Alsen | VFO-zertifiziert',
    newTitle: 'Osteopathie Eimsbüttel | VFO-zertifiziert',
    oldDescription: 'Osteopathie Hamburg Eimsbüttel ✓ Joshua Alsen ✓ VFO-zertifiziert ✓ Stresemannallee 118 ✓ Termine binnen 48h ✓ S-Bahn Eidelstedt ✓ Kassenzuschuss möglich ⭐ Jetzt Termin buchen!',
    newDescription: 'Osteopathie Eimsbüttel ✓ VFO-zertifiziert ✓ Stresemannallee 118 ✓ Termine binnen 48h ✓ Kassenzuschuss ⭐ Jetzt buchen!',
  },
  // Blog posts with long titles
  '/blog/schulter-impingement-rotatorenmanschette-uebungen/': {
    oldTitle: 'Schulter-Impingement: Die wahre Ursache liegt nicht in der Schulter | Osteoalsen Blog',
    newTitle: 'Schulter-Impingement: Die wahre Ursache | Blog',
    oldDescription: '87% der Impingement-Patienten haben BWS-Blockaden. Erfahren Sie, warum Ihre Schulterschmerzen vom Brustkorb kommen – und welche 6 Übungen wirklich helfen (inkl. Bonus: BWS-HWS Integration).',
    newDescription: '87% der Impingement-Patienten haben BWS-Blockaden. Die wahre Ursache + 6 effektive Übungen. Mit BWS-HWS Integration ✓ Jetzt lesen!',
  },
  '/blog/spannungskopfschmerzen-muskel-oder-hws/': {
    oldTitle: 'Spannungskopfschmerzen: Ist es der Muskel oder die HWS? (Selbsttest + Behandlung) | Osteoalsen Blog',
    newTitle: 'Spannungskopfschmerzen: Muskel oder HWS? | Blog',
    oldDescription: '',  // Needs description
    newDescription: 'Spannungskopfschmerzen: Muskelursache oder HWS-Problem? Selbsttest + Behandlung ✓ Osteopathische Lösungen ✓ Jetzt lesen!',
  },
  '/blog/cmd-nackenschmerzen-kiefergelenk/': {
    oldTitle: 'Nackenschmerzen durch Kieferprobleme: Der CMD-HWS-Zusammenhang (endlich erklärt) | Osteoalsen Blog',
    newTitle: 'Nackenschmerzen durch CMD: HWS-Zusammenhang | Blog',
    oldDescription: 'Morgendliche Nackenschmerzen + Kieferknacken? 70% der CMD-Patienten haben HWS-Probleme. Trigeminusnerv → Atlas-Dysfunktion → chronischer Schmerz. Behandlungsprotokoll.',
    newDescription: 'CMD + Nackenschmerzen: 70% haben HWS-Probleme. Trigeminusnerv, Atlas, chronischer Schmerz. Behandlungsprotokoll ✓ Jetzt lesen!',
  },
  '/blog/schulterschmerzen-frozen-shoulder-osteopathie-statt-op/': {
    oldTitle: 'Schulterschmerzen & Frozen Shoulder: Wie Osteopathie OP vermeiden hilft | Osteoalsen Blog',
    newTitle: 'Frozen Shoulder: Osteopathie statt OP | Blog',
    oldDescription: 'Frozen Shoulder, Impingement oder Kalkschulter? Erfahren Sie, wie Osteopathie Schulterschmerzen an der Wurzel packt – und warum 70% der Schulter-OPs vermeidbar sind.',
    newDescription: 'Frozen Shoulder, Impingement, Kalkschulter: Osteopathie statt OP. 70% der Schulter-OPs sind vermeidbar ✓ Jetzt lesen!',
  },
  '/blog/migraene-ohne-aura-osteopathie/': {
    oldTitle: 'Migräne ohne Aura: Warum Schmerzmittel langfristig schaden (Osteopathie-Ansatz) | Osteoalsen Blog',
    newTitle: 'Migräne ohne Aura: Osteopathie-Ansatz | Blog',
    oldDescription: '15 Migräne-Tage/Monat trotz Triptanen? 60% haben HWS-Beteiligung. Trigeminovaskuläre Dysfunktion + Atlas-Blockierung = Teufelskreis. 4-Phasen-Behandlung erklärt.',
    newDescription: 'Migräne ohne Aura: 60% haben HWS-Beteiligung. Trigeminovaskuläre Dysfunktion + Atlas-Blockierung. 4-Phasen-Behandlung ✓',
  },
  '/blog/nackenschmerzen-schwindel-hws-vagus/': {
    oldTitle: 'Nackenschmerzen & Schwindel: Die HWS-Vagus-Verbindung verstehen & behandeln | Osteoalsen Blog',
    newTitle: 'Nackenschmerzen & Schwindel: HWS-Vagus | Blog',
    oldDescription: '',  // Needs description
    newDescription: 'Nackenschmerzen + Schwindel: Die HWS-Vagus-Verbindung verstehen & behandeln ✓ Osteopathische Lösungen ✓ Jetzt lesen!',
  },
  '/blog/isg-blockierung-teufelskreis/': {
    oldTitle: 'ISG-Blockierung? Warum sie immer wiederkommt (und wie Sie den Teufelskreis durchbrechen) | Osteoalsen Blog',
    newTitle: 'ISG-Blockierung: Teufelskreis durchbrechen | Blog',
    oldDescription: 'ISG-Blockierung kommt immer wieder? 80% behandeln nur Symptom, nicht Ursache. 6 häufigste Auslöser + 4-Säulen-Behandlung + Selbsttests. Schluss mit Teufelskreis.',
    newDescription: 'ISG-Blockierung immer wieder? 6 häufigste Auslöser + 4-Säulen-Behandlung + Selbsttests. Teufelskreis durchbrechen ✓ Jetzt lesen!',
  },
  '/blog/kniearthrose-ohne-op-behandeln/': {
    oldTitle: 'Kniearthrose ohne OP behandeln: Wie Osteopathie Schmerzen lindert & Beweglichkeit erhält | Osteoalsen Blog',
    newTitle: 'Kniearthrose ohne OP: Osteopathie hilft | Blog',
    oldDescription: 'Ihr Orthopäde empfiehlt eine Knie-OP? Erfahren Sie, warum bei 70% aller Arthrose-Patienten konservative Behandlung genauso wirksam ist – und wie Osteopathie Ihnen hilft, das Skalpell zu vermeiden.',
    newDescription: 'Knie-OP nötig? 70% können mit Osteopathie auf OP verzichten. Schmerzlinderung + Beweglichkeit erhalten ✓ Jetzt lesen!',
  },
  '/blog/gelenkbeschwerden-osteopathie-ganzheitliche-behandlung/': {
    oldTitle: 'Gelenkbeschwerden verstehen und ganzheitlich behandeln – Osteopathie Hamburg | Osteoalsen Blog',
    newTitle: 'Gelenkbeschwerden ganzheitlich behandeln | Blog',
    oldDescription: 'Gelenkschmerzen müssen nicht chronisch werden. Erfahren Sie, wie osteopathische Behandlung die wahren Ursachen von Gelenkbeschwerden findet – von Knie über Hüfte bis Schulter.',
    newDescription: 'Gelenkschmerzen ganzheitlich behandeln. Osteopathie findet die wahren Ursachen: Knie, Hüfte, Schulter ✓ Jetzt lesen!',
  },
  '/blog/schleudertrauma-spaetfolgen-langfristig-behandeln/': {
    oldTitle: 'Schleudertrauma-Spätfolgen: Warum Symptome nach Jahren zurückkommen (Behandlungsprotokoll) | Osteoalsen Blog',
    newTitle: 'Schleudertrauma-Spätfolgen behandeln | Blog',
    oldDescription: 'Nackenschmerzen 3 Jahre nach Auffahrunfall? 40% entwickeln chronische Spätfolgen. HWS-Instabilität → Kompensationsmuster → Symptomrückkehr. Langfristiges Behandlungsprotokoll.',
    newDescription: 'Schleudertrauma-Spätfolgen: 40% entwickeln chronische Symptome. HWS-Instabilität + Kompensation. Behandlungsprotokoll ✓',
  },
  '/blog/chronische-kopfschmerzen-osteopathie-statt-tabletten/': {
    oldTitle: 'Chronische Kopfschmerzen loswerden: Osteopathie statt Schmerztabletten | Osteoalsen Blog',
    newTitle: 'Chronische Kopfschmerzen: Osteopathie | Blog',
    oldDescription: 'Chronische Kopfschmerzen trotz Schmerzmitteln? Die wahren Ursachen liegen oft im Nacken, Kiefer oder Nervensystem. Wie Osteopathie nachhaltig hilft – ohne Tabletten.',
    newDescription: 'Chronische Kopfschmerzen ohne Tabletten lösen. Ursachen: Nacken, Kiefer, Nervensystem. Osteopathie hilft nachhaltig ✓ Jetzt lesen!',
  },
  '/blog/hws-blockierung-nacken-verspannung/': {
    oldTitle: 'HWS-Blockierung: Warum Ihr Nacken immer wieder verspannt (und was wirklich hilft) | Osteoalsen Blog',
    newTitle: 'HWS-Blockierung: Was wirklich hilft | Blog',
    oldDescription: '',  // Needs description
    newDescription: 'HWS-Blockierung: Warum verspannt Ihr Nacken immer wieder? Echte Ursachen + wirksame Lösungen ✓ Osteopathie ✓ Jetzt lesen!',
  },
  '/blog/rueckenschmerzen-osteopathie-ganzheitliche-behandlung-hamburg/': {
    oldTitle: 'Rückenschmerzen verstehen - und osteopathisch behandeln (Hamburg) | Osteoalsen Blog',
    newTitle: 'Rückenschmerzen osteopathisch behandeln | Blog',
    oldDescription: 'Rückenschmerzen entstehen selten nur an einer Stelle. Osteopathie verbindet strukturelle, viszerale und kraniosakrale Behandlungsansätze für ganzheitliche Schmerzlinderung.',
    newDescription: 'Rückenschmerzen ganzheitlich behandeln. Strukturelle, viszerale, kraniosakrale Osteopathie für Schmerzlinderung ✓ Jetzt lesen!',
  },
  '/blog/rueckenschmerzen-verdauung-radix-mesenterii/': {
    oldTitle: 'Rückenschmerzen und Verdauung: Wie die Radix Mesenterii Darm und Lendenwirbelsäule verbindet | Osteoalsen Blog',
    newTitle: 'Rückenschmerzen & Verdauung: Radix Mesenterii | Blog',
    oldDescription: 'Rückenschmerzen UND Verdauungsprobleme gleichzeitig? Die Radix Mesenterii verbindet Darm und Lendenwirbelsäule anatomisch. Viszerale Osteopathie hilft beiden. Mit 3 Übungen.',
    newDescription: 'Rückenschmerzen + Verdauung: Radix Mesenterii verbindet Darm & LWS. Viszerale Osteopathie hilft. Mit 3 Übungen ✓ Jetzt lesen!',
  },
  '/blog/dehnen-rueckenschmerzen-mythos/': {
    oldTitle: 'Warum Dehnen Ihre Rückenschmerzen schlimmer macht (und was stattdessen hilft) | Osteoalsen Blog',
    newTitle: 'Dehnen verschlimmert Rückenschmerzen? | Blog',
    oldDescription: '',  // Needs description
    newDescription: 'Warum Dehnen Rückenschmerzen schlimmer macht + was wirklich hilft ✓ Osteopathie-Perspektive ✓ Jetzt lesen!',
  },
  '/blog/sportverletzung-schneller-zurueck-training/': {
    oldTitle: 'Sportverletzung? So kommen Sie 3x schneller zurück ins Training (ohne Rückfall) | Osteoalsen Blog',
    newTitle: 'Sportverletzung: 3x schneller zurück | Blog',
    oldDescription: '4-6 Wochen Pause nach Sportverletzung? Mit Osteopathie 3x schneller zurück. Behandlung der kinetischen Kette verhindert Rückfälle. Mit Return-to-Sport-Protokoll.',
    newDescription: 'Sportverletzung: Mit Osteopathie 3x schneller zurück. Kinetische Kette + Return-to-Sport-Protokoll verhindert Rückfälle ✓',
  },
  '/blog/sportosteopathie-hamburg-leistung-optimieren/': {
    oldTitle: 'Sportosteopathie Hamburg: Performance steigern, Verletzungen vorbeugen | Osteoalsen Blog',
    newTitle: 'Sportosteopathie Hamburg: Performance | Blog',
    oldDescription: 'Sportosteopathie ist mehr als Verletzungsbehandlung: Bewegungsqualität verbessern, Regeneration beschleunigen, Leistung optimieren. Für Läufer, Triathleten, Kraftsportler.',
    newDescription: 'Sportosteopathie: Bewegung verbessern, Regeneration beschleunigen, Leistung optimieren. Für Läufer, Triathleten ✓ Jetzt lesen!',
  },
  '/blog/schreibtisch-fehler-rueckenschmerzen/': {
    oldTitle: '5 Fehler am Schreibtisch, die Ihren Rücken jeden Tag ein bisschen mehr zerstören | Osteoalsen Blog',
    newTitle: '5 Schreibtisch-Fehler: Rückenschmerzen | Blog',
    oldDescription: '8 Stunden täglich am Schreibtisch? Diese 5 Fehler schädigen Ihren Rücken schleichend. Bildschirm zu tief, Stuhl zu hoch & mehr. Mit Checkliste und Sofort-Lösungen.',
    newDescription: '5 Schreibtisch-Fehler schädigen Ihren Rücken. Bildschirm, Stuhl, Position + Checkliste & Sofort-Lösungen ✓ Jetzt lesen!',
  },
  '/blog/burnout-ganzheitlich-behandeln-glymphatisches-system/': {
    oldTitle: 'Burnout ganzheitlich behandeln: Das glymphatische System verstehen & aktivieren | Osteoalsen Blog',
    newTitle: 'Burnout: Glymphatisches System aktivieren | Blog',
    oldDescription: 'Burnout ist keine reine 'Kopfsache' - Ihr Gehirn braucht buchstäblich Entgiftung. Wie Osteopathie das glymphatische System aktiviert und chronische Erschöpfung an der Wurzel packt.',
    newDescription: 'Burnout ganzheitlich: Glymphatisches System aktiviert Gehirn-Entgiftung. Osteopathie gegen chronische Erschöpfung ✓',
  },
  '/blog/handy-nacken-text-neck-rueckgaengig/': {
    oldTitle: 'Handy-Nacken (Text Neck): Wie Sie die Smartphone-Schäden rückgängig machen | Osteoalsen Blog',
    newTitle: 'Handy-Nacken (Text Neck) rückgängig machen | Blog',
    oldDescription: '',  // Needs description
    newDescription: 'Handy-Nacken (Text Neck): Smartphone-Schäden rückgängig machen ✓ Osteopathie-Lösungen ✓ Jetzt lesen!',
  },
};
