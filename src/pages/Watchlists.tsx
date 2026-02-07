import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { useWatchlists, type Watchlist, type WatchlistInput } from "@/hooks/useWatchlists";
import WatchlistCard from "@/components/watchlists/WatchlistCard";
import WatchlistModal from "@/components/watchlists/WatchlistModal";
import { Button } from "@/components/ui/button";
import { Plus, Eye, User } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Watchlists = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { watchlists, isLoading, create, update, remove } = useWatchlists();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Watchlist | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = (input: WatchlistInput) => {
    if (editing) {
      update.mutate({ id: editing.id, ...input }, { onSuccess: () => { setModalOpen(false); setEditing(null); } });
    } else {
      create.mutate(input, { onSuccess: () => setModalOpen(false) });
    }
  };

  const handleEdit = (w: Watchlist) => { setEditing(w); setModalOpen(true); };
  const handleNew = () => { setEditing(null); setModalOpen(true); };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Chargement…</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          <Link to="/" className="font-display text-xl font-bold text-primary">ProcureWatch</Link>
          <nav className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <Eye className="h-4 w-4" /> Marchés
            </Link>
            <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <User className="h-4 w-4" /> Profil
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <button onClick={signOut} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Déconnexion
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Mes Veilles</h1>
            <p className="mt-1 text-sm text-muted-foreground">Gérez vos veilles et recevez des alertes.</p>
          </div>
          <Button onClick={handleNew} className="gap-2">
            <Plus className="h-4 w-4" /> Nouvelle veille
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : watchlists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Eye className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="text-lg font-medium text-foreground">Aucune veille</p>
            <p className="text-sm text-muted-foreground mt-1">
              Créez votre première veille pour recevoir des alertes
            </p>
            <Button className="mt-6 gap-2" onClick={handleNew}>
              <Plus className="h-4 w-4" /> Créer une veille
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlists.map((w) => (
              <WatchlistCard key={w.id} watchlist={w} onEdit={handleEdit} onDelete={setDeleteId} />
            ))}
          </div>
        )}
      </main>

      <WatchlistModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
        saving={create.isPending || update.isPending}
        initial={editing}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette veille ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La veille et ses paramètres seront définitivement supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { if (deleteId) remove.mutate(deleteId); setDeleteId(null); }}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Watchlists;
