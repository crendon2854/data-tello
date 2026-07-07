import { getSupabase, isSupabaseConfigured } from "./supabase";
import {
  mockKeywordMetrics,
  mockKeywordSets,
  mockMarketProofRecords,
  mockOpportunities,
  mockProblemZoneSignals,
  mockProblemZones,
  mockRawSignals,
  mockSignals,
  mockSources,
  mockWorkflowFrictionSignals,
  mockZones,
} from "./mock-data";
import type {
  KeywordMetricInsert,
  KeywordMetricRow,
  KeywordMetricUpdate,
  KeywordSetInsert,
  KeywordSetRow,
  KeywordSetUpdate,
  KeywordSetWithMetrics,
  MarketProofRecordInsert,
  MarketProofRecordRow,
  MarketProofRecordUpdate,
  MarketProofRecordWithProblemZone,
  OpportunityRow,
  ProblemZoneInsert,
  ProblemZoneRow,
  ProblemZoneSignalRow,
  ProblemZoneUpdate,
  ProblemZoneWithSignals,
  RawSignalRow,
  RawSignalWithSource,
  SignalRow,
  SourceInsert,
  SourceRow,
  SourceUpdate,
  WorkflowFrictionSignalInsert,
  WorkflowFrictionSignalRow,
  WorkflowFrictionSignalUpdate,
  WorkflowFrictionSignalWithProblemZone,
  ZoneRow,
} from "@/types/database";

let mockStore = [...mockOpportunities];
let mockSourceStore = [...mockSources];
const mockRawSignalStore = [...mockRawSignals];
let mockProblemZoneStore = [...mockProblemZones];
let mockProblemZoneSignalStore = [...mockProblemZoneSignals];
let mockKeywordSetStore = [...mockKeywordSets];
let mockKeywordMetricStore = [...mockKeywordMetrics];
let mockMarketProofStore = [...mockMarketProofRecords];
let mockWorkflowFrictionStore = [...mockWorkflowFrictionSignals];

export async function getOpportunities(): Promise<OpportunityRow[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("status", "published")
      .order("overall_score", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  return mockStore.filter((o) => o.status === "published");
}

export async function getOpportunityById(
  id: string
): Promise<OpportunityRow | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }

  return mockStore.find((o) => o.id === id) ?? null;
}

export async function getAllOpportunities(): Promise<OpportunityRow[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  return [...mockStore];
}

export async function getDraftOpportunities(): Promise<OpportunityRow[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("status", "draft")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  return mockStore.filter((o) => o.status === "draft");
}

export async function createOpportunity(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Promise<OpportunityRow> {
  const client = getSupabase();

  if (client) {
    const { data: result, error } = await client
      .from("opportunities")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Create error:", error);
      throw error;
    }

    return result;
  }

  const opportunity: OpportunityRow = {
    id: String(Date.now()),
    title: String(data.title ?? ""),
    overall_score: Number(data.overall_score ?? 0),
    best_first_asset: (data.best_first_asset as string) ?? null,
    problem_summary: (data.problem_summary as string) ?? null,
    target_buyer: (data.target_buyer as string) ?? null,
    differentiation: (data.differentiation as string) ?? null,
    status: (data.status as OpportunityRow["status"]) ?? "draft",
    short_summary: null,
    complexity: null,
    tags: null,
    evidence_summary: null,
    key_pain_drivers: null,
    pressure_score: null,
    demand_score: null,
    wedge_score: null,
    buildability_score: null,
    asset_fit_score: null,
    asset_path_1: null,
    asset_path_2: null,
    asset_path_3: null,
    asset_reason: null,
    expansion_ladder: null,
    core_workflow: null,
    initial_wedge: null,
    time_to_value: null,
    underserved_segment: null,
    competitor_summary: null,
    avoid: null,
    entry_strategy: null,
    strategic_importance: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockStore = [opportunity, ...mockStore];
  return opportunity;
}

export async function updateOpportunity(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Promise<OpportunityRow | null> {
  const client = getSupabase();

  if (client) {
    const { data: result, error } = await client
      .from("opportunities")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      throw error;
    }

    return result;
  }

  const index = mockStore.findIndex((o) => o.id === id);
  if (index === -1) return null;

  mockStore[index] = { ...mockStore[index], ...data };
  return mockStore[index];
}

export async function updateOpportunityStatus(
  id: string,
  status: OpportunityRow["status"]
): Promise<OpportunityRow | null> {
  const payload = { status, updated_at: new Date().toISOString() };
  const supabase = getSupabase();

  if (supabase) {
    const { data: updated, error } = await supabase
      .from("opportunities")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return updated;
  }

  const index = mockStore.findIndex((o) => o.id === id);
  if (index === -1) return null;

  mockStore[index] = { ...mockStore[index], ...payload };
  return mockStore[index];
}

export async function getSignals(): Promise<SignalRow[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("signals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  return mockSignals;
}

function withSourceName(
  signal: (typeof mockRawSignalStore)[number]
): RawSignalWithSource {
  const source = mockSourceStore.find((s) => s.id === signal.source_id);
  return {
    ...signal,
    source_name: source?.name ?? null,
  };
}

export async function getRawSignals(): Promise<RawSignalWithSource[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("raw_signals")
      .select("*, sources(name)")
      .order("observed_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map((row) => {
      const { sources, ...signal } = row as typeof row & {
        sources: { name: string } | null;
      };
      return {
        ...signal,
        source_name: sources?.name ?? null,
      };
    });
  }

  return mockRawSignalStore.map(withSourceName);
}

