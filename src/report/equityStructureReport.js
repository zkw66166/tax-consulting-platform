// C:\MyProjects\tax-consulting-platform\src\report\equityStructureReport.js

// 生成HTML格式的股权架构分析报告
export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>股权架构优化分析报告</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif;
            line-height: 1.8;
            color: #2c3e50;
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
            background: #ffffff;
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
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin: 20px 0;
        }
        
        .highlight-card {
            background: linear-gradient(135deg, #e8f4fd 0%, #d6e9f7 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #9b59b6;
        }
        
        .highlight-card h3 {
            color: #8e44ad;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .highlight-card .value {
            color: #663399;
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
            color: #9b59b6;
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
        
        .structure-diagram {
            background: #f8f9fa;
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 30px;
            margin: 25px 0;
            text-align: center;
        }
        
        .entity-box {
            display: inline-block;
            background: linear-gradient(135deg, #6c7ae0 0%, #5a67d8 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            margin: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            position: relative;
        }
        
        .entity-box.parent {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .entity-box.subsidiary {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .entity-box.related {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        .connection-line {
            border-top: 2px solid #6c757d;
            width: 100px;
            margin: 15px auto;
        }
        
        .ownership-label {
            background: #6c757d;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            display: inline-block;
            margin: 10px;
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
            content: "▣";
            position: absolute;
            top: 15px;
            left: 20px;
            color: #6c757d;
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
            color: #9b59b6;
            font-size: 8px;
            top: 0.6em;
        }
        
        .conclusion-section {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            border: 3px solid #ba68c8;
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
        }
        
        .conclusion-section::before {
            content: "★";
            position: absolute;
            top: 20px;
            right: 25px;
            color: #ba68c8;
            font-size: 20px;
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
            background: linear-gradient(120deg, #dda0dd 0%, #da70d6 100%);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
            color: white;
        }
        
        .tax-saving-card {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
            text-align: center;
        }
        
        .tax-saving-card h5 {
            color: #2e7d32;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .tax-saving-card .amount {
            color: #1b5e20;
            font-size: 24px;
            font-weight: 700;
            margin: 10px 0;
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
    </style>
</head>
<body>
    <div class="header">
        <h1>股权架构优化分析报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} · ${reportData.reportInfo.reportDate}</p>
    </div>

    <div class="company-info">
        <div class="info-card">
            <h3>🏢 目标公司信息</h3>
            <p><strong>公司名称</strong><span>${reportData.companyInfo.name}</span></p>
            <p><strong>统一社会信用代码</strong><span>${reportData.companyInfo.registrationNumber}</span></p>
            <p><strong>成立日期</strong><span>${reportData.companyInfo.establishedDate}</span></p>
            <p><strong>注册资本</strong><span>${reportData.companyInfo.registeredCapital}</span></p>
            <p><strong>法定代表人</strong><span>${reportData.companyInfo.legalRepresentative}</span></p>
            <p><strong>所属行业</strong><span>${reportData.companyInfo.industry}</span></p>
        </div>
        <div class="info-card">
            <h3>📊 报告信息</h3>
            <p><strong>报告日期</strong><span>${reportData.reportInfo.reportDate}</span></p>
            <p><strong>分析期间</strong><span>${reportData.reportInfo.analysisPeriod}</span></p>
            <p><strong>咨询机构</strong><span>${reportData.reportInfo.consultingFirm}</span></p>
            <p><strong>项目团队</strong><span>${reportData.reportInfo.projectTeam}</span></p>
            <p><strong>报告编号</strong><span>${reportData.reportInfo.reportNumber}</span></p>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🎯 执行摘要</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                <div class="highlight-card">
                    <h3>综合评分</h3>
                    <div class="value">${reportData.executiveSummary.overallScore}</div>
                </div>
                <div class="highlight-card">
                    <h3>优化潜力</h3>
                    <div class="value" style="font-size: 20px;">${reportData.executiveSummary.optimizationPotential}</div>
                </div>
                <div class="highlight-card">
                    <h3>风险等级</h3>
                    <div class="value" style="font-size: 20px;">${reportData.executiveSummary.riskLevel}</div>
                </div>
            </div>
            
            <div class="tax-saving-card">
                <h5>预期年节税空间</h5>
                <div class="amount">${reportData.executiveSummary.expectedTaxSaving}</div>
                <p style="color: #2e7d32; font-size: 14px;">通过优化股权架构，预计每年可节省税负</p>
            </div>
            
            <div class="grid-2">
                <div class="analysis-item risk-low">
                    <h4>架构优势</h4>
                    <ul>
                        ${reportData.executiveSummary.advantages.map(advantage => `<li>${advantage}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-item risk-high">
                    <h4>优化空间</h4>
                    <ul>
                        ${reportData.executiveSummary.improvementAreas.map(area => `<li>${area}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏗️ 现状架构分析</h2>
        </div>
        <div class="section-content">
            <div class="feature-box">
                <h4>当前股权架构图</h4>
                <div class="structure-diagram">
                    <div class="entity-box parent">
                        ${reportData.currentStructure.parentCompany.name}<br>
                        <small>${reportData.currentStructure.parentCompany.description}</small>
                    </div>
                    <div class="connection-line"></div>
                    <div class="ownership-label">持股${reportData.currentStructure.parentCompany.ownershipPercentage}</div>
                    <div class="connection-line"></div>
                    <div class="entity-box">
                        ${reportData.currentStructure.targetCompany.name}<br>
                        <small>${reportData.currentStructure.targetCompany.description}</small>
                    </div>
                    <div class="connection-line" style="width: 300px;"></div>
                    <div style="display: flex; justify-content: center; gap: 50px; margin-top: 20px;">
                        ${reportData.currentStructure.subsidiaries.map(sub => `
                            <div>
                                <div class="ownership-label">持股${sub.ownershipPercentage}</div>
                                <div class="entity-box subsidiary">
                                    ${sub.name}<br>
                                    <small>${sub.description}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px dotted #6c757d;">
                        <h5 style="color: #6c757d; margin-bottom: 15px;">关联方企业</h5>
                        <div style="display: flex; justify-content: center; gap: 30px;">
                            ${reportData.currentStructure.relatedParties.map(party => `
                                <div class="entity-box related">
                                    ${party.name}<br>
                                    <small>${party.relationship}</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid-4">
                <div class="metric-card">
                    <h5>企业层级</h5>
                    <div class="value">${reportData.currentStructure.analysis.levels}层</div>
                </div>
                <div class="metric-card">
                    <h5>关联企业</h5>
                    <div class="value">${reportData.currentStructure.analysis.totalEntities}家</div>
                </div>
                <div class="metric-card">
                    <h5>整体税负率</h5>
                    <div class="value">${reportData.currentStructure.analysis.taxBurdenRate}</div>
                </div>
                <div class="metric-card">
                    <h5>控制效率</h5>
                    <div class="value">${reportData.currentStructure.analysis.controlEfficiency}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🔍 详细分析评估</h2>
        </div>
        <div class="section-content">
            
            <div class="subsection">
                <div class="subsection-header">1️⃣ 控制结构分析</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>控制链效率评估</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.controlStructure.chainEfficiency}</p>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h5>控制层级</h5>
                                <div class="value">${reportData.detailedAnalysis.controlStructure.metrics.controlLevels}</div>
                            </div>
                            <div class="metric-card">
                                <h5>决策效率</h5>
                                <div class="value">${reportData.detailedAnalysis.controlStructure.metrics.decisionEfficiency}</div>
                            </div>
                            <div class="metric-card">
                                <h5>持股稳定性</h5>
                                <div class="value">${reportData.detailedAnalysis.controlStructure.metrics.ownershipStability}</div>
                            </div>
                            <div class="metric-card">
                                <h5>控制成本</h5>
                                <div class="value">${reportData.detailedAnalysis.controlStructure.metrics.controlCost}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>股权集中度分析</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.controlStructure.ownershipConcentration}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>决策机制评估</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.controlStructure.decisionMechanism}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">2️⃣ 税务效率分析</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>整体税负分布</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.taxEfficiency.overallTaxBurden}</p>
                        
                        <table>
                            <tr>
                                <th>主体名称</th>
                                <th>主要税种</th>
                                <th>适用税率</th>
                                <th>年缴税额</th>
                                <th>税负率</th>
                            </tr>
                            ${reportData.detailedAnalysis.taxEfficiency.taxDetails.map(detail => `
                                <tr>
                                    <td>${detail.entityName}</td>
                                    <td>${detail.taxTypes}</td>
                                    <td>${detail.taxRates}</td>
                                    <td>${detail.annualTax}</td>
                                    <td style="color: ${detail.taxBurdenRate > '10%' ? '#e74c3c' : '#27ae60'};">${detail.taxBurdenRate}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>税收优惠政策利用</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.taxEfficiency.policyUtilization}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>关联交易税务安排</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.taxEfficiency.relatedPartyTransactions}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">3️⃣ 治理结构评估</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>公司治理框架</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.governance.framework}</p>
                    </div>
                    
                    <div class="grid-2">
                        <div class="analysis-item">
                            <h4>董事会结构</h4>
                            <div class="metrics-grid" style="grid-template-columns: 1fr 1fr;">
                                <div class="metric-card">
                                    <h5>董事总数</h5>
                                    <div class="value" style="font-size: 18px;">${reportData.detailedAnalysis.governance.boardStructure.totalDirectors}人</div>
                                </div>
                                <div class="metric-card">
                                    <h5>独立董事</h5>
                                    <div class="value" style="font-size: 18px;">${reportData.detailedAnalysis.governance.boardStructure.independentDirectors}人</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="analysis-item">
                            <h4>监督机制</h4>
                            <div class="metrics-grid" style="grid-template-columns: 1fr 1fr;">
                                <div class="metric-card">
                                    <h5>监事会成员</h5>
                                    <div class="value" style="font-size: 18px;">${reportData.detailedAnalysis.governance.supervision.supervisors}人</div>
                                </div>
                                <div class="metric-card">
                                    <h5>审计委员会</h5>
                                    <div class="value" style="font-size: 18px;">${reportData.detailedAnalysis.governance.supervision.auditCommittee}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>内控制度完善性</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.governance.internalControl}</p>
                    </div>
                    
                    <div class="analysis-item">
                        <h4>信息披露机制</h4>
                        <p><span class="paragraph-number">3</span>${reportData.detailedAnalysis.governance.informationDisclosure}</p>
                    </div>
                </div>
            </div>

            <div class="subsection">
                <div class="subsection-header">4️⃣ 风险管控分析</div>
                <div class="subsection-content">
                    <div class="analysis-item">
                        <h4>风险识别机制</h4>
                        <p><span class="paragraph-number">1</span>${reportData.detailedAnalysis.riskManagement.identificationMechanism}</p>
                    </div>
                    
                    <div class="grid-2">
                        ${reportData.detailedAnalysis.riskManagement.riskCategories.map(category => `
                            <div class="analysis-item ${category.level === '低' ? 'risk-low' : category.level === '中' ? 'risk-medium' : 'risk-high'}">
                                <h4>${category.name} - ${category.level}风险</h4>
                                <p>${category.description}</p>
                                <ul>
                                    ${category.mitigationMeasures.map(measure => `<li>${measure}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="analysis-item">
                        <h4>应急预案机制</h4>
                        <p><span class="paragraph-number">2</span>${reportData.detailedAnalysis.riskManagement.contingencyPlanning}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💡 优化方案建议</h2>
        </div>
        <div class="section-content">
            ${reportData.optimizationRecommendations.schemes.map((scheme, index) => `
                <div class="subsection">
                    <div class="subsection-header">方案${index + 1}: ${scheme.title}</div>
                    <div class="subsection-content">
                        <div class="analysis-item">
                            <h4>方案概述</h4>
                            <p><span class="paragraph-number">1</span>${scheme.description}</p>
                        </div>
                        
                        <div class="grid-3">
                            <div class="tax-saving-card">
                                <h5>预期节税</h5>
                                <div class="amount">${scheme.expectedTaxSaving}</div>
                            </div>
                            <div class="metric-card">
                                <h5>投资成本</h5>
                                <div class="value" style="color: #e74c3c;">${scheme.investmentCost}</div>
                            </div>
                            <div class="metric-card">
                                <h5>回收期</h5>
                                <div class="value" style="color: #3498db;">${scheme.paybackPeriod}</div>
                            </div>
                        </div>
                        
                        <div class="analysis-item">
                            <h4>实施步骤</h4>
                            <ol>
                                ${scheme.implementationSteps.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                        
                        <div class="grid-2">
                            <div class="analysis-item risk-low">
                                <h4>预期效益</h4>
                                <ul>
                                    ${scheme.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="analysis-item risk-medium">
                                <h4>风险提示</h4>
                                <ul>
                                    ${scheme.risks.map(risk => `<li>${risk}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📊 效益预测分析</h2>
        </div>
        <div class="section-content">
            <div class="feature-box" style="text-align: center; margin-bottom: 30px;">
                <h4>综合优化效益</h4>
                <div style="font-size: 48px; font-weight: 700; color: #27ae60; margin: 20px 0;">
                    ${reportData.benefitAnalysis.totalAnnualSaving}万元/年
                </div>
                <p style="color: #7f8c8d; font-size: 16px;">预计年度节税总额</p>
            </div>
            
            <div class="analysis-item">
                <h4>五年累计效益预测</h4>
                <table>
                    <tr>
                        <th>年份</th>
                        <th>节税金额（万元）</th>
                        <th>累计节税（万元）</th>
                        <th>投资成本（万元）</th>
                        <th>净收益（万元）</th>
                    </tr>
                    ${reportData.benefitAnalysis.fiveYearProjection.map(year => `
                        <tr>
                            <td>${year.year}</td>
                            <td style="color: #27ae60;">${year.taxSaving}</td>
                            <td style="color: #27ae60;">${year.cumulativeSaving}</td>
                            <td style="color: #e74c3c;">${year.investmentCost}</td>
                            <td style="color: ${year.netBenefit > 0 ? '#27ae60' : '#e74c3c'};">${year.netBenefit}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
            
            <div class="grid-2">
                <div class="analysis-item">
                    <h4>关键成功因素</h4>
                    <ul>
                        ${reportData.benefitAnalysis.successFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-item">
                    <h4>敏感性分析</h4>
                    <ul>
                        ${reportData.benefitAnalysis.sensitivityFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📝 结论与建议</h2>
        </div>
        <div class="section-content">
            <div class="conclusion-section">
                <div class="analysis-item risk-low">
                    <h4>总体结论</h4>
                    <p><span class="paragraph-number">1</span>${reportData.conclusions.overall}</p>
                </div>
                
                <div class="analysis-item">
                    <h4>实施优先级</h4>
                    <ol>
                        ${reportData.conclusions.implementationPriority.map(item => `<li>${item}</li>`).join('')}
                    </ol>
                </div>
                
                <div class="analysis-item">
                    <h4>后续行动计划</h4>
                    <ul>
                        ${reportData.conclusions.actionPlan.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="analysis-item risk-medium">
                    <h4>注意事项</h4>
                    <ul>
                        ${reportData.conclusions.considerations.map(consideration => `<li>${consideration}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>重要声明</strong></p>
        <p>本报告基于目标公司提供的财务数据和公开信息进行分析，所提出的优化方案需要在具体实施前进行详细的法律合规性审查。税收政策可能发生变化，实际节税效果可能与预测存在差异。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 报告编制日期：${reportData.reportInfo.reportDate} | 📄 报告编号：${reportData.reportInfo.reportNumber} | 👥 项目团队：${reportData.reportInfo.projectTeam}</p>
    </div>
</body>
</html>
    `;
};

// 获取报告数据结构
export const getReportData = () => {
    return {
        companyInfo: {
            name: "科技创新股份有限公司",
            registrationNumber: "91110000MA01234567",
            establishedDate: "2018年03月15日",
            registeredCapital: "5000万元",
            legalRepresentative: "张三",
            industry: "软件和信息技术服务业"
        },
        reportInfo: {
            reportDate: "2024年12月15日",
            analysisPeriod: "2021年-2023年",
            consultingFirm: "某某税务咨询有限公司",
            projectTeam: "高级税务筹划师团队",
            reportNumber: "EQ-20241215-001"
        },
        executiveSummary: {
            overallScore: 7.8,
            optimizationPotential: "中等",
            riskLevel: "可控",
            expectedTaxSaving: "380-540万元",
            advantages: [
                "三层架构清晰，控制关系明确，便于管理和决策",
                "子公司业务相对独立，具备一定的税务筹划基础",
                "关联交易规模适中，优化空间较大",
                "企业财务状况良好，有能力承担架构调整成本"
            ],
            improvementAreas: [
                "整体税负率偏高，子公司设立地区未充分利用税收优惠",
                "关联交易定价缺乏税务筹划考虑，存在优化空间",
                "业务分离度不够，未充分利用不同税率的政策差异",
                "股权激励机制不完善，员工持股比例偏低"
            ]
        },
        currentStructure: {
            parentCompany: {
                name: "大华控股集团有限公司",
                description: "控股股东 • 总资产5.8亿",
                ownershipPercentage: "75%"
            },
            targetCompany: {
                name: "科技创新股份有限公司",
                description: "本企业 • 注册资本1000万"
            },
            subsidiaries: [
                {
                    name: "大华软件技术公司",
                    description: "全资子公司 • 软件开发",
                    ownershipPercentage: "100%"
                },
                {
                    name: "大华信息服务公司",
                    description: "控股子公司 • 信息服务",
                    ownershipPercentage: "60%"
                }
            ],
            relatedParties: [
                {
                    name: "创新研发中心",
                    relationship: "同一控制下"
                },
                {
                    name: "销售服务公司",
                    relationship: "关联企业"
                },
                {
                    name: "财务管理中心",
                    relationship: "共享服务"
                }
            ],
            analysis: {
                levels: "3",
                totalEntities: "5",
                taxBurdenRate: "8.5%",
                controlEfficiency: "68分"
            }
        },
        detailedAnalysis: {
            controlStructure: {
                chainEfficiency: "当前三层股权架构在控制效率方面表现良好，控制链条清晰，决策传导路径相对简洁。控股集团通过75%的持股比例对目标公司实现有效控制，目标公司对下属子公司分别持股100%和60%，形成了较为稳定的控制关系。从决策效率角度分析，由于层级适中，重大决策能够在较短时间内传达到各个层级，决策执行效率较高。但需要注意的是，随着业务规模的扩大和企业数量的增加，现有架构的管理复杂度在逐步提升，建议在未来发展中适当考虑管理效率与控制需要的平衡。同时，当前架构中子公司的独立性较强，有利于业务的专业化运营，但也带来了一定的协调成本。",
                ownershipConcentration: "股权集中度分析显示，控股集团作为最终控制人，通过多层持股结构实现了对整个企业集团的有效控制。75%的持股比例确保了控制权的稳定性，避免了股权过度分散带来的治理风险。在子公司层面，目标公司对软件技术公司的100%持股确保了核心业务的完全控制，而对信息服务公司60%的持股虽然形成了控股地位，但也为未来引入战略投资者留下了空间。这种股权安排既保证了控制权的集中，又保持了一定的灵活性。建议在未来发展中，可以考虑通过员工持股计划等方式适度分散股权，在保持控制权的同时激发员工积极性。",
                decisionMechanism: "企业决策机制相对完善，建立了股东会、董事会、监事会等治理架构，各层级决策权限分工明确。集团总部主要负责战略决策、重大投资、人事任免等关键事项，子公司在经营决策方面享有较大自主权。这种决策机制既保证了集团的统一管控，又充分发挥了子公司的经营活力。但在实际执行中，由于信息传递和沟通成本的存在，部分决策的执行效率有待提升。建议建立更加完善的信息系统，加强各层级间的信息共享，同时优化决策流程，提高决策质量和效率。",
                metrics: {
                    controlLevels: "3层",
                    decisionEfficiency: "85%",
                    ownershipStability: "稳定",
                    controlCost: "适中"
                }
            },
            taxEfficiency: {
                overallTaxBurden: "综合税负分析显示，企业集团整体税负率为8.5%，在同行业中处于中等偏上水平。各主体税负分布不够均衡，存在明显的优化空间。母公司作为软件企业，虽然享受了部分税收优惠政策，但由于业务规模较大，税负绝对金额仍然较高。子公司中，软件技术公司由于业务性质和所在地区的优惠政策，税负率相对较低，而信息服务公司的税负率则明显偏高。通过对比分析发现，如果能够合理调整业务分布和架构安排，预计可以降低整体税负率1-2个百分点，年节税金额可达200-300万元。建议重点关注增值税筹划、企业所得税优化以及关联交易定价的税务安排。",
                policyUtilization: "税收优惠政策利用情况分析表明，企业集团在政策利用方面存在较大提升空间。目前仅有母公司享受了高新技术企业15%的企业所得税优惠税率，子公司层面的政策利用程度较低。经过调研发现，软件技术公司同样具备申请高新技术企业资质的条件，但由于历史原因未及时申报。信息服务公司虽然不符合高新技术企业条件，但可以通过业务重组等方式享受相关优惠政策。此外，企业集团所在的部分地区提供了税收洼地政策，但目前未能充分利用。建议制定系统的税收优惠政策利用计划，通过资质申请、地区选择、业务重组等方式最大化政策红利。",
                relatedPartyTransactions: "关联交易税务安排分析显示，企业集团内部关联交易规模适中，主要包括技术服务费、管理服务费、资金拆借等。当前关联交易定价主要采用成本加成法，定价相对保守，未充分考虑税务筹划因素。通过分析发现，合理调整关联交易定价策略，可以在合规的前提下实现税负在不同主体间的合理分配。例如，可以通过提高技术含量较高服务的定价水平，将利润向税负较低的主体转移。同时，建议建立更加完善的关联交易文档体系，确保转让定价的合理性和合规性。预计通过关联交易税务安排的优化，年节税空间可达80-120万元。",
                taxDetails: [
                    {
                        entityName: "科技创新股份有限公司",
                        taxTypes: "增值税、企业所得税",
                        taxRates: "6%、15%",
                        annualTax: "320万元",
                        taxBurdenRate: "8.4%"
                    },
                    {
                        entityName: "大华软件技术公司",
                        taxTypes: "增值税、企业所得税",
                        taxRates: "6%、25%",
                        annualTax: "128万元",
                        taxBurdenRate: "12.8%"
                    },
                    {
                        entityName: "大华信息服务公司",
                        taxTypes: "增值税、企业所得税",
                        taxRates: "6%、25%",
                        annualTax: "91万元",
                        taxBurdenRate: "15.2%"
                    }
                ]
            },
            governance: {
                framework: "公司治理框架基本完善，建立了现代企业制度的基本架构。股东会作为最高权力机构，董事会负责重大决策，监事会履行监督职能，高级管理层负责日常经营管理。各治理主体职责分工相对明确，制衡机制基本有效。但在实际运行中，由于企业规模和发展阶段的限制，部分治理环节还需要进一步完善。特别是在独立董事制度、董事会专门委员会设置、信息披露等方面还有提升空间。建议根据企业发展需要，逐步完善治理结构，提升治理水平，为企业长期健康发展奠定坚实基础。",
                boardStructure: {
                    totalDirectors: "7",
                    independentDirectors: "2"
                },
                supervision: {
                    supervisors: "3",
                    auditCommittee: "已设立"
                },
                internalControl: "内部控制制度建设情况总体良好，建立了涵盖财务管理、风险控制、合规管理等方面的制度体系。财务内控方面，建立了预算管理、资金管理、会计核算等制度，执行情况较好。风险控制方面，建立了风险识别、评估、应对等机制，但在某些新兴业务领域的风险管控还需要加强。合规管理方面，建立了法律合规、税务合规等制度，但随着业务的发展和监管要求的提高，需要持续完善。建议建立内控评价机制，定期评估内控制度的有效性，及时发现和改进薄弱环节。",
                informationDisclosure: "信息披露机制相对规范，建立了对内对外的信息披露制度。对内披露方面，定期向股东报告经营情况、财务状况等重要信息，透明度较高。对外披露方面，按照相关法规要求披露必要信息，但主动披露意识还需要加强。随着企业的发展和可能的上市计划，建议进一步完善信息披露制度，提高信息披露的及时性、准确性和完整性。同时，建议建立投资者关系管理机制，加强与投资者的沟通，提升企业透明度和市场认知度。"
            },
            riskManagement: {
                identificationMechanism: "风险识别机制基本建立，但系统性和前瞻性有待加强。企业建立了多层次的风险识别体系，包括业务层面的操作风险识别、财务层面的资金风险识别、法律层面的合规风险识别等。风险识别方法主要采用定期评估和事件驱动相结合的方式，能够及时发现和识别主要风险点。但在新兴业务风险、市场环境变化风险、政策法规变化风险等方面的识别能力还需要进一步提升。建议建立更加系统化的风险识别框架，引入专业的风险评估工具和方法，提高风险识别的准确性和及时性。",
                riskCategories: [
                    {
                        name: "政策变化风险",
                        level: "中",
                        description: "税收政策、行业政策可能发生变化，影响优化方案效果",
                        mitigationMeasures: [
                            "密切关注政策动向，建立政策跟踪机制",
                            "制定政策变化应对预案",
                            "选择政策稳定性强的优化方案"
                        ]
                    },
                    {
                        name: "合规执行风险",
                        level: "中",
                        description: "架构调整过程中可能出现合规性问题",
                        mitigationMeasures: [
                            "聘请专业机构提供法律和税务支持",
                            "建立合规审查机制",
                            "加强员工合规培训"
                        ]
                    },
                    {
                        name: "操作实施风险",
                        level: "低",
                        description: "方案实施过程中的操作性风险",
                        mitigationMeasures: [
                            "制定详细的实施计划",
                            "建立项目管理机制",
                            "定期监控实施进度"
                        ]
                    },
                    {
                        name: "财务成本风险",
                        level: "低",
                        description: "架构调整可能带来的额外成本",
                        mitigationMeasures: [
                            "准确评估实施成本",
                            "制定成本控制措施",
                            "建立成本效益监控机制"
                        ]
                    }
                ],
                contingencyPlanning: "应急预案机制有待完善，企业虽然建立了一些应急处理程序，但系统性和可操作性还需要加强。现有应急预案主要针对生产经营中断、重大财务风险、法律诉讼等传统风险，对于新型风险如数据安全、网络攻击、声誉风险等的应对预案还不够完善。建议建立更加全面的应急预案体系，明确风险应对的组织架构、责任分工、处理流程等，并定期进行应急演练，确保在风险事件发生时能够快速有效应对。同时，建议建立风险事件报告和学习机制，从风险事件中总结经验教训，持续完善风险管理体系。"
            }
        },
        optimizationRecommendations: {
            schemes: [
                {
                    title: "设立税收洼地子公司",
                    description: "在享受税收优惠政策的园区设立运营子公司，将部分高利润业务迁移至该子公司，充分享受地方税收优惠政策。该方案具有实施周期短、风险可控、效果显著的特点，是近期重点推荐的优化方案。通过合理的业务安排和人员配置，预计可以实现显著的税负降低效果。",
                    expectedTaxSaving: "180万元/年",
                    investmentCost: "150万元",
                    paybackPeriod: "8个月",
                    implementationSteps: [
                        "第一阶段：园区选择和政策调研，评估各园区的优惠政策和实施条件",
                        "第二阶段：子公司设立，完成工商注册、税务登记等手续",
                        "第三阶段：业务梳理，确定迁移业务范围和实施方案",
                        "第四阶段：业务迁移，逐步将相关业务转移至新设子公司",
                        "第五阶段：运营优化，完善子公司运营管理，确保合规性"
                    ],
                    benefits: [
                        "享受15%企业所得税优惠税率，每年节省企业所得税约120万元",
                        "享受增值税地方留存部分奖励，每年获得返还约45万元",
                        "提升企业税务合规水平，降低税务风险",
                        "为未来业务扩展提供更优的税务环境"
                    ],
                    risks: [
                        "政策变化风险：税收优惠政策可能发生调整",
                        "合规风险：需要确保业务迁移的真实性和合规性",
                        "管理风险：异地子公司管理成本和难度增加"
                    ]
                },
                {
                    title: "业务板块分离重组",
                    description: "将企业的研发、生产、销售等业务板块分离到不同的法人主体，通过差异化的税务安排实现整体税负的优化。该方案能够充分利用不同业务的税收政策差异，实现税负在不同主体间的合理分配，同时有利于业务的专业化发展。",
                    expectedTaxSaving: "240万元/年",
                    investmentCost: "300万元",
                    paybackPeriod: "15个月",
                    implementationSteps: [
                        "第一阶段：业务梳理和架构设计，明确业务分离方案",
                        "第二阶段：新主体设立，根据业务需要设立相应的法人主体",
                        "第三阶段：资产重组，将相关资产转移至对应主体",
                        "第四阶段：人员安排，合理配置各主体的人员结构",
                        "第五阶段：系统整合，建立统一的管理和信息系统",
                        "第六阶段：运营磨合，完善各主体间的协作机制"
                    ],
                    benefits: [
                        "研发主体享受研发费用加计扣除，每年节税约150万元",
                        "通过关联交易定价优化，实现税负合理分配，节税约60万元",
                        "提升业务专业化水平，增强市场竞争力",
                        "为未来引入战略投资者创造条件"
                    ],
                    risks: [
                        "重组过程复杂，可能影响业务连续性",
                        "关联交易定价需要严格遵循转让定价规则",
                        "各主体间协调成本增加"
                    ]
                },
                {
                    title: "股权激励平台搭建",
                    description: "建立员工持股平台，通过合伙企业等形式实现员工股权激励的税务优化。该方案不仅能够实现税务节省，还能提升员工积极性，完善公司治理结构，为企业长期发展奠定良好基础。",
                    expectedTaxSaving: "120万元/年",
                    investmentCost: "80万元",
                    paybackPeriod: "8个月",
                    implementationSteps: [
                        "第一阶段：方案设计，制定股权激励方案和平台架构",
                        "第二阶段：法律文件准备，完善相关协议和制度",
                        "第三阶段：平台设立，注册合伙企业等持股平台",
                        "第四阶段：员工沟通，向员工详细介绍激励方案",
                        "第五阶段：股权分配，完成股权的分配和登记",
                        "第六阶段：后续管理，建立持续的管理和激励机制"
                    ],
                    benefits: [
                        "员工股权激励享受个人所得税优惠政策，减少个税负担约80万元",
                        "提升员工积极性和忠诚度，降低人才流失风险",
                        "完善公司治理结构，增强企业凝聚力",
                        "为未来上市或融资创造有利条件"
                    ],
                    risks: [
                        "员工接受度可能存在差异",
                        "股权激励政策可能发生变化",
                        "持股平台管理需要专业化运作"
                    ]
                }
            ]
        },
        benefitAnalysis: {
            totalAnnualSaving: "540",
            fiveYearProjection: [
                {
                    year: "2024年",
                    taxSaving: "380",
                    cumulativeSaving: "380",
                    investmentCost: "300",
                    netBenefit: "80"
                },
                {
                    year: "2025年",
                    taxSaving: "480",
                    cumulativeSaving: "860",
                    investmentCost: "150",
                    netBenefit: "330"
                },
                {
                    year: "2026年",
                    taxSaving: "540",
                    cumulativeSaving: "1400",
                    investmentCost: "80",
                    netBenefit: "460"
                },
                {
                    year: "2027年",
                    taxSaving: "540",
                    cumulativeSaving: "1940",
                    investmentCost: "50",
                    netBenefit: "490"
                },
                {
                    year: "2028年",
                    taxSaving: "540",
                    cumulativeSaving: "2480",
                    investmentCost: "50",
                    netBenefit: "490"
                }
            ],
            successFactors: [
                "政策环境保持相对稳定，税收优惠政策持续有效",
                "企业业务保持稳定增长，为方案实施提供基础",
                "管理团队执行力强，能够确保方案的有效实施",
                "与专业机构保持良好合作，获得持续的专业支持"
            ],
            sensitivityFactors: [
                "政策变化：税收政策调整对节税效果影响较大",
                "业务规模：业务增长速度直接影响节税金额",
                "执行质量：方案执行的规范性影响合规风险",
                "市场环境：行业发展趋势影响企业经营状况"
            ]
        },
        conclusions: {
            overall: "综合分析表明，该企业当前的股权架构基本合理，但在税务效率方面存在较大的优化空间。通过系统性的架构优化，预计每年可节省税负380-540万元，投资回收期8-15个月，具有良好的经济效益。建议按照优先级逐步实施各项优化方案，在确保合规性的前提下最大化税务筹划效果。",
            implementationPriority: [
                "高优先级：股权激励平台搭建，投资少、见效快、风险低",
                "高优先级：税收洼地子公司设立，政策明确、操作简单",
                "中优先级：业务板块分离重组，效果显著但复杂度较高",
                "低优先级：其他辅助性优化措施，根据实施效果适时推进"
            ],
            actionPlan: [
                "第一季度：启动股权激励平台搭建和税收洼地调研工作",
                "第二季度：完成高优先级方案的实施准备工作",
                "第三季度：正式实施高优先级方案，监控执行效果",
                "第四季度：评估实施效果，制定下一阶段优化计划"
            ],
            considerations: [
                "严格遵守相关法律法规，确保所有优化方案的合规性",
                "密切关注税收政策变化，及时调整优化策略",
                "建立专项工作组，确保方案实施的专业性和规范性",
                "定期评估实施效果，持续优化和完善架构安排"
            ]
        }
    };
};

// 生成PDF报告
export const generatePDFReport = (reportData) => {
    console.log('生成PDF报告:', reportData);
    return {
        success: true,
        filename: `股权架构优化分析报告_${new Date().getTime()}.pdf`,
        url: '/downloads/equity-structure-report.pdf'
    };
};

// 生成Word报告
export const generateWordReport = (reportData) => {
    console.log('生成Word报告:', reportData);
    return {
        success: true,
        filename: `股权架构优化分析报告_${new Date().getTime()}.docx`,
        url: '/downloads/equity-structure-report.docx'
    };
};