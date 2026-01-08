import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AIAnswer from './pages/AIAnswer';
import RiskDetection from './pages/RiskDetection';
import Consulting from './pages/Consulting';
import DataManagement from './pages/DataManagement';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import CompanySelection from './pages/CompanySelection';

// 导入咨询子页面
import FinancialDueDiligence from './pages/consulting/FinancialDueDiligence';
import TaxCompliancePlanning from './pages/consulting/TaxCompliancePlanning';
import EquityStructure from './pages/consulting/EquityStructure';
import FinancialSystem from './pages/consulting/FinancialSystem';
import BudgetManagement from './pages/consulting/BudgetManagement';

// 导入新增的财务分析和税务鉴证组件
import FinancialAnalysis from './pages/consulting/FinancialAnalysis';
import TaxVerification from './pages/consulting/TaxVerification';

import { sidebarItems, professionalSidebarItems, managedCompanies } from './utils/mockData';

const App = () => {
    // 登录相关状态
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // 原有状态
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedCompany, setSelectedCompany] = useState('大华科技有限公司');
    const [showCompanySelector, setShowCompanySelector] = useState(false);
    const [companySearchTerm, setCompanySearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [userType, setUserType] = useState('enterprise');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedCompanies, setSelectedCompanies] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 处理登录 - 根据用户属性自动设置用户类型
    const handleLogin = (user) => {
        setCurrentUser(user);
        setUserType(user.userType);
        setIsLoggedIn(true);

        // 根据用户类型设置默认页面
        if (user.userType === 'enterprise') {
            setActiveTab('dashboard');
        } else {
            setActiveTab('data');
        }
        setSelectedModule('');
        setSelectedCompanies([]);
    };

    // 处理登出
    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setUserType('enterprise');
        setActiveTab('dashboard');
        setSelectedModule('');
        setSelectedCompanies([]);
        setSelectedCompany('大华科技有限公司');
        setShowCompanySelector(false);
        setCompanySearchTerm('');
    };

    // 如果未登录，显示登录页面
    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }



    const isProfessionalUser = userType === 'accounting' || userType === 'group';

    // 渲染专业用户企业选择提示
    const renderProfessionalHeader = () => {
        if (!isProfessionalUser || !selectedModule || selectedCompanies.length === 0) return null;

        const selectedCompanyNames = managedCompanies
            .filter(company => selectedCompanies.includes(company.id))
            .map(company => company.name);

        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-blue-900">
                            当前操作企业 ({selectedCompanies.length}家)
                        </h3>
                        <p className="text-xs text-blue-700 mt-1">
                            {selectedCompanyNames.join('、')}
                        </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        定制化操作模式
                    </span>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        const commonProps = {
            selectedCompany,
            userType,
            currentTime,
            currentUser
        };

        // 如果是专业用户且选择了需要企业列表的模块
        if (isProfessionalUser && ['risk', 'financial-analysis', 'tax-verification', 'due-diligence', 'tax-planning', 'equity-optimization', 'finance-optimization', 'budget-optimization'].includes(activeTab)) {
            if (!selectedModule) {
                return (
                    <CompanySelection
                        moduleType={activeTab}
                        selectedCompanies={selectedCompanies}
                        setSelectedCompanies={setSelectedCompanies}
                        setSelectedModule={setSelectedModule}
                        userType={userType}
                    />
                );
            } else if (selectedModule === 'custom') {
                // 定制化操作，调用原对应页面
                const professionalProps = {
                    ...commonProps,
                    selectedCompanies,
                    isProfessionalView: true
                };

                switch (activeTab) {
                    case 'risk':
                        return <RiskDetection {...professionalProps} />;
                    case 'financial-analysis':
                        return <FinancialAnalysis {...professionalProps} />;
                    case 'tax-verification':
                        return <TaxVerification {...professionalProps} />;
                    case 'due-diligence':
                        return <FinancialDueDiligence {...professionalProps} />;
                    case 'tax-planning':
                        return <TaxCompliancePlanning {...professionalProps} />;
                    case 'equity-optimization':
                        return <EquityStructure {...professionalProps} />;
                    case 'finance-optimization':
                        return <FinancialSystem {...professionalProps} />;
                    case 'budget-optimization':
                        return <BudgetManagement {...professionalProps} />;
                    default:
                        return <RiskDetection {...professionalProps} />;
                }
            }
        }

        // 渲染页面内容，包含专业用户提示
        const pageContent = (() => {
            switch (activeTab) {
                case 'dashboard':
                    return <Dashboard {...commonProps} />;
                case 'profile':
                    return <Profile {...commonProps} />;
                case 'ai-answer':
                    return <AIAnswer {...commonProps} />;
                case 'risk':
                    return <RiskDetection {...commonProps} />;
                case 'financial-analysis':
                    return <FinancialAnalysis {...commonProps} />;
                case 'tax-verification':
                    return <TaxVerification {...commonProps} />;
                case 'consulting':
                    return <Consulting {...commonProps} />;
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
                case 'data':
                    return <DataManagement {...commonProps} />;
                case 'reports':
                    return <Reports {...commonProps} />;
                case 'settings':
                    return <Settings {...commonProps} />;
                default:
                    return isProfessionalUser ?
                        <DataManagement {...commonProps} /> :
                        <Dashboard {...commonProps} />;
            }
        })();

        return (
            <div>
                {renderProfessionalHeader()}
                {pageContent}
            </div>
        );
    };

    const currentSidebarItems = isProfessionalUser ? professionalSidebarItems : sidebarItems;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
                showCompanySelector={showCompanySelector}
                setShowCompanySelector={setShowCompanySelector}
                companySearchTerm={companySearchTerm}
                setCompanySearchTerm={setCompanySearchTerm}
                currentTime={currentTime}
                userType={userType}
                currentUser={currentUser}
                onLogout={handleLogout}
            />

            <div className="flex">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    sidebarItems={currentSidebarItems}
                    userType={userType}
                    setSelectedModule={setSelectedModule}
                    setSelectedCompanies={setSelectedCompanies}
                />

                <main className="flex-1 overflow-auto">
                    <div className="p-6">
                        {renderContent()}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default App;