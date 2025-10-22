export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  reviewCount?: number;
  photoCount?: number;
  isLocalGuide?: boolean;
}

export const fallbackReviews: Review[] = [
  {
    author: "Alexandra Neuhaus",
    rating: 5,
    text: "Ich kam vor einigen Tagen mit akuten Schulterschmerzen zu Joshua. Die Behandlung war auf eine sanfte Art sehr intensiv. In den zwei darauffolgenden Tagen, hatte mein Körper viel zu tun, ausgelöst durch die Behandlung, Heute nun stelle ich fest, dass ich so gut wie schmerzfrei bin. Ein super Job, Joshua - 1000 Dank dafür!",
    date: "vor 5 Tagen",
    reviewCount: 3,
    photoCount: 3
  },
  {
    author: "Anna-Lena Schönberger",
    rating: 5,
    text: "Ich bin begeistert und komme auf jeden Fall wieder! Danke Joshua.",
    date: "vor 2 Wochen",
    reviewCount: 3,
    photoCount: 0
  },
  {
    author: "Catrin Hasse",
    rating: 5,
    text: "",
    date: "vor 5 Wochen",
    reviewCount: 0,
    photoCount: 0
  },
  {
    author: "Christoph Graf",
    rating: 5,
    text: "Joshua ist super kompetent und freundlich. Fühlte mich richtig gut aufgehoben und unsere Termine haben mir sehr geholfen 🫶",
    date: "vor 14 Wochen",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Kai Schneider",
    rating: 5,
    text: "Ich kam mit sehr starken Schmerzen in Arm und Schulter und verließ die Praxis an diesem Tag schmerzfrei. Joshua stellt die richtigen Fragen, hört ganz genau zu und setzt dies dann in seiner Behandlung um. Er nimmt sich wirklich Zeit für seine Patienten und es wird nicht nur das offensichtliche Problem behandelt, sondern der Mensch als Ganzes betrachtet. Ich habe gespürt, wie nicht nur körperliche Blockaden gelöst wurden, sondern auch festgehaltene Emotionen sich befreien konnten. Das war eine völlig neue und unglaublich befreiende Erfahrung. Ich bin unendlich dankbar für die professionelle Hilfe und die einfühlsame Betreuung. Wer einen Osteopathen sucht, der nicht nur Symptome bekämpft, sondern wirklich an der Wurzel des Problems ansetzt und dabei noch äußerst empathisch ist, ist hier richtig! Vielen Dank, Joshua!",
    date: "vor 19 Wochen",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Theresa Behrendt",
    rating: 5,
    text: "Joshua ist ein sehr netter und einfühlsamer Osteopath. Das war meine erste osteopathische Behandlung und ich habe mich sofort sehr wohl gefühlt. Meine Knieschmerzen waren direkt nach der ersten Behandlung viel besser und ich habe mich allgemein deutlich ausgeglichener gefühlt.",
    date: "vor 20 Wochen",
    reviewCount: 4,
    photoCount: 0
  },
  {
    author: "Evgeniya Englert",
    rating: 5,
    text: "Ich hatte nach einem Lumbago erhebliche Beschwerden, die mich stark einschränkten. Nach der Behandlung bei Joshua Alsen sind diese Schmerzen verschwunden – ein unglaubliches Gefühl! Joshua nimmt sich wirklich viel Zeit für seine Patienten und hört genau zu, was man spürt. Seine Herangehensweise ist ganzheitlich, sodass er nicht nur die direkten Schmerzpunkte behandelt, sondern auch indirekte Ursachen auflöst. Ich bin beeindruckt von seiner Fachkompetenz und dem Erfolg seiner Behandlung. Er ist ein wahrer Meister seines Faches, den ich uneingeschränkt weiterempfehlen kann. Vielen Dank, Joshua, für diese hervorragende Arbeit!",
    date: "vor 21 Wochen",
    reviewCount: 15,
    photoCount: 1,
    isLocalGuide: true
  },
  {
    author: "Yusuf Verus",
    rating: 5,
    text: "Ich möchte es kurz halten, den ihr müsst es selber erleben. Kompetenz und Empathie, so stellt man sich einen guten Heilpraktiker vor, und Das besitzt Joshua ohne Zweifel. Meine Rückenschmerzen wurden gelindert, geh bald wegen meine Schulter hin. Geht hin, ihr werdet nicht enttäuscht!",
    date: "vor 22 Wochen",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "Ines Virde",
    rating: 5,
    text: "Meine erste Behandlung bei Joshua und ich kann berichten: es war sehr gut, nach einer Stunde konnte ich schmerzfrei die Praxis verlassen. Dazu noch kompetent, nett und hat alle Fragen beantwortet. Absolut zu empfehlen.",
    date: "vor 22 Wochen",
    reviewCount: 10,
    photoCount: 0,
    isLocalGuide: true
  },
  {
    author: "Will Burgess",
    rating: 5,
    text: "Joshua Alsen is the best! After visiting multiple osteopaths regarding my shin splints, Joshua is the only one who discovered the actual problem. He was willing to spend the time to discover and put me on the right path. I cannot recommend him enough. Extremely knowledgeable in his field, very friendly and an all round professional.",
    date: "vor 22 Wochen",
    reviewCount: 6,
    photoCount: 0
  },
  {
    author: "Shayan",
    rating: 5,
    text: "Sehr kompetenter und einfühlsamer Osteopath. Die Behandlung ist professionell, individuell abgestimmt und findet in einer angenehmen Atmosphäre statt. Absolut empfehlenswert!",
    date: "vor 26 Wochen",
    reviewCount: 9,
    photoCount: 0
  },
  {
    author: "Silvia Gouverneur",
    rating: 5,
    text: "I feel so grateful. I was desperately looking for help because of a very bad pain in my back and neck and rigidity since a few days (I have a 16m baby and carrying her and breastfeeding and having bad night-sleep does not help) and as I'm not from Hamburg I didn't know were to go, so I chose the closest one from me. I'm glad I found Joshua. He was so kind, respectful, caring and listened to everything I had to say. I could feel he really cared about helping out and he was very exhaustive about finding out what was happening. As everything that is done from the heart, it worked. Right after the session I immediately felt relieved. Today, two days after, I feel nothing on my back and like 5% of what I felt in my neck. I'm always fascinated about this discipline. It feels almost magical, but I know it's only body knowledge. So please give yourself the gift of going to Joshua's consultation when you need it. Thank you very much, Joshua!",
    date: "vor 33 Wochen",
    reviewCount: 45,
    photoCount: 4,
    isLocalGuide: true
  },
  {
    author: "Heike Kaminski",
    rating: 5,
    text: "Ich war zum ersten Mal bei Herrn Alsen und traf auf einen sehr freundlichen ,offenen Osteopathen.Seine ausführliche Behandlung half mir gleich beim ersten Mal. Vielen Dank",
    date: "vor 37 Wochen",
    reviewCount: 6,
    photoCount: 0
  },
  {
    author: "Nale LW",
    rating: 5,
    text: "Kompetenter und sympathischer Therapeut, hat sich viel Zeit genommen. Empfehlenswert!",
    date: "vor 41 Wochen",
    reviewCount: 4,
    photoCount: 0
  },
  {
    author: "Katharina Lohmann",
    rating: 5,
    text: "",
    date: "vor 41 Wochen",
    reviewCount: 3,
    photoCount: 0
  },
  {
    author: "David Kampmann",
    rating: 5,
    text: "Ich bin Herrn Alsen unglaublich dankbar! Nachdem ich mit starken Verspannungen und akuten Kopfschmerzen zu kämpfen hatte, konnte er mir kurzfristig und unkompliziert einen Termin ermöglichen. Da ich vorher keine Erfahrungen mit Osteopathie hatte, war ich anfangs unsicher, ob diese Behandlung überhaupt helfen würde. Doch meine Skepsis war völlig unbegründet: Herr Alsen arbeitet äußerst einfühlsam, sanft und präzise. Schon direkt nach der ersten Behandlung habe ich eine deutliche Erleichterung gespürt. Ich habe mich rundum gut betreut gefühlt und kann Herrn Alsen aus voller Überzeugung weiterempfehlen. Ein echter Glücksgriff!",
    date: "vor 41 Wochen",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Nico Brockmeyer",
    rating: 5,
    text: "Ich bin mit Schmerzen in der Brust und einer Blockade an der Wirbelsäule zu Joshua gekommen, welche schon längere Zeit angehalten haben. Dank der anschaulichen Erklärungen und wirksamen Behandlung bin ich mittlerweile völlig schmerzfrei. Vielen Dank Joshua - ab jetzt meine 1. Wahl!",
    date: "vor 42 Wochen",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "Christina",
    rating: 5,
    text: "Joshua ist ein kompetenter Therapeut und hat mir sehr geholfen! Er wendete effektive Behandlungstechniken an, die mich von jahrelangen Beschwerden befreit haben. Er Behandelt in einer wohlfühlenden Atmosphäre, zu der man gerne geht.",
    date: "vor 49 Wochen",
    reviewCount: 4,
    photoCount: 0
  },
  {
    author: "Ali Arslan Fotografie",
    rating: 5,
    text: "Obwohl ich keine akuten Schmerzen hatte, wollte ich meinem Körper etwas Gutes tun und habe mich für eine Behandlung bei Joshua entschieden. Es hat sich absolut gelohnt! Joshua ist sehr professionell und versteht sein Handwerk – man fühlt sich direkt wohl und gut aufgehoben. Seine ruhige, angenehme Art sorgt für eine entspannte Atmosphäre, und die Behandlung war einfach großartig. Ich kann wirklich jedem empfehlen, auch ohne akute Beschwerden vorbeizuschauen, um langfristig etwas für das eigene Wohlbefinden zu tun. Ein echter Profi!",
    date: "vor 50 Wochen",
    reviewCount: 11,
    photoCount: 0
  },
  {
    author: "Moritz Frank",
    rating: 5,
    text: "Der Beste! Joshua ist nicht nur super nett und einfühlsam, sondern auch sehr kompetent. Er weiß was er macht und geht auf deine Wünsche und Probleme super gut ein. Ich fühle mich jedes Mal deutlich besser, wenn ich bei ihm war und habe weniger Schmerzen. Hut ab für diesen tollen Job den er macht! Ich kann es jedem und jeder nur empfehlen.",
    date: "vor 50 Wochen",
    reviewCount: 15,
    photoCount: 0
  },
  {
    author: "Daniela D",
    rating: 5,
    text: "Joshua zeigt sehr viel Expertise und hat eine sehr angenehme und beruhigende Art. Ich habe mich während der Behandlung gut aufgehoben gefühlt und bin mehrere Male wiedergekommen. Kann ich sehr empfehlen!",
    date: "vor 50 Wochen",
    reviewCount: 6,
    photoCount: 0
  },
  {
    author: "Andre Wagner",
    rating: 5,
    text: "Ich fühlte mich sehr wohl, Herr Alsen versteht was von seinem Fach, ich komme gerne wieder",
    date: "vor 51 Wochen",
    reviewCount: 602,
    photoCount: 42,
    isLocalGuide: true
  },
  {
    author: "Henrike Müller",
    rating: 5,
    text: "Ich fühlte mich sofort willkommen. Herr Alsen hat mich sowohl professionell als auch empathisch behandelt. Ich freue mich schon auf den nächsten Termin und auf eine deutliche Schmerzreduktion! Ich empfehle ihn sehr gerne weiter!",
    date: "vor 51 Wochen",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "F. D.Knop",
    rating: 5,
    text: "Sehr gute, seriöse Behandlung. Gründliche und gleichzeitig empathische Herangehensweise!",
    date: "vor 52 Wochen",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Ira",
    rating: 5,
    text: "Mein erster Termin bei Joshua war Zufall, da ich akute Schmerzen hatte und schnelle Hilfe vor dem Urlaub brauchte und einfach irgendwo einen Termin gemacht habe. Jetzt hatte ich schon meine dritte Behandlung bei ihm und die Nächste ist geplant. Joshua nimmt sich Zeit für die Anamnese und geht dabei gleichzeitig schnell auf die Problematiken ein. Er strahlt eine unglaubliche Ruhe aus, schafft eine sichere und entspannte Atmosphäre und bietet damit eine individuelle und professionelle Behandlung. Er hat mir sehr geholfen und ich kann es jedem nur empfehlen zu ihm zu gehen!",
    date: "vor 52 Wochen",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "Thomas Wahl-Jepsen",
    rating: 5,
    text: "Vertrauensvolle Atmosphäre, spürbares Interesse an den Baustellen im Körper, aufmerksamer Therapeut. Für mich die beste Mischung, um mit der Behandlung weiterzumachen. Und: Danke nochmals.",
    date: "vor 52 Wochen",
    reviewCount: 9,
    photoCount: 0
  },
  {
    author: "Louis Weisner",
    rating: 5,
    text: "Ich kann Herr Alsen wärmstens weiterempfehlen. Ich bin zu Herr Alsen wegen Hüftbeschwerden gegangen. Nach einer ausführlichen Anamnese begann er direkt mit der Behandlung des Problems und es zeigte sich direkt nach der Behandlung eine deutliche Verbesserung der Beschwerden. Ich habe mich die ganze Zeit gut aufgehoben gefühlt!",
    date: "22.10.2024",
    reviewCount: 6,
    photoCount: 0
  },
  {
    author: "Lars Weiper",
    rating: 5,
    text: "Lieber Herr Alsen, ich möchte mich für den spürbaren Erfolg, bereits nach der ersten Behandlung, bedanken. Meine Lebensqualität hat postwendend zugenommen. Ich freue mich auf die kommenden Sitzungen und empfehle Sie von Herzen gerne weiter.",
    date: "08.10.2024",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Sukie",
    rating: 5,
    text: "Ich kam mit akuten, starken Kopf und Nackenschmerzen. Ich habe zum Glück aufgrund der Schwere meiner Beschwerden kurzfristig und unkompliziert einen Termin bekommen und wurde kompetent von Herrn Alsen beraten. Ich habe mich gut aufgehoben gefühlt und durfte nach der Behandlung schmerzfrei nach Hause gehen. Vielen Dank!",
    date: "28.09.2024",
    reviewCount: 24,
    photoCount: 12,
    isLocalGuide: true
  },
  {
    author: "Stefanie Wichmann",
    rating: 5,
    text: "Bei Josh ist man in sehr guten Händen. Wie es manchmal so kommt, erlitt mich in dieser Woche ein akuter Hexenschuss und an Bewegung war nicht mehr zu denken, jeder Schritt schmerzte und allein der Gedanke an ein aufstehen oder hinsetzen tat schon weh. Josh empfing mich herzlich in der Praxis und lockerte durch seine warme Art sofort die Situation, so dass die folgende Anamnese meiner Vorerkrankungen ein ungezwungenes Gespräch war. Die Behandlung war überraschend angenehm, denn er vermied es zu jeder Zeit, Schmerzspitzen auszulösen und als ich mich nach der Behandlung vorsichtig und ein wenig ängstlich, vor auftretenden Schmerzen, wieder bewegte war ich sehr überrascht und erleichtert, dass ich mir sogar schmerzfrei die Schuhe anziehen konnte. Ich bin Josh dankbar für die sofortige Linderung meiner akuten Beschwerden und für die umfassende Beratung, solche Schmerzen in Zukunft vermeiden zu können.",
    date: "26.09.2024",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Shams 5197",
    rating: 5,
    text: "Hat sehr geholfen, mehr als erwartet. Kam mit allgemeinen beschwerden zum Termin. Nach einem aufschlussreichen Gerspräch und einer Sorgfälltigen behandlung ging es mir wesentlich besser. Vielen Dank",
    date: "23.09.2024",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "Dorotheas Farbklangpoesie",
    rating: 5,
    text: "Herr Alsen untersucht und behandelt sehr gewissenhaft und kompetent und sehr einfühlsam.Wer etwas für sein seelisches und körperliches Wohlbefinden tun möchte,geht zu Herrn Alsen in Behandlung",
    date: "17.09.2024",
    reviewCount: 10,
    photoCount: 0
  },
  {
    author: "Sebastian",
    rating: 5,
    text: "Ich bin wegen Schulterproblemen gekommen und habe die Praxis mit einer direkt spürbaren Verbesserung verlassen. Nach einer kurzen Anamnese hat sich Joshua der Problemzone angenommen und mich sehr professionell und freundlich behandelt. Bei wiederkehrenden Problemen oder anderen Beschwerden würde ich immer wieder kommen und kann eine Behandlung bei Joshua Alsen absolut weiterempfehlen!",
    date: "17.09.2024",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "Iris Kramer",
    rating: 5,
    text: "Ich habe spontan einen Termin bekommen und Herr Alsen hat mich fachlich kompetent behandelt. Meine Beschwerden haben sich verbessert und ich freue mich auf den nächsten Termin bei ihm.",
    date: "15.09.2024",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "AundB R.",
    rating: 5,
    text: "Schon die erste Therapiestunde bei Joshua hat mir sehr gut getan und positive Prozesse in meinem Körper in Gang gesetzt! Ich fühle mich beweglicher und wieder besser im Gleichgewicht. Vielen Dank! Ich freue mich schon jetzt auf die nächste Stunde!",
    date: "13.09.2024",
    reviewCount: 7,
    photoCount: 3
  },
  {
    author: "Lia",
    rating: 5,
    text: "Ich kann jeder Person eine Behandlung von Joshua Alsen von Herzen empfehlen! Er ist sehr einfühlsam und konnte mit seiner Kompetenz schon viele Male meine Beschwerden lindern. Ich fühle mich bei ihm gut aufgehoben! :)",
    date: "12.09.2024",
    reviewCount: 3,
    photoCount: 0
  },
  {
    author: "Aurelia Geiger",
    rating: 5,
    text: "Joshua Alsen behandelte mich nach einer Kieferchirurgischen OP auf die entstandenen Folgen. Er nahm sich Zeit für eine Besprechung meiner Beschwerden, gab mir schon da ein gutes Gefühl. In der Behandlung konnte ich mich fallen lassen und hatte grade als Frau das Gefühl, respektvoll und sehr bedacht angefasst zu werden. Ich wurde währenddessen immer wieder gefragt, wie es mir geht und ob bestimmte Berührungen in Ordnung sind. Nicht selbstverständlich, aber umso willkommener! Nach der Behandlung fühle ich mich ausgeglichener und meine Beschwerden nach der OP sind deutlich zurückgegangen. Ich kann Joshua Alsen wärmstens empfehlen!",
    date: "11.09.2024",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "Erik Tessin",
    rating: 5,
    text: "Ich bin sehr froh, dass ich Josh gefunden habe. Zwar war ich vorher schon vom osteopathischen Konzept überzeugt, aber so eine drastische Veränderung nach jeder Behandlung, das hatte ich nicht erwartet. Von daher kann ich nur jedem empfehlen, der wirklich schnelle Verbesserung erfahren möchte, statt ewig lange zu stagnieren, einfach mal den Osteoalsen auszuprobieren.",
    date: "26.08.2024",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "aL_tonahh TTV",
    rating: 5,
    text: "Ich war mit meiner Behandlung rund um zufrieden. Mein linker Brust/Schulter/Rückenbereich waren schwer entzündet und die Behandlung haben die Schmerzen stark gelindert wofür ich sehr dankbar bin. Die Vorgehensweise war beruhigend und absolut professionell. Würde immer wieder kommen!",
    date: "23.08.2024",
    reviewCount: 6,
    photoCount: 0
  },
  {
    author: "Kaya Kosmos",
    rating: 5,
    text: "Bei Herrn Alsen habe ich mich rund um wohl aufgehoben und professionell behandelt gefühlt. Meine Rückenbeschwerden sind spürbar zurückgegangen. Klare Weiterempfehlung!",
    date: "23.08.2024",
    reviewCount: 3,
    photoCount: 0
  },
  {
    author: "Ba",
    rating: 5,
    text: "Diese Woche hatte ich eine Behandlung bei der Osteopathie Alsen. Herr Alsen nahm sich sehr viel Zeit, stellte Fragen, schaffte es meine Brustwirbel Blockade zu lösen,eine große Erleichterung für mich. Auch der Rest der Behandlung war für mich sehr angenehm. Herr Alsen ist sehr professionell und freundlich. Die Räume sind sehr modern, hell und zentral gelegen. Ich sage Danke, vielen Dank. Für eine tolle Behandlung, dann wieder hier bei Herrn Alsen.",
    date: "17.08.2024",
    reviewCount: 91,
    photoCount: 334,
    isLocalGuide: true
  }
];

export const reviewsStats = {
  totalReviews: 41,
  averageRating: 5.0,
  fiveStars: 41,
  fourStars: 0,
  threeStars: 0,
  twoStars: 0,
  oneStars: 0
};