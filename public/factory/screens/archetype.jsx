// Archetype album — one full-viewport phase per archetype.
// No protocol vocabulary. One decision at a time.

function ArchetypeCard({ arch, onPick }) {
  return (
    <div className="archetype-phase">
      <div className="archetype-phase-top">
        <span className="archetype-phase-num">{arch.num} · {arch.label}</span>
        <div className="archetype-phase-spacetime">
          {arch.spacetimeLabels.map((label, i) => (
            <span key={i} className="spacetime-chip">{label}</span>
          ))}
        </div>
      </div>

      <div className="archetype-phase-body">
        <p className="archetype-phase-oneliner">"{arch.oneliner}"</p>
        <div className="archetype-phase-examples">
          {arch.examples.join(" · ")}
        </div>
      </div>

      <div className="archetype-phase-foot">
        <button className="archetype-phase-cta" onClick={() => onPick(arch)}>
          <span>{arch.cta}</span>
          <span className="cta-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

function ArchetypeScreen({ go, setCurrentTemplate }) {
  const archetypes = window.ARCHETYPES;
  const [idx, setIdx] = React.useState(0);
  const total = archetypes.length;

  const next = () => setIdx(i => Math.min(i + 1, total - 1));
  const prev = () => setIdx(i => Math.max(i - 1, 0));

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const onPick = (arch) => {
    setCurrentTemplate(arch.defaultCode);
    go("compose");
  };

  const current = archetypes[idx];
  const isLast = idx === total - 1;

  return (
    <div className="archetype-album">
      <div className="archetype-album-top">
        <span className="album-back" onClick={() => go("cover")}>← Back</span>
        <span className="album-counter">
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="archetype-album-stage">
        <button
          className="archetype-nav archetype-nav-prev"
          onClick={prev}
          disabled={idx === 0}
          aria-label="Previous"
        >‹</button>

        <ArchetypeCard arch={current} onPick={onPick} />

        <button
          className="archetype-nav archetype-nav-next"
          onClick={next}
          disabled={isLast}
          aria-label="Next"
        >›</button>
      </div>

      <div className="archetype-album-foot">
        <div className="album-progress">
          {archetypes.map((a, i) => (
            <span
              key={a.id}
              className={"album-tick" + (i === idx ? " current" : "") + (i < idx ? " past" : "")}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>

        <div className="album-oneshot">
          <p>
            Not building something recurring? Run one event —
            a tournament, a night, a sprint. No setup needed.
          </p>
          <button className="album-oneshot-cta" onClick={() => go("compose")}>
            <span>Run one thing</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

window.ArchetypeScreen = ArchetypeScreen;
