import React, { useState } from 'react';
import { MessageCircle, Upload, Send, User, Star, Share2, Download, Clock, TrendingUp, HelpCircle, BookOpen, FileText, Settings, Briefcase, Shield, FileCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { getAIAnswer } from '../utils/aiService';
import MarkdownRenderer from '../components/common/MarkdownRenderer';

const AIAnswer = () => {
    const [consultQuestion, setConsultQuestion] = useState('');
    const [consultHistory, setConsultHistory] = useState([]);
    const [showAllHistory, setShowAllHistory] = useState(false);

    const consultKnowledge = [
        {
            category: '法规',
            subcategories: [
                {
                    name: '基础法规',
                    topics: ['税收征管法', '会计法', '公司法', '证券法']
                },
                {
                    name: '税务',
                    subtopics: [
                        { name: '增值税', items: ['税率适用', '抵扣规则', '免税政策', '出口退税'] },
                        { name: '企业所得税', items: ['税前扣除', '优惠政策', '汇算清缴', '境外所得'] },
                        { name: '个人所得税', items: ['专项扣除', '汇算清缴', '税率结构', '境外所得'] },
                        { name: '其他税费', items: ['消费税', '印花税', '房产税', '土地使用税'] }
                    ]
                },
                {
                    name: '财务',
                    topics: ['会计准则', '财务报告', '内部控制', '审计准则']
                },
                {
                    name: '审计',
                    topics: ['审计准则', '审计程序', '风险评估', '审计报告']
                },
                {
                    name: '内控',
                    topics: ['内控制度', '风险管理', '合规管理', '流程控制']
                }
            ],
            icon: BookOpen,
            color: 'blue'
        },
        {
            category: '实务案例',
            subcategories: [
                { name: '税务筹划案例', topics: ['高新技术企业', '重组并购', '跨境交易', '股权激励'] },
                { name: '风险防控案例', topics: ['税务稽查', '行政处罚', '争议解决', '合规整改'] }
            ],
            icon: Briefcase,
            color: 'green'
        },
        {
            category: '司法判例',
            subcategories: [
                { name: '税务争议', topics: ['行政诉讼', '税务处理', '执法程序', '救济途径'] },
                { name: '刑事案件', topics: ['逃税罪', '虚开发票', '骗取出口退税', '其他涉税犯罪'] }
            ],
            icon: Shield,
            color: 'red'
        },
        {
            category: '实务指南',
            subcategories: [
                { name: '申报指南', topics: ['增值税申报', '所得税申报', '其他税种申报', '年度汇算'] },
                { name: '办税指南', topics: ['发票管理', '税务登记', '优惠申请', '证明开具'] }
            ],
            icon: FileCheck,
            color: 'purple'
        },
        {
            category: '制度助手',
            subcategories: [
                { name: '制度模板', topics: ['财务制度', '税务制度', '内控制度', '合规制度'] },
                { name: '流程模板', topics: ['审批流程', '业务流程', '风控流程', '监督流程'] }
            ],
            icon: Settings,
            color: 'orange'
        },
        {
            category: '表单模板',
            subcategories: [
                { name: '申报表单', topics: ['税务申报表', '统计报表', '备案表单', '申请表单'] },
                { name: '管理表单', topics: ['财务报表', '分析表单', '检查表单', '评估表单'] }
            ],
            icon: FileText,
            color: 'indigo'
        },
        {
            category: '专题',
            subcategories: [
                { name: '热点专题', topics: ['税收优惠', '征管改革', '数字化转型', '国际税收'] },
                { name: '行业专题', topics: ['高新技术', '制造业', '金融业', '房地产'] }
            ],
            icon: Star,
            color: 'yellow'
        },
        {
            category: '财税动态',
            subcategories: [
                { name: '政策发布', topics: ['最新政策', '征求意见', '解读分析', '执行通知'] },
                { name: '行业动态', topics: ['市场变化', '技术发展', '监管动向', '国际趋势'] }
            ],
            icon: TrendingUp,
            color: 'teal'
        }
    ];

    const handleConsultSubmit = async () => {
        if (!consultQuestion.trim()) return;

        const newConsult = {
            id: Date.now(),
            question: consultQuestion,
            answer: '正在分析您的问题，请稍候...',
            time: new Date().toLocaleString(),
            confidence: 0,
            status: 'processing'
        };

        setConsultHistory(prev => [newConsult, ...prev]);
        setConsultQuestion('');

        try {
            // 调用AI API获取回答 (支持流式输出)
            const result = await getAIAnswer(consultQuestion, (partialText) => {
                // 实时更新回答内容
                setConsultHistory(prev => prev.map(item =>
                    item.id === newConsult.id ? { ...item, answer: partialText } : item
                ));
            });

            const updatedConsult = {
                ...newConsult,
                answer: result.answer,
                policies: result.policies,
                confidence: result.confidence,
                status: 'completed'
            };

            setConsultHistory(prev => prev.map(item =>
                item.id === newConsult.id ? updatedConsult : item
            ));
        } catch (error) {
            console.error('AI回答错误:', error);

            const errorConsult = {
                ...newConsult,
                answer: 'API调用失败，请稍后重试。错误信息：' + (error.message || '未知错误'),
                confidence: 0,
                status: 'error'
            };

            setConsultHistory(prev => prev.map(item =>
                item.id === newConsult.id ? errorConsult : item
            ));
        }
    };

    return (
        <div className="space-y-6">
            {/* AI咨询输入区 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center mb-4">
                    <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">AI智能问答</h3>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">在线</span>
                </div>
                <div className="flex gap-4">
                    {/* Left: Textarea */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            请详细描述您的财税问题
                        </label>
                        <textarea
                            value={consultQuestion}
                            onChange={(e) => setConsultQuestion(e.target.value)}
                            placeholder="例如：我公司是软件企业，想了解研发费用加计扣除的具体条件和申报流程，需要准备哪些材料？"
                            className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">
                                {consultQuestion.length}/500字符
                            </span>
                            <span className="text-xs text-gray-500">
                                支持语音输入、图片识别
                            </span>
                        </div>
                    </div>

                    {/* Right: Buttons stacked vertically */}
                    <div className="flex flex-col justify-end space-y-2" style={{ minWidth: '120px' }}>
                        <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center text-sm">
                            <Upload className="h-4 w-4 mr-1" />
                            上传文档
                        </button>
                        <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center text-sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            语音输入
                        </button>
                        <button
                            onClick={handleConsultSubmit}
                            disabled={!consultQuestion.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                        >
                            <Send className="h-4 w-4 mr-1" />
                            提交咨询
                        </button>
                    </div>
                </div>
            </div>

            {/* 咨询历史 - 移到AI智能问答下方 */}
            {consultHistory.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-purple-600" />
                            最新回答
                        </h3>
                        {consultHistory.length > 1 && (
                            <button
                                onClick={() => setShowAllHistory(!showAllHistory)}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                                {showAllHistory ? (
                                    <>
                                        <ChevronUp className="h-4 w-4 mr-1" />
                                        收起历史记录
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-4 w-4 mr-1" />
                                        查看全部 {consultHistory.length} 条记录
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {(showAllHistory ? consultHistory : consultHistory.slice(0, 1)).map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-gray-900 flex items-center">
                                        <User className="h-4 w-4 mr-2 text-blue-600" />
                                        {item.question}
                                    </h4>
                                    <div className="flex items-center space-x-2">
                                        {item.status === 'processing' && (
                                            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                                                处理中...
                                            </span>
                                        )}
                                        {item.status === 'completed' && (
                                            <span className="text-xs text-green-600">可信度: {item.confidence}%</span>
                                        )}
                                        {item.status === 'error' && (
                                            <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                                服务异常
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-500">{item.time}</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 mb-2">
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-1">
                                            <span className="text-white text-xs font-bold">AI</span>
                                        </div>
                                        <div className="text-sm text-gray-700 flex-1">
                                            <MarkdownRenderer content={item.answer} />
                                        </div>
                                    </div>
                                </div>
                                {item.policies && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-600 mb-1">相关政策法规：</p>
                                        <div className="flex flex-wrap gap-1">
                                            {item.policies.map((policy, policyIndex) => (
                                                <span key={policyIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    {policy}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex space-x-2 mt-3">
                                    <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                                        <Star className="h-3 w-3 mr-1" />
                                        收藏
                                    </button>
                                    <button className="text-xs text-green-600 hover:text-green-800 flex items-center">
                                        <Share2 className="h-3 w-3 mr-1" />
                                        分享
                                    </button>
                                    <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                                        <Download className="h-3 w-3 mr-1" />
                                        导出
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 知识库导航 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    知识库导航
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {consultKnowledge.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <div key={index} className={`border-2 border-${category.color}-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-${category.color}-300`}>
                                <div className="flex items-center mb-3">
                                    <IconComponent className={`h-6 w-6 text-${category.color}-600 mr-2`} />
                                    <h4 className="font-semibold text-gray-900">{category.category}</h4>
                                </div>
                                <div className="space-y-2">
                                    {category.subcategories.map((subcategory, subIndex) => (
                                        <div key={subIndex} className="border-l-2 border-gray-200 pl-3">
                                            <p className="text-sm font-medium text-gray-800">{subcategory.name}</p>
                                            {subcategory.subtopics ? (
                                                <div className="ml-2 mt-1">
                                                    {subcategory.subtopics.map((subtopic, subTopicIndex) => (
                                                        <details key={subTopicIndex} className="mt-1">
                                                            <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
                                                                {subtopic.name}
                                                            </summary>
                                                            <div className="ml-3 mt-1">
                                                                {subtopic.items.map((item, itemIndex) => (
                                                                    <p key={itemIndex} className="text-xs text-gray-600 hover:text-blue-600 cursor-pointer">
                                                                        • {item}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </details>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="ml-2 mt-1">
                                                    {subcategory.topics.map((topic, topicIndex) => (
                                                        <p key={topicIndex} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
                                                            • {topic}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <span className="text-xs text-gray-500">包含 500+ 条目</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 常见问题和热门咨询 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2 text-orange-600" />
                        常见问题
                    </h3>
                    <div className="space-y-3">
                        {[
                            { q: '小规模纳税人升级为一般纳税人需要什么条件？', hot: true },
                            { q: '研发费用加计扣除的适用范围是什么？', hot: true },
                            { q: '高新技术企业认定的流程和要求有哪些？', hot: false },
                            { q: '跨境电商如何进行税务处理？', hot: false },
                            { q: '股权转让个人所得税如何计算？', hot: false }
                        ].map((question, index) => (
                            <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                                <p className="text-gray-900 text-sm">{question.q}</p>
                                {question.hot && (
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">热门</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-red-600" />
                        今日热门咨询
                    </h3>
                    <div className="space-y-3">
                        {[
                            { topic: '2024年企业所得税汇算清缴', count: 156 },
                            { topic: '增值税期末留抵退税', count: 89 },
                            { topic: '个人所得税专项附加扣除', count: 67 },
                            { topic: '印花税最新政策解读', count: 45 },
                            { topic: '高新技术企业税收优惠', count: 32 }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <div className="flex items-center">
                                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center mr-3">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm text-gray-900">{item.topic}</span>
                                </div>
                                <span className="text-xs text-gray-500">{item.count}次咨询</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAnswer;