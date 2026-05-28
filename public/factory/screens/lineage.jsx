// Lineage — FC·060. A constellation/map of where the Supper Club Season pattern has forked.

function LineageScreen({ go }) {
  const L = window.LINEAGE;
  const stageW = 900, stageH = 540;
  // Place root at center-left.
  const rootPos = { x: 0.40, y: 0.45 };
  const pos = id => {
    if (id === "SC") return rootPos;
    const n = L.nodes.find(n => n.id === id);
    return n ? { x: n.x, y: n.y } : rootPos;
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>FC·060 / LINEAGE MAP</CodeTag>
          <h2 style={{marginTop:10}}>The Supper Club has crossed cities.</h2>
          <p className="deck">
            One pattern. Ten forks. Each city adapts the cadence — the long table holds.
            This is the inference layer's reading material.
          </p>
        </div>
        <div style={{display:"flex", gap:10}}>
          <Btn onClick={() => go("pattern")}>← Pattern</Btn>
          <Btn onClick={() => go("marketplace")} arrow>Marketplace</Btn>
        </div>
      </div>

      {/* Stage */}
      <div className="lineage-stage">
        {/* Crosshair / grid */}
        <svg viewBox={`0 0 ${stageW} ${stageH}`} preserveAspectRatio="none">
          {/* faint grid */}
          {[...Array(11)].map((_,i) => (
            <line key={"v"+i} x1={i*stageW/10} y1={0} x2={i*stageW/10} y2={stageH}
              stroke="#1a1a1a" strokeWidth="1" />
          ))}
          {[...Array(7)].map((_,i) => (
            <line key={"h"+i} x1={0} y1={i*stageH/6} x2={stageW} y2={i*stageH/6}
              stroke="#1a1a1a" strokeWidth="1" />
          ))}
          {/* connecting lines: parent → child */}
          {L.nodes.map(n => {
            const a = pos(n.parent);
            const b = pos(n.id);
            return (
              <line
                key={n.id}
                x1={a.x*stageW} y1={a.y*stageH}
                x2={b.x*stageW} y2={b.y*stageH}
                stroke="var(--rule-3)" strokeWidth="1" strokeDasharray="3 4"
              />
            );
          })}
          {/* radial halo on root */}
          <circle cx={rootPos.x*stageW} cy={rootPos.y*stageH} r="40"
            fill="none" stroke="#2a2a2a" strokeWidth="1" />
          <circle cx={rootPos.x*stageW} cy={rootPos.y*stageH} r="80"
            fill="none" stroke="#1f1f1f" strokeWidth="1" />
        </svg>

        {/* Root */}
        <div className="lineage-node root" style={{left:`${rootPos.x*100}%`, top:`${rootPos.y*100}%`}}>
          <div className="dot"></div>
          <div className="lbl" style={{color:"var(--ink)"}}>FC·011 · ROOT</div>
          <div className="city">Supper Club Season</div>
        </div>

        {/* Nodes */}
        {L.nodes.map(n => (
          <div
            key={n.id}
            className="lineage-node"
            style={{left:`${n.x*100}%`, top:`${n.y*100}%`}}
            onClick={() => go("kernel")}
            title={n.name + " · " + n.city}
          >
            <div className="dot" style={{opacity: 0.4 + n.reliability * 0.6}}></div>
            <div className="lbl">{n.id}</div>
            <div className="city">{n.city}</div>
          </div>
        ))}

        {/* corner overlays */}
        <div style={{position:"absolute", top:14, left:18, fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.18em", color:"var(--ink-4)", textTransform:"uppercase"}}>
          FC·011 · SC-SERIES · LINEAGE
        </div>
        <div style={{position:"absolute", top:14, right:18, fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.18em", color:"var(--ink-4)", textTransform:"uppercase"}}>
          {L.nodes.length} editions · 3 generations
        </div>
        <div style={{position:"absolute", bottom:14, left:18, fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.14em", color:"var(--ink-4)", textTransform:"uppercase"}}>
          Node opacity · reliability score
        </div>
        <div style={{position:"absolute", bottom:14, right:18, fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.14em", color:"var(--ink-4)", textTransform:"uppercase"}}>
          Click a node to open its kernel
        </div>
      </div>

      {/* Aggregate stats */}
      <div className="lineage-stats">
        <div className="kpi">
          <div className="key">Editions worldwide</div>
          <div className="val">{L.nodes.length}</div>
          <div className="sub">Across 10 cities · 3 forking generations</div>
        </div>
        <div className="kpi">
          <div className="key">Mean reliability</div>
          <div className="val">{(L.nodes.reduce((a,b)=>a+b.reliability,0)/L.nodes.length*100).toFixed(0)}%</div>
          <div className="sub">Higher in long-tenured editions</div>
        </div>
        <div className="kpi">
          <div className="key">Total downstream forks</div>
          <div className="val">{L.nodes.reduce((a,b)=>a+b.forks,0)}</div>
          <div className="sub">Editions of editions · second-order</div>
        </div>
        <div className="kpi">
          <div className="key">Oldest fork</div>
          <div className="val" style={{fontSize:22}}>SC-014</div>
          <div className="sub">Paris · Sealed 2024 · still running</div>
        </div>
      </div>

      <SectionRule num="§·" label="Inference Signal" right="What the kernel is learning" />
      <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:24}}>
        {[
          {code:"I·01", note:"Weekly cadence with rotating Scribe sustains attendance 23% longer than monthly."},
          {code:"I·02", note:"Editions that bind to a single venue (vs. distributed) show 18% higher reliability."},
          {code:"I·03", note:"Reward weight > 70% correlates with member churn after season 2 — extractive."},
          {code:"I·04", note:"Sponsorship onboarding outperforms open invite by 31% in proof completion."}
        ].map(s => (
          <div key={s.code} style={{borderTop:"1px solid var(--rule)", paddingTop:14}}>
            <div className="code-tag accent" style={{marginBottom:6}}>{s.code} · OBSERVED</div>
            <div className="serif-em" style={{fontSize:15, lineHeight:1.5}}>{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.LineageScreen = LineageScreen;
