# Portfolio - Lenon Alexandre (Desenvolvedor Full Stack)

Site pessoal/portfolio para apresentar servicos de desenvolvimento web (sites institucionais, e-commerces, SaaS, dashboards e landing pages), cases e um assistente virtual flutuante para tirar duvidas em tempo real.

## Badges / Stack

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8) ![Framer%20Motion](https://img.shields.io/badge/Framer%20Motion-animacoes-ff3366) ![Lucide](https://img.shields.io/badge/Lucide-icones-111) ![Node.js](https://img.shields.io/badge/Node.js-backend-3c873a) ![MongoDB](https://img.shields.io/badge/MongoDB-banco-47a248) ![OpenAI](https://img.shields.io/badge/OpenAI-assistente-412991)

## Descricao geral

Portfolio e site de servicos do Lenon Alexandre, com foco em UI/UX, performance, acessibilidade e SEO tecnico. Inclui paginas de apresentacao (Inicio, Sobre, Servicos, Portfolio, Contato, Privacidade) e um chat assistente flutuante que responde duvidas sobre projetos e servicos diretamente no site.

### Diferenciais
- Design responsivo com tema claro/escuro e animacoes suaves em Framer Motion.
- Assistente virtual flutuante, sempre acima do conteudo e do footer, montado via portal.
- Navegacao App Router do Next.js com foco em SEO e carregamento rapido.

## Funcionalidades
- **Inicio**: hero com apresentacao, CTAs para contato e portfolio.
- **Sobre**: perfil, metricas de projetos, trajetoria e stack principal.
- **Servicos**: oferta de sites, e-commerces, SaaS, dashboards, landing pages e blogs headless.
- **Portfolio/Projetos**: cards com thumbs, descricoes e links.
- **Contato**: formulario completo, redes sociais e opcoes rapidas (e-mail, WhatsApp).
- **Privacidade**: pagina informativa.
- **Assistente virtual**: botao fixo no canto inferior direito; card flutuante renderizado via portal no `document.body`, mantendo historico local e consumindo API propria.

## Tecnologias
- **Next.js (App Router)**: renderizacao hibrida e roteamento.
- **React**: base da interface.
- **TypeScript**: tipagem estatica.
- **Tailwind CSS**: utilitarios de estilizacao.
- **Framer Motion**: animacoes e transicoes.
- **Lucide React**: icones.
- **API interna (Next API route)**: proxy para backend do assistente.
- **Backend externo (Node.js + Express + MongoDB + OpenAI)**: sessao e historico do chat, respostas via OpenAI.

## Estrutura do projeto
```
.
 app/
   layout.tsx            # Layout raiz, ChatClient global
   page.tsx              # Home
   about/                # Pagina Sobre
   services/             # Pagina Servicos
   services/             # Pagina de servicos
   contact/              # Pagina Contato
   privacidade/          # Pagina Privacidade
   api/assistant/chat/   # Proxy para backend do assistente
   components/           # UI, secoes e chat
 assets/                  # Imagens e dados de portfolio/servicos
 public/                  # Assets publicos
 backend/ (fora do front) # Servidor Express do assistente (MongoDB + OpenAI)
 README.md
```

## Como executar localmente

Pre-requisitos:
- Node.js 18+ e npm

Instalacao:
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
- Backend pode rodar em servico Node (Railway/Render/VM) com MongoDB gerenciado.
- Placeholder producao: [ Acessar site em producao](https://www.seudominio.com) *(substituir pela URL real quando disponivel)*.

## Log de alteracoes
- [2025-12] Implementacao do chat assistente flutuante com portal para o `document.body`.
- [2025-12] Correcao do posicionamento do chat para nao ocupar a pagina e ficar acima do footer.
- [2025-12] Revisao de textos, acentuacao e aria-labels; UI/UX refinada em secoes Inicio/Sobre/Servicos/Portfolio/Contato.
- [2025-12] Criacao/ajuste das rotas principais (Home, Sobre, Servicos, Portfolio, Contato, Privacidade) e animacoes em Framer Motion.
- [2025-12] Proxy de API `/api/assistant/chat` integrado ao backend Node + MongoDB + OpenAI.

## Roadmap
- Adicionar blog/casos detalhados com metricas de resultados.
- Painel de analytics para conversas do assistente (dashboard).
- Internacionalizacao (i18n) com versoes EN/ES.
- Testes end-to-end e cobertura maior de acessibilidade.
- Monitoramento de erros/logs no backend do assistente.

## Contato & CTAs
-  E-mail: lenon.contato.dev.co@gmail.com
-  WhatsApp: [https://wa.me/5524998482188](https://wa.me/5524998482188)
-  Portfolio: [https://www.seudominio.com](https://www.seudominio.com) *(substituir pela URL real)*
-  LinkedIn: [https://www.linkedin.com/in/lenonalexandre](https://www.linkedin.com/in/lenonalexandre)
-  GitHub: [https://github.com/lenonrj-dev](https://github.com/lenonrj-dev)
-  Falar sobre um projeto: abra o chat no canto inferior direito ou acesse `/contact`.

## Licenca
Uso pessoal/demonstrativo. Definir licenca especifica em iteracao futura.
