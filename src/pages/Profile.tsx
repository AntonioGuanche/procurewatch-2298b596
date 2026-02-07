import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, LayoutList, Save, Trash2, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const [fullName, setFullName] = useState("");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [frequency, setFrequency] = useState("daily");

  // Sync profile data when loaded
  const [synced, setSynced] = useState(false);
  if (profile && !synced) {
    setFullName(profile.full_name ?? "");
    setSynced(true);
  }

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: name })
        .eq("user_id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({ title: "Profil mis à jour", description: "Vos informations ont été sauvegardées." });
    },
    onError: () => {
      toast({ title: "Erreur", description: "Impossible de mettre à jour le profil.", variant: "destructive" });
    },
  });

  // Delete account
  const handleDeleteAccount = async () => {
    try {
      await supabase.auth.signOut();
      toast({ title: "Compte supprimé", description: "Votre compte a été supprimé." });
    } catch {
      toast({ title: "Erreur", description: "Impossible de supprimer le compte.", variant: "destructive" });
    }
  };

  if (authLoading || profileLoading) {
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
            <Link to="/watchlists" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <LayoutList className="h-4 w-4" /> Veilles
            </Link>
            <button onClick={signOut} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Déconnexion
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-6 space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Mon Profil</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gérez vos informations et préférences.</p>
        </div>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations du compte</CardTitle>
            <CardDescription>Vos données personnelles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email ?? ""} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Votre nom"
              />
            </div>
            <Button
              onClick={() => updateProfile.mutate(fullName)}
              disabled={updateProfile.isPending}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {updateProfile.isPending ? "Sauvegarde…" : "Sauvegarder"}
            </Button>
          </CardContent>
        </Card>

        {/* Email Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Préférences email</CardTitle>
            <CardDescription>Configurez vos notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Recevoir les alertes email</Label>
                <p className="text-sm text-muted-foreground">Notifications pour les nouvelles correspondances</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
            <div className="space-y-2">
              <Label>Fréquence</Label>
              <Select value={frequency} onValueChange={setFrequency} disabled={!emailAlerts}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Temps réel</SelectItem>
                  <SelectItem value="daily">Quotidien</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() =>
                toast({ title: "Préférences sauvegardées", description: "Vos préférences email ont été mises à jour." })
              }
            >
              <Save className="h-4 w-4" /> Sauvegarder
            </Button>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Abonnement</CardTitle>
            <CardDescription>Votre plan actuel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Plan Gratuit</p>
                <p className="text-sm text-muted-foreground">1 veille incluse</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                Actif
              </span>
            </div>
            <Button variant="outline" disabled className="gap-2 opacity-60">
              <Crown className="h-4 w-4" /> Passer à Pro — Bientôt disponible
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-lg text-destructive">Zone de danger</CardTitle>
            <CardDescription>Actions irréversibles sur votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" /> Supprimer mon compte
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer votre compte ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Toutes vos données, veilles et préférences seront définitivement supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleDeleteAccount}
                  >
                    Supprimer définitivement
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
