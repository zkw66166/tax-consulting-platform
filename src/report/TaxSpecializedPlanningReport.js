// src/report/TaxPlanningReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>税种专项筹划报告</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif;
            line-height: 1.8;
            color: #2c3e50;
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px;
            background: #ffffff;
        }

        .print-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
            z-index: 1000;
        }
        
        .header {
            text-align: center;
            border-bottom: 4px solid #27ae60;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 40px 30px 30px;
            border-radius: 12px;
            position: relative;
        }
        
        .header::before {
            content: "📊";
            position: absolute;
            top: 20px;
            left: 30px;
            font-size: 24px;
        }
        
        .header h1 {
            color: #27ae60;
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.1);
        }
        
        .header .subtitle {
            color: #7f8c8d;
            font-size: 18px;
            font-weight: 500;
        }
        
        .company-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
        }
        
        .info-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 6px 20px rgba(39,174,96,0.15);
            border: 2px solid #e8f5e8;
            position: relative;
        }
        
        .info-card::before {
            content: "●";
            position: absolute;
            top: 20px;
            right: 25px;
            color: #27ae60;
            font-size: 16px;
        }
        
        .info-card h3 {
            color: #27ae60;
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 25px;
            text-align: center;
            padding-bottom: 15px;
            border-bottom: 3px solid #e8f5e8;
        }
        
        .info-card p {
            margin: 12px 0;
            padding: 8px 0;
            border-bottom: 1px dotted #bdc3c7;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .info-card p:last-child {
            border-bottom: none;
        }
        
        .info-card .value {
            font-weight: 600;
            color: #2c3e50;
        }
        
        .section {
            margin-bottom: 50px;
            background: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            border: 1px solid #e9ecef;
        }
        
        .section-header {
            background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
            color: white;
            padding: 25px 35px;
            margin-bottom: 0;
            position: relative;
        }
        
        .section-header::after {
            content: "▶";
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            opacity: 0.8;
        }
        
        .section-title {
            font-size: 26px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .section-content {
            padding: 35px;
        }
        
        .subsection {
            margin-bottom: 40px;
            background: #f8f9fa;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid #e9ecef;
            position: relative;
        }
        
        .subsection::before {
            content: "▣";
            position: absolute;
            top: 15px;
            left: 20px;
            color: #34495e;
            font-size: 16px;
            z-index: 1;
        }
        
        .subsection-header {
            background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
            color: white;
            padding: 18px 25px 18px 50px;
            font-size: 20px;
            font-weight: 600;
        }
        
        .subsection-content {
            padding: 30px;
        }
        
        .strategy-item {
            margin-bottom: 30px;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border-left: 6px solid #27ae60;
            position: relative;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .strategy-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        .strategy-item::before {
            content: "💡";
            position: absolute;
            left: 25px;
            top: 25px;
            font-size: 18px;
        }
        
        .strategy-item h4 {
            color: #27ae60;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 18px;
            margin-left: 35px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e8f5e8;
        }
        
        .strategy-item p {
            text-align: justify;
            margin-bottom: 15px;
            text-indent: 2em;
            line-height: 1.8;
        }
        
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 25px 0;
        }
        
        .grid-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 25px;
            margin: 25px 0;
        }
        
        .grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin: 25px 0;
        }
        
        .highlight-card {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            border: 3px solid #27ae60;
            position: relative;
        }
        
        .highlight-card::before {
            content: "★";
            position: absolute;
            top: 15px;
            right: 20px;
            color: #27ae60;
            font-size: 16px;
        }
        
        .highlight-card h3 {
            color: #229954;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .highlight-card .value {
            color: #1e7e34;
            font-size: 32px;
            font-weight: 700;
            margin: 15px 0;
        }
        
        .highlight-card .sub-value {
            color: #6c757d;
            font-size: 14px;
        }
        
        .savings-high { 
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); 
            border-left-color: #27ae60;
        }
        
        .savings-high::before {
            content: "💰";
        }
        
        .savings-medium { 
            background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); 
            border-left-color: #ffa000;
        }
        
        .savings-medium::before {
            content: "💡";
        }
        
        .savings-low { 
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); 
            border-left-color: #1976d2;
        }
        
        .savings-low::before {
            content: "📈";
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }
        
        .metric-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            border: 2px solid #e9ecef;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .metric-card::before {
            content: "◆";
            position: absolute;
            top: 15px;
            right: 20px;
            color: #27ae60;
            font-size: 14px;
        }
        
        .metric-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            border-color: #27ae60;
        }
        
        .metric-card h5 {
            color: #7f8c8d;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .metric-card .value {
            color: #27ae60;
            font-size: 28px;
            font-weight: 700;
        }
        
        .metric-card .sub-text {
            color: #95a5a6;
            font-size: 12px;
            margin-top: 8px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        
        th {
            background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
            color: white;
            padding: 18px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
            position: relative;
        }
        
        th::after {
            content: "♦";
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            opacity: 0.8;
        }
        
        td {
            border-bottom: 1px solid #ecf0f1;
            padding: 15px 18px;
            text-align: center;
            position: relative;
        }
        
        tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        tr:hover {
            background: #e8f5e8;
            transform: scale(1.01);
            transition: all 0.3s ease;
        }
        
        .feature-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 3px solid #27ae60;
            border-radius: 15px;
            padding: 30px;
            margin: 25px 0;
            position: relative;
        }
        
        .feature-box::before {
            content: "📋";
            position: absolute;
            top: 20px;
            left: 25px;
            font-size: 20px;
        }
        
        .feature-box h4 {
            color: #27ae60;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            margin-left: 45px;
            text-align: center;
            padding-bottom: 12px;
            border-bottom: 3px solid #c8e6c9;
        }
        
        ul {
            padding-left: 30px;
            margin: 20px 0;
        }
        
        li {
            margin-bottom: 10px;
            text-align: justify;
            position: relative;
            line-height: 1.7;
        }
        
        li::before {
            content: "✓";
            position: absolute;
            left: -25px;
            color: #27ae60;
            font-weight: bold;
            font-size: 14px;
            top: 2px;
        }
        
        .conclusion-section {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 4px solid #27ae60;
            border-radius: 20px;
            padding: 40px;
            margin: 40px 0;
            position: relative;
        }
        
        .conclusion-section::before {
            content: "🎯";
            position: absolute;
            top: 25px;
            right: 30px;
            font-size: 24px;
        }
        
        .footer {
            border-top: 4px solid #27ae60;
            padding-top: 30px;
            margin-top: 50px;
            font-size: 12px;
            color: #7f8c8d;
            text-align: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 30px;
            border-radius: 12px;
            position: relative;
        }
        
        .footer::before {
            content: "ℹ️";
            position: absolute;
            top: 20px;
            left: 25px;
            font-size: 16px;
        }
        
        .footer p {
            margin: 10px 0;
            line-height: 1.6;
        }
        
        .phase-number {
            display: inline-block;
            background: linear-gradient(135deg, #27ae60, #229954);
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            text-align: center;
            line-height: 28px;
            font-size: 14px;
            font-weight: bold;
            margin-right: 12px;
            vertical-align: top;
        }
        
        .highlight-text {
            background: linear-gradient(120deg, #c8e6c9 0%, #a8d8a8 100%);
            padding: 3px 8px;
            border-radius: 6px;
            font-weight: 600;
            color: #1e7e34;
        }
        
        .risk-indicator {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .risk-low {
            background: #d4edda;
            color: #155724;
        }
        
        .risk-medium {
            background: #fff3cd;
            color: #856404;
        }
        
        .risk-high {
            background: #f8d7da;
            color: #721c24;
        }
        
        .timeline-item {
            border-left: 4px solid #27ae60;
            padding-left: 25px;
            margin-bottom: 25px;
            position: relative;
        }
        
        .timeline-item::before {
            content: "⏰";
            position: absolute;
            left: -15px;
            top: 0;
            background: white;
            padding: 3px;
            border-radius: 50%;
        }
        
        @media print {
            body { 
                margin: 0; 
                padding: 20px; 
                font-size: 12px;
            }
            .section { 
                page-break-inside: avoid; 
                margin-bottom: 30px;
            }
            .header {
                padding: 20px;
            }
            .hover\\:transform { transform: none !important; }
        }
        
        @media (max-width: 768px) {
            .company-info,
            .grid-2,
            .grid-3,
            .grid-4 {
                grid-template-columns: 1fr;
            }
            
            .metrics-grid {
                grid-template-columns: 1fr 1fr;
            }
            
            body {
                padding: 15px;
            }
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

    <div class="header">
        <h1>税种专项筹划报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>🏢 企业基本信息</h3>
            <p><strong>企业名称</strong><span class="value">${reportData.companyInfo.name}</span></p>
            <p><strong>所属行业</strong><span class="value">${reportData.companyInfo.industry}</span></p>
            <p><strong>注册资本</strong><span class="value">${reportData.companyInfo.registeredCapital}</span></p>
            <p><strong>年营业收入</strong><span class="value">${reportData.companyInfo.annualRevenue}</span></p>
            <p><strong>员工人数</strong><span class="value">${reportData.companyInfo.employeeCount}人</span></p>
            <p><strong>所在地区</strong><span class="value">${reportData.companyInfo.location}</span></p>
        </div>
        <div class="info-card">
            <h3>📊 报告信息</h3>
            <p><strong>报告日期</strong><span class="value">${reportData.reportInfo.reportDate}</span></p>
            <p><strong>分析期间</strong><span class="value">${reportData.reportInfo.analysisPeriod}</span></p>
            <p><strong>咨询机构</strong><span class="value">${reportData.reportInfo.consultingFirm}</span></p>
            <p><strong>项目团队</strong><span class="value">${reportData.reportInfo.projectTeam}</span></p>
            <p><strong>报告编号</strong><span class="value">${reportData.reportInfo.reportNumber}</span></p>
            <p><strong>报告版本</strong><span class="value">${reportData.reportInfo.version}</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🎯 筹划方案概览</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                <div class="highlight-card">
                    <h3>预计年度节税额</h3>
                    <div class="value">${reportData.executiveSummary.totalSavings}</div>
                    <div class="sub-value">万元</div>
                </div>
                <div class="highlight-card">
                    <h3>节税比例</h3>
                    <div class="value">${reportData.executiveSummary.savingsRate}</div>
                    <div class="sub-value">较当前税负</div>
                </div>
                <div class="highlight-card">
                    <h3>投资回报比</h3>
                    <div class="value">${reportData.executiveSummary.roi}</div>
                    <div class="sub-value">筹划成本:节税收益</div>
                </div>
            </div>
            
            <div class="grid-2">
                <div class="strategy-item savings-high">
                    <h4>核心筹划策略</h4>
                    <ul>
                        ${reportData.executiveSummary.coreStrategies.map(strategy => `<li>${strategy}</li>`).join('')}
                    </ul>
                </div>
                <div class="strategy-item savings-medium">
                    <h4>主要风险控制</h4>
                    <ul>
                        ${reportData.executiveSummary.riskControls.map(risk => `<li>${risk}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="feature-box">
                <h4>综合效益分析</h4>
                <p style="text-align: center; font-size: 18px;">
                    <span class="highlight-text">当前年度税负: ${reportData.executiveSummary.currentTaxBurden}万元</span>　
                    <span class="highlight-text">优化后税负: ${reportData.executiveSummary.optimizedTaxBurden}万元</span><br>
                    <span style="color: #27ae60; font-weight: 600; font-size: 20px;">综合税负率降低: ${reportData.executiveSummary.taxRateReduction}</span>
                </p>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📈 各税种筹划分析</h2>
        </div>
        <div class="section-content">
            <div class="metrics-grid">
                ${reportData.taxAnalysis.map(tax => `
                    <div class="metric-card">
                        <h5>${tax.taxType}</h5>
                        <div class="value">${tax.savings}万元</div>
                        <div class="sub-text">当前: ${tax.current}万元 → 优化后: ${tax.optimized}万元</div>
                        <div class="sub-text">节税率: ${tax.savingsRate}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🔍 详细筹划方案</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 企业所得税筹划</div>
                <div class="subsection-content">
                    
                    <!-- 应纳税所得额优化 -->
                    <div class="strategy-item">
                        <h4>应纳税所得额优化</h4>
                        <p><span class="phase-number">1</span>${reportData.detailedPlanning.corporateIncomeTax.taxableIncomeOptimization.description}</p>
                        
                        <div class="grid-3">
                            <div class="feature-box" style="border-color: #3498db;">
                                <h4 style="color: #3498db;">收入确认筹划</h4>
                                <table>
                                    <tr><th>筹划项目</th><th>优化方案</th><th>节税额</th></tr>
                                    ${reportData.detailedPlanning.corporateIncomeTax.taxableIncomeOptimization.revenueRecognition.map(item => `
                                        <tr>
                                            <td>${item.type}</td>
                                            <td style="color: #3498db;">${item.method}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${item.savings}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #e74c3c;">
                                <h4 style="color: #e74c3c;">扣除项目优化</h4>
                                <table>
                                    <tr><th>扣除项目</th><th>当前额度</th><th>优化额度</th><th>节税额</th></tr>
                                    ${reportData.detailedPlanning.corporateIncomeTax.taxableIncomeOptimization.deductionItems.map(item => `
                                        <tr>
                                            <td>${item.type}</td>
                                            <td>${item.current}</td>
                                            <td style="color: #e74c3c;">${item.optimized}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${item.savings}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #9b59b6;">
                                <h4 style="color: #9b59b6;">资产折旧摊销</h4>
                                <table>
                                    <tr><th>资产类型</th><th>优化方案</th><th>节税额</th></tr>
                                    ${reportData.detailedPlanning.corporateIncomeTax.taxableIncomeOptimization.assetDepreciation.map(item => `
                                        <tr>
                                            <td>${item.type}</td>
                                            <td style="color: #9b59b6;">${item.method}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${item.savings}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 高新技术企业认定 -->
                    <div class="strategy-item">
                        <h4>高新技术企业认定</h4>
                        <p><span class="phase-number">2</span>${reportData.detailedPlanning.corporateIncomeTax.highTechEnterprise.description}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>当前税率</h5>
                                <div class="value">${reportData.detailedPlanning.corporateIncomeTax.highTechEnterprise.currentRate}</div>
                            </div>
                            <div class="metric-card">
                                <h5>优惠税率</h5>
                                <div class="value">${reportData.detailedPlanning.corporateIncomeTax.highTechEnterprise.preferentialRate}</div>
                            </div>
                            <div class="metric-card">
                                <h5>预计节税</h5>
                                <div class="value">${reportData.detailedPlanning.corporateIncomeTax.highTechEnterprise.savings}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>实施难度</h5>
                                <div class="value" style="font-size: 18px;">
                                    <span class="${reportData.detailedPlanning.corporateIncomeTax.highTechEnterprise.difficulty === '低' ? 'risk-low' : reportData.detailedPlanning.corporateIncomeTax.highTechEnterprise.difficulty === '中' ? 'risk-medium' : 'risk-high'} risk-indicator">
                                        ${reportData.detailedPlanning.corporateIncomeTax.highTechEnterprise.difficulty}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="feature-box">
                            <h4>认定条件分析</h4>
                            <table>
                                <tr><th>认定条件</th><th>企业现状</th><th>达标情况</th><th>改进措施</th></tr>
                                ${reportData.detailedPlanning.corporateIncomeTax.highTechEnterprise.conditions.map(condition => `
                                    <tr>
                                        <td>${condition.requirement}</td>
                                        <td>${condition.currentStatus}</td>
                                        <td style="color: ${condition.compliance ? '#27ae60' : '#e74c3c'}; font-weight: 600;">
                                            ${condition.compliance ? '✓ 达标' : '✗ 待改进'}
                                        </td>
                                        <td style="color: #3498db;">${condition.improvement}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>
                    
                    <!-- 研发费用加计扣除 -->
                    <div class="strategy-item">
                        <h4>研发费用加计扣除</h4>
                        <p><span class="phase-number">3</span>${reportData.detailedPlanning.corporateIncomeTax.rdDeduction.description}</p>
                        
                        <table>
                            <tr>
                                <th>研发项目类型</th>
                                <th>研发费用金额</th>
                                <th>当前扣除率</th>
                                <th>加计扣除率</th>
                                <th>实际扣除率</th>
                                <th>预计节税</th>
                            </tr>
                            ${reportData.detailedPlanning.corporateIncomeTax.rdDeduction.projects.map(project => `
                                <tr>
                                    <td>${project.type}</td>
                                    <td>${project.amount}万元</td>
                                    <td>${project.currentRate}</td>
                                    <td style="color: #e74c3c; font-weight: 600;">${project.additionalRate}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${project.totalRate}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${project.savings}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                        
                        <div class="feature-box">
                            <h4>研发费用归集要求</h4>
                            <div class="grid-2">
                                <div>
                                    <h5 style="color: #3498db;">费用归集范围：</h5>
                                    <ul>
                                        ${reportData.detailedPlanning.corporateIncomeTax.rdDeduction.expenseCategories.map(category => `<li>${category}</li>`).join('')}
                                    </ul>
                                </div>
                                <div>
                                    <h5 style="color: #e74c3c;">管理要求：</h5>
                                    <ul>
                                        ${reportData.detailedPlanning.corporateIncomeTax.rdDeduction.managementRequirements.map(req => `<li>${req}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 设备投资优惠 -->
                    <div class="strategy-item">
                        <h4>设备投资优惠</h4>
                        <p><span class="phase-number">4</span>${reportData.detailedPlanning.corporateIncomeTax.equipmentInvestment.description}</p>
                        
                        <div class="grid-3">
                            ${reportData.detailedPlanning.corporateIncomeTax.equipmentInvestment.categories.map(category => `
                                <div class="feature-box" style="border-color: ${category.color};">
                                    <h4 style="color: ${category.color};">${category.name}</h4>
                                    <table>
                                        <tr><th>投资项目</th><th>投资额</th><th>抵免额</th></tr>
                                        ${category.items.map(item => `
                                            <tr>
                                                <td>${item.name}</td>
                                                <td>${item.investment}万元</td>
                                                <td style="color: #27ae60; font-weight: 600;">${item.deduction}万元</td>
                                            </tr>
                                        `).join('')}
                                    </table>
                                    <p style="text-align: center; margin-top: 15px;">
                                        <span style="color: ${category.color}; font-weight: 600;">
                                            合计抵免: ${category.totalDeduction}万元
                                        </span>
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- 技术转让优惠 -->
                    <div class="strategy-item">
                        <h4>技术转让优惠</h4>
                        <p><span class="phase-number">5</span>${reportData.detailedPlanning.corporateIncomeTax.technologyTransfer.description}</p>
                        
                        <div class="feature-box">
                            <h4>技术转让筹划方案</h4>
                            <table>
                                <tr><th>转让技术</th><th>转让金额</th><th>免税额度</th><th>减半征收额度</th><th>节税金额</th></tr>
                                ${reportData.detailedPlanning.corporateIncomeTax.technologyTransfer.transfers.map(transfer => `
                                    <tr>
                                        <td>${transfer.technology}</td>
                                        <td>${transfer.amount}万元</td>
                                        <td style="color: #27ae60;">${transfer.exemptAmount}万元</td>
                                        <td style="color: #f39c12;">${transfer.halfRateAmount}万元</td>
                                        <td style="color: #27ae60; font-weight: 600;">${transfer.savings}万元</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 增值税筹划</div>
                <div class="subsection-content">
                    
                    <!-- 纳税人身份筹划 -->
                    <div class="strategy-item">
                        <h4>纳税人身份筹划</h4>
                        <p><span class="phase-number">1</span>${reportData.detailedPlanning.valueAddedTax.taxpayerStatus.description}</p>
                        
                        <table>
                            <tr>
                                <th>业务类型</th>
                                <th>增值率</th>
                                <th>无差别点增值率</th>
                                <th>建议身份</th>
                                <th>适用税率/征收率</th>
                                <th>预计节税</th>
                            </tr>
                            ${reportData.detailedPlanning.valueAddedTax.taxpayerStatus.businessTypes.map(type => `
                                <tr>
                                    <td>${type.name}</td>
                                    <td>${type.valueAddedRate}</td>
                                    <td style="color: #7f8c8d;">${type.breakEvenRate}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${type.recommendedStatus}</td>
                                    <td>${type.taxRate}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${type.savings}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                        
                        <div class="feature-box">
                            <h4>身份选择测算模型</h4>
                            <p style="text-align: center;">
                                <span class="highlight-text">无差别点增值率 = 征收率 ÷ 税率</span><br>
                                当企业增值率低于无差别点时，选择小规模纳税人更优；高于无差别点时，选择一般纳税人更优。
                            </p>
                        </div>
                    </div>
                    
                    <!-- 税率适用筹划 -->
                    <div class="strategy-item">
                        <h4>税率适用筹划</h4>
                        <p><span class="phase-number">2</span>${reportData.detailedPlanning.valueAddedTax.taxRateOptimization.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box" style="border-color: #e74c3c;">
                                <h4 style="color: #e74c3c;">混合销售与兼营区分</h4>
                                <table>
                                    <tr><th>业务类型</th><th>当前做法</th><th>优化方案</th><th>节税额</th></tr>
                                    ${reportData.detailedPlanning.valueAddedTax.taxRateOptimization.mixedSales.map(item => `
                                        <tr>
                                            <td>${item.business}</td>
                                            <td>${item.currentApproach}</td>
                                            <td style="color: #e74c3c;">${item.optimizedApproach}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${item.savings}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #3498db;">
                                <h4 style="color: #3498db;">业务模式设计优化</h4>
                                <ul>
                                    ${reportData.detailedPlanning.valueAddedTax.taxRateOptimization.businessModelDesign.map(design => `<li>${design}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 进项税额抵扣优化 -->
                    <div class="strategy-item">
                        <h4>进项税额抵扣优化</h4>
                        <p><span class="phase-number">3</span>${reportData.detailedPlanning.valueAddedTax.inputTaxOptimization.description}</p>
                        
                        <div class="grid-3">
                            ${reportData.detailedPlanning.valueAddedTax.inputTaxOptimization.measures.map(measure => `
                                <div class="feature-box" style="border-color: #673ab7;">
                                    <h4 style="color: #673ab7;">${measure.title}</h4>
                                    <p style="font-size: 14px;">${measure.description}</p>
                                    <p style="text-align: center; color: #673ab7; font-weight: 600;">
                                        预计效果: ${measure.effect}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="feature-box">
                            <h4>特殊抵扣政策利用</h4>
                            <table>
                                <tr><th>抵扣类型</th><th>适用条件</th><th>抵扣率</th><th>预计抵扣额</th></tr>
                                ${reportData.detailedPlanning.valueAddedTax.inputTaxOptimization.specialDeductions.map(deduction => `
                                    <tr>
                                        <td>${deduction.type}</td>
                                        <td>${deduction.condition}</td>
                                        <td style="color: #673ab7; font-weight: 600;">${deduction.rate}</td>
                                        <td style="color: #27ae60; font-weight: 600;">${deduction.amount}万元</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>
                    
                    <!-- 免税和即征即退政策 -->
                    <div class="strategy-item">
                        <h4>免税和即征即退政策</h4>
                        <p><span class="phase-number">4</span>${reportData.detailedPlanning.valueAddedTax.exemptionPolicies.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box" style="border-color: #27ae60;">
                                <h4 style="color: #27ae60;">免税政策适用</h4>
                                <table>
                                    <tr><th>免税项目</th><th>适用业务</th><th>节税金额</th></tr>
                                    ${reportData.detailedPlanning.valueAddedTax.exemptionPolicies.exemptions.map(exemption => `
                                        <tr>
                                            <td>${exemption.item}</td>
                                            <td>${exemption.business}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${exemption.savings}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #f39c12;">
                                <h4 style="color: #f39c12;">即征即退政策</h4>
                                <table>
                                    <tr><th>产品类型</th><th>退税比例</th><th>预计退税</th></tr>
                                    ${reportData.detailedPlanning.valueAddedTax.exemptionPolicies.refunds.map(refund => `
                                        <tr>
                                            <td>${refund.product}</td>
                                            <td style="color: #f39c12; font-weight: 600;">${refund.rate}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${refund.amount}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 出口退税筹划 -->
                    <div class="strategy-item">
                        <h4>出口退税筹划</h4>
                        <p><span class="phase-number">5</span>${reportData.detailedPlanning.valueAddedTax.exportTaxRefund.description}</p>
                        
                        <table>
                            <tr>
                                <th>出口产品</th>
                                <th>出口金额</th>
                                <th>退税率</th>
                                <th>退税方法</th>
                                <th>预计退税额</th>
                            </tr>
                            ${reportData.detailedPlanning.valueAddedTax.exportTaxRefund.products.map(product => `
                                <tr>
                                    <td>${product.name}</td>
                                    <td>${product.exportAmount}万元</td>
                                    <td style="color: #3498db; font-weight: 600;">${product.refundRate}</td>
                                    <td>${product.method}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${product.refundAmount}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                        
                        <div class="feature-box">
                            <h4>出口退税优化策略</h4>
                            <ul>
                                ${reportData.detailedPlanning.valueAddedTax.exportTaxRefund.optimizationStrategies.map(strategy => `<li>${strategy}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 个人所得税筹划</div>
                <div class="subsection-content">
                    
                    <!-- 工资薪金所得筹划 -->
                    <div class="strategy-item">
                        <h4>工资薪金所得筹划</h4>
                        <p><span class="phase-number">1</span>${reportData.detailedPlanning.personalIncomeTax.salaryOptimization.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box" style="border-color: #e91e63;">
                                <h4 style="color: #e91e63;">优化前薪酬结构</h4>
                                <table>
                                    <tr><th>薪酬项目</th><th>金额</th><th>应纳税额</th></tr>
                                    ${reportData.detailedPlanning.personalIncomeTax.salaryOptimization.before.map(item => `
                                        <tr>
                                            <td>${item.item}</td>
                                            <td>${item.amount}</td>
                                            <td style="color: #e91e63;">${item.tax}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            <div class="feature-box" style="border-color: #4caf50;">
                                <h4 style="color: #4caf50;">优化后薪酬结构</h4>
                                <table>
                                    <tr><th>薪酬项目</th><th>金额</th><th>应纳税额</th></tr>
                                    ${reportData.detailedPlanning.personalIncomeTax.salaryOptimization.after.map(item => `
                                        <tr>
                                            <td>${item.item}</td>
                                            <td>${item.amount}</td>
                                            <td style="color: #4caf50;">${item.tax}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                        
                        <div class="feature-box" style="text-align: center; border-color: #ff9800;">
                            <h4 style="color: #ff9800;">专项附加扣除优化</h4>
                            <table>
                                <tr><th>扣除项目</th><th>扣除标准</th><th>当前利用</th><th>优化方案</th><th>节税额</th></tr>
                                ${reportData.detailedPlanning.personalIncomeTax.salaryOptimization.specialDeductions.map(deduction => `
                                    <tr>
                                        <td>${deduction.item}</td>
                                        <td>${deduction.standard}</td>
                                        <td>${deduction.current}</td>
                                        <td style="color: #ff9800;">${deduction.optimized}</td>
                                        <td style="color: #27ae60; font-weight: 600;">${deduction.savings}万元</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>
                    
                    <!-- 经营所得筹划 -->
                    <div class="strategy-item">
                        <h4>经营所得筹划</h4>
                        <p><span class="phase-number">2</span>${reportData.detailedPlanning.personalIncomeTax.businessIncome.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box" style="border-color: #9c27b0;">
                                <h4 style="color: #9c27b0;">个人独资企业vs公司制企业</h4>
                                <table>
                                    <tr><th>对比项目</th><th>个人独资企业</th><th>公司制企业</th></tr>
                                    ${reportData.detailedPlanning.personalIncomeTax.businessIncome.entityComparison.map(item => `
                                        <tr>
                                            <td>${item.item}</td>
                                            <td style="color: #9c27b0;">${item.soleProprietorship}</td>
                                            <td style="color: #607d8b;">${item.corporation}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #ff5722;">
                                <h4 style="color: #ff5722;">征收方式选择</h4>
                                <table>
                                    <tr><th>征收方式</th><th>适用条件</th><th>税负水平</th><th>建议</th></tr>
                                    ${reportData.detailedPlanning.personalIncomeTax.businessIncome.assessmentMethods.map(method => `
                                        <tr>
                                            <td>${method.method}</td>
                                            <td>${method.condition}</td>
                                            <td style="color: #ff5722;">${method.taxBurden}</td>
                                            <td style="color: ${method.recommended ? '#27ae60' : '#95a5a6'};">
                                                ${method.recommended ? '✓ 推荐' : '不推荐'}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 资本利得筹划 -->
                    <div class="strategy-item">
                        <h4>资本利得筹划</h4>
                        <p><span class="phase-number">3</span>${reportData.detailedPlanning.personalIncomeTax.capitalGains.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box" style="border-color: #795548;">
                                <h4 style="color: #795548;">股权转让筹划</h4>
                                <table>
                                    <tr><th>筹划方案</th><th>转让方式</th><th>税负影响</th><th>节税额</th></tr>
                                    ${reportData.detailedPlanning.personalIncomeTax.capitalGains.equityTransfer.map(plan => `
                                        <tr>
                                            <td>${plan.plan}</td>
                                            <td style="color: #795548;">${plan.method}</td>
                                            <td>${plan.taxImpact}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${plan.savings}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #607d8b;">
                                <h4 style="color: #607d8b;">股息红利优化</h4>
                                <table>
                                    <tr><th>持股期限</th><th>税率</th><th>优化策略</th></tr>
                                    ${reportData.detailedPlanning.personalIncomeTax.capitalGains.dividendIncome.map(dividend => `
                                        <tr>
                                            <td>${dividend.holdingPeriod}</td>
                                            <td style="color: #607d8b; font-weight: 600;">${dividend.taxRate}</td>
                                            <td>${dividend.strategy}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 其他所得筹划 -->
                    <div class="strategy-item">
                        <h4>其他所得筹划</h4>
                        <p><span class="phase-number">4</span>${reportData.detailedPlanning.personalIncomeTax.otherIncome.description}</p>
                        
                        <table>
                            <tr><th>所得类型</th><th>税率</th><th>筹划策略</th><th>节税方法</th><th>预计节税</th></tr>
                            ${reportData.detailedPlanning.personalIncomeTax.otherIncome.types.map(type => `
                                <tr>
                                    <td>${type.incomeType}</td>
                                    <td>${type.taxRate}</td>
                                    <td style="color: #3498db;">${type.strategy}</td>
                                    <td>${type.method}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${type.savings}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">4️⃣ 消费税筹划</div>
                <div class="subsection-content">
                    
                    <!-- 征收范围和税率优化 -->
                    <div class="strategy-item">
                        <h4>征收范围和税率优化</h4>
                        <p><span class="phase-number">1</span>${reportData.detailedPlanning.consumptionTax.taxScopeOptimization.description}</p>
                        
                        <table>
                            <tr><th>产品类别</th><th>当前税率</th><th>优化策略</th><th>节税方案</th><th>预计节税</th></tr>
                            ${reportData.detailedPlanning.consumptionTax.taxScopeOptimization.products.map(product => `
                                <tr>
                                    <td>${product.category}</td>
                                    <td>${product.currentRate}</td>
                                    <td style="color: #e91e63;">${product.strategy}</td>
                                    <td>${product.solution}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${product.savings}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <!-- 计税依据优化 -->
                    <div class="strategy-item">
                        <h4>计税依据优化</h4>
                        <p><span class="phase-number">2</span>${reportData.detailedPlanning.consumptionTax.taxBaseOptimization.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box" style="border-color: #ff9800;">
                                <h4 style="color: #ff9800;">自产自用优化</h4>
                                <table>
                                    <tr><th>计税方式</th><th>当前做法</th><th>优化方案</th><th>节税额</th></tr>
                                    ${reportData.detailedPlanning.consumptionTax.taxBaseOptimization.selfUse.map(item => `
                                        <tr>
                                            <td>${item.method}</td>
                                            <td>${item.current}</td>
                                            <td style="color: #ff9800;">${item.optimized}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${item.savings}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #9c27b0;">
                                <h4 style="color: #9c27b0;">委托加工优化</h4>
                                <table>
                                    <tr><th>加工方式</th><th>税负水平</th><th>优化效果</th></tr>
                                    ${reportData.detailedPlanning.consumptionTax.taxBaseOptimization.commissionProcessing.map(item => `
                                        <tr>
                                            <td>${item.method}</td>
                                            <td style="color: #9c27b0;">${item.taxBurden}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${item.optimization}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 综合筹划策略 -->
                    <div class="strategy-item">
                        <h4>综合筹划策略</h4>
                        <p><span class="phase-number">3</span>${reportData.detailedPlanning.consumptionTax.comprehensiveStrategy.description}</p>
                        
                        <div class="grid-3">
                            ${reportData.detailedPlanning.consumptionTax.comprehensiveStrategy.strategies.map(strategy => `
                                <div class="feature-box" style="border-color: ${strategy.color};">
                                    <h4 style="color: ${strategy.color};">${strategy.title}</h4>
                                    <ul>
                                        ${strategy.measures.map(measure => `<li>${measure}</li>`).join('')}
                                    </ul>
                                    <p style="text-align: center; color: ${strategy.color}; font-weight: 600;">
                                        预计节税: ${strategy.savings}万元
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">5️⃣ 其他主要税种筹划</div>
                <div class="subsection-content">
                    
                    <!-- 印花税筹划 -->
                    <div class="strategy-item">
                        <h4>印花税筹划</h4>
                        <p><span class="phase-number">1</span>${reportData.detailedPlanning.otherTaxes.stampTax.description}</p>
                        
                        <table>
                            <tr><th>合同类型</th><th>税率</th><th>优化策略</th><th>节税方法</th><th>预计节税</th></tr>
                            ${reportData.detailedPlanning.otherTaxes.stampTax.contracts.map(contract => `
                                <tr>
                                    <td>${contract.type}</td>
                                    <td>${contract.rate}</td>
                                    <td style="color: #3498db;">${contract.strategy}</td>
                                    <td>${contract.method}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${contract.savings}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <!-- 土地增值税筹划 -->
                    <div class="strategy-item">
                        <h4>土地增值税筹划</h4>
                        <p><span class="phase-number">2</span>${reportData.detailedPlanning.otherTaxes.landValueAddedTax.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box" style="border-color: #e74c3c;">
                                <h4 style="color: #e74c3c;">增值率控制</h4>
                                <table>
                                    <tr><th>增值率区间</th><th>税率</th><th>控制措施</th></tr>
                                    ${reportData.detailedPlanning.otherTaxes.landValueAddedTax.rateControl.map(control => `
                                        <tr>
                                            <td>${control.range}</td>
                                            <td style="color: #e74c3c; font-weight: 600;">${control.rate}</td>
                                            <td>${control.measure}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #2196f3;">
                                <h4 style="color: #2196f3;">扣除项目优化</h4>
                                <table>
                                    <tr><th>扣除项目</th><th>优化方案</th><th>节税效果</th></tr>
                                    ${reportData.detailedPlanning.otherTaxes.landValueAddedTax.deductionOptimization.map(item => `
                                        <tr>
                                            <td>${item.item}</td>
                                            <td style="color: #2196f3;">${item.optimization}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${item.effect}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 资源税筹划 -->
                    <div class="strategy-item">
                        <h4>资源税筹划</h4>
                        <p><span class="phase-number">3</span>${reportData.detailedPlanning.otherTaxes.resourceTax.description}</p>
                        
                        <table>
                            <tr><th>资源类型</th><th>计税方式</th><th>优惠政策</th><th>减征比例</th><th>预计节税</th></tr>
                            ${reportData.detailedPlanning.otherTaxes.resourceTax.resources.map(resource => `
                                <tr>
                                    <td>${resource.type}</td>
                                    <td>${resource.method}</td>
                                    <td style="color: #4caf50;">${resource.policy}</td>
                                    <td style="color: #ff9800; font-weight: 600;">${resource.reduction}</td>
                                    <td style="color: #27ae60; font-weight: 600;">${resource.savings}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <!-- 城镇土地使用税筹划 -->
                    <div class="strategy-item">
                        <h4>城镇土地使用税筹划</h4>
                        <p><span class="phase-number">4</span>${reportData.detailedPlanning.otherTaxes.landUseTax.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box" style="border-color: #795548;">
                                <h4 style="color: #795548;">减免政策利用</h4>
                                <table>
                                    <tr><th>减免类型</th><th>适用条件</th><th>减免幅度</th><th>节税额</th></tr>
                                    ${reportData.detailedPlanning.otherTaxes.landUseTax.exemptions.map(exemption => `
                                        <tr>
                                            <td>${exemption.type}</td>
                                            <td>${exemption.condition}</td>
                                            <td style="color: #795548; font-weight: 600;">${exemption.reduction}</td>
                                            <td style="color: #27ae60; font-weight: 600;">${exemption.savings}万元</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                            
                            <div class="feature-box" style="border-color: #607d8b;">
                                <h4 style="color: #607d8b;">土地用途优化</h4>
                                <table>
                                    <tr><th>用地类型</th><th>税额标准</th><th>优化建议</th></tr>
                                    ${reportData.detailedPlanning.otherTaxes.landUseTax.landUseOptimization.map(land => `
                                        <tr>
                                            <td>${land.type}</td>
                                            <td>${land.rate}</td>
                                            <td style="color: #607d8b;">${land.suggestion}</td>
                                        </tr>
                                    `).join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚠️ 风险评估与控制</h2>
        </div>
        <div class="section-content">
            <div class="feature-box" style="text-align: center; margin-bottom: 30px;">
                <h4>综合风险评分</h4>
                <div style="font-size: 48px; font-weight: 700; color: #27ae60; margin: 20px 0;">
                    ${reportData.riskAssessment.overallScore}/10
                </div>
                <p style="color: #7f8c8d; font-size: 16px;">基于政策风险、操作风险、合规风险等维度综合评估</p>
            </div>
            
            <div class="grid-2">
                ${reportData.riskAssessment.categories.map(category => `
                    <div class="strategy-item ${category.level === '低' ? 'savings-high' : category.level === '中' ? 'savings-medium' : 'savings-low'}">
                        <h4>${category.name} - ${category.score}分 
                            <span class="${category.level === '低' ? 'risk-low' : category.level === '中' ? 'risk-medium' : 'risk-high'} risk-indicator">
                                ${category.level}风险
                            </span>
                        </h4>
                        <p>${category.description}</p>
                        <ul>
                            ${category.controlMeasures.map(measure => `<li>${measure}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📅 实施时间表</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                ${reportData.implementationPlan.phases.map(phase => `
                    <div class="feature-box" style="border-color: ${phase.id === 1 ? '#e74c3c' : phase.id === 2 ? '#f39c12' : '#27ae60'};">
                        <h4 style="color: ${phase.id === 1 ? '#e74c3c' : phase.id === 2 ? '#f39c12' : '#27ae60'};">
                            ${phase.name}
                        </h4>
                        <div class="timeline-item" style="border-color: ${phase.id === 1 ? '#e74c3c' : phase.id === 2 ? '#f39c12' : '#27ae60'};">
                            <p style="color: #7f8c8d; margin-bottom: 15px;">
                                <strong>时间周期:</strong> ${phase.timeline}
                            </p>
                            <ul style="margin-left: 0; padding-left: 20px;">
                                ${phase.tasks.map(task => `<li>${task}</li>`).join('')}
                            </ul>
                            <p style="text-align: center; margin-top: 15px;">
                                <span class="highlight-text">预计节税: ${phase.savings}万元</span>
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="feature-box">
                <h4>关键里程碑</h4>
                <div class="grid-2">
                    ${reportData.implementationPlan.milestones.map(milestone => `
                        <div class="timeline-item">
                            <h5 style="color: #27ae60; font-weight: 600;">${milestone.date}</h5>
                            <p style="margin: 0;">${milestone.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📝 总结与建议</h2>
        </div>
        <div class="section-content">
            <div class="conclusion-section">
                <div class="strategy-item savings-high">
                    <h4>核心建议</h4>
                    <p><span class="phase-number">1</span>${reportData.recommendations.coreRecommendation}</p>
                </div>
                
                <div class="strategy-item savings-medium">
                    <h4>实施优先级</h4>
                    <ul>
                        ${reportData.recommendations.priorities.map(priority => `<li>${priority}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="strategy-item">
                    <h4>注意事项</h4>
                    <ul>
                        ${reportData.recommendations.considerations.map(consideration => `<li>${consideration}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="feature-box" style="border-color: #673ab7;">
                    <h4 style="color: #673ab7;">预期效果总结</h4>
                    <div class="grid-3">
                        <div style="text-align: center;">
                            <p style="font-size: 24px; font-weight: 700; color: #27ae60; margin: 0;">${reportData.recommendations.expectedResults.totalSavings}</p>
                            <p style="color: #7f8c8d; font-size: 14px;">总节税金额（万元）</p>
                        </div>
                        <div style="text-align: center;">
                            <p style="font-size: 24px; font-weight: 700; color: #27ae60; margin: 0;">${reportData.recommendations.expectedResults.savingsRate}</p>
                            <p style="color: #7f8c8d; font-size: 14px;">综合税负降低比例</p>
                        </div>
                        <div style="text-align: center;">
                            <p style="font-size: 24px; font-weight: 700; color: #27ae60; margin: 0;">${reportData.recommendations.expectedResults.implementationPeriod}</p>
                            <p style="color: #7f8c8d; font-size: 14px;">完整实施周期</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本税收筹划方案基于现行税收法律法规和政策制定，仅供参考。税收政策可能发生变化，实际筹划效果可能与预期存在差异。企业应根据自身实际情况，在专业税务顾问指导下谨慎实施，并严格遵守税收法律法规，确保合规经营。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam} | 🏢 咨询机构：${reportData.reportInfo.consultingFirm}</p>
    </div>
</body>
</html>
        `;
};

// 导出完整的报告数据结构
export const getTaxSpecializedReportData = () => {
    return {
        companyInfo: {
            name: "华新智造科技股份有限公司",
            industry: "高端装备制造业",
            registeredCapital: "1.2亿元",
            annualRevenue: "8.5亿元",
            employeeCount: 456,
            location: "江苏省苏州市高新技术开发区"
        },
        reportInfo: {
            reportDate: "2025年7月22日",
            analysisPeriod: "2024年度-2026年度",
            consultingFirm: "智税管理咨询有限公司",
            projectTeam: "高级税务筹划专家团队",
            reportNumber: "TSP-20250722-001",
            version: "v3.0完整版"
        },
        executiveSummary: {
            totalSavings: "368.5",
            savingsRate: "28.6%",
            roi: "1:12.8",
            currentTaxBurden: "1289",
            optimizedTaxBurden: "920.5",
            taxRateReduction: "4.3个百分点",
            coreStrategies: [
                "企业所得税综合筹划：通过高新认定、研发加计扣除、设备投资抵免等，预计节税156万元",
                "增值税全链条优化：纳税人身份、税率适用、进项抵扣、出口退税等，预计节税128万元",
                "个人所得税系统设计：薪酬结构、经营所得、资本利得等综合筹划，预计节税48万元",
                "消费税精准筹划：产品设计、计税依据、生产环节等优化，预计节税22万元",
                "其他税种协同优化：印花税、土地使用税、资源税等统筹规划，预计节税14.5万元"
            ],
            riskControls: [
                "建立政策追踪预警机制，实时监控税收法规变化动态",
                "完善内控制度体系，确保各项筹划措施合规落地执行",
                "建立专项档案管理，形成完整的筹划实施过程记录",
                "定期评估筹划效果，根据实际情况动态调整优化方案",
                "加强与税务机关沟通，及时获取政策解释和执行指导"
            ]
        },
        taxAnalysis: [
            {
                taxType: "企业所得税",
                current: "680",
                optimized: "524",
                savings: "156",
                savingsRate: "22.9%"
            },
            {
                taxType: "增值税",
                current: "485",
                optimized: "357",
                savings: "128",
                savingsRate: "26.4%"
            },
            {
                taxType: "个人所得税",
                current: "86",
                optimized: "38",
                savings: "48",
                savingsRate: "55.8%"
            },
            {
                taxType: "消费税",
                current: "28",
                optimized: "6",
                savings: "22",
                savingsRate: "78.6%"
            },
            {
                taxType: "其他税种",
                current: "10",
                optimized: "-4.5",
                savings: "14.5",
                savingsRate: "145.0%"
            }
        ],
        detailedPlanning: {
            corporateIncomeTax: {
                taxableIncomeOptimization: {
                    description: "通过系统性的应纳税所得额优化策略，在收入确认、扣除项目、资产折旧摊销等方面进行全面筹划。重点关注收入确认时点的合理选择、限额扣除项目的充分利用、固定资产折旧方法的优化选择，以及亏损弥补的统筹安排。预计通过应纳税所得额优化可实现节税68万元。",
                    revenueRecognition: [
                        {
                            type: "销售收入确认",
                            method: "优化发出商品时点",
                            savings: "15"
                        },
                        {
                            type: "劳务收入确认",
                            method: "采用完工进度法",
                            savings: "12"
                        },
                        {
                            type: "租金收入确认",
                            method: "分期收取方式",
                            savings: "8"
                        },
                        {
                            type: "政府补助收入",
                            method: "与资产相关分期确认",
                            savings: "6"
                        }
                    ],
                    deductionItems: [
                        {
                            type: "业务招待费",
                            current: "实际×60%",
                            optimized: "合理区分会议费",
                            savings: "18"
                        },
                        {
                            type: "广告费和业务宣传费",
                            current: "收入×15%",
                            optimized: "合理区分+结转",
                            savings: "12"
                        },
                        {
                            type: "公益性捐赠",
                            current: "利润总额×12%",
                            optimized: "选择全额扣除项目",
                            savings: "8"
                        },
                        {
                            type: "职工福利费",
                            current: "工资×14%",
                            optimized: "充分列支合规项目",
                            savings: "5"
                        }
                    ],
                    assetDepreciation: [
                        {
                            type: "机器设备",
                            method: "加速折旧法",
                            savings: "25"
                        },
                        {
                            type: "无形资产",
                            method: "最短摊销年限",
                            savings: "15"
                        },
                        {
                            type: "500万以下设备",
                            method: "一次性扣除",
                            savings: "12"
                        }
                    ]
                },
                highTechEnterprise: {
                    description: "华新智造科技股份有限公司完全符合高新技术企业认定条件。公司拥有发明专利28项、实用新型专利45项，软件著作权15项；研发人员占企业总人数的21.5%，超过10%的要求；近三年研发费用占营业收入比例分别为13.2%、13.8%、14.1%，均超过3%的要求；高新技术产品收入占企业同期总收入的比例为87.3%，超过60%的要求。通过高新技术企业认定，可享受15%的企业所得税优惠税率。",
                    currentRate: "25%",
                    preferentialRate: "15%",
                    savings: "68",
                    difficulty: "低",
                    conditions: [
                        {
                            requirement: "核心自主知识产权",
                            currentStatus: "发明专利28项，实用新型45项",
                            compliance: true,
                            improvement: "继续加强专利申请"
                        },
                        {
                            requirement: "研发人员占比≥10%",
                            currentStatus: "研发人员98人，占比21.5%",
                            compliance: true,
                            improvement: "保持研发团队稳定"
                        },
                        {
                            requirement: "研发费用占比≥3%",
                            currentStatus: "近三年平均占比13.7%",
                            compliance: true,
                            improvement: "建立研发费用辅助账"
                        },
                        {
                            requirement: "高新产品收入占比≥60%",
                            currentStatus: "高新产品收入占比87.3%",
                            compliance: true,
                            improvement: "完善产品技术说明"
                        },
                        {
                            requirement: "创新能力评价≥70分",
                            currentStatus: "预估评分85分",
                            compliance: true,
                            improvement: "完善评价材料准备"
                        }
                    ]
                },
                rdDeduction: {
                    description: "公司作为制造业企业，研发费用可享受100%加计扣除政策，即实际税前扣除比例为200%。2024年预计研发费用支出1.2亿元，通过规范研发费用核算体系，准确归集六大类研发费用，可获得加计扣除优惠。建议设立独立的研发费用核算体系，建立项目台账管理制度。",
                    projects: [
                        {
                            type: "新产品开发项目",
                            amount: "4800",
                            currentRate: "100%",
                            additionalRate: "100%",
                            totalRate: "200%",
                            savings: "12"
                        },
                        {
                            type: "工艺技术改进项目",
                            amount: "3600",
                            currentRate: "100%",
                            additionalRate: "100%",
                            totalRate: "200%",
                            savings: "9"
                        },
                        {
                            type: "技术服务外包项目",
                            amount: "2400",
                            currentRate: "100%",
                            additionalRate: "75%",
                            totalRate: "175%",
                            savings: "4.5"
                        },
                        {
                            type: "基础研究项目",
                            amount: "1200",
                            currentRate: "100%",
                            additionalRate: "100%",
                            totalRate: "200%",
                            savings: "3"
                        }
                    ],
                    expenseCategories: [
                        "人员人工费用：直接从事研发活动的人员工资薪金、基本养老保险费、基本医疗保险费、失业保险费、工伤保险费、生育保险费和住房公积金",
                        "直接投入费用：研发活动直接消耗的材料、燃料和动力费用；用于中间试验和产品试制的模具、工艺装备开发及制造费等",
                        "折旧摊销费用：用于研发活动的仪器、设备的折旧费；用于研发活动的软件、专利权、非专利技术等无形资产的摊销费用",
                        "无形资产摊销费用：用于研发活动的软件、专利权、非专利技术（包括许可证、专有技术、设计和计算方法等）的摊销费用",
                        "新产品设计费等：新产品设计费、新工艺规程制定费、新药研制的临床试验费、勘探开发技术的现场试验费",
                        "其他相关费用：与研发活动直接相关的其他费用，如技术图书资料费、资料翻译费、专家咨询费、高新科技研发保险费等"
                    ],
                    managementRequirements: [
                        "建立研发支出辅助账，对享受加计扣除的研发费用按研发项目设置辅助账，准确归集核算当年可加计扣除的各项研发费用实际发生额",
                        "留存备查资料：自主、委托、合作研发项目计划书和企业有权部门关于自主、委托、合作研发项目立项的决议文件",
                        "年度汇算清缴时填报《研发费用加计扣除优惠明细表》，按照规定程序申报享受研发费用加计扣除政策",
                        "企业符合条件的研发费用发生当年，在年度中间预缴申报时即可享受"
                    ]
                },
                equipmentInvestment: {
                    description: "公司计划在2025-2026年期间投资购置各类专用设备，总投资额约8500万元。其中环保专用设备投资4200万元，节能节水专用设备投资2800万元，安全生产专用设备投资1500万元。按照10%的投资抵免比例，预计可抵免企业所得税85万元。",
                    categories: [
                        {
                            name: "环境保护专用设备",
                            color: "#4caf50",
                            items: [
                                { name: "废气处理设备", investment: "1800", deduction: "18" },
                                { name: "废水处理设备", investment: "1500", deduction: "15" },
                                { name: "固废处理设备", investment: "900", deduction: "9" }
                            ],
                            totalDeduction: "42"
                        },
                        {
                            name: "节能节水专用设备",
                            color: "#2196f3",
                            items: [
                                { name: "节能电机设备", investment: "1200", deduction: "12" },
                                { name: "节水循环设备", investment: "900", deduction: "9" },
                                { name: "余热回收设备", investment: "700", deduction: "7" }
                            ],
                            totalDeduction: "28"
                        },
                        {
                            name: "安全生产专用设备",
                            color: "#ff9800",
                            items: [
                                { name: "安全监控设备", investment: "800", deduction: "8" },
                                { name: "防护救援设备", investment: "450", deduction: "4.5" },
                                { name: "应急处置设备", investment: "250", deduction: "2.5" }
                            ],
                            totalDeduction: "15"
                        }
                    ]
                },
                technologyTransfer: {
                    description: "公司拥有多项核心技术和专利，可通过技术转让获得税收优惠。技术转让所得不超过500万元的部分免征企业所得税，超过500万元的部分减半征收。建议将大额技术转让分拆为多次小额转让，最大化享受免税优惠。",
                    transfers: [
                        {
                            technology: "智能制造控制系统",
                            amount: "800",
                            exemptAmount: "500",
                            halfRateAmount: "300",
                            savings: "16.25"
                        },
                        {
                            technology: "精密加工工艺技术",
                            amount: "600",
                            exemptAmount: "500",
                            halfRateAmount: "100",
                            savings: "13.75"
                        },
                        {
                            technology: "质量检测算法软件",
                            amount: "400",
                            exemptAmount: "400",
                            halfRateAmount: "0",
                            savings: "10"
                        }
                    ]
                }
            },
            valueAddedTax: {
                taxpayerStatus: {
                    description: "通过分析公司各项业务的增值率水平和客户结构，优化纳税人身份选择。对于增值率较低的委托加工业务，建议设立独立的小规模纳税人主体；对于技术服务和出口业务，保持一般纳税人身份以充分享受进项抵扣和出口退税优惠。",
                    businessTypes: [
                        {
                            name: "产品销售业务",
                            valueAddedRate: "42%",
                            breakEvenRate: "23.08%",
                            recommendedStatus: "一般纳税人",
                            taxRate: "13%",
                            savings: "0"
                        },
                        {
                            name: "技术服务业务",
                            valueAddedRate: "68%",
                            breakEvenRate: "50%",
                            recommendedStatus: "一般纳税人",
                            taxRate: "6%",
                            savings: "15"
                        },
                        {
                            name: "委托加工业务",
                            valueAddedRate: "18%",
                            breakEvenRate: "23.08%",
                            recommendedStatus: "小规模纳税人",
                            taxRate: "3%",
                            savings: "28"
                        },
                        {
                            name: "设备租赁业务",
                            valueAddedRate: "35%",
                            breakEvenRate: "23.08%",
                            recommendedStatus: "一般纳税人",
                            taxRate: "13%",
                            savings: "8"
                        }
                    ]
                },
                taxRateOptimization: {
                    description: "通过合理的业务模式设计和合同安排，优化增值税税率适用。重点关注混合销售与兼营业务的区分，通过业务分离和主体分离降低综合税负。建议将货物销售与技术服务分别签署合同，避免按高税率征收。",
                    mixedSales: [
                        {
                            business: "设备销售+安装服务",
                            currentApproach: "混合销售按13%征收",
                            optimizedApproach: "分别签署合同分别计税",
                            savings: "18"
                        },
                        {
                            business: "软件销售+技术支持",
                            currentApproach: "混合销售按13%征收",
                            optimizedApproach: "技术服务单独核算按6%",
                            savings: "12"
                        },
                        {
                            business: "产品销售+培训服务",
                            currentApproach: "混合销售按13%征收",
                            optimizedApproach: "培训服务分离按6%",
                            savings: "8"
                        }
                    ],
                    businessModelDesign: [
                        "设立不同主体分别从事不同税率业务，实现税率优化",
                        "合理设计合同条款，明确区分货物销售和服务提供",
                        "建立独立的技术服务公司，专门从事6%税率业务",
                        "优化业务流程，将混合销售分解为单独的销售行为"
                    ]
                },
                inputTaxOptimization: {
                    description: "建立完善的进项税额管理体系，最大化进项税额抵扣。重点加强供应商管理，确保取得合规的增值税专用发票；合理安排采购时点，优化进项税额认证抵扣时间；充分利用特殊抵扣政策，提高整体抵扣水平。",
                    measures: [
                        {
                            title: "供应商优化管理",
                            description: "建立供应商资质审查机制，优先选择能够提供增值税专用发票的供应商，建立供应商评估和准入体系",
                            effect: "提高抵扣比例8个百分点"
                        },
                        {
                            title: "采购时点统筹",
                            description: "合理安排大宗采购时间，统筹考虑进项税额认证抵扣时限，优化现金流管理",
                            effect: "提高资金使用效率15%"
                        },
                        {
                            title: "业务模式优化",
                            description: "合理划分货物销售和服务提供，避免进项税额转出，最大化税前抵扣",
                            effect: "减少转出损失12万元"
                        }
                    ],
                    specialDeductions: [
                        {
                            type: "农产品进项抵扣",
                            condition: "购进用于生产13%税率货物",
                            rate: "10%",
                            amount: "8"
                        },
                        {
                            type: "不动产进项抵扣",
                            condition: "2016年5月1日后取得",
                            rate: "一次性抵扣",
                            amount: "15"
                        },
                        {
                            type: "旅客运输服务",
                            condition: "取得合规票据",
                            rate: "9%或3%",
                            amount: "3"
                        }
                    ]
                },
                exemptionPolicies: {
                    description: "充分利用增值税免税和即征即退政策，降低实际税负。重点关注技术转让免税、软件产品即征即退等优惠政策的适用条件和申请程序，确保合规享受优惠。",
                    exemptions: [
                        {
                            item: "技术转让",
                            business: "专利技术许可使用",
                            savings: "25"
                        },
                        {
                            item: "技术开发",
                            business: "委托技术开发服务",
                            savings: "18"
                        },
                        {
                            item: "技术咨询",
                            business: "与技术转让相关的咨询",
                            savings: "8"
                        }
                    ],
                    refunds: [
                        {
                            product: "嵌入式软件产品",
                            rate: "实际税负超3%部分100%退还",
                            amount: "12"
                        },
                        {
                            product: "资源综合利用产品",
                            rate: "70%即征即退",
                            amount: "8"
                        }
                    ]
                },
                exportTaxRefund: {
                    description: "公司出口业务占比35%，可充分利用出口退税政策降低税负。当前出口退税率为13%，通过优化出口时机、贸易方式和退税申报管理，可最大化退税效益。建议建立出口退税专项管理制度。",
                    products: [
                        {
                            name: "精密机械设备",
                            exportAmount: "18500",
                            refundRate: "13%",
                            method: "免抵退税法",
                            refundAmount: "240.5"
                        },
                        {
                            name: "智能控制系统",
                            exportAmount: "12800",
                            refundRate: "13%",
                            method: "免抵退税法",
                            refundAmount: "166.4"
                        },
                        {
                            name: "配套零部件",
                            exportAmount: "8600",
                            refundRate: "9%",
                            method: "免抵退税法",
                            refundAmount: "77.4"
                        }
                    ],
                    optimizationStrategies: [
                        "建立出口退税管理制度，确保单证齐全、申报及时",
                        "关注退税率调整动态，合理安排出口时机",
                        "优化贸易方式选择，提高退税效益",
                        "加强与海关、外汇管理部门的数据匹配",
                        "建立出口退税台账，实现精细化管理"
                    ]
                }
            },
            personalIncomeTax: {
                salaryOptimization: {
                    description: "通过系统性的薪酬结构设计，合理利用个人所得税优惠政策，降低员工个税负担。重点优化工资薪金与福利性收入的配比，充分利用专项附加扣除政策，合理安排年终奖发放策略。",
                    before: [
                        { item: "基本工资", amount: "2880万元", tax: "348万元" },
                        { item: "绩效奖金", amount: "1920万元", tax: "258万元" },
                        { item: "年终奖", amount: "1280万元", tax: "186万元" },
                        { item: "其他补贴", amount: "320万元", tax: "48万元" },
                        { item: "合计", amount: "6400万元", tax: "840万元" }
                    ],
                    after: [
                        { item: "基本工资", amount: "2400万元", tax: "225万元" },
                        { item: "绩效奖金", amount: "1600万元", tax: "168万元" },
                        { item: "年终奖", amount: "960万元", tax: "108万元" },
                        { item: "企业年金", amount: "480万元", tax: "0万元" },
                        { item: "福利补贴", amount: "960万元", tax: "0万元" },
                        { item: "合计", amount: "6400万元", tax: "501万元" }
                    ],
                    specialDeductions: [
                        {
                            item: "子女教育",
                            standard: "每子女每月1000元",
                            current: "部分员工未申报",
                            optimized: "全员申报优化",
                            savings: "12"
                        },
                        {
                            item: "继续教育",
                            standard: "每月300-400元",
                            current: "覆盖率30%",
                            optimized: "覆盖率提升至80%",
                            savings: "8"
                        },
                        {
                            item: "住房贷款利息",
                            standard: "每月1000元",
                            current: "覆盖率45%",
                            optimized: "符合条件的全部申报",
                            savings: "15"
                        },
                        {
                            item: "赡养老人",
                            standard: "每月2000元",
                            current: "覆盖率40%",
                            optimized: "符合条件的全部申报",
                            savings: "18"
                        }
                    ]
                },
                businessIncome: {
                    description: "针对公司高管和技术骨干，通过设立个人独资企业或合伙企业的方式，将部分劳动所得转化为经营所得，利用个人所得税税率差异实现节税。重点考虑核定征收政策的适用，合理确定应税所得率。",
                    entityComparison: [
                        {
                            item: "适用税率",
                            soleProprietorship: "5%-35%",
                            corporation: "25%+20%"
                        },
                        {
                            item: "重复征税",
                            soleProprietorship: "无",
                            corporation: "双重征税"
                        },
                        {
                            item: "税前扣除",
                            soleProprietorship: "费用扣除相对灵活",
                            corporation: "费用扣除限制较多"
                        },
                        {
                            item: "适用场景",
                            soleProprietorship: "技术服务、咨询业务",
                            corporation: "大规模经营业务"
                        }
                    ],
                    assessmentMethods: [
                        {
                            method: "查账征收",
                            condition: "账证健全",
                            taxBurden: "按实际利润×税率",
                            recommended: false
                        },
                        {
                            method: "核定征收",
                            condition: "符合核定条件",
                            taxBurden: "收入×应税所得率×税率",
                            recommended: true
                        }
                    ]
                },
                capitalGains: {
                    description: "通过合理的股权投资和转让安排，优化资本利得税负。重点关注股权转让时机选择、转让价格确定和分期转让等策略，充分利用股息红利差别化税收政策。",
                    equityTransfer: [
                        {
                            plan: "分期转让方案",
                            method: "分年度转让股权",
                            taxImpact: "避免高税率级距",
                            savings: "25"
                        },
                        {
                            plan: "转让时机选择",
                            method: "选择适当转让时点",
                            taxImpact: "利用税收政策变化",
                            savings: "15"
                        },
                        {
                            plan: "价格确定优化",
                            method: "合理确定转让价格",
                            taxImpact: "在合规前提下优化",
                            savings: "8"
                        }
                    ],
                    dividendIncome: [
                        {
                            holdingPeriod: "1个月以内",
                            taxRate: "20%",
                            strategy: "避免短期持股"
                        },
                        {
                            holdingPeriod: "1个月至1年",
                            taxRate: "10%",
                            strategy: "适度延长持股期"
                        },
                        {
                            holdingPeriod: "超过1年",
                            taxRate: "免税",
                            strategy: "优先选择长期持股"
                        }
                    ]
                },
                otherIncome: {
                    description: "对于劳务报酬、稿酬、特许权使用费等其他各项所得，通过合理安排收入确认时间和方式，优化税负水平。重点关注劳务报酬的分次取得和稿酬所得的优惠政策。",
                    types: [
                        {
                            incomeType: "劳务报酬所得",
                            taxRate: "20%-40%",
                            strategy: "分次提供劳务",
                            method: "避免单次收入过高",
                            savings: "12"
                        },
                        {
                            incomeType: "稿酬所得",
                            taxRate: "20%×70%",
                            strategy: "合理利用稿酬优惠",
                            method: "区分稿酬与特许权使用费",
                            savings: "8"
                        },
                        {
                            incomeType: "特许权使用费",
                            taxRate: "20%",
                            strategy: "分期取得收入",
                            method: "合理安排确认时间",
                            savings: "6"
                        }
                    ]
                }
            },
            consumptionTax: {
                taxScopeOptimization: {
                    description: "通过产品设计优化和生产工艺改进，合理规避或减少消费税征收。重点关注产品分类和定价策略，避免触及消费税征收范围，或通过技术改进降低适用税率。",
                    products: [
                        {
                            category: "高档化妆品原料",
                            currentRate: "15%",
                            strategy: "产品设计优化",
                            solution: "改为中档产品规避消费税",
                            savings: "12"
                        },
                        {
                            category: "小汽车零部件",
                            currentRate: "按整车税率",
                            strategy: "产品分类优化",
                            solution: "独立销售零部件",
                            savings: "8"
                        },
                        {
                            category: "电池产品",
                            currentRate: "4%",
                            strategy: "生产工艺改进",
                            solution: "采用环保工艺",
                            savings: "2"
                        }
                    ]
                },
                taxBaseOptimization: {
                    description: "通过优化计税依据确定方法，合理降低消费税税负。重点关注自产自用和委托加工业务的计税价格确定，通过成本核算优化和定价体系建立实现节税。",
                    selfUse: [
                        {
                            method: "同类产品价格法",
                            current: "按市场最高价",
                            optimized: "按合理同类价格",
                            savings: "6"
                        },
                        {
                            method: "组成计税价格法",
                            current: "成本利润率偏高",
                            optimized: "合理确定利润率",
                            savings: "4"
                        }
                    ],
                    commissionProcessing: [
                        {
                            method: "委托加工",
                            taxBurden: "较低",
                            optimization: "优先选择委托加工"
                        },
                        {
                            method: "自产",
                            taxBurden: "较高",
                            optimization: "大规模生产时选择"
                        }
                    ]
                },
                comprehensiveStrategy: {
                    description: "综合运用产品结构调整、生产环节选择、销售模式优化等策略，实现消费税的系统性筹划。重点关注出口免税政策的充分利用和内销外销的合理安排。",
                    strategies: [
                        {
                            title: "产品结构调整",
                            color: "#e74c3c",
                            measures: [
                                "避免或减少消费税应税特征的产品设计",
                                "合理确定产品归类，选择较低税率档次",
                                "考虑消费税对终端价格的影响进行定价"
                            ],
                            savings: "15"
                        },
                        {
                            title: "生产环节选择",
                            color: "#3498db",
                            measures: [
                                "综合考虑税负和成本选择自产vs委托加工",
                                "利用区域性优惠政策选择生产地",
                                "优化生产工艺降低税负"
                            ],
                            savings: "5"
                        },
                        {
                            title: "销售模式优化",
                            color: "#27ae60",
                            measures: [
                                "分析不同销售模式下的税负差异",
                                "充分利用出口免税政策",
                                "针对不同市场制定产品策略"
                            ],
                            savings: "2"
                        }
                    ]
                }
            },
            otherTaxes: {
                stampTax: {
                    description: "通过合理的合同设计和签署安排，优化印花税负担。重点关注不同合同类型的税率差异，通过合同条款设计和签署方式选择实现节税。",
                    contracts: [
                        {
                            type: "购销合同",
                            rate: "万分之三",
                            strategy: "合理确定合同金额",
                            method: "分项列示不同税率项目",
                            savings: "3.5"
                        },
                        {
                            type: "技术合同",
                            rate: "免税",
                            strategy: "技术转让合同免税",
                            method: "将技术咨询纳入转让范围",
                            savings: "2.8"
                        },
                        {
                            type: "借款合同",
                            rate: "万分之零点五",
                            strategy: "优化融资方式",
                            method: "选择较低税率的融资工具",
                            savings: "1.2"
                        }
                    ]
                },
                landValueAddedTax: {
                    description: "对于公司涉及的房地产开发项目，通过增值率控制和扣除项目优化，降低土地增值税负担。重点关注清算时点选择和成本费用的充分扣除。",
                    rateControl: [
                        {
                            range: "不超过50%",
                            rate: "30%",
                            measure: "控制在第一档税率"
                        },
                        {
                            range: "50%-100%",
                            rate: "40%",
                            measure: "避免跨越临界点"
                        },
                        {
                            range: "100%-200%",
                            rate: "50%",
                            measure: "通过成本调整控制"
                        }
                    ],
                    deductionOptimization: [
                        {
                            item: "土地使用权成本",
                            optimization: "按实际支付金额扣除",
                            effect: "充分扣除相关税费"
                        },
                        {
                            item: "开发成本",
                            optimization: "完整归集开发费用",
                            effect: "最大化成本扣除"
                        },
                        {
                            item: "开发费用",
                            optimization: "选择有利的扣除方式",
                            effect: "按实扣除vs按比例扣除"
                        }
                    ]
                },
                resourceTax: {
                    description: "对于公司涉及的资源开采业务，充分利用资源税优惠政策，选择合适的计税方式，实现税负优化。",
                    resources: [
                        {
                            type: "矿物原料",
                            method: "从价计征",
                            policy: "资源综合利用",
                            reduction: "减征30%",
                            savings: "4.5"
                        },
                        {
                            type: "伴生天然气",
                            method: "从量计征",
                            policy: "伴产天然气免税",
                            reduction: "100%",
                            savings: "2.8"
                        }
                    ]
                },
                landUseTax: {
                    description: "通过土地用途规划优化和减免政策申请，降低城镇土地使用税负担。重点关注直接用于生产的土地免税政策和其他减免条件的符合。",
                    exemptions: [
                        {
                            type: "直接生产用地",
                            condition: "用于农林牧渔业生产",
                            reduction: "免征",
                            savings: "3.2"
                        },
                        {
                            type: "绿化用地",
                            condition: "厂区绿化地带",
                            reduction: "免征",
                            savings: "1.8"
                        },
                        {
                            type: "仓储设施用地",
                            condition: "大宗商品仓储",
                            reduction: "减半征收",
                            savings: "2.2"
                        }
                    ],
                    landUseOptimization: [
                        {
                            type: "工业用地",
                            rate: "基准税额",
                            suggestion: "集约利用提高效率"
                        },
                        {
                            type: "商业用地",
                            rate: "较高税额",
                            suggestion: "适度配置商业用地"
                        }
                    ]
                }
            }
        },
        riskAssessment: {
            overallScore: 8.4,
            categories: [
                {
                    name: "政策风险",
                    score: 7.8,
                    level: "中",
                    description: "税收政策可能发生变化，影响筹划方案的有效性和持续性",
                    controlMeasures: [
                        "建立政策跟踪机制，定期关注税收法规变化动态",
                        "制定政策变化应急预案，准备多套备选筹划方案",
                        "与税务机关保持良好沟通，及时了解政策执行导向",
                        "聘请专业税务顾问，获取权威政策解读和指导"
                    ]
                },
                {
                    name: "操作风险",
                    score: 8.6,
                    level: "低",
                    description: "筹划方案实施过程中可能出现的操作失误和执行偏差风险",
                    controlMeasures: [
                        "建立标准化操作流程，明确各环节责任分工和时间节点",
                        "加强人员专业培训，提升税务筹划操作能力和合规意识",
                        "建立多级复核机制，确保筹划方案执行的准确性",
                        "定期开展内部审计，及时发现和纠正操作偏差"
                    ]
                },
                {
                    name: "合规风险",
                    score: 8.9,
                    level: "低",
                    description: "筹划方案可能面临的税法合规性质疑和税务稽查风险",
                    controlMeasures: [
                        "严格按照现行税收法律法规设计和执行筹划方案",
                        "建立完整的筹划过程记录和支撑材料档案管理",
                        "定期进行合规性自查，主动识别和防范合规风险",
                        "与专业机构合作，获取第三方合规性认证和评估"
                    ]
                },
                {
                    name: "执行风险",
                    score: 7.9,
                    level: "中",
                    description: "筹划方案执行不到位、落实不彻底导致预期效果不能实现的风险",
                    controlMeasures: [
                        "制定详细的实施计划和时间表，明确关键节点和里程碑",
                        "建立项目管理机制，设专人负责筹划方案的组织实施",
                        "建立监控和反馈机制，定期评估执行进度和效果",
                        "建立激励约束机制，确保各部门积极配合筹划实施"
                    ]
                },
                {
                    name: "技术风险",
                    score: 8.8,
                    level: "低",
                    description: "信息系统和技术手段支撑不足导致的筹划管理风险",
                    controlMeasures: [
                        "升级财务管理系统，提升税务筹划的信息化支撑能力",
                        "建立数据备份和安全机制，确保筹划数据安全可靠",
                        "加强技术培训，提升人员系统操作和维护能力",
                        "建立技术支持体系，及时解决系统技术问题"
                    ]
                },
                {
                    name: "市场风险",
                    score: 7.6,
                    level: "中",
                    description: "市场环境变化对筹划方案有效性产生的不利影响风险",
                    controlMeasures: [
                        "密切关注行业发展趋势，及时调整筹划策略",
                        "建立市场风险预警机制，提前识别和应对市场变化",
                        "制定灵活的筹划方案，增强对市场变化的适应性",
                        "多元化经营策略，降低单一市场依赖风险"
                    ]
                },
                {
                    name: "财务风险",
                    score: 8.5,
                    level: "低",
                    description: "筹划实施对企业财务状况和现金流产生的潜在不利影响",
                    controlMeasures: [
                        "合理安排筹划投入和收益的时间匹配，确保现金流稳定",
                        "建立财务风险监控指标，定期评估财务状况变化",
                        "预留充足的风险准备金，应对筹划实施的不确定性",
                        "优化资金管理，提高资金使用效率和周转速度"
                    ]
                },
                {
                    name: "法律风险",
                    score: 8.2,
                    level: "低",
                    description: "筹划方案可能面临的法律法规适用和解释争议风险",
                    controlMeasures: [
                        "聘请专业法律顾问，确保筹划方案的法律合规性",
                        "建立法律风险评估机制，提前识别潜在法律争议",
                        "加强合同和协议管理，明确各方权利义务关系",
                        "建立争议解决机制，及时处理可能出现的法律纠纷"
                    ]
                }
            ]
        },
        implementationPlan: {
            phases: [
                {
                    id: 1,
                    name: "第一阶段（1-4个月）",
                    timeline: "立即启动，最高优先级",
                    tasks: [
                        "启动高新技术企业认定申请，准备全套申报材料",
                        "建立研发费用核算辅助账体系，完善费用归集制度",
                        "设立个人独资企业，优化高管薪酬结构设计",
                        "完善财务管理制度，建立税收筹划内控体系",
                        "开展全员税务筹划专项培训，提升合规意识"
                    ],
                    savings: "145"
                },
                {
                    id: 2,
                    name: "第二阶段（5-9个月）",
                    timeline: "稳步推进，高优先级",
                    tasks: [
                        "申请设备投资抵免优惠，完成专用设备采购",
                        "优化增值税纳税人身份，设立小规模纳税人主体",
                        "实施技术转让筹划，合理安排转让时间和金额",
                        "建立出口退税管理制度，优化出口业务安排",
                        "申请各类税种减免认定，完善申报材料"
                    ],
                    savings: "158"
                },
                {
                    id: 3,
                    name: "第三阶段（10-15个月）",
                    timeline: "巩固完善，持续优化",
                    tasks: [
                        "全面评估筹划实施效果，对比预期目标完成情况",
                        "建立长期税务管理机制，形成标准化操作流程",
                        "持续优化和调整筹划方案，适应政策环境变化",
                        "建立税收筹划绩效考核体系，激励持续改进",
                        "总结筹划经验教训，形成企业税务管理制度"
                    ],
                    savings: "65.5"
                }
            ],
            milestones: [
                {
                    date: "2025年9月",
                    description: "完成高新技术企业认定，正式获得15%优惠税率证书"
                },
                {
                    date: "2025年11月",
                    description: "研发费用核算体系全面建立，开始享受100%加计扣除优惠"
                },
                {
                    date: "2026年1月",
                    description: "个人独资企业正式运营，高管薪酬结构优化完成"
                },
                {
                    date: "2026年4月",
                    description: "设备投资抵免申请获批，环保节能设备投资抵免生效"
                },
                {
                    date: "2026年7月",
                    description: "增值税纳税人身份优化完成，小规模纳税人主体开始运营"
                },
                {
                    date: "2026年10月",
                    description: "全部筹划方案实施完成，实现预期节税目标368.5万元"
                }
            ]
        },
        recommendations: {
            coreRecommendation: "建议华新智造科技股份有限公司采用系统性、分阶段的税收筹划实施策略。优先推进高新技术企业认定和研发费用加计扣除两项核心措施，预计可实现年度节税368.5万元，综合税负率降低4.3个百分点。同时建立完善的风险防控机制，确保所有筹划措施在合法合规框架内实施，形成可持续的税务管理体系。",
            priorities: [
                "最高优先级：高新技术企业认定申请，预期节税68万元，必须在3个月内完成申报",
                "最高优先级：研发费用核算体系建立，预期节税28.5万元，需要2个月完善制度",
                "高优先级：个人独资企业设立，预期节税35万元，需要4个月完成设立和运营",
                "高优先级：增值税纳税人身份优化，预期节税51万元，需要6个月实施完成",
                "中优先级：设备投资抵免申请，预期节税85万元，需要8个月完成设备采购",
                "中优先级：技术转让筹划实施，预期节税40万元，需要分批次安排转让",
                "低优先级：其他税种优惠申请，预期节税51万元，可分年度逐步实施"
            ],
            considerations: [
                "密切关注税收政策变化，特别是高新技术企业、研发费用加计扣除等核心优惠政策的调整动向",
                "确保研发费用归集的准确性和完整性，建立规范的项目台账和费用分配体系",
                "加强与税务机关的沟通协调，及时咨询政策适用问题，避免理解偏差和执行风险",
                "建立完善的内控制度和风险预警机制，定期评估筹划方案的合规性和有效性",
                "保持财务记录的完整性和规范性，为可能的税务检查做好充分准备",
                "合理安排筹划实施的节奏和时序，避免集中实施带来的操作风险和资金压力",
                "建立专业的税务管理团队，配备必要的人力和技术资源支撑筹划实施"
            ],
            expectedResults: {
                totalSavings: "368.5",
                savingsRate: "28.6%",
                implementationPeriod: "15个月"
            }
        }
    };
};