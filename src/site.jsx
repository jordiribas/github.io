import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakText, useTweaks } from './tweaks-panel.jsx';
import './site.css';

// ════════════════════════════════════════════════════════════════════════════
//                          ✏️  EDIÇÃO RÁPIDA  ✏️
// ────────────────────────────────────────────────────────────────────────────
// Os valores abaixo são os que você muda no dia a dia direto no GitHub.
//
// ── Status & conteúdo (flipe quando estiver pronto) ──
//   "available"    → true (aceitando projetos)  |  false (em projeto)
//   "showClients"  → false enquanto não tiver autorização dos clientes.
//   "showCases"    → false enquanto os cases estão em rascunho.
//
// ── Integrações ──
//   "formWebhook"  → URL do webhook n8n. Se vazio, form abre mailto.
//   "cvUrl"        → URL pública do CV em PDF. Se vazio, botão some.
//
// ── Aparência ──
//   "themeMode"    → "auto" | "light" | "dark"
//   "accentHue"    → cor de destaque em graus OKLCH (0–360). 235 = azul logo.
//   "language"     → "pt" | "en"
// ════════════════════════════════════════════════════════════════════════════
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "name": "Jordi Ribas",
  "handle": "jribas",
  "role": "Automação & Integrações",
  "tagline": "Se tem processo manual, tem automação possível.",
  "location": "São José do Rio Preto, SP",
  "email": "jordi@jribas.com.br",
  "linkedin": "https://www.linkedin.com/in/jordi-ribas/",
  "github": "",
  "available": true,
  "showClients": true,
  "showCases": true,
  "formWebhook": "https://webhook-eggs.ackhub.app/webhook/617c8eae-6e39-464f-a492-70affae971b4-jribas",
  "cvUrl": "",
  "themeMode": "auto",
  "accentHue": 235,
  "gridLines": true,
  "displayFont": "mono",
  "animationLevel": "moderate",
  "density": "regular",
  "language": "pt"
}/*EDITMODE-END*/;

// ────────────────────────────────────────────────────────────────
// CONTENT — bilingual scaffold (PT/EN)
// ────────────────────────────────────────────────────────────────
const COPY = {
  pt: {
    nav: { about: "sobre", work: "trajetória", cases: "cases", skills: "stack", contact: "contato" },
    statusAvailable: "Aberto a novos projetos",
    statusBusy: "Em projeto · respondo",
    heroIntroLine: "// arquivo: ~/sobre.md",
    heroGreeting: "Olá, eu sou",
    heroSub: "Automação de processos e integração entre sistemas. Conecto APIs, elimino trabalho manual e faço as ferramentas que você já usa conversarem entre si.",
    cta: "Vamos conversar",
    aboutKicker: "01 — sobre",
    aboutTitle: "Sobre.",
    aboutBody: [
      "Especializado em automação de processos e integração entre plataformas — n8n, APIs REST, webhooks e qualquer coisa que faça sistemas conversarem sem intervenção manual.",
      "Atuo via firma própria, atendendo empresas do setor imobiliário e de loteamentos — do fluxo de leads ao contrato assinado.",
      "Acredito em decisões pragmáticas e prazos honestos. Fora do teclado: churrasco no quintal, estradas de SP/MG na FZ25 e jogos online quando sobra tempo."
    ],
    aboutFacts: [
      ["Base", "São José do Rio Preto, SP — remoto"],
      ["Foco", "Automação de processos e integrações entre sistemas"],
      ["Ferramentas", "n8n · APIs REST · Webhooks · Clicksign · WhatsApp API"],
      ["Em estudo", "AWS Certified Cloud Practitioner (CLF-C02)"],
      ["Disponibilidade", "Projetos pontuais e parcerias contínuas"]
    ],
    workKicker: "02 — trajetória",
    workTitle: "Trajetória.",
    workItems: [
      { year: "Atual", role: "Automação & Integrações", org: "Setor imobiliário · loteamentos", body: "Automações em n8n, pipelines de CRM no Notion e integrações com Clicksign (v3), Meta WhatsApp Cloud API e Chatwoot 4.11 para o fluxo de leads, contratos e onboarding de clientes." },
      { year: "Atual", role: "Infraestrutura e monitoramento", org: "Ambientes próprios + clientes", body: "Virtualização em Proxmox com LVM-Thin, monitoramento Zabbix 7.4 (templates Sophos) via SNMPv3 e operação de servidores Linux para os ambientes de produção." },
      { year: "Recente", role: "Desenvolvedor independente", org: "JRibas", body: "Projetos sob medida para o setor imobiliário e loteamentos: automação de contratos, validação de documentos, dashboards operacionais e integrações entre plataformas." },
      // { year: "Antes", role: "Desenvolvimento Web e Sistemas", org: "Projetos próprios e parcerias", body: "Primeiros sites, sistemas e integrações que viraram a base do que faço hoje — do front à infra, sempre próximo do problema do cliente." }
    ],
    workNote: "* Posso detalhar projetos específicos sob NDA — peça por e-mail.",
    clientsKicker: "clientes",
    clientsLead: "Parceiros e empresas com quem trabalho — logos com autorização.",
    clients: [
      { name: "Eggs", subtitle: "Soluções Imobiliárias", logo: "" },
      { name: "Abovyan", subtitle: "Participações", logo: "" },
      { name: "Mangaba", subtitle: "Urbanismo", logo: "" }
    ],
    casesKicker: "cases",
    casesTitle: "Cases.",
    casesLead: "Projetos selecionados. Em breve com mais detalhes — alguns sob NDA.",
    cases: [
      {
        title: "[Preencher: título do case]",
        client: "[Cliente]",
        year: "[2025]",
        problem: "[Qual era o problema antes do projeto?]",
        stack: ["[n8n]", "[Clicksign]", "[WhatsApp API]"],
        result: "[Qual foi o resultado mensurável? Ex: redução de X% no tempo, Y contratos/mês, Z erros eliminados.]"
      },
      {
        title: "[Preencher: título do case]",
        client: "[Cliente]",
        year: "[2025]",
        problem: "[Qual era o problema antes do projeto?]",
        stack: ["[Stack]", "[Stack]"],
        result: "[Resultado]"
      },
      {
        title: "[Preencher: título do case]",
        client: "[Cliente]",
        year: "[2024]",
        problem: "[Qual era o problema antes do projeto?]",
        stack: ["[Stack]", "[Stack]"],
        result: "[Resultado]"
      }
    ],
    casesEmptyLabel: "// rascunho — preencher",
    skillsKicker: "03 — stack",
    skillsTitle: "Stack.",
    skillsLead: "Ferramentas que uso no dia a dia e entrego em produção.",
    skillsGroups: [
      { label: "Automação & Integrações", items: ["n8n", "Clicksign API v3", "WhatsApp Cloud API", "Chatwoot 4.11", "Notion API", "Webhooks"] },
      { label: "Desenvolvimento", items: ["C#", ".NET Core", "TypeScript", "Angular", "PostgreSQL", "REST APIs"] },
      { label: "Infra & Monitoramento", items: ["Proxmox", "LVM-Thin", "Zabbix 7.4", "SNMPv3", "Sophos", "Linux", "Git"] },
      { label: "IA & ferramentas", items: ["Claude Code", "GitHub Copilot", "Gemini API", "Google AI Studio", "NotebookLM"] },
      // { label: "Em estudo", items: ["AWS CLF-C02"] }
    ],
    contactKicker: "04 — contato",
    contactTitle: "Vamos trabalhar juntos.",
    contactLead: "Conta o que você precisa e qual o prazo. Respondo em até 1 dia útil.",
    formName: "Nome",
    formEmail: "Email",
    formPhone: "Telefone / WhatsApp",
    formProject: "Tipo de projeto",
    formProjectOptions: ["Automação / integração", "Sistema interno", "Infra / monitoramento", "Consultoria técnica", "Outro"],
    formMessage: "Sobre o projeto",
    formSend: "Enviar mensagem",
    formSending: "Enviando…",
    formSent: "Mensagem enviada. Obrigado!",
    orDirect: "ou direto:",
    footerLine: "Construído à mão. Sem templates, sem firula.",
    rights: "Todos os direitos reservados."
  },
  en: {
    nav: { about: "about", work: "work", cases: "cases", skills: "stack", contact: "contact" },
    statusAvailable: "Open to new projects",
    statusBusy: "On a project · still reply",
    heroIntroLine: "// file: ~/about.md",
    heroGreeting: "Hi, I'm",
    heroSub: "Process automation and system integration. I connect APIs, eliminate manual work and make the tools you already use talk to each other.",
    cta: "Let's talk",
    aboutKicker: "01 — about",
    aboutTitle: "About.",
    aboutBody: [
      "Specialized in process automation and platform integration — n8n, REST APIs, webhooks and anything that makes systems talk without manual intervention.",
      "I work through my own company, serving real-estate and land-development businesses — from lead flow to signed contract.",
      "I believe in pragmatic decisions and honest deadlines. Off-keyboard: backyard BBQ, weekend rides on the FZ25 across SP and MG, and online games when time allows."
    ],
    aboutFacts: [
      ["Based", "São José do Rio Preto, BR — remote"],
      ["Focus", "Process automation and system integrations"],
      ["Tooling", "n8n · REST APIs · Webhooks · Clicksign · WhatsApp API"],
      ["Studying", "AWS Certified Cloud Practitioner (CLF-C02)"],
      ["Availability", "One-off projects and ongoing partnerships"]
    ],
    workKicker: "02 — work",
    workTitle: "Work.",
    workItems: [
      { year: "Now", role: "Automation & Integrations", org: "Real estate · land development", body: "Automations on n8n, CRM pipelines on Notion and integrations with Clicksign (v3), Meta WhatsApp Cloud API and Chatwoot 4.11 covering leads, contracts and client onboarding." },
      { year: "Now", role: "Infrastructure & monitoring", org: "Own and client environments", body: "Virtualization on Proxmox with LVM-Thin, Zabbix 7.4 monitoring (Sophos templates) over SNMPv3, and Linux server operation for production environments." },
      { year: "Recent", role: "Independent developer", org: "JRibas", body: "Bespoke automation for real-estate and land development: contract automation, document validation, operational dashboards and cross-platform integrations." },
      // { year: "Before", role: "Web & Systems development", org: "Own projects and partnerships", body: "Early sites, systems and integrations that became the foundation of what I do today — front-end to infrastructure, always close to the client's problem." }
    ],
    workNote: "* I can discuss specific projects under NDA — just ask by email.",
    clientsKicker: "clients",
    clientsLead: "Partners and companies I work with — logos shown with authorization.",
    clients: [
      { name: "Eggs", subtitle: "Real Estate", logo: "" },
      { name: "Abovyan", subtitle: "Holdings", logo: "" },
      { name: "Mangaba", subtitle: "Urbanism", logo: "" }
    ],
    casesKicker: "cases",
    casesTitle: "Cases.",
    casesLead: "Selected projects. More detail coming soon — some under NDA.",
    cases: [
      {
        title: "[Fill in: case title]",
        client: "[Client]",
        year: "[2025]",
        problem: "[What was the problem before the project?]",
        stack: ["[n8n]", "[Clicksign]", "[WhatsApp API]"],
        result: "[What was the measurable result? Ex: X% time reduction, Y contracts/month, Z errors eliminated.]"
      },
      {
        title: "[Fill in: case title]",
        client: "[Client]",
        year: "[2025]",
        problem: "[What was the problem before the project?]",
        stack: ["[Stack]", "[Stack]"],
        result: "[Result]"
      },
      {
        title: "[Fill in: case title]",
        client: "[Client]",
        year: "[2024]",
        problem: "[What was the problem before the project?]",
        stack: ["[Stack]", "[Stack]"],
        result: "[Result]"
      }
    ],
    casesEmptyLabel: "// draft — to fill",
    skillsKicker: "03 — stack",
    skillsTitle: "Stack.",
    skillsLead: "Tools I use every day and ship to production.",
    skillsGroups: [
      { label: "Automation & integrations", items: ["n8n", "Clicksign API v3", "WhatsApp Cloud API", "Chatwoot 4.11", "Notion API", "Webhooks"] },
      { label: "Development", items: ["C#", ".NET Core", "TypeScript", "Angular", "PostgreSQL", "REST APIs"] },
      { label: "Infra & monitoring", items: ["Proxmox", "LVM-Thin", "Zabbix 7.4", "SNMPv3", "Sophos", "Linux", "Git"] },
      { label: "AI & tooling", items: ["Claude Code", "GitHub Copilot", "Gemini API", "Google AI Studio", "NotebookLM"] },
      // { label: "Studying", items: ["AWS CLF-C02"] }
    ],
    contactKicker: "04 — contact",
    contactTitle: "Let's work together.",
    contactLead: "Tell me what you need and the timeline. I reply within 1 business day.",
    formName: "Name",
    formEmail: "Email",
    formPhone: "Phone / WhatsApp",
    formProject: "Project type",
    formProjectOptions: ["Automation / integration", "Internal system", "Infra / monitoring", "Technical consulting", "Other"],
    formMessage: "About the project",
    formSend: "Send message",
    formSending: "Sending…",
    formSent: "Message sent. Thank you!",
    orDirect: "or direct:",
    footerLine: "Hand-built. No templates, no fluff.",
    rights: "All rights reserved."
  }
};

// ────────────────────────────────────────────────────────────────
// HOOKS
// ────────────────────────────────────────────────────────────────
function useSystemDark() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setDark(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return dark;
}

function useReveal(disabled) {
  useEffect(() => {
    if (disabled) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [disabled]);
}

function useTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useTypewriter(text, speed = 38, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) { setOut(text); return; }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

// ────────────────────────────────────────────────────────────────
// THEME RESOLVER
// ────────────────────────────────────────────────────────────────
function resolveDark(mode, sysDark) {
  if (mode === "light") return false;
  if (mode === "dark") return true;
  return sysDark;
}

// ────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ────────────────────────────────────────────────────────────────
function StatusDot({ available, label }) {
  return (
    <span className="status">
      <span className={"dot " + (available ? "dot-on" : "dot-busy")} />
      <span>{label}</span>
    </span>
  );
}

function Nav({ copy, dark, onToggleTheme, themeMode, lang, onLangSwap, onJump, showCases }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);
  const jump = (id) => { setOpen(false); onJump(id); };
  return (
    <header className={"nav " + (scrolled ? "nav-scrolled" : "")}>
      <div className="nav-inner">
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); jump("top"); }}>
          <span className="brand-bracket">[</span>
          <span className="brand-name">jribas</span>
          <span className="brand-bracket">]</span>
          <span className="brand-cursor" />
        </a>
        <nav className="nav-links">
          <a href="#about"   onClick={(e) => { e.preventDefault(); jump("about"); }}>{copy.nav.about}</a>
          <a href="#work"    onClick={(e) => { e.preventDefault(); jump("work"); }}>{copy.nav.work}</a>
          {showCases ? <a href="#cases" onClick={(e) => { e.preventDefault(); jump("cases"); }}>{copy.nav.cases}</a> : null}
          <a href="#skills"  onClick={(e) => { e.preventDefault(); jump("skills"); }}>{copy.nav.skills}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); jump("contact"); }}>{copy.nav.contact}</a>
        </nav>
        <div className="nav-tools">
          <button className="tool" onClick={onLangSwap} title="Language">
            {lang === "pt" ? "PT" : "EN"} <span className="dim">/</span> {lang === "pt" ? "EN" : "PT"}
          </button>
          <button className="tool tool-theme" onClick={onToggleTheme} title={`Theme: ${themeMode}`}>
            {themeMode === "auto" ? "AUTO" : themeMode === "dark" ? "DARK" : "LIGHT"}
            <span className={"theme-glyph " + (dark ? "theme-glyph-dark" : "theme-glyph-light")} />
          </button>
          <button
            className={"tool tool-menu " + (open ? "is-open" : "")}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="burger" aria-hidden><i /><i /><i /></span>
          </button>
        </div>
      </div>
      <div className={"nav-sheet " + (open ? "is-open" : "")} onClick={() => setOpen(false)}>
        <nav className="nav-sheet-inner" onClick={(e) => e.stopPropagation()}>
          <button className="sheet-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
          <a href="#about"   onClick={(e) => { e.preventDefault(); jump("about"); }}><span className="sk">01</span>{copy.nav.about}</a>
          <a href="#work"    onClick={(e) => { e.preventDefault(); jump("work"); }}><span className="sk">02</span>{copy.nav.work}</a>
          {showCases ? <a href="#cases" onClick={(e) => { e.preventDefault(); jump("cases"); }}><span className="sk">03</span>{copy.nav.cases}</a> : null}
          <a href="#skills"  onClick={(e) => { e.preventDefault(); jump("skills"); }}><span className="sk">{showCases ? "04" : "03"}</span>{copy.nav.skills}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); jump("contact"); }}><span className="sk">{showCases ? "05" : "04"}</span>{copy.nav.contact}</a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ copy, name, role, tagline, email, available, time }) {
  const greet = useTypewriter(copy.heroGreeting + " ", 32);
  const tName = useTypewriter(name, 60, greet.length === (copy.heroGreeting + " ").length);
  const isoTime = time.toTimeString().slice(0, 8);
  const date = time.toISOString().slice(0, 10);

  return (
    <section className="hero" id="top">
      <div className="hero-meta">
        <span className="meta-k">$</span><span className="meta-v">whoami</span>
        <span className="meta-out">{copy.heroIntroLine}</span>
        <span className="meta-k">date</span><span className="meta-v">{date}T{isoTime}</span>
        <span className="meta-k">role</span><span className="meta-v">{role}</span>
        <span className="meta-k">contact</span><span className="meta-v">{email}</span>
      </div>

      <h1 className="hero-title">
        <span className="hero-line-1">{greet}</span>
        <span className="hero-line-2">{tName}<span className="caret" aria-hidden>█</span>.</span>
      </h1>

      <p className="hero-sub" data-reveal>{copy.heroSub}</p>
      <p className="hero-tagline" data-reveal>"{tagline}"</p>

      <div className="hero-actions" data-reveal>
        <a className="btn btn-primary" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact").scrollIntoView({ behavior: "smooth", block: "start" }); }}>
          <span>{copy.cta}</span>
          <span className="btn-arrow">→</span>
        </a>
        <StatusDot available={available} label={available ? copy.statusAvailable : copy.statusBusy} />
      </div>

      <div className="hero-rail" aria-hidden>
        <span className="rail-tick">001</span>
        <span className="rail-tick">002</span>
        <span className="rail-tick">003</span>
        <span className="rail-tick">004</span>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title }) {
  return (
    <div className="sec-head" data-reveal>
      <span className="sec-kicker">{kicker}</span>
      <h2 className="sec-title">{title}</h2>
      <span className="sec-rule" aria-hidden />
    </div>
  );
}

function About({ copy, location }) {
  return (
    <section id="about" className="sec sec-about">
      <SectionHeader kicker={copy.aboutKicker} title={copy.aboutTitle} />
      <div className="about-grid">
        <div className="about-body">
          {copy.aboutBody.map((p, i) => (
            <p key={i} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>{p}</p>
          ))}
        </div>
        <div className="about-side">
          <figure className="brand-card" data-reveal>
            <div className="brand-card-head">
              <span className="bc-tag">// brand</span>
              <span className="bc-dots" aria-hidden><i /><i /><i /></span>
            </div>
            <div className="brand-card-img">
              <img src="images/perfil-jordi.png" alt="Jordi Ribas" />
              <span className="bc-scan" aria-hidden />
            </div>
            <figcaption className="brand-card-foot">
              <span className="bc-k">id</span>
              <span className="bc-v">jribas.system</span>
            </figcaption>
          </figure>
          <dl className="facts">
            {copy.aboutFacts.map(([k, v], i) => (
              <div className="fact" key={i}>
                <dt>{k}</dt>
                <dd>{i === 0 ? v.replace("Brasil", location).replace("Brazil", location) : v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Work({ copy }) {
  return (
    <section id="work" className="sec sec-work">
      <SectionHeader kicker={copy.workKicker} title={copy.workTitle} />
      <ol className="timeline">
        {copy.workItems.map((it, i) => (
          <li className="tl-item" key={i} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="tl-year">{it.year}</div>
            <div className="tl-dot" aria-hidden />
            <div className="tl-card">
              <div className="tl-head">
                <span className="tl-role">{it.role}</span>
                <span className="tl-sep">@</span>
                <span className="tl-org">{it.org}</span>
              </div>
              <p className="tl-body">{it.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="tl-note">{copy.workNote}</p>
    </section>
  );
}

function Skills({ copy }) {
  const allItems = useMemo(
    () => copy.skillsGroups.flatMap((g) => g.items),
    [copy.skillsGroups]
  );
  return (
    <section id="skills" className="sec sec-skills">
      <SectionHeader kicker={copy.skillsKicker} title={copy.skillsTitle} />
      <p className="skills-lead" data-reveal>{copy.skillsLead}</p>

      <div className="skills-grid">
        {copy.skillsGroups.map((g, i) => (
          <div className="skills-group" key={i} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="sg-label">
              <span className="sg-num">0{i + 1}</span>
              <span>{g.label}</span>
            </div>
            <ul className="sg-list">
              {g.items.map((it) => (
                <li key={it} className="chip"><span>{it}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...allItems, ...allItems, ...allItems].map((it, i) => (
            <span className="marquee-item" key={i}>
              <span>{it}</span><span className="marquee-sep">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients({ copy, show }) {
  const list = copy.clients || [];
  if (!show || !list.length) return null;
  return (
    <section id="clients" className="clients" aria-label={copy.clientsKicker}>
      <div className="clients-inner">
        <div className="clients-head">
          <span className="clients-kicker">// {copy.clientsKicker}</span>
          <span className="clients-rule" aria-hidden />
        </div>
        <ul className="clients-grid">
          {list.map((c, i) => (
            <li className="client" key={i} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              {c.logo ? (
                <img className="client-logo" src={c.logo} alt={c.name} />
              ) : (
                <span className="client-mono" aria-hidden>
                  {c.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                </span>
              )}
              <div className="client-meta">
                <div className="client-name">{c.name}</div>
                {c.subtitle ? <div className="client-sub">{c.subtitle}</div> : null}
              </div>
            </li>
          ))}
        </ul>
        <p className="clients-note">{copy.clientsLead}</p>
      </div>
    </section>
  );
}

function Cases({ copy, show }) {
  const list = copy.cases || [];
  if (!show || !list.length) return null;
  return (
    <section id="cases" className="sec sec-cases">
      <SectionHeader kicker={copy.casesKicker} title={copy.casesTitle} />
      <p className="cases-lead" data-reveal>{copy.casesLead}</p>

      <ol className="cases-grid">
        {list.map((c, i) => {
          const isDraft = (c.title || "").includes("[");
          return (
            <li
              className={"case-card " + (isDraft ? "case-draft" : "")}
              key={i}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="case-head">
                <span className="case-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="case-year">{c.year}</span>
                {isDraft ? <span className="case-status">{copy.casesEmptyLabel}</span> : null}
              </div>
              <h3 className="case-title">{c.title}</h3>
              <div className="case-client">@ {c.client}</div>
              <dl className="case-rows">
                <div className="case-row">
                  <dt>{copy.language === "en" ? "Problem" : "Problema"}</dt>
                  <dd>{c.problem}</dd>
                </div>
                <div className="case-row">
                  <dt>Stack</dt>
                  <dd>
                    <ul className="case-stack">
                      {c.stack.map((s, j) => <li key={j}>{s}</li>)}
                    </ul>
                  </dd>
                </div>
                <div className="case-row">
                  <dt>{copy.language === "en" ? "Result" : "Resultado"}</dt>
                  <dd className="case-result">{c.result}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <button type="button" className="copy-btn" onClick={doCopy} aria-label="Copy email">
      <span className="copy-val">{email}</span>
      <span className={"copy-state " + (copied ? "is-copied" : "")}>
        {copied ? "copiado ✓" : "copy"}
      </span>
    </button>
  );
}

// ────────────────────────────────────────────────────────────────
// WEBHOOK CONFIG
// ────────────────────────────────────────────────────────────────
const WEBHOOK_TOKEN = "JRBQ8TF5LAMXCMJHHFQD6AIH28VPSK3Q9AK0O4U1Z0XHX6VO9Z2AQYBZEP42BLWL";

const COUNTRY_CODES = [
  { code: "BR", dial: "+55",  label: "🇧🇷 +55" },
  { code: "PT", dial: "+351", label: "🇵🇹 +351" },
  { code: "US", dial: "+1",   label: "🇺🇸 +1" },
  { code: "AR", dial: "+54",  label: "🇦🇷 +54" },
  { code: "UY", dial: "+598", label: "🇺🇾 +598" },
  { code: "CL", dial: "+56",  label: "🇨🇱 +56" },
  { code: "CO", dial: "+57",  label: "🇨🇴 +57" },
  { code: "MX", dial: "+52",  label: "🇲🇽 +52" },
  { code: "ES", dial: "+34",  label: "🇪🇸 +34" },
  { code: "GB", dial: "+44",  label: "🇬🇧 +44" },
  { code: "DE", dial: "+49",  label: "🇩🇪 +49" },
  { code: "FR", dial: "+33",  label: "🇫🇷 +33" },
  { code: "IT", dial: "+39",  label: "🇮🇹 +39" },
  { code: "AU", dial: "+61",  label: "🇦🇺 +61" },
];

function Contact({ copy, email, linkedin, webhook, cvUrl, lang }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", phoneDial: "+55", project: copy.formProjectOptions[0], message: "" });
  const [state, setState] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, message: false });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const MSG_MIN = 5;
  const isEn = lang === "en";
  const errors = {
    name:    !form.name.trim()
               ? (isEn ? "Required" : "Obrigatório") : "",
    email:   !/\S+@\S+\.\S+/.test(form.email)
               ? (isEn ? "Invalid email" : "Email inválido") : "",
    phone:   form.phone.trim() && form.phone.replace(/\D/g, "").length < 6
               ? (isEn ? "Invalid phone number" : "Número inválido") : "",
    message: form.message.trim().length < MSG_MIN
               ? (isEn
                   ? `Minimum ${MSG_MIN} characters (${form.message.trim().length}/${MSG_MIN})`
                   : `Mínimo ${MSG_MIN} caracteres (${form.message.trim().length}/${MSG_MIN})`)
               : "",
  };
  const valid = !errors.name && !errors.email && !errors.phone && !errors.message;

  const submit = async (e) => {
    e.preventDefault();
    if (state === "sending") return;
    if (!valid) {
      setTouched({ name: true, email: true, phone: true, message: true });
      return;
    }
    setState("sending");
    setErrorMsg("");
    try {
      if (webhook) {
        const res = await fetch(webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Webhook-Token": WEBHOOK_TOKEN,
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() ? `${form.phoneDial} ${form.phone.trim()}` : "",
            project: form.project,
            message: form.message.trim(),
            source: "jribas.com.br",
            lang,
            ts: new Date().toISOString()
          })
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        setState("sent");
        setForm({ name: "", email: "", phone: "", phoneDial: "+55", project: copy.formProjectOptions[0], message: "" });
        setTouched({ name: false, email: false, phone: false, message: false });
        setTimeout(() => setState("idle"), 4000);
      } else {
        const subject = encodeURIComponent(`[${form.project}] ${form.name}`);
        const body = encodeURIComponent(
          `${form.message}\n\n—\n${form.name}\n${form.email}${form.phone.trim() ? `\n${form.phoneDial} ${form.phone.trim()}` : ""}`
        );
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        setState("sent");
      }
    } catch (err) {
      setState("error");
      setErrorMsg(String(err.message || err));
    }
  };

  useEffect(() => {
    setForm((f) => ({ ...f, project: copy.formProjectOptions[0] }));
  }, [copy]);

  return (
    <section id="contact" className="sec sec-contact">
      <SectionHeader kicker={copy.contactKicker} title={copy.contactTitle} />
      <p className="contact-lead" data-reveal>{copy.contactLead}</p>

      <div className="contact-grid">
        <form className="form" onSubmit={submit} data-reveal>
          <label className="field">
            <span className="field-lbl">{copy.formName}</span>
            <input
              className={"field-in" + (touched.name && errors.name ? " is-error" : "")}
              value={form.name}
              onChange={set("name")}
              onBlur={touch("name")}
              placeholder=""
              autoComplete="name"
            />
            {touched.name && errors.name ? <span className="field-err">{errors.name}</span> : null}
          </label>
          <label className="field">
            <span className="field-lbl">{copy.formEmail}</span>
            <input
              className={"field-in" + (touched.email && errors.email ? " is-error" : "")}
              type="email"
              value={form.email}
              onChange={set("email")}
              onBlur={touch("email")}
              placeholder=""
              autoComplete="email"
            />
            {touched.email && errors.email ? <span className="field-err">{errors.email}</span> : null}
          </label>
          <div className="field">
            <span className="field-lbl">{copy.formPhone}</span>
            <div className="phone-field">
              <select
                className="field-in phone-ddi"
                value={form.phoneDial}
                onChange={(e) => setForm((f) => ({ ...f, phoneDial: e.target.value }))}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.dial}>{c.label}</option>
                ))}
              </select>
              <input
                className={"field-in phone-num" + (touched.phone && errors.phone ? " is-error" : "")}
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                onBlur={touch("phone")}
                placeholder="(11) 99999-9999"
                autoComplete="tel-national"
              />
            </div>
            {touched.phone && errors.phone ? <span className="field-err">{errors.phone}</span> : null}
          </div>
          <label className="field">
            <span className="field-lbl">{copy.formProject}</span>
            <div className="seg">
              {copy.formProjectOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  className={"seg-opt " + (form.project === opt ? "seg-on" : "")}
                  onClick={() => setForm((f) => ({ ...f, project: opt }))}
                >
                  {opt}
                </button>
              ))}
            </div>
          </label>
          <div className="field">
            <div className="field-lbl-row">
              <span className="field-lbl">{copy.formMessage}</span>
              <span className={"field-count" + (form.message.trim().length >= MSG_MIN ? " is-ok" : "")}>
                {form.message.trim().length}/{MSG_MIN}
              </span>
            </div>
            <textarea
              className={"field-in field-ta" + (touched.message && errors.message ? " is-error" : "")}
              rows={5}
              value={form.message}
              onChange={set("message")}
              onBlur={touch("message")}
            />
            {touched.message && errors.message ? <span className="field-err">{errors.message}</span> : null}
          </div>

          <div className="form-actions">
            <button type="submit" className={"btn btn-primary " + (!valid ? "btn-dis" : "")} disabled={!valid || state === "sending"}>
              <span>
                {state === "idle"    && copy.formSend}
                {state === "sending" && copy.formSending}
                {state === "sent"    && copy.formSent}
                {state === "error"   && (lang === "en" ? "Try again" : "Tente novamente")}
              </span>
              <span className="btn-arrow">{state === "sent" ? "✓" : state === "error" ? "!" : "→"}</span>
            </button>
            {cvUrl ? (
              <a className="btn btn-ghost" href={cvUrl} target="_blank" rel="noreferrer">
                <span>{lang === "en" ? "Download CV" : "Baixar CV"}</span>
                <span className="btn-arrow">↓</span>
              </a>
            ) : null}
          </div>
          {state === "error" ? <div className="form-err">{errorMsg}</div> : null}
        </form>

        <aside className="contact-aside" data-reveal>
          <div className="aside-line"><span className="aside-k">{copy.orDirect}</span></div>
          <div className="aside-link aside-link-static">
            <span className="aside-tag">email</span>
            <CopyEmail email={email} />
          </div>
          {linkedin ? (
            <a className="aside-link" href={linkedin} target="_blank" rel="noreferrer">
              <span className="aside-tag">linkedin</span>
              <span className="aside-val">{linkedin.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
              <span className="aside-arrow">↗</span>
            </a>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

function Footer({ copy, name, time }) {
  const yr = time.getFullYear();
  return (
    <footer className="footer">
      <div className="footer-row">
        <span>© {yr} {name}.</span>
        <span className="footer-mid">{copy.footerLine}</span>
        <span className="footer-tick">jribas.com.br</span>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────
// APP
// ────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const sysDark = useSystemDark();
  const dark = resolveDark(t.themeMode, sysDark);
  const time = useTime();
  const lang = t.language === "en" ? "en" : "pt";
  const copy = COPY[lang];

  const toggleTheme = () => {
    const order = ["auto", "light", "dark"];
    const next = order[(order.indexOf(t.themeMode) + 1) % order.length];
    setTweak("themeMode", next);
  };

  const onJump = useCallback((id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.theme = dark ? "dark" : "light";
    r.dataset.density = t.density;
    r.dataset.gridlines = t.gridLines ? "on" : "off";
    r.dataset.display = t.displayFont;
    r.dataset.anim = t.animationLevel;
    r.style.setProperty("--accent-h", String(t.accentHue));
  }, [dark, t.density, t.gridLines, t.displayFont, t.animationLevel, t.accentHue]);

  useReveal(t.animationLevel === "off");

  const copyWithLang = useMemo(() => ({ ...copy, language: lang }), [copy, lang]);

  return (
    <div className="page">
      <div className="grid-overlay" aria-hidden />
      <Nav
        copy={copyWithLang}
        dark={dark}
        themeMode={t.themeMode}
        onToggleTheme={toggleTheme}
        lang={lang}
        onLangSwap={() => setTweak("language", lang === "pt" ? "en" : "pt")}
        onJump={onJump}
        showCases={!!t.showCases}
      />

      <main>
        <Hero
          copy={copyWithLang}
          name={t.name}
          role={t.role}
          tagline={t.tagline}
          email={t.email}
          available={!!t.available}
          time={time}
        />
        <Clients copy={copyWithLang} show={!!t.showClients} />
        <About copy={copyWithLang} location={t.location} />
        <Work copy={copyWithLang} />
        <Cases copy={copyWithLang} show={!!t.showCases} />
        <Skills copy={copyWithLang} />
        <Contact
          copy={copyWithLang}
          email={t.email}
          linkedin={t.linkedin}
          webhook={t.formWebhook}
          cvUrl={t.cvUrl}
          lang={lang}
        />
      </main>

      <Footer copy={copyWithLang} name={t.name} time={time} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Status & visibilidade" />
        <TweakToggle label="Aceitando projetos"  value={!!t.available}   onChange={(v) => setTweak("available", v)} />
        <TweakToggle label="Mostrar clientes"    value={!!t.showClients} onChange={(v) => setTweak("showClients", v)} />
        <TweakToggle label="Mostrar cases"       value={!!t.showCases}   onChange={(v) => setTweak("showCases", v)} />

        <TweakSection label="Identity" />
        <TweakText  label="Name"     value={t.name}     onChange={(v) => setTweak("name", v)} />
        <TweakText  label="Role"     value={t.role}     onChange={(v) => setTweak("role", v)} />
        <TweakText  label="Tagline"  value={t.tagline}  onChange={(v) => setTweak("tagline", v)} />
        <TweakText  label="Location" value={t.location} onChange={(v) => setTweak("location", v)} />
        <TweakText  label="Email"    value={t.email}    onChange={(v) => setTweak("email", v)} />
        <TweakText  label="LinkedIn" value={t.linkedin} onChange={(v) => setTweak("linkedin", v)} />

        <TweakSection label="Form & CV" />
        <TweakText  label="Webhook n8n" value={t.formWebhook} onChange={(v) => setTweak("formWebhook", v)} />
        <TweakText  label="CV URL (PDF)" value={t.cvUrl}      onChange={(v) => setTweak("cvUrl", v)} />

        <TweakSection label="Theme" />
        <TweakRadio label="Mode"       value={t.themeMode} options={["auto", "light", "dark"]} onChange={(v) => setTweak("themeMode", v)} />
        <TweakSlider label="Accent hue" value={t.accentHue} min={0} max={360} step={1} unit="°" onChange={(v) => setTweak("accentHue", v)} />
        <TweakToggle label="Grid lines" value={t.gridLines} onChange={(v) => setTweak("gridLines", v)} />

        <TweakSection label="Type" />
        <TweakRadio label="Display"  value={t.displayFont} options={["mono", "display"]} onChange={(v) => setTweak("displayFont", v)} />
        <TweakRadio label="Density"  value={t.density} options={["compact", "regular", "comfy"]} onChange={(v) => setTweak("density", v)} />

        <TweakSection label="Motion & language" />
        <TweakRadio label="Animation" value={t.animationLevel} options={["off", "moderate", "lively"]} onChange={(v) => setTweak("animationLevel", v)} />
        <TweakRadio label="Language"  value={t.language} options={["pt", "en"]} onChange={(v) => setTweak("language", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
