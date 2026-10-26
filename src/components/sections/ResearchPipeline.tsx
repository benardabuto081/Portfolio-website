"use client";

import { Fragment, useRef, useState, type KeyboardEvent } from "react";
import type { PipelineStage } from "@/content/research";

/**
 * Tabbed pipeline. Every panel is rendered into the HTML (inactive ones use
 * the `hidden` attribute), so all text is available to crawlers and, via the
 * <noscript> rule, to visitors without JavaScript.
 */
export function ResearchPipeline({ stages }: { stages: PipelineStage[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + stages.length) % stages.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowDown: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      ArrowUp: () => select(active - 1),
      Home: () => select(0),
      End: () => select(stages.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="mt-14 lg:mt-20">
      <noscript>
        <style>{`.pipeline-panel[hidden]{display:block}`}</style>
      </noscript>

      <div
        role="tablist"
        aria-label="Research pipeline stages"
        aria-orientation="horizontal"
        className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:flex lg:gap-0 lg:border-0 lg:bg-transparent"
      >
        {stages.map((stage, index) => {
          const selected = index === active;
          return (
            <Fragment key={stage.id}>
              <button
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`stage-tab-${stage.id}`}
                aria-selected={selected}
                aria-controls={`stage-panel-${stage.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
                className={`group relative flex min-h-16 flex-col items-start justify-center gap-1 px-4 py-3 text-left transition-colors duration-200 lg:flex-1 lg:border-y lg:border-line lg:px-3 ${
                  selected ? "bg-surface" : "bg-canvas hover:bg-panel"
                }`}
              >
                <span className={`meta ${selected ? "text-accent" : "text-muted"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`meta text-[0.75rem] ${selected ? "font-medium text-fg" : "text-muted group-hover:text-fg"}`}
                >
                  {stage.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-fg transition-transform duration-300 lg:-bottom-px ${
                    selected ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
              {index < stages.length - 1 ? (
                <span aria-hidden="true" className="hidden items-center px-2 font-mono text-sm text-muted lg:flex">
                  →
                </span>
              ) : null}
            </Fragment>
          );
        })}
      </div>

      <div className="border-x border-b border-line bg-surface lg:border-t-0">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            role="tabpanel"
            id={`stage-panel-${stage.id}`}
            aria-labelledby={`stage-tab-${stage.id}`}
            hidden={index !== active}
            className="pipeline-panel animate-fade px-5 py-8 sm:px-8 sm:py-10 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-14"
          >
            <p className="meta text-muted lg:col-span-3">
              Stage {String(index + 1).padStart(2, "0")} of {String(stages.length).padStart(2, "0")} — {stage.label}
            </p>
            <p className="mt-4 max-w-[40ch] font-serif text-[1.625rem] leading-[1.22] sm:text-[2rem] lg:col-span-9 lg:mt-0">
              {stage.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
