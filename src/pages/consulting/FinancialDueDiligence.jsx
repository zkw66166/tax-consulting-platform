import React, { useState } from 'react';
import { Search, Zap, ExternalLink, TrendingUp, Target, Award, BarChart3, AlertTriangle, CheckCircle, Eye, Calendar, Download, Star, Calculator, LineChart, FileText, Shield, Briefcase, RotateCcw, X, Settings, Plus, Minus, Filter, ArrowUp, ArrowDown, Percent, DollarSign, Users, Building, Clock, PieChart } from 'lucide-react';
import { managedCompanies } from '../../utils/mockData';

// 导入报告模态框组件
import DueDiligenceReportModal from './modals/DueDiligenceReportModal';

// 风险评估分析器模态框
const RiskAnalyzerModal = ({ onClose }) => {
    const [activeRiskType, setActiveRiskType] = useState('credit');
    const [riskAnalysisProgress, setRiskAnalysisProgress] = useState(0);
    const [riskResults, setRiskResults] = useState(null);

    const riskTypes = [
        { id: 'credit', name: '信用风险', icon: AlertTriangle, color: 'red' },
        { id: 'liquidity', name: '流动性风险', icon: TrendingUp, color: 'blue' },
        { id: 'operational', name: '经营风险', icon: BarChart3, color: 'orange' },
        { id: 'compliance', name: '合规风险', icon: Shield, color: 'purple' }
    ];

    const startRiskAnalysis = () => {
        setRiskAnalysisProgress(0);
        const interval = setInterval(() => {
            setRiskAnalysisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setRiskResults({
                        overallRiskScore: 6.8,
                        riskLevel: '中等',
                        risks: {
                            credit: { score: 7.2, level: '中等偏高', issues: ['应收账款集中度高', '客户信用质量下降'] },
                            liquidity: { score: 5.4, level: '中等', issues: ['短期偿债压力', '现金流季节性波动'] },
                            operational: { score: 6.9, level: '中等偏高', issues: ['市场竞争激烈', '成本控制压力'] },
                            compliance: { score: 7.8, level: '较高', issues: ['内控制度执行不严', '关联交易披露不足'] }
                        }
                    });
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-900">风险评估分析器</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4">
                            {riskTypes.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveRiskType(type.id)}
                                    className={`flex items-center px-4 py-2 rounded-lg ${activeRiskType === type.id
                                            ? `bg-${type.color}-100 text-${type.color}-700`
                                            : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <type.icon className="h-4 w-4 mr-2" />
                                    {type.name}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={startRiskAnalysis}
                            disabled={riskAnalysisProgress > 0 && riskAnalysisProgress < 100}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                            {riskAnalysisProgress > 0 && riskAnalysisProgress < 100 ? '分析中...' : '开始风险评估'}
                        </button>
                    </div>

                    {riskAnalysisProgress > 0 && riskAnalysisProgress < 100 && (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">风险分析进度</span>
                                <span className="text-sm text-gray-600">{riskAnalysisProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-red-600 h-2 rounded-full transition-all duration-300" style={{ width: `${riskAnalysisProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {riskResults && (
                        <div className="space-y-6">
                            <div className="bg-red-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-red-900 mb-4">综合风险评估结果</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-red-600">{riskResults.overallRiskScore}</p>
                                        <p className="text-sm text-red-700">综合风险评分</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-red-600">{riskResults.riskLevel}</p>
                                        <p className="text-sm text-red-700">风险等级</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-red-600">4项</p>
                                        <p className="text-sm text-red-700">主要风险类型</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {Object.entries(riskResults.risks).map(([key, risk]) => {
                                    const riskType = riskTypes.find(t => t.id === key);
                                    return (
                                        <div key={key} className={`bg-${riskType.color}-50 p-4 rounded-lg`}>
                                            <div className="flex items-center mb-3">
                                                <riskType.icon className={`h-5 w-5 text-${riskType.color}-600 mr-2`} />
                                                <h4 className={`font-medium text-${riskType.color}-900`}>{riskType.name}</h4>
                                                <span className={`ml-auto px-2 py-1 text-xs bg-${riskType.color}-200 text-${riskType.color}-800 rounded`}>
                                                    {risk.level}
                                                </span>
                                            </div>
                                            <p className={`text-lg font-bold text-${riskType.color}-700 mb-2`}>评分: {risk.score}</p>
                                            <ul className={`text-sm text-${riskType.color}-800 space-y-1`}>
                                                {risk.issues.map((issue, idx) => (
                                                    <li key={idx}>• {issue}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 估值模型构建模态框
const ValuationModelModal = ({ onClose }) => {
    const [activeModel, setActiveModel] = useState('dcf');
    const [modelParams, setModelParams] = useState({
        dcf: { growthRate: 5, discountRate: 8, terminalGrowth: 2 },
        pe: { industryPE: 15, growthAdjustment: 1.2 },
        pb: { industryPB: 2.5, roeAdjustment: 1.1 }
    });
    const [valuationResults, setValuationResults] = useState(null);

    const models = [
        { id: 'dcf', name: 'DCF模型', description: '现金流折现法' },
        { id: 'pe', name: 'P/E估值', description: '市盈率估值法' },
        { id: 'pb', name: 'P/B估值', description: '市净率估值法' },
        { id: 'asset', name: '资产评估', description: '资产重置成本法' }
    ];

    const calculateValuation = () => {
        const revenue = 380000000;
        const netIncome = 45000000;
        const bookValue = 280000000;

        const results = {
            dcf: {
                value: revenue * (1 + modelParams.dcf.growthRate / 100) * 0.15 / (modelParams.dcf.discountRate / 100),
                confidence: 'A',
                assumptions: [`收入增长率: ${modelParams.dcf.growthRate}%`, `折现率: ${modelParams.dcf.discountRate}%`]
            },
            pe: {
                value: netIncome * modelParams.pe.industryPE * modelParams.pe.growthAdjustment,
                confidence: 'B+',
                assumptions: [`行业P/E: ${modelParams.pe.industryPE}`, `增长调整系数: ${modelParams.pe.growthAdjustment}`]
            },
            pb: {
                value: bookValue * modelParams.pb.industryPB * modelParams.pb.roeAdjustment,
                confidence: 'B',
                assumptions: [`行业P/B: ${modelParams.pb.industryPB}`, `ROE调整系数: ${modelParams.pb.roeAdjustment}`]
            }
        };

        const avgValue = Object.values(results).reduce((sum, r) => sum + r.value, 0) / 3;
        setValuationResults({ ...results, average: avgValue });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-900">估值模型构建</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <h3 className="font-medium text-gray-900 mb-4">选择估值模型</h3>
                            <div className="space-y-2">
                                {models.map(model => (
                                    <button
                                        key={model.id}
                                        onClick={() => setActiveModel(model.id)}
                                        className={`w-full text-left p-3 rounded-lg border ${activeModel === model.id
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <p className="font-medium">{model.name}</p>
                                        <p className="text-sm text-gray-600">{model.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-gray-900">模型参数设置</h3>
                                <button
                                    onClick={calculateValuation}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    计算估值
                                </button>
                            </div>

                            {activeModel === 'dcf' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">预期收入增长率 (%)</label>
                                        <input
                                            type="number"
                                            value={modelParams.dcf.growthRate}
                                            onChange={(e) => setModelParams({
                                                ...modelParams,
                                                dcf: { ...modelParams.dcf, growthRate: Number(e.target.value) }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">折现率 (%)</label>
                                        <input
                                            type="number"
                                            value={modelParams.dcf.discountRate}
                                            onChange={(e) => setModelParams({
                                                ...modelParams,
                                                dcf: { ...modelParams.dcf, discountRate: Number(e.target.value) }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">永续增长率 (%)</label>
                                        <input
                                            type="number"
                                            value={modelParams.dcf.terminalGrowth}
                                            onChange={(e) => setModelParams({
                                                ...modelParams,
                                                dcf: { ...modelParams.dcf, terminalGrowth: Number(e.target.value) }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeModel === 'pe' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">行业平均P/E</label>
                                        <input
                                            type="number"
                                            value={modelParams.pe.industryPE}
                                            onChange={(e) => setModelParams({
                                                ...modelParams,
                                                pe: { ...modelParams.pe, industryPE: Number(e.target.value) }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">增长调整系数</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={modelParams.pe.growthAdjustment}
                                            onChange={(e) => setModelParams({
                                                ...modelParams,
                                                pe: { ...modelParams.pe, growthAdjustment: Number(e.target.value) }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeModel === 'pb' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">行业平均P/B</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={modelParams.pb.industryPB}
                                            onChange={(e) => setModelParams({
                                                ...modelParams,
                                                pb: { ...modelParams.pb, industryPB: Number(e.target.value) }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ROE调整系数</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={modelParams.pb.roeAdjustment}
                                            onChange={(e) => setModelParams({
                                                ...modelParams,
                                                pb: { ...modelParams.pb, roeAdjustment: Number(e.target.value) }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            )}

                            {valuationResults && (
                                <div className="mt-6 space-y-4">
                                    <h4 className="font-medium text-gray-900">估值结果</h4>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-lg font-bold text-green-700">
                                            综合估值: {(valuationResults.average / 100000000).toFixed(1)}亿元
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-blue-50 p-3 rounded">
                                            <p className="font-medium text-blue-900">DCF估值</p>
                                            <p className="text-blue-700">{(valuationResults.dcf.value / 100000000).toFixed(1)}亿元</p>
                                            <p className="text-xs text-blue-600">可信度: {valuationResults.dcf.confidence}</p>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded">
                                            <p className="font-medium text-purple-900">P/E估值</p>
                                            <p className="text-purple-700">{(valuationResults.pe.value / 100000000).toFixed(1)}亿元</p>
                                            <p className="text-xs text-purple-600">可信度: {valuationResults.pe.confidence}</p>
                                        </div>
                                        <div className="bg-orange-50 p-3 rounded">
                                            <p className="font-medium text-orange-900">P/B估值</p>
                                            <p className="text-orange-700">{(valuationResults.pb.value / 100000000).toFixed(1)}亿元</p>
                                            <p className="text-xs text-orange-600">可信度: {valuationResults.pb.confidence}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 财务健康诊断模态框
const FinancialHealthModal = ({ onClose }) => {
    const [diagnosisProgress, setDiagnosisProgress] = useState(0);
    const [healthResults, setHealthResults] = useState(null);

    const startDiagnosis = () => {
        setDiagnosisProgress(0);
        const interval = setInterval(() => {
            setDiagnosisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setHealthResults({
                        overallScore: 8.2,
                        grade: 'A-',
                        categories: {
                            solvency: { score: 8.5, grade: 'A', status: '优秀' },
                            operation: { score: 7.8, grade: 'B+', status: '良好' },
                            profitability: { score: 8.7, grade: 'A', status: '优秀' },
                            growth: { score: 7.9, grade: 'B+', status: '良好' }
                        },
                        recommendations: [
                            '继续保持良好的盈利能力和偿债能力',
                            '可适当优化资产周转效率',
                            '关注现金流质量的持续改善',
                            '在风险可控前提下可考虑适度扩张'
                        ]
                    });
                    return 100;
                }
                return prev + 4;
            });
        }, 100);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-900">财务健康诊断</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">全面财务健康评估</h3>
                        <button
                            onClick={startDiagnosis}
                            disabled={diagnosisProgress > 0 && diagnosisProgress < 100}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {diagnosisProgress > 0 && diagnosisProgress < 100 ? '诊断中...' : '开始健康诊断'}
                        </button>
                    </div>

                    {diagnosisProgress > 0 && diagnosisProgress < 100 && (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">财务健康诊断进度</span>
                                <span className="text-sm text-gray-600">{diagnosisProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${diagnosisProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {healthResults && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">综合健康评估</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-blue-600">{healthResults.overallScore}</p>
                                        <p className="text-sm text-gray-600">综合健康评分</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-green-600">{healthResults.grade}</p>
                                        <p className="text-sm text-gray-600">健康等级</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-purple-600">健康良好</p>
                                        <p className="text-sm text-gray-600">整体状况</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                                        <h4 className="font-medium text-green-900">偿债能力</h4>
                                        <span className="ml-auto px-2 py-1 text-xs bg-green-200 text-green-800 rounded">
                                            {healthResults.categories.solvency.status}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-700">{healthResults.categories.solvency.score}</p>
                                    <p className="text-sm text-green-600">等级: {healthResults.categories.solvency.grade}</p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                        <RotateCcw className="h-5 w-5 text-blue-600 mr-2" />
                                        <h4 className="font-medium text-blue-900">营运能力</h4>
                                        <span className="ml-auto px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded">
                                            {healthResults.categories.operation.status}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-700">{healthResults.categories.operation.score}</p>
                                    <p className="text-sm text-blue-600">等级: {healthResults.categories.operation.grade}</p>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                        <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                                        <h4 className="font-medium text-purple-900">盈利能力</h4>
                                        <span className="ml-auto px-2 py-1 text-xs bg-purple-200 text-purple-800 rounded">
                                            {healthResults.categories.profitability.status}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-700">{healthResults.categories.profitability.score}</p>
                                    <p className="text-sm text-purple-600">等级: {healthResults.categories.profitability.grade}</p>
                                </div>

                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-3">
                                        <ArrowUp className="h-5 w-5 text-orange-600 mr-2" />
                                        <h4 className="font-medium text-orange-900">发展能力</h4>
                                        <span className="ml-auto px-2 py-1 text-xs bg-orange-200 text-orange-800 rounded">
                                            {healthResults.categories.growth.status}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-orange-700">{healthResults.categories.growth.score}</p>
                                    <p className="text-sm text-orange-600">等级: {healthResults.categories.growth.grade}</p>
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h4 className="font-medium text-yellow-900 mb-3">改善建议</h4>
                                <ul className="text-sm text-yellow-800 space-y-2">
                                    {healthResults.recommendations.map((rec, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 报告自动生成模态框
const ReportGeneratorModal = ({ onClose }) => {
    const [reportConfig, setReportConfig] = useState({
        template: 'standard',
        sections: {
            executive: true,
            financial: true,
            risk: true,
            valuation: true,
            recommendation: true
        },
        format: 'pdf',
        language: 'chinese'
    });
    const [generationProgress, setGenerationProgress] = useState(0);
    const [reportGenerated, setReportGenerated] = useState(false);

    const templates = [
        { id: 'standard', name: '标准尽调报告', description: '包含完整的财务分析和风险评估' },
        { id: 'investment', name: '投资决策报告', description: '专注于投资建议和估值分析' },
        { id: 'risk', name: '风险评估报告', description: '重点关注各类风险因素' },
        { id: 'custom', name: '自定义模板', description: '根据需要自定义报告内容' }
    ];

    const generateReport = () => {
        setGenerationProgress(0);
        const interval = setInterval(() => {
            setGenerationProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setReportGenerated(true);
                    return 100;
                }
                return prev + 8;
            });
        }, 200);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-900">报告自动生成</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-gray-900 mb-4">选择报告模板</h3>
                            <div className="space-y-3">
                                {templates.map(template => (
                                    <label key={template.id} className="flex items-start cursor-pointer">
                                        <input
                                            type="radio"
                                            name="template"
                                            value={template.id}
                                            checked={reportConfig.template === template.id}
                                            onChange={(e) => setReportConfig({ ...reportConfig, template: e.target.value })}
                                            className="mt-1 mr-3"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">{template.name}</p>
                                            <p className="text-sm text-gray-600">{template.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <h3 className="font-medium text-gray-900 mb-4 mt-6">报告格式</h3>
                            <div className="space-y-2">
                                {[
                                    { id: 'pdf', name: 'PDF文档', icon: FileText },
                                    { id: 'word', name: 'Word文档', icon: FileText },
                                    { id: 'excel', name: 'Excel表格', icon: BarChart3 }
                                ].map(format => (
                                    <label key={format.id} className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="format"
                                            value={format.id}
                                            checked={reportConfig.format === format.id}
                                            onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
                                            className="mr-3"
                                        />
                                        <format.icon className="h-4 w-4 mr-2" />
                                        {format.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-900 mb-4">报告内容配置</h3>
                            <div className="space-y-3">
                                {[
                                    { key: 'executive', label: '执行摘要', desc: '关键发现和投资建议概述' },
                                    { key: 'financial', label: '财务分析', desc: '详细的财务指标分析' },
                                    { key: 'risk', label: '风险评估', desc: '全面的风险识别和评估' },
                                    { key: 'valuation', label: '估值分析', desc: '多种估值方法和结果' },
                                    { key: 'recommendation', label: '投资建议', desc: '基于分析的投资建议' }
                                ].map(section => (
                                    <label key={section.key} className="flex items-start cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={reportConfig.sections[section.key]}
                                            onChange={(e) => setReportConfig({
                                                ...reportConfig,
                                                sections: {
                                                    ...reportConfig.sections,
                                                    [section.key]: e.target.checked
                                                }
                                            })}
                                            className="mt-1 mr-3"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">{section.label}</p>
                                            <p className="text-sm text-gray-600">{section.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={generateReport}
                                    disabled={generationProgress > 0 && generationProgress < 100}
                                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                                >
                                    {generationProgress > 0 && generationProgress < 100 ? '生成中...' : '生成报告'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {generationProgress > 0 && (
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">报告生成进度</span>
                                <span className="text-sm text-gray-600">{generationProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: `${generationProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {reportGenerated && (
                        <div className="mt-6 bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-green-900">报告生成完成</p>
                                    <p className="text-sm text-green-700">尽职调查报告已成功生成，可以下载查看</p>
                                </div>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                                    <Download className="h-4 w-4 mr-2" />
                                    下载报告
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 行业对标分析模态框
const IndustryBenchmarkModal = ({ onClose }) => {
    const [selectedIndustry, setSelectedIndustry] = useState('technology');
    const [benchmarkData, setBenchmarkData] = useState(null);
    const [analysisProgress, setAnalysisProgress] = useState(0);

    const industries = [
        { id: 'technology', name: '科技软件', companies: 156 },
        { id: 'manufacturing', name: '制造业', companies: 243 },
        { id: 'retail', name: '零售贸易', companies: 189 },
        { id: 'finance', name: '金融服务', companies: 98 }
    ];

    const startBenchmark = () => {
        setAnalysisProgress(0);
        const interval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setBenchmarkData({
                        position: {
                            revenue: { rank: 12, percentile: 85, industry_avg: 2.8 },
                            profitability: { rank: 8, percentile: 92, industry_avg: 8.5 },
                            growth: { rank: 15, percentile: 78, industry_avg: 12.3 },
                            efficiency: { rank: 20, percentile: 70, industry_avg: 1.8 }
                        },
                        competitors: [
                            { name: '领先企业A', revenue: 4.2, growth: 25.6, margin: 15.2 },
                            { name: '同行企业B', revenue: 3.1, growth: 18.9, margin: 12.8 },
                            { name: '竞争对手C', revenue: 2.9, growth: 14.2, margin: 11.5 }
                        ]
                    });
                    return 100;
                }
                return prev + 6;
            });
        }, 150);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-900">行业对标分析</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">选择对标行业</h3>
                            <div className="flex flex-wrap gap-3">
                                {industries.map(industry => (
                                    <button
                                        key={industry.id}
                                        onClick={() => setSelectedIndustry(industry.id)}
                                        className={`px-4 py-2 rounded-lg border ${selectedIndustry === industry.id
                                                ? 'bg-orange-100 border-orange-500 text-orange-700'
                                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <p className="font-medium">{industry.name}</p>
                                        <p className="text-xs">{industry.companies}家企业</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={startBenchmark}
                            disabled={analysisProgress > 0 && analysisProgress < 100}
                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 whitespace-nowrap"
                        >
                            {analysisProgress > 0 && analysisProgress < 100 ? '分析中...' : '开始对标分析'}
                        </button>
                    </div>

                    {analysisProgress > 0 && analysisProgress < 100 && (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">对标分析进度</span>
                                <span className="text-sm text-gray-600">{analysisProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-orange-600 h-2 rounded-full transition-all duration-300" style={{ width: `${analysisProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {benchmarkData && (
                        <div className="space-y-6">
                            <div className="bg-orange-50 p-6 rounded-lg">
                                <h4 className="font-medium text-orange-900 mb-4">行业竞争地位</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-orange-700">第{benchmarkData.position.revenue.rank}名</p>
                                        <p className="text-sm text-orange-600">收入规模排名</p>
                                    </div>
                                    <div className="text-center">
                                        <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-green-700">第{benchmarkData.position.profitability.rank}名</p>
                                        <p className="text-sm text-green-600">盈利能力排名</p>
                                    </div>
                                    <div className="text-center">
                                        <ArrowUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-blue-700">第{benchmarkData.position.growth.rank}名</p>
                                        <p className="text-sm text-blue-600">成长性排名</p>
                                    </div>
                                    <div className="text-center">
                                        <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-purple-700">第{benchmarkData.position.efficiency.rank}名</p>
                                        <p className="text-sm text-purple-600">运营效率排名</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-4">关键指标对比</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm text-gray-600">收入规模 (亿元)</span>
                                                <span className="text-sm font-medium">3.8 vs {benchmarkData.position.revenue.industry_avg}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">超越{benchmarkData.position.revenue.percentile}%同行</p>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm text-gray-600">净利润率 (%)</span>
                                                <span className="text-sm font-medium">11.8 vs {benchmarkData.position.profitability.industry_avg}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">超越{benchmarkData.position.profitability.percentile}%同行</p>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm text-gray-600">收入增长率 (%)</span>
                                                <span className="text-sm font-medium">18.5 vs {benchmarkData.position.growth.industry_avg}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">超越{benchmarkData.position.growth.percentile}%同行</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-4">主要竞争对手</h4>
                                    <div className="space-y-3">
                                        {benchmarkData.competitors.map((competitor, idx) => (
                                            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                                <div>
                                                    <p className="font-medium text-gray-900">{competitor.name}</p>
                                                    <p className="text-xs text-gray-600">收入: {competitor.revenue}亿 | 增长: {competitor.growth}%</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">{competitor.margin}%</p>
                                                    <p className="text-xs text-gray-600">净利润率</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-2">竞争地位分析</h4>
                                <p className="text-sm text-blue-800">
                                    该企业在所选行业中表现优异，盈利能力位居前列，收入规模处于行业领先地位。
                                    建议继续保持技术创新优势，关注成长性指标的持续改善。
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 合规性检查模态框
const ComplianceCheckModal = ({ onClose }) => {
    const [checkProgress, setCheckProgress] = useState(0);
    const [complianceResults, setComplianceResults] = useState(null);
    const [activeCategory, setActiveCategory] = useState('accounting');

    const categories = [
        { id: 'accounting', name: '会计准则', icon: Calculator },
        { id: 'disclosure', name: '信息披露', icon: Eye },
        { id: 'internal', name: '内控制度', icon: Shield },
        { id: 'audit', name: '审计意见', icon: CheckCircle }
    ];

    const startComplianceCheck = () => {
        setCheckProgress(0);
        const interval = setInterval(() => {
            setCheckProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setComplianceResults({
                        overallScore: 7.5,
                        riskLevel: '中等',
                        categories: {
                            accounting: {
                                score: 8.2,
                                status: '基本合规',
                                issues: ['部分会计政策需要完善', '收入确认时点需要统一']
                            },
                            disclosure: {
                                score: 6.8,
                                status: '需要改进',
                                issues: ['关联交易披露不充分', '重大事项披露滞后']
                            },
                            internal: {
                                score: 7.1,
                                status: '基本健全',
                                issues: ['内控执行存在薄弱环节', '风险识别机制待完善']
                            },
                            audit: {
                                score: 8.5,
                                status: '意见良好',
                                issues: ['审计师独立性良好', '审计质量较高']
                            }
                        },
                        recommendations: [
                            '完善会计政策手册，统一核算标准',
                            '加强关联交易的识别和披露',
                            '建立健全内控制度执行监督机制',
                            '定期开展合规性自查和整改'
                        ]
                    });
                    return 100;
                }
                return prev + 5;
            });
        }, 120);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-900">合规性检查</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">全面合规性评估</h3>
                            <div className="flex flex-wrap gap-3">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex items-center px-4 py-2 rounded-lg ${activeCategory === category.id
                                                ? 'bg-teal-100 text-teal-700'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        <category.icon className="h-4 w-4 mr-2" />
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={startComplianceCheck}
                            disabled={checkProgress > 0 && checkProgress < 100}
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 whitespace-nowrap"
                        >
                            {checkProgress > 0 && checkProgress < 100 ? '检查中...' : '开始合规检查'}
                        </button>
                    </div>

                    {checkProgress > 0 && checkProgress < 100 && (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">合规性检查进度</span>
                                <span className="text-sm text-gray-600">{checkProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-teal-600 h-2 rounded-full transition-all duration-300" style={{ width: `${checkProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {complianceResults && (
                        <div className="space-y-6">
                            <div className="bg-teal-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-teal-900 mb-4">合规性评估概况</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-teal-600">{complianceResults.overallScore}</p>
                                        <p className="text-sm text-teal-700">综合合规评分</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-teal-600">{complianceResults.riskLevel}</p>
                                        <p className="text-sm text-teal-700">合规风险等级</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-teal-600">4项</p>
                                        <p className="text-sm text-teal-700">检查维度</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {Object.entries(complianceResults.categories).map(([key, result]) => {
                                    const category = categories.find(c => c.id === key);
                                    const statusColor = result.score >= 8 ? 'green' : result.score >= 7 ? 'yellow' : 'red';

                                    return (
                                        <div key={key} className={`bg-${statusColor}-50 p-4 rounded-lg`}>
                                            <div className="flex items-center mb-3">
                                                <category.icon className={`h-5 w-5 text-${statusColor}-600 mr-2`} />
                                                <h4 className={`font-medium text-${statusColor}-900`}>{category.name}</h4>
                                                <span className={`ml-auto px-2 py-1 text-xs bg-${statusColor}-200 text-${statusColor}-800 rounded`}>
                                                    {result.status}
                                                </span>
                                            </div>
                                            <p className={`text-lg font-bold text-${statusColor}-700 mb-2`}>评分: {result.score}</p>
                                            <ul className={`text-sm text-${statusColor}-800 space-y-1`}>
                                                {result.issues.map((issue, idx) => (
                                                    <li key={idx}>• {issue}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-amber-50 p-4 rounded-lg">
                                <h4 className="font-medium text-amber-900 mb-3">改进建议</h4>
                                <ul className="text-sm text-amber-800 space-y-2">
                                    {complianceResults.recommendations.map((rec, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <Target className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};



const FinancialDueDiligence = ({ selectedCompany, userType, currentTime, selectedCompanies, isProfessionalView }) => {
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [dueDiligenceResults, setDueDiligenceResults] = useState(null);
    const [activeSection, setActiveSection] = useState('historical-analysis');

    // 各种模态框状态
    const [showDetailReport, setShowDetailReport] = useState(false);
    const [showRiskAnalyzer, setShowRiskAnalyzer] = useState(false);
    const [showValuationModel, setShowValuationModel] = useState(false);
    const [showFinancialHealth, setShowFinancialHealth] = useState(false);
    const [showReportGenerator, setShowReportGenerator] = useState(false);
    const [showIndustryBenchmark, setShowIndustryBenchmark] = useState(false);
    const [showComplianceCheck, setShowComplianceCheck] = useState(false);

    const mockData = {
        companyMetrics: {
            revenue: 380000000, // 3.8亿
            assets: 560000000,  // 5.6亿
            liabilities: 280000000, // 2.8亿
            netProfit: 45000000, // 4500万
            cashFlow: 52000000,  // 5200万
            riskScore: 7.8,
            healthScore: 8.2
        }
    };

    const sections = [
        { id: 'historical-analysis', title: '历史财务表现分析' },
        { id: 'asset-quality', title: '资产质量评估' },
        { id: 'liability-assessment', title: '负债和或有负债识别' },
        { id: 'cashflow-analysis', title: '现金流分析' },
        { id: 'financial-management', title: '财务管理体系评估' },
        { id: 'profit-forecast', title: '盈利预测和财务模型' }
    ];

    const generateDueDiligenceReport = () => {
        setAnalysisProgress(0);
        const interval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setDueDiligenceResults({
                        overallRating: 'B+',
                        riskLevel: '中等',
                        investmentRecommendation: '建议投资',
                        keyFindings: [
                            {
                                category: '财务表现',
                                rating: 'A-',
                                description: '过去三年收入稳定增长，盈利能力良好',
                                risks: ['季节性波动较大', '客户集中度偏高'],
                                opportunities: ['新产品线增长潜力', '市场扩张机会']
                            },
                            {
                                category: '资产质量',
                                rating: 'B+',
                                description: '整体资产质量良好，应收账款管理有待加强',
                                risks: ['应收账款账龄较长', '存货周转率下降'],
                                opportunities: ['优化供应链管理', '提升资产使用效率']
                            },
                            {
                                category: '现金流',
                                rating: 'A',
                                description: '经营性现金流充沛，资金状况健康',
                                risks: ['投资支出较大', '短期债务压力'],
                                opportunities: ['现金流稳定增长', '融资能力强']
                            }
                        ],
                        valuationRange: {
                            low: 450000000,
                            high: 680000000,
                            recommended: 565000000
                        },
                        criticalIssues: [
                            '关联交易披露不充分',
                            '内控制度执行存在薄弱环节',
                            '或有负债风险需要关注'
                        ]
                    });
                    return 100;
                }
                return prev + 4;
            });
        }, 100);
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'historical-analysis':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">历史财务表现分析</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-2">财务报表审查</h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• 过去3-5年资产负债表分析</li>
                                    <li>• 利润表趋势分析</li>
                                    <li>• 现金流量表评估</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-medium text-green-900 mb-2">关键指标分析</h4>
                                <ul className="text-sm text-green-800 space-y-1">
                                    <li>• 收入增长趋势</li>
                                    <li>• 盈利能力变化</li>
                                    <li>• 资产质量状况</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">重点关注事项</h4>
                            <p className="text-sm text-gray-700">
                                收入确认政策的合理性、成本费用的真实性以及会计政策的一致性
                            </p>
                        </div>
                    </div>
                );
            case 'asset-quality':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">资产质量评估</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h4 className="font-medium text-yellow-900 mb-2">应收账款分析</h4>
                                <ul className="text-sm text-yellow-800 space-y-1">
                                    <li>• 账龄结构分析</li>
                                    <li>• 回收风险评估</li>
                                    <li>• 坏账准备合理性</li>
                                </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-medium text-purple-900 mb-2">存货评估</h4>
                                <ul className="text-sm text-purple-800 space-y-1">
                                    <li>• 真实价值评估</li>
                                    <li>• 周转效率分析</li>
                                    <li>• 减值风险识别</li>
                                </ul>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <h4 className="font-medium text-indigo-900 mb-2">固定资产审查</h4>
                                <ul className="text-sm text-indigo-800 space-y-1">
                                    <li>• 使用状况评估</li>
                                    <li>• 折旧政策合理性</li>
                                    <li>• 减值风险分析</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <h4 className="font-medium text-orange-900 mb-2">无形资产评估</h4>
                            <p className="text-sm text-orange-800">
                                评估无形资产的价值构成和摊销政策，包括专利、商标、软件等
                            </p>
                        </div>
                    </div>
                );
            case 'liability-assessment':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">负债和或有负债识别</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-medium text-red-900 mb-2">负债核实</h4>
                                <ul className="text-sm text-red-800 space-y-1">
                                    <li>• 银行借款核实</li>
                                    <li>• 应付账款确认</li>
                                    <li>• 预收款项分析</li>
                                    <li>• 其他应付款审查</li>
                                </ul>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg">
                                <h4 className="font-medium text-pink-900 mb-2">或有负债识别</h4>
                                <ul className="text-sm text-pink-800 space-y-1">
                                    <li>• 诉讼赔偿风险</li>
                                    <li>• 担保责任评估</li>
                                    <li>• 环保责任识别</li>
                                    <li>• 其他表外风险</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'cashflow-analysis':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">现金流分析</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-emerald-50 p-4 rounded-lg">
                                <h4 className="font-medium text-emerald-900 mb-2">经营性现金流</h4>
                                <ul className="text-sm text-emerald-800 space-y-1">
                                    <li>• 现金流质量分析</li>
                                    <li>• 可持续性评估</li>
                                    <li>• 与利润匹配度</li>
                                </ul>
                            </div>
                            <div className="bg-cyan-50 p-4 rounded-lg">
                                <h4 className="font-medium text-cyan-900 mb-2">投资性现金流</h4>
                                <ul className="text-sm text-cyan-800 space-y-1">
                                    <li>• 投资项目合理性</li>
                                    <li>• 资本支出效率</li>
                                    <li>• 投资回报分析</li>
                                </ul>
                            </div>
                            <div className="bg-teal-50 p-4 rounded-lg">
                                <h4 className="font-medium text-teal-900 mb-2">筹资性现金流</h4>
                                <ul className="text-sm text-teal-800 space-y-1">
                                    <li>• 融资结构分析</li>
                                    <li>• 偿债能力评估</li>
                                    <li>• 资金成本评估</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'financial-management':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">财务管理体系评估</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-medium text-slate-900 mb-2">制度和内控</h4>
                                <ul className="text-sm text-slate-800 space-y-1">
                                    <li>• 财务管理制度完善性</li>
                                    <li>• 内控体系有效性</li>
                                    <li>• 风险管控机制</li>
                                </ul>
                            </div>
                            <div className="bg-stone-50 p-4 rounded-lg">
                                <h4 className="font-medium text-stone-900 mb-2">关键流程</h4>
                                <ul className="text-sm text-stone-800 space-y-1">
                                    <li>• 预算管理流程</li>
                                    <li>• 成本控制体系</li>
                                    <li>• 资金管理制度</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-neutral-50 p-4 rounded-lg">
                            <h4 className="font-medium text-neutral-900 mb-2">团队能力评估</h4>
                            <p className="text-sm text-neutral-800">
                                评估财务团队的专业能力和管理水平，包括人员配置、专业资质、经验水平等
                            </p>
                        </div>
                    </div>
                );
            case 'profit-forecast':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">盈利预测和财务模型</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-violet-50 p-4 rounded-lg">
                                <h4 className="font-medium text-violet-900 mb-2">财务预测模型</h4>
                                <ul className="text-sm text-violet-800 space-y-1">
                                    <li>• 基于历史数据建模</li>
                                    <li>• 行业趋势分析</li>
                                    <li>• 敏感性分析</li>
                                </ul>
                            </div>
                            <div className="bg-fuchsia-50 p-4 rounded-lg">
                                <h4 className="font-medium text-fuchsia-900 mb-2">假设评估</h4>
                                <ul className="text-sm text-fuchsia-800 space-y-1">
                                    <li>• 关键假设合理性</li>
                                    <li>• 未来盈利能力</li>
                                    <li>• 现金流生成能力</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-rose-50 p-4 rounded-lg">
                            <h4 className="font-medium text-rose-900 mb-2">价值创造分析</h4>
                            <p className="text-sm text-rose-800">
                                识别潜在的财务风险和价值创造机会，为投资决策提供可靠的财务信息基础
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* 尽职调查控制面板 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Search className="h-6 w-6 mr-2 text-blue-600" />
                        财务尽职调查智能分析
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={generateDueDiligenceReport}
                            disabled={analysisProgress > 0 && analysisProgress < 100}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                        >
                            {analysisProgress > 0 && analysisProgress < 100 ? (
                                <>
                                    <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                                    分析中...
                                </>
                            ) : (
                                <>
                                    <Zap className="h-4 w-4 mr-2" />
                                    生成尽调报告
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setShowDetailReport(true)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            查看详细报告
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
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${analysisProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* 关键财务指标概览 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{(mockData.companyMetrics.revenue / 100000000).toFixed(1)}亿</p>
                        <p className="text-sm text-gray-600">年营业收入</p>
                        <p className="text-xs text-blue-600 mt-1">同比增长18.5%</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{(mockData.companyMetrics.netProfit / 10000).toFixed(0)}万</p>
                        <p className="text-sm text-gray-600">净利润</p>
                        <p className="text-xs text-green-600 mt-1">利润率11.8%</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Target className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">{mockData.companyMetrics.healthScore}</p>
                        <p className="text-sm text-gray-600">财务健康评分</p>
                        <p className="text-xs text-purple-600 mt-1">满分10分</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">{mockData.companyMetrics.riskScore}</p>
                        <p className="text-sm text-gray-600">风险评级分数</p>
                        <p className="text-xs text-orange-600 mt-1">中等风险水平</p>
                    </div>
                </div>
            </div>

            {/* 尽调结果展示 */}
            {dueDiligenceResults && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                        尽职调查结果概要
                        <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            综合评级: {dueDiligenceResults.overallRating}
                        </span>
                    </h3>

                    {/* 投资建议和估值 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-2">投资建议</h4>
                            <p className="text-lg font-bold text-green-700">{dueDiligenceResults.investmentRecommendation}</p>
                            <p className="text-sm text-green-600">风险等级: {dueDiligenceResults.riskLevel}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">估值范围</h4>
                            <p className="text-lg font-bold text-blue-700">
                                {(dueDiligenceResults.valuationRange.recommended / 100000000).toFixed(1)}亿元
                            </p>
                            <p className="text-sm text-blue-600">
                                区间: {(dueDiligenceResults.valuationRange.low / 100000000).toFixed(1)}-
                                {(dueDiligenceResults.valuationRange.high / 100000000).toFixed(1)}亿元
                            </p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-medium text-yellow-900 mb-2">关键问题</h4>
                            <p className="text-lg font-bold text-yellow-700">{dueDiligenceResults.criticalIssues.length}个</p>
                            <p className="text-sm text-yellow-600">需要重点关注</p>
                        </div>
                    </div>

                    {/* 详细分析结果 */}
                    <div className="space-y-6">
                        {dueDiligenceResults.keyFindings.map((finding, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-lg">{finding.category}</h4>
                                        <p className="text-sm text-gray-600">{finding.description}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${finding.rating.startsWith('A') ? 'bg-green-100 text-green-800' :
                                        finding.rating.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {finding.rating}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <h5 className="font-medium text-red-900 mb-2 flex items-center">
                                            <AlertTriangle className="h-4 w-4 mr-2" />
                                            识别风险
                                        </h5>
                                        <ul className="text-sm text-red-800 space-y-1">
                                            {finding.risks.map((risk, idx) => (
                                                <li key={idx}>• {risk}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h5 className="font-medium text-green-900 mb-2 flex items-center">
                                            <TrendingUp className="h-4 w-4 mr-2" />
                                            发展机会
                                        </h5>
                                        <ul className="text-sm text-green-800 space-y-1">
                                            {finding.opportunities.map((opportunity, idx) => (
                                                <li key={idx}>• {opportunity}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 关键问题提醒 */}
                    <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <h4 className="font-medium text-yellow-900 mb-2">需要重点关注的问题</h4>
                        <ul className="text-sm text-yellow-800 space-y-1">
                            {dueDiligenceResults.criticalIssues.map((issue, idx) => (
                                <li key={idx}>• {issue}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* 详细分析模块 */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <Search className="h-6 w-6 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">详细财务分析</h2>
                    </div>

                    {/* 左侧导航和右侧内容 */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* 左侧导航 */}
                        <div className="lg:col-span-1">
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === section.id
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* 右侧内容 */}
                        <div className="lg:col-span-3">
                            {renderSectionContent()}
                        </div>
                    </div>
                </div>
            </div>

            {/* 尽调工具箱 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-indigo-600" />
                    尽职调查工具箱
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">风险评估分析器</h4>
                        <p className="text-sm text-gray-600 mb-4">智能识别和量化各类财务风险，提供风险预警</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 信用风险评估 • 流动性风险 • 经营风险 • 合规风险
                        </div>
                        <button
                            onClick={() => setShowRiskAnalyzer(true)}
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            开始风险评估
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <LineChart className="h-12 w-12 text-green-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">估值模型构建</h4>
                        <p className="text-sm text-gray-600 mb-4">基于财务数据构建多种估值模型，评估企业价值</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • DCF模型 • 可比公司法 • P/E估值 • 资产评估法
                        </div>
                        <button
                            onClick={() => setShowValuationModel(true)}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            构建估值模型
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <Shield className="h-12 w-12 text-blue-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">财务健康诊断</h4>
                        <p className="text-sm text-gray-600 mb-4">全面评估企业财务健康状况，生成诊断报告</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 偿债能力 • 营运能力 • 盈利能力 • 发展能力
                        </div>
                        <button
                            onClick={() => setShowFinancialHealth(true)}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            开始健康诊断
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <FileText className="h-12 w-12 text-purple-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">报告自动生成</h4>
                        <p className="text-sm text-gray-600 mb-4">一键生成标准化尽职调查报告，支持自定义模板</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 标准模板 • 自定义格式 • 图表生成 • 导出功能
                        </div>
                        <button
                            onClick={() => setShowReportGenerator(true)}
                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            生成报告
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <BarChart3 className="h-12 w-12 text-orange-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">行业对标分析</h4>
                        <p className="text-sm text-gray-600 mb-4">与同行业企业进行多维度对比分析</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 财务指标对比 • 行业排名 • 竞争地位 • 发展趋势
                        </div>
                        <button
                            onClick={() => setShowIndustryBenchmark(true)}
                            className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                        >
                            开始对标
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <CheckCircle className="h-12 w-12 text-teal-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">合规性检查</h4>
                        <p className="text-sm text-gray-600 mb-4">检查财务数据的合规性和真实性</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 会计准则符合性 • 披露完整性 • 内控有效性 • 审计意见
                        </div>
                        <button
                            onClick={() => setShowComplianceCheck(true)}
                            className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        >
                            开始检查
                        </button>
                    </div>
                </div>
            </div>

            {/* 底部说明 */}
            <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>财务尽职调查目标：</strong>为投资决策提供可靠的财务信息基础，识别潜在的财务风险和价值创造机会。
                    通过全面深入的财务分析过程，帮助投资者做出明智的决策。
                </p>
            </div>

            {/* 各种模态框 */}
            {showDetailReport && (
                <DueDiligenceReportModal onClose={() => setShowDetailReport(false)} />
            )}
            {showRiskAnalyzer && (
                <RiskAnalyzerModal onClose={() => setShowRiskAnalyzer(false)} />
            )}
            {showValuationModel && (
                <ValuationModelModal onClose={() => setShowValuationModel(false)} />
            )}
            {showFinancialHealth && (
                <FinancialHealthModal onClose={() => setShowFinancialHealth(false)} />
            )}
            {showReportGenerator && (
                <ReportGeneratorModal onClose={() => setShowReportGenerator(false)} />
            )}
            {showIndustryBenchmark && (
                <IndustryBenchmarkModal onClose={() => setShowIndustryBenchmark(false)} />
            )}
            {showComplianceCheck && (
                <ComplianceCheckModal onClose={() => setShowComplianceCheck(false)} />
            )}
        </div>
    );
};

export default FinancialDueDiligence;