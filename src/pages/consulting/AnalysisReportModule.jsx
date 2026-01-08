import React, { useState } from 'react';
import {
    Play,
    Sliders,
    Info,
    Search,
    Filter,
    Calendar,
    Clock,
    Download,
    Eye,
    Share2,
    Edit,
    Trash2,
    User,
    Mail,
    MessageSquare,
    Smartphone,
    Settings,
    X
} from 'lucide-react';

const AnalysisReportModule = ({
    analysisPurpose,
    analysisPurposes,
    generateAutoReport,
    showReportSettingsModal,
    setShowReportSettingsModal,
    reportSettings,
    setReportSettings
}) => {
    const [selectedReports, setSelectedReports] = useState([]);

    // 根据分析目的获取报告模板配置
    const getReportTemplatesByPurpose = (purpose) => {
        const purposeSpecificTemplates = {
            investment: [
                {
                    id: 1,
                    name: '投资价值评估报告',
                    description: '基于DCF模型和相对估值的投资建议',
                    category: '投资专项',
                    frequency: '按需',
                    lastGenerated: '2024-07-25',
                    sections: ['估值分析', '成长性评估', '风险分析', '投资建议'],
                    estimatedTime: '12分钟',
                    format: ['PDF', 'PPT']
                },
                {
                    id: 2,
                    name: '股东回报分析报告',
                    description: 'ROE分解、股息政策和价值创造分析',
                    category: '投资专项',
                    frequency: '每季度',
                    lastGenerated: '2024-07-20',
                    sections: ['ROE分析', '股息分析', '价值创造', '同业对比'],
                    estimatedTime: '10分钟',
                    format: ['PDF', 'Excel']
                },
                {
                    id: 3,
                    name: '现金流量分析报告',
                    description: '现金流趋势和流动性风险分析',
                    category: '专项报告',
                    frequency: '按需',
                    lastGenerated: '2024-07-28',
                    sections: ['现金流概况', '流入分析', '流出分析', '风险预警'],
                    estimatedTime: '6分钟',
                    format: ['PDF', 'Excel']
                }
            ],
            credit: [
                {
                    id: 1,
                    name: '信用风险评估报告',
                    description: '偿债能力分析和信用评级建议',
                    category: '信贷专项',
                    frequency: '按需',
                    lastGenerated: '2024-07-25',
                    sections: ['偿债能力', '担保分析', '现金流预测', '信用评级'],
                    estimatedTime: '15分钟',
                    format: ['PDF', 'Word']
                },
                {
                    id: 2,
                    name: '贷后监控报告',
                    description: '持续监控借款人财务状况和风险变化',
                    category: '信贷专项',
                    frequency: '每月',
                    lastGenerated: '2024-07-29',
                    sections: ['财务监控', '合规检查', '风险预警', '建议措施'],
                    estimatedTime: '8分钟',
                    format: ['PDF', 'Excel']
                },
                {
                    id: 3,
                    name: '现金流量分析报告',
                    description: '现金流趋势和流动性风险分析',
                    category: '专项报告',
                    frequency: '按需',
                    lastGenerated: '2024-07-28',
                    sections: ['现金流概况', '流入分析', '流出分析', '风险预警'],
                    estimatedTime: '6分钟',
                    format: ['PDF', 'Excel']
                }
            ],
            management: [
                {
                    id: 1,
                    name: '月度财务分析报告',
                    description: '包含收入、成本、利润的全面月度分析',
                    category: '定期报告',
                    frequency: '每月',
                    lastGenerated: '2024-07-30',
                    sections: ['收入分析', '成本分析', '利润分析', '现金流分析'],
                    estimatedTime: '5分钟',
                    format: ['PDF', 'Excel', 'PPT']
                },
                {
                    id: 2,
                    name: '季度经营分析报告',
                    description: '深度经营指标分析和业绩回顾',
                    category: '定期报告',
                    frequency: '每季度',
                    lastGenerated: '2024-06-30',
                    sections: ['经营概况', '财务指标', '市场分析', '风险评估'],
                    estimatedTime: '8分钟',
                    format: ['PDF', 'PPT']
                },
                {
                    id: 3,
                    name: '预算执行分析报告',
                    description: '预算与实际对比分析和偏差原因',
                    category: '管理专项',
                    frequency: '每月',
                    lastGenerated: '2024-07-30',
                    sections: ['预算对比', '偏差分析', '原因解释', '改进建议'],
                    estimatedTime: '7分钟',
                    format: ['Excel', 'PPT']
                },
                {
                    id: 4,
                    name: '营运效率分析报告',
                    description: '资产周转率和运营流程效率分析',
                    category: '管理专项',
                    frequency: '每季度',
                    lastGenerated: '2024-07-15',
                    sections: ['周转率分析', '流程效率', '对标分析', '优化建议'],
                    estimatedTime: '10分钟',
                    format: ['PDF', 'Excel', 'PPT']
                },
                {
                    id: 5,
                    name: '现金流量分析报告',
                    description: '现金流趋势和流动性风险分析',
                    category: '专项报告',
                    frequency: '按需',
                    lastGenerated: '2024-07-28',
                    sections: ['现金流概况', '流入分析', '流出分析', '风险预警'],
                    estimatedTime: '6分钟',
                    format: ['PDF', 'Excel']
                }
            ],
            merger: [
                {
                    id: 1,
                    name: '财务尽调报告',
                    description: '目标公司财务状况深度调查分析',
                    category: '并购专项',
                    frequency: '按需',
                    lastGenerated: '2024-07-20',
                    sections: ['财务核查', '风险识别', '价值评估', '交易建议'],
                    estimatedTime: '20分钟',
                    format: ['PDF', 'Word']
                },
                {
                    id: 2,
                    name: '协同效应分析报告',
                    description: '并购后协同效应预测和实现路径',
                    category: '并购专项',
                    frequency: '按需',
                    lastGenerated: '2024-07-18',
                    sections: ['收入协同', '成本协同', '财务协同', '实施计划'],
                    estimatedTime: '15分钟',
                    format: ['PDF', 'PPT']
                },
                {
                    id: 3,
                    name: '现金流量分析报告',
                    description: '现金流趋势和流动性风险分析',
                    category: '专项报告',
                    frequency: '按需',
                    lastGenerated: '2024-07-28',
                    sections: ['现金流概况', '流入分析', '流出分析', '风险预警'],
                    estimatedTime: '6分钟',
                    format: ['PDF', 'Excel']
                }
            ]
        };

        return purposeSpecificTemplates[purpose] || [];
    };

    // 报告历史数据
    const reportHistory = [
        {
            id: 1,
            name: '2024年7月月度财务分析报告',
            type: '月度财务分析报告',
            generatedBy: '张三',
            generatedTime: '2024-07-30 10:30:00',
            status: 'completed',
            format: 'PDF',
            size: '2.5MB',
            downloads: 15,
            shares: 3
        },
        {
            id: 2,
            name: 'Q2季度经营分析报告',
            type: '季度经营分析报告',
            generatedBy: '李四',
            generatedTime: '2024-07-29 15:45:00',
            status: 'generating',
            format: 'PPT',
            size: '—',
            downloads: 0,
            shares: 0
        }
    ];

    const getColorClasses = (color) => {
        const colorMap = {
            green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
            blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
            purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', button: 'bg-purple-600 hover:bg-purple-700' },
            orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', button: 'bg-orange-600 hover:bg-orange-700' }
        };
        return colorMap[color] || colorMap.blue;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'generating': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return '已完成';
            case 'generating': return '生成中';
            case 'failed': return '失败';
            default: return '未知';
        }
    };

    const handleSelectReport = (reportId) => {
        setSelectedReports(prev =>
            prev.includes(reportId)
                ? prev.filter(id => id !== reportId)
                : [...prev, reportId]
        );
    };

    return (
        <div className="space-y-8">
            {/* 操作按钮 */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-600">
                        基于{analysisPurposes[analysisPurpose].name}的智能化报告生成和管理平台
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={generateAutoReport}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        一键自动生成
                    </button>
                    <button
                        onClick={() => setShowReportSettingsModal(true)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Sliders className="w-4 h-4 mr-2" />
                        报告配置
                    </button>
                </div>
            </div>

            {/* 目的特定提示 */}
            <div className={`${getColorClasses(analysisPurposes[analysisPurpose].color).bg} border ${getColorClasses(analysisPurposes[analysisPurpose].color).border} rounded-lg p-4`}>
                <div className="flex items-center">
                    <Info className={`w-5 h-5 ${getColorClasses(analysisPurposes[analysisPurpose].color).text} mr-2`} />
                    <div>
                        <p className={`${getColorClasses(analysisPurposes[analysisPurpose].color).text} font-medium`}>
                            当前报告类型：{analysisPurposes[analysisPurpose].name}专用报告
                        </p>
                        <p className="text-gray-700 text-sm">
                            报告内容和格式已针对{analysisPurposes[analysisPurpose].description}进行优化
                        </p>
                    </div>
                </div>
            </div>

            {/* 报告模板 - 根据目的调整 */}
            <div className="space-y-6">
                {/* 筛选和搜索 */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={`搜索${analysisPurposes[analysisPurpose].name}报告模板...`}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <select className="border border-gray-300 rounded-lg px-3 py-2">
                                <option>全部分类</option>
                                <option>定期报告</option>
                                <option>专项报告</option>
                                <option>{analysisPurpose === 'investment' ? '投资专项' :
                                    analysisPurpose === 'credit' ? '信贷专项' :
                                        analysisPurpose === 'management' ? '管理专项' : '并购专项'}</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Filter className="w-4 h-4 mr-2" />
                                筛选
                            </button>
                        </div>
                    </div>
                </div>

                {/* 模板列表 - 根据目的显示不同模板 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getReportTemplatesByPurpose(analysisPurpose).map((template) => (
                        <div key={template.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {template.frequency}
                                            </span>
                                            <span className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {template.estimatedTime}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${template.category.includes('专项')
                                        ? `${getColorClasses(analysisPurposes[analysisPurpose].color).bg} ${getColorClasses(analysisPurposes[analysisPurpose].color).text}`
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {template.category}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">包含内容：</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {template.sections.map((section, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                {section}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">支持格式：</h4>
                                    <div className="flex space-x-2">
                                        {template.format.map((format, index) => (
                                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                                {format}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 mb-4">
                                    最后生成：{template.lastGenerated}
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm"
                                        onClick={() => {
                                            if (template.category.includes('专项')) {
                                                generateAutoReport();
                                            } else {
                                                generateAutoReport();
                                            }
                                        }}
                                    >
                                        立即生成
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 报告历史 */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">报告历史</h3>

                {/* 操作工具栏 */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="搜索报告..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <select className="border border-gray-300 rounded-lg px-3 py-2">
                                <option>全部状态</option>
                                <option>已完成</option>
                                <option>生成中</option>
                                <option>失败</option>
                            </select>
                            <select className="border border-gray-300 rounded-lg px-3 py-2">
                                <option>最近7天</option>
                                <option>最近30天</option>
                                <option>最近3个月</option>
                                <option>全部时间</option>
                            </select>
                        </div>
                        {selectedReports.length > 0 && (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">已选择 {selectedReports.length} 项</span>
                                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                    批量下载
                                </button>
                                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                                    批量删除
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 报告列表 */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedReports(reportHistory.map(r => r.id));
                                                } else {
                                                    setSelectedReports([]);
                                                }
                                            }}
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        报告名称
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        生成者
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        生成时间
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        状态
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        格式/大小
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        统计
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reportHistory.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={selectedReports.includes(report.id)}
                                                onChange={() => handleSelectReport(report.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{report.name}</div>
                                                <div className="text-sm text-gray-500">{report.type}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                    <User className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div className="text-sm text-gray-900">{report.generatedBy}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {report.generatedTime}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                                {getStatusText(report.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div>{report.format}</div>
                                            <div className="text-xs text-gray-500">{report.size}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div>下载: {report.downloads}次</div>
                                            <div className="text-xs text-gray-500">分享: {report.shares}次</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {report.status === 'completed' && (
                                                    <>
                                                        <button className="text-blue-600 hover:text-blue-900">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-green-600 hover:text-green-900">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button className="text-purple-600 hover:text-purple-900">
                                                            <Share2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="text-gray-600 hover:text-gray-900">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 分发管理 */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">分发管理</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 分发渠道配置 */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h4 className="text-lg font-semibold mb-4">分发渠道配置</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                                    <div>
                                        <p className="font-medium">邮件分发</p>
                                        <p className="text-sm text-gray-600">自动发送到指定邮箱</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">已启用</span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center">
                                    <MessageSquare className="w-5 h-5 text-green-600 mr-3" />
                                    <div>
                                        <p className="font-medium">企业微信</p>
                                        <p className="text-sm text-gray-600">推送到企业微信群</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">已启用</span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                                <div className="flex items-center">
                                    <Smartphone className="w-5 h-5 text-orange-600 mr-3" />
                                    <div>
                                        <p className="font-medium">短信通知</p>
                                        <p className="text-sm text-gray-600">重要报告短信提醒</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">未启用</span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 订阅管理 */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h4 className="text-lg font-semibold mb-4">订阅管理</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-medium">张三 (CEO)</p>
                                    <p className="text-sm text-gray-600">zhang.san@company.com</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    订阅3个报告
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-medium">李四 (CFO)</p>
                                    <p className="text-sm text-gray-600">li.si@company.com</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    订阅5个报告
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-medium">王五 (财务总监)</p>
                                    <p className="text-sm text-gray-600">wang.wu@company.com</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    订阅2个报告
                                </div>
                            </div>

                            <button className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50">
                                + 添加订阅用户
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 报告配置模态框 */}
            {showReportSettingsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">报告配置与自定义设置</h2>
                            <button
                                onClick={() => setShowReportSettingsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* 通用设置 */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">通用设置</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={reportSettings.general.companyName}
                                            onChange={(e) => setReportSettings({
                                                ...reportSettings,
                                                general: { ...reportSettings.general, companyName: e.target.value }
                                            })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">报告周期</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={reportSettings.general.reportPeriod}
                                            onChange={(e) => setReportSettings({
                                                ...reportSettings,
                                                general: { ...reportSettings.general, reportPeriod: e.target.value }
                                            })}
                                        >
                                            <option value="week">周报</option>
                                            <option value="month">月报</option>
                                            <option value="quarter">季报</option>
                                            <option value="year">年报</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">币种</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={reportSettings.general.currency}
                                            onChange={(e) => setReportSettings({
                                                ...reportSettings,
                                                general: { ...reportSettings.general, currency: e.target.value }
                                            })}
                                        >
                                            <option value="CNY">人民币 (CNY)</option>
                                            <option value="USD">美元 (USD)</option>
                                            <option value="EUR">欧元 (EUR)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">语言</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={reportSettings.general.language}
                                            onChange={(e) => setReportSettings({
                                                ...reportSettings,
                                                general: { ...reportSettings.general, language: e.target.value }
                                            })}
                                        >
                                            <option value="zh-CN">中文</option>
                                            <option value="en-US">English</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* 内容设置 */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">内容设置</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">包含图表</label>
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={reportSettings.content.includeCharts}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    content: { ...reportSettings.content, includeCharts: e.target.checked }
                                                })}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">包含对比分析</label>
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={reportSettings.content.includeComparison}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    content: { ...reportSettings.content, includeComparison: e.target.checked }
                                                })}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">包含预测分析</label>
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={reportSettings.content.includeForecasting}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    content: { ...reportSettings.content, includeForecasting: e.target.checked }
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">详细程度</label>
                                            <select
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                value={reportSettings.content.detailLevel}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    content: { ...reportSettings.content, detailLevel: e.target.value }
                                                })}
                                            >
                                                <option value="basic">基础</option>
                                                <option value="standard">标准</option>
                                                <option value="detailed">详细</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">分析深度</label>
                                            <select
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                value={reportSettings.content.analysisDepth}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    content: { ...reportSettings.content, analysisDepth: e.target.value }
                                                })}
                                            >
                                                <option value="simple">简单</option>
                                                <option value="standard">标准</option>
                                                <option value="comprehensive">全面</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 格式设置 */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">格式设置</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">输出格式</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={reportSettings.format.outputFormat}
                                            onChange={(e) => setReportSettings({
                                                ...reportSettings,
                                                format: { ...reportSettings.format, outputFormat: e.target.value }
                                            })}
                                        >
                                            <option value="PDF">PDF</option>
                                            <option value="Word">Word</option>
                                            <option value="Excel">Excel</option>
                                            <option value="PPT">PowerPoint</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">页面大小</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={reportSettings.format.pageSize}
                                            onChange={(e) => setReportSettings({
                                                ...reportSettings,
                                                format: { ...reportSettings.format, pageSize: e.target.value }
                                            })}
                                        >
                                            <option value="A4">A4</option>
                                            <option value="A3">A3</option>
                                            <option value="Letter">Letter</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">页面方向</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={reportSettings.format.orientation}
                                            onChange={(e) => setReportSettings({
                                                ...reportSettings,
                                                format: { ...reportSettings.format, orientation: e.target.value }
                                            })}
                                        >
                                            <option value="portrait">纵向</option>
                                            <option value="landscape">横向</option>
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">包含水印</label>
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={reportSettings.format.includeWatermark}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    format: { ...reportSettings.format, includeWatermark: e.target.checked }
                                                })}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">包含封面页</label>
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={reportSettings.format.includeCoverPage}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    format: { ...reportSettings.format, includeCoverPage: e.target.checked }
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 分发设置 */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">分发设置</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">自动发送</label>
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={reportSettings.distribution.autoSend}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    distribution: { ...reportSettings.distribution, autoSend: e.target.checked }
                                                })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">发送时间</label>
                                            <input
                                                type="time"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                value={reportSettings.distribution.sendTime}
                                                onChange={(e) => setReportSettings({
                                                    ...reportSettings,
                                                    distribution: { ...reportSettings.distribution, sendTime: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">发送频率</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={reportSettings.distribution.sendFrequency}
                                            onChange={(e) => setReportSettings({
                                                ...reportSettings,
                                                distribution: { ...reportSettings.distribution, sendFrequency: e.target.value }
                                            })}
                                        >
                                            <option value="manual">手动</option>
                                            <option value="daily">每日</option>
                                            <option value="weekly">每周</option>
                                            <option value="monthly">每月</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* 目的特定设置 */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    {analysisPurposes[analysisPurpose].name}专用设置
                                </h3>

                                {analysisPurpose === 'investment' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700">包含估值分析</label>
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300"
                                                    checked={reportSettings.purposeSpecific.investment.includeValuation}
                                                    onChange={(e) => setReportSettings({
                                                        ...reportSettings,
                                                        purposeSpecific: {
                                                            ...reportSettings.purposeSpecific,
                                                            investment: { ...reportSettings.purposeSpecific.investment, includeValuation: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700">包含同业对比</label>
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300"
                                                    checked={reportSettings.purposeSpecific.investment.includePeerComparison}
                                                    onChange={(e) => setReportSettings({
                                                        ...reportSettings,
                                                        purposeSpecific: {
                                                            ...reportSettings.purposeSpecific,
                                                            investment: { ...reportSettings.purposeSpecific.investment, includePeerComparison: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700">重点关注成长性</label>
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300"
                                                    checked={reportSettings.purposeSpecific.investment.focusOnGrowth}
                                                    onChange={(e) => setReportSettings({
                                                        ...reportSettings,
                                                        purposeSpecific: {
                                                            ...reportSettings.purposeSpecific,
                                                            investment: { ...reportSettings.purposeSpecific.investment, focusOnGrowth: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700">包含ESG因素</label>
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300"
                                                    checked={reportSettings.purposeSpecific.investment.includeESGFactors}
                                                    onChange={(e) => setReportSettings({
                                                        ...reportSettings,
                                                        purposeSpecific: {
                                                            ...reportSettings.purposeSpecific,
                                                            investment: { ...reportSettings.purposeSpecific.investment, includeESGFactors: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {analysisPurpose === 'credit' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700">包含风险评级</label>
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300"
                                                    checked={reportSettings.purposeSpecific.credit.includeRiskRating}
                                                    onChange={(e) => setReportSettings({
                                                        ...reportSettings,
                                                        purposeSpecific: {
                                                            ...reportSettings.purposeSpecific,
                                                            credit: { ...reportSettings.purposeSpecific.credit, includeRiskRating: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700">包含担保分析</label>
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300"
                                                    checked={reportSettings.purposeSpecific.credit.includeCollateralAnalysis}
                                                    onChange={(e) => setReportSettings({
                                                        ...reportSettings,
                                                        purposeSpecific: {
                                                            ...reportSettings.purposeSpecific,
                                                            credit: { ...reportSettings.purposeSpecific.credit, includeCollateralAnalysis: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-gray-700">包含合约跟踪</label>
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300"
                                                    checked={reportSettings.purposeSpecific.credit.includeCovenantTracking}
                                                    onChange={(e) => setReportSettings({
                                                        ...reportSettings,
                                                        purposeSpecific: {
                                                            ...reportSettings.purposeSpecific,
                                                            credit: { ...reportSettings.purposeSpecific.credit, includeCovenantTracking: e.target.checked }
                                                        }
                                                    })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">压力测试情景数</label>
                                                <select
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                    value={reportSettings.purposeSpecific.credit.stressTestScenarios}
                                                    onChange={(e) => setReportSettings({
                                                        ...reportSettings,
                                                        purposeSpecific: {
                                                            ...reportSettings.purposeSpecific,
                                                            credit: { ...reportSettings.purposeSpecific.credit, stressTestScenarios: parseInt(e.target.value) }
                                                        }
                                                    })}
                                                >
                                                    <option value={1}>1个</option>
                                                    <option value={3}>3个</option>
                                                    <option value={5}>5个</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 其他目的的特定设置可以在这里添加 */}
                            </div>

                            {/* 保存按钮 */}
                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <button
                                    onClick={() => setShowReportSettingsModal(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    取消
                                </button>
                                <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                                    保存为模板
                                </button>
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    保存并应用
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisReportModule;
                                                   