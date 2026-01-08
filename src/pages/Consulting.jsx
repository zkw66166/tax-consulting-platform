import React, { useState } from 'react';
import { Calculator, GitBranch, BarChart3, DollarSign, Search, Shield, TrendingUp } from 'lucide-react';

// 导入子页面组件 - 修正路径
import FinancialDueDiligence from './consulting/FinancialDueDiligence';
import TaxCompliancePlanning from './consulting/TaxCompliancePlanning';
import EquityStructure from './consulting/EquityStructure';
import FinancialSystem from './consulting/FinancialSystem';
import BudgetManagement from './consulting/BudgetManagement';
import TaxVerification from './consulting/TaxVerification';
import FinancialAnalysis from './consulting/FinancialAnalysis';

const Consulting = ({ consultingType, userType, selectedCompany, currentTime }) => {
    const [consultingActiveTab, setConsultingActiveTab] = useState(consultingType || 'financial-due-diligence');

    // 如果指定了咨询类型，直接显示对应内容（用于专业用户的定制化操作）
    if (consultingType) {
        const commonProps = {
            selectedCompany,
            userType,
            currentTime
        };

        switch (consultingType) {
            case 'due-diligence':
                return <FinancialDueDiligence {...commonProps} />;
            case 'tax-planning':
                return <TaxCompliancePlanning {...commonProps} />;
            case 'equity-optimization':
                return <EquityStructure {...commonProps} />;
            case 'finance-optimization':
                return <FinancialSystem {...commonProps} />;
            case 'budget-optimization':
                return <BudgetManagement {...commonProps} />;
            case 'tax-verification':
                return <TaxVerification {...commonProps} />;
            case 'financial-analysis':
                return <FinancialAnalysis {...commonProps} />;
            default:
                return <FinancialDueDiligence {...commonProps} />;
        }
    }

    const consultingTabs = [
        { id: 'financial-due-diligence', label: '财务尽职调查', icon: Search },
        { id: 'financial-analysis', label: '财务分析', icon: TrendingUp },
        { id: 'tax-verification', label: '税务鉴证', icon: Shield },
        { id: 'tax-compliance', label: '税务合规规划', icon: Calculator },
        { id: 'equity-structure', label: '股权架构优化', icon: GitBranch },
        { id: 'financial-system', label: '财务体系优化', icon: BarChart3 },
        { id: 'budget-management', label: '预算管理优化', icon: DollarSign }

    ];

    const renderContent = () => {
        const commonProps = {
            selectedCompany,
            userType,
            currentTime
        };

        switch (consultingActiveTab) {
            case 'financial-due-diligence':
                return <FinancialDueDiligence {...commonProps} />;
            case 'tax-compliance':
                return <TaxCompliancePlanning {...commonProps} />;
            case 'tax-verification':
                return <TaxVerification {...commonProps} />;
            case 'equity-structure':
                return <EquityStructure {...commonProps} />;
            case 'financial-system':
                return <FinancialSystem {...commonProps} />;
            case 'budget-management':
                return <BudgetManagement {...commonProps} />;
            case 'financial-analysis':
                return <FinancialAnalysis {...commonProps} />;
            default:
                return <FinancialDueDiligence {...commonProps} />;
        }
    };

    return (
        <div className="space-y-6">
            {/* 标签导航 */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6 overflow-x-auto">
                        {consultingTabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setConsultingActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${consultingActiveTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <IconComponent className="h-5 w-5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* 标签内容 */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Consulting;