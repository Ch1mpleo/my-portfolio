# 🔗 Clickable Links in Terminal

## ✅ Feature Implemented

I've added clickable hyperlink support to your terminal! Now URLs and email addresses in the contact section are clickable.

## 🎯 What Changed

### 1. **Contact Section Updated**
Links are now formatted with a special `<LINK>` tag format:
```
<LINK>actual_url|display_text</LINK>
```

Example:
```typescript
Email: <LINK>mailto:vietanh051203@gmail.com|vietanh051203@gmail.com</LINK>
GitHub: <LINK>https://github.com/ch1mpleo|github.com/ch1mpleo</LINK>
```

### 2. **Link Parser Function**
Added `renderOutput()` function that:
- Detects `<LINK>` tags in output text
- Converts them to clickable `<a>` elements
- Preserves plain text around links
- Opens links in new tabs

### 3. **Link Styling**
Clickable links have:
- 🔵 Blue color (`text-blue-400`)
- Lighter blue on hover (`hover:text-blue-300`)
- Underline decoration
- Cursor pointer
- Opens in new tab (`target="_blank"`)
- Security: `rel="noopener noreferrer"`

## 🎨 Visual Example

**What you'll see in the terminal:**

```
📬 Get in Touch:

Email: vietanh051203@gmail.com          ← Clickable (blue, underlined)
LinkedIn: linkedin.com/in/vietanhdo     ← Clickable (blue, underlined)
GitHub: github.com/ch1mpleo             ← Clickable (blue, underlined)
Website: ch1mpleo.github.io             ← Clickable (blue, underlined)
```

## 📝 How to Add More Links

To add clickable links to any command output, use this format:

```typescript
case 'your-command':
  return `Your text here

  Link: <LINK>https://example.com|example.com</LINK>

  More text here`;
```

### Format Breakdown:
- `<LINK>` - Opening tag
- `https://example.com` - Actual URL (where it goes)
- `|` - Separator
- `example.com` - Display text (what user sees)
- `</LINK>` - Closing tag

### Examples:

**Email Link:**
```typescript
<LINK>mailto:your@email.com|your@email.com</LINK>
```

**Website Link:**
```typescript
<LINK>https://yourwebsite.com|yourwebsite.com</LINK>
```

**LinkedIn Link:**
```typescript
<LINK>https://linkedin.com/in/yourprofile|LinkedIn Profile</LINK>
```

**GitHub Link:**
```typescript
<LINK>https://github.com/yourusername|GitHub</LINK>
```

## 🎯 Current Links in Contact Section

| Service | URL | Display Text |
|---------|-----|--------------|
| Email | `mailto:vietanh051203@gmail.com` | vietanh051203@gmail.com |
| LinkedIn | `https://www.linkedin.com/in/vietanhdo/` | linkedin.com/in/vietanhdo |
| GitHub | `https://github.com/ch1mpleo` | github.com/ch1mpleo |
| Website | `https://ch1mpleo.github.io/` | ch1mpleo.github.io |

## 🔧 Technical Details

### Files Modified:
1. **src/components/Terminal.tsx**
   - Added `renderOutput()` function
   - Updated output rendering from `<pre>` to `<div>`
   - Added React import for JSX elements
   - Changed `{entry.output}` to `{renderOutput(entry.output)}`

### How It Works:
1. User types `contact` command
2. Command returns string with `<LINK>` tags
3. `renderOutput()` function parses the string
4. Regex finds all `<LINK>` tags
5. Converts each to clickable `<a>` element
6. Returns array of text and link elements
7. React renders the mixed content

### Security:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Prevents security vulnerabilities
- `onClick={(e) => e.stopPropagation()}` - Prevents terminal click handler from firing

## 🚀 Testing

1. **Refresh your browser**
2. **Type command:** `contact`
3. **Look for links** - They should be blue and underlined
4. **Hover over links** - Color changes to lighter blue
5. **Click a link** - Opens in new tab
6. **Test email** - Should open your email client

## 💡 Tips

### To Update Your Links:
1. Open `src/components/Terminal.tsx`
2. Find the `contact` case
3. Update URLs in the `<LINK>` tags
4. Format: `<LINK>url|display_text</LINK>`

### To Add Links to Other Commands:
Use the same `<LINK>` format in any command output!

Example for projects:
```typescript
case 'projects':
  return `🚀 Featured Projects:

  1. Payment Portal
     <LINK>https://github.com/yourrepo|View on GitHub</LINK>

  2. AI Platform
     <LINK>https://demo.example.com|Live Demo</LINK>`;
```

## 🎉 Result

Your terminal now has professional, clickable links that:
- ✅ Stand out visually (blue, underlined)
- ✅ Open in new tabs
- ✅ Are secure
- ✅ Provide great UX
- ✅ Look professional
- ✅ Work on all devices

Your portfolio is now even more interactive! 🚀

