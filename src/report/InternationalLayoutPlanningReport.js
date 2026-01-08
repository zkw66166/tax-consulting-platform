// src/report/InternationalLayoutPlanningReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>国际布局筹划报告</title>
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
            border-bottom: 4px solid #3f51b5;
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
            background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%);
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
            border-top: 5px solid #3f51b5;
            position: relative;
        }
        
        .analysis-item::before {
            content: "▶";
            position: absolute;
            left: 25px;
            top: 25px;
            color: #3f51b5;
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
        
        .grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .highlight-card {
            background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #3f51b5;
        }
        
        .highlight-card h3 {
            color: #303f9f;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .highlight-card .value {
            color: #1a237e;
            font-size: 28px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .country-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #3f51b5;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .country-card::before {
            content: "🌍";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 20px;
        }
        
        .country-card h5 {
            color: #3f51b5;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .country-details {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }
        
        .country-detail {
            text-align: center;
            background: rgba(255,255,255,0.8);
            padding: 10px;
            border-radius: 8px;
        }
        
        .country-detail h6 {
            color: #303f9f;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        
        .country-detail .value {
            color: #3f51b5;
            font-size: 16px;
            font-weight: 700;
        }
        
        .structure-diagram {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }
        
        .structure-diagram h5 {
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .structure-level {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 15px 0;
            position: relative;
        }
        
        .structure-level:not(:last-child)::after {
            content: "↓";
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            color: #3f51b5;
            font-size: 20px;
            font-weight: bold;
        }
        
        .structure-entity {
            background: #fff;
            border: 2px solid #3f51b5;
            border-radius: 8px;
            padding: 10px 20px;
            margin: 0 10px;
            text-align: center;
            min-width: 120px;
        }
        
        .structure-entity.recommended {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border-color: #4caf50;
        }
        
        .structure-entity h6 {
            color: #3f51b5;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .structure-entity.recommended h6 {
            color: #2e7d32;
        }
        
        .structure-entity p {
            color: #7f8c8d;
            font-size: 12px;
            margin: 0;
            text-indent: 0;
        }
        
        .treaty-network {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .treaty-item {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        
        .treaty-item h6 {
            color: #3f51b5;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .treaty-rates {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        
        .treaty-rate {
            text-align: center;
        }
        
        .treaty-rate span {
            display: block;
            font-size: 12px;
            color: #7f8c8d;
        }
        
        .treaty-rate .rate {
            font-size: 16px;
            font-weight: 600;
            color: #3f51b5;
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
            color: #3f51b5;
            font-size: 12px;
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
        }
        
        td {
            border-bottom: 1px solid #ecf0f1;
            padding: 12px 15px;
            text-align: center;
        }
        
        tr:hover {
            background: #f8f9fa;
        }
        
        .feature-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }
        
        .feature-box h4 {
            color: #495057;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
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
            color: #3f51b5;
            font-size: 8px;
            top: 0.6em;
        }
        
        .conclusion-section {
            background: linear-gradient(135deg, #f1f8ff 0%, #deecff 100%);
            border: 3px solid #4dabf7;
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
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
        }
        
        .footer p {
            margin: 8px 0;
            line-height: 1.6;
        }
        
        .paragraph-number {
            display: inline-block;
            background: linear-gradient(135deg, #3f51b5, #303f9f);
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
        
        .highlight-text {
            background: linear-gradient(120deg, #c5cae9 0%, #9fa8da 100%);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .warning-box {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border: 2px solid #ff9800;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }
        
        .warning-box h6 {
            color: #f57c00;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .warning-box p {
            color: #ef6c00;
            font-size: 13px;
            margin: 0;
            text-indent: 0;
        }
        
        .pricing-method-card {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            transition: box-shadow 0.3s ease;
        }
        
        .pricing-method-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .cfc-test-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        
        .test-item {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        
        .test-item.pass {
            border-color: #4caf50;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .test-item.fail {
            border-color: #f44336;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .test-item h6 {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .apa-timeline {
            position: relative;
            padding: 20px 0;
        }
        
        .apa-timeline::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #3f51b5;
            transform: translateX(-50%);
        }
        
        .timeline-item {
            position: relative;
            margin: 20px 0;
            padding: 0 30px;
        }
        
        .timeline-item::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 12px;
            height: 12px;
            background: #3f51b5;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .timeline-content {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 15px;
            margin-left: 20px;
            position: relative;
        }
        
        .timeline-content.left {
            margin-left: 0;
            margin-right: 20px;
        }
        
        .beps-action {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
        }
        
        .beps-action h6 {
            color: #1976d2;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .value-creation-chain {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .value-step {
            flex: 1;
            text-align: center;
            position: relative;
        }
        
        .value-step:not(:last-child)::after {
            content: "→";
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            color: #3f51b5;
            font-size: 18px;
            font-weight: bold;
        }
        
        .value-step h6 {
            color: #3f51b5;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .substance-requirements {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .substance-item {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        
        .substance-item.critical {
            border-color: #f44336;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .substance-item.important {
            border-color: #ff9800;
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        }
        
        .substance-item.standard {
            border-color: #4caf50;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
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
    <div class="print-controls">
        <button class="btn btn-primary" onclick="window.print()">
            🖨️ 打印报告
        </button>
        <button class="btn btn-secondary" onclick="window.close()">
            ✕ 关闭
        </button>
    </div>

    <div class="header">
        <h1>国际布局筹划报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>🌍 企业国际化现状</h3>
            <p><strong>企业名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>海外业务收入</strong><span>${reportData.companyInfo.overseasRevenue}</span></p>
            <p><strong>海外机构数量</strong><span>${reportData.companyInfo.overseasEntities}</span></p>
            <p><strong>主要市场分布</strong><span>${reportData.companyInfo.mainMarkets}</span></p>
            <p><strong>关联交易规模</strong><span>${reportData.companyInfo.relatedTransactions}</span></p>
            <p><strong>当前税负水平</strong><span>${reportData.companyInfo.currentTaxBurden}</span></p>
        </div>
        <div class="info-card">
            <h3>📊 筹划概览</h3>
            <p><strong>筹划期间</strong><span>${reportData.reportInfo.planningPeriod}</span></p>
            <p><strong>涉及国家/地区</strong><span>${reportData.planningOverview.countriesInvolved}个</span></p>
            <p><strong>预计节税总额</strong><span class="highlight-text">${reportData.planningOverview.totalSaving}万元</span></p>
            <p><strong>架构复杂度</strong><span>${reportData.planningOverview.structureComplexity}</span></p>
            <p><strong>合规风险等级</strong><span>${reportData.planningOverview.complianceRisk}</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🎯 国际筹划概览</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                <div class="highlight-card">
                    <h3>筹划评级</h3>
                    <div class="value">${reportData.planningOverview.rating}</div>
                </div>
                <div class="highlight-card">
                    <h3>实施建议</h3>
                    <div class="value" style="font-size: 20px;">${reportData.planningOverview.recommendation}</div>
                </div>
                <div class="highlight-card">
                    <h3>全球效率</h3>
                    <div class="value" style="font-size: 20px;">${reportData.planningOverview.globalEfficiency}</div>
                </div>
            </div>
            
            <div class="grid-2">
                <div class="analysis-item risk-low">
                    <h4>国际化优势机会</h4>
                    <ul>
                        ${reportData.planningOverview.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-item risk-medium">
                    <h4>合规挑战难点</h4>
                    <ul>
                        ${reportData.planningOverview.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="feature-box">
                <h4>国际筹划效果预测</h4>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h5>年节税金额</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.annualSaving}万元</div>
                    </div>
                    <div class="metric-card">
                        <h5>全球税负率优化</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.globalTaxOptimization}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>双重征税避免</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.doubleTaxationRelief}万元</div>
                    </div>
                    <div class="metric-card">
                        <h5>架构实施周期</h5>
                        <div class="value" style="font-size: 18px;">${reportData.planningOverview.effectMetrics.implementationPeriod}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏗️ 跨境投资架构设计</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 投资目的地选择分析</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>税收协定网络评估</h4>
                        <p><span class="paragraph-number">1</span>${reportData.investmentStructure.destinationAnalysis.treatyNetworkAssessment}</p>
                        
                        <div class="treaty-network">
                            ${reportData.investmentStructure.destinationAnalysis.treatyComparison.map(treaty => `
                                <div class="treaty-item">
                                    <h6>${treaty.country}</h6>
                                    <div class="treaty-rates">
                                        <div class="treaty-rate">
                                            <span>股息</span>
                                            <div class="rate">${treaty.dividendRate}%</div>
                                        </div>
                                        <div class="treaty-rate">
                                            <span>利息</span>
                                            <div class="rate">${treaty.interestRate}%</div>
                                        </div>
                                        <div class="treaty-rate">
                                            <span>特许权使用费</span>
                                            <div class="rate">${treaty.royaltyRate}%</div>
                                        </div>
                                    </div>
                                    <p style="font-size: 12px; color: #7f8c8d; margin: 5px 0; text-indent: 0;">
                                        协定质量评级: <span style="color: ${treaty.qualityRating === '优秀' ? '#27ae60' : treaty.qualityRating === '良好' ? '#f39c12' : '#e74c3c'}; font-weight: 600;">${treaty.qualityRating}</span>
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>当地税制深度分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.investmentStructure.destinationAnalysis.localTaxAnalysis}</p>
                        
                        <table>
                            <tr>
                                <th>投资目的地</th>
                                <th>企业所得税率</th>
                                <th>增值税/GST</th>
                                <th>预提税率</th>
                                <th>税收优惠</th>
                                <th>综合评分</th>
                            </tr>
                            ${reportData.investmentStructure.destinationAnalysis.taxRegimeComparison.map(regime => `
                                <tr>
                                    <td style="font-weight: 600;">${regime.jurisdiction}</td>
                                    <td style="color: ${regime.corporateTaxRate <= 20 ? '#27ae60' : regime.corporateTaxRate <= 25 ? '#f39c12' : '#e74c3c'};">${regime.corporateTaxRate}%</td>
                                    <td>${regime.vatGst}</td>
                                    <td style="color: ${regime.withholdingTax <= 5 ? '#27ae60' : regime.withholdingTax <= 10 ? '#f39c12' : '#e74c3c'};">${regime.withholdingTax}%</td>
                                    <td style="color: #3f51b5;">${regime.incentives}</td>
                                    <td>
                                        <span style="color: ${regime.overallScore >= 8 ? '#27ae60' : regime.overallScore >= 6 ? '#f39c12' : '#e74c3c'};">
                                            ${regime.overallScore}/10
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>投资环境综合评估</h4>
                        <p><span class="paragraph-number">3</span>${reportData.investmentStructure.destinationAnalysis.investmentEnvironment}</p>
                        
                        <div class="grid-2">
                            ${reportData.investmentStructure.destinationAnalysis.environmentFactors.map(factor => `
                                <div class="country-card">
                                    <h5>${factor.category}</h5>
                                    <p style="margin: 0; text-indent: 0; color: #3f51b5; font-size: 14px;">${factor.description}</p>
                                    <div class="country-details">
                                        <div class="country-detail">
                                            <h6>政治稳定性</h6>
                                            <div class="value">${factor.politicalStability}</div>
                                        </div>
                                        <div class="country-detail">
                                            <h6>经济发展</h6>
                                            <div class="value">${factor.economicDevelopment}</div>
                                        </div>
                                        <div class="country-detail">
                                            <h6>法治水平</h6>
                                            <div class="value">${factor.ruleOfLaw}</div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 中间控股公司设立策略</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>主要控股地深度比较</h4>
                        <p><span class="paragraph-number">1</span>${reportData.investmentStructure.holdingCompany.jurisdictionComparison}</p>
                        
                        <div class="grid-2">
                            ${reportData.investmentStructure.holdingCompany.majorJurisdictions.map(jurisdiction => `
                                <div class="country-card">
                                    <h5>${jurisdiction.name}</h5>
                                    <p style="margin: 0; text-indent: 0; color: #3f51b5; font-size: 14px;">${jurisdiction.description}</p>
                                    <div class="country-details">
                                        <div class="country-detail">
                                            <h6>企业税率</h6>
                                            <div class="value">${jurisdiction.corporateTaxRate}</div>
                                        </div>
                                        <div class="country-detail">
                                            <h6>协定网络</h6>
                                            <div class="value">${jurisdiction.treatyNetwork}个</div>
                                        </div>
                                        <div class="country-detail">
                                            <h6>监管环境</h6>
                                            <div class="value">${jurisdiction.regulatoryEnvironment}</div>
                                        </div>
                                    </div>
                                    <div style="margin-top: 15px;">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <span style="font-size: 12px; color: #7f8c8d;">优势特点:</span>
                                            <span style="font-size: 12px; color: #27ae60; font-weight: 600;">${jurisdiction.keyAdvantages}</span>
                                        </div>
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
                                            <span style="font-size: 12px; color: #7f8c8d;">推荐指数:</span>
                                            <span style="font-size: 14px; color: #3f51b5; font-weight: 700;">${jurisdiction.recommendationScore}/10</span>
                                        </div>
                                    </div>
                                    ${jurisdiction.recommended ? '<p style="color: #2e7d32; font-weight: 600; margin-top: 10px; text-indent: 0;">🌟 最佳选择</p>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>经济实质要求详解</h4>
                        <p><span class="paragraph-number">2</span>${reportData.investmentStructure.holdingCompany.economicSubstanceRequirements}</p>
                        
                        <div class="substance-requirements">
                            ${reportData.investmentStructure.holdingCompany.substanceElements.map(element => `
                                <div class="substance-item ${element.criticality}">
                                    <h6>${element.requirement}</h6>
                                    <p style="font-size: 12px; margin: 10px 0; text-indent: 0;">${element.description}</p>
                                    <div style="margin-top: 10px;">
                                        <span style="font-size: 11px; color: #7f8c8d;">合规要点:</span>
                                        <p style="font-size: 11px; color: #2c3e50; margin: 5px 0; text-indent: 0;">${element.compliancePoints}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="warning-box">
                            <h6>⚠️ 经济实质合规提醒</h6>
                            <p>各国对经济实质的要求日趋严格，建议在架构设计阶段充分考虑实质性经营活动的安排，确保满足当地监管要求，避免被认定为"空壳公司"或触发反避税调查。</p>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>功能定位与业务设计</h4>
                        <p><span class="paragraph-number">3</span>${reportData.investmentStructure.holdingCompany.functionalDesign}</p>
                        
                        <div class="value-creation-chain">
                            ${reportData.investmentStructure.holdingCompany.businessFunctions.map(func => `
                                <div class="value-step">
                                    <h6>${func.function}</h6>
                                    <p style="font-size: 12px; color: #7f8c8d; margin: 5px 0; text-indent: 0;">${func.description}</p>
                                    <div style="font-size: 11px; color: #3f51b5; font-weight: 600;">${func.valueContribution}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 税收协定优惠策略</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>受益所有人认定策略</h4>
                        <p><span class="paragraph-number">1</span>${reportData.investmentStructure.treatyBenefits.beneficialOwnershipStrategy}</p>
                        
                        <div class="grid-4">
                            ${reportData.investmentStructure.treatyBenefits.ownershipTests.map(test => `
                                <div class="test-item ${test.status}">
                                    <h6>${test.testName}</h6>
                                    <p style="font-size: 12px; margin: 10px 0; text-indent: 0;">${test.description}</p>
                                    <div style="font-size: 11px; color: ${test.status === 'pass' ? '#27ae60' : '#e74c3c'}; font-weight: 600;">
                                        ${test.status === 'pass' ? '✓ 满足要求' : '✗ 需要完善'}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>协定条款深度利用</h4>
                        <p><span class="paragraph-number">2</span>${reportData.investmentStructure.treatyBenefits.treatyUtilization}</p>
                        
                        <table>
                            <tr>
                                <th>所得类型</th>
                                <th>来源国税率</th>
                                <th>协定优惠税率</th>
                                <th>节税幅度</th>
                                <th>年节税金额</th>
                                <th>特殊条件</th>
                            </tr>
                            ${reportData.investmentStructure.treatyBenefits.incomeTypeAnalysis.map(income => `
                                <tr>
                                    <td style="font-weight: 600;">${income.incomeType}</td>
                                    <td style="color: #e74c3c;">${income.domesticRate}%</td>
                                    <td style="color: #27ae60;">${income.treatyRate}%</td>
                                    <td style="color: #3f51b5; font-weight: 600;">${income.savingRate}%</td>
                                    <td style="color: #27ae60; font-weight: 600;">${income.annualSaving}万元</td>
                                    <td style="font-size: 12px;">${income.specialConditions}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>协定争议预防与处理</h4>
                        <p><span class="paragraph-number">3</span>${reportData.investmentStructure.treatyBenefits.disputeResolution}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box">
                                <h4>相互协商程序</h4>
                                <ul>
                                    ${reportData.investmentStructure.treatyBenefits.mutualAgreementProcedure.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="feature-box">
                                <h4>仲裁程序</h4>
                                <ul>
                                    ${reportData.investmentStructure.treatyBenefits.arbitrationProcedure.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📊 转让定价管理</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 转让定价政策制定</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>独立交易原则应用</h4>
                        <p><span class="paragraph-number">1</span>${reportData.transferPricing.policyFormulation.armsPrincipleApplication}</p>
                        
                        <div class="grid-2">
                            ${reportData.transferPricing.policyFormulation.pricingMethods.map(method => `
                                <div class="pricing-method-card">
                                    <h5 style="color: #3f51b5; margin-bottom: 10px;">${method.methodName}</h5>
                                    <p style="font-size: 14px; margin: 10px 0; text-indent: 0;"><strong>适用场景:</strong> ${method.applicableScenario}</p>
                                    <p style="font-size: 14px; margin: 10px 0; text-indent: 0;"><strong>操作要点:</strong> ${method.operationalPoints}</p>
                                    <div style="display: flex; justify-content: space-between; margin-top: 15px;">
                                        <span style="font-size: 12px; color: #27ae60;">优势: ${method.advantages}</span>
                                        <span style="font-size: 12px; color: #e74c3c;">限制: ${method.limitations}</span>
                                    </div>
                                    <div style="text-align: center; margin-top: 10px;">
                                        <span style="font-size: 12px; color: #7f8c8d;">推荐度: </span>
                                        <span style="color: #3f51b5; font-weight: 600;">
                                            ${method.recommendation === '强烈推荐' ? '⭐⭐⭐⭐⭐' :
            method.recommendation === '推荐' ? '⭐⭐⭐⭐' :
                method.recommendation === '一般' ? '⭐⭐⭐' : '⭐⭐'}
                                        </span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>转让定价文档体系</h4>
                        <p><span class="paragraph-number">2</span>${reportData.transferPricing.policyFormulation.documentationFramework}</p>
                        
                        <div class="grid-3">
                            ${reportData.transferPricing.policyFormulation.documentTypes.map(docType => `
                                <div class="highlight-card">
                                    <h3>${docType.documentName}</h3>
                                    <div class="value" style="font-size: 16px;">${docType.completionLevel}%</div>
                                    <p style="font-size: 12px; margin: 10px 0; color: #7f8c8d;">${docType.keyContent}</p>
                                    <div style="font-size: 11px; color: ${docType.complianceStatus === '合规' ? '#27ae60' : docType.complianceStatus === '待完善' ? '#f39c12' : '#e74c3c'};">
                                        ${docType.complianceStatus}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>定价策略优化设计</h4>
                        <p><span class="paragraph-number">3</span>${reportData.transferPricing.policyFormulation.pricingStrategyOptimization}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 价值链深度分析</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>功能风险资产分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.transferPricing.valueChainAnalysis.functionalAnalysis}</p>
                        
                        <div class="value-creation-chain">
                            ${reportData.transferPricing.valueChainAnalysis.valueChainElements.map(element => `
                                <div class="value-step">
                                    <h6>${element.function}</h6>
                                    <p style="font-size: 12px; color: #7f8c8d; margin: 5px 0; text-indent: 0;">${element.description}</p>
                                    <div style="font-size: 11px; color: #3f51b5; font-weight: 600;">风险承担: ${element.riskLevel}</div>
                                    <div style="font-size: 11px; color: #27ae60; font-weight: 600;">价值贡献: ${element.valueContribution}%</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>价值创造地原则应用</h4>
                        <p><span class="paragraph-number">2</span>${reportData.transferPricing.valueChainAnalysis.valueCreationPrinciple}</p>
                        
                        <div class="grid-2">
                            ${reportData.transferPricing.valueChainAnalysis.valueCreationFactors.map(factor => `
                                <div class="country-card">
                                    <h5>${factor.factor}</h5>
                                    <p style="margin: 0; text-indent: 0; color: #3f51b5; font-size: 14px;">${factor.description}</p>
                                    <div class="country-details">
                                        <div class="country-detail">
                                            <h6>权重</h6>
                                            <div class="value">${factor.weight}%</div>
                                        </div>
                                        <div class="country-detail">
                                            <h6>当前得分</h6>
                                            <div class="value">${factor.currentScore}</div>
                                        </div>
                                        <div class="country-detail">
                                            <h6>目标得分</h6>
                                            <div class="value">${factor.targetScore}</div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>BEPS行动计划应对</h4>
                        <p><span class="paragraph-number">3</span>${reportData.transferPricing.valueChainAnalysis.bepsCompliance}</p>
                        
                        <div class="grid-3">
                            ${reportData.transferPricing.valueChainAnalysis.bepsActions.map(action => `
                                <div class="beps-action">
                                    <h6>${action.actionPlan}</h6>
                                    <p style="font-size: 12px; margin: 8px 0; text-indent: 0;">${action.requirement}</p>
                                    <div style="font-size: 11px; color: ${action.complianceLevel === '完全合规' ? '#27ae60' : action.complianceLevel === '基本合规' ? '#f39c12' : '#e74c3c'};">
                                        ${action.complianceLevel}
                                    </div>
                                    <p style="font-size: 11px; color: #7f8c8d; margin: 5px 0; text-indent: 0;">应对措施: ${action.countermeasures}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 预约定价安排(APA)</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>APA申请条件评估</h4>
                        <p><span class="paragraph-number">1</span>${reportData.transferPricing.apa.applicationConditions}</p>
                        
                        <div class="cfc-test-grid">
                            ${reportData.transferPricing.apa.eligibilityCriteria.map(criteria => `
                                <div class="test-item ${criteria.status}">
                                    <h6>${criteria.criterion}</h6>
                                    <p style="font-size: 12px; margin: 10px 0; text-indent: 0;">${criteria.description}</p>
                                    <div style="margin-top: 10px;">
                                        <div style="font-size: 11px; color: #7f8c8d;">当前状态:</div>
                                        <div style="font-size: 12px; color: ${criteria.status === 'pass' ? '#27ae60' : '#e74c3c'}; font-weight: 600;">
                                            ${criteria.currentStatus}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>APA申请流程规划</h4>
                        <p><span class="paragraph-number">2</span>${reportData.transferPricing.apa.applicationProcess}</p>
                        
                        <div class="apa-timeline">
                            ${reportData.transferPricing.apa.processSteps.map((step, index) => `
                                <div class="timeline-item">
                                    <div class="timeline-content ${index % 2 === 0 ? 'left' : ''}">
                                        <h6 style="color: #3f51b5; margin-bottom: 8px;">${step.phase} (${step.duration})</h6>
                                        <p style="font-size: 12px; margin: 8px 0; text-indent: 0;">${step.description}</p>
                                        <div style="font-size: 11px; color: #7f8c8d; margin-top: 8px;">
                                            关键要点: ${step.keyPoints}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>APA执行与监控管理</h4>
                        <p><span class="paragraph-number">3</span>${reportData.transferPricing.apa.executionMonitoring}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>预计APA期限</h5>
                                <div class="value">${reportData.transferPricing.apa.metrics.expectedTerm}年</div>
                            </div>
                            <div class="metric-card">
                                <h5>涉及交易金额</h5>
                                <div class="value">${reportData.transferPricing.apa.metrics.transactionAmount}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>预计合规成本节约</h5>
                                <div class="value">${reportData.transferPricing.apa.metrics.complianceSaving}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>税务确定性提升</h5>
                                <div class="value">${reportData.transferPricing.apa.metrics.certaintylevel}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🛡️ 反避税规则应对</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 受控外国企业(CFC)规则</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>CFC规则要素分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.antiAvoidance.cfcRules.ruleElementsAnalysis}</p>
                        
                        <div class="cfc-test-grid">
                            ${reportData.antiAvoidance.cfcRules.cfcTests.map(test => `
                                <div class="test-item ${test.result}">
                                    <h6>${test.testType}</h6>
                                    <p style="font-size: 12px; margin: 10px 0; text-indent: 0;">${test.description}</p>
                                    <div style="margin-top: 10px;">
                                        <div style="font-size: 11px; color: #7f8c8d;">测试结果:</div>
                                        <div style="font-size: 12px; color: ${test.result === 'pass' ? '#27ae60' : '#e74c3c'}; font-weight: 600;">
                                            ${test.testResult}
                                        </div>
                                    </div>
                                    <div style="margin-top: 8px;">
                                        <div style="font-size: 10px; color: #7f8c8d;">应对建议:</div>
                                        <div style="font-size: 11px; color: #3f51b5;">${test.recommendation}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>经济实质增强策略</h4>
                        <p><span class="paragraph-number">2</span>${reportData.antiAvoidance.cfcRules.economicSubstanceStrategy}</p>
                        
                        <div class="substance-requirements">
                            ${reportData.antiAvoidance.cfcRules.substanceEnhancement.map(enhancement => `
                                <div class="substance-item ${enhancement.priority}">
                                    <h6>${enhancement.measure}</h6>
                                    <p style="font-size: 12px; margin: 10px 0; text-indent: 0;">${enhancement.description}</p>
                                    <div style="margin-top: 10px;">
                                        <div style="font-size: 11px; color: #7f8c8d;">实施成本: ${enhancement.implementationCost}</div>
                                        <div style="font-size: 11px; color: #27ae60;">预期效果: ${enhancement.expectedEffect}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>CFC合规管理</h4>
                        <p><span class="paragraph-number">3</span>${reportData.antiAvoidance.cfcRules.complianceManagement}</p>
                        
                        <div class="warning-box">
                            <h6>⚠️ CFC合规提醒</h6>
                            <p>受控外国企业规则要求企业对低税负国家的被控制企业进行特别申报，建议建立完善的CFC识别、监控和申报体系，确保及时履行信息报告义务。</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 一般反避税规则</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>商业实质判断标准</h4>
                        <p><span class="paragraph-number">1</span>${reportData.antiAvoidance.generalAntiAvoidance.businessSubstanceStandards}</p>
                        
                        <table>
                            <tr>
                                <th>判断标准</th>
                                <th>具体要求</th>
                                <th>当前状态</th>
                                <th>风险等级</th>
                                <th>改进措施</th>
                            </tr>
                            ${reportData.antiAvoidance.generalAntiAvoidance.substanceTests.map(test => `
                                <tr>
                                    <td style="font-weight: 600;">${test.standard}</td>
                                    <td>${test.requirement}</td>
                                    <td style="color: ${test.currentStatus === '满足' ? '#27ae60' : test.currentStatus === '部分满足' ? '#f39c12' : '#e74c3c'};">
                                        ${test.currentStatus}
                                    </td>
                                    <td>
                                        <span style="color: ${test.riskLevel === '低' ? '#27ae60' : test.riskLevel === '中' ? '#f39c12' : '#e74c3c'};">
                                            ${test.riskLevel}
                                        </span>
                                    </td>
                                    <td style="font-size: 12px;">${test.improvementMeasures}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>税务调整防范策略</h4>
                        <p><span class="paragraph-number">2</span>${reportData.antiAvoidance.generalAntiAvoidance.adjustmentPrevention}</p>
                        
                        <div class="grid-2">
                            ${reportData.antiAvoidance.generalAntiAvoidance.preventionStrategies.map(strategy => `
                                <div class="analysis-item risk-${strategy.riskLevel}">
                                    <h4>${strategy.strategyName}</h4>
                                    <p>${strategy.description}</p>
                                    <ul>
                                        ${strategy.implementationSteps.map(step => `<li>${step}</li>`).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 其他反避税措施</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>资本弱化规则应对</h4>
                        <p><span class="paragraph-number">1</span>${reportData.antiAvoidance.otherMeasures.thinCapitalizationResponse}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>当前债资比</h5>
                                <div class="value">${reportData.antiAvoidance.otherMeasures.capitalStructure.currentDebtEquityRatio}</div>
                            </div>
                            <div class="metric-card">
                                <h5>安全港标准</h5>
                                <div class="value">${reportData.antiAvoidance.otherMeasures.capitalStructure.safeHarborRatio}</div>
                            </div>
                            <div class="metric-card">
                                <h5>超标金额</h5>
                                <div class="value">${reportData.antiAvoidance.otherMeasures.capitalStructure.excessAmount}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>合规调整建议</h5>
                                <div class="value" style="font-size: 16px;">${reportData.antiAvoidance.otherMeasures.capitalStructure.complianceRecommendation}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>混合错配规则应对</h4>
                        <p><span class="paragraph-number">2</span>${reportData.antiAvoidance.otherMeasures.hybridMismatchResponse}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>受益所有人规则应对</h4>
                        <p><span class="paragraph-number">3</span>${reportData.antiAvoidance.otherMeasures.beneficialOwnershipResponse}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚠️ 合规风险评估</h2>
        </div>
        <div class="section-content">
            <div class="feature-box" style="text-align: center; margin-bottom: 30px;">
                <h4>国际合规风险评分</h4>
                <div style="font-size: 48px; font-weight: 700; color: #f39c12; margin: 20px 0;">
                    ${reportData.complianceAssessment.overallScore}/10
                </div>
                <p style="color: #7f8c8d; font-size: 16px;">基于各国税法合规、BEPS行动计划、反避税规则等因素综合评估</p>
            </div>
            
            <div class="grid-2">
                ${reportData.complianceAssessment.categories.map(category => `
                    <div class="analysis-item ${category.level === '低' ? 'risk-low' : category.level === '中' ? 'risk-medium' : 'risk-high'}">
                        <h4>${category.name} - ${category.score}分 (${category.level}风险)</h4>
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
            <h2 class="section-title">📝 实施方案与路线图</h2>
        </div>
        <div class="section-content">
            <div class="conclusion-section">
                <div class="analysis-item risk-low">
                    <h4>总体实施策略</h4>
                    <p><span class="paragraph-number">1</span>${reportData.implementationPlan.overallStrategy}</p>
                </div>
                
                <div class="analysis-item">
                    <h4>分阶段实施路线图</h4>
                    <table>
                        <tr>
                            <th>实施阶段</th>
                            <th>主要内容</th>
                            <th>时间安排</th>
                            <th>预期效果</th>
                            <th>关键风险</th>
                        </tr>
                        ${reportData.implementationPlan.phases.map(phase => `
                            <tr>
                                <td style="font-weight: 600;">${phase.stage}</td>
                                <td>${phase.content}</td>
                                <td>${phase.timeline}</td>
                                <td style="color: #27ae60;">${phase.expectedBenefit}</td>
                                <td style="color: #e74c3c;">${phase.keyRisk}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div class="analysis-item risk-medium">
                    <h4>关键成功要素</h4>
                    <ul>
                        ${reportData.implementationPlan.successFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="analysis-item">
                    <h4>持续监控要点</h4>
                    <ul>
                        ${reportData.implementationPlan.monitoringPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本报告基于各国现行税法和国际税收协定进行分析，国际税务筹划方案仅供参考。企业应确保所有跨境安排符合各国法律法规要求，具备充分的商业实质，承担相应的合规责任。建议在实施前咨询专业税务顾问，确保方案的合规性和可操作性。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam}</p>
        <p>📞 联系方式：${reportData.reportInfo.contactInfo || '400-888-9999'} | 📧 邮箱：${reportData.reportInfo.email || 'international@taxplanning.com'}</p>
    </div>
</body>
</html>
    `;
};

// 扩展的报告数据结构
export const getInternationalLayoutReportData = () => {
    return {
        companyInfo: {
            name: "科技创新股份有限公司",
            overseasRevenue: "8500万元 (22.4%)",
            overseasEntities: "3家",
            mainMarkets: "美国、欧盟、东南亚",
            relatedTransactions: "5800万元",
            currentTaxBurden: "境外综合税负率28.5%"
        },
        reportInfo: {
            reportDate: "2024年12月15日",
            planningPeriod: "2025年1月-2027年12月",
            reportNumber: "IL-20241215-001",
            projectTeam: "国际税务筹划专家团队",
            contactInfo: "400-888-9999",
            email: "international@taxplanning.com"
        },
        planningOverview: {
            totalSaving: 385,
            countriesInvolved: 8,
            structureComplexity: "中等",
            complianceRisk: "可控",
            rating: "A-",
            recommendation: "积极推进",
            globalEfficiency: "显著提升",
            opportunities: [
                "通过香港中间控股公司享受税收协定优惠，年节税约88万元",
                "优化转让定价策略，合理分配集团内部利润，年节税约76万元",
                "充分利用境外税收抵免机制，避免双重征税约85万元",
                "新加坡地区总部设立，享受总部激励政策，年节税约56万元",
                "荷兰知识产权控股公司设立，优化专利许可费安排，年节税约80万元"
            ],
            challenges: [
                "各国反避税规则日趋严格，经济实质要求不断提高",
                "BEPS行动计划全面实施，传统筹划模式面临挑战",
                "中间控股公司需要满足越来越严格的经济实质要求",
                "转让定价监管力度加强，需要更充分的同期资料支持",
                "受控外国企业规则扩大适用范围，合规成本上升",
                "数字税等新兴税种对国际税务筹划带来不确定性"
            ],
            effectMetrics: {
                annualSaving: 385,
                globalTaxOptimization: 12.3,
                doubleTaxationRelief: 85,
                implementationPeriod: "18-24个月"
            }
        },
        // 新增：跨境投资架构设计
        investmentStructure: {
            destinationAnalysis: {
                treatyNetworkAssessment: "基于企业现有和计划投资的国家/地区，我们对相关税收协定网络进行了全面评估。中国已与108个国家和地区签署税收协定，其中与主要投资目的地的协定条款相对优惠。重点分析了股息、利息、特许权使用费的预提税率，以及受益所有人、常设机构等关键条款。通过合理的协定网络规划，预计可实现年节税约55万元。",
                treatyComparison: [
                    {
                        country: "美国",
                        dividendRate: 10,
                        interestRate: 10,
                        royaltyRate: 10,
                        qualityRating: "良好"
                    },
                    {
                        country: "德国",
                        dividendRate: 5,
                        interestRate: 10,
                        royaltyRate: 6,
                        qualityRating: "优秀"
                    },
                    {
                        country: "新加坡",
                        dividendRate: 5,
                        interestRate: 7,
                        royaltyRate: 6,
                        qualityRating: "优秀"
                    },
                    {
                        country: "香港",
                        dividendRate: 5,
                        interestRate: 7,
                        royaltyRate: 7,
                        qualityRating: "优秀"
                    },
                    {
                        country: "荷兰",
                        dividendRate: 5,
                        interestRate: 10,
                        royaltyRate: 6,
                        qualityRating: "优秀"
                    },
                    {
                        country: "卢森堡",
                        dividendRate: 5,
                        interestRate: 10,
                        royaltyRate: 10,
                        qualityRating: "良好"
                    }
                ],
                localTaxAnalysis: "深入分析各投资目的地的税制结构，包括企业所得税、增值税、预提税等主要税种。重点关注税收优惠政策，如新加坡的总部激励计划、荷兰的创新盒制度等。同时评估各国税收征管环境，包括税务透明度、争议解决效率等因素。",
                taxRegimeComparison: [
                    {
                        jurisdiction: "香港",
                        corporateTaxRate: 16.5,
                        vatGst: "无",
                        withholdingTax: 0,
                        incentives: "离岸所得免税",
                        overallScore: 9.2
                    },
                    {
                        jurisdiction: "新加坡",
                        corporateTaxRate: 17,
                        vatGst: "7%",
                        withholdingTax: 5,
                        incentives: "总部激励计划",
                        overallScore: 8.8
                    },
                    {
                        jurisdiction: "荷兰",
                        corporateTaxRate: 25.8,
                        vatGst: "21%",
                        withholdingTax: 0,
                        incentives: "创新盒制度",
                        overallScore: 8.5
                    },
                    {
                        jurisdiction: "美国",
                        corporateTaxRate: 21,
                        vatGst: "州销售税",
                        withholdingTax: 30,
                        incentives: "研发税收抵免",
                        overallScore: 7.2
                    },
                    {
                        jurisdiction: "德国",
                        corporateTaxRate: 29.9,
                        vatGst: "19%",
                        withholdingTax: 26.4,
                        incentives: "研发激励",
                        overallScore: 6.8
                    }
                ],
                investmentEnvironment: "综合评估政治、经济、法律环境对国际税务筹划的影响。重点分析政治稳定性、经济发展前景、法治完善程度、国际关系状况等因素。",
                environmentFactors: [
                    {
                        category: "亚太地区",
                        description: "政治稳定，经济发展迅速，是企业国际化的重要区域",
                        politicalStability: "高",
                        economicDevelopment: "快速",
                        ruleOfLaw: "完善"
                    },
                    {
                        category: "欧洲地区",
                        description: "法治环境成熟，税收协定网络完善，监管要求严格",
                        politicalStability: "高",
                        economicDevelopment: "稳定",
                        ruleOfLaw: "非常完善"
                    },
                    {
                        category: "北美地区",
                        description: "市场规模大，监管环境复杂，税制相对复杂",
                        politicalStability: "中等",
                        economicDevelopment: "稳定",
                        ruleOfLaw: "完善"
                    },
                    {
                        category: "其他地区",
                        description: "新兴市场机会与风险并存，需谨慎评估",
                        politicalStability: "中等",
                        economicDevelopment: "快速",
                        ruleOfLaw: "发展中"
                    }
                ]
            },
            holdingCompany: {
                jurisdictionComparison: "对主要控股地进行全面比较分析，从税率水平、协定网络、监管环境、实务操作等多个维度进行评估。",
                majorJurisdictions: [
                    {
                        name: "香港特别行政区",
                        description: "亚洲国际金融中心，税制简单，协定网络完善",
                        corporateTaxRate: "16.5%",
                        treatyNetwork: 42,
                        regulatoryEnvironment: "成熟",
                        keyAdvantages: "地理位置优越，监管环境稳定",
                        recommendationScore: 9.5,
                        recommended: true
                    },
                    {
                        name: "新加坡",
                        description: "东南亚金融中心，税收优惠政策丰富",
                        corporateTaxRate: "17%",
                        treatyNetwork: 85,
                        regulatoryEnvironment: "优秀",
                        keyAdvantages: "总部激励政策，区域覆盖",
                        recommendationScore: 9.0,
                        recommended: false
                    },
                    {
                        name: "荷兰",
                        description: "欧洲门户，全球最广协定网络",
                        corporateTaxRate: "25.8%",
                        treatyNetwork: 94,
                        regulatoryEnvironment: "严格",
                        keyAdvantages: "参股免税制度，欧盟优势",
                        recommendationScore: 8.5,
                        recommended: false
                    },
                    {
                        name: "卢森堡",
                        description: "欧盟金融中心，持股公司制度完善",
                        corporateTaxRate: "24.9%",
                        treatyNetwork: 83,
                        regulatoryEnvironment: "严格",
                        keyAdvantages: "金融业发达，基金中心",
                        recommendationScore: 7.8,
                        recommended: false
                    }
                ],
                economicSubstanceRequirements: "各国对中间控股公司的经济实质要求日趋严格，需要满足人员、场所、活动等多重要求。建议建立真实的区域管理功能，承担实际的投资管理、风险管理职责。",
                substanceElements: [
                    {
                        requirement: "实际管理地",
                        description: "董事会会议、重大决策需在当地进行",
                        compliancePoints: "建立董事会议程、决议记录等文档体系",
                        criticality: "critical"
                    },
                    {
                        requirement: "充足人员配置",
                        description: "需要配置具备专业能力的管理人员",
                        compliancePoints: "招聘本地员工，建立组织架构",
                        criticality: "critical"
                    },
                    {
                        requirement: "实际办公场所",
                        description: "需要有真实的办公场所和基础设施",
                        compliancePoints: "租赁或购买办公场所，建立办公环境",
                        criticality: "important"
                    },
                    {
                        requirement: "实质性经营活动",
                        description: "需要开展真实的投资管理等业务活动",
                        compliancePoints: "建立投资决策流程，开展管理活动",
                        criticality: "critical"
                    },
                    {
                        requirement: "合理商业目的",
                        description: "设立和运营需要有合理的商业目的",
                        compliancePoints: "制定商业计划，建立业务合理性",
                        criticality: "important"
                    },
                    {
                        requirement: "独立决策能力",
                        description: "需要具备独立的决策和执行能力",
                        compliancePoints: "建立独立的决策机制和流程",
                        criticality: "standard"
                    }
                ],
                functionalDesign: "中间控股公司的功能定位需要与经济实质要求相匹配，建议设计多功能区域总部模式。",
                businessFunctions: [
                    {
                        function: "投资管理",
                        description: "管理下属投资，制定投资策略",
                        valueContribution: "核心功能"
                    },
                    {
                        function: "资金管理",
                        description: "统筹资金配置，提供融资服务",
                        valueContribution: "支持功能"
                    },
                    {
                        function: "风险管理",
                        description: "识别评估风险，制定管控措施",
                        valueContribution: "保障功能"
                    },
                    {
                        function: "战略规划",
                        description: "制定区域发展战略和规划",
                        valueContribution: "指导功能"
                    }
                ]
            },
            treatyBenefits: {
                beneficialOwnershipStrategy: "受益所有人认定是享受税收协定优惠的核心要件。需要从所有权、支配权、代理性质、实质活动等多个维度证明企业是所得的真实受益所有人。",
                ownershipTests: [
                    {
                        testName: "所有权测试",
                        description: "对所得具有法律和经济上的所有权",
                        status: "pass"
                    },
                    {
                        testName: "支配权测试",
                        description: "对所得的使用和处分具有支配权",
                        status: "pass"
                    },
                    {
                        testName: "代理人测试",
                        description: "不是代理人或管道公司",
                        status: "pass"
                    },
                    {
                        testName: "实质活动测试",
                        description: "开展实质性经营活动",
                        status: "fail"
                    }
                ],
                treatyUtilization: "深度分析各类所得的协定优惠条款，制定系统性的协定利用策略。",
                incomeTypeAnalysis: [
                    {
                        incomeType: "股息所得",
                        domesticRate: 20,
                        treatyRate: 5,
                        savingRate: 15,
                        annualSaving: 45,
                        specialConditions: "需满足持股比例和期限要求"
                    },
                    {
                        incomeType: "利息所得",
                        domesticRate: 20,
                        treatyRate: 7,
                        savingRate: 13,
                        annualSaving: 28,
                        specialConditions: "避免资本弱化调整"
                    },
                    {
                        incomeType: "特许权使用费",
                        domesticRate: 20,
                        treatyRate: 6,
                        savingRate: 14,
                        annualSaving: 65,
                        specialConditions: "明确特许权使用费范围"
                    },
                    {
                        incomeType: "技术服务费",
                        domesticRate: 20,
                        treatyRate: 10,
                        savingRate: 10,
                        annualSaving: 22,
                        specialConditions: "区分技术服务与特许权使用费"
                    }
                ],
                disputeResolution: "建立完善的协定争议预防和处理机制，包括相互协商程序和仲裁程序的运用。",
                mutualAgreementProcedure: [
                    "在协定规定期限内及时启动相互协商程序",
                    "提供充分的事实和法律依据支持申请",
                    "配合税务机关开展相互协商工作",
                    "根据协商结果及时调整税务处理"
                ],
                arbitrationProcedure: [
                    "评估仲裁程序的适用条件和可行性",
                    "权衡仲裁程序的成本效益关系",
                    "选择合适的仲裁员和仲裁规则",
                    "确保仲裁结果的有效执行"
                ]
            }
        },
        // 新增：转让定价管理
        transferPricing: {
            policyFormulation: {
                armsPrincipleApplication: "独立交易原则是转让定价管理的核心原则。需要建立系统性的转让定价政策，确保关联交易定价符合独立交易原则，同时兼顾税务效率和合规要求。",
                pricingMethods: [
                    {
                        methodName: "可比非受控价格法(CUP)",
                        applicableScenario: "标准化产品销售，有可比的非关联交易",
                        operationalPoints: "寻找可比交易，调整可比性差异",
                        advantages: "最直接可靠，税务机关接受度高",
                        limitations: "可比交易难以找到，调整困难",
                        recommendation: "推荐"
                    },
                    {
                        methodName: "再销售价格法(RPM)",
                        applicableScenario: "简单分销业务，转售方功能风险较低",
                        operationalPoints: "确定合理毛利率，分析功能风险",
                        advantages: "适用面广，操作相对简单",
                        limitations: "需要详细的功能风险分析",
                        recommendation: "强烈推荐"
                    },
                    {
                        methodName: "成本加成法(CPM)",
                        applicableScenario: "制造、服务提供等成本中心业务",
                        operationalPoints: "确定合理成本基础和加成率",
                        advantages: "成本信息相对容易获得",
                        limitations: "加成率的确定需要可比性分析",
                        recommendation: "推荐"
                    },
                    {
                        methodName: "交易净利润法(TNMM)",
                        applicableScenario: "复杂关联交易，缺乏直接可比",
                        operationalPoints: "选择适当的净利润率指标",
                        advantages: "实用性强，可比数据相对丰富",
                        limitations: "需要深入的功能风险分析",
                        recommendation: "强烈推荐"
                    },
                    {
                        methodName: "利润分割法(PSM)",
                        applicableScenario: "高度整合业务，双方均贡献独特价值",
                        operationalPoints: "分析价值贡献因素，合理分配利润",
                        advantages: "反映真实价值创造过程",
                        limitations: "操作复杂，数据要求高",
                        recommendation: "一般"
                    },
                    {
                        methodName: "其他合理方法",
                        applicableScenario: "特殊情况下无法适用常规方法",
                        operationalPoints: "根据具体情况设计定价方法",
                        advantages: "灵活性强，针对性好",
                        limitations: "税务机关接受度有待验证",
                        recommendation: "谨慎使用"
                    }
                ],
                documentationFramework: "建立完善的转让定价文档体系，包括主体文档、本地文档和特殊事项文档。",
                documentTypes: [
                    {
                        documentName: "主体文档",
                        completionLevel: 85,
                        keyContent: "集团组织架构、业务描述、无形资产等",
                        complianceStatus: "基本合规"
                    },
                    {
                        documentName: "本地文档",
                        completionLevel: 75,
                        keyContent: "本地实体信息、关联交易详情等",
                        complianceStatus: "待完善"
                    },
                    {
                        documentName: "国别报告",
                        completionLevel: 90,
                        keyContent: "分国别收入、利润、税收等信息",
                        complianceStatus: "合规"
                    },
                    {
                        documentName: "特殊事项文档",
                        completionLevel: 60,
                        keyContent: "成本分摊协议、APA等特殊安排",
                        complianceStatus: "待完善"
                    }
                ],
                pricingStrategyOptimization: "制定符合价值创造原则的定价策略，统筹考虑集团整体税负和合规要求。重点优化无形资产许可、管理服务、融资安排等关键交易的定价。"
            },
            valueChainAnalysis: {
                functionalAnalysis: "深入分析集团价值链各环节的功能、风险和资产配置，确保转让定价安排与价值创造相匹配。",
                valueChainElements: [
                    {
                        function: "研发功能",
                        description: "技术研发、产品设计等创新活动",
                        riskLevel: "高",
                        valueContribution: 25
                    },
                    {
                        function: "生产制造",
                        description: "产品生产、质量控制等制造活动",
                        riskLevel: "中",
                        valueContribution: 20
                    },
                    {
                        function: "市场营销",
                        description: "品牌建设、市场推广等营销活动",
                        riskLevel: "高",
                        valueContribution: 30
                    },
                    {
                        function: "销售分销",
                        description: "客户开发、渠道管理等销售活动",
                        riskLevel: "中",
                        valueContribution: 15
                    },
                    {
                        function: "管理支持",
                        description: "财务、人力、IT等支持服务",
                        riskLevel: "低",
                        valueContribution: 10
                    }
                ],
                valueCreationPrinciple: "贯彻价值创造地征税原则，确保税收权益与经济实质相匹配。",
                valueCreationFactors: [
                    {
                        factor: "人力要素",
                        description: "关键人员的地理分布和贡献",
                        weight: 30,
                        currentScore: 7.5,
                        targetScore: 8.5
                    },
                    {
                        factor: "资本要素",
                        description: "资本投入的规模和效率",
                        weight: 25,
                        currentScore: 8.0,
                        targetScore: 8.0
                    },
                    {
                        factor: "技术要素",
                        description: "技术创新和知识产权贡献",
                        weight: 25,
                        currentScore: 6.5,
                        targetScore: 8.0
                    },
                    {
                        factor: "市场要素",
                        description: "市场开发和客户关系价值",
                        weight: 20,
                        currentScore: 7.0,
                        targetScore: 7.5
                    }
                ],
                bepsCompliance: "全面应对BEPS行动计划要求，特别是行动计划8-10关于无形资产转让定价的新规则。",
                bepsActions: [
                    {
                        actionPlan: "行动计划8-10",
                        requirement: "无形资产转让定价与价值创造一致",
                        complianceLevel: "基本合规",
                        countermeasures: "建立价值创造分析体系"
                    },
                    {
                        actionPlan: "行动计划13",
                        requirement: "三层转让定价文档要求",
                        complianceLevel: "完全合规",
                        countermeasures: "完善文档管理制度"
                    },
                    {
                        actionPlan: "行动计划14",
                        requirement: "争议解决机制完善",
                        complianceLevel: "基本合规",
                        countermeasures: "建立争议预防机制"
                    }
                ]
            },
            apa: {
                applicationConditions: "公司年关联交易金额达到5800万元，超过APA申请门槛。建议就技术许可费和管理服务费申请双边或多边APA。",
                eligibilityCriteria: [
                    {
                        criterion: "交易金额",
                        description: "年关联交易金额超过4000万元",
                        currentStatus: "已满足条件",
                        status: "pass"
                    },
                    {
                        criterion: "定价复杂性",
                        description: "转让定价方法复杂或存在争议",
                        currentStatus: "技术许可费定价复杂",
                        status: "pass"
                    },
                    {
                        criterion: "风险程度",
                        description: "转让定价调整风险较高",
                        currentStatus: "中等风险",
                        status: "pass"
                    },
                    {
                        criterion: "合作意愿",
                        description: "相关税务机关有合作意愿",
                        currentStatus: "需要进一步沟通",
                        status: "fail"
                    },
                    {
                        criterion: "文档准备",
                        description: "具备完整的转让定价文档",
                        currentStatus: "基本具备",
                        status: "pass"
                    },
                    {
                        criterion: "商业稳定性",
                        description: "业务模式相对稳定",
                        currentStatus: "业务稳定",
                        status: "pass"
                    }
                ],
                applicationProcess: "APA申请需要经过预备会谈、正式申请、谈判签署三个阶段。",
                processSteps: [
                    {
                        phase: "预备会谈",
                        duration: "2-3个月",
                        description: "与税务机关进行初步沟通，评估APA可行性",
                        keyPoints: "明确APA范围，评估可行性"
                    },
                    {
                        phase: "正式申请",
                        duration: "1-2个月",
                        description: "提交正式APA申请书和相关资料",
                        keyPoints: "准备完整申请材料"
                    },
                    {
                        phase: "尽职调查",
                        duration: "3-6个月",
                        description: "税务机关开展尽职调查和资料审核",
                        keyPoints: "配合调查，补充资料"
                    },
                    {
                        phase: "谈判协商",
                        duration: "6-12个月",
                        description: "就APA方案进行谈判和协商",
                        keyPoints: "积极谈判，达成共识"
                    },
                    {
                        phase: "协议签署",
                        duration: "1个月",
                        description: "签署正式APA协议",
                        keyPoints: "确定协议条款"
                    }
                ],
                executionMonitoring: "建立APA执行监控机制，确保严格按照协议条款执行，定期提交执行报告。",
                metrics: {
                    expectedTerm: 5,
                    transactionAmount: 3500,
                    complianceSaving: 45,
                    certaintylevel: 95
                }
            }
        },
        // 新增：反避税规则应对
        antiAvoidance: {
            cfcRules: {
                ruleElementsAnalysis: "中国CFC规则要求对实际税负低于12.5%的受控外国企业进行特别纳税调整。需要重点关注控制测试、税负测试和实质经营活动豁免条件。",
                cfcTests: [
                    {
                        testType: "控制测试",
                        description: "中国居民企业直接或间接控制外国企业",
                        testResult: "香港子公司100%控股，构成控制",
                        result: "fail",
                        recommendation: "考虑引入第三方投资者"
                    },
                    {
                        testType: "税负测试",
                        description: "外国企业实际税负低于12.5%",
                        testResult: "香港公司税负16.5%，高于标准",
                        result: "pass",
                        recommendation: "维持当前税负水平"
                    },
                    {
                        testType: "实质经营测试",
                        description: "主要开展实质性经营活动",
                        testResult: "经营活动实质性需要加强",
                        result: "fail",
                        recommendation: "增强经济实质"
                    }
                ],
                economicSubstanceStrategy: "通过增强经济实质来满足CFC规则豁免条件，避免被认定为消极投资公司。",
                substanceEnhancement: [
                    {
                        measure: "人员配置强化",
                        description: "增加本地管理人员和业务人员",
                        implementationCost: "中等",
                        expectedEffect: "显著提升",
                        priority: "critical"
                    },
                    {
                        measure: "业务活动扩展",
                        description: "开展更多实质性经营活动",
                        implementationCost: "较高",
                        expectedEffect: "显著提升",
                        priority: "critical"
                    },
                    {
                        measure: "决策职能本地化",
                        description: "将重要决策职能转移到本地",
                        implementationCost: "较低",
                        expectedEffect: "中等提升",
                        priority: "important"
                    },
                    {
                        measure: "资产实质化",
                        description: "增加本地实质性资产",
                        implementationCost: "较高",
                        expectedEffect: "中等提升",
                        priority: "standard"
                    }
                ],
                complianceManagement: "建立CFC识别、监控和申报的完整合规管理体系。"
            },
            generalAntiAvoidance: {
                businessSubstanceStandards: "一般反避税规则要求安排具备充分的商业实质，不能以获取税收利益为唯一或主要目的。",
                substanceTests: [
                    {
                        standard: "商业目的测试",
                        requirement: "具有合理的商业目的，不仅仅为了税收利益",
                        currentStatus: "满足",
                        riskLevel: "低",
                        improvementMeasures: "继续维持商业合理性"
                    },
                    {
                        standard: "经济实质测试",
                        requirement: "具有真实的经济内容和商业实质",
                        currentStatus: "部分满足",
                        riskLevel: "中",
                        improvementMeasures: "增强经济实质要素"
                    },
                    {
                        standard: "主要目的测试",
                        requirement: "获取税收利益不是主要目的",
                        currentStatus: "满足",
                        riskLevel: "低",
                        improvementMeasures: "加强商业目的文档"
                    },
                    {
                        standard: "形式与实质测试",
                        requirement: "法律形式与经济实质相匹配",
                        currentStatus: "部分满足",
                        riskLevel: "中",
                        improvementMeasures: "优化架构设计"
                    }
                ],
                adjustmentPrevention: "建立反避税风险防范机制，通过事前规划和过程管理降低调整风险。",
                preventionStrategies: [
                    {
                        strategyName: "商业实质建设",
                        description: "建立真实的商业实质，确保安排具有经济合理性",
                        riskLevel: "low",
                        implementationSteps: [
                            "增强经营活动的实质性",
                            "建立完善的商业文档",
                            "确保决策过程的独立性",
                            "维护商业目的的一致性"
                        ]
                    },
                    {
                        strategyName: "合规文档管理",
                        description: "建立完善的合规文档体系，证明安排的合理性",
                        riskLevel: "medium",
                        implementationSteps: [
                            "建立决策文档记录制度",
                            "保存商业目的证明材料",
                            "维护经济实质证据",
                            "建立定期审查机制"
                        ]
                    }
                ]
            },
            otherMeasures: {
                thinCapitalizationResponse: "资本弱化规则限制过度债务融资的利息扣除，需要控制债资比在安全港范围内。",
                capitalStructure: {
                    currentDebtEquityRatio: "1.8:1",
                    safeHarborRatio: "2:1",
                    excessAmount: 0,
                    complianceRecommendation: "符合标准"
                },
                hybridMismatchResponse: "关注混合错配规则，避免同一支出在多个税收管辖区获得扣除或收入不确认的情况。",
                beneficialOwnershipResponse: "建立受益所有人身份的证明体系，确保能够证明是所得的真实受益所有人。"
            }
        },
        complianceAssessment: {
            overallScore: 7.3,
            categories: [
                {
                    name: "BEPS合规风险",
                    score: 7.5,
                    level: "中",
                    description: "BEPS行动计划对传统国际税务筹划提出新要求，需要重点关注价值创造原则",
                    controlMeasures: [
                        "建立符合BEPS要求的转让定价政策，确保与价值创造相匹配",
                        "完善三层转让定价文档体系，满足透明度要求",
                        "确保架构具备充分的经济实质，避免空壳公司风险",
                        "建立争议预防和解决机制，降低税务争议风险"
                    ]
                },
                {
                    name: "各国反避税风险",
                    score: 7.0,
                    level: "中",
                    description: "各国反避税规则趋严，筹划空间收窄，合规要求提高",
                    controlMeasures: [
                        "深入研究各国反避税规则的最新变化和要求",
                        "确保架构和交易安排的商业合理性和经济实质",
                        "建立动态的合规性评估和监控机制",
                        "制定应对反避税调查的预案和策略"
                    ]
                },
                {
                    name: "协定优惠享受风险",
                    score: 8.0,
                    level: "低",
                    description: "税收协定优惠享受程序相对规范，但需要满足越来越严格的条件",
                    controlMeasures: [
                        "严格按照协定条款和程序享受优惠待遇",
                        "确保满足受益所有人等实质性条件要求",
                        "建立协定优惠申请和备案的标准化流程",
                        "定期评估协定政策变化对优惠享受的影响"
                    ]
                },
                {
                    name: "转让定价合规风险",
                    score: 7.2,
                    level: "中",
                    description: "转让定价监管日趋严格，同期资料要求提高，调整风险上升",
                    controlMeasures: [
                        "建立完善的转让定价政策和管理制度",
                        "准备充分详实的同期资料和支持文档",
                        "考虑签署预约定价安排，提高税务确定性",
                        "建立定期的转让定价合规性检查机制"
                    ]
                },
                {
                    name: "受控外国企业风险",
                    score: 6.8,
                    level: "中",
                    description: "CFC规则适用范围扩大，实质经营要求提高",
                    controlMeasures: [
                        "建立CFC识别和监控体系，及时识别适用情况",
                        "增强境外实体的经济实质，满足豁免条件",
                        "建立CFC申报和合规管理制度",
                        "定期评估CFC规则变化对企业的影响"
                    ]
                },
                {
                    name: "数字税等新兴税种",
                    score: 6.5,
                    level: "高",
                    description: "数字税等新兴税种带来不确定性，需要密切关注",
                    controlMeasures: [
                        "跟踪各国数字税立法进展和实施情况",
                        "评估数字税对企业税负和合规的影响",
                        "建立数字税合规管理制度和申报程序",
                        "考虑在国际税收改革框架下的应对策略"
                    ]
                }
            ]
        },
        implementationPlan: {
            overallStrategy: "采用稳健渐进的实施策略，分阶段推进国际税务筹划方案。充分考虑各国法律法规和反避税规则的要求，确保所有国际税务安排具备充分的商业实质和经济合理性。实施过程中要加强与各国税务机关的沟通，做好合规管理，建立风险预警和应对机制。",
            phases: [
                {
                    stage: "第一阶段：基础架构搭建",
                    content: "香港控股公司设立、经济实质建设、基础合规体系建立",
                    timeline: "6-9个月",
                    expectedBenefit: "架构基础完成，年节税约88万元",
                    keyRisk: "经济实质要求满足程度"
                },
                {
                    stage: "第二阶段：转让定价优化",
                    content: "转让定价政策制定、同期资料准备、APA申请启动",
                    timeline: "9-15个月",
                    expectedBenefit: "转让定价合规，年节税约76万元",
                    keyRisk: "各国税务机关协调难度"
                },
                {
                    stage: "第三阶段：协定优惠申请",
                    content: "税收协定优惠申请、境外税收抵免优化、反避税规则应对",
                    timeline: "12-18个月",
                    expectedBenefit: "协定优惠落地，年节税约95万元",
                    keyRisk: "协定优惠认定标准变化"
                },
                {
                    stage: "第四阶段：架构完善优化",
                    content: "架构运行优化、持续监控机制建立、新政策适应调整",
                    timeline: "18-24个月",
                    expectedBenefit: "整体方案成熟，年节税约126万元",
                    keyRisk: "国际税收政策环境变化"
                }
            ],
            successFactors: [
                "深入理解各国税法和国际税收规则，确保方案的合规性和可操作性",
                "建立专业的国际税务团队，配备具备丰富经验的专业人员",
                "与各国知名专业机构建立合作关系，获得高质量的本地化专业支持",
                "建立高效的项目管理机制，确保各阶段目标按计划顺利实现",
                "加强与各国税务机关的主动沟通，争取政策理解和实施支持",
                "建立完善的风险预警和快速应对机制，及时应对政策环境变化",
                "确保充分的资源投入，包括人力、财力和时间的合理配置",
                "建立内外部协调机制，统筹各相关部门和机构的配合工作"
            ],
            monitoringPoints: [
                "定期跟踪评估各国税法和反避税规则的最新变化及其影响",
                "持续监控香港控股公司等中间实体的经济实质维持情况",
                "跟踪转让定价政策的执行效果和各国税务机关的接受程度",
                "关注税收协定的谈判修订进展对协定优惠享受的潜在影响",
                "监控境外税收抵免政策变化和申报执行的准确性",
                "评估BEPS等国际税收改革对企业筹划方案的持续影响",
                "建立关键指标监控体系，及时发现和处理合规风险",
                "定期评估整体国际税务筹划的成本效益和风险收益比"
            ]
        }
    };
};