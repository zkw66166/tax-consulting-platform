import React, { useState } from 'react';
import {
    Calculator,
    Search,
    Star,
    BookOpen,
    Share,
    Lightbulb,
    X,
    Check,
    Download,
    Save,
    RotateCcw,
    Upload,
    BarChart3,
    DollarSign,
    AlertTriangle,
    Shield,
    TrendingUp,
    TrendingDown,
    Activity,
    Target,
    Building,
    Droplets,
    LineChart,
    BarChart2,
    ScatterChart,
    Briefcase,
    CreditCard,
    Settings,
    Monitor,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

const AnalysisToolsModule = () => {
    // 分析工具相关状态
    const [activeToolCategory, setActiveToolCategory] = useState('basic');
    const [selectedTool, setSelectedTool] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [toolInputs, setToolInputs] = useState({});
    const [toolResults, setToolResults] = useState({});
    const [favoriteTools, setFavoriteTools] = useState(['dupont', 'dcf', 'ratio']);

    // 完整的分析工具配置
    const analysisTools = {
        basic: {
            name: '基础分析工具',
            description: '常用的财务分析基础工具',
            tools: [
                {
                    id: 'ratio',
                    name: '财务比率分析器',
                    description: '计算和分析各类财务比率',
                    icon: Calculator,
                    category: 'basic',
                    difficulty: 'easy',
                    subCategories: {
                        solvency: {
                            name: '偿债能力比率',
                            description: '衡量企业偿还债务的能力',
                            ratios: [
                                {
                                    id: 'current_ratio',
                                    name: '流动比率',
                                    formula: '流动资产 / 流动负债',
                                    inputs: ['流动资产', '流动负债'],
                                    benchmark: '一般为1.5-2.0较好'
                                },
                                {
                                    id: 'quick_ratio',
                                    name: '速动比率',
                                    formula: '(流动资产 - 存货) / 流动负债',
                                    inputs: ['流动资产', '存货', '流动负债'],
                                    benchmark: '一般为1.0左右较好'
                                },
                                {
                                    id: 'cash_ratio',
                                    name: '现金比率',
                                    formula: '(货币资金 + 短期投资) / 流动负债',
                                    inputs: ['货币资金', '短期投资', '流动负债'],
                                    benchmark: '一般为0.2-0.3较好'
                                },
                                {
                                    id: 'debt_ratio',
                                    name: '资产负债率',
                                    formula: '总负债 / 总资产',
                                    inputs: ['总负债', '总资产'],
                                    benchmark: '一般低于60%较好'
                                },
                                {
                                    id: 'equity_ratio',
                                    name: '权益比率',
                                    formula: '股东权益 / 总资产',
                                    inputs: ['股东权益', '总资产'],
                                    benchmark: '与资产负债率互补'
                                }
                            ]
                        },
                        profitability: {
                            name: '盈利能力比率',
                            description: '衡量企业获取利润的能力',
                            ratios: [
                                {
                                    id: 'gross_margin',
                                    name: '毛利率',
                                    formula: '(营业收入 - 营业成本) / 营业收入',
                                    inputs: ['营业收入', '营业成本'],
                                    benchmark: '因行业而异，一般越高越好'
                                },
                                {
                                    id: 'net_margin',
                                    name: '净利率',
                                    formula: '净利润 / 营业收入',
                                    inputs: ['净利润', '营业收入'],
                                    benchmark: '一般5%-20%较好'
                                },
                                {
                                    id: 'roe',
                                    name: '净资产收益率(ROE)',
                                    formula: '净利润 / 股东权益',
                                    inputs: ['净利润', '股东权益'],
                                    benchmark: '一般15%以上较好'
                                },
                                {
                                    id: 'roa',
                                    name: '总资产收益率(ROA)',
                                    formula: '净利润 / 总资产',
                                    inputs: ['净利润', '总资产'],
                                    benchmark: '一般5%以上较好'
                                },
                                {
                                    id: 'eps',
                                    name: '每股收益(EPS)',
                                    formula: '净利润 / 发行股数',
                                    inputs: ['净利润', '发行股数'],
                                    benchmark: '同比增长为正'
                                }
                            ]
                        },
                        efficiency: {
                            name: '营运能力比率',
                            description: '衡量企业资产运营效率',
                            ratios: [
                                {
                                    id: 'inventory_turnover',
                                    name: '存货周转率',
                                    formula: '营业成本 / 平均存货',
                                    inputs: ['营业成本', '期初存货', '期末存货'],
                                    benchmark: '越高越好，因行业而异'
                                },
                                {
                                    id: 'receivables_turnover',
                                    name: '应收账款周转率',
                                    formula: '营业收入 / 平均应收账款',
                                    inputs: ['营业收入', '期初应收账款', '期末应收账款'],
                                    benchmark: '越高越好'
                                },
                                {
                                    id: 'asset_turnover',
                                    name: '总资产周转率',
                                    formula: '营业收入 / 平均总资产',
                                    inputs: ['营业收入', '期初总资产', '期末总资产'],
                                    benchmark: '一般1次以上较好'
                                },
                                {
                                    id: 'payables_turnover',
                                    name: '应付账款周转率',
                                    formula: '营业成本 / 平均应付账款',
                                    inputs: ['营业成本', '期初应付账款', '期末应付账款'],
                                    benchmark: '适中为好'
                                }
                            ]
                        },
                        growth: {
                            name: '发展能力比率',
                            description: '衡量企业成长性和发展潜力',
                            ratios: [
                                {
                                    id: 'revenue_growth',
                                    name: '营业收入增长率',
                                    formula: '(本期营业收入 - 上期营业收入) / 上期营业收入',
                                    inputs: ['本期营业收入', '上期营业收入'],
                                    benchmark: '正增长且稳定'
                                },
                                {
                                    id: 'profit_growth',
                                    name: '净利润增长率',
                                    formula: '(本期净利润 - 上期净利润) / 上期净利润',
                                    inputs: ['本期净利润', '上期净利润'],
                                    benchmark: '正增长且稳定'
                                },
                                {
                                    id: 'asset_growth',
                                    name: '总资产增长率',
                                    formula: '(期末总资产 - 期初总资产) / 期初总资产',
                                    inputs: ['期末总资产', '期初总资产'],
                                    benchmark: '与业务增长匹配'
                                },
                                {
                                    id: 'equity_growth',
                                    name: '净资产增长率',
                                    formula: '(期末净资产 - 期初净资产) / 期初净资产',
                                    inputs: ['期末净资产', '期初净资产'],
                                    benchmark: '稳定增长'
                                }
                            ]
                        },
                        cashflow: {
                            name: '现金流量比率',
                            description: '衡量企业现金流状况',
                            ratios: [
                                {
                                    id: 'operating_cash_ratio',
                                    name: '经营现金流比率',
                                    formula: '经营活动现金流 / 流动负债',
                                    inputs: ['经营活动现金流', '流动负债'],
                                    benchmark: '大于1较好'
                                },
                                {
                                    id: 'cash_coverage',
                                    name: '现金覆盖率',
                                    formula: '经营活动现金流 / 净利润',
                                    inputs: ['经营活动现金流', '净利润'],
                                    benchmark: '大于1较好'
                                },
                                {
                                    id: 'cash_debt_ratio',
                                    name: '现金负债比',
                                    formula: '经营活动现金流 / 总负债',
                                    inputs: ['经营活动现金流', '总负债'],
                                    benchmark: '越高越好'
                                },
                                {
                                    id: 'free_cash_flow',
                                    name: '自由现金流',
                                    formula: '经营活动现金流 - 资本支出',
                                    inputs: ['经营活动现金流', '资本支出'],
                                    benchmark: '为正且增长'
                                }
                            ]
                        }
                    }
                },
                {
                    id: 'dupont',
                    name: '杜邦分析系统',
                    description: 'ROE分解与驱动因子分析',
                    icon: BarChart3,
                    category: 'basic',
                    difficulty: 'easy',
                    subCategories: {
                        three_factor: {
                            name: '三因子杜邦分析',
                            description: 'ROE = 净利率 × 资产周转率 × 权益乘数',
                            inputs: ['净利润', '营业收入', '总资产', '股东权益']
                        },
                        five_factor: {
                            name: '五因子杜邦分析',
                            description: '更详细的ROE分解',
                            inputs: ['净利润', '税前利润', '息税前利润', '营业收入', '总资产', '股东权益']
                        }
                    }
                },
                {
                    id: 'cashflow_analysis',
                    name: '现金流分析器',
                    description: '现金流质量与结构分析',
                    icon: Droplets,
                    category: 'basic',
                    difficulty: 'medium',
                    subCategories: {
                        structure: {
                            name: '现金流结构分析',
                            description: '分析三大现金流的结构和质量',
                            inputs: ['经营活动现金流', '投资活动现金流', '筹资活动现金流']
                        },
                        quality: {
                            name: '现金流质量分析',
                            description: '评估现金流的质量和可持续性',
                            inputs: ['经营活动现金流', '净利润', '资本支出', '股利支付']
                        }
                    }
                },
                {
                    id: 'trend',
                    name: '趋势分析工具',
                    description: '多期财务数据趋势分析',
                    icon: LineChart,
                    category: 'basic',
                    difficulty: 'medium',
                    subCategories: {
                        revenue_trend: {
                            name: '收入趋势分析',
                            description: '分析收入变化趋势和增长模式',
                            inputs: ['第一期收入', '第二期收入', '第三期收入', '第四期收入', '第五期收入']
                        },
                        profit_trend: {
                            name: '利润趋势分析',
                            description: '分析利润变化趋势和盈利能力',
                            inputs: ['第一期利润', '第二期利润', '第三期利润', '第四期利润', '第五期利润']
                        }
                    }
                }
            ]
        },
        valuation: {
            name: '估值分析工具',
            description: '企业价值评估专业工具',
            tools: [
                {
                    id: 'dcf',
                    name: 'DCF估值模型',
                    description: '贴现现金流估值计算器',
                    icon: DollarSign,
                    category: 'valuation',
                    difficulty: 'hard',
                    subCategories: {
                        single_stage: {
                            name: '单阶段DCF模型',
                            description: '假设永续增长的简单DCF模型',
                            inputs: ['自由现金流', '增长率', '贴现率']
                        },
                        two_stage: {
                            name: '两阶段DCF模型',
                            description: '高增长期+稳定增长期模型',
                            inputs: ['初始自由现金流', '第一阶段增长率', '第一阶段年数', '第二阶段增长率', '贴现率']
                        },
                        fcfe: {
                            name: 'FCFE模型',
                            description: '股权自由现金流估值',
                            inputs: ['股权自由现金流', '股权增长率', '股权资本成本']
                        }
                    }
                },
                {
                    id: 'multiples',
                    name: '相对估值模型',
                    description: '市场倍数估值分析',
                    icon: BarChart2,
                    category: 'valuation',
                    difficulty: 'medium',
                    subCategories: {
                        pe_valuation: {
                            name: 'P/E估值',
                            description: '市盈率估值模型',
                            inputs: ['每股收益', '行业平均PE', '增长率调整系数']
                        },
                        pb_valuation: {
                            name: 'P/B估值',
                            description: '市净率估值模型',
                            inputs: ['每股净资产', '行业平均PB', 'ROE']
                        },
                        ev_ebitda: {
                            name: 'EV/EBITDA估值',
                            description: '企业价值倍数估值',
                            inputs: ['EBITDA', '行业平均EV_EBITDA倍数', '净债务']
                        }
                    }
                },
                {
                    id: 'dividend',
                    name: '股利贴现模型',
                    description: '基于股利的价值评估',
                    icon: TrendingUp,
                    category: 'valuation',
                    difficulty: 'medium',
                    subCategories: {
                        gordon: {
                            name: '戈登增长模型',
                            description: '假设股利永续增长',
                            inputs: ['当期股利', '股利增长率', '要求回报率']
                        },
                        multi_stage: {
                            name: '多阶段股利模型',
                            description: '不同阶段不同增长率',
                            inputs: ['初始股利', '第一阶段增长率', '第一阶段年数', '第二阶段增长率', '要求回报率']
                        }
                    }
                },
                {
                    id: 'asset',
                    name: '资产基础估值',
                    description: '基于资产重置成本的估值',
                    icon: Building,
                    category: 'valuation',
                    difficulty: 'medium',
                    subCategories: {
                        book_value: {
                            name: '账面价值法',
                            description: '基于账面净资产的估值',
                            inputs: ['总资产', '总负债']
                        },
                        replacement_cost: {
                            name: '重置成本法',
                            description: '基于资产重置成本的估值',
                            inputs: ['总资产', '总负债', '重置成本调整系数']
                        }
                    }
                }
            ]
        },
        risk: {
            name: '风险评估工具',
            description: '财务风险识别与评估工具',
            tools: [
                {
                    id: 'zscore',
                    name: 'Z-Score破产预测',
                    description: 'Altman Z-Score破产风险评估',
                    icon: AlertTriangle,
                    category: 'risk',
                    difficulty: 'medium',
                    subCategories: {
                        original: {
                            name: '原始Z-Score模型',
                            description: '适用于制造业上市公司',
                            inputs: ['营运资本', '总资产', '留存收益', '息税前利润', '股票市值', '总负债', '销售收入']
                        },
                        modified: {
                            name: '修正Z-Score模型',
                            description: '适用于非上市公司',
                            inputs: ['营运资本', '总资产', '留存收益', '息税前利润', '账面价值', '总负债', '销售收入']
                        }
                    }
                },
                {
                    id: 'credit',
                    name: '信用风险评估',
                    description: '综合信用风险评级模型',
                    icon: Shield,
                    category: 'risk',
                    difficulty: 'hard',
                    subCategories: {
                        financial_score: {
                            name: '财务评分模型',
                            description: '基于财务指标的信用评分',
                            inputs: ['资产负债率', '流动比率', 'ROE', '利息保障倍数', '营业收入增长率']
                        },
                        comprehensive: {
                            name: '综合评估模型',
                            description: '包含定性和定量因素',
                            inputs: ['财务评分', '行业风险系数', '管理质量评分', '市场地位评分']
                        }
                    }
                },
                {
                    id: 'var',
                    name: 'VaR风险度量',
                    description: '在险价值计算与分析',
                    icon: TrendingDown,
                    category: 'risk',
                    difficulty: 'hard',
                    subCategories: {
                        parametric: {
                            name: '参数法VaR',
                            description: '基于正态分布假设的VaR计算',
                            inputs: ['投资金额', '预期收益率', '收益波动率', '置信水平', '持有期']
                        },
                        historical: {
                            name: '历史模拟法VaR',
                            description: '基于历史数据的VaR计算',
                            inputs: ['投资金额', '历史收益率方差', '置信水平', '持有期']
                        }
                    }
                },
                {
                    id: 'sensitivity',
                    name: '敏感性分析',
                    description: '关键变量敏感性测试',
                    icon: Activity,
                    category: 'risk',
                    difficulty: 'medium',
                    subCategories: {
                        single_factor: {
                            name: '单因子敏感性分析',
                            description: '分析单一变量的影响',
                            inputs: ['基准值', '敏感变量', '变化幅度', '影响系数']
                        },
                        scenario: {
                            name: '情景分析',
                            description: '多变量综合情景测试',
                            inputs: ['基准情景', '乐观情景调整', '悲观情景调整', '概率权重']
                        }
                    }
                }
            ]
        },
        advanced: {
            name: '高级分析工具',
            description: '专业级财务分析工具',
            tools: [
                {
                    id: 'monte',
                    name: '蒙特卡罗模拟',
                    description: '随机模拟与概率分析',
                    icon: ScatterChart,
                    category: 'advanced',
                    difficulty: 'hard',
                    subCategories: {
                        portfolio: {
                            name: '投资组合模拟',
                            description: '模拟投资组合收益分布',
                            inputs: ['期望收益率', '收益波动率', '模拟次数', '时间周期']
                        },
                        project: {
                            name: '项目评估模拟',
                            description: '项目NPV的概率分析',
                            inputs: ['初始投资', '年现金流均值', '现金流波动率', '贴现率', '项目年限']
                        }
                    }
                },
                {
                    id: 'options',
                    name: '期权定价模型',
                    description: 'Black-Scholes期权定价',
                    icon: TrendingUp,
                    category: 'advanced',
                    difficulty: 'hard',
                    subCategories: {
                        black_scholes: {
                            name: 'Black-Scholes模型',
                            description: '经典的期权定价模型',
                            inputs: ['标的价格', '执行价格', '无风险利率', '波动率', '到期时间']
                        },
                        binomial: {
                            name: '二叉树模型',
                            description: '离散时间的期权定价',
                            inputs: ['标的价格', '执行价格', '无风险利率', '波动率', '期数', '到期时间']
                        }
                    }
                },
                {
                    id: 'merger',
                    name: '并购分析工具',
                    description: '并购交易价值分析',
                    icon: Briefcase,
                    category: 'advanced',
                    difficulty: 'hard',
                    subCategories: {
                        accretion: {
                            name: '增值分析',
                            description: '分析并购对每股收益的影响',
                            inputs: ['收购方EPS', '目标方EPS', '收购价格', '支付方式比例', '协同效应']
                        },
                        synergy: {
                            name: '协同效应分析',
                            description: '评估并购的协同价值',
                            inputs: ['收入协同', '成本协同', '税务协同', '整合成本', '实现概率']
                        }
                    }
                },
                {
                    id: 'optimization',
                    name: '投资组合优化',
                    description: '基于现代投资组合理论的优化',
                    icon: Target,
                    category: 'advanced',
                    difficulty: 'hard',
                    subCategories: {
                        markowitz: {
                            name: 'Markowitz优化',
                            description: '经典的均值-方差优化',
                            inputs: ['资产A预期收益', '资产B预期收益', '资产A风险', '资产B风险', '相关系数']
                        },
                        risk_parity: {
                            name: '风险平价模型',
                            description: '等风险贡献的资产配置',
                            inputs: ['资产A波动率', '资产B波动率', '相关系数', '目标风险']
                        }
                    }
                }
            ]
        },
        industry: {
            name: '行业专用工具',
            description: '特定行业财务分析工具',
            tools: [
                {
                    id: 'banking',
                    name: '银行业分析工具',
                    description: '银行特有指标分析',
                    icon: CreditCard,
                    category: 'industry',
                    difficulty: 'medium',
                    subCategories: {
                        profitability: {
                            name: '银行盈利分析',
                            description: '分析银行盈利能力和效率',
                            inputs: ['净利息收入', '非利息收入', '营业费用', '拨备费用', '总资产', '净资产']
                        },
                        asset_quality: {
                            name: '资产质量分析',
                            description: '分析银行资产质量和风险',
                            inputs: ['贷款总额', '不良贷款', '拨备总额', '核销金额', '新增不良']
                        }
                    }
                },
                {
                    id: 'realestate',
                    name: '房地产分析工具',
                    description: '房地产行业专用分析',
                    icon: Building,
                    category: 'industry',
                    difficulty: 'medium',
                    subCategories: {
                        development: {
                            name: '开发项目分析',
                            description: '分析房地产开发项目',
                            inputs: ['土地成本', '建设成本', '销售价格', '开发周期', '销售周期']
                        },
                        investment: {
                            name: '投资物业分析',
                            description: '分析投资性房地产收益',
                            inputs: ['物业价值', '租金收入', '运营费用', '资本化率', '增值预期']
                        }
                    }
                },
                {
                    id: 'retail',
                    name: '零售业分析工具',
                    description: '零售连锁企业分析',
                    icon: Monitor,
                    category: 'industry',
                    difficulty: 'medium',
                    subCategories: {
                        store_analysis: {
                            name: '门店效率分析',
                            description: '分析单店运营效率',
                            inputs: ['店铺面积', '销售收入', '客流量', '客单价', '员工数量']
                        },
                        inventory: {
                            name: '库存管理分析',
                            description: '分析库存周转和管理',
                            inputs: ['平均库存', '销售成本', '缺货损失', '过期损失', '库存持有成本']
                        }
                    }
                },
                {
                    id: 'manufacturing',
                    name: '制造业分析工具',
                    description: '制造业运营效率分析',
                    icon: Settings,
                    category: 'industry',
                    difficulty: 'medium',
                    subCategories: {
                        production: {
                            name: '生产效率分析',
                            description: '分析生产效率和产能利用',
                            inputs: ['设计产能', '实际产量', '直接人工', '制造费用', '质量成本']
                        },
                        cost_analysis: {
                            name: '成本结构分析',
                            description: '分析制造成本构成',
                            inputs: ['直接材料', '直接人工', '制造费用', '产量', '固定成本', '变动成本']
                        }
                    }
                }
            ]
        }
    };

    // 获取全面的自动取数
    const getComprehensiveExampleData = () => {
        return {
            // 基础财务数据
            '总资产': 10000000,
            '总负债': 4000000,
            '股东权益': 6000000,
            '流动资产': 6000000,
            '流动负债': 3000000,
            '存货': 2000000,
            '货币资金': 800000,
            '短期投资': 200000,
            '营业收入': 8000000,
            '营业成本': 5000000,
            '净利润': 800000,
            '发行股数': 1000000,

            // 期初期末数据
            '期初存货': 1800000,
            '期末存货': 2200000,
            '期初应收账款': 800000,
            '期末应收账款': 1200000,
            '期初总资产': 9500000,
            '期末总资产': 10500000,
            '期初应付账款': 600000,
            '期末应付账款': 800000,

            // 增长数据
            '本期营业收入': 8000000,
            '上期营业收入': 7200000,
            '本期净利润': 800000,
            '上期净利润': 720000,
            '期末净资产': 6000000,
            '期初净资产': 5700000,

            // 现金流数据
            '经营活动现金流': 1200000,
            '投资活动现金流': -500000,
            '筹资活动现金流': -300000,
            '资本支出': 500000,
            '股利支付': 200000
        };
    };

    // 完整的自动取数映射
    const getExampleData = (toolId, subCategory, ratioId = null) => {
        const examples = {
            dupont: {
                three_factor: {
                    '净利润': 800000,
                    '营业收入': 8000000,
                    '总资产': 10000000,
                    '股东权益': 6000000
                },
                five_factor: {
                    '净利润': 800000,
                    '税前利润': 1000000,
                    '息税前利润': 1200000,
                    '营业收入': 8000000,
                    '总资产': 10000000,
                    '股东权益': 6000000
                }
            },
            cashflow_analysis: {
                structure: {
                    '经营活动现金流': 1200000,
                    '投资活动现金流': -500000,
                    '筹资活动现金流': -300000
                },
                quality: {
                    '经营活动现金流': 1200000,
                    '净利润': 800000,
                    '资本支出': 500000,
                    '股利支付': 200000
                }
            },
            trend: {
                revenue_trend: {
                    '第一期收入': 6400000,
                    '第二期收入': 7200000,
                    '第三期收入': 7800000,
                    '第四期收入': 8000000,
                    '第五期收入': 8500000
                },
                profit_trend: {
                    '第一期利润': 640000,
                    '第二期利润': 720000,
                    '第三期利润': 780000,
                    '第四期利润': 800000,
                    '第五期利润': 850000
                }
            },
            dcf: {
                single_stage: {
                    '自由现金流': 1000000,
                    '增长率': 0.05,
                    '贴现率': 0.1
                },
                two_stage: {
                    '初始自由现金流': 1000000,
                    '第一阶段增长率': 0.15,
                    '第一阶段年数': 5,
                    '第二阶段增长率': 0.03,
                    '贴现率': 0.1
                },
                fcfe: {
                    '股权自由现金流': 800000,
                    '股权增长率': 0.06,
                    '股权资本成本': 0.12
                }
            },
            multiples: {
                pe_valuation: {
                    '每股收益': 0.8,
                    '行业平均PE': 15,
                    '增长率调整系数': 1.2
                },
                pb_valuation: {
                    '每股净资产': 6,
                    '行业平均PB': 2.5,
                    'ROE': 0.133
                },
                ev_ebitda: {
                    'EBITDA': 1500000,
                    '行业平均EV_EBITDA倍数': 8,
                    '净债务': 2000000
                }
            },
            dividend: {
                gordon: {
                    '当期股利': 2.5,
                    '股利增长率': 0.06,
                    '要求回报率': 0.12
                },
                multi_stage: {
                    '初始股利': 2.5,
                    '第一阶段增长率': 0.1,
                    '第一阶段年数': 5,
                    '第二阶段增长率': 0.03,
                    '要求回报率': 0.12
                }
            },
            asset: {
                book_value: {
                    '总资产': 10000000,
                    '总负债': 4000000
                },
                replacement_cost: {
                    '总资产': 10000000,
                    '总负债': 4000000,
                    '重置成本调整系数': 1.2
                }
            },
            zscore: {
                original: {
                    '营运资本': 3000000,
                    '总资产': 10000000,
                    '留存收益': 2000000,
                    '息税前利润': 1200000,
                    '股票市值': 8000000,
                    '总负债': 4000000,
                    '销售收入': 8000000
                },
                modified: {
                    '营运资本': 3000000,
                    '总资产': 10000000,
                    '留存收益': 2000000,
                    '息税前利润': 1200000,
                    '账面价值': 6000000,
                    '总负债': 4000000,
                    '销售收入': 8000000
                }
            },
            credit: {
                financial_score: {
                    '资产负债率': 0.4,
                    '流动比率': 2.0,
                    'ROE': 0.133,
                    '利息保障倍数': 6,
                    '营业收入增长率': 0.11
                },
                comprehensive: {
                    '财务评分': 75,
                    '行业风险系数': 1.2,
                    '管理质量评分': 80,
                    '市场地位评分': 85
                }
            },
            var: {
                parametric: {
                    '投资金额': 1000000,
                    '预期收益率': 0.08,
                    '收益波动率': 0.2,
                    '置信水平': 0.95,
                    '持有期': 10
                },
                historical: {
                    '投资金额': 1000000,
                    '历史收益率方差': 0.04,
                    '置信水平': 0.95,
                    '持有期': 10
                }
            },
            sensitivity: {
                single_factor: {
                    '基准值': 1000000,
                    '敏感变量': 'price',
                    '变化幅度': 0.1,
                    '影响系数': 1.5
                },
                scenario: {
                    '基准情景': 1000000,
                    '乐观情景调整': 0.2,
                    '悲观情景调整': -0.15,
                    '概率权重': 0.6
                }
            },
            monte: {
                portfolio: {
                    '期望收益率': 0.08,
                    '收益波动率': 0.15,
                    '模拟次数': 1000,
                    '时间周期': 252
                },
                project: {
                    '初始投资': 5000000,
                    '年现金流均值': 1200000,
                    '现金流波动率': 0.2,
                    '贴现率': 0.1,
                    '项目年限': 5
                }
            },
            options: {
                black_scholes: {
                    '标的价格': 100,
                    '执行价格': 105,
                    '无风险利率': 0.05,
                    '波动率': 0.2,
                    '到期时间': 0.25
                },
                binomial: {
                    '标的价格': 100,
                    '执行价格': 105,
                    '无风险利率': 0.05,
                    '波动率': 0.2,
                    '期数': 50,
                    '到期时间': 0.25
                }
            },
            merger: {
                accretion: {
                    '收购方EPS': 2.5,
                    '目标方EPS': 1.8,
                    '收购价格': 50000000,
                    '支付方式比例': 0.7,
                    '协同效应': 5000000
                },
                synergy: {
                    '收入协同': 8000000,
                    '成本协同': 3000000,
                    '税务协同': 1000000,
                    '整合成本': 2000000,
                    '实现概率': 0.8
                }
            },
            optimization: {
                markowitz: {
                    '资产A预期收益': 0.08,
                    '资产B预期收益': 0.12,
                    '资产A风险': 0.15,
                    '资产B风险': 0.25,
                    '相关系数': 0.3
                },
                risk_parity: {
                    '资产A波动率': 0.15,
                    '资产B波动率': 0.25,
                    '相关系数': 0.3,
                    '目标风险': 0.18
                }
            },
            banking: {
                profitability: {
                    '净利息收入': 2000000,
                    '非利息收入': 800000,
                    '营业费用': 1500000,
                    '拨备费用': 300000,
                    '总资产': 60000000,
                    '净资产': 6000000
                },
                asset_quality: {
                    '贷款总额': 40000000,
                    '不良贷款': 800000,
                    '拨备总额': 1200000,
                    '核销金额': 200000,
                    '新增不良': 300000
                }
            },
            realestate: {
                development: {
                    '土地成本': 20000000,
                    '建设成本': 30000000,
                    '销售价格': 80000000,
                    '开发周期': 2,
                    '销售周期': 1.5
                },
                investment: {
                    '物业价值': 50000000,
                    '租金收入': 4000000,
                    '运营费用': 1000000,
                    '资本化率': 0.06,
                    '增值预期': 0.03
                }
            },
            retail: {
                store_analysis: {
                    '店铺面积': 2000,
                    '销售收入': 5000000,
                    '客流量': 100000,
                    '客单价': 50,
                    '员工数量': 50
                },
                inventory: {
                    '平均库存': 1000000,
                    '销售成本': 3000000,
                    '缺货损失': 50000,
                    '过期损失': 30000,
                    '库存持有成本': 100000
                }
            },
            manufacturing: {
                production: {
                    '设计产能': 100000,
                    '实际产量': 90000,
                    '直接人工': 2000000,
                    '制造费用': 1000000,
                    '质量成本': 200000
                },
                cost_analysis: {
                    '直接材料': 3000000,
                    '直接人工': 2000000,
                    '制造费用': 1000000,
                    '产量': 90000,
                    '固定成本': 800000,
                    '变动成本': 5200000
                }
            }
        };

        if (examples[toolId] && examples[toolId][subCategory]) {
            return examples[toolId][subCategory];
        }
        return {};
    };

    // 计算具体比率
    const calculateRatio = (ratioId, inputs) => {
        const numInputs = {};
        Object.keys(inputs).forEach(key => {
            numInputs[key] = parseFloat(inputs[key]) || 0;
        });

        switch (ratioId) {
            case 'current_ratio':
                return {
                    value: (numInputs.流动资产 / numInputs.流动负债).toFixed(3),
                    evaluation: numInputs.流动资产 / numInputs.流动负债 >= 1.5 ? '良好' : '需关注'
                };
            case 'quick_ratio':
                return {
                    value: ((numInputs.流动资产 - numInputs.存货) / numInputs.流动负债).toFixed(3),
                    evaluation: (numInputs.流动资产 - numInputs.存货) / numInputs.流动负债 >= 1.0 ? '良好' : '需关注'
                };
            case 'cash_ratio':
                return {
                    value: ((numInputs.货币资金 + numInputs.短期投资) / numInputs.流动负债).toFixed(3),
                    evaluation: (numInputs.货币资金 + numInputs.短期投资) / numInputs.流动负债 >= 0.2 ? '良好' : '偏低'
                };
            case 'debt_ratio':
                return {
                    value: (numInputs.总负债 / numInputs.总资产).toFixed(3),
                    evaluation: numInputs.总负债 / numInputs.总资产 <= 0.6 ? '良好' : '偏高'
                };
            case 'equity_ratio':
                return {
                    value: (numInputs.股东权益 / numInputs.总资产).toFixed(3),
                    evaluation: numInputs.股东权益 / numInputs.总资产 >= 0.4 ? '良好' : '偏低'
                };
            case 'gross_margin':
                return {
                    value: ((numInputs.营业收入 - numInputs.营业成本) / numInputs.营业收入 * 100).toFixed(2) + '%',
                    evaluation: (numInputs.营业收入 - numInputs.营业成本) / numInputs.营业收入 >= 0.3 ? '良好' : '一般'
                };
            case 'net_margin':
                return {
                    value: (numInputs.净利润 / numInputs.营业收入 * 100).toFixed(2) + '%',
                    evaluation: numInputs.净利润 / numInputs.营业收入 >= 0.1 ? '良好' : '一般'
                };
            case 'roe':
                return {
                    value: (numInputs.净利润 / numInputs.股东权益 * 100).toFixed(2) + '%',
                    evaluation: numInputs.净利润 / numInputs.股东权益 >= 0.15 ? '优秀' : '一般'
                };
            case 'roa':
                return {
                    value: (numInputs.净利润 / numInputs.总资产 * 100).toFixed(2) + '%',
                    evaluation: numInputs.净利润 / numInputs.总资产 >= 0.05 ? '良好' : '一般'
                };
            case 'eps':
                return {
                    value: (numInputs.净利润 / numInputs.发行股数).toFixed(2),
                    evaluation: numInputs.净利润 > 0 ? '盈利' : '亏损'
                };
            case 'inventory_turnover':
                const avgInventory = (numInputs.期初存货 + numInputs.期末存货) / 2;
                return {
                    value: (numInputs.营业成本 / avgInventory).toFixed(2),
                    evaluation: numInputs.营业成本 / avgInventory >= 6 ? '良好' : '一般'
                };
            case 'receivables_turnover':
                const avgReceivables = (numInputs.期初应收账款 + numInputs.期末应收账款) / 2;
                return {
                    value: (numInputs.营业收入 / avgReceivables).toFixed(2),
                    evaluation: numInputs.营业收入 / avgReceivables >= 6 ? '良好' : '一般'
                };
            case 'asset_turnover':
                const avgAssets = (numInputs.期初总资产 + numInputs.期末总资产) / 2;
                return {
                    value: (numInputs.营业收入 / avgAssets).toFixed(2),
                    evaluation: numInputs.营业收入 / avgAssets >= 1 ? '良好' : '一般'
                };
            case 'payables_turnover':
                const avgPayables = (numInputs.期初应付账款 + numInputs.期末应付账款) / 2;
                return {
                    value: (numInputs.营业成本 / avgPayables).toFixed(2),
                    evaluation: '适中为好'
                };
            case 'revenue_growth':
                const revenueGrowth = (numInputs.本期营业收入 - numInputs.上期营业收入) / numInputs.上期营业收入;
                return {
                    value: (revenueGrowth * 100).toFixed(2) + '%',
                    evaluation: revenueGrowth > 0 ? '正增长' : '负增长'
                };
            case 'profit_growth':
                const profitGrowth = (numInputs.本期净利润 - numInputs.上期净利润) / numInputs.上期净利润;
                return {
                    value: (profitGrowth * 100).toFixed(2) + '%',
                    evaluation: profitGrowth > 0 ? '正增长' : '负增长'
                };
            case 'asset_growth':
                const assetGrowth = (numInputs.期末总资产 - numInputs.期初总资产) / numInputs.期初总资产;
                return {
                    value: (assetGrowth * 100).toFixed(2) + '%',
                    evaluation: assetGrowth > 0 ? '正增长' : '负增长'
                };
            case 'equity_growth':
                const equityGrowth = (numInputs.期末净资产 - numInputs.期初净资产) / numInputs.期初净资产;
                return {
                    value: (equityGrowth * 100).toFixed(2) + '%',
                    evaluation: equityGrowth > 0 ? '正增长' : '负增长'
                };
            case 'operating_cash_ratio':
                return {
                    value: (numInputs.经营活动现金流 / numInputs.流动负债).toFixed(3),
                    evaluation: numInputs.经营活动现金流 / numInputs.流动负债 >= 1 ? '良好' : '需关注'
                };
            case 'cash_coverage':
                return {
                    value: (numInputs.经营活动现金流 / numInputs.净利润).toFixed(3),
                    evaluation: numInputs.经营活动现金流 / numInputs.净利润 >= 1 ? '良好' : '需关注'
                };
            case 'cash_debt_ratio':
                return {
                    value: (numInputs.经营活动现金流 / numInputs.总负债).toFixed(3),
                    evaluation: numInputs.经营活动现金流 / numInputs.总负债 >= 0.2 ? '良好' : '一般'
                };
            case 'free_cash_flow':
                return {
                    value: (numInputs.经营活动现金流 - numInputs.资本支出).toFixed(0),
                    evaluation: (numInputs.经营活动现金流 - numInputs.资本支出) > 0 ? '正现金流' : '负现金流'
                };
            default:
                return { value: '0', evaluation: '未知' };
        }
    };

    // 标准正态分布累积概率函数的近似
    const normalCDF = (x) => {
        return 0.5 * (1 + Math.sign(x) * Math.sqrt(1 - Math.exp(-2 * x * x / Math.PI)));
    };

    // 执行工具计算 - 完善版本
    const executeTool = (toolId, subCategory, inputs, ratioId = null) => {
        const numInputs = {};
        Object.keys(inputs).forEach(key => {
            numInputs[key] = parseFloat(inputs[key]) || 0;
        });

        if (toolId === 'ratio' && ratioId) {
            return calculateRatio(ratioId, inputs);
        }

        switch (toolId) {
            case 'dupont':
                if (subCategory === 'three_factor') {
                    const netMargin = numInputs.净利润 / numInputs.营业收入;
                    const assetTurnover = numInputs.营业收入 / numInputs.总资产;
                    const equityMultiplier = numInputs.总资产 / numInputs.股东权益;
                    const roe = netMargin * assetTurnover * equityMultiplier;

                    return {
                        'ROE': (roe * 100).toFixed(2) + '%',
                        '销售净利率': (netMargin * 100).toFixed(2) + '%',
                        '总资产周转率': assetTurnover.toFixed(3),
                        '权益乘数': equityMultiplier.toFixed(3),
                        '分析结论': roe >= 0.15 ? 'ROE表现优秀' : 'ROE需要改善'
                    };
                } else if (subCategory === 'five_factor') {
                    const taxBurden = numInputs.净利润 / numInputs.税前利润;
                    const interestBurden = numInputs.税前利润 / numInputs.息税前利润;
                    const ebitMargin = numInputs.息税前利润 / numInputs.营业收入;
                    const assetTurnover = numInputs.营业收入 / numInputs.总资产;
                    const equityMultiplier = numInputs.总资产 / numInputs.股东权益;
                    const roe = taxBurden * interestBurden * ebitMargin * assetTurnover * equityMultiplier;

                    return {
                        'ROE': (roe * 100).toFixed(2) + '%',
                        '税负因子': taxBurden.toFixed(3),
                        '利息负担': interestBurden.toFixed(3),
                        'EBIT利润率': (ebitMargin * 100).toFixed(2) + '%',
                        '资产周转率': assetTurnover.toFixed(3),
                        '权益乘数': equityMultiplier.toFixed(3)
                    };
                }
                break;

            case 'cashflow_analysis':
                if (subCategory === 'structure') {
                    const totalCashFlow = numInputs.经营活动现金流 + numInputs.投资活动现金流 + numInputs.筹资活动现金流;
                    const operatingRatio = Math.abs(numInputs.经营活动现金流) / (Math.abs(numInputs.经营活动现金流) + Math.abs(numInputs.投资活动现金流) + Math.abs(numInputs.筹资活动现金流));

                    return {
                        '净现金流': totalCashFlow.toFixed(0),
                        '经营现金流占比': (operatingRatio * 100).toFixed(1) + '%',
                        '经营现金流': numInputs.经营活动现金流.toFixed(0),
                        '投资现金流': numInputs.投资活动现金流.toFixed(0),
                        '筹资现金流': numInputs.筹资活动现金流.toFixed(0),
                        '现金流结构': numInputs.经营活动现金流 > 0 && numInputs.投资活动现金流 < 0 ? '健康' : '需关注'
                    };
                } else if (subCategory === 'quality') {
                    const cashQuality = numInputs.经营活动现金流 / numInputs.净利润;
                    const fcf = numInputs.经营活动现金流 - numInputs.资本支出 - numInputs.股利支付;
                    const cashConversion = numInputs.经营活动现金流 / numInputs.净利润;

                    return {
                        '现金流质量比': cashQuality.toFixed(3),
                        '自由现金流': fcf.toFixed(0),
                        '现金转换率': cashConversion.toFixed(3),
                        '质量评级': cashQuality >= 1.2 ? '优秀' : cashQuality >= 0.8 ? '良好' : '一般',
                        '可持续性': fcf > 0 ? '可持续' : '需改善'
                    };
                }
                break;

            case 'trend':
                if (subCategory === 'revenue_trend') {
                    const revenues = [
                        numInputs.第一期收入,
                        numInputs.第二期收入,
                        numInputs.第三期收入,
                        numInputs.第四期收入,
                        numInputs.第五期收入
                    ];

                    const growthRates = [];
                    for (let i = 1; i < revenues.length; i++) {
                        growthRates.push((revenues[i] - revenues[i - 1]) / revenues[i - 1]);
                    }

                    const avgGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;
                    const volatility = Math.sqrt(growthRates.reduce((sum, rate) => sum + Math.pow(rate - avgGrowth, 2), 0) / growthRates.length);

                    return {
                        '平均增长率': (avgGrowth * 100).toFixed(2) + '%',
                        '最新增长率': (growthRates[growthRates.length - 1] * 100).toFixed(2) + '%',
                        '增长波动率': (volatility * 100).toFixed(2) + '%',
                        '趋势判断': avgGrowth > 0 ? '上升趋势' : '下降趋势',
                        '稳定性': volatility < 0.1 ? '稳定' : '波动较大'
                    };
                } else if (subCategory === 'profit_trend') {
                    const profits = [
                        numInputs.第一期利润,
                        numInputs.第二期利润,
                        numInputs.第三期利润,
                        numInputs.第四期利润,
                        numInputs.第五期利润
                    ];

                    const growthRates = [];
                    for (let i = 1; i < profits.length; i++) {
                        growthRates.push((profits[i] - profits[i - 1]) / profits[i - 1]);
                    }

                    const avgGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;

                    return {
                        '平均利润增长率': (avgGrowth * 100).toFixed(2) + '%',
                        '最新利润增长率': (growthRates[growthRates.length - 1] * 100).toFixed(2) + '%',
                        '利润趋势': avgGrowth > 0 ? '上升' : '下降',
                        '盈利改善': growthRates[growthRates.length - 1] > avgGrowth ? '加速' : '放缓'
                    };
                }
                break;

            case 'dcf':
                if (subCategory === 'single_stage') {
                    if (numInputs.贴现率 <= numInputs.增长率) {
                        return { '错误': '贴现率必须大于增长率' };
                    }
                    const terminalValue = numInputs.自由现金流 * (1 + numInputs.增长率) / (numInputs.贴现率 - numInputs.增长率);
                    return {
                        '企业价值': terminalValue.toFixed(0),
                        '下期现金流': (numInputs.自由现金流 * (1 + numInputs.增长率)).toFixed(0),
                        '增长假设': (numInputs.增长率 * 100).toFixed(1) + '%',
                        '贴现率': (numInputs.贴现率 * 100).toFixed(1) + '%'
                    };
                } else if (subCategory === 'two_stage') {
                    let pv1 = 0;
                    let cf = numInputs.初始自由现金流;

                    // 第一阶段现值
                    for (let i = 1; i <= numInputs.第一阶段年数; i++) {
                        cf *= (1 + numInputs.第一阶段增长率);
                        pv1 += cf / Math.pow(1 + numInputs.贴现率, i);
                    }

                    // 终值
                    const terminalCF = cf * (1 + numInputs.第二阶段增长率);
                    const terminalValue = terminalCF / (numInputs.贴现率 - numInputs.第二阶段增长率);
                    const pv2 = terminalValue / Math.pow(1 + numInputs.贴现率, numInputs.第一阶段年数);

                    return {
                        '高增长期价值': pv1.toFixed(0),
                        '稳定期价值': pv2.toFixed(0),
                        '企业总价值': (pv1 + pv2).toFixed(0),
                        '终值占比': ((pv2 / (pv1 + pv2)) * 100).toFixed(1) + '%'
                    };
                } else if (subCategory === 'fcfe') {
                    if (numInputs.股权资本成本 <= numInputs.股权增长率) {
                        return { '错误': '股权资本成本必须大于股权增长率' };
                    }
                    const stockValue = numInputs.股权自由现金流 * (1 + numInputs.股权增长率) / (numInputs.股权资本成本 - numInputs.股权增长率);
                    return {
                        '股权价值': stockValue.toFixed(0),
                        '下期FCFE': (numInputs.股权自由现金流 * (1 + numInputs.股权增长率)).toFixed(0),
                        '股权增长率': (numInputs.股权增长率 * 100).toFixed(1) + '%',
                        '股权资本成本': (numInputs.股权资本成本 * 100).toFixed(1) + '%'
                    };
                }
                break;

            case 'multiples':
                if (subCategory === 'pe_valuation') {
                    const adjustedPE = numInputs.行业平均PE * numInputs.增长率调整系数;
                    const estimatedPrice = numInputs.每股收益 * adjustedPE;
                    return {
                        '调整后PE': adjustedPE.toFixed(2),
                        '估计股价': estimatedPrice.toFixed(2),
                        '行业PE': numInputs.行业平均PE.toFixed(2),
                        '调整系数': numInputs.增长率调整系数.toFixed(2),
                        '相对估值': adjustedPE > numInputs.行业平均PE ? '溢价' : '折价'
                    };
                } else if (subCategory === 'pb_valuation') {
                    const adjustedPB = numInputs.行业平均PB * (numInputs.ROE / 0.15);
                    const estimatedPrice = numInputs.每股净资产 * adjustedPB;
                    return {
                        '调整后PB': adjustedPB.toFixed(2),
                        '估计股价': estimatedPrice.toFixed(2),
                        '行业PB': numInputs.行业平均PB.toFixed(2),
                        'ROE调整': (numInputs.ROE * 100).toFixed(1) + '%'
                    };
                } else if (subCategory === 'ev_ebitda') {
                    const enterpriseValue = numInputs.EBITDA * numInputs.行业平均EV_EBITDA倍数;
                    const equityValue = enterpriseValue - numInputs.净债务;
                    return {
                        '企业价值': enterpriseValue.toFixed(0),
                        '股权价值': equityValue.toFixed(0),
                        'EV/EBITDA倍数': numInputs.行业平均EV_EBITDA倍数.toFixed(2),
                        '净债务': numInputs.净债务.toFixed(0)
                    };
                }
                break;

            case 'dividend':
                if (subCategory === 'gordon') {
                    if (numInputs.要求回报率 <= numInputs.股利增长率) {
                        return { '错误': '要求回报率必须大于股利增长率' };
                    }
                    const stockValue = numInputs.当期股利 * (1 + numInputs.股利增长率) / (numInputs.要求回报率 - numInputs.股利增长率);
                    return {
                        '股票内在价值': stockValue.toFixed(2),
                        '下期预期股利': (numInputs.当期股利 * (1 + numInputs.股利增长率)).toFixed(2),
                        '股利收益率': (numInputs.当期股利 / stockValue * 100).toFixed(2) + '%',
                        '股利增长率': (numInputs.股利增长率 * 100).toFixed(1) + '%'
                    };
                } else if (subCategory === 'multi_stage') {
                    let pv1 = 0;
                    let dividend = numInputs.初始股利;

                    // 第一阶段
                    for (let i = 1; i <= numInputs.第一阶段年数; i++) {
                        dividend *= (1 + numInputs.第一阶段增长率);
                        pv1 += dividend / Math.pow(1 + numInputs.要求回报率, i);
                    }

                    // 第二阶段终值
                    const terminalDividend = dividend * (1 + numInputs.第二阶段增长率);
                    const terminalValue = terminalDividend / (numInputs.要求回报率 - numInputs.第二阶段增长率);
                    const pv2 = terminalValue / Math.pow(1 + numInputs.要求回报率, numInputs.第一阶段年数);

                    return {
                        '高增长期价值': pv1.toFixed(2),
                        '稳定期价值': pv2.toFixed(2),
                        '股票总价值': (pv1 + pv2).toFixed(2),
                        '终值占比': ((pv2 / (pv1 + pv2)) * 100).toFixed(1) + '%'
                    };
                }
                break;

            case 'asset':
                if (subCategory === 'book_value') {
                    const bookValue = numInputs.总资产 - numInputs.总负债;
                    return {
                        '账面净资产': bookValue.toFixed(0),
                        '资产': numInputs.总资产.toFixed(0),
                        '负债': numInputs.总负债.toFixed(0),
                        '净资产率': ((bookValue / numInputs.总资产) * 100).toFixed(2) + '%'
                    };
                } else if (subCategory === 'replacement_cost') {
                    const bookValue = numInputs.总资产 - numInputs.总负债;
                    const adjustedValue = bookValue * numInputs.重置成本调整系数;
                    return {
                        '重置成本价值': adjustedValue.toFixed(0),
                        '账面净资产': bookValue.toFixed(0),
                        '调整系数': numInputs.重置成本调整系数.toFixed(2),
                        '调整幅度': ((numInputs.重置成本调整系数 - 1) * 100).toFixed(1) + '%'
                    };
                }
                break;

            case 'zscore':
                if (subCategory === 'original') {
                    const x1 = numInputs.营运资本 / numInputs.总资产;
                    const x2 = numInputs.留存收益 / numInputs.总资产;
                    const x3 = numInputs.息税前利润 / numInputs.总资产;
                    const x4 = numInputs.股票市值 / numInputs.总负债;
                    const x5 = numInputs.销售收入 / numInputs.总资产;
                    const zScore = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5;

                    return {
                        'Z-Score': zScore.toFixed(3),
                        '营运资本/总资产': (x1 * 100).toFixed(2) + '%',
                        '留存收益/总资产': (x2 * 100).toFixed(2) + '%',
                        'EBIT/总资产': (x3 * 100).toFixed(2) + '%',
                        '市值/总负债': x4.toFixed(2),
                        '破产风险': zScore < 1.8 ? '高风险' : zScore < 3.0 ? '中等风险' : '低风险'
                    };
                } else if (subCategory === 'modified') {
                    const x1 = numInputs.营运资本 / numInputs.总资产;
                    const x2 = numInputs.留存收益 / numInputs.总资产;
                    const x3 = numInputs.息税前利润 / numInputs.总资产;
                    const x4 = numInputs.账面价值 / numInputs.总负债;
                    const x5 = numInputs.销售收入 / numInputs.总资产;
                    const zScore = 0.717 * x1 + 0.847 * x2 + 3.107 * x3 + 0.420 * x4 + 0.998 * x5;

                    return {
                        'Z-Score': zScore.toFixed(3),
                        '营运资本/总资产': (x1 * 100).toFixed(2) + '%',
                        '留存收益/总资产': (x2 * 100).toFixed(2) + '%',
                        'EBIT/总资产': (x3 * 100).toFixed(2) + '%',
                        '账面价值/总负债': x4.toFixed(2),
                        '破产风险': zScore < 1.23 ? '高风险' : zScore < 2.9 ? '中等风险' : '低风险'
                    };
                }
                break;

            case 'credit':
                if (subCategory === 'financial_score') {
                    const debtScore = Math.max(0, (1 - numInputs.资产负债率) * 25);
                    const liquidityScore = Math.min(25, numInputs.流动比率 * 12.5);
                    const profitScore = Math.min(25, numInputs.ROE * 100 * 1.67);
                    const coverageScore = Math.min(25, numInputs.利息保障倍数 * 4.17);
                    const growthScore = Math.max(0, Math.min(25, numInputs.营业收入增长率 * 250));
                    const totalScore = debtScore + liquidityScore + profitScore + coverageScore + growthScore;

                    return {
                        '综合评分': totalScore.toFixed(1),
                        '偿债能力得分': debtScore.toFixed(1),
                        '流动性得分': liquidityScore.toFixed(1),
                        '盈利能力得分': profitScore.toFixed(1),
                        '利息保障得分': coverageScore.toFixed(1),
                        '成长能力得分': growthScore.toFixed(1),
                        '信用等级': totalScore >= 85 ? 'AAA' : totalScore >= 75 ? 'AA' : totalScore >= 65 ? 'A' : totalScore >= 55 ? 'BBB' : 'BB'
                    };
                } else if (subCategory === 'comprehensive') {
                    const adjustedScore = numInputs.财务评分 * numInputs.行业风险系数 * 0.4 +
                        numInputs.管理质量评分 * 0.3 +
                        numInputs.市场地位评分 * 0.3;
                    return {
                        '综合信用评分': adjustedScore.toFixed(1),
                        '财务评分': numInputs.财务评分.toFixed(1),
                        '管理质量评分': numInputs.管理质量评分.toFixed(1),
                        '市场地位评分': numInputs.市场地位评分.toFixed(1),
                        '行业风险调整': numInputs.行业风险系数.toFixed(2),
                        '最终等级': adjustedScore >= 80 ? 'AAA' : adjustedScore >= 70 ? 'AA' : adjustedScore >= 60 ? 'A' : 'BBB'
                    };
                }
                break;

            case 'var':
                if (subCategory === 'parametric') {
                    const zValue = numInputs.置信水平 === 0.95 ? 1.645 : numInputs.置信水平 === 0.99 ? 2.326 : 1.96;
                    const periodReturn = numInputs.预期收益率 * numInputs.持有期 / 252;
                    const periodVol = numInputs.收益波动率 * Math.sqrt(numInputs.持有期 / 252);
                    const varValue = numInputs.投资金额 * (zValue * periodVol - periodReturn);

                    return {
                        'VaR金额': varValue.toFixed(0),
                        'VaR比例': (varValue / numInputs.投资金额 * 100).toFixed(2) + '%',
                        '预期收益': (periodReturn * 100).toFixed(2) + '%',
                        '期间波动率': (periodVol * 100).toFixed(2) + '%',
                        '置信水平': (numInputs.置信水平 * 100).toFixed(0) + '%'
                    };
                } else if (subCategory === 'historical') {
                    const zValue = numInputs.置信水平 === 0.95 ? 1.645 : numInputs.置信水平 === 0.99 ? 2.326 : 1.96;
                    const periodVol = Math.sqrt(numInputs.历史收益率方差 * numInputs.持有期 / 252);
                    const varValue = numInputs.投资金额 * zValue * periodVol;

                    return {
                        'VaR金额': varValue.toFixed(0),
                        'VaR比例': (varValue / numInputs.投资金额 * 100).toFixed(2) + '%',
                        '历史波动率': (Math.sqrt(numInputs.历史收益率方差) * 100).toFixed(2) + '%',
                        '持有期调整': Math.sqrt(numInputs.持有期 / 252).toFixed(3),
                        '置信水平': (numInputs.置信水平 * 100).toFixed(0) + '%'
                    };
                }
                break;

            case 'sensitivity':
                if (subCategory === 'single_factor') {
                    const upScenario = numInputs.基准值 * (1 + numInputs.变化幅度) * numInputs.影响系数;
                    const downScenario = numInputs.基准值 * (1 - numInputs.变化幅度) * numInputs.影响系数;
                    const upChange = (upScenario - numInputs.基准值) / numInputs.基准值;
                    const downChange = (downScenario - numInputs.基准值) / numInputs.基准值;

                    return {
                        '上涨情景': upScenario.toFixed(0),
                        '下跌情景': downScenario.toFixed(0),
                        '上涨变动': (upChange * 100).toFixed(2) + '%',
                        '下跌变动': (downChange * 100).toFixed(2) + '%',
                        '敏感性系数': numInputs.影响系数.toFixed(2),
                        '弹性系数': ((upChange / numInputs.变化幅度)).toFixed(2)
                    };
                } else if (subCategory === 'scenario') {
                    const optimistic = numInputs.基准情景 * (1 + numInputs.乐观情景调整);
                    const pessimistic = numInputs.基准情景 * (1 + numInputs.悲观情景调整);
                    const expectedValue = optimistic * numInputs.概率权重 +
                        numInputs.基准情景 * (1 - 2 * numInputs.概率权重) +
                        pessimistic * numInputs.概率权重;

                    return {
                        '乐观情景': optimistic.toFixed(0),
                        '基准情景': numInputs.基准情景.toFixed(0),
                        '悲观情景': pessimistic.toFixed(0),
                        '期望值': expectedValue.toFixed(0),
                        '概率权重': (numInputs.概率权重 * 100).toFixed(1) + '%'
                    };
                }
                break;

            case 'monte':
                if (subCategory === 'portfolio') {
                    const annualReturn = numInputs.期望收益率;
                    const annualVol = numInputs.收益波动率;
                    const timeHorizon = numInputs.时间周期 / 252;
                    const periodReturn = annualReturn * timeHorizon;
                    const periodVol = annualVol * Math.sqrt(timeHorizon);

                    return {
                        '期望收益': (periodReturn * 100).toFixed(2) + '%',
                        '期间波动率': (periodVol * 100).toFixed(2) + '%',
                        '95%置信下限': ((periodReturn - 1.96 * periodVol) * 100).toFixed(2) + '%',
                        '95%置信上限': ((periodReturn + 1.96 * periodVol) * 100).toFixed(2) + '%',
                        '模拟次数': numInputs.模拟次数.toFixed(0)
                    };
                } else if (subCategory === 'project') {
                    let npv = -numInputs.初始投资;
                    for (let i = 1; i <= numInputs.项目年限; i++) {
                        npv += numInputs.年现金流均值 / Math.pow(1 + numInputs.贴现率, i);
                    }

                    const cashflowPV = numInputs.年现金流均值 * ((1 - Math.pow(1 + numInputs.贴现率, -numInputs.项目年限)) / numInputs.贴现率);
                    const npvVolatility = cashflowPV * numInputs.现金流波动率;

                    return {
                        '基准NPV': npv.toFixed(0),
                        'NPV波动率': npvVolatility.toFixed(0),
                        '95%置信下限': (npv - 1.96 * npvVolatility).toFixed(0),
                        '95%置信上限': (npv + 1.96 * npvVolatility).toFixed(0),
                        '正NPV概率': npv > npvVolatility ? '高' : '中等'
                    };
                }
                break;

            case 'options':
                if (subCategory === 'black_scholes') {
                    const S = numInputs.标的价格;
                    const K = numInputs.执行价格;
                    const r = numInputs.无风险利率;
                    const sigma = numInputs.波动率;
                    const T = numInputs.到期时间;

                    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
                    const d2 = d1 - sigma * Math.sqrt(T);

                    // 简化的期权价格计算
                    const callPrice = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
                    const delta = normalCDF(d1);
                    const gamma = Math.exp(-0.5 * d1 * d1) / (S * sigma * Math.sqrt(2 * Math.PI * T));

                    return {
                        '看涨期权价格': Math.max(0, callPrice).toFixed(2),
                        '内在价值': Math.max(0, S - K).toFixed(2),
                        '时间价值': Math.max(0, callPrice - Math.max(0, S - K)).toFixed(2),
                        'Delta': delta.toFixed(3),
                        'Gamma': gamma.toFixed(4)
                    };
                } else if (subCategory === 'binomial') {
                    const S = numInputs.标的价格;
                    const K = numInputs.执行价格;
                    const r = numInputs.无风险利率;
                    const sigma = numInputs.波动率;
                    const n = numInputs.期数;
                    const T = numInputs.到期时间;

                    const dt = T / n;
                    const u = Math.exp(sigma * Math.sqrt(dt));
                    const d = 1 / u;
                    const p = (Math.exp(r * dt) - d) / (u - d);

                    // 简化的二叉树计算
                    const finalPrice = S * Math.pow(u, n / 2);
                    const optionValue = Math.max(0, finalPrice - K) * Math.exp(-r * T);

                    return {
                        '期权价格': optionValue.toFixed(2),
                        '上涨因子': u.toFixed(3),
                        '下跌因子': d.toFixed(3),
                        '风险中性概率': p.toFixed(3),
                        '期数': n.toFixed(0)
                    };
                }
                break;

            case 'merger':
                if (subCategory === 'accretion') {
                    const weightedEPS = (numInputs.收购方EPS + numInputs.目标方EPS) / 2;
                    const synergizedEPS = weightedEPS + numInputs.协同效应 / 1000000; // 假设股本为100万股
                    const accretion = (synergizedEPS - numInputs.收购方EPS) / numInputs.收购方EPS;

                    return {
                        '合并前EPS': numInputs.收购方EPS.toFixed(2),
                        '合并后EPS': synergizedEPS.toFixed(2),
                        'EPS增值': (accretion * 100).toFixed(2) + '%',
                        '协同效应贡献': (numInputs.协同效应 / 1000000).toFixed(2),
                        '增值结论': accretion > 0 ? '增值交易' : '稀释交易'
                    };
                } else if (subCategory === 'synergy') {
                    const totalSynergy = numInputs.收入协同 + numInputs.成本协同 + numInputs.税务协同;
                    const netSynergy = totalSynergy - numInputs.整合成本;
                    const realizedSynergy = netSynergy * numInputs.实现概率;

                    return {
                        '总协同效应': totalSynergy.toFixed(0),
                        '净协同效应': netSynergy.toFixed(0),
                        '预期实现价值': realizedSynergy.toFixed(0),
                        '收入协同': numInputs.收入协同.toFixed(0),
                        '成本协同': numInputs.成本协同.toFixed(0),
                        '税务协同': numInputs.税务协同.toFixed(0),
                        '整合成本': numInputs.整合成本.toFixed(0)
                    };
                }
                break;

            case 'optimization':
                if (subCategory === 'markowitz') {
                    const rA = numInputs.资产A预期收益;
                    const rB = numInputs.资产B预期收益;
                    const sigmaA = numInputs.资产A风险;
                    const sigmaB = numInputs.资产B风险;
                    const rho = numInputs.相关系数;

                    // 最小方差组合权重
                    const wA_min = (sigmaB * sigmaB - rho * sigmaA * sigmaB) /
                        (sigmaA * sigmaA + sigmaB * sigmaB - 2 * rho * sigmaA * sigmaB);
                    const wB_min = 1 - wA_min;

                    const portfolioReturn = wA_min * rA + wB_min * rB;
                    const portfolioRisk = Math.sqrt(wA_min * wA_min * sigmaA * sigmaA +
                        wB_min * wB_min * sigmaB * sigmaB +
                        2 * wA_min * wB_min * rho * sigmaA * sigmaB);

                    return {
                        '最优权重A': (wA_min * 100).toFixed(1) + '%',
                        '最优权重B': (wB_min * 100).toFixed(1) + '%',
                        '组合预期收益': (portfolioReturn * 100).toFixed(2) + '%',
                        '组合风险': (portfolioRisk * 100).toFixed(2) + '%',
                        '夏普比率': ((portfolioReturn - 0.03) / portfolioRisk).toFixed(3)
                    };
                } else if (subCategory === 'risk_parity') {
                    const sigmaA = numInputs.资产A波动率;
                    const sigmaB = numInputs.资产B波动率;
                    const rho = numInputs.相关系数;

                    // 风险平价权重（简化计算）
                    const wA_rp = sigmaB / (sigmaA + sigmaB);
                    const wB_rp = sigmaA / (sigmaA + sigmaB);

                    const portfolioRisk = Math.sqrt(wA_rp * wA_rp * sigmaA * sigmaA +
                        wB_rp * wB_rp * sigmaB * sigmaB +
                        2 * wA_rp * wB_rp * rho * sigmaA * sigmaB);

                    return {
                        '风险平价权重A': (wA_rp * 100).toFixed(1) + '%',
                        '风险平价权重B': (wB_rp * 100).toFixed(1) + '%',
                        '组合风险': (portfolioRisk * 100).toFixed(2) + '%',
                        '目标风险': (numInputs.目标风险 * 100).toFixed(2) + '%',
                        '风险匹配': Math.abs(portfolioRisk - numInputs.目标风险) < 0.01 ? '匹配' : '需调整'
                    };
                }
                break;

            case 'banking':
                if (subCategory === 'profitability') {
                    const totalIncome = numInputs.净利息收入 + numInputs.非利息收入;
                    const netIncome = totalIncome - numInputs.营业费用 - numInputs.拨备费用;
                    const nim = (numInputs.净利息收入 / numInputs.总资产) * 100;
                    const roa = (netIncome / numInputs.总资产) * 100;
                    const roe = (netIncome / numInputs.净资产) * 100;
                    const costIncomeRatio = (numInputs.营业费用 / totalIncome) * 100;

                    return {
                        '净息差': nim.toFixed(2) + '%',
                        'ROA': roa.toFixed(2) + '%',
                        'ROE': roe.toFixed(2) + '%',
                        '成本收入比': costIncomeRatio.toFixed(2) + '%',
                        '净利润': netIncome.toFixed(0),
                        '盈利评估': roa >= 1.0 && roe >= 15 ? '优秀' : '一般'
                    };
                } else if (subCategory === 'asset_quality') {
                    const nplRatio = (numInputs.不良贷款 / numInputs.贷款总额) * 100;
                    const provisionCoverage = (numInputs.拨备总额 / numInputs.不良贷款) * 100;
                    const chargeOffRate = (numInputs.核销金额 / numInputs.贷款总额) * 100;
                    const migrationRate = (numInputs.新增不良 / numInputs.贷款总额) * 100;

                    return {
                        '不良贷款率': nplRatio.toFixed(2) + '%',
                        '拨备覆盖率': provisionCoverage.toFixed(2) + '%',
                        '核销率': chargeOffRate.toFixed(2) + '%',
                        '新增不良率': migrationRate.toFixed(2) + '%',
                        '资产质量': nplRatio < 2 && provisionCoverage > 150 ? '优秀' : nplRatio < 5 ? '良好' : '需关注'
                    };
                }
                break;

            case 'realestate':
                if (subCategory === 'development') {
                    const totalCost = numInputs.土地成本 + numInputs.建设成本;
                    const grossProfit = numInputs.销售价格 - totalCost;
                    const grossMargin = (grossProfit / numInputs.销售价格) * 100;
                    const totalPeriod = numInputs.开发周期 + numInputs.销售周期;
                    const irr = (Math.pow(numInputs.销售价格 / totalCost, 1 / totalPeriod) - 1) * 100;

                    return {
                        '总投资': totalCost.toFixed(0),
                        '毛利润': grossProfit.toFixed(0),
                        '毛利率': grossMargin.toFixed(2) + '%',
                        '项目IRR': irr.toFixed(2) + '%',
                        '投资回收期': totalPeriod.toFixed(1) + '年',
                        '项目评级': grossMargin >= 30 && irr >= 15 ? '优秀' : grossMargin >= 20 ? '良好' : '一般'
                    };
                } else if (subCategory === 'investment') {
                    const netIncome = numInputs.租金收入 - numInputs.运营费用;
                    const currentYield = (netIncome / numInputs.物业价值) * 100;
                    const futureValue = numInputs.物业价值 * (1 + numInputs.增值预期);
                    const totalReturn = ((netIncome + (futureValue - numInputs.物业价值)) / numInputs.物业价值) * 100;

                    return {
                        '净营业收入': netIncome.toFixed(0),
                        '当前收益率': currentYield.toFixed(2) + '%',
                        '一年后价值': futureValue.toFixed(0),
                        '总收益率': totalReturn.toFixed(2) + '%',
                        '资本化率': (numInputs.资本化率 * 100).toFixed(2) + '%',
                        '投资评级': currentYield >= 6 ? '优秀' : currentYield >= 4 ? '良好' : '一般'
                    };
                }
                break;

            case 'retail':
                if (subCategory === 'store_analysis') {
                    const salesPerSqm = numInputs.销售收入 / numInputs.店铺面积;
                    const salesPerEmployee = numInputs.销售收入 / numInputs.员工数量;
                    const transactions = numInputs.销售收入 / numInputs.客单价;
                    const conversionRate = (transactions / numInputs.客流量) * 100;

                    return {
                        '坪效': salesPerSqm.toFixed(0) + '元/㎡',
                        '人效': salesPerEmployee.toFixed(0) + '元/人',
                        '交易次数': transactions.toFixed(0),
                        '转化率': conversionRate.toFixed(2) + '%',
                        '客单价': numInputs.客单价.toFixed(2) + '元',
                        '运营效率': salesPerSqm > 2500 && conversionRate > 15 ? '优秀' : '一般'
                    };
                } else if (subCategory === 'inventory') {
                    const turnoverRate = numInputs.销售成本 / numInputs.平均库存;
                    const totalLoss = numInputs.缺货损失 + numInputs.过期损失;
                    const lossRate = (totalLoss / numInputs.销售成本) * 100;
                    const carryingCostRate = (numInputs.库存持有成本 / numInputs.平均库存) * 100;

                    return {
                        '库存周转率': turnoverRate.toFixed(2) + '次/年',
                        '库存周转天数': (365 / turnoverRate).toFixed(0) + '天',
                        '损失率': lossRate.toFixed(2) + '%',
                        '持有成本率': carryingCostRate.toFixed(2) + '%',
                        '总损失': totalLoss.toFixed(0),
                        '库存管理': turnoverRate >= 12 && lossRate < 3 ? '优秀' : turnoverRate >= 6 ? '良好' : '需改善'
                    };
                }
                break;

            case 'manufacturing':
                if (subCategory === 'production') {
                    const utilization = (numInputs.实际产量 / numInputs.设计产能) * 100;
                    const totalCost = numInputs.直接人工 + numInputs.制造费用 + numInputs.质量成本;
                    const unitCost = totalCost / numInputs.实际产量;
                    const laborCostPerUnit = numInputs.直接人工 / numInputs.实际产量;
                    const qualityCostRatio = (numInputs.质量成本 / totalCost) * 100;

                    return {
                        '产能利用率': utilization.toFixed(2) + '%',
                        '单位总成本': unitCost.toFixed(2),
                        '单位人工成本': laborCostPerUnit.toFixed(2),
                        '质量成本占比': qualityCostRatio.toFixed(2) + '%',
                        '实际产量': numInputs.实际产量.toFixed(0),
                        '生产效率': utilization >= 85 && qualityCostRatio < 10 ? '优秀' : utilization >= 70 ? '良好' : '需改善'
                    };
                } else if (subCategory === 'cost_analysis') {
                    const totalCost = numInputs.直接材料 + numInputs.直接人工 + numInputs.制造费用;
                    const unitCost = totalCost / numInputs.产量;
                    const materialRatio = (numInputs.直接材料 / totalCost) * 100;
                    const laborRatio = (numInputs.直接人工 / totalCost) * 100;
                    const overheadRatio = (numInputs.制造费用 / totalCost) * 100;
                    const variableCostRatio = (numInputs.变动成本 / totalCost) * 100;

                    return {
                        '单位成本': unitCost.toFixed(2),
                        '材料成本占比': materialRatio.toFixed(1) + '%',
                        '人工成本占比': laborRatio.toFixed(1) + '%',
                        '制造费用占比': overheadRatio.toFixed(1) + '%',
                        '变动成本占比': variableCostRatio.toFixed(1) + '%',
                        '成本结构': materialRatio > 60 ? '材料密集' : laborRatio > 30 ? '人工密集' : '平衡型'
                    };
                }
                break;

            default:
                return { 结果: '计算完成', 数据: '已处理' };
        }

        return { 结果: '计算完成', 数据: '已处理' };
    };

    // 工具难度标识
    const getDifficultyBadge = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">简单</span>;
            case 'medium':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">中等</span>;
            case 'hard':
                return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">高级</span>;
            default:
                return null;
        }
    };

    // 工具收藏切换
    const toggleFavorite = (toolId) => {
        setFavoriteTools(prev =>
            prev.includes(toolId)
                ? prev.filter(id => id !== toolId)
                : [...prev, toolId]
        );
    };

    // 渲染工具输入界面
    const renderToolInputs = () => {
        if (!selectedTool) return null;

        const tool = selectedTool;

        // 财务比率分析器的特殊处理
        if (tool.id === 'ratio') {
            if (!selectedSubCategory) {
                return (
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">选择比率类别</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {Object.entries(tool.subCategories).map(([key, category]) => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedSubCategory(key)}
                                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-left transition-colors"
                                >
                                    <h5 className="font-medium text-gray-900">{category.name}</h5>
                                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                                    <span className="text-xs text-blue-600 mt-2 inline-block">
                                        {category.ratios.length} 个比率指标
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            }

            const category = tool.subCategories[selectedSubCategory];
            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                        <button
                            onClick={() => setSelectedSubCategory('')}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            返回选择类别
                        </button>
                    </div>

                    {/* 自动取数按钮 - 移动到上部 */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h5 className="font-medium text-blue-900">快速填充数据</h5>
                                <p className="text-sm text-blue-700">自动填充所有比率所需的自动取数</p>
                            </div>
                            <button
                                onClick={() => {
                                    const comprehensiveData = getComprehensiveExampleData();
                                    setToolInputs(comprehensiveData);
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                            >
                                自动取数
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {category.ratios.map((ratio) => (
                            <div key={ratio.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h5 className="font-medium text-gray-900">{ratio.name}</h5>
                                        <p className="text-sm text-gray-600">公式: {ratio.formula}</p>
                                        <p className="text-xs text-blue-600">{ratio.benchmark}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const result = calculateRatio(ratio.id, toolInputs);
                                            setToolResults({
                                                ...toolResults,
                                                [`${selectedTool.id}_${selectedSubCategory}_${ratio.id}`]: result
                                            });
                                        }}
                                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                    >
                                        计算
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {ratio.inputs.map((input) => (
                                        <div key={input}>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                {input}
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                placeholder={`输入${input}`}
                                                value={toolInputs[input] || ''}
                                                onChange={(e) => setToolInputs({
                                                    ...toolInputs,
                                                    [input]: e.target.value
                                                })}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* 显示计算结果 */}
                                {toolResults[`${selectedTool.id}_${selectedSubCategory}_${ratio.id}`] && (
                                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-green-900">
                                                {ratio.name}: {toolResults[`${selectedTool.id}_${selectedSubCategory}_${ratio.id}`].value}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                                                {toolResults[`${selectedTool.id}_${selectedSubCategory}_${ratio.id}`].evaluation}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // 其他工具的处理
        if (tool.subCategories && !selectedSubCategory) {
            return (
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">选择分析类型</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {Object.entries(tool.subCategories).map(([key, category]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedSubCategory(key)}
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-left transition-colors"
                            >
                                <h5 className="font-medium text-gray-900">{category.name}</h5>
                                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                                {category.inputs && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {category.inputs.slice(0, 3).map((input, index) => (
                                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                {input}
                                            </span>
                                        ))}
                                        {category.inputs.length > 3 && (
                                            <span className="text-xs text-gray-500">+{category.inputs.length - 3}个</span>
                                        )}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        // 显示选定子类别的输入界面
        if (tool.subCategories && selectedSubCategory) {
            const category = tool.subCategories[selectedSubCategory];
            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                        <button
                            onClick={() => setSelectedSubCategory('')}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            返回选择类型
                        </button>
                    </div>
                    <p className="text-gray-600">{category.description}</p>

                    {/* 自动取数区域 - 移动到上部 */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">自动取数</h5>
                        <button
                            onClick={() => {
                                const exampleData = getExampleData(selectedTool.id, selectedSubCategory);
                                setToolInputs(exampleData);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            自动取数
                        </button>
                    </div>

                    <div className="space-y-4">
                        {category.inputs.map((input, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {input}
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder={`请输入${input}`}
                                    value={toolInputs[input] || ''}
                                    onChange={(e) => setToolInputs({
                                        ...toolInputs,
                                        [input]: e.target.value
                                    })}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => {
                                const result = executeTool(selectedTool.id, selectedSubCategory, toolInputs);
                                setToolResults({ ...toolResults, [`${selectedTool.id}_${selectedSubCategory}`]: result });
                            }}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            <Calculator className="w-4 h-4 mr-2 inline" />
                            开始计算
                        </button>
                        <button
                            onClick={() => setToolInputs({})}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            );
        }

        return null;
    };

    // 渲染计算结果
    const renderResults = () => {
        const resultKey = selectedTool.id === 'ratio'
            ? `${selectedTool.id}_${selectedSubCategory}`
            : selectedSubCategory
                ? `${selectedTool.id}_${selectedSubCategory}`
                : selectedTool.id;

        const result = toolResults[resultKey];

        if (!result) {
            return (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">输入数据后点击计算查看结果</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-900">计算完成</span>
                    </div>
                    <div className="space-y-2">
                        {Object.entries(result).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">{key}:</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {String(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm">
                        <Download className="w-4 h-4 mr-2 inline" />
                        导出结果
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 text-sm">
                        <Save className="w-4 h-4 mr-2 inline" />
                        保存模板
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* 工具类别选择 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">分析工具分类</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(analysisTools).map(([key, category]) => (
                        <button
                            key={key}
                            onClick={() => setActiveToolCategory(key)}
                            className={`p-4 rounded-lg border-2 transition-all ${activeToolCategory === key
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="text-center">
                                <h4 className="font-semibold">{category.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full mt-2 inline-block">
                                    {category.tools.length} 个工具
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 我的收藏工具 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                        我的收藏工具
                    </h3>
                    <span className="text-sm text-gray-500">{favoriteTools.length} 个收藏</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {favoriteTools.map(toolId => {
                        let tool = null;
                        for (const category of Object.values(analysisTools)) {
                            const found = category.tools.find(t => t.id === toolId);
                            if (found) {
                                tool = found;
                                break;
                            }
                        }
                        if (!tool) return null;

                        const IconComponent = tool.icon;
                        return (
                            <div key={toolId} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-2">
                                    <IconComponent className="w-6 h-6 text-blue-600" />
                                    <button
                                        onClick={() => toggleFavorite(toolId)}
                                        className="text-yellow-500 hover:text-yellow-600"
                                    >
                                        <Star className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">{tool.name}</h4>
                                <p className="text-sm text-gray-600">{tool.description}</p>
                                <button
                                    onClick={() => {
                                        setSelectedTool(tool);
                                        setSelectedSubCategory('');
                                        setToolInputs({});
                                    }}
                                    className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm"
                                >
                                    使用工具
                                </button>
                            </div>
                        );
                    })}
                    {favoriteTools.length === 0 && (
                        <div className="col-span-3 text-center py-8 text-gray-500">
                            <Star className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>还没有收藏任何工具</p>
                            <p className="text-sm">点击工具卡片上的星标来收藏常用工具</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 工具列表 */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {analysisTools[activeToolCategory].name}
                    </h3>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="搜索工具..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {analysisTools[activeToolCategory].tools.map((tool) => {
                        const IconComponent = tool.icon;
                        const isFavorite = favoriteTools.includes(tool.id);

                        return (
                            <div key={tool.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                                                <IconComponent className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-gray-900">{tool.name}</h4>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    {getDifficultyBadge(tool.difficulty)}
                                                    <span className="text-xs text-gray-500">{tool.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleFavorite(tool.id)}
                                            className={`${isFavorite ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                                        >
                                            <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>

                                    <p className="text-gray-600 mb-4">{tool.description}</p>

                                    {tool.subCategories && (
                                        <div className="mb-4">
                                            <h5 className="text-sm font-medium text-gray-700 mb-2">分析类型：</h5>
                                            <div className="flex flex-wrap gap-1">
                                                {Object.values(tool.subCategories).map((subCat, index) => (
                                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                        {subCat.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedTool(tool);
                                                setSelectedSubCategory('');
                                                setToolInputs({});
                                            }}
                                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm"
                                        >
                                            使用工具
                                        </button>
                                        <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                            <BookOpen className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 使用指南 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border">
                <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Lightbulb className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">使用指南</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                            <div>
                                <h4 className="font-medium mb-1">1. 选择工具</h4>
                                <p>根据分析需求选择合适的工具，可按难度和功能筛选</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-1">2. 输入数据</h4>
                                <p>按照工具要求输入财务数据，支持手动输入或自动取数</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-1">3. 获取结果</h4>
                                <p>查看分析结果，支持导出报告和保存模板</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 工具使用模态框 */}
            {selectedTool && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-6xl w-full max-h-screen overflow-hidden flex flex-col">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <selectedTool.icon className="w-8 h-8 text-blue-600 mr-3" />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">{selectedTool.name}</h3>
                                        <p className="text-gray-600">{selectedTool.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedTool(null);
                                        setSelectedSubCategory('');
                                        setToolInputs({});
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                                {/* 输入区域 */}
                                <div className="space-y-6">
                                    {renderToolInputs()}
                                </div>

                                {/* 结果区域 */}
                                <div className="space-y-6">
                                    <h4 className="text-lg font-semibold text-gray-900">计算结果</h4>
                                    {renderResults()}

                                    {/* 工具说明 */}
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <h5 className="font-medium text-blue-900 mb-2">工具说明</h5>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• 适用场景：{selectedTool.category}分析</li>
                                            <li>• 难度等级：{selectedTool.difficulty}</li>
                                            {selectedTool.subCategories && (
                                                <li>• 包含 {Object.keys(selectedTool.subCategories).length} 种分析类型</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisToolsModule;