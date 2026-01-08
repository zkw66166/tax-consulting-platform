import React, { useState } from 'react';

const StampTaxCalculator = ({ saveToHistory }) => {
    const [stampData, setStampData] = useState({
        type: 'purchase_sales',
        amount: 0,
        rate: '0.3‰',
        copies: 1
    });

    const [stampResults, setStampResults] = useState(null);

    const handleStampTypeChange = (type) => {
        const rates = {
            'purchase_sales': '0.3‰',
            'processing': '0.3‰',
            'construction': '0.3‰',
            'construction_install': '0.3‰',
            'property_lease': '0.1‰',
            'cargo_transport': '0.3‰',
            'storage': '0.1‰',
            'loan': '0.05‰',
            'property_insurance': '0.1‰',
            'tech_contract': '0.3‰',
            'property_transfer': '0.5‰',
            'business_account': '2.5元/件'
        };

        if (rates[type]) {
            setStampData(prev => ({
                ...prev,
                type,
                rate: rates[type]
            }));
        }
    };

    const calculateStamp = () => {
        let tax = 0;

        if (stampData.rate.includes('‰')) {
            const rate = parseFloat(stampData.rate) / 1000;
            tax = stampData.amount * 10000 * rate;
        } else if (stampData.rate.includes('元/件')) {
            const rate = parseFloat(stampData.rate);
            tax = rate;
        } else {
            const rate = parseFloat(stampData.rate) / 100;
            tax = stampData.amount * 10000 * rate;
        }

        const totalTax = tax * stampData.copies;
        const taxRateResult = stampData.amount > 0 ? (totalTax / (stampData.amount * 10000) * 100) : 0;

        const results = {
            taxableAmount: stampData.amount.toFixed(2),
            applicableRate: stampData.rate,
            tax: tax.toFixed(2),
            totalTax: totalTax.toFixed(2)
        };

        setStampResults(results);
        saveToHistory('印花税', totalTax / 10000, taxRateResult, stampData);
    };

    return (
        <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                <h4 className="font-semibold text-indigo-800">印花税计算</h4>
                <p className="text-indigo-600 text-sm">应纳税额 = 应税凭证记载的金额（费用、收入额） × 适用税率</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">凭证类型</label>
                    <select
                        value={stampData.type}
                        onChange={(e) => handleStampTypeChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="purchase_sales">购销合同</option>
                        <option value="processing">加工承揽合同</option>
                        <option value="construction">建设工程勘察设计合同</option>
                        <option value="property_lease">财产租赁合同</option>
                        <option value="loan">借款合同</option>
                        <option value="property_transfer">产权转移书据</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">合同金额（万元）</label>
                    <input
                        type="number"
                        value={stampData.amount}
                        onChange={(e) => setStampData({ ...stampData, amount: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">适用税率</label>
                    <input
                        type="text"
                        value={stampData.rate}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">份数</label>
                    <input
                        type="number"
                        value={stampData.copies}
                        onChange={(e) => setStampData({ ...stampData, copies: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <button
                onClick={calculateStamp}
                className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
                计算印花税
            </button>

            {stampResults && (
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">计算结果</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">应税金额</p>
                            <p className="text-xl font-bold text-gray-900">{stampResults.taxableAmount}万元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">税率</p>
                            <p className="text-xl font-bold text-blue-600">{stampResults.applicableRate}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">应纳印花税</p>
                            <p className="text-xl font-bold text-green-600">{stampResults.tax}元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">总计税额</p>
                            <p className="text-xl font-bold text-red-600">{stampResults.totalTax}元</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StampTaxCalculator;