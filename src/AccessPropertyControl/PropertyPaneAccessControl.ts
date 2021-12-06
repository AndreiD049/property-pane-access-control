import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { sp } from "@pnp/sp";
import * as React from "react";
import * as ReactDOM from "react-dom";
import AccessControl from "./AccessControl";
import { IAccessControlProps } from "./IAccessControlProps";
import { IPropertyPaneAccessControlInternalProps } from "./IPropertyPaneAccessControlInternalProps";
import { IPropertyPaneAccessControlProps } from "./IPropertyPaneAccessControlProps";

class PropertyPaneAccessControlBuilder implements IPropertyPaneField<IPropertyPaneAccessControlProps> {
	public type = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyPaneAccessControlInternalProps;
	private elem: HTMLElement;
	
	private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

	constructor(targetProperty: string, properties: IPropertyPaneAccessControlProps) {
		this.targetProperty = targetProperty;
		this.properties = {
			key: properties.key,
			context: properties.context,
			permissions: properties.permissions,
			onRender: this.onRender.bind(this),
			onDispose: this.onDispose.bind(this),
		};
		// Setup @pnp/sp
		sp.setup({
			spfxContext: this.properties.context,
		});
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

		const element: React.ReactElement<IAccessControlProps> = React.createElement(
			AccessControl,
			{
				permissions: this.properties.permissions,
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

export function PropertyPaneAccessControl(targetProperty: string, properties: IPropertyPaneAccessControlProps) {
	return new PropertyPaneAccessControlBuilder(targetProperty, properties);
}