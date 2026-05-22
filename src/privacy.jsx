import React from 'react';
import ReactDOM from 'react-dom/client';
import './site.css';

const LAST_UPDATED = '2026-05-22';

// ── PREENCHER ANTES DE PUBLICAR ──────────────────────────────────────────────
const RAZAO_SOCIAL = '';
const CNPJ         = '';
const ENDERECO     = '';
const EMAIL        = '';
const RESPONSAVEL  = '';
// ─────────────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: 'responsavel',
    title: '01 — Responsável pelo Tratamento',
    content: (
      <>
        <p>
          O responsável pelo tratamento dos dados pessoais coletados neste site e nos serviços prestados é:
        </p>
        <table>
          <tbody>
            <tr><td>Razão Social</td><td>{RAZAO_SOCIAL}</td></tr>
            <tr><td>CNPJ</td><td>{CNPJ}</td></tr>
            <tr><td>Endereço</td><td>{ENDERECO}</td></tr>
            <tr><td>E-mail</td><td><a href={`mailto:${EMAIL}`}>{EMAIL}</a></td></tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: 'site',
    title: '02 — Dados Coletados neste Site',
    content: (
      <>
        <p>
          Este site utiliza o <strong>Microsoft Clarity</strong>, ferramenta de análise de comportamento que coleta
          automaticamente informações sobre como os visitantes interagem com as páginas. Os dados coletados incluem:
        </p>
        <ul>
          <li>Gravações de sessão (session replay) e mapas de calor (heatmaps)</li>
          <li>Cliques, rolagem e movimentos do cursor</li>
          <li>Tipo de dispositivo, sistema operacional e navegador</li>
          <li>País e idioma do visitante</li>
          <li>Páginas visitadas e tempo de permanência</li>
        </ul>
        <p>
          Esses dados são coletados de forma agregada e não identificam você individualmente. O Clarity utiliza
          cookies de primeira e terceira parte para esse fim. Para saber como a Microsoft trata essas informações,
          consulte a{' '}
          <a href="https://privacy.microsoft.com/pt-br/privacystatement" target="_blank" rel="noopener noreferrer">
            Declaração de Privacidade da Microsoft
          </a>.
        </p>
        <p>
          Nenhum outro dado pessoal é coletado automaticamente ao navegar neste site. O formulário de contato,
          quando utilizado, coleta apenas nome, e-mail e a mensagem enviada, exclusivamente para responder ao contato.
        </p>
      </>
    ),
  },
  {
    id: 'servicos',
    title: '03 — Dados Tratados nos Serviços Prestados',
    content: (
      <>
        <p>
          Na condição de <strong>Operador</strong> (conforme a LGPD), trato dados pessoais de clientes, colaboradores
          e parceiros dos contratantes (<strong>Controladores</strong>) exclusivamente para execução dos serviços
          acordados. Os serviços prestados incluem, mas não se limitam a:
        </p>
        <ul>
          <li>Automação de processos com n8n, APIs REST e webhooks</li>
          <li>Integrações entre plataformas (CRMs, Clicksign, WhatsApp Cloud API, Chatwoot)</li>
          <li>Migração, manutenção e evolução de sistemas</li>
          <li>Infraestrutura e monitoramento de ambientes</li>
        </ul>
        <p>Os dados pessoais tratados podem incluir:</p>
        <ul>
          <li>Nome completo, CPF, RG, e-mail, telefone e endereço</li>
          <li>Dados cadastrais e informações relacionadas a contratos imobiliários</li>
          <li>Dados de colaboradores e parceiros do Controlador</li>
        </ul>
        <p>
          O tratamento ocorre exclusivamente conforme as instruções documentadas do Controlador, nas finalidades
          previstas no contrato de prestação de serviços e no Acordo de Confidencialidade e Processamento de Dados
          (DPA/NDA) firmado entre as partes.
        </p>
      </>
    ),
  },
  {
    id: 'bases',
    title: '04 — Bases Legais (LGPD)',
    content: (
      <>
        <p>O tratamento de dados pessoais é fundamentado nas seguintes hipóteses legais da Lei nº 13.709/2018:</p>
        <ul>
          <li>
            <strong>Execução de contrato</strong> (Art. 7º, V) — quando o tratamento é necessário para prestação
            dos serviços contratados ou para procedimentos preliminares a pedido do titular.
          </li>
          <li>
            <strong>Legítimo interesse</strong> (Art. 7º, IX) — para análise técnica de viabilidade e diagnóstico
            prévio à contratação, observados os princípios da finalidade, adequação e minimização.
          </li>
          <li>
            <strong>Cumprimento de obrigação legal</strong> (Art. 7º, II) — quando exigido por legislação aplicável.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'suboperadores',
    title: '05 — Compartilhamento e Suboperadores',
    content: (
      <>
        <p>
          Para execução técnica dos serviços, posso utilizar suboperadores e prestadores de infraestrutura, incluindo:
        </p>
        <ul>
          <li>Provedores de computação em nuvem e hospedagem</li>
          <li>Serviços de backup e armazenamento</li>
          <li>Ferramentas de monitoramento, logs e segurança da informação</li>
          <li>Plataformas de automação e integração (n8n, entre outras)</li>
        </ul>
        <p>
          Os suboperadores são selecionados com base em padrões razoáveis de segurança e confidencialidade.
          Não compartilho dados com terceiros para fins publicitários ou comerciais alheios ao objeto do contrato.
        </p>
        <p>
          A execução dos serviços pode envolver transferência internacional de dados quando utilizados provedores
          com infraestrutura fora do Brasil. Nesses casos, são adotados mecanismos legais adequados compatíveis
          com a LGPD, como cláusulas contratuais padrão ou certificações reconhecidas pela ANPD.
        </p>
      </>
    ),
  },
  {
    id: 'retencao',
    title: '06 — Retenção e Eliminação de Dados',
    content: (
      <>
        <p>
          Os dados pessoais são mantidos enquanto necessários à execução dos serviços ou durante a vigência
          da relação contratual. Encerrado o contrato:
        </p>
        <ul>
          <li>
            Os dados são excluídos de forma definitiva e segura de todos os repositórios (físicos e digitais),
            salvo nas hipóteses em que a legislação imponha prazo de retenção específico.
          </li>
          <li>
            Nas análises pré-contratuais em que a proposta não é aprovada, os dados são excluídos ao término
            da fase de diagnóstico, sem guarda prolongada.
          </li>
          <li>
            As obrigações de sigilo e proteção de dados sobrevivem ao término da relação pelo prazo de 5 (cinco) anos.
          </li>
        </ul>
        <p>
          O Controlador pode solicitar a qualquer momento evidências das medidas de segurança adotadas ou
          a emissão de um Termo de Descarte de Dados.
        </p>
      </>
    ),
  },
  {
    id: 'seguranca',
    title: '07 — Segurança da Informação',
    content: (
      <>
        <p>Adoto medidas técnicas e administrativas proporcionais ao risco do tratamento, incluindo:</p>
        <ul>
          <li>Controle de acesso lógico baseado em credenciais individuais</li>
          <li>Registro de logs de acesso e operações relevantes</li>
          <li>Segregação de ambientes quando tecnicamente aplicável</li>
          <li>Criptografia ou isolamento lógico quando suportado pela infraestrutura</li>
        </ul>
        <p>
          Em caso de incidente de segurança relevante — aquele que possa acarretar risco ou dano aos titulares —,
          o Controlador será notificado em até <strong>48 horas úteis</strong> após a ciência confirmada do evento.
          A comunicação a titulares ou à ANPD é responsabilidade do Controlador, salvo determinação legal em sentido
          diverso.
        </p>
      </>
    ),
  },
  {
    id: 'direitos',
    title: '08 — Direitos dos Titulares',
    content: (
      <>
        <p>
          Conforme o Art. 18 da LGPD, os titulares de dados pessoais têm direito a:
        </p>
        <ul>
          <li>Confirmação da existência de tratamento</li>
          <li>Acesso aos dados</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
          <li>Portabilidade dos dados</li>
          <li>Eliminação dos dados tratados com base no consentimento</li>
          <li>Informação sobre compartilhamento com terceiros</li>
          <li>Informação sobre a possibilidade de não fornecer consentimento e suas consequências</li>
          <li>Revogação do consentimento</li>
          <li>Oposição ao tratamento</li>
        </ul>
        <p>
          Como Operador, não realizo atendimento direto a titulares de dados dos meus contratantes —
          qualquer solicitação recebida é encaminhada ao Controlador responsável. Para dados coletados
          diretamente neste site, as solicitações podem ser enviadas para{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: 'contato',
    title: '09 — Contato e Encarregado',
    content: (
      <>
        <p>
          Para dúvidas, exercício de direitos ou comunicação de incidentes relacionados a esta política,
          entre em contato:
        </p>
        <table>
          <tbody>
            <tr><td>E-mail</td><td><a href={`mailto:${EMAIL}`}>{EMAIL}</a></td></tr>
            <tr><td>Responsável</td><td>{RESPONSAVEL}</td></tr>
          </tbody>
        </table>
        <p>
          Caso sua solicitação não seja respondida de forma satisfatória, você pode contatar a{' '}
          <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
            Autoridade Nacional de Proteção de Dados (ANPD)
          </a>.
        </p>
      </>
    ),
  },
];

function Privacy() {
  return (
    <div className="pp-root">
      <header className="pp-header">
        <a href="/" className="pp-back">← jribas.com.br</a>
        <span className="pp-badge">rascunho — não publicado</span>
      </header>

      <main className="pp-main">
        <div className="pp-hero">
          <p className="pp-kicker">// politica-de-privacidade.md</p>
          <h1>Política de Privacidade</h1>
          <p className="pp-meta">
            Última atualização: <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>
            {' '}·{' '}
            {RAZAO_SOCIAL} · CNPJ {CNPJ}
          </p>
          <p className="pp-intro">
            Este documento descreve como tratamos dados pessoais de visitantes deste site e de clientes e
            parceiros dos serviços prestados, em conformidade com a Lei Geral de Proteção de Dados
            (Lei nº 13.709/2018 — LGPD).
          </p>
        </div>

        <nav className="pp-toc">
          <p className="pp-toc-label">Sumário</p>
          <ol>
            {sections.map(s => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
          </ol>
        </nav>

        {sections.map(s => (
          <section key={s.id} id={s.id} className="pp-section">
            <h2>{s.title}</h2>
            {s.content}
          </section>
        ))}

        <section className="pp-section pp-updates">
          <h2>10 — Alterações nesta Política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. Alterações relevantes serão comunicadas
            aos clientes ativos por e-mail. A versão vigente estará sempre disponível nesta página com
            a data de última atualização.
          </p>
        </section>
      </main>

      <footer className="pp-footer">
        <p>© {new Date().getFullYear()} {RAZAO_SOCIAL} · CNPJ {CNPJ}</p>
        <a href="/">← Voltar ao site</a>
      </footer>
    </div>
  );
}

// ── styles ──────────────────────────────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .pp-root {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 48px) 80px;
  }

  .pp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 0 40px;
    border-bottom: 1px solid var(--line);
    margin-bottom: 56px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .pp-back {
    font-size: 0.82rem;
    color: var(--fg-3);
    text-decoration: none;
    transition: color var(--t-fast);
  }
  .pp-back:hover { color: var(--accent); }

  .pp-badge {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: oklch(75% 0.18 45);
    color: oklch(20% 0.05 45);
    padding: 3px 10px;
    border-radius: 4px;
    font-weight: 600;
  }

  .pp-hero {
    margin-bottom: 48px;
  }

  .pp-kicker {
    font-size: 0.78rem;
    color: var(--accent);
    margin: 0 0 12px;
    letter-spacing: 0.04em;
  }

  .pp-hero h1 {
    font-family: var(--font-display, var(--font-mono));
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    margin: 0 0 16px;
    color: var(--fg);
    letter-spacing: -0.02em;
  }

  .pp-meta {
    font-size: 0.78rem;
    color: var(--fg-4);
    margin: 0 0 20px;
  }

  .pp-intro {
    font-size: 0.92rem;
    color: var(--fg-3);
    line-height: 1.7;
    margin: 0;
    padding: 16px 20px;
    border-left: 3px solid var(--accent);
    background: var(--bg-soft);
  }

  .pp-toc {
    background: var(--bg-card);
    border: 1px solid var(--line);
    padding: 24px 28px;
    margin-bottom: 56px;
    border-radius: 2px;
  }

  .pp-toc-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--fg-4);
    margin: 0 0 14px;
  }

  .pp-toc ol {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pp-toc li { font-size: 0.82rem; }

  .pp-toc a {
    color: var(--fg-3);
    text-decoration: none;
    transition: color var(--t-fast);
  }
  .pp-toc a:hover { color: var(--accent); }

  .pp-section {
    margin-bottom: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--line);
  }

  .pp-section:last-child {
    border-bottom: none;
  }

  .pp-section h2 {
    font-family: var(--font-display, var(--font-mono));
    font-size: 1rem;
    font-weight: 700;
    color: var(--fg-2);
    margin: 0 0 20px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .pp-section p {
    font-size: 0.88rem;
    color: var(--fg-3);
    line-height: 1.75;
    margin: 0 0 14px;
  }

  .pp-section p:last-child { margin-bottom: 0; }

  .pp-section ul, .pp-section ol {
    font-size: 0.88rem;
    color: var(--fg-3);
    line-height: 1.75;
    margin: 0 0 14px;
    padding-left: 22px;
  }

  .pp-section li { margin-bottom: 6px; }

  .pp-section strong { color: var(--fg-2); font-weight: 600; }

  .pp-section a {
    color: var(--accent);
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color var(--t-fast);
  }
  .pp-section a:hover { text-decoration-color: var(--accent); }

  .pp-section table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.84rem;
    margin: 0 0 14px;
  }

  .pp-section td {
    padding: 10px 14px;
    border: 1px solid var(--line);
    vertical-align: top;
    color: var(--fg-3);
  }

  .pp-section td:first-child {
    color: var(--fg-4);
    width: 140px;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
    background: var(--bg-soft);
  }

  .pp-footer {
    margin-top: 64px;
    padding-top: 28px;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 0.78rem;
    color: var(--fg-4);
  }

  .pp-footer a {
    color: var(--fg-3);
    text-decoration: none;
    transition: color var(--t-fast);
  }
  .pp-footer a:hover { color: var(--accent); }

  @media (max-width: 520px) {
    .pp-section td:first-child { width: 100px; }
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(<Privacy />);
