// src/report/LandValueAddedTaxVerificationReport.js

export const getLandValueAddedTaxReportData = () => {
    return {
        title: 'XYZ地产开发土地增值税清算鉴证报告',
        client: 'XYZ地产开发',
        taxYear: '2023年度',
        createDate: '2024-07-30',
        author: '李四',
        reviewer: '王经理',
        fileSize: '3.5MB',
        pages: 62,
        summary: {
            totalRevenue: '12.8亿元',
            deductibleAmount: '9.6亿元',
            taxableAmount: '3.2亿元',
            taxAmount: '9600万元',
            keyFindings: [
                '土地成本扣除符合规定',
                '开发成本归集基本合理',
                '销售费用扣除标准符合要求'
            ],
            riskPoints: [
                '部分装修费用扣除标准需要确认',
                '公共配套设施费用分摊需要完善'
            ],
            conclusion: '保留意见'
        }
    };
};

export const generateReportHTML = (reportData) => {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif; 
            line-height: 1.8; 
            margin: 0; 
            padding: 20px; 
            background: #f5f7fa;
            color: #333;
        }
        
        .report-container { 
            max-width: 900px; 
            margin: 0 auto; 
            background: white; 
            padding: 60px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        
        .header { 
            text-align: center; 
            margin-bottom: 50px; 
            border-bottom: 3px solid #059669; 
            padding-bottom: 30px; 
        }
        
        .title { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 15px; 
            color: #047857;
            letter-spacing: 1px;
        }
        
        .subtitle { 
            font-size: 18px; 
            color: #6b7280; 
            margin-bottom: 10px;
        }
        
        .report-meta {
            font-size: 14px;
            color: #9ca3af;
            margin-top: 10px;
        }
        
        .section { 
            margin-bottom: 35px; 
        }
        
        .section-title { 
            font-size: 20px; 
            font-weight: bold; 
            margin-bottom: 20px; 
            color: #1f2937; 
            border-left: 5px solid #10b981; 
            padding-left: 15px;
            background: #f0fdf4;
            padding: 15px;
            border-radius: 6px;
        }
        
        .info-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 25px;
            font-size: 15px;
        }
        
        .info-table th, .info-table td { 
            border: 1px solid #e5e7eb; 
            padding: 15px; 
            text-align: left; 
            vertical-align: top;
        }
        
        .info-table th { 
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); 
            font-weight: bold;
            color: #374151;
            width: 30%;
        }
        
        .info-table td {
            background: #fefefe;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 1px solid #6ee7b7;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .conclusion { 
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
            border: 2px solid #f59e0b; 
            border-radius: 10px; 
            padding: 30px; 
            margin-top: 40px;
            position: relative;
        }
        
        .conclusion::before {
            content: "⚠";
            position: absolute;
            top: -15px;
            left: 20px;
            background: #f59e0b;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .signature-section { 
            margin-top: 50px; 
            text-align: right;
            padding-top: 30px;
            border-top: 2px dashed #d1d5db;
        }
        
        .signature-item {
            margin-bottom: 15px;
            font-size: 16px;
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
            padding: 12px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-primary {
            background: #10b981;
            color: white;
        }
        
        .btn-primary:hover {
            background: #059669;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .btn-secondary {
            background: #6b7280;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #4b5563;
            transform: translateY(-2px);
        }
        
        @media print { 
            .print-controls { display: none; } 
            body { background: white; padding: 0; } 
            .report-container { 
                box-shadow: none; 
                border-radius: 0;
                padding: 40px;
            }
            .page-break {
                page-break-before: always;
            }
        }
        
        ul, ol { 
            margin: 15px 0; 
            padding-left: 25px; 
        }
        
        li { 
            margin: 8px 0;
            line-height: 1.6;
        }
        
        .procedures-list {
            counter-reset: procedure-counter;
        }
        
        .procedures-list li {
            counter-increment: procedure-counter;
            position: relative;
            margin-bottom: 15px;
            padding-left: 20px;
        }
        
        .procedures-list li::before {
            content: counter(procedure-counter);
            position: absolute;
            left: -25px;
            top: 0;
            background: #10b981;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        }
        
        .risk-item {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 10px 0;
            border-radius: 0 6px 6px 0;
        }
        
        .finding-item {
            background: #ecfdf5;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin: 10px 0;
            border-radius: 0 6px 6px 0;
        }
        
        .calculation-table {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
            margin: 20px 0;
        }
        
        .calculation-table th {
            background: #334155;
            color: white;
            text-align: center;
        }
        
        .footer-info {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
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
    
    <div class="report-container">
        <div class="header">
            <div class="title">${reportData.title}</div>
            <div class="subtitle">清算年度：${reportData.taxYear}</div>
            <div class="report-meta">
                报告编号：TDZZ-2024-002 | 生成时间：${reportData.createDate}
            </div>
        </div>

        <div class="section">
            <div class="section-title">一、基本信息</div>
            <table class="info-table">
                <tr><th>被鉴证单位</th><td>${reportData.client}</td></tr>
                <tr><th>清算项目</th><td>房地产开发项目土地增值税清算</td></tr>
                <tr><th>清算期间</th><td>${reportData.taxYear}</td></tr>
                <tr><th>报告日期</th><td>${reportData.createDate}</td></tr>
                <tr><th>注册税务师</th><td>${reportData.author}</td></tr>
                <tr><th>复核人</th><td>${reportData.reviewer}</td></tr>
                <tr><th>项目地址</th><td>某市某区某路某号房地产开发项目</td></tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">二、清算概况</div>
            <div class="highlight-box">
                <table class="info-table calculation-table">
                    <tr><th style="background: #1e40af;">项目</th><th style="background: #1e40af;">金额（万元）</th><th style="background: #1e40af;">备注</th></tr>
                    <tr><td><strong>收入总额</strong></td><td style="text-align: right; font-weight: bold;">${parseInt(reportData.summary.totalRevenue.replace('亿元', '')) * 10000}</td><td>含销售收入及其他收入</td></tr>
                    <tr><td><strong>扣除项目金额</strong></td><td style="text-align: right; font-weight: bold;">${parseInt(reportData.summary.deductibleAmount.replace('亿元', '')) * 10000}</td><td>土地成本+开发成本+费用+税金</td></tr>
                    <tr><td><strong>增值额</strong></td><td style="text-align: right; font-weight: bold; color: #dc2626;">${parseInt(reportData.summary.taxableAmount.replace('亿元', '')) * 10000}</td><td>收入总额-扣除项目金额</td></tr>
                    <tr><td><strong>增值率</strong></td><td style="text-align: right; font-weight: bold;">33.33%</td><td>增值额/扣除项目金额×100%</td></tr>
                    <tr><td><strong>应纳土地增值税</strong></td><td style="text-align: right; font-weight: bold; color: #dc2626;">${parseInt(reportData.summary.taxAmount.replace('万元', ''))}</td><td>按30%税率计算</td></tr>
                </table>
            </div>
        </div>

        <div class="section">
            <div class="section-title">三、主要核查情况</div>
            <p style="margin-bottom: 20px;"><strong>扣除项目核查结果：</strong></p>
            ${reportData.summary.keyFindings.map(finding => `
                <div class="finding-item">
                    <strong>✓</strong> ${finding}
                </div>
            `).join('')}
        </div>

        <div class="section">
            <div class="section-title">四、需要关注的问题</div>
            ${reportData.summary.riskPoints.map(risk => `
                <div class="risk-item">
                    <strong>⚠️</strong> ${risk}
                </div>
            `).join('')}
        </div>

        <div class="section page-break">
            <div class="section-title">五、鉴证程序</div>
            <ol class="procedures-list">
                <li>了解房地产开发项目基本情况，包括项目规划、开发进度等</li>
                <li>核查收入确认的完整性和准确性，检查销售合同和收款凭证</li>
                <li>检查土地成本的真实性和完整性，核实土地出让合同和付款凭证</li>
                <li>核实开发成本的合理性和准确性，检查开发支出的真实性</li>
                <li>审核开发费用的计算依据，确认费用扣除标准的合规性</li>
                <li>检查税金及附加的计算准确性和完整性</li>
                <li>核查扣除项目加计20%的计算是否正确</li>
                <li>验证土地增值税计算的准确性，确认适用税率</li>
                <li>检查清算资料的完整性和规范性</li>
            </ol>
        </div>

        <div class="section">
            <div class="section-title">六、扣除项目明细分析</div>
            <div class="highlight-box">
                <table class="info-table">
                    <tr><th>扣除项目</th><th>金额（万元）</th><th>占比</th><th>核查结果</th></tr>
                    <tr><td>土地成本</td><td style="text-align: right;">24,000</td><td style="text-align: right;">25.0%</td><td style="color: #059669;">✓ 合规</td></tr>
                    <tr><td>开发成本</td><td style="text-align: right;">48,000</td><td style="text-align: right;">50.0%</td><td style="color: #059669;">✓ 合规</td></tr>
                    <tr><td>开发费用</td><td style="text-align: right;">14,400</td><td style="text-align: right;">15.0%</td><td style="color: #059669;">✓ 合规</td></tr>
                    <tr><td>税金及附加</td><td style="text-align: right;">4,800</td><td style="text-align: right;">5.0%</td><td style="color: #059669;">✓ 合规</td></tr>
                    <tr><td>加计扣除（20%）</td><td style="text-align: right;">4,800</td><td style="text-align: right;">5.0%</td><td style="color: #059669;">✓ 合规</td></tr>
                    <tr style="background: #f1f5f9; font-weight: bold;"><td>合计</td><td style="text-align: right;">96,000</td><td style="text-align: right;">100.0%</td><td>-</td></tr>
                </table>
            </div>
        </div>

        <div class="conclusion">
            <div class="section-title" style="margin-bottom: 20px; padding-left: 0; background: none;">七、鉴证结论</div>
            <p style="font-size: 16px; line-height: 1.8;">
                基于执行的鉴证程序，我们认为${reportData.client}${reportData.taxYear}土地增值税清算申报表在重大方面符合《中华人民共和国土地增值税暂行条例》及其实施细则的规定，但存在部分需要完善的事项。
            </p>
            <p style="margin-top: 20px; font-size: 18px; font-weight: bold; color: #d97706;">
                <strong>鉴证意见：${reportData.summary.conclusion}</strong>
            </p>
            <p style="margin-top: 15px; font-size: 14px; color: #7c2d12;">
                注：保留意见主要涉及部分装修费用扣除标准和公共配套设施费用分摊方法，建议完善相关资料后重新核实。
            </p>
        </div>

        <div class="signature-section">
            <div class="signature-item">
                <strong>注册税务师事务所：</strong>智税云财税服务有限公司
            </div>
            <div class="signature-item">
                <strong>注册税务师：</strong>${reportData.author}（签名）
            </div>
            <div class="signature-item">
                <strong>复核人：</strong>${reportData.reviewer}（签名）
            </div>
            <div class="signature-item">
                <strong>报告日期：</strong>${reportData.createDate}
            </div>
        </div>

        <div class="footer-info">
            本报告仅供${reportData.client}土地增值税清算申报使用<br>
            未经本事务所书面同意，不得用于其他目的或向第三方提供
        </div>
    </div>
</body>
</html>
    `;
};