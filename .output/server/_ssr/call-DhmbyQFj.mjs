import { a as Permission, c as Role, i as ID, o as Query } from "../_libs/appwrite.mjs";
import { d as tablesDB, n as account, t as APPWRITE_CONFIG } from "./client-bVtyOxJQ.mjs";
import { a as getEcosystemUrl } from "./users-vRrLGFai.mjs";
import { r as sendKylrixEmailNotification } from "./chat-GLmU6cBO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calls-DFqomEdZ.js
function normalizeCallParticipants(participants = []) {
	return Array.from(new Set(participants.map((participant) => String(participant || "").trim()).filter(Boolean)));
}
function createCallMetadata(input) {
	return JSON.stringify({
		...input,
		participantIds: normalizeCallParticipants(input.participantIds || []),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
}
function parseCallMetadata(raw) {
	if (!raw) return {
		scope: "link",
		hostId: "",
		participantIds: []
	};
	if (typeof raw === "object") return raw;
	if (typeof raw !== "string") return {
		scope: "link",
		hostId: "",
		participantIds: []
	};
	try {
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : {
			scope: "link",
			hostId: "",
			participantIds: []
		};
	} catch {
		return {
			scope: "link",
			hostId: "",
			participantIds: []
		};
	}
}
function isCallActive(call, now = Date.now()) {
	const metadata = parseCallMetadata(call.metadata);
	const startsAt = call.startsAt || metadata.startsAt || null;
	const expiresAt = call.expiresAt || metadata.expiresAt || null;
	if (startsAt) {
		const startTime = new Date(startsAt).getTime();
		if (!Number.isNaN(startTime) && now < startTime) return false;
	}
	if (expiresAt) {
		const endTime = new Date(expiresAt).getTime();
		if (!Number.isNaN(endTime) && now > endTime) return false;
	}
	return true;
}
function buildCallJoinUrl(baseUrl, callId, params = {}) {
	const url = new URL(`/call/${callId}`, baseUrl);
	for (const [key, value] of Object.entries(params)) {
		if (value === null || value === void 0 || value === "") continue;
		url.searchParams.set(key, String(value));
	}
	return url.toString();
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/call-DhmbyQFj.js
var DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
var LINKS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.CALL_LINKS;
var ACTIVITY_TABLE = APPWRITE_CONFIG.TABLES.CHAT.APP_ACTIVITY;
var CallService = {
	async createAnonymousSession() {
		try {
			return await account.createAnonymousSession();
		} catch (_e) {
			console.error("Failed to create anonymous session");
			throw _e;
		}
	},
	async createCallLink(userId, type = "video", conversationId, title, startsAt, durationMinutes = 120, context = {}) {
		try {
			const startTime = startsAt ? new Date(startsAt) : null;
			const expiresAt = new Date((startTime?.getTime() || Date.now()) + durationMinutes * 60 * 1e3).toISOString();
			const scope = context.scope || (conversationId ? "direct" : "link");
			const participantIds = context.participantIds || [];
			const payload = {
				userId,
				type,
				expiresAt,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				receiverId: context.participantIds?.find((id) => id !== userId) || null,
				conversationId: conversationId || null,
				metadata: createCallMetadata({
					scope,
					hostId: userId,
					title: title || void 0,
					sourceApp: context.sourceApp || "connect",
					conversationId,
					noteId: context.noteId,
					huddleId: context.huddleId,
					participantIds,
					isPrivate: context.isPrivate ?? false,
					allowGuests: context.allowGuests ?? true,
					startsAt: startTime?.toISOString() || null,
					expiresAt
				})
			};
			if (startTime) payload.startsAt = startTime.toISOString();
			if (title) payload.title = title;
			console.log("[CallService] Creating call in new table with payload:", payload);
			return await tablesDB.createRow(DB_ID, LINKS_TABLE, ID.unique(), payload, [
				Permission.read(Role.any()),
				Permission.update(Role.user(userId)),
				Permission.delete(Role.user(userId))
			]);
		} catch (_e) {
			console.error("[CallService] createCallLink failed");
			throw _e;
		}
	},
	async getCallLink(id) {
		try {
			const link = await tablesDB.getRow(DB_ID, LINKS_TABLE, id);
			const now = /* @__PURE__ */ new Date();
			const meta = parseCallMetadata(link.metadata);
			const startsAt = link.startsAt ? new Date(link.startsAt) : meta.startsAt ? new Date(meta.startsAt) : new Date(link.$createdAt);
			if (now > (link.expiresAt ? new Date(link.expiresAt) : meta.expiresAt ? new Date(meta.expiresAt) : new Date(startsAt.getTime() + 10800 * 1e3))) return {
				...link,
				metadata: meta,
				isExpired: true,
				isScheduled: false
			};
			if (now < startsAt) return {
				...link,
				metadata: meta,
				isExpired: false,
				isScheduled: true
			};
			return {
				...link,
				metadata: meta,
				isExpired: false,
				isScheduled: false
			};
		} catch (_e) {
			console.error("Failed to get call link:", _e);
			return null;
		}
	},
	async getCallLinkByCode(_code) {
		return this.getCallLink(_code);
	},
	async cleanupOldCallLogs() {
		try {
			const cleanupUrl = `${getEcosystemUrl("accounts")}/api/connect/calls/cleanup`;
			const response = await fetch(cleanupUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ userId: null })
			});
			if (!response.ok) throw new Error(await response.text());
			const data = await response.json().catch(() => ({ deleted: 0 }));
			return Number(data.deleted || 0);
		} catch (_e) {
			console.error("Failed to cleanup old calls:", _e);
			return 0;
		}
	},
	_activityDocId: null,
	async sendSignal(senderId, targetId, signal) {
		const payload = JSON.stringify({
			...signal,
			sender: senderId,
			target: targetId,
			ts: Date.now()
		});
		console.log(`[CallService] Sending signal ${signal.type} from ${senderId} to ${targetId}`);
		try {
			const existing = await tablesDB.listRows(DB_ID, ACTIVITY_TABLE, [
				Query.equal("userId", senderId),
				Query.orderDesc("$updatedAt"),
				Query.limit(1)
			]);
			if (existing.total > 0) {
				const docId = existing.rows[0].$id;
				return await tablesDB.updateRow(DB_ID, ACTIVITY_TABLE, docId, {
					customStatus: payload,
					status: "online"
				});
			} else return await tablesDB.createRow(DB_ID, ACTIVITY_TABLE, ID.unique(), {
				userId: senderId,
				customStatus: payload,
				status: "online"
			});
		} catch (_e) {
			console.error("Signal dispatch failed");
			throw _e;
		}
	},
	async startCall(callerId, receiverId, conversationId, type = "video") {
		const payload = {
			userId: callerId,
			type,
			expiresAt: new Date(Date.now() + 7200 * 1e3).toISOString(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			receiverId: receiverId || null,
			conversationId: conversationId || null
		};
		if (receiverId || conversationId) payload.metadata = createCallMetadata({
			scope: conversationId || receiverId ? "direct" : "link",
			hostId: callerId,
			sourceApp: "connect",
			conversationId,
			participantIds: receiverId ? [callerId, receiverId] : [callerId],
			allowGuests: false,
			startsAt: (/* @__PURE__ */ new Date()).toISOString(),
			expiresAt: payload.expiresAt
		});
		const call = await tablesDB.createRow(DB_ID, LINKS_TABLE, ID.unique(), payload, [
			Permission.read(Role.any()),
			Permission.update(Role.user(callerId)),
			Permission.delete(Role.user(callerId))
		]);
		if (receiverId) sendKylrixEmailNotification({
			eventType: "call_started",
			sourceApp: "connect",
			actorName: callerId,
			recipientIds: [receiverId],
			resourceId: call.$id,
			resourceTitle: type === "audio" ? "Audio call" : "Video call",
			resourceType: "call",
			templateKey: `connect:call-started:${conversationId || receiverId}`,
			ctaUrl: buildCallJoinUrl(getEcosystemUrl("connect"), call.$id),
			ctaText: "Join call"
		}).catch((error) => {
			console.error("[CallService] Failed to queue call email", error);
		});
		return call;
	},
	async updateCallStatus(callId, status, _duration = 0) {
		try {
			const meta = parseCallMetadata((await tablesDB.getRow(DB_ID, LINKS_TABLE, callId)).metadata);
			return await tablesDB.updateRow(DB_ID, LINKS_TABLE, callId, {
				metadata: JSON.stringify({
					...meta,
					status
				}),
				expiresAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch (_e) {
			console.error("Failed to update call status");
		}
	},
	async cleanupCall(callId) {
		try {
			const response = await fetch(`${getEcosystemUrl("accounts")}/api/connect/calls/cleanup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ callId })
			});
			if (!response.ok) throw new Error(await response.text());
		} catch (_e) {
			console.error("Failed to cleanup call:", _e);
		}
	},
	async cleanupLink(linkId) {
		return this.cleanupCall(linkId);
	},
	async getCallHistory(userId) {
		const [asCreator, asReceiver] = await Promise.all([tablesDB.listRows(DB_ID, LINKS_TABLE, [
			Query.equal("userId", userId),
			Query.orderDesc("$createdAt"),
			Query.limit(20)
		]), tablesDB.listRows(DB_ID, LINKS_TABLE, [
			Query.equal("receiverId", userId),
			Query.orderDesc("$createdAt"),
			Query.limit(20)
		])]);
		return [...asCreator.rows, ...asReceiver.rows].map((row) => {
			const meta = parseCallMetadata(row.metadata);
			const receiverId = meta.participantIds?.find((id) => id !== row.userId) || null;
			const startsAt = row.startsAt || meta.startsAt || row.$createdAt;
			const status = meta.status || (startsAt && new Date(startsAt).getTime() > Date.now() ? "scheduled" : isCallActive(row) ? "ongoing" : "completed");
			return {
				...row,
				callerId: row.userId,
				receiverId,
				status,
				startedAt: row.startsAt || row.$createdAt,
				isLink: meta.scope === "link" || meta.scope === "note" || meta.scope === "huddle",
				metadata: meta
			};
		}).sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
	},
	async getActiveCalls(userId) {
		return (await this.getCallHistory(userId)).filter((c) => c.status === "ongoing" && new Date(c.expiresAt) > /* @__PURE__ */ new Date());
	},
	async endCall(callId) {
		return this.updateCallStatus(callId, "completed");
	},
	async getActiveParticipants(callId) {
		try {
			return (await tablesDB.listRows(DB_ID, ACTIVITY_TABLE, [Query.equal("status", "online"), Query.limit(100)])).rows.filter((row) => {
				try {
					if (!row.customStatus) return false;
					const status = JSON.parse(row.customStatus);
					return status.callId === callId || status.conversationId === callId || status.callCode === callId;
				} catch (_e) {
					return false;
				}
			});
		} catch (_e) {
			return [];
		}
	},
	async deleteCallLog(callId) {
		return this.cleanupCall(callId);
	}
};
//#endregion
export { CallService as t };
