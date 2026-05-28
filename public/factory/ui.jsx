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

function FamilyMark({ family }) {
  // Returns a tiny glyph mark used in the lineage / marketplace rows. Each family gets a different mark.
  const marks = {
    SC: "○", MC: "△", PC: "□", CC: "◇", CG: "▽", MA: "⬡", NL: "◐"
  };
  return <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{marks[family] || "·"}</span>;
}

Object.assign(window, {
  CodeTag, SectionRule, NumeralPlate, Bar, DefRow, ArchiveGroup, TokenList, Btn, Seg, Slider, FamilyMark
});
