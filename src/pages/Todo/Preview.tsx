import { Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTodo } from './Provider';

const useStyles = makeStyles((theme: Theme) => createStyles({
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    padding: theme.spacing(2.5),
  },
}));

const Preview: React.FC = () => {
  const classes = useStyles();
  const { state: { selectedTodo } } = useTodo();

  if (!selectedTodo) {
    return (
      <Grid className={clsx(classes.container, classes.empty)}>
        Sad no selected
      </Grid>
    );
  }

  return (
    <Container className={classes.container}>
      {selectedTodo.title}
    </Container>
  );
};

export default Preview;
