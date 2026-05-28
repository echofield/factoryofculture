export type KernelId = string;

export type MemberStatus = "invited" | "active" | "reliable" | "steward";
export type ChallengeStatus = "draft" | "active" | "proof_submitted" | "completed";
export type TransactionStage = "commitment" | "proof" | "validation" | "reward" | "trace";
export type ArchitectureLicenseType = "private" | "community_use" | "paid_fork" | "open_fork";
export type PatternStatus = "proposed" | "forming" | "live" | "sealed" | "dormant";
export type CurrentCycleState = "not_started" | "forming" | "running" | "validating" | "sealed" | "dormant";
export type PulseEventType =
  | "ritual_firing"
  | "proof_submitted"
  | "proof_validated"
  | "challenge_completed"
  | "architecture_sealed"
  | "architecture_forked"
  | "treasury_moved"
  | "proposal_forming"
  | "inference_observed";

export type User = {
  id: KernelId;
  name: string;
  email: string;
  status: MemberStatus;
  reliabilityScore: number;
  createdAt: string;
};

export type Place = {
  id: KernelId;
  name: string;
  address: string;
  role: string;
  createdAt: string;
};

export type Community = {
  id: KernelId;
  name: string;
  thesis: string;
  placeId: KernelId | null;
  createdAt: string;
};

export type Circle = {
  id: KernelId;
  name: string;
  purpose: string;
  communityId: KernelId | null;
  placeId: KernelId | null;
  patternId: KernelId;
  createdAt: string;
};

export type Membership = {
  id: KernelId;
  userId: KernelId;
  communityId: KernelId | null;
  circleId: KernelId | null;
  role: string;
  status: MemberStatus;
  reliabilityScore: number;
  createdAt: string;
  updatedAt: string;
};

export type Invite = {
  id: KernelId;
  circleId: KernelId;
  email: string;
  name: string;
  token: string;
  status: "pending" | "accepted";
  createdAt: string;
};

export type Ritual = {
  id: KernelId;
  circleId: KernelId;
  title: string;
  cadence: string;
  placeId: KernelId | null;
  nextRunAt: string;
  createdAt: string;
};

export type Challenge = {
  id: KernelId;
  ritualId: KernelId;
  title: string;
  commitment: string;
  rewardAmount: number;
  status: ChallengeStatus;
  createdAt: string;
  completedAt: string | null;
};

export type Attendance = {
  id: KernelId;
  ritualId: KernelId;
  userId: KernelId;
  status: "checked_in";
  checkedInAt: string;
};

export type Proof = {
  id: KernelId;
  challengeId: KernelId;
  userId: KernelId;
  type: "attestation" | "url" | "note" | "check_in";
  content: string;
  status: "submitted" | "validated";
  submittedAt: string;
  validatedAt: string | null;
};

export type Reward = {
  id: KernelId;
  challengeId: KernelId;
  userId: KernelId;
  amount: number;
  reason: string;
  createdAt: string;
};

export type Treasury = {
  id: KernelId;
  communityId: KernelId | null;
  circleId: KernelId | null;
  balance: number;
  currency: "SYM";
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  id: KernelId;
  treasuryId: KernelId;
  challengeId: KernelId;
  userId: KernelId;
  amount: number;
  currency: "SYM";
  stages: Array<{
    stage: TransactionStage;
    label: string;
    at: string;
    ref: KernelId;
  }>;
  trace: string;
  createdAt: string;
};

export type OperationalPattern = {
  id: KernelId;
  circleId: KernelId | null;
  name: string;
  templateId?: KernelId | null;
  status: PatternStatus;
  fitnessScore: number;
  populationCount: number;
  forkCount: number;
  joinedIndexAt: string | null;
  editorialAttestation: string | null;
  currentCycleState: CurrentCycleState;
  nextRitualAt: string | null;
  ritualCadence: string;
  onboardingStyle: string;
  rewardLoop: string;
  attendanceLogic: string;
  proofLogic: string;
  treasuryLogic: string;
  governance: string;
  lineage: KernelId[];
  createdAt: string;
};

export type ArchitectureTemplate = {
  id: KernelId;
  name: string;
  category:
    | "supper_club"
    | "music_collective"
    | "place_circle"
    | "challenge_cell"
    | "creator_guild"
    | "mutual_aid"
    | "nightlife_cell";
  thesis: string;
  placeRole: string;
  circlePurpose: string;
  ritualCadence: string;
  onboardingStyle: string;
  memberRoles: string[];
  ritualTemplates: Array<{
    title: string;
    cadence: string;
  }>;
  challengeTemplates: Array<{
    title: string;
    commitment: string;
    rewardAmount: number;
  }>;
  status: PatternStatus;
  fitnessScore: number;
  populationCount: number;
  forkCount: number;
  joinedIndexAt: string | null;
  editorialAttestation: string | null;
  currentCycleState: CurrentCycleState;
  nextRitualAt: string | null;
  proofRules: string[];
  rewardLoop: string;
  attendanceLogic: string;
  treasuryLogic: string;
  governance: string;
};

