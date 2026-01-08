import React, { useState } from 'react';
import { Calculator, RefreshCw, AlertTriangle, TrendingUp, FileText, Building, Target, Users, Briefcase, Settings, Save, History, Download, ShoppingCart, CreditCard } from 'lucide-react';

const VATCalculator = ({ data, saveToHistory }) => {
    const [planningData, setPlanningData] = useState({
        // 纳税人身份选择
        taxpayerStatus: {
            currentStatus: 'general', // general: 一般纳税人, small: 小规模纳税人
            annualSales: data?.revenue || 0,
            inputTaxAmount: 0,
            outputTaxRate: 13,
            smallTaxpayerRate: 3,
            needSpecialInvoice: false,
            customerType: 'mixed', // business: 企业客户为主, individual: 个人客户为主, mixed: 混合
            industryType: 'general',
        },

        // 销项税额筹划
        outputTax: {
            totalSales: data?.revenue || 0,
            goodsSales: 0,
            serviceSales: 0,
            mixedSalesRatio: 50, // 混合销售中货物销售比例

            // 销售方式
            directSales: 0,
            consignmentSales: 0,
            installmentSales: 0,
            advanceSales: 0,

            // 价格策略
            taxInclusivePrice: 0,
            taxExclusivePrice: 0,
            discountAmount: 0,
            allowanceAmount: 0,

            // 税率选择
            rate13Percent: 0, // 13%税率商品
            rate9Percent: 0,  // 9%税率商品
            rate6Percent: 0,  // 6%税率服务
            rate0Percent: 0,  // 0%税率出口等

            // 时点安排
            currentPeriodSales: 0,
            nextPeriodSales: 0,
            yearEndAdjustment: 0,
        },

        // 进项税额筹划
        inputTax: {
            totalPurchases: 0,

            // 采购类型
            rawMaterialPurchases: 0,
            fixedAssetPurchases: 0,
            servicePurchases: 0,

            // 发票管理
            specialInvoiceAmount: 0,
            ordinaryInvoiceAmount: 0,
            electronicInvoiceAmount: 0,

            // 抵扣策略
            currentPeriodDeduction: 0,
            carryForwardDeduction: 0,

            // 供应商选择
            generalSupplierPurchases: 0, // 一般纳税人供应商
            smallSupplierPurchases: 0,   // 小规模供应商
            supplierOptimizationSavings: 0,

            // 特殊项目
            realEstateDeduction: 0,
            travelExpenseDeduction: 0,
            entertainmentExpenseDeduction: 0,
        },

        // 税收优惠政策
        preferentialPolicies: {
            // 出口退税
            exportSales: 0,
            exportTaxRefundRate: 13,
            exportTaxRefund: 0,

            // 行业优惠
            isHighTechEnterprise: false,
            isSoftwareEnterprise: false,
            isSmallMicroEnterprise: false,
            isModernServiceIndustry: false,
            isAgricultureRelated: false,
            isEnvironmentalProtection: false,

            // 地区优惠
            isWesternRegion: false,
            isFreeTradeZone: false,
            isDevelopmentZone: false,

            // 特殊政策
            immediateTaxRefund: 0,
            firstCollectThenRefund: 0,
            taxReductionAmount: 0,
            exemptionAmount: 0,

            // 研发费用
            rdServicePurchases: 0,
            rdEquipmentPurchases: 0,
        },

        // 业务模式筹划
        businessModel: {
            currentModel: 'direct', // direct: 直接销售, consignment: 委托代销, processing: 委托加工

            // 委托加工
            processingFees: 0,
            processingMaterialCost: 0,

            // 供应链优化
            distributorSales: 0,
            directCustomerSales: 0,

            // 集团内部交易
            internalSales: 0,
            internalPurchases: 0,
            internalServiceFees: 0,

            // 功能性公司
            hasSalesCompany: false,
            hasRDCenter: false,
            hasServiceCenter: false,

            // 业务拆分
            separateGoodsServices: false,
            separateHighLowTaxRate: false,
        },

        // 合同条款筹划
        contractPlanning: {
            // 价格条款
            contractValue: 0,
            taxInclusiveContract: true,

            // 付款方式
            paymentMethod: 'lump', // lump: 一次性, installment: 分期, deferred: 延期
            advancePaymentRatio: 0,

            // 交付条款
            deliveryTerms: 'FOB',
            riskTransferPoint: 'delivery',

            // 违约条款
            penaltyAmount: 0,
            compensationAmount: 0,

            // 服务合同
            serviceContract: 0,
            consultingContract: 0,
            maintenanceContract: 0,
        },

        // 组织架构筹划
        organizationStructure: {
            // 集团架构
            hasHoldingCompany: false,
            hasRegionalCompanies: false,
            hasFunctionalCompanies: false,

            // 结算中心
            hasSettlementCenter: false,
            centralizedPurchasing: false,
            centralizedSales: false,

            // 地域分布
            mainOperationRegion: 'eastern',
            branchOfficeCount: 0,
            subsidiaryCount: 0,

            // 业务分离
            separateManufacturing: false,
            separateTrading: false,
            separateServices: false,
        },

        // 时间性筹划
        timingPlanning: {
            // 收入确认时点
            revenueRecognitionTiming: 'delivery',
            advanceRecognitionAmount: 0,
            deferredRecognitionAmount: 0,

            // 进项抵扣时点
            inputDeductionTiming: 'immediate',
            deferredDeductionAmount: 0,

            // 年度筹划
            quarterlyBalance: false,
            yearEndAdjustment: 0,
            nextYearPlanning: 0,

            // 政策变化应对
            taxRateChangeImpact: 0,
            policyTransitionBenefit: 0,
        },

        // 基础信息
        basicInfo: {
            companyName: '',
            taxNumber: '',
            industry: 'manufacturing',
            region: 'eastern',
            establishDate: '',
            registeredCapital: 0,
            employeeCount: 0,
            currentVATRate: 13,
            annualRevenue: data?.revenue || 0,
            quarterlyRevenue: [0, 0, 0, 0],
        }
    });

    const [vatPlanningResult, setVatPlanningResult] = useState({
        originalTax: 0,
        optimizedTax: 0,
        taxSavings: 0,
        effectiveTaxRate: 0,
        savingsPercentage: 0,
        recommendations: []
    });

    const [activeVatTab, setActiveVatTab] = useState('vat-basic');
    const [savedPlans, setSavedPlans] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const vatPlanningTabs = [
        { id: 'vat-taxpayer', name: '纳税人身份', icon: Users },
        { id: 'vat-output', name: '销项税额', icon: TrendingUp },
        { id: 'vat-input', name: '进项税额', icon: ShoppingCart },
        { id: 'vat-preferential', name: '优惠政策', icon: Target },
        { id: 'vat-business', name: '业务模式', icon: Briefcase },
        { id: 'vat-contract', name: '合同条款', icon: FileText },
        { id: 'vat-organization', name: '组织架构', icon: Building },
        { id: 'vat-timing', name: '时间筹划', icon: Settings },
        { id: 'vat-basic', name: '基础信息', icon: CreditCard }
    ];

    const updatePlanningField = (category, field, value) => {
        setPlanningData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    const autoFillPlanningData = (category) => {
        const simulatedData = {
            taxpayerStatus: {
                currentStatus: 'general',
                annualSales: 10000000,
                inputTaxAmount: 800000,
                outputTaxRate: 13,
                smallTaxpayerRate: 3,
                needSpecialInvoice: true,
                customerType: 'business',
                industryType: 'manufacturing',
            },
            outputTax: {
                totalSales: 10000000,
                goodsSales: 8000000,
                serviceSales: 2000000,
                mixedSalesRatio: 80,
                directSales: 9000000,
                consignmentSales: 500000,
                installmentSales: 500000,
                advanceSales: 300000,
                taxInclusivePrice: 5000000,
                taxExclusivePrice: 5000000,
                discountAmount: 200000,
                allowanceAmount: 100000,
                rate13Percent: 8000000,
                rate9Percent: 1000000,
                rate6Percent: 1000000,
                rate0Percent: 500000,
                currentPeriodSales: 2500000,
                nextPeriodSales: 2500000,
                yearEndAdjustment: 100000,
            },
            inputTax: {
                totalPurchases: 6000000,
                rawMaterialPurchases: 4000000,
                fixedAssetPurchases: 1000000,
                servicePurchases: 1000000,
                specialInvoiceAmount: 5000000,
                ordinaryInvoiceAmount: 800000,
                electronicInvoiceAmount: 200000,
                currentPeriodDeduction: 600000,
                carryForwardDeduction: 50000,
                generalSupplierPurchases: 5000000,
                smallSupplierPurchases: 1000000,
                supplierOptimizationSavings: 30000,
                realEstateDeduction: 200000,
                travelExpenseDeduction: 50000,
                entertainmentExpenseDeduction: 20000,
            },
            preferentialPolicies: {
                exportSales: 2000000,
                exportTaxRefundRate: 13,
                exportTaxRefund: 260000,
                isHighTechEnterprise: true,
                isSoftwareEnterprise: false,
                isSmallMicroEnterprise: false,
                isModernServiceIndustry: false,
                isAgricultureRelated: false,
                isEnvironmentalProtection: false,
                isWesternRegion: false,
                isFreeTradeZone: false,
                isDevelopmentZone: false,
                immediateTaxRefund: 50000,
                firstCollectThenRefund: 30000,
                taxReductionAmount: 100000,
                exemptionAmount: 80000,
                rdServicePurchases: 500000,
                rdEquipmentPurchases: 300000,
            },
            businessModel: {
                currentModel: 'direct',
                processingFees: 500000,
                processingMaterialCost: 2000000,
                distributorSales: 3000000,
                directCustomerSales: 7000000,
                internalSales: 1000000,
                internalPurchases: 800000,
                internalServiceFees: 200000,
                hasSalesCompany: true,
                hasRDCenter: true,
                hasServiceCenter: false,
                separateGoodsServices: true,
                separateHighLowTaxRate: true,
            },
            contractPlanning: {
                contractValue: 5000000,
                taxInclusiveContract: false,
                paymentMethod: 'installment',
                advancePaymentRatio: 30,
                deliveryTerms: 'FOB',
                riskTransferPoint: 'delivery',
                penaltyAmount: 100000,
                compensationAmount: 50000,
                serviceContract: 1000000,
                consultingContract: 500000,
                maintenanceContract: 300000,
            },
            organizationStructure: {
                hasHoldingCompany: true,
                hasRegionalCompanies: true,
                hasFunctionalCompanies: true,
                hasSettlementCenter: true,
                centralizedPurchasing: true,
                centralizedSales: false,
                mainOperationRegion: 'eastern',
                branchOfficeCount: 3,
                subsidiaryCount: 5,
                separateManufacturing: true,
                separateTrading: true,
                separateServices: true,
            },
            timingPlanning: {
                revenueRecognitionTiming: 'delivery',
                advanceRecognitionAmount: 500000,
                deferredRecognitionAmount: 300000,
                inputDeductionTiming: 'immediate',
                deferredDeductionAmount: 100000,
                quarterlyBalance: true,
                yearEndAdjustment: 200000,
                nextYearPlanning: 1000000,
                taxRateChangeImpact: 150000,
                policyTransitionBenefit: 80000,
            },
            basicInfo: {
                companyName: '示例制造企业',
                taxNumber: '91110000123456789X',
                industry: 'manufacturing',
                region: 'eastern',
                establishDate: '2020-01-01',
                registeredCapital: 10000000,
                employeeCount: 200,
                currentVATRate: 13,
                annualRevenue: 10000000,
                quarterlyRevenue: [2500000, 2500000, 2500000, 2500000],
            }
        };

        if (simulatedData[category]) {
            setPlanningData(prev => ({
                ...prev,
                [category]: { ...prev[category], ...simulatedData[category] }
            }));
        }
    };

    const calculateVATPlanning = () => {
        try {
            const recommendations = [];
            let originalOutputTax = 0;
            let originalInputTax = 0;
            let optimizedOutputTax = 0;
            let optimizedInputTax = 0;

            // 纳税人身份选择分析
            const annualSales = Number(planningData.taxpayerStatus.annualSales) || 0;
            const inputTaxAmount = Number(planningData.taxpayerStatus.inputTaxAmount) || 0;

            if (annualSales <= 0) {
                alert('请在基础信息中填入年销售额');
                return;
            }

            // 一般纳税人vs小规模纳税人分析
            const generalTaxpayerTax = (annualSales * (planningData.taxpayerStatus.outputTaxRate / 100)) - inputTaxAmount;
            const smallTaxpayerTax = annualSales * (planningData.taxpayerStatus.smallTaxpayerRate / 100);

            if (planningData.taxpayerStatus.currentStatus === 'general') {
                originalOutputTax = annualSales * (planningData.taxpayerStatus.outputTaxRate / 100);
                originalInputTax = inputTaxAmount;

                if (smallTaxpayerTax < generalTaxpayerTax && !planningData.taxpayerStatus.needSpecialInvoice) {
                    recommendations.push(`建议考虑转为小规模纳税人，可节税 ${(generalTaxpayerTax - smallTaxpayerTax).toLocaleString()} 元`);
                }
            } else {
                originalOutputTax = annualSales * (planningData.taxpayerStatus.smallTaxpayerRate / 100);
                originalInputTax = 0;

                if (generalTaxpayerTax < smallTaxpayerTax && planningData.taxpayerStatus.needSpecialInvoice) {
                    recommendations.push(`建议申请成为一般纳税人，可节税 ${(smallTaxpayerTax - generalTaxpayerTax).toLocaleString()} 元`);
                }
            }

            // 销项税额优化
            optimizedOutputTax = originalOutputTax;

            // 混合销售优化
            const mixedSalesRatio = Number(planningData.outputTax.mixedSalesRatio) || 0;
            if (mixedSalesRatio > 0 && mixedSalesRatio < 100) {
                const goodsSales = Number(planningData.outputTax.goodsSales) || 0;
                const serviceSales = Number(planningData.outputTax.serviceSales) || 0;
                if (goodsSales > 0 && serviceSales > 0) {
                    const optimizedRatio = serviceSales > goodsSales ? 60 : 40; // 优化比例
                    const taxSavings = Math.abs(mixedSalesRatio - optimizedRatio) * (goodsSales + serviceSales) * 0.0007; // 0.07%的税率差
                    optimizedOutputTax -= taxSavings;
                    recommendations.push(`通过优化混合销售比例配置，可节约增值税 ${taxSavings.toLocaleString()} 元`);
                }
            }

            // 分期收款销售优化
            const installmentSales = Number(planningData.outputTax.installmentSales) || 0;
            if (installmentSales > 0) {
                const deferredTax = installmentSales * 0.13 * 0.5; // 假设延期50%
                optimizedOutputTax -= deferredTax;
                recommendations.push(`通过分期收款销售递延，可暂缓缴纳增值税 ${deferredTax.toLocaleString()} 元`);
            }

            // 税率优化建议
            const rate13Sales = Number(planningData.outputTax.rate13Percent) || 0;
            const rate9Sales = Number(planningData.outputTax.rate9Percent) || 0;
            const rate6Sales = Number(planningData.outputTax.rate6Percent) || 0;

            if (rate13Sales > rate9Sales + rate6Sales) {
                recommendations.push('建议分析业务结构，适当增加低税率业务比重');
            }

            // 进项税额优化
            optimizedInputTax = originalInputTax;

            // 供应商选择优化
            const generalSupplierPurchases = Number(planningData.inputTax.generalSupplierPurchases) || 0;
            const smallSupplierPurchases = Number(planningData.inputTax.smallSupplierPurchases) || 0;
            const supplierOptimizationSavings = Number(planningData.inputTax.supplierOptimizationSavings) || 0;

            if (smallSupplierPurchases > generalSupplierPurchases * 0.3) {
                const potentialSavings = smallSupplierPurchases * 0.13 * 0.7; // 假设70%可以转换
                optimizedInputTax += potentialSavings;
                recommendations.push(`建议优先选择一般纳税人供应商，可增加进项抵扣 ${potentialSavings.toLocaleString()} 元`);
            }

            // 固定资产采购优化
            const fixedAssetPurchases = Number(planningData.inputTax.fixedAssetPurchases) || 0;
            if (fixedAssetPurchases > 0) {
                const additionalDeduction = fixedAssetPurchases * 0.13;
                optimizedInputTax += additionalDeduction;
                recommendations.push(`固定资产进项税额可一次性抵扣 ${additionalDeduction.toLocaleString()} 元`);
            }

            // 出口退税优化
            const exportSales = Number(planningData.preferentialPolicies.exportSales) || 0;
            const exportTaxRefundRate = Number(planningData.preferentialPolicies.exportTaxRefundRate) || 0;
            if (exportSales > 0 && exportTaxRefundRate > 0) {
                const exportRefund = exportSales * (exportTaxRefundRate / 100);
                optimizedInputTax += exportRefund;
                recommendations.push(`出口退税可获得 ${exportRefund.toLocaleString()} 元退税`);
            }

            // 优惠政策应用
            let policyBenefits = 0;

            if (planningData.preferentialPolicies.isHighTechEnterprise) {
                policyBenefits += annualSales * 0.001; // 假设0.1%优惠
                recommendations.push('高新技术企业可享受相关增值税优惠政策');
            }

            if (planningData.preferentialPolicies.isSoftwareEnterprise) {
                policyBenefits += annualSales * 0.002; // 假设0.2%优惠
                recommendations.push('软件企业可享受即征即退等优惠政策');
            }

            const immediateTaxRefund = Number(planningData.preferentialPolicies.immediateTaxRefund) || 0;
            const firstCollectThenRefund = Number(planningData.preferentialPolicies.firstCollectThenRefund) || 0;
            policyBenefits += immediateTaxRefund + firstCollectThenRefund;

            // 业务模式优化
            if (planningData.businessModel.separateGoodsServices) {
                const separationSavings = annualSales * 0.003; // 假设0.3%节税
                policyBenefits += separationSavings;
                recommendations.push(`通过货物和服务业务分离，可节税 ${separationSavings.toLocaleString()} 元`);
            }

            if (planningData.businessModel.hasSettlementCenter) {
                const centralizationSavings = annualSales * 0.002; // 假设0.2%节税
                policyBenefits += centralizationSavings;
                recommendations.push(`通过设立结算中心，可节税 ${centralizationSavings.toLocaleString()} 元`);
            }

            // 合同条款优化
            if (!planningData.contractPlanning.taxInclusiveContract) {
                recommendations.push('建议在合同中明确不含税价格，有利于税负透明化');
            }

            if (planningData.contractPlanning.paymentMethod === 'installment') {
                const installmentBenefit = planningData.contractPlanning.contractValue * 0.13 * 0.3;
                policyBenefits += installmentBenefit * 0.05; // 假设5%的资金成本收益
                recommendations.push('分期付款可以延缓税金缴纳，产生资金收益');
            }

            // 时间性筹划
            const deferredRecognitionAmount = Number(planningData.timingPlanning.deferredRecognitionAmount) || 0;
            if (deferredRecognitionAmount > 0) {
                const timingBenefit = deferredRecognitionAmount * 0.13 * 0.05; // 假设5%资金成本
                policyBenefits += timingBenefit;
                recommendations.push(`通过收入确认时点筹划，可获得资金收益 ${timingBenefit.toLocaleString()} 元`);
            }

            // 组织架构优化
            if (planningData.organizationStructure.centralizedPurchasing) {
                const centralizationBenefit = (generalSupplierPurchases + smallSupplierPurchases) * 0.002;
                policyBenefits += centralizationBenefit;
                recommendations.push(`通过集中采购，可节约成本 ${centralizationBenefit.toLocaleString()} 元`);
            }

            // 应用所有优化措施
            optimizedInputTax += policyBenefits;

            // 计算最终结果
            const originalVAT = Math.max(0, originalOutputTax - originalInputTax);
            const optimizedVAT = Math.max(0, optimizedOutputTax - optimizedInputTax);
            const taxSavings = Math.max(0, originalVAT - optimizedVAT);
            const effectiveRate = annualSales > 0 ? (optimizedVAT / annualSales) * 100 : 0;
            const savingsPercentage = originalVAT > 0 ? (taxSavings / originalVAT) * 100 : 0;

            // 补充通用建议
            if (recommendations.length < 3) {
                recommendations.push('建立完善的发票管理制度，确保进项税额及时抵扣');
                recommendations.push('定期评估供应商结构，优先选择可提供专票的供应商');
                recommendations.push('关注税收政策变化，及时调整筹划策略');
            }

            const result = {
                originalTax: Number(originalVAT.toFixed(2)),
                optimizedTax: Number(optimizedVAT.toFixed(2)),
                taxSavings: Number(taxSavings.toFixed(2)),
                effectiveTaxRate: Number(effectiveRate.toFixed(2)),
                savingsPercentage: Number(savingsPercentage.toFixed(2)),
                recommendations: recommendations
            };

            setVatPlanningResult(result);

            // 调用父组件的保存历史功能
            if (saveToHistory) {
                saveToHistory('增值税纳税筹划', taxSavings / 10000, effectiveRate, planningData);
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
            name: `增值税筹划方案_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`,
            data: planningData,
            result: vatPlanningResult,
            createdAt: new Date().toISOString()
        };
        setSavedPlans(prev => [...prev, plan]);
        alert('方案已保存！');
    };

    // 导出方案
    const exportPlan = () => {
        const exportData = {
            planningData,
            calculationResult: vatPlanningResult,
            exportDate: new Date().toISOString(),
            summary: {
                originalTax: vatPlanningResult.originalTax,
                optimizedTax: vatPlanningResult.optimizedTax,
                taxSavings: vatPlanningResult.taxSavings,
                savingsPercentage: vatPlanningResult.savingsPercentage
            }
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `增值税纳税筹划方案_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const renderVatPlanningContent = () => {
        switch (activeVatTab) {
            case 'vat-taxpayer':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">纳税人身份选择筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('taxpayerStatus')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">当前纳税人身份</label>
                                <select
                                    value={planningData.taxpayerStatus.currentStatus}
                                    onChange={(e) => updatePlanningField('taxpayerStatus', 'currentStatus', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="general">一般纳税人</option>
                                    <option value="small">小规模纳税人</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">年销售额</label>
                                <input
                                    type="number"
                                    value={planningData.taxpayerStatus.annualSales}
                                    onChange={(e) => updatePlanningField('taxpayerStatus', 'annualSales', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">进项税额</label>
                                <input
                                    type="number"
                                    value={planningData.taxpayerStatus.inputTaxAmount}
                                    onChange={(e) => updatePlanningField('taxpayerStatus', 'inputTaxAmount', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">销项税率(%)</label>
                                <select
                                    value={planningData.taxpayerStatus.outputTaxRate}
                                    onChange={(e) => updatePlanningField('taxpayerStatus', 'outputTaxRate', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value={13}>13%</option>
                                    <option value={9}>9%</option>
                                    <option value={6}>6%</option>
                                    <option value={3}>3%</option>
                                    <option value={0}>0%</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">小规模征收率(%)</label>
                                <select
                                    value={planningData.taxpayerStatus.smallTaxpayerRate}
                                    onChange={(e) => updatePlanningField('taxpayerStatus', 'smallTaxpayerRate', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value={3}>3%</option>
                                    <option value={1}>1%</option>
                                    <option value={0.5}>0.5%</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">客户类型</label>
                                <select
                                    value={planningData.taxpayerStatus.customerType}
                                    onChange={(e) => updatePlanningField('taxpayerStatus', 'customerType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="business">企业客户为主</option>
                                    <option value="individual">个人客户为主</option>
                                    <option value="mixed">混合客户</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">行业类型</label>
                                <select
                                    value={planningData.taxpayerStatus.industryType}
                                    onChange={(e) => updatePlanningField('taxpayerStatus', 'industryType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="manufacturing">制造业</option>
                                    <option value="trading">贸易业</option>
                                    <option value="service">服务业</option>
                                    <option value="construction">建筑业</option>
                                    <option value="transportation">运输业</option>
                                </select>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={planningData.taxpayerStatus.needSpecialInvoice}
                                        onChange={(e) => updatePlanningField('taxpayerStatus', 'needSpecialInvoice', e.target.checked)}
                                        className="mr-2"
                                    />
                                    需要开具专用发票
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 'vat-output':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">销项税额筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('outputTax')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 销售结构 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">销售结构</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">总销售额</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.totalSales}
                                            onChange={(e) => updatePlanningField('outputTax', 'totalSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">货物销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.goodsSales}
                                            onChange={(e) => updatePlanningField('outputTax', 'goodsSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">服务销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.serviceSales}
                                            onChange={(e) => updatePlanningField('outputTax', 'serviceSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">混合销售货物比例(%)</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.mixedSalesRatio}
                                            onChange={(e) => updatePlanningField('outputTax', 'mixedSalesRatio', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 销售方式 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">销售方式</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">直接销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.directSales}
                                            onChange={(e) => updatePlanningField('outputTax', 'directSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">委托代销</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.consignmentSales}
                                            onChange={(e) => updatePlanningField('outputTax', 'consignmentSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">分期收款销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.installmentSales}
                                            onChange={(e) => updatePlanningField('outputTax', 'installmentSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">预收款销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.advanceSales}
                                            onChange={(e) => updatePlanningField('outputTax', 'advanceSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 价格策略 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">价格策略</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">含税价销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.taxInclusivePrice}
                                            onChange={(e) => updatePlanningField('outputTax', 'taxInclusivePrice', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">不含税价销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.taxExclusivePrice}
                                            onChange={(e) => updatePlanningField('outputTax', 'taxExclusivePrice', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">销售折扣</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.discountAmount}
                                            onChange={(e) => updatePlanningField('outputTax', 'discountAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">销售折让</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.allowanceAmount}
                                            onChange={(e) => updatePlanningField('outputTax', 'allowanceAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 税率结构 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">税率结构</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">13%税率销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.rate13Percent}
                                            onChange={(e) => updatePlanningField('outputTax', 'rate13Percent', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">9%税率销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.rate9Percent}
                                            onChange={(e) => updatePlanningField('outputTax', 'rate9Percent', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">6%税率销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.rate6Percent}
                                            onChange={(e) => updatePlanningField('outputTax', 'rate6Percent', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">0%税率销售</label>
                                        <input
                                            type="number"
                                            value={planningData.outputTax.rate0Percent}
                                            onChange={(e) => updatePlanningField('outputTax', 'rate0Percent', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'vat-input':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">进项税额筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('inputTax')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 采购结构 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">采购结构</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">总采购金额</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.totalPurchases}
                                            onChange={(e) => updatePlanningField('inputTax', 'totalPurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">原材料采购</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.rawMaterialPurchases}
                                            onChange={(e) => updatePlanningField('inputTax', 'rawMaterialPurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">固定资产采购</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.fixedAssetPurchases}
                                            onChange={(e) => updatePlanningField('inputTax', 'fixedAssetPurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">服务采购</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.servicePurchases}
                                            onChange={(e) => updatePlanningField('inputTax', 'servicePurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 发票管理 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">发票管理</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">专用发票金额</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.specialInvoiceAmount}
                                            onChange={(e) => updatePlanningField('inputTax', 'specialInvoiceAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">普通发票金额</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.ordinaryInvoiceAmount}
                                            onChange={(e) => updatePlanningField('inputTax', 'ordinaryInvoiceAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">电子发票金额</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.electronicInvoiceAmount}
                                            onChange={(e) => updatePlanningField('inputTax', 'electronicInvoiceAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 抵扣策略 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">抵扣策略</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">当期抵扣</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.currentPeriodDeduction}
                                            onChange={(e) => updatePlanningField('inputTax', 'currentPeriodDeduction', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">留抵税额</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.carryForwardDeduction}
                                            onChange={(e) => updatePlanningField('inputTax', 'carryForwardDeduction', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 供应商选择 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">供应商选择</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">一般纳税人供应商采购</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.generalSupplierPurchases}
                                            onChange={(e) => updatePlanningField('inputTax', 'generalSupplierPurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">小规模供应商采购</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.smallSupplierPurchases}
                                            onChange={(e) => updatePlanningField('inputTax', 'smallSupplierPurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">供应商优化节税</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.supplierOptimizationSavings}
                                            onChange={(e) => updatePlanningField('inputTax', 'supplierOptimizationSavings', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 特殊项目 */}
                            <div>
                                <h5 className="font-medium mb-3 text-red-600">特殊项目抵扣</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">不动产抵扣</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.realEstateDeduction}
                                            onChange={(e) => updatePlanningField('inputTax', 'realEstateDeduction', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">差旅费抵扣</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.travelExpenseDeduction}
                                            onChange={(e) => updatePlanningField('inputTax', 'travelExpenseDeduction', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">招待费抵扣</label>
                                        <input
                                            type="number"
                                            value={planningData.inputTax.entertainmentExpenseDeduction}
                                            onChange={(e) => updatePlanningField('inputTax', 'entertainmentExpenseDeduction', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'vat-preferential':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">税收优惠政策</h4>
                            <button
                                onClick={() => autoFillPlanningData('preferentialPolicies')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 出口退税 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">出口退税</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">出口销售额</label>
                                        <input
                                            type="number"
                                            value={planningData.preferentialPolicies.exportSales}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'exportSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">退税率(%)</label>
                                        <select
                                            value={planningData.preferentialPolicies.exportTaxRefundRate}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'exportTaxRefundRate', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value={13}>13%</option>
                                            <option value={10}>10%</option>
                                            <option value={9}>9%</option>
                                            <option value={6}>6%</option>
                                            <option value={0}>0%</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">预计退税额</label>
                                        <input
                                            type="number"
                                            value={planningData.preferentialPolicies.exportTaxRefund}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'exportTaxRefund', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 行业优惠 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">行业优惠政策</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isHighTechEnterprise}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isHighTechEnterprise', e.target.checked)}
                                            className="mr-2"
                                        />
                                        高新技术企业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isSoftwareEnterprise}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isSoftwareEnterprise', e.target.checked)}
                                            className="mr-2"
                                        />
                                        软件企业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isSmallMicroEnterprise}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isSmallMicroEnterprise', e.target.checked)}
                                            className="mr-2"
                                        />
                                        小微企业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isModernServiceIndustry}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isModernServiceIndustry', e.target.checked)}
                                            className="mr-2"
                                        />
                                        现代服务业
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isAgricultureRelated}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isAgricultureRelated', e.target.checked)}
                                            className="mr-2"
                                        />
                                        农业相关
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isEnvironmentalProtection}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isEnvironmentalProtection', e.target.checked)}
                                            className="mr-2"
                                        />
                                        环境保护
                                    </label>
                                </div>
                            </div>

                            {/* 地区优惠 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">地区优惠政策</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isWesternRegion}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isWesternRegion', e.target.checked)}
                                            className="mr-2"
                                        />
                                        西部地区
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isFreeTradeZone}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isFreeTradeZone', e.target.checked)}
                                            className="mr-2"
                                        />
                                        自贸区
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.preferentialPolicies.isDevelopmentZone}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'isDevelopmentZone', e.target.checked)}
                                            className="mr-2"
                                        />
                                        开发区
                                    </label>
                                </div>
                            </div>

                            {/* 特殊政策 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">特殊政策</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">即征即退</label>
                                        <input
                                            type="number"
                                            value={planningData.preferentialPolicies.immediateTaxRefund}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'immediateTaxRefund', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">先征后返</label>
                                        <input
                                            type="number"
                                            value={planningData.preferentialPolicies.firstCollectThenRefund}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'firstCollectThenRefund', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">减税金额</label>
                                        <input
                                            type="number"
                                            value={planningData.preferentialPolicies.taxReductionAmount}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'taxReductionAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">免税金额</label>
                                        <input
                                            type="number"
                                            value={planningData.preferentialPolicies.exemptionAmount}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'exemptionAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 研发相关 */}
                            <div>
                                <h5 className="font-medium mb-3 text-red-600">研发相关优惠</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">研发服务采购</label>
                                        <input
                                            type="number"
                                            value={planningData.preferentialPolicies.rdServicePurchases}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'rdServicePurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">研发设备采购</label>
                                        <input
                                            type="number"
                                            value={planningData.preferentialPolicies.rdEquipmentPurchases}
                                            onChange={(e) => updatePlanningField('preferentialPolicies', 'rdEquipmentPurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'vat-business':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">业务模式筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('businessModel')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 业务模式选择 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">业务模式选择</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">当前业务模式</label>
                                        <select
                                            value={planningData.businessModel.currentModel}
                                            onChange={(e) => updatePlanningField('businessModel', 'currentModel', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="direct">直接销售</option>
                                            <option value="consignment">委托代销</option>
                                            <option value="processing">委托加工</option>
                                            <option value="mixed">混合模式</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* 委托加工模式 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">委托加工模式</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">加工费</label>
                                        <input
                                            type="number"
                                            value={planningData.businessModel.processingFees}
                                            onChange={(e) => updatePlanningField('businessModel', 'processingFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">加工材料成本</label>
                                        <input
                                            type="number"
                                            value={planningData.businessModel.processingMaterialCost}
                                            onChange={(e) => updatePlanningField('businessModel', 'processingMaterialCost', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 销售渠道优化 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">销售渠道优化</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">分销商销售</label>
                                        <input
                                            type="number"
                                            value={planningData.businessModel.distributorSales}
                                            onChange={(e) => updatePlanningField('businessModel', 'distributorSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">直接客户销售</label>
                                        <input
                                            type="number"
                                            value={planningData.businessModel.directCustomerSales}
                                            onChange={(e) => updatePlanningField('businessModel', 'directCustomerSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 集团内部交易 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">集团内部交易</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">内部销售</label>
                                        <input
                                            type="number"
                                            value={planningData.businessModel.internalSales}
                                            onChange={(e) => updatePlanningField('businessModel', 'internalSales', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">内部采购</label>
                                        <input
                                            type="number"
                                            value={planningData.businessModel.internalPurchases}
                                            onChange={(e) => updatePlanningField('businessModel', 'internalPurchases', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">内部服务费</label>
                                        <input
                                            type="number"
                                            value={planningData.businessModel.internalServiceFees}
                                            onChange={(e) => updatePlanningField('businessModel', 'internalServiceFees', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 功能性公司 */}
                            <div>
                                <h5 className="font-medium mb-3 text-red-600">功能性公司设立</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.businessModel.hasSalesCompany}
                                            onChange={(e) => updatePlanningField('businessModel', 'hasSalesCompany', e.target.checked)}
                                            className="mr-2"
                                        />
                                        销售公司
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.businessModel.hasRDCenter}
                                            onChange={(e) => updatePlanningField('businessModel', 'hasRDCenter', e.target.checked)}
                                            className="mr-2"
                                        />
                                        研发中心
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.businessModel.hasServiceCenter}
                                            onChange={(e) => updatePlanningField('businessModel', 'hasServiceCenter', e.target.checked)}
                                            className="mr-2"
                                        />
                                        服务中心
                                    </label>
                                </div>
                            </div>

                            {/* 业务分离 */}
                            <div>
                                <h5 className="font-medium mb-3 text-indigo-600">业务分离策略</h5>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.businessModel.separateGoodsServices}
                                            onChange={(e) => updatePlanningField('businessModel', 'separateGoodsServices', e.target.checked)}
                                            className="mr-2"
                                        />
                                        货物和服务分离
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.businessModel.separateHighLowTaxRate}
                                            onChange={(e) => updatePlanningField('businessModel', 'separateHighLowTaxRate', e.target.checked)}
                                            className="mr-2"
                                        />
                                        高低税率业务分离
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'vat-contract':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">合同条款筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('contractPlanning')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 价格条款 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">价格条款</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">合同金额</label>
                                        <input
                                            type="number"
                                            value={planningData.contractPlanning.contractValue}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'contractValue', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={planningData.contractPlanning.taxInclusiveContract}
                                                onChange={(e) => updatePlanningField('contractPlanning', 'taxInclusiveContract', e.target.checked)}
                                                className="mr-2"
                                            />
                                            含税价合同
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 付款方式 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">付款方式</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">付款方式</label>
                                        <select
                                            value={planningData.contractPlanning.paymentMethod}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'paymentMethod', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="lump">一次性付款</option>
                                            <option value="installment">分期付款</option>
                                            <option value="deferred">延期付款</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">预付款比例(%)</label>
                                        <input
                                            type="number"
                                            value={planningData.contractPlanning.advancePaymentRatio}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'advancePaymentRatio', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 交付条款 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">交付条款</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">交付条件</label>
                                        <select
                                            value={planningData.contractPlanning.deliveryTerms}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'deliveryTerms', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="FOB">FOB</option>
                                            <option value="CIF">CIF</option>
                                            <option value="EXW">EXW</option>
                                            <option value="DDP">DDP</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">风险转移点</label>
                                        <select
                                            value={planningData.contractPlanning.riskTransferPoint}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'riskTransferPoint', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="delivery">交付时</option>
                                            <option value="acceptance">验收时</option>
                                            <option value="installation">安装时</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* 违约条款 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">违约条款</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">违约金</label>
                                        <input
                                            type="number"
                                            value={planningData.contractPlanning.penaltyAmount}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'penaltyAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">赔偿金</label>
                                        <input
                                            type="number"
                                            value={planningData.contractPlanning.compensationAmount}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'compensationAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 服务合同 */}
                            <div>
                                <h5 className="font-medium mb-3 text-red-600">服务合同</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">服务合同金额</label>
                                        <input
                                            type="number"
                                            value={planningData.contractPlanning.serviceContract}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'serviceContract', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">咨询合同金额</label>
                                        <input
                                            type="number"
                                            value={planningData.contractPlanning.consultingContract}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'consultingContract', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">维护合同金额</label>
                                        <input
                                            type="number"
                                            value={planningData.contractPlanning.maintenanceContract}
                                            onChange={(e) => updatePlanningField('contractPlanning', 'maintenanceContract', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'vat-organization':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">组织架构筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('organizationStructure')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 集团架构 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">集团架构</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.hasHoldingCompany}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'hasHoldingCompany', e.target.checked)}
                                            className="mr-2"
                                        />
                                        控股公司
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.hasRegionalCompanies}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'hasRegionalCompanies', e.target.checked)}
                                            className="mr-2"
                                        />
                                        区域公司
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.hasFunctionalCompanies}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'hasFunctionalCompanies', e.target.checked)}
                                            className="mr-2"
                                        />
                                        功能公司
                                    </label>
                                </div>
                            </div>

                            {/* 结算中心 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">结算中心</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.hasSettlementCenter}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'hasSettlementCenter', e.target.checked)}
                                            className="mr-2"
                                        />
                                        结算中心
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.centralizedPurchasing}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'centralizedPurchasing', e.target.checked)}
                                            className="mr-2"
                                        />
                                        集中采购
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.centralizedSales}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'centralizedSales', e.target.checked)}
                                            className="mr-2"
                                        />
                                        集中销售
                                    </label>
                                </div>
                            </div>

                            {/* 地域分布 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">地域分布</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">主要经营地区</label>
                                        <select
                                            value={planningData.organizationStructure.mainOperationRegion}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'mainOperationRegion', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="eastern">东部地区</option>
                                            <option value="central">中部地区</option>
                                            <option value="western">西部地区</option>
                                            <option value="northeast">东北地区</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">分支机构数量</label>
                                        <input
                                            type="number"
                                            value={planningData.organizationStructure.branchOfficeCount}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'branchOfficeCount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">子公司数量</label>
                                        <input
                                            type="number"
                                            value={planningData.organizationStructure.subsidiaryCount}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'subsidiaryCount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 业务分离 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">业务分离</h5>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.separateManufacturing}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'separateManufacturing', e.target.checked)}
                                            className="mr-2"
                                        />
                                        生产分离
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.separateTrading}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'separateTrading', e.target.checked)}
                                            className="mr-2"
                                        />
                                        贸易分离
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={planningData.organizationStructure.separateServices}
                                            onChange={(e) => updatePlanningField('organizationStructure', 'separateServices', e.target.checked)}
                                            className="mr-2"
                                        />
                                        服务分离
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'vat-timing':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">时间性筹划</h4>
                            <button
                                onClick={() => autoFillPlanningData('timingPlanning')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* 收入确认时点 */}
                            <div>
                                <h5 className="font-medium mb-3 text-blue-600">收入确认时点</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">确认时点</label>
                                        <select
                                            value={planningData.timingPlanning.revenueRecognitionTiming}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'revenueRecognitionTiming', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="delivery">交付时确认</option>
                                            <option value="acceptance">验收时确认</option>
                                            <option value="payment">收款时确认</option>
                                            <option value="installation">安装时确认</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">提前确认金额</label>
                                        <input
                                            type="number"
                                            value={planningData.timingPlanning.advanceRecognitionAmount}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'advanceRecognitionAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">递延确认金额</label>
                                        <input
                                            type="number"
                                            value={planningData.timingPlanning.deferredRecognitionAmount}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'deferredRecognitionAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 进项抵扣时点 */}
                            <div>
                                <h5 className="font-medium mb-3 text-green-600">进项抵扣时点</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">抵扣时点</label>
                                        <select
                                            value={planningData.timingPlanning.inputDeductionTiming}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'inputDeductionTiming', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="immediate">立即抵扣</option>
                                            <option value="deferred">延期抵扣</option>
                                            <option value="optimal">最优时点</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">递延抵扣金额</label>
                                        <input
                                            type="number"
                                            value={planningData.timingPlanning.deferredDeductionAmount}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'deferredDeductionAmount', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 年度筹划 */}
                            <div>
                                <h5 className="font-medium mb-3 text-purple-600">年度筹划</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={planningData.timingPlanning.quarterlyBalance}
                                                onChange={(e) => updatePlanningField('timingPlanning', 'quarterlyBalance', e.target.checked)}
                                                className="mr-2"
                                            />
                                            季度平衡
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">年末调整金额</label>
                                        <input
                                            type="number"
                                            value={planningData.timingPlanning.yearEndAdjustment}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'yearEndAdjustment', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">次年筹划金额</label>
                                        <input
                                            type="number"
                                            value={planningData.timingPlanning.nextYearPlanning}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'nextYearPlanning', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 政策变化应对 */}
                            <div>
                                <h5 className="font-medium mb-3 text-orange-600">政策变化应对</h5>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">税率变化影响</label>
                                        <input
                                            type="number"
                                            value={planningData.timingPlanning.taxRateChangeImpact}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'taxRateChangeImpact', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">政策过渡收益</label>
                                        <input
                                            type="number"
                                            value={planningData.timingPlanning.policyTransitionBenefit}
                                            onChange={(e) => updatePlanningField('timingPlanning', 'policyTransitionBenefit', Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'vat-basic':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold">基础信息</h4>
                            <button
                                onClick={() => autoFillPlanningData('basicInfo')}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                                自动取数
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">企业名称</label>
                                <input
                                    type="text"
                                    value={planningData.basicInfo.companyName}
                                    onChange={(e) => updatePlanningField('basicInfo', 'companyName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">税号</label>
                                <input
                                    type="text"
                                    value={planningData.basicInfo.taxNumber}
                                    onChange={(e) => updatePlanningField('basicInfo', 'taxNumber', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">所属行业</label>
                                <select
                                    value={planningData.basicInfo.industry}
                                    onChange={(e) => updatePlanningField('basicInfo', 'industry', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="manufacturing">制造业</option>
                                    <option value="trading">贸易业</option>
                                    <option value="service">服务业</option>
                                    <option value="construction">建筑业</option>
                                    <option value="transportation">运输业</option>
                                    <option value="finance">金融业</option>
                                    <option value="realestate">房地产业</option>
                                    <option value="agriculture">农业</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">所在地区</label>
                                <select
                                    value={planningData.basicInfo.region}
                                    onChange={(e) => updatePlanningField('basicInfo', 'region', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="eastern">东部地区</option>
                                    <option value="central">中部地区</option>
                                    <option value="western">西部地区</option>
                                    <option value="northeast">东北地区</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">成立日期</label>
                                <input
                                    type="date"
                                    value={planningData.basicInfo.establishDate}
                                    onChange={(e) => updatePlanningField('basicInfo', 'establishDate', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">注册资本</label>
                                <input
                                    type="number"
                                    value={planningData.basicInfo.registeredCapital}
                                    onChange={(e) => updatePlanningField('basicInfo', 'registeredCapital', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">员工人数</label>
                                <input
                                    type="number"
                                    value={planningData.basicInfo.employeeCount}
                                    onChange={(e) => updatePlanningField('basicInfo', 'employeeCount', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">当前增值税率(%)</label>
                                <select
                                    value={planningData.basicInfo.currentVATRate}
                                    onChange={(e) => updatePlanningField('basicInfo', 'currentVATRate', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value={13}>13%</option>
                                    <option value={9}>9%</option>
                                    <option value={6}>6%</option>
                                    <option value={3}>3%</option>
                                    <option value={0}>0%</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">年营业收入</label>
                                <input
                                    type="number"
                                    value={planningData.basicInfo.annualRevenue}
                                    onChange={(e) => updatePlanningField('basicInfo', 'annualRevenue', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <h5 className="font-medium mb-3">季度收入分布</h5>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((quarter) => (
                                    <div key={quarter}>
                                        <label className="block text-sm font-medium mb-1">第{quarter}季度</label>
                                        <input
                                            type="number"
                                            value={planningData.basicInfo.quarterlyRevenue[quarter - 1]}
                                            onChange={(e) => {
                                                const newQuarterly = [...planningData.basicInfo.quarterlyRevenue];
                                                newQuarterly[quarter - 1] = Number(e.target.value);
                                                updatePlanningField('basicInfo', 'quarterlyRevenue', newQuarterly);
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                ))}
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
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800">增值税纳税筹划</h4>
                <p className="text-green-600 text-sm">基于多维度筹划策略的智能增值税优化工具</p>
            </div>

            <div className="border-b border-gray-200">
                <nav className="flex space-x-4 overflow-x-auto">
                    {vatPlanningTabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveVatTab(tab.id)}
                                className={`flex items-center gap-2 px-3 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${activeVatTab === tab.id
                                    ? 'border-green-500 text-green-600'
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
                        {renderVatPlanningContent()}
                    </div>

                    <div className="mt-4 flex justify-between">
                        <div className="flex gap-2">
                            <button
                                onClick={calculateVATPlanning}
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

                    {vatPlanningResult.recommendations.length > 0 && (
                        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                            <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                优化建议
                            </h5>
                            <ul className="space-y-2">
                                {vatPlanningResult.recommendations.map((rec, index) => (
                                    <li key={index} className="text-green-700 flex items-start gap-2">
                                        <span className="text-green-500 mt-1">•</span>
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
                                <label className="text-sm text-gray-600">原始增值税</label>
                                <div className="text-xl font-medium text-red-600">
                                    ¥{vatPlanningResult.originalTax.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">优化后增值税</label>
                                <div className="text-xl font-medium text-green-600">
                                    ¥{vatPlanningResult.optimizedTax.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">节税金额</label>
                                <div className="text-xl font-bold text-blue-600">
                                    ¥{vatPlanningResult.taxSavings.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">实际税率</label>
                                <div className="text-lg font-medium">
                                    {vatPlanningResult.effectiveTaxRate.toFixed(2)}%
                                </div>
                            </div>
                            <div className="bg-white rounded p-3">
                                <label className="text-sm text-gray-600">节税率</label>
                                <div className="text-lg font-medium text-purple-600">
                                    {vatPlanningResult.savingsPercentage.toFixed(2)}%
                                </div>
                            </div>
                        </div>

                        {/* 纳税人身份对比 */}
                        <div className="mt-6 bg-white rounded-lg p-3">
                            <h6 className="font-medium text-gray-800 mb-2">纳税人身份对比</h6>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>一般纳税人税负:</span>
                                    <span className="font-medium">
                                        ¥{Math.max(0, (planningData.taxpayerStatus.annualSales * (planningData.taxpayerStatus.outputTaxRate / 100)) - (planningData.taxpayerStatus.inputTaxAmount || 0)).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>小规模纳税人税负:</span>
                                    <span className="font-medium">
                                        ¥{(planningData.taxpayerStatus.annualSales * (planningData.taxpayerStatus.smallTaxpayerRate / 100)).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-blue-600">
                                    <span>身份优化建议:</span>
                                    <span className="font-medium">
                                        {(() => {
                                            const generalTax = Math.max(0, (planningData.taxpayerStatus.annualSales * (planningData.taxpayerStatus.outputTaxRate / 100)) - (planningData.taxpayerStatus.inputTaxAmount || 0));
                                            const smallTax = planningData.taxpayerStatus.annualSales * (planningData.taxpayerStatus.smallTaxpayerRate / 100);
                                            return generalTax < smallTax ? '一般纳税人' : '小规模纳税人';
                                        })()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 税率结构分析 */}
                        <div className="mt-4 bg-white rounded-lg p-3">
                            <h6 className="font-medium text-gray-800 mb-2">税率结构分析</h6>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>13%税率占比:</span>
                                    <span className="font-medium">
                                        {planningData.outputTax.totalSales > 0 ?
                                            ((planningData.outputTax.rate13Percent / planningData.outputTax.totalSales) * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>9%税率占比:</span>
                                    <span className="font-medium">
                                        {planningData.outputTax.totalSales > 0 ?
                                            ((planningData.outputTax.rate9Percent / planningData.outputTax.totalSales) * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>6%税率占比:</span>
                                    <span className="font-medium">
                                        {planningData.outputTax.totalSales > 0 ?
                                            ((planningData.outputTax.rate6Percent / planningData.outputTax.totalSales) * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>加权平均税率:</span>
                                    <span className="font-medium">
                                        {planningData.outputTax.totalSales > 0 ?
                                            (((planningData.outputTax.rate13Percent * 13) +
                                                (planningData.outputTax.rate9Percent * 9) +
                                                (planningData.outputTax.rate6Percent * 6)) /
                                                planningData.outputTax.totalSales).toFixed(2) : 0}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 进项抵扣分析 */}
                        <div className="mt-4 bg-white rounded-lg p-3">
                            <h6 className="font-medium text-gray-800 mb-2">进项抵扣分析</h6>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>专票抵扣率:</span>
                                    <span className="font-medium">
                                        {planningData.inputTax.totalPurchases > 0 ?
                                            ((planningData.inputTax.specialInvoiceAmount / planningData.inputTax.totalPurchases) * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>抵扣税额:</span>
                                    <span className="font-medium">
                                        ¥{(planningData.inputTax.specialInvoiceAmount * 0.13).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>留抵税额:</span>
                                    <span className="font-medium">
                                        ¥{planningData.inputTax.carryForwardDeduction.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-orange-600">
                                    <span>抵扣优化空间:</span>
                                    <span className="font-medium">
                                        ¥{(planningData.inputTax.smallSupplierPurchases * 0.13 * 0.7).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 出口退税分析 */}
                        {planningData.preferentialPolicies.exportSales > 0 && (
                            <div className="mt-4 bg-white rounded-lg p-3">
                                <h6 className="font-medium text-gray-800 mb-2">出口退税分析</h6>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>出口销售额:</span>
                                        <span className="font-medium">
                                            ¥{planningData.preferentialPolicies.exportSales.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>退税率:</span>
                                        <span className="font-medium">
                                            {planningData.preferentialPolicies.exportTaxRefundRate}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-blue-600">
                                        <span>预计退税:</span>
                                        <span className="font-medium">
                                            ¥{(planningData.preferentialPolicies.exportSales * (planningData.preferentialPolicies.exportTaxRefundRate / 100)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 筹划提示 */}
                        <div className="mt-6 bg-blue-50 rounded-lg p-3">
                            <h6 className="font-medium text-blue-800 mb-2">筹划提示</h6>
                            <div className="space-y-1 text-xs text-blue-700">
                                <p>• 合理选择纳税人身份是基础</p>
                                <p>• 优化供应商结构提升抵扣</p>
                                <p>• 利用税率差异优化业务</p>
                                <p>• 把握政策变化窗口期</p>
                                <p>• 注意合规性风险控制</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VATCalculator;