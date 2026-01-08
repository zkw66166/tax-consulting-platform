import React from 'react';
import { XCircle, ExternalLink, CheckCircle } from 'lucide-react';

const PolicyMatcherModal = ({ policies, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-900">政策匹配结果</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <XCircle className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    {policies.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">正在匹配适用政策...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">匹配成功</h4>
                                <p className="text-green-800">为您找到 {policies.length} 项适用的税收优惠政策</p>
                            </div>

                            {policies.map((policy, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-gray-900">{policy.name}</h4>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                            匹配度 {policy.match}%
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{policy.benefit}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-green-600">
                                            <CheckCircle className="h-4 w-4 mr-1" />
                                            <span>预计年节税: 30-50万元</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center">
                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                查看详情
                                            </button>
                                            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50">
                                                申请指导
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PolicyMatcherModal;