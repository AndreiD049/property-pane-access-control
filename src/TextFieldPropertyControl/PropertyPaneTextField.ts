import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import * as React from "react";
import * as ReactDOM from "react-dom";
import TextField, { ITextFieldProps } from "./TextField";
import { IPropertyPaneTextFieldInternalProps } from "./IPropertyPaneTextFieldInternalProps";
import { IPropertyPaneTextFieldProps } from "./IPropertyPaneTextProps";

class PropertyPaneTextFieldBuilder implements IPropertyPaneField<IPropertyPaneTextFieldProps> {
	public type = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyPaneTextFieldInternalProps;
	private elem: HTMLElement;
	
	private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

	constructor(targetProperty: string, properties: IPropertyPaneTextFieldProps) {
		console.log("Constructor", targetProperty, properties);
		this.targetProperty = targetProperty;
		this.properties = {
			label: properties.label,
			value: properties.value,
			key: properties.label,
			onRender: this.onRender.bind(this),
			onDispose: this.onDispose.bind(this),
		};
	}

	public render() {
		if (!this.elem) {
			return;
		}

		this.onRender(this.elem);
	}

	private onRender(elem: HTMLElement, ctx?: any, changeCallback?: (targetProp?: string, newValue?: string) => void) {
		if (!this.elem) {
			this.elem = elem;
		}

		const element: React.ReactElement<ITextFieldProps> = React.createElement(
			TextField,
			{
				onChanged: this.onChanged.bind(this),
				label: this.properties.label,
				value: this.properties.value,
			}
		);
		ReactDOM.render(element, this.elem);

		if (changeCallback) {
			this._onChangeCallback = changeCallback;
		}
	}

	private onDispose(elem: HTMLElement) {
		ReactDOM.unmountComponentAtNode(elem);
	}

	private onChanged(newValue: string) {
		this._onChangeCallback(this.targetProperty, newValue);
	}
}

export function PropertyPaneTextField(targetProperty: string, properties: IPropertyPaneTextFieldProps) {
	return new PropertyPaneTextFieldBuilder(targetProperty, properties);
}