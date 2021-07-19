import { Paper, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

export interface ITodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}
const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    padding: theme.spacing(2, 1),
  },
  completed: {
    textDecoration: 'line-through',
  },
}));

const Item: React.FC<ITodoItem> = ({
  title, completed,
}) => {
  const classes = useStyles();

  return (
    <Paper>
      <Grid className={clsx(classes.item, {
        [classes.completed]: completed,
      })}
      >
        {title}
      </Grid>
    </Paper>
  );
};

export default Item;
