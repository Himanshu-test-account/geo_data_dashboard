import { useEffect, useState } from "react";
import { GeoDashboard } from "./components/GeoDashboard";
import { fetchProjects, getLoggedInUser } from "./services/mockApi";

export default function App() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoggedInUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center">Please sign in</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Geo Data Dashboard</h1>
      </header>
      <GeoDashboard />
    </div>
  );
}
