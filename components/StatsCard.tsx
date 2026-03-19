import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;           
  value: string | number; 
  icon: LucideIcon;        
  color?: string;          
  description?: string;    
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  color = "text-indigo-600",
  description,
}: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-300 p-6">
      <div className="flex items-start justify-between">
        <div>
         
          <p className="text-sm font-medium text-gray-500">{label}</p>

         
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
           {description && (
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          )}
        </div>

        <div className={`p-3 rounded-lg bg-gray-50 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
