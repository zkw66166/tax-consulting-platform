// src/report/TaxPlanningReport.js
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>主体层面筹划报告</title>
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
            border-bottom: 4px solid #e74c3c;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #fff5f5 0%, #ffebee 100%);
            padding: 40px 30px 30px;
            border-radius: 8px;
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
            background: linear-gradient(135deg, #e74c3c 0%, #c62828 100%);
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
            grid-template-columns: 1fr 1fr 1fr 1fr;
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
        
        .tax-saved { 
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); 
            border-top-color: #4caf50;
        }
        
        .tax-saved::before {
            color: #4caf50;
            content: "💰";
        }
        
        .tax-risk { 
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); 
            border-top-color: #ff9800;
        }
        
        .tax-risk::before {
            color: #ff9800;
            content: "⚠";
        }
        
        .implementation { 
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); 
            border-top-color: #2196f3;
        }
        
        .implementation::before {
            color: #2196f3;
            content: "🔧";
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
        
        .feature-box {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }
        
        .feature-box::before {
            content: "📋";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 16px;
        }
        
        .feature-box h4 {
            color: #495057;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 25px;
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
        
        .check-item {
            color: #27ae60;
        }
        
        .check-item::before {
            content: "✅";
            position: absolute;
            left: -25px;
            font-size: 12px;
            top: 0.2em;
        }
        
        .timeline-item {
            background: linear-gradient(135deg, #f1f8ff 0%, #deecff 100%);
            border-left: 4px solid #2196f3;
            margin: 15px 0;
            padding: 20px 25px;
            border-radius: 0 8px 8px 0;
            position: relative;
        }
        
        .timeline-item::before {
            content: "📅";
            position: absolute;
            left: -15px;
            top: 20px;
            background: white;
            padding: 5px;
            border-radius: 50%;
            font-size: 12px;
        }
        
        .timeline-item h5 {
            color: #1976d2;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .benefit-card {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            text-align: center;
        }
        
        .benefit-card h4 {
            color: #2e7d32;
            font-size: 18px;
            margin-bottom: 15px;
        }
        
        .benefit-value {
            color: #1b5e20;
            font-size: 32px;
            font-weight: 700;
            margin: 10px 0;
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
            position: relative;
        }
        
        .footer::before {
            content: "ⓘ";
            position: absolute;
            top: 15px;
            left: 20px;
            color: #6c757d;
            font-size: 14px;
        }
        
        .footer p {
            margin: 8px 0;
            line-height: 1.6;
        }
        
        .paragraph-number {
            display: inline-block;
            background: linear-gradient(135deg, #e74c3c, #c62828);
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
            background: linear-gradient(120deg, #ffeb3b 0%, #ffc107 100%);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .warning-box {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border: 2px solid #ff9800;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .warning-box::before {
            content: "⚠️";
            font-size: 16px;
            margin-right: 10px;
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
            .company-info, .grid-2, .grid-3, .grid-4 {
                grid-template-columns: 1fr;
            }
            
            .metrics-grid {
                grid-template-columns: 1fr 1fr;
            }
            
            body {
                padding: 15px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .section-title {
                font-size: 20px;
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
        <h1>主体层面筹划报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} 主体层面筹划方案 · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>🏢 企业基本信息</h3>
            <p><strong>企业名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>注册地址</strong><span>${reportData.companyInfo.address}</span></p>
            <p><strong>成立时间</strong><span>${reportData.companyInfo.establishedDate}</span></p>
            <p><strong>注册资本</strong><span>${reportData.companyInfo.registeredCapital}</span></p>
            <p><strong>主营业务</strong><span>${reportData.companyInfo.mainBusiness}</span></p>
            <p><strong>员工人数</strong><span>${reportData.companyInfo.employees}</span></p>
        </div>
        <div class="info-card">
            <h3>📊 财务概况（2024年）</h3>
            <p><strong>营业收入</strong><span>${reportData.financialInfo.revenue}</span></p>
            <p><strong>净利润</strong><span>${reportData.financialInfo.netProfit}</span></p>
            <p><strong>研发投入</strong><span>${reportData.financialInfo.rdInvestment}</span></p>
            <p><strong>应纳税所得额</strong><span>${reportData.financialInfo.taxableIncome}</span></p>
            <p><strong>综合税负率</strong><span>${reportData.financialInfo.totalTaxRate}</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💰 税收筹划效益概览</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                <div class="highlight-card">
                    <h3>年度节税金额</h3>
                    <div class="value">${reportData.planningBenefit.annualSavings}</div>
                </div>
                <div class="highlight-card">
                    <h3>投资回报率</h3>
                    <div class="value">${reportData.planningBenefit.roi}</div>
                </div>
                <div class="highlight-card">
                    <h3>回收周期</h3>
                    <div class="value">${reportData.planningBenefit.paybackPeriod}</div>
                </div>
            </div>
            
            <div class="feature-box">
                <h4>当前税负分析</h4>
                <table>
                    <tr>
                        <th>税种</th>
                        <th>2024年税额（万元）</th>
                        <th>占比</th>
                        <th>税率</th>
                        <th>备注</th>
                    </tr>
                    ${reportData.currentTaxBurden.map(item => `
                        <tr>
                            <td>${item.taxType}</td>
                            <td>${item.amount}</td>
                            <td>${item.percentage}</td>
                            <td>${item.rate}</td>
                            <td>${item.note}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
            
            <div class="grid-2">
                <div class="analysis-item tax-saved">
                    <h4>主要优化空间</h4>
                    <ul>
                        ${reportData.planningBenefit.optimizationAreas.map(area => `<li>${area}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-item tax-risk">
                    <h4>主要问题识别</h4>
                    <ul>
                        ${reportData.currentProblems.map(problem => `<li>${problem}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🎯 主体层面筹划方案</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 企业组织形式优化</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>高新技术企业认定策略</h4>
                        <p><span class="paragraph-number">1</span>${reportData.organizationOptimization.highTechEnterprise.description}</p>
                        
                        <div class="feature-box">
                            <h4>认定可行性分析</h4>
                            <ul>
                                ${reportData.organizationOptimization.highTechEnterprise.feasibilityAnalysis.map(item => `
                                    <li class="check-item">${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="benefit-card">
                            <h4>预期效益</h4>
                            <div class="benefit-value">${reportData.organizationOptimization.highTechEnterprise.expectedBenefit}</div>
                            <p>年节税金额</p>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>软件企业认定辅助策略</h4>
                        <p><span class="paragraph-number">2</span>${reportData.organizationOptimization.softwareEnterprise.description}</p>
                        
                        <div class="benefit-card">
                            <h4>预期效益</h4>
                            <div class="benefit-value">${reportData.organizationOptimization.softwareEnterprise.expectedBenefit}</div>
                            <p>增值税即征即退</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 企业集团架构重构</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>目标集团架构设计</h4>
                        <div class="feature-box">
                            <h4>新架构布局</h4>
                            <table>
                                <tr>
                                    <th>主体名称</th>
                                    <th>注册地</th>
                                    <th>功能定位</th>
                                    <th>税收优惠</th>
                                    <th>预计规模</th>
                                </tr>
                                ${reportData.groupRestructuring.targetStructure.map(entity => `
                                    <tr>
                                        <td>${entity.name}</td>
                                        <td>${entity.location}</td>
                                        <td>${entity.function}</td>
                                        <td>${entity.taxBenefit}</td>
                                        <td>${entity.scale}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>业务重新配置方案</h4>
                        <p><span class="paragraph-number">1</span>${reportData.groupRestructuring.businessReallocation.description}</p>
                        
                        <div class="feature-box">
                            <h4>业务拆分策略</h4>
                            <table>
                                <tr>
                                    <th>原业务模块</th>
                                    <th>现有收入（万元）</th>
                                    <th>拆分后主体</th>
                                    <th>新主体收入（万元）</th>
                                    <th>税率优化</th>
                                </tr>
                                ${reportData.groupRestructuring.businessReallocation.splitStrategy.map(item => `
                                    <tr>
                                        <td>${item.originalBusiness}</td>
                                        <td>${item.currentRevenue}</td>
                                        <td>${item.newEntity}</td>
                                        <td>${item.newRevenue}</td>
                                        <td style="color: #27ae60; font-weight: bold;">${item.taxOptimization}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 注册地战略布局</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>总部迁移方案</h4>
                        <p><span class="paragraph-number">1</span>${reportData.locationStrategy.headquartersRelocation.description}</p>
                        
                        <div class="grid-2">
                            <div class="feature-box">
                                <h4>政策优势</h4>
                                <ul>
                                    ${reportData.locationStrategy.headquartersRelocation.policyAdvantages.map(advantage => `<li>${advantage}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="feature-box">
                                <h4>实施步骤</h4>
                                <ul>
                                    ${reportData.locationStrategy.headquartersRelocation.implementationSteps.map(step => `<li>${step}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>区域布局优化</h4>
                        <div class="grid-2">
                            ${reportData.locationStrategy.regionalLayout.map(region => `
                                <div class="feature-box">
                                    <h4>${region.region} - ${region.center}</h4>
                                    <p><strong>优势：</strong>${region.advantages}</p>
                                    <p><strong>优惠：</strong><span class="highlight-text">${region.benefits}</span></p>
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
            <h2 class="section-title">📅 实施计划及时间安排</h2>
        </div>
        <div class="section-content">
            <div class="feature-box">
                <h4>总体实施时间表</h4>
                <table>
                    <tr>
                        <th>阶段</th>
                        <th>时间</th>
                        <th>主要任务</th>
                        <th>预期成果</th>
                    </tr>
                    ${reportData.implementationPlan.overallSchedule.map(phase => `
                        <tr>
                            <td><strong>${phase.stage}</strong></td>
                            <td>${phase.timeline}</td>
                            <td>${phase.tasks}</td>
                            <td>${phase.outcomes}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
            
            <div class="subsection">
                <div class="subsection-header">详细实施步骤</div>
                <div class="subsection-content">
                    ${reportData.implementationPlan.detailedSteps.map(step => `
                        <div class="timeline-item">
                            <h5>${step.phase} (${step.duration})</h5>
                            <ul>
                                ${step.activities.map(activity => `<li>${activity}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="warning-box">
                <h4>关键节点控制</h4>
                <p>${reportData.implementationPlan.keyControls}</p>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💹 经济效益分析</h2>
        </div>
        <div class="section-content">
            <div class="subsection">
                <div class="subsection-header">税收节约测算</div>
                <div class="subsection-content">
                    <div class="grid-2">
                        <div class="feature-box">
                            <h4>企业所得税节约</h4>
                            <table>
                                <tr>
                                    <th>主体</th>
                                    <th>应纳税所得额（万元）</th>
                                    <th>税率</th>
                                    <th>企业所得税（万元）</th>
                                </tr>
                                ${reportData.economicBenefit.corporateTaxSavings.newStructure.map(entity => `
                                    <tr>
                                        <td>${entity.entity}</td>
                                        <td>${entity.taxableIncome}</td>
                                        <td style="color: #27ae60; font-weight: bold;">${entity.rate}</td>
                                        <td>${entity.tax}</td>
                                    </tr>
                                `).join('')}
                            </table>
                            <div class="benefit-card">
                                <h4>企业所得税节税额</h4>
                                <div class="benefit-value">${reportData.economicBenefit.corporateTaxSavings.totalSavings}</div>
                            </div>
                        </div>
                        
                        <div class="feature-box">
                            <h4>增值税节约</h4>
                            <div class="metrics-grid">
                                <div class="metric-card">
                                    <h5>即征即退</h5>
                                    <div class="value" style="color: #27ae60;">${reportData.economicBenefit.vatSavings.immediateRefund}</div>
                                </div>
                                <div class="metric-card">
                                    <h5>留抵退还</h5>
                                    <div class="value" style="color: #27ae60;">${reportData.economicBenefit.vatSavings.creditRefund}</div>
                                </div>
                            </div>
                            <div class="benefit-card">
                                <h4>增值税总节约</h4>
                                <div class="benefit-value">${reportData.economicBenefit.vatSavings.totalSavings}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="feature-box">
                        <h4>综合节税测算</h4>
                        <table>
                            <tr>
                                <th>税种</th>
                                <th>原税负（万元）</th>
                                <th>新税负（万元）</th>
                                <th>节税额（万元）</th>
                                <th>节税率</th>
                            </tr>
                            ${reportData.economicBenefit.comprehensiveSavings.map(item => `
                                <tr>
                                    <td>${item.taxType}</td>
                                    <td>${item.originalTax}</td>
                                    <td>${item.newTax}</td>
                                    <td style="color: #27ae60; font-weight: bold;">${item.savings}</td>
                                    <td style="color: #27ae60; font-weight: bold;">${item.savingsRate}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="subsection">
                <div class="subsection-header">投资回报分析</div>
                <div class="subsection-content">
                    <div class="grid-3">
                        <div class="highlight-card">
                            <h3>实施成本</h3>
                            <div class="value">${reportData.economicBenefit.investmentAnalysis.totalCost}</div>
                        </div>
                        <div class="highlight-card">
                            <h3>年节税收益</h3>
                            <div class="value">${reportData.economicBenefit.investmentAnalysis.annualSavings}</div>
                        </div>
                        <div class="highlight-card">
                            <h3>投资回报率</h3>
                            <div class="value">${reportData.economicBenefit.investmentAnalysis.roi}</div>
                        </div>
                    </div>
                    
                    <div class="feature-box">
                        <h4>三年累计效益</h4>
                        <table>
                            <tr>
                                <th>年度</th>
                                <th>节税金额（万元）</th>
                                <th>累计节税（万元）</th>
                                <th>净收益（万元）</th>
                            </tr>
                            ${reportData.economicBenefit.investmentAnalysis.threeYearBenefit.map(year => `
                                <tr>
                                    <td>${year.year}</td>
                                    <td style="color: #27ae60; font-weight: bold;">${year.annualSavings}</td>
                                    <td style="color: #27ae60; font-weight: bold;">${year.cumulativeSavings}</td>
                                    <td style="color: #27ae60; font-weight: bold;">${year.netBenefit}</td>
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
            <h2 class="section-title">⚠️ 风险评估与控制</h2>
        </div>
        <div class="section-content">
            <div class="grid-2">
                ${reportData.riskAssessment.categories.map(category => `
                    <div class="analysis-item ${category.level === '低' ? 'tax-saved' : category.level === '中' ? 'tax-risk' : 'analysis-item'}">
                        <h4>${category.name} - ${category.level}风险</h4>
                        <p><strong>风险描述：</strong>${category.description}</p>
                        <ul>
                            ${category.controlMeasures.map(measure => `<li>${measure}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="feature-box">
                <h4>风险控制矩阵</h4>
                <table>
                    <tr>
                        <th>风险类别</th>
                        <th>风险等级</th>
                        <th>发生概率</th>
                        <th>影响程度</th>
                        <th>控制措施</th>
                        <th>责任人</th>
                    </tr>
                    ${reportData.riskAssessment.controlMatrix.map(risk => `
                        <tr>
                            <td>${risk.category}</td>
                            <td><span class="highlight-text">${risk.level}</span></td>
                            <td>${risk.probability}</td>
                            <td>${risk.impact}</td>
                            <td>${risk.controlMeasures}</td>
                            <td>${risk.responsible}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📝 结论与建议</h2>
        </div>
        <div class="section-content">
            <div class="analysis-item tax-saved">
                <h4>方案总结</h4>
                <p><span class="paragraph-number">1</span>${reportData.recommendations.summary}</p>
                
                <div class="grid-4">
                    <div class="metric-card">
                        <h5>年节税金额</h5>
                        <div class="value" style="color: #27ae60;">${reportData.recommendations.keyBenefits.annualSavings}</div>
                    </div>
                    <div class="metric-card">
                        <h5>税负降幅</h5>
                        <div class="value" style="color: #27ae60;">${reportData.recommendations.keyBenefits.taxReduction}</div>
                    </div>
                    <div class="metric-card">
                        <h5>投资回报率</h5>
                        <div class="value" style="color: #27ae60;">${reportData.recommendations.keyBenefits.roi}</div>
                    </div>
                    <div class="metric-card">
                        <h5>回收期</h5>
                        <div class="value" style="color: #27ae60;">${reportData.recommendations.keyBenefits.paybackPeriod}</div>
                    </div>
                </div>
            </div>
            
            <div class="analysis-item implementation">
                <h4>实施建议</h4>
                <ul>
                    ${reportData.recommendations.implementationSuggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            </div>
            
            <div class="analysis-item">
                <h4>长期展望</h4>
                <p><span class="paragraph-number">2</span>${reportData.recommendations.longTermOutlook}</p>
                <ul>
                    ${reportData.recommendations.futureConsiderations.map(consideration => `<li>${consideration}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本税收筹划方案严格遵循国家税收法律法规，确保合法合规。方案实施过程中应密切关注政策变化，及时调整筹划策略。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 编制机构：${reportData.reportInfo.preparingInstitution}</p>
        <p>📞 联系方式：${reportData.reportInfo.contact} | ⏰ 有效期：${reportData.reportInfo.validityPeriod}</p>
    </div>
</body>
</html>
        `;
};

// 修正函数名以匹配调用
export const getEntityDesignReportData = () => {
    return {
        companyInfo: {
            name: "XX科技集团有限公司",
            address: "上海市浦东新区",
            establishedDate: "2018年3月",
            registeredCapital: "5,000万元",
            mainBusiness: "智能制造设备研发、生产、销售及技术服务",
            employees: "280人"
        },
        reportInfo: {
            reportDate: "2025年1月",
            reportNumber: "TP-20250101-001",
            preparingInstitution: "XX税务师事务所",
            contact: "400-123-4567",
            validityPeriod: "2025年1月-2027年12月"
        },
        financialInfo: {
            revenue: "3.8亿元",
            netProfit: "4,200万元",
            rdInvestment: "3,800万元（占营收10%）",
            taxableIncome: "4,500万元",
            totalTaxRate: "10.5%"
        },
        planningBenefit: {
            annualSavings: "1,585万元",
            roi: "528%",
            paybackPeriod: "2.3个月",
            optimizationAreas: [
                "企业所得税优化空间：337.5-450万元/年",
                "增值税优化空间：114-228万元/年",
                "其他税种优化空间：50-80万元/年",
                "总优化空间：500-750万元/年"
            ]
        },
        currentProblems: [
            "企业所得税负担重：未享受15%优惠税率，年多缴337.5万元",
            "组织架构单一：未充分利用小微企业优惠政策",
            "地域布局不优：未利用税收洼地和区域优惠政策",
            "集团化优势未体现：缺乏专业化分工和税收协同"
        ],
        currentTaxBurden: [
            { taxType: "企业所得税", amount: "1,125", percentage: "29.8%", rate: "25%", note: "未享受优惠政策" },
            { taxType: "增值税", amount: "2,280", percentage: "60.4%", rate: "13%", note: "制造业标准税率" },
            { taxType: "城建税", amount: "160", percentage: "4.2%", rate: "7%", note: "按增值税计征" },
            { taxType: "教育费附加", amount: "114", percentage: "3.0%", rate: "5%", note: "按增值税计征" },
            { taxType: "印花税", amount: "38", percentage: "1.0%", rate: "-", note: "合同印花税等" },
            { taxType: "其他税费", amount: "68", percentage: "1.8%", rate: "-", note: "房产税、土地使用税等" }
        ],
        organizationOptimization: {
            highTechEnterprise: {
                description: "公司具备申请高新技术企业认定的良好条件，通过系统性准备和申报，可享受15%的企业所得税优惠税率，同时获得研发费用加计扣除等优惠政策。",
                feasibilityAnalysis: [
                    "拥有自主知识产权：已申请专利25项",
                    "属于高新技术领域：智能制造装备",
                    "研发费用比例：10%（超过3%要求）",
                    "高新收入占比：85%（超过60%要求）",
                    "科技人员比例：42%（超过10%要求）"
                ],
                expectedBenefit: "687.5万元"
            },
            softwareEnterprise: {
                description: "公司智能制造设备包含大量嵌入式软件和控制系统软件，可将软件开发业务单独核算，申请软件企业认定，享受增值税即征即退优惠政策。",
                expectedBenefit: "800万元"
            }
        },
        groupRestructuring: {
            targetStructure: [
                {
                    name: "XX科技投资控股有限公司",
                    location: "海南自贸港",
                    function: "股权投资管理、战略决策",
                    taxBenefit: "企业所得税15%",
                    scale: "管理费收入2,000万元"
                },
                {
                    name: "XX智能制造有限公司",
                    location: "苏州工业园区",
                    function: "智能设备制造、组装",
                    taxBenefit: "高新技术企业15%税率",
                    scale: "营收2.5亿元"
                },
                {
                    name: "XX软件科技有限公司",
                    location: "深圳前海",
                    function: "软件开发、系统集成",
                    taxBenefit: "企业所得税15%+即征即退",
                    scale: "营收8,000万元"
                },
                {
                    name: "XX技术研发有限公司",
                    location: "上海张江",
                    function: "技术研发、知识产权管理",
                    taxBenefit: "高新技术企业15%税率",
                    scale: "技术服务收入3,000万元"
                },
                {
                    name: "XX营销服务有限公司",
                    location: "霍尔果斯",
                    function: "产品销售、客户服务",
                    taxBenefit: "企业所得税'五免五减半'",
                    scale: "营收5,000万元"
                },
                {
                    name: "XX供应链管理有限公司",
                    location: "天津自贸区",
                    function: "原材料采购、供应链管理",
                    taxBenefit: "保税区政策优惠",
                    scale: "采购金额1.5亿元"
                }
            ],
            businessReallocation: {
                description: "通过专业化分工，将原有业务按功能和地域进行重新配置，实现税收效益最大化。",
                splitStrategy: [
                    {
                        originalBusiness: "设备制造",
                        currentRevenue: "25,000",
                        newEntity: "智能制造公司",
                        newRevenue: "25,000",
                        taxOptimization: "25%→15%"
                    },
                    {
                        originalBusiness: "软件开发",
                        currentRevenue: "8,000",
                        newEntity: "软件科技公司",
                        newRevenue: "8,000",
                        taxOptimization: "25%→15%+即征即退"
                    },
                    {
                        originalBusiness: "技术研发",
                        currentRevenue: "3,000",
                        newEntity: "技术研发公司",
                        newRevenue: "3,000",
                        taxOptimization: "25%→15%"
                    },
                    {
                        originalBusiness: "销售服务",
                        currentRevenue: "5,000",
                        newEntity: "营销服务公司",
                        newRevenue: "5,000",
                        taxOptimization: "25%→0%（前五年）"
                    },
                    {
                        originalBusiness: "供应链管理",
                        currentRevenue: "1,000",
                        newEntity: "供应链公司",
                        newRevenue: "1,000",
                        taxOptimization: "25%→15%"
                    }
                ]
            }
        },
        locationStrategy: {
            headquartersRelocation: {
                description: "将投资控股总部迁至海南自贸港，充分利用自贸港的税收优惠政策，降低企业整体税负。",
                policyAdvantages: [
                    "企业所得税15%优惠税率",
                    "高端人才个税15%封顶",
                    "免征境外投资收益企业所得税",
                    "'零关税、低税率、简税制'政策环境"
                ],
                implementationSteps: [
                    "2025年Q1：在海南注册新的控股公司",
                    "2025年Q2：办理股权收购，形成控股架构",
                    "2025年Q3：完成总部功能迁移",
                    "2025年Q4：享受海南自贸港政策优惠"
                ]
            },
            regionalLayout: [
                {
                    region: "华东地区",
                    center: "上海张江（研发中心）",
                    advantages: "人才聚集、政策支持、产业配套",
                    benefits: "研发费用加计扣除、高新技术企业政策"
                },
                {
                    region: "华南地区",
                    center: "深圳前海（软件中心）",
                    advantages: "软件产业基础、人才优势",
                    benefits: "企业所得税15%、软件企业即征即退"
                },
                {
                    region: "华北地区",
                    center: "天津自贸区（供应链中心）",
                    advantages: "港口优势、物流便利",
                    benefits: "自贸区政策、保税仓储"
                },
                {
                    region: "西部地区",
                    center: "霍尔果斯（销售中心）",
                    advantages: "'一带一路'节点、政策洼地",
                    benefits: "企业所得税'五免五减半'"
                }
            ]
        },
        implementationPlan: {
            overallSchedule: [
                {
                    stage: "准备阶段",
                    timeline: "2025年Q1",
                    tasks: "方案细化、资料准备",
                    outcomes: "完成实施方案设计"
                },
                {
                    stage: "申报阶段",
                    timeline: "2025年Q2",
                    tasks: "高新申报、主体设立",
                    outcomes: "获得认定、完成注册"
                },
                {
                    stage: "重组阶段",
                    timeline: "2025年Q3",
                    tasks: "架构重组、业务拆分",
                    outcomes: "形成新组织架构"
                },
                {
                    stage: "运营阶段",
                    timeline: "2025年Q4",
                    tasks: "新架构运营、政策享受",
                    outcomes: "实现税收优化目标"
                }
            ],
            detailedSteps: [
                {
                    phase: "第一阶段：准备阶段",
                    duration: "2025年1-3月",
                    activities: [
                        "召开董事会，审议筹划方案",
                        "聘请专业机构进行可行性分析",
                        "整理高新技术企业申报材料",
                        "准备各地注册所需文件",
                        "完善知识产权申请"
                    ]
                },
                {
                    phase: "第二阶段：申报阶段",
                    duration: "2025年4-6月",
                    activities: [
                        "提交高新技术企业认定申请",
                        "在目标城市完成公司注册",
                        "办理相关资质和许可",
                        "配合现场检查",
                        "获得认定证书"
                    ]
                },
                {
                    phase: "第三阶段：重组阶段",
                    duration: "2025年7-9月",
                    activities: [
                        "控股公司收购原公司股权",
                        "完成各子公司股权配置",
                        "制定业务拆分方案",
                        "签署关联交易协议",
                        "完成业务和人员转移"
                    ]
                },
                {
                    phase: "第四阶段：运营阶段",
                    duration: "2025年10-12月",
                    activities: [
                        "各子公司开始独立运营",
                        "完善内控和财务体系",
                        "年度税收筹划效果评估",
                        "持续优化和调整"
                    ]
                }
            ],
            keyControls: "建立项目管理小组，聘请专业机构全程指导，定期评估进度及时调整方案，做好应急预案和替代方案。关键成功因素包括高新技术企业认定成功率95%、各地注册顺利完成率100%、业务拆分平稳过渡、关联交易合规性确保。"
        },
        economicBenefit: {
            corporateTaxSavings: {
                newStructure: [
                    { entity: "控股公司", taxableIncome: "500", rate: "15%", tax: "75" },
                    { entity: "制造公司", taxableIncome: "2,800", rate: "15%", tax: "420" },
                    { entity: "软件公司", taxableIncome: "900", rate: "15%", tax: "135" },
                    { entity: "研发公司", taxableIncome: "400", rate: "15%", tax: "60" },
                    { entity: "营销公司", taxableIncome: "500", rate: "0%", tax: "0" },
                    { entity: "供应链公司", taxableIncome: "200", rate: "15%", tax: "30" }
                ],
                totalSavings: "405万元"
            },
            vatSavings: {
                immediateRefund: "800万元",
                creditRefund: "200万元",
                totalSavings: "1,000万元"
            },
            comprehensiveSavings: [
                { taxType: "企业所得税", originalTax: "1,125", newTax: "720", savings: "405", savingsRate: "36.0%" },
                { taxType: "增值税", originalTax: "2,280", newTax: "1,280", savings: "1,000", savingsRate: "43.9%" },
                { taxType: "个人所得税", originalTax: "400", newTax: "250", savings: "150", savingsRate: "37.5%" },
                { taxType: "其他税费", originalTax: "380", newTax: "350", savings: "30", savingsRate: "7.9%" }
            ],
            investmentAnalysis: {
                totalCost: "300万元",
                annualSavings: "1,585万元",
                roi: "528%",
                threeYearBenefit: [
                    { year: "2025年", annualSavings: "1,585", cumulativeSavings: "1,585", netBenefit: "1,285" },
                    { year: "2026年", annualSavings: "1,650", cumulativeSavings: "3,235", netBenefit: "2,935" },
                    { year: "2027年", annualSavings: "1,720", cumulativeSavings: "4,955", netBenefit: "4,655" }
                ]
            }
        },
        riskAssessment: {
            categories: [
                {
                    name: "政策风险",
                    level: "中",
                    description: "税收政策变化、地方政策执行不一致等风险",
                    controlMeasures: [
                        "密切关注政策动态，及时调整策略",
                        "确保实质经营，避免空壳化运作",
                        "建立合规性审查机制",
                        "制定政策变化应对预案"
                    ]
                },
                {
                    name: "合规风险",
                    level: "低",
                    description: "关联交易定价、实质经营要求等合规风险",
                    controlMeasures: [
                        "严格按照转让定价规定执行",
                        "准备充分的同期资料",
                        "委托专业机构进行定价分析",
                        "确保交易具有合理商业目的"
                    ]
                },
                {
                    name: "操作风险",
                    level: "中",
                    description: "执行进度、管理协调等操作风险",
                    controlMeasures: [
                        "制定详细的项目计划",
                        "建立应急处理机制",
                        "聘请专业机构协助",
                        "准备替代方案"
                    ]
                },
                {
                    name: "管理风险",
                    level: "低",
                    description: "多主体管理复杂性、内控制度完善等风险",
                    controlMeasures: [
                        "建立集团化管理体系",
                        "统一财务核算标准",
                        "完善内控制度建设",
                        "加强人员培训"
                    ]
                }
            ],
            controlMatrix: [
                { category: "政策变化", level: "中等", probability: "30%", impact: "高", controlMeasures: "政策跟踪、预案制定", responsible: "税务总监" },
                { category: "合规风险", level: "低", probability: "15%", impact: "高", controlMeasures: "专业指导、规范操作", responsible: "法务总监" },
                { category: "执行风险", level: "中等", probability: "25%", impact: "中", controlMeasures: "项目管理、专业协助", responsible: "项目经理" },
                { category: "管理风险", level: "低", probability: "20%", impact: "中", controlMeasures: "制度建设、人员培训", responsible: "运营总监" }
            ]
        },
        recommendations: {
            summary: "本筹划方案通过组织形式优化、集团架构重构、注册地战略布局三个维度的系统性改革，预计能够实现年节税1,585万元，综合税负率从10.5%降至7.2%，降幅达到37.9%。方案具有合规性强、系统性好、操作性强、效益显著等特点。",
            keyBenefits: {
                annualSavings: "1,585万元",
                taxReduction: "37.9%",
                roi: "528%",
                paybackPeriod: "2.3个月"
            },
            implementationSuggestions: [
                "尽快启动：充分利用当前政策窗口期，尽快启动实施",
                "专业指导：聘请专业机构全程指导，确保方案顺利实施",
                "风险控制：建立完善的风险控制体系，防范各类风险",
                "持续优化：根据政策变化和业务发展，持续优化方案"
            ],
            longTermOutlook: "随着企业规模不断扩大和业务领域拓展，通过系统性的主体层面筹划，不仅能够显著降低税负成本，更能够为企业长远发展奠定坚实基础，实现经济效益和战略价值的双重提升。",
            futureConsiderations: [
                "国际化布局：利用RCEP、'一带一路'等机遇，开展跨境税收筹划",
                "资本运作：结合IPO计划，优化股权架构和税收安排",
                "产业链延伸：通过并购重组，完善产业链税收筹划",
                "数字化转型：利用数字经济优惠政策，推动业务模式创新"
            ]
        }
    };
};

// 保留旧函数名以向后兼容
export const getReportData = getEntityDesignReportData;