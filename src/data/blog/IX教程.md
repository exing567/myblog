---
author: XJJ
pubDatetime: 2026-03-13T20:00:00Z
modDatetime: 2026-03-13T20:00:00Z
title: IX教程
featured: true
draft: false
slug: IXLEARN
tags:
  - 学习
  - 教程
description:
  一个教学如何搭建IX的一篇文章
---

# 来吧！走起！

**机器**：YT HK BGP送的ix nat
**入口**：阿里仙人
**落地**：Bage HK Standard
**面板**：flux（多啦面板）
**前提准备**：dd机器（应该就这个吧，如果少了可以补充）

等nodeimage修好后会加上图片，如果有任何错误都可以写出来

---

### DD 脚本
来自[酒神](https://www.nodeseek.com/post-5159-1)
有些ix需要大厂前置当跳板才能上去安装

```ssh
curl -so OsMutation.sh https://raw.githubusercontent.com/LloydAsp/OsMutation/main/OsMutation.sh && chmod u+x OsMutation.sh && ./OsMutation.sh
```

---

### 安装多啦面板

*这里补充下，我推荐的方式是你有一个主控机器，这样就不会是flux在ix上面占用过高的内存，如果不选择可以跳过；选择了步骤也是一样的*

一般的机器都没有docker，所以你要
也有情况你要安装到另一台机器当主控，但不影响后续

```ssh
bash <(curl -sL kejilion.sh)
```
之后输入6，之后输入1安装docker

安装flux
```ssh
curl -L https://raw.githubusercontent.com/bqlpfy/flux-panel/refs/heads/main/panel_install.sh -o panel_install.sh && chmod +x panel_install.sh && ./panel_install.sh
```
选择安装，在这你要记下，如果你是nat，那么大概是[ix nat]:[端口] --> [机器]:[端口]。
因为我的服务商给我了16250-16599的端口，所以我就在安装的时候填写这个范围的，也就是16299是面板，16298是后端。脚本会询问你的！！

#### 独享ix的随便端口就行

之后你就可以进入面板->改密码->去**网站配置**页面填写后端的ip:端口，这个在你安装的时候就叫你填写了
![屏幕截图 2026-03-13 200738](https://0040.my/i/2026/03/13/x7s3zu.webp)

---

### 添加节点
来到节点监控->新建节点
（落地端，ix端）

```
名称：随意
服务器IP：填入你的ix ip 或者nat ix ip
入口IP：同上
端口：nat的机器填入服务商给你的端口段，独享ix不用改
```
添加。之后复制他给你的脚本进入ssh安装就行

（入口端）

```
名称：随意
服务器IP：服务器的公网ip
入口IP：服务器的公网ip
端口：同上面的
```
添加。复制脚本进入ssh，把有个后端地址改成上面的ix ip或者你主控的ip地址，也就是[ixip或者主控ip]:[后端的端口]，修改完回车安装。因为这样你的入口就不用绕路了
之后你的两个节点就都在线了！！！

---

### 添加隧道

进入隧道管理，新建，隧道类型选择隧道转发，选择tcp协议
![image](https://0040.my/i/2026/03/13/x9n8fx.webp)
入口选择你添加的入口机器，出口选择ix。创建后检查连通性！

---

### 添加转发

正常添加，输入你的ip+端口就行
![image](https://0040.my/i/2026/03/13/xa3x6g.webp)
最后祝大家上网愉快，觉得写得好的给个鸡腿吧，谢谢☺️