export async function toggleRawSignalNeedsReview(
  id: string,
  needsReview: boolean
): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase
      .from("raw_signals")
      .update({ needs_review: needsReview })
      .eq("id", id);

    if (error) throw error;
    return;
  }

  const signal = mockRawSignalStore.find((s) => s.id === id);
  if (signal) signal.needs_review = needsReview;
}

export async function toggleSignalProcessed(
  id: string,
  processed: boolean
): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase
      .from("signals")
      .update({ processed })
      .eq("id", id);

    if (error) throw error;
    return;
  }

  const signal = mockSignals.find((s) => s.id === id);
  if (signal) signal.processed = processed;
}

export async function getZones(): Promise<ZoneRow[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("zones")
      .select("*")
      .order("title");

    if (error) throw error;
    return data ?? [];
  }

  return mockZones;
}

export async function upsertZone(
  zone: Omit<ZoneRow, "created_at"> & { created_at?: string }
): Promise<ZoneRow> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("zones")
      .upsert(zone)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  }

  const existing = mockZones.find((z) => z.id === zone.id);
  if (existing) {
    Object.assign(existing, zone);
    return existing;
  }

  const created: ZoneRow = {
    ...zone,
    created_at: zone.created_at ?? new Date().toISOString(),
  };
  mockZones.push(created);
  return created;
}

export async function getSources(): Promise<SourceRow[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("sources")
      .select("*")
      .order("name");

    if (error) throw error;
    return data ?? [];
  }

  return [...mockSourceStore];
}

export async function createSource(data: SourceInsert): Promise<SourceRow> {
  const supabase = getSupabase();
  const timestamp = new Date().toISOString();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("sources")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  const source: SourceRow = {
    id: data.id ?? String(Date.now()),
    name: data.name,
    workflow_lane: data.workflow_lane,
    source_type: data.source_type,
    category: data.category ?? null,
    api_status: data.api_status ?? "manual",
    cadence: data.cadence ?? null,
    geography_scope: data.geography_scope ?? null,
    reliability_score: data.reliability_score ?? null,
    freshness_window_days: data.freshness_window_days ?? null,
    active: data.active ?? true,
    last_sync_at: data.last_sync_at ?? null,
    notes: data.notes ?? null,
    created_at: data.created_at ?? timestamp,
    updated_at: data.updated_at ?? timestamp,
  };

  mockSourceStore = [source, ...mockSourceStore];
  return source;
}

