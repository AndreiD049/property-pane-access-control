/**
 * The internal interface will be implemented by this.properties in your custom control.
 * It will have additionally properties like `onRender` and `onDismiss` that will render
 * or unmount the component.
 * It doesn't have to implement any additional properties.
 */
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { IPropertyPaneAccessControlProps } from './IPropertyPaneAccessControlProps';

export interface IPropertyPaneAccessControlInternalProps
  extends IPropertyPaneAccessControlProps,
    IPropertyPaneCustomFieldProps {
  context: any;
}
