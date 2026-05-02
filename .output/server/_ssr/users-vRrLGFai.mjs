import { a as Permission, c as Role, o as Query } from "../_libs/appwrite.mjs";
import { a as getCurrentUser, d as tablesDB, t as APPWRITE_CONFIG, u as storage } from "./client-bVtyOxJQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-vRrLGFai.js
var KYLRIX_DOMAIN = "kylrix.space";
var KYLRIX_AUTH_URI = `https://accounts.${KYLRIX_DOMAIN}`;
function getEcosystemUrl(subdomain) {
	if (!subdomain) return "#";
	const hostname = typeof window !== "undefined" ? window.location.hostname : "";
	if (hostname === "localhost" || hostname === "127.0.0.1" || false) {
		const ports = {
			accounts: 3e3,
			note: 3001,
			vault: 3002,
			flow: 3003,
			connect: 3004,
			kylrix: 3005
		};
		return `http://localhost:${ports[subdomain] || ports["accounts"]}`;
	}
	return `https://${subdomain}.${KYLRIX_DOMAIN}`;
}
var STORAGE_KEY = "kylrix_connect_identity_cache_v1";
var IDENTITY_UPDATED_EVENT = "kylrix:identity-cache-updated";
var DEFAULT_STALE_AFTER_MS = 3e4;
var memoryCache = /* @__PURE__ */ new Map();
var inFlight = /* @__PURE__ */ new Map();
var storageHydrated = false;
function normalizeUsername$1(value) {
	if (!value) return null;
	return value.toString().trim().replace(/^@+/, "").toLowerCase().replace(/[^a-z0-9_-]/g, "") || null;
}
function canUseStorage() {
	return typeof window !== "undefined";
}
function hydrateStorage() {
	if (storageHydrated || !canUseStorage()) return;
	storageHydrated = true;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed = JSON.parse(raw);
		Object.entries(parsed).forEach(([key, value]) => {
			if (value && value.userId) memoryCache.set(key, value);
		});
	} catch {}
}
function persistStorage() {
	if (!canUseStorage()) return;
	try {
		const serialized = JSON.stringify(Object.fromEntries(memoryCache.entries()));
		localStorage.setItem(STORAGE_KEY, serialized);
	} catch {}
}
function emitUpdate(identity) {
	if (!canUseStorage()) return;
	window.dispatchEvent(new CustomEvent(IDENTITY_UPDATED_EVENT, { detail: identity }));
}
function storeIdentity(identity) {
	memoryCache.set(`id:${identity.userId}`, identity);
	memoryCache.set(`id:${identity.$id}`, identity);
	if (identity.username) memoryCache.set(`username:${identity.username}`, identity);
	persistStorage();
	emitUpdate(identity);
}
function normalizeIdentity(input) {
	if (!input) return null;
	const userId = input.userId || input.$id;
	if (!userId) return null;
	const username = normalizeUsername$1(input.username);
	const displayName = input.displayName?.trim() || null;
	const avatar = input.avatarUrl || input.avatarFileId || input.avatar || input.profilePicId || null;
	const publicKey = input.publicKey || null;
	const preferences = input.preferences || null;
	const bio = input.bio || null;
	const walletAddress = input.walletAddress || null;
	return {
		$id: input.$id || userId,
		userId,
		username,
		displayName,
		avatar,
		publicKey,
		preferences,
		bio,
		walletAddress,
		cachedAt: input.cachedAt || Date.now(),
		source: input.source
	};
}
function seedIdentityCache(input) {
	hydrateStorage();
	const identity = normalizeIdentity(input);
	if (!identity) return null;
	storeIdentity(identity);
	return identity;
}
function getCachedIdentityById(userId) {
	if (!userId) return null;
	hydrateStorage();
	return memoryCache.get(`id:${userId}`) || null;
}
function getCachedIdentityByUsername(username) {
	const normalized = normalizeUsername$1(username);
	if (!normalized) return null;
	hydrateStorage();
	return memoryCache.get(`username:${normalized}`) || null;
}
async function refreshIdentity(cacheKey, fetcher) {
	const existing = inFlight.get(cacheKey);
	if (existing) return existing;
	const request = (async () => {
		try {
			return seedIdentityCache(await fetcher());
		} catch {
			return null;
		} finally {
			inFlight.delete(cacheKey);
		}
	})();
	inFlight.set(cacheKey, request);
	return request;
}
function shouldRefresh(identity, staleAfterMs) {
	return Date.now() - identity.cachedAt > staleAfterMs;
}
async function resolveIdentityById(userId, fetcher, staleAfterMs = DEFAULT_STALE_AFTER_MS) {
	const cached = getCachedIdentityById(userId);
	if (cached) {
		if (shouldRefresh(cached, staleAfterMs)) refreshIdentity(`id:${userId}`, fetcher);
		return cached;
	}
	return refreshIdentity(`id:${userId}`, fetcher);
}
async function resolveIdentityByUsername(username, fetcher, staleAfterMs = DEFAULT_STALE_AFTER_MS) {
	const normalized = normalizeUsername$1(username);
	if (!normalized) return null;
	const cached = getCachedIdentityByUsername(normalized);
	if (cached) {
		if (shouldRefresh(cached, staleAfterMs)) refreshIdentity(`username:${normalized}`, fetcher);
		return cached;
	}
	return refreshIdentity(`username:${normalized}`, fetcher);
}
function subscribeIdentityCache(listener) {
	if (!canUseStorage()) return () => {};
	const handler = (event) => {
		const custom = event;
		if (custom.detail) listener(custom.detail);
	};
	window.addEventListener(IDENTITY_UPDATED_EVENT, handler);
	return () => window.removeEventListener(IDENTITY_UPDATED_EVENT, handler);
}
var DB_ID = APPWRITE_CONFIG.DATABASES.CHAT;
var USERS_TABLE = APPWRITE_CONFIG.TABLES.CHAT.PROFILES;
var PROFILE_SYNC_TTL = 5e3;
var profileSyncRequests = /* @__PURE__ */ new Map();
var profileSyncCache = /* @__PURE__ */ new Map();
var normalizeUsername = (input) => {
	if (!input) return null;
	return input.toString().trim().replace(/^@+/, "").toLowerCase().replace(/[^a-z0-9_-]/g, "") || null;
};
var deriveAutomaticIdentity = (user) => {
	const nameParts = user.name ? user.name.trim().split(/\s+/).filter(Boolean) : [];
	const firstName = nameParts[0] || "";
	const surname = nameParts[1] || "";
	const emailPrefix = user.email ? user.email.split("@")[0].replace(/[^a-zA-Z0-9_-]/g, "") : "";
	return {
		candidates: Array.from(new Set([
			normalizeUsername(firstName),
			normalizeUsername(surname),
			normalizeUsername(emailPrefix),
			normalizeUsername(`u${user.$id.slice(0, 12)}`)
		].filter(Boolean))),
		displayName: nameParts.length >= 2 ? `${nameParts[0]} ${nameParts[1]}` : firstName || emailPrefix || `User ${user.$id.slice(0, 6)}`
	};
};
var buildFallbackUsername = (userId, email) => {
	const emailPrefix = email ? normalizeUsername(email.split("@")[0].replace(/[^a-zA-Z0-9_-]/g, "")) : null;
	if (emailPrefix) return emailPrefix;
	return normalizeUsername(`u${userId.slice(0, 12)}`) || `u${userId.slice(0, 12)}`;
};
var buildProfilePayload = (userId, profile, seed) => {
	const derived = deriveAutomaticIdentity({
		$id: userId,
		email: seed?.email,
		name: seed?.name
	});
	return {
		userId,
		username: profile?.username || derived.candidates[0] || buildFallbackUsername(userId, seed?.email),
		displayName: profile?.displayName || seed?.name || derived.displayName,
		bio: profile?.bio || "",
		avatar: profile?.avatar || null,
		publicKey: seed?.publicKey ?? profile?.publicKey ?? null,
		walletAddress: profile?.walletAddress || null,
		preferences: profile?.preferences || null
	};
};
var resolveRecentSync = (userId) => {
	const cached = profileSyncCache.get(userId);
	if (!cached) return null;
	if (Date.now() - cached.syncedAt > PROFILE_SYNC_TTL) {
		profileSyncCache.delete(userId);
		return null;
	}
	return cached.value;
};
var rememberRecentSync = (userId, value) => {
	profileSyncCache.set(userId, {
		value,
		syncedAt: Date.now()
	});
	return value;
};
var dedupeProfileSync = async (userId, task) => {
	const recent = resolveRecentSync(userId);
	if (recent) return recent;
	const active = profileSyncRequests.get(userId);
	if (active) return active;
	const request = (async () => {
		try {
			return rememberRecentSync(userId, await task());
		} finally {
			profileSyncRequests.delete(userId);
		}
	})();
	profileSyncRequests.set(userId, request);
	return request;
};
async function syncProfileEvent(payload) {
	try {
		const res = await fetch(`${getEcosystemUrl("accounts")}/api/account-events`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			credentials: "include",
			body: JSON.stringify(payload)
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok) throw new Error(data?.error || "Failed to sync profile event");
		return data;
	} catch (error) {
		console.warn("[UsersService] Failed to sync profile event:", error);
		return null;
	}
}
var UsersService = {
	async getProfile(username) {
		const normalized = normalizeUsername(username);
		if (!normalized) return null;
		try {
			return await resolveIdentityByUsername(normalized, async () => {
				return (await tablesDB.listRows(DB_ID, USERS_TABLE, [
					Query.equal("username", normalized),
					Query.limit(1),
					Query.select([
						"$id",
						"userId",
						"username",
						"displayName",
						"bio",
						"avatar",
						"avatarUrl",
						"avatarFileId",
						"publicKey",
						"walletAddress",
						"preferences",
						"tier",
						"last_username_edit",
						"createdAt",
						"$createdAt"
					])
				])).rows[0] || null;
			});
		} catch (_e) {
			return null;
		}
	},
	async getProfileById(userId, skipCache = false) {
		if (!userId) return null;
		const fetcher = async () => {
			try {
				const doc = await tablesDB.getRow(DB_ID, USERS_TABLE, userId);
				if (doc) return doc;
			} catch (_e) {}
			try {
				const result = await tablesDB.listRows(DB_ID, USERS_TABLE, [
					Query.equal("userId", userId),
					Query.limit(1),
					Query.select([
						"$id",
						"userId",
						"username",
						"displayName",
						"bio",
						"avatar",
						"avatarUrl",
						"avatarFileId",
						"publicKey",
						"walletAddress",
						"preferences",
						"tier",
						"last_username_edit",
						"createdAt",
						"$createdAt"
					])
				]);
				if (result.rows[0]) return result.rows[0];
			} catch (_e) {}
			return null;
		};
		if (skipCache) return await fetcher();
		try {
			return await resolveIdentityById(userId, fetcher);
		} catch (_e) {
			return null;
		}
	},
	async purgeAllProfilesForUser(userId) {
		try {
			const result = await tablesDB.listRows(DB_ID, USERS_TABLE, [
				Query.equal("userId", userId),
				Query.limit(100),
				Query.select([
					"$id",
					"userId",
					"username",
					"displayName",
					"bio",
					"avatar",
					"avatarUrl",
					"avatarFileId",
					"publicKey",
					"walletAddress",
					"preferences",
					"tier",
					"last_username_edit",
					"createdAt",
					"$createdAt"
				])
			]);
			for (const row of result.rows) await tablesDB.deleteRow(DB_ID, USERS_TABLE, row.$id);
			console.log(`[UsersService] Purged ${result.total} profiles for user ${userId}`);
		} catch (err) {
			console.error(`[UsersService] Failed to purge profiles for user ${userId}:`, err);
		}
	},
	async isUsernameAvailable(username) {
		const normalized = normalizeUsername(username);
		if (!normalized) return false;
		try {
			return (await tablesDB.listRows(DB_ID, USERS_TABLE, [Query.equal("username", normalized), Query.select([
				"$id",
				"userId",
				"username",
				"displayName",
				"bio",
				"avatar",
				"avatarUrl",
				"avatarFileId",
				"publicKey",
				"walletAddress",
				"preferences",
				"tier",
				"last_username_edit",
				"createdAt",
				"$createdAt"
			])])).total === 0;
		} catch (_e) {
			return true;
		}
	},
	async updateProfile(userId, data) {
		let currentProfile = await this.getProfileById(userId);
		if (!currentProfile) try {
			const doc = await tablesDB.getRow(DB_ID, USERS_TABLE, userId);
			if (doc) currentProfile = normalizeIdentity(doc);
		} catch (_e) {}
		const updatePayload = {};
		const allowedFields = [
			"userId",
			"username",
			"displayName",
			"bio",
			"avatar",
			"publicKey",
			"walletAddress",
			"preferences"
		];
		if (data.username) {
			const normalized = normalizeUsername(data.username);
			if (!normalized) throw new Error("Invalid username");
			if (currentProfile && normalized !== currentProfile.username) {
				if (!await this.isUsernameAvailable(normalized)) throw new Error("Username already taken");
				updatePayload.username = normalized;
				try {
					let prefs = {};
					try {
						prefs = typeof currentProfile.preferences === "string" ? JSON.parse(currentProfile.preferences || "{}") : currentProfile.preferences || {};
					} catch (_e) {
						prefs = {};
					}
					const history = prefs.usernameHistory || [];
					const now = (/* @__PURE__ */ new Date()).toISOString();
					if (history.length === 0) history.push({
						initial: currentProfile.username,
						new: normalized,
						updatedAt: now
					});
					else history.push({
						new: normalized,
						updatedAt: now
					});
					prefs.usernameHistory = history;
					updatePayload.preferences = JSON.stringify(prefs);
				} catch (historyErr) {
					console.error("[UsersService] Failed to update username history:", historyErr);
				}
			}
		}
		if (currentProfile) {
			const targetUserId = currentProfile.userId || userId;
			allowedFields.forEach((field) => {
				if (field === "username") return;
				if (Object.prototype.hasOwnProperty.call(data, field)) {
					const value = data[field];
					if (value !== void 0) updatePayload[field] = value;
				}
			});
			updatePayload.userId = targetUserId;
			delete updatePayload.avatarFileId;
			delete updatePayload.avatarUrl;
			console.log("[UsersService] Updating profile for", targetUserId, "with payload:", JSON.stringify(updatePayload));
			try {
				const result = await tablesDB.updateRow(DB_ID, USERS_TABLE, currentProfile.$id, updatePayload);
				seedIdentityCache(result);
				await syncProfileEvent({
					type: Object.prototype.hasOwnProperty.call(data, "username") ? "username_change" : "profile_sync",
					userId: targetUserId,
					newUsername: updatePayload.username,
					profilePatch: {
						username: updatePayload.username || currentProfile.username,
						displayName: updatePayload.displayName || currentProfile.displayName,
						bio: updatePayload.bio ?? currentProfile.bio,
						avatar: updatePayload.avatar ?? currentProfile.avatar,
						publicKey: updatePayload.publicKey ?? currentProfile.publicKey,
						walletAddress: updatePayload.walletAddress ?? currentProfile.walletAddress
					},
					metadata: { source: "connect.users-service.updateProfile" }
				});
				return result;
			} catch (err) {
				console.error("[UsersService] Update failed:", err);
				throw err;
			}
		} else {
			const user = await getCurrentUser();
			if (user && user.$id === userId) {
				if (await this.ensureProfileForUser(user)) return await this.updateProfile(userId, data);
			}
			console.warn("[UsersService] updateProfile called for non-existent profile and user session unavailable for", userId);
			return null;
		}
	},
	async createProfile(userId, username, data = {}) {
		const normalized = normalizeUsername(username);
		if (!normalized) throw new Error("Invalid username");
		const existing = await this.getProfileById(userId, true);
		if (existing) {
			seedIdentityCache(existing);
			return existing;
		}
		const createData = {
			userId,
			username: normalized,
			displayName: data.displayName || username,
			bio: data.bio || "",
			avatar: data.avatar || null,
			publicKey: data.publicKey || null,
			walletAddress: data.walletAddress || null,
			preferences: data.preferences || null
		};
		delete createData.avatarFileId;
		delete createData.avatarUrl;
		console.log("[UsersService] [PAYLOAD_AUDIT] Creating with keys:", Object.keys(createData));
		console.log("[UsersService] Creating profile for", userId, "with data:", JSON.stringify(createData));
		const row = await tablesDB.createRow(DB_ID, USERS_TABLE, userId, createData, [
			Permission.read(Role.any()),
			Permission.read(Role.user(userId)),
			Permission.update(Role.user(userId)),
			Permission.delete(Role.user(userId))
		]);
		seedIdentityCache(row);
		await syncProfileEvent({
			type: "username_change",
			userId,
			newUsername: normalized,
			profilePatch: {
				username: normalized,
				displayName: createData.displayName,
				bio: createData.bio,
				publicKey: createData.publicKey
			},
			metadata: { source: "connect.users-service.createProfile" }
		});
		return row;
	},
	async ensureProfileForUser(user) {
		if (!user?.$id) return null;
		return dedupeProfileSync(user.$id, async () => {
			const existing = await this.getProfileById(user.$id, true);
			const { candidates, displayName } = deriveAutomaticIdentity(user);
			if (existing && existing.username) {
				const isGeneric = existing.username.startsWith("u") && existing.username.length > 5;
				const isPlaceholder = existing.username === "user";
				if ((isGeneric || isPlaceholder) && candidates[0] && candidates[0] !== existing.username) {
					console.log("[UsersService] Healing profile for", user.$id, "to", candidates[0]);
					return await this.updateProfile(user.$id, {
						username: candidates[0],
						displayName: displayName || existing.displayName || void 0
					});
				}
				seedIdentityCache(existing);
				return existing;
			}
			const avatarId = user?.prefs?.avatar || user?.prefs?.profilePicId || null;
			if (avatarId) await this.setAvatarVisible(user.$id, avatarId, true);
			const createData = {
				displayName: displayName || void 0,
				avatar: avatarId
			};
			for (const candidateUsername of candidates) {
				if (!candidateUsername) continue;
				if (!await this.isUsernameAvailable(candidateUsername)) continue;
				const created = await this.createProfile(user.$id, candidateUsername, createData);
				seedIdentityCache(created);
				return created;
			}
			const fallbackUsername = buildFallbackUsername(user.$id, user.email);
			const created = await this.createProfile(user.$id, fallbackUsername, createData);
			seedIdentityCache(created);
			return created;
		});
	},
	async syncProfileWithIdentity(user) {
		if (!user?.$id) return null;
		const { ecosystemSecurity } = await import("./security-D9WwOZ_4.mjs");
		if (ecosystemSecurity.status.isUnlocked) return await this.forceSyncProfileWithIdentity(user);
		return await this.ensureProfileForUser(user);
	},
	async forceSyncProfileWithIdentity(user) {
		if (!user?.$id) return null;
		return dedupeProfileSync(user.$id, async () => {
			const publicKey = await (async () => {
				try {
					const { ecosystemSecurity } = await import("./security-D9WwOZ_4.mjs");
					return ecosystemSecurity.status.isUnlocked ? await ecosystemSecurity.ensureE2EIdentity(user.$id) : null;
				} catch (_e) {
					return null;
				}
			})();
			const profile = await this.getProfileById(user.$id, true);
			const payload = buildProfilePayload(user.$id, profile, {
				email: user.email,
				name: user.name,
				prefs: user.prefs,
				publicKey
			});
			delete payload.avatarFileId;
			delete payload.avatarUrl;
			const permissionSet = [
				Permission.read(Role.any()),
				Permission.read(Role.user(user.$id)),
				Permission.update(Role.user(user.$id)),
				Permission.delete(Role.user(user.$id))
			];
			if (profile) {
				const updated = await tablesDB.updateRow(DB_ID, USERS_TABLE, profile.$id, payload);
				seedIdentityCache(updated);
				return updated;
			}
			const created = await tablesDB.createRow(DB_ID, USERS_TABLE, user.$id, payload, permissionSet);
			seedIdentityCache(created);
			return created;
		});
	},
	async searchUsers(query, options) {
		const cleaned = query.trim().replace(/^@/, "");
		const queries = [Query.or([Query.startsWith("username", cleaned.toLowerCase()), Query.startsWith("displayName", cleaned)]), Query.limit(20)];
		if (options?.requirePublicKey) {
			queries.splice(1, 0, Query.isNotNull("publicKey"));
			queries.splice(2, 0, Query.notEqual("publicKey", ""));
		}
		return await tablesDB.listRows(DB_ID, USERS_TABLE, queries);
	},
	async searchUsersWithQueries(queries) {
		return await tablesDB.listRows(DB_ID, USERS_TABLE, queries);
	},
	async setProfileDiscoverable(userId, isDiscoverable) {
		const profile = await this.getProfileById(userId);
		if (!profile) throw new Error("Profile not found");
		const permissions = [
			Permission.read(Role.user(userId)),
			Permission.update(Role.user(userId)),
			Permission.delete(Role.user(userId))
		];
		if (isDiscoverable) permissions.push(Permission.read(Role.any()));
		return await tablesDB.updateRow(DB_ID, USERS_TABLE, profile.$id, {}, permissions);
	},
	async setAvatarVisible(userId, fileId, isVisible) {
		const bucketId = APPWRITE_CONFIG.BUCKETS.PROFILE_PICTURES;
		const permissions = [
			Permission.read(Role.user(userId)),
			Permission.update(Role.user(userId)),
			Permission.delete(Role.user(userId))
		];
		if (isVisible) permissions.push(Permission.read(Role.any()));
		await storage.updateFile(bucketId, fileId, void 0, permissions);
		return await this.updateProfile(userId, { avatar: fileId });
	}
};
//#endregion
export { getEcosystemUrl as a, getCachedIdentityByUsername as i, UsersService as n, seedIdentityCache as o, getCachedIdentityById as r, subscribeIdentityCache as s, KYLRIX_AUTH_URI as t };
