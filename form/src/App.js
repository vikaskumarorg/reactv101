import Form from './ControlledForm';
import './App.css';
import { ThemeProvider, useTheme } from './ThemeContaxt';
import ToggleTheme from './ToggleTheme.js';
import SelectField from './SelectField.js';

function AppContent() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#dfbdbd' : '#1a1a1a',
      color: theme === 'light' ? '#000000' : '#dfbdbd',
      minHeight: '100vh',
      padding: '20px',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      <h1>Controlled Form</h1>
      <ToggleTheme />
      <Form />
      <SelectField />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
