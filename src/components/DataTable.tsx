import React, { useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown, MapPin } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { GeoProject } from '../types';

interface DataTableProps {
  projects: GeoProject[];
  selectedProject: GeoProject | null;
  onProjectSelect: (project: GeoProject) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (column: string) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

const TableRow: React.FC<{
  project: GeoProject;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ project, isSelected, onSelect }) => {
  return (
    <div
      className={`flex items-center px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors hover:bg-blue-50 ${
        isSelected ? 'bg-blue-100 border-blue-200' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="font-medium text-gray-900 truncate">{project.projectName}</div>
        <div className="text-sm text-gray-500 truncate">{project.category}</div>
      </div>
      
      <div className="w-24 text-center">
        <StatusBadge status={project.status} />
      </div>
      
      <div className="w-32 text-sm text-gray-600 text-center">
        {new Date(project.lastUpdated).toLocaleDateString()}
      </div>
      
      <div className="w-32 text-sm text-gray-600 text-center">
        <div className="flex items-center justify-center space-x-1">
          <MapPin className="w-3 h-3" />
          <span>{project.latitude.toFixed(3)}, {project.longitude.toFixed(3)}</span>
        </div>
      </div>
      
      <div className="w-24 text-sm text-gray-600 text-right">
        ${(project.budget || 0).toLocaleString()}
      </div>
    </div>
  );
};

export const DataTable: React.FC<DataTableProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
  sortBy,
  sortOrder,
  onSort,
  hasMore,
  onLoadMore,
  isLoading,
}) => {
  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Table Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={() => onSort('projectName')}
            className="flex-1 flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-gray-900 pr-4"
          >
            <span>Project Name</span>
            <SortIcon column="projectName" />
          </button>
          
          <button
            onClick={() => onSort('status')}
            className="w-24 flex items-center justify-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
          >
            <span>Status</span>
            <SortIcon column="status" />
          </button>
          
          <button
            onClick={() => onSort('lastUpdated')}
            className="w-32 flex items-center justify-center space-x-1 font-medium text-gray-700 hover:text-gray-900"
          >
            <span>Last Updated</span>
            <SortIcon column="lastUpdated" />
          </button>
          
          <div className="w-32 text-center font-medium text-gray-700">
            Location
          </div>
          
          <button
            onClick={() => onSort('budget')}
            className="w-24 flex items-center justify-end space-x-1 font-medium text-gray-700 hover:text-gray-900"
          >
            <span>Budget</span>
            <SortIcon column="budget" />
          </button>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {projects.map((project) => (
          <TableRow
            key={project._id}
            project={project}
            isSelected={selectedProject?._id === project._id}
            onSelect={() => onProjectSelect(project)}
          />
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {/* Load more button */}
      {hasMore && !isLoading && (
        <div className="p-4 text-center border-t border-gray-200">
          <button
            onClick={onLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
