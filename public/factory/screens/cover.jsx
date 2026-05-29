// Almanac cover — typographic, restrained. Heat lives only in the period.

function AlmanacCover({ go, currentTemplate, instance }) {
  const patternCount = window.TEMPLATES.length;
  const sealedCount  = window.TEMPLATES.reduce((sum, t) => sum + t.sealed.length, 0);

  return (
    <div className="cover cover-typographic">
      <div className="cover-typo-grid"></div>

      {/* Top bar */}
      <div className="cover-typo-top">
        <div className="l">
          Factory of Culture
          <span>Edition 2026.01</span>
        </div>
        <div className="r">
          FC · Vol.001
          <span>Pre-release index</span>
        </div>
      </div>

      {/* Hero */}
      <div className="cover-typo-hero">
        <div className="cover-typo-cat">Cat. FC·001</div>

        <div className="cover-typo-mark-row">
          <h1 className="cover-typo-mark">
            <span>Factory</span>
            <span>of</span>
            <span>Culture<span className="cover-typo-dot">.</span></span>
          </h1>

          <div className="cover-typo-stats">
            <div className="stat">
              <div className="key">Patterns</div>
              <div className="val">{String(patternCount).padStart(2, "0")}</div>
            </div>
            <div className="stat">
              <div className="key">Sealed editions</div>
              <div className="val">{String(sealedCount).padStart(2, "0")}</div>
            </div>
          </div>
        </div>

        <p className="cover-typo-strap">
          Where communities are cast, sealed,<br/>and forked.
        </p>
      </div>

      {/* Doors — quiet, mono, foot-of-viewport */}
      <div className="cover-typo-doors">
        <button className="cover-typo-door" onClick={() => go("archetype")}>
          <span className="door-num">01</span>
          <span className="door-label">Start with your group</span>
          <span className="door-arrow">→</span>
        </button>
        <button className="cover-typo-door" onClick={() => go("library")}>
          <span className="door-num">02</span>
          <span className="door-label">Browse the library</span>
          <span className="door-arrow">→</span>
        </button>
      </div>

      {/* Bottom bar */}
      <div className="cover-typo-foot">
        <div className="l">
          <span className="kernel-pulse">●</span> Kernel · Live
        </div>
        <div className="r">Infrastructure · not interface</div>
      </div>
    </div>
  );
}

window.AlmanacCover = AlmanacCover;
