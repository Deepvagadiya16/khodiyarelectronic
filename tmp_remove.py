import re

with open(r'c:\Users\Deep\OneDrive\Desktop\Khodiyar\premium.js', 'r') as f:
    js = f.read()

# Remove Section 2 logic (except isTouchDevice)
# From `// --- 2. Advanced Custom Cursor ---` to `const isTouchDevice...`
js = re.sub(r'// --- 2\. Advanced Custom Cursor ---([\s\S]*?)const isTouchDevice', r'const isTouchDevice', js)
# From `if (!isTouchDevice && cursorDot && cursorRing) {` down to its closing brace
js = re.sub(r'if \(\!isTouchDevice && cursorDot && cursorRing\) \{[\s\S]*?\}\s*// --- 3\. Magnetic Hover Effect', r'// --- 3. Magnetic Hover Effect', js)
# Remove Section 3
js = re.sub(r'// --- 3\. Magnetic Hover Effect \(Buttons & Icons\) ---[\s\S]*?// --- 4\. Auto-Apply', r'// --- 4. Auto-Apply', js)

with open(r'c:\Users\Deep\OneDrive\Desktop\Khodiyar\premium.js', 'w') as f:
    f.write(js)

with open(r'c:\Users\Deep\OneDrive\Desktop\Khodiyar\styles.css', 'r') as f:
    css = f.read()

# Remove Custom Cursor and Magnetic Glow
css = re.sub(r'/\* Custom Cursor \*/[\s\S]*?/\* Reveal Extensions \*/', r'/* Reveal Extensions */', css)

with open(r'c:\Users\Deep\OneDrive\Desktop\Khodiyar\styles.css', 'w') as f:
    f.write(css)

print("Removed mouse effects")
