"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { contactTopics } from "@/content/contact";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 block w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[1.0625rem] text-fg placeholder:text-muted/60 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-400";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-red-300">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="border border-line bg-panel p-6 sm:p-8">
        <p className="meta text-accent">Message sent</p>
        <p className="mt-3 font-serif text-[1.75rem] leading-snug">{state.message}</p>
      </div>
    );
  }

  const errors = state.errors ?? {};
  const values = state.values ?? {};
  const describe = (field: keyof typeof errors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form action={formAction} noValidate className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="meta text-muted">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          defaultValue={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe("name")}
          className={inputClass}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className="meta text-muted">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          defaultValue={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describe("email")}
          className={inputClass}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="organisation" className="meta text-muted">
          Organisation <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          maxLength={120}
          defaultValue={values.organisation}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="topic" className="meta text-muted">
          Topic <span aria-hidden="true">*</span>
        </label>
        <select
          key={values.topic ?? "none"}
          id="topic"
          name="topic"
          required
          defaultValue={values.topic ?? ""}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={describe("topic")}
          className={`${inputClass} appearance-none invalid:text-muted bg-[length:12px] bg-[right_0.25rem_center] bg-no-repeat`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%239d9b94' stroke-width='1.5'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled className="bg-panel">
            Choose a topic
          </option>
          {contactTopics.map((topic) => (
            <option key={topic} value={topic} className="bg-panel text-fg">
              {topic}
            </option>
          ))}
        </select>
        <FieldError id="topic-error" message={errors.topic} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="meta text-muted">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe("message")}
          className={`${inputClass} resize-y`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot for bots; hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className="text-sm text-red-300">
          {state.status === "error" ? state.message : null}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-fg px-7 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
