import {
  Container, createStyles, Grid, makeStyles, Paper, Theme,
} from '@material-ui/core';
import { useQuery } from 'react-query';

const getTodos = async () => {
  const response = await fetch('/todos');
  const data = await response.json();
  return data;
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    minHeight: '720px',
    padding: '20px',
  },
}));

const Todo: React.FC = () => {
  const classes = useStyles();
  const { data } = useQuery('todos', getTodos);

  return (
    <Container>
      <h1>Test</h1>
      <Paper>
        <Grid className={classes.container}>
          test
        </Grid>
      </Paper>
    </Container>
  );
};

export default Todo;
