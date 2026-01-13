import aiConfig from '../config/aiConfig.json';

/**
 * 调用AI API获取回答 - 优化版本
 * @param {string} question - 用户提问
 * @returns {Promise<{answer: string, confidence: number}>}
 */
/**
 * 调用AI API获取回答 - 流式优化版本
 * @param {string} question - 用户提问
 * @param {function} onProgress - 回答生成进度回调 (text) => void
 * @param {function} onThinking - (可选) 思考过程回调 (text) => void
 * @returns {Promise<{answer: string, confidence: number, policies: string[]}>}
 */
export const getAIAnswer = async (question, onProgress = null, onThinking = null) => {
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
                temperature: 0.7,
                stream: true // 启用流式输出
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API调用失败: ${response.status} ${response.statusText}. ${errorText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let fullAnswer = "";
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // 处理SSE数据包
            const lines = buffer.split('\n');
            buffer = lines.pop(); // 保留最后一个不完整的行

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine.startsWith('data: ')) continue;

                const dataStr = trimmedLine.slice(6);
                if (dataStr === '[DONE]') continue;

                try {
                    const data = JSON.parse(dataStr);
                    const choice = data.choices && data.choices[0];

                    if (choice && choice.delta) {
                        // 处理普通内容
                        if (choice.delta.content) {
                            const content = choice.delta.content;
                            fullAnswer += content;
                            if (onProgress) {
                                onProgress(fullAnswer);
                            }
                        }
                        // 如果有思考过程 (DeepSeek特定)
                        if (choice.delta.reasoning_content && onThinking) {
                            onThinking(choice.delta.reasoning_content);
                        }
                    }
                } catch (e) {
                    console.warn('解析SSE JSON失败', e);
                }
            }
        }

        const endTime = performance.now();
        console.log(`⚡ API流式响应结束: ${(endTime - startTime).toFixed(0)}ms`);

        if (!fullAnswer) {
            fullAnswer = '抱歉，无法生成回答';
        }

        // 确保最后一次回调
        if (onProgress) {
            onProgress(fullAnswer);
        }

        return {
            answer: fullAnswer,
            confidence: 85,
            policies: extractPolicies(fullAnswer)
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
