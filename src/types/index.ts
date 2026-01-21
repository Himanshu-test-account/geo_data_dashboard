export interface GeoProject {
  id: string; 
  projectName: string;
  latitude: number;
  longitude: number;
  status: "active" | "pending" | "completed" | "cancelled";
  lastUpdated: number;
  description?: string;
  budget?: number;
  category?: string;
}
