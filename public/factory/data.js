// Factory of Culture — operational pattern data
// Each TEMPLATE is a cultural architecture. Catalog codes follow FC·NNN scheme.
// Family codes: SC=Supper Club, MC=Music Collective, PC=Place Circle,
//                CC=Challenge Cell, CG=Creator Guild, MA=Mutual Aid, NL=Nightlife Cell

window.TEMPLATES = [
  {
    code: "SC",
    catalog: "FC·011",
    family: "SUPPER · CLUB · SEASON",
    name: "Supper Club Season",
    thesis: "A rotating dinner ritual that binds a small group through repetition, hosting, and the obligation to bring something to the table.",
    glyph: "01.",
    place: "private kitchen · long table · 8–14 seats",
    cadence: { interval: "weekly", duration: "13 weeks", anchor: "Sunday · 19:30" },
    roles: ["Host (rotates)", "Cellar (drinks)", "Scribe (field note)", "Guest sponsor"],
    proof: ["Field note within 48h", "Photograph of the table", "Guest brought (≥1 per season)", "Contribution log"],
    rewards: ["Host credit (×2 attendance)", "Member status carry-over", "Treasury continuity", "Right to fork the season"],
    treasury: { split: "Pot-luck reimbursement + 10% to next season", model: "kitty" },
    governance: "Soft veto by Scribe on guest list. Two missed dinners → status pause.",
    onboarding: "Invite-only. Sponsor required. First dinner is a witness, not a member.",
    sealed: [
      { id: "SC-014", name: "Sunday Suppers", city: "Paris · Belleville", edition: "v1.2", reliability: 0.94, forks: 7, price: "$240", host: "La Buvette private room" },
      { id: "SC-021", name: "Pasta Sundays", city: "Brooklyn · Carroll Gardens", edition: "v1.0", reliability: 0.88, forks: 3, price: "$180", host: "Joe & Lina's loft" },
      { id: "SC-029", name: "Mesa Larga", city: "Mexico City · Roma Norte", edition: "v2.0", reliability: 0.91, forks: 11, price: "$320", host: "Casa Tabacalera" }
    ],
    accent: "#d4a574"
  },
  {
    code: "MC",
    catalog: "FC·012",
    family: "MUSIC · COLLECTIVE",
    name: "Music Collective",
    thesis: "A rehearsal cell anchored to a venue, with rotating sessions, peer roles, and a memory of who showed up to play.",
    glyph: "02.",
    place: "rehearsal space · venue · radio booth",
    cadence: { interval: "twice weekly", duration: "ongoing", anchor: "Tue 20:00 · Sat 14:00" },
    roles: ["Bandleader", "Engineer", "Booker", "Archivist (recordings)"],
    proof: ["Session attendance", "Track committed to archive", "Venue support (event night)", "Peer credit (≥2)"],
    rewards: ["Studio time pool", "Performance slot priority", "Revenue split memory", "Listed on archive"],
    treasury: { split: "60% performance · 30% gear · 10% reserve", model: "split" },
    governance: "Bandleader rotates per quarter. Archive vote required to remove a track.",
    onboarding: "Audition session. Two committed tracks before full membership.",
    sealed: [
      { id: "MC-007", name: "Tuesday Practice", city: "Lagos · Yaba", edition: "v1.1", reliability: 0.86, forks: 4, price: "$190", host: "Freedom Park rehearsal" },
      { id: "MC-018", name: "Sunny's House Band", city: "Brooklyn · Red Hook", edition: "v1.3", reliability: 0.92, forks: 6, price: "$220", host: "Sunny's Bar" }
    ],
    accent: "#a8b89a"
  },
  {
    code: "PC",
    catalog: "FC·013",
    family: "PLACE · CIRCLE",
    name: "Local Place Circle",
    thesis: "A community anchored to a single physical place — a cafe, a gym, a bookstore — that converts regulars into a circle with rights and obligations.",
    glyph: "03.",
    place: "cafe · studio · bookstore · gym · gallery",
    cadence: { interval: "twice weekly minimum", duration: "rolling", anchor: "site-defined" },
    roles: ["Keeper (venue host)", "Regular", "Witness", "Caller (sets next gathering)"],
    proof: ["Check-in at venue", "Contribution log (time / goods)", "Witness signature (≥1)", "Recurrence over 4 weeks"],
    rewards: ["Discount tier", "Access to closed hours", "Recognition in venue ledger", "Share of place treasury"],
    treasury: { split: "Venue 70% · Circle reserve 30%", model: "shared" },
    governance: "Keeper has the final say on access. Circle can call a place review quarterly.",
    onboarding: "Three witnessed visits in 30 days. Caller introduces the new regular.",
    sealed: [
      { id: "PC-031", name: "Café Lumière Regulars", city: "Lisbon · Príncipe Real", edition: "v1.0", reliability: 0.81, forks: 2, price: "$140", host: "Café Lumière" },
      { id: "PC-044", name: "The Gym Floor", city: "Berlin · Neukölln", edition: "v1.4", reliability: 0.89, forks: 8, price: "$160", host: "Boxhagener Boxing" }
    ],
    accent: "#b89a8a"
  },
  {
    code: "CC",
    catalog: "FC·014",
    family: "CHALLENGE · CELL",
    name: "Challenge Cell",
    thesis: "A small group commits to a hard, dated thing. Proof is binary. The cell dissolves on resolution; reliability persists.",
    glyph: "04.",
    place: "any · trust-bounded",
    cadence: { interval: "single sprint", duration: "21–90 days", anchor: "deadline-locked" },
    roles: ["Caller", "Validator", "Participant"],
    proof: ["Artifact submitted by deadline", "Validator countersign", "Public ledger entry"],
    rewards: ["Resolution rate boost", "Right to call next cell", "Reliability score increase"],
    treasury: { split: "Stake forfeited → reserve on failure", model: "stake" },
    governance: "Validator is named at call time. No retroactive deadline changes.",
    onboarding: "Open if invited; closed once locked. Late joiners go on the next call.",
    sealed: [
      { id: "CC-052", name: "30-Day Manuscript", city: "Distributed", edition: "v2.1", reliability: 0.73, forks: 19, price: "$90", host: "Discord + ledger" },
      { id: "CC-067", name: "Marathon Cell", city: "Nairobi · Karen", edition: "v1.0", reliability: 0.84, forks: 5, price: "$110", host: "Karen Country Club track" }
    ],
    accent: "#c8a06a"
  },
  {
    code: "CG",
    catalog: "FC·015",
    family: "CREATOR · GUILD",
    name: "Creator Guild",
    thesis: "A guild of makers running recurring production sprints with peer review and a published artifact at the end of each cycle.",
    glyph: "05.",
    place: "studio · distributed · gallery for showings",
    cadence: { interval: "monthly sprint", duration: "ongoing", anchor: "1st Monday → last Friday" },
    roles: ["Master", "Apprentice", "Reviewer (peer)", "Curator"],
    proof: ["Published piece per cycle", "Two peer reviews given", "Curator selection record"],
    rewards: ["Visibility allocation", "Shared production fund", "Rank/status carry", "Showcase slot"],
    treasury: { split: "Subs 50% · Production 35% · Showings 15%", model: "subscription" },
    governance: "Master rotates yearly. Curator nominated by peers, ratified by Master.",
    onboarding: "Submit a piece + a peer review. Apprentice for one cycle, then ratified.",
    sealed: [
      { id: "CG-008", name: "Writers' Room", city: "London · Hackney", edition: "v1.2", reliability: 0.79, forks: 6, price: "$210", host: "Hackney print shop" },
      { id: "CG-014", name: "Tape Loop Guild", city: "Tokyo · Koenji", edition: "v1.0", reliability: 0.87, forks: 4, price: "$260", host: "Koenji loft #3" }
    ],
    accent: "#9aa8b8"
  },
  {
    code: "MA",
    catalog: "FC·016",
    family: "MUTUAL · AID · CIRCLE",
    name: "Neighborhood Mutual Aid",
    thesis: "A neighborhood circle where needs and commitments are matched, completion is witnessed, and trust accumulates into a shared treasury.",
    glyph: "06.",
    place: "neighborhood · radius bounded",
    cadence: { interval: "as-needed + monthly synth", duration: "rolling", anchor: "first Saturday of month" },
    roles: ["Caller (need)", "Committer (help)", "Witness", "Steward (treasury)"],
    proof: ["Need posted with scope", "Completion witnessed by ≥1", "Receipt entered in ledger"],
    rewards: ["Trust memory", "Treasury share on resolution", "Recognition card"],
    treasury: { split: "Donations pooled · disbursed by Steward + Caller", model: "pool" },
    governance: "Steward elected yearly. Anyone can call a circle audit.",
    onboarding: "Sponsored by a Witness. First act must be a commitment, not a need.",
    sealed: [
      { id: "MA-003", name: "Mile End Aid", city: "Montréal · Mile End", edition: "v1.1", reliability: 0.92, forks: 3, price: "free", host: "Bagel co-op basement" }
    ],
    accent: "#a8c8a0"
  },
  {
    code: "NL",
    catalog: "FC·017",
    family: "NIGHTLIFE · CELL",
    name: "Nightlife Cell",
    thesis: "A nocturnal cell organized around a recurring night — DJs, door, room, ritual close. Reliability is the difference between scene and party.",
    glyph: "07.",
    place: "club · warehouse · bar · rooftop",
    cadence: { interval: "monthly", duration: "season (6 nights)", anchor: "Last Friday · 23:00 → 06:00" },
    roles: ["Resident (DJ)", "Door", "Floor host", "Closer (set-down ritual)"],
    proof: ["Door count log", "Set recorded + filed", "Floor health note (Closer)", "No-incident attestation"],
    rewards: ["Resident slot priority", "Door share", "Right to invite the next night", "Cell jacket / patch"],
    treasury: { split: "Door 55% · Residents 30% · Reserve 15%", model: "door+reserve" },
    governance: "Door has refusal authority. Closer files the night's note. Two bad nights → cell review.",
    onboarding: "Guested by a Resident. Work the door for one night before booking a set.",
    sealed: [
      { id: "NL-022", name: "Last Friday at the Warehouse", city: "Berlin · Friedrichshain", edition: "v1.3", reliability: 0.81, forks: 9, price: "$340", host: "Lager 17 warehouse" },
      { id: "NL-031", name: "Salón Subterráneo", city: "Mexico City · Doctores", edition: "v1.0", reliability: 0.76, forks: 4, price: "$270", host: "Doctores garage" },
      { id: "NL-040", name: "Dawn Ritual", city: "Tbilisi · Sololaki", edition: "v2.0", reliability: 0.88, forks: 6, price: "$300", host: "Bassiani back room" }
    ],
    accent: "#b8a0c8"
  }
];

// Sample instance for the live Kernel screen — Sunday Suppers · Paris.
window.LIVE_INSTANCE = {
  templateCode: "SC",
  id: "SC-014",
  name: "Sunday Suppers",
  city: "Paris · Belleville",
  place: "La Buvette · private room",
  thesis: "13 Sundays. One long table. Every guest brings something the room remembers.",
  edition: "v1.2 · SEALED 2026-03-14",
  members: 12,
  capacity: 14,
  weeksRun: 9,
  weeksLeft: 4,
  attendanceRate: 0.94,
  resolutionRate: 0.91,
  treasuryEUR: 1840,
  treasuryFlow: [
    { date: "2026-01-12", note: "Season 2 kitty seeded", delta: +600 },
    { date: "2026-02-02", note: "Wine cellar contribution", delta: +240 },
    { date: "2026-02-23", note: "Reimburse Lou · groceries", delta: -180 },
    { date: "2026-03-09", note: "Reimburse Yannick · groceries", delta: -210 },
    { date: "2026-03-30", note: "Guest sponsor donation", delta: +120 }
  ],
  nextRitual: { date: "2026-04-05", host: "Yannick", scribe: "Amina", guest: "Yael (sponsored by Lou)" },
  upcomingRituals: [
    { date: "2026-04-12", host: "Lou", scribe: "Marco" },
    { date: "2026-04-19", host: "Amina", scribe: "Yannick" },
    { date: "2026-04-26", host: "Marco", scribe: "Lou" }
  ],
  members_list: [
    { name: "Lou C.", role: "Scribe", attendance: 9, missed: 0, reliability: 1.0, joined: "Season 1" },
    { name: "Yannick D.", role: "Host", attendance: 9, missed: 0, reliability: 1.0, joined: "Season 1" },
    { name: "Amina K.", role: "Cellar", attendance: 8, missed: 1, reliability: 0.96, joined: "Season 1" },
    { name: "Marco V.", role: "Host", attendance: 8, missed: 1, reliability: 0.94, joined: "Season 1" },
    { name: "Hannah B.", role: "Scribe", attendance: 7, missed: 2, reliability: 0.88, joined: "Season 2" },
    { name: "Theo R.", role: "Sponsor", attendance: 6, missed: 3, reliability: 0.82, joined: "Season 2" },
    { name: "Salim A.", role: "Cellar", attendance: 9, missed: 0, reliability: 1.0, joined: "Season 1" },
    { name: "Iris W.", role: "Host", attendance: 7, missed: 2, reliability: 0.88, joined: "Season 2" },
    { name: "Pablo M.", role: "Sponsor", attendance: 5, missed: 4, reliability: 0.71, joined: "Season 2" },
    { name: "Noor F.", role: "Scribe", attendance: 8, missed: 1, reliability: 0.94, joined: "Season 1" },
    { name: "Jin H.", role: "Cellar", attendance: 6, missed: 3, reliability: 0.82, joined: "Season 2" },
    { name: "Esmé G.", role: "Host", attendance: 9, missed: 0, reliability: 1.0, joined: "Season 1" }
  ],
  traces: [
    { ts: "2026-03-29 · 22:14", chain: ["commitment", "proof", "validation", "reward"], who: "Yannick D.", text: "Filed field note for week 09 · cosigned by Amina · host credit +1" },
    { ts: "2026-03-29 · 21:48", chain: ["commitment", "proof", "validation"], who: "Amina K.", text: "Wine cellar log entered · validated by Lou" },
    { ts: "2026-03-23 · 19:30", chain: ["commitment"], who: "Lou C.", text: "Sponsored Yael as guest for week 10" },
    { ts: "2026-03-22 · 23:51", chain: ["commitment", "proof", "validation", "reward"], who: "Marco V.", text: "Hosted week 08 · scribe note received · host credit +1" },
    { ts: "2026-03-15 · 22:02", chain: ["commitment", "proof", "validation", "reward"], who: "Iris W.", text: "Hosted week 07 · scribe note received · host credit +1" },
    { ts: "2026-03-08 · 21:30", chain: ["commitment", "proof"], who: "Pablo M.", text: "Missed dinner week 06 · status pause flagged" }
  ],
  challenges: [
    { id: "CH-09", title: "Bring something the room hasn't tasted", status: "open", participants: 12, deadline: "Week 13" },
    { id: "CH-07", title: "Each member sponsors one guest", status: "closed", participants: 12, completed: 9, deadline: "Week 10" },
    { id: "CH-04", title: "Cellar rotation — 3 regions", status: "closed", participants: 4, completed: 4, deadline: "Week 09" }
  ]
};

