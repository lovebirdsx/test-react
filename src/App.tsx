import React from 'react';
import { AppContext, defalutAppConfig, type SetConfig } from './app/context';
import { TestManager } from './components/TestManager'

function App() {
  const [appConfig, setAppConfig] = React.useState(defalutAppConfig);

  const handleSetConfig = React.useCallback<SetConfig>((key, value) => {
    setAppConfig((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  return (
    <AppContext.Provider value={{ config: appConfig, setConfig: handleSetConfig }}>
      <TestManager />
    </AppContext.Provider>
  )
}

export default App
