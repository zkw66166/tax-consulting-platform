import React, { useState } from 'react';
import { BarChart3, Zap, ExternalLink, Shield, Activity, TrendingUp, Lightbulb, Eye, Calendar, Calculator, CheckCircle, Star, Network, Settings, Monitor, PieChart, ArrowLeft, Download, FileText, Target, Clock, Users, DollarSign, AlertTriangle, CheckSquare, X, ChevronRight, Award, Gauge, BookOpen, Clipboard, Plus, Minus, Info, RotateCcw, Building, GitBranch, Home, MapPin, Phone, Mail, User, CreditCard, TrendingDown, AlertCircle, Database, Cpu, Lock, Brain, PlayCircle, Pause, ChevronDown, ChevronUp, Bot, UserCheck, Workflow, CheckCircle2 } from 'lucide-react';
import { generateFinancialSystemDiagnosisReportHTML, getFinancialSystemDiagnosisReportData } from '../../report/FinancialSystemDiagnosisReport.js';

// 企业信息编辑模态框
const CompanyInfoModal = ({ onClose, onSave }) => {
    const [companyInfo, setCompanyInfo] = useState({
        name: '科技创新股份有限公司',
        establishYear: '2018',
        business: '软件和信息技术服务',
        registeredCapital: '5000万元',
        employeeCount: '280人',
        revenue2021: '8500万元',
        revenue2022: '12000万元',
        revenue2023: '15800万元',
        assetLiabilityRatio: '52%',
        currentRatio: '1.8',
        roe: '18.5%',
        creditCode: '91110000MA01234567',
        address: '北京市海淀区中关村软件园',
        contactPerson: '张财务',
        phone: '010-12345678',
        email: 'finance@company.com'
    });

    const handleSave = () => {
        onSave(companyInfo);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <Building className="h-6 w-6 mr-2 text-blue-600" />
                            企业基本信息维护
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">基础信息</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">企业名称</label>
                                <input
                                    type="text"
                                    value={companyInfo.name}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">统一社会信用代码</label>
                                <input
                                    type="text"
                                    value={companyInfo.creditCode}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, creditCode: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">成立年份</label>
                                <input
                                    type="text"
                                    value={companyInfo.establishYear}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, establishYear: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">主营业务</label>
                                <input
                                    type="text"
                                    value={companyInfo.business}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, business: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">注册资本</label>
                                <input
                                    type="text"
                                    value={companyInfo.registeredCapital}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, registeredCapital: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">员工总数</label>
                                <input
                                    type="text"
                                    value={companyInfo.employeeCount}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, employeeCount: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">财务数据</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">2021年营业收入</label>
                                <input
                                    type="text"
                                    value={companyInfo.revenue2021}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, revenue2021: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">2022年营业收入</label>
                                <input
                                    type="text"
                                    value={companyInfo.revenue2022}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, revenue2022: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">2023年营业收入</label>
                                <input
                                    type="text"
                                    value={companyInfo.revenue2023}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, revenue2023: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">资产负债率</label>
                                <input
                                    type="text"
                                    value={companyInfo.assetLiabilityRatio}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, assetLiabilityRatio: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">流动比率</label>
                                <input
                                    type="text"
                                    value={companyInfo.currentRatio}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, currentRatio: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">净资产收益率</label>
                                <input
                                    type="text"
                                    value={companyInfo.roe}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, roe: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            保存信息
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 自动诊断进度模态框
const AutoDiagnosisModal = ({ onClose, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [stepProgress, setStepProgress] = useState({});
    const [completedSteps, setCompletedSteps] = useState({});

    const diagnosisSteps = [
        {
            id: 'accounting',
            title: '会计核算体系诊断',
            type: 'auto',
            description: '分析总账明细、科目设置、借贷平衡等',
            tasks: [
                '获取总账明细数据',
                '检查科目设置合理性',
                '验证借贷平衡状态',
                '分析核算准确性',
                '评估账务处理及时性'
            ],
            duration: 30
        },
        {
            id: 'analysis',
            title: '财务分析与报告诊断',
            type: 'auto',
            description: '计算财务比率、趋势分析、异常预警',
            tasks: [
                '提取财务报表数据',
                '计算核心财务比率',
                '执行趋势分析算法',
                '进行行业对标分析',
                '生成异常指标预警'
            ],
            duration: 25
        },
        {
            id: 'funds',
            title: '资金管理诊断',
            type: 'auto',
            description: '分析现金流、资金周转、银行账户使用',
            tasks: [
                '读取银行流水数据',
                '分析现金流量状况',
                '计算资金周转率',
                '识别资金闲置情况',
                '评估银行账户效率'
            ],
            duration: 20
        },
        {
            id: 'budget',
            title: '预算管理诊断',
            type: 'semi-auto',
            description: '分析预算执行率、差异分析',
            tasks: [
                '收集预算执行数据',
                '计算预算执行率',
                '分析预算差异原因',
                '评估预算准确性',
                '生成预算分析报告'
            ],
            duration: 35
        },
        {
            id: 'cost',
            title: '成本管理诊断',
            type: 'semi-auto',
            description: '分析成本结构、趋势、控制措施',
            tasks: [
                '提取成本核算数据',
                '分析成本结构变化',
                '计算单位成本指标',
                '识别成本异常波动',
                '评估成本控制效果'
            ],
            duration: 30
        },
        {
            id: 'it',
            title: '财务信息系统诊断',
            type: 'semi-auto',
            description: '检查系统稳定性、数据质量',
            tasks: [
                '收集系统运行日志',
                '检查数据质量状况',
                '分析系统性能指标',
                '统计系统使用频率',
                '识别系统异常问题'
            ],
            duration: 25
        },
        {
            id: 'control',
            title: '内控与风险管控诊断',
            type: 'semi-auto',
            description: '检查审批流程、异常交易、权限设置',
            tasks: [
                '分析审批流程数据',
                '识别异常交易记录',
                '检查权限设置合规性',
                '统计内控执行情况',
                '评估风险控制效果'
            ],
            duration: 40
        },
        {
            id: 'tax',
            title: '税务管理诊断',
            type: 'semi-auto',
            description: '分析税负率、申报及时性、风险指标',
            tasks: [
                '提取税务申报数据',
                '计算各类税负率',
                '检查申报及时性',
                '分析税务风险指标',
                '识别税务异常情况'
            ],
            duration: 30
        }
    ];

    const startAutoDiagnosis = async () => {
        setIsRunning(true);

        for (let i = 0; i < diagnosisSteps.length; i++) {
            setCurrentStep(i);
            const step = diagnosisSteps[i];

            // 模拟步骤执行
            for (let taskIndex = 0; taskIndex < step.tasks.length; taskIndex++) {
                const progress = ((taskIndex + 1) / step.tasks.length) * 100;
                setStepProgress({ ...stepProgress, [step.id]: progress });
                await new Promise(resolve => setTimeout(resolve, (step.duration / step.tasks.length) * 50));
            }

            setCompletedSteps({ ...completedSteps, [step.id]: true });
        }

        setIsRunning(false);
        setTimeout(() => {
            onComplete();
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <Bot className="h-6 w-6 mr-2 text-blue-600" />
                            AI自动诊断执行中
                        </h2>
                        {!isRunning && (
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {!isRunning && (
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">智能诊断说明</h3>
                                <p className="text-gray-600 mb-6">
                                    系统将自动执行可自动化的诊断维度，包括会计核算、财务分析、资金管理等8个维度。
                                    诊断完成后，您可以对需要人工验证的部分进行进一步评估。
                                </p>
                                <button
                                    onClick={startAutoDiagnosis}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                                >
                                    <PlayCircle className="h-5 w-5 mr-2" />
                                    开始自动诊断
                                </button>
                            </div>
                        )}

                        {isRunning && (
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-blue-900">总体进度</span>
                                        <span className="text-sm text-blue-700">
                                            {currentStep + 1} / {diagnosisSteps.length}
                                        </span>
                                    </div>
                                    <div className="w-full bg-blue-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${((currentStep + 1) / diagnosisSteps.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {diagnosisSteps.map((step, index) => (
                                    <div key={step.id} className={`border rounded-lg p-4 ${index === currentStep ? 'border-blue-500 bg-blue-50' :
                                            index < currentStep ? 'border-green-500 bg-green-50' :
                                                'border-gray-200 bg-gray-50'
                                        }`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                {index < currentStep ? (
                                                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                                ) : index === currentStep ? (
                                                    <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                                ) : (
                                                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
                                                )}
                                                <span className="font-medium text-gray-900">{step.title}</span>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded ${step.type === 'auto' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {step.type === 'auto' ? '全自动' : '半自动'}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>

                                        {index === currentStep && (
                                            <div className="space-y-2">
                                                {step.tasks.map((task, taskIndex) => (
                                                    <div key={taskIndex} className="flex items-center text-sm">
                                                        <div className={`h-2 w-2 rounded-full mr-2 ${taskIndex < ((stepProgress[step.id] || 0) / 100 * step.tasks.length) ? 'bg-blue-600' : 'bg-gray-300'
                                                            }`}></div>
                                                        <span className={
                                                            taskIndex < ((stepProgress[step.id] || 0) / 100 * step.tasks.length) ? 'text-blue-600' : 'text-gray-500'
                                                        }>{task}</span>
                                                    </div>
                                                ))}
                                                <div className="mt-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-1">
                                                        <div
                                                            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                                                            style={{ width: `${stepProgress[step.id] || 0}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 手动诊断详情模态框
const ManualDiagnosisModal = ({ areaId, onClose, onSave }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [responses, setResponses] = useState({});
    const [checklistResults, setChecklistResults] = useState({});
    const [notes, setNotes] = useState('');

    const manualAssessmentData = {
        organization: {
            title: '财务组织与人员诊断',
            icon: Users,
            sections: [
                {
                    title: '组织架构分析',
                    description: '评估财务组织架构的合理性和有效性',
                    checklist: [
                        { id: 'org_1', item: '财务部门设置是否完整（总账、成本、资金、税务等）', required: true },
                        { id: 'org_2', item: '组织层级是否合理（一般不超过3层）', required: true },
                        { id: 'org_3', item: '各岗位职责是否清晰明确', required: true },
                        { id: 'org_4', item: '是否存在关键岗位空缺或兼职过多', required: true },
                        { id: 'org_5', item: '财务负责人汇报关系是否合理', required: false },
                        { id: 'org_6', item: '是否建立财务委员会或相关决策机构', required: false }
                    ],
                    questions: [
                        {
                            id: 'org_structure',
                            question: '整体组织架构合理性评价？',
                            type: 'rating',
                            options: ['优秀', '良好', '一般', '较差']
                        }
                    ]
                },
                {
                    title: '人员配置评估',
                    description: '评估财务人员的数量、质量和配置合理性',
                    checklist: [
                        { id: 'staff_1', item: '财务人员总数与业务规模是否匹配', required: true },
                        { id: 'staff_2', item: '关键岗位是否配备专业人员', required: true },
                        { id: 'staff_3', item: '人员年龄结构是否合理', required: false },
                        { id: 'staff_4', item: '专业背景构成是否多元化', required: false },
                        { id: 'staff_5', item: '是否有明确的人员发展规划', required: false }
                    ],
                    questions: [
                        {
                            id: 'staff_sufficiency',
                            question: '人员配置充足性如何？',
                            type: 'rating',
                            options: ['充足', '基本满足', '略显不足', '明显不足']
                        }
                    ]
                },
                {
                    title: '能力素质评价',
                    description: '评估财务人员的专业能力和综合素质',
                    checklist: [
                        { id: 'comp_1', item: '财务负责人是否具备相应资格（CPA、高级会计师等）', required: true },
                        { id: 'comp_2', item: '关键岗位人员专业资格证书持有率', required: true },
                        { id: 'comp_3', item: '人员业务操作熟练程度', required: true },
                        { id: 'comp_4', item: '新技术、新准则学习适应能力', required: false },
                        { id: 'comp_5', item: '跨部门沟通协调能力', required: false },
                        { id: 'comp_6', item: '是否定期参加培训和学习', required: false }
                    ],
                    questions: [
                        {
                            id: 'competency',
                            question: '财务人员专业能力总体水平？',
                            type: 'rating',
                            options: ['专业能力强', '能力良好', '能力一般', '能力较弱']
                        }
                    ]
                },
                {
                    title: '绩效考核机制',
                    description: '评估财务人员绩效管理和激励机制',
                    checklist: [
                        { id: 'perf_1', item: '是否建立明确的绩效考核指标', required: true },
                        { id: 'perf_2', item: '考核标准是否量化和可操作', required: true },
                        { id: 'perf_3', item: '考核结果是否与薪酬挂钩', required: false },
                        { id: 'perf_4', item: '是否有职业发展通道', required: false },
                        { id: 'perf_5', item: '员工满意度和离职率情况', required: false }
                    ],
                    questions: [
                        {
                            id: 'performance',
                            question: '绩效考核机制有效性？',
                            type: 'rating',
                            options: ['非常有效', '基本有效', '部分有效', '效果不佳']
                        }
                    ]
                }
            ]
        },
        system: {
            title: '财务制度体系诊断',
            icon: BookOpen,
            sections: [
                {
                    title: '制度完整性检查',
                    description: '评估财务制度体系的完整性和覆盖面',
                    checklist: [
                        { id: 'sys_1', item: '会计核算制度是否完整', required: true },
                        { id: 'sys_2', item: '资金管理制度是否健全', required: true },
                        { id: 'sys_3', item: '预算管理制度是否建立', required: true },
                        { id: 'sys_4', item: '成本管理制度是否完善', required: true },
                        { id: 'sys_5', item: '税务管理制度是否齐备', required: true },
                        { id: 'sys_6', item: '财务分析制度是否制定', required: false },
                        { id: 'sys_7', item: '投资管理制度是否建立', required: false },
                        { id: 'sys_8', item: '关联交易管理制度是否完善', required: false }
                    ],
                    questions: [
                        {
                            id: 'completeness',
                            question: '制度体系完整性如何？',
                            type: 'rating',
                            options: ['非常完整', '基本完整', '部分缺失', '严重缺失']
                        }
                    ]
                },
                {
                    title: '制度适用性评估',
                    description: '评估制度与企业实际业务的匹配程度',
                    checklist: [
                        { id: 'app_1', item: '制度是否符合企业实际业务特点', required: true },
                        { id: 'app_2', item: '制度条款是否具体可操作', required: true },
                        { id: 'app_3', item: '制度是否与企业发展阶段匹配', required: true },
                        { id: 'app_4', item: '制度是否考虑行业特殊性', required: false },
                        { id: 'app_5', item: '制度间是否存在冲突或矛盾', required: true }
                    ],
                    questions: [
                        {
                            id: 'applicability',
                            question: '制度与实际业务匹配度？',
                            type: 'rating',
                            options: ['高度匹配', '基本匹配', '部分匹配', '匹配度低']
                        }
                    ]
                },
                {
                    title: '制度执行情况',
                    description: '评估制度的执行力度和效果',
                    checklist: [
                        { id: 'exec_1', item: '员工对制度的知晓程度', required: true },
                        { id: 'exec_2', item: '制度执行的一致性', required: true },
                        { id: 'exec_3', item: '违反制度的处理机制', required: true },
                        { id: 'exec_4', item: '制度执行的监督检查', required: true },
                        { id: 'exec_5', item: '制度执行效果的评估', required: false }
                    ],
                    questions: [
                        {
                            id: 'execution',
                            question: '制度执行情况如何？',
                            type: 'rating',
                            options: ['严格执行', '基本执行', '部分执行', '执行不力']
                        }
                    ]
                },
                {
                    title: '制度更新维护',
                    description: '评估制度的更新机制和维护情况',
                    checklist: [
                        { id: 'upd_1', item: '是否建立制度定期评估机制', required: true },
                        { id: 'upd_2', item: '制度更新是否及时跟进法规变化', required: true },
                        { id: 'upd_3', item: '是否有制度修订的规范流程', required: true },
                        { id: 'upd_4', item: '制度版本管理是否规范', required: false },
                        { id: 'upd_5', item: '新制度培训是否到位', required: false }
                    ],
                    questions: [
                        {
                            id: 'update',
                            question: '制度更新及时性如何？',
                            type: 'rating',
                            options: ['及时更新', '定期更新', '偶尔更新', '很少更新']
                        }
                    ]
                }
            ]
        },
        budget: {
            title: '预算管理人工评估',
            icon: Target,
            sections: [
                {
                    title: '预算编制方法评估',
                    description: '评估预算编制的科学性和合理性',
                    checklist: [
                        { id: 'bud_1', item: '预算编制是否基于战略规划', required: true },
                        { id: 'bud_2', item: '是否采用零基预算或增量预算方法', required: true },
                        { id: 'bud_3', item: '预算编制是否有充分的数据支撑', required: true },
                        { id: 'bud_4', item: '各部门参与预算编制的程度', required: true },
                        { id: 'bud_5', item: '预算编制时间安排是否合理', required: false }
                    ],
                    questions: [
                        {
                            id: 'budget_method',
                            question: '预算编制方法科学性？',
                            type: 'rating',
                            options: ['非常科学', '比较科学', '一般', '不够科学']
                        }
                    ]
                },
                {
                    title: '预算调整机制',
                    description: '评估预算调整的灵活性和规范性',
                    checklist: [
                        { id: 'adj_1', item: '是否建立预算调整标准和流程', required: true },
                        { id: 'adj_2', item: '预算调整是否需要充分论证', required: true },
                        { id: 'adj_3', item: '预算调整频率是否合理', required: true },
                        { id: 'adj_4', item: '重大预算调整是否需要董事会批准', required: false }
                    ],
                    questions: [
                        {
                            id: 'adjustment',
                            question: '预算调整机制合理性？',
                            type: 'rating',
                            options: ['非常合理', '比较合理', '一般', '不够合理']
                        }
                    ]
                }
            ]
        },
        cost: {
            title: '成本管理人工评估',
            icon: TrendingDown,
            sections: [
                {
                    title: '成本核算方法评估',
                    description: '评估成本核算方法的合理性和准确性',
                    checklist: [
                        { id: 'cost_1', item: '成本核算方法是否符合业务特点', required: true },
                        { id: 'cost_2', item: '直接成本和间接成本分配是否合理', required: true },
                        { id: 'cost_3', item: '成本动因选择是否科学', required: true },
                        { id: 'cost_4', item: '是否建立标准成本体系', required: false }
                    ],
                    questions: [
                        {
                            id: 'cost_method',
                            question: '成本核算方法合理性？',
                            type: 'rating',
                            options: ['非常合理', '比较合理', '一般', '不够合理']
                        }
                    ]
                }
            ]
        },
        it: {
            title: '财务信息系统人工评估',
            icon: Monitor,
            sections: [
                {
                    title: '系统功能适用性',
                    description: '评估系统功能与业务需求的匹配度',
                    checklist: [
                        { id: 'it_1', item: '系统功能是否满足核算需求', required: true },
                        { id: 'it_2', item: '系统是否支持预算管理', required: true },
                        { id: 'it_3', item: '系统报表功能是否完善', required: true },
                        { id: 'it_4', item: '系统是否支持移动办公', required: false }
                    ],
                    questions: [
                        {
                            id: 'it_function',
                            question: '系统功能满足度？',
                            type: 'rating',
                            options: ['完全满足', '基本满足', '部分满足', '不能满足']
                        }
                    ]
                }
            ]
        },
        control: {
            title: '内控风险管控人工评估',
            icon: Shield,
            sections: [
                {
                    title: '内控制度设计',
                    description: '评估内控制度设计的合理性和有效性',
                    checklist: [
                        { id: 'ctrl_1', item: '关键业务流程是否设计控制点', required: true },
                        { id: 'ctrl_2', item: '职责分离原则是否得到体现', required: true },
                        { id: 'ctrl_3', item: '授权审批制度是否完善', required: true },
                        { id: 'ctrl_4', item: '是否建立风险评估机制', required: true }
                    ],
                    questions: [
                        {
                            id: 'control_design',
                            question: '内控制度设计合理性？',
                            type: 'rating',
                            options: ['非常合理', '比较合理', '一般', '不够合理']
                        }
                    ]
                }
            ]
        },
        tax: {
            title: '税务管理人工评估',
            icon: FileText,
            sections: [
                {
                    title: '税务筹划评估',
                    description: '评估税务筹划的合理性和有效性',
                    checklist: [
                        { id: 'tax_1', item: '是否制定税务筹划方案', required: true },
                        { id: 'tax_2', item: '税务筹划是否合法合规', required: true },
                        { id: 'tax_3', item: '是否充分利用税收优惠政策', required: true },
                        { id: 'tax_4', item: '税务筹划效果是否明显', required: false }
                    ],
                    questions: [
                        {
                            id: 'tax_planning',
                            question: '税务筹划有效性？',
                            type: 'rating',
                            options: ['非常有效', '比较有效', '一般', '效果不佳']
                        }
                    ]
                }
            ]
        }
    };

    const currentAssessment = manualAssessmentData[areaId];
    const currentSectionData = currentAssessment?.sections[currentSection];

    const handleChecklistChange = (itemId, checked) => {
        setChecklistResults({
            ...checklistResults,
            [itemId]: checked
        });
    };

    const handleResponseChange = (questionId, value) => {
        setResponses({
            ...responses,
            [questionId]: value
        });
    };

    const handleNext = () => {
        if (currentSection < currentAssessment.sections.length - 1) {
            setCurrentSection(currentSection + 1);
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleSave = () => {
        const assessmentResult = {
            areaId,
            title: currentAssessment.title,
            sections: currentAssessment.sections.map((section, index) => ({
                title: section.title,
                checklist: section.checklist.map(item => ({
                    ...item,
                    checked: checklistResults[item.id] || false
                })),
                questions: section.questions.map(question => ({
                    ...question,
                    answer: responses[question.id] || null
                }))
            })),
            notes,
            completedAt: new Date().toISOString(),
            overallScore: Math.floor(Math.random() * 30) + 60 // 模拟评分
        };

        onSave(assessmentResult);
        onClose();
    };

    if (!currentAssessment || !currentSectionData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <currentAssessment.icon className="h-6 w-6 mr-2 text-orange-600" />
                            {currentAssessment.title}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* 进度指示器 */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                第 {currentSection + 1} 部分，共 {currentAssessment.sections.length} 部分
                            </span>
                            <span className="text-sm text-gray-500">
                                {Math.round(((currentSection + 1) / currentAssessment.sections.length) * 100)}% 完成
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentSection + 1) / currentAssessment.sections.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* 当前部分标题和描述 */}
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <h3 className="font-medium text-orange-900 mb-2">{currentSectionData.title}</h3>
                            <p className="text-sm text-orange-800">{currentSectionData.description}</p>
                        </div>

                        {/* 检查清单 */}
                        <div>
                            <h4 className="font-medium text-gray-900 mb-4">检查清单</h4>
                            <div className="space-y-3">
                                {currentSectionData.checklist.map((item, index) => (
                                    <div key={item.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            checked={checklistResults[item.id] || false}
                                            onChange={(e) => handleChecklistChange(item.id, e.target.checked)}
                                            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                        />
                                        <div className="flex-1">
                                            <label htmlFor={item.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                                                {item.item}
                                                {item.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 评价问题 */}
                        {currentSectionData.questions && currentSectionData.questions.length > 0 && (
                            <div>
                                <h4 className="font-medium text-gray-900 mb-4">综合评价</h4>
                                <div className="space-y-4">
                                    {currentSectionData.questions.map((question, index) => (
                                        <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                            <h5 className="font-medium text-gray-900 mb-3">{question.question}</h5>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                {question.options.map((option, optionIndex) => (
                                                    <button
                                                        key={optionIndex}
                                                        onClick={() => handleResponseChange(question.id, option)}
                                                        className={`p-2 rounded border text-sm ${responses[question.id] === option
                                                                ? 'bg-orange-100 border-orange-500 text-orange-800'
                                                                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 最后一个部分显示补充说明 */}
                        {currentSection === currentAssessment.sections.length - 1 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    补充说明和建议
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="请输入详细的观察结果、发现的问题或改进建议..."
                                />
                            </div>
                        )}

                        {/* 导航按钮 */}
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevious}
                                disabled={currentSection === 0}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                上一步
                            </button>

                            <div className="flex space-x-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    取消
                                </button>

                                {currentSection === currentAssessment.sections.length - 1 ? (
                                    <button
                                        onClick={handleSave}
                                        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                    >
                                        完成评估
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                    >
                                        下一步
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 效益计算器模态框
const BenefitCalculatorModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        revenue: 15800,
        employees: 280,
        financialStaff: 12,
        processingTime: 160,
        errorRate: 5,
        systemCost: 50,
        targetEfficiency: 80
    });

    const [results, setResults] = useState(null);

    const calculateBenefits = () => {
        const { revenue, employees, financialStaff, processingTime, errorRate, systemCost, targetEfficiency } = formData;

        // 效率提升计算
        const currentEfficiency = 60; // 假设当前效率60%
        const efficiencyImprovement = targetEfficiency - currentEfficiency;

        // 时间节约计算
        const timeSaved = processingTime * (efficiencyImprovement / 100);
        const monthlySavedHours = timeSaved * 22; // 每月工作日

        // 成本节约计算
        const avgHourlyCost = 100; // 平均每小时人工成本
        const monthlyCostSaving = monthlySavedHours * avgHourlyCost;
        const annualCostSaving = monthlyCostSaving * 12;

        // 错误减少收益
        const errorReduction = (errorRate - 1) / 100 * revenue * 10000; // 错误成本

        // 投资回报计算
        const totalInvestment = 300; // 假设总投资300万
        const totalAnnualBenefit = annualCostSaving + errorReduction;
        const roi = (totalAnnualBenefit / totalInvestment) * 100;
        const paybackPeriod = totalInvestment / (totalAnnualBenefit / 12);

        setResults({
            efficiencyImprovement: efficiencyImprovement.toFixed(1),
            timeSavedDaily: timeSaved.toFixed(1),
            monthlyCostSaving: (monthlyCostSaving / 10000).toFixed(1),
            annualCostSaving: (annualCostSaving / 10000).toFixed(1),
            errorReduction: (errorReduction / 10000).toFixed(1),
            totalBenefit: (totalAnnualBenefit / 10000).toFixed(1),
            roi: roi.toFixed(1),
            paybackPeriod: paybackPeriod.toFixed(1)
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                            财务体系优化效益计算器
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">输入参数</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">年营业收入（万元）</label>
                                <input
                                    type="number"
                                    value={formData.revenue}
                                    onChange={(e) => setFormData({ ...formData, revenue: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">员工总数（人）</label>
                                <input
                                    type="number"
                                    value={formData.employees}
                                    onChange={(e) => setFormData({ ...formData, employees: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">财务人员数（人）</label>
                                <input
                                    type="number"
                                    value={formData.financialStaff}
                                    onChange={(e) => setFormData({ ...formData, financialStaff: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">日均处理时间（小时）</label>
                                <input
                                    type="number"
                                    value={formData.processingTime}
                                    onChange={(e) => setFormData({ ...formData, processingTime: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">当前错误率（%）</label>
                                <input
                                    type="number"
                                    value={formData.errorRate}
                                    onChange={(e) => setFormData({ ...formData, errorRate: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">目标效率水平（%）</label>
                                <select
                                    value={formData.targetEfficiency}
                                    onChange={(e) => setFormData({ ...formData, targetEfficiency: parseFloat(e.target.value) })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                >
                                    <option value={70}>70% - 基础优化</option>
                                    <option value={80}>80% - 中度优化</option>
                                    <option value={90}>90% - 高度优化</option>
                                    <option value={95}>95% - 全面数字化</option>
                                </select>
                            </div>
                            <button
                                onClick={calculateBenefits}
                                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                计算优化效益
                            </button>
                        </div>

                        <div className="space-y-4">
                            {results ? (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">效益测算结果</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                                            <span>效率提升幅度</span>
                                            <span className="font-medium text-blue-600">{results.efficiencyImprovement}%</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                                            <span>日节约时间</span>
                                            <span className="font-medium text-green-600">{results.timeSavedDaily}小时</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                                            <span>月节约成本</span>
                                            <span className="font-medium text-purple-600">{results.monthlyCostSaving}万元</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                                            <span>年节约成本</span>
                                            <span className="font-medium text-orange-600">{results.annualCostSaving}万元</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-indigo-50 rounded">
                                            <span>错误减少收益</span>
                                            <span className="font-medium text-indigo-600">{results.errorReduction}万元</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-green-100 rounded border border-green-200">
                                            <span className="font-medium">年化总收益</span>
                                            <span className="font-bold text-green-600">{results.totalBenefit}万元</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-blue-100 rounded border border-blue-200">
                                            <span className="font-medium">投资回报率</span>
                                            <span className="font-bold text-blue-600">{results.roi}%</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-purple-100 rounded border border-purple-200">
                                            <span className="font-medium">投资回收期</span>
                                            <span className="font-bold text-purple-600">{results.paybackPeriod}个月</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-lg text-center">
                                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">请输入参数并点击计算按钮</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 诊断报告生成模态框
const ReportGeneratorModal = ({ onClose, companyInfo, diagnosisResults }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const generateReport = async () => {
        setIsGenerating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 获取示例报告数据
            const reportData = getFinancialSystemDiagnosisReportData();

            // 生成报告HTML
            const reportHTML = generateFinancialSystemDiagnosisReportHTML(reportData);

            const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
            if (newWindow) {
                newWindow.document.write(reportHTML);
                newWindow.document.close();
                newWindow.document.title = '企业财务体系诊断和优化报告';
            }
        } catch (error) {
            alert('报告生成失败，请稍后重试。');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <FileText className="h-6 w-6 mr-2 text-blue-600" />
                            生成诊断报告
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-medium text-blue-900 mb-2">报告内容</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• AI自动诊断结果汇总</li>
                                <li>• 人工专业评估发现</li>
                                <li>• 综合问题分析</li>
                                <li>• 分阶段优化建议</li>
                                <li>• 效益预测分析</li>
                            </ul>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                取消
                            </button>
                            <button
                                onClick={generateReport}
                                disabled={isGenerating}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <RotateCcw className="h-4 w-4 mr-2 inline animate-spin" />
                                        生成中...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4 mr-2 inline" />
                                        生成报告
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 主组件
const FinancialSystem = ({ selectedCompany, userType, currentTime, selectedCompanies, isProfessionalView }) => {
    const [showCompanyInfo, setShowCompanyInfo] = useState(false);
    const [showAutoDiagnosis, setShowAutoDiagnosis] = useState(false);
    const [showManualDiagnosis, setShowManualDiagnosis] = useState(null);
    const [showBenefitCalculator, setShowBenefitCalculator] = useState(false);
    const [showReportGenerator, setShowReportGenerator] = useState(false);
    const [expandedArea, setExpandedArea] = useState(null);
    const [autoDiagnosisCompleted, setAutoDiagnosisCompleted] = useState(false);
    const [manualAssessments, setManualAssessments] = useState({});
    const [companyInfo, setCompanyInfo] = useState({
        name: '科技创新股份有限公司',
        establishYear: '2018',
        business: '软件和信息技术服务',
        registeredCapital: '5000万元',
        employeeCount: '280人',
        revenue2021: '8500万元',
        revenue2022: '12000万元',
        revenue2023: '15800万元',
        assetLiabilityRatio: '52%',
        currentRatio: '1.8',
        roe: '18.5%'
    });

    // 诊断维度数据 - 根据自动化程度分类
    const diagnosisAreas = [
        // 可高度自动化的维度
        {
            id: 'accounting',
            name: '会计核算体系',
            type: 'auto',
            icon: Calculator,
            description: '科目设置、借贷平衡、核算准确性、处理及时性',
            autoScore: 88,
            status: '优秀',
            color: 'green',
            findings: [
                '科目设置规范，符合企业会计准则要求',
                '借贷平衡状态良好，无重大差异',
                '核算准确性达到99.2%',
                '凭证录入及时性良好，平均延迟1.2天'
            ],
            issues: [
                '部分明细科目设置过于粗放',
                '月末结账流程效率有待提升'
            ]
        },
        {
            id: 'analysis',
            name: '财务分析与报告',
            type: 'auto',
            icon: PieChart,
            description: '财务比率计算、趋势分析、异常预警',
            autoScore: 72,
            status: '良好',
            color: 'blue',
            findings: [
                '核心财务比率计算准确',
                '同比增长趋势明显',
                '现金流量状况稳定',
                '盈利能力指标良好'
            ],
            issues: [
                '缺乏深度分析和预测模型',
                '行业对标数据不够充分',
                '异常预警机制需要完善'
            ]
        },
        {
            id: 'funds',
            name: '资金管理',
            type: 'auto',
            icon: DollarSign,
            description: '现金流分析、资金周转、银行账户效率',
            autoScore: 76,
            status: '良好',
            color: 'blue',
            findings: [
                '资金周转率2.3次/年，处于行业中等水平',
                '现金流量健康，经营活动现金流为正',
                '银行账户使用效率75%',
                '资金闲置率控制在合理范围'
            ],
            issues: [
                '部分银行账户使用效率偏低',
                '资金预测准确性有待提升'
            ]
        },
        // 半自动化维度
        {
            id: 'budget',
            name: '预算管理',
            type: 'semi-auto',
            icon: Target,
            description: '预算执行率、差异分析、编制合理性评估',
            autoScore: 68,
            status: '一般',
            color: 'yellow',
            findings: [
                '年度预算执行率85.6%',
                '收入预算达成率92.3%',
                '成本预算控制率88.7%',
                '各部门预算差异率平均12.5%'
            ],
            issues: [
                '预算编制缺乏科学依据',
                '预算调整频率过高',
                '部门间预算协调不够'
            ],
            needsManual: true,
            manualAspects: [
                '预算编制方法合理性评估',
                '预算调整机制有效性分析',
                '预算考核体系完善性评价'
            ]
        },
        {
            id: 'cost',
            name: '成本管理',
            type: 'semi-auto',
            icon: TrendingDown,
            description: '成本结构、趋势分析、控制措施评估',
            autoScore: 82,
            status: '良好',
            color: 'blue',
            findings: [
                '成本结构相对稳定',
                '单位成本呈下降趋势',
                '主营业务成本率65.8%',
                '成本控制措施执行率78%'
            ],
            issues: [
                '成本分配方法需要优化',
                '间接成本控制有待加强'
            ],
            needsManual: true,
            manualAspects: [
                '成本分配方法合理性评估',
                '成本控制措施有效性分析',
                '成本核算准确性验证'
            ]
        },
        {
            id: 'it',
            name: '财务信息系统',
            type: 'semi-auto',
            icon: Monitor,
            description: '系统稳定性、数据质量、用户体验评估',
            autoScore: 65,
            status: '一般',
            color: 'yellow',
            findings: [
                '系统运行稳定性95.2%',
                '数据准确性98.5%',
                '系统响应时间平均2.3秒',
                '日均活跃用户85人'
            ],
            issues: [
                '系统功能相对简单',
                '数据集成度不够',
                '移动端支持不足'
            ],
            needsManual: true,
            manualAspects: [
                '系统功能适用性评估',
                '用户满意度调查',
                '系统集成度分析'
            ]
        },
        {
            id: 'control',
            name: '内控与风险管控',
            type: 'semi-auto',
            icon: Shield,
            description: '审批流程、异常检测、权限管理评估',
            autoScore: 86,
            status: '优秀',
            color: 'green',
            findings: [
                '审批流程执行率96%',
                '异常交易检出率0.3%',
                '权限设置合规性92%',
                '内控制度覆盖率88%'
            ],
            issues: [
                '部分新业务内控制度待完善',
                '风险预警机制需要加强'
            ],
            needsManual: true,
            manualAspects: [
                '内控制度设计合理性评估',
                '关键控制点识别验证',
                '内控执行有效性测试'
            ]
        },
        {
            id: 'tax',
            name: '税务管理',
            type: 'semi-auto',
            icon: FileText,
            description: '税负分析、申报及时性、风险评估',
            autoScore: 78,
            status: '良好',
            color: 'blue',
            findings: [
                '综合税负率13.2%',
                '税务申报及时率100%',
                '税务风险评级B级',
                '税收优惠享受率85%'
            ],
            issues: [
                '税务筹划空间有待挖掘',
                '税务风险预警机制不完善'
            ],
            needsManual: true,
            manualAspects: [
                '税务筹划方案合理性评估',
                '税务风险防控措施评价',
                '税企关系状况分析'
            ]
        },
        // 必须人工完成的维度
        {
            id: 'organization',
            name: '财务组织与人员',
            type: 'manual',
            icon: Users,
            description: '组织架构、人员配置、能力评估、团队协作',
            autoScore: null,
            status: '待评估',
            color: 'gray',
            findings: [],
            issues: [],
            needsManual: true,
            manualOnly: true,
            manualAspects: [
                '组织架构合理性分析',
                '人员配置充足性评估',
                '专业能力胜任度测评',
                '团队协作效果观察'
            ]
        },
        {
            id: 'system',
            name: '财务制度体系',
            type: 'manual',
            icon: BookOpen,
            description: '制度完整性、适用性、执行情况、更新机制',
            autoScore: null,
            status: '待评估',
            color: 'gray',
            findings: [],
            issues: [],
            needsManual: true,
            manualOnly: true,
            manualAspects: [
                '制度体系完整性检查',
                '制度适用性评估',
                '制度执行情况调研',
                '制度更新机制分析'
            ]
        }
    ];

    const handleCompanyInfoSave = (newInfo) => {
        setCompanyInfo(newInfo);
    };

    const handleAutoDiagnosisComplete = () => {
        setAutoDiagnosisCompleted(true);
    };

    const handleManualAssessmentSave = (assessment) => {
        setManualAssessments({
            ...manualAssessments,
            [assessment.areaId]: assessment
        });
    };

    const getAreaStatus = (area) => {
        if (area.type === 'auto' && autoDiagnosisCompleted) {
            return { status: '已完成', color: 'green' };
        } else if (area.type === 'semi-auto' && autoDiagnosisCompleted) {
            const hasManualAssessment = manualAssessments[area.id];
            return hasManualAssessment
                ? { status: '已完成', color: 'green' }
                : { status: '需人工评估', color: 'orange' };
        } else if (area.type === 'manual') {
            const hasManualAssessment = manualAssessments[area.id];
            return hasManualAssessment
                ? { status: '已完成', color: 'green' }
                : { status: '待人工评估', color: 'red' };
        } else {
            return { status: '待自动诊断', color: 'gray' };
        }
    };

    // 计算完成进度
    const totalAreas = diagnosisAreas.length;
    const completedAreas = diagnosisAreas.filter(area => {
        const status = getAreaStatus(area);
        return status.status === '已完成';
    }).length;
    const completionRate = Math.round((completedAreas / totalAreas) * 100);

    return (
        <div className="space-y-6">
            {/* 财务体系健康度概览 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                        财务体系健康度评估
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowCompanyInfo(true)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                        >
                            <Building className="h-4 w-4 mr-2" />
                            企业信息
                        </button>
                        <button
                            onClick={() => setShowReportGenerator(true)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            生成报告
                        </button>
                    </div>
                </div>

                {/* 财务体系健康度评估 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Gauge className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">85</p>
                        <p className="text-sm text-gray-600">体系健康度</p>
                        <p className="text-xs text-blue-600 mt-1">良好水平</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Shield className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">92%</p>
                        <p className="text-sm text-gray-600">内控有效性</p>
                        <p className="text-xs text-green-600 mt-1">控制良好</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Activity className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">78%</p>
                        <p className="text-sm text-gray-600">流程效率</p>
                        <p className="text-xs text-yellow-600 mt-1">待提升</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Cpu className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">65%</p>
                        <p className="text-sm text-gray-600">数字化程度</p>
                        <p className="text-xs text-purple-600 mt-1">有待提高</p>
                    </div>
                </div>
            </div>

            {/* 智能诊断控制面板 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Brain className="h-6 w-6 mr-2 text-indigo-600" />
                        财务体系智能诊断平台
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowAutoDiagnosis(true)}
                            disabled={autoDiagnosisCompleted}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                        >
                            <Bot className="h-4 w-4 mr-2" />
                            {autoDiagnosisCompleted ? 'AI诊断已完成' : '启动AI自动诊断'}
                        </button>
                    </div>
                </div>

                {/* 诊断进度概览 */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-900">诊断进度概览</h4>
                        <span className="text-sm text-gray-600">{completionRate}% 已完成</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${completionRate}%` }}
                        ></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {diagnosisAreas.filter(area => area.type === 'auto').length}
                            </div>
                            <div className="text-sm text-gray-600">可全自动诊断</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                                {diagnosisAreas.filter(area => area.type === 'semi-auto').length}
                            </div>
                            <div className="text-sm text-gray-600">半自动诊断</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">
                                {diagnosisAreas.filter(area => area.type === 'manual').length}
                            </div>
                            <div className="text-sm text-gray-600">需人工评估</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {completedAreas}
                            </div>
                            <div className="text-sm text-gray-600">已完成诊断</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 财务体系各维度诊断结果 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Network className="h-5 w-5 mr-2 text-indigo-600" />
                    财务体系十维度智能诊断结果
                </h3>

                <div className="space-y-4">
                    {diagnosisAreas.map((area, index) => {
                        const areaStatus = getAreaStatus(area);
                        const isExpanded = expandedArea === area.id;

                        return (
                            <div key={area.id} className="border border-gray-200 rounded-lg">
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <area.icon className={`h-6 w-6 text-${area.color}-600`} />
                                            <div>
                                                <h4 className="font-medium text-gray-900">{area.name}</h4>
                                                <p className="text-sm text-gray-600">{area.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            {/* 诊断类型标签 */}
                                            <span className={`px-2 py-1 text-xs rounded-full ${area.type === 'auto' ? 'bg-green-100 text-green-800' :
                                                    area.type === 'semi-auto' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-orange-100 text-orange-800'
                                                }`}>
                                                {area.type === 'auto' ? '全自动' :
                                                    area.type === 'semi-auto' ? '半自动' : '人工评估'}
                                            </span>

                                            {/* 评分显示 */}
                                            {area.autoScore && (
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-blue-600">{area.autoScore}</div>
                                                    <div className="text-xs text-gray-500">AI评分</div>
                                                </div>
                                            )}

                                            {/* 状态标签 */}
                                            <span className={`px-3 py-1 text-sm rounded-full ${areaStatus.color === 'green' ? 'bg-green-100 text-green-800' :
                                                    areaStatus.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                                                        areaStatus.color === 'red' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                }`}>
                                                {areaStatus.status}
                                            </span>

                                            {/* 展开/收起按钮 */}
                                            <button
                                                onClick={() => setExpandedArea(isExpanded ? null : area.id)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* 自动诊断结果 */}
                                                {area.findings && area.findings.length > 0 && (
                                                    <div className="bg-green-50 p-4 rounded-lg">
                                                        <h5 className="font-medium text-green-900 mb-2 flex items-center">
                                                            <Bot className="h-4 w-4 mr-2" />
                                                            AI自动诊断发现
                                                        </h5>
                                                        <ul className="text-sm text-green-800 space-y-1">
                                                            {area.findings.map((finding, idx) => (
                                                                <li key={idx}>• {finding}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* 问题识别 */}
                                                {area.issues && area.issues.length > 0 && (
                                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                                        <h5 className="font-medium text-yellow-900 mb-2 flex items-center">
                                                            <AlertTriangle className="h-4 w-4 mr-2" />
                                                            识别的问题
                                                        </h5>
                                                        <ul className="text-sm text-yellow-800 space-y-1">
                                                            {area.issues.map((issue, idx) => (
                                                                <li key={idx}>• {issue}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* 人工评估部分 */}
                                                {area.needsManual && (
                                                    <div className="bg-orange-50 p-4 rounded-lg">
                                                        <h5 className="font-medium text-orange-900 mb-2 flex items-center">
                                                            <UserCheck className="h-4 w-4 mr-2" />
                                                            需要人工评估
                                                        </h5>
                                                        <ul className="text-sm text-orange-800 space-y-1 mb-3">
                                                            {area.manualAspects.map((aspect, idx) => (
                                                                <li key={idx}>• {aspect}</li>
                                                            ))}
                                                        </ul>
                                                        <button
                                                            onClick={() => setShowManualDiagnosis(area.id)}
                                                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm flex items-center"
                                                        >
                                                            <UserCheck className="h-4 w-4 mr-2" />
                                                            {manualAssessments[area.id] ? '查看评估' : '开始评估'}
                                                        </button>
                                                    </div>
                                                )}

                                                {/* 人工评估结果显示 */}
                                                {manualAssessments[area.id] && (
                                                    <div className="bg-blue-50 p-4 rounded-lg">
                                                        <h5 className="font-medium text-blue-900 mb-2">人工评估结果</h5>
                                                        <div className="text-sm text-blue-800">
                                                            <p><strong>评估时间：</strong>{new Date(manualAssessments[area.id].completedAt).toLocaleString('zh-CN')}</p>
                                                            <p><strong>综合评分：</strong>{manualAssessments[area.id].overallScore}</p>
                                                            {manualAssessments[area.id].notes && (
                                                                <p className="mt-2"><strong>评估说明：</strong>{manualAssessments[area.id].notes}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 财务体系分析工具 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-indigo-600" />
                    财务体系分析工具
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <Calculator className="h-12 w-12 text-blue-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">效益计算器</h4>
                        <p className="text-sm text-gray-600 mb-4">快速计算财务体系优化后的效率提升和成本节约</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 效率提升测算 • 成本节约计算 • ROI分析 • 时间节省
                        </div>
                        <button
                            onClick={() => setShowBenefitCalculator(true)}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            启动计算器
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <FileText className="h-12 w-12 text-green-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">智能报告生成</h4>
                        <p className="text-sm text-gray-600 mb-4">基于诊断结果自动生成专业的分析报告和优化建议</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • AI诊断汇总 • 人工评估结果 • 优化建议 • 实施路径
                        </div>
                        <button
                            onClick={() => setShowReportGenerator(true)}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            生成报告
                        </button>
                    </div>
                </div>
            </div>

            {/* 诊断进度提示 */}
            {!autoDiagnosisCompleted && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <Info className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                            <h4 className="font-medium text-blue-900">诊断提示</h4>
                            <p className="text-sm text-blue-800 mt-1">
                                请先点击"启动AI自动诊断"按钮完成自动化诊断，然后再进行需要人工评估的维度。
                                AI将自动分析会计核算、财务分析、资金管理等可量化的维度。
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 模态框组件 */}
            {showCompanyInfo && (
                <CompanyInfoModal onClose={() => setShowCompanyInfo(false)} onSave={handleCompanyInfoSave} />
            )}

            {showAutoDiagnosis && (
                <AutoDiagnosisModal
                    onClose={() => setShowAutoDiagnosis(false)}
                    onComplete={handleAutoDiagnosisComplete}
                />
            )}

            {showManualDiagnosis && (
                <ManualDiagnosisModal
                    areaId={showManualDiagnosis}
                    onClose={() => setShowManualDiagnosis(null)}
                    onSave={handleManualAssessmentSave}
                />
            )}

            {showBenefitCalculator && (
                <BenefitCalculatorModal onClose={() => setShowBenefitCalculator(false)} />
            )}

            {showReportGenerator && (
                <ReportGeneratorModal
                    onClose={() => setShowReportGenerator(false)}
                    companyInfo={companyInfo}
                    diagnosisResults={manualAssessments}
                />
            )}
        </div>
    );
};

export default FinancialSystem;