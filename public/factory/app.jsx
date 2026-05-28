// Factory of Culture — app shell + router.

const ROUTES = [
  { key: "cover",       catalog: "FC·001", label: "Almanac",          right: "Cover" },
  { key: "archetype",   catalog: "FC·000", label: "Archetypes",       right: "Entry" },
  { key: "library",     catalog: "FC·010", label: "Architecture Library", right: "05 patterns" },
  { key: "compose",     catalog: "FC·010", label: "Compose · New",    right: "Draft" },
  { key: "pattern",     catalog: "FC·020", label: "Pattern Detail",   right: "PC-031" },
  { key: "studio",      catalog: "FC·030", label: "Studio · Customize", right: "Draft" },
  { key: "kernel",      catalog: "FC·040", label: "Kernel · Live",    right: "Running" },
  { key: "marketplace", catalog: "FC·050", label: "Marketplace",      right: "14 editions" },
  { key: "lineage",     catalog: "FC·060", label: "Lineage",          right: "10 cities" }
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#d4a574",
  "activeTemplate": "PC",
  "showNoise": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Hash route
  const [route, setRoute] = React.useState(() => {
    const h = (window.location.hash || "").replace("#","");
    return ROUTES.find(r => r.key === h) ? h : "archetype";
  });
  const go = (k) => {
    setRoute(k);
    window.location.hash = k;
    window.scrollTo({top:0, behavior:"instant"});
  };

  // Active template (synced with Tweak)
  const setCurrentTemplate = (code) => setTweak("activeTemplate", code);
  const currentTemplateCode = t.activeTemplate || "PC";

  // Studio draft state
  const [draft, setDraft] = React.useState(null);

  // Toast on fork / seal
  const [toast, setToast] = React.useState(null);
  const showToast = (text, code) => {
    setToast({ text, code });
    setTimeout(() => setToast(null), 3400);
  };

  const onFork = (tpl) => {
    setDraft(null); // reset so studio re-inits
    setCurrentTemplate(tpl.code);
    showToast("Pattern forked to studio", tpl.catalog);
    setTimeout(() => go("studio"), 220);
  };

  const onSeal = (d, tpl) => {
    showToast("Sealed · ready for the marketplace", tpl.code + "-" + Math.floor(Math.random()*900+100));
    setTimeout(() => go("marketplace"), 320);
  };

  // Accent CSS var
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    // also derive dim
    const hex = t.accent.replace("#","");
    const r = parseInt(hex.substr(0,2),16);
    const g = parseInt(hex.substr(2,2),16);
    const b = parseInt(hex.substr(4,2),16);
    document.documentElement.style.setProperty("--accent-dim", `rgba(${r},${g},${b},0.22)`);
  }, [t.accent]);

  React.useEffect(() => {
    document.body.style.setProperty("--noise-display", t.showNoise ? "block" : "none");
  }, [t.showNoise]);

  const activeRoute = ROUTES.find(r => r.key === route);
  const liveInstance = window.LIVE_INSTANCE;

  return (
    <>
      <div className="shell">
        {/* Sidebar — only shown on non-cover routes for the monumental cover effect */}
        {route !== "cover" && (
          <aside className="sidebar">
            <div className="sidebar-mark" onClick={() => go("cover")} style={{cursor:"pointer"}}>
              <div className="wordmark">Factory<br/>of <span>Culture</span><span style={{color:"var(--accent)"}}>.</span></div>
              <div className="sub">FC · Vol.001 · Edition 2026.01</div>
            </div>

            <div className="nav-section-label">Index</div>
            {ROUTES.map(r => (
              <div
                key={r.key}
                className={"nav-item" + (r.key === route ? " active" : "")}
                onClick={() => go(r.key)}
              >
                <span className="code">{r.catalog}</span>
                <span className="label">{r.label}</span>
                <span className="count">{r.right}</span>
              </div>
            ))}

            <div className="nav-section-label">Active Edition</div>
            <div style={{padding:"10px 0", borderBottom:"1px dashed var(--rule)"}}>
              <div className="code-tag accent">{liveInstance.id} · {liveInstance.edition.split(" ")[0]}</div>
              <div style={{fontFamily:"var(--font-display)", fontSize:14, fontWeight:500, marginTop:4}}>
                {liveInstance.name}
              </div>
              <div className="code-tag" style={{marginTop:2}}>{liveInstance.city}</div>
              <div style={{marginTop:8, display:"flex", gap:8, alignItems:"center"}}>
                <Bar pct={liveInstance.attendanceRate} width={60}/>
                <span className="code-tag accent">{(liveInstance.attendanceRate*100).toFixed(0)}%</span>
              </div>
            </div>

            <div className="sidebar-foot">
              <span>Kernel</span>
              <span style={{color:"var(--accent)"}}>○ Online</span>
            </div>
          </aside>
        )}

        <main className="canvas" style={route === "cover" ? {gridColumn:"1 / -1"} : null}>
          {route !== "cover" && (
            <header className="canvas-header">
              <div className="crumbs">
                <span>Factory of Culture</span>
                <span className="sep">/</span>
                <span>{activeRoute.catalog}</span>
                <span className="sep">/</span>
                <span className="head">{activeRoute.label}</span>
              </div>
              <div className="header-meta">
                <span className="pulse">Kernel · live</span>
                <span>·</span>
                <span>Editor · Lou C.</span>
                <span>·</span>
                <span>{new Date().toISOString().slice(0,10)}</span>
              </div>
            </header>
          )}

          <div className="canvas-body">
            {route === "cover"       && <AlmanacCover go={go} currentTemplate={currentTemplateCode} instance={liveInstance} />}
            {route === "archetype"   && <ArchetypeScreen go={go} setCurrentTemplate={setCurrentTemplate} />}
            {route === "library"     && <LibraryScreen go={go} setCurrentTemplate={setCurrentTemplate} currentTemplateCode={currentTemplateCode} />}
            {route === "compose"     && <ComposeScreen go={go} />}
            {route === "pattern"     && <PatternScreen go={go} currentTemplateCode={currentTemplateCode} setCurrentTemplate={setCurrentTemplate} onFork={onFork} />}
            {route === "studio"      && <StudioScreen go={go} currentTemplateCode={currentTemplateCode} draft={draft} setDraft={setDraft} onSeal={onSeal} />}
            {route === "kernel"      && <KernelScreen go={go} />}
            {route === "marketplace" && <MarketplaceScreen go={go} setCurrentTemplate={setCurrentTemplate} />}
            {route === "lineage"     && <LineageScreen go={go} />}
          </div>
        </main>
      </div>

      {toast && (
        <div className="toast">
          <span className="code">{toast.code}</span>
          <span>{toast.text}</span>
        </div>
      )}

      <TweaksPanel>
        <TweakSection label="Surface" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#d4a574","#ebe6da","#b89a8a","#9aa8b8","#a8c8a0","#b8a0c8"]}
          onChange={v => setTweak("accent", v)}
        />
        <TweakToggle
          label="Dotted noise"
          value={t.showNoise}
          onChange={v => setTweak("showNoise", v)}
        />
        <TweakSection label="Active Pattern" />
        <TweakSelect
          label="Template"
          value={t.activeTemplate}
          options={window.TEMPLATES.map(x => ({value: x.code, label: x.catalog + " · " + x.name}))}
          onChange={v => setTweak("activeTemplate", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