// Marketplace — flattened list of sealed editions across templates, with a few extras.
window.MARKETPLACE = [
  { id: "SC-014", family: "SC", name: "Sunday Suppers", city: "Paris", edition: "v1.2", reliability: 0.94, forks: 7, price: "$240", sold: 23, status: "live" },
  { id: "NL-022", family: "NL", name: "Last Friday at the Warehouse", city: "Berlin", edition: "v1.3", reliability: 0.81, forks: 9, price: "$340", sold: 41, status: "live" },
  { id: "MC-018", family: "MC", name: "Sunny's House Band", city: "Brooklyn", edition: "v1.3", reliability: 0.92, forks: 6, price: "$220", sold: 18, status: "live" },
  { id: "CG-014", family: "CG", name: "Tape Loop Guild", city: "Tokyo", edition: "v1.0", reliability: 0.87, forks: 4, price: "$260", sold: 11, status: "live" },
  { id: "SC-029", family: "SC", name: "Mesa Larga", city: "Mexico City", edition: "v2.0", reliability: 0.91, forks: 11, price: "$320", sold: 34, status: "live" },
  { id: "PC-044", family: "PC", name: "The Gym Floor", city: "Berlin", edition: "v1.4", reliability: 0.89, forks: 8, price: "$160", sold: 27, status: "live" },
  { id: "CC-052", family: "CC", name: "30-Day Manuscript", family_name: "Challenge Cell", city: "Distributed", edition: "v2.1", reliability: 0.73, forks: 19, price: "$90", sold: 112, status: "live" },
  { id: "NL-040", family: "NL", name: "Dawn Ritual", city: "Tbilisi", edition: "v2.0", reliability: 0.88, forks: 6, price: "$300", sold: 14, status: "live" },
  { id: "MA-003", family: "MA", name: "Mile End Aid", city: "Montréal", edition: "v1.1", reliability: 0.92, forks: 3, price: "free", sold: 8, status: "live" },
  { id: "SC-021", family: "SC", name: "Pasta Sundays", city: "Brooklyn", edition: "v1.0", reliability: 0.88, forks: 3, price: "$180", sold: 6, status: "live" },
  { id: "MC-007", family: "MC", name: "Tuesday Practice", city: "Lagos", edition: "v1.1", reliability: 0.86, forks: 4, price: "$190", sold: 9, status: "live" },
  { id: "PC-031", family: "PC", name: "Café Lumière Regulars", city: "Lisbon", edition: "v1.0", reliability: 0.81, forks: 2, price: "$140", sold: 4, status: "draft" },
  { id: "CG-008", family: "CG", name: "Writers' Room", city: "London", edition: "v1.2", reliability: 0.79, forks: 6, price: "$210", sold: 22, status: "live" },
  { id: "NL-031", family: "NL", name: "Salón Subterráneo", city: "Mexico City", edition: "v1.0", reliability: 0.76, forks: 4, price: "$270", sold: 7, status: "live" }
];

// Lineage tree — Supper Club Season root + its forks across cities (for FC·060).
window.LINEAGE = {
  root: { id: "SC", name: "Supper Club Season · Pattern Root", edition: "—", city: "—", year: 2024 },
  // x/y in 0..1 over a world-ish lat/lon: x=longitude(-1=west,1=east), y=latitude
  nodes: [
    { id: "SC-014", parent: "SC", name: "Sunday Suppers", city: "Paris", edition: "v1.2", x: 0.51, y: 0.32, reliability: 0.94, forks: 7 },
    { id: "SC-021", parent: "SC-014", name: "Pasta Sundays", city: "Brooklyn", edition: "v1.0", x: 0.26, y: 0.40, reliability: 0.88, forks: 3 },
    { id: "SC-029", parent: "SC-014", name: "Mesa Larga", city: "Mexico City", edition: "v2.0", x: 0.21, y: 0.55, reliability: 0.91, forks: 11 },
    { id: "SC-033", parent: "SC-014", name: "Long Table Tbilisi", city: "Tbilisi", edition: "v1.1", x: 0.62, y: 0.38, reliability: 0.86, forks: 2 },
    { id: "SC-041", parent: "SC-029", name: "Mesa Domingo", city: "Buenos Aires", edition: "v1.0", x: 0.28, y: 0.78, reliability: 0.83, forks: 1 },
    { id: "SC-046", parent: "SC-029", name: "Casa Larga", city: "Madrid", edition: "v1.0", x: 0.49, y: 0.34, reliability: 0.81, forks: 0 },
    { id: "SC-052", parent: "SC-021", name: "Mission Sundays", city: "San Francisco", edition: "v1.0", x: 0.13, y: 0.42, reliability: 0.79, forks: 0 },
    { id: "SC-058", parent: "SC-014", name: "Setouchi Suppers", city: "Naoshima", edition: "v1.1", x: 0.82, y: 0.43, reliability: 0.92, forks: 4 },
    { id: "SC-061", parent: "SC-058", name: "Suppers Bangkok", city: "Bangkok", edition: "v1.0", x: 0.74, y: 0.55, reliability: 0.85, forks: 0 },
    { id: "SC-065", parent: "SC-014", name: "Suppers Lagos", city: "Lagos", edition: "v1.0", x: 0.52, y: 0.59, reliability: 0.78, forks: 0 }
  ]
};

// Failure artifacts — for the Proof-of-Architecture view (small inset on Pattern screen).
window.FAILURE_LOG = [
  { code: "SC-014/F·001", note: "Season 1 week 11 — host no-show. Treasury reimbursed guest cost from reserve.", severity: "low" },
  { code: "SC-021/F·002", note: "Scribe role unfilled for 3 consecutive dinners. Pattern adjusted: Scribe rotates with Host.", severity: "med" },
  { code: "NL-022/F·001", note: "Door under-staffed on launch night. Pattern adjusted: minimum two Door per night.", severity: "med" }
];
