// src/report/CreditAssessmentReport.js
export const generateCreditAssessmentReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>信贷评估分析报告</title>
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
            background: #10b981;
            color: white;
        }

        .btn-secondary {
            background: #6b7280;
            color: white;
        }

        .header {
            text-align: center;
            border-bottom: 4px solid #10b981;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            padding: 40px 30px 30px;
            border-radius: 8px;
            position: relative;
        }
        
        .header::before {
            content: "🛡️";
            position: absolute;
            top: 15px;
            left: 30px;
            font-size: 24px;
        }
        
        .header h1 {
            color: #047857;
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

        .credit-summary {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 2px solid #22c55e;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 40px;
            position: relative;
        }

        .credit-summary::before {
            content: "📊";
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 20px;
        }

        .credit-rating-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .rating-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-left: 5px solid;
            position: relative;
        }

        .rating-card.aaa {
            border-left-color: #059669;
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }

        .rating-card.aa {
            border-left-color: #0891b2;
            background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
        }

        .rating-card.a {
            border-left-color: #0ea5e9;
            background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%);
        }

        .rating-card.bbb {
            border-left-color: #eab308;
            background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
        }

        .rating-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .rating-card .score {
            font-size: 36px;
            font-weight: 700;
            margin: 10px 0;
        }

        .rating-card.aaa .score { color: #047857; }
        .rating-card.aa .score { color: #0e7490; }
        .rating-card.a .score { color: #0369a1; }
        .rating-card.bbb .score { color: #a16207; }

        .section {
            margin-bottom: 50px;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .section-header {
            background: linear-gradient(135deg, #10b981 0%, #047857 100%);
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

        .solvency-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .solvency-metric {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 25px;
            position: relative;
        }

        .solvency-metric::before {
            content: "📈";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 16px;
        }

        .solvency-metric h4 {
            color: #047857;
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

        .risk-alert {
            background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
            border-left: 5px solid #ef4444;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }

        .risk-alert::before {
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

        .security-strength {
            background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%);
            border-left: 5px solid #22c55e;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }

        .security-strength::before {
            position: absolute;
            left: -8px;
            top: 20px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 3px solid #22c55e;
            content: "";
        }

        .cash-flow-analysis {
            background: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .covenant-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
            border: 2px solid #f59e0b;
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }

        .covenant-box::before {
            content: "📋";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 18px;
        }

        .covenant-box h4 {
            color: #92400e;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 30px;
        }

        .stress-test {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border: 2px solid #6b7280;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }

        .collateral-analysis {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 2px solid #d97706;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .recommendation-box {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            border: 2px solid #10b981;
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
            color: #047857;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 30px;
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

        .status-indicator.safe { background: #10b981; }
        .status-indicator.caution { background: #f59e0b; }
        .status-indicator.warning { background: #ef4444; }

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
            .solvency-grid, .grid-2, .grid-3, .credit-rating-grid {
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
        <h1>信贷评估分析报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} 信用风险深度评估报告 · ${reportData.reportInfo.reportDate}</p>
    </div>

    <!-- 信用评级概览 -->
    <div class="credit-summary">
        <h3>🎯 信用评级概览</h3>
        <div class="credit-rating-grid">
            <div class="rating-card ${reportData.creditSummary.overallRating.toLowerCase()}">
                <h3>综合评级</h3>
                <div class="score">${reportData.creditSummary.overallRating}</div>
                <p>${reportData.creditSummary.ratingDescription}</p>
            </div>
            <div class="rating-card aa">
                <h3>建议额度</h3>
                <div class="score">¥${reportData.creditSummary.recommendedLimit}</div>
                <p>万元</p>
            </div>
            <div class="rating-card a">
                <h3>利率建议</h3>
                <div class="score">${reportData.creditSummary.recommendedRate}%</div>
                <p>年化利率</p>
            </div>
            <div class="rating-card bbb">
                <h3>违约概率</h3>
                <div class="score">${reportData.creditSummary.defaultProbability}%</div>
                <p>一年期PD</p>
            </div>
        </div>
        
        <div class="recommendation-box">
            <h4>信贷决策建议</h4>
            <p><strong>${reportData.creditSummary.recommendation}</strong></p>
            <p>${reportData.creditSummary.recommendationReason}</p>
        </div>
    </div>

    <!-- 偿债能力分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💪 偿债能力分析</h2>
        </div>
        <div class="section-content">
            <div class="solvency-grid">
                <div class="solvency-metric">
                    <h4>短期偿债能力</h4>
                    <div class="metric-item">
                        <span>流动比率</span>
                        <span class="metric-value">${reportData.solvency.shortTerm.currentRatio}</span>
                    </div>
                    <div class="metric-item">
                        <span>速动比率</span>
                        <span class="metric-value">${reportData.solvency.shortTerm.quickRatio}</span>
                    </div>
                    <div class="metric-item">
                        <span>现金比率</span>
                        <span class="metric-value">${reportData.solvency.shortTerm.cashRatio}</span>
                    </div>
                    <div class="metric-item">
                        <span>营运资金</span>
                        <span class="metric-value">¥${reportData.solvency.shortTerm.workingCapital}万</span>
                    </div>
                </div>

                <div class="solvency-metric">
                    <h4>长期偿债能力</h4>
                    <div class="metric-item">
                        <span>资产负债率</span>
                        <span class="metric-value">${reportData.solvency.longTerm.debtToAssetRatio}%</span>
                    </div>
                    <div class="metric-item">
                        <span>产权比率</span>
                        <span class="metric-value">${reportData.solvency.longTerm.debtToEquityRatio}</span>
                    </div>
                    <div class="metric-item">
                        <span>利息保障倍数</span>
                        <span class="metric-value">${reportData.solvency.longTerm.interestCoverageRatio}</span>
                    </div>
                    <div class="metric-item">
                        <span>EBITDA覆盖率</span>
                        <span class="metric-value">${reportData.solvency.longTerm.ebitdaCoverageRatio}</span>
                    </div>
                </div>

                <div class="solvency-metric">
                    <h4>现金流偿债</h4>
                    <div class="metric-item">
                        <span>经营现金流/负债</span>
                        <span class="metric-value">${reportData.solvency.cashFlow.operatingCashFlowToDebt}%</span>
                    </div>
                    <div class="metric-item">
                        <span>现金债务覆盖率</span>
                        <span class="metric-value">${reportData.solvency.cashFlow.cashDebtCoverageRatio}</span>
                    </div>
                    <div class="metric-item">
                        <span>自由现金流</span>
                        <span class="metric-value">¥${reportData.solvency.cashFlow.freeCashFlow}万</span>
                    </div>
                    <div class="metric-item">
                        <span>债务偿付能力</span>
                        <span class="metric-value">${reportData.solvency.cashFlow.debtServiceCoverageRatio}</span>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div>
                    <h4>🟢 偿债能力优势</h4>
                    ${reportData.solvency.strengths.map(strength => `
                        <div class="security-strength">
                            <h5>${strength.title}</h5>
                            <p>${strength.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div>
                    <h4>🔴 偿债能力风险</h4>
                    ${reportData.solvency.risks.map(risk => `
                        <div class="risk-alert">
                            <h5>${risk.title}</h5>
                            <p>${risk.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 现金流分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💧 现金流分析</h2>
        </div>
        <div class="section-content">
            <div class="cash-flow-analysis">
                <h4>现金流量结构分析</h4>
                <table>
                    <thead>
                        <tr>
                            <th>现金流类型</th>
                            <th>当期金额(万元)</th>
                            <th>上期金额(万元)</th>
                            <th>同比变化</th>
                            <th>占总流入比例</th>
                            <th>质量评价</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.cashFlowAnalysis.structure.map(item => `
                            <tr>
                                <td><strong>${item.type}</strong></td>
                                <td>¥${item.current}</td>
                                <td>¥${item.previous}</td>
                                <td style="color: ${item.change.startsWith('+') ? '#10b981' : '#ef4444'}">${item.change}</td>
                                <td>${item.percentage}%</td>
                                <td>
                                    <span class="status-indicator ${item.quality}"></span>
                                    ${item.qualityDescription}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid-2">
                <div class="cash-flow-analysis">
                    <h4>现金流预测（未来12个月）</h4>
                    ${reportData.cashFlowAnalysis.forecast.map((item, index) => `
                        <div class="metric-item">
                            <span>${item.period}</span>
                            <span class="metric-value" style="color: ${item.amount >= 0 ? '#10b981' : '#ef4444'}">
                                ¥${item.amount}万
                            </span>
                        </div>
                    `).join('')}
                </div>

                <div class="cash-flow-analysis">
                    <h4>现金流风险因素</h4>
                    <ul>
                        ${reportData.cashFlowAnalysis.riskFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 风险预警系统 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚠️ 风险预警系统</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                <div class="risk-alert">
                    <h4>高风险预警</h4>
                    <ul>
                        ${reportData.riskWarning.high.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="covenant-box">
                    <h4>中风险关注</h4>
                    <ul>
                        ${reportData.riskWarning.medium.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="security-strength">
                    <h4>低风险监控</h4>
                    <ul>
                        ${reportData.riskWarning.low.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="recommendation-box">
                <h4>风险缓释措施</h4>
                <ul>
                    ${reportData.riskWarning.mitigationMeasures.map(measure => `<li>${measure}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <!-- 压力测试 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🧪 压力测试分析</h2>
        </div>
        <div class="section-content">
            <div class="stress-test">
                <h4>压力测试情景设定</h4>
                <div class="grid-3">
                    ${reportData.stressTest.scenarios.map(scenario => `
                        <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                            <h5>${scenario.name}</h5>
                            <p style="font-size: 0.9em; color: #666;">${scenario.description}</p>
                            <div style="margin-top: 10px;">
                                <strong>结果：</strong><span style="color: ${scenario.result === '通过' ? '#10b981' : '#ef4444'}">${scenario.result}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>压力情景</th>
                        <th>收入下降幅度</th>
                        <th>成本上升幅度</th>
                        <th>利润影响</th>
                        <th>现金流影响</th>
                        <th>偿债能力</th>
                        <th>测试结果</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.stressTest.results.map(result => `
                        <tr>
                            <td><strong>${result.scenario}</strong></td>
                            <td>${result.revenueDecline}%</td>
                            <td>${result.costIncrease}%</td>
                            <td style="color: #ef4444">${result.profitImpact}%</td>
                            <td style="color: #ef4444">${result.cashFlowImpact}%</td>
                            <td style="color: ${result.solvencyStatus === '良好' ? '#10b981' : '#ef4444'}">${result.solvencyStatus}</td>
                            <td>
                                <span class="status-indicator ${result.testResult === '通过' ? 'safe' : 'warning'}"></span>
                                ${result.testResult}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>

    <!-- 抵押担保分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏠 抵押担保分析</h2>
        </div>
        <div class="section-content">
            <div class="collateral-analysis">
                <h4>抵押资产清单</h4>
                <table>
                    <thead>
                        <tr>
                            <th>抵押物类型</th>
                            <th>评估价值(万元)</th>
                            <th>抵押率</th>
                            <th>抵押价值(万元)</th>
                            <th>变现能力</th>
                            <th>风险等级</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.collateralAnalysis.assets.map(asset => `
                            <tr>
                                <td><strong>${asset.type}</strong></td>
                                <td>¥${asset.assessedValue}</td>
                                <td>${asset.collateralRatio}%</td>
                                <td>¥${asset.collateralValue}</td>
                                <td>${asset.liquidity}</td>
                                <td>
                                    <span class="status-indicator ${asset.riskLevel === '低' ? 'safe' : asset.riskLevel === '中' ? 'caution' : 'warning'}"></span>
                                    ${asset.riskLevel}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid-2">
                <div class="recommendation-box">
                    <h4>担保充足性分析</h4>
                    <ul>
                        ${reportData.collateralAnalysis.adequacyAnalysis.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="covenant-box">
                    <h4>担保风险提示</h4>
                    <ul>
                        ${reportData.collateralAnalysis.riskWarnings.map(warning => `<li>${warning}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 贷款条款建议 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📋 贷款条款建议</h2>
        </div>
        <div class="section-content">
            <div class="covenant-box">
                <h4>财务限制性条款</h4>
                <div class="grid-2">
                    <div>
                        <h5>关键财务指标要求</h5>
                        <ul>
                            ${reportData.loanCovenants.financialCovenants.map(covenant => `<li>${covenant}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h5>业务限制条款</h5>
                        <ul>
                            ${reportData.loanCovenants.businessRestrictions.map(restriction => `<li>${restriction}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div class="recommendation-box">
                    <h4>放款条件建议</h4>
                    <ul>
                        ${reportData.loanCovenants.disbursementConditions.map(condition => `<li>${condition}</li>`).join('')}
                    </ul>
                </div>

                <div class="recommendation-box">
                    <h4>监控要求</h4>
                    <ul>
                        ${reportData.loanCovenants.monitoringRequirements.map(requirement => `<li>${requirement}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>评估声明</strong></p>
        <p>本信贷评估报告基于企业提供的财务资料和尽职调查结果进行分析，评估结论仅供信贷决策参考。实际放贷应结合最新财务状况和市场环境。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 评估日期：${reportData.reportInfo.reportDate} | 👨‍💼 评估师：${reportData.reportInfo.analyst} | 📋 报告编号：${reportData.reportInfo.reportNumber}</p>
        <p>🏦 评估机构：${reportData.reportInfo.institution} | 📞 联系方式：${reportData.reportInfo.contact}</p>
    </div>
</body>
</html>
    `;
};

// 获取示例信贷评估报告数据
export const getCreditAssessmentReportData = () => {
    return {
        companyInfo: {
            name: "XX科技集团有限公司",
            creditCode: "91310000MA1234567X",
            establishDate: "2015年3月",
            registeredCapital: "5000万元",
            businessType: "软件开发"
        },
        reportInfo: {
            reportDate: "2025年1月31日",
            reportNumber: "CREDIT-20250131-001",
            analyst: "李信贷",
            institution: "XX银行信贷评估中心",
            contact: "credit@xxbank.com"
        },
        creditSummary: {
            overallRating: "AA",
            ratingDescription: "信用优良",
            recommendedLimit: "3000",
            recommendedRate: "5.8",
            defaultProbability: "0.8",
            recommendation: "建议批准信贷申请",
            recommendationReason: "企业财务状况良好，偿债能力强，现金流稳定，经营风险可控。建议给予3000万元信贷额度，年化利率5.8%，期限3年。"
        },
        solvency: {
            shortTerm: {
                currentRatio: "2.8",
                quickRatio: "2.0",
                cashRatio: "1.2",
                workingCapital: "4500"
            },
            longTerm: {
                debtToAssetRatio: "40.0",
                debtToEquityRatio: "0.67",
                interestCoverageRatio: "12.8",
                ebitdaCoverageRatio: "8.5"
            },
            cashFlow: {
                operatingCashFlowToDebt: "58.3",
                cashDebtCoverageRatio: "1.4",
                freeCashFlow: "2700",
                debtServiceCoverageRatio: "2.8"
            },
            strengths: [
                {
                    title: "流动性充足",
                    description: "流动比率2.8倍，远高于行业平均1.5倍，短期偿债能力强"
                },
                {
                    title: "现金流稳定",
                    description: "经营现金流连续三年为正，平均年增长率15%"
                },
                {
                    title: "利息保障充分",
                    description: "利息保障倍数12.8倍，息税前利润覆盖利息支出能力强"
                }
            ],
            risks: [
                {
                    title: "负债水平偏高",
                    description: "资产负债率40%，高于行业平均35%，需关注新增负债控制"
                },
                {
                    title: "应收账款占比大",
                    description: "应收账款占总资产12%，存在一定的坏账风险"
                }
            ]
        },
        cashFlowAnalysis: {
            structure: [
                {
                    type: "经营活动现金流",
                    current: "3500",
                    previous: "3200",
                    change: "+9.4%",
                    percentage: "85",
                    quality: "safe",
                    qualityDescription: "优秀"
                },
                {
                    type: "投资活动现金流",
                    current: "-800",
                    previous: "-600",
                    change: "-33.3%",
                    percentage: "15",
                    quality: "caution",
                    qualityDescription: "正常"
                },
                {
                    type: "筹资活动现金流",
                    current: "-500",
                    previous: "200",
                    change: "-350.0%",
                    percentage: "0",
                    quality: "safe",
                    qualityDescription: "良好"
                }
            ],
            forecast: [
                { period: "第1季度", amount: 800 },
                { period: "第2季度", amount: 900 },
                { period: "第3季度", amount: 1100 },
                { period: "第4季度", amount: 1200 }
            ],
            riskFactors: [
                "应收账款回收周期延长的风险",
                "原材料价格上涨影响现金流出",
                "季节性销售波动影响现金流入",
                "资本性支出增加对现金流的影响"
            ]
        },
        riskWarning: {
            high: [
                "客户集中度风险：前五大客户占收入65%",
                "汇率风险：外币收入占比30%"
            ],
            medium: [
                "行业竞争风险：市场竞争加剧",
                "技术更新风险：需持续研发投入",
                "人员流失风险：核心技术人员依赖性强"
            ],
            low: [
                "政策风险：行业政策相对稳定",
                "环保风险：环保要求不断提高",
                "利率风险：市场利率波动影响"
            ],
            mitigationMeasures: [
                "建议企业分散客户结构，减少客户集中度",
                "加强外汇套期保值，管控汇率风险",
                "建立核心员工激励机制，降低人员流失风险",
                "设置浮动利率，转移利率风险"
            ]
        },
        stressTest: {
            scenarios: [
                {
                    name: "轻度压力",
                    description: "收入下降10%，成本上升5%",
                    result: "通过"
                },
                {
                    name: "中度压力",
                    description: "收入下降20%，成本上升10%",
                    result: "通过"
                },
                {
                    name: "重度压力",
                    description: "收入下降30%，成本上升15%",
                    result: "关注"
                }
            ],
            results: [
                {
                    scenario: "基准情景",
                    revenueDecline: "0",
                    costIncrease: "0",
                    profitImpact: "0",
                    cashFlowImpact: "0",
                    solvencyStatus: "良好",
                    testResult: "通过"
                },
                {
                    scenario: "轻度压力",
                    revenueDecline: "10",
                    costIncrease: "5",
                    profitImpact: "-25",
                    cashFlowImpact: "-15",
                    solvencyStatus: "良好",
                    testResult: "通过"
                },
                {
                    scenario: "中度压力",
                    revenueDecline: "20",
                    costIncrease: "10",
                    profitImpact: "-45",
                    cashFlowImpact: "-30",
                    solvencyStatus: "尚可",
                    testResult: "通过"
                },
                {
                    scenario: "重度压力",
                    revenueDecline: "30",
                    costIncrease: "15",
                    profitImpact: "-65",
                    cashFlowImpact: "-50",
                    solvencyStatus: "较弱",
                    testResult: "关注"
                }
            ]
        },
        collateralAnalysis: {
            assets: [
                {
                    type: "办公楼房产",
                    assessedValue: "2800",
                    collateralRatio: "70",
                    collateralValue: "1960",
                    liquidity: "较好",
                    riskLevel: "低"
                },
                {
                    type: "生产设备",
                    assessedValue: "1200",
                    collateralRatio: "50",
                    collateralValue: "600",
                    liquidity: "一般",
                    riskLevel: "中"
                },
                {
                    type: "应收账款",
                    assessedValue: "1800",
                    collateralRatio: "60",
                    collateralValue: "1080",
                    liquidity: "较差",
                    riskLevel: "中"
                }
            ],
            adequacyAnalysis: [
                "抵押物总价值5800万元，抵押价值3640万元",
                "抵押覆盖率121%，超过建议信贷额度",
                "房产抵押物质量较高，变现能力强",
                "设备抵押物需关注折旧和技术更新风险"
            ],
            riskWarnings: [
                "应收账款质量需要持续监控",
                "生产设备存在技术淘汰风险",
                "房产市场价格波动风险",
                "抵押手续需要及时办理完备"
            ]
        },
        loanCovenants: {
            financialCovenants: [
                "资产负债率不得超过50%",
                "流动比率不得低于1.5倍",
                "利息保障倍数不得低于3倍",
                "净资产不得低于8000万元"
            ],
            businessRestrictions: [
                "未经银行同意不得对外担保超过净资产20%",
                "不得进行重大资产重组或股权转让",
                "不得改变主营业务性质",
                "不得进行高风险投资活动"
            ],
            disbursementConditions: [
                "提供合规的抵押担保手续",
                "开立贷款专户用于贷款发放和归还",
                "提供董事会决议和股东会决议",
                "购买贷款保险或提供其他增信措施"
            ],
            monitoringRequirements: [
                "按季度提交财务报表和经营情况报告",
                "每半年进行一次现场检查",
                "重大事项及时报告义务",
                "配合银行开展贷后管理工作"
            ]
        }
    };
};