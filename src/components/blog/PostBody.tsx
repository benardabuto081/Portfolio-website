import { Fragment, type ReactNode } from "react";
import type { BlogBlock } from "@/content/blog";

/** Renders `inline code` spans; everything else is plain text. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={index} className="rounded-sm bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-fg">
            {part.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function Block({ block }: { block: BlogBlock }): ReactNode {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "h2":
      return <h2 className="!mt-14 font-serif text-[1.875rem] leading-tight text-fg sm:text-[2.125rem]">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="border-l-2 border-accent py-1 pl-6 font-serif text-[1.625rem] leading-snug text-fg">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <pre className="overflow-x-auto border border-line bg-panel p-5 font-mono text-[0.875rem] leading-relaxed text-fg">
          <code>{block.code}</code>
        </pre>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={`space-y-3 pl-6 ${block.ordered ? "list-decimal" : "list-disc"} marker:text-accent`}>
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.9375rem]">
            <thead>
              <tr className="border-b border-fg">
                {block.head.map((cell, index) => (
                  <th key={index} scope="col" className="meta py-3 pr-6 font-normal text-muted">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-b border-line">
                  {row.map((cell, index) => (
                    <td key={index} className={`py-3 pr-6 ${index === 0 ? "text-fg" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function PostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="max-w-[68ch] space-y-6 text-[1.0625rem] leading-[1.75] text-fg/85">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
