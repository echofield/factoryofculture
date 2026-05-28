import { promises as fs } from "fs";
import os from "os";
import path from "path";
import type {
  ArchitectureLicenseType,
  ArchitectureTemplate,
  Attendance,
  Challenge,
  ChallengeTemplate,
  ChallengeValidationMode,
  FailureArtifact,
  InferenceSignal,
  KernelEvent,
  KernelId,
  KernelState,
  MemberStatus,
  OperationalPattern,
  OutcomeMetric,
  PatternFork,
  PatternLicense,
  PatternVersion,
  Proof,
  PulseEvent,
  Reward,
  SealedArchitecture,
  Transaction,
  Treasury,
  User
} from "./kernel-types";

const bundledDataPath = path.join(process.cwd(), "data", "kernel.json");
const dataPath = process.env.VERCEL
  ? path.join(os.tmpdir(), "factory-of-culture-kernel", "kernel.json")
  : bundledDataPath;

const emptyState: KernelState = {
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
};

function challengeTemplate(input: {
  id: KernelId;
  title: string;
  commitment: string;
  rewardAmount: number;
  proofRequirements: string[];
  validationMode: ChallengeValidationMode;
  stakeAmount?: number;
  deadlineOffsetDays?: number;
  reliabilityImpact?: number;
  stakeToReserve?: number;
  forkable?: boolean;
}): ChallengeTemplate {
  const stakeAmount = Number(input.stakeAmount ?? 25);
  const rewardAmount = Number(input.rewardAmount);
  return {
    id: input.id,
    title: input.title,
    commitment: input.commitment,
    stakeAmount,
    stakeCurrency: "SYM",
    rewardAmount,
    deadlineOffsetDays: Number(input.deadlineOffsetDays ?? 7),
    proofRequirements: input.proofRequirements,
    validationMode: input.validationMode,
    reliabilityImpact: Number(input.reliabilityImpact ?? 8),
    treasuryImpact: {
      stakeToReserve: Number(input.stakeToReserve ?? Math.round(stakeAmount * 0.2)),
      rewardFromTreasury: rewardAmount
    },
    forkable: input.forkable ?? true
  };
}

