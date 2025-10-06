# 3D Assets Required

This directory needs the following files for the Lanyard component to work:

## Required Files

1. **card.glb** - 3D model of the ID card
2. **lanyard.png** - Texture image for the lanyard band

## Where to Get Them

### Option 1: Download from Reactbits
Visit the Reactbits repository and download the assets from:
`src/assets/lanyard/`

### Option 2: Create Your Own

#### For card.glb:
- Create or find a 3D model of an ID card
- Edit the texture using: https://modelviewer.dev/editor/
- Export as .glb format
- Place in this directory

#### For lanyard.png:
- Create a texture image (recommended: 512x512px or similar)
- This will be used as the repeating pattern on the lanyard band
- Common pattern: stripes or solid color
- Save as PNG format
- Place in this directory

## Important Notes

- Once you add these files, the dev server will automatically reload
- The ErrorBoundary will show a friendly message until the files are added
- The terminal side will still work even without the 3D assets
- Make sure the files are named exactly: `card.glb` and `lanyard.png`

## File Structure
```
src/assets/lanyard/
├── README.md       (this file)
├── card.glb        (ADD THIS - 3D model)
└── lanyard.png     (ADD THIS - texture)
```

