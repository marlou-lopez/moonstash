// import { useQuery } from 'react-query';

import {
  Container, Grid, Hidden, Paper, Box, Divider, Modal, Fade, useMediaQuery,
} from '@material-ui/core';
import {
  createStyles, makeStyles, Theme, useTheme,
} from '@material-ui/core/styles';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import TodoForm from './Form';
import TodoList from './List';
import Preview from './Preview';
import { TodoProvider, useTodo } from './Provider';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    minHeight: '720px',
    padding: '20px',
  },
  box: {
    padding: 20,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '500px',
    minHeight: '600px',
    margin: theme.spacing(0, 2),
  },
}));

const Todo:React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const { state, dispatch } = useTodo();
  const isMedScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleCloseModal = () => {
    dispatch({
      type: 'close',
    });
    dispatch({
      type: 'unselect',
    });
  };
  console.log('modal: ', isMedScreen && state.openModal);

  return (
    <>
      <h1>Test</h1>
      <Paper className={classes.container}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Box className={classes.box}>
              <TodoForm />
              <Divider className={classes.divider} />
              <TodoList />
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item md={6}>
              <Preview />
            </Grid>
          </Hidden>
          <Modal
            open={isMedScreen && state.openModal}
            onClose={handleCloseModal}
            className={classes.modal}
          >
            <Fade in={isMedScreen && state.openModal}>
              <Paper className={classes.paper}>
                <Preview />
              </Paper>
            </Fade>
          </Modal>
        </Grid>
      </Paper>
    </>
  );
};

export default Todo;
