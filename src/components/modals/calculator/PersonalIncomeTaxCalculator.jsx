import React, { useState } from 'react';

const PersonalIncomeTaxCalculator = ({ saveToHistory }) => {
    const [personalData, setPersonalData] = useState({
        salary: 0,
        socialInsurance: 0,
        childrenEducation: 0,
        continuingEducation: 0,
        medical: 0,
        housingLoan: 0,
        housingRent: 0,
        elderlyCare: 0
    });

    const [personalResults, setPersonalResults] = useState(null);

    const calculatePersonal = () => {
        const basicDeduction = 5000;
        const specialDeductions = personalData.childrenEducation + personalData.continuingEducation +
            personalData.medical + personalData.housingLoan + personalData.housingRent + personalData.elderlyCare;
        const taxableIncome = Math.max(0, personalData.salary - basicDeduction - personalData.socialInsurance - specialDeductions);

        let tax = 0;
        let applicableRate = 0;

        if (taxableIncome <= 3000) {
            tax = taxableIncome * 0.03;
            applicableRate = 3;
        } else if (taxableIncome <= 12000) {
            tax = 3000 * 0.03 + (taxableIncome - 3000) * 0.10;
            applicableRate = 10;
        } else if (taxableIncome <= 25000) {
            tax = 3000 * 0.03 + 9000 * 0.10 + (taxableIncome - 12000) * 0.20;
            applicableRate = 20;
        } else if (taxableIncome <= 35000) {
            tax = 3000 * 0.03 + 9000 * 0.10 + 13000 * 0.20 + (taxableIncome - 25000) * 0.25;
            applicableRate = 25;
        } else if (taxableIncome <= 55000) {
            tax = 3000 * 0.03 + 9000 * 0.10 + 13000 * 0.20 + 10000 * 0.25 + (taxableIncome - 35000) * 0.30;
            applicableRate = 30;
        } else if (taxableIncome <= 80000) {
            tax = 3000 * 0.03 + 9000 * 0.10 + 13000 * 0.20 + 10000 * 0.25 + 20000 * 0.30 + (taxableIncome - 55000) * 0.35;
            applicableRate = 35;
        } else {
            tax = 3000 * 0.03 + 9000 * 0.10 + 13000 * 0.20 + 10000 * 0.25 + 20000 * 0.30 + 25000 * 0.35 + (taxableIncome - 80000) * 0.45;
            applicableRate = 45;
        }

        const afterTaxIncome = personalData.salary - personalData.socialInsurance - tax;
        const taxRateResult = personalData.salary > 0 ? (tax / personalData.salary * 100) : 0;

        const results = {
            taxableIncome: taxableIncome.toFixed(2),
            applicableRate: applicableRate,
            tax: tax.toFixed(2),
            afterTaxIncome: afterTaxIncome.toFixed(2)
        };

        setPersonalResults(results);
        saveToHistory('个人所得税', tax / 10000, taxRateResult, personalData);
    };

    return (
        <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <h4 className="font-semibold text-orange-800">个人所得税计算（工资薪金）</h4>
                <p className="text-orange-600 text-sm">应纳税额 = (工资薪金收入 - 费用扣除标准 - 专项扣除 - 专项附加扣除) × 适用税率 - 速算扣除数</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">月工资收入（元）</label>
                    <input
                        type="number"
                        value={personalData.salary}
                        onChange={(e) => setPersonalData({ ...personalData, salary: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">社保公积金扣除（元）</label>
                    <input
                        type="number"
                        value={personalData.socialInsurance}
                        onChange={(e) => setPersonalData({ ...personalData, socialInsurance: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">子女教育扣除（元）</label>
                    <input
                        type="number"
                        value={personalData.childrenEducation}
                        onChange={(e) => setPersonalData({ ...personalData, childrenEducation: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">住房贷款利息扣除（元）</label>
                    <input
                        type="number"
                        value={personalData.housingLoan}
                        onChange={(e) => setPersonalData({ ...personalData, housingLoan: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">赡养老人扣除（元）</label>
                    <input
                        type="number"
                        value={personalData.elderlyCare}
                        onChange={(e) => setPersonalData({ ...personalData, elderlyCare: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <button
                onClick={calculatePersonal}
                className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
            >
                计算个人所得税
            </button>

            {personalResults && (
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">计算结果</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">应纳税所得额</p>
                            <p className="text-xl font-bold text-gray-900">{personalResults.taxableIncome}元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">适用税率</p>
                            <p className="text-xl font-bold text-blue-600">{personalResults.applicableRate}%</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">应纳个人所得税</p>
                            <p className="text-xl font-bold text-green-600">{personalResults.tax}元</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-600">税后收入</p>
                            <p className="text-xl font-bold text-red-600">{personalResults.afterTaxIncome}元</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalIncomeTaxCalculator;