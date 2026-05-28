// Almanac cover — two doors and nothing else.

function AlmanacCover({ go, currentTemplate, instance }) {
  return (
    <div className="cover cover-twodoor">
      <div className="cover-top">
        <div className="l">Factory of Culture<br/><span style={{color:"var(--ink-4)"}}>FC · VOL.001</span></div>
        <div className="c"><span className="kernel-pulse">○</span> Kernel · Live</div>
        <div className="r">Edition 2026.01<br/><span style={{color:"var(--ink-4)"}}>Pre-Release Index</span></div>
      </div>

      <div className="cover-twodoor-center">
        <h1 className="cover-twodoor-mark">
          Factory<br/>of <span>Culture</span><span style={{color:"var(--accent)"}}>.</span>
        </h1>
        <p className="cover-twodoor-deck">
          Infrastructure for groups that recur, commit, and earn.
        </p>

        <div className="cover-doors">
          <button className="cover-door" onClick={() => go("archetype")}>
            <span className="door-num">01</span>
            <span className="door-label">Start with your group</span>
            <span className="door-arrow">→</span>
          </button>
          <button className="cover-door" onClick={() => go("library")}>
            <span className="door-num">02</span>
            <span className="door-label">Browse the library</span>
            <span className="door-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

window.AlmanacCover = AlmanacCover;
