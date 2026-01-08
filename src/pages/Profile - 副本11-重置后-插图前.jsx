import React from 'react';
import { Building, BarChart3, Award, Users, GitBranch, Shield, TrendingUp, FileText, Globe, Calculator, Receipt, Truck, Target, PieChart, Briefcase, Factory, Database, AlertTriangle, CheckCircle } from 'lucide-react';

const Profile = () => {
    // 评价标签组件
    const EvalLabel = ({ text, type = 'positive' }) => {
        const colorMap = {
            positive: 'bg-green-100 text-green-600',
            growth: 'bg-green-100 text-green-600',
            neutral: 'bg-blue-100 text-blue-600',
            warning: 'bg-yellow-100 text-yellow-600',
            negative: 'bg-red-100 text-red-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600'
        };
        return <span className={`ml-1 px-1.5 py-0.5 rounded text-xs font-medium ${colorMap[type]}`}>{text}</span>;
    };

    // 二级模块标题组件（保留）
    const SectionTitle = ({ name, color }) => {
        const colorMap = { green: 'bg-green-500', purple: 'bg-purple-500', orange: 'bg-orange-500', blue: 'bg-blue-500', cyan: 'bg-cyan-500' };
        return (
            <div className="flex items-center mb-2 pb-1 border-b">
                <span className={`w-2 h-2 rounded-full ${colorMap[color]} mr-1.5`}></span>
                <span className="text-sm font-medium text-gray-700">{name}</span>
            </div>
        );
    };

    // 紧凑单行指标组件
    const CompactMetric = ({ label, value, eval: evalInfo, bgColor = 'bg-gray-50' }) => (
        <div className={`flex items-center justify-between px-2 py-1.5 ${bgColor} rounded text-sm`}>
            <span className="text-gray-600">{label}</span>
            <span className="font-medium text-gray-900">{value}{evalInfo && <EvalLabel text={evalInfo.text} type={evalInfo.type} />}</span>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-4">
            {/* 页面标题 */}
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">企业画像</h1>
                <p className="text-gray-600 mt-1">大华科技有限公司</p>
            </div>

            {/* 一、企业身份画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Building className="h-5 w-5 mr-2 text-blue-600" />一、企业身份画像
                </h3>

                {/* 基本工商信息 */}
                <div className="mb-3">
                    <SectionTitle name="基本工商信息" color="green" />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
                        <CompactMetric label="统一社会信用代码" value="91110000MA001234XY" />
                        <CompactMetric label="企业名称" value="大华科技有限公司" />
                        <CompactMetric label="企业类型" value="有限责任公司" />
                        <CompactMetric label="法定代表人" value="张明" />
                        <CompactMetric label="成立日期" value="2018-05-15" />
                        <CompactMetric label="经营状态" value="存续" eval={{ text: '正常', type: 'positive' }} />
                        <CompactMetric label="注册地址" value="北京市海淀区中关村软件园" />
                        <CompactMetric label="经营范围" value="软件开发、技术咨询、系统集成" />
                    </div>
                </div>

                {/* 规模特征 + 行业定位 + 资质认证 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                        <SectionTitle name="规模特征" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="注册资本" value="1000万元" eval={{ text: '充足', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="实缴资本" value="800万元" eval={{ text: '80%', type: 'neutral' }} bgColor="bg-purple-50" />
                            <CompactMetric label="资产总额" value="5280万元" bgColor="bg-purple-50" />
                            <CompactMetric label="年营业收入" value="3800万元" eval={{ text: '+15.2%', type: 'growth' }} bgColor="bg-purple-50" />
                            <CompactMetric label="员工人数" value="156人" bgColor="bg-purple-50" />
                            <CompactMetric label="企业规模等级" value="中型企业" eval={{ text: '稳健', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="行业定位" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="所属行业" value="软件和信息技术服务业" bgColor="bg-orange-50" />
                            <CompactMetric label="行业分类代码" value="I65" bgColor="bg-orange-50" />
                            <CompactMetric label="产业链位置" value="中游" eval={{ text: '核心环节', type: 'positive' }} bgColor="bg-orange-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="资质认证" color="blue" />
                        <div className="space-y-1">
                            <CompactMetric label="高新技术企业认定" value="有效" eval={{ text: '至2026-11', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="软件企业认定" value="有效" eval={{ text: '至2027-03', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="专精特新企业认定" value="市级" eval={{ text: '至2025-12', type: 'neutral' }} bgColor="bg-blue-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 二、股权与治理画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <GitBranch className="h-5 w-5 mr-2 text-blue-600" />二、股权与治理画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* 股权架构图 */}
                    <div className="lg:col-span-2">
                        <SectionTitle name="股权架构" color="purple" />
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="inline-block p-3 bg-blue-600 text-white rounded-lg mb-2">
                                <p className="font-medium">大华控股集团</p>
                                <p className="text-sm text-blue-200">控股65%</p>
                            </div>
                            <div className="h-6 w-px bg-gray-400 mx-auto"></div>
                            <div className="inline-block p-3 bg-green-600 text-white rounded-lg my-2">
                                <p className="font-medium">大华科技有限公司</p>
                                <p className="text-sm text-green-200">本企业</p>
                            </div>
                            <div className="flex justify-center gap-8 mt-2">
                                <div className="text-center">
                                    <div className="h-4 w-px bg-gray-400 mx-auto"></div>
                                    <div className="p-2 bg-purple-100 rounded text-xs">大华软件技术公司 100%</div>
                                </div>
                                <div className="text-center">
                                    <div className="h-4 w-px bg-gray-400 mx-auto"></div>
                                    <div className="p-2 bg-purple-100 rounded text-xs">大华信息服务公司 60%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 股权数据 */}
                    <div>
                        <SectionTitle name="股权结构" color="green" />
                        <div className="space-y-1 mb-3">
                            <CompactMetric label="股东总数" value="3个" />
                            <CompactMetric label="最大股东名称" value="大华控股集团" />
                            <CompactMetric label="最大股东持股比例" value="65%" eval={{ text: '控股', type: 'purple' }} />
                            <CompactMetric label="实际控制人" value="大华控股集团" />
                        </div>
                        <div className="space-y-1 mb-3">
                            <CompactMetric label="全资子公司数量" value="1家" bgColor="bg-purple-50" />
                            <CompactMetric label="控股子公司数量" value="2家" bgColor="bg-purple-50" />
                            <CompactMetric label="参股公司数量" value="1家" bgColor="bg-purple-50" />
                            <CompactMetric label="关联企业数量" value="4家" bgColor="bg-purple-50" />
                        </div>
                        <SectionTitle name="公司治理" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="财务报告审计意见" value="标准无保留意见" eval={{ text: '良好', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="内部控制审计意见" value="无重大缺陷" eval={{ text: '规范', type: 'positive' }} bgColor="bg-orange-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 三、组织与人力画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />三、组织与人力画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <SectionTitle name="人员结构" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="员工总数" value="156人" eval={{ text: '中型', type: 'neutral' }} />
                            <CompactMetric label="研发人员数量" value="78人" />
                            <CompactMetric label="研发人员占比" value="50%" eval={{ text: '高', type: 'positive' }} />
                            <CompactMetric label="本科及以上学历占比" value="72%" eval={{ text: '优秀', type: 'positive' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="薪酬成本" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="年度工资总额" value="1890万元" bgColor="bg-purple-50" />
                            <CompactMetric label="人均年薪" value="12.1万元" eval={{ text: '行业中上', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="社保覆盖率" value="100%" eval={{ text: '合规', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 四、财务画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />四、财务画像
                </h3>

                {/* 第一行：资产、负债、权益 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                        <SectionTitle name="资产结构" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="资产总额" value="5280万" eval={{ text: '+18.5%', type: 'growth' }} bgColor="bg-green-50" />
                            <CompactMetric label="流动资产" value="3850万" eval={{ text: '72.9%', type: 'neutral' }} bgColor="bg-green-50" />
                            <CompactMetric label="货币资金" value="1280万" eval={{ text: '充足', type: 'positive' }} bgColor="bg-green-50" />
                            <CompactMetric label="应收账款净额" value="1450万" eval={{ text: '合理', type: 'neutral' }} bgColor="bg-green-50" />
                            <CompactMetric label="存货净额" value="680万" bgColor="bg-green-50" />
                            <CompactMetric label="固定资产净额" value="980万" bgColor="bg-green-50" />
                            <CompactMetric label="无形资产净额" value="320万" bgColor="bg-green-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="负债结构" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="负债总额" value="3618万" eval={{ text: '68.5%', type: 'neutral' }} bgColor="bg-purple-50" />
                            <CompactMetric label="流动负债" value="3080万" eval={{ text: '85.1%', type: 'neutral' }} bgColor="bg-purple-50" />
                            <CompactMetric label="短期借款" value="800万" bgColor="bg-purple-50" />
                            <CompactMetric label="长期借款" value="500万" bgColor="bg-purple-50" />
                            <CompactMetric label="应付账款" value="1280万" bgColor="bg-purple-50" />
                            <CompactMetric label="预收账款/合同负债" value="420万" bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="所有者权益" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="所有者权益合计" value="1662万" eval={{ text: '稳健', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="实收资本/股本" value="800万" bgColor="bg-orange-50" />
                            <CompactMetric label="未分配利润" value="685万" eval={{ text: '良好', type: 'positive' }} bgColor="bg-orange-50" />
                        </div>
                    </div>
                </div>

                {/* 第二行：盈利、偿债、运营、成长 */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                        <SectionTitle name="盈利能力" color="cyan" />
                        <div className="space-y-1">
                            <CompactMetric label="营业收入" value="3800万" eval={{ text: '+15.2%', type: 'growth' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="营业成本" value="2573万" bgColor="bg-cyan-50" />
                            <CompactMetric label="毛利率" value="32.3%" eval={{ text: '强', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="营业利润" value="380万" eval={{ text: '10%', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="营业利润率" value="10%" eval={{ text: '优', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="净利润" value="292万" eval={{ text: '+22.8%', type: 'growth' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="净利率" value="7.7%" eval={{ text: '良好', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="总资产收益率(ROA)" value="5.8%" eval={{ text: '良好', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="净资产收益率(ROE)" value="15.4%" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-cyan-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="偿债能力" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="资产负债率" value="68.5%" eval={{ text: '稳健', type: 'neutral' }} bgColor="bg-green-50" />
                            <CompactMetric label="流动比率" value="1.25" eval={{ text: '良好', type: 'positive' }} bgColor="bg-green-50" />
                            <CompactMetric label="速动比率" value="0.95" eval={{ text: '合格', type: 'neutral' }} bgColor="bg-green-50" />
                            <CompactMetric label="利息保障倍数" value="2.8倍" eval={{ text: '安全', type: 'positive' }} bgColor="bg-green-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="运营效率" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="总资产周转率" value="0.76次/年" eval={{ text: '良好', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="应收账款周转率" value="8.1次/年" eval={{ text: '高效', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="应收账款周转天数" value="45天" eval={{ text: '正常', type: 'neutral' }} bgColor="bg-purple-50" />
                            <CompactMetric label="存货周转率" value="9.6次/年" bgColor="bg-purple-50" />
                            <CompactMetric label="存货周转天数" value="38天" eval={{ text: '合理', type: 'neutral' }} bgColor="bg-purple-50" />
                            <CompactMetric label="应付账款周转率" value="6.5次/年" bgColor="bg-purple-50" />
                            <CompactMetric label="应付账款周转天数" value="56天" bgColor="bg-purple-50" />
                            <CompactMetric label="现金周期" value="27天" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="成长能力" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="营业收入增长率" value="15.2%" eval={{ text: '强劲', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="净利润增长率" value="22.8%" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="总资产增长率" value="18.5%" eval={{ text: '稳健', type: 'positive' }} bgColor="bg-orange-50" />
                        </div>
                    </div>
                </div>

                {/* 第三行：成本费用、现金流 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <SectionTitle name="成本费用" color="cyan" />
                        <div className="grid grid-cols-2 gap-1">
                            <CompactMetric label="销售费用" value="312万" bgColor="bg-cyan-50" />
                            <CompactMetric label="销售费用率" value="8.2%" eval={{ text: '良好', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="管理费用" value="486万" bgColor="bg-cyan-50" />
                            <CompactMetric label="管理费用率" value="12.8%" eval={{ text: '适中', type: 'neutral' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="研发费用" value="247万" bgColor="bg-cyan-50" />
                            <CompactMetric label="研发费用率" value="6.5%" eval={{ text: '重视', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="财务费用" value="85万" bgColor="bg-cyan-50" />
                            <CompactMetric label="期间费用率" value="29.7%" eval={{ text: '合理', type: 'neutral' }} bgColor="bg-cyan-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="现金流量" color="blue" />
                        <div className="space-y-1">
                            <CompactMetric label="经营活动现金流净额" value="1250万" eval={{ text: '充足', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="投资活动现金流净额" value="-380万" eval={{ text: '扩张中', type: 'neutral' }} bgColor="bg-blue-50" />
                            <CompactMetric label="筹资活动现金流净额" value="-420万" eval={{ text: '还款中', type: 'neutral' }} bgColor="bg-blue-50" />
                            <CompactMetric label="销售收现比" value="95.8%" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="净利润现金含量" value="428%" eval={{ text: '极佳', type: 'positive' }} bgColor="bg-blue-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 五、业务运营画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-blue-600" />五、业务运营画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div>
                        <SectionTitle name="业务结构" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="主营业务收入" value="3610万" />
                            <CompactMetric label="主营业务收入占比" value="95%" eval={{ text: '聚焦', type: 'positive' }} />
                            <CompactMetric label="业务线数量" value="3条" />
                            <CompactMetric label="前三大业务集中度" value="88%" eval={{ text: '集中', type: 'neutral' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="客户管理" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="客户总数" value="126家" bgColor="bg-purple-50" />
                            <CompactMetric label="第一大客户占比" value="12%" eval={{ text: '分散', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="前五大客户占比" value="35%" eval={{ text: '健康', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="客户留存率" value="87%" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="一般纳税人客户占比" value="78%" eval={{ text: '高', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="供应商管理" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="供应商总数" value="85家" bgColor="bg-orange-50" />
                            <CompactMetric label="第一大供应商占比" value="15%" eval={{ text: '合理', type: 'neutral' }} bgColor="bg-orange-50" />
                            <CompactMetric label="前五大供应商占比" value="38%" eval={{ text: '稳定', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="一般纳税人供应商占比" value="72%" eval={{ text: '规范', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="小规模纳税人供应商占比" value="28%" bgColor="bg-orange-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="合同管理" color="cyan" />
                        <div className="space-y-1">
                            <CompactMetric label="年度签约合同总额" value="4280万" bgColor="bg-cyan-50" />
                            <CompactMetric label="年度合同数量" value="235个" bgColor="bg-cyan-50" />
                            <CompactMetric label="合同履约率" value="98%" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="技术合同金额" value="2850万" eval={{ text: '66.6%', type: 'positive' }} bgColor="bg-cyan-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="供应链效率" color="blue" />
                        <div className="space-y-1">
                            <CompactMetric label="库存金额" value="680万" bgColor="bg-blue-50" />
                            <CompactMetric label="采购周期" value="15天" eval={{ text: '快速', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="订单满足率" value="96%" eval={{ text: '良好', type: 'positive' }} bgColor="bg-blue-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 六、研发创新画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-blue-600" />六、研发创新画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                        <SectionTitle name="研发投入" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="研发投入总额" value="248万元" eval={{ text: '充足', type: 'positive' }} />
                            <CompactMetric label="研发费用资本化金额" value="35万元" />
                            <CompactMetric label="研发费用费用化金额" value="213万元" />
                            <CompactMetric label="研发投入强度" value="6.5%" eval={{ text: '高', type: 'positive' }} />
                            <CompactMetric label="研发人员占比" value="50%" eval={{ text: '优秀', type: 'positive' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="知识产权" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="专利总数" value="35项" eval={{ text: '丰富', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="发明专利数量" value="12项" eval={{ text: '领先', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="年度新增专利数" value="8项" eval={{ text: '活跃', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="软件著作权数量" value="25项" eval={{ text: '丰富', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="成果转化" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="高新技术产品收入" value="2964万元" bgColor="bg-orange-50" />
                            <CompactMetric label="高新技术产品收入占比" value="78%" eval={{ text: '高', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="技术转让收入" value="85万元" bgColor="bg-orange-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 七、税务画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-blue-600" />七、税务画像
                </h3>

                {/* 第一行：纳税人信息(5) + 其他税费(4) + 综合税负(4) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                        <SectionTitle name="纳税人信息" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="纳税人识别号" value="91110000MA001234XY" />
                            <CompactMetric label="增值税纳税人类型" value="一般纳税人" eval={{ text: '正常', type: 'positive' }} />
                            <CompactMetric label="企业所得税征收方式" value="查账征收" eval={{ text: '规范', type: 'positive' }} />
                            <CompactMetric label="主管税务机关" value="北京市海淀区税务局" />
                            <CompactMetric label="纳税信用等级" value="A级" eval={{ text: '优秀', type: 'positive' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="其他税费" color="cyan" />
                        <div className="space-y-1">
                            <CompactMetric label="印花税应纳税额" value="1.9万元" bgColor="bg-cyan-50" />
                            <CompactMetric label="城市维护建设税" value="9.66万元" bgColor="bg-cyan-50" />
                            <CompactMetric label="教育费附加" value="4.14万元" bgColor="bg-cyan-50" />
                            <CompactMetric label="个人所得税代扣代缴" value="142万元" bgColor="bg-cyan-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="综合税负" color="blue" />
                        <div className="space-y-1">
                            <CompactMetric label="年度纳税总额" value="350.45万元" bgColor="bg-blue-50" />
                            <CompactMetric label="综合税负率" value="9.22%" eval={{ text: '合理', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="行业平均税负率" value="9.8%" bgColor="bg-blue-50" />
                            <CompactMetric label="税负偏离度" value="-5.9%" eval={{ text: '正常', type: 'positive' }} bgColor="bg-blue-50" />
                        </div>
                    </div>
                </div>

                {/* 第二行：增值税(10) + 企业所得税(9) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                        <SectionTitle name="增值税" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="年销售额" value="3800万元" bgColor="bg-purple-50" />
                            <CompactMetric label="销项税额" value="426万元" bgColor="bg-purple-50" />
                            <CompactMetric label="进项税额" value="198万元" bgColor="bg-purple-50" />
                            <CompactMetric label="进项税额转出" value="0万元" bgColor="bg-purple-50" />
                            <CompactMetric label="增值税应纳税额" value="228万元" bgColor="bg-purple-50" />
                            <CompactMetric label="增值税实际缴纳额" value="138万元" bgColor="bg-purple-50" />
                            <CompactMetric label="增值税税负率" value="6%" eval={{ text: '行业正常', type: 'neutral' }} bgColor="bg-purple-50" />
                            <CompactMetric label="留抵税额" value="0万元" bgColor="bg-purple-50" />
                            <CompactMetric label="增值税免税销售额" value="0万元" bgColor="bg-purple-50" />
                            <CompactMetric label="软件产品增值税退税" value="90万元" eval={{ text: '享受', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="企业所得税" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="年应纳税所得额" value="365万元" bgColor="bg-orange-50" />
                            <CompactMetric label="适用税率" value="15%" eval={{ text: '高新优惠', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="应纳所得税额" value="54.75万元" bgColor="bg-orange-50" />
                            <CompactMetric label="减免所得税额" value="36.5万元" eval={{ text: '高新15%', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="实际缴纳所得税额" value="54.75万元" bgColor="bg-orange-50" />
                            <CompactMetric label="企业所得税税负率" value="1.44%" eval={{ text: '优惠后', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="企业所得税实际税率" value="15%" bgColor="bg-orange-50" />
                            <CompactMetric label="以前年度亏损余额" value="0万元" bgColor="bg-orange-50" />
                            <CompactMetric label="本年弥补亏损额" value="0万元" bgColor="bg-orange-50" />
                        </div>
                    </div>
                </div>

                {/* 第三行：发票管理(7) + 税收优惠(8) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <SectionTitle name="发票管理" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="专用发票开具金额" value="2964万元" bgColor="bg-green-50" />
                            <CompactMetric label="普通发票开具金额" value="836万元" bgColor="bg-green-50" />
                            <CompactMetric label="专票开具占比" value="78%" eval={{ text: '高', type: 'positive' }} bgColor="bg-green-50" />
                            <CompactMetric label="进项专票取得金额" value="1782万元" bgColor="bg-green-50" />
                            <CompactMetric label="进项抵扣率" value="90%" eval={{ text: '良好', type: 'positive' }} bgColor="bg-green-50" />
                            <CompactMetric label="作废发票数量" value="8张" eval={{ text: '正常', type: 'neutral' }} bgColor="bg-green-50" />
                            <CompactMetric label="红字发票金额" value="12万元" bgColor="bg-green-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="税收优惠" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="享受优惠政策数量" value="3项" eval={{ text: '充分利用', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="高新技术企业优惠" value="36.5万元" eval={{ text: '15%税率', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="研发费用加计扣除额" value="496万元" eval={{ text: '200%', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="软件企业优惠" value="90万元" eval={{ text: '即征即退', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="小微企业优惠" value="0万元" bgColor="bg-purple-50" />
                            <CompactMetric label="技术转让所得减免" value="0万元" bgColor="bg-purple-50" />
                            <CompactMetric label="年度税收优惠总额" value="126.5万元" eval={{ text: '显著', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="政策利用度" value="95%" eval={{ text: '充分', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 八、跨境业务画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-600" />八、跨境业务画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                        <SectionTitle name="跨境交易" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="境外收入总额" value="285万元" />
                            <CompactMetric label="境外收入占比" value="7.5%" eval={{ text: '少量', type: 'neutral' }} />
                            <CompactMetric label="出口销售额" value="285万元" />
                            <CompactMetric label="进口采购额" value="0万元" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="关联交易" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="关联交易总额" value="684万元" bgColor="bg-purple-50" />
                            <CompactMetric label="关联交易占比" value="18%" eval={{ text: '正常', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="关联销售金额" value="456万元" bgColor="bg-purple-50" />
                            <CompactMetric label="关联采购金额" value="228万元" bgColor="bg-purple-50" />
                            <CompactMetric label="关联交易定价方法" value="可比非受控价格法" eval={{ text: '合规', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="同期资料准备状态" value="是" eval={{ text: '完备', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="国际税收" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="适用税收协定" value="中美税收协定" bgColor="bg-orange-50" />
                            <CompactMetric label="境外已缴税款" value="14.25万元" bgColor="bg-orange-50" />
                            <CompactMetric label="境外税收抵免额" value="14.25万元" eval={{ text: '已抵免', type: 'positive' }} bgColor="bg-orange-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 九、合规风险画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />九、合规风险画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div>
                        <SectionTitle name="税务合规" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="纳税申报及时率" value="100%" eval={{ text: '优秀', type: 'positive' }} />
                            <CompactMetric label="税款缴纳及时率" value="100%" eval={{ text: '优秀', type: 'positive' }} />
                            <CompactMetric label="税务稽查次数" value="0次" eval={{ text: '良好', type: 'positive' }} />
                            <CompactMetric label="税务稽查补缴税款" value="0万元" />
                            <CompactMetric label="税务行政处罚次数" value="0次" eval={{ text: '良好', type: 'positive' }} />
                            <CompactMetric label="税务行政处罚金额" value="0万元" />
                            <CompactMetric label="税务风险等级" value="低" eval={{ text: '安全', type: 'positive' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="财务合规" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="财务报告审计意见" value="标准无保留" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="内控缺陷数量" value="0个" eval={{ text: '良好', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="会计核算规范性" value="优" eval={{ text: '规范', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="经营合规" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="环保处罚次数" value="0次" eval={{ text: '良好', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="安全生产事故次数" value="0次" eval={{ text: '良好', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="质量监管处罚次数" value="0次" eval={{ text: '良好', type: 'positive' }} bgColor="bg-orange-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="法律风险" color="cyan" />
                        <div className="space-y-1">
                            <CompactMetric label="涉诉案件数量" value="2件" eval={{ text: '较少', type: 'neutral' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="涉诉金额合计" value="85万元" eval={{ text: '可控', type: 'neutral' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="行政处罚次数" value="0次" eval={{ text: '良好', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="失信被执行信息" value="否" eval={{ text: '良好', type: 'positive' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="经营异常记录" value="0条" eval={{ text: '良好', type: 'positive' }} bgColor="bg-cyan-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="风险评估汇总" color="blue" />
                        <div className="space-y-1">
                            <CompactMetric label="流动性风险等级" value="低" eval={{ text: '安全', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="客户集中风险等级" value="低" eval={{ text: '分散', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="供应商依赖风险等级" value="中" eval={{ text: '可控', type: 'neutral' }} bgColor="bg-blue-50" />
                            <CompactMetric label="税务合规风险等级" value="低" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-blue-50" />
                            <CompactMetric label="综合风险评级" value="B级" eval={{ text: '良好', type: 'positive' }} bgColor="bg-blue-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 十、外部关系画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-blue-600" />十、外部关系画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <SectionTitle name="银行关系" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="合作银行数量" value="5家" />
                            <CompactMetric label="银行授信总额" value="2500万元" eval={{ text: '充足', type: 'positive' }} />
                            <CompactMetric label="银行贷款余额" value="1300万元" eval={{ text: '52%使用', type: 'neutral' }} />
                            <CompactMetric label="贷款加权平均利率" value="4.85%" eval={{ text: '优惠', type: 'positive' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="信用状况" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="人民银行征信评级" value="AA级" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="海关信用等级" value="一般信用企业" eval={{ text: '正常', type: 'neutral' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 十一、数字化画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-blue-600" />十一、数字化画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <SectionTitle name="系统覆盖" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="ERP系统覆盖率" value="95%" eval={{ text: '高', type: 'positive' }} />
                            <CompactMetric label="财务系统覆盖率" value="100%" eval={{ text: '全面', type: 'positive' }} />
                            <CompactMetric label="税务系统覆盖率" value="100%" eval={{ text: '全面', type: 'positive' }} />
                            <CompactMetric label="财务系统数据质量" value="优" eval={{ text: '高质量', type: 'positive' }} />
                            <CompactMetric label="税务系统数据质量" value="优" eval={{ text: '高质量', type: 'positive' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="数字化能力" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="系统集成度" value="高" eval={{ text: '互联互通', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="数据完整性" value="96%" eval={{ text: '优秀', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="流程自动化率" value="78%" eval={{ text: '良好', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 十二、ESG画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />十二、ESG画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                        <SectionTitle name="环境责任" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="环保投入占比" value="1.2%" eval={{ text: '积极', type: 'positive' }} />
                            <CompactMetric label="节能减排投资" value="45万元" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="社会责任" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="公益捐赠金额" value="15万元" eval={{ text: '积极', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="残疾人雇用比例" value="1.8%" eval={{ text: '达标', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="公司治理" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="信息披露透明度" value="高" eval={{ text: '规范', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="关联交易审批规范性" value="高" eval={{ text: '合规', type: 'positive' }} bgColor="bg-orange-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 十三、政策匹配画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-600" />十三、政策匹配画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div>
                        <SectionTitle name="资质条件" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="高新技术企业条件符合度" value="100%" eval={{ text: '符合', type: 'positive' }} />
                            <CompactMetric label="小微企业认定-应纳税所得额" value="不符合" eval={{ text: '超标', type: 'neutral' }} />
                            <CompactMetric label="小微企业认定-资产总额" value="不符合" eval={{ text: '超标', type: 'neutral' }} />
                            <CompactMetric label="小微企业认定-从业人数" value="符合" eval={{ text: '达标', type: 'positive' }} />
                            <CompactMetric label="软件企业认定条件符合度" value="100%" eval={{ text: '符合', type: 'positive' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="当前享受政策" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="高新技术企业15%税率" value="有效" eval={{ text: '至2026-11', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="软件产品增值税即征即退" value="享受中" eval={{ text: '90万/年', type: 'positive' }} bgColor="bg-purple-50" />
                            <CompactMetric label="研发费用加计扣除200%" value="享受中" eval={{ text: '496万', type: 'positive' }} bgColor="bg-purple-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="潜在可申请政策" color="orange" />
                        <div className="space-y-1">
                            <CompactMetric label="专精特新国家级认定" value="建议申请" eval={{ text: '高', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="预计年度效益" value="政策支持+信用加分" bgColor="bg-orange-50" />
                            <CompactMetric label="申请可行性" value="高" eval={{ text: '条件充分', type: 'positive' }} bgColor="bg-orange-50" />
                            <CompactMetric label="缺失条件" value="需提升创新能力指标" bgColor="bg-orange-50" />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="政策预警" color="cyan" />
                        <div className="space-y-1">
                            <CompactMetric label="高新技术企业资格" value="2026-11到期" eval={{ text: '提前6个月准备', type: 'warning' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="预警级别" value="中" eval={{ text: '需关注', type: 'warning' }} bgColor="bg-cyan-50" />
                            <CompactMetric label="影响政策" value="15%所得税优惠" bgColor="bg-cyan-50" />
                            <CompactMetric label="预计影响金额" value="36.5万/年" eval={{ text: '重大', type: 'warning' }} bgColor="bg-cyan-50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 十四、特殊业务画像 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Factory className="h-5 w-5 mr-2 text-blue-600" />十四、特殊业务画像
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <SectionTitle name="软件业务" color="green" />
                        <div className="space-y-1">
                            <CompactMetric label="软件产品销售收入" value="2280万元" />
                            <CompactMetric label="软件产品收入占比" value="60%" eval={{ text: '主营', type: 'positive' }} />
                            <CompactMetric label="软件产品增值率" value="35%" eval={{ text: '超标准', type: 'positive' }} />
                            <CompactMetric label="软件退税金额" value="90万元" eval={{ text: '已享受', type: 'positive' }} />
                        </div>
                    </div>
                    <div>
                        <SectionTitle name="集成电路业务" color="purple" />
                        <div className="space-y-1">
                            <CompactMetric label="集成电路业务收入" value="0万元" bgColor="bg-purple-50" />
                            <CompactMetric label="集成电路收入占比" value="0%" bgColor="bg-purple-50" />
                            <CompactMetric label="集成电路企业认定类型" value="未认定" bgColor="bg-purple-50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
