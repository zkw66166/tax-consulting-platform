import React, { useState } from 'react';
import { DollarSign, Zap, ExternalLink, Target, AlertTriangle, TrendingUp, BarChart3, Lightbulb, Eye, Calculator, Calendar, CheckCircle, Settings, ArrowLeft, Download, Filter, Search, Plus, Edit, Trash2, Save, X, ChevronDown, ChevronUp, FileText, PieChart, LineChart, Users, Clock, Award, Building } from 'lucide-react';
import { managedCompanies } from '../../utils/mockData';

const BudgetManagement = ({ selectedCompany, userType, currentTime, selectedCompanies, isProfessionalView }) => {
    const [currentView, setCurrentView] = useState('main');
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [activeTab, setActiveTab] = useState('detail'); // 将 activeTab 提升到顶层

    // 生成预算方案页面
    const BudgetPlanGenerator = () => {
        const [planForm, setPlanForm] = useState({
            planName: '',
            planYear: '2025',
            planType: 'annual',
            department: '',
            baseBudget: '',
            growthRate: ''
        });

        const handleFormChange = (field, value) => {
            setPlanForm(prev => ({ ...prev, [field]: value }));
        };

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setCurrentView('main')}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">智能预算方案生成</h2>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            <Save className="h-4 w-4 mr-2 inline" />
                            保存方案
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Download className="h-4 w-4 mr-2 inline" />
                            导出
                        </button>
                    </div>
                </div>

                {/* 预算参数设置 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">预算基础参数</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">方案名称</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="输入预算方案名称"
                                value={planForm.planName}
                                onChange={(e) => handleFormChange('planName', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">预算年度</label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                value={planForm.planYear}
                                onChange={(e) => handleFormChange('planYear', e.target.value)}
                            >
                                <option value="2025">2025年</option>
                                <option value="2026">2026年</option>
                                <option value="2027">2027年</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">预算类型</label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                value={planForm.planType}
                                onChange={(e) => handleFormChange('planType', e.target.value)}
                            >
                                <option value="annual">年度预算</option>
                                <option value="quarterly">季度预算</option>
                                <option value="monthly">月度预算</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* AI推荐方案 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">AI智能推荐方案</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: '保守增长方案',
                                description: '基于历史数据，稳健增长策略',
                                revenue: '3850万',
                                cost: '2890万',
                                profit: '960万',
                                growthRate: '8%',
                                risk: '低'
                            },
                            {
                                title: '积极扩张方案',
                                description: '市场拓展，加大投入',
                                revenue: '4200万',
                                cost: '3150万',
                                profit: '1050万',
                                growthRate: '15%',
                                risk: '中'
                            }
                        ].map((plan, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-medium text-gray-900">{plan.title}</h4>
                                    <span className={`px-2 py-1 text-xs rounded-full ${plan.risk === '低' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {plan.risk}风险
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-500">预算收入：</span>
                                        <span className="font-medium">{plan.revenue}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">预算成本：</span>
                                        <span className="font-medium">{plan.cost}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">预算利润：</span>
                                        <span className="font-medium text-green-600">{plan.profit}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">增长率：</span>
                                        <span className="font-medium text-blue-600">{plan.growthRate}</span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    选择此方案
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // 预算报告页面
    const BudgetReport = () => {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setCurrentView('main')}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">预算执行报告</h2>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2 inline" />
                            筛选
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-2 inline" />
                            导出报告
                        </button>
                    </div>
                </div>

                {/* 报告概览 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">报告概览</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <p className="text-xl font-bold text-blue-600">2025年度</p>
                            <p className="text-sm text-gray-600">预算报告期间</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="text-xl font-bold text-green-600">3,650万</p>
                            <p className="text-sm text-gray-600">总预算规模</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                            <p className="text-xl font-bold text-purple-600">88.5%</p>
                            <p className="text-sm text-gray-600">整体执行率</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                            <p className="text-xl font-bold text-orange-600">良好</p>
                            <p className="text-sm text-gray-600">执行评级</p>
                        </div>
                    </div>
                </div>

                {/* 详细报告表格 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">分类执行明细</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">预算科目</th>
                                    <th className="text-right py-3 px-4">预算金额（万元）</th>
                                    <th className="text-right py-3 px-4">实际金额（万元）</th>
                                    <th className="text-right py-3 px-4">执行率</th>
                                    <th className="text-right py-3 px-4">偏差额（万元）</th>
                                    <th className="text-center py-3 px-4">状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: '产品销售收入', budget: 2800, actual: 2650, variance: -150 },
                                    { name: '技术服务收入', budget: 800, actual: 920, variance: 120 },
                                    { name: '人工成本', budget: 1200, actual: 1150, variance: -50 },
                                    { name: '材料成本', budget: 800, actual: 850, variance: 50 },
                                    { name: '管理费用', budget: 400, actual: 380, variance: -20 },
                                    { name: '销售费用', budget: 300, actual: 320, variance: 20 }
                                ].map((item, index) => {
                                    const rate = (item.actual / item.budget * 100).toFixed(1);
                                    return (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4 font-medium">{item.name}</td>
                                            <td className="py-3 px-4 text-right">{item.budget}</td>
                                            <td className="py-3 px-4 text-right">{item.actual}</td>
                                            <td className="py-3 px-4 text-right font-medium">{rate}%</td>
                                            <td className={`py-3 px-4 text-right font-medium ${item.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {item.variance > 0 ? '+' : ''}{item.variance}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <span className={`px-2 py-1 text-xs rounded-full ${Math.abs(item.variance) <= 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {Math.abs(item.variance) <= 50 ? '正常' : '关注'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // 方案详情页面
    const SchemeDetail = ({ scheme }) => {
        const renderDetailContent = () => {
            switch (activeTab) {
                case 'detail':
                    return (
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-3">方案概述</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">{scheme.description}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h5 className="font-medium text-gray-900 mb-2">实施目标</h5>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• 提升预算管理效率30%以上</li>
                                            <li>• 降低预算偏差率至5%以内</li>
                                            <li>• 建立完善的预算管控体系</li>
                                            <li>• 实现预算数字化管理</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-gray-900 mb-2">关键指标</h5>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• 预算准确度：≥95%</li>
                                            <li>• 执行监控实时性：100%</li>
                                            <li>• 系统响应时间：≤3秒</li>
                                            <li>• 用户满意度：≥90%</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border rounded-lg p-6">
                                <h4 className="font-medium text-gray-900 mb-4">实施步骤</h4>
                                <div className="space-y-4">
                                    {[
                                        { phase: '准备阶段', duration: '2周', tasks: ['需求调研', '方案设计', '资源准备'] },
                                        { phase: '试点阶段', duration: '4周', tasks: ['小范围试点', '问题识别', '方案优化'] },
                                        { phase: '推广阶段', duration: '6周', tasks: ['全面推广', '培训实施', '效果监控'] },
                                        { phase: '优化阶段', duration: '持续', tasks: ['持续改进', '效果评估', '经验总结'] }
                                    ].map((step, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-4 mb-2">
                                                    <h5 className="font-medium text-gray-900">{step.phase}</h5>
                                                    <span className="text-sm text-gray-500">({step.duration})</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {step.tasks.map((task, taskIndex) => (
                                                        <span key={taskIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                            {task}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );

                case 'benefit':
                    return (
                        <div className="space-y-6">
                            <div className="bg-white border rounded-lg p-6">
                                <h4 className="font-medium text-gray-900 mb-4">投资效益分析</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="bg-green-50 p-4 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-green-600">{scheme.savings}</p>
                                        <p className="text-sm text-gray-600">年度节约</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-blue-600">{scheme.investment}</p>
                                        <p className="text-sm text-gray-600">投资金额</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-purple-600">
                                            {((parseFloat(scheme.savings.replace('万元/年', '')) / parseFloat(scheme.investment.replace('万元', ''))) * 100).toFixed(0)}%
                                        </p>
                                        <p className="text-sm text-gray-600">投资回报率</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-medium text-gray-900 mb-3">成本构成</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">系统开发费用</span>
                                                <span className="text-sm font-medium">60%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">培训实施费用</span>
                                                <span className="text-sm font-medium">20%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">硬件设备费用</span>
                                                <span className="text-sm font-medium">15%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">其他费用</span>
                                                <span className="text-sm font-medium">5%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-gray-900 mb-3">收益来源</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">效率提升节约</span>
                                                <span className="text-sm font-medium">40%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">成本控制节约</span>
                                                <span className="text-sm font-medium">35%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">风险规避收益</span>
                                                <span className="text-sm font-medium">15%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">其他收益</span>
                                                <span className="text-sm font-medium">10%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                case 'plan':
                    return (
                        <div className="space-y-6">
                            <div className="bg-white border rounded-lg p-6">
                                <h4 className="font-medium text-gray-900 mb-4">实施计划甘特图</h4>
                                <div className="overflow-x-auto">
                                    <div className="min-w-full">
                                        <div className="grid grid-cols-12 gap-1 mb-2 text-xs text-gray-500">
                                            <div className="col-span-3">任务</div>
                                            <div>第1周</div>
                                            <div>第2周</div>
                                            <div>第3周</div>
                                            <div>第4周</div>
                                            <div>第5周</div>
                                            <div>第6周</div>
                                            <div>第7周</div>
                                            <div>第8周</div>
                                            <div>第9周</div>
                                        </div>
                                        {[
                                            { task: '需求分析', weeks: [1, 2] },
                                            { task: '方案设计', weeks: [2, 3, 4] },
                                            { task: '系统开发', weeks: [4, 5, 6, 7] },
                                            { task: '测试验收', weeks: [7, 8] },
                                            { task: '培训实施', weeks: [8, 9] },
                                            { task: '正式上线', weeks: [9] }
                                        ].map((item, index) => (
                                            <div key={index} className="grid grid-cols-12 gap-1 mb-2 items-center">
                                                <div className="col-span-3 text-sm font-medium">{item.task}</div>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(week => (
                                                    <div key={week} className="h-6 rounded">
                                                        {item.weeks.includes(week) && (
                                                            <div className="h-full bg-blue-500 rounded"></div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border rounded-lg p-6">
                                <h4 className="font-medium text-gray-900 mb-4">关键里程碑</h4>
                                <div className="space-y-4">
                                    {[
                                        { milestone: '项目启动', date: '第1周', status: '已完成' },
                                        { milestone: '需求确认', date: '第2周', status: '进行中' },
                                        { milestone: '原型交付', date: '第4周', status: '计划中' },
                                        { milestone: '系统测试', date: '第7周', status: '计划中' },
                                        { milestone: '项目验收', date: '第9周', status: '计划中' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 rounded-full ${item.status === '已完成' ? 'bg-green-500' :
                                                        item.status === '进行中' ? 'bg-blue-500' : 'bg-gray-300'
                                                    }`}></div>
                                                <span className="font-medium">{item.milestone}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-600">{item.date}</span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${item.status === '已完成' ? 'bg-green-100 text-green-800' :
                                                        item.status === '进行中' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );

                default:
                    return null;
            }
        };

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                setCurrentView('main');
                                setActiveTab('detail'); // 重置选项卡
                            }}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">{scheme.title}</h2>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2 inline" />
                            批准实施
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Download className="h-4 w-4 mr-2 inline" />
                            导出方案
                        </button>
                    </div>
                </div>

                {/* 选项卡 */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="border-b">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { key: 'detail', label: '方案详情', icon: Eye },
                                { key: 'benefit', label: '效益测算', icon: Calculator },
                                { key: 'plan', label: '实施计划', icon: Calendar }
                            ].map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`py-4 border-b-2 font-medium text-sm flex items-center ${activeTab === key
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Icon className="h-4 w-4 mr-2" />
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="p-6">
                        {renderDetailContent()}
                    </div>
                </div>
            </div>
        );
    };

    // 预算编制助手
    const BudgetAssistant = () => {
        const [step, setStep] = useState(1);
        const [budgetData, setBudgetData] = useState({
            department: '',
            year: '2025',
            budgetType: 'operational',
            method: 'incremental'
        });

        const handleDataChange = (field, value) => {
            setBudgetData(prev => ({ ...prev, [field]: value }));
        };

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setCurrentView('main')}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">智能预算编制助手</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                            步骤 {step} / 4
                        </div>
                    </div>
                </div>

                {/* 进度条 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                        {[
                            { step: 1, label: '基础设置' },
                            { step: 2, label: '数据导入' },
                            { step: 3, label: '智能调整' },
                            { step: 4, label: '方案确认' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= item.step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                                    }`}>
                                    {item.step}
                                </div>
                                {index < 3 && (
                                    <div className={`w-20 h-1 mx-2 ${step > item.step ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900">
                            {step === 1 ? '基础设置' : step === 2 ? '数据导入' : step === 3 ? '智能调整' : '方案确认'}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {step === 1 ? '设置预算基础参数' : step === 2 ? '导入历史数据和基础信息' : step === 3 ? 'AI智能分析和调整建议' : '确认最终预算方案'}
                        </p>
                    </div>
                </div>

                {/* 步骤内容 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    {step === 1 && (
                        <div className="space-y-6">
                            <h4 className="font-medium text-gray-900">基础参数设置</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">预算部门</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        value={budgetData.department}
                                        onChange={(e) => handleDataChange('department', e.target.value)}
                                    >
                                        <option value="">选择部门</option>
                                        <option value="sales">销售部</option>
                                        <option value="rd">研发部</option>
                                        <option value="admin">行政部</option>
                                        <option value="finance">财务部</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">预算年度</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        value={budgetData.year}
                                        onChange={(e) => handleDataChange('year', e.target.value)}
                                    >
                                        <option value="2025">2025年</option>
                                        <option value="2026">2026年</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">预算类型</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        value={budgetData.budgetType}
                                        onChange={(e) => handleDataChange('budgetType', e.target.value)}
                                    >
                                        <option value="operational">经营预算</option>
                                        <option value="capital">资本预算</option>
                                        <option value="cash">现金预算</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">编制方法</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        value={budgetData.method}
                                        onChange={(e) => handleDataChange('method', e.target.value)}
                                    >
                                        <option value="incremental">增量预算</option>
                                        <option value="zero">零基预算</option>
                                        <option value="rolling">滚动预算</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h4 className="font-medium text-gray-900">历史数据导入</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-sm text-gray-600 mb-2">拖拽或点击上传历史预算文件</p>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        选择文件
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <h5 className="font-medium text-gray-900">数据来源选择</h5>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span className="text-sm">2024年实际执行数据</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span className="text-sm">2023年同期数据</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span className="text-sm">行业基准数据</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span className="text-sm">市场预测数据</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h4 className="font-medium text-gray-900">AI智能调整建议</h4>
                            <div className="space-y-4">
                                {[
                                    {
                                        item: '人工成本预算',
                                        current: '1200万',
                                        suggested: '1150万',
                                        reason: '基于市场薪酬水平和人员优化建议',
                                        impact: '节约50万元'
                                    },
                                    {
                                        item: '营销费用预算',
                                        current: '300万',
                                        suggested: '350万',
                                        reason: '新产品推广需要加大市场投入',
                                        impact: '增加50万元'
                                    },
                                    {
                                        item: '研发投入预算',
                                        current: '500万',
                                        suggested: '580万',
                                        reason: '技术创新需求增加，建议提升投入',
                                        impact: '增加80万元'
                                    }
                                ].map((suggestion, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <h5 className="font-medium text-gray-900">{suggestion.item}</h5>
                                            <div className="flex space-x-2">
                                                <button className="px-3 py-1 bg-green-600 text-white text-xs rounded">采纳</button>
                                                <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded">忽略</button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">当前预算：</span>
                                                <span className="font-medium">{suggestion.current}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">建议调整：</span>
                                                <span className="font-medium text-blue-600">{suggestion.suggested}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">预期影响：</span>
                                                <span className="font-medium">{suggestion.impact}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{suggestion.reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <h4 className="font-medium text-gray-900">最终预算方案确认</h4>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">3,680万</p>
                                        <p className="text-sm text-gray-600">总预算金额</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-600">+8.5%</p>
                                        <p className="text-sm text-gray-600">同比增长</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-purple-600">12项</p>
                                        <p className="text-sm text-gray-600">AI优化建议</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 mr-4">
                                        确认并保存预算
                                    </button>
                                    <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        导出预算报告
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 导航按钮 */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={() => setStep(Math.max(1, step - 1))}
                            disabled={step === 1}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            上一步
                        </button>
                        <button
                            onClick={() => setStep(Math.min(4, step + 1))}
                            disabled={step === 4}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            下一步
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // 执行监控面板
    const MonitoringDashboard = () => {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setCurrentView('main')}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">预算执行监控面板</h2>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Settings className="h-4 w-4 mr-2 inline" />
                            设置
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-2 inline" />
                            导出数据
                        </button>
                    </div>
                </div>

                {/* 实时监控指标 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">今日支出</p>
                                <p className="text-2xl font-bold text-gray-900">185.6万</p>
                                <p className="text-sm text-green-600">较昨日 -2.3%</p>
                            </div>
                            <DollarSign className="h-12 w-12 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">本月执行率</p>
                                <p className="text-2xl font-bold text-gray-900">87.2%</p>
                                <p className="text-sm text-blue-600">目标进度内</p>
                            </div>
                            <Target className="h-12 w-12 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">预警事项</p>
                                <p className="text-2xl font-bold text-gray-900">3项</p>
                                <p className="text-sm text-yellow-600">需要关注</p>
                            </div>
                            <AlertTriangle className="h-12 w-12 text-yellow-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">剩余预算</p>
                                <p className="text-2xl font-bold text-gray-900">1,254万</p>
                                <p className="text-sm text-purple-600">充足</p>
                            </div>
                            <TrendingUp className="h-12 w-12 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* 预警信息 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                        预算预警信息
                    </h3>
                    <div className="space-y-3">
                        {[
                            {
                                level: '高',
                                message: '营销费用本月支出已超预算15%，建议立即控制',
                                time: '2小时前',
                                department: '市场部'
                            },
                            {
                                level: '中',
                                message: '研发材料费预计本月底将达到预算上限',
                                time: '5小时前',
                                department: '研发部'
                            },
                            {
                                level: '低',
                                message: '办公用品采购需求增加，可能影响下月预算',
                                time: '1天前',
                                department: '行政部'
                            }
                        ].map((alert, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${alert.level === '高' ? 'bg-red-100 text-red-800' :
                                            alert.level === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                        }`}>
                                        {alert.level}风险
                                    </span>
                                    <div>
                                        <p className="font-medium text-gray-900">{alert.message}</p>
                                        <p className="text-sm text-gray-500">{alert.department} • {alert.time}</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                    处理
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 部门执行情况 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">各部门执行情况</h3>
                    <div className="space-y-4">
                        {[
                            { dept: '销售部', budget: 800, actual: 720, rate: 90 },
                            { dept: '研发部', budget: 600, actual: 580, rate: 97 },
                            { dept: '市场部', budget: 400, actual: 460, rate: 115 },
                            { dept: '行政部', budget: 300, actual: 280, rate: 93 },
                            { dept: '财务部', budget: 200, actual: 185, rate: 93 }
                        ].map((dept, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <Building className="h-8 w-8 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-900">{dept.dept}</p>
                                        <p className="text-sm text-gray-500">预算: {dept.budget}万 | 实际: {dept.actual}万</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-bold ${dept.rate <= 100 ? 'text-green-600' : dept.rate <= 110 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {dept.rate}%
                                    </p>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                                        <div
                                            className={`h-2 rounded-full ${dept.rate <= 100 ? 'bg-green-500' : dept.rate <= 110 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${Math.min(dept.rate, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // 偏差分析工具
    const VarianceAnalysis = () => {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setCurrentView('main')}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">预算偏差分析工具</h2>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2 inline" />
                            筛选条件
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-2 inline" />
                            导出分析
                        </button>
                    </div>
                </div>

                {/* 偏差概览 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">偏差分析概览</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <p className="text-2xl font-bold text-red-600">6项</p>
                            <p className="text-sm text-gray-600">负偏差项目</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">12项</p>
                            <p className="text-sm text-gray-600">正偏差项目</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-600">-280万</p>
                            <p className="text-sm text-gray-600">总体偏差额</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">7.6%</p>
                            <p className="text-sm text-gray-600">偏差率</p>
                        </div>
                    </div>
                </div>

                {/* 详细偏差分析 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">重点偏差项目分析</h3>
                    <div className="space-y-6">
                        {[
                            {
                                item: '营销推广费',
                                budget: 300,
                                actual: 380,
                                variance: 80,
                                rate: 26.7,
                                reason: '新产品上市推广投入增加',
                                impact: '高',
                                suggestion: '建议制定更精确的推广预算，加强费用审批流程'
                            },
                            {
                                item: '材料采购成本',
                                budget: 800,
                                actual: 850,
                                variance: 50,
                                rate: 6.3,
                                reason: '原材料价格上涨',
                                impact: '中',
                                suggestion: '建议建立价格监控机制，适时调整采购策略'
                            },
                            {
                                item: '人员培训费',
                                budget: 150,
                                actual: 120,
                                variance: -30,
                                rate: -20.0,
                                reason: '部分培训项目延期',
                                impact: '低',
                                suggestion: '建议重新安排培训计划，确保员工发展需求'
                            }
                        ].map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-lg font-medium text-gray-900">{item.item}</h4>
                                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${item.impact === '高' ? 'bg-red-100 text-red-800' :
                                            item.impact === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                        }`}>
                                        {item.impact}影响
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <p className="text-sm text-gray-600">预算金额</p>
                                        <p className="text-lg font-bold">{item.budget}万</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <p className="text-sm text-gray-600">实际金额</p>
                                        <p className="text-lg font-bold">{item.actual}万</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <p className="text-sm text-gray-600">偏差金额</p>
                                        <p className={`text-lg font-bold ${item.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {item.variance > 0 ? '+' : ''}{item.variance}万
                                        </p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <p className="text-sm text-gray-600">偏差率</p>
                                        <p className={`text-lg font-bold ${item.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {item.rate > 0 ? '+' : ''}{item.rate}%
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                    <h5 className="font-medium text-gray-900 mb-2">偏差原因分析</h5>
                                    <p className="text-sm text-gray-700">{item.reason}</p>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h5 className="font-medium text-gray-900 mb-2">改进建议</h5>
                                    <p className="text-sm text-gray-700">{item.suggestion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 偏差趋势分析 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">偏差趋势分析</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">月度偏差趋势</h4>
                            <div className="space-y-2">
                                {['1月', '2月', '3月', '4月', '5月', '6月'].map((month, index) => {
                                    const variance = [2.1, -1.5, 3.2, 5.8, -2.3, 7.6][index];
                                    return (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">{month}</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-20 h-2 bg-gray-200 rounded">
                                                    <div
                                                        className={`h-2 rounded ${variance > 0 ? 'bg-red-500' : 'bg-green-500'}`}
                                                        style={{ width: `${Math.abs(variance) * 10}%` }}
                                                    ></div>
                                                </div>
                                                <span className={`text-sm font-medium ${variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                    {variance > 0 ? '+' : ''}{variance}%
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">部门偏差排名</h4>
                            <div className="space-y-2">
                                {[
                                    { dept: '市场部', variance: 15.2 },
                                    { dept: '研发部', variance: 8.5 },
                                    { dept: '销售部', variance: 3.2 },
                                    { dept: '行政部', variance: -2.1 },
                                    { dept: '财务部', variance: -7.5 }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{item.dept}</span>
                                        <span className={`text-sm font-medium ${item.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {item.variance > 0 ? '+' : ''}{item.variance}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 预测优化模型
    const PredictionModel = () => {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setCurrentView('main')}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">AI预测优化模型</h2>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Settings className="h-4 w-4 mr-2 inline" />
                            模型设置
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <Zap className="h-4 w-4 mr-2 inline" />
                            运行模型
                        </button>
                    </div>
                </div>

                {/* 模型配置 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">模型参数配置</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">预测周期</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg">
                                <option value="3months">未来3个月</option>
                                <option value="6months">未来6个月</option>
                                <option value="1year">未来1年</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">预测类型</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg">
                                <option value="comprehensive">综合预测</option>
                                <option value="revenue">收入预测</option>
                                <option value="cost">成本预测</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">风险等级</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg">
                                <option value="conservative">保守</option>
                                <option value="moderate">适中</option>
                                <option value="aggressive">激进</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 预测结果 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">AI预测结果</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <LineChart className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-blue-600">4,250万</p>
                            <p className="text-sm text-gray-600">预测总收入</p>
                            <p className="text-xs text-blue-600 mt-1">置信度: 89%</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <PieChart className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-green-600">3,180万</p>
                            <p className="text-sm text-gray-600">预测总成本</p>
                            <p className="text-xs text-green-600 mt-1">置信度: 92%</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-purple-600">1,070万</p>
                            <p className="text-sm text-gray-600">预测净利润</p>
                            <p className="text-xs text-purple-600 mt-1">置信度: 85%</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">关键预测洞察</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 基于历史数据和市场趋势，预计下半年收入将实现12%的增长</li>
                            <li>• 人工成本预计上涨8%，建议提前制定人力资源优化策略</li>
                            <li>• 原材料价格波动风险较高，建议建立价格对冲机制</li>
                            <li>• 数字化投入将在6个月后开始产生显著效益</li>
                        </ul>
                    </div>
                </div>

                {/* 优化建议 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">AI优化建议</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: '收入优化策略',
                                recommendations: [
                                    '加大高毛利产品的推广力度',
                                    '拓展新兴市场，预计可增收15%',
                                    '优化定价策略，提升产品竞争力',
                                    '加强客户关系管理，提高复购率'
                                ],
                                impact: '预计增收320万元'
                            },
                            {
                                title: '成本控制策略',
                                recommendations: [
                                    '优化供应链管理，降低采购成本',
                                    '推进自动化改造，减少人工成本',
                                    '整合办公资源，降低运营费用',
                                    '建立成本监控体系，实时预警'
                                ],
                                impact: '预计节约180万元'
                            },
                            {
                                title: '投资优化策略',
                                recommendations: [
                                    '优先投资ROI较高的项目',
                                    '分阶段实施大型投资计划',
                                    '建立投资效果评估机制',
                                    '合理配置资金，降低财务风险'
                                ],
                                impact: '预计提升ROI 25%'
                            },
                            {
                                title: '风险管控策略',
                                recommendations: [
                                    '建立多元化收入结构',
                                    '加强现金流管理',
                                    '建立应急预算储备',
                                    '完善风险预警机制'
                                ],
                                impact: '预计降低风险30%'
                            }
                        ].map((strategy, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium text-gray-900">{strategy.title}</h4>
                                    <span className="text-sm font-semibold text-green-600">{strategy.impact}</span>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {strategy.recommendations.map((rec, recIndex) => (
                                        <li key={recIndex} className="flex items-start">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                    应用策略
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 场景分析 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4">多场景预测分析</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">场景</th>
                                    <th className="text-right py-3 px-4">预测收入</th>
                                    <th className="text-right py-3 px-4">预测成本</th>
                                    <th className="text-right py-3 px-4">预测利润</th>
                                    <th className="text-right py-3 px-4">概率</th>
                                    <th className="text-center py-3 px-4">风险评级</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { scenario: '乐观场景', revenue: 4500, cost: 3200, profit: 1300, probability: 25, risk: '低' },
                                    { scenario: '基准场景', revenue: 4250, cost: 3180, profit: 1070, probability: 50, risk: '中' },
                                    { scenario: '悲观场景', revenue: 3900, cost: 3100, profit: 800, probability: 25, risk: '高' }
                                ].map((scenario, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">{scenario.scenario}</td>
                                        <td className="py-3 px-4 text-right">{scenario.revenue}万</td>
                                        <td className="py-3 px-4 text-right">{scenario.cost}万</td>
                                        <td className="py-3 px-4 text-right font-medium text-green-600">{scenario.profit}万</td>
                                        <td className="py-3 px-4 text-right">{scenario.probability}%</td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`px-2 py-1 text-xs rounded-full ${scenario.risk === '低' ? 'bg-green-100 text-green-800' :
                                                    scenario.risk === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {scenario.risk}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // 根据当前视图渲染对应组件
    const renderCurrentView = () => {
        switch (currentView) {
            case 'plan-generator':
                return <BudgetPlanGenerator />;
            case 'budget-report':
                return <BudgetReport />;
            case 'scheme-detail':
                return <SchemeDetail scheme={selectedScheme} />;
            case 'budget-assistant':
                return <BudgetAssistant />;
            case 'monitoring-dashboard':
                return <MonitoringDashboard />;
            case 'variance-analysis':
                return <VarianceAnalysis />;
            case 'prediction-model':
                return <PredictionModel />;
            default:
                return <MainView />;
        }
    };

    // 主视图（原始内容）
    const MainView = () => (
        <div className="space-y-6">
            {/* 预算管理分析控制面板 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <DollarSign className="h-6 w-6 mr-2 text-green-600" />
                        预算管理优化智能分析
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setCurrentView('plan-generator')}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                        >
                            <Zap className="h-4 w-4 mr-2" />
                            生成预算方案
                        </button>
                        <button
                            onClick={() => setCurrentView('budget-report')}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            查看预算报告
                        </button>
                    </div>
                </div>

                {/* 预算执行概况 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">88%</p>
                        <p className="text-sm text-gray-600">预算执行率</p>
                        <p className="text-xs text-green-600 mt-1">控制良好</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Target className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">92%</p>
                        <p className="text-sm text-gray-600">预算达成率</p>
                        <p className="text-xs text-blue-600 mt-1">目标实现</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">6</p>
                        <p className="text-sm text-gray-600">预算偏差项</p>
                        <p className="text-xs text-yellow-600 mt-1">需要关注</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">15%</p>
                        <p className="text-sm text-gray-600">预算优化潜力</p>
                        <p className="text-xs text-purple-600 mt-1">提升空间</p>
                    </div>
                </div>
            </div>

            {/* 预算执行仪表盘 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    预算执行仪表盘
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 收入预算执行 */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">收入预算执行情况</h4>
                        <div className="space-y-3">
                            {[
                                { item: '产品销售收入', budget: 2800, actual: 2650, rate: 94.6 },
                                { item: '技术服务收入', budget: 800, actual: 920, rate: 115.0 },
                                { item: '其他业务收入', budget: 200, actual: 180, rate: 90.0 }
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-3 rounded border">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">{item.item}</span>
                                        <span className={`text-sm font-bold ${item.rate >= 100 ? 'text-green-600' : item.rate >= 90 ? 'text-blue-600' : 'text-red-600'
                                            }`}>
                                            {item.rate}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>预算: {item.budget}万</span>
                                        <span>实际: {item.actual}万</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${item.rate >= 100 ? 'bg-green-500' : item.rate >= 90 ? 'bg-blue-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${Math.min(item.rate, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 成本预算执行 */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">成本预算执行情况</h4>
                        <div className="space-y-3">
                            {[
                                { item: '人工成本', budget: 1200, actual: 1150, rate: 95.8 },
                                { item: '材料成本', budget: 800, actual: 850, rate: 106.3 },
                                { item: '管理费用', budget: 400, actual: 380, rate: 95.0 },
                                { item: '销售费用', budget: 300, actual: 320, rate: 106.7 }
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-3 rounded border">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">{item.item}</span>
                                        <span className={`text-sm font-bold ${item.rate <= 100 ? 'text-green-600' : item.rate <= 110 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                            {item.rate}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>预算: {item.budget}万</span>
                                        <span>实际: {item.actual}万</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${item.rate <= 100 ? 'bg-green-500' : item.rate <= 110 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${Math.min(item.rate, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 预算优化建议方案 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                    预算管理优化建议
                </h3>
                <div className="space-y-6">
                    {[
                        {
                            id: 1,
                            title: '滚动预算体系建设',
                            description: '建立季度滚动预算机制，提高预算的准确性和灵活性，适应市场变化',
                            category: '体系优化',
                            benefits: ['预算准确度提升20%', '市场适应性增强', '决策响应更快'],
                            investment: '50万元',
                            timeline: '2-3个月',
                            savings: '180万元/年',
                            priority: '高'
                        },
                        {
                            id: 2,
                            title: '零基预算实施',
                            description: '在部分费用项目实施零基预算，从根本上审视费用的合理性和必要性',
                            category: '方法优化',
                            benefits: ['费用控制更严格', '资源配置更合理', '成本意识提升'],
                            investment: '30万元',
                            timeline: '1-2个月',
                            savings: '120万元/年',
                            priority: '中'
                        },
                        {
                            id: 3,
                            title: '预算绩效考核体系',
                            description: '建立预算执行与绩效考核挂钩的激励机制，提升预算执行效果',
                            category: '管控优化',
                            benefits: ['执行力提升', '责任意识增强', '目标达成率提高'],
                            investment: '40万元',
                            timeline: '2个月',
                            savings: '200万元/年',
                            priority: '高'
                        },
                        {
                            id: 4,
                            title: '智能预算分析系统',
                            description: '建设智能预算分析系统，实现预算编制、执行、分析的数字化闭环管理',
                            category: '工具优化',
                            benefits: ['分析效率提升50%', '预警及时性', '数据可视化'],
                            investment: '80万元',
                            timeline: '3-4个月',
                            savings: '150万元/年',
                            priority: '中'
                        }
                    ].map((scheme) => (
                        <div key={scheme.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                                        {scheme.id}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-lg">{scheme.title}</h4>
                                        <p className="text-sm text-gray-600">{scheme.description}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${scheme.priority === '高' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {scheme.priority}优先级
                                    </span>
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {scheme.category}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="bg-green-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">年度节约</p>
                                    <p className="font-bold text-green-600">{scheme.savings}</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">实施周期</p>
                                    <p className="font-medium text-blue-600">{scheme.timeline}</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">投资金额</p>
                                    <p className="font-medium text-purple-600">{scheme.investment}</p>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">投资回报</p>
                                    <p className="font-bold text-orange-600">
                                        {((parseFloat(scheme.savings.replace('万元/年', '')) / parseFloat(scheme.investment.replace('万元', ''))) * 100).toFixed(0)}%
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">预期效益：</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {scheme.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            {benefit}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => {
                                        setSelectedScheme(scheme);
                                        setActiveTab('detail');
                                        setCurrentView('scheme-detail');
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    查看详情
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedScheme(scheme);
                                        setActiveTab('benefit');
                                        setCurrentView('scheme-detail');
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center"
                                >
                                    <Calculator className="h-4 w-4 mr-2" />
                                    效益测算
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedScheme(scheme);
                                        setActiveTab('plan');
                                        setCurrentView('scheme-detail');
                                    }}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center"
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    实施计划
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 预算管理工具 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-indigo-600" />
                    预算管理工具箱
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        onClick={() => setCurrentView('budget-assistant')}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <DollarSign className="h-12 w-12 text-green-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">预算编制助手</h4>
                        <p className="text-sm text-gray-600 mb-4">智能预算编制工具，基于历史数据和市场预测</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 自动数据填充 • 趋势分析 • 场景模拟 • 合理性检查
                        </div>
                        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            开始编制
                        </button>
                    </div>

                    <div
                        onClick={() => setCurrentView('monitoring-dashboard')}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <BarChart3 className="h-12 w-12 text-blue-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">执行监控面板</h4>
                        <p className="text-sm text-gray-600 mb-4">实时监控预算执行情况，及时发现偏差</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 实时监控 • 偏差预警 • 趋势分析 • 钻取分析
                        </div>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            查看面板
                        </button>
                    </div>

                    <div
                        onClick={() => setCurrentView('variance-analysis')}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <Target className="h-12 w-12 text-purple-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">偏差分析工具</h4>
                        <p className="text-sm text-gray-600 mb-4">深度分析预算偏差原因，提供改进建议</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 偏差计算 • 原因分析 • 影响评估 • 改进建议
                        </div>
                        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                            开始分析
                        </button>
                    </div>

                    <div
                        onClick={() => setCurrentView('prediction-model')}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <TrendingUp className="h-12 w-12 text-orange-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">预测优化模型</h4>
                        <p className="text-sm text-gray-600 mb-4">基于AI算法的预算预测和优化建议</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 智能预测 • 优化建议 • 风险评估 • 场景分析
                        </div>
                        <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                            启动模型
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return renderCurrentView();
};

export default BudgetManagement;