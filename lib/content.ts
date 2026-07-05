export type CodeLine = string;

export interface CodeSnippet {
  file: string;
  lines: CodeLine[];
}

export const snippets: CodeSnippet[] = [
  {
    file: "meta-capi.js",
    lines: [
      `<span class="kw">async function</span> <span class="fn">sendLeadEvent</span>(data) {`,
      `  <span class="kw">const</span> payload = {`,
      `    event_name: <span class="str">"Lead"</span>,`,
      `    event_source_url: data.url,`,
      `    user_data: hash(data.email)`,
      `  };`,
      `  <span class="kw">return</span> fetch(CAPI_ENDPOINT, {`,
      `    method: <span class="str">"POST"</span>,`,
      `    body: JSON.stringify(payload)`,
      `  });`,
      `}`,
      `<span class="cm">// fires on GHL webhook</span>`,
    ],
  },
  {
    file: "cadence/schema.sql",
    lines: [
      `<span class="kw">create table</span> time_entries (`,
      `  id uuid <span class="kw">default</span> gen_random_uuid(),`,
      `  user_id uuid <span class="kw">references</span> users,`,
      `  clock_in timestamptz <span class="kw">not null</span>,`,
      `  clock_out timestamptz,`,
      `  <span class="cm">-- total_hours is generated, never insert it</span>`,
      `  total_hours numeric <span class="kw">generated always as</span>`,
      `    (extract(epoch <span class="kw">from</span> clock_out - clock_in)/3600)`,
      `    <span class="kw">stored</span>`,
      `);`,
    ],
  },
  {
    file: "components/Hero.tsx",
    lines: [
      `<span class="kw">export default function</span> <span class="fn">Hero</span>() {`,
      `  <span class="kw">return</span> (`,
      `    &lt;<span class="fn">section</span> className=<span class="str">"h-screen"</span>&gt;`,
      `      &lt;<span class="fn">h1</span>&gt;Book Your Free Evaluation&lt;/<span class="fn">h1</span>&gt;`,
      `      &lt;<span class="fn">CTAButton</span> onClick={bookNow} /&gt;`,
      `    &lt;/<span class="fn">section</span>&gt;`,
      `  );`,
      `}`,
      `<span class="cm">// one CTA, on purpose</span>`,
    ],
  },
];

export interface RotatorWord {
  w: string;
  c: string;
}

export const heroWords: RotatorWord[] = [
  { w: "SCALE.", c: "#FF4D2E" },
  { w: "CODE.", c: "#4D8DFF" },
  { w: "ADS.", c: "#3ECF8E" },
  { w: "SYSTEMS.", c: "#FF4D2E" },
];
