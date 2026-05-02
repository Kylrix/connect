import { o as __toESM } from "../_runtime.mjs";
import { i as ID, o as Query } from "../_libs/appwrite.mjs";
import { c as realtime, d as tablesDB, s as getProfilePicturePreview, t as APPWRITE_CONFIG } from "./client-bVtyOxJQ.mjs";
import { n as UsersService, o as seedIdentityCache, r as getCachedIdentityById } from "./users-vRrLGFai.mjs";
import { n as ecosystemSecurity } from "./security-DTzL0999.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { A as CheckCircle_default, H as useTheme, J as alpha, M as Visibility_default, j as VisibilityOff_default, k as Fingerprint_default, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { A as DialogActions, B as Box, C as InputAdornment, E as Drawer, H as Avatar, J as IconButton, K as Typography, O as DialogTitle, V as Badge, Y as CircularProgress, f as Skeleton, j as Dialog, k as DialogContent, n as TextField, s as Stack, t as useMediaQuery, u as Tooltip, z as Button } from "../_libs/@mui/material+[...].mjs";
import { i as useAuth, o as usePathname, s as useRouter, t as ChatService } from "./chat-GLmU6cBO.mjs";
import { B as MessageCircle, U as Lock, ft as Copy, nt as FingerprintPattern, ot as Eye, st as EyeOff } from "../_libs/lucide-react.mjs";
import { n, r as zt } from "../_libs/react-hot-toast.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
import { n as startRegistration, t as startAuthentication } from "../_libs/simplewebauthn__browser.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DynamicIsland-DPFhB0ig.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_STATE = {
	mode: "default",
	label: null,
	dockHeight: 0
};
var AppChromeContext = (0, import_react.createContext)(void 0);
function AppChromeProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(DEFAULT_STATE);
	const pathname = usePathname();
	const setChromeState = import_react.useCallback((next) => {
		setState((current) => {
			const merged = {
				...current,
				...next
			};
			if (merged.mode === current.mode && merged.label === current.label && merged.dockHeight === current.dockHeight) return current;
			return merged;
		});
	}, []);
	const resetChromeState = import_react.useCallback(() => {
		setState(DEFAULT_STATE);
	}, []);
	(0, import_react.useEffect)(() => {
		const mood = pathname?.startsWith("/chat/") || pathname?.startsWith("/post/") ? "focus" : "ambient";
		document.body.dataset.uiMood = mood;
		return () => {
			document.body.dataset.uiMood = "ambient";
		};
	}, [pathname]);
	const value = (0, import_react.useMemo)(() => {
		const headerHeight = (state.mode === "compact" ? 72 : state.mode === "hidden" ? 0 : 88) + state.dockHeight;
		return {
			...state,
			headerHeight,
			setChromeState,
			resetChromeState
		};
	}, [
		resetChromeState,
		setChromeState,
		state
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChromeContext.Provider, {
		value,
		children
	});
}
function useAppChrome() {
	const context = (0, import_react.useContext)(AppChromeContext);
	if (!context) throw new Error("useAppChrome must be used within an AppChromeProvider");
	return context;
}
var DataNexusContext = (0, import_react.createContext)(void 0);
var DEFAULT_TTL = 1e3 * 60 * 30;
var STALE_TTL = DEFAULT_TTL * 8;
function DataNexusProvider({ children }) {
	const memoryCache = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const activeRequests = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const purge = (0, import_react.useCallback)(() => {
		memoryCache.current.clear();
		activeRequests.current.clear();
		console.log("[Nexus-Connect] Volatile memory cache purged.");
	}, []);
	(0, import_react.useEffect)(() => {
		const handleLock = () => {
			purge();
		};
		window.addEventListener("vault-locked", handleLock);
		return () => window.removeEventListener("vault-locked", handleLock);
	}, [purge]);
	const getCachedData = (0, import_react.useCallback)(async function(key, ttl = DEFAULT_TTL) {
		const memoryEntry = memoryCache.current.get(key);
		const now = Date.now();
		if (memoryEntry && now - memoryEntry.timestamp < ttl) return memoryEntry.data;
		if (typeof window !== "undefined") try {
			const persisted = localStorage.getItem(`c_nexus_${key}`);
			if (persisted && ecosystemSecurity.status.isUnlocked) {
				const decrypted = await ecosystemSecurity.decrypt(persisted);
				if (decrypted) {
					const entry = JSON.parse(decrypted);
					if (now - entry.timestamp < ttl) {
						memoryCache.current.set(key, entry);
						return entry.data;
					}
				}
			}
		} catch (_e) {}
		return null;
	}, []);
	const setCachedData = (0, import_react.useCallback)(async function(key, data, _ttl) {
		const entry = {
			data,
			timestamp: Date.now()
		};
		memoryCache.current.set(key, entry);
		if (typeof window !== "undefined" && ecosystemSecurity.status.isUnlocked) try {
			const encrypted = await ecosystemSecurity.encrypt(JSON.stringify(entry));
			localStorage.setItem(`c_nexus_${key}`, encrypted);
		} catch (e) {
			console.warn(`[Nexus-Connect] Persist error for ${key}`, e);
		}
	}, []);
	const invalidate = (0, import_react.useCallback)((key) => {
		memoryCache.current.delete(key);
		activeRequests.current.delete(key);
		if (typeof window !== "undefined") localStorage.removeItem(`c_nexus_${key}`);
	}, []);
	const fetchOptimized = (0, import_react.useCallback)(async function(key, fetcher, ttl = DEFAULT_TTL) {
		const cached = await getCachedData(key, ttl);
		if (cached !== null) return cached;
		const stale = await getCachedData(key, STALE_TTL);
		if (stale) {
			if (!activeRequests.current.has(key)) {
				const request = (async () => {
					try {
						const data = await fetcher();
						await setCachedData(key, data, ttl);
						return data;
					} finally {
						activeRequests.current.delete(key);
					}
				})();
				activeRequests.current.set(key, request);
			}
			return stale;
		}
		const existingRequest = activeRequests.current.get(key);
		if (existingRequest) return existingRequest;
		const request = (async () => {
			try {
				const data = await fetcher();
				await setCachedData(key, data, ttl);
				return data;
			} finally {
				activeRequests.current.delete(key);
			}
		})();
		activeRequests.current.set(key, request);
		return request;
	}, [getCachedData, setCachedData]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataNexusContext.Provider, {
		value: {
			getCachedData,
			setCachedData,
			fetchOptimized,
			invalidate,
			purge
		},
		children
	});
}
function useDataNexus() {
	const context = (0, import_react.useContext)(DataNexusContext);
	if (!context) throw new Error("useDataNexus must be used within DataNexusProvider");
	return context;
}
var DB_ID = APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER;
var KEYCHAIN_TABLE = "keychain";
var KeychainService = {
	async listKeychainEntries(userId) {
		try {
			return (await tablesDB.listRows(DB_ID, KEYCHAIN_TABLE, [Query.equal("userId", userId), Query.orderDesc("$createdAt")])).rows;
		} catch (error) {
			console.error("Failed to list keychain entries:", error);
			return [];
		}
	},
	async hasMasterpass(userId) {
		return (await this.listKeychainEntries(userId)).some((e) => e.type === "password");
	},
	async createKeychainEntry(data) {
		if (data.type === "password" && data.userId) {
			if ((await this.listKeychainEntries(data.userId)).some((e) => e.type === "password")) {
				console.warn("[KeychainService] Blocked attempt to create duplicate master password.");
				throw new Error("KEYCHAIN_ALREADY_EXISTS");
			}
		}
		return await tablesDB.createRow(DB_ID, KEYCHAIN_TABLE, ID.unique(), data);
	},
	async deleteKeychainEntry(id) {
		return await tablesDB.deleteRow(DB_ID, KEYCHAIN_TABLE, id);
	},
	async syncPasskeyStatus(_userId) {}
};
function parsePreferences(preferences) {
	if (!preferences) return {};
	if (typeof preferences === "object") return preferences;
	try {
		return JSON.parse(preferences);
	} catch {
		return {};
	}
}
function toVerificationState(input) {
	if (!input || typeof input !== "object") return {
		verified: false,
		verifiedOn: null,
		checkedAt: null,
		method: null,
		source: null
	};
	return {
		verified: Boolean(input.verified),
		verifiedOn: typeof input.verifiedOn === "string" && input.verifiedOn ? input.verifiedOn : null,
		checkedAt: typeof input.checkedAt === "string" && input.checkedAt ? input.checkedAt : null,
		method: typeof input.method === "string" && input.method ? input.method : null,
		source: typeof input.source === "string" && input.source ? input.source : null
	};
}
function getVerificationState(preferences) {
	return toVerificationState(parsePreferences(preferences).verification);
}
function formatVerificationTooltip(verification) {
	if (verification.verified) {
		const verifiedOn = verification.verifiedOn || verification.checkedAt;
		return verifiedOn ? `Verified on ${new Date(verifiedOn).toLocaleString()}` : "Verified";
	}
	return verification.checkedAt ? `Last checked ${new Date(verification.checkedAt).toLocaleString()}` : "Verification not available";
}
function mergeVerificationPreferences(preferences, verification) {
	const parsed = parsePreferences(preferences);
	const existing = toVerificationState(parsed.verification);
	const checkedAt = verification.checkedAt || (/* @__PURE__ */ new Date()).toISOString();
	const verified = Boolean(verification.verified);
	parsed.verification = {
		...existing,
		...verification,
		verified,
		checkedAt,
		verifiedOn: verified ? verification.verifiedOn || existing.verifiedOn || checkedAt : existing.verifiedOn || null,
		method: verification.method || existing.method || "masterpass",
		source: verification.source || existing.source || "connect"
	};
	return parsed;
}
function buildSafetyWarning(senderName) {
	return `First message from ${senderName}. Kylrix will never ask for passwords, codes, or private details.`;
}
async function syncCurrentUserVerification(userId) {
	if (!userId) return null;
	try {
		const [profile, hasMasterpass] = await Promise.all([UsersService.getProfileById(userId), KeychainService.hasMasterpass(userId).catch(() => false)]);
		const nextPrefs = mergeVerificationPreferences(profile?.preferences || null, {
			verified: hasMasterpass,
			checkedAt: (/* @__PURE__ */ new Date()).toISOString(),
			method: "masterpass",
			source: "connect"
		});
		const updated = await UsersService.updateProfile(userId, { preferences: JSON.stringify(nextPrefs) });
		if (updated) seedIdentityCache(updated);
		return updated || null;
	} catch (error) {
		console.warn("[Verification] Failed to sync current user verification:", error);
		return null;
	}
}
var ProfileContext = (0, import_react.createContext)({
	profile: null,
	isLoading: true,
	refreshProfile: async () => {}
});
var PROFILE_SETUP_KEY = "kylrix_profile_initialized";
var ProfileProvider = ({ children }) => {
	const { user } = useAuth();
	const { fetchOptimized, invalidate } = useDataNexus();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const bootstrapRequestRef = (0, import_react.useRef)(null);
	const queueProfileBootstrap = (0, import_react.useCallback)((currentUser) => {
		if (!currentUser?.$id) return Promise.resolve(null);
		if (bootstrapRequestRef.current) return bootstrapRequestRef.current;
		const request = (async () => {
			const existing = await UsersService.getProfileById(currentUser.$id);
			const ensuredProfile = !existing || !existing.username || !existing.displayName ? await UsersService.ensureProfileForUser(currentUser) : existing;
			if (ecosystemSecurity.status.isUnlocked) return await UsersService.forceSyncProfileWithIdentity(currentUser).catch((error) => {
				console.error("[ProfileProvider] Background E2E sync failed:", error);
				return null;
			}) || ensuredProfile || existing;
			return ensuredProfile || existing;
		})().finally(() => {
			bootstrapRequestRef.current = null;
		});
		bootstrapRequestRef.current = request;
		return request;
	}, []);
	const refreshProfile = (0, import_react.useCallback)(async () => {
		if (!user?.$id) {
			setProfile(null);
			setIsLoading(false);
			return;
		}
		try {
			const setupKey = `${PROFILE_SETUP_KEY}_${user.$id}`;
			const setupComplete = typeof window !== "undefined" && localStorage.getItem(setupKey) === "true";
			const cachedIdentity = getCachedIdentityById(user.$id);
			const cachedProfile = cachedIdentity || await fetchOptimized(`profile_${user.$id}`, async () => {
				const fetched = await UsersService.getProfileById(user.$id);
				if (fetched) seedIdentityCache(fetched);
				return fetched;
			}, 1e3 * 60 * 60);
			if (cachedProfile) {
				if (!cachedIdentity) seedIdentityCache(cachedProfile);
				setProfile(cachedProfile);
				if (typeof window !== "undefined") localStorage.setItem(setupKey, "true");
			}
			if (!(!cachedProfile || !setupComplete || !cachedProfile.username || !cachedProfile.displayName)) {
				setIsLoading(false);
				return;
			}
			try {
				const bootstrappedProfile = await queueProfileBootstrap(user);
				if (bootstrappedProfile) {
					let nextProfile = bootstrappedProfile;
					try {
						const syncedProfile = await syncCurrentUserVerification(user.$id);
						if (syncedProfile) {
							nextProfile = syncedProfile;
							invalidate(`profile_${user.$id}`);
						}
					} catch (error) {
						console.warn("[ProfileProvider] Failed to sync verification state:", error);
					}
					setProfile(nextProfile);
					if (typeof window !== "undefined") localStorage.setItem(setupKey, "true");
				}
			} catch (error) {
				console.error("[ProfileProvider] Failed to bootstrap profile in background:", error);
			}
		} catch (error) {
			console.error("[ProfileProvider] Failed to load/setup profile:", error);
		} finally {
			setIsLoading(false);
		}
	}, [
		user,
		fetchOptimized,
		invalidate,
		queueProfileBootstrap
	]);
	(0, import_react.useEffect)(() => {
		if (!user?.$id) return;
		const setupKey = `${PROFILE_SETUP_KEY}_${user.$id}`;
		return ecosystemSecurity.onStatusChange((status) => {
			if (!status.isUnlocked) return;
			if (typeof window !== "undefined" && localStorage.getItem(setupKey) === "true") return;
			queueProfileBootstrap(user).then(async () => {
				invalidate(`profile_${user.$id}`);
				await refreshProfile();
			}).catch((error) => {
				console.error("[ProfileProvider] Failed to audit E2E identity:", error);
			});
		});
	}, [
		user,
		invalidate,
		refreshProfile,
		queueProfileBootstrap
	]);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setProfile(null);
			setIsLoading(false);
			return;
		}
		refreshProfile();
	}, [user, refreshProfile]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileContext.Provider, {
		value: {
			profile,
			isLoading,
			refreshProfile: async () => {
				if (user?.$id) invalidate(`profile_${user.$id}`);
				await refreshProfile();
			}
		},
		children
	});
};
var useProfile = () => (0, import_react.useContext)(ProfileContext);
var ChatNotificationContext = (0, import_react.createContext)(void 0);
function ChatNotificationProvider({ children }) {
	const { user } = useAuth();
	const [unreadConversations, setUnreadConversations] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [lastMessage, setLastMessage] = (0, import_react.useState)(null);
	const [scanComplete, setScanComplete] = (0, import_react.useState)(false);
	const [activeNotification, setActiveNotification] = (0, import_react.useState)(null);
	const replyHistoryCache = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const [hasCheckedSession, setHasCheckedSession] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (user?.$id && !hasCheckedSession) {
			if (sessionStorage.getItem(`chat_scan_${user.$id}`)) setTimeout(() => setScanComplete(true), 0);
			setTimeout(() => setHasCheckedSession(true), 0);
		}
	}, [user?.$id, hasCheckedSession]);
	(0, import_react.useEffect)(() => {
		replyHistoryCache.current = /* @__PURE__ */ new Map();
	}, [user?.$id]);
	const showDynamicIsland = (0, import_react.useCallback)(async (message) => {
		if (!user || message.senderId === user.$id) return;
		try {
			const profile = getCachedIdentityById(message.senderId) || await UsersService.getProfileById(message.senderId);
			if (profile) seedIdentityCache(profile);
			const senderName = profile?.displayName || profile?.username || "Someone";
			const senderVerification = getVerificationState(profile?.preferences || null);
			let hasReplied = replyHistoryCache.current.get(message.conversationId);
			if (hasReplied === void 0) {
				try {
					if ((await ChatService.getConversationById(message.conversationId, user.$id))?.type === "direct") hasReplied = (await ChatService.getMessages(message.conversationId, 50, 0, user.$id)).rows.some((row) => row.senderId === user.$id);
					else hasReplied = true;
				} catch {
					hasReplied = true;
				}
				replyHistoryCache.current.set(message.conversationId, Boolean(hasReplied));
			}
			let content = message.content;
			const isEncrypted = message.content?.length > 40 && !message.content?.includes(" ");
			if (isEncrypted) if (ecosystemSecurity.status.isUnlocked) {
				const convKey = ecosystemSecurity.getConversationKey(message.conversationId);
				try {
					content = convKey ? await ecosystemSecurity.decryptWithKey(message.content, convKey) : await ecosystemSecurity.decrypt(message.content);
				} catch {
					content = "Encrypted message";
				}
			} else content = "Encrypted message";
			const shouldWarn = !senderVerification.verified && hasReplied === false;
			setActiveNotification({
				id: message.$id,
				senderName: shouldWarn ? `First message from ${senderName}` : senderName,
				content: shouldWarn ? buildSafetyWarning(senderName) : content,
				avatar: profile?.avatar || void 0,
				isEncrypted: isEncrypted && !ecosystemSecurity.status.isUnlocked
			});
			setTimeout(() => {
				setActiveNotification((prev) => prev?.id === message.$id ? null : prev);
			}, 5e3);
		} catch (err) {
			console.warn("[ChatNotification] Failed to show island:", err);
		}
	}, [user]);
	const performProactiveScan = (0, import_react.useCallback)(async () => {
		if (!user?.$id || scanComplete) return;
		console.log("[ChatNotification] Performing one-time proactive scan...");
		try {
			const res = await ChatService.getConversations(user.$id);
			const unread = /* @__PURE__ */ new Set();
			res.rows.forEach((conv) => {
				if (conv.lastMessageAt && (!conv.lastReadAt || new Date(conv.lastMessageAt) > new Date(conv.lastReadAt))) {
					if (conv.lastMessageSenderId !== user.$id) unread.add(conv.$id);
				}
			});
			setUnreadConversations(unread);
			setScanComplete(true);
			sessionStorage.setItem(`chat_scan_${user.$id}`, "true");
		} catch (err) {
			console.error("[ChatNotification] Proactive scan failed:", err);
		}
	}, [user, scanComplete]);
	const markConversationRead = (0, import_react.useCallback)((conversationId) => {
		if (!user?.$id) return;
		setUnreadConversations((prev) => {
			if (!prev.has(conversationId)) return prev;
			const next = new Set(prev);
			next.delete(conversationId);
			return next;
		});
	}, [user?.$id]);
	(0, import_react.useEffect)(() => {
		if (user?.$id && hasCheckedSession && !scanComplete) if (!sessionStorage.getItem(`chat_scan_${user.$id}`)) setTimeout(() => performProactiveScan(), 0);
		else setTimeout(() => setScanComplete(true), 0);
	}, [
		user?.$id,
		hasCheckedSession,
		scanComplete,
		performProactiveScan
	]);
	(0, import_react.useEffect)(() => {
		if (!user?.$id) return;
		const channel = `databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.MESSAGES}.rows`;
		const unsub = realtime.subscribe([channel], (response) => {
			if (response.events.some((e) => e.includes(".create"))) {
				const payload = response.payload;
				if (payload.senderId === user.$id) {
					replyHistoryCache.current.set(payload.conversationId, true);
					return;
				}
				if (payload.senderId !== user.$id) {
					console.log("[ChatNotification] New message received:", payload.$id);
					setLastMessage(payload);
					setUnreadConversations((prev) => new Set(prev).add(payload.conversationId));
					showDynamicIsland(payload);
				}
			}
		});
		return () => {
			if (typeof unsub === "function") unsub();
			else unsub?.unsubscribe?.();
		};
	}, [user?.$id, showDynamicIsland]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChatNotificationContext.Provider, {
		value: {
			unreadConversations,
			lastMessage,
			scanComplete,
			markConversationRead
		},
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activeNotification && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			sx: {
				position: "fixed",
				top: 20,
				left: "50%",
				transform: "translateX(-50%)",
				zIndex: 9999,
				pointerEvents: "none"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: -100,
					scale: .8
				},
				animate: {
					opacity: 1,
					y: 0,
					scale: 1
				},
				exit: {
					opacity: 0,
					y: -100,
					scale: .8
				},
				transition: {
					type: "spring",
					damping: 18,
					stiffness: 150
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						minWidth: 200,
						maxWidth: 400,
						bgcolor: "rgba(10, 10, 10, 0.9)",
						backdropFilter: "blur(20px) saturate(180%)",
						borderRadius: "30px",
						border: "1px solid rgba(255, 255, 255, 0.1)",
						boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(99, 102, 241, 0.2)",
						p: 1,
						px: 2,
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						pointerEvents: "auto",
						cursor: "pointer"
					},
					onClick: () => {
						window.location.href = `/chat/${activeNotification.id}`;
						setActiveNotification(null);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							overlap: "circular",
							anchorOrigin: {
								vertical: "bottom",
								horizontal: "right"
							},
							badgeContent: activeNotification.isEncrypted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									bgcolor: "#6366F1",
									borderRadius: "50%",
									p: .2,
									display: "flex",
									border: "1px solid #000"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									size: 8,
									color: "white"
								})
							}) : null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								src: activeNotification.avatar,
								sx: {
									width: 32,
									height: 32,
									bgcolor: alpha("#6366F1", .2),
									color: "#6366F1",
									fontWeight: 800,
									fontSize: "0.8rem"
								},
								children: activeNotification.senderName[0]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								flex: 1,
								minWidth: 0
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "caption",
								sx: {
									fontWeight: 900,
									color: "#6366F1",
									display: "block",
									lineHeight: 1,
									mb: .5,
									textTransform: "uppercase",
									letterSpacing: .5
								},
								children: activeNotification.senderName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								noWrap: true,
								sx: {
									color: "white",
									fontWeight: 600,
									fontSize: "0.85rem",
									opacity: .9
								},
								children: activeNotification.content
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								bgcolor: alpha("#6366F1", .1),
								p: .8,
								borderRadius: "50%",
								display: "flex"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
								size: 16,
								color: "#6366F1"
							})
						})
					]
				})
			})
		}) })]
	});
}
function useChatNotifications() {
	const context = (0, import_react.useContext)(ChatNotificationContext);
	if (context === void 0) throw new Error("useChatNotifications must be used within a ChatNotificationProvider");
	return context;
}
var PotatoContext = (0, import_react.createContext)(void 0);
function makeId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function normalizeQuery(query) {
	return query.trim().toLowerCase();
}
function routeLabelFromPath(pathname) {
	if (!pathname) return "Connect";
	if (pathname === "/" || pathname === "/landing") return "Landing";
	if (pathname === "/chats") return "Chats";
	if (pathname.startsWith("/chat/")) return "Chat";
	if (pathname === "/moments" || pathname.startsWith("/post/")) return "Feed";
	if (pathname === "/calls" || pathname.startsWith("/call/")) return "Calls";
	if (pathname === "/settings") return "Settings";
	return "Connect";
}
function routeSnippets(pathname, user) {
	user?.name || user?.email;
	if (!pathname) return [{
		id: "connect-default",
		kind: "context",
		title: "Connect is ready",
		description: "Securely communicate with your ecosystem nodes."
	}];
	if (pathname === "/chats") return [{
		id: "chats-active",
		kind: "chat",
		title: "Conversations",
		description: "Encrypted channels for private and group relay."
	}];
	if (pathname === "/settings") return [{
		id: "settings-profile",
		kind: "settings",
		title: "Connect Settings",
		description: "Manage your social graph and relay preferences."
	}];
	return [{
		id: "connect-default",
		kind: "context",
		title: "Connect context",
		description: "Search messages, moments, and ecosystem links."
	}];
}
function matchesTerms(query, terms) {
	return terms.some((term) => term.includes(query) || query.includes(term));
}
function buildSurface(query, routeLabel, snippets) {
	const normalized = normalizeQuery(query);
	const quickActions = [
		{
			id: "new-chat",
			kind: "chat",
			title: "Start a conversation",
			description: "Open a new encrypted channel with a contact.",
			href: "/chats",
			accent: "#F59E0B",
			terms: [
				"chat",
				"message",
				"conversation",
				"private"
			],
			onSelect: () => window.location.assign("/chats")
		},
		{
			id: "new-call",
			kind: "call",
			title: "Initiate a huddle",
			description: "Start a live voice or video session.",
			href: "/calls",
			accent: "#6366F1",
			terms: [
				"call",
				"huddle",
				"voice",
				"video"
			],
			onSelect: () => window.location.assign("/calls")
		},
		{
			id: "browse-moments",
			kind: "post",
			title: "Open Moments Feed",
			description: "Stay updated with your ecosystem activity.",
			href: "/moments",
			accent: "#EC4899",
			terms: [
				"feed",
				"moments",
				"post",
				"social"
			],
			onSelect: () => window.location.assign("/moments")
		}
	];
	const searchTargets = [
		{
			id: "search-chats",
			kind: "chat",
			title: "Search chats",
			description: "Find past messages and group threads.",
			href: `/chats?search=${encodeURIComponent(query)}`,
			accent: "#F59E0B",
			terms: [
				"chat",
				"message",
				"history"
			],
			onSelect: () => window.location.assign(`/chats?search=${encodeURIComponent(query)}`)
		},
		{
			id: "search-moments",
			kind: "post",
			title: "Search moments",
			description: "Find shared posts and ecosystem signals.",
			href: `/moments?search=${encodeURIComponent(query)}`,
			accent: "#EC4899",
			terms: [
				"moment",
				"post",
				"feed"
			],
			onSelect: () => window.location.assign(`/moments?search=${encodeURIComponent(query)}`)
		},
		{
			id: "search-settings",
			kind: "settings",
			title: "Search settings",
			description: "Jump to relay or privacy controls.",
			href: `/settings?search=${encodeURIComponent(query)}`,
			accent: "#6366F1",
			terms: [
				"setting",
				"settings",
				"privacy",
				"account"
			],
			onSelect: () => window.location.assign(`/settings?search=${encodeURIComponent(query)}`)
		}
	];
	const pool = [...quickActions, ...searchTargets];
	const filtered = normalized ? pool.filter((item) => matchesTerms(normalized, item.terms)) : pool;
	return {
		routeLabel,
		currentApp: "connect",
		snippets,
		quickActions: (normalized ? filtered : quickActions).slice(0, 5),
		searchTargets: (normalized ? filtered : searchTargets).slice(0, 6)
	};
}
function PotatoProvider({ children }) {
	const pathname = usePathname();
	const { user } = useAuth();
	const [snippets, setSnippets] = (0, import_react.useState)(() => routeSnippets(pathname, user));
	(0, import_react.useEffect)(() => {
		setSnippets(routeSnippets(pathname, user));
	}, [pathname, user]);
	const pushSnippet = (0, import_react.useCallback)((snippet) => {
		const id = makeId(snippet.kind);
		setSnippets((current) => [...current, {
			...snippet,
			id
		}]);
		return id;
	}, []);
	const clearSnippets = (0, import_react.useCallback)(() => {
		setSnippets(routeSnippets(pathname, user));
	}, [pathname, user]);
	const value = (0, import_react.useMemo)(() => ({
		routeLabel: routeLabelFromPath(pathname),
		currentApp: "connect",
		snippets,
		pushSnippet,
		clearSnippets,
		buildSearchSurface: (query) => buildSurface(query, routeLabelFromPath(pathname), snippets)
	}), [
		clearSnippets,
		pathname,
		pushSnippet,
		snippets
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PotatoContext.Provider, {
		value,
		children
	});
}
function usePotato() {
	const context = (0, import_react.useContext)(PotatoContext);
	if (!context) throw new Error("usePotato must be used within a PotatoProvider");
	return context;
}
var Logo = ({ sx, size = 40, app = "root", variant = "full", component, href, animate = false }) => {
	const isDarkMode = useTheme().palette.mode === "dark";
	const appColors = {
		root: {
			primary: "#6366F1",
			secondary: "#6366F1",
			label: "KYLRIX"
		},
		vault: {
			primary: "#6366F1",
			secondary: "#10B981",
			label: "VAULT"
		},
		flow: {
			primary: "#6366F1",
			secondary: "#A855F7",
			label: "FLOW"
		},
		note: {
			primary: "#6366F1",
			secondary: "#EC4899",
			label: "NOTE"
		},
		connect: {
			primary: "#6366F1",
			secondary: "#F59E0B",
			label: "CONNECT"
		}
	};
	const current = appColors[app] || appColors.root;
	const leftColor = current.secondary;
	const rightColor = app === "root" ? isDarkMode ? "#FFFFFF" : "#000000" : current.primary;
	const cutoutColor = isDarkMode ? "#0A0908" : "#FFFFFF";
	const renderCutout = () => {
		switch (app) {
			case "note": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "38",
				y: "38",
				width: "24",
				height: "24",
				fill: cutoutColor,
				transform: "rotate(45 50 50)"
			});
			case "vault": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "38",
				y: "38",
				width: "24",
				height: "24",
				fill: cutoutColor,
				transform: "rotate(45 50 50)"
			});
			case "flow": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "42,38 62,50 42,62",
				fill: cutoutColor
			});
			case "connect": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "38",
				y: "38",
				width: "24",
				height: "24",
				fill: cutoutColor,
				transform: "rotate(45 50 50)"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "50,38 62,50 50,62 38,50",
				fill: cutoutColor
			});
		}
	};
	const Hexagon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.svg, {
		viewBox: "0 0 100 100",
		width: size,
		height: size,
		animate: animate ? { rotate: 360 } : {},
		transition: animate ? {
			repeat: Infinity,
			duration: 8,
			ease: "linear"
		} : {},
		style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "50,10 15,30 15,70 50,90",
				fill: leftColor,
				style: { transition: "fill 0.4s ease" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "50,10 85,30 85,70 50,90",
				fill: rightColor,
				style: { transition: "fill 0.4s ease" }
			}),
			renderCutout()
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			display: "inline-flex",
			alignItems: "center",
			gap: "12px",
			transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
			textDecoration: "none",
			...sx
		},
		component,
		href,
		children: [Hexagon, variant === "full" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			sx: { display: {
				xs: "none",
				sm: "block"
			} },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				sx: {
					fontWeight: 900,
					letterSpacing: "-0.04em",
					color: isDarkMode ? "#fff" : "#000",
					fontSize: `${size * .7}px`,
					lineHeight: 1,
					textTransform: "uppercase",
					fontFamily: "var(--font-clash)"
				},
				children: current.label
			})
		})]
	});
};
/**
* Unlocks the ecosystem security (MEK) using a registered passkey.
*/
async function unlockWithPasskey(userId) {
	try {
		const passkeyEntries = (await KeychainService.listKeychainEntries(userId)).filter((k) => k.type === "passkey");
		if (passkeyEntries.length === 0) {
			zt.error("No passkeys registered for this account.");
			return false;
		}
		const challenge = crypto.getRandomValues(new Uint8Array(32));
		const authResp = await startAuthentication({ optionsJSON: {
			challenge: btoa(String.fromCharCode(...challenge)),
			rpId: "kylrix.space",
			allowCredentials: passkeyEntries.map((entry) => ({
				id: entry.credentialId,
				type: "public-key",
				transports: [
					"internal",
					"usb",
					"nfc",
					"ble"
				]
			})),
			userVerification: "preferred",
			timeout: 6e4
		} });
		const matchingEntry = passkeyEntries.find((e) => e.credentialId === authResp.id);
		if (!matchingEntry) {
			zt.error("Authenticated with an unregistered passkey.");
			return false;
		}
		const credentialData = new TextEncoder().encode(authResp.id + userId);
		const kwrapSeed = await crypto.subtle.digest("SHA-256", credentialData);
		const kwrap = await crypto.subtle.importKey("raw", kwrapSeed, { name: "AES-GCM" }, false, ["decrypt"]);
		const wrappedKeyBytes = new Uint8Array(atob(matchingEntry.wrappedKey).split("").map((c) => c.charCodeAt(0)));
		const iv = wrappedKeyBytes.slice(0, 12);
		const ciphertext = wrappedKeyBytes.slice(12);
		const mekBytes = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv
		}, kwrap, ciphertext);
		if (await ecosystemSecurity.importMasterKey(mekBytes)) {
			zt.success("Vault unlocked via Passkey");
			return true;
		}
		return false;
	} catch (error) {
		const err = error;
		if (err.name === "NotAllowedError") return false;
		console.error("Passkey unlock failed", err);
		zt.error(`Passkey unlock failed: ${err.message}`);
		return false;
	}
}
function arrayBufferToBase64(buffer) {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
	return window.btoa(binary);
}
function PasskeySetup({ isOpen, onClose, onSkip, userId, onSuccess, trustUnlocked = false }) {
	const muiTheme = useTheme();
	const [step, setStep] = (0, import_react.useState)(trustUnlocked && ecosystemSecurity.status.isUnlocked ? 2 : 1);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [masterPassword, setMasterPassword] = (0, import_react.useState)("");
	const [passkeyName, setPasskeyName] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchUsername = async () => {
			try {
				const { rows } = await tablesDB.listRows(APPWRITE_CONFIG.DATABASES.CHAT, APPWRITE_CONFIG.TABLES.CHAT.PROFILES, [Query.equal("userId", userId), Query.limit(1)]);
				if (rows.length > 0 && rows[0].username) setUsername(rows[0].username);
			} catch (error) {
				console.error("Failed to fetch username:", error);
			}
		};
		fetchUsername();
	}, [userId]);
	const verifyMasterPassword = async () => {
		if (!await KeychainService.hasMasterpass(userId)) {
			zt.error("You must set a master password before adding a passkey.");
			onClose();
			return false;
		}
		if (!masterPassword.trim()) {
			zt.error("Please enter your master password.");
			return false;
		}
		try {
			const passwordEntry = (await KeychainService.listKeychainEntries(userId)).find((e) => e.type === "password");
			if (!passwordEntry) {
				zt.error("No master password setup found.");
				return false;
			}
			if (await ecosystemSecurity.unlock(masterPassword, passwordEntry)) return true;
			else {
				zt.error("Incorrect master password.");
				return false;
			}
		} catch (error) {
			console.error("Password verification failed:", error);
			zt.error("Failed to verify master password.");
			return false;
		}
	};
	const handleContinueToName = async () => {
		if (await verifyMasterPassword()) setStep(2);
	};
	const handleContinueToCreate = () => {
		if (!passkeyName.trim()) {
			zt.error("Please name your passkey.");
			return;
		}
		setStep(3);
	};
	const handleCreate = async () => {
		setLoading(true);
		try {
			const masterKey = ecosystemSecurity.getMasterKey();
			if (!masterKey) throw new Error("Vault is locked. Please enter master password.");
			const regResp = await startRegistration({ optionsJSON: {
				challenge: arrayBufferToBase64(crypto.getRandomValues(new Uint8Array(32)).buffer),
				rp: {
					name: "Kylrix",
					id: "kylrix.space"
				},
				user: {
					id: arrayBufferToBase64(new TextEncoder().encode(username || userId).buffer),
					name: username || userId,
					displayName: username || userId
				},
				pubKeyCredParams: [{
					alg: -7,
					type: "public-key"
				}, {
					alg: -257,
					type: "public-key"
				}],
				authenticatorSelection: {
					authenticatorAttachment: "platform",
					residentKey: "required",
					userVerification: "preferred"
				},
				timeout: 6e4,
				attestation: "none"
			} });
			const credentialData = new TextEncoder().encode(regResp.id + userId);
			const kwrapSeed = await crypto.subtle.digest("SHA-256", credentialData);
			const kwrap = await crypto.subtle.importKey("raw", kwrapSeed, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
			const rawMasterKey = await crypto.subtle.exportKey("raw", masterKey);
			const iv = crypto.getRandomValues(new Uint8Array(12));
			const encryptedMasterKey = await crypto.subtle.encrypt({
				name: "AES-GCM",
				iv
			}, kwrap, rawMasterKey);
			const combined = new Uint8Array(iv.length + encryptedMasterKey.byteLength);
			combined.set(iv);
			combined.set(new Uint8Array(encryptedMasterKey), iv.length);
			const passkeyBlob = arrayBufferToBase64(combined.buffer);
			await KeychainService.createKeychainEntry({
				userId,
				type: "passkey",
				credentialId: regResp.id,
				wrappedKey: passkeyBlob,
				salt: "",
				params: JSON.stringify({
					name: passkeyName,
					publicKey: regResp.response.publicKey || "",
					counter: 0,
					transports: regResp.response.transports || [],
					created: (/* @__PURE__ */ new Date()).toISOString(),
					rpId: "kylrix.space"
				}),
				isBackup: false
			});
			setStep(4);
		} catch (error) {
			console.error("Passkey setup failed:", error);
			const message = error.name === "InvalidStateError" ? "This passkey is already registered." : error instanceof Error ? error.message : "Unknown error";
			zt.error(`Failed to create passkey: ${message}`);
		}
		setLoading(false);
	};
	const resetDialog = () => {
		setStep(1);
		setLoading(false);
		setMasterPassword("");
		setPasskeyName("");
		setShowPassword(false);
	};
	const handleClose = () => {
		resetDialog();
		onClose();
	};
	const handleSkip = () => {
		if (userId) localStorage.setItem(`passkey_skip_${userId}`, Date.now().toString());
		resetDialog();
		if (typeof onSkip === "function") {
			onSkip();
			return;
		}
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: isOpen,
		onClose: handleClose,
		PaperProps: { sx: {
			borderRadius: "28px",
			bgcolor: "rgba(10, 10, 10, 0.9)",
			backdropFilter: "blur(25px) saturate(180%)",
			border: "1px solid rgba(255, 255, 255, 0.1)",
			backgroundImage: "none",
			width: "100%",
			maxWidth: "400px"
		} },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				sx: {
					fontWeight: 900,
					fontFamily: "var(--font-space-grotesk)",
					textAlign: "center",
					pt: 4,
					pb: 1
				},
				children: "Add New Passkey"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: { py: 2 },
				children: [
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						spacing: 3,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: { textAlign: "center" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "subtitle1",
								sx: {
									fontWeight: 700,
									mb: 1
								},
								children: "Step 1: Verify Master Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: { color: "text.secondary" },
								children: "Please verify your master password to continue."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							fullWidth: true,
							type: showPassword ? "text" : "password",
							placeholder: "Master Password",
							value: masterPassword,
							onChange: (e) => setMasterPassword(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleContinueToName(),
							variant: "filled",
							InputProps: {
								disableUnderline: true,
								sx: {
									borderRadius: "16px",
									bgcolor: "rgba(255, 255, 255, 0.05)"
								},
								endAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									onClick: () => setShowPassword(!showPassword),
									edge: "end",
									sx: { color: "text.secondary" },
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisibilityOff_default, { sx: { fontSize: 18 } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Visibility_default, { sx: { fontSize: 18 } })
								})
							}
						})]
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						spacing: 3,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: { textAlign: "center" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "subtitle1",
								sx: {
									fontWeight: 700,
									mb: 1
								},
								children: "Step 2: Name Passkey"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: { color: "text.secondary" },
								children: "Give this passkey a name to identify it later."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							fullWidth: true,
							placeholder: "Passkey Name",
							value: passkeyName,
							onChange: (e) => setPasskeyName(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleContinueToCreate(),
							variant: "filled",
							autoFocus: true,
							InputProps: {
								disableUnderline: true,
								sx: {
									borderRadius: "16px",
									bgcolor: "rgba(255, 255, 255, 0.05)"
								}
							}
						})]
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						spacing: 3,
						sx: { textAlign: "center" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "subtitle1",
								sx: {
									fontWeight: 700,
									mb: 1
								},
								children: "Step 3: Create Passkey"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									color: "text.secondary",
									mb: 2
								},
								children: "Click “Create Passkey” and follow your device’s prompts."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
								sx: {
									p: 2,
									borderRadius: "16px",
									bgcolor: "rgba(0, 240, 255, 0.05)",
									border: "1px dashed rgba(0, 240, 255, 0.2)",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: 1
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint_default, { sx: {
									fontSize: 32,
									color: muiTheme.palette.primary.main
								} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "primary.main",
										fontWeight: 600
									},
									children: "Face ID • Touch ID • Windows Hello"
								})]
							})
						] })
					}),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						spacing: 3,
						sx: {
							textAlign: "center",
							py: 2
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								width: 64,
								height: 64,
								borderRadius: "50%",
								bgcolor: "rgba(76, 175, 80, 0.1)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								mx: "auto",
								mb: 1
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCircle_default, { sx: {
								fontSize: 32,
								color: "#4CAF50"
							} })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "h6",
							sx: {
								fontWeight: 800,
								color: "#4CAF50",
								mb: 1
							},
							children: "Passkey Added!"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
							variant: "body2",
							sx: { color: "text.secondary" },
							children: [
								"You can now use ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: passkeyName }),
								" to unlock your session."
							]
						})] })]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogActions, {
				sx: {
					p: 4,
					pt: 0,
					gap: 1.5
				},
				children: [
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleSkip,
						variant: "outlined",
						fullWidth: true,
						sx: {
							borderRadius: "12px",
							color: "text.secondary",
							borderColor: "rgba(255,255,255,0.1)"
						},
						children: "Skip"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleContinueToCreate,
						disabled: !passkeyName.trim(),
						variant: "contained",
						fullWidth: true,
						sx: { borderRadius: "12px" },
						children: "Continue"
					})] }),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outlined",
						onClick: () => setStep(2),
						disabled: loading,
						fullWidth: true,
						sx: {
							borderRadius: "12px",
							color: "text.secondary",
							borderColor: "rgba(255,255,255,0.1)"
						},
						children: "Back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleCreate,
						disabled: loading,
						variant: "contained",
						fullWidth: true,
						sx: { borderRadius: "12px" },
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 20 }) : "Create Passkey"
					})] }),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							onSuccess();
							handleClose();
						},
						variant: "contained",
						fullWidth: true,
						sx: { borderRadius: "12px" },
						children: "Done"
					})
				]
			})
		]
	});
}
function SudoModal({ isOpen, onSuccess, onCancel: _onCancel, intent }) {
	const { user } = useAuth();
	const isDesktop = useMediaQuery(useTheme().breakpoints.up("md"));
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [passkeyLoading, setPasskeyLoading] = (0, import_react.useState)(false);
	const [hasPasskey, setHasPasskey] = (0, import_react.useState)(false);
	const [hasMasterpass, setHasMasterpass] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)(null);
	const [isDetecting, setIsDetecting] = (0, import_react.useState)(true);
	const [showPasskeyIncentive, setShowPasskeyIncentive] = (0, import_react.useState)(false);
	const handleSuccessWithSync = (0, import_react.useCallback)(async () => {
		if (user?.$id) try {
			if (intent !== "reset") {
				console.log("[Connect] Scheduling profile and identity synchronization...");
				UsersService.ensureProfileForUser(user).then(() => UsersService.forceSyncProfileWithIdentity(user)).catch((e) => console.error("[Connect] Failed to sync profile and identity", e));
			}
			if (!(await KeychainService.listKeychainEntries(user.$id)).some((e) => e.type === "passkey")) {
				const skipTimestamp = localStorage.getItem(`passkey_skip_${user.$id}`);
				if (!skipTimestamp || Date.now() - parseInt(skipTimestamp) > 10080 * 60 * 1e3) {
					setShowPasskeyIncentive(true);
					onSuccess();
					return;
				}
			}
		} catch (e) {
			console.error("[Connect] Failed to sync identity on unlock", e);
		}
		onSuccess();
	}, [
		user,
		onSuccess,
		intent
	]);
	const handleRedirectToVaultSetup = (0, import_react.useCallback)(() => {
		const callbackUrl = encodeURIComponent(window.location.href);
		window.location.href = `https://vault.kylrix.space/masterpass?callbackUrl=${callbackUrl}`;
	}, []);
	const handlePasswordVerify = async (e) => {
		e.preventDefault();
		if (!user?.$id) return;
		if (hasMasterpass === false) {
			handleRedirectToVaultSetup();
			return;
		}
		setLoading(true);
		try {
			const keychain = await ecosystemSecurity.fetchKeychain(user.$id);
			if (!keychain) {
				setHasMasterpass(false);
				handleRedirectToVaultSetup();
				setLoading(false);
				return;
			}
			if (await ecosystemSecurity.unlock(password, keychain)) handleSuccessWithSync();
			else n.error("Invalid Master Password");
		} catch (_e) {
			n.error("Verification failed");
		} finally {
			setLoading(false);
		}
	};
	const handlePasskeyVerify = (0, import_react.useCallback)(async () => {
		if (!user?.$id || !isOpen) return;
		setPasskeyLoading(true);
		try {
			if (await unlockWithPasskey(user.$id) && isOpen) {
				n.success("Verified via Passkey");
				handleSuccessWithSync();
			}
		} catch (e) {
			console.error("Passkey verification failed or cancelled", e);
		} finally {
			setPasskeyLoading(false);
		}
	}, [
		user?.$id,
		isOpen,
		handleSuccessWithSync
	]);
	(0, import_react.useEffect)(() => {
		if (isOpen && user?.$id) {
			const isKylrixDomain = typeof window !== "undefined" && (window.location.hostname === "kylrix.space" || window.location.hostname.endsWith(".kylrix.space"));
			KeychainService.listKeychainEntries(user.$id).then((entries) => {
				const passkeyPresent = entries.some((e) => e.type === "passkey");
				const passwordPresent = entries.some((e) => e.type === "password");
				const effectivePasskeyPresent = passkeyPresent && isKylrixDomain;
				setHasPasskey(effectivePasskeyPresent);
				setHasMasterpass(passwordPresent);
				if (intent === "initialize") {
					if (passwordPresent) {
						n.error("MasterPass already set");
						setMode("password");
					} else handleRedirectToVaultSetup();
					setIsDetecting(false);
					return;
				}
				if (intent === "reset") {
					setMode(effectivePasskeyPresent ? "passkey" : "password");
					setIsDetecting(false);
					return;
				}
				if (!passwordPresent && isOpen) {
					handleRedirectToVaultSetup();
					setIsDetecting(false);
					return;
				}
				setMode(effectivePasskeyPresent ? "passkey" : "password");
				setIsDetecting(false);
			}).catch(() => {
				setIsDetecting(false);
				setMode("password");
			});
			setPassword("");
			setLoading(false);
			setPasskeyLoading(false);
			setIsDetecting(true);
		}
	}, [
		isOpen,
		user?.$id,
		intent,
		handleRedirectToVaultSetup
	]);
	(0, import_react.useEffect)(() => {
		if (isOpen && mode === "passkey" && hasPasskey) handlePasskeyVerify();
	}, [
		isOpen,
		mode,
		hasPasskey,
		handlePasskeyVerify
	]);
	if (showPasskeyIncentive && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasskeySetup, {
		isOpen: true,
		onClose: () => {
			setShowPasskeyIncentive(false);
		},
		onSkip: () => {
			setShowPasskeyIncentive(false);
			onSuccess();
		},
		userId: user.$id,
		onSuccess: () => {
			setShowPasskeyIncentive(false);
			onSuccess();
		},
		trustUnlocked: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		open: isOpen,
		onClose: () => {},
		anchor: isDesktop ? "right" : "bottom",
		ModalProps: { keepMounted: true },
		sx: { zIndex: 2200 },
		PaperProps: { sx: {
			borderTopLeftRadius: isDesktop ? "32px" : "32px",
			borderTopRightRadius: isDesktop ? 0 : "32px",
			borderBottomLeftRadius: isDesktop ? "32px" : 0,
			borderBottomRightRadius: 0,
			bgcolor: "#0A0908",
			backdropFilter: "none",
			border: "1px solid rgba(255, 255, 255, 0.08)",
			backgroundImage: "none",
			boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)",
			width: "100%",
			maxWidth: "100vw",
			overflow: "hidden",
			display: "flex",
			flexDirection: "column",
			height: isDesktop ? "100dvh" : "auto",
			maxHeight: isDesktop ? "100dvh" : "calc(100dvh - 12px)"
		} },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
                @keyframes race {
                    from { stroke-dashoffset: 240; }
                    to { stroke-dashoffset: 0; }
                }
                @keyframes pulse-hex {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
            ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				component: "div",
				sx: {
					textAlign: "center",
					pt: 5,
					pb: 1,
					position: "relative",
					bgcolor: "#0A0908"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							position: "absolute",
							top: -32,
							left: "50%",
							transform: "translateX(-50%)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: { position: "relative" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								variant: "icon",
								size: 64,
								app: "connect",
								sx: {
									borderRadius: "18px",
									border: "2px solid rgba(255, 255, 255, 0.1)",
									boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
									bgcolor: "#0A0908"
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									position: "absolute",
									bottom: -6,
									right: -6,
									width: 28,
									height: 28,
									borderRadius: "8px",
									bgcolor: "#6366F1",
									color: "white",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
									border: "3px solid #0a0a0a",
									zIndex: 1
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									size: 14,
									strokeWidth: 3
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h5",
						sx: {
							fontWeight: 900,
							letterSpacing: "-0.04em",
							fontFamily: "var(--font-clash)",
							color: "white",
							mt: 4
						},
						children: user?.name || "User"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							color: "rgba(255, 255, 255, 0.4)",
							mt: 1,
							fontFamily: "var(--font-satoshi)",
							fontWeight: 600
						},
						children: "Enter MasterPass to continue"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				sx: {
					pb: 4,
					flex: "1 1 auto",
					minHeight: 0,
					overflowY: "auto",
					scrollbarGutter: "stable",
					bgcolor: "#0A0908"
				},
				children: isDetecting || loading && !password ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						display: "flex",
						justifyContent: "center",
						py: 4
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { sx: { color: "#6366F1" } })
				}) : mode === "passkey" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					spacing: 3,
					sx: {
						mt: 2,
						alignItems: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							onClick: handlePasskeyVerify,
							sx: {
								width: 80,
								height: 80,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								position: "relative",
								transition: "all 0.3s ease",
								"&:hover": { transform: "scale(1.05)" }
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "80",
								height: "80",
								viewBox: "0 0 80 80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M40 5 L70 22.5 L70 57.5 L40 75 L10 57.5 L10 22.5 Z",
										fill: "transparent",
										stroke: "rgba(255, 255, 255, 0.1)",
										strokeWidth: "2",
										strokeDasharray: "4 4"
									}),
									passkeyLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M40 5 L70 22.5 L70 57.5 L40 75 L10 57.5 L10 22.5 Z",
										fill: "transparent",
										stroke: "url(#racingGradient)",
										strokeWidth: "3",
										strokeDasharray: "60 180",
										style: { animation: "race 2s linear infinite" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "racingGradient",
										x1: "0%",
										y1: "0%",
										x2: "100%",
										y2: "0%",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#6366F1"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#4F46E5"
										})]
									}) })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									position: "absolute",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									animation: passkeyLoading ? "pulse-hex 2s infinite ease-in-out" : "none"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, {
									size: 32,
									color: passkeyLoading ? "#6366F1" : "rgba(255, 255, 255, 0.4)"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								color: "rgba(255, 255, 255, 0.3)",
								fontWeight: 600,
								letterSpacing: "0.1em",
								textTransform: "uppercase"
							},
							children: passkeyLoading ? "CONFIRM ON DEVICE" : "TAP TO VERIFY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							variant: "text",
							size: "small",
							onClick: () => setMode("password"),
							sx: {
								color: "rgba(255, 255, 255, 0.5)",
								"&:hover": { color: "white" }
							},
							children: "Use Master Password"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					spacing: 3,
					component: "form",
					onSubmit: handlePasswordVerify,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								color: "rgba(255, 255, 255, 0.4)",
								fontWeight: 600,
								mb: 1,
								display: "block"
							},
							children: "MASTER PASSWORD"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							fullWidth: true,
							type: showPassword ? "text" : "password",
							placeholder: "Enter your master password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true,
							autoFocus: true,
							InputProps: {
								startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
									position: "start",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										size: 18,
										color: "rgba(255, 255, 255, 0.3)"
									})
								}),
								endAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
									position: "end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										onClick: () => setShowPassword(!showPassword),
										edge: "end",
										sx: { color: "rgba(255, 255, 255, 0.3)" },
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 18 })
									})
								})
							},
							sx: {
								"& .MuiOutlinedInput-root": {
									borderRadius: "14px",
									bgcolor: "rgba(255, 255, 255, 0.03)",
									"& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
									"&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
									"&.Mui-focused fieldset": { borderColor: "#6366F1" }
								},
								"& .MuiInputBase-input": { color: "white" }
							}
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "contained",
							fullWidth: true,
							disabled: loading,
							sx: {
								py: 1.8,
								borderRadius: "16px",
								background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
								color: "#000000",
								fontWeight: 800,
								fontFamily: "var(--font-satoshi)",
								textTransform: "none",
								"&:hover": {
									background: "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)",
									transform: "translateY(-1px)",
									boxShadow: "0 8px 25px rgba(99, 102, 241, 0.25)"
								}
							},
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
								size: 24,
								color: "inherit"
							}) : "Verify Identity"
						}),
						hasPasskey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							variant: "text",
							startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { size: 18 }),
							onClick: () => {
								setMode("passkey");
							},
							sx: {
								color: "rgba(255, 255, 255, 0.6)",
								py: 1.5,
								borderRadius: "14px",
								border: "1px solid rgba(255, 255, 255, 0.05)",
								textTransform: "none",
								fontFamily: "var(--font-satoshi)",
								fontWeight: 600,
								"&:hover": {
									color: "white",
									bgcolor: "rgba(255, 255, 255, 0.03)",
									border: "1px solid rgba(255, 255, 255, 0.15)"
								},
								mt: 1
							},
							children: "Use Passkey"
						})
					]
				})
			})
		]
	});
}
var SudoContext = (0, import_react.createContext)(void 0);
function SudoProvider({ children }) {
	const [isSudoOpen, setIsSudoOpen] = (0, import_react.useState)(false);
	const [pendingAction, setPendingAction] = (0, import_react.useState)(null);
	const isUnlocked = ecosystemSecurity.status.isUnlocked;
	const requestSudo = (0, import_react.useCallback)((options) => {
		if (ecosystemSecurity.status.isUnlocked) {
			options.onSuccess();
			return;
		}
		setPendingAction(options);
		setIsSudoOpen(true);
	}, []);
	const handleSuccess = (0, import_react.useCallback)(() => {
		setIsSudoOpen(false);
		if (pendingAction) {
			pendingAction.onSuccess();
			setPendingAction(null);
		}
	}, [pendingAction]);
	const handleCancel = (0, import_react.useCallback)(() => {
		setIsSudoOpen(false);
		if (pendingAction?.onCancel) pendingAction.onCancel();
		setPendingAction(null);
	}, [pendingAction]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SudoContext.Provider, {
		value: {
			requestSudo,
			isUnlocked
		},
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SudoModal, {
			isOpen: isSudoOpen,
			onSuccess: handleSuccess,
			onCancel: handleCancel,
			intent: pendingAction?.intent
		})]
	});
}
function useSudo() {
	const context = (0, import_react.useContext)(SudoContext);
	if (!context) throw new Error("useSudo must be used within a SudoProvider");
	return context;
}
/**
* Stages a profile view in sessionStorage for cross-app navigation
* This allows the profile page to load with cached data while fetching fresh details
* @param profile - The profile data to stage
* @param avatarId - Optional avatar file ID
*/
function stageProfileView(profile, avatarId) {
	try {
		const staged = {
			username: profile.username,
			name: profile.name,
			avatar: avatarId || profile.avatar,
			timestamp: Date.now(),
			profile
		};
		sessionStorage.setItem("kylrix_staged_profile", JSON.stringify(staged));
		if (profile.username) sessionStorage.setItem(`kylrix_profile_view_${profile.username.toLowerCase()}`, JSON.stringify({
			profile,
			timestamp: Date.now()
		}));
	} catch (_e) {}
}
/**
* Retrieves a staged profile view from sessionStorage by username
*/
function getProfileView(username) {
	try {
		const data = sessionStorage.getItem(`kylrix_profile_view_${username.toLowerCase()}`);
		if (!data) return null;
		const staged = JSON.parse(data);
		if (Date.now() - staged.timestamp > 12e4) {
			sessionStorage.removeItem(`kylrix_profile_view_${username.toLowerCase()}`);
			return null;
		}
		return staged;
	} catch (_e) {
		return null;
	}
}
var previewCache = /* @__PURE__ */ new Map();
var inFlight = /* @__PURE__ */ new Map();
var PREVIEW_STORE_KEY = "kylrix_avatar_cache_v2";
function cacheKey(fileId, width, height) {
	return `${fileId}:${width}x${height}`;
}
function hydrateCache() {
	if (typeof window === "undefined") return;
	try {
		const stored = sessionStorage.getItem(PREVIEW_STORE_KEY);
		if (!stored) return;
		const parsed = JSON.parse(stored);
		Object.entries(parsed).forEach(([key, value]) => {
			previewCache.set(key, value);
		});
	} catch {}
}
function persistCache() {
	if (typeof window === "undefined") return;
	try {
		const obj = Object.fromEntries(previewCache.entries());
		sessionStorage.setItem(PREVIEW_STORE_KEY, JSON.stringify(obj));
	} catch {}
}
hydrateCache();
async function blobToDataUrl(blob) {
	return await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result || ""));
		reader.onerror = () => reject(reader.error || /* @__PURE__ */ new Error("Failed to read blob"));
		reader.readAsDataURL(blob);
	});
}
async function fetchProfilePreview(fileId, width = 64, height = 64) {
	if (!fileId) return null;
	const key = cacheKey(fileId, width, height);
	if (previewCache.has(key)) return previewCache.get(key) ?? null;
	const active = inFlight.get(key);
	if (active) return active;
	const request = (async () => {
		try {
			const url = await getProfilePicturePreview(fileId, width, height);
			const response = await fetch(url.toString(), { cache: "force-cache" });
			if (!response.ok) throw new Error(`Preview request failed: ${response.status}`);
			const dataUrl = await blobToDataUrl(await response.blob());
			previewCache.set(key, dataUrl);
			persistCache();
			return dataUrl;
		} catch {
			previewCache.set(key, null);
			persistCache();
			return null;
		} finally {
			inFlight.delete(key);
		}
	})();
	inFlight.set(key, request);
	return request;
}
function getCachedProfilePreview(fileId, width = 64, height = 64) {
	if (!fileId) return null;
	return previewCache.get(cacheKey(fileId, width, height));
}
function useCachedProfilePreview(source, width = 64, height = 64) {
	const [preview, setPreview] = (0, import_react.useState)(() => {
		if (!source) return null;
		if (/^https?:\/\//.test(source)) return source;
		return getCachedProfilePreview(source, width, height) ?? null;
	});
	(0, import_react.useEffect)(() => {
		let active = true;
		if (!source) {
			setPreview(null);
			return () => {
				active = false;
			};
		}
		if (/^https?:\/\//.test(source)) {
			setPreview(source);
			return () => {
				active = false;
			};
		}
		const cached = getCachedProfilePreview(source, width, height);
		if (cached !== void 0) {
			setPreview(cached ?? null);
			if (cached !== null) return () => {
				active = false;
			};
		}
		fetchProfilePreview(source, width, height).then((next) => {
			if (active) setPreview(next);
		}).catch(() => {
			if (active) setPreview(null);
		});
		return () => {
			active = false;
		};
	}, [
		source,
		width,
		height
	]);
	return preview;
}
var IslandContext = (0, import_react.createContext)(void 0);
function useIsland() {
	const context = (0, import_react.useContext)(IslandContext);
	if (!context) throw new Error("useIsland must be used within an IslandProvider");
	return context;
}
var RING_GRADIENT = `conic-gradient(from 180deg, ${[
	"#6366F1",
	"#EC4899",
	"#10B981",
	"#A855F7",
	"#F59E0B"
].join(", ")}, #6366F1)`;
function computeIdentityFlags(signals) {
	const verification = getVerificationState(signals.preferences || null);
	const pro = String(signals.tier || "").toUpperCase() === "PRO";
	return {
		verified: verification.verified,
		verifiedOn: verification.verifiedOn,
		pro
	};
}
function IdentityAvatar({ src, alt, fallback, verified, verifiedOn, pro, size = 40, verifiedSize = 16, borderRadius = "50%" }) {
	const verifiedTooltip = formatVerificationTooltip({
		verified: Boolean(verified),
		verifiedOn: verifiedOn || null,
		checkedAt: verifiedOn || null,
		method: null,
		source: null
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			width: size,
			height: size,
			borderRadius,
			position: "relative",
			display: "grid",
			placeItems: "center",
			...pro ? {
				padding: "2px",
				background: RING_GRADIENT,
				boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 0 18px rgba(99,102,241,0.18)"
			} : { padding: "0px" }
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "img",
				src: src || void 0,
				alt: alt || "",
				sx: {
					width: "100%",
					height: "100%",
					borderRadius: `calc(${typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius} - 2px)`,
					objectFit: "cover",
					display: src ? "block" : "none"
				}
			}),
			!src && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					width: "100%",
					height: "100%",
					borderRadius: `calc(${typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius} - 2px)`,
					bgcolor: alpha("#6366F1", .12),
					color: "#6366F1",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontWeight: 900,
					fontSize: `${Math.max(11, size / 3)}px`
				},
				children: fallback || "U"
			}),
			verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				title: verifiedTooltip,
				arrow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						position: "absolute",
						right: -2,
						bottom: -2,
						width: verifiedSize,
						height: verifiedSize,
						borderRadius: "50%",
						bgcolor: "#0A0908",
						display: "grid",
						placeItems: "center",
						boxShadow: "0 0 0 2px rgba(10,9,8,1)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCircle_default, { sx: {
						fontSize: verifiedSize,
						color: "#6366F1"
					} })
				})
			})
		]
	});
}
function IdentityName({ children, verified, verifiedOn, sx }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			display: "inline-flex",
			alignItems: "center",
			gap: .75,
			...sx || {}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
			component: "span",
			sx: { lineHeight: 1 },
			children
		}), verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			title: verifiedTooltipText(verifiedOn),
			arrow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "span",
				sx: {
					display: "inline-flex",
					alignItems: "center"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCircle_default, { sx: {
					fontSize: 16,
					color: "#6366F1",
					flexShrink: 0
				} })
			})
		})]
	});
}
function verifiedTooltipText(verifiedOn) {
	return verifiedOn ? `Verified on ${new Date(verifiedOn).toLocaleString()}` : "Verified";
}
var IslandProvider = ({ children }) => {
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [panel, setPanel] = (0, import_react.useState)(null);
	const [lastActivity, setLastActivity] = (0, import_react.useState)(0);
	const activeNotification = notifications.length > 0 ? notifications[notifications.length - 1] : null;
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setLastActivity(Date.now()), 0);
		return () => clearTimeout(timer);
	}, []);
	const { user } = useAuth();
	useMediaQuery(useTheme().breakpoints.down("sm"), { noSsr: true });
	const showIsland = (0, import_react.useCallback)((notification) => {
		const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
		const newNotif = {
			...notification,
			id,
			duration: notification.duration || (notification.majestic ? 1e4 : 6e3)
		};
		setNotifications((prev) => [...prev, newNotif]);
	}, []);
	(0, import_react.useCallback)((id) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	}, []);
	const openPanel = (0, import_react.useCallback)((nextPanel) => {
		setPanel((current) => current === nextPanel ? null : nextPanel);
	}, []);
	const closePanel = (0, import_react.useCallback)(() => {
		setPanel(null);
	}, []);
	(0, import_react.useEffect)(() => {
		const handleExternalNotification = (event) => {
			const customEvent = event;
			if (!customEvent.detail?.title) return;
			showIsland(customEvent.detail);
		};
		window.addEventListener("kylrix:island-notification", handleExternalNotification);
		return () => window.removeEventListener("kylrix:island-notification", handleExternalNotification);
	}, [showIsland]);
	(0, import_react.useEffect)(() => {
		const activityHandler = () => setLastActivity(Date.now());
		window.addEventListener("mousemove", activityHandler);
		window.addEventListener("keydown", activityHandler);
		window.addEventListener("click", activityHandler);
		return () => {
			window.removeEventListener("mousemove", activityHandler);
			window.removeEventListener("keydown", activityHandler);
			window.removeEventListener("click", activityHandler);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const idleInterval = setInterval(() => {
			if (Date.now() - lastActivity > 45e3 && notifications.length === 0) {
				const userName = user?.name?.split(" ")[0] || "";
				const suggestions = [
					{
						type: "suggestion",
						title: userName || "Quick Sync?",
						message: "You can instantly attach notes from Kylrix Note in any conversation here.",
						action: {
							label: "Learn How",
							onClick: () => {}
						},
						personal: !!userName,
						app: "note"
					},
					{
						type: "connect",
						title: userName || "Vault Secure",
						message: "Your messages are end-to-end encrypted with your Kylrix Vault master password.",
						action: {
							label: "Security Status",
							onClick: () => {}
						},
						majestic: true,
						personal: !!userName,
						app: "vault"
					},
					{
						type: "suggestion",
						title: "Thinking space",
						message: "Use your self-chat to store ideas, snippets, and secrets for yourself.",
						action: {
							label: "Open Vault",
							onClick: () => {}
						},
						app: "connect"
					}
				];
				const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
				showIsland(randomSuggestion);
				setLastActivity(Date.now());
			}
		}, 15e3);
		return () => clearInterval(idleInterval);
	}, [
		lastActivity,
		notifications.length,
		showIsland,
		user
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IslandContext.Provider, {
		value: {
			openPanel,
			closePanel,
			isActive: Boolean(panel),
			panel,
			activeNotification
		},
		children
	});
};
var shortenUserId = (value) => {
	if (!value) return "unknown";
	if (value.length <= 12) return value;
	return `${value.slice(0, 6)}…${value.slice(-4)}`;
};
var ProfilePanelSurface = ({ onClosePanel }) => {
	const router = useRouter();
	const { user, logout } = useAuth();
	const { profile: profileFromContext, isLoading } = useProfile();
	const cachedIdentity = user?.$id ? getCachedIdentityById(user.$id) : null;
	const profile = profileFromContext || cachedIdentity || null;
	const previewSource = profile?.avatarUrl || profile?.avatarFileId || profile?.avatar || user?.prefs?.profilePicId || null;
	const profilePreviewUrl = useCachedProfilePreview(previewSource, 160, 160);
	const [copyState, setCopyState] = (0, import_react.useState)("idle");
	const scrollContainerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setCopyState("idle");
	}, [profile?.userId, profile?.$id]);
	const username = profile?.username ? String(profile.username).replace(/^@+/, "").toLowerCase() : null;
	const displayName = profile?.displayName || username || user?.name || user?.email || "Profile";
	const fullUserId = profile?.userId || profile?.$id || user?.$id || null;
	const bio = (profile?.bio || "").trim();
	const shortUserId = shortenUserId(fullUserId);
	const openFullProfile = (0, import_react.useCallback)(async () => {
		if (!username) return;
		if (profile) stageProfileView(profile, profilePreviewUrl || previewSource || null);
		await router.prefetch(`/u/${encodeURIComponent(username)}`);
		onClosePanel();
		router.push(`/u/${encodeURIComponent(username)}?transition=profile`);
	}, [
		onClosePanel,
		profile,
		previewSource,
		profilePreviewUrl,
		router,
		username
	]);
	const handleCopyUserId = (0, import_react.useCallback)(async () => {
		if (!fullUserId || typeof navigator === "undefined" || !navigator.clipboard) return;
		await navigator.clipboard.writeText(fullUserId);
		setCopyState("copied");
		window.setTimeout(() => setCopyState("idle"), 1600);
	}, [fullUserId]);
	const handleSignOut = (0, import_react.useCallback)(() => {
		onClosePanel();
		logout();
	}, [logout, onClosePanel]);
	const handleProfileWheel = (0, import_react.useCallback)((event) => {
		const node = scrollContainerRef.current;
		if (!node) return;
		const atTop = node.scrollTop <= 0;
		const atBottom = Math.ceil(node.scrollTop + node.clientHeight) >= node.scrollHeight;
		if (event.deltaY < 0 && atTop) {
			event.preventDefault();
			onClosePanel();
			return;
		}
		if (event.deltaY > 0 && atBottom) {
			event.preventDefault();
			openFullProfile();
		}
	}, [onClosePanel, openFullProfile]);
	if (isLoading && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			display: "grid",
			gap: 1.25,
			minWidth: 0,
			overflowX: "hidden",
			overflowY: "auto",
			maxHeight: "58vh",
			pr: .5,
			pb: .5
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					display: "flex",
					justifyContent: "center",
					pt: .25
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
					width: 56,
					height: 6,
					borderRadius: 999,
					bgcolor: alpha("#fff", .14)
				} })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					gap: 1.5,
					alignItems: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					variant: "rounded",
					width: 104,
					height: 104,
					sx: {
						borderRadius: "28px",
						bgcolor: "rgba(255,255,255,0.05)"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						flex: 1,
						minWidth: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							width: "48%",
							height: 34,
							sx: { bgcolor: "rgba(255,255,255,0.05)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							width: "30%",
							sx: { bgcolor: "rgba(255,255,255,0.05)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							width: "80%",
							sx: { bgcolor: "rgba(255,255,255,0.05)" }
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				variant: "rounded",
				height: 96,
				sx: {
					borderRadius: "22px",
					bgcolor: "rgba(255,255,255,0.05)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "grid",
					gap: .75
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					variant: "rounded",
					height: 48,
					sx: {
						borderRadius: "16px",
						bgcolor: "rgba(255,255,255,0.05)"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					variant: "rounded",
					height: 48,
					sx: {
						borderRadius: "16px",
						bgcolor: "rgba(255,255,255,0.05)"
					}
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		ref: scrollContainerRef,
		onWheel: handleProfileWheel,
		sx: {
			display: "grid",
			gap: 1.25,
			minWidth: 0,
			overflowX: "hidden",
			overflowY: "auto",
			maxHeight: "58vh",
			pr: .5,
			pb: .5
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					gap: 1.5,
					alignItems: "center",
					minWidth: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: { flexShrink: 0 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityAvatar, {
						src: profilePreviewUrl || previewSource || void 0,
						alt: displayName,
						fallback: (displayName || "P")[0]?.toUpperCase() || "P",
						size: 104,
						borderRadius: "28px"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						minWidth: 0,
						flex: 1
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							sx: {
								color: "white",
								fontWeight: 900,
								fontSize: "1.15rem",
								lineHeight: 1.05
							},
							noWrap: true,
							children: displayName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
							sx: {
								color: alpha("#fff", .62),
								fontWeight: 700,
								fontSize: "0.86rem",
								lineHeight: 1.35
							},
							noWrap: true,
							children: ["@", username || "profile"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							sx: {
								color: alpha("#fff", .52),
								fontFamily: "var(--font-mono)",
								fontSize: "0.72rem",
								mt: .75
							},
							noWrap: true,
							children: shortUserId
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					borderRadius: "22px",
					border: "1px solid rgba(255,255,255,0.05)",
					bgcolor: "rgba(255,255,255,0.02)",
					p: 1.5,
					minWidth: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					sx: {
						color: "rgba(255,255,255,0.56)",
						fontSize: "0.72rem",
						fontWeight: 800,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						mb: .75
					},
					children: "Bio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					sx: {
						color: "white",
						fontSize: "0.88rem",
						lineHeight: 1.55,
						minHeight: 22,
						wordBreak: "break-word"
					},
					children: bio || "No bio yet."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				direction: "row",
				spacing: 1,
				useFlexGap: true,
				flexWrap: "wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleCopyUserId,
					startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 }),
					sx: {
						minWidth: 0,
						flex: "1 1 180px",
						justifyContent: "flex-start",
						borderRadius: "16px",
						bgcolor: "rgba(255,255,255,0.03)",
						color: "white",
						px: 1.5,
						py: 1.15,
						textTransform: "none",
						"&:hover": { bgcolor: "rgba(255,255,255,0.08)" }
					},
					children: copyState === "copied" ? "Copied user id" : `Copy ${shortUserId}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSignOut,
					sx: {
						minWidth: 0,
						flex: "1 1 180px",
						borderRadius: "16px",
						bgcolor: "rgba(255, 77, 77, 0.08)",
						color: "#FF4D4D",
						px: 1.5,
						py: 1.15,
						textTransform: "none",
						"&:hover": { bgcolor: "rgba(255, 77, 77, 0.14)" }
					},
					children: "Sign out"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: openFullProfile,
				disabled: !username,
				variant: "contained",
				sx: {
					borderRadius: "16px",
					px: 2,
					py: 1.25,
					textTransform: "none",
					fontWeight: 900,
					bgcolor: "#6366F1",
					color: "#000",
					"&:hover": { bgcolor: alpha("#6366F1", .86) },
					"&.Mui-disabled": {
						bgcolor: "rgba(99,102,241,0.28)",
						color: "rgba(255,255,255,0.6)"
					}
				},
				children: "See full profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					display: "flex",
					justifyContent: "center",
					pt: .25,
					pb: .25
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					drag: "y",
					dragConstraints: {
						top: 0,
						bottom: 140
					},
					dragElastic: .14,
					onDragEnd: (_, info) => {
						if (info.offset.y > 64) openFullProfile();
					},
					style: {
						touchAction: "pan-y",
						cursor: "grab"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
						width: 56,
						height: 6,
						borderRadius: 999,
						bgcolor: alpha("#fff", .14)
					} })
				})
			})
		]
	});
};
//#endregion
export { useCachedProfilePreview as C, usePotato as D, useIsland as E, useProfile as O, useAppChrome as S, useDataNexus as T, fetchProfilePreview as _, IdentityName as a, getVerificationState as b, Logo as c, ProfilePanelSurface as d, ProfileProvider as f, computeIdentityFlags as g, buildSafetyWarning as h, IdentityAvatar as i, useSudo as k, PasskeySetup as l, SudoProvider as m, ChatNotificationProvider as n, IslandProvider as o, SudoModal as p, DataNexusProvider as r, KeychainService as s, AppChromeProvider as t, PotatoProvider as u, getCachedProfilePreview as v, useChatNotifications as w, stageProfileView as x, getProfileView as y };
