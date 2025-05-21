
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color = 'blue', description, isTime = false }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-500',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-700',
      iconBg: 'bg-blue-100',
    },
    green: {
      bg: 'bg-green-500',
      text: 'text-green-500',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-700',
      iconBg: 'bg-green-100',
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-500',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-700',
      iconBg: 'bg-purple-100',
    },
    amber: {
      bg: 'bg-amber-500',
      text: 'text-amber-500',
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-amber-600',
      iconBg: 'bg-amber-100',
    },
    indigo: {
      bg: 'bg-indigo-500',
      text: 'text-indigo-500',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-indigo-700',
      iconBg: 'bg-indigo-100',
    },
    sky: {
      bg: 'bg-sky-500',
      text: 'text-sky-500',
      gradientFrom: 'from-sky-500',
      gradientTo: 'to-sky-700',
      iconBg: 'bg-sky-100',
    },
    teal: {
      bg: 'bg-teal-500',
      text: 'text-teal-500',
      gradientFrom: 'from-teal-500',
      gradientTo: 'to-teal-700',
      iconBg: 'bg-teal-100',
    },
    emerald: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-500',
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-emerald-700',
      iconBg: 'bg-emerald-100',
    },
    cyan: {
      bg: 'bg-cyan-500',
      text: 'text-cyan-500',
      gradientFrom: 'from-cyan-500',
      gradientTo: 'to-cyan-700',
      iconBg: 'bg-cyan-100',
    },
    lime: {
      bg: 'bg-lime-500',
      text: 'text-lime-500',
      gradientFrom: 'from-lime-500',
      gradientTo: 'to-lime-700',
      iconBg: 'bg-lime-100',
    },
    default: { // Fallback color
      bg: 'bg-gray-500',
      text: 'text-gray-500',
      gradientFrom: 'from-gray-500',
      gradientTo: 'to-gray-700',
      iconBg: 'bg-gray-100',
    }
  };

  const selectedColor = colorClasses[color] || colorClasses.default;

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${selectedColor.text.replace('text-', 'border-')}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50 dark:bg-slate-800/50">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</CardTitle>
          <div className={`p-2 rounded-full ${selectedColor.iconBg}`}>
            {React.cloneElement(icon, { className: `h-5 w-5 ${selectedColor.text}` })}
          </div>
        </CardHeader>
        <CardContent className="bg-white dark:bg-slate-900">
          <div className={`text-2xl font-bold ${selectedColor.text}`}>{value}</div>
          {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
          {isTime && value !== 'N/A' && value !== 'No data' && (
             <p className="text-xs text-muted-foreground pt-1">
               {new Date(value).toLocaleDateString() === new Date().toLocaleDateString() 
                 ? `Today, ${new Date(value).toLocaleTimeString()}` 
                 : new Date(value).toLocaleString()}
             </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
