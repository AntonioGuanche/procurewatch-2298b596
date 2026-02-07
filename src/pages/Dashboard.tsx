import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { useNoticesSearch } from "@/hooks/useNoticesSearch";
import type { NoticeFilters, Notice } from "@/types/notices";
import FilterBar from "@/components/dashboard/FilterBar";
import NoticeTable from "@/components/dashboard/NoticeTable";
import NoticeDetailModal from "@/components/dashboard/NoticeDetailModal";
import Pagination from "@/components/dashboard/Pagination";

const DEFAULT_FILTERS: NoticeFilters = {
  q: "",
  cpv: "",
  source: "",
  date_from: "",
  date_to: "",
  page: 1,
};

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [filters, setFilters] = useState<NoticeFilters>(DEFAULT_FILTERS);
  const [activeFilters, setActiveFilters] = useState<NoticeFilters>(DEFAULT_FILTERS);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const { data, isLoading } = useNoticesSearch(activeFilters);

  const handleFilterChange = useCallback((partial: Partial<NoticeFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial, page: 1 }));
  }, []);

  const handleSearch = useCallback(() => {
    setActiveFilters({ ...filters, page: 1 });
  }, [filters]);

  const handlePageChange = useCallback((page: number) => {
    const updated = { ...activeFilters, page };
    setActiveFilters(updated);
    setFilters(updated);
  }, [activeFilters]);

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
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4">
              <Link to="/watchlists" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <Eye className="h-4 w-4" /> Mes Veilles
              </Link>
            </nav>
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <button
              onClick={signOut}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-6 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Marchés publics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Recherchez et filtrez les avis de marchés publics.</p>
        </div>

        <FilterBar filters={filters} onChange={handleFilterChange} onSearch={handleSearch} />

        <NoticeTable
          notices={data?.results ?? []}
          loading={isLoading}
          onNoticeClick={setSelectedNotice}
        />

        {data && (
          <Pagination
            page={activeFilters.page}
            total={data.total}
            pageSize={data.page_size}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <NoticeDetailModal
        notice={selectedNotice}
        open={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </div>
  );
};

export default Dashboard;
