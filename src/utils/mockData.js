export const managedCompanies = [
    { id: 1, name: '大华科技有限公司', code: '91110000MA001234XY', status: '正常', riskLevel: '中', hasData: true, type: '高新技术企业' },
    { id: 2, name: '创新软件股份公司', code: '91110000MA001235XY', status: '正常', riskLevel: '低', hasData: true, type: '软件企业' },
    { id: 3, name: '智能制造有限公司', code: '91110000MA001236XY', status: '异常', riskLevel: '高', hasData: false, type: '制造企业' },
    { id: 4, name: '绿色能源集团', code: '91110000MA001237XY', status: '正常', riskLevel: '低', hasData: true, type: '能源企业' },
    { id: 5, name: '数字科技发展公司', code: '91110000MA001238XY', status: '正常', riskLevel: '中', hasData: true, type: '科技企业' }
];

export const mockData = {
    companyInfo: {
        name: '大华科技有限公司',
        code: '91110000MA001234XY',
        industry: '软件和信息技术服务业',
        taxStatus: '一般纳税人',
        scale: '中型企业',
        address: '北京市海淀区中关村软件园',
        legalPerson: '张明',
        establishDate: '2018-05-15',
        registeredCapital: '1000万元',
        employees: 156,
        annualRevenue: '3800万元'
    },
    taxMetrics: {
        vatRate: 13.2,
        citRate: 8.5,
        overallRate: 21.7,
        industryAvg: 18.3,
        monthlyTax: 185000,
        yearlyTax: 2340000,
        taxSaving: 156000
    },
    riskItems: [
        { type: '增值税', issue: '税负率异常偏高（13.2% vs 行业均值8.5%）', level: '中风险', score: 75, date: '2024-12-15' },
        { type: '企业所得税', issue: '业务招待费扣除超标', level: '低风险', score: 45, date: '2024-12-14' },
        { type: '发票管理', issue: '发票开具规范性问题', level: '高风险', score: 85, date: '2024-12-13' },
        { type: '印花税', issue: '合同印花税申报遗漏', level: '中风险', score: 60, date: '2024-12-12' }
    ],
    recentActivities: [
        { type: '政策更新', content: '研发费用加计扣除比例调整至200%', time: '2小时前', important: true },
        { type: '风险提醒', content: '发现3项税务风险需要关注', time: '4小时前', important: false },
        { type: '方案完成', content: '高新技术企业认定方案生成完毕', time: '6小时前', important: false },
        { type: '数据同步', content: '财务数据已同步更新', time: '1天前', important: false }
    ]
};

export const consultKnowledge = [
    {
        category: '法规',
        subcategories: [
            {
                name: '基础法规',
                topics: ['税收征管法', '会计法', '公司法', '证券法']
            },
            {
                name: '税务',
                subtopics: [
                    { name: '增值税', items: ['税率适用', '抵扣规则', '免税政策', '出口退税'] },
                    { name: '企业所得税', items: ['税前扣除', '优惠政策', '汇算清缴', '境外所得'] },
                    { name: '个人所得税', items: ['专项扣除', '汇算清缴', '税率结构', '境外所得'] },
                    { name: '其他税费', items: ['消费税', '印花税', '房产税', '土地使用税'] }
                ]
            }
        ],
        icon: 'BookOpen',
        color: 'blue'
    }
];

export const sidebarItems = [
    { id: 'dashboard', label: '工作台', icon: 'Home' },
    { id: 'ai-answer', label: 'AI智问', icon: 'Search' },
    { id: 'profile', label: '企业画像', icon: 'Building' },
    { id: 'risk', label: '风险检测', icon: 'AlertTriangle' },
    { id: 'consulting', label: '智能咨询', icon: 'TrendingUp' },
    { id: 'data', label: '数据管理', icon: 'Database' },
    { id: 'reports', label: '报告中心', icon: 'FileText' },
    { id: 'settings', label: '系统设置', icon: 'Settings' }
];

// 专业用户（事务所用户和集团企业用户）的侧边栏菜单
export const professionalSidebarItems = [
    { id: 'risk', label: '风险检测', icon: 'AlertTriangle' },
    { id: 'financial-analysis', label: '财务分析', icon: 'BarChart3' },
    { id: 'tax-verification', label: '税务鉴证', icon: 'FileText' },
    { id: 'due-diligence', label: '财务尽职调查', icon: 'Search' },
    { id: 'tax-planning', label: '税务合规规划', icon: 'TrendingUp' },
    { id: 'equity-optimization', label: '股权架构优化', icon: 'Users' },
    { id: 'finance-optimization', label: '财务体系优化', icon: 'Building' },
    { id: 'budget-optimization', label: '预算管理优化', icon: 'PieChart' },
    { id: 'data', label: '数据管理', icon: 'Database' },
    { id: 'settings', label: '系统设置', icon: 'Settings' }
];