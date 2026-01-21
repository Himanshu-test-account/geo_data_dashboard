import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { StatusBadge } from './StatusBadge';
import type { GeoProject } from '../types';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  projects: GeoProject[];
  selectedProject: GeoProject | null;
  onProjectSelect: (project: GeoProject) => void;
}

// Custom marker icons for different statuses
const createCustomIcon = (status: string) => {
  const colors = {
    active: '#10b981',
    pending: '#f59e0b',
    completed: '#3b82f6',
    cancelled: '#ef4444',
  };

  return L.divIcon({
    html: `<div style="background-color: ${colors[status as keyof typeof colors] || '#6b7280'}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
    className: 'custom-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const selectedIcon = L.divIcon({
  html: '<div style="background-color: #dc2626; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>',
  className: 'selected-marker',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

// Component to handle map updates when selection changes
const MapController: React.FC<{ selectedProject: GeoProject | null }> = ({ selectedProject }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedProject) {
      map.setView([selectedProject.latitude, selectedProject.longitude], 12, {
        animate: true,
        duration: 0.5,
      });
    }
  }, [selectedProject, map]);

  return null;
};

export const MapView: React.FC<MapViewProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
}) => {
  const [mapReady, setMapReady] = useState(false);

  return (
    <div className="h-full relative">
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-gray-900 mb-2">Map Legend</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Cancelled</span>
          </div>
        </div>
      </div>

      <MapContainer
        center={[39.8283, -98.5795] as [number, number]} // Center of US
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController selectedProject={selectedProject} />
        
        <MarkerClusterGroup chunkedLoading>
          {projects.map((project) => (
            <Marker
              key={project._id}
              position={[project.latitude, project.longitude] as [number, number]}
              icon={selectedProject?._id === project._id ? selectedIcon : createCustomIcon(project.status)}
              eventHandlers={{
                click: () => onProjectSelect(project),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h4 className="font-semibold text-gray-900 mb-2">{project.projectName}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status:</span>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{project.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-medium">${(project.budget || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Updated:</span>
                      <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
          }
        }
      `}</style>
    </div>
  );
};
