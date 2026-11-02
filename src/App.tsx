import React from 'react';
import { useCraft } from './context/CraftContext';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { MakeScreen } from './components/Home/MakeScreen';
import { ProjectScreen } from './components/Project/ProjectScreen';
import { WorkbenchScreen } from './components/Workbench/WorkbenchScreen';
import { TargetTriageScreen } from './components/Ask/TargetTriageScreen';
import { GameFilesScreen } from './components/GameFiles/GameFilesScreen';
import { CommandPalette } from './components/CommandPalette';
import { SettingsModal } from './components/Modals/SettingsModal';
import { AboutModal } from './components/Modals/AboutModal';
import { DeepModeModal } from './components/Modals/DeepModeModal';
import { Toasts } from './components/Toasts';

export const App: React.FC = () => {
  const { screen, theme } = useCraft();
  const isLight = theme === 'StudioLight';

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden font-sans ${
        isLight ? 'bg-[#f8f8f7] text-[#16171a]' : 'bg-[#121316] text-[#f2f1ee]'
      }`}
    >
      {/* Top Application TitleBar */}
      <TitleBar />

      {/* Main Content: Sidebar + Screen */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden min-w-0 relative">
          {screen === 'Home' && <MakeScreen />}
          {screen === 'Project' && <ProjectScreen />}
          {screen === 'Workbench' && <WorkbenchScreen />}
          {screen === 'Ask' && <TargetTriageScreen />}
          {screen === 'GameFiles' && <GameFilesScreen />}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <CommandPalette />
      <SettingsModal />
      <AboutModal />
      <DeepModeModal />
      <Toasts />
    </div>
  );
};

export default App;
