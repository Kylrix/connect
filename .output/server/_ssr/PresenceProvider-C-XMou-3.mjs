import { o as __toESM } from "../_runtime.mjs";
import { i as ID, o as Query } from "../_libs/appwrite.mjs";
import { c as realtime, d as tablesDB, t as APPWRITE_CONFIG } from "./client-bVtyOxJQ.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { i as useAuth } from "./chat-GLmU6cBO.mjs";
import { T as useDataNexus } from "./DynamicIsland-DPFhB0ig.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PresenceProvider-C-XMou-3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
var ACTIVITY_TABLE = APPWRITE_CONFIG.TABLES.CHAT.APP_ACTIVITY;
/**
* ActivityService: The "Nervous System" of the Kylrix Ecosystem.
* Orchestrates cross-app synergies by observing and reacting to user actions.
*/
var ActivityService = {
	async updatePresence(userId, status, customStatus) {
		try {
			const existing = await tablesDB.listRows(DB_ID, ACTIVITY_TABLE, [Query.equal("userId", userId), Query.limit(1)]);
			if (existing.total > 0) return await tablesDB.updateRow(DB_ID, ACTIVITY_TABLE, existing.rows[0].$id, {
				status,
				customStatus,
				lastSeen: (/* @__PURE__ */ new Date()).toISOString()
			});
			else return await tablesDB.createRow(DB_ID, ACTIVITY_TABLE, ID.unique(), {
				userId,
				status,
				customStatus,
				lastSeen: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch (error) {
			console.error("Failed to update presence:", error);
		}
	},
	async getUserPresence(userId) {
		return (await tablesDB.listRows(DB_ID, ACTIVITY_TABLE, [Query.equal("userId", userId), Query.limit(1)])).rows[0] || null;
	},
	async logActivity(activity) {
		return this.updatePresence(activity.userId, "online", activity.action);
	},
	async getRecentActivity(userId, limit = 50) {
		return await tablesDB.listRows(DB_ID, ACTIVITY_TABLE, [
			Query.equal("userId", userId),
			Query.orderDesc("$createdAt"),
			Query.limit(limit)
		]);
	},
	async analyzeSynergy(userId) {
		return (await this.getRecentActivity(userId)).rows;
	}
};
var PresenceContext = (0, import_react.createContext)({
	getPresence: async () => null,
	presence: {}
});
var PresenceProvider = ({ children }) => {
	const { user } = useAuth();
	const { fetchOptimized, setCachedData } = useDataNexus();
	const [presence, setPresence] = import_react.useState({});
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const unsub = realtime.subscribe([`databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.APP_ACTIVITY}.rows`], (response) => {
			const payload = response.payload;
			if (payload.userId) {
				setPresence((prev) => ({
					...prev,
					[payload.userId]: payload
				}));
				setCachedData(`presence_${payload.userId}`, payload, 1e3 * 60 * 5);
			}
		});
		const updateStatus = (status) => {
			ActivityService.updatePresence(user.$id, status);
		};
		updateStatus("online");
		const interval = setInterval(() => updateStatus("online"), 1e3 * 60 * 2);
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") updateStatus("online");
			else updateStatus("away");
		};
		window.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			clearInterval(interval);
			window.removeEventListener("visibilitychange", handleVisibilityChange);
			updateStatus("offline");
			if (typeof unsub === "function") unsub();
			else unsub?.unsubscribe?.();
		};
	}, [user, setCachedData]);
	const getPresence = (0, import_react.useCallback)(async (userId) => {
		if (presence[userId]) return presence[userId];
		return await fetchOptimized(`presence_${userId}`, async () => {
			const p = await ActivityService.getUserPresence(userId);
			if (p) setPresence((prev) => ({
				...prev,
				[userId]: p
			}));
			return p;
		}, 1e3 * 60 * 5);
	}, [presence, fetchOptimized]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceContext.Provider, {
		value: {
			getPresence,
			presence
		},
		children
	});
};
var usePresence = () => (0, import_react.useContext)(PresenceContext);
//#endregion
export { PresenceProvider as n, usePresence as r, ActivityService as t };
