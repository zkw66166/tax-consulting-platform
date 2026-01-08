// src/report/FinancialDueDiligenceReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>财务尽职调查报告</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif;
            line-height: 1.8;
            color: #2c3e50;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            background: #ffffff;
        }
        
        .header {
            text-align: center;
            border-bottom: 4px solid #3498db;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 40px 30px 30px;
            border-radius: 8px;
        }
        
        .header h1 {
            color: #2c3e50;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .header .subtitle {
            color: #7f8c8d;
            font-size: 16px;
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
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: 1px solid #e9ecef;
        }
        
        .info-card h3 {
            color: #2c3e50;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 2px solid #ecf0f1;
        }
        
        .info-card p {
            margin: 10px 0;
            padding: 5px 0;
            border-bottom: 1px dotted #bdc3c7;
            display: flex;
            justify-content: space-between;
        }
        
        .info-card p:last-child {
            border-bottom: none;
        }
        
        .section {
            margin-bottom: 50px;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .section-header {
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
            color: white;
            padding: 25px 30px;
            margin-bottom: 0;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .section-content {
            padding: 30px;
        }
        
        .subsection {
            margin-bottom: 35px;
            background: #f8f9fa;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #e9ecef;
        }
        
        .subsection-header {
            background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
            color: white;
            padding: 15px 25px;
            font-size: 18px;
            font-weight: 600;
        }
        
        .subsection-content {
            padding: 25px;
        }
        
        .analysis-item {
            margin-bottom: 25px;
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.08);
            border-top: 5px solid #3498db;
            position: relative;
        }
        
        .analysis-item::before {
            content: "▶";
            position: absolute;
            left: 25px;
            top: 25px;
            color: #3498db;
            font-size: 14px;
            font-weight: bold;
        }
        
        .analysis-item h4 {
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 20px;
            padding-bottom: 8px;
            border-bottom: 2px solid #ecf0f1;
        }
        
        .analysis-item p {
            text-align: justify;
            margin-bottom: 15px;
            text-indent: 2em;
            position: relative;
        }
        
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin: 20px 0;
        }
        
        .grid-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        
        .highlight-card {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #2196f3;
        }
        
        .highlight-card h3 {
            color: #1976d2;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .highlight-card .value {
            color: #0d47a1;
            font-size: 28px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .risk-low { 
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); 
            border-top-color: #4caf50;
        }
        
        .risk-low::before {
            color: #4caf50;
            content: "✓";
        }
        
        .risk-medium { 
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); 
            border-top-color: #ff9800;
        }
        
        .risk-medium::before {
            color: #ff9800;
            content: "⚠";
        }
        
        .risk-high { 
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); 
            border-top-color: #f44336;
        }
        
        .risk-high::before {
            color: #f44336;
            content: "⚡";
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin: 25px 0;
        }
        
        .metric-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #ecf0f1;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: transform 0.3s ease;
            position: relative;
        }
        
        .metric-card::before {
            content: "●";
            position: absolute;
            top: 10px;
            right: 15px;
            color: #3498db;
            font-size: 12px;
        }
        
        .metric-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        
        .metric-card h5 {
            color: #7f8c8d;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .metric-card .value {
            color: #2c3e50;
            font-size: 24px;
            font-weight: 700;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        th {
            background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
            color: white;
            padding: 15px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
            position: relative;
        }
        
        th::after {
            content: "♦";
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 10px;
            opacity: 0.7;
        }
        
        td {
            border-bottom: 1px solid #ecf0f1;
            padding: 12px 15px;
            text-align: center;
            position: relative;
        }
        
        tr:hover {
            background: #f8f9fa;
        }
        
        .two-column {
            columns: 2;
            column-gap: 40px;
            text-align: justify;
        }
        
        .feature-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }
        
        .feature-box::before {
            content: "▣";
            position: absolute;
            top: 15px;
            left: 20px;
            color: #6c757d;
            font-size: 16px;
        }
        
        .feature-box h4 {
            color: #495057;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 25px;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 2px solid #ced4da;
        }
        
        ul {
            padding-left: 25px;
            margin: 15px 0;
        }
        
        li {
            margin-bottom: 8px;
            text-align: justify;
            position: relative;
        }
        
        li::before {
            content: "◆";
            position: absolute;
            left: -20px;
            color: #3498db;
            font-size: 8px;
            top: 0.6em;
        }
        
        .conclusion-section {
            background: linear-gradient(135deg, #f1f8ff 0%, #deecff 100%);
            border: 3px solid #4dabf7;
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
        }
        
        .conclusion-section::before {
            content: "★";
            position: absolute;
            top: 20px;
            right: 25px;
            color: #4dabf7;
            font-size: 20px;
        }
        
        .footer {
            border-top: 3px solid #dee2e6;
            padding-top: 25px;
            margin-top: 40px;
            font-size: 12px;
            color: #868e96;
            text-align: center;
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            position: relative;
        }
        
        .footer::before {
            content: "ⓘ";
            position: absolute;
            top: 15px;
            left: 20px;
            color: #6c757d;
            font-size: 14px;
        }
        
        .footer p {
            margin: 8px 0;
            line-height: 1.6;
        }
        
        /* 段落编号样式 */
        .paragraph-number {
            display: inline-block;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            text-align: center;
            line-height: 24px;
            font-size: 12px;
            font-weight: bold;
            margin-right: 10px;
            vertical-align: top;
        }
        
        /* 特殊标记样式 */
        .highlight-text {
            background: linear-gradient(120deg, #a8e6cf 0%, #88d8a3 100%);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
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
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>财务尽职调查报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>📋 目标公司信息</h3>
            <p><strong>公司名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>统一社会信用代码</strong><span>${reportData.companyInfo.registrationNumber}</span></p>
            <p><strong>成立日期</strong><span>${reportData.companyInfo.establishedDate}</span></p>
            <p><strong>注册资本</strong><span>${reportData.companyInfo.registeredCapital}</span></p>
            <p><strong>法定代表人</strong><span>${reportData.companyInfo.legalRepresentative}</span></p>
            <p><strong>所属行业</strong><span>${reportData.companyInfo.industry}</span></p>
        </div>
        <div class="info-card">
            <h3>📊 报告信息</h3>
            <p><strong>报告日期</strong><span>${reportData.reportInfo.reportDate}</span></p>
            <p><strong>调查期间</strong><span>${reportData.reportInfo.reportPeriod}</span></p>
            <p><strong>审计机构</strong><span>${reportData.reportInfo.auditFirm}</span></p>
            <p><strong>项目团队</strong><span>${reportData.reportInfo.projectTeam}</span></p>
            <p><strong>报告编号</strong><span>${reportData.reportInfo.reportNumber}</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🎯 执行摘要</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                <div class="highlight-card">
                    <h3>综合评级</h3>
                    <div class="value">${reportData.executiveSummary.overallRating}</div>
                </div>
                <div class="highlight-card">
                    <h3>投资建议</h3>
                    <div class="value" style="font-size: 20px;">${reportData.executiveSummary.investmentRecommendation}</div>
                </div>
                <div class="highlight-card">
                    <h3>风险等级</h3>
                    <div class="value" style="font-size: 20px;">${reportData.executiveSummary.riskLevel}</div>
                </div>
            </div>
            
            <div class="grid-2">
                <div class="analysis-item risk-low">
                    <h4>主要优势</h4>
                    <ul>
                        ${reportData.executiveSummary.keyStrengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-item risk-high">
                    <h4>主要风险</h4>
                    <ul>
                        ${reportData.executiveSummary.keyRisks.map(risk => `<li>${risk}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="feature-box">
                <h4>估值分析</h4>
                <p style="text-align: center; font-size: 18px;">
                    <span class="highlight-text">推荐估值: ${reportData.executiveSummary.valuationRange.recommended}亿元</span><br>
                    <span style="color: #7f8c8d;">（估值区间: ${reportData.executiveSummary.valuationRange.low}-${reportData.executiveSummary.valuationRange.high}亿元）</span>
                </p>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📈 财务概况分析</h2>
        </div>
        <div class="section-content">
            <div class="grid-2">
                <div class="feature-box">
                    <h4>营业收入趋势（亿元）</h4>
                    <table>
                        <tr><th>年份</th><th>收入</th><th>增长率</th></tr>
                        ${reportData.financialHighlights.revenue.map(item => `
                            <tr>
                                <td>${item.year}年</td>
                                <td>${item.value}亿</td>
                                <td style="color: ${item.growth ? '#27ae60' : '#95a5a6'};">${item.growth ? '+' + item.growth + '%' : '-'}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                <div class="feature-box">
                    <h4>净利润情况（亿元）</h4>
                    <table>
                        <tr><th>年份</th><th>净利润</th><th>利润率</th></tr>
                        ${reportData.financialHighlights.netProfit.map(item => `
                            <tr>
                                <td>${item.year}年</td>
                                <td>${item.value}亿</td>
                                <td style="color: #3498db;">${item.margin}%</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🔍 详细财务分析</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 历史财务表现分析</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>收入分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.historicalPerformance.revenueAnalysis}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>收入增长率</h5>
                                <div class="value">${reportData.detailedAnalysis.historicalPerformance.keyMetrics.revenueGrowth}</div>
                            </div>
                            <div class="metric-card">
                                <h5>净利润率</h5>
                                <div class="value">${reportData.detailedAnalysis.historicalPerformance.keyMetrics.profitMargin}</div>
                            </div>
                            <div class="metric-card">
                                <h5>资产收益率</h5>
                                <div class="value">${reportData.detailedAnalysis.historicalPerformance.keyMetrics.roa}</div>
                            </div>
                            <div class="metric-card">
                                <h5>净资产收益率</h5>
                                <div class="value">${reportData.detailedAnalysis.historicalPerformance.keyMetrics.roe}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>盈利能力分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.historicalPerformance.profitabilityAnalysis}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>增长趋势分析</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.historicalPerformance.growthTrends}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 资产质量评估</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>流动资产质量</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.assetQuality.currentAssets}</p>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>应收账款分析</h4>
                            <div class="metrics-grid" style="grid-template-columns: 1fr 1fr;">
                                <div class="metric-card">
                                    <h5>应收账款总额</h5>
                                    <div class="value" style="font-size: 18px;">${reportData.detailedAnalysis.assetQuality.receivablesAnalysis.total}</div>
                                </div>
                                <div class="metric-card">
                                    <h5>周转率</h5>
                                    <div class="value" style="font-size: 18px;">${reportData.detailedAnalysis.assetQuality.receivablesAnalysis.turnoverRatio}</div>
                                </div>
                            </div>
                            <p style="text-align: center; margin-top: 15px;">
                                一年以内账龄: <span class="highlight-text">${reportData.detailedAnalysis.assetQuality.receivablesAnalysis.within1Year}</span> | 
                                一年以上账龄: <span style="background: #ffebee; color: #c62828; padding: 2px 6px; border-radius: 4px;">${reportData.detailedAnalysis.assetQuality.receivablesAnalysis.over1Year}</span>
                            </p>
                        </div>
                        
                        <div class="analysis-item">
                            <h4>存货分析</h4>
                            <div class="metrics-grid" style="grid-template-columns: 1fr 1fr;">
                                <div class="metric-card">
                                    <h5>存货总额</h5>
                                    <div class="value" style="font-size: 18px;">${reportData.detailedAnalysis.assetQuality.inventoryAnalysis.total}</div>
                                </div>
                                <div class="metric-card">
                                    <h5>周转率</h5>
                                    <div class="value" style="font-size: 18px;">${reportData.detailedAnalysis.assetQuality.inventoryAnalysis.turnoverRatio}</div>
                                </div>
                            </div>
                            <p style="text-align: center; margin-top: 15px;">
                                减值准备: <span style="background: #fff3e0; color: #ef6c00; padding: 2px 6px; border-radius: 4px;">${reportData.detailedAnalysis.assetQuality.inventoryAnalysis.provisions}</span>
                            </p>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>固定资产评估</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.assetQuality.fixedAssets}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>资产使用效率</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.assetQuality.assetUtilization}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 负债和或有负债识别</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>债务结构概览</h4>
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>短期债务</h5>
                                <div class="value" style="font-size: 20px;">${reportData.detailedAnalysis.liabilityAssessment.debtStructure.shortTermDebt}</div>
                            </div>
                            <div class="metric-card">
                                <h5>长期债务</h5>
                                <div class="value" style="font-size: 20px;">${reportData.detailedAnalysis.liabilityAssessment.debtStructure.longTermDebt}</div>
                            </div>
                            <div class="metric-card">
                                <h5>总债务</h5>
                                <div class="value" style="font-size: 20px;">${reportData.detailedAnalysis.liabilityAssessment.debtStructure.totalDebt}</div>
                            </div>
                            <div class="metric-card">
                                <h5>资产负债率</h5>
                                <div class="value" style="font-size: 20px;">${reportData.detailedAnalysis.liabilityAssessment.debtStructure.debtToAssetRatio}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>流动负债分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.liabilityAssessment.currentLiabilities}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>长期负债分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.liabilityAssessment.longTermLiabilities}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>或有负债识别</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.liabilityAssessment.contingentLiabilities}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">4️⃣ 现金流量分析</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>现金流量概览</h4>
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>经营现金流</h5>
                                <div class="value" style="color: #27ae60;">${reportData.detailedAnalysis.cashFlowAnalysis.cashFlowDetails.operatingCF}</div>
                            </div>
                            <div class="metric-card">
                                <h5>投资现金流</h5>
                                <div class="value" style="color: #e74c3c;">${reportData.detailedAnalysis.cashFlowAnalysis.cashFlowDetails.investingCF}</div>
                            </div>
                            <div class="metric-card">
                                <h5>筹资现金流</h5>
                                <div class="value" style="color: #3498db;">${reportData.detailedAnalysis.cashFlowAnalysis.cashFlowDetails.financingCF}</div>
                            </div>
                            <div class="metric-card">
                                <h5>净现金流</h5>
                                <div class="value" style="color: #9b59b6;">${reportData.detailedAnalysis.cashFlowAnalysis.cashFlowDetails.netCashFlow}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>经营性现金流分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.cashFlowAnalysis.operatingCashFlow}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>投资性现金流分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.cashFlowAnalysis.investingCashFlow}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>筹资性现金流分析</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.cashFlowAnalysis.financingCashFlow}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">5️⃣ 财务管理体系评估</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>内部控制评估</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.financialManagement.internalControl}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>预算管理体系</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.financialManagement.budgetManagement}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>财务团队评估</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.financialManagement.teamAssessment}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>信息系统评估</h4>
                        <p><span class="paragraph-number">4</span>${reportData.detailedAnalysis.financialManagement.systemAssessment}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">6️⃣ 盈利预测和财务模型</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>预测假设条件</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.profitForecast.assumptions}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>收入预测分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.profitForecast.revenueProjection}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>利润预测分析</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.profitForecast.profitProjection}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>敏感性分析</h4>
                        <p><span class="paragraph-number">4</span>${reportData.detailedAnalysis.profitForecast.sensitivityAnalysis}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚠️ 风险评估</h2>
        </div>
        <div class="section-content">
            <div class="feature-box" style="text-align: center; margin-bottom: 30px;">
                <h4>综合风险评分</h4>
                <div style="font-size: 48px; font-weight: 700; color: #f39c12; margin: 20px 0;">
                    ${reportData.riskAssessment.overallScore}/10
                </div>
                <p style="color: #7f8c8d; font-size: 16px;">基于多维度风险因素综合评估</p>
            </div>
            
            <div class="grid-2">
                ${reportData.riskAssessment.categories.map(category => `
                    <div class="analysis-item ${category.level === '低' ? 'risk-low' : category.level === '中' ? 'risk-medium' : 'risk-high'}">
                        <h4>${category.name} - ${category.score}分 (${category.level}风险)</h4>
                        <p>${category.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📝 结论和建议</h2>
        </div>
        <div class="section-content">
            <div class="conclusion-section">
                <div class="analysis-item risk-low">
                    <h4>投资建议</h4>
                    <p><span class="paragraph-number">1</span>${reportData.recommendations.investment}</p>
                </div>
                
                <div class="analysis-item risk-medium">
                    <h4>投资前置条件</h4>
                    <ul>
                        ${reportData.recommendations.conditions.map(condition => `<li>${condition}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="analysis-item">
                    <h4>估值建议</h4>
                    <p><span class="paragraph-number">2</span>${reportData.recommendations.valuationSuggestion}</p>
                </div>
                
                <div class="analysis-item">
                    <h4>后续实施步骤</h4>
                    <ul>
                        ${reportData.recommendations.nextSteps.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本报告基于目标公司提供的财务数据和公开信息进行分析，分析结论仅供参考，不构成投资建议。投资者应根据自身情况谨慎决策，并承担相应的投资风险。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam}</p>
    </div>
</body>
</html>
        `;
};

// 导出报告数据结构
export const getReportData = () => {
    return {
        companyInfo: {
            name: "科技创新股份有限公司",
            registrationNumber: "91110000MA01234567",
            establishedDate: "2018年03月15日",
            registeredCapital: "5000万元",
            legalRepresentative: "张三",
            industry: "软件和信息技术服务业",
            address: "北京市朝阳区科技园区创新大厦8层"
        },
        reportInfo: {
            reportDate: "2024年12月15日",
            reportPeriod: "2021年-2023年",
            auditFirm: "某某会计师事务所",
            projectTeam: "高级财务分析师团队",
            reportNumber: "DD-20241215-001"
        },
        executiveSummary: {
            overallRating: "B+",
            investmentRecommendation: "建议投资",
            riskLevel: "中等",
            valuationRange: {
                low: 4.5,
                high: 6.8,
                recommended: 5.65
            },
            keyStrengths: [
                "过去三年收入稳定增长，年复合增长率达18.5%",
                "技术团队实力雄厚，拥有核心专利技术",
                "客户基础稳固，与多家大型企业建立长期合作关系",
                "现金流管理良好，资金链健康"
            ],
            keyRisks: [
                "客户集中度偏高，前五大客户占收入的65%",
                "应收账款账龄偏长，存在回收风险",
                "行业竞争加剧，毛利率呈下降趋势",
                "关联交易披露不够充分"
            ]
        },
        financialHighlights: {
            revenue: [
                { year: "2021", value: 2.85, growth: null },
                { year: "2022", value: 3.21, growth: 12.6 },
                { year: "2023", value: 3.80, growth: 18.4 }
            ],
            netProfit: [
                { year: "2021", value: 0.32, margin: 11.2 },
                { year: "2022", value: 0.38, margin: 11.8 },
                { year: "2023", value: 0.45, margin: 11.8 }
            ],
            assets: [
                { year: "2021", value: 4.2 },
                { year: "2022", value: 4.8 },
                { year: "2023", value: 5.6 }
            ],
            liabilities: [
                { year: "2021", value: 2.1 },
                { year: "2022", value: 2.4 },
                { year: "2023", value: 2.8 }
            ]
        },
        riskAssessment: {
            overallScore: 7.8,
            categories: [
                { name: "信用风险", score: 8.2, level: "低", description: "客户信用良好，应收账款质量较高" },
                { name: "流动性风险", score: 7.5, level: "中", description: "流动资产充足，但短期债务压力存在" },
                { name: "经营风险", score: 7.8, level: "中", description: "业务模式稳定，但面临行业竞争压力" },
                { name: "合规风险", score: 7.2, level: "中", description: "内控制度基本完善，存在个别薄弱环节" }
            ]
        },
        detailedAnalysis: {
            historicalPerformance: {
                revenueAnalysis: "科技创新股份有限公司近三年营业收入呈现稳健增长态势，从2021年的2.85亿元稳步提升至2023年的3.80亿元，年复合增长率达到18.5%，显著高于行业平均水平。收入增长的主要驱动因素包括：第一，核心产品市场份额持续扩大，凭借技术优势在细分领域建立了较强的竞争壁垒；第二，新产品线的成功推出为公司带来了新的增长点，特别是在人工智能和大数据分析领域的产品获得了市场的广泛认可；第三，客户基础的不断扩大，从传统的制造业客户拓展到金融、医疗、教育等多个行业。值得注意的是，公司收入具有明显的季节性特征，第四季度收入通常占全年收入的35%左右，这主要与客户的预算执行周期和项目验收时间有关。",
                profitabilityAnalysis: "公司盈利能力保持稳定且持续改善。毛利率在过去三年中维持在45%左右的较高水平，这反映了公司产品的技术含量和市场定价能力。净利润率从2021年的11.2%提升至2023年的11.8%，显示出良好的成本控制能力和运营效率。期间费用率呈现逐年下降趋势，从2021年的28.5%降至2023年的26.2%，主要得益于规模效应的显现和管理效率的提升。销售费用率控制在15%以内，管理费用率保持在8%左右，财务费用较低，反映出公司良好的资金管理能力。研发费用率维持在12%以上，体现了公司对技术创新的持续投入。",
                growthTrends: "收入增长呈现加速趋势，2023年增长率18.4%较2022年的12.6%有显著提升。这种增长加速主要归因于以下几个方面：首先，市场需求的快速增长为公司业务发展提供了良好的外部环境；其次，公司持续的产品创新和技术升级增强了市场竞争力；再次，销售团队的扩张和渠道建设的完善提高了市场覆盖能力；最后，客户满意度的提升带来了更多的重复购买和口碑推荐。展望未来，考虑到行业发展趋势和公司的竞争优势，预计收入增长仍将保持较高水平。",
                keyMetrics: {
                    revenueGrowth: "18.5%",
                    profitMargin: "11.8%",
                    roa: "8.0%",
                    roe: "16.1%"
                }
            },
            assetQuality: {
                currentAssets: "流动资产质量整体良好，结构相对合理。现金及现金等价物1.40亿元，占总资产的25%，为公司提供了充足的流动性保障。货币资金主要以银行存款形式存在，风险较低。应收账款总额8500万元，占营业收入的22.4%，处于行业合理水平。从账龄结构来看，一年以内的应收账款占比85%，一年以上账龄的应收账款占比15%，虽然总体可控，但需要关注账期较长的应收账款的回收风险。公司已按照会计准则要求计提了相应的坏账准备。存货总额3200万元，主要包括原材料、在产品和产成品，存货周转率8.5次，处于行业中等水平，但相比去年的9.2次有所下降，需要关注存货管理效率。",
                fixedAssets: "固定资产总额1.85亿元，主要包括房屋建筑物、机器设备、运输设备和电子设备等。房屋建筑物账面价值1.20亿元，位于北京科技园区的办公楼，地理位置优越，市场价值较高。机器设备主要为研发和生产所需的专业设备，技术先进，使用状况良好，折旧政策合理，预计使用年限内不存在重大减值风险。无形资产主要包括软件著作权、专利技术和商标权等，账面价值6800万元。公司拥有核心专利技术15项，软件著作权32项，这些无形资产构成了公司的核心竞争优势。无形资产的摊销政策符合相关规定，价值评估合理。",
                assetUtilization: "资产使用效率有待提升。总资产周转率0.68次，略低于行业平均水平0.75次，说明公司在资产配置和使用效率方面还有改进空间。应收账款周转率5.2次，相比行业平均水平6.8次偏低，反映出收款管理需要加强。存货周转率8.5次，虽然处于合理区间，但相比历史最好水平仍有下降。固定资产周转率2.05次，基本符合行业特点。建议公司加强应收账款管理，优化存货结构，提高资产使用效率。",
                receivablesAnalysis: {
                    total: "8500万元",
                    within1Year: "85%",
                    over1Year: "15%",
                    turnoverRatio: "5.2次"
                },
                inventoryAnalysis: {
                    total: "3200万元",
                    turnoverRatio: "8.5次",
                    provisions: "320万元"
                }
            },
            liabilityAssessment: {
                currentLiabilities: "流动负债总额1.95亿元，结构相对合理。应付账款9800万元，主要为原材料和服务采购款项，供应商关系稳定，付款条件合理，平均付款周期45天。预收款项2800万元，主要为客户预付的项目款和软件授权费，这部分资金为公司提供了一定的营运资金支持。短期借款1.2亿元，主要为银行流动资金贷款，利率水平在5.5%-6.5%之间，处于市场合理水平。应付职工薪酬1800万元，反映了公司对人才的重视和激励。应交税费1200万元，主要为增值税、企业所得税等，公司税务合规情况良好。其他应付款800万元，主要为保证金和暂收款项。",
                longTermLiabilities: "长期负债规模适中，结构合理。长期借款8000万元，主要用于研发中心建设和设备采购等资本性支出，借款期限3-5年，利率在4.8%-5.5%之间，融资成本相对较低。长期应付款1500万元，主要为融资租赁款和分期付款购买设备款项。递延收益2200万元，主要为政府补助资金，这部分资金的获得体现了政府对公司发展的支持。整体而言，公司债务结构合理，长短期债务搭配适当，财务杠杆运用恰当。",
                contingentLiabilities: "或有负债风险总体可控。公司目前面临一起知识产权纠纷案件，涉案金额约500万元，案件起因为与某竞争对手的专利争议。经过法律顾问评估，公司胜诉概率较高，预计最终赔偿金额不会超过200万元。对外担保方面，公司为子公司提供担保800万元，担保期限2年，子公司经营状况良好，代偿风险较低。环保责任方面，公司属于轻资产的软件企业，不存在重大环保风险。产品质量责任方面，公司产品主要为软件和技术服务，已购买相应的职业责任保险，风险敞口有限。总体而言，或有负债风险在可控范围内。",
                debtStructure: {
                    shortTermDebt: "1.2亿元",
                    longTermDebt: "8000万元",
                    totalDebt: "2.0亿元",
                    debtToAssetRatio: "35.7%"
                }
            },
            cashFlowAnalysis: {
                operatingCashFlow: "经营性现金流量表现优异，净额达到5200万元，与同期净利润4500万元相比，现金流质量较高。经营性现金流入主要来源于销售商品、提供劳务收到的现金4.15亿元，占营业收入的109.2%，反映出良好的收款能力。经营性现金流出主要为购买商品、接受劳务支付的现金2.89亿元和支付给职工及为职工支付的现金6800万元。现金流与利润的匹配度良好，说明公司利润质量较高。但需要注意的是，公司收款周期相对较长，平均收款期约70天，影响了现金流的及时性，建议加强应收账款管理，提高收款效率。",
                investingCashFlow: "投资活动现金流量净额为-2800万元，主要用于研发设备采购、办公场所装修和信息系统升级等。具体包括：购建固定资产支付现金1800万元，主要为研发中心的设备采购；购买无形资产支付现金600万元，主要为软件授权和专利技术；投资支付现金400万元，主要为对参股公司的股权投资。这些投资方向符合公司的发展战略，投资回报周期合理，预期能够为公司带来长期收益。投资决策程序规范，风险控制措施得当。",
                financingCashFlow: "筹资活动现金流量净额为1500万元，主要来源于银行借款和股东增资。取得借款收到现金8000万元，偿还债务支付现金5200万元，净增加债务2800万元。股东增资3000万元，体现了股东对公司发展前景的信心。分配股利支付现金2300万元，股利支付率合理，兼顾了股东回报和公司发展需要。筹资成本合理，融资渠道多样化，包括银行贷款、股权融资等。公司偿债能力充足，流动比率1.44，速动比率1.28，财务风险可控。",
                cashFlowDetails: {
                    operatingCF: "5200万元",
                    investingCF: "-2800万元",
                    financingCF: "1500万元",
                    netCashFlow: "3900万元"
                }
            },
            financialManagement: {
                internalControl: "公司建立了较为完善的内部控制制度体系，涵盖了财务管理、采购管理、销售管理、人力资源管理、信息系统管理等关键业务流程。财务管理方面，建立了严格的预算管理、资金管理、投资决策、成本控制等制度，权责分离明确，审批流程规范。采购管理方面，建立了供应商评估、采购审批、合同管理、验收付款等完整流程。销售管理方面，建立了客户开发、合同签署、项目实施、收款管理等标准化流程。内控制度执行情况总体良好，但在关联交易管理和信息披露方面存在改进空间，建议进一步完善相关制度并加强执行监督。",
                budgetManagement: "公司建立了相对完善的全面预算管理体系，包括年度预算编制、季度预算调整、月度预算执行分析等环节。年度预算编制过程科学合理，采用自上而下和自下而上相结合的方式，充分考虑了市场环境、公司战略和历史数据。预算内容涵盖收入预算、成本费用预算、资本支出预算、现金流量预算等。预算执行过程中建立了定期分析和报告机制，但监控和分析的深度还需要加强。预算与实际的偏差分析机制有待完善，建议建立更加详细的差异分析和纠偏措施。",
                teamAssessment: "财务团队整体素质良好，专业能力较强。团队共15人，其中财务总监1人，财务经理3人，会计主管5人，一般会计人员6人。团队中有注册会计师3人，注册税务师2人，具备较强的专业背景。财务总监拥有15年财务管理经验，曾在多家上市公司担任财务负责人，具有丰富的资本市场和企业管理经验。团队成员学历结构合理，本科以上学历占比90%，专业涵盖会计学、财务管理、税务等相关领域。但团队相对年轻，平均工作经验6年，在复杂业务处理和风险识别方面还需要进一步提升。",
                systemAssessment: "公司财务信息系统较为先进，采用了知名ERP系统进行财务核算和管理，系统功能完善，涵盖了总账、应收、应付、固定资产、成本管理等各个模块。系统与业务系统实现了良好的集成，数据传递及时准确。建立了完善的系统权限管理和数据备份机制，信息安全保障措施得当。系统操作界面友好，报表功能强大，能够满足日常财务管理和决策支持需要。但系统的定制化程度还不够高，在一些特殊业务处理方面还需要人工干预，建议进一步优化系统配置，提高自动化水平。"
            },
            profitForecast: {
                assumptions: "基于对公司历史业绩的深入分析、行业发展趋势的研判以及公司未来发展战略的理解，我们对公司未来三年的财务表现进行了预测。主要假设条件包括：第一，宏观经济环境保持稳定，软件和信息技术服务行业继续保持良好的发展态势；第二，公司核心产品的市场竞争力得以维持，市场份额稳中有升；第三，新产品开发计划能够按期实施，并获得市场认可；第四，人才团队保持稳定，核心技术人员流失率控制在合理范围内；第五，原材料和人工成本的上涨幅度控制在预期范围内；第六，不发生重大自然灾害、政策变化等不可抗力因素。",
                revenueProjection: "基于上述假设，预计公司2024-2026年营业收入将保持稳健增长。2024年营业收入预计达到4.37亿元，同比增长15%；2025年营业收入预计达到5.24亿元，同比增长20%；2026年营业收入预计达到6.29亿元，同比增长20%。三年复合增长率约为18%。收入增长的主要驱动因素包括：现有产品市场份额的扩大、新产品的成功推出、客户基础的持续扩张以及单客户贡献度的提升。分产品来看，核心软件产品收入预计年增长15%，技术服务收入预计年增长25%，新产品收入预计在2025年开始贡献显著收入。",
                profitProjection: "在收入增长的基础上，公司盈利能力预计将保持稳定并略有提升。预计2024-2026年净利润分别为5200万元、6400万元和7700万元，年增长率分别为15.6%、23.1%和20.3%。净利润率预计将从2023年的11.8%提升至2026年的12.2%，主要得益于规模效应的显现和运营效率的提升。毛利率预计保持在45%左右的稳定水平，期间费用率预计将从2023年的26.2%逐步降至2026年的24.5%。研发费用投入将继续保持在收入的12%以上，确保公司技术创新能力的持续提升。",
                sensitivityAnalysis: "敏感性分析显示，收入增长率是影响公司估值的最关键因素。收入增长率每变动1个百分点，对公司估值的影响约为3-5%。具体而言，如果收入增长率能够达到20%以上，公司估值有望提升10-15%；反之，如果收入增长率低于10%，公司估值可能下降15-20%。其他关键敏感因素包括：毛利率变动1个百分点对估值影响约2-3%；期间费用率变动1个百分点对估值影响约1-2%。主要风险因素包括市场竞争加剧导致的价格压力、技术更新换代带来的产品淘汰风险、核心人才流失对研发能力的影响等。建议投资者重点关注这些关键因素的变化趋势。"
            }
        },
        recommendations: {
            investment: "综合考虑公司的财务状况、经营业绩、行业地位、发展前景等各方面因素，我们认为该公司具备良好的投资价值，建议进行投资。但同时需要关注相关风险点，并制定相应的风险缓释措施。",
            conditions: [
                "要求公司建立更加严格的应收账款管理制度，设定明确的信用政策和收款目标，提高资金周转效率",
                "建议公司优化客户结构，降低对重点客户的依赖程度，分散经营风险，提高抗风险能力",
                "完善关联交易管理制度，提高关联交易的透明度和公允性，建立独立的关联交易决策机制",
                "加强内部控制制度建设，特别是财务管控和风险管理环节，提高公司治理水平和运营效率"
            ],
            valuationSuggestion: "基于折现现金流模型（DCF）和可比公司估值法（相对估值法）的综合分析，我们认为公司的合理估值区间为4.5-6.8亿元，推荐估值为5.65亿元，对应2024年预测净利润的PE倍数约为10.9倍，处于行业合理水平。",
            nextSteps: [
                "完成对公司的法律尽职调查，重点关注公司治理结构、合同履行情况、知识产权保护等法律风险",
                "进行深入的商业尽职调查，包括市场分析、竞争格局研究、客户访谈等，验证商业模式的可持续性",
                "与公司管理层深入沟通，确定投资条款、治理安排、业绩承诺等关键投资条件",
                "完善投资协议条款，明确双方权利义务，设置必要的保护性条款，正式签署投资协议"
            ]
        }
    };
};