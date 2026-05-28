// Archetype selection — FC·000. The first door.
// Not "which archetype are you" — "what are you about to do."
// Clicking a card pre-selects the closest template and opens the Compose flow.

function ArchetypeScreen({ go, setCurrentTemplate }) {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>FC·000 / ARCHETYPES</CodeTag>
          <h2 style={{marginTop:12}}>What are you building?</h2>
          <p className="deck">
            Every recurring group has a shape. Find yours — the system configures itself.
            You'll never fill out a protocol form.
          </p>
        </div>
        <div className="right">
          <div className="big">06</div>
          <div>Kernels</div>
          <div style={{color:"var(--ink-4)"}}>Pick one · Configure nothing</div>
        </div>
      </div>

      <SectionRule num="§00" label="Six shapes" right="Action-first · pick the closest" />

      <div className="archetype-grid">
        {window.ARCHETYPES.map(arch => (
          <div
            key={arch.id}
            className="archetype-card"
            onClick={() => {
              setCurrentTemplate(arch.defaultCode);
              go("compose");
            }}
          >
            {/* Spacetime position — top right, recessed */}
            <div className="archetype-spacetime">
              <span className="spacetime-chip">{arch.spacetime.time}</span>
              <span className="spacetime-chip">{arch.spacetime.space}</span>
            </div>

            {/* Head: num + label */}
            <div className="archetype-card-head">
              <span className="archetype-num">{arch.num} ·</span>
              <span className="archetype-label">{arch.label.replace("The ", "")}</span>
            </div>

            {/* Hero: the action-framed oneliner */}
            <p className="archetype-oneliner">"{arch.oneliner}"</p>

            {/* Examples */}
            <div className="archetype-hint">{arch.hint}</div>

            {/* Foot: signals + CTA */}
            <div className="archetype-foot">
              <div className="archetype-signals">
                <span className="archetype-signal-chip">{arch.governance}</span>
                <span className="archetype-signal-chip">{arch.proofPrimitive}</span>
                <span className="archetype-signal-chip">{arch.economicLoop}</span>
              </div>
              <div className="archetype-cta">
                <span>{arch.cta}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Escape hatch: one-shot or browse */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr auto",
        alignItems:"center",
        gap:24,
        marginTop:48,
        paddingTop:24,
        borderTop:"1px solid var(--rule)"
      }}>
        <div>
          <div className="code-tag" style={{marginBottom:6}}>Not building something recurring?</div>
          <p className="serif-em" style={{fontSize:14, color:"var(--ink-3)", margin:0, maxWidth:"52ch"}}>
            You can also just run one event — a tournament, a night, a sprint. No archetype needed.
            Start with a single card and decide later if it becomes something more.
          </p>
        </div>
        <div style={{display:"flex", gap:10, flexShrink:0}}>
          <Btn onClick={() => go("compose")}>Run one thing →</Btn>
          <Btn onClick={() => go("library")} arrow>Browse library</Btn>
        </div>
      </div>
    </div>
  );
}

window.ArchetypeScreen = ArchetypeScreen;
