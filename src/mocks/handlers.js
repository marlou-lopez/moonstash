import { rest } from 'msw';

const handlers = [
  rest.get('/todos', (req, res, ctx) => res(
    ctx.json({
      todos: [{
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        firstName: 'John',
        lastName: 'Maverick',
      },
      ],
    }),
  )),
];

export default handlers;
