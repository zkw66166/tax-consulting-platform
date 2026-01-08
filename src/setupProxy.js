const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/ai',
        createProxyMiddleware({
            target: 'https://api.siliconflow.cn',
            changeOrigin: true,
            pathRewrite: {
                '^/api/ai': '/v1'
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log('Proxying request to:', proxyReq.path);
            }
        })
    );
};
