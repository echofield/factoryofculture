import { architectureTemplates, getKernelPulse } from "./kernel-store";
import type {
  ArchitectureTemplate,
  ChallengeTemplate,
  KernelState,
  OperationalPattern,
  PatternFork,
  SealedArchitecture
} from "./kernel-types";

type SpeciesCard = {
  id: string;
  code: string;
  name: string;
  category: string;
  thesis: string;
  status: string;
  fitnessScore: number;
  populationCount: number;
  forkCount: number;
  joinedIndexAt: string | null;
  editorialAttestation: string | null;
  currentCycleState: string;
  nextRitualAt: string | null;
  vitalSign: {
    label: string;
    value: string;
    intensity: "low" | "medium" | "high";
  };
  challengeTemplates: ChallengeTemplate[];
  challengeSpine: string[];
};

type MarketplaceEdition = {
  id: string;
  name: string;
  thesis: string;
  patternId: string;
  circleId: string | null;
  communityId: string | null;
  status: string;
  license: string;
  price: number;
  currency: string;
  fitnessScore: number;
  forkCount: number;
  sealedAt: string;
};

type LineageNode = {
  id: string;
  parentId: string | null;
  name: string;
  patternId: string;
  circleId: string | null;
  communityId: string | null;
  type: "sealed" | "fork";
  createdAt: string;
};

const templateCodeMap: Record<string, string> = {
  tpl_supper_club_season: "SC",
  tpl_music_collective: "MC",
  tpl_place_circle: "PC",
  tpl_challenge_cell: "CC",
  tpl_creator_guild: "CG",
  tpl_mutual_aid_circle: "MA",
  tpl_nightlife_cell: "NL"
};

export function buildFactoryFrontendState(state: KernelState) {
  const pulse = getKernelPulse(state);
  const patternsById = new Map(state.patterns.map((pattern) => [pattern.id, pattern]));
  const templateSpecies = architectureTemplates.map((template) => speciesFromTemplate(template));
  const livingSpecies = state.patterns.map((pattern) => speciesFromPattern(pattern));

  return {
    doctrine: {
      frame: "living field guide of social architectures",
      designLaw: "The index is calm; life appears as punctual signals.",
      backendLaw: "The kernel records life as events; the frontend reveals it as vital signs.",
      economicLaw: "Challenge is the universal action unit inside every pattern.",
      chain: [
        "Pattern",
        "Ritual",
        "Challenge",
        "Attendance",
        "Proof",
        "Validation",
        "Reward",
        "Treasury",
        "Trace",
        "Fitness",
        "Fork"
      ]
    },
    species: [...templateSpecies, ...livingSpecies],
    pulse,
    marketplace: state.sealedArchitectures.map((sealed) =>
      marketplaceFromSealed(state, patternsById, sealed)
    ),
    lineage: buildLineage(state),
    proposalAperture: {
      id: "proposal_aperture",
      status: "forming",
      title: "Open architecture slot",
      description: "A pattern-shaped opening for a new operating form after one full cycle and proof of recurrence.",
      witnessCount: state.pulseEvents.filter((pulseEvent) => pulseEvent.type === "proposal_forming").length,
      draftState: state.patterns.some((pattern) => pattern.status === "forming") ? "drafts circulating" : "waiting for form"
    },
    challenges: {
      templates: architectureTemplates.flatMap((template) => template.challengeTemplates),
      active: state.challenges.filter((challenge) => challenge.status !== "sealed"),
      history: state.challenges.map((challenge) => ({
        challenge,
        proofs: state.proofs.filter((proof) => proof.challengeId === challenge.id),
        rewards: state.rewards.filter((reward) => reward.challengeId === challenge.id),
        transactions: state.transactions.filter((transaction) => transaction.challengeId === challenge.id)
      }))
    }
  };
}

