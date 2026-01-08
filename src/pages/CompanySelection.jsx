import React, { useState, useEffect } from 'react';
import { Search, CheckSquare, Square, Play, Settings, FileText, AlertTriangle, TrendingUp, BarChart3, GitBranch, DollarSign, Calculator, Shield } from 'lucide-react';
import { managedCompanies } from '../utils/mockData';

const moduleConfig = {
    'risk': {
        title: '风险检测',
        icon: AlertTriangle,
        description: '对选定企业进行全面风险检测分析',
        batchAction: '一键检测',
        customAction: '定制化检测'
    },
    'financial-analysis': {
        title: '财务分析',
        icon: BarChart3,
        description: '深度分析企业财务状况，提供专业的财务诊断报告',
        batchAction: '一键生成财务分析',
        customAction: '定制化财务分析'
    },
    'tax-verification': {
        title: '税务鉴证',
        icon: Shield,
        description: '专业税务鉴证服务，确保税务合规性和准确性',
        batchAction: '一键执行鉴证',
        customAction: '定制化税务鉴证'
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
        icon: GitBranch,
        description: '优化企业股权结构设计',
        batchAction: '一键生成优化方案',
        customAction: '定制化优化'
    },
    'finance-optimization': {
        title: '财务体系优化',
        icon: Calculator,
        description: '完善企业财务管理体系',
        batchAction: '一键生成优化报告',
        customAction: '定制化优化'
    },
    'budget-optimization': {
        title: '预算管理优化',
        icon: DollarSign,
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

    // 默认选中第一家企业 - 每次切换模块时都执行
    useEffect(() => {
        if (managedCompanies.length > 0) {
            setSelectedCompanies([managedCompanies[0].id]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moduleType]); // 监听moduleType变化

    const config = moduleConfig[moduleType] || moduleConfig['risk']; // 添加默认值防止错误
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

        // 根据不同模块类型提供不同的提示信息
        let actionMessage = '';
        switch (moduleType) {
            case 'financial-analysis':
                actionMessage = `正在为 ${selectedCompanies.length} 家企业生成财务分析报告，预计需要 ${selectedCompanies.length * 2} 分钟...`;
                break;
            case 'tax-verification':
                actionMessage = `正在为 ${selectedCompanies.length} 家企业执行税务鉴证程序，预计需要 ${selectedCompanies.length * 3} 分钟...`;
                break;
            default:
                actionMessage = `正在为 ${selectedCompanies.length} 家企业执行${config.batchAction}...`;
        }

        alert(actionMessage);

        // 这里可以添加实际的批量处理逻辑
        // 例如：跳转到批量处理进度页面或显示进度弹窗
    };

    const handleCustomAction = () => {
        if (selectedCompanies.length === 0) {
            alert('请至少选择一家企业');
            return;
        }
        setSelectedModule('custom');
    };

    // 获取模块特定的说明信息
    const getModuleSpecificInfo = () => {
        switch (moduleType) {
            case 'financial-analysis':
                return (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">财务分析服务内容：</h4>
                        <ul className="text-xs text-blue-800 space-y-1">
                            <li>• 财务状况综合评估（资产负债结构、盈利能力、现金流量）</li>
                            <li>• 财务指标趋势分析（同比、环比、行业对比）</li>
                            <li>• 风险识别与预警（流动性风险、偿债风险、经营风险）</li>
                            <li>• 改进建议与优化方案（资本结构优化、成本控制建议）</li>
                        </ul>
                    </div>
                );
            case 'tax-verification':
                return (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="text-sm font-medium text-green-900 mb-2">税务鉴证服务内容：</h4>
                        <ul className="text-xs text-green-800 space-y-1">
                            <li>• 税务申报准确性核查（各税种申报表复核）</li>
                            <li>• 税务政策适用合规性审查（优惠政策享受、税率适用）</li>
                            <li>• 发票管理规范性检查（开具、取得、管理流程）</li>
                            <li>• 税务风险识别与建议（潜在风险点、合规建议）</li>
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* 模块标题 */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{config.title}</h1>
                        <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                    </div>
                </div>

                {/* 显示模块特定信息 */}
                {getModuleSpecificInfo()}

                {/* 用户类型信息 */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        当前用户：{userType === 'accounting' ? '会计师事务所' : userType === 'group' ? '集团企业' : '企业用户'}
                    </div>
                    <div className="text-sm text-blue-600">
                        支持批量处理和定制化服务
                    </div>
                </div>
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
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 w-12">
                                        <button onClick={handleSelectAll}>
                                            {selectAll ? <CheckSquare className="h-5 w-5 text-blue-600" /> : <Square className="h-5 w-5 text-gray-400" />}
                                        </button>
                                    </th>
                                    <th className="text-left py-3 px-4">企业名称</th>
                                    <th className="text-left py-3 px-4">统一社会信用代码</th>
                                    <th className="text-left py-3 px-4">企业类型</th>
                                    <th className="text-center py-3 px-4">经营状态</th>
                                    <th className="text-center py-3 px-4">风险等级</th>
                                    <th className="text-center py-3 px-4">数据状态</th>
                                    {(moduleType === 'financial-analysis' || moduleType === 'tax-verification') && (
                                        <th className="text-center py-3 px-4">服务状态</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCompanies.map((company) => (
                                    <tr key={company.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleCompanyToggle(company.id)}>
                                        <td className="py-3 px-4">
                                            <button onClick={(e) => { e.stopPropagation(); handleCompanyToggle(company.id); }}>
                                                {selectedCompanies.includes(company.id) ?
                                                    <CheckSquare className="h-5 w-5 text-blue-600" /> :
                                                    <Square className="h-5 w-5 text-gray-400" />
                                                }
                                            </button>
                                        </td>
                                        <td className="py-3 px-4">
                                            <p className="font-medium text-gray-900">{company.name}</p>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm text-gray-600 font-mono">{company.code}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm text-gray-600">{company.type}</span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${company.status === '正常'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {company.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex items-center justify-center space-x-1">
                                                <span className={`w-2 h-2 rounded-full ${company.riskLevel === '高' ? 'bg-red-500' :
                                                    company.riskLevel === '中' ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`}></span>
                                                <span className="text-sm text-gray-600">{company.riskLevel}风险</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${company.hasData
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {company.hasData ? '已接入' : '未接入'}
                                            </span>
                                        </td>
                                        {(moduleType === 'financial-analysis' || moduleType === 'tax-verification') && (
                                            <td className="py-3 px-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${company.hasData ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {company.hasData ? '可提供服务' : '数据补全中'}
                                                </span>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredCompanies.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p>未找到匹配的企业</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 操作按钮 */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">执行操作</h3>
                        <p className="text-sm text-gray-600">选择操作方式来处理已选择的企业</p>
                        {moduleType === 'financial-analysis' && (
                            <p className="text-xs text-blue-600 mt-1">
                                财务分析将生成专业的财务诊断报告，包含风险评估和改进建议
                            </p>
                        )}
                        {moduleType === 'tax-verification' && (
                            <p className="text-xs text-green-600 mt-1">
                                税务鉴证将提供合规性审查和风险识别，确保税务处理的准确性
                            </p>
                        )}
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleBatchAction}
                            disabled={selectedCompanies.length === 0}
                            title={selectedCompanies.length === 0 ? "请选择至少一家企业" : ""}
                            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            <Play className="h-4 w-4" />
                            <span>{config.batchAction}</span>
                        </button>
                        <button
                            onClick={handleCustomAction}
                            disabled={selectedCompanies.length === 0}
                            title={selectedCompanies.length === 0 ? "请选择至少一家企业" : ""}
                            className="flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                        >
                            <Settings className="h-4 w-4" />
                            <span>{config.customAction}</span>
                        </button>
                    </div>
                </div>

                {/* 选择企业数量提示 */}
                {selectedCompanies.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-blue-800">
                                <strong>已选择 {selectedCompanies.length} 家企业</strong>
                                {moduleType === 'financial-analysis' && (
                                    <span className="ml-2">预计生成报告时间：{selectedCompanies.length * 2} 分钟</span>
                                )}
                                {moduleType === 'tax-verification' && (
                                    <span className="ml-2">预计鉴证完成时间：{selectedCompanies.length * 3} 分钟</span>
                                )}
                            </div>
                            <div className="text-xs text-blue-600">
                                点击定制化操作可进行个性化设置
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanySelection;