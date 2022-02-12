import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/site-groups';
import '@pnp/sp/site-users/web';

export async function getSiteGroups() {
  console.log(sp);
  return sp.web.siteGroups
    .select('Id', 'Title')
    .usingCaching({
      key: 'pac-siteGroups',
      storeName: 'session',
    })
    .get();
}

export async function getSiteUsers() {
  console.log(sp);
  return sp.web.siteUsers
    .select('Id', 'Title')
    .usingCaching({
      key: 'poc-siteUsers',
      storeName: 'session',
    })
    .get();
}

export async function getCurrentUser() {
  return sp.web.currentUser
    .select('Id', 'Title')
    .usingCaching({
      key: 'poc-currentUser',
      storeName: 'session',
    })
    .get();
}

export async function getCurrentUserGroups() {
  return sp.web.currentUser
    .groups
    .select('Id', 'Title')
    .usingCaching({
      key: 'poc-currentUserGroups',
      storeName: 'session',
    })
    .get();
}
