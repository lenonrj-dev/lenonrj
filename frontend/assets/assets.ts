import type { StaticImageData } from "next/image";

import arrow_icon from "./arrow-icon.png";
import arrow_icon_dark from "./arrow-icon-dark.png";
import close_black from "./close-black.png";
import close_white from "./close-white.png";
import code_icon from "./code-icon.png";
import code_icon_dark from "./code-icon-dark.png";
import download_icon from "./download-icon.png";
import edu_icon from "./edu-icon.png";
import edu_icon_dark from "./edu-icon-dark.png";
import figma from "./nextIcon.png";
import firebase from "./ReactIcon.png";
import git from "./js.png";
import graphics_icon from "./graphics-icon.png";
import hand_icon from "./hand-icon.png";
import header_bg_color from "./header-bg-color.png";
import logo from "./logo.png";
import logo_dark from "./logo_dark.png";
import mail_icon from "./mail_icon.png";
import mail_icon_dark from "./mail_icon_dark.png";
import menu_black from "./menu-black.png";
import menu_white from "./menu-white.png";
import mobile_icon from "./mobile-icon.png";
import moon_icon from "./moon_icon.png";
import profile_img from "./profile-img.png";
import project_icon from "./project-icon.png";
import project_icon_dark from "./project-icon-dark.png";
import right_arrow from "./right-arrow.png";
import right_arrow_bold from "./right-arrow-bold.png";
import right_arrow_bold_dark from "./right-arrow-bold-dark.png";
import right_arrow_white from "./right-arrow-white.png";
import send_icon from "./send-icon.png";
import sun_icon from "./sun_icon.png";
import ui_icon from "./ui-icon.png";
import user_image from "./profile-img.png";
import vscode from "./vscode.png";
import web_icon from "./web-icon.png";
import mongodb from "./tsIcon.png";

type AssetImage = StaticImageData;

export const assets = {
  user_image,
  code_icon,
  code_icon_dark,
  edu_icon,
  edu_icon_dark,
  project_icon,
  project_icon_dark,
  vscode,
  firebase,
  figma,
  git,
  mongodb,
  right_arrow_white,
  logo,
  logo_dark,
  mail_icon,
  mail_icon_dark,
  profile_img,
  download_icon,
  hand_icon,
  header_bg_color,
  moon_icon,
  sun_icon,
  arrow_icon,
  arrow_icon_dark,
  menu_black,
  menu_white,
  close_black,
  close_white,
  web_icon,
  mobile_icon,
  ui_icon,
  graphics_icon,
  right_arrow,
  send_icon,
  right_arrow_bold,
  right_arrow_bold_dark,
};

export type WorkItem = {
  title: string;
  description: string;
  bgImage: string;
  link: string;
};

export type ServiceItem = {
  icon: AssetImage;
  title: string;
  description: string;
  link: string;
};

export type InfoItem = {
  icon: AssetImage;
  iconDark: AssetImage;
  title: string;
  description: string;
};

export const workData: WorkItem[] = [
  {
    title: "SaaS B2B",
    description: "Produtos SaaS com autenticacao, billing e dashboards completos.",
    bgImage: "/work-1.png",
    link: "https://ai-ateliux.vercel.app/",
  },
  {
    title: "Ecommerce",
    description: "Lojas online com checkout otimizado, SEO e integracoes.",
    bgImage: "/work-2.png",
    link: "https://usemarima.com/",
  },
  {
    title: "Websites",
    description: "Sites institucionais leves e preparados para SEO tecnico.",
    bgImage: "/work-3.png",
    link: "https://ateliux-app.vercel.app/",
  },
  {
    title: "Landing Pages",
    description: "Landing pages de alta conversao, focadas em resultado.",
    bgImage: "/work-4.png",
    link: "https://marima-athleisure.vercel.app/",
  },
  {
    title: "Dashboards",
    description: "Painel de gestao e CRM com dados em tempo real.",
    bgImage: "/work-3.png",
    link: "https://ateliux-manager-ecommerce.vercel.app/",
  },
  {
    title: "Blog App",
    description: "Aplicacao headless de conteudo com SEO tecnico.",
    bgImage: "/work-1.png",
    link: "https://www.ateliux.blog/",
  },
];

export const serviceData: ServiceItem[] = [
  {
    icon: assets.web_icon,
    title: "SaaS B2B",
    description: "SaaS completos com autenticacao, billing e dashboards que suportam crescimento.",
    link: "https://ai-ateliux.vercel.app/",
  },
  {
    icon: assets.mobile_icon,
    title: "Ecommerce",
    description: "Lojas online performaticas com checkout otimizado e integracoes de pagamento/ERP.",
    link: "https://usemarima.com/",
  },
  {
    icon: assets.ui_icon,
    title: "Websites",
    description: "Sites institucionais leves, acessiveis e preparados para SEO tecnico.",
    link: "https://ateliux-app.vercel.app/",
  },
  {
    icon: assets.graphics_icon,
    title: "Landing Pages",
    description: "Landing pages de conversao com copy clara, testes A/B e captacao de leads.",
    link: "https://marima-athleisure.vercel.app/",
  },
  {
    icon: assets.mobile_icon,
    title: "Dashboards",
    description: "Paineis e CRMs com dados em tempo real, filtros e controle de acesso.",
    link: "https://ateliux-manager-ecommerce.vercel.app/",
  },
  {
    icon: assets.ui_icon,
    title: "Blog App",
    description: "Blogs headless com editor amigavel, SEO tecnico e carregamento rapido.",
    link: "https://www.ateliux.blog/",
  },
];

export const infoList: InfoItem[] = [
  { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: "Linguagens", description: "HTML, TailwindCSS, JavaScript, TypeScript, Next, React." },
  { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: "Educacao", description: "Desenvolvedor Full Stack JavaScript/Python." },
  { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: "Projetos", description: "20+ projetos concluidos." },
];

export const toolsData: AssetImage[] = [assets.vscode, assets.firebase, assets.mongodb, assets.figma, assets.git];
