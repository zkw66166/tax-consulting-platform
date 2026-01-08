import React, { useState } from 'react';
import { GitBranch, Zap, ExternalLink, Building, Target, DollarSign, Lightbulb, Eye, Calendar, Calculator, CheckCircle, Star, Network, Settings, Monitor, PieChart, ArrowLeft, Download, FileText, AlertTriangle, TrendingUp, Users, Clock, ChevronRight, Plus, Minus, Info, CheckSquare, XCircle, X, RotateCcw, BarChart3, Shield, Award } from 'lucide-react';

// 导入报告模板
import { generateReportHTML, getReportData, generatePDFReport, generateWordReport } from '../../report/equityStructureReport';

// 创建一个简单的税负计算器模态框组件（临时替代）
const TaxCalculatorModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        revenue: 10000,
        profit: 2000,
        taxableIncome: 1800,
        vatRate: 6,
        citRate: 25,
        pitRate: 20,
        deductions: 200,
        preferentialPolicy: 'none',
        region: 'general'
    });

    const [results, setResults] = useState(null);

    const calculateTax = () => {
        const { revenue, profit, taxableIncome, vatRate, citRate, pitRate, deductions } = formData;

        const vatTax = revenue * vatRate / 100;
        const adjustedIncome = Math.max(0, taxableIncome - deductions);
        const citTax = adjustedIncome * citRate / 100;
        const dividend = Math.max(0, profit - citTax);
        const pitTax = dividend * pitRate / 100;
        const totalTax = vatTax + citTax + pitTax;
        const totalTaxRate = (totalTax / revenue) * 100;

        setResults({
            vatTax: vatTax.toFixed(2),
            citTax: citTax.toFixed(2),
            pitTax: pitTax.toFixed(2),
            totalTax: totalTax.toFixed(2),
            totalTaxRate: totalTaxRate.toFixed(2)
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                            税负计算器
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">基础参数</h3>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">年利润总额（万元）</label>
                                <input
                                    type="number"
                                    value={formData.profit}
                                    onChange={(e) => setFormData({ ...formData, profit: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">增值税税率（%）</label>
                                <select
                                    value={formData.vatRate}
                                    onChange={(e) => setFormData({ ...formData, vatRate: parseFloat(e.target.value) })}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                >
                                    <option value={13}>13% - 制造业等</option>
                                    <option value={9}>9% - 交通运输等</option>
                                    <option value={6}>6% - 现代服务业</option>
                                    <option value={3}>3% - 小规模纳税人</option>
                                </select>
                            </div>
                            <button
                                onClick={calculateTax}
                                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                计算税负
                            </button>
                        </div>

                        <div className="space-y-4">
                            {results ? (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">计算结果</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span>增值税</span>
                                            <span className="font-medium">{results.vatTax}万元</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span>企业所得税</span>
                                            <span className="font-medium">{results.citTax}万元</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span>个人所得税</span>
                                            <span className="font-medium">{results.pitTax}万元</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                                            <span className="font-medium">总税负</span>
                                            <span className="font-bold text-blue-600">{results.totalTax}万元</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                                            <span className="font-medium">税负率</span>
                                            <span className="font-bold text-green-600">{results.totalTaxRate}%</span>
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

// 股权架构分析报告模态框
const EquityAnalysisReportModal = ({ onClose }) => {
    const [showDetailReport, setShowDetailReport] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState('PDF');
    const [isGenerating, setIsGenerating] = useState(false);

    const reportData = {
        companyName: '科技创新股份有限公司',
        overallScore: 7.8,
        optimizationPotential: '中等',
        riskLevel: '可控'
    };

    const reportSummary = {
        overallScore: 7.8,
        optimizationPotential: '中等',
        riskLevel: '可控',
        keyFindings: [
            {
                category: '控制结构',
                score: 8.2,
                status: '良好',
                description: '三层架构合理，控制链清晰有效',
                risks: ['过度集中风险', '单点控制风险'],
                opportunities: ['增设中间层', '分散控制风险']
            },
            {
                category: '税务效率',
                score: 6.8,
                status: '待优化',
                description: '整体税负偏高，存在明显优化空间',
                risks: ['税负过重', '合规风险'],
                opportunities: ['设立税收洼地子公司', '业务重组']
            },
            {
                category: '治理结构',
                score: 8.5,
                status: '优秀',
                description: '决策机制完善，内控制度健全',
                risks: ['信息披露不充分', '关联交易复杂'],
                opportunities: ['优化信息披露', '简化关联关系']
            },
            {
                category: '风险管控',
                score: 7.6,
                status: '良好',
                description: '风险识别到位，但应对机制需完善',
                risks: ['政策变化风险', '合规风险'],
                opportunities: ['建立预警机制', '完善风险应对']
            }
        ],
        recommendations: [
            '在税收洼地设立运营主体，降低整体税负',
            '优化关联交易定价，提升税务合规性',
            '建立股权激励平台，完善治理结构',
            '加强内控制度建设，提升风险管控能力'
        ]
    };

    const handlePreviewReport = async () => {
        setIsGenerating(true);
        try {
            // 添加短暂延迟模拟生成过程
            await new Promise(resolve => setTimeout(resolve, 500));

            const fullReportData = getReportData();
            const reportHTML = generateReportHTML(fullReportData);

            const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
            if (newWindow) {
                newWindow.document.write(reportHTML);
                newWindow.document.close();
                newWindow.document.title = '股权架构优化分析报告';

                // 为新窗口添加打印功能
                newWindow.addEventListener('load', () => {
                    // 添加打印按钮
                    const printButton = newWindow.document.createElement('button');
                    printButton.textContent = '打印报告';
                    printButton.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 1000;
                        padding: 10px 20px;
                        background: #9b59b6;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    `;
                    printButton.onclick = () => newWindow.print();
                    newWindow.document.body.appendChild(printButton);
                });
            } else {
                throw new Error('弹窗被阻止');
            }
        } catch (error) {
            console.error('生成报告时出错:', error);
            if (error.message === '弹窗被阻止') {
                alert('浏览器阻止了弹出窗口，请允许弹出窗口后重试，或者点击下载报告查看完整内容。');
            } else {
                alert('报告生成失败，请稍后重试。');
            }
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadReport = async () => {
        setIsGenerating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const fullReportData = getReportData();
            if (downloadFormat === 'PDF') {
                const result = generatePDFReport(fullReportData);
                // 在实际项目中，这里会触发真实的文件下载
                const blob = new Blob([`PDF报告内容: ${JSON.stringify(fullReportData, null, 2)}`],
                    { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = result.filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                alert(`PDF报告已生成并下载: ${result.filename}`);
            } else {
                const result = generateWordReport(fullReportData);
                // 在实际项目中，这里会触发真实的文件下载
                const blob = new Blob([`Word报告内容: ${JSON.stringify(fullReportData, null, 2)}`],
                    { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = result.filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                alert(`Word报告已生成并下载: ${result.filename}`);
            }
        } catch (error) {
            console.error('下载报告时出错:', error);
            alert('报告下载失败，请稍后重试。');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* 标题栏 - 参考附图样式 */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <div className="flex items-center">
                        <FileText className="h-6 w-6 text-blue-600 mr-3" />
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">股权架构分析报告</h2>
                            <p className="text-sm text-gray-600">科技创新股份有限公司 - 2024年12月15日</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handlePreviewReport}
                            disabled={isGenerating}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Eye className="h-4 w-4 mr-2" />
                            )}
                            预览报告
                        </button>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2">格式:</span>
                            <div className="relative">
                                <select
                                    value={downloadFormat}
                                    onChange={(e) => setDownloadFormat(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={isGenerating}
                                >
                                    <option value="PDF">PDF</option>
                                    <option value="Word">Word</option>
                                </select>
                                <ChevronRight className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 pointer-events-none" />
                            </div>
                        </div>
                        <button
                            onClick={handleDownloadReport}
                            disabled={isGenerating}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Download className="h-4 w-4 mr-2" />
                            )}
                            下载报告
                        </button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="space-y-6">
                        {/* 目标公司信息和报告信息 - 参考附图布局 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">目标公司信息</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">公司名称:</span>
                                        <span className="text-gray-900">科技创新股份有限公司</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">统一社会信用代码:</span>
                                        <span className="text-gray-900">91110000MA01234567</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">成立日期:</span>
                                        <span className="text-gray-900">2018年03月15日</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">注册资本:</span>
                                        <span className="text-gray-900">5000万元</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">法定代表人:</span>
                                        <span className="text-gray-900">张三</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">所属行业:</span>
                                        <span className="text-gray-900">软件和信息技术服务业</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">报告信息</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">报告日期:</span>
                                        <span className="text-gray-900">2024年12月15日</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">分析期间:</span>
                                        <span className="text-gray-900">2021年-2023年</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">咨询机构:</span>
                                        <span className="text-gray-900">某某税务咨询有限公司</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">项目团队:</span>
                                        <span className="text-gray-900">高级税务筹划师团队</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-600">报告编号:</span>
                                        <span className="text-gray-900">EQ-20241215-001</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 执行摘要 - 参考附图样式 */}
                        <div className="border-t pt-6">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                                    <Target className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">执行摘要</h3>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    本次股权架构优化分析围绕科技创新股份有限公司的控制结构、税务效率、治理框架等关键方面展开深入研究。
                                    分析期间为2021年至2023年，通过对公司股权结构、关联交易、税负分布等的全面审查，
                                    我们认为该公司股权架构基本合理，但在税务效率方面存在显著优化空间。公司三层架构清晰稳定，
                                    控制关系明确，治理机制相对完善。同时，在税收优惠政策利用、关联交易安排等方面存在较大提升潜力，
                                    预计通过系统性优化可实现年节税380-540万元。基于综合分析，我们给予该公司架构优化潜力"中等"评级，
                                    建议分阶段实施相关优化方案。
                                </p>
                            </div>

                            {/* 评级卡片 - 参考附图样式 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-purple-50 p-6 rounded-lg text-center border border-purple-200">
                                    <h4 className="text-purple-800 font-medium mb-2">综合评分</h4>
                                    <div className="text-3xl font-bold text-purple-600 mb-2">7.8</div>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
                                    <h4 className="text-blue-800 font-medium mb-2">优化潜力</h4>
                                    <div className="text-xl font-bold text-blue-600 mb-2">中等</div>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
                                    <h4 className="text-green-800 font-medium mb-2">风险等级</h4>
                                    <div className="text-xl font-bold text-green-600 mb-2">可控</div>
                                </div>
                            </div>
                        </div>

                        {/* 关键发现 */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">关键发现</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {reportSummary.keyFindings.map((finding, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium text-gray-900">{finding.category}</h4>
                                            <span className={`px-2 py-1 text-xs rounded ${finding.status === '优秀' ? 'bg-green-100 text-green-800' :
                                                    finding.status === '良好' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {finding.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{finding.description}</p>
                                        <div className="text-lg font-bold text-purple-600">评分: {finding.score}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 核心建议 */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">核心建议</h3>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <ul className="text-sm text-yellow-800 space-y-2">
                                    {reportSummary.recommendations.map((rec, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* 预期节税效果 */}
                        <div className="border-t pt-6">
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">预期优化效果</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">380-540万元</div>
                                        <div className="text-sm text-gray-600">年节税金额</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">8-15个月</div>
                                        <div className="text-sm text-gray-600">投资回收期</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">2100万元</div>
                                        <div className="text-sm text-gray-600">5年累计收益</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 优化方案生成模态框
const OptimizationGeneratorModal = ({ onClose }) => {
    const [generationProgress, setGenerationProgress] = useState(0);
    const [schemes, setSchemes] = useState(null);

    const schemeData = [
        {
            id: 1,
            title: '设立税收洼地子公司',
            description: '在税收优惠园区设立子公司，承接部分业务，享受地方税收优惠政策',
            benefits: ['年节税约180万元', '享受15%企业所得税', '增值税地方留存奖励'],
            complexity: '中',
            timeline: '3-4个月',
            riskLevel: '低',
            investment: '150万元',
            roi: '320%',
            score: 8.5
        },
        {
            id: 2,
            title: '业务板块分离重组',
            description: '将研发、生产、销售业务分离到不同主体，优化各环节税负结构',
            benefits: ['年节税约240万元', '享受研发费用加计扣除', '降低整体税负率'],
            complexity: '高',
            timeline: '6-8个月',
            riskLevel: '中',
            investment: '300万元',
            roi: '180%',
            score: 7.8
        },
        {
            id: 3,
            title: '股权激励平台搭建',
            description: '设立员工持股平台，优化股权激励税务安排',
            benefits: ['减少个税负担', '提升员工积极性', '完善治理结构'],
            complexity: '中',
            timeline: '2-3个月',
            riskLevel: '低',
            investment: '80万元',
            roi: '150%',
            score: 8.2
        }
    ];

    const generateSchemes = () => {
        setGenerationProgress(0);
        const interval = setInterval(() => {
            setGenerationProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setSchemes(schemeData);
                    return 100;
                }
                return prev + 8;
            });
        }, 150);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-900">智能优化方案生成</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {!schemes ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">方案参数配置</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">优化目标</label>
                                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                                            <option>税负最小化</option>
                                            <option>综合效益最大化</option>
                                            <option>风险可控下的节税</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">投资预算上限</label>
                                        <input type="number" placeholder="万元" className="w-full p-3 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">实施时间要求</label>
                                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                                            <option>6个月内</option>
                                            <option>1年内</option>
                                            <option>2年内</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">风险承受度</label>
                                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                                            <option>保守型</option>
                                            <option>平衡型</option>
                                            <option>积极型</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={generateSchemes}
                                    disabled={generationProgress > 0 && generationProgress < 100}
                                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                                >
                                    {generationProgress > 0 && generationProgress < 100 ? (
                                        <>
                                            <RotateCcw className="h-5 w-5 mr-2 inline animate-spin" />
                                            AI智能生成中...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="h-5 w-5 mr-2 inline" />
                                            开始生成优化方案
                                        </>
                                    )}
                                </button>
                            </div>

                            {generationProgress > 0 && generationProgress < 100 && (
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600">方案生成进度</span>
                                        <span className="text-sm text-gray-600">{generationProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${generationProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI智能生成方案</h3>
                                <p className="text-gray-600">基于您的企业状况和参数配置，AI为您生成了以下优化方案：</p>
                            </div>

                            <div className="space-y-4">
                                {schemes.map((scheme, index) => (
                                    <div key={scheme.id} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 text-lg">方案 {index + 1}: {scheme.title}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-green-600">{scheme.score}</div>
                                                <div className="text-xs text-gray-500">综合评分</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                                            <div className="bg-green-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">预期ROI</p>
                                                <p className="font-bold text-green-600">{scheme.roi}</p>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">实施周期</p>
                                                <p className="font-medium text-blue-600">{scheme.timeline}</p>
                                            </div>
                                            <div className="bg-purple-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">复杂程度</p>
                                                <p className="font-medium text-purple-600">{scheme.complexity}</p>
                                            </div>
                                            <div className="bg-orange-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">初始投资</p>
                                                <p className="font-medium text-orange-600">{scheme.investment}</p>
                                            </div>
                                            <div className="bg-red-50 p-3 rounded-lg text-center">
                                                <p className="text-xs text-gray-500">风险等级</p>
                                                <p className="font-medium text-red-600">{scheme.riskLevel}</p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                            <h5 className="font-medium text-gray-900 mb-2">预期效益：</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                {scheme.benefits.map((benefit, idx) => (
                                                    <div key={idx} className="flex items-center text-sm text-gray-600">
                                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                        {benefit}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                                                查看详情
                                            </button>
                                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                                                采用方案
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex space-x-4">
                                <button className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    <Download className="h-4 w-4 mr-2 inline" />
                                    导出方案
                                </button>
                                <button className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    <FileText className="h-4 w-4 mr-2 inline" />
                                    保存草稿
                                </button>
                                <button
                                    onClick={generateSchemes}
                                    className="flex-1 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                >
                                    <Zap className="h-4 w-4 mr-2 inline" />
                                    重新生成
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 架构效率分析模态框
const ArchitectureAnalysisModal = ({ onClose }) => {
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [analysisResults, setAnalysisResults] = useState(null);

    const startAnalysis = () => {
        setAnalysisProgress(0);
        const interval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setAnalysisResults({
                        overallEfficiency: 76,
                        controlChainScore: 85,
                        taxEfficiencyScore: 68,
                        governanceScore: 82,
                        riskScore: 74,
                        optimizationAreas: [
                            {
                                area: '税务结构优化',
                                priority: '高',
                                potential: '年节税180-240万',
                                actions: ['设立税收洼地子公司', '优化关联交易定价', '业务重组']
                            },
                            {
                                area: '控制链简化',
                                priority: '中',
                                potential: '降低管理成本15%',
                                actions: ['减少中间层级', '优化决策流程', '提升运营效率']
                            },
                            {
                                area: '治理结构完善',
                                priority: '中',
                                potential: '提升合规性20%',
                                actions: ['建立内控制度', '完善信息披露', '加强风险管控']
                            }
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
                    <h2 className="text-xl font-semibold text-gray-900">架构效率深度分析</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">架构效率全面评估</h3>
                        <button
                            onClick={startAnalysis}
                            disabled={analysisProgress > 0 && analysisProgress < 100}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {analysisProgress > 0 && analysisProgress < 100 ? '分析中...' : '开始深度分析'}
                        </button>
                    </div>

                    {analysisProgress > 0 && analysisProgress < 100 && (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">架构分析进度</span>
                                <span className="text-sm text-gray-600">{analysisProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${analysisProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {analysisResults && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">综合效率评估</h3>
                                <div className="text-center mb-4">
                                    <div className="text-4xl font-bold text-indigo-600">{analysisResults.overallEfficiency}</div>
                                    <div className="text-sm text-gray-600">综合效率评分</div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{analysisResults.controlChainScore}</div>
                                        <div className="text-sm text-gray-600">控制链效率</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{analysisResults.taxEfficiencyScore}</div>
                                        <div className="text-sm text-gray-600">税务效率</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">{analysisResults.governanceScore}</div>
                                        <div className="text-sm text-gray-600">治理效率</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">{analysisResults.riskScore}</div>
                                        <div className="text-sm text-gray-600">风险控制</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium text-gray-900">优化建议</h4>
                                {analysisResults.optimizationAreas.map((area, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <h5 className="font-medium text-gray-900">{area.area}</h5>
                                            <span className={`px-2 py-1 text-xs rounded ${area.priority === '高' ? 'bg-red-100 text-red-800' :
                                                    area.priority === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                                }`}>
                                                {area.priority}优先级
                                            </span>
                                        </div>
                                        <p className="text-sm text-green-600 mb-3">优化潜力: {area.potential}</p>
                                        <div className="bg-gray-50 p-3 rounded">
                                            <p className="text-sm font-medium text-gray-900 mb-2">建议措施:</p>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                {area.actions.map((action, idx) => (
                                                    <li key={idx}>• {action}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 主组件
const EquityStructure = ({ selectedCompany, userType, currentTime, selectedCompanies, isProfessionalView }) => {
    const [showCalculator, setShowCalculator] = useState(false);
    const [showAnalysisReport, setShowAnalysisReport] = useState(false);
    const [showOptimizationGenerator, setShowOptimizationGenerator] = useState(false);
    const [showArchitectureAnalysis, setShowArchitectureAnalysis] = useState(false);
    const [expandedScheme, setExpandedScheme] = useState(null);
    const [showBenefitCalculation, setShowBenefitCalculation] = useState(null);

    // 优化方案数据
    const schemes = [
        {
            id: 1,
            title: '设立税收洼地子公司',
            description: '在税收优惠园区设立子公司，承接部分业务，享受地方税收优惠政策',
            benefits: ['年节税约180万元', '享受15%企业所得税', '增值税地方留存奖励'],
            complexity: '中',
            timeline: '3-4个月',
            riskLevel: '低',
            investment: '150万元',
            roi: '320%',
            score: 8.5,
            detailedBenefits: {
                taxSaving: '180万元/年',
                roiPeriod: '8个月',
                totalInvestment: '150万元',
                annualReturn: '480万元',
                breakdown: {
                    citSaving: '120万元/年',
                    vatRebate: '45万元/年',
                    otherBenefits: '15万元/年'
                }
            },
            implementationSteps: [
                { phase: '前期调研', duration: '2周', tasks: ['园区政策调研', '可行性分析', '风险评估'], status: 'pending' },
                { phase: '方案设计', duration: '3周', tasks: ['架构设计', '业务梳理', '税务筹划'], status: 'pending' },
                { phase: '申报注册', duration: '4周', tasks: ['工商注册', '税务登记', '银行开户'], status: 'pending' },
                { phase: '业务迁移', duration: '6周', tasks: ['合同变更', '人员安排', '系统对接'], status: 'pending' }
            ],
            risks: [
                { level: '低', item: '政策变化风险', mitigation: '选择政策稳定性强的园区' },
                { level: '中', item: '业务适应性', mitigation: '分阶段迁移，降低运营风险' }
            ]
        },
        {
            id: 2,
            title: '业务板块分离重组',
            description: '将研发、生产、销售业务分离到不同主体，优化各环节税负结构',
            benefits: ['年节税约240万元', '享受研发费用加计扣除', '降低整体税负率'],
            complexity: '高',
            timeline: '6-8个月',
            riskLevel: '中',
            investment: '300万元',
            roi: '180%',
            score: 7.8,
            detailedBenefits: {
                taxSaving: '240万元/年',
                roiPeriod: '15个月',
                totalInvestment: '300万元',
                annualReturn: '540万元',
                breakdown: {
                    rdDeduction: '150万元/年',
                    transferPricing: '60万元/年',
                    structureOptimization: '30万元/年'
                }
            },
            implementationSteps: [
                { phase: '整体规划', duration: '4周', tasks: ['业务梳理', '架构设计', '法务审查'], status: 'pending' },
                { phase: '主体设立', duration: '6周', tasks: ['新公司注册', '资质申请', '团队组建'], status: 'pending' },
                { phase: '资产重组', duration: '8周', tasks: ['资产评估', '转让程序', '债权债务处理'], status: 'pending' },
                { phase: '业务整合', duration: '10周', tasks: ['系统整合', '流程重建', '团队磨合'], status: 'pending' }
            ],
            risks: [
                { level: '中', item: '重组税务风险', mitigation: '严格按照税法规定执行' },
                { level: '高', item: '业务连续性风险', mitigation: '制定详细的过渡方案' }
            ]
        },
        {
            id: 3,
            title: '股权激励平台搭建',
            description: '设立员工持股平台，优化股权激励税务安排',
            benefits: ['减少个税负担', '提升员工积极性', '完善治理结构'],
            complexity: '中',
            timeline: '2-3个月',
            riskLevel: '低',
            investment: '80万元',
            roi: '150%',
            score: 8.2,
            detailedBenefits: {
                taxSaving: '120万元/年',
                roiPeriod: '8个月',
                totalInvestment: '80万元',
                annualReturn: '200万元',
                breakdown: {
                    pitSaving: '80万元/年',
                    motivationValue: '30万元/年',
                    governanceImprovement: '10万元/年'
                }
            },
            implementationSteps: [
                { phase: '方案设计', duration: '3周', tasks: ['激励方案设计', '持股平台架构', '法律文件准备'], status: 'pending' },
                { phase: '平台设立', duration: '3周', tasks: ['合伙企业注册', '相关备案', '制度建立'], status: 'pending' },
                { phase: '激励实施', duration: '4周', tasks: ['员工沟通', '股权分配', '协议签署'], status: 'pending' }
            ],
            risks: [
                { level: '低', item: '政策风险', mitigation: '密切关注政策变化，及时调整' },
                { level: '低', item: '员工接受度', mitigation: '充分沟通，做好培训工作' }
            ]
        }
    ];

    // 效益测算模态框
    const BenefitCalculationModal = ({ scheme, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">{scheme.title} - 效益测算</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-4">投资回报分析</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{scheme.detailedBenefits.taxSaving}</div>
                                    <div className="text-sm text-gray-600">年节税金额</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{scheme.detailedBenefits.roiPeriod}</div>
                                    <div className="text-sm text-gray-600">投资回收期</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">{scheme.roi}</div>
                                    <div className="text-sm text-gray-600">年化收益率</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">{scheme.detailedBenefits.annualReturn}</div>
                                    <div className="text-sm text-gray-600">年化收益</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="font-medium text-gray-900 mb-4">效益构成分析</h4>
                            <div className="space-y-4">
                                {Object.entries(scheme.detailedBenefits.breakdown).map(([key, value], index) => {
                                    const labels = {
                                        citSaving: '企业所得税节省',
                                        vatRebate: '增值税返还',
                                        otherBenefits: '其他税收优惠',
                                        rdDeduction: '研发费用加计扣除',
                                        transferPricing: '转让定价优化',
                                        structureOptimization: '结构优化效益',
                                        pitSaving: '个人所得税节省',
                                        motivationValue: '员工激励价值',
                                        governanceImprovement: '治理结构改善'
                                    };

                                    return (
                                        <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="text-gray-700">{labels[key] || key}</span>
                                            <span className="font-medium text-green-600">{value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                                <Info className="h-4 w-4 mr-2" />
                                效益测算说明
                            </h4>
                            <p className="text-sm text-yellow-800">
                                以上测算基于当前税收政策和企业经营状况，实际效益可能因政策变化、市场环境等因素有所差异。
                                建议在具体实施前进行详细的可行性研究和风险评估。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* 股权架构分析控制面板 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <GitBranch className="h-6 w-6 mr-2 text-purple-600" />
                        股权架构优化智能分析
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowOptimizationGenerator(true)}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                        >
                            <Zap className="h-4 w-4 mr-2" />
                            生成优化方案
                        </button>
                        <button
                            onClick={() => setShowAnalysisReport(true)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
                        >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            查看分析报告
                        </button>
                    </div>
                </div>

                {/* 当前股权架构概况 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Building className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">5</p>
                        <p className="text-sm text-gray-600">关联企业数量</p>
                        <p className="text-xs text-purple-600 mt-1">2个子公司 + 3个关联方</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <GitBranch className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">3</p>
                        <p className="text-sm text-gray-600">层级结构</p>
                        <p className="text-xs text-blue-600 mt-1">适中的控制深度</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">8.5%</p>
                        <p className="text-sm text-gray-600">整体税负率</p>
                        <p className="text-xs text-green-600 mt-1">低于行业平均</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <Target className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">68</p>
                        <p className="text-sm text-gray-600">优化潜力评分</p>
                        <p className="text-xs text-orange-600 mt-1">中等优化空间</p>
                    </div>
                </div>
            </div>

            {/* 股权架构可视化 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Network className="h-5 w-5 mr-2 text-teal-600" />
                    当前股权架构图
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                    {/* 最高层 - 控股集团 */}
                    <div className="text-center mb-6">
                        <div className="inline-block p-4 bg-blue-600 text-white rounded-lg shadow-md">
                            <p className="font-medium">示例控股集团有限公司</p>
                            <p className="text-sm text-blue-200">控股股东 • 总资产: 5.8亿</p>
                        </div>
                    </div>

                    {/* 连接线 */}
                    <div className="flex justify-center mb-4">
                        <div className="h-8 w-px bg-gray-400"></div>
                    </div>
                    <div className="flex justify-center mb-4">
                        <div className="bg-gray-400 text-white text-xs px-2 py-1 rounded">持股75%</div>
                    </div>
                    <div className="flex justify-center mb-6">
                        <div className="h-8 w-px bg-gray-400"></div>
                    </div>

                    {/* 中间层 - 本企业 */}
                    <div className="text-center mb-6">
                        <div className="inline-block p-4 bg-green-600 text-white rounded-lg shadow-md">
                            <p className="font-medium">示例科技有限公司</p>
                            <p className="text-sm text-green-200">本企业 • 注册资本: 1000万</p>
                        </div>
                    </div>

                    {/* 下层连接线 */}
                    <div className="flex justify-center mb-4">
                        <div className="h-8 w-px bg-gray-400"></div>
                    </div>
                    <div className="flex justify-center mb-4">
                        <div className="w-96 h-px bg-gray-400"></div>
                    </div>
                    <div className="flex justify-center space-x-48 mb-4">
                        <div className="h-8 w-px bg-gray-400"></div>
                        <div className="h-8 w-px bg-gray-400"></div>
                    </div>

                    {/* 底层 - 子公司 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center">
                            <div className="p-4 bg-purple-100 border-2 border-purple-300 rounded-lg shadow">
                                <p className="font-medium text-purple-900">示例软件技术公司</p>
                                <p className="text-sm text-purple-700">全资子公司</p>
                                <div className="mt-2 space-y-1">
                                    <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">持股100%</span>
                                    <p className="text-xs text-purple-600">注册资本: 500万元</p>
                                    <p className="text-xs text-purple-600">主营: 软件开发</p>
                                    <p className="text-xs text-purple-600">税负率: 12.8%</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="p-4 bg-orange-100 border-2 border-orange-300 rounded-lg shadow">
                                <p className="font-medium text-orange-900">示例信息服务公司</p>
                                <p className="text-sm text-orange-700">控股子公司</p>
                                <div className="mt-2 space-y-1">
                                    <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">持股60%</span>
                                    <p className="text-xs text-orange-600">注册资本: 300万元</p>
                                    <p className="text-xs text-orange-600">主营: 信息服务</p>
                                    <p className="text-xs text-orange-600">税负率: 15.2%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 关联方信息 */}
                    <div className="mt-8 pt-6 border-t-2 border-gray-300">
                        <h5 className="font-medium text-gray-900 mb-4 text-center">关联方企业</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
                                <p className="font-medium text-indigo-900">创新研发中心</p>
                                <p className="text-sm text-indigo-700">同一控制下</p>
                                <p className="text-xs text-indigo-600 mt-1">技术研发合作</p>
                            </div>
                            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-center">
                                <p className="font-medium text-teal-900">销售服务公司</p>
                                <p className="text-sm text-teal-700">关联企业</p>
                                <p className="text-xs text-teal-600 mt-1">销售渠道合作</p>
                            </div>
                            <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg text-center">
                                <p className="font-medium text-pink-900">财务管理中心</p>
                                <p className="text-sm text-pink-700">共享服务</p>
                                <p className="text-xs text-pink-600 mt-1">资金统一管理</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 优化建议方案 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                    股权架构优化建议
                </h3>
                <div className="space-y-6">
                    {schemes.map((scheme) => (
                        <div key={scheme.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-lg mb-2">{scheme.title}</h4>
                                    <p className="text-sm text-gray-600 mb-3">{scheme.description}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${scheme.riskLevel === '低' ? 'bg-green-100 text-green-800' :
                                            scheme.riskLevel === '中' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {scheme.riskLevel}风险
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                                <div className="bg-green-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">预期收益</p>
                                    <p className="font-bold text-green-600">{scheme.roi}</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">实施周期</p>
                                    <p className="font-medium text-blue-600">{scheme.timeline}</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">复杂程度</p>
                                    <p className="font-medium text-purple-600">{scheme.complexity}</p>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">初始投资</p>
                                    <p className="font-medium text-orange-600">{scheme.investment}</p>
                                </div>
                                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500">综合评分</p>
                                    <div className="flex justify-center">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} className={`w-4 h-4 ${star <= Math.round(scheme.score / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                }`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {expandedScheme === scheme.id && (
                                <div className="mt-4 space-y-4 border-t pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h5 className="font-medium text-blue-900 mb-2">实施计划</h5>
                                            <div className="space-y-2">
                                                {scheme.implementationSteps.map((step, index) => (
                                                    <div key={index} className="text-sm">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-medium text-blue-800">阶段 {index + 1}: {step.phase}</span>
                                                            <span className="text-blue-600">{step.duration}</span>
                                                        </div>
                                                        <p className="text-blue-700 text-xs mt-1">
                                                            {step.tasks.join(' • ')}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <h5 className="font-medium text-green-900 mb-2">风险控制</h5>
                                            <div className="space-y-2">
                                                {scheme.risks.map((risk, index) => (
                                                    <div key={index} className="text-sm">
                                                        <p className="font-medium text-green-800">{risk.item}</p>
                                                        <p className="text-green-700 text-xs">应对: {risk.mitigation}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                    onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm flex items-center"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    {expandedScheme === scheme.id ? '收起详情' : '查看详情'}
                                </button>
                                <button
                                    onClick={() => setShowBenefitCalculation(scheme)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center"
                                >
                                    <Calculator className="h-4 w-4 mr-2" />
                                    效益测算
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    实施计划
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 架构分析工具 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-indigo-600" />
                    股权架构分析工具
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <GitBranch className="h-12 w-12 text-purple-500 mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">架构效率分析</h4>
                        <p className="text-sm text-gray-600 mb-4">分析当前股权架构的税务效率和优化空间</p>
                        <div className="text-xs text-gray-500 mb-3">
                            • 控制链分析 • 税负分布 • 治理效率 • 风险评估
                        </div>
                        <button
                            onClick={() => setShowArchitectureAnalysis(true)}
                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            开始分析
                        </button>
                    </div>

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
                </div>
            </div>

            {/* 模态框组件 */}
            {showAnalysisReport && (
                <EquityAnalysisReportModal onClose={() => setShowAnalysisReport(false)} />
            )}

            {showOptimizationGenerator && (
                <OptimizationGeneratorModal onClose={() => setShowOptimizationGenerator(false)} />
            )}

            {showArchitectureAnalysis && (
                <ArchitectureAnalysisModal onClose={() => setShowArchitectureAnalysis(false)} />
            )}

            {showCalculator && (
                <TaxCalculatorModal onClose={() => setShowCalculator(false)} />
            )}

            {showBenefitCalculation && (
                <BenefitCalculationModal
                    scheme={showBenefitCalculation}
                    onClose={() => setShowBenefitCalculation(null)}
                />
            )}
        </div>
    );
};

export default EquityStructure;