export const architectureTemplates: ArchitectureTemplate[] = [
  {
    id: "tpl_supper_club_season",
    name: "Supper Club Season",
    category: "supper_club",
    thesis: "A recurring table that turns hospitality into community memory.",
    placeRole: "host venue and trust anchor",
    circlePurpose: "Host a seasonal dinner cadence with reliable members and guest transmission.",
    ritualCadence: "weekly or monthly table",
    onboardingStyle: "invite-only, first attendance, host witness, first contribution",
    memberRoles: ["host", "guest-bringer", "witness", "steward"],
    ritualTemplates: [{ title: "Season Table", cadence: "weekly" }],
    challengeTemplates: [
      challengeTemplate({
        id: "ct_supper_guest",
        title: "Bring one aligned guest",
        commitment: "Attend the table, bring one useful guest, and leave a field note.",
        rewardAmount: 50,
        stakeAmount: 20,
        deadlineOffsetDays: 7,
        proofRequirements: ["attendance check-in", "guest sponsor note", "host witness", "field note"],
        validationMode: "host",
        reliabilityImpact: 8
      }),
      challengeTemplate({
        id: "ct_supper_host_handoff",
        title: "Host handoff",
        commitment: "Prepare the next host with venue, guest, and ritual notes.",
        rewardAmount: 80,
        stakeAmount: 30,
        deadlineOffsetDays: 3,
        proofRequirements: ["handoff note", "next host confirmation", "venue readiness check"],
        validationMode: "witness",
        reliabilityImpact: 10
      })
    ],
    status: "live",
    fitnessScore: 0.91,
    populationCount: 3,
    forkCount: 21,
    joinedIndexAt: "2026-01-12T00:00:00.000Z",
    editorialAttestation: "The long table keeps its memory through host rotation and witnessed contribution.",
    currentCycleState: "running",
    nextRitualAt: "2026-06-07T19:30:00.000Z",
    proofRules: ["attendance check-in", "host attestation", "field note"],
    rewardLoop: "host credit, member reliability, treasury continuity",
    attendanceLogic: "recurring attendance increases reliability only when paired with contribution",
    treasuryLogic: "season treasury funds hosting continuity and rewards completed contributions",
    governance: "steward validates proofs and rotates host responsibilities"
  },
  {
    id: "tpl_music_collective",
    name: "Music Collective",
    category: "music_collective",
    thesis: "A collective that turns sessions, venues, and contribution into durable creative infrastructure.",
    placeRole: "studio, rehearsal room, or venue anchor",
    circlePurpose: "Coordinate recurring sessions, contribution challenges, and venue trust.",
    ritualCadence: "weekly session, monthly showcase",
    onboardingStyle: "invite, jam/session attendance, contribution proof",
    memberRoles: ["artist", "producer", "engineer", "venue liaison", "steward"],
    ritualTemplates: [
      { title: "Weekly Session", cadence: "weekly" },
      { title: "Monthly Showcase", cadence: "monthly" }
    ],
    challengeTemplates: [
      challengeTemplate({
        id: "ct_music_session_contribution",
        title: "Session contribution",
        commitment: "Attend the session and contribute one usable creative asset or support action.",
        rewardAmount: 60,
        stakeAmount: 25,
        deadlineOffsetDays: 7,
        proofRequirements: ["session check-in", "asset link or support note", "peer attestation"],
        validationMode: "peer",
        reliabilityImpact: 8
      }),
      challengeTemplate({
        id: "ct_music_venue_relationship",
        title: "Venue relationship",
        commitment: "Maintain one venue relationship and document the next useful opening.",
        rewardAmount: 90,
        stakeAmount: 35,
        deadlineOffsetDays: 14,
        proofRequirements: ["venue contact note", "next opening", "steward confirmation"],
        validationMode: "witness",
        reliabilityImpact: 11
      })
    ],
    status: "live",
    fitnessScore: 0.89,
    populationCount: 2,
    forkCount: 10,
    joinedIndexAt: "2026-01-19T00:00:00.000Z",
    editorialAttestation: "The strongest collectives bind venue reliability to creative contribution.",
    currentCycleState: "running",
    nextRitualAt: "2026-06-02T20:00:00.000Z",
    proofRules: ["session check-in", "asset link", "peer attestation", "venue note"],
    rewardLoop: "studio time, performance slot, shared revenue memory",
    attendanceLogic: "presence matters when it compounds into contribution and venue reliability",
    treasuryLogic: "collective treasury tracks rewards, access credits, and event continuity",
    governance: "stewards validate proofs and protect non-extractive contribution loops"
  },
  {
    id: "tpl_place_circle",
    name: "Local Place Circle",
    category: "place_circle",
    thesis: "A place becomes an anchor for recurrence, trust density, and useful local action.",
    placeRole: "physical anchor",
    circlePurpose: "Build a circle around a real place with recurring member action.",
    ritualCadence: "weekly gathering",
    onboardingStyle: "place visit, invitation, contribution, witness",
    memberRoles: ["regular", "host", "place steward", "witness"],
    ritualTemplates: [{ title: "Place Gathering", cadence: "weekly" }],
    challengeTemplates: [
      challengeTemplate({
        id: "ct_place_useful_action",
        title: "Useful local action",
        commitment: "Complete one useful action for the place or circle and submit proof.",
        rewardAmount: 45,
        stakeAmount: 15,
        deadlineOffsetDays: 7,
        proofRequirements: ["place check-in", "action note", "place steward validation"],
        validationMode: "host",
        reliabilityImpact: 7
      })
    ],
    status: "live",
    fitnessScore: 0.85,
    populationCount: 2,
    forkCount: 10,
    joinedIndexAt: "2026-02-02T00:00:00.000Z",
    editorialAttestation: "Place-anchored circles turn regularity into obligations without becoming a feed.",
    currentCycleState: "running",
    nextRitualAt: "2026-06-04T18:00:00.000Z",
    proofRules: ["check-in", "photo/url/note proof", "place steward validation"],
    rewardLoop: "access, recognition, discount, or circle credit",
    attendanceLogic: "check-ins build place memory only when validated against contribution",
    treasuryLogic: "treasury supports continuity around the place",
    governance: "place steward validates local contributions"
  },
  {
    id: "tpl_challenge_cell",
    name: "Challenge Cell",
    category: "challenge_cell",
    thesis: "Small groups build trust by declaring commitments, submitting proof, and resolving outcomes.",
    placeRole: "optional meeting anchor",
    circlePurpose: "Run finite commitment cells with proof and resolution.",
    ritualCadence: "fixed sprint",
    onboardingStyle: "commitment declaration and peer witness",
    memberRoles: ["challenger", "witness", "resolver"],
    ritualTemplates: [{ title: "Commitment Sprint", cadence: "14 days" }],
    challengeTemplates: [
      challengeTemplate({
        id: "ct_commitment_finite",
        title: "Finite commitment",
        commitment: "Declare one measurable commitment, complete it by deadline, and submit proof.",
        rewardAmount: 70,
        stakeAmount: 50,
        deadlineOffsetDays: 21,
        proofRequirements: ["dated declaration", "proof artifact", "resolver note"],
        validationMode: "peer",
        reliabilityImpact: 12,
        stakeToReserve: 20
      })
    ],
    status: "live",
    fitnessScore: 0.73,
    populationCount: 2,
    forkCount: 24,
    joinedIndexAt: "2026-02-09T00:00:00.000Z",
    editorialAttestation: "Finite cells are strongest when failure emits a record instead of shame.",
    currentCycleState: "validating",
    nextRitualAt: "2026-06-10T12:00:00.000Z",
    proofRules: ["deadline", "attestation", "proof artifact", "resolution note"],
    rewardLoop: "resolution increases reliability and unlocks stronger commitments",
    attendanceLogic: "attendance is secondary to resolution rate",
    treasuryLogic: "symbolic rewards or stakes settle only after validation",
    governance: "resolver validates proof and emits success or failure artifact"
  },
  {
    id: "tpl_creator_guild",
    name: "Creator Guild",
    category: "creator_guild",
    thesis: "A production guild where recurring sprints turn creative output into shared trust.",
    placeRole: "studio, workspace, or online/offline hub",
    circlePurpose: "Coordinate production sprints, review rituals, and publication proofs.",
    ritualCadence: "weekly sprint, monthly review",
    onboardingStyle: "portfolio signal, sprint participation, peer review",
    memberRoles: ["creator", "reviewer", "publisher", "steward"],
    ritualTemplates: [
      { title: "Production Sprint", cadence: "weekly" },
      { title: "Guild Review", cadence: "monthly" }
    ],
    challengeTemplates: [
      challengeTemplate({
        id: "ct_creator_publish_artifact",
        title: "Publish one artifact",
        commitment: "Ship one public artifact and submit the trace.",
        rewardAmount: 65,
        stakeAmount: 25,
        deadlineOffsetDays: 30,
        proofRequirements: ["published URL", "peer review", "shipping note"],
        validationMode: "peer",
        reliabilityImpact: 9
      })
    ],
    status: "live",
    fitnessScore: 0.83,
    populationCount: 2,
    forkCount: 10,
    joinedIndexAt: "2026-02-16T00:00:00.000Z",
    editorialAttestation: "The guild holds when peer review is treated as labor, not commentary.",
    currentCycleState: "running",
    nextRitualAt: "2026-06-01T09:00:00.000Z",
    proofRules: ["published URL", "peer review", "shipping note"],
    rewardLoop: "visibility, shared fund, reputation, access",
    attendanceLogic: "review attendance compounds when tied to shipped artifacts",
    treasuryLogic: "guild treasury rewards shipping and review labor",
    governance: "reviewers validate output quality and steward resolves disputes"
  },
  {
    id: "tpl_mutual_aid_circle",
    name: "Neighborhood Mutual Aid",
    category: "mutual_aid",
    thesis: "A local circle turns needs, commitments, and validated help into durable trust.",
    placeRole: "neighborhood anchor",
    circlePurpose: "Coordinate mutual aid commitments with proof and resource allocation.",
    ritualCadence: "weekly needs review",
    onboardingStyle: "neighbor invitation, need/context witness, first completed help action",
    memberRoles: ["neighbor", "helper", "witness", "allocator"],
    ritualTemplates: [{ title: "Needs Review", cadence: "weekly" }],
    challengeTemplates: [
      challengeTemplate({
        id: "ct_mutual_aid_help_action",
        title: "Complete one help action",
        commitment: "Accept one concrete need, complete it, and submit witnessed proof.",
        rewardAmount: 40,
        stakeAmount: 10,
        deadlineOffsetDays: 5,
        proofRequirements: ["request scope", "completion note", "recipient or witness attestation"],
        validationMode: "witness",
        reliabilityImpact: 9
      })
    ],
    status: "forming",
    fitnessScore: 0.92,
    populationCount: 1,
    forkCount: 3,
    joinedIndexAt: "2026-03-02T00:00:00.000Z",
    editorialAttestation: "Mutual aid patterns must remember completed help without exposing private need.",
    currentCycleState: "forming",
    nextRitualAt: "2026-06-06T10:00:00.000Z",
    proofRules: ["request record", "completion note", "recipient or witness attestation"],
    rewardLoop: "trust memory, resource allocation, continuity credit",
    attendanceLogic: "presence supports trust but completed help actions carry more weight",
    treasuryLogic: "treasury allocates resources according to validated need and completed help",
    governance: "allocator and witness separate need validation from reward settlement"
  },
  {
    id: "tpl_nightlife_cell",
    name: "Nightlife Cell",
    category: "nightlife_cell",
    thesis: "A recurring night where door, floor, resident, and closer roles turn a scene into reliable cultural infrastructure.",
    placeRole: "club, warehouse, bar, or nocturnal room",
    circlePurpose: "Run a season of nights with door trust, floor health, resident continuity, and ritual close.",
    ritualCadence: "monthly night",
    onboardingStyle: "guest by resident, work one door/floor role, then earn booking or steward access",
    memberRoles: ["resident", "door", "floor host", "closer", "steward"],
    ritualTemplates: [{ title: "Last Friday Night", cadence: "monthly" }],
    challengeTemplates: [
      challengeTemplate({
        id: "ct_nightlife_close_clean",
        title: "Close the room cleanly",
        commitment: "Run the night, file the closer note, and submit no-incident or incident proof.",
        rewardAmount: 110,
        stakeAmount: 45,
        deadlineOffsetDays: 2,
        proofRequirements: ["door count log", "floor health note", "incident attestation", "closer note"],
        validationMode: "host",
        reliabilityImpact: 12
      }),
      challengeTemplate({
        id: "ct_nightlife_resident_contribution",
        title: "Resident contribution",
        commitment: "Record the set, file attendance/door count, and name one useful fork signal.",
        rewardAmount: 85,
        stakeAmount: 35,
        deadlineOffsetDays: 3,
        proofRequirements: ["set recording", "door count", "fork signal note"],
        validationMode: "witness",
        reliabilityImpact: 9
      })
    ],
    status: "live",
    fitnessScore: 0.82,
    populationCount: 3,
    forkCount: 19,
    joinedIndexAt: "2026-03-16T00:00:00.000Z",
    editorialAttestation: "Reliability is the difference between a scene and a party.",
    currentCycleState: "running",
    nextRitualAt: "2026-06-26T23:00:00.000Z",
    proofRules: ["door count log", "set recording", "floor health note", "incident attestation"],
    rewardLoop: "resident slot priority, door share, invite rights, reserve continuity",
    attendanceLogic: "attendance is weighted by role completion and room health, not crowd volume",
    treasuryLogic: "door revenue splits between residents, staff, and a reserve for the next night",
    governance: "door has refusal authority, closer files the night record, steward calls review after failures"
  }
];

function now() {
  return new Date().toISOString();
}

