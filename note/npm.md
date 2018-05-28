@types/node 就提供了 node 的常用的语法提示。
npm install @types/node --save-dev

项目对模块的依赖可以使用下面的 3 种方法来表示（假设当前版本号是 1.1.0 ）：

兼容模块新发布的补丁版本：~1.1.0、1.1.x、1.1
兼容模块新发布的小版本、补丁版本：^1.1.0、1.x、1
兼容模块新发布的大版本、小版本、补丁版本：*、x


<h3>npm install</h3>
<pre>
npm install gulp安装包，默认安装最新版本
npm install gulp@3.9.1
npm install gulp -S (生产阶段的依赖)保存到package.json 文件的 dependencies 字段：
npm install gulp -D (开发阶段的依赖)保存到package.json 文件的 devDependencies字段：
npm install gulp -E 精确安装指定模块版本
输入命令npm install gulp -ES，留意package.json 文件的 dependencies 字段，以看出版本号中的^消失了
<pre>
"dependencies": {
    "gulp": "3.9.1"
}
</pre>
</pre>

<h3>npm uninstall卸载模块</h3>
基础语法
<pre>
npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional]
aliases: remove, rm, r, un, unlink
</pre>

<h3>npm update</h3>
<h3>npm ls 查看安装的模块</h3>
<h3>npm help 查看某条命令的详细帮助 </h3>
<pre>
npm help install
</pre>
<h3>npm root 查看包的安装路径</h3>
<h3>npm config 管理npm的配置路径</h3>
<pre>
npm config set <key> <value> [-g|--global]
npm config get <key>
npm config delete <key>
npm config list
npm config edit
npm get <key>
npm set <key> <value> [-g|--global]
</pre>
对于config这块用得最多应该是设置代理，解决npm安装一些模块失败的问题
例如我在公司内网，因为公司的防火墙原因，无法完成任何模块的安装，这个时候设置代理可以解决
npm config set proxy=http://xxx
又如国内的网络环境问题，某官方的IP可能被和谐了，幸好国内有好心人，搭建了镜像，此时我们简单设置镜像
npm config set registry="http://r.cnpmjs.org"
也可以临时配置，如安装淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
<h3>npm cache 管理模块的缓存</h3>
<pre>
清除npm本地缓存
npm cache clean
</pre>
<h3>npm start启动模块</h3>
<pre>
基础语法
npm start [-- <args>]
该命令写在package.json文件scripts的start字段中，可以自定义命令来配置一个服务器环境和安装一系列的必要程序。比如:npm start dev

npm stop [-- <args>]停止模块
npm restart 重新启动模块
npm test 测试模块
</pre>
<h3>npm view 查看模块的注册信息</h3>