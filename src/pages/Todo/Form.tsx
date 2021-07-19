import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ITodoItem } from './Item';

function getRandomInt() {
  return Math.floor(Math.random() * (800) + 200);
}

const postTodo = async (todo: ITodoItem) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await response.json();
  console.log('post: ', data);
  return data;
};

const Form: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const queryClient = useQueryClient();
  const { mutate } = useMutation(postTodo, {
    onMutate: async (newTodo: ITodoItem) => {
      await queryClient.cancelQueries('todos');

      const previousTodos = queryClient.getQueryData<ITodoItem[]>('todos');

      if (previousTodos) {
        queryClient.setQueryData<ITodoItem[]>('todos', [...previousTodos, newTodo]);
      }

      return {
        previousTodos,
      };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<ITodoItem[]>('todos', context.previousTodos);
      }
    },
    onSuccess: (data) => {
      console.log('succ: ', data);
    },
    onSettled: () => {
      queryClient.invalidateQueries('todos');
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    // console.log('value: ', event.target.value);
  };

  const textAreaOnEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // onSubmit(e);
      if (value === '') return;
      mutate({
        id: getRandomInt(),
        userId: getRandomInt(),
        title: value,
        completed: false,
      });
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        fullWidth
        label="Add Todo"
        value={value}
        onChange={handleChange}
        onKeyDown={textAreaOnEnter}
      />
    </>
  );
};

export default Form;