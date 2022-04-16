import { IUserGroupPermissions } from "..";
import { setupSP } from "sp-preset";
import { getCurrentUser, getCurrentUserGroups } from "./site";

export async function canCurrentUser(action: string, permissions: IUserGroupPermissions) {
    const currentUser = await getCurrentUser();
    // fail fast
    if (!permissions || !permissions[action]) return false;
    const perm = permissions[action];
    // Check if user is mentioned in permissions
    if (perm.users.filter((p) => p === String(currentUser.Id)).length > 0) return true;
    // If not, get user's groups, and check those
    if (!perm.groups || perm.groups.length === 0) return false;
    const groups = await getCurrentUserGroups();
    const groupSet = new Set(perm.groups);
    return groups.some(g => groupSet.has(String(g.Id)));
}

export function setupAccessControl(context: any) {
    setupSP({
        context: context,
        rpmAlerting: false,
        rpmTracing: false,
        rpmTreshold: 1000,
        useRPM: true
    });
}