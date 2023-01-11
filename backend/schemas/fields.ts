import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canManageExercises: checkbox({
    defaultValue: false,
    label: 'User can Update and delete any exercise',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can Edit other users',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles',
  }),
  canManageTraining: checkbox({
    defaultValue: false,
    label: 'User can see and manage cart and training items',
  }),
  canManageTeam: checkbox({
    defaultValue: false,
    label: 'User can see and manage Team',
  }),
  canManageEvents: checkbox({
    defaultValue: false,
    label: 'User can see and manage Events',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
