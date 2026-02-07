import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Qu'est-ce qu'une watchlist ?",
    a: "Une watchlist est un ensemble de critères (mots-clés, secteurs, régions) qui définissent les marchés publics qui vous intéressent. ProcureWatch surveille ces critères en continu et vous alerte dès qu'un nouveau marché correspond.",
  },
  {
    q: "Quelle différence entre les plans ?",
    a: "Le plan Explorer vous donne accès à la recherche avec 1 watchlist. Le plan Pro ajoute jusqu'à 10 watchlists, les notifications email et les résumés IA. Le plan Business offre des fonctionnalités avancées pour les équipes.",
  },
  {
    q: "Puis-je annuler quand je veux ?",
    a: "Oui, vous pouvez annuler votre abonnement à tout moment. Pas d'engagement, pas de frais cachés. Votre accès reste actif jusqu'à la fin de la période facturée.",
  },
  {
    q: "Quelles sources sont couvertes ?",
    a: "ProcureWatch centralise les données de BOSA (plateforme belge des marchés publics) et de TED (Tenders Electronic Daily, la plateforme européenne). D'autres sources nationales sont en cours d'intégration.",
  },
];

const FAQ = () => (
  <section className="py-20 md:py-28 bg-card/60 border-y border-border">
    <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">
        Questions fréquentes
      </h2>
      <Accordion type="single" collapsible className="mt-12">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold text-foreground">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
