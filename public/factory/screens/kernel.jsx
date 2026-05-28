// Kernel — FC·040. Live operating dashboard for a sealed instance (Sunday Suppers · Paris).

function KernelScreen({ go }) {
  const i = window.LIVE_INSTANCE;
  const t = window.TEMPLATES.find(x => x.code === i.templateCode);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>FC·040 / KERNEL · LIVE</CodeTag>
          <div style={{display:"flex", gap:14, alignItems:"baseline", marginTop:8}}>
            <span className="code-tag accent">{i.id}</span>
            <span className="code-tag">{i.edition}</span>
            <span style={{fontFamily:"var(--font-mono)", fontSize:11, color:"var(--ink-3)", letterSpacing:"0.08em"}}>
              ○ Running · Week {i.weeksRun} of {i.weeksRun+i.weeksLeft}
            </span>
          </div>
          <h2 style={{marginTop:12}}>{i.name}</h2>
          <p className="deck">{i.thesis}</p>
          <div style={{marginTop:8, fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.12em", color:"var(--ink-3)", textTransform:"uppercase"}}>
            {i.city} · {i.place}
          </div>
        </div>
        <div style={{display:"flex", gap:10}}>
          <Btn onClick={() => go("pattern")}>← Pattern {t.catalog}</Btn>
          <Btn onClick={() => go("marketplace")} arrow>Publish edition</Btn>
        </div>
      </div>

      {/* KPI strip */}
      <div className="kernel-strip">
        <div className="kpi">
          <div className="key">Attendance · Season</div>
          <div className="val">{(i.attendanceRate*100).toFixed(0)}%</div>
          <div className="sub">{i.members}/{i.capacity} members · 9 dinners run</div>
        </div>
        <div className="kpi">
          <div className="key">Resolution · Challenges</div>
          <div className="val">{(i.resolutionRate*100).toFixed(0)}%</div>
          <div className="sub">{i.challenges.filter(c=>c.status==="closed").length} closed · {i.challenges.filter(c=>c.status==="open").length} open</div>
        </div>
        <div className="kpi">
          <div className="key">Treasury</div>
          <div className="val">€{i.treasuryEUR.toLocaleString()}</div>
          <div className="sub">{i.treasuryFlow.length} transactions · pot-luck kitty</div>
        </div>
        <div className="kpi">
          <div className="key">Next Ritual</div>
          <div className="val" style={{fontSize:20, lineHeight:1.2}}>{i.nextRitual.date}<br/><span style={{fontFamily:"var(--font-mono)", fontSize:13, letterSpacing:"0.04em", color:"var(--ink-3)"}}>Sun · 19:30</span></div>
          <div className="sub">Host · {i.nextRitual.host}</div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="kernel-grid">
        <div className="kernel-col">
          <div className="k-panel">
            <div className="title">
              <span className="num">§01</span>
              <span className="name">Trace · Recent</span>
              <span className="right">Commitment → Proof → Validation → Reward</span>
            </div>
            <div>
              {i.traces.map((tr, k) => (
                <div key={k} className="trace-row">
                  <div className="ts">{tr.ts}</div>
                  <div className="body">
                    <div className="chain">
                      {["commitment","proof","validation","reward"].map((step, idx) => (
                        <React.Fragment key={step}>
                          <span className={"step" + (tr.chain.includes(step) ? " done" : "")}>{step}</span>
                          {idx < 3 && <span className="arrow">→</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="text">
                      <span className="who">{tr.who} · </span>
                      {tr.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="k-panel">
            <div className="title">
              <span className="num">§02</span>
              <span className="name">Members · Reliability ledger</span>
              <span className="right">{i.members_list.length} active</span>
            </div>
            <div className="member-row head">
              <span>Member · Role · Joined</span>
              <span style={{textAlign:"right"}}>Attend</span>
              <span style={{textAlign:"right"}}>Miss</span>
              <span style={{textAlign:"right"}}>Reliab.</span>
            </div>
            {i.members_list.map((m, k) => (
              <div key={k} className="member-row">
                <div>
                  <div style={{fontFamily:"var(--font-display)", fontWeight:500}}>{m.name}</div>
                  <div className="role-cell">{m.role} · {m.joined}</div>
                </div>
                <div className="att">{m.attendance}</div>
                <div className="att" style={{color: m.missed>2 ? "var(--ink-4)" : "var(--ink-2)"}}>{m.missed}</div>
                <div className="rel" style={{color: m.reliability < 0.8 ? "#d4a59a" : "var(--accent)"}}>{(m.reliability*100).toFixed(0)}%</div>
              </div>
            ))}
          </div>

          <div className="k-panel">
            <div className="title">
              <span className="num">§03</span>
              <span className="name">Challenges</span>
              <span className="right">{i.challenges.filter(c=>c.status==="open").length} open</span>
            </div>
            <div style={{display:"grid", gap:0}}>
              {i.challenges.map((c, k) => (
                <div key={k} style={{padding:"14px 0", borderBottom:"1px solid var(--rule)", display:"grid", gridTemplateColumns:"auto 1fr auto", gap:14, alignItems:"baseline"}}>
                  <span className="code-tag accent">{c.id}</span>
                  <div>
                    <div style={{fontSize:14}}>{c.title}</div>
                    <div className="code-tag" style={{marginTop:2}}>
                      {c.status === "open" ? `${c.participants} committed · due ${c.deadline}` : `${c.completed}/${c.participants} completed · sealed`}
                    </div>
                  </div>
                  <div className={"code-tag" + (c.status==="open" ? " accent" : "")}>{c.status === "open" ? "● Open" : "○ Closed"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="kernel-col">
          <div className="k-panel">
            <div className="title">
              <span className="num">§04</span>
              <span className="name">Upcoming Rituals</span>
              <span className="right">Cadence · weekly</span>
            </div>
            <div className="ritual-card next">
              <div>
                <div className="date">{i.nextRitual.date}</div>
                <div className="code-tag" style={{marginTop:4, color:"var(--accent)"}}>NEXT</div>
              </div>
              <div>
                <div style={{fontFamily:"var(--font-display)", fontSize:17, fontWeight:600, marginBottom:6}}>
                  Week {i.weeksRun+1} · Sunday Supper
                </div>
                <div className="meta">
                  <span className="key">Host</span> {i.nextRitual.host}
                  <span style={{margin:"0 10px", color:"var(--ink-4)"}}>·</span>
                  <span className="key">Scribe</span> {i.nextRitual.scribe}
                </div>
                <div className="meta" style={{marginTop:4}}>
                  <span className="key">Guest</span> {i.nextRitual.guest}
                </div>
              </div>
            </div>
            {i.upcomingRituals.map((r, k) => (
              <div key={k} className="ritual-card">
                <div className="date">{r.date}</div>
                <div className="meta">
                  <span className="key">Host</span> {r.host}
                  <span style={{margin:"0 10px", color:"var(--ink-4)"}}>·</span>
                  <span className="key">Scribe</span> {r.scribe}
                </div>
              </div>
            ))}
          </div>

          <div className="k-panel">
            <div className="title">
              <span className="num">§05</span>
              <span className="name">Treasury · Flow</span>
              <span className="right">€{i.treasuryEUR.toLocaleString()} · balance</span>
            </div>
            <div className="treasury-table">
              <div className="tx-row head">
                <span>Date</span><span>Memo</span><span style={{textAlign:"right"}}>Δ EUR</span>
              </div>
              {i.treasuryFlow.map((tx, k) => (
                <div key={k} className="tx-row">
                  <div className="ts">{tx.date}</div>
                  <div>{tx.note}</div>
                  <div className={"delta " + (tx.delta>0?"pos":"neg")}>{tx.delta>0?"+":""}{tx.delta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="k-panel">
            <div className="title">
              <span className="num">§06</span>
              <span className="name">Pattern Lineage</span>
              <span className="right" style={{cursor:"pointer"}} onClick={() => go("lineage")}>Full map →</span>
            </div>
            <div style={{display:"grid", gap:10}}>
              <div style={{display:"grid", gridTemplateColumns:"auto 1fr", gap:14, alignItems:"baseline", padding:"10px 0", borderBottom:"1px solid var(--rule)"}}>
                <span className="code-tag accent">FC·011</span>
                <div>
                  <div style={{fontFamily:"var(--font-display)", fontSize:14}}>Supper Club Season · Root</div>
                  <div className="code-tag">Pattern family · forked from</div>
                </div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"auto 1fr", gap:14, alignItems:"baseline", padding:"10px 0", borderBottom:"1px solid var(--rule)"}}>
                <span className="code-tag accent">SC-014</span>
                <div>
                  <div style={{fontFamily:"var(--font-display)", fontSize:14}}>{i.name} · {i.edition}</div>
                  <div className="code-tag">You are here · {i.city}</div>
                </div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"auto 1fr", gap:14, alignItems:"baseline", padding:"10px 0", borderBottom:"1px solid var(--rule)", opacity:0.7}}>
                <span className="code-tag">SC-021</span>
                <div>
                  <div style={{fontFamily:"var(--font-display)", fontSize:14}}>Pasta Sundays · v1.0</div>
                  <div className="code-tag">Forked · Brooklyn</div>
                </div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"auto 1fr", gap:14, alignItems:"baseline", padding:"10px 0", opacity:0.7}}>
                <span className="code-tag">SC-029</span>
                <div>
                  <div style={{fontFamily:"var(--font-display)", fontSize:14}}>Mesa Larga · v2.0</div>
                  <div className="code-tag">Forked · Mexico City</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.KernelScreen = KernelScreen;
