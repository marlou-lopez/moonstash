// import { useQuery } from 'react-query';

import { Container, Grid, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// const getTodos = async () => {
//   const response = await fetch('/todos');
//   const data = await response.json();
//   return data;
// };

const useStyles = makeStyles(() => createStyles({
  container: {
    minHeight: '720px',
    padding: '20px',
  },
}));

const Todo: React.FC = () => {
  const classes = useStyles();
  // const { data } = useQuery('todos', getTodos);
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
