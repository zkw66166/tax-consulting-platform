import React, { useState } from 'react';
import { FileText, Plus, Settings, Download, Filter, Archive, Play, Eye, Trash2, Mail, Users, Star, XCircle, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

const Reports = () => {
    const [reportSettings, setReportSettings] = useState({
        autoEmail: true,
        watermark: true,
        versionControl: true
    });

    const [emailList, setEmailList] = useState([
        'finance@company.com',
        'ceo@company.com',
        'tax@company.com'
    ]);

    const [newEmail, setNewEmail] = useState('');

    const addEmail = () => {
        if (newEmail && !emailList.includes(newEmail)) {
            setEmailList([...emailList, newEmail]);
            setNewEmail('');
        }
    };

    const removeEmail = (email) => {
        setEmailList(emailList.filter(e => e !== email));
    };

    const generateReport = (type) => {
        console.log(`生成${type}报告`);
        // 这里可以添加实际的报告生成逻辑
    };

    return (
        <div className="space-y-6">
            {/* 报告生成控制面板 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FileText className="h-6 w-6 mr-2 text-blue-600" />
                        智能报告生成中心
                    </h3>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            新建报告
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            报告模板
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                                <AlertTriangle className="h-8 w-8 text-red-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">税务风险检测报告</h4>
                            <p className="text-sm text-gray-600 mb-4">全面分析企业税务风险状况，提供专业整改建议</p>
                            <div className="text-xs text-gray-500 mb-4">
                                <p>• 风险识别与评估</p>
                                <p>• 合规性检查</p>
                                <p>• 整改建议方案</p>
                                <p>• 预警机制设置</p>
                            </div>
                            <button
                                onClick={() => generateReport('税务风险检测')}
                                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                生成报告 (预计3分钟)
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                                <TrendingUp className="h-8 w-8 text-green-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">税务筹划报告</h4>
                            <p className="text-sm text-gray-600 mb-4">详细的筹划方案和效果分析，助力企业税负优化</p>
                            <div className="text-xs text-gray-500 mb-4">
                                <p>• 筹划方案设计</p>
                                <p>• 节税效果预测</p>
                                <p>• 实施风险评估</p>
                                <p>• ROI收益分析</p>
                            </div>
                            <button
                                onClick={() => generateReport('税务筹划')}
                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                生成报告 (预计5分钟)
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                <BarChart3 className="h-8 w-8 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">财务分析报告</h4>
                            <p className="text-sm text-gray-600 mb-4">企业财务指标深度分析，支撑经营决策</p>
                            <div className="text-xs text-gray-500 mb-4">
                                <p>• 财务比率分析</p>
                                <p>• 盈利能力评估</p>
                                <p>• 现金流分析</p>
                                <p>• 行业对比研究</p>
                            </div>
                            <button
                                onClick={() => generateReport('财务分析')}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                生成报告 (预计4分钟)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 报告历史列表 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Archive className="h-5 w-5 mr-2 text-purple-600" />
                        报告历史档案
                    </h3>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            筛选
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            批量下载
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">报告名称</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">报告类型</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">生成时间</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">数据期间</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                {
                                    name: '2024年度综合税务风险检测报告',
                                    type: '风险检测',
                                    time: '2024-12-15 14:30',
                                    period: '2024年1-12月',
                                    status: '已完成',
                                    pages: 45,
                                    size: '2.3MB'
                                },
                                {
                                    name: '高新技术企业认定筹划方案报告',
                                    type: '税务筹划',
                                    time: '2024-12-14 10:15',
                                    period: '2024年全年',
                                    status: '已完成',
                                    pages: 32,
                                    size: '1.8MB'
                                },
                                {
                                    name: '第四季度财务指标分析报告',
                                    type: '财务分析',
                                    time: '2024-12-13 16:45',
                                    period: '2024年10-12月',
                                    status: '生成中',
                                    pages: 0,
                                    size: '0MB'
                                },
                                {
                                    name: '增值税专项筹划效果评估报告',
                                    type: '税务筹划',
                                    time: '2024-12-12 09:20',
                                    period: '2024年7-11月',
                                    status: '已完成',
                                    pages: 28,
                                    size: '1.5MB'
                                }
                            ].map((report, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{report.name}</p>
                                            <p className="text-xs text-gray-500">{report.pages}页 • {report.size}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${report.type === '风险检测' ? 'bg-red-100 text-red-800' :
                                                report.type === '税务筹划' ? 'bg-green-100 text-green-800' :
                                                    'bg-blue-100 text-blue-800'
                                            }`}>
                                            {report.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{report.time}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{report.period}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${report.status === '已完成' ? 'bg-green-100 text-green-800' :
                                                report.status === '生成中' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800" title="预览">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="text-green-600 hover:text-green-800" title="下载">
                                                <Download className="h-4 w-4" />
                                            </button>
                                            <button className="text-purple-600 hover:text-purple-800" title="分享">
                                                <Mail className="h-4 w-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" title="删除">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 报告模板管理 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-orange-600" />
                        报告模板库
                    </h3>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        自定义模板
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            name: '标准税务风险检测模板',
                            description: '包含全面的税务风险评估指标体系，适用于一般企业',
                            usage: 145,
                            lastUpdate: '2024-12-10',
                            category: '风险检测',
                            rating: 4.8
                        },
                        {
                            name: '制造业税务筹划模板',
                            description: '专门为制造业企业设计的税务筹划报告模板',
                            usage: 89,
                            lastUpdate: '2024-12-08',
                            category: '税务筹划',
                            rating: 4.9
                        },
                        {
                            name: '中小企业财务分析模板',
                            description: '简化版财务分析模板，适合中小企业使用',
                            usage: 156,
                            lastUpdate: '2024-12-05',
                            category: '财务分析',
                            rating: 4.7
                        },
                        {
                            name: '高新技术企业专用模板',
                            description: '针对高新技术企业特点设计的专业模板',
                            usage: 67,
                            lastUpdate: '2024-12-03',
                            category: '税务筹划',
                            rating: 4.6
                        },
                        {
                            name: '年度汇算清缴报告模板',
                            description: '企业所得税年度汇算清缴专用报告模板',
                            usage: 234,
                            lastUpdate: '2024-11-28',
                            category: '风险检测',
                            rating: 4.9
                        },
                        {
                            name: '更多监控分析模板',
                            description: '适用于日常监控和分析',
                            usage: 98,
                            lastUpdate: '2024-11-25',
                            category: '风险检测、税务筹划、财务分析',
                            rating: 4.5
                        }
                    ].map((template, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${template.category === '风险检测' ? 'bg-red-100 text-red-800' :
                                            template.category === '税务筹划' ? 'bg-green-100 text-green-800' :
                                                'bg-blue-100 text-blue-800'
                                        }`}>
                                        {template.category}
                                    </span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Settings className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span>{template.usage}次使用</span>
                                </div>
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                    <span>{template.rating}</span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mb-4">最后更新: {template.lastUpdate}</p>

                            <div className="flex space-x-2">
                                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center justify-center">
                                    <Play className="h-3 w-3 mr-1" />
                                    使用模板
                                </button>
                                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    预览
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 报告分享和协作 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-green-600" />
                    协作与分享设置
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h4 className="font-medium text-gray-900">自动邮件通知</h4>
                                <p className="text-sm text-gray-600">报告生成完成后自动发送邮件通知相关人员</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={reportSettings.autoEmail}
                                    onChange={(e) => setReportSettings({ ...reportSettings, autoEmail: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h4 className="font-medium text-gray-900">数字水印保护</h4>
                                <p className="text-sm text-gray-600">在报告中添加企业专属水印，防止泄露</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={reportSettings.watermark}
                                    onChange={(e) => setReportSettings({ ...reportSettings, watermark: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h4 className="font-medium text-gray-900">版本控制</h4>
                                <p className="text-sm text-gray-600">自动保存报告版本，支持历史版本对比</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={reportSettings.versionControl}
                                    onChange={(e) => setReportSettings({ ...reportSettings, versionControl: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">通知接收人列表</h4>
                        <div className="space-y-2 mb-4">
                            {emailList.map((email, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div className="flex items-center">
                                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                                        <span className="text-sm">{email}</span>
                                    </div>
                                    <button
                                        onClick={() => removeEmail(email)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <XCircle className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="添加邮箱地址"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            <button
                                onClick={addEmail}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                            >
                                添加
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;