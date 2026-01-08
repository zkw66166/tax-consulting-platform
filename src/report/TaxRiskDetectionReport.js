// src/report/TaxRiskDetectionReport.js
export const generateRiskDetectionReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>企业税务风险检测报告</title>
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
            background: linear-gradient(135deg, #fff5f5 0%, #ffebee 100%);
            padding: 40px 30px 30px;
            border-radius: 8px;
            position: relative;
        }
        
        .header::before {
            content: "🔍";
            position: absolute;
            top: 15px;
            left: 30px;
            font-size: 24px;
        }
        
        .header h1 {
            color: #c62828;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .header .subtitle {
            color: #757575;
            font-size: 16px;
            font-weight: 500;
        }
        
        .risk-summary {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 40px;
            position: relative;
        }
        
        .risk-summary::before {
            content: "📊";
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 20px;
        }
        
        .risk-level-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .risk-level-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-left: 5px solid;
            position: relative;
        }
        
        .risk-level-card.high {
            border-left-color: #e74c3c;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .risk-level-card.medium {
            border-left-color: #ff9800;
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        }
        
        .risk-level-card.low {
            border-left-color: #ffc107;
            background: linear-gradient(135deg, #fffde7 0%, #fff8e1 100%);
        }
        
        .risk-level-card.safe {
            border-left-color: #4caf50;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .risk-level-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .risk-level-card .count {
            font-size: 36px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .risk-level-card.high .count { color: #c62828; }
        .risk-level-card.medium .count { color: #ef6c00; }
        .risk-level-card.low .count { color: #f57f17; }
        .risk-level-card.safe .count { color: #2e7d32; }
        
        .detection-scope {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .scope-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: 1px solid #e9ecef;
            position: relative;
        }
        
        .scope-card::before {
            content: "📋";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 16px;
        }
        
        .scope-card h3 {
            color: #2c3e50;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #ecf0f1;
        }
        
        .section {
            margin-bottom: 50px;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .section-header {
            background: linear-gradient(135deg, #e74c3c 0%, #c62828 100%);
            color: white;
            padding: 25px 30px;
            margin-bottom: 0;
            position: relative;
        }
        
        .section-header::after {
            content: "▶";
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 16px;
            opacity: 0.8;
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
        
        .risk-item {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-left: 5px solid;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }
        
        .risk-item.high {
            border-left-color: #e74c3c;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .risk-item.medium {
            border-left-color: #ff9800;
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        }
        
        .risk-item.low {
            border-left-color: #ffc107;
            background: linear-gradient(135deg, #fffde7 0%, #fff8e1 100%);
        }
        
        .risk-item::before {
            position: absolute;
            left: -8px;
            top: 20px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 3px solid;
            content: "";
        }
        
        .risk-item.high::before { border-color: #e74c3c; }
        .risk-item.medium::before { border-color: #ff9800; }
        .risk-item.low::before { border-color: #ffc107; }
        
        .risk-item h4 {
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .risk-badge {
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .risk-badge.high {
            background: #e74c3c;
            color: white;
        }
        
        .risk-badge.medium {
            background: #ff9800;
            color: white;
        }
        
        .risk-badge.low {
            background: #ffc107;
            color: #333;
        }
        
        .tax-type-analysis {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 25px 0;
        }
        
        .tax-type-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-top: 4px solid;
            position: relative;
        }
        
        .tax-type-card.vat { border-top-color: #2196f3; }
        .tax-type-card.corporate { border-top-color: #4caf50; }
        .tax-type-card.personal { border-top-color: #ff9800; }
        .tax-type-card.other { border-top-color: #9c27b0; }
        
        .tax-type-card::before {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 16px;
        }
        
        .tax-type-card.vat::before { content: "💰"; }
        .tax-type-card.corporate::before { content: "🏢"; }
        .tax-type-card.personal::before { content: "👤"; }
        .tax-type-card.other::before { content: "📋"; }
        
        .detection-method {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .detection-method::before {
            content: "🔧";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 14px;
        }
        
        .detection-method h5 {
            color: #1976d2;
            font-weight: 600;
            margin-bottom: 10px;
            margin-left: 25px;
        }
        
        .evidence-chain {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #6c757d;
        }
        
        .evidence-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px dotted #dee2e6;
        }
        
        .evidence-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .evidence-item::before {
            content: "📄";
            margin-right: 10px;
            font-size: 12px;
            margin-top: 2px;
        }
        
        .industry-specific {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            border: 2px solid #9c27b0;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }
        
        .industry-specific::before {
            content: "🏭";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 18px;
        }
        
        .industry-specific h4 {
            color: #7b1fa2;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 30px;
        }
        
        .recommendation-card {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .recommendation-card::before {
            content: "💡";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 16px;
        }
        
        .recommendation-card h5 {
            color: #2e7d32;
            font-weight: 600;
            margin-bottom: 10px;
            margin-left: 30px;
        }
        
        .urgency-timeline {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border: 2px solid #ff9800;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .timeline-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding-left: 30px;
            position: relative;
        }
        
        .timeline-item::before {
            content: "📅";
            position: absolute;
            left: 0;
            font-size: 14px;
        }
        
        .timeline-item:last-child {
            margin-bottom: 0;
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
            content: "📊";
            position: absolute;
            top: 10px;
            right: 15px;
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
        
        .warning-box {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border: 2px solid #ff9800;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            position: relative;
        }
        
        .warning-box::before {
            content: "⚠️";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 16px;
        }
        
        .warning-box h5 {
            color: #ef6c00;
            font-weight: 600;
            margin-bottom: 10px;
            margin-left: 30px;
        }
        
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
            vertical-align: middle;
        }
        
        .status-indicator.normal { background: #4caf50; }
        .status-indicator.warning { background: #ff9800; }
        .status-indicator.error { background: #e74c3c; }
        
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
            content: "ℹ️";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 14px;
        }
        
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px; }
        
        ul { padding-left: 25px; margin: 15px 0; }
        li { margin-bottom: 8px; text-align: justify; position: relative; }
        li::before {
            content: "◆";
            position: absolute;
            left: -20px;
            color: #e74c3c;
            font-size: 8px;
            top: 0.6em;
        }
        
        @media print {
            body { margin: 0; padding: 20px; font-size: 12px; }
            .section { page-break-inside: avoid; margin-bottom: 30px; }
            .header { padding: 20px; }
        }
        
        @media (max-width: 768px) {
            .detection-scope, .grid-2, .grid-3, .grid-4, .tax-type-analysis, .risk-level-grid {
                grid-template-columns: 1fr;
            }
            body { padding: 15px; }
            .header h1 { font-size: 24px; }
            .section-title { font-size: 20px; }
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
        <h1>企业税务风险检测报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} 税务风险全面检测分析报告 · ${reportData.reportInfo.reportDate}</p>
    </div>

    <!-- 风险概览 -->
    <div class="risk-summary">
        <h3>🎯 风险检测总览</h3>
        <div class="risk-level-grid">
            <div class="risk-level-card high">
                <h3>高风险</h3>
                <div class="count">${reportData.riskSummary.highRisk}</div>
                <p>需紧急处理</p>
            </div>
            <div class="risk-level-card medium">
                <h3>中风险</h3>
                <div class="count">${reportData.riskSummary.mediumRisk}</div>
                <p>建议关注</p>
            </div>
            <div class="risk-level-card low">
                <h3>低风险</h3>
                <div class="count">${reportData.riskSummary.lowRisk}</div>
                <p>定期监控</p>
            </div>
            <div class="risk-level-card safe">
                <h3>正常项目</h3>
                <div class="count">${reportData.riskSummary.safeItems}</div>
                <p>合规运行</p>
            </div>
        </div>
        
        <div class="grid-3" style="margin-top: 20px;">
            <div class="metric-card">
                <h5>检测覆盖率</h5>
                <div class="value" style="color: #2196f3;">${reportData.riskSummary.coverageRate}</div>
            </div>
            <div class="metric-card">
                <h5>风险发现率</h5>
                <div class="value" style="color: #ff9800;">${reportData.riskSummary.riskDiscoveryRate}</div>
            </div>
            <div class="metric-card">
                <h5>合规度评分</h5>
                <div class="value" style="color: #4caf50;">${reportData.riskSummary.complianceScore}</div>
            </div>
        </div>
    </div>

    <!-- 检测范围与方法 -->
    <div class="detection-scope">
        <div class="scope-card">
            <h3>🔍 检测范围配置</h3>
            <table>
                <tr>
                    <th>检测维度</th>
                    <th>覆盖内容</th>
                    <th>状态</th>
                </tr>
                ${reportData.detectionScope.dimensions.map(dimension => `
                    <tr>
                        <td>${dimension.name}</td>
                        <td>${dimension.coverage}</td>
                        <td>
                            <span class="status-indicator ${dimension.status}"></span>
                            ${dimension.status === 'normal' ? '已完成' : dimension.status === 'warning' ? '部分完成' : '待处理'}
                        </td>
                    </tr>
                `).join('')}
            </table>
        </div>
        
        <div class="scope-card">
            <h3>🛠️ 检测方法应用</h3>
            <ul>
                ${reportData.detectionMethods.map(method => `
                    <li><strong>${method.name}：</strong>${method.description}</li>
                `).join('')}
            </ul>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 14px; color: #666; margin-bottom: 10px;">企业特征识别</h4>
                <div class="grid-2" style="gap: 10px; font-size: 13px;">
                    <div>纳税人身份：${reportData.companyCharacteristics.taxpayerType}</div>
                    <div>企业规模：${reportData.companyCharacteristics.companySize}</div>
                    <div>集团结构：${reportData.companyCharacteristics.groupStructure}</div>
                    <div>行业类型：${reportData.companyCharacteristics.industryType}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 按税种分类的风险检测结果 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💰 增值税风险检测结果</h2>
        </div>
        <div class="section-content">
            <div class="tax-type-analysis">
                <div class="tax-type-card vat">
                    <h4>销项税检测</h4>
                    <div class="metric-card" style="border: none; box-shadow: none; padding: 10px 0;">
                        <div class="value" style="font-size: 18px; color: #2196f3;">${reportData.vatRisks.outputTax.riskCount}项风险</div>
                    </div>
                    ${reportData.vatRisks.outputTax.risks.map(risk => `
                        <div class="risk-item ${risk.level}">
                            <h4>
                                ${risk.title}
                                <span class="risk-badge ${risk.level}">${risk.level === 'high' ? '高风险' : risk.level === 'medium' ? '中风险' : '低风险'}</span>
                            </h4>
                            <p>${risk.description}</p>
                            <div class="evidence-chain">
                                <strong>证据链：</strong>
                                ${risk.evidence.map(item => `
                                    <div class="evidence-item">${item}</div>
                                `).join('')}
                            </div>
                            <div class="recommendation-card">
                                <h5>整改建议</h5>
                                <p>${risk.recommendation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="tax-type-card vat">
                    <h4>进项税检测</h4>
                    <div class="metric-card" style="border: none; box-shadow: none; padding: 10px 0;">
                        <div class="value" style="font-size: 18px; color: #2196f3;">${reportData.vatRisks.inputTax.riskCount}项风险</div>
                    </div>
                    ${reportData.vatRisks.inputTax.risks.map(risk => `
                        <div class="risk-item ${risk.level}">
                            <h4>
                                ${risk.title}
                                <span class="risk-badge ${risk.level}">${risk.level === 'high' ? '高风险' : risk.level === 'medium' ? '中风险' : '低风险'}</span>
                            </h4>
                            <p>${risk.description}</p>
                            <div class="evidence-chain">
                                <strong>证据链：</strong>
                                ${risk.evidence.map(item => `
                                    <div class="evidence-item">${item}</div>
                                `).join('')}
                            </div>
                            <div class="recommendation-card">
                                <h5>整改建议</h5>
                                <p>${risk.recommendation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="industry-specific">
                <h4>行业专属检测指标</h4>
                <p>${reportData.vatRisks.industrySpecific.description}</p>
                <ul>
                    ${reportData.vatRisks.industrySpecific.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <!-- 企业所得税风险检测 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏢 企业所得税风险检测结果</h2>
        </div>
        <div class="section-content">
            <div class="tax-type-analysis">
                <div class="tax-type-card corporate">
                    <h4>收入确认风险</h4>
                    <div class="metric-card" style="border: none; box-shadow: none; padding: 10px 0;">
                        <div class="value" style="font-size: 18px; color: #4caf50;">${reportData.corporateTaxRisks.revenue.riskCount}项风险</div>
                    </div>
                    ${reportData.corporateTaxRisks.revenue.risks.map(risk => `
                        <div class="risk-item ${risk.level}">
                            <h4>
                                ${risk.title}
                                <span class="risk-badge ${risk.level}">${risk.level === 'high' ? '高风险' : risk.level === 'medium' ? '中风险' : '低风险'}</span>
                            </h4>
                            <p>${risk.description}</p>
                            <div class="detection-method">
                                <h5>检测方法</h5>
                                <p>${risk.detectionMethod}</p>
                            </div>
                            <div class="recommendation-card">
                                <h5>整改建议</h5>
                                <p>${risk.recommendation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="tax-type-card corporate">
                    <h4>成本费用扣除</h4>
                    <div class="metric-card" style="border: none; box-shadow: none; padding: 10px 0;">
                        <div class="value" style="font-size: 18px; color: #4caf50;">${reportData.corporateTaxRisks.costs.riskCount}项风险</div>
                    </div>
                    ${reportData.corporateTaxRisks.costs.risks.map(risk => `
                        <div class="risk-item ${risk.level}">
                            <h4>
                                ${risk.title}
                                <span class="risk-badge ${risk.level}">${risk.level === 'high' ? '高风险' : risk.level === 'medium' ? '中风险' : '低风险'}</span>
                            </h4>
                            <p>${risk.description}</p>
                            <div class="detection-method">
                                <h5>检测方法</h5>
                                <p>${risk.detectionMethod}</p>
                            </div>
                            <div class="recommendation-card">
                                <h5>整改建议</h5>
                                <p>${risk.recommendation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="grid-2">
                <div class="tax-type-card corporate">
                    <h4>税收优惠政策</h4>
                    <table>
                        <tr>
                            <th>优惠政策</th>
                            <th>适用状态</th>
                            <th>风险等级</th>
                        </tr>
                        ${reportData.corporateTaxRisks.taxPreferences.map(pref => `
                            <tr>
                                <td>${pref.policy}</td>
                                <td>
                                    <span class="status-indicator ${pref.status}"></span>
                                    ${pref.statusText}
                                </td>
                                <td>
                                    <span class="risk-badge ${pref.riskLevel}">${pref.riskLevel === 'high' ? '高风险' : pref.riskLevel === 'medium' ? '中风险' : '低风险'}</span>
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div class="tax-type-card corporate">
                    <h4>关联交易风险</h4>
                    <ul>
                        ${reportData.corporateTaxRisks.relatedPartyTransactions.map(transaction => `
                            <li>
                                <strong>${transaction.type}：</strong>
                                ${transaction.description}
                                <span class="risk-badge ${transaction.riskLevel}" style="margin-left: 10px;">
                                    ${transaction.riskLevel === 'high' ? '高风险' : transaction.riskLevel === 'medium' ? '中风险' : '低风险'}
                                </span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 个人所得税风险检测 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">👤 个人所得税风险检测结果</h2>
        </div>
        <div class="section-content">
            <div class="tax-type-analysis">
                <div class="tax-type-card personal">
                    <h4>工资薪金风险</h4>
                    ${reportData.personalTaxRisks.salaryWages.risks.map(risk => `
                        <div class="risk-item ${risk.level}">
                            <h4>
                                ${risk.title}
                                <span class="risk-badge ${risk.level}">${risk.level === 'high' ? '高风险' : risk.level === 'medium' ? '中风险' : '低风险'}</span>
                            </h4>
                            <p>${risk.description}</p>
                            <div class="warning-box">
                                <h5>风险提示</h5>
                                <p>${risk.warning}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="tax-type-card personal">
                    <h4>其他所得风险</h4>
                    ${reportData.personalTaxRisks.otherIncome.risks.map(risk => `
                        <div class="risk-item ${risk.level}">
                            <h4>
                                ${risk.title}
                                <span class="risk-badge ${risk.level}">${risk.level === 'high' ? '高风险' : risk.level === 'medium' ? '中风险' : '低风险'}</span>
                            </h4>
                            <p>${risk.description}</p>
                            <div class="recommendation-card">
                                <h5>处理建议</h5>
                                <p>${risk.recommendation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 其他税种风险检测 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📋 其他税种风险检测结果</h2>
        </div>
        <div class="section-content">
            <div class="grid-2">
                ${reportData.otherTaxRisks.map(taxType => `
                    <div class="tax-type-card other">
                        <h4>${taxType.name}</h4>
                        ${taxType.risks.map(risk => `
                            <div class="risk-item ${risk.level}">
                                <h4>
                                    ${risk.title}
                                    <span class="risk-badge ${risk.level}">${risk.level === 'high' ? '高风险' : risk.level === 'medium' ? '中风险' : '低风险'}</span>
                                </h4>
                                <p>${risk.description}</p>
                                <div class="recommendation-card">
                                    <h5>整改建议</h5>
                                    <p>${risk.recommendation}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <!-- 专项检查结果 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🔍 专项检查结果</h2>
        </div>
        <div class="section-content">
            <div class="grid-2">
                ${reportData.specialChecks.map(check => `
                    <div class="scope-card">
                        <h3>${check.name}</h3>
                        <div style="margin: 15px 0;">
                            <span class="status-indicator ${check.status}"></span>
                            <strong>检查结果：</strong>${check.result}
                        </div>
                        ${check.findings.length > 0 ? `
                            <div>
                                <strong>发现问题：</strong>
                                <ul>
                                    ${check.findings.map(finding => `<li>${finding}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${check.recommendations.length > 0 ? `
                            <div class="recommendation-card">
                                <h5>建议措施</h5>
                                <ul>
                                    ${check.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <!-- 整改建议与时间安排 */
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🛠️ 整改建议与时间安排</h2>
        </div>
        <div class="section-content">
            <div class="urgency-timeline">
                <h4 style="color: #ef6c00; margin-bottom: 20px;">⏱️ 紧急处理时间线</h4>
                ${reportData.remediation.urgentItems.map(item => `
                    <div class="timeline-item">
                        <strong>${item.deadline}：</strong>${item.description}
                        <span class="risk-badge ${item.priority}" style="margin-left: 10px;">
                            ${item.priority === 'high' ? '紧急' : item.priority === 'medium' ? '重要' : '一般'}
                        </span>
                    </div>
                `).join('')}
            </div>
            
            <div class="grid-2">
                <div class="recommendation-card">
                    <h5>短期整改措施（1-3个月）</h5>
                    <ul>
                        ${reportData.remediation.shortTerm.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="recommendation-card">
                    <h5>长期规范措施（3-12个月）</h5>
                    <ul>
                        ${reportData.remediation.longTerm.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="warning-box">
                <h5>重要提醒</h5>
                <p>${reportData.remediation.importantReminder}</p>
            </div>
        </div>
    </div>

    <!-- 风险预警机制建议 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚠️ 风险预警机制建议</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                ${reportData.riskPreventionSystem.mechanisms.map(mechanism => `
                    <div class="scope-card">
                        <h3>${mechanism.name}</h3>
                        <p>${mechanism.description}</p>
                        <ul>
                            ${mechanism.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="recommendation-card">
                <h5>建议建立的内控制度</h5>
                <div class="grid-2">
                    <ul>
                        ${reportData.riskPreventionSystem.internalControls.slice(0, Math.ceil(reportData.riskPreventionSystem.internalControls.length / 2)).map(control => `<li>${control}</li>`).join('')}
                    </ul>
                    <ul>
                        ${reportData.riskPreventionSystem.internalControls.slice(Math.ceil(reportData.riskPreventionSystem.internalControls.length / 2)).map(control => `<li>${control}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>检测声明</strong></p>
        <p>本税务风险检测报告基于企业提供的资料和数据进行分析，检测结果仅供参考。企业应根据最新政策法规和具体情况进行税务处理。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 检测完成时间：${reportData.reportInfo.reportDate} | 🔍 检测范围：${reportData.reportInfo.detectionScope} | 📊 检测模式：${reportData.reportInfo.detectionMode}</p>
        <p>👥 检测机构：${reportData.reportInfo.detectionInstitution} | 📞 联系方式：${reportData.reportInfo.contact} | 📋 报告编号：${reportData.reportInfo.reportNumber}</p>
    </div>
</body>
</html>
    `;
};

// 获取示例报告数据
export const getRiskDetectionReportData = () => {
    return {
        companyInfo: {
            name: "XX科技集团有限公司",
            taxpayerId: "91310000MA1234567X",
            address: "上海市浦东新区张江高科技园区",
            legalPerson: "张三",
            registeredCapital: "5000万元",
            businessScope: "软件开发、技术服务、智能设备制造"
        },
        reportInfo: {
            reportDate: "2025年1月25日",
            reportNumber: "RISK-20250125-001",
            detectionScope: "全面检测",
            detectionMode: "严格模式",
            detectionInstitution: "XX税务风险管理中心",
            contact: "400-123-4567",
            detectionPeriod: "2024年1月-2024年12月"
        },
        riskSummary: {
            highRisk: 8,
            mediumRisk: 15,
            lowRisk: 23,
            safeItems: 156,
            coverageRate: "98.5%",
            riskDiscoveryRate: "22.8%",
            complianceScore: "85分"
        },
        detectionScope: {
            dimensions: [
                { name: "增值税检测", coverage: "销项税、进项税、申报表", status: "normal" },
                { name: "企业所得税检测", coverage: "收入、成本、优惠政策", status: "normal" },
                { name: "个人所得税检测", coverage: "工资薪金、劳务报酬", status: "warning" },
                { name: "其他税种检测", coverage: "房产税、印花税等", status: "normal" },
                { name: "发票管理检测", coverage: "开具、认证、保管", status: "error" },
                { name: "申报缴税检测", coverage: "按期申报、数据一致性", status: "normal" }
            ]
        },
        detectionMethods: [
            { name: "财务数据比对分析", description: "对财务报表与税务申报表进行交叉比对" },
            { name: "税负率指标分析", description: "与行业平均水平和历史数据对比分析" },
            { name: "业务流程审查", description: "检查关键业务流程的合规性" },
            { name: "凭证文档验证", description: "抽查重要凭证和支持文档" },
            { name: "信息系统检查", description: "验证发票系统和申报系统数据" }
        ],
        companyCharacteristics: {
            taxpayerType: "一般纳税人",
            companySize: "中型企业",
            groupStructure: "集团成员",
            industryType: "TMT行业-软件开发"
        },
        vatRisks: {
            outputTax: {
                riskCount: 3,
                risks: [
                    {
                        title: "跨期收入确认风险",
                        level: "high",
                        description: "2024年12月确认的软件服务收入2580万元，存在跨期确认嫌疑。部分项目在12月31日集中确认收入，但实际服务提供时间可能跨越年度。",
                        evidence: [
                            "12月份收入占全年收入的35%，明显高于其他月份",
                            "部分软件项目合同显示交付时间为2025年1月",
                            "客户验收单据日期集中在12月最后几天"
                        ],
                        recommendation: "建议按照实际服务提供进度确认收入，避免人为调节收入确认时点。对跨期项目应按完工进度法确认收入，并完善收入确认的内控制度。"
                    },
                    {
                        title: "混合销售业务税率适用错误",
                        level: "medium",
                        description: "公司智能设备销售业务中，硬件销售（13%）与软件授权（6%）未分别核算，统一按13%计缴增值税，存在多缴税款320万元。",
                        evidence: [
                            "智能设备销售合同中软件部分价值约占30%",
                            "财务核算未将软件授权单独计价",
                            "增值税申报表显示全部按13%税率申报"
                        ],
                        recommendation: "建议将硬件销售与软件授权分别计价核算，软件部分按6%税率计缴增值税。需要完善合同条款，明确区分硬件和软件的价格构成。"
                    },
                    {
                        title: "出口业务退税申报延迟",
                        level: "low",
                        description: "部分出口业务存在退税申报延迟情况，影响资金回笼效率。2024年有5笔出口业务延迟申报退税，涉及金额180万元。",
                        evidence: [
                            "出口退税申报表显示部分业务延迟2-3个月申报",
                            "出口报关单与退税申报时间差异明显",
                            "资金流量表显示退税到账时间明显延后"
                        ],
                        recommendation: "建议优化出口退税申报流程，确保在规定时间内完成申报。建立出口业务台账，跟踪从报关到退税申报的全过程。"
                    }
                ]
            },
            inputTax: {
                riskCount: 2,
                risks: [
                    {
                        title: "虚假发票抵扣风险",
                        level: "high",
                        description: "发现3家供应商开具的发票存在异常，涉及进项税额85万元。这些供应商在税务系统中显示为非正常户或已注销状态。",
                        evidence: [
                            "供应商A已被税务机关认定为虚开发票企业",
                            "供应商B、C在发票开具后1个月内注销",
                            "相关发票已被税务机关列入异常凭证范围"
                        ],
                        recommendation: "立即停止抵扣相关发票，主动补缴税款并加收滞纳金。建立供应商资质审查制度，定期核查供应商税务状态，避免接受虚假发票。"
                    },
                    {
                        title: "进项税额转出不及时",
                        level: "medium",
                        description: "用于员工福利的采购项目未及时转出进项税额，涉及金额42万元。主要为员工食堂采购、员工体检费用等非经营性支出。",
                        evidence: [
                            "员工食堂采购发票仍在进项税额中抵扣",
                            "员工体检、团建费用未进行进项税额转出",
                            "福利性支出占采购总额的比例较高"
                        ],
                        recommendation: "立即对用于员工福利的采购项目进行进项税额转出。建立福利性支出的单独核算体系，确保进项税额处理的及时性和准确性。"
                    }
                ]
            },
            industrySpecific: {
                description: "TMT行业软件开发企业特有风险检测",
                indicators: [
                    "SaaS服务收入确认时点：按订阅期间分摊 vs 一次性确认",
                    "虚拟道具销售：充值时确认 vs 消耗时确认的税务差异",
                    "跨境技术服务：境外收入免税政策适用条件",
                    "委托开发与自主开发：研发费用归集和税务处理差异",
                    "平台交易抽成：代收代付 vs 自营模式的增值税处理"
                ]
            }
        },
        corporateTaxRisks: {
            revenue: {
                riskCount: 4,
                risks: [
                    {
                        title: "技术服务收入确认政策不一致",
                        level: "high",
                        description: "财务会计与税务处理在技术服务收入确认上存在差异，税务申报未按权责发生制原则确认收入，存在少申报收入1200万元的风险。",
                        detectionMethod: "对比财务报表收入与企业所得税申报表收入，发现差异率达15%",
                        recommendation: "统一财务会计与税务处理标准，按照企业所得税法规定的权责发生制原则确认收入。对以前年度差异进行追溯调整。"
                    },
                    {
                        title: "关联方资金拆借利息收入漏报",
                        level: "medium",
                        description: "向关联公司提供资金拆借，未按照同期银行贷款利率确认利息收入，涉及少计收入380万元。",
                        detectionMethod: "审查资金流水和关联交易明细，发现无息或低息拆借情况",
                        recommendation: "按照独立交易原则确认关联方资金拆借的利息收入，补缴相应企业所得税。建立关联交易定价管理制度。"
                    }
                ]
            },
            costs: {
                riskCount: 5,
                risks: [
                    {
                        title: "研发费用归集不准确",
                        level: "high",
                        description: "研发费用中混入了非研发性支出，如行政管理人员工资、日常办公费用等，影响研发费用加计扣除政策的适用。涉及金额560万元。",
                        detectionMethod: "抽查研发费用明细账，发现部分费用与研发活动无直接关系",
                        recommendation: "严格按照《研发费用税前扣除管理办法》规定归集研发费用，建立研发项目台账，确保费用归集的准确性。"
                    },
                    {
                        title: "无有效凭证支出扣除",
                        level: "medium",
                        description: "部分咨询费、服务费等支出缺乏有效扣除凭证，如合同、发票不齐全，涉及金额180万元。",
                        detectionMethod: "抽查费用支出凭证，发现部分支出缺乏发票或合同依据",
                        recommendation: "建立完善的费用支出管理制度，确保所有税前扣除的费用都具备合法有效的扣除凭证。对无凭证支出进行纳税调整。"
                    }
                ]
            },
            taxPreferences: [
                {
                    policy: "高新技术企业15%税率",
                    status: "normal",
                    statusText: "正常享受",
                    riskLevel: "low"
                },
                {
                    policy: "研发费用加计扣除",
                    status: "warning",
                    statusText: "部分不合规",
                    riskLevel: "high"
                },
                {
                    policy: "小微企业所得税优惠",
                    status: "error",
                    statusText: "不适用",
                    riskLevel: "medium"
                },
                {
                    policy: "软件产品即征即退",
                    status: "normal",
                    statusText: "正常享受",
                    riskLevel: "low"
                }
            ],
            relatedPartyTransactions: [
                {
                    type: "资金拆借",
                    description: "向关联公司提供资金3000万元，利率低于同期银行贷款利率",
                    riskLevel: "high"
                },
                {
                    type: "技术服务",
                    description: "向关联公司提供技术开发服务，定价缺乏同期资料",
                    riskLevel: "medium"
                },
                {
                    type: "商标使用费",
                    description: "使用关联公司商标，未支付合理的使用费",
                    riskLevel: "medium"
                }
            ]
        },
        personalTaxRisks: {
            salaryWages: {
                risks: [
                    {
                        title: "高管人员薪酬申报不完整",
                        level: "high",
                        description: "高级管理人员的股权激励、年终奖等收入未完整申报个人所得税，涉及5名高管，估算少申报个税120万元。",
                        warning: "股权激励收入应按照规定分期申报纳税，年终奖应选择合适的计税方法"
                    },
                    {
                        title: "外籍员工个税处理不当",
                        level: "medium",
                        description: "2名外籍技术专家的津贴、补贴未按规定代扣代缴个人所得税，且未享受相关协定优惠。",
                        warning: "外籍员工应核实税收协定适用条件，合理享受协定优惠"
                    }
                ]
            },
            otherIncome: {
                risks: [
                    {
                        title: "股东分红个税扣缴不规范",
                        level: "medium",
                        description: "公司向自然人股东分配利润时，扣缴个人所得税的流程和时间不规范，存在延迟扣缴情况。",
                        recommendation: "建立规范的股东分红个税扣缴流程，确保在支付分红时同步扣缴个人所得税"
                    }
                ]
            }
        },
        otherTaxRisks: [
            {
                name: "房产税",
                risks: [
                    {
                        title: "自用房产原值申报偏低",
                        level: "medium",
                        description: "自用办公楼按购入价申报房产税，未包含后期改造投入800万元，导致房产税少缴约9.6万元。",
                        recommendation: "重新核算房产原值，包含所有改造、装修投入，补缴相应房产税及滞纳金。"
                    }
                ]
            },
            {
                name: "印花税",
                risks: [
                    {
                        title: "技术合同印花税减免申请不及时",
                        level: "low",
                        description: "技术开发合同应享受印花税减免优惠，但未及时办理减免手续，多缴印花税15万元。",
                        recommendation: "及时申请技术合同印花税减免，并对多缴税款申请退还。"
                    }
                ]
            }
        ],
        specialChecks: [
            {
                name: "发票管理检查",
                status: "error",
                result: "发现重大问题",
                findings: [
                    "3家供应商开具的发票被认定为虚开发票",
                    "发票开具与实际业务不符的情况5起",
                    "发票保管制度不完善，存在丢失风险"
                ],
                recommendations: [
                    "立即排查所有供应商发票的真实性",
                    "建立发票开具业务真实性审核制度",
                    "完善发票保管制度，实行专人负责"
                ]
            },
            {
                name: "申报缴税合规性",
                status: "warning",
                result: "存在改进空间",
                findings: [
                    "个别月份存在延迟申报情况",
                    "申报表填写个别项目存在错误",
                    "税务会计与财务会计差异调节不及时"
                ],
                recommendations: [
                    "建立申报提醒机制，确保按期申报",
                    "加强申报表复核检查",
                    "定期进行税务会计与财务会计差异分析"
                ]
            },
            {
                name: "内部控制评估",
                status: "normal",
                result: "基本规范",
                findings: [],
                recommendations: [
                    "继续完善税务内控制度",
                    "定期开展税务风险自查",
                    "加强员工税务合规培训"
                ]
            }
        ],
        remediation: {
            urgentItems: [
                {
                    deadline: "7日内",
                    description: "停止抵扣虚开发票，主动补缴税款85万元",
                    priority: "high"
                },
                {
                    deadline: "15日内",
                    description: "完成跨期收入纳税调整，补缴企业所得税300万元",
                    priority: "high"
                },
                {
                    deadline: "30日内",
                    description: "规范研发费用归集，调整加计扣除基数",
                    priority: "medium"
                },
                {
                    deadline: "60日内",
                    description: "完善关联交易同期资料，调整定价策略",
                    priority: "medium"
                }
            ],
            shortTerm: [
                "建立供应商资质审查制度，避免虚开发票风险",
                "完善收入确认内控制度，统一财税处理标准",
                "规范研发费用归集和核算方法",
                "建立发票开具业务真实性审核机制",
                "完善个人所得税代扣代缴流程"
            ],
            longTerm: [
                "建立全面的税务风险管理体系",
                "定期开展税务健康检查",
                "加强税务人员专业培训",
                "引入税务管理信息系统",
                "建立税务合规绩效考核机制"
            ],
            importantReminder: "企业应在规定时间内完成整改，主动补缴税款和滞纳金。建议聘请专业税务机构协助处理复杂涉税事项，确保整改措施的有效性和合规性。"
        },
        riskPreventionSystem: {
            mechanisms: [
                {
                    name: "日常监控机制",
                    description: "建立日常税务风险监控指标体系",
                    features: [
                        "税负率异常监控",
                        "申报数据一致性检查",
                        "发票使用情况监控",
                        "关联交易定价监控"
                    ]
                },
                {
                    name: "定期自查机制",
                    description: "建立定期税务风险自查制度",
                    features: [
                        "月度税务合规自查",
                        "季度风险评估报告",
                        "年度全面税务体检",
                        "专项风险排查"
                    ]
                },
                {
                    name: "预警响应机制",
                    description: "建立风险预警和快速响应体系",
                    features: [
                        "风险等级分类处理",
                        "应急处理预案",
                        "外部专业支持",
                        "整改跟踪验收"
                    ]
                }
            ],
            internalControls: [
                "税务岗位职责分离制度",
                "税务事项审批授权制度",
                "税务档案管理制度",
                "税务风险评估制度",
                "税务培训教育制度",
                "税务绩效考核制度",
                "外部税务顾问制度",
                "税务信息化管理制度"
            ]
        }
    };
};

// 保持向后兼容
export const getTaxRiskReportData = getRiskDetectionReportData;