export async function updateSource(
  id: string,
  data: SourceUpdate
): Promise<SourceRow | null> {
  const supabase = getSupabase();
  const payload = { ...data, updated_at: new Date().toISOString() };

  if (supabase) {
    const { data: result, error } = await supabase
      .from("sources")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  const index = mockSourceStore.findIndex((s) => s.id === id);
  if (index === -1) return null;

  mockSourceStore[index] = { ...mockSourceStore[index], ...payload };
  return mockSourceStore[index];
}

type SupabaseProblemZoneRow = ProblemZoneRow & {
  problem_zone_signals: Array<{
    raw_signals: RawSignalRow & { sources: { name: string } | null };
  }>;
};

function mapLinkedSignal(
  signal: RawSignalRow & { sources?: { name: string } | null }
): RawSignalWithSource {
  const { sources, ...rest } = signal;
  return {
    ...rest,
    source_name: sources?.name ?? null,
  };
}

function mapProblemZoneWithSignals(row: SupabaseProblemZoneRow): ProblemZoneWithSignals {
  const { problem_zone_signals, ...zone } = row;
  const linked_signals = (problem_zone_signals ?? [])
    .map((link) => link.raw_signals)
    .filter(Boolean)
    .map(mapLinkedSignal);

  return { ...zone, linked_signals };
}

function getMockLinkedSignals(problemZoneId: string): RawSignalWithSource[] {
  const signalIds = mockProblemZoneSignalStore
    .filter((link) => link.problem_zone_id === problemZoneId)
    .map((link) => link.raw_signal_id);

  return mockRawSignalStore
    .filter((signal) => signalIds.includes(signal.id))
    .map(withSourceName);
}

function recalculateMockZoneStats(problemZoneId: string): void {
  const linkedSignals = getMockLinkedSignals(problemZoneId);
  const zone = mockProblemZoneStore.find((z) => z.id === problemZoneId);
  if (!zone) return;

  zone.source_count = linkedSignals.length;
  zone.source_diversity_count = new Set(
    linkedSignals.map((s) => s.source_id).filter(Boolean)
  ).size;
  zone.updated_at = new Date().toISOString();
}

async function recalculateSupabaseZoneStats(
  supabase: NonNullable<ReturnType<typeof getSupabase>>,
  problemZoneId: string
): Promise<void> {
  const { data: links, error: linksError } = await supabase
    .from("problem_zone_signals")
    .select("raw_signal_id, raw_signals(source_id)")
    .eq("problem_zone_id", problemZoneId);

  if (linksError) throw linksError;

  const sourceCount = links?.length ?? 0;
  const sourceDiversity = new Set(
    (links ?? [])
      .map((link) => {
        const rawSignal = link.raw_signals as unknown as
          | { source_id: string | null }
          | null;
        return rawSignal?.source_id ?? null;
      })
      .filter(Boolean)
  ).size;

  const { error } = await supabase
    .from("problem_zones")
    .update({
      source_count: sourceCount,
      source_diversity_count: sourceDiversity,
      updated_at: new Date().toISOString(),
    })
    .eq("id", problemZoneId);

  if (error) throw error;
}

function toMockProblemZoneWithSignals(zone: ProblemZoneRow): ProblemZoneWithSignals {
  return {
    ...zone,
    linked_signals: getMockLinkedSignals(zone.id),
  };
}

export async function getProblemZones(): Promise<ProblemZoneWithSignals[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("problem_zones")
      .select(
        "*, problem_zone_signals(raw_signals(*, sources(name)))"
      )
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map((row) =>
      mapProblemZoneWithSignals(row as SupabaseProblemZoneRow)
    );
  }

  return mockProblemZoneStore.map(toMockProblemZoneWithSignals);
}

export async function getProblemZoneById(
  id: string
): Promise<ProblemZoneWithSignals | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("problem_zones")
      .select(
        "*, problem_zone_signals(raw_signals(*, sources(name)))"
      )
      .eq("id", id)
      .single();

    if (error) return null;
    return mapProblemZoneWithSignals(data as SupabaseProblemZoneRow);
  }

  const zone = mockProblemZoneStore.find((z) => z.id === id);
  return zone ? toMockProblemZoneWithSignals(zone) : null;
}

export async function createProblemZone(
  data: ProblemZoneInsert
): Promise<ProblemZoneWithSignals> {
  const supabase = getSupabase();
  const timestamp = new Date().toISOString();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("problem_zones")
      .insert([data])
      .select(
        "*, problem_zone_signals(raw_signals(*, sources(name)))"
      )
      .single();

    if (error) throw error;
    return mapProblemZoneWithSignals(result as SupabaseProblemZoneRow);
  }

  const zone: ProblemZoneRow = {
    id: data.id ?? String(Date.now()),
    name: data.name,
    summary: data.summary ?? null,
    primary_industry: data.primary_industry ?? null,
    sub_industry: data.sub_industry ?? null,
    primary_buyer: data.primary_buyer ?? null,
    secondary_buyer: data.secondary_buyer ?? null,
    buyer_confidence: data.buyer_confidence ?? null,
    geography_scope: data.geography_scope ?? null,
    timing_label: data.timing_label ?? null,
    pain_theme: data.pain_theme ?? null,
    source_count: data.source_count ?? 0,
    source_diversity_count: data.source_diversity_count ?? 0,
    pressure_strength_score: data.pressure_strength_score ?? null,
    freshness_score: data.freshness_score ?? null,
    friction_score: data.friction_score ?? null,
    signal_mix: data.signal_mix ?? null,
    status: data.status ?? "new",
    owner: data.owner ?? null,
    notes: data.notes ?? null,
    created_at: data.created_at ?? timestamp,
    updated_at: data.updated_at ?? timestamp,
  };

  mockProblemZoneStore = [zone, ...mockProblemZoneStore];
  return toMockProblemZoneWithSignals(zone);
}

