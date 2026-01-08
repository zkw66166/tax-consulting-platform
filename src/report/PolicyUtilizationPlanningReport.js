// src/report/PolicyUtilizationPlanningReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>政策利用筹划报告</title>
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
            border-bottom: 4px solid #9b59b6;
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
            grid-template-columns: 1fr 1fr 1fr;
            gap: 30px;
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
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 2px solid #ecf0f1;
        }
        
        .info-card p {
            margin: 8px 0;
            padding: 3px 0;
            border-bottom: 1px dotted #bdc3c7;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
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
            background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
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
            border-top: 5px solid #9b59b6;
            position: relative;
        }
        
        .analysis-item::before {
            content: "▶";
            position: absolute;
            left: 25px;
            top: 25px;
            color: #9b59b6;
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
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #9c27b0;
        }
        
        .highlight-card h3 {
            color: #7b1fa2;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .highlight-card .value {
            color: #4a148c;
            font-size: 28px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .policy-card {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .policy-card::before {
            content: "⭐";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 20px;
            color: #2e7d32;
        }
        
        .policy-card h5 {
            color: #2e7d32;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .policy-card .policy-details {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }
        
        .policy-detail {
            text-align: center;
            background: rgba(255,255,255,0.7);
            padding: 10px;
            border-radius: 8px;
        }
        
        .policy-detail h6 {
            color: #1b5e20;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        
        .policy-detail .value {
            color: #2e7d32;
            font-size: 14px;
            font-weight: 700;
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
            color: #9b59b6;
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
            font-size: 14px;
        }
        
        th {
            background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
            color: white;
            padding: 12px 8px;
            text-align: center;
            font-weight: 600;
            font-size: 13px;
        }
        
        td {
            border-bottom: 1px solid #ecf0f1;
            padding: 10px 8px;
            text-align: center;
            font-size: 13px;
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
            color: #9b59b6;
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
            background: linear-gradient(135deg, #9b59b6, #8e44ad);
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
            background: linear-gradient(120deg, #e1bee7 0%, #ce93d8 100%);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .timeline {
            position: relative;
            padding: 20px 0;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 30px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #9b59b6;
        }
        
        .timeline-item {
            position: relative;
            padding: 20px 0 20px 70px;
            margin-bottom: 20px;
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            left: 24px;
            top: 25px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #9b59b6;
            border: 3px solid #fff;
            box-shadow: 0 0 0 3px #e1bee7;
        }
        
        .timeline-content {
            background: #f8f9fa;
            padding: 15px 20px;
            border-radius: 8px;
            border-left: 4px solid #9b59b6;
        }
        
        .timeline-content h5 {
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .timeline-content p {
            color: #7f8c8d;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .timeline-content .timeline-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #9b59b6;
            font-weight: 600;
        }
        
        .regional-map {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid #dee2e6;
        }
        
        .regional-item {
            background: white;
            margin: 10px 0;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .tax-comparison {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        
        .tax-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #ecf0f1;
        }
        
        .tax-item.current {
            border-color: #e74c3c;
            background: #fdf2f2;
        }
        
        .tax-item.optimized {
            border-color: #27ae60;
            background: #f2fdf3;
        }
        
        .tax-item.saving {
            border-color: #f39c12;
            background: #fef9f2;
        }
        
        .compliance-checklist {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
        }
        
        .compliance-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            padding: 8px;
            background: white;
            border-radius: 6px;
        }
        
        .compliance-status {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            color: white;
        }
        
        .status-pass {
            background: #27ae60;
        }
        
        .status-warning {
            background: #f39c12;
        }
        
        .status-fail {
            background: #e74c3c;
        }
        
        .policy-matrix {
            display: grid;
            grid-template-columns: 200px (5, 1fr);
            gap: 1px;
            background: #dee2e6;
            border-radius: 8px;
            overflow: hidden;
            margin: 20px 0;
        }
        
        .matrix-cell {
            background: white;
            padding: 10px;
            text-align: center;
            font-size: 13px;
        }
        
        .matrix-header {
            background: #34495e;
            color: white;
            font-weight: 600;
        }
        
        .matrix-row-header {
            background: #ecf0f1;
            font-weight: 600;
            text-align: left;
            padding-left: 15px;
        }
        
        .benefit-high {
            background: #d5f4e6;
            color: #27ae60;
            font-weight: 600;
        }
        
        .benefit-medium {
            background: #fef3cd;
            color: #f39c12;
            font-weight: 600;
        }
        
        .benefit-low {
            background: #f8d7da;
            color: #e74c3c;
            font-weight: 600;
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
            .grid-3, .grid-4 {
                grid-template-columns: 1fr 1fr;
            }
        }
        
        @media (max-width: 768px) {
            .company-info {
                grid-template-columns: 1fr;
            }
            .grid-2, .grid-3, .grid-4 {
                grid-template-columns: 1fr;
            }
            .policy-details {
                grid-template-columns: 1fr 1fr !important;
            }
            .tax-comparison {
                grid-template-columns: 1fr;
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
        <h1>政策利用筹划报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>🏢 企业基础信息</h3>
            <p><strong>企业名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>行业分类</strong><span>${reportData.companyInfo.industryCategory}</span></p>
            <p><strong>企业规模</strong><span>${reportData.companyInfo.companySize}</span></p>
            <p><strong>注册地址</strong><span>${reportData.companyInfo.registrationLocation}</span></p>
            <p><strong>成立时间</strong><span>${reportData.companyInfo.establishmentDate}</span></p>
            <p><strong>营业收入</strong><span>${reportData.companyInfo.annualRevenue}万元</span></p>
        </div>
        <div class="info-card">
            <h3>📊 税务现状</h3>
            <p><strong>纳税人性质</strong><span>${reportData.companyInfo.taxpayerType}</span></p>
            <p><strong>当前所得税率</strong><span>${reportData.companyInfo.currentIncomeTaxRate}</span></p>
            <p><strong>增值税率</strong><span>${reportData.companyInfo.vatRate}</span></p>
            <p><strong>年税负总额</strong><span>${reportData.companyInfo.currentTaxBurden}万元</span></p>
            <p><strong>研发投入占比</strong><span>${reportData.companyInfo.rdRatio}</span></p>
            <p><strong>高新认定状态</strong><span>${reportData.companyInfo.highTechStatus}</span></p>
        </div>
        <div class="info-card">
            <h3>🎯 筹划目标</h3>
            <p><strong>筹划期间</strong><span>${reportData.reportInfo.planningPeriod}</span></p>
            <p><strong>预计节税总额</strong><span class="highlight-text">${reportData.planningOverview.totalSaving}万元</span></p>
            <p><strong>税负下降幅度</strong><span class="highlight-text">${reportData.planningOverview.taxReductionRate}%</span></p>
            <p><strong>涉及政策数量</strong><span>${reportData.planningOverview.policyCount}项</span></p>
            <p><strong>投资回报率</strong><span>${reportData.planningOverview.roi}%</span></p>
            <p><strong>实施成功率</strong><span>${reportData.planningOverview.successRate}%</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📈 政策利用效果预测</h2>
        </div>
        <div class="section-content">
            <div class="tax-comparison">
                <div class="tax-item current">
                    <h4 style="margin: 0 0 10px 0; color: #e74c3c;">当前税负</h4>
                    <div class="value" style="font-size: 32px; font-weight: 700; color: #e74c3c;">${reportData.planningOverview.currentTaxBurden}万</div>
                    <p style="margin: 8px 0 0 0; font-size: 14px;">综合税负率 ${reportData.planningOverview.currentTaxRate}%</p>
                </div>
                <div class="tax-item optimized">
                    <h4 style="margin: 0 0 10px 0; color: #27ae60;">优化后税负</h4>
                    <div class="value" style="font-size: 32px; font-weight: 700; color: #27ae60;">${reportData.planningOverview.optimizedTaxBurden}万</div>
                    <p style="margin: 8px 0 0 0; font-size: 14px;">综合税负率 ${reportData.planningOverview.optimizedTaxRate}%</p>
                </div>
                <div class="tax-item saving">
                    <h4 style="margin: 0 0 10px 0; color: #f39c12;">节税效果</h4>
                    <div class="value" style="font-size: 32px; font-weight: 700; color: #f39c12;">${reportData.planningOverview.totalSaving}万</div>
                    <p style="margin: 8px 0 0 0; font-size: 14px;">下降 ${reportData.planningOverview.taxReductionRate}个百分点</p>
                </div>
            </div>
            
            <div class="feature-box">
                <h4>政策利用矩阵分析</h4>
                    <table style="margin: 20px 0;">
                        <tr>
                            <th>政策类别</th>
                            <th>适用性</th>
                            <th>节税潜力</th>
                            <th>申请难度</th>
                            <th>优先级</th>
                            <th>实施周期</th>
                        </tr>
                        ${reportData.policyMatrix.map(policy => `
                            <tr>
                                <td style="font-weight: 600; text-align: left;">${policy.category}</td>
                                <td class="${policy.applicability === '高' ? 'benefit-high' : policy.applicability === '中' ? 'benefit-medium' : 'benefit-low'}">${policy.applicability}</td>
                                <td class="${policy.savingPotential === '高' ? 'benefit-high' : policy.savingPotential === '中' ? 'benefit-medium' : 'benefit-low'}">${policy.savingPotential}</td>
                                <td class="${policy.difficulty === '低' ? 'benefit-high' : policy.difficulty === '中' ? 'benefit-medium' : 'benefit-low'}">${policy.difficulty}</td>
                                <td class="${policy.priority === '高' ? 'benefit-high' : policy.priority === '中' ? 'benefit-medium' : 'benefit-low'}">${policy.priority}</td>
                                <td>${policy.timeline}</td>
                            </tr>
                        `).join('')}
                    </table>
            </div>
            
            <div class="grid-2">
                <div class="analysis-item risk-low">
                    <h4>政策机会优势</h4>
                    <ul>
                        ${reportData.planningOverview.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-item risk-medium">
                    <h4>实施挑战风险</h4>
                    <ul>
                        ${reportData.planningOverview.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏆 创新驱动发展优惠政策</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 研发费用加计扣除政策深度利用</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>🔬 研发费用加计扣除优化方案</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.rdDeduction.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>制造业扣除率</h6>
                                <div class="value">200%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>其他企业扣除率</h6>
                                <div class="value">175%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>年节税额</h6>
                                <div class="value">${reportData.detailedAnalysis.rdDeduction.benefits.annualSaving}万</div>
                            </div>
                            <div class="policy-detail">
                                <h6>投资回报率</h6>
                                <div class="value">${reportData.detailedAnalysis.rdDeduction.benefits.roi}%</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>研发费用归集范围详细分析</h4>
                        <table>
                            <tr>
                                <th>费用类别</th>
                                <th>具体项目</th>
                                <th>当前归集金额(万元)</th>
                                <th>优化潜力(万元)</th>
                                <th>合规要求</th>
                            </tr>
                            ${reportData.detailedAnalysis.rdDeduction.expenseCategories.map(category => `
                                <tr>
                                    <td style="font-weight: 600;">${category.type}</td>
                                    <td style="text-align: left;">${category.items}</td>
                                    <td>${category.currentAmount}</td>
                                    <td style="color: #27ae60;">${category.optimizationPotential}</td>
                                    <td style="text-align: left; font-size: 12px;">${category.complianceRequirement}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>研发项目管理体系建设</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.rdDeduction.projectManagement}</p>
                        
                        <div class="compliance-checklist">
                            <h5 style="margin-bottom: 15px;">合规管理清单</h5>
                            ${reportData.detailedAnalysis.rdDeduction.complianceChecklist.map(item => `
                                <div class="compliance-item">
                                    <div class="compliance-status ${item.status === '已完成' ? 'status-pass' : item.status === '进行中' ? 'status-warning' : 'status-fail'}">
                                        ${item.status === '已完成' ? '✓' : item.status === '进行中' ? '⚠' : '✗'}
                                    </div>
                                    <span>${item.requirement}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>费用归集优化策略</h4>
                            <ul>
                                ${reportData.detailedAnalysis.rdDeduction.optimizationStrategies.map(strategy => `<li>${strategy}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>风险防控措施</h4>
                            <ul>
                                ${reportData.detailedAnalysis.rdDeduction.riskControls.map(control => `<li>${control}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 高新技术企业认定全流程规划</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>🏆 高新技术企业认定优势</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.highTechEnterprise.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>所得税率</h6>
                                <div class="value">15%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>年节税额</h6>
                                <div class="value">${reportData.detailedAnalysis.highTechEnterprise.benefits.annualSaving}万</div>
                            </div>
                            <div class="policy-detail">
                                <h6>有效期</h6>
                                <div class="value">${reportData.detailedAnalysis.highTechEnterprise.benefits.validPeriod}</div>
                            </div>
                            <div class="policy-detail">
                                <h6>配套优惠</h6>
                                <div class="value" style="font-size: 12px;">技术转让等</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>认定条件详细评估</h4>
                        <table>
                            <tr>
                                <th>认定条件</th>
                                <th>政策要求</th>
                                <th>企业现状</th>
                                <th>符合程度</th>
                                <th>改进措施</th>
                                <th>完成时间</th>
                            </tr>
                            ${reportData.detailedAnalysis.highTechEnterprise.conditions.map(condition => `
                                <tr>
                                    <td style="font-weight: 600;">${condition.requirement}</td>
                                    <td>${condition.policyStandard}</td>
                                    <td>${condition.currentStatus}</td>
                                    <td>
                                        ${condition.compliance === '符合' ? '✅ 符合' :
            condition.compliance === '基本符合' ? '🟡 基本符合' : '❌ 不符合'}
                                    </td>
                                    <td style="text-align: left;">${condition.improvement}</td>
                                    <td>${condition.timeline}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>知识产权布局规划</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.highTechEnterprise.ipStrategy}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>现有专利</h5>
                                <div class="value">${reportData.detailedAnalysis.highTechEnterprise.currentIP.patents}项</div>
                            </div>
                            <div class="metric-card">
                                <h5>软件著作权</h5>
                                <div class="value">${reportData.detailedAnalysis.highTechEnterprise.currentIP.softwareCopyrights}项</div>
                            </div>
                            <div class="metric-card">
                                <h5>商标注册</h5>
                                <div class="value">${reportData.detailedAnalysis.highTechEnterprise.currentIP.trademarks}项</div>
                            </div>
                            <div class="metric-card">
                                <h5>计划申请</h5>
                                <div class="value">${reportData.detailedAnalysis.highTechEnterprise.plannedIP.total}项</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>申请时间规划与里程碑</h4>
                        <div class="timeline">
                            ${reportData.detailedAnalysis.highTechEnterprise.applicationTimeline.map(item => `
                                <div class="timeline-item">
                                    <div class="timeline-content">
                                        <h5>${item.stage}</h5>
                                        <p>${item.description}</p>
                                        <ul>
                                            ${item.tasks.map(task => `<li style="font-size: 13px;">${task}</li>`).join('')}
                                        </ul>
                                        <div class="timeline-meta">
                                            <span>⏱️ ${item.duration}</span>
                                            <span>📅 ${item.deadline}</span>
                                            <span>💰 预算：${item.budget}万</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 技术转让所得优惠政策</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>💡 技术转让所得税收优惠</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.techTransfer.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>500万内免税</h6>
                                <div class="value">0%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>超额部分</h6>
                                <div class="value">减半征收</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.techTransfer.benefits.annualSaving}万</div>
                            </div>
                            <div class="policy-detail">
                                <h6>适用技术</h6>
                                <div class="value" style="font-size: 12px;">专利、软著等</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>技术资产梳理与评估</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.techTransfer.assetAssessment}</p>
                        
                        <table>
                            <tr>
                                <th>技术类别</th>
                                <th>技术名称</th>
                                <th>成熟度</th>
                                <th>市场价值(万元)</th>
                                <th>转让可行性</th>
                                <th>预计节税(万元)</th>
                            </tr>
                            ${reportData.detailedAnalysis.techTransfer.techAssets.map(asset => `
                                <tr>
                                    <td>${asset.category}</td>
                                    <td style="text-align: left;">${asset.name}</td>
                                    <td>${asset.maturity}</td>
                                    <td>${asset.marketValue}</td>
                                    <td>${asset.feasibility}</td>
                                    <td style="color: #27ae60;">${asset.taxSaving}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>转让模式优化</h4>
                            <ul>
                                ${reportData.detailedAnalysis.techTransfer.transferModes.map(mode => `<li>${mode}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>合规要求</h4>
                            <ul>
                                ${reportData.detailedAnalysis.techTransfer.complianceRequirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏭 产业结构升级优惠政策</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 制造业优惠政策体系</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>⚙️ 制造业专项优惠政策</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.manufacturing.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>设备一次性扣除</h6>
                                <div class="value">500万内</div>
                            </div>
                            <div class="policy-detail">
                                <h6>研发费用加计扣除</h6>
                                <div class="value">200%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>留抵退税</h6>
                                <div class="value">100%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.manufacturing.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>设备投资优化方案</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.manufacturing.equipmentOptimization}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>计划投资总额</h5>
                                <div class="value">${reportData.detailedAnalysis.manufacturing.investment.total}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>享受优惠金额</h5>
                                <div class="value">${reportData.detailedAnalysis.manufacturing.investment.eligible}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>节税效果</h5>
                                <div class="value">${reportData.detailedAnalysis.manufacturing.investment.taxSaving}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>现金流改善</h5>
                                <div class="value">${reportData.detailedAnalysis.manufacturing.investment.cashFlowImprovement}万元</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>智能制造升级路径</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.manufacturing.smartManufacturing}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 现代服务业优惠政策</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>🏢 现代服务业税收优惠</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.modernServices.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>技术服务免税</h6>
                                <div class="value">增值税</div>
                            </div>
                            <div class="policy-detail">
                                <h6>软件服务退税</h6>
                                <div class="value">即征即退</div>
                            </div>
                            <div class="policy-detail">
                                <h6>现代物流优惠</h6>
                                <div class="value">多项</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.modernServices.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>生产性服务业优惠</h4>
                            <ul>
                                ${reportData.detailedAnalysis.modernServices.productiveServices.map(service => `<li>${service}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>生活性服务业优惠</h4>
                            <ul>
                                ${reportData.detailedAnalysis.modernServices.lifeServices.map(service => `<li>${service}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 战略性新兴产业优惠</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>🚀 战略性新兴产业支持</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.emergingIndustries.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>集成电路</h6>
                                <div class="value" style="font-size: 12px;">全产业链优惠</div>
                            </div>
                            <div class="policy-detail">
                                <h6>新能源</h6>
                                <div class="value" style="font-size: 12px;">购置税免征</div>
                            </div>
                            <div class="policy-detail">
                                <h6>生物医药</h6>
                                <div class="value" style="font-size: 12px;">创新药优惠</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.emergingIndustries.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>新一代信息技术产业</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.emergingIndustries.infoTech}</p>
                        
                        <table>
                            <tr>
                                <th>技术领域</th>
                                <th>政策支持</th>
                                <th>适用条件</th>
                                <th>节税潜力</th>
                            </tr>
                            ${reportData.detailedAnalysis.emergingIndustries.infoTechDetails.map(tech => `
                                <tr>
                                    <td>${tech.field}</td>
                                    <td>${tech.policySupport}</td>
                                    <td style="text-align: left;">${tech.conditions}</td>
                                    <td style="color: #27ae60;">${tech.savingPotential}万</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>新能源新材料机会</h4>
                            <ul>
                                ${reportData.detailedAnalysis.emergingIndustries.newEnergyMaterials.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>生物医药发展支持</h4>
                            <ul>
                                ${reportData.detailedAnalysis.emergingIndustries.bioMedicine.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🌱 绿色发展优惠政策</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 环境保护税收优惠</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>🌿 环保设备投资抵免</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.environmental.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>环保设备抵免</h6>
                                <div class="value">10%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>节能设备抵免</h6>
                                <div class="value">10%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>安全设备抵免</h6>
                                <div class="value">10%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.environmental.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>环保设备投资规划</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.environmental.investmentPlan}</p>
                        
                        <table>
                            <tr>
                                <th>设备类别</th>
                                <th>投资金额(万元)</th>
                                <th>抵免额度(万元)</th>
                                <th>实施时间</th>
                                <th>环保效益</th>
                            </tr>
                            ${reportData.detailedAnalysis.environmental.equipmentPlanning.map(equipment => `
                                <tr>
                                    <td>${equipment.category}</td>
                                    <td>${equipment.investment}</td>
                                    <td style="color: #27ae60;">${equipment.taxCredit}</td>
                                    <td>${equipment.timeline}</td>
                                    <td style="text-align: left;">${equipment.environmentalBenefit}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>资源综合利用优惠</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.environmental.resourceUtilization}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 碳减排优惠政策</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>🌍 碳减排税收支持</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.carbonReduction.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>清洁能源</h6>
                                <div class="value" style="font-size: 12px;">即征即退50%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>节能减排</h6>
                                <div class="value" style="font-size: 12px;">多项优惠</div>
                            </div>
                            <div class="policy-detail">
                                <h6>绿色建筑</h6>
                                <div class="value" style="font-size: 12px;">发展支持</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.carbonReduction.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>清洁能源投资机会</h4>
                            <ul>
                                ${reportData.detailedAnalysis.carbonReduction.cleanEnergyOpportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>节能减排措施</h4>
                            <ul>
                                ${reportData.detailedAnalysis.carbonReduction.energySavingMeasures.map(measure => `<li>${measure}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 循环经济优惠政策</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>♻️ 循环经济发展支持</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.circularEconomy.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>废物回收</h6>
                                <div class="value" style="font-size: 12px;">税收优惠</div>
                            </div>
                            <div class="policy-detail">
                                <h6>再制造</h6>
                                <div class="value" style="font-size: 12px;">产业支持</div>
                            </div>
                            <div class="policy-detail">
                                <h6>循环农业</h6>
                                <div class="value" style="font-size: 12px;">绿色发展</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.circularEconomy.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>循环经济模式构建</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.circularEconomy.modelConstruction}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🗺️ 区域性优惠政策深度利用</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 自由贸易试验区政策</div>
                <div class="subsection-content">
                    <div class="regional-map">
                        <h4 style="text-align: center; margin-bottom: 20px;">自贸区政策适用性分析</h4>
                        ${reportData.detailedAnalysis.freeTradeZones.map(zone => `
                            <div class="regional-item">
                                <h5 style="color: #2c3e50; margin-bottom: 10px;">${zone.name}</h5>
                                <div class="grid-4">
                                    <div>
                                        <strong>优惠政策：</strong><br>
                                        ${zone.policies.join('、')}
                                    </div>
                                    <div>
                                        <strong>适用条件：</strong><br>
                                        ${zone.conditions.join('、')}
                                    </div>
                                    <div>
                                        <strong>节税潜力：</strong><br>
                                        <span style="color: #27ae60; font-weight: 600;">${zone.savingPotential}万元</span>
                                    </div>
                                    <div>
                                        <strong>实施难度：</strong><br>
                                        <span style="color: ${zone.difficulty === '低' ? '#27ae60' : zone.difficulty === '中' ? '#f39c12' : '#e74c3c'};">${zone.difficulty}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="policy-card">
                        <h5>🏝️ 海南自由贸易港重点机会</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.hainanFreePort.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>零关税</h6>
                                <div class="value" style="font-size: 12px;">生产设备等</div>
                            </div>
                            <div class="policy-detail">
                                <h6>低税率</h6>
                                <div class="value">15%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>简税制</h6>
                                <div class="value" style="font-size: 12px;">征管简化</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.hainanFreePort.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>海南自贸港业务布局建议</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.hainanFreePort.businessLayout}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 国家级新区和开发区</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>国家级新区政策机会</h4>
                        <table>
                            <tr>
                                <th>新区名称</th>
                                <th>功能定位</th>
                                <th>主要政策</th>
                                <th>适用性评估</th>
                                <th>节税潜力(万元)</th>
                            </tr>
                            ${reportData.detailedAnalysis.nationalNewAreas.map(area => `
                                <tr>
                                    <td style="font-weight: 600;">${area.name}</td>
                                    <td style="text-align: left;">${area.positioning}</td>
                                    <td style="text-align: left;">${area.policies}</td>
                                    <td>${area.applicability}</td>
                                    <td style="color: #27ae60;">${area.savingPotential}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>开发区入驻可行性分析</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.developmentZones.feasibilityAnalysis}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 区域协调发展战略</div>
                <div class="subsection-content">
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>京津冀协同发展机会</h4>
                            <ul>
                                ${reportData.detailedAnalysis.regionalStrategies.beijingTianjinHebei.map(opportunity => `<li>${opportunity}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>长江经济带政策支持</h4>
                            <ul>
                                ${reportData.detailedAnalysis.regionalStrategies.yangtzeRiverEconomicBelt.map(support => `<li>${support}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>粤港澳大湾区建设</h4>
                            <ul>
                                ${reportData.detailedAnalysis.regionalStrategies.guangdongHongKongMacao.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>黄河流域高质量发展</h4>
                            <ul>
                                ${reportData.detailedAnalysis.regionalStrategies.yellowRiverBasin.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🎯 专项优惠政策精准适用</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 小微企业优惠政策集成</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>🏪 小微企业税收优惠</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.smallMicroEnterprises.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>100万内税率</h6>
                                <div class="value">2.5%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>100-300万税率</h6>
                                <div class="value">5%</div>
                            </div>
                            <div class="policy-detail">
                                <h6>增值税免征额</h6>
                                <div class="value" style="font-size: 12px;">月15万</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.smallMicroEnterprises.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>小微企业标准符合性分析</h4>
                        <div class="compliance-checklist">
                            ${reportData.detailedAnalysis.smallMicroEnterprises.standardCompliance.map(item => `
                                <div class="compliance-item">
                                    <div class="compliance-status ${item.status === '符合' ? 'status-pass' : item.status === '临界' ? 'status-warning' : 'status-fail'}">
                                        ${item.status === '符合' ? '✓' : item.status === '临界' ? '⚠' : '✗'}
                                    </div>
                                    <div style="flex: 1;">
                                        <strong>${item.criterion}：</strong>${item.description}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>业务拆分优化策略</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.smallMicroEnterprises.businessSplitStrategy}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 创业就业优惠政策</div>
                <div class="subsection-content">
                    <div class="policy-card">
                        <h5>👥 创业就业税收支持</h5>
                        <p style="margin: 0; text-indent: 0; color: #2e7d32; font-size: 14px;">${reportData.detailedAnalysis.entrepreneurshipEmployment.policyDescription}</p>
                        <div class="policy-details">
                            <div class="policy-detail">
                                <h6>重点群体创业</h6>
                                <div class="value" style="font-size: 12px;">年14400元</div>
                            </div>
                            <div class="policy-detail">
                                <h6>企业吸纳就业</h6>
                                <div class="value" style="font-size: 12px;">人年7800元</div>
                            </div>
                            <div class="policy-detail">
                                <h6>残疾人就业</h6>
                                <div class="value" style="font-size: 12px;">月3500元</div>
                            </div>
                            <div class="policy-detail">
                                <h6>预计节税</h6>
                                <div class="value">${reportData.detailedAnalysis.entrepreneurshipEmployment.benefits.annualSaving}万</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>重点群体招聘计划</h4>
                            <ul>
                                ${reportData.detailedAnalysis.entrepreneurshipEmployment.targetGroupRecruitment.map(plan => `<li>${plan}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>残疾人安置方案</h4>
                            <ul>
                                ${reportData.detailedAnalysis.entrepreneurshipEmployment.disabilityEmployment.map(plan => `<li>${plan}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 科技创新优惠政策</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>科技成果转化优惠</h4>
                        <table>
                            <tr>
                                <th>优惠项目</th>
                                <th>政策内容</th>
                                <th>适用条件</th>
                                <th>节税效果</th>
                                <th>实施建议</th>
                            </tr>
                            ${reportData.detailedAnalysis.techInnovation.policies.map(policy => `
                                <tr>
                                    <td style="font-weight: 600;">${policy.item}</td>
                                    <td style="text-align: left;">${policy.content}</td>
                                    <td style="text-align: left;">${policy.conditions}</td>
                                    <td style="color: #27ae60;">${policy.taxSaving}万</td>
                                    <td style="text-align: left;">${policy.recommendation}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>创新平台建设</h4>
                            <ul>
                                ${reportData.detailedAnalysis.techInnovation.platformConstruction.map(platform => `<li>${platform}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h4>科技服务机构合作</h4>
                            <ul>
                                ${reportData.detailedAnalysis.techInnovation.serviceCooperation.map(cooperation => `<li>${cooperation}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚠️ 政策风险评估与管控</h2>
        </div>
        <div class="section-content">
            <div class="feature-box" style="text-align: center; margin-bottom: 30px;">
                <h4>政策风险综合评分</h4>
                <div style="font-size: 48px; font-weight: 700; color: #f39c12; margin: 20px 0;">
                    ${reportData.riskAssessment.overallScore}/10
                </div>
                <p style="color: #7f8c8d; font-size: 16px;">基于政策稳定性、申请难度、合规要求、执行风险等因素综合评估</p>
            </div>
            
            <div class="grid-2">
                ${reportData.riskAssessment.categories.map(category => `
                    <div class="analysis-item ${category.level === '低' ? 'risk-low' : category.level === '中' ? 'risk-medium' : 'risk-high'}">
                        <h4>${category.name} - ${category.score}分 (${category.level}风险)</h4>
                        <p>${category.description}</p>
                        <div style="margin-top: 15px;">
                            <strong>风险因素：</strong>
                            <ul style="margin-top: 10px;">
                                ${category.riskFactors.map(factor => `<li>${factor}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="margin-top: 15px;">
                            <strong>控制措施：</strong>
                            <ul style="margin-top: 10px;">
                                ${category.controlMeasures.map(measure => `<li>${measure}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="analysis-item">
                <h4>政策变化预警机制</h4>
                <p><span class="paragraph-number">1</span>${reportData.riskAssessment.policyChangeWarning}</p>
                
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h5>政策监测频率</h5>
                        <div class="value" style="font-size: 20px;">实时</div>
                    </div>
                    <div class="metric-card">
                        <h5>风险评估周期</h5>
                        <div class="value" style="font-size: 20px;">月度</div>
                    </div>
                    <div class="metric-card">
                        <h5>应急响应时间</h5>
                        <div class="value" style="font-size: 20px;">48小时</div>
                    </div>
                    <div class="metric-card">
                        <h5>备选方案数量</h5>
                        <div class="value" style="font-size: 20px;">${reportData.riskAssessment.contingencyPlans}个</div>
                    </div>
                </div>
            </div>
            
            <div class="analysis-item">
                <h4>合规管理体系建设</h4>
                <p><span class="paragraph-number">2</span>${reportData.riskAssessment.complianceManagement}</p>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📋 综合实施计划与时间表</h2>
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
                            <th>主要政策</th>
                            <th>时间安排</th>
                            <th>预期节税(万元)</th>
                            <th>投入成本(万元)</th>
                            <th>关键里程碑</th>
                            <th>风险等级</th>
                        </tr>
                        ${reportData.implementationPlan.phases.map(phase => `
                            <tr>
                                <td style="font-weight: 600;">${phase.stage}</td>
                                <td style="text-align: left;">${phase.policyType}</td>
                                <td>${phase.timeline}</td>
                                <td style="color: #27ae60;">${phase.expectedSaving}</td>
                                <td style="color: #e74c3c;">${phase.investmentCost}</td>
                                <td style="text-align: left;">${phase.milestone}</td>
                                <td>
                                    <span style="color: ${phase.riskLevel === '低' ? '#27ae60' : phase.riskLevel === '中' ? '#f39c12' : '#e74c3c'};">
                                        ${phase.riskLevel}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div class="analysis-item">
                    <h4>详细时间节点规划</h4>
                    <div class="timeline">
                        ${reportData.implementationPlan.detailedTimeline.map(item => `
                            <div class="timeline-item">
                                <div class="timeline-content">
                                    <h5>${item.milestone}</h5>
                                    <p>${item.description}</p>
                                    <div style="margin: 10px 0;">
                                        <strong>具体任务：</strong>
                                        <ul style="margin-top: 8px;">
                                            ${item.tasks.map(task => `<li style="font-size: 13px;">${task}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div style="margin: 10px 0;">
                                        <strong>责任部门：</strong>${item.responsibleDepartment}
                                    </div>
                                    <div class="timeline-meta">
                                        <span>⏱️ ${item.duration}</span>
                                        <span>📅 ${item.deadline}</span>
                                        <span>💰 投入：${item.budget}万</span>
                                        <span>📈 节税：${item.expectedSaving}万</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="grid-2">
                    <div class="analysis-item risk-medium">
                        <h4>资源配置要求</h4>
                        <div style="margin-bottom: 15px;">
                            <strong>人力资源：</strong>
                            <ul style="margin-top: 8px;">
                                ${reportData.implementationPlan.resourceRequirements.humanResources.map(requirement => `<li>${requirement}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>财务资源：</strong>
                            <ul style="margin-top: 8px;">
                                ${reportData.implementationPlan.resourceRequirements.financialResources.map(requirement => `<li>${requirement}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <strong>技术资源：</strong>
                            <ul style="margin-top: 8px;">
                                ${reportData.implementationPlan.resourceRequirements.technicalResources.map(requirement => `<li>${requirement}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>关键成功因素</h4>
                        <ul>
                            ${reportData.implementationPlan.successFactors.map(factor => `<li>${factor}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="analysis-item">
                    <h4>持续监管与优化</h4>
                    <div style="margin-bottom: 15px;">
                        <strong>监管重点：</strong>
                        <ul style="margin-top: 8px;">
                            ${reportData.implementationPlan.ongoingMonitoring.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <strong>优化调整机制：</strong>
                        <ul style="margin-top: 8px;">
                            ${reportData.implementationPlan.optimizationMechanism.map(mechanism => `<li>${mechanism}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="feature-box">
                <h4>投资回报分析</h4>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h5>总投资成本</h5>
                        <div class="value">${reportData.implementationPlan.investmentAnalysis.totalCost}万元</div>
                    </div>
                    <div class="metric-card">
                        <h5>预期总节税</h5>
                        <div class="value">${reportData.implementationPlan.investmentAnalysis.totalSaving}万元</div>
                    </div>
                    <div class="metric-card">
                        <h5>投资回报率</h5>
                        <div class="value">${reportData.implementationPlan.investmentAnalysis.roi}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>回收期</h5>
                        <div class="value">${reportData.implementationPlan.investmentAnalysis.paybackPeriod}年</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本报告基于现行税收优惠政策进行分析，所有政策享受须严格符合相关条件要求。企业应及时关注政策变化，确保申请材料真实完整，承担相应的法律责任。本报告仅供参考，具体实施前请咨询专业税务机构。</p>
        <br>
        <p><strong>服务支持</strong></p>
        <p>📞 咨询热线：400-XXX-XXXX | 📧 邮箱：service@taxplanning.com | 🌐 网站：www.taxplanning.com</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam} | 📋 报告版本：${reportData.reportInfo.version}</p>
    </div>
</body>
</html>
    `;
};

// 导出扩展的报告数据结构
export const getPolicyUtilizationReportData = () => {
    return {
        companyInfo: {
            name: "科技创新股份有限公司",
            industryCategory: "软件和信息技术服务业",
            companySize: "中型企业",
            registrationLocation: "北京市海淀区",
            establishmentDate: "2018年3月",
            annualRevenue: 38000,
            taxpayerType: "一般纳税人",
            currentIncomeTaxRate: "25%",
            vatRate: "6%",
            currentTaxBurden: 1520,
            rdRatio: "12.5%",
            highTechStatus: "未认定"
        },
        reportInfo: {
            reportDate: "2024年12月15日",
            planningPeriod: "2025年1月-2027年12月",
            reportNumber: "PU-20241215-001",
            projectTeam: "政策利用专家团队",
            version: "v2.0"
        },
        planningOverview: {
            currentTaxBurden: 1520,
            optimizedTaxBurden: 800,
            totalSaving: 720,
            currentTaxRate: 4.0,
            optimizedTaxRate: 2.1,
            taxReductionRate: 1.9,
            policyCount: 12,
            roi: 2057,
            successRate: 85,
            opportunities: [
                "企业研发投入比例符合高新技术企业认定条件，可享受15%优惠税率",
                "制造业研发费用可享受200%加计扣除，节税潜力巨大",
                "软件产品收入符合即征即退政策，增值税负担可大幅降低",
                "西部地区业务布局机会，可享受区域性税收优惠",
                "环保设备投资可享受10%投资抵免优惠",
                "技术转让业务具备较大优惠空间",
                "小微企业拆分策略可进一步降低整体税负"
            ],
            challenges: [
                "高新技术企业认定材料准备工作量大，需要系统性规划",
                "研发费用归集制度需要完善，确保合规性",
                "区域性政策需要实际业务布局，投资成本较高",
                "部分政策条件较为严格，存在一定申请风险",
                "政策享受期间需要持续符合条件，管理成本增加",
                "多项政策组合使用的协调难度较大"
            ]
        },
        policyMatrix: [
            {
                category: "高新技术企业认定",
                applicability: "高",
                savingPotential: "高",
                difficulty: "中",
                priority: "高",
                timeline: "6-8个月"
            },
            {
                category: "研发费用加计扣除",
                applicability: "高",
                savingPotential: "高",
                difficulty: "低",
                priority: "高",
                timeline: "3个月"
            },
            {
                category: "软件企业认定",
                applicability: "高",
                savingPotential: "中",
                difficulty: "中",
                priority: "高",
                timeline: "4-5个月"
            },
            {
                category: "西部大开发优惠",
                applicability: "中",
                savingPotential: "中",
                difficulty: "高",
                priority: "中",
                timeline: "6-12个月"
            },
            {
                category: "环保设备投资抵免",
                applicability: "中",
                savingPotential: "低",
                difficulty: "低",
                priority: "中",
                timeline: "3-4个月"
            },
            {
                category: "技术转让所得优惠",
                applicability: "中",
                savingPotential: "中",
                difficulty: "中",
                priority: "中",
                timeline: "4-6个月"
            }
        ],
        detailedAnalysis: {
            rdDeduction: {
                policyDescription: "制造业企业研发费用可在企业所得税前100%扣除基础上，再按100%比例加计扣除（实际扣除200%）；其他企业享受75%加计扣除（实际扣除175%）。通过完善研发费用归集制度，可最大化享受政策优惠。",
                benefits: {
                    annualSaving: 285,
                    roi: 1425
                },
                expenseCategories: [
                    {
                        type: "人员人工费用",
                        items: "研发人员工资、五险一金、外聘人员劳务费",
                        currentAmount: 2800,
                        optimizationPotential: 350,
                        complianceRequirement: "建立研发人员工时统计制度"
                    },
                    {
                        type: "直接投入费用",
                        items: "材料、燃料动力、模具工艺装备、样品样机等",
                        currentAmount: 850,
                        optimizationPotential: 120,
                        complianceRequirement: "单独核算研发材料使用"
                    },
                    {
                        type: "折旧摊销费用",
                        items: "研发设备折旧、软件专利摊销",
                        currentAmount: 650,
                        optimizationPotential: 180,
                        complianceRequirement: "区分研发和生产设备使用"
                    },
                    {
                        type: "设计试验费用",
                        items: "新产品设计费、新工艺制定费、试验费",
                        currentAmount: 280,
                        optimizationPotential: 80,
                        complianceRequirement: "保留设计试验相关文件"
                    },
                    {
                        type: "其他相关费用",
                        items: "与研发活动相关的其他费用",
                        currentAmount: 170,
                        optimizationPotential: 50,
                        complianceRequirement: "不超过可扣除费用总额10%"
                    }
                ],
                projectManagement: "建立完善的研发项目管理体系是享受加计扣除政策的关键。需要从项目立项、实施、结项全流程进行规范管理，确保研发活动符合政策要求。建议设立专门的研发项目管理部门，制定详细的项目管理制度，建立研发费用归集的内控体系。",
                complianceChecklist: [
                    {
                        requirement: "研发项目立项文件完整",
                        status: "已完成"
                    },
                    {
                        requirement: "研发费用辅助账建立",
                        status: "进行中"
                    },
                    {
                        requirement: "研发人员工时统计制度",
                        status: "待建立"
                    },
                    {
                        requirement: "研发材料单独核算",
                        status: "进行中"
                    },
                    {
                        requirement: "研发设备使用记录",
                        status: "待完善"
                    }
                ],
                optimizationStrategies: [
                    "完善研发费用归集制度，确保符合条件费用应归尽归",
                    "优化研发人员结构，提高人工费用在研发费用中的比重",
                    "加强研发设备投资，充分利用设备折旧加计扣除",
                    "规范委托外部研发业务，合理享受委托研发费用扣除",
                    "建立研发档案管理制度，确保备查资料完整规范"
                ],
                riskControls: [
                    "定期开展研发费用归集的内部审计",
                    "建立研发活动的真实性审查机制",
                    "完善研发费用与生产费用的分离制度",
                    "加强税务风险评估和预警",
                    "建立与税务机关的沟通协调机制"
                ]
            },
            highTechEnterprise: {
                policyDescription: "高新技术企业可享受15%的企业所得税优惠税率，相比25%标准税率节税10个百分点，同时可享受研发费用加计扣除、技术转让所得优惠、股权激励递延纳税等配套政策。",
                benefits: {
                    annualSaving: 380,
                    validPeriod: "3年"
                },
                conditions: [
                    {
                        requirement: "成立年限",
                        policyStandard: "注册成立一年以上",
                        currentStatus: "成立6年",
                        compliance: "符合",
                        improvement: "继续保持",
                        timeline: "已满足"
                    },
                    {
                        requirement: "知识产权",
                        policyStandard: "拥有核心自主知识产权",
                        currentStatus: "专利8项，软著15项",
                        compliance: "基本符合",
                        improvement: "申请更多发明专利",
                        timeline: "6个月内"
                    },
                    {
                        requirement: "高新技术领域",
                        policyStandard: "属于国家重点支持领域",
                        currentStatus: "电子信息技术",
                        compliance: "符合",
                        improvement: "完善技术说明材料",
                        timeline: "3个月内"
                    },
                    {
                        requirement: "科技人员占比",
                        policyStandard: "≥10%",
                        currentStatus: "15%",
                        compliance: "符合",
                        improvement: "提升人员技术认证",
                        timeline: "持续进行"
                    },
                    {
                        requirement: "研发费用占比",
                        policyStandard: "≥4%（销售收入≥2亿）",
                        currentStatus: "12.5%",
                        compliance: "符合",
                        improvement: "完善费用归集制度",
                        timeline: "4个月内"
                    },
                    {
                        requirement: "高新收入占比",
                        policyStandard: "≥60%",
                        currentStatus: "68%",
                        compliance: "符合",
                        improvement: "提升产品技术含量",
                        timeline: "持续进行"
                    },
                    {
                        requirement: "创新能力评价",
                        policyStandard: "≥70分",
                        currentStatus: "预计75分",
                        compliance: "符合",
                        improvement: "完善创新能力材料",
                        timeline: "5个月内"
                    }
                ],
                ipStrategy: "制定知识产权布局战略，重点加强发明专利申请。建议围绕核心技术申请发明专利5-8项，补充实用新型专利3-5项，继续完善软件著作权保护体系。同时加强知识产权管理制度建设，建立完善的知识产权档案。",
                currentIP: {
                    patents: 8,
                    softwareCopyrights: 15,
                    trademarks: 3
                },
                plannedIP: {
                    total: 12
                },
                applicationTimeline: [
                    {
                        stage: "准备阶段",
                        description: "完善知识产权体系，整理研发费用归集制度",
                        tasks: [
                            "申请发明专利5项，实用新型专利3项",
                            "完善研发费用归集制度和辅助账",
                            "整理科技人员认证材料",
                            "建立研发项目档案管理体系"
                        ],
                        duration: "2个月",
                        deadline: "2025年2月",
                        budget: 15
                    },
                    {
                        stage: "材料准备",
                        description: "编制高新技术企业认定申报材料",
                        tasks: [
                            "编制企业申报书和附件材料",
                            "准备专项审计报告和研发费用专项报告",
                            "整理高新技术产品收入明细",
                            "完善创新能力评价材料"
                        ],
                        duration: "1.5个月",
                        deadline: "2025年3月中旬",
                        budget: 25
                    },
                    {
                        stage: "正式申报",
                        description: "提交申报材料，接受专家评审",
                        tasks: [
                            "在认定管理系统提交申报材料",
                            "准备专家评审答辩材料",
                            "配合现场检查和材料补充",
                            "跟踪申报进展和反馈"
                        ],
                        duration: "3个月",
                        deadline: "2025年6月",
                        budget: 8
                    },
                    {
                        stage: "认定公示",
                        description: "等待认定结果，办理证书领取",
                        tasks: [
                            "关注认定结果公示",
                            "办理高新技术企业证书",
                            "完善企业所得税优惠备案",
                            "建立高新技术企业管理制度"
                        ],
                        duration: "2个月",
                        deadline: "2025年8月",
                        budget: 3
                    }
                ]
            },
            techTransfer: {
                policyDescription: "居民企业技术转让所得500万元内免征企业所得税，超过500万元部分减半征收。技术转让包括专利技术、计算机软件著作权、集成电路布图设计等。",
                benefits: {
                    annualSaving: 45
                },
                assetAssessment: "企业拥有多项具有转让价值的技术资产，包括自主研发的软件技术、工艺流程改进技术等。通过技术资产评估和转让规划，可以合理享受技术转让所得税收优惠，同时促进技术成果转化。",
                techAssets: [
                    {
                        category: "软件技术",
                        name: "智能数据分析平台核心算法",
                        maturity: "成熟",
                        marketValue: 280,
                        feasibility: "高",
                        taxSaving: 15
                    },
                    {
                        category: "工艺技术",
                        name: "自动化生产流程优化技术",
                        maturity: "成熟",
                        marketValue: 180,
                        feasibility: "中",
                        taxSaving: 8
                    },
                    {
                        category: "专利技术",
                        name: "产品设计优化专利技术",
                        maturity: "成熟",
                        marketValue: 320,
                        feasibility: "高",
                        taxSaving: 18
                    },
                    {
                        category: "集成技术",
                        name: "系统集成解决方案",
                        maturity: "较成熟",
                        marketValue: 150,
                        feasibility: "中",
                        taxSaving: 4
                    }
                ],
                transferModes: [
                    "通过技术许可方式实现技术转让，保留技术所有权",
                    "设立技术转移公司，专门从事技术转让业务",
                    "与科研院所合作，共同开展技术转移活动",
                    "建立技术转移基金，投资技术转化项目"
                ],
                complianceRequirements: [
                    "技术转让需经省级以上科技部门认定",
                    "向境外转让技术需商务部门认定",
                    "保留完整的技术转让合同和价款支付凭证",
                    "技术转让所得需单独核算",
                    "按规定进行企业所得税备案"
                ]
            },
            manufacturing: {
                policyDescription: "制造业企业享受设备器具500万元以下一次性扣除、研发费用200%加计扣除、增值税留抵退税等多项优惠政策，全面支持制造业转型升级。",
                benefits: {
                    annualSaving: 125
                },
                equipmentOptimization: "制定设备投资优化方案，重点投资智能制造设备和环保设备。通过合理安排投资节奏，充分享受设备一次性扣除政策，同时提升企业技术水平和环保水平。",
                investment: {
                    total: 1200,
                    eligible: 950,
                    taxSaving: 238,
                    cashFlowImprovement: 285
                },
                smartManufacturing: "推进智能制造升级，投资工业互联网、智能装备、数字化车间等项目。通过智能制造升级，不仅可以享受税收优惠，还能提升生产效率和产品质量，增强企业竞争力。"
            },
            modernServices: {
                policyDescription: "现代服务业享受技术转让免增值税、软件服务即征即退、现代物流等多项优惠政策，支持服务业高质量发展。",
                benefits: {
                    annualSaving: 88
                },
                productiveServices: [
                    "技术开发、技术转让、技术咨询服务免征增值税",
                    "软件开发和系统集成服务享受即征即退政策",
                    "现代物流仓储服务享受简易征收优惠",
                    "科技中介服务享受税收减免政策"
                ],
                lifeServices: [
                    "文化创意设计服务享受税收优惠",
                    "健康管理服务纳入免税范围",
                    "教育培训服务免征增值税",
                    "体育服务业发展获得税收支持"
                ]
            },
            emergingIndustries: {
                policyDescription: "战略性新兴产业享受全方位税收政策支持，包括集成电路全产业链优惠、新能源汽车购置税免征、生物医药创新优惠等。",
                benefits: {
                    annualSaving: 65
                },
                infoTech: "新一代信息技术产业是国家重点支持领域，享受研发费用加计扣除、高新技术企业所得税优惠、软件产品增值税退税等多项政策。",
                infoTechDetails: [
                    {
                        field: "软件和信息技术服务",
                        policySupport: "增值税即征即退、所得税减免",
                        conditions: "软件产品认定、收入占比要求",
                        savingPotential: 35
                    },
                    {
                        field: "人工智能",
                        policySupport: "研发费用加计扣除、创新支持",
                        conditions: "技术先进性认定",
                        savingPotential: 15
                    },
                    {
                        field: "大数据",
                        policySupport: "高新技术企业认定、项目支持",
                        conditions: "核心技术自主可控",
                        savingPotential: 10
                    },
                    {
                        field: "云计算",
                        policySupport: "服务业发展优惠、技术转让免税",
                        conditions: "服务模式创新",
                        savingPotential: 5
                    }
                ],
                newEnergyMaterials: [
                    "新能源设备投资享受设备抵免政策",
                    "节能环保项目享受所得税减免",
                    "新材料研发享受加计扣除优惠",
                    "绿色技术转让享受免税政策"
                ],
                bioMedicine: [
                    "创新药研发费用享受加计扣除",
                    "医疗器械创新享受税收支持",
                    "生物技术转让享受免税优惠",
                    "中医药产业发展获得政策支持"
                ]
            },
            environmental: {
                policyDescription: "环境保护专用设备、节能节水专用设备、安全生产专用设备投资额的10%可以抵免企业所得税，抵免限额为当年应纳税额。",
                benefits: {
                    annualSaving: 28
                },
                investmentPlan: "制定环保设备投资计划，重点投资污水处理设备、废气治理设备、噪音控制设备等。通过环保投资，既能享受税收优惠，又能提升企业环保水平，履行社会责任。",
                equipmentPlanning: [
                    {
                        category: "污水处理设备",
                        investment: 80,
                        taxCredit: 8,
                        timeline: "2025年3-6月",
                        environmentalBenefit: "处理废水达标排放"
                    },
                    {
                        category: "废气治理设备",
                        investment: 120,
                        taxCredit: 12,
                        timeline: "2025年6-9月",
                        environmentalBenefit: "减少大气污染物排放"
                    },
                    {
                        category: "节能改造设备",
                        investment: 60,
                        taxCredit: 6,
                        timeline: "2025年9-12月",
                        environmentalBenefit: "降低能源消耗"
                    },
                    {
                        category: "安全监控设备",
                        investment: 40,
                        taxCredit: 4,
                        timeline: "2025年12月-2026年3月",
                        environmentalBenefit: "提升生产安全水平"
                    }
                ],
                resourceUtilization: "积极开展资源综合利用业务，享受增值税即征即退和企业所得税减计收入优惠。重点发展废料回收利用、能源回收利用等业务，形成循环经济发展模式。"
            },
            carbonReduction: {
                policyDescription: "清洁能源发电享受增值税即征即退50%，节能减排项目享受所得税优惠，新能源汽车免征购置税等。",
                benefits: {
                    annualSaving: 22
                },
                cleanEnergyOpportunities: [
                    "投资分布式光伏发电项目，享受增值税即征即退",
                    "采用清洁能源供应，降低碳排放和能源成本",
                    "参与碳排放权交易，获得碳减排收益",
                    "开展合同能源管理业务，享受税收优惠"
                ],
                energySavingMeasures: [
                    "实施节能技术改造，享受设备投资抵免",
                    "推广绿色建筑技术，获得建设项目支持",
                    "使用新能源车辆，享受购置税免征",
                    "开展清洁生产认证，获得优惠政策支持"
                ]
            },
            circularEconomy: {
                policyDescription: "资源综合利用享受增值税即征即退70%，再制造产业获得发展支持，循环农业享受绿色发展优惠。",
                benefits: {
                    annualSaving: 18
                },
                modelConstruction: "构建循环经济发展模式，建立'减量化、再利用、资源化'的循环生产体系。通过废料回收利用、产品再制造、资源循环利用等方式，实现经济效益和环境效益双赢。"
            },
            freeTradeZones: [
                {
                    name: "海南自由贸易港",
                    policies: ["零关税", "15%所得税率", "简化税制"],
                    conditions: ["实质性运营", "鼓励类产业", "监管要求"],
                    savingPotential: 120,
                    difficulty: "中"
                },
                {
                    name: "上海自贸区",
                    policies: ["离岸贸易", "跨境电商", "金融创新"],
                    conditions: ["业务实质", "监管合规", "资质要求"],
                    savingPotential: 80,
                    difficulty: "中"
                },
                {
                    name: "广东自贸区",
                    policies: ["粤港澳合作", "金融创新", "航运服务"],
                    conditions: ["区域注册", "业务开展", "合规经营"],
                    savingPotential: 60,
                    difficulty: "低"
                }
            ],
            hainanFreePort: {
                policyDescription: "海南自由贸易港实施'零关税、低税率、简税制'政策体系，为企业提供全方位税收优惠。",
                benefits: {
                    annualSaving: 120
                },
                businessLayout: "建议在海南设立子公司，承担软件开发、技术服务等业务。利用海南自贸港政策优势，开展离岸业务和国际合作，享受15%企业所得税率和其他配套优惠政策。"
            },
            nationalNewAreas: [
                {
                    name: "雄安新区",
                    positioning: "创新驱动发展引领区、协调发展示范区",
                    policies: "创新支持、绿色发展、开放合作",
                    applicability: "高",
                    savingPotential: 85
                },
                {
                    name: "浦东新区",
                    positioning: "改革开放先行区、科技创新核心区",
                    policies: "金融创新、科技创新、产业升级",
                    applicability: "中",
                    savingPotential: 95
                },
                {
                    name: "西咸新区",
                    positioning: "创新城市发展方式示范区",
                    policies: "产业升级、丝路建设、创新发展",
                    applicability: "中",
                    savingPotential: 45
                }
            ],
            developmentZones: {
                feasibilityAnalysis: "评估入驻国家级开发区的可行性，重点考虑产业匹配度、政策优惠力度、运营成本等因素。建议优先考虑高新技术产业开发区，享受高新技术产业政策支持。"
            },
            regionalStrategies: {
                beijingTianjinHebei: [
                    "参与非首都功能疏解，享受产业转移优惠政策",
                    "在河北设立生产基地，降低运营成本",
                    "利用京津冀交通一体化便利，优化产业布局",
                    "参与协同创新项目，获得政策和资金支持"
                ],
                yangtzeRiverEconomicBelt: [
                    "发展绿色产业，享受生态环保优惠政策",
                    "参与长江经济带创新发展项目",
                    "利用长江黄金水道，发展现代物流业务",
                    "在长三角地区布局高端制造业务"
                ],
                guangdongHongKongMacao: [
                    "参与粤港澳大湾区科技创新合作",
                    "利用港澳金融服务优势，拓展国际业务",
                    "在大湾区设立研发中心，享受创新政策",
                    "开展跨境电商和数字贸易业务"
                ],
                yellowRiverBasin: [
                    "参与黄河流域生态保护项目，享受环保政策",
                    "发展特色优势产业，获得区域政策支持",
                    "在西部地区布局制造业务，享受区域优惠",
                    "参与文化产业发展，获得文化政策支持"
                ]
            },
            smallMicroEnterprises: {
                policyDescription: "小型微利企业年应纳税所得额100万元内享受2.5%税率，100-300万元部分享受5%税率，小规模纳税人月销售额15万元内免征增值税。",
                benefits: {
                    annualSaving: 45
                },
                standardCompliance: [
                    {
                        criterion: "从业人数",
                        description: "不超过300人（当前285人）",
                        status: "符合"
                    },
                    {
                        criterion: "资产总额",
                        description: "不超过5000万元（当前4200万元）",
                        status: "符合"
                    },
                    {
                        criterion: "年应纳税所得额",
                        description: "不超过300万元（当前约380万元）",
                        status: "超标"
                    }
                ],
                businessSplitStrategy: "通过业务拆分策略，将部分业务独立设立小微企业，享受小微企业税收优惠。建议将软件开发、技术咨询等业务分离，设立多个小微企业，合理安排业务分工和利润分配。"
            },
            entrepreneurshipEmployment: {
                policyDescription: "企业招用重点群体享受定额税收扣减，安置残疾人享受增值税退税和工资加计扣除优惠。",
                benefits: {
                    annualSaving: 32
                },
                targetGroupRecruitment: [
                    "招用建档立卡贫困人口，享受每人每年7800元税收扣减",
                    "招用持就业创业证人员，享受定额税收优惠",
                    "招用退役军人，享受相关税收减免政策",
                    "建立完善的就业帮扶制度和培训体系"
                ],
                disabilityEmployment: [
                    "制定残疾人招聘计划，达到35%比例要求",
                    "提供适合残疾人的工作岗位和无障碍设施",
                    "享受残疾人工资100%加计扣除优惠",
                    "申请民政福利企业资质，享受更多优惠"
                ]
            },
            techInnovation: {
                policies: [
                    {
                        item: "股权激励递延纳税",
                        content: "符合条件的股权激励可递延至转让环节纳税",
                        conditions: "高新技术企业、股权激励计划规范",
                        taxSaving: 25,
                        recommendation: "制定规范的股权激励计划"
                    },
                    {
                        item: "科技企业孵化器优惠",
                        content: "免征房产税、城镇土地使用税",
                        conditions: "获得国家级孵化器认定",
                        taxSaving: 15,
                        recommendation: "申请孵化器资质认定"
                    },
                    {
                        item: "技术成果投资入股",
                        content: "技术成果投资入股可选择递延纳税",
                        conditions: "技术成果符合认定条件",
                        taxSaving: 18,
                        recommendation: "梳理技术成果，规划投资入股"
                    }
                ],
                platformConstruction: [
                    "建设企业技术中心，享受创新平台政策支持",
                    "申请工程实验室资质，获得科研项目支持",
                    "设立博士后工作站，享受人才政策优惠",
                    "建立产学研合作平台，获得协同创新支持"
                ],
                serviceCooperation: [
                    "与科技服务机构合作，享受技术转移优惠",
                    "委托高校院所研发，享受委托研发费用扣除",
                    "参与科技成果转化基金，获得投资支持",
                    "加入产业技术创新联盟，享受协同创新政策"
                ]
            }
        },
        riskAssessment: {
            overallScore: 8.4,
            categories: [
                {
                    name: "政策稳定性风险",
                    score: 8.8,
                    level: "低",
                    description: "主要税收优惠政策具有较强延续性，政策调整风险较低",
                    riskFactors: [
                        "政策到期后可能面临调整",
                        "执行细则可能发生变化",
                        "地方配套政策存在差异"
                    ],
                    controlMeasures: [
                        "建立政策跟踪监测机制",
                        "制定政策变化应对预案",
                        "加强政策解读和培训"
                    ]
                },
                {
                    name: "申请条件风险",
                    score: 8.2,
                    level: "低",
                    description: "企业基本符合主要政策申请条件，风险可控",
                    riskFactors: [
                        "部分条件需要持续维持",
                        "申请材料准备复杂",
                        "审批标准可能收紧"
                    ],
                    controlMeasures: [
                        "建立条件维持的长效机制",
                        "完善申请材料准备流程",
                        "提前准备备选方案"
                    ]
                },
                {
                    name: "审批执行风险",
                    score: 8.3,
                    level: "低",
                    description: "政策审批程序相对规范，执行风险较低",
                    riskFactors: [
                        "审批时间可能延长",
                        "审批标准可能提高",
                        "地区执行存在差异"
                    ],
                    controlMeasures: [
                        "提前启动申请程序",
                        "加强与审批部门沟通",
                        "选择政策执行较好的地区"
                    ]
                },
                {
                    name: "合规维持风险",
                    score: 8.1,
                    level: "低",
                    description: "政策享受期间需要持续符合条件，存在一定合规风险",
                    riskFactors: [
                        "业务变化影响政策适用",
                        "财务数据不符合要求",
                        "管理制度不够完善"
                    ],
                    controlMeasures: [
                        "建立业务变化评估机制",
                        "完善财务核算制度",
                        "加强内部管理控制"
                    ]
                }
            ],
            policyChangeWarning: "建立政策变化预警机制，实时监测政策动态。设立专门的政策研究团队，定期分析政策趋势，评估政策变化对企业的影响。建立政策风险评估模型，及时识别和应对政策风险。",
            contingencyPlans: 8,
            complianceManagement: "建立完善的合规管理体系，制定政策享受的内控制度。定期开展合规性自查，确保持续符合政策要求。加强员工培训，提升政策理解和执行能力。建立与税务机关的常态化沟通机制。"
        },
        implementationPlan: {
            overallStrategy: "采用'分层推进、重点突破、协同实施'的策略，优先实施条件成熟、节税效果显著的政策，如高新技术企业认定和研发费用加计扣除优化；稳步推进软件企业认定和区域性政策布局；积极探索创新性政策机会。整个实施过程要确保合规性，建立系统性的政策管理体系。",
            phases: [
                {
                    stage: "第一阶段(2025年1-4月)",
                    policyType: "研发费用加计扣除优化、高新技术企业认定准备",
                    timeline: "2025年1-4月",
                    expectedSaving: 285,
                    investmentCost: 25,
                    milestone: "完善研发费用归集制度、启动高新认定准备",
                    riskLevel: "低"
                },
                {
                    stage: "第二阶段(2025年5-8月)",
                    policyType: "高新技术企业认定申报、软件企业认定",
                    timeline: "2025年5-8月",
                    expectedSaving: 380,
                    investmentCost: 35,
                    milestone: "获得高新技术企业证书、软件企业资质",
                    riskLevel: "中"
                },
                {
                    stage: "第三阶段(2025年9月-2026年3月)",
                    policyType: "区域性政策布局、环保投资优惠",
                    timeline: "2025年9月-2026年3月",
                    expectedSaving: 155,
                    investmentCost: 180,
                    milestone: "完成区域布局、环保设备投资",
                    riskLevel: "中"
                },
                {
                    stage: "第四阶段(2026年4月-2027年12月)",
                    policyType: "政策组合优化、新兴政策探索",
                    timeline: "2026年4月-2027年12月",
                    expectedSaving: 320,
                    investmentCost: 45,
                    milestone: "实现政策组合最优化、探索新政策机会",
                    riskLevel: "低"
                }
            ],
            detailedTimeline: [
                {
                    milestone: "研发费用归集制度完善",
                    description: "建立完善的研发费用归集和核算制度",
                    tasks: [
                        "制定研发费用归集管理办法",
                        "建立研发费用辅助账和核算体系",
                        "完善研发项目立项和管理流程",
                        "培训财务和研发人员"
                    ],
                    responsibleDepartment: "财务部、研发部",
                    duration: "2个月",
                    deadline: "2025年2月底",
                    budget: 8,
                    expectedSaving: 180
                },
                {
                    milestone: "高新技术企业认定材料准备",
                    description: "完成高新技术企业认定申报材料编制",
                    tasks: [
                        "申请核心技术相关专利和软件著作权",
                        "编制企业申报书和技术说明材料",
                        "准备专项审计报告和研发费用专项报告",
                        "整理高新技术产品收入明细和证明材料"
                    ],
                    responsibleDepartment: "技术部、财务部、法务部",
                    duration: "2.5个月",
                    deadline: "2025年4月中旬",
                    budget: 20,
                    expectedSaving: 0
                },
                {
                    milestone: "高新技术企业认定申报",
                    description: "正式提交高新技术企业认定申报",
                    tasks: [
                        "在认定管理系统提交申报材料",
                        "配合专家评审和现场检查",
                        "及时补充和完善申报材料",
                        "跟踪申报进展和结果"
                    ],
                    responsibleDepartment: "综合管理部",
                    duration: "3个月",
                    deadline: "2025年7月底",
                    budget: 10,
                    expectedSaving: 380
                },
                {
                    milestone: "软件企业认定完成",
                    description: "获得软件企业资质认定",
                    tasks: [
                        "完成软件产品登记和著作权申请",
                        "建立软件收入单独核算体系",
                        "准备软件企业认定申报材料",
                        "提交认定申请并跟踪进展"
                    ],
                    responsibleDepartment: "技术部、财务部",
                    duration: "4个月",
                    deadline: "2025年8月底",
                    budget: 15,
                    expectedSaving: 125
                },
                {
                    milestone: "区域政策布局启动",
                    description: "启动西部地区子公司设立",
                    tasks: [
                        "选择合适的西部地区设立地点",
                        "完成子公司注册和资质申请",
                        "转移部分业务到西部子公司",
                        "申请西部大开发税收优惠"
                    ],
                    responsibleDepartment: "战略发展部、法务部",
                    duration: "6个月",
                    deadline: "2026年2月底",
                    budget: 50,
                    expectedSaving: 95
                },
                {
                    milestone: "环保设备投资完成",
                    description: "完成环保设备投资和抵免申请",
                    tasks: [
                        "制定环保设备投资计划",
                        "采购和安装环保设备",
                        "申请环保设备投资抵免",
                        "建立环保管理制度"
                    ],
                    responsibleDepartment: "生产部、财务部",
                    duration: "8个月",
                    deadline: "2026年4月底",
                    budget: 300,
                    expectedSaving: 30
                },
                {
                    milestone: "技术转让业务开展",
                    description: "开展技术转让业务，享受所得税优惠",
                    tasks: [
                        "梳理和评估可转让技术资产",
                        "建立技术转让业务流程",
                        "寻找技术转让合作伙伴",
                        "实施技术转让并申请税收优惠"
                    ],
                    responsibleDepartment: "技术部、商务部",
                    duration: "6个月",
                    deadline: "2026年6月底",
                    budget: 12,
                    expectedSaving: 45
                },
                {
                    milestone: "政策体系优化完善",
                    description: "建立完善的政策管理和优化体系",
                    tasks: [
                        "建立政策跟踪和评估机制",
                        "完善政策合规管理制度",
                        "探索新的政策机会",
                        "持续优化政策组合效果"
                    ],
                    responsibleDepartment: "财务部、法务部",
                    duration: "持续进行",
                    deadline: "2027年12月底",
                    budget: 20,
                    expectedSaving: 65
                }
            ],
            resourceRequirements: {
                humanResources: [
                    "设立专门的政策管理团队，配备3-5名专业人员",
                    "聘请外部税务和法律顾问，提供专业咨询服务",
                    "加强内部相关人员培训，提升政策理解和执行能力",
                    "建立跨部门协调机制，确保政策实施的协同性"
                ],
                financialResources: [
                    "总体投入资金约285万元，分阶段投入",
                    "设立专项政策实施资金，确保资金及时到位",
                    "预留一定比例的风险资金，应对突发情况",
                    "建立投资回报跟踪机制，确保投入产出合理"
                ],
                technicalResources: [
                    "建立政策管理信息系统，实现政策跟踪和管理的信息化",
                    "完善财务核算系统，支持各项政策的财务核算要求",
                    "建立档案管理系统，确保政策相关资料的完整保存",
                    "建立风险预警系统，及时识别和应对政策风险"
                ]
            },
            successFactors: [
                "建立强有力的组织保障，确保政策实施的统一领导和协调",
                "完善内控制度建设，确保政策享受的合规性和可持续性",
                "加强专业能力建设，提升政策理解和执行的专业水平",
                "建立有效的激励机制，调动全员参与政策实施的积极性",
                "加强外部合作，借助专业机构的力量提升实施效果",
                "建立持续改进机制，不断优化政策实施的方法和效果"
            ],
            ongoingMonitoring: [
                "建立月度政策执行情况报告制度，及时掌握实施进展",
                "定期评估各项政策的享受条件维持情况",
                "建立政策变化的快速响应机制，及时调整实施策略",
                "加强政策享受效果的量化评估和持续优化",
                "建立政策风险预警机制，及时识别和应对各类风险",
                "定期开展政策合规性审查，确保政策享受的合法合规"
            ],
            optimizationMechanism: [
                "建立政策效果评估机制，定期评估政策实施效果",
                "建立政策组合优化机制，不断优化政策组合配置",
                "建立新政策发现机制，及时发现和利用新的政策机会",
                "建立最佳实践总结机制，不断完善政策实施方法",
                "建立外部对标机制，学习借鉴先进企业的经验做法",
                "建立持续改进机制，推动政策管理水平持续提升"
            ],
            investmentAnalysis: {
                totalCost: 285,
                totalSaving: 1140,
                roi: 400,
                paybackPeriod: 1.5
            }
        }
    };
};

// 导出政策分类枚举
export const PolicyCategories = {
    INNOVATION_DRIVEN: "创新驱动发展",
    INDUSTRIAL_UPGRADE: "产业结构升级",
    GREEN_DEVELOPMENT: "绿色发展",
    REGIONAL_POLICY: "区域性优惠",
    SPECIAL_POLICY: "专项优惠政策",
    SMALL_MICRO: "小微企业",
    EMPLOYMENT: "创业就业",
    TECH_INNOVATION: "科技创新"
};

// 导出风险等级枚举
export const RiskLevels = {
    LOW: "低",
    MEDIUM: "中",
    HIGH: "高"
};

// 导出政策适用性评估函数
export const assessPolicyApplicability = (companyInfo, policyType) => {
    // 根据企业信息和政策类型评估适用性
    const assessmentRules = {
        [PolicyCategories.INNOVATION_DRIVEN]: {
            rdRatio: parseFloat(companyInfo.rdRatio),
            industryMatch: companyInfo.industryCategory.includes("技术") ||
                companyInfo.industryCategory.includes("软件") ||
                companyInfo.industryCategory.includes("信息"),
            companySize: companyInfo.companySize
        },
        [PolicyCategories.REGIONAL_POLICY]: {
            location: companyInfo.registrationLocation,
            willingness: true // 企业是否愿意进行区域布局
        },
        [PolicyCategories.SMALL_MICRO]: {
            revenue: companyInfo.annualRevenue,
            employees: 285, // 从业人数
            assets: 4200 // 资产总额（万元）
        }
    };

    return assessmentRules[policyType] || {};
};

// 导出政策效果计算函数
export const calculatePolicyEffect = (baseData, policyConfig) => {
    const currentTax = baseData.revenue * baseData.currentTaxRate / 100;
    const optimizedTax = baseData.revenue * policyConfig.optimizedTaxRate / 100;
    const saving = currentTax - optimizedTax;
    const roi = (saving / policyConfig.implementationCost) * 100;

    return {
        currentTax,
        optimizedTax,
        saving,
        roi,
        paybackPeriod: policyConfig.implementationCost / saving
    };
};

// 导出报告生成配置
export const ReportConfig = {
    title: "政策利用筹划报告",
    version: "2.0",
    templateType: "comprehensive",
    supportedFormats: ["html", "pdf"],
    maxPolicies: 20,
    riskThresholds: {
        low: 8.0,
        medium: 6.0,
        high: 4.0
    }
};