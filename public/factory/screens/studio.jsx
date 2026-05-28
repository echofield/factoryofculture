// Studio — FC·030. Customize a forked pattern → seal.

function StudioScreen({ go, currentTemplateCode, draft, setDraft, onSeal }) {
  const t = window.TEMPLATES.find(x => x.code === currentTemplateCode) || window.TEMPLATES[0];
  const challenge = PrimaryChallenge({ template: t });

  // Initialize draft on template change
  React.useEffect(() => {
    if (!draft || draft.from !== t.code) {
      setDraft({
        from: t.code,
        name: t.name,
        place: t.place.split("·")[0].trim(),
        city: "Paris",
        size: 12,
        cadenceInterval: t.cadence.interval.includes("week") ? "weekly" : t.cadence.interval.includes("month") ? "monthly" : "weekly",
        durationWeeks: 13,
        roles: [...t.roles],
        proofWeight: 70,
        rewardWeight: 60,
        treasuryReserve: 15,
        license: "open-fork",
        price: 240
      });
    }
  }, [t.code]);

  if (!draft) return null;

  const update = (k, v) => setDraft({ ...draft, [k]: v });

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>FC·030 / PATTERN STUDIO</CodeTag>
          <h2 style={{marginTop:10}}>Customize · {t.name}</h2>
          <p className="deck">
            You're forking <span style={{color:"var(--accent)", fontFamily:"var(--font-mono)"}}>{t.catalog}</span>.
            Adjust the cadence, roles, proof rules, and treasury. When the shape is right, seal it as
            an edition.
          </p>
        </div>
        <div style={{display:"flex", gap:10}}>
          <Btn onClick={() => go("pattern")}>← Pattern</Btn>
          <Btn heat onClick={() => { onSeal(draft, t); }} arrow>Seal v1.0</Btn>
        </div>
      </div>

      <div className="studio">
        {/* Form column */}
        <div className="studio-form">

          <SectionRule num="§00" label="Compose the commitment" right="Action before settings" />
          <div className="form-group compose-start">
            <ComposeQuestions />
            <ChallengeSignal challenge={challenge} compact />
            <ChallengeFlow compact />
            <div className="help">
              A fork starts by naming the repeated action. Cadence, roles, and treasury only matter
              once the proof loop is legible.
            </div>
          </div>

          <SectionRule num="§·" label="Archetype" right="A shaping shortcut" />
          <div className="form-group" style={{paddingTop:8}}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8}}>
              {[
                { id:"intimate",  name:"Intimate",  hint:"Small, slow, witnessed.",        size:8,  durationWeeks:13, proofWeight:50, rewardWeight:35, treasuryReserve:10 },
                { id:"reliable",  name:"Reliable",  hint:"Standard kernel · default.",     size:12, durationWeeks:13, proofWeight:70, rewardWeight:60, treasuryReserve:15 },
                { id:"ambitious", name:"Ambitious", hint:"Scaled, dense, validator-heavy.",size:24, durationWeeks:26, proofWeight:85, rewardWeight:75, treasuryReserve:25 }
              ].map(p => {
                const matches = p.size===draft.size && p.durationWeeks===draft.durationWeeks && p.proofWeight===draft.proofWeight && p.rewardWeight===draft.rewardWeight && p.treasuryReserve===draft.treasuryReserve;
                return (
                  <button
                    key={p.id}
                    onClick={() => setDraft({...draft, ...p})}
                    style={{
                      textAlign:"left",
                      padding:"16px 16px 18px",
                      background: matches ? "var(--paper-3)" : "transparent",
                      border:"1px solid " + (matches ? "var(--accent)" : "var(--rule-2)"),
                      cursor:"pointer",
                      fontFamily:"inherit",
                      color:"inherit",
                      transition:"all .12s ease"
                    }}
                  >
                    <div style={{fontFamily:"var(--font-mono)", fontSize:9.5, letterSpacing:"0.18em", color: matches ? "var(--accent)" : "var(--ink-4)", textTransform:"uppercase"}}>
                      Preset · 0{["intimate","reliable","ambitious"].indexOf(p.id)+1}
                    </div>
                    <div style={{fontFamily:"var(--font-display)", fontWeight:600, fontSize:20, letterSpacing:"-0.02em", marginTop:6}}>
                      {p.name}
                    </div>
                    <div className="serif-em" style={{fontSize:13, marginTop:4, color:"var(--ink-3)"}}>
                      {p.hint}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="help" style={{marginTop:10}}>
              An archetype seeds every dial below. You can still adjust anything afterwards — the preset is a starting shape, not a constraint.
            </div>
          </div>

          <SectionRule num="§01" label="Identity" right="Required" />

          <div className="form-group">
            <div className="label">Edition Name</div>
            <input
              className="field-input"
              value={draft.name}
              onChange={e => update("name", e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="label">Place / Anchor</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
              <input className="field-input" value={draft.place} onChange={e => update("place", e.target.value)} placeholder="venue" />
              <input className="field-input" value={draft.city} onChange={e => update("city", e.target.value)} placeholder="city" />
            </div>
          </div>

          <SectionRule num="§02" label="Cadence" right="How it recurs" />

          <div className="form-group">
            <div className="label">Interval</div>
            <Seg
              value={draft.cadenceInterval}
              options={["weekly","biweekly","monthly","quarterly"]}
              onChange={v => update("cadenceInterval", v)}
            />
          </div>

          <div className="form-group">
            <div className="label">Season length · {draft.durationWeeks} weeks</div>
            <Slider value={draft.durationWeeks} min={4} max={52} unit="wks" ticks={["4 wks","52 wks"]} onChange={v => update("durationWeeks", v)} />
          </div>

          <div className="form-group">
            <div className="label">Group size · {draft.size} members</div>
            <Slider value={draft.size} min={4} max={48} ticks={["4","48"]} onChange={v => update("size", v)} />
          </div>

          <SectionRule num="§03" label="Roles" right={draft.roles.length + " · total"} />
          <div className="form-group">
            <div className="roles-list">
              {draft.roles.map((r, i) => (
                <div key={i} className="role-chip">
                  <span>{r}</span>
                  <span className="x" onClick={() => update("roles", draft.roles.filter((_,j)=>j!==i))}>×</span>
                </div>
              ))}
            </div>
            <div className="form-row" style={{marginTop:8}}>
              {["Closer","Witness","Validator","Steward","Curator"].filter(x => !draft.roles.includes(x)).slice(0,3).map(s => (
                <button key={s}
                  onClick={() => update("roles", [...draft.roles, s])}
                  className="btn"
                  style={{padding:"6px 12px", fontSize:10}}>+ {s}</button>
              ))}
            </div>
          </div>

          <SectionRule num="§04" label="Proof & Reward" right="The loop" />

          <div className="form-group">
            <div className="label">Proof rigor · {draft.proofWeight}%</div>
            <Slider value={draft.proofWeight} min={20} max={100} ticks={["light","heavy"]} onChange={v => update("proofWeight", v)} unit="%" />
            <div className="help">
              {draft.proofWeight < 40 ? "Light · honor-based, witnessed." :
               draft.proofWeight < 70 ? "Standard · countersigned, recorded." :
               "Heavy · validator + artifact + ledger."}
            </div>
          </div>

          <div className="form-group">
            <div className="label">Reward weight · {draft.rewardWeight}%</div>
            <Slider value={draft.rewardWeight} min={0} max={100} ticks={["quiet","strong"]} onChange={v => update("rewardWeight", v)} unit="%" />
            <div className="help">
              {draft.rewardWeight < 40 ? "Quiet · recognition only." :
               draft.rewardWeight < 70 ? "Mixed · status + minor share." :
               "Strong · revenue + status + access."}
            </div>
          </div>

          <ArchiveGroup num="§05" label="Treasury · License · Price" right="Advanced">
            <div className="form-group" style={{borderBottom:"1px solid var(--rule)"}}>
              <div className="label">Reserve % · {draft.treasuryReserve}%</div>
              <Slider value={draft.treasuryReserve} min={0} max={50} ticks={["0%","50%"]} onChange={v => update("treasuryReserve", v)} unit="%" />
              <div className="help">Share of treasury withheld for the next season's seed.</div>
            </div>
            <div className="form-group" style={{borderBottom:"1px solid var(--rule)"}}>
              <div className="label">License</div>
              <Seg
                value={draft.license}
                options={[{value:"open-fork",label:"Open fork"},{value:"paid",label:"Paid"},{value:"closed",label:"Closed"}]}
                onChange={v => update("license", v)}
              />
            </div>
            {draft.license === "paid" && (
              <div className="form-group" style={{borderBottom:0}}>
                <div className="label">Price · ${draft.price}</div>
                <Slider value={draft.price} min={0} max={800} step={10} ticks={["$0","$800"]} onChange={v => update("price", v)} unit="USD" />
              </div>
            )}
          </ArchiveGroup>
        </div>

        {/* Preview column — the sealed-card preview */}
        <div className="studio-preview">
          <SectionRule num="§·" label="Sealed Preview" right="What you'll publish" />

          <div style={{border:"1px solid var(--accent)", padding:32, background:"var(--paper-2)", position:"relative"}}>
            <div style={{position:"absolute", top:0, right:0, padding:"6px 10px", background:"var(--accent)", color:"var(--paper)", fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase"}}>
              Draft · Unsealed
            </div>

            <div style={{display:"grid", gridTemplateColumns:"120px 1fr", gap:24, alignItems:"start"}}>
              <NumeralPlate
                size="med"
                style={{width:120, height:120, aspectRatio:"1"}}
                glyph={<>{t.glyph.replace(".","")}</>}
                tl={t.code}
                br={"v1.0"}
              />
              <div>
                <div className="code-tag accent">{t.catalog}/v1.0 · {t.code}-{String(Math.floor(Math.random()*900)+100)}</div>
                <h3 style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:32, letterSpacing:"-0.025em", margin:"6px 0 10px"}}>{draft.name}</h3>
                <div className="code-tag">{draft.city} · {draft.place}</div>
                <p className="serif-em" style={{fontSize:15, marginTop:14, lineHeight:1.5}}>
                  {t.thesis}
                </p>
                <div style={{marginTop:16}}>
                  <ChallengeSignal challenge={challenge} compact />
                </div>
              </div>
            </div>

            <div style={{height:1, background:"var(--rule)", margin:"28px 0"}}></div>

            <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:24}}>
              <div>
                <div className="code-tag" style={{marginBottom:6}}>Cadence</div>
                <div style={{fontSize:15}}>
                  {draft.cadenceInterval} · {draft.durationWeeks} wks
                </div>
              </div>
              <div>
                <div className="code-tag" style={{marginBottom:6}}>Capacity</div>
                <div style={{fontSize:15}}>{draft.size} members</div>
              </div>
              <div>
                <div className="code-tag" style={{marginBottom:6}}>Proof rigor</div>
                <div style={{fontSize:15}}>{draft.proofWeight}% · {draft.proofWeight<40?"light":draft.proofWeight<70?"standard":"heavy"}</div>
              </div>
              <div>
                <div className="code-tag" style={{marginBottom:6}}>Reward weight</div>
                <div style={{fontSize:15}}>{draft.rewardWeight}%</div>
              </div>
              <div>
                <div className="code-tag" style={{marginBottom:6}}>Treasury reserve</div>
                <div style={{fontSize:15}}>{draft.treasuryReserve}%</div>
              </div>
              <div>
                <div className="code-tag" style={{marginBottom:6}}>License</div>
                <div style={{fontSize:15}}>
                  {draft.license === "paid" ? `Paid · $${draft.price}` : draft.license === "open-fork" ? "Open fork" : "Closed"}
                </div>
              </div>
            </div>

            <div style={{height:1, background:"var(--rule)", margin:"24px 0"}}></div>

            <div className="code-tag" style={{marginBottom:10}}>Challenge spine · inherited</div>
            <ChallengeFlow compact />
            <RewardTreasuryPreview challenge={challenge} template={t} />

            <div style={{height:1, background:"var(--rule)", margin:"24px 0"}}></div>

            <div className="code-tag" style={{marginBottom:8}}>Roles · {draft.roles.length}</div>
            <div className="form-row">
              {draft.roles.map((r,i) => <span key={i} className="item token">{r}</span>)}
            </div>

            <div style={{height:1, background:"var(--rule)", margin:"24px 0"}}></div>

            <div className="code-tag" style={{marginBottom:8}}>Proof rules · inherited</div>
            <ol style={{margin:0, paddingLeft:20, color:"var(--ink-2)", fontSize:13.5}}>
              {t.proof.map((p,i)=><li key={i} style={{padding:"3px 0"}}>{p}</li>)}
            </ol>
          </div>

          <div style={{marginTop:24, padding:"18px 0", borderTop:"1px solid var(--rule)"}}>
            <div className="code-tag" style={{marginBottom:10}}>Sealing checklist</div>
            <div style={{display:"grid", gap:6, fontFamily:"var(--font-mono)", fontSize:12, color:"var(--ink-2)"}}>
              <div>✓ Name and place anchor</div>
              <div>✓ Cadence locked</div>
              <div>✓ Role set complete ({draft.roles.length})</div>
              <div>✓ Proof rules inherited from {t.catalog}</div>
              <div style={{color:"var(--ink-4)"}}>○ First cycle must complete before becoming a verified edition</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.StudioScreen = StudioScreen;
