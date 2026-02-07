import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="font-display text-lg font-bold text-primary">
          ProcureWatch
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Fonctionnalités</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Tarifs</a>
          <Link to="/login" className="hover:text-foreground transition-colors">Connexion</Link>
          <Link to="/register" className="hover:text-foreground transition-colors">Créer un compte</Link>
        </nav>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ProcureWatch. Tous droits réservés.</p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Conditions</a>
          <a href="#" className="hover:text-foreground transition-colors">Confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
