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
        <div className="spread-left">
          <div className="pattern-hero">
            <NumeralPlate
              size="huge"
              style={{aspectRatio:"1"}}
              glyph={<>{t.glyph.replace(".","")}<span className="dot">.</span></>}
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

          {/* Primary signals — the 15-second read */}
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
              <div className="sub">{challenge.validation} validation · {challenge.reliability} impact</div>
            </div>
            <div className="sig">
              <div className="key">Mean reliability</div>
              <div className="val">{t.sealed.length ? (t.sealed.reduce((a,b)=>a+b.reliability,0)/t.sealed.length*100).toFixed(0)+"%" : "—"}</div>
              <div className="sub">{t.sealed.length} sealed editions · {t.sealed.reduce((a,b)=>a+b.forks,0)} forks</div>
            </div>
          </div>

          <SectionRule num="§00" label="Action Spine" right="Challenge is the economic unit" />
          <ActiveChallengeStrip template={t} />
          <div className="action-spine-grid">
            <div className="spine-panel main">
              <div className="code-tag accent">Proof flow</div>
              <ChallengeFlow />
              <div className="spine-proof-list">
                {challenge.proof.map((item, i) => (
                  <div key={item}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
            <RewardTreasuryPreview challenge={challenge} template={t} />
          </div>
          <DiamondPassage template={t} />

          <SectionRule num="§00B" label="Forkable challenge templates" right={t.challengeTemplates.length + " inherited modules"} />
          <ForkableChallengeTemplates template={t} />

          <SectionRule num="§01" label="Operating Shape" right="What recurs" />
          <div className="def-list">
            <DefRow k="Roles">
              <TokenList items={t.roles} />
            </DefRow>
            <DefRow k="Proof rules">
              <ol style={{margin:0, paddingLeft:18, color:"var(--ink-2)"}}>
                {t.proof.map((p,i)=><li key={i} style={{padding:"3px 0"}}>{p}</li>)}
              </ol>
            </DefRow>
            <DefRow k="Reward loop">
              <ol style={{margin:0, paddingLeft:18, color:"var(--ink-2)"}}>
                {t.rewards.map((p,i)=><li key={i} style={{padding:"3px 0"}}>{p}</li>)}
              </ol>
            </DefRow>
          </div>

          <ArchiveGroup num="§02" label="Archive · Governance, Treasury, Onboarding" right="Read · 3 items">
            <div className="def-list">
              <DefRow k="Treasury" tier="archival">
                <div style={{marginBottom:4}}><span className="serif-em">model · </span>{t.treasury.model}</div>
                <div style={{fontSize:13}}>{t.treasury.split}</div>
              </DefRow>
              <DefRow k="Governance" tier="archival">
                <span className="serif-em" style={{fontSize:14}}>{t.governance}</span>
              </DefRow>
              <DefRow k="Onboarding" tier="archival">
                <span className="serif-em" style={{fontSize:14}}>{t.onboarding}</span>
              </DefRow>
            </div>
          </ArchiveGroup>
        </div>

        <div className="spread-right">
          <div>
            <SectionRule num="§02" label="Sealed Editions" right={t.sealed.length + " · live"} />
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
          </div>

          <div>
            <SectionRule num="§03" label="Proof of Architecture" right="Aggregated" />
            <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:1, background:"var(--rule)", border:"1px solid var(--rule)"}}>
              {[
                ["Mean reliability", (t.sealed.reduce((a,b)=>a+b.reliability,0)/t.sealed.length*100).toFixed(0)+"%"],
                ["Total forks", t.sealed.reduce((a,b)=>a+b.forks,0)],
                ["Cycles run", t.sealed.length * (Math.floor(Math.random()*5)+3)],
                ["Mean price", t.sealed.filter(s=>s.price!=="free").length ? "$" + Math.round(t.sealed.filter(s=>s.price!=="free").reduce((a,b)=>a+Number(b.price.replace("$","")),0)/t.sealed.filter(s=>s.price!=="free").length) : "free"]
              ].map(([k,v]) => (
                <div key={k} style={{background:"var(--paper)", padding:"16px 18px"}}>
                  <div style={{fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--ink-4)"}}>{k}</div>
                  <div style={{fontFamily:"var(--font-display)", fontSize:24, fontWeight:600, letterSpacing:"-0.02em", marginTop:4}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

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
