import React from 'react';
import {
    Bell, Radar, Workflow, Database, LineChart, Lightbulb, Brain, ExternalLink
} from 'lucide-react';

const NotificationsTab = ({ mockData, handleModuleAction }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-sky-600" />
                    AI智能提醒
                </h3>
                <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                        {mockData.notifications.filter(n => !n.read).length} 条未读
                    </span>
                    <button className="text-sm text-slate-600 hover:text-slate-800">
                        全部标记为已读
                    </button>
                </div>
            </div>

            {/* 提醒分类统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Radar className="h-4 w-4 text-rose-600" />
                    </div>
                    <p className="text-sm text-rose-600 mb-1">AI风险预警</p>
                    <p className="text-lg font-bold text-rose-700">
                        {mockData.notifications.filter(n => n.type === 'ai_alert').length}
                    </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Workflow className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="text-sm text-emerald-600 mb-1">方案生成</p>
                    <p className="text-lg font-bold text-emerald-700">
                        {mockData.notifications.filter(n => n.type === 'scheme_ready').length}
                    </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Database className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-sm text-amber-600 mb-1">数据异常</p>
                    <p className="text-lg font-bold text-amber-700">
                        {mockData.notifications.filter(n => n.type === 'data_anomaly').length}
                    </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Brain className="h-4 w-4 text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-1">画像更新</p>
                    <p className="text-lg font-bold text-slate-700">
                        {mockData.notifications.filter(n => n.type === 'portrait_update').length}
                    </p>
                </div>
            </div>

            {/* 智能通知列表 */}
            <div className="space-y-3">
                {mockData.notifications.map((notification) => (
                    <div key={notification.id} className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-md ${!notification.read ? 'border-slate-200 bg-slate-50' : 'border-gray-200 bg-white'
                        }`}>
                        <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${notification.type === 'ai_alert' ? 'bg-rose-100' :
                                notification.type === 'scheme_ready' ? 'bg-emerald-100' :
                                    notification.type === 'data_anomaly' ? 'bg-amber-100' :
                                        notification.type === 'analysis_complete' ? 'bg-sky-100' :
                                            notification.type === 'optimization_suggestion' ? 'bg-slate-100' :
                                                notification.type === 'portrait_update' ? 'bg-indigo-100' :
                                                    'bg-gray-100'
                                }`}>
                                {notification.type === 'ai_alert' ? (
                                    <Radar className="h-5 w-5 text-rose-600" />
                                ) : notification.type === 'scheme_ready' ? (
                                    <Workflow className="h-5 w-5 text-emerald-600" />
                                ) : notification.type === 'data_anomaly' ? (
                                    <Database className="h-5 w-5 text-amber-600" />
                                ) : notification.type === 'analysis_complete' ? (
                                    <LineChart className="h-5 w-5 text-sky-600" />
                                ) : notification.type === 'optimization_suggestion' ? (
                                    <Lightbulb className="h-5 w-5 text-slate-600" />
                                ) : notification.type === 'portrait_update' ? (
                                    <Brain className="h-5 w-5 text-indigo-600" />
                                ) : (
                                    <Bell className="h-5 w-5 text-gray-600" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                        {notification.title}
                                    </h4>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xs text-gray-500">{notification.time}</span>
                                        {notification.confidence && (
                                            <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded-full">
                                                置信度 {notification.confidence}%
                                            </span>
                                        )}
                                        <span className={`px-2 py-1 text-xs rounded-full ${notification.priority === 'high' ? 'bg-rose-100 text-rose-800' :
                                            notification.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                                                'bg-emerald-100 text-emerald-800'
                                            }`}>
                                            {notification.priority === 'high' ? '高优先级' :
                                                notification.priority === 'medium' ? '中优先级' : '低优先级'}
                                        </span>
                                        {!notification.read && (
                                            <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                                <p className={`text-sm mb-3 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                                    {notification.content}
                                </p>
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => handleModuleAction(notification.module, notification.actionText)}
                                        className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 font-medium"
                                    >
                                        {notification.actionText}
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </button>
                                    {notification.savingAmount && (
                                        <span className="text-sm text-emerald-600 font-medium">
                                            预计节税 {(notification.savingAmount / 10000).toFixed(1)}万元
                                        </span>
                                    )}
                                    {notification.score && (
                                        <span className="text-sm text-sky-600 font-medium">
                                            评分 {notification.score}分
                                            {notification.improvement > 0 && `(+${notification.improvement})`}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsTab;