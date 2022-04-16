import { IUserGroupPermissions } from './AccessControl';

/**
 * Public props that user will be required to supply to the contol
 */
export interface IPropertyPaneAccessControlProps {
  key: string;
  permissions: string[];
  context: any;
  selectedUserGroups: IUserGroupPermissions;
}
