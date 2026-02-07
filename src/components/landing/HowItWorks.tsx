const steps = [
  { num: "1", title: "Créez une watchlist", desc: "Définissez vos critères : mots-clés, secteur, région." },
  { num: "2", title: "ProcureWatch surveille", desc: "Nos algorithmes scannent BOSA et TED en continu." },
  { num: "3", title: "Recevez vos alertes & résumés", desc: "Par email ou dans l'app, avec un résumé IA." },
];

const HowItWorks = () => (
  <section id="demo" className="py-20 md:py-28 bg-card/60 border-y border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">
        Comment ça marche ?
      </h2>
      <div className="mt-14 grid md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gradient-accent text-accent-foreground font-display font-bold text-lg">
              {s.num}
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
