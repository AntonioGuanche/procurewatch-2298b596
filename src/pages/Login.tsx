import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center font-display text-2xl font-bold text-primary mb-8">
          ProcureWatch
        </Link>

        <div className="rounded-xl border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-xl font-bold text-foreground text-center">Connexion</h1>

          {error && (
            <p className="mt-4 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">Mot de passe</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Pas de compte ?{" "}
            <Link to="/register" className="font-medium text-accent hover:underline">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
