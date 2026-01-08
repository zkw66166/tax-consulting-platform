// src/report/InvestmentAnalysisReport.js
export const generateInvestmentAnalysisReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>投资决策分析报告</title>
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
            background: #3b82f6;
            color: white;
        }

        .btn-secondary {
            background: #6b7280;
            color: white;
        }

        .header {
            text-align: center;
            border-bottom: 4px solid #3b82f6;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            padding: 40px 30px 30px;
            border-radius: 8px;
            position: relative;
        }
        
        .header::before {
            content: "📈";
            position: absolute;
            top: 15px;
            left: 30px;
            font-size: 24px;
        }
        
        .header h1 {
            color: #1d4ed8;
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
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px solid #cbd5e1;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 40px;
            position: relative;
        }

        .executive-summary::before {
            content: "⭐";
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 20px;
        }

        .investment-score-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .score-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-left: 5px solid;
            position: relative;
        }

        .score-card.excellent {
            border-left-color: #10b981;
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }

        .score-card.good {
            border-left-color: #3b82f6;
            background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%);
        }

        .score-card.fair {
            border-left-color: #f59e0b;
            background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
        }

        .score-card.poor {
            border-left-color: #ef4444;
            background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
        }

        .score-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .score-card .score {
            font-size: 36px;
            font-weight: 700;
            margin: 10px 0;
        }

        .score-card.excellent .score { color: #059669; }
        .score-card.good .score { color: #2563eb; }
        .score-card.fair .score { color: #d97706; }
        .score-card.poor .score { color: #dc2626; }

        .section {
            margin-bottom: 50px;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .section-header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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

        .valuation-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .valuation-method {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 25px;
            position: relative;
        }

        .valuation-method::before {
            content: "💰";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 16px;
        }

        .valuation-method h4 {
            color: #1e40af;
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

        .risk-factor {
            background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
            border-left: 5px solid #ef4444;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }

        .risk-factor::before {
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

        .opportunity-factor {
            background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%);
            border-left: 5px solid #10b981;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }

        .opportunity-factor::before {
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

        .peer-comparison {
            background: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .recommendation-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px solid #3b82f6;
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
            color: #1e40af;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 30px;
        }

        .dcf-model {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border: 2px solid #6b7280;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }

        .investment-timeline {
            background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
            border: 2px solid #f59e0b;
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

        .esg-analysis {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 2px solid #22c55e;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }

        .esg-analysis::before {
            content: "🌱";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 18px;
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

        .status-indicator.positive { background: #10b981; }
        .status-indicator.neutral { background: #f59e0b; }
        .status-indicator.negative { background: #ef4444; }

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
            .valuation-grid, .grid-2, .grid-3, .investment-score-grid {
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
        <h1>投资决策分析报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} 投资价值深度分析报告 · ${reportData.reportInfo.reportDate}</p>
    </div>

    <!-- 执行摘要 -->
    <div class="executive-summary">
        <h3>📊 投资执行摘要</h3>
        <div class="investment-score-grid">
            <div class="score-card ${reportData.investmentSummary.overallRating.toLowerCase()}">
                <h3>综合评级</h3>
                <div class="score">${reportData.investmentSummary.overallScore}</div>
                <p>${reportData.investmentSummary.overallRating}</p>
            </div>
            <div class="score-card good">
                <h3>价值评估</h3>
                <div class="score">¥${reportData.investmentSummary.targetPrice}</div>
                <p>目标价格</p>
            </div>
            <div class="score-card excellent">
                <h3>投资回报</h3>
                <div class="score">${reportData.investmentSummary.expectedReturn}</div>
                <p>预期年化收益</p>
            </div>
            <div class="score-card fair">
                <h3>风险等级</h3>
                <div class="score">${reportData.investmentSummary.riskLevel}</div>
                <p>中等风险</p>
            </div>
        </div>
        
        <div class="recommendation-box">
            <h4>投资建议</h4>
            <p><strong>${reportData.investmentSummary.recommendation}</strong></p>
            <p>${reportData.investmentSummary.recommendationReason}</p>
        </div>
    </div>

    <!-- 估值分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💰 多重估值分析</h2>
        </div>
        <div class="section-content">
            <div class="valuation-grid">
                <div class="valuation-method">
                    <h4>相对估值法</h4>
                    <div class="metric-item">
                        <span>市盈率 (P/E)</span>
                        <span class="metric-value">${reportData.valuation.relative.pe}倍</span>
                    </div>
                    <div class="metric-item">
                        <span>市净率 (P/B)</span>
                        <span class="metric-value">${reportData.valuation.relative.pb}倍</span>
                    </div>
                    <div class="metric-item">
                        <span>市销率 (P/S)</span>
                        <span class="metric-value">${reportData.valuation.relative.ps}倍</span>
                    </div>
                    <div class="metric-item">
                        <span>PEG比率</span>
                        <span class="metric-value">${reportData.valuation.relative.peg}</span>
                    </div>
                    <div class="metric-item">
                        <span>EV/EBITDA</span>
                        <span class="metric-value">${reportData.valuation.relative.evEbitda}倍</span>
                    </div>
                </div>

                <div class="valuation-method">
                    <h4>绝对估值法 (DCF)</h4>
                    <div class="metric-item">
                        <span>企业价值</span>
                        <span class="metric-value">¥${reportData.valuation.dcf.enterpriseValue}亿</span>
                    </div>
                    <div class="metric-item">
                        <span>股权价值</span>
                        <span class="metric-value">¥${reportData.valuation.dcf.equityValue}亿</span>
                    </div>
                    <div class="metric-item">
                        <span>每股价值</span>
                        <span class="metric-value">¥${reportData.valuation.dcf.pricePerShare}</span>
                    </div>
                    <div class="metric-item">
                        <span>WACC</span>
                        <span class="metric-value">${reportData.valuation.dcf.wacc}%</span>
                    </div>
                    <div class="metric-item">
                        <span>永续增长率</span>
                        <span class="metric-value">${reportData.valuation.dcf.terminalGrowth}%</span>
                    </div>
                </div>

                <div class="valuation-method">
                    <h4>市场比较法</h4>
                    <div class="metric-item">
                        <span>行业平均P/E</span>
                        <span class="metric-value">${reportData.valuation.market.industryPE}倍</span>
                    </div>
                    <div class="metric-item">
                        <span>可比公司均值</span>
                        <span class="metric-value">¥${reportData.valuation.market.comparablePrice}</span>
                    </div>
                    <div class="metric-item">
                        <span>估值溢价</span>
                        <span class="metric-value">${reportData.valuation.market.premium}%</span>
                    </div>
                    <div class="metric-item">
                        <span>交易倍数</span>
                        <span class="metric-value">${reportData.valuation.market.transactionMultiple}倍</span>
                    </div>
                    <div class="metric-item">
                        <span>流动性折扣</span>
                        <span class="metric-value">${reportData.valuation.market.liquidityDiscount}%</span>
                    </div>
                </div>
            </div>

            <div class="dcf-model">
                <h4>DCF模型关键假设</h4>
                <div class="grid-2">
                    <div>
                        <h5>收入增长预测</h5>
                        <ul>
                            ${reportData.valuation.dcfAssumptions.revenueGrowth.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h5>盈利能力假设</h5>
                        <ul>
                            ${reportData.valuation.dcfAssumptions.profitability.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 同业对比分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏭 同业竞争分析</h2>
        </div>
        <div class="section-content">
            <table>
                <thead>
                    <tr>
                        <th>公司名称</th>
                        <th>市值(亿)</th>
                        <th>P/E</th>
                        <th>P/B</th>
                        <th>ROE</th>
                        <th>收入增长率</th>
                        <th>净利率</th>
                        <th>评级</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportData.peerComparison.companies.map(company => `
                        <tr>
                            <td><strong>${company.name}</strong></td>
                            <td>¥${company.marketCap}</td>
                            <td>${company.pe}</td>
                            <td>${company.pb}</td>
                            <td>${company.roe}%</td>
                            <td>${company.revenueGrowth}%</td>
                            <td>${company.netMargin}%</td>
                            <td>
                                <span class="status-indicator ${company.rating === '买入' ? 'positive' : company.rating === '持有' ? 'neutral' : 'negative'}"></span>
                                ${company.rating}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="peer-comparison">
                <h4>竞争优势分析</h4>
                <div class="grid-2">
                    <div>
                        <h5>相对优势</h5>
                        <ul>
                            ${reportData.peerComparison.advantages.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h5>相对劣势</h5>
                        <ul>
                            ${reportData.peerComparison.disadvantages.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 投资风险与机会 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚖️ 投资风险与机会分析</h2>
        </div>
        <div class="section-content">
            <div class="grid-2">
                <div>
                    <h4>🔴 主要投资风险</h4>
                    ${reportData.riskOpportunity.risks.map(risk => `
                        <div class="risk-factor">
                            <h5>${risk.title}</h5>
                            <p>${risk.description}</p>
                            <div style="font-size: 0.9em; color: #666; margin-top: 10px;">
                                <strong>概率：</strong>${risk.probability} | <strong>影响：</strong>${risk.impact}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div>
                    <h4>🟢 投资机会</h4>
                    ${reportData.riskOpportunity.opportunities.map(opportunity => `
                        <div class="opportunity-factor">
                            <h5>${opportunity.title}</h5>
                            <p>${opportunity.description}</p>
                            <div style="font-size: 0.9em; color: #666; margin-top: 10px;">
                                <strong>概率：</strong>${opportunity.probability} | <strong>价值：</strong>${opportunity.value}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="recommendation-box">
                <h4>风险缓释建议</h4>
                <ul>
                    ${reportData.riskOpportunity.mitigationStrategies.map(strategy => `<li>${strategy}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <!-- ESG分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🌱 ESG投资分析</h2>
        </div>
        <div class="section-content">
            <div class="esg-analysis">
                <h4>ESG评分概览</h4>
                <div class="grid-3">
                    <div class="text-center">
                        <h5>环境 (E)</h5>
                        <div style="font-size: 2em; font-weight: bold; color: #059669;">${reportData.esg.environmental.score}</div>
                        <p>${reportData.esg.environmental.rating}</p>
                    </div>
                    <div class="text-center">
                        <h5>社会 (S)</h5>
                        <div style="font-size: 2em; font-weight: bold; color: #0891b2;">${reportData.esg.social.score}</div>
                        <p>${reportData.esg.social.rating}</p>
                    </div>
                    <div class="text-center">
                        <h5>治理 (G)</h5>
                        <div style="font-size: 2em; font-weight: bold; color: #7c3aed;">${reportData.esg.governance.score}</div>
                        <p>${reportData.esg.governance.rating}</p>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div>
                    <h4>ESG亮点</h4>
                    <ul>
                        ${reportData.esg.highlights.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4>改进建议</h4>
                    <ul>
                        ${reportData.esg.improvements.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 投资时间表 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📅 投资执行建议</h2>
        </div>
        <div class="section-content">
            <div class="investment-timeline">
                <h4>⏰ 建议投资时间表</h4>
                ${reportData.investmentTimeline.phases.map(phase => `
                    <div class="timeline-item">
                        <strong>${phase.period}：</strong>${phase.description}
                    </div>
                `).join('')}
            </div>

            <div class="grid-2">
                <div class="recommendation-box">
                    <h4>投资策略建议</h4>
                    <ul>
                        ${reportData.investmentStrategy.recommendations.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="recommendation-box">
                    <h4>监控指标</h4>
                    <ul>
                        ${reportData.investmentStrategy.monitoringMetrics.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>分析声明</strong></p>
        <p>本投资分析报告基于公开信息和财务数据进行分析，投资建议仅供参考。投资有风险，决策需谨慎。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 分析日期：${reportData.reportInfo.reportDate} | 📊 分析师：${reportData.reportInfo.analyst} | 📋 报告编号：${reportData.reportInfo.reportNumber}</p>
        <p>🏢 分析机构：${reportData.reportInfo.institution} | 📞 联系方式：${reportData.reportInfo.contact}</p>
    </div>
</body>
</html>
    `;
};

// 获取示例投资分析报告数据
export const getInvestmentAnalysisReportData = () => {
    return {
        companyInfo: {
            name: "XX科技集团有限公司",
            ticker: "SH:600XXX",
            sector: "科技",
            industry: "软件开发"
        },
        reportInfo: {
            reportDate: "2025年1月31日",
            reportNumber: "INV-20250131-001",
            analyst: "张研究",
            institution: "XX投资研究院",
            contact: "research@xxinvest.com"
        },
        investmentSummary: {
            overallScore: "85",
            overallRating: "Good",
            targetPrice: "42.50",
            expectedReturn: "28.5%",
            riskLevel: "3",
            recommendation: "买入",
            recommendationReason: "基于强劲的盈利增长预期、合理的估值水平和优秀的管理团队，建议买入并持有12-18个月。目标价位42.50元，对应28.5%的预期年化收益率。"
        },
        valuation: {
            relative: {
                pe: "15.2",
                pb: "2.1",
                ps: "1.8",
                peg: "0.84",
                evEbitda: "12.5"
            },
            dcf: {
                enterpriseValue: "18.5",
                equityValue: "16.2",
                pricePerShare: "40.50",
                wacc: "9.2",
                terminalGrowth: "2.5"
            },
            market: {
                industryPE: "18.3",
                comparablePrice: "38.90",
                premium: "4.1",
                transactionMultiple: "14.2",
                liquidityDiscount: "15"
            },
            dcfAssumptions: {
                revenueGrowth: [
                    "2025年收入增长15%，达到13.8亿元",
                    "2026-2027年维持12%增长率",
                    "2028-2029年增长率逐步降至8%",
                    "永续期增长率假设为2.5%"
                ],
                profitability: [
                    "毛利率维持在40%水平",
                    "营业利润率稳定在25%",
                    "净利率保持在23%左右",
                    "税率按25%计算"
                ]
            }
        },
        peerComparison: {
            companies: [
                {
                    name: "XX科技(标的)",
                    marketCap: "16.2",
                    pe: "15.2",
                    pb: "2.1",
                    roe: "31.1%",
                    revenueGrowth: "12.5%",
                    netMargin: "23.3%",
                    rating: "买入"
                },
                {
                    name: "AA软件",
                    marketCap: "28.5",
                    pe: "22.1",
                    pb: "3.2",
                    roe: "18.5%",
                    revenueGrowth: "8.2%",
                    netMargin: "16.8%",
                    rating: "持有"
                },
                {
                    name: "BB技术",
                    marketCap: "12.8",
                    pe: "16.8",
                    pb: "1.9",
                    roe: "24.2%",
                    revenueGrowth: "15.1%",
                    netMargin: "19.5%",
                    rating: "买入"
                },
                {
                    name: "CC创新",
                    marketCap: "35.2",
                    pe: "19.5",
                    pb: "2.8",
                    roe: "21.8%",
                    revenueGrowth: "10.3%",
                    netMargin: "20.1%",
                    rating: "持有"
                }
            ],
            advantages: [
                "ROE水平(31.1%)显著高于行业平均(21.1%)",
                "P/E倍数(15.2)低于行业平均(18.3倍)",
                "收入增长率(12.5%)处于行业前列",
                "净利率(23.3%)优于大部分同业",
                "财务杠杆使用合理，风险可控"
            ],
            disadvantages: [
                "公司规模相对较小，市场份额有限",
                "客户集中度较高，存在依赖风险",
                "研发投入占比低于部分领先企业",
                "国际化程度有待提升",
                "品牌知名度不及行业龙头"
            ]
        },
        riskOpportunity: {
            risks: [
                {
                    title: "市场竞争加剧风险",
                    description: "软件行业竞争激烈，新进入者增多，可能导致市场份额下降和价格压力。",
                    probability: "中等",
                    impact: "中等"
                },
                {
                    title: "技术更新迭代风险",
                    description: "AI、云计算等新技术快速发展，如果公司技术跟进不及时，可能面临技术落后风险。",
                    probability: "中等",
                    impact: "较大"
                },
                {
                    title: "核心人员流失风险",
                    description: "技术和销售核心人员流失可能影响公司业务发展和技术创新能力。",
                    probability: "较低",
                    impact: "中等"
                }
            ],
            opportunities: [
                {
                    title: "数字化转型机遇",
                    description: "企业数字化转型需求旺盛，为公司软件产品带来广阔市场空间。",
                    probability: "较高",
                    impact: "较大"
                },
                {
                    title: "政策支持机遇",
                    description: "国家大力支持软件产业发展，相关优惠政策为公司发展提供良好环境。",
                    probability: "高",
                    impact: "中等"
                },
                {
                    title: "市场扩张机遇",
                    description: "公司可通过并购或合作方式快速扩大市场规模和客户基础。",
                    probability: "中等",
                    impact: "较大"
                }
            ],
            mitigationStrategies: [
                "密切关注行业技术发展趋势，加大研发投入",
                "建立完善的人才激励和保留机制",
                "多元化客户结构，降低客户集中度风险",
                "加强品牌建设和市场推广",
                "考虑通过并购整合提升竞争实力"
            ]
        },
        esg: {
            environmental: {
                score: "75",
                rating: "良好"
            },
            social: {
                score: "82",
                rating: "优秀"
            },
            governance: {
                score: "88",
                rating: "优秀"
            },
            highlights: [
                "建立了完善的环境管理体系",
                "员工福利和培训体系完善",
                "公司治理结构规范透明",
                "信息披露质量较高",
                "积极履行社会责任"
            ],
            improvements: [
                "进一步提升环保投入和绿色技术应用",
                "加强供应链ESG管理",
                "提升董事会独立性",
                "完善风险管理体系",
                "加强利益相关者沟通"
            ]
        },
        investmentTimeline: {
            phases: [
                {
                    period: "立即执行",
                    description: "建立初始仓位，建议分批买入总目标仓位的30-40%"
                },
                {
                    period: "1-3个月",
                    description: "根据市场表现和公司基本面变化，逐步增加仓位至60-70%"
                },
                {
                    period: "3-6个月",
                    description: "完成目标仓位建设，密切监控关键财务指标"
                },
                {
                    period: "6-12个月",
                    description: "根据投资目标达成情况，考虑部分获利了结"
                },
                {
                    period: "12-18个月",
                    description: "重新评估投资逻辑，决定是否继续持有或退出"
                }
            ]
        },
        investmentStrategy: {
            recommendations: [
                "采用分批建仓策略，降低买入成本风险",
                "设置止损点位(-15%)和止盈点位(+30%)",
                "关注季度财报和业务发展里程碑",
                "定期与公司管理层沟通了解战略执行情况",
                "关注同业公司动态和行业发展趋势"
            ],
            monitoringMetrics: [
                "季度收入增长率和净利润增长率",
                "新客户获取数量和客户留存率",
                "研发投入占收入比例和新产品推出情况",
                "现金流状况和资产负债率变化",
                "市场估值水平和相对同业表现"
            ]
        }
    };
};