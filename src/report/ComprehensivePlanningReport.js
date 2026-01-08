// src/report/ComprehensivePlanningReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>综合税务筹划报告</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif;
            line-height: 1.8;
            color: #2c3e50;
            max-width: 1400px;
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
            border-bottom: 4px solid #8e44ad;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 40px 30px 30px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        
        .header h1 {
            color: #8e44ad;
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .header .subtitle {
            color: #7f8c8d;
            font-size: 18px;
            font-weight: 500;
        }
        
        .executive-summary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
            padding: 40px;
            margin: 40px 0;
            position: relative;
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
        }
        
        .executive-summary::before {
            content: "⭐";
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 28px;
        }
        
        .executive-summary h2 {
            color: white;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 25px;
            border-bottom: 2px solid rgba(255,255,255,0.3);
            padding-bottom: 15px;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }
        
        .summary-card {
            background: rgba(255,255,255,0.15);
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
        }
        
        .summary-card h4 {
            color: rgba(255,255,255,0.9);
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        .summary-card .value {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .company-overview {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .info-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            border: 1px solid #e9ecef;
            transition: transform 0.3s ease;
        }
        
        .info-card:hover {
            transform: translateY(-5px);
        }
        
        .info-card h3 {
            color: #8e44ad;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 2px solid #ecf0f1;
        }
        
        .info-card p {
            margin: 8px 0;
            padding: 5px 0;
            border-bottom: 1px dotted #bdc3c7;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
        }
        
        .info-card p:last-child {
            border-bottom: none;
        }
        
        .dimension-section {
            margin-bottom: 50px;
            background: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.08);
            border: 1px solid #e9ecef;
        }
        
        .dimension-header {
            background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%);
            color: white;
            padding: 25px 30px;
            margin-bottom: 0;
        }
        
        .dimension-title {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .dimension-content {
            padding: 30px;
        }
        
        .planning-item {
            margin-bottom: 30px;
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            border-left: 5px solid #8e44ad;
            position: relative;
        }
        
        .planning-item::before {
            content: "💡";
            position: absolute;
            left: 25px;
            top: 25px;
            font-size: 16px;
        }
        
        .planning-item h4 {
            color: #2c3e50;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 25px;
            padding-bottom: 8px;
            border-bottom: 2px solid #ecf0f1;
        }
        
        .planning-item p {
            text-align: justify;
            margin-bottom: 15px;
            text-indent: 2em;
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
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            border: 2px solid #8e44ad;
            transition: transform 0.3s ease;
        }
        
        .highlight-card:hover {
            transform: scale(1.05);
        }
        
        .highlight-card h3 {
            color: #6a1b9a;
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
        
        .metrics-dashboard {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            border: 2px solid #dee2e6;
        }
        
        .metrics-dashboard h4 {
            color: #495057;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 25px;
            text-align: center;
            padding-bottom: 15px;
            border-bottom: 2px solid #ced4da;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .metric-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #ecf0f1;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .metric-card:hover {
            border-color: #8e44ad;
            transform: translateY(-3px);
        }
        
        .metric-card::before {
            content: "●";
            position: absolute;
            top: 10px;
            right: 15px;
            color: #8e44ad;
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
        
        .dimension-matrix {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        
        .matrix-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .matrix-table th,
        .matrix-table td {
            border: 1px solid #dee2e6;
            padding: 12px;
            text-align: center;
            font-size: 14px;
        }
        
        .matrix-table th {
            background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%);
            color: white;
            font-weight: 600;
        }
        
        .matrix-table tr:hover {
            background: #f8f9fa;
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
        
        .risk-assessment {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border: 2px solid #ff9800;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .risk-assessment h4 {
            color: #ef6c00;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .risk-item {
            background: white;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #ff9800;
        }
        
        .implementation-roadmap {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px solid #2196f3;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
        }
        
        .implementation-roadmap h4 {
            color: #1976d2;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 25px;
            text-align: center;
        }
        
        .roadmap-timeline {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 25px 0;
            position: relative;
        }
        
        .roadmap-timeline::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: #2196f3;
            z-index: 1;
        }
        
        .timeline-point {
            background: white;
            border: 3px solid #2196f3;
            border-radius: 50%;
            padding: 15px;
            text-align: center;
            position: relative;
            z-index: 2;
            flex: 1;
            margin: 0 10px;
            min-width: 120px;
        }
        
        .timeline-point h6 {
            color: #1976d2;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .timeline-point p {
            color: #2196f3;
            font-size: 10px;
            margin: 0;
            text-indent: 0;
        }
        
        .table-responsive {
            width: 100%;
            overflow-x: auto;
            margin: 25px 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
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
            color: #8e44ad;
            font-size: 8px;
            top: 0.6em;
        }
        
        .conclusion-section {
            background: linear-gradient(135deg, #f1f8ff 0%, #deecff 100%);
            border: 3px solid #4dabf7;
            border-radius: 15px;
            padding: 40px;
            margin: 40px 0;
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
            background: linear-gradient(135deg, #8e44ad, #9b59b6);
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
        
        .synergy-analysis {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .synergy-analysis h4 {
            color: #2e7d32;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
        }
        
        @media print {
            body { 
                margin: 0; 
                padding: 20px; 
                font-size: 12px;
            }
            .dimension-section { 
                page-break-inside: avoid; 
                margin-bottom: 30px;
            }
            .header {
                padding: 20px;
            }
        }
        
        @media (max-width: 768px) {
            .company-overview,
            .grid-2,
            .grid-3,
            .grid-4 {
                grid-template-columns: 1fr;
            }
            
            .roadmap-timeline {
                flex-direction: column;
            }
            
            .timeline-point {
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
        <h1>综合税务筹划报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="executive-summary">
        <h2>🎯 执行摘要</h2>
        <p>本综合税务筹划报告从企业架构设计、税种专项筹划、资本运作、政策利用、国际布局、业务重构、交易安排、风险管控八个维度，为企业制定了全方位、系统性的税务优化方案。通过科学的筹划设计和严谨的风险控制，预计可实现年节税<span class="highlight-text">${reportData.executiveSummary.totalSaving}万元</span>，综合税负率下降<span class="highlight-text">${reportData.executiveSummary.taxReductionRate}个百分点</span>，为企业可持续发展奠定坚实的税务基础。</p>
        
        <div class="summary-grid">
            <div class="summary-card">
                <h4>筹划维度</h4>
                <div class="value">${reportData.executiveSummary.dimensions}个</div>
            </div>
            <div class="summary-card">
                <h4>年节税总额</h4>
                <div class="value">${reportData.executiveSummary.totalSaving}万</div>
            </div>
            <div class="summary-card">
                <h4>实施周期</h4>
                <div class="value">${reportData.executiveSummary.implementationPeriod}</div>
            </div>
            <div class="summary-card">
                <h4>投资回报率</h4>
                <div class="value">${reportData.executiveSummary.roi}%</div>
            </div>
            <div class="summary-card">
                <h4>风险等级</h4>
                <div class="value">${reportData.executiveSummary.riskLevel}</div>
            </div>
            <div class="summary-card">
                <h4>合规评级</h4>
                <div class="value">${reportData.executiveSummary.complianceRating}</div>
            </div>
        </div>
    </div>

    <div class="company-overview">
        <div class="info-card">
            <h3>🏢 企业基本情况</h3>
            <p><strong>企业名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>行业分类</strong><span>${reportData.companyInfo.industry}</span></p>
            <p><strong>企业规模</strong><span>${reportData.companyInfo.scale}</span></p>
            <p><strong>年营业收入</strong><span>${reportData.companyInfo.annualRevenue}</span></p>
            <p><strong>注册地址</strong><span>${reportData.companyInfo.registrationLocation}</span></p>
            <p><strong>员工人数</strong><span>${reportData.companyInfo.employeeCount}</span></p>
            <p><strong>主要业务</strong><span>${reportData.companyInfo.mainBusiness}</span></p>
            <p><strong>发展阶段</strong><span>${reportData.companyInfo.developmentStage}</span></p>
        </div>
        
        <div class="info-card">
            <h3>📊 税务现状分析</h3>
            <p><strong>当前综合税负率</strong><span>${reportData.taxStatus.currentTaxBurdenRate}</span></p>
            <p><strong>主要税种构成</strong><span>${reportData.taxStatus.mainTaxTypes}</span></p>
            <p><strong>年税费总额</strong><span>${reportData.taxStatus.totalTaxAmount}</span></p>
            <p><strong>纳税信用等级</strong><span>${reportData.taxStatus.creditRating}</span></p>
            <p><strong>税务合规状况</strong><span>${reportData.taxStatus.complianceStatus}</span></p>
            <p><strong>历史违规记录</strong><span>${reportData.taxStatus.violationHistory}</span></p>
            <p><strong>税务管理水平</strong><span>${reportData.taxStatus.managementLevel}</span></p>
            <p><strong>政策享受情况</strong><span>${reportData.taxStatus.policyUtilization}</span></p>
        </div>
        
        <div class="info-card">
            <h3>🎯 筹划目标与预期</h3>
            <p><strong>筹划期间</strong><span>${reportData.planningGoals.planningPeriod}</span></p>
            <p><strong>节税目标</strong><span class="highlight-text">${reportData.planningGoals.savingTarget}万元</span></p>
            <p><strong>税负优化目标</strong><span class="highlight-text">${reportData.planningGoals.taxOptimizationTarget}</span></p>
            <p><strong>合规风险控制</strong><span>${reportData.planningGoals.riskControl}</span></p>
            <p><strong>实施成功率</strong><span>${reportData.planningGoals.successRate}</span></p>
            <p><strong>投入产出比</strong><span>${reportData.planningGoals.inputOutputRatio}</span></p>
            <p><strong>管理提升目标</strong><span>${reportData.planningGoals.managementImprovement}</span></p>
            <p><strong>可持续发展</strong><span>${reportData.planningGoals.sustainableDevelopment}</span></p>
        </div>
    </div>

    <div class="metrics-dashboard">
        <h4>📈 综合筹划效果预测</h4>
        <div class="metrics-grid">
            <div class="metric-card">
                <h5>企业架构优化</h5>
                <div class="value">${reportData.planningMetrics.entityDesign.saving}万元</div>
            </div>
            <div class="metric-card">
                <h5>税种专项筹划</h5>
                <div class="value">${reportData.planningMetrics.taxSpecialized.saving}万元</div>
            </div>
            <div class="metric-card">
                <h5>资本运作筹划</h5>
                <div class="value">${reportData.planningMetrics.capitalOperation.saving}万元</div>
            </div>
            <div class="metric-card">
                <h5>政策利用筹划</h5>
                <div class="value">${reportData.planningMetrics.policyUtilization.saving}万元</div>
            </div>
            <div class="metric-card">
                <h5>国际布局筹划</h5>
                <div class="value">${reportData.planningMetrics.internationalLayout.saving}万元</div>
            </div>
            <div class="metric-card">
                <h5>业务重构筹划</h5>
                <div class="value">${reportData.planningMetrics.businessRestructuring.saving}万元</div>
            </div>
            <div class="metric-card">
                <h5>交易安排筹划</h5>
                <div class="value">${reportData.planningMetrics.transactionArrangement.saving}万元</div>
            </div>
            <div class="metric-card">
                <h5>风险管控效益</h5>
                <div class="value">${reportData.planningMetrics.riskManagement.saving}万元</div>
            </div>
        </div>
    </div>

    <div class="dimension-matrix">
        <h4>🔍 八维度筹划效果矩阵</h4>
        <div class="table-responsive">
            <table class="matrix-table">
                <tr>
                    <th>筹划维度</th>
                    <th>节税潜力</th>
                    <th>实施难度</th>
                    <th>风险等级</th>
                    <th>实施周期</th>
                    <th>投入成本</th>
                    <th>优先级</th>
                    <th>协同效应</th>
                </tr>
                ${reportData.dimensionMatrix.map(dimension => `
                    <tr>
                        <td style="font-weight: 600; text-align: left;">${dimension.name}</td>
                        <td class="${dimension.savingPotential === '高' ? 'benefit-high' : dimension.savingPotential === '中' ? 'benefit-medium' : 'benefit-low'}">${dimension.savingPotential}</td>
                        <td class="${dimension.difficulty === '低' ? 'benefit-high' : dimension.difficulty === '中' ? 'benefit-medium' : 'benefit-low'}">${dimension.difficulty}</td>
                        <td class="${dimension.riskLevel === '低' ? 'benefit-high' : dimension.riskLevel === '中' ? 'benefit-medium' : 'benefit-low'}">${dimension.riskLevel}</td>
                        <td>${dimension.timeline}</td>
                        <td>${dimension.cost}万元</td>
                        <td class="${dimension.priority === '高' ? 'benefit-high' : dimension.priority === '中' ? 'benefit-medium' : 'benefit-low'}">${dimension.priority}</td>
                        <td class="${dimension.synergy === '强' ? 'benefit-high' : dimension.synergy === '中' ? 'benefit-medium' : 'benefit-low'}">${dimension.synergy}</td>
                    </tr>
                `).join('')}
            </table>
        </div>
    </div>

    <div class="dimension-section">
        <div class="dimension-header">
            <h2 class="dimension-title">🏗️ 企业架构设计优化</h2>
        </div>
        <div class="dimension-content">
            <div class="planning-item">
                <h4>组织架构重构方案</h4>
                <p><span class="paragraph-number">1</span>${reportData.detailedPlanning.entityDesign.organizationRestructure.analysis}</p>
                
                <div class="grid-3">
                    ${reportData.detailedPlanning.entityDesign.organizationRestructure.schemes.map(scheme => `
                        <div class="highlight-card">
                            <h3>${scheme.name}</h3>
                            <div class="value">${scheme.saving}万元</div>
                            <p style="margin: 10px 0; font-size: 12px;">${scheme.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="planning-item">
                <h4>税收洼地布局策略</h4>
                <p><span class="paragraph-number">2</span>${reportData.detailedPlanning.entityDesign.taxHavenLayout.analysis}</p>
                
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th>税收洼地</th>
                            <th>优惠政策</th>
                            <th>适用条件</th>
                            <th>节税效果</th>
                            <th>实施建议</th>
                        </tr>
                        ${reportData.detailedPlanning.entityDesign.taxHavenLayout.locations.map(location => `
                            <tr>
                                <td style="font-weight: 600;">${location.name}</td>
                                <td>${location.policy}</td>
                                <td>${location.conditions}</td>
                                <td style="color: #27ae60;">${location.saving}万元</td>
                                <td>${location.recommendation}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>股权结构优化设计</h4>
                <p><span class="paragraph-number">3</span>${reportData.detailedPlanning.entityDesign.equityStructure.analysis}</p>
                
                <div class="feature-box">
                    <h4>股权架构优化效果</h4>
                    <ul>
                        ${reportData.detailedPlanning.entityDesign.equityStructure.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="dimension-section">
        <div class="dimension-header">
            <h2 class="dimension-title">📋 税种专项筹划</h2>
        </div>
        <div class="dimension-content">
            <div class="planning-item">
                <h4>增值税筹划优化</h4>
                <p><span class="paragraph-number">1</span>${reportData.detailedPlanning.taxSpecialized.vatPlanning.analysis}</p>
                
                <div class="grid-2">
                    <div class="feature-box">
                        <h4>增值税筹划要点</h4>
                        <ul>
                            ${reportData.detailedPlanning.taxSpecialized.vatPlanning.strategies.map(strategy => `<li>${strategy}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h5>预计节税</h5>
                            <div class="value">${reportData.detailedPlanning.taxSpecialized.vatPlanning.saving}万元</div>
                        </div>
                        <div class="metric-card">
                            <h5>税负降低</h5>
                            <div class="value">${reportData.detailedPlanning.taxSpecialized.vatPlanning.reduction}%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>企业所得税筹划</h4>
                <p><span class="paragraph-number">2</span>${reportData.detailedPlanning.taxSpecialized.citPlanning.analysis}</p>
                
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th>筹划类型</th>
                            <th>具体措施</th>
                            <th>节税金额</th>
                            <th>实施难度</th>
                            <th>风险评估</th>
                        </tr>
                        ${reportData.detailedPlanning.taxSpecialized.citPlanning.measures.map(measure => `
                            <tr>
                                <td style="font-weight: 600;">${measure.type}</td>
                                <td style="text-align: left;">${measure.description}</td>
                                <td style="color: #27ae60;">${measure.saving}万元</td>
                                <td>${measure.difficulty}</td>
                                <td>${measure.risk}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>其他税种优化</h4>
                <p><span class="paragraph-number">3</span>${reportData.detailedPlanning.taxSpecialized.otherTaxes.analysis}</p>
                
                <div class="grid-4">
                    ${reportData.detailedPlanning.taxSpecialized.otherTaxes.types.map(tax => `
                        <div class="highlight-card">
                            <h3>${tax.name}</h3>
                            <div class="value">${tax.saving}万元</div>
                            <p style="margin: 10px 0; font-size: 12px;">${tax.strategy}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <div class="dimension-section">
        <div class="dimension-header">
            <h2 class="dimension-title">💰 资本运作筹划</h2>
        </div>
        <div class="dimension-content">
            <div class="planning-item">
                <h4>股权投资筹划</h4>
                <p><span class="paragraph-number">1</span>${reportData.detailedPlanning.capitalOperation.equityInvestment.analysis}</p>
                
                <div class="grid-3">
                    ${reportData.detailedPlanning.capitalOperation.equityInvestment.schemes.map(scheme => `
                        <div class="highlight-card">
                            <h3>${scheme.type}</h3>
                            <div class="value">${scheme.saving}万元</div>
                            <p style="margin: 10px 0; font-size: 12px;">${scheme.benefit}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="planning-item">
                <h4>债务重组筹划</h4>
                <p><span class="paragraph-number">2</span>${reportData.detailedPlanning.capitalOperation.debtRestructuring.analysis}</p>
                
                <div class="feature-box">
                    <h4>债务重组方案对比</h4>
                    <div class="table-responsive">
                        <table>
                            <tr>
                                <th>重组方式</th>
                                <th>税务处理</th>
                                <th>节税效果</th>
                                <th>适用条件</th>
                                <th>推荐度</th>
                            </tr>
                            ${reportData.detailedPlanning.capitalOperation.debtRestructuring.methods.map(method => `
                                <tr>
                                    <td style="font-weight: 600;">${method.type}</td>
                                    <td>${method.taxTreatment}</td>
                                    <td style="color: #27ae60;">${method.saving}万元</td>
                                    <td>${method.conditions}</td>
                                    <td class="${method.recommendation === '推荐' ? 'benefit-high' : method.recommendation === '可选' ? 'benefit-medium' : 'benefit-low'}">${method.recommendation}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>企业重组筹划</h4>
                <p><span class="paragraph-number">3</span>${reportData.detailedPlanning.capitalOperation.corporateReorganization.analysis}</p>
                
                <div class="grid-2">
                    <div class="feature-box">
                        <h4>重组优势</h4>
                        <ul>
                            ${reportData.detailedPlanning.capitalOperation.corporateReorganization.advantages.map(advantage => `<li>${advantage}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h5>重组节税</h5>
                            <div class="value">${reportData.detailedPlanning.capitalOperation.corporateReorganization.saving}万元</div>
                        </div>
                        <div class="metric-card">
                            <h5>实施周期</h5>
                            <div class="value">${reportData.detailedPlanning.capitalOperation.corporateReorganization.timeline}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="dimension-section">
        <div class="dimension-header">
            <h2 class="dimension-title">🏆 政策利用筹划</h2>
        </div>
        <div class="dimension-content">
            <div class="planning-item">
                <h4>创新驱动发展政策</h4>
                <p><span class="paragraph-number">1</span>${reportData.detailedPlanning.policyUtilization.innovationDriven.analysis}</p>
                
                <div class="grid-2">
                    ${reportData.detailedPlanning.policyUtilization.innovationDriven.policies.map(policy => `
                        <div class="highlight-card">
                            <h3>${policy.name}</h3>
                            <div class="value">${policy.saving}万元</div>
                            <p style="margin: 10px 0; font-size: 12px;">${policy.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="planning-item">
                <h4>产业结构升级政策</h4>
                <p><span class="paragraph-number">2</span>${reportData.detailedPlanning.policyUtilization.industrialUpgrade.analysis}</p>
                
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th>政策类型</th>
                            <th>适用性</th>
                            <th>节税潜力</th>
                            <th>申请难度</th>
                            <th>实施建议</th>
                        </tr>
                        ${reportData.detailedPlanning.policyUtilization.industrialUpgrade.policies.map(policy => `
                            <tr>
                                <td style="font-weight: 600;">${policy.type}</td>
                                <td class="${policy.applicability === '高' ? 'benefit-high' : policy.applicability === '中' ? 'benefit-medium' : 'benefit-low'}">${policy.applicability}</td>
                                <td style="color: #27ae60;">${policy.saving}万元</td>
                                <td>${policy.difficulty}</td>
                                <td>${policy.suggestion}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>区域性优惠政策</h4>
                <p><span class="paragraph-number">3</span>${reportData.detailedPlanning.policyUtilization.regionalPolicy.analysis}</p>
                
                <div class="grid-3">
                    ${reportData.detailedPlanning.policyUtilization.regionalPolicy.regions.map(region => `
                        <div class="highlight-card">
                            <h3>${region.name}</h3>
                            <div class="value">${region.saving}万元</div>
                            <p style="margin: 10px 0; font-size: 12px;">${region.policy}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <div class="dimension-section">
        <div class="dimension-header">
            <h2 class="dimension-title">🌍 国际布局筹划</h2>
        </div>
        <div class="dimension-content">
            <div class="planning-item">
                <h4>跨境投资架构设计</h4>
                <p><span class="paragraph-number">1</span>${reportData.detailedPlanning.internationalLayout.crossBorderInvestment.analysis}</p>
                
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th>投资地区</th>
                            <th>税收优势</th>
                            <th>协定优惠</th>
                            <th>节税效果</th>
                            <th>推荐度</th>
                        </tr>
                        ${reportData.detailedPlanning.internationalLayout.crossBorderInvestment.destinations.map(dest => `
                            <tr>
                                <td style="font-weight: 600;">${dest.region}</td>
                                <td>${dest.taxAdvantage}</td>
                                <td>${dest.treatyBenefit}</td>
                                <td style="color: #27ae60;">${dest.saving}万元</td>
                                <td class="${dest.recommendation === '强烈推荐' ? 'benefit-high' : dest.recommendation === '推荐' ? 'benefit-medium' : 'benefit-low'}">${dest.recommendation}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>转让定价管理</h4>
                <p><span class="paragraph-number">2</span>${reportData.detailedPlanning.internationalLayout.transferPricing.analysis}</p>
                
                <div class="grid-2">
                    <div class="feature-box">
                        <h4>转让定价策略</h4>
                        <ul>
                            ${reportData.detailedPlanning.internationalLayout.transferPricing.strategies.map(strategy => `<li>${strategy}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h5>节税效果</h5>
                            <div class="value">${reportData.detailedPlanning.internationalLayout.transferPricing.saving}万元</div>
                        </div>
                        <div class="metric-card">
                            <h5>合规水平</h5>
                            <div class="value">${reportData.detailedPlanning.internationalLayout.transferPricing.compliance}%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>反避税规则应对</h4>
                <p><span class="paragraph-number">3</span>${reportData.detailedPlanning.internationalLayout.antiAvoidance.analysis}</p>
                
                <div class="grid-3">
                    ${reportData.detailedPlanning.internationalLayout.antiAvoidance.measures.map(measure => `
                        <div class="highlight-card">
                            <h3>${measure.rule}</h3>
                            <div class="value">${measure.complianceScore}分</div>
                            <p style="margin: 10px 0; font-size: 12px;">${measure.countermeasure}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <div class="dimension-section">
        <div class="dimension-header">
            <h2 class="dimension-title">🚀 业务重构筹划</h2>
        </div>
        <div class="dimension-content">
            <div class="planning-item">
                <h4>数字化转型机遇</h4>
                <p><span class="paragraph-number">1</span>${reportData.detailedPlanning.businessRestructuring.digitalTransformation.analysis}</p>
                
                <div class="grid-2">
                    ${reportData.detailedPlanning.businessRestructuring.digitalTransformation.opportunities.map(opportunity => `
                        <div class="highlight-card">
                            <h3>${opportunity.name}</h3>
                            <div class="value">${opportunity.saving}万元</div>
                            <p style="margin: 10px 0; font-size: 12px;">${opportunity.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="planning-item">
                <h4>价值链重构优化</h4>
                <p><span class="paragraph-number">2</span>${reportData.detailedPlanning.businessRestructuring.valueChainRestructuring.analysis}</p>
                
                <div class="feature-box">
                    <h4>价值链优化方案</h4>
                    <div class="table-responsive">
                        <table>
                            <tr>
                                <th>价值链环节</th>
                                <th>优化策略</th>
                                <th>税务影响</th>
                                <th>节税效果</th>
                            </tr>
                            ${reportData.detailedPlanning.businessRestructuring.valueChainRestructuring.segments.map(segment => `
                                <tr>
                                    <td style="font-weight: 600;">${segment.segment}</td>
                                    <td style="text-align: left;">${segment.strategy}</td>
                                    <td>${segment.taxImpact}</td>
                                    <td style="color: #27ae60;">${segment.saving}万元</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>共享服务中心建设</h4>
                <p><span class="paragraph-number">3</span>${reportData.detailedPlanning.businessRestructuring.sharedServiceCenter.analysis}</p>
                
                <div class="grid-3">
                    ${reportData.detailedPlanning.businessRestructuring.sharedServiceCenter.centers.map(center => `
                        <div class="highlight-card">
                            <h3>${center.type}</h3>
                            <div class="value">${center.saving}万元</div>
                            <p style="margin: 10px 0; font-size: 12px;">${center.benefit}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <div class="dimension-section">
        <div class="dimension-header">
            <h2 class="dimension-title">📝 交易安排筹划</h2>
        </div>
        <div class="dimension-content">
            <div class="planning-item">
                <h4>合同设计与交易结构</h4>
                <p><span class="paragraph-number">1</span>${reportData.detailedPlanning.transactionArrangement.contractDesign.analysis}</p>
                
                <div class="grid-2">
                    <div class="feature-box">
                        <h4>合同优化要点</h4>
                        <ul>
                            ${reportData.detailedPlanning.transactionArrangement.contractDesign.optimizations.map(optimization => `<li>${optimization}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h5>合同节税</h5>
                            <div class="value">${reportData.detailedPlanning.transactionArrangement.contractDesign.saving}万元</div>
                        </div>
                        <div class="metric-card">
                            <h5>效率提升</h5>
                            <div class="value">${reportData.detailedPlanning.transactionArrangement.contractDesign.efficiency}%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>供应链税务管理</h4>
                <p><span class="paragraph-number">2</span>${reportData.detailedPlanning.transactionArrangement.supplyChainManagement.analysis}</p>
                
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th>管理环节</th>
                            <th>优化措施</th>
                            <th>节税效果</th>
                            <th>实施难度</th>
                        </tr>
                        ${reportData.detailedPlanning.transactionArrangement.supplyChainManagement.segments.map(segment => `
                            <tr>
                                <td style="font-weight: 600;">${segment.segment}</td>
                                <td style="text-align: left;">${segment.optimization}</td>
                                <td style="color: #27ae60;">${segment.saving}万元</td>
                                <td>${segment.difficulty}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>收入成本匹配优化</h4>
                <p><span class="paragraph-number">3</span>${reportData.detailedPlanning.transactionArrangement.revenueMatching.analysis}</p>
                
                <div class="grid-3">
                    ${reportData.detailedPlanning.transactionArrangement.revenueMatching.strategies.map(strategy => `
                        <div class="highlight-card">
                            <h3>${strategy.type}</h3>
                            <div class="value">${strategy.saving}万元</div>
                            <p style="margin: 10px 0; font-size: 12px;">${strategy.method}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <div class="dimension-section">
        <div class="dimension-header">
            <h2 class="dimension-title">🛡️ 风险管控筹划</h2>
        </div>
        <div class="dimension-content">
            <div class="planning-item">
                <h4>风险识别与评估</h4>
                <p><span class="paragraph-number">1</span>${reportData.detailedPlanning.riskManagement.riskIdentification.analysis}</p>
                
                <div class="risk-assessment">
                    <h4>综合风险评估结果</h4>
                    <div class="grid-4">
                        ${reportData.detailedPlanning.riskManagement.riskIdentification.categories.map(category => `
                            <div class="risk-item">
                                <h5>${category.name}</h5>
                                <p><strong>风险等级：</strong>${category.level}</p>
                                <p><strong>控制状态：</strong>${category.controlStatus}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>内控制度建设</h4>
                <p><span class="paragraph-number">2</span>${reportData.detailedPlanning.riskManagement.internalControl.analysis}</p>
                
                <div class="feature-box">
                    <h4>内控体系完善度</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h5>制度完善度</h5>
                            <div class="value">${reportData.detailedPlanning.riskManagement.internalControl.systemCompleteness}%</div>
                        </div>
                        <div class="metric-card">
                            <h5>执行有效性</h5>
                            <div class="value">${reportData.detailedPlanning.riskManagement.internalControl.executionEffectiveness}%</div>
                        </div>
                        <div class="metric-card">
                            <h5>风险控制力</h5>
                            <div class="value">${reportData.detailedPlanning.riskManagement.internalControl.riskControlPower}%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="planning-item">
                <h4>动态监控调整机制</h4>
                <p><span class="paragraph-number">3</span>${reportData.detailedPlanning.riskManagement.dynamicMonitoring.analysis}</p>
                
                <div class="grid-2">
                    <div class="feature-box">
                        <h4>监控指标体系</h4>
                        <ul>
                            ${reportData.detailedPlanning.riskManagement.dynamicMonitoring.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="feature-box">
                        <h4>调整响应机制</h4>
                        <ul>
                            ${reportData.detailedPlanning.riskManagement.dynamicMonitoring.mechanisms.map(mechanism => `<li>${mechanism}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="synergy-analysis">
        <h4>🔄 协同效应分析</h4>
        <p>八个维度的税务筹划方案并非孤立存在，而是相互关联、相互促进的有机整体。通过系统性的协同设计，可以实现1+1>2的综合效应。</p>
        
        <div class="grid-2">
            <div class="feature-box">
                <h4>正向协同效应</h4>
                <ul>
                    ${reportData.synergyAnalysis.positiveEffects.map(effect => `<li>${effect}</li>`).join('')}
                </ul>
            </div>
            <div class="feature-box">
                <h4>风险协同控制</h4>
                <ul>
                    ${reportData.synergyAnalysis.riskControl.map(control => `<li>${control}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <h5>协同增效</h5>
                <div class="value">${reportData.synergyAnalysis.synergyBenefit}万元</div>
            </div>
            <div class="metric-card">
                <h5>风险降低</h5>
                <div class="value">${reportData.synergyAnalysis.riskReduction}%</div>
            </div>
            <div class="metric-card">
                <h5>管理提升</h5>
                <div class="value">${reportData.synergyAnalysis.managementImprovement}%</div>
            </div>
            <div class="metric-card">
                <h5>可持续性</h5>
                <div class="value">${reportData.synergyAnalysis.sustainability}%</div>
            </div>
        </div>
    </div>

    <div class="risk-assessment">
        <h4>⚠️ 综合风险评估</h4>
        <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 48px; font-weight: 700; color: #f39c12;">
                ${reportData.comprehensiveRisk.overallScore}/10
            </div>
            <p style="color: #7f8c8d; font-size: 16px;">综合风险等级：${reportData.comprehensiveRisk.riskLevel}</p>
        </div>
        
        <div class="grid-2">
            <div class="feature-box">
                <h4>主要风险因素</h4>
                <ul>
                    ${reportData.comprehensiveRisk.riskFactors.map(factor => `<li>${factor}</li>`).join('')}
                </ul>
            </div>
            <div class="feature-box">
                <h4>风险控制措施</h4>
                <ul>
                    ${reportData.comprehensiveRisk.controlMeasures.map(measure => `<li>${measure}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <div class="implementation-roadmap">
        <h4>📅 综合实施路线图</h4>
        <p>基于八个维度筹划方案的复杂性和关联性，制定分阶段、有重点的实施路线图，确保方案的有序推进和效果最大化。</p>
        
        <div class="roadmap-timeline">
            ${reportData.implementationRoadmap.phases.map(phase => `
                <div class="timeline-point">
                    <h6>${phase.phase}</h6>
                    <p>${phase.duration}</p>
                    <p style="color: #1976d2; font-weight: 600;">${phase.focus}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="table-responsive">
            <table>
                <tr>
                    <th>实施阶段</th>
                    <th>主要内容</th>
                    <th>预期效果</th>
                    <th>关键风险</th>
                    <th>成功标准</th>
                </tr>
                ${reportData.implementationRoadmap.detailedPhases.map(phase => `
                    <tr>
                        <td style="font-weight: 600;">${phase.stage}</td>
                        <td style="text-align: left;">${phase.content}</td>
                        <td style="color: #27ae60;">${phase.expectedBenefit}</td>
                        <td style="color: #e74c3c;">${phase.keyRisk}</td>
                        <td>${phase.successCriteria}</td>
                    </tr>
                `).join('')}
            </table>
        </div>
    </div>

    <div class="conclusion-section">
        <div class="planning-item">
            <h4>🎯 总体结论与建议</h4>
            <p><span class="paragraph-number">1</span>${reportData.conclusions.overallConclusion}</p>
            
            <div class="grid-2">
                <div class="feature-box">
                    <h4>关键成功要素</h4>
                    <ul>
                        ${reportData.conclusions.successFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
                <div class="feature-box">
                    <h4>持续改进建议</h4>
                    <ul>
                        ${reportData.conclusions.improvementSuggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="metrics-dashboard">
                <h4>预期综合效果</h4>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h5>总节税金额</h5>
                        <div class="value">${reportData.conclusions.expectedResults.totalSaving}万元</div>
                    </div>
                    <div class="metric-card">
                        <h5>税负降低幅度</h5>
                        <div class="value">${reportData.conclusions.expectedResults.taxReduction}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>投资回报率</h5>
                        <div class="value">${reportData.conclusions.expectedResults.roi}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>实施成功率</h5>
                        <div class="value">${reportData.conclusions.expectedResults.successRate}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>管理提升度</h5>
                        <div class="value">${reportData.conclusions.expectedResults.managementImprovement}%</div>
                    </div>
                    <div class="metric-card">
                        <h5>风险控制力</h5>
                        <div class="value">${reportData.conclusions.expectedResults.riskControl}%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本综合税务筹划报告基于现行税收法律法规和企业实际情况编制，所有筹划方案均以合法合规为前提，严格遵循商业实质原则。企业在实施过程中应密切关注政策变化，及时调整筹划策略，确保方案的有效性和合规性。建议企业建立专业的税务管理团队，定期评估筹划效果，持续优化税务管理水平。</p>
        <br>
        <p><strong>专业服务支持</strong></p>
        <p>🏢 税务咨询：提供专业的税务政策解读和筹划建议 | 📊 风险评估：定期开展税务风险评估和合规检查 | 🎓 培训服务：提供税务管理培训和能力提升服务 | 📞 持续支持：7×24小时专业咨询和技术支持</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam} | 📋 报告版本：${reportData.reportInfo.version} | 🔒 保密等级：${reportData.reportInfo.confidentialityLevel}</p>
        <br>
        <p><strong>版权与使用说明</strong></p>
        <p>本报告版权归智能税务筹划系统及委托企业共同所有。报告内容仅供委托企业内部使用，未经授权不得向第三方披露或用于其他商业目的。如需引用报告内容，请注明出处并获得相应授权。</p>
    </div>
</body>
</html>
    `;
};

// 导出完整的综合报告数据结构
export const getComprehensiveReportData = () => {
    return {
        companyInfo: {
            name: "科技创新集团股份有限公司",
            industry: "软件和信息技术服务业",
            scale: "大型企业（年营收10亿+）",
            annualRevenue: "12.8亿元",
            registrationLocation: "北京市海淀区",
            employeeCount: "2,850人",
            mainBusiness: "软件开发、系统集成、云计算服务、大数据分析",
            developmentStage: "快速成长期"
        },
        
        reportInfo: {
            reportDate: "2024年12月15日",
            reportNumber: "CTP-20241215-001",
            projectTeam: "综合税务筹划专家团队",
            version: "v3.0",
            confidentialityLevel: "机密"
        },
        
        executiveSummary: {
            dimensions: 8,
            totalSaving: 3850,
            implementationPeriod: "24-36个月",
            roi: 285,
            riskLevel: "中等可控",
            complianceRating: "A级",
            taxReductionRate: 3.8
        },
        
        taxStatus: {
            currentTaxBurdenRate: "18.5%",
            mainTaxTypes: "增值税、企业所得税、个人所得税",
            totalTaxAmount: "2.37亿元",
            creditRating: "A级纳税信用",
            complianceStatus: "良好",
            violationHistory: "近三年无重大违规",
            managementLevel: "中等偏上",
            policyUtilization: "部分政策未充分利用"
        },
        
        planningGoals: {
            planningPeriod: "2025-2027年",
            savingTarget: 3850,
            taxOptimizationTarget: "税负率降至14.7%",
            riskControl: "风险可控在8分以上",
            successRate: "85%以上",
            inputOutputRatio: "1:2.85",
            managementImprovement: "税务管理水平提升30%",
            sustainableDevelopment: "建立可持续的税务优化体系"
        },
        
        planningMetrics: {
            entityDesign: { saving: 485 },
            taxSpecialized: { saving: 520 },
            capitalOperation: { saving: 380 },
            policyUtilization: { saving: 720 },
            internationalLayout: { saving: 385 },
            businessRestructuring: { saving: 645 },
            transactionArrangement: { saving: 425 },
            riskManagement: { saving: 290 }
        },
        
        dimensionMatrix: [
            {
                name: "企业架构设计",
                savingPotential: "高",
                difficulty: "中",
                riskLevel: "中",
                timeline: "12-18个月",
                cost: 85,
                priority: "高",
                synergy: "强"
            },
            {
                name: "税种专项筹划",
                savingPotential: "高",
                difficulty: "低",
                riskLevel: "低",
                timeline: "6-12个月",
                cost: 45,
                priority: "高",
                synergy: "强"
            },
            {
                name: "资本运作筹划",
                savingPotential: "中",
                difficulty: "高",
                riskLevel: "中",
                timeline: "18-24个月",
                cost: 120,
                priority: "中",
                synergy: "中"
            },
            {
                name: "政策利用筹划",
                savingPotential: "高",
                difficulty: "中",
                riskLevel: "低",
                timeline: "8-15个月",
                cost: 65,
                priority: "高",
                synergy: "强"
            },
            {
                name: "国际布局筹划",
                savingPotential: "中",
                difficulty: "高",
                riskLevel: "中",
                timeline: "18-36个月",
                cost: 180,
                priority: "中",
                synergy: "中"
            },
            {
                name: "业务重构筹划",
                savingPotential: "高",
                difficulty: "高",
                riskLevel: "中",
                timeline: "24-36个月",
                cost: 280,
                priority: "高",
                synergy: "强"
            },
            {
                name: "交易安排筹划",
                savingPotential: "中",
                difficulty: "中",
                riskLevel: "低",
                timeline: "8-12个月",
                cost: 55,
                priority: "中",
                synergy: "中"
            },
            {
                name: "风险管控筹划",
                savingPotential: "低",
                difficulty: "中",
                riskLevel: "低",
                timeline: "持续进行",
                cost: 150,
                priority: "高",
                synergy: "强"
            }
        ],
        
        detailedPlanning: {
            entityDesign: {
                organizationRestructure: {
                    analysis: "通过总分公司模式向子公司模式转换，建立多层级架构体系，实现业务板块的独立核算和税负优化。同时在税收洼地设立功能性子公司，享受区域性税收优惠政策。",
                    schemes: [
                        {
                            name: "总分公司转子公司",
                            saving: 185,
                            description: "将现有分公司改制为子公司，实现独立纳税"
                        },
                        {
                            name: "业务板块分离",
                            saving: 165,
                            description: "将不同业务板块分离为独立法人实体"
                        },
                        {
                            name: "功能型子公司设立",
                            saving: 135,
                            description: "在优惠地区设立研发、销售等功能型子公司"
                        }
                    ]
                },
                taxHavenLayout: {
                    analysis: "在新疆霍尔果斯、海南自贸港等税收洼地设立子公司，享受区域性税收优惠政策，实现税负的结构性降低。",
                    locations: [
                        {
                            name: "新疆霍尔果斯",
                            policy: "企业所得税五免五减半",
                            conditions: "实际经营且符合产业目录",
                            saving: 125,
                            recommendation: "强烈推荐"
                        },
                        {
                            name: "海南自贸港",
                            policy: "15%企业所得税率",
                            conditions: "鼓励类产业且实质性运营",
                            saving: 98,
                            recommendation: "推荐"
                        },
                        {
                            name: "西藏地区",
                            policy: "15%企业所得税率",
                            conditions: "符合西部大开发目录",
                            saving: 75,
                            recommendation: "可选"
                        }
                    ]
                },
                equityStructure: {
                    analysis: "通过股权结构的重新设计，实现税负的合理分配和资本运作的税务优化，同时为未来的股权激励和资本运作预留空间。",
                    benefits: [
                        "通过持股平台设立，实现员工股权激励的税务优化",
                        "建立多层次股权架构，为资本运作预留操作空间",
                        "优化股权转让的税务处理，降低交易成本",
                        "建立完善的股权治理结构，提升企业价值"
                    ]
                }
            },
            
            taxSpecialized: {
                vatPlanning: {
                    analysis: "通过业务分离、税率差异利用、进项抵扣优化等方式，实现增值税负担的合理降低。重点关注混合销售的分离处理和现代服务业优惠政策的充分利用。",
                    strategies: [
                        "软件销售与技术服务分离，降低综合税率",
                        "充分利用软件产品增值税即征即退政策",
                        "优化供应商结构，提高进项抵扣效率",
                        "合理安排业务模式，享受现代服务业优惠税率"
                    ],
                    saving: 285,
                    reduction: 2.8
                },
                citPlanning: {
                    analysis: "通过研发费用加计扣除、高新技术企业认定、技术转让所得优惠等政策的综合运用，实现企业所得税的显著优化。",
                    measures: [
                        {
                            type: "高新技术企业认定",
                            description: "完善研发体系，申请高新技术企业资质",
                            saving: 125,
                            difficulty: "中等",
                            risk: "低"
                        },
                        {
                            type: "研发费用加计扣除",
                            description: "完善研发费用归集，享受200%加计扣除",
                            saving: 85,
                            difficulty: "低",
                            risk: "低"
                        },
                        {
                            type: "技术转让所得优惠",
                            description: "通过技术转让享受所得税减免",
                            saving: 65,
                            difficulty: "中等",
                            risk: "中"
                        }
                    ]
                },
                otherTaxes: {
                    analysis: "通过个人所得税筹划、印花税优化、城建税教育费附加减免等措施，实现其他税种的合理筹划。",
                    types: [
                        {
                            name: "个人所得税",
                            saving: 45,
                            strategy: "股权激励递延纳税"
                        },
                        {
                            name: "印花税",
                            saving: 25,
                            strategy: "合同条款优化"
                        },
                        {
                            name: "城建税及附加",
                            saving: 35,
                            strategy: "通过增值税优化间接降低"
                        },
                        {
                            name: "房产税土地税",
                            saving: 28,
                            strategy: "享受研发用房减免政策"
                        }
                    ]
                }
            },
            
            capitalOperation: {
                equityInvestment: {
                    analysis: "通过股权投资的税务筹划，实现投资收益的税务优化和资本增值的合理安排。",
                    schemes: [
                        {
                            type: "股权投资基金",
                            saving: 85,
                            benefit: "享受股息红利免税政策"
                        },
                        {
                            type: "员工持股平台",
                            saving: 65,
                            benefit: "股权激励递延纳税"
                        },
                        {
                            type: "产业投资布局",
                            saving: 125,
                            benefit: "投资抵免和免税政策"
                        }
                    ]
                },
                debtRestructuring: {
                    analysis: "通过债务重组的合理安排，实现债务成本的优化和税务负担的合理化。",
                    methods: [
                        {
                            type: "债转股",
                            taxTreatment: "按公允价值确认损益",
                            saving: 45,
                            conditions: "符合债转股条件",
                            recommendation: "推荐"
                        },
                        {
                            type: "债务豁免",
                            taxTreatment: "确认债务重组收益",
                            saving: 35,
                            conditions: "真实的债务豁免",
                            recommendation: "可选"
                        },
                        {
                            type: "债务展期",
                            taxTreatment: "重新计算利息费用",
                            saving: 25,
                            conditions: "合理的商业安排",
                            recommendation: "可选"
                        }
                    ]
                },
                corporateReorganization: {
                    analysis: "通过企业重组实现业务整合和税务优化的双重目标，包括合并、分立、收购等多种形式。",
                    advantages: [
                        "实现业务整合，提升运营效率",
                        "享受企业重组特殊性税务处理优惠",
                        "优化资产结构，提升企业价值",
                        "为未来发展预留更大空间"
                    ],
                    saving: 165,
                    timeline: "18-24个月"
                }
            },
            
            policyUtilization: {
                innovationDriven: {
                    analysis: "充分利用国家创新驱动发展战略相关的税收优惠政策，包括研发费用加计扣除、高新技术企业认定、技术转让所得优惠等。",
                    policies: [
                        {
                            name: "研发费用加计扣除",
                            saving: 285,
                            description: "制造业享受200%加计扣除政策"
                        },
                        {
                            name: "高新技术企业",
                            saving: 380,
                            description: "享受15%所得税优惠税率"
                        },
                        {
                            name: "技术转让优惠",
                            saving: 55,
                            description: "500万元以下免税政策"
                        }
                    ]
                },
                industrialUpgrade: {
                    analysis: "利用产业结构升级相关政策，包括制造业优惠、现代服务业支持、战略性新兴产业发展等政策机遇。",
                    policies: [
                        {
                            type: "智能制造",
                            applicability: "高",
                            saving: 125,
                            difficulty: "中等",
                            suggestion: "加大设备投资，享受一次性扣除"
                        },
                        {
                            type: "现代服务业",
                            applicability: "高",
                            saving: 85,
                            difficulty: "低",
                            suggestion: "业务模式调整，享受优惠税率"
                        },
                        {
                            type: "数字经济",
                            applicability: "中",
                            saving: 65,
                            difficulty: "中等",
                            suggestion: "数字化转型，享受政策支持"
                        }
                    ]
                },
                regionalPolicy: {
                    analysis: "充分利用区域性优惠政策，包括西部大开发、自贸区政策、国家级新区优惠等。",
                    regions: [
                        {
                            name: "海南自贸港",
                            saving: 120,
                            policy: "15%企业所得税率"
                        },
                        {
                            name: "西部地区",
                            saving: 95,
                            policy: "西部大开发优惠"
                        },
                        {
                            name: "自贸试验区",
                            saving: 85,
                            policy: "创新政策试点"
                        }
                    ]
                }
            },
            
            internationalLayout: {
                crossBorderInvestment: {
                    analysis: "通过跨境投资架构的合理设计，充分利用税收协定网络和国际税收优惠政策。",
                    destinations: [
                        {
                            region: "香港",
                            taxAdvantage: "16.5%所得税率",
                            treatyBenefit: "广泛的协定网络",
                            saving: 125,
                            recommendation: "强烈推荐"
                        },
                        {
                            region: "新加坡",
                            taxAdvantage: "17%所得税率",
                            treatyBenefit: "总部激励政策",
                            saving: 98,
                            recommendation: "推荐"
                        },
                        {
                            region: "荷兰",
                            taxAdvantage: "参股免税制",
                            treatyBenefit: "欧盟门户地位",
                            saving: 85,
                            recommendation: "可选"
                        }
                    ]
                },
                transferPricing: {
                    analysis: "建立完善的转让定价管理体系，确保关联交易定价的合理性和合规性。",
                    strategies: [
                        "建立成本分摊协议，合理分配研发成本",
                        "完善技术许可安排，优化知识产权收益",
                        "规范管理费分摊，确保服务的真实性",
                        "建立转让定价文档，满足合规要求"
                    ],
                    saving: 165,
                    compliance: 85
                },
                antiAvoidance: {
                    analysis: "积极应对国际反避税规则，建立合规的国际税务管理体系。",
                    measures: [
                        {
                            rule: "CFC规则",
                            complianceScore: 8.5,
                            countermeasure: "建立经济实质，避免被认定为受控外国企业"
                        },
                        {
                            rule: "一般反避税",
                            complianceScore: 8.8,
                            countermeasure: "确保商业实质，建立合理商业目的"
                        },
                        {
                            rule: "BEPS行动计划",
                            complianceScore: 8.2,
                            countermeasure: "遵循价值创造原则，完善文档要求"
                        }
                    ]
                }
            },
            
            businessRestructuring: {
                digitalTransformation: {
                    analysis: "通过数字化转型实现业务模式创新和税务优化的双重目标。",
                    opportunities: [
                        {
                            name: "平台经济模式",
                            saving: 285,
                            description: "转向平台撮合模式，享受6%增值税率"
                        },
                        {
                            name: "数字化服务",
                            saving: 165,
                            description: "提供数字化技术服务，享受优惠政策"
                        },
                        {
                            name: "云计算业务",
                            saving: 125,
                            description: "发展云计算服务，享受现代服务业优惠"
                        }
                    ]
                },
                valueChainRestructuring: {
                    analysis: "通过价值链的重新设计，实现各环节税负的优化配置。",
                    segments: [
                        {
                            segment: "研发环节",
                            strategy: "集中研发，享受加计扣除",
                            taxImpact: "增加税前扣除",
                            saving: 185
                        },
                        {
                            segment: "生产环节",
                            strategy: "智能制造升级",
                            taxImpact: "设备投资抵免",
                            saving: 125
                        },
                        {
                            segment: "销售环节",
                            strategy: "渠道模式优化",
                            taxImpact: "税率结构优化",
                            saving: 95
                        }
                    ]
                },
                sharedServiceCenter: {
                    analysis: "建立共享服务中心，实现成本的集中管理和税务的统一筹划。",
                    centers: [
                        {
                            type: "财务共享中心",
                            saving: 85,
                            benefit: "降低管理成本，提升效率"
                        },
                        {
                            type: "技术共享中心",
                            saving: 125,
                            benefit: "集中研发资源，享受政策优惠"
                        },
                        {
                            type: "采购共享中心",
                            saving: 65,
                            benefit: "统一采购，优化供应商结构"
                        }
                    ]
                }
            },
            
            transactionArrangement: {
                contractDesign: {
                    analysis: "通过合同条款的精心设计，实现交易结构的税务优化。",
                    optimizations: [
                        "收入确认时点的合理安排",
                        "混合销售业务的分离处理",
                        "关联交易定价的合规设计",
                        "税收优惠条款的充分利用"
                    ],
                    saving: 185,
                    efficiency: 25
                },
                supplyChainManagement: {
                    analysis: "通过供应链的税务管理，实现采购成本和税负的双重优化。",
                    segments: [
                        {
                            segment: "供应商管理",
                            optimization: "优化供应商结构，提升抵扣效率",
                            saving: 85,
                            difficulty: "中等"
                        },
                        {
                            segment: "库存管理",
                            optimization: "合理选择计价方法，优化存货成本",
                            saving: 65,
                            difficulty: "低"
                        },
                        {
                            segment: "物流管理",
                            optimization: "利用保税政策，优化物流成本",
                            saving: 45,
                            difficulty: "中等"
                        }
                    ]
                },
                revenueMatching: {
                    analysis: "通过收入成本的精确匹配，实现税负的时间性和结构性优化。",
                    strategies: [
                        {
                            type: "收入确认优化",
                            saving: 85,
                            method: "按履约义务分期确认"
                        },
                        {
                            type: "成本费用扣除",
                            saving: 65,
                            method: "充分利用各项扣除政策"
                        },
                        {
                            type: "跨期损益调整",
                            saving: 45,
                            method: "合理安排确认时点"
                        }
                    ]
                }
            },
            
            riskManagement: {
                riskIdentification: {
                    analysis: "建立全面的税务风险识别体系，从内外部风险源进行系统梳理。",
                    categories: [
                        {
                            name: "政策理解风险",
                            level: "中等",
                            controlStatus: "基本可控"
                        },
                        {
                            name: "业务操作风险",
                            level: "中等",
                            controlStatus: "可控"
                        },
                        {
                            name: "系统执行风险",
                            level: "低",
                            controlStatus: "可控"
                        },
                        {
                            name: "外部环境风险",
                            level: "中等",
                            controlStatus: "基本可控"
                        }
                    ]
                },
                internalControl: {
                    analysis: "建立完善的内控制度体系，确保税务管理的规范化和风险的有效控制。",
                    systemCompleteness: 85,
                    executionEffectiveness: 78,
                    riskControlPower: 82
                },
                dynamicMonitoring: {
                    analysis: "建立动态监控机制，实时掌握税务风险状况，及时响应政策变化。",
                    indicators: [
                        "综合税负率变化监控",
                        "政策享受情况跟踪",
                        "合规风险预警指标",
                        "筹划效果评估指标"
                    ],
                    mechanisms: [
                        "月度税务风险评估",
                        "季度政策影响分析",
                        "年度筹划效果评价",
                        "实时风险预警响应"
                    ]
                }
            }
        },
        
        synergyAnalysis: {
            positiveEffects: [
                "企业架构优化与政策利用的协同：通过合理的架构设计，更好地享受各项税收优惠政策",
                "业务重构与交易安排的协同：数字化转型与合同设计相结合，实现业务模式和税务处理的双重优化",
                "国际布局与资本运作的协同：跨境投资架构与资本运作相结合，实现全球税负的最优配置",
                "税种筹划与风险管控的协同：在追求税务优化的同时，建立完善的风险防控体系",
                "政策利用与业务发展的协同：通过政策引导业务发展方向，实现政策红利与商业价值的双赢"
            ],
            riskControl: [
                "建立统一的风险评估标准，避免单一维度筹划带来的风险放大",
                "通过多维度的风险分散，降低整体风险水平",
                "建立协同的合规管理体系，确保各项筹划措施的合规性",
                "通过系统性的内控建设，提升整体风险防控能力",
                "建立跨维度的风险预警机制，及时识别和应对风险"
            ],
            synergyBenefit: 580,
            riskReduction: 25,
            managementImprovement: 35,
            sustainability: 88
        },
        
        comprehensiveRisk: {
            overallScore: 8.2,
            riskLevel: "中等可控",
            riskFactors: [
                "税收政策的变化可能影响部分筹划方案的效果",
                "多维度筹划方案的复杂性增加了执行难度",
                "国际税收环境的不确定性对跨境布局形成挑战",
                "业务重构过程中的组织变革风险",
                "新技术应用和业务模式创新的合规风险"
            ],
            controlMeasures: [
                "建立政策跟踪和影响评估机制，及时调整筹划策略",
                "制定详细的实施计划和操作手册，确保执行质量",
                "加强国际税务专业能力建设，提升应对能力",
                "建立变革管理机制，确保组织变革的顺利进行",
                "加强合规审查和风险评估，确保创新的合规性"
            ]
        },
        
        implementationRoadmap: {
            phases: [
                {
                    phase: "第一阶段",
                    duration: "1-6个月",
                    focus: "基础筹划"
                },
                {
                    phase: "第二阶段",
                    duration: "7-12个月",
                    focus: "重点突破"
                },
                {
                    phase: "第三阶段",
                    duration: "13-24个月",
                    focus: "全面推进"
                },
                {
                    phase: "第四阶段",
                    duration: "25-36个月",
                    focus: "优化完善"
                }
            ],
            detailedPhases: [
                {
                    stage: "第一阶段：基础筹划实施",
                    content: "税种专项筹划、政策利用申请、基础架构调整",
                    expectedBenefit: "节税约1200万元",
                    keyRisk: "政策申请和执行风险",
                    successCriteria: "基础筹划方案100%实施到位"
                },
                {
                    stage: "第二阶段：重点突破推进",
                    content: "企业架构重构、数字化转型启动、资本运作筹划",
                    expectedBenefit: "节税约1500万元",
                    keyRisk: "架构调整和业务转型风险",
                    successCriteria: "重点项目80%达到预期目标"
                },
                {
                    stage: "第三阶段：全面推进落地",
                    content: "国际布局展开、业务重构深化、交易安排优化",
                    expectedBenefit: "节税约1800万元",
                    keyRisk: "国际业务和复杂交易风险",
                    successCriteria: "综合筹划效果达到预期85%"
                },
                {
                    stage: "第四阶段：优化完善提升",
                    content: "系统集成优化、风险管控完善、持续改进机制建立",
                    expectedBenefit: "节税约2200万元",
                    keyRisk: "系统性风险和可持续性挑战",
                    successCriteria: "建立可持续的税务优化体系"
                }
            ]
        },
        
        conclusions: {
            overallConclusion: "本综合税务筹划报告通过八个维度的系统性设计，为企业构建了全方位、多层次的税务优化体系。预计三年内可实现累计节税3850万元，综合税负率从18.5%降至14.7%，投资回报率达到285%。方案充分考虑了合规性、可操作性和可持续性，通过分阶段实施和动态调整，能够有效控制风险，确保筹划效果的实现。建议企业建立专业的税务管理团队，制定详细的实施计划，加强过程监控和效果评估，持续优化税务管理水平。",
            successFactors: [
                "企业高层的坚定支持和统一领导",
                "专业税务团队的能力建设和外部支持",
                "详细的实施计划和严格的过程管控",
                "及时的政策跟踪和方案调整机制",
                "全员的税务合规意识和执行配合",
                "完善的风险防控体系和应急预案",
                "持续的监督评估和改进优化"
            ],
            improvementSuggestions: [
                "建立税务管理信息化系统，提升管理效率和数据质量",
                "加强税务人员专业培训，提升团队整体能力水平",
                "完善内控制度和操作流程，确保筹划方案的有效执行",
                "建立政策研究和影响评估机制，及时应对环境变化",
                "加强与税务机关的沟通协调，营造良好的税企关系",
                "定期开展筹划效果评估，持续优化方案配置",
                "建立知识管理体系，积累和传承税务管理经验"
            ],
            expectedResults: {
                totalSaving: 3850,
                taxReduction: 3.8,
                roi: 285,
                successRate: 85,
                managementImprovement: 35,
                riskControl: 88
            }
        }
    };
};

// 导出方案评估函数
export const evaluatePlanningScheme = (schemeData) => {
    const totalSaving = Object.values(schemeData.planningMetrics).reduce((sum, metric) => sum + metric.saving, 0);
    const avgRisk = schemeData.dimensionMatrix.reduce((sum, dim) => {
        const riskScore = dim.riskLevel === '低' ? 3 : dim.riskLevel === '中' ? 2 : 1;
        return sum + riskScore;
    }, 0) / schemeData.dimensionMatrix.length;
    
    return {
        totalSaving,
        avgRisk,
        feasibilityScore: avgRisk * 3 + (totalSaving / 1000),
        priorityRanking: schemeData.dimensionMatrix
            .sort((a, b) => {
                const scoreA = (a.priority === '高' ? 3 : a.priority === '中' ? 2 : 1) * 
                              (a.savingPotential === '高' ? 3 : a.savingPotential === '中' ? 2 : 1);
                const scoreB = (b.priority === '高' ? 3 : b.priority === '中' ? 2 : 1) * 
                              (b.savingPotential === '高' ? 3 : b.savingPotential === '中' ? 2 : 1);
                return scoreB - scoreA;
            })
    };
};

// 导出风险评估函数
export const assessComprehensiveRisk = (reportData) => {
    const riskFactors = [
        { factor: '政策稳定性', weight: 0.25, score: 7.5 },
        { factor: '执行复杂度', weight: 0.20, score: 6.8 },
        { factor: '合规难度', weight: 0.20, score: 8.2 },
        { factor: '市场环境', weight: 0.15, score: 7.9 },
        { factor: '组织能力', weight: 0.20, score: 7.3 }
    ];
    
    const weightedScore = riskFactors.reduce((sum, factor) => {
        return sum + (factor.score * factor.weight);
    }, 0);
    
    let riskLevel;
    if (weightedScore >= 8.0) riskLevel = '低风险';
    else if (weightedScore >= 6.0) riskLevel = '中等风险';
    else riskLevel = '高风险';
    
    return {
        overallScore: weightedScore.toFixed(1),
        riskLevel,
        detailScores: riskFactors
    };
};

// 导出实施时间估算函数
export const estimateImplementationTimeline = (reportData) => {
    const phaseEstimates = reportData.dimensionMatrix.map(dimension => {
        const timeRange = dimension.timeline.split('-');
        const minTime = parseInt(timeRange[0]);
        const maxTime = parseInt(timeRange[1] || timeRange[0]);
        return {
            name: dimension.name,
            minTime,
            maxTime,
            avgTime: (minTime + maxTime) / 2
        };
    });
    
    const totalMinTime = Math.max(...phaseEstimates.map(p => p.minTime));
    const totalMaxTime = Math.max(...phaseEstimates.map(p => p.maxTime));
    
    return {
        estimatedRange: `${totalMinTime}-${totalMaxTime}个月`,
        criticalPath: phaseEstimates.filter(p => p.maxTime === totalMaxTime),
        parallelPhases: phaseEstimates.filter(p => p.maxTime < totalMaxTime)
    };
};

// 导出报告配置信息
export const ReportConfig = {
    title: "综合税务筹划报告",
    version: "3.0",
    templateType: "comprehensive",
    supportedFormats: ["html", "pdf", "docx"],
    maxDimensions: 8,
    recommendedUpdateFrequency: "半年度",
    complianceStandards: ["中国税法", "OECD指引", "BEPS行动计划"]
};