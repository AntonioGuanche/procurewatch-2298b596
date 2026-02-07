export interface Notice {
  id: string;
  title: string;
  buyer: string;
  cpv_code: string;
  source: "BOSA" | "TED";
  publication_date: string;
  deadline: string | null;
}

export interface NoticesSearchResponse {
  results: Notice[];
  total: number;
  page: number;
  page_size: number;
}

export interface NoticeFilters {
  q: string;
  cpv: string;
  source: string;
  date_from: string;
  date_to: string;
  page: number;
}

export const CPV_OPTIONS = [
  { value: "", label: "Tous les CPV" },
  { value: "45000000-7", label: "45000000-7 — Construction" },
  { value: "71000000-8", label: "71000000-8 — Services d'architecture et d'ingénierie" },
  { value: "72000000-5", label: "72000000-5 — Services informatiques" },
  { value: "79000000-4", label: "79000000-4 — Services aux entreprises" },
  { value: "33000000-0", label: "33000000-0 — Équipements médicaux" },
  { value: "34000000-7", label: "34000000-7 — Équipements de transport" },
  { value: "44000000-0", label: "44000000-0 — Matériaux de construction" },
  { value: "50000000-5", label: "50000000-5 — Services de réparation et d'entretien" },
] as const;

export const SOURCE_OPTIONS = [
  { value: "BOSA", label: "BOSA" },
  { value: "TED", label: "TED" },
] as const;
