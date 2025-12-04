# Portfólio – Lenon Alexandre (Desenvolvedor Full Stack)

Site pessoal/portfólio para apresentar serviços de desenvolvimento web (sites institucionais, e-commerces, SaaS, dashboards e landing pages), cases e um assistente virtual flutuante para tirar dúvidas em tempo real.

## Badges / Stack

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8) ![Framer%20Motion](https://img.shields.io/badge/Framer%20Motion-animacoes-ff3366) ![Lucide](https://img.shields.io/badge/Lucide-icones-111) ![Node.js](https://img.shields.io/badge/Node.js-backend-3c873a) ![MongoDB](https://img.shields.io/badge/MongoDB-banco-47a248) ![OpenAI](https://img.shields.io/badge/OpenAI-assistente-412991)

## Descrição geral

Portfólio e site de serviços do Lenon Alexandre, com foco em UI/UX, performance, acessibilidade e SEO técnico. Inclui páginas de apresentação (Início, Sobre, Serviços, Portfólio, Contato, Privacidade) e um chat assistente flutuante que responde dúvidas sobre projetos e serviços diretamente no site.

### Diferenciais
- Design responsivo com tema claro/escuro e animações suaves em Framer Motion.
- Assistente virtual flutuante, sempre acima do conteúdo e do footer, montado via portal.
- Navegação App Router do Next.js com foco em SEO e carregamento rápido.

## Funcionalidades
- **Início**: hero com apresentação, CTAs para contato e portfólio.
- **Sobre**: perfil, métricas de projetos, trajetória e stack principal.
- **Serviços**: oferta de sites, e-commerces, SaaS, dashboards, landing pages e blogs headless.
- **Portfólio/Projetos**: cards com thumbs, descrições e links.
- **Contato**: formulário completo, redes sociais e opções rápidas (e-mail, WhatsApp).
- **Privacidade**: página informativa.
- **Assistente virtual**: botão fixo no canto inferior direito; card flutuante renderizado via portal no `document.body`, mantendo histórico local e consumindo API própria.

## Tecnologias
- **Next.js (App Router)**: renderização híbrida e roteamento.
- **React**: base da interface.
- **TypeScript**: tipagem estática.
- **Tailwind CSS**: utilitários de estilização.
- **Framer Motion**: animações e transições.
- **Lucide React**: ícones.
- **API interna (Next API route)**: proxy para backend do assistente.
- **Backend externo (Node.js + Express + MongoDB + OpenAI)**: sessão e histórico do chat, respostas via OpenAI.

## Estrutura do projeto
```
.
├─ app/
│  ├─ layout.tsx            # Layout raiz, ChatClient global
│  ├─ page.tsx              # Home
│  ├─ about/                # Página Sobre
│  ├─ services/             # Página Serviços
│  ├─ services/             # Página de serviços
│  ├─ contact/              # Página Contato
│  ├─ privacidade/          # Página Privacidade
│  ├─ api/assistant/chat/   # Proxy para backend do assistente
│  └─ components/           # UI, seções e chat
├─ assets/                  # Imagens e dados de portfólio/serviços
├─ public/                  # Assets públicos
├─ backend/ (fora do front) # Servidor Express do assistente (MongoDB + OpenAI)
└─ README.md
```

## Como executar localmente

Pré-requisitos:
- Node.js 18+ e npm

Instalação:
```
npm install
```

Ambiente:
- Crie `.env.local` no frontend se precisar sobrepor URLs (ex.: `ASSISTANT_BACKEND_URL`).
- No backend (pasta `../backend`), crie `.env` com `OPENAI_API_KEY`, `MONGODB_URI`, `PORT` etc.

Rodar em desenvolvimento (frontend):
```
npm run dev
# http://localhost:3000
```

Backend do assistente (em ../backend):
```
npm install
npm run dev
# http://localhost:4000 (default)
```

## Deploy
- Indicada a Vercel para o frontend (Next.js).
- Backend pode rodar em serviço Node (Railway/Render/VM) com MongoDB gerenciado.
- Placeholder produção: [🚀 Acessar site em produção](https://www.seudominio.com) *(substituir pela URL real quando disponível)*.

## Log de alterações
- [2025-12] Implementação do chat assistente flutuante com portal para o `document.body`.
- [2025-12] Correção do posicionamento do chat para não ocupar a página e ficar acima do footer.
- [2025-12] Revisão de textos, acentuação e aria-labels; UI/UX refinada em seções Início/Sobre/Serviços/Portfólio/Contato.
- [2025-12] Criação/ajuste das rotas principais (Home, Sobre, Serviços, Portfólio, Contato, Privacidade) e animações em Framer Motion.
- [2025-12] Proxy de API `/api/assistant/chat` integrado ao backend Node + MongoDB + OpenAI.

## Roadmap
- Adicionar blog/casos detalhados com métricas de resultados.
- Painel de analytics para conversas do assistente (dashboard).
- Internacionalização (i18n) com versões EN/ES.
- Testes end-to-end e cobertura maior de acessibilidade.
- Monitoramento de erros/logs no backend do assistente.

## Contato & CTAs
- 📩 E-mail: lenon.contato.dev.co@gmail.com
- 💬 WhatsApp: [https://wa.me/5524998482188](https://wa.me/5524998482188)
- 💼 Portfólio: [https://www.seudominio.com](https://www.seudominio.com) *(substituir pela URL real)*
- 🔗 LinkedIn: [https://www.linkedin.com/in/lenonalexandre](https://www.linkedin.com/in/lenonalexandre)
- 🛠️ GitHub: [https://github.com/lenonrj-dev](https://github.com/lenonrj-dev)
- ✉️ Falar sobre um projeto: abra o chat no canto inferior direito ou acesse `/contact`.

## Licença
Uso pessoal/demonstrativo. Definir licença específica em iteração futura.
