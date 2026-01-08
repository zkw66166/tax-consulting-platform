import React, { useState } from 'react';
import { Settings, FileCheck, AlertTriangle, X, ChevronDown, ChevronRight, Info, Play, Building2, Users } from 'lucide-react';

const CustomDetectionModal = ({ isOpen, onClose, customSettings, setCustomSettings, onStartDetection }) => {
    const [expandedSections, setExpandedSections] = useState({});
    const [activeTab, setActiveTab] = useState('template');

    if (!isOpen) return null;

    // 确保 customSettings 有默认值
    const safeCustomSettings = {
        dataCollection: {
            taxData: false,
            financialData: false,
            businessData: false,
            internalSystems: false,
            ...customSettings?.dataCollection
        },
        businessReview: {
            businessModel: false,
            keyProcesses: false,
            riskPoints: false,
            ...customSettings?.businessReview
        },
        taxTypes: {
            vat: {
                enabled: false,
                outputTax: false,
                inputTax: false,
                taxObligation: false,
                returns: false,
                ...customSettings?.taxTypes?.vat
            },
            corporateIncomeTax: {
                enabled: false,
                revenue: false,
                costs: false,
                assetHandling: false,
                taxPreferences: false,
                relatedPartyTransactions: false,
                returns: false,
                ...customSettings?.taxTypes?.corporateIncomeTax
            },
            personalIncomeTax: {
                enabled: false,
                salaryWages: false,
                serviceIncome: false,
                dividends: false,
                nonMonetaryBenefits: false,
                ...customSettings?.taxTypes?.personalIncomeTax
            },
            otherTaxes: {
                enabled: false,
                propertyTax: false,
                landUseTax: false,
                stampDuty: false,
                constructionTax: false,
                ...customSettings?.taxTypes?.otherTaxes
            },
            ...customSettings?.taxTypes
        },
        specialChecks: {
            invoiceManagement: false,
            declarationPayment: false,
            financialDataAnalysis: false,
            policyCompliance: false,
            highRiskAreas: false,
            internalControls: false,
            ...customSettings?.specialChecks
        },
        companyCharacteristics: {
            taxpayerType: '',
            companySize: '',
            groupStructure: '',
            relatedParties: '',
            capitalNature: '',
            supplyChainPosition: '',
            taxCredit: '',
            specialQualification: '',
            ...customSettings?.companyCharacteristics
        },
        industryTemplate: {
            manufacturing: {},
            wholesale: {},
            realEstate: {},
            finance: {},
            tmt: {},
            services: {},
            construction: {},
            agriculture: {},
            ...customSettings?.industryTemplate
        },
        generalTemplate: customSettings?.generalTemplate || 'standard',
        detectScope: customSettings?.detectScope || 'comprehensive',
        timePeriod: customSettings?.timePeriod || '2024',
        riskSettings: {
            sensitivity: 'normal',
            ...customSettings?.riskSettings
        },
        detectionMethods: {
            dataComparison: false,
            ratioAnalysis: false,
            procedureReview: false,
            documentVerification: false,
            systemCheck: false,
            ...customSettings?.detectionMethods
        },
        ...customSettings
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const updateTaxTypeSettings = (taxType, field, value) => {
        setCustomSettings(prev => ({
            ...prev,
            taxTypes: {
                ...prev.taxTypes,
                [taxType]: {
                    ...prev.taxTypes?.[taxType],
                    [field]: value
                }
            }
        }));
    };

    const updateSpecialChecks = (field, value) => {
        setCustomSettings(prev => ({
            ...prev,
            specialChecks: {
                ...prev.specialChecks,
                [field]: value
            }
        }));
    };

    const updateCompanyCharacteristics = (field, value) => {
        setCustomSettings(prev => ({
            ...prev,
            companyCharacteristics: {
                ...prev.companyCharacteristics,
                [field]: value
            }
        }));
    };

    const updateIndustrySelection = (industry, subIndustry, value) => {
        setCustomSettings(prev => ({
            ...prev,
            industryTemplate: {
                ...prev.industryTemplate,
                [industry]: {
                    ...prev.industryTemplate?.[industry],
                    [subIndustry]: value
                }
            }
        }));
    };

    const industryData = {
        manufacturing: {
            name: '制造业',
            subIndustries: {
                autoParts: '汽车零部件',
                textile: '纺织服装',
                foodProcessing: '食品加工',
                furniture: '家具制造',
                medical: '医疗器械',
                electronics: '电子代工'
            }
        },
        wholesale: {
            name: '批发零售',
            subIndustries: {
                fmcg: '快消品代理',
                pharmacy: '医药连锁',
                construction: '建材批发',
                crossBorder: '跨境电商',
                community: '社区团购'
            }
        },
        realEstate: {
            name: '房地产',
            subIndustries: {
                residential: '住宅开发',
                commercial: '商业运营',
                industrial: '产业园区',
                rental: '长租公寓',
                urban: '城市更新'
            }
        },
        finance: {
            name: '金融业',
            subIndustries: {
                village: '村镇银行',
                leasing: '融资租赁',
                microcredit: '小额贷款',
                insurance: '保险代理',
                private: '私募基金'
            }
        },
        tmt: {
            name: 'TMT行业',
            subIndustries: {
                saas: 'SaaS服务',
                gaming: '游戏开发',
                liveCommerce: '直播电商',
                hardware: '智能硬件',
                datacenter: '数据中心'
            }
        },
        services: {
            name: '生活服务业',
            subIndustries: {
                catering: '餐饮连锁',
                training: '职业培训',
                medical: '私立医疗',
                hospitality: '民宿酒店',
                fitness: '健身娱乐'
            }
        },
        construction: {
            name: '建筑业',
            subIndustries: {
                decoration: '装饰装修',
                municipal: '市政工程',
                mechanical: '机电安装',
                landscape: '园林绿化',
                fire: '消防工程'
            }
        },
        agriculture: {
            name: '农业',
            subIndustries: {
                grain: '粮食种植',
                livestock: '畜牧养殖',
                aquaculture: '水产渔业',
                forestry: '林木培育',
                agriCommerce: '农产品电商'
            }
        }
    };

    const renderDetectionTab = () => (
        <div className="space-y-6">
            {/* 企业特征维度 - 移到这里 */}
            <div className="border rounded-lg p-4">
                <button
                    onClick={() => toggleSection('companyCharacteristics')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-blue-600" />
                        企业特征（无法自动识别的部分需要手动选择）
                    </h4>
                    {expandedSections.companyCharacteristics ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>

                {expandedSections.companyCharacteristics && (
                    <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">纳税人身份</label>
                                <select
                                    value={safeCustomSettings.companyCharacteristics.taxpayerType}
                                    onChange={(e) => updateCompanyCharacteristics('taxpayerType', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">请选择纳税人身份</option>
                                    <option value="general">一般纳税人</option>
                                    <option value="small">小规模纳税人</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">风险点：小规模免征额临界点操纵风险</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">企业规模</label>
                                <select
                                    value={safeCustomSettings.companyCharacteristics.companySize}
                                    onChange={(e) => updateCompanyCharacteristics('companySize', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">请选择企业规模</option>
                                    <option value="micro">小微企业</option>
                                    <option value="medium">中型企业</option>
                                    <option value="large">大型企业</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">风险点：小微企业资产总额超标致优惠失效（如5000万红线）</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">集团结构</label>
                                <select
                                    value={safeCustomSettings.companyCharacteristics.groupStructure}
                                    onChange={(e) => updateCompanyCharacteristics('groupStructure', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">请选择集团结构</option>
                                    <option value="standalone">单体公司</option>
                                    <option value="member">集团成员</option>
                                    <option value="holding">控股公司</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">风险点：集团资金池利息定价转让定价风险</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">关联交易</label>
                                <select
                                    value={safeCustomSettings.companyCharacteristics.relatedParties}
                                    onChange={(e) => updateCompanyCharacteristics('relatedParties', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">请选择关联交易类型</option>
                                    <option value="none">无关联方</option>
                                    <option value="domestic">境内关联</option>
                                    <option value="crossBorder">跨境关联</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">风险点：跨境关联特许权使用费比例超标（如营收5%）</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">资本性质</label>
                                <select
                                    value={safeCustomSettings.companyCharacteristics.capitalNature}
                                    onChange={(e) => updateCompanyCharacteristics('capitalNature', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">请选择资本性质</option>
                                    <option value="private">民营</option>
                                    <option value="stateOwned">国企</option>
                                    <option value="foreign">外资</option>
                                    <option value="listed">上市</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">风险点：外资常设机构利润归属争议</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">供应链地位</label>
                                <select
                                    value={safeCustomSettings.companyCharacteristics.supplyChainPosition}
                                    onChange={(e) => updateCompanyCharacteristics('supplyChainPosition', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">请选择供应链地位</option>
                                    <option value="brand">品牌方</option>
                                    <option value="oem">代工厂</option>
                                    <option value="distributor">经销商</option>
                                    <option value="platform">平台方</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">风险点：平台方商户收入代扣代缴漏洞</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">税务信用</label>
                                <select
                                    value={safeCustomSettings.companyCharacteristics.taxCredit}
                                    onChange={(e) => updateCompanyCharacteristics('taxCredit', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">请选择税务信用等级</option>
                                    <option value="A">A级</option>
                                    <option value="B">B级</option>
                                    <option value="C">C级</option>
                                    <option value="D">D级</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">风险点：C/D级发票领用受限下的进项缺票风险</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">特殊资质</label>
                                <select
                                    value={safeCustomSettings.companyCharacteristics.specialQualification}
                                    onChange={(e) => updateCompanyCharacteristics('specialQualification', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">请选择特殊资质</option>
                                    <option value="highTech">高新企业</option>
                                    <option value="techSME">科技型中小企业</option>
                                    <option value="welfare">福利企业</option>
                                    <option value="none">无特殊资质</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">风险点：高新企业研发人员占比虚增（如行政充研发）</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 一、基础工作：资料整理与业务梳理 */}
            <div className="border rounded-lg p-4">
                <button
                    onClick={() => toggleSection('basicWork')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FileCheck className="h-5 w-5 mr-2 text-blue-600" />
                        数据来源及关键业务
                    </h4>
                    {expandedSections.basicWork ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>

                {expandedSections.basicWork && (
                    <div className="mt-4 space-y-4">
                        <div>
                            <h5 className="font-medium text-gray-800 mb-2">数据来源</h5>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={safeCustomSettings.dataCollection.taxData}
                                            onChange={(e) => setCustomSettings({
                                                ...safeCustomSettings,
                                                dataCollection: { ...safeCustomSettings.dataCollection, taxData: e.target.checked }
                                            })}
                                            className="mr-2"
                                        />
                                        税务资料（申报表、缴款凭证、税务处理决定书等）
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={safeCustomSettings.dataCollection.financialData}
                                            onChange={(e) => setCustomSettings({
                                                ...safeCustomSettings,
                                                dataCollection: { ...safeCustomSettings.dataCollection, financialData: e.target.checked }
                                            })}
                                            className="mr-2"
                                        />
                                        财务资料（财务报表、账簿、凭证、发票等）
                                    </label>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={safeCustomSettings.dataCollection.businessData}
                                            onChange={(e) => setCustomSettings({
                                                ...safeCustomSettings,
                                                dataCollection: { ...safeCustomSettings.dataCollection, businessData: e.target.checked }
                                            })}
                                            className="mr-2"
                                        />
                                        业务资料（合同、协议、员工花名册等）
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={safeCustomSettings.dataCollection.internalSystems}
                                            onChange={(e) => setCustomSettings({
                                                ...safeCustomSettings,
                                                dataCollection: { ...safeCustomSettings.dataCollection, internalSystems: e.target.checked }
                                            })}
                                            className="mr-2"
                                        />
                                        内部制度（财务管理、发票管理等制度）
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-medium text-gray-800 mb-2">业务流程</h5>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.businessReview.businessModel}
                                        onChange={(e) => setCustomSettings({
                                            ...safeCustomSettings,
                                            businessReview: { ...safeCustomSettings.businessReview, businessModel: e.target.checked }
                                        })}
                                        className="mr-2"
                                    />
                                    商业模式分析
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.businessReview.keyProcesses}
                                        onChange={(e) => setCustomSettings({
                                            ...safeCustomSettings,
                                            businessReview: { ...safeCustomSettings.businessReview, keyProcesses: e.target.checked }
                                        })}
                                        className="mr-2"
                                    />
                                    关键业务流程
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.businessReview.riskPoints}
                                        onChange={(e) => setCustomSettings({
                                            ...safeCustomSettings,
                                            businessReview: { ...safeCustomSettings.businessReview, riskPoints: e.target.checked }
                                        })}
                                        className="mr-2"
                                    />
                                    企业股权架构
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 二、核心环节：风险识别与评估 */}
            <div className="border rounded-lg p-4">
                <button
                    onClick={() => toggleSection('riskIdentification')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                        税种及检测项目
                    </h4>
                    {expandedSections.riskIdentification ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>

                {expandedSections.riskIdentification && (
                    <div className="mt-4 space-y-6">
                        {/* 常规性自查（按税种） */}
                        <div>
                            <h5 className="font-medium text-gray-800 mb-3">1. 常规性自查（按税种/事项）</h5>

                            {/* 增值税 */}
                            <div className="border border-gray-200 rounded-lg p-3 mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="flex items-center font-medium">
                                        <input
                                            type="checkbox"
                                            checked={safeCustomSettings.taxTypes.vat.enabled}
                                            onChange={(e) => updateTaxTypeSettings('vat', 'enabled', e.target.checked)}
                                            className="mr-2"
                                        />
                                        增值税检测
                                    </label>
                                </div>
                                {safeCustomSettings.taxTypes.vat.enabled && (
                                    <div className="grid grid-cols-2 gap-2 ml-6 text-sm">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.vat.outputTax}
                                                onChange={(e) => updateTaxTypeSettings('vat', 'outputTax', e.target.checked)}
                                                className="mr-1"
                                            />
                                            销项税（收入确认、税率适用、发票开具）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.vat.inputTax}
                                                onChange={(e) => updateTaxTypeSettings('vat', 'inputTax', e.target.checked)}
                                                className="mr-1"
                                            />
                                            进项税（抵扣凭证、抵扣范围、进项转出）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.vat.taxObligation}
                                                onChange={(e) => updateTaxTypeSettings('vat', 'taxObligation', e.target.checked)}
                                                className="mr-1"
                                            />
                                            纳税义务发生时间
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.vat.returns}
                                                onChange={(e) => updateTaxTypeSettings('vat', 'returns', e.target.checked)}
                                                className="mr-1"
                                            />
                                            申报表填写准确性
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* 企业所得税 */}
                            <div className="border border-gray-200 rounded-lg p-3 mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="flex items-center font-medium">
                                        <input
                                            type="checkbox"
                                            checked={safeCustomSettings.taxTypes.corporateIncomeTax.enabled}
                                            onChange={(e) => updateTaxTypeSettings('corporateIncomeTax', 'enabled', e.target.checked)}
                                            className="mr-2"
                                        />
                                        企业所得税检测
                                    </label>
                                </div>
                                {safeCustomSettings.taxTypes.corporateIncomeTax.enabled && (
                                    <div className="grid grid-cols-2 gap-2 ml-6 text-sm">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.corporateIncomeTax.revenue}
                                                onChange={(e) => updateTaxTypeSettings('corporateIncomeTax', 'revenue', e.target.checked)}
                                                className="mr-1"
                                            />
                                            收入确认（权责发生制、免税收入）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.corporateIncomeTax.costs}
                                                onChange={(e) => updateTaxTypeSettings('corporateIncomeTax', 'costs', e.target.checked)}
                                                className="mr-1"
                                            />
                                            成本费用（扣除凭证、限额、折旧摊销）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.corporateIncomeTax.assetHandling}
                                                onChange={(e) => updateTaxTypeSettings('corporateIncomeTax', 'assetHandling', e.target.checked)}
                                                className="mr-1"
                                            />
                                            资产处理（损失扣除、计税基础）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.corporateIncomeTax.taxPreferences}
                                                onChange={(e) => updateTaxTypeSettings('corporateIncomeTax', 'taxPreferences', e.target.checked)}
                                                className="mr-1"
                                            />
                                            税收优惠（高新、研发费用、小微等）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.corporateIncomeTax.relatedPartyTransactions}
                                                onChange={(e) => updateTaxTypeSettings('corporateIncomeTax', 'relatedPartyTransactions', e.target.checked)}
                                                className="mr-1"
                                            />
                                            关联交易（独立交易原则、转让定价）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.corporateIncomeTax.returns}
                                                onChange={(e) => updateTaxTypeSettings('corporateIncomeTax', 'returns', e.target.checked)}
                                                className="mr-1"
                                            />
                                            申报表勾稽关系
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* 个人所得税 */}
                            <div className="border border-gray-200 rounded-lg p-3 mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="flex items-center font-medium">
                                        <input
                                            type="checkbox"
                                            checked={safeCustomSettings.taxTypes.personalIncomeTax.enabled}
                                            onChange={(e) => updateTaxTypeSettings('personalIncomeTax', 'enabled', e.target.checked)}
                                            className="mr-2"
                                        />
                                        个人所得税检测
                                    </label>
                                </div>
                                {safeCustomSettings.taxTypes.personalIncomeTax.enabled && (
                                    <div className="grid grid-cols-2 gap-2 ml-6 text-sm">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.personalIncomeTax.salaryWages}
                                                onChange={(e) => updateTaxTypeSettings('personalIncomeTax', 'salaryWages', e.target.checked)}
                                                className="mr-1"
                                            />
                                            工资薪金（专项扣除、专项附加扣除）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.personalIncomeTax.serviceIncome}
                                                onChange={(e) => updateTaxTypeSettings('personalIncomeTax', 'serviceIncome', e.target.checked)}
                                                className="mr-1"
                                            />
                                            劳务报酬、稿酬、特许权使用费
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.personalIncomeTax.dividends}
                                                onChange={(e) => updateTaxTypeSettings('personalIncomeTax', 'dividends', e.target.checked)}
                                                className="mr-1"
                                            />
                                            股东分红、股权转让
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.personalIncomeTax.nonMonetaryBenefits}
                                                onChange={(e) => updateTaxTypeSettings('personalIncomeTax', 'nonMonetaryBenefits', e.target.checked)}
                                                className="mr-1"
                                            />
                                            非货币性福利
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* 其他税种 */}
                            <div className="border border-gray-200 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="flex items-center font-medium">
                                        <input
                                            type="checkbox"
                                            checked={safeCustomSettings.taxTypes.otherTaxes.enabled}
                                            onChange={(e) => updateTaxTypeSettings('otherTaxes', 'enabled', e.target.checked)}
                                            className="mr-2"
                                        />
                                        其他税种检测
                                    </label>
                                </div>
                                {safeCustomSettings.taxTypes.otherTaxes.enabled && (
                                    <div className="grid grid-cols-2 gap-2 ml-6 text-sm">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.otherTaxes.propertyTax}
                                                onChange={(e) => updateTaxTypeSettings('otherTaxes', 'propertyTax', e.target.checked)}
                                                className="mr-1"
                                            />
                                            房产税（原值、免税房产）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.otherTaxes.landUseTax}
                                                onChange={(e) => updateTaxTypeSettings('otherTaxes', 'landUseTax', e.target.checked)}
                                                className="mr-1"
                                            />
                                            土地使用税（面积、等级）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.otherTaxes.stampDuty}
                                                onChange={(e) => updateTaxTypeSettings('otherTaxes', 'stampDuty', e.target.checked)}
                                                className="mr-1"
                                            />
                                            印花税（应税合同贴花）
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.taxTypes.otherTaxes.constructionTax}
                                                onChange={(e) => updateTaxTypeSettings('otherTaxes', 'constructionTax', e.target.checked)}
                                                className="mr-1"
                                            />
                                            城建税及附加（计税依据）
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 专项检查 */}
                        <div>
                            <h5 className="font-medium text-gray-800 mb-3">2. 专项检查重点</h5>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.specialChecks.invoiceManagement}
                                        onChange={(e) => updateSpecialChecks('invoiceManagement', e.target.checked)}
                                        className="mr-2"
                                    />
                                    发票管理（领用、开具、保管、虚开风险）
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.specialChecks.declarationPayment}
                                        onChange={(e) => updateSpecialChecks('declarationPayment', e.target.checked)}
                                        className="mr-2"
                                    />
                                    申报缴纳（按期申报、数据一致性）
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.specialChecks.financialDataAnalysis}
                                        onChange={(e) => updateSpecialChecks('financialDataAnalysis', e.target.checked)}
                                        className="mr-2"
                                    />
                                    财务数据比对分析（税负率、指标对比）
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.specialChecks.policyCompliance}
                                        onChange={(e) => updateSpecialChecks('policyCompliance', e.target.checked)}
                                        className="mr-2"
                                    />
                                    政策适用性检查（优惠政策变化）
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.specialChecks.highRiskAreas}
                                        onChange={(e) => updateSpecialChecks('highRiskAreas', e.target.checked)}
                                        className="mr-2"
                                    />
                                    高风险领域（无票支出、关联交易）
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={safeCustomSettings.specialChecks.internalControls}
                                        onChange={(e) => updateSpecialChecks('internalControls', e.target.checked)}
                                        className="mr-2"
                                    />
                                    内部流程控制评估
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 检测范围和时间设置 */}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">检测范围</label>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="detectScope"
                                value="comprehensive"
                                checked={safeCustomSettings.detectScope === 'comprehensive'}
                                onChange={(e) => setCustomSettings({ ...safeCustomSettings, detectScope: e.target.value })}
                                className="mr-2"
                            />
                            全面检测（覆盖所有税种、业务流程）
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="detectScope"
                                value="focused"
                                checked={safeCustomSettings.detectScope === 'focused'}
                                onChange={(e) => setCustomSettings({ ...safeCustomSettings, detectScope: e.target.value })}
                                className="mr-2"
                            />
                            重点检测（仅检测选定的税种和风险点）
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="detectScope"
                                value="incremental"
                                checked={safeCustomSettings.detectScope === 'incremental'}
                                onChange={(e) => setCustomSettings({ ...safeCustomSettings, detectScope: e.target.value })}
                                className="mr-2"
                            />
                            增量检测（仅检测新增和变更的业务）
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">检测时间范围</label>
                    <select
                        value={safeCustomSettings.timePeriod}
                        onChange={(e) => setCustomSettings({ ...safeCustomSettings, timePeriod: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="2024">2024年全年</option>
                        <option value="2024-q4">2024年第四季度</option>
                        <option value="2024-12">2024年12月</option>
                        <option value="recent3months">近3个月</option>
                        <option value="recent6months">近6个月</option>
                        <option value="custom">自定义时间范围</option>
                    </select>
                </div>
            </div>

            {/* 风险敏感度设置 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">风险检测敏感度</label>
                <div className="flex space-x-6">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sensitivity"
                            value="low"
                            checked={safeCustomSettings.riskSettings.sensitivity === 'low'}
                            onChange={(e) => setCustomSettings({
                                ...safeCustomSettings,
                                riskSettings: { ...safeCustomSettings.riskSettings, sensitivity: e.target.value }
                            })}
                            className="mr-2"
                        />
                        <div>
                            <span className="font-medium">宽松模式</span>
                            <p className="text-xs text-gray-500">仅检测重大风险和明显违规</p>
                        </div>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sensitivity"
                            value="normal"
                            checked={safeCustomSettings.riskSettings.sensitivity === 'normal'}
                            onChange={(e) => setCustomSettings({
                                ...safeCustomSettings,
                                riskSettings: { ...safeCustomSettings.riskSettings, sensitivity: e.target.value }
                            })}
                            className="mr-2"
                        />
                        <div>
                            <span className="font-medium">标准模式</span>
                            <p className="text-xs text-gray-500">平衡检测覆盖面和误报率</p>
                        </div>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="sensitivity"
                            value="high"
                            checked={safeCustomSettings.riskSettings.sensitivity === 'high'}
                            onChange={(e) => setCustomSettings({
                                ...safeCustomSettings,
                                riskSettings: { ...safeCustomSettings.riskSettings, sensitivity: e.target.value }
                            })}
                            className="mr-2"
                        />
                        <div>
                            <span className="font-medium">严格模式</span>
                            <p className="text-xs text-gray-500">检测所有潜在风险和异常</p>
                        </div>
                    </label>
                </div>
            </div>

            {/* 检测方法选择 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">检测方法和工具</label>
                <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={safeCustomSettings.detectionMethods.dataComparison}
                            onChange={(e) => setCustomSettings({
                                ...safeCustomSettings,
                                detectionMethods: { ...safeCustomSettings.detectionMethods, dataComparison: e.target.checked }
                            })}
                            className="mr-2"
                        />
                        财务数据比对分析
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={safeCustomSettings.detectionMethods.ratioAnalysis}
                            onChange={(e) => setCustomSettings({
                                ...safeCustomSettings,
                                detectionMethods: { ...safeCustomSettings.detectionMethods, ratioAnalysis: e.target.checked }
                            })}
                            className="mr-2"
                        />
                        税负率和关键指标分析
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={safeCustomSettings.detectionMethods.procedureReview}
                            onChange={(e) => setCustomSettings({
                                ...safeCustomSettings,
                                detectionMethods: { ...safeCustomSettings.detectionMethods, procedureReview: e.target.checked }
                            })}
                            className="mr-2"
                        />
                        业务流程和内控审查
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={safeCustomSettings.detectionMethods.documentVerification}
                            onChange={(e) => setCustomSettings({
                                ...safeCustomSettings,
                                detectionMethods: { ...safeCustomSettings.detectionMethods, documentVerification: e.target.checked }
                            })}
                            className="mr-2"
                        />
                        凭证和文档验证
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={safeCustomSettings.detectionMethods.systemCheck}
                            onChange={(e) => setCustomSettings({
                                ...safeCustomSettings,
                                detectionMethods: { ...safeCustomSettings.detectionMethods, systemCheck: e.target.checked }
                            })}
                            className="mr-2"
                        />
                        信息系统和发票查验
                    </label>
                </div>
            </div>

            {/* 特别关注提示 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                    <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                        <h5 className="font-medium text-yellow-800 mb-1">检测重点提示</h5>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• 重点关注：无票支出、现金交易、关联交易定价、税收优惠滥用</li>
                            <li>• 高风险交易：存货异常、大额往来款、私户收款、频繁注销新设</li>
                            <li>• 确保检测的系统性、深入性和证据链完整性</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTemplateTab = () => (
        <div className="space-y-6">
            {/* 通用模板 - 新增 */}
            <div className="border rounded-lg p-4">
                <button
                    onClick={() => toggleSection('generalTemplate')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-blue-600" />
                        通用模板
                    </h4>
                    {expandedSections.generalTemplate ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>

                {expandedSections.generalTemplate && (
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">选择检测模式</label>
                            <div className="space-y-3">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="generalTemplate"
                                        value="loose"
                                        checked={safeCustomSettings.generalTemplate === 'loose'}
                                        onChange={(e) => setCustomSettings({ ...safeCustomSettings, generalTemplate: e.target.value })}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="font-medium text-gray-900">宽松模式</span>
                                        <p className="text-sm text-gray-600">仅检测重大风险和明显违规，适合税务合规程度较高的企业</p>
                                    </div>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="generalTemplate"
                                        value="standard"
                                        checked={safeCustomSettings.generalTemplate === 'standard'}
                                        onChange={(e) => setCustomSettings({ ...safeCustomSettings, generalTemplate: e.target.value })}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="font-medium text-gray-900">标准模式</span>
                                        <p className="text-sm text-gray-600">平衡检测覆盖面和误报率，适合大多数企业的日常自查</p>
                                    </div>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="generalTemplate"
                                        value="strict"
                                        checked={safeCustomSettings.generalTemplate === 'strict'}
                                        onChange={(e) => setCustomSettings({ ...safeCustomSettings, generalTemplate: e.target.value })}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="font-medium text-gray-900">严格模式</span>
                                        <p className="text-sm text-gray-600">检测所有潜在风险和异常，适合高风险行业或重要检查前的全面自查</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                                <div>
                                    <h5 className="font-medium text-blue-800 mb-1">模板说明</h5>
                                    <p className="text-sm text-blue-700">
                                        通用模板适合不确定具体行业特征或希望快速开始检测的企业。
                                        系统将根据您选择的模式自动配置检测参数和风险阈值。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 行业模板选择 */}
            <div className="border rounded-lg p-4">
                <button
                    onClick={() => toggleSection('industryTemplate')}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-green-600" />
                        行业模板
                    </h4>
                    {expandedSections.industryTemplate ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>

                {expandedSections.industryTemplate && (
                    <div className="mt-4 space-y-4">
                        {Object.entries(industryData).map(([industryKey, industryInfo]) => (
                            <div key={industryKey} className="border border-gray-200 rounded-lg p-3">
                                <h5 className="font-medium text-gray-800 mb-3">{industryInfo.name}</h5>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(industryInfo.subIndustries).map(([subKey, subName]) => (
                                        <label key={subKey} className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                checked={safeCustomSettings.industryTemplate?.[industryKey]?.[subKey] || false}
                                                onChange={(e) => updateIndustrySelection(industryKey, subKey, e.target.checked)}
                                                className="mr-2"
                                            />
                                            {subName}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 行业专属风险提示 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                        <h5 className="font-medium text-blue-800 mb-2">行业专属检测指标示例</h5>
                        <div className="text-sm text-blue-700 space-y-2">
                            <div>
                                <span className="font-medium">制造业：</span>
                                委托加工物料损耗率（如纺织行业±3%阈值）
                            </div>
                            <div>
                                <span className="font-medium">批发零售：</span>
                                跨境零售进口（BC直邮）行邮税漏报
                            </div>
                            <div>
                                <span className="font-medium">房地产：</span>
                                土地增值税清算单位划分（按业态/分期）
                            </div>
                            <div>
                                <span className="font-medium">TMT行业：</span>
                                虚拟道具收入确认时点（充值/消耗/过期）
                            </div>
                            <div>
                                <span className="font-medium">建筑业：</span>
                                甲供工程简易计税备案时效（开工前未备案）
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 组合效应说明 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-gray-800 mb-2">模板组合效应</h5>
                <p className="text-sm text-gray-600">
                    40行业子类 × 2^8特征组合 = 理论10240种变体，实际通过智能引擎动态配置。
                    系统将根据您选择的企业特征和行业模板，自动生成个性化的税务风险检测方案。
                </p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-blue-600" />
                        自定义税务风险检测设置
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* 标签页导航 */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        <button
                            onClick={() => setActiveTab('template')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'template'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            模板选择
                        </button>
                        <button
                            onClick={() => setActiveTab('detection')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'detection'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            高级自定义
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'template' && renderTemplateTab()}
                    {activeTab === 'detection' && renderDetectionTab()}
                </div>

                <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        取消
                    </button>
                    <button
                        onClick={onStartDetection}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                        <Play className="h-4 w-4 mr-2" />
                        开始检测
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomDetectionModal;