import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { GithubLogo } from 'phosphor-react';

import { startService } from './bundler';
import { store } from './state';
import CellList from './components/cell-list';

const App: React.FC = () => {
  useEffect(() => {
    startService().catch(console.log);
  }, []);

  return (
    <Provider store={store}>
      <header className="w-full bg-gray-900 flex justify-between align-center px-6 py-6">
        <div className="flex align-center">
          <img src="https://i.imgur.com/P0d0nxw.png" alt="Javascript Logo" className="h-8 w-8" />
          <h1 className="text-3xl font-bold ml-4 text-gray-100">Book</h1>
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/siddharthborderwala/jsbook"
          className="text-white"
        >
          <GithubLogo size={24} weight="fill" />
        </a>
      </header>
      <div className="bg-gray-800 min-h-screen">
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