export type PatternVersion = {
  id: KernelId;
  patternId: KernelId;
  version: string;
  status: "draft" | "sealed";
  snapshot: OperationalPattern;
  createdAt: string;
  sealedAt: string | null;
};

export type PatternLicense = {
  id: KernelId;
  sealedArchitectureId: KernelId;
  type: ArchitectureLicenseType;
  price: number;
  currency: "EUR" | "SYM";
  terms: string;
  createdAt: string;
};

export type OutcomeMetric = {
  id: KernelId;
  sealedArchitectureId: KernelId | null;
  circleId: KernelId | null;
  key: string;
  value: number;
  unit: string;
  notes: string;
  createdAt: string;
};

export type FailureArtifact = {
  id: KernelId;
  sealedArchitectureId: KernelId | null;
  circleId: KernelId | null;
  title: string;
  cause: string;
  lesson: string;
  createdAt: string;
};

export type InferenceSignal = {
  id: KernelId;
  sealedArchitectureId: KernelId | null;
  circleId: KernelId | null;
  signal: string;
  hypothesis: string;
  confidence: "low" | "medium" | "high";
  source: "operator" | "outcome_metric" | "failure_artifact" | "fork_result";
  createdAt: string;
};

export type SealedArchitecture = {
  id: KernelId;
  patternId: KernelId;
  patternVersionId: KernelId;
  circleId: KernelId | null;
  communityId: KernelId | null;
  name: string;
  thesis: string;
  dna: {
    pattern: OperationalPattern;
    placeLogic: string | null;
    memberRoles: string[];
    rituals: Ritual[];
    challengeTemplates: Challenge[];
    proofRules: string[];
    rewardLoop: string;
    treasuryLogic: string;
    governance: string;
    outcomeMetrics: OutcomeMetric[];
    failureArtifacts: FailureArtifact[];
  };
  status: "sealed" | "published";
  lineage: KernelId[];
  createdAt: string;
  sealedAt: string;
};

export type PatternFork = {
  id: KernelId;
  sourceSealedArchitectureId: KernelId;
  targetPatternId: KernelId;
  targetCircleId: KernelId;
  targetCommunityId: KernelId | null;
  forkedBy: string;
  adaptationNotes: string;
  createdAt: string;
};

export type PulseEvent = {
  id: KernelId;
  type: PulseEventType;
  patternId: KernelId | null;
  circleId: KernelId | null;
  sealedArchitectureId: KernelId | null;
  title: string;
  description: string;
  intensity: "low" | "medium" | "high";
  occurredAt: string;
  visibleUntil: string;
};

export type KernelPulse = {
  liveNow: PulseEvent[];
  recent: PulseEvent[];
  upcoming: PulseEvent[];
  forming: PulseEvent[];
  inference: InferenceSignal[];
};

export type KernelEvent = {
  id: KernelId;
  type: string;
  actorId: KernelId | null;
  entityType: string;
  entityId: KernelId;
  details: Record<string, unknown>;
  createdAt: string;
};

export type KernelState = {
  users: User[];
  places: Place[];
  communities: Community[];
  circles: Circle[];
  memberships: Membership[];
  invites: Invite[];
  rituals: Ritual[];
  challenges: Challenge[];
  attendance: Attendance[];
  proofs: Proof[];
  rewards: Reward[];
  treasuries: Treasury[];
  transactions: Transaction[];
  patterns: OperationalPattern[];
  patternVersions: PatternVersion[];
  sealedArchitectures: SealedArchitecture[];
  patternLicenses: PatternLicense[];
  patternForks: PatternFork[];
  outcomeMetrics: OutcomeMetric[];
  failureArtifacts: FailureArtifact[];
  inferenceSignals: InferenceSignal[];
  pulseEvents: PulseEvent[];
  events: KernelEvent[];
};

export type KernelSummary = {
  users: number;
  places: number;
  communities: number;
  circles: number;
  rituals: number;
  challenges: number;
  proofs: number;
  sealedArchitectures: number;
  forks: number;
  inferenceSignals: number;
  livePulseEvents: number;
  treasuryBalance: number;
  latestTrace: Transaction | null;
};
