import type { Watchlist } from "@/hooks/useWatchlists";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Bell, BellOff } from "lucide-react";

interface Props {
  watchlist: Watchlist;
  onEdit: (w: Watchlist) => void;
  onDelete: (id: string) => void;
}

const sourceColor = (s: string) =>
  s === "BOSA" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground";

export default function WatchlistCard({ watchlist, onEdit, onDelete }: Props) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="space-y-1 min-w-0">
          <CardTitle className="text-lg truncate">{watchlist.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {watchlist.matches_count} marchés trouvés
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {watchlist.email_notifications ? (
            <Bell className="h-4 w-4 text-accent" />
          ) : (
            <BellOff className="h-4 w-4 text-muted-foreground" />
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(watchlist)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(watchlist.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {watchlist.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {watchlist.keywords.map((k) => (
              <Badge key={k} variant="secondary" className="text-xs">{k}</Badge>
            ))}
          </div>
        )}
        {watchlist.cpv_codes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {watchlist.cpv_codes.map((c) => (
              <Badge key={c} variant="outline" className="text-xs font-mono">{c}</Badge>
            ))}
          </div>
        )}
        {watchlist.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {watchlist.sources.map((s) => (
              <Badge key={s} className={`text-xs ${sourceColor(s)}`}>{s}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
