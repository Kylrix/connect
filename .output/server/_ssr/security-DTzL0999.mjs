import { i as ID, o as Query } from "../_libs/appwrite.mjs";
import { d as tablesDB, t as APPWRITE_CONFIG } from "./client-bVtyOxJQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/security-DTzL0999.js
var activeChannel = null;
var seenMessages = /* @__PURE__ */ new Set();
function getChannel() {
	if (typeof window === "undefined") return null;
	if (!activeChannel) activeChannel = new BroadcastChannel("kylrix_mesh_v2_core");
	return activeChannel;
}
if (typeof window !== "undefined") setInterval(() => seenMessages.clear(), 6e4);
var MeshProtocol = {
	getNodes: () => [
		{
			id: "id",
			type: "control",
			subdomain: "id",
			version: "1.5.0",
			status: "online",
			capabilities: [
				"auth",
				"identity",
				"quota"
			]
		},
		{
			id: "note",
			type: "data",
			subdomain: "note",
			version: "1.5.0",
			status: "online",
			capabilities: ["knowledge_graph", "ai_search"]
		},
		{
			id: "vault",
			type: "secure",
			subdomain: "vault",
			version: "1.5.0",
			status: "online",
			capabilities: [
				"vault",
				"encryption",
				"passkeys"
			]
		},
		{
			id: "flow",
			type: "logic",
			subdomain: "flow",
			version: "1.5.0",
			status: "online",
			capabilities: ["task_orchestration", "events"]
		},
		{
			id: "connect",
			type: "message",
			subdomain: "connect",
			version: "1.5.0",
			status: "online",
			capabilities: ["realtime_comm", "p2p_relay"]
		}
	],
	getPremiumIcon: (nodeId) => {
		switch (nodeId) {
			case "id": return "Fingerprint";
			case "note": return "FileText";
			case "vault": return "Shield";
			case "flow": return "Waypoints";
			case "connect": return "Zap";
			default: return "Layers";
		}
	},
	broadcast: (message, sourceId) => {
		const msgId = crypto.randomUUID();
		const fullMessage = {
			...message,
			id: msgId,
			sourceNode: sourceId,
			timestamp: Date.now()
		};
		seenMessages.add(msgId);
		if (typeof window !== "undefined") getChannel()?.postMessage(fullMessage);
		return fullMessage;
	},
	subscribe: (handler) => {
		if (typeof window === "undefined") return () => {};
		const bc = getChannel();
		const handleIncoming = (msg) => {
			if (!msg.id || seenMessages.has(msg.id)) return;
			seenMessages.add(msg.id);
			handler(msg);
		};
		const bcHandler = (e) => handleIncoming(e.data);
		bc?.addEventListener("message", bcHandler);
		const winHandler = (e) => {
			const isLocalhost = e.origin.startsWith("http://localhost:");
			const isKylrixDomain = e.origin.endsWith(".kylrix.space") || e.origin === "https://kylrix.space";
			if (!isLocalhost && !isKylrixDomain) return;
			const data = e.data;
			if (data && typeof data === "object" && data.id && data.sourceNode && data.type) handleIncoming(data);
		};
		window.addEventListener("message", winHandler);
		return () => {
			bc?.removeEventListener("message", bcHandler);
			window.removeEventListener("message", winHandler);
		};
	}
};
/**
* Kylrix Ecosystem Security Protocol (WESP)
* Centralized security and encryption logic for the entire ecosystem.
* Hosted by the ID node (Identity Management System).
*/
var PW_DB = APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER;
var KEYCHAIN_TABLE = APPWRITE_CONFIG.TABLES.PASSWORD_MANAGER.KEYCHAIN;
var ecosystemSecurity = class EcosystemSecurity {
	static instance;
	masterKey = null;
	identityKeyPair = null;
	identitySyncPromise = null;
	conversationKeys = /* @__PURE__ */ new Map();
	decryptionCache = /* @__PURE__ */ new Map();
	isUnlocked = false;
	nodeId = "unknown";
	statusListeners = /* @__PURE__ */ new Set();
	tabSessionSecret = null;
	static PBKDF2_ITERATIONS = 6e5;
	static IV_SIZE = 16;
	static KEY_SIZE = 256;
	static getInstance() {
		if (!EcosystemSecurity.instance) EcosystemSecurity.instance = new EcosystemSecurity();
		return EcosystemSecurity.instance;
	}
	init(nodeId) {
		this.nodeId = nodeId;
		this.listenForMeshDirectives();
	}
	listenForMeshDirectives() {
		if (typeof window === "undefined") return;
		MeshProtocol.subscribe(async (msg) => {
			if (msg.type === "COMMAND" && msg.payload.action === "LOCK_SYSTEM") this.lock();
		});
	}
	emitStatusChange() {
		const status = this.status;
		this.statusListeners.forEach((listener) => {
			try {
				listener(status);
			} catch (error) {
				console.warn("[Security] Status listener failed:", error);
			}
		});
	}
	onStatusChange(listener) {
		this.statusListeners.add(listener);
		listener(this.status);
		return () => {
			this.statusListeners.delete(listener);
		};
	}
	getOrCreateSessionSecret() {
		if (typeof window === "undefined") return new Uint8Array(32);
		if (!this.tabSessionSecret) this.tabSessionSecret = crypto.getRandomValues(new Uint8Array(32));
		return this.tabSessionSecret;
	}
	/**
	* Fetches the user's keychain directly from the password manager database.
	* This allows the app to be self-sufficient without a hard ID app redirect.
	*/
	async fetchKeychain(userId) {
		try {
			return (await tablesDB.listRows(PW_DB, KEYCHAIN_TABLE, [
				Query.equal("userId", userId),
				Query.equal("type", "password"),
				Query.orderDesc("$createdAt"),
				Query.limit(1)
			])).rows[0] || null;
		} catch (_e) {
			console.error("[Security] Failed to fetch keychain:", _e);
			return null;
		}
	}
	/**
	* Derive key from password
	*/
	async deriveKey(password, salt) {
		const encoder = new TextEncoder();
		const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);
		return crypto.subtle.deriveKey({
			name: "PBKDF2",
			salt,
			iterations: EcosystemSecurity.PBKDF2_ITERATIONS,
			hash: "SHA-256"
		}, keyMaterial, {
			name: "AES-GCM",
			length: EcosystemSecurity.KEY_SIZE
		}, true, [
			"encrypt",
			"decrypt",
			"wrapKey",
			"unwrapKey"
		]);
	}
	/**
	* Generate a random Master Encryption Key (MEK)
	*/
	async generateRandomMEK() {
		return await crypto.subtle.generateKey({
			name: "AES-GCM",
			length: 256
		}, true, [
			"encrypt",
			"decrypt",
			"wrapKey",
			"unwrapKey"
		]);
	}
	/**
	* Wrap MEK with password and salt
	*/
	async wrapMEK(mek, password, salt) {
		const authKey = await this.deriveKey(password, salt);
		const mekBytes = await crypto.subtle.exportKey("raw", mek);
		const iv = crypto.getRandomValues(new Uint8Array(EcosystemSecurity.IV_SIZE));
		const encryptedMek = await crypto.subtle.encrypt({
			name: "AES-GCM",
			iv
		}, authKey, mekBytes);
		const combined = new Uint8Array(iv.length + encryptedMek.byteLength);
		combined.set(iv);
		combined.set(new Uint8Array(encryptedMek), iv.length);
		return btoa(String.fromCharCode(...combined));
	}
	/**
	* Unwrap MEK with password and salt
	*/
	async unwrapMEK(wrappedKeyBase64, password, saltBase64) {
		if (!wrappedKeyBase64 || !saltBase64) throw new Error("Invalid master password record");
		const salt = new Uint8Array(atob(saltBase64).split("").map((c) => c.charCodeAt(0)));
		const authKey = await this.deriveKey(password, salt);
		const wrappedKeyBytes = new Uint8Array(atob(wrappedKeyBase64).split("").map((c) => c.charCodeAt(0)));
		const iv = wrappedKeyBytes.slice(0, EcosystemSecurity.IV_SIZE);
		const ciphertext = wrappedKeyBytes.slice(EcosystemSecurity.IV_SIZE);
		const mekBytes = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv
		}, authKey, ciphertext);
		return await crypto.subtle.importKey("raw", mekBytes, {
			name: "AES-GCM",
			length: 256
		}, true, [
			"encrypt",
			"decrypt",
			"wrapKey",
			"unwrapKey"
		]);
	}
	async importMasterKey(keyBytes) {
		try {
			this.masterKey = await crypto.subtle.importKey("raw", keyBytes, {
				name: "AES-GCM",
				length: 256
			}, true, [
				"encrypt",
				"decrypt",
				"wrapKey",
				"unwrapKey"
			]);
			this.isUnlocked = true;
			if (typeof sessionStorage !== "undefined") sessionStorage.setItem("kylrix_vault_unlocked", "true");
			this.emitStatusChange();
			return true;
		} catch (__e) {
			console.error("[Security] Failed to import master key", __e);
			return false;
		}
	}
	async unlock(password, passwordEntry) {
		try {
			this.masterKey = await this.unwrapMEK(passwordEntry.wrappedKey, password, passwordEntry.salt);
			this.isUnlocked = true;
			if (typeof sessionStorage !== "undefined") sessionStorage.setItem("kylrix_vault_unlocked", "true");
			this.emitStatusChange();
			return true;
		} catch (_e) {
			console.error("[Security] Unlock failed", _e);
			return false;
		}
	}
	/**
	* Set Masterpass Flag on User Document
	* Note: chat.users has no hasMasterpass column; we just ensure the doc exists and is fresh.
	*/
	async setMasterpassFlag(userId, _email) {
		try {
			const { UsersService } = await import("./users-CIFzqCQM.mjs");
			await UsersService.ensureProfileForUser({
				$id: userId,
				email: _email
			});
		} catch (e) {
			console.error("[Security] setMasterpassFlag failed:", e);
		}
	}
	async updateWrappedKey(_userId, _wrappedKey) {
		console.log("[Security] updateWrappedKey called but not supported in chat.users schema");
	}
	async publishIdentityKey(userId, publicKey) {
		const { UsersService } = await import("./users-CIFzqCQM.mjs");
		const profile = await UsersService.getProfileById(userId);
		if (!profile || profile.publicKey !== publicKey) await UsersService.updateProfile(userId, { publicKey });
	}
	async syncIdentity(userId) {
		if (!this.status.isUnlocked) throw new Error("Vault must be unlocked before syncing E2E identity");
		const PW_DB_ID = APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER;
		const IDENTITIES_TABLE_ID = APPWRITE_CONFIG.TABLES.PASSWORD_MANAGER.IDENTITIES;
		let identityRows = (await tablesDB.listRows(PW_DB_ID, IDENTITIES_TABLE_ID, [
			Query.equal("userId", userId),
			Query.equal("identityType", "e2e_connect"),
			Query.limit(100)
		])).rows;
		if (identityRows.length > 1) {
			const { UsersService } = await import("./users-CIFzqCQM.mjs");
			const profile = await UsersService.getProfileById(userId);
			const canonical = (profile?.publicKey ? identityRows.find((row) => row.publicKey === profile.publicKey) : null) || identityRows.find((row) => row.publicKey) || identityRows[0];
			for (const row of identityRows) if (row.$id !== canonical.$id) await tablesDB.deleteRow(PW_DB_ID, IDENTITIES_TABLE_ID, row.$id);
			identityRows = [canonical];
		}
		if (identityRows[0]) {
			const doc = identityRows[0];
			const decryptedPriv = await this.decrypt(doc.passkeyBlob);
			const privKeyBytes = new Uint8Array(atob(decryptedPriv).split("").map((c) => c.charCodeAt(0)));
			const pubKeyBytes = new Uint8Array(atob(doc.publicKey).split("").map((c) => c.charCodeAt(0)));
			const privKey = await crypto.subtle.importKey("pkcs8", privKeyBytes, { name: "X25519" }, true, ["deriveKey", "deriveBits"]);
			this.identityKeyPair = {
				publicKey: await crypto.subtle.importKey("raw", pubKeyBytes, { name: "X25519" }, true, []),
				privateKey: privKey
			};
			await this.publishIdentityKey(userId, doc.publicKey);
			this.emitStatusChange();
			return doc.publicKey;
		}
		const pair = await crypto.subtle.generateKey({ name: "X25519" }, true, ["deriveKey", "deriveBits"]);
		const privExport = await crypto.subtle.exportKey("pkcs8", pair.privateKey);
		const pubExport = await crypto.subtle.exportKey("raw", pair.publicKey);
		const pubBase64 = btoa(String.fromCharCode(...new Uint8Array(pubExport)));
		const privBase64 = btoa(String.fromCharCode(...new Uint8Array(privExport)));
		const encryptedPriv = await this.encrypt(privBase64);
		await tablesDB.createRow(PW_DB_ID, IDENTITIES_TABLE_ID, ID.unique(), {
			userId,
			identityType: "e2e_connect",
			label: "Connect E2E Identity",
			publicKey: pubBase64,
			passkeyBlob: encryptedPriv
		});
		this.identityKeyPair = pair;
		await this.publishIdentityKey(userId, pubBase64);
		this.emitStatusChange();
		return pubBase64;
	}
	async ensureE2EIdentity(userId) {
		if (!userId) throw new Error("Missing user ID for E2E identity sync");
		if (!this.identitySyncPromise) this.identitySyncPromise = this.syncIdentity(userId).finally(() => {
			this.identitySyncPromise = null;
		});
		return await this.identitySyncPromise;
	}
	/**
	* Symmetric AES-GCM encryption for messages/fields.
	*/
	async encryptWithKey(data, key) {
		const plaintext = new TextEncoder().encode(data);
		const iv = crypto.getRandomValues(new Uint8Array(EcosystemSecurity.IV_SIZE));
		const encrypted = await crypto.subtle.encrypt({
			name: "AES-GCM",
			iv
		}, key, plaintext);
		const combined = new Uint8Array(iv.length + encrypted.byteLength);
		combined.set(iv);
		combined.set(new Uint8Array(encrypted), iv.length);
		return btoa(String.fromCharCode(...combined));
	}
	async decryptWithKey(encryptedData, key) {
		const combined = new Uint8Array(atob(encryptedData).split("").map((char) => char.charCodeAt(0)));
		const iv = combined.slice(0, EcosystemSecurity.IV_SIZE);
		const encrypted = combined.slice(EcosystemSecurity.IV_SIZE);
		const decrypted = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv
		}, key, encrypted);
		return new TextDecoder().decode(decrypted);
	}
	getConversationKey(conversationId) {
		return this.conversationKeys.get(conversationId) || null;
	}
	setConversationKey(conversationId, key) {
		this.conversationKeys.set(conversationId, key);
	}
	clearConversationKey(conversationId) {
		this.conversationKeys.delete(conversationId);
	}
	async generateConversationKey() {
		return await crypto.subtle.generateKey({
			name: "AES-GCM",
			length: 256
		}, true, ["encrypt", "decrypt"]);
	}
	async deriveSharedSecret(peerPublicKeyBase64) {
		if (!this.identityKeyPair) throw new Error("E2E Identity not initialized");
		const pubKeyBytes = new Uint8Array(atob(peerPublicKeyBase64).split("").map((c) => c.charCodeAt(0)));
		const peerPubKey = await crypto.subtle.importKey("raw", pubKeyBytes, { name: "X25519" }, true, []);
		return await crypto.subtle.deriveKey({
			name: "X25519",
			public: peerPubKey
		}, this.identityKeyPair.privateKey, {
			name: "AES-GCM",
			length: 256
		}, false, ["encrypt", "decrypt"]);
	}
	async wrapKeyWithECDH(keyToWrap, peerPublicKeyBase64) {
		const sharedSecret = await this.deriveSharedSecret(peerPublicKeyBase64);
		const rawKey = await crypto.subtle.exportKey("raw", keyToWrap);
		const iv = crypto.getRandomValues(new Uint8Array(EcosystemSecurity.IV_SIZE));
		const encryptedKey = await crypto.subtle.encrypt({
			name: "AES-GCM",
			iv
		}, sharedSecret, rawKey);
		const combined = new Uint8Array(iv.length + encryptedKey.byteLength);
		combined.set(iv);
		combined.set(new Uint8Array(encryptedKey), iv.length);
		return btoa(String.fromCharCode(...combined));
	}
	async unwrapKeyWithECDH(wrappedKeyBase64, peerPublicKeyBase64) {
		const sharedSecret = await this.deriveSharedSecret(peerPublicKeyBase64);
		const combined = new Uint8Array(atob(wrappedKeyBase64).split("").map((c) => c.charCodeAt(0)));
		const iv = combined.slice(0, EcosystemSecurity.IV_SIZE);
		const ciphertext = combined.slice(EcosystemSecurity.IV_SIZE);
		const rawKey = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv
		}, sharedSecret, ciphertext);
		return await crypto.subtle.importKey("raw", rawKey, {
			name: "AES-GCM",
			length: 256
		}, true, ["encrypt", "decrypt"]);
	}
	async encrypt(data) {
		if (!this.masterKey) throw new Error("Security vault locked");
		return this.encryptWithKey(data, this.masterKey);
	}
	async decrypt(encryptedData) {
		if (!this.masterKey) throw new Error("Security vault locked");
		if (this.decryptionCache.has(encryptedData)) return this.decryptionCache.get(encryptedData);
		const plaintext = await this.decryptWithKey(encryptedData, this.masterKey);
		this.decryptionCache.set(encryptedData, plaintext);
		return plaintext;
	}
	lock() {
		this.masterKey = null;
		this.identityKeyPair = null;
		this.conversationKeys.clear();
		this.decryptionCache.clear();
		this.isUnlocked = false;
		if (typeof sessionStorage !== "undefined") sessionStorage.removeItem("kylrix_vault_unlocked");
		this.emitStatusChange();
	}
	get status() {
		return {
			isUnlocked: this.isUnlocked,
			hasKey: !!this.masterKey,
			hasIdentity: !!this.identityKeyPair
		};
	}
	getMasterKey() {
		return this.masterKey;
	}
	getVault() {
		return { userEmail: null };
	}
}.getInstance();
//#endregion
export { ecosystemSecurity as n, MeshProtocol as t };
