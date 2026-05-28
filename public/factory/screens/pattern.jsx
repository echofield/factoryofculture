// Pattern detail — FC·020. Editorial spread + Fork CTA.

function PatternScreen({ go, currentTemplateCode, setCurrentTemplate, onFork }) {
  const t = window.TEMPLATES.find(x => x.code === currentTemplateCode) || window.TEMPLATES[0];
  const challenge = PrimaryChallenge({ template: t });

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>{t.catalog} / {t.code}-SERIES</CodeTag>
          <div style={{display:"flex", gap:14, alignItems:"baseline", marginTop:6}}>
            <span className="code-tag">{t.family}</span>
          </div>
        </div>
        <div style={{display:"flex", gap:10}}>
          <Btn onClick={() => go("library")}>← Library</Btn>
          <Btn onClick={() => go("studio")} arrow>Customize</Btn>
          <Btn primary onClick={() => onFork(t)} arrow>Fork pattern</Btn>
        </div>
      </div>

      <div className="spread">
        {/* ── SPREAD LEFT ── */}
        <div className="spread-left">

          {/* LAYER 1: Identity — numeral, title, thesis, 4 key facts */}
          <div className="pattern-hero">
            <NumeralPlate
              size="huge"
              style={{aspectRatio:"1"}}
              glyph={<>{t.glyph.replace(".","")}</>}
              tl={t.catalog}
              tr={t.code}
              bl={"PATTERN"}
              br={"v.LIVE"}
            />
            <div className="info">
              <div className="family-line">{t.family}</div>
              <h2>{t.name}</h2>
              <p className="thesis">{t.thesis}</p>
            </div>
          </div>

          <div className="primary-signals">
            <div className="sig">
              <div className="key">Cadence</div>
              <div className="val">{t.cadence.interval}</div>
              <div className="sub">{t.cadence.duration} · {t.cadence.anchor}</div>
            </div>
            <div className="sig">
              <div className="key">Place anchor</div>
              <div className="val">{t.place.split("·")[0].trim()}</div>
              <div className="sub">{t.place.split("·").slice(1).join("·").trim() || "any anchor"}</div>
            </div>
            <div className="sig">
              <div className="key">Action unit</div>
              <div className="val">{challenge.title}</div>
              <div className="sub">confirmed by {challenge.validation} · {challenge.reliability} trust</div>
            </div>
            <div className="sig">
              <div className="key">Mean reliability</div>
              <div className="val">{t.sealed.length ? (t.sealed.reduce((a,b)=>a+b.reliability,0)/t.sealed.length*100).toFixed(0)+"%" : "—"}</div>
              <div className="sub">{t.sealed.length} sealed editions · {t.sealed.reduce((a,b)=>a+b.forks,0)} forks</div>
            </div>
          </div>

          {/* LAYER 2: Single canonical spine */}
          <SectionRule num="§00" label="How a cycle runs" right="From signing up to a record" />
          <ActionSpine challenge={challenge} template={t} />
          <DiamondPassage template={t} />

          <SectionRule num="§00B" label="Other challenges in this family" right={t.challengeTemplates.length + " · inherited"} />
          <ForkableChallengeTemplates template={t} />

          {/* Secondary: operating shape */}
          <SectionRule num="§01" label="How it runs" right="What recurs" />
          <div className="def-list">
            <DefRow k="Roles">
              <TokenList items={t.roles} />
            </DefRow>
            <DefRow k="How you prove it">
              <ul className="plain-list">
                {t.proof.map((p,i)=><li key={i}>{p}</li>)}
              </ul>
            </DefRow>
            <DefRow k="What members earn">
              <ul className="plain-list">
                {t.rewards.map((p,i)=><li key={i}>{p}</li>)}
              </ul>
            </DefRow>
          </div>

          <ArchiveGroup num="§02" label="Deeper · How it splits · Who decides · How you join" right="Read · 3 items">
            <div className="def-list">
              <DefRow k="How it splits" tier="archival">
                <div style={{marginBottom:4}}><span className="serif-em">model · </span>{t.treasury.model}</div>
                <div style={{fontSize:13}}>{t.treasury.split}</div>
              </DefRow>
              <DefRow k="Who decides" tier="archival">
                <span className="serif-em" style={{fontSize:14}}>{t.governance}</span>
              </DefRow>
              <DefRow k="How you join" tier="archival">
                <span className="serif-em" style={{fontSize:14}}>{t.onboarding}</span>
              </DefRow>
            </div>
          </ArchiveGroup>
        </div>

        {/* ── SPREAD RIGHT — LAYER 3: archive / reference ── */}
        <div className="spread-right">

          {/* §02 Sealed editions — collapsible archive */}
          <ArchiveGroup num="§02" label="Sealed Editions" right={t.sealed.length + " · live"} defaultOpen>
            <div className="instances">
              {t.sealed.map(s => (
                <div key={s.id} className="instance-row" onClick={() => go("kernel")}>
                  <span className="id">{s.id}</span>
                  <div className="body">
                    <div className="name">{s.name}</div>
                    <div className="where">{s.city} · {s.edition}</div>
                  </div>
                  <div className="stat">
                    <Bar pct={s.reliability} width={56} />
                    <div style={{marginTop:4, textAlign:"right", color:"var(--ink-3)"}}>{(s.reliability*100).toFixed(0)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </ArchiveGroup>

          {/* §03 Proof stats — quiet reference block */}
          <ArchiveGroup num="§03" label="Proof of Architecture" right="Aggregated" defaultOpen>
            <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:1, background:"var(--rule)", border:"1px solid var(--rule)"}}>
              {[
                ["Mean reliability", (t.sealed.reduce((a,b)=>a+b.reliability,0)/t.sealed.length*100).toFixed(0)+"%"],
                ["Total forks", t.sealed.reduce((a,b)=>a+b.forks,0)],
                ["Cycles run", t.sealed.length * (Math.floor(Math.random()*5)+3)],
                ["Mean price", t.sealed.filter(s=>s.price!=="free").length ? "$" + Math.round(t.sealed.filter(s=>s.price!=="free").reduce((a,b)=>a+Number(b.price.replace("$","")),0)/t.sealed.filter(s=>s.price!=="free").length) : "free"]
              ].map(([k,v]) => (
                <div key={k} style={{background:"var(--paper)", padding:"14px 16px"}}>
                  <div style={{fontFamily:"var(--font-mono)", fontSize:9.5, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--ink-5)"}}>{k}</div>
                  <div style={{fontFamily:"var(--font-display)", fontSize:16, fontWeight:500, letterSpacing:"-0.02em", marginTop:4, color:"var(--ink-3)"}}>{v}</div>
                </div>
              ))}
            </div>
          </ArchiveGroup>

          <ArchiveGroup num="§04" label="Failure Notes · Adjustments shipped" right={window.FAILURE_LOG.filter(f => f.code.startsWith(t.code)).length + " · logged"}>
            <div style={{display:"grid", gap:0}}>
              {window.FAILURE_LOG.filter(f => f.code.startsWith(t.code)).concat(
                t.code === "SC" ? [] : [{code: t.code+"/F·—", note:"No public failure artifacts yet. The library only seals patterns after one full cycle.", severity:"none"}]
              ).map((f, i) => (
                <div key={i} style={{padding:"12px 0", borderBottom:"1px solid var(--rule)"}}>
                  <div style={{fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.14em", color:"var(--accent)", textTransform:"uppercase"}}>{f.code} · {f.severity}</div>
                  <div className="serif-em" style={{fontSize:14, marginTop:4, color:"var(--ink-3)"}}>{f.note}</div>
                </div>
              ))}
            </div>
          </ArchiveGroup>

          <ArchiveGroup num="§05" label="Other Patterns · Switch" right="06 · other families">
            <div style={{display:"grid", gap:1, background:"var(--rule)", border:"1px solid var(--rule)"}}>
              {window.TEMPLATES.filter(x => x.code !== t.code).map(other => (
                <div key={other.code}
                  onClick={() => setCurrentTemplate(other.code)}
                  style={{background:"var(--paper)", padding:"12px 14px", display:"grid", gridTemplateColumns:"auto 1fr auto", gap:12, alignItems:"baseline", cursor:"pointer"}}>
                  <span className="code-tag accent">{other.catalog}</span>
                  <span style={{fontSize:13.5}}>{other.name}</span>
                  <span className="code-tag">→</span>
                </div>
              ))}
            </div>
          </ArchiveGroup>
        </div>
      </div>
    </div>
  );
}

window.PatternScreen = PatternScreen;
