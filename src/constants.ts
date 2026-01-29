import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/exing567/astro-paper",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "Mail",
    href: "mailto:hello@xjj.sh",
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: "分享到X",
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: "分享到TG",
    icon: IconTelegram,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: "分享邮箱邮箱",
    icon: IconMail,
  },
] as const;
