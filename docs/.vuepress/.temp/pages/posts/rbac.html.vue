<template><div><h1 id="ciscn-rbac" tabindex="-1"><a class="header-anchor" href="#ciscn-rbac"><span>CISCN-rbac</span></a></h1>
<p>​	本题是来自国赛，是从Pid那里拿到的，是我第一次对源码进行静态分析。</p>
<p>​	首先我们在本地起一个环境，在输出中我们能看到三个接口</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> <span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span> Creating an Engine instance with the Logger and Recovery middleware already attached.</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> <span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span> Running <span class="token keyword">in</span> <span class="token string">"debug"</span> mode. Switch to <span class="token string">"release"</span> mode <span class="token keyword">in</span> production.</span>
<span class="line"> - using env:   <span class="token builtin class-name">export</span> <span class="token assign-left variable">GIN_MODE</span><span class="token operator">=</span>release</span>
<span class="line"> - using code:  gin.SetMode<span class="token punctuation">(</span>gin.ReleaseMode<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> GET    /                         --<span class="token operator">></span> main.main.func1 <span class="token punctuation">(</span><span class="token number">3</span> handlers<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> GET    /getCurrentRBAC           --<span class="token operator">></span> main.main.func2 <span class="token punctuation">(</span><span class="token number">3</span> handlers<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> POST   /execSysFunc              --<span class="token operator">></span> main.main.func3 <span class="token punctuation">(</span><span class="token number">3</span> handlers<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> <span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span> You trusted all proxies, this is NOT safe. We recommend you to <span class="token builtin class-name">set</span> a value.</span>
<span class="line">Please check https://pkg.go.dev/github.com/gin-gonic/gin<span class="token comment">#readme-don-t-trust-all-proxies for details.</span></span>
<span class="line"><span class="token punctuation">[</span>GIN-debug<span class="token punctuation">]</span> Listening and serving HTTP on :80</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	我们主要需要关注的就是下面两个接口：</p>
<ol>
<li><strong>/getCurrentRBAC</strong>：获取当前角色RBAC状态</li>
<li><strong>/execSysFunc</strong>：根据当前角色RBAC状态执行对应有权限的函数</li>
</ol>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// 调用execCommand执行具体的系统函数（如getPwd、getDirectory等）</span></span>
<span class="line">result<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">execCommand</span><span class="token punctuation">(</span>execStruct<span class="token punctuation">.</span>FuncName<span class="token punctuation">,</span> execStruct<span class="token punctuation">.</span>Param<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// 若执行失败，构建错误响应</span></span>
<span class="line">	response <span class="token operator">=</span> ResTemplate<span class="token punctuation">{</span></span>
<span class="line">		Success<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">		Data<span class="token punctuation">:</span>    <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"error"</span><span class="token punctuation">:</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> response<span class="token punctuation">)</span> <span class="token comment">// 返回400状态码</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// 若执行成功，构建成功响应</span></span>
<span class="line">	response <span class="token operator">=</span> ResTemplate<span class="token punctuation">{</span></span>
<span class="line">		Success<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">		Data<span class="token punctuation">:</span>    <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"result"</span><span class="token punctuation">:</span> result<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 携带执行结果</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token function">initRBAC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 执行完成后重置RBAC权限为初始状态（安全措施，防止权限残留）</span></span>
<span class="line">	c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> response<span class="token punctuation">)</span> <span class="token comment">// 返回200状态码</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	这里我们需要关注的为<code v-pre>initRBAC()</code>，它会将RBAC权限重置为初始状态，但是我们可以发现当报错的时候，这时候不会执行<code v-pre>initRBAC()</code>就会导致RBAC权限残留。</p>
<p>​	默认权限已经权限相关内容如下：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// initRBAC 初始化RBAC权限配置为默认状态</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">initRBAC</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	RBACList <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"file:read"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>          <span class="token comment">// 文件读取权限</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"file:return"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>        <span class="token comment">// 返回文件内容权限</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"flag:read"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>          <span class="token comment">// 标志读取权限</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"flag:return"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>        <span class="token comment">// 返回标志内容权限</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"pwd:read"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>           <span class="token comment">// 工作目录读取权限</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"directory:read"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>     <span class="token comment">// 目录读取权限</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"directory:return"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>   <span class="token comment">// 返回目录内容权限</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"rbac:read"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>          <span class="token comment">// 读取RBAC配置权限(始终启用)</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"rbac:change_read"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>   <span class="token comment">// 修改读取权限的权限(始终启用)</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"rbac:change_return"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 修改返回权限的权限(默认禁用)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	我们现在可以通过<code v-pre>change_read</code>获取flag的read权限，我们可以发送如下请求：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"File"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">"read"</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Directory"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Pwd"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line"></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Flag"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">"read"</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Param"</span><span class="token operator">:</span> <span class="token string">"/etc/passwd"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	当前权限如下：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"Success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"directory:read"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"directory:return"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"file:read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"file:return"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"flag:read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"flag:return"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"pwd:read"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:change_read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:change_return"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:read"</span><span class="token operator">:</span> <span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	此时由于缺少参数，按照程序处理逻辑，跳过了<code v-pre>initRBAC()</code>不会重置权限，此时我们的目标就是获取到Flag的return权限。</p>
<p>​	为了获取到flag的retuan权限，我们就要卡出<code v-pre>rbac:change_return</code>为1。</p>
<p>​	在<code v-pre>updateRBAC()</code>中想要使得<code v-pre>rbac:change_return</code>为1,那么就要<code v-pre>rbac:change_return:1</code>，在源代码中</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line">RBACToGrant<span class="token punctuation">[</span><span class="token string">"rbac:change_return:1"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">RBACToGrant<span class="token punctuation">[</span><span class="token string">"file:"</span><span class="token operator">+</span>value<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">RBACToGrant<span class="token punctuation">[</span><span class="token string">"rbac:change_return:0"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将<code v-pre>rbac:change_return:1</code>置为1并且将<code v-pre>rbac:change_return:0</code>也置为1,但是在后续处理中</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> strings<span class="token punctuation">.</span><span class="token function">HasSuffix</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">":return"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> RBACList<span class="token punctuation">[</span><span class="token string">"rbac:change_return"</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span></span>
<span class="line">		RBACList<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value</span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> key <span class="token operator">==</span> <span class="token string">"rbac:change_return:1"</span> <span class="token punctuation">{</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"rbac:change_return"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> key <span class="token operator">==</span> <span class="token string">"rbac:change_return:0"</span> <span class="token punctuation">{</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span><span class="token string">"rbac:change_return"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">	RBACList<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	循环如下(并非固定顺序)</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">file:return</span>
<span class="line">rbac:change_return:0</span>
<span class="line">directory:read</span>
<span class="line">file:read</span>
<span class="line">rbac:change_return:1</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	这是因为go中map遍历具有随机性，就有可能会出现上面的情况。</p>
<p>​	在最后change_return被赋值为1，此时RBAC状态如下：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"Success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"directory:read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"directory:return"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"file:read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"file:return"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"flag:read"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"flag:return"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"pwd:read"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:change_read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:change_return"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:read"</span><span class="token operator">:</span> <span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	我们发送请求如下：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"File"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Directory"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Pwd"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Flag"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">"read"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"return"</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Param"</span><span class="token operator">:</span> <span class="token string">"/etc/passwd"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	此时RBAC状态如下：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"Success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"Data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"directory:read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"directory:return"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"file:read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"file:return"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"flag:read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"flag:return"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"pwd:read"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:change_read"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:change_return"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"rbac:read"</span><span class="token operator">:</span> <span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​	此时就可以愉快读flag了😋</p>
</div></template>


