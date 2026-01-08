import React, { useState } from 'react';
import {
    Brain, Database, FileSpreadsheet, Receipt, Layers, ScanLine, Radar,
    FileBarChart, Calculator, PiggyBank, Network, MessageCircle, BookOpen,
    Settings, Workflow, ChevronRight, ChevronDown, ChevronUp, FolderOpen,
    Download, Eye, FileText, X, Zap
} from 'lucide-react';

const QuickActionsTab = ({
    mockData,
    handleQuickAction,
    handleGenerateReport,
    expandedReports,
    setExpandedReports,
    selectedReports,
    setSelectedReports,
    showDownloadModal,
    setShowDownloadModal,
    downloadFormat,
    setDownloadFormat,
    handleDownloadSelected,
    confirmDownload
}) => {
    const toggleReportExpansion = (reportType) => {
        setExpandedReports(prev => ({
            ...prev,
            [reportType]: !prev[reportType]
        }));
    };

    const handleReportSelection = (reportId, reportType) => {
        setSelectedReports(prev => ({
            ...prev,
            [reportType]: prev[reportType] ?
                (prev[reportType].includes(reportId)
                    ? prev[reportType].filter(id => id !== reportId)
                    : [...prev[reportType], reportId])
                : [reportId]
        }));
    };

    // 功能卡片组件 - 基础版本
    const FeatureCard = ({ icon: Icon, title, description, color, onClick, badgeText = null }) => (
        <div
            onClick={onClick}
            className="group relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            {/* 背景装饰 */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-full transform tranpurple-x-8 -tranpurple-y-8 opacity-50 group-hover:opacity-70 transition-opacity`}></div>

            {badgeText && (
                <div className={`absolute top-3 right-3 px-2 py-1 bg-${color}-100 text-${color}-700 text-xs font-medium rounded-full`}>
                    {badgeText}
                </div>
            )}

            <div className="relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-gray-700">
                    <span>立即使用</span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:tranpurple-x-1 transition-transform" />
                </div>
            </div>
        </div>
    );

    // 高级功能卡片组件 - 带生成功能
    const AdvancedFeatureCard = ({ icon: Icon, title, description, color, reportType, generateText, reports }) => (
        <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden">
            {/* 主要内容区域 */}
            <div className="p-6 relative overflow-hidden">
                {/* 背景装饰 */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-full transform tranpurple-x-10 -tranpurple-y-10 opacity-40 group-hover:opacity-60 transition-opacity`}></div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleGenerateReport(reportType)}
                                className={`px-3 py-1.5 bg-gradient-to-r from-${color}-500 to-${color}-600 text-white text-xs font-medium rounded-lg hover:from-${color}-600 hover:to-${color}-700 transition-all duration-200 flex items-center space-x-1 shadow-sm`}
                            >
                                <Zap className="h-3 w-3" />
                                <span>{generateText}</span>
                            </button>
                            <button
                                onClick={() => toggleReportExpansion(reportType)}
                                className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                {expandedReports[reportType] ?
                                    <ChevronUp className="h-4 w-4 text-gray-600" /> :
                                    <ChevronDown className="h-4 w-4 text-gray-600" />
                                }
                            </button>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{description}</p>

                    <button
                        onClick={() => handleQuickAction(title)}
                        className="flex items-center text-sm text-gray-700 hover:text-gray-900 font-medium group-hover:tranpurple-x-1 transition-all"
                    >
                        <span>开始使用</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* 历史报告展开区域 */}
            {expandedReports[reportType] && (
                <div className="border-t border-gray-100 bg-gray-50 p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium text-gray-900 flex items-center">
                            <FolderOpen className="h-4 w-4 mr-2 text-gray-600" />
                            历史报告
                        </h5>
                        <button
                            onClick={handleDownloadSelected}
                            className="text-xs bg-sky-600 text-white px-3 py-1.5 rounded-lg hover:bg-sky-700 transition-colors flex items-center space-x-1 shadow-sm"
                        >
                            <Download className="h-3 w-3" />
                            <span>下载选中</span>
                        </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {reports.map((report) => (
                            <div key={report.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={selectedReports[reportType]?.includes(report.id) || false}
                                    onChange={() => handleReportSelection(report.id, reportType)}
                                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500 focus:ring-offset-0"
                                />
                                <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{report.name}</p>
                                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                                        <span>{report.date}</span>
                                        {report.completeness && <span>完整度: {report.completeness}%</span>}
                                        {report.riskCount && <span>风险点: {report.riskCount}个</span>}
                                        {report.savingAmount && <span>节税: {(report.savingAmount / 10000).toFixed(1)}万</span>}
                                        {report.score && <span>评分: {report.score}分</span>}
                                    </div>
                                </div>
                                <button
                                    className="text-sky-600 hover:text-sky-800 transition-colors"
                                    title="预览"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            {/* 标题和描述 */}
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center">
                    <Brain className="h-6 w-6 mr-3 text-purple-500" />
                    智能财税分析中心
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    基于企业画像和多维数据分析，提供智能化财务管理和税务优化解决方案
                </p>
            </div>

            {/* 数据源管理区域 */}
            <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                        <Database className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">数据源管理</h4>
                        <p className="text-sm text-gray-600">企业登记、财务报表、纳税申报、发票数据、科目余额</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={FileSpreadsheet}
                        title="财务报表导入"
                        description="资产负债表、利润表、现金流量表智能解析"
                        color="sky"
                        onClick={() => handleQuickAction('财务报表导入')}
                        badgeText="核心"
                    />
                    <FeatureCard
                        icon={Receipt}
                        title="纳税申报数据"
                        description="增值税、企业所得税等申报表数据管理"
                        color="emerald"
                        onClick={() => handleQuickAction('纳税申报数据')}
                        badgeText="必需"
                    />
                    <FeatureCard
                        icon={Layers}
                        title="科目余额导入"
                        description="会计科目余额表，支持明细科目分析"
                        color="cyan"
                        onClick={() => handleQuickAction('科目余额导入')}
                        badgeText="专业"
                    />
                </div>
            </div>

            {/* 智能画像分析区域 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                        <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">智能画像分析</h4>
                        <p className="text-sm text-gray-600">基于多维数据构建企业财税智能画像</p>
                    </div>
                </div>
                <AdvancedFeatureCard
                    icon={ScanLine}
                    title="企业财税画像"
                    description="整合多源数据，构建全方位企业财税特征画像"
                    color="purple"
                    reportType="portraitAnalysis"
                    generateText="生成画像报告"
                    reports={mockData.historicalReports.portraitAnalysis}
                />
            </div>

            {/* 智能分析与检测区域 */}
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                        <Radar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">智能风险检测</h4>
                        <p className="text-sm text-gray-600">基于画像和历史数据的智能风险识别</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AdvancedFeatureCard
                        icon={Radar}
                        title="税务风险检测"
                        description="智能识别增值税、企业所得税等各类税务风险"
                        color="pink"
                        reportType="riskDetection"
                        generateText="风险扫描"
                        reports={mockData.historicalReports.riskDetection}
                    />
                    <AdvancedFeatureCard
                        icon={FileBarChart}
                        title="财务健康分析"
                        description="基于财务报表和科目数据的健康度评估"
                        color="sky"
                        reportType="financialAnalysis"
                        generateText="健康度检测"
                        reports={mockData.historicalReports.financialAnalysis}
                    />
                </div>
            </div>

            {/* 智能方案生成区域 */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                        <Workflow className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">智能方案生成</h4>
                        <p className="text-sm text-gray-600">基于画像分析自动生成优化方案</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AdvancedFeatureCard
                        icon={Calculator}
                        title="纳税筹划方案"
                        description="基于财税画像智能生成合规筹划方案"
                        color="emerald"
                        reportType="taxPlanning"
                        generateText="智能筹划"
                        reports={mockData.historicalReports.taxPlanning}
                    />
                    <AdvancedFeatureCard
                        icon={PiggyBank}
                        title="预算管理优化"
                        description="基于财务分析生成预算配置优化建议"
                        color="emerald"
                        reportType="budgetOptimization"
                        generateText="优化方案"
                        reports={mockData.historicalReports.budgetOptimization}
                    />
                    <AdvancedFeatureCard
                        icon={Network}
                        title="股权结构优化"
                        description="基于税负分析和企业发展阶段的结构建议"
                        color="emerald"
                        reportType="equityOptimization"
                        generateText="结构分析"
                        reports={mockData.historicalReports.equityOptimization}
                    />
                </div>
            </div>

            {/* 智能问答与系统管理 */}
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">智能服务</h4>
                        <p className="text-sm text-gray-600">AI问答咨询与系统管理</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={MessageCircle}
                        title="AI财税问答"
                        description="基于企业画像的个性化财税问题解答"
                        color="indigo"
                        onClick={() => handleQuickAction('AI财税问答')}
                        badgeText="智能"
                    />
                    <FeatureCard
                        icon={BookOpen}
                        title="政策法规库"
                        description="最新财税政策与企业适用性智能匹配"
                        color="sky"
                        onClick={() => handleQuickAction('政策法规库')}
                        badgeText="实时"
                    />
                    <FeatureCard
                        icon={Settings}
                        title="系统管理"
                        description="数据源配置、画像参数、分析模型设置"
                        color="gray"
                        onClick={() => handleQuickAction('系统管理')}
                    />
                </div>
            </div>

            {/* 下载模态框 */}
            {showDownloadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">选择下载格式</h3>
                                <button
                                    onClick={() => setShowDownloadModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 mb-6">
                                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                    <input
                                        type="radio"
                                        value="pdf"
                                        checked={downloadFormat === 'pdf'}
                                        onChange={(e) => setDownloadFormat(e.target.value)}
                                        className="text-sky-600 focus:ring-sky-500"
                                    />
                                    <FileText className="h-5 w-5 text-pink-500" />
                                    <div>
                                        <span className="font-medium text-gray-900">PDF格式</span>
                                        <p className="text-sm text-gray-500">适合打印和正式文档</p>
                                    </div>
                                </label>
                                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                    <input
                                        type="radio"
                                        value="word"
                                        checked={downloadFormat === 'word'}
                                        onChange={(e) => setDownloadFormat(e.target.value)}
                                        className="text-sky-600 focus:ring-sky-500"
                                    />
                                    <FileText className="h-5 w-5 text-sky-500" />
                                    <div>
                                        <span className="font-medium text-gray-900">Word格式</span>
                                        <p className="text-sm text-gray-500">便于编辑和修改</p>
                                    </div>
                                </label>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowDownloadModal(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    取消
                                </button>
                                <button
                                    onClick={confirmDownload}
                                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-lg hover:from-sky-700 hover:to-sky-800 transition-all font-medium shadow-sm"
                                >
                                    确认下载
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickActionsTab;