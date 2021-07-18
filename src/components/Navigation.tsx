import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  Hidden,
} from '@material-ui/core';
import {
  createStyles, makeStyles, Theme, useTheme,
} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import InfoIcon from '@material-ui/icons/Info';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import clsx from 'clsx';

interface NavigationProps {
  toggleDarkMode: () => void;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    background: theme.palette.background.default,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

  },
  appBarOpen: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 16,
    [theme.breakpoints.up('sm')]: {
      marginRight: 20,
    },
  },
  menuButtonHidden: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaperOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));

const RouteMap = {
  Home: {
    title: 'Home',
    path: '/',
    icon: <HomeIcon color="primary" />,
  },
  Todo: {
    title: 'Todo',
    path: '/todo',
    icon: <ListAltIcon color="primary" />,
  },
  About: {
    title: 'About',
    path: '/about',
    icon: <InfoIcon color="primary" />,
  },
};

const Navigation: React.FC<NavigationProps> = ({ toggleDarkMode }) => {
  const classes = useStyles();
  const location = useLocation();
  const { palette: { type }, direction } = useTheme();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const drawerContent = (
    <>
      <div className={classes.toolbar}>
        <IconButton onClick={handleCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <Grid container justifyContent="center">
        <IconButton onClick={() => toggleDarkMode()}>
          {(type === 'dark') ? <NightsStayIcon /> : <WbSunnyIcon />}
        </IconButton>
      </Grid>
      <Divider />
      <List component="nav">
        {Object.values(RouteMap).map(({ title, path, icon }) => (
          <ListItem
            button
            component={RouterLink}
            to={path}
            key={title}
            selected={path === location.pathname}
            onClick={() => handleCloseDrawer()}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarOpen]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={handleOpenDrawer}
            className={clsx(classes.menuButton, {
              [classes.menuButtonHidden]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link underline="none" component={RouterLink} to={RouteMap.Home.path}>
            <Typography variant="h5" color="primary">
              Moonstash
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer
          variant="temporary"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          open={openDrawer}
          anchor={direction === 'rtl' ? 'right' : 'left'}
          className={clsx(classes.drawer)}
          classes={{
            paper: clsx(classes.drawer),
          }}
          onClose={handleCloseDrawer}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          open={openDrawer}
          className={clsx(classes.drawer, {
            [classes.drawerPaperClose]: !openDrawer,
            [classes.drawerPaperOpen]: openDrawer,
          })}
          classes={{
            paper: clsx(classes.drawer, {
              [classes.drawerPaperClose]: !openDrawer,
              [classes.drawerPaperOpen]: openDrawer,
            }),
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navigation;
