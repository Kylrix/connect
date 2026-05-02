import { o as __toESM } from "../_runtime.mjs";
import { i as ID, o as Query } from "../_libs/appwrite.mjs";
import { c as realtime, d as tablesDB, t as APPWRITE_CONFIG, u as storage } from "./client-bVtyOxJQ.mjs";
import { n as UsersService } from "./users-vRrLGFai.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { H as useTheme, J as alpha, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { B as Box, E as Drawer, H as Avatar, J as IconButton, K as Typography, Y as CircularProgress, s as Stack, t as useMediaQuery, z as Button } from "../_libs/@mui/material+[...].mjs";
import { St as Check, l as UserPlus, n as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ActorsListDrawer-NQvy58wX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY$1 = "kylrix_connect_moment_previews_v1";
var MAX_ENTRIES$1 = 50;
var memoryCache$1 = /* @__PURE__ */ new Map();
var hydrated$1 = false;
function canUseStorage$1() {
	return typeof window !== "undefined";
}
function hydrate$1() {
	if (hydrated$1 || !canUseStorage$1()) return;
	hydrated$1 = true;
	try {
		const raw = sessionStorage.getItem(STORAGE_KEY$1);
		if (!raw) return;
		const parsed = JSON.parse(raw);
		Object.entries(parsed).forEach(([key, value]) => {
			if (value && value.$id) memoryCache$1.set(key, value);
		});
	} catch {}
}
function persist$1() {
	if (!canUseStorage$1()) return;
	try {
		const entries = Array.from(memoryCache$1.entries()).slice(-MAX_ENTRIES$1);
		sessionStorage.setItem(STORAGE_KEY$1, JSON.stringify(Object.fromEntries(entries)));
	} catch {}
}
function seedMomentPreview(moment) {
	hydrate$1();
	if (!moment?.$id) return null;
	const preview = {
		$id: moment.$id,
		userId: moment.userId ?? null,
		creatorId: moment.creatorId ?? null,
		caption: moment.caption ?? null,
		createdAt: moment.createdAt ?? null,
		$createdAt: moment.$createdAt ?? null,
		metadata: moment.metadata ?? null,
		stats: moment.stats ?? null,
		isLiked: moment.isLiked,
		isPulsed: moment.isPulsed,
		creator: moment.creator ?? null,
		sourceMoment: moment.sourceMoment ?? null
	};
	memoryCache$1.set(preview.$id, preview);
	persist$1();
	return preview;
}
function getCachedMomentPreview(momentId) {
	if (!momentId) return null;
	hydrate$1();
	return memoryCache$1.get(momentId) || null;
}
var THREAD_CACHE_STALE_AFTER_MS = 1e3 * 60 * 5;
var STORAGE_KEY = "kylrix_connect_thread_cache_v1";
var MAX_ENTRIES = 20;
var memoryCache = /* @__PURE__ */ new Map();
var hydrated = false;
function canUseStorage() {
	return typeof window !== "undefined";
}
function hydrate() {
	if (hydrated || !canUseStorage()) return;
	hydrated = true;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed = JSON.parse(raw);
		Object.entries(parsed).forEach(([key, value]) => {
			if (value?.moment?.$id) memoryCache.set(key, {
				moment: value.moment || null,
				replies: Array.isArray(value.replies) ? value.replies : [],
				ancestors: Array.isArray(value.ancestors) ? value.ancestors : [],
				cachedAt: value.cachedAt || Date.now()
			});
		});
	} catch {}
}
function persist() {
	if (!canUseStorage()) return;
	try {
		const entries = Array.from(memoryCache.entries()).slice(-MAX_ENTRIES);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(entries)));
	} catch {}
}
function seedMomentThread(rootId, thread) {
	hydrate();
	if (!rootId || !thread?.moment?.$id) return null;
	const cached = {
		moment: thread.moment || null,
		replies: Array.isArray(thread.replies) ? thread.replies : [],
		ancestors: Array.isArray(thread.ancestors) ? thread.ancestors : [],
		cachedAt: Date.now()
	};
	memoryCache.set(rootId, cached);
	persist();
	return cached;
}
function getCachedMomentThread(rootId) {
	if (!rootId) return null;
	hydrate();
	return memoryCache.get(rootId) || null;
}
function isFreshMomentThread(rootId, staleAfterMs = THREAD_CACHE_STALE_AFTER_MS) {
	const cached = getCachedMomentThread(rootId);
	if (!cached) return false;
	return Date.now() - cached.cachedAt < staleAfterMs;
}
var DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
var MOMENTS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.MOMENTS;
var FOLLOWS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.FOLLOWS;
var INTERACTIONS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.INTERACTIONS;
var MOMENT_LIST_SELECT = [
	"$id",
	"userId",
	"caption",
	"fileId",
	"momentKind",
	"sourceId",
	"searchTitle",
	"createdAt",
	"expiresAt"
];
var INTERACTION_LIST_SELECT = [
	"$id",
	"userId",
	"messageId",
	"emoji",
	"createdAt"
];
var parseMomentMetadata = (moment) => {
	try {
		if (moment?.fileId && (moment.fileId.startsWith("{") || moment.fileId.startsWith("["))) return JSON.parse(moment.fileId);
	} catch (_e) {}
	return null;
};
var getMomentKind = (moment) => {
	const explicit = String(moment?.momentKind || "").trim().toLowerCase();
	if (explicit === "post" || explicit === "reply" || explicit === "pulse" || explicit === "quote") return explicit;
	return parseMomentMetadata(moment)?.type || null;
};
var getMomentSourceId = (moment) => {
	const explicit = String(moment?.sourceId || "").trim();
	if (explicit) return explicit;
	return parseMomentMetadata(moment)?.sourceId || null;
};
var fetchRowsByIds = async (databaseId, tableId, ids) => {
	const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
	if (!uniqueIds.length) return [];
	try {
		return (await tablesDB.listRows(databaseId, tableId, [Query.equal("$id", uniqueIds), Query.limit(uniqueIds.length)])).rows || [];
	} catch (_e) {
		return await Promise.all(uniqueIds.map((id) => tablesDB.getRow(databaseId, tableId, id).catch(() => null))).then((rows) => rows.filter(Boolean));
	}
};
var SocialService = {
	async getInteractionCounts(momentId) {
		try {
			const likes = (await tablesDB.listRows(DB_ID, INTERACTIONS_TABLE, [
				Query.equal("messageId", momentId),
				Query.select(INTERACTION_LIST_SELECT),
				Query.limit(100)
			])).rows.filter((i) => i.emoji === "like").length;
			const related = await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
				Query.equal("sourceId", momentId),
				Query.select(MOMENT_LIST_SELECT),
				Query.limit(200)
			]).catch(() => ({ rows: [] }));
			let replies = 0;
			let pulses = 0;
			for (const m of related.rows || []) {
				const kind = getMomentKind(m);
				if (kind === "reply") replies += 1;
				if (kind === "pulse") pulses += 1;
			}
			if (!related.rows?.length) {
				const legacy = await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
					Query.select(MOMENT_LIST_SELECT),
					Query.orderDesc("$createdAt"),
					Query.limit(100)
				]).catch(() => ({ rows: [] }));
				for (const m of legacy.rows || []) {
					const kind = getMomentKind(m);
					if (getMomentSourceId(m) !== momentId) continue;
					if (kind === "reply") replies += 1;
					if (kind === "pulse") pulses += 1;
				}
			}
			return {
				likes,
				replies,
				pulses
			};
		} catch (_e) {
			return {
				likes: 0,
				replies: 0,
				pulses: 0
			};
		}
	},
	async _listInteractionsFor(momentId, emoji) {
		try {
			return (await tablesDB.listRows(DB_ID, INTERACTIONS_TABLE, [
				Query.equal("messageId", momentId),
				Query.equal("emoji", emoji),
				Query.select(INTERACTION_LIST_SELECT),
				Query.orderDesc("$createdAt"),
				Query.limit(100)
			])).rows.map((r) => ({
				userId: r.userId,
				createdAt: r.createdAt || r.$createdAt
			}));
		} catch (e) {
			console.error("_listInteractionsFor error", e);
			return [];
		}
	},
	async _listPulsesFor(sourceId) {
		try {
			const moments = await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
				Query.equal("sourceId", sourceId),
				Query.equal("momentKind", "pulse"),
				Query.select(MOMENT_LIST_SELECT),
				Query.orderDesc("$createdAt"),
				Query.limit(100)
			]);
			if (moments.rows.length) return moments.rows.map((m) => ({
				userId: m.userId || m.creatorId,
				createdAt: m.$createdAt || m.createdAt
			}));
			return (await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
				Query.select(MOMENT_LIST_SELECT),
				Query.orderDesc("$createdAt"),
				Query.limit(200)
			])).rows.filter((m) => {
				const kind = getMomentKind(m);
				const legacySourceId = getMomentSourceId(m);
				return kind === "pulse" && legacySourceId === sourceId;
			}).map((m) => ({
				userId: m.userId || m.creatorId,
				createdAt: m.$createdAt || m.createdAt
			}));
		} catch (e) {
			console.error("_listPulsesFor error", e);
			return [];
		}
	},
	async isPulsed(userId, sourceId) {
		try {
			return (await this._listPulsesFor(sourceId)).some((p) => p.userId === userId);
		} catch (e) {
			console.error("isPulsed error", e);
			return false;
		}
	},
	async toggleLike(userId, momentId, creatorId, contentSnippet) {
		try {
			const existing = await tablesDB.listRows(DB_ID, INTERACTIONS_TABLE, [
				Query.equal("userId", userId),
				Query.equal("messageId", momentId),
				Query.equal("emoji", "like"),
				Query.select(["$id"])
			]);
			if (existing.total > 0) {
				await tablesDB.deleteRow(DB_ID, INTERACTIONS_TABLE, existing.rows[0].$id);
				return { liked: false };
			} else {
				await tablesDB.createRow(DB_ID, INTERACTIONS_TABLE, ID.unique(), {
					userId,
					messageId: momentId,
					emoji: "like",
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				});
				if (creatorId && creatorId !== userId) try {
					await tablesDB.createRow(APPWRITE_CONFIG.DATABASES.KYLRIXNOTE, APPWRITE_CONFIG.TABLES.KYLRIXNOTE.ACTIVITY_LOG, ID.unique(), {
						userId: creatorId,
						action: "Moment Liked",
						targetType: "moment",
						targetId: momentId,
						details: JSON.stringify({
							read: false,
							originalDetails: `Someone liked your post: ${contentSnippet || "..."}`,
							actionUrl: `https://connect.${process.env.NEXT_PUBLIC_DOMAIN || "kylrix.space"}/post/${momentId}`
						})
					});
				} catch (_logErr) {
					console.warn("Failed to log like to activityLog");
				}
				return { liked: true };
			}
		} catch (error) {
			console.error("toggleLike error:", error);
			throw error;
		}
	},
	async isLiked(userId, momentId) {
		return (await tablesDB.listRows(DB_ID, INTERACTIONS_TABLE, [
			Query.equal("userId", userId),
			Query.equal("messageId", momentId),
			Query.equal("emoji", "like"),
			Query.select(["$id"])
		])).total > 0;
	},
	async enrichMoment(moment, currentUserId) {
		const parsedMetadata = parseMomentMetadata(moment);
		const resolvedKind = getMomentKind(moment);
		const resolvedSourceId = getMomentSourceId(moment);
		const metadata = resolvedKind || resolvedSourceId || parsedMetadata ? {
			type: resolvedKind || parsedMetadata?.type || "post",
			sourceId: resolvedSourceId || parsedMetadata?.sourceId || void 0,
			attachments: parsedMetadata?.attachments || []
		} : null;
		const enriched = {
			...moment,
			metadata,
			stats: {
				likes: 0,
				replies: 0,
				pulses: 0
			},
			isLiked: false
		};
		enriched.stats = await this.getInteractionCounts(moment.$id);
		if (currentUserId) {
			enriched.isLiked = await this.isLiked(currentUserId, moment.$id);
			try {
				enriched.isPulsed = await this.isPulsed(currentUserId, moment.$id);
			} catch (_e) {
				enriched.isPulsed = false;
			}
		}
		const attachments = metadata?.attachments || [];
		if (!metadata && moment.fileId && moment.fileId !== "none") {
			if (moment.fileId.startsWith("note:")) attachments.push({
				type: "note",
				id: moment.fileId.replace("note:", "")
			});
			else if (moment.fileId.startsWith("event:")) attachments.push({
				type: "event",
				id: moment.fileId.replace("event:", "")
			});
		}
		await Promise.all(attachments.map(async (att) => {
			try {
				if (att.type === "note") enriched.attachedNote = await tablesDB.getRow(APPWRITE_CONFIG.DATABASES.KYLRIXNOTE, APPWRITE_CONFIG.TABLES.KYLRIXNOTE.USERS === "67ff05c900247b5673d3" ? "67ff05f3002502ef239e" : "notes", att.id);
				else if (att.type === "event") enriched.attachedEvent = await tablesDB.getRow(APPWRITE_CONFIG.DATABASES.KYLRIXFLOW, "events", att.id);
				else if (att.type === "call") enriched.attachedCall = await tablesDB.getRow(APPWRITE_CONFIG.DATABASES.CHAT, APPWRITE_CONFIG.TABLES.CHAT.CALL_LINKS, att.id);
				else if (att.type === "image" || att.type === "video") {
					if (!enriched.attachments) enriched.attachments = [];
					enriched.attachments.push(att);
				}
			} catch (_e) {
				console.warn(`Failed to resolve attachment ${att.type}:${att.id}`, _e);
			}
		}));
		if (metadata?.sourceId) try {
			enriched.sourceMoment = await this.getMomentById(metadata.sourceId);
		} catch (_e) {
			console.warn(`Failed to resolve source moment ${metadata.sourceId}`, _e);
		}
		return enriched;
	},
	async getFeed(userId, targetUserId) {
		const queries = [
			Query.select(MOMENT_LIST_SELECT),
			Query.orderDesc("$createdAt"),
			Query.limit(100)
		];
		if (targetUserId) queries.push(Query.equal("userId", targetUserId));
		const moments = await tablesDB.listRows(DB_ID, MOMENTS_TABLE, queries);
		const rawRows = moments.rows || [];
		const momentIds = rawRows.map((moment) => moment.$id);
		const [interactionRows, recentMomentRows, userPulseRows] = await Promise.all([
			momentIds.length ? tablesDB.listRows(DB_ID, INTERACTIONS_TABLE, [
				Query.equal("messageId", momentIds),
				Query.select(INTERACTION_LIST_SELECT),
				Query.limit(1e3)
			]).then((res) => res.rows || []).catch(() => []) : Promise.resolve([]),
			momentIds.length ? tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
				Query.equal("sourceId", momentIds),
				Query.select(MOMENT_LIST_SELECT),
				Query.limit(1e3)
			]).then((res) => res.rows || []).catch(() => []) : Promise.resolve([]),
			userId ? tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
				Query.equal("userId", userId),
				Query.equal("momentKind", "pulse"),
				Query.select(MOMENT_LIST_SELECT),
				Query.orderDesc("$createdAt"),
				Query.limit(200)
			]).then((res) => res.rows || []).catch(() => []) : Promise.resolve([])
		]);
		const likesByMoment = /* @__PURE__ */ new Map();
		const likedMomentIds = /* @__PURE__ */ new Set();
		interactionRows.forEach((row) => {
			if (!row?.messageId) return;
			if (row.emoji === "like") {
				likesByMoment.set(row.messageId, (likesByMoment.get(row.messageId) || 0) + 1);
				if (userId && row.userId === userId) likedMomentIds.add(row.messageId);
			}
		});
		const engagementBySource = /* @__PURE__ */ new Map();
		recentMomentRows.forEach((moment) => {
			const sourceId = getMomentSourceId(moment);
			const kind = getMomentKind(moment);
			if (!sourceId) return;
			const counts = engagementBySource.get(sourceId) || {
				replies: 0,
				pulses: 0
			};
			if (kind === "reply") counts.replies += 1;
			if (kind === "pulse") counts.pulses += 1;
			engagementBySource.set(sourceId, counts);
		});
		const pulsedMomentIds = /* @__PURE__ */ new Set();
		userPulseRows.forEach((moment) => {
			const sourceId = getMomentSourceId(moment);
			if (getMomentKind(moment) === "pulse" && sourceId) pulsedMomentIds.add(sourceId);
		});
		const sortedRows = rawRows.map((moment) => {
			const parsedMetadata = parseMomentMetadata(moment);
			const metadata = {
				type: getMomentKind(moment) || parsedMetadata?.type || "post",
				sourceId: getMomentSourceId(moment) || parsedMetadata?.sourceId || void 0,
				attachments: parsedMetadata?.attachments || []
			};
			const counts = engagementBySource.get(moment.$id) || {
				replies: 0,
				pulses: 0
			};
			const likes = likesByMoment.get(moment.$id) || 0;
			return {
				...moment,
				metadata,
				stats: {
					likes,
					replies: counts.replies,
					pulses: counts.pulses
				},
				isLiked: Boolean(userId && likedMomentIds.has(moment.$id)),
				isPulsed: Boolean(userId && pulsedMomentIds.has(moment.$id))
			};
		}).map((m) => {
			let baseWeight = 1;
			const type = m.metadata?.type || "post";
			if (type === "pulse") baseWeight = .75;
			if (type === "reply") baseWeight = .5;
			const engagementScore = (m.stats?.likes || 0) * .2 + (m.stats?.replies || 0) * .4;
			const finalScore = baseWeight + engagementScore;
			return {
				...m,
				_rankScore: finalScore
			};
		}).filter((m) => {
			if (targetUserId && m.userId === targetUserId) return true;
			if (m.metadata?.type === "reply") return m._rankScore > 1;
			return true;
		}).sort((a, b) => {
			if (Math.abs(b._rankScore - a._rankScore) > .1) return b._rankScore - a._rankScore;
			return new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime();
		});
		const topRows = sortedRows.slice(0, 50);
		const sourceIds = Array.from(new Set(topRows.map((moment) => moment.metadata?.sourceId).filter(Boolean)));
		const attachmentGroups = {
			note: /* @__PURE__ */ new Set(),
			event: /* @__PURE__ */ new Set(),
			call: /* @__PURE__ */ new Set()
		};
		topRows.forEach((moment) => {
			(moment.metadata?.attachments || []).forEach((attachment) => {
				if (!attachment?.id) return;
				if (attachment.type === "note") attachmentGroups.note.add(attachment.id);
				if (attachment.type === "event") attachmentGroups.event.add(attachment.id);
				if (attachment.type === "call") attachmentGroups.call.add(attachment.id);
			});
		});
		const [sourceMoments, noteRows, eventRows, callRows] = await Promise.all([
			fetchRowsByIds(DB_ID, MOMENTS_TABLE, sourceIds),
			fetchRowsByIds(APPWRITE_CONFIG.DATABASES.KYLRIXNOTE, APPWRITE_CONFIG.TABLES.KYLRIXNOTE.USERS === "67ff05c900247b5673d3" ? "67ff05f3002502ef239e" : "notes", Array.from(attachmentGroups.note)),
			fetchRowsByIds(APPWRITE_CONFIG.DATABASES.KYLRIXFLOW, "events", Array.from(attachmentGroups.event)),
			fetchRowsByIds(APPWRITE_CONFIG.DATABASES.CHAT, APPWRITE_CONFIG.TABLES.CHAT.CALL_LINKS, Array.from(attachmentGroups.call))
		]);
		const sourceMomentMap = new Map(sourceMoments.map((row) => [row.$id, row]));
		const noteMap = new Map(noteRows.map((row) => [row.$id, row]));
		const eventMap = new Map(eventRows.map((row) => [row.$id, row]));
		const callMap = new Map(callRows.map((row) => [row.$id, row]));
		const hydratedRows = topRows.map((moment) => {
			const attachments = moment.metadata?.attachments || [];
			const attachedNote = attachments.find((attachment) => attachment.type === "note" && noteMap.has(attachment.id));
			const attachedEvent = attachments.find((attachment) => attachment.type === "event" && eventMap.has(attachment.id));
			const attachedCall = attachments.find((attachment) => attachment.type === "call" && callMap.has(attachment.id));
			return {
				...moment,
				sourceMoment: moment.metadata?.sourceId ? sourceMomentMap.get(moment.metadata.sourceId) || null : null,
				attachedNote: attachedNote ? noteMap.get(attachedNote.id) : void 0,
				attachedEvent: attachedEvent ? eventMap.get(attachedEvent.id) : void 0,
				attachedCall: attachedCall ? callMap.get(attachedCall.id) : void 0
			};
		});
		return {
			...moments,
			rows: hydratedRows,
			total: sortedRows.length
		};
	},
	async getTrendingFeed(userId) {
		const feed = await this.getFeed(userId);
		const trendingRows = [...feed.rows].sort((a, b) => (b._rankScore || 0) - (a._rankScore || 0));
		return {
			...feed,
			rows: trendingRows
		};
	},
	subscribeToFeed(callback) {
		const momentsChannel = `databases.${DB_ID}.collections.${MOMENTS_TABLE}.documents`;
		const interactionsChannel = `databases.${DB_ID}.collections.${INTERACTIONS_TABLE}.documents`;
		const unsubMomentsPromise = realtime.subscribe(momentsChannel, (response) => {
			const payload = response.payload;
			let type = null;
			if (response.events.some((e) => e.includes(".create"))) type = "create";
			else if (response.events.some((e) => e.includes(".update"))) type = "update";
			else if (response.events.some((e) => e.includes(".delete"))) type = "delete";
			if (type) callback({
				type,
				payload
			});
		});
		const unsubInteractionsPromise = realtime.subscribe(interactionsChannel, (response) => {
			if (response.events.some((e) => e.includes(".create") || e.includes(".delete"))) {
				const payload = response.payload;
				callback({
					type: "update",
					payload: {
						$id: payload.messageId,
						_interactionUpdate: true
					}
				});
			}
		});
		return async () => {
			const unsubMoments = await unsubMomentsPromise;
			const unsubInteractions = await unsubInteractionsPromise;
			if (typeof unsubMoments === "function") unsubMoments();
			else if (unsubMoments?.unsubscribe) unsubMoments.unsubscribe();
			if (typeof unsubInteractions === "function") unsubInteractions();
			else if (unsubInteractions?.unsubscribe) unsubInteractions.unsubscribe();
		};
	},
	async uploadMedia(file) {
		try {
			return (await storage.createFile(APPWRITE_CONFIG.BUCKETS.MESSAGES, ID.unique(), file)).$id;
		} catch (_e) {
			console.error("Failed to upload media", _e);
			throw _e;
		}
	},
	getMediaPreview(fileId, width = 800, height = 600) {
		return storage.getFilePreview(APPWRITE_CONFIG.BUCKETS.MESSAGES, fileId, width, height).toString();
	},
	async createMoment(creatorId, content, type = "post", mediaIds = [], _visibility = "public", noteId, eventId, sourceId, callId) {
		const permissions = [
			`read("user:${creatorId}")`,
			`update("user:${creatorId}")`,
			`delete("user:${creatorId}")`
		];
		const metadata = { type };
		if (sourceId) metadata.sourceId = sourceId;
		metadata.attachments = mediaIds.map((id) => ({
			type: "image",
			id
		}));
		if (noteId) metadata.attachments.push({
			type: "note",
			id: noteId
		});
		if (eventId) metadata.attachments.push({
			type: "event",
			id: eventId
		});
		if (callId) metadata.attachments.push({
			type: "call",
			id: callId
		});
		const effectiveFileId = JSON.stringify(metadata);
		if (type === "pulse" && sourceId) try {
			const recent = await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
				Query.equal("userId", creatorId),
				Query.equal("momentKind", "pulse"),
				Query.equal("sourceId", sourceId),
				Query.orderDesc("$createdAt"),
				Query.limit(1)
			]);
			if (recent.rows[0]) return recent.rows[0];
		} catch (dedupeErr) {
			console.warn("pulse dedupe check failed", dedupeErr);
		}
		const moment = await tablesDB.createRow(DB_ID, MOMENTS_TABLE, ID.unique(), {
			userId: creatorId,
			caption: content,
			type: "image",
			momentKind: type,
			sourceId: sourceId || null,
			searchTitle: content || null,
			fileId: effectiveFileId,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			expiresAt: new Date(Date.now() + 1440 * 60 * 1e3).toISOString()
		}, permissions);
		try {
			let targetUserId = creatorId;
			if (type === "reply" || type === "pulse" || type === "quote") try {
				targetUserId = (await tablesDB.getRow(DB_ID, MOMENTS_TABLE, sourceId)).userId;
			} catch (sourceErr) {
				console.warn("Failed to fetch source moment for activity log", sourceErr);
			}
			await tablesDB.createRow(APPWRITE_CONFIG.DATABASES.KYLRIXNOTE, APPWRITE_CONFIG.TABLES.KYLRIXNOTE.ACTIVITY_LOG, ID.unique(), {
				userId: targetUserId,
				action: type === "post" ? "Post Created" : type === "reply" ? "Moment Replied" : type === "pulse" ? "Moment Pulsed" : "Moment Quoted",
				targetType: "moment",
				targetId: moment.$id,
				details: JSON.stringify({
					read: targetUserId === creatorId,
					originalDetails: type === "post" ? `New post shared: ${content.substring(0, 50)}...` : type === "reply" ? `Someone replied to your post: ${content.substring(0, 50)}...` : type === "pulse" ? `Someone pulsed your post` : `Someone quoted your post`,
					actionUrl: `https://connect.${process.env.NEXT_PUBLIC_DOMAIN || "kylrix.space"}/post/${moment.$id}`
				})
			});
		} catch (_logErr) {
			console.warn("Failed to log moment action to activityLog");
		}
		return moment;
	},
	async deleteMoment(momentId) {
		return await tablesDB.deleteRow(DB_ID, MOMENTS_TABLE, momentId);
	},
	async unpulseMoment(userId, sourceId) {
		const pulseToDelete = (await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
			Query.equal("userId", userId),
			Query.equal("momentKind", "pulse"),
			Query.equal("sourceId", sourceId),
			Query.orderDesc("$createdAt"),
			Query.limit(100)
		])).rows[0] || null;
		if (pulseToDelete) {
			await this.deleteMoment(pulseToDelete.$id);
			return true;
		}
		return false;
	},
	async updateMomentVisibility(momentId, _visibility) {
		return await tablesDB.updateRow(DB_ID, MOMENTS_TABLE, momentId, { visibility: _visibility });
	},
	async updateMoment(momentId, content) {
		return await tablesDB.updateRow(DB_ID, MOMENTS_TABLE, momentId, {
			caption: content,
			searchTitle: content,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	},
	async likeMoment(userId, momentId) {
		return await tablesDB.createRow(DB_ID, INTERACTIONS_TABLE, ID.unique(), {
			userId,
			momentId,
			type: "like"
		});
	},
	async followUser(followerId, followingId) {
		try {
			const followerIds = await this._resolveUserIds(followerId);
			const followingIds = await this._resolveUserIds(followingId);
			const existing = await tablesDB.listRows(DB_ID, FOLLOWS_TABLE, [
				Query.equal("followerId", followerIds),
				Query.equal("followingId", followingIds),
				Query.limit(1)
			]);
			if (existing.total > 0) return existing.rows[0];
			return await tablesDB.createRow(DB_ID, FOLLOWS_TABLE, ID.unique(), {
				followerId,
				followingId,
				status: "accepted",
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch (err) {
			console.error("[SocialService] followUser error", err);
			throw err;
		}
	},
	async unfollowUser(followerId, followingId) {
		try {
			const followerIds = await this._resolveUserIds(followerId);
			const followingIds = await this._resolveUserIds(followingId);
			const existing = await tablesDB.listRows(DB_ID, FOLLOWS_TABLE, [
				Query.equal("followerId", followerIds),
				Query.equal("followingId", followingIds),
				Query.limit(100)
			]);
			if (existing.total > 0) {
				for (const row of existing.rows) try {
					await tablesDB.deleteRow(DB_ID, FOLLOWS_TABLE, row.$id);
				} catch (_e) {}
				return true;
			}
			return false;
		} catch (err) {
			console.error("[SocialService] unfollowUser error", err);
			throw err;
		}
	},
	async _resolveUserIds(id) {
		const ids = [id];
		try {
			const profile = await UsersService.getProfileById(id);
			if (profile) {
				if (profile.userId && !ids.includes(profile.userId)) ids.push(profile.userId);
				if (profile.$id && !ids.includes(profile.$id)) ids.push(profile.$id);
			}
		} catch (_e) {}
		return ids;
	},
	async isFollowing(followerId, followingId) {
		try {
			const followerIds = await this._resolveUserIds(followerId);
			const followingIds = await this._resolveUserIds(followingId);
			return (await tablesDB.listRows(DB_ID, FOLLOWS_TABLE, [
				Query.equal("followerId", followerIds),
				Query.equal("followingId", followingIds),
				Query.equal("status", "accepted"),
				Query.limit(1)
			])).total > 0;
		} catch (e) {
			console.error("[SocialService] isFollowing error", e);
			return false;
		}
	},
	async getFollowStats(userId) {
		try {
			const ids = await this._resolveUserIds(userId);
			const followers = await tablesDB.listRows(DB_ID, FOLLOWS_TABLE, [
				Query.equal("followingId", ids),
				Query.equal("status", "accepted"),
				Query.limit(1)
			]);
			const following = await tablesDB.listRows(DB_ID, FOLLOWS_TABLE, [
				Query.equal("followerId", ids),
				Query.equal("status", "accepted"),
				Query.limit(1)
			]);
			return {
				followers: followers.total,
				following: following.total,
				followerRows: followers.rows,
				followingRows: following.rows
			};
		} catch (_e) {
			console.error("[SocialService] getFollowStats error", _e);
			return {
				followers: 0,
				following: 0,
				followerRows: [],
				followingRows: []
			};
		}
	},
	async getFollowers(userId, currentUserId) {
		try {
			const ids = await this._resolveUserIds(userId);
			const result = await tablesDB.listRows(DB_ID, FOLLOWS_TABLE, [
				Query.equal("followingId", ids),
				Query.equal("status", "accepted"),
				Query.limit(100)
			]);
			return (await Promise.all(result.rows.map(async (row) => {
				const profile = await UsersService.getProfileById(row.followerId);
				if (!profile) return null;
				let isFollowing = false;
				if (currentUserId) isFollowing = await this.isFollowing(currentUserId, profile.userId || profile.$id);
				return {
					...profile,
					followRowId: row.$id,
					isFollowing
				};
			}))).filter((p) => p !== null);
		} catch (error) {
			console.error("[SocialService] getFollowers error", error);
			return [];
		}
	},
	async getFollowing(userId, currentUserId) {
		try {
			const ids = await this._resolveUserIds(userId);
			const result = await tablesDB.listRows(DB_ID, FOLLOWS_TABLE, [
				Query.equal("followerId", ids),
				Query.equal("status", "accepted"),
				Query.limit(100)
			]);
			return (await Promise.all(result.rows.map(async (row) => {
				const profile = await UsersService.getProfileById(row.followingId);
				if (!profile) return null;
				let isFollowing = false;
				if (currentUserId) if (currentUserId === userId) isFollowing = true;
				else isFollowing = await this.isFollowing(currentUserId, profile.userId || profile.$id);
				return {
					...profile,
					followRowId: row.$id,
					isFollowing
				};
			}))).filter((p) => p !== null);
		} catch (error) {
			console.error("[SocialService] getFollowing error", error);
			return [];
		}
	},
	async searchMoments(query, userId) {
		try {
			const queries = [
				Query.select(MOMENT_LIST_SELECT),
				Query.search("searchTitle", query),
				Query.orderDesc("$createdAt"),
				Query.limit(50)
			];
			const moments = await tablesDB.listRows(DB_ID, MOMENTS_TABLE, queries);
			const enrichedRows = await Promise.all(moments.rows.map(async (moment) => {
				return this.enrichMoment(moment, userId);
			}));
			return {
				...moments,
				rows: enrichedRows
			};
		} catch (error) {
			console.error("searchMoments error:", error);
			return {
				rows: [],
				total: 0
			};
		}
	},
	async getMomentById(momentId, currentUserId) {
		const cachedThread = getCachedMomentThread(momentId);
		if (cachedThread?.moment) return cachedThread.moment;
		const cachedPreview = getCachedMomentPreview(momentId);
		if (cachedPreview) return cachedPreview;
		const moment = await tablesDB.getRow(DB_ID, MOMENTS_TABLE, momentId);
		const enriched = await this.enrichMoment(moment, currentUserId);
		seedMomentPreview(enriched);
		return enriched;
	},
	async getReplies(momentId, currentUserId) {
		const cachedThread = getCachedMomentThread(momentId);
		if (cachedThread?.replies?.length) return cachedThread.replies;
		const moments = await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
			Query.select(MOMENT_LIST_SELECT),
			Query.equal("sourceId", momentId),
			Query.equal("momentKind", "reply"),
			Query.orderDesc("$createdAt"),
			Query.limit(100)
		]).catch(() => ({ rows: [] }));
		return moments.rows.length ? await Promise.all(moments.rows.map((m) => this.enrichMoment(m, currentUserId))) : await Promise.all((await tablesDB.listRows(DB_ID, MOMENTS_TABLE, [
			Query.select(MOMENT_LIST_SELECT),
			Query.orderDesc("$createdAt"),
			Query.limit(100)
		]).catch(() => ({ rows: [] }))).rows.filter((m) => getMomentKind(m) === "reply" && getMomentSourceId(m) === momentId).map((m) => this.enrichMoment(m, currentUserId)));
	}
};
function ActorsListDrawer({ open, onClose, title, actors, mobile = false, onSelect, onAction }) {
	const isMdDown = useMediaQuery(useTheme().breakpoints.down("md"), { noSsr: true });
	const prefersMobile = mobile || isMdDown;
	const [isExpanded, setIsExpanded] = (0, import_react.useState)(false);
	const [actionLoading, setActionLoading] = (0, import_react.useState)(null);
	const [confirmUnfollow, setConfirmUnfollow] = (0, import_react.useState)(null);
	const handleAction = async (e, actor, type) => {
		e.stopPropagation();
		if (!onAction) return;
		if (type === "unfollow" && confirmUnfollow !== actor.$id) {
			setConfirmUnfollow(actor.$id);
			return;
		}
		setActionLoading(actor.$id);
		try {
			await onAction(actor, type);
			setConfirmUnfollow(null);
		} catch (error) {
			console.error("Action failed:", error);
		} finally {
			setActionLoading(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		anchor: prefersMobile ? "bottom" : "right",
		open,
		onClose: () => {
			onClose();
			setConfirmUnfollow(null);
		},
		PaperProps: { sx: {
			bgcolor: "#0A0908",
			color: "white",
			borderRadius: prefersMobile ? isExpanded ? "0" : "24px 24px 0 0" : "24px 0 0 24px",
			width: prefersMobile ? "100%" : 400,
			p: 3,
			height: prefersMobile ? isExpanded ? "100%" : "75%" : "auto",
			maxHeight: prefersMobile ? "90%" : "100%",
			borderTop: prefersMobile ? "1px solid rgba(255,255,255,0.08)" : "none",
			borderLeft: !prefersMobile ? "1px solid rgba(255,255,255,0.08)" : "none",
			transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
			boxShadow: "-20px 0 40px rgba(0,0,0,0.5)"
		} },
		children: [
			prefersMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					width: "100%",
					pt: 0,
					pb: 2,
					display: "flex",
					justifyContent: "center",
					cursor: "pointer"
				},
				onClick: () => setIsExpanded(!isExpanded),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
					width: 40,
					height: 4,
					bgcolor: "rgba(255, 255, 255, 0.1)",
					borderRadius: "2px"
				} })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: 3
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					sx: {
						fontWeight: 900,
						fontSize: "1.25rem",
						fontFamily: "var(--font-clash)"
					},
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					onClick: onClose,
					sx: {
						color: "rgba(255,255,255,0.4)",
						"&:hover": {
							color: "white",
							bgcolor: "rgba(255,255,255,0.05)"
						}
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					mt: 1,
					flex: 1,
					overflowY: "auto",
					px: .5
				},
				children: [actors.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						py: 10,
						textAlign: "center",
						opacity: .4
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						sx: { fontWeight: 700 },
						children: "No accounts found"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
					spacing: 1.5,
					children: actors.map((actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						onClick: () => onSelect ? onSelect(actor) : null,
						sx: {
							display: "flex",
							alignItems: "center",
							gap: 2,
							p: 1.5,
							borderRadius: "16px",
							cursor: onSelect ? "pointer" : "default",
							transition: "all 0.2s ease",
							"&:hover": { bgcolor: "rgba(255,255,255,0.03)" }
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								src: actor.avatar || void 0,
								sx: {
									width: 48,
									height: 48,
									borderRadius: "14px",
									bgcolor: "#F59E0B",
									color: "black",
									fontWeight: 900,
									fontSize: "1.1rem",
									fontFamily: "var(--font-clash)"
								},
								children: (actor.displayName || actor.username || actor.$id).charAt(0).toUpperCase()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
								sx: {
									flex: 1,
									minWidth: 0
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									noWrap: true,
									sx: {
										fontWeight: 800,
										fontSize: "0.95rem"
									},
									children: actor.displayName || actor.username || actor.$id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
									variant: "caption",
									sx: {
										opacity: .5,
										fontFamily: "var(--font-mono)"
									},
									children: ["@", actor.username || actor.$id.slice(0, 7)]
								})]
							}),
							onAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: { ml: 1 },
								children: actor.isFollowing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "small",
									variant: confirmUnfollow === actor.$id ? "contained" : "outlined",
									color: confirmUnfollow === actor.$id ? "error" : "inherit",
									disabled: actionLoading === actor.$id,
									onClick: (e) => handleAction(e, actor, "unfollow"),
									sx: {
										borderRadius: "10px",
										textTransform: "none",
										fontWeight: 800,
										fontSize: "0.75rem",
										px: 1.5,
										minWidth: 80,
										borderColor: "rgba(255,255,255,0.1)",
										bgcolor: confirmUnfollow === actor.$id ? "#ff4d4d" : "transparent",
										"&:hover": {
											borderColor: confirmUnfollow === actor.$id ? "#ff4d4d" : "#ff4d4d",
											color: confirmUnfollow === actor.$id ? "white" : "#ff4d4d",
											bgcolor: confirmUnfollow === actor.$id ? alpha("#ff4d4d", .8) : alpha("#ff4d4d", .05)
										}
									},
									children: actionLoading === actor.$id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
										size: 14,
										color: "inherit"
									}) : confirmUnfollow === actor.$id ? "Confirm" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: .5,
										alignItems: "center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "inherit",
											children: "Following"
										})]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "small",
									variant: "contained",
									disabled: actionLoading === actor.$id,
									onClick: (e) => handleAction(e, actor, "follow"),
									sx: {
										borderRadius: "10px",
										textTransform: "none",
										fontWeight: 800,
										fontSize: "0.75rem",
										px: 2,
										minWidth: 80,
										bgcolor: "#F59E0B",
										color: "black",
										"&:hover": { bgcolor: alpha("#F59E0B", .8) }
									},
									children: actionLoading === actor.$id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
										size: 14,
										color: "inherit"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: .5,
										alignItems: "center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "inherit",
											children: "Follow"
										})]
									})
								})
							})
						]
					}, actor.$id))
				})]
			})
		]
	});
}
//#endregion
export { getCachedMomentThread as a, seedMomentThread as c, getCachedMomentPreview as i, SocialService as n, isFreshMomentThread as o, THREAD_CACHE_STALE_AFTER_MS as r, seedMomentPreview as s, ActorsListDrawer as t };
