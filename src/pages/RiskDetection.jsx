import React, { useState } from 'react';
import { Shield, AlertTriangle, FileCheck, Activity, Play, Download, ExternalLink, Lightbulb, CheckCircle, XCircle, Eye, Edit, Settings, FileText, Calendar, Filter, X, ChevronDown, ChevronRight, Info } from 'lucide-react';
import CustomDetectionModal from './riskdetection/CustomDetectionModal';
import { generateRiskDetectionReportHTML, getRiskDetectionReportData } from '../report/TaxRiskDetectionReport';


const RiskDetection = () => {
    const [riskLevel] = useState(75);
    const [downloadFormat, setDownloadFormat] = useState('pdf');
    const [showCustomDetectionModal, setShowCustomDetectionModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectionProgress, setDetectionProgress] = useState(0);
    const [customSettings, setCustomSettings] = useState({
        // 基础工作
        dataCollection: {
            taxData: true,
            financialData: true,
            businessData: true,
            internalSystems: false
        },
        businessReview: {
            businessModel: true,
            keyProcesses: true,
            riskPoints: true
        },

        // 检测范围
        detectScope: 'comprehensive',
        timePeriod: '2024',

        // 税种检测
        taxTypes: {
            vat: {
                enabled: true,
                outputTax: true,
                inputTax: true,
                taxObligation: true,
                returns: true
            },
            corporateIncomeTax: {
                enabled: true,
                revenue: true,
                costs: true,
                assetHandling: true,
                taxPreferences: true,
                relatedPartyTransactions: true,
                returns: true
            },
            personalIncomeTax: {
                enabled: false,
                salaryWages: false,
                serviceIncome: false,
                dividends: false,
                nonMonetaryBenefits: false
            },
            otherTaxes: {
                enabled: false,
                propertyTax: false,
                landUseTax: false,
                stampDuty: false,
                constructionTax: false
            }
        },

        // 专项检查
        specialChecks: {
            invoiceManagement: true,
            declarationPayment: true,
            financialDataAnalysis: true,
            policyCompliance: true,
            highRiskAreas: true,
            internalControls: true
        },

        // 风险等级设置
        riskSettings: {
            sensitivity: 'normal',
            focusAreas: ['invoiceIssues', 'taxBurdenAbnormal', 'highRiskTransactions'],
            excludeAreas: []
        },

        // 检测方法
        detectionMethods: {
            dataComparison: true,
            ratioAnalysis: true,
            procedureReview: true,
            documentVerification: true,
            systemCheck: false
        }
    });

    const mockData = {
        riskItems: [
            {
                type: '发票管理',
                issue: '发票开具规范性存在问题，部分发票信息填写不完整',
                level: '高风险',
                score: 85,
                date: '2024-12-10'
            },
            {
                type: '增值税',
                issue: '增值税税负率异常偏高，需要进一步核查原因',
                level: '中风险',
                score: 72,
                date: '2024-12-08'
            },
            {
                type: '企业所得税',
                issue: '业务招待费扣除超过规定比例限制',
                level: '中风险',
                score: 68,
                date: '2024-12-05'
            },
            {
                type: '财务数据',
                issue: '应收账款周转率偏低，存在潜在风险',
                level: '低风险',
                score: 45,
                date: '2024-12-03'
            }
        ]
    };

    const handleOneClickDetection = async () => {
        setIsDetecting(true);
        setDetectionProgress(0);

        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setDetectionProgress(i);
        }

        setIsDetecting(false);
        setDetectionProgress(0);
    };

    const handleCustomDetection = () => {
        setShowCustomDetectionModal(true);
    };

    const startCustomDetection = async () => {
        setShowCustomDetectionModal(false);
        setIsDetecting(true);
        setDetectionProgress(0);

        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setDetectionProgress(i);
        }

        setIsDetecting(false);
        setDetectionProgress(0);
    };

    const ReportModal = () => {
        // 获取报告数据用于摘要显示
        const reportData = getRiskDetectionReportData();

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            税务风险检测报告
                        </h3>
                        <div className="flex items-center space-x-3">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                onClick={() => {
                                    const reportData = getRiskDetectionReportData();
                                    const reportHTML = generateRiskDetectionReportHTML(reportData);
                                    const newWindow = window.open('', '_blank');
                                    if (newWindow) {
                                        newWindow.document.write(reportHTML);
                                        newWindow.document.close();
                                    }
                                }}
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                浏览报告
                            </button>
                            <div className="flex items-center space-x-2">
                                <select
                                    value={downloadFormat}
                                    onChange={(e) => setDownloadFormat(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="pdf">PDF格式</option>
                                    <option value="word">Word格式</option>
                                </select>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                                    <Download className="h-4 w-4 mr-2" />
                                    下载报告
                                </button>
                            </div>
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* 报告基本信息 */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">企业基本信息</h4>
                                <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-600">企业名称：</span>{reportData.companyInfo.name}</p>
                                    <p><span className="text-gray-600">纳税人识别号：</span>{reportData.companyInfo.taxpayerId}</p>
                                    <p><span className="text-gray-600">企业地址：</span>{reportData.companyInfo.address}</p>
                                    <p><span className="text-gray-600">法定代表人：</span>{reportData.companyInfo.legalPerson}</p>
                                    <p><span className="text-gray-600">注册资本：</span>{reportData.companyInfo.registeredCapital}</p>
                                    <p><span className="text-gray-600">经营范围：</span>{reportData.companyInfo.businessScope}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">检测报告信息</h4>
                                <div className="space-y-2 text-sm">
                                    <p><span className="text-gray-600">报告日期：</span>{reportData.reportInfo.reportDate}</p>
                                    <p><span className="text-gray-600">报告编号：</span>{reportData.reportInfo.reportNumber}</p>
                                    <p><span className="text-gray-600">检测范围：</span>{reportData.reportInfo.detectionScope}</p>
                                    <p><span className="text-gray-600">检测模式：</span>{reportData.reportInfo.detectionMode}</p>
                                    <p><span className="text-gray-600">检测期间：</span>{reportData.reportInfo.detectionPeriod}</p>
                                    <p><span className="text-gray-600">检测机构：</span>{reportData.reportInfo.detectionInstitution}</p>
                                </div>
                            </div>
                        </div>

                        {/* 风险概览摘要 */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Shield className="h-5 w-5 mr-2 text-red-600" />
                                风险检测概览
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                    本次税务风险检测针对{reportData.companyInfo.name}进行了全面深入的税务合规性分析。
                                    检测覆盖率达到{reportData.riskSummary.coverageRate}，风险发现率为{reportData.riskSummary.riskDiscoveryRate}，
                                    合规度评分为{reportData.riskSummary.complianceScore}。检测发现了一些需要关注和处理的税务风险点，
                                    特别是在增值税管理、企业所得税申报、发票管理等方面存在不同程度的风险。
                                    企业应重点关注高风险项目的紧急处理，同时建立完善的税务风险预警机制。
                                </p>
                            </div>
                        </div>

                        {/* 关键风险指标 */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-red-50 p-4 rounded-lg text-center">
                                <h5 className="font-medium text-red-800 mb-1">高风险项</h5>
                                <p className="text-2xl font-bold text-red-600">{reportData.riskSummary.highRisk}</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                                <h5 className="font-medium text-orange-800 mb-1">中风险项</h5>
                                <p className="text-2xl font-bold text-orange-600">{reportData.riskSummary.mediumRisk}</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg text-center">
                                <h5 className="font-medium text-yellow-800 mb-1">低风险项</h5>
                                <p className="text-2xl font-bold text-yellow-600">{reportData.riskSummary.lowRisk}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <h5 className="font-medium text-green-800 mb-1">正常项目</h5>
                                <p className="text-2xl font-bold text-green-600">{reportData.riskSummary.safeItems}</p>
                            </div>
                        </div>

                        {/* 主要风险发现 */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">主要风险发现与建议</h4>
                            <div className="space-y-3">
                                <div className="border-l-4 border-red-500 pl-4">
                                    <h5 className="font-medium text-red-800">高风险项目</h5>
                                    <ul className="text-sm text-gray-700 mt-1 space-y-1">
                                        <li>• 发现3家供应商开具虚假发票，涉及进项税额85万元</li>
                                        <li>• 跨期收入确认风险，涉及收入2580万元</li>
                                        <li>• 研发费用归集不准确，影响加计扣除560万元</li>
                                    </ul>
                                </div>
                                <div className="border-l-4 border-orange-500 pl-4">
                                    <h5 className="font-medium text-orange-800">中风险项目</h5>
                                    <ul className="text-sm text-gray-700 mt-1 space-y-1">
                                        <li>• 混合销售业务税率适用错误，多缴税款320万元</li>
                                        <li>• 进项税额转出不及时，涉及金额42万元</li>
                                        <li>• 关联方资金拆借利息收入漏报380万元</li>
                                    </ul>
                                </div>
                                <div className="border-l-4 border-yellow-500 pl-4">
                                    <h5 className="font-medium text-yellow-800">整改建议</h5>
                                    <ul className="text-sm text-gray-700 mt-1 space-y-1">
                                        <li>• 7日内停止抵扣虚开发票，主动补缴税款</li>
                                        <li>• 15日内完成跨期收入纳税调整</li>
                                        <li>• 30日内规范研发费用归集方法</li>
                                        <li>• 建立完善的税务风险内控制度</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* 风险总览面板 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Shield className="h-6 w-6 mr-2 text-red-600" />
                        税务风险检测控制面板
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleOneClickDetection}
                            disabled={isDetecting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
                        >
                            <Play className="h-4 w-4 mr-2" />
                            一键检测
                        </button>
                        <button
                            onClick={handleCustomDetection}
                            disabled={isDetecting}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center disabled:opacity-50"
                        >
                            <Settings className="h-4 w-4 mr-2" />
                            自定义检测
                        </button>
                        <button
                            onClick={() => setShowReportModal(true)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            查看报告
                        </button>
                    </div>
                </div>

                {/* 检测进度条 */}
                {isDetecting && (
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-800">正在进行税务风险检测...</span>
                            <span className="text-sm text-blue-600">{detectionProgress}%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${detectionProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-6 bg-red-50 rounded-lg">
                        <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <p className="text-3xl font-bold text-red-600">{riskLevel}</p>
                        <p className="text-sm text-gray-600">综合风险评分</p>
                        <p className="text-xs text-red-600 mt-1">较上月上升5分</p>
                    </div>
                    <div className="text-center p-6 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                        <p className="text-3xl font-bold text-yellow-600">8</p>
                        <p className="text-sm text-gray-600">待处理风险项</p>
                        <p className="text-xs text-yellow-600 mt-1">新增2项</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <p className="text-3xl font-bold text-green-600">15</p>
                        <p className="text-sm text-gray-600">已处理风险项</p>
                        <p className="text-xs text-green-600 mt-1">本月处理3项</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <Activity className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                        <p className="text-3xl font-bold text-blue-600">92%</p>
                        <p className="text-sm text-gray-600">检测覆盖率</p>
                        <p className="text-xs text-blue-600 mt-1">持续优化中</p>
                    </div>
                </div>

                {/* 风险趋势图 */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">风险趋势分析（近6个月）</h4>
                    <div className="h-32 flex items-end justify-between space-x-2">
                        {[65, 58, 72, 68, 70, 75].map((value, index) => (
                            <div key={index} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${value}%` }}>
                                <div className="text-white text-xs text-center pt-1">{value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>7月</span><span>8月</span><span>9月</span><span>10月</span><span>11月</span><span>12月</span>
                    </div>
                </div>
            </div>

            {/* 风险详情列表 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FileCheck className="h-5 w-5 mr-2 text-orange-600" />
                        详细风险清单
                    </h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        查看详细报告
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">风险类型</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">具体问题</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">风险等级</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">风险分数</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">发现时间</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockData.riskItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.type}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                                        <div className="truncate" title={item.issue}>
                                            {item.issue}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.level === '高风险' ? 'bg-red-100 text-red-800' :
                                            item.level === '中风险' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {item.level}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        <div className="flex items-center">
                                            <span className="mr-2">{item.score}</span>
                                            <div className="w-16 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${item.score >= 80 ? 'bg-red-500' :
                                                        item.score >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${item.score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{item.date}</td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            待处理
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800" title="查看详情">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="text-green-600 hover:text-green-800" title="处理">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="text-orange-600 hover:text-orange-800" title="忽略">
                                                <XCircle className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 智能整改建议 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                    智能整改建议
                </h3>
                <div className="space-y-4">
                    {[
                        {
                            priority: '立即整改',
                            title: '规范发票开具流程',
                            riskType: '发票管理',
                            description: '针对发票开具规范性问题，建立发票开具内控制度，加强开票人员培训，确保发票信息准确完整。建议在本月内完成制度建设，并对相关人员进行专项培训。',
                            deadline: '2024-12-20',
                            responsible: '财务部',
                            impact: '高',
                            effort: '中',
                            steps: ['制定发票管理制度', '培训开票人员', '建立检查机制', '定期审查执行情况']
                        },
                        {
                            priority: '中期改进',
                            title: '优化增值税税负结构',
                            riskType: '增值税',
                            description: '针对增值税税负率异常偏高问题，通过业务模式调整、进项管理优化等方式，合理降低增值税税负率至行业合理水平。',
                            deadline: '2025-01-15',
                            responsible: '税务部',
                            impact: '高',
                            effort: '高',
                            steps: ['分析当前税负构成', '制定优化方案', '实施业务调整', '监控效果评估']
                        },
                        {
                            priority: '关注处理',
                            title: '完善业务招待费管理',
                            riskType: '企业所得税',
                            description: '针对业务招待费扣除超标问题，建立健全业务招待费管理制度，严格控制费用标准和审批流程。',
                            deadline: '2025-01-30',
                            responsible: '财务部',
                            impact: '中',
                            effort: '低',
                            steps: ['梳理费用标准', '建立审批制度', '加强过程控制', '定期核查分析']
                        }
                    ].map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-3">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.priority === '立即整改' ? 'bg-red-100 text-red-800' :
                                        item.priority === '中期改进' ? 'bg-yellow-100 text-yellow-800' :
                                            item.priority === '关注处理' ? 'bg-orange-100 text-orange-800' :
                                                'bg-blue-100 text-blue-800'
                                        }`}>
                                        {item.priority}
                                    </span>
                                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        对应：{item.riskType}
                                    </span>
                                </div>
                                <div className="text-right text-sm text-gray-500">
                                    <p>截止：{item.deadline}</p>
                                    <p>负责：{item.responsible}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <h5 className="text-xs font-medium text-gray-700 mb-2">执行步骤：</h5>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        {item.steps.map((step, stepIndex) => (
                                            <li key={stepIndex} className="flex items-center">
                                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center mr-2">
                                                    {stepIndex + 1}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-xs font-medium text-gray-700 mb-2">影响评估：</h5>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600">业务影响：</span>
                                            <span className={`text-xs px-2 py-1 rounded ${item.impact === '高' ? 'bg-red-100 text-red-600' :
                                                item.impact === '中' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-green-100 text-green-600'
                                                }`}>
                                                {item.impact}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600">实施难度：</span>
                                            <span className={`text-xs px-2 py-1 rounded ${item.effort === '高' ? 'bg-red-100 text-red-600' :
                                                item.effort === '中' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-green-100 text-green-600'
                                                }`}>
                                                {item.effort}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                                    跟踪执行
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 flex items-center">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    查看报告
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                                    稍后处理
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 模态框 */}
            {showCustomDetectionModal && (
                <CustomDetectionModal
                    isOpen={showCustomDetectionModal}
                    onClose={() => setShowCustomDetectionModal(false)}
                    customSettings={customSettings}
                    setCustomSettings={setCustomSettings}
                    onStartDetection={startCustomDetection}
                />
            )}
            {showReportModal && <ReportModal />}
        </div>
    );
};

export default RiskDetection;