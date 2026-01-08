import React from 'react';
import {
    Workflow, Brain, AlertTriangle, FileCheck, Database, Calendar,
    Timer, DollarSign, Percent, ExternalLink
} from 'lucide-react';

const TodosTab = ({ mockData, handleTodoAction, handleModuleAction }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Workflow className="h-5 w-5 mr-2 text-purple-600" />
                    智能任务管理
                </h3>
                <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                        共 {mockData.todoItems.length} 项任务，{mockData.todoItems.filter(t => t.aiGenerated).length} 项AI生成
                    </span>
                    <button className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                        刷新分析
                    </button>
                </div>
            </div>

            {/* 任务分类统计 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-purple-600">AI智能任务</p>
                            <p className="text-2xl font-bold text-purple-700">
                                {mockData.todoItems.filter(t => t.aiGenerated).length}
                            </p>
                        </div>
                        <Brain className="h-8 w-8 text-purple-500" />
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600">紧急任务</p>
                            <p className="text-2xl font-bold text-red-700">
                                {mockData.todoItems.filter(t => t.priority === 'urgent').length}
                            </p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-yellow-600">方案审核</p>
                            <p className="text-2xl font-bold text-yellow-700">
                                {mockData.todoItems.filter(t => t.category === 'schemeReview').length}
                            </p>
                        </div>
                        <FileCheck className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-600">数据完善</p>
                            <p className="text-2xl font-bold text-blue-700">
                                {mockData.todoItems.filter(t => t.category === 'dataCompletion' || t.category === 'dataValidation').length}
                            </p>
                        </div>
                        <Database className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
            </div>

            {/* 智能任务列表 */}
            <div className="space-y-4">
                {mockData.todoItems.map((todo) => (
                    <div key={todo.id} className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-md ${todo.priority === 'urgent' ? 'border-red-200 bg-red-50' :
                        todo.priority === 'high' ? 'border-orange-200 bg-orange-50' :
                            todo.aiGenerated ? 'border-purple-200 bg-purple-50' :
                                'border-gray-200 bg-white'
                        }`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                                <div className={`w-4 h-4 rounded-full mt-1 ${todo.priority === 'urgent' ? 'bg-red-500' :
                                    todo.priority === 'high' ? 'bg-orange-500' :
                                        todo.aiGenerated ? 'bg-purple-500' :
                                            'bg-blue-500'
                                    }`}></div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h4 className="font-semibold text-gray-900">{todo.title}</h4>
                                        {todo.aiGenerated && (
                                            <span className="inline-flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                                <Brain className="h-3 w-3 mr-1" />
                                                AI生成
                                            </span>
                                        )}
                                        <span className={`text-xs px-2 py-1 rounded-full ${todo.category === 'schemeReview' ? 'bg-green-100 text-green-800' :
                                            todo.category === 'dataValidation' ? 'bg-yellow-100 text-yellow-800' :
                                                todo.category === 'dataCompletion' ? 'bg-blue-100 text-blue-800' :
                                                    todo.category === 'structureOptimization' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {todo.category === 'schemeReview' ? '方案审核' :
                                                todo.category === 'dataValidation' ? '数据验证' :
                                                    todo.category === 'dataCompletion' ? '数据完善' :
                                                        todo.category === 'structureOptimization' ? '结构优化' :
                                                            '其他'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3">{todo.description}</p>
                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>截止: {todo.deadline}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Timer className="h-4 w-4" />
                                            <span>预计: {todo.estimatedTime}</span>
                                        </div>
                                        {todo.potentialSaving && (
                                            <div className="flex items-center space-x-1">
                                                <DollarSign className="h-4 w-4" />
                                                <span>潜在收益: {(todo.potentialSaving / 10000).toFixed(1)}万元</span>
                                            </div>
                                        )}
                                        {todo.completeness && (
                                            <div className="flex items-center space-x-1">
                                                <Percent className="h-4 w-4" />
                                                <span>完整度: {todo.completeness}%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleTodoAction(todo.id, 'start')}
                                    className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    开始处理
                                </button>
                                <button
                                    onClick={() => handleModuleAction(todo.module, 'open')}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    title="进入相关模块"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodosTab;