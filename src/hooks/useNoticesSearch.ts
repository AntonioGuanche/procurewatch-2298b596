import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/config/api";
import type { NoticeFilters, NoticesSearchResponse } from "@/types/notices";

export const useNoticesSearch = (filters: NoticeFilters) => {
  return useQuery<NoticesSearchResponse>({
    queryKey: ["notices", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.q) params.set("q", filters.q);
      if (filters.cpv) params.set("cpv", filters.cpv);
      if (filters.source) params.set("source", filters.source);
      if (filters.date_from) params.set("date_from", filters.date_from);
      if (filters.date_to) params.set("date_to", filters.date_to);
      params.set("page", String(filters.page));

      const res = await fetch(`${API_ENDPOINTS.noticesSearch}?${params.toString()}`);
      if (!res.ok) throw new Error("Erreur lors de la recherche");
      return res.json();
    },
    placeholderData: (prev) => prev,
  });
};
