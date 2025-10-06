# Ch1mpleo Portfolio

An interactive portfolio website featuring a 3D lanyard component and a terminal-style interface built with React, TypeScript, Three.js, and TailwindCSS.

## Features

- 🎮 **Interactive 3D Lanyard**: Drag and drop physics-based 3D card using Three.js and React Three Fiber
- 💻 **Terminal Interface**: Command-line style portfolio navigation
- ⚡ **Modern Stack**: Built with React 19, TypeScript, Vite, and TailwindCSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Custom Styling**: Terminal-themed UI with custom colors and animations

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei, React Three Rapier
- **Physics**: @react-three/rapier for realistic physics simulation
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v9 or higher)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd my-portfolio
```

2. Install dependencies
```bash
pnpm install
```

3. **Important**: Add your 3D assets
   - Download or create `card.glb` (3D model of the card)
   - Download or create `lanyard.png` (texture for the lanyard band)
   - Place both files in `src/assets/lanyard/`
   
   You can edit the card.glb texture using this online editor:
   - https://modelviewer.dev/editor/

4. Start the development server
```bash
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Terminal Commands

Once the portfolio is running, you can use the following commands in the terminal:

- `help` - Show available commands
- `about` - Learn more about me
- `projects` - View my projects
- `skills` - See my technical skills
- `experience` - View my work experience
- `education` - View my education
- `contact` - Get my contact information
- `certifications` - View my certifications
- `leadership` - View leadership experience
- `sudo` - Try it and see 😉
- `clear` - Clear terminal
- `welcome` - Show welcome message

## Customization

### Update Personal Information

Edit `src/components/Terminal.tsx` to update:
- Your name and title (in the `getCommandOutput` function)
- Projects, skills, experience, education, and contact information
- Add or remove commands as needed

### Customize 3D Lanyard

1. Replace `src/assets/lanyard/card.glb` with your custom 3D model
2. Replace `src/assets/lanyard/lanyard.png` with your custom texture
3. Adjust physics parameters in `src/components/Lanyard.tsx`:
   - `position`: Camera position
   - `gravity`: Gravity strength and direction
   - `fov`: Field of view

### Customize Styling

Edit `tailwind.config.js` to change:
- Terminal colors
- Background colors
- Custom theme values

Edit `src/index.css` for global styles and animations.

## Build for Production

```bash
pnpm build
```

The production-ready files will be in the `dist` directory.

## Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
my-portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── lanyard/
│   │       ├── card.glb          # 3D model (you need to add this)
│   │       └── lanyard.png       # Texture (you need to add this)
│   ├── components/
│   │   ├── Lanyard.tsx          # 3D lanyard component
│   │   └── Terminal.tsx         # Terminal interface component
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Global styles
│   ├── global.d.ts              # TypeScript declarations
│   └── vite-env.d.ts            # Vite environment types
├── index.html
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # TailwindCSS configuration
├── postcss.config.js            # PostCSS configuration
└── package.json
```

## Troubleshooting

### 3D Model Not Loading

The portfolio now includes an ErrorBoundary that will show a helpful message if the 3D assets are missing. 

**To fix:**
1. Add `card.glb` (3D model) to `src/assets/lanyard/`
2. Add `lanyard.png` (texture) to `src/assets/lanyard/`
3. See `src/assets/lanyard/README.md` for detailed instructions

**Important:** The terminal side will work perfectly even without the 3D assets! The left side will show a friendly error message with instructions until you add the files.

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `pnpm-lock.yaml`
2. Run `pnpm install` again
3. Clear Vite cache: `rm -rf node_modules/.vite`

### TypeScript Errors

Make sure all type declarations are properly set up in `src/global.d.ts` and `src/vite-env.d.ts`.

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

- Lanyard component inspired by [Reactbits](https://reactbits.dev/)
- Built with ❤️ by Ch1mpleo - Do Huu Viet Anh

## Contact

- Email: [your.email@example.com]
- LinkedIn: [your-linkedin]
- GitHub: [your-github]
- Twitter: @ch1mpleo
