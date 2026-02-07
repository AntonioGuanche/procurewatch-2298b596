import { useState, useEffect, useCallback } from "react";
import type { Watchlist, WatchlistInput } from "@/hooks/useWatchlists";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

const CPV_OPTIONS = [
  { value: "45000000-7", label: "45000000-7 – Construction" },
  { value: "71000000-8", label: "71000000-8 – Services d'architecture et d'ingénierie" },
  { value: "72000000-5", label: "72000000-5 – Services informatiques" },
  { value: "79000000-4", label: "79000000-4 – Services aux entreprises" },
  { value: "33000000-0", label: "33000000-0 – Équipements médicaux" },
  { value: "34000000-7", label: "34000000-7 – Équipements de transport" },
  { value: "48000000-8", label: "48000000-8 – Logiciels" },
  { value: "50000000-5", label: "50000000-5 – Services de réparation" },
  { value: "60000000-8", label: "60000000-8 – Services de transport" },
  { value: "90000000-7", label: "90000000-7 – Services liés à l'environnement" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (input: WatchlistInput) => void;
  saving: boolean;
  initial?: Watchlist | null;
}

export default function WatchlistModal({ open, onClose, onSave, saving, initial }: Props) {
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [kwInput, setKwInput] = useState("");
  const [cpvCodes, setCpvCodes] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [emailNotif, setEmailNotif] = useState(false);

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? "");
      setKeywords(initial?.keywords ?? []);
      setCpvCodes(initial?.cpv_codes ?? []);
      setSources(initial?.sources ?? []);
      setEmailNotif(initial?.email_notifications ?? false);
      setKwInput("");
    }
  }, [open, initial]);

  const addKeyword = useCallback(() => {
    const trimmed = kwInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords((prev) => [...prev, trimmed]);
    }
    setKwInput("");
  }, [kwInput, keywords]);

  const toggleSource = (s: string) =>
    setSources((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const toggleCpv = (code: string) =>
    setCpvCodes((prev) => (prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]));

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), keywords, cpv_codes: cpvCodes, sources, email_notifications: emailNotif });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Modifier la veille" : "Nouvelle veille"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="wl-name">Nom</Label>
            <Input id="wl-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ma veille" />
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label>Mots-clés</Label>
            <div className="flex gap-2">
              <Input
                value={kwInput}
                onChange={(e) => setKwInput(e.target.value)}
                placeholder="Ajouter un mot-clé…"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" variant="secondary" onClick={addKeyword} size="sm">
                Ajouter
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {keywords.map((k) => (
                  <Badge key={k} variant="secondary" className="gap-1">
                    {k}
                    <button onClick={() => setKeywords((p) => p.filter((x) => x !== k))}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* CPV */}
          <div className="space-y-2">
            <Label>Codes CPV</Label>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border border-border rounded-md p-3">
              {CPV_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={cpvCodes.includes(opt.value)}
                    onCheckedChange={() => toggleCpv(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="space-y-2">
            <Label>Sources</Label>
            <div className="flex gap-4">
              {["BOSA", "TED"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={sources.includes(s)} onCheckedChange={() => toggleSource(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>

          {/* Email notifications */}
          <div className="flex items-center justify-between">
            <Label htmlFor="wl-notif">Notifications par e-mail</Label>
            <Switch id="wl-notif" checked={emailNotif} onCheckedChange={setEmailNotif} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit} disabled={saving || !name.trim()}>
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
