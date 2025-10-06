import Lanyard from './components/Lanyard';
import Terminal from './components/Terminal';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent p-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-terminal-text tracking-wider">
            Ch1mpleo
          </h1>
          <p className="text-sm md:text-base text-terminal-secondary">
            Do Huu Viet Anh - Software Engineer
          </p>
        </div>
      </header>

      {/* Main Content - 50/50 Split */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left Side - Lanyard */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-black relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <ErrorBoundary>
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </ErrorBoundary>
          </div>
        </div>

        {/* Right Side - Terminal */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full border-l-0 md:border-l border-terminal-text/20">
          <Terminal />
        </div>
      </div>
    </div>
  );
}

export default App;