function speciesFromTemplate(template: ArchitectureTemplate): SpeciesCard {
  const intensity = template.status === "live" ? "medium" : template.status === "forming" ? "low" : "low";
  return {
    id: template.id,
    code: templateCodeMap[template.id] || template.id,
    name: template.name,
    category: template.category,
    thesis: template.thesis,
    status: template.status,
    fitnessScore: template.fitnessScore,
    populationCount: template.populationCount,
    forkCount: template.forkCount,
    joinedIndexAt: template.joinedIndexAt,
    editorialAttestation: template.editorialAttestation,
    currentCycleState: template.currentCycleState,
    nextRitualAt: template.nextRitualAt,
    vitalSign: {
      label: template.currentCycleState,
      value: `${template.populationCount} sealed / ${template.forkCount} forks`,
      intensity
    },
    challengeTemplates: template.challengeTemplates,
    challengeSpine: template.challengeTemplates.map((challenge) => `${challenge.title}: ${challenge.validationMode} validation, ${challenge.rewardAmount} SYM reward`)
  };
}

function speciesFromPattern(pattern: OperationalPattern): SpeciesCard {
  const challengeTemplates = pattern.challengeTemplates ?? [];
  return {
    id: pattern.id,
    code: pattern.templateId ? templateCodeMap[pattern.templateId] || "FOC" : "FOC",
    name: pattern.name,
    category: "instantiated_pattern",
    thesis: pattern.editorialAttestation || pattern.name,
    status: pattern.status,
    fitnessScore: pattern.fitnessScore,
    populationCount: pattern.populationCount,
    forkCount: pattern.forkCount,
    joinedIndexAt: pattern.joinedIndexAt,
    editorialAttestation: pattern.editorialAttestation,
    currentCycleState: pattern.currentCycleState,
    nextRitualAt: pattern.nextRitualAt,
    vitalSign: {
      label: pattern.currentCycleState,
      value: `${Math.round(pattern.fitnessScore * 100)}% fitness`,
      intensity: pattern.fitnessScore >= 0.88 ? "high" : pattern.fitnessScore >= 0.72 ? "medium" : "low"
    },
    challengeTemplates,
    challengeSpine: challengeTemplates.map((challenge) => `${challenge.title}: ${challenge.validationMode} validation, ${challenge.rewardAmount} SYM reward`)
  };
}

function marketplaceFromSealed(
  state: KernelState,
  patternsById: Map<string, OperationalPattern>,
  sealed: SealedArchitecture
): MarketplaceEdition {
  const license = state.patternLicenses.find((item) => item.sealedArchitectureId === sealed.id);
  const pattern = patternsById.get(sealed.patternId);

  return {
    id: sealed.id,
    name: sealed.name,
    thesis: sealed.thesis,
    patternId: sealed.patternId,
    circleId: sealed.circleId,
    communityId: sealed.communityId,
    status: sealed.status,
    license: license?.type || "private",
    price: license?.price ?? 0,
    currency: license?.currency || "EUR",
    fitnessScore: pattern?.fitnessScore ?? 0,
    forkCount: pattern?.forkCount ?? 0,
    sealedAt: sealed.sealedAt
  };
}

function buildLineage(state: KernelState): LineageNode[] {
  const sealedNodes: LineageNode[] = state.sealedArchitectures.map((sealed) => ({
    id: sealed.id,
    parentId: sealed.lineage.at(-1) ?? null,
    name: sealed.name,
    patternId: sealed.patternId,
    circleId: sealed.circleId,
    communityId: sealed.communityId,
    type: "sealed",
    createdAt: sealed.sealedAt
  }));

  const forkNodes = state.patternForks.map((fork) => lineageFromFork(state, fork));
  return [...sealedNodes, ...forkNodes].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

function lineageFromFork(state: KernelState, fork: PatternFork): LineageNode {
  const pattern = state.patterns.find((item) => item.id === fork.targetPatternId);
  return {
    id: fork.id,
    parentId: fork.sourceSealedArchitectureId,
    name: pattern?.name || fork.targetPatternId,
    patternId: fork.targetPatternId,
    circleId: fork.targetCircleId,
    communityId: fork.targetCommunityId,
    type: "fork",
    createdAt: fork.createdAt
  };
}
