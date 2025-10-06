import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface CommandOutput {
  command: string;
  output: string;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hasShownWelcome = useRef(false);

  useEffect(() => {
    if (!hasShownWelcome.current) {
      hasShownWelcome.current = true;
      handleCommand('welcome');
    }
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getCommandOutput = (cmd: string): string => {
    const command = cmd.toLowerCase().trim();

    switch (command) {
      case 'help':
        return `help | about | projects | skills | experience | contact | education | certifications | sudo | clear`;

      case 'welcome':
        return `Hi, I'm Ch1mpleo - Do Huu Viet Anh, a Software Engineer.

Welcome to my Interactive portfolio terminal!
Type 'help' to see available commands.`;

      case 'about':
        return `😭 Hello, I'm Ch1mpleo (Do Huu Viet Anh)!

I'm a Software Engineer with expertise in full-stack development, AI integration, and cloud infrastructure.

Background:
- Currently a Software Engineering Intern at FPT Software
- Focus on building scalable web applications and data visualization tools

When not coding, I enjoy playing games, espcially peak games.

Feel free to explore more using the 'projects', 'skills', or 'contact' commands!`;

      case 'projects':
        return `🚀 Featured Projects:

1. Movie Theater Ticket Booking System
   - Github: <LINK>mailto:https://github.com/orgs/MovieTheaterFAA/repositories|https://github.com/orgs/MovieTheaterFAA/repositories</LINK>
   -  Tech stack: ASP.NET Core, React, TypeScript, Docker, JWT, MinIO, Resend, Stripe payment, AI Integration, deployed via VPS and Vercel
  
2. Arwoh: E-commerce Photography Marketplace
   - Github: <LINK>mailto:https://github.com/ArWoh-WebApp/ArWoh.FE|https://github.com/ArWoh-WebApp/ArWoh.FE</LINK>.
   - Tech stack: React, TypeScript, TailwindCSS, deployed via Vercel

3. VaccinaCare: Childhood Vaccination Management System
   - Github: <LINK>mailto:https://github.com/VaccinaCare/VaccinaCare.FE|https://github.com/VaccinaCare/VaccinaCare.FE</LINK>
   - Tech stack: React, TypeScript, TailwindCSS, deployed via Vercel

Type 'contact' to discuss projects or collaborations!`;

      case 'skills':
        return `💻 Technical Skills:

Frontend:
  - React, TypeScript
  - TailwindCSS, Three.js
  - State Management (Redux Toolkit)
  - UI/UX Design

Backend:
  - .NET ASP.NET Core
  - Clean Architecture, SOLID Principles, DDD Patterns
  - RESTful APIs
  - Database: PostgreSQL, SQL Server

Cloud & DevOps:
  - VPS Hosting
  - Docker, CI/CD

AI & ML:
  - AI Integration

Tools:
  - Git, VS Code, Visual Studio, 
  - Agile/Scrum`;

      case 'experience':
        return `💼 Work Experience:

Software Engineering Intern
Company: FPT Software
Duration: 1/2025 - 5/2025
- Working on a fullstack project of Movie ticket booking system
- Developing scalable applications`;

      case 'education':
        return `🎓 Education:

Bachelor of Science in Software Engineering
FPT University
2022 - 2026

Relevant Coursework:
- Data Structures & Algorithms
- Software Engineering
- Web Development

Achievements:
- Top 2 of the RPG Game Project (VNU University of Engineering and Technology)`;

      case 'contact':
        return `📬 Get in Touch:

Email: <LINK>mailto:vietanh051203@gmail.com|vietanh051203@gmail.com</LINK>
LinkedIn: <LINK>https://www.linkedin.com/in/vietanhdo/|linkedin.com/in/vietanhdo</LINK>
GitHub: <LINK>https://github.com/ch1mpleo|github.com/ch1mpleo</LINK>
Website: <LINK>https://ch1mpleo.github.io/|ch1mpleo.github.io</LINK>

I'm always open to:
- Collaboration opportunities
- Open source contributions
- Technical discussions

Feel free to reach out!`;

      case 'sudo':
        return `
                Nice try twin 🥀💔 ! But you'll need more than sudo to hack this terminal.
                Fun fact: This portfolio is built with React, TypeScript, and Three.js!`;

      case 'clear':
        return '__CLEAR__';

      case '':
        return '';

      default:
        return `Command not found: ${cmd}
Type 'help' to see available commands.`;
    }
  };

  const handleCommand = (cmd: string) => {
    const output = getCommandOutput(cmd);

    if (output === '__CLEAR__') {
      setHistory([]);
      return;
    }

    if (cmd.trim() !== '' || output !== '') {
      setHistory(prev => [...prev, { command: cmd, output }]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Function to render output with clickable links
  const renderOutput = (output: string) => {
    const linkRegex = /<LINK>(.*?)\|(.*?)<\/LINK>/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    while ((match = linkRegex.exec(output)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(output.substring(lastIndex, match.index));
      }

      // Add the clickable link
      const url = match[1];
      const displayText = match[2];
      parts.push(
        <a
          key={`link-${keyCounter++}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {displayText}
        </a>
      );

      lastIndex = linkRegex.lastIndex;
    }

    // Add remaining text after the last link
    if (lastIndex < output.length) {
      parts.push(output.substring(lastIndex));
    }

    return parts.length > 0 ? parts : output;
  };

  return (
    <div
      className="w-full h-full bg-black text-terminal-text font-mono overflow-hidden flex flex-col"
      onClick={handleTerminalClick}
    >
      {/* Command Menu Bar */}
      <div className="w-full px-8 py-3 border-b border-terminal-text/20 bg-black">
        <div className="text-terminal-text text-sm tracking-wider overflow-x-auto whitespace-nowrap">
          help  |  about  |  projects  |  skills  |  experience  |  contact  |  education  |  sudo  |  clear
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto px-8 py-4 space-y-4"
      >
        {history.map((entry, index) => (
          <div key={index} className="space-y-3">
            {entry.command && (
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">ch1mpleo@portfolio:~$ </span>
                <span className="text-terminal-text"> {entry.command}</span>
              </div>
            )}
            {entry.output && (
              <div className="whitespace-pre-wrap text-white pl-0 font-mono leading-loose mb-4">
                {renderOutput(entry.output)}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center space-x-2 mt-4">
          <span className="text-blue-400">ch1mpleo@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-text caret-terminal-text"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;

