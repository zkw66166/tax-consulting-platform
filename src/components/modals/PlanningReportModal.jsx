import React from 'react';
import { XCircle, Download, CheckCircle } from 'lucide-react';

const PlanningReportModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-900">税务合规筹划报告</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <XCircle className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">报告摘要</h4>
                            <p className="text-blue-800">基于AI智能分析，为示例科技有限公司制定的税务合规筹划方案，预计年节税152.5万元，节税比例达65.2%。</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-green-600">152.5万</p>
                                <p className="text-sm text-gray-600">预计年节税</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-blue-600">65.2%</p>
                                <p className="text-sm text-gray-600">节税比例</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg text-center">
                                <p className="text-2xl font-bold text-purple-600">3个</p>
                                <p className="text-sm text-gray-600">推荐方案</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">主要筹划建议</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-700">申请高新技术企业认定，享受15%优惠税率</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-700">充分利用研发费用200%加计扣除政策</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-700">优化组织架构，降低整体税负</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">实施建议</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-medium text-gray-800 mb-2">短期实施（1-3个月）</h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• 完善研发费用归集制度</li>
                                        <li>• 梳理现有税收优惠政策</li>
                                        <li>• 建立税务风险监控体系</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-medium text-gray-800 mb-2">中长期实施（3-12个月）</h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• 申请高新技术企业认定</li>
                                        <li>• 组织架构优化调整</li>
                                        <li>• 建立长期税务规划体系</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        关闭
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        下载报告
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanningReportModal;