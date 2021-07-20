import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useQuery } from 'react-query';
import TodoItem from './Item';
import { ITodoItem } from './types';

const getTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data.slice(0, 15);
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  list: {
    '& > div:not(:first-child)': {
      marginTop: theme.spacing(1),
    },
    height: '650px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: theme.spacing(1),
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.grey[300],
      borderRadius: theme.spacing(0.5),
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main,
      borderRadius: theme.spacing(0.5),
    },
  },
}));

const List: React.FC = () => {
  const classes = useStyles();
  const { data, isLoading, error } = useQuery<ITodoItem[], Error>('todos', getTodos);
  if (isLoading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        `An error has occurred: $
        {error.message}
        `
      </p>
    );
  }
  return (
    <Box className={classes.list}>
      {data?.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TodoItem {...item} key={item.id} />
      ))}
    </Box>
  );
};

export default List;
