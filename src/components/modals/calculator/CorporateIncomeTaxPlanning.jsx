import React, { useState } from 'react';
import { Calculator, RefreshCw, AlertTriangle, TrendingUp, FileText, Building, Target, Users, Briefcase, Plus, Minus, Settings, Save, History, Download } from 'lucide-react';

const CorporateIncomeTaxPlanning = ({ data, saveToHistory }) => {
    const [planningData, setPlanningData] = useState({
        // 收入确认时间筹划
        revenue: {
            totalRevenue: data?.revenue || 0,
            deferredRevenue: 0,
            installmentSales: 0,
            crossYearContracts: 0,
            revenueRecognitionMethod: 'accrual',
            advancePayments: 0,
            contractAssets: 0,
            unbilledRevenue: 0
        },
        // 成本费用扣除优化 - 完整补全
        expenses: {
            // 三项费用限制
            businessEntertainment: 0,
            advertisingExpenses: 0,
            employeeWelfare: 0,
            employeeEducation: 0,
            tradeUnionFees: 0,

            // 研发相关
            rdExpenses: 0,
            rdDeductionMethod: 'expense',
            rdAddedDeduction: true,
            rdCapitalized: 0,

            // 其他费用
            badDebtProvision: 0,
            inventoryProvision: 0,
            assetImpairment: 0,
            insuranceFees: 0,
            consultingFees: 0,
            auditFees: 0,
            legalFees: 0,
            maintenanceFees: 0,
            travelExpenses: 0,
            officeExpenses: 0,
            utilities: 0,
            rentExpenses: 0,

            // 税费
            businessTax: 0,
            stampDuty: 0,
            propertyTax: 0,
            landUseTax: 0,
            vehicleTax: 0,

            // 工资薪酬
            salariesWages: 0,
            socialInsurance: 0,
            housingFund: 0,
            supplementaryPension: 0,
            supplementaryMedical: 0,

            // 财务费用
            interestExpenseDeductible: 0,
            bankCharges: 0,
            exchangeLoss: 0,

            // 其他扣除
            charitableDonations: 0,
            environmentalProtection: 0,
            safetyProduction: 0,
            qualityManagement: 0
        },
        // 资产处置和折旧筹划
        assets: {
            fixedAssets: 0,
            depreciationMethod: 'straight',
            acceleratedDepreciation: false,
            oneTimeDeduction: false,
            intangibleAssets: 0,
            amortizationPeriod: 10,
            assetDisposalGain: 0,
            assetDisposalLoss: 0,
            biologicalAssets: 0,
            investmentProperty: 0,
            constructionInProgress: 0,
            oilGasAssets: 0,
            miningRights: 0,
            landUseRights: 0,
            assetRevaluation: 0,
            governmentGrants: 0
        },
        // 税收优惠政策运用 - 完整补全
        taxIncentives: {
            // 企业类型优惠
            isHighTech: false,
            isSmallMicro: false,
            isSoftwareCompany: false,
            isIntegratedCircuit: false,
            isAdvancedManufacturing: false,
            isModernService: false,
            isCulturalCreative: false,
            isLogistics: false,
            isEnvironmentalProtection: false,
            isNewEnergy: false,

            // 地区优惠
            isWesternDevelopment: false,
            isHainanFTZ: false,
            isShenzhenQianhai: false,
            isShanghaiFTZ: false,
            isPudongNewArea: false,
            isXionganNewArea: false,
            isHengqin: false,
            isPovertyAlleviation: false,

            // 产业优惠
            isAgricultureForestry: false,
            isWaterConservancy: false,
            isRailwayTransport: false,
            isPublicUtilities: false,
            isResidenceService: false,
            isTourism: false,
            isSportsCulture: false,

            // 特殊优惠
            charitableDonations: 0,
            technologyTransferIncome: 0,
            employmentIncentive: 0,
            disabledEmployment: 0,
            veteransEmployment: 0,
            collegGraduateEmployment: 0,
            rdEquipmentDeduction: 0,
            environmentEquipment: 0,
            energySavingEquipment: 0,
            safetyEquipment: 0,

            // 国际税收
            foreignTaxCredit: 0,
            witholdingTaxRefund: 0,
            treatyBenefits: false
        },
        // 组织架构和业务模式优化 - 完整补全
        structure: {
            organizationType: 'single',
            subsidiaryCount: 0,
            branchCount: 0,
            jointVentureCount: 0,
            partnershipCount: 0,
            representativeOfficeCount: 0,

            // 地域分布
            domesticEntities: 0,
            foreignEntities: 0,
            offshoreEntities: 0,

            // 业务模式
            outsourcingExpenses: 0,
            serviceCenterExpenses: 0,
            managementFees: 0,
            royaltyPayments: 0,

            // 税收洼地
            taxHavenEntities: 0,
            regionTaxRate: 25,
            lowTaxJurisdictions: [],

            // 重组筹划
            mergerPlanning: false,
            splitPlanning: false,
            assetReorganization: false,
            businessReorganization: false,

            // 控股结构
            holdingCompanyStructure: false,
            intermediateHoldingCompany: false,
            operatingSubsidiaries: 0,
            investmentVehicles: 0
        },
        // 关联交易定价筹划 - 完整补全
        relatedParty: {
            hasRelatedParties: false,

            // 商品交易
            goodsSales: 0,
            goodsPurchases: 0,
            goodsMargin: 0,

            // 无形资产交易
            royaltyIncome: 0,
            royaltyExpenses: 0,
            ipLicensing: 0,
            technologyTransfer: 0,
            trademarkLicensing: 0,

            // 融资安排
            intercompanyLoans: 0,
            interestRateSpread: 0,
            guaranteeFees: 0,
            financingCharges: 0,

            // 服务交易
            managementServiceFees: 0,
            technicalServiceFees: 0,
            marketingServiceFees: 0,
            administrativeServiceFees: 0,

            // 转让定价调整
            transferPricingAdjustment: 0,
            apaDetermination: 0,
            comparabilityAnalysis: 0,

            // 成本分摊
            costSharingArrangement: 0,
            sharedCosts: 0,
            costAllocationKeys: [],

            // 其他关联交易
            assetTransfers: 0,
            businessReorganization: 0,
            equityTransactions: 0
        },
        // 亏损弥补和盈利平衡 - 完整补全
        lossCarryforward: {
            // 亏损情况
            priorYearLosses: [0, 0, 0, 0, 0], // 前5年亏损
            currentYearLoss: 0,
            lossCarryforwardYears: 5,

            // 亏损来源
            operatingLoss: 0,
            investmentLoss: 0,
            assetImpairmentLoss: 0,
            extraordinaryLoss: 0,

            // 盈利平衡
            profitSmoothing: false,
            incomeShifting: false,
            expenseAcceleration: false,

            // 集团内平衡
            groupProfitOffset: false,
            subsidiaryLosses: 0,
            branchLosses: 0,

            // 特殊重组
            mergerLossInheritance: 0,
            spinoffLossAllocation: 0,
            assetTransferLoss: 0,

            // 期间调整
            accountingPeriodAdjustment: false,
            consolidationAdjustment: false,

            // 限制条件
            businessContinuity: true,
            ownershipChange: false,
            industryChange: false
        },
        // 投资和融资结构筹划 - 完整补全
        financing: {
            // 投资收益
            dividendIncome: 0,
            interestIncome: 0,
            capitalGains: 0,
            investmentPropertyIncome: 0,

            // 融资成本
            interestExpenses: 0,
            financingFees: 0,
            guaranteeFees: 0,
            issuanceCosts: 0,

            // 融资结构
            equityFinancing: 0,
            debtFinancing: 0,
            hybridInstruments: 0,
            debtToEquityRatio: 0,

            // 投资结构
            investmentStructure: 'equity',
            directInvestment: 0,
            indirectInvestment: 0,
            portfolioInvestment: 0,

            // 特殊工具
            convertibleBonds: 0,
            preferredShares: 0,
            perpetualBonds: 0,
            contingentConvertible: 0,

            // 国际投资
            foreignInvestment: 0,
            offshoreFunding: 0,
            crossBorderFinancing: 0,

            // 税务优化
            capitalStructureOptimization: false,
            thinCapitalizationRules: false,
            earningsStripping: false,

            // 金融工具
            derivatives: 0,
            hedgingInstruments: 0,
            financialLeasing: 0,
            factoring: 0,

            // 退出策略
            exitStrategy: 'ipo',
            liquidationValue: 0,
            transferPricing: 0
        },
        // 基础信息
        basic: {
            taxableIncome: data?.revenue - data?.cost - data?.expenses || 0,
            currentTaxRate: 25,
            industry: 'general',
            region: 'general',
            companyType: 'general',
            employees: 0,
            revenue: data?.revenue || 0,
            totalAssets: 0,
            registeredCapital: 0,
            establishmentDate: '',
            taxResidency: 'domestic'
        }
    });

    const [citPlanningResult, setCitPlanningResult] = useState({
        originalTax: 0,
        optimizedTax: 0,
        taxSavings: 0,
        effectiveTaxRate: 0,
        savingsPercentage: 0,
        recommendations: []
    });

    const [activeCitTab, setActiveCitTab] = useState('cit-basic');
    const [savedPlans, setSavedPlans] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const citPlanningTabs = [
        { id: 'cit-revenue', name: '收入确认', icon: TrendingUp },
        { id: 'cit-expenses', name: '成本费用', icon: FileText },
        { id: 'cit-assets', name: '资产折旧', icon: Building },
        { id: 'cit-incentives', name: '税收优惠', icon: Target },
        { id: 'cit-structure', name: '组织架构', icon: Users },
        { id: 'cit-related', name: '关联交易', icon: Briefcase },
        { id: 'cit-loss', name: '亏损弥补', icon: Minus },
        { id: 'cit-financing', name: '投融资', icon: Plus },
        { id: 'cit-basic', name: '基础信息', icon: Settings }
    ];

    const updatePlanningField = (category, field, value) => {
        setPlanningData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    const autoFillPlanningData = (category) => {
        const simulatedData = {
            revenue: {
                totalRevenue: 10000000,
                deferredRevenue: 500000,
                installmentSales: 200000,
                crossYearContracts: 300000,
                advancePayments: 150000,
                contractAssets: 100000,
                unbilledRevenue: 80000
            },
            expenses: {
                businessEntertainment: 100000,
                advertisingExpenses: 500000,
                employeeWelfare: 300000,
                employeeEducation: 50000,
                tradeUnionFees: 80000,
                rdExpenses: 800000,
                salariesWages: 2000000,
                socialInsurance: 400000,
                housingFund: 200000,
                consultingFees: 150000,
                auditFees: 50000,
                legalFees: 30000,
                rentExpenses: 200000,
                travelExpenses: 80000,
                officeExpenses: 60000,
                utilities: 40000,
                interestExpenseDeductible: 100000,
                badDebtProvision: 50000,
                inventoryProvision: 30000,
                assetImpairment: 20000
            },
            assets: {
                fixedAssets: 5000000,
                intangibleAssets: 1000000,
                assetDisposalGain: 50000,
                assetDisposalLoss: 30000,
                landUseRights: 800000,
                constructionInProgress: 300000,
                biologicalAssets: 0,
                investmentProperty: 200000,
                oilGasAssets: 0,
                miningRights: 0,
                assetRevaluation: 0,
                governmentGrants: 100000
            },
            taxIncentives: {
                charitableDonations: 50000,
                technologyTransferIncome: 100000,
                employmentIncentive: 20000,
                disabledEmployment: 15000,
                veteransEmployment: 10000,
                collegGraduateEmployment: 12000,
                rdEquipmentDeduction: 200000,
                environmentEquipment: 150000,
                energySavingEquipment: 100000,
                safetyEquipment: 80000,
                foreignTaxCredit: 30000,
                witholdingTaxRefund: 25000
            },
            structure: {
                subsidiaryCount: 3,
                branchCount: 2,
                jointVentureCount: 1,
                partnershipCount: 0,
                representativeOfficeCount: 1,
                domesticEntities: 5,
                foreignEntities: 2,
                offshoreEntities: 1,
                outsourcingExpenses: 200000,
                serviceCenterExpenses: 150000,
                managementFees: 150000,
                royaltyPayments: 100000,
                taxHavenEntities: 1,
                regionTaxRate: 15,
                operatingSubsidiaries: 3,
                investmentVehicles: 1
            },
            relatedParty: {
                hasRelatedParties: true,
                goodsSales: 300000,
                goodsPurchases: 500000,
                goodsMargin: 20,
                royaltyIncome: 80000,
                royaltyExpenses: 200000,
                ipLicensing: 60000,
                technologyTransfer: 150000,
                trademarkLicensing: 40000,
                intercompanyLoans: 1000000,
                interestRateSpread: 2.5,
                guaranteeFees: 20000,
                financingCharges: 15000,
                managementServiceFees: 100000,
                technicalServiceFees: 80000,
                marketingServiceFees: 60000,
                administrativeServiceFees: 40000,
                transferPricingAdjustment: 50000,
                apaDetermination: 30000,
                comparabilityAnalysis: 25000,
                costSharingArrangement: 100000,
                sharedCosts: 80000,
                assetTransfers: 200000,
                businessReorganization: 150000,
                equityTransactions: 300000
            },
            lossCarryforward: {
                priorYearLosses: [100000, 200000, 0, 150000, 0],
                currentYearLoss: 50000,
                lossCarryforwardYears: 5,
                operatingLoss: 80000,
                investmentLoss: 30000,
                assetImpairmentLoss: 20000,
                extraordinaryLoss: 15000,
                subsidiaryLosses: 100000,
                branchLosses: 50000,
                mergerLossInheritance: 200000,
                spinoffLossAllocation: 100000,
                assetTransferLoss: 30000
            },
            financing: {
                dividendIncome: 100000,
                interestIncome: 50000,
                capitalGains: 80000,
                investmentPropertyIncome: 40000,
                interestExpenses: 200000,
                financingFees: 30000,
                guaranteeFees: 25000,
                issuanceCosts: 20000,
                equityFinancing: 2000000,
                debtFinancing: 1500000,
                hybridInstruments: 500000,
                debtToEquityRatio: 0.75,
                directInvestment: 1000000,
                indirectInvestment: 500000,
                portfolioInvestment: 300000,
                convertibleBonds: 200000,
                preferredShares: 150000,
                perpetualBonds: 100000,
                contingentConvertible: 80000,
                foreignInvestment: 300000,
                offshoreFunding: 200000,
                crossBorderFinancing: 150000,
                derivatives: 100000,
                hedgingInstruments: 80000,
                financialLeasing: 60000,
                factoring: 40000,
                liquidationValue: 500000,
                transferPricing: 100000
            },
            basic: {
                taxableIncome: 2000000,
                currentTaxRate: 25,
                employees: 150,
                revenue: 10000000,
                totalAssets: 8000000,
                registeredCapital: 2000000,
                establishmentDate: '2020-01-01'
            }
        };

        if (simulatedData[category]) {
            setPlanningData(prev => ({
                ...prev,
                [category]: { ...prev[category], ...simulatedData[category] }
            }));
        }
    };

    const calculateCitPlanning = () => {
        try {
            let originalIncome = Number(planningData.basic.taxableIncome) || 0;
            let optimizedIncome = originalIncome;
            const recommendations = [];

            if (originalIncome <= 0) {
                alert('请在基础信息中填入应纳税所得额');
                return;
            }

            // 收入筹划计算
            const deferredRevenue = Number(planningData.revenue.deferredRevenue) || 0;
            if (deferredRevenue > 0) {
                optimizedIncome -= deferredRevenue;
                recommendations.push(`通过递延收入确认 ${deferredRevenue.toLocaleString()} 元，减少当期应纳税所得额`);
            }

            const installmentSales = Number(planningData.revenue.installmentSales) || 0;
            if (installmentSales > 0) {
                const deferredPortion = installmentSales * 0.3;
                optimizedIncome -= deferredPortion;
                recommendations.push(`通过分期收款销售，递延确认收入 ${deferredPortion.toLocaleString()} 元`);
            }

            const crossYearContracts = Number(planningData.revenue.crossYearContracts) || 0;
            if (crossYearContracts > 0) {
                const deferredContract = crossYearContracts * 0.4;
                optimizedIncome -= deferredContract;
                recommendations.push(`通过跨年度合同，递延确认收入 ${deferredContract.toLocaleString()} 元`);
            }

            // 费用扣除优化
            let additionalDeductions = 0;

            // 研发费用加计扣除
            const rdExpenses = Number(planningData.expenses.rdExpenses) || 0;
            if (planningData.expenses.rdAddedDeduction && rdExpenses > 0) {
                const rdDeduction = rdExpenses * 0.75;
                additionalDeductions += rdDeduction;
                recommendations.push(`研发费用加计扣除 ${rdDeduction.toLocaleString()} 元`);
            }

            // 三项费用限制优化
            const businessEntertainment = Number(planningData.expenses.businessEntertainment) || 0;
            const salariesWages = Number(planningData.expenses.salariesWages) || 0;
            if (businessEntertainment > 0 && salariesWages > 0) {
                const revenue = Number(planningData.revenue.totalRevenue) || 0;
                const entertainmentLimit = Math.min(businessEntertainment, revenue * 0.005, salariesWages * 0.14);
                if (businessEntertainment > entertainmentLimit) {
                    recommendations.push(`业务招待费超过限额，建议控制在 ${entertainmentLimit.toLocaleString()} 元以内`);
                }
            }

            // 职工福利费限制
            const employeeWelfare = Number(planningData.expenses.employeeWelfare) || 0;
            if (employeeWelfare > 0 && salariesWages > 0) {
                const welfareLimit = salariesWages * 0.14;
                if (employeeWelfare > welfareLimit) {
                    recommendations.push(`职工福利费超过限额，建议控制在 ${welfareLimit.toLocaleString()} 元以内`);
                }
            }

            // 折旧优化
            const fixedAssets = Number(planningData.assets.fixedAssets) || 0;
            if (planningData.assets.acceleratedDepreciation && fixedAssets > 0) {
                const additionalDepreciation = fixedAssets * 0.15;
                additionalDeductions += additionalDepreciation;
                recommendations.push(`采用加速折旧，增加当期折旧费用 ${additionalDepreciation.toLocaleString()} 元`);
            }

            if (planningData.assets.oneTimeDeduction && fixedAssets > 0) {
                const oneTimeAmount = Math.min(fixedAssets, 5000000) * 0.5;
                additionalDeductions += oneTimeAmount;
                recommendations.push(`符合条件设备享受一次性扣除政策 ${oneTimeAmount.toLocaleString()} 元`);
            }

            // 无形资产摊销
            const intangibleAssets = Number(planningData.assets.intangibleAssets) || 0;
            const amortizationPeriod = Number(planningData.assets.amortizationPeriod) || 10;
            if (intangibleAssets > 0) {
                const annualAmortization = intangibleAssets / amortizationPeriod;
                additionalDeductions += annualAmortization * 0.2; // 加速摊销
                recommendations.push(`无形资产采用加速摊销，增加当期摊销费用 ${(annualAmortization * 0.2).toLocaleString()} 元`);
            }

            optimizedIncome -= additionalDeductions;

            // 亏损弥补
            const priorLosses = planningData.lossCarryforward.priorYearLosses || [0, 0, 0, 0, 0];
            const totalPriorLosses = priorLosses.reduce((sum, loss) => sum + (Number(loss) || 0), 0);
            if (totalPriorLosses > 0) {
                const lossOffset = Math.min(optimizedIncome, totalPriorLosses);
                optimizedIncome -= lossOffset;
                recommendations.push(`利用以前年度亏损弥补 ${lossOffset.toLocaleString()} 元`);
            }

            // 投资收益优化
            const dividendIncome = Number(planningData.financing.dividendIncome) || 0;
            if (dividendIncome > 0) {
                const taxFreeDividend = dividendIncome * 0.5;
                optimizedIncome -= taxFreeDividend;
                recommendations.push(`符合条件的股息收入享受免税待遇 ${taxFreeDividend.toLocaleString()} 元`);
            }

            // 技术转让所得优惠
            const techTransferIncome = Number(planningData.taxIncentives.technologyTransferIncome) || 0;
            if (techTransferIncome > 0) {
                const exemptAmount = Math.min(techTransferIncome, 5000000);
                optimizedIncome -= exemptAmount;
                recommendations.push(`技术转让所得享受免税优惠 ${exemptAmount.toLocaleString()} 元`);
            }

            // 关联交易优化
            const royaltyExpenses = Number(planningData.relatedParty.royaltyExpenses) || 0;
            if (planningData.relatedParty.hasRelatedParties && royaltyExpenses > 0) {
                recommendations.push(`通过合理的关联交易定价，优化税负分配`);
            }

            // 公益性捐赠扣除
            const charitableDonations = Number(planningData.taxIncentives.charitableDonations) || 0;
            if (charitableDonations > 0) {
                const donationLimit = optimizedIncome * 0.12;
                const deductibleDonation = Math.min(charitableDonations, donationLimit);
                optimizedIncome -= deductibleDonation;
                recommendations.push(`公益性捐赠可扣除 ${deductibleDonation.toLocaleString()} 元`);
            }

            // 环保设备优惠
            const environmentEquipment = Number(planningData.taxIncentives.environmentEquipment) || 0;
            if (environmentEquipment > 0) {
                const envDeduction = environmentEquipment * 0.1;
                additionalDeductions += envDeduction;
                recommendations.push(`环保设备投资抵扣 ${envDeduction.toLocaleString()} 元`);
            }

            // 确保优化后收入不为负
            optimizedIncome = Math.max(0, optimizedIncome);

            // 税收优惠计算
            let effectiveTaxRate = Number(planningData.basic.currentTaxRate) || 25;

            if (planningData.taxIncentives.isHighTech) {
                effectiveTaxRate = 15;
                recommendations.push('享受高新技术企业15%优惠税率');
            } else if (planningData.taxIncentives.isSmallMicro) {
                const revenue = Number(planningData.basic.revenue) || 0;
                const employees = Number(planningData.basic.employees) || 0;
                const assets = Number(planningData.basic.totalAssets) || 0;

                if (revenue <= 3000000 && employees <= 300 && assets <= 50000000) {
                    if (optimizedIncome <= 1000000) {
                        effectiveTaxRate = 2.5;
                    } else if (optimizedIncome <= 3000000) {
                        effectiveTaxRate = 10;
                    } else {
                        effectiveTaxRate = 20;
                    }
                    recommendations.push('享受小微企业优惠税率');
                }
            } else if (planningData.taxIncentives.isWesternDevelopment) {
                effectiveTaxRate = 15;
                recommendations.push('享受西部大开发15%优惠税率');
            } else if (planningData.taxIncentives.isHainanFTZ) {
                effectiveTaxRate = 15;
                recommendations.push('享受海南自贸港15%优惠税率');
            } else if (planningData.taxIncentives.isShenzhenQianhai) {
                effectiveTaxRate = 15;
                recommendations.push('享受深圳前海15%优惠税率');
            } else if (planningData.taxIncentives.isSoftwareCompany) {
                recommendations.push('软件企业享受两免三减半等优惠政策');
                effectiveTaxRate = 12.5; // 假设减半征收
            } else if (planningData.taxIncentives.isIntegratedCircuit) {
                recommendations.push('集成电路企业享受十年免税等优惠政策');
                effectiveTaxRate = 0; // 假设免税期
            }

            // 地区特殊优惠
            if (planningData.taxIncentives.isPudongNewArea) {
                recommendations.push('享受浦东新区特殊优惠政策');
            }

            if (planningData.taxIncentives.isXionganNewArea) {
                recommendations.push('享受雄安新区优惠政策');
            }

            // 产业优惠
            if (planningData.taxIncentives.isAgricultureForestry) {
                recommendations.push('农林渔业项目享受免税优惠');
                effectiveTaxRate = Math.min(effectiveTaxRate, 0);
            }

            if (planningData.taxIncentives.isEnvironmentalProtection) {
                recommendations.push('环保项目享受三免三减半优惠');
                effectiveTaxRate = Math.min(effectiveTaxRate, 12.5);
            }

            // 就业激励
            const disabledEmployment = Number(planningData.taxIncentives.disabledEmployment) || 0;
            if (disabledEmployment > 0) {
                const disabledDeduction = disabledEmployment * 8000;
                optimizedIncome -= disabledDeduction;
                recommendations.push(`安置残疾人员工资加计扣除 ${disabledDeduction.toLocaleString()} 元`);
            }

            const veteransEmployment = Number(planningData.taxIncentives.veteransEmployment) || 0;
            if (veteransEmployment > 0) {
                const veteransDeduction = veteransEmployment * 6000;
                optimizedIncome -= veteransDeduction;
                recommendations.push(`安置退役军人工资加计扣除 ${veteransDeduction.toLocaleString()} 元`);
            }

            // 重新确保优化后收入不为负
            optimizedIncome = Math.max(0, optimizedIncome);

            // 计算最终税负
            const originalTaxRate = Number(planningData.basic.currentTaxRate) || 25;
            const originalTax = Math.max(0, originalIncome * (originalTaxRate / 100));
            const optimizedTax = Math.max(0, optimizedIncome * (effectiveTaxRate / 100));
            const taxSavings = Math.max(0, originalTax - optimizedTax);
            const actualEffectiveTaxRate = originalIncome > 0 ? (optimizedTax / originalIncome) * 100 : 0;
            const savingsPercentage = originalTax > 0 ? (taxSavings / originalTax) * 100 : 0;

            // 组织架构优化建议
            if (planningData.structure.subsidiaryCount > 0) {
                recommendations.push('通过子公司架构优化，实现税负分散和地区优惠利用');
            }

            if (planningData.structure.taxHavenEntities > 0) {
                recommendations.push('利用税收洼地政策，降低整体税负');
            }

            // 关联交易优化建议
            if (planningData.relatedParty.hasRelatedParties) {
                const intercompanyLoans = Number(planningData.relatedParty.intercompanyLoans) || 0;
                if (intercompanyLoans > 0) {
                    recommendations.push('通过合理的关联方借款利率，优化利息费用扣除');
                }

                const managementFees = Number(planningData.relatedParty.managementServiceFees) || 0;
                if (managementFees > 0) {
                    recommendations.push('通过管理服务费分摊，优化关联方间税负分配');
                }
            }

            // 投融资结构优化建议
            const debtToEquityRatio = Number(planningData.financing.debtToEquityRatio) || 0;
            if (debtToEquityRatio > 2) {
                recommendations.push('注意资本弱化规则，建议优化债股比例');
            }

            const foreignInvestment = Number(planningData.financing.foreignInvestment) || 0;
            if (foreignInvestment > 0) {
                recommendations.push('境外投资可能享受境外所得税抵免优惠');
            }

            const result = {
                originalTax: Number(originalTax.toFixed(2)),
                optimizedTax: Number(optimizedTax.toFixed(2)),
                taxSavings: Number(taxSavings.toFixed(2)),
                effectiveTaxRate: Number(actualEffectiveTaxRate.toFixed(2)),
                savingsPercentage: Number(savingsPercentage.toFixed(2)),
                recommendations: recommendations
            };

            setCitPlanningResult(result);

            // 调用父组件的保存历史功能
            if (saveToHistory) {
                saveToHistory('企业所得税筹划', taxSavings / 10000, actualEffectiveTaxRate, planningData);
            }

        } catch (error) {
            console.error('计算错误:', error);
            alert('计算过程中出现错误: ' + error.message);
        }
    };

    // 保存方案
    const savePlan = () => {
        const plan = {
            id: Date.now(),
            name: `筹划方案_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`,
            data: planningData,
            result: citPlanningResult,
            createdAt: new Date().toISOString()
        };
        setSavedPlans(prev => [...prev, plan]);
        alert('方案已保存！');
    };

    // 导出方案
    const exportPlan = () => {
        const exportData = {
            planningData,
            calculationResult: citPlanningResult,
            exportDate: new Date().toISOString(),
            summary: {
                originalTax: citPlanningResult.originalTax,
                optimizedTax: citPlanningResult.optimizedTax,
                taxSavings: citPlanningResult.taxSavings,
                savingsPercentage: citPlanningResult.savingsPercentage
            }
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `企业所得税筹划方案_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const renderCitPlanningContent = () => {
        switch (activeCitTab) {
            case 'cit-revenue':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">收入确认时间筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('revenue')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">总收入</label>
                                <input
                                    type="number"
                                    value={planningData.revenue.totalRevenue}
                                    onChange={(e) => updatePlanningField('revenue', 'totalRevenue', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">递延收入</label>
                                <input
                                    type="number"
                                    value={planningData.revenue.deferredRevenue}
                                    onChange={(e) => updatePlanningField('revenue', 'deferredRevenue', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">分期收款销售</label>
                                <input
                                    type="number"
                                    value={planningData.revenue.installmentSales}
                                    onChange={(e) => updatePlanningField('revenue', 'installmentSales', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">跨年度合同</label>
                                <input
                                    type="number"
                                    value={planningData.revenue.crossYearContracts}
                                    onChange={(e) => updatePlanningField('revenue', 'crossYearContracts', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">预收款项</label>
                                <input
                                    type="number"
                                    value={planningData.revenue.advancePayments}
                                    onChange={(e) => updatePlanningField('revenue', 'advancePayments', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">合同资产</label>
                                <input
                                    type="number"
                                    value={planningData.revenue.contractAssets}
                                    onChange={(e) => updatePlanningField('revenue', 'contractAssets', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">未开票收入</label>
                                <input
                                    type="number"
                                    value={planningData.revenue.unbilledRevenue}
                                    onChange={(e) => updatePlanningField('revenue', 'unbilledRevenue', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">收入确认方法</label>
                                <select
                                    value={planningData.revenue.revenueRecognitionMethod}
                                    onChange={(e) => updatePlanningField('revenue', 'revenueRecognitionMethod', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="accrual">权责发生制</option>
                                    <option value="cash">收付实现制</option>
                                    <option value="installment">分期确认</option>
                                    <option value="completion">完工确认</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 'cit-expenses':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">成本费用扣除优化</h4>
                            <button
                                onClick={() => autoFillPlanningData('expenses')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 三项费用限制 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">三项费用限制</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">业务招待费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.businessEntertainment}
                                            onChange={(e) => updatePlanningField('expenses', 'businessEntertainment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">广告宣传费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.advertisingExpenses}
                                            onChange={(e) => updatePlanningField('expenses', 'advertisingExpenses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">职工福利费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.employeeWelfare}
                                            onChange={(e) => updatePlanningField('expenses', 'employeeWelfare', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">职工教育经费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.employeeEducation}
                                            onChange={(e) => updatePlanningField('expenses', 'employeeEducation', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">工会经费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.tradeUnionFees}
                                            onChange={(e) => updatePlanningField('expenses', 'tradeUnionFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 研发费用 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">研发费用</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">研发费用总额</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.rdExpenses}
                                            onChange={(e) => updatePlanningField('expenses', 'rdExpenses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">研发费用处理方式</label>
                                        <select
                                            value={planningData.expenses.rdDeductionMethod}
                                            onChange={(e) => updatePlanningField('expenses', 'rdDeductionMethod', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="expense">费用化扣除</option>
                                            <option value="capitalize">资本化摊销</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={planningData.expenses.rdAddedDeduction}
                                                onChange={(e) => updatePlanningField('expenses', 'rdAddedDeduction', e.target.checked)}
                                                className="mr-2"
                                            />
                                            享受研发费用加计扣除
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 工资薪酬 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">工资薪酬</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">工资薪金</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.salariesWages}
                                            onChange={(e) => updatePlanningField('expenses', 'salariesWages', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">社会保险费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.socialInsurance}
                                            onChange={(e) => updatePlanningField('expenses', 'socialInsurance', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">住房公积金</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.housingFund}
                                            onChange={(e) => updatePlanningField('expenses', 'housingFund', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">补充养老保险</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.supplementaryPension}
                                            onChange={(e) => updatePlanningField('expenses', 'supplementaryPension', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">补充医疗保险</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.supplementaryMedical}
                                            onChange={(e) => updatePlanningField('expenses', 'supplementaryMedical', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 其他费用 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">其他费用</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">咨询费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.consultingFees}
                                            onChange={(e) => updatePlanningField('expenses', 'consultingFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">审计费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.auditFees}
                                            onChange={(e) => updatePlanningField('expenses', 'auditFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">法律服务费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.legalFees}
                                            onChange={(e) => updatePlanningField('expenses', 'legalFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">租赁费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.rentExpenses}
                                            onChange={(e) => updatePlanningField('expenses', 'rentExpenses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">差旅费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.travelExpenses}
                                            onChange={(e) => updatePlanningField('expenses', 'travelExpenses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">办公费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.officeExpenses}
                                            onChange={(e) => updatePlanningField('expenses', 'officeExpenses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">水电费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.utilities}
                                            onChange={(e) => updatePlanningField('expenses', 'utilities', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">坏账准备</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.badDebtProvision}
                                            onChange={(e) => updatePlanningField('expenses', 'badDebtProvision', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">存货跌价准备</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.inventoryProvision}
                                            onChange={(e) => updatePlanningField('expenses', 'inventoryProvision', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 财务费用 */}
                            <div>
                                <h5 className="font-medium mb-3 text-red-600">财务费用</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">可扣除利息费用</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.interestExpenseDeductible}
                                            onChange={(e) => updatePlanningField('expenses', 'interestExpenseDeductible', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">银行手续费</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.bankCharges}
                                            onChange={(e) => updatePlanningField('expenses', 'bankCharges', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">汇兑损失</label>
                                        <input
                                            type="number"
                                            value={planningData.expenses.exchangeLoss}
                                            onChange={(e) => updatePlanningField('expenses', 'exchangeLoss', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'cit-assets':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">资产处置和折旧筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('assets')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">固定资产原值</label>
                                <input
                                    type="number"
                                    value={planningData.assets.fixedAssets}
                                    onChange={(e) => updatePlanningField('assets', 'fixedAssets', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">折旧方法</label>
                                <select
                                    value={planningData.assets.depreciationMethod}
                                    onChange={(e) => updatePlanningField('assets', 'depreciationMethod', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="straight">直线法</option>
                                    <option value="accelerated">加速折旧</option>
                                    <option value="declining">双倍余额递减法</option>
                                    <option value="sumOfYears">年数总和法</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">无形资产原值</label>
                                <input
                                    type="number"
                                    value={planningData.assets.intangibleAssets}
                                    onChange={(e) => updatePlanningField('assets', 'intangibleAssets', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">摊销期限（年）</label>
                                <input
                                    type="number"
                                    value={planningData.assets.amortizationPeriod}
                                    onChange={(e) => updatePlanningField('assets', 'amortizationPeriod', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">资产处置收益</label>
                                <input
                                    type="number"
                                    value={planningData.assets.assetDisposalGain}
                                    onChange={(e) => updatePlanningField('assets', 'assetDisposalGain', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">资产处置损失</label>
                                <input
                                    type="number"
                                    value={planningData.assets.assetDisposalLoss}
                                    onChange={(e) => updatePlanningField('assets', 'assetDisposalLoss', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">土地使用权</label>
                                <input
                                    type="number"
                                    value={planningData.assets.landUseRights}
                                    onChange={(e) => updatePlanningField('assets', 'landUseRights', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">在建工程</label>
                                <input
                                    type="number"
                                    value={planningData.assets.constructionInProgress}
                                    onChange={(e) => updatePlanningField('assets', 'constructionInProgress', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">投资性房地产</label>
                                <input
                                    type="number"
                                    value={planningData.assets.investmentProperty}
                                    onChange={(e) => updatePlanningField('assets', 'investmentProperty', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={planningData.assets.acceleratedDepreciation}
                                        onChange={(e) => updatePlanningField('assets', 'acceleratedDepreciation', e.target.checked)}
                                        className="mr-2"
                                    />
                                    享受加速折旧政策
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={planningData.assets.oneTimeDeduction}
                                        onChange={(e) => updatePlanningField('assets', 'oneTimeDeduction', e.target.checked)}
                                        className="mr-2"
                                    />
                                    一次性扣除
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 'cit-incentives':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">税收优惠政策运用</h4>
                            <button
                                onClick={() => autoFillPlanningData('taxIncentives')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 企业类型优惠 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">企业类型优惠</h5>
                                <div className="grid grid-cols-4 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isHighTech}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isHighTech', e.target.checked)}
                                            className="mr-2"
                                        />
                                        高新技术企业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isSmallMicro}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isSmallMicro', e.target.checked)}
                                            className="mr-2"
                                        />
                                        小微企业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isSoftwareCompany}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isSoftwareCompany', e.target.checked)}
                                            className="mr-2"
                                        />
                                        软件企业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isIntegratedCircuit}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isIntegratedCircuit', e.target.checked)}
                                            className="mr-2"
                                        />
                                        集成电路企业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isAdvancedManufacturing}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isAdvancedManufacturing', e.target.checked)}
                                            className="mr-2"
                                        />
                                        先进制造业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isModernService}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isModernService', e.target.checked)}
                                            className="mr-2"
                                        />
                                        现代服务业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isEnvironmentalProtection}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isEnvironmentalProtection', e.target.checked)}
                                            className="mr-2"
                                        />
                                        环保企业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isNewEnergy}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isNewEnergy', e.target.checked)}
                                            className="mr-2"
                                        />
                                        新能源企业
                                    </label>
                                </div>
                            </div>

                            {/* 地区优惠 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">地区优惠政策</h5>
                                <div className="grid grid-cols-4 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isWesternDevelopment}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isWesternDevelopment', e.target.checked)}
                                            className="mr-2"
                                        />
                                        西部大开发
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isHainanFTZ}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isHainanFTZ', e.target.checked)}
                                            className="mr-2"
                                        />
                                        海南自贸港
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isShenzhenQianhai}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isShenzhenQianhai', e.target.checked)}
                                            className="mr-2"
                                        />
                                        深圳前海
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isShanghaiFTZ}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isShanghaiFTZ', e.target.checked)}
                                            className="mr-2"
                                        />
                                        上海自贸区
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isPudongNewArea}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isPudongNewArea', e.target.checked)}
                                            className="mr-2"
                                        />
                                        浦东新区
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isXionganNewArea}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isXionganNewArea', e.target.checked)}
                                            className="mr-2"
                                        />
                                        雄安新区
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isHengqin}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isHengqin', e.target.checked)}
                                            className="mr-2"
                                        />
                                        横琴合作区
                                    </label>
                                </div>
                            </div>

                            {/* 产业优惠 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">产业优惠政策</h5>
                                <div className="grid grid-cols-4 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isAgricultureForestry}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isAgricultureForestry', e.target.checked)}
                                            className="mr-2"
                                        />
                                        农林渔业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isWaterConservancy}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isWaterConservancy', e.target.checked)}
                                            className="mr-2"
                                        />
                                        水利工程
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isRailwayTransport}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isRailwayTransport', e.target.checked)}
                                            className="mr-2"
                                        />
                                        铁路运输
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.taxIncentives.isPublicUtilities}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'isPublicUtilities', e.target.checked)}
                                            className="mr-2"
                                        />
                                        公共事业
                                    </label>
                                </div>
                            </div>

                            {/* 特殊优惠项目 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">特殊优惠项目</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">公益性捐赠</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.charitableDonations}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'charitableDonations', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">技术转让所得</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.technologyTransferIncome}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'technologyTransferIncome', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">就业激励人数</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.employmentIncentive}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'employmentIncentive', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">残疾人就业人数</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.disabledEmployment}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'disabledEmployment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">退役军人就业人数</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.veteransEmployment}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'veteransEmployment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">大学生就业人数</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.collegGraduateEmployment}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'collegGraduateEmployment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">环保设备投资</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.environmentEquipment}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'environmentEquipment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">节能设备投资</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.energySavingEquipment}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'energySavingEquipment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">安全设备投资</label>
                                        <input
                                            type="number"
                                            value={planningData.taxIncentives.safetyEquipment}
                                            onChange={(e) => updatePlanningField('taxIncentives', 'safetyEquipment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'cit-structure':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">组织架构和业务模式优化</h4>
                            <button
                                onClick={() => autoFillPlanningData('structure')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 组织结构 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">组织结构</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">组织形式</label>
                                        <select
                                            value={planningData.structure.organizationType}
                                            onChange={(e) => updatePlanningField('structure', 'organizationType', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="single">单一实体</option>
                                            <option value="subsidiary">子公司模式</option>
                                            <option value="branch">分公司模式</option>
                                            <option value="mixed">混合模式</option>
                                            <option value="holding">控股公司</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">子公司数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.subsidiaryCount}
                                            onChange={(e) => updatePlanningField('structure', 'subsidiaryCount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">分公司数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.branchCount}
                                            onChange={(e) => updatePlanningField('structure', 'branchCount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">合营企业数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.jointVentureCount}
                                            onChange={(e) => updatePlanningField('structure', 'jointVentureCount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">合伙企业数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.partnershipCount}
                                            onChange={(e) => updatePlanningField('structure', 'partnershipCount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">代表处数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.representativeOfficeCount}
                                            onChange={(e) => updatePlanningField('structure', 'representativeOfficeCount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 地域分布 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">地域分布</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">境内实体数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.domesticEntities}
                                            onChange={(e) => updatePlanningField('structure', 'domesticEntities', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">境外实体数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.foreignEntities}
                                            onChange={(e) => updatePlanningField('structure', 'foreignEntities', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">离岸实体数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.offshoreEntities}
                                            onChange={(e) => updatePlanningField('structure', 'offshoreEntities', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">税收洼地实体数量</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.taxHavenEntities}
                                            onChange={(e) => updatePlanningField('structure', 'taxHavenEntities', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">区域税率(%)</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.regionTaxRate}
                                            onChange={(e) => updatePlanningField('structure', 'regionTaxRate', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 业务模式优化 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">业务模式优化</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">外包费用</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.outsourcingExpenses}
                                            onChange={(e) => updatePlanningField('structure', 'outsourcingExpenses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">服务中心费用</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.serviceCenterExpenses}
                                            onChange={(e) => updatePlanningField('structure', 'serviceCenterExpenses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">管理费</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.managementFees}
                                            onChange={(e) => updatePlanningField('structure', 'managementFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">特许权使用费</label>
                                        <input
                                            type="number"
                                            value={planningData.structure.royaltyPayments}
                                            onChange={(e) => updatePlanningField('structure', 'royaltyPayments', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 重组筹划 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">重组筹划</h5>
                                <div className="grid grid-cols-4 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.structure.mergerPlanning}
                                            onChange={(e) => updatePlanningField('structure', 'mergerPlanning', e.target.checked)}
                                            className="mr-2"
                                        />
                                        合并筹划
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.structure.splitPlanning}
                                            onChange={(e) => updatePlanningField('structure', 'splitPlanning', e.target.checked)}
                                            className="mr-2"
                                        />
                                        分立筹划
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.structure.assetReorganization}
                                            onChange={(e) => updatePlanningField('structure', 'assetReorganization', e.target.checked)}
                                            className="mr-2"
                                        />
                                        资产重组
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.structure.holdingCompanyStructure}
                                            onChange={(e) => updatePlanningField('structure', 'holdingCompanyStructure', e.target.checked)}
                                            className="mr-2"
                                        />
                                        控股公司结构
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'cit-related':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">关联交易定价筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('relatedParty')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        checked={planningData.relatedParty.hasRelatedParties}
                                        onChange={(e) => updatePlanningField('relatedParty', 'hasRelatedParties', e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span className="font-medium">存在关联方交易</span>
                                </label>
                            </div>

                            {planningData.relatedParty.hasRelatedParties && (
                                <>
                                    {/* 商品交易 */}
                                    <div>
                                        <h5 className="font-medium mb-3 text-blue-600">商品交易</h5>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">关联商品销售</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.goodsSales}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'goodsSales', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">关联商品采购</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.goodsPurchases}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'goodsPurchases', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">商品毛利率(%)</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.goodsMargin}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'goodsMargin', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 无形资产交易 */}
                                    <div>
                                        <h5 className="font-medium mb-3 text-green-600">无形资产交易</h5>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">特许权使用费收入</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.royaltyIncome}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'royaltyIncome', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">特许权使用费支出</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.royaltyExpenses}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'royaltyExpenses', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">知识产权许可</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.ipLicensing}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'ipLicensing', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">技术转让</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.technologyTransfer}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'technologyTransfer', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">商标许可</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.trademarkLicensing}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'trademarkLicensing', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 融资安排 */}
                                    <div>
                                        <h5 className="font-medium mb-3 text-purple-600">融资安排</h5>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">关联方借款</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.intercompanyLoans}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'intercompanyLoans', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">利率差(%)</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={planningData.relatedParty.interestRateSpread}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'interestRateSpread', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">担保费</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.guaranteeFees}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'guaranteeFees', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">融资费用</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.financingCharges}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'financingCharges', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 服务交易 */}
                                    <div>
                                        <h5 className="font-medium mb-3 text-orange-600">服务交易</h5>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">管理服务费</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.managementServiceFees}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'managementServiceFees', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">技术服务费</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.technicalServiceFees}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'technicalServiceFees', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">市场推广服务费</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.marketingServiceFees}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'marketingServiceFees', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">行政服务费</label>
                                                <input
                                                    type="number"
                                                    value={planningData.relatedParty.administrativeServiceFees}
                                                    onChange={(e) => updatePlanningField('relatedParty', 'administrativeServiceFees', Number(e.target.value))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );

            case 'cit-loss':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">亏损弥补和盈利平衡</h4>
                            <button
                                onClick={() => autoFillPlanningData('lossCarryforward')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 历史亏损 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">历史亏损情况</h5>
                                <div className="grid grid-cols-5 gap-4">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-medium mb-1">前{5 - index}年亏损</label>
                                            <input
                                                type="number"
                                                value={planningData.lossCarryforward.priorYearLosses[index]}
                                                onChange={(e) => {
                                                    const newLosses = [...planningData.lossCarryforward.priorYearLosses];
                                                    newLosses[index] = Number(e.target.value);
                                                    updatePlanningField('lossCarryforward', 'priorYearLosses', newLosses);
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">当年亏损</label>
                                        <input
                                            type="number"
                                            value={planningData.lossCarryforward.currentYearLoss}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'currentYearLoss', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">结转年限</label>
                                        <input
                                            type="number"
                                            value={planningData.lossCarryforward.lossCarryforwardYears}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'lossCarryforwardYears', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 亏损来源分析 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">亏损来源分析</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">经营性亏损</label>
                                        <input
                                            type="number"
                                            value={planningData.lossCarryforward.operatingLoss}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'operatingLoss', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">投资性亏损</label>
                                        <input
                                            type="number"
                                            value={planningData.lossCarryforward.investmentLoss}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'investmentLoss', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">资产减值损失</label>
                                        <input
                                            type="number"
                                            value={planningData.lossCarryforward.assetImpairmentLoss}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'assetImpairmentLoss', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">非常性损失</label>
                                        <input
                                            type="number"
                                            value={planningData.lossCarryforward.extraordinaryLoss}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'extraordinaryLoss', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 盈利平衡策略 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">盈利平衡策略</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.lossCarryforward.profitSmoothing}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'profitSmoothing', e.target.checked)}
                                            className="mr-2"
                                        />
                                        利润平滑化
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.lossCarryforward.incomeShifting}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'incomeShifting', e.target.checked)}
                                            className="mr-2"
                                        />
                                        收入转移
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.lossCarryforward.expenseAcceleration}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'expenseAcceleration', e.target.checked)}
                                            className="mr-2"
                                        />
                                        费用加速确认
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.lossCarryforward.groupProfitOffset}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'groupProfitOffset', e.target.checked)}
                                            className="mr-2"
                                        />
                                        集团内盈亏互抵
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.lossCarryforward.businessContinuity}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'businessContinuity', e.target.checked)}
                                            className="mr-2"
                                        />
                                        业务连续性
                                    </label>
                                </div>
                            </div>

                            {/* 集团内部平衡 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">集团内部平衡</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">子公司亏损</label>
                                        <input
                                            type="number"
                                            value={planningData.lossCarryforward.subsidiaryLosses}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'subsidiaryLosses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">分公司亏损</label>
                                        <input
                                            type="number"
                                            value={planningData.lossCarryforward.branchLosses}
                                            onChange={(e) => updatePlanningField('lossCarryforward', 'branchLosses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'cit-financing':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">投资和融资结构筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('financing')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 投资收益 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">投资收益</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">股息收入</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.dividendIncome}
                                            onChange={(e) => updatePlanningField('financing', 'dividendIncome', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">利息收入</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.interestIncome}
                                            onChange={(e) => updatePlanningField('financing', 'interestIncome', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">资本利得</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.capitalGains}
                                            onChange={(e) => updatePlanningField('financing', 'capitalGains', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">投资性房地产收入</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.investmentPropertyIncome}
                                            onChange={(e) => updatePlanningField('financing', 'investmentPropertyIncome', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 融资成本 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">融资成本</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">利息支出</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.interestExpenses}
                                            onChange={(e) => updatePlanningField('financing', 'interestExpenses', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">融资费用</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.financingFees}
                                            onChange={(e) => updatePlanningField('financing', 'financingFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">担保费</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.guaranteeFees}
                                            onChange={(e) => updatePlanningField('financing', 'guaranteeFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">发行费用</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.issuanceCosts}
                                            onChange={(e) => updatePlanningField('financing', 'issuanceCosts', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 融资结构 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">融资结构</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">股权融资</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.equityFinancing}
                                            onChange={(e) => updatePlanningField('financing', 'equityFinancing', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">债务融资</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.debtFinancing}
                                            onChange={(e) => updatePlanningField('financing', 'debtFinancing', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">混合工具</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.hybridInstruments}
                                            onChange={(e) => updatePlanningField('financing', 'hybridInstruments', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">债股比例</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={planningData.financing.debtToEquityRatio}
                                            onChange={(e) => updatePlanningField('financing', 'debtToEquityRatio', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 投资结构 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">投资结构</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">投资结构类型</label>
                                        <select
                                            value={planningData.financing.investmentStructure}
                                            onChange={(e) => updatePlanningField('financing', 'investmentStructure', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="equity">股权投资</option>
                                            <option value="debt">债权投资</option>
                                            <option value="hybrid">混合投资</option>
                                            <option value="indirect">间接投资</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">直接投资</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.directInvestment}
                                            onChange={(e) => updatePlanningField('financing', 'directInvestment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">间接投资</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.indirectInvestment}
                                            onChange={(e) => updatePlanningField('financing', 'indirectInvestment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">组合投资</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.portfolioInvestment}
                                            onChange={(e) => updatePlanningField('financing', 'portfolioInvestment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 特殊金融工具 */}
                            <div>
                                <h5 className="font-medium mb-3 text-red-600">特殊金融工具</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">可转债</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.convertibleBonds}
                                            onChange={(e) => updatePlanningField('financing', 'convertibleBonds', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">优先股</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.preferredShares}
                                            onChange={(e) => updatePlanningField('financing', 'preferredShares', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">永续债</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.perpetualBonds}
                                            onChange={(e) => updatePlanningField('financing', 'perpetualBonds', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">衍生品</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.derivatives}
                                            onChange={(e) => updatePlanningField('financing', 'derivatives', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">融资租赁</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.financialLeasing}
                                            onChange={(e) => updatePlanningField('financing', 'financialLeasing', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">保理业务</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.factoring}
                                            onChange={(e) => updatePlanningField('financing', 'factoring', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 国际投资 */}
                            <div>
                                <h5 className="font-medium mb-3 text-indigo-600">国际投资</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">境外投资</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.foreignInvestment}
                                            onChange={(e) => updatePlanningField('financing', 'foreignInvestment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">离岸融资</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.offshoreFunding}
                                            onChange={(e) => updatePlanningField('financing', 'offshoreFunding', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">跨境融资</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.crossBorderFinancing}
                                            onChange={(e) => updatePlanningField('financing', 'crossBorderFinancing', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 税务优化策略 */}
                            <div>
                                <h5 className="font-medium mb-3 text-pink-600">税务优化策略</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.financing.capitalStructureOptimization}
                                            onChange={(e) => updatePlanningField('financing', 'capitalStructureOptimization', e.target.checked)}
                                            className="mr-2"
                                        />
                                        资本结构优化
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.financing.thinCapitalizationRules}
                                            onChange={(e) => updatePlanningField('financing', 'thinCapitalizationRules', e.target.checked)}
                                            className="mr-2"
                                        />
                                        资本弱化规则
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.financing.earningsStripping}
                                            onChange={(e) => updatePlanningField('financing', 'earningsStripping', e.target.checked)}
                                            className="mr-2"
                                        />
                                        利润剥离限制
                                    </label>
                                </div>
                            </div>

                            {/* 退出策略 */}
                            <div>
                                <h5 className="font-medium mb-3 text-gray-600">退出策略</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">退出方式</label>
                                        <select
                                            value={planningData.financing.exitStrategy}
                                            onChange={(e) => updatePlanningField('financing', 'exitStrategy', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="ipo">IPO上市</option>
                                            <option value="merger">并购重组</option>
                                            <option value="liquidation">清算退出</option>
                                            <option value="transfer">股权转让</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">清算价值</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.liquidationValue}
                                            onChange={(e) => updatePlanningField('financing', 'liquidationValue', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">转让定价</label>
                                        <input
                                            type="number"
                                            value={planningData.financing.transferPricing}
                                            onChange={(e) => updatePlanningField('financing', 'transferPricing', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'cit-basic':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">基础信息</h4>
                            <button
                                onClick={() => autoFillPlanningData('basic')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">应纳税所得额</label>
                                <input
                                    type="number"
                                    value={planningData.basic.taxableIncome}
                                    onChange={(e) => updatePlanningField('basic', 'taxableIncome', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">当前税率(%)</label>
                                <input
                                    type="number"
                                    value={planningData.basic.currentTaxRate}
                                    onChange={(e) => updatePlanningField('basic', 'currentTaxRate', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">年收入</label>
                                <input
                                    type="number"
                                    value={planningData.basic.revenue}
                                    onChange={(e) => updatePlanningField('basic', 'revenue', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">总资产</label>
                                <input
                                    type="number"
                                    value={planningData.basic.totalAssets}
                                    onChange={(e) => updatePlanningField('basic', 'totalAssets', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">注册资本</label>
                                <input
                                    type="number"
                                    value={planningData.basic.registeredCapital}
                                    onChange={(e) => updatePlanningField('basic', 'registeredCapital', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">员工人数</label>
                                <input
                                    type="number"
                                    value={planningData.basic.employees}
                                    onChange={(e) => updatePlanningField('basic', 'employees', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">所属行业</label>
                                <select
                                    value={planningData.basic.industry}
                                    onChange={(e) => updatePlanningField('basic', 'industry', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="general">一般行业</option>
                                    <option value="software">软件行业</option>
                                    <option value="manufacturing">制造业</option>
                                    <option value="service">服务业</option>
                                    <option value="hightech">高新技术</option>
                                    <option value="finance">金融业</option>
                                    <option value="realestate">房地产</option>
                                    <option value="agriculture">农林渔业</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">所在地区</label>
                                <select
                                    value={planningData.basic.region}
                                    onChange={(e) => updatePlanningField('basic', 'region', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="general">一般地区</option>
                                    <option value="western">西部地区</option>
                                    <option value="hainan">海南</option>
                                    <option value="shenzhen">深圳</option>
                                    <option value="shanghai">上海</option>
                                    <option value="beijing">北京</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">企业类型</label>
                                <select
                                    value={planningData.basic.companyType}
                                    onChange={(e) => updatePlanningField('basic', 'companyType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="general">一般企业</option>
                                    <option value="stateOwned">国有企业</option>
                                    <option value="private">民营企业</option>
                                    <option value="foreign">外资企业</option>
                                    <option value="joint">合资企业</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">成立日期</label>
                                <input
                                    type="date"
                                    value={planningData.basic.establishmentDate}
                                    onChange={(e) => updatePlanningField('basic', 'establishmentDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">税收居民身份</label>
                                <select
                                    value={planningData.basic.taxResidency}
                                    onChange={(e) => updatePlanningField('basic', 'taxResidency', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="domestic">境内居民企业</option>
                                    <option value="foreign">非居民企业</option>
                                    <option value="dual">双重税收居民</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-8 text-gray-500">
                        请选择标签页查看具体的筹划维度
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800">企业所得税纳税筹划</h4>
                <p className="text-blue-600 text-sm">基于多维度筹划策略的智能税负优化工具</p>
            </div>

            <div className="border-b border-gray-200">
                <nav className="flex space-x-4 overflow-x-auto">
                    {citPlanningTabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveCitTab(tab.id)}
                                className={`flex items-center gap-2 px-3 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeCitTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                    <div className="bg-white border rounded-lg p-6">
                        {renderCitPlanningContent()}
                    </div>

                    <div className="mt-4 flex justify-between">
                        <div className="flex gap-2">
                            <button
                                onClick={calculateCitPlanning}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                <Calculator className="w-4 h-4" />
                                计算税负优化
                            </button>
                            <button
                                onClick={savePlan}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                <Save className="w-4 h-4" />
                                保存方案
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowHistory(!showHistory)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                <History className="w-4 h-4" />
                                测算历史
                            </button>
                            <button
                                onClick={exportPlan}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                                <Download className="w-4 h-4" />
                                导出方案
                            </button>
                        </div>
                    </div>

                    {citPlanningResult.recommendations.length > 0 && (
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                优化建议
                            </h5>
                            <ul className="space-y-2">
                                {citPlanningResult.recommendations.map((rec, index) => (
                                    <li key={index} className="text-blue-700 flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* 历史方案 */}
                    {showHistory && (
                        <div className="mt-6 bg-gray-50 border rounded-lg p-4">
                            <h5 className="font-semibold mb-3">历史方案</h5>
                            {savedPlans.length === 0 ? (
                                <p className="text-gray-500">暂无保存的方案</p>
                            ) : (
                                <div className="space-y-2">
                                    {savedPlans.map((plan) => (
                                        <div key={plan.id} className="bg-white p-3 rounded border">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h6 className="font-medium">{plan.name}</h6>
                                                    <p className="text-sm text-gray-600">
                                                        节税金额: ¥{plan.result.taxSavings.toLocaleString()}
                                                        （节税率: {plan.result.savingsPercentage.toFixed(2)}%）
                                                    </p>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(plan.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="col-span-4">
                    <div className="bg-gray-50 rounded-lg p-4 sticky top-6">
                        <h5 className="font-semibold mb-3">筹划结果</h5>
                        <div className="space-y-4">
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">原始税负</label>
                                <div className="text-xl font-medium text-red-600">
                                    ¥{citPlanningResult.originalTax.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">优化后税负</label>
                                <div className="text-xl font-medium text-green-600">
                                    ¥{citPlanningResult.optimizedTax.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">节税金额</label>
                                <div className="text-xl font-bold text-blue-600">
                                    ¥{citPlanningResult.taxSavings.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">实际税率</label>
                                <div className="text-lg font-medium">
                                    {citPlanningResult.effectiveTaxRate.toFixed(2)}%
                                </div>
                            </div>
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">节税率</label>
                                <div className="text-lg font-medium text-purple-600">
                                    {citPlanningResult.savingsPercentage.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateIncomeTaxPlanning;
