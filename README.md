# Factory of Culture Kernel

Infrastructure for real-world communities to operate independently.

Factory of Culture is a backend-first prototype for communities that want to own, operate, evolve, and transmit the architecture of how they gather. The app is intentionally quiet: no social feed, no Instagram mechanics, no Stripe, no Supabase, no authentication yet.

The core artifact is a living operational pattern: ritual cadence, onboarding style, reward loop, attendance logic, proof logic, treasury logic, and governance. A successful community should eventually be able to export that pattern, fork it, adapt it, and transmit it to another place.

## Product Thesis

Communities should not only use tools. They should package and transmit the architecture of how they operate.

The layers are:

- OPERA: executable organizational intelligence.
- Cardin: frequency, place, recurrence, and reward mechanics.
- Reliable: commitment, proof, validation, and member reliability.
- SYMIONE: hidden economic memory and settlement trace.
- Kernel: shared primitives for communities, circles, rituals, proofs, rewards, and treasuries.
- Artifact: forkable cultural architecture.

This prototype optimizes community continuity instead of attention extraction.

## Data Model

JSON persistence lives at `data/kernel.json`.

Entities:

- `User`: invited or active participant with reliability status.
- `Place`: physical anchor for recurrence and trust density.
- `Community`: living graph around a thesis and optional place.
- `Circle`: operational cell around a community or place.
- `Membership`: user state inside a community or circle.
- `Invite`: invitation token for a future member.
- `Ritual`: recurring event attached to a circle.
- `Challenge`: commitment linked to a ritual.
- `Attendance`: check-in record.
- `Proof`: submitted and validated artifact.
- `Reward`: simulated SYMIONE-denominated reward.
- `Treasury`: simulated community or circle balance.
- `Transaction`: simulated SYMIONE trace.
- `OperationalPattern`: forkable cultural operating shape.
- `PatternVersion`: draft or sealed version of a pattern.
- `SealedArchitecture`: immutable operating DNA snapshot.
- `PatternLicense`: private, community-use, paid-fork, or open-fork terms.
- `PatternFork`: lineage record when another community adapts a sealed architecture.
- `OutcomeMetric`: measurable evidence attached to an architecture.
- `FailureArtifact`: recorded failure/lesson, not erased history.
- `InferenceSignal`: hypothesis-worthy signal for future cultural systems intelligence.
- `PulseEvent`: temporal signal that says what is alive, forming, sealing, forking, validating, or moving now.
- `KernelEvent`: append-only event memory.

## API Routes

All routes are under `/api/kernel`.

Read:

- `GET /api/kernel` or `GET /api/kernel/state`: full state and summary.
- `GET /api/kernel/treasury`: treasuries, rewards, and transactions.
- `GET /api/kernel/patterns`: exportable operating patterns.
- `GET /api/kernel/trace`: transaction traces.
- `GET /api/kernel/challenges`: challenge templates, active records, history, and the kernel chain.
- `GET /api/kernel/challenges/templates`: forkable challenge templates from architecture and pattern species.
- `GET /api/kernel/challenges/history`: challenge records with proofs, rewards, transactions, ritual, circle, and pattern context.
- `GET /api/kernel/architecture/templates`: prebuilt architecture templates.
- `GET /api/kernel/architecture/sealed`: sealed architectures, licenses, metrics, failures, and signals.
- `GET /api/kernel/architecture/forks`: architecture fork records.
- `GET /api/kernel/architecture/signals`: outcome, failure, and inference records.
- `GET /api/kernel/pulse`: live, recent, upcoming, forming, and inference signals.
- `GET /api/kernel/front`: frontend-facing field-guide payload: species cards, pulse, marketplace editions, lineage, and proposal aperture.

Write:

- `POST /api/kernel/place`
- `POST /api/kernel/community`
- `POST /api/kernel/circle`
- `POST /api/kernel/invite`
- `POST /api/kernel/ritual`
- `POST /api/kernel/challenge` or `POST /api/kernel/challenges`
- `POST /api/kernel/challenges/activate`
- `POST /api/kernel/challenges/proof`
- `POST /api/kernel/challenges/validate`
- `POST /api/kernel/challenges/resolve`
- `POST /api/kernel/challenges/reward`
- `POST /api/kernel/challenges/seal`
- `POST /api/kernel/challenges/complete`
- `POST /api/kernel/challenges/preview`
- `POST /api/kernel/attendance`
- `POST /api/kernel/proof`
- `POST /api/kernel/challenge/complete`
- `POST /api/kernel/membership/status`
- `POST /api/kernel/transaction/preview`
- `POST /api/kernel/architecture/from-template`
- `POST /api/kernel/architecture/seal`
- `POST /api/kernel/architecture/fork`
- `POST /api/kernel/architecture/outcome`
- `POST /api/kernel/architecture/failure`
- `POST /api/kernel/architecture/inference`

Architecture templates included:

- Supper Club Season
- Music Collective
- Local Place Circle
- Challenge Cell
- Creator Guild
- Neighborhood Mutual Aid
- Nightlife Cell

The kernel chain is:

```text
Pattern -> Ritual -> Challenge -> Attendance -> Proof -> Validation -> Reward -> Treasury -> Trace -> Fitness -> Fork
```

Challenge is the universal action unit. Every pattern/species carries forkable challenge templates with stake preview, proof requirements, deadline, validation mode, reward preview, treasury impact, and reliability impact.

The challenge lifecycle is:

```text
draft -> active -> proof_submitted -> validating -> resolved -> rewarded -> sealed
```

The architecture layer supports this lifecycle:

1. Choose a prebuilt architecture.
2. Instantiate it into place/community/circle/ritual/challenge primitives.
3. Operate it through challenge commitments, attendance, proof, validation, rewards, and traces.
4. Seal it into an immutable DNA snapshot.
5. Attach license, outcome metrics, failure artifacts, and inference signals.
6. Fork it into another community/place while preserving lineage.

The pulse layer supports this doctrine:

```text
The backend records life as events.
The frontend reveals life as punctual signals.
```

Pulse event types:

- `ritual_firing`
- `proof_submitted`
- `proof_validated`
- `challenge_completed`
- `architecture_sealed`
- `architecture_forked`
- `treasury_moved`
- `proposal_forming`
- `inference_observed`

The required flow is represented directly:

1. Create a community or place.
2. Create a circle around that community/place.
3. Invite a member.
4. Create a ritual/event.
5. Create a challenge linked to the ritual.
6. Mark attendance/check-in.
7. Submit proof.
8. Complete challenge.
9. Update member status.
10. Create a simulated SYMIONE transaction preview showing commitment, proof, validation, reward, and trace.

## Frontend Cockpit

The home page is a minimal testing cockpit. It is not a social product surface.

It includes:

- dashboard
- create community/place
- create circle
- invite member
- create ritual
- create challenge
- mark attendance
- submit proof
- view treasury
- view transaction trace
- view exportable operating pattern

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run typecheck
npm run build
```

## Deploy on Vercel

This is a standard Next.js App Router project.

```bash
vercel deploy
```

Locally, JSON persistence writes to `data/kernel.json`. On Vercel, the prototype seeds from that file and writes to runtime temp storage so API routes can run without an external database. For production, replace this with a durable store; the current Vercel persistence is suitable for demos, not durable multi-user operation.

## Non-Goals

- No authentication yet.
- No Stripe.
- No Supabase.
- No external APIs.
- No feed.
- No rankings.
- No opaque scoring.
- No dopamine loops.

Keep the system forkable and easy to understand.
