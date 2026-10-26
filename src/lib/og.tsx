import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared typographic social card used by the homepage and project pages. */
export function renderOgCard({ eyebrow, title, statement, footer }: {
  eyebrow: string;
  title: string;
  statement: string;
  footer: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#111110",
          color: "#ECEBE6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 3,
            color: "#9D9B94",
            borderBottom: "1px solid #2C2B28",
            paddingBottom: 24,
          }}
        >
          <span style={{ color: "#8FB39B" }}>{eyebrow}</span>
          <span>KENYA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: title.length > 28 ? 68 : 108, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: title.length > 28 ? 30 : 38, lineHeight: 1.3, maxWidth: 1000, color: "#9D9B94" }}>{statement}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#9D9B94", letterSpacing: 1 }}>{footer}</div>
      </div>
    ),
    ogSize,
  );
}
