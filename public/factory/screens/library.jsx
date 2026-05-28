// Architecture Library — FC·010. Grid of 7 patterns. Click to open Pattern detail.

function LibraryScreen({ go, setCurrentTemplate, currentTemplateCode }) {
  const activeTemplate = window.TEMPLATES.find(x => x.code === currentTemplateCode) || window.TEMPLATES[0];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>FC·010 / ARCHITECTURE LIBRARY</CodeTag>
          <h2 style={{marginTop:12}}>The library of patterns.</h2>
          <p className="deck">
            Each architecture is an operational pattern — not a template for decoration. Inspect the
            structure. Fork the shape. Run it in your city.
          </p>
        </div>
        <div className="right">
          <div className="big">07</div>
          <div>Pattern families</div>
          <div style={{color:"var(--ink-4)"}}>Curated · Open license</div>
        </div>
      </div>

      <SectionRule num="§01" label="Pattern Index" right="Sorted · By family code" />
      <ActiveChallengeStrip template={activeTemplate} />

      <div className="tpl-grid">
        {window.TEMPLATES.map(t => {
          const challenge = PrimaryChallenge({ template: t });
          return (
          <div
            key={t.code}
            className={"tpl-card" + (t.code === currentTemplateCode ? " active" : "")}
            onClick={() => { setCurrentTemplate(t.code); go("pattern"); }}
          >
            <div className="head">
              <span className="code">{t.catalog} · {t.code}-SERIES</span>
              <span className="family">{t.family}</span>
            </div>
            <div>
              <div className="numeral">
                {t.glyph.replace(".","")}<span className="dot">.</span>
              </div>
              <div className="name">{t.name}</div>
              <p className="thesis">{t.thesis}</p>
            </div>
            <ChallengeSignal challenge={challenge} compact />
            <div className="foot">
              <span>{t.sealed.length} sealed</span>
              <span>·</span>
              <span>{t.sealed.reduce((a,b)=>a+b.forks,0)} forks</span>
              <span className="right">Inspect →</span>
            </div>
          </div>
        );})}
        {/* Filler "proposed" card to keep grid clean at 8 cells */}
        <div className="tpl-card proposed">
          <div className="head">
            <span className="code">FC·018 · DRAFT</span>
            <span className="family">PATTERN IN REVIEW</span>
          </div>
          <div>
            <div className="numeral">
              08<span className="dot">.</span>
            </div>
            <div className="name">Compose a Pattern</div>
            <p className="thesis">
              Start with the repeated action, then make proof, validation, reward, and
              forkability legible before the pattern is sealed.
            </p>
            <ComposeQuestions />
          </div>
          <div className="foot">
            <span>Draft aperture</span>
            <span style={{textAlign:"right"}}>Compose →</span>
          </div>
        </div>
      </div>

      <SectionRule num="§02" label="How to read a pattern" right="Reading order · 9 keys" />
      <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24, marginTop:8}}>
        {[
          ["Thesis", "What the community is and why it recurs."],
          ["Place logic", "Where the pattern anchors physically."],
          ["Cadence", "How often the ritual runs and for how long."],
          ["Roles", "The shapes a member can hold."],
          ["Challenge spine", "What the community repeatedly does together."],
          ["Proof flow", "Commitment, attendance, proof, validation, reward, trace."],
          ["Treasury", "How reward and reserve move after validation."],
          ["Governance", "Who decides what, and how it changes."],
          ["Onboarding", "How a new member becomes a witness, then a member."]
        ].map(([k,v]) => (
          <div key={k} style={{borderTop:"1px solid var(--rule)", paddingTop:14}}>
            <div style={{fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--accent)", marginBottom:6}}>{k}</div>
            <div className="serif-em" style={{fontSize:14}}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.LibraryScreen = LibraryScreen;
