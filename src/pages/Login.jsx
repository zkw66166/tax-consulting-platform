import React, { useState } from 'react';
import { Calculator, Eye, EyeOff, Building, Users, Building2 } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    // 模拟用户数据库 - 包含用户的完整信息和用户类型
    const mockUsers = {
        'enterprise_user': {
            username: 'enterprise_user',
            password: '123456',
            name: '张三',
            company: '大华科技有限公司',
            role: '财务经理',
            userType: 'enterprise',
            email: 'zhang@company.com',
            phone: '13800138000',
            avatar: 'Z',
            registeredAt: '2024-01-15 09:30:00'
        },
        'accounting_user': {
            username: 'accounting_user',
            password: '123456',
            name: '李四',
            company: '金质会计师事务所',
            role: '项目经理',
            userType: 'accounting',
            email: 'li@accounting.com',
            phone: '13800138001',
            avatar: 'L',
            registeredAt: '2024-02-20 14:20:00'
        },
        'group_user': {
            username: 'group_user',
            password: '123456',
            name: '王五',
            company: '鸿运集团有限公司',
            role: '集团财务总监',
            userType: 'group',
            email: 'wang@group.com',
            phone: '13800138002',
            avatar: 'W',
            registeredAt: '2024-03-10 11:15:00'
        },
        // 可以添加更多用户
        'test_enterprise': {
            username: 'test_enterprise',
            password: '123456',
            name: '陈六',
            company: '创新科技公司',
            role: '财务主管',
            userType: 'enterprise',
            email: 'chen@innovation.com',
            phone: '13800138003',
            avatar: 'C',
            registeredAt: '2024-04-05 16:45:00'
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // 清除错误信息
        if (loginError) {
            setLoginError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginError('');

        // 模拟登录验证
        setTimeout(() => {
            const user = mockUsers[formData.username];
            if (user && user.password === formData.password) {
                onLogin(user);
            } else {
                setLoginError('用户名或密码错误，请检查后重试');
            }
            setIsLoading(false);
        }, 1000);
    };

    const quickLogin = (username) => {
        const user = mockUsers[username];
        if (user) {
            onLogin(user);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-8 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                            <Calculator className="h-7 w-7 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">慧盈AI财税</h1>
                    </div>
                    <p className="text-blue-100 text-sm">专业 • 智能 • 高效</p>
                    <p className="text-blue-200 text-xs mt-2">欢迎登录智能财税咨询平台</p>
                </div>

                {/* Login Form */}
                <div className="px-8 py-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                用户名
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                placeholder="请输入用户名"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                密码
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="请输入密码"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* 错误信息显示 */}
                        {loginError && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{loginError}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300" />
                                <span className="ml-2 text-gray-600">记住我</span>
                            </label>
                            <button onClick={() => { }} className="text-blue-600 hover:text-blue-800">忘记密码？</button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    登录中...
                                </>
                            ) : (
                                '登录'
                            )}
                        </button>
                    </form>

                    {/* Quick Login Buttons - 仅用于演示 */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center mb-4">快速登录演示</p>
                        <div className="grid grid-cols-1 gap-2">
                            {Object.entries(mockUsers).map(([username, user]) => {
                                const userTypeInfo = {
                                    enterprise: { label: '企业用户', icon: Building, color: 'blue' },
                                    accounting: { label: '事务所用户', icon: Users, color: 'green' },
                                    group: { label: '集团用户', icon: Building2, color: 'purple' }
                                };
                                const typeInfo = userTypeInfo[user.userType];
                                const Icon = typeInfo.icon;

                                return (
                                    <button
                                        key={username}
                                        onClick={() => quickLogin(username)}
                                        className={`flex items-center justify-between text-sm py-2 px-3 rounded border border-${typeInfo.color}-200 text-${typeInfo.color}-700 hover:bg-${typeInfo.color}-50 transition-colors`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Icon className="h-4 w-4" />
                                            <span>{user.name} - {typeInfo.label}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{user.company}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Demo Info */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">演示账号信息</h4>
                        <div className="text-xs text-gray-600 space-y-2">
                            {Object.entries(mockUsers).map(([username, user]) => (
                                <div key={username} className="flex justify-between items-center py-1">
                                    <span className="font-medium">{user.name}（{user.userType === 'enterprise' ? '企业' : user.userType === 'accounting' ? '事务所' : '集团'}）:</span>
                                    <span className="text-blue-600">{username} / {user.password}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                            <p className="text-xs text-blue-800">
                                <strong>提示：</strong>用户类型由注册时设定，登录后系统会自动识别并显示对应界面。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;