export async function updateProblemZone(
  id: string,
  data: ProblemZoneUpdate
): Promise<ProblemZoneWithSignals | null> {
  const supabase = getSupabase();
  const payload = { ...data, updated_at: new Date().toISOString() };

  if (supabase) {
    const { data: result, error } = await supabase
      .from("problem_zones")
      .update(payload)
      .eq("id", id)
      .select(
        "*, problem_zone_signals(raw_signals(*, sources(name)))"
      )
      .single();

    if (error) throw error;
    return mapProblemZoneWithSignals(result as SupabaseProblemZoneRow);
  }

  const index = mockProblemZoneStore.findIndex((z) => z.id === id);
  if (index === -1) return null;

  mockProblemZoneStore[index] = { ...mockProblemZoneStore[index], ...payload };
  return toMockProblemZoneWithSignals(mockProblemZoneStore[index]);
}

export async function linkRawSignalToProblemZone(
  problemZoneId: string,
  rawSignalId: string
): Promise<ProblemZoneSignalRow> {
  const supabase = getSupabase();
  const timestamp = new Date().toISOString();

  if (supabase) {
    const { data, error } = await supabase
      .from("problem_zone_signals")
      .insert([{ problem_zone_id: problemZoneId, raw_signal_id: rawSignalId }])
      .select()
      .single();

    if (error) throw error;
    await recalculateSupabaseZoneStats(supabase, problemZoneId);
    return data;
  }

  const existing = mockProblemZoneSignalStore.find(
    (link) =>
      link.problem_zone_id === problemZoneId && link.raw_signal_id === rawSignalId
  );
  if (existing) return existing;

  const link: ProblemZoneSignalRow = {
    problem_zone_id: problemZoneId,
    raw_signal_id: rawSignalId,
    created_at: timestamp,
  };
  mockProblemZoneSignalStore = [...mockProblemZoneSignalStore, link];
  recalculateMockZoneStats(problemZoneId);
  return link;
}

export async function unlinkRawSignalFromProblemZone(
  problemZoneId: string,
  rawSignalId: string
): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase
      .from("problem_zone_signals")
      .delete()
      .eq("problem_zone_id", problemZoneId)
      .eq("raw_signal_id", rawSignalId);

    if (error) throw error;
    await recalculateSupabaseZoneStats(supabase, problemZoneId);
    return;
  }

  mockProblemZoneSignalStore = mockProblemZoneSignalStore.filter(
    (link) =>
      !(
        link.problem_zone_id === problemZoneId &&
        link.raw_signal_id === rawSignalId
      )
  );
  recalculateMockZoneStats(problemZoneId);
}

type SupabaseKeywordSetRow = KeywordSetRow & {
  problem_zones: { name: string } | { name: string }[] | null;
  keyword_metrics: KeywordMetricRow[] | null;
};

const KEYWORD_SET_SELECT =
  "*, problem_zones(name), keyword_metrics(*)";

function mapKeywordSetWithMetrics(
  row: SupabaseKeywordSetRow
): KeywordSetWithMetrics {
  const { problem_zones, keyword_metrics, ...set } = row;
  const zoneName = problem_zones
    ? Array.isArray(problem_zones)
      ? (problem_zones[0]?.name ?? null)
      : problem_zones.name
    : null;

  return {
    ...set,
    problem_zone_name: zoneName,
    metrics: keyword_metrics ?? [],
  };
}

function toMockKeywordSetWithMetrics(set: KeywordSetRow): KeywordSetWithMetrics {
  const zone = mockProblemZoneStore.find((z) => z.id === set.problem_zone_id);
  return {
    ...set,
    problem_zone_name: zone?.name ?? null,
    metrics: mockKeywordMetricStore.filter((m) => m.keyword_set_id === set.id),
  };
}

export async function getKeywordSets(): Promise<KeywordSetWithMetrics[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("keyword_sets")
      .select(KEYWORD_SET_SELECT)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map((row) =>
      mapKeywordSetWithMetrics(row as SupabaseKeywordSetRow)
    );
  }

  return mockKeywordSetStore.map(toMockKeywordSetWithMetrics);
}

export async function getKeywordSetById(
  id: string
): Promise<KeywordSetWithMetrics | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("keyword_sets")
      .select(KEYWORD_SET_SELECT)
      .eq("id", id)
      .single();

    if (error) return null;
    return mapKeywordSetWithMetrics(data as SupabaseKeywordSetRow);
  }

  const set = mockKeywordSetStore.find((ks) => ks.id === id);
  return set ? toMockKeywordSetWithMetrics(set) : null;
}

export async function createKeywordSet(
  data: KeywordSetInsert
): Promise<KeywordSetWithMetrics> {
  const supabase = getSupabase();
  const timestamp = new Date().toISOString();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("keyword_sets")
      .insert([data])
      .select(KEYWORD_SET_SELECT)
      .single();

    if (error) throw error;
    return mapKeywordSetWithMetrics(result as SupabaseKeywordSetRow);
  }

  const set: KeywordSetRow = {
    id: data.id ?? String(Date.now()),
    problem_zone_id: data.problem_zone_id ?? null,
    name: data.name,
    topic_layer: data.topic_layer ?? null,
    workflow_layer: data.workflow_layer ?? null,
    product_layer: data.product_layer ?? null,
    buyer_layer: data.buyer_layer ?? null,
    seed_keywords: data.seed_keywords ?? [],
    expanded_keywords: data.expanded_keywords ?? [],
    rejected_keywords: data.rejected_keywords ?? [],
    geo_target: data.geo_target ?? null,
    dataforseo_pulled: data.dataforseo_pulled ?? false,
    last_enriched_at: data.last_enriched_at ?? null,
    notes: data.notes ?? null,
    created_at: data.created_at ?? timestamp,
  };

  mockKeywordSetStore = [set, ...mockKeywordSetStore];
  return toMockKeywordSetWithMetrics(set);
}

export async function updateKeywordSet(
  id: string,
  data: KeywordSetUpdate
): Promise<KeywordSetWithMetrics | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("keyword_sets")
      .update(data)
      .eq("id", id)
      .select(KEYWORD_SET_SELECT)
      .single();

    if (error) throw error;
    return mapKeywordSetWithMetrics(result as SupabaseKeywordSetRow);
  }

  const index = mockKeywordSetStore.findIndex((ks) => ks.id === id);
  if (index === -1) return null;

  mockKeywordSetStore[index] = { ...mockKeywordSetStore[index], ...data };
  return toMockKeywordSetWithMetrics(mockKeywordSetStore[index]);
}

export async function createKeywordMetric(
  data: KeywordMetricInsert
): Promise<KeywordMetricRow> {
  const supabase = getSupabase();
  const timestamp = new Date().toISOString();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("keyword_metrics")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  const metric: KeywordMetricRow = {
    id: data.id ?? String(Date.now()),
    keyword_set_id: data.keyword_set_id,
    keyword: data.keyword,
    search_volume: data.search_volume ?? null,
    trend_direction: data.trend_direction ?? null,
    cpc: data.cpc ?? null,
    competition: data.competition ?? null,
    related_keyword_density: data.related_keyword_density ?? null,
    geo_signal: data.geo_signal ?? null,
    intent_type: data.intent_type ?? null,
    kept_for_scoring: data.kept_for_scoring ?? false,
    created_at: data.created_at ?? timestamp,
  };

  mockKeywordMetricStore = [...mockKeywordMetricStore, metric];
  return metric;
}

export async function updateKeywordMetric(
  id: string,
  data: KeywordMetricUpdate
): Promise<KeywordMetricRow | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("keyword_metrics")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  const index = mockKeywordMetricStore.findIndex((m) => m.id === id);
  if (index === -1) return null;

  mockKeywordMetricStore[index] = {
    ...mockKeywordMetricStore[index],
    ...data,
  };
  return mockKeywordMetricStore[index];
}

export async function deleteKeywordMetric(id: string): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase
      .from("keyword_metrics")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return;
  }

  mockKeywordMetricStore = mockKeywordMetricStore.filter((m) => m.id !== id);
}

type SupabaseMarketProofRow = MarketProofRecordRow & {
  problem_zones: { name: string } | { name: string }[] | null;
};

const MARKET_PROOF_SELECT = "*, problem_zones(name)";

function mapMarketProofRecord(
  row: SupabaseMarketProofRow
): MarketProofRecordWithProblemZone {
  const { problem_zones, ...record } = row;
  const zoneName = problem_zones
    ? Array.isArray(problem_zones)
      ? (problem_zones[0]?.name ?? null)
      : problem_zones.name
    : null;

  return {
    ...record,
    problem_zone_name: zoneName,
  };
}

function toMockMarketProofRecord(
  record: MarketProofRecordRow
): MarketProofRecordWithProblemZone {
  const zone = mockProblemZoneStore.find((z) => z.id === record.problem_zone_id);
  return {
    ...record,
    problem_zone_name: zone?.name ?? null,
  };
}

export async function getMarketProofRecords(): Promise<
  MarketProofRecordWithProblemZone[]
> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("market_proof_records")
      .select(MARKET_PROOF_SELECT)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map((row) =>
      mapMarketProofRecord(row as SupabaseMarketProofRow)
    );
  }

  return mockMarketProofStore.map(toMockMarketProofRecord);
}

export async function getMarketProofRecordById(
  id: string
): Promise<MarketProofRecordWithProblemZone | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("market_proof_records")
      .select(MARKET_PROOF_SELECT)
      .eq("id", id)
      .single();

    if (error) return null;
    return mapMarketProofRecord(data as SupabaseMarketProofRow);
  }

  const record = mockMarketProofStore.find((r) => r.id === id);
  return record ? toMockMarketProofRecord(record) : null;
}

export async function createMarketProofRecord(
  data: MarketProofRecordInsert
): Promise<MarketProofRecordWithProblemZone> {
  const supabase = getSupabase();
  const timestamp = new Date().toISOString();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("market_proof_records")
      .insert([data])
      .select(MARKET_PROOF_SELECT)
      .single();

    if (error) throw error;
    return mapMarketProofRecord(result as SupabaseMarketProofRow);
  }

  const record: MarketProofRecordRow = {
    id: data.id ?? String(Date.now()),
    problem_zone_id: data.problem_zone_id ?? null,
    core_search_phrase: data.core_search_phrase ?? null,
    category_exists: data.category_exists ?? null,
    visible_competitor_count: data.visible_competitor_count ?? null,
    hidden_market_risk: data.hidden_market_risk ?? null,
    review_sites_found: data.review_sites_found ?? null,
    pricing_visibility: data.pricing_visibility ?? null,
    job_posting_evidence: data.job_posting_evidence ?? null,
    spend_evidence: data.spend_evidence ?? null,
    sec_evidence: data.sec_evidence ?? null,
    usaspending_evidence: data.usaspending_evidence ?? null,
    segment_wedge: data.segment_wedge ?? null,
    competition_notes: data.competition_notes ?? null,
    manual_reviewer_notes: data.manual_reviewer_notes ?? null,
    market_proof_score: data.market_proof_score ?? null,
    created_at: data.created_at ?? timestamp,
  };

  mockMarketProofStore = [record, ...mockMarketProofStore];
  return toMockMarketProofRecord(record);
}

export async function updateMarketProofRecord(
  id: string,
  data: MarketProofRecordUpdate
): Promise<MarketProofRecordWithProblemZone | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("market_proof_records")
      .update(data)
      .eq("id", id)
      .select(MARKET_PROOF_SELECT)
      .single();

    if (error) throw error;
    return mapMarketProofRecord(result as SupabaseMarketProofRow);
  }

  const index = mockMarketProofStore.findIndex((r) => r.id === id);
  if (index === -1) return null;

  mockMarketProofStore[index] = { ...mockMarketProofStore[index], ...data };
  return toMockMarketProofRecord(mockMarketProofStore[index]);
}

export async function deleteMarketProofRecord(id: string): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase
      .from("market_proof_records")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return;
  }

  mockMarketProofStore = mockMarketProofStore.filter((r) => r.id !== id);
}

type SupabaseWorkflowFrictionRow = WorkflowFrictionSignalRow & {
  problem_zones: { name: string } | { name: string }[] | null;
};

const WORKFLOW_FRICTION_SELECT = "*, problem_zones(name)";

function mapWorkflowFrictionSignal(
  row: SupabaseWorkflowFrictionRow
): WorkflowFrictionSignalWithProblemZone {
  const { problem_zones, ...signal } = row;
  const zoneName = problem_zones
    ? Array.isArray(problem_zones)
      ? (problem_zones[0]?.name ?? null)
      : problem_zones.name
    : null;

  return {
    ...signal,
    problem_zone_name: zoneName,
  };
}

function toMockWorkflowFrictionSignal(
  signal: WorkflowFrictionSignalRow
): WorkflowFrictionSignalWithProblemZone {
  const zone = mockProblemZoneStore.find((z) => z.id === signal.problem_zone_id);
  return {
    ...signal,
    problem_zone_name: zone?.name ?? null,
  };
}

export async function getWorkflowFrictionSignals(): Promise<
  WorkflowFrictionSignalWithProblemZone[]
> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("workflow_friction_signals")
      .select(WORKFLOW_FRICTION_SELECT)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map((row) =>
      mapWorkflowFrictionSignal(row as SupabaseWorkflowFrictionRow)
    );
  }

  return mockWorkflowFrictionStore.map(toMockWorkflowFrictionSignal);
}

export async function getWorkflowFrictionSignalById(
  id: string
): Promise<WorkflowFrictionSignalWithProblemZone | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("workflow_friction_signals")
      .select(WORKFLOW_FRICTION_SELECT)
      .eq("id", id)
      .single();

    if (error) return null;
    return mapWorkflowFrictionSignal(data as SupabaseWorkflowFrictionRow);
  }

  const signal = mockWorkflowFrictionStore.find((s) => s.id === id);
  return signal ? toMockWorkflowFrictionSignal(signal) : null;
}

export async function createWorkflowFrictionSignal(
  data: WorkflowFrictionSignalInsert
): Promise<WorkflowFrictionSignalWithProblemZone> {
  const supabase = getSupabase();
  const timestamp = new Date().toISOString();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("workflow_friction_signals")
      .insert([data])
      .select(WORKFLOW_FRICTION_SELECT)
      .single();

    if (error) throw error;
    return mapWorkflowFrictionSignal(result as SupabaseWorkflowFrictionRow);
  }

  const signal: WorkflowFrictionSignalRow = {
    id: data.id ?? String(Date.now()),
    problem_zone_id: data.problem_zone_id ?? null,
    source: data.source,
    source_url: data.source_url ?? null,
    title: data.title ?? null,
    summary: data.summary ?? null,
    friction_type: data.friction_type ?? null,
    friction_score: data.friction_score ?? null,
    repetition_score: data.repetition_score ?? null,
    source_diversity_score: data.source_diversity_score ?? null,
    workflow_specificity_score: data.workflow_specificity_score ?? null,
    manual_workaround_score: data.manual_workaround_score ?? null,
    manual_workaround_detected: data.manual_workaround_detected ?? false,
    evidence_count: data.evidence_count ?? 0,
    accepted_for_scoring: data.accepted_for_scoring ?? false,
    created_at: data.created_at ?? timestamp,
  };

  mockWorkflowFrictionStore = [signal, ...mockWorkflowFrictionStore];
  return toMockWorkflowFrictionSignal(signal);
}

export async function updateWorkflowFrictionSignal(
  id: string,
  data: WorkflowFrictionSignalUpdate
): Promise<WorkflowFrictionSignalWithProblemZone | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data: result, error } = await supabase
      .from("workflow_friction_signals")
      .update(data)
      .eq("id", id)
      .select(WORKFLOW_FRICTION_SELECT)
      .single();

    if (error) throw error;
    return mapWorkflowFrictionSignal(result as SupabaseWorkflowFrictionRow);
  }

  const index = mockWorkflowFrictionStore.findIndex((s) => s.id === id);
  if (index === -1) return null;

  mockWorkflowFrictionStore[index] = {
    ...mockWorkflowFrictionStore[index],
    ...data,
  };
  return toMockWorkflowFrictionSignal(mockWorkflowFrictionStore[index]);
}

export async function deleteWorkflowFrictionSignal(id: string): Promise<void> {
  const supabase = getSupabase();

  if (supabase) {
    const { error } = await supabase
      .from("workflow_friction_signals")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return;
  }

  mockWorkflowFrictionStore = mockWorkflowFrictionStore.filter(
    (s) => s.id !== id
  );
}

export { isSupabaseConfigured };
