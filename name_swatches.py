import fitz
import json
import re

pdf_path = "/Users/benjamin/Desktop/claude/market-intel/2. Zebra Blinds-Updated 2025斑马帘样册(压缩)REV. 2025.12.12.pdf"
doc = fitz.open(pdf_path)

with open('pdf_fabrics.json', 'r') as f:
    pdf_fabrics = json.load(f)

with open('src/data/products.json', 'r') as f:
    products = json.load(f)

# Create a mapping of Page Number -> List of DS codes
page_codes = {}
for i in range(len(doc)):
    page_num = i + 1
    text = doc.load_page(i).get_text("text")
    # Extract words starting with DS-
    codes = re.findall(r'DS-[A-Z0-9\-]+', text)
    # Deduplicate while preserving order
    seen = set()
    deduped = []
    for code in codes:
        if code not in seen:
            seen.add(code)
            deduped.append(code)
    page_codes[page_num] = deduped

# Update products.json
for p in products:
    # Find which page this product was on
    fabric_map = next((f for f in pdf_fabrics if f['name'] == p['name']), None)
    if fabric_map:
        page = fabric_map['page']
        codes = page_codes.get(page, [])
        
        if p.get('fabricFamilies') and len(p['fabricFamilies']) > 0:
            colors = p['fabricFamilies'][0].get('colors', [])
            
            # Map the extracted codes to the existing colors
            for idx, color in enumerate(colors):
                if idx < len(codes):
                    color['name'] = codes[idx]
                    color['colorId'] = codes[idx].lower()

with open('src/data/products.json', 'w') as f:
    json.dump(products, f, indent=2)

print("Product swatches successfully renamed with exact DS codes!")
