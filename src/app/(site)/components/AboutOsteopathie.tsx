import Image from "next/image";

const benefits = [
    { title: "Schmerzlinderung", icon: "pain" },
    { title: "Lösen von Blockaden", icon: "wave" },
    { title: "Verbesserte Zirkulation", icon: "flow" },
    { title: "Ganzheitliche Gesundheitsoptimierung", icon: "target" },
];

export default function AboutOsteopathie() {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
                    <div>
                        <p className="uppercase tracking-wider text-slate-500 font-medium">Mein Name ist Joshua Alsen</p>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">Was ist Osteopathie?</h2>
                        <p className="mt-4 text-slate-700 leading-7">
                            Osteopathie ist eine eigenständige Form der Medizin, die auf der grundlegenden Überzeugung basiert,
                            dass alle Teile des Organismus in einer wechselseitigen Beziehung zueinander stehen. In meiner Praxis in
                            Hamburg Mitte nutze ich osteopathische Techniken, um die Harmonie von Struktur und Funktion des Körpers zu
                            fördern, die Zirkulation zu verbessern und Barrieren für die Selbstregulation zu beseitigen.
                        </p>
                        <div className="mt-6 grid gap-4">
                            {benefits.map((b) => (
                                <div key={b.title} className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-slate-900 text-white grid place-items-center text-xs">★</div>
                                    <span className="text-slate-900 text-lg font-medium">{b.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-[480px] md:h-[640px] overflow-hidden rounded-xl">
                        <Image src="/assets/joshua-alsen-profil.jpg" alt="Joshua Alsen Profilfoto" fill className="object-cover" priority />
                    </div>
                </div>
            </div>
        </section>
    );
}
