import { envState, UserService, userState } from 'ftb-models';
import Dexie from 'dexie';
import { User } from '../../shared/schema/src/models/user.model';
import { League } from '../../shared/schema/src/models/league.model';
import { City } from '../../shared/schema/src/models/city.model';
import { AppClient } from '../../shared/schema/src/models/app-client.model';

// export async function updateUserFromServer() {
//   await new ProfileService().loadProfileInfo().then(async (user) => {
//     console.log(user, "userfromserver");
//     for (const key in user) {
//       if (JSON.stringify(userState[key]) != JSON.stringify(user[key])) {
//         userState[key] = user[key];
//       }
//     }
//     return saveUserInLS();
//   });
// }

let db;
export const getUiDb = () => {
  if (typeof window !== 'undefined') {
    if (!db) {
      db = new Dexie(envState.appKey + '_ui');
      db.version(5).stores({ ui: 'category' });
    }
    return db['ui'];
  }
};

export async function editUserOnServer(newPhoto?: string) {
  await new UserService().editProfile(userState, newPhoto);
  return saveUserInLS();
}

export async function loadUserFromLS() {
  const data = await getUiDb().get('user');
  if (!data) return;

  const user = new User();
  const city = Object.assign(new City(), data.user.league.city);
  const league = Object.assign(new League(), data.user.league);
  const appClient = Object.assign(new AppClient(), data.user.league.client);

  league.city = city;
  league.client = appClient;
  user.league = league;
  user.language = data.user.language;
  user.timezoneOffset = data.user.timezoneOffset;
  user.token = data.user.token;
  user.roles = data.user.roles;
  user.subscriptions = data.user.subscriptions;

  return user;
}

export async function saveUserInLS() {
  const user = {
    language: userState.language,
    timezoneOffset: userState.timezoneOffset,
    token: userState.token,
    league: {
      _id: userState.league._id,
      name: userState.league.name,
      client: {
        _id: userState.league['client']._id,
        key: userState.league['client'].key,
      },
      city: {
        _id: userState.league.city._id,
        name: userState.league.city.name,
      },
    },
    roles: userState.roles,
    subscriptions:
      userState.subscriptions?.map(s => ({
        team: s.team
          ? {
              _id: s.team._id,
              name: s.team.name,
              logo: s.team.logo,
              logoId: s.team.logoId,
            }
          : null,
        player: s.player
          ? {
              _id: s.player._id,
              firstName: s.player.firstName,
              lastName: s.player.lastName,
              photoId: s.player.photoId,
            }
          : null,
      })) || [],
  };

  return getUiDb().put({ category: 'user', user });
}
