import React, { useState } from 'react';
import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';
import axiosInstance, { setMessageAlertFunction } from '../axios';
import MessageAlert from './views/assets/MessageAlert';

const App = () => {
  const content = useRoutes(routes);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showMessageAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  // Inject the showMessageAlert function into axiosInstance
  setMessageAlertFunction(showMessageAlert);

  const handleClose = () => {
    setAlert({ open: false, message: '', severity: 'success' });
  };
  return (
    <>
      <Provider store={Store}>
        <MessageAlert
          open={alert.open}
          severity={alert.severity}
          message={alert.message}
          onClose={handleClose}
        />
        <SettingsProvider>
          <MatxTheme>
            <AuthProvider>{content}</AuthProvider>
          </MatxTheme>
        </SettingsProvider>
      </Provider>
    </>
  );
};

export default App;
