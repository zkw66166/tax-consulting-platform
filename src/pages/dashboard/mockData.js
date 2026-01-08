import {
    Brain, Database, Radar, Workflow, FileBarChart
} from 'lucide-react';

export const mockData = {
    // 企业智能画像核心数据
    enterprisePortrait: {
        profileStatus: '已完成',
        lastUpdate: '2024-01-15 09:30',
        completeness: 96.8,
        dataQuality: 94.2,
        riskScore: 75,
        complianceScore: 92,
        financialHealth: 88,
        taxEfficiency: 76
    },

    // 数据源状态
    dataSourceStatus: {
        businessRegistration: { status: '已导入', lastUpdate: '2024-01-10', completeness: 100 },
        financialStatements: { status: '已导入', lastUpdate: '2024-01-15', completeness: 98 },
        taxReturns: { status: '已导入', lastUpdate: '2024-01-12', completeness: 95 },
        invoiceData: { status: '已导入', lastUpdate: '2024-01-14', completeness: 92 },
        accountingData: { status: '已导入', lastUpdate: '2024-01-13', completeness: 88 },
        subjectBalance: { status: '已导入', lastUpdate: '2024-01-11', completeness: 90 }
    },

    // 智能分析结果
    intelligentAnalysis: {
        financialAnalysis: {
            profitability: 85,
            liquidity: 78,
            solvency: 82,
            efficiency: 76,
            growth: 68,
            trend: 'improving'
        },
        taxRiskDetection: {
            overallRisk: 75,
            vatRisk: 68,
            citRisk: 82,
            invoiceRisk: 55,
            complianceRisk: 70,
            riskTrend: 'stable'
        },
        optimizationOpportunities: {
            taxSavingPotential: 156000,
            processOptimization: 8,
            structureOptimization: 3,
            budgetOptimization: 5
        }
    },

    // 自动化方案生成状态
    automatedSolutions: {
        taxPlanningSchemes: 3,
        financialOptimizations: 5,
        budgetOptimizations: 2,
        equityOptimizations: 1,
        riskMitigations: 7
    },

    // 重新设计的最新动态 - 更符合智能分析特点
    recentActivities: [
        {
            type: '智能画像',
            content: '企业财税画像更新完成，发现3个优化机会',
            time: '30分钟前',
            important: true,
            module: 'portraitAnalysis',
            action: '查看画像',
            icon: Brain
        },
        {
            type: '风险检测',
            content: '基于科目余额表检测到进项税额抵扣异常',
            time: '2小时前',
            important: true,
            module: 'riskDetection',
            action: '查看详情',
            icon: Radar
        },
        {
            type: '方案生成',
            content: '自动生成研发费用加计扣除优化方案',
            time: '4小时前',
            important: false,
            module: 'taxPlanning',
            action: '查看方案',
            icon: Workflow
        },
        {
            type: '数据同步',
            content: '发票数据实时同步完成，新增1,268张发票',
            time: '6小时前',
            important: false,
            module: 'dataSync',
            action: '查看数据',
            icon: Database
        },
        {
            type: '财务分析',
            content: '月度财务健康度分析完成，综合评分88分',
            time: '1天前',
            important: false,
            module: 'financialAnalysis',
            action: '查看分析',
            icon: FileBarChart
        }
    ],

    // 重新设计的待办事项 - 更符合智能平台特点
    todoItems: [
        {
            id: 1,
            title: '审核智能生成的税务筹划方案',
            description: '系统基于最新财务数据自动生成了研发费用优化方案',
            deadline: '2024-01-18',
            priority: 'high',
            status: 'pending',
            category: 'schemeReview',
            estimatedTime: '45分钟',
            aiGenerated: true,
            potentialSaving: 85000,
            module: 'taxPlanning'
        },
        {
            id: 2,
            title: '确认发票数据异常处理',
            description: '智能检测发现156张发票存在税率适用异常',
            deadline: '2024-01-16',
            priority: 'urgent',
            status: 'pending',
            category: 'dataValidation',
            estimatedTime: '2小时',
            aiGenerated: true,
            affectedAmount: 234500,
            module: 'invoiceAnalysis'
        },
        {
            id: 3,
            title: '完善科目余额表数据',
            description: '部分科目数据缺失，影响财务分析准确性',
            deadline: '2024-01-20',
            priority: 'medium',
            status: 'pending',
            category: 'dataCompletion',
            estimatedTime: '1.5小时',
            aiGenerated: false,
            completeness: 88,
            module: 'dataManagement'
        },
        {
            id: 4,
            title: '查看股权结构优化建议',
            description: '基于企业发展阶段和税负分析生成的结构优化方案',
            deadline: '2024-01-25',
            priority: 'medium',
            status: 'pending',
            category: 'structureOptimization',
            estimatedTime: '1小时',
            aiGenerated: true,
            optimizationPoints: 3,
            module: 'equityOptimization'
        },
        {
            id: 5,
            title: '更新企业登记信息',
            description: '企业经营范围变更，需更新基础画像数据',
            deadline: '2024-01-22',
            priority: 'low',
            status: 'pending',
            category: 'profileUpdate',
            estimatedTime: '30分钟',
            aiGenerated: false,
            impactLevel: 'medium',
            module: 'enterpriseProfile'
        }
    ],

    // 重新设计的消息通知 - 更符合智能分析特点
    notifications: [
        {
            id: 1,
            type: 'ai_alert',
            title: '智能风险预警',
            content: '基于纳税申报数据分析，检测到您的增值税税负率异常偏低，存在补税风险',
            time: '1小时前',
            priority: 'high',
            module: 'riskAnalysis',
            actionText: '查看分析报告',
            read: false,
            confidence: 92,
            riskLevel: 'high'
        },
        {
            id: 2,
            type: 'scheme_ready',
            title: '智能方案生成完成',
            content: '基于您的财务报表和税务数据，生成了新的纳税筹划方案，预计节税12.8万元',
            time: '3小时前',
            priority: 'high',
            module: 'taxPlanning',
            actionText: '查看方案',
            read: false,
            savingAmount: 128000,
            confidence: 89
        },
        {
            id: 3,
            type: 'data_anomaly',
            title: '数据异常提醒',
            content: '发票数据中发现68张发票的开票信息与财务入账信息不匹配',
            time: '5小时前',
            priority: 'medium',
            module: 'dataValidation',
            actionText: '处理异常',
            read: false,
            affectedCount: 68,
            riskLevel: 'medium'
        },
        {
            id: 4,
            type: 'analysis_complete',
            title: '财务健康度分析完成',
            content: '本月财务健康度评分88分，较上月提升3分，现金流状况良好',
            time: '8小时前',
            priority: 'low',
            module: 'financialHealth',
            actionText: '查看详情',
            read: true,
            score: 88,
            improvement: 3
        },
        {
            id: 5,
            type: 'optimization_suggestion',
            title: '智能优化建议',
            content: '基于同行业对比分析，建议优化应收账款周转率，可提升资金效率15%',
            time: '12小时前',
            priority: 'medium',
            module: 'financialOptimization',
            actionText: '查看建议',
            read: false,
            improvementRate: 15,
            confidence: 86
        },
        {
            id: 6,
            type: 'portrait_update',
            title: '企业画像更新',
            content: '基于最新数据更新了企业财税画像，识别出2个新的税务优化机会',
            time: '1天前',
            priority: 'medium',
            module: 'enterprisePortrait',
            actionText: '查看画像',
            read: true,
            opportunities: 2,
            completeness: 96.8
        }
    ],

    // 历史报告数据 - 更新为智能分析报告
    historicalReports: {
        portraitAnalysis: [
            { id: 1, name: '2024年1月企业财税智能画像报告', date: '2024-01-15', type: 'portrait', completeness: 96.8 },
            { id: 2, name: '2023年度企业画像综合分析', date: '2023-12-30', type: 'portrait', completeness: 94.2 },
            { id: 3, name: '第四季度画像对比分析', date: '2023-12-15', type: 'portrait', completeness: 92.5 }
        ],
        riskDetection: [
            { id: 4, name: '2024年1月智能税务风险检测报告', date: '2024-01-15', type: 'risk', riskCount: 12 },
            { id: 5, name: '发票数据风险专项分析', date: '2024-01-10', type: 'risk', riskCount: 8 },
            { id: 6, name: '纳税申报合规性检测', date: '2024-01-05', type: 'risk', riskCount: 15 }
        ],
        taxPlanning: [
            { id: 7, name: '2024年智能税务筹划方案', date: '2024-01-08', type: 'planning', savingAmount: 156000 },
            { id: 8, name: '研发费用加计扣除优化方案', date: '2023-12-20', type: 'planning', savingAmount: 89000 },
            { id: 9, name: '企业所得税优化建议', date: '2023-12-10', type: 'planning', savingAmount: 67000 }
        ],
        financialAnalysis: [
            { id: 10, name: '2024年1月财务健康度分析', date: '2024-01-12', type: 'financial', score: 88 },
            { id: 11, name: '现金流分析与优化建议', date: '2024-01-08', type: 'financial', score: 82 },
            { id: 12, name: '盈利能力对比分析', date: '2024-01-05', type: 'financial', score: 85 }
        ],
        budgetOptimization: [
            { id: 13, name: '2024年度预算优化方案', date: '2024-01-01', type: 'budget', optimizationRate: 12 },
            { id: 14, name: '成本结构分析与建议', date: '2023-12-25', type: 'budget', optimizationRate: 8 },
            { id: 15, name: '资金配置效率优化', date: '2023-12-20', type: 'budget', optimizationRate: 15 }
        ],
        equityOptimization: [
            { id: 16, name: '股权结构税务优化分析', date: '2024-01-03', type: 'equity', optimizationPoints: 3 },
            { id: 17, name: '股权激励方案税务影响', date: '2023-12-15', type: 'equity', optimizationPoints: 2 },
            { id: 18, name: '控制权与税负平衡方案', date: '2023-12-01', type: 'equity', optimizationPoints: 4 }
        ]
    }
};

export const managedCompanies = [
    { id: 1, name: '示例科技有限公司', code: '91110000MA001234XY', status: '正常', riskLevel: '中', hasData: true, type: '高新技术企业', portraitStatus: '已完成' },
    { id: 2, name: '创新软件股份公司', code: '91110000MA001235XY', status: '正常', riskLevel: '低', hasData: true, type: '软件企业', portraitStatus: '已完成' },
    { id: 3, name: '智能制造有限公司', code: '91110000MA001236XY', status: '异常', riskLevel: '高', hasData: false, type: '制造企业', portraitStatus: '数据不足' },
    { id: 4, name: '绿色能源集团', code: '91110000MA001237XY', status: '正常', riskLevel: '低', hasData: true, type: '能源企业', portraitStatus: '分析中' },
    { id: 5, name: '数字科技发展公司', code: '91110000MA001238XY', status: '正常', riskLevel: '中', hasData: true, type: '科技企业', portraitStatus: '已完成' }
];