import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: "Gratuit",
    features: [
      "Accès à la base & recherche",
      "1 watchlist",
      "Résultats dans l'app (sans email)",
      "Historique 7 jours",
    ],
    cta: "Démarrer gratuitement",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "29€",
    period: "/mois",
    badge: "Le plus populaire",
    features: [
      "Jusqu'à 10 watchlists",
      "Notifications email (instant + digest)",
      "AI summary : résumé + points clés",
      "Historique 90 jours",
    ],
    cta: "Passer en Pro",
    href: "/register?plan=pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: "Sur devis",
    features: [
      "Watchlists illimitées",
      "Multi-utilisateurs + rôles",
      "Intégrations (Slack/Teams/CRM) + exports avancés",
      "Onboarding & support prioritaire",
    ],
    cta: "Nous contacter",
    href: "/contact",
    highlighted: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="py-20 md:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">
        Des tarifs simples et transparents
      </h2>
      <p className="mt-4 text-center text-muted-foreground max-w-md mx-auto">
        Commencez gratuitement, évoluez quand vous êtes prêt.
      </p>

      <div className="mt-14 grid md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl border p-8 flex flex-col ${
              plan.highlighted
                ? "border-accent shadow-pricing bg-card scale-[1.02]"
                : "border-border shadow-card bg-card"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
                {plan.badge}
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-4xl font-extrabold text-foreground">{plan.price}</span>
              {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
            </div>

            <ul className="mt-8 space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to={plan.href}
              className={`mt-8 block w-full text-center rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
                plan.highlighted
                  ? "bg-gradient-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
