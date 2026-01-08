import React from 'react';

const RiskItem = ({ item, onView, onEdit, onIgnore }) => {
    const getRiskColor = (level) => {
        switch (level) {
            case '高风险':
                return 'bg-red-100 text-red-800';
            case '中风险':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-green-100 text-green-800';
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'bg-red-500';
        if (score >= 60) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.level === '高风险' ? 'bg-red-500' :
                        item.level === '中风险' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                <div>
                    <p className="font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-600">
                        {item.issue.length > 30 ? item.issue.substring(0, 30) + '...' : item.issue}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-sm font-medium ${getRiskColor(item.level).replace('bg-', 'text-').replace('-100', '-600')}`}>
                    {item.level}
                </p>
                <p className="text-xs text-gray-500">分数: {item.score}</p>
            </div>
        </div>
    );
};

export default RiskItem;