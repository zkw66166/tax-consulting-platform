// src/report/FinancialSystemDiagnosisReport.js
export const generateFinancialSystemDiagnosisReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>企业财务体系诊断和优化报告</title>
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

             @media print {
            .print-controls { display: none; }
            body { background: white; padding: 0; }
            .report-container {
                box-shadow: none;
                border-radius: 0;
                padding: 40px;
            }
        }

        .header {
            text-align: center;
            border-bottom: 4px solid #3498db;
            padding-bottom: 30px;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
            padding: 40px 30px 30px;
            border-radius: 8px;
            position: relative;
        }
        
        .header::before {
            content: "🏢";
            position: absolute;
            top: 15px;
            left: 30px;
            font-size: 24px;
        }
        
        .header h1 {
            color: #2980b9;
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
        
        .executive-summary {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #dee2e6;
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
        
        .diagnosis-summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .summary-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-left: 5px solid;
            position: relative;
        }
        
        .summary-card.critical {
            border-left-color: #e74c3c;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .summary-card.major {
            border-left-color: #ff9800;
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        }
        
        .summary-card.moderate {
            border-left-color: #ffc107;
            background: linear-gradient(135deg, #fffde7 0%, #fff8e1 100%);
        }
        
        .summary-card.good {
            border-left-color: #4caf50;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .summary-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .summary-card .count {
            font-size: 36px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .summary-card.critical .count { color: #c62828; }
        .summary-card.major .count { color: #ef6c00; }
        .summary-card.moderate .count { color: #f57f17; }
        .summary-card.good .count { color: #2e7d32; }
        
        .company-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .info-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: 1px solid #e9ecef;
            position: relative;
        }
        
        .info-card::before {
            content: "📊";
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 16px;
        }
        
        .info-card h3 {
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
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
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
        
        .diagnosis-item {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-left: 5px solid;
            border-radius: 0 8px 8px 0;
            padding: 20px 25px;
            margin-bottom: 20px;
            position: relative;
        }
        
        .diagnosis-item.critical {
            border-left-color: #e74c3c;
            background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
        }
        
        .diagnosis-item.major {
            border-left-color: #ff9800;
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        }
        
        .diagnosis-item.moderate {
            border-left-color: #ffc107;
            background: linear-gradient(135deg, #fffde7 0%, #fff8e1 100%);
        }
        
        .diagnosis-item.good {
            border-left-color: #4caf50;
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        }
        
        .diagnosis-item::before {
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
        
        .diagnosis-item.critical::before { border-color: #e74c3c; }
        .diagnosis-item.major::before { border-color: #ff9800; }
        .diagnosis-item.moderate::before { border-color: #ffc107; }
        .diagnosis-item.good::before { border-color: #4caf50; }
        
        .diagnosis-item h4 {
            color: #2c3e50;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .severity-badge {
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .severity-badge.critical {
            background: #e74c3c;
            color: white;
        }
        
        .severity-badge.major {
            background: #ff9800;
            color: white;
        }
        
        .severity-badge.moderate {
            background: #ffc107;
            color: #333;
        }
        
        .severity-badge.good {
            background: #4caf50;
            color: white;
        }
        
        .financial-modules {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 25px 0;
        }
        
        .module-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border-top: 4px solid;
            position: relative;
        }
        
        .module-card.organization { border-top-color: #2196f3; }
        .module-card.system { border-top-color: #4caf50; }
        .module-card.process { border-top-color: #ff9800; }
        .module-card.risk { border-top-color: #e74c3c; }
        .module-card.analysis { border-top-color: #9c27b0; }
        .module-card.budget { border-top-color: #00bcd4; }
        
        .module-card::before {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 16px;
        }
        
        .module-card.organization::before { content: "👥"; }
        .module-card.system::before { content: "💻"; }
        .module-card.process::before { content: "⚙️"; }
        .module-card.risk::before { content: "🛡️"; }
        .module-card.analysis::before { content: "📈"; }
        .module-card.budget::before { content: "💰"; }
        
        .current-status {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border: 2px solid #2196f3;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .current-status::before {
            content: "📋";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 14px;
        }
        
        .current-status h5 {
            color: #1976d2;
            font-weight: 600;
            margin-bottom: 10px;
            margin-left: 25px;
        }
        
        .problems-identified {
            background: #fff3e0;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #ff9800;
        }
        
        .problem-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px dotted #dee2e6;
        }
        
        .problem-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .problem-item::before {
            content: "⚠️";
            margin-right: 10px;
            font-size: 12px;
            margin-top: 2px;
        }
        
        .benchmark-analysis {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            border: 2px solid #9c27b0;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            position: relative;
        }
        
        .benchmark-analysis::before {
            content: "📊";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 18px;
        }
        
        .benchmark-analysis h4 {
            color: #7b1fa2;
            font-weight: 600;
            margin-bottom: 15px;
            margin-left: 30px;
        }
        
        .optimization-card {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            border: 2px solid #4caf50;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            position: relative;
        }
        
        .optimization-card::before {
            content: "💡";
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 16px;
        }
        
        .optimization-card h5 {
            color: #2e7d32;
            font-weight: 600;
            margin-bottom: 10px;
            margin-left: 30px;
        }
        
        .implementation-timeline {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            border: 2px solid #ff9800;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .timeline-phase {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding-left: 30px;
            position: relative;
        }
        
        .timeline-phase::before {
            content: "📅";
            position: absolute;
            left: 0;
            font-size: 14px;
        }
        
        .timeline-phase:last-child {
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
        
        .status-indicator.excellent { background: #4caf50; }
        .status-indicator.good { background: #8bc34a; }
        .status-indicator.average { background: #ff9800; }
        .status-indicator.poor { background: #f44336; }
        .status-indicator.critical { background: #d32f2f; }
        
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
            color: #3498db;
            font-size: 8px;
            top: 0.6em;
        }
        
        @media print {
            body { margin: 0; padding: 20px; font-size: 12px; }
            .section { page-break-inside: avoid; margin-bottom: 30px; }
            .header { padding: 20px; }
        }
        
        @media (max-width: 768px) {
            .company-info, .grid-2, .grid-3, .grid-4, .financial-modules, .diagnosis-summary {
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
        <h1>企业财务体系诊断和优化报告</h1>
        <p class="subtitle">${reportData.companyInfo.name} 财务管理体系全面诊断分析报告 · ${reportData.reportInfo.reportDate}</p>
    </div>

    <!-- 执行摘要 -->
    <div class="executive-summary">
        <h3>🎯 执行摘要</h3>
        <p>${reportData.executiveSummary.overview}</p>
        
        <div class="diagnosis-summary">
            <div class="summary-card critical">
                <h3>关键问题</h3>
                <div class="count">${reportData.executiveSummary.criticalIssues}</div>
                <p>需紧急解决</p>
            </div>
            <div class="summary-card major">
                <h3>重要问题</h3>
                <div class="count">${reportData.executiveSummary.majorIssues}</div>
                <p>需重点关注</p>
            </div>
            <div class="summary-card moderate">
                <h3>一般问题</h3>
                <div class="count">${reportData.executiveSummary.moderateIssues}</div>
                <p>需持续改进</p>
            </div>
            <div class="summary-card good">
                <h3>良好项目</h3>
                <div class="count">${reportData.executiveSummary.goodAreas}</div>
                <p>保持优势</p>
            </div>
        </div>
        
        <div class="grid-3" style="margin-top: 20px;">
            <div class="metric-card">
                <h5>诊断覆盖率</h5>
                <div class="value" style="color: #2196f3;">${reportData.executiveSummary.coverageRate}</div>
            </div>
            <div class="metric-card">
                <h5>财务成熟度</h5>
                <div class="value" style="color: #ff9800;">${reportData.executiveSummary.maturityLevel}</div>
            </div>
            <div class="metric-card">
                <h5>优化潜力</h5>
                <div class="value" style="color: #4caf50;">${reportData.executiveSummary.optimizationPotential}</div>
            </div>
        </div>
    </div>

    <!-- 企业基本情况 -->
    <div class="company-info">
        <div class="info-card">
            <h3>🏢 企业基本信息</h3>
            <table>
                <tr>
                    <th>信息项目</th>
                    <th>详细内容</th>
                </tr>
                <tr>
                    <td>企业名称</td>
                    <td>${reportData.companyInfo.name}</td>
                </tr>
                <tr>
                    <td>成立时间</td>
                    <td>${reportData.companyInfo.establishedYear}</td>
                </tr>
                <tr>
                    <td>注册资本</td>
                    <td>${reportData.companyInfo.registeredCapital}</td>
                </tr>
                <tr>
                    <td>员工总数</td>
                    <td>${reportData.companyInfo.employeeCount}</td>
                </tr>
                <tr>
                    <td>主营业务</td>
                    <td>${reportData.companyInfo.mainBusiness}</td>
                </tr>
                <tr>
                    <td>发展阶段</td>
                    <td>${reportData.companyInfo.developmentStage}</td>
                </tr>
            </table>
        </div>
        
        <div class="info-card">
            <h3>📊 财务组织现状</h3>
            <div style="margin: 15px 0;">
                <strong>财务部门设置：</strong>${reportData.financialOrganization.departmentStructure}
            </div>
            <div style="margin: 15px 0;">
                <strong>财务人员配置：</strong>总计${reportData.financialOrganization.totalStaff}人，其中持证人员${reportData.financialOrganization.certifiedStaff}人
            </div>
            <div style="margin: 15px 0;">
                <strong>财务负责人：</strong>${reportData.financialOrganization.cfoInfo}
            </div>
            <div style="margin: 15px 0;">
                <strong>汇报关系：</strong>${reportData.financialOrganization.reportingLine}
            </div>
            
            <div class="grid-2" style="margin-top: 20px;">
                <div class="metric-card" style="border: none; box-shadow: none;">
                    <h5>近三年营收</h5>
                    <div class="value" style="font-size: 16px; color: #2196f3;">
                        ${reportData.financialPerformance.revenueHistory.map(item => item).join(' / ')}
                    </div>
                </div>
                <div class="metric-card" style="border: none; box-shadow: none;">
                    <h5>增长趋势</h5>
                    <div class="value" style="font-size: 16px; color: #4caf50;">
                        ${reportData.financialPerformance.growthTrend}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 财务组织与人员诊断 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">👥 财务组织与人员诊断</h2>
        </div>
        <div class="section-content">
            <div class="current-status">
                <h5>现状描述</h5>
                <p>${reportData.organizationDiagnosis.currentStatus}</p>
            </div>
            
            <div class="financial-modules">
                <div class="module-card organization">
                    <h4>组织架构分析</h4>
                    ${reportData.organizationDiagnosis.structureIssues.map(issue => `
                        <div class="diagnosis-item ${issue.severity}">
                            <h4>
                                ${issue.title}
                                <span class="severity-badge ${issue.severity}">
                                    ${issue.severity === 'critical' ? '关键' : issue.severity === 'major' ? '重要' : issue.severity === 'moderate' ? '一般' : '良好'}
                                </span>
                            </h4>
                            <p>${issue.description}</p>
                            <div class="problems-identified">
                                <strong>识别问题：</strong>
                                <ul>
                                    ${issue.problems.map(problem => `<li>${problem}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="optimization-card">
                                <h5>改进建议</h5>
                                <p>${issue.recommendation}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="module-card organization">
                    <h4>人员能力评估</h4>
                    ${reportData.organizationDiagnosis.personnelCapability.map(area => `
                        <div class="diagnosis-item ${area.level}">
                            <h4>
                                ${area.area}
                                <span class="severity-badge ${area.level}">
                                    ${area.level === 'critical' ? '关键' : area.level === 'major' ? '重要' : area.level === 'moderate' ? '一般' : '良好'}
                                </span>
                            </h4>
                            <p>${area.assessment}</p>
                            <div class="warning-box">
                                <h5>风险影响</h5>
                                <p>${area.riskImpact}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 财务制度体系诊断 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📋 财务制度体系诊断</h2>
        </div>
        <div class="section-content">
            <div class="current-status">
                <h5>制度建设现状</h5>
                <p>${reportData.systemDiagnosis.currentStatus}</p>
            </div>
            
            <div class="grid-2">
                <div class="module-card system">
                    <h4>制度完整性分析</h4>
                    <table>
                        <tr>
                            <th>制度类别</th>
                            <th>建设状态</th>
                            <th>完善程度</th>
                        </tr>
                        ${reportData.systemDiagnosis.systemCompleteness.map(system => `
                            <tr>
                                <td>${system.category}</td>
                                <td>
                                    <span class="status-indicator ${system.status}"></span>
                                    ${system.statusText}
                                </td>
                                <td>${system.completeness}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div class="module-card system">
                    <h4>制度执行效果</h4>
                    ${reportData.systemDiagnosis.executionEffectiveness.map(item => `
                        <div class="diagnosis-item ${item.level}">
                            <h4>
                                ${item.area}
                                <span class="severity-badge ${item.level}">
                                    ${item.level === 'critical' ? '关键' : item.level === 'major' ? '重要' : item.level === 'moderate' ? '一般' : '良好'}
                                </span>
                            </h4>
                            <p>${item.description}</p>
                            <div class="optimization-card">
                                <h5>优化措施</h5>
                                <p>${item.optimization}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 会计核算体系诊断 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💼 会计核算体系诊断</h2>
        </div>
        <div class="section-content">
            <div class="financial-modules">
                <div class="module-card process">
                    <h4>核算基础评估</h4>
                    <div class="current-status">
                        <h5>当前核算模式</h5>
                        <p>${reportData.accountingDiagnosis.currentMode}</p>
                    </div>
                    ${reportData.accountingDiagnosis.foundationIssues.map(issue => `
                        <div class="diagnosis-item ${issue.severity}">
                            <h4>
                                ${issue.aspect}
                                <span class="severity-badge ${issue.severity}">
                                    ${issue.severity === 'critical' ? '关键' : issue.severity === 'major' ? '重要' : issue.severity === 'moderate' ? '一般' : '良好'}
                                </span>
                            </h4>
                            <p>${issue.findings}</p>
                            <div class="problems-identified">
                                <strong>具体问题：</strong>
                                <ul>
                                    ${issue.specificProblems.map(problem => `<li>${problem}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="module-card process">
                    <h4>核算流程分析</h4>
                    ${reportData.accountingDiagnosis.processAnalysis.map(process => `
                        <div class="diagnosis-item ${process.efficiency}">
                            <h4>
                                ${process.processName}
                                <span class="severity-badge ${process.efficiency}">
                                    ${process.efficiency === 'critical' ? '需改进' : process.efficiency === 'major' ? '一般' : process.efficiency === 'moderate' ? '良好' : '优秀'}
                                </span>
                            </h4>
                            <p><strong>流程描述：</strong>${process.description}</p>
                            <p><strong>效率评估：</strong>${process.efficiencyAssessment}</p>
                            <div class="optimization-card">
                                <h5>优化建议</h5>
                                <p>${process.improvement}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 资金管理诊断 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">💰 资金管理诊断</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                <div class="metric-card">
                    <h5>资金周转率</h5>
                    <div class="value" style="color: #2196f3;">${reportData.cashManagementDiagnosis.metrics.turnoverRate}</div>
                </div>
                <div class="metric-card">
                    <h5>资金使用效率</h5>
                    <div class="value" style="color: #ff9800;">${reportData.cashManagementDiagnosis.metrics.utilizationEfficiency}</div>
                </div>
                <div class="metric-card">
                    <h5>资金安全等级</h5>
                    <div class="value" style="color: #4caf50;">${reportData.cashManagementDiagnosis.metrics.securityLevel}</div>
                </div>
            </div>
            
            <div class="financial-modules">
                <div class="module-card budget">
                    <h4>资金计划管理</h4>
                    ${reportData.cashManagementDiagnosis.planningIssues.map(issue => `
                        <div class="diagnosis-item ${issue.severity}">
                            <h4>
                                ${issue.area}
                                <span class="severity-badge ${issue.severity}">
                                    ${issue.severity === 'critical' ? '关键' : issue.severity === 'major' ? '重要' : issue.severity === 'moderate' ? '一般' : '良好'}
                                </span>
                            </h4>
                            <p>${issue.currentSituation}</p>
                            <div class="warning-box">
                                <h5>主要问题</h5>
                                <ul>
                                    ${issue.problems.map(problem => `<li>${problem}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="optimization-card">
                                <h5>改进方案</h5>
                                <p>${issue.solution}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="module-card budget">
                    <h4>资金安全控制</h4>
                    ${reportData.cashManagementDiagnosis.securityControls.map(control => `
                        <div class="diagnosis-item ${control.effectiveness}">
                            <h4>
                                ${control.controlArea}
                                <span class="severity-badge ${control.effectiveness}">
                                    ${control.effectiveness === 'critical' ? '需加强' : control.effectiveness === 'major' ? '一般' : control.effectiveness === 'moderate' ? '良好' : '优秀'}
                                </span>
                            </h4>
                            <p><strong>控制措施：</strong>${control.measures}</p>
                            <p><strong>执行效果：</strong>${control.execution}</p>
                            ${control.risks.length > 0 ? `
                                <div class="warning-box">
                                    <h5>识别风险</h5>
                                    <ul>
                                        ${control.risks.map(risk => `<li>${risk}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>

    <!-- 预算管理诊断 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📊 预算管理诊断</h2>
        </div>
        <div class="section-content">
            <div class="current-status">
                <h5>预算管理体系现状</h5>
                <p>${reportData.budgetDiagnosis.systemOverview}</p>
            </div>
            
            <div class="grid-2">
                ${reportData.budgetDiagnosis.areas.map(area => `
                    <div class="module-card analysis">
                        <h4>${area.name}</h4>
                        <div class="diagnosis-item ${area.performance}">
                            <h4>
                                绩效评估
                                <span class="severity-badge ${area.performance}">
                                    ${area.performance === 'critical' ? '待改进' : area.performance === 'major' ? '一般' : area.performance === 'moderate' ? '良好' : '优秀'}
                                </span>
                            </h4>
                            <p><strong>当前状况：</strong>${area.currentStatus}</p>
                            <div class="problems-identified">
                                <strong>主要问题：</strong>
                                <ul>
                                    ${area.issues.map(issue => `<li>${issue}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="optimization-card">
                                <h5>改进建议</h5>
                                <ul>
                                    ${area.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <!-- 对标分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🏆 对标分析</h2>
        </div>
        <div class="section-content">
            <div class="benchmark-analysis">
                <h4>行业对标分析</h4>
                <p>${reportData.benchmarkAnalysis.industryComparison.overview}</p>
                
                <table>
                    <tr>
                        <th>对标维度</th>
                        <th>本企业</th>
                        <th>行业平均</th>
                        <th>行业领先</th>
                        <th>差距分析</th>
                    </tr>
                    ${reportData.benchmarkAnalysis.industryComparison.metrics.map(metric => `
                        <tr>
                            <td>${metric.dimension}</td>
                            <td>
                                <span class="status-indicator ${metric.ourLevel}"></span>
                                ${metric.ourValue}
                            </td>
                            <td>${metric.industryAverage}</td>
                            <td>${metric.industryLeading}</td>
                            <td>${metric.gapAnalysis}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
            
            <div class="grid-2">
                <div class="optimization-card">
                    <h5>最佳实践对比</h5>
                    <ul>
                        ${reportData.benchmarkAnalysis.bestPractices.map(practice => `
                            <li><strong>${practice.area}：</strong>${practice.practice}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="optimization-card">
                    <h5>提升优先级</h5>
                    <ul>
                        ${reportData.benchmarkAnalysis.improvementPriorities.map(priority => `
                            <li><strong>${priority.area}：</strong>${priority.action}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 优化建议与实施方案 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🚀 优化建议与实施方案</h2>
        </div>
        <div class="section-content">
            <div class="implementation-timeline">
                <h4 style="color: #ef6c00; margin-bottom: 20px;">📅 分阶段实施计划</h4>
                ${reportData.optimizationPlan.phases.map(phase => `
                    <div class="timeline-phase">
                        <strong>${phase.phase}（${phase.duration}）：</strong>${phase.description}
                        <ul style="margin-left: 30px; margin-top: 10px;">
                            ${phase.keyTasks.map(task => `<li>${task}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="grid-2">
                ${reportData.optimizationPlan.recommendations.map(recommendation => `
                    <div class="optimization-card">
                        <h5>${recommendation.area}</h5>
                        <p><strong>优化目标：</strong>${recommendation.objective}</p>
                        <div style="margin: 15px 0;">
                            <strong>具体措施：</strong>
                            <ul>
                                ${recommendation.measures.map(measure => `<li>${measure}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="margin: 15px 0;">
                            <strong>实施计划：</strong>${recommendation.timeline}
                        </div>
                        <div style="margin: 15px 0;">
                            <strong>预期效果：</strong>${recommendation.expectedResult}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <!-- 效益预测与风险分析 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">📈 效益预测与风险分析</h2>
        </div>
        <div class="section-content">
            <div class="grid-3">
                <div class="metric-card">
                    <h5>预期ROI</h5>
                    <div class="value" style="color: #4caf50;">${reportData.benefitAnalysis.expectedROI}</div>
                </div>
                <div class="metric-card">
                    <h5>效率提升</h5>
                    <div class="value" style="color: #2196f3;">${reportData.benefitAnalysis.efficiencyGain}</div>
                </div>
                <div class="metric-card">
                    <h5>成本节约</h5>
                    <div class="value" style="color: #ff9800;">${reportData.benefitAnalysis.costSaving}</div>
                </div>
            </div>
            
            <div class="grid-2">
                <div class="optimization-card">
                    <h5>量化效益预测</h5>
                    <table>
                        <tr>
                            <th>效益类型</th>
                            <th>预期值</th>
                            <th>实现时间</th>
                        </tr>
                        ${reportData.benefitAnalysis.quantifiedBenefits.map(benefit => `
                            <tr>
                                <td>${benefit.type}</td>
                                <td>${benefit.value}</td>
                                <td>${benefit.timeframe}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <div class="warning-box">
                    <h5>主要风险与应对</h5>
                    <ul>
                        ${reportData.benefitAnalysis.risks.map(risk => `
                            <li><strong>${risk.risk}：</strong>${risk.mitigation}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="current-status">
                <h5>投入估算</h5>
                <p><strong>总投入：</strong>${reportData.benefitAnalysis.totalInvestment}</p>
                <div class="grid-3" style="margin-top: 15px;">
                    <div>人员培训：${reportData.benefitAnalysis.investmentBreakdown.training}</div>
                    <div>系统升级：${reportData.benefitAnalysis.investmentBreakdown.systemUpgrade}</div>
                    <div>咨询服务：${reportData.benefitAnalysis.investmentBreakdown.consulting}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 保障措施 -->
    <div class="section">
        <div class="section-header">
            <h2 class="section-title">🛡️ 保障措施</h2>
        </div>
        <div class="section-content">
            <div class="grid-2">
                ${reportData.safeguardMeasures.map(measure => `
                    <div class="module-card risk">
                        <h4>${measure.category}</h4>
                        <ul>
                            ${measure.measures.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        <div class="optimization-card">
                            <h5>关键成功因素</h5>
                            <p>${measure.keySuccessFactors}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>诊断声明</strong></p>
        <p>本财务体系诊断报告基于企业提供的资料和实地调研进行分析，诊断结果仅供企业内部管理参考。建议企业结合实际情况和战略目标，制定具体的实施方案。</p>
        <br>
        <p><strong>报告信息</strong></p>
        <p>📅 诊断完成时间：${reportData.reportInfo.reportDate} | 🔍 诊断范围：${reportData.reportInfo.diagnosisScope} | 📊 诊断深度：${reportData.reportInfo.diagnosisDepth}</p>
        <p>👥 诊断机构：${reportData.reportInfo.consultingFirm} | 📞 联系方式：${reportData.reportInfo.contact} | 📋 报告编号：${reportData.reportInfo.reportNumber}</p>
    </div>
</body>
</html>
    `;
};

// 获取示例报告数据
export const getFinancialSystemDiagnosisReportData = () => {
    return {
        companyInfo: {
            name: "XX制造集团有限公司",
            establishedYear: "2015年",
            registeredCapital: "8000万元",
            employeeCount: "650人",
            mainBusiness: "智能制造设备研发、生产与销售",
            developmentStage: "快速成长期"
        },
        reportInfo: {
            reportDate: "2025年1月25日",
            reportNumber: "FSD-20250125-001",
            diagnosisScope: "财务管理全体系",
            diagnosisDepth: "深度诊断",
            consultingFirm: "XX财务管理咨询有限公司",
            contact: "400-888-9999",
            diagnosisPeriod: "2024年11月-2025年1月"
        },
        executiveSummary: {
            overview: "本次财务体系诊断通过深入分析企业财务组织架构、制度流程、信息系统、风险管控等关键领域，识别出企业财务管理中存在的主要问题和改进机会。诊断发现企业在财务规划、成本控制、资金管理等方面存在薄弱环节，建议通过优化组织结构、完善制度体系、强化信息化建设等措施，提升财务管理效能，支撑企业战略目标实现。",
            criticalIssues: 12,
            majorIssues: 18,
            moderateIssues: 25,
            goodAreas: 45,
            coverageRate: "95.8%",
            maturityLevel: "3.2级",
            optimizationPotential: "高"
        },
        financialOrganization: {
            departmentStructure: "财务部、成本控制部、资金管理部",
            totalStaff: 28,
            certifiedStaff: 15,
            cfoInfo: "财务总监（CPA、ACCA双证）",
            reportingLine: "直接向总经理汇报"
        },
        financialPerformance: {
            revenueHistory: ["5.2亿元", "7.8亿元", "9.6亿元"],
            growthTrend: "稳步上升"
        },
        organizationDiagnosis: {
            currentStatus: "企业财务部门设置财务部、成本控制部、资金管理部三个职能部门，财务人员总计28人，其中具有专业资格证书人员15人。财务总监具备CPA、ACCA双重资格，直接向总经理汇报。整体组织架构相对完整，但在职责分工和人员配置方面仍有优化空间。",
            structureIssues: [
                {
                    title: "组织架构层级过多",
                    severity: "major",
                    description: "财务组织架构层级较多，决策链条较长，影响工作效率和响应速度。",
                    problems: [
                        "部门间沟通协调成本高",
                        "决策审批流程冗长",
                        "责任界定不够清晰",
                        "信息传递效率较低"
                    ],
                    recommendation: "建议优化组织架构，减少管理层级，建立扁平化的财务组织结构，提高决策效率和响应速度。"
                },
                {
                    title: "岗位职责交叉重叠",
                    severity: "moderate",
                    description: "部分岗位职责定义不清，存在职责交叉和工作重叠现象。",
                    problems: [
                        "成本核算与财务核算职责交叉",
                        "资金管理与会计核算边界模糊",
                        "预算编制与执行监控职责不清"
                    ],
                    recommendation: "重新梳理岗位职责，建立清晰的职责矩阵，避免职责交叉和工作重叠。"
                }
            ],
            personnelCapability: [
                {
                    area: "专业技能水平",
                    level: "moderate",
                    assessment: "财务人员整体专业基础较好，但在新会计准则、税务政策、财务分析等方面需要持续提升。",
                    riskImpact: "可能影响财务工作质量和合规性，增加财务风险。"
                },
                {
                    area: "信息化应用能力",
                    level: "major",
                    assessment: "部分员工对财务信息系统应用不够熟练，数据分析能力有待提高。",
                    riskImpact: "降低工作效率，影响财务信息化建设进程。"
                },
                {
                    area: "沟通协调能力",
                    level: "good",
                    assessment: "财务人员与业务部门沟通配合良好，团队协作意识较强。",
                    riskImpact: "有利于财务工作的顺利开展和跨部门协作。"
                }
            ]
        },
        systemDiagnosis: {
            currentStatus: "企业建立了会计核算制度、资金管理制度、预算管理制度等财务管理制度，涵盖了财务管理的主要领域。但制度体系的完整性、执行性和时效性仍需加强。",
            systemCompleteness: [
                {
                    category: "会计核算制度",
                    status: "good",
                    statusText: "已建立",
                    completeness: "85%"
                },
                {
                    category: "资金管理制度",
                    status: "average",
                    statusText: "部分缺失",
                    completeness: "70%"
                },
                {
                    category: "预算管理制度",
                    status: "good",
                    statusText: "已建立",
                    completeness: "80%"
                },
                {
                    category: "成本管理制度",
                    status: "poor",
                    statusText: "需完善",
                    completeness: "60%"
                },
                {
                    category: "内控管理制度",
                    status: "average",
                    statusText: "基本建立",
                    completeness: "75%"
                },
                {
                    category: "税务管理制度",
                    status: "poor",
                    statusText: "亟需建立",
                    completeness: "45%"
                }
            ],
            executionEffectiveness: [
                {
                    area: "制度执行监督",
                    level: "major",
                    description: "制度执行缺乏有效的监督机制，执行情况参差不齐。",
                    optimization: "建立制度执行检查机制，定期评估制度执行效果，及时发现和纠正执行偏差。"
                },
                {
                    area: "制度更新机制",
                    level: "moderate",
                    description: "制度更新不够及时，部分制度滞后于业务发展和法规变化。",
                    optimization: "建立制度定期回顾和更新机制，确保制度与业务发展和法规要求保持同步。"
                }
            ]
        },
        accountingDiagnosis: {
            currentMode: "企业采用企业会计准则进行会计核算，建立了相对完整的会计科目体系，核算流程包括凭证录入、审核、记账、对账、结账等环节。但在科目设置、流程标准化、质量控制等方面仍有改进空间。",
            foundationIssues: [
                {
                    aspect: "会计科目设置",
                    severity: "moderate",
                    findings: "会计科目设置不够细化，难以满足精细化管理需求。",
                    specificProblems: [
                        "成本费用科目设置过于粗糙",
                        "项目核算科目不够细分",
                        "辅助核算项目设置不完善",
                        "科目编码规则不够规范"
                    ]
                },
                {
                    aspect: "凭证管理",
                    severity: "major",
                    findings: "凭证录入、审核、保管等环节存在规范性问题。",
                    specificProblems: [
                        "凭证录入标准不统一",
                        "审核流程不够严格",
                        "电子凭证管理不规范",
                        "凭证归档制度需完善"
                    ]
                }
            ],
            processAnalysis: [
                {
                    processName: "月度结账流程",
                    efficiency: "moderate",
                    description: "从业务发生到月度财务报表出具",
                    efficiencyAssessment: "结账周期较长，通常需要15个工作日，效率有待提高。",
                    improvement: "优化结账流程，建立标准作业程序，争取将结账周期缩短至10个工作日以内。"
                },
                {
                    processName: "对账机制",
                    efficiency: "major",
                    description: "内部各账簿之间以及与外部单位的对账",
                    efficiencyAssessment: "对账不够及时，差异发现和处理滞后。",
                    improvement: "建立定期对账机制，加强系统自动对账功能，及时发现和处理差异。"
                }
            ]
        },
        cashManagementDiagnosis: {
            metrics: {
                turnoverRate: "6.2次",
                utilizationEfficiency: "78%",
                securityLevel: "B级"
            },
            planningIssues: [
                {
                    area: "资金计划准确性",
                    severity: "major",
                    currentSituation: "资金计划编制主要基于历史经验，科学性和准确性不足。",
                    problems: [
                        "缺乏科学的预测模型",
                        "业务部门参与度不够",
                        "外部因素考虑不充分",
                        "计划调整机制不灵活"
                    ],
                    solution: "建立基于业务预测的资金计划编制体系，提高计划的科学性和准确性。"
                },
                {
                    area: "资金调度效率",
                    severity: "moderate",
                    currentSituation: "资金调度主要依靠人工操作，效率较低，存在资金闲置现象。",
                    problems: [
                        "缺乏自动化调度工具",
                        "银行账户管理分散",
                        "资金池管理不完善",
                        "投资决策不够及时"
                    ],
                    solution: "建立集中化的资金管理平台，提高资金调度的自动化程度和效率。"
                }
            ],
            securityControls: [
                {
                    controlArea: "授权审批控制",
                    effectiveness: "good",
                    measures: "建立了分级授权审批制度，大额资金支付需要多人审批。",
                    execution: "执行情况良好，但审批流程可以进一步优化。",
                    risks: []
                },
                {
                    controlArea: "银行账户管理",
                    effectiveness: "major",
                    measures: "银行账户开立、变更、注销有一定的管理规定。",
                    execution: "执行不够严格，存在账户管理不规范问题。",
                    risks: [
                        "部分闲置账户未及时注销",
                        "账户用途管理不够明确",
                        "网银权限管理需要加强"
                    ]
                }
            ]
        },
        budgetDiagnosis: {
            systemOverview: "企业建立了全面预算管理体系，包括经营预算、资本预算、财务预算等，预算编制周期为年度预算，执行过程中进行月度监控和季度分析。但在预算编制的科学性、执行的严肃性、分析的深度等方面仍需改进。",
            areas: [
                {
                    name: "预算编制",
                    performance: "moderate",
                    currentStatus: "预算编制基本按照规定流程进行，但编制方法相对简单，主要采用增量预算法。",
                    issues: [
                        "编制方法单一，缺乏零基预算等先进方法",
                        "编制依据不够充分，主要基于历史数据",
                        "各部门参与度不够，编制质量有待提高",
                        "预算目标与战略目标联系不够紧密"
                    ],
                    improvements: [
                        "引入零基预算、滚动预算等先进方法",
                        "加强预算编制的业务基础工作",
                        "提高各部门预算编制的参与度和责任感",
                        "强化预算与战略规划的衔接"
                    ]
                },
                {
                    name: "预算执行",
                    performance: "major",
                    currentStatus: "预算执行监控相对薄弱，缺乏有效的预算控制手段。",
                    issues: [
                        "预算执行监控不够及时",
                        "预算差异分析不够深入",
                        "预算调整程序不够规范",
                        "超预算支出控制不够严格"
                    ],
                    improvements: [
                        "建立实时预算监控系统",
                        "加强预算差异的原因分析",
                        "规范预算调整审批程序",
                        "强化预算约束的刚性"
                    ]
                },
                {
                    name: "预算考核",
                    performance: "moderate",
                    currentStatus: "建立了基本的预算考核制度，但考核指标不够全面，考核结果应用不够充分。",
                    issues: [
                        "考核指标设置不够科学",
                        "考核标准不够明确",
                        "考核结果与激励机制联系不够紧密",
                        "考核反馈机制不够完善"
                    ],
                    improvements: [
                        "完善预算考核指标体系",
                        "明确考核标准和评价方法",
                        "加强考核结果与薪酬激励的联系",
                        "建立考核反馈和改进机制"
                    ]
                }
            ]
        },
        benchmarkAnalysis: {
            industryComparison: {
                overview: "与同行业优秀企业相比，本企业在财务管理标准化程度、信息化水平、财务分析能力等方面存在一定差距。行业先进企业普遍建立了完善的财务共享中心，实现了财务流程标准化和自动化，财务分析更加深入和前瞻。",
                metrics: [
                    {
                        dimension: "财务信息化水平",
                        ourLevel: "average",
                        ourValue: "中等",
                        industryAverage: "中上",
                        industryLeading: "优秀",
                        gapAnalysis: "需加强系统集成和智能化应用"
                    },
                    {
                        dimension: "财务流程标准化",
                        ourLevel: "poor",
                        ourValue: "初级",
                        industryAverage: "中等",
                        industryLeading: "高级",
                        gapAnalysis: "流程标准化程度较低，需系统梳理"
                    },
                    {
                        dimension: "财务分析深度",
                        ourLevel: "average",
                        ourValue: "基础",
                        industryAverage: "中等",
                        industryLeading: "深度",
                        gapAnalysis: "分析维度单一，需引入先进分析方法"
                    },
                    {
                        dimension: "成本管理精度",
                        ourLevel: "poor",
                        ourValue: "粗放",
                        industryAverage: "精细",
                        industryLeading: "精准",
                        gapAnalysis: "成本核算不够精确，控制手段单一"
                    }
                ]
            },
            bestPractices: [
                {
                    area: "财务共享服务",
                    practice: "建立财务共享中心，实现标准化、自动化处理"
                },
                {
                    area: "业财融合",
                    practice: "财务深度参与业务决策，提供前瞻性分析"
                },
                {
                    area: "数字化转型",
                    practice: "运用大数据、AI等技术提升财务管理效率"
                },
                {
                    area: "风险管控",
                    practice: "建立全面风险管理体系，实现风险可视化"
                }
            ],
            improvementPriorities: [
                {
                    area: "组织架构优化",
                    action: "建立扁平化组织结构，提高决策效率"
                },
                {
                    area: "信息系统升级",
                    action: "升级财务信息系统，加强数据集成"
                },
                {
                    area: "流程标准化",
                    action: "梳理优化财务流程，建立标准作业程序"
                },
                {
                    area: "人员能力提升",
                    action: "加强培训，提升财务人员专业技能"
                }
            ]
        },
        optimizationPlan: {
            phases: [
                {
                    phase: "第一阶段",
                    duration: "1-6个月",
                    description: "基础优化阶段，重点解决关键问题，建立基础管理框架",
                    keyTasks: [
                        "优化财务组织架构，明确岗位职责",
                        "完善核心财务制度，建立执行监督机制",
                        "梳理关键财务流程，制定标准作业程序",
                        "加强财务人员培训，提升基础技能"
                    ]
                },
                {
                    phase: "第二阶段",
                    duration: "7-12个月",
                    description: "系统提升阶段，重点加强信息化建设和管理水平提升",
                    keyTasks: [
                        "升级财务信息系统，加强系统集成",
                        "建立财务分析体系，提升分析能力",
                        "完善预算管理体系，强化执行控制",
                        "建立成本管理体系，实现精细化管理"
                    ]
                },
                {
                    phase: "第三阶段",
                    duration: "13-18个月",
                    description: "深化创新阶段，重点实现管理创新和价值创造",
                    keyTasks: [
                        "建立财务共享服务中心",
                        "推进业财深度融合",
                        "引入智能财务技术",
                        "建立全面风险管理体系"
                    ]
                }
            ],
            recommendations: [
                {
                    area: "财务组织优化",
                    objective: "建立职责清晰、运行高效的财务组织体系",
                    measures: [
                        "调整财务组织架构，减少管理层级",
                        "明确岗位职责分工，避免职责交叉",
                        "建立财务人员能力模型和发展通道",
                        "完善绩效考核体系，建立激励机制"
                    ],
                    timeline: "第一阶段完成架构调整，第二阶段优化人员配置",
                    expectedResult: "财务组织运行效率提升30%，人员专业能力显著增强"
                },
                {
                    area: "制度体系完善",
                    objective: "构建全面、科学、可执行的财务制度体系",
                    measures: [
                        "梳理现有制度，识别制度缺口",
                        "制定新增制度，修订完善现有制度",
                        "建立制度定期更新机制",
                        "强化制度执行监督和考核"
                    ],
                    timeline: "分批次在18个月内完善各项制度",
                    expectedResult: "制度完整性达到95%以上，执行效果显著改善"
                },
                {
                    area: "信息系统升级",
                    objective: "建设集成化、智能化的财务信息系统",
                    measures: [
                        "升级现有财务系统，加强系统集成",
                        "引入财务机器人，提高自动化水平",
                        "建立数据分析平台，提升分析能力",
                        "完善系统安全保障措施"
                    ],
                    timeline: "第二阶段重点实施，第三阶段深化应用",
                    expectedResult: "财务工作效率提升50%，数据质量和分析能力大幅提升"
                },
                {
                    area: "预算管理提升",
                    objective: "建立科学有效的全面预算管理体系",
                    measures: [
                        "完善预算编制方法，引入先进预算技术",
                        "建立滚动预算机制，提高预算准确性",
                        "强化预算执行监控，建立实时控制系统",
                        "完善预算考核体系，强化结果应用"
                    ],
                    timeline: "第二阶段重点建设，持续优化完善",
                    expectedResult: "预算准确性提升至90%以上，预算管理效果显著改善"
                }
            ]
        },
        benefitAnalysis: {
            expectedROI: "280%",
            efficiencyGain: "45%",
            costSaving: "1200万元",
            totalInvestment: "680万元",
            investmentBreakdown: {
                training: "180万元",
                systemUpgrade: "350万元",
                consulting: "150万元"
            },
            quantifiedBenefits: [
                {
                    type: "工作效率提升",
                    value: "45%",
                    timeframe: "12个月"
                },
                {
                    type: "人工成本节约",
                    value: "800万元/年",
                    timeframe: "18个月"
                },
                {
                    type: "资金使用效率",
                    value: "提升25%",
                    timeframe: "24个月"
                },
                {
                    type: "决策支持能力",
                    value: "显著增强",
                    timeframe: "15个月"
                }
            ],
            risks: [
                {
                    risk: "实施进度延迟风险",
                    mitigation: "制定详细实施计划，建立项目监控机制，及时调整优化"
                },
                {
                    risk: "人员配合度不足",
                    mitigation: "加强沟通培训，建立激励机制，确保全员参与"
                },
                {
                    risk: "技术实施风险",
                    mitigation: "选择成熟技术方案，配备专业技术团队，建立技术支持体系"
                },
                {
                    risk: "成本超支风险",
                    mitigation: "严格控制项目预算，建立成本监控机制，及时调整实施方案"
                }
            ]
        },
        safeguardMeasures: [
            {
                category: "组织保障",
                measures: [
                    "建立财务体系优化项目组，明确项目责任人",
                    "配备专门的项目团队，确保项目顺利实施",
                    "建立高层支持机制，确保资源投入",
                    "建立跨部门协调机制，保障项目协同"
                ],
                keySuccessFactors: "高层重视支持，专业团队配备，有效协调沟通"
            },
            {
                category: "制度保障",
                measures: [
                    "制定项目管理制度，规范项目运行",
                    "建立进度报告机制，及时掌握项目状态",
                    "完善验收标准，确保项目质量",
                    "建立风险应对机制，及时处理项目风险"
                ],
                keySuccessFactors: "制度规范完善，执行监督到位，风险应对及时"
            },
            {
                category: "技术保障",
                measures: [
                    "配备专业的技术团队，确保技术实施能力",
                    "建立技术支持体系，及时解决技术问题",
                    "选择成熟稳定的技术方案，降低实施风险",
                    "建立技术培训机制，提升用户应用能力"
                ],
                keySuccessFactors: "技术方案先进可靠，实施团队专业强，用户培训充分"
            },
            {
                category: "人员保障",
                measures: [
                    "加强人员培训，提升团队能力",
                    "建立激励机制，调动员工积极性",
                    "完善人才引进机制，补强关键岗位",
                    "建立知识管理体系，促进经验分享"
                ],
                keySuccessFactors: "人员能力过硬，积极性高，团队协作好"
            }
        ]
    };
};

// 保持向后兼容
export const getFinancialDiagnosisReportData = getFinancialSystemDiagnosisReportData;