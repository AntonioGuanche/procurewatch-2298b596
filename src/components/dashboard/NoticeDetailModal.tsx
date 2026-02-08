import type { Notice } from "@/types/notices";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface NoticeDetailModalProps {
  notice: Notice | null;
  open: boolean;
  onClose: () => void;
}

const formatDate = (d: string | null) => {
  if (!d) return "—";
  try {
    return format(new Date(d), "dd MMMM yyyy", { locale: fr });
  } catch {
    return d;
  }
};

const NoticeDetailModal = ({ notice, open, onClose }: NoticeDetailModalProps) => {
  if (!notice) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-lg leading-snug">{notice.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Acheteur</p>
              <p className="font-medium text-foreground">{notice.organisation_names?.FR || notice.organisation_names?.NL || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Source</p>
              <Badge variant={notice.source.includes("BOSA") ? "default" : "secondary"}>
                {notice.source}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Code CPV</p>
              <p className="font-mono text-foreground">{notice.cpv_main_code}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Publication</p>
              <p className="text-foreground">{formatDate(notice.publication_date)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Deadline</p>
              <p className="text-foreground">{formatDate(notice.deadline)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeDetailModal;
