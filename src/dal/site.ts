import { getSP, Caching, getHashCode } from 'sp-preset';

export async function getSiteGroups() {
  let sp = getSP().using(Caching({
    keyFactory: (url: string) => `pac-${getHashCode(url)}`,
    store: 'session',
  }));
  return sp.web.siteGroups.select('Id', 'Title')()
}

export async function getSiteUsers() {
  let sp = getSP().using(Caching({
    keyFactory: (url: string) => `pac-${getHashCode(url)}`,
    store: 'session',
  }));
  return sp.web.siteUsers.select('Id', 'Title')();
}

export async function getCurrentUser() {
  let sp = getSP().using(Caching({
    keyFactory: (url: string) => `pac-${getHashCode(url)}`,
    store: 'session',
  }));
  return sp.web.currentUser.select('Id', 'Title')();
}

export async function getCurrentUserGroups() {
  let sp = getSP().using(Caching({
    keyFactory: (url: string) => `pac-${getHashCode(url)}`,
    store: 'session',
  }));
  return sp.web.currentUser.groups.select('Id', 'Title')()
}
