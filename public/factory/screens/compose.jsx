// Compose — 5 steps, plain language, no protocol vocabulary.
// One question per breath. Live card on the right fills in as you answer.

const COMPOSE_STEPS = [
  {
    id: "name",
    num: "01",
    question: "What's the name?",
    hint: "A night, a crew, a circle. Whatever it is.",
    type: "text",
    placeholder: "Sunday Suppers · The Warehouse · Tuesday Practice"
  },
  {
    id: "where",
    num: "02",
    question: "Where does it live?",
    hint: "A place, a city, or anywhere.",
    type: "chips+text",
    options: [
      { value: "venue",  label: "A venue" },
      { value: "cafe",   label: "A café or bar" },
      { value: "online", label: "Online" },
      { value: "moves",  label: "Moves around" }
    ],
    placeholder: "city (optional)"
  },
  {
    id: "frequency",
    num: "03",
    question: "How often does it happen?",
    hint: "",
    type: "chips",
    options: [
      { value: "once",     label: "Once" },
      { value: "weekly",   label: "Weekly" },
      { value: "monthly",  label: "Monthly" },
      { value: "season",   label: "Each season" },
      { value: "whenever", label: "Whenever" }
    ]
  },
  {
    id: "proof",
    num: "04",
    question: "What proves someone was really there?",
    hint: "Pick whatever fits. You can choose more than one.",
    type: "chips-multi",
    options: [
      { value: "checkin",     label: "They checked in" },
      { value: "contributed", label: "They contributed something" },
      { value: "witnessed",   label: "Someone witnessed it" },
      { value: "challenge",   label: "They completed a challenge" },
      { value: "organizer",   label: "The organizer confirms" }
    ]
  },
  {
    id: "earn",
    num: "05",
    question: "What do people get for showing up?",
    hint: "Pick whatever fits. You can choose more than one.",
    type: "chips-multi",
    options: [
      { value: "access",  label: "Access to the next one" },
      { value: "share",   label: "A share of what we earn" },
      { value: "status",  label: "Status in the group" },
      { value: "invite",  label: "An invitation right" },
      { value: "record",  label: "Nothing yet — just the record" }
    ]
  }
];

