import { getSupabase, isSupabaseConfigured } from "./supabase";
import {
  mockOpportunities,
  mockSignals,
  mockSources,
  mockZones,
} from "./mock-data";
import type {
  OpportunityRow,
  SignalRow,
  SourceInsert,
  SourceRow,
  SourceUpdate,
  ZoneRow,
} from "@/types/database";

let mockStore = [...mockOpportunities];
let mockSourceStore = [...mockSources];

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

export { isSupabaseConfigured };
