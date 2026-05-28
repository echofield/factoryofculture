// Almanac cover — the entry surface. Inspired by the 365 reference.

function AlmanacCover({ go, currentTemplate, instance }) {
  // Cycle through the 7 template glyphs as a quiet animated index.
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % window.TEMPLATES.length), 2200);
    return () => clearInterval(id);
  }, []);
  const t = window.TEMPLATES[tick];

  return (
    <div className="cover">
      <div className="cover-top">
        <div className="l">Factory of Culture<br/><span style={{color:"var(--ink-4)"}}>FC · VOL.001</span></div>
        <div className="c">An Almanac of<br/>Living Communities</div>
        <div className="r">Edition 2026.01<br/><span style={{color:"var(--ink-4)"}}>Pre-Release Index</span></div>
      </div>

      <div className="cover-center">
        <div className="cover-plate">
          <NumeralPlate
            size="huge"
            glyph={<>{t.glyph.replace(".","")}<span className="dot">.</span></>}
            tl={"FC·001"}
            tr={"PATTERN " + String(tick+1).padStart(2,"0") + "/07"}
            bl={t.family}
            br={t.code + "-SERIES"}
          />
        </div>
        <div className="cover-caption">
          <div className="code">Catalog · FC·001 · The Factory</div>
          <h1>
            Architectures<br/>
            <span className="em">for living communities.</span>
          </h1>
          <p className="deck">
            Seven operational patterns. One kernel. Communities as editions —
            forkable, sealable, accountable. The almanac runs underneath.
          </p>
          <div className="meta">
            <span>07 Patterns</span>
            <span>·</span>
            <span>23 Sealed Editions</span>
            <span>·</span>
            <span>112 Forks Worldwide</span>
          </div>
        </div>
      </div>

      <div className="cover-foot">
        <div className="marks">
          <div className="now">○ Live · {instance.name} · {instance.city}</div>
          <div>Sealed · {instance.edition}</div>
        </div>
        <div style={{textAlign:"center"}}>
          <div>The kernel is running.</div>
          <div style={{color:"var(--ink-4)", marginTop:6}}>
            Commitment → Proof → Validation → Reward → Memory
          </div>
        </div>
        <div className="enter" onClick={() => go("library")}>
          <span>Enter the Library</span>
          <span className="arrow">→</span>
        </div>
      </div>
    </div>
  );
}

window.AlmanacCover = AlmanacCover;
