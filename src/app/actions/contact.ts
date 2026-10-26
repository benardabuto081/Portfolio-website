"use server";

import { contactTopics } from "@/content/contact";
import { site } from "@/content/site";

type Field = "name" | "email" | "organisation" | "topic" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function read(formData: FormData, key: string, max: number): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Sends a contact message by email through Resend's HTTP API.
 * Requires RESEND_API_KEY; see README → "Contact form".
 */
export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: read(formData, "name", 100),
    email: read(formData, "email", 200),
    organisation: read(formData, "organisation", 120),
    topic: read(formData, "topic", 60),
    message: read(formData, "message", 5000),
  };

  // Honeypot: real visitors never see or fill this field.
  if (read(formData, "website", 200)) {
    return { status: "success", message: "Thank you — your message has been sent." };
  }

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Please tell me your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!contactTopics.includes(values.topic as (typeof contactTopics)[number])) errors.topic = "Please choose a topic.";
  if (values.message.length < 10) errors.message = "Please write a little more about what you have in mind.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set; message was not sent.");
    return {
      status: "error",
      message: "Sorry — the message couldn’t be sent right now. Please try again later, or reach me on LinkedIn.",
      values,
    };
  }

  const singleLine = (text: string) => text.replace(/[\r\n]+/g, " ");
  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Organisation: ${values.organisation || "—"}`,
    `Topic: ${values.topic}`,
    "",
    values.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio contact form <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL || site.email],
        reply_to: values.email,
        subject: singleLine(`Portfolio: ${values.topic} — ${values.name}`),
        text,
      }),
    });
    if (!response.ok) {
      console.error("Contact form: Resend responded with", response.status, await response.text());
      throw new Error("Send failed");
    }
  } catch {
    return {
      status: "error",
      message: "Sorry — the message couldn’t be sent right now. Please try again later, or reach me on LinkedIn.",
      values,
    };
  }

  return { status: "success", message: "Thank you — your message has been sent. I’ll get back to you soon." };
}
