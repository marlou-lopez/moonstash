export interface ITodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

export type Action = { type: 'select', payload: ITodoItem }
| { type: 'unselect' }
| { type: 'open' }
| { type: 'close' };
export type Dispatch = (action: Action) => void;
export type State = {
  selectedTodo: ITodoItem | null;
  openModal: boolean;
};
export type TodoProviderProps = { children: React.ReactNode };
