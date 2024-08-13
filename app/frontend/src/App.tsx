import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import './App.css';
/* Material UI imports */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UvDashboard } from './components/UvDashboard';
import { Toolbar, Typography } from '@mui/material';
import { MongoDbButton } from './components/MongoDbButton';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Toolbar variant="dense">
          <SatelliteAltIcon />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              margin: '10px',
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UV Dashboard
          </Typography>
          <MongoDbButton />
        </Toolbar>
        <UvDashboard />
      </ThemeProvider>
    </>
  );
}

export default App;

// { <div>
//   <a href="https://vitejs.dev" target="_blank">
//     <img src={viteLogo} className="logo" alt="Vite logo" />
//   </a>
//   <a href="https://react.dev" target="_blank">
//     <img src={reactLogo} className="logo react" alt="React logo" />
//   </a>
// </div>
// <h1>Vite + React</h1>
// <div className="card">
//   <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
//   <p>
//     Edit <code>src/App.tsx</code> and save to test HMR
//   </p>
// </div>
// <p className="read-the-docs">Click on the Vite and React logos to learn more</p> }
