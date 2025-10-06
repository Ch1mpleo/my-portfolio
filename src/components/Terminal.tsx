import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface CommandOutput {
  command: string;
  output: string;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleCommand('welcome');
    inputRef.current?.focus();
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
        return `help | about | projects | skills | experience | contact | education | certifications | leadership | sudo | clear`;

      case 'welcome':
        return `Hi, I'm Ch1mpleo - Do Huu Viet Anh, a Software Engineer.

Welcome to my Interactive 'AI powered' portfolio terminal!
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

1. Payment Portal Dashboard
   - Full-stack payment processing system
   - Technologies: React, Node.js, AWS
   - Role: Lead Developer

2. Data Visualization Tools
   - Interactive data dashboards
   - Technologies: React, D3.js, TypeScript
   - Focus: Real-time data visualization

3. AI Integration Platform
   - AI-powered application features
   - Technologies: Python, TensorFlow, React
   - Focus: Machine learning integration

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
  - Git, VS Code
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
- Winner of the Ayute Africa Challenge with the Afyamavuno (Agrika) project
- Active in tech communities (GDG, Microsoft Dev Community Africa)`;

      case 'certifications':
        return `📜 Certifications & Achievements:

🏆 Ayute Africa Challenge Winner
   Project: Afyamavuno (Agrika)
   
📜 Professional Certifications:
- [Add your certifications here]
- Cloud certifications
- Development certifications

🎤 Speaking Engagements:
- Tech conferences
- Developer community events
- GDG sessions
- Microsoft Dev Community Africa`;

      case 'contact':
        return `📬 Get in Touch:

Email: vietanh051203@gmail.com
GitHub: https://github.com/ch1mpleo
Website: https://ch1mpleo.github.io/

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

  return (
    <div
      className="w-full h-full bg-black text-terminal-text font-mono overflow-hidden flex flex-col"
      onClick={handleTerminalClick}
    >
      {/* Command Menu Bar */}
      <div className="w-full px-4 py-3 border-b border-terminal-text/20 bg-black">
        <div className="text-terminal-text text-sm overflow-x-auto whitespace-nowrap">
          help | about | projects | skills | experience | contact | education | certifications | leadership | sudo | clear
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {history.map((entry, index) => (
          <div key={index} className="space-y-3">
            {entry.command && (
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">ch1mpleo@portfolio:~$</span>
                <span className="text-terminal-text">{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <pre className="whitespace-pre-wrap text-white pl-0 font-mono leading-loose mb-4">
                {entry.output}
              </pre>
            )}
          </div>
        ))}

        <div className="flex items-center space-x-2 mt-4">
          <span className="text-blue-400">ch1mpleo@portfolio:~$</span>
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

