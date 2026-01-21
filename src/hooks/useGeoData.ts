import { useState, useCallback, useMemo } from 'react';
import type { GeoProject } from '../types';

export const useGeoData = (projects: GeoProject[]) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<keyof GeoProject>('lastUpdated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(project =>
        project.projectName.toLowerCase().includes(searchLower) ||
        project.category?.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [projects, search, statusFilter, sortBy, sortOrder]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
  }, []);

  const handleSort = useCallback((column: keyof GeoProject) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  }, [sortBy]);

  return {
    filteredProjects: filteredAndSortedProjects,
    search,
    statusFilter,
    sortBy,
    sortOrder,
    handleSearch,
    handleStatusFilter,
    handleSort,
  };
};
