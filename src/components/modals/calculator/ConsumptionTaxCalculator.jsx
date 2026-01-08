import React, { useState } from 'react';

const ConsumptionTaxCalculator = ({ saveToHistory }) => {
    const [consumptionData, setConsumptionData] = useState({
        type: 'cigarette',
        quantity: 0,
        sales: 0,
        proportionalRate: 56,
        fixedRate: 0.003
    });

    const [consumptionResults, setConsumptionResults] = useState(null);

    const handleConsumptionTypeChange = (type) => {
        const rates = {
            'cigarette': { rate: 56, fixed: 0.003 },
            'alcohol': { rate: 20, fixed: 0 },
            'gasoline': { rate: 0, fixed: 1.52 },
            'diesel': { rate: 0, fixed: 1.2 },
            'cosmetics': { rate: 15, fixed: 0 },
            'luxury_watch': { rate: 20, fixed: 0 },
            'firecrackers': { rate: 15, fixed: 0 },
            'car': { rate: 25, fixed: 0 }
        };

        if (rates[type]) {
            setConsumptionData(prev => ({
                ...prev,
                type,
                proportionalRate: rates[type].rate,
                fixedRate: rates[type].fixed
            }));
        }
    };

    const calculateConsumption = () => {
        const adValoremTax = consumptionData.sales * (consumptionData.proportionalRate / 100);
        const specificTax = consumptionData.quantity * consumptionData.fixedRate / 10000;
        const tax = adValoremTax + specificTax;
        const taxRateResult = consumptionData.sales > 0 ? (tax / consumptionData.sales * 100) : 0;

        const results = {
            adValoremTax: adValoremTax.toFixed(2),
            specificTax: specificTax.toFixed(2),
            tax: tax.toFixed(2),
            taxRate: taxRateResult.toFixed(2)
        };

        setConsumptionResults(results);
        saveToHistory('消费税', tax, taxRateResult, consumptionData);
    };

    return (
        <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-800">消费税计算</h4>
                <p className="text-purple-600 text-sm">应纳税额 = 销售数量 × 单位税额 + 销售额 × 比例税率</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">应税消费品类型</label>
                    <select
                        value={consumptionData.type}
                        onChange={(e) => handleConsumptionTypeChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="cigarette">卷烟</option>
                        <option value="alcohol">酒类</option>
                        <option value="gasoline">汽油</option>
                        <option value="diesel">柴油</option>
                        <option value="cosmetics">化妆品</option>
                        <option value="luxury_watch">贵重首饰及珠宝玉石</option>
                        <option value="firecrackers">鞭炮焰火</option>
                        <option value="car">小汽车</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">销售数量</label>
                    <input
                        type="number"
                        value={consumptionData.quantity}
                        onChange={(e) => setConsumptionData({ ...consumptionData, quantity: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">销售额（万元）</label>
                    <input
                        type="number"
                        value={consumptionData.sales}
                        onChange={(e) => setConsumptionData({ ...consumptionData, sales: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <button
                onClick={calculateConsumption}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
            >
                计算消费税
            </button>

            {consumptionResults && (
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">计算结果</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">从价税额</p>
                            <p className="text-xl font-bold text-gray-900">{consumptionResults.adValoremTax}万元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">从量税额</p>
                            <p className="text-xl font-bold text-blue-600">{consumptionResults.specificTax}万元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">应纳消费税</p>
                            <p className="text-xl font-bold text-green-600">{consumptionResults.tax}万元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">税负率</p>
                            <p className="text-xl font-bold text-red-600">{consumptionResults.taxRate}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsumptionTaxCalculator;