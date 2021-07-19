// import { useQuery } from 'react-query';

import {
  Container, Grid, Hidden, Paper, Box, Divider,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TodoForm from './Form';
import TodoList from './List';

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
}));

const Todo: React.FC = () => {
  const classes = useStyles();
  console.log('ssss');
  return (
    <>
      <h1>Test</h1>
      <Paper>
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
              y
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </>
  );
};

export default Todo;