function plusHours(baseIso: string, hours: number) {
  return new Date(new Date(baseIso).getTime() + hours * 60 * 60 * 1000).toISOString();
}

function plusDays(baseIso: string, days: number) {
  return plusHours(baseIso, days * 24);
}

function id(prefix: string): KernelId {
  return `${prefix}_${crypto.randomUUID().slice(0, 12)}`;
}

function defaultChallengeTemplates(): ChallengeTemplate[] {
  return [
    challengeTemplate({
      id: "ct_default_commitment",
      title: "Useful commitment",
      commitment: "Declare one concrete action, complete it by deadline, and submit proof.",
      rewardAmount: 50,
      stakeAmount: 20,
      deadlineOffsetDays: 7,
      proofRequirements: ["attendance or action record", "proof artifact", "witness or steward validation"],
      validationMode: "witness",
      reliabilityImpact: 8
    })
  ];
}

function cloneChallengeTemplates(templates: ChallengeTemplate[]) {
  return templates.map((template) => ({
    ...template,
    proofRequirements: [...template.proofRequirements],
    treasuryImpact: { ...template.treasuryImpact }
  }));
}

function isValidationMode(value: unknown): value is ChallengeValidationMode {
  return value === "self" || value === "peer" || value === "host" || value === "witness" || value === "automatic";
}

function isChallengeStatus(value: unknown): value is Challenge["status"] {
  return (
    value === "draft" ||
    value === "active" ||
    value === "proof_submitted" ||
    value === "validating" ||
    value === "resolved" ||
    value === "rewarded" ||
    value === "sealed"
  );
}

function normalizeProofRequirements(value: unknown, fallback: string[]) {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(/[|,\n]/).map((item) => item.trim()).filter(Boolean);
  }
  return fallback;
}

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  try {
    await fs.access(dataPath);
  } catch {
    let seed = emptyState;
    try {
      seed = JSON.parse(await fs.readFile(bundledDataPath, "utf8")) as KernelState;
    } catch {
      seed = emptyState;
    }
    await fs.writeFile(dataPath, `${JSON.stringify(seed, null, 2)}\n`, "utf8");
  }
}

export async function readKernel(): Promise<KernelState> {
  await ensureDataFile();
  const raw = await fs.readFile(dataPath, "utf8");
  return { ...emptyState, ...JSON.parse(raw) } as KernelState;
}

