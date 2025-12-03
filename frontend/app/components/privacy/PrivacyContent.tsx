import Link from "next/link";

const Section = ({ title, children }) => (
  <section className="space-y-2">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">{children}</div>
  </section>
);

export default function PrivacyContent({ lastUpdated = "2025-10-18" }) {
  return (
    <main id="main-content" className="w-full px-6 md:px-[12%] py-16 bg-white dark:bg-black">
      <header className="mb-8 space-y-3 max-w-4xl">
        <p className="text-sm text-gray-500 dark:text-gray-400">Ultima atualizacao: {lastUpdated}</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Politica de Privacidade
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
          Este site pessoal e usado para apresentar trabalho, servicos e permitir contato. A coleta de dados e
          minima e ocorre somente quando voce envia o formulario de contato ou interage com ferramentas de
          analise basicas.
        </p>
      </header>

      <div className="space-y-8 max-w-4xl">
        <Section title="Quais dados sao coletados">
          <ul className="list-disc list-inside space-y-1">
            <li>Nome, e-mail, telefone e mensagem enviados voluntariamente no formulario de contato.</li>
            <li>Orcamento e tipo de projeto, quando preenchidos para agilizar o atendimento.</li>
            <li>Dados tecnicos anonimos (como pagina visitada e pais) para metricas agregadas de navegacao.</li>
          </ul>
        </Section>

        <Section title="Como os dados sao usados">
          <ul className="list-disc list-inside space-y-1">
            <li>Responder solicitacoes de contato e enviar propostas.</li>
            <li>Planejar escopo tecnico do projeto e preparar estimativas.</li>
            <li>Melhorar performance e conteudo do site com metricas agregadas.</li>
          </ul>
        </Section>

        <Section title="Compartilhamento">
          <p>Os dados nao sao vendidos nem compartilhados com terceiros para fins de marketing.</p>
          <p>
            Informacoes podem ser processadas por provedores essenciais (ex.: e-mail, hospedagem) apenas para
            viabilizar a comunicacao. Esses servicos seguem boas praticas de seguranca.
          </p>
        </Section>

        <Section title="Cookies e analytics">
          <p>
            Este site pode utilizar cookies estritamente necessarios para funcionamento e, de forma opcional,
            scripts de metricas agregadas sem identificacao individual. Voce pode limpar cookies no seu
            navegador a qualquer momento.
          </p>
        </Section>

        <Section title="Seus direitos">
          <ul className="list-disc list-inside space-y-1">
            <li>Pedir acesso, atualizacao ou exclusao dos dados que voce enviou.</li>
            <li>Retirar consentimento e solicitar que eu pare de contata-lo.</li>
            <li>Solicitar confirmacao sobre uso ou compartilhamento de informacoes.</li>
          </ul>
        </Section>

        <Section title="Contato">
          <p>
            Para duvidas ou solicitacoes sobre privacidade, escreva para{" "}
            <a href="mailto:lenon.contato.dev.co@gmail.com" className="underline">
              lenon.contato.dev.co@gmail.com
            </a>
            . Atualize este endereco para o seu canal oficial de suporte assim que publicar.
          </p>
        </Section>

        <Section title="Atualizacoes">
          <p>
            Esta politica pode mudar conforme novas funcionalidades sao adicionadas. Quando houver alteracoes
            relevantes, a data de atualizacao sera revisada e, se necessario, avisos serao exibidos neste site.
          </p>
        </Section>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <Link href="/contact" className="underline">
            Voltar para contato
          </Link>
        </div>
      </div>
    </main>
  );
}
