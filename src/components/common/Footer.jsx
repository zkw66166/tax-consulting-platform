import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <div>
                    <p>© 2025 AI智能财税咨询系统. All rights reserved.</p>
                </div>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <button onClick={() => { }} className="hover:text-gray-700">用户协议</button>
                    <button onClick={() => { }} className="hover:text-gray-700">隐私政策</button>
                    <button onClick={() => { }} className="hover:text-gray-700">技术支持</button>
                    <button onClick={() => { }} className="hover:text-gray-700">意见反馈</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;