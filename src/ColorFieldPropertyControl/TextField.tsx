/**
 * This is the react component that will be rendered by
 * Sharepoint when user open the property pane
 */
import * as React from "react";
import { FC } from "react";

export interface ITextFieldProps {
	onChanged: (string) => void;
	label: string;
	value: string;
}

const TextField: FC<ITextFieldProps> = (props) => {
	return (
		<div>
			<label htmlFor={props.label}>{props.label}</label>
			<input id={props.label} value={props.value} onChange={(e) => props.onChanged(e.target.value)} />
		</div>
	);
};

export default TextField;
