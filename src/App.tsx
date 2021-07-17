import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  createTheme, Theme, createStyles, makeStyles, ThemeProvider,
} from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';

import Todo from './pages/Todo/Todo';
import About from './pages/About/About';
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const useStyles = makeStyles((theme: Theme) => createStyles({
  main: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
}));

const themeObject = {
  palette: {
    primary: {
      main: '#3E96C8',
      dark: '#2F7AA4',
    },
    secondary: {
      main: '#C8703E',
      dark: '#A4592F',
    },
    type: 'light',
  },
};

const useDarkMode = () => {
  const [theme, setTheme] = useState<any>(themeObject);

  const {
    palette: { type },
  } = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light',
      },
    };
    setTheme(updatedTheme);
  };
  return [theme, toggleDarkMode];
};

const App: React.FC = () => {
  const classes = useStyles();
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createTheme(theme);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={themeConfig}>
          <div className={classes.main}>
            <CssBaseline />
            <Navigation toggleDarkMode={toggleDarkMode} />
            <Container maxWidth="xl" className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path="/todo" component={Todo} />
                <Route exact path="/about" component={About} />
                <Route path="/">
                  <h1>Home</h1>
                </Route>
              </Switch>
            </Container>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
