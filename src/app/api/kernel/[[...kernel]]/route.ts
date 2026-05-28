import { NextRequest, NextResponse } from "next/server";
import {
  activateChallenge,
  architectureTemplates,
  completeChallenge,
  createChallenge,
  createCircle,
  createCommunity,
  createPlace,
  createRitual,
  createTransactionPreview,
  forkSealedArchitecture,
  getKernelPulse,
  getChallengeHistory,
  instantiateArchitectureTemplate,
  inviteMember,
  listChallengeTemplates,
  markAttendance,
  readKernel,
  recordFailureArtifact,
  recordInferenceSignal,
  recordOutcomeMetric,
  sealArchitecture,
  sealChallenge,
  submitProof,
  summarizeKernel,
  updateKernel,
  validateChallengeProof,
  resolveChallenge,
  rewardChallenge,
  updateMemberStatus
} from "@/lib/kernel-store";
import { buildFactoryFrontendState } from "@/lib/factory-front-adapter";
import type { KernelState } from "@/lib/kernel-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ kernel?: string[] }>;
};

function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

function fail(error: unknown, status = 400) {
  return NextResponse.json(
    { error: error instanceof Error ? error.message : "kernel_error" },
    { status }
  );
}

async function body(request: NextRequest) {
  return request.json().catch(() => ({}));
}

function endpoint(parts: string[] = []) {
  return parts.join("/");
}

export async function GET(_request: NextRequest, context: Params) {
  const state = await readKernel();
  const route = endpoint((await context.params).kernel);

  if (!route || route === "state") {
    return ok({ state, summary: summarizeKernel(state) });
  }

  if (route === "front") {
    return ok(buildFactoryFrontendState(state));
  }

  if (route === "treasury") {
    return ok({ treasuries: state.treasuries, rewards: state.rewards, transactions: state.transactions });
  }

  if (route === "challenges") {
    return ok({
      chain: "Pattern -> Ritual -> Challenge -> Attendance -> Proof -> Validation -> Reward -> Treasury -> Trace -> Fitness -> Fork",
      challenges: state.challenges,
      templates: listChallengeTemplates(state),
      history: getChallengeHistory(state)
    });
  }

  if (route === "challenges/templates") {
    return ok({ templates: listChallengeTemplates(state) });
  }

  if (route === "challenges/history") {
    return ok({ history: getChallengeHistory(state) });
  }

  if (route === "patterns") {
    return ok({
      patterns: state.patterns,
      versions: state.patternVersions,
      sealedArchitectures: state.sealedArchitectures
    });
  }

  if (route === "architecture/templates") {
    return ok({ templates: architectureTemplates });
  }

  if (route === "architecture/sealed") {
    return ok({
      sealedArchitectures: state.sealedArchitectures,
      licenses: state.patternLicenses,
      metrics: state.outcomeMetrics,
      failures: state.failureArtifacts,
      signals: state.inferenceSignals
    });
  }

  if (route === "architecture/forks") {
    return ok({ forks: state.patternForks });
  }

  if (route === "architecture/signals") {
    return ok({
      outcomeMetrics: state.outcomeMetrics,
      failureArtifacts: state.failureArtifacts,
      inferenceSignals: state.inferenceSignals
    });
  }

  if (route === "trace") {
    return ok({ transactions: state.transactions });
  }

  if (route === "pulse") {
    return ok({ pulse: getKernelPulse(state), events: state.pulseEvents });
  }

  return fail(`unknown_get_endpoint:${route}`, 404);
}

export async function POST(request: NextRequest, context: Params) {
  const route = endpoint((await context.params).kernel);
  const input = await body(request);

  try {
    let payload: unknown;
    const state = await updateKernel((draft: KernelState) => {
      switch (route) {
        case "place":
          payload = createPlace(draft, input);
          break;
        case "community":
          payload = createCommunity(draft, input);
          break;
        case "circle":
          payload = createCircle(draft, input);
          break;
        case "invite":
          payload = inviteMember(draft, input);
          break;
        case "ritual":
          payload = createRitual(draft, input);
          break;
        case "challenge":
        case "challenges":
          payload = createChallenge(draft, input);
          break;
        case "challenges/activate":
          payload = activateChallenge(draft, input);
          break;
        case "attendance":
          payload = markAttendance(draft, input);
          break;
        case "proof":
        case "challenges/proof":
          payload = submitProof(draft, input);
          break;
        case "challenges/validate":
          payload = validateChallengeProof(draft, input);
          break;
        case "challenges/resolve":
          payload = resolveChallenge(draft, input);
          break;
        case "challenges/reward":
          payload = rewardChallenge(draft, input);
          break;
        case "challenges/seal":
          payload = sealChallenge(draft, input);
          break;
        case "challenge/complete":
        case "challenges/complete":
          payload = completeChallenge(draft, input);
          break;
        case "membership/status":
          payload = updateMemberStatus(draft, input);
          break;
        case "transaction/preview":
        case "challenges/preview":
          payload = createTransactionPreview(draft, input);
          break;
        case "architecture/from-template":
          payload = instantiateArchitectureTemplate(draft, input);
          break;
        case "architecture/seal":
          payload = sealArchitecture(draft, input);
          break;
        case "architecture/fork":
          payload = forkSealedArchitecture(draft, input);
          break;
        case "architecture/outcome":
          payload = recordOutcomeMetric(draft, input);
          break;
        case "architecture/failure":
          payload = recordFailureArtifact(draft, input);
          break;
        case "architecture/inference":
          payload = recordInferenceSignal(draft, input);
          break;
        default:
          throw new Error(`unknown_post_endpoint:${route}`);
      }
    });
    return ok({ result: payload, state, summary: summarizeKernel(state) }, 201);
  } catch (error) {
    return fail(error);
  }
}
