import React from 'react';

const MetricCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend = null }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 h-8 w-8 text-blue-500',
        green: 'bg-green-50 text-green-600 h-8 w-8 text-green-500',
        red: 'bg-red-50 text-red-600 h-8 w-8 text-red-500',
        purple: 'bg-purple-50 text-purple-600 h-8 w-8 text-purple-500',
        yellow: 'bg-yellow-50 text-yellow-600 h-8 w-8 text-yellow-500'
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
                    {subtitle && (
                        <p className={`text-xs ${trend ?
                            trend.includes('+') ? 'text-green-600' :
                                trend.includes('↓') ? 'text-green-600' : 'text-gray-500'
                        } mt-1`}>
                            {subtitle}
                        </p>
                    )}
                </div>
                <Icon className={colorClasses[color]} />
            </div>
        </div>
    );
};

export default MetricCard;