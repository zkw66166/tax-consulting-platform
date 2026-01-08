// src/components/modals/PolicyQuery.jsx
import React, { useState } from 'react';
import { Search, ExternalLink, Calendar, Tag } from 'lucide-react';

const PolicyQuery = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const policies = [
        {
            id: 1,
            title: "高新技术企业认定管理办法",
            category: "企业所得税",
            effectiveDate: "2024-01-01",
            description: "符合条件的高新技术企业减按15%税率征收企业所得税",
            tags: ["高新认定", "15%税率", "科技企业"],
            link: "#"
        },
        {
            id: 2,
            title: "研发费用加计扣除政策",
            category: "企业所得税",
            effectiveDate: "2023-01-01",
            description: "企业开展研发活动中实际发生的研发费用可以加计扣除",
            tags: ["研发费用", "加计扣除", "100%扣除"],
            link: "#"
        },
        {
            id: 3,
            title: "小微企业普惠性税收减免",
            category: "企业所得税",
            effectiveDate: "2024-01-01",
            description: "小型微利企业年应纳税所得额不超过100万元减按12.5%计入",
            tags: ["小微企业", "普惠政策", "减免"],
            link: "#"
        },
        {
            id: 4,
            title: "软件产品增值税即征即退",
            category: "增值税",
            effectiveDate: "长期有效",
            description: "软件产品增值税实际税负超过3%的部分实行即征即退",
            tags: ["软件产品", "即征即退", "3%税负"],
            link: "#"
        }
    ];

    const categories = [
        { value: 'all', label: '全部' },
        { value: '企业所得税', label: '企业所得税' },
        { value: '增值税', label: '增值税' },
        { value: '个人所得税', label: '个人所得税' }
    ];

    const filteredPolicies = policies.filter(policy => {
        const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            policy.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
                <Search className="w-5 h-5 mr-2 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">税收政策查询</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="搜索政策标题或内容..."
                    />
                </div>
                <div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filteredPolicies.map(policy => (
                    <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{policy.title}</h4>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {policy.category}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-3">{policy.description}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {policy.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                    <Tag className="w-3 h-3 inline mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                生效日期: {policy.effectiveDate}
                            </div>
                            <a href={policy.link} className="flex items-center text-green-600 hover:text-green-700">
                                查看详情
                                <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPolicies.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>未找到相关政策，请尝试调整搜索条件</p>
                </div>
            )}
        </div>
    );
};

export default PolicyQuery;