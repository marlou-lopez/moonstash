import { Paper, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTodo } from './Provider';
import { ITodoItem } from './types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    padding: theme.spacing(2, 1),
  },
  completed: {
    textDecoration: 'line-through',
  },
}));

const Item: React.FC<ITodoItem> = ({
  title, completed, id, userId,
}) => {
  const classes = useStyles();
  const { dispatch } = useTodo();

  return (
    <Paper>
      <Grid
        className={clsx(classes.item, {
          [classes.completed]: completed,
        })}
        onClick={() => {
          // TODO: figure out wether to place modal in separate context
          dispatch({
            type: 'select',
            payload: {
              id, userId, title, completed,
            },
          });
          dispatch({
            type: 'open',
          });
        }}
      >
        {title}
      </Grid>
    </Paper>
  );
};

export default Item;
