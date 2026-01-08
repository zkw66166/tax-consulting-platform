// src/report/RDExpenseVerificationReport.js

export const getRDExpenseReportData = () => {
    return {
        title: '科技创新公司研发费用专项鉴证报告',
        client: '科技创新公司',
        taxYear: '2023年度',
        createDate: '2024-07-30',
        author: '王五',
        reviewer: '张经理',
        fileSize: '1.9MB',
        pages: 28,
        summary: {
            totalRDExpense: '2800万元',
            deductibleAmount: '5600万元',
            taxSaving: '1400万元',
            keyFindings: [
                '研发项目识别准确',
                '费用归集符合规定',
                '加计扣除比例正确'
            ],
            riskPoints: [
                '部分人员工时分配需要完善'
            ],
            conclusion: '无保留意见'
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
            border-bottom: 3px solid #7c3aed; 
            padding-bottom: 30px; 
        }
        
        .title { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 15px; 
            color: #6d28d9;
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
            border-left: 5px solid #8b5cf6; 
            padding-left: 15px;
            background: #faf5ff;
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
            background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%); 
            font-weight: bold;
            color: #374151;
            width: 30%;
        }
        
        .info-table td {
            background: #fefefe;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%);
            border: 1px solid #c4b5fd;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .conclusion { 
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); 
            border: 2px solid #34d399; 
            border-radius: 10px; 
            padding: 30px; 
            margin-top: 40px;
            position: relative;
        }
        
        .conclusion::before {
            content: "✓";
            position: absolute;
            top: -15px;
            left: 20px;
            background: #10b981;
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
            background: #8b5cf6;
            color: white;
        }
        
        .btn-primary:hover {
            background: #7c3aed;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
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
            background: #8b5cf6;
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
            background: #faf5ff;
            border-left: 4px solid #8b5cf6;
            padding: 15px;
            margin: 10px 0;
            border-radius: 0 6px 6px 0;
        }
        
        .rd-project-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
        }
        
        .rd-project-title {
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .expense-breakdown {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .expense-item {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #8b5cf6;
            text-align: center;
        }
        
        .expense-amount {
            font-size: 18px;
            font-weight: bold;
            color: #6d28d9;
        }
        
        .expense-label {
            font-size: 12px;
            color: #64748b;
            margin-top: 5px;
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
            <div class="subtitle">鉴证年度：${reportData.taxYear}</div>
            <div class="report-meta">
                报告编号：RFZX-2024-003 | 生成时间：${reportData.createDate}
            </div>
        </div>

        <div class="section">
            <div class="section-title">一、基本信息</div>
            <table class="info-table">
                <tr><th>被鉴证单位</th><td>${reportData.client}</td></tr>
                <tr><th>鉴证期间</th><td>${reportData.taxYear}</td></tr>
                <tr><th>报告日期</th><td>${reportData.createDate}</td></tr>
                <tr><th>注册税务师</th><td>${reportData.author}</td></tr>
                <tr><th>复核人</th><td>${reportData.reviewer}</td></tr>
                <tr><th>企业性质</th><td>高新技术企业</td></tr>
                <tr><th>主营业务</th><td>软件开发与技术服务</td></tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">二、研发费用概况</div>
            <div class="highlight-box">
                <div class="expense-breakdown">
                    <div class="expense-item">
                        <div class="expense-amount">${reportData.summary.totalRDExpense}</div>
                        <div class="expense-label">研发费用总额</div>
                    </div>
                    <div class="expense-item">
                        <div class="expense-amount">${reportData.summary.deductibleAmount}</div>
                        <div class="expense-label">加计扣除金额<br>(200%)</div>
                    </div>
                    <div class="expense-item">
                        <div class="expense-amount">${reportData.summary.taxSaving}</div>
                        <div class="expense-label">预计节税金额<br>(按25%税率)</div>
                    </div>
                    <div class="expense-item">
                        <div class="expense-amount">12个</div>
                        <div class="expense-label">研发项目数量</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">三、研发项目明细</div>
            
            <div class="rd-project-card">
                <div class="rd-project-title">项目一：智能数据分析平台</div>
                <table class="info-table">
                    <tr><th>项目期间</th><td>2023年1月-2023年12月</td></tr>
                    <tr><th>研发费用</th><td>680万元</td></tr>
                    <tr><th>主要内容</th><td>开发基于机器学习的智能数据分析平台，包括数据采集、清洗、分析和可视化模块</td></tr>
                    <tr><th>技术创新点</th><td>自主研发的分布式计算引擎，支持大规模数据实时处理</td></tr>
                </table>
            </div>

            <div class="rd-project-card">
                <div class="rd-project-title">项目二：云原生微服务架构</div>
                <table class="info-table">
                    <tr><th>项目期间</th><td>2023年3月-2023年11月</td></tr>
                    <tr><th>研发费用</th><td>520万元</td></tr>
                    <tr><th>主要内容</th><td>构建基于容器技术的云原生微服务架构，提供高可用、可扩展的服务治理方案</td></tr>
                    <tr><th>技术创新点</th><td>自研的服务网格技术，实现服务间通信的智能路由和负载均衡</td></tr>
                </table>
            </div>

            <div class="rd-project-card">
                <div class="rd-project-title">其他研发项目</div>
                <p style="color: #64748b; font-size: 14px;">
                    包括区块链溯源系统、AI语音识别引擎、物联网数据采集平台等10个项目，
                    研发费用合计1600万元，均符合研发活动认定标准。
                </p>
            </div>
        </div>

        <div class="section">
            <div class="section-title">四、费用归集明细</div>
            <div class="highlight-box">
                <table class="info-table">
                    <tr><th>费用类别</th><th>金额（万元）</th><th>占比</th><th>主要内容</th></tr>
                    <tr><td>人员人工费用</td><td style="text-align: right;">1,680</td><td style="text-align: right;">60.0%</td><td>研发人员工资、奖金、津贴、社保等</td></tr>
                    <tr><td>直接投入费用</td><td style="text-align: right;">560</td><td style="text-align: right;">20.0%</td><td>原材料、设备、软件采购等</td></tr>
                    <tr><td>折旧费用</td><td style="text-align: right;">280</td><td style="text-align: right;">10.0%</td><td>研发设备、仪器折旧</td></tr>
                    <tr><td>无形资产摊销</td><td style="text-align: right;">140</td><td style="text-align: right;">5.0%</td><td>软件、专利等摊销</td></tr>
                    <tr><td>设计费用</td><td style="text-align: right;">84</td><td style="text-align: right;">3.0%</td><td>外包设计、技术服务费</td></tr>
                    <tr><td>其他相关费用</td><td style="text-align: right;">56</td><td style="text-align: right;">2.0%</td><td>差旅费、会议费等（不超过10%）</td></tr>
                    <tr style="background: #f1f5f9; font-weight: bold;"><td>合计</td><td style="text-align: right;">2,800</td><td style="text-align: right;">100.0%</td><td>-</td></tr>
                </table>
            </div>
        </div>

        <div class="section">
            <div class="section-title">五、核查情况</div>
            <p style="margin-bottom: 20px;"><strong>研发费用归集核查结果：</strong></p>
            ${reportData.summary.keyFindings.map(finding => `
                <div class="finding-item">
                    <strong>✓</strong> ${finding}
                </div>
            `).join('')}
        </div>

        <div class="section">
            <div class="section-title">六、需要完善的方面</div>
            ${reportData.summary.riskPoints.map(risk => `
                <div class="risk-item">
                    <strong>💡</strong> ${risk}
                </div>
            `).join('')}
            <div style="background: #e0f2fe; border-left: 4px solid #0288d1; padding: 15px; margin: 15px 0; border-radius: 0 6px 6px 0;">
                <strong>改进建议：</strong>建议完善研发人员工时分配记录，建立更精确的项目工时统计体系，确保费用归集的准确性。
            </div>
        </div>

        <div class="section page-break">
            <div class="section-title">七、鉴证程序</div>
            <ol class="procedures-list">
                <li>了解企业研发活动组织管理情况，评估内部控制制度的有效性</li>
                <li>核查研发项目立项及管理情况，确认项目的创新性和技术先进性</li>
                <li>检查研发费用归集范围和标准，确保符合税法规定</li>
                <li>核实人员人工费用的真实性，检查工资表和社保缴费记录</li>
                <li>检查直接投入费用的合理性，核查采购合同和发票</li>
                <li>审核折旧费用及长期费用摊销的计算准确性</li>
                <li>核查无形资产摊销费用的计算依据和摊销期限</li>
                <li>检查设计费用等其他相关费用的真实性和相关性</li>
                <li>验证加计扣除比例的准确性，确认按200%计算</li>
                <li>复核研发费用专项审计报告的编制规范性</li>
            </ol>
        </div>

        <div class="section">
            <div class="section-title">八、政策依据</div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <ul style="margin: 0; padding-left: 20px;">
                    <li>《企业研究开发费用税前加计扣除管理办法（试行）》（国家税务总局公告2021年第28号）</li>
                    <li>《关于进一步完善研发费用税前加计扣除政策的公告》（财政部 税务总局公告2021年第13号）</li>
                    <li>《关于提高研究开发费用税前加计扣除比例的公告》（财政部 税务总局公告2018年第99号）</li>
                    <li>《企业会计准则第6号——无形资产》</li>
                </ul>
            </div>
        </div>

        <div class="conclusion">
            <div class="section-title" style="margin-bottom: 20px; padding-left: 0; background: none;">九、鉴证结论</div>
            <p style="font-size: 16px; line-height: 1.8;">
                基于执行的鉴证程序，我们认为${reportData.client}${reportData.taxYear}研发费用加计扣除申报表在所有重大方面符合《企业研发费用税前加计扣除政策》的规定。企业研发活动真实有效，费用归集基本准确，加计扣除计算正确。
            </p>
            <p style="margin-top: 20px; font-size: 18px; font-weight: bold; color: #059669;">
                <strong>鉴证意见：${reportData.summary.conclusion}</strong>
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
            本报告仅供${reportData.client}${reportData.taxYear}研发费用加计扣除申报使用<br>
            未经本事务所书面同意，不得用于其他目的或向第三方提供
        </div>
    </div>
</body>
</html>
    `;
};