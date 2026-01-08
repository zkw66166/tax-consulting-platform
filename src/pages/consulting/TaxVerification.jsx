import React, { useState, useRef } from 'react';
import {
    Upload,
    FileText,
    AlertTriangle,
    CheckCircle,
    Search,
    Download,
    Eye,
    Users,
    Calendar,
    BarChart3,
    Settings,
    MessageSquare,
    Database,
    Shield,
    Zap,
    BookOpen,
    Target,
    TrendingUp,
    Filter,
    Plus,
    Edit3,
    Share2,
    Archive,
    Clock,
    Star,
    RefreshCw,
    ChevronRight,
    X,
    Brain,
    Calculator,
    Award,
    Building,
    Factory,
    Monitor,
    Activity,
    Globe,
    Layers,
    Save,
    Copy,
    ExternalLink,
    Mail,
    Phone,
    MapPin,
    Building2,
    User,
    Briefcase,
    PieChart,
    LineChart,
    Flag,
    AlertCircle,
    Info,
    CheckSquare,
    FileCheck,
    FilePlus,
    FolderOpen,
    Printer,
    Send
} from 'lucide-react';

const TaxVerification = ({ selectedCompany, userType, currentTime }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedProject, setSelectedProject] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [showAnalysisResults, setShowAnalysisResults] = useState(false);
    const [showReportSummary, setShowReportSummary] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [workpaperProgress, setWorkpaperProgress] = useState({});
    const [showHistoryReports, setShowHistoryReports] = useState(false);
    const [selectedReports, setSelectedReports] = useState(new Set());
    const fileInputRef = useRef(null);

    // 统计数据
    const auditStats = {
        inProgress: 12,
        highRisk: 3,
        completed: 8,
        taxSaving: 156
    };

    // 项目数据
    const projects = [
        {
            id: 1,
            name: "某制造业企业所得税汇算",
            client: "北京创新科技有限公司",
            status: "进行中",
            progress: 65,
            riskLevel: "中等",
            dueDate: "2024-08-15",
            auditor: "张三",
            category: "企业所得税",
            startDate: "2024-07-01",
            estimatedHours: 120,
            actualHours: 78
        },
        {
            id: 2,
            name: "房地产土增税清算",
            client: "XYZ地产开发",
            status: "复核中",
            progress: 85,
            riskLevel: "高",
            dueDate: "2024-08-20",
            auditor: "李四",
            category: "土地增值税",
            startDate: "2024-06-15",
            estimatedHours: 200,
            actualHours: 170
        },
        {
            id: 3,
            name: "研发费用专项鉴证",
            client: "科技创新公司",
            status: "已完成",
            progress: 100,
            riskLevel: "低",
            dueDate: "2024-07-30",
            auditor: "王五",
            category: "专项鉴证",
            startDate: "2024-06-01",
            estimatedHours: 80,
            actualHours: 75
        },
        {
            id: 4,
            name: "跨境服务增值税审核",
            client: "国际贸易集团",
            status: "进行中",
            progress: 45,
            riskLevel: "高",
            dueDate: "2024-09-10",
            auditor: "赵六",
            category: "增值税",
            startDate: "2024-07-20",
            estimatedHours: 150,
            actualHours: 68
        }
    ];

    // 风险项目数据
    const riskItems = [
        {
            type: "收入确认",
            description: "跨期租金收入处理",
            level: "高风险",
            suggestion: "需补充租赁合同分析",
            impact: "可能导致税款调整285万元",
            deadline: "2024-08-30",
            projectId: 1
        },
        {
            type: "成本费用",
            description: "研发费用归集缺少项目编号",
            level: "中风险",
            suggestion: "需提供研发项目工时分配表",
            impact: "影响加计扣除156万元",
            deadline: "2024-08-25",
            projectId: 3
        },
        {
            type: "税收优惠",
            description: "小微企业优惠未充分享受",
            level: "优惠提示",
            suggestion: "可节税约42万元",
            impact: "优化税负结构",
            deadline: "2024-12-31",
            projectId: 1
        },
        {
            type: "关联交易",
            description: "转让定价文档不完整",
            level: "高风险",
            suggestion: "需补充同期资料和特殊事项文档",
            impact: "可能面临税务调整风险",
            deadline: "2024-09-15",
            projectId: 4
        }
    ];

    // 工作底稿数据
    const workpapers = [
        {
            id: 1,
            name: "试算平衡表",
            status: "已生成",
            progress: 100,
            lastUpdated: "2024-07-30 10:30",
            reviewer: "张三",
            category: "基础底稿",
            description: "自动从财务系统提取数据并填充"
        },
        {
            id: 2,
            name: "收入确认分析",
            status: "生成中",
            progress: 70,
            lastUpdated: "2024-07-30 14:20",
            reviewer: "李四",
            category: "重点科目",
            description: "基于销售合同和发票自动分析"
        },
        {
            id: 3,
            name: "成本费用核查",
            status: "待生成",
            progress: 0,
            lastUpdated: "",
            reviewer: "",
            category: "重点科目",
            description: "智能识别异常成本项目"
        },
        {
            id: 4,
            name: "税收优惠核查",
            status: "待生成",
            progress: 0,
            lastUpdated: "",
            reviewer: "",
            category: "专项检查",
            description: "检查未享受的税收优惠政策"
        },
        {
            id: 5,
            name: "关联交易分析",
            status: "复核中",
            progress: 90,
            lastUpdated: "2024-07-29 16:45",
            reviewer: "王五",
            category: "专项检查",
            description: "关联方识别与定价分析"
        },
        {
            id: 6,
            name: "税负分析表",
            status: "已完成",
            progress: 100,
            lastUpdated: "2024-07-28 09:15",
            reviewer: "赵六",
            category: "分析性复核",
            description: "行业对比和趋势分析"
        }
    ];

    // 报告数据
    const reports = [
        {
            id: 1,
            title: "北京创新科技有限公司企业所得税汇算清缴鉴证报告",
            type: "enterprise-income-tax",
            status: "已完成",
            createDate: "2024-07-30",
            updateDate: "2024-07-30",
            author: "张三",
            reviewer: "李经理",
            client: "北京创新科技有限公司",
            taxYear: "2023年度",
            fileSize: "2.8MB",
            pages: 45,
            summary: {
                totalRevenue: "5.2亿元",
                taxableIncome: "3800万元",
                taxAmount: "950万元",
                keyFindings: [
                    "企业享受高新技术企业15%优惠税率",
                    "研发费用加计扣除1260万元",
                    "固定资产加速折旧优惠320万元"
                ],
                riskPoints: [
                    "部分研发费用归集需要完善",
                    "关联交易定价需要补充同期资料"
                ],
                conclusion: "无保留意见"
            }
        },
        {
            id: 2,
            title: "XYZ地产开发土地增值税清算鉴证报告",
            type: "land-value-added-tax",
            status: "复核中",
            createDate: "2024-07-28",
            updateDate: "2024-07-30",
            author: "李四",
            reviewer: "王经理",
            client: "XYZ地产开发",
            taxYear: "2023年度",
            fileSize: "3.5MB",
            pages: 62,
            summary: {
                totalRevenue: "12.8亿元",
                deductibleAmount: "9.6亿元",
                taxableAmount: "3.2亿元",
                taxAmount: "9600万元",
                keyFindings: [
                    "土地成本扣除符合规定",
                    "开发成本归集基本合理",
                    "销售费用扣除标准符合要求"
                ],
                riskPoints: [
                    "部分装修费用扣除标准需要确认",
                    "公共配套设施费用分摊需要完善"
                ],
                conclusion: "保留意见"
            }
        },
        {
            id: 3,
            title: "科技创新公司研发费用专项鉴证报告",
            type: "rd-expense-verification",
            status: "已完成",
            createDate: "2024-07-25",
            updateDate: "2024-07-30",
            author: "王五",
            reviewer: "张经理",
            client: "科技创新公司",
            taxYear: "2023年度",
            fileSize: "1.9MB",
            pages: 28,
            summary: {
                totalRDExpense: "2800万元",
                deductibleAmount: "5600万元",
                taxSaving: "1400万元",
                keyFindings: [
                    "研发项目识别准确",
                    "费用归集符合规定",
                    "加计扣除比例正确"
                ],
                riskPoints: [
                    "部分人员工时分配需要完善"
                ],
                conclusion: "无保留意见"
            }
        }
    ];

    // 历史报告数据
    const [historyReports, setHistoryReports] = useState([
        {
            id: 1,
            title: '企业所得税汇算清缴鉴证报告',
            type: 'enterprise-income-tax',
            date: '2024-07-30',
            size: '2.8MB',
            format: 'PDF',
            client: '北京创新科技有限公司'
        },
        {
            id: 2,
            title: '土地增值税清算鉴证报告',
            type: 'land-value-added-tax',
            date: '2024-07-28',
            size: '3.5MB',
            format: 'PDF',
            client: 'XYZ地产开发'
        },
        {
            id: 3,
            title: '研发费用专项鉴证报告',
            type: 'rd-expense-verification',
            date: '2024-07-25',
            size: '1.9MB',
            format: 'Word',
            client: '科技创新公司'
        },
        {
            id: 4,
            title: '高新技术企业认定专项审计报告',
            type: 'high-tech-audit',
            date: '2024-07-20',
            size: '2.1MB',
            format: 'PDF',
            client: '某科技股份公司'
        },
        {
            id: 5,
            title: '软件企业增值税退税专项报告',
            type: 'software-vat-refund',
            date: '2024-07-15',
            size: '1.6MB',
            format: 'Word',
            client: '智慧软件有限公司'
        }
    ]);

    // 智能分析结果数据
    const analysisResults = {
        overallRiskScore: 7.2,
        complianceRate: 92.5,
        potentialSaving: 485,
        keyFindings: [
            {
                category: "政策适用性",
                score: 8.5,
                description: "企业享受的税收优惠政策基本合规，但仍有优化空间",
                recommendations: ["完善高新技术企业管理制度", "加强研发费用归集管理"]
            },
            {
                category: "数据准确性",
                score: 6.8,
                description: "财务数据与税务申报存在部分差异",
                recommendations: ["建立财税一体化管理体系", "完善内部控制制度"]
            },
            {
                category: "风险控制",
                score: 7.5,
                description: "税务风险识别机制相对完善，执行有待加强",
                recommendations: ["定期开展税务自查", "建立预警机制"]
            }
        ]
    };

    // 144条规则库数据
    const ruleCategories = [
        { name: "收入确认类", count: 17, description: "附退货权销售、买一赠一、跨期租金收入等", icon: TrendingUp, color: "blue" },
        { name: "成本费用类", count: 25, description: "研发费用归集、广告费超标、关联方服务费等", icon: Calculator, color: "green" },
        { name: "资产交易类", count: 21, description: "固定资产加速折旧、股权转让定价等", icon: Building, color: "purple" },
        { name: "跨境业务类", count: 18, description: "特许权使用费、常设机构判定、受益所有人认定等", icon: Globe, color: "indigo" },
        { name: "税收优惠类", count: 37, description: "小微企业所得税、软件企业退税、高新技术企业等", icon: Award, color: "orange" },
        { name: "特殊事项类", count: 26, description: "债务重组、政策性搬迁、股权激励等", icon: Layers, color: "red" }
    ];

    // 文件上传处理
    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            let progress = 0;
            setUploadProgress(0);
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setUploadProgress(0), 1000);
                }
            }, 200);
        }
    };

    // 智能分析处理
    const runIntelligentAnalysis = () => {
        setAnalysisProgress(0);
        setShowAnalysisResults(false);

        const interval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setShowAnalysisResults(true);
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 150);
    };

    // 生成底稿
    const generateWorkpaper = (workpaperId) => {
        setWorkpaperProgress(prev => ({ ...prev, [workpaperId]: 0 }));

        const interval = setInterval(() => {
            setWorkpaperProgress(prev => {
                const currentProgress = prev[workpaperId] || 0;
                if (currentProgress >= 100) {
                    clearInterval(interval);
                    return prev;
                }
                return { ...prev, [workpaperId]: currentProgress + 10 };
            });
        }, 200);
    };

    // 查看报告详情
    const viewReportDetail = (report) => {
        switch (report.type) {
            case 'enterprise-income-tax':
                import('../../report/EnterpriseIncomeTaxVerificationReport.js').then(module => {
                    const reportData = module.getEnterpriseIncomeTaxReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            case 'land-value-added-tax':
                import('../../report/LandValueAddedTaxVerificationReport.js').then(module => {
                    const reportData = module.getLandValueAddedTaxReportData();
                    const htmlContent = module.generateReportHTML(reportData);
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                });
                break;
            case 'rd-expense-verification':
                import('../../report/RDExpenseVerificationReport.js').then(module => {
                    const reportData = module.getRDExpenseReportData();
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
        alert(`正在下载${selectedReportsList.length}个报告为${format}格式`);
    };

    // 获取状态样式
    const getStatusStyle = (status) => {
        const styles = {
            '进行中': 'bg-blue-100 text-blue-800',
            '复核中': 'bg-yellow-100 text-yellow-800',
            '已完成': 'bg-green-100 text-green-800',
            '已生成': 'bg-green-100 text-green-800',
            '生成中': 'bg-yellow-100 text-yellow-800',
            '待生成': 'bg-gray-100 text-gray-800'
        };
        return styles[status] || 'bg-gray-100 text-gray-800';
    };

    // 获取风险级别样式
    const getRiskStyle = (level) => {
        const styles = {
            '高': 'bg-red-100 text-red-800',
            '高风险': 'bg-red-100 text-red-800',
            '中等': 'bg-yellow-100 text-yellow-800',
            '中风险': 'bg-yellow-100 text-yellow-800',
            '低': 'bg-green-100 text-green-800',
            '优惠提示': 'bg-green-100 text-green-800'
        };
        return styles[level] || 'bg-gray-100 text-gray-800';
    };

    // 报告摘要模态框
    const ReportSummaryModal = () => {
        if (!selectedReport) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                    <div className="bg-blue-50 border-b border-blue-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                                    {selectedReport.title}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-blue-700">
                                    <span>客户: {selectedReport.client}</span>
                                    <span>年度: {selectedReport.taxYear}</span>
                                    <span>状态: {selectedReport.status}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowReportSummary(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* 基本信息 */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 flex items-center">
                                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                                    基本信息
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">创建日期:</span>
                                        <span>{selectedReport.createDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">更新日期:</span>
                                        <span>{selectedReport.updateDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">撰写人:</span>
                                        <span>{selectedReport.author}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">复核人:</span>
                                        <span>{selectedReport.reviewer}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">页数:</span>
                                        <span>{selectedReport.pages}页</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">文件大小:</span>
                                        <span>{selectedReport.fileSize}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 财务数据 */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 flex items-center">
                                    <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                                    核心数据
                                </h4>
                                <div className="space-y-2 text-sm">
                                    {selectedReport.summary.totalRevenue && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">营业收入:</span>
                                            <span className="font-medium">{selectedReport.summary.totalRevenue}</span>
                                        </div>
                                    )}
                                    {selectedReport.summary.taxableIncome && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">应纳税所得额:</span>
                                            <span className="font-medium">{selectedReport.summary.taxableIncome}</span>
                                        </div>
                                    )}
                                    {selectedReport.summary.taxableAmount && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">增值额:</span>
                                            <span className="font-medium">{selectedReport.summary.taxableAmount}</span>
                                        </div>
                                    )}
                                    {selectedReport.summary.totalRDExpense && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">研发费用:</span>
                                            <span className="font-medium">{selectedReport.summary.totalRDExpense}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">应纳税额:</span>
                                        <span className="font-medium text-red-600">{selectedReport.summary.taxAmount}</span>
                                    </div>
                                    {selectedReport.summary.taxSaving && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">节税金额:</span>
                                            <span className="font-medium text-green-600">{selectedReport.summary.taxSaving}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 主要发现 */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                                主要发现
                            </h4>
                            <ul className="space-y-2">
                                {selectedReport.summary.keyFindings.map((finding, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <ChevronRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{finding}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 风险提示 */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                                风险提示
                            </h4>
                            <ul className="space-y-2">
                                {selectedReport.summary.riskPoints.map((risk, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <ChevronRight className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{risk}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 鉴证结论 */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                <Flag className="h-5 w-5 mr-2 text-purple-600" />
                                鉴证结论
                            </h4>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 mr-2">审计意见:</span>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${selectedReport.summary.conclusion === '无保留意见'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {selectedReport.summary.conclusion}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                报告创建于 {selectedReport.createDate}，最后更新于 {selectedReport.updateDate}
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => viewReportDetail(selectedReport)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    查看报告
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                                    <Download className="h-4 w-4 mr-2" />
                                    下载报告
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    分享
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
                                                    <span>客户: {report.client}</span>
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
                                                    // 根据report.type调用对应的查看函数
                                                    const reportObj = reports.find(r => r.type === report.type);
                                                    if (reportObj) {
                                                        viewReportDetail(reportObj);
                                                    }
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

    // 渲染概览页面
    const renderOverview = () => (
        <div className="space-y-6">
            {/* 页面标题 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    智能税务鉴证
                </h1>
                <p className="text-gray-600">
                    基于AI技术的全方位税务鉴证复核分析，提升鉴证质量和效率
                </p>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    {
                        title: '进行中项目',
                        value: auditStats.inProgress,
                        icon: FileText,
                        color: 'blue',
                        change: '+2个较上月'
                    },
                    {
                        title: '高风险项目',
                        value: auditStats.highRisk,
                        icon: AlertTriangle,
                        color: 'red',
                        change: '需重点关注'
                    },
                    {
                        title: '本月完成',
                        value: auditStats.completed,
                        icon: CheckCircle,
                        color: 'green',
                        change: '+60%完成率'
                    },
                    {
                        title: '累计节税',
                        value: `${auditStats.taxSaving}万`,
                        icon: TrendingUp,
                        color: 'purple',
                        change: '通过复核发现'
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

            {/* 快速操作 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    快速操作
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: '开始新项目', icon: Plus, color: 'blue', action: () => setActiveTab('dataCollection') },
                        { name: '智能分析', icon: Brain, color: 'green', action: () => setActiveTab('intelligent') },
                        { name: '生成底稿', icon: FileText, color: 'purple', action: () => setActiveTab('workpapers') },
                        { name: '查看报告', icon: Eye, color: 'orange', action: () => setActiveTab('reports') }
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={item.action}
                            className={`flex items-center justify-center p-4 rounded-lg border-2 border-${item.color}-200 text-${item.color}-600 hover:bg-${item.color}-50 transition-colors duration-200`}
                        >
                            <item.icon className="w-5 h-5 mr-2" />
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* 项目列表 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">最近项目</h3>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                        查看全部
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
                <div className="space-y-4">
                    {projects.slice(0, 3).map(project => (
                        <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{project.name}</h4>
                                <p className="text-sm text-gray-600">{project.client}</p>
                                <div className="mt-2 flex items-center space-x-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getRiskStyle(project.riskLevel)}`}>
                                        {project.riskLevel}风险
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        审核员: {project.auditor}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{project.progress}%</p>
                                    <p className="text-xs text-gray-600">{project.dueDate}</p>
                                </div>
                                <div className="w-20">
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 渲染智能分析页面
    const renderIntelligentAnalysis = () => (
        <div className="space-y-6">
            {/* 分析控制面板 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Brain className="h-6 w-6 mr-2 text-green-600" />
                        AI智能分析引擎
                    </h3>
                    <button
                        onClick={runIntelligentAnalysis}
                        disabled={analysisProgress > 0 && analysisProgress < 100}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                    >
                        {analysisProgress > 0 && analysisProgress < 100 ? (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                分析中...
                            </>
                        ) : (
                            <>
                                <Zap className="h-4 w-4 mr-2" />
                                开始智能分析
                            </>
                        )}
                    </button>
                </div>

                {/* 分析进度 */}
                {analysisProgress > 0 && analysisProgress <= 100 && (
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">AI分析进度</span>
                            <span className="text-sm text-gray-600">{analysisProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${analysisProgress}%` }}
                            ></div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            正在运行144条规则库检测...
                        </div>
                    </div>
                )}

                {/* 分析结果 */}
                {showAnalysisResults && (
                    <div className="space-y-6">
                        {/* 总体评分 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-blue-50 rounded-lg">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {analysisResults.overallRiskScore}
                                </div>
                                <p className="text-sm text-gray-600">综合风险评分</p>
                                <p className="text-xs text-blue-600 mt-1">满分10分</p>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-lg">
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    {analysisResults.complianceRate}%
                                </div>
                                <p className="text-sm text-gray-600">合规率</p>
                                <p className="text-xs text-green-600 mt-1">较行业平均高8.3%</p>
                            </div>
                            <div className="text-center p-6 bg-purple-50 rounded-lg">
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {analysisResults.potentialSaving}万
                                </div>
                                <p className="text-sm text-gray-600">优化潜力</p>
                                <p className="text-xs text-purple-600 mt-1">预计可节税金额</p>
                            </div>
                        </div>

                        {/* 详细发现 */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">核心发现</h4>
                            {analysisResults.keyFindings.map((finding, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h5 className="font-medium text-gray-900">{finding.category}</h5>
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-600 mr-2">评分:</span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${finding.score >= 8 ? 'bg-green-100 text-green-800' :
                                                finding.score >= 6 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {finding.score}/10
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-4">{finding.description}</p>
                                    <div>
                                        <h6 className="font-medium text-gray-900 mb-2">改进建议:</h6>
                                        <ul className="space-y-1">
                                            {finding.recommendations.map((rec, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-600">
                                                    <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 144条规则引擎 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    智能规则引擎（144条核心规则）
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ruleCategories.map((category, index) => (
                        <div key={index} className={`p-4 border-l-4 border-${category.color}-500 bg-${category.color}-50 rounded-lg`}>
                            <div className="flex items-center mb-3">
                                <category.icon className={`h-6 w-6 text-${category.color}-600 mr-2`} />
                                <h4 className={`font-medium text-${category.color}-900`}>
                                    {category.name}（{category.count}条）
                                </h4>
                            </div>
                            <p className={`text-sm text-${category.color}-700`}>
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 其他渲染函数保持不变...
    const renderDataCollection = () => (
        <div className="space-y-6">
            {/* 资料上传区域 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">智能资料收集</h3>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">上传客户资料</p>
                    <p className="text-sm text-gray-600 mb-4">支持发票、合同、账簿、申报表等多种格式</p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.xlsx,.xls,.jpg,.png,.doc,.docx"
                    />

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        选择文件
                    </button>

                    {uploadProgress > 0 && (
                        <div className="mt-4">
                            <div className="bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">上传进度: {uploadProgress}%</p>
                        </div>
                    )}
                </div>

                {/* AI处理状态 */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { status: 'OCR识别完成', count: '156个文档', icon: CheckCircle, color: 'green' },
                        { status: '智能分类中', count: '正在分析文档类型', icon: Zap, color: 'blue' },
                        { status: '缺失资料提醒', count: '需补充3项资料', icon: AlertTriangle, color: 'yellow' }
                    ].map((item, index) => (
                        <div key={index} className={`flex items-center p-4 bg-${item.color}-50 rounded-lg`}>
                            <item.icon className={`h-5 w-5 text-${item.color}-600 mr-3`} />
                            <div>
                                <p className={`font-medium text-${item.color}-900`}>{item.status}</p>
                                <p className={`text-sm text-${item.color}-700`}>{item.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 数据核对区域 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">智能数据核对</h3>

                <div className="space-y-4">
                    {[
                        { check: '总账vs明细账', result: '核对完成，无差异', status: 'pass', icon: CheckCircle },
                        { check: '申报表vs账簿', result: '发现3处差异，需人工确认', status: 'warning', icon: AlertTriangle },
                        { check: '增值税进销项匹配', result: '发现156万元进项税无法匹配', status: 'error', icon: AlertTriangle }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                                <item.icon className={`h-5 w-5 mr-3 ${item.status === 'pass' ? 'text-green-600' :
                                    item.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                    }`} />
                                <div>
                                    <p className="font-medium text-gray-900">{item.check}</p>
                                    <p className="text-sm text-gray-600">{item.result}</p>
                                </div>
                            </div>
                            {item.status !== 'pass' && (
                                <button className="text-blue-600 hover:text-blue-800 font-medium">查看详情</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderRiskAssessment = () => (
        <div className="space-y-6">
            {/* 风险概览 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: '高风险项目', count: 8, color: 'red', icon: AlertTriangle, desc: '需重点关注' },
                    { title: '中等风险', count: 15, color: 'yellow', icon: AlertTriangle, desc: '常规检查' },
                    { title: '优化机会', count: 12, color: 'green', icon: TrendingUp, desc: '可节税156万' }
                ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <div className={`p-2 bg-${item.color}-100 rounded-full`}>
                                <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                            </div>
                        </div>
                        <p className={`text-3xl font-bold text-${item.color}-600`}>{item.count}</p>
                        <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* 风险详情列表 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">智能风险识别结果</h3>
                    <div className="flex space-x-2">
                        <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2" />
                            筛选
                        </button>
                        <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-2" />
                            导出
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {riskItems.map((item, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <span className="font-medium text-gray-900 mr-3">{item.type}</span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getRiskStyle(item.level)}`}>
                                            {item.level}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mb-2">{item.description}</p>
                                    <p className="text-sm text-blue-600 mb-2">{item.suggestion}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span>影响: {item.impact}</span>
                                        <span>截止: {item.deadline}</span>
                                    </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                        <BookOpen className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderWorkpapers = () => (
        <div className="space-y-6">
            {/* 底稿生成工具 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    智能底稿生成
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workpapers.map((workpaper) => (
                        <div key={workpaper.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-gray-900">{workpaper.name}</h4>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(workpaper.status)}`}>
                                    {workpaper.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{workpaper.description}</p>

                            {/* 进度条 */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-gray-500">完成进度</span>
                                    <span className="text-xs text-gray-500">{workpaper.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${workpaper.status === '已完成' ? 'bg-green-600' :
                                            workpaper.status === '生成中' || workpaper.status === '复核中' ? 'bg-yellow-600' :
                                                'bg-gray-400'
                                            }`}
                                        style={{ width: `${workpaperProgress[workpaper.id] || workpaper.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* 底稿信息 */}
                            <div className="space-y-2 text-xs text-gray-500 mb-4">
                                <div className="flex justify-between">
                                    <span>分类:</span>
                                    <span>{workpaper.category}</span>
                                </div>
                                {workpaper.lastUpdated && (
                                    <div className="flex justify-between">
                                        <span>更新时间:</span>
                                        <span>{workpaper.lastUpdated}</span>
                                    </div>
                                )}
                                {workpaper.reviewer && (
                                    <div className="flex justify-between">
                                        <span>复核人:</span>
                                        <span>{workpaper.reviewer}</span>
                                    </div>
                                )}
                            </div>

                            {/* 操作按钮 */}
                            <div className="flex space-x-2">
                                {workpaper.status === '待生成' ? (
                                    <button
                                        onClick={() => generateWorkpaper(workpaper.id)}
                                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700"
                                    >
                                        开始生成
                                    </button>
                                ) : workpaper.status === '生成中' ? (
                                    <button className="flex-1 bg-gray-300 text-gray-500 py-2 px-3 rounded text-xs cursor-not-allowed">
                                        生成中...
                                    </button>
                                ) : (
                                    <>
                                        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-xs hover:bg-green-700">
                                            查看底稿
                                        </button>
                                        <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-50">
                                            <Download className="h-3 w-3" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 复核辅助系统 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckSquare className="h-6 w-6 mr-2 text-purple-600" />
                    智能复核辅助
                </h3>

                <div className="space-y-4">
                    {[
                        {
                            title: '合规性检查',
                            status: 'pass',
                            description: '所有必填项目已完成，签名链完整',
                            icon: CheckCircle
                        },
                        {
                            title: '逻辑一致性检查',
                            status: 'warning',
                            description: '发现2处数据不一致，需确认',
                            icon: AlertTriangle
                        },
                        {
                            title: '文字质量分析',
                            status: 'info',
                            description: '分析底稿描述的专业性和完整性',
                            icon: BookOpen
                        }
                    ].map((item, index) => (
                        <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${item.status === 'pass' ? 'bg-green-50 border-green-200' :
                            item.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                                'bg-blue-50 border-blue-200'
                            }`}>
                            <div className="flex items-center">
                                <item.icon className={`h-5 w-5 mr-3 ${item.status === 'pass' ? 'text-green-600' :
                                    item.status === 'warning' ? 'text-yellow-600' :
                                        'text-blue-600'
                                    }`} />
                                <div>
                                    <p className={`font-medium ${item.status === 'pass' ? 'text-green-900' :
                                        item.status === 'warning' ? 'text-yellow-900' :
                                            'text-blue-900'
                                        }`}>{item.title}</p>
                                    <p className={`text-sm ${item.status === 'pass' ? 'text-green-700' :
                                        item.status === 'warning' ? 'text-yellow-700' :
                                            'text-blue-700'
                                        }`}>{item.description}</p>
                                </div>
                            </div>
                            {item.status === 'pass' ? (
                                <span className="text-green-600 font-medium">✓ 通过</span>
                            ) : (
                                <button className="text-blue-600 hover:text-blue-800 font-medium">
                                    {item.status === 'warning' ? '查看详情' : '开始分析'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderReports = () => (
        <div className="space-y-6">
            {/* 报告列表 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FileText className="h-6 w-6 mr-2 text-blue-600" />
                        鉴证报告管理
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowHistoryReports(true)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                        >
                            <Archive className="h-4 w-4 mr-2" />
                            历史报告
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            筛选
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            新建报告
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-lg mb-2">{report.title}</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Building className="h-4 w-4 mr-1" />
                                            {report.client}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {report.taxYear}
                                        </div>
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 mr-1" />
                                            {report.author}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {report.updateDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(report.status)}`}>
                                        {report.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span>{report.pages}页</span>
                                    <span>{report.fileSize}</span>
                                    <span>结论: {report.summary.conclusion}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedReport(report);
                                            setShowReportSummary(true);
                                        }}
                                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center"
                                    >
                                        <Eye className="h-3 w-3 mr-1" />
                                        浏览报告
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-50 flex items-center">
                                        <Edit3 className="h-3 w-3 mr-1" />
                                        编辑
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-50 flex items-center">
                                        <Download className="h-3 w-3 mr-1" />
                                        下载
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 报告生成器 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FilePlus className="h-6 w-6 mr-2 text-green-600" />
                    智能报告生成
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-4">报告类型选择</h4>
                        <div className="space-y-3">
                            {[
                                { type: 'enterprise-income-tax', label: '企业所得税汇算清缴鉴证报告' },
                                { type: 'land-value-added-tax', label: '土地增值税清算鉴证报告' },
                                { type: 'rd-expense-verification', label: '研发费用专项鉴证报告' },
                                { type: 'asset-loss-verification', label: '资产损失专项鉴证报告' }
                            ].map((item) => (
                                <label key={item.type} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value={item.type}
                                        className="mr-3"
                                        defaultChecked={item.type === 'enterprise-income-tax'}
                                    />
                                    <span>{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-4">报告设置</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    报告期间
                                </label>
                                <input
                                    type="text"
                                    defaultValue="2023年度"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    签字税务师
                                </label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                    <option>张三（注册税务师）</option>
                                    <option>李四（注册税务师）</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    报告日期
                                </label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        生成报告草稿
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        预览模板
                    </button>
                </div>
            </div>

            {/* 版本控制 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Archive className="h-6 w-6 mr-2 text-purple-600" />
                    版本控制与协同
                </h3>

                <div className="space-y-4">
                    {[
                        { version: 'V1.0 初稿', author: '张三', date: '2024-07-30 10:30', isCurrent: false },
                        { version: 'V1.1 修订版', author: '李四', date: '2024-07-30 14:20', isCurrent: true }
                    ].map((version, index) => (
                        <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${version.isCurrent ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                            }`}>
                            <div>
                                <p className="font-medium text-gray-900">{version.version}</p>
                                <p className="text-sm text-gray-600">{version.author} - {version.date} {version.isCurrent && '(当前版本)'}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">下载</button>
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                    {version.isCurrent ? '编辑' : '查看'}
                                </button>
                                {!version.isCurrent && (
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">对比</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex space-x-4">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        发布正式版
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 flex items-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        分享给客户
                    </button>
                </div>
            </div>
        </div>
    );

    const renderProjectManagement = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                        项目管理
                    </h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        新建项目
                    </button>
                </div>

                <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-lg">{project.name}</h4>
                                    <p className="text-gray-600">{project.client}</p>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(project.status)}`}>
                                            {project.status}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getRiskStyle(project.riskLevel)}`}>
                                            {project.riskLevel}风险
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            类型: {project.category}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            审核员: {project.auditor}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">进度: {project.progress}%</p>
                                    <p className="text-xs text-gray-600">截止: {project.dueDate}</p>
                                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* 项目详细信息 */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                                <div>
                                    <span className="font-medium">开始时间:</span>
                                    <br />
                                    {project.startDate}
                                </div>
                                <div>
                                    <span className="font-medium">预计工时:</span>
                                    <br />
                                    {project.estimatedHours}小时
                                </div>
                                <div>
                                    <span className="font-medium">实际工时:</span>
                                    <br />
                                    {project.actualHours}小时
                                </div>
                                <div>
                                    <span className="font-medium">工时效率:</span>
                                    <br />
                                    {((project.actualHours / project.estimatedHours) * 100).toFixed(1)}%
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center">
                                    <Eye className="h-4 w-4 mr-2" />
                                    查看详情
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    编辑
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                                    <Users className="h-4 w-4 mr-2" />
                                    团队
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                                    <Download className="h-4 w-4 mr-2" />
                                    导出
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderKnowledgeBase = () => (
        <div className="space-y-6">
            {/* 搜索区域 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">智能知识库</h3>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜索法规、案例、模板..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {['研发费用', '收入确认', '税收优惠', '关联交易', '土地增值税'].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 知识分类 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: '法规库', icon: BookOpen, color: 'blue', items: ['企业所得税法实施条例', '研发费用加计扣除政策', '小微企业税收优惠'] },
                    { title: '案例库', icon: FileText, color: 'green', items: ['制造业研发费用归集案例', '房地产预收款处理案例', '跨境服务增值税案例'] },
                    { title: '模板库', icon: Target, color: 'purple', items: ['所得税汇算底稿模板', '土增税清算底稿模板', '专项鉴证底稿模板'] }
                ].map((category, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center mb-4">
                            <category.icon className={`h-6 w-6 text-${category.color}-600 mr-3`} />
                            <h4 className="font-semibold text-gray-900">{category.title}</h4>
                        </div>
                        <p className="text-gray-600 mb-4">专业知识资源库</p>
                        <ul className="space-y-2 text-sm">
                            {category.items.map((item, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-blue-600 hover:underline">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* 规则引擎展示 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">税务规则引擎（144条核心规则）</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ruleCategories.map((category, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">
                                {category.name}（{category.count}条）
                            </h4>
                            <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* 标签页导航 */}
            <div className="mb-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {[
                            { id: 'overview', name: '概览', icon: BarChart3 },
                            { id: 'intelligent', name: '智能分析', icon: Brain },
                            { id: 'dataCollection', name: '数据采集', icon: Database },
                            { id: 'riskAssessment', name: '风险评估', icon: AlertTriangle },
                            { id: 'workpapers', name: '工作底稿', icon: FileText },
                            { id: 'reports', name: '报告生成', icon: Edit3 },
                            { id: 'projects', name: '项目管理', icon: Briefcase },
                            { id: 'knowledgeBase', name: '知识库', icon: BookOpen }
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

            {/* 标签页内容 */}
            <div>
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'intelligent' && renderIntelligentAnalysis()}
                {activeTab === 'dataCollection' && renderDataCollection()}
                {activeTab === 'riskAssessment' && renderRiskAssessment()}
                {activeTab === 'workpapers' && renderWorkpapers()}
                {activeTab === 'reports' && renderReports()}
                {activeTab === 'projects' && renderProjectManagement()}
                {activeTab === 'knowledgeBase' && renderKnowledgeBase()}
            </div>

            {/* 模态框 */}
            {showReportSummary && <ReportSummaryModal />}
            {showHistoryReports && <HistoryReportsModal />}
        </div>
    );
};

export default TaxVerification;