---
author: XJJ
pubDatetime: 2026-07-17T12:30:30Z
modDatetime: 2026-07-17T12:30:30Z
title: NameCrane邮箱配置教程
slug: namecrane-email
featured: true
draft: false
tags:
  - 学习
  - 教程
description:
  教你配置自己的域名邮箱
---

# NameCrane 域名邮箱配置教程

本文以 `example.com` 为例，说明如何在 NameCrane Mail 中配置域名邮箱，并在 Cloudflare 中添加 DNS 记录。配置自己的域名时，把 `example.com` 替换成你的真实域名即可。

---

## 1. 进入 NameCrane Mail 面板

登录 NameCrane 后，进入已购买的 NameCrane Mail 服务。在域名列表中可以看到当前已添加的邮箱域名、用户数、功能状态和右侧操作菜单。

![NameCrane 域名列表](https://cdn.xjj.sh/img/2026/07/16/69f12585a3ae1efe.jpg)

常用入口：

- `DNS Setup Guide`：查看需要添加到 DNS 的记录。
- `Manage Users`：创建和管理邮箱用户。
- `Manage Aliases / Forwarders`：管理别名和转发。
- `Webmail / Admin Portal`：打开网页邮箱或管理后台。

## 2. 添加或确认域名

如果还没有添加域名，点击 `Add New Domain`，输入你的域名并提交。

添加成功后，回到域名列表，确认域名状态为 `Active`。如果状态还没变成 Active，通常是 DNS 记录还没配置完成，或者 DNS 尚未传播。

## 3. 查看 NameCrane 要求的 DNS 记录

在域名右侧菜单中打开 `DNS Setup Guide`。NameCrane 会列出这个域名必须配置的记录，并显示每条记录是否已经生效。

![NameCrane DNS 记录](https://cdn.xjj.sh/img/2026/07/16/9d63988bfeb4532c.jpg)

需要配置的核心记录通常包括：

| 类型 | 名称 | 内容 | 作用 |
|---|---|---|---|
| MX | `example.com` 或 `@` | `mx1.mxfilter.net`，优先级 `10` | 收信 |
| MX | `example.com` 或 `@` | `mx2.mxfilter.net`，优先级 `10` | 收信 |
| MX | `example.com` 或 `@` | `mx3.mxfilter.net`，优先级 `20` | 收信备用 |
| MX | `example.com` 或 `@` | `mx4.mxfilter.net`，优先级 `20` | 收信备用 |
| CNAME | `mail.example.com` 或 `mail` | `us2.workspace.org` | 自定义网页登录入口（可选） |
| CNAME | `autodiscover.example.com` 或 `autodiscover` | `us2.workspace.org` | 邮件客户端自动配置 |
| TXT | `example.com` 或 `@` | `v=spf1 include:_spf.workspace.org -all` | SPF 发信授权 |
| TXT | `_dmarc.example.com` 或 `_dmarc` | `v=DMARC1; p=none; sp=none` | DMARC 策略 |
| TXT | NameCrane 给出的 DKIM 名称 | NameCrane 给出的 DKIM 值 | DKIM 签名验证 |

>DKIM 的名称和值每个域名可能不同，务必从自己的 NameCrane 面板复制，不要照抄示例。

![NameCrane DKIM 记录](https://cdn.xjj.sh/img/2026/07/16/06c41becbb6dea07.jpg)

## 4. 在 Cloudflare 添加 DNS 记录

进入 Cloudflare 的域名 DNS 页面，按 NameCrane 提供的内容添加记录。
![Cloudflare DNS 记录](https://cdn.xjj.sh/img/2026/07/16/5a65fae617bde310.jpg)

注意事项：

- MX 记录只需要填写主机名、目标服务器和优先级。
- TXT 记录要完整复制，尤其是 DKIM，不能漏字符。
- `mail` 和 `autodiscover` 的 CNAME 保持 `DNS only`，不要开启代理。
- 如果 NameCrane 额外要求 `workspace-verification` 之类的 TXT 验证记录，也要保留。
- `mail.example.com` 只是自定义网页登录入口；如果以后只用 `https://us2.workspace.org/` 登录，可以不使用它。
- 不要删除 MX、SPF、DKIM、DMARC、`autodiscover` 这些关键记录。

## 5. 回到 NameCrane 检查状态

DNS 添加后，回到 NameCrane 的 `DNS Setup Guide` 页面刷新。
理想状态是全部指标都变成`ACTIVE`。如果没有立刻变成，等几分钟到几十分钟再刷新。Cloudflare 通常很快，但不同解析器可能有缓存。

## 6. 创建邮箱用户

进入 `Manage Users`，点击 `Add New User` 创建邮箱账号。
![NameCrane 用户管理](https://cdn.xjj.sh/img/2026/07/16/df93f75fa2ebf08b.jpg)
创建用户时一般需要填写：

| 字段 | 说明 |
|---|---|
| Account / Username | 邮箱前缀，例如 `hello`，完整邮箱就是 `hello@example.com` |
| Name | 显示名称 |
| Password | 邮箱登录密码 |
| Disk quota | 邮箱容量限制，可按需要设置 |
| Status | 保持 Enabled |

创建完成后，用户列表中状态应显示为 `Enabled`。不会设置的就填入帐号和密码就完事了

## 7. 登录网页邮箱

推荐直接使用 NameCrane 的官方入口：

```text
https://us2.workspace.org/
```

登录信息：

```text
邮箱：你的邮箱地址，例如 hello@example.com
密码：创建邮箱用户时设置的密码
```

如果保留了 `mail` CNAME，也可以访问：

```text
https://mail.example.com
```

但这不是必须的。以后统一用 `https://us2.workspace.org/` 也完全可以。

## 8. 配置 Mac Mail.app

在 Mac 的 Mail.app 中添加账户时，选择“其他邮件账户”。

推荐参数：

| 项目 | 内容 |
|---|---|
| 邮箱地址 | `你的邮箱@example.com` |
| 用户名 | 完整邮箱地址 |
| 收件服务器 | `us2.workspace.org` |
| 收件协议 | IMAP |
| IMAP 端口 | `993` |
| IMAP 加密 | SSL/TLS |
| 发件服务器 | `us2.workspace.org` |
| SMTP 端口 | `465` 或 `587` |
| SMTP 加密 | SSL/TLS 或 STARTTLS |

如果 Mail.app 自动识别失败，就手动填写上面的服务器信息。

## 9. 常见问题

### NameCrane 显示 DNS 没生效

检查 Cloudflare 中记录是否填错，尤其是：

- MX 优先级是否正确。
- DKIM 是否完整复制。
- TXT 名称是否填成了正确的主机名。
- CNAME 是否是 `DNS only`。
- 是否误删了 NameCrane 要求的验证 TXT。

### 能打开网页邮箱，但收不到信

优先检查 MX 记录。收信依赖 MX，不依赖 `mail.example.com`。

### 能收信，但发信容易进垃圾箱

优先检查 SPF、DKIM、DMARC。NameCrane 明确要求 SPF 和 DKIM 必须配置，否则域名可能被限制。

### 不想使用 mail.example.com

可以。直接使用：

```text
https://us2.workspace.org/
```

`mail.example.com` 只是网页登录入口的别名。你可以不用它，甚至可以删除 `mail` 这条 CNAME；但建议保留 `autodiscover`，方便邮件客户端自动配置。