function ComposeScreen({ go }) {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({
    name: "",
    whereType: "",
    whereCity: "",
    frequency: "",
    proof: [],
    earn: []
  });

  const current = COMPOSE_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === COMPOSE_STEPS.length - 1;

  const setAnswer = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));

  const toggleMulti = (key, val) => {
    setAnswers(prev => {
      const list = prev[key] || [];
      return {
        ...prev,
        [key]: list.includes(val) ? list.filter(v => v !== val) : [...list, val]
      };
    });
  };

  const previewName = answers.name || null;
  const filled = COMPOSE_STEPS.filter(s => {
    if (s.id === "name")      return !!answers.name;
    if (s.id === "where")     return !!answers.whereType || !!answers.whereCity;
    if (s.id === "frequency") return !!answers.frequency;
    if (s.id === "proof")     return answers.proof.length > 0;
    if (s.id === "earn")      return answers.earn.length > 0;
    return false;
  }).length;

  // Plain-language readback for the preview card
  const labelOf = (stepId, val) => {
    const s = COMPOSE_STEPS.find(x => x.id === stepId);
    const opt = s?.options?.find(o => o.value === val);
    return opt ? opt.label : val;
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>FC·010 / NEW</CodeTag>
          <h2 style={{marginTop:10}}>Set it up.</h2>
          <p className="deck">
            Five questions. Plain words. The card fills in as you answer.
          </p>
        </div>
        <div style={{display:"flex", gap:10}}>
          <Btn onClick={() => go("archetype")}>← Back</Btn>
        </div>
      </div>

      <div className="compose-layout">

        {/* Left: stepper + active question */}
        <div className="compose-form">

          <div className="compose-stepper">
            {COMPOSE_STEPS.map((s, i) => {
              const isDone =
                s.id === "name"      ? !!answers.name :
                s.id === "where"     ? (!!answers.whereType || !!answers.whereCity) :
                s.id === "frequency" ? !!answers.frequency :
                s.id === "proof"     ? answers.proof.length > 0 :
                s.id === "earn"      ? answers.earn.length > 0 : false;
              return (
                <div
                  key={s.id}
                  className={"compose-step-pip" + (i === step ? " active" : "") + (isDone ? " done" : "")}
                  onClick={() => setStep(i)}
                >
                  <span className="pip-num">{s.num}</span>
                  <div className="pip-check"></div>
                </div>
              );
            })}
          </div>

          <div className="compose-question-block">
            <div className="compose-question-num">{current.num} / 05</div>
            <h3 className="compose-question-text">{current.question}</h3>
            {current.hint && <p className="compose-question-hint">{current.hint}</p>}

            {current.type === "text" && (
              <input
                className="compose-input-inline"
                style={{fontFamily:"var(--font-serif)", fontSize:18, fontStyle:"italic", padding:"16px 18px"}}
                placeholder={current.placeholder}
                value={answers.name || ""}
                onChange={e => setAnswer("name", e.target.value)}
                autoFocus
              />
            )}

            {current.type === "chips" && (
              <div className="compose-chips">
                {current.options.map(opt => (
                  <button
                    key={opt.value}
                    className={"compose-chip" + (answers[current.id] === opt.value ? " selected" : "")}
                    onClick={() => setAnswer(current.id, opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {current.type === "chips-multi" && (
              <div className="compose-chips">
                {current.options.map(opt => {
                  const selected = (answers[current.id] || []).includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      className={"compose-chip" + (selected ? " selected" : "")}
                      onClick={() => toggleMulti(current.id, opt.value)}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            {current.type === "chips+text" && (
              <>
                <div className="compose-chips">
                  {current.options.map(opt => (
                    <button
                      key={opt.value}
                      className={"compose-chip" + (answers.whereType === opt.value ? " selected" : "")}
                      onClick={() => setAnswer("whereType", opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <input
                  className="compose-input-inline"
                  style={{marginTop:14}}
                  placeholder={current.placeholder}
                  value={answers.whereCity || ""}
                  onChange={e => setAnswer("whereCity", e.target.value)}
                />
              </>
            )}

            <div className="compose-nav">
              {!isFirst && (
                <Btn onClick={() => setStep(step - 1)}>← Back</Btn>
              )}
              {!isLast ? (
                <Btn primary onClick={() => setStep(step + 1)} arrow>Next</Btn>
              ) : (
                <>
                  <Btn onClick={() => go("library")}>Save as draft</Btn>
                  <Btn primary onClick={() => {
                    // TODO: wire to backend — seal the composed card
                    go("library");
                  }} arrow>Seal it</Btn>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: live card preview */}
        <div className="compose-preview-col">
          <div style={{
            fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.18em",
            textTransform:"uppercase", color:"var(--ink-4)", marginBottom:18,
            display:"flex", justifyContent:"space-between"
          }}>
            <span>Your card</span>
            <span style={{color:"var(--accent)"}}>{filled} / 5 answered</span>
          </div>

          <div className="compose-preview-card">
            <div className="compose-preview-badge">
              {previewName ? "DRAFT" : "EMPTY"}
            </div>

            <div style={{display:"grid", gridTemplateColumns:"100px 1fr", gap:20, alignItems:"start"}}>
              <NumeralPlate
                size="med"
                style={{width:100, height:100, aspectRatio:"1"}}
                glyph={<>00</>}
                tl={"NEW"}
                br={"draft"}
              />
              <div>
                <div className="code-tag accent" style={{marginBottom:4}}>FC·NEW</div>
                {previewName ? (
                  <h3 className="compose-preview-name">{previewName}</h3>
                ) : (
                  <div style={{color:"var(--ink-5)", fontStyle:"italic", fontFamily:"var(--font-serif)", fontWeight:400, fontSize:18, marginTop:6}}>
                    Name your thing
                  </div>
                )}
                {(answers.whereType || answers.whereCity) && (
                  <p className="serif-em" style={{fontSize:13.5, marginTop:10, lineHeight:1.5}}>
                    {labelOf("where", answers.whereType)}{answers.whereCity ? " · " + answers.whereCity : ""}
                  </p>
                )}
              </div>
            </div>

            {answers.frequency && (
              <>
                <div className="compose-preview-divider" />
                <div className="compose-preview-row">
                  <span className="code-tag">How often</span>
                  <span style={{fontSize:13.5}}>{labelOf("frequency", answers.frequency)}</span>
                </div>
              </>
            )}

            {answers.proof.length > 0 && (
              <>
                <div className="compose-preview-divider" />
                <div className="compose-preview-row">
                  <span className="code-tag">Proves it</span>
                  <span style={{fontSize:13.5, color:"var(--ink-2)"}}>
                    {answers.proof.map(v => labelOf("proof", v)).join(" · ")}
                  </span>
                </div>
              </>
            )}

            {answers.earn.length > 0 && (
              <>
                <div className="compose-preview-divider" />
                <div className="compose-preview-row">
                  <span className="code-tag">They earn</span>
                  <span style={{fontSize:13.5, color:"var(--ink-2)"}}>
                    {answers.earn.map(v => labelOf("earn", v)).join(" · ")}
                  </span>
                </div>
              </>
            )}

            {!previewName && (
              <div className="compose-empty-hint">
                Answer the first question<br/>and the card begins to take shape.
              </div>
            )}

            <div className="compose-progress">
              {COMPOSE_STEPS.map((s, i) => {
                const isDone =
                  s.id === "name"      ? !!answers.name :
                  s.id === "where"     ? (!!answers.whereType || !!answers.whereCity) :
                  s.id === "frequency" ? !!answers.frequency :
                  s.id === "proof"     ? answers.proof.length > 0 :
                  s.id === "earn"      ? answers.earn.length > 0 : false;
                return (
                  <div
                    key={s.id}
                    className={"progress-pip" + (isDone ? " done" : "") + (i === step ? " current" : "")}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ComposeScreen = ComposeScreen;
