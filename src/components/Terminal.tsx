import type React from "react"
import { useState, useRef, useEffect, type KeyboardEvent } from "react"

interface CommandOutput {
  command: string
  output: string
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<CommandOutput[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [commandCount, setCommandCount] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const hasShownWelcome = useRef(false)

  useEffect(() => {
    if (!hasShownWelcome.current) {
      hasShownWelcome.current = true
      handleCommand("welcome")
    }
    inputRef.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const getCommandOutput = (cmd: string): string => {
    const command = cmd.toLowerCase().trim()

    switch (command) {
      case "help":
        return `╭─────────────────────────────────────────────────────╮
│              AVAILABLE COMMANDS                     │
╰─────────────────────────────────────────────────────╯

  help          →  Show this help menu
  about         →  Learn about me
  projects      →  View my projects
  skills        →  Technical skills overview
  experience    →  Work experience
  contact       →  Get in touch
  education     →  Academic background
  certifications →  Certifications & achievements
  sudo          →  Try your luck 😏
  clear         →  Clear terminal

Type any command to get started!`

      case "welcome":
        return `╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     Welcome to Ch1mpleo's Interactive Terminal        ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

Hi, I'm Do Huu Viet Anh (Ch1mpleo)
Software Engineer | Full-Stack Developer

● Status: Available for opportunities
● Location: Vietnam
● Focus: Building scalable web applications

Type 'help' to explore available commands.`

      case "about":
        return `╭─────────────────────────────────────────────────────╮
│                    ABOUT ME                         │
╰─────────────────────────────────────────────────────╯

👋 Hello, I'm Ch1mpleo (Do Huu Viet Anh)!

I'm a Software Engineer with expertise in full-stack 
development, AI integration, and cloud infrastructure.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background:
  • Currently a Software Engineering Intern at FPT Software
  • Focus on building scalable web applications and data 
    visualization tools
  • Passionate about clean code and modern architecture

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When not coding:
  🎮 Playing games, especially peak games
  💡 Exploring new technologies
  🚀 Contributing to open source

Feel free to explore more using the 'projects', 'skills', 
or 'contact' commands!`

      case "projects":
        return `╭─────────────────────────────────────────────────────╮
│                FEATURED PROJECTS                    │
╰─────────────────────────────────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] Movie Theater Ticket Booking System
    ● Full-stack booking platform with AI integration
    ● Tech: ASP.NET Core, React, TypeScript, Docker
    ● Features: JWT Auth, MinIO, Resend, Stripe Payment
    ● Deployed: VPS + Vercel
    
    🔗 <LINK>https://github.com/orgs/MovieTheaterFAA/repositories|github.com/orgs/MovieTheaterFAA/repositories</LINK>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2] Arwoh: E-commerce Photography Marketplace
    ● Photography marketplace platform
    ● Tech: React, TypeScript, TailwindCSS
    ● Deployed: Vercel
    
    🔗 <LINK>https://github.com/ArWoh-WebApp/ArWoh.FE|github.com/ArWoh-WebApp/ArWoh.FE</LINK>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[3] VaccinaCare: Childhood Vaccination Management
    ● Healthcare management system
    ● Tech: React, TypeScript, TailwindCSS
    ● Deployed: Vercel
    
    🔗 <LINK>https://github.com/VaccinaCare/VaccinaCare.FE|github.com/VaccinaCare/VaccinaCare.FE</LINK>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type 'contact' to discuss projects or collaborations!`

      case "skills":
        return `╭─────────────────────────────────────────────────────╮
│                TECHNICAL SKILLS                     │
╰─────────────────────────────────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend Development
  ● React, TypeScript
  ● TailwindCSS, Three.js
  ● State Management (Redux Toolkit)
  ● UI/UX Design

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backend Development
  ● .NET ASP.NET Core
  ● Clean Architecture, SOLID Principles
  ● Domain-Driven Design (DDD) Patterns
  ● RESTful APIs
  ● Database: PostgreSQL, SQL Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cloud & DevOps
  ● VPS Hosting
  ● Docker, CI/CD
  ● Container Orchestration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AI & Machine Learning
  ● AI Integration
  ● ML Model Implementation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tools & Workflow
  ● Git, VS Code, Visual Studio
  ● Agile/Scrum Methodology`

      case "experience":
        return `╭─────────────────────────────────────────────────────╮
│                WORK EXPERIENCE                      │
╰─────────────────────────────────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Software Engineering Intern
FPT Software
January 2025 - May 2025

Responsibilities:
  • Working on a fullstack movie ticket booking system
  • Developing scalable applications
  • Implementing modern architecture patterns
  • Collaborating with cross-functional teams

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Key Achievements:
  ✓ Built production-ready features
  ✓ Improved application performance
  ✓ Contributed to system architecture`

      case "education":
        return `╭─────────────────────────────────────────────────────╮
│                   EDUCATION                         │
╰─────────────────────────────────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bachelor of Science in Software Engineering
FPT University
2022 - 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Relevant Coursework:
  • Data Structures & Algorithms
  • Software Engineering
  • Web Development
  • Database Management
  • Cloud Computing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Achievements:
  🏆 Top 2 of the RPG Game Project
     VNU University of Engineering and Technology`

      case "contact":
        return `╭─────────────────────────────────────────────────────╮
│                  GET IN TOUCH                       │
╰─────────────────────────────────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email
   <LINK>mailto:vietanh051203@gmail.com|vietanh051203@gmail.com</LINK>

🐙 GitHub
   <LINK>https://github.com/ch1mpleo|github.com/ch1mpleo</LINK>

🌐 Website
   <LINK>https://ch1mpleo.github.io/my-portfolio|ch1mpleo.github.io/my-portfolio</LINK>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I'm always open to:
  ✓ Collaboration opportunities
  ✓ Open source contributions
  ✓ Technical discussions
  ✓ Freelance projects

Feel free to reach out!`

      case "certifications":
        return `╭─────────────────────────────────────────────────────╮
│          CERTIFICATIONS & ACHIEVEMENTS              │
╰─────────────────────────────────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 Top 2 - RPG Game Project
   VNU University of Engineering and Technology

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

More certifications coming soon...`

      case "sudo":
        return `╭─────────────────────────────────────────────────────╮
│                  ACCESS DENIED                      │
╰─────────────────────────────────────────────────────╯

Nice try twin 🥀💔 ! But you'll need more than sudo 
to hack this terminal.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fun fact: 
This portfolio is built with React, TypeScript, and 
the lanyard on the left side is built with Three.js!

Tech Stack:
  • React + TypeScript
  • Three.js + React Three Fiber
  • TailwindCSS
  • Rapier Physics Engine`

      case "clear":
        return "__CLEAR__"

      case "":
        return ""

      default:
        return `Command not found: ${cmd}

Type 'help' to see available commands.`
    }
  }

  const handleCommand = (cmd: string) => {
    const output = getCommandOutput(cmd)

    if (output === "__CLEAR__") {
      setHistory([])
      setCommandCount(1)
      return
    }

    if (cmd.trim() !== "" || output !== "") {
      setHistory((prev) => [...prev, { command: cmd, output }])
      setCommandCount((prev) => prev + 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput)
      setCurrentInput("")
    }
  }

  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  // Function to render output with clickable links
  const renderOutput = (output: string) => {
    const linkRegex = /<LINK>(.*?)\|(.*?)<\/LINK>/g
    const parts: (string | React.ReactElement)[] = []
    let lastIndex = 0
    let match
    let keyCounter = 0

    while ((match = linkRegex.exec(output)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(output.substring(lastIndex, match.index))
      }

      // Add the clickable link
      const url = match[1]
      const displayText = match[2]
      parts.push(
        <a
          key={`link-${keyCounter++}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline cursor-pointer transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {displayText}
        </a>,
      )

      lastIndex = linkRegex.lastIndex
    }

    // Add remaining text after the last link
    if (lastIndex < output.length) {
      parts.push(output.substring(lastIndex))
    }

    return parts.length > 0 ? parts : output
  }

  return (
    <div
      className="w-full h-full bg-black text-terminal-text font-mono overflow-hidden flex flex-col relative"
      onClick={handleTerminalClick}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-400/[0.03] to-transparent bg-[length:100%_3px] animate-[scan_10s_linear_infinite] opacity-40" />

      <div className="w-full px-8 py-5 border-b border-terminal-text/20 bg-black/90 backdrop-blur-sm">
        <div className="text-terminal-text/60 text-xs tracking-[0.15em] overflow-x-auto whitespace-nowrap uppercase">
          help • about • projects • skills • experience • contact • education • certifications • sudo • clear
        </div>
      </div>

      <div ref={terminalRef} className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
        {history.map((entry, index) => (
          <div key={index} className="space-y-5">
            {entry.command && (
              <div className="flex items-center space-x-3">
                <span className="text-terminal-text/30 text-xs font-bold min-w-[2.5rem] select-none">
                  [{index + 1}]
                </span>
                <span className="text-green-400 font-semibold">ch1mpleo@portfolio</span>
                <span className="text-terminal-text/40">:</span>
                <span className="text-blue-400 font-semibold">~</span>
                <span className="text-terminal-text/40">$</span>
                <span className="text-terminal-text font-medium">{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <div className="whitespace-pre-wrap text-terminal-text/90 pl-0 font-mono text-sm leading-[1.8] ml-14 bg-terminal-text/[0.03] p-8 rounded-md border border-terminal-text/10 shadow-[0_0_15px_rgba(74,222,128,0.05)]">
                {renderOutput(entry.output)}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center space-x-3 mt-8 pt-4">
          <span className="text-terminal-text/30 text-xs font-bold min-w-[2.5rem] select-none">[{commandCount}]</span>
          <span className="text-green-400 font-semibold">ch1mpleo@portfolio</span>
          <span className="text-terminal-text/40">:</span>
          <span className="text-blue-400 font-semibold">~</span>
          <span className="text-terminal-text/40">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-text caret-green-400 font-medium placeholder:text-terminal-text/20"
            placeholder="Type a command..."
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}

export default Terminal
