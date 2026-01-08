import React from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Markdown渲染组件
 * 用于将markdown格式的文本渲染成格式化的HTML内容
 * @param {Object} props - 组件属性
 * @param {string} props.content - Markdown格式的内容
 * @param {string} props.className - 可选的CSS类名
 */
const MarkdownRenderer = ({ content, className = '' }) => {
    return (
        <div className={`markdown-content ${className}`}>
            <ReactMarkdown
                components={{
                    // 自定义标题样式
                    h1: ({ children, ...props }) => <h1 className="text-xl font-bold mb-2 mt-4" {...props}>{children}</h1>,
                    h2: ({ children, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3" {...props}>{children}</h2>,
                    h3: ({ children, ...props }) => <h3 className="text-base font-bold mb-1 mt-2" {...props}>{children}</h3>,

                    // 自定义段落样式
                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,

                    // 自定义列表样式
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 ml-2" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 ml-2" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,

                    // 自定义强调样式
                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />,

                    // 自定义代码样式
                    code: ({ node, inline, ...props }) =>
                        inline
                            ? <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-600" {...props} />
                            : <code className="block bg-gray-100 p-2 rounded text-sm font-mono overflow-x-auto mb-2" {...props} />,

                    // 自定义引用样式
                    blockquote: ({ node, ...props }) =>
                        <blockquote className="border-l-4 border-blue-500 pl-3 py-1 mb-2 italic text-gray-700" {...props} />,

                    // 自定义链接样式
                    a: ({ children, ...props }) =>
                        <a className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>,

                    // 自定义分割线样式
                    hr: ({ node, ...props }) => <hr className="my-3 border-gray-300" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
