
import AdminStatsPanel from "./AdminStatsPanel"; 

export const metadata = {
  title: "Dashboard — Admin",
};

export default function AdminDashboard() {
  return (
    <div className="p-8">
   
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your product catalog performance.
        </p>
      </div>
      <AdminStatsPanel />
    </div>
  );
}
