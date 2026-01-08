import React from 'react';
import { Trash2, Eye } from 'lucide-react';

const CalculationHistory = ({ calculationHistory, setCalculationHistory }) => {
    const clearHistory = () => {
        if (window.confirm('确定要清空所有历史记录吗？')) {
            setCalculationHistory([]);
            localStorage.removeItem('taxCalculationHistory');
        }
    };

    const deleteRecord = (recordId) => {
        if (window.confirm('确定要删除这条记录吗？')) {
            const newHistory = calculationHistory.filter(r => r.id !== recordId);
            setCalculationHistory(newHistory);
            localStorage.setItem('taxCalculationHistory', JSON.stringify(newHistory));
        }
    };

    const viewDetails = (record) => {
        alert(`计算详情：\n税种：${record.taxType}\n应纳税额：${record.taxAmount.toFixed(2)}万元\n税负率：${record.taxRate.toFixed(2)}%\n计算时间：${record.timestamp}\n\n详细参数：\n${JSON.stringify(record.details, null, 2)}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h4 className="text-xl font-semibold text-gray-900">计算历史记录</h4>
                <button
                    onClick={clearHistory}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    清空历史
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {calculationHistory.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        暂无计算记录
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">计算时间</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">税种</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">应纳税额</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">税负率</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {calculationHistory.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.timestamp}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.taxType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.taxAmount.toFixed(2)}万元
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.taxRate.toFixed(2)}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => viewDetails(record)}
                                                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                            >
                                                <Eye className="h-3 w-3 mr-1" />
                                                详情
                                            </button>
                                            <button
                                                onClick={() => deleteRecord(record.id)}
                                                className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                <Trash2 className="h-3 w-3 mr-1" />
                                                删除
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalculationHistory;