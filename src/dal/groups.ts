import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups";

export async function getSiteGroups() {
	return sp
		.web
		.siteGroups
		.select("Id", "Title")
		.usingCaching({
			key: "siteGroups",
			storeName: "session",
		}).get();
}