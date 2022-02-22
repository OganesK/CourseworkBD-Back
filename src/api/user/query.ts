import { extendType } from 'nexus';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.user();
    t.crud.users();

    t.field('me', {
      type: 'User',
      args: {},
      resolve: async (_, {}, { user }) => {
        return user;
      },
    });
  },
});