export async function writeKernel(state: KernelState): Promise<KernelState> {
  await ensureDataFile();
  await fs.writeFile(dataPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  return state;
}

export async function updateKernel(mutator: (state: KernelState) => KernelState | void) {
  const state = await readKernel();
  const result = mutator(state) ?? state;
  return writeKernel(result);
}

function appendEvent(
  state: KernelState,
  type: string,
  entityType: string,
  entityId: KernelId,
  details: Record<string, unknown> = {},
  actorId: KernelId | null = null
): KernelEvent {
  const event: KernelEvent = {
    id: id("evt"),
    type,
    actorId,
    entityType,
    entityId,
    details,
    createdAt: now()
  };
  state.events.push(event);
  return event;
}

function emitPulseEvent(
  state: KernelState,
  input: Omit<PulseEvent, "id" | "occurredAt" | "visibleUntil"> & {
    occurredAt?: string;
    visibleUntil?: string;
  }
): PulseEvent {
  const occurredAt = input.occurredAt || now();
  const pulse: PulseEvent = {
    id: id("pls"),
    type: input.type,
    patternId: input.patternId,
    circleId: input.circleId,
    sealedArchitectureId: input.sealedArchitectureId,
    title: input.title,
    description: input.description,
    intensity: input.intensity,
    occurredAt,
    visibleUntil: input.visibleUntil || plusHours(occurredAt, 168)
  };
  state.pulseEvents.push(pulse);
  return pulse;
}

export function getKernelPulse(state: KernelState) {
  const timestamp = now();
  const visible = state.pulseEvents
    .filter((pulse) => pulse.visibleUntil >= timestamp)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  return {
    liveNow: visible.filter((pulse) =>
      ["ritual_firing", "proof_submitted", "proof_validated", "challenge_completed", "treasury_moved"].includes(pulse.type)
    ),
    recent: visible.slice(0, 20),
    upcoming: visible
      .filter((pulse) => pulse.type === "ritual_firing" && pulse.occurredAt > timestamp)
      .sort((a, b) => a.occurredAt.localeCompare(b.occurredAt)),
    forming: visible.filter((pulse) => pulse.type === "proposal_forming"),
    inference: state.inferenceSignals.slice(-10).reverse()
  };
}

export function summarizeKernel(state: KernelState) {
  const pulse = getKernelPulse(state);
  return {
    users: state.users.length,
    places: state.places.length,
    communities: state.communities.length,
    circles: state.circles.length,
    rituals: state.rituals.length,
    challenges: state.challenges.length,
    proofs: state.proofs.length,
    sealedArchitectures: state.sealedArchitectures.length,
    forks: state.patternForks.length,
    inferenceSignals: state.inferenceSignals.length,
    livePulseEvents: pulse.liveNow.length,
    treasuryBalance: state.treasuries.reduce((sum, treasury) => sum + treasury.balance, 0),
    latestTrace: state.transactions.at(-1) ?? null
  };
}

export function listChallengeTemplates(state: KernelState) {
  const patternTemplates = state.patterns.flatMap((pattern) =>
    (pattern.challengeTemplates?.length ? pattern.challengeTemplates : defaultChallengeTemplates()).map((template) => ({
      ...template,
      patternId: pattern.id,
      patternName: pattern.name,
      source: "pattern"
    }))
  );
  const architectureTemplateTemplates = architectureTemplates.flatMap((template) =>
    template.challengeTemplates.map((challenge) => ({
      ...challenge,
      architectureTemplateId: template.id,
      architectureTemplateName: template.name,
      source: "architecture_template"
    }))
  );
  return [...architectureTemplateTemplates, ...patternTemplates];
}

export function getChallengeHistory(state: KernelState) {
  return state.challenges.map((challenge) => {
    const proofs = state.proofs.filter((proof) => proof.challengeId === challenge.id);
    const rewards = state.rewards.filter((reward) => reward.challengeId === challenge.id);
    const transactions = state.transactions.filter((transaction) => transaction.challengeId === challenge.id);
    const ritual = state.rituals.find((item) => item.id === challenge.ritualId) ?? null;
    const circle = ritual ? state.circles.find((item) => item.id === ritual.circleId) ?? null : null;
    const pattern = circle ? state.patterns.find((item) => item.circleId === circle.id) ?? null : null;
    return {
      challenge,
      ritual,
      circle,
      pattern,
      proofs,
      rewards,
      transactions
    };
  });
}

export function createPlace(state: KernelState, input: { name: string; address: string; role?: string }) {
  const place = {
    id: id("plc"),
    name: input.name.trim(),
    address: input.address.trim(),
    role: input.role?.trim() || "anchor",
    createdAt: now()
  };
  state.places.push(place);
  appendEvent(state, "place.created", "place", place.id, { role: place.role });
  return place;
}

export function createCommunity(
  state: KernelState,
  input: { name: string; thesis: string; placeId?: KernelId | null }
) {
  const community = {
    id: id("com"),
    name: input.name.trim(),
    thesis: input.thesis.trim(),
    placeId: input.placeId || null,
    createdAt: now()
  };
  const treasury: Treasury = {
    id: id("try"),
    communityId: community.id,
    circleId: null,
    balance: 1000,
    currency: "SYM",
    createdAt: now(),
    updatedAt: now()
  };
  state.communities.push(community);
  state.treasuries.push(treasury);
  appendEvent(state, "community.created", "community", community.id, { placeId: community.placeId });
  return community;
}

export function createCircle(
  state: KernelState,
  input: { name: string; purpose: string; communityId?: KernelId | null; placeId?: KernelId | null }
) {
  const circle = {
    id: id("cir"),
    name: input.name.trim(),
    purpose: input.purpose.trim(),
    communityId: input.communityId || null,
    placeId: input.placeId || null,
    patternId: "",
    createdAt: now()
  };
  const pattern: OperationalPattern = {
    id: id("pat"),
    circleId: circle.id,
    name: `${circle.name} operating pattern`,
    templateId: null,
    status: "forming",
    fitnessScore: 0,
    populationCount: 0,
    forkCount: 0,
    joinedIndexAt: null,
    editorialAttestation: null,
    currentCycleState: "forming",
    nextRitualAt: null,
    ritualCadence: "weekly recurrence",
    onboardingStyle: "invitation, witness, first contribution",
    rewardLoop: "commitment -> proof -> validation -> symbolic settlement",
    attendanceLogic: "check-in creates reliability memory",
    proofLogic: "submitted artifacts are validated before reward",
    treasuryLogic: "circle rewards draw from a shared SYMIONE memory treasury",
    governance: "circle steward can update member status after resolved actions",
    challengeTemplates: defaultChallengeTemplates(),
    lineage: [],
    createdAt: now()
  };
  circle.patternId = pattern.id;
  const treasury: Treasury = {
    id: id("try"),
    communityId: circle.communityId,
    circleId: circle.id,
    balance: 500,
    currency: "SYM",
    createdAt: now(),
    updatedAt: now()
  };
  state.circles.push(circle);
  state.patterns.push(pattern);
  state.treasuries.push(treasury);
  appendEvent(state, "circle.created", "circle", circle.id, { patternId: pattern.id });
  return { circle, pattern };
}

export function instantiateArchitectureTemplate(
  state: KernelState,
  input: {
    templateId: KernelId;
    placeName?: string;
    placeAddress?: string;
    communityName?: string;
    circleName?: string;
  }
) {
  const template = architectureTemplates.find((item) => item.id === input.templateId);
  if (!template) {
    throw new Error("architecture_template_not_found");
  }

  const place = createPlace(state, {
    name: input.placeName || `${template.name} Place`,
    address: input.placeAddress || "Local anchor",
    role: template.placeRole
  });
  const community = createCommunity(state, {
    name: input.communityName || template.name,
    thesis: template.thesis,
    placeId: place.id
  });
  const { circle, pattern } = createCircle(state, {
    name: input.circleName || `${template.name} Circle`,
    purpose: template.circlePurpose,
    communityId: community.id,
    placeId: place.id
  });

  pattern.name = `${template.name} operating DNA`;
  pattern.templateId = template.id;
  pattern.status = template.status;
  pattern.fitnessScore = template.fitnessScore;
  pattern.populationCount = template.populationCount;
  pattern.forkCount = template.forkCount;
  pattern.joinedIndexAt = template.joinedIndexAt;
  pattern.editorialAttestation = template.editorialAttestation;
  pattern.currentCycleState = template.currentCycleState;
  pattern.nextRitualAt = template.nextRitualAt;
  pattern.ritualCadence = template.ritualCadence;
  pattern.onboardingStyle = template.onboardingStyle;
  pattern.rewardLoop = template.rewardLoop;
  pattern.attendanceLogic = template.attendanceLogic;
  pattern.proofLogic = template.proofRules.join(" | ");
  pattern.treasuryLogic = template.treasuryLogic;
  pattern.governance = template.governance;
  pattern.challengeTemplates = cloneChallengeTemplates(template.challengeTemplates);

  const rituals = template.ritualTemplates.map((ritualTemplate) =>
    createRitual(state, {
      circleId: circle.id,
      title: ritualTemplate.title,
      cadence: ritualTemplate.cadence,
      nextRunAt: now(),
      placeId: place.id
    })
  );
  const targetRitual = rituals[0];
  const challenges = targetRitual
    ? template.challengeTemplates.map((challengeTemplate) =>
        createChallenge(state, {
          ritualId: targetRitual.id,
          title: challengeTemplate.title,
          commitment: challengeTemplate.commitment,
          templateId: challengeTemplate.id,
          rewardAmount: challengeTemplate.rewardAmount,
          stakeAmount: challengeTemplate.stakeAmount,
          deadline: plusDays(now(), challengeTemplate.deadlineOffsetDays),
          proofRequirements: challengeTemplate.proofRequirements,
          validationMode: challengeTemplate.validationMode,
          reliabilityImpact: challengeTemplate.reliabilityImpact,
          status: "active"
        })
      )
    : [];

  appendEvent(state, "architecture_template.instantiated", "pattern", pattern.id, {
    templateId: template.id,
    placeId: place.id,
    communityId: community.id,
    circleId: circle.id
  });
  emitPulseEvent(state, {
    type: "proposal_forming",
    patternId: pattern.id,
    circleId: circle.id,
    sealedArchitectureId: null,
    title: `${template.name} under formation`,
    description: `A ${template.category} architecture has been instantiated and is waiting for proof of recurrence.`,
    intensity: "low"
  });

  return { template, place, community, circle, pattern, rituals, challenges };
}

export function inviteMember(state: KernelState, input: { circleId: KernelId; name: string; email: string }) {
  const circle = state.circles.find((item) => item.id === input.circleId);
  if (!circle) {
    throw new Error("circle_not_found");
  }

  let user: User | undefined = state.users.find((item) => item.email === input.email.trim());
  if (!user) {
    user = {
      id: id("usr"),
      name: input.name.trim(),
      email: input.email.trim(),
      status: "invited",
      reliabilityScore: 0,
      createdAt: now()
    };
    state.users.push(user);
  }

  const invite = {
    id: id("inv"),
    circleId: circle.id,
    email: user.email,
    name: user.name,
    token: id("tok"),
    status: "pending" as const,
    createdAt: now()
  };
  const membership = {
    id: id("mem"),
    userId: user.id,
    communityId: circle.communityId,
    circleId: circle.id,
    role: "member",
    status: "invited" as const,
    reliabilityScore: 0,
    createdAt: now(),
    updatedAt: now()
  };
  state.invites.push(invite);
  state.memberships.push(membership);
  appendEvent(state, "invite.created", "invite", invite.id, { userId: user.id, circleId: circle.id }, user.id);
  return { invite, user, membership };
}

export function createRitual(
  state: KernelState,
  input: { circleId: KernelId; title: string; cadence: string; nextRunAt: string; placeId?: KernelId | null }
) {
  const circle = state.circles.find((item) => item.id === input.circleId);
  if (!circle) {
    throw new Error("circle_not_found");
  }
  const ritual = {
    id: id("rit"),
    circleId: circle.id,
    title: input.title.trim(),
    cadence: input.cadence.trim(),
    placeId: input.placeId || circle.placeId,
    nextRunAt: input.nextRunAt,
    createdAt: now()
  };
  state.rituals.push(ritual);
  const pattern = state.patterns.find((item) => item.circleId === circle.id);
  if (pattern) {
    pattern.nextRitualAt = ritual.nextRunAt;
    pattern.currentCycleState = "running";
    pattern.status = pattern.status === "sealed" ? "sealed" : "live";
  }
  appendEvent(state, "ritual.created", "ritual", ritual.id, { cadence: ritual.cadence });
  emitPulseEvent(state, {
    type: "ritual_firing",
    patternId: pattern?.id ?? null,
    circleId: circle.id,
    sealedArchitectureId: null,
    title: ritual.title,
    description: `${ritual.cadence} ritual scheduled for ${ritual.nextRunAt}.`,
    intensity: "low",
    occurredAt: ritual.nextRunAt,
    visibleUntil: plusHours(ritual.nextRunAt, 72)
  });
  return ritual;
}

export function createChallenge(
  state: KernelState,
  input: {
    ritualId: KernelId;
    templateId?: KernelId | null;
    title: string;
    commitment: string;
    stakeAmount?: number;
    rewardAmount?: number;
    deadline?: string;
    proofRequirements?: string[] | string;
    validationMode?: ChallengeValidationMode;
    reliabilityImpact?: number;
    status?: Challenge["status"];
  }
) {
  const ritual = state.rituals.find((item) => item.id === input.ritualId);
  if (!ritual) {
    throw new Error("ritual_not_found");
  }
  const circle = state.circles.find((item) => item.id === ritual.circleId);
  const pattern = state.patterns.find((item) => item.circleId === circle?.id);
  const template = [...(pattern?.challengeTemplates ?? []), ...architectureTemplates.flatMap((item) => item.challengeTemplates)]
    .find((item) => item.id === input.templateId);
  const stakeAmount = Number(input.stakeAmount ?? template?.stakeAmount ?? 25);
  const rewardAmount = Number(input.rewardAmount ?? template?.rewardAmount ?? 50);
  const deadline = input.deadline || plusDays(now(), template?.deadlineOffsetDays ?? 7);
  const proofRequirements = normalizeProofRequirements(
    input.proofRequirements,
    template?.proofRequirements ?? ["proof artifact", "witness or steward validation"]
  );
  const validationMode = isValidationMode(input.validationMode)
    ? input.validationMode
    : template?.validationMode ?? "witness";
  const reliabilityImpact = Number(input.reliabilityImpact ?? template?.reliabilityImpact ?? 8);
  const treasuryImpact = {
    stakeToReserve: template?.treasuryImpact.stakeToReserve ?? Math.round(stakeAmount * 0.2),
    rewardFromTreasury: template?.treasuryImpact.rewardFromTreasury ?? rewardAmount
  };
  const status = isChallengeStatus(input.status) ? input.status : "draft";
  const challenge: Challenge = {
    id: id("cha"),
    ritualId: ritual.id,
    templateId: template?.id ?? input.templateId ?? null,
    title: input.title.trim(),
    commitment: input.commitment.trim(),
    stakeAmount,
    stakeCurrency: "SYM",
    rewardAmount,
    deadline,
    proofRequirements,
    validationMode,
    reliabilityImpact,
    treasuryImpact,
    rewardPreview: `${rewardAmount} SYM after ${validationMode} validation`,
    tracePreview: `commitment -> proof -> ${validationMode} validation -> ${rewardAmount} SYM reward -> trace`,
    status,
    createdAt: now(),
    activatedAt: status === "active" ? now() : null,
    proofSubmittedAt: null,
    validatingAt: null,
    resolvedAt: null,
    rewardedAt: null,
    sealedAt: null
  };
  state.challenges.push(challenge);
  appendEvent(state, "challenge.created", "challenge", challenge.id, {
    ritualId: ritual.id,
    stakeAmount: challenge.stakeAmount,
    rewardAmount: challenge.rewardAmount,
    validationMode: challenge.validationMode
  });
  return challenge;
}

export function markAttendance(state: KernelState, input: { ritualId: KernelId; userId: KernelId }) {
  if (!state.rituals.some((ritual) => ritual.id === input.ritualId)) {
    throw new Error("ritual_not_found");
  }
  if (!state.users.some((user) => user.id === input.userId)) {
    throw new Error("user_not_found");
  }
  const attendance: Attendance = {
    id: id("att"),
    ritualId: input.ritualId,
    userId: input.userId,
    status: "checked_in",
    checkedInAt: now()
  };
  state.attendance.push(attendance);
  appendEvent(state, "attendance.checked_in", "attendance", attendance.id, {
    ritualId: input.ritualId,
    userId: input.userId
  }, input.userId);
  return attendance;
}

export function activateChallenge(state: KernelState, input: { challengeId: KernelId; userId?: KernelId }) {
  const challenge = state.challenges.find((item) => item.id === input.challengeId);
  if (!challenge) {
    throw new Error("challenge_not_found");
  }
  if (challenge.status !== "draft") {
    return challenge;
  }
  challenge.status = "active";
  challenge.activatedAt = now();
  appendEvent(state, "challenge.activated", "challenge", challenge.id, {
    stakeAmount: challenge.stakeAmount,
    deadline: challenge.deadline
  }, input.userId ?? null);
  return challenge;
}

export function submitProof(
  state: KernelState,
  input: { challengeId: KernelId; userId: KernelId; type?: Proof["type"]; content: string }
) {
  const challenge = state.challenges.find((item) => item.id === input.challengeId);
  if (!challenge) {
    throw new Error("challenge_not_found");
  }
  if (challenge.status === "draft") {
    throw new Error("challenge_not_active");
  }
  if (challenge.status === "sealed") {
    throw new Error("challenge_already_sealed");
  }
  if (!state.users.some((user) => user.id === input.userId)) {
    throw new Error("user_not_found");
  }
  const proof: Proof = {
    id: id("prf"),
    challengeId: challenge.id,
    userId: input.userId,
    type: input.type || "attestation",
    content: input.content.trim(),
    status: "submitted",
    submittedAt: now(),
    validatedAt: null
  };
  challenge.status = "proof_submitted";
  challenge.proofSubmittedAt = proof.submittedAt;
  state.proofs.push(proof);
  const circle = circleForChallenge(state, challenge.id);
  const pattern = state.patterns.find((item) => item.circleId === circle?.id);
  if (pattern) {
    pattern.currentCycleState = "validating";
  }
  appendEvent(state, "proof.submitted", "proof", proof.id, {
    challengeId: challenge.id,
    type: proof.type
  }, input.userId);
  emitPulseEvent(state, {
    type: "proof_submitted",
    patternId: pattern?.id ?? null,
    circleId: circle?.id ?? null,
    sealedArchitectureId: null,
    title: `Proof submitted: ${challenge.title}`,
    description: proof.content,
    intensity: "medium"
  });
  return proof;
}

export function validateChallengeProof(state: KernelState, input: { challengeId: KernelId; userId: KernelId }) {
  const challenge = state.challenges.find((item) => item.id === input.challengeId);
  if (!challenge) {
    throw new Error("challenge_not_found");
  }
  const proof = state.proofs.find(
    (item) => item.challengeId === challenge.id && item.userId === input.userId
  );
  if (!proof) {
    throw new Error("proof_required");
  }

  challenge.status = "validating";
  challenge.validatingAt = now();
  proof.status = "validated";
  proof.validatedAt = now();

  const circle = circleForChallenge(state, challenge.id);
  const pattern = state.patterns.find((item) => item.circleId === circle?.id);
  appendEvent(state, "challenge.validation_started", "challenge", challenge.id, {
    proofId: proof.id,
    validationMode: challenge.validationMode
  }, input.userId);
  emitPulseEvent(state, {
    type: "proof_validated",
    patternId: pattern?.id ?? null,
    circleId: circle?.id ?? null,
    sealedArchitectureId: null,
    title: `Proof validated: ${challenge.title}`,
    description: `${proof.type} proof moved from submitted to validated.`,
    intensity: "medium"
  });
  return { challenge, proof };
}

export function resolveChallenge(state: KernelState, input: { challengeId: KernelId; userId: KernelId }) {
  const challenge = state.challenges.find((item) => item.id === input.challengeId);
  if (!challenge) {
    throw new Error("challenge_not_found");
  }
  const proof = state.proofs.find(
    (item) => item.challengeId === challenge.id && item.userId === input.userId && item.status === "validated"
  );
  if (!proof) {
    throw new Error("validated_proof_required");
  }
  challenge.status = "resolved";
  challenge.resolvedAt = now();
  appendEvent(state, "challenge.resolved", "challenge", challenge.id, {
    proofId: proof.id,
    validationMode: challenge.validationMode
  }, input.userId);
  emitPulseEvent(state, {
    type: "challenge_completed",
    patternId: state.patterns.find((item) => item.circleId === circleForChallenge(state, challenge.id)?.id)?.id ?? null,
    circleId: circleForChallenge(state, challenge.id)?.id ?? null,
    sealedArchitectureId: null,
    title: `Challenge resolved: ${challenge.title}`,
    description: `Validated commitment is ready for reward settlement.`,
    intensity: "high"
  });
  return { challenge, proof };
}

export function rewardChallenge(state: KernelState, input: { challengeId: KernelId; userId: KernelId }) {
  const challenge = state.challenges.find((item) => item.id === input.challengeId);
  if (!challenge) {
    throw new Error("challenge_not_found");
  }
  const proof = state.proofs.find(
    (item) => item.challengeId === challenge.id && item.userId === input.userId && item.status === "validated"
  );
  if (!proof) {
    throw new Error("validated_proof_required");
  }
  const circle = circleForChallenge(state, challenge.id);
  const pattern = state.patterns.find((item) => item.circleId === circle?.id);
  const treasury = resolveTreasury(state, circle?.communityId ?? null, circle?.id ?? null);
  let reward = state.rewards.find((item) => item.challengeId === challenge.id && item.userId === input.userId);
  if (!reward) {
    reward = {
      id: id("rwd"),
      challengeId: challenge.id,
      userId: input.userId,
      amount: challenge.rewardAmount,
      reason: `Resolved: ${challenge.title}`,
      createdAt: now()
    };
    state.rewards.push(reward);
    treasury.balance -= reward.amount;
    treasury.updatedAt = now();
  }
  let transaction = state.transactions.find((item) => item.challengeId === challenge.id && item.userId === input.userId);
  if (!transaction) {
    transaction = createTransactionTrace(state, treasury, challenge, input.userId, reward, proof);
  }
  challenge.status = "rewarded";
  challenge.rewardedAt = now();
  applyReliabilityImpact(state, challenge, input.userId);
  appendEvent(state, "challenge.rewarded", "challenge", challenge.id, {
    rewardId: reward.id,
    transactionId: transaction.id,
    reliabilityImpact: challenge.reliabilityImpact
  }, input.userId);
  emitPulseEvent(state, {
    type: "treasury_moved",
    patternId: pattern?.id ?? null,
    circleId: circle?.id ?? null,
    sealedArchitectureId: null,
    title: "Treasury moved",
    description: `${reward.amount} SYM emitted through trace ${transaction.trace}.`,
    intensity: "medium"
  });
  return { challenge, proof, reward, transaction };
}

export function sealChallenge(state: KernelState, input: { challengeId: KernelId; userId: KernelId }) {
  const rewarded = rewardChallenge(state, input);
  const circle = circleForChallenge(state, rewarded.challenge.id);
  const pattern = state.patterns.find((item) => item.circleId === circle?.id);
  rewarded.challenge.status = "sealed";
  rewarded.challenge.sealedAt = now();
  if (pattern) {
    pattern.fitnessScore = calculatePatternFitness(state, pattern.id);
    pattern.populationCount = Math.max(pattern.populationCount, state.sealedArchitectures.filter((item) => item.patternId === pattern.id).length);
    pattern.currentCycleState = "sealed";
  }
  appendEvent(state, "challenge.sealed", "challenge", rewarded.challenge.id, {
    trace: rewarded.transaction.trace,
    fitnessScore: pattern?.fitnessScore ?? null
  }, input.userId);
  return rewarded;
}

export function completeChallenge(state: KernelState, input: { challengeId: KernelId; userId: KernelId }) {
  const challenge = state.challenges.find((item) => item.id === input.challengeId);
  if (!challenge) {
    throw new Error("challenge_not_found");
  }
  if (challenge.status === "draft") {
    activateChallenge(state, input);
  }
  if (challenge.status === "proof_submitted") {
    validateChallengeProof(state, input);
  }
  if (challenge.status === "validating") {
    resolveChallenge(state, input);
  }
  if (challenge.status === "resolved" || challenge.status === "rewarded") {
    return sealChallenge(state, input);
  }
  if (challenge.status === "sealed") {
    const proof = state.proofs.find((item) => item.challengeId === challenge.id && item.userId === input.userId);
    const reward = state.rewards.find((item) => item.challengeId === challenge.id && item.userId === input.userId);
    const transaction = state.transactions.find((item) => item.challengeId === challenge.id && item.userId === input.userId);
    return { challenge, proof, reward, transaction };
  }
  throw new Error("proof_required");
}

export function updateMemberStatus(
  state: KernelState,
  input: { membershipId: KernelId; status: MemberStatus; reliabilityScore?: number }
) {
  const membership = state.memberships.find((item) => item.id === input.membershipId);
  if (!membership) {
    throw new Error("membership_not_found");
  }
  membership.status = input.status;
  membership.reliabilityScore = Number(input.reliabilityScore ?? membership.reliabilityScore + 10);
  membership.updatedAt = now();
  const user = state.users.find((item) => item.id === membership.userId);
  if (user) {
    user.status = input.status;
    user.reliabilityScore = membership.reliabilityScore;
  }
  appendEvent(state, "membership.status_updated", "membership", membership.id, {
    status: input.status,
    reliabilityScore: membership.reliabilityScore
  }, membership.userId);
  return membership;
}

export function createTransactionPreview(
  state: KernelState,
  input: { challengeId: KernelId; userId: KernelId }
) {
  const challenge = state.challenges.find((item) => item.id === input.challengeId);
  if (!challenge) {
    throw new Error("challenge_not_found");
  }
  const proof = state.proofs.find(
    (item) => item.challengeId === challenge.id && item.userId === input.userId
  );
  if (!proof) {
    throw new Error("proof_required");
  }
  const circle = circleForChallenge(state, challenge.id);
  const treasury = resolveTreasury(state, circle?.communityId ?? null, circle?.id ?? null);
  const reward = state.rewards.find(
    (item) => item.challengeId === challenge.id && item.userId === input.userId
  ) ?? {
    id: id("rwd_preview"),
    challengeId: challenge.id,
    userId: input.userId,
    amount: challenge.rewardAmount,
    reason: `Preview: ${challenge.title}`,
    createdAt: now()
  };
  const transaction = createTransactionTrace(state, treasury, challenge, input.userId, reward, proof);
  appendEvent(state, "transaction.preview_created", "transaction", transaction.id, {
    challengeId: challenge.id
  }, input.userId);
  return transaction;
}

export function sealArchitecture(
  state: KernelState,
  input: {
    patternId?: KernelId;
    circleId?: KernelId;
    name?: string;
    version?: string;
    licenseType?: ArchitectureLicenseType;
    price?: number;
    currency?: PatternLicense["currency"];
    terms?: string;
  }
) {
  const pattern = input.patternId
    ? state.patterns.find((item) => item.id === input.patternId)
    : state.patterns.find((item) => item.circleId === input.circleId);
  if (!pattern) {
    throw new Error("pattern_not_found");
  }

  const circle = pattern.circleId ? state.circles.find((item) => item.id === pattern.circleId) : null;
  const community = circle?.communityId
    ? state.communities.find((item) => item.id === circle.communityId) ?? null
    : null;
  const place = circle?.placeId ? state.places.find((item) => item.id === circle.placeId) ?? null : null;
  const template = pattern.templateId
    ? architectureTemplates.find((item) => item.id === pattern.templateId)
    : null;
  const rituals = circle ? state.rituals.filter((item) => item.circleId === circle.id) : [];
  const challenges = rituals.flatMap((ritual) =>
    state.challenges.filter((challenge) => challenge.ritualId === ritual.id)
  );
  const metrics = buildOutcomeMetrics(state, null, circle?.id ?? null, challenges);
  state.outcomeMetrics.push(...metrics);

  const patternVersion: PatternVersion = {
    id: id("ver"),
    patternId: pattern.id,
    version: input.version || nextPatternVersion(state, pattern.id),
    status: "sealed",
    snapshot: { ...pattern },
    createdAt: now(),
    sealedAt: now()
  };
  state.patternVersions.push(patternVersion);

  const sealed: SealedArchitecture = {
    id: id("sea"),
    patternId: pattern.id,
    patternVersionId: patternVersion.id,
    circleId: circle?.id ?? null,
    communityId: community?.id ?? null,
    name: input.name || `${pattern.name} sealed architecture`,
    thesis: community?.thesis || template?.thesis || pattern.name,
    dna: {
      pattern: { ...pattern },
      placeLogic: place ? `${place.name}: ${place.role}` : template?.placeRole ?? null,
      memberRoles: template?.memberRoles ?? inferMemberRoles(state, circle?.id ?? null),
      rituals,
      challengeTemplates: challenges,
      forkableChallengeTemplates: cloneChallengeTemplates(pattern.challengeTemplates?.length ? pattern.challengeTemplates : template?.challengeTemplates ?? defaultChallengeTemplates()),
      proofRules: template?.proofRules ?? pattern.proofLogic.split("|").map((rule) => rule.trim()),
      rewardLoop: pattern.rewardLoop,
      treasuryLogic: pattern.treasuryLogic,
      governance: pattern.governance,
      outcomeMetrics: metrics,
      failureArtifacts: state.failureArtifacts.filter((item) => item.circleId === circle?.id)
    },
    status: "sealed",
    lineage: [...pattern.lineage],
    createdAt: now(),
    sealedAt: now()
  };
  state.sealedArchitectures.push(sealed);

  const license: PatternLicense = {
    id: id("lic"),
    sealedArchitectureId: sealed.id,
    type: input.licenseType || "private",
    price: Number(input.price || 0),
    currency: input.currency || "EUR",
    terms: input.terms || "Owner controls fork, sale, and remix permissions.",
    createdAt: now()
  };
  state.patternLicenses.push(license);

  for (const metric of metrics) {
    metric.sealedArchitectureId = sealed.id;
  }
  pattern.status = "sealed";
  pattern.currentCycleState = "sealed";
  pattern.populationCount = state.sealedArchitectures.filter((item) => item.patternId === pattern.id).length;
  pattern.fitnessScore = calculatePatternFitness(state, pattern.id);

  appendEvent(state, "architecture.sealed", "sealed_architecture", sealed.id, {
    patternId: pattern.id,
    patternVersionId: patternVersion.id,
    licenseId: license.id
  });
  emitPulseEvent(state, {
    type: "architecture_sealed",
    patternId: pattern.id,
    circleId: circle?.id ?? null,
    sealedArchitectureId: sealed.id,
    title: `${sealed.name} sealed`,
    description: `Version ${patternVersion.version} became transferable operating DNA.`,
    intensity: "high"
  });

  return { sealed, patternVersion, license, metrics };
}

export function forkSealedArchitecture(
  state: KernelState,
  input: {
    sealedArchitectureId: KernelId;
    forkedBy?: string;
    placeName?: string;
    placeAddress?: string;
    communityName?: string;
    circleName?: string;
    adaptationNotes?: string;
  }
) {
  const sealed = state.sealedArchitectures.find((item) => item.id === input.sealedArchitectureId);
  if (!sealed) {
    throw new Error("sealed_architecture_not_found");
  }

  const sourcePattern = sealed.dna.pattern;
  const place = createPlace(state, {
    name: input.placeName || `${sealed.name} Fork Place`,
    address: input.placeAddress || "Forked local anchor",
    role: sealed.dna.placeLogic || "forked place anchor"
  });
  const community = createCommunity(state, {
    name: input.communityName || `${sealed.name} Fork`,
    thesis: sealed.thesis,
    placeId: place.id
  });
  const { circle, pattern } = createCircle(state, {
    name: input.circleName || `${sealed.name} Circle`,
    purpose: sourcePattern.name,
    communityId: community.id,
    placeId: place.id
  });

  pattern.name = `${sourcePattern.name} fork`;
  pattern.templateId = sourcePattern.templateId ?? null;
  pattern.status = "forming";
  pattern.fitnessScore = sourcePattern.fitnessScore;
  pattern.populationCount = 0;
  pattern.forkCount = 0;
  pattern.joinedIndexAt = null;
  pattern.editorialAttestation = `Forked from ${sealed.name}.`;
  pattern.currentCycleState = "forming";
  pattern.nextRitualAt = sourcePattern.nextRitualAt;
  pattern.ritualCadence = sourcePattern.ritualCadence;
  pattern.onboardingStyle = sourcePattern.onboardingStyle;
  pattern.rewardLoop = sourcePattern.rewardLoop;
  pattern.attendanceLogic = sourcePattern.attendanceLogic;
  pattern.proofLogic = sourcePattern.proofLogic;
  pattern.treasuryLogic = sourcePattern.treasuryLogic;
  pattern.governance = sourcePattern.governance;
  pattern.challengeTemplates = cloneChallengeTemplates(sealed.dna.forkableChallengeTemplates?.length ? sealed.dna.forkableChallengeTemplates : sourcePattern.challengeTemplates ?? defaultChallengeTemplates());
  pattern.lineage = [...sourcePattern.lineage, sealed.id, sourcePattern.id];

  const rituals = sealed.dna.rituals.map((ritual) =>
    createRitual(state, {
      circleId: circle.id,
      title: ritual.title,
      cadence: ritual.cadence,
      nextRunAt: now(),
      placeId: place.id
    })
  );
  const targetRitual = rituals[0];
  const challenges = targetRitual
    ? pattern.challengeTemplates.map((challenge) =>
        createChallenge(state, {
          ritualId: targetRitual.id,
          templateId: challenge.id,
          title: challenge.title,
          commitment: challenge.commitment,
          rewardAmount: challenge.rewardAmount,
          stakeAmount: challenge.stakeAmount,
          deadline: plusDays(now(), challenge.deadlineOffsetDays),
          proofRequirements: challenge.proofRequirements,
          validationMode: challenge.validationMode,
          reliabilityImpact: challenge.reliabilityImpact,
          status: "active"
        })
      )
    : [];

  const fork: PatternFork = {
    id: id("frk"),
    sourceSealedArchitectureId: sealed.id,
    targetPatternId: pattern.id,
    targetCircleId: circle.id,
    targetCommunityId: community.id,
    forkedBy: input.forkedBy || "local operator",
    adaptationNotes: input.adaptationNotes || "Forked without adaptation notes.",
    createdAt: now()
  };
  state.patternForks.push(fork);
  const originalPattern = state.patterns.find((item) => item.id === sealed.patternId);
  if (originalPattern) {
    originalPattern.forkCount += 1;
  }

  appendEvent(state, "architecture.forked", "pattern_fork", fork.id, {
    sourceSealedArchitectureId: sealed.id,
    targetPatternId: pattern.id
  });
  emitPulseEvent(state, {
    type: "architecture_forked",
    patternId: pattern.id,
    circleId: circle.id,
    sealedArchitectureId: sealed.id,
    title: `${sealed.name} forked`,
    description: `${fork.forkedBy} inherited the architecture into ${community.name}.`,
    intensity: "high"
  });

  return { fork, place, community, circle, pattern, rituals, challenges };
}

export function recordOutcomeMetric(
  state: KernelState,
  input: {
    sealedArchitectureId?: KernelId | null;
    circleId?: KernelId | null;
    key: string;
    value: number;
    unit?: string;
    notes?: string;
  }
) {
  const metric: OutcomeMetric = {
    id: id("met"),
    sealedArchitectureId: input.sealedArchitectureId ?? null,
    circleId: input.circleId ?? null,
    key: input.key.trim(),
    value: Number(input.value),
    unit: input.unit?.trim() || "count",
    notes: input.notes?.trim() || "",
    createdAt: now()
  };
  state.outcomeMetrics.push(metric);
  appendEvent(state, "outcome_metric.recorded", "outcome_metric", metric.id, {
    key: metric.key,
    value: metric.value
  });
  return metric;
}

export function recordFailureArtifact(
  state: KernelState,
  input: {
    sealedArchitectureId?: KernelId | null;
    circleId?: KernelId | null;
    title: string;
    cause: string;
    lesson: string;
  }
) {
  const failure: FailureArtifact = {
    id: id("fail"),
    sealedArchitectureId: input.sealedArchitectureId ?? null,
    circleId: input.circleId ?? null,
    title: input.title.trim(),
    cause: input.cause.trim(),
    lesson: input.lesson.trim(),
    createdAt: now()
  };
  state.failureArtifacts.push(failure);
  appendEvent(state, "failure_artifact.recorded", "failure_artifact", failure.id, {
    title: failure.title
  });
  return failure;
}

export function recordInferenceSignal(
  state: KernelState,
  input: {
    sealedArchitectureId?: KernelId | null;
    circleId?: KernelId | null;
    signal: string;
    hypothesis: string;
    confidence?: InferenceSignal["confidence"];
    source?: InferenceSignal["source"];
  }
) {
  const signal: InferenceSignal = {
    id: id("sig"),
    sealedArchitectureId: input.sealedArchitectureId ?? null,
    circleId: input.circleId ?? null,
    signal: input.signal.trim(),
    hypothesis: input.hypothesis.trim(),
    confidence: input.confidence || "low",
    source: input.source || "operator",
    createdAt: now()
  };
  state.inferenceSignals.push(signal);
  appendEvent(state, "inference_signal.recorded", "inference_signal", signal.id, {
    confidence: signal.confidence,
    source: signal.source
  });
  emitPulseEvent(state, {
    type: "inference_observed",
    patternId: null,
    circleId: signal.circleId,
    sealedArchitectureId: signal.sealedArchitectureId,
    title: signal.signal,
    description: signal.hypothesis,
    intensity: signal.confidence === "high" ? "high" : signal.confidence === "medium" ? "medium" : "low"
  });
  return signal;
}

function nextPatternVersion(state: KernelState, patternId: KernelId) {
  const count = state.patternVersions.filter((item) => item.patternId === patternId).length;
  return `v${count + 1}.0`;
}

function inferMemberRoles(state: KernelState, circleId: KernelId | null) {
  const roles = state.memberships
    .filter((membership) => membership.circleId === circleId)
    .map((membership) => membership.role);
  return Array.from(new Set(roles.length ? roles : ["member", "steward"]));
}

function calculatePatternFitness(state: KernelState, patternId: KernelId) {
  const pattern = state.patterns.find((item) => item.id === patternId);
  const circle = state.circles.find((item) => item.id === pattern?.circleId);
  if (!circle) {
    return pattern?.fitnessScore ?? 0;
  }
  const ritualIds = new Set(state.rituals.filter((ritual) => ritual.circleId === circle.id).map((ritual) => ritual.id));
  const challenges = state.challenges.filter((challenge) => ritualIds.has(challenge.ritualId));
  if (!challenges.length) {
    return pattern?.fitnessScore ?? 0;
  }
  const completed = challenges.filter((challenge) => ["resolved", "rewarded", "sealed"].includes(challenge.status)).length;
  const proofCount = state.proofs.filter((proof) => challenges.some((challenge) => challenge.id === proof.challengeId)).length;
  const attendanceCount = state.attendance.filter((attendance) => ritualIds.has(attendance.ritualId)).length;
  const resolutionScore = completed / challenges.length;
  const proofScore = Math.min(1, proofCount / Math.max(1, challenges.length));
  const attendanceScore = Math.min(1, attendanceCount / Math.max(1, state.memberships.filter((membership) => membership.circleId === circle.id).length || 1));
  return Number(((resolutionScore * 0.55) + (proofScore * 0.25) + (attendanceScore * 0.2)).toFixed(2));
}

function buildOutcomeMetrics(
  state: KernelState,
  sealedArchitectureId: KernelId | null,
  circleId: KernelId | null,
  challenges: Challenge[]
): OutcomeMetric[] {
  const ritualIds = new Set(
    state.rituals.filter((ritual) => ritual.circleId === circleId).map((ritual) => ritual.id)
  );
  const challengeIds = new Set(challenges.map((challenge) => challenge.id));
  const completed = challenges.filter((challenge) => ["resolved", "rewarded", "sealed"].includes(challenge.status)).length;
  const resolutionRate = challenges.length ? Math.round((completed / challenges.length) * 100) : 0;
  const proofCount = state.proofs.filter((proof) => challengeIds.has(proof.challengeId)).length;
  const attendanceCount = state.attendance.filter((attendance) => ritualIds.has(attendance.ritualId)).length;
  const rewardCount = state.rewards.filter((reward) => challengeIds.has(reward.challengeId)).length;
  const stamp = now();

  return [
    {
      id: id("met"),
      sealedArchitectureId,
      circleId,
      key: "resolution_rate",
      value: resolutionRate,
      unit: "percent",
      notes: "Completed challenges divided by total challenges at seal time.",
      createdAt: stamp
    },
    {
      id: id("met"),
      sealedArchitectureId,
      circleId,
      key: "proof_count",
      value: proofCount,
      unit: "proofs",
      notes: "Proof artifacts attached to the architecture before sealing.",
      createdAt: stamp
    },
    {
      id: id("met"),
      sealedArchitectureId,
      circleId,
      key: "attendance_count",
      value: attendanceCount,
      unit: "check_ins",
      notes: "Presence records linked to the architecture rituals.",
      createdAt: stamp
    },
    {
      id: id("met"),
      sealedArchitectureId,
      circleId,
      key: "reward_count",
      value: rewardCount,
      unit: "rewards",
      notes: "Validated rewards emitted before sealing.",
      createdAt: stamp
    }
  ];
}

function resolveTreasury(state: KernelState, communityId: KernelId | null, circleId: KernelId | null) {
  let treasury = state.treasuries.find((item) => item.circleId === circleId && item.communityId === communityId);
  if (!treasury) {
    treasury = {
      id: id("try"),
      communityId,
      circleId,
      balance: 500,
      currency: "SYM",
      createdAt: now(),
      updatedAt: now()
    };
    state.treasuries.push(treasury);
  }
  return treasury;
}

function applyReliabilityImpact(state: KernelState, challenge: Challenge, userId: KernelId) {
  const impact = Number(challenge.reliabilityImpact || 0);
  const user = state.users.find((item) => item.id === userId);
  if (user) {
    user.reliabilityScore = Math.min(100, Math.max(0, user.reliabilityScore + impact));
    if (user.reliabilityScore >= 70 && user.status === "active") {
      user.status = "reliable";
    }
  }

  const circle = circleForChallenge(state, challenge.id);
  for (const membership of state.memberships.filter((item) => item.userId === userId && item.circleId === circle?.id)) {
    membership.reliabilityScore = Math.min(100, Math.max(0, membership.reliabilityScore + impact));
    membership.updatedAt = now();
    if (membership.reliabilityScore >= 70 && membership.status === "active") {
      membership.status = "reliable";
    }
  }
}

function circleForChallenge(state: KernelState, challengeId: KernelId) {
  const challenge = state.challenges.find((item) => item.id === challengeId);
  const ritual = state.rituals.find((item) => item.id === challenge?.ritualId);
  return state.circles.find((item) => item.id === ritual?.circleId);
}

function createTransactionTrace(
  state: KernelState,
  treasury: Treasury,
  challenge: Challenge,
  userId: KernelId,
  reward: Reward,
  proof: Proof
): Transaction {
  const stamp = now();
  const transaction: Transaction = {
    id: id("txn"),
    treasuryId: treasury.id,
    challengeId: challenge.id,
    userId,
    amount: reward.amount,
    currency: "SYM",
    stages: [
      { stage: "commitment", label: `${challenge.commitment} | stake preview ${challenge.stakeAmount} SYM`, at: challenge.activatedAt ?? challenge.createdAt, ref: challenge.id },
      { stage: "proof", label: proof.content, at: proof.submittedAt, ref: proof.id },
      { stage: "validation", label: `${challenge.validationMode} validation ${proof.status === "validated" ? "passed" : "pending"}`, at: proof.validatedAt ?? stamp, ref: proof.id },
      { stage: "reward", label: `${reward.amount} SYM emitted; reliability +${challenge.reliabilityImpact}`, at: reward.createdAt, ref: reward.id },
      { stage: "trace", label: "append-only economic memory emitted", at: stamp, ref: treasury.id }
    ],
    trace: `SYMIONE:${treasury.id}:${challenge.id}:${proof.id}:${reward.id}`,
    createdAt: stamp
  };
  state.transactions.push(transaction);
  return transaction;
}
