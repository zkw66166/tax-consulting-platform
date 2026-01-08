import React, { useState } from 'react';
import { Settings as SettingsIcon, Users, Shield, Database, Globe, Activity, HelpCircle, Plus, Edit, Trash2, Phone, Mail, MessageCircle, Building2, CheckCircle, XCircle, Search, Filter, Download, Upload, Target, BarChart3, Calendar, FileText, AlertTriangle, Zap, Clock, DollarSign, TrendingUp, Bell, Eye, Building, UserCheck, UserX, UserPlus, Key, MoreHorizontal } from 'lucide-react';

const Settings = ({ currentUser }) => {
    const [activeTab, setActiveTab] = useState('single');
    const [selectedEnterprises, setSelectedEnterprises] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [serviceFilter, setServiceFilter] = useState('all');

    // 用户管理相关状态
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [userTypeFilter, setUserTypeFilter] = useState('all');
    const [userStatusFilter, setUserStatusFilter] = useState('all');
    const [showUserModal, setShowUserModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'add', 'edit', 'changeType', 'resetPassword', 'changeStatus'
    const [selectedUser, setSelectedUser] = useState(null);

    // 模拟用户数据
    const [allUsers, setAllUsers] = useState([
        {
            id: 1,
            username: 'enterprise_user',
            name: '张三',
            email: 'zhang@company.com',
            phone: '13800138000',
            company: '大华科技有限公司',
            role: '财务经理',
            userType: 'enterprise',
            status: 'active',
            lastLogin: '2024-07-20 10:30:00',
            registeredAt: '2024-01-15 09:30:00',
            avatar: 'Z',
            permissions: ['财务管理', '报表查看', '风险监测']
        },
        {
            id: 2,
            username: 'accounting_user',
            name: '李四',
            email: 'li@accounting.com',
            phone: '13800138001',
            company: '华信会计师事务所',
            role: '项目经理',
            userType: 'accounting',
            status: 'active',
            lastLogin: '2024-07-20 08:15:00',
            registeredAt: '2024-02-20 14:20:00',
            avatar: 'L',
            permissions: ['多企业管理', '服务配置', '团队管理', '报告审核']
        },
        {
            id: 3,
            username: 'group_user',
            name: '王五',
            email: 'wang@group.com',
            phone: '13800138002',
            company: '鸿运集团有限公司',
            role: '集团财务总监',
            userType: 'group',
            status: 'active',
            lastLogin: '2024-07-19 16:45:00',
            registeredAt: '2024-03-10 11:15:00',
            avatar: 'W',
            permissions: ['集团管理', '子公司监控', '财务分析', '预算管理']
        },
        {
            id: 4,
            username: 'test_user1',
            name: '陈六',
            email: 'chen@innovation.com',
            phone: '13800138003',
            company: '创新科技公司',
            role: '财务主管',
            userType: 'enterprise',
            status: 'suspended',
            lastLogin: '2024-07-15 14:20:00',
            registeredAt: '2024-04-05 16:45:00',
            avatar: 'C',
            permissions: ['财务管理', '报表查看']
        },
        {
            id: 5,
            username: 'test_user2',
            name: '刘七',
            email: 'liu@finance.com',
            phone: '13800138004',
            company: '金融服务公司',
            role: '高级会计师',
            userType: 'accounting',
            status: 'inactive',
            lastLogin: '2024-07-10 09:30:00',
            registeredAt: '2024-05-12 10:20:00',
            avatar: 'L',
            permissions: ['客户管理', '服务配置']
        },
        {
            id: 6,
            username: 'test_user3',
            name: '赵八',
            email: 'zhao@manufacturing.com',
            phone: '13800138005',
            company: '制造业集团',
            role: '财务总监',
            userType: 'group',
            status: 'active',
            lastLogin: '2024-07-20 11:00:00',
            registeredAt: '2024-06-08 15:30:00',
            avatar: 'Z',
            permissions: ['集团管理', '财务分析', '风险控制']
        }
    ]);

    // 用户类型变更申请记录
    const [userTypeApplications, setUserTypeApplications] = useState([
        {
            id: 1,
            userId: 4,
            userName: '陈六',
            currentType: 'enterprise',
            targetType: 'accounting',
            reason: '公司业务扩展，需要管理多个客户企业',
            status: 'pending',
            applyTime: '2024-07-18 14:30:00'
        },
        {
            id: 2,
            userId: 5,
            userName: '刘七',
            currentType: 'accounting',
            targetType: 'group',
            reason: '加入集团公司，需要管理集团财务',
            status: 'rejected',
            applyTime: '2024-07-15 09:20:00',
            rejectReason: '权限不足，需要更高级别审批'
        }
    ]);

    // 批量操作表单数据
    const [batchOperationForm, setBatchOperationForm] = useState({
        userType: '',
        status: '',
        permissions: [],
        company: ''
    });

    // 原有单户设置状态
    const [systemSettings, setSystemSettings] = useState({
        smartReminder: true,
        autoBackup: true,
        dataSync: false
    });

    const [securitySettings, setSecuritySettings] = useState({
        sessionTimeout: '1小时',
        passwordMinLength: true,
        passwordComplexity: true,
        passwordSpecialChars: true
    });

    const [ipWhitelist, setIpWhitelist] = useState('');

    // 事务所用户设置状态
    const [serviceConfig, setServiceConfig] = useState({
        riskMonitoring: {
            enabled: true,
            alertThreshold: 80,
            reportFrequency: 'monthly',
            autoAlert: true,
            riskCategories: ['财务风险', '税务风险', '合规风险', '经营风险']
        },
        financialDueDiligence: {
            enabled: true,
            depth: 'comprehensive',
            includeSectors: ['资产负债', '现金流', '盈利能力', '偿债能力'],
            reportTemplate: 'standard'
        },
        taxCompliance: {
            enabled: true,
            taxTypes: ['企业所得税', '增值税', '个人所得税', '其他税种'],
            complianceLevel: 'strict',
            reminderDays: 15
        },
        equityOptimization: {
            enabled: true,
            analysisDepth: 'detailed',
            optimizationGoals: ['税务优化', '风险控制', '治理完善'],
            reportFormat: 'detailed'
        },
        financialSystemOptimization: {
            enabled: true,
            systemScope: ['会计核算', '财务分析', '预算管理', '成本控制'],
            implementationSupport: true
        },
        budgetManagement: {
            enabled: true,
            budgetCycle: 'annual',
            trackingFrequency: 'monthly',
            varianceThreshold: 10
        }
    });

    // 模拟企业数据
    const [enterprises, setEnterprises] = useState([
        {
            id: 1,
            name: '华润科技有限公司',
            code: 'HR001',
            industry: '科技',
            scale: '大型',
            status: '活跃',
            services: ['riskMonitoring', 'taxCompliance', 'budgetManagement'],
            lastUpdate: '2024-07-15',
            contactPerson: '张经理',
            priority: 'high'
        },
        {
            id: 2,
            name: '绿洲农业发展公司',
            code: 'LZ002',
            industry: '农业',
            scale: '中型',
            status: '活跃',
            services: ['riskMonitoring', 'financialDueDiligence'],
            lastUpdate: '2024-07-12',
            contactPerson: '李总',
            priority: 'medium'
        },
        {
            id: 3,
            name: '明达制造企业',
            code: 'MD003',
            industry: '制造业',
            scale: '中型',
            status: '暂停',
            services: ['taxCompliance'],
            lastUpdate: '2024-07-10',
            contactPerson: '王主任',
            priority: 'low'
        },
        {
            id: 4,
            name: '新能源投资集团',
            code: 'XNY004',
            industry: '能源',
            scale: '大型',
            status: '活跃',
            services: ['riskMonitoring', 'equityOptimization', 'financialSystemOptimization'],
            lastUpdate: '2024-07-14',
            contactPerson: '陈总监',
            priority: 'high'
        }
    ]);

    const serviceOptions = [
        { key: 'riskMonitoring', name: '风险监测', icon: AlertTriangle, color: 'red' },
        { key: 'financialDueDiligence', name: '财务尽职调查', icon: BarChart3, color: 'blue' },
        { key: 'taxCompliance', name: '税务合规规划', icon: FileText, color: 'green' },
        { key: 'equityOptimization', name: '股权架构优化', icon: Target, color: 'purple' },
        { key: 'financialSystemOptimization', name: '财务体系优化', icon: Zap, color: 'yellow' },
        { key: 'budgetManagement', name: '预算管理优化', icon: Calendar, color: 'indigo' }
    ];

    // 用户管理相关函数
    const handleUserSelect = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSelectAllUsers = () => {
        const filteredUserIds = filteredUsers.map(user => user.id);
        if (selectedUsers.length === filteredUserIds.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUserIds);
        }
    };

    const filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(userSearchTerm.toLowerCase());
        const matchesType = userTypeFilter === 'all' || user.userType === userTypeFilter;
        const matchesStatus = userStatusFilter === 'all' || user.status === userStatusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    const getUserTypeInfo = (userType) => {
        const typeMap = {
            enterprise: { label: '企业用户', icon: Building, color: 'blue' },
            accounting: { label: '事务所用户', icon: Users, color: 'green' },
            group: { label: '集团用户', icon: Building2, color: 'purple' }
        };
        return typeMap[userType] || typeMap.enterprise;
    };

    const getStatusInfo = (status) => {
        const statusMap = {
            active: { label: '活跃', color: 'green' },
            inactive: { label: '未激活', color: 'gray' },
            suspended: { label: '暂停', color: 'red' }
        };
        return statusMap[status] || statusMap.active;
    };

    // 批量操作函数
    const handleBatchUserTypeChange = () => {
        if (selectedUsers.length === 0) {
            alert('请先选择要操作的用户');
            return;
        }
        setModalType('batchChangeType');
        setShowUserModal(true);
    };

    const handleBatchStatusChange = () => {
        if (selectedUsers.length === 0) {
            alert('请先选择要操作的用户');
            return;
        }
        setModalType('batchChangeStatus');
        setShowUserModal(true);
    };

    const handleBatchPermissionChange = () => {
        if (selectedUsers.length === 0) {
            alert('请先选择要操作的用户');
            return;
        }
        setModalType('batchChangePermission');
        setShowUserModal(true);
    };

    const handleBatchPasswordReset = () => {
        if (selectedUsers.length === 0) {
            alert('请先选择要操作的用户');
            return;
        }
        if (window.confirm(`确定要重置选中的 ${selectedUsers.length} 个用户的密码吗？`)) {
            // 这里可以添加批量重置密码的API调用
            alert('密码重置成功，新密码已发送到用户邮箱');
            setSelectedUsers([]);
        }
    };

    const executeBatchOperation = () => {
        // 执行批量操作
        setAllUsers(prev => prev.map(user => {
            if (selectedUsers.includes(user.id)) {
                const updatedUser = { ...user };
                if (modalType === 'batchChangeType' && batchOperationForm.userType) {
                    updatedUser.userType = batchOperationForm.userType;
                }
                if (modalType === 'batchChangeStatus' && batchOperationForm.status) {
                    updatedUser.status = batchOperationForm.status;
                }
                return updatedUser;
            }
            return user;
        }));

        setShowUserModal(false);
        setBatchOperationForm({ userType: '', status: '', permissions: [], company: '' });
        setSelectedUsers([]);
        alert('批量操作完成');
    };

    // 处理用户类型变更申请
    const handleApproveApplication = (applicationId) => {
        setUserTypeApplications(prev => prev.map(app =>
            app.id === applicationId ? { ...app, status: 'approved' } : app
        ));
        // 更新用户类型
        const application = userTypeApplications.find(app => app.id === applicationId);
        if (application) {
            setAllUsers(prev => prev.map(user =>
                user.id === application.userId ? { ...user, userType: application.targetType } : user
            ));
        }
        alert('申请已批准');
    };

    const handleRejectApplication = (applicationId) => {
        const reason = prompt('请输入拒绝理由：');
        if (reason) {
            setUserTypeApplications(prev => prev.map(app =>
                app.id === applicationId ? { ...app, status: 'rejected', rejectReason: reason } : app
            ));
            alert('申请已拒绝');
        }
    };

    const updateSystemSetting = (key, value) => {
        setSystemSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleEnterpriseSelect = (enterpriseId) => {
        setSelectedEnterprises(prev =>
            prev.includes(enterpriseId)
                ? prev.filter(id => id !== enterpriseId)
                : [...prev, enterpriseId]
        );
    };

    const handleBatchServiceUpdate = (serviceKey, enabled) => {
        if (selectedEnterprises.length === 0) {
            alert('请先选择要操作的企业');
            return;
        }

        setEnterprises(prev => prev.map(enterprise => {
            if (selectedEnterprises.includes(enterprise.id)) {
                const newServices = enabled
                    ? [...new Set([...enterprise.services, serviceKey])]
                    : enterprise.services.filter(s => s !== serviceKey);
                return { ...enterprise, services: newServices };
            }
            return enterprise;
        }));
    };

    const filteredEnterprises = enterprises.filter(enterprise => {
        const matchesSearch = enterprise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            enterprise.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = serviceFilter === 'all' || enterprise.services.includes(serviceFilter);
        return matchesSearch && matchesFilter;
    });

    const renderSingleUserSettings = () => (
        <div className="space-y-6">
            {/* 系统配置概览 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SettingsIcon className="h-6 w-6 mr-2 text-blue-600" />
                    系统设置中心
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Users className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{allUsers.filter(u => u.status === 'active').length}</p>
                        <p className="text-sm text-gray-600">活跃用户</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Shield className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">99.9%</p>
                        <p className="text-sm text-gray-600">系统可用性</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Database className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">2.3GB</p>
                        <p className="text-sm text-gray-600">数据存储</p>
                    </div>
                </div>
            </div>

            {/* 用户管理 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-green-600" />
                        用户权限管理
                    </h3>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        添加用户
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">角色</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">权限</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">最后登录</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                { name: '张三', email: 'zhang@company.com', role: '管理员', permissions: '全部权限', lastLogin: '2小时前', status: '在线' },
                                { name: '李四', email: 'li@company.com', role: '财务人员', permissions: '财务模块', lastLogin: '1天前', status: '离线' },
                                { name: '王五', email: 'wang@company.com', role: '审核员', permissions: '查看+审核', lastLogin: '3天前', status: '离线' }
                            ].map((user, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{user.role}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{user.permissions}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === '在线' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 系统偏好设置和安全设置 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <SettingsIcon className="h-5 w-5 mr-2 text-purple-600" />
                        系统偏好
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div>
                                <h4 className="font-medium text-gray-900">智能提醒</h4>
                                <p className="text-sm text-gray-600">开启风险预警和重要通知推送</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={systemSettings.smartReminder}
                                    onChange={(e) => updateSystemSetting('smartReminder', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div>
                                <h4 className="font-medium text-gray-900">自动备份</h4>
                                <p className="text-sm text-gray-600">每日自动备份重要数据</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={systemSettings.autoBackup}
                                    onChange={(e) => updateSystemSetting('autoBackup', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div>
                                <h4 className="font-medium text-gray-900">数据同步</h4>
                                <p className="text-sm text-gray-600">与外部财务系统实时同步</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={systemSettings.dataSync}
                                    onChange={(e) => updateSystemSetting('dataSync', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-red-600" />
                        安全设置
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">登录超时时间</label>
                            <select
                                value={securitySettings.sessionTimeout}
                                onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>30分钟</option>
                                <option>1小时</option>
                                <option>2小时</option>
                                <option>4小时</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">密码策略</label>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={securitySettings.passwordMinLength}
                                        onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.checked })}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">至少8位字符</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={securitySettings.passwordComplexity}
                                        onChange={(e) => setSecuritySettings({ ...securitySettings, passwordComplexity: e.target.checked })}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">包含大小写字母</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={securitySettings.passwordSpecialChars}
                                        onChange={(e) => setSecuritySettings({ ...securitySettings, passwordSpecialChars: e.target.checked })}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">包含数字和特殊字符</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">IP访问限制</label>
                            <textarea
                                placeholder="输入允许访问的IP地址，每行一个"
                                value={ipWhitelist}
                                onChange={(e) => setIpWhitelist(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* API接口配置 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                    外部接口配置
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">财务系统集成</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">慧经盈财务系统</p>
                                        <p className="text-sm text-gray-600">已连接 • 最后同步: 5分钟前</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">已连接</span>
                                </div>
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">xx财务系统</p>
                                        <p className="text-sm text-gray-600">未配置</p>
                                    </div>
                                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                                        配置
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">税务局接口</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">电子税务局</p>
                                        <p className="text-sm text-gray-600">已连接 • API调用正常</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">正常</span>
                                </div>
                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">发票查验接口</p>
                                        <p className="text-sm text-gray-600">已连接 • 实时验证</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">正常</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 数据导入导出设置 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-teal-600" />
                    数据管理设置
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">备份设置</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">备份频率</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>每日自动备份</option>
                                    <option>每周备份</option>
                                    <option>手动备份</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">备份保留</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>保留30天</option>
                                    <option>保留90天</option>
                                    <option>保留1年</option>
                                </select>
                            </div>
                            <button className="w-full px-3 py-2 bg-teal-600 text-white rounded text-sm hover:bg-teal-700">
                                立即备份
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">导出格式</h4>
                        <div className="space-y-2">
                            {['Excel (.xlsx)', 'CSV', 'PDF', 'JSON'].map((format, index) => (
                                <label key={index} className="flex items-center">
                                    <input type="checkbox" className="rounded" defaultChecked={index < 2} />
                                    <span className="ml-2 text-sm text-gray-600">{format}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm text-gray-700 mb-1">默认导出格式</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                <option>Excel (.xlsx)</option>
                                <option>CSV</option>
                                <option>PDF</option>
                                <option>JSON</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">存储管理</h4>
                        <div className="space-y-3">
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>已用存储</span>
                                    <span>2.3GB / 10GB</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                                </div>
                            </div>
                            <button className="w-full px-3 py-2 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
                                清理临时文件
                            </button>
                            <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                                存储分析
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 系统监控 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-green-600" />
                    系统运行状态
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
                        <div className="text-sm text-gray-600">系统可用性</div>
                        <div className="text-xs text-green-600 mt-1">正常运行</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">45ms</div>
                        <div className="text-sm text-gray-600">平均响应时间</div>
                        <div className="text-xs text-blue-600 mt-1">性能优良</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-1">1,247</div>
                        <div className="text-sm text-gray-600">今日访问量</div>
                        <div className="text-xs text-purple-600 mt-1">较昨日+12%</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">0</div>
                        <div className="text-sm text-gray-600">系统错误</div>
                        <div className="text-xs text-orange-600 mt-1">运行稳定</div>
                    </div>
                </div>
            </div>

            {/* 联系支持 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                    技术支持
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <Phone className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                        <h4 className="font-medium text-gray-900 mb-2">电话支持</h4>
                        <p className="text-sm text-gray-600 mb-3">400-123-4567</p>
                        <p className="text-xs text-gray-500">工作日 9:00-18:00</p>
                    </div>

                    <div className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <Mail className="h-8 w-8 text-green-500 mx-auto mb-3" />
                        <h4 className="font-medium text-gray-900 mb-2">邮件支持</h4>
                        <p className="text-sm text-gray-600 mb-3">support@aitax.com</p>
                        <p className="text-xs text-gray-500">24小时内回复</p>
                    </div>

                    <div className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                        <h4 className="font-medium text-gray-900 mb-2">在线客服</h4>
                        <p className="text-sm text-gray-600 mb-3">即时消息支持</p>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                            开始对话
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFirmSettings = () => (
        <div className="space-y-6">
            {/* 事务所概览 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Building2 className="h-6 w-6 mr-2 text-blue-600" />
                    服务管理中心
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Building2 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{enterprises.length}</p>
                        <p className="text-sm text-gray-600">管理企业</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{enterprises.filter(e => e.status === '活跃').length}</p>
                        <p className="text-sm text-gray-600">活跃企业</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Activity className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">{serviceOptions.length}</p>
                        <p className="text-sm text-gray-600">服务项目</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">{enterprises.filter(e => e.priority === 'high').length}</p>
                        <p className="text-sm text-gray-600">高优先级</p>
                    </div>
                </div>
            </div>

            {/* 批量服务配置 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    批量服务配置
                </h3>
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                        已选择 <span className="font-bold">{selectedEnterprises.length}</span> 家企业进行批量操作
                        {selectedEnterprises.length > 0 && (
                            <button
                                onClick={() => setSelectedEnterprises([])}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                                清空选择
                            </button>
                        )}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviceOptions.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div key={service.key} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                    <Icon className={`h-6 w-6 mr-2 text-${service.color}-600`} />
                                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleBatchServiceUpdate(service.key, true)}
                                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                    >
                                        批量开启
                                    </button>
                                    <button
                                        onClick={() => handleBatchServiceUpdate(service.key, false)}
                                        className="flex-1 px-3 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                                    >
                                        批量关闭
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 企业列表管理 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                        企业服务管理
                    </h3>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                            <Upload className="h-4 w-4 mr-2" />
                            批量导入
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            导出报表
                        </button>
                    </div>
                </div>

                {/* 搜索和筛选 */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索企业名称或编码..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="h-5 w-5 text-gray-400" />
                        <select
                            value={serviceFilter}
                            onChange={(e) => setServiceFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">全部服务</option>
                            {serviceOptions.map(service => (
                                <option key={service.key} value={service.key}>{service.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* 企业列表 */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={selectedEnterprises.length === filteredEnterprises.length && filteredEnterprises.length > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedEnterprises(filteredEnterprises.map(e => e.id));
                                            } else {
                                                setSelectedEnterprises([]);
                                            }
                                        }}
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">企业信息</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">行业规模</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">服务项目</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">优先级</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">联系人</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredEnterprises.map((enterprise) => (
                                <tr key={enterprise.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            checked={selectedEnterprises.includes(enterprise.id)}
                                            onChange={() => handleEnterpriseSelect(enterprise.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{enterprise.name}</p>
                                            <p className="text-xs text-gray-500">{enterprise.code}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div>
                                            <p className="text-sm text-gray-900">{enterprise.industry}</p>
                                            <p className="text-xs text-gray-500">{enterprise.scale}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${enterprise.status === '活跃' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {enterprise.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {enterprise.services.map(serviceKey => {
                                                const service = serviceOptions.find(s => s.key === serviceKey);
                                                return service ? (
                                                    <span key={serviceKey} className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                                        {service.name}
                                                    </span>
                                                ) : null;
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${enterprise.priority === 'high' ? 'bg-red-100 text-red-800' :
                                            enterprise.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {enterprise.priority === 'high' ? '高' : enterprise.priority === 'medium' ? '中' : '低'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600">
                                        {enterprise.contactPerson}
                                    </td>
                                    <td className="px-4 py-4 text-sm">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="text-green-600 hover:text-green-800">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 服务参数配置 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <SettingsIcon className="h-5 w-5 mr-2 text-purple-600" />
                    服务参数配置
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 风险监测配置 */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                            风险监测参数
                        </h4>
                        <div className="space-y-3 pl-7">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">预警阈值</label>
                                <input
                                    type="range"
                                    min="50"
                                    max="100"
                                    value={serviceConfig.riskMonitoring.alertThreshold}
                                    onChange={(e) => setServiceConfig({
                                        ...serviceConfig,
                                        riskMonitoring: {
                                            ...serviceConfig.riskMonitoring,
                                            alertThreshold: parseInt(e.target.value)
                                        }
                                    })}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-600">{serviceConfig.riskMonitoring.alertThreshold}分</span>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">报告频率</label>
                                <select
                                    value={serviceConfig.riskMonitoring.reportFrequency}
                                    onChange={(e) => setServiceConfig({
                                        ...serviceConfig,
                                        riskMonitoring: {
                                            ...serviceConfig.riskMonitoring,
                                            reportFrequency: e.target.value
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                >
                                    <option value="weekly">每周</option>
                                    <option value="monthly">每月</option>
                                    <option value="quarterly">每季度</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 税务合规配置 */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-green-600" />
                            税务合规参数
                        </h4>
                        <div className="space-y-3 pl-7">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">提醒天数</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={serviceConfig.taxCompliance.reminderDays}
                                    onChange={(e) => setServiceConfig({
                                        ...serviceConfig,
                                        taxCompliance: {
                                            ...serviceConfig.taxCompliance,
                                            reminderDays: parseInt(e.target.value)
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">合规等级</label>
                                <select
                                    value={serviceConfig.taxCompliance.complianceLevel}
                                    onChange={(e) => setServiceConfig({
                                        ...serviceConfig,
                                        taxCompliance: {
                                            ...serviceConfig.taxCompliance,
                                            complianceLevel: e.target.value
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                >
                                    <option value="basic">基础</option>
                                    <option value="standard">标准</option>
                                    <option value="strict">严格</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 预算管理配置 */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                            预算管理参数
                        </h4>
                        <div className="space-y-3 pl-7">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">预算周期</label>
                                <select
                                    value={serviceConfig.budgetManagement.budgetCycle}
                                    onChange={(e) => setServiceConfig({
                                        ...serviceConfig,
                                        budgetManagement: {
                                            ...serviceConfig.budgetManagement,
                                            budgetCycle: e.target.value
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                >
                                    <option value="monthly">月度</option>
                                    <option value="quarterly">季度</option>
                                    <option value="annual">年度</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">差异阈值 (%)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={serviceConfig.budgetManagement.varianceThreshold}
                                    onChange={(e) => setServiceConfig({
                                        ...serviceConfig,
                                        budgetManagement: {
                                            ...serviceConfig.budgetManagement,
                                            varianceThreshold: parseInt(e.target.value)
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 财务尽调配置 */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                            财务尽调参数
                        </h4>
                        <div className="space-y-3 pl-7">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">调查深度</label>
                                <select
                                    value={serviceConfig.financialDueDiligence.depth}
                                    onChange={(e) => setServiceConfig({
                                        ...serviceConfig,
                                        financialDueDiligence: {
                                            ...serviceConfig.financialDueDiligence,
                                            depth: e.target.value
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                >
                                    <option value="basic">基础调查</option>
                                    <option value="standard">标准调查</option>
                                    <option value="comprehensive">全面调查</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">报告模板</label>
                                <select
                                    value={serviceConfig.financialDueDiligence.reportTemplate}
                                    onChange={(e) => setServiceConfig({
                                        ...serviceConfig,
                                        financialDueDiligence: {
                                            ...serviceConfig.financialDueDiligence,
                                            reportTemplate: e.target.value
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                >
                                    <option value="standard">标准模板</option>
                                    <option value="detailed">详细模板</option>
                                    <option value="custom">自定义模板</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 收费标准配置 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    收费标准配置
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">按企业规模定价</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <span className="text-sm text-gray-700">小型企业</span>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue="5000" className="w-20 px-2 py-1 border rounded text-sm" />
                                    <span className="text-sm text-gray-600">元/年</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <span className="text-sm text-gray-700">中型企业</span>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue="15000" className="w-20 px-2 py-1 border rounded text-sm" />
                                    <span className="text-sm text-gray-600">元/年</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <span className="text-sm text-gray-700">大型企业</span>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue="50000" className="w-20 px-2 py-1 border rounded text-sm" />
                                    <span className="text-sm text-gray-600">元/年</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">单项服务定价</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <span className="text-sm text-gray-700">风险监测</span>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue="2000" className="w-20 px-2 py-1 border rounded text-sm" />
                                    <span className="text-sm text-gray-600">元/月</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <span className="text-sm text-gray-700">尽职调查</span>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue="8000" className="w-20 px-2 py-1 border rounded text-sm" />
                                    <span className="text-sm text-gray-600">元/次</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <span className="text-sm text-gray-700">税务规划</span>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue="3000" className="w-20 px-2 py-1 border rounded text-sm" />
                                    <span className="text-sm text-gray-600">元/月</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">折扣优惠</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">批量折扣</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>10家以上9折</option>
                                    <option>20家以上8.5折</option>
                                    <option>50家以上8折</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">长期合作折扣</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>2年合同9.5折</option>
                                    <option>3年合同9折</option>
                                    <option>5年合同8.5折</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">新客户优惠</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>首年8折</option>
                                    <option>首月免费</option>
                                    <option>免费试用3个月</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 工作流程配置 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    工作流程配置
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">任务分配规则</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">自动分配方式</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>按工作量平均分配</option>
                                    <option>按专业领域分配</option>
                                    <option>按客户重要程度分配</option>
                                    <option>手动分配</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">优先级处理</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="ml-2 text-sm text-gray-600">高优先级任务优先处理</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded" />
                                        <span className="ml-2 text-sm text-gray-600">紧急任务即时通知</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">质量控制</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">审核流程</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>一级审核</option>
                                    <option>二级审核</option>
                                    <option>三级审核</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">抽查比例</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    defaultValue="30"
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-600">30%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 报告与通知设置 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-orange-600" />
                    报告与通知设置
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">自动报告</h4>
                        <div className="space-y-3">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" defaultChecked />
                                <span className="ml-2 text-sm text-gray-600">每周风险监测报告</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" defaultChecked />
                                <span className="ml-2 text-sm text-gray-600">月度财务分析报告</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" />
                                <span className="ml-2 text-sm text-gray-600">季度税务合规报告</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" />
                                <span className="ml-2 text-sm text-gray-600">年度综合评估报告</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">预警通知</h4>
                        <div className="space-y-3">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" defaultChecked />
                                <span className="ml-2 text-sm text-gray-600">高风险预警</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" defaultChecked />
                                <span className="ml-2 text-sm text-gray-600">税务申报提醒</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" />
                                <span className="ml-2 text-sm text-gray-600">合规截止日期提醒</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded" />
                                <span className="ml-2 text-sm text-gray-600">异常数据警报</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* 团队管理 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                    团队管理设置
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">团队架构</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">高级合伙人</p>
                                    <p className="text-xs text-gray-500">负责重大项目决策</p>
                                </div>
                                <span className="text-sm text-gray-600">2人</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">项目经理</p>
                                    <p className="text-xs text-gray-500">负责项目执行管理</p>
                                </div>
                                <span className="text-sm text-gray-600">5人</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">专业顾问</p>
                                    <p className="text-xs text-gray-500">负责具体业务执行</p>
                                </div>
                                <span className="text-sm text-gray-600">15人</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">权限设置</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">客户信息访问</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>按项目组权限</option>
                                    <option>按级别权限</option>
                                    <option>全员可见</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">报告审批权限</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>项目经理以上</option>
                                    <option>高级合伙人</option>
                                    <option>指定审批人</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">数据修改权限</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>仅创建者可修改</option>
                                    <option>项目组成员可修改</option>
                                    <option>需要审批后修改</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 新的用户设置页面
    const renderUserSettings = () => (
        <div className="space-y-6">
            {/* 用户管理概览 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-blue-600" />
                    用户管理中心
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <UserCheck className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{allUsers.filter(u => u.status === 'active').length}</p>
                        <p className="text-sm text-gray-600">活跃用户</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Building className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{allUsers.filter(u => u.userType === 'enterprise').length}</p>
                        <p className="text-sm text-gray-600">企业用户</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Building2 className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-purple-600">{allUsers.filter(u => u.userType === 'accounting' || u.userType === 'group').length}</p>
                        <p className="text-sm text-gray-600">专业用户</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-orange-600">{userTypeApplications.filter(app => app.status === 'pending').length}</p>
                        <p className="text-sm text-gray-600">待审核申请</p>
                    </div>
                </div>
            </div>

            {/* 批量操作工具栏 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    批量用户操作
                </h3>
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                        已选择 <span className="font-bold">{selectedUsers.length}</span> 个用户进行批量操作
                        {selectedUsers.length > 0 && (
                            <button
                                onClick={() => setSelectedUsers([])}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                                清空选择
                            </button>
                        )}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={handleBatchUserTypeChange}
                        className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Building2 className="h-5 w-5 mr-2" />
                        批量更改类型
                    </button>
                    <button
                        onClick={handleBatchStatusChange}
                        className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <UserCheck className="h-5 w-5 mr-2" />
                        批量更改状态
                    </button>
                    <button
                        onClick={handleBatchPermissionChange}
                        className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Shield className="h-5 w-5 mr-2" />
                        批量权限设置
                    </button>
                    <button
                        onClick={handleBatchPasswordReset}
                        className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        <Key className="h-5 w-5 mr-2" />
                        批量重置密码
                    </button>
                </div>
            </div>

            {/* 用户列表 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-blue-600" />
                        用户列表管理
                    </h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                setModalType('add');
                                setShowUserModal(true);
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            添加用户
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <Download className="h-4 w-4 mr-2" />
                            导出用户
                        </button>
                    </div>
                </div>

                {/* 搜索和筛选 */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索用户名、姓名或邮箱..."
                            value={userSearchTerm}
                            onChange={(e) => setUserSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="h-5 w-5 text-gray-400" />
                        <select
                            value={userTypeFilter}
                            onChange={(e) => setUserTypeFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">全部类型</option>
                            <option value="enterprise">企业用户</option>
                            <option value="accounting">事务所用户</option>
                            <option value="group">集团用户</option>
                        </select>
                        <select
                            value={userStatusFilter}
                            onChange={(e) => setUserStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">全部状态</option>
                            <option value="active">活跃</option>
                            <option value="inactive">未激活</option>
                            <option value="suspended">暂停</option>
                        </select>
                    </div>
                </div>

                {/* 用户表格 */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={handleSelectAllUsers}
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户信息</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户类型</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">公司信息</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">权限</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">最后登录</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => {
                                const typeInfo = getUserTypeInfo(user.userType);
                                const statusInfo = getStatusInfo(user.status);
                                const TypeIcon = typeInfo.icon;

                                return (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleUserSelect(user.id)}
                                            />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                    <p className="text-xs text-gray-400">@{user.username}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center">
                                                <TypeIcon className={`h-5 w-5 mr-2 text-${typeInfo.color}-600`} />
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded bg-${typeInfo.color}-100 text-${typeInfo.color}-800`}>
                                                    {typeInfo.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="text-sm text-gray-900">{user.company}</p>
                                                <p className="text-xs text-gray-500">{user.role}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
                                                {statusInfo.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="max-w-xs">
                                                {user.permissions.slice(0, 2).map((permission, index) => (
                                                    <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                                                        {permission}
                                                    </span>
                                                ))}
                                                {user.permissions.length > 2 && (
                                                    <span className="text-xs text-gray-500">+{user.permissions.length - 2}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {new Date(user.lastLogin).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setModalType('edit');
                                                        setShowUserModal(true);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="编辑用户"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setModalType('resetPassword');
                                                        setShowUserModal(true);
                                                    }}
                                                    className="text-orange-600 hover:text-orange-800"
                                                    title="重置密码"
                                                >
                                                    <Key className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setModalType('changeStatus');
                                                        setShowUserModal(true);
                                                    }}
                                                    className="text-green-600 hover:text-green-800"
                                                    title="更改状态"
                                                >
                                                    <UserCheck className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    title="删除用户"
                                                    onClick={() => {
                                                        if (window.confirm('确定要删除这个用户吗？')) {
                                                            setAllUsers(prev => prev.filter(u => u.id !== user.id));
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 用户类型变更申请管理 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-purple-600" />
                    用户类型变更申请管理
                </h3>
                <div className="space-y-4">
                    {userTypeApplications.map((application) => {
                        const currentTypeInfo = getUserTypeInfo(application.currentType);
                        const targetTypeInfo = getUserTypeInfo(application.targetType);

                        return (
                            <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-4 mb-2">
                                            <span className="font-medium text-gray-900">{application.userName}</span>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded bg-${currentTypeInfo.color}-100 text-${currentTypeInfo.color}-800`}>
                                                    {currentTypeInfo.label}
                                                </span>
                                                <span className="text-gray-400">→</span>
                                                <span className={`px-2 py-1 text-xs rounded bg-${targetTypeInfo.color}-100 text-${targetTypeInfo.color}-800`}>
                                                    {targetTypeInfo.label}
                                                </span>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                application.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {application.status === 'pending' ? '待审核' :
                                                    application.status === 'approved' ? '已批准' : '已拒绝'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">申请理由：{application.reason}</p>
                                        <p className="text-xs text-gray-500">申请时间：{application.applyTime}</p>
                                        {application.rejectReason && (
                                            <p className="text-xs text-red-600 mt-1">拒绝理由：{application.rejectReason}</p>
                                        )}
                                    </div>
                                    {application.status === 'pending' && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleApproveApplication(application.id)}
                                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                            >
                                                批准
                                            </button>
                                            <button
                                                onClick={() => handleRejectApplication(application.id)}
                                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                            >
                                                拒绝
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {userTypeApplications.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            暂无用户类型变更申请
                        </div>
                    )}
                </div>
            </div>

            {/* 模态框 */}
            {showUserModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {modalType === 'batchChangeType' && '批量更改用户类型'}
                            {modalType === 'batchChangeStatus' && '批量更改用户状态'}
                            {modalType === 'batchChangePermission' && '批量权限设置'}
                            {modalType === 'add' && '添加新用户'}
                            {modalType === 'edit' && '编辑用户信息'}
                            {modalType === 'resetPassword' && '重置用户密码'}
                            {modalType === 'changeStatus' && '更改用户状态'}
                        </h3>

                        {modalType === 'batchChangeType' && (
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    即将更改 {selectedUsers.length} 个用户的类型
                                </p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">目标用户类型</label>
                                    <select
                                        value={batchOperationForm.userType}
                                        onChange={(e) => setBatchOperationForm({ ...batchOperationForm, userType: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">请选择</option>
                                        <option value="enterprise">企业用户</option>
                                        <option value="accounting">事务所用户</option>
                                        <option value="group">集团用户</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {modalType === 'batchChangeStatus' && (
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    即将更改 {selectedUsers.length} 个用户的状态
                                </p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">目标状态</label>
                                    <select
                                        value={batchOperationForm.status}
                                        onChange={(e) => setBatchOperationForm({ ...batchOperationForm, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">请选择</option>
                                        <option value="active">活跃</option>
                                        <option value="inactive">未激活</option>
                                        <option value="suspended">暂停</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {modalType === 'resetPassword' && selectedUser && (
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    确定要重置用户 <span className="font-medium">{selectedUser.name}</span> 的密码吗？
                                </p>
                                <p className="text-xs text-gray-500">
                                    新密码将发送到用户邮箱：{selectedUser.email}
                                </p>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowUserModal(false);
                                    setSelectedUser(null);
                                    setBatchOperationForm({ userType: '', status: '', permissions: [], company: '' });
                                }}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                取消
                            </button>
                            <button
                                onClick={() => {
                                    if (modalType === 'resetPassword' && selectedUser) {
                                        alert(`密码重置成功，新密码已发送到 ${selectedUser.email}`);
                                        setShowUserModal(false);
                                        setSelectedUser(null);
                                    } else {
                                        executeBatchOperation();
                                    }
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                确认
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* 标签页导航 */}
                <div className="bg-white rounded-lg shadow-sm border mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('single')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'single'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                基础设置
                            </button>
                            <button
                                onClick={() => setActiveTab('firm')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'firm'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                服务设置
                            </button>
                            <button
                                onClick={() => setActiveTab('user')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'user'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                用户管理
                            </button>
                        </nav>
                    </div>
                </div>

                {/* 内容区域 */}
                {activeTab === 'single' ? renderSingleUserSettings() :
                    activeTab === 'firm' ? renderFirmSettings() :
                        renderUserSettings()}
            </div>
        </div>
    );
};

export default Settings;