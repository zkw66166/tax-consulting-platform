import React from 'react';
import {
    Brain, Database, Gauge, Radar, LineChart, ArrowUpDown, FileSpreadsheet,
    Receipt, Activity, Lightbulb, ExternalLink
} from 'lucide-react';

const OverviewTab = ({ mockData, handleModuleAction }) => {
    return (
        <div className="space-y-8">
            {/* 企业智能画像状态 */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-slate-600" />
                    企业智能画像
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-100 text-sm">画像完整度</p>
                                <p className="text-3xl font-bold">{mockData.enterprisePortrait.completeness}%</p>
                                <p className="text-xs text-slate-200 mt-1">
                                    数据质量 {mockData.enterprisePortrait.dataQuality}%
                                </p>
                            </div>
                            <Gauge className="h-8 w-8 text-slate-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-pink-100 text-sm">风险评分</p>
                                <p className="text-3xl font-bold">{mockData.enterprisePortrait.riskScore}</p>
                                <p className="text-xs text-pink-200 mt-1">
                                    {mockData.enterprisePortrait.riskScore >= 80 ? '高风险' :
                                        mockData.enterprisePortrait.riskScore >= 60 ? '中风险' : '低风险'}
                                </p>
                            </div>
                            <Radar className="h-8 w-8 text-pink-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100 text-sm">财务健康</p>
                                <p className="text-3xl font-bold">{mockData.enterprisePortrait.financialHealth}</p>
                                <p className="text-xs text-emerald-200 mt-1">
                                    健康状况良好
                                </p>
                            </div>
                            <LineChart className="h-8 w-8 text-emerald-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sky-100 text-sm">税务效率</p>
                                <p className="text-3xl font-bold">{mockData.enterprisePortrait.taxEfficiency}</p>
                                <p className="text-xs text-sky-200 mt-1">
                                    有优化空间
                                </p>
                            </div>
                            <ArrowUpDown className="h-8 w-8 text-sky-200" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 数据源状态 */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-sky-600" />
                    数据源状态
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900">核心财务数据</h4>
                            <FileSpreadsheet className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">企业登记信息</span>
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                    {mockData.dataSourceStatus.businessRegistration.completeness}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">财务报表</span>
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                    {mockData.dataSourceStatus.financialStatements.completeness}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">科目余额表</span>
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                    {mockData.dataSourceStatus.subjectBalance.completeness}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900">税务数据</h4>
                            <Receipt className="h-5 w-5 text-sky-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">纳税申报表</span>
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                    {mockData.dataSourceStatus.taxReturns.completeness}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">发票数据</span>
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                    {mockData.dataSourceStatus.invoiceData.completeness}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">核算数据</span>
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                    {mockData.dataSourceStatus.accountingData.completeness}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900">智能分析结果</h4>
                            <Brain className="h-5 w-5 text-slate-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">风险检测</span>
                                <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                                    {mockData.intelligentAnalysis.taxRiskDetection.overallRisk}分
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">财务分析</span>
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                    {mockData.intelligentAnalysis.financialAnalysis.profitability}分
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">优化方案</span>
                                <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded-full">
                                    {mockData.automatedSolutions.taxPlanningSchemes}个
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 智能分析动态和优化机会 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-emerald-600" />
                        智能分析动态
                    </h3>
                    <div className="space-y-4">
                        {mockData.recentActivities.slice(0, 4).map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.important ? 'bg-pink-100' : 'bg-sky-100'
                                    }`}>
                                    <activity.icon className={`h-4 w-4 ${activity.important ? 'text-pink-600' : 'text-sky-600'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-xs px-2 py-1 rounded-full ${activity.type === '智能画像' ? 'bg-slate-100 text-slate-800' :
                                            activity.type === '风险检测' ? 'bg-pink-100 text-pink-800' :
                                                activity.type === '方案生成' ? 'bg-emerald-100 text-emerald-800' :
                                                    activity.type === '财务分析' ? 'bg-sky-100 text-sky-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {activity.type}
                                        </span>
                                        <span className="text-xs text-gray-500">{activity.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-900 mb-2">{activity.content}</p>
                                    <button
                                        onClick={() => handleModuleAction(activity.module, activity.action)}
                                        className="text-xs text-slate-600 hover:text-slate-800 font-medium flex items-center"
                                    >
                                        {activity.action}
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-amber-600" />
                        智能优化机会
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-emerald-900">税务筹划优化</h4>
                                <span className="text-sm text-emerald-600">
                                    可节税 {(mockData.intelligentAnalysis.optimizationOpportunities.taxSavingPotential / 10000).toFixed(1)}万
                                </span>
                            </div>
                            <p className="text-sm text-emerald-700">基于企业画像识别出研发费用加计扣除优化机会</p>
                        </div>

                        <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-sky-900">流程优化建议</h4>
                                <span className="text-sm text-sky-600">
                                    {mockData.intelligentAnalysis.optimizationOpportunities.processOptimization}项
                                </span>
                            </div>
                            <p className="text-sm text-sky-700">财务流程和内控制度优化建议</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-slate-900">结构优化方案</h4>
                                <span className="text-sm text-slate-600">
                                    {mockData.intelligentAnalysis.optimizationOpportunities.structureOptimization}个方案
                                </span>
                            </div>
                            <p className="text-sm text-slate-700">股权结构和组织架构优化建议</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;