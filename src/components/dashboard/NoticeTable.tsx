import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Notice } from "@/types/notices";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";

interface NoticeTableProps {
  notices: Notice[];
  loading: boolean;
  onNoticeClick: (notice: Notice) => void;
}

const NoticeTable = ({ notices, loading, onNoticeClick }: NoticeTableProps) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
        <p className="text-muted-foreground">Chargement des notices…</p>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
        <FileText size={40} className="mx-auto text-muted-foreground/40" />
        <p className="mt-4 text-muted-foreground font-medium">Aucune notice trouvée.</p>
        <p className="mt-1 text-sm text-muted-foreground">Essayez d'autres critères.</p>
      </div>
    );
  }

  const formatDate = (d: string | null) => {
    if (!d) return "—";
    try {
      return format(new Date(d), "dd MMM yyyy", { locale: fr });
    } catch {
      return d;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th className="text-left font-semibold text-foreground px-4 py-3">Titre</th>
            <th className="text-left font-semibold text-foreground px-4 py-3 hidden md:table-cell">Acheteur</th>
            <th className="text-left font-semibold text-foreground px-4 py-3 hidden lg:table-cell">CPV</th>
            <th className="text-left font-semibold text-foreground px-4 py-3">Source</th>
            <th className="text-left font-semibold text-foreground px-4 py-3 hidden md:table-cell">Publication</th>
            <th className="text-left font-semibold text-foreground px-4 py-3 hidden lg:table-cell">Deadline</th>
            <th className="text-right font-semibold text-foreground px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
              <td className="px-4 py-3 max-w-xs">
                <button
                  onClick={() => onNoticeClick(notice)}
                  className="text-left font-medium text-primary hover:underline line-clamp-2"
                >
                  {notice.title}
                </button>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{notice.organisation_names?.FR || notice.organisation_names?.NL || '—'}</td>
              <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell font-mono text-xs">{notice.cpv_main_code}</td>
              <td className="px-4 py-3">
                <Badge
                  variant={notice.source.includes("BOSA") ? "default" : "secondary"}
                  className={notice.source.includes("BOSA") ? "bg-primary text-primary-foreground" : ""}
                >
                  {notice.source}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell whitespace-nowrap">
                {formatDate(notice.publication_date)}
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                {formatDate(notice.deadline)}
              </td>
              <td className="px-4 py-3 text-right">
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors">
                  <Plus size={12} />
                  <span className="hidden sm:inline">Watchlist</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeTable;
