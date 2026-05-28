// Shared UI primitives for Factory of Culture.

function CodeTag({ children, accent }) {
  return <span className={"code-tag" + (accent ? " accent" : "")}>{children}</span>;
}

function SectionRule({ num, label, right }) {
  return (
    <div className="section-rule">
      <div className="lhs">
        <span className="num">{num}</span>
        <span>{label}</span>
      </div>
      <div className="hairline"></div>
      <div className="rhs">{right}</div>
    </div>
  );
}

function NumeralPlate({ glyph, tl, tr, bl, br, size = "huge", style }) {
  return (
    <div className={"numeral-plate " + size} style={style}>
      {tl && <div className="corner tl">{tl}</div>}
      {tr && <div className="corner tr">{tr}</div>}
      {bl && <div className="corner bl">{bl}</div>}
      {br && <div className="corner br">{br}</div>}
      <div className="glyph">{glyph}</div>
    </div>
  );
}

function Bar({ pct, width = 80 }) {
  return (
    <span className="bar" style={{ width }}>
      <i style={{ width: (pct * 100).toFixed(1) + "%" }}></i>
    </span>
  );
}

function DefRow({ k, children, tier }) {
  return (
    <div className={"def-row" + (tier ? " " + tier : "")}>
      <div className="key">{k}</div>
      <div className="val">{children}</div>
    </div>
  );
}

function ArchiveGroup({ num, label, right, children, defaultOpen }) {
  return (
    <details className="archive-group" open={defaultOpen}>
      <summary>
        <span><span className="num">{num}</span> &nbsp; <span className="label">{label}</span></span>
        <span className="hairline"></span>
        <span style={{display:"flex", alignItems:"center", gap:14}}>
          <span>{right}</span>
          <span className="toggle"></span>
        </span>
      </summary>
      <div style={{paddingBottom:12}}>{children}</div>
    </details>
  );
}

function TokenList({ items }) {
  return (
    <div>
      {items.map((it, i) => <span key={i} className="item token">{it}</span>)}
    </div>
  );
}

function Btn({ children, onClick, primary, arrow, style }) {
  return (
    <button className={"btn" + (primary ? " primary" : "")} onClick={onClick} style={style}>
      {children}
      {arrow && <span className="arrow">→</span>}
    </button>
  );
}

function Seg({ value, options, onChange }) {
  return (
    <div className="seg">
      {options.map(opt => (
        <button
          key={opt.value || opt}
          className={value === (opt.value || opt) ? "on" : ""}
          onClick={() => onChange(opt.value || opt)}
        >
          {opt.label || opt}
        </button>
      ))}
    </div>
  );
}

function Slider({ value, min, max, step, onChange, unit, ticks }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 84px", gap: 14, alignItems: "center" }}>
      <div className="slider-wrap">
        <input
          type="range" className="slider"
          min={min} max={max} step={step || 1} value={value}
          style={{ "--pct": pct + "%" }}
          onChange={e => onChange(Number(e.target.value))}
        />
        <div className="ticks">
          <span>{ticks?.[0] ?? min}</span>
          <span>{ticks?.[1] ?? max}</span>
        </div>
      </div>
      <span className="slider-out" style={{ textAlign: "right" }}>
        {value}{unit ? " " + unit : ""}
      </span>
    </div>
  );
}

function PrimaryChallenge({ template }) {
  return template.challengeTemplates?.[0] || {
    title: "Declare one useful commitment",
    stake: "20 SYM",
    reward: "50 SYM",
    deadline: "7 days",
    validation: "witness",
    reliability: "+8",
    proof: ["attendance", "proof artifact", "validation note"]
  };
}

function ChallengeFlow({ compact }) {
  const steps = ["Commitment", "Attendance", "Proof", "Validation", "Reward", "Trace"];
  return (
    <div className={"challenge-flow" + (compact ? " compact" : "")}>
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <span className={step === "Commitment" ? "hot" : ""}>{step}</span>
          {i < steps.length - 1 && <b>→</b>}
        </React.Fragment>
      ))}
    </div>
  );
}

function ChallengeSignal({ challenge, compact, quiet }) {
  const proofCount = challenge.proof?.length || 0;
  return (
    <div className={"challenge-signal" + (compact ? " compact" : "") + (quiet ? " quiet" : "")}>
      <div className="signal-top">
        <span className="live-dot"></span>
        <span>active challenge</span>
        <span className="signal-mode">{challenge.validation} validation</span>
      </div>
      <div className="signal-title">{challenge.title}</div>
      <div className="signal-meta">
        {quiet ? (
          <>
            <span>{challenge.reliability} trust gain</span>
            <span>{proofCount} ways to prove it</span>
          </>
        ) : (
          <>
            <span>{challenge.stake} to join</span>
            <span>{challenge.reward} earned</span>
            <span>{challenge.reliability} trust</span>
            <span>{proofCount} proofs</span>
          </>
        )}
      </div>
    </div>
  );
}

function ActiveChallengeStrip({ template }) {
  const challenge = PrimaryChallenge({ template });
  return (
    <div className="active-challenge-strip">
      <div>
        <div className="code-tag accent">Challenge spine</div>
        <div className="strip-title">{challenge.title}</div>
      </div>
      <ChallengeFlow compact />
      <div className="strip-economics">
        <span>stake {challenge.stake}</span>
        <span>reward {challenge.reward}</span>
        <span>impact {challenge.reliability}</span>
      </div>
    </div>
  );
}

