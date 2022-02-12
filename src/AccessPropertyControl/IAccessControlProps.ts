import { IUserGroupPermissions } from './AccessControl';

export interface IAccessControlProps {
  permissions: string[];
  selected: IUserGroupPermissions;
  onChanged: (newValue: IUserGroupPermissions) => void;
}
