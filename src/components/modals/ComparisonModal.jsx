import React from 'react';
import { XCircle, Download, Star } from 'lucide-react';

const ComparisonModal = ({ schemes, onClose }) => {
    const mockSchemes = [
        { name: '高新技术企业认定', saving: 72, roi: '360%', risk: '低', timeline: '6个月' },
        { name: '研发费用加计扣除', saving: 32, roi: '1280%', risk: '低', timeline: '1个月' },
        { name: '组织架构优化', saving: 48, roi: '285%', risk: '中', timeline: '3个月' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-900">方案对比分析</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <XCircle className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">方案名称</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">年节税（万元）</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">投资回报率</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">风险等级</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">实施周期</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">推荐度</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {mockSchemes.map((scheme, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{scheme.name}</td>
                                        <td className="px-4 py-4 text-sm text-green-600 font-semibold">{scheme.saving}</td>
                                        <td className="px-4 py-4 text-sm text-blue-600 font-semibold">{scheme.roi}</td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${scheme.risk === '低' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {scheme.risk}风险
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">{scheme.timeline}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                        }`} />
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">分析结论</h4>
                        <p className="text-blue-800">建议优先实施"研发费用加计扣除"方案，具有最高的投资回报率和最低的实施风险。</p>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        关闭
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        导出对比
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComparisonModal;