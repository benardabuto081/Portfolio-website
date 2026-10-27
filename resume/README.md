# Resume

One source, two outputs. Edit **`resume.json`**; never edit the generated files.

| File | Purpose |
| --- | --- |
| `resume.json` | All resume content (single source of truth) |
| `resume.typ` | Typst layout for the PDF (single column, ATS-friendly) |
| `build.py` | Builds the PDF and DOCX and copies them to `public/resume/` |
| `fonts/` | Inter (SIL Open Font License), embedded in the PDF |

## Setup (once)

Ubuntu's system Python lacks `ensurepip`, so the virtualenv is bootstrapped with `get-pip.py`:

```bash
python3 -m venv --without-pip resume/.venv
curl -sSL https://bootstrap.pypa.io/get-pip.py | resume/.venv/bin/python
resume/.venv/bin/python -m pip install -r resume/requirements.txt
```

## Build

```bash
resume/.venv/bin/python resume/build.py            # PDF + DOCX -> public/resume/
resume/.venv/bin/python resume/build.py --preview  # also PNG previews in resume/out/
```

Check the preview stays on one page, then commit the updated files in `public/resume/`. If you change the month, update `resume.updated` in `src/content/site.ts`.
