import aiConfig from '../config/aiConfig.json';

/**
 * 调用AI API获取回答 - 优化版本
 * @param {string} question - 用户提问
 * @returns {Promise<{answer: string, confidence: number}>}
 */
export const getAIAnswer = async (question) => {
    const config = aiConfig.models[0];

    try {
        const startTime = performance.now();

        const response = await fetch(`${config.apiBase}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    {
                        role: 'system',
                        content: '你是一位专业的中国税务和财务顾问。请根据中国的税法和财务法规，为用户提供准确、专业的建议。如果问题涉及具体的税务处理，请引用相关的法律法规条款。回答要简洁明了，重点突出。'
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                max_tokens: 1024,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API调用失败: ${response.status} ${response.statusText}. ${errorText}`);
        }

        const data = await response.json();
        const endTime = performance.now();

        console.log(`⚡ API响应时间: ${(endTime - startTime).toFixed(0)}ms`);

        const answer = data.choices?.[0]?.message?.content || '抱歉，无法生成回答';

        return {
            answer,
            confidence: 85,
            policies: extractPolicies(answer)
        };

    } catch (error) {
        console.error('AI API调用错误:', error);
        throw error;
    }
};

/**
 * 从回答中提取政策法规引用
 * @param {string} answer - AI回答内容
 * @returns {string[]} 政策法规数组
 */
const extractPolicies = (answer) => {
    const policies = [];
    const policyRegex = /《([^》]+)》/g;
    let match;

    while ((match = policyRegex.exec(answer)) !== null) {
        if (!policies.includes(match[0])) {
            policies.push(match[0]);
        }
    }

    return policies.slice(0, 5);
};

const aiService = {
    getAIAnswer
};

export default aiService;
