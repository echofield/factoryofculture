// Marketplace — FC·050. Published sealed architectures.

function MarketplaceScreen({ go, setCurrentTemplate }) {
  const [sort, setSort] = React.useState("reliability");
  const [filter, setFilter] = React.useState("all");

  let rows = [...window.MARKETPLACE];
  if (filter !== "all") rows = rows.filter(r => r.family === filter);
  rows.sort((a, b) => {
    if (sort === "reliability") return b.reliability - a.reliability;
    if (sort === "forks") return b.forks - a.forks;
    if (sort === "sold") return b.sold - a.sold;
    if (sort === "price") {
      const pa = a.price === "free" ? 0 : Number(a.price.replace("$",""));
      const pb = b.price === "free" ? 0 : Number(b.price.replace("$",""));
      return pb - pa;
    }
    return 0;
  });

  const totalSold = window.MARKETPLACE.reduce((a,b)=>a+b.sold,0);
  const totalForks = window.MARKETPLACE.reduce((a,b)=>a+b.forks,0);
  const families = ["all", ...new Set(window.MARKETPLACE.map(r => r.family))];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>FC·050 / MARKETPLACE</CodeTag>
          <h2 style={{marginTop:10}}>Editions for sale.</h2>
          <p className="deck">
            Sealed architectures. Each row is a community pattern that has run at least one full
            cycle and exported its operating shape — not its members.
          </p>
        </div>
        <div className="right" style={{textAlign:"right", display:"grid", gap:6}}>
          <div style={{fontFamily:"var(--font-display)", fontWeight:600, fontSize:28, letterSpacing:"-0.02em"}}>
            {window.MARKETPLACE.length}
          </div>
          <div className="code-tag">Sealed editions</div>
          <div className="code-tag" style={{color:"var(--ink-4)"}}>{totalSold} forks · {totalForks} lineages</div>
        </div>
      </div>

      {/* Filter / sort bar */}
      <div style={{display:"grid", gridTemplateColumns:"auto 1fr auto", gap:24, alignItems:"center", padding:"14px 0", borderBottom:"1px solid var(--rule-2)", marginBottom:0}}>
        <div className="code-tag">Filter · Family</div>
        <div className="form-row" style={{gap:6}}>
          {families.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={"btn" + (filter === f ? " primary" : "")}
              style={{padding:"6px 12px", fontSize:10}}
            >
              {f === "all" ? "All families" : f}
            </button>
          ))}
        </div>
        <div style={{display:"flex", gap:14, alignItems:"center"}}>
          <span className="code-tag">Sort</span>
          <Seg
            value={sort}
            options={[
              {value:"reliability",label:"Reliab."},
              {value:"forks",label:"Forks"},
              {value:"sold",label:"Sold"},
              {value:"price",label:"Price"}
            ]}
            onChange={setSort}
          />
        </div>
      </div>

      <div className="mk-table">
        <div className="mk-row head">
          <span>Cat. Code</span>
          <span>Edition</span>
          <span>Reliability</span>
          <span>Lineage</span>
          <span style={{textAlign:"right"}}>Price</span>
        </div>
        {rows.map(r => (
          <div
            key={r.id}
            className="mk-row"
            onClick={() => { setCurrentTemplate(r.family); go("pattern"); }}
          >
            <span className="id">{r.id}</span>
            <div className="name-col">
              <div className="name">{r.name}</div>
              <div className="where">
                <span>{r.family} · {r.edition}</span>
                <span className="sep">·</span>
                <span>{r.city}</span>
              </div>
            </div>
            <div className="reliab-col">
              <Bar pct={r.reliability} width={120} />
              <div>
                <span className="pct">{(r.reliability*100).toFixed(0)}%</span>
                <span style={{marginLeft:8}}>attendance · resolution</span>
              </div>
            </div>
            <div className="forks-col">
              <div><span className="n">{r.forks}</span> <span style={{marginLeft:6}}>forks</span></div>
              <div style={{color:"var(--ink-5)"}}>{r.sold} sold</div>
            </div>
            <div className="price-col">
              <span className={"price" + (r.price === "free" ? " free" : "")}>{r.price}</span>
              {r.status === "draft" && <span className="draft">draft</span>}
            </div>
          </div>
        ))}
      </div>

      <SectionRule num="§·" label="License Models" right="Choose at seal" />
      <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24}}>
        {[
          {code:"L·01", name:"Open Fork", body:"Anyone may fork. Author named in lineage. No payment."},
          {code:"L·02", name:"Paid Edition", body:"One-time price. Buyer receives the sealed pattern, joins lineage."},
          {code:"L·03", name:"Closed", body:"Pattern visible, not forkable. Used to publish proof-of-architecture only."}
        ].map(l => (
          <div key={l.code} style={{border:"1px solid var(--rule)", padding:"18px 20px"}}>
            <div className="code-tag accent" style={{marginBottom:6}}>{l.code}</div>
            <div style={{fontFamily:"var(--font-display)", fontWeight:600, fontSize:18, letterSpacing:"-0.01em"}}>{l.name}</div>
            <div className="serif-em" style={{fontSize:14, marginTop:8}}>{l.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.MarketplaceScreen = MarketplaceScreen;
