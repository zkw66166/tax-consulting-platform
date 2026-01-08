import React, { useState } from 'react';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Shield,
    Activity,
    Droplets,
    Brain,
    RefreshCw,
    Zap,
    Download,
    Eye,
    Info,
    ChevronDown,
    ChevronRight,
    LineChart,
    PieChart,
    X
} from 'lucide-react';

const AnalysisFinancialModule = ({
    analysisPurpose,
    analysisPurposes,
    financialData,
    analysisProgress,
    setAnalysisProgress,
    selectedModule,
    setSelectedModule,
    showDetailModal,
    setShowDetailModal
}) => {
    const [expandedSections, setExpandedSections] = useState({});

    // 切换展开状态
    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    // 智能分析函数
    const generateIntelligentAnalysis = () => {
        setAnalysisProgress(0);
        const interval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 8;
            });
        }, 200);
    };

    // 根据分析目的获取指标
    const getIndicatorsByPurpose = (purpose) => {
        switch (purpose) {
            case 'investment':
                return {
                    primary: [
                        { name: 'ROE', value: financialData.ratios.roe, format: 'percent', trend: 'up', importance: 'high' },
                        { name: 'ROA', value: financialData.ratios.roa, format: 'percent', trend: 'up', importance: 'high' },
                        { name: 'ROIC', value: financialData.ratios.roic, format: 'percent', trend: 'up', importance: 'high' },
                        { name: 'P/E', value: financialData.ratios.pe, format: 'number', trend: 'stable', importance: 'high' },
                        { name: 'PEG', value: financialData.ratios.peg, format: 'number', trend: 'down', importance: 'medium' },
                        { name: '收入增长率', value: financialData.ratios.revenueGrowthRate, format: 'percent', trend: 'up', importance: 'high' }
                    ],
                    secondary: [
                        { name: '自由现金流', value: financialData.ratios.freeCashFlow, format: 'currency', trend: 'up' },
                        { name: '销售净利率', value: financialData.ratios.netMargin, format: 'percent', trend: 'up' },
                        { name: '总资产周转率', value: financialData.ratios.totalAssetTurnover, format: 'number', trend: 'stable' }
                    ]
                };
            case 'credit':
                return {
                    primary: [
                        { name: '流动比率', value: financialData.ratios.currentRatio, format: 'number', trend: 'stable', importance: 'high' },
                        { name: '速动比率', value: financialData.ratios.quickRatio, format: 'number', trend: 'stable', importance: 'high' },
                        { name: '利息保障倍数', value: financialData.ratios.interestCoverageRatio, format: 'number', trend: 'up', importance: 'high' },
                        { name: '资产负债率', value: financialData.ratios.debtToAssetRatio, format: 'percent', trend: 'down', importance: 'high' },
                        { name: 'Z-Score', value: financialData.ratios.zScore, format: 'number', trend: 'up', importance: 'medium' },
                        { name: '现金流债务比', value: financialData.ratios.cashFlowToDebtRatio, format: 'number', trend: 'up', importance: 'high' }
                    ],
                    secondary: [
                        { name: '现金比率', value: financialData.ratios.cashRatio, format: 'number', trend: 'stable' },
                        { name: '产权比率', value: financialData.ratios.debtToEquityRatio, format: 'number', trend: 'down' },
                        { name: '经营现金流比率', value: financialData.ratios.operatingCashFlowRatio, format: 'number', trend: 'up' }
                    ]
                };
            case 'management':
                return {
                    primary: [
                        { name: '应收账款周转天数', value: financialData.ratios.receivablesDays, format: 'days', trend: 'down', importance: 'high' },
                        { name: '存货周转天数', value: financialData.ratios.inventoryDays, format: 'days', trend: 'down', importance: 'high' },
                        { name: '现金周转期', value: financialData.ratios.cashConversionCycle, format: 'days', trend: 'down', importance: 'high' },
                        { name: '总资产周转率', value: financialData.ratios.totalAssetTurnover, format: 'number', trend: 'up', importance: 'medium' },
                        { name: '成本费用利润率', value: financialData.ratios.costProfitRatio, format: 'percent', trend: 'up', importance: 'medium' },
                        { name: '毛利率', value: financialData.ratios.grossMargin, format: 'percent', trend: 'up', importance: 'high' }
                    ],
                    secondary: [
                        { name: '营业利润率', value: financialData.ratios.operatingMargin, format: 'percent', trend: 'up' },
                        { name: '固定资产周转率', value: financialData.ratios.fixedAssetTurnover, format: 'number', trend: 'up' },
                        { name: 'ROE', value: financialData.ratios.roe, format: 'percent', trend: 'up' }
                    ]
                };
            case 'merger':
                return {
                    primary: [
                        { name: '调整后ROE', value: financialData.ratios.roe * 0.95, format: 'percent', trend: 'stable', importance: 'high' },
                        { name: '资产质量评分', value: 8.2, format: 'score', trend: 'stable', importance: 'high' },
                        { name: '盈利质量评分', value: 7.8, format: 'score', trend: 'up', importance: 'high' },
                        { name: '或有负债风险', value: 0.02, format: 'percent', trend: 'down', importance: 'medium' },
                        { name: '协同效应潜力', value: 0.15, format: 'percent', trend: 'up', importance: 'medium' },
                        { name: 'F-Score', value: financialData.ratios.fScore, format: 'score', trend: 'up', importance: 'medium' }
                    ],
                    secondary: [
                        { name: '正常化EBITDA', value: financialData.basic.ebitda * 1.05, format: 'currency', trend: 'up' },
                        { name: '营运资本需求', value: financialData.basic.currentAssets - financialData.basic.currentLiabilities, format: 'currency', trend: 'stable' },
                        { name: '税务风险评分', value: 8.5, format: 'score', trend: 'stable' }
                    ]
                };
            default:
                return { primary: [], secondary: [] };
        }
    };

    // 分析模块配置（将 Growth 替换为 TrendingUp）
    const getAnalysisModules = (purpose) => {
        const baseModules = [
            {
                id: 'solvency',
                title: '偿债能力分析',
                icon: Shield,
                color: 'green',
                description: '评估企业偿还短期和长期债务的能力',
                metrics: ['流动比率', '速动比率', '资产负债率', '利息保障倍数'],
                score: 85,
                trend: 'stable'
            },
            {
                id: 'efficiency',
                title: '营运能力分析',
                icon: Activity,
                color: 'purple',
                description: '分析资产运营效率和管理水平',
                metrics: ['应收账款周转率', '存货周转率', '总资产周转率', '现金周转期'],
                score: 78,
                trend: 'up'
            },
            {
                id: 'profitability',
                title: '盈利能力分析',
                icon: TrendingUp,
                color: 'blue',
                description: '分析企业获利能力和盈利质量',
                metrics: ['毛利率', '净利率', 'ROE', 'ROA'],
                score: 82,
                trend: 'up'
            },
            {
                id: 'growth',
                title: '发展能力分析',
                icon: TrendingUp, // 使用 TrendingUp 替代 Growth
                color: 'indigo',
                description: '评估企业未来扩张和增长的潜力',
                metrics: ['收入增长率', '利润增长率', '可持续增长率', '资产增长率'],
                score: 75,
                trend: 'up'
            },
            {
                id: 'cashflow',
                title: '现金流量分析',
                icon: Droplets,
                color: 'cyan',
                description: '评估企业创造和使用现金的能力',
                metrics: ['经营现金流', '自由现金流', '现金比率', '现金回款质量'],
                score: 80,
                trend: 'stable'
            }
        ];

        // 根据分析目的调整模块优先级和评分权重
        switch (purpose) {
            case 'investment':
                return [
                    { ...baseModules[2], score: 88, weight: 0.3 }, // 盈利能力
                    { ...baseModules[3], score: 85, weight: 0.25 }, // 发展能力
                    { ...baseModules[4], score: 82, weight: 0.2 }, // 现金流
                    { ...baseModules[1], score: 78, weight: 0.15 }, // 营运能力
                    { ...baseModules[0], score: 75, weight: 0.1 } // 偿债能力
                ];
            case 'credit':
                return [
                    { ...baseModules[0], score: 90, weight: 0.35 }, // 偿债能力
                    { ...baseModules[4], score: 88, weight: 0.3 }, // 现金流
                    { ...baseModules[2], score: 78, weight: 0.2 }, // 盈利能力
                    { ...baseModules[1], score: 75, weight: 0.1 }, // 营运能力
                    { ...baseModules[3], score: 72, weight: 0.05 } // 发展能力
                ];
            case 'management':
                return [
                    { ...baseModules[1], score: 85, weight: 0.3 }, // 营运能力
                    { ...baseModules[2], score: 82, weight: 0.25 }, // 盈利能力
                    { ...baseModules[4], score: 80, weight: 0.2 }, // 现金流
                    { ...baseModules[0], score: 78, weight: 0.15 }, // 偿债能力
                    { ...baseModules[3], score: 75, weight: 0.1 } // 发展能力
                ];
            case 'merger':
                return [
                    { ...baseModules[2], score: 85, weight: 0.25 }, // 盈利能力
                    { ...baseModules[0], score: 88, weight: 0.25 }, // 偿债能力
                    { ...baseModules[4], score: 82, weight: 0.2 }, // 现金流
                    { ...baseModules[1], score: 80, weight: 0.15 }, // 营运能力
                    { ...baseModules[3], score: 78, weight: 0.15 } // 发展能力
                ];
            default:
                return baseModules;
        }
    };

    // 杜邦分析组件
    const DupontAnalysis = ({ data }) => {
        const { roe, netMargin, assetTurnover, equityMultiplier } = data;

        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    杜邦分析体系
                </h3>

                <div className="space-y-6">
                    {/* ROE核心指标 */}
                    <div className="text-center">
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-blue-800 mb-1">净资产收益率 (ROE)</h4>
                            <div className="text-2xl font-bold text-blue-900">{(roe * 100).toFixed(1)}%</div>
                        </div>
                    </div>

                    {/* 分解公式 */}
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <span>ROE = 销售净利率 × 总资产周转率 × 权益乘数</span>
                    </div>

                    {/* 三大驱动因素 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <h5 className="text-sm font-medium text-green-800 mb-2">销售净利率</h5>
                            <div className="text-xl font-bold text-green-900">{(netMargin * 100).toFixed(1)}%</div>
                            <p className="text-xs text-green-700 mt-1">盈利能力</p>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                            <h5 className="text-sm font-medium text-purple-800 mb-2">总资产周转率</h5>
                            <div className="text-xl font-bold text-purple-900">{assetTurnover.toFixed(2)}</div>
                            <p className="text-xs text-purple-700 mt-1">运营效率</p>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                            <h5 className="text-sm font-medium text-orange-800 mb-2">权益乘数</h5>
                            <div className="text-xl font-bold text-orange-900">{equityMultiplier.toFixed(2)}</div>
                            <p className="text-xs text-orange-700 mt-1">财务杠杆</p>
                        </div>
                    </div>

                    {/* 驱动分析 */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-3">ROE驱动因子分析</h5>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>盈利能力贡献：</span>
                                <span className="font-medium text-green-600">+{(netMargin * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>运营效率贡献：</span>
                                <span className="font-medium text-purple-600">×{assetTurnover.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>财务杠杆贡献：</span>
                                <span className="font-medium text-orange-600">×{equityMultiplier.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 指标格式化函数
    const formatValue = (value, format) => {
        switch (format) {
            case 'percent':
                return `${(value * 100).toFixed(1)}%`;
            case 'currency':
                return `¥${(value / 10000).toFixed(0)}万`;
            case 'number':
                return value.toFixed(2);
            case 'days':
                return `${value.toFixed(0)}天`;
            case 'score':
                return `${value.toFixed(1)}分`;
            default:
                return value.toString();
        }
    };

    // 获取趋势图标
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-green-600" />;
            case 'down':
                return <TrendingDown className="w-4 h-4 text-red-600" />;
            default:
                return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
        }
    };

    // 获取重要性标识
    const getImportanceBadge = (importance) => {
        switch (importance) {
            case 'high':
                return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">核心</span>;
            case 'medium':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">重要</span>;
            default:
                return null;
        }
    };

    const getColorClasses = (color) => {
        const colorMap = {
            green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
            blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
            purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', button: 'bg-purple-600 hover:bg-purple-700' },
            orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', button: 'bg-orange-600 hover:bg-orange-700' },
            red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', button: 'bg-red-600 hover:bg-red-700' },
            indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', button: 'bg-indigo-600 hover:bg-indigo-700' },
            cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600', button: 'bg-cyan-600 hover:bg-cyan-700' },
            yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600', button: 'bg-yellow-600 hover:bg-yellow-700' }
        };
        return colorMap[color] || colorMap.blue;
    };

    return (
        <div className="space-y-8">
            {/* 当前分析目的提示 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                    <Info className="w-5 h-5 text-blue-600 mr-2" />
                    <div>
                        <p className="text-blue-900 font-medium">
                            当前分析视角：{analysisPurposes[analysisPurpose].name}
                        </p>
                        <p className="text-blue-700 text-sm">
                            {analysisPurposes[analysisPurpose].description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <span className="text-xs text-blue-700">核心指标：</span>
                            {analysisPurposes[analysisPurpose].primaryIndicators.map((indicator, index) => (
                                <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                                    {indicator}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 核心指标概览 - 根据分析目的调整 */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">核心指标概览</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getIndicatorsByPurpose(analysisPurpose).primary.map((indicator, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-gray-600">{indicator.name}</h4>
                                <div className="flex items-center space-x-2">
                                    {getTrendIcon(indicator.trend)}
                                    {indicator.importance && getImportanceBadge(indicator.importance)}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                {formatValue(indicator.value, indicator.format)}
                            </div>
                            <div className="text-xs text-gray-500">
                                相比上期：{indicator.trend === 'up' ? '↗' : indicator.trend === 'down' ? '↘' : '→'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 辅助指标 */}
            <div>
                <button
                    onClick={() => toggleSection('secondary')}
                    className="flex items-center text-lg font-semibold text-gray-900 mb-4 hover:text-blue-600"
                >
                    {expandedSections.secondary ? (
                        <ChevronDown className="w-5 h-5 mr-2" />
                    ) : (
                        <ChevronRight className="w-5 h-5 mr-2" />
                    )}
                    辅助分析指标
                </button>

                {expandedSections.secondary && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {getIndicatorsByPurpose(analysisPurpose).secondary.map((indicator, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-4 border">
                                <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-sm font-medium text-gray-700">{indicator.name}</h5>
                                    {getTrendIcon(indicator.trend)}
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                    {formatValue(indicator.value, indicator.format)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 杜邦分析体系 */}
            <DupontAnalysis data={financialData.ratios.dupont} />

            {/* 专项分析模块 */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">专项分析模块</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {getAnalysisModules(analysisPurpose).map((module) => {
                        const colors = getColorClasses(module.color);
                        const IconComponent = module.icon;

                        return (
                            <div key={module.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className={`${colors.bg} p-6 border-b`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <IconComponent className={`w-8 h-8 ${colors.text} mr-3`} />
                                            <div>
                                                <h4 className={`text-xl font-semibold ${colors.text}`}>
                                                    {module.title}
                                                </h4>
                                                {module.weight && (
                                                    <div className="text-sm text-gray-600">
                                                        权重：{(module.weight * 100).toFixed(0)}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold ${colors.text}`}>
                                                {module.score}
                                            </div>
                                            <div className="text-sm text-gray-600">评分</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{module.description}</p>
                                </div>

                                <div className="p-6">
                                    <div className="mb-6">
                                        <h5 className="font-semibold text-gray-900 mb-3">核心指标</h5>
                                        <div className="grid grid-cols-2 gap-2">
                                            {module.metrics.map((metric, index) => (
                                                <div key={index} className={`p-2 ${colors.bg} rounded text-sm text-center`}>
                                                    {metric}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600">综合得分</span>
                                            <span className="text-sm font-medium">{module.score}/100</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${colors.button}`}
                                                style={{ width: `${module.score}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setSelectedModule(module);
                                                setShowDetailModal(true);
                                            }}
                                            className={`flex-1 ${colors.button} text-white py-2 px-4 rounded-lg font-medium hover:shadow-md transition-all duration-200 flex items-center justify-center`}
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            详细分析
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 智能分析控制面板 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Brain className="h-6 w-6 mr-2 text-purple-600" />
                        AI智能财务诊断
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={generateIntelligentAnalysis}
                            disabled={analysisProgress > 0 && analysisProgress < 100}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center"
                        >
                            {analysisProgress > 0 && analysisProgress < 100 ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    分析中...
                                </>
                            ) : (
                                <>
                                    <Zap className="h-4 w-4 mr-2" />
                                    开始智能诊断
                                </>
                            )}
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            导出报告
                        </button>
                    </div>
                </div>

                {/* 分析进度 */}
                {analysisProgress > 0 && analysisProgress < 100 && (
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">AI智能分析进度</span>
                            <span className="text-sm text-gray-600">{analysisProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${analysisProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* 智能建议 */}
                {analysisProgress === 100 && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-blue-600" />
                            AI智能建议（基于{analysisPurposes[analysisPurpose].name}）
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {analysisPurpose === 'investment' && (
                                <>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <h5 className="font-medium text-blue-900 mb-2">投资亮点</h5>
                                        <ul className="space-y-1 text-sm text-blue-800">
                                            <li>• ROE达到31.1%，远超行业平均15%</li>
                                            <li>• 自由现金流稳定增长，质量较高</li>
                                            <li>• PEG比率0.84，估值相对合理</li>
                                            <li>• 营收连续5年正增长，趋势良好</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg">
                                        <h5 className="font-medium text-yellow-900 mb-2">投资风险</h5>
                                        <ul className="space-y-1 text-sm text-yellow-800">
                                            <li>• 应收账款周转天数偏高，需关注回款</li>
                                            <li>• 财务杠杆较高，抗风险能力有限</li>
                                            <li>• 行业竞争加剧，毛利率承压</li>
                                        </ul>
                                    </div>
                                </>
                            )}

                            {analysisPurpose === 'credit' && (
                                <>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <h5 className="font-medium text-green-900 mb-2">信贷优势</h5>
                                        <ul className="space-y-1 text-sm text-green-800">
                                            <li>• 流动比率2.8，短期偿债能力强</li>
                                            <li>• 利息保障倍数12.8，偿债安全性高</li>
                                            <li>• Z-Score 2.85，破产风险较低</li>
                                            <li>• 经营现金流稳定，资金实力较强</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-lg">
                                        <h5 className="font-medium text-red-900 mb-2">信贷风险</h5>
                                        <ul className="space-y-1 text-sm text-red-800">
                                            <li>• 资产负债率40%，需控制新增负债</li>
                                            <li>• 应收账款占比较高，存在坏账风险</li>
                                            <li>• 固定资产占比大，变现能力有限</li>
                                        </ul>
                                    </div>
                                </>
                            )}

                            {analysisPurpose === 'management' && (
                                <>
                                    <div className="p-4 bg-purple-50 rounded-lg">
                                        <h5 className="font-medium text-purple-900 mb-2">管理优势</h5>
                                        <ul className="space-y-1 text-sm text-purple-800">
                                            <li>• 总资产周转率0.8，资产利用效率良好</li>
                                            <li>• 毛利率40%，产品盈利能力较强</li>
                                            <li>• 成本费用控制良好，费用率稳定</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-orange-50 rounded-lg">
                                        <h5 className="font-medium text-orange-900 mb-2">改进机会</h5>
                                        <ul className="space-y-1 text-sm text-orange-800">
                                            <li>• 现金周转期80天，可进一步优化</li>
                                            <li>• 存货周转天数101天，库存管理待改善</li>
                                            <li>• 应收账款管理需要加强</li>
                                        </ul>
                                    </div>
                                </>
                            )}

                            {analysisPurpose === 'merger' && (
                                <>
                                    <div className="p-4 bg-cyan-50 rounded-lg">
                                        <h5 className="font-medium text-cyan-900 mb-2">并购价值</h5>
                                        <ul className="space-y-1 text-sm text-cyan-800">
                                            <li>• 财务报表质量较高，数据真实可靠</li>
                                            <li>• 盈利模式清晰，收入来源稳定</li>
                                            <li>• 协同效应潜力约15%，价值创造机会大</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-lg">
                                        <h5 className="font-medium text-red-900 mb-2">尽调重点</h5>
                                        <ul className="space-y-1 text-sm text-red-800">
                                            <li>• 需重点核查应收账款真实性</li>
                                            <li>• 关注或有负债和表外风险</li>
                                            <li>• 评估关键客户依赖度风险</li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* 趋势分析 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <LineChart className="w-5 h-5 mr-2 text-blue-600" />
                        收入趋势分析
                    </h3>
                    <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                            <p className="text-gray-500">收入呈稳定增长趋势</p>
                            <p className="text-sm text-gray-400">近5期增长率：12.5%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <PieChart className="w-5 h-5 mr-2 text-green-600" />
                        成本结构分析
                    </h3>
                    <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        <div className="text-center">
                            <PieChart className="w-12 h-12 text-green-500 mx-auto mb-2" />
                            <p className="text-gray-500">成本结构合理</p>
                            <p className="text-sm text-gray-400">直接成本占比：60%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 详情模态框 */}
            {showDetailModal && selectedModule && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-hidden flex flex-col">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {selectedModule.title} - 详细分析
                                </h3>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <p className="text-gray-600">详细分析内容将在此处显示...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisFinancialModule;