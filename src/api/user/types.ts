import { objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const User = objectType({
  name: 'User',
  definition (t) {
    t.model.id();
    t.model.role();
    t.model.firstname();
    t.model.lastname();
    t.model.email();
    t.model.manufactures();
    t.model.shops();
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition (t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});
