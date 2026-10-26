import Image from "next/image";
import { getPortrait } from "@/lib/assets";

/**
 * Hero portrait. Shows /public/images/bernard-portrait.jpg once that file
 * exists; until then, a deliberate placeholder with the same 4:5 frame.
 */
export function Portrait() {
  const src = getPortrait();

  return (
    <figure className="w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-panel">
        {src ? (
          <Image
            src={src}
            alt="Portrait of Bernard Abuto"
            fill
            preload
            sizes="(min-width: 64rem) 36vw, (min-width: 40rem) 50vw, 70vw"
            className="object-cover"
          />
        ) : (
          <div className="notebook-grid absolute inset-0" role="img" aria-label="Portrait to follow">
            {/* Registration marks frame the reserved area. */}
            <span aria-hidden="true" className="absolute left-4 top-4 size-4 border-l border-t border-fg/30" />
            <span aria-hidden="true" className="absolute right-4 top-4 size-4 border-r border-t border-fg/30" />
            <span aria-hidden="true" className="absolute bottom-4 left-4 size-4 border-b border-l border-fg/30" />
            <span aria-hidden="true" className="absolute bottom-4 right-4 size-4 border-b border-r border-fg/30" />
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center font-serif text-[7rem] leading-none text-fg/10 sm:text-[9rem]"
            >
              BA
            </span>
          </div>
        )}
      </div>
      <figcaption className="meta mt-3 flex justify-between gap-4 text-muted">
        <span>Bernard Abuto</span>
        <span>{src ? "Kenya" : "Portrait to follow"}</span>
      </figcaption>
    </figure>
  );
}
