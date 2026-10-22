import fitz
import re
import json

pdf_path = "/Users/benjamin/Desktop/claude/market-intel/2. Zebra Blinds-Updated 2025斑马帘样册(压缩)REV. 2025.12.12.pdf"
doc = fitz.open(pdf_path)

fabrics = []

for i in range(len(doc)):
    page = doc.load_page(i)
    text = page.get_text("text")
    lines = text.split('\n')
    
    for line in lines:
        line = line.strip()
        if "TRANSLUCENT" in line.upper() or "ROOM-DARKENING" in line.upper() or "BLACKOUT" in line.upper():
            # A lot of times it looks like "DL22032 - TRANSLUCENT"
            if len(line) > 5:
                fabrics.append({
                    "page": i + 1,
                    "name": line
                })

with open('pdf_fabrics.json', 'w') as f:
    json.dump(fabrics, f, indent=2)

print(f"Extracted {len(fabrics)} fabric references.")
