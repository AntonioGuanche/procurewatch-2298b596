import { Bell, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Alertes intelligentes",
    desc: "Recevez des notifications pour les marchés qui vous correspondent.",
    emoji: "🔔",
  },
  {
    icon: Globe,
    title: "Multi-sources",
    desc: "BOSA (Belgique) + TED (Europe) centralisés.",
    emoji: "🇧🇪🇪🇺",
  },
  {
    icon: Zap,
    title: "Gain de temps",
    desc: "Économisez 2–3h/jour de veille manuelle.",
    emoji: "⚡",
  },
];

const Features = () => (
  <section id="features" className="py-20 md:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">
        Tout ce qu'il vous faut
      </h2>
      <p className="mt-4 text-center text-muted-foreground max-w-lg mx-auto">
        ProcureWatch centralise la veille marchés publics pour que vous puissiez vous concentrer sur vos offres.
      </p>

      <div className="mt-14 grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-border bg-card p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300"
          >
            <span className="text-3xl">{f.emoji}</span>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
