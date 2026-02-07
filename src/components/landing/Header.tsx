import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Connexion", href: "/login" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 backdrop-blur-lg shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="font-display text-xl font-bold text-primary tracking-tight">
          ProcureWatch
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.href.startsWith("#") ? (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            )
          )}
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            Démarrer gratuitement
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-6 pt-2 space-y-3 animate-fade-up">
          {navLinks.map((l) =>
            l.href.startsWith("#") ? (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground"
              >
                {l.label}
              </Link>
            )
          )}
          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center rounded-lg bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            Démarrer gratuitement
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
