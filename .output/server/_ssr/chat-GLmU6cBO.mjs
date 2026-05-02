import { o as __toESM } from "../_runtime.mjs";
import { a as Permission, c as Role, i as ID, o as Query } from "../_libs/appwrite.mjs";
import { d as tablesDB, n as account, t as APPWRITE_CONFIG, u as storage } from "./client-bVtyOxJQ.mjs";
import { a as getEcosystemUrl, n as UsersService, o as seedIdentityCache, t as KYLRIX_AUTH_URI } from "./users-vRrLGFai.mjs";
import { n as ecosystemSecurity } from "./security-DTzL0999.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { d as useParams, u as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-GLmU6cBO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useRouter() {
	const navigate = useNavigate();
	return {
		push: (to) => navigate({ to }),
		replace: (to) => navigate({
			to,
			replace: true
		}),
		back: () => window.history.back(),
		refresh: () => window.location.reload()
	};
}
function usePathname() {
	return typeof window !== "undefined" ? window.location.pathname : "/";
}
function useSearchParams() {
	const search = typeof window !== "undefined" ? window.location.search : "";
	return new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
}
function useParams$1() {
	return useParams({ strict: false });
}
function Image({ src, alt, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		...props
	});
}
var AuthContext = (0, import_react.createContext)(void 0);
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
async function sendKylrixEmailNotification(payload) {
	const response = await fetch(`${KYLRIX_AUTH_URI}/api/emails`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		const data = await response.json().catch(() => ({}));
		throw new Error(data?.error || "Failed to queue notification email");
	}
	return response.json().catch(() => ({}));
}
var DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
var CONV_TABLE = APPWRITE_CONFIG.TABLES.CHAT.CONVERSATIONS;
var CONV_MEMBERS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.CONVERSATION_MEMBERS || "conversationMembers";
var MSG_TABLE = APPWRITE_CONFIG.TABLES.CHAT.MESSAGES;
var EPOCHS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.EPOCHS;
var KEY_MAPPING_DB = APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER;
var KEY_MAPPING_TABLE = APPWRITE_CONFIG.TABLES.PASSWORD_MANAGER.KEY_MAPPING;
var ACCOUNTS_API_URL = `${KYLRIX_AUTH_URI}/api/permissions`;
var ACCOUNTS_MESSAGE_API_URL = `${KYLRIX_AUTH_URI}/api/connect/messages`;
var ACCOUNTS_MESSAGE_REACTIONS_API_URL = `${KYLRIX_AUTH_URI}/api/connect/message-reactions`;
var ACCOUNTS_JOIN_REQUESTS_API_URL = `${KYLRIX_AUTH_URI}/api/connect/join-requests`;
var ACCOUNTS_KEY_REPAIR_API_URL = `${KYLRIX_AUTH_URI}/api/connect/repair`;
var GROUP_AVATAR_ROUTE = `${KYLRIX_AUTH_URI}/api/connect/group-avatar`;
var conversationKeyCache = /* @__PURE__ */ new Map();
var conversationPreviewCache = /* @__PURE__ */ new Map();
var arraysEqual = (left, right) => left.length === right.length && left.every((value, index) => value === right[index]);
var canonicalizeParticipantsForMatch = (participants) => Array.from(new Set((participants || []).filter(Boolean))).sort();
var uniqueIds = (ids) => Array.from(new Set(ids.map((value) => String(value || "").trim()).filter(Boolean)));
var buildGroupAvatarUrl = (conversationId) => `${GROUP_AVATAR_ROUTE}?conversationId=${encodeURIComponent(conversationId)}`;
var setConversationPreviewCache = (conversationId, preview) => {
	if (!conversationId) return;
	if (!preview?.lastMessageId) {
		conversationPreviewCache.delete(conversationId);
		return;
	}
	conversationPreviewCache.set(conversationId, {
		lastMessageId: preview.lastMessageId,
		lastMessageText: preview.lastMessageText || "",
		lastMessageAt: preview.lastMessageAt || (/* @__PURE__ */ new Date()).toISOString(),
		lastMessageSenderId: preview.lastMessageSenderId || null
	});
};
var getConversationPreviewCache = (conversationId) => conversationPreviewCache.get(conversationId) || null;
var getConversationMemberSnapshot = async (conversationId, fallbackParticipants = []) => {
	const participants = uniqueIds([...((await tablesDB.listRows(DB_ID, CONV_MEMBERS_TABLE, [Query.equal("conversationId", conversationId), Query.limit(1e3)]).catch(() => ({ rows: [] }))).rows || []).map((row) => row.userId)]);
	if (participants.length > 0) return participants;
	return uniqueIds(fallbackParticipants);
};
var getConversationActivityAt = (row) => row?.lastMessageAt || row?.updatedAt || row?.createdAt || row?.$updatedAt || row?.$createdAt || null;
var getMessageActivityAt = (row) => row?.createdAt || row?.updatedAt || row?.$createdAt || row?.$updatedAt || null;
async function notifyMessageStreak(conversation, senderId, conversationId) {
	const recipientIds = Array.isArray(conversation?.participants) ? uniqueIds(conversation.participants).filter((id) => id !== senderId) : [];
	if (recipientIds.length !== 1) return;
	const recentMessages = await tablesDB.listRows(DB_ID, MSG_TABLE, [
		Query.equal("conversationId", conversationId),
		Query.orderDesc("createdAt"),
		Query.limit(5)
	]);
	if (recentMessages.rows.length < 5) return;
	if (!recentMessages.rows.every((row) => row.senderId === senderId)) return;
	await sendKylrixEmailNotification({
		eventType: "message_streak",
		sourceApp: "connect",
		actorName: senderId,
		recipientIds,
		resourceId: conversationId,
		resourceTitle: conversation?.name || conversation?.title || "Conversation",
		resourceType: "conversation",
		templateKey: `connect:message-streak:${conversationId}:${senderId}`,
		ctaUrl: `${getEcosystemUrl("connect")}/chat/${conversationId}`,
		ctaText: "Open chat"
	});
}
var buildConversationMemberPermissions = (_participantIds, creatorId) => {
	return [
		Permission.read(Role.user(creatorId)),
		Permission.update(Role.user(creatorId)),
		Permission.delete(Role.user(creatorId))
	];
};
var normalizeConversationRow = async (conversation) => {
	if (!conversation) return conversation;
	const participants = Array.isArray(conversation.participants) ? conversation.participants.filter((participant) => typeof participant === "string" && participant.length > 0) : [];
	const normalizedParticipants = Array.from(new Set(participants));
	const creatorId = conversation.creatorId;
	if (arraysEqual(participants, normalizedParticipants) && creatorId === conversation.creatorId) return conversation;
	return {
		...conversation,
		participants: normalizedParticipants,
		creatorId
	};
};
var getMessagePreview = async (message, conversationId) => {
	if (!message) return "";
	if (message.type && message.type !== "text" && message.type !== "attachment") return `[${message.type}]`;
	const rawContent = message.content || "";
	if (!rawContent) return "";
	if (!ecosystemSecurity.status.isUnlocked || rawContent.length <= 40) return rawContent;
	try {
		const convKey = ecosystemSecurity.getConversationKey(conversationId);
		if (convKey) return await ecosystemSecurity.decryptWithKey(rawContent, convKey);
		return await ecosystemSecurity.decrypt(rawContent);
	} catch (_e) {
		return "[Encrypted message]";
	}
};
var buildLockboxMetadata = (payload) => JSON.stringify(payload);
var parseInviteMeta = (value) => {
	if (!value) return null;
	if (typeof value === "object") return value;
	if (typeof value !== "string") return null;
	try {
		const parsed = JSON.parse(value);
		return parsed && typeof parsed === "object" ? parsed : null;
	} catch {
		return null;
	}
};
var buildInviteMeta = (current, patch) => {
	const next = { ...parseInviteMeta(current?.inviteMeta) || {} };
	if (Object.prototype.hasOwnProperty.call(patch, "name")) next.name = typeof patch.name === "string" ? patch.name : "";
	else if (typeof current?.name === "string") next.name = current.name;
	else if (!Object.prototype.hasOwnProperty.call(next, "name")) next.name = "";
	if (Object.prototype.hasOwnProperty.call(patch, "description")) next.description = typeof patch.description === "string" ? patch.description : "";
	else if (typeof current?.description === "string") next.description = current.description;
	else if (!Object.prototype.hasOwnProperty.call(next, "description")) next.description = "";
	return JSON.stringify(next);
};
async function getPermissionUpdateAuth(auth) {
	let jwt = auth?.jwt || null;
	if (!jwt && !auth?.cookie) jwt = (await account.createJWT().catch(() => null))?.jwt || null;
	if (!jwt && !auth?.cookie) throw new Error("Unable to authenticate permission update request");
	return {
		...jwt ? { Authorization: `Bearer ${jwt}` } : {},
		...auth?.cookie ? { Cookie: auth.cookie } : {}
	};
}
async function callPermissionsApi(method, payload, auth) {
	const headers = await getPermissionUpdateAuth(auth);
	const response = await fetch(ACCOUNTS_API_URL, {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers
		},
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.error || "Permission update failed");
	}
	return response.json().catch(() => ({}));
}
async function callMessageCreateApi(payload, auth) {
	const headers = await getPermissionUpdateAuth(auth);
	const response = await fetch(ACCOUNTS_MESSAGE_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...headers
		},
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.error || "Message creation failed");
	}
	return response.json().catch(() => ({}));
}
async function callMessageReactionApi(method, payload, auth) {
	const headers = await getPermissionUpdateAuth(auth);
	const response = await fetch(ACCOUNTS_MESSAGE_REACTIONS_API_URL, {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers
		},
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.error || "Reaction update failed");
	}
	return response.json().catch(() => ({}));
}
async function callConversationRepairApi(payload, auth) {
	const headers = await getPermissionUpdateAuth(auth);
	const response = await fetch(ACCOUNTS_KEY_REPAIR_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...headers
		},
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.error || "Conversation repair failed");
	}
	return response.json().catch(() => ({}));
}
async function callJoinRequestApi(method, payload, auth) {
	const headers = await getPermissionUpdateAuth(auth);
	const response = await fetch(ACCOUNTS_JOIN_REQUESTS_API_URL, {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers
		},
		body: payload ? JSON.stringify(payload) : void 0
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.error || "Join request update failed");
	}
	return response.json().catch(() => ({}));
}
async function fetchKeyMapping(resourceType, resourceId, grantee) {
	return (await tablesDB.listRows(KEY_MAPPING_DB, KEY_MAPPING_TABLE, [
		Query.equal("resourceType", resourceType),
		Query.equal("resourceId", resourceId),
		Query.equal("grantee", grantee),
		Query.limit(1)
	])).rows[0] || null;
}
async function fetchProfilePublicKey(userId) {
	try {
		return (await UsersService.getProfileById(userId))?.publicKey || null;
	} catch {
		return null;
	}
}
async function unwrapKeyMapping(row, fallbackUserId) {
	if (!row?.wrappedKey || !row?.grantee) return null;
	let metadata = {};
	try {
		metadata = row.metadata ? JSON.parse(row.metadata) : {};
	} catch {
		metadata = {};
	}
	const wrappedByPublicKey = metadata.wrappedByPublicKey || (metadata.wrappedBy ? await fetchProfilePublicKey(metadata.wrappedBy) : null) || (fallbackUserId ? await fetchProfilePublicKey(fallbackUserId) : null);
	if (!wrappedByPublicKey) return null;
	return await ecosystemSecurity.unwrapKeyWithECDH(row.wrappedKey, wrappedByPublicKey) || null;
}
async function fetchConversationKeyFromLockbox(conversationId, userId, creatorId) {
	const row = await fetchKeyMapping("chat", conversationId, userId);
	if (!row) return null;
	return unwrapKeyMapping(row, creatorId || userId);
}
async function fetchEpochKeyForConversation(conversationId, userId, messageCreatedAt) {
	const epochs = (await tablesDB.listRows(APPWRITE_CONFIG.DATABASES.CHAT, EPOCHS_TABLE, [
		Query.equal("resourceId", conversationId),
		Query.orderDesc("epochNumber"),
		Query.limit(50)
	])).rows || [];
	const messageTime = messageCreatedAt ? new Date(messageCreatedAt).getTime() : NaN;
	for (const epoch of epochs) {
		if (Number.isFinite(messageTime)) {
			if (new Date(epoch.$createdAt || epoch.createdAt || 0).getTime() > messageTime) continue;
		}
		const key = await unwrapKeyMapping(await fetchKeyMapping("epoch", epoch.$id, userId), epoch.createdBy || userId);
		if (key) return key;
	}
	return null;
}
async function resolveConversationKey(conversation, userId, messageCreatedAt, auth, repairAttempted = false) {
	if (!conversation?.$id || !userId) return null;
	if (ecosystemSecurity.status.isUnlocked && !ecosystemSecurity.status.hasIdentity) try {
		await ecosystemSecurity.ensureE2EIdentity(userId);
	} catch (error) {
		console.warn("[ChatService] Failed to initialize E2E identity before key resolution:", error);
		return null;
	}
	const cached = conversationKeyCache.get(conversation.$id);
	if (cached && !messageCreatedAt) return cached;
	if (conversation.type === "group" && String(conversation.encryptionVersion || "").toUpperCase() === "T4") {
		const epochKey = await fetchEpochKeyForConversation(conversation.$id, userId, messageCreatedAt);
		if (epochKey && !messageCreatedAt) conversationKeyCache.set(conversation.$id, epochKey);
		return epochKey;
	}
	const directKey = await fetchConversationKeyFromLockbox(conversation.$id, userId, conversation.creatorId);
	if (directKey) {
		if (!messageCreatedAt) conversationKeyCache.set(conversation.$id, directKey);
		return directKey;
	}
	if (conversation.type === "direct" && Array.isArray(conversation.participants) && conversation.participants.length > 0 && conversation.participants.every((participantId) => participantId === userId) && ecosystemSecurity.status.isUnlocked && ecosystemSecurity.status.hasIdentity) {
		const rebuiltKey = await ecosystemSecurity.generateConversationKey();
		const publicKey = await ecosystemSecurity.ensureE2EIdentity(userId);
		if (!publicKey) return null;
		ecosystemSecurity.setConversationKey(conversation.$id, rebuiltKey);
		conversationKeyCache.set(conversation.$id, rebuiltKey);
		await syncLockboxRows([{
			resourceType: "chat",
			resourceId: conversation.$id,
			grantee: userId,
			wrappedKey: await ecosystemSecurity.wrapKeyWithECDH(rebuiltKey, publicKey),
			metadata: buildLockboxMetadata({
				wrappedBy: userId,
				wrappedByPublicKey: publicKey,
				conversationId: conversation.$id,
				conversationType: "direct",
				version: "t4",
				repaired: true
			})
		}]);
		return rebuiltKey;
	}
	if (!repairAttempted) try {
		if ((await callConversationRepairApi({
			userId,
			conversationId: conversation.$id
		}, auth))?.identity) seedIdentityCache(await UsersService.getProfileById(userId, true));
		conversationKeyCache.delete(conversation.$id);
		ecosystemSecurity.clearConversationKey(conversation.$id);
		return await resolveConversationKey(conversation, userId, messageCreatedAt, auth, true);
	} catch (error) {
		console.warn("[ChatService] Conversation repair failed:", error);
	}
	return null;
}
async function syncLockboxRows(entries, auth) {
	if (!entries.length) return [];
	return callPermissionsApi("POST", {
		action: "grant",
		keyMappings: entries
	}, auth);
}
async function syncConversationAccess(conversationId, participantIds, permission = "read", ownerId) {
	const targets = Array.from(new Set(participantIds.filter(Boolean)));
	if (!conversationId || targets.length === 0) return;
	return callPermissionsApi("POST", {
		databaseId: APPWRITE_CONFIG.DATABASES.CHAT,
		tableId: CONV_TABLE,
		rowId: conversationId,
		targetUserIds: targets,
		permission,
		ownerId,
		action: "grant"
	});
}
async function syncConversationAvatarAccess(avatarFileId, participantIds, auth) {
	if (!avatarFileId) return null;
	const targets = uniqueIds(participantIds);
	if (targets.length === 0) return null;
	return callPermissionsApi("POST", {
		storageBucketId: APPWRITE_CONFIG.BUCKETS.GROUP_AVATARS,
		fileId: avatarFileId,
		targetUserIds: targets,
		permission: "read",
		action: "grant"
	}, auth);
}
async function revokeConversationAvatarAccess(avatarFileId, participantIds, auth) {
	if (!avatarFileId) return null;
	const targets = uniqueIds(participantIds);
	if (targets.length === 0) return null;
	return callPermissionsApi("DELETE", {
		storageBucketId: APPWRITE_CONFIG.BUCKETS.GROUP_AVATARS,
		fileId: avatarFileId,
		targetUserIds: targets,
		permission: "read",
		action: "revoke"
	}, auth);
}
var ChatService = {
	async _unwrapConversationKey(conv, myUserId) {
		const key = await resolveConversationKey(conv, myUserId);
		if (key) conversationKeyCache.set(conv.$id, key);
		return key;
	},
	getConversationPreviewSnapshot(conversationId) {
		return getConversationPreviewCache(conversationId);
	},
	rememberConversationPreview(conversationId, preview) {
		setConversationPreviewCache(conversationId, preview);
	},
	clearConversationPreviewCache(conversationId) {
		if (conversationId) {
			conversationPreviewCache.delete(conversationId);
			return;
		}
		conversationPreviewCache.clear();
	},
	async rewrapConversationKeys(conversationId, auth) {
		if (!conversationId) return null;
		const repairResult = await callConversationRepairApi({ conversationId }, auth);
		conversationKeyCache.delete(conversationId);
		ecosystemSecurity.clearConversationKey(conversationId);
		return repairResult;
	},
	async getConversationById(conversationId, userId) {
		const normalizedConversation = await normalizeConversationRow(await tablesDB.getRow(DB_ID, CONV_TABLE, conversationId));
		const hydrated = await this._hydrateConversationParticipants(normalizedConversation);
		return await this._decryptConversation(hydrated, userId);
	},
	async _hydrateConversationParticipants(conversation) {
		if (!conversation?.$id) return conversation;
		if ((Array.isArray(conversation.participants) ? conversation.participants.filter(Boolean) : []).length > 0) return conversation;
		try {
			const memberRows = await tablesDB.listRows(DB_ID, CONV_MEMBERS_TABLE, [Query.equal("conversationId", conversation.$id), Query.limit(1e3)]);
			const participants = Array.from(new Set(memberRows.rows.map((row) => row.userId).filter(Boolean)));
			if (!participants.length) return conversation;
			return {
				...conversation,
				participants
			};
		} catch (_e) {
			return conversation;
		}
	},
	async _decryptConversation(conv, userId) {
		if (!conv.isEncrypted || !ecosystemSecurity.status.isUnlocked) return conv;
		let convKey = null;
		try {
			if (userId) convKey = await resolveConversationKey(conv, userId);
			else convKey = conversationKeyCache.get(conv.$id) || ecosystemSecurity.getConversationKey(conv.$id);
		} catch (error) {
			console.warn("[ChatService] Failed to resolve conversation key:", error);
			return conv;
		}
		if (!convKey) return conv;
		if (conv.name && conv.name.length > 40) try {
			conv.name = await ecosystemSecurity.decryptWithKey(conv.name, convKey);
		} catch (error) {
			console.warn("[ChatService] Failed to decrypt conversation name, keeping plaintext:", error);
		}
		if (conv.lastMessageText && conv.lastMessageText.length > 40) try {
			conv.lastMessageText = await ecosystemSecurity.decryptWithKey(conv.lastMessageText, convKey);
		} catch (error) {
			console.warn("[ChatService] Failed to decrypt conversation preview, keeping plaintext:", error);
		}
		return conv;
	},
	async getConversations(userId) {
		console.log("[ChatService] getConversations for:", userId);
		const memberRows = await tablesDB.listRows(DB_ID, CONV_MEMBERS_TABLE, [Query.equal("userId", userId), Query.limit(1e3)]).catch(() => ({ rows: [] }));
		const conversationIds = Array.from(new Set((memberRows.rows || []).map((row) => row.conversationId).filter(Boolean)));
		let conversationRows = [];
		let memberRowsByConversation = /* @__PURE__ */ new Map();
		if (conversationIds.length > 0) {
			conversationRows = (await tablesDB.listRows(DB_ID, CONV_TABLE, [Query.equal("$id", conversationIds), Query.limit(conversationIds.length)]).catch(() => ({ rows: [] }))).rows || [];
			const allMembers = await tablesDB.listRows(DB_ID, CONV_MEMBERS_TABLE, [Query.equal("conversationId", conversationIds), Query.limit(Math.min(1e3, conversationIds.length * 10))]).catch(() => ({ rows: [] }));
			memberRowsByConversation = /* @__PURE__ */ new Map();
			for (const row of allMembers.rows || []) {
				if (!row?.conversationId || !row?.userId) continue;
				const existing = memberRowsByConversation.get(row.conversationId) || [];
				if (!existing.includes(row.userId)) existing.push(row.userId);
				memberRowsByConversation.set(row.conversationId, existing);
			}
		} else {
			conversationRows = (await tablesDB.listRows(DB_ID, CONV_TABLE, [Query.contains("participants", userId), Query.limit(100)]).catch(() => ({ rows: [] }))).rows || [];
			for (const conversation of conversationRows) {
				const participants = Array.isArray(conversation.participants) ? conversation.participants.filter(Boolean) : [];
				if (participants.length) memberRowsByConversation.set(conversation.$id, participants);
			}
		}
		const previewConversationIds = conversationIds.length > 0 ? conversationIds : conversationRows.map((conversation) => conversation.$id).filter(Boolean);
		const needsPreviewHydration = conversationRows.some((conversation) => !conversation.lastMessageAt || !conversation.lastMessageText);
		const latestMessageByConversation = /* @__PURE__ */ new Map();
		if (needsPreviewHydration && previewConversationIds.length > 0) {
			const recentMessagesResult = await tablesDB.listRows(DB_ID, MSG_TABLE, [
				Query.equal("conversationId", previewConversationIds),
				Query.orderDesc("createdAt"),
				Query.limit(Math.min(1e3, previewConversationIds.length * 20))
			]).catch(() => ({ rows: [] }));
			for (const message of recentMessagesResult.rows || []) if (message?.conversationId && !latestMessageByConversation.has(message.conversationId)) latestMessageByConversation.set(message.conversationId, message);
		}
		const rows = await Promise.all(conversationRows.map(async (conversation) => {
			const participants = memberRowsByConversation.get(conversation.$id) || conversation.participants || [];
			const normalizedConversation = {
				...conversation,
				participants: Array.from(new Set((participants || []).filter(Boolean)))
			};
			const cachedPreview = getConversationPreviewCache(conversation.$id);
			const latestMessage = latestMessageByConversation.get(conversation.$id);
			const hydratedConversation = latestMessage ? {
				...normalizedConversation,
				lastMessageAt: getMessageActivityAt(latestMessage) || normalizedConversation.lastMessageAt,
				lastMessageText: await getMessagePreview(latestMessage, conversation.$id)
			} : normalizedConversation;
			const hydratedAt = new Date(getConversationActivityAt(hydratedConversation) || 0).getTime();
			const cachedAt = cachedPreview ? new Date(cachedPreview.lastMessageAt || 0).getTime() : -1;
			const withCache = cachedPreview && (cachedAt >= hydratedAt || !hydratedConversation.lastMessageText) ? {
				...hydratedConversation,
				...cachedPreview
			} : hydratedConversation;
			return this._decryptConversation(withCache, userId);
		}));
		rows.sort((a, b) => {
			const timeA = new Date(getConversationActivityAt(a) || 0).getTime();
			return new Date(getConversationActivityAt(b) || 0).getTime() - timeA;
		});
		return {
			total: rows.length,
			rows
		};
	},
	async createConversation(participants, type = "direct", name) {
		if (!ecosystemSecurity.status.isUnlocked) throw new Error("Vault must be unlocked before creating conversations");
		if (!ecosystemSecurity.status.hasIdentity) throw new Error("E2E identity must be initialized before creating conversations");
		const creatorId = participants[0];
		const uniqueParticipants = type === "direct" && participants.length === 1 && participants[0] === participants[participants.length - 1] ? [participants[0], participants[0]] : Array.from(new Set(participants));
		if (type === "direct") {
			const creatorMemberships = await tablesDB.listRows(DB_ID, CONV_MEMBERS_TABLE, [Query.equal("userId", creatorId), Query.limit(1e3)]).catch(() => ({ rows: [] }));
			const candidateConversationIds = Array.from(new Set((creatorMemberships.rows || []).map((row) => row.conversationId).filter(Boolean)));
			if (candidateConversationIds.length > 0) {
				const candidateRows = (await tablesDB.listRows(DB_ID, CONV_TABLE, [
					Query.equal("$id", candidateConversationIds),
					Query.equal("type", "direct"),
					Query.limit(candidateConversationIds.length)
				]).catch(() => ({ rows: [] }))).rows || [];
				if (candidateRows.length > 0) {
					const membershipRows = await tablesDB.listRows(DB_ID, CONV_MEMBERS_TABLE, [Query.equal("conversationId", candidateConversationIds), Query.limit(Math.min(1e3, candidateConversationIds.length * 10))]).catch(() => ({ rows: [] }));
					const participantsByConversation = /* @__PURE__ */ new Map();
					for (const row of membershipRows.rows || []) {
						if (!row?.conversationId || !row?.userId) continue;
						const current = participantsByConversation.get(row.conversationId) || [];
						if (!current.includes(row.userId)) current.push(row.userId);
						participantsByConversation.set(row.conversationId, current);
					}
					const targetParticipantSet = canonicalizeParticipantsForMatch(uniqueParticipants);
					for (const conversation of candidateRows) if (arraysEqual(canonicalizeParticipantsForMatch(participantsByConversation.get(conversation.$id) || []), targetParticipantSet)) {
						console.log("[ChatService] Direct chat already exists, returning existing:", conversation.$id);
						return conversation;
					}
				}
			}
		}
		let convKey = null;
		if (ecosystemSecurity.status.isUnlocked && ecosystemSecurity.status.hasIdentity) convKey = await ecosystemSecurity.generateConversationKey();
		let encryptedName = name;
		if (name && convKey && ecosystemSecurity.status.isUnlocked) encryptedName = await ecosystemSecurity.encryptWithKey(name, convKey);
		const conversationPermissions = buildConversationMemberPermissions(uniqueParticipants, creatorId);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const newConv = await tablesDB.createRow(DB_ID, CONV_TABLE, ID.unique(), {
			participants: uniqueParticipants,
			participantCount: uniqueParticipants.length,
			type: type || "direct",
			name: encryptedName || "Direct Chat",
			inviteMeta: null,
			inviteLink: null,
			inviteLinkExpiry: null,
			creatorId,
			admins: type === "group" ? [creatorId] : uniqueParticipants,
			isPinned: [],
			isMuted: [],
			isArchived: [],
			tags: [],
			isEncrypted: !!convKey,
			encryptionVersion: convKey ? "T4" : "1.0",
			createdAt: now,
			updatedAt: now
		}, conversationPermissions);
		const memberRows = await Promise.all(uniqueParticipants.map((participantId) => tablesDB.createRow(DB_ID, CONV_MEMBERS_TABLE, ID.unique(), {
			conversationId: newConv.$id,
			userId: participantId
		}, buildConversationMemberPermissions(uniqueParticipants, creatorId)).catch(() => null)));
		await Promise.all(memberRows.filter(Boolean).map((memberRow) => callPermissionsApi("POST", {
			databaseId: APPWRITE_CONFIG.DATABASES.CHAT,
			tableId: CONV_MEMBERS_TABLE,
			rowId: memberRow.$id,
			ownerId: creatorId,
			targetUserIds: uniqueParticipants,
			permission: "read",
			action: "grant"
		}).catch((error) => {
			console.error("[ChatService] Failed to grant conversation member access:", error);
			throw error;
		})));
		if (convKey) {
			ecosystemSecurity.setConversationKey(newConv.$id, convKey);
			conversationKeyCache.set(newConv.$id, convKey);
			try {
				const creatorPublicKey = ecosystemSecurity.status.hasIdentity ? await ecosystemSecurity.ensureE2EIdentity(creatorId) : null;
				if (creatorPublicKey) {
					const directLockboxRows = await Promise.all(uniqueParticipants.map(async (participantId) => {
						const profile = await UsersService.getProfileById(participantId);
						if (!profile?.publicKey) return null;
						return {
							resourceType: "chat",
							resourceId: newConv.$id,
							grantee: participantId,
							wrappedKey: await ecosystemSecurity.wrapKeyWithECDH(convKey, profile.publicKey),
							metadata: buildLockboxMetadata({
								wrappedBy: creatorId,
								wrappedByPublicKey: creatorPublicKey,
								conversationId: newConv.$id,
								conversationType: type,
								version: "t4"
							})
						};
					})).then((rows) => rows.filter(Boolean));
					if (type === "group") await callPermissionsApi("POST", {
						action: "rotate_epoch",
						resourceId: newConv.$id,
						ownerId: creatorId,
						participantUserIds: uniqueParticipants,
						epochNumber: 1,
						keyMappings: directLockboxRows.map((entry) => ({
							...entry,
							resourceType: "epoch",
							resourceId: newConv.$id
						}))
					});
					else if (directLockboxRows.length > 0) await syncLockboxRows(directLockboxRows);
					const recipientIds = uniqueParticipants.filter((id) => id !== creatorId);
					if (recipientIds.length > 0) await syncConversationAccess(newConv.$id, recipientIds, type === "direct" ? "write" : "read", creatorId);
				}
			} catch (lockboxErr) {
				console.error("[ChatService] Failed to persist lockbox rows:", lockboxErr);
			}
		}
		return newConv;
	},
	async sendMessage(conversationId, senderId, content, type = "text", attachments = [], replyTo, metadata, permissionSyncAuth) {
		let conversation = null;
		let finalContent = content;
		try {
			const rawConversation = await tablesDB.getRow(DB_ID, CONV_TABLE, conversationId);
			conversation = await this._hydrateConversationParticipants(await normalizeConversationRow(rawConversation));
		} catch (_e) {
			conversation = null;
		}
		if (conversation?.participants?.length && !conversation.participants.includes(senderId)) throw new Error("You are not a participant in this conversation");
		if ((type === "text" || type === "attachment") && ecosystemSecurity.status.isUnlocked) {
			const convKey = conversation ? await resolveConversationKey(conversation, senderId, null, permissionSyncAuth) : null;
			if (!convKey) throw new Error("Conversation key not available");
			finalContent = await ecosystemSecurity.encryptWithKey(content, convKey);
		}
		const message = await callMessageCreateApi({
			conversationId,
			senderId,
			content: finalContent,
			type,
			attachments,
			replyTo
		}, permissionSyncAuth);
		if (type === "text") notifyMessageStreak(conversation, senderId, conversationId).catch((error) => {
			console.error("[ChatService] Failed to queue message streak email", error);
		});
		if (conversation?.creatorId === senderId) try {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			await tablesDB.updateRow(DB_ID, CONV_TABLE, conversationId, {
				lastMessageId: message.$id,
				lastMessageAt: now,
				lastMessageText: type === "text" ? finalContent : `[${type}]`
			});
		} catch (_e) {
			console.warn("[ChatService] Conversation preview update skipped");
		}
		setConversationPreviewCache(conversationId, {
			lastMessageId: message.$id,
			lastMessageText: type === "text" || type === "attachment" ? content : `[${type}]`,
			lastMessageAt: message.$createdAt || message.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
			lastMessageSenderId: senderId
		});
		if (ecosystemSecurity.status.isUnlocked && conversation?.creatorId === senderId) this.rewrapConversationKeys(conversationId, permissionSyncAuth).catch((err) => console.warn("[ChatService] Background re-wrap failed:", err));
		return message;
	},
	async reactToMessage(conversationId, messageId, emoji, permissionSyncAuth) {
		return callMessageReactionApi("POST", {
			conversationId,
			messageId,
			emoji
		}, permissionSyncAuth);
	},
	async removeMessageReaction(conversationId, messageId, emoji, permissionSyncAuth) {
		return callMessageReactionApi("DELETE", {
			conversationId,
			messageId,
			emoji
		}, permissionSyncAuth);
	},
	async getMessages(conversationId, limit = 50, offset = 0, userId) {
		const _conv = await this.getConversationById(conversationId, userId);
		const convKey = userId ? await resolveConversationKey(_conv, userId) : conversationKeyCache.get(conversationId) || ecosystemSecurity.getConversationKey(conversationId);
		const res = await tablesDB.listRows(DB_ID, MSG_TABLE, [
			Query.equal("conversationId", conversationId),
			Query.orderDesc("createdAt"),
			Query.limit(limit),
			Query.offset(offset)
		]);
		res.rows = await Promise.all(res.rows.map(async (msg) => {
			if (ecosystemSecurity.status.isUnlocked && (msg.type === "text" && msg.content && msg.content.length > 40 || msg.metadata && msg.metadata.length > 40)) {
				let messageKey = _conv?.type === "group" && String(_conv?.encryptionVersion || "").toUpperCase() === "T4" && userId ? await resolveConversationKey(_conv, userId, msg.createdAt) : convKey;
				if (!messageKey && userId) {
					await UsersService.forceSyncProfileWithIdentity({ $id: userId });
					messageKey = _conv?.type === "group" && String(_conv?.encryptionVersion || "").toUpperCase() === "T4" ? await resolveConversationKey(_conv, userId, msg.createdAt) : await resolveConversationKey(_conv, userId);
				}
				if (!messageKey) return msg;
				if (msg.type === "text" && msg.content && msg.content.length > 40) msg.content = await ecosystemSecurity.decryptWithKey(msg.content, messageKey);
				if (msg.metadata && msg.metadata.length > 40) {
					const decryptedMeta = await ecosystemSecurity.decryptWithKey(msg.metadata, messageKey);
					try {
						msg.metadata = JSON.parse(decryptedMeta);
					} catch {
						msg.metadata = decryptedMeta;
					}
				}
			}
			return msg;
		}));
		const latestMessage = res.rows[0];
		if (latestMessage) setConversationPreviewCache(conversationId, {
			lastMessageId: latestMessage.$id,
			lastMessageText: latestMessage.type === "text" || latestMessage.type === "attachment" ? String(latestMessage.content || "") : `[${latestMessage.type || "message"}]`,
			lastMessageAt: getMessageActivityAt(latestMessage) || latestMessage.$createdAt || latestMessage.$updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
			lastMessageSenderId: latestMessage.senderId || null
		});
		return res;
	},
	async wipeMyFootprint(conversationId, userId) {
		console.log(`[ChatService] Wiping footprint for ${userId} in ${conversationId}`);
		const res = await tablesDB.listRows(DB_ID, MSG_TABLE, [
			Query.equal("conversationId", conversationId),
			Query.equal("senderId", userId),
			Query.limit(1e3)
		]);
		const batches = [];
		for (let i = 0; i < res.rows.length; i += 10) {
			const batch = res.rows.slice(i, i + 10).map((msg) => tablesDB.deleteRow(DB_ID, MSG_TABLE, msg.$id));
			batches.push(Promise.all(batch));
		}
		await Promise.all(batches);
		return {
			success: true,
			count: res.total
		};
	},
	async clearChatForMe(conversationId, userId) {
		const conv = await tablesDB.getRow(DB_ID, CONV_TABLE, conversationId);
		let settings = {};
		try {
			if (conv.settings) {
				const decryptedSettings = await ecosystemSecurity.decrypt(conv.settings);
				settings = JSON.parse(decryptedSettings);
			}
		} catch (_e) {}
		if (!settings.clearedAt) settings.clearedAt = {};
		settings.clearedAt[userId] = (/* @__PURE__ */ new Date()).toISOString();
		const encryptedSettings = await ecosystemSecurity.encrypt(JSON.stringify(settings));
		return await tablesDB.updateRow(DB_ID, CONV_TABLE, conversationId, { settings: encryptedSettings });
	},
	async nuclearWipe(conversationId) {
		const res = await tablesDB.listRows(DB_ID, MSG_TABLE, [Query.equal("conversationId", conversationId), Query.limit(1e3)]);
		const batches = [];
		for (let i = 0; i < res.rows.length; i += 10) {
			const batch = res.rows.slice(i, i + 10).map((msg) => tablesDB.deleteRow(DB_ID, MSG_TABLE, msg.$id));
			batches.push(Promise.all(batch));
		}
		await Promise.all(batches);
		return { success: true };
	},
	async deleteConversationFully(conversationId) {
		const conversation = await this.getConversationById(conversationId).catch(() => null);
		const deleteAllRows = async (dbId, tableId, query) => {
			const rows = await tablesDB.listRows(dbId, tableId, query).catch(() => ({ rows: [] }));
			const batches = [];
			for (let i = 0; i < (rows.rows || []).length; i += 10) {
				const batch = rows.rows.slice(i, i + 10).map((row) => tablesDB.deleteRow(dbId, tableId, row.$id));
				batches.push(Promise.all(batch));
			}
			await Promise.all(batches);
		};
		await this.nuclearWipe(conversationId);
		await deleteAllRows(DB_ID, CONV_MEMBERS_TABLE, [Query.equal("conversationId", conversationId), Query.limit(1e3)]);
		await deleteAllRows(DB_ID, EPOCHS_TABLE, [Query.equal("resourceId", conversationId), Query.limit(1e3)]);
		await deleteAllRows(KEY_MAPPING_DB, KEY_MAPPING_TABLE, [Query.equal("resourceId", conversationId), Query.limit(1e3)]);
		await tablesDB.deleteRow(DB_ID, CONV_TABLE, conversationId);
		conversationKeyCache.delete(conversationId);
		return {
			success: true,
			conversation
		};
	},
	async updateConversation(conversationId, data) {
		const current = await this.getConversationById(conversationId).catch(() => null);
		const patch = { ...data };
		if (Array.isArray(patch.participants)) {
			patch.participants = uniqueIds(patch.participants);
			patch.participantCount = patch.participants.length;
		}
		const nextInviteLink = Object.prototype.hasOwnProperty.call(patch, "inviteLink") ? patch.inviteLink : current?.inviteLink;
		if (Boolean(nextInviteLink && nextInviteLink === conversationId) && !Object.prototype.hasOwnProperty.call(patch, "inviteMeta")) patch.inviteMeta = buildInviteMeta(current, patch);
		if (Object.prototype.hasOwnProperty.call(patch, "avatarUrl") || Object.prototype.hasOwnProperty.call(patch, "avatarFileId")) {
			patch.avatarUrl = typeof patch.avatarUrl === "string" ? patch.avatarUrl : patch.avatarUrl ?? null;
			patch.avatarFileId = typeof patch.avatarFileId === "string" ? patch.avatarFileId : patch.avatarFileId ?? null;
		}
		return await tablesDB.updateRow(DB_ID, CONV_TABLE, conversationId, patch);
	},
	async addParticipant(conversationId, userId) {
		const conv = await this.getConversationById(conversationId);
		const participants = conv.participants || [];
		const requiresRotation = conv?.type === "group" && String(conv?.encryptionVersion || "").toUpperCase() === "T4";
		if (requiresRotation && (!ecosystemSecurity.status.isUnlocked || !ecosystemSecurity.status.hasIdentity)) throw new Error("Security vault is locked; cannot rotate group epoch");
		if (!participants.includes(userId)) {
			if (!(await tablesDB.listRows(DB_ID, CONV_MEMBERS_TABLE, [
				Query.equal("conversationId", conversationId),
				Query.equal("userId", userId),
				Query.limit(1)
			]).catch(() => ({ rows: [] }))).rows.length) {
				const memberRow = await tablesDB.createRow(DB_ID, CONV_MEMBERS_TABLE, ID.unique(), {
					conversationId,
					userId
				}, buildConversationMemberPermissions([...participants, userId], conv.creatorId || participants[0] || userId)).catch(() => null);
				if (memberRow?.$id) await callPermissionsApi("POST", {
					databaseId: APPWRITE_CONFIG.DATABASES.CHAT,
					tableId: CONV_MEMBERS_TABLE,
					rowId: memberRow.$id,
					ownerId: conv.creatorId || participants[0] || userId,
					targetUserIds: [...participants, userId],
					permission: "read",
					action: "grant"
				});
			}
			const updatedParticipants = await getConversationMemberSnapshot(conversationId, [...participants, userId]);
			const updated = await this.updateConversation(conversationId, { participants: updatedParticipants });
			await syncConversationAccess(conversationId, [userId], conv.type === "direct" ? "write" : "read", conv.creatorId || participants[0] || userId);
			await syncConversationAvatarAccess(conv.avatarFileId || null, updatedParticipants);
			if (requiresRotation && ecosystemSecurity.status.isUnlocked && ecosystemSecurity.status.hasIdentity) {
				const nextKey = await ecosystemSecurity.generateConversationKey();
				ecosystemSecurity.setConversationKey(conversationId, nextKey);
				conversationKeyCache.set(conversationId, nextKey);
				const epochsRes = await tablesDB.listRows(DB_ID, EPOCHS_TABLE, [
					Query.equal("resourceId", conversationId),
					Query.orderDesc("epochNumber"),
					Query.limit(1)
				]).catch(() => ({ rows: [] }));
				const nextEpochNumber = Number(epochsRes.rows?.[0]?.epochNumber || 0) + 1;
				const creatorPublicKey = (await UsersService.getProfileById(conv.creatorId))?.publicKey || null;
				if (!creatorPublicKey) throw new Error("Creator public key missing; cannot rotate group key");
				const keyMappings = [];
				for (const participantId of updatedParticipants) {
					const profile = await UsersService.getProfileById(participantId);
					if (!profile?.publicKey) throw new Error(`Missing public key for member ${participantId}`);
					keyMappings.push({
						resourceType: "epoch",
						resourceId: conversationId,
						grantee: participantId,
						wrappedKey: await ecosystemSecurity.wrapKeyWithECDH(nextKey, profile.publicKey),
						metadata: buildLockboxMetadata({
							wrappedBy: conv.creatorId,
							wrappedByPublicKey: creatorPublicKey,
							conversationId,
							conversationType: "group",
							version: "t4",
							rotation: "member-added"
						})
					});
				}
				await callPermissionsApi("POST", {
					action: "rotate_epoch",
					resourceId: conversationId,
					ownerId: conv.creatorId || participants[0] || userId,
					participantUserIds: updatedParticipants,
					epochNumber: nextEpochNumber,
					keyMappings
				});
			}
			return updated;
		}
		return conv;
	},
	async removeParticipant(conversationId, userId) {
		const conv = await this.getConversationById(conversationId);
		if (conv?.type === "group" && String(conv?.encryptionVersion || "").toUpperCase() === "T4" && (!ecosystemSecurity.status.isUnlocked || !ecosystemSecurity.status.hasIdentity)) throw new Error("Security vault is locked; cannot rotate group epoch");
		const participants = (conv.participants || []).filter((id) => id !== userId);
		const admins = (conv.admins || []).filter((id) => id !== userId);
		const memberRows = await tablesDB.listRows(DB_ID, CONV_MEMBERS_TABLE, [
			Query.equal("conversationId", conversationId),
			Query.equal("userId", userId),
			Query.limit(1)
		]).catch(() => ({ rows: [] }));
		if (memberRows.rows[0]?.$id) await tablesDB.deleteRow(DB_ID, CONV_MEMBERS_TABLE, memberRows.rows[0].$id).catch(() => null);
		const updatedParticipants = await getConversationMemberSnapshot(conversationId, participants);
		const updated = await this.updateConversation(conversationId, {
			participants: updatedParticipants,
			admins
		});
		await revokeConversationAvatarAccess(conv.avatarFileId || null, [userId]);
		await callPermissionsApi("DELETE", {
			databaseId: APPWRITE_CONFIG.DATABASES.CHAT,
			tableId: CONV_TABLE,
			rowId: conversationId,
			targetUserIds: [userId],
			resourceType: "chat",
			resourceId: conversationId
		});
		if (conv?.type === "group" && String(conv?.encryptionVersion || "").toUpperCase() === "T4" && participants.length > 0 && ecosystemSecurity.status.isUnlocked && ecosystemSecurity.status.hasIdentity) {
			const newKey = await ecosystemSecurity.generateConversationKey();
			ecosystemSecurity.setConversationKey(conversationId, newKey);
			conversationKeyCache.set(conversationId, newKey);
			const creatorPublicKey = (await UsersService.getProfileById(conv.creatorId))?.publicKey || null;
			if (creatorPublicKey) {
				const keyMappings = [];
				for (const participantId of participants) {
					const profile = await UsersService.getProfileById(participantId);
					if (!profile?.publicKey) continue;
					keyMappings.push({
						resourceType: "epoch",
						resourceId: conversationId,
						grantee: participantId,
						wrappedKey: await ecosystemSecurity.wrapKeyWithECDH(newKey, profile.publicKey),
						metadata: buildLockboxMetadata({
							wrappedBy: conv.creatorId,
							wrappedByPublicKey: creatorPublicKey,
							conversationId,
							conversationType: "group",
							version: "t4",
							rotation: "member-removal"
						})
					});
				}
				if (keyMappings.length > 0) await callPermissionsApi("POST", {
					action: "rotate_epoch",
					resourceId: conversationId,
					participantUserIds: participants,
					keyMappings
				});
			}
		}
		return updated;
	},
	async getJoinRequests(conversationId) {
		const { rows } = await tablesDB.listRows(DB_ID, APPWRITE_CONFIG.TABLES.CHAT.JOIN_REQUESTS, [
			Query.equal("resourceType", "chat.conversation"),
			Query.equal("resourceId", conversationId),
			Query.equal("status", "pending"),
			Query.limit(1e3)
		]);
		return rows;
	},
	async updateConversationInvite(conversationId, enabled) {
		return await this.updateConversation(conversationId, {
			inviteLink: enabled ? conversationId : null,
			inviteLinkExpiry: null
		});
	},
	async updateConversationAvatar(conversationId, file, auth) {
		const current = await this.getConversationById(conversationId);
		const existingParticipants = uniqueIds([
			...Array.isArray(current?.participants) ? current.participants : [],
			current?.creatorId,
			...Array.isArray(current?.admins) ? current.admins : []
		]);
		const uploaded = await storage.createFile(APPWRITE_CONFIG.BUCKETS.GROUP_AVATARS, ID.unique(), file);
		try {
			await syncConversationAvatarAccess(uploaded.$id, existingParticipants, auth);
			return await this.updateConversation(conversationId, {
				avatarFileId: uploaded.$id,
				avatarUrl: buildGroupAvatarUrl(conversationId)
			});
		} catch (error) {
			await storage.deleteFile(APPWRITE_CONFIG.BUCKETS.GROUP_AVATARS, uploaded.$id).catch(() => null);
			throw error;
		}
	},
	async resolveJoinRequest(resourceType, resourceId, requesterId, action) {
		return callJoinRequestApi("PATCH", {
			resourceType,
			resourceId,
			requesterId,
			action
		});
	},
	async cancelJoinRequest(resourceType, resourceId) {
		return callJoinRequestApi("DELETE", {
			resourceType,
			resourceId
		});
	},
	async deleteMessage(messageId) {
		return await tablesDB.deleteRow(DB_ID, MSG_TABLE, messageId);
	},
	async updateMessage(messageId, data) {
		return await tablesDB.updateRow(DB_ID, MSG_TABLE, messageId, { ...data });
	},
	async markAsRead(messageId, userId) {
		try {
			const message = await tablesDB.getRow(DB_ID, MSG_TABLE, messageId);
			const readBy = message.readBy || [];
			if (!readBy.includes(userId)) return await tablesDB.updateRow(DB_ID, MSG_TABLE, messageId, { readBy: [...readBy, userId] });
			return message;
		} catch (error) {
			console.error("Failed to mark message as read:", error);
			return null;
		}
	},
	async markConversationAsRead(conversationId, userId) {
		const unreadMessages = await tablesDB.listRows(DB_ID, MSG_TABLE, [
			Query.equal("conversationId", conversationId),
			Query.notContains("readBy", userId),
			Query.limit(100)
		]);
		return Promise.all(unreadMessages.rows.map((msg) => this.markAsRead(msg.$id, userId)));
	}
};
//#endregion
export { useParams$1 as a, useSearchParams as c, useAuth as i, Image as n, usePathname as o, sendKylrixEmailNotification as r, useRouter as s, ChatService as t };
