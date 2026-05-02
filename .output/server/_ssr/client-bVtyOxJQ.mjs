import { l as Storage, n as Client, r as Databases, s as Realtime, t as Account, u as TablesDB } from "../_libs/appwrite.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-bVtyOxJQ.js
var APPWRITE_CONFIG = {
	ENDPOINT: "https://api.kylrix.space/v1",
	PROJECT_ID: "67fe9627001d97e37ef3",
	DATABASES: {
		CHAT: "chat",
		KYLRIXNOTE: "67ff05a9000296822396",
		PASSWORD_MANAGER: "passwordManagerDb",
		KYLRIXFLOW: "whisperrflow"
	},
	TABLES: {
		KYLRIXNOTE: {
			USERS: "67ff05c900247b5673d3",
			ACTIVITY_LOG: "activityLog",
			WALLET_MAP: "walletMap"
		},
		PASSWORD_MANAGER: {
			KEYCHAIN: "keychain",
			IDENTITIES: "identities",
			WALLETS: "wallets",
			KEY_MAPPING: "key_mapping"
		},
		CHAT: {
			CONVERSATIONS: "conversations",
			CONVERSATION_MEMBERS: "conversationMembers",
			JOIN_REQUESTS: "joinRequests",
			MESSAGES: "messages",
			MESSAGE_REACTIONS: "messageReactions",
			ACCOUNT_EVENTS: "accountEvents",
			APP_ACTIVITY: "app_activity",
			CALL_LINKS: "calls",
			FOLLOWS: "follows",
			MOMENTS: "moments",
			INTERACTIONS: "interactions",
			PROFILES: "profiles",
			USERS: "profiles",
			CONTACTS: "contacts",
			EPOCHS: "epochs",
			UNORGANIC_EMAILS: "unorganic_emails"
		}
	},
	BUCKETS: {
		MESSAGES: "messages",
		VOICE: "voice",
		VIDEO: "video",
		PROFILE_PICTURES: "profile_pictures",
		GROUP_AVATARS: "group_avatars",
		COVERS: "covers"
	},
	FUNCTIONS: {
		PERMISSION_UPDATER: "permission-updater",
		CLAIM_GHOST_NOTES: "claim-ghost-notes",
		SEARCH_USERS: "69a582720012957d2027",
		SYNC_USER_PROFILE: "69a583ac002b674685b0",
		NOTIFY_ON_SHARE: "69a58c1c001c39695bf6",
		NOTIFY_ON_SOCIAL_ACTIVITY: "69a6bf6200180e70aca1",
		FLOW_EVENT_SYNC: "69a6c28f003bb7d7e054",
		LOG_SECURITY_EVENT: "69a6c45a002085baa8dd",
		SYNC_SUBSCRIPTION_STATUS: "69a6c56d00203438232c",
		ACCOUNT_CLEANUP: "69a6c6fc001dc877979d",
		CONNECT_CALL_CLEANUP: "69a6c841000b2c5aaae3"
	},
	AUTH: {
		SUBDOMAIN: "accounts",
		DOMAIN: "kylrix.space"
	}
};
var client = new Client().setEndpoint("https://api.kylrix.space/v1").setProject(APPWRITE_CONFIG.PROJECT_ID);
var account = new Account(client);
var databases = new Databases(client);
var tablesDB = new TablesDB(client);
var storage = new Storage(client);
var realtime = new Realtime(client);
var currentUserCache = void 0;
var currentUserRequest = null;
var CURRENT_USER_CACHE_KEY = "kylrix_connect_current_user_v1";
var CURRENT_USER_CACHE_TTL = 1e3 * 60 * 5;
function canUseStorage() {
	return typeof window !== "undefined";
}
function readCurrentUserSnapshot() {
	if (!canUseStorage()) return null;
	try {
		const raw = localStorage.getItem(CURRENT_USER_CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.user || typeof parsed.expiresAt !== "number" || parsed.expiresAt <= Date.now()) {
			localStorage.removeItem(CURRENT_USER_CACHE_KEY);
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}
function writeCurrentUserSnapshot(user) {
	if (!canUseStorage()) return;
	try {
		if (!user) {
			localStorage.removeItem(CURRENT_USER_CACHE_KEY);
			return;
		}
		const snapshot = {
			user,
			expiresAt: Date.now() + CURRENT_USER_CACHE_TTL
		};
		localStorage.setItem(CURRENT_USER_CACHE_KEY, JSON.stringify(snapshot));
	} catch {}
}
function hydrateCurrentUserCache() {
	if (currentUserCache !== void 0) return;
	const snapshot = readCurrentUserSnapshot();
	if (snapshot) currentUserCache = snapshot;
}
function getCurrentUserSnapshot() {
	hydrateCurrentUserCache();
	return currentUserCache && currentUserCache.expiresAt > Date.now() ? currentUserCache.user : null;
}
function getFilePreview(bucketId, fileId, width = 64, height = 64) {
	return storage.getFilePreview(bucketId, fileId, width, height);
}
function getProfilePicturePreview(fileId, width = 64, height = 64) {
	return getFilePreview("profile_pictures", fileId, width, height);
}
async function getCurrentUser(forceRefresh = false) {
	try {
		hydrateCurrentUserCache();
		if (!forceRefresh) {
			if (currentUserCache && currentUserCache.expiresAt > Date.now()) return currentUserCache.user;
			if (currentUserRequest) return currentUserRequest;
		}
		currentUserRequest = account.get().then((user) => {
			currentUserCache = {
				user,
				expiresAt: Date.now() + CURRENT_USER_CACHE_TTL
			};
			writeCurrentUserSnapshot(user);
			return user;
		}).catch(() => {
			currentUserCache = null;
			writeCurrentUserSnapshot(null);
			return null;
		}).finally(() => {
			currentUserRequest = null;
		});
		return await currentUserRequest;
	} catch {
		return null;
	}
}
async function resolveCurrentUser(req) {
	const direct = await getCurrentUser();
	if (direct && direct.$id) return direct;
	if (req) {
		const fallback = await getCurrentUserFromRequest(req);
		if (fallback && fallback.$id) return fallback;
	}
	return null;
}
async function getCurrentUserFromRequest(req) {
	try {
		if (!req) return null;
		const cookieHeader = req.headers.get("cookie") || req.headers.get("Cookie");
		if (!cookieHeader) return null;
		const res = await fetch(`${APPWRITE_CONFIG.ENDPOINT}/account`, {
			method: "GET",
			headers: {
				"X-Appwrite-Project": APPWRITE_CONFIG.PROJECT_ID,
				"Cookie": cookieHeader,
				"Accept": "application/json"
			},
			cache: "no-store"
		});
		if (!res.ok) return null;
		const data = await res.json();
		if (!data || typeof data !== "object" || !data.$id) return null;
		return data;
	} catch (e) {
		console.error("getCurrentUserFromRequest error", e);
		return null;
	}
}
//#endregion
export { getCurrentUser as a, realtime as c, tablesDB as d, databases as i, resolveCurrentUser as l, account as n, getCurrentUserSnapshot as o, client as r, getProfilePicturePreview as s, APPWRITE_CONFIG as t, storage as u };
