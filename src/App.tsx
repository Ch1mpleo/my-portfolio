import React from 'react';
import Lanyard from './components/Lanyard';
import Terminal from './components/Terminal';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col">
      {/* Header */}
      <header className="w-full bg-black border-b-2 border-terminal-text/30 px-6 py-5 flex-shrink-0">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-terminal-text tracking-wider mb-1">
            Ch1mpleo
          </h1>
          <p className="text-base md:text-lg text-gray-400 tracking-wide">
            Do Huu Viet Anh - Software Engineer
          </p>
        </div>
      </header>

      {/* Main Content - 40/60 Split */}
      <div className="flex flex-col md:flex-row w-full flex-1 overflow-hidden">
        {/* Left Side - Lanyard (40%) */}
        <div className="w-full md:w-[40%] h-1/2 md:h-full bg-gradient-to-br from-gray-700 via-gray-900 to-black relative overflow-hidden border-r-0 md:border-r border-terminal-text/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <ErrorBoundary>
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </ErrorBoundary>
          </div>
          {/* Footer for left side */}
          <div className="absolute bottom-0 left-0 right-0 text-center p-2 bg-black/50">
            <p className="text-xs text-terminal-text">[Interactive 3D Card]</p>
          </div>
        </div>

        {/* Right Side - Terminal (60%) */}
        <div className="w-full md:w-[60%] h-1/2 md:h-full">
          <Terminal />
        </div>
      </div>

      {/* Footer with real-time clock */}
      <footer className="w-full bg-black border-t-2 border-terminal-text/30 px-6 py-4 flex-shrink-0">
        <div className="text-terminal-text text-sm md:text-base text-right font-medium tracking-wider">
          <Clock />
        </div>
      </footer>
    </div>
  );
}

// Real-time clock component
function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  return <span>{formatDate(time)}</span>;
}

export default App;

