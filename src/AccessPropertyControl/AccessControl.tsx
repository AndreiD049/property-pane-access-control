/**
 * This is the react component that will be rendered by
 * Sharepoint when user open the property pane
 */
import * as React from "react";
import { FC } from "react";
import { IAccessControlProps } from "./IAccessControlProps";
import { getSiteGroups } from "../dal/groups";
import { Separator, Text } from "office-ui-fabric-react";

export interface ISiteGroupInfo {
	Id: number;
	Title: string;
}

const AccessControl: FC<IAccessControlProps> = (props) => {
	const [groups, setGroups] = React.useState<ISiteGroupInfo[]>([]);

	React.useEffect(() => {
		async function run() {
			const g = await getSiteGroups();
			setGroups(g);
		}
		run();
	}, [])

	return (
		<div>
			<Text>Groups</Text>
			{
				groups.length ?
					(
						groups.map((group) => (
							<div>{group.Title}</div>
						))
					) :
					null
			}
			<Separator>Permissions</Separator>
			{
				props.permissions.map((permission) => (
					<div>{permission}</div>
				))
			}
		</div>
	);
};

export default AccessControl;
