# Portfolio Setup Instructions

## ✅ What's Been Completed

Your portfolio project has been fully set up with:

1. ✅ React + TypeScript + Vite project structure
2. ✅ TailwindCSS for styling
3. ✅ Three.js ecosystem (react-three-fiber, drei, rapier)
4. ✅ 3D Lanyard component with physics simulation
5. ✅ Terminal component with command parsing
6. ✅ 50/50 split layout with header
7. ✅ Responsive design
8. ✅ All TypeScript configurations
9. ✅ All linting errors resolved

## 🚀 Next Steps

### 1. Add Your 3D Assets (REQUIRED)

The project is currently using placeholder files. You need to add the actual assets:

**Location**: `src/assets/lanyard/`

**Required files**:
- `card.glb` - The 3D model of the card
- `lanyard.png` - The texture image for the lanyard band

**Where to get them**:
- Download from the original Reactbits repository
- Or create your own custom versions

**To edit the card texture**:
- Use this online GLB editor: https://modelviewer.dev/editor/
- Upload your card.glb file
- Customize the texture/materials
- Download the modified version

### 2. Customize Your Information

**File**: `src/components/Terminal.tsx`

Update the `getCommandOutput` function with your actual:
- Name and bio (currently using "Ch1mpleo - Do Huu Viet Anh")
- Work experience
- Projects
- Skills
- Education
- Contact information
- Certifications

Search for placeholder text like `[Your Degree]`, `[Current Company]`, etc. and replace with your actual information.

### 3. Start the Development Server

```bash
pnpm dev
```

The portfolio will be available at: `http://localhost:5173`

### 4. Test the Terminal Commands

Once running, try these commands in the terminal:
- `help` - See all available commands
- `about` - View your bio
- `projects` - See your projects
- `skills` - View your skills
- `experience` - See work history
- `contact` - Get contact info
- `sudo` - Easter egg 😉
- `clear` - Clear the terminal

### 5. Customize the Header

**File**: `src/App.tsx`

The header currently shows:
```
Ch1mpleo
Do Huu Viet Anh - Software Engineer
```

Update this to match your branding.

### 6. Adjust 3D Settings (Optional)

**File**: `src/components/Lanyard.tsx`

You can customize:
- `position={[0, 0, 20]}` - Camera distance
- `gravity={[0, -40, 0]}` - Gravity strength
- `fov={20}` - Field of view

### 7. Build for Production

When ready to deploy:

```bash
pnpm build
```

This creates optimized files in the `dist/` directory.

### 8. Preview Production Build

```bash
pnpm preview
```

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── assets/lanyard/       # 👈 ADD YOUR .glb AND .png FILES HERE
│   ├── components/
│   │   ├── Lanyard.tsx       # 3D lanyard component
│   │   └── Terminal.tsx      # Terminal interface (edit your info here)
│   ├── App.tsx               # Main layout (edit header here)
│   └── index.css             # Global styles
├── public/                   # Static assets
├── index.html
└── vite.config.ts
```

## 🎨 Color Customization

**File**: `tailwind.config.js`

Current terminal theme:
```javascript
terminal: {
  bg: '#0a0a0a',      // Background color
  text: '#00ff00',    // Main text (green)
  prompt: '#00ff00',  // Command prompt
  secondary: '#00cc00', // Secondary text
}
```

## 🐛 Troubleshooting

### Issue: 3D Model Not Loading
**Solution**: Make sure you've replaced the placeholder `card.glb` and `lanyard.png` files in `src/assets/lanyard/` with actual asset files.

### Issue: Terminal not responding
**Solution**: Click anywhere on the terminal area to focus the input field.

### Issue: TypeScript errors
**Solution**: All declarations are in `src/global.d.ts` and `src/vite-env.d.ts`. The project should work out of the box.

### Issue: Build errors
**Solution**: 
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📚 Documentation

- Three.js: https://threejs.org/docs/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- TailwindCSS: https://tailwindcss.com/docs
- Vite: https://vitejs.dev/guide/

## 🎉 You're All Set!

Your portfolio is ready to go. Just add your assets, update your information, and you're good to deploy!

**Questions?** Check the README.md for more details.

---

Built with ❤️ using React, TypeScript, Three.js, and TailwindCSS

