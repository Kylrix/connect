import { o as __toESM } from "../_runtime.mjs";
import { a as Permission, c as Role, i as ID, o as Query } from "../_libs/appwrite.mjs";
import { a as getCurrentUser, c as realtime, d as tablesDB, n as account, o as getCurrentUserSnapshot, t as APPWRITE_CONFIG } from "./client-bVtyOxJQ.mjs";
import { a as getEcosystemUrl, n as UsersService, o as seedIdentityCache, r as getCachedIdentityById, s as subscribeIdentityCache } from "./users-vRrLGFai.mjs";
import { n as ecosystemSecurity } from "./security-DTzL0999.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { l as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ArrowBack_default, D as PersonOutlined_default, E as BookmarkOutlined_default, H as useTheme, J as alpha, O as GroupWorkOutlined_default, T as Search_default, w as LockOutlined_default, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { A as DialogActions, B as Box, C as InputAdornment, D as Divider, E as Drawer, G as AppBar, H as Avatar, J as IconButton, K as Typography, O as DialogTitle, V as Badge, W as Chip, X as Paper, Y as CircularProgress, _ as ListItemIcon, a as Tab, b as ListItemButton, f as Skeleton, g as ListItemText, i as Toolbar, j as Dialog, k as DialogContent, n as TextField, r as Tabs, s as Stack, t as useMediaQuery, u as Tooltip, v as ListItemAvatar, x as List, y as ListItem, z as Button } from "../_libs/@mui/material+[...].mjs";
import { c as useSearchParams, i as useAuth, o as usePathname, s as useRouter, t as ChatService } from "./chat-GLmU6cBO.mjs";
import { A as Plus, B as MessageCircle, E as Search, G as Link$1, J as Key, U as Lock, W as LockOpen, X as House, Z as History, _t as CircleAlert, b as Shield, bt as ChevronLeft, ct as ExternalLink, ft as Copy, gt as CircleCheck, it as FileText, j as Phone, kt as ArrowLeft, l as UserPlus, n as X, o as Users, ot as Eye, p as Trash2, r as Wallet, st as EyeOff, u as UserMinus, w as Settings, xt as ChevronDown, yt as ChevronRight } from "../_libs/lucide-react.mjs";
import { n, r as zt } from "../_libs/react-hot-toast.mjs";
import { t as motion } from "../_libs/framer-motion+[...].mjs";
import { D as usePotato, E as useIsland, O as useProfile, S as useAppChrome, _ as fetchProfilePreview, c as Logo, d as ProfilePanelSurface, g as computeIdentityFlags, i as IdentityAvatar, k as useSudo, s as KeychainService, v as getCachedProfilePreview, w as useChatNotifications, x as stageProfileView } from "./DynamicIsland-DPFhB0ig.mjs";
import { t as HDNodeWallet } from "../_libs/ethers.mjs";
import { t as require_src } from "../_libs/bip39.mjs";
import { t as BIP32Factory } from "../_libs/bip32+[...].mjs";
import { n as p2wpkh, r as bitcoin, t as initEccLib } from "../_libs/bitcoinjs-lib.mjs";
import { a as schnorr, i as hashes, n as getPublicKey, o as sign, r as getSharedSecret, s as verify, t as Point } from "../_libs/noble__secp256k1.mjs";
import { n as sha256, r as hmac, t as Ed25519Keypair } from "../_libs/@mysten/sui+[...].mjs";
import { t as Keypair } from "../_libs/@solana/web3.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-JgOEZgrs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_src = /* @__PURE__ */ __toESM(require_src());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var NextLink = import_react.forwardRef(({ href, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
	ref,
	to: href,
	...props,
	children
}));
NextLink.displayName = "NextLink";
var tiny_secp256k1_exports = /* @__PURE__ */ __exportAll({
	default: () => tiny_secp256k1_default,
	ecdh: () => ecdh,
	isPoint: () => isPoint,
	isPrivate: () => isPrivate,
	isXOnlyPoint: () => isXOnlyPoint,
	pointAdd: () => pointAdd,
	pointAddScalar: () => pointAddScalar,
	pointCompress: () => pointCompress,
	pointFromScalar: () => pointFromScalar,
	pointMultiply: () => pointMultiply,
	privateAdd: () => privateAdd,
	privateNegate: () => privateNegate,
	privateSub: () => privateSub,
	signMessage: () => signMessage,
	signSchnorrMessage: () => signSchnorrMessage,
	verifySchnorrSignature: () => verifySchnorrSignature,
	verifySignature: () => verifySignature,
	xOnlyPointAddTweak: () => xOnlyPointAddTweak,
	xOnlyPointFromPoint: () => xOnlyPointFromPoint,
	xOnlyPointFromPointLike: () => xOnlyPointFromPointLike,
	xOnlyPointFromScalar: () => xOnlyPointFromScalar
});
hashes.sha256 = sha256;
hashes.hmacSha256 = (key, msg) => hmac(sha256, key, msg);
var CURVE_N = Point.CURVE().n;
var COMPRESSED_LENGTH = 33;
function toBytes(value) {
	return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function bytesToBigInt(bytes) {
	return BigInt(`0x${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`);
}
function bigIntTo32Bytes(value) {
	const hex = ((value % CURVE_N + CURVE_N) % CURVE_N).toString(16).padStart(64, "0");
	return Uint8Array.from(hex.match(/.{1,2}/g)?.map((byte) => Number.parseInt(byte, 16)) ?? []);
}
function normalizeScalar(value) {
	return bytesToBigInt(toBytes(value)) % CURVE_N;
}
function pointFromInput(point) {
	return Point.fromBytes(toBytes(point));
}
function isPrivate(privateKey) {
	const key = toBytes(privateKey);
	return key.length === 32 && bytesToBigInt(key) > 0n && bytesToBigInt(key) < CURVE_N;
}
function isPoint(point) {
	try {
		pointFromInput(point);
		return true;
	} catch {
		return false;
	}
}
function isXOnlyPoint(point) {
	const xOnly = toBytes(point);
	if (xOnly.length !== 32) return false;
	const even = new Uint8Array(33);
	even[0] = 2;
	even.set(xOnly, 1);
	const odd = new Uint8Array(33);
	odd[0] = 3;
	odd.set(xOnly, 1);
	return isPoint(even) || isPoint(odd);
}
function pointFromScalar(privateKey, compressed = true) {
	const key = toBytes(privateKey);
	if (!isPrivate(key)) return null;
	const publicKey = getPublicKey(key, compressed);
	return new Uint8Array(publicKey);
}
function pointAddScalar(point, tweak, compressed = true) {
	try {
		if (!isPoint(point)) return null;
		const base = pointFromInput(point);
		const scalar = normalizeScalar(tweak);
		const tweaked = scalar === 0n ? base : base.add(Point.BASE.multiplyUnsafe(scalar));
		if (tweaked.is0()) return null;
		return new Uint8Array(tweaked.toBytes(compressed));
	} catch {
		return null;
	}
}
function pointAdd(pointA, pointB, compressed = true) {
	if (!isPoint(pointA) || !isPoint(pointB)) return null;
	const result = pointFromInput(pointA).add(pointFromInput(pointB));
	return new Uint8Array(result.toBytes(compressed));
}
function pointMultiply(point, tweak, compressed = true) {
	try {
		if (!isPoint(point)) return null;
		const result = pointFromInput(point).multiplyUnsafe(normalizeScalar(tweak));
		if (result.is0()) return null;
		return new Uint8Array(result.toBytes(compressed));
	} catch {
		return null;
	}
}
function pointCompress(point, compressed = true) {
	try {
		if (!isPoint(point)) return null;
		const result = pointFromInput(point);
		if (result.is0()) return null;
		return new Uint8Array(result.toBytes(compressed));
	} catch {
		return null;
	}
}
function privateAdd(privateKey, tweak) {
	if (!isPrivate(privateKey)) return null;
	const sum = (bytesToBigInt(toBytes(privateKey)) + normalizeScalar(tweak)) % CURVE_N;
	if (sum === 0n) return null;
	return bigIntTo32Bytes(sum);
}
function privateSub(privateKey, tweak) {
	if (!isPrivate(privateKey)) return null;
	const diff = (bytesToBigInt(toBytes(privateKey)) - normalizeScalar(tweak)) % CURVE_N;
	if (diff === 0n) return null;
	return bigIntTo32Bytes(diff);
}
function privateNegate(privateKey) {
	if (!isPrivate(privateKey)) return null;
	return bigIntTo32Bytes(CURVE_N - bytesToBigInt(toBytes(privateKey)));
}
function signMessage(hash, privateKey, extraEntropy) {
	const opts = extraEntropy ? {
		extraEntropy: toBytes(extraEntropy),
		prehash: false
	} : { prehash: false };
	return new Uint8Array(sign(toBytes(hash), toBytes(privateKey), opts));
}
function verifySignature(hash, publicKey, signature) {
	return verify(toBytes(signature), toBytes(hash), toBytes(publicKey), { prehash: false });
}
function signSchnorrMessage(hash, privateKey, auxRand) {
	return new Uint8Array(schnorr.sign(toBytes(hash), toBytes(privateKey), auxRand ? toBytes(auxRand) : void 0));
}
function verifySchnorrSignature(hash, publicKey, signature) {
	return schnorr.verify(toBytes(signature), toBytes(hash), toBytes(publicKey));
}
function xOnlyPointFromPoint(point) {
	if (!isPoint(point)) return null;
	const bytes = pointFromInput(point).toBytes(true);
	return bytes.length === COMPRESSED_LENGTH ? bytes.slice(1) : null;
}
function xOnlyPointFromScalar(privateKey) {
	const publicKey = pointFromScalar(privateKey, true);
	return publicKey ? publicKey.slice(1) : null;
}
function xOnlyPointAddTweak(xOnlyPoint, tweak) {
	try {
		const xOnly = toBytes(xOnlyPoint);
		if (xOnly.length !== 32) return null;
		const full = new Uint8Array(33);
		full[0] = 2;
		full.set(xOnly, 1);
		const tweaked = pointAddScalar(full, tweak, true);
		if (!tweaked || tweaked.length !== 33) return null;
		return {
			xOnlyPubkey: tweaked.slice(1),
			parity: tweaked[0] === 3 ? 1 : 0
		};
	} catch {
		return null;
	}
}
function xOnlyPointFromPointLike(point) {
	const xOnly = xOnlyPointFromPoint(point);
	if (!xOnly) return null;
	return [xOnly, pointFromInput(point).y & 1n ? 1 : 0];
}
function ecdh(privateKey, publicKey) {
	try {
		return new Uint8Array(getSharedSecret(toBytes(privateKey), toBytes(publicKey), true));
	} catch {
		return null;
	}
}
var tiny_secp256k1_default = {
	isXOnlyPoint,
	isPoint,
	isPrivate,
	pointAdd,
	pointAddScalar,
	pointCompress,
	pointFromScalar,
	pointMultiply,
	privateAdd,
	privateNegate,
	privateSub,
	sign: signMessage,
	verify: verifySignature,
	signSchnorr: signSchnorrMessage,
	verifySchnorr: verifySchnorrSignature,
	xOnlyPointAddTweak,
	xOnlyPointFromPoint,
	xOnlyPointFromScalar,
	ecdh
};
var eccLib = tiny_secp256k1_default ?? tiny_secp256k1_exports;
initEccLib(eccLib);
var bip32 = BIP32Factory(eccLib);
var PASSWORD_MANAGER_DB = APPWRITE_CONFIG.DATABASES.PASSWORD_MANAGER;
var WALLETS_TABLE = APPWRITE_CONFIG.TABLES.PASSWORD_MANAGER.WALLETS;
var NOTE_DB = APPWRITE_CONFIG.DATABASES.KYLRIXNOTE;
var WALLET_MAP_TABLE = APPWRITE_CONFIG.TABLES.KYLRIXNOTE.WALLET_MAP;
var NETWORKS = {
	eth: {
		chain: "eth",
		label: "Ethereum",
		symbol: "ETH",
		family: "evm",
		publicProfile: true
	},
	usdc: {
		chain: "usdc",
		label: "USDC",
		symbol: "USDC",
		family: "evm",
		publicProfile: true,
		aliasOf: "eth"
	},
	sol: {
		chain: "sol",
		label: "Solana",
		symbol: "SOL",
		family: "solana",
		publicProfile: true
	},
	btc: {
		chain: "btc",
		label: "Bitcoin",
		symbol: "BTC",
		family: "bitcoin",
		publicProfile: true
	},
	sui: {
		chain: "sui",
		label: "Sui",
		symbol: "SUI",
		family: "sui",
		publicProfile: true
	},
	base: {
		chain: "base",
		label: "Base",
		symbol: "BASE",
		family: "evm",
		publicProfile: true,
		aliasOf: "eth"
	},
	polygon: {
		chain: "polygon",
		label: "Polygon",
		symbol: "POL",
		family: "evm",
		publicProfile: true,
		aliasOf: "eth"
	},
	arbitrum: {
		chain: "arbitrum",
		label: "Arbitrum",
		symbol: "ARB",
		family: "evm",
		publicProfile: true,
		aliasOf: "eth"
	}
};
var DEFAULT_MAIN_CHAINS = [
	"eth",
	"usdc",
	"sol",
	"btc"
];
var PUBLIC_CHAIN_PRIORITY = [
	"eth",
	"usdc",
	"sol",
	"btc",
	"sui",
	"base",
	"polygon",
	"arbitrum"
];
var ownerIdForUser = (userId) => `user:${userId}`;
var walletPermissions = (userId) => [
	Permission.read(Role.user(userId)),
	Permission.update(Role.user(userId)),
	Permission.delete(Role.user(userId))
];
var walletMapPermissions = (userId) => [
	Permission.read(Role.any()),
	Permission.update(Role.user(userId)),
	Permission.delete(Role.user(userId))
];
var sortWallets = (wallets) => [...wallets].sort((a, b) => {
	const aIndex = PUBLIC_CHAIN_PRIORITY.indexOf(a.chain);
	const bIndex = PUBLIC_CHAIN_PRIORITY.indexOf(b.chain);
	return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
});
var bytesToHex = (bytes) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
var getRootChain = (chain) => NETWORKS[chain].aliasOf || chain;
var toWalletSummary = (row) => ({
	id: row.$id,
	chain: row.chain,
	label: NETWORKS[row.chain]?.label || row.chain,
	symbol: NETWORKS[row.chain]?.symbol || row.chain.toUpperCase(),
	family: NETWORKS[row.chain]?.family || "evm",
	address: row.address,
	type: row.type,
	publicProfile: NETWORKS[row.chain]?.publicProfile ?? false
});
var createRootEnvelope = () => ({
	version: "t4.wallet.root.v1",
	walletId: crypto.randomUUID(),
	mnemonic: import_src.generateMnemonic(128),
	createdAt: (/* @__PURE__ */ new Date()).toISOString()
});
var buildPublicWalletPayload = (wallets) => {
	const byChain = new Map(wallets.map((wallet) => [wallet.chain, wallet.address]));
	const published = {};
	for (const chain of PUBLIC_CHAIN_PRIORITY) {
		if (!NETWORKS[chain].publicProfile) continue;
		const address = byChain.get(chain);
		if (!address) continue;
		published[chain] = address;
	}
	const orderedChains = Object.keys(published);
	while (orderedChains.length > 0) {
		const candidate = orderedChains.reduce((acc, chain) => {
			acc[chain] = published[chain];
			return acc;
		}, {});
		const serialized = JSON.stringify(candidate);
		if (serialized.length <= 256) return serialized;
		orderedChains.pop();
	}
	return null;
};
var deriveAddress = async (root, chain, cache) => {
	const rootChain = getRootChain(chain);
	const cached = cache.get(rootChain);
	if (cached) return cached;
	let address = "";
	switch (NETWORKS[rootChain].family) {
		case "evm":
			address = HDNodeWallet.fromPhrase(root.mnemonic, void 0, "m/44'/60'/0'/0/0").address;
			break;
		case "solana": {
			const seed = import_src.mnemonicToSeedSync(root.mnemonic);
			const derivedSeed = Uint8Array.from(seed).slice(0, 32);
			if (derivedSeed.length < 32) throw new Error("Failed to derive Solana seed");
			address = Keypair.fromSeed(derivedSeed).publicKey.toBase58();
			break;
		}
		case "bitcoin": {
			const seed = import_src.mnemonicToSeedSync(root.mnemonic);
			const payment = p2wpkh({
				pubkey: bip32.fromSeed(seed, bitcoin).derivePath("m/84'/0'/0'/0/0").publicKey,
				network: bitcoin
			});
			if (!payment.address) throw new Error("Failed to derive Bitcoin address");
			address = payment.address;
			break;
		}
		case "sui":
			address = Ed25519Keypair.deriveKeypair(root.mnemonic, "m/44'/784'/0'/0'/0'").toSuiAddress();
			break;
		default: throw new Error(`Unsupported wallet family for ${chain}`);
	}
	cache.set(rootChain, address);
	return address;
};
var parseRootEnvelope = async (encryptedSecret) => {
	const decrypted = await ecosystemSecurity.decrypt(encryptedSecret);
	const parsed = JSON.parse(decrypted);
	if (parsed?.version !== "t4.wallet.root.v1" || !parsed?.mnemonic) throw new Error("Unsupported wallet secret envelope");
	return parsed;
};
var listWalletRows = async (userId) => {
	return sortWallets((await tablesDB.listRows(PASSWORD_MANAGER_DB, WALLETS_TABLE, [
		Query.equal("ownerId", ownerIdForUser(userId)),
		Query.equal("type", "main"),
		Query.limit(100)
	])).rows);
};
var createWalletRow = async (userId, chain, root, cache) => {
	const address = await deriveAddress(root, chain, cache);
	const encryptedSecret = await ecosystemSecurity.encrypt(JSON.stringify(root));
	const walletId = `main-${chain}-${userId}`;
	try {
		return await tablesDB.createRow(PASSWORD_MANAGER_DB, WALLETS_TABLE, walletId, {
			ownerId: ownerIdForUser(userId),
			address,
			chain,
			encryptedSecret,
			type: "main"
		}, walletPermissions(userId));
	} catch (error) {
		if (error?.code === 409) return await tablesDB.getRow(PASSWORD_MANAGER_DB, WALLETS_TABLE, walletId);
		throw error;
	}
};
var syncWalletMap = async (userId, wallets) => {
	const publicAddresses = Array.from(new Set(wallets.filter((wallet) => NETWORKS[wallet.chain]?.publicProfile).map((wallet) => wallet.address.toLowerCase())));
	const existing = await tablesDB.listRows(NOTE_DB, WALLET_MAP_TABLE, [Query.equal("userId", userId), Query.limit(100)]);
	for (const row of existing.rows) if (!publicAddresses.includes(row.walletAddressLower)) await tablesDB.deleteRow(NOTE_DB, WALLET_MAP_TABLE, row.$id);
	const existingAddresses = new Set(existing.rows.map((row) => row.walletAddressLower));
	for (const walletAddressLower of publicAddresses) {
		if (existingAddresses.has(walletAddressLower)) continue;
		try {
			await tablesDB.createRow(NOTE_DB, WALLET_MAP_TABLE, ID.unique(), {
				walletAddressLower,
				userId,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}, walletMapPermissions(userId));
		} catch (error) {
			console.warn("[WalletService] Failed to sync walletMap row", error);
		}
	}
};
var publishWalletAddresses = async (userId, wallets) => {
	const serialized = buildPublicWalletPayload(wallets);
	await UsersService.updateProfile(userId, { walletAddress: serialized });
	await syncWalletMap(userId, wallets);
};
var WalletService = {
	defaultChains: DEFAULT_MAIN_CHAINS,
	supportedChains: Object.keys(NETWORKS),
	networkDefinitions: NETWORKS,
	async listMainWallets(userId) {
		return (await listWalletRows(userId)).map(toWalletSummary);
	},
	async listAllWallets(userId) {
		return (await tablesDB.listRows(PASSWORD_MANAGER_DB, WALLETS_TABLE, [Query.equal("ownerId", ownerIdForUser(userId)), Query.limit(100)])).rows.map(toWalletSummary);
	},
	async createBurnerWallet(userId) {
		if (!ecosystemSecurity.status.isUnlocked || !ecosystemSecurity.getMasterKey()) throw new Error("Wallet vault is locked");
		const root = createRootEnvelope();
		const cache = /* @__PURE__ */ new Map();
		const createdRows = [];
		for (const chain of DEFAULT_MAIN_CHAINS) {
			const address = await deriveAddress(root, chain, cache);
			const encryptedSecret = await ecosystemSecurity.encrypt(JSON.stringify(root));
			const walletId = `burner-${root.walletId.slice(0, 8)}-${chain}-${userId}`;
			const created = await tablesDB.createRow(PASSWORD_MANAGER_DB, WALLETS_TABLE, walletId, {
				ownerId: ownerIdForUser(userId),
				address,
				chain,
				encryptedSecret,
				type: "burner"
			}, walletPermissions(userId));
			createdRows.push(created);
		}
		return createdRows.map(toWalletSummary);
	},
	async ensureMainWallets(userId) {
		if (!ecosystemSecurity.status.isUnlocked || !ecosystemSecurity.getMasterKey()) throw new Error("Wallet vault is locked");
		const existingRows = await listWalletRows(userId);
		const cache = /* @__PURE__ */ new Map();
		const root = existingRows[0] ? await parseRootEnvelope(existingRows[0].encryptedSecret) : createRootEnvelope();
		const walletsByChain = new Map(existingRows.map((wallet) => [wallet.chain, wallet]));
		const createdRows = [];
		for (const chain of DEFAULT_MAIN_CHAINS) {
			if (walletsByChain.has(chain)) continue;
			const created = await createWalletRow(userId, chain, root, cache);
			walletsByChain.set(chain, created);
			createdRows.push(created);
		}
		const allWallets = sortWallets([...existingRows, ...createdRows]);
		await publishWalletAddresses(userId, allWallets);
		return allWallets.map(toWalletSummary);
	},
	async addNetwork(userId, chain) {
		if (!NETWORKS[chain]) throw new Error(`Unsupported wallet network: ${chain}`);
		if (!ecosystemSecurity.status.isUnlocked || !ecosystemSecurity.getMasterKey()) throw new Error("Wallet vault is locked");
		const existingRows = await listWalletRows(userId);
		if (!existingRows.length) {
			await this.ensureMainWallets(userId);
			return this.addNetwork(userId, chain);
		}
		if (existingRows.some((wallet) => wallet.chain === chain)) return existingRows.map(toWalletSummary);
		const created = await createWalletRow(userId, chain, await parseRootEnvelope(existingRows[0].encryptedSecret), /* @__PURE__ */ new Map());
		const allWallets = sortWallets([...existingRows, created]);
		await publishWalletAddresses(userId, allWallets);
		return allWallets.map(toWalletSummary);
	},
	async getWalletSecret(userId) {
		if (!ecosystemSecurity.status.isUnlocked || !ecosystemSecurity.getMasterKey()) throw new Error("Wallet vault is locked");
		const response = await tablesDB.listRows(PASSWORD_MANAGER_DB, WALLETS_TABLE, [
			Query.equal("ownerId", ownerIdForUser(userId)),
			Query.equal("type", "main"),
			Query.limit(1)
		]);
		if (response.rows.length === 0) throw new Error("No wallets found");
		return (await parseRootEnvelope(response.rows[0].encryptedSecret)).mnemonic;
	},
	async derivePrivateKey(userId, chain) {
		if (!ecosystemSecurity.status.isUnlocked || !ecosystemSecurity.getMasterKey()) throw new Error("Wallet vault is locked");
		const mnemonic = await this.getWalletSecret(userId);
		switch (NETWORKS[getRootChain(chain)].family) {
			case "evm": return HDNodeWallet.fromPhrase(mnemonic, void 0, "m/44'/60'/0'/0/0").privateKey;
			case "solana": {
				const seed = import_src.mnemonicToSeedSync(mnemonic);
				const derivedSeed = Uint8Array.from(seed).slice(0, 32);
				if (derivedSeed.length < 32) throw new Error("Failed to derive Solana seed");
				return bytesToHex(Keypair.fromSeed(derivedSeed).secretKey);
			}
			case "bitcoin": {
				const seed = import_src.mnemonicToSeedSync(mnemonic);
				return bip32.fromSeed(seed, bitcoin).derivePath("m/84'/0'/0'/0/0").toWIF();
			}
			case "sui": return Ed25519Keypair.deriveKeypair(mnemonic, "m/44'/784'/0'/0'/0'").getSecretKey();
			default: throw new Error(`Unsupported wallet family for ${chain}`);
		}
	}
};
var shortenAddress = (address) => {
	if (!address) return "";
	if (address.length <= 12) return address;
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
var WalletSidebar = ({ isOpen, onClose }) => {
	const isMobile = useMediaQuery(useTheme().breakpoints.down("md"), { noSsr: true });
	const { user } = useAuth();
	const { requestSudo } = useSudo();
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(ecosystemSecurity.status.isUnlocked);
	const [isExpanded, setIsExpanded] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [hasMasterpass, setHasMasterpass] = (0, import_react.useState)(null);
	const [wallets, setWallets] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	const [loadingLabel, setLoadingLabel] = (0, import_react.useState)("Preparing your secure wallet...");
	const [pendingChain, setPendingChain] = (0, import_react.useState)(null);
	const [showSettings, setShowSettings] = (0, import_react.useState)(false);
	const [showExportOptions, setShowExportOptions] = (0, import_react.useState)(false);
	const [showWalletList, setShowWalletList] = (0, import_react.useState)(false);
	const [allWallets, setAllWallets] = (0, import_react.useState)([]);
	const [isCreatingBurner, setIsCreatingBurner] = (0, import_react.useState)(false);
	const [viewingSecret, setViewingSecret] = (0, import_react.useState)(null);
	const [isSecretVisible, setIsSecretVisible] = (0, import_react.useState)(false);
	const AMBER = "#F59E0B";
	const SURFACE = "#161412";
	const HIGHLIGHT = "#1C1A18";
	const VOID = "#0A0908";
	const rimLight = { boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.4)" };
	(0, import_react.useEffect)(() => {
		return ecosystemSecurity.onStatusChange((status) => {
			if (status.isUnlocked !== isUnlocked) setIsUnlocked(status.isUnlocked);
		});
	}, [isUnlocked]);
	const refreshWallets = (0, import_react.useCallback)(async () => {
		if (!user?.$id || !isOpen) return;
		setError(null);
		const masterpassPresent = await KeychainService.hasMasterpass(user.$id);
		setHasMasterpass(masterpassPresent);
		if (!masterpassPresent) {
			setWallets([]);
			return;
		}
		if (!ecosystemSecurity.status.isUnlocked) return;
		setLoading(true);
		setLoadingLabel("Loading your wallets...");
		try {
			setWallets(await WalletService.listMainWallets(user.$id));
		} catch (walletError) {
			console.error("[WalletSidebar] Failed to load wallets", walletError);
			setError(walletError instanceof Error ? walletError.message : "Failed to load wallet");
		} finally {
			setLoading(false);
		}
	}, [isOpen, user?.$id]);
	const handleProvisionWallets = (0, import_react.useCallback)(async () => {
		if (!user?.$id) return;
		setLoading(true);
		setLoadingLabel("Provisioning your T4 wallet mesh...");
		setError(null);
		try {
			setWallets(await WalletService.ensureMainWallets(user.$id));
		} catch (walletError) {
			console.error("[WalletSidebar] Failed to provision wallets", walletError);
			setError(walletError instanceof Error ? walletError.message : "Failed to provision wallet");
		} finally {
			setLoading(false);
		}
	}, [user?.$id]);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		refreshWallets();
	}, [
		isOpen,
		isUnlocked,
		refreshWallets
	]);
	(0, import_react.useEffect)(() => {
		if (isOpen && hasMasterpass === false) {
			const baseUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
			const callbackUrl = encodeURIComponent(baseUrl + "?openWallet=true");
			window.location.href = `https://vault.kylrix.space/masterpass?callbackUrl=${callbackUrl}`;
		}
	}, [isOpen, hasMasterpass]);
	const handleUnlock = (0, import_react.useCallback)(() => {
		requestSudo({ onSuccess: async () => {
			n.success("Wallet Unlocked");
			await refreshWallets();
		} });
	}, [requestSudo, refreshWallets]);
	(0, import_react.useEffect)(() => {
		if (isOpen && !isUnlocked && hasMasterpass !== false && !loading) handleUnlock();
	}, [
		isOpen,
		isUnlocked,
		hasMasterpass,
		loading,
		handleUnlock
	]);
	const handleCopyAddress = (address) => {
		navigator.clipboard.writeText(address);
		n.success("Address copied");
	};
	const handleAddNetwork = async (chain) => {
		if (!user?.$id) return;
		setPendingChain(chain);
		setError(null);
		try {
			setWallets(await WalletService.addNetwork(user.$id, chain));
			n.success(`${WalletService.networkDefinitions[chain].label} added`);
		} catch (networkError) {
			console.error("[WalletSidebar] Failed to add network", networkError);
			n.error(networkError instanceof Error ? networkError.message : "Failed to add network");
		} finally {
			setPendingChain(null);
		}
	};
	const addableNetworks = (0, import_react.useMemo)(() => WalletService.supportedChains.filter((chain) => !wallets.some((wallet) => wallet.chain === chain)), [wallets]);
	const getExplorerUrl = (wallet) => {
		switch (wallet.chain) {
			case "btc": return `https://www.blockchain.com/explorer/addresses/btc/${wallet.address}`;
			case "sol": return `https://solscan.io/account/${wallet.address}`;
			case "sui": return `https://suivision.xyz/account/${wallet.address}`;
			case "eth":
			case "usdc": return `https://etherscan.io/address/${wallet.address}`;
			case "base": return `https://basescan.org/address/${wallet.address}`;
			case "polygon": return `https://polygonscan.com/address/${wallet.address}`;
			case "arbitrum": return `https://arbiscan.io/address/${wallet.address}`;
			default: return null;
		}
	};
	const loadAllWallets = (0, import_react.useCallback)(async () => {
		if (!user?.$id) return;
		try {
			setAllWallets(await WalletService.listAllWallets(user.$id));
		} catch (e) {
			console.error("Failed to load all wallets", e);
		}
	}, [user?.$id]);
	const handleCreateBurner = async () => {
		if (!user?.$id) return;
		setIsCreatingBurner(true);
		try {
			await WalletService.createBurnerWallet(user.$id);
			n.success("Burner wallet identity provisioned");
			await loadAllWallets();
			await refreshWallets();
		} catch (_e) {
			n.error("Failed to create burner wallet");
		} finally {
			setIsCreatingBurner(false);
		}
	};
	const handleClose = (0, import_react.useCallback)(() => {
		setShowSettings(false);
		setShowExportOptions(false);
		setShowWalletList(false);
		setViewingSecret(null);
		setIsSecretVisible(false);
		onClose();
	}, [onClose]);
	const renderWalletContent = () => {
		if (viewingSecret) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				height: "100%",
				display: "flex",
				flexDirection: "column",
				p: 3
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					alignItems: "center",
					gap: 1,
					sx: { mb: 4 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						size: "small",
						onClick: () => {
							setViewingSecret(null);
							setIsSecretVisible(false);
						},
						sx: {
							color: "rgba(255,255,255,0.4)",
							"&:hover": { color: "white" }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h6",
						sx: {
							fontWeight: 900,
							fontFamily: "var(--font-clash)",
							color: "white"
						},
						children: viewingSecret.type === "phrase" ? "Secret Recovery Phrase" : `Private Key (${viewingSecret.chainLabel})`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						p: 3,
						bgcolor: SURFACE,
						borderRadius: "24px",
						border: "1px solid rgba(245, 158, 11, 0.2)",
						...rimLight,
						mb: 4
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						gap: 1.5,
						sx: {
							mb: 2,
							color: AMBER
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								fontWeight: 800,
								fontFamily: "Satoshi"
							},
							children: "Security Warning"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
						variant: "caption",
						sx: {
							color: "rgba(255,255,255,0.5)",
							fontFamily: "Satoshi",
							lineHeight: 1.6,
							display: "block"
						},
						children: [
							"Never share your ",
							viewingSecret.type === "phrase" ? "recovery phrase" : "private key",
							" with anyone. Anyone with this information can take full control of your assets. Kylrix support will never ask for this."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						p: 3,
						bgcolor: VOID,
						borderRadius: "18px",
						border: "1px solid rgba(255,255,255,0.05)",
						position: "relative",
						minHeight: 120,
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					},
					children: [isSecretVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							color: "white",
							fontFamily: "JetBrains Mono",
							wordBreak: "break-all",
							lineHeight: 1.8,
							letterSpacing: "0.05em",
							textAlign: "center",
							px: 2
						},
						children: viewingSecret.value
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						alignItems: "center",
						gap: 2,
						sx: { opacity: .3 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 24 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								fontFamily: "Satoshi",
								fontWeight: 700
							},
							children: "Content Hidden"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						gap: .5,
						sx: {
							position: "absolute",
							top: 8,
							right: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							onClick: () => setIsSecretVisible(!isSecretVisible),
							size: "small",
							sx: {
								color: "rgba(255,255,255,0.2)",
								"&:hover": { color: "white" }
							},
							children: isSecretVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							onClick: () => handleCopyAddress(viewingSecret.value),
							size: "small",
							sx: {
								color: "rgba(255,255,255,0.2)",
								"&:hover": { color: AMBER }
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: { flex: 1 } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					fullWidth: true,
					variant: "contained",
					onClick: () => {
						setViewingSecret(null);
						setIsSecretVisible(false);
					},
					sx: {
						bgcolor: SURFACE,
						color: "white",
						fontWeight: 800,
						borderRadius: "14px",
						py: 1.5,
						textTransform: "none",
						fontFamily: "Satoshi",
						border: "1px solid rgba(255,255,255,0.1)",
						"&:hover": { bgcolor: HIGHLIGHT }
					},
					children: "Done"
				})
			]
		});
		if (showExportOptions) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				height: "100%",
				display: "flex",
				flexDirection: "column",
				p: 3
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				direction: "row",
				alignItems: "center",
				gap: 1,
				sx: { mb: 4 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					size: "small",
					onClick: () => setShowExportOptions(false),
					sx: {
						color: "rgba(255,255,255,0.4)",
						"&:hover": { color: "white" }
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "h6",
					sx: {
						fontWeight: 900,
						fontFamily: "var(--font-clash)",
						color: "white"
					},
					children: "Export Wallet"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				gap: 1.5,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						onClick: () => {
							requestSudo({ onSuccess: async () => {
								try {
									setViewingSecret({
										type: "phrase",
										value: await WalletService.getWalletSecret(user.$id)
									});
								} catch (_e) {
									n.error("Failed to retrieve phrase");
								}
							} });
						},
						sx: {
							p: 2,
							borderRadius: "18px",
							bgcolor: SURFACE,
							border: "1px solid rgba(255,255,255,0.03)",
							...rimLight,
							cursor: "pointer",
							transition: "all 0.2s ease",
							"&:hover": {
								bgcolor: HIGHLIGHT,
								transform: "translateX(4px)"
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							alignItems: "center",
							justifyContent: "space-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								alignItems: "center",
								gap: 2,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									sx: {
										p: 1,
										borderRadius: "10px",
										bgcolor: alpha("#fff", .05),
										color: "rgba(255,255,255,0.6)"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 18 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: {
										fontWeight: 800,
										color: "white",
										fontFamily: "Satoshi"
									},
									children: "View Secret Phrase"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "rgba(255,255,255,0.4)",
										fontFamily: "Satoshi"
									},
									children: "12-word recovery mnemonic"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								size: 18,
								color: "rgba(255,255,255,0.2)"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							fontWeight: 800,
							color: "rgba(255,255,255,0.25)",
							textTransform: "uppercase",
							mt: 2,
							mb: 1,
							px: 1
						},
						children: "Individual Private Keys"
					}),
					wallets.map((wallet) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						onClick: () => {
							requestSudo({ onSuccess: async () => {
								try {
									setViewingSecret({
										type: "key",
										value: await WalletService.derivePrivateKey(user.$id, wallet.chain),
										chainLabel: wallet.label
									});
								} catch (_e) {
									n.error("Failed to derive private key");
								}
							} });
						},
						sx: {
							p: 2,
							borderRadius: "18px",
							bgcolor: SURFACE,
							border: "1px solid rgba(255,255,255,0.03)",
							...rimLight,
							cursor: "pointer",
							transition: "all 0.2s ease",
							"&:hover": {
								bgcolor: HIGHLIGHT,
								transform: "translateX(4px)"
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							alignItems: "center",
							justifyContent: "space-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								alignItems: "center",
								gap: 2,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									sx: {
										p: 1,
										borderRadius: "10px",
										bgcolor: alpha(AMBER, .1),
										color: AMBER
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { size: 18 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
									variant: "body2",
									sx: {
										fontWeight: 800,
										color: "white",
										fontFamily: "Satoshi"
									},
									children: [wallet.label, " Key"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "rgba(255,255,255,0.4)",
										fontFamily: "Satoshi"
									},
									children: "Export hex private key"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								size: 18,
								color: "rgba(255,255,255,0.2)"
							})]
						})
					}, `export-${wallet.id}`))
				]
			})]
		});
		if (showWalletList) {
			const mainWallets = allWallets.filter((w) => w.type === "main");
			const burnerWallets = allWallets.filter((w) => w.type === "burner");
			const agentWallets = allWallets.filter((w) => w.type === "agent_sub_wallet");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					height: "100%",
					display: "flex",
					flexDirection: "column",
					p: 3
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					alignItems: "center",
					gap: 1,
					sx: { mb: 4 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						size: "small",
						onClick: () => setShowWalletList(false),
						sx: {
							color: "rgba(255,255,255,0.4)",
							"&:hover": { color: "white" }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h6",
						sx: {
							fontWeight: 900,
							fontFamily: "var(--font-clash)",
							color: "white"
						},
						children: "Wallets"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						flex: 1,
						overflowY: "auto",
						pr: .5
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						gap: 3,
						children: [
							mainWallets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "caption",
								sx: {
									fontWeight: 800,
									color: AMBER,
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									px: 1,
									mb: 1,
									display: "block"
								},
								children: "Main Identity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
								gap: 1,
								children: Array.from(new Set(mainWallets.map((w) => w.address))).map((addr) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
										sx: {
											p: 2,
											borderRadius: "18px",
											bgcolor: SURFACE,
											border: "1px solid rgba(255,255,255,0.03)",
											...rimLight
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "body2",
											sx: {
												fontWeight: 800,
												color: "white"
											},
											children: "Master Wallet"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "caption",
											sx: {
												color: "rgba(255,255,255,0.4)",
												fontFamily: "JetBrains Mono"
											},
											children: shortenAddress(addr)
										})]
									}, addr);
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								justifyContent: "space-between",
								alignItems: "center",
								sx: {
									mb: 1,
									px: 1
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										fontWeight: 800,
										color: "rgba(255,255,255,0.25)",
										textTransform: "uppercase",
										letterSpacing: "0.1em"
									},
									children: "Burner Wallets"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "small",
									onClick: handleCreateBurner,
									disabled: isCreatingBurner,
									startIcon: isCreatingBurner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }),
									sx: {
										color: AMBER,
										textTransform: "none",
										fontWeight: 800,
										fontSize: "0.7rem"
									},
									children: "New Burner"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
								gap: 1,
								children: burnerWallets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "rgba(255,255,255,0.2)",
										textAlign: "center",
										py: 2
									},
									children: "No burner wallets yet"
								}) : Array.from(new Set(burnerWallets.map((w) => w.address))).map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
									sx: {
										p: 2,
										borderRadius: "18px",
										bgcolor: SURFACE,
										border: "1px solid rgba(255,255,255,0.03)",
										...rimLight
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "body2",
										sx: {
											fontWeight: 800,
											color: "white"
										},
										children: "Burner"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: {
											color: "rgba(255,255,255,0.4)",
											fontFamily: "JetBrains Mono"
										},
										children: shortenAddress(addr)
									})]
								}, addr))
							})] }),
							agentWallets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "caption",
								sx: {
									fontWeight: 800,
									color: "rgba(255,255,255,0.25)",
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									px: 1,
									mb: 1,
									display: "block"
								},
								children: "Agentic Wallets"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
								gap: 1,
								children: Array.from(new Set(agentWallets.map((w) => w.address))).map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
									sx: {
										p: 2,
										borderRadius: "18px",
										bgcolor: SURFACE,
										border: "1px solid rgba(255,255,255,0.03)",
										...rimLight
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "body2",
										sx: {
											fontWeight: 800,
											color: "white"
										},
										children: "Automated Agent"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: {
											color: "rgba(255,255,255,0.4)",
											fontFamily: "JetBrains Mono"
										},
										children: shortenAddress(addr)
									})]
								}, addr))
							})] })
						]
					})
				})]
			});
		}
		if (showSettings) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				height: "100%",
				display: "flex",
				flexDirection: "column",
				p: 3
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					alignItems: "center",
					gap: 1,
					sx: { mb: 4 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						size: "small",
						onClick: () => setShowSettings(false),
						sx: {
							color: "rgba(255,255,255,0.4)",
							"&:hover": { color: "white" }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h6",
						sx: {
							fontWeight: 900,
							fontFamily: "var(--font-clash)",
							color: "white"
						},
						children: "Wallet Settings"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					gap: 1.5,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						onClick: () => {
							setShowWalletList(true);
							loadAllWallets();
						},
						sx: {
							p: 2,
							borderRadius: "18px",
							bgcolor: SURFACE,
							border: "1px solid rgba(255,255,255,0.03)",
							...rimLight,
							cursor: "pointer",
							transition: "all 0.2s ease",
							"&:hover": {
								bgcolor: HIGHLIGHT,
								transform: "translateX(4px)"
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							alignItems: "center",
							justifyContent: "space-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								alignItems: "center",
								gap: 2,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									sx: {
										p: 1,
										borderRadius: "10px",
										bgcolor: alpha(AMBER, .1),
										color: AMBER
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { size: 18 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: {
										fontWeight: 800,
										color: "white",
										fontFamily: "Satoshi"
									},
									children: "Wallets"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "rgba(255,255,255,0.4)",
										fontFamily: "Satoshi"
									},
									children: "Manage main and burner identities"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								size: 18,
								color: "rgba(255,255,255,0.2)"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						onClick: () => setShowExportOptions(true),
						sx: {
							p: 2,
							borderRadius: "18px",
							bgcolor: SURFACE,
							border: "1px solid rgba(255,255,255,0.03)",
							...rimLight,
							cursor: "pointer",
							transition: "all 0.2s ease",
							"&:hover": {
								bgcolor: HIGHLIGHT,
								transform: "translateX(4px)"
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							alignItems: "center",
							justifyContent: "space-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								alignItems: "center",
								gap: 2,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									sx: {
										p: 1,
										borderRadius: "10px",
										bgcolor: alpha(AMBER, .1),
										color: AMBER
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 18 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: {
										fontWeight: 800,
										color: "white",
										fontFamily: "Satoshi"
									},
									children: "Export Wallet"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "rgba(255,255,255,0.4)",
										fontFamily: "Satoshi"
									},
									children: "View keys and recovery phrase"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								size: 18,
								color: "rgba(255,255,255,0.2)"
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: { flex: 1 } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "caption",
					sx: {
						textAlign: "center",
						color: "rgba(255,255,255,0.2)",
						fontFamily: "Satoshi",
						mb: 2
					},
					children: "Kylrix Connect v0.1.0 • T4 Secure"
				})
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				height: "100%",
				display: "flex",
				flexDirection: "column",
				p: 3
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					alignItems: "center",
					justifyContent: "space-between",
					sx: { mb: 4 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						alignItems: "center",
						gap: 1.5,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								p: 1,
								borderRadius: "12px",
								bgcolor: alpha(AMBER, .1),
								color: AMBER,
								display: "flex",
								...rimLight
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { size: 20 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "h6",
							sx: {
								fontWeight: 900,
								fontFamily: "var(--font-clash)",
								letterSpacing: "-0.02em",
								color: "white"
							},
							children: "Kylrix Wallet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								color: "rgba(255,255,255,0.35)",
								fontWeight: 700,
								fontFamily: "Satoshi"
							},
							children: "T4 Non-Custodial Layer"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						onClick: handleClose,
						sx: {
							color: "rgba(255, 255, 255, 0.4)",
							"&:hover": {
								color: "white",
								bgcolor: HIGHLIGHT
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
					})]
				}),
				!user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						px: 2
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							color: "rgba(255,255,255,0.45)",
							maxWidth: 260,
							fontFamily: "Satoshi"
						},
						children: "Sign in to initialize your wallet mesh."
					})
				}) : hasMasterpass === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						px: 2
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								width: 64,
								height: 64,
								borderRadius: "20px",
								bgcolor: SURFACE,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								mb: 3,
								...rimLight,
								color: "rgba(255, 255, 255, 0.2)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 32 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body1",
							sx: {
								fontWeight: 700,
								mb: 1,
								fontFamily: "Satoshi",
								color: "white"
							},
							children: "Vault Setup Required"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								color: "rgba(255, 255, 255, 0.4)",
								mb: 4,
								maxWidth: 260,
								fontFamily: "Satoshi"
							},
							children: "Wallet provisioning becomes automatic once your MasterPass exists for Tier 3 encryption."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "contained",
							onClick: () => {
								const baseUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
								const callbackUrl = encodeURIComponent(baseUrl + "?openWallet=true");
								window.location.href = `https://vault.kylrix.space/masterpass?callbackUrl=${callbackUrl}`;
							},
							sx: {
								bgcolor: "white",
								color: "#000",
								fontWeight: 900,
								borderRadius: "14px",
								px: 4,
								py: 1.5,
								textTransform: "none",
								fontFamily: "Satoshi",
								...rimLight,
								"&:hover": {
									bgcolor: alpha("#fff", .9),
									transform: "translateY(-1px)"
								},
								transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
							},
							children: "Setup MasterPass"
						})
					]
				}) : !isUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						px: 2
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								width: 64,
								height: 64,
								borderRadius: "20px",
								bgcolor: SURFACE,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								mb: 3,
								...rimLight,
								color: AMBER
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 32 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body1",
							sx: {
								fontWeight: 700,
								mb: 1,
								fontFamily: "Satoshi",
								color: "white"
							},
							children: "Wallet is Locked"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								color: "rgba(255, 255, 255, 0.4)",
								mb: 4,
								maxWidth: 240,
								fontFamily: "Satoshi"
							},
							children: "Unlock your secure vault and Connect will auto-provision your main wallet addresses with zero extra input."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "contained",
							onClick: handleUnlock,
							startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { size: 18 }),
							sx: {
								bgcolor: AMBER,
								color: "#000",
								fontWeight: 900,
								borderRadius: "14px",
								px: 4,
								py: 1.5,
								textTransform: "none",
								fontFamily: "Satoshi",
								...rimLight,
								"&:hover": {
									bgcolor: alpha(AMBER, .9),
									transform: "translateY(-1px)"
								},
								transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
							},
							children: "Unlock Wallet"
						})
					]
				}) : loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						px: 2
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { sx: {
							color: AMBER,
							mb: 3
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body1",
							sx: {
								fontWeight: 700,
								mb: 1,
								fontFamily: "Satoshi",
								color: "white"
							},
							children: "Loading Wallets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								color: "rgba(255,255,255,0.4)",
								maxWidth: 280,
								fontFamily: "Satoshi"
							},
							children: loadingLabel
						})
					]
				}) : wallets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						px: 2
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								width: 64,
								height: 64,
								borderRadius: "20px",
								bgcolor: SURFACE,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								mb: 3,
								...rimLight,
								color: "rgba(255, 255, 255, 0.2)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { size: 32 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body1",
							sx: {
								fontWeight: 700,
								mb: 1,
								fontFamily: "Satoshi",
								color: "white"
							},
							children: "Wallets Not Provisioned"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								color: "rgba(255, 255, 255, 0.4)",
								mb: 4,
								maxWidth: 280,
								fontFamily: "Satoshi"
							},
							children: "Your wallet drawer now loads existing wallets only. Provision them explicitly when you are ready."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "contained",
							onClick: handleProvisionWallets,
							sx: {
								bgcolor: AMBER,
								color: "#000",
								fontWeight: 900,
								borderRadius: "14px",
								px: 4,
								py: 1.5,
								textTransform: "none",
								fontFamily: "Satoshi",
								...rimLight,
								"&:hover": {
									bgcolor: alpha(AMBER, .9),
									transform: "translateY(-1px)"
								},
								transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
							},
							children: "Provision Wallets"
						})
					]
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
						sx: {
							p: 3,
							borderRadius: "20px",
							bgcolor: SURFACE,
							...rimLight,
							textAlign: "center",
							maxWidth: 280
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body1",
								sx: {
									fontWeight: 800,
									mb: 1,
									fontFamily: "Satoshi",
									color: "white"
								},
								children: "Wallet Sync Failed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									color: "rgba(255,255,255,0.45)",
									mb: 2,
									fontFamily: "Satoshi"
								},
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: refreshWallets,
								variant: "outlined",
								sx: {
									borderRadius: "12px",
									borderColor: "rgba(255,255,255,0.1)",
									color: "white",
									textTransform: "none",
									fontFamily: "Satoshi",
									"&:hover": {
										bgcolor: HIGHLIGHT,
										borderColor: "rgba(255,255,255,0.2)"
									}
								},
								children: "Retry"
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						flex: 1,
						overflowY: "auto",
						pr: .5,
						"&::-webkit-scrollbar": { width: "4px" },
						"&::-webkit-scrollbar-thumb": {
							bgcolor: "rgba(255,255,255,0.05)",
							borderRadius: "10px"
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								p: 3,
								mb: 3,
								textAlign: "center",
								bgcolor: SURFACE,
								borderRadius: "24px",
								...rimLight,
								position: "relative",
								overflow: "hidden",
								border: "1px solid rgba(255, 255, 255, 0.03)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: AMBER,
										fontWeight: 800,
										textTransform: "uppercase",
										letterSpacing: "0.15em",
										fontFamily: "Satoshi",
										opacity: .8
									},
									children: "Estimated Balance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "h3",
									sx: {
										fontWeight: 900,
										mt: .5,
										fontFamily: "var(--font-clash)",
										color: "white",
										letterSpacing: "-0.02em"
									},
									children: "$0.00"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
									variant: "caption",
									sx: {
										color: "rgba(255,255,255,0.25)",
										fontWeight: 700,
										fontFamily: "Satoshi"
									},
									children: [wallets.length, " active networks"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: 1.5,
							sx: { mb: 4 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "caption",
								sx: {
									fontWeight: 800,
									color: "rgba(255,255,255,0.25)",
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									fontFamily: "Satoshi"
								},
								children: "Live Networks"
							}), wallets.map((wallet) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								sx: {
									p: 1.5,
									px: 2,
									borderRadius: "18px",
									bgcolor: SURFACE,
									border: "1px solid rgba(255,255,255,0.03)",
									...rimLight,
									transition: "all 0.2s ease",
									"&:hover": {
										bgcolor: HIGHLIGHT,
										transform: "translateX(4px)"
									}
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									direction: "row",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 2,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
										sx: { minWidth: 0 },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "body2",
											sx: {
												fontWeight: 800,
												color: "white",
												fontFamily: "Satoshi"
											},
											children: wallet.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "caption",
											sx: {
												color: "rgba(255,255,255,0.4)",
												fontFamily: "JetBrains Mono",
												display: "block"
											},
											children: shortenAddress(wallet.address)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										alignItems: "flex-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
											variant: "body2",
											sx: {
												fontWeight: 900,
												color: AMBER,
												fontFamily: "JetBrains Mono",
												fontSize: "0.8rem"
											},
											children: ["0.00 ", wallet.symbol]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
											direction: "row",
											gap: .5,
											sx: { mt: .5 },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
												size: "small",
												onClick: () => handleCopyAddress(wallet.address),
												sx: {
													p: .5,
													color: "rgba(255,255,255,0.2)",
													"&:hover": { color: AMBER }
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
												size: "small",
												onClick: () => {
													const explorerUrl = getExplorerUrl(wallet);
													if (explorerUrl) window.open(explorerUrl, "_blank", "noopener,noreferrer");
												},
												sx: {
													p: .5,
													color: "rgba(255,255,255,0.2)",
													"&:hover": { color: "white" }
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })
											})]
										})]
									})]
								})
							}, wallet.id))]
						}),
						addableNetworks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: 1.5,
							sx: { mb: 4 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "caption",
								sx: {
									fontWeight: 800,
									color: "rgba(255,255,255,0.25)",
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									fontFamily: "Satoshi"
								},
								children: "Add Network"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
								direction: "row",
								gap: 1,
								flexWrap: "wrap",
								children: addableNetworks.map((chain) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outlined",
									startIcon: pendingChain === chain ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
										size: 14,
										color: "inherit"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }),
									onClick: () => handleAddNetwork(chain),
									disabled: pendingChain !== null,
									sx: {
										borderRadius: "12px",
										borderColor: "rgba(255,255,255,0.08)",
										color: "rgba(255,255,255,0.7)",
										textTransform: "none",
										fontWeight: 800,
										fontFamily: "Satoshi",
										...rimLight,
										"&:hover": {
											bgcolor: HIGHLIGHT,
											borderColor: alpha(AMBER, .3),
											color: "white"
										}
									},
									children: WalletService.networkDefinitions[chain].label
								}, chain))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							gap: 2,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "caption",
								sx: {
									fontWeight: 800,
									color: "rgba(255,255,255,0.25)",
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									fontFamily: "Satoshi"
								},
								children: "Recent Activity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
								sx: {
									p: 4,
									textAlign: "center",
									borderRadius: "24px",
									border: "1px dashed rgba(255,255,255,0.05)",
									bgcolor: "rgba(255,255,255,0.01)",
									...rimLight
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
									size: 24,
									color: "rgba(255,255,255,0.1)",
									style: { marginBottom: 12 }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: {
										color: "rgba(255,255,255,0.3)",
										fontWeight: 700,
										fontFamily: "Satoshi"
									},
									children: "No transactions yet"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: {
					borderColor: "rgba(255,255,255,0.05)",
					my: 2
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					justifyContent: "space-between",
					alignItems: "center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							color: "rgba(255,255,255,0.15)",
							fontWeight: 700,
							fontFamily: "Satoshi"
						},
						children: "Loaded on open, provisioned on demand"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						size: "small",
						onClick: () => setShowSettings(true),
						sx: {
							color: "rgba(255, 255, 255, 0.15)",
							"&:hover": { color: "white" }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 16 })
					})]
				})
			]
		});
	};
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		anchor: "bottom",
		open: isOpen,
		onClose: handleClose,
		PaperProps: { sx: {
			height: isExpanded ? "100%" : "75%",
			bgcolor: VOID,
			borderTop: "1px solid rgba(255, 255, 255, 0.1)",
			borderRadius: isExpanded ? "0" : "32px 32px 0 0",
			backgroundImage: "none",
			transition: "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
			overflow: "hidden"
		} },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			sx: {
				width: "100%",
				pt: 2,
				pb: 1,
				display: "flex",
				justifyContent: "center",
				cursor: "pointer"
			},
			onClick: () => setIsExpanded(!isExpanded),
			children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				direction: "row",
				alignItems: "center",
				gap: 1,
				sx: { color: "rgba(255,255,255,0.4)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "caption",
					sx: {
						fontWeight: 800,
						textTransform: "uppercase",
						fontFamily: "Satoshi"
					},
					children: "Back"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
				width: 40,
				height: 4,
				bgcolor: "rgba(255, 255, 255, 0.1)",
				borderRadius: "2px"
			} })
		}), renderWalletContent()]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		anchor: "right",
		open: isOpen,
		onClose: handleClose,
		PaperProps: { sx: {
			width: 400,
			bgcolor: VOID,
			borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
			backgroundImage: "none",
			boxShadow: "-40px 0 80px rgba(0,0,0,0.9)"
		} },
		children: renderWalletContent()
	});
};
function getUserField(user, field) {
	if (!user) return null;
	if (user && Object.prototype.hasOwnProperty.call(user, field) && user[field] !== void 0 && user[field] !== null) return user[field];
	const prefs = user.prefs || {};
	if (prefs && Object.prototype.hasOwnProperty.call(prefs, field) && prefs[field] !== void 0 && prefs[field] !== null) return prefs[field];
	return null;
}
function getUserProfilePicId(user) {
	return getUserField(user, "avatar") || getUserField(user, "profilePicId");
}
function getUserSubscriptionTier(user) {
	return (getUserField(user, "tier") || getUserField(user, "subscriptionTier") || "FREE").toString().toUpperCase();
}
var AppHeader = () => {
	const { user } = useAuth();
	const [isWalletOpen, setIsWalletOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [peopleResults, setPeopleResults] = (0, import_react.useState)([]);
	const [searchingPeople, setSearchingPeople] = (0, import_react.useState)(false);
	const [fastUser, setFastUser] = (0, import_react.useState)(() => getCurrentUserSnapshot());
	const [fastProfile, setFastProfile] = (0, import_react.useState)(() => {
		const snapshot = getCurrentUserSnapshot();
		return snapshot?.$id ? getCachedIdentityById(snapshot.$id) : null;
	});
	const [profileRecord, setProfileRecord] = (0, import_react.useState)(null);
	const { profile: cachedProfile } = useProfile();
	const potato = usePotato();
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { mode, headerHeight, setChromeState } = useAppChrome();
	const { openPanel, closePanel, panel, isActive: isIslandActive, activeNotification } = useIsland();
	const headerRef = (0, import_react.useRef)(null);
	const dockContentRef = (0, import_react.useRef)(null);
	const searchInputRef = (0, import_react.useRef)(null);
	const [smallProfileUrl, setSmallProfileUrl] = (0, import_react.useState)(null);
	const displayUser = fastUser || user;
	const displayProfile = cachedProfile || fastProfile || profileRecord;
	const profilePicId = getUserProfilePicId(displayUser) || displayProfile?.avatarFileId || displayProfile?.avatar || displayProfile?.profilePicId || displayProfile?.preferences?.profilePicId || null;
	const isExpanded = Boolean(panel);
	const searchSurface = potato.buildSearchSurface(searchQuery);
	const searchDockMaxHeight = "50vh";
	const profileSeed = displayProfile || (displayUser ? {
		...displayUser,
		avatar: profilePicId || null
	} : null);
	const shouldCollapseChrome = Boolean(activeNotification);
	(0, import_react.useEffect)(() => {
		if (searchParams.get("openWallet") === "true") {
			setTimeout(() => setIsWalletOpen(true), 0);
			const params = new URLSearchParams(searchParams.toString());
			params.delete("openWallet");
			const newQuery = params.toString();
			router.replace(pathname + (newQuery ? `?${newQuery}` : ""));
		}
	}, [
		searchParams,
		router,
		pathname
	]);
	(0, import_react.useEffect)(() => {
		if (user?.$id) setFastUser(user);
	}, [user]);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const cached = getCachedProfilePreview(profilePicId || void 0);
		if (cached !== void 0) setSmallProfileUrl(cached ?? null);
		const fetchPreview = async () => {
			try {
				if (profilePicId) {
					const url = await fetchProfilePreview(profilePicId, 64, 64);
					if (mounted) setSmallProfileUrl(url);
				} else if (mounted) setSmallProfileUrl(null);
			} catch (error) {
				console.warn("[AppHeader] Failed to load profile preview:", error);
				if (mounted) setSmallProfileUrl(null);
			}
		};
		fetchPreview();
		return () => {
			mounted = false;
		};
	}, [profilePicId]);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const loadProfileRecord = async () => {
			const userId = displayUser?.$id || user?.$id;
			if (!userId) {
				setProfileRecord(null);
				return;
			}
			const cached = getCachedIdentityById(userId);
			if (cached && mounted) setProfileRecord(cached);
			try {
				const record = await UsersService.getProfileById(userId);
				if (!mounted) return;
				if (record) {
					seedIdentityCache(record);
					setProfileRecord(record);
				}
			} catch (error) {
				console.warn("[AppHeader] Failed to load profile record:", error);
			}
		};
		loadProfileRecord();
		return () => {
			mounted = false;
		};
	}, [displayUser?.$id, user?.$id]);
	(0, import_react.useEffect)(() => {
		if (profileSeed?.$id || profileSeed?.userId) stageProfileView(profileSeed, smallProfileUrl || null);
	}, [profileSeed, smallProfileUrl]);
	(0, import_react.useEffect)(() => {
		const userId = displayUser?.$id;
		if (!userId) {
			setFastProfile(null);
			return;
		}
		setFastProfile(getCachedIdentityById(userId));
		return subscribeIdentityCache((identity) => {
			if (identity.userId === userId) setFastProfile(identity);
		});
	}, [displayUser?.$id]);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const resolveUser = async () => {
			const snapshot = getCurrentUserSnapshot();
			if (snapshot?.$id && mounted) setFastUser(snapshot);
			const current = snapshot?.$id ? snapshot : await getCurrentUser();
			if (!mounted) return;
			if (current?.$id) setFastUser(current);
		};
		resolveUser();
		return () => {
			mounted = false;
		};
	}, []);
	const identitySignals = computeIdentityFlags({
		createdAt: cachedProfile?.$createdAt || fastProfile?.cachedAt || profileRecord?.$createdAt || displayUser?.$createdAt || null,
		lastUsernameEdit: cachedProfile?.preferences?.last_username_edit || fastProfile?.preferences?.last_username_edit || profileRecord?.preferences?.last_username_edit || displayUser?.prefs?.last_username_edit || null,
		profilePicId: profilePicId || null,
		username: cachedProfile?.username || fastProfile?.username || profileRecord?.username || displayUser?.prefs?.username || displayUser?.name || null,
		bio: cachedProfile?.bio || fastProfile?.bio || profileRecord?.bio || displayUser?.prefs?.bio || null,
		tier: profileRecord?.tier || displayUser?.prefs?.tier || null,
		publicKey: cachedProfile?.publicKey || fastProfile?.publicKey || profileRecord?.publicKey || null,
		emailVerified: Boolean(displayUser?.emailVerification),
		preferences: cachedProfile?.preferences || fastProfile?.preferences || profileRecord?.preferences || null
	});
	const baseHeaderHeight = mode === "compact" ? 72 : mode === "hidden" ? 0 : 88;
	(0, import_react.useEffect)(() => {
		if (!panel) {
			setChromeState({ dockHeight: 0 });
			return;
		}
		const measureDockHeight = () => {
			const height = dockContentRef.current?.getBoundingClientRect().height ?? 0;
			setChromeState({ dockHeight: Math.max(0, Math.ceil(height) - baseHeaderHeight) });
		};
		measureDockHeight();
		if (typeof ResizeObserver === "undefined" || !dockContentRef.current) return;
		const observer = new ResizeObserver(() => measureDockHeight());
		observer.observe(dockContentRef.current);
		window.addEventListener("resize", measureDockHeight);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", measureDockHeight);
		};
	}, [panel, setChromeState]);
	(0, import_react.useEffect)(() => {
		if (panel !== "search") {
			setSearchQuery("");
			setPeopleResults([]);
			setSearchingPeople(false);
			return;
		}
		const frame = requestAnimationFrame(() => {
			searchInputRef.current?.focus();
		});
		return () => cancelAnimationFrame(frame);
	}, [panel]);
	(0, import_react.useEffect)(() => {
		if (panel !== "search") return;
		const text = searchQuery.trim().toLowerCase();
		if (text.length < 2) {
			setPeopleResults([]);
			setSearchingPeople(false);
			return;
		}
		let active = true;
		const timer = setTimeout(async () => {
			setSearchingPeople(true);
			try {
				const result = await UsersService.searchUsers(text);
				if (!active) return;
				const rows = (result.rows || []).filter((candidate) => (candidate.userId || candidate.$id) !== displayUser?.$id);
				rows.forEach((candidate) => seedIdentityCache(candidate));
				setPeopleResults(rows.slice(0, 5));
			} catch (error) {
				if (active) {
					console.warn("[AppHeader] People search failed:", error);
					setPeopleResults([]);
				}
			} finally {
				if (active) setSearchingPeople(false);
			}
		}, 260);
		return () => {
			active = false;
			clearTimeout(timer);
		};
	}, [
		displayUser?.$id,
		panel,
		searchQuery
	]);
	(0, import_react.useEffect)(() => {
		if (!panel) return;
		const handlePointerDown = (event) => {
			const target = event.target;
			if (!target || !headerRef.current || headerRef.current.contains(target)) return;
			closePanel();
		};
		window.addEventListener("pointerdown", handlePointerDown, true);
		return () => window.removeEventListener("pointerdown", handlePointerDown, true);
	}, [closePanel, panel]);
	const stageMotion = {
		animate: {
			opacity: isExpanded ? 0 : 1,
			scale: isExpanded ? .96 : 1
		},
		transition: { duration: .22 },
		style: { pointerEvents: isIslandActive ? "none" : "auto" }
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppBar, {
		ref: headerRef,
		position: "fixed",
		elevation: 0,
		sx: {
			zIndex: 1201,
			bgcolor: "#161412",
			borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
			borderRadius: "0 0 28px 28px",
			boxShadow: "0 16px 42px rgba(0,0,0,0.42)",
			backgroundImage: "none",
			display: "flex",
			flexDirection: "column",
			alignItems: "stretch",
			justifyContent: "flex-start",
			overflow: "hidden",
			height: panel ? "auto" : `${headerHeight}px`,
			minHeight: panel ? 0 : `${baseHeaderHeight}px`,
			transform: mode === "hidden" ? "translateY(-110%)" : "translateY(0)",
			opacity: mode === "hidden" ? 0 : 1,
			pointerEvents: mode === "hidden" ? "none" : "auto",
			transition: "transform 260ms ease, opacity 260ms ease, height 260ms ease"
		},
		children: [
			!panel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, {
				sx: {
					gap: {
						xs: 2,
						md: 4
					},
					px: {
						xs: 2,
						md: 4
					},
					minHeight: `${baseHeaderHeight}px`,
					width: "100%",
					maxWidth: "1440px",
					margin: "0 auto",
					justifyContent: "space-between",
					position: "relative"
				},
				children: [
					!shouldCollapseChrome && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						...stageMotion,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							flexShrink: 0,
							pointerEvents: isIslandActive ? "none" : "auto"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							style: { display: "inline-flex" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
								component: "button",
								onClick: () => openPanel("ecosystem"),
								sx: {
									position: "relative",
									display: "inline-flex",
									alignItems: "center",
									justifyContent: "center",
									bgcolor: "transparent",
									border: "none",
									p: 0,
									cursor: "pointer"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
									app: "connect",
									size: 32,
									sx: {
										cursor: "pointer",
										"&:hover": { opacity: .8 }
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									size: "small",
									sx: {
										position: "absolute",
										right: -6,
										bottom: -6,
										width: 18,
										height: 18,
										bgcolor: "#0A0908",
										border: "1px solid rgba(255,255,255,0.08)",
										color: "rgba(255,255,255,0.55)",
										"&:hover": {
											bgcolor: "#161412",
											color: "white"
										}
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 11 })
								})]
							})
						})
					}),
					displayUser && !shouldCollapseChrome && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							position: "absolute",
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
							pointerEvents: isIslandActive ? "none" : "auto",
							zIndex: 2
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							...stageMotion,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								component: "button",
								onClick: () => panel === "search" ? closePanel() : openPanel("search"),
								sx: {
									width: {
										xs: 44,
										md: 114
									},
									minWidth: {
										xs: 44,
										md: 114
									},
									maxWidth: {
										xs: 44,
										md: 114
									},
									height: 44,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 1.25,
									px: 1,
									py: 0,
									minHeight: 44,
									border: "1px solid rgba(255,255,255,0.08)",
									bgcolor: "#000000",
									color: "white",
									borderRadius: {
										xs: "999px",
										md: "24px"
									},
									boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 0 0 6px rgba(245, 158, 11, 0.02), 0 0 26px rgba(0, 0, 0, 0.55)",
									cursor: "pointer",
									textAlign: "left",
									transition: "transform 150ms ease-out, box-shadow 150ms ease-out, border-radius 150ms ease-out, width 150ms ease-out, min-width 150ms ease-out, max-width 150ms ease-out, background-color 150ms ease-out",
									animation: "connectSearchPulse 3.2s ease-in-out infinite",
									"@keyframes connectSearchPulse": {
										"0%, 100%": { boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 0 0 6px rgba(245, 158, 11, 0.02), 0 0 26px rgba(0, 0, 0, 0.55)" },
										"50%": { boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 0 0 8px rgba(245, 158, 11, 0.05), 0 0 34px rgba(0, 0, 0, 0.72)" }
									},
									"&:hover": { transform: "translateY(-1px)" },
									"&:active": { transform: "scale(0.98)" }
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									sx: {
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: 1.25,
										width: "100%",
										height: "100%"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										size: 16,
										strokeWidth: 2.25,
										style: {
											flexShrink: 0,
											opacity: .84
										}
									})
								})
							})
						})
					}),
					!shouldCollapseChrome && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						...stageMotion,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 12,
							flexShrink: 0,
							pointerEvents: isIslandActive ? "none" : "auto"
						},
						children: [displayUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							title: "Wallet",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: () => setIsWalletOpen(true),
								sx: {
									color: isWalletOpen ? "#F59E0B" : "rgba(255, 255, 255, 0.4)",
									bgcolor: alpha("#F59E0B", .03),
									border: "1px solid",
									borderColor: isWalletOpen ? alpha("#F59E0B", .3) : alpha("#F59E0B", .1),
									borderRadius: "12px",
									width: {
										xs: 36,
										sm: 42
									},
									height: {
										xs: 36,
										sm: 42
									},
									"&:hover": { bgcolor: alpha("#F59E0B", .08) }
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
									size: 18,
									strokeWidth: 1.5
								})
							})
						}), displayUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							style: { display: "inline-flex" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								component: "button",
								onMouseEnter: () => {
									if (profileSeed?.username) router.prefetch(`/u/${encodeURIComponent(profileSeed.username)}`);
									if (profileSeed) stageProfileView(profileSeed, smallProfileUrl || null);
								},
								onClick: async () => {
									if (profileSeed) {
										stageProfileView(profileSeed, smallProfileUrl || null);
										const username = profileSeed.username || profileSeed.displayName?.toString().trim().toLowerCase();
										if (username) router.prefetch(`/u/${encodeURIComponent(username)}`);
									}
									openPanel("profile");
								},
								sx: {
									p: 0,
									border: "none",
									background: "transparent",
									cursor: "pointer",
									"&:hover": { transform: "scale(1.05)" },
									transition: "transform 0.2s"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityAvatar, {
									src: smallProfileUrl || void 0,
									alt: displayUser?.name || displayUser?.email || "profile",
									fallback: displayUser?.name ? displayUser.name[0].toUpperCase() : "U",
									verified: identitySignals.verified,
									verifiedOn: identitySignals.verifiedOn,
									pro: identitySignals.pro,
									size: 38,
									borderRadius: "12px"
								})
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							href: `${getEcosystemUrl("accounts")}/login?source=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`,
							variant: "contained",
							size: "small",
							sx: {
								ml: 1,
								bgcolor: "#6366F1",
								color: "#000",
								fontWeight: 800,
								borderRadius: "10px",
								"&:hover": { bgcolor: alpha("#6366F1", .8) }
							},
							children: "Connect"
						})]
					})
				]
			}),
			panel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				ref: dockContentRef,
				sx: {
					width: "100%",
					display: "flex",
					alignItems: "stretch",
					borderTop: "1px solid rgba(255, 255, 255, 0.05)",
					bgcolor: "#161412",
					overflow: "hidden",
					maxHeight: panel === "search" ? searchDockMaxHeight : "none"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: -8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -8
					},
					transition: { duration: .18 },
					style: {
						width: "100%",
						display: "flex"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						onWheel: (event) => {
							const node = event.currentTarget;
							if (event.deltaY < 0 && node.scrollTop <= 0) {
								event.preventDefault();
								closePanel();
							}
						},
						sx: {
							width: "100%",
							px: {
								xs: 2,
								md: 4
							},
							py: 1,
							display: "flex",
							flexDirection: "column",
							gap: 1,
							alignItems: "stretch",
							minHeight: 0
						},
						children: panel === "search" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								display: "grid",
								gap: 1.25,
								minHeight: 0
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									gap: 1,
									flexWrap: "wrap"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
										sx: {
											width: 38,
											height: 38,
											borderRadius: "14px",
											display: "grid",
											placeItems: "center",
											bgcolor: "rgba(255,255,255,0.06)",
											border: "1px solid rgba(255,255,255,0.08)",
											flexShrink: 0
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										inputRef: searchInputRef,
										value: searchQuery,
										onChange: (event) => setSearchQuery(event.target.value),
										placeholder: "Search notes, goals, moments, calls, people, apps",
										variant: "standard",
										fullWidth: true,
										InputProps: {
											disableUnderline: true,
											sx: {
												color: "white",
												fontWeight: 800,
												fontSize: "0.98rem",
												"& input::placeholder": {
													color: "rgba(255,255,255,0.42)",
													opacity: 1
												}
											},
											startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
												position: "start",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													sx: {
														color: "rgba(255,255,255,0.42)",
														fontWeight: 800,
														letterSpacing: "0.08em",
														textTransform: "uppercase",
														mr: .5
													},
													children: "Search"
												})
											})
										},
										sx: {
											flex: 1,
											minWidth: {
												xs: "100%",
												md: 320
											}
										},
										onKeyDown: (event) => {
											if (event.key === "Escape") closePanel();
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: closePanel,
										sx: {
											minWidth: 0,
											px: 2,
											height: 38,
											borderRadius: "999px",
											bgcolor: "rgba(255,255,255,0.06)",
											color: "white",
											"&:hover": { bgcolor: "rgba(255,255,255,0.12)" }
										},
										children: "Close"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
								sx: {
									display: "grid",
									gap: 1,
									minHeight: 0,
									maxHeight: `calc(${searchDockMaxHeight} - 88px)`,
									overflowY: "auto",
									pr: .5,
									pb: .5
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
										direction: "row",
										spacing: 1,
										useFlexGap: true,
										flexWrap: "wrap",
										children: searchSurface.snippets.slice(0, 4).map((snippet) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											label: snippet.title,
											size: "small",
											sx: {
												bgcolor: "rgba(255,255,255,0.04)",
												color: "rgba(255,255,255,0.84)",
												border: "1px solid rgba(255,255,255,0.08)",
												"& .MuiChip-label": { px: 1.25 }
											}
										}, snippet.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
										sx: {
											display: "grid",
											gap: .75
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											sx: {
												color: "rgba(255,255,255,0.52)",
												fontSize: "0.74rem",
												fontWeight: 800,
												letterSpacing: "0.08em",
												textTransform: "uppercase"
											},
											children: "Quick actions"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
											sx: {
												display: "grid",
												gap: .75
											},
											children: searchSurface.quickActions.slice(0, 3).map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
												component: "button",
												onClick: action.onSelect,
												sx: {
													width: "100%",
													display: "flex",
													alignItems: "center",
													gap: 1.25,
													px: 1.5,
													py: 1.1,
													borderRadius: "18px",
													bgcolor: "rgba(255,255,255,0.02)",
													border: "1px solid rgba(255,255,255,0.05)",
													color: "white",
													textAlign: "left",
													opacity: action.disabled ? .5 : 1,
													pointerEvents: action.disabled ? "none" : "auto"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
													sx: {
														width: 32,
														height: 32,
														borderRadius: "12px",
														display: "grid",
														placeItems: "center",
														bgcolor: `${action.accent}1F`,
														color: action.accent,
														flexShrink: 0
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
														app: "connect",
														size: 16,
														variant: "icon"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
													sx: {
														minWidth: 0,
														flex: 1
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
														sx: {
															color: "white",
															fontWeight: 800,
															fontSize: "0.88rem",
															lineHeight: 1.15
														},
														noWrap: true,
														children: action.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
														sx: {
															color: "rgba(255,255,255,0.56)",
															fontWeight: 600,
															fontSize: "0.76rem",
															lineHeight: 1.35
														},
														noWrap: true,
														children: action.description
													})]
												})]
											}, action.id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
										sx: {
											display: "grid",
											gap: .75
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											sx: {
												color: "rgba(255,255,255,0.52)",
												fontSize: "0.74rem",
												fontWeight: 800,
												letterSpacing: "0.08em",
												textTransform: "uppercase"
											},
											children: "Search across apps"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
											sx: {
												display: "grid",
												gap: .75
											},
											children: searchSurface.searchTargets.slice(0, 4).map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
												component: "button",
												onClick: action.onSelect,
												sx: {
													width: "100%",
													display: "flex",
													alignItems: "center",
													gap: 1.25,
													px: 1.5,
													py: 1.1,
													borderRadius: "18px",
													bgcolor: action.kind === potato.currentApp ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
													border: `1px solid ${action.kind === potato.currentApp ? "rgba(99,102,241,0.28)" : "rgba(255,255,255,0.05)"}`,
													color: "white",
													textAlign: "left"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
													sx: {
														width: 32,
														height: 32,
														borderRadius: "12px",
														display: "grid",
														placeItems: "center",
														bgcolor: `${action.accent}1F`,
														color: action.accent,
														flexShrink: 0
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
														app: "connect",
														size: 16,
														variant: "icon"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
													sx: {
														minWidth: 0,
														flex: 1
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
														sx: {
															color: "white",
															fontWeight: 800,
															fontSize: "0.88rem",
															lineHeight: 1.15
														},
														noWrap: true,
														children: action.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
														sx: {
															color: "rgba(255,255,255,0.56)",
															fontWeight: 600,
															fontSize: "0.76rem",
															lineHeight: 1.35
														},
														noWrap: true,
														children: action.description
													})]
												})]
											}, action.id))
										})]
									}),
									searchingPeople || peopleResults.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
										sx: {
											display: "grid",
											gap: .75
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											sx: {
												color: "rgba(255,255,255,0.52)",
												fontSize: "0.74rem",
												fontWeight: 800,
												letterSpacing: "0.08em",
												textTransform: "uppercase"
											},
											children: "People"
										}), searchingPeople ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											sx: {
												color: "rgba(255,255,255,0.52)",
												fontSize: "0.84rem"
											},
											children: "Searching people..."
										}) : peopleResults.slice(0, 3).map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
											component: "button",
											onClick: () => {
												setSearchQuery(person.displayName || person.username || person.name || "");
											},
											sx: {
												width: "100%",
												display: "flex",
												alignItems: "center",
												gap: 1.25,
												px: 1.5,
												py: 1.1,
												borderRadius: "18px",
												bgcolor: "rgba(255,255,255,0.02)",
												border: "1px solid rgba(255,255,255,0.05)",
												color: "white",
												textAlign: "left"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityAvatar, {
												src: person.avatarUrl || person.avatar || void 0,
												alt: person.displayName || person.username || person.name || "person",
												fallback: (person.displayName || person.username || person.name || "U")[0]?.toUpperCase() || "U",
												size: 32,
												borderRadius: "12px"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
												sx: {
													minWidth: 0,
													flex: 1
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													sx: {
														color: "white",
														fontWeight: 800,
														fontSize: "0.88rem",
														lineHeight: 1.15
													},
													noWrap: true,
													children: person.displayName || person.username || person.name || "Person"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													sx: {
														color: "rgba(255,255,255,0.56)",
														fontWeight: 600,
														fontSize: "0.76rem",
														lineHeight: 1.35
													},
													noWrap: true,
													children: person.username ? `@${String(person.username).replace(/^@/, "")}` : "Direct chat target"
												})]
											})]
										}, person.$id || person.userId))]
									}) : null
								]
							})]
						}) : panel === "ecosystem" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							onWheel: (event) => {
								const node = event.currentTarget;
								if (event.deltaY < 0 && node.scrollTop <= 0) {
									event.preventDefault();
									closePanel();
								}
							},
							sx: {
								display: "grid",
								gap: .75
							},
							children: [
								{
									app: "note",
									label: "Note",
									description: "Secure notes and research."
								},
								{
									app: "vault",
									label: "Vault",
									description: "Passwords, 2FA, and keys."
								},
								{
									app: "flow",
									label: "Goals",
									description: "Tasks, plans, and follow-through."
								},
								{
									app: "connect",
									label: "Connect",
									description: "Secure messages and sharing."
								},
								{
									app: "root",
									label: "Accounts",
									description: "Your Kylrix account."
								}
							].map((app) => {
								const selected = app.app === "connect";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									component: "button",
									onClick: () => {
										if (selected) return;
										window.location.assign(getEcosystemUrl(app.app === "root" ? "accounts" : app.app));
									},
									"aria-disabled": selected,
									sx: {
										width: "100%",
										display: "flex",
										alignItems: "center",
										gap: 1.25,
										px: 1.5,
										py: 1.1,
										borderRadius: "18px",
										bgcolor: selected ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
										border: `1px solid ${selected ? "rgba(99,102,241,0.28)" : "rgba(255,255,255,0.05)"}`,
										color: "white",
										textAlign: "left",
										opacity: selected ? .6 : 1,
										pointerEvents: selected ? "none" : "auto"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
										sx: {
											width: 32,
											height: 32,
											borderRadius: "12px",
											display: "grid",
											placeItems: "center",
											bgcolor: "rgba(255,255,255,0.04)",
											flexShrink: 0
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
											app: app.app,
											size: 16,
											variant: "icon"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
										sx: {
											minWidth: 0,
											flex: 1
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
											sx: {
												color: "white",
												fontWeight: 800,
												fontSize: "0.88rem",
												lineHeight: 1.15
											},
											noWrap: true,
											children: [app.label, selected ? " • Current app" : ""]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											sx: {
												color: "rgba(255,255,255,0.56)",
												fontWeight: 600,
												fontSize: "0.76rem",
												lineHeight: 1.35
											},
											noWrap: true,
											children: app.description
										})]
									})]
								}, app.label);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePanelSurface, { onClosePanel: closePanel })
					})
				}, `dock-${panel}`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletSidebar, {
				isOpen: isWalletOpen,
				onClose: () => setIsWalletOpen(false)
			})
		]
	});
};
var getStorageKey = (userId, conversationId) => `kylrix_connect_chat_read_${userId}_${conversationId}`;
var getConversationReadAt = (userId, conversationId) => {
	if (!userId || typeof window === "undefined") return 0;
	const raw = localStorage.getItem(getStorageKey(userId, conversationId));
	if (!raw) return 0;
	const parsed = new Date(raw).getTime();
	return Number.isFinite(parsed) ? parsed : 0;
};
var markConversationRead = (userId, conversationId, readAt = /* @__PURE__ */ new Date()) => {
	if (!userId || typeof window === "undefined") return 0;
	const value = readAt.toISOString();
	localStorage.setItem(getStorageKey(userId, conversationId), value);
	return readAt.getTime();
};
var ConversationAvatar = ({ user }) => {
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const resolve = async () => {
			const avatar = user?.avatar;
			if (!avatar) {
				if (active) setAvatarUrl(null);
				return;
			}
			if (String(avatar).startsWith("http")) {
				if (active) setAvatarUrl(avatar);
				return;
			}
			try {
				const preview = await fetchProfilePreview(avatar, 96, 96);
				if (active) setAvatarUrl(preview);
			} catch {
				if (active) setAvatarUrl(null);
			}
		};
		resolve();
		return () => {
			active = false;
		};
	}, [user?.avatar]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		src: avatarUrl || void 0,
		sx: {
			width: 64,
			height: 64,
			bgcolor: "#F59E0B",
			color: "#FFFFFF",
			border: "1px solid rgba(255,255,255,0.08)"
		},
		children: !avatarUrl && (user?.displayName || user?.username || "?").charAt(0).toUpperCase()
	});
};
var MemberAvatar = ({ user }) => {
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const resolve = async () => {
			const avatar = user?.avatar;
			if (!avatar) {
				if (active) setAvatarUrl(null);
				return;
			}
			if (String(avatar).startsWith("http")) {
				if (active) setAvatarUrl(avatar);
				return;
			}
			try {
				const preview = await fetchProfilePreview(avatar, 64, 64);
				if (active) setAvatarUrl(preview);
			} catch {
				if (active) setAvatarUrl(null);
			}
		};
		resolve();
		return () => {
			active = false;
		};
	}, [user?.avatar]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		src: avatarUrl || void 0,
		sx: {
			width: 44,
			height: 44,
			bgcolor: "#F59E0B",
			color: "#FFFFFF",
			border: "1px solid rgba(255,255,255,0.06)"
		},
		children: !avatarUrl && (user?.displayName || user?.username || "?").charAt(0).toUpperCase()
	});
};
function formatActionError(error, fallback) {
	const message = String(error?.message || "").trim();
	if (message) return message;
	return fallback;
}
function ConversationActionsSheet({ conversation, open, onClose, onConversationUpdated, onConversationDeleted }) {
	const router = useRouter();
	const isMobile = useMediaQuery(useTheme().breakpoints.down("md"), { noSsr: true });
	const { user } = useAuth();
	const [currentConversation, setCurrentConversation] = (0, import_react.useState)(conversation);
	const [directProfile, setDirectProfile] = (0, import_react.useState)(null);
	const [directLoading, setDirectLoading] = (0, import_react.useState)(false);
	const [groupMembers, setGroupMembers] = (0, import_react.useState)([]);
	const [membersLoading, setMembersLoading] = (0, import_react.useState)(false);
	const [pendingJoinRequests, setPendingJoinRequests] = (0, import_react.useState)([]);
	const [pendingRequestsLoading, setPendingRequestsLoading] = (0, import_react.useState)(false);
	const [requesterProfiles, setRequesterProfiles] = (0, import_react.useState)({});
	const [groupNameDraft, setGroupNameDraft] = (0, import_react.useState)("");
	const [groupDescriptionDraft, setGroupDescriptionDraft] = (0, import_react.useState)("");
	const [detailsSaving, setDetailsSaving] = (0, import_react.useState)(false);
	const [avatarUploading, setAvatarUploading] = (0, import_react.useState)(false);
	const [memberTab, setMemberTab] = (0, import_react.useState)("members");
	const [memberQuery, setMemberQuery] = (0, import_react.useState)("");
	const [memberResults, setMemberResults] = (0, import_react.useState)([]);
	const [memberSearching, setMemberSearching] = (0, import_react.useState)(false);
	const [mutating, setMutating] = (0, import_react.useState)(false);
	const [deleteConfirmOpen, setDeleteConfirmOpen] = (0, import_react.useState)(false);
	const isGroup = currentConversation?.type === "group";
	const isDirect = Boolean(currentConversation && !isGroup);
	const inviteEnabled = Boolean(currentConversation?.inviteLink && currentConversation.inviteLink === currentConversation.$id);
	const groupAvatarSrc = currentConversation?.avatarUrl || void 0;
	const inviteLink = (0, import_react.useMemo)(() => {
		if (!currentConversation?.$id || typeof window === "undefined") return "";
		return `${window.location.origin}/groups/invite/${currentConversation.$id}`;
	}, [currentConversation?.$id]);
	const isDetailsDirty = (0, import_react.useMemo)(() => {
		const currentName = String(currentConversation?.name || "").trim();
		const currentDescription = String(currentConversation?.description || "").trim();
		return groupNameDraft.trim() !== currentName || groupDescriptionDraft.trim() !== currentDescription;
	}, [
		currentConversation?.description,
		currentConversation?.name,
		groupDescriptionDraft,
		groupNameDraft
	]);
	const participantIds = (0, import_react.useMemo)(() => {
		const ids = Array.isArray(currentConversation?.participants) ? currentConversation.participants.filter((id) => typeof id === "string" && id.trim().length > 0) : [];
		return Array.from(new Set(ids));
	}, [currentConversation?.participants]);
	const isAdmin = Boolean(user?.$id && (currentConversation?.admins?.includes(user.$id) || currentConversation?.creatorId === user.$id));
	const refreshConversation = (0, import_react.useCallback)(async () => {
		if (!currentConversation?.$id || !user?.$id) return null;
		try {
			const updated = await ChatService.getConversationById(currentConversation.$id, user.$id);
			setCurrentConversation(updated);
			onConversationUpdated?.(updated);
			return updated;
		} catch (error) {
			console.warn("[ConversationActionsSheet] Failed to refresh conversation:", error);
			return currentConversation;
		}
	}, [
		currentConversation,
		onConversationUpdated,
		user?.$id
	]);
	const loadPendingRequests = (0, import_react.useCallback)(async () => {
		if (!open || !isGroup || !isAdmin || !currentConversation?.$id) {
			setPendingJoinRequests([]);
			return;
		}
		setPendingRequestsLoading(true);
		try {
			const { rows } = await tablesDB.listRows(APPWRITE_CONFIG.DATABASES.CHAT, APPWRITE_CONFIG.TABLES.CHAT.JOIN_REQUESTS, [
				Query.equal("resourceType", "chat.conversation"),
				Query.equal("resourceId", currentConversation.$id),
				Query.equal("status", "pending"),
				Query.orderAsc("createdAt"),
				Query.limit(100)
			]);
			setPendingJoinRequests(rows || []);
			const unknownProfiles = Array.from(new Set((rows || []).map((row) => row.requesterId).filter((id) => typeof id === "string" && id.length > 0).filter((id) => !getCachedIdentityById(id) && !requesterProfiles[id])));
			if (unknownProfiles.length > 0) {
				const mapped = (await Promise.all(unknownProfiles.map((id) => UsersService.getProfileById(id).then((profile) => seedIdentityCache(profile)).catch(() => null)))).reduce((acc, profile) => {
					if (profile?.userId) acc[profile.userId] = profile;
					return acc;
				}, {});
				if (Object.keys(mapped).length > 0) setRequesterProfiles((current) => ({
					...current,
					...mapped
				}));
			}
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to load join requests:", error);
			setPendingJoinRequests([]);
		} finally {
			setPendingRequestsLoading(false);
		}
	}, [
		currentConversation?.$id,
		isAdmin,
		isGroup,
		open,
		requesterProfiles
	]);
	(0, import_react.useEffect)(() => {
		if (!open || !conversation) return;
		setCurrentConversation(conversation);
		setGroupNameDraft(conversation?.name || "");
		setGroupDescriptionDraft(conversation?.description || "");
		setMemberTab("members");
		setMemberQuery("");
		setMemberResults([]);
		setPendingJoinRequests([]);
		setRequesterProfiles({});
		setDeleteConfirmOpen(false);
	}, [open, conversation]);
	(0, import_react.useEffect)(() => {
		if (!open || !currentConversation) return;
		if (isDirect) {
			const targetUserId = currentConversation.otherUserId || participantIds.find((id) => id !== user?.$id) || currentConversation.creatorId;
			if (!targetUserId) return;
			let active = true;
			setDirectLoading(true);
			UsersService.getProfileById(targetUserId).then((profile) => {
				if (active) setDirectProfile(profile);
			}).catch((error) => {
				console.error("[ConversationActionsSheet] Failed to load profile:", error);
				if (active) setDirectProfile(null);
			}).finally(() => {
				if (active) setDirectLoading(false);
			});
			return () => {
				active = false;
			};
		}
		if (isGroup) {
			let active = true;
			setMembersLoading(true);
			Promise.all(participantIds.map((id) => UsersService.getProfileById(id))).then((profiles) => {
				if (!active) return;
				setGroupMembers(profiles.filter(Boolean).sort((left, right) => {
					if (left?.userId === user?.$id) return -1;
					if (right?.userId === user?.$id) return 1;
					const leftAdmin = currentConversation?.admins?.includes(left?.userId);
					if (leftAdmin === currentConversation?.admins?.includes(right?.userId)) return 0;
					return leftAdmin ? -1 : 1;
				}));
			}).catch((error) => {
				console.error("[ConversationActionsSheet] Failed to load members:", error);
				if (active) setGroupMembers([]);
			}).finally(() => {
				if (active) setMembersLoading(false);
			});
			return () => {
				active = false;
			};
		}
	}, [
		open,
		currentConversation,
		isDirect,
		isGroup,
		participantIds,
		user?.$id
	]);
	(0, import_react.useEffect)(() => {
		if (!open || !isGroup) return;
		if (memberTab !== "add" || memberQuery.trim().length < 2) {
			setMemberResults([]);
			setMemberSearching(false);
			return;
		}
		let active = true;
		const timer = window.setTimeout(() => {
			setMemberSearching(true);
			UsersService.searchUsers(memberQuery, { requirePublicKey: true }).then((res) => {
				if (!active) return;
				setMemberResults((res.rows || []).filter((item) => {
					const id = item.userId || item.$id;
					if (!id) return false;
					if (id === user?.$id) return false;
					if (participantIds.includes(id)) return false;
					return true;
				}));
			}).catch((error) => {
				console.error("[ConversationActionsSheet] Member search failed:", error);
				if (active) setMemberResults([]);
			}).finally(() => {
				if (active) setMemberSearching(false);
			});
		}, 300);
		return () => {
			active = false;
			clearTimeout(timer);
		};
	}, [
		open,
		isGroup,
		memberTab,
		memberQuery,
		participantIds,
		user?.$id
	]);
	(0, import_react.useEffect)(() => {
		loadPendingRequests();
	}, [loadPendingRequests]);
	const handleOpenDirectChat = () => {
		if (!currentConversation) return;
		router.push(`/chat/${currentConversation.$id}`);
		onClose();
	};
	const handleCall = () => {
		if (!currentConversation) return;
		router.push(`/call/${currentConversation.$id}?caller=true&type=video`);
		onClose();
	};
	const handleOpenInfo = () => {
		const username = directProfile?.username;
		if (!username) return;
		router.push(`/u/${username}`);
		onClose();
	};
	const handleAddMember = async (target) => {
		if (!currentConversation?.$id) return;
		const targetId = target.userId || target.$id;
		if (!targetId) return;
		setMutating(true);
		try {
			await ChatService.addParticipant(currentConversation.$id, targetId);
			await refreshConversation();
			zt.success("Member added");
			setMemberQuery("");
			setMemberResults([]);
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to add member:", error);
			zt.error(formatActionError(error, "Failed to add member"));
		} finally {
			setMutating(false);
		}
	};
	const handleRemoveMember = async (target) => {
		if (!currentConversation?.$id) return;
		const targetId = target.userId || target.$id;
		if (!targetId) return;
		setMutating(true);
		try {
			await ChatService.removeParticipant(currentConversation.$id, targetId);
			setGroupMembers((current) => current.filter((member) => (member.userId || member.$id) !== targetId));
			setCurrentConversation((current) => {
				if (!current) return current;
				const nextParticipants = Array.isArray(current.participants) ? current.participants.filter((id) => id !== targetId) : current.participants;
				return {
					...current,
					participants: nextParticipants,
					participantCount: Array.isArray(nextParticipants) ? nextParticipants.length : current.participantCount,
					admins: Array.isArray(current.admins) ? current.admins.filter((id) => id !== targetId) : current.admins
				};
			});
			await refreshConversation();
			zt.success("Member removed");
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to remove member:", error);
			zt.error(error?.message || "Failed to remove member");
		} finally {
			setMutating(false);
		}
	};
	const handleToggleInviteLink = async () => {
		if (!currentConversation?.$id) return;
		setMutating(true);
		try {
			await ChatService.updateConversationInvite(currentConversation.$id, !inviteEnabled);
			await refreshConversation();
			zt.success(inviteEnabled ? "Invite link disabled" : "Invite link enabled");
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to update invite link:", error);
			zt.error(error?.message || "Failed to update invite link");
		} finally {
			setMutating(false);
		}
	};
	const handleSaveGroupDetails = async () => {
		if (!currentConversation?.$id) return;
		const nextName = groupNameDraft.trim();
		const nextDescription = groupDescriptionDraft.trim();
		if (!nextName) {
			zt.error("Group name is required");
			return;
		}
		setDetailsSaving(true);
		try {
			await ChatService.updateConversation(currentConversation.$id, {
				name: nextName,
				description: nextDescription
			});
			await refreshConversation();
			zt.success("Group details updated");
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to update group details:", error);
			zt.error(error?.message || "Failed to update group details");
		} finally {
			setDetailsSaving(false);
		}
	};
	const handleUploadGroupAvatar = async (file) => {
		if (!currentConversation?.$id || !file) return;
		setAvatarUploading(true);
		try {
			await ChatService.updateConversationAvatar(currentConversation.$id, file);
			await refreshConversation();
			zt.success("Group avatar updated");
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to update group avatar:", error);
			zt.error(error?.message || "Failed to update group avatar");
		} finally {
			setAvatarUploading(false);
		}
	};
	const handleCopyInviteLink = async () => {
		if (!inviteEnabled || !inviteLink) return;
		try {
			await navigator.clipboard.writeText(inviteLink);
			zt.success("Invite link copied");
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to copy invite link:", error);
			zt.error("Failed to copy invite link");
		}
	};
	const handleResolveRequest = async (request, action) => {
		if (!currentConversation?.$id || !request?.requesterId) return;
		setMutating(true);
		try {
			await ChatService.resolveJoinRequest("chat.conversation", currentConversation.$id, request.requesterId, action);
			await refreshConversation();
			await loadPendingRequests();
			zt.success(action === "accept" ? "Request accepted" : "Request rejected");
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to resolve join request:", error);
			zt.error(formatActionError(error, "Failed to update request"));
		} finally {
			setMutating(false);
		}
	};
	const handleDeleteGroup = async () => {
		if (!currentConversation?.$id) return;
		setMutating(true);
		try {
			await ChatService.deleteConversationFully(currentConversation.$id);
			onConversationDeleted?.(currentConversation.$id);
			zt.success("Group deleted");
			setDeleteConfirmOpen(false);
			onClose();
		} catch (error) {
			console.error("[ConversationActionsSheet] Failed to delete group:", error);
			zt.error(error?.message || "Failed to delete group");
		} finally {
			setMutating(false);
		}
	};
	if (!open || !currentConversation) return null;
	if (isDirect) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onClose,
		fullScreen: isMobile,
		fullWidth: true,
		maxWidth: "xs",
		PaperProps: { sx: {
			bgcolor: "#000000",
			backgroundImage: "none",
			borderRadius: isMobile ? 0 : "24px",
			border: "1px solid rgba(255,255,255,0.08)"
		} },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
			sx: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				pb: 1
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				sx: {
					fontWeight: 900,
					fontFamily: "var(--font-clash)"
				},
				children: "Profile Preview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				onClick: onClose,
				sx: { color: "text.secondary" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			sx: { pt: 1 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				spacing: 2,
				alignItems: "center",
				textAlign: "center",
				children: directLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						minHeight: 96,
						display: "grid",
						placeItems: "center"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: { opacity: .6 },
						children: "Loading profile..."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationAvatar, { user: directProfile || {
						username: currentConversation.name,
						displayName: currentConversation.name
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						sx: {
							fontWeight: 900,
							fontSize: "1.1rem"
						},
						children: directProfile?.displayName || directProfile?.username || currentConversation.name || "Unknown"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
						variant: "body2",
						sx: { opacity: .65 },
						children: ["@", directProfile?.username || currentConversation.otherUserId?.slice(0, 8) || "unknown"]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						spacing: 1,
						sx: { width: "100%" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							variant: "contained",
							startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 18 }),
							onClick: handleOpenDirectChat,
							children: "Message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							variant: "outlined",
							startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 18 }),
							onClick: handleCall,
							disabled: currentConversation.isSelf,
							children: "Call"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						fullWidth: true,
						variant: "text",
						startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 18 }),
						onClick: handleOpenInfo,
						disabled: !directProfile?.username,
						sx: { color: "#F59E0B" },
						children: "Info"
					})
				] })
			})
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		anchor: "bottom",
		open,
		onClose,
		ModalProps: { keepMounted: true },
		PaperProps: { sx: {
			top: "88px",
			bottom: 0,
			height: "calc(100dvh - 88px)",
			maxHeight: "calc(100dvh - 88px)",
			borderRadius: "24px 24px 0 0",
			bgcolor: "#000000",
			backgroundImage: "none",
			border: "1px solid rgba(255,255,255,0.08)",
			overflow: "hidden",
			zIndex: 1305
		} },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				display: "flex",
				flexDirection: "column",
				height: "100%",
				pt: {
					xs: "env(safe-area-inset-top)",
					md: 0
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						px: 2.5,
						pt: 2.5,
						pb: 1.5,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						spacing: 1.5,
						alignItems: "center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							src: groupAvatarSrc,
							sx: {
								width: 56,
								height: 56,
								bgcolor: alpha("#6366F1", .12),
								color: "#6366F1",
								border: "1px solid rgba(255,255,255,0.08)"
							},
							children: !groupAvatarSrc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 24 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								sx: {
									fontWeight: 900,
									fontFamily: "var(--font-clash)"
								},
								children: currentConversation.name || "Group"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
								variant: "body2",
								sx: { opacity: .6 },
								children: [participantIds.length, " members"]
							}),
							currentConversation.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									mt: .5,
									opacity: .72,
									lineHeight: 1.4,
									display: "-webkit-box",
									WebkitBoxOrient: "vertical",
									WebkitLineClamp: 2,
									overflow: "hidden"
								},
								children: currentConversation.description
							}) : null
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						onClick: onClose,
						sx: { color: "text.secondary" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { borderColor: "rgba(255,255,255,0.06)" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						px: 2.5,
						pt: 1.5,
						position: "sticky",
						top: 0,
						zIndex: 2,
						bgcolor: "#000000"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						value: isAdmin ? memberTab : "members",
						onChange: (_, value) => setMemberTab(value),
						textColor: "inherit",
						indicatorColor: "secondary",
						variant: "fullWidth",
						sx: {
							minHeight: 42,
							"& .MuiTab-root": {
								minHeight: 42,
								textTransform: "none",
								fontWeight: 800,
								minWidth: 0,
								px: isMobile ? .5 : 2,
								gap: .75
							}
						},
						children: [
							isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
								value: "invite",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { size: 18 }),
								label: isMobile ? "" : "Invite",
								"aria-label": "Invite"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
								value: "members",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 }),
								label: isMobile ? "" : "Members",
								"aria-label": "Members"
							}),
							isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
								value: "add",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 18 }),
								label: isMobile ? "" : "Add Members",
								"aria-label": "Add Members"
							}),
							isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
								value: "remove",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMinus, { size: 18 }),
								label: isMobile ? "" : "Remove Members",
								"aria-label": "Remove Members"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					sx: {
						flex: 1,
						px: 2.5,
						py: 2,
						overflowY: "auto",
						minHeight: 0
					},
					children: [
						isAdmin ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
							sx: {
								p: 1.5,
								mb: 2,
								bgcolor: "rgba(255,255,255,0.02)",
								border: "1px solid rgba(255,255,255,0.05)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: { opacity: .75 },
								children: "You can view this group, but only admins can manage members."
							})
						}),
						isAdmin && memberTab === "invite" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							spacing: 1.5,
							sx: { mb: 2 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								sx: {
									p: 1.5,
									borderRadius: "18px",
									bgcolor: "rgba(255,255,255,0.02)",
									border: "1px solid rgba(255,255,255,0.05)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									spacing: 1.25,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
											direction: "row",
											alignItems: "center",
											justifyContent: "space-between",
											spacing: 1,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
												sx: { fontWeight: 800 },
												children: "Invite link"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
												variant: "body2",
												sx: { opacity: .65 },
												children: inviteEnabled ? "Anyone with the link can request access." : "Invite link is disabled."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: inviteEnabled ? "outlined" : "contained",
												size: "small",
												onClick: () => void handleToggleInviteLink(),
												disabled: mutating,
												children: inviteEnabled ? "Disable" : "Enable"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											fullWidth: true,
											size: "small",
											value: inviteEnabled ? inviteLink : "Disabled",
											InputProps: { readOnly: true }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outlined",
											size: "small",
											onClick: () => void handleCopyInviteLink(),
											disabled: !inviteEnabled,
											children: "Copy link"
										})
									]
								})
							}), isGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								sx: {
									p: 1.5,
									borderRadius: "18px",
									bgcolor: "rgba(255,255,255,0.02)",
									border: "1px solid rgba(255,255,255,0.05)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									spacing: 1.5,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											sx: { fontWeight: 800 },
											children: "Group details"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
											direction: "row",
											spacing: 1.5,
											alignItems: "center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
												src: groupAvatarSrc,
												sx: {
													width: 56,
													height: 56,
													bgcolor: alpha("#6366F1", .12),
													color: "#6366F1",
													border: "1px solid rgba(255,255,255,0.08)"
												},
												children: !groupAvatarSrc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 22 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												component: "label",
												variant: "outlined",
												size: "small",
												disabled: avatarUploading,
												children: [avatarUploading ? "Uploading..." : "Upload avatar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													hidden: true,
													type: "file",
													accept: "image/png,image/jpeg,image/webp,image/gif",
													onChange: (e) => {
														handleUploadGroupAvatar(e.target.files?.[0] || null);
														e.target.value = "";
													}
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											fullWidth: true,
											size: "small",
											label: "Group name",
											value: groupNameDraft,
											onChange: (e) => setGroupNameDraft(e.target.value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											fullWidth: true,
											multiline: true,
											minRows: 3,
											label: "Description",
											value: groupDescriptionDraft,
											onChange: (e) => setGroupDescriptionDraft(e.target.value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "contained",
											onClick: () => void handleSaveGroupDetails(),
											disabled: detailsSaving || !isDetailsDirty,
											sx: {
												opacity: detailsSaving || !isDetailsDirty ? .45 : 1,
												filter: detailsSaving || !isDetailsDirty ? "blur(0.5px)" : "none"
											},
											children: "Save details"
										})
									]
								})
							})]
						}),
						memberTab === "members" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							spacing: 1,
							children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
								sx: {
									p: 1.5,
									mb: 1,
									bgcolor: "rgba(245,158,11,0.06)",
									border: "1px solid rgba(245,158,11,0.18)",
									borderRadius: "18px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									direction: "row",
									alignItems: "center",
									justifyContent: "space-between",
									sx: { mb: 1 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										sx: { fontWeight: 800 },
										children: "Pending requests"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
										variant: "body2",
										sx: { opacity: .7 },
										children: [pendingJoinRequests.length, " awaiting review"]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										size: "small",
										label: pendingJoinRequests.length,
										sx: { bgcolor: "rgba(245,158,11,0.14)" }
									})]
								}), pendingRequestsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: { opacity: .6 },
									children: "Loading requests..."
								}) : pendingJoinRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: { opacity: .6 },
									children: "No pending requests."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
									spacing: 1,
									children: pendingJoinRequests.map((request) => {
										const requesterId = request.requesterId;
										const requester = requesterProfiles[requesterId] || getCachedIdentityById(requesterId) || {
											userId: requesterId,
											username: requesterId?.slice(0, 8),
											displayName: requesterId?.slice(0, 8)
										};
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
											sx: {
												p: 1.25,
												bgcolor: "rgba(255,255,255,0.02)",
												border: "1px solid rgba(255,255,255,0.05)",
												borderRadius: "16px"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
												direction: "row",
												alignItems: "center",
												spacing: 1.5,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberAvatar, { user: requester }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
														sx: {
															flex: 1,
															minWidth: 0
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
															sx: { fontWeight: 800 },
															noWrap: true,
															children: requester.displayName || requester.username || "Unknown"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
															variant: "body2",
															sx: { opacity: .6 },
															noWrap: true,
															children: ["@", requester.username || requesterId?.slice(0, 8)]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
														direction: "row",
														spacing: 1,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "small",
															variant: "outlined",
															onClick: () => void handleResolveRequest(request, "reject"),
															disabled: mutating,
															children: "Reject"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															size: "small",
															variant: "contained",
															onClick: () => void handleResolveRequest(request, "accept"),
															disabled: mutating,
															children: "Accept"
														})]
													})
												]
											})
										}, request.$id || requesterId);
									})
								})]
							}), membersLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: { opacity: .6 },
								children: "Loading members..."
							}) : groupMembers.map((member) => {
								const id = member.userId || member.$id;
								const isCurrentUser = id === user?.$id;
								const isCreator = id === currentConversation.creatorId;
								const isGroupAdmin = currentConversation.admins?.includes(id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
									sx: {
										p: 1.25,
										bgcolor: "rgba(255,255,255,0.02)",
										border: "1px solid rgba(255,255,255,0.05)",
										borderRadius: "18px"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										alignItems: "center",
										spacing: 1.5,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemAvatar, {
												sx: { minWidth: 0 },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberAvatar, { user: member })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
												sx: {
													flex: 1,
													minWidth: 0
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													sx: { fontWeight: 800 },
													noWrap: true,
													children: member.displayName || member.username || "Unknown"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
													variant: "body2",
													sx: { opacity: .6 },
													noWrap: true,
													children: ["@", member.username || id.slice(0, 8)]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
												direction: "row",
												spacing: .5,
												children: [
													isCurrentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
														size: "small",
														label: "You",
														sx: { bgcolor: "rgba(99,102,241,0.12)" }
													}),
													isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
														size: "small",
														label: "Creator",
														sx: { bgcolor: "rgba(245,158,11,0.12)" }
													}),
													isGroupAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
														size: "small",
														label: "Admin",
														sx: { bgcolor: "rgba(16,185,129,0.12)" }
													})
												]
											})
										]
									})
								}, id);
							})]
						}),
						memberTab === "add" && isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							spacing: 1.5,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									fullWidth: true,
									value: memberQuery,
									onChange: (e) => setMemberQuery(e.target.value),
									placeholder: "Search people to add...",
									InputProps: { startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
										position: "start",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											size: 16,
											style: { opacity: .5 }
										})
									}) }
								}),
								memberSearching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: { opacity: .6 },
									children: "Searching..."
								}),
								memberResults.map((result) => {
									const id = result.userId || result.$id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
										sx: {
											p: 1.25,
											bgcolor: "rgba(255,255,255,0.02)",
											border: "1px solid rgba(255,255,255,0.05)"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
											direction: "row",
											alignItems: "center",
											spacing: 1.5,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberAvatar, { user: result }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
													sx: {
														flex: 1,
														minWidth: 0
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
														sx: { fontWeight: 800 },
														noWrap: true,
														children: result.displayName || result.username
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
														variant: "body2",
														sx: { opacity: .6 },
														noWrap: true,
														children: ["@", result.username]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "contained",
													size: "small",
													startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 16 }),
													onClick: () => void handleAddMember(result),
													disabled: mutating,
													children: "Add"
												})
											]
										})
									}, id);
								}),
								memberQuery.trim().length >= 2 && !memberSearching && memberResults.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: {
										opacity: .6,
										textAlign: "center",
										py: 2
									},
									children: "No users found"
								})
							]
						}),
						memberTab === "remove" && isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
							spacing: 1.5,
							children: groupMembers.filter((member) => (member.userId || member.$id) !== user?.$id).map((member) => {
								const id = member.userId || member.$id;
								const isCreator = id === currentConversation.creatorId;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
									sx: {
										p: 1.25,
										bgcolor: "rgba(255,255,255,0.02)",
										border: "1px solid rgba(255,255,255,0.05)"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										alignItems: "center",
										spacing: 1.5,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberAvatar, { user: member }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
												sx: {
													flex: 1,
													minWidth: 0
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													sx: { fontWeight: 800 },
													noWrap: true,
													children: member.displayName || member.username
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
													variant: "body2",
													sx: { opacity: .6 },
													noWrap: true,
													children: ["@", member.username]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outlined",
												color: "error",
												size: "small",
												startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMinus, { size: 16 }),
												onClick: () => void handleRemoveMember(member),
												disabled: mutating || isCreator,
												children: "Remove"
											})
										]
									})
								}, id);
							})
						})
					]
				}),
				isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						p: 2.5,
						pt: 0,
						borderTop: "1px solid rgba(255,255,255,0.06)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						fullWidth: true,
						color: "error",
						variant: "contained",
						startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 }),
						onClick: () => setDeleteConfirmOpen(true),
						disabled: mutating,
						children: "Delete Group"
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: deleteConfirmOpen,
		onClose: () => setDeleteConfirmOpen(false),
		fullScreen: isMobile,
		PaperProps: { sx: {
			bgcolor: "#000000",
			backgroundImage: "none",
			border: "1px solid rgba(255,255,255,0.08)",
			borderRadius: isMobile ? 0 : "20px"
		} },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				sx: { fontWeight: 900 },
				children: "Delete group?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				variant: "body2",
				sx: { opacity: .7 },
				children: "This will permanently delete the group, its messages, membership rows, and conversation record."
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogActions, {
				sx: { p: 2 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setDeleteConfirmOpen(false),
					sx: { color: "text.secondary" },
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					color: "error",
					variant: "contained",
					onClick: () => void handleDeleteGroup(),
					disabled: mutating,
					children: "Delete Forever"
				})]
			})
		]
	})] });
}
var GlobalSearchAvatar = ({ u }) => {
	const [fetchedAvatarUrl, setFetchedAvatarUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!u.avatar || String(u.avatar).startsWith("http")) return;
		let active = true;
		fetchProfilePreview(u.avatar, 64, 64).then((url) => {
			if (active) setFetchedAvatarUrl(url);
		}).catch(() => {});
		return () => {
			active = false;
		};
	}, [u.avatar]);
	const avatarUrl = u.avatar && String(u.avatar).startsWith("http") ? u.avatar : fetchedAvatarUrl;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		src: avatarUrl || void 0,
		sx: {
			bgcolor: "#F59E0B",
			color: "#FFFFFF",
			border: "1px solid rgba(255, 255, 255, 0.05)",
			width: 44,
			height: 44
		},
		children: !avatarUrl && (u.displayName || u.username || "?").charAt(0).toUpperCase()
	});
};
var ChatList = () => {
	const { user } = useAuth();
	const { unreadConversations } = useChatNotifications();
	const router = useRouter();
	const { requestSudo } = useSudo();
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [searchResults, setSearchResults] = (0, import_react.useState)([]);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(ecosystemSecurity.status.isUnlocked);
	const [selectedConversation, setSelectedConversation] = (0, import_react.useState)(null);
	const conversationsRef = import_react.useRef([]);
	const loadRequestRef = import_react.useRef(0);
	const handledMessageIdsRef = import_react.useRef(/* @__PURE__ */ new Set());
	const [livePreviewByConversation, setLivePreviewByConversation] = (0, import_react.useState)({});
	const [activePreviewConversationId, setActivePreviewConversationId] = (0, import_react.useState)(null);
	const [, startTransition] = (0, import_react.useTransition)();
	const isLikelyEncrypted = (val) => {
		if (!val) return false;
		return val.length > 40 && !val.includes(" ");
	};
	const formatPreviewFromMessage = (0, import_react.useCallback)((message) => {
		if (!message) return "No messages yet";
		if (message.type === "text" || message.type === "attachment") return message.content || `[${message.type}]`;
		return `[${message.type || "message"}]`;
	}, []);
	const handleGlobalSearch = (0, import_react.useCallback)(async (query) => {
		if (!query.trim() || query.length < 2) {
			setSearchResults([]);
			return;
		}
		setSearching(true);
		try {
			setSearchResults((await UsersService.searchUsers(query)).rows.filter((u) => (u.userId || u.$id) !== user?.$id));
		} catch (error) {
			console.error("Global search failed:", error);
		} finally {
			setSearching(false);
		}
	}, [user?.$id]);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			if (searchQuery.length >= 2) handleGlobalSearch(searchQuery);
			else setSearchResults([]);
		}, 500);
		return () => clearTimeout(timer);
	}, [searchQuery, handleGlobalSearch]);
	const startChat = async (targetUser) => {
		if (!user) return;
		const targetUserId = targetUser.userId || targetUser.$id;
		if (!targetUser.publicKey) {
			zt.error(`${targetUser.displayName || targetUser.username} hasn't set up their account for secure chatting yet.`);
			return;
		}
		const found = conversations.find((c) => c.type === "direct" && c.participants?.includes(targetUserId));
		if (found) {
			router.push(`/chat/${found.$id}`);
			return;
		}
		requestSudo({ onSuccess: async () => {
			try {
				await ecosystemSecurity.ensureE2EIdentity(user.$id);
				const participants = [user.$id, targetUserId];
				const newConv = await ChatService.createConversation(participants, "direct");
				router.push(`/chat/${newConv.$id}`);
			} catch (error) {
				console.error("Failed to create chat:", error);
				zt.error(`Failed to create chat: ${error?.message || "Unknown error"}`);
			}
		} });
	};
	const handleConversationUpdated = (0, import_react.useCallback)((updatedConversation) => {
		if (!updatedConversation?.$id) return;
		startTransition(() => {
			setConversations((prev) => {
				const next = prev.map((conv) => conv.$id === updatedConversation.$id ? {
					...conv,
					...updatedConversation
				} : conv);
				next.sort((a, b) => new Date(b.lastMessageAt || b.createdAt || 0).getTime() - new Date(a.lastMessageAt || a.createdAt || 0).getTime());
				conversationsRef.current = next;
				return next;
			});
		});
	}, []);
	const handleConversationDeleted = (0, import_react.useCallback)((conversationId) => {
		ChatService.clearConversationPreviewCache(conversationId);
		startTransition(() => {
			setConversations((prev) => {
				const next = prev.filter((conv) => conv.$id !== conversationId);
				conversationsRef.current = next;
				return next;
			});
			setLivePreviewByConversation((prev) => {
				if (!prev[conversationId]) return prev;
				const next = { ...prev };
				delete next[conversationId];
				return next;
			});
			setActivePreviewConversationId((current) => current === conversationId ? null : current);
			setSelectedConversation((current) => current?.$id === conversationId ? null : current);
		});
	}, []);
	const loadConversations = import_react.useCallback(async () => {
		const requestId = ++loadRequestRef.current;
		try {
			if (!ecosystemSecurity.status.isUnlocked) {
				startTransition(() => setConversations([]));
				setLoading(false);
				return;
			}
			console.log("[ChatList] Loading conversations for user:", user.$id);
			let rows = [...(await ChatService.getConversations(user.$id)).rows];
			if (rows.some((c) => c.isEncrypted) && !ecosystemSecurity.status.isUnlocked) return;
			console.log("[ChatList] Fetched rows count:", rows.length);
			const isSelfChat = (c) => c.type === "direct" && c.participants && (c.participants.length === 1 || c.participants.length === 2) && c.participants.every((p) => p === user.$id);
			const allSelfChats = rows.filter(isSelfChat);
			console.log("[ChatList] Self chats found:", allSelfChats.length);
			if (allSelfChats.length > 1) {
				console.log("[ChatList] Duplicate self-chats detected, deduplicating...");
				allSelfChats.sort((a, b) => {
					const timeA = new Date(a.lastMessageAt || a.$createdAt || 0).getTime();
					return new Date(b.lastMessageAt || b.$createdAt || 0).getTime() - timeA;
				});
				const keeper = allSelfChats[0];
				const extras = allSelfChats.slice(1);
				console.log("[ChatList] Keeping self-chat:", keeper.$id);
				for (const dup of extras) {
					console.log("[ChatList] Removing duplicate self-chat:", dup.$id);
					ChatService.nuclearWipe(dup.$id).then(() => tablesDB.deleteRow(APPWRITE_CONFIG.DATABASES.CHAT, APPWRITE_CONFIG.TABLES.CHAT.CONVERSATIONS, dup.$id)).catch((err) => console.warn("[ChatList] Failed to remove duplicate self-chat", dup.$id, err));
				}
				const extraIds = new Set(extras.map((e) => e.$id));
				rows = rows.filter((r) => !extraIds.has(r.$id));
			}
			if (!rows.find(isSelfChat)) {
				console.log("[ChatList] Self chat not found, auto-initializing...");
				(async () => {
					try {
						await ecosystemSecurity.ensureE2EIdentity(user.$id);
						const newSelfChat = await ChatService.createConversation([user.$id], "direct");
						console.log("[ChatList] Self chat created:", newSelfChat.$id);
						if (loadRequestRef.current !== requestId) return;
						startTransition(() => {
							setConversations((current) => {
								if (current.some((conv) => conv.$id === newSelfChat.$id)) return current;
								const next = [newSelfChat, ...current];
								conversationsRef.current = next;
								return next;
							});
						});
					} catch (e) {
						console.error("[ChatList] Failed to auto-create self chat", e);
					}
				})();
			}
			const sorted = rows.map((conv) => {
				const memoryPreview = ChatService.getConversationPreviewSnapshot(conv.$id);
				const memoryAt = memoryPreview?.lastMessageAt ? new Date(memoryPreview.lastMessageAt).getTime() : -1;
				const rowAt = conv.lastMessageAt ? new Date(conv.lastMessageAt).getTime() : -1;
				const useMemoryPreview = Boolean(memoryPreview && (memoryAt >= rowAt || !conv.lastMessageText));
				const previewText = useMemoryPreview ? memoryPreview?.lastMessageText : conv.lastMessageText;
				const previewAt = useMemoryPreview ? memoryPreview?.lastMessageAt : conv.lastMessageAt;
				const previewId = useMemoryPreview ? memoryPreview?.lastMessageId : conv.lastMessageId;
				const previewSenderId = useMemoryPreview ? memoryPreview?.lastMessageSenderId : conv.lastMessageSenderId;
				if (conv.type !== "direct") return {
					...conv,
					name: conv.name || "Group Chat",
					lastMessageText: previewText,
					lastMessageAt: previewAt,
					lastMessageId: previewId,
					lastMessageSenderId: previewSenderId
				};
				if (conv.participants && (conv.participants.length === 1 || conv.participants.length === 2) && conv.participants.every((p) => p === user.$id)) {
					const cachedMe = getCachedIdentityById(user.$id);
					const myName = cachedMe?.displayName || cachedMe?.username || user.name || "You";
					return {
						...conv,
						otherUserId: user.$id,
						name: `${myName} (You)`,
						isSelf: true,
						avatarUrl: cachedMe?.avatar || null,
						lastMessageText: previewText,
						lastMessageAt: previewAt,
						lastMessageId: previewId,
						lastMessageSenderId: previewSenderId
					};
				}
				const otherId = conv.participants?.find((p) => p !== user.$id);
				const cachedOther = otherId ? getCachedIdentityById(otherId) : null;
				return {
					...conv,
					otherUserId: otherId,
					name: cachedOther?.displayName || cachedOther?.username || (otherId ? `@${otherId.slice(0, 7)}` : "Direct Chat"),
					avatarUrl: cachedOther?.avatar || null,
					lastMessageText: previewText,
					lastMessageAt: previewAt,
					lastMessageId: previewId,
					lastMessageSenderId: previewSenderId
				};
			}).sort((a, b) => {
				if (a.isSelf && !a.lastMessageAt) return -1;
				if (b.isSelf && !b.lastMessageAt) return 1;
				const timeA = new Date(a.lastMessageAt || a.createdAt).getTime();
				return new Date(b.lastMessageAt || b.createdAt).getTime() - timeA;
			});
			console.log("[ChatList] Base conversations count:", sorted.length);
			startTransition(() => {
				setConversations(sorted);
				conversationsRef.current = sorted;
			});
			setLoading(false);
			(async () => {
				const settled = await Promise.allSettled(sorted.map(async (conv) => {
					if (conv.type !== "direct") return conv;
					if (conv.isSelf || conv.participants && (conv.participants.length === 1 || conv.participants.length === 2) && conv.participants.every((p) => p === user.$id)) {
						const myProfile = await UsersService.getProfileById(user.$id);
						if (!myProfile) return conv;
						let avatarUrl = null;
						if (myProfile.avatar?.startsWith?.("http")) avatarUrl = myProfile.avatar;
						else if (myProfile.avatar) try {
							avatarUrl = await fetchProfilePreview(myProfile.avatar, 64, 64);
						} catch (_e) {}
						seedIdentityCache({
							...myProfile,
							avatar: myProfile.avatar || avatarUrl
						});
						return {
							...conv,
							name: `${myProfile.displayName || myProfile.username || user.name || "You"} (You)`,
							avatarUrl
						};
					}
					const otherId = conv.otherUserId || conv.participants?.find((p) => p !== user.$id);
					if (!otherId) return conv;
					const profile = await UsersService.getProfileById(otherId);
					if (!profile) return conv;
					let avatarUrl = null;
					if (profile.avatar?.startsWith?.("http")) avatarUrl = profile.avatar;
					else if (profile.avatar) try {
						avatarUrl = await fetchProfilePreview(profile.avatar, 64, 64);
					} catch (_e) {}
					seedIdentityCache({
						...profile,
						avatar: profile.avatar || avatarUrl
					});
					return {
						...conv,
						otherUserId: otherId,
						name: profile.displayName || profile.username || `@${otherId.slice(0, 7)}`,
						avatarUrl
					};
				}));
				if (loadRequestRef.current !== requestId) return;
				const next = settled.map((entry, index) => entry.status === "fulfilled" ? entry.value : sorted[index]).sort((a, b) => {
					if (a.isSelf && !a.lastMessageAt) return -1;
					if (b.isSelf && !b.lastMessageAt) return 1;
					const timeA = new Date(a.lastMessageAt || a.createdAt).getTime();
					return new Date(b.lastMessageAt || b.createdAt).getTime() - timeA;
				});
				startTransition(() => {
					setConversations(next);
					conversationsRef.current = next;
				});
			})();
		} catch (error) {
			console.error("Failed to load chats:", error);
		} finally {
			setLoading(false);
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		return ecosystemSecurity.onStatusChange((status) => {
			if (status.isUnlocked === isUnlocked) return;
			setIsUnlocked(status.isUnlocked);
			if (status.isUnlocked) loadConversations();
			else {
				ChatService.clearConversationPreviewCache();
				startTransition(() => setConversations([]));
				setLoading(false);
			}
		});
	}, [isUnlocked, loadConversations]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		loadConversations();
		const conversationChannel = `databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.CONVERSATIONS}.rows`;
		const messageChannel = `databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.MESSAGES}.rows`;
		const subscription = realtime.subscribe([conversationChannel, messageChannel], async (response) => {
			const payload = response.payload;
			const isConversationEvent = Array.isArray(payload?.participants);
			const relatedConversationId = isConversationEvent ? payload?.$id : payload?.conversationId;
			if (!relatedConversationId) return;
			if (isConversationEvent) {
				if (response.events.some((e) => e.includes(".delete"))) {
					ChatService.clearConversationPreviewCache(relatedConversationId);
					startTransition(() => {
						setConversations((prev) => prev.filter((c) => c.$id !== relatedConversationId));
					});
					return;
				}
				loadConversations();
				return;
			}
			if (response.events.some((e) => e.includes(".delete"))) {
				ChatService.clearConversationPreviewCache(relatedConversationId);
				startTransition(() => {
					setConversations((prev) => prev.filter((c) => c.$id !== relatedConversationId));
					conversationsRef.current = conversationsRef.current.filter((c) => c.$id !== relatedConversationId);
					setLivePreviewByConversation((prev) => {
						if (!prev[relatedConversationId]) return prev;
						const next = { ...prev };
						delete next[relatedConversationId];
						return next;
					});
					setActivePreviewConversationId((current) => current === relatedConversationId ? null : current);
				});
				return;
			}
			const existingIndex = conversationsRef.current.findIndex((c) => c.$id === relatedConversationId);
			if (existingIndex === -1) {
				loadConversations();
				return;
			}
			if (response.events.some((e) => e.includes(".create")) && payload?.$id && !handledMessageIdsRef.current.has(payload.$id)) {
				handledMessageIdsRef.current.add(payload.$id);
				const livePreviewAt = payload.$createdAt || payload.createdAt || (/* @__PURE__ */ new Date()).toISOString();
				let livePreviewText = formatPreviewFromMessage(payload);
				try {
					const latestMessage = (await ChatService.getMessages(relatedConversationId, 1, 0, user?.$id)).rows?.[0];
					if (latestMessage) livePreviewText = formatPreviewFromMessage(latestMessage);
				} catch (error) {
					console.warn("[ChatList] Failed to hydrate live preview:", error);
				}
				setLivePreviewByConversation((prev) => ({
					...prev,
					[relatedConversationId]: {
						lastMessageId: payload.$id,
						lastMessageText: livePreviewText,
						lastMessageAt: livePreviewAt
					}
				}));
				setActivePreviewConversationId(relatedConversationId);
				window.setTimeout(() => {
					setActivePreviewConversationId((current) => current === relatedConversationId ? null : current);
				}, 900);
				startTransition(() => {
					setConversations((prev) => {
						const next = [...prev];
						const current = next[existingIndex];
						next[existingIndex] = {
							...current,
							lastMessageAt: livePreviewAt,
							lastMessageId: payload.$id,
							lastMessageSenderId: payload.senderId || current.lastMessageSenderId,
							lastMessageText: livePreviewText
						};
						next.sort((a, b) => new Date(b.lastMessageAt || b.createdAt || 0).getTime() - new Date(a.lastMessageAt || a.createdAt || 0).getTime());
						conversationsRef.current = next;
						return next;
					});
				});
				return;
			}
			startTransition(() => {
				setConversations((prev) => {
					const next = [...prev];
					const current = next[existingIndex];
					next[existingIndex] = {
						...current,
						lastMessageAt: payload.$createdAt || payload.createdAt || current.lastMessageAt,
						lastMessageId: payload.$id || current.lastMessageId,
						lastMessageSenderId: payload.senderId || current.lastMessageSenderId,
						lastMessageText: formatPreviewFromMessage(payload) || current.lastMessageText
					};
					next.sort((a, b) => new Date(b.lastMessageAt || b.createdAt || 0).getTime() - new Date(a.lastMessageAt || a.createdAt || 0).getTime());
					conversationsRef.current = next;
					return next;
				});
			});
		});
		return () => {
			if (typeof subscription === "function") subscription();
			else if (subscription?.unsubscribe) subscription.unsubscribe();
		};
	}, [
		user,
		loadConversations,
		formatPreviewFromMessage
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: { p: 2 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
			spacing: 1.5,
			children: [
				1,
				2,
				3,
				4,
				5
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1.5,
					p: 1
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					variant: "rounded",
					width: 40,
					height: 40,
					sx: {
						borderRadius: "12px",
						bgcolor: "rgba(255,255,255,0.05)"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: { flex: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						width: "55%",
						sx: { bgcolor: "rgba(255,255,255,0.05)" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						width: "35%",
						sx: { bgcolor: "rgba(255,255,255,0.05)" }
					})]
				})]
			}, i))
		})
	});
	const filteredConversations = conversations.filter((c) => c.name?.toLowerCase().includes(searchQuery.toLowerCase()));
	const hasNoConversations = filteredConversations.length === 0;
	const showGlobalResults = searchQuery.length >= 2 && searchResults.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			minHeight: 0,
			bgcolor: "#000000",
			position: "relative",
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					p: 3,
					pb: 2
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						gap: 1.25,
						mb: 2
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						onClick: () => router.push("/"),
						"aria-label": "Back to menu",
						sx: {
							width: 40,
							height: 40,
							bgcolor: "#000000",
							color: "text.primary",
							border: "1px solid rgba(255, 255, 255, 0.06)",
							boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.05), 0 0 16px rgba(245, 158, 11, 0.08)",
							"&:hover": {
								bgcolor: "#000000",
								borderColor: "rgba(255, 255, 255, 0.12)",
								boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.08), 0 0 22px rgba(245, 158, 11, 0.12)"
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowBack_default, { fontSize: "small" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h5",
						sx: {
							fontWeight: 900,
							fontFamily: "var(--font-clash)",
							letterSpacing: "-0.02em",
							color: "text.primary"
						},
						children: "Messages"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						gap: 1,
						bgcolor: "#000000",
						borderRadius: "12px",
						px: 2,
						py: 1,
						border: "1px solid rgba(255, 255, 255, 0.05)",
						boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.05), 0 0 22px rgba(245, 158, 11, 0.08)",
						position: "relative",
						"&::after": {
							content: "\"\"",
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							height: "1px",
							background: "rgba(255,255,255,0.05)",
							borderRadius: "12px"
						},
						"&:focus-within": {
							borderColor: "#6366F1",
							bgcolor: "#000000"
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search_default, { sx: {
							fontSize: 18,
							color: "text.disabled"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Search conversations or people...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							style: {
								background: "none",
								border: "none",
								color: "white",
								fontSize: "0.875rem",
								outline: "none",
								width: "100%",
								fontFamily: "var(--font-satoshi)"
							}
						}),
						searching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
							size: 14,
							sx: { color: "primary.main" }
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					overflowY: "auto",
					flex: 1,
					px: 1
				},
				children: [showGlobalResults && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: { mb: 2 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								px: 2,
								mb: 1,
								display: "block",
								fontWeight: 800,
								opacity: .4,
								textTransform: "uppercase",
								letterSpacing: 1
							},
							children: "Global Search"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
							sx: { pt: 0 },
							children: searchResults.map((u) => {
								const targetId = u.userId || u.$id;
								const hasChat = conversations.some((c) => c.type === "direct" && c.participants?.includes(targetId));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, {
									disablePadding: true,
									sx: { mb: .5 },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemButton, {
										onClick: () => startChat(u),
										sx: {
											borderRadius: "12px",
											py: 1,
											bgcolor: "#000000",
											border: "1px solid rgba(255, 255, 255, 0.07)",
											boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.05), 0 0 18px rgba(245, 158, 11, 0.08)",
											"&:hover": {
												bgcolor: "#000000",
												borderColor: "rgba(255, 255, 255, 0.1)",
												boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.08), 0 0 22px rgba(245, 158, 11, 0.12)"
											}
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemAvatar, {
												sx: { minWidth: 56 },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearchAvatar, { u })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
												primary: u.displayName || u.username,
												secondary: `@${u.username}`,
												primaryTypographyProps: {
													fontWeight: 700,
													fontSize: "0.9rem"
												},
												secondaryTypographyProps: {
													fontSize: "0.75rem",
													sx: { opacity: .5 }
												}
											}),
											!hasChat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
												sx: {
													px: 1,
													py: .2,
													borderRadius: "4px",
													bgcolor: alpha("#6366F1", .1),
													border: "1px solid rgba(99, 102, 241, 0.2)"
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													sx: {
														fontSize: "9px",
														fontWeight: 900,
														color: "#6366F1"
													},
													children: "NEW"
												})
											})
										]
									})
								}, u.$id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: {
							mx: 2,
							my: 1,
							opacity: .05
						} })
					]
				}), hasNoConversations && !showGlobalResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						p: 4,
						textAlign: "center",
						color: "text.secondary"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						sx: {
							fontWeight: 600,
							fontSize: "0.9rem"
						},
						children: "No conversations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: { opacity: .6 },
						children: "Search for people to start a chat"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					sx: { pt: 0 },
					children: filteredConversations.map((conv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, {
						disablePadding: true,
						sx: { mb: .5 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemButton, {
							component: NextLink,
							href: `/chat/${conv.$id}`,
							sx: {
								borderRadius: "12px",
								py: 1.5,
								transition: "all 160ms ease",
								bgcolor: "#000000",
								border: "1px solid rgba(255, 255, 255, 0.07)",
								boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.05), 0 0 18px rgba(245, 158, 11, 0.08)",
								...activePreviewConversationId === conv.$id ? {
									bgcolor: "#000000",
									boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.25), 0 0 30px rgba(99, 102, 241, 0.12)",
									transform: "translateY(-1px)"
								} : {},
								"&:hover": {
									bgcolor: "#000000",
									borderColor: "rgba(255, 255, 255, 0.1)",
									boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.08), 0 0 22px rgba(245, 158, 11, 0.12)"
								}
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									component: "span",
									role: "button",
									tabIndex: 0,
									onClick: (event) => {
										event.preventDefault();
										event.stopPropagation();
										setSelectedConversation(conv);
									},
									onKeyDown: (event) => {
										if (event.key !== "Enter" && event.key !== " ") return;
										event.preventDefault();
										event.stopPropagation();
										setSelectedConversation(conv);
									},
									sx: {
										mr: 1.25,
										display: "inline-flex",
										cursor: "pointer"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
										src: conv.avatarUrl,
										sx: {
											bgcolor: conv.avatarUrl ? "transparent" : "#F59E0B",
											color: "#FFFFFF",
											border: "1px solid rgba(255, 255, 255, 0.05)",
											boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.05), 0 0 16px rgba(245, 158, 11, 0.08)",
											width: 44,
											height: 44
										},
										children: conv.isSelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkOutlined_default, { sx: { fontSize: 20 } }) : conv.type === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupWorkOutlined_default, { sx: { fontSize: 22 } }) : conv.name?.replace(/^@/, "").charAt(0).toUpperCase() || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonOutlined_default, { sx: {
											fontSize: 22,
											color: "#F59E0B"
										} })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
									primary: conv.name || (conv.type === "direct" ? conv.otherUserId : "Group Chat"),
									secondary: (() => {
										const memoryPreview = ChatService.getConversationPreviewSnapshot(conv.$id);
										const memoryAt = memoryPreview?.lastMessageAt ? new Date(memoryPreview.lastMessageAt).getTime() : -1;
										const rowAt = conv.lastMessageAt ? new Date(conv.lastMessageAt).getTime() : -1;
										const memoryText = memoryPreview && (memoryAt >= rowAt || !conv.lastMessageText) ? memoryPreview.lastMessageText : null;
										const resolvedPreview = livePreviewByConversation[conv.$id]?.lastMessageText || memoryText || conv.lastMessageText || "No messages yet";
										return conv.isEncrypted && !isUnlocked && isLikelyEncrypted(resolvedPreview) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
											sx: {
												display: "flex",
												alignItems: "center",
												gap: .5
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOutlined_default, { sx: {
												fontSize: 12,
												opacity: .5
											} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Encrypted message" })]
										}) : resolvedPreview;
									})(),
									primaryTypographyProps: {
										fontWeight: 700,
										fontSize: "0.95rem",
										color: conv.isSelf ? "#6366F1" : "text.primary",
										fontFamily: "var(--font-clash)"
									},
									secondaryTypographyProps: {
										noWrap: true,
										fontSize: "0.75rem",
										sx: {
											opacity: .5,
											mt: .3
										}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									sx: {
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-end",
										gap: 1
									},
									children: [conv.lastMessageAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: {
											fontSize: "0.65rem",
											opacity: .4,
											fontWeight: 600
										},
										children: new Date(conv.lastMessageAt).toLocaleDateString([], {
											month: "short",
											day: "numeric"
										})
									}), conv.lastMessageAt && conv.lastMessageId && !conv.isSelf && (() => {
										const readAt = getConversationReadAt(user?.$id, conv.$id);
										return unreadConversations.has(conv.$id) || conv.lastMessageSenderId !== user?.$id && new Date(conv.lastMessageAt).getTime() > readAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "dot",
											color: "primary",
											sx: { "& .MuiBadge-badge": {
												bgcolor: "#6366F1",
												boxShadow: "0 0 8px rgba(99, 102, 241, 0.5)"
											} }
										}) : null;
									})()]
								})
							]
						})
					}, conv.$id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationActionsSheet, {
				conversation: selectedConversation,
				open: Boolean(selectedConversation),
				onClose: () => setSelectedConversation(null),
				onConversationUpdated: handleConversationUpdated,
				onConversationDeleted: handleConversationDeleted
			})
		]
	});
};
var DISMISS_KEY_PREFIX = "kylrix_connect_profile_setup_dismissed";
var normalizeUsername = (value) => value.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
var ProfileSetupDrawer = () => {
	const { user } = useAuth();
	const { profile, isLoading, refreshProfile } = useProfile();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [dismissed, setDismissed] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [isChecking, setIsChecking] = (0, import_react.useState)(false);
	const [isAvailable, setIsAvailable] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!user?.$id) return;
		setDismissed(sessionStorage.getItem(`${DISMISS_KEY_PREFIX}_${user.$id}`) === "1");
	}, [user?.$id]);
	(0, import_react.useEffect)(() => {
		if (!user?.$id || isLoading) return;
		const needsSetup = !profile?.username || !profile?.displayName;
		setOpen(Boolean(needsSetup && !dismissed));
	}, [
		user?.$id,
		profile?.username,
		profile?.displayName,
		isLoading,
		dismissed
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setUsername(profile?.username || "");
		setDisplayName(profile?.displayName || user?.name || "");
		setBio(profile?.bio || "");
		setError("");
		setIsAvailable(null);
	}, [
		open,
		profile,
		user?.name
	]);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(async () => {
			if (!open || !user?.$id) return;
			const currentUsername = profile?.username || "";
			const nextUsername = normalizeUsername(username);
			if (!nextUsername || nextUsername === currentUsername) {
				setIsAvailable(null);
				return;
			}
			if (nextUsername.length < 3) {
				setIsAvailable(false);
				return;
			}
			setIsChecking(true);
			try {
				setIsAvailable(await UsersService.isUsernameAvailable(nextUsername));
			} catch (err) {
				console.error("Failed to check username:", err);
			} finally {
				setIsChecking(false);
			}
		}, 400);
		return () => clearTimeout(timer);
	}, [
		open,
		username,
		profile?.username,
		user?.$id
	]);
	const handleDismiss = () => {
		if (user?.$id) sessionStorage.setItem(`${DISMISS_KEY_PREFIX}_${user.$id}`, "1");
		setDismissed(true);
		setOpen(false);
	};
	const handleSave = async () => {
		if (!user?.$id) return;
		const nextUsername = normalizeUsername(username);
		if (!nextUsername) {
			setError("Username is required");
			return;
		}
		if (nextUsername !== profile?.username && isAvailable === false) {
			setError("Please pick an available username");
			return;
		}
		setLoading(true);
		setError("");
		try {
			let publicKey;
			if (ecosystemSecurity.status.isUnlocked) try {
				const pub = await ecosystemSecurity.ensureE2EIdentity(user.$id);
				if (pub) publicKey = pub;
			} catch (syncError) {
				console.warn("Could not sync public key during profile setup", syncError);
			}
			await UsersService.updateProfile(user.$id, {
				username: nextUsername,
				displayName: displayName.trim(),
				bio,
				publicKey
			});
			if (displayName.trim() || nextUsername) try {
				if (displayName.trim()) await account.updateName(displayName.trim());
				const currentPrefs = user?.prefs || {};
				await account.updatePrefs({
					...currentPrefs,
					username: nextUsername
				});
			} catch (prefErr) {
				console.warn("Failed to sync display name or username to account prefs", prefErr);
			}
			await refreshProfile();
			zt.success("Profile setup saved");
			setOpen(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save profile");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		anchor: "bottom",
		open,
		onClose: handleDismiss,
		ModalProps: { keepMounted: true },
		PaperProps: { sx: {
			borderTopLeftRadius: "24px",
			borderTopRightRadius: "24px",
			bgcolor: "#161412",
			borderTop: "1px solid rgba(255, 255, 255, 0.06)",
			backgroundImage: "none"
		} },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				maxWidth: 720,
				width: "100%",
				mx: "auto",
				p: {
					xs: 2,
					sm: 3
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
						gap: 2
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h6",
						sx: {
							fontWeight: 900,
							color: "white"
						},
						children: "Set up your chat profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							opacity: .65,
							mt: .5
						},
						children: "Pick a username so people can find you in Connect."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						onClick: handleDismiss,
						sx: { color: "text.secondary" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: {
					my: 2.5,
					borderColor: "rgba(255, 255, 255, 0.06)"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					spacing: 2,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Username",
							value: username,
							onChange: (e) => setUsername(normalizeUsername(e.target.value)),
							fullWidth: true,
							autoComplete: "off",
							InputProps: {
								startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
									position: "start",
									children: "@"
								}),
								endAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputAdornment, {
									position: "end",
									children: [
										isChecking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 18 }),
										!isChecking && isAvailable === true && username && normalizeUsername(username) !== profile?.username && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											size: 18,
											color: "#10B981"
										}),
										!isChecking && isAvailable === false && username && normalizeUsername(username) !== profile?.username && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
											size: 18,
											color: "#F59E0B"
										})
									]
								})
							},
							helperText: isAvailable === false && normalizeUsername(username) !== profile?.username ? "Username is already taken" : "Only letters, numbers, underscores, and hyphens"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Display name",
							value: displayName,
							onChange: (e) => setDisplayName(e.target.value),
							fullWidth: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Bio",
							value: bio,
							onChange: (e) => setBio(e.target.value),
							fullWidth: true,
							multiline: true,
							rows: 3
						})
					]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					color: "error",
					variant: "body2",
					sx: { mt: 2 },
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						display: "flex",
						justifyContent: "flex-end",
						gap: 1.5,
						mt: 3
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleDismiss,
						variant: "text",
						sx: { color: "text.secondary" },
						children: "Dismiss"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "contained",
						onClick: handleSave,
						disabled: loading || !normalizeUsername(username) || isAvailable === false && normalizeUsername(username) !== profile?.username,
						sx: {
							borderRadius: "12px",
							px: 2.5
						},
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
							size: 22,
							color: "inherit"
						}) : "Save profile"
					})]
				})
			]
		})
	});
};
var drawerWidth = 280;
var AppShell = ({ children }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [_anchorEl, _setAnchorEl] = (0, import_react.useState)(null);
	const [bottomNavOffset, setBottomNavOffset] = (0, import_react.useState)(0);
	const { headerHeight } = useAppChrome();
	const isEmbedded = (0, import_react.useMemo)(() => searchParams?.get("is_embedded") === "true", [searchParams]);
	const isExternalProfile = pathname?.startsWith("/u/");
	const isChatActive = pathname?.startsWith("/chat/") || pathname === "/chats";
	const isPostActive = pathname?.startsWith("/post/");
	const isInsideChat = pathname?.startsWith("/chat/");
	const isFullscreenContent = isChatActive || isPostActive;
	(0, import_react.useEffect)(() => {
		const updateBottomNavOffset = () => {
			if (typeof window === "undefined") return;
			const viewport = window.visualViewport;
			if (!viewport) {
				setBottomNavOffset(0);
				return;
			}
			setBottomNavOffset(Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop));
		};
		updateBottomNavOffset();
		const viewport = window.visualViewport;
		if (!viewport) return;
		viewport.addEventListener("resize", updateBottomNavOffset);
		viewport.addEventListener("scroll", updateBottomNavOffset);
		window.addEventListener("resize", updateBottomNavOffset);
		return () => {
			viewport.removeEventListener("resize", updateBottomNavOffset);
			viewport.removeEventListener("scroll", updateBottomNavOffset);
			window.removeEventListener("resize", updateBottomNavOffset);
		};
	}, []);
	const navItems = [
		{
			label: "Home",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { size: 24 }),
			href: "/"
		},
		{
			label: "Chats",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 24 }),
			href: "/chats"
		},
		{
			label: "Calls",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 24 }),
			href: "/calls"
		},
		{
			label: "Settings",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 24 }),
			href: "/settings"
		}
	];
	if (isEmbedded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: {
			minHeight: "100vh",
			bgcolor: "#000000",
			p: 2,
			overflowY: "auto"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			elevation: 0,
			sx: {
				minHeight: "100%",
				bgcolor: "#000000",
				borderRadius: "24px",
				border: "1px solid",
				borderColor: "rgba(255, 255, 255, 0.05)",
				p: 2,
				position: "relative",
				"&::before": {
					content: "\"\"",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: "1px",
					background: "rgba(255, 255, 255, 0.03)",
					borderRadius: "24px"
				}
			},
			children
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			display: "flex",
			height: "100dvh",
			minHeight: "100dvh",
			overflow: "hidden",
			bgcolor: "#000000"
		},
		children: [
			!isFullscreenContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSetupDrawer, {}),
			!isExternalProfile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				variant: "permanent",
				sx: {
					width: drawerWidth,
					flexShrink: 0,
					display: {
						xs: "none",
						md: "block"
					},
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
						top: isFullscreenContent ? 0 : headerHeight,
						height: isFullscreenContent ? "100%" : `calc(100% - ${headerHeight}px)`,
						bgcolor: "#000000",
						borderRight: "1px solid",
						borderColor: "rgba(255, 255, 255, 0.05)"
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						height: "100%",
						overflow: "hidden",
						display: "flex",
						flexDirection: "column"
					},
					children: isChatActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							px: 2,
							py: 1.5,
							borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => router.push("/"),
							startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }),
							fullWidth: true,
							sx: {
								justifyContent: "flex-start",
								color: "text.secondary",
								fontWeight: 700,
								fontSize: "0.8rem",
								borderRadius: "10px",
								"&:hover": {
									bgcolor: "rgba(255, 255, 255, 0.05)",
									color: "white"
								}
							},
							children: "Back to Menu"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							flex: 1,
							overflow: "hidden"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatList, {})
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							overflow: "auto",
							mt: 2,
							px: 2
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
							sx: {
								gap: 1,
								display: "flex",
								flexDirection: "column"
							},
							children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, {
								disablePadding: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemButton, {
									component: NextLink,
									href: item.href,
									selected: pathname === item.href,
									sx: {
										borderRadius: "12px",
										transition: "all 0.2s ease",
										"&.Mui-selected": {
											bgcolor: "rgba(99, 102, 241, 0.1)",
											color: "#6366F1",
											"&:hover": { bgcolor: "rgba(99, 102, 241, 0.15)" },
											"& .MuiListItemIcon-root": { color: "#6366F1" }
										},
										"&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" }
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemIcon, {
										sx: {
											minWidth: 40,
											color: pathname === item.href ? "#6366F1" : "text.secondary"
										},
										children: item.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
										primary: item.label,
										primaryTypographyProps: {
											fontWeight: pathname === item.href ? 700 : 500,
											fontSize: "0.9rem"
										}
									})]
								})
							}, item.href))
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "main",
				sx: {
					flexGrow: 1,
					height: "100%",
					overflow: "hidden",
					position: "relative",
					pt: isFullscreenContent ? 0 : `${headerHeight}px`,
					bgcolor: "#000000",
					transition: "all 0.3s ease-in-out"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						height: "100%",
						p: isInsideChat || isPostActive ? 0 : {
							xs: 2,
							md: 3
						},
						pb: isFullscreenContent ? 0 : {
							xs: 10,
							md: 3
						},
						overflowY: isInsideChat || isPostActive ? "hidden" : "auto",
						overscrollBehaviorY: isPostActive ? "contain" : "auto",
						maxWidth: isExternalProfile ? "1200px" : "auto",
						mx: isExternalProfile ? "auto" : "unset"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						elevation: 0,
						sx: {
							height: isInsideChat || isPostActive ? "100%" : "auto",
							minHeight: "100%",
							bgcolor: isInsideChat || isPostActive ? "transparent" : "#000000",
							borderRadius: isInsideChat || isPostActive ? 0 : "24px",
							border: isInsideChat || isPostActive ? "none" : "1px solid",
							borderColor: "rgba(255, 255, 255, 0.05)",
							p: isInsideChat || isPostActive ? 0 : {
								xs: 2,
								md: 4
							},
							position: "relative",
							display: isInsideChat || isPostActive ? "flex" : "block",
							flexDirection: "column",
							"&::before": {
								content: isInsideChat || isPostActive ? "none" : "\"\"",
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								height: "1px",
								background: "rgba(255, 255, 255, 0.03)",
								borderRadius: "24px"
							}
						},
						children
					})
				})
			}),
			!isFullscreenContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				component: "footer",
				sx: {
					position: "fixed",
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 1300,
					display: {
						xs: "block",
						md: "none"
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					elevation: 0,
					sx: {
						width: "100%",
						bgcolor: "#161412",
						border: "1px solid rgba(255, 255, 255, 0.05)",
						borderBottom: 0,
						borderRadius: "24px 24px 0 0",
						px: 2,
						pt: 1.5,
						pb: "calc(1.5rem + env(safe-area-inset-bottom))",
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
						boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 -12px 32px rgba(0,0,0,0.45)",
						backgroundImage: "none"
					},
					children: navItems.map((item) => {
						const isActive = pathname === item.href;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							component: NextLink,
							href: item.href,
							sx: {
								color: isActive ? "#000" : "rgba(255, 255, 255, 0.6)",
								bgcolor: isActive ? "#F59E0B" : "transparent",
								borderRadius: "16px",
								p: 1.5,
								transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
								"&:hover": {
									bgcolor: isActive ? "#F59E0B" : "rgba(255, 255, 255, 0.05)",
									transform: "translateY(-2px)"
								},
								...isActive && {
									boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
									transform: "translateY(-4px)"
								}
							},
							children: item.icon
						}, item.href);
					})
				})
			})
		]
	});
};
//#endregion
export { markConversationRead as a, getUserSubscriptionTier as i, ChatList as n, tiny_secp256k1_exports as o, getUserProfilePicId as r, AppShell as t };
