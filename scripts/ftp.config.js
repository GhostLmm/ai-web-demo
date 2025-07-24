// FTP 部署配置文件
module.exports = {
    // FTP 服务器配置
    host: '103.112.96.224',
    user: '103_112_96_224',
    password: '123456',
    port: 21,
    
    // 部署设置
    settings: {
        // 是否在上传前清理远程目录
        clearRemoteDirectory: true,
        
        // 连接超时时间（毫秒）
        timeout: 10000,
        
        // 远程部署路径（默认为根目录）
        remotePath: '/',
        
        // 本地构建目录（相对于项目根目录）
        buildDir: 'build'
    }
}; 