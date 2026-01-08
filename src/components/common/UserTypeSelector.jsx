import React from 'react';
import { Users, Building2, Building } from 'lucide-react';

const UserTypeSelector = ({ userType, onUserTypeChange }) => {
    const userTypes = [
        { id: 'accounting', label: '事务所用户', icon: Users, color: 'green' },
        { id: 'enterprise', label: '企业用户', icon: Building, color: 'blue' },
        { id: 'group', label: '集团企业用户', icon: Building2, color: 'purple' }
    ];

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="px-6 py-3">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">用户类型：</span>
                    <div className="flex space-x-2">
                        {userTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                                <button
                                    key={type.id}
                                    onClick={() => onUserTypeChange(type.id)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${userType === type.id
                                        ? `bg-${type.color}-100 text-${type.color}-700 border border-${type.color}-200`
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{type.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTypeSelector;