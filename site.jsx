/* global React, ReactDOM, TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakSelect, TweakText, TweakColor, useTweaks */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ────────────────────────────────────────────────────────────────
// DEFAULTS — editable persistently via Tweaks
// ────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "name": "Jordi Ribas",
  "handle": "jribas",
  "role": "Automação & Integrações",
  "tagline": "Se tem processo manual, tem automação possível.",
  "location": "São José do Rio Preto, SP",
  "email": "jordi@jribas.com.br",
  "linkedin": "https://www.linkedin.com/in/jordiribas/",
  "github": "",
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
    nav: { about: "sobre", work: "trajetória", skills: "stack", contact: "contato" },
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
    nav: { about: "about", work: "work", skills: "stack", contact: "contact" },
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

function Nav({ copy, dark, onToggleTheme, themeMode, lang, onLangSwap, onJump }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"nav " + (scrolled ? "nav-scrolled" : "")}>
      <div className="nav-inner">
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); onJump("top"); }}>
          <span className="brand-bracket">[</span>
          <span className="brand-name">jribas</span>
          <span className="brand-bracket">]</span>
          <span className="brand-cursor" />
        </a>
        <nav className="nav-links">
          <a href="#about"   onClick={(e) => { e.preventDefault(); onJump("about"); }}>{copy.nav.about}</a>
          <a href="#work"    onClick={(e) => { e.preventDefault(); onJump("work"); }}>{copy.nav.work}</a>
          <a href="#skills"  onClick={(e) => { e.preventDefault(); onJump("skills"); }}>{copy.nav.skills}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onJump("contact"); }}>{copy.nav.contact}</a>
        </nav>
        <div className="nav-tools">
          <button className="tool" onClick={onLangSwap} title="Language">
            {lang === "pt" ? "PT" : "EN"} <span className="dim">/</span> {lang === "pt" ? "EN" : "PT"}
          </button>
          <button className="tool tool-theme" onClick={onToggleTheme} title={`Theme: ${themeMode}`}>
            {themeMode === "auto" ? "AUTO" : themeMode === "dark" ? "DARK" : "LIGHT"}
            <span className={"theme-glyph " + (dark ? "theme-glyph-dark" : "theme-glyph-light")} />
          </button>
        </div>
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
              <img src="images/logo.jpg" alt="JRibas logo" />
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

const WEBHOOK_URL = "https://webhook-eggs.ackhub.app/webhook/617c8eae-6e39-464f-a492-70affae971b4-jribas";
const WEBHOOK_TOKEN = "JRBQ8TF5LAMXCMJHHFQD6AIH28VPSK3Q9AK0O4U1Z0XHX6VO9Z2AQYBZEP42BLWL";

const COUNTRY_CODES = [
  { code: "BR", dial: "+55", label: "🇧🇷 +55" },
  { code: "PT", dial: "+351", label: "🇵🇹 +351" },
  { code: "US", dial: "+1",  label: "🇺🇸 +1" },
  { code: "AR", dial: "+54", label: "🇦🇷 +54" },
  { code: "UY", dial: "+598", label: "🇺🇾 +598" },
  { code: "CL", dial: "+56", label: "🇨🇱 +56" },
  { code: "CO", dial: "+57", label: "🇨🇴 +57" },
  { code: "MX", dial: "+52", label: "🇲🇽 +52" },
  { code: "ES", dial: "+34", label: "🇪🇸 +34" },
  { code: "GB", dial: "+44", label: "🇬🇧 +44" },
  { code: "DE", dial: "+49", label: "🇩🇪 +49" },
  { code: "FR", dial: "+33", label: "🇫🇷 +33" },
  { code: "IT", dial: "+39", label: "🇮🇹 +39" },
  { code: "AU", dial: "+61", label: "🇦🇺 +61" },
];

function Contact({ copy, email, linkedin }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", phoneDial: "+55", project: copy.formProjectOptions[0], message: "" });
  const [state, setState] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim().length > 4;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
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
        }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setState("sent");
      setForm({ name: "", email: "", phone: "", phoneDial: "+55", project: copy.formProjectOptions[0], message: "" });
      setTimeout(() => setState("idle"), 4000);
    } catch {
      setState("idle");
      alert("Erro ao enviar. Tente novamente ou use o e-mail direto.");
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
            <input className="field-in" value={form.name} onChange={set("name")} placeholder="" autoComplete="name" />
          </label>
          <label className="field">
            <span className="field-lbl">{copy.formEmail}</span>
            <input className="field-in" type="email" value={form.email} onChange={set("email")} placeholder="" autoComplete="email" />
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
                className="field-in phone-num"
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="(11) 99999-9999"
                autoComplete="tel-national"
              />
            </div>
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
          <label className="field">
            <span className="field-lbl">{copy.formMessage}</span>
            <textarea className="field-in field-ta" rows={5} value={form.message} onChange={set("message")} />
          </label>

          <button type="submit" className={"btn btn-primary " + (!valid ? "btn-dis" : "")} disabled={!valid || state !== "idle"}>
            <span>
              {state === "idle" && copy.formSend}
              {state === "sending" && copy.formSending}
              {state === "sent" && copy.formSent}
            </span>
            <span className="btn-arrow">{state === "sent" ? "✓" : "→"}</span>
          </button>
        </form>

        <aside className="contact-aside" data-reveal>
          <div className="aside-line"><span className="aside-k">{copy.orDirect}</span></div>
          <a className="aside-link" href={`mailto:${email}`}>
            <span className="aside-tag">email</span>
            <span className="aside-val">{email}</span>
            <span className="aside-arrow">↗</span>
          </a>
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

  const available = true;

  return (
    <div className="page">
      <div className="grid-overlay" aria-hidden />
      <Nav
        copy={copy}
        dark={dark}
        themeMode={t.themeMode}
        onToggleTheme={toggleTheme}
        lang={lang}
        onLangSwap={() => setTweak("language", lang === "pt" ? "en" : "pt")}
        onJump={onJump}
      />

      <main>
        <Hero
          copy={copy}
          name={t.name}
          role={t.role}
          tagline={t.tagline}
          email={t.email}
          available={available}
          time={time}
        />
        <About copy={copy} location={t.location} />
        <Work copy={copy} />
        <Skills copy={copy} />
        <Contact copy={copy} email={t.email} linkedin={t.linkedin} />
      </main>

      <Footer copy={copy} name={t.name} time={time} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Identity" />
        <TweakText  label="Name"     value={t.name}     onChange={(v) => setTweak("name", v)} />
        <TweakText  label="Role"     value={t.role}     onChange={(v) => setTweak("role", v)} />
        <TweakText  label="Tagline"  value={t.tagline}  onChange={(v) => setTweak("tagline", v)} />
        <TweakText  label="Location" value={t.location} onChange={(v) => setTweak("location", v)} />
        <TweakText  label="Email"    value={t.email}    onChange={(v) => setTweak("email", v)} />
        <TweakText  label="LinkedIn" value={t.linkedin} onChange={(v) => setTweak("linkedin", v)} />

        <TweakSection label="Theme" />
        <TweakRadio label="Mode"       value={t.themeMode} options={["auto", "light", "dark"]} onChange={(v) => setTweak("themeMode", v)} />
        <TweakSlider label="Accent hue" value={t.accentHue} min={0} max={360} step={1} unit="°" onChange={(v) => setTweak("accentHue", v)} />
        <TweakToggle label="Grid lines" value={t.gridLines} onChange={(v) => setTweak("gridLines", v)} />

        <TweakSection label="Type" />
        <TweakRadio label="Display"  value={t.displayFont} options={["mono", "display"]} onChange={(v) => setTweak("displayFont", v)} />
        <TweakRadio label="Density"  value={t.density} options={["compact", "regular", "comfy"]} onChange={(v) => setTweak("density", v)} />

        <TweakSection label="Motion & language" />
        <TweakRadio label="Animation" value={t.animationLevel} options={["off", "moderate", "lively"]} onChange={(v) => setTweak("animationLevel", v)} />
        <TweakRadio label="Language" value={t.language} options={["pt", "en"]} onChange={(v) => setTweak("language", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
