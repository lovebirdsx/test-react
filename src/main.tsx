import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import React from 'react';
import { AppContext, defalutAppConfig, type SetConfig } from './app/context.ts';

export const Index: React.FC = () => {
  const [appConfig, setAppConfig] = React.useState(defalutAppConfig);

  const handleSetConfig = React.useCallback<SetConfig>((key, value) => {
    setAppConfig((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  const AppElement = (
    <AppContext.Provider value={{ config: appConfig, setConfig: handleSetConfig }}>
      <App />
    </AppContext.Provider>
  );

  if (appConfig.useStrictMode) {
    return <StrictMode>{AppElement}</StrictMode>;
  }
  return AppElement;
}

createRoot(document.getElementById('root')!).render(<Index />);
