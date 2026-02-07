import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Chargement…</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <Link to="/" className="font-display text-xl font-bold text-primary">ProcureWatch</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <button
              onClick={signOut}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 lg:px-8 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">Bienvenue 👋</h1>
        <p className="mt-4 text-muted-foreground">Votre tableau de bord est en cours de construction.</p>
      </main>
    </div>
  );
};

export default Dashboard;
