import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { DataTable } from './DataTable';
import { MapView } from './MapView';
import { DashboardHeader } from './DashboardHeader';
import { LoadingSkeleton } from './LoadingSkeleton';
import type { GeoProject } from '../types';
import { fetchProjects } from '../services/mockApi';

export const GeoDashboard: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<GeoProject | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<'all' | 'active' | 'pending' | 'completed' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<keyof GeoProject>('lastUpdated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [projects, setProjects] = useState<GeoProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 50;

  // ✅ Fetch projects from mock API (frontend-only)
  useEffect(() => {
    setLoading(true);
    fetchProjects().then((data) => {
      setProjects(data as GeoProject[]);
      setLoading(false);
    });
  }, []);

  // Filtered + sorted + paginated projects
  const displayedProjects = useMemo(() => {
    let filtered = [...projects];

    if (search) {
      filtered = filtered.filter((p) =>
        p.projectName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal === bVal) return 0;

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Pagination
    const start = 0;
    const end = page * pageSize;
    return filtered.slice(start, end);
  }, [projects, search, statusFilter, sortBy, sortOrder, page]);

  const hasMore = useMemo(() => {
    return displayedProjects.length < projects.length;
  }, [displayedProjects.length, projects.length]);

  const handleProjectSelect = useCallback((project: GeoProject) => {
    setSelectedProject(project);
  }, []);

  const handleSort = useCallback(
    (column: keyof GeoProject) => {
      if (sortBy === column) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    },
    [sortBy]
  );

  const handleSearch = useCallback((value: string) => setSearch(value), []);
  const handleStatusFilter = useCallback(
    (status: typeof statusFilter) => setStatusFilter(status),
    []
  );
  const loadMore = useCallback(() => setPage((prev) => prev + 1), []);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DashboardHeader
        search={search}
        onSearchChange={handleSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilter}
        totalProjects={projects.length}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-200 bg-white">
          <DataTable
            projects={displayedProjects}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelect}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            hasMore={hasMore}
            onLoadMore={loadMore}
            isLoading={loading}
          />
        </div>

        <div className="w-1/2 bg-gray-100">
          <MapView
            projects={displayedProjects}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelect}
          />
        </div>
      </div>
    </div>
  );
};
