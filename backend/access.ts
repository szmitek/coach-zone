import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';
import {PlayerImage} from "./schemas/PlayerImage";
// At it's simplest, the access control returns a yes or no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('Szmitek');
  },
  canManagePlayerImages({ session }: ListAccessArgs) {
    // First check if the user is signed in
    if (!isSignedIn({ session })) {
      return false;
    }
    return true;
  },
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageExercises({ session }: ListAccessArgs) {
    // 1. Do they have the permission of canManageExercise
    if (permissions.canManageExercises({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canReadExercise({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    return true; // They can read everyt
  },
  canTraining({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageTraining({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canTeam({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageTeam({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canEvents({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageEvents({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManagePlayerItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageTeam({ session })) {
      return true;
    }
    //check if user is owner of the team that the player belongs to.
    return { team: { user: { id: session.itemId } } };
  },
  canManagePlayerImages({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    return { player: { team: { user: { id: session.itemId } } } };
  },

  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // Otherwise they may only update themselves!
    return { id: session.itemId };
  },
};
