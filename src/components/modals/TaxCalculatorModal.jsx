import React, { useState, useEffect } from 'react';
import { XCircle, Calculator, History } from 'lucide-react';
import CorporateIncomeTaxPlanning from './calculator/CorporateIncomeTaxPlanning';
import VATCalculator from './calculator/VATCalculator';
import ConsumptionTaxCalculator from './calculator/ConsumptionTaxCalculator';
import PersonalIncomeTaxCalculator from './calculator/PersonalIncomeTaxCalculator';
import StampTaxCalculator from './calculator/StampTaxCalculator';
import LandValueAddedTaxCalculator from './calculator/LandValueAddedTaxCalculator';
import CalculationHistory from './calculator/CalculationHistory';

const TaxCalculatorModal = ({ data, onClose, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('cit');
    const [calculationHistory, setCalculationHistory] = useState([]);

    // 从localStorage加载历史记录
    useEffect(() => {
        const savedHistory = localStorage.getItem('taxCalculationHistory');
        if (savedHistory) {
            setCalculationHistory(JSON.parse(savedHistory));
        }
    }, []);

    // 保存历史记录到localStorage
    const saveToHistory = (taxType, taxAmount, taxRate, details) => {
        const record = {
            id: Date.now(),
            timestamp: new Date().toLocaleString('zh-CN'),
            taxType,
            taxAmount,
            taxRate,
            details
        };

        const newHistory = [record, ...calculationHistory].slice(0, 50);
        setCalculationHistory(newHistory);
        localStorage.setItem('taxCalculationHistory', JSON.stringify(newHistory));
    };

    const tabs = [
        { id: 'cit', name: '企业所得税筹划', icon: Calculator },
        { id: 'vat', name: '增值税', icon: Calculator },
        { id: 'consumption', name: '消费税', icon: Calculator },
        { id: 'personal', name: '个人所得税', icon: Calculator },
        { id: 'stamp', name: '印花税', icon: Calculator },
        { id: 'land', name: '土地增值税', icon: Calculator },
        { id: 'history', name: '计算历史', icon: History }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'cit':
                return <CorporateIncomeTaxPlanning data={data} saveToHistory={saveToHistory} />;
            case 'vat':
                return <VATCalculator saveToHistory={saveToHistory} />;
            case 'consumption':
                return <ConsumptionTaxCalculator saveToHistory={saveToHistory} />;
            case 'personal':
                return <PersonalIncomeTaxCalculator saveToHistory={saveToHistory} />;
            case 'stamp':
                return <StampTaxCalculator saveToHistory={saveToHistory} />;
            case 'land':
                return <LandValueAddedTaxCalculator saveToHistory={saveToHistory} />;
            case 'history':
                return <CalculationHistory calculationHistory={calculationHistory} setCalculationHistory={setCalculationHistory} />;
            default:
                return <div>请选择税种进行计算</div>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
                {/* 头部 */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold">企业税负计算器</h3>
                            <p className="text-blue-100 mt-1">专业的多税种综合计算工具</p>
                        </div>
                        <button onClick={onClose} className="text-white hover:text-gray-200">
                            <XCircle className="h-8 w-8" />
                        </button>
                    </div>
                </div>

                {/* 标签页导航 */}
                <div className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto">
                    {tabs.map(tab => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600 bg-white'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <IconComponent className="h-4 w-4 mr-2" />
                                {tab.name}
                            </button>
                        );
                    })}
                </div>

                {/* 内容区域 */}
                <div className="flex-1 overflow-y-auto p-6">
                    {renderContent()}
                </div>

                {/* 底部按钮 */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                    >
                        关闭
                    </button>
                    <button
                        onClick={() => {
                            onUpdate(data);
                            onClose();
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        保存设置
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaxCalculatorModal;