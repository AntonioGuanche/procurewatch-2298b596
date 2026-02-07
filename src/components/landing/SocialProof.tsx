import { Shield, Globe, Clock } from "lucide-react";

const items = [
  { icon: Shield, text: "Pensé pour artisans & PME" },
  { icon: Globe, text: "Sources BE + UE centralisées" },
  { icon: Clock, text: "Mise en place en 5 minutes" },
];

const SocialProof = () => (
  <section className="py-12 border-y border-border bg-card/60">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        {items.map((item) => (
          <div key={item.text} className="flex items-center gap-3 text-muted-foreground">
            <item.icon size={20} className="text-accent shrink-0" />
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
