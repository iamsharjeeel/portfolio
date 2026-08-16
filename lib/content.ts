export type TokenClass = "kw" | "fn" | "str" | "cm";

export type CodeToken = {
  text: string;
  className?: TokenClass;
};

export type CodeLine = CodeToken[];

export interface CodeSnippet {
  file: string;
  lines: CodeLine[];
}

export const snippets: CodeSnippet[] = [
  {
    file: "meta-capi.js",
    lines: [
      [
        { text: "async function ", className: "kw" },
        { text: "sendLeadEvent", className: "fn" },
        { text: "(data) {" },
      ],
      [
        { text: "  " },
        { text: "const", className: "kw" },
        { text: " payload = {" },
      ],
      [
        { text: "    event_name: " },
        { text: '"Lead"', className: "str" },
        { text: "," },
      ],
      [{ text: "    event_source_url: data.url," }],
      [{ text: "    user_data: hash(data.email)" }],
      [{ text: "  };" }],
      [
        { text: "  " },
        { text: "return", className: "kw" },
        { text: " fetch(CAPI_ENDPOINT, {" },
      ],
      [
        { text: "    method: " },
        { text: '"POST"', className: "str" },
        { text: "," },
      ],
      [{ text: "    body: JSON.stringify(payload)" }],
      [{ text: "  });" }],
      [{ text: "}" }],
      [{ text: "// fires on GHL webhook", className: "cm" }],
    ],
  },
  {
    file: "cadence/schema.sql",
    lines: [
      [
        { text: "create table", className: "kw" },
        { text: " time_entries (" },
      ],
      [
        { text: "  id uuid " },
        { text: "default", className: "kw" },
        { text: " gen_random_uuid()," },
      ],
      [
        { text: "  user_id uuid " },
        { text: "references", className: "kw" },
        { text: " users," },
      ],
      [
        { text: "  clock_in timestamptz " },
        { text: "not null", className: "kw" },
        { text: "," },
      ],
      [{ text: "  clock_out timestamptz," }],
      [
        {
          text: "  -- total_hours is generated, never insert it",
          className: "cm",
        },
      ],
      [
        { text: "  total_hours numeric " },
        { text: "generated always as", className: "kw" },
      ],
      [
        { text: "    (extract(epoch " },
        { text: "from", className: "kw" },
        { text: " clock_out - clock_in)/3600)" },
      ],
      [
        { text: "    " },
        { text: "stored", className: "kw" },
      ],
      [{ text: ");" }],
    ],
  },
  {
    file: "components/Hero.tsx",
    lines: [
      [
        { text: "export default function ", className: "kw" },
        { text: "Hero", className: "fn" },
        { text: "() {" },
      ],
      [
        { text: "  " },
        { text: "return", className: "kw" },
        { text: " (" },
      ],
      [
        { text: "    <" },
        { text: "section", className: "fn" },
        { text: " className=" },
        { text: '"h-screen"', className: "str" },
        { text: ">" },
      ],
      [
        { text: "      <" },
        { text: "h1", className: "fn" },
        { text: ">Book Your Free Evaluation</" },
        { text: "h1", className: "fn" },
        { text: ">" },
      ],
      [
        { text: "      <" },
        { text: "CTAButton", className: "fn" },
        { text: " onClick={bookNow} />" },
      ],
      [
        { text: "    </" },
        { text: "section", className: "fn" },
        { text: ">" },
      ],
      [{ text: "  );" }],
      [{ text: "}" }],
      [{ text: "// one CTA, on purpose", className: "cm" }],
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
