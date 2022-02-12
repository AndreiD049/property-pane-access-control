import { NormalPeoplePicker, Stack, StackItem } from 'office-ui-fabric-react';
import * as React from 'react';
import { FC } from 'react';
import { IPersonaPropsWithType, IUserGroupPermissions } from './AccessControl';

export interface IPermissionFieldProps {
    permission: string;
    options: IPersonaPropsWithType[];
    handleSelect: (opts: IPersonaPropsWithType[]) => void;
    selected: IUserGroupPermissions;
}

const FilterOptions = (filter: string, options: IPersonaPropsWithType[]) => {
    const f = filter.toLowerCase();
    return options.filter((opt) => opt.text.toLowerCase().indexOf(f) !== -1);
};

const PermissionField: FC<IPermissionFieldProps> = (props) => {
    const selectedOptions: IPersonaPropsWithType[] = React.useMemo(() => {
        if (!props.selected) return [];
        if (!props.selected[props.permission]) return [];
        const perm = props.selected[props.permission];
        return props.options.filter(person => perm.users.indexOf(person.id) !== -1 || perm.groups.indexOf(person.id) !== -1);
    }, [props.selected, props.options]);

    return (
        <Stack
            horizontal
            horizontalAlign="start"
            verticalAlign="center"
            tokens={{ childrenGap: 10 }}
            style={{
                marginTop: 10,
            }}
        >
            <StackItem style={{ minWidth: 50 }}>{props.permission}</StackItem>
            <StackItem grow={2}>
                <NormalPeoplePicker
                    selectedItems={selectedOptions}
                    onChange={props.handleSelect}
                    onResolveSuggestions={(filter: string) =>
                        FilterOptions(filter, props.options)
                    }
                    onEmptyInputFocus={() => props.options}
                />
            </StackItem>
        </Stack>
    );
};

export default PermissionField;
