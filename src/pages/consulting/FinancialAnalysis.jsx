import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    FileText,
    AlertTriangle,
    Calculator,
    X
} from 'lucide-react';

// 导入拆分后的模块组件
import AnalysisFinancialModule from './AnalysisFinancialModule';
import AnalysisPredictionModule from './AnalysisPredictionModule';
import AnalysisReportModule from './AnalysisReportModule';
import AnalysisToolsModule from './AnalysisToolsModule';

// 导入报告生成函数
import {
    generateInvestmentAnalysisReportHTML,
    getInvestmentAnalysisReportData
} from '../../report/InvestmentAnalysisReport';

import {
    generateCreditAssessmentReportHTML,
    getCreditAssessmentReportData
} from '../../report/CreditAssessmentReport';

import {
    generateManagementImprovementReportHTML,
    getManagementImprovementReportData
} from '../../report/ManagementImprovementReport';

import {
    generateMergerDueDiligenceReportHTML,
    getMergerDueDiligenceReportData
} from '../../report/MergerDueDiligenceReport';

const FinancialAnalysisSystem = ({ selectedCompany, userType, currentTime }) => {
    // 页面状态管理
    const [activeMainTab, setActiveMainTab] = useState('analysis');
    const [analysisPurpose, setAnalysisPurpose] = useState('investment');
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showReportSettingsModal, setShowReportSettingsModal] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedTimeRange, setSelectedTimeRange] = useState('90');
    const [selectedScenario, setSelectedScenario] = useState('base');
    const [showReportPage, setShowReportPage] = useState(false);
    const [currentReportType, setCurrentReportType] = useState(null);
    const [reportHTML, setReportHTML] = useState('');

    // 分析目的配置
    const analysisPurposes = {
        investment: {
            name: '投资决策分析',
            description: '股权投资者视角：关注未来价值创造和风险回报',
            icon: BarChart3,
            color: 'blue',
            focusAreas: ['盈利能力', '成长能力', '现金流创造', '估值水平', '资本效率'],
            primaryIndicators: ['ROE', 'ROA', 'ROIC', 'P/E', 'PEG', 'FCF', '增长率']
        },
        credit: {
            name: '信贷评估分析',
            description: '债权人视角：关注本金安全性和偿债能力',
            icon: AlertTriangle,
            color: 'green',
            focusAreas: ['偿债能力', '现金流稳定性', '资产质量', '财务风险'],
            primaryIndicators: ['流动比率', '速动比率', '利息保障倍数', '资产负债率', 'DSCR', 'Z-Score']
        },
        management: {
            name: '管理改进分析',
            description: '内部管理者视角：关注运营效率和战略执行',
            icon: Calculator,
            color: 'purple',
            focusAreas: ['营运效率', '成本控制', '预算执行', '绩效评估'],
            primaryIndicators: ['周转率', '成本费用率', '预算差异', '杜邦分析', 'EVA']
        },
        merger: {
            name: '并购尽调分析',
            description: '买方视角：关注风险识别和价值验证',
            icon: FileText,
            color: 'orange',
            focusAreas: ['财务质量', '资产负债真实性', '盈利可持续性', '协同效应'],
            primaryIndicators: ['调整后指标', '或有负债', '资产质量', '盈利质量', '协同价值']
        }
    };

    // 完整的财务数据模型
    const financialData = {
        basic: {
            totalRevenue: 120000000,
            netProfit: 28000000,
            totalAssets: 150000000,
            totalLiabilities: 60000000,
            shareholderEquity: 90000000,
            operatingCashFlow: 35000000,
            fixedAssets: 80000000,
            currentAssets: 70000000,
            currentLiabilities: 25000000,
            longTermDebt: 35000000,
            inventory: 20000000,
            accountsReceivable: 18000000,
            accountsPayable: 15000000,
            interestExpense: 2500000,
            ebitda: 32000000,
            capex: 8000000,
            operatingIncome: 30000000,
            grossProfit: 48000000,
            costOfGoodsSold: 72000000,
        },
        ratios: {
            // 偿债能力指标
            currentRatio: 2.8,
            quickRatio: 2.0,
            cashRatio: 1.2,
            debtToAssetRatio: 0.40,
            debtToEquityRatio: 0.67,
            interestCoverageRatio: 12.8,
            longTermDebtRatio: 0.28,

            // 营运能力指标
            receivablesTurnover: 6.67,
            receivablesDays: 54.7,
            inventoryTurnover: 3.6,
            inventoryDays: 101.4,
            payablesTurnover: 4.8,
            payablesDays: 76.0,
            totalAssetTurnover: 0.8,
            fixedAssetTurnover: 1.5,
            operatingCycle: 156.1,
            cashConversionCycle: 80.1,

            // 盈利能力指标
            grossMargin: 0.40,
            operatingMargin: 0.25,
            netMargin: 0.233,
            roa: 0.187,
            roe: 0.311,
            roic: 0.267,
            costProfitRatio: 0.389,

            // 发展能力指标
            revenueGrowthRate: 0.125,
            profitGrowthRate: 0.18,
            assetGrowthRate: 0.095,
            equityGrowthRate: 0.12,
            sustainableGrowthRate: 0.22,

            // 现金流指标
            operatingCashFlowRatio: 1.25,
            salesCashRatio: 0.96,
            cashFlowToCurrentLiabilitiesRatio: 1.4,
            cashFlowToDebtRatio: 0.583,
            freeCashFlow: 27000000,

            // 估值指标
            pe: 15.2,
            pb: 2.1,
            ps: 1.8,
            peg: 0.84,
            evToEbitda: 12.5,

            // 风险预警指标
            zScore: 2.85,
            fScore: 7,

            // 杜邦分析
            dupont: {
                roe: 0.311,
                netMargin: 0.233,
                assetTurnover: 0.8,
                equityMultiplier: 1.67
            }
        },
        trends: {
            revenue: [85000000, 92000000, 101000000, 112000000, 120000000],
            profit: [18000000, 21000000, 23000000, 26000000, 28000000],
            cashflow: [22000000, 26000000, 29000000, 32000000, 35000000],
            assets: [120000000, 128000000, 137000000, 145000000, 150000000],
            equity: [70000000, 75000000, 80000000, 85000000, 90000000]
        },
        yearOverYear: {
            revenue: { current: 120000000, previous: 112000000, change: 0.071 },
            profit: { current: 28000000, previous: 26000000, change: 0.077 },
            roa: { current: 0.187, previous: 0.179, change: 0.045 },
            roe: { current: 0.311, previous: 0.306, change: 0.016 }
        }
    };

    // 报告设置配置
    const [reportSettings, setReportSettings] = useState({
        // 通用设置
        general: {
            companyName: '示例公司',
            reportPeriod: 'month',
            currency: 'CNY',
            language: 'zh-CN',
            timezone: 'Asia/Shanghai'
        },
        // 内容设置
        content: {
            includeCharts: true,
            includeComparison: true,
            includeForecasting: true,
            detailLevel: 'standard',
            analysisDepth: 'comprehensive'
        },
        // 格式设置
        format: {
            outputFormat: 'PDF',
            pageSize: 'A4',
            orientation: 'portrait',
            includeWatermark: false,
            includeCoverPage: true
        },
        // 分发设置
        distribution: {
            autoSend: false,
            recipients: [],
            sendTime: '09:00',
            sendFrequency: 'manual'
        },
        // 目的特定设置
        purposeSpecific: {
            investment: {
                includeValuation: true,
                includePeerComparison: true,
                focusOnGrowth: true,
                includeESGFactors: false
            },
            credit: {
                includeRiskRating: true,
                includeCovenantTracking: true,
                stressTestScenarios: 3,
                includeCollateralAnalysis: true
            },
            management: {
                includeBudgetVariance: true,
                includeKPIDashboard: true,
                departmentBreakdown: true,
                includeActionItems: true
            },
            merger: {
                includeNormalizationAdjustments: true,
                includeQofEFindings: true,
                includeSynergiesAnalysis: true,
                includeIntegrationRisks: true
            }
        }
    });

    // 自动生成报告函数
    const generateAutoReport = () => {
        let reportData, htmlContent, windowTitle;

        switch (analysisPurpose) {
            case 'investment':
                reportData = getInvestmentAnalysisReportData();
                htmlContent = generateInvestmentAnalysisReportHTML(reportData);
                windowTitle = '投资决策分析报告';
                break;
            case 'credit':
                reportData = getCreditAssessmentReportData();
                htmlContent = generateCreditAssessmentReportHTML(reportData);
                windowTitle = '信贷评估分析报告';
                break;
            case 'management':
                reportData = getManagementImprovementReportData();
                htmlContent = generateManagementImprovementReportHTML(reportData);
                windowTitle = '管理改进分析报告';
                break;
            case 'merger':
                reportData = getMergerDueDiligenceReportData();
                htmlContent = generateMergerDueDiligenceReportHTML(reportData);
                windowTitle = '并购尽调分析报告';
                break;
            default:
                alert('请先选择分析目的');
                return;
        }

        // 在新窗口中打开报告
        const reportWindow = window.open('', '_blank');
        reportWindow.document.write(htmlContent);
        reportWindow.document.close();
        reportWindow.document.title = windowTitle;
    };

    const getColorClasses = (color) => {
        const colorMap = {
            green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
            blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
            purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', button: 'bg-purple-600 hover:bg-purple-700' },
            orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', button: 'bg-orange-600 hover:bg-orange-700' }
        };
        return colorMap[color] || colorMap.blue;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* 页面标题 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    智能财务分析
                </h1>
                <p className="text-gray-600">
                    基于AI的全方位财务分析、预测预警和报告生成平台
                </p>
            </div>

            {/* 分析目的选择器 */}
            <div className="mb-8">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">分析目的选择</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(analysisPurposes).map(([key, purpose]) => {
                            const IconComponent = purpose.icon;
                            const isSelected = analysisPurpose === key;
                            const colors = getColorClasses(purpose.color);

                            return (
                                <div
                                    key={key}
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected
                                        ? `${colors.border} ${colors.bg}`
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setAnalysisPurpose(key)}
                                >
                                    <div className="flex items-start space-x-3">
                                        <IconComponent className={`w-6 h-6 ${isSelected ? colors.text : 'text-gray-400'}`} />
                                        <div className="flex-1">
                                            <h4 className={`font-semibold ${isSelected ? colors.text : 'text-gray-900'}`}>
                                                {purpose.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {purpose.description}
                                            </p>
                                            <div className="mt-3">
                                                <div className="text-xs text-gray-500 mb-1">关注重点：</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {purpose.focusAreas.slice(0, 3).map((area, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-2 py-0.5 text-xs rounded ${isSelected ? 'bg-white bg-opacity-70' : 'bg-gray-100'
                                                                }`}
                                                        >
                                                            {area}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 主导航标签 */}
            <div className="mb-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {[
                            { id: 'analysis', name: '财务分析', icon: BarChart3 },
                            { id: 'prediction', name: '预测预警', icon: AlertTriangle },
                            { id: 'reports', name: '报告生成', icon: FileText },
                            { id: 'tools', name: '分析工具', icon: Calculator }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveMainTab(tab.id)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${activeMainTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4 mr-2" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* 财务分析模块 */}
            {activeMainTab === 'analysis' && (
                <AnalysisFinancialModule
                    analysisPurpose={analysisPurpose}
                    analysisPurposes={analysisPurposes}
                    financialData={financialData}
                    analysisProgress={analysisProgress}
                    setAnalysisProgress={setAnalysisProgress}
                    selectedModule={selectedModule}
                    setSelectedModule={setSelectedModule}
                    showDetailModal={showDetailModal}
                    setShowDetailModal={setShowDetailModal}
                />
            )}

            {/* 预测预警模块 */}
            {activeMainTab === 'prediction' && (
                <AnalysisPredictionModule
                    analysisPurpose={analysisPurpose}
                    analysisPurposes={analysisPurposes}
                    selectedTimeRange={selectedTimeRange}
                    setSelectedTimeRange={setSelectedTimeRange}
                    selectedScenario={selectedScenario}
                    setSelectedScenario={setSelectedScenario}
                />
            )}

            {/* 报告生成模块 */}
            {activeMainTab === 'reports' && (
                <AnalysisReportModule
                    analysisPurpose={analysisPurpose}
                    analysisPurposes={analysisPurposes}
                    generateAutoReport={generateAutoReport}
                    showReportSettingsModal={showReportSettingsModal}
                    setShowReportSettingsModal={setShowReportSettingsModal}
                    reportSettings={reportSettings}
                    setReportSettings={setReportSettings}
                />
            )}

            {/* 分析工具模块 */}
            {activeMainTab === 'tools' && (
                <AnalysisToolsModule />
            )}
        </div>
    );
};

export default FinancialAnalysisSystem;