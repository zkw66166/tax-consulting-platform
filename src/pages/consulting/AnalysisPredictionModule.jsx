import React, { useState } from 'react';
import {
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    Settings,
    LineChart,
    Filter
} from 'lucide-react';

const AnalysisPredictionModule = ({
    analysisPurpose,
    analysisPurposes,
    selectedTimeRange,
    setSelectedTimeRange,
    selectedScenario,
    setSelectedScenario
}) => {
    // 根据分析目的获取预测预警配置
    const getPredictionByPurpose = (purpose) => {
        switch (purpose) {
            case 'investment':
                return {
                    title: '投资风险与机会预警',
                    description: '关注估值风险、成长性变化、盈利质量和市场机会',
                    keyMetrics: [
                        { name: '估值风险', score: 25, color: 'green', description: 'P/E相对合理，PEG<1' },
                        { name: '成长性预警', score: 15, color: 'yellow', description: '增长率可能放缓' },
                        { name: '盈利质量', score: 10, color: 'green', description: '现金流质量良好' },
                        { name: '市场机会', score: 35, color: 'blue', description: '行业景气度上升' }
                    ],
                    scenarios: {
                        optimistic: { probability: 25, description: '市场扩张，业绩超预期', impact: 'ROE提升至35%+' },
                        base: { probability: 50, description: '稳定增长，符合预期', impact: 'ROE维持30%左右' },
                        pessimistic: { probability: 25, description: '竞争加剧，增长放缓', impact: 'ROE下降至25%' }
                    },
                    recommendations: [
                        '密切关注竞争对手动态',
                        '监控核心财务指标变化',
                        '评估退出时机和策略'
                    ]
                };
            case 'credit':
                return {
                    title: '信贷风险预警系统',
                    description: '关注偿债能力恶化、现金流紧张和担保风险',
                    keyMetrics: [
                        { name: '流动性风险', score: 20, color: 'green', description: '流动比率充足' },
                        { name: '偿债风险', score: 30, color: 'yellow', description: '利息保障倍数下降' },
                        { name: '担保风险', score: 15, color: 'green', description: '对外担保可控' },
                        { name: '现金流风险', score: 40, color: 'red', description: '经营现金流波动大' }
                    ],
                    scenarios: {
                        optimistic: { probability: 20, description: '经营改善，现金流稳定', impact: '降级风险为低' },
                        base: { probability: 60, description: '维持现状，密切监控', impact: '维持当前评级' },
                        pessimistic: { probability: 20, description: '现金流恶化，偿债压力', impact: '可能下调评级' }
                    },
                    recommendations: [
                        '要求提供额外担保',
                        '缩短贷款期限',
                        '增加财务限制性条款'
                    ]
                };
            case 'management':
                return {
                    title: '经营管理预警系统',
                    description: '关注运营效率下降、成本失控和预算偏差',
                    keyMetrics: [
                        { name: '营运效率', score: 25, color: 'yellow', description: '周转率有待提升' },
                        { name: '成本控制', score: 20, color: 'green', description: '成本控制良好' },
                        { name: '预算偏差', score: 30, color: 'red', description: '收入未达预期' },
                        { name: '绩效指标', score: 15, color: 'yellow', description: 'KPI完成率偏低' }
                    ],
                    scenarios: {
                        optimistic: { probability: 30, description: '运营优化见效，效率提升', impact: '超额完成年度目标' },
                        base: { probability: 50, description: '按计划推进，稳步改善', impact: '基本完成年度目标' },
                        pessimistic: { probability: 20, description: '改进措施效果有限', impact: '难以完成年度目标' }
                    },
                    recommendations: [
                        '加强应收账款催收',
                        '优化库存管理流程',
                        '制定成本削减计划'
                    ]
                };
            case 'merger':
                return {
                    title: '并购风险识别系统',
                    description: '关注财务数据真实性、隐性负债和整合风险',
                    keyMetrics: [
                        { name: '财务真实性', score: 15, color: 'green', description: '未发现重大异常' },
                        { name: '隐性负债', score: 25, color: 'yellow', description: '部分或有负债需关注' },
                        { name: '整合风险', score: 35, color: 'red', description: '文化差异较大' },
                        { name: '协同效应', score: 20, color: 'blue', description: '预期协同效应可实现' }
                    ],
                    scenarios: {
                        optimistic: { probability: 25, description: '整合顺利，协同效应超预期', impact: '价值创造15%+' },
                        base: { probability: 50, description: '按计划整合，实现预期协同', impact: '价值创造10%' },
                        pessimistic: { probability: 25, description: '整合困难，协同效应有限', impact: '价值创造<5%' }
                    },
                    recommendations: [
                        '制定详细整合计划',
                        '建立风险监控机制',
                        '评估关键人员保留'
                    ]
                };
            default:
                return null;
        }
    };

    // 现金流预测数据
    const getCashFlowDataByPurpose = (purpose) => {
        const baseCashFlowData = [
            { period: '30天', amount: 5800000, trend: 'up', confidence: 92 },
            { period: '60天', amount: 3200000, trend: 'down', confidence: 85 },
            { period: '90天', amount: -1200000, trend: 'down', confidence: 78 }
        ];

        switch (purpose) {
            case 'investment':
                return [
                    { period: '1年', amount: 28000000, trend: 'up', confidence: 80, note: '自由现金流' },
                    { period: '3年', amount: 95000000, trend: 'up', confidence: 65, note: '累计自由现金流' },
                    { period: '5年', amount: 180000000, trend: 'up', confidence: 50, note: '投资回收期预测' }
                ];
            case 'credit':
                return baseCashFlowData.map(item => ({
                    ...item,
                    debtService: item.amount * 0.15,
                    coverage: item.amount > 0 ? (item.amount / (item.amount * 0.15)).toFixed(1) : '不适用'
                }));
            case 'management':
                return baseCashFlowData.map(item => ({
                    ...item,
                    budget: item.amount * 1.1,
                    variance: ((item.amount - item.amount * 1.1) / (item.amount * 1.1) * 100).toFixed(1) + '%'
                }));
            case 'merger':
                return [
                    { period: '并购前', amount: 35000000, trend: 'stable', confidence: 95, note: '基准现金流' },
                    { period: '并购后Y1', amount: 38000000, trend: 'up', confidence: 75, note: '协同效应初现' },
                    { period: '并购后Y3', amount: 45000000, trend: 'up', confidence: 60, note: '完全整合后' }
                ];
            default:
                return baseCashFlowData;
        }
    };

    // 风险预警数据
    const getRiskAlertsByPurpose = (purpose) => {
        const commonRisks = [
            {
                id: 1,
                type: '应收账款风险',
                level: 'medium',
                description: '超期应收账款占比达到28%，高于行业平均20%',
                impact: '中等',
                probability: '70%',
                recommendation: '加强应收账款催收，建立客户信用评级体系',
                date: '2024-07-30'
            }
        ];

        const purposeSpecificRisks = {
            investment: [
                {
                    id: 2,
                    type: '估值风险',
                    level: 'low',
                    description: '当前P/E 15.2倍，低于行业平均18倍，但需关注盈利增长可持续性',
                    impact: '中等',
                    probability: '45%',
                    recommendation: '密切跟踪核心业务指标和竞争态势变化',
                    date: '2024-07-29'
                },
                {
                    id: 3,
                    type: '成长性风险',
                    level: 'medium',
                    description: '收入增长率连续两季度下滑，市场竞争加剧',
                    impact: '较大',
                    probability: '60%',
                    recommendation: '评估管理层战略调整计划，考虑投资组合再平衡',
                    date: '2024-07-28'
                }
            ],
            credit: [
                {
                    id: 2,
                    type: '资金链风险',
                    level: 'high',
                    description: '90天后可能出现资金缺口1200万元',
                    impact: '严重',
                    probability: '85%',
                    recommendation: '建议提前安排银行授信或延长应付账款周期',
                    date: '2024-07-30'
                },
                {
                    id: 3,
                    type: '担保风险',
                    level: 'medium',
                    description: '对外担保余额2.5亿元，占净资产28%',
                    impact: '中等',
                    probability: '35%',
                    recommendation: '要求提供担保明细及被担保方财务状况',
                    date: '2024-07-29'
                }
            ],
            management: [
                {
                    id: 2,
                    type: '成本控制风险',
                    level: 'medium',
                    description: '原材料成本上涨15%，但产品提价幅度仅8%',
                    impact: '中等',
                    probability: '80%',
                    recommendation: '制定成本削减计划，寻求替代供应商',
                    date: '2024-07-29'
                },
                {
                    id: 3,
                    type: '预算偏差风险',
                    level: 'high',
                    description: '7月收入完成率仅85%，全年目标完成面临压力',
                    impact: '较大',
                    probability: '75%',
                    recommendation: '调整销售策略，加强市场开拓力度',
                    date: '2024-07-30'
                }
            ],
            merger: [
                {
                    id: 2,
                    type: '整合风险',
                    level: 'high',
                    description: '目标公司组织架构复杂，核心团队离职风险高',
                    impact: '严重',
                    probability: '60%',
                    recommendation: '制定人员保留计划，设计股权激励方案',
                    date: '2024-07-28'
                },
                {
                    id: 3,
                    type: '协同效应风险',
                    level: 'medium',
                    description: '预期成本协同1500万元，但实现难度较大',
                    impact: '中等',
                    probability: '50%',
                    recommendation: '细化协同计划，设置阶段性里程碑',
                    date: '2024-07-27'
                }
            ]
        };

        return [...commonRisks, ...purposeSpecificRisks[purpose]];
    };

    const getColorClasses = (color) => {
        const colorMap = {
            green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
            blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
            yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600', button: 'bg-yellow-600 hover:bg-yellow-700' },
            red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', button: 'bg-red-600 hover:bg-red-700' }
        };
        return colorMap[color] || colorMap.blue;
    };

    const getRiskLevelColor = (level) => {
        switch (level) {
            case 'high': return 'bg-red-50 border-red-200 text-red-800';
            case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'low': return 'bg-green-50 border-green-200 text-green-800';
            default: return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    const getRiskLevelBadge = (level) => {
        switch (level) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const predictionConfig = getPredictionByPurpose(analysisPurpose);

    return (
        <div className="space-y-8">
            {/* 预警概览 - 根据目的调整 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{predictionConfig.title}</h2>
                        <p className="text-gray-600 mt-1">{predictionConfig.description}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">当前分析目的</div>
                        <div className="text-lg font-semibold text-blue-600">
                            {analysisPurposes[analysisPurpose].name}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {predictionConfig.keyMetrics.map((metric, index) => {
                        const colors = getColorClasses(metric.color);
                        return (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                                <div className="flex items-center">
                                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mr-4`}>
                                        <AlertTriangle className={`w-6 h-6 ${colors.text}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                                        <p className={`text-2xl font-bold ${colors.text}`}>{metric.score}</p>
                                        <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 现金流预测 - 根据目的调整 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {analysisPurpose === 'investment' ? '投资回报预测模型' :
                            analysisPurpose === 'credit' ? '偿债能力预测模型' :
                                analysisPurpose === 'management' ? '经营预算预测模型' :
                                    '并购协同效应预测模型'}
                    </h2>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <select
                            value={selectedTimeRange}
                            onChange={(e) => setSelectedTimeRange(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        >
                            {analysisPurpose === 'investment' && (
                                <>
                                    <option value="12">未来1年</option>
                                    <option value="36">未来3年</option>
                                    <option value="60">未来5年</option>
                                </>
                            )}
                            {analysisPurpose === 'credit' && (
                                <>
                                    <option value="30">未来30天</option>
                                    <option value="90">未来90天</option>
                                    <option value="180">未来半年</option>
                                </>
                            )}
                            {analysisPurpose === 'management' && (
                                <>
                                    <option value="30">本月剩余</option>
                                    <option value="90">下季度</option>
                                    <option value="365">本年剩余</option>
                                </>
                            )}
                            {analysisPurpose === 'merger' && (
                                <>
                                    <option value="0">并购前基准</option>
                                    <option value="12">并购后1年</option>
                                    <option value="36">并购后3年</option>
                                </>
                            )}
                        </select>
                        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            <Settings className="w-4 h-4 mr-2" />
                            模型设置
                        </button>
                    </div>
                </div>

                {/* 预测结果概览 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {getCashFlowDataByPurpose(analysisPurpose).map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">{item.period}</span>
                                <div className="flex items-center">
                                    {item.trend === 'up' ? (
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                    ) : item.trend === 'down' ? (
                                        <TrendingDown className="w-4 h-4 text-red-600" />
                                    ) : (
                                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                                    )}
                                </div>
                            </div>
                            <p className={`text-2xl font-bold ${item.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.amount >= 0 ? '+' : ''}{(item.amount / 10000).toFixed(0)}万
                            </p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">置信度</span>
                                <span className="text-xs font-medium">{item.confidence}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div
                                    className="bg-blue-600 h-1.5 rounded-full"
                                    style={{ width: `${item.confidence}%` }}
                                ></div>
                            </div>
                            {item.note && (
                                <div className="text-xs text-blue-600 mt-1">{item.note}</div>
                            )}
                            {item.debtService && (
                                <div className="text-xs text-gray-500 mt-1">
                                    债务服务：{(item.debtService / 10000).toFixed(0)}万 | 覆盖率：{item.coverage}
                                </div>
                            )}
                            {item.variance && (
                                <div className="text-xs text-gray-500 mt-1">
                                    预算偏差：{item.variance}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 预测图表区域 */}
                <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                        <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 font-medium">
                            {analysisPurpose === 'investment' ? '投资回报预测趋势图' :
                                analysisPurpose === 'credit' ? '偿债能力预测趋势图' :
                                    analysisPurpose === 'management' ? '经营预算预测趋势图' :
                                        '并购协同效应预测趋势图'}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            基于{analysisPurposes[analysisPurpose].name}的专业预测模型
                        </p>
                    </div>
                </div>
            </div>

            {/* 风险预警详情 - 根据目的调整 */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {analysisPurpose === 'investment' ? '投资风险预警' :
                                analysisPurpose === 'credit' ? '信贷风险预警' :
                                    analysisPurpose === 'management' ? '经营管理风险预警' :
                                        '并购风险预警'}
                        </h2>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                <Filter className="w-4 h-4 mr-2" />
                                筛选
                            </button>
                            <select className="border border-gray-300 rounded-md px-3 py-2">
                                <option>全部风险类型</option>
                                {analysisPurpose === 'investment' && (
                                    <>
                                        <option>估值风险</option>
                                        <option>成长性风险</option>
                                        <option>竞争风险</option>
                                    </>
                                )}
                                {analysisPurpose === 'credit' && (
                                    <>
                                        <option>流动性风险</option>
                                        <option>偿债风险</option>
                                        <option>担保风险</option>
                                    </>
                                )}
                                {analysisPurpose === 'management' && (
                                    <>
                                        <option>运营风险</option>
                                        <option>成本风险</option>
                                        <option>预算风险</option>
                                    </>
                                )}
                                {analysisPurpose === 'merger' && (
                                    <>
                                        <option>整合风险</option>
                                        <option>协同风险</option>
                                        <option>估值风险</option>
                                    </>
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {getRiskAlertsByPurpose(analysisPurpose).map((alert) => (
                        <div key={alert.id} className={`p-6 ${getRiskLevelColor(alert.level)} border-l-4`}>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <h3 className="text-lg font-medium mr-3">{alert.type}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelBadge(alert.level)}`}>
                                            {alert.level === 'high' ? '高风险' : alert.level === 'medium' ? '中风险' : '低风险'}
                                        </span>
                                        <span className="ml-3 text-sm text-gray-500">{alert.date}</span>
                                    </div>
                                    <p className="text-gray-700 mb-3">{alert.description}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">影响程度: </span>
                                            <span className="text-sm">{alert.impact}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-600">发生概率: </span>
                                            <span className="text-sm">{alert.probability}</span>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded-md">
                                        <span className="text-sm font-medium text-blue-800">建议措施: </span>
                                        <span className="text-sm text-blue-700">{alert.recommendation}</span>
                                    </div>
                                </div>
                                <div className="ml-4 flex flex-col space-y-2">
                                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                        处理
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">
                                        详情
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 情景分析 - 根据目的调整 */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">
                        {analysisPurpose === 'investment' ? '投资情景分析' :
                            analysisPurpose === 'credit' ? '信贷风险情景分析' :
                                analysisPurpose === 'management' ? '经营情景分析' :
                                    '并购情景分析'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(predictionConfig.scenarios).map(([key, scenario]) => (
                            <div
                                key={key}
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedScenario === key
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setSelectedScenario(key)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">
                                        {key === 'optimistic' ? '乐观情景' :
                                            key === 'base' ? '基准情景' : '悲观情景'}
                                    </h3>
                                    <span className="text-sm text-gray-500">{scenario.probability}%</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                                <div className="space-y-1">
                                    <div className="text-sm">
                                        <span className="font-medium">预期影响：</span>
                                        <span className="text-gray-700">{scenario.impact}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 推荐措施 */}
                    <div className="mt-6 bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">推荐应对措施</h4>
                        <ul className="space-y-2">
                            {predictionConfig.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700">{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisPredictionModule;