import type { SamRawOpportunity, SamSearchParams, SamSearchQuery } from "@/types/procurement";
import {
  IT_NAICS_CODES,
  QUERY_COMBINATIONS,
  SAM_NOTICE_TYPES,
  SAM_SEARCH_BASE_URL,
} from "./keywords";

const MS_PER_DAY = 86_400_000;

/** Format date as MM/DD/YYYY for SAM.gov API. */
export function formatSamDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export function getPostedDateRange(options?: {
  fromDaysAgo?: number;
  toDaysAgo?: number;
  now?: Date;
}): { postedFrom: string; postedTo: string } {
  const now = options?.now ?? new Date();
  const fromDays = options?.fromDaysAgo ?? 30;
  const toDays = options?.toDaysAgo ?? 0;

  const postedTo = new Date(now.getTime() - toDays * MS_PER_DAY);
  const postedFrom = new Date(now.getTime() - fromDays * MS_PER_DAY);

  return {
    postedFrom: formatSamDate(postedFrom),
    postedTo: formatSamDate(postedTo),
  };
}

/**
 * Build programmatic SAM.gov query configurations.
 * SAM API only supports title search — combinations are enforced via post-fetch filtering.
 */
export function buildSamSearchQueries(options?: {
  postedFromDays?: number;
  postedToDays?: number;
}): SamSearchQuery[] {
  const postedFromDays = options?.postedFromDays ?? 30;
  const postedToDays = options?.postedToDays ?? 0;

  return QUERY_COMBINATIONS.map((combo) => ({
    id: combo.id,
    label: combo.label,
    // Use the pain term for title search (broader net); software term filtered post-fetch.
    titleTerm: combo.pain,
    requiredGroups: [combo.pain, combo.software],
    naicsCodes: [...IT_NAICS_CODES],
    postedFromDays,
    postedToDays,
  }));
}

/** Build URL search params for a single SAM.gov query. */
export function buildSamSearchUrl(
  query: SamSearchQuery,
  apiKey: string,
  options?: { limit?: number; offset?: number; now?: Date }
): string {
  const { postedFrom, postedTo } = getPostedDateRange({
    fromDaysAgo: query.postedFromDays,
    toDaysAgo: query.postedToDays,
    now: options?.now,
  });

  const params: SamSearchParams = {
    apiKey,
    postedFrom,
    postedTo,
    title: query.titleTerm,
    active: "Yes",
    ptype: SAM_NOTICE_TYPES,
    limit: options?.limit ?? 100,
    offset: options?.offset ?? 0,
  };

  return `${SAM_SEARCH_BASE_URL}?${serializeSamParams(params)}`;
}

export function serializeSamParams(params: SamSearchParams): string {
  const search = new URLSearchParams();
  search.set("api_key", params.apiKey);
  search.set("postedFrom", params.postedFrom);
  search.set("postedTo", params.postedTo);
  search.set("limit", String(params.limit ?? 100));
  search.set("offset", String(params.offset ?? 0));

  if (params.title) search.set("title", params.title);
  if (params.ncode) search.set("ncode", params.ncode);
  if (params.active) search.set("active", params.active);
  if (params.ptype) search.set("ptype", params.ptype);

  return search.toString();
}

type SamApiOpportunity = Record<string, unknown>;

/** Map SAM.gov API response item to normalized raw opportunity. */
export function parseSamOpportunity(raw: SamApiOpportunity): SamRawOpportunity | null {
  const noticeId = stringField(raw, "noticeId");
  const title = stringField(raw, "title");

  if (!noticeId || !title) return null;

  const description =
    stringField(raw, "description") ??
    stringField(raw, "organizationType") ??
    "";

  const agency =
    stringField(raw, "fullParentPathName") ??
    nestedString(raw, ["organizationHierarchy", "l1Name"]) ??
    "Unknown agency";

  const postedDate =
    stringField(raw, "postedDate") ?? stringField(raw, "publishDate") ?? "";

  const responseDeadline =
    stringField(raw, "responseDeadLine") ??
    stringField(raw, "responseDeadline") ??
    null;

  const estimatedValue = extractEstimatedValue(raw);
  const naicsCodes = extractNaicsCodes(raw);

  return {
    noticeId,
    title,
    description,
    agency,
    postedDate,
    responseDeadline,
    estimatedValue,
    url: `https://sam.gov/opp/${noticeId}/view`,
    naicsCodes,
    solicitationNumber: stringField(raw, "solicitationNumber") ?? undefined,
    active: stringField(raw, "active") === "Yes",
  };
}

/** Parse SAM.gov search response into normalized opportunities. */
export function parseSamSearchResponse(
  response: Record<string, unknown>
): SamRawOpportunity[] {
  const data = response.opportunitiesData ?? response.data;
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => parseSamOpportunity(item as SamApiOpportunity))
    .filter((item): item is SamRawOpportunity => item !== null);
}

function stringField(obj: SamApiOpportunity, key: string): string | null {
  const value = obj[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function nestedString(obj: SamApiOpportunity, path: string[]): string | null {
  let current: unknown = obj;
  for (const key of path) {
    if (!current || typeof current !== "object") return null;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" && current.trim() ? current.trim() : null;
}

function extractNaicsCodes(raw: SamApiOpportunity): string[] {
  const codes: string[] = [];
  const single = stringField(raw, "naicsCode");
  if (single) codes.push(single);

  const list = raw.naicsCodes;
  if (Array.isArray(list)) {
    for (const item of list) {
      if (typeof item === "string") codes.push(item);
      else if (item && typeof item === "object" && "code" in item) {
        const code = (item as { code?: string }).code;
        if (code) codes.push(code);
      }
    }
  }

  return [...new Set(codes)];
}

function extractEstimatedValue(raw: SamApiOpportunity): string | null {
  const award = raw.award;
  if (award && typeof award === "object") {
    const amount = (award as Record<string, unknown>).amount;
    if (typeof amount === "string" || typeof amount === "number") {
      return String(amount);
    }
  }

  return (
    stringField(raw, "awardAmount") ??
    stringField(raw, "estimatedValue") ??
    null
  );
}

/** Fetch opportunities from SAM.gov (server-side; requires API key). */
export async function fetchSamOpportunities(
  query: SamSearchQuery,
  apiKey: string,
  options?: { limit?: number; offset?: number; now?: Date }
): Promise<SamRawOpportunity[]> {
  const url = buildSamSearchUrl(query, apiKey, options);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`SAM.gov API error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as Record<string, unknown>;
  return parseSamSearchResponse(json);
}

/** Run all query combinations and deduplicate by noticeId. */
export async function fetchAllSamQueries(
  apiKey: string,
  options?: { postedFromDays?: number; limit?: number }
): Promise<SamRawOpportunity[]> {
  const queries = buildSamSearchQueries({
    postedFromDays: options?.postedFromDays ?? 30,
  });

  const seen = new Set<string>();
  const results: SamRawOpportunity[] = [];

  for (const query of queries) {
    const batch = await fetchSamOpportunities(query, apiKey, {
      limit: options?.limit ?? 50,
    });

    for (const opp of batch) {
      if (seen.has(opp.noticeId)) continue;
      seen.add(opp.noticeId);
      results.push(opp);
    }
  }

  return results;
}
