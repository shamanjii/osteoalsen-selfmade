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
    author: "Catrin Hasse",
    rating: 5,
    text: "",
    date: "vor 20 Stunden",
    reviewCount: 0,
    photoCount: 0
  },
  {
    author: "Christoph Graf",
    rating: 5,
    text: "Joshua ist super kompetent und freundlich. Fühlte mich richtig gut aufgehoben und unsere Termine haben mir sehr geholfen 🫶",
    date: "vor 9 Wochen",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Kai Schneider",
    rating: 5,
    text: "Ich kam mit sehr starken Schmerzen in Arm und Schulter und verließ die Praxis an diesem Tag schmerzfrei. Joshua stellt die richtigen Fragen, hört ganz genau zu und setzt dies dann in seiner Behandlung um. Er nimmt sich wirklich Zeit für seine Patienten und es wird nicht nur das offensichtliche Problem behandelt, sondern der Mensch als Ganzes betrachtet. Ich habe gespürt, wie nicht nur körperliche Blockaden gelöst wurden, sondern auch festgehaltene Emotionen sich befreien konnten. Das war eine völlig neue und unglaublich befreiende Erfahrung. Ich bin unendlich dankbar für die professionelle Hilfe und die einfühlsame Betreuung. Wer einen Osteopathen sucht, der nicht nur Symptome bekämpft, sondern wirklich an der Wurzel des Problems ansetzt und dabei noch äußerst empathisch ist, ist hier richtig! Vielen Dank, Joshua!",
    date: "vor 14 Wochen",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Theresa Behrendt",
    rating: 5,
    text: "Joshua ist ein sehr netter und einfühlsamer Osteopath. Das war meine erste osteopathische Behandlung und ich habe mich sofort sehr wohl gefühlt. Meine Knieschmerzen waren direkt nach der ersten Behandlung viel besser und ich habe mich allgemein deutlich ausgeglichener gefühlt.",
    date: "vor 15 Wochen",
    reviewCount: 4,
    photoCount: 0
  },
  {
    author: "Evgeniya Englert",
    rating: 5,
    text: "Ich hatte nach einem Lumbago erhebliche Beschwerden, die mich stark einschränkten. Nach der Behandlung bei Joshua Alsen sind diese Schmerzen verschwunden – ein unglaubliches Gefühl! Joshua nimmt sich wirklich viel Zeit für seine Patienten und hört genau zu, was man spürt. Seine Herangehensweise ist ganzheitlich, sodass er nicht nur die direkten Schmerzpunkte behandelt, sondern auch indirekte Ursachen auflöst. Ich bin beeindruckt von seiner Fachkompetenz und dem Erfolg seiner Behandlung. Er ist ein wahrer Meister seines Faches, den ich uneingeschränkt weiterempfehlen kann. Vielen Dank, Joshua, für diese hervorragende Arbeit!",
    date: "vor 16 Wochen",
    reviewCount: 13,
    photoCount: 1,
    isLocalGuide: true
  },
  {
    author: "Yusuf Verus",
    rating: 5,
    text: "Ich möchte es kurz halten, den ihr müsst es selber erleben. Kompetenz und Empathie, so stellt man sich einen guten Heilpraktiker vor, und Das besitzt Joshua ohne Zweifel. Meine Rückenschmerzen wurden gelindert, geh bald wegen meine Schulter hin. Geht hin, ihr werdet nicht enttäuscht!",
    date: "vor 17 Wochen",
    reviewCount: 2,
    photoCount: 0
  },
  {
    author: "Ines Virde",
    rating: 5,
    text: "Meine erste Behandlung bei Joshua und ich kann berichten: es war sehr gut, nach einer Stunde konnte ich schmerzfrei die Praxis verlassen. Dazu noch kompetent, nett und hat alle Fragen beantwortet. Absolut zu empfehlen.",
    date: "vor 17 Wochen",
    reviewCount: 10,
    photoCount: 0,
    isLocalGuide: true
  },
  {
    author: "Will Burgess",
    rating: 5,
    text: "Joshua Alsen is the best! After visiting multiple osteopaths regarding my shin splints, Joshua is the only one who could provide lasting relief. His approach is thorough and professional.",
    date: "vor 17 Wochen",
    reviewCount: 6,
    photoCount: 0
  },
  {
    author: "Shayan",
    rating: 5,
    text: "Sehr kompetenter und einfühlsamer Osteopath. Die Behandlung ist professionell, individuell abgestimmt und findet in einer angenehmen Atmosphäre statt. Absolut empfehlenswert!",
    date: "vor 21 Wochen",
    reviewCount: 7,
    photoCount: 0
  },
  {
    author: "Silvia Gouverneur",
    rating: 5,
    text: "I feel so grateful. I was desperately looking for help because of a very bad pain in my back and neck and rigidity since a few days (I have a 16m baby and carrying her and breastfeeding and having bad night-sleep does not help) and as I'm not from Hamburg I didn't know were to go, so I chose the closest one from me. I'm glad I found Joshua. He was so kind, respectful, caring and listened to everything I had to say. I could feel he really cared about helping out and he was very exhaustive about finding out what was happening. As everything that is done from the heart, it worked. Right after the session I immediately felt relieved. Today, two days after, I feel nothing on my back and like 5% of what I felt in my neck. I'm always fascinated about this discipline. It feels almost magical, but I know it's only body knowledge. So please give yourself the gift of going to Joshua's consultation when you need it. Thank you very much, Joshua!",
    date: "vor 28 Wochen",
    reviewCount: 43,
    photoCount: 4
  },
  {
    author: "David Kampmann",
    rating: 5,
    text: "Ich bin Herrn Alsen unglaublich dankbar! Nachdem ich mit starken Verspannungen und akuten Kopfschmerzen zu kämpfen hatte, konnte er mir kurzfristig und unkompliziert einen Termin ermöglichen. Da ich vorher keine Erfahrungen mit Osteopathie hatte, war ich anfangs unsicher, ob diese Behandlung überhaupt helfen würde. Doch meine Skepsis war völlig unbegründet: Herr Alsen arbeitet äußerst einfühlsam, sanft und präzise. Schon direkt nach der ersten Behandlung habe ich eine deutliche Erleichterung gespürt. Ich habe mich rundum gut betreut gefühlt und kann Herrn Alsen aus voller Überzeugung weiterempfehlen. Ein echter Glücksgriff!",
    date: "vor 37 Wochen",
    reviewCount: 1,
    photoCount: 0
  },
  {
    author: "Aurelia Geiger",
    rating: 5,
    text: "Joshua Alsen behandelte mich nach einer Kieferchirurgischen OP auf die entstandenen Folgen. Er nahm sich Zeit für eine Besprechung meiner Beschwerden, gab mir schon da ein gutes Gefühl. In der Behandlung konnte ich mich fallen lassen und hatte grade als Frau das Gefühl, respektvoll und sehr bedacht angefasst zu werden. Ich wurde währenddessen immer wieder gefragt, wie es mir geht und ob bestimmte Berührungen in Ordnung sind. Nicht selbstverständlich, aber umso willkommener! Nach der Behandlung fühle ich mich ausgeglichener und meine Beschwerden nach der OP sind deutlich zurückgegangen. Ich kann Joshua Alsen wärmstens empfehlen!",
    date: "11.09.2024",
    reviewCount: 2,
    photoCount: 0
  }
];

export const reviewsStats = {
  totalReviews: 42,
  averageRating: 5.0,
  fiveStars: 42,
  fourStars: 0,
  threeStars: 0,
  twoStars: 0,
  oneStars: 0
};