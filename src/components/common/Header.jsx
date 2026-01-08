import React, { useState } from 'react';
import { Calculator, Building, Search, Bell, CheckCircle, ChevronDown } from 'lucide-react';
import { managedCompanies } from '../../utils/mockData';

const Header = ({
    selectedCompany,
    setSelectedCompany,
    showCompanySelector,
    setShowCompanySelector,
    companySearchTerm,
    setCompanySearchTerm,
    currentTime,
    userType,
    currentUser,
    onLogout
}) => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    const filteredCompanies = managedCompanies.filter(company =>
        company.name.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        company.code.includes(companySearchTerm)
    );

    const handleCompanySwitch = (company) => {
        setSelectedCompany(company.name);
        setShowCompanySelector(false);
        setCompanySearchTerm('');
    };

    // 判断是否为单户企业用户
    const isEnterpriseUser = userType === 'enterprise';

    // 点击外部关闭菜单
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-menu-container')) {
                setShowUserMenu(false);
            }
            if (!event.target.closest('.company-selector-container')) {
                setShowCompanySelector(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowCompanySelector]);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                            <Calculator className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">慧天平台</h1>
                            <p className="text-xs text-gray-600">AI财税智能咨询</p>
                        </div>
                    </div>

                    {/* 企业切换功能 - 仅对单户企业用户显示 */}
                    {isEnterpriseUser && (
                        <div className="hidden md:block relative company-selector-container">
                            <button
                                onClick={() => setShowCompanySelector(!showCompanySelector)}
                                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                            >
                                <Building className="h-4 w-4" />
                                <span>当前企业：{selectedCompany}</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            {showCompanySelector && (
                                <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    <div className="p-4">
                                        <div className="relative mb-3">
                                            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                            <input
                                                type="text"
                                                placeholder="搜索企业名称..."
                                                value={companySearchTerm}
                                                onChange={(e) => setCompanySearchTerm(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {filteredCompanies.map((company) => (
                                                <button
                                                    key={company.id}
                                                    onClick={() => handleCompanySwitch(company)}
                                                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="font-medium text-gray-900">{company.name}</p>
                                                        <p className="text-xs text-gray-500">{company.code}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`w-2 h-2 rounded-full ${company.riskLevel === '高' ? 'bg-red-500' :
                                                            company.riskLevel === '中' ? 'bg-yellow-500' : 'bg-green-500'
                                                            }`}></span>
                                                        {selectedCompany === company.name && (
                                                            <CheckCircle className="h-4 w-4 text-blue-600" />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {/* 快速搜索 */}
                    <div className="hidden md:block relative">
                        <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="搜索功能、政策、问题..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                        />
                    </div>

                    {/* 通知 */}
                    <div className="relative">
                        <Bell className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                    </div>

                    {/* 用户菜单 */}
                    <div className="relative user-menu-container">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                        >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {currentUser?.avatar || currentUser?.name?.charAt(0) || '用'}
                            </div>
                            <div className="hidden md:block text-left">
                                <span className="text-sm text-gray-700">{currentUser?.name || '用户'}</span>
                                <p className="text-xs text-gray-500">{currentUser?.role || '角色'}</p>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* 用户下拉菜单 */}
                        {showUserMenu && (
                            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                {/* 用户信息头部 */}
                                <div className="p-4 border-b border-gray-200 bg-gray-50">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                                            {currentUser?.avatar || currentUser?.name?.charAt(0) || '用'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{currentUser?.name || '用户'}</p>
                                            <p className="text-sm text-gray-600">{currentUser?.role || '角色'}</p>
                                            <p className="text-xs text-gray-500">{currentUser?.company || '公司'}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500">用户类型</span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${userType === 'enterprise' ? 'bg-blue-100 text-blue-800' :
                                                    userType === 'accounting' ? 'bg-green-100 text-green-800' :
                                                        'bg-purple-100 text-purple-800'
                                                }`}>
                                                {userType === 'enterprise' ? '企业用户' :
                                                    userType === 'accounting' ? '事务所用户' : '集团用户'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs mt-1">
                                            <span className="text-gray-500">登录时间</span>
                                            <span className="text-gray-600">{currentTime.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 菜单选项 */}
                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            // 这里可以添加跳转到个人资料页面的逻辑
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center space-x-2"
                                    >
                                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                        <span>个人资料</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            // 跳转到设置页面
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center space-x-2"
                                    >
                                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                        <span>账户设置</span>
                                    </button>
                                    <hr className="my-2" />
                                    <button
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            onLogout();
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center space-x-2"
                                    >
                                        <div className="w-4 h-4 bg-red-400 rounded"></div>
                                        <span>退出登录</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
