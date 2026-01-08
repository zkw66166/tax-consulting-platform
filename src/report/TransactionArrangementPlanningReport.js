// src/report/TransactionArrangementPlanningReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>交易安排筹划报告</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif;
            line-height: 1.8;
            color: #2c3e50;
            max-width: 1000px;
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
            border-bottom: 4px solid #27ae60;
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
            background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
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
            border-top: 5px solid #27ae60;
            position: relative;
        }
        
        .analysis-item::before {
            content: "▶";
            position: absolute;
            left: 25px;
            top: 25px;
            color: #27ae60;
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
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #4caf50;
        }
        
        .highlight-card h3 {
            color: #2e7d32;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .highlight-card .value {
            color: #1b5e20;
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
            color: #27ae60;
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
            color: #27ae60;
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
            background: linear-gradient(135deg, #27ae60, #229954);
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
            background: linear-gradient(120deg, #a8e6cf 0%, #88d8a3 100%);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .contract-flow {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        
        .flow-step {
            text-align: center;
            flex: 1;
            position: relative;
        }
        
        .flow-step:not(:last-child)::after {
            content: "→";
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            color: #27ae60;
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
        }
        
        .comparison-card {
            background: #ffffff;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .comparison-card::before {
            content: "VS";
            position: absolute;
            top: -10px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .process-chain {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 25px;
            border-radius: 12px;
            margin: 25px 0;
            border: 2px solid #dee2e6;
        }
        
        .process-step {
            text-align: center;
            flex: 1;
            position: relative;
            padding: 15px;
            background: white;
            border-radius: 8px;
            margin: 0 5px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .process-step:not(:last-child)::after {
            content: "➤";
            position: absolute;
            right: -15px;
            top: 50%;
            transform: translateY(-50%);
            color: #27ae60;
            font-size: 16px;
            font-weight: bold;
            z-index: 1;
            background: white;
            padding: 5px;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .optimization-box {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px solid #2196f3;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }
        
        .optimization-box h4 {
            color: #1976d2;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .tax-rate-comparison {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        
        .tax-rate-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #ecf0f1;
        }
        
        .tax-rate-card.current {
            border-color: #e74c3c;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .tax-rate-card.optimized {
            border-color: #4caf50;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .tax-rate-card h5 {
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 600;
        }
        
        .tax-rate-card .rate {
            font-size: 24px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .supply-chain-flow {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 25px;
            border-radius: 12px;
            margin: 25px 0;
            position: relative;
        }
        
        .supply-chain-flow::before {
            content: "🔗";
            position: absolute;
            top: -10px;
            left: 20px;
            background: #17a2b8;
            color: white;
            padding: 8px;
            border-radius: 50%;
            font-size: 16px;
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
            .company-info,
            .grid-2,
            .grid-3,
            .grid-4 {
                grid-template-columns: 1fr;
            }
            
            .contract-flow,
            .process-chain {
                flex-direction: column;
            }
            
            .flow-step:not(:last-child)::after,
            .process-step:not(:last-child)::after {
                content: "↓";
                right: 50%;
                top: auto;
                bottom: -15px;
                transform: translateX(50%);
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
        <h1>交易安排筹划报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>📋 企业交易概况</h3>
            <p><strong>企业名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>主要业务类型</strong><span>${reportData.companyInfo.businessType}</span></p>
            <p><strong>年交易规模</strong><span>${reportData.companyInfo.transactionVolume}</span></p>
            <p><strong>主要客户类型</strong><span>${reportData.companyInfo.customerType}</span></p>
            <p><strong>供应商数量</strong><span>${reportData.companyInfo.supplierCount}</span></p>
            <p><strong>合同管理水平</strong><span>${reportData.companyInfo.contractManagement}</span></p>
            <p><strong>供应链模式</strong><span>${reportData.companyInfo.supplyChainMode}</span></p>
            <p><strong>物流配送方式</strong><span>${reportData.companyInfo.logisticsMode}</span></p>
        </div>
        <div class="info-card">
            <h3>📊 筹划概览</h3>
            <p><strong>筹划期间</strong><span>${reportData.reportInfo.planningPeriod}</span></p>
            <p><strong>涉及交易类型</strong><span>${reportData.planningOverview.transactionTypes}</span></p>
            <p><strong>预计节税总额</strong><span class="highlight-text">${reportData.planningOverview.totalSaving}万元</span></p>
            <p><strong>实施复杂度</strong><span>${reportData.planningOverview.complexity}</span></p>
            <p><strong>合规风险</strong><span>${reportData.planningOverview.complianceRisk}</span></p>
            <p><strong>投入产出比</strong><span class="highlight-text">${reportData.planningOverview.roiRatio}</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🎯 交易筹划概览</h2>
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
                    <h3>优化潜力</h3>
                    <div class="value" style="font-size: 20px;">${reportData.planningOverview.potential}</div>
                </div>
                <div class="highlight-card">
                    <h3>风险等级</h3>
                    <div class="value" style="font-size: 20px;">${reportData.planningOverview.riskLevel}</div>
                </div>
            </div>
            
            <div class="grid-2">
                <div class="analysis-item risk-low">
                    <h4>交易优化机会</h4>
                    <ul>
                        ${reportData.planningOverview.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-item risk-medium">
                    <h4>潜在实施挑战</h4>
                    <ul>
                        ${reportData.planningOverview.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="feature-box">
                <h4>交易筹划效果预测</h4>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h5>年节税金额</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.annualSaving}万元</div>
                    </div>
                    <div class="metric-card">
                        <h5>交易成本降低</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.costReduction}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>流程优化率</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.processOptimization}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>实施周期</h5>
                        <div class="value" style="font-size: 18px;">${reportData.planningOverview.effectMetrics.implementationPeriod}</div>
                    </div>
                    <div class="metric-card">
                        <h5>合同优化数量</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.contractOptimization}个</div>
                    </div>
                    <div class="metric-card">
                        <h5>供应商优化率</h5>
                        <div class="value">${reportData.planningOverview.effectMetrics.supplierOptimization}%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📝 合同设计与交易结构筹划</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 合同条款税务设计</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>收入确认条款优化</h4>
                        <p><span class="paragraph-number">1</span>${reportData.contractDesign.revenueRecognitionClause.analysis}</p>
                        
                        <div class="process-chain">
                            <div class="process-step">
                                <h5>收货确认条款</h5>
                                <p>验收标准：${reportData.contractDesign.revenueRecognitionClause.deliveryAcceptance.standard}</p>
                                <p>验收期限：${reportData.contractDesign.revenueRecognitionClause.deliveryAcceptance.timeLimit}</p>
                            </div>
                            <div class="process-step">
                                <h5>付款条件设计</h5>
                                <p>分期方式：${reportData.contractDesign.revenueRecognitionClause.paymentTerms.installmentMethod}</p>
                                <p>质保金：${reportData.contractDesign.revenueRecognitionClause.paymentTerms.warrantyMoney}</p>
                            </div>
                            <div class="process-step">
                                <h5>风险转移条款</h5>
                                <p>转移时点：${reportData.contractDesign.revenueRecognitionClause.riskTransfer.timePoint}</p>
                                <p>保险责任：${reportData.contractDesign.revenueRecognitionClause.riskTransfer.insurance}</p>
                            </div>
                        </div>
                        
                        <div class="optimization-box">
                            <h4>收入确认优化效果</h4>
                            <div class="metrics-grid">
                                <div class="metric-card">
                                    <h5>时点优化节税</h5>
                                    <div class="value">${reportData.contractDesign.revenueRecognitionClause.optimizationEffect.timingOptimization}万元</div>
                                </div>
                                <div class="metric-card">
                                    <h5>现金流改善</h5>
                                    <div class="value">${reportData.contractDesign.revenueRecognitionClause.optimizationEffect.cashFlowImprovement}%</div>
                                </div>
                                <div class="metric-card">
                                    <h5>风险控制提升</h5>
                                    <div class="value">${reportData.contractDesign.revenueRecognitionClause.optimizationEffect.riskControl}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>税收优惠条款设计</h4>
                        <p><span class="paragraph-number">2</span>${reportData.contractDesign.taxIncentiveClause.analysis}</p>
                        
                        <table>
                            <tr>
                                <th>合同类型</th>
                                <th>优惠政策</th>
                                <th>适用条件</th>
                                <th>税率优惠</th>
                                <th>年节税金额</th>
                            </tr>
                            ${reportData.contractDesign.taxIncentiveClause.contractTypes.map(type => `
                                <tr>
                                    <td style="font-weight: 600;">${type.contractType}</td>
                                    <td>${type.incentivePolicy}</td>
                                    <td>${type.conditions}</td>
                                    <td style="color: #27ae60;">${type.taxRateIncentive}</td>
                                    <td style="color: #27ae60;">${type.annualSaving}万</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>关联交易条款设计</h4>
                        <p><span class="paragraph-number">3</span>${reportData.contractDesign.relatedTransactionClause.analysis}</p>
                        
                        <div class="grid-3">
                            <div class="comparison-card">
                                <h5>定价依据</h5>
                                <p><strong>独立交易原则</strong></p>
                                <p>可比价格参考：${reportData.contractDesign.relatedTransactionClause.pricingBasis.comparablePrice}</p>
                                <p>成本加成方法：${reportData.contractDesign.relatedTransactionClause.pricingBasis.costPlusMethod}</p>
                            </div>
                            <div class="comparison-card">
                                <h5>支付条件</h5>
                                <p><strong>合理商业条件</strong></p>
                                <p>付款期限：${reportData.contractDesign.relatedTransactionClause.paymentConditions.paymentTerm}</p>
                                <p>利息标准：${reportData.contractDesign.relatedTransactionClause.paymentConditions.interestRate}</p>
                            </div>
                            <div class="comparison-card">
                                <h5>争议解决</h5>
                                <p><strong>管辖约定</strong></p>
                                <p>仲裁条款：${reportData.contractDesign.relatedTransactionClause.disputeResolution.arbitration}</p>
                                <p>适用法律：${reportData.contractDesign.relatedTransactionClause.disputeResolution.applicableLaw}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 交易模式创新设计</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>供应链金融模式</h4>
                        <p><span class="paragraph-number">1</span>${reportData.contractDesign.supplyChainFinance.analysis}</p>
                        
                        <table>
                            <tr>
                                <th>金融模式</th>
                                <th>业务特点</th>
                                <th>税务处理</th>
                                <th>风险评估</th>
                                <th>节税效果</th>
                            </tr>
                            ${reportData.contractDesign.supplyChainFinance.models.map(model => `
                                <tr>
                                    <td style="font-weight: 600;">${model.type}</td>
                                    <td>${model.characteristics}</td>
                                    <td>${model.taxTreatment}</td>
                                    <td>
                                        ${model.riskLevel === '低' ? '🟢 低' :
            model.riskLevel === '中' ? '🟡 中' : '🔴 高'}
                                    </td>
                                    <td style="color: #27ae60;">${model.taxSaving}万</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>平台经济模式</h4>
                        <p><span class="paragraph-number">2</span>${reportData.contractDesign.platformEconomy.analysis}</p>
                        
                        <div class="tax-rate-comparison">
                            ${reportData.contractDesign.platformEconomy.models.map(model => `
                                <div class="tax-rate-card ${model.type === '当前模式' ? 'current' : 'optimized'}">
                                    <h5>${model.type}</h5>
                                    <div class="rate">${model.taxRate}</div>
                                    <p>${model.description}</p>
                                    <p><strong>节税：${model.saving}万元</strong></p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="optimization-box">
                            <h4>平台模式转型路径</h4>
                            <div class="contract-flow">
                                <div class="flow-step">
                                    <h5>现状分析</h5>
                                    <p>自营销售模式</p>
                                </div>
                                <div class="flow-step">
                                    <h5>模式设计</h5>
                                    <p>平台撮合服务</p>
                                </div>
                                <div class="flow-step">
                                    <h5>系统开发</h5>
                                    <p>平台技术实现</p>
                                </div>
                                <div class="flow-step">
                                    <h5>业务迁移</h5>
                                    <p>逐步转型过渡</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>跨境电商模式</h4>
                        <p><span class="paragraph-number">3</span>${reportData.contractDesign.crossBorderEcommerce.analysis}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box">
                                <h4>B2B出口模式</h4>
                                <ul>
                                    ${reportData.contractDesign.crossBorderEcommerce.b2bExport.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="feature-box">
                                <h4>B2C零售出口</h4>
                                <ul>
                                    ${reportData.contractDesign.crossBorderEcommerce.b2cExport.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 定价策略税务优化</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>转移定价策略</h4>
                        <p><span class="paragraph-number">1</span>${reportData.contractDesign.transferPricing.analysis}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>成本分摊协议</h5>
                                <div class="value">${reportData.contractDesign.transferPricing.costSharingAgreement.saving}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>技术许可费</h5>
                                <div class="value">${reportData.contractDesign.transferPricing.technologyLicensing.optimizationRate}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>商标使用费</h5>
                                <div class="value">${reportData.contractDesign.transferPricing.trademarkUsage.feeRate}%</div>
                            </div>
                            <div class="metric-card">
                                <h5>管理费分摊</h5>
                                <div class="value">${reportData.contractDesign.transferPricing.managementFeeAllocation.saving}万元</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>价格折扣与返利策略</h4>
                        <p><span class="paragraph-number">2</span>${reportData.contractDesign.discountRebate.analysis}</p>
                        
                        <table>
                            <tr>
                                <th>策略类型</th>
                                <th>当前处理</th>
                                <th>优化方案</th>
                                <th>税务影响</th>
                                <th>节税金额</th>
                            </tr>
                            ${reportData.contractDesign.discountRebate.strategies.map(strategy => `
                                <tr>
                                    <td style="font-weight: 600;">${strategy.type}</td>
                                    <td>${strategy.currentTreatment}</td>
                                    <td>${strategy.optimizedPlan}</td>
                                    <td>${strategy.taxImpact}</td>
                                    <td style="color: #27ae60;">${strategy.taxSaving}万</td>
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
            <h2 class="section-title">🔗 供应链税务管理</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 供应商管理策略</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>供应商选择标准</h4>
                        <p><span class="paragraph-number">1</span>${reportData.supplyChainManagement.supplierSelection.analysis}</p>
                        
                        <div class="supply-chain-flow">
                            <h4>供应商评价体系</h4>
                            <div class="grid-3">
                                <div class="metric-card">
                                    <h5>纳税人身份</h5>
                                    <div class="value">${reportData.supplyChainManagement.supplierSelection.taxpayerStatus.generalTaxpayerRatio}%</div>
                                    <p>一般纳税人比例</p>
                                </div>
                                <div class="metric-card">
                                    <h5>经营资质</h5>
                                    <div class="value">${reportData.supplyChainManagement.supplierSelection.businessQualification.complianceRate}%</div>
                                    <p>资质合规率</p>
                                </div>
                                <div class="metric-card">
                                    <h5>开票能力</h5>
                                    <div class="value">${reportData.supplyChainManagement.supplierSelection.invoicingCapability.specialInvoiceRate}%</div>
                                    <p>专票开具率</p>
                                </div>
                            </div>
                        </div>
                        
                        <table>
                            <tr>
                                <th>评价维度</th>
                                <th>评价指标</th>
                                <th>权重</th>
                                <th>当前得分</th>
                                <th>优化目标</th>
                            </tr>
                            ${reportData.supplyChainManagement.supplierSelection.evaluationCriteria.map(criteria => `
                                <tr>
                                    <td style="font-weight: 600;">${criteria.dimension}</td>
                                    <td>${criteria.indicator}</td>
                                    <td>${criteria.weight}%</td>
                                    <td style="color: #f39c12;">${criteria.currentScore}</td>
                                    <td style="color: #27ae60;">${criteria.targetScore}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>供应商税务风险控制</h4>
                        <p><span class="paragraph-number">2</span>${reportData.supplyChainManagement.riskControl.analysis}</p>
                        
                        <div class="grid-3">
                            <div class="analysis-item risk-low">
                                <h4>资质审查</h4>
                                <ul>
                                    ${reportData.supplyChainManagement.riskControl.qualificationReview.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="analysis-item risk-medium">
                                <h4>发票管理</h4>
                                <ul>
                                    ${reportData.supplyChainManagement.riskControl.invoiceManagement.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="analysis-item risk-medium">
                                <h4>合同管理</h4>
                                <ul>
                                    ${reportData.supplyChainManagement.riskControl.contractManagement.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>供应商结构优化</h4>
                        <p><span class="paragraph-number">3</span>${reportData.supplyChainManagement.structureOptimization.analysis}</p>
                        
                        <div class="optimization-box">
                            <h4>优化方案对比</h4>
                            <div class="grid-2">
                                <div class="comparison-card">
                                    <h5>当前供应商结构</h5>
                                    <p>集中度：${reportData.supplyChainManagement.structureOptimization.current.concentration}</p>
                                    <p>区域分布：${reportData.supplyChainManagement.structureOptimization.current.regionDistribution}</p>
                                    <p>税负成本：${reportData.supplyChainManagement.structureOptimization.current.taxCost}万元</p>
                                </div>
                                <div class="comparison-card">
                                    <h5>优化后供应商结构</h5>
                                    <p>集中度：${reportData.supplyChainManagement.structureOptimization.optimized.concentration}</p>
                                    <p>区域分布：${reportData.supplyChainManagement.structureOptimization.optimized.regionDistribution}</p>
                                    <p>税负成本：${reportData.supplyChainManagement.structureOptimization.optimized.taxCost}万元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 库存管理税务优化</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>存货计价方法选择</h4>
                        <p><span class="paragraph-number">1</span>${reportData.supplyChainManagement.inventoryManagement.analysis}</p>
                        
                        <table>
                            <tr>
                                <th>计价方法</th>
                                <th>适用场景</th>
                                <th>税务影响</th>
                                <th>成本影响</th>
                                <th>建议适用</th>
                            </tr>
                            ${reportData.supplyChainManagement.inventoryManagement.valuationMethods.map(method => `
                                <tr>
                                    <td style="font-weight: 600;">${method.method}</td>
                                    <td>${method.applicableScenario}</td>
                                    <td>${method.taxImpact}</td>
                                    <td style="color: #27ae60;">${method.costImpact}</td>
                                    <td>
                                        ${method.recommendation === '推荐' ? '🟢 推荐' :
                    method.recommendation === '可选' ? '🟡 可选' : '🔴 不推荐'}
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>存货减值管理</h4>
                        <p><span class="paragraph-number">2</span>${reportData.supplyChainManagement.inventoryImpairment.analysis}</p>
                        
                        <div class="process-chain">
                            <div class="process-step">
                                <h5>减值测试</h5>
                                <p>测试频率：${reportData.supplyChainManagement.inventoryImpairment.impairmentTest.frequency}</p>
                                <p>测试方法：${reportData.supplyChainManagement.inventoryImpairment.impairmentTest.method}</p>
                            </div>
                            <div class="process-step">
                                <h5>税务处理</h5>
                                <p>会计处理：${reportData.supplyChainManagement.inventoryImpairment.taxTreatment.accounting}</p>
                                <p>税务调整：${reportData.supplyChainManagement.inventoryImpairment.taxTreatment.taxAdjustment}</p>
                            </div>
                            <div class="process-step">
                                <h5>存货处置</h5>
                                <p>处置方式：${reportData.supplyChainManagement.inventoryImpairment.disposal.method}</p>
                                <p>损失确认：${reportData.supplyChainManagement.inventoryImpairment.disposal.lossRecognition}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>保税物流利用</h4>
                        <p><span class="paragraph-number">3</span>${reportData.supplyChainManagement.bondedLogistics.analysis}</p>
                        
                        <div class="grid-3">
                            <div class="feature-box">
                                <h4>保税仓储</h4>
                                <p><strong>节税效果：${reportData.supplyChainManagement.bondedLogistics.bondedWarehousing.taxSaving}万元</strong></p>
                                <ul>
                                    ${reportData.supplyChainManagement.bondedLogistics.bondedWarehousing.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="feature-box">
                                <h4>保税加工</h4>
                                <p><strong>节税效果：${reportData.supplyChainManagement.bondedLogistics.bondedProcessing.taxSaving}万元</strong></p>
                                <ul>
                                    ${reportData.supplyChainManagement.bondedLogistics.bondedProcessing.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="feature-box">
                                <h4>保税展示</h4>
                                <p><strong>节税效果：${reportData.supplyChainManagement.bondedLogistics.bondedDisplay.taxSaving}万元</strong></p>
                                <ul>
                                    ${reportData.supplyChainManagement.bondedLogistics.bondedDisplay.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 物流配送税务筹划</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>物流模式选择</h4>
                        <p><span class="paragraph-number">1</span>${reportData.supplyChainManagement.logisticsPlanning.analysis}</p>
                        
                        <table>
                            <tr>
                                <th>物流模式</th>
                                <th>运营成本</th>
                                <th>税务成本</th>
                                <th>管理复杂度</th>
                                <th>总成本</th>
                                <th>推荐度</th>
                            </tr>
                            ${reportData.supplyChainManagement.logisticsPlanning.logisticsModes.map(mode => `
                                <tr>
                                    <td style="font-weight: 600;">${mode.mode}</td>
                                    <td>${mode.operatingCost}万元</td>
                                    <td>${mode.taxCost}万元</td>
                                    <td>
                                        ${mode.complexity === '低' ? '🟢 低' :
                            mode.complexity === '中' ? '🟡 中' : '🔴 高'}
                                    </td>
                                    <td style="color: #e74c3c;">${mode.totalCost}万元</td>
                                    <td>
                                        ${mode.recommendation === '推荐' ? '🟢 推荐' :
                            mode.recommendation === '可选' ? '🟡 可选' : '🔴 不推荐'}
                                    </td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>运输费用优化</h4>
                        <p><span class="paragraph-number">2</span>${reportData.supplyChainManagement.transportationOptimization.analysis}</p>
                        
                        <div class="optimization-box">
                            <h4>运输方式税务对比</h4>
                            <div class="tax-rate-comparison">
                                ${reportData.supplyChainManagement.transportationOptimization.transportMethods.map(method => `
                                    <div class="tax-rate-card">
                                        <h5>${method.method}</h5>
                                        <div class="rate">${method.taxRate}%</div>
                                        <p>成本：${method.cost}万元</p>
                                        <p>时效：${method.timeEfficiency}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>仓储费用管理</h4>
                        <p><span class="paragraph-number">3</span>${reportData.supplyChainManagement.warehousingManagement.analysis}</p>
                        
                        <div class="grid-2">
                            <div class="comparison-card">
                                <h5>自建仓库</h5>
                                <p>初始投资：${reportData.supplyChainManagement.warehousingManagement.selfBuilt.initialInvestment}万元</p>
                                <p>年运营成本：${reportData.supplyChainManagement.warehousingManagement.selfBuilt.annualCost}万元</p>
                                <p>税务优惠：${reportData.supplyChainManagement.warehousingManagement.selfBuilt.taxIncentive}</p>
                            </div>
                            <div class="comparison-card">
                                <h5>租赁仓库</h5>
                                <p>租金成本：${reportData.supplyChainManagement.warehousingManagement.leased.rentCost}万元/年</p>
                                <p>管理成本：${reportData.supplyChainManagement.warehousingManagement.leased.managementCost}万元</p>
                                <p>灵活性：${reportData.supplyChainManagement.warehousingManagement.leased.flexibility}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">⚖️ 收入成本匹配优化</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 收入确认策略</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>收入确认时点筹划</h4>
                        <p><span class="paragraph-number">1</span>${reportData.revenueMatching.revenueRecognitionStrategy.analysis}</p>
                        
                        <table>
                            <tr>
                                <th>收入类型</th>
                                <th>当前确认方法</th>
                                <th>优化方案</th>
                                <th>税务影响</th>
                                <th>节税效果</th>
                            </tr>
                            ${reportData.revenueMatching.revenueRecognitionStrategy.revenueTypes.map(type => `
                                <tr>
                                    <td style="font-weight: 600;">${type.type}</td>
                                    <td>${type.currentMethod}</td>
                                    <td>${type.optimizedMethod}</td>
                                    <td>${type.taxImpact}</td>
                                    <td style="color: #27ae60;">${type.taxSaving}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>收入确认方法优化</h4>
                        <p><span class="paragraph-number">2</span>${reportData.revenueMatching.revenueMethodOptimization.analysis}</p>
                        
                        <div class="process-chain">
                            <div class="process-step">
                                <h5>履约义务识别</h5>
                                <p>单项义务：${reportData.revenueMatching.revenueMethodOptimization.performanceObligation.singleObligation}</p>
                                <p>多项义务：${reportData.revenueMatching.revenueMethodOptimization.performanceObligation.multipleObligation}</p>
                            </div>
                            <div class="process-step">
                                <h5>确认时点vs时段</h5>
                                <p>时点确认：${reportData.revenueMatching.revenueMethodOptimization.recognitionTiming.pointInTime}</p>
                                <p>时段确认：${reportData.revenueMatching.revenueMethodOptimization.recognitionTiming.overtime}</p>
                            </div>
                            <div class="process-step">
                                <h5>可变对价处理</h5>
                                <p>预期值法：${reportData.revenueMatching.revenueMethodOptimization.variableConsideration.expectedValue}</p>
                                <p>最可能值法：${reportData.revenueMatching.revenueMethodOptimization.variableConsideration.mostLikelyAmount}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>特殊收入处理</h4>
                        <p><span class="paragraph-number">3</span>${reportData.revenueMatching.specialRevenueHandling.analysis}</p>
                        
                        <div class="grid-3">
                            <div class="feature-box">
                                <h4>政府补助</h4>
                                <p><strong>优化节税：${reportData.revenueMatching.specialRevenueHandling.governmentGrants.taxSaving}万元</strong></p>
                                <ul>
                                    ${reportData.revenueMatching.specialRevenueHandling.governmentGrants.optimizations.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="feature-box">
                                <h4>捐赠收入</h4>
                                <p><strong>优化节税：${reportData.revenueMatching.specialRevenueHandling.donationRevenue.taxSaving}万元</strong></p>
                                <ul>
                                    ${reportData.revenueMatching.specialRevenueHandling.donationRevenue.optimizations.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="feature-box">
                                <h4>其他收入</h4>
                                <p><strong>优化节税：${reportData.revenueMatching.specialRevenueHandling.otherRevenue.taxSaving}万元</strong></p>
                                <ul>
                                    ${reportData.revenueMatching.specialRevenueHandling.otherRevenue.optimizations.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 成本费用扣除优化</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>直接成本管理</h4>
                        <p><span class="paragraph-number">1</span>${reportData.revenueMatching.costOptimization.directCostManagement.analysis}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>材料成本优化</h5>
                                <div class="value">${reportData.revenueMatching.costOptimization.directCostManagement.materialCost.optimizationSaving}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>人工成本优化</h5>
                                <div class="value">${reportData.revenueMatching.costOptimization.directCostManagement.laborCost.optimizationSaving}万元</div>
                            </div>
                            <div class="metric-card">
                                <h5>制造费用优化</h5>
                                <div class="value">${reportData.revenueMatching.costOptimization.directCostManagement.manufacturingOverhead.optimizationSaving}万元</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>期间费用优化</h4>
                        <p><span class="paragraph-number">2</span>${reportData.revenueMatching.costOptimization.periodExpenseOptimization.analysis}</p>
                        
                        <table>
                            <tr>
                                <th>费用类型</th>
                                <th>当前金额</th>
                                <th>扣除比例</th>
                                <th>优化方案</th>
                                <th>节税金额</th>
                            </tr>
                            ${reportData.revenueMatching.costOptimization.periodExpenseOptimization.expenseTypes.map(expense => `
                                <tr>
                                    <td style="font-weight: 600;">${expense.type}</td>
                                    <td>${expense.currentAmount}万元</td>
                                    <td>${expense.deductionRatio}%</td>
                                    <td>${expense.optimizationPlan}</td>
                                    <td style="color: #27ae60;">${expense.taxSaving}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>其他扣除项目</h4>
                        <p><span class="paragraph-number">3</span>${reportData.revenueMatching.costOptimization.otherDeductions.analysis}</p>
                        
                        <div class="grid-2">
                            <div class="analysis-item risk-low">
                                <h4>税金及附加</h4>
                                <ul>
                                    ${reportData.revenueMatching.costOptimization.otherDeductions.taxesAndSurcharges.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="analysis-item risk-low">
                                <h4>资产减值损失</h4>
                                <ul>
                                    ${reportData.revenueMatching.costOptimization.otherDeductions.assetImpairmentLoss.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 跨期损益调整</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>收入成本配比</h4>
                        <p><span class="paragraph-number">1</span>${reportData.revenueMatching.interperiodAdjustment.revenueMatchingPrinciple.analysis}</p>
                        
                        <div class="optimization-box">
                            <h4>配比原则应用</h4>
                            <div class="grid-3">
                                <div class="metric-card">
                                    <h5>因果关系配比</h5>
                                    <div class="value">${reportData.revenueMatching.interperiodAdjustment.revenueMatchingPrinciple.causalMatching.optimizationEffect}%</div>
                                </div>
                                <div class="metric-card">
                                    <h5>时间配比</h5>
                                    <div class="value">${reportData.revenueMatching.interperiodAdjustment.revenueMatchingPrinciple.timeMatching.optimizationEffect}%</div>
                                </div>
                                <div class="metric-card">
                                    <h5>直接配比</h5>
                                    <div class="value">${reportData.revenueMatching.interperiodAdjustment.revenueMatchingPrinciple.directMatching.optimizationEffect}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>税会差异处理</h4>
                        <p><span class="paragraph-number">2</span>${reportData.revenueMatching.interperiodAdjustment.taxAccountingDifferences.analysis}</p>
                        
                        <table>
                            <tr>
                                <th>差异类型</th>
                                <th>产生原因</th>
                                <th>影响金额</th>
                                <th>调整方向</th>
                                <th>优化建议</th>
                            </tr>
                            ${reportData.revenueMatching.interperiodAdjustment.taxAccountingDifferences.differences.map(diff => `
                                <tr>
                                    <td style="font-weight: 600;">${diff.type}</td>
                                    <td>${diff.cause}</td>
                                    <td>${diff.impactAmount}万元</td>
                                    <td>
                                        ${diff.adjustmentDirection === '调增' ? '🔺 调增' : '🔻 调减'}
                                    </td>
                                    <td>${diff.optimizationSuggestion}</td>
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
            <h2 class="section-title">⚠️ 合规风险评估</h2>
        </div>
        <div class="section-content">
            <div class="feature-box" style="text-align: center; margin-bottom: 30px;">
                <h4>综合合规评分</h4>
                <div style="font-size: 48px; font-weight: 700; color: #f39c12; margin: 20px 0;">
                    ${reportData.complianceAssessment.overallScore}/10
                </div>
                <p style="color: #7f8c8d; font-size: 16px;">基于交易合规性、税务风险、操作复杂度等因素综合评估</p>
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
            
            <div class="analysis-item">
                <h4>风险预警机制</h4>
                <table>
                    <tr>
                        <th>风险指标</th>
                        <th>监控频率</th>
                        <th>预警阈值</th>
                        <th>当前状态</th>
                        <th>应对措施</th>
                    </tr>
                    ${reportData.complianceAssessment.riskWarningSystem.map(risk => `
                        <tr>
                            <td style="font-weight: 600;">${risk.indicator}</td>
                            <td>${risk.monitoringFrequency}</td>
                            <td>${risk.warningThreshold}</td>
                            <td>
                                ${risk.currentStatus === '正常' ? '🟢 正常' :
                                    risk.currentStatus === '关注' ? '🟡 关注' : '🔴 预警'}
                            </td>
                            <td>${risk.countermeasures}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📝 实施方案与建议</h2>
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
                            <th>时间周期</th>
                            <th>预期收益</th>
                            <th>关键风险</th>
                            <th>成功标准</th>
                        </tr>
                        ${reportData.implementationPlan.phases.map(phase => `
                            <tr>
                                <td style="font-weight: 600;">${phase.stage}</td>
                                <td>${phase.content}</td>
                                <td>${phase.duration}</td>
                                <td style="color: #27ae60;">${phase.expectedBenefit}</td>
                                <td style="color: #e74c3c;">${phase.keyRisk}</td>
                                <td>${phase.successCriteria}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div class="grid-2">
                    <div class="analysis-item risk-medium">
                        <h4>关键实施要点</h4>
                        <ul>
                            ${reportData.implementationPlan.keyPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="analysis-item risk-low">
                        <h4>持续监控机制</h4>
                        <ul>
                            ${reportData.implementationPlan.monitoringMechanism.map(mechanism => `<li>${mechanism}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="analysis-item">
                    <h4>资源配置建议</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h5>人员投入</h5>
                            <div class="value">${reportData.implementationPlan.resourceAllocation.personnelInput}人</div>
                        </div>
                        <div class="metric-card">
                            <h5>系统投入</h5>
                            <div class="value">${reportData.implementationPlan.resourceAllocation.systemInvestment}万元</div>
                        </div>
                        <div class="metric-card">
                            <h5>培训投入</h5>
                            <div class="value">${reportData.implementationPlan.resourceAllocation.trainingInvestment}万元</div>
                        </div>
                        <div class="metric-card">
                            <h5>咨询投入</h5>
                            <div class="value">${reportData.implementationPlan.resourceAllocation.consultingInvestment}万元</div>
                        </div>
                    </div>
                </div>
                
                <div class="analysis-item">
                    <h4>效果评估指标</h4>
                    <table>
                        <tr>
                            <th>评估维度</th>
                            <th>关键指标</th>
                            <th>基准值</th>
                            <th>目标值</th>
                            <th>评估周期</th>
                        </tr>
                        ${reportData.implementationPlan.effectEvaluation.map(evaluation => `
                            <tr>
                                <td style="font-weight: 600;">${evaluation.dimension}</td>
                                <td>${evaluation.keyIndicator}</td>
                                <td>${evaluation.baselineValue}</td>
                                <td style="color: #27ae60;">${evaluation.targetValue}</td>
                                <td>${evaluation.evaluationCycle}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本报告基于现行税收法律法规和企业实际交易情况进行分析，筹划建议仅供参考。企业应确保所有交易安排符合商业实质要求，严格遵守相关法律法规，避免虚假交易和恶意税务筹划行为。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam}</p>
        <br>
        <p><strong>版权说明</strong></p>
        <p>本报告版权归智能税收筹划系统所有，未经授权不得复制、传播或用于商业用途。</p>
    </div>
</body>
</html>
    `;
};

// 导出报告数据结构
export const getTransactionArrangementReportData = () => {
    return {
        companyInfo: {
            name: "科技创新股份有限公司",
            businessType: "软件开发、技术服务、系统集成",
            transactionVolume: "3.80亿元/年",
            customerType: "大中型企业客户为主",
            supplierCount: "128家",
            contractManagement: "标准化程度中等",
            supplyChainMode: "混合模式（自营+外包）",
            logisticsMode: "第三方物流为主"
        },
        reportInfo: {
            reportDate: "2024年12月15日",
            planningPeriod: "2025年1月-2025年12月",
            reportNumber: "TA-20241215-001",
            projectTeam: "交易筹划专家团队"
        },
        planningOverview: {
            totalSaving: 485,
            transactionTypes: "销售、采购、服务、租赁、金融",
            complexity: "中等",
            complianceRisk: "可控",
            rating: "A-",
            recommendation: "全面实施",
            potential: "很大",
            riskLevel: "中等",
            roiRatio: "1:6.8",
            opportunities: [
                "合同条款设计存在较大税务优化空间，收入确认时点可进一步细化",
                "混合销售业务可通过分离降低税率，年节税潜力约43万元",
                "供应商结构调整能够提升进项抵扣效率，优化采购成本",
                "数字化交易模式创新可享受政策优惠，平台模式转型收益明显",
                "供应链金融模式引入可降低资金成本并享受优惠税率",
                "保税物流利用可实现暂缓纳税，改善现金流状况",
                "跨期损益调整机制可平衡年度间税负分布"
            ],
            challenges: [
                "现有合同模板需要全面修订，涉及法务、财务多部门协调",
                "平台模式转型需要技术系统重构，投入较大且周期较长",
                "供应商结构调整可能影响供应链稳定性，需要平衡成本与风险",
                "客户接受新合同条款的程度存在不确定性",
                "新模式的风险控制机制有待建立和完善",
                "税务政策变化可能影响筹划方案效果",
                "人员培训和能力建设需要持续投入"
            ],
            effectMetrics: {
                annualSaving: 485,
                costReduction: 15.8,
                processOptimization: 32,
                implementationPeriod: "8-12个月",
                contractOptimization: 156,
                supplierOptimization: 25
            }
        },
        contractDesign: {
            revenueRecognitionClause: {
                analysis: "公司当前合同中收入确认条款相对简单，主要依据货物交付或服务完成确认收入，未充分考虑履约义务的细分和时点安排。通过优化收入确认条款设计，可以实现收入确认时点的灵活控制，在合规前提下实现税负的时间性优化。结合新收入准则要求，重新设计合同条款架构，预计可实现年节税约65万元。",
                deliveryAcceptance: {
                    standard: "技术验收、商务验收分别约定",
                    timeLimit: "技术验收15个工作日，商务验收30个工作日"
                },
                paymentTerms: {
                    installmentMethod: "按项目里程碑分期付款",
                    warrantyMoney: "合同金额的10%作为质保金"
                },
                riskTransfer: {
                    timePoint: "客户最终验收确认时点",
                    insurance: "供应方承担运输和安装期间风险"
                },
                optimizationEffect: {
                    timingOptimization: 65,
                    cashFlowImprovement: 18,
                    riskControl: 25
                }
            },
            taxIncentiveClause: {
                analysis: "通过合同条款的精心设计，可以充分利用各项税收优惠政策。特别是在技术合同、服务合同等方面，通过明确不同业务性质的税务处理，可以享受相应的优惠税率。同时，合理安排混合销售业务的分离，避免高税率的不当适用。",
                contractTypes: [
                    {
                        contractType: "技术转让合同",
                        incentivePolicy: "技术转让所得减免",
                        conditions: "技术转让所得不超过500万元部分免税",
                        taxRateIncentive: "免税",
                        annualSaving: 35
                    },
                    {
                        contractType: "技术开发合同",
                        incentivePolicy: "研发费用加计扣除",
                        conditions: "符合研发活动定义的开发支出",
                        taxRateIncentive: "100%加计扣除",
                        annualSaving: 28
                    },
                    {
                        contractType: "技术服务合同",
                        incentivePolicy: "现代服务业优惠",
                        conditions: "信息技术服务业务",
                        taxRateIncentive: "6%增值税率",
                        annualSaving: 22
                    },
                    {
                        contractType: "软件销售合同",
                        incentivePolicy: "软件产品即征即退",
                        conditions: "自主开发销售的软件产品",
                        taxRateIncentive: "实际税负超过3%部分即征即退",
                        annualSaving: 45
                    }
                ]
            },
            relatedTransactionClause: {
                analysis: "公司与关联企业间的交易需要严格遵循独立交易原则，通过完善关联交易条款设计，确保定价合理性和合规性。建立健全的关联交易管理制度，完善定价依据和支付条件，避免税务调整风险，同时在合规前提下实现税负优化。",
                pricingBasis: {
                    comparablePrice: "参考同行业可比交易价格",
                    costPlusMethod: "成本加成5-8%的合理利润率"
                },
                paymentConditions: {
                    paymentTerm: "合同签署后30-60天内付款",
                    interestRate: "参考银行同期贷款利率确定"
                },
                disputeResolution: {
                    arbitration: "优先协商，必要时提交仲裁",
                    applicableLaw: "适用中华人民共和国法律"
                }
            },
            supplyChainFinance: {
                analysis: "供应链金融模式的引入可以为公司及其上下游企业提供资金支持，同时享受金融服务业的税收待遇。通过应收账款保理、存货融资等方式，不仅可以优化现金流，还能在一定程度上降低整体税负。需要注意的是，要确保业务的真实性和合规性。",
                models: [
                    {
                        type: "应收账款保理",
                        characteristics: "将应收账款转让给金融机构获得资金",
                        taxTreatment: "保理费用可税前扣除，利息支出合理扣除",
                        riskLevel: "中",
                        taxSaving: 25
                    },
                    {
                        type: "存货融资",
                        characteristics: "以存货作为质押获得银行融资",
                        taxTreatment: "融资利息可税前扣除，质押费用可扣除",
                        riskLevel: "中",
                        taxSaving: 18
                    },
                    {
                        type: "预付款融资",
                        characteristics: "利用预付账款进行融资安排",
                        taxTreatment: "融资成本可合理扣除，时间差异处理",
                        riskLevel: "低",
                        taxSaving: 12
                    },
                    {
                        type: "供应链平台融资",
                        characteristics: "通过平台为供应商提供融资服务",
                        taxTreatment: "平台服务费收入适用6%增值税率",
                        riskLevel: "中",
                        taxSaving: 32
                    }
                ]
            },
            platformEconomy: {
                analysis: "平台经济模式是数字经济时代的重要商业模式创新。通过建立技术服务平台，公司可以从传统的自营销售模式转向平台撮合服务模式，享受现代服务业的优惠税率。这不仅可以降低税负，还能扩大业务规模，提升市场竞争力。",
                models: [
                    {
                        type: "当前模式",
                        taxRate: "13%",
                        description: "自营销售商品和服务",
                        saving: 0
                    },
                    {
                        type: "撮合平台",
                        taxRate: "6%",
                        description: "提供信息撮合服务",
                        saving: 58
                    },
                    {
                        type: "混合模式",
                        taxRate: "6%+13%",
                        description: "撮合与自营相结合",
                        saving: 35
                    }
                ]
            },
            crossBorderEcommerce: {
                analysis: "跨境电商业务的发展为公司提供了新的税收筹划机会。通过合理选择跨境电商模式，可以享受相关的税收优惠政策，降低整体税负。同时，跨境业务的开展还能分散经营风险，拓展市场空间。",
                b2bExport: [
                    "一般贸易出口享受出口退税政策",
                    "跨境电商B2B出口可享受简化申报流程",
                    "海外仓模式可优化物流成本和客户体验",
                    "出口退税率根据商品类别确定，软件产品退税率较高"
                ],
                b2cExport: [
                    "跨境电商零售出口享受无票免税政策",
                    "单票价值在规定限额内可享受优惠政策",
                    "通过跨境电商平台销售可简化税务处理",
                    "海外仓储模式可提升用户体验并优化税负"
                ]
            },
            transferPricing: {
                analysis: "转移定价策略的优化是关联企业间税务筹划的重要内容。通过建立合理的成本分摊协议、技术许可安排和管理费分摊机制，可以在合规前提下实现税负的合理分配。需要建立完善的转移定价文档，确保定价的合理性和可辩护性。",
                costSharingAgreement: {
                    saving: 42
                },
                technologyLicensing: {
                    optimizationRate: 15
                },
                trademarkUsage: {
                    feeRate: 3.5
                },
                managementFeeAllocation: {
                    saving: 28
                }
            },
            discountRebate: {
                analysis: "价格折扣与返利政策的税务优化可以通过调整折扣和返利的形式、时点和计算方法来实现。合理设计销售政策，既能满足商业目的，又能实现税负优化。需要注意区分销售折扣、销售折让和销售返利的不同税务处理。",
                strategies: [
                    {
                        type: "现金折扣",
                        currentTreatment: "统一按折扣后金额纳税",
                        optimizedPlan: "分别核算折扣和销售收入",
                        taxImpact: "可降低增值税和企业所得税负担",
                        taxSaving: 15
                    },
                    {
                        type: "销售返利",
                        currentTreatment: "年末统一冲减销售收入",
                        optimizedPlan: "按月计提返利费用",
                        taxImpact: "平滑税负，优化现金流",
                        taxSaving: 22
                    },
                    {
                        type: "积分奖励",
                        currentTreatment: "实际兑换时确认费用",
                        optimizedPlan: "销售时预提积分成本",
                        taxImpact: "提前扣除费用，递延纳税",
                        taxSaving: 8
                    },
                    {
                        type: "价格折让",
                        currentTreatment: "直接冲减当期收入",
                        optimizedPlan: "区分不同原因的折让处理",
                        taxImpact: "优化税务处理的时点和方式",
                        taxSaving: 12
                    }
                ]
            }
        },
        supplyChainManagement: {
            supplierSelection: {
                analysis: "供应商选择是供应链税务管理的基础环节。通过建立科学的供应商评价体系，将税务因素纳入供应商选择标准，可以优化进项抵扣结构，降低采购成本。同时，加强供应商税务合规管理，可以有效防范税务风险。",
                taxpayerStatus: {
                    generalTaxpayerRatio: 75
                },
                businessQualification: {
                    complianceRate: 85
                },
                invoicingCapability: {
                    specialInvoiceRate: 78
                },
                evaluationCriteria: [
                    {
                        dimension: "纳税人资格",
                        indicator: "一般纳税人占比",
                        weight: 20,
                        currentScore: 75,
                        targetScore: 85
                    },
                    {
                        dimension: "发票规范性",
                        indicator: "专票开具率",
                        weight: 25,
                        currentScore: 78,
                        targetScore: 90
                    },
                    {
                        dimension: "税务合规性",
                        indicator: "纳税信用等级",
                        weight: 15,
                        currentScore: 82,
                        targetScore: 90
                    },
                    {
                        dimension: "价格竞争力",
                        indicator: "综合采购成本",
                        weight: 25,
                        currentScore: 85,
                        targetScore: 88
                    },
                    {
                        dimension: "服务质量",
                        indicator: "履约及时率",
                        weight: 15,
                        currentScore: 88,
                        targetScore: 92
                    }
                ]
            },
            riskControl: {
                analysis: "供应商税务风险控制需要建立全流程管理机制，从供应商准入、合同签署、发票管理到付款结算，每个环节都要有相应的风险控制措施。通过系统化的风险管控，可以有效防范虚开发票、失控票等税务风险。",
                qualificationReview: [
                    "工商登记信息核实，确保营业执照有效性",
                    "税务登记证明查验，核实纳税人身份",
                    "银行账户信息核对，确保三流一致",
                    "纳税信用等级查询，评估税务合规水平",
                    "经营场所实地核查，验证业务真实性"
                ],
                invoiceManagement: [
                    "发票真伪验证，通过税务系统查验发票",
                    "三流一致性检查，核对发票、合同、资金流",
                    "失控票风险防范，建立预警机制",
                    "发票开具时间控制，避免跨期问题",
                    "专用发票认证管理，及时认证抵扣"
                ],
                contractManagement: [
                    "税务条款标准化，明确发票开具要求",
                    "付款条件约定，确保合规付款",
                    "税务风险分担条款，明确责任界限",
                    "违约责任约定，包含税务违法后果",
                    "合同变更管理，评估税务影响"
                ]
            },
            structureOptimization: {
                analysis: "供应商结构优化需要平衡成本效益和风险控制。通过调整供应商的集中度、区域分布和规模结构，可以实现采购成本的降低和税务效益的提升。同时，要确保供应链的稳定性和可持续性。",
                current: {
                    concentration: "前十大供应商占比65%",
                    regionDistribution: "主要集中在华东、华南地区",
                    taxCost: 285
                },
                optimized: {
                    concentration: "前十大供应商占比55%",
                    regionDistribution: "增加中西部优惠地区供应商",
                    taxCost: 245
                }
            },
            inventoryManagement: {
                analysis: "存货管理是供应链管理的核心环节。通过选择合适的存货计价方法、建立科学的减值管理机制、充分利用保税政策，可以实现存货成本的优化和税负的合理安排。同时，要平衡存货成本与资金占用的关系。",
                valuationMethods: [
                    {
                        method: "先进先出法",
                        applicableScenario: "价格上涨环境下的通用商品",
                        taxImpact: "降低当期成本，增加当期利润",
                        costImpact: "提高税负水平",
                        recommendation: "可选"
                    },
                    {
                        method: "加权平均法",
                        applicableScenario: "价格波动较大的标准化商品",
                        taxImpact: "平滑价格波动影响",
                        costImpact: "平衡税负水平",
                        recommendation: "推荐"
                    },
                    {
                        method: "个别计价法",
                        applicableScenario: "高价值、定制化商品",
                        taxImpact: "精确成本核算",
                        costImpact: "税务筹划空间较大",
                        recommendation: "推荐"
                    },
                    {
                        method: "移动平均法",
                        applicableScenario: "频繁进出库的商品",
                        taxImpact: "实时调整成本价格",
                        costImpact: "核算复杂但精确",
                        recommendation: "可选"
                    }
                ]
            },
            inventoryImpairment: {
                analysis: "存货减值管理需要建立规范的测试程序和处理机制。通过及时识别减值迹象、合理计提减值准备、规范处置程序，可以实现会计核算与税务处理的协调，避免不必要的税务风险。",
                impairmentTest: {
                    frequency: "每季度进行一次全面测试",
                    method: "可变现净值法与成本孰低法"
                },
                taxTreatment: {
                    accounting: "按会计准则计提减值准备",
                    taxAdjustment: "实际发生损失时税前扣除"
                },
                disposal: {
                    method: "公开拍卖、协议转让、报废处理",
                    lossRecognition: "实际处置时确认损失"
                }
            },
            bondedLogistics: {
                analysis: "保税物流政策的充分利用可以为企业带来显著的资金和税务效益。通过保税仓储、保税加工、保税展示等方式，可以实现暂缓纳税、降低资金占用、优化库存管理。需要注意的是，要严格遵守海关监管要求。",
                bondedWarehousing: {
                    taxSaving: 35,
                    benefits: [
                        "暂缓缴纳进口环节税费，改善现金流",
                        "降低库存资金占用成本",
                        "享受保税区政策优惠",
                        "简化进出口手续，提高效率"
                    ]
                },
                bondedProcessing: {
                    taxSaving: 28,
                    benefits: [
                        "进料加工免征进口环节税费",
                        "出口产品享受退税政策",
                        "降低生产成本，提升竞争力",
                        "灵活调整生产安排"
                    ]
                },
                bondedDisplay: {
                    taxSaving: 15,
                    benefits: [
                        "展示期间免征进口税费",
                        "提升客户体验和销售效果",
                        "降低展示成本",
                        "灵活安排销售策略"
                    ]
                }
            },
            logisticsPlanning: {
                analysis: "物流模式的选择直接影响企业的运营成本和税务负担。通过对比自建物流、第三方物流和平台物流的综合成本效益，选择最优的物流解决方案。同时，要考虑服务质量、风险控制和未来发展需要。",
                logisticsModes: [
                    {
                        mode: "自建物流",
                        operatingCost: 180,
                        taxCost: 25,
                        complexity: "高",
                        totalCost: 205,
                        recommendation: "不推荐"
                    },
                    {
                        mode: "第三方物流",
                        operatingCost: 160,
                        taxCost: 15,
                        complexity: "中",
                        totalCost: 175,
                        recommendation: "推荐"
                    },
                    {
                        mode: "平台物流",
                        operatingCost: 155,
                        taxCost: 12,
                        complexity: "低",
                        totalCost: 167,
                        recommendation: "推荐"
                    },
                    {
                        mode: "混合模式",
                        operatingCost: 165,
                        taxCost: 18,
                        complexity: "中",
                        totalCost: 183,
                        recommendation: "可选"
                    }
                ]
            },
            transportationOptimization: {
                analysis: "运输方式的选择需要综合考虑成本、时效、税务等多个因素。虽然各种运输方式的增值税税率相同，但在成本结构、时效性、可靠性等方面存在差异。通过优化运输方式组合，可以实现总成本的最优化。",
                transportMethods: [
                    {
                        method: "公路运输",
                        taxRate: 9,
                        cost: 85,
                        timeEfficiency: "快速灵活"
                    },
                    {
                        method: "铁路运输",
                        taxRate: 9,
                        cost: 65,
                        timeEfficiency: "中等稳定"
                    },
                    {
                        method: "水路运输",
                        taxRate: 9,
                        cost: 45,
                        timeEfficiency: "较慢经济"
                    },
                    {
                        method: "航空运输",
                        taxRate: 9,
                        cost: 150,
                        timeEfficiency: "最快最贵"
                    }
                ]
            },
            warehousingManagement: {
                analysis: "仓储管理需要在自建和租赁之间做出选择。自建仓库需要较大的初始投资，但可以享受固定资产投资的税务优惠；租赁仓库虽然没有投资压力，但租金成本较高。需要根据企业的资金状况、业务规模和发展规划来确定最优方案。",
                selfBuilt: {
                    initialInvestment: 500,
                    annualCost: 120,
                    taxIncentive: "固定资产加速折旧、投资抵免等"
                },
                leased: {
                    rentCost: 180,
                    managementCost: 25,
                    flexibility: "高度灵活，可随时调整"
                }
            }
        },
        revenueMatching: {
            revenueRecognitionStrategy: {
                analysis: "收入确认策略的优化是企业税务筹划的重要内容。通过合理安排收入确认时点和方法，可以实现税负的时间性优化。需要严格遵守会计准则和税法规定，确保收入确认的合规性和合理性。",
                revenueTypes: [
                    {
                        type: "商品销售收入",
                        currentMethod: "发货时确认收入",
                        optimizedMethod: "客户验收时确认收入",
                        taxImpact: "递延纳税义务，改善现金流",
                        taxSaving: 25
                    },
                    {
                        type: "服务提供收入",
                        currentMethod: "服务完成时确认收入",
                        optimizedMethod: "按履约进度确认收入",
                        taxImpact: "平滑收入确认，平衡税负",
                        taxSaving: 18
                    },
                    {
                        type: "技术许可收入",
                        currentMethod: "一次性确认收入",
                        optimizedMethod: "按许可期间分期确认",
                        taxImpact: "分期纳税，减轻税负压力",
                        taxSaving: 32
                    },
                    {
                        type: "租赁收入",
                        currentMethod: "按月确认收入",
                        optimizedMethod: "按权责发生制确认",
                        taxImpact: "精确配比，避免跨期差异",
                        taxSaving: 8
                    }
                ]
            },
            revenueMethodOptimization: {
                analysis: "收入确认方法的优化需要基于新收入准则的要求，结合企业的实际业务特点。通过精确识别履约义务、合理确定确认时点和时段、科学处理可变对价，可以实现收入确认的精细化管理。",
                performanceObligation: {
                    singleObligation: "明确单一履约义务的确认标准",
                    multipleObligation: "合理分摊多项履约义务的交易价格"
                },
                recognitionTiming: {
                    pointInTime: "控制权转移时点的精确识别",
                    overtime: "履约进度的科学计量方法"
                },
                variableConsideration: {
                    expectedValue: "基于概率加权的预期值方法",
                    mostLikelyAmount: "基于最可能发生金额的方法"
                }
            },
            specialRevenueHandling: {
                analysis: "特殊收入项目的处理需要特别关注税务政策的具体规定。政府补助、捐赠收入等特殊收入项目在会计处理和税务处理上可能存在差异，需要做好协调和调整。",
                governmentGrants: {
                    taxSaving: 22,
                    optimizations: [
                        "与资产相关的政府补助递延确认，分期计入损益",
                        "与收益相关的政府补助区分补偿性质合理确认",
                        "享受税收优惠的政府补助合理运用政策",
                        "建立政府补助台账，规范核算流程"
                    ]
                },
                donationRevenue: {
                    taxSaving: 8,
                    optimizations: [
                        "捐赠资产按公允价值确认收入",
                        "捐赠收入确认时点的合理安排",
                        "捐赠支出的配套筹划安排",
                        "公益性捐赠税前扣除政策的充分利用"
                    ]
                },
                otherRevenue: {
                    taxSaving: 15,
                    optimizations: [
                        "违约金收入的确认时点优化",
                        "保险赔偿收入的税务处理",
                        "债务重组收益的合理安排",
                        "其他营业外收入的规范管理"
                    ]
                }
            },
            costOptimization: {
                directCostManagement: {
                    analysis: "直接成本管理是成本控制的基础。通过优化材料采购、人工配置、制造费用分配等环节，可以实现成本结构的优化和税务效益的提升。需要建立精细化的成本核算体系。",
                    materialCost: {
                        optimizationSaving: 35
                    },
                    laborCost: {
                        optimizationSaving: 28
                    },
                    manufacturingOverhead: {
                        optimizationSaving: 22
                    }
                },
                periodExpenseOptimization: {
                    analysis: "期间费用的优化需要充分利用税法规定的扣除政策。通过合理安排广告费、业务招待费、福利费等费用的支出时点和方式，可以实现税前扣除效益的最大化。",
                    expenseTypes: [
                        {
                            type: "广告费和业务宣传费",
                            currentAmount: 150,
                            deductionRatio: 15,
                            optimizationPlan: "与研发活动结合，争取加计扣除",
                            taxSaving: 12
                        },
                        {
                            type: "业务招待费",
                            currentAmount: 80,
                            deductionRatio: 60,
                            optimizationPlan: "控制在限额内，优化支出结构",
                            taxSaving: 8
                        },
                        {
                            type: "职工福利费",
                            currentAmount: 120,
                            deductionRatio: 14,
                            optimizationPlan: "合理安排福利形式，充分利用限额",
                            taxSaving: 15
                        },
                        {
                            type: "职工教育经费",
                            currentAmount: 60,
                            deductionRatio: 8,
                            optimizationPlan: "加大培训投入，享受加计扣除",
                            taxSaving: 10
                        }
                    ]
                },
                otherDeductions: {
                    analysis: "其他扣除项目的管理需要关注会计与税务的差异处理。通过建立完善的扣除项目管理制度，可以确保各项扣除的合规性和完整性。",
                    taxesAndSurcharges: [
                        "城市维护建设税的计提和缴纳管理",
                        "教育费附加和地方教育附加的优化",
                        "印花税等小税种的合规管理",
                        "土地使用税和房产税的优化策略"
                    ],
                    assetImpairmentLoss: [
                        "应收账款坏账准备的合理计提",
                        "存货跌价准备的及时确认",
                        "固定资产减值的规范处理",
                        "无形资产减值的合理安排"
                    ]
                }
            },
            interperiodAdjustment: {
                revenueMatchingPrinciple: {
                    analysis: "收入成本配比原则的应用需要确保收入与相关成本费用在同一期间确认。通过建立科学的配比机制，可以实现会计信息的准确反映和税务处理的合理安排。",
                    causalMatching: {
                        optimizationEffect: 25
                    },
                    timeMatching: {
                        optimizationEffect: 18
                    },
                    directMatching: {
                        optimizationEffect: 32
                    }
                },
                taxAccountingDifferences: {
                    analysis: "税会差异的处理是企业税务管理的重要内容。通过建立完善的差异管理机制，可以确保纳税调整的准确性和及时性，避免税务风险。",
                    differences: [
                        {
                            type: "收入确认时间差异",
                            cause: "会计与税法确认标准不同",
                            impactAmount: 85,
                            adjustmentDirection: "调增",
                            optimizationSuggestion: "优化合同条款，缩小差异"
                        },
                        {
                            type: "费用扣除标准差异",
                            cause: "税法限额与会计计提差异",
                            impactAmount: 45,
                            adjustmentDirection: "调增",
                            optimizationSuggestion: "合理控制费用支出比例"
                        },
                        {
                            type: "资产折旧方法差异",
                            cause: "折旧年限和方法不同",
                            impactAmount: 32,
                            adjustmentDirection: "调减",
                            optimizationSuggestion: "选择税务优惠折旧方法"
                        },
                        {
                            type: "减值准备差异",
                            cause: "税法不允许预提减值",
                            impactAmount: 28,
                            adjustmentDirection: "调增",
                            optimizationSuggestion: "加强减值资产处置管理"
                        }
                    ]
                }
            }
        },
        complianceAssessment: {
            overallScore: 8.2,
            categories: [
                {
                    name: "合同合规风险",
                    score: 8.5,
                    level: "低",
                    description: "合同设计优化方案符合法律法规要求，条款设计具有商业实质",
                    controlMeasures: [
                        "建立标准化合同审查流程，确保合规性",
                        "加强法务部门与财务部门协作机制",
                        "定期更新合同模板和条款，适应政策变化",
                        "建立合同执行监督机制，确保条款落实"
                    ]
                },
                {
                    name: "交易模式风险",
                    score: 7.8,
                    level: "中",
                    description: "新交易模式具有创新性，但需要关注政策适用和执行风险",
                    controlMeasures: [
                        "深入研究平台经济等新模式的政策规定",
                        "建立与税务机关的沟通确认机制",
                        "制定新模式风险评估和应对预案",
                        "加强业务人员培训，提升执行能力"
                    ]
                },
                {
                    name: "供应链管理风险",
                    score: 8.3,
                    level: "低",
                    description: "供应链优化方案操作性强，风险控制措施完善",
                    controlMeasures: [
                        "建立供应商税务合规评价体系",
                        "完善发票管理和风险防控机制",
                        "加强供应商关系管理，确保配合度",
                        "建立供应链风险预警和应急机制"
                    ]
                },
                {
                    name: "收入成本匹配风险",
                    score: 8.4,
                    level: "低",
                    description: "收入成本匹配优化符合会计准则和税法要求",
                    controlMeasures: [
                        "建立收入确认标准操作程序",
                        "完善成本费用核算和分配机制",
                        "加强税会差异分析和调整管理",
                        "定期评估收入成本匹配的合理性"
                    ]
                },
                {
                    name: "政策变化风险",
                    score: 7.6,
                    level: "中",
                    description: "部分筹划方案依赖政策解释，存在政策变化风险",
                    controlMeasures: [
                        "密切关注税收政策动态和趋势变化",
                        "建立政策解读和影响评估机制",
                        "制定政策变化应对和调整预案",
                        "加强与专业机构和税务部门的沟通"
                    ]
                },
                {
                    name: "操作执行风险",
                    score: 8.0,
                    level: "中",
                    description: "方案实施涉及多个环节，需要加强执行质量控制",
                    controlMeasures: [
                        "制定详细的操作执行手册和流程",
                        "建立分工明确的执行团队和责任机制",
                        "加强执行过程监控和质量检查",
                        "建立执行效果评估和改进机制"
                    ]
                }
            ],
            riskWarningSystem: [
                {
                    indicator: "合同条款执行率",
                    monitoringFrequency: "月度",
                    warningThreshold: "低于90%",
                    currentStatus: "正常",
                    countermeasures: "加强合同执行监督，及时纠正偏差"
                },
                {
                    indicator: "供应商合规率",
                    monitoringFrequency: "季度",
                    warningThreshold: "低于85%",
                    currentStatus: "正常",
                    countermeasures: "强化供应商管理，淘汰不合规供应商"
                },
                {
                    indicator: "税会差异率",
                    monitoringFrequency: "月度",
                    warningThreshold: "超过5%",
                    currentStatus: "关注",
                    countermeasures: "优化业务流程，减少税会差异"
                },
                {
                    indicator: "政策变化影响度",
                    monitoringFrequency: "实时",
                    warningThreshold: "重大政策变化",
                    currentStatus: "正常",
                    countermeasures: "及时调整筹划方案，适应政策变化"
                }
            ]
        },
        implementationPlan: {
            overallStrategy: "采用'试点先行、分步推进、风险可控、效果可测'的实施策略，优先推进风险较低、效果明显的优化措施，逐步完善交易安排的税务筹划体系。实施过程中要严格遵守合规要求，确保所有交易安排具有真实的商业实质，建立有效的风险控制机制和持续改进机制。",
            phases: [
                {
                    stage: "第一阶段（试点启动）",
                    content: "合同模板优化、混合销售分离、收入确认条款完善",
                    duration: "1-2个月",
                    expectedBenefit: "节税约85万元",
                    keyRisk: "客户接受度和合作配合",
                    successCriteria: "新合同签约率达到80%以上"
                },
                {
                    stage: "第二阶段（供应链优化）",
                    content: "供应商结构调整、采购流程优化、库存管理改进",
                    duration: "2-4个月",
                    expectedBenefit: "节税约125万元",
                    keyRisk: "供应链稳定性影响",
                    successCriteria: "供应商合规率提升至90%以上"
                },
                {
                    stage: "第三阶段（模式创新）",
                    content: "平台模式转型、供应链金融引入、数字化业务拓展",
                    duration: "4-8个月",
                    expectedBenefit: "节税约180万元",
                    keyRisk: "技术实现和业务转型",
                    successCriteria: "平台业务占比达到30%以上"
                },
                {
                    stage: "第四阶段（全面优化）",
                    content: "定价策略完善、收入成本匹配优化、跨期调整机制建立",
                    duration: "6-12个月",
                    expectedBenefit: "节税约95万元",
                    keyRisk: "系统性改造复杂度",
                    successCriteria: "整体税负率降低15%以上"
                }
            ],
            keyPoints: [
                "确保所有交易安排具有真实的商业目的和经济实质，避免纯粹为税务目的的安排",
                "建立完善的合同管理和审查制度，确保税务条款的有效执行",
                "加强财务核算和税务管理的精细化水平，提升数据质量和分析能力",
                "建立供应商税务合规评价和管理体系，强化风险防控",
                "完善内部控制制度和风险防范机制，确保方案执行的合规性",
                "加强相关人员的税务知识培训和能力建设，提升执行质量",
                "建立与税务机关的良好沟通机制，及时获取政策指导",
                "制定应急预案和风险应对措施，确保业务连续性"
            ],
            monitoringMechanism: [
                "定期评估合同执行效果和税务影响，及时发现和解决问题",
                "监控供应商合规状况和发票质量，防范税务风险",
                "跟踪平台业务发展和政策享受情况，优化业务模式",
                "分析定价策略执行效果和风险状况，调整策略参数",
                "检查内控制度执行情况和改进需求，持续完善管理",
                "关注税收政策变化对筹划方案的影响，及时调整应对",
                "建立关键指标监控体系，实现可视化管理",
                "定期开展内部审计和外部评估，确保合规有效"
            ],
            resourceAllocation: {
                personnelInput: 12,
                systemInvestment: 85,
                trainingInvestment: 25,
                consultingInvestment: 40
            },
            effectEvaluation: [
                {
                    dimension: "税务效益",
                    keyIndicator: "年度节税金额",
                    baselineValue: "0万元",
                    targetValue: "485万元",
                    evaluationCycle: "月度"
                },
                {
                    dimension: "成本控制",
                    keyIndicator: "综合税负率",
                    baselineValue: "15.8%",
                    targetValue: "13.3%",
                    evaluationCycle: "季度"
                },
                {
                    dimension: "流程效率",
                    keyIndicator: "合同签署周期",
                    baselineValue: "15天",
                    targetValue: "10天",
                    evaluationCycle: "月度"
                },
                {
                    dimension: "合规质量",
                    keyIndicator: "税务合规评分",
                    baselineValue: "7.8分",
                    targetValue: "9.0分",
                    evaluationCycle: "季度"
                },
                {
                    dimension: "供应链优化",
                    keyIndicator: "供应商合规率",
                    baselineValue: "85%",
                    targetValue: "95%",
                    evaluationCycle: "月度"
                }
            ]
        }
    };
};