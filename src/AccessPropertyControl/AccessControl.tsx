/**
 * This is the react component that will be rendered by
 * Sharepoint when user open the property pane
 */
import * as React from 'react';
import { FC } from 'react';
import { IAccessControlProps } from './IAccessControlProps';
import { getSiteGroups, getSiteUsers } from '../dal/site';
import PermissionField from './PermissionField';
import { IPersonaProps } from 'office-ui-fabric-react';

export interface IUserGroupInfo {
  Id: number;
  Title: string;
}

export interface IPersonaPropsWithType extends IPersonaProps {
  id: string;
  entityType: 'user' | 'group';
}

export interface IUserGroupPermissions {
  [key: string]: {
    users: string[];
    groups: string[];
  };
}

const AccessControl: FC<IAccessControlProps> = (props) => {
  const [groups, setGroups] = React.useState<IUserGroupInfo[]>([]);
  const [users, setUsers] = React.useState<IUserGroupInfo[]>([]);
  const [permissions, setPermissions] =
    React.useState<IUserGroupPermissions>(props.selected);

  const options: IPersonaPropsWithType[] = React.useMemo(() => {
    const userOptions: IPersonaPropsWithType[] = users.map((user) => ({
      id: user.Id.toString(),
      text: user.Title,
      entityType: 'user',
    }));
    const groupOptions: IPersonaPropsWithType[] = groups.map((group) => ({
      id: group.Id.toString(),
      text: group.Title,
      entityType: 'group',
    }));
    const result = [...userOptions, ...groupOptions];
    return result;
  }, [groups, users]);

  React.useEffect(() => {
    async function run() {
      const g = await getSiteGroups();
      setGroups(g);
      const u = await getSiteUsers();
      setUsers(u);
    }
    run();
  }, []);

  const handleSelect = (permission: string) => (opts: IPersonaPropsWithType[]) => {
    setPermissions(prev => {
      const copy = {...prev};
      if (!copy[permission]) {
        copy[permission] = {
          users: [],
          groups: [],
        };
      }
      copy[permission].groups = opts.filter(opt => opt.entityType === 'group').map(opt => opt.id);
      copy[permission].users = opts.filter(opt => opt.entityType === 'user').map(opt => opt.id);
      props.onChanged(copy);
      return copy;
    });
  }

  return (
    <div>
      {props.permissions.map((permission) => (
        <PermissionField permission={permission} options={options} handleSelect={handleSelect(permission)} selected={permissions} />
      ))}
    </div>
  );
};

export default AccessControl;
