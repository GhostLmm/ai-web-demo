const { Client } = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 加载 FTP 配置
const config = require('./ftp.config.js');

// FTP 配置
const FTP_CONFIG = {
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port
};

// 构建目录
const BUILD_DIR = path.join(__dirname, '..', config.settings.buildDir);

async function deploy() {
    console.log('🚀 开始部署流程...');
    
    try {
        // 步骤 1: 构建项目
        console.log('📦 正在构建项目...');
        execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
        console.log('✅ 项目构建完成');
        
        // 检查构建目录是否存在
        if (!fs.existsSync(BUILD_DIR)) {
            throw new Error('构建目录不存在，请确保构建成功');
        }
        
        // 步骤 2: 连接 FTP 服务器
        console.log('🌐 正在连接 FTP 服务器...');
        const client = new Client();
        
        // 设置连接超时
        client.ftp.timeout = config.settings.timeout;
        
        await client.access(FTP_CONFIG);
        console.log('✅ FTP 连接成功');
        
        // 步骤 3: 清理远程目录（可选）
        if (config.settings.clearRemoteDirectory) {
            console.log('🧹 正在清理远程目录...');
            try {
                const files = await client.list();
                for (const file of files) {
                    if (file.isFile) {
                        await client.remove(file.name);
                        console.log(`删除文件: ${file.name}`);
                    } else if (file.isDirectory && file.name !== '.' && file.name !== '..') {
                        await client.removeDir(file.name);
                        console.log(`删除目录: ${file.name}`);
                    }
                }
            } catch (error) {
                console.log('⚠️ 清理远程目录时出现错误（可能目录为空）:', error.message);
            }
        }
        
        // 步骤 4: 上传构建文件
        console.log('📤 正在上传文件...');
        await uploadDirectory(client, BUILD_DIR, config.settings.remotePath);
        console.log('✅ 文件上传完成');
        
        // 关闭连接
        client.close();
        
        console.log('🎉 部署成功完成！');
        console.log(`📍 网站地址: http://${FTP_CONFIG.host}`);
        
    } catch (error) {
        console.error('❌ 部署失败:', error.message);
        process.exit(1);
    }
}

/**
 * 递归上传目录
 * @param {Client} client FTP 客户端
 * @param {string} localDir 本地目录路径
 * @param {string} remoteDir 远程目录路径
 */
async function uploadDirectory(client, localDir, remoteDir) {
    const files = fs.readdirSync(localDir);
    
    for (const file of files) {
        const localPath = path.join(localDir, file);
        const remotePath = remoteDir === '/' ? `/${file}` : `${remoteDir}/${file}`;
        const stats = fs.statSync(localPath);
        
        if (stats.isDirectory()) {
            console.log(`📁 创建目录: ${remotePath}`);
            try {
                await client.ensureDir(remotePath);
            } catch (error) {
                // 目录可能已存在，忽略错误
            }
            await uploadDirectory(client, localPath, remotePath);
        } else {
            console.log(`📄 上传文件: ${file}`);
            await client.uploadFrom(localPath, remotePath);
        }
    }
}

// 如果直接运行此脚本，则执行部署
if (require.main === module) {
    deploy();
}

module.exports = { deploy }; 