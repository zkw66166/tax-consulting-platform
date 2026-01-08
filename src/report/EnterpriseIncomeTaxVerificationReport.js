// src/report/EnterpriseIncomeTaxVerificationReport.js

export const getEnterpriseIncomeTaxReportData = () => {
    return {
        title: '北京创新科技有限公司企业所得税年度纳税申报鉴证报告书',
        subtitle: '（汇算清缴）',
        client: '北京创新科技有限公司',
        taxYear: '2023年度',
        createDate: '2024年3月15日',
        author: '张建华',
        reviewer: '李明德',
        businessAgreementNo: 'YWYD-2024-BJ-056',
        auditReportNo: 'ZCSW-2024-BJ-098',
        summary: {
            profitTotal: '8200万元',
            taxAdjustmentIncrease: '1350万元',
            taxAdjustmentDecrease: '2180万元',
            foreignTaxableIncomeOffset: '0万元',
            adjustedIncome: '7370万元',
            priorYearLossOffset: '0万元',
            taxableIncome: '7370万元',
            applicableTaxRate: '15%',
            incomeTaxPayable: '1105.5万元',
            taxReduction: '736万元',
            taxCredit: '0万元',
            actualTaxPayable: '369.5万元',
            foreignIncomeTax: '0万元',
            foreignTaxCredit: '0万元',
            actualIncomeTaxPayable: '369.5万元',
            cumulativePrepaidTax: '385万元',
            taxRefundOrPayment: '-15.5万元'
        },
        auditFirm: {
            name: '中诚税务师事务所有限公司',
            phone: '010-88776655',
            address: '北京市朝阳区建国门外大街甲6号SK大厦28层'
        },
        companyInfo: {
            taxRegistrationNo: '91110105MA01234567',
            legalRepresentative: '王志强',
            taxOptimization: '高新技术企业减按15%的税率征收企业所得税',
            accountingStandards: '企业会计准则（2006年版）及其相关规定',
            accountingPeriod: '自公历1月1日起至12月31日止',
            accountingBasis: '以权责发生制为记账基础，以历史成本为计价原则',
            baseCurrency: '人民币',
            inventoryMethod: '先进先出法',
            investmentMethod: '成本法和权益法',
            depreciationMethod: '直线法',
            intangibleAssetMethod: '直线法'
        },
        adjustmentDetails: {
            revenue: {
                deemedSales: {
                    donation: '80万元',
                    debtPayment: '0万元',
                    sponsorship: '25万元',
                    fundraising: '0万元',
                    advertising: '35万元',
                    samples: '15万元',
                    employeeBenefits: '120万元',
                    profitDistribution: '0万元',
                    entertainment: '30万元',
                    others: '45万元'
                },
                donationReceived: {
                    monetary: '50万元',
                    inventory: '30万元',
                    fixedAssets: '0万元',
                    intangibleAssets: '0万元'
                }
            },
            expenses: {
                deemedSalesCost: {
                    donation: '28万元',
                    debtPayment: '0万元',
                    sponsorship: '8万元',
                    fundraising: '0万元',
                    advertising: '12万元',
                    samples: '5万元',
                    employeeBenefits: '42万元',
                    profitDistribution: '0万元',
                    entertainment: '10万元',
                    others: '15万元'
                },
                businessEntertainment: {
                    accountedAmount: '280万元',
                    actualAmount60Percent: '168万元',
                    salesRevenue: '52000万元',
                    deductionLimit: '260万元',
                    taxAmount: '168万元',
                    adjustmentIncrease: '112万元'
                },
                additionalDeduction: {
                    rdExpenses: '1800万元',
                    disabledEmployeeWages: '85万元',
                    otherEmployeeWages: '95万元',
                    others: '200万元',
                    backupNo: '2023-R&D-BJ-001'
                }
            }
        },
        priorYearLoss: {
            year2019: { amount: '0万元', carryForward: '0万元' },
            year2020: { amount: '0万元', carryForward: '0万元' },
            year2021: { amount: '0万元', carryForward: '0万元' },
            year2022: { amount: '0万元', carryForward: '0万元' },
            year2023: { amount: '0万元', carryForward: '0万元' }
        },
        quarterlyPrepayments: {
            q1: '95万元',
            q2: '98万元',
            q3: '92万元',
            q4: '100万元'
        }
    };
};

