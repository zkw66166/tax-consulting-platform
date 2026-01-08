// src/report/MergerDueDiligenceReport.js
export const generateMergerDueDiligenceReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>并购尽调分析报告</title>
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

        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-primary {
            background: #f97316;
            color: white;
        }

        .btn-secondary {
            background: #6b7280;
            color: white;
        }

        .header {
            text-align: center;
            border-bottom: 4px solid #f97316;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
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
            color: #c2410c;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .header .subtitle {
            color: #374151;
            font-size: 16px;
            font-weight: 500;
        }

        .executive-summary {
            background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 40px;
            position: relative;
        }

        .executive-summary::before {
            content: "📋";
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 20px;
        }

        .dd-assessment-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .assessment-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-left: 5px solid;
            position: relative;
        }

        .assessment-card.high {
            border-left-color: #059669;
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }

        .assessment-card.medium {
            border-left-color: #0891b2;
            background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
        }

        .assessment-card.low {
            border-left-color: #d97706;
            background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
        }

        .assessment-card.risk {
            border-left-color: #dc2626;
            background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
        }

        .assessment-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .assessment-card .score {
            font-size: 36px;
            font-weight: 700;
            margin: 10px 0;
        }

        .assessment-card.high .score { color: #047857; }
        .assessment-card.medium .score { color: #0e7490; }
        .assessment-card.low .score { color: #b45309; }
        .assessment-card.risk .score { color: #b91c1c; }

        .section {
            margin-bottom: 50px;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .section-header {
            background: linear-gradient(135deg, #f97316 0%, #c2410c 100%);
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

        .financial-quality-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .quality-metric {
            background: linear-gradient(135deg, #ffffff 0%, #fff7ed 100%);
            border: 2px solid #fed7aa;
            border-radius: 12px;
            padding: 25px;
            position: relative;
        }

        .quality-metric::before {
            content: "🔬";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 16px;
        }

        .quality-metric h4 {
            color: #c2410c;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e5e7eb;
        }

        .metric-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px dotted #d1d5db;
        }

        .metric-item:last-child {
            border-bottom: none;
        }

        .metric-value {
            font-weight: 600;
            color: #1f2937;
        }

        .red-flag {
            background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
            border-left: 5px solid #ef4444;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }

        .red-flag::before {
            position: absolute;
            left: -8px;
            top: 20px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 3px solid #ef4444;
            content: "";
        }

        .positive-finding {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            border-left: 5px solid #10b981;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }

        .positive-finding::before {
            position: absolute;
            left: -8px;
            top: 20px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 3px solid #10b981;
            content: "";
        }

        .valuation-analysis {
            background: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .synergy-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px solid #3b82f6;
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }

        .synergy-box::before {
            content: "🤝";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 18px;
        }

        .synergy-box h4 {
            color: #1e40af;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 30px;
        }

        .integration-risk {
            background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }

        .contingent-liability {
            background: linear-gradient(135deg, #fecaca 0%, #f87171 100%);
            border: 2px solid #ef4444;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .recommendation-box {
            background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
            border: 2px solid #f97316;
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }

        .recommendation-box::before {
            content: "💡";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 18px;
        }

        .recommendation-box h4 {
            color: #c2410c;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 30px;
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
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: white;
            padding: 15px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
        }

        td {
            border-bottom: 1px solid #e5e7eb;
            padding: 12px 15px;
            text-align: center;
        }

        tr:hover {
            background: #f9fafb;
        }

        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
            vertical-align: middle;
        }

        .status-indicator.verified { background: #10b981; }
        .status-indicator.caution { background: #f59e0b; }
        .status-indicator.concern { background: #ef4444; }

        .footer {
            border-top: 3px solid #cbd5e1;
            padding-top: 25px;
            margin-top: 40px;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
            background: #f8fafc;
            padding: 25px;
            border-radius: 8px;
        }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }

        @media print {
            body { margin: 0; padding: 20px; font-size: 12px; }
            .print-controls { display: none; }
            .section { page-break-inside: avoid; margin-bottom: 30px; }
        }

        @media (max-width: 768px) {
            .financial-quality-grid, .grid-2, .grid-3, .dd-assessment-grid {
                grid-template-columns: 1fr;
            }
            body { padding: 15px; }
            .header h1 { font-size: 24px; }
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
        <h1>并购尽调分析报告</h1>
        <p class="subtitle">${reportData.targetCompany.name} 财务与商业尽职调查报告 · ${reportData.reportInfo.reportDate}</p>
    </div>

    <!-- 执行摘要 -->
    <div class="executive-summary">
        <h3>📋 尽调执行摘要</h3>
        <div class="dd-assessment-grid">
            <div class="assessment-card ${reportData.dueDiligenceSummary.financialQuality.level}">
                <h3>财务质量</h3>
                <div class="score">${reportData.dueDiligenceSummary.financialQuality.score}</div>
                <p>${reportData.dueDiligenceSummary.financialQuality.description}</p>
            </div>
            <div class="assessment-card ${reportData.dueDiligenceSummary.businessValue.level}">
                <h3>商业价值</h3>
                <div class="score">¥${reportData.dueDiligenceSummary.businessValue.value}亿</div>
                <p>${reportData.dueDiligenceSummary.businessValue.description}</p>
            </div>
            <div class="assessment-card ${reportData.dueDiligenceSummary.integrationRisk.level}">
                <h3>整合风险</h3>
                <div class="score">${reportData.dueDiligenceSummary.integrationRisk.score}</div>
                <p>${reportData.dueDiligenceSummary.integrationRisk.description}</p>
            </div>
            <div class="assessment-card ${reportData.dueDiligenceSummary.overallRecommendation.level}">
                <h3>交易建议</h3>
                <div class="score">${reportData.dueDiligenceSummary.overallRecommendation.rating}</div>
                <p>${reportData.dueDiligenceSummary.overallRecommendation.description}</p>
            </div>
        </div>
        
        <div class="recommendation-box">
            <h4>并购建议</h4>
            <p><strong>${reportData.dueDiligenceSummary.recommendation}</strong></p>
            <p>${reportData.dueDiligenceSummary.recommendationReason}</p>
        </div>
    </div>

    <!-- 财务质量分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🔬 财务质量分析</h2>
        </div>
        <div class="section-content">
            <div class="financial-quality-grid">
                <div class="quality-metric">
                    <h4>收入质量</h4>
                    <div class="metric-item">
                        <span>收入确认政策</span>
                        <span class="metric-value">${reportData.financialQuality.revenue.recognitionPolicy}</span>
                    </div>
                    <div class="metric-item">
                        <span>收入增长可持续性</span>
                        <span class="metric-value">${reportData.financialQuality.revenue.sustainability}</span>
                    </div>
                    <div class="metric-item">
                        <span>客户集中度</span>
                        <span class="metric-value">${reportData.financialQuality.revenue.customerConcentration}%</span>
                    </div>
                    <div class="metric-item">
                        <span>收入现金转化率</span>
                        <span class="metric-value">${reportData.financialQuality.revenue.cashConversion}%</span>
                    </div>
                </div>

                <div class="quality-metric">
                    <h4>盈利质量</h4>
                    <div class="metric-item">
                        <span>核心业务利润率</span>
                        <span class="metric-value">${reportData.financialQuality.profitability.coreMargin}%</span>
                    </div>
                    <div class="metric-item">
                        <span>EBITDA质量</span>
                        <span class="metric-value">${reportData.financialQuality.profitability.ebitdaQuality}</span>
                    </div>
                    <div class="metric-item">
                        <span>一次性项目影响</span>
                        <span class="metric-value">¥${reportData.financialQuality.profitability.oneTimeItems}万</span>
                    </div>
                    <div class="metric-item">
                        <span>调整后净利润</span>
                        <span class="metric-value">¥${reportData.financialQuality.profitability.adjustedProfit}万</span>
                    </div>
                </div>

                <div class="quality-metric">
                    <h4>资产质量</h4>
                    <div class="metric-item">
                        <span>资产减值风险</span>
                        <span class="metric-value">${reportData.financialQuality.assets.impairmentRisk}</span>
                    </div>
                    <div class="metric-item">
                        <span>应收账款质量</span>
                        <span class="metric-value">${reportData.financialQuality.assets.receivablesQuality}</span>
                    </div>
                    <div class="metric-item">
                        <span>存货周转率</span>
                        <span class="metric-value">${reportData.financialQuality.assets.inventoryTurnover}</span>
                    </div>
                    <div class="metric-item">
                        <span>固定资产利用率</span>
                        <span class="metric-value">${reportData.financialQuality.assets.assetUtilization}%</span>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div>
                    <h4>🟢 财务优势</h4>
                    ${reportData.financialQuality.strengths.map(strength => `
                        <div class="positive-finding">
                            <h5>${strength.title}</h5>
                            <p>${strength.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div>
                    <h4>🔴 风险提示</h4>
                    ${reportData.financialQuality.risks.map(risk => `
                        <div class="red-flag">
                            <h5>${risk.title}</h5>
                            <p>${risk.description}</p>
                            <div style="margin-top: 10px; font-size: 0.9em; color: #991b1b;">
                                <strong>风险等级：</strong>${risk.riskLevel} | <strong>影响：</strong>${risk.impact}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 或有负债分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚠️ 或有负债与隐性风险</h2>
        </div>
        <div class="section-content">
            <div class="contingent-liability">
                <h4>或有负债清单</h4>
                <table>
                    <thead>
                        <tr>
                            <th>类型</th>
                            <th>描述</th>
                            <th>金额范围(万元)</th>
                            <th>发生概率</th>
                            <th>预期损失(万元)</th>
                            <th>风险等级</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.contingentLiabilities.items.map(item => `
                            <tr>
                                <td><strong>${item.type}</strong></td>
                                <td>${item.description}</td>
                                <td>¥${item.amountRange}</td>
                                <td>${item.probability}%</td>
                                <td>¥${item.expectedLoss}</td>
                                <td>
                                    <span class="status-indicator ${item.riskLevel === '高' ? 'concern' : item.riskLevel === '中' ? 'caution' : 'verified'}"></span>
                                    ${item.riskLevel}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid-2">
                <div class="red-flag">
                    <h4>重大隐性风险</h4>
                    <ul>
                        ${reportData.contingentLiabilities.hiddenRisks.map(risk => `<li>${risk}</li>`).join('')}
                    </ul>
                </div>

                <div class="recommendation-box">
                    <h4>风险缓释建议</h4>
                    <ul>
                        ${reportData.contingentLiabilities.mitigationSuggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 估值分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💰 估值分析与定价建议</h2>
        </div>
        <div class="section-content">
            <div class="valuation-analysis">
                <h4>多重估值方法</h4>
                <table>
                    <thead>
                        <tr>
                            <th>估值方法</th>
                            <th>调整前估值(亿元)</th>
                            <th>主要调整项</th>
                            <th>调整金额(万元)</th>
                            <th>调整后估值(亿元)</th>
                            <th>权重</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.valuation.methods.map(method => `
                            <tr>
                                <td><strong>${method.name}</strong></td>
                                <td>¥${method.baseValue}</td>
                                <td>${method.adjustments}</td>
                                <td style="color: ${method.adjustmentAmount.startsWith('-') ? '#ef4444' : '#10b981'}">${method.adjustmentAmount}</td>
                                <td>¥${method.adjustedValue}</td>
                                <td>${method.weight}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid-2">
                <div class="valuation-analysis">
                    <h4>估值调整说明</h4>
                    <ul>
                        ${reportData.valuation.adjustmentExplanations.map(explanation => `<li>${explanation}</li>`).join('')}
                    </ul>
                </div>

                <div class="recommendation-box">
                    <h4>定价建议</h4>
                    <div class="metric-item">
                        <span>建议估值区间：</span>
                        <span class="metric-value">¥${reportData.valuation.recommendedRange}</span>
                    </div>
                    <div class="metric-item">
                        <span>目标价格：</span>
                        <span class="metric-value">¥${reportData.valuation.targetPrice}亿</span>
                    </div>
                    <div class="metric-item">
                        <span>安全边际：</span>
                        <span class="metric-value">${reportData.valuation.safetyMargin}%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 协同效应分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🤝 协同效应分析</h2>
        </div>
        <div class="section-content">
            <div class="synergy-box">
                <h4>协同效应预测</h4>
                <div class="grid-3">
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <h5>收入协同</h5>
                        <div style="font-size: 1.5em; font-weight: bold; color: #1e40af;">¥${reportData.synergies.revenue.amount}万</div>
                        <p style="font-size: 0.9em; color: #666;">${reportData.synergies.revenue.description}</p>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <h5>成本协同</h5>
                        <div style="font-size: 1.5em; font-weight: bold; color: #1e40af;">¥${reportData.synergies.cost.amount}万</div>
                        <p style="font-size: 0.9em; color: #666;">${reportData.synergies.cost.description}</p>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <h5>财务协同</h5>
                        <div style="font-size: 1.5em; font-weight: bold; color: #1e40af;">¥${reportData.synergies.financial.amount}万</div>
                        <p style="font-size: 0.9em; color: #666;">${reportData.synergies.financial.description}</p>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div class="synergy-box">
                    <h4>协同实现路径</h4>
                    <ul>
                        ${reportData.synergies.realizationPath.map(path => `<li>${path}</li>`).join('')}
                    </ul>
                </div>

                <div class="integration-risk">
                    <h4>实现风险评估</h4>
                    <ul>
                        ${reportData.synergies.realizationRisks.map(risk => `<li>${risk}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 整合风险分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🔄 整合风险分析</h2>
        </div>
        <div class="section-content">
            <div class="integration-risk">
                <h4>整合风险矩阵</h4>
                <table>
                    <thead>
                        <tr>
                            <th>风险类别</th>
                            <th>具体风险</th>
                            <th>影响程度</th>
                            <th>发生概率</th>
                            <th>风险等级</th>
                            <th>缓释措施</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.integrationRisks.risks.map(risk => `
                            <tr>
                                <td><strong>${risk.category}</strong></td>
                                <td>${risk.description}</td>
                                <td>${risk.impact}</td>
                                <td>${risk.probability}%</td>
                                <td>
                                    <span class="status-indicator ${risk.level === '高' ? 'concern' : risk.level === '中' ? 'caution' : 'verified'}"></span>
                                    ${risk.level}
                                </td>
                                <td>${risk.mitigation}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid-2">
                <div class="recommendation-box">
                    <h4>整合成功关键因素</h4>
                    <ul>
                        ${reportData.integrationRisks.successFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>

                <div class="integration-risk">
                    <h4>整合时间表建议</h4>
                    ${reportData.integrationRisks.timeline.map(item => `
                        <div class="timeline-item">
                            <strong>${item.phase}：</strong>${item.description}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 交易建议 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📈 交易结构与建议</h2>
        </div>
        <div class="section-content">
            <div class="recommendation-box">
                <h4>交易结构建议</h4>
                <div class="grid-2">
                    <div>
                        <h5>支付方式</h5>
                        <ul>
                            ${reportData.transactionStructure.paymentStructure.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h5>条件安排</h5>
                        <ul>
                            ${reportData.transactionStructure.conditions.map(condition => `<li>${condition}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div class="positive-finding">
                    <h4>交易亮点</h4>
                    <ul>
                        ${reportData.transactionStructure.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>

                <div class="red-flag">
                    <h4>关键风险</h4>
                    <ul>
                        ${reportData.transactionStructure.keyRisks.map(risk => `<li>${risk}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="recommendation-box">
                <h4>最终建议</h4>
                <p><strong>尽调结论：</strong>${reportData.transactionStructure.finalRecommendation}</p>
                <p><strong>建议行动：</strong>${reportData.transactionStructure.recommendedAction}</p>
                <p><strong>关键条件：</strong>${reportData.transactionStructure.keyConditions}</p>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>尽调声明</strong></p>
        <p>本并购尽职调查报告基于目标公司提供的资料和实地调研进行分析，调查结论仅供并购决策参考。建议在签署最终协议前进行补充尽调。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 尽调日期：${reportData.reportInfo.reportDate} | 🔍 项目负责人：${reportData.reportInfo.projectManager} | 📋 报告编号：${reportData.reportInfo.reportNumber}</p>
        <p>🏢 尽调机构：${reportData.reportInfo.institution} | 📞 联系方式：${reportData.reportInfo.contact}</p>
    </div>
</body>
</html>
    `;
};

// 获取示例并购尽调报告数据
export const getMergerDueDiligenceReportData = () => {
    return {
        targetCompany: {
            name: "YY智能科技有限公司",
            industry: "人工智能",
            establishDate: "2018年5月",
            registeredCapital: "3000万元",
            employees: 85
        },
        reportInfo: {
            reportDate: "2025年1月31日",
            reportNumber: "DD-20250131-001",
            projectManager: "陈尽调",
            institution: "XX并购咨询有限公司",
            contact: "ma@xxdd.com"
        },
        dueDiligenceSummary: {
            financialQuality: {
                score: "B+",
                level: "medium",
                description: "质量良好"
            },
            businessValue: {
                value: "2.8",
                level: "medium",
                description: "估值合理"
            },
            integrationRisk: {
                score: "中",
                level: "low",
                description: "风险可控"
            },
            overallRecommendation: {
                rating: "B",
                level: "medium",
                description: "建议收购"
            },
            recommendation: "建议以2.5-2.8亿元价格收购，需关注技术人员留任和客户关系维护",
            recommendationReason: "目标公司技术实力强，市场前景良好，财务状况健康，与收购方业务协同性强。建议通过股权收购方式进行，重点关注核心团队激励和业务整合。"
        },
        financialQuality: {
            revenue: {
                recognitionPolicy: "合规",
                sustainability: "良好",
                customerConcentration: "35",
                cashConversion: "92"
            },
            profitability: {
                coreMargin: "28.5",
                ebitdaQuality: "高质量",
                oneTimeItems: "180",
                adjustedProfit: "2420"
            },
            assets: {
                impairmentRisk: "较低",
                receivablesQuality: "良好",
                inventoryTurnover: "6.2",
                assetUtilization: "78"
            },
            strengths: [
                {
                    title: "收入增长稳定",
                    description: "近三年收入复合增长率35%，主要客户续约率95%以上"
                },
                {
                    title: "现金流质量高",
                    description: "经营现金流与净利润匹配度92%，应收账款回收及时"
                },
                {
                    title: "资产负债结构健康",
                    description: "资产负债率32%，无重大或有负债，资产质量良好"
                }
            ],
            risks: [
                {
                    title: "客户集中度偏高",
                    description: "前五大客户占收入65%，存在客户依赖风险",
                    riskLevel: "中",
                    impact: "影响收入稳定性"
                },
                {
                    title: "应收账款账龄延长",
                    description: "6个月以上应收账款占比上升至15%",
                    riskLevel: "中",
                    impact: "影响现金流"
                }
            ]
        },
        contingentLiabilities: {
            items: [
                {
                    type: "诉讼纠纷",
                    description: "专利侵权诉讼1起",
                    amountRange: "50-150",
                    probability: "30",
                    expectedLoss: "45",
                    riskLevel: "中"
                },
                {
                    type: "税务风险",
                    description: "研发费用加计扣除合规性",
                    amountRange: "20-80",
                    probability: "20",
                    expectedLoss: "20",
                    riskLevel: "低"
                },
                {
                    type: "员工赔偿",
                    description: "劳动争议纠纷2起",
                    amountRange: "10-30",
                    probability: "50",
                    expectedLoss: "20",
                    riskLevel: "低"
                },
                {
                    type: "环保责任",
                    description: "无重大环保问题",
                    amountRange: "0-10",
                    probability: "10",
                    expectedLoss: "1",
                    riskLevel: "低"
                }
            ],
            hiddenRisks: [
                "核心技术人员离职风险，涉及关键技术传承",
                "主要供应商依赖风险，替代成本较高",
                "知识产权保护不完善，存在技术泄露风险",
                "客户合同条款对公司不利，利润空间受限"
            ],
            mitigationSuggestions: [
                "设立核心员工股权激励计划，降低离职风险",
                "建立多元化供应商体系，减少依赖风险",
                "完善知识产权保护制度，加强技术保密",
                "重新谈判客户合同，改善商业条款"
            ]
        },
        valuation: {
            methods: [
                {
                    name: "DCF估值法",
                    baseValue: "3.2",
                    adjustments: "现金流调整",
                    adjustmentAmount: "-3000",
                    adjustedValue: "2.9",
                    weight: "40"
                },
                {
                    name: "市场倍数法",
                    baseValue: "2.8",
                    adjustments: "流动性折扣",
                    adjustmentAmount: "-1500",
                    adjustedValue: "2.65",
                    weight: "35"
                },
                {
                    name: "净资产法",
                    baseValue: "1.8",
                    adjustments: "无形资产增值",
                    adjustmentAmount: "+8000",
                    adjustedValue: "2.6",
                    weight: "25"
                }
            ],
            adjustmentExplanations: [
                "DCF模型考虑了未来5年现金流预测和永续增长",
                "市场倍数参考可比公司P/E和P/B倍数",
                "净资产法重点评估技术资产和人力资本价值",
                "流动性折扣考虑非上市公司估值调整",
                "综合加权平均得出合理估值区间"
            ],
            recommendedRange: "2.5-2.8亿",
            targetPrice: "2.65",
            safetyMargin: "15"
        },
        synergies: {
            revenue: {
                amount: "1200",
                description: "产品线互补，渠道共享"
            },
            cost: {
                amount: "800",
                description: "管理费用合并，采购规模效应"
            },
            financial: {
                amount: "300",
                description: "融资成本降低，税务优化"
            },
            realizationPath: [
                "第一年：完成业务整合，实现30%协同效应",
                "第二年：渠道共享见效，实现60%协同效应",
                "第三年：完全整合完成，实现100%协同效应",
                "建立统一的管理体系和考核机制",
                "保留目标公司核心团队和企业文化"
            ],
            realizationRisks: [
                "核心团队离职导致技术流失",
                "客户关系维护不当影响收入协同",
                "企业文化冲突影响整合进度",
                "监管政策变化影响业务发展",
                "市场竞争加剧影响协同效应实现"
            ]
        },
        integrationRisks: {
            risks: [
                {
                    category: "人员整合",
                    description: "技术团队文化差异",
                    impact: "较大",
                    probability: "60",
                    level: "中",
                    mitigation: "建立过渡期激励机制"
                },
                {
                    category: "客户关系",
                    description: "收购后客户流失",
                    impact: "重大",
                    probability: "30",
                    level: "中",
                    mitigation: "提前沟通，签署客户保留协议"
                },
                {
                    category: "技术整合",
                    description: "技术平台不兼容",
                    impact: "中等",
                    probability: "40",
                    level: "中",
                    mitigation: "制定详细技术整合方案"
                },
                {
                    category: "监管合规",
                    description: "行业监管政策变化",
                    impact: "中等",
                    probability: "25",
                    level: "低",
                    mitigation: "密切跟踪政策动向"
                }
            ],
            successFactors: [
                "获得目标公司管理层和核心员工的支持",
                "制定详细的整合计划和时间表",
                "建立有效的沟通机制和反馈渠道",
                "保持业务连续性，避免客户流失",
                "合理设计激励机制，留住关键人才"
            ],
            timeline: [
                {
                    phase: "交割前30天",
                    description: "完成整合团队组建和详细计划制定"
                },
                {
                    phase: "交割后30天",
                    description: "完成人员安置和业务对接"
                },
                {
                    phase: "交割后90天",
                    description: "完成核心系统整合和流程统一"
                },
                {
                    phase: "交割后180天",
                    description: "完成组织架构调整和企业文化融合"
                },
                {
                    phase: "交割后12个月",
                    description: "完成全面整合，实现预期协同效应"
                }
            ]
        },
        transactionStructure: {
            paymentStructure: [
                "现金支付70%，约1.85亿元",
                "股权支付30%，约8000万元",
                "设置业绩对赌条款，保障协同效应实现",
                "核心团队股权激励，锁定期3年",
                "分期付款安排，降低交易风险"
            ],
            conditions: [
                "目标公司主要客户续约确认",
                "核心技术团队签署竞业禁止协议",
                "完成详细法律和税务尽调",
                "获得必要的监管批准",
                "目标公司财务数据真实性确认"
            ],
            highlights: [
                "技术实力强，拥有多项核心专利",
                "客户质量高，包括多家知名企业",
                "团队稳定，核心人员平均任职5年以上",
                "盈利能力强，毛利率远超行业平均",
                "市场前景广阔，AI技术应用潜力大"
            ],
            keyRisks: [
                "技术更新换代风险，需持续研发投入",
                "人才竞争激烈，关键人员保留困难",
                "客户集中度高，大客户流失风险",
                "监管政策不确定性，影响业务发展",
                "整合过程中的执行风险"
            ],
            finalRecommendation: "建议收购，但需要谨慎定价并设置保护条款",
            recommendedAction: "以2.65亿元为目标价格启动正式谈判，重点关注团队激励和客户保留",
            keyConditions: "核心团队签署3年服务协议，主要客户续约确认，设置18个月业绩对赌期"
        }
    };
};