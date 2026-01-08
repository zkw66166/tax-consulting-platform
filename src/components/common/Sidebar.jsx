import React from 'react';
import { Home, Building, Search, AlertTriangle, TrendingUp, Database, FileText, Settings, Users, BarChart3, PieChart } from 'lucide-react';

const iconMap = {
    Home,
    Building,
    Search,
    AlertTriangle,
    TrendingUp,
    Database,
    FileText,
    Settings,
    Users,
    BarChart3,
    PieChart
};

const Sidebar = ({ activeTab, setActiveTab, sidebarItems, userType, setSelectedModule, setSelectedCompanies }) => {
    const handleTabClick = (itemId) => {
        setActiveTab(itemId);
        // 重置选择状态
        if (setSelectedModule) setSelectedModule('');
        if (setSelectedCompanies) setSelectedCompanies([]);
    };

    return (
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
            <nav className="p-4">
                <div className="space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = iconMap[item.icon];
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${activeTab === item.id
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 侧边栏底部信息 */}
                <div className="mt-8 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">系统版本</div>
                    <div className="text-sm font-medium text-gray-900">v3.2.0</div>
                    <div className="text-xs text-gray-500 mt-2">
                        最后更新: 2025-12-28
                    </div>
                    {userType && (
                        <div className="text-xs text-gray-500 mt-1">
                            用户类型: {userType === 'enterprise' ? '企业用户' :
                                userType === 'accounting' ? '事务所用户' : '集团企业用户'}
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;