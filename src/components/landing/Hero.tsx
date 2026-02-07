import { Link } from "react-router-dom";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const Hero = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="max-w-xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-tight tracking-tight text-foreground">
              Ne ratez plus aucun{" "}
              <span className="text-gradient-hero">marché public</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Recevez des alertes personnalisées pour les marchés publics belges et européens.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
              >
                Démarrer gratuitement
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-secondary transition-colors"
              >
                Voir une démo
              </a>
            </div>
          </div>

          {/* Mockup */}
          <div className="relative">
            <div className="rounded-xl border border-border shadow-card-hover overflow-hidden bg-card">
              <img
                src={dashboardMockup}
                alt="Aperçu du tableau de bord ProcureWatch avec filtres et watchlists"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
            {/* Glow behind mockup */}
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-accent/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
