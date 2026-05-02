import { o as Query } from "../_libs/appwrite.mjs";
import { d as tablesDB, t as APPWRITE_CONFIG } from "./client-bVtyOxJQ.mjs";
import { r as zt } from "../_libs/react-hot-toast.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upgrade-island-DBox53k5.js
var EcosystemService = {
	async listNotes(userId) {
		return await tablesDB.listRows(APPWRITE_CONFIG.DATABASES.KYLRIXNOTE, "67ff05f3002502ef239e", [
			Query.equal("userId", userId),
			Query.orderDesc("$updatedAt"),
			Query.limit(50)
		]);
	},
	async createNote(userId, title, content) {
		return await tablesDB.createRow(APPWRITE_CONFIG.DATABASES.KYLRIXNOTE, "67ff05f3002502ef239e", "unique()", {
			userId,
			title,
			content,
			isPublic: false,
			status: "published",
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	},
	async listSecrets(userId) {
		return await tablesDB.listRows(APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER, "credentials", [
			Query.equal("userId", userId),
			Query.orderDesc("$updatedAt"),
			Query.limit(50)
		]);
	},
	async listTotpSecrets(userId) {
		return await tablesDB.listRows(APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER, "totpSecrets", [
			Query.equal("userId", userId),
			Query.orderDesc("$updatedAt"),
			Query.limit(50)
		]);
	},
	async listEvents(userId) {
		return await tablesDB.listRows(APPWRITE_CONFIG.DATABASES.KYLRIXFLOW, "events", [
			Query.equal("userId", userId),
			Query.orderDesc("startTime"),
			Query.limit(50)
		]);
	}
};
/**
* Utility to trigger the upgrade UI in the Dynamic Island or show a toast
* when a user tries to access a premium feature.
*/
function showUpgradeIsland(feature) {
	zt.error(`Premium Feature: ${feature}. Please upgrade your Kylrix tier to unlock.`, {
		icon: "💎",
		duration: 5e3,
		style: {
			background: "#0A0908",
			color: "#fff",
			border: "1px solid rgba(255, 255, 255, 0.1)",
			borderRadius: "16px",
			fontWeight: 700,
			fontFamily: "var(--font-clash)"
		}
	});
	console.log(`[Upgrade] User attempted to use premium feature: ${feature}`);
}
//#endregion
export { showUpgradeIsland as n, EcosystemService as t };
