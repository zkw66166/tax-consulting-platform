// src/report/ManagementImprovementReport.js
export const generateManagementImprovementReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理改进分析报告</title>
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
            background: #7c3aed;
            color: white;
        }

        .btn-secondary {
            background: #6b7280;
            color: white;
        }

        .header {
            text-align: center;
            border-bottom: 4px solid #7c3aed;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
            padding: 40px 30px 30px;
            border-radius: 8px;
            position: relative;
        }
        
        .header::before {
            content: "🎯";
            position: absolute;
            top: 15px;
            left: 30px;
            font-size: 24px;
        }
        
        .header h1 {
            color: #6b21a8;
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

        .management-summary {
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
            border: 2px solid #a855f7;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 40px;
            position: relative;
        }

        .management-summary::before {
            content: "📊";
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 20px;
        }

        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .kpi-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-left: 5px solid;
            position: relative;
        }

        .kpi-card.excellent {
            border-left-color: #059669;
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }

        .kpi-card.good {
            border-left-color: #0891b2;
            background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
        }

        .kpi-card.fair {
            border-left-color: #d97706;
            background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
        }

        .kpi-card.poor {
            border-left-color: #dc2626;
            background: linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%);
        }

        .kpi-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .kpi-card .score {
            font-size: 36px;
            font-weight: 700;
            margin: 10px 0;
        }

        .kpi-card.excellent .score { color: #047857; }
        .kpi-card.good .score { color: #0e7490; }
        .kpi-card.fair .score { color: #b45309; }
        .kpi-card.poor .score { color: #b91c1c; }

        .section {
            margin-bottom: 50px;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .section-header {
            background: linear-gradient(135deg, #7c3aed 0%, #6b21a8 100%);
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

        .efficiency-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .efficiency-metric {
            background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
            border: 2px solid #e9d5ff;
            border-radius: 12px;
            padding: 25px;
            position: relative;
        }

        .efficiency-metric::before {
            content: "⚡";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 16px;
        }

        .efficiency-metric h4 {
            color: #6b21a8;
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

        .improvement-opportunity {
            background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
            border-left: 5px solid #f59e0b;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }

        .improvement-opportunity::before {
            position: absolute;
            left: -8px;
            top: 20px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 3px solid #f59e0b;
            content: "";
        }

        .best-practice {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            border-left: 5px solid #10b981;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }

        .best-practice::before {
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

        .budget-variance {
            background: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .action-plan {
            background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
            border: 2px solid #7c3aed;
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }

        .action-plan::before {
            content: "🚀";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 18px;
        }

        .action-plan h4 {
            color: #6b21a8;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 30px;
        }

        .departmental-analysis {
            background: linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%);
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }

        .benchmark-comparison {
            background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
            border: 2px solid #ef4444;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .cost-analysis {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 2px solid #22c55e;
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

        .status-indicator.ahead { background: #10b981; }
        .status-indicator.ontrack { background: #3b82f6; }
        .status-indicator.behind { background: #f59e0b; }
        .status-indicator.atrisk { background: #ef4444; }

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
            .efficiency-grid, .grid-2, .grid-3, .kpi-grid {
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
        <h1>管理改进分析报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} 经营管理全面诊断与改进建议 · ${reportData.reportInfo.reportDate}</p>
    </div>

    <!-- 管理KPI概览 -->
    <div class="management-summary">
        <h3>🎯 管理KPI仪表板</h3>
        <div class="kpi-grid">
            <div class="kpi-card ${reportData.managementSummary.efficiency.level}">
                <h3>运营效率</h3>
                <div class="score">${reportData.managementSummary.efficiency.score}</div>
                <p>${reportData.managementSummary.efficiency.description}</p>
            </div>
            <div class="kpi-card ${reportData.managementSummary.costControl.level}">
                <h3>成本控制</h3>
                <div class="score">${reportData.managementSummary.costControl.score}</div>
                <p>${reportData.managementSummary.costControl.description}</p>
            </div>
            <div class="kpi-card ${reportData.managementSummary.budgetExecution.level}">
                <h3>预算执行</h3>
                <div class="score">${reportData.managementSummary.budgetExecution.score}%</div>
                <p>${reportData.managementSummary.budgetExecution.description}</p>
            </div>
            <div class="kpi-card ${reportData.managementSummary.overallPerformance.level}">
                <h3>综合绩效</h3>
                <div class="score">${reportData.managementSummary.overallPerformance.score}</div>
                <p>${reportData.managementSummary.overallPerformance.description}</p>
            </div>
        </div>
        
        <div class="action-plan">
            <h4>管理改进优先级</h4>
            <p><strong>第一优先级：</strong>${reportData.managementSummary.topPriority}</p>
            <p><strong>改进建议：</strong>${reportData.managementSummary.keyRecommendation}</p>
        </div>
    </div>

    <!-- 运营效率分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚡ 运营效率分析</h2>
        </div>
        <div class="section-content">
            <div class="efficiency-grid">
                <div class="efficiency-metric">
                    <h4>资产周转效率</h4>
                    <div class="metric-item">
                        <span>总资产周转率</span>
                        <span class="metric-value">${reportData.operationalEfficiency.assetTurnover.totalAssetTurnover}</span>
                    </div>
                    <div class="metric-item">
                        <span>应收账款周转天数</span>
                        <span class="metric-value">${reportData.operationalEfficiency.assetTurnover.receivablesDays}天</span>
                    </div>
                    <div class="metric-item">
                        <span>存货周转天数</span>
                        <span class="metric-value">${reportData.operationalEfficiency.assetTurnover.inventoryDays}天</span>
                    </div>
                    <div class="metric-item">
                        <span>现金周转期</span>
                        <span class="metric-value">${reportData.operationalEfficiency.assetTurnover.cashConversionCycle}天</span>
                    </div>
                </div>

                <div class="efficiency-metric">
                    <h4>人员效率</h4>
                    <div class="metric-item">
                        <span>人均营收</span>
                        <span class="metric-value">¥${reportData.operationalEfficiency.humanResource.revenuePerEmployee}万</span>
                    </div>
                    <div class="metric-item">
                        <span>人均利润</span>
                        <span class="metric-value">¥${reportData.operationalEfficiency.humanResource.profitPerEmployee}万</span>
                    </div>
                    <div class="metric-item">
                        <span>人均薪酬</span>
                        <span class="metric-value">¥${reportData.operationalEfficiency.humanResource.salaryPerEmployee}万</span>
                    </div>
                    <div class="metric-item">
                        <span>人员流失率</span>
                        <span class="metric-value">${reportData.operationalEfficiency.humanResource.turnoverRate}%</span>
                    </div>
                </div>

                <div class="efficiency-metric">
                    <h4>运营质量</h4>
                    <div class="metric-item">
                        <span>客户满意度</span>
                        <span class="metric-value">${reportData.operationalEfficiency.quality.customerSatisfaction}%</span>
                    </div>
                    <div class="metric-item">
                        <span>产品合格率</span>
                        <span class="metric-value">${reportData.operationalEfficiency.quality.productQualityRate}%</span>
                    </div>
                    <div class="metric-item">
                        <span>按时交付率</span>
                        <span class="metric-value">${reportData.operationalEfficiency.quality.onTimeDeliveryRate}%</span>
                    </div>
                    <div class="metric-item">
                        <span>客户投诉率</span>
                        <span class="metric-value">${reportData.operationalEfficiency.quality.complaintRate}%</span>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div>
                    <h4>🟢 运营优势</h4>
                    ${reportData.operationalEfficiency.strengths.map(strength => `
                        <div class="best-practice">
                            <h5>${strength.title}</h5>
                            <p>${strength.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div>
                    <h4>🟡 改进机会</h4>
                    ${reportData.operationalEfficiency.improvements.map(improvement => `
                        <div class="improvement-opportunity">
                            <h5>${improvement.title}</h5>
                            <p>${improvement.description}</p>
                            <div style="margin-top: 10px; font-size: 0.9em; color: #92400e;">
                                <strong>预期收益：</strong>${improvement.expectedBenefit}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 预算执行分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📊 预算执行分析</h2>
        </div>
        <div class="section-content">
            <div class="budget-variance">
                <h4>预算执行概览</h4>
                <table>
                    <thead>
                        <tr>
                            <th>科目</th>
                            <th>年度预算(万元)</th>
                            <th>实际执行(万元)</th>
                            <th>执行率</th>
                            <th>预算偏差</th>
                            <th>偏差原因</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.budgetAnalysis.items.map(item => `
                            <tr>
                                <td><strong>${item.category}</strong></td>
                                <td>¥${item.budget}</td>
                                <td>¥${item.actual}</td>
                                <td>${item.executionRate}%</td>
                                <td style="color: ${item.variance.startsWith('+') ? '#ef4444' : '#10b981'}">${item.variance}</td>
                                <td>${item.reason}</td>
                                <td>
                                    <span class="status-indicator ${item.status}"></span>
                                    ${item.statusDescription}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid-2">
                <div class="action-plan">
                    <h4>预算偏差分析</h4>
                    <ul>
                        ${reportData.budgetAnalysis.varianceAnalysis.map(analysis => `<li>${analysis}</li>`).join('')}
                    </ul>
                </div>

                <div class="action-plan">
                    <h4>预算改进建议</h4>
                    <ul>
                        ${reportData.budgetAnalysis.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 部门绩效分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏢 部门绩效分析</h2>
        </div>
        <div class="section-content">
            <div class="departmental-analysis">
                <h4>部门KPI达成情况</h4>
                <table>
                    <thead>
                        <tr>
                            <th>部门</th>
                            <th>收入贡献</th>
                            <th>成本控制</th>
                            <th>效率指标</th>
                            <th>质量指标</th>
                            <th>综合评分</th>
                            <th>排名</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reportData.departmentalAnalysis.departments.map(dept => `
                            <tr>
                                <td><strong>${dept.name}</strong></td>
                                <td>${dept.revenueContribution}%</td>
                                <td>${dept.costControl}</td>
                                <td>${dept.efficiency}</td>
                                <td>${dept.quality}</td>
                                <td style="color: ${dept.overallScore >= 90 ? '#059669' : dept.overallScore >= 80 ? '#0891b2' : dept.overallScore >= 70 ? '#d97706' : '#dc2626'}">${dept.overallScore}</td>
                                <td>${dept.ranking}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid-3">
                ${reportData.departmentalAnalysis.topPerformers.map(performer => `
                    <div class="best-practice">
                        <h5>🥇 ${performer.department}</h5>
                        <p><strong>优秀表现：</strong>${performer.achievement}</p>
                        <p><strong>最佳实践：</strong>${performer.bestPractice}</p>
                    </div>
                `).join('')}
            </div>

            <div class="action-plan">
                <h4>部门协同改进建议</h4>
                <ul>
                    ${reportData.departmentalAnalysis.collaborationImprovements.map(improvement => `<li>${improvement}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <!-- 成本控制分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💰 成本控制分析</h2>
        </div>
        <div class="section-content">
            <div class="cost-analysis">
                <h4>成本结构分析</h4>
                <div class="grid-2">
                    <div>
                        <h5>成本构成</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>成本类别</th>
                                    <th>金额(万元)</th>
                                    <th>占比</th>
                                    <th>同比变化</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${reportData.costControl.structure.map(item => `
                                    <tr>
                                        <td>${item.category}</td>
                                        <td>¥${item.amount}</td>
                                        <td>${item.percentage}%</td>
                                        <td style="color: ${item.change.startsWith('+') ? '#ef4444' : '#10b981'}">${item.change}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h5>成本控制指标</h5>
                        ${reportData.costControl.metrics.map(metric => `
                            <div class="metric-item">
                                <span>${metric.name}</span>
                                <span class="metric-value">${metric.value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div class="improvement-opportunity">
                    <h4>成本削减机会</h4>
                    <ul>
                        ${reportData.costControl.reductionOpportunities.map(opportunity => `
                            <li>
                                <strong>${opportunity.area}：</strong>${opportunity.description}
                                <div style="font-size: 0.9em; color: #92400e; margin-top: 5px;">
                                    预计节省：${opportunity.potentialSaving}
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="benchmark-comparison">
                    <h4>行业对标分析</h4>
                    <ul>
                        ${reportData.costControl.benchmarking.map(benchmark => `
                            <li><strong>${benchmark.metric}：</strong>本公司${benchmark.company}，行业平均${benchmark.industry}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 行动计划 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🚀 管理改进行动计划</h2>
        </div>
        <div class="section-content">
            <div class="action-plan">
                <h4>⏰ 短期行动计划（1-3个月）</h4>
                ${reportData.actionPlan.shortTerm.map(action => `
                    <div class="timeline-item">
                        <strong>${action.timeline}：</strong>${action.description}
                        <span style="margin-left: 10px; font-size: 0.9em; color: #6b21a8;">
                            负责人：${action.owner} | 预期效果：${action.expectedOutcome}
                        </span>
                    </div>
                `).join('')}
            </div>

            <div class="action-plan">
                <h4>📈 中期改进计划（3-12个月）</h4>
                ${reportData.actionPlan.mediumTerm.map(action => `
                    <div class="timeline-item">
                        <strong>${action.timeline}：</strong>${action.description}
                        <span style="margin-left: 10px; font-size: 0.9em; color: #6b21a8;">
                            负责人：${action.owner} | 预期效果：${action.expectedOutcome}
                        </span>
                    </div>
                `).join('')}
            </div>

            <div class="action-plan">
                <h4>🎯 长期战略计划（1-3年）</h4>
                ${reportData.actionPlan.longTerm.map(action => `
                    <div class="timeline-item">
                        <strong>${action.timeline}：</strong>${action.description}
                        <span style="margin-left: 10px; font-size: 0.9em; color: #6b21a8;">
                            负责人：${action.owner} | 预期效果：${action.expectedOutcome}
                        </span>
                    </div>
                `).join('')}
            </div>

            <div class="grid-2">
                <div class="action-plan">
                    <h4>关键成功因素</h4>
                    <ul>
                        ${reportData.actionPlan.successFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>

                <div class="action-plan">
                    <h4>监控指标</h4>
                    <ul>
                        ${reportData.actionPlan.monitoringMetrics.map(metric => `<li>${metric}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>管理诊断声明</strong></p>
        <p>本管理改进分析报告基于企业财务数据和运营情况进行分析，改进建议仅供管理决策参考。实际执行应结合企业具体情况和外部环境变化。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 分析日期：${reportData.reportInfo.reportDate} | 🎯 分析师：${reportData.reportInfo.analyst} | 📋 报告编号：${reportData.reportInfo.reportNumber}</p>
        <p>🏢 咨询机构：${reportData.reportInfo.institution} | 📞 联系方式：${reportData.reportInfo.contact}</p>
    </div>
</body>
</html>
    `;
};

// 获取示例管理改进报告数据
export const getManagementImprovementReportData = () => {
    return {
        companyInfo: {
            name: "XX科技集团有限公司",
            industry: "软件开发",
            employees: 150,
            establishYear: "2015年"
        },
        reportInfo: {
            reportDate: "2025年1月31日",
            reportNumber: "MGMT-20250131-001",
            analyst: "王管理",
            institution: "XX管理咨询有限公司",
            contact: "consulting@xxmgmt.com"
        },
        managementSummary: {
            efficiency: {
                score: "78",
                level: "good",
                description: "运营良好"
            },
            costControl: {
                score: "82",
                level: "excellent",
                description: "控制有效"
            },
            budgetExecution: {
                score: "85",
                level: "good",
                description: "执行良好"
            },
            overallPerformance: {
                score: "81",
                level: "good",
                description: "表现优良"
            },
            topPriority: "加强应收账款管理，提升现金周转效率",
            keyRecommendation: "建立客户信用评级体系，优化收款流程，目标将现金周转期从80天缩短至65天"
        },
        operationalEfficiency: {
            assetTurnover: {
                totalAssetTurnover: "0.8",
                receivablesDays: "55",
                inventoryDays: "101",
                cashConversionCycle: "80"
            },
            humanResource: {
                revenuePerEmployee: "80",
                profitPerEmployee: "18.7",
                salaryPerEmployee: "15.2",
                turnoverRate: "12"
            },
            quality: {
                customerSatisfaction: "88",
                productQualityRate: "99.2",
                onTimeDeliveryRate: "92",
                complaintRate: "0.8"
            },
            strengths: [
                {
                    title: "员工生产效率高",
                    description: "人均营收80万元，超过行业平均65万元，员工专业技能强"
                },
                {
                    title: "产品质量稳定",
                    description: "产品合格率99.2%，客户满意度88%，品牌信誉良好"
                }
            ],
            improvements: [
                {
                    title: "应收账款周转效率",
                    description: "应收账款周转天数55天，高于行业平均45天，影响现金流",
                    expectedBenefit: "缩短10天，释放现金流700万元"
                },
                {
                    title: "库存管理优化",
                    description: "存货周转天数101天，存在积压风险，需要改进库存管理",
                    expectedBenefit: "降低至85天，减少资金占用200万元"
                }
            ]
        },
        budgetAnalysis: {
            items: [
                {
                    category: "营业收入",
                    budget: "12000",
                    actual: "10200",
                    executionRate: "85",
                    variance: "-15%",
                    reason: "市场竞争加剧",
                    status: "behind",
                    statusDescription: "落后计划"
                },
                {
                    category: "人工成本",
                    budget: "2280",
                    actual: "2350",
                    executionRate: "103",
                    variance: "+3%",
                    reason: "人员薪酬调整",
                    status: "atrisk",
                    statusDescription: "需要关注"
                },
                {
                    category: "研发费用",
                    budget: "1200",
                    actual: "1150",
                    executionRate: "96",
                    variance: "-4%",
                    reason: "项目进度延迟",
                    status: "ontrack",
                    statusDescription: "按计划执行"
                },
                {
                    category: "销售费用",
                    budget: "900",
                    actual: "820",
                    executionRate: "91",
                    variance: "-9%",
                    reason: "市场推广优化",
                    status: "ahead",
                    statusDescription: "超额完成"
                },
                {
                    category: "管理费用",
                    budget: "600",
                    actual: "580",
                    executionRate: "97",
                    variance: "-3%",
                    reason: "费用控制良好",
                    status: "ontrack",
                    statusDescription: "按计划执行"
                }
            ],
            varianceAnalysis: [
                "收入未达预期主要因市场竞争加剧和新客户开发不及预期",
                "人工成本超预算因年中薪酬调整和新增技术人员",
                "研发费用节约主要因部分项目延期到下年度",
                "销售费用控制良好，数字化营销提升了投入产出比",
                "管理费用基本按预算执行，费用控制机制有效"
            ],
            improvements: [
                "加强市场分析和客户开发，制定更具竞争力的产品策略",
                "优化人员结构，提高人均效率，控制人工成本增长",
                "建立项目进度监控机制，确保研发投入按计划执行",
                "继续优化销售费用投入结构，重点投向高ROI渠道",
                "建立更精细的预算编制和执行监控体系"
            ]
        },
        departmentalAnalysis: {
            departments: [
                {
                    name: "研发部",
                    revenueContribution: "35",
                    costControl: "85",
                    efficiency: "90",
                    quality: "95",
                    overallScore: "91",
                    ranking: "1"
                },
                {
                    name: "销售部",
                    revenueContribution: "40",
                    costControl: "78",
                    efficiency: "85",
                    quality: "88",
                    overallScore: "85",
                    ranking: "2"
                },
                {
                    name: "运营部",
                    revenueContribution: "15",
                    costControl: "82",
                    efficiency: "80",
                    quality: "92",
                    overallScore: "82",
                    ranking: "3"
                },
                {
                    name: "行政部",
                    revenueContribution: "10",
                    costControl: "88",
                    efficiency: "75",
                    quality: "85",
                    overallScore: "78",
                    ranking: "4"
                }
            ],
            topPerformers: [
                {
                    department: "研发部",
                    achievement: "新产品开发效率提升25%，产品质量零缺陷",
                    bestPractice: "敏捷开发流程和质量把控机制"
                },
                {
                    department: "销售部",
                    achievement: "大客户签约率提升30%，客户满意度90%",
                    bestPractice: "CRM系统应用和客户关系维护"
                },
                {
                    department: "运营部",
                    achievement: "交付准时率达92%，客户投诉率低于1%",
                    bestPractice: "供应链优化和质量监控体系"
                }
            ],
            collaborationImprovements: [
                "建立跨部门项目管理机制，提升协作效率",
                "完善内部信息共享平台，减少沟通成本",
                "设立部门间协作KPI，激励团队合作",
                "定期举办部门间交流会，促进知识分享",
                "建立统一的客户服务标准和流程"
            ]
        },
        costControl: {
            structure: [
                {
                    
                    category: "直接材料",
                    amount: "4320",
                    percentage: "60",
                    change: "+8%"
                },
                {
                    category: "人工成本",
                    amount: "2350",
                    percentage: "33",
                    change: "+5%"
                },
                {
                    category: "制造费用",
                    amount: "504",
                    percentage: "7",
                    change: "+2%"
                }
            ],
            metrics: [
                {
                    name: "成本费用利润率",
                    value: "38.9%"
                },
                {
                    name: "成本费用总额占收入比",
                    value: "71.2%"
                },
                {
                    name: "单位成本同比变化",
                    value: "+6.5%"
                },
                {
                    name: "成本控制达成率",
                    value: "96.8%"
                }
            ],
            reductionOpportunities: [
                {
                    area: "供应商议价",
                    description: "通过集中采购和长期合作降低原材料成本",
                    potentialSaving: "年节省150万元"
                },
                {
                    area: "能耗优化",
                    description: "实施节能改造和智能化控制系统",
                    potentialSaving: "年节省80万元"
                },
                {
                    area: "流程优化",
                    description: "精简业务流程，减少冗余环节",
                    potentialSaving: "年节省120万元"
                },
                {
                    area: "技术升级",
                    description: "自动化设备替代人工，提升效率",
                    potentialSaving: "年节省200万元"
                }
            ],
            benchmarking: [
                {
                    metric: "人工成本率",
                    company: "23.0%",
                    industry: "25.5%"
                },
                {
                    metric: "管理费用率",
                    company: "5.7%",
                    industry: "6.2%"
                },
                {
                    metric: "销售费用率",
                    company: "8.0%",
                    industry: "7.5%"
                },
                {
                    metric: "研发费用率",
                    company: "11.3%",
                    industry: "9.8%"
                }
            ]
        },
        actionPlan: {
            shortTerm: [
                {
                    timeline: "第1个月",
                    description: "建立应收账款管理制度，启动客户信用评级",
                    owner: "财务总监",
                    expectedOutcome: "应收账款结构优化10%"
                },
                {
                    timeline: "第2个月",
                    description: "实施库存管理系统，优化采购计划",
                    owner: "运营总监",
                    expectedOutcome: "库存周转天数减少5天"
                },
                {
                    timeline: "第3个月",
                    description: "启动供应商评估和集中采购项目",
                    owner: "采购经理",
                    expectedOutcome: "采购成本降低3%"
                }
            ],
            mediumTerm: [
                {
                    timeline: "第1季度",
                    description: "实施全面预算管理系统，建立月度滚动预测",
                    owner: "CFO",
                    expectedOutcome: "预算准确率提升到95%"
                },
                {
                    timeline: "第2季度",
                    description: "推行部门KPI考核体系，建立绩效激励机制",
                    owner: "人力资源总监",
                    expectedOutcome: "部门协作效率提升20%"
                },
                {
                    timeline: "第3季度",
                    description: "实施ERP系统二期，整合财务和业务流程",
                    owner: "IT总监",
                    expectedOutcome: "运营效率提升15%"
                },
                {
                    timeline: "第4季度",
                    description: "建立客户关系管理系统，优化销售流程",
                    owner: "销售总监",
                    expectedOutcome: "客户转化率提升25%"
                }
            ],
            longTerm: [
                {
                    timeline: "第1年",
                    description: "建立数字化运营平台，实现智能化管理",
                    owner: "CEO",
                    expectedOutcome: "整体运营效率提升30%"
                },
                {
                    timeline: "第2年",
                    description: "推进组织架构优化，建立敏捷团队模式",
                    owner: "COO",
                    expectedOutcome: "组织响应速度提升50%"
                },
                {
                    timeline: "第3年",
                    description: "建立行业领先的管理体系和文化",
                    owner: "董事会",
                    expectedOutcome: "成为行业管理标杆企业"
                }
            ],
            successFactors: [
                "高级管理层的坚定支持和持续推动",
                "建立有效的变革管理和沟通机制",
                "员工培训和能力提升投入",
                "充足的资源配置和预算支持",
                "建立完善的监控和反馈机制"
            ],
            monitoringMetrics: [
                "应收账款周转天数（目标：55天→45天）",
                "存货周转天数（目标：101天→85天）",
                "预算执行准确率（目标：85%→95%）",
                "部门协作满意度（目标：75%→90%）",
                "整体运营效率指数（目标：78→85）"
            ]
        }
    };
};