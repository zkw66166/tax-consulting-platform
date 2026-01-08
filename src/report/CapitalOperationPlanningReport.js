// src/report/CapitalOperationPlanningReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>资本运作筹划报告</title>
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
            border-bottom: 4px solid #f39c12;
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
            background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
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
            border-top: 5px solid #f39c12;
            position: relative;
        }
        
        .analysis-item::before {
            content: "▶";
            position: absolute;
            left: 25px;
            top: 25px;
            color: #f39c12;
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
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        
        .highlight-card {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #ff9800;
        }
        
        .highlight-card h3 {
            color: #f57c00;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .highlight-card .value {
            color: #e65100;
            font-size: 28px;
            font-weight: 700;
            margin: 10px 0;
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
            color: #f39c12;
            font-size: 20px;
            font-weight: bold;
        }
        
        .structure-entity {
            background: #fff;
            border: 2px solid #f39c12;
            border-radius: 8px;
            padding: 10px 20px;
            margin: 0 10px;
            text-align: center;
            min-width: 120px;
        }
        
        .structure-entity h6 {
            color: #f39c12;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .structure-entity p {
            color: #7f8c8d;
            font-size: 12px;
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
            color: #f39c12;
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
            color: #f39c12;
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
            background: linear-gradient(135deg, #f39c12, #e67e22);
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
            background: linear-gradient(120deg, #ffe0b2 0%, #ffcc80 100%);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .comparison-table {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        
        .comparison-item {
            background: #f8f9fa;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        
        .comparison-item.recommended {
            border-color: #4caf50;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .comparison-item h5 {
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .comparison-item.recommended h5 {
            color: #2e7d32;
        }
        
        .comparison-metric {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px dotted #bdc3c7;
        }
        
        .comparison-metric:last-child {
            border-bottom: none;
        }
        
        .comparison-metric h6 {
            color: #7f8c8d;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        
        .comparison-metric .value {
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
        }
        
        .comparison-item.recommended .comparison-metric .value {
            color: #2e7d32;
        }
        
        .financing-flow {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .financing-step {
            text-align: center;
            flex: 1;
            position: relative;
        }
        
        .financing-step:not(:last-child)::after {
            content: "→";
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            color: #f39c12;
            font-weight: bold;
            font-size: 18px;
        }
        
        .financing-step h6 {
            color: #2c3e50;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .financing-step p {
            color: #7f8c8d;
            font-size: 12px;
            margin: 0;
            text-indent: 0;
        }
        
        .policy-advantage {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }
        
        .policy-advantage h6 {
            color: #1976d2;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .policy-advantage p {
            color: #0d47a1;
            font-size: 13px;
            margin: 0;
            text-indent: 0;
        }
        
        .tax-calculation {
            background: #fff;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .tax-calculation h5 {
            color: #424242;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 8px;
        }
        
        .tax-calculation-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px dotted #bdbdbd;
        }
        
        .tax-calculation-item:last-child {
            border-bottom: none;
            font-weight: 600;
            color: #f44336;
            font-size: 16px;
        }
        
        .optimization-card {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            border: 2px solid #9c27b0;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .optimization-card h4 {
            color: #7b1fa2;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .optimization-detail {
            background: white;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .optimization-detail h6 {
            color: #424242;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .optimization-detail p {
            color: #616161;
            font-size: 13px;
            margin: 0;
            text-indent: 0;
        }
        
        @media print {
            body { 
                margin: 0; 
                padding: 20px; 
                font-size: 12px;
                max-width: none;
            }
            .section { 
                page-break-inside: avoid; 
                margin-bottom: 30px;
            }
            .header {
                padding: 20px;
            }
            .grid-2, .grid-3, .grid-4 {
                grid-template-columns: 1fr !important;
            }
        }
        
        @media (max-width: 768px) {
            body {
                padding: 15px;
                font-size: 14px;
            }
            .company-info {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            .grid-2, .grid-3, .grid-4 {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            .comparison-table {
                grid-template-columns: 1fr;
            }
            .metrics-grid {
                grid-template-columns: 1fr 1fr;
            }
            .financing-flow {
                flex-direction: column;
            }
            .financing-step:not(:last-child)::after {
                content: "↓";
                position: static;
                display: block;
                transform: none;
                margin: 10px 0;
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
        <h1>资本运作筹划报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>💼 企业资本现状</h3>
            <p><strong>企业名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>注册资本</strong><span>${reportData.companyInfo.registeredCapital}</span></p>
            <p><strong>实收资本</strong><span>${reportData.companyInfo.paidCapital}</span></p>
            <p><strong>股东结构</strong><span>${reportData.companyInfo.shareholderStructure}</span></p>
            <p><strong>资产负债率</strong><span>${reportData.companyInfo.debtRatio}</span></p>
            <p><strong>融资需求</strong><span>${reportData.companyInfo.financingNeed}</span></p>
            <p><strong>行业类型</strong><span>${reportData.companyInfo.industry}</span></p>
            <p><strong>发展阶段</strong><span>${reportData.companyInfo.developmentStage}</span></p>
        </div>
        <div class="info-card">
            <h3>📊 筹划概览</h3>
            <p><strong>筹划期间</strong><span>${reportData.reportInfo.planningPeriod}</span></p>
            <p><strong>涉及方案</strong><span>${reportData.planningOverview.schemeCount}项</span></p>
            <p><strong>预计节税总额</strong><span class="highlight-text">${reportData.planningOverview.totalSaving}万元</span></p>
            <p><strong>资本优化程度</strong><span>${reportData.planningOverview.optimizationLevel}%</span></p>
            <p><strong>实施复杂度</strong><span>${reportData.planningOverview.complexity}</span></p>
            <p><strong>投资回报率</strong><span>${reportData.planningOverview.roi}%</span></p>
            <p><strong>风险等级</strong><span>${reportData.planningOverview.riskLevel}</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🎯 资本筹划概览</h2>
        </div>
        <div class="section-content">
            <div class="grid-4">
                <div class="highlight-card">
                    <h3>筹划评级</h3>
                    <div class="value">${reportData.planningOverview.rating}</div>
                </div>
                <div class="highlight-card">
                    <h3>实施建议</h3>
                    <div class="value" style="font-size: 20px;">${reportData.planningOverview.recommendation}</div>
                </div>
                <div class="highlight-card">
                    <h3>优化效果</h3>
                    <div class="value" style="font-size: 20px;">${reportData.planningOverview.effect}</div>
                </div>
                <div class="highlight-card">
                    <h3>合规风险</h3>
                    <div class="value" style="font-size: 20px;">${reportData.planningOverview.complianceRisk}</div>
                </div>
            </div>
            
            <div class="grid-2">
                <div class="analysis-item risk-low">
                    <h4>资本优化机会</h4>
                    <ul>
                        ${reportData.planningOverview.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-item risk-medium">
                    <h4>实施挑战难点</h4>
                    <ul>
                        ${reportData.planningOverview.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="feature-box">
                <h4>资本筹划效果预测</h4>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h5>年节税金额</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.annualSaving}万元</div>
                    </div>
                    <div class="metric-card">
                        <h5>资本成本降低</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.costReduction}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>财务杠杆优化</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.leverageOptimization}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>投资回报率</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.roi}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>税盾效应</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.taxShield}万元</div>
                    </div>
                    <div class="metric-card">
                        <h5>资本结构优化度</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.structureOptimization}%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🔍 详细筹划分析</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 股权架构设计筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>持股主体选择策略分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.equityStructure.holdingStrategyAnalysis}</p>
                        
                        <div class="comparison-table">
                            ${reportData.detailedAnalysis.equityStructure.holdingOptions.map((option, index) => `
                                <div class="comparison-item ${option.recommended ? 'recommended' : ''}">
                                    <h5>${option.type}</h5>
                                    <div class="comparison-metric">
                                        <h6>税负特点</h6>
                                        <div class="value">${option.taxCharacteristics}</div>
                                    </div>
                                    <div class="comparison-metric">
                                        <h6>年节税额</h6>
                                        <div class="value">${option.annualTaxSaving}万元</div>
                                    </div>
                                    <div class="comparison-metric">
                                        <h6>适用情形</h6>
                                        <div class="value">${option.applicableScenario}</div>
                                    </div>
                                    <div class="comparison-metric">
                                        <h6>实施难度</h6>
                                        <div class="value">${option.implementationDifficulty}</div>
                                    </div>
                                    ${option.recommended ? '<p style="color: #2e7d32; font-weight: 600; margin-top: 10px;">🌟 推荐方案</p>' : ''}
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="optimization-card">
                            <h4>合伙企业持股优势分析</h4>
                            <div class="optimization-detail">
                                <h6>税收穿透特性</h6>
                                <p>合伙企业本身不纳税，由合伙人承担纳税义务，避免双重征税问题</p>
                            </div>
                            <div class="optimization-detail">
                                <h6>灵活收益分配</h6>
                                <p>可以根据协议约定进行灵活的收益分配，满足不同股东需求</p>
                            </div>
                            <div class="optimization-detail">
                                <h6>股权激励友好</h6>
                                <p>便于设计股权激励方案，有利于人才引进和保留</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>当前股权结构分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.equityStructure.currentAnalysis}</p>
                        
                        <div class="structure-diagram">
                            <h5>📊 当前股权架构图</h5>
                            ${reportData.detailedAnalysis.equityStructure.currentStructure.map(level => `
                                <div class="structure-level">
                                    ${level.entities.map(entity => `
                                        <div class="structure-entity">
                                            <h6>${entity.name}</h6>
                                            <p>${entity.details}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="tax-calculation">
                            <h5>当前结构税负计算</h5>
                            <div class="tax-calculation-item">
                                <span>年度分红总额</span>
                                <span>${reportData.detailedAnalysis.equityStructure.currentTaxCalculation.annualDividend}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>个人所得税（20%）</span>
                                <span>${reportData.detailedAnalysis.equityStructure.currentTaxCalculation.personalIncomeTax}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>股权转让预计税负</span>
                                <span>${reportData.detailedAnalysis.equityStructure.currentTaxCalculation.equityTransferTax}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>年总税负</span>
                                <span>${reportData.detailedAnalysis.equityStructure.currentTaxCalculation.totalTaxBurden}万元</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>推荐架构优化方案</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.equityStructure.recommendedDesign}</p>
                        
                        <div class="structure-diagram">
                            <h5>🎯 推荐股权架构图</h5>
                            ${reportData.detailedAnalysis.equityStructure.recommendedStructure.map(level => `
                                <div class="structure-level">
                                    ${level.entities.map(entity => `
                                        <div class="structure-entity">
                                            <h6>${entity.name}</h6>
                                            <p>${entity.details}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="tax-calculation">
                            <h5>优化后税负计算</h5>
                            <div class="tax-calculation-item">
                                <span>年度分红总额</span>
                                <span>${reportData.detailedAnalysis.equityStructure.optimizedTaxCalculation.annualDividend}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>合伙企业层面税负</span>
                                <span>${reportData.detailedAnalysis.equityStructure.optimizedTaxCalculation.partnershipTax}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>自然人合伙人税负</span>
                                <span>${reportData.detailedAnalysis.equityStructure.optimizedTaxCalculation.naturalPersonTax}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>优化后年总税负</span>
                                <span>${reportData.detailedAnalysis.equityStructure.optimizedTaxCalculation.totalOptimizedTax}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>年节税金额</span>
                                <span>${reportData.detailedAnalysis.equityStructure.optimizedTaxCalculation.annualSaving}万元</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>实施路径与风险控制</h4>
                        <p><span class="paragraph-number">4</span>${reportData.detailedAnalysis.equityStructure.implementationPath}</p>
                        
                        <div class="financing-flow">
                            ${reportData.detailedAnalysis.equityStructure.implementationSteps.map((step, index) => `
                                <div class="financing-step">
                                    <h6>第${index + 1}步</h6>
                                    <p>${step}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 股权激励税务筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>股权激励政策体系分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.equityIncentive.policyAnalysis}</p>
                        
                        <div class="policy-advantage">
                            <h6>递延纳税优惠政策</h6>
                            <p>符合条件的股权激励可以在不超过12个月的期限内缴纳个人所得税，技术人员可享受递延至转让环节纳税的优惠</p>
                        </div>
                        
                        <div class="policy-advantage">
                            <h6>单独计税政策</h6>
                            <p>股权激励收入可以选择按月平摊计算，适用相对较低的税率，有效降低税负</p>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>股权激励现状评估</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.equityIncentive.currentStatus}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>激励对象</h5>
                                <div class="value">${reportData.detailedAnalysis.equityIncentive.metrics.participants}人</div>
                            </div>
                            <div class="metric-card">
                                <h5>激励股权比例</h5>
                                <div class="value">${reportData.detailedAnalysis.equityIncentive.metrics.equityRatio}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>平均税负率</h5>
                                <div class="value">${reportData.detailedAnalysis.equityIncentive.metrics.taxRate}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>优化潜力</h5>
                                <div class="value">${reportData.detailedAnalysis.equityIncentive.metrics.potential}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>技术人员比例</h5>
                                <div class="value">${reportData.detailedAnalysis.equityIncentive.metrics.techPersonnelRatio}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>管理人员比例</h5>
                                <div class="value">${reportData.detailedAnalysis.equityIncentive.metrics.managementRatio}%</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>股权激励方案对比</h4>
                        <table>
                            <tr>
                                <th>激励方式</th>
                                <th>税务特点</th>
                                <th>个人税负</th>
                                <th>企业成本</th>
                                <th>适用场景</th>
                                <th>递延纳税</th>
                            </tr>
                            ${reportData.detailedAnalysis.equityIncentive.incentiveOptions.map(option => `
                                <tr>
                                    <td style="font-weight: 600;">${option.type}</td>
                                    <td>${option.taxFeature}</td>
                                    <td style="color: ${option.personalTax.includes('低') ? '#27ae60' : '#e74c3c'};">${option.personalTax}</td>
                                    <td style="color: ${option.companyCost.includes('低') ? '#27ae60' : '#e74c3c'};">${option.companyCost}</td>
                                    <td>${option.scenario}</td>
                                    <td style="color: ${option.deferredTax === '支持' ? '#27ae60' : '#e74c3c'};">${option.deferredTax}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>股票期权筹划方案</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.equityIncentive.stockOptionPlan}</p>
                        
                        <div class="tax-calculation">
                            <h5>股票期权税负计算（以某技术骨干为例）</h5>
                            <div class="tax-calculation-item">
                                <span>期权授予价格</span>
                                <span>${reportData.detailedAnalysis.equityIncentive.stockOptionCalculation.grantPrice}元/股</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>期权行权价格</span>
                                <span>${reportData.detailedAnalysis.equityIncentive.stockOptionCalculation.exercisePrice}元/股</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>行权收益</span>
                                <span>${reportData.detailedAnalysis.equityIncentive.stockOptionCalculation.exerciseGain}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>递延纳税前税负</span>
                                <span>${reportData.detailedAnalysis.equityIncentive.stockOptionCalculation.taxBeforeDeferred}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>递延纳税后税负</span>
                                <span>${reportData.detailedAnalysis.equityIncentive.stockOptionCalculation.taxAfterDeferred}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>节税金额</span>
                                <span>${reportData.detailedAnalysis.equityIncentive.stockOptionCalculation.taxSaving}万元</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>限制性股票筹划方案</h4>
                        <p><span class="paragraph-number">4</span>${reportData.detailedAnalysis.equityIncentive.restrictedStockPlan}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>员工持股计划设计</h4>
                        <p><span class="paragraph-number">5</span>${reportData.detailedAnalysis.equityIncentive.esppDesign}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 企业重组税务筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>重组需求与目标分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.corporateRestructuring.needsAnalysis}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box">
                                <h4>重组驱动因素</h4>
                                <ul>
                                    ${reportData.detailedAnalysis.corporateRestructuring.drivingFactors.map(factor => `<li>${factor}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="feature-box">
                                <h4>重组目标</h4>
                                <ul>
                                    ${reportData.detailedAnalysis.corporateRestructuring.objectives.map(objective => `<li>${objective}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>重组方式选择与对比</h4>
                        <table>
                            <tr>
                                <th>重组方式</th>
                                <th>税务处理类型</th>
                                <th>节税效果</th>
                                <th>实施条件</th>
                                <th>实施难度</th>
                                <th>推荐度</th>
                            </tr>
                            ${reportData.detailedAnalysis.corporateRestructuring.restructuringOptions.map(option => `
                                <tr>
                                    <td style="font-weight: 600;">${option.method}</td>
                                    <td>${option.taxTreatment}</td>
                                    <td style="color: #27ae60;">${option.taxSaving}万元</td>
                                    <td>${option.conditions}</td>
                                    <td>
                                        ${option.difficulty === '低' ? '🟢 低' :
            option.difficulty === '中' ? '🟡 中' : '🔴 高'}
                                    </td>
                                    <td>
                                        ${option.recommendation === '强烈推荐' ? '⭐⭐⭐⭐⭐' :
            option.recommendation === '推荐' ? '⭐⭐⭐⭐' :
                option.recommendation === '一般' ? '⭐⭐⭐' : '⭐⭐'}
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>特殊性税务处理条件分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.corporateRestructuring.specialTaxTreatment}</p>
                        
                        <div class="optimization-card">
                            <h4>特殊性税务处理五大条件</h4>
                            ${reportData.detailedAnalysis.corporateRestructuring.specialConditions.map((condition, index) => `
                                <div class="optimization-detail">
                                    <h6>条件${index + 1}：${condition.title}</h6>
                                    <p>${condition.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>企业分立方案设计</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.corporateRestructuring.spinOffDesign}</p>
                        
                        <div class="structure-diagram">
                            <h5>🔄 企业分立架构图</h5>
                            ${reportData.detailedAnalysis.corporateRestructuring.spinOffStructure.map(level => `
                                <div class="structure-level">
                                    ${level.entities.map(entity => `
                                        <div class="structure-entity">
                                            <h6>${entity.name}</h6>
                                            <p>${entity.details}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="tax-calculation">
                            <h5>分立重组税务影响测算</h5>
                            <div class="tax-calculation-item">
                                <span>分立资产公允价值</span>
                                <span>${reportData.detailedAnalysis.corporateRestructuring.spinOffTaxCalculation.assetFairValue}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>分立资产计税基础</span>
                                <span>${reportData.detailedAnalysis.corporateRestructuring.spinOffTaxCalculation.assetTaxBasis}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>潜在转让所得</span>
                                <span>${reportData.detailedAnalysis.corporateRestructuring.spinOffTaxCalculation.potentialGain}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>一般性处理应纳税额</span>
                                <span>${reportData.detailedAnalysis.corporateRestructuring.spinOffTaxCalculation.generalTreatmentTax}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>特殊性处理递延税额</span>
                                <span>${reportData.detailedAnalysis.corporateRestructuring.spinOffTaxCalculation.specialTreatmentDeferred}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>当期节税金额</span>
                                <span>${reportData.detailedAnalysis.corporateRestructuring.spinOffTaxCalculation.currentSaving}万元</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>重组时机选择策略</h4>
                        <p><span class="paragraph-number">4</span>${reportData.detailedAnalysis.corporateRestructuring.timingStrategy}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">4️⃣ 投融资税务筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>债权投资vs股权投资分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.investmentFinancing.debtVsEquityAnalysis}</p>
                        
                        <div class="comparison-table">
                            <div class="comparison-item">
                                <h5>债权投资</h5>
                                <div class="comparison-metric">
                                    <h6>收益特点</h6>
                                    <div class="value">固定利息收入</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>税务处理</h6>
                                    <div class="value">利息收入征税</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>风险水平</h6>
                                    <div class="value">相对较低</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>税盾效应</h6>
                                    <div class="value">利息可扣除</div>
                                </div>
                            </div>
                            <div class="comparison-item recommended">
                                <h5>股权投资</h5>
                                <div class="comparison-metric">
                                    <h6>收益特点</h6>
                                    <div class="value">股息+资本利得</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>税务处理</h6>
                                    <div class="value">股息可能免税</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>风险水平</h6>
                                    <div class="value">相对较高</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>税盾效应</h6>
                                    <div class="value">无直接效应</div>
                                </div>
                                <p style="color: #2e7d32; font-weight: 600; margin-top: 10px;">🌟 推荐方案</p>
                            </div>
                            <div class="comparison-item">
                                <h5>混合投资</h5>
                                <div class="comparison-metric">
                                    <h6>收益特点</h6>
                                    <div class="value">兼具两者特点</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>税务处理</h6>
                                    <div class="value">分类处理</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>风险水平</h6>
                                    <div class="value">中等</div>
                                </div>
                                <div class="comparison-metric">
                                    <h6>税盾效应</h6>
                                    <div class="value">部分享受</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>现有融资结构分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.investmentFinancing.currentStructureAnalysis}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>债权融资比例</h5>
                                <div class="value">${reportData.detailedAnalysis.investmentFinancing.metrics.debtRatio}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>股权融资比例</h5>
                                <div class="value">${reportData.detailedAnalysis.investmentFinancing.metrics.equityRatio}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>加权平均资本成本</h5>
                                <div class="value">${reportData.detailedAnalysis.investmentFinancing.metrics.wacc}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>债务资本成本</h5>
                                <div class="value">${reportData.detailedAnalysis.investmentFinancing.metrics.costOfDebt}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>股权资本成本</h5>
                                <div class="value">${reportData.detailedAnalysis.investmentFinancing.metrics.costOfEquity}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>优化潜力</h5>
                                <div class="value">${reportData.detailedAnalysis.investmentFinancing.metrics.optimizationPotential}万元</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>融资方式选择策略</h4>
                        <table>
                            <tr>
                                <th>融资方式</th>
                                <th>成本特点</th>
                                <th>税务优势</th>
                                <th>适用条件</th>
                                <th>推荐指数</th>
                            </tr>
                            ${reportData.detailedAnalysis.investmentFinancing.financingOptions.map(option => `
                                <tr>
                                    <td style="font-weight: 600;">${option.method}</td>
                                    <td>${option.costCharacteristics}</td>
                                    <td style="color: #27ae60;">${option.taxAdvantage}</td>
                                    <td>${option.applicableConditions}</td>
                                    <td>
                                        ${option.recommendationIndex === 5 ? '⭐⭐⭐⭐⭐' :
                        option.recommendationIndex === 4 ? '⭐⭐⭐⭐' :
                            option.recommendationIndex === 3 ? '⭐⭐⭐' : '⭐⭐'}
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>债务税盾效应分析</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.investmentFinancing.taxShieldAnalysis}</p>
                        
                        <div class="tax-calculation">
                            <h5>税盾效应计算</h5>
                            <div class="tax-calculation-item">
                                <span>债务总额</span>
                                <span>${reportData.detailedAnalysis.investmentFinancing.taxShieldCalculation.totalDebt}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>平均利率</span>
                                <span>${reportData.detailedAnalysis.investmentFinancing.taxShieldCalculation.averageRate}%</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>年利息支出</span>
                                <span>${reportData.detailedAnalysis.investmentFinancing.taxShieldCalculation.annualInterest}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>企业所得税税率</span>
                                <span>${reportData.detailedAnalysis.investmentFinancing.taxShieldCalculation.corporateTaxRate}%</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>年税盾价值</span>
                                <span>${reportData.detailedAnalysis.investmentFinancing.taxShieldCalculation.annualTaxShield}万元</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>最优资本结构设计</h4>
                        <p><span class="paragraph-number">4</span>${reportData.detailedAnalysis.investmentFinancing.optimalStructureDesign}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">5️⃣ 股权投资基金筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>基金组织形式选择</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.investmentFund.organizationFormAnalysis}</p>
                        
                        <div class="comparison-table">
                            ${reportData.detailedAnalysis.investmentFund.fundTypes.map((type, index) => `
                                <div class="comparison-item ${type.recommended ? 'recommended' : ''}">
                                    <h5>${type.name}</h5>
                                    <div class="comparison-metric">
                                        <h6>税务特点</h6>
                                        <div class="value">${type.taxCharacteristics}</div>
                                    </div>
                                    <div class="comparison-metric">
                                        <h6>双重征税</h6>
                                        <div class="value">${type.doubleTaxation}</div>
                                    </div>
                                    <div class="comparison-metric">
                                        <h6>设立难度</h6>
                                        <div class="value">${type.setupDifficulty}</div>
                                    </div>
                                    <div class="comparison-metric">
                                        <h6>适用场景</h6>
                                        <div class="value">${type.applicableScenario}</div>
                                    </div>
                                    ${type.recommended ? '<p style="color: #2e7d32; font-weight: 600; margin-top: 10px;">🌟 推荐方案</p>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>创投企业税收优惠</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.investmentFund.vcTaxIncentives}</p>
                        
                        <div class="policy-advantage">
                            <h6>投资抵扣政策</h6>
                            <p>创投企业投资于种子期、初创期科技型企业满2年的，投资额的70%可以抵扣应纳税所得额</p>
                        </div>
                        
                        <div class="tax-calculation">
                            <h5>创投企业投资抵扣计算</h5>
                            <div class="tax-calculation-item">
                                <span>投资科技型企业金额</span>
                                <span>${reportData.detailedAnalysis.investmentFund.vcTaxCalculation.investmentAmount}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>可抵扣金额（70%）</span>
                                <span>${reportData.detailedAnalysis.investmentFund.vcTaxCalculation.deductibleAmount}万元</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>企业所得税税率</span>
                                <span>${reportData.detailedAnalysis.investmentFund.vcTaxCalculation.taxRate}%</span>
                            </div>
                            <div class="tax-calculation-item">
                                <span>节税金额</span>
                                <span>${reportData.detailedAnalysis.investmentFund.vcTaxCalculation.taxSaving}万元</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>基金运作税务优化</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.investmentFund.operationOptimization}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">6️⃣ 资本结构优化筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>资本成本分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.capitalStructure.costAnalysis}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>财务杠杆效应</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.capitalStructure.leverageEffect}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>资本结构调整方案</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.capitalStructure.adjustmentPlan}</p>
                        
                        <div class="financing-flow">
                            ${reportData.detailedAnalysis.capitalStructure.adjustmentSteps.map((step, index) => `
                                <div class="financing-step">
                                    <h6>阶段${index + 1}</h6>
                                    <p>${step}</p>
                                </div>
                            `).join('')}
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
                <div style="font-size: 48px; font-weight: 700; color: #f39c12; margin: 20px 0;">
                    ${reportData.riskAssessment.overallScore}/10
                </div>
                <p style="color: #7f8c8d; font-size: 16px;">基于法律合规、税务风险、财务风险等因素综合评估</p>
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
            
            <div class="optimization-card">
                <h4>重点风险防控要点</h4>
                ${reportData.riskAssessment.keyRiskControls.map((control, index) => `
                    <div class="optimization-detail">
                        <h6>${control.riskType}</h6>
                        <p>${control.controlMeasure}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📝 实施方案与计划</h2>
        </div>
        <div class="section-content">
            <div class="conclusion-section">
                <div class="analysis-item risk-low">
                    <h4>总体实施策略</h4>
                    <p><span class="paragraph-number">1</span>${reportData.implementationPlan.overallStrategy}</p>
                </div>
                
                <div class="analysis-item">
                    <h4>分步实施计划</h4>
                    <table>
                        <tr>
                            <th>实施阶段</th>
                            <th>主要内容</th>
                            <th>时间安排</th>
                            <th>预期效果</th>
                            <th>关键风险</th>
                            <th>责任部门</th>
                        </tr>
                        ${reportData.implementationPlan.phases.map(phase => `
                            <tr>
                                <td style="font-weight: 600;">${phase.stage}</td>
                                <td>${phase.content}</td>
                                <td>${phase.timeline}</td>
                                <td style="color: #27ae60;">${phase.expectedResult}</td>
                                <td style="color: #e74c3c;">${phase.keyRisk}</td>
                                <td>${phase.responsibleDepartment}</td>
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
                
                <div class="analysis-item">
                    <h4>配套措施建议</h4>
                    <ul>
                        ${reportData.implementationPlan.supportingMeasures.map(measure => `<li>${measure}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本报告基于现行法律法规和企业实际情况进行分析，资本运作方案仅供参考。企业应确保所有资本运作活动符合相关法律法规要求，承担相应的法律和财务风险。建议在专业机构指导下实施相关方案。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam}</p>
        <p>📞 联系方式：${reportData.reportInfo.contactInfo} | 📧 邮箱：${reportData.reportInfo.email}</p>
    </div>
</body>
</html>
    `;
};

// 导出报告数据结构
export const getCapitalOperationReportData = () => {
    return {
        companyInfo: {
            name: "科技创新股份有限公司",
            registeredCapital: "5000万元",
            paidCapital: "5000万元",
            shareholderStructure: "自然人股东为主",
            debtRatio: "35.7%",
            financingNeed: "扩张资金需求较大",
            industry: "软件和信息技术服务业",
            developmentStage: "成长期"
        },
        reportInfo: {
            reportDate: "2024年12月15日",
            planningPeriod: "2025年1月-2026年12月",
            reportNumber: "CO-20241215-001",
            projectTeam: "资本运作筹划专家团队",
            contactInfo: "400-123-4567",
            email: "capital@example.com"
        },
        planningOverview: {
            totalSaving: 485,
            schemeCount: 6,
            optimizationLevel: 32,
            complexity: "较高",
            rating: "A-",
            recommendation: "积极实施",
            effect: "显著",
            complianceRisk: "可控",
            roi: 325,
            riskLevel: "中等",
            opportunities: [
                "通过合伙企业持股架构可显著降低股东层面税负，年节税约90万元",
                "实施递延纳税股权激励方案可降低员工税负，年节税约95万元",
                "企业分立重组可享受特殊性税务处理，递延税负约85万元",
                "优化债权融资结构可产生税盾效应，年节税约60万元",
                "设立创投基金可享受投资抵扣优惠，节税约75万元",
                "资本结构调整可降低综合资本成本，年节约财务成本约80万元"
            ],
            challenges: [
                "股权架构调整涉及多方股东利益，协调难度较大",
                "特殊性税务处理条件严格，需精确设计重组方案",
                "股权激励递延纳税政策条件复杂，需专业操作",
                "资本弱化规则限制，需合理控制债务比例",
                "创投企业认定条件严格，需满足相关资质要求",
                "监管政策变化风险，需建立动态调整机制"
            ],
            effectMetrics: {
                annualSaving: 485,
                costReduction: 18,
                leverageOptimization: 15,
                roi: 325,
                taxShield: 60,
                structureOptimization: 32
            }
        },
        detailedAnalysis: {
            equityStructure: {
                holdingStrategyAnalysis: "基于税收优化和管理便利性考虑，企业应根据股东结构、业务特点和发展阶段选择最优的持股主体。个人持股适合股东较少、结构简单的情况；法人持股可享受股息免税但存在双重征税风险；合伙企业持股具有穿透征税优势，避免双重征税，适合大多数情况。结合公司实际情况，推荐采用有限合伙企业持股模式。",
                holdingOptions: [
                    {
                        type: "个人直接持股",
                        taxCharacteristics: "股息20%，转让20%",
                        annualTaxSaving: 0,
                        applicableScenario: "股东较少，结构简单",
                        implementationDifficulty: "简单",
                        recommended: false
                    },
                    {
                        type: "法人企业持股",
                        taxCharacteristics: "股息免税，转让25%",
                        annualTaxSaving: 65,
                        applicableScenario: "需要再投资的情况",
                        implementationDifficulty: "中等",
                        recommended: false
                    },
                    {
                        type: "合伙企业持股",
                        taxCharacteristics: "穿透征税，避免双重征税",
                        annualTaxSaving: 90,
                        applicableScenario: "大多数情况",
                        implementationDifficulty: "中等",
                        recommended: true
                    }
                ],
                currentAnalysis: "公司目前采用三名自然人股东直接持股的简单架构，持股比例分别为60%、25%、15%。这种结构虽然决策效率高，但在税务优化方面存在较大局限性：股东分红需缴纳20%个人所得税，股权转让也需缴纳20%个人所得税，且缺乏税务筹划的灵活性。随着公司盈利能力提升和分红增加，税负问题日益突出。",
                currentStructure: [
                    {
                        entities: [
                            { name: "张某", details: "60%股权，1200万分红" },
                            { name: "李某", details: "25%股权，500万分红" },
                            { name: "王某", details: "15%股权，300万分红" }
                        ]
                    },
                    {
                        entities: [
                            { name: "科技创新股份有限公司", details: "目标企业，年分红2000万" }
                        ]
                    }
                ],
                currentTaxCalculation: {
                    annualDividend: 2000,
                    personalIncomeTax: 400,
                    equityTransferTax: 150,
                    totalTaxBurden: 550
                },
                recommendedDesign: "推荐设立有限合伙企业作为持股平台，原股东作为有限合伙人，引入专业管理团队作为普通合伙人。该架构具有以下优势：一是实现税收穿透，避免双重征税；二是便于股权激励和投资者引入；三是提供税务筹划灵活性；四是保持对企业的有效控制。通过合理的收益分配设计，预计年节税约90万元。",
                recommendedStructure: [
                    {
                        entities: [
                            { name: "张某等", details: "有限合伙人，95%份额" },
                            { name: "管理团队", details: "普通合伙人，5%份额" }
                        ]
                    },
                    {
                        entities: [
                            { name: "持股合伙企业", details: "100%持股平台" }
                        ]
                    },
                    {
                        entities: [
                            { name: "科技创新股份有限公司", details: "目标企业，年分红2000万" }
                        ]
                    }
                ],
                optimizedTaxCalculation: {
                    annualDividend: 2000,
                    partnershipTax: 0,
                    naturalPersonTax: 310,
                    totalOptimizedTax: 310,
                    annualSaving: 90
                },
                implementationPath: "实施股权架构优化需要分步进行：第一，股东会决议同意架构调整；第二，设立有限合伙企业并完成工商登记；第三，签署股权转让协议，将目标公司股权转让给合伙企业；第四，完成工商变更登记；第五，建立规范的治理结构和内控制度。整个过程需要3-6个月时间，关键是确保合规操作和税务备案。",
                implementationSteps: [
                    "股东会决议",
                    "设立合伙企业",
                    "股权转让",
                    "工商变更",
                    "完善治理"
                ]
            },
            equityIncentive: {
                policyAnalysis: "股权激励税收政策为企业和员工提供了重要的税收优惠。主要包括递延纳税政策、单独计税政策和技术人员特殊优惠政策。通过合理设计激励方案，可以显著降低员工税负，提高激励效果。需要特别注意政策条件的准确把握和合规操作。",
                currentStatus: "公司目前尚未建立正式的股权激励制度，主要通过现金奖励激励员工。随着人才竞争加剧和公司发展需要，迫切需要建立有效的股权激励制度。但传统股权激励税负较重，员工行权时按'工资薪金所得'缴税，最高税率45%，严重影响激励效果。",
                metrics: {
                    participants: 25,
                    equityRatio: 8,
                    taxRate: 32,
                    potential: 95,
                    techPersonnelRatio: 60,
                    managementRatio: 40
                },
                incentiveOptions: [
                    {
                        type: "股票期权",
                        taxFeature: "行权时征税，可享受递延纳税",
                        personalTax: "较低（递延+优惠）",
                        companyCost: "低（费用化）",
                        scenario: "成长期企业",
                        deferredTax: "支持"
                    },
                    {
                        type: "限制性股票",
                        taxFeature: "解锁时征税，分期纳税",
                        personalTax: "中等",
                        companyCost: "中等",
                        scenario: "成熟期企业",
                        deferredTax: "支持"
                    },
                    {
                        type: "股票增值权",
                        taxFeature: "现金结算，按工资薪金征税",
                        personalTax: "较高",
                        companyCost: "高（现金支付）",
                        scenario: "现金充裕企业",
                        deferredTax: "不支持"
                    },
                    {
                        type: "员工持股计划",
                        taxFeature: "通过平台持股，税负较低",
                        personalTax: "低",
                        companyCost: "低",
                        scenario: "所有类型企业",
                        deferredTax: "支持"
                    }
                ],
                stockOptionPlan: "推荐采用股票期权作为主要激励工具。设计要点：一是合理确定授予价格，不低于公平市场价格；二是设置适当的行权条件和期限；三是充分利用递延纳税政策；四是做好税务备案工作。通过精心设计，可以将员工税负从45%降低到20%以下。",
                stockOptionCalculation: {
                    grantPrice: 10.0,
                    exercisePrice: 25.0,
                    exerciseGain: 150,
                    taxBeforeDeferred: 67.5,
                    taxAfterDeferred: 30.0,
                    taxSaving: 37.5
                },
                restrictedStockPlan: "限制性股票适合希望员工立即成为股东的情况。通过设置锁定期和解禁条件，既能实现激励目的，又能享受税收优惠。关键是合理设计解禁条件和时间安排。",
                esppDesign: "员工持股计划通过设立专门的持股平台，让员工间接持有公司股权。该方案操作简便，税负较低，适合大规模员工激励。可以与股票期权结合使用，形成多层次激励体系。"
            },
            corporateRestructuring: {
                needsAnalysis: "公司当前面临业务多元化发展需求，现有单一法人主体结构已不能满足发展需要。主要需求包括：业务板块分离，实现专业化经营；税负结构优化，享受政策优惠；为投融资和上市做准备；实现风险隔离。企业重组是解决这些问题的有效途径。",
                drivingFactors: [
                    "业务多元化发展需要专业化经营管理",
                    "不同业务板块的税负优化需求差异较大",
                    "为未来IPO和引入投资者做架构准备",
                    "实现业务风险隔离，降低整体经营风险",
                    "充分利用小微企业等税收优惠政策",
                    "满足不同业务板块的融资需求"
                ],
                objectives: [
                    "实现业务板块的专业化运营和管理",
                    "优化税负结构，享受特殊性税务处理",
                    "为后续资本运作创造有利条件",
                    "建立现代企业治理结构",
                    "提高运营效率和市场竞争力",
                    "实现可持续发展战略目标"
                ],
                restructuringOptions: [
                    {
                        method: "分立重组",
                        taxTreatment: "特殊性税务处理",
                        taxSaving: 85,
                        conditions: "满足五大条件",
                        difficulty: "中等",
                        recommendation: "强烈推荐"
                    },
                    {
                        method: "部分资产转让",
                        taxTreatment: "一般性税务处理",
                        taxSaving: 35,
                        conditions: "无特殊要求",
                        difficulty: "低",
                        recommendation: "一般"
                    },
                    {
                        method: "新设分立",
                        taxTreatment: "特殊性税务处理",
                        taxSaving: 75,
                        conditions: "满足相关条件",
                        difficulty: "中等",
                        recommendation: "推荐"
                    },
                    {
                        method: "吸收合并",
                        taxTreatment: "特殊性税务处理",
                        taxSaving: 0,
                        conditions: "条件复杂",
                        difficulty: "较高",
                        recommendation: "不推荐"
                    }
                ],
                specialTaxTreatment: "企业重组享受特殊性税务处理需要同时满足五个条件：具有合理商业目的；资产或股权比例符合规定；连续12个月不改变实质经营活动；股权支付比例符合要求；原主要股东12个月内不得转让取得的股权。这些条件环环相扣，需要精心设计方案。",
                specialConditions: [
                    {
                        title: "商业目的条件",
                        description: "具有合理的商业目的，且不以减少、免除或者推迟缴纳税款为主要目的"
                    },
                    {
                        title: "资产股权比例条件",
                        description: "被收购、合并或分立部分的资产或股权比例符合规定的75%以上"
                    },
                    {
                        title: "经营活动连续性条件",
                        description: "企业重组后的连续12个月内不改变重组资产原来的实质性经营活动"
                    },
                    {
                        title: "股权支付比例条件",
                        description: "重组交易对价中涉及股权支付金额符合规定比例85%以上"
                    },
                    {
                        title: "股权锁定条件",
                        description: "企业重组中取得股权支付的原主要股东，在重组后连续12个月内，不得转让所取得的股权"
                    }
                ],
                spinOffDesign: "推荐采用存续分立方案，将软件开发业务和系统集成业务分离。原公司保留软件开发业务，新设子公司承接系统集成业务。该方案既能实现业务专业化，又能享受特殊性税务处理，递延确认资产转让所得。",
                spinOffStructure: [
                    {
                        entities: [
                            { name: "原股东", details: "持股合伙企业" }
                        ]
                    },
                    {
                        entities: [
                            { name: "科技创新公司", details: "软件开发业务" },
                            { name: "系统集成公司", details: "系统集成业务" }
                        ]
                    }
                ],
                spinOffTaxCalculation: {
                    assetFairValue: 3500,
                    assetTaxBasis: 2200,
                    potentialGain: 1300,
                    generalTreatmentTax: 325,
                    specialTreatmentDeferred: 325,
                    currentSaving: 85
                },
                timingStrategy: "重组时机选择需综合考虑政策环境、企业状况和市场条件。建议在2025年上半年启动，理由：一是政策环境相对稳定；二是企业盈利状况良好；三是为后续融资做准备；四是避开年底汇算清缴繁忙期。"
            },
            investmentFinancing: {
                debtVsEquityAnalysis: "债权投资和股权投资各有优势。债权投资收益确定，风险较低，利息支出可税前扣除，但收益有限；股权投资收益潜力大，符合条件的股息可免税，但风险较高。企业应根据风险偏好、收益预期和税务考虑进行合理配置。",
                currentStructureAnalysis: "公司当前融资结构偏向保守，债务比例35.7%，股权比例64.3%。虽然财务风险较低，但未充分利用债务税盾效应。随着业务扩张需要，应适当提高债务比例，优化融资结构，降低综合资本成本。",
                metrics: {
                    debtRatio: 35.7,
                    equityRatio: 64.3,
                    wacc: 8.5,
                    costOfDebt: 6.0,
                    costOfEquity: 12.0,
                    optimizationPotential: 80
                },
                financingOptions: [
                    {
                        method: "银行贷款",
                        costCharacteristics: "利率相对较低",
                        taxAdvantage: "利息可税前扣除",
                        applicableConditions: "信用良好，有担保",
                        recommendationIndex: 4
                    },
                    {
                        method: "公司债券",
                        costCharacteristics: "期限较长，利率适中",
                        taxAdvantage: "利息可税前扣除",
                        applicableConditions: "规模较大，评级较好",
                        recommendationIndex: 4
                    },
                    {
                        method: "股权融资",
                        costCharacteristics: "成本较高，无还款压力",
                        taxAdvantage: "无税盾效应",
                        applicableConditions: "成长性好，前景明确",
                        recommendationIndex: 3
                    },
                    {
                        method: "融资租赁",
                        costCharacteristics: "成本适中，表外融资",
                        taxAdvantage: "租金可税前扣除",
                        applicableConditions: "有特定资产需求",
                        recommendationIndex: 3
                    },
                    {
                        method: "可转换债券",
                        costCharacteristics: "利率较低，可转股",
                        taxAdvantage: "利息可扣除",
                        applicableConditions: "成长性好，股价有上升空间",
                        recommendationIndex: 5
                    }
                ],
                taxShieldAnalysis: "债务税盾是债权融资的重要优势。利息支出可在税前扣除，每年产生的税盾价值等于利息支出乘以税率。公司目前2000万债务，年利息120万，税盾价值30万。通过优化债务结构，预计可将税盾价值提升至60万元。",
                taxShieldCalculation: {
                    totalDebt: 2500,
                    averageRate: 6.0,
                    annualInterest: 150,
                    corporateTaxRate: 25,
                    annualTaxShield: 37.5
                },
                optimalStructureDesign: "基于行业特点和企业发展阶段，建议将债务比例提升至45%左右。具体结构：银行借款25%、债券融资20%、股权融资55%。这种结构既能充分利用税盾效应，又能保持合理的财务风险水平。"
            },
            investmentFund: {
                organizationFormAnalysis: "股权投资基金的组织形式选择对税务影响巨大。合伙型基金因其穿透征税特性，避免了双重征税问题，是目前最主流的选择。公司型基金虽然治理结构清晰，但存在双重征税；契约型基金设立便利但监管要求较多。",
                fundTypes: [
                    {
                        name: "公司型基金",
                        taxCharacteristics: "基金层面征税，存在双重征税",
                        doubleTaxation: "存在",
                        setupDifficulty: "中等",
                        applicableScenario: "投资人较少的情况",
                        recommended: false
                    },
                    {
                        name: "合伙型基金",
                        taxCharacteristics: "穿透征税，避免双重征税",
                        doubleTaxation: "避免",
                        setupDifficulty: "中等",
                        applicableScenario: "大多数投资场景",
                        recommended: true
                    },
                    {
                        name: "契约型基金",
                        taxCharacteristics: "投资人按实际收益纳税",
                        doubleTaxation: "避免",
                        setupDifficulty: "较低",
                        applicableScenario: "公募基金等标准化产品",
                        recommended: false
                    }
                ],
                vcTaxIncentives: "创投企业享有重要的税收优惠政策。投资于种子期、初创期科技型企业满2年的，投资额的70%可以抵扣应纳税所得额。这项政策极大地鼓励了创投企业的投资积极性，也为被投企业提供了重要的资金支持。",
                vcTaxCalculation: {
                    investmentAmount: 1000,
                    deductibleAmount: 700,
                    taxRate: 25,
                    taxSaving: 175
                },
                operationOptimization: "基金运作中的税务优化包括：投资环节选择合适的投资方式和时点；管理环节合理安排管理费和激励机制；退出环节选择最优的退出方式和时机。通过全流程优化，可以显著提升基金的整体回报率。"
            },
            capitalStructure: {
                costAnalysis: "公司当前资本成本构成：债务成本6.0%（税后4.5%），股权成本12.0%，加权平均资本成本8.5%。相比行业平均7.8%偏高0.7个百分点，主要因为债务比例偏低。通过优化资本结构，预计可将WACC降至7.7%。",
                leverageEffect: "财务杠杆效应分析显示，适度提高债务比例可以提升股东收益率。当债务比例从35.7%提升至45%时，ROE可从16.1%提升至18.2%，但财务风险也相应增加。需要在收益和风险间找到平衡点。",
                adjustmentPlan: "资本结构调整分三阶段实施：第一阶段通过银行借款将债务比例提升至40%；第二阶段发行公司债券进一步提升至45%；第三阶段根据发展需要调整股权结构。整个过程需12-18个月。",
                adjustmentSteps: [
                    "银行借款置换股权",
                    "发行公司债券",
                    "优化债务结构",
                    "调整股权结构",
                    "建立动态管理机制"
                ]
            }
        },
        riskAssessment: {
            overallScore: 7.5,
            categories: [
                {
                    name: "法律合规风险",
                    score: 7.8,
                    level: "低",
                    description: "资本运作涉及复杂法律程序，但在专业指导下风险可控",
                    controlMeasures: [
                        "聘请专业律师事务所全程提供法律服务",
                        "严格按照法律法规程序进行操作",
                        "建立完善的合规管理制度和流程",
                        "定期进行合规培训和风险排查"
                    ]
                },
                {
                    name: "税务政策风险",
                    score: 7.2,
                    level: "中",
                    description: "税收政策存在变化可能，需要密切关注并及时调整",
                    controlMeasures: [
                        "建立税收政策跟踪和预警机制",
                        "与税务机关保持良好沟通",
                        "制定政策变化应对预案",
                        "定期评估和调整筹划方案"
                    ]
                },
                {
                    name: "财务风险",
                    score: 8.0,
                    level: "低",
                    description: "债务比例提升会增加财务风险，但在可控范围内",
                    controlMeasures: [
                        "科学测算最优资本结构比例",
                        "建立财务风险预警指标体系",
                        "保持充足的现金流和融资储备",
                        "定期进行财务风险压力测试"
                    ]
                },
                {
                    name: "执行风险",
                    score: 7.0,
                    level: "中",
                    description: "方案执行涉及多方协调，存在一定执行难度",
                    controlMeasures: [
                        "成立专门的项目执行团队",
                        "制定详细的执行计划和时间表",
                        "建立定期沟通协调机制",
                        "设置关键节点检查和评估"
                    ]
                },
                {
                    name: "市场环境风险",
                    score: 7.3,
                    level: "中",
                    description: "宏观经济和市场环境变化可能影响方案实施效果",
                    controlMeasures: [
                        "密切关注宏观经济形势变化",
                        "建立市场环境监测机制",
                        "制定不同情景下的应对策略",
                        "保持方案的灵活性和可调整性"
                    ]
                }
            ],
            keyRiskControls: [
                {
                    riskType: "合规风险防控",
                    controlMeasure: "建立三道防线的合规管理体系，确保所有资本运作活动符合法律法规要求"
                },
                {
                    riskType: "税务风险管控",
                    controlMeasure: "与税务部门保持密切沟通，及时备案相关事项，确保享受优惠政策的合规性"
                },
                {
                    riskType: "财务风险控制",
                    controlMeasure: "建立动态的财务风险监控体系，及时调整资本结构，防范过度负债风险"
                },
                {
                    riskType: "操作风险防范",
                    controlMeasure: "制定标准化的操作流程，加强人员培训，建立多重审核机制"
                }
            ]
        },
        implementationPlan: {
            overallStrategy: "采用分步实施、风险可控的策略，优先推进技术成熟、风险较低的方案，如股权激励制度建立和融资结构优化；然后实施股权架构调整和企业重组等复杂方案。整个实施过程要确保严格合规，控制各类风险，实现资本运作和税务筹划的双重目标。同时建立动态调整机制，根据政策变化和实施效果及时优化方案。",
            phases: [
                {
                    stage: "第一阶段(3-6个月)",
                    content: "股权激励制度设计与实施",
                    timeline: "2025年1-6月",
                    expectedResult: "节税约95万元，激励25名员工",
                    keyRisk: "政策理解偏差，员工接受度",
                    responsibleDepartment: "人力资源部、法务部"
                },
                {
                    stage: "第二阶段(6-9个月)",
                    content: "融资结构优化调整",
                    timeline: "2025年4-12月",
                    expectedResult: "降低资本成本0.8%，增加税盾60万",
                    keyRisk: "市场环境变化，融资成本上升",
                    responsibleDepartment: "财务部、投资部"
                },
                {
                    stage: "第三阶段(9-15个月)",
                    content: "股权架构优化重组",
                    timeline: "2025年7月-2026年3月",
                    expectedResult: "节税约90万元，优化治理结构",
                    keyRisk: "股东协调难度，工商变更",
                    responsibleDepartment: "董事会秘书、法务部"
                },
                {
                    stage: "第四阶段(12-18个月)",
                    content: "企业分立重组实施",
                    timeline: "2025年10月-2026年6月",
                    expectedResult: "节税约85万元，业务专业化",
                    keyRisk: "审批程序复杂，业务整合",
                    responsibleDepartment: "战略发展部、各业务部门"
                },
                {
                    stage: "第五阶段(18-24个月)",
                    content: "投资基金设立运作",
                    timeline: "2026年1-12月",
                    expectedResult: "享受创投优惠，节税75万元",
                    keyRisk: "资质认定，投资项目选择",
                    responsibleDepartment: "投资部、财务部"
                }
            ],
            successFactors: [
                "获得全体股东和董事会的充分理解和坚定支持，确保重大决策能够顺利通过",
                "组建包括法务、财务、税务、投资等专业人员的跨部门实施团队",
                "与政府监管部门、税务机关建立良好的沟通协调机制",
                "建立完善的风险识别、评估和控制体系，及时应对各类风险",
                "制定详细的实施计划和时间表，确保各阶段工作按期高质量完成",
                "加强内部培训，提升相关人员的专业能力和执行水平",
                "建立有效的激励约束机制，确保实施团队的积极性和责任心",
                "保持与外部专业机构的密切合作，借助专业力量确保方案成功"
            ],
            monitoringPoints: [
                "定期评估各项资本运作方案的实施进度和效果，及时发现问题",
                "监控股权激励制度的执行效果和员工满意度，确保激励目标实现",
                "跟踪企业重组进展和特殊性税务处理条件的维持情况",
                "关注相关法律法规和税收政策的最新变化动态，评估影响",
                "检查各项资本运作活动的合规性，防范法律和税务风险",
                "评估融资结构优化效果和财务风险水平变化",
                "监控投资基金的设立进展和投资项目的执行情况",
                "定期评估整体筹划效果，与预期目标进行对比分析"
            ],
            supportingMeasures: [
                "建立专门的资本运作管理委员会，统筹协调各项工作",
                "完善公司治理结构，建立现代企业制度",
                "加强财务管理体系建设，提升财务管理水平",
                "建立健全内部控制制度，规范各项业务流程",
                "加强人才队伍建设，引进和培养专业人才",
                "建立信息系统支撑，提高管理效率和质量",
                "加强与银行、券商等金融机构的合作关系",
                "建立定期的方案评估和调整机制"
            ]
        }
    };
};