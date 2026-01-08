import React, { useState } from 'react';
import { Calculator, Zap, ExternalLink, TrendingUp, Target, Award, Briefcase, Lightbulb, Eye, Calendar, Download, Star, CheckCircle, Globe, Building, DollarSign, RotateCcw, BarChart3, LineChart, Monitor, Brain, Workflow, Users, Factory, Truck, FileText, Shield, Coins, Network, Layers, ChevronRight, X, ChevronDown, ChevronUp, Building2, Banknote, RefreshCw, Navigation, AlertTriangle, Search, Clock } from 'lucide-react';
import { managedCompanies } from '../../utils/mockData';

// 导入模态框组件
import TaxCalculatorModal from '../../components/modals/TaxCalculatorModal';
import ComparisonModal from '../../components/modals/ComparisonModal';
import PlanningReportModal from '../../components/modals/PlanningReportModal';
import PolicyMatcherModal from '../../components/modals/PolicyMatcherModal';
import TaxCalculator from '../../components/modals/TaxCalculatorModal';
import PolicyQuery from '../../components/modals/PolicyQuery';

const TaxCompliance = ({ selectedCompany, userType, currentTime, selectedCompanies, isProfessionalView }) => {
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [planningResults, setPlanningResults] = useState(null);

    // 各种模态框状态
    const [showPlanningReport, setShowPlanningReport] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [showSensitivity, setShowSensitivity] = useState(false);
    const [showPolicyMatcher, setShowPolicyMatcher] = useState(false);
    const [showAIAdvice, setShowAIAdvice] = useState(false);
    const [showProjectManager, setShowProjectManager] = useState(false);

    // 维度详情模态框状态
    const [showDimensionDetail, setShowDimensionDetail] = useState(false);
    const [selectedDimension, setSelectedDimension] = useState(null);

    // 维度展开状态
    const [expandedDimensions, setExpandedDimensions] = useState(new Set());

    // 标签页状态
    const [activeTab, setActiveTab] = useState('overview');

    // 历史报告相关状态
    const [showHistoryReports, setShowHistoryReports] = useState(false);
    const [selectedReports, setSelectedReports] = useState(new Set());
    const [historyReports, setHistoryReports] = useState([
        {
            id: 1,
            title: '主体设计筹划报告',
            type: 'entityDesign',
            date: '2025-06-15',
            size: '2.3MB',
            format: 'PDF'
        },
        {
            id: 2,
            title: '政策利用筹划报告',
            type: 'policyUtilization',
            date: '2025-06-10',
            size: '1.8MB',
            format: 'Word'
        },
        {
            id: 3,
            title: '综合税务筹划总结报告',
            type: 'comprehensive',
            date: '2025-06-08',
            size: '4.2MB',
            format: 'PDF'
        },
        {
            id: 4,
            title: '交易安排筹划报告',
            type: 'transactionArrangement',
            date: '2025-06-05',
            size: '1.9MB',
            format: 'Word'
        },
        {
            id: 5,
            title: '资本运作筹划报告',
            type: 'capitalOperation',
            date: '2023-12-28',
            size: '3.1MB',
            format: 'PDF'
        }
    ]);

    // 计算器相关状态
    const [calculatorData, setCalculatorData] = useState({
        revenue: 3800,
        cost: 2400,
        expenses: 800,
        taxType: 'general',
        industryType: 'technology'
    });

    // 方案对比数据
    const [comparisonSchemes, setComparisonSchemes] = useState([]);

    // 政策匹配结果
    const [matchedPolicies, setMatchedPolicies] = useState([]);

    // AI建议数据
    const [aiAdviceData, setAIAdviceData] = useState(null);

    const mockData = {
        taxMetrics: {
            vatRate: 13.2,
            citRate: 8.5,
            overallRate: 21.7,
            industryAvg: 18.3,
            monthlyTax: 185000,
            yearlyTax: 2340000,
            taxSaving: 156000
        }
    };

    // 税务筹划维度数据 - 整合两个版本的数据
    const planningDimensions = [
        {
            id: 'entityDesign',
            title: '主体设计筹划',
            description: '通过优化企业组织形式、设立分支机构等方式实现税负优化',
            icon: Building2,
            color: 'blue',
            savingPotential: '485万元',
            difficulty: '中等',
            risk: '低',
            timeline: '3-6个月',
            keyPoints: [
                '有限公司vs股份公司选择',
                '分公司vs子公司设立',
                '个人独资企业筹划',
                '合伙企业税收透明'
            ],
            metrics: {
                taxSaving: 485,
                implementation: 85,
                compliance: 92
            }
        },
        {
            id: 'transactionArrangement',
            title: '交易安排筹划',
            description: '通过合理安排交易模式、合同条款等优化税务处理',
            icon: FileText,
            color: 'green',
            savingPotential: '325万元',
            difficulty: '较低',
            risk: '低',
            timeline: '2-4个月',
            keyPoints: [
                '销售模式优化设计',
                '合同条款税务筹划',
                '定价策略合理安排',
                '付款方式税负影响'
            ],
            metrics: {
                taxSaving: 325,
                implementation: 90,
                compliance: 95
            }
        },
        {
            id: 'policyUtilization',
            title: '政策利用筹划',
            description: '充分享受高新技术企业、研发费用加计扣除等税收优惠',
            icon: Award,
            color: 'purple',
            savingPotential: '720万元',
            difficulty: '中等',
            risk: '低',
            timeline: '6-12个月',
            keyPoints: [
                '高新技术企业认定',
                '研发费用加计扣除',
                '软件企业税收优惠',
                '西部大开发政策'
            ],
            metrics: {
                taxSaving: 720,
                implementation: 78,
                compliance: 88
            }
        },
        {
            id: 'capitalOperation',
            title: '资本运作筹划',
            description: '通过股权架构设计、资本结构优化等实现税负最小化',
            icon: Coins,
            color: 'orange',
            savingPotential: '385万元',
            difficulty: '较高',
            risk: '中',
            timeline: '9-18个月',
            keyPoints: [
                '股权架构优化设计',
                '股权激励税务筹划',
                '企业重组税务处理',
                '融资结构税负优化'
            ],
            metrics: {
                taxSaving: 385,
                implementation: 65,
                compliance: 75
            }
        },
        {
            id: 'internationalLayout',
            title: '国际布局筹划',
            description: '通过跨境投资架构、转让定价等安排降低全球税负',
            icon: Network,
            color: 'indigo',
            savingPotential: '255万元',
            difficulty: '高',
            risk: '中',
            timeline: '12-24个月',
            keyPoints: [
                '跨境投资架构设计',
                '转让定价政策制定',
                '税收协定优惠利用',
                '境外税收抵免优化'
            ],
            metrics: {
                taxSaving: 255,
                implementation: 58,
                compliance: 72
            }
        },
        {
            id: 'businessRestructuring',
            title: '业务重构筹划',
            description: '通过业务流程再造、盈利模式创新等实现税务优化',
            icon: Workflow,
            color: 'pink',
            savingPotential: '295万元',
            difficulty: '较高',
            risk: '中',
            timeline: '12-18个月',
            keyPoints: [
                '业务流程税务优化',
                '盈利模式创新筹划',
                '成本结构重组设计',
                '收入确认策略调整'
            ],
            metrics: {
                taxSaving: 295,
                implementation: 62,
                compliance: 80
            }
        },
        {
            id: 'taxSpecialized',
            title: '税种专项筹划',
            description: '针对增值税、企业所得税等各税种的专项优化策略',
            icon: Calculator,
            color: 'orange',
            savingPotential: '465万元',
            difficulty: '中等',
            risk: '低',
            timeline: '3-12个月',
            keyPoints: [
                '增值税筹划优化',
                '企业所得税筹划',
                '个人所得税筹划',
                '其他税种优化'
            ],
            metrics: {
                taxSaving: 465,
                implementation: 82,
                compliance: 90
            }
        },
        {
            id: 'riskControl',
            title: '风险管控筹划',
            description: '建立全面风险识别评估体系，确保税务筹划合法合规',
            icon: Shield,
            color: 'red',
            savingPotential: '185万元',
            difficulty: '中等',
            risk: '低',
            timeline: '持续进行',
            keyPoints: [
                '税务风险识别评估',
                '内控制度建设',
                '动态监控调整',
                '反避税规则应对'
            ],
            metrics: {
                taxSaving: 185,
                implementation: 75,
                compliance: 95
            }
        }
    ];

    const generatePlanningScheme = () => {
        setAnalysisProgress(0);
        const interval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setPlanningResults({
                        schemes: [
                            {
                                id: 1,
                                name: '高新技术企业认定方案',
                                description: '申请高新技术企业资格，享受15%优惠税率',
                                annualSaving: 720000,
                                implementation: '6个月',
                                risk: '低',
                                roi: '360%',
                                feasibility: '高',
                                priority: '高',
                                details: '通过完善研发体系、优化人员结构、规范财务管理等措施，满足高新技术企业认定条件'
                            },
                            {
                                id: 2,
                                name: '研发费用加计扣除优化',
                                description: '充分利用研发费用200%加计扣除政策',
                                annualSaving: 320000,
                                implementation: '1个月',
                                risk: '低',
                                roi: '1280%',
                                feasibility: '高',
                                priority: '高',
                                details: '梳理研发项目，完善研发费用归集，确保符合加计扣除条件'
                            },
                            {
                                id: 3,
                                name: '组织架构优化方案',
                                description: '通过调整子公司与分公司结构，实现税负优化',
                                annualSaving: 485000,
                                implementation: '3个月',
                                risk: '中',
                                roi: '285%',
                                feasibility: '中',
                                priority: '中',
                                details: '分析业务模式，设计合理的组织架构，在合规前提下优化税负'
                            }
                        ],
                        totalSaving: 1525000,
                        currentTax: 2340000,
                        optimizedTax: 815000,
                        savingRate: 65.2
                    });
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    // 完整的8维度筹划机会数据
    const planningOpportunities = {
        // 1. 主体设计筹划
        entityDesign: {
            title: '主体设计筹划',
            icon: Building,
            color: 'blue',
            totalSaving: 485,
            previewOpportunities: [
                {
                    name: '企业集团架构重构',
                    saving: 180,
                    urgency: '中',
                    deadline: '2024年12月31日'
                },
                {
                    name: '组织形式选择优化',
                    saving: 125,
                    urgency: '高',
                    deadline: '税务年度结束前'
                },
                {
                    name: '注册地战略布局',
                    saving: 95,
                    urgency: '中',
                    deadline: '政策有效期内'
                },
                {
                    name: '小微企业拆分策略',
                    saving: 85,
                    urgency: '高',
                    deadline: '2024年10月31日'
                }
            ],
            allOpportunities: [
                {
                    name: '组织形式选择优化',
                    detail: '有限公司vs合伙企业vs个人独资',
                    saving: 125,
                    urgency: '高',
                    deadline: '税务年度结束前',
                    description: '根据业务规模和盈利水平选择最优组织形式'
                },
                {
                    name: '企业集团架构重构',
                    detail: '母子公司结构vs分公司结构',
                    saving: 180,
                    urgency: '中',
                    deadline: '2024年12月31日',
                    description: '通过架构调整实现税负优化和风险隔离'
                },
                {
                    name: '注册地战略布局',
                    detail: '西部大开发、自贸区等优惠区域',
                    saving: 95,
                    urgency: '中',
                    deadline: '政策有效期内',
                    description: '利用区域性税收优惠政策降低税负'
                },
                {
                    name: '小微企业拆分策略',
                    detail: '大企业拆分为多个小微企业',
                    saving: 85,
                    urgency: '高',
                    deadline: '2024年10月31日',
                    description: '享受小微企业2.5%-5%的优惠税率'
                }
            ]
        },
        // 2. 交易安排筹划
        transactionArrangement: {
            title: '交易安排筹划',
            icon: FileText,
            color: 'green',
            totalSaving: 325,
            previewOpportunities: [
                {
                    name: '交易模式创新',
                    saving: 95,
                    urgency: '中',
                    deadline: '业务模式调整时'
                },
                {
                    name: '合同设计税务优化',
                    saving: 88,
                    urgency: '中',
                    deadline: '合同签署前'
                },
                {
                    name: '供应链税务管理',
                    saving: 76,
                    urgency: '低',
                    deadline: '年度内实施'
                },
                {
                    name: '定价策略优化',
                    saving: 66,
                    urgency: '中',
                    deadline: '年度申报前'
                }
            ],
            allOpportunities: [
                {
                    name: '合同设计税务优化',
                    detail: '收入确认时点、混合销售处理',
                    saving: 88,
                    urgency: '中',
                    deadline: '合同签署前',
                    description: '通过合同条款设计优化税务处理'
                },
                {
                    name: '供应链税务管理',
                    detail: '供应商选择、存货计价方法',
                    saving: 76,
                    urgency: '低',
                    deadline: '年度内实施',
                    description: '优化供应链环节的税务安排'
                },
                {
                    name: '交易模式创新',
                    detail: '平台经济、供应链金融模式',
                    saving: 95,
                    urgency: '中',
                    deadline: '业务模式调整时',
                    description: '创新交易模式享受税收优惠'
                },
                {
                    name: '定价策略优化',
                    detail: '转移定价、关联交易定价',
                    saving: 66,
                    urgency: '中',
                    deadline: '年度申报前',
                    description: '制定合理的定价策略'
                }
            ]
        }
    };

    // 切换维度展开状态
    const toggleDimension = (dimensionKey) => {
        const newExpanded = new Set(expandedDimensions);
        if (newExpanded.has(dimensionKey)) {
            newExpanded.delete(dimensionKey);
        } else {
            newExpanded.add(dimensionKey);
        }
        setExpandedDimensions(newExpanded);
    };

    // 打开维度详情模态框
    const openDimensionDetail = (dimensionKey) => {
        setSelectedDimension(planningOpportunities[dimensionKey]);
        setShowDimensionDetail(true);
    };

    // 处理历史报告选择
    const handleReportSelection = (reportId) => {
        const newSelected = new Set(selectedReports);
        if (newSelected.has(reportId)) {
            newSelected.delete(reportId);
        } else {
            newSelected.add(reportId);
        }
        setSelectedReports(newSelected);
    };

    // 全选/取消全选
    const handleSelectAll = () => {
        if (selectedReports.size === historyReports.length) {
            setSelectedReports(new Set());
        } else {
            setSelectedReports(new Set(historyReports.map(r => r.id)));
        }
    };

    // 下载选中报告
    const downloadSelectedReports = (format) => {
        const selectedReportsList = historyReports.filter(r => selectedReports.has(r.id));
        console.log(`下载${selectedReportsList.length}个报告为${format}格式:`, selectedReportsList);
        // 这里可以调用实际的下载API
        alert(`正在下载${selectedReportsList.length}个报告为${format}格式`);
    };

    // 生成详细报告 - 使用TaxCompliance-1中的链接
    const generateDetailedReport = (dimensionKey) => {
        switch (dimensionKey) {
            case 'entityDesign':
                import('../../report/EntityDesignPlanningReport.js').then(module => {
                    const reportData = module.getEntityDesignReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            case 'transactionArrangement':
                import('../../report/TransactionArrangementPlanningReport.js').then(module => {
                    const reportData = module.getTransactionArrangementReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            case 'policyUtilization':
                import('../../report/PolicyUtilizationPlanningReport.js').then(module => {
                    const reportData = module.getPolicyUtilizationReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            case 'capitalOperation':
                import('../../report/CapitalOperationPlanningReport.js').then(module => {
                    const reportData = module.getCapitalOperationReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            case 'internationalLayout':
                import('../../report/InternationalLayoutPlanningReport.js').then(module => {
                    const reportData = module.getInternationalLayoutReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            case 'businessRestructuring':
                import('../../report/BusinessRestructuringPlanningReport.js').then(module => {
                    const reportData = module.getBusinessRestructuringReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            case 'taxSpecialized':
                import('../../report/TaxSpecializedPlanningReport.js').then(module => {
                    const reportData = module.getTaxSpecializedReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            default:
                console.log('报告类型暂未实现');
        }
    };

    // 生成综合报告 - 使用TaxCompliance-1中的链接
    const generateComprehensiveReport = () => {
        import('../../report/ComprehensivePlanningReport.js').then(module => {
            const reportData = module.getComprehensiveReportData();
            const htmlContent = module.generateReportHTML(reportData);
            const newWindow = window.open('', '_blank');
            newWindow.document.write(htmlContent);
            newWindow.document.close();
        });
    };

    const getColorClasses = (color) => {
        const colorMap = {
            blue: {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-600',
                icon: 'text-blue-600',
                button: 'bg-blue-600 hover:bg-blue-700'
            },
            green: {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-600',
                icon: 'text-green-600',
                button: 'bg-green-600 hover:bg-green-700'
            },
            purple: {
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                text: 'text-purple-600',
                icon: 'text-purple-600',
                button: 'bg-purple-600 hover:bg-purple-700'
            },
            orange: {
                bg: 'bg-orange-50',
                border: 'border-orange-200',
                text: 'text-orange-600',
                icon: 'text-orange-600',
                button: 'bg-orange-600 hover:bg-orange-700'
            },
            indigo: {
                bg: 'bg-indigo-50',
                border: 'border-indigo-200',
                text: 'text-indigo-600',
                icon: 'text-indigo-600',
                button: 'bg-indigo-600 hover:bg-indigo-700'
            },
            red: {
                bg: 'bg-red-50',
                border: 'border-red-200',
                text: 'text-red-600',
                icon: 'text-red-600',
                button: 'bg-red-600 hover:bg-red-700'
            },
            teal: {
                bg: 'bg-teal-50',
                border: 'border-teal-200',
                text: 'text-teal-600',
                icon: 'text-teal-600',
                button: 'bg-teal-600 hover:bg-teal-700'
            },
            pink: {
                bg: 'bg-pink-50',
                border: 'border-pink-200',
                text: 'text-pink-600',
                icon: 'text-pink-600',
                button: 'bg-pink-600 hover:bg-pink-700'
            }
        };
        return colorMap[color] || colorMap.blue;
    };

    // 维度详情模态框组件
    const DimensionDetailModal = () => {
        if (!selectedDimension) return null;

        const IconComponent = selectedDimension.icon;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                    <div className={`bg-${selectedDimension.color}-50 border-b border-${selectedDimension.color}-200 p-6`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 bg-${selectedDimension.color}-100 rounded-lg flex items-center justify-center`}>
                                    <IconComponent className={`h-8 w-8 text-${selectedDimension.color}-600`} />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-semibold text-${selectedDimension.color}-900`}>
                                        {selectedDimension.title}
                                    </h3>
                                    <p className={`text-sm text-${selectedDimension.color}-600`}>
                                        {selectedDimension.allOpportunities?.length || 0}项筹划机会 · 总节税潜力{selectedDimension.totalSaving}万元
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDimensionDetail(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedDimension.allOpportunities?.map((opportunity, index) => (
                                <div key={index} className={`p-4 bg-${selectedDimension.color}-50 rounded-lg border-l-4 border-${selectedDimension.color}-500 hover:shadow-md transition-shadow`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h5 className={`font-medium text-${selectedDimension.color}-900 mb-1`}>
                                                {opportunity.name}
                                            </h5>
                                            <p className={`text-sm text-${selectedDimension.color}-700 mb-2`}>
                                                {opportunity.detail}
                                            </p>
                                            <p className={`text-xs text-${selectedDimension.color}-600`}>
                                                {opportunity.description}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded ml-2 ${opportunity.urgency === '高' ? 'bg-red-100 text-red-800' :
                                            opportunity.urgency === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {opportunity.urgency}紧急度
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex space-x-4">
                                            <span className={`text-${selectedDimension.color}-800 font-medium`}>
                                                节税: {opportunity.saving}万元
                                            </span>
                                            <span className={`text-${selectedDimension.color}-600`}>
                                                截止: {opportunity.deadline}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className={`px-3 py-1 bg-${selectedDimension.color}-600 text-white rounded text-xs hover:bg-${selectedDimension.color}-700`}>
                                                详情
                                            </button>
                                            <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-50">
                                                分析
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) || []}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                共 {selectedDimension.allOpportunities?.length || 0} 项筹划机会，总节税潜力 {selectedDimension.totalSaving} 万元
                            </div>
                            <div className="flex space-x-3">
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    导出报告
                                </button>
                                <button className={`px-4 py-2 bg-${selectedDimension.color}-600 text-white rounded-lg hover:bg-${selectedDimension.color}-700`}>
                                    制定计划
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 历史报告模态框组件
    const HistoryReportsModal = () => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                    <div className="bg-blue-50 border-b border-blue-200 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-900">历史报告管理</h3>
                                    <p className="text-sm text-blue-600">
                                        共{historyReports.length}份报告 · 已选择{selectedReports.size}份
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowHistoryReports(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="mb-4 flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleSelectAll}
                                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
                                >
                                    {selectedReports.size === historyReports.length ? '取消全选' : '全选'}
                                </button>
                                <span className="text-sm text-gray-600">
                                    {selectedReports.size > 0 && `已选择 ${selectedReports.size} 份报告`}
                                </span>
                            </div>
                            {selectedReports.size > 0 && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => downloadSelectedReports('PDF')}
                                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center"
                                    >
                                        <Download className="h-3 w-3 mr-1" />
                                        下载PDF
                                    </button>
                                    <button
                                        onClick={() => downloadSelectedReports('Word')}
                                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center"
                                    >
                                        <Download className="h-3 w-3 mr-1" />
                                        下载Word
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            {historyReports.map((report) => (
                                <div
                                    key={report.id}
                                    className={`p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer ${selectedReports.has(report.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                        }`}
                                    onClick={() => handleReportSelection(report.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedReports.has(report.id)}
                                                onChange={() => handleReportSelection(report.id)}
                                                className="h-4 w-4 text-blue-600 rounded"
                                            />
                                            <div>
                                                <h5 className="font-medium text-gray-900">{report.title}</h5>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>生成日期: {report.date}</span>
                                                    <span>文件大小: {report.size}</span>
                                                    <span className={`px-2 py-1 rounded text-xs ${report.format === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {report.format}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('预览报告:', report);
                                                }}
                                                className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-50"
                                            >
                                                预览
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('下载单个报告:', report);
                                                }}
                                                className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                                            >
                                                下载
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                共 {historyReports.length} 份历史报告
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowHistoryReports(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    关闭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* 页面标题 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    税务合规与筹划管理
                </h1>
                <p className="text-gray-600">
                    基于八大维度的全方位税务筹划分析，为企业提供专业的税务优化方案
                </p>
            </div>

            {/* 标签页导航 */}
            <div className="mb-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {[
                            { id: 'overview', name: '概览', icon: TrendingUp },
                            { id: 'intelligent', name: '智能分析', icon: Brain },
                            { id: 'calculator', name: '计算器', icon: Calculator },
                            { id: 'policy', name: '政策查询', icon: Search },
                            { id: 'planning', name: '筹划方案', icon: FileText }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === tab.id
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

            {/* 概览标签页 */}
            {activeTab === 'overview' && (
                <>
                    {/* 统计概览 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            {
                                title: '预计总节税',
                                value: '3,115万元',
                                icon: TrendingUp,
                                color: 'green',
                                change: '+28.2%'
                            },
                            {
                                title: '实施周期',
                                value: '18个月',
                                icon: Clock,
                                color: 'blue',
                                change: '分4阶段'
                            },
                            {
                                title: '风险等级',
                                value: '可控',
                                icon: Shield,
                                color: 'yellow',
                                change: '7.8/10'
                            },
                            {
                                title: '投资回报',
                                value: '895%',
                                icon: Target,
                                color: 'purple',
                                change: '年化收益'
                            }
                        ].map((stat) => (
                            <div key={stat.title} className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className={`text-sm text-${stat.color}-600`}>{stat.change}</p>
                                    </div>
                                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                                        <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 快速导航 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                            快速导航
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: '风险评估', icon: AlertTriangle, color: 'red' },
                                { name: '政策查询', icon: Search, color: 'green' },
                                { name: '计算器', icon: Calculator, color: 'blue' },
                                { name: '报告中心', icon: FileText, color: 'purple' }
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        if (item.name === '政策查询') setActiveTab('policy');
                                        if (item.name === '计算器') setActiveTab('calculator');
                                        if (item.name === '文档中心') setActiveTab('planning');
                                    }}
                                    className={`flex items-center justify-center p-4 rounded-lg border-2 border-${item.color}-200 text-${item.color}-600 hover:bg-${item.color}-50 transition-colors duration-200`}
                                >
                                    <item.icon className="w-5 h-5 mr-2" />
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 维度概览 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                            八维度筹划概览
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {planningDimensions.map((dimension) => {
                                const colors = getColorClasses(dimension.color);
                                return (
                                    <div
                                        key={dimension.id}
                                        className={`${colors.bg} ${colors.border} border-2 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow`}
                                        onClick={() => setActiveTab('planning')}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <dimension.icon className={`w-6 h-6 ${colors.icon}`} />
                                            <span className={`px-2 py-1 text-xs font-medium ${colors.text} bg-white rounded-full`}>
                                                {dimension.difficulty}
                                            </span>
                                        </div>
                                        <h4 className={`font-semibold ${colors.text} mb-2`}>
                                            {dimension.title}
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">节税潜力:</span>
                                                <span className="font-medium">{dimension.savingPotential}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">风险等级:</span>
                                                <span className="font-medium">{dimension.risk}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">实施周期:</span>
                                                <span className="font-medium">{dimension.timeline}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}

            {/* 智能分析标签页 */}
            {activeTab === 'intelligent' && (
                <>
                    {/* 筹划分析控制面板 */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Calculator className="h-6 w-6 mr-2 text-green-600" />
                                税务合规筹划智能分析
                            </h3>
                            <div className="flex space-x-3">
                                <button
                                    onClick={generatePlanningScheme}
                                    disabled={analysisProgress > 0 && analysisProgress < 100}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                                >
                                    {analysisProgress > 0 && analysisProgress < 100 ? (
                                        <>
                                            <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                                            分析中...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="h-4 w-4 mr-2" />
                                            生成筹划方案
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowPlanningReport(true)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    查看筹划报告
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
                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${analysisProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* 当前税负概况 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <DollarSign className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-blue-600">{(mockData.taxMetrics.yearlyTax / 10000).toFixed(0)}万</p>
                                <p className="text-sm text-gray-600">当前年度税负</p>
                                <p className="text-xs text-blue-600 mt-1">包含增值税、企业所得税等</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-green-600">
                                    {planningResults ? (planningResults.totalSaving / 10000).toFixed(0) : '311'}万
                                </p>
                                <p className="text-sm text-gray-600">预计节税金额</p>
                                <p className="text-xs text-green-600 mt-1">通过合规筹划实现</p>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <Target className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-purple-600">
                                    {planningResults ? planningResults.savingRate.toFixed(1) : '13.3'}%
                                </p>
                                <p className="text-sm text-gray-600">节税比例</p>
                                <p className="text-xs text-purple-600 mt-1">显著优化税负结构</p>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-yellow-600">285%</p>
                                <p className="text-sm text-gray-600">平均投资回报率</p>
                                <p className="text-xs text-yellow-600 mt-1">筹划成本vs节税效益</p>
                            </div>
                        </div>
                    </div>

                    {/* 筹划方案列表 */}
                    {planningResults && (
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                                推荐筹划方案
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    共节税 {(planningResults.totalSaving / 10000).toFixed(0)}万元
                                </span>
                            </h3>
                            <div className="space-y-6">
                                {planningResults.schemes.map((scheme, index) => (
                                    <div key={scheme.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 text-lg">{scheme.name}</h4>
                                                    <p className="text-sm text-gray-600">{scheme.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${scheme.priority === '高' ? 'bg-red-100 text-red-800' :
                                                    scheme.priority === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                    {scheme.priority}优先级
                                                </span>
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${scheme.risk === '低' ? 'bg-green-100 text-green-800' :
                                                    scheme.risk === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {scheme.risk}风险
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                                            <div className="bg-green-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">年节税金额</p>
                                                <p className="font-bold text-green-600 text-lg">{(scheme.annualSaving / 10000).toFixed(1)}万</p>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">实施周期</p>
                                                <p className="font-medium text-blue-600">{scheme.implementation}</p>
                                            </div>
                                            <div className="bg-purple-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">投资回报率</p>
                                                <p className="font-bold text-purple-600">{scheme.roi}</p>
                                            </div>
                                            <div className="bg-yellow-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">可行性</p>
                                                <p className="font-medium text-yellow-600">{scheme.feasibility}</p>
                                            </div>
                                            <div className="bg-orange-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">综合评分</p>
                                                <div className="flex justify-center">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                            }`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                            <h5 className="font-medium text-gray-900 mb-2">实施详情：</h5>
                                            <p className="text-sm text-gray-600">{scheme.details}</p>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center">
                                                <Eye className="h-4 w-4 mr-2" />
                                                查看详情
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCalculatorData({
                                                        ...calculatorData,
                                                        targetScheme: scheme.name
                                                    });
                                                    setShowCalculator(true);
                                                }}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center"
                                            >
                                                <Calculator className="h-4 w-4 mr-2" />
                                                效果测算
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                制定计划
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                                                <Download className="h-4 w-4 mr-2" />
                                                导出方案
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 智能筹划机会识别 - 紧凑设计 */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                            <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                            智能筹划机会识别
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                8维度体系化分析
                            </span>
                        </h3>

                        {/* 8维度紧凑布局 */}
                        <div className="space-y-3">
                            {Object.entries(planningOpportunities).map(([key, dimension]) => {
                                const IconComponent = dimension.icon;
                                const isExpanded = expandedDimensions.has(key);

                                return (
                                    <div key={key} className={`border border-${dimension.color}-200 rounded-lg overflow-hidden`}>
                                        {/* 维度头部 - 紧凑设计，显示4个预览机会 */}
                                        <div className={`bg-${dimension.color}-50 p-4 cursor-pointer hover:bg-${dimension.color}-100 transition-colors`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <IconComponent className={`h-6 w-6 text-${dimension.color}-600`} />
                                                    <div>
                                                        <h4 className={`font-medium text-${dimension.color}-900`}>{dimension.title}</h4>
                                                        <p className={`text-xs text-${dimension.color}-600`}>
                                                            {dimension.allOpportunities?.length || 0}项机会 · 节税{dimension.totalSaving}万元
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    {/* 4个机会预览 */}
                                                    <div className="hidden lg:flex items-center space-x-2">
                                                        {dimension.previewOpportunities?.map((opp, idx) => (
                                                            <div key={idx} className={`px-2 py-1 bg-${dimension.color}-100 rounded text-xs`}>
                                                                <span className={`text-${dimension.color}-800 font-medium`}>{opp.name}</span>
                                                                <span className={`text-${dimension.color}-600 ml-1`}>({opp.saving}万)</span>
                                                            </div>
                                                        )) || []}
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => openDimensionDetail(key)}
                                                            className={`px-3 py-1 bg-${dimension.color}-600 text-white rounded text-xs hover:bg-${dimension.color}-700 flex items-center`}
                                                        >
                                                            <Eye className="h-3 w-3 mr-1" />
                                                            详情
                                                        </button>
                                                        <button
                                                            onClick={() => toggleDimension(key)}
                                                            className={`text-${dimension.color}-600 hover:text-${dimension.color}-800`}
                                                        >
                                                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 展开内容 */}
                                        {isExpanded && (
                                            <div className="p-4 bg-white border-t border-gray-100">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {dimension.allOpportunities?.slice(0, 4).map((opportunity, index) => (
                                                        <div key={index} className={`p-3 bg-${dimension.color}-50 rounded border-l-2 border-${dimension.color}-400 hover:shadow-sm transition-shadow`}>
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h5 className={`font-medium text-${dimension.color}-900 text-sm`}>{opportunity.name}</h5>
                                                                <span className={`px-1 py-0.5 text-xs rounded ${opportunity.urgency === '高' ? 'bg-red-100 text-red-800' :
                                                                    opportunity.urgency === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {opportunity.urgency}
                                                                </span>
                                                            </div>
                                                            <p className={`text-xs text-${dimension.color}-700 mb-2`}>{opportunity.detail}</p>
                                                            <div className="flex justify-between items-center text-xs">
                                                                <span className={`text-${dimension.color}-800 font-medium`}>
                                                                    节税: {opportunity.saving}万元
                                                                </span>
                                                                <span className={`text-${dimension.color}-600`}>
                                                                    {opportunity.deadline}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )) || []}
                                                </div>

                                                {/* 更多链接 */}
                                                {(dimension.allOpportunities?.length || 0) > 4 && (
                                                    <div className="mt-3 text-center">
                                                        <button
                                                            onClick={() => openDimensionDetail(key)}
                                                            className={`px-4 py-2 border border-${dimension.color}-300 text-${dimension.color}-600 rounded hover:bg-${dimension.color}-50 text-sm flex items-center mx-auto`}
                                                        >
                                                            查看全部 {dimension.allOpportunities.length} 项机会
                                                            <ChevronRight className="h-4 w-4 ml-1" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* 综合分析 - 简化版 */}
                        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                                AI综合分析建议
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded p-3">
                                    <h5 className="font-medium text-gray-900 mb-2 text-sm">优先级排序</h5>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex items-center text-red-600">
                                            <Target className="h-3 w-3 mr-1" />
                                            政策利用筹划（720万元）
                                        </div>
                                        <div className="flex items-center text-orange-600">
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                            税种专项筹划（465万元）
                                        </div>
                                        <div className="flex items-center text-yellow-600">
                                            <Star className="h-3 w-3 mr-1" />
                                            主体设计筹划（485万元）
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded p-3">
                                    <h5 className="font-medium text-gray-900 mb-2 text-sm">实施建议</h5>
                                    <div className="space-y-1 text-xs text-gray-600">
                                        <div>• 优先申请高新技术企业认定</div>
                                        <div>• 完善研发费用归集制度</div>
                                        <div>• 考虑组织架构优化调整</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded p-3">
                                    <h5 className="font-medium text-gray-900 mb-2 text-sm">风险提示</h5>
                                    <div className="space-y-1 text-xs text-red-600">
                                        <div>• 注意政策时效性要求</div>
                                        <div>• 确保商业实质合理性</div>
                                        <div>• 建立动态监控机制</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 筹划工具箱 */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Calculator className="h-5 w-5 mr-2 text-indigo-600" />
                            筹划工具箱
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <Calculator className="h-12 w-12 text-blue-500 mb-4" />
                                <h4 className="font-medium text-gray-900 mb-2">税负计算器</h4>
                                <p className="text-sm text-gray-600 mb-4">快速计算不同方案的税负影响，支持多种税种模拟</p>
                                <div className="text-xs text-gray-500 mb-3">
                                    • 增值税计算 • 企业所得税 • 个人所得税 • 综合分析
                                </div>
                                <button
                                    onClick={() => setShowCalculator(true)}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    启动计算器
                                </button>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <BarChart3 className="h-12 w-12 text-green-500 mb-4" />
                                <h4 className="font-medium text-gray-900 mb-2">方案对比分析</h4>
                                <p className="text-sm text-gray-600 mb-4">多个筹划方案的详细对比分析，科学决策支持</p>
                                <div className="text-xs text-gray-500 mb-3">
                                    • 成本效益分析 • 风险评估 • 时间进度 • ROI计算
                                </div>
                                <button
                                    onClick={() => setShowComparison(true)}
                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    开始对比
                                </button>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <LineChart className="h-12 w-12 text-purple-500 mb-4" />
                                <h4 className="font-medium text-gray-900 mb-2">敏感性分析</h4>
                                <p className="text-sm text-gray-600 mb-4">分析关键参数变化对筹划效果的影响程度</p>
                                <div className="text-xs text-gray-500 mb-3">
                                    • 参数敏感度 • 场景模拟 • 风险量化 • 阈值分析
                                </div>
                                <button
                                    onClick={() => setShowSensitivity(true)}
                                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                >
                                    开始分析
                                </button>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <Monitor className="h-12 w-12 text-teal-500 mb-4" />
                                <h4 className="font-medium text-gray-900 mb-2">政策匹配引擎</h4>
                                <p className="text-sm text-gray-600 mb-4">智能匹配适用的税收优惠政策，挖掘节税机会</p>
                                <div className="text-xs text-gray-500 mb-3">
                                    • 政策库匹配 • 适用性分析 • 申请指导 • 效益评估
                                </div>
                                <button
                                    onClick={() => {
                                        setShowPolicyMatcher(true);
                                        setTimeout(() => {
                                            setMatchedPolicies([
                                                { name: '高新技术企业认定', match: 95, benefit: '所得税减按15%征收' },
                                                { name: '研发费用加计扣除', match: 90, benefit: '200%加计扣除' },
                                                { name: '软件企业税收优惠', match: 85, benefit: '增值税即征即退' }
                                            ]);
                                        }, 1000);
                                    }}
                                    className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                                >
                                    开始匹配
                                </button>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <Brain className="h-12 w-12 text-orange-500 mb-4" />
                                <h4 className="font-medium text-gray-900 mb-2">AI智能建议</h4>
                                <p className="text-sm text-gray-600 mb-4">基于企业画像和行业数据的个性化筹划建议</p>
                                <div className="text-xs text-gray-500 mb-3">
                                    • 个性化推荐 • 行业对标 • 智能优化 • 持续学习
                                </div>
                                <button
                                    onClick={() => {
                                        setShowAIAdvice(true);
                                        setTimeout(() => {
                                            setAIAdviceData({
                                                score: 78,
                                                suggestions: [
                                                    '建议申请高新技术企业认定，预计年节税320万元',
                                                    '优化研发费用归集，提升加计扣除效果',
                                                    '调整组织架构，降低整体税负率'
                                                ]
                                            });
                                        }, 1500);
                                    }}
                                    className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                >
                                    获取建议
                                </button>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <Workflow className="h-12 w-12 text-pink-500 mb-4" />
                                <h4 className="font-medium text-gray-900 mb-2">筹划流程管理</h4>
                                <p className="text-sm text-gray-600 mb-4">全流程筹划项目管理，从方案设计到执行跟踪</p>
                                <div className="text-xs text-gray-500 mb-3">
                                    • 项目管理 • 进度跟踪 • 效果监控 • 风险控制
                                </div>
                                <button
                                    onClick={() => setShowProjectManager(true)}
                                    className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                                >
                                    创建项目
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* 计算器标签页 */}
            {activeTab === 'calculator' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                            税负计算器
                        </h3>
                        <div className="space-y-4">
                            <button
                                onClick={() => setShowCalculator(true)}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
                            >
                                <Calculator className="w-5 h-5 mr-2" />
                                启动税负计算器
                            </button>
                            <div className="text-sm text-gray-600">
                                点击按钮打开交互式税负计算器，支持多种税种计算和方案对比。
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-blue-600" />
                            使用说明
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-2">计算器功能</h4>
                                <ul className="space-y-2 text-sm text-blue-800">
                                    <li>• 输入企业年营业收入和可扣除费用</li>
                                    <li>• 系统将自动计算预估税负</li>
                                    <li>• 支持增值税和企业所得税计算</li>
                                    <li>• 提供税负优化建议</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <h4 className="font-medium text-yellow-900 mb-2">注意事项</h4>
                                <ul className="space-y-2 text-sm text-yellow-800">
                                    <li>• 计算结果仅供参考，实际税负请咨询专业人士</li>
                                    <li>• 增值税计算基于一般纳税人13%税率</li>
                                    <li>• 企业所得税按25%标准税率计算</li>
                                    <li>• 未考虑各类税收优惠政策</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                                <h4 className="font-medium text-green-900 mb-2">获取专业服务</h4>
                                <p className="text-sm text-green-800 mb-3">
                                    如需更精确的税务筹划方案，请联系我们的专业团队。
                                </p>
                                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                                    咨询专业顾问
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 政策查询标签页 */}
            {activeTab === 'policy' && (
                <PolicyQuery />
            )}

            {/* 筹划方案标签页 */}
            {activeTab === 'planning' && (
                <>
                    {/* 税务筹划维度 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {planningDimensions.map((dimension) => {
                            const colors = getColorClasses(dimension.color);

                            return (
                                <div key={dimension.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className={`${colors.bg} p-6 border-b`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <dimension.icon className={`w-8 h-8 ${colors.icon} mr-3`} />
                                                <h3 className={`text-xl font-semibold ${colors.text}`}>
                                                    {dimension.title}
                                                </h3>
                                            </div>
                                            <span className={`px-3 py-1 text-sm font-medium bg-white ${colors.text} rounded-full`}>
                                                {dimension.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-gray-700">{dimension.description}</p>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                                    {dimension.savingPotential}
                                                </div>
                                                <div className="text-sm text-gray-600">节税潜力</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                                    {dimension.timeline}
                                                </div>
                                                <div className="text-sm text-gray-600">实施周期</div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="font-semibold text-gray-900 mb-3">核心要点</h4>
                                            <ul className="space-y-2">
                                                {dimension.keyPoints.map((point, index) => (
                                                    <li key={index} className="flex items-center text-sm text-gray-600">
                                                        <ChevronRight className={`w-4 h-4 ${colors.icon} mr-2`} />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="font-semibold text-gray-900 mb-3">效果指标</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">节税额度</span>
                                                    <div className="flex items-center">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                                            <div
                                                                className={`h-2 rounded-full ${colors.button}`}
                                                                style={{ width: `${(dimension.metrics.taxSaving / 800) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-medium">{dimension.metrics.taxSaving}万</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">实施可行性</span>
                                                    <div className="flex items-center">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                                            <div
                                                                className={`h-2 rounded-full ${colors.button}`}
                                                                style={{ width: `${dimension.metrics.implementation}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-medium">{dimension.metrics.implementation}%</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">合规程度</span>
                                                    <div className="flex items-center">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                                            <div
                                                                className={`h-2 rounded-full ${colors.button}`}
                                                                style={{ width: `${dimension.metrics.compliance}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-medium">{dimension.metrics.compliance}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => generateDetailedReport(dimension.id)}
                                                className={`flex-1 ${colors.button} text-white py-3 px-4 rounded-lg font-medium hover:shadow-md transition-all duration-200 flex items-center justify-center`}
                                            >
                                                <FileText className="w-5 h-5 mr-2" />
                                                生成详细筹划报告
                                            </button>
                                            <button
                                                onClick={() => setShowHistoryReports(true)}
                                                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                                                title="查看历史报告"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 综合报告 */}
                    <div className="text-center">
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={generateComprehensiveReport}
                                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200"
                            >
                                <FileText className="w-6 h-6 mr-2 inline" />
                                生成综合税务筹划总结报告
                            </button>
                            <button
                                onClick={() => setShowHistoryReports(true)}
                                className="px-6 py-4 border-2 border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 flex items-center font-semibold"
                                title="查看历史报告"
                            >
                                <Download className="w-6 h-6 mr-2" />
                                历史报告
                            </button>
                        </div>
                        <p className="text-gray-600 mt-3">
                            基于八个维度的全面分析，为您提供综合性的税务筹划解决方案
                        </p>
                    </div>
                </>
            )}

            {/* 模态框组件 */}
            {showPlanningReport && (
                <PlanningReportModal onClose={() => setShowPlanningReport(false)} />
            )}

            {showCalculator && (
                <TaxCalculatorModal
                    data={calculatorData}
                    onClose={() => setShowCalculator(false)}
                    onUpdate={setCalculatorData}
                />
            )}

            {showComparison && (
                <ComparisonModal
                    schemes={comparisonSchemes}
                    onClose={() => setShowComparison(false)}
                />
            )}

            {showPolicyMatcher && (
                <PolicyMatcherModal
                    policies={matchedPolicies}
                    onClose={() => setShowPolicyMatcher(false)}
                />
            )}

            {/* 维度详情模态框 */}
            {showDimensionDetail && (
                <DimensionDetailModal />
            )}

            {/* 历史报告模态框 */}
            {showHistoryReports && (
                <HistoryReportsModal />
            )}
        </div>
    );
};

export default TaxCompliance;