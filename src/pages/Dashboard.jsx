import React, { useState } from 'react';
import {
    Building, AlertTriangle, DollarSign, List, Plus, Upload, Search, Filter,
    UserCheck, Edit, Brain, Database, Radar, Workflow, Activity, Bell
} from 'lucide-react';

// 导入子组件
import OverviewTab from './dashboard/OverviewTab';
import QuickActionsTab from './dashboard/QuickActionsTab';
import TodosTab from './dashboard/TodosTab';
import NotificationsTab from './dashboard/NotificationsTab';
import { mockData, managedCompanies } from './dashboard/mockData';

const Dashboard = ({ selectedCompany, userType, currentTime }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedReports, setExpandedReports] = useState({});
    const [selectedReports, setSelectedReports] = useState({});
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState('pdf');

    const handleCompanySwitch = (company) => {
        console.log('切换到企业:', company.name);
    };

    const handleQuickAction = (action) => {
        console.log('执行快捷操作:', action);
    };

    const handleModuleAction = (module, action) => {
        console.log(`执行模块操作: ${module} - ${action}`);
    };

    const handleTodoAction = (todoId, action) => {
        console.log(`处理待办事项: ${todoId} - ${action}`);
    };

    const handleGenerateReport = (reportType) => {
        console.log('生成报告:', reportType);
    };

    const handleDownloadSelected = () => {
        const allSelected = Object.values(selectedReports).flat();
        if (allSelected.length === 0) {
            alert('请先选择要下载的报告');
            return;
        }
        setShowDownloadModal(true);
    };

    const confirmDownload = () => {
        console.log('下载选中报告，格式:', downloadFormat);
        console.log('选中的报告:', selectedReports);
        setShowDownloadModal(false);
        setSelectedReports({});
    };

    if (userType === 'consulting' || userType === 'group') {
        // 咨询公司或集团企业用户的工作台
        return (
            <div className="space-y-6">
                {/* 欢迎横幅 */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">
                                {userType === 'consulting' ? 'AI智能财税咨询平台' : '集团企业智能财税管理'}
                            </h2>
                            <p className="text-purple-100">
                                {userType === 'consulting'
                                    ? '基于企业画像的智能财税分析与优化平台'
                                    : '统一的集团企业财税画像与风险管理'}
                            </p>
                            <p className="text-sm text-purple-200 mt-2">
                                当前时间：{currentTime.toLocaleString()} | 在线分析：1,247家企业
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                <div className="text-sm text-purple-200">管理企业数量</div>
                                <div className="text-2xl font-bold">{managedCompanies.length}</div>
                                <div className="text-xs text-purple-200">画像完成 {managedCompanies.filter(c => c.portraitStatus === '已完成').length} 家</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 企业管理统计 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">企业画像</p>
                                <p className="text-2xl font-bold text-purple-600">{managedCompanies.filter(c => c.portraitStatus === '已完成').length}</p>
                                <p className="text-xs text-purple-600">画像完成率 {((managedCompanies.filter(c => c.portraitStatus === '已完成').length / managedCompanies.length) * 100).toFixed(0)}%</p>
                            </div>
                            <Brain className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">数据完整度</p>
                                <p className="text-2xl font-bold text-green-600">{managedCompanies.filter(c => c.hasData).length}</p>
                                <p className="text-xs text-green-600">平均完整度 95.2%</p>
                            </div>
                            <Database className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">风险企业</p>
                                <p className="text-2xl font-bold text-red-600">{managedCompanies.filter(c => c.riskLevel === '高').length}</p>
                                <p className="text-xs text-red-600">需要重点关注</p>
                            </div>
                            <Radar className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">智能方案</p>
                                <p className="text-2xl font-bold text-blue-600">23</p>
                                <p className="text-xs text-blue-600">本月生成方案数</p>
                            </div>
                            <Workflow className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* 快捷操作区域 */}
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <QuickActionsTab
                        mockData={mockData}
                        handleQuickAction={handleQuickAction}
                        handleGenerateReport={handleGenerateReport}
                        expandedReports={expandedReports}
                        setExpandedReports={setExpandedReports}
                        selectedReports={selectedReports}
                        setSelectedReports={setSelectedReports}
                        showDownloadModal={showDownloadModal}
                        setShowDownloadModal={setShowDownloadModal}
                        downloadFormat={downloadFormat}
                        setDownloadFormat={setDownloadFormat}
                        handleDownloadSelected={handleDownloadSelected}
                        confirmDownload={confirmDownload}
                    />
                </div>

                {/* 企业管理功能 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <List className="h-5 w-5 mr-2 text-purple-600" />
                            企业画像管理
                        </h3>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
                                <Plus className="h-4 w-4 mr-2" />
                                添加企业
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                                <Upload className="h-4 w-4 mr-2" />
                                批量导入
                            </button>
                        </div>
                    </div>

                    {/* 搜索和筛选 */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="搜索企业名称或统一社会信用代码..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            筛选
                        </button>
                    </div>

                    {/* 企业列表 */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">企业信息</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">画像状态</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">风险等级</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">数据状态</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {managedCompanies.map((company) => (
                                    <tr key={company.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{company.name}</p>
                                                <p className="text-xs text-gray-500">{company.code}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">{company.type}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${company.portraitStatus === '已完成' ? 'bg-green-100 text-green-800' :
                                                company.portraitStatus === '分析中' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {company.portraitStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${company.riskLevel === '高' ? 'bg-red-100 text-red-800' :
                                                company.riskLevel === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {company.riskLevel}风险
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${company.hasData ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {company.hasData ? '已导入' : '未导入'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleCompanySwitch(company)}
                                                    className="text-purple-600 hover:text-purple-800"
                                                    title="查看画像"
                                                >
                                                    <Brain className="h-4 w-4" />
                                                </button>
                                                <button className="text-blue-600 hover:text-blue-800" title="切换企业">
                                                    <UserCheck className="h-4 w-4" />
                                                </button>
                                                <button className="text-green-600 hover:text-green-800" title="编辑">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 最新动态和重要提醒 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Activity className="h-5 w-5 mr-2 text-green-600" />
                            智能分析动态
                        </h3>
                        <div className="space-y-3">
                            {mockData.recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.important ? 'bg-red-100' : 'bg-blue-100'
                                        }`}>
                                        <activity.icon className={`h-4 w-4 ${activity.important ? 'text-red-600' : 'text-blue-600'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs px-2 py-1 rounded-full ${activity.type === '智能画像' ? 'bg-purple-100 text-purple-800' :
                                                activity.type === '风险检测' ? 'bg-red-100 text-red-800' :
                                                    activity.type === '方案生成' ? 'bg-green-100 text-green-800' :
                                                        activity.type === '财务分析' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'
                                                }`}>
                                                {activity.type}
                                            </span>
                                            <span className="text-xs text-gray-500">{activity.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-900 mt-1">{activity.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Bell className="h-5 w-5 mr-2 text-red-600" />
                            重要提醒
                        </h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                                <p className="text-sm font-medium text-red-800">智能制造有限公司</p>
                                <p className="text-xs text-red-600">画像分析发现高税务风险，建议立即处理</p>
                            </div>
                            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                                <p className="text-sm font-medium text-yellow-800">3家企业数据更新</p>
                                <p className="text-xs text-yellow-600">财务报表已更新，画像需要重新分析</p>
                            </div>
                            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                                <p className="text-sm font-medium text-blue-800">AI优化建议</p>
                                <p className="text-xs text-blue-600">系统为5家企业生成了新的筹划方案</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        // 单一企业用户的工作台
        return (
            <div className="space-y-6">
                {/* 欢迎横幅 */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">AI智能财税咨询平台</h2>
                            <p className="text-purple-100">基于企业画像的智能财务管理和税务优化</p>
                            <p className="text-sm text-purple-200 mt-2">
                                当前时间：{currentTime.toLocaleString()} | 画像完整度：{mockData.enterprisePortrait.completeness}%
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                <div className="text-sm text-purple-200">预计优化收益</div>
                                <div className="text-2xl font-bold">{(mockData.intelligentAnalysis.optimizationOpportunities.taxSavingPotential / 10000).toFixed(1)}万元</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 标签页切换 */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview'
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                概览
                            </button>
                            <button
                                onClick={() => setActiveTab('quick-actions')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quick-actions'
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                快捷操作
                            </button>
                            <button
                                onClick={() => setActiveTab('todos')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'todos'
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                待办任务
                            </button>
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'notifications'
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                智能提醒
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <OverviewTab
                                mockData={mockData}
                                handleModuleAction={handleModuleAction}
                            />
                        )}

                        {activeTab === 'quick-actions' && (
                            <QuickActionsTab
                                mockData={mockData}
                                handleQuickAction={handleQuickAction}
                                handleGenerateReport={handleGenerateReport}
                                expandedReports={expandedReports}
                                setExpandedReports={setExpandedReports}
                                selectedReports={selectedReports}
                                setSelectedReports={setSelectedReports}
                                showDownloadModal={showDownloadModal}
                                setShowDownloadModal={setShowDownloadModal}
                                downloadFormat={downloadFormat}
                                setDownloadFormat={setDownloadFormat}
                                handleDownloadSelected={handleDownloadSelected}
                                confirmDownload={confirmDownload}
                            />
                        )}

                        {activeTab === 'todos' && (
                            <TodosTab
                                mockData={mockData}
                                handleTodoAction={handleTodoAction}
                                handleModuleAction={handleModuleAction}
                            />
                        )}

                        {activeTab === 'notifications' && (
                            <NotificationsTab
                                mockData={mockData}
                                handleModuleAction={handleModuleAction}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;