// Compose a Pattern — FC·010/00. Walk the 5 kernel questions as steps.
// State is local only — SEAL action is stubbed (TODO: wire to backend when ready).

const COMPOSE_STEPS = [
  {
    id: "action",
    num: "01",
    question: "What does this community repeatedly do?",
    hint: "Name the ritual, practice, or commitment. This becomes the challenge title.",
    type: "text",
    placeholder: "e.g. gather every Wednesday to write together"
  },
  {
    id: "proof",
    num: "02",
    question: "What proves it happened?",
    hint: "Specify one to three artifacts or signals. Proof must be witnessable by someone else.",
    type: "text",
    placeholder: "e.g. attendance log, shared artifact, peer sign-off"
  },
  {
    id: "validation",
    num: "03",
    question: "Who validates it?",
    hint: "The validator is the trust mechanism. A pattern is only as reliable as its validator.",
    type: "chips",
    options: [
      { value: "witness",    label: "Witness" },
      { value: "peer-vote",  label: "Peer vote" },
      { value: "steward",    label: "Steward" },
      { value: "self",       label: "Self-reported" }
    ]
  },
  {
    id: "reward",
    num: "04",
    question: "What is rewarded?",
    hint: "Keep rewards proportional to the action. Overcapitalization weakens the social contract.",
    type: "chips+text",
    options: [
      { value: "status",  label: "Status credit" },
      { value: "access",  label: "Access rights" },
      { value: "share",   label: "Revenue share" },
      { value: "carry",   label: "Season carry-over" }
    ],
    placeholder: "e.g. 50 SYM per validated cycle"
  },
  {
    id: "forkability",
    num: "05",
    question: "What can be forked?",
    hint: "Forkability determines how the pattern propagates. Open patterns spread faster; paid patterns sustain the author.",
    type: "chips",
    options: [
      { value: "open",   label: "Open fork" },
      { value: "paid",   label: "Paid fork" },
      { value: "invite", label: "Invite only" },
      { value: "closed", label: "Closed" }
    ]
  }
];

function ComposeScreen({ go }) {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({
    action: "",
    proof: "",
    validation: "witness",
    reward: "status",
    rewardNote: "",
    forkability: "open"
  });

  const current = COMPOSE_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === COMPOSE_STEPS.length - 1;

  const setAnswer = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));

  // Derive a working name from the action answer
  const previewName = answers.action
    ? answers.action.split(" ").slice(0, 5).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : null;

  const filled = COMPOSE_STEPS.filter(s => {
    const v = answers[s.id];
    return v && String(v).trim().length > 0;
  }).length;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <CodeTag accent>FC·010 / COMPOSE</CodeTag>
          <h2 style={{marginTop:10}}>Compose a Pattern</h2>
          <p className="deck">
            Answer five structural questions. The pattern crystallises as you write.
          </p>
        </div>
        <div style={{display:"flex", gap:10}}>
          <Btn onClick={() => go("library")}>← Library</Btn>
        </div>
      </div>

      <div className="compose-layout">

        {/* Left: stepper + active question */}
        <div className="compose-form">

          <div className="compose-stepper">
            {COMPOSE_STEPS.map((s, i) => {
              const isDone = answers[s.id] && String(answers[s.id]).trim().length > 0;
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
            <p className="compose-question-hint">{current.hint}</p>

            {current.type === "text" && (
              <textarea
                className="compose-input"
                placeholder={current.placeholder}
                value={answers[current.id] || ""}
                onChange={e => setAnswer(current.id, e.target.value)}
                rows={3}
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

            {current.type === "chips+text" && (
              <>
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
                <input
                  className="compose-input-inline"
                  style={{marginTop:12}}
                  placeholder={current.placeholder}
                  value={answers.rewardNote || ""}
                  onChange={e => setAnswer("rewardNote", e.target.value)}
                />
              </>
            )}

            <div className="compose-nav">
              {!isFirst && (
                <Btn onClick={() => setStep(step - 1)}>← Back</Btn>
              )}
              {!isLast ? (
                <Btn primary onClick={() => setStep(step + 1)} arrow>Next step</Btn>
              ) : (
                <>
                  <Btn primary onClick={() => {
                    // TODO: wire to backend — seal the composed pattern
                    go("library");
                  }} arrow>
                    Seal pattern
                  </Btn>
                  <span className="code-tag" style={{color:"var(--ink-5)"}}>local draft · no backend yet</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: live sealed preview — fills as you answer */}
        <div className="compose-preview-col">
          <SectionRule num="§·" label="Pattern forming" right={filled + " / 5 answered"} />

          <div className="compose-preview-card">
            <div className="compose-preview-badge">
              {previewName ? "COMPOSING" : "APERTURE"} · FC·NEW
            </div>

            <div style={{display:"grid", gridTemplateColumns:"100px 1fr", gap:20, alignItems:"start"}}>
              <NumeralPlate
                size="med"
                style={{width:100, height:100, aspectRatio:"1"}}
                glyph={<>00<StatusDot /></>}
                tl={"NEW"}
                br={"draft"}
              />
              <div>
                <div className="code-tag accent" style={{marginBottom:4}}>FC·NEW · DRAFT</div>
                {previewName ? (
                  <h3 className="compose-preview-name">{previewName}</h3>
                ) : (
                  <div className="compose-preview-name" style={{color:"var(--ink-5)", fontStyle:"italic", fontFamily:"var(--font-serif)", fontWeight:400, fontSize:18}}>
                    Unnamed pattern
                  </div>
                )}
                {answers.action && (
                  <p className="serif-em" style={{fontSize:13.5, marginTop:10, lineHeight:1.5}}>
                    {answers.action}
                  </p>
                )}
              </div>
            </div>

            {(answers.proof || answers.validation !== "witness") && (
              <>
                <div className="compose-preview-divider" />
                {answers.validation && (
                  <div className="compose-preview-row">
                    <span className="code-tag">Validation</span>
                    <span style={{fontSize:13}}>{answers.validation}</span>
                  </div>
                )}
                {answers.proof && (
                  <div className="compose-preview-row">
                    <span className="code-tag">Proof</span>
                    <span style={{fontSize:13, color:"var(--ink-2)"}}>{answers.proof}</span>
                  </div>
                )}
              </>
            )}

            {(answers.rewardNote || answers.reward !== "status") && (
              <>
                <div className="compose-preview-divider" />
                <div className="compose-preview-row">
                  <span className="code-tag">Reward</span>
                  <span style={{fontSize:13}}>{answers.reward}{answers.rewardNote ? " · " + answers.rewardNote : ""}</span>
                </div>
              </>
            )}

            {answers.forkability !== "open" && (
              <>
                <div className="compose-preview-divider" />
                <div className="compose-preview-row">
                  <span className="code-tag">Fork</span>
                  <span style={{fontSize:13}}>{answers.forkability}</span>
                </div>
              </>
            )}

            {!previewName && (
              <div className="compose-empty-hint">
                Answer question 01 and the pattern<br/>begins to take shape here.
              </div>
            )}

            <div className="compose-progress">
              {COMPOSE_STEPS.map((s, i) => {
                const isDone = answers[s.id] && String(answers[s.id]).trim().length > 0;
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