export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif; 
            line-height: 1.8; 
            margin: 0; 
            padding: 20px; 
            background: #f5f7fa;
            color: #333;
            font-size: 14px;
        }
        
        .report-container { 
            max-width: 900px; 
            margin: 0 auto; 
            background: white; 
            padding: 60px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        
        .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 30px; 
        }
        
        .title { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 15px; 
            color: #1e40af;
            letter-spacing: 1px;
        }
        
        .subtitle { 
            font-size: 16px; 
            color: #6b7280; 
            margin-bottom: 10px;
        }
        
        .report-header-info {
            text-align: left;
            margin-bottom: 20px;
            font-size: 14px;
        }
        
        .section { 
            margin-bottom: 25px; 
        }
        
        .section-title { 
            font-size: 16px; 
            font-weight: bold; 
            margin-bottom: 15px; 
            color: #1f2937; 
            border-left: 4px solid #3b82f6; 
            padding-left: 12px;
        }
        
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 14px;
        }
        
        .summary-table th {
            background: #f1f5f9;
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: center;
            font-weight: bold;
        }
        
        .summary-table td {
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: left;
        }
        
        .summary-table td:first-child {
            text-align: center;
            width: 8%;
        }
        
        .summary-table td:nth-child(2) {
            width: 52%;
        }
        
        .summary-table td:last-child {
            text-align: right;
            width: 40%;
        }
        
        .signature-section { 
            margin-top: 40px; 
            text-align: right;
            padding-top: 20px;
            border-top: 1px solid #d1d5db;
        }
        
        .signature-item {
            margin-bottom: 12px;
            font-size: 14px;
        }
        
        .print-controls { 
            position: fixed; 
            top: 20px; 
            right: 20px;
            display: flex;
            gap: 10px;
            z-index: 1000;
        }
        
        .btn {
            padding: 10px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        
        .btn-primary:hover {
            background: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .btn-secondary {
            background: #6b7280;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #4b5563;
            transform: translateY(-2px);
        }
        
        .page-break {
            page-break-before: always;
        }
        
        @media print { 
            .print-controls { display: none; } 
            body { background: white; padding: 0; } 
            .report-container { 
                box-shadow: none; 
                border-radius: 0;
                padding: 40px;
            }
        }
        
        .footer-info {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
        }
        
        .content-paragraph {
            margin-bottom: 15px;
            text-align: justify;
            line-height: 1.8;
        }
        
        .emphasize {
            font-weight: bold;
            color: #dc2626;
        }
        
        .appendix {
            margin-top: 40px;
            border-top: 2px solid #e5e7eb;
            padding-top: 30px;
        }
        
        .appendix-title {
            font-size: 20px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .explanation-section {
            margin-bottom: 30px;
        }
        
        .explanation-title {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 15px;
            border-left: 4px solid #3b82f6;
            padding-left: 12px;
        }
        
        .sub-title {
            font-size: 16px;
            font-weight: bold;
            color: #374151;
            margin: 20px 0 10px 0;
        }
        
        .highlight-box {
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 15px 0;
        }
        
        .list-item {
            margin-bottom: 8px;
            line-height: 1.6;
        }
        
        .indent-1 {
            margin-left: 20px;
        }
        
        .indent-2 {
            margin-left: 40px;
        }
    </style>
</head>
<body>
    <div class="print-controls">
        <button class="btn btn-primary" onclick="window.print()">
            🖨️ 打印报告
        </button>
        <button class="btn btn-secondary" onclick="window.close()">
            ✕ 关闭
        </button>
    </div>
    
    <div class="report-container">
        <div class="header">
            <div class="title">${reportData.title}</div>
            <div class="subtitle">${reportData.subtitle}</div>
        </div>

        <div class="report-header-info">
            <p>业务约定书备案号：${reportData.businessAgreementNo}</p>
            <p>事务所鉴证报告号：${reportData.auditReportNo}</p>
        </div>

        <div class="section">
            <p><strong>${reportData.client}：</strong></p>
            
            <div class="content-paragraph">
                我们接受委托，对被鉴证单位${reportData.taxYear}的企业所得税纳税申报事项进行鉴证，并出具鉴证报告。
            </div>
            
            <div class="content-paragraph">
                被鉴证单位的责任是，及时提供与企业所得税年度纳税申报事项有关的会计资料和纳税资料，并保证其真实、准确、完整和合法，确保被鉴证单位按照《中华人民共和国企业所得税法》及其实施条例、《中华人民共和国税收征收管理法》及其实施细则以及其他税收法律、法规、规范性文件，如实纳税申报企业所得税纳税申报表。
            </div>
            
            <div class="content-paragraph">
                我们的责任是，本着独立、客观、公正的原则，依据《中华人民共和国企业所得税法》及其实施条例、《中华人民共和国税收征收管理法》及其实施细则和有关规定，按照《注册税务师管理暂行办法》、《注册税务师涉税鉴证业务基本准则》和《企业所得税汇算清缴纳税申报鉴证业务准则》等执业规范要求，对被鉴证单位企业所得税年度纳税申报的真实性、准确性、完整性和合法性实施鉴证，并发表鉴证意见。
            </div>
            
            <div class="content-paragraph">
                在鉴证过程中，我们考虑了与企业所得税相关的鉴证材料的证据资格和证明能力，对被鉴证单位提供的会计资料及纳税资料等实施了审核、验证、计算和职业推断等必要的鉴证程序。我们相信，我们获取的鉴证证据是充分的、适当的，为发表鉴证意见提供了基础。现将鉴证结果报告如下：
            </div>
        </div>

        <div class="section">
            <div class="content-paragraph">
                经对被鉴证单位${reportData.taxYear}企业所得税年度纳税申报事项进行鉴证，我们认为，本报告后附的《企业所得税年度纳税申报表》已经按照《中华人民共和国企业所得税法》及其实施条例、《中华人民共和国税收征收管理法》及其实施细则以及其他税收法律法规的相关规定填报，在所有重大方面真实、准确、完整地反映了被鉴证单位本纳税年度的所得税纳税申报情况。部分数据摘录如下：
            </div>
        </div>

        <div class="section">
            <table class="summary-table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>项目</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>利润总额</td><td>${reportData.summary.profitTotal}</td></tr>
                    <tr><td>2</td><td>加：纳税调整增加额</td><td>${reportData.summary.taxAdjustmentIncrease}</td></tr>
                    <tr><td>3</td><td>减：纳税调整减少额</td><td>${reportData.summary.taxAdjustmentDecrease}</td></tr>
                    <tr><td>4</td><td>加：境外应税所得弥补境内亏损</td><td>${reportData.summary.foreignTaxableIncomeOffset}</td></tr>
                    <tr><td>5</td><td>纳税调整后所得</td><td>${reportData.summary.adjustedIncome}</td></tr>
                    <tr><td>6</td><td>减：弥补以前年度亏损</td><td>${reportData.summary.priorYearLossOffset}</td></tr>
                    <tr><td>7</td><td>应纳税所得额</td><td class="emphasize">${reportData.summary.taxableIncome}</td></tr>
                    <tr><td>8</td><td>适用税率</td><td>${reportData.summary.applicableTaxRate}</td></tr>
                    <tr><td>9</td><td>应纳所得税额</td><td>${reportData.summary.incomeTaxPayable}</td></tr>
                    <tr><td>10</td><td>减：减免所得税额</td><td>${reportData.summary.taxReduction}</td></tr>
                    <tr><td>11</td><td>减：抵免所得税额</td><td>${reportData.summary.taxCredit}</td></tr>
                    <tr><td>12</td><td>应纳税额</td><td>${reportData.summary.actualTaxPayable}</td></tr>
                    <tr><td>13</td><td>加：境外所得应纳所得税额</td><td>${reportData.summary.foreignIncomeTax}</td></tr>
                    <tr><td>14</td><td>减：境外所得抵免所得税额</td><td>${reportData.summary.foreignTaxCredit}</td></tr>
                    <tr><td>15</td><td>实际应纳所得税额</td><td class="emphasize">${reportData.summary.actualIncomeTaxPayable}</td></tr>
                    <tr><td>16</td><td>减：本年累计实际已预缴的所得税额</td><td>${reportData.summary.cumulativePrepaidTax}</td></tr>
                    <tr><td>17</td><td>本年应补（退）的所得税额</td><td class="emphasize">${reportData.summary.taxRefundOrPayment}</td></tr>
                </tbody>
            </table>
            
            <p style="margin-top: 15px; font-size: 12px;">
                <strong>注：</strong>具体纳税调整项目及说明详见附件《企业所得税年度纳税申报鉴证报告说明》。
            </p>
            
            <p style="margin-top: 10px; font-size: 12px;">
                <strong>提示：</strong>表内第1栏"利润总额"：事业单位填写"收支结余"，民间非营利组织填写"净资产变动额"。
            </p>
        </div>

        <div class="section">
            <div class="content-paragraph">
                本报告仅供被鉴证单位向主管税务机关办理企业所得税年度纳税申报时使用，不作其他用途。因使用不当造成的后果，与执行本鉴证业务的税务师事务所及其注册税务师无关。
            </div>
        </div>

        <div class="signature-section">
            <div class="signature-item">
                <strong>项目负责人：</strong>${reportData.author}（签名、盖章）
            </div>
            <div class="signature-item">
                <strong>所长：</strong>${reportData.reviewer}（签名、盖章）
            </div>
            <div class="signature-item">
                <strong>电话：</strong>${reportData.auditFirm.phone}
            </div>
            <div class="signature-item">
                <strong>地址：</strong>${reportData.auditFirm.address}
            </div>
            <div class="signature-item" style="margin-top: 20px;">
                <strong>${reportData.auditFirm.name}（盖章）</strong>
            </div>
            <div class="signature-item">
                <strong>日期：</strong>${reportData.createDate}
            </div>
        </div>

        <div class="section" style="margin-top: 40px;">
            <div class="section-title">附件：</div>
            <ol>
                <li>企业所得税年度纳税申报鉴证报告说明</li>
                <li>企业所得税纳税申报表</li>
                <li>企业基本情况表</li>
                <li>企业年度财务报表（企业资产负债表、利润表）</li>
                <li>房地产企业预售收入计算的预计利润披露表</li>
                <li>专项申报事项信息披露表（备案类）</li>
                <li>特别纳税调整应税所得信息披露表</li>
                <li>重大交易事项披露表</li>
                <li>税务师事务所执业证复印件</li>
            </ol>
        </div>

        <!-- 附件1：企业所得税年度纳税申报鉴证报告说明 -->
        <div class="page-break"></div>
        <div class="appendix">
            <div class="appendix-title">附件1. 企业所得税年度纳税申报鉴证报告说明</div>
            
            <div class="content-paragraph">
                我们接受委托，对被鉴证单位${reportData.taxYear}企业所得税汇算清缴事项进行了鉴证，现将鉴证情况说明如下：
            </div>

            <div class="explanation-section">
                <div class="explanation-title">第一部分 被鉴证单位基本情况说明</div>
                
                <div class="sub-title">一、被鉴证单位基本情况</div>
                <div class="content-paragraph">
                    被鉴证单位名称：${reportData.client}，税务登记号：${reportData.companyInfo.taxRegistrationNo}；法定代表人：${reportData.companyInfo.legalRepresentative}。
                </div>
                <div class="content-paragraph">
                    被鉴证单位享受的税收优惠政策：${reportData.taxYear}享受的税收优惠政策为${reportData.companyInfo.taxOptimization}。
                </div>

                <div class="sub-title">二、被鉴证单位的主要会计政策</div>
                <div class="content-paragraph">
                    <strong>（一）被鉴证单位执行的会计准则</strong><br>
                    ${reportData.companyInfo.accountingStandards}
                </div>
                <div class="content-paragraph">
                    <strong>（二）会计年度</strong><br>
                    ${reportData.companyInfo.accountingPeriod}
                </div>
                <div class="content-paragraph">
                    <strong>（三）记账基础和计价原则</strong><br>
                    ${reportData.companyInfo.accountingBasis}
                </div>
                <div class="content-paragraph">
                    <strong>（四）记账本位币</strong><br>
                    ${reportData.companyInfo.baseCurrency}
                </div>
                <div class="content-paragraph">
                    <strong>（五）会计核算方法：</strong><br>
                    1、存货核算方法：${reportData.companyInfo.inventoryMethod}<br>
                    2、长期投资核算方法：${reportData.companyInfo.investmentMethod}<br>
                    3、固定资产及折旧核算方法：${reportData.companyInfo.depreciationMethod}<br>
                    4、无形资产计价和摊销方法：${reportData.companyInfo.intangibleAssetMethod}
                </div>
            </div>

            <div class="explanation-section">
                <div class="explanation-title">第二部分 企业所得税鉴证事项说明</div>
                
                <div class="sub-title">一、应纳税所得额计算的鉴证</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}主表第25行"应纳税所得额"${reportData.summary.taxableIncome}，鉴证确认纳税调整增加额${reportData.summary.taxAdjustmentIncrease}，鉴证确认纳税调整减少额${reportData.summary.taxAdjustmentDecrease}，境外应税所得弥补境内亏损${reportData.summary.foreignTaxableIncomeOffset}，弥补以前年度亏损${reportData.summary.priorYearLossOffset}。具体纳税调整事项如下：
                </div>

                <div class="sub-title">（一）纳税调整增加、减少事项</div>
                
                <div class="content-paragraph">
                    <strong>1、收入类调整项目</strong>
                </div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}收入类调整项目鉴证确认纳税调整增加额430万元，鉴证确认纳税调整减少额0万元。具体调整数据如下：
                </div>

                <div class="highlight-box">
                    <strong>（1）视同销售收入</strong><br>
                    被鉴证单位${reportData.taxYear}发生下列货物、财产、劳务视同销售行为，财务上未做销售处理，根据《中华人民共和国企业所得税法实施条例》第二十五条及《关于企业处置资产所得税处理问题的通知》（国税函[2008]828号）文件的规定，鉴证确认视同销售收入350万元，鉴证确认纳税调整增加额350万元。具体数据如下：<br>
                    ①捐赠视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.donation}；<br>
                    ②偿债视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.debtPayment}；<br>
                    ③赞助视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.sponsorship}；<br>
                    ④集资视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.fundraising}；<br>
                    ⑤广告视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.advertising}；<br>
                    ⑥样品视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.samples}；<br>
                    ⑦职工福利视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.employeeBenefits}；<br>
                    ⑧利润分配视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.profitDistribution}；<br>
                    ⑨交际应酬视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.entertainment}；<br>
                    ⑩其他视同销售收入${reportData.adjustmentDetails.revenue.deemedSales.others}。
                </div>

                <div class="highlight-box">
                    <strong>（2）接受捐赠收入</strong><br>
                    被鉴证单位${reportData.taxYear}直接计入资本公积和除收益类外科目核算的接受捐赠收入金额80万元，根据《中华人民共和国企业所得税法实施条例》第二十一条和《国家税务总局关于企业取得财产转让等所得企业所得税处理问题的公告》国家税务总局公告2010年第19号第一条的规定，鉴证确认接受捐赠收入80万元，鉴证确认纳税调整增加额80万元。具体数据如下：<br>
                    ①货币性捐赠金额${reportData.adjustmentDetails.revenue.donationReceived.monetary}；<br>
                    ②存货类捐赠金额${reportData.adjustmentDetails.revenue.donationReceived.inventory}；<br>
                    ③固定资产捐赠金额${reportData.adjustmentDetails.revenue.donationReceived.fixedAssets}；<br>
                    ④无形资产捐赠金额${reportData.adjustmentDetails.revenue.donationReceived.intangibleAssets}。
                </div>

                <div class="content-paragraph">
                    <strong>2、扣除类调整项目</strong>
                </div>
                <div class="content-paragraph">
                    被鉴证单位${reportData.taxYear}扣除类调整项目鉴证确认纳税调整增加额920万元，鉴证确认纳税调整减少额2180万元。具体调整数据如下：
                </div>

                <div class="highlight-box">
                    <strong>（1）视同销售成本的鉴证</strong><br>
                    被鉴证单位${reportData.taxYear}发生下列货物、财产、劳务视同销售行为，根据《关于企业处置资产所得税处理问题的通知》（国税函[2008]828号）第二条的规定，鉴证确认视同销售成本120万元，鉴证确认纳税调整减少额120万元。具体数据如下：<br>
                    ①捐赠视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.donation}；<br>
                    ②偿债视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.debtPayment}；<br>
                    ③赞助视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.sponsorship}；<br>
                    ④集资视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.fundraising}；<br>
                    ⑤广告视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.advertising}；<br>
                    ⑥样品视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.samples}；<br>
                    ⑦职工福利视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.employeeBenefits}；<br>
                    ⑧利润分配视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.profitDistribution}；<br>
                    ⑨交际应酬视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.entertainment}；<br>
                    ⑩其他视同销售成本${reportData.adjustmentDetails.expenses.deemedSalesCost.others}。
                </div>

                <div class="highlight-box">
                    <strong>（2）业务招待费支出的鉴证</strong><br>
                    被鉴证单位${reportData.taxYear}的业务招待费账载金额${reportData.adjustmentDetails.expenses.businessEntertainment.accountedAmount}，实际发生额60％的金额${reportData.adjustmentDetails.expenses.businessEntertainment.actualAmount60Percent}。根据《中华人民共和国企业所得税法实施条例》第四十三条的规定，按本期鉴证后销售（营业）收入${reportData.adjustmentDetails.expenses.businessEntertainment.salesRevenue}的5‰计算的扣除限额${reportData.adjustmentDetails.expenses.businessEntertainment.deductionLimit}，鉴证确认税收金额${reportData.adjustmentDetails.expenses.businessEntertainment.taxAmount}，鉴证确认纳税调整增加额${reportData.adjustmentDetails.expenses.businessEntertainment.adjustmentIncrease}。
                </div>

                <div class="highlight-box">
                    <strong>（3）加计扣除的鉴证</strong><br>
                    被鉴证单位${reportData.taxYear}账载加计扣除金额2180万元，根据《中华人民共和国企业所得税法》第三十条及《中华人民共和国企业所得税法实施条例》第九十五条的规定，并取得的税务机关企业所得税备案登记书（备案号：${reportData.adjustmentDetails.expenses.additionalDeduction.backupNo}），鉴证确认加计扣除额税收金额2180万元，鉴证确认纳税调整减少额2180万元。具体数据如下：<br>
                    ①开发新技术、新产品、新工艺发生的研究开发费用${reportData.adjustmentDetails.expenses.additionalDeduction.rdExpenses}；<br>
                    ②安置残疾人员所支付的工资${reportData.adjustmentDetails.expenses.additionalDeduction.disabledEmployeeWages}；<br>
                    ③国家鼓励安置的其他就业人员支付的工资${reportData.adjustmentDetails.expenses.additionalDeduction.otherEmployeeWages}；<br>
                    ④其他${reportData.adjustmentDetails.expenses.additionalDeduction.others}。
                </div>

                <div class="highlight-box">
                    <strong>（4）其他调整事项</strong><br>
                    ①罚金、罚款和被没收财物的损失：根据《中华人民共和国企业所得税法》第十条的规定，账载金额35万元，鉴证确认不得扣除金额35万元，纳税调整增加额35万元。<br>
                    ②税收滞纳金：根据《中华人民共和国企业所得税法》第十条的规定，账载金额12万元，鉴证确认不得扣除金额12万元，纳税调整增加额12万元。<br>
                    ③超标准广告费：根据《企业所得税法实施条例》第四十四条规定，超标准部分58万元，纳税调整增加额58万元。<br>
                    ④职工福利费超标部分：根据《企业所得税法实施条例》第四十条规定，超标准部分45万元，纳税调整增加额45万元。<br>
                    ⑤工会经费超标部分：根据《企业所得税法实施条例》第四十一条规定，超标准部分15万元，纳税调整增加额15万元。<br>
                    ⑥捐赠支出超标部分：根据《企业所得税法》第九条及实施条例第五十二条规定，超过利润总额12%部分685万元，纳税调整增加额685万元。<br>
                    ⑦不征税收入：根据《财政部、国家税务总局关于专项用途财政性资金企业所得税处理问题的通知》（财税[2011]70号）规定，确认不征税收入120万元，纳税调整减少额120万元。
                </div>

                <div class="sub-title">（二）境外应税所得弥补境内亏损</div>
                <div class="content-paragraph">
                    未发现被鉴证单位${reportData.taxYear}来源于中国境外的应税所得用于弥补境内亏损的行为。
                </div>

                <div class="sub-title">（三）弥补以前年度亏损</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}实际弥补的以前年度亏损额${reportData.summary.priorYearLossOffset}，可结转以后年度弥补的亏损额合计0万元。具体数据如下：
                </div>
                <div class="content-paragraph">
                    1、2019年度：本年度实际弥补亏损金额${reportData.priorYearLoss.year2019.amount}，可结转以后年度弥补的亏损额${reportData.priorYearLoss.year2019.carryForward}；<br>
                    2、2020年度：本年度实际弥补亏损金额${reportData.priorYearLoss.year2020.amount}，可结转以后年度弥补的亏损额${reportData.priorYearLoss.year2020.carryForward}；<br>
                    3、2021年度：本年度实际弥补亏损金额${reportData.priorYearLoss.year2021.amount}，可结转以后年度弥补的亏损额${reportData.priorYearLoss.year2021.carryForward}；<br>
                    4、2022年度：本年度实际弥补亏损金额${reportData.priorYearLoss.year2022.amount}，可结转以后年度弥补的亏损额${reportData.priorYearLoss.year2022.carryForward}；<br>
                    5、本年：本年度实际弥补以前年度亏损合计${reportData.summary.priorYearLossOffset}，可结转以后年度弥补的亏损额0万元。
                </div>

                <div class="sub-title">（四）应纳税所得额</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}应纳税所得额${reportData.summary.taxableIncome}，计算过程如下：利润总额${reportData.summary.profitTotal}+纳税调整增加额${reportData.summary.taxAdjustmentIncrease}-纳税调整减少额${reportData.summary.taxAdjustmentDecrease}+境外应税所得弥补境内亏损${reportData.summary.foreignTaxableIncomeOffset}-弥补以前年度亏损${reportData.summary.priorYearLossOffset}=${reportData.summary.taxableIncome}。
                </div>

                <div class="sub-title">二、应纳所得税额计算的鉴证</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}应补（退）的所得税额${reportData.summary.taxRefundOrPayment}。具体计算过程如下：
                </div>

                <div class="sub-title">（一）税率</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}适用的税率为${reportData.summary.applicableTaxRate}（享受高新技术企业优惠税率）。
                </div>

                <div class="sub-title">（二）应纳所得税额</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}应纳所得税额${reportData.summary.incomeTaxPayable}，计算过程如下：应纳税所得额${reportData.summary.taxableIncome}×${reportData.summary.applicableTaxRate}=${reportData.summary.incomeTaxPayable}。
                </div>

                <div class="sub-title">（三）减免所得税额</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}发生减免税合计${reportData.summary.taxReduction}。具体数据如下：<br>
                    1、符合条件的小型微利企业：0万元；<br>
                    2、国家需要重点扶持的高新技术企业：${reportData.summary.taxReduction}；<br>
                    3、民族自治地方的企业应缴纳的企业所得税中属于地方分享的部分：0万元；<br>
                    4、过渡期税收优惠：0万元；<br>
                    5、其他：0万元。
                </div>

                <div class="sub-title">（四）抵免所得税额</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}发生抵免所得税额合计${reportData.summary.taxCredit}。
                </div>

                <div class="sub-title">（五）应纳税额</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}应纳税额${reportData.summary.actualTaxPayable}，计算过程如下：应纳所得税额${reportData.summary.incomeTaxPayable}－减免所得税额${reportData.summary.taxReduction}－抵免所得税额${reportData.summary.taxCredit}=${reportData.summary.actualTaxPayable}。
                </div>

                <div class="sub-title">（六）实际应纳所得税额</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}实际应纳所得税额${reportData.summary.actualIncomeTaxPayable}，计算过程如下：应纳税额${reportData.summary.actualTaxPayable}+境外所得应纳所得税额${reportData.summary.foreignIncomeTax}－境外所得抵免所得税额${reportData.summary.foreignTaxCredit}=${reportData.summary.actualIncomeTaxPayable}。
                </div>

                <div class="sub-title">（七）本年累计实际已预缴的所得税额</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}累计实际已预缴的所得税额${reportData.summary.cumulativePrepaidTax}。具体数据如下：<br>
                    第一季度：${reportData.quarterlyPrepayments.q1}；<br>
                    第二季度：${reportData.quarterlyPrepayments.q2}；<br>
                    第三季度：${reportData.quarterlyPrepayments.q3}；<br>
                    第四季度：${reportData.quarterlyPrepayments.q4}。
                </div>

                <div class="sub-title">（八）本年应补（退）的所得税额</div>
                <div class="content-paragraph">
                    经鉴证，被鉴证单位${reportData.taxYear}应补（退）的所得税额${reportData.summary.taxRefundOrPayment}。计算过程如下：<br>
                    实际应纳所得税额${reportData.summary.actualIncomeTaxPayable}－本年累计实际已预缴的所得税额${reportData.summary.cumulativePrepaidTax}=${reportData.summary.taxRefundOrPayment}。
                </div>

                <div class="sub-title">三、附列资料</div>
                <div class="content-paragraph">
                    （一）以前年度多缴的所得税额在本年抵减额：0万元<br>
                    （二）以前年度应缴未缴在本年入库所得税额：0万元
                </div>

                <div class="sub-title">四、备案事项情况说明</div>
                <div class="content-paragraph">
                    企业所得税年度备案事项包括：资产损失专项申报、税收优惠项目、企业重组特殊税务处理、特别纳税调整事项。被鉴证单位${reportData.taxYear}享受高新技术企业税收优惠（备案号：2023-GX-BJ-001），已按规定办理备案手续；研发费用加计扣除已办理备案（备案号：${reportData.adjustmentDetails.expenses.additionalDeduction.backupNo}）。
                </div>

                <div class="sub-title">五、重大事项情况说明</div>
                <div class="content-paragraph">
                    1、被鉴证单位于2023年6月通过高新技术企业认定复审，继续享受15%的优惠税率；<br>
                    2、被鉴证单位2023年度研发费用投入较大，符合加计扣除条件的研发费用1800万元；<br>
                    3、被鉴证单位严格按照企业会计准则和税法规定进行会计核算和纳税申报，未发现重大违法违规事项。
                </div>

                <div class="sub-title">六、委托单位对鉴证事项的意见</div>
                <div class="content-paragraph">
                    委托单位对以上鉴证结论及鉴证事项说明无异议，在此处加盖公章。
                </div>
                <div class="content-paragraph" style="margin-top: 30px;">
                    委托单位（盖章）：${reportData.client}<br>
                    中介机构名称：${reportData.auditFirm.name}<br>
                    日期：${reportData.createDate}
                </div>
            </div>

            <div class="highlight-box" style="margin-top: 30px;">
                <strong>企业所得税鉴证事项说明</strong><br>
                1、未审金额是指被鉴证单位按照国家统一会计制度确认的账面金额。<br>
                2、鉴证调整额是指鉴证人根据国家统一会计制度确认被鉴证单位账面金额的调整额。<br>
                3、鉴证确认额是指鉴证人鉴证确认被鉴证单位按照国家统一会计制度确认的账面金额，即未审金额与鉴证调整额之和。<br>
                4、税收金额是指鉴证人按照税收规定鉴证确认的被鉴证单位的鉴证项目金额。<br>
                5、纳税调整增加额和纳税调整减少额是指根据鉴证人审核的鉴证确认额、税收金额确认被鉴证单位的纳税调整的金额。<br>
                6、纳税调整事项说明中，不要求对调增、调减证据及证明情况做具体说明。如有需要说明的纳税调整事项，在重大事项情况说明中披露。<br>
                7、纳税调整的事项要清楚，政策依据要准确，调整金额要明确，要包括调整的项目、原因、依据、计算过程、调整金额等内容。<br>
                8、在撰写具体纳税调整事项时，也可按"纳税调整增加事项"及"纳税调整减少事项"分别列示。
            </div>
        </div>

        <div class="footer-info">
            本报告仅供${reportData.client}${reportData.taxYear}企业所得税汇算清缴申报使用<br>
            未经本事务所书面同意，不得用于其他目的或向第三方提供
        </div>
    </div>
</body>
</html>
    `;
};

export default function EnterpriseIncomeTaxReport() {
    const reportData = getEnterpriseIncomeTaxReportData();

    return (
        <div dangerouslySetInnerHTML={{
            __html: generateReportHTML(reportData)
        }} />
    );
}