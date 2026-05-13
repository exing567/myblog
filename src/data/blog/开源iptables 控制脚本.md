---
author: XJJ
pubDatetime: 2026-05-05T12:30:30Z
modDatetime: 2026-05-05T12:30:30Z
title: 开源iptables 控制脚本
slug: ipt-sh
featured: true
draft: false
tags:
  - 脚本
  - Github
description:
  开源一个用于控制iptables的脚本，和简单的介绍
---

# ipt.sh 脚本开源

## 链接
Github：https://github.com/exing567/iptables-control

## 快速开始

```bash
curl -L https://raw.githubusercontent.com/exing567/iptables-control/main/ipt.sh -o ipt.sh && chmod +x ipt.sh && sudo bash ipt.sh
```
运行此指令一次之后，再次运行只用输入`sudo bash ipt.sh`即可

---

## 为什么我写了这个？

使用po0发现不能安装flux或者其他的面板，询问朋友得知可以使用iptables来转发，但之前我研究的时候觉得太麻烦了，于是叫GPT写了这个脚本。

## 有什么功能

- 检查 `iptables`、`iptables-save`、`netfilter-persistent` 是否可用
- 自动检查并开启 IPv4 转发：`net.ipv4.ip_forward=1`
- 添加单条 TCP、UDP 或 TCP+UDP 端口转发，目标支持 IPv4 或域名
- 批量添加端口转发规则
- 支持 DDNS 场景：保存域名配置，并在刷新时自动更新解析后的转发 IP
- 从当前配置列表中选择要删除的转发规则
- 删除时可选择 TCP、UDP 或 TCP+UDP，未选择的协议会保留
- 批量按备注 `comment` 删除规则
- 修改已有规则，即先删除旧规则再添加新规则
- 查看转发规则摘要、完整 NAT/FORWARD 规则、带备注规则
- 按端口、IP、备注搜索规则
- 查看指定端口的规则命中次数
- 导出当前转发规则为 `.conf` 配置文件
- 从 `.conf` 配置文件导入转发规则，导入前会预览
- 添加、删除、修改、导入、回滚前自动备份当前规则
- 支持从备份文件回滚 `iptables` 规则
- 保存规则到 `netfilter-persistent` 或 `/etc/iptables/rules.v4`
- 安装 systemd 自检/DDNS 定时刷新服务
- 手动刷新域名/DDNS 转发规则
- 记录操作日志到 `/var/log/ipt-forward-manager.log`

> 我知道功能有很多很多，但我觉得都能用上吧。。

虽然之前我也看到有很多ipt的脚本，但是似乎少了点功能。。。吧🤔

## 菜单概览

```text
基础检查
  1) 检查 iptables 是否安装
  2) 检查/修复 IPv4 转发 sysctl

规则查看
  3) 查看规则摘要表
  4) 查看全部 NAT / FORWARD 规则
  5) 搜索旧规则，包括端口/IP/备注
  6) 只显示带备注的规则
  7) 查看某端口规则命中次数

添加/删除/修改
  8) 添加单条转发
  9) 批量添加转发
 10) 选择配置删除规则
 11) 批量按备注删除规则
 12) 修改已有规则

配置导入导出
 13) 导出当前转发为 .conf
 14) 从 .conf 导入转发，导入前预览

备份/回滚/测试
 15) 备份当前 iptables 规则
 16) 查看备份列表
 17) 从备份回滚
 18) 测试目标端口 TCP 可达性
 19) 保存当前规则

自检/DDNS/日志
 20) 安装自检/DDNS 刷新服务
 21) 卸载自检/DDNS 刷新服务
 22) 查看脚本日志
 23) 刷新域名/DDNS 转发

  0) 退出
```


# 纯AI，零人工添加，绝对的纯！！！