import { PropertyPaneAccessControl } from './AccessPropertyControl/PropertyPaneAccessControl';
import { IUserGroupPermissions } from './AccessPropertyControl/AccessControl';
import { canCurrentUser } from './dal/access-checking';

export default PropertyPaneAccessControl;
export { IUserGroupPermissions, canCurrentUser };
