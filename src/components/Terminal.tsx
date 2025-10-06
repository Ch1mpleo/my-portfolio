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
    // Show welcome message on mount
    handleCommand('welcome');
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when history updates
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getCommandOutput = (cmd: string): string => {
    const command = cmd.toLowerCase().trim();

    switch (command) {
      case 'help':
        return `Available commands:
  help       - Show available commands
  about      - Learn more about me
  projects   - View my projects
  skills     - See my technical skills
  experience - View my work experience
  education  - View my education
  contact    - Get my contact information
  certifications - View my certifications
  leadership - View leadership experience
  sudo       - Try it and see 😉
  clear      - Clear terminal
  welcome    - Show welcome message`;

      case 'welcome':
        return `Hi, I'm Ch1mpleo - Do Huu Viet Anh, a Software Engineer.

Welcome to my Interactive 'AI powered' portfolio terminal!
Type 'help' to see available commands.`;

      case 'about':
        return `👋 Hello, I'm Ch1mpleo - Do Huu Viet Anh!

I'm a Software Engineer with expertise in full-stack development, AI integration, and cloud infrastructure.

Background:
- Currently working as a Software Engineering Intern
- Previously led development of payment portals and dashboards
- Previously worked at various tech companies
- Focus on building scalable web applications and data visualization tools
- Skilled in modern web technologies and AI integration

When not coding, I enjoy speaking at tech conferences and contributing to developer communities.

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
  - React, TypeScript, Next.js
  - TailwindCSS, Three.js
  - State Management (Redux Toolkit)

Backend:
  - Node.js, Python
  - RESTful APIs, GraphQL
  - Database: PostgreSQL, MongoDB

Cloud & DevOps:
  - AWS, Azure
  - Docker, CI/CD
  - Cloud Infrastructure

AI & ML:
  - TensorFlow, PyTorch
  - Natural Language Processing
  - AI Integration

Tools:
  - Git, VS Code
  - Agile/Scrum
  - Testing frameworks`;

      case 'experience':
        return `💼 Work Experience:

Software Engineering Intern
Company: [Current Company]
Duration: [Start Date] - Present
- Working with Windows Team
- Developing scalable applications
- Focus on full-stack development

Lead Developer
Company: FarCas Consult (FCL)
Duration: [Date Range]
- Led development of payment portals and dashboards
- Implemented secure payment processing
- Managed development team

Software Engineer
Company: [Previous Companies]
- Microsoft Garage
- DigitalFarmer
- QuizardHQ
- Built web applications and data visualization tools`;

      case 'education':
        return `🎓 Education:

[Your Degree]
[Your University]
[Year Range]

Relevant Coursework:
- Data Structures & Algorithms
- Software Engineering
- Web Development
- Machine Learning
- Cloud Computing

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

      case 'leadership':
        return `👨‍💼 Leadership & Community:

Community Involvement:
- Active member of GDG (Google Developer Groups)
- Contributor to Microsoft Dev Community Africa
- Tech conference speaker
- Mentor to junior developers

Leadership Experience:
- Led development teams
- Project management
- Technical architecture decisions
- Code review and mentorship

Public Speaking:
- Tech conferences
- Developer meetups
- Technical workshops`;

      case 'contact':
        return `📬 Get in Touch:

Email: [your.email@example.com]
LinkedIn: [your-linkedin-profile]
GitHub: [your-github-username]
Twitter: @ch1mpleo
Website: [your-website.com]

I'm always open to:
- Collaboration opportunities
- Open source contributions
- Technical discussions
- Speaking engagements

Feel free to reach out!`;

      case 'sudo':
        return `[sudo] password for gatere@portfolio:
Nice try! 😄 But you'll need more than sudo to hack this terminal.

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
      className="w-full h-screen bg-terminal-bg text-terminal-text font-mono overflow-hidden flex flex-col"
      onClick={handleTerminalClick}
    >
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            {entry.command && (
              <div className="flex items-center space-x-2">
                <span className="text-terminal-prompt">gatere@portfolio:~$</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <pre className="whitespace-pre-wrap text-terminal-secondary pl-0 font-mono">
                {entry.output}
              </pre>
            )}
          </div>
        ))}
        
        <div className="flex items-center space-x-2">
          <span className="text-terminal-prompt">gatere@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white caret-terminal-text"
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

