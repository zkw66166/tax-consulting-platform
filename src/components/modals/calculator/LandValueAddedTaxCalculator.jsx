import React, { useState } from 'react';

const LandValueAddedTaxCalculator = ({ saveToHistory }) => {
    const [landData, setLandData] = useState({
        income: 0,
        acquisitionCost: 0,
        developmentCost: 0,
        developmentExpense: 0,
        relatedTax: 0,
        otherDeduction: 0,
        propertyType: 'ordinary'
    });

    const [landResults, setLandResults] = useState(null);

    const calculateLand = () => {
        let deductionTotal = landData.acquisitionCost + landData.developmentCost +
            landData.developmentExpense + landData.relatedTax + landData.otherDeduction;

        if (landData.propertyType === 'ordinary') {
            deductionTotal *= 1.2;
        }

        const valueAdded = landData.income - deductionTotal;
        const valueAddedRate = deductionTotal > 0 ? (valueAdded / deductionTotal * 100) : 0;

        let taxRate = 0;
        let quickDeduction = 0;

        if (valueAddedRate <= 50) {
            taxRate = 0.30;
            quickDeduction = 0;
        } else if (valueAddedRate <= 100) {
            taxRate = 0.40;
            quickDeduction = 0.05;
        } else if (valueAddedRate <= 200) {
            taxRate = 0.50;
            quickDeduction = 0.15;
        } else {
            taxRate = 0.60;
            quickDeduction = 0.35;
        }

        const tax = Math.max(0, valueAdded * taxRate - deductionTotal * quickDeduction);
        const taxRateResult = landData.income > 0 ? (tax / landData.income * 100) : 0;

        const results = {
            deductionTotal: deductionTotal.toFixed(2),
            valueAdded: valueAdded.toFixed(2),
            valueAddedRate: valueAddedRate.toFixed(2),
            tax: tax.toFixed(2)
        };

        setLandResults(results);
        saveToHistory('土地增值税', tax, taxRateResult, landData);
    };

    return (
        <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-800">土地增值税计算</h4>
                <p className="text-yellow-600 text-sm">应纳税额 = 增值额 × 适用税率 - 扣除项目金额 × 速算扣除系数</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">转让房地产收入（万元）</label>
                    <input
                        type="number"
                        value={landData.income}
                        onChange={(e) => setLandData({ ...landData, income: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">取得土地使用权支付金额（万元）</label>
                    <input
                        type="number"
                        value={landData.acquisitionCost}
                        onChange={(e) => setLandData({ ...landData, acquisitionCost: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">房地产开发成本（万元）</label>
                    <input
                        type="number"
                        value={landData.developmentCost}
                        onChange={(e) => setLandData({ ...landData, developmentCost: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">房地产类型</label>
                    <select
                        value={landData.propertyType}
                        onChange={(e) => setLandData({ ...landData, propertyType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="ordinary">普通住宅</option>
                        <option value="non_ordinary">非普通住宅</option>
                        <option value="commercial">商业用房</option>
                    </select>
                </div>
            </div>

            <button
                onClick={calculateLand}
                className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium"
            >
                计算土地增值税
            </button>

            {landResults && (
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">计算结果</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">扣除项目金额</p>
                            <p className="text-xl font-bold text-gray-900">{landResults.deductionTotal}万元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">增值额</p>
                            <p className="text-xl font-bold text-blue-600">{landResults.valueAdded}万元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">增值率</p>
                            <p className="text-xl font-bold text-green-600">{landResults.valueAddedRate}%</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">应纳土地增值税</p>
                            <p className="text-xl font-bold text-red-600">{landResults.tax}万元</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandValueAddedTaxCalculator;