import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export interface Watchlist {
  id: string;
  user_id: string;
  name: string;
  keywords: string[];
  cpv_codes: string[];
  sources: string[];
  email_notifications: boolean;
  matches_count: number;
  created_at: string;
  updated_at: string;
}

export type WatchlistInput = Pick<Watchlist, "name" | "keywords" | "cpv_codes" | "sources" | "email_notifications">;

export function useWatchlists() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const key = ["watchlists"];

  const query = useQuery<Watchlist[]>({
    queryKey: key,
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("watchlists")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Watchlist[];
    },
  });

  const create = useMutation({
    mutationFn: async (input: WatchlistInput) => {
      const { error } = await supabase.from("watchlists").insert({
        ...input,
        user_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key });
      toast({ title: "Veille créée avec succès" });
    },
    onError: () => toast({ title: "Erreur lors de la création", variant: "destructive" }),
  });

  const update = useMutation({
    mutationFn: async ({ id, ...input }: WatchlistInput & { id: string }) => {
      const { error } = await supabase.from("watchlists").update(input).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key });
      toast({ title: "Veille mise à jour" });
    },
    onError: () => toast({ title: "Erreur lors de la mise à jour", variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("watchlists").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key });
      toast({ title: "Veille supprimée" });
    },
    onError: () => toast({ title: "Erreur lors de la suppression", variant: "destructive" }),
  });

  return { watchlists: query.data ?? [], isLoading: query.isLoading, create, update, remove };
}
