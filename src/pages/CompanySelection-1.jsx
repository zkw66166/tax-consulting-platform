import React, { useState } from 'react';
import { Search, CheckSquare, Square, Play, Settings, FileText, AlertTriangle, TrendingUp, Database, Users, BarChart3 } from 'lucide-react';
import { managedCompanies } from '../utils/mockData';

const moduleConfig = {
    'risk': {
        title: '风险检测',
        icon: AlertTriangle,
        description: '对选定企业进行全面风险检测分析',
        batchAction: '一键检测',
        customAction: '定制化检测'
    },
    'due-diligence': {
        title: '财务尽职调查',
        icon: FileText,
        description: '生成专业的财务尽职调查报告',
        batchAction: '一键生成尽调报告',
        customAction: '定制化尽调'
    },
    'tax-planning': {
        title: '税务合规规划',
        icon: TrendingUp,
        description: '制定税务合规和优化方案',
        batchAction: '一键生成规划方案',
        customAction: '定制化规划'
    },
    'equity-optimization': {
        title: '股权架构优化',
        icon: Users,
        description: '优化企业股权结构设计',
        batchAction: '一键生成优化方案',
        customAction: '定制化优化'
    },
    'finance-optimization': {
        title: '财务体系优化',
        icon: BarChart3,
        description: '完善企业财务管理体系',
        batchAction: '一键生成优化报告',
        customAction: '定制化优化'
    },
    'budget-optimization': {
        title: '预算管理优化',
        icon: Database,
        description: '改进企业预算管理流程',
        batchAction: '一键生成预算方案',
        customAction: '定制化预算'
    }
};

const CompanySelection = ({
    moduleType,
    selectedCompanies,
    setSelectedCompanies,
    setSelectedModule,
    userType
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    const config = moduleConfig[moduleType];
    const Icon = config.icon;

    const filteredCompanies = managedCompanies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.code.includes(searchTerm)
    );

    const handleCompanyToggle = (companyId) => {
        setSelectedCompanies(prev =>
            prev.includes(companyId)
                ? prev.filter(id => id !== companyId)
                : [...prev, companyId]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedCompanies([]);
        } else {
            setSelectedCompanies(filteredCompanies.map(company => company.id));
        }
        setSelectAll(!selectAll);
    };

    const handleBatchAction = () => {
        if (selectedCompanies.length === 0) {
            alert('请至少选择一家企业');
            return;
        }
        // 模拟批量操作
        alert(`正在为 ${selectedCompanies.length} 家企业执行${config.batchAction}...`);
        // 这里可以跳转到报告页面或显示处理结果
    };

    const handleCustomAction = () => {
        if (selectedCompanies.length === 0) {
            alert('请至少选择一家企业');
            return;
        }
        setSelectedModule('custom');
    };

    return (
        <div className="space-y-6">
            {/* 模块标题 */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <h1 className="text-xl font-bold text-gray-900">{config.title}</h1>
                </div>
                <p className="text-gray-600">{config.description}</p>
            </div>

            {/* 企业选择区域 */}
            <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">选择企业</h2>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                已选择 {selectedCompanies.length} 家企业
                            </span>
                            <button
                                onClick={handleSelectAll}
                                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                {selectAll ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                                <span>全选</span>
                            </button>
                        </div>
                    </div>

                    {/* 搜索框 */}
                    <div className="relative">
                        <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="搜索企业名称或统一社会信用代码..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* 企业列表 */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCompanies.map((company) => (
                            <div
                                key={company.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedCompanies.includes(company.id)
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => handleCompanyToggle(company.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            {selectedCompanies.includes(company.id) ?
                                                <CheckSquare className="h-5 w-5 text-blue-600" /> :
                                                <Square className="h-5 w-5 text-gray-400" />
                                            }
                                            <h3 className="font-medium text-gray-900 text-sm">{company.name}</h3>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2">{company.code}</p>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${company.status === '正常'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {company.status}
                                            </span>
                                            <span className={`w-2 h-2 rounded-full ${company.riskLevel === '高' ? 'bg-red-500' :
                                                company.riskLevel === '中' ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}></span>
                                            <span className="text-xs text-gray-500">{company.riskLevel}风险</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 操作按钮 */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">执行操作</h3>
                        <p className="text-sm text-gray-600">选择操作方式来处理已选择的企业</p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleBatchAction}
                            disabled={selectedCompanies.length === 0}
                            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            <Play className="h-4 w-4" />
                            <span>{config.batchAction}</span>
                        </button>
                        <button
                            onClick={handleCustomAction}
                            disabled={selectedCompanies.length === 0}
                            className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        >
                            <Settings className="h-4 w-4" />
                            <span>{config.customAction}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanySelection;