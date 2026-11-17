import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/content/site";

/**
 * The portrait is detected at build time: if the file is missing, the hero
 * shows a placeholder instead of a broken image.
 * Server-only: uses the filesystem.
 */
function publicFileExists(publicPath: string): boolean {
  return existsSync(join(process.cwd(), "public", publicPath));
}

export function getPortrait(): string | null {
  return publicFileExists(site.assets.portrait) ? site.assets.portrait : null;
}


/** Returns an award image only when its file exists in /public. */
export function getAwardImage(publicPath: string): string | null {
  return publicFileExists(publicPath) ? publicPath : null;
}