function RewardTreasuryPreview({ challenge, template }) {
  return (
    <div className="reward-preview">
      <div>
        <span className="code-tag">Commitment stake</span>
        <strong>{challenge.stake}</strong>
        <small>declared before the cycle closes</small>
      </div>
      <div>
        <span className="code-tag">Reward preview</span>
        <strong>{challenge.reward}</strong>
        <small>released after {challenge.validation} validation</small>
      </div>
      <div>
        <span className="code-tag">Treasury movement</span>
        <strong>{template.treasury.model}</strong>
        <small>{template.treasury.split}</small>
      </div>
      <div>
        <span className="code-tag">Reliability impact</span>
        <strong>{challenge.reliability}</strong>
        <small>fitness memory carried into future forks</small>
      </div>
    </div>
  );
}

function DiamondPassage({ template }) {
  const challenge = PrimaryChallenge({ template });
  const meanReliability = template.sealed.length
    ? template.sealed.reduce((sum, edition) => sum + edition.reliability, 0) / template.sealed.length
    : 0;
  const eligible = meanReliability >= 0.88 || Number(String(challenge.reliability).replace("+", "")) >= 10;
  return (
    <div className={"diamond-passage" + (eligible ? " eligible" : "")}>
      <div className="diamond-mark">◇</div>
      <div>
        <div className="code-tag accent">Diamond passage</div>
        <div className="diamond-title">{eligible ? "High-trust passage visible" : "Reliability passage forming"}</div>
        <p>
          Diamond appears when repeated challenges improve the organism:
          reliable attendance, validated proof, treasury continuity, and useful forks.
        </p>
      </div>
      <div className="diamond-score">
        <strong>{meanReliability ? (meanReliability * 100).toFixed(0) + "%" : "—"}</strong>
        <span>mean reliability</span>
      </div>
    </div>
  );
}

function ForkableChallengeTemplates({ template }) {
  const shortHash = (id) => {
    // CT_MUTUAL_AID_HELP_ACTION → ct·mutual-aid
    const parts = id.replace(/^ct_/i, "").toLowerCase().split("_").slice(0, 2);
    return "ct·" + parts.join("-");
  };
  return (
    <div className="forkable-templates">
      {template.challengeTemplates.map((challenge) => (
        <div key={challenge.id} className="fork-template">
          <div className="fork-template-hash">{shortHash(challenge.id)}</div>
          <strong>{challenge.title}</strong>
          <p>{challenge.proof.join(" · ")}</p>
          <div className="fork-meta">
            <span>{challenge.deadline}</span>
            <span>confirmed by {challenge.validation}</span>
            <span>{challenge.reward} earned</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ComposeQuestions() {
  return (
    <ol className="compose-questions">
      <li><span>01</span>What does this community repeatedly do?</li>
      <li><span>02</span>What proves it happened?</li>
      <li><span>03</span>Who validates it?</li>
      <li><span>04</span>What is rewarded?</li>
      <li><span>05</span>What can be forked?</li>
    </ol>
  );
}

function ActionSpine({ challenge, template }) {
  const nodes = [
    { id: "commitment", label: "Commitment", annot: challenge.stake,          annotKey: "to join" },
    { id: "attendance", label: "Attendance", annot: null },
    { id: "proof",      label: "Proof",      annot: null },
    { id: "validation", label: "Validation", annot: challenge.reliability,    annotKey: "trust" },
    { id: "reward",     label: "Reward",     annot: challenge.reward,         annotKey: "earn" },
    { id: "trace",      label: "Trace",      annot: template.treasury.model,  annotKey: "record" },
  ];
  const activeId = "proof";

  return (
    <div className="action-spine">
      <div className="action-spine-nodes">
        {nodes.map((node) => (
          <div key={node.id} className={"spine-node" + (node.id === activeId ? " active" : "")}>
            <div className="spine-node-label">{node.label}</div>
            {node.annot && (
              <div className="spine-node-annot">
                <span className="annot-key">{node.annotKey}</span>
                <span className="annot-val">{node.annot}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="action-spine-proof">
        <div className="action-spine-proof-label">Proof steps</div>
        <div className="action-spine-proof-list">
          {challenge.proof.map((item, i) => (
            <div key={item} className="proof-step">
              <span className="proof-step-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusDot() {
  return <span className="status-dot">.</span>;
}

function FamilyMark({ family }) {
  // Returns a tiny glyph mark used in the lineage / marketplace rows. Each family gets a different mark.
  const marks = {
    SC: "○", MC: "△", PC: "□", CC: "◇", CG: "▽", MA: "⬡", NL: "◐"
  };
  return <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{marks[family] || "·"}</span>;
}

Object.assign(window, {
  CodeTag, SectionRule, NumeralPlate, Bar, DefRow, ArchiveGroup, TokenList, Btn, Seg, Slider, PrimaryChallenge, ChallengeFlow, ChallengeSignal, ActiveChallengeStrip, RewardTreasuryPreview, DiamondPassage, ForkableChallengeTemplates, ComposeQuestions, FamilyMark, StatusDot, ActionSpine
});
