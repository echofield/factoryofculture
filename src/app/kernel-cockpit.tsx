"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { KernelState, KernelSummary, MemberStatus, Proof } from "@/lib/kernel-types";

type ApiState = {
  state: KernelState;
  summary: KernelSummary;
};

const blank: ApiState = {
  state: {
    users: [],
    places: [],
    communities: [],
    circles: [],
    memberships: [],
    invites: [],
    rituals: [],
    challenges: [],
    attendance: [],
    proofs: [],
    rewards: [],
    treasuries: [],
    transactions: [],
    patterns: [],
    patternVersions: [],
    sealedArchitectures: [],
    patternLicenses: [],
    patternForks: [],
    outcomeMetrics: [],
    failureArtifacts: [],
    inferenceSignals: [],
    pulseEvents: [],
    events: []
  },
  summary: {
    users: 0,
    places: 0,
    communities: 0,
    circles: 0,
    rituals: 0,
    challenges: 0,
    proofs: 0,
    sealedArchitectures: 0,
    forks: 0,
    inferenceSignals: 0,
    livePulseEvents: 0,
    treasuryBalance: 0,
    latestTrace: null
  }
};

async function post(path: string, payload: Record<string, unknown>) {
  const response = await fetch(`/api/kernel/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "request_failed");
  }
  return json as ApiState & { result: unknown };
}

export default function KernelCockpit() {
  const [api, setApi] = useState<ApiState>(blank);
  const [error, setError] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const first = useMemo(() => {
    const state = api.state;
    return {
      placeId: state.places[0]?.id ?? "",
      communityId: state.communities[0]?.id ?? "",
      circleId: state.circles[0]?.id ?? "",
      ritualId: state.rituals[0]?.id ?? "",
      challengeId: state.challenges[0]?.id ?? "",
      userId: state.users[0]?.id ?? "",
      membershipId: state.memberships[0]?.id ?? ""
    };
  }, [api.state]);

  async function refresh() {
    const response = await fetch("/api/kernel", { cache: "no-store" });
    setApi(await response.json());
  }

  useEffect(() => {
    refresh().catch((err: Error) => setError(err.message));
  }, []);

  async function submit(path: string, payload: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const json = await post(path, payload);
      setApi({ state: json.state, summary: json.summary });
    } catch (err) {
      setError(err instanceof Error ? err.message : "request_failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell">
      <section className="masthead">
        <div>
          <div className="eyebrow">Factory of Culture Kernel</div>
          <h1>Operational DNA for real-world communities.</h1>
          <p className="lead">
            Communities should be able to own, operate, evolve, and transmit the architecture of how they gather.
          </p>
        </div>
        <div className="metric-row" aria-label="Kernel summary">
          <Metric value={api.summary.communities} label="communities" />
          <Metric value={api.summary.circles} label="circles" />
          <Metric value={api.summary.proofs} label="proofs" />
          <Metric value={api.summary.treasuryBalance} label="SYM memory" />
        </div>
      </section>

      <section className="cockpit">
        <aside className="panel stack">
          <h2>Dashboard</h2>
          {error ? <div className="error">{error}</div> : null}
          <div className="flow">
            {[
              "Place anchors the graph",
              "Community declares a thesis",
              "Circle packages the operating pattern",
              "Ritual creates recurrence",
              "Challenge creates commitment",
              "Attendance and proof create reliability",
              "SYMIONE trace records settlement"
            ].map((step, index) => (
              <div className="flow-step" key={step}>
                <div className="node">{index + 1}</div>
                <div>
                  <strong>{step}</strong>
                  <span className="small">append-only kernel event</span>
                </div>
              </div>
            ))}
          </div>
          <button className="secondary" onClick={refresh} disabled={busy}>Refresh</button>
        </aside>

        <div>
          <section className="grid">
            <KernelForm
              title="Create Place"
              tag="anchor"
              busy={busy}
              onSubmit={(data) => submit("place", data)}
              fields={[
                ["name", "Place name", "Maison Exemple"],
                ["address", "Address", "Paris"],
                ["role", "Role", "recurrence anchor"]
              ]}
            />
            <KernelForm
              title="Create Community"
              tag="graph"
              busy={busy}
              onSubmit={(data) => submit("community", { ...data, placeId: data.placeId || first.placeId })}
              fields={[
                ["name", "Community name", "Supper Club Paris"],
                ["thesis", "Thesis", "A table that turns recurring dinners into civic memory"],
                ["placeId", "Place id", first.placeId]
              ]}
            />
            <KernelForm
              title="Create Circle"
              tag="pattern"
              busy={busy}
              onSubmit={(data) => submit("circle", { ...data, communityId: data.communityId || first.communityId, placeId: data.placeId || first.placeId })}
              fields={[
                ["name", "Circle name", "Thursday Table"],
                ["purpose", "Purpose", "Host, witness, and transmit the season ritual"],
                ["communityId", "Community id", first.communityId],
                ["placeId", "Place id", first.placeId]
              ]}
            />
            <KernelForm
              title="Invite Member"
              tag="trust"
              busy={busy}
              onSubmit={(data) => submit("invite", { ...data, circleId: data.circleId || first.circleId })}
              fields={[
                ["circleId", "Circle id", first.circleId],
                ["name", "Name", "Amina"],
                ["email", "Email", "amina@example.com"]
              ]}
            />
            <KernelForm
              title="Create Ritual"
              tag="recurrence"
              busy={busy}
              onSubmit={(data) => submit("ritual", { ...data, circleId: data.circleId || first.circleId, placeId: data.placeId || first.placeId })}
              fields={[
                ["circleId", "Circle id", first.circleId],
                ["title", "Ritual title", "Thursday Table #1"],
                ["cadence", "Cadence", "weekly"],
                ["nextRunAt", "Next run", new Date().toISOString()],
                ["placeId", "Place id", first.placeId]
              ]}
            />
            <KernelForm
              title="Create Challenge"
              tag="commitment"
              busy={busy}
              onSubmit={(data) => submit("challenge", { ...data, ritualId: data.ritualId || first.ritualId, rewardAmount: Number(data.rewardAmount || 50) })}
              fields={[
                ["ritualId", "Ritual id", first.ritualId],
                ["title", "Challenge title", "Bring one useful guest"],
                ["commitment", "Commitment", "Attend, introduce one aligned person, and leave a proof note"],
                ["rewardAmount", "Reward SYM", "50"]
              ]}
            />
            <KernelForm
              title="Mark Attendance"
              tag="presence"
              busy={busy}
              onSubmit={(data) => submit("attendance", { ritualId: data.ritualId || first.ritualId, userId: data.userId || first.userId })}
              fields={[
                ["ritualId", "Ritual id", first.ritualId],
                ["userId", "User id", first.userId]
              ]}
            />
            <KernelForm
              title="Submit Proof"
              tag="artifact"
              busy={busy}
              onSubmit={(data) => submit("proof", { ...data, challengeId: data.challengeId || first.challengeId, userId: data.userId || first.userId, type: (data.type || "attestation") as Proof["type"] })}
              fields={[
                ["challengeId", "Challenge id", first.challengeId],
                ["userId", "User id", first.userId],
                ["type", "Type", "attestation"],
                ["content", "Proof", "Amina checked in and left a field note witnessed by the host."]
              ]}
            />
            <KernelForm
              title="Complete Challenge"
              tag="resolution"
              busy={busy}
              onSubmit={(data) => submit("challenge/complete", { challengeId: data.challengeId || first.challengeId, userId: data.userId || first.userId })}
              fields={[
                ["challengeId", "Challenge id", first.challengeId],
                ["userId", "User id", first.userId]
              ]}
            />
            <KernelForm
              title="Update Member"
              tag="status"
              busy={busy}
              onSubmit={(data) => submit("membership/status", { membershipId: data.membershipId || first.membershipId, status: (data.status || "reliable") as MemberStatus, reliabilityScore: Number(data.reliabilityScore || 25) })}
              fields={[
                ["membershipId", "Membership id", first.membershipId],
                ["status", "Status", "reliable"],
                ["reliabilityScore", "Reliability score", "25"]
              ]}
            />
            <KernelForm
              title="SYMIONE Preview"
              tag="trace"
              busy={busy}
              onSubmit={(data) => submit("transaction/preview", { challengeId: data.challengeId || first.challengeId, userId: data.userId || first.userId })}
              fields={[
                ["challengeId", "Challenge id", first.challengeId],
                ["userId", "User id", first.userId]
              ]}
            />
            <SystemView state={api.state} />
          </section>

          <section className="trace">
            <header>
              <h2>Transaction Trace</h2>
              <span className="tag blue">commitment / proof / validation / reward / trace</span>
            </header>
            <pre>{JSON.stringify(api.summary.latestTrace ?? api.state.transactions.at(-1) ?? {}, null, 2)}</pre>
          </section>
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function KernelForm({
  title,
  tag,
  fields,
  busy,
  onSubmit
}: {
  title: string;
  tag: string;
  fields: Array<[string, string, string]>;
  busy: boolean;
  onSubmit: (data: Record<string, string>) => void;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(form.entries()) as Record<string, string>;
    onSubmit(data);
  }

  return (
    <form className="block stack" onSubmit={handleSubmit}>
      <header>
        <h2>{title}</h2>
        <span className="tag green">{tag}</span>
      </header>
      {fields.map(([name, label, placeholder]) => (
        <label key={`${title}-${name}`}>
          {label}
          {name === "content" || name === "thesis" || name === "purpose" || name === "commitment" ? (
            <textarea name={name} placeholder={placeholder} defaultValue={placeholder} />
          ) : (
            <input name={name} placeholder={placeholder} defaultValue={placeholder} />
          )}
        </label>
      ))}
      <button disabled={busy}>Submit</button>
    </form>
  );
}

function SystemView({ state }: { state: KernelState }) {
  const pattern = state.patterns.at(-1);
  return (
    <section className="block stack">
      <header>
        <h2>View Treasury</h2>
        <span className="tag clay">living pattern</span>
      </header>
      <div className="list">
        {state.treasuries.map((treasury) => (
          <div className="item" key={treasury.id}>
            <strong>{treasury.balance} {treasury.currency}</strong>
            <span>{treasury.circleId || treasury.communityId || treasury.id}</span>
          </div>
        ))}
      </div>
      <header>
        <h2>Exportable Pattern</h2>
      </header>
      <pre>{JSON.stringify(pattern ?? {}, null, 2)}</pre>
    </section>
  );
}
