# one-off: strip i18n to Spanish only
path = r"src\App.tsx"
with open(path, encoding="utf-8") as f:
    lines = f.readlines()

# Remove `type Language = ...` line (line 5, index 4)
out = lines[:4] + lines[5:]
text = "".join(out)

old_start = "const translations: Record<Language, Record<string, string>> = {\n  es: {"
new_start = "const STRINGS: Record<string, string> = {"
if old_start not in text:
    raise SystemExit("start pattern not found")
text = text.replace(old_start, new_start, 1)

marker = "  },\n  en: {"
idx = text.find(marker)
if idx == -1:
    raise SystemExit("en marker not found")
end = text.find("\n};\n\ninterface DrawerProps", idx)
if end == -1:
    raise SystemExit("end marker not found")
# idx starts at closing `  },` of ES block — drop it and everything through translations `};`
rest = text[end:]
# rest begins with `\n};\n\ninterface` — drop that `};` (duplicate close)
if not rest.startswith("\n};"):
    raise SystemExit("unexpected rest: " + repr(rest[:20]))
rest = rest[len("\n};") :]  # keep \n\ninterface...
text = text[:idx].rstrip() + "\n};\n\nfunction t(key: string): string {\n  return STRINGS[key] || key;\n}\n" + rest

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
print("done")
