import { WebPartContext } from '@microsoft/sp-webpart-base';

/**
 * Public props that user will be required to supply to the contol
 */
export interface IPropertyPaneAccessControlProps {
	key: string;
	permissions: string[];
	context: WebPartContext;
}