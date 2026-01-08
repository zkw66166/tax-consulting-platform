// src/report/BusinessRestructuringPlanningReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>业务重构筹划报告</title>
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
            border-bottom: 4px solid #e74c3c;
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
        
        .executive-summary {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border: 3px solid #ff9800;
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
        }
        
        .executive-summary::before {
            content: "⭐";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 24px;
        }
        
        .executive-summary h2 {
            color: #e65100;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            border-bottom: 2px solid #ff9800;
            padding-bottom: 10px;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .summary-card {
            background: rgba(255,255,255,0.9);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #ff9800;
        }
        
        .summary-card h4 {
            color: #e65100;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        .summary-card .value {
            color: #bf360c;
            font-size: 24px;
            font-weight: 700;
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
            background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
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
            border-top: 5px solid #e74c3c;
            position: relative;
        }
        
        .analysis-item::before {
            content: "▶";
            position: absolute;
            left: 25px;
            top: 25px;
            color: #e74c3c;
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
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .highlight-card {
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #e74c3c;
        }
        
        .highlight-card h3 {
            color: #c62828;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .highlight-card .value {
            color: #b71c1c;
            font-size: 28px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .digital-transformation-card {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px solid #2196f3;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .digital-transformation-card::before {
            content: "🚀";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 20px;
        }
        
        .digital-transformation-card h5 {
            color: #1565c0;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .transformation-details {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }
        
        .transformation-detail {
            text-align: center;
            background: rgba(255,255,255,0.8);
            padding: 10px;
            border-radius: 8px;
        }
        
        .transformation-detail h6 {
            color: #0d47a1;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        
        .transformation-detail .value {
            color: #1976d2;
            font-size: 16px;
            font-weight: 700;
        }
        
        .value-chain-card {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            border: 2px solid #9c27b0;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .value-chain-card::before {
            content: "🔗";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 20px;
        }
        
        .value-chain-card h5 {
            color: #6a1b9a;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .shared-service-card {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .shared-service-card::before {
            content: "🏗️";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 20px;
        }
        
        .shared-service-card h5 {
            color: #2e7d32;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .process-flow {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .flow-step {
            text-align: center;
            flex: 1;
            position: relative;
            min-width: 120px;
            margin: 10px 5px;
        }
        
        .flow-step:not(:last-child)::after {
            content: "→";
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            color: #e74c3c;
            font-size: 20px;
            font-weight: bold;
        }
        
        .flow-step h5 {
            color: #2c3e50;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .flow-step p {
            color: #7f8c8d;
            font-size: 12px;
            margin: 0;
            text-indent: 0;
        }
        
        .restructuring-diagram {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }
        
        .restructuring-diagram h5 {
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .before-after {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
        
        .before-section, .after-section {
            text-align: center;
        }
        
        .before-section h6, .after-section h6 {
            color: #e74c3c;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 15px;
            padding: 8px 0;
            border-bottom: 2px solid #e74c3c;
        }
        
        .business-unit {
            background: #fff;
            border: 2px solid #e74c3c;
            border-radius: 8px;
            padding: 10px;
            margin: 10px 0;
        }
        
        .business-unit.optimized {
            border-color: #27ae60;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .business-unit h6 {
            color: #e74c3c;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .business-unit.optimized h6 {
            color: #27ae60;
        }
        
        .business-unit p {
            color: #7f8c8d;
            font-size: 11px;
            margin: 0;
            text-indent: 0;
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
            color: #e74c3c;
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
            color: #e74c3c;
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
            background: linear-gradient(135deg, #e74c3c, #c0392b);
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
            background: linear-gradient(120deg, #ffcdd2 0%, #ef9a9a 100%);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .impact-analysis {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        
        .impact-item {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
        }
        
        .impact-item.positive {
            border-color: #27ae60;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .impact-item.negative {
            border-color: #e74c3c;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .impact-item h6 {
            color: #2c3e50;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .impact-item.positive h6 {
            color: #27ae60;
        }
        
        .impact-item.negative h6 {
            color: #e74c3c;
        }
        
        .impact-item p {
            font-size: 13px;
            margin: 0;
            text-indent: 0;
        }
        
        .policy-card {
            background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
            border: 2px solid #3f51b5;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .policy-card::before {
            content: "📋";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 20px;
        }
        
        .policy-card h5 {
            color: #283593;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .innovation-roadmap {
            background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
            border: 2px solid #ffc107;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }
        
        .roadmap-timeline {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
            position: relative;
        }
        
        .roadmap-timeline::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: #ffc107;
            z-index: 1;
        }
        
        .timeline-point {
            background: white;
            border: 3px solid #ffc107;
            border-radius: 50%;
            padding: 15px;
            text-align: center;
            position: relative;
            z-index: 2;
            flex: 1;
            margin: 0 10px;
        }
        
        .timeline-point h6 {
            color: #f57f17;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .timeline-point p {
            color: #ff8f00;
            font-size: 10px;
            margin: 0;
            text-indent: 0;
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
        
        @media (max-width: 768px) {
            .company-info {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .grid-2, .grid-3, .grid-4 {
                grid-template-columns: 1fr;
            }
            
            .before-after {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .flow-step:not(:last-child)::after {
                content: "↓";
                position: static;
                transform: none;
                display: block;
                margin: 10px 0;
            }
            
            .process-flow {
                flex-direction: column;
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
        <h1>业务重构筹划报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="executive-summary">
        <h2>🎯 执行摘要</h2>
        <p>基于数字化转型、价值链重构、共享服务等业务重构策略，本报告为企业制定了全面的业务流程再造与商业模式创新方案。通过系统性的业务重构，预计可实现年节税<span class="highlight-text">${reportData.executiveSummary.totalSaving}万元</span>，业务效率提升<span class="highlight-text">${reportData.executiveSummary.efficiencyImprovement}%</span>，为企业可持续发展奠定坚实基础。</p>
        
        <div class="summary-grid">
            <div class="summary-card">
                <h4>重构方案</h4>
                <div class="value">${reportData.executiveSummary.schemeCount}个</div>
            </div>
            <div class="summary-card">
                <h4>年节税额</h4>
                <div class="value">${reportData.executiveSummary.totalSaving}万</div>
            </div>
            <div class="summary-card">
                <h4>实施周期</h4>
                <div class="value">${reportData.executiveSummary.implementationPeriod}</div>
            </div>
            <div class="summary-card">
                <h4>投资回报</h4>
                <div class="value">${reportData.executiveSummary.roi}%</div>
            </div>
        </div>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>🏢 企业业务现状</h3>
            <p><strong>企业名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>主营业务</strong><span>${reportData.companyInfo.mainBusiness}</span></p>
            <p><strong>业务模式</strong><span>${reportData.companyInfo.businessModel}</span></p>
            <p><strong>收入构成</strong><span>${reportData.companyInfo.revenueStructure}</span></p>
            <p><strong>数字化程度</strong><span>${reportData.companyInfo.digitalizationLevel}</span></p>
            <p><strong>市场地位</strong><span>${reportData.companyInfo.marketPosition}</span></p>
        </div>
        <div class="info-card">
            <h3>📊 重构筹划概览</h3>
            <p><strong>筹划期间</strong><span>${reportData.reportInfo.planningPeriod}</span></p>
            <p><strong>重构维度</strong><span>${reportData.planningOverview.dimensions}个</span></p>
            <p><strong>创新程度</strong><span>${reportData.planningOverview.innovationLevel}</span></p>
            <p><strong>预计节税总额</strong><span class="highlight-text">${reportData.planningOverview.totalSaving}万元</span></p>
            <p><strong>风险等级</strong><span>${reportData.planningOverview.riskLevel}</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🚀 数字化转型税务机遇</h2>
        </div>
        <div class="section-content">
            <div class="subsection">
                <div class="subsection-header">1️⃣ 数字经济税收政策机遇</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>数字服务税收政策分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.digitalTransformation.digitalEconomyPolicies.digitalServiceAnalysis}</p>
                        
                        <div class="grid-2">
                            ${reportData.digitalTransformation.digitalEconomyPolicies.policyOpportunities.map(opportunity => `
                                <div class="policy-card">
                                    <h5>${opportunity.name}</h5>
                                    <p style="margin: 0; text-indent: 0; color: #283593; font-size: 14px;">${opportunity.description}</p>
                                    <div class="transformation-details">
                                        <div class="transformation-detail">
                                            <h6>适用范围</h6>
                                            <div class="value" style="font-size: 12px;">${opportunity.scope}</div>
                                        </div>
                                        <div class="transformation-detail">
                                            <h6>税率优势</h6>
                                            <div class="value">${opportunity.taxRate}</div>
                                        </div>
                                        <div class="transformation-detail">
                                            <h6>节税潜力</h6>
                                            <div class="value">${opportunity.savingPotential}万</div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>跨境电商税收优惠机遇</h4>
                        <p><span class="paragraph-number">2</span>${reportData.digitalTransformation.digitalEconomyPolicies.crossBorderEcommerceAnalysis}</p>
                        
                        <table>
                            <tr>
                                <th>业务模式</th>
                                <th>适用政策</th>
                                <th>税收优惠</th>
                                <th>申请条件</th>
                                <th>节税效果</th>
                            </tr>
                            ${reportData.digitalTransformation.digitalEconomyPolicies.crossBorderOpportunities.map(opportunity => `
                                <tr>
                                    <td style="font-weight: 600;">${opportunity.businessModel}</td>
                                    <td>${opportunity.policy}</td>
                                    <td style="color: #27ae60;">${opportunity.taxBenefit}</td>
                                    <td>${opportunity.conditions}</td>
                                    <td style="color: #27ae60;">${opportunity.effect}万</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 电子商务模式创新筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>平台模式选择与优化</h4>
                        <p><span class="paragraph-number">1</span>${reportData.digitalTransformation.eCommerceInnovation.platformModeAnalysis}</p>
                        
                        <div class="grid-3">
                            ${reportData.digitalTransformation.eCommerceInnovation.platformModes.map(mode => `
                                <div class="digital-transformation-card">
                                    <h5>${mode.name}</h5>
                                    <p style="margin: 0; text-indent: 0; color: #1565c0; font-size: 14px;">${mode.description}</p>
                                    <div class="transformation-details">
                                        <div class="transformation-detail">
                                            <h6>税率</h6>
                                            <div class="value">${mode.taxRate}</div>
                                        </div>
                                        <div class="transformation-detail">
                                            <h6>风险级别</h6>
                                            <div class="value" style="font-size: 12px;">${mode.riskLevel}</div>
                                        </div>
                                        <div class="transformation-detail">
                                            <h6>节税潜力</h6>
                                            <div class="value">${mode.savingPotential}万</div>
                                        </div>
                                    </div>
                                    ${mode.recommended ? '<p style="color: #1976d2; font-weight: 600; margin-top: 10px; text-indent: 0;">⭐ 推荐模式</p>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>供应链金融创新</h4>
                        <p><span class="paragraph-number">2</span>${reportData.digitalTransformation.eCommerceInnovation.supplyChainFinanceAnalysis}</p>
                        
                        <div class="feature-box">
                            <h4>供应链金融产品创新方案</h4>
                            <div class="grid-2">
                                ${reportData.digitalTransformation.eCommerceInnovation.supplyChainProducts.map(product => `
                                    <div class="impact-item positive">
                                        <h6>${product.name}</h6>
                                        <p><strong>业务模式：</strong>${product.businessModel}</p>
                                        <p><strong>税务优势：</strong>${product.taxAdvantage}</p>
                                        <p><strong>风险控制：</strong>${product.riskControl}</p>
                                        <p><strong>预期收益：</strong>${product.expectedReturn}万元/年</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 新零售模式税务筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>线上线下融合策略</h4>
                        <p><span class="paragraph-number">1</span>${reportData.digitalTransformation.newRetailPlanning.omniChannelAnalysis}</p>
                        
                        <div class="restructuring-diagram">
                            <h5>🔄 新零售模式重构</h5>
                            <div class="before-after">
                                <div class="before-section">
                                    <h6>传统零售模式</h6>
                                    ${reportData.digitalTransformation.newRetailPlanning.traditionalModel.map(component => `
                                        <div class="business-unit">
                                            <h6>${component.name}</h6>
                                            <p>${component.description}</p>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="after-section">
                                    <h6>新零售模式</h6>
                                    ${reportData.digitalTransformation.newRetailPlanning.newRetailModel.map(component => `
                                        <div class="business-unit optimized">
                                            <h6>${component.name}</h6>
                                            <p>${component.description}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>智慧物流体系构建</h4>
                        <p><span class="paragraph-number">2</span>${reportData.digitalTransformation.newRetailPlanning.smartLogisticsAnalysis}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>物流成本降低</h5>
                                <div class="value">${reportData.digitalTransformation.newRetailPlanning.logisticsMetrics.costReduction}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>配送效率提升</h5>
                                <div class="value">${reportData.digitalTransformation.newRetailPlanning.logisticsMetrics.efficiencyImprovement}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>税务优化效果</h5>
                                <div class="value">${reportData.digitalTransformation.newRetailPlanning.logisticsMetrics.taxOptimization}万</div>
                            </div>
                            <div class="metric-card">
                                <h5>投资回收期</h5>
                                <div class="value" style="font-size: 18px;">${reportData.digitalTransformation.newRetailPlanning.logisticsMetrics.paybackPeriod}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🔗 价值链重构优化</h2>
        </div>
        <div class="section-content">
            <div class="subsection">
                <div class="subsection-header">1️⃣ 研发价值链优化</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>研发中心战略布局</h4>
                        <p><span class="paragraph-number">1</span>${reportData.valueChainRestructuring.rdValueChain.rdCenterAnalysis}</p>
                        
                        <div class="grid-2">
                            ${reportData.valueChainRestructuring.rdValueChain.rdCenters.map(center => `
                                <div class="value-chain-card">
                                    <h5>${center.name}</h5>
                                    <p style="margin: 0; text-indent: 0; color: #6a1b9a; font-size: 14px;">${center.description}</p>
                                    <div class="transformation-details">
                                        <div class="transformation-detail">
                                            <h6>功能定位</h6>
                                            <div class="value" style="font-size: 12px;">${center.function}</div>
                                        </div>
                                        <div class="transformation-detail">
                                            <h6>税收优惠</h6>
                                            <div class="value" style="font-size: 12px;">${center.taxBenefit}</div>
                                        </div>
                                        <div class="transformation-detail">
                                            <h6>节税效果</h6>
                                            <div class="value">${center.savingEffect}万</div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>知识产权价值管理</h4>
                        <p><span class="paragraph-number">2</span>${reportData.valueChainRestructuring.rdValueChain.ipManagementAnalysis}</p>
                        
                        <table>
                            <tr>
                                <th>知识产权类型</th>
                                <th>价值实现方式</th>
                                <th>税务处理</th>
                                <th>优惠政策</th>
                                <th>预期收益</th>
                            </tr>
                            ${reportData.valueChainRestructuring.rdValueChain.ipManagement.map(ip => `
                                <tr>
                                    <td style="font-weight: 600;">${ip.type}</td>
                                    <td>${ip.valueRealization}</td>
                                    <td>${ip.taxTreatment}</td>
                                    <td style="color: #27ae60;">${ip.policy}</td>
                                    <td style="color: #27ae60;">${ip.expectedReturn}万</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 生产价值链重构</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>智能制造升级方案</h4>
                        <p><span class="paragraph-number">1</span>${reportData.valueChainRestructuring.productionValueChain.smartManufacturingAnalysis}</p>
                        
                        <div class="innovation-roadmap">
                            <h5>智能制造升级路线图</h5>
                            <div class="roadmap-timeline">
                                ${reportData.valueChainRestructuring.productionValueChain.upgradeRoadmap.map(phase => `
                                    <div class="timeline-point">
                                        <h6>${phase.phase}</h6>
                                        <p>${phase.content}</p>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="metrics-grid">
                                <div class="metric-card">
                                    <h5>设备投资额</h5>
                                    <div class="value">${reportData.valueChainRestructuring.productionValueChain.investmentMetrics.equipmentInvestment}万</div>
                                </div>
                                <div class="metric-card">
                                    <h5>税收抵免</h5>
                                    <div class="value">${reportData.valueChainRestructuring.productionValueChain.investmentMetrics.taxCredit}万</div>
                                </div>
                                <div class="metric-card">
                                    <h5>效率提升</h5>
                                    <div class="value">${reportData.valueChainRestructuring.productionValueChain.investmentMetrics.efficiencyGain}%</div>
                                </div>
                                <div class="metric-card">
                                    <h5>综合收益</h5>
                                    <div class="value">${reportData.valueChainRestructuring.productionValueChain.investmentMetrics.totalBenefit}万</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>绿色制造发展策略</h4>
                        <p><span class="paragraph-number">2</span>${reportData.valueChainRestructuring.productionValueChain.greenManufacturingAnalysis}</p>
                        
                        <div class="grid-3">
                            ${reportData.valueChainRestructuring.productionValueChain.greenInitiatives.map(initiative => `
                                <div class="highlight-card" style="background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-color: #4caf50;">
                                    <h3 style="color: #2e7d32;">${initiative.name}</h3>
                                    <div class="value" style="color: #1b5e20;">${initiative.savingEffect}万</div>
                                    <p style="color: #388e3c; font-size: 12px; margin: 5px 0;">${initiative.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 营销价值链创新</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>精准营销体系构建</h4>
                        <p><span class="paragraph-number">1</span>${reportData.valueChainRestructuring.marketingValueChain.precisionMarketingAnalysis}</p>
                        
                        <div class="process-flow">
                            <div class="flow-step">
                                <h5>数据收集</h5>
                                <p>多渠道客户数据整合</p>
                            </div>
                            <div class="flow-step">
                                <h5>客户分析</h5>
                                <p>AI驱动客户画像构建</p>
                            </div>
                            <div class="flow-step">
                                <h5>精准投放</h5>
                                <p>个性化营销内容推送</p>
                            </div>
                            <div class="flow-step">
                                <h5>效果评估</h5>
                                <p>ROI追踪与优化调整</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>品牌价值提升策略</h4>
                        <p><span class="paragraph-number">2</span>${reportData.valueChainRestructuring.marketingValueChain.brandValueAnalysis}</p>
                        
                        <div class="feature-box">
                            <h4>品牌价值实现路径</h4>
                            <div class="impact-analysis">
                                ${reportData.valueChainRestructuring.marketingValueChain.brandValuePaths.map(path => `
                                    <div class="impact-item positive">
                                        <h6>${path.strategy}</h6>
                                        <p><strong>实施方式：</strong>${path.implementation}</p>
                                        <p><strong>税务优势：</strong>${path.taxAdvantage}</p>
                                        <p><strong>价值提升：</strong>${path.valueIncrease}万元</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏗️ 共享服务中心建设</h2>
        </div>
        <div class="section-content">
            <div class="subsection">
                <div class="subsection-header">1️⃣ 财务共享中心</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>集中核算模式设计</h4>
                        <p><span class="paragraph-number">1</span>${reportData.sharedServiceCenter.financialSharedService.centralizedAccountingAnalysis}</p>
                        
                        <div class="grid-2">
                            ${reportData.sharedServiceCenter.financialSharedService.organizationModels.map(model => `
                                <div class="shared-service-card">
                                    <h5>${model.name}</h5>
                                    <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${model.description}</p>
                                    <div class="transformation-details">
                                        <div class="transformation-detail">
                                            <h6>覆盖范围</h6>
                                            <div class="value" style="font-size: 12px;">${model.coverage}</div>
                                        </div>
                                        <div class="transformation-detail">
                                            <h6>成本节约</h6>
                                            <div class="value">${model.costSaving}%</div>
                                        </div>
                                        <div class="transformation-detail">
                                            <h6>效率提升</h6>
                                            <div class="value">${model.efficiencyGain}%</div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>资金管理优化方案</h4>
                        <p><span class="paragraph-number">2</span>${reportData.sharedServiceCenter.financialSharedService.fundManagementAnalysis}</p>
                        
                        <table>
                            <tr>
                                <th>资金管理模式</th>
                                <th>操作方式</th>
                                <th>税务优势</th>
                                <th>风险控制</th>
                                <th>预期效益</th>
                            </tr>
                            ${reportData.sharedServiceCenter.financialSharedService.fundManagementModes.map(mode => `
                                <tr>
                                    <td style="font-weight: 600;">${mode.name}</td>
                                    <td>${mode.operation}</td>
                                    <td style="color: #27ae60;">${mode.taxAdvantage}</td>
                                    <td>${mode.riskControl}</td>
                                    <td style="color: #27ae60;">${mode.expectedBenefit}万</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 技术共享中心</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>研发资源整合策略</h4>
                        <p><span class="paragraph-number">1</span>${reportData.sharedServiceCenter.technologySharedService.rdIntegrationAnalysis}</p>
                        
                        <div class="restructuring-diagram">
                            <h5>🔄 技术资源整合模式</h5>
                            <div class="before-after">
                                <div class="before-section">
                                    <h6>分散研发模式</h6>
                                    ${reportData.sharedServiceCenter.technologySharedService.beforeIntegration.map(unit => `
                                        <div class="business-unit">
                                            <h6>${unit.name}</h6>
                                            <p>${unit.issues}</p>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="after-section">
                                    <h6>集中共享模式</h6>
                                    ${reportData.sharedServiceCenter.technologySharedService.afterIntegration.map(unit => `
                                        <div class="business-unit optimized">
                                            <h6>${unit.name}</h6>
                                            <p>${unit.benefits}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>技术服务输出模式</h4>
                        <p><span class="paragraph-number">2</span>${reportData.sharedServiceCenter.technologySharedService.serviceOutputAnalysis}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>技术服务收入</h5>
                                <div class="value">${reportData.sharedServiceCenter.technologySharedService.serviceMetrics.revenue}万</div>
                            </div>
                            <div class="metric-card">
                                <h5>研发成本分摊</h5>
                                <div class="value">${reportData.sharedServiceCenter.technologySharedService.serviceMetrics.costAllocation}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>税收优惠享受</h5>
                                <div class="value">${reportData.sharedServiceCenter.technologySharedService.serviceMetrics.taxBenefit}万</div>
                            </div>
                            <div class="metric-card">
                                <h5>协同效应</h5>
                                <div class="value">${reportData.sharedServiceCenter.technologySharedService.serviceMetrics.synergyEffect}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 采购共享中心</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>集中采购模式优化</h4>
                        <p><span class="paragraph-number">1</span>${reportData.sharedServiceCenter.procurementSharedService.centralizedProcurementAnalysis}</p>
                        
                        <div class="feature-box">
                            <h4>采购集中化效益分析</h4>
                            <div class="grid-4">
                                ${reportData.sharedServiceCenter.procurementSharedService.procurementBenefits.map(benefit => `
                                    <div class="highlight-card" style="background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); border-color: #03a9f4;">
                                        <h3 style="color: #0277bd;">${benefit.category}</h3>
                                        <div class="value" style="color: #01579b;">${benefit.improvement}%</div>
                                        <p style="color: #0288d1; font-size: 12px; margin: 5px 0;">${benefit.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>供应商战略管理</h4>
                        <p><span class="paragraph-number">2</span>${reportData.sharedServiceCenter.procurementSharedService.supplierManagementAnalysis}</p>
                        
                        <table>
                            <tr>
                                <th>管理维度</th>
                                <th>评价指标</th>
                                <th>税务要求</th>
                                <th>优化措施</th>
                                <th>预期效果</th>
                            </tr>
                            ${reportData.sharedServiceCenter.procurementSharedService.supplierManagement.map(dimension => `
                                <tr>
                                    <td style="font-weight: 600;">${dimension.dimension}</td>
                                    <td>${dimension.indicators}</td>
                                    <td>${dimension.taxRequirements}</td>
                                    <td style="color: #27ae60;">${dimension.optimization}</td>
                                    <td style="color: #27ae60;">${dimension.expectedEffect}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📊 业务重构综合效益评估</h2>
        </div>
        <div class="section-content">
            <div class="feature-box">
                <h4>重构效益量化分析</h4>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h5>数字化转型效益</h5>
                        <div class="value">${reportData.comprehensiveBenefits.digitalTransformationBenefit}万</div>
                    </div>
                    <div class="metric-card">
                        <h5>价值链重构效益</h5>
                        <div class="value">${reportData.comprehensiveBenefits.valueChainBenefit}万</div>
                    </div>
                    <div class="metric-card">
                        <h5>共享服务效益</h5>
                        <div class="value">${reportData.comprehensiveBenefits.sharedServiceBenefit}万</div>
                    </div>
                    <div class="metric-card">
                        <h5>综合节税效果</h5>
                        <div class="value">${reportData.comprehensiveBenefits.totalTaxSaving}万</div>
                    </div>
                </div>
            </div>
            
            <div class="analysis-item">
                <h4>战略协同效应分析</h4>
                <div class="impact-analysis">
                    ${reportData.comprehensiveBenefits.synergyEffects.map(effect => `
                        <div class="impact-item ${effect.type}">
                            <h6>${effect.dimension}</h6>
                            <p><strong>协同方式：</strong>${effect.synergyMode}</p>
                            <p><strong>效益量化：</strong>${effect.quantifiedBenefit}</p>
                            <p><strong>实现路径：</strong>${effect.realizationPath}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="analysis-item">
                <h4>投资回报与风险评估</h4>
                <p><span class="paragraph-number">1</span>${reportData.comprehensiveBenefits.roiRiskAnalysis}</p>
                
                <div class="grid-2">
                    <div class="highlight-card" style="background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-color: #4caf50;">
                        <h3 style="color: #2e7d32;">投资回报指标</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                            <div style="text-align: center;">
                                <p style="margin: 0; color: #388e3c; font-size: 12px;">净现值(NPV)</p>
                                <div class="value" style="color: #1b5e20; font-size: 20px;">${reportData.comprehensiveBenefits.roiMetrics.npv}万</div>
                            </div>
                            <div style="text-align: center;">
                                <p style="margin: 0; color: #388e3c; font-size: 12px;">内部收益率(IRR)</p>
                                <div class="value" style="color: #1b5e20; font-size: 20px;">${reportData.comprehensiveBenefits.roiMetrics.irr}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="highlight-card" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #ff9800;">
                        <h3 style="color: #e65100;">风险控制指标</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                            <div style="text-align: center;">
                                <p style="margin: 0; color: #f57c00; font-size: 12px;">风险调整收益</p>
                                <div class="value" style="color: #e65100; font-size: 20px;">${reportData.comprehensiveBenefits.riskMetrics.riskAdjustedReturn}%</div>
                            </div>
                            <div style="text-align: center;">
                                <p style="margin: 0; color: #f57c00; font-size: 12px;">最大回撤</p>
                                <div class="value" style="color: #e65100; font-size: 20px;">${reportData.comprehensiveBenefits.riskMetrics.maxDrawdown}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚠️ 实施风险评估与控制</h2>
        </div>
        <div class="section-content">
            <div class="feature-box" style="text-align: center; margin-bottom: 30px;">
                <h4>综合实施风险评分</h4>
                <div style="font-size: 48px; font-weight: 700; color: #f39c12; margin: 20px 0;">
                    ${reportData.riskAssessment.overallScore}/10
                </div>
                <p style="color: #7f8c8d; font-size: 16px;">基于技术复杂度、组织变革、市场接受度、政策稳定性等因素综合评估</p>
            </div>
            
            <div class="grid-2">
                ${reportData.riskAssessment.categories.map(category => `
                    <div class="analysis-item ${category.level === '低' ? 'risk-low' : category.level === '中' ? 'risk-medium' : 'risk-high'}">
                        <h4>${category.name} - ${category.score}分 (${category.level}风险)</h4>
                        <p>${category.description}</p>
                        <ul>
                            ${category.controlMeasures.map(measure => `<li>${measure}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="analysis-item">
                <h4>风险预警与应急机制</h4>
                <p><span class="paragraph-number">1</span>${reportData.riskAssessment.riskWarningMechanism}</p>
                
                <div class="feature-box">
                    <h4>分级风险预警体系</h4>
                    <div class="grid-3">
                        ${reportData.riskAssessment.warningLevels.map(level => `
                            <div class="highlight-card" style="background: linear-gradient(135deg, ${level.bgColor} 0%, ${level.bgColorEnd} 100%); border-color: ${level.borderColor};">
                                <h3 style="color: ${level.textColor};">${level.level}</h3>
                                <div class="value" style="color: ${level.valueColor}; font-size: 16px;">${level.threshold}</div>
                                <p style="color: ${level.descColor}; font-size: 12px; margin: 5px 0;">${level.action}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📝 实施路线图与保障措施</h2>
        </div>
        <div class="section-content">
            <div class="conclusion-section">
                <div class="analysis-item risk-low">
                    <h4>总体实施策略</h4>
                    <p><span class="paragraph-number">1</span>${reportData.implementationPlan.overallStrategy}</p>
                </div>
                
                <div class="innovation-roadmap">
                    <h5>业务重构实施时间轴</h5>
                    <div class="roadmap-timeline">
                        ${reportData.implementationPlan.timeline.map(phase => `
                            <div class="timeline-point">
                                <h6>${phase.phase}</h6>
                                <p>${phase.duration}</p>
                                <p style="color: #ff8f00; font-weight: 600;">${phase.keyTasks}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="analysis-item">
                    <h4>分阶段实施计划</h4>
                    <table>
                        <tr>
                            <th>实施阶段</th>
                            <th>重构内容</th>
                            <th>时间周期</th>
                            <th>资源投入</th>
                            <th>预期效果</th>
                            <th>风险等级</th>
                        </tr>
                        ${reportData.implementationPlan.phases.map(phase => `
                            <tr>
                                <td style="font-weight: 600;">${phase.stage}</td>
                                <td>${phase.content}</td>
                                <td>${phase.duration}</td>
                                <td>${phase.resourceInput}</td>
                                <td style="color: #27ae60;">${phase.expectedBenefit}</td>
                                <td style="color: ${phase.riskLevel === '低' ? '#27ae60' : phase.riskLevel === '中' ? '#ff9800' : '#e74c3c'};">${phase.riskLevel}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div class="grid-2">
                    <div class="analysis-item risk-medium">
                        <h4>关键成功要素</h4>
                        <ul>
                            ${reportData.implementationPlan.successFactors.map(factor => `<li>${factor}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="analysis-item risk-low">
                        <h4>保障措施体系</h4>
                        <ul>
                            ${reportData.implementationPlan.safeguardMeasures.map(measure => `<li>${measure}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="analysis-item">
                    <h4>持续优化机制</h4>
                    <ul>
                        ${reportData.implementationPlan.continuousOptimization.map(mechanism => `<li>${mechanism}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本报告基于企业当前业务状况和最新税收政策进行分析，业务重构方案遵循合法合规原则，确保商业实质要求。企业应根据实际情况选择适合的重构路径，并承担相应的经营和法律责任。数字化转型、价值链重构等创新举措需要循序渐进，确保业务连续性和风险可控。</p>
        <br>
        <p><strong>技术支持与持续服务</strong></p>
        <p>🔧 技术支持：7×24小时专业技术支持 | 📈 数据分析：实时业务数据监控与分析 | 🎯 策略优化：季度策略评估与优化建议 | 📚 培训服务：定制化员工培训与能力提升</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam} | 🏢 技术支持：智能税务筹划系统平台</p>
    </div>
</body>
</html>
    `;
};

// 导出完整的报告数据结构
export const getBusinessRestructuringReportData = () => {
    return {
        companyInfo: {
            name: "创新科技集团有限公司",
            mainBusiness: "软件开发、系统集成、数据服务、技术咨询",
            businessModel: "B2B技术服务+B2C产品销售+平台运营",
            revenueStructure: "技术服务45%，产品销售35%，平台运营20%",
            digitalizationLevel: "中等（正在数字化转型）",
            marketPosition: "行业前三，细分领域领先"
        },
        reportInfo: {
            reportDate: "2024年12月15日",
            planningPeriod: "2025年1月-2027年12月",
            reportNumber: "BR-20241215-002",
            projectTeam: "业务重构与数字化转型专家团队"
        },
        executiveSummary: {
            totalSaving: 1285,
            schemeCount: 12,
            implementationPeriod: "24个月",
            roi: 156,
            efficiencyImprovement: 45
        },
        planningOverview: {
            totalSaving: 1285,
            dimensions: 8,
            innovationLevel: "高度创新",
            riskLevel: "中等可控"
        },
        digitalTransformation: {
            digitalEconomyPolicies: {
                digitalServiceAnalysis: "数字经济税收政策为企业数字化转型提供了重要机遇。当前我国正在推进数字服务税、跨境电商税收优惠等政策创新，为科技企业创造了新的税务筹划空间。数字服务业务可享受6%的增值税优惠税率，跨境数字服务还可享受出口退税政策。平台经济模式下，技术服务费、数据服务费、软件授权费等不同业务类型适用不同税率，通过合理的业务架构设计，可以显著优化整体税负结构。建议企业抓住数字经济发展机遇，积极布局数字服务业务，享受相关税收优惠政策。",
                policyOpportunities: [
                    {
                        name: "数字技术服务优惠",
                        description: "云计算、大数据、人工智能等技术服务享受6%增值税优惠",
                        scope: "技术开发、技术咨询、技术服务",
                        taxRate: "6%",
                        savingPotential: 125
                    },
                    {
                        name: "软件产品增值税优惠",
                        description: "自主开发软件产品销售享受即征即退政策",
                        scope: "自主开发的软件产品",
                        taxRate: "实际税负3%",
                        savingPotential: 85
                    },
                    {
                        name: "跨境电商出口优惠",
                        description: "跨境电商B2B出口享受出口退税和免税政策",
                        scope: "跨境电商出口业务",
                        taxRate: "免税+退税",
                        savingPotential: 65
                    },
                    {
                        name: "平台经济税收支持",
                        description: "数字平台运营服务享受信息技术服务优惠税率",
                        scope: "平台运营、信息撮合",
                        taxRate: "6%",
                        savingPotential: 45
                    }
                ],
                crossBorderEcommerceAnalysis: "跨境电商税收优惠政策为企业国际化发展提供了重要支撑。B2B跨境电商出口可享受出口退税政策，有效降低出口成本；跨境电商综合试验区提供通关便利和税收优惠；海外仓模式可以优化物流成本和税务处理。建议企业充分利用跨境电商政策红利，拓展国际市场，实现业务规模化发展。",
                crossBorderOpportunities: [
                    {
                        businessModel: "B2B跨境出口",
                        policy: "出口退税政策",
                        taxBenefit: "增值税免税+退税",
                        conditions: "真实贸易背景",
                        effect: 65
                    },
                    {
                        businessModel: "跨境技术服务",
                        policy: "技术出口免税",
                        taxBenefit: "技术服务免征增值税",
                        conditions: "技术先进性认定",
                        effect: 38
                    },
                    {
                        businessModel: "数字产品出口",
                        policy: "数字贸易优惠",
                        taxBenefit: "零税率+便利化",
                        conditions: "自主知识产权",
                        effect: 42
                    },
                    {
                        businessModel: "海外仓运营",
                        policy: "综试区政策",
                        taxBenefit: "保税+退税优惠",
                        conditions: "综试区注册",
                        effect: 28
                    }
                ]
            },
            eCommerceInnovation: {
                platformModeAnalysis: "电子商务平台模式选择对税负优化具有重要影响。自营模式适用货物销售税率（9%-13%），平台模式适用信息技术服务税率（6%），混合模式可以根据业务实质分别适用不同税率。通过合理的业务架构设计和交易模式安排，可以实现税负最优化。建议企业根据业务特点选择最适合的平台模式，充分享受税收优惠政策。",
                platformModes: [
                    {
                        name: "纯平台模式",
                        description: "为第三方商家提供交易平台和技术服务，不参与商品交易",
                        taxRate: "6%",
                        riskLevel: "低",
                        savingPotential: 156,
                        recommended: true
                    },
                    {
                        name: "自营+平台模式",
                        description: "部分商品自营销售，部分提供平台服务",
                        taxRate: "混合税率",
                        riskLevel: "中",
                        savingPotential: 98,
                        recommended: false
                    },
                    {
                        name: "技术服务模式",
                        description: "专注提供电商技术解决方案和咨询服务",
                        taxRate: "6%",
                        riskLevel: "低",
                        savingPotential: 72,
                        recommended: false
                    }
                ],
                supplyChainFinanceAnalysis: "供应链金融创新为企业提供了新的盈利模式和税务优化机会。通过保理、融资租赁、供应链融资等金融产品创新，可以优化资金流和税负结构。金融服务收入适用6%增值税税率，同时可以享受现代服务业相关税收优惠。建议企业积极探索供应链金融创新，实现业务协同和税务优化的双重效益。",
                supplyChainProducts: [
                    {
                        name: "应收账款保理",
                        businessModel: "为供应商提供应收账款保理服务",
                        taxAdvantage: "金融服务6%税率，利息收入免税",
                        riskControl: "完善风控体系，选择优质客户",
                        expectedReturn: 85
                    },
                    {
                        name: "供应链融资",
                        businessModel: "基于真实贸易背景提供融资服务",
                        taxAdvantage: "贷款服务免征增值税",
                        riskControl: "严格贸易背景审查，动态风险监控",
                        expectedReturn: 65
                    },
                    {
                        name: "融资租赁服务",
                        businessModel: "为客户提供设备融资租赁服务",
                        taxAdvantage: "租赁服务适用优惠税率",
                        riskControl: "设备保险，定期评估",
                        expectedReturn: 48
                    },
                    {
                        name: "票据服务",
                        businessModel: "票据承兑、贴现等票据服务",
                        taxAdvantage: "票据贴现利息收入优惠",
                        riskControl: "票据真实性验证，信用评估",
                        expectedReturn: 32
                    }
                ]
            },
            newRetailPlanning: {
                omniChannelAnalysis: "新零售模式通过线上线下融合创新，为企业创造了新的税务筹划机会。全渠道零售可以统一税务处理，优化库存管理和成本分摊；智慧门店可以享受技术服务和零售双重优惠；数据驱动的精准营销可以提升效率降低成本。建议企业积极布局新零售模式，实现销售渠道和税务处理的协同优化。",
                traditionalModel: [
                    { name: "独立线下门店", description: "各门店独立核算，效率较低" },
                    { name: "单一线上平台", description: "缺乏线下体验，客户粘性不足" },
                    { name: "分离库存管理", description: "库存分散，周转效率低" },
                    { name: "割裂营销体系", description: "营销资源分散，效果不佳" }
                ],
                newRetailModel: [
                    { name: "智慧门店网络", description: "数字化门店，线上线下一体化" },
                    { name: "全渠道平台", description: "统一平台，多渠道触达客户" },
                    { name: "智能库存系统", description: "AI驱动库存优化，提升周转" },
                    { name: "精准营销平台", description: "大数据驱动个性化营销" }
                ],
                smartLogisticsAnalysis: "智慧物流体系建设是新零售成功的关键基础设施。通过自动化仓储、智能配送、数据分析等技术手段，可以显著降低物流成本，提升服务质量。智慧物流投资可以享受设备投资抵免、技术改造支持等税收优惠，同时物流效率提升带来的成本节约效应显著。建议企业加大智慧物流投资，构建竞争优势。",
                logisticsMetrics: {
                    costReduction: 25,
                    efficiencyImprovement: 40,
                    taxOptimization: 32,
                    paybackPeriod: "18个月"
                }
            }
        },
        valueChainRestructuring: {
            rdValueChain: {
                rdCenterAnalysis: "研发价值链优化是企业技术创新和税务筹划的核心环节。通过建立专业化研发中心，可以享受高新技术企业、研发费用加计扣除、技术转让优惠等多重税收政策。不同功能定位的研发中心适用不同的优惠政策，需要根据企业实际情况进行战略布局。建议企业建立多层次研发体系，充分享受研发相关税收优惠。",
                rdCenters: [
                    {
                        name: "基础技术研发中心",
                        description: "承担前沿技术研究和基础技术开发",
                        function: "基础研究",
                        taxBenefit: "研发费用200%加计扣除",
                        savingEffect: 185
                    },
                    {
                        name: "产品技术研发中心",
                        description: "负责产品技术开发和产业化应用",
                        function: "应用研究",
                        taxBenefit: "高新技术企业15%税率",
                        savingEffect: 125
                    },
                    {
                        name: "软件技术研发中心",
                        description: "专注软件产品开发和技术服务",
                        function: "软件开发",
                        taxBenefit: "软件企业税收优惠",
                        savingEffect: 98
                    },
                    {
                        name: "数据技术研发中心",
                        description: "开展大数据、AI等新技术研发",
                        function: "新技术研发",
                        taxBenefit: "新技术企业优惠",
                        savingEffect: 76
                    }
                ],
                ipManagementAnalysis: "知识产权价值管理是研发投入转化为经济效益的关键环节。通过专利申请、技术转让、知识产权许可等方式，可以实现研发投资的价值最大化。技术转让所得可享受免税或减税优惠，知识产权许可收入适用较低税率。建议企业建立完善的知识产权管理体系，实现技术价值和税务效益的双重优化。",
                ipManagement: [
                    {
                        type: "发明专利",
                        valueRealization: "许可使用+技术转让",
                        taxTreatment: "技术转让所得免税",
                        policy: "500万元以下免税",
                        expectedReturn: 156
                    },
                    {
                        type: "软件著作权",
                        valueRealization: "软件产品销售+授权",
                        taxTreatment: "软件产品优惠税率",
                        policy: "实际税负3%",
                        expectedReturn: 85
                    },
                    {
                        type: "商标权",
                        valueRealization: "品牌许可+商标授权",
                        taxTreatment: "特许权使用费",
                        policy: "6%增值税税率",
                        expectedReturn: 42
                    },
                    {
                        type: "商业秘密",
                        valueRealization: "技术咨询+技术服务",
                        taxTreatment: "技术服务收入",
                        policy: "6%增值税税率",
                        expectedReturn: 38
                    }
                ]
            },
            productionValueChain: {
                smartManufacturingAnalysis: "智能制造升级是生产价值链重构的核心驱动力。通过自动化设备投资、数字化改造、智能化升级，可以显著提升生产效率，降低生产成本。智能制造投资可以享受设备一次性扣除、加速折旧、投资抵免等税收优惠。建议企业制定智能制造升级规划，分阶段实施，充分享受政策红利。",
                upgradeRoadmap: [
                    { phase: "第一阶段", content: "自动化设备改造" },
                    { phase: "第二阶段", content: "数字化系统集成" },
                    { phase: "第三阶段", content: "智能化生产线" },
                    { phase: "第四阶段", content: "智慧工厂建设" },
                    { phase: "第五阶段", content: "产业互联网平台" }
                ],
                investmentMetrics: {
                    equipmentInvestment: 2500,
                    taxCredit: 375,
                    efficiencyGain: 35,
                    totalBenefit: 1250
                },
                greenManufacturingAnalysis: "绿色制造发展是企业可持续发展和税务优化的重要方向。环保设备投资可享受投资抵免，清洁能源使用可享受税收优惠，资源综合利用可享受减免政策。绿色制造不仅符合国家政策导向，还能带来显著的税务效益。建议企业积极推进绿色制造转型，实现经济效益和环境效益的双赢。",
                greenInitiatives: [
                    {
                        name: "清洁能源改造",
                        description: "太阳能、风能等清洁能源应用",
                        savingEffect: 65
                    },
                    {
                        name: "环保设备投资",
                        description: "污染防治和环境保护设备",
                        savingEffect: 48
                    },
                    {
                        name: "资源综合利用",
                        description: "废料回收和资源再利用",
                        savingEffect: 35
                    }
                ]
            },
            marketingValueChain: {
                precisionMarketingAnalysis: "精准营销体系构建是营销价值链创新的核心。通过大数据分析、AI算法、个性化推荐等技术手段，可以显著提升营销效率，降低营销成本。数字化营销工具投资可享受技术设备优惠，营销服务外包可优化成本结构。建议企业加大数字化营销投入，构建精准营销能力。",
                brandValueAnalysis: "品牌价值提升是企业长期竞争优势的重要源泉。通过品牌建设、品牌传播、品牌保护等措施，可以提升品牌价值和市场溢价能力。品牌投资可享受广告费税前扣除，品牌授权可获得许可收入。建议企业制定品牌发展战略，持续提升品牌价值。",
                brandValuePaths: [
                    {
                        strategy: "品牌数字化建设",
                        implementation: "数字化品牌传播平台建设",
                        taxAdvantage: "技术服务费用税前扣除",
                        valueIncrease: 125
                    },
                    {
                        strategy: "品牌国际化发展",
                        implementation: "海外商标注册和品牌推广",
                        taxAdvantage: "出口营销费用优惠",
                        valueIncrease: 85
                    },
                    {
                        strategy: "品牌授权运营",
                        implementation: "品牌许可和授权合作",
                        taxAdvantage: "许可费收入优惠税率",
                        valueIncrease: 65
                    },
                    {
                        strategy: "品牌创新升级",
                        implementation: "品牌形象和产品创新",
                        taxAdvantage: "创新投入加计扣除",
                        valueIncrease: 45
                    }
                ]
            }
        },
        sharedServiceCenter: {
            financialSharedService: {
                centralizedAccountingAnalysis: "财务共享中心建设是企业财务管理现代化的重要举措。通过集中核算、统一流程、标准化作业，可以显著降低财务成本，提升管理效率。财务共享中心可以享受服务业税收优惠，同时实现规模经济效应。建议企业建立区域性或全国性财务共享中心，实现财务管理的集约化发展。",
                organizationModels: [
                    {
                        name: "全国统一财务中心",
                        description: "建立全国统一的财务共享服务中心",
                        coverage: "全国业务",
                        costSaving: 30,
                        efficiencyGain: 45
                    },
                    {
                        name: "区域财务中心",
                        description: "按区域建立财务共享服务中心",
                        coverage: "区域业务",
                        costSaving: 25,
                        efficiencyGain: 35
                    },
                    {
                        name: "专业财务中心",
                        description: "按业务类型建立专业财务中心",
                        coverage: "专业业务",
                        costSaving: 20,
                        efficiencyGain: 28
                    },
                    {
                        name: "混合财务中心",
                        description: "区域+专业的混合模式",
                        coverage: "综合业务",
                        costSaving: 35,
                        efficiencyGain: 50
                    }
                ],
                fundManagementAnalysis: "资金管理优化是财务共享中心的核心功能之一。通过资金集中管理、现金池运作、统一投资等方式，可以提高资金使用效率，降低财务成本。内部资金拆借可以优化利息费用，集中投资可以获得更好收益。建议企业建立资金管理中心，实现资金的统一管理和优化配置。",
                fundManagementModes: [
                    {
                        name: "资金池管理",
                        operation: "集团内部资金统一归集和调配",
                        taxAdvantage: "减少银行费用，优化利息收支",
                        riskControl: "建立资金风险监控体系",
                        expectedBenefit: 85
                    },
                    {
                        name: "内部银行",
                        operation: "建立集团内部银行进行资金运作",
                        taxAdvantage: "内部拆借利息优化",
                        riskControl: "完善内控制度和风险管理",
                        expectedBenefit: 65
                    },
                    {
                        name: "票据池管理",
                        operation: "集中管理和运作各类票据",
                        taxAdvantage: "票据贴现收益优化",
                        riskControl: "票据真实性和合规性管理",
                        expectedBenefit: 42
                    },
                    {
                        name: "现金管理",
                        operation: "优化现金流管理和短期投资",
                        taxAdvantage: "投资收益税务优化",
                        riskControl: "流动性风险控制",
                        expectedBenefit: 38
                    }
                ]
            },
            technologySharedService: {
                rdIntegrationAnalysis: "技术共享中心建设是企业技术资源优化配置的重要手段。通过研发资源整合、技术平台共享、协同创新等方式，可以提升研发效率，降低研发成本。技术共享中心可以享受高新技术企业优惠，技术服务收入适用优惠税率。建议企业建立技术共享平台，实现技术资源的最优配置。",
                beforeIntegration: [
                    { name: "各部门独立研发", issues: "资源分散，重复投资" },
                    { name: "技术标准不统一", issues: "协同困难，效率低下" },
                    { name: "人才资源分散", issues: "专业能力难以集中" },
                    { name: "成果转化困难", issues: "缺乏统一的转化机制" }
                ],
                afterIntegration: [
                    { name: "统一技术平台", benefits: "资源共享，避免重复投资" },
                    { name: "标准化技术体系", benefits: "提升协同效率" },
                    { name: "集中技术人才", benefits: "发挥专业优势" },
                    { name: "统一成果转化", benefits: "提升转化效率和收益" }
                ],
                serviceOutputAnalysis: "技术服务输出是技术共享中心价值实现的重要途径。通过对外提供技术咨询、技术开发、技术培训等服务，可以实现技术价值变现。技术服务收入适用6%增值税税率，符合条件的技术转让还可享受免税优惠。建议企业积极开展技术服务输出，实现技术投资的回报最大化。",
                serviceMetrics: {
                    revenue: 485,
                    costAllocation: 65,
                    taxBenefit: 92,
                    synergyEffect: 35
                }
            },
            procurementSharedService: {
                centralizedProcurementAnalysis: "采购共享中心建设是企业采购管理现代化的重要举措。通过集中采购、统一管理、规模化运作，可以降低采购成本，提升采购效率。集中采购可以增强议价能力，统一发票管理可以优化税务处理。建议企业建立采购共享中心，实现采购管理的专业化和规模化。",
                procurementBenefits: [
                    {
                        category: "成本控制",
                        improvement: 20,
                        description: "通过规模采购降低采购成本"
                    },
                    {
                        category: "效率提升",
                        improvement: 35,
                        description: "标准化流程提升采购效率"
                    },
                    {
                        category: "质量保障",
                        improvement: 25,
                        description: "统一质量标准确保采购质量"
                    },
                    {
                        category: "风险控制",
                        improvement: 40,
                        description: "集中管理降低采购风险"
                    }
                ],
                supplierManagementAnalysis: "供应商战略管理是采购共享中心的核心能力。通过建立供应商评价体系、实施动态管理、加强战略合作，可以构建稳定高效的供应链体系。供应商的税务合规性管理对企业税务风险控制具有重要意义。建议企业建立完善的供应商管理体系，实现供应链的协同优化。",
                supplierManagement: [
                    {
                        dimension: "资质管理",
                        indicators: "证照齐全，资质有效",
                        taxRequirements: "税务登记完整，纳税正常",
                        optimization: "建立资质动态监控机制",
                        expectedEffect: "降低合规风险"
                    },
                    {
                        dimension: "绩效评价",
                        indicators: "质量、交期、服务综合评价",
                        taxRequirements: "发票合规，税务处理规范",
                        optimization: "建立综合评价体系",
                        expectedEffect: "提升供应商质量"
                    },
                    {
                        dimension: "战略合作",
                        indicators: "长期合作，共同发展",
                        taxRequirements: "税务筹划协同，风险共担",
                        optimization: "建立战略伙伴关系",
                        expectedEffect: "实现协同发展"
                    },
                    {
                        dimension: "风险控制",
                        indicators: "风险识别，预警机制",
                        taxRequirements: "税务风险监控，合规审查",
                        optimization: "建立风险预警体系",
                        expectedEffect: "有效控制风险"
                    }
                ]
            }
        },
        comprehensiveBenefits: {
            digitalTransformationBenefit: 485,
            valueChainBenefit: 425,
            sharedServiceBenefit: 375,
            totalTaxSaving: 1285,
            synergyEffects: [
                {
                    dimension: "技术协同",
                    type: "positive",
                    synergyMode: "数字化技术与业务流程深度融合",
                    quantifiedBenefit: "效率提升35%，成本降低25%",
                    realizationPath: "统一技术平台+标准化流程+数据驱动决策"
                },
                {
                    dimension: "资源协同",
                    type: "positive",
                    synergyMode: "共享服务中心实现资源集中配置",
                    quantifiedBenefit: "资源利用率提升40%，管理成本降低30%",
                    realizationPath: "集中化管理+专业化分工+规模化运作"
                },
                {
                    dimension: "市场协同",
                    type: "positive",
                    synergyMode: "全渠道营销与品牌价值提升联动",
                    quantifiedBenefit: "市场占有率提升20%，品牌价值增长50%",
                    realizationPath: "精准营销+品牌建设+客户体验优化"
                },
                {
                    dimension: "创新协同",
                    type: "positive",
                    synergyMode: "研发创新与产业化应用协同发展",
                    quantifiedBenefit: "创新成果转化率提升60%，研发投资回报率提升45%",
                    realizationPath: "产学研结合+内外部协同+快速迭代"
                }
            ],
            roiRiskAnalysis: "业务重构投资回报与风险评估显示，项目具有良好的投资价值和可控的风险水平。预计总投资约8500万元，年化收益约1285万元，投资回收期约6.6年。净现值为正，内部收益率超过企业要求收益率，项目具有良好的经济效益。主要风险集中在技术实施、市场接受、组织变革等方面，通过完善的风险管理措施可以有效控制。",
            roiMetrics: {
                npv: 3850,
                irr: 18.5
            },
            riskMetrics: {
                riskAdjustedReturn: 15.2,
                maxDrawdown: 12.5
            }
        },
        riskAssessment: {
            overallScore: 6.2,
            categories: [
                {
                    name: "技术实施风险",
                    score: 6.5,
                    level: "中",
                    description: "数字化转型和智能制造升级存在技术实施复杂性风险",
                    controlMeasures: [
                        "选择成熟稳定的技术解决方案，降低技术风险",
                        "建立专业的技术团队，确保实施质量",
                        "制定详细的技术实施计划和应急预案",
                        "与专业技术服务商建立战略合作关系"
                    ]
                },
                {
                    name: "组织变革风险",
                    score: 6.8,
                    level: "中",
                    description: "业务重构涉及组织架构调整和流程再造，存在变革阻力",
                    controlMeasures: [
                        "加强变革管理和员工沟通，获得组织支持",
                        "建立完善的培训体系，提升员工适应能力",
                        "设立变革激励机制，调动员工积极性",
                        "分阶段推进变革，降低组织冲击"
                    ]
                },
                {
                    name: "市场接受风险",
                    score: 5.8,
                    level: "中",
                    description: "新业务模式和产品服务的市场接受度存在不确定性",
                    controlMeasures: [
                        "开展充分的市场调研和客户需求分析",
                        "采用试点推广的方式验证市场反应",
                        "建立客户反馈机制，持续优化产品服务",
                        "加强市场营销和客户教育工作"
                    ]
                },
                {
                    name: "政策稳定性风险",
                    score: 5.5,
                    level: "中",
                    description: "税收政策和产业政策调整可能影响筹划效果",
                    controlMeasures: [
                        "密切关注政策动态，及时调整筹划方案",
                        "建立政策风险预警机制，提前识别风险",
                        "保持与政府部门的良好沟通，准确理解政策",
                        "制定多套备选方案，增强方案灵活性"
                    ]
                }
            ],
            riskWarningMechanism: "建立三级风险预警机制，通过实时监控关键指标，及时识别和应对各类风险。绿色预警关注日常经营指标，黄色预警监控重要风险因素，红色预警应对重大风险事件。预警机制与应急响应体系联动，确保风险得到及时有效处置。",
            warningLevels: [
                {
                    level: "绿色预警",
                    threshold: "正常范围",
                    action: "日常监控",
                    bgColor: "#e8f5e8",
                    bgColorEnd: "#c8e6c9",
                    borderColor: "#4caf50",
                    textColor: "#2e7d32",
                    valueColor: "#1b5e20",
                    descColor: "#388e3c"
                },
                {
                    level: "黄色预警",
                    threshold: "注意范围",
                    action: "加强关注",
                    bgColor: "#fff3e0",
                    bgColorEnd: "#ffe0b2",
                    borderColor: "#ff9800",
                    textColor: "#e65100",
                    valueColor: "#bf360c",
                    descColor: "#f57c00"
                },
                {
                    level: "红色预警",
                    threshold: "风险范围",
                    action: "应急响应",
                    bgColor: "#ffebee",
                    bgColorEnd: "#ffcdd2",
                    borderColor: "#f44336",
                    textColor: "#c62828",
                    valueColor: "#b71c1c",
                    descColor: "#d32f2f"
                }
            ]
        },
        implementationPlan: {
            overallStrategy: "采用'统筹规划、分步实施、重点突破、协调推进'的总体实施策略。坚持以数字化转型为主线，以价值链重构为核心，以共享服务为支撑，系统推进业务重构各项工作。实施过程中注重顶层设计与基层创新相结合，确保改革方向正确、路径可行、效果可期。",
            timeline: [
                { phase: "启动准备", duration: "0-3月", keyTasks: "方案细化、团队组建、资源准备" },
                { phase: "试点实施", duration: "3-9月", keyTasks: "重点项目试点、经验总结" },
                { phase: "全面推广", duration: "9-18月", keyTasks: "全面实施、系统集成" },
                { phase: "优化提升", duration: "18-24月", keyTasks: "持续优化、效果评估" }
            ],
            phases: [
                {
                    stage: "第一阶段：数字化基础建设",
                    content: "数字化平台搭建、基础设施升级、数据治理体系建设",
                    duration: "6个月",
                    resourceInput: "2000万元",
                    expectedBenefit: "基础能力提升，为后续发展奠定基础",
                    riskLevel: "低"
                },
                {
                    stage: "第二阶段：价值链重构优化",
                    content: "研发中心建设、生产流程优化、营销体系创新",
                    duration: "9个月",
                    resourceInput: "3500万元",
                    expectedBenefit: "年节税约650万元，效率提升30%",
                    riskLevel: "中"
                },
                {
                    stage: "第三阶段：共享服务中心建设",
                    content: "财务、技术、采购共享中心建设和运营",
                    duration: "6个月",
                    resourceInput: "2000万元",
                    expectedBenefit: "年节税约375万元，成本降低25%",
                    riskLevel: "中"
                },
                {
                    stage: "第四阶段：系统集成与优化",
                    content: "各系统集成、业务流程优化、效果评估",
                    duration: "3个月",
                    resourceInput: "1000万元",
                    expectedBenefit: "年节税约260万元，协同效应显现",
                    riskLevel: "低"
                }
            ],
            successFactors: [
                "获得高层管理层的坚定支持和资源保障",
                "建立跨部门的项目管理团队和协调机制",
                "制定详细的实施计划和里程碑管控体系",
                "加强员工培训和变革管理，提升组织适应能力",
                "建立有效的风险识别和应对机制",
                "与专业咨询机构和技术服务商建立合作关系",
                "建立持续改进和优化的长效机制"
            ],
            safeguardMeasures: [
                "组织保障：成立业务重构领导小组，统筹推进各项工作",
                "资金保障：设立专项资金池，确保项目资金需求",
                "人才保障：建立专业团队，引进外部专家顾问",
                "技术保障：选择成熟可靠的技术方案和服务商",
                "制度保障：完善相关管理制度和操作规程",
                "监督保障：建立项目监督和绩效评估机制"
            ],
            continuousOptimization: [
                "建立业务重构效果的定期评估和反馈机制",
                "根据内外部环境变化及时调整重构策略和方案",
                "持续关注新技术、新政策、新模式的发展趋势",
                "建立客户需求和市场反馈的收集分析机制",
                "完善数据分析和决策支持体系",
                "培养组织的持续创新和自我优化能力",
                "建立最佳实践的总结推广机制",
                "加强与行业领先企业的交流学习"
            ]
        }
    };
};