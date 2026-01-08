import React, { useState } from 'react';
import { X, Download, FileText, Printer, Share, Calendar, Building2, DollarSign, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Target } from 'lucide-react';
import { generateReportHTML, getReportData } from '../../../report/FinancialDueDiligenceReport';

const DueDiligenceReportModal = ({ onClose }) => {
    const [selectedFormat, setSelectedFormat] = useState('pdf');
    const reportData = getReportData();

    const downloadReport = (format) => {
        const fileName = `财务尽职调查报告_${reportData.companyInfo.name}_${new Date().toISOString().split('T')[0]}`;

        if (format === 'pdf') {
            // 生成HTML内容并以PDF方式下载（通过浏览器打印功能）
            const htmlContent = generateReportHTML(reportData);
            const newWindow = window.open('', '_blank');
            newWindow.document.write(htmlContent);
            newWindow.document.close();

            // 延迟执行打印对话框
            setTimeout(() => {
                newWindow.print();
            }, 1000);

        } else if (format === 'docx') {
            // 生成HTML内容并以Word文档格式下载
            const htmlContent = generateReportHTML(reportData);
            const blob = new Blob([htmlContent], {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.doc`; // 使用.doc扩展名以确保兼容性
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    // 预览功能
    const previewReport = () => {
        const htmlContent = generateReportHTML(reportData);
        const newWindow = window.open('', '_blank');
        newWindow.document.write(htmlContent);
        newWindow.document.close();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-screen overflow-hidden">
                {/* 头部 */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-blue-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">财务尽职调查报告</h2>
                            <p className="text-sm text-gray-600">{reportData.companyInfo.name} - {reportData.reportInfo.reportDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={previewReport}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
                        >
                            <Printer className="h-4 w-4 mr-2" />
                            预览报告
                        </button>
                        <div className="flex items-center space-x-2">
                            <label className="text-sm text-gray-600">格式:</label>
                            <select
                                value={selectedFormat}
                                onChange={(e) => setSelectedFormat(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                <option value="pdf">PDF</option>
                                <option value="docx">Word</option>
                            </select>
                        </div>
                        <button
                            onClick={() => downloadReport(selectedFormat)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            下载报告
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* 内容区域 */}
                <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-6">
                    {/* 报告封面信息 */}
                    <div className="mb-8 text-center border-b pb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">财务尽职调查报告</h1>
                        <div className="grid grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">目标公司信息</h3>
                                <div className="space-y-2 text-sm">
                                    <div><strong>公司名称:</strong> {reportData.companyInfo.name}</div>
                                    <div><strong>统一社会信用代码:</strong> {reportData.companyInfo.registrationNumber}</div>
                                    <div><strong>成立日期:</strong> {reportData.companyInfo.establishedDate}</div>
                                    <div><strong>注册资本:</strong> {reportData.companyInfo.registeredCapital}</div>
                                    <div><strong>法定代表人:</strong> {reportData.companyInfo.legalRepresentative}</div>
                                    <div><strong>所属行业:</strong> {reportData.companyInfo.industry}</div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">报告信息</h3>
                                <div className="space-y-2 text-sm">
                                    <div><strong>报告日期:</strong> {reportData.reportInfo.reportDate}</div>
                                    <div><strong>调查期间:</strong> {reportData.reportInfo.reportPeriod}</div>
                                    <div><strong>审计机构:</strong> {reportData.reportInfo.auditFirm}</div>
                                    <div><strong>项目团队:</strong> {reportData.reportInfo.projectTeam}</div>
                                    <div><strong>报告编号:</strong> {reportData.reportInfo.reportNumber}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 执行摘要 */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Target className="h-6 w-6 mr-2 text-blue-600" />
                            执行摘要
                        </h2>

                        <div className="mb-6 bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-800 leading-relaxed text-justify">
                                本次财务尽职调查围绕科技创新股份有限公司的财务状况、经营业绩、风险识别等关键方面展开深入分析。
                                调查期间为2021年至2023年，通过对公司财务报表、内控制度、业务模式等的全面审查，
                                我们认为该公司整体财务状况良好，具备一定的投资价值。公司近三年营业收入保持稳定增长，
                                年复合增长率达18.5%，盈利能力持续改善，现金流管理规范。同时，公司在客户集中度、
                                应收账款管理等方面存在一定风险，需要在投资决策中予以关注。基于综合分析，
                                我们给予该公司B+的综合评级，建议在满足特定投资条件下进行投资。
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <h3 className="font-semibold text-green-900">综合评级</h3>
                                <p className="text-2xl font-bold text-green-700">{reportData.executiveSummary.overallRating}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <h3 className="font-semibold text-blue-900">投资建议</h3>
                                <p className="text-lg font-bold text-blue-700">{reportData.executiveSummary.investmentRecommendation}</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                                <h3 className="font-semibold text-orange-900">风险等级</h3>
                                <p className="text-lg font-bold text-orange-700">{reportData.executiveSummary.riskLevel}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2" />
                                    主要优势
                                </h3>
                                <ul className="text-sm text-green-800 space-y-2">
                                    {reportData.executiveSummary.keyStrengths.map((strength, index) => (
                                        <li key={index}>• {strength}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                                    <AlertTriangle className="h-5 w-5 mr-2" />
                                    主要风险
                                </h3>
                                <ul className="text-sm text-red-800 space-y-2">
                                    {reportData.executiveSummary.keyRisks.map((risk, index) => (
                                        <li key={index}>• {risk}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-2">估值区间</h3>
                            <p className="text-blue-800">
                                推荐估值: <span className="font-bold">{reportData.executiveSummary.valuationRange.recommended}亿元</span>
                                （区间: {reportData.executiveSummary.valuationRange.low}-{reportData.executiveSummary.valuationRange.high}亿元）
                            </p>
                        </div>
                    </div>

                    {/* 财务概况 */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                            财务概况
                        </h2>

                        <div className="mb-6 bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-800 leading-relaxed text-justify">
                                公司近三年财务表现稳健向好。营业收入从2021年的2.85亿元增长至2023年的3.80亿元，
                                年复合增长率达18.5%，显著高于行业平均水平。净利润保持稳定增长，利润率维持在11.8%的较高水平。
                                总资产规模持续扩大，从2021年的4.2亿元增至2023年的5.6亿元，资产结构合理。
                                负债水平控制良好，资产负债率为35.7%，财务杠杆运用适度。现金流管理规范，
                                经营性现金流与净利润匹配度良好，为公司持续发展提供了有力支撑。
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border">
                                <h4 className="font-semibold text-gray-900 mb-4">营业收入趋势（亿元）</h4>
                                <div className="space-y-3">
                                    {reportData.financialHighlights.revenue.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="font-medium">{item.year}年</span>
                                            <div className="text-right">
                                                <div className="font-bold text-blue-600">{item.value}亿元</div>
                                                {item.growth && (
                                                    <div className="text-sm text-green-600">+{item.growth}%</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border">
                                <h4 className="font-semibold text-gray-900 mb-4">净利润情况（亿元）</h4>
                                <div className="space-y-3">
                                    {reportData.financialHighlights.netProfit.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="font-medium">{item.year}年</span>
                                            <div className="text-right">
                                                <div className="font-bold text-green-600">{item.value}亿元</div>
                                                <div className="text-sm text-gray-600">利润率 {item.margin}%</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 风险评估 */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <AlertTriangle className="h-6 w-6 mr-2 text-orange-600" />
                            风险评估
                        </h2>

                        <div className="mb-6 bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-800 leading-relaxed text-justify">
                                综合风险评估显示，公司整体风险水平可控，综合风险评分为7.8分（满分10分）。
                                信用风险较低，客户质量良好，应收账款总体可控。流动性风险适中，虽然流动资产充足，
                                但短期债务存在一定压力。经营风险处于中等水平，业务模式相对稳定，但面临行业竞争加剧的挑战。
                                合规风险总体可控，内控制度基本完善，但在关联交易管理等方面还需进一步加强。
                                建议投资者重点关注客户集中度、应收账款回收、行业竞争等关键风险因素。
                            </p>
                        </div>

                        <div className="text-center mb-6">
                            <div className="inline-block bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                                <h3 className="font-semibold text-orange-900 mb-2">综合风险评分</h3>
                                <div className="text-4xl font-bold text-orange-600">{reportData.riskAssessment.overallScore}/10</div>
                                <p className="text-sm text-orange-700 mt-2">基于多维度风险因素综合评估</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {reportData.riskAssessment.categories.map((category, index) => (
                                <div key={index} className={`p-4 rounded-lg ${category.level === '低' ? 'bg-green-50 border-green-200' :
                                        category.level === '中' ? 'bg-yellow-50 border-yellow-200' :
                                            'bg-red-50 border-red-200'
                                    } border-2`}>
                                    <h4 className={`font-semibold mb-2 ${category.level === '低' ? 'text-green-900' :
                                            category.level === '中' ? 'text-yellow-900' :
                                                'text-red-900'
                                        }`}>
                                        {category.name} - {category.score}分 ({category.level}风险)
                                    </h4>
                                    <p className={`text-sm ${category.level === '低' ? 'text-green-800' :
                                            category.level === '中' ? 'text-yellow-800' :
                                                'text-red-800'
                                        }`}>
                                        {category.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 投资建议 */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                            投资建议
                        </h2>

                        <div className="mb-6 bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-800 leading-relaxed text-justify">
                                {reportData.recommendations.investment}公司在技术实力、客户基础、财务表现等方面展现出良好的基础，
                                具备持续发展的潜力。但同时需要关注客户集中度、应收账款管理、行业竞争等风险因素。
                                建议投资者在充分评估风险的基础上，制定相应的风险控制措施，
                                并与公司管理层就关键投资条件进行深入沟通，确保投资的安全性和收益性。
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-3">投资前置条件</h3>
                                <ul className="text-sm text-blue-800 space-y-2">
                                    {reportData.recommendations.conditions.map((condition, index) => (
                                        <li key={index}>• {condition}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="font-semibold text-green-900 mb-3">后续步骤</h3>
                                <ul className="text-sm text-green-800 space-y-2">
                                    {reportData.recommendations.nextSteps.map((step, index) => (
                                        <li key={index}>• {step}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 bg-purple-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-purple-900 mb-3">估值建议</h3>
                            <p className="text-purple-800 text-sm leading-relaxed">
                                {reportData.recommendations.valuationSuggestion}
                            </p>
                        </div>
                    </div>

                    {/* 使用说明 */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-900 mb-2">使用说明</h3>
                        <p className="text-sm text-blue-800">
                            点击"预览报告"可查看包含六大分析模块的完整专业报告，支持PDF和Word格式下载。
                            完整报告包含历史财务表现、资产质量、负债评估、现金流、财务管理体系、盈利预测等详细分析内容。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DueDiligenceReportModal;