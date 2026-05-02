import { o as __toESM } from "../_runtime.mjs";
import { i as ID, o as Query } from "../_libs/appwrite.mjs";
import { c as realtime, d as tablesDB, t as APPWRITE_CONFIG, u as storage } from "./client-bVtyOxJQ.mjs";
import { n as UsersService, o as seedIdentityCache, r as getCachedIdentityById, s as subscribeIdentityCache } from "./users-vRrLGFai.mjs";
import { n as ecosystemSecurity } from "./security-DTzL0999.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { H as useTheme, J as alpha, d as Close_default, f as SearchOutlined_default, l as ShieldOutlined_default, p as DescriptionOutlined_default, u as VpnKeyOutlined_default, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { A as DialogActions, B as Box, C as InputAdornment, D as Divider, E as Drawer, G as AppBar, H as Avatar, J as IconButton, K as Typography, O as DialogTitle, X as Paper, Y as CircularProgress, _ as ListItemIcon, a as Tab, b as ListItemButton, f as Skeleton, g as ListItemText, h as Popover, i as Toolbar, j as Dialog, k as DialogContent, m as Menu, n as TextField, p as MenuItem, r as Tabs, s as Stack, t as useMediaQuery, x as List, z as Button } from "../_libs/@mui/material+[...].mjs";
import { a as useParams$1, i as useAuth, n as Image, s as useRouter, t as ChatService } from "./chat-GLmU6cBO.mjs";
import { Ct as CheckCheck, D as Reply, Dt as AtSign, Et as Bookmark, J as Key, L as Mic, St as Check, T as Send, U as Lock, _ as SquareCheckBig, b as Shield, bt as ChevronLeft, ct as ExternalLink, ft as Copy, h as Square, ht as CirclePlus, i as Video, it as FileText, j as Phone, k as RefreshCw, n as X, o as Users, p as Trash2, pt as Clock, rt as File$1, s as User, ut as EllipsisVertical } from "../_libs/lucide-react.mjs";
import { t as FormattedText } from "./FormattedText-D8u0iX80.mjs";
import { r as zt } from "../_libs/react-hot-toast.mjs";
import { n as format } from "../_libs/date-fns.mjs";
import "../_libs/simplewebauthn__browser.mjs";
import { _ as fetchProfilePreview, a as IdentityName, b as getVerificationState, h as buildSafetyWarning, i as IdentityAvatar, p as SudoModal, w as useChatNotifications } from "./DynamicIsland-DPFhB0ig.mjs";
import { t as require_src } from "../_libs/bip39.mjs";
import { t as BIP32Factory } from "../_libs/bip32+[...].mjs";
import { t as initEccLib } from "../_libs/bitcoinjs-lib.mjs";
import "../_libs/@solana/web3.js.mjs";
import { a as markConversationRead, i as getUserSubscriptionTier, o as tiny_secp256k1_exports, t as AppShell } from "./AppShell-JgOEZgrs.mjs";
import { r as usePresence } from "./PresenceProvider-C-XMou-3.mjs";
import { n as showUpgradeIsland, t as EcosystemService } from "./upgrade-island-DBox53k5.mjs";
import { t as require_speakeasy } from "../_libs/speakeasy.mjs";
import { t as require_dist } from "../_libs/ed25519-hd-key+tweetnacl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat._id-WiDHO9vj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
require_src();
var import_speakeasy = /* @__PURE__ */ __toESM(require_speakeasy());
require_dist();
var BUCKETS = {
	MESSAGES: "messages",
	VOICE: "voice",
	VIDEO: "video",
	DOCUMENTS: "documents"
};
var StorageService = {
	async uploadFile(file, bucketId = BUCKETS.MESSAGES) {
		return await storage.createFile(bucketId, ID.unique(), file);
	},
	getFileView(fileId, bucketId = BUCKETS.MESSAGES) {
		return storage.getFileView(bucketId, fileId);
	},
	getFilePreview(fileId, bucketId = BUCKETS.MESSAGES, width, height) {
		return storage.getFilePreview(bucketId, fileId, width, height);
	},
	getFileDownload(fileId, bucketId = BUCKETS.MESSAGES) {
		return storage.getFileDownload(bucketId, fileId);
	},
	getBucketForType(type) {
		switch (type) {
			case "audio": return BUCKETS.VOICE;
			case "video": return BUCKETS.VIDEO;
			case "file": return BUCKETS.DOCUMENTS;
			default: return BUCKETS.MESSAGES;
		}
	}
};
var NoteSelectorModal = ({ open, onClose, onSelect }) => {
	const { user } = useAuth();
	const [notes, setNotes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const loadNotes = import_react.useCallback(async () => {
		if (!user) return;
		setLoading(true);
		try {
			setNotes((await EcosystemService.listNotes(user.$id)).rows);
		} catch (error) {
			console.error("Failed to load notes:", error);
		} finally {
			setLoading(false);
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (open && user) loadNotes();
	}, [
		open,
		user,
		loadNotes
	]);
	const handleSelect = (note) => {
		onSelect(note);
		onClose();
	};
	const filteredNotes = notes.filter((_note) => {
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
		anchor: "bottom",
		open,
		onClose,
		PaperProps: { sx: {
			borderRadius: "24px 24px 0 0",
			bgcolor: "rgba(15, 15, 15, 0.98)",
			backdropFilter: "blur(20px)",
			borderTop: "1px solid rgba(255,255,255,0.08)",
			boxShadow: "0 -24px 60px rgba(0,0,0,0.6)",
			maxHeight: {
				xs: "88dvh",
				sm: "72vh"
			}
		} },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				p: 3,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				maxHeight: "72vh"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h6",
						sx: {
							fontWeight: 900,
							color: "white",
							letterSpacing: "-0.02em",
							fontFamily: "var(--font-space-grotesk)"
						},
						children: "ATTACH NOTE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							color: "rgba(255,255,255,0.45)",
							fontWeight: 800,
							textTransform: "uppercase",
							letterSpacing: "0.08em"
						},
						children: "Pick from Kylrix Note"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						onClick: onClose,
						size: "small",
						sx: {
							bgcolor: "rgba(255,255,255,0.03)",
							color: "rgba(255,255,255,0.55)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close_default, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { borderColor: "rgba(255,255,255,0.08)" } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					fullWidth: true,
					size: "small",
					placeholder: "Search notes...",
					value: searchTerm,
					onChange: (e) => setSearchTerm(e.target.value),
					sx: { "& .MuiOutlinedInput-root": {
						bgcolor: "rgba(255,255,255,0.03)",
						borderRadius: "12px",
						"& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
						"&:hover fieldset": { borderColor: "rgba(99,102,241,0.3)" },
						"&.Mui-focused fieldset": { borderColor: "#6366F1" }
					} },
					InputProps: { startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
						position: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOutlined_default, { sx: {
							color: "rgba(255,255,255,0.3)",
							fontSize: 20
						} })
					}) }
				}),
				loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						display: "flex",
						justifyContent: "center",
						py: 4
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 24 })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					sx: {
						maxHeight: "400px",
						overflowY: "auto"
					},
					children: filteredNotes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							textAlign: "center",
							py: 4,
							color: "text.secondary"
						},
						children: "No notes found."
					}) : filteredNotes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemButton, {
						onClick: () => handleSelect(note),
						sx: {
							borderRadius: "12px",
							mb: 1,
							cursor: "pointer",
							border: "1px solid rgba(255,255,255,0.05)",
							"&:hover": { bgcolor: "rgba(255,255,255,0.05)" }
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionOutlined_default, { sx: { color: "primary.main" } }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
							primary: note.title || "Untitled Note",
							secondary: new Date(note.updatedAt).toLocaleDateString(),
							primaryTypographyProps: { fontWeight: 600 }
						})]
					}, note.$id))
				})
			]
		})
	});
};
var SecretSelectorModal = ({ open, onClose, onSelect, isSelf }) => {
	const { user } = useAuth();
	const [tab, setTab] = (0, import_react.useState)(0);
	const [secrets, setSecrets] = (0, import_react.useState)([]);
	const [totps, setTotps] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [unlockModalOpen, setUnlockModalOpen] = (0, import_react.useState)(false);
	const [pendingSelection, setPendingSelection] = (0, import_react.useState)(null);
	const loadData = import_react.useCallback(async () => {
		if (!user) return;
		setLoading(true);
		try {
			const [secretsRes, totpsRes] = await Promise.all([EcosystemService.listSecrets(user.$id), EcosystemService.listTotpSecrets(user.$id)]);
			setSecrets(secretsRes.rows);
			setTotps(totpsRes.rows);
		} catch (error) {
			console.error("Failed to load ecosystem data:", error);
		} finally {
			setLoading(false);
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (open && user) loadData();
	}, [
		open,
		user,
		loadData
	]);
	const handleSelect = async (item, type) => {
		if (type === "secret" && !isSelf) {
			alert("For security, secrets can only be shared in your self-chat. TOTP codes can be shared anywhere.");
			return;
		}
		if (!ecosystemSecurity.status.isUnlocked) {
			setPendingSelection({
				item,
				type
			});
			setUnlockModalOpen(true);
			return;
		}
		try {
			if (type === "totp") {
				const decryptedSecret = await ecosystemSecurity.decrypt(item.secretKey);
				const code = import_speakeasy.totp({
					secret: decryptedSecret.replace(/\s+/g, "").toUpperCase(),
					encoding: "base32"
				});
				onSelect({
					...item,
					currentCode: code
				}, "totp");
			} else onSelect(item, "secret");
			onClose();
		} catch (error) {
			console.error("Failed to process selection:", error);
		}
	};
	const _filteredItems = tab === 0 ? secrets.filter((s) => (s.name || "").toLowerCase().includes(searchTerm.toLowerCase())) : totps.filter((t) => (t.issuer || "").toLowerCase().includes(searchTerm.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onClose,
		PaperProps: { sx: {
			borderRadius: "24px",
			bgcolor: "rgba(15, 15, 15, 0.95)",
			backdropFilter: "blur(20px)",
			border: "1px solid rgba(255, 255, 255, 0.08)",
			backgroundImage: "none",
			width: "100%",
			maxWidth: "500px",
			minHeight: "400px"
		} },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				sx: {
					fontWeight: 800,
					fontFamily: "var(--font-space-grotesk)",
					pb: 0
				},
				children: "Attach Secret"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onChange: (_, v) => setTab(v),
				sx: {
					px: 3,
					borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
					label: "Credentials",
					sx: {
						fontWeight: 700,
						fontSize: "0.8rem"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
					label: "TOTP",
					sx: {
						fontWeight: 700,
						fontSize: "0.8rem"
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				fullWidth: true,
				size: "small",
				placeholder: `Search ${tab === 0 ? "credentials" : "TOTP"}...`,
				value: searchTerm,
				onChange: (e) => setSearchTerm(e.target.value),
				sx: {
					mb: 2,
					mt: 2
				},
				InputProps: {
					startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOutlined_default, { sx: {
						mr: 1,
						color: "text.secondary",
						fontSize: 20
					} }),
					sx: {
						borderRadius: "12px",
						bgcolor: "rgba(255, 255, 255, 0.05)"
					}
				}
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					display: "flex",
					justifyContent: "center",
					py: 4
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 24 })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
				sx: {
					maxHeight: "400px",
					overflowY: "auto"
				},
				children: _filteredItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "body2",
					sx: {
						textAlign: "center",
						py: 4,
						color: "text.secondary"
					},
					children: "No items found."
				}) : _filteredItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemButton, {
					disabled: tab === 0 && !isSelf,
					onClick: () => handleSelect(item, tab === 0 ? "secret" : "totp"),
					sx: {
						borderRadius: "12px",
						mb: 1,
						cursor: tab === 0 && !isSelf ? "default" : "pointer",
						"&:hover": { bgcolor: tab === 0 && !isSelf ? "transparent" : "rgba(255, 255, 255, 0.05)" },
						opacity: tab === 0 && !isSelf ? .5 : 1
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemIcon, { children: tab === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOutlined_default, { sx: { color: "primary.main" } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VpnKeyOutlined_default, { sx: { color: "#6366F1" } }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
							primary: tab === 0 ? item.name || "Unnamed" : item.issuer || "Unknown",
							secondary: tab === 0 ? item.username : item.accountName,
							primaryTypographyProps: { fontWeight: 600 }
						}),
						tab === 0 && !isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								color: "error.main",
								fontWeight: 700
							},
							children: "Self-only"
						})
					]
				}, item.$id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogActions, {
				sx: { p: 2 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onClose,
					sx: { color: "text.secondary" },
					children: "Cancel"
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SudoModal, {
		isOpen: unlockModalOpen,
		onCancel: () => setUnlockModalOpen(false),
		onSuccess: async () => {
			setUnlockModalOpen(false);
			if (pendingSelection) {
				const { item, type } = pendingSelection;
				try {
					if (type === "totp") {
						const decryptedSecret = await ecosystemSecurity.decrypt(item.secretKey);
						const code = generateSync({ secret: decryptedSecret.replace(/\s+/g, "").toUpperCase() });
						onSelect({
							...item,
							currentCode: code
						}, "totp");
					} else onSelect(item, "secret");
					setPendingSelection(null);
					onClose();
				} catch (e) {
					console.error("Processing after unlock failed", e);
				}
			}
		}
	})] });
};
var TILE_WIDTH = 640;
var TILE_HEIGHT = 456;
var STROKE = "#f3f0ea";
var createRng = (seed) => () => {
	seed = seed * 1664525 + 1013904223 >>> 0;
	return seed / 4294967296;
};
var rng = createRng(146938675);
var motifTypes = [
	"note",
	"chat",
	"phone",
	"screen",
	"wifi",
	"battery",
	"cloud",
	"camera",
	"music",
	"heart",
	"link",
	"cursor",
	"window",
	"plane",
	"gift",
	"pin",
	"calendar",
	"poly",
	"stick",
	"laugh",
	"run",
	"spark",
	"slash",
	"mic",
	"headphones",
	"mail",
	"paperclip",
	"play",
	"record",
	"bell",
	"lock",
	"tag",
	"upload",
	"download",
	"code",
	"reply",
	"note",
	"chat",
	"heart",
	"camera"
];
var makeMotifs = () => {
	const cols = 18;
	const rows = 14;
	const stepX = TILE_WIDTH / cols;
	const stepY = TILE_HEIGHT / rows;
	const items = [];
	for (let row = 0; row < rows; row += 1) for (let col = 0; col < cols; col += 1) {
		const type = motifTypes[(row * cols + col) % motifTypes.length];
		const offset = row % 2 * (stepX * .32);
		const x = col * stepX + stepX / 2 + offset + (rng() - .5) * stepX * .24;
		const y = row * stepY + stepY / 2 + (rng() - .5) * stepY * .22;
		items.push({
			x,
			y,
			rotate: (rng() - .5) * 22,
			scale: .42 + rng() * .28,
			opacity: .34 + rng() * .34,
			width: .82 + rng() * .72,
			type,
			variant: Math.floor(rng() * 3)
		});
	}
	return items;
};
var motifs = makeMotifs();
var line = (x1, y1, x2, y2, strokeWidth, opacity, dash) => `
  <line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${STROKE}" stroke-width="${strokeWidth.toFixed(2)}" stroke-opacity="${opacity.toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ""} />`;
var poly = (points, strokeWidth, opacity) => `
  <polygon points="${points}" fill="none" stroke="${STROKE}" stroke-width="${strokeWidth.toFixed(2)}" stroke-opacity="${opacity.toFixed(2)}" stroke-linejoin="round" stroke-linecap="round" />`;
var path = (d, strokeWidth, opacity, dash) => `
  <path d="${d}" fill="none" stroke="${STROKE}" stroke-width="${strokeWidth.toFixed(2)}" stroke-opacity="${opacity.toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ""} />`;
var noteMotif = (variant) => [
	poly(variant === 0 ? "6 3 16 3 20 7 20 21 6 21 6 3" : variant === 1 ? "5 3 17 3 19 6 19 20 5 20 5 3" : "7 3 18 4 18 21 7 20 4 16 4 7", 1.15, .76),
	line(16, 3, 20, 7, 1.02, .64),
	line(8, 8, 16, 8, .98, .4),
	line(8, 11, 16, 11, .98, .34),
	line(8, 14, 13, 14, .95, .3),
	line(13, 14, 17, 18, .95, .5)
];
var chatMotif = (variant) => [
	poly(variant === 0 ? "4 4 20 4 20 15 13 15 9 20 9 15 4 15" : variant === 1 ? "4 5 19 5 19 14 14 14 9 19 9 14 4 14" : "5 4 19 4 19 16 12 16 8 20 8 16 5 16", 1.1, .78),
	line(7, 8, 17, 8, .98, .38),
	line(7, 11, 14, 11, .96, .32),
	line(10, 15, 12, 15, .96, .36)
];
var phoneMotif = (variant) => [
	poly(variant === 0 ? "6 2 18 2 21 5 21 21 18 24 6 24 3 21 3 5" : variant === 1 ? "7 2 17 2 21 6 21 20 17 24 7 24 3 20 3 6" : "6 3 18 3 20 6 20 22 18 24 6 24 4 22 4 6", 1.15, .76),
	line(6, 6, 18, 6, .98, .4),
	line(6, 9, 18, 9, .95, .27),
	line(6, 12, 18, 12, .92, .24, "2 2"),
	line(6, 16, 11, 16, .95, .4),
	line(13, 16, 18, 16, .95, .4),
	line(10, 21, 14, 21, 1.08, .66)
];
var screenMotif = (variant) => [
	poly(variant === 0 ? "3 4 21 4 21 19 17 23 3 23" : variant === 1 ? "4 4 20 4 20 20 16 23 4 23" : "3 5 21 5 21 18 18 22 3 22", 1.12, .7),
	line(3, 8, 21, 8, .98, .34),
	line(6, 12, 18, 12, .95, .28),
	line(6, 16, 16, 16, .92, .24),
	line(14, 19, 19, 23, .95, .38)
];
var wifiMotif = () => [
	line(4, 7, 12, 3, 1.02, .4),
	line(12, 3, 20, 7, 1.02, .4),
	line(7, 11, 12, 8, .98, .28),
	line(12, 8, 17, 11, .98, .28),
	line(10, 15, 12, 13, .92, .6),
	line(12, 13, 14, 15, .92, .6),
	line(8, 18, 12, 18, .92, .24),
	line(12, 18, 16, 18, .92, .24)
];
var batteryMotif = (variant) => [
	poly(variant === 0 ? "4 6 18 6 18 18 4 18" : variant === 1 ? "4 7 17 7 17 17 4 17" : "5 6 18 6 18 19 5 19", 1.1, .76),
	line(18, 9, 21, 9, 1.02, .58),
	line(7, 9, 11, 9, .98, .44),
	line(11, 9, 15, 9, .98, .44),
	line(15, 9, 17, 9, .98, .44)
];
var cloudMotif = () => [path("M6 17 C4 17, 2 15, 2 12 C2 9, 4 7, 7 7 C8 4, 11 2, 14 2 C18 2, 21 5, 21 9 C23 9, 25 11, 25 14 C25 17, 23 19, 20 19 H7 C6 19, 6 19, 6 17 Z", 1.02, .7), line(7, 16, 18, 16, .94, .28)];
var cameraMotif = (variant) => [
	poly(variant === 0 ? "5 6 9 6 11 4 17 4 19 6 21 6 21 18 5 18" : variant === 1 ? "4 7 8 7 10 5 17 5 20 7 21 7 21 18 4 18" : "5 6 10 6 11 4 16 4 19 6 20 6 20 18 5 18", 1.1, .74),
	line(13, 8, 17, 8, .95, .32),
	line(13, 8, 13, 14, .95, .26),
	poly("10 10 14 10 16 12 14 16 10 16 8 12", .95, .46)
];
var musicMotif = (variant) => [
	line(variant === 0 ? 8 : 7, 3, variant === 0 ? 8 : 7, 17, 1.05, .74),
	line(variant === 0 ? 8 : 7, 3, variant === 0 ? 18 : 17, 5, 1.05, .68),
	poly("6 16 8 14 11 14 13 16 11 18 8 18", .95, .58),
	poly("16 18 18 16 21 16 23 18 21 20 18 20", .95, .58)
];
var heartMotif = () => [
	path("M12 22 C12 22, 4 16, 4 10 C4 6, 7 3, 10 3 C11 3, 12 4, 12 5 C12 4, 13 3, 14 3 C17 3, 20 6, 20 10 C20 16, 12 22, 12 22 Z", 1.02, .7),
	line(8, 8, 10, 10, .92, .3),
	line(16, 8, 14, 10, .92, .3)
];
var linkMotif = () => [
	path("M8 8 C5 8, 3 10, 3 13 C3 16, 5 18, 8 18 H11", 1.02, .68),
	path("M15 10 H17 C20 10, 22 12, 22 15 C22 18, 20 20, 17 20 H14", 1.02, .68),
	line(9, 13, 16, 13, .96, .4)
];
var cursorMotif = () => [poly("4 3 19 12 11 14 14 21 11 22 8 15 4 18", 1.02, .76), line(9, 11, 14, 16, .92, .3)];
var windowMotif = (variant) => [
	poly(variant === 0 ? "4 4 20 4 20 20 4 20" : variant === 1 ? "4 5 20 5 20 21 4 21" : "5 4 20 4 20 20 5 20", 1.05, .7),
	line(4, 8, 20, 8, .96, .34),
	line(9, 4, 9, 20, .92, .28),
	line(15, 4, 15, 20, .92, .28),
	line(4, 14, 20, 14, .9, .22, "2 2")
];
var planeMotif = () => [
	poly("3 12 22 3 15 22 12 14 3 12", 1.02, .74),
	line(12, 14, 8, 18, .92, .34),
	line(12, 14, 13, 20, .92, .34)
];
var giftMotif = () => [
	poly("4 7 20 7 20 21 4 21", 1.08, .72),
	line(12, 7, 12, 21, .98, .38),
	line(4, 12, 20, 12, .98, .38),
	line(8, 7, 7, 4, .92, .28),
	line(16, 7, 17, 4, .92, .28),
	line(8, 12, 8, 21, .9, .22),
	line(16, 12, 16, 21, .9, .22)
];
var pinMotif = () => [path("M12 3 C8 3, 5 6, 5 10 C5 15, 12 22, 12 22 C12 22, 19 15, 19 10 C19 6, 16 3, 12 3 Z", 1.02, .72), poly("10 8 14 8 14 12 10 12", .92, .38)];
var calendarMotif = (variant) => [
	poly(variant === 0 ? "4 5 20 5 20 21 4 21" : variant === 1 ? "4 4 20 4 20 20 4 20" : "5 5 20 5 20 21 5 21", 1.05, .74),
	line(4, 9, 20, 9, .96, .34),
	line(8, 3, 8, 7, 1.02, .46),
	line(16, 3, 16, 7, 1.02, .46),
	line(7, 13, 13, 13, .92, .28),
	line(15, 13, 17, 13, .92, .28),
	line(7, 17, 10, 17, .92, .28)
];
var polyCluster = (variant) => [
	poly(variant === 0 ? "10 2 20 8 18 19 9 22 2 14 3 6" : variant === 1 ? "8 3 19 7 21 16 12 22 3 17 4 6" : "9 2 19 6 18 18 8 22 2 15 3 6", 1.08, .78),
	poly(variant === 0 ? "6 5 16 3 22 12 16 21 5 18 2 10" : variant === 1 ? "5 4 17 4 21 13 16 22 5 18 3 9" : "6 4 16 4 21 11 15 21 4 18 2 10", .98, .56),
	line(3, 11, 22, 11, .92, .44),
	line(10, 2, 10, 22, .9, .32),
	line(4, 5, 20, 19, .9, .28)
];
var stickFigure = (variant) => [
	poly("10 2 14 4 15 8 12 11 8 11 5 8 6 4", 1.02, .72),
	line(11, 11, 11, 19, 1.14, .8),
	line(11, 13, 6, 16, 1, .68),
	line(11, 13, 16, 16, 1, .68),
	line(11, 19, 7, 24, 1, .68),
	line(11, 19, 15, 24, 1, .68),
	...variant === 1 ? [line(16, 10, 21, 6, 1, .7), line(18, 7, 22, 4, .94, .56)] : [],
	...variant === 2 ? [
		line(8, 6, 9, 6, .92, .5),
		line(13, 6, 14, 6, .92, .5),
		line(8, 9, 14, 9, .9, .34, "1 1")
	] : [
		line(8, 6, 9, 6, .9, .44),
		line(13, 6, 14, 6, .9, .44),
		line(8, 9, 14, 9, .88, .34)
	]
];
var runningKid = (variant) => [
	poly(variant === 0 ? "6 2 11 4 13 9 10 12 5 11 3 7" : variant === 1 ? "8 2 13 4 15 9 12 12 7 11 5 7" : "7 2 12 4 14 9 11 12 6 11 4 7", 1.02, .74),
	line(variant === 1 ? 10 : 8, 12, variant === 1 ? 14 : 12, 15, 1.1, .76),
	line(variant === 1 ? 14 : 12, 15, variant === 1 ? 19 : 17, 13, 1, .68),
	line(variant === 1 ? 12 : 10, 15, variant === 1 ? 8 : 6, 20, 1, .68),
	line(variant === 1 ? 12 : 10, 15, variant === 1 ? 16 : 20, 19, 1, .68),
	line(variant === 1 ? 15 : 13, 8, variant === 1 ? 20 : 18, 5, .96, .62),
	line(variant === 1 ? 18 : 16, 5, variant === 1 ? 22 : 20, 8, .92, .48)
];
var laughFace = (variant) => [
	poly(variant === 0 ? "9 2 15 4 18 10 16 17 9 20 4 17 2 10 4 4" : variant === 1 ? "8 2 15 3 19 9 17 17 9 20 4 16 2 10 4 4" : "9 3 15 4 18 9 16 18 9 20 4 17 2 10 4 4", 1.02, .7),
	line(7, 8, 9, 9, .92, .42),
	line(13, 8, 15, 9, .92, .42),
	path("M6 13 C8 16, 13 16, 16 13", .98, .68),
	line(7, 14, 8.5, 15.5, .9, .38),
	line(14, 14, 12.5, 15.5, .9, .38)
];
var spark = (variant) => [
	line(12, 2, 12, 22, 1, .68),
	line(2, 12, 22, 12, 1, .68),
	line(5, 5, 19, 19, 1, .54),
	line(19, 5, 5, 19, 1, .54),
	...variant === 0 ? [line(7, 2, 17, 22, .92, .36), line(17, 2, 7, 22, .92, .36)] : []
];
var slashField = (variant) => [
	line(2, 5, 22, 19, 1, .58),
	line(4, 2, 18, 24, .96, .38, variant === 0 ? "3 3" : "4 2"),
	line(2, 21, 20, 4, 1, .5),
	line(5, 9, 23, 9, .92, .24)
];
var paperclipMotif = (variant) => [path(variant === 0 ? "M8 9 C8 6, 11 5, 13 7 L18 12 C20 14, 20 17, 18 19 C16 21, 13 21, 11 19 L6 14 C4 12, 4 9, 6 7 C8 5, 11 5, 13 7" : variant === 1 ? "M9 8 C9 5, 12 4, 14 6 L18 10 C20 12, 20 16, 18 18 C16 20, 12 20, 10 18 L7 15 C5 13, 5 10, 7 8 C9 6, 12 6, 14 8" : "M7 9 C7 6, 10 5, 13 7 L17 11 C19 13, 19 17, 17 19 C15 21, 11 21, 9 19 L6 16 C4 14, 4 10, 6 8 C8 6, 11 6, 13 8", 1, .72), line(8, 11, 15, 18, .9, .28)];
var micMotif = (variant) => [
	path(variant === 0 ? "M8 6 C8 4, 10 3, 12 3 C14 3, 16 4, 16 6 V13 C16 15, 14 17, 12 17 C10 17, 8 15, 8 13 Z" : "M7 7 C7 4, 10 3, 12 3 C14 3, 17 4, 17 7 V13 C17 16, 14 18, 12 18 C10 18, 7 16, 7 13 Z", 1.02, .74),
	line(12, 17, 12, 21, .95, .36),
	line(9, 21, 15, 21, .92, .34)
];
var headphonesMotif = (variant) => [
	path(variant === 0 ? "M6 13 C6 8, 8 4, 12 4 C16 4, 18 8, 18 13" : "M5 13 C5 8, 8 4, 12 4 C16 4, 19 8, 19 13", 1.02, .74),
	line(6, 13, 6, 18, .96, .44),
	line(18, 13, 18, 18, .96, .44),
	poly("4 13 7 13 7 18 4 18", .9, .38),
	poly("17 13 20 13 20 18 17 18", .9, .38)
];
var mailMotif = (variant) => [
	poly(variant === 0 ? "4 5 20 5 20 19 4 19" : "5 6 19 6 19 20 5 20", 1.08, .76),
	line(4, 6, 12, 13, .96, .44),
	line(20, 6, 12, 13, .96, .44),
	line(4, 19, 10, 12, .94, .28),
	line(20, 19, 14, 12, .94, .28)
];
var playMotif = (variant) => [poly(variant === 0 ? "5 4 20 12 5 20" : "6 4 21 12 6 20", 1.02, .76), line(5, 4, 5, 20, .88, .24)];
var recordMotif = () => [
	poly("4 4 20 4 20 20 4 20", .98, .3),
	poly("8 8 16 8 16 16 8 16", 1.02, .7),
	poly("11 11 13 11 13 13 11 13", .92, .5)
];
var bellMotif = () => [
	path("M8 17 H16 C16 15, 17 14, 17 12 V10 C17 7, 15 5, 12 5 C9 5, 7 7, 7 10 V12 C7 14, 8 15, 8 17 Z", 1.02, .74),
	line(10, 17, 10, 19, .92, .36),
	line(14, 17, 14, 19, .92, .36),
	line(9, 4, 15, 4, .9, .28)
];
var lockMotif = () => [
	poly("6 11 18 11 18 21 6 21", 1.02, .74),
	path("M8 11 V8 C8 5, 10 3, 12 3 C14 3, 16 5, 16 8 V11", 1, .62),
	poly("11 15 13 15 13 17 11 17", .9, .4)
];
var tagMotif = () => [poly("4 7 14 7 21 14 14 21 4 21 4 7", 1.02, .74), poly("7 10 10 10 10 13 7 13", .92, .34)];
var uploadMotif = () => [
	line(12, 18, 12, 6, 1, .7),
	poly("8 9 12 5 16 9", 1.02, .68),
	line(5, 19, 19, 19, .92, .28)
];
var downloadMotif = () => [
	line(12, 6, 12, 18, 1, .7),
	poly("8 15 12 19 16 15", 1.02, .68),
	line(5, 20, 19, 20, .92, .28)
];
var codeMotif = () => [
	line(10, 4, 5, 12, 1, .74),
	line(5, 12, 10, 20, 1, .74),
	line(14, 4, 19, 12, 1, .74),
	line(19, 12, 14, 20, 1, .74)
];
var replyMotif = () => [
	line(8, 8, 16, 8, 1, .44),
	line(8, 8, 8, 5, 1, .44),
	line(8, 8, 12, 12, 1, .44),
	line(12, 12, 8, 16, 1, .44)
];
var renderMotif = (motif) => {
	const body = (() => {
		switch (motif.type) {
			case "note": return noteMotif(motif.variant);
			case "chat": return chatMotif(motif.variant);
			case "phone": return phoneMotif(motif.variant);
			case "screen": return screenMotif(motif.variant);
			case "wifi": return wifiMotif();
			case "battery": return batteryMotif(motif.variant);
			case "cloud": return cloudMotif();
			case "camera": return cameraMotif(motif.variant);
			case "music": return musicMotif(motif.variant);
			case "heart": return heartMotif();
			case "link": return linkMotif();
			case "cursor": return cursorMotif();
			case "window": return windowMotif(motif.variant);
			case "plane": return planeMotif();
			case "gift": return giftMotif();
			case "pin": return pinMotif();
			case "calendar": return calendarMotif(motif.variant);
			case "poly": return polyCluster(motif.variant);
			case "stick": return stickFigure(motif.variant);
			case "laugh": return laughFace(motif.variant);
			case "run": return runningKid(motif.variant);
			case "spark": return spark(motif.variant);
			case "slash": return slashField(motif.variant);
			case "mic": return micMotif(motif.variant);
			case "headphones": return headphonesMotif(motif.variant);
			case "mail": return mailMotif(motif.variant);
			case "paperclip": return paperclipMotif(motif.variant);
			case "play": return playMotif(motif.variant);
			case "record": return recordMotif();
			case "bell": return bellMotif();
			case "lock": return lockMotif();
			case "tag": return tagMotif();
			case "upload": return uploadMotif();
			case "download": return downloadMotif();
			case "code": return codeMotif();
			case "reply": return replyMotif();
			default: return slashField(motif.variant);
		}
	})();
	return `
  <g transform="translate(${motif.x.toFixed(2)} ${motif.y.toFixed(2)}) rotate(${motif.rotate.toFixed(2)} 12 12) scale(${motif.scale.toFixed(2)})" stroke-width="${motif.width.toFixed(2)}" opacity="${motif.opacity.toFixed(2)}">
    ${body.join("")}
  </g>`;
};
var muralTileSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE_WIDTH} ${TILE_HEIGHT}" shape-rendering="geometricPrecision">
  <rect width="${TILE_WIDTH}" height="${TILE_HEIGHT}" fill="#0A0908"/>
  <g fill="none" stroke="${STROKE}" stroke-linecap="round" stroke-linejoin="round">
    ${motifs.map(renderMotif).join("")}
  </g>
</svg>
`);
function MuralPattern() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
		position: "absolute",
		inset: 0,
		pointerEvents: "none",
		backgroundColor: "#0A0908",
		backgroundImage: `url("data:image/svg+xml,${muralTileSvg}")`,
		backgroundRepeat: "repeat",
		backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
		zIndex: 0,
		filter: "grayscale(1) brightness(1.05) contrast(0.9) opacity(0.93)"
	} });
}
var KYLRIX_COLORS = {
	ecosystemPrimary: "#6366F1",
	background: "#0A0908",
	surface: "#161412",
	surfaceHover: "#1C1A18",
	text: "#FFFFFF",
	mutedText: "rgba(255,255,255,0.56)"
};
KYLRIX_COLORS.ecosystemPrimary, KYLRIX_COLORS.ecosystemPrimary, KYLRIX_COLORS.ecosystemPrimary, KYLRIX_COLORS.ecosystemPrimary, KYLRIX_COLORS.ecosystemPrimary, KYLRIX_COLORS.ecosystemPrimary;
KYLRIX_COLORS.ecosystemPrimary;
function buildApiPath(basePath, ...segments) {
	return [basePath.replace(/\/+$/, ""), ...segments.map((segment) => String(segment || "").trim().replace(/^\/+|\/+$/g, "")).filter(Boolean)].join("/");
}
function createApiModulePaths(basePath = "/api") {
	return {
		connect: {
			messages: buildApiPath(basePath, "connect", "messages"),
			reactions: buildApiPath(basePath, "connect", "message-reactions"),
			joinRequests: buildApiPath(basePath, "connect", "join-requests"),
			repair: buildApiPath(basePath, "connect", "repair")
		},
		forward: {
			conversations: buildApiPath(basePath, "forward", "conversations"),
			send: buildApiPath(basePath, "forward", "send"),
			targets: buildApiPath(basePath, "forward", "targets")
		}
	};
}
createApiModulePaths();
function buildNoteAttachmentMetadata(note) {
	return {
		type: "attachment",
		entity: "note",
		subType: "shared_note",
		referenceId: note.$id || null,
		payload: {
			label: note.title || "Attached Note",
			preview: String(note.content || "").slice(0, 100)
		}
	};
}
initEccLib(tiny_secp256k1_exports);
BIP32Factory(tiny_secp256k1_exports);
var MessagesType = {
	TEXT: "text",
	IMAGE: "image",
	VIDEO: "video",
	AUDIO: "audio",
	FILE: "file",
	CALL_SIGNAL: "call_signal",
	SYSTEM: "system"
};
var getMessageTimestamp = (msg) => new Date(msg.$createdAt || msg.createdAt || Date.now()).getTime();
var getClientReadSegments = (messages, currentUserId, isDirectChat = false, conversationReadAt = 0) => {
	if (!currentUserId || !isDirectChat) return {
		outgoingReadAt: 0,
		firstUnreadIncomingIndex: -1
	};
	let outgoingReadAt = 0;
	for (const msg of messages) {
		if (msg.senderId === currentUserId) continue;
		outgoingReadAt = Math.max(outgoingReadAt, getMessageTimestamp(msg));
	}
	const firstUnreadIncomingIndex = messages.findIndex((msg) => msg.senderId !== currentUserId && getMessageTimestamp(msg) > conversationReadAt);
	return {
		outgoingReadAt,
		firstUnreadIncomingIndex
	};
};
var groupMessageReactions = (reactions, currentUserId) => {
	const groups = /* @__PURE__ */ new Map();
	reactions.forEach((reaction) => {
		const emoji = reaction?.emoji;
		if (!emoji) return;
		const existing = groups.get(emoji);
		if (existing) {
			existing.count += 1;
			existing.reactedBySelf = existing.reactedBySelf || reaction.userId === currentUserId;
			return;
		}
		groups.set(emoji, {
			emoji,
			count: 1,
			reactedBySelf: reaction.userId === currentUserId
		});
	});
	return Array.from(groups.values());
};
var dedupeReactionsByUser = (reactions) => {
	const latestByUser = /* @__PURE__ */ new Map();
	reactions.forEach((reaction) => {
		if (!reaction?.userId || !reaction?.messageId) return;
		const key = `${reaction.messageId}:${reaction.userId}`;
		const existing = latestByUser.get(key);
		const nextTime = new Date(reaction.updatedAt || reaction.$updatedAt || reaction.createdAt || reaction.$createdAt || 0).getTime();
		const existingTime = existing ? new Date(existing.updatedAt || existing.$updatedAt || existing.createdAt || existing.$createdAt || 0).getTime() : -1;
		if (!existing || nextTime >= existingTime) latestByUser.set(key, reaction);
	});
	return Array.from(latestByUser.values());
};
var sortReactionGroups = (reactions, currentUserId) => groupMessageReactions(reactions, currentUserId).sort((left, right) => {
	if (right.count !== left.count) return right.count - left.count;
	return left.emoji.localeCompare(right.emoji);
});
var getReactionActorLabel = (userId, senderProfiles) => {
	const cached = senderProfiles[userId] || getCachedIdentityById(userId);
	return cached?.displayName || cached?.username || `@${userId.slice(0, 7)}`;
};
var ChatDraftInput = import_react.memo(function ChatDraftInput({ attachment, sending, isRecording, attachmentDisabled = false, enableMentions, mentionTargets, onAttach, onUpgradeRequested, onSend, onToggleRecording }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	const [mentionAnchorEl, setMentionAnchorEl] = (0, import_react.useState)(null);
	const textRef = (0, import_react.useRef)(null);
	const submitDraft = import_react.useCallback(async () => {
		if (await onSend(draft)) setDraft("");
	}, [draft, onSend]);
	const insertMention = import_react.useCallback((token) => {
		const input = textRef.current;
		if (!input) {
			setDraft((prev) => `${prev}${prev && !prev.endsWith(" ") ? " " : ""}${token} `);
			return;
		}
		const start = input.selectionStart ?? draft.length;
		const end = input.selectionEnd ?? draft.length;
		const before = draft.slice(0, start);
		const after = draft.slice(end);
		const prefix = before && !before.endsWith(" ") ? " " : "";
		setDraft(`${before}${prefix}${token} ${after}`);
		requestAnimationFrame(() => {
			const cursor = before.length + prefix.length + token.length + 1;
			input.focus();
			input.setSelectionRange(cursor, cursor);
		});
	}, [draft]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			display: "flex",
			alignItems: "center",
			gap: .75,
			width: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				size: "small",
				onClick: attachmentDisabled ? onUpgradeRequested : onAttach,
				"aria-disabled": attachmentDisabled,
				sx: {
					color: attachmentDisabled ? "rgba(255,255,255,0.32)" : "text.secondary",
					width: 40,
					height: 40,
					flexShrink: 0,
					bgcolor: attachmentDisabled ? "rgba(255, 255, 255, 0.015)" : "rgba(255, 255, 255, 0.02)",
					border: "1px solid rgba(255, 255, 255, 0.06)",
					"&:hover": {
						bgcolor: attachmentDisabled ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.05)",
						borderColor: attachmentDisabled ? "rgba(255,255,255,0.08)" : "rgba(245, 158, 11, 0.35)",
						color: attachmentDisabled ? "rgba(255,255,255,0.42)" : "#F59E0B",
						cursor: attachmentDisabled ? "not-allowed" : "pointer"
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, {
					size: 18,
					strokeWidth: 1.8
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				onClick: onToggleRecording,
				sx: {
					color: isRecording ? "#ff4d4d" : "text.secondary",
					width: 40,
					height: 40,
					flexShrink: 0,
					bgcolor: "rgba(255, 255, 255, 0.02)",
					border: "1px solid rgba(255, 255, 255, 0.06)",
					"&:hover": {
						bgcolor: "rgba(255, 255, 255, 0.05)",
						borderColor: "rgba(245, 158, 11, 0.35)",
						color: "#F59E0B"
					}
				},
				children: isRecording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
					size: 18,
					strokeWidth: 1.8
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
					size: 18,
					strokeWidth: 1.8
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				fullWidth: true,
				placeholder: "Type a message...",
				value: draft,
				inputRef: textRef,
				onChange: (e) => setDraft(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						submitDraft();
					}
				},
				sx: {
					flex: 1,
					"& .MuiOutlinedInput-root": {
						minHeight: 40,
						borderRadius: "999px",
						bgcolor: "#161514",
						fontSize: "0.95rem",
						transition: "all 0.2s ease",
						"& fieldset": { borderColor: "rgba(255, 255, 255, 0.06)" },
						"&:hover fieldset": { borderColor: "rgba(245, 158, 11, 0.18)" },
						"&.Mui-focused fieldset": { borderColor: "#F59E0B" }
					},
					"& .MuiInputBase-input": {
						py: 1,
						px: 1.5
					}
				},
				InputProps: { startAdornment: enableMentions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
					position: "start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						size: "small",
						onClick: (e) => setMentionAnchorEl(e.currentTarget),
						sx: {
							color: "text.secondary",
							mr: .5,
							"&:hover": { color: "#F59E0B" }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, {
							size: 16,
							strokeWidth: 2
						})
					})
				}) : void 0 }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				onClick: () => void submitDraft(),
				disabled: sending || !draft.trim() && !attachment,
				sx: {
					bgcolor: draft.trim() || attachment ? "#F59E0B" : "rgba(255, 255, 255, 0.02)",
					color: "#000",
					width: 40,
					height: 40,
					flexShrink: 0,
					borderRadius: "999px",
					opacity: sending ? .82 : 1,
					transform: sending ? "translateY(-1px)" : "none",
					"&:hover": {
						bgcolor: draft.trim() || attachment ? alpha("#F59E0B", .85) : "rgba(255, 255, 255, 0.05)",
						boxShadow: draft.trim() || attachment ? "0 0 15px rgba(245, 158, 11, 0.25)" : "none"
					},
					"&.Mui-disabled": {
						bgcolor: "rgba(255, 255, 255, 0.03)",
						color: "rgba(255, 255, 255, 0.14)"
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
						size: 18,
						strokeWidth: 2
					}), sending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
						position: "absolute",
						top: -2,
						right: -2,
						width: 7,
						height: 7,
						borderRadius: "50%",
						bgcolor: "#10B981",
						boxShadow: "0 0 0 2px rgba(245, 158, 11, 0.22)"
					} })]
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, {
		anchorEl: mentionAnchorEl,
		open: Boolean(mentionAnchorEl),
		onClose: () => setMentionAnchorEl(null),
		PaperProps: { sx: {
			mt: 1,
			minWidth: 220,
			borderRadius: "16px",
			bgcolor: "#1F1D1B",
			border: "1px solid rgba(255, 255, 255, 0.08)",
			backgroundImage: "none"
		} },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
				onClick: () => {
					insertMention("@all");
					setMentionAnchorEl(null);
				},
				sx: {
					gap: 1.5,
					py: 1.1,
					fontWeight: 700
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, { size: 16 }), " @all"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: {
				my: .5,
				opacity: .08
			} }),
			(mentionTargets || []).map((target) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
				onClick: () => {
					insertMention(target.token);
					setMentionAnchorEl(null);
				},
				sx: {
					gap: 1.5,
					py: 1.1,
					fontWeight: 600
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtSign, { size: 16 }),
					" ",
					target.label
				]
			}, target.id))
		]
	})] });
});
var ChatWindow = ({ conversationId }) => {
	const { user } = useAuth();
	const { markConversationRead: markConversationReadInContext } = useChatNotifications();
	const { presence, getPresence } = usePresence();
	const isMobile = useMediaQuery(useTheme().breakpoints.down("md"), { noSsr: true });
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [conversation, setConversation] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [attachment, setAttachment] = (0, import_react.useState)(null);
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [anchorEl, setAnchorEl] = (0, import_react.useState)(null);
	const [attachAnchorEl, setAttachAnchorEl] = (0, import_react.useState)(null);
	const [noteModalOpen, setNoteModalOpen] = (0, import_react.useState)(false);
	const [secretModalOpen, setSecretModalOpen] = (0, import_react.useState)(false);
	const [unlockModalOpen, setUnlockModalOpen] = (0, import_react.useState)(false);
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(ecosystemSecurity.status.isUnlocked);
	const [replyingTo, setReplyingTo] = (0, import_react.useState)(null);
	const [messageAnchorEl, setMessageAnchorEl] = (0, import_react.useState)(null);
	const [partnerProfile, setPartnerProfile] = (0, import_react.useState)(null);
	const [partnerVerification, setPartnerVerification] = (0, import_react.useState)(() => getVerificationState(null));
	const [conversationReadAt, setConversationReadAt] = (0, import_react.useState)(0);
	const [senderProfiles, setSenderProfiles] = (0, import_react.useState)({});
	const [messageReactions, setMessageReactions] = (0, import_react.useState)({});
	const [reactionPopoverAnchorEl, setReactionPopoverAnchorEl] = (0, import_react.useState)(null);
	const [reactionPopoverMessageId, setReactionPopoverMessageId] = (0, import_react.useState)(null);
	const initialLoadRef = (0, import_react.useRef)(null);
	const [, startTransition] = (0, import_react.useTransition)();
	const isProPlan = getUserSubscriptionTier(user) === "PRO";
	const messagesEndRef = (0, import_react.useRef)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const audioChunksRef = (0, import_react.useRef)([]);
	const router = useRouter();
	const clientReadSegments = import_react.useMemo(() => getClientReadSegments(messages, user?.$id, conversation?.type === "direct", conversationReadAt), [
		messages,
		user?.$id,
		conversation?.type,
		conversationReadAt
	]);
	const messageSenderIds = import_react.useMemo(() => Array.from(new Set(messages.map((msg) => msg.senderId).filter(Boolean))), [messages]);
	const groupMentionTargets = import_react.useMemo(() => {
		if (conversation?.type !== "group" || !Array.isArray(conversation?.participants)) return [];
		const participantIds = conversation.participants.filter((participantId) => typeof participantId === "string" && participantId.trim().length > 0);
		return Array.from(new Set(participantIds)).filter((participantId) => participantId !== user?.$id).map((participantId) => {
			const cached = senderProfiles[participantId] || getCachedIdentityById(participantId);
			const username = cached?.username || null;
			return {
				id: participantId,
				label: cached?.displayName || username || `@${participantId.slice(0, 7)}`,
				token: username ? `@${username}` : `@${participantId.slice(0, 7)}`
			};
		});
	}, [
		conversation?.participants,
		conversation?.type,
		senderProfiles,
		user?.$id
	]);
	const reactionsByMessageId = import_react.useMemo(() => messageReactions, [messageReactions]);
	const reactionPopoverMessage = import_react.useMemo(() => messages.find((message) => message.$id === reactionPopoverMessageId) || null, [messages, reactionPopoverMessageId]);
	const reactionPopoverRows = import_react.useMemo(() => {
		if (!reactionPopoverMessageId) return [];
		return reactionsByMessageId[reactionPopoverMessageId] || [];
	}, [reactionPopoverMessageId, reactionsByMessageId]);
	const reactionPopoverGroups = import_react.useMemo(() => {
		const groups = /* @__PURE__ */ new Map();
		reactionPopoverRows.forEach((reaction) => {
			if (!reaction?.emoji || !reaction?.userId) return;
			const existing = groups.get(reaction.emoji);
			const actor = {
				userId: reaction.userId,
				label: getReactionActorLabel(reaction.userId, senderProfiles),
				isSelf: reaction.userId === user?.$id
			};
			if (existing) {
				if (!existing.actors.some((entry) => entry.userId === reaction.userId)) existing.actors.push(actor);
				return;
			}
			groups.set(reaction.emoji, {
				emoji: reaction.emoji,
				actors: [actor]
			});
		});
		return Array.from(groups.values());
	}, [
		reactionPopoverRows,
		senderProfiles,
		user?.$id
	]);
	const isSelf = conversation?.type === "direct" && conversation?.participants && (conversation.participants.length === 1 || conversation.participants.length === 2) && conversation.participants.every((p) => p === user?.$id);
	const hasRepliedToPartner = messages.some((message) => message.senderId === user?.$id);
	const showFirstContactWarning = Boolean(conversation?.type === "direct" && !isSelf && partnerProfile && !partnerVerification.verified && !hasRepliedToPartner);
	const loadConversation = import_react.useCallback(async () => {
		if (!user?.$id) return;
		try {
			if (ecosystemSecurity.status.isUnlocked) await UsersService.forceSyncProfileWithIdentity(user);
			const conv = await ChatService.getConversationById(conversationId, user.$id);
			if (conv.type === "direct") {
				const otherId = conv.participants.find((p) => p !== user.$id);
				if (otherId) try {
					const profile = await UsersService.getProfileById(otherId);
					startTransition(() => {
						setPartnerProfile(profile || null);
						setPartnerVerification(getVerificationState(profile?.preferences || null));
					});
					let avatarUrl = null;
					if (profile?.avatar?.startsWith?.("http")) avatarUrl = profile.avatar;
					else if (profile?.avatar) try {
						avatarUrl = await fetchProfilePreview(profile.avatar, 64, 64);
					} catch (_e) {}
					seedIdentityCache({
						...profile,
						avatar: profile?.avatar || avatarUrl
					});
					startTransition(() => {
						setConversation({
							...conv,
							name: profile ? profile.displayName || profile.username : `@${otherId.slice(0, 7)}`,
							avatarUrl
						});
					});
				} catch (_e) {
					startTransition(() => {
						setPartnerProfile(null);
						setPartnerVerification(getVerificationState(null));
						setConversation({
							...conv,
							name: `@${otherId.slice(0, 7)}`
						});
					});
				}
				else {
					const myProfile = await UsersService.getProfileById(user.$id);
					const myName = myProfile ? myProfile.displayName || myProfile.username : user.name || "You";
					startTransition(() => {
						setPartnerProfile(null);
						setPartnerVerification(getVerificationState(null));
					});
					let avatarUrl = null;
					if (myProfile?.avatar?.startsWith?.("http")) avatarUrl = myProfile.avatar;
					else if (myProfile?.avatar) try {
						avatarUrl = await fetchProfilePreview(myProfile.avatar, 64, 64);
					} catch (_e) {}
					seedIdentityCache({
						...myProfile,
						avatar: myProfile?.avatar || avatarUrl
					});
					startTransition(() => {
						setConversation({
							...conv,
							name: `${myName} (You)`,
							avatarUrl
						});
					});
				}
			} else startTransition(() => {
				setPartnerProfile(null);
				setPartnerVerification(getVerificationState(null));
				setConversation(conv);
			});
		} catch (error) {
			console.error("Failed to load conversation:", error);
		}
	}, [conversationId, user]);
	const loadReactions = import_react.useCallback(async () => {
		try {
			const grouped = dedupeReactionsByUser((await tablesDB.listRows(APPWRITE_CONFIG.DATABASES.CHAT, APPWRITE_CONFIG.TABLES.CHAT.MESSAGE_REACTIONS, [
				Query.equal("conversationId", conversationId),
				Query.limit(1e3),
				Query.orderAsc("createdAt")
			])).rows || []).reduce((acc, reaction) => {
				if (!reaction?.messageId) return acc;
				acc[reaction.messageId] ||= [];
				acc[reaction.messageId].push(reaction);
				return acc;
			}, {});
			startTransition(() => setMessageReactions(grouped));
		} catch (error) {
			console.error("Failed to load reactions:", error);
		}
	}, [conversationId]);
	const loadMessages = import_react.useCallback(async () => {
		setLoading(true);
		try {
			startTransition(() => setMessageReactions({}));
			if (user?.$id && ecosystemSecurity.status.isUnlocked) await UsersService.forceSyncProfileWithIdentity(user);
			const [response, conv] = await Promise.all([ChatService.getMessages(conversationId, 50, 0, user?.$id), ChatService.getConversationById(conversationId, user?.$id)]);
			let displayMessages = response.rows;
			if (user && conv.settings) try {
				const decryptedSettings = await ecosystemSecurity.decrypt(conv.settings);
				const myClearedAt = JSON.parse(decryptedSettings).clearedAt?.[user.$id];
				if (myClearedAt) displayMessages = displayMessages.filter((m) => new Date(m.$createdAt) > new Date(myClearedAt));
			} catch (_e) {}
			startTransition(() => {
				setMessages(displayMessages.reverse());
			});
			loadReactions();
		} catch (error) {
			console.error("Failed to load messages:", error);
		} finally {
			setLoading(false);
		}
	}, [
		conversationId,
		loadReactions,
		user
	]);
	const openReactionPopover = import_react.useCallback((event, messageId) => {
		setReactionPopoverAnchorEl(event.currentTarget);
		setReactionPopoverMessageId(messageId);
	}, []);
	const closeReactionPopover = import_react.useCallback(() => {
		setReactionPopoverAnchorEl(null);
		setReactionPopoverMessageId(null);
	}, []);
	(0, import_react.useEffect)(() => {
		if (user?.$id && conversationId) {
			setConversationReadAt(markConversationRead(conversationId, user.$id));
			markConversationReadInContext(conversationId);
		}
	}, [
		conversationId,
		user?.$id,
		messages.length,
		markConversationReadInContext
	]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = ecosystemSecurity.onStatusChange((status) => {
			const shouldReload = status.isUnlocked && status.hasIdentity && !isUnlocked;
			setIsUnlocked(status.isUnlocked);
			if (shouldReload) {
				loadMessages();
				loadConversation();
			}
		});
		return () => unsubscribe();
	}, [
		loadConversation,
		loadMessages,
		isUnlocked
	]);
	(0, import_react.useEffect)(() => {
		if (conversationId && conversation?.type === "direct" && !isSelf) {
			const otherId = conversation.participants.find((p) => p !== user?.$id);
			if (otherId) getPresence(otherId);
		}
	}, [
		conversationId,
		conversation,
		isSelf,
		user,
		getPresence
	]);
	(0, import_react.useEffect)(() => {
		if (!messageSenderIds.length) return;
		let cancelled = false;
		const hydrateSenders = async () => {
			const missingIds = messageSenderIds.filter((senderId) => {
				const cached = senderProfiles[senderId] || getCachedIdentityById(senderId);
				const hasRenderableAvatar = Boolean(senderProfiles[senderId]?.avatarUrl || cached?.avatar && cached.avatar.startsWith?.("http"));
				return !cached || !hasRenderableAvatar;
			});
			if (!missingIds.length) return;
			const resolved = await Promise.all(missingIds.map(async (senderId) => {
				try {
					const profile = await UsersService.getProfileById(senderId);
					if (!profile) return null;
					let avatarUrl = null;
					if (profile?.avatar?.startsWith?.("http")) avatarUrl = profile.avatar;
					else if (profile?.avatar) try {
						avatarUrl = await fetchProfilePreview(profile.avatar, 48, 48);
					} catch (_e) {}
					const normalized = seedIdentityCache({
						...profile,
						avatar: profile?.avatar || avatarUrl
					});
					if (!normalized) return null;
					return {
						senderId,
						profile: {
							displayName: normalized.displayName,
							username: normalized.username,
							avatar: normalized.avatar,
							avatarUrl,
							preferences: normalized.preferences
						}
					};
				} catch (_e) {
					return null;
				}
			}));
			if (cancelled) return;
			startTransition(() => {
				setSenderProfiles((prev) => {
					const next = { ...prev };
					resolved.forEach((entry) => {
						if (entry?.profile) next[entry.senderId] = entry.profile;
					});
					return next;
				});
			});
		};
		hydrateSenders();
		return () => {
			cancelled = true;
		};
	}, [messageSenderIds, senderProfiles]);
	(0, import_react.useEffect)(() => {
		if (!messageSenderIds.length) return () => {};
		return subscribeIdentityCache((identity) => {
			if (!identity?.userId || !messageSenderIds.includes(identity.userId)) return;
			startTransition(() => {
				setSenderProfiles((prev) => ({
					...prev,
					[identity.userId]: {
						displayName: identity.displayName,
						username: identity.username,
						avatar: identity.avatar,
						avatarUrl: identity.avatar && identity.avatar.startsWith("http") ? identity.avatar : prev[identity.userId]?.avatarUrl || null,
						preferences: identity.preferences
					}
				}));
			});
		});
	}, [messageSenderIds]);
	(0, import_react.useEffect)(() => {
		if (conversation?.type !== "group" || !Array.isArray(conversation?.participants)) return;
		let cancelled = false;
		const participantIds = conversation.participants.filter((participantId) => typeof participantId === "string" && participantId.trim().length > 0);
		const missingIds = Array.from(new Set(participantIds)).filter((participantId) => participantId !== user?.$id).filter((participantId) => !senderProfiles[participantId] && !getCachedIdentityById(participantId));
		if (!missingIds.length) return;
		const hydrateMembers = async () => {
			const resolved = await Promise.all(missingIds.map(async (participantId) => {
				try {
					const profile = await UsersService.getProfileById(participantId);
					if (!profile) return null;
					let avatarUrl = null;
					if (profile?.avatar?.startsWith?.("http")) avatarUrl = profile.avatar;
					else if (profile?.avatar) try {
						avatarUrl = await fetchProfilePreview(profile.avatar, 48, 48);
					} catch (_e) {}
					const normalized = seedIdentityCache({
						...profile,
						avatar: profile?.avatar || avatarUrl
					});
					if (!normalized) return null;
					return {
						participantId,
						profile: {
							displayName: normalized.displayName,
							username: normalized.username,
							avatar: normalized.avatar,
							avatarUrl,
							preferences: normalized.preferences
						}
					};
				} catch (_e) {
					return null;
				}
			}));
			if (cancelled) return;
			startTransition(() => {
				startTransition(() => {
					setSenderProfiles((prev) => {
						const next = { ...prev };
						resolved.forEach((entry) => {
							if (entry?.profile) next[entry.participantId] = entry.profile;
						});
						return next;
					});
				});
			});
		};
		hydrateMembers();
		return () => {
			cancelled = true;
		};
	}, [
		conversation?.participants,
		conversation?.type,
		senderProfiles,
		user?.$id
	]);
	(0, import_react.useEffect)(() => {
		if (!conversationId || !user?.$id) return;
		if (initialLoadRef.current !== conversationId) {
			initialLoadRef.current = conversationId;
			loadMessages();
			loadConversation();
		}
		let unsub;
		const initRealtime = async () => {
			unsub = await realtime.subscribe([`databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.MESSAGES}.rows`], async (response) => {
				const payload = response.payload;
				if (payload.conversationId === conversationId) {
					if (response.events.some((e) => e.includes(".create")) || response.events.some((e) => e.includes(".update"))) {
						if (user && payload.senderId === user.$id && response.events.some((e) => e.includes(".create"))) return;
						if (ecosystemSecurity.status.isUnlocked && payload.type === MessagesType.TEXT && payload.content && payload.content.length > 40) try {
							const convKey = ecosystemSecurity.getConversationKey(conversationId);
							const decrypt = async (val) => {
								if (convKey) return await ecosystemSecurity.decryptWithKey(val, convKey);
								return await ecosystemSecurity.decrypt(val);
							};
							if (payload.type === MessagesType.TEXT && payload.content && payload.content.length > 40) payload.content = await decrypt(payload.content);
						} catch (_e) {}
						if (response.events.some((e) => e.includes(".create"))) {
							startTransition(() => {
								setMessages((prev) => {
									const withoutOptimistic = prev.filter((m) => {
										if (m.$id && String(m.$id).startsWith("optimistic-")) return m.content !== payload.content;
										return true;
									});
									if (withoutOptimistic.some((m) => m.$id === payload.$id)) return withoutOptimistic;
									return [...withoutOptimistic, payload];
								});
							});
							setTimeout(() => scrollToBottom(), 100);
						} else startTransition(() => {
							setMessages((prev) => prev.map((m) => m.$id === payload.$id ? payload : m));
						});
					} else if (response.events.some((e) => e.includes(".delete"))) startTransition(() => {
						setMessages((prev) => prev.filter((m) => m.$id === payload.$id));
					});
				}
			});
		};
		initRealtime();
		return () => {
			if (typeof unsub === "function") unsub();
			else if (unsub?.unsubscribe) unsub.unsubscribe();
		};
	}, [
		conversationId,
		user,
		user?.$id,
		loadConversation,
		loadMessages
	]);
	(0, import_react.useEffect)(() => {
		if (conversation?.isEncrypted && !isUnlocked && !unlockModalOpen) setUnlockModalOpen(true);
	}, [
		conversation?.isEncrypted,
		isUnlocked,
		unlockModalOpen
	]);
	(0, import_react.useEffect)(() => {
		if (!conversationId || !user?.$id) return;
		let unsub;
		const initRealtime = async () => {
			unsub = await realtime.subscribe([`databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.MESSAGE_REACTIONS}.rows`], async (response) => {
				const payload = response.payload;
				if (payload?.conversationId !== conversationId) return;
				if (response.events.some((event) => event.includes(".delete"))) {
					if (!payload.messageId) return;
					startTransition(() => {
						setMessageReactions((prev) => {
							const next = { ...prev };
							const filtered = (next[payload.messageId || ""] || []).filter((reaction) => reaction.$id !== payload.$id);
							if (filtered.length) next[payload.messageId || ""] = filtered;
							else delete next[payload.messageId || ""];
							return next;
						});
					});
					return;
				}
				if (!payload.messageId || !payload.$id) return;
				startTransition(() => {
					setMessageReactions((prev) => {
						const next = { ...prev };
						const filtered = (next[payload.messageId] || []).filter((reaction) => reaction.$id !== payload.$id);
						next[payload.messageId] = [...filtered, payload];
						return next;
					});
				});
			});
		};
		initRealtime();
		return () => {
			if (typeof unsub === "function") unsub();
			else if (unsub?.unsubscribe) unsub.unsubscribe();
		};
	}, [conversationId, user?.$id]);
	const handleClearChat = async (mode) => {
		if (!user || !confirm(`Are you sure you want to wipe this chat ${mode === "me" ? "for yourself" : "for everyone"}?`)) return;
		setLoading(true);
		try {
			if (isSelf) await ChatService.nuclearWipe(conversationId);
			else {
				if (mode === "everyone") await ChatService.wipeMyFootprint(conversationId, user.$id);
				await ChatService.clearChatForMe(conversationId, user.$id);
			}
			await loadMessages();
			setAnchorEl(null);
		} catch (e) {
			console.error("Wipe failed:", e);
		} finally {
			setLoading(false);
		}
	};
	const handleExport = async () => {
		const data = messages.map((m) => ({
			sender: m.senderId === user?.$id ? "Me" : "Partner",
			time: m.$createdAt,
			content: m.content,
			type: m.type
		}));
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `chat_export_${conversationId}.json`;
		a.click();
		setAnchorEl(null);
	};
	const _handleDeleteMessage = async (messageId, _everyone) => {
		try {
			if (_everyone) await ChatService.deleteMessage(messageId);
			else alert("Individual 'Delete for Me' is coming soon. Use 'Clear Chat' for now.");
		} catch (e) {
			console.error("Delete failed:", e);
		}
	};
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	const handleMessageContextMenu = (e, msg) => {
		e.preventDefault();
		setMessageAnchorEl({
			el: e.currentTarget,
			msg
		});
	};
	const handleReply = (msg) => {
		setReplyingTo(msg);
		setMessageAnchorEl(null);
		const input = document.querySelector("textarea");
		if (input) input.focus();
	};
	const handleCopy = (content) => {
		navigator.clipboard.writeText(content);
		zt.success("Copied to clipboard");
		setMessageAnchorEl(null);
	};
	const handleReact = async (emoji) => {
		if (!messageAnchorEl?.msg || !user) return;
		try {
			await ChatService.reactToMessage(conversationId, messageAnchorEl.msg.$id, emoji);
			zt.success("Reaction sent");
		} catch (error) {
			console.error("Reaction failed:", error);
			zt.error("Failed to react");
		} finally {
			setMessageAnchorEl(null);
		}
	};
	const handleSend = async (text) => {
		if (!text.trim() && !attachment || !user || sending) return false;
		if (conversation?.isEncrypted && !isUnlocked) {
			setUnlockModalOpen(true);
			return false;
		}
		const file = attachment;
		const replyToId = replyingTo?.$id;
		const previousReplyingTo = replyingTo;
		setAttachment(null);
		setReplyingTo(null);
		setSending(true);
		let type = MessagesType.TEXT;
		const initialAttachments = [];
		if (file) if (file.type.startsWith("image/")) type = MessagesType.IMAGE;
		else if (file.type.startsWith("video/")) type = MessagesType.VIDEO;
		else if (file.type.startsWith("audio/")) type = MessagesType.AUDIO;
		else type = MessagesType.FILE;
		const optimisticId = `optimistic-${Date.now()}`;
		const optimisticMessage = {
			$id: optimisticId,
			conversationId,
			senderId: user.$id,
			content: text,
			type,
			attachments: initialAttachments,
			$createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "sending"
		};
		startTransition(() => {
			setMessages((prev) => [...prev, optimisticMessage]);
		});
		setTimeout(() => scrollToBottom(), 50);
		await new Promise((resolve) => requestAnimationFrame(() => resolve()));
		if (type === MessagesType.TEXT && ecosystemSecurity.status.isUnlocked) {
			const convKey = ecosystemSecurity.getConversationKey(conversationId);
			if (convKey) await ecosystemSecurity.encryptWithKey(text, convKey);
			else await ecosystemSecurity.encrypt(text);
		}
		try {
			let actualAttachments = initialAttachments;
			if (file) {
				const bucketId = StorageService.getBucketForType(type);
				actualAttachments = [(await StorageService.uploadFile(file, bucketId)).$id];
			}
			const messageForState = {
				...await ChatService.sendMessage(conversationId, user.$id, text, type, actualAttachments, replyToId),
				content: text
			};
			startTransition(() => {
				setMessages((prev) => prev.map((m) => m.$id === optimisticId ? messageForState : m));
			});
		} catch (error) {
			console.error("Failed to send message:", error);
			startTransition(() => {
				setMessages((prev) => prev.map((m) => m.$id === optimisticId ? {
					...m,
					status: "error"
				} : m));
			});
			setAttachment(file);
			setReplyingTo(previousReplyingTo);
			return false;
		} finally {
			setSending(false);
		}
		return true;
	};
	const handleCall = (type = "audio") => {
		router.push(`/call/${conversationId}?caller=true&type=${type}`);
	};
	const handleAttachClose = () => {
		setAnchorEl(null);
	};
	const handleFileSelect = (type) => {
		if (fileInputRef.current) {
			fileInputRef.current.accept = type;
			fileInputRef.current.click();
		}
		handleAttachClose();
	};
	const onFileChange = (e) => {
		if (e.target.files && e.target.files[0]) setAttachment(e.target.files[0]);
	};
	const toggleRecording = async () => {
		if (isRecording) {
			if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
			setIsRecording(false);
		} else try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			audioChunksRef.current = [];
			mediaRecorder.ondataavailable = (e) => {
				if (e.data.size > 0) audioChunksRef.current.push(e.data);
			};
			mediaRecorder.onstop = async () => {
				const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
				const audioFile = new File([audioBlob], `voice_note_${Date.now()}.webm`, { type: "audio/webm" });
				stream.getTracks().forEach((track) => track.stop());
				setSending(true);
				try {
					const uploaded = await StorageService.uploadFile(audioFile, StorageService.getBucketForType("audio"));
					await ChatService.sendMessage(conversationId, user?.$id || "", "Voice Message", "audio", [uploaded.$id]);
				} catch (error) {
					console.error("Failed to send voice note:", error);
				} finally {
					setSending(false);
				}
			};
			mediaRecorder.start();
			setIsRecording(true);
		} catch (err) {
			console.error("Failed to start recording:", err);
			alert("Microphone access is required for voice notes.");
		}
	};
	const handleNoteSelect = async (note) => {
		if (!user) return;
		setSending(true);
		try {
			const metadata = buildNoteAttachmentMetadata(note);
			await ChatService.sendMessage(conversationId, user.$id, note.title || "Attached Note", "attachment", [note.$id], void 0, metadata);
		} catch (error) {
			console.error("Failed to send note:", error);
			zt.error("Failed to attach note");
		} finally {
			setSending(false);
		}
	};
	const handleSecretSelect = async (item, type) => {
		if (!user) return;
		setSending(true);
		try {
			if (type === "totp") {
				const metadata = {
					type: "attachment",
					entity: "vault",
					subType: "totp",
					referenceId: item.$id,
					payload: {
						label: item.issuer || item.name || "TOTP",
						currentCode: item.currentCode,
						nextCode: item.nextCode,
						expiry: new Date(Date.now() + 3e4).toISOString()
					}
				};
				await ChatService.sendMessage(conversationId, user.$id, `TOTP: ${item.issuer || "Unknown"}`, "attachment", [item.$id], void 0, metadata);
			} else {
				const metadata = {
					type: "attachment",
					entity: "vault",
					subType: "password",
					referenceId: item.$id,
					payload: {
						label: item.name || "Shared Password",
						preview: "••••••••"
					}
				};
				await ChatService.sendMessage(conversationId, user.$id, `Secret: ${item.name || "Unnamed"}`, "attachment", [item.$id], void 0, metadata);
			}
		} catch (error) {
			console.error("Failed to send secret/totp:", error);
			zt.error("Failed to attach secret");
		} finally {
			setSending(false);
		}
	};
	const AttachmentCard = ({ metadata }) => {
		const [showTOTP, setShowTOTP] = (0, import_react.useState)(false);
		const [isExpired, setIsExpired] = (0, import_react.useState)(false);
		const [timeLeft, setTimeLeft] = (0, import_react.useState)(30);
		const [isRevealingSecret, setIsRevealingSecret] = (0, import_react.useState)(false);
		const revealTimerRef = (0, import_react.useRef)(null);
		const [currentCode, setCurrentCode] = (0, import_react.useState)(metadata.payload.currentCode || "000 000");
		(0, import_react.useEffect)(() => {
			if (metadata.subType === "totp" && metadata.payload.expiry) {
				const timer = setInterval(() => {
					const diff = Math.max(0, Math.floor((new Date(metadata.payload.expiry).getTime() - Date.now()) / 1e3));
					setTimeLeft(diff);
					if (diff <= 0) {
						setIsExpired(true);
						setCurrentCode(metadata.payload.nextCode || "EXPIRED");
						clearInterval(timer);
					}
				}, 1e3);
				return () => clearInterval(timer);
			}
		}, [metadata]);
		const getEntityIcon = () => {
			switch (metadata.entity) {
				case "vault": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
					size: 18,
					color: "#F59E0B"
				});
				case "note": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
					size: 18,
					color: "#6366F1"
				});
				case "flow": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
					size: 18,
					color: "#10B981"
				});
				default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { size: 18 });
			}
		};
		const getEntityColor = () => {
			switch (metadata.entity) {
				case "vault": return "#F59E0B";
				case "note": return "#6366F1";
				case "flow": return "#10B981";
				default: return "#94A3B8";
			}
		};
		const handleCardAction = () => {
			const domain = process.env.NEXT_PUBLIC_DOMAIN || "kylrix.space";
			switch (metadata.entity) {
				case "note":
					window.open(`https://note.${domain}/n/${metadata.referenceId}`, "_blank");
					break;
				case "vault":
					window.open(`https://vault.${domain}/vault?id=${metadata.referenceId}`, "_blank");
					break;
				case "flow":
					window.open(`https://flow.${domain}/${metadata.subType === "task" ? "tasks" : "forms"}/${metadata.referenceId}`, "_blank");
					break;
			}
		};
		const handleSecretMouseDown = () => {
			if (metadata.subType !== "password") return;
			revealTimerRef.current = setTimeout(() => {
				setIsRevealingSecret(true);
			}, 500);
		};
		const handleSecretMouseUp = () => {
			if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
			setIsRevealingSecret(false);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				mt: 1,
				minWidth: 260,
				maxWidth: 320,
				borderRadius: "16px",
				overflow: "hidden",
				border: "1px solid rgba(255, 255, 255, 0.12)",
				background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
				boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
				position: "relative",
				"&::before": {
					content: "\"\"",
					position: "absolute",
					inset: 0,
					borderRadius: "16px",
					padding: "1px",
					background: metadata.entity === "vault" ? "linear-gradient(135deg, rgba(245, 158, 11, 0.3), transparent)" : "linear-gradient(135deg, rgba(99, 102, 241, 0.3), transparent)",
					mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
					WebkitMaskComposite: "xor",
					maskComposite: "exclude",
					pointerEvents: "none"
				}
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					p: 1.5,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					spacing: 1,
					alignItems: "center",
					children: [getEntityIcon(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
						variant: "caption",
						sx: {
							fontWeight: 800,
							textTransform: "uppercase",
							letterSpacing: 1,
							opacity: .8,
							color: "text.primary",
							fontFamily: "var(--font-clash)"
						},
						children: [
							metadata.entity,
							" • ",
							metadata.subType
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					spacing: .5,
					alignItems: "center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							px: .8,
							py: .2,
							borderRadius: "4px",
							bgcolor: `${alpha(getEntityColor(), .1)}`,
							border: `1px solid ${alpha(getEntityColor(), .2)}`,
							display: "flex",
							alignItems: "center",
							gap: .5
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
							size: 10,
							color: getEntityColor()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							sx: {
								fontSize: "8px",
								fontWeight: 900,
								color: getEntityColor(),
								textTransform: "uppercase"
							},
							children: "Verified"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						size: "small",
						onClick: handleCardAction,
						sx: {
							opacity: .5,
							"&:hover": {
								opacity: 1,
								bgcolor: "rgba(255,255,255,0.05)"
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: { p: 2 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "subtitle2",
					sx: {
						fontWeight: 700,
						mb: 1,
						color: "text.primary",
						fontFamily: "var(--font-satoshi)"
					},
					children: metadata.payload.label
				}), metadata.entity === "flow" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							p: 1.5,
							bgcolor: "rgba(16, 185, 129, 0.05)",
							borderRadius: "12px",
							border: "1px solid rgba(16, 185, 129, 0.1)",
							display: "flex",
							alignItems: "center",
							gap: 1.5
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								width: 24,
								height: 24,
								borderRadius: "6px",
								border: "2px solid #10B981",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#10B981"
							},
							children: metadata.subType === "task" && metadata.payload.isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								size: 16,
								strokeWidth: 3
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								fontWeight: 600,
								color: "text.primary"
							},
							children: metadata.subType === "task" ? "Task Assignment" : "Dynamic Form"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								opacity: .5,
								display: "block"
							},
							children: metadata.subType === "task" ? metadata.payload.isCompleted ? "Completed" : "Pending" : "Input Required"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						fullWidth: true,
						size: "small",
						onClick: handleCardAction,
						sx: {
							mt: 1,
							borderRadius: "8px",
							textTransform: "none",
							fontWeight: 700,
							bgcolor: "rgba(16, 185, 129, 0.1)",
							color: "#10B981",
							"&:hover": { bgcolor: "rgba(16, 185, 129, 0.2)" }
						},
						children: metadata.subType === "task" ? "View Task" : "Open Form"
					})]
				}) : metadata.subType === "totp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							bgcolor: "rgba(0,0,0,0.4)",
							borderRadius: "12px",
							p: 2,
							textAlign: "center",
							border: "1px solid rgba(245, 158, 11, 0.2)",
							position: "relative",
							overflow: "hidden"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "h5",
								sx: {
									fontFamily: "var(--font-mono)",
									letterSpacing: 4,
									fontWeight: 900,
									color: isExpired ? "#ff4d4d" : "#F59E0B",
									filter: showTOTP ? "none" : "blur(8px)",
									transition: "filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
									textShadow: isExpired ? "none" : "0 0 12px rgba(245, 158, 11, 0.3)"
								},
								children: currentCode
							}),
							!showTOTP && !isExpired && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "small",
								onClick: () => setShowTOTP(true),
								sx: {
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									fontWeight: 900,
									color: "#F59E0B",
									bgcolor: "rgba(245, 158, 11, 0.1)",
									px: 2,
									borderRadius: "8px",
									"&:hover": { bgcolor: "rgba(245, 158, 11, 0.2)" }
								},
								children: "Reveal Code"
							}),
							isExpired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
								variant: "caption",
								sx: {
									color: "#ff4d4d",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: .5,
									mt: .5,
									fontWeight: 700
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
									size: 10,
									className: "animate-spin"
								}), " PULSE ROTATED"]
							})
						]
					}), !isExpired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							display: "flex",
							alignItems: "center",
							gap: 1,
							mt: 1.5,
							px: .5
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								flex: 1,
								height: 3,
								bgcolor: "rgba(255,255,255,0.05)",
								borderRadius: 1,
								overflow: "hidden"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
								width: `${timeLeft / 30 * 100}%`,
								height: "100%",
								bgcolor: timeLeft < 10 ? "#ff4d4d" : "#F59E0B",
								transition: "width 1s linear, background-color 0.3s ease",
								boxShadow: timeLeft < 10 ? "0 0 8px #ff4d4d" : "none"
							} })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
							variant: "caption",
							sx: {
								fontFamily: "var(--font-mono)",
								opacity: .5,
								fontWeight: 700
							},
							children: [timeLeft, "s"]
						})]
					})]
				}) : metadata.subType === "password" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					onMouseDown: handleSecretMouseDown,
					onMouseUp: handleSecretMouseUp,
					onMouseLeave: handleSecretMouseUp,
					onTouchStart: handleSecretMouseDown,
					onTouchEnd: handleSecretMouseUp,
					sx: {
						mt: 1,
						bgcolor: "rgba(0,0,0,0.3)",
						borderRadius: "12px",
						p: 1.5,
						border: "1px solid rgba(255, 255, 255, 0.05)",
						cursor: "pointer",
						userSelect: "none",
						position: "relative",
						transition: "all 0.2s ease",
						"&:active": {
							transform: "scale(0.98)",
							bgcolor: "rgba(0,0,0,0.5)"
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							fontFamily: "var(--font-mono)",
							letterSpacing: isRevealingSecret ? 1 : 4,
							opacity: isRevealingSecret ? 1 : .4,
							color: isRevealingSecret ? "text.primary" : "text.secondary",
							textAlign: "center",
							transition: "all 0.2s ease"
						},
						children: isRevealingSecret ? metadata.payload.preview || "SECRET_KEY" : "••••••••"
					}), !isRevealingSecret && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							display: "block",
							textAlign: "center",
							mt: .5,
							opacity: .3,
							fontSize: "9px",
							fontWeight: 800
						},
						children: "HOLD TO REVEAL"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						mt: 1,
						p: 1.5,
						bgcolor: "rgba(255,255,255,0.02)",
						borderRadius: "12px",
						border: "1px solid rgba(255,255,255,0.05)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							opacity: .7,
							fontSize: "0.85rem",
							lineHeight: 1.5,
							fontFamily: "var(--font-satoshi)"
						},
						children: metadata.payload.preview || "No preview available"
					})
				})]
			})]
		});
	};
	const renderMessageContent = (msg) => {
		if (msg.metadata?.type === "attachment") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttachmentCard, { metadata: msg.metadata });
		const isLikelyEncrypted = (val) => {
			if (!val) return false;
			return val.length > 40 && !val.includes(" ");
		};
		if (msg.type === MessagesType.TEXT && !isUnlocked && isLikelyEncrypted(msg.content)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1,
				py: .5,
				opacity: .8
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
				size: 14,
				strokeWidth: 2.5
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				variant: "body2",
				sx: {
					fontStyle: "italic",
					fontWeight: 500
				},
				children: "Encrypted message"
			})]
		});
		const fileId = msg.attachments && msg.attachments[0];
		if (!fileId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormattedText, { text: msg.content });
		const bucketId = StorageService.getBucketForType(msg.type);
		const viewUrl = StorageService.getFileView(fileId, bucketId);
		const previewUrl = StorageService.getFilePreview(fileId, bucketId, 300, 300);
		switch (msg.type) {
			case "image": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					width: 300,
					height: 300,
					position: "relative",
					borderRadius: 2,
					overflow: "hidden",
					cursor: "pointer"
				},
				onClick: () => window.open(viewUrl, "_blank"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					src: previewUrl,
					alt: "attachment",
					fill: true,
					style: { objectFit: "cover" }
				})
			}), msg.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				variant: "body2",
				sx: { mt: 1 },
				children: msg.content
			})] });
			case "video": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: viewUrl,
				controls: true,
				style: {
					maxWidth: "100%",
					borderRadius: 8
				}
			}), msg.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				variant: "body2",
				sx: { mt: 1 },
				children: msg.content
			})] });
			case "audio": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
					src: viewUrl,
					controls: true,
					style: { height: 40 }
				})
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1,
					p: 1,
					bgcolor: "#161514",
					borderRadius: 1,
					border: "1px solid rgba(255,255,255,0.05)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File$1, {
					size: 18,
					strokeWidth: 1.5
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "body2",
					component: "a",
					href: StorageService.getFileDownload(fileId, bucketId),
					target: "_blank",
					sx: {
						textDecoration: "none",
						color: "inherit"
					},
					children: "Download File"
				})]
			});
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: { p: 2 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			spacing: 1.5,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1.5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					variant: "rounded",
					width: 42,
					height: 42,
					sx: {
						borderRadius: "12px",
						bgcolor: "rgba(255,255,255,0.05)"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: { flex: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						width: "32%",
						sx: { bgcolor: "rgba(255,255,255,0.05)" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						width: "22%",
						sx: { bgcolor: "rgba(255,255,255,0.05)" }
					})]
				})]
			}), [
				1,
				2,
				3,
				4
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				variant: "rounded",
				height: 72,
				sx: {
					borderRadius: 3,
					bgcolor: "rgba(255,255,255,0.05)"
				}
			}, i))]
		})
	});
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuralPattern, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppBar, {
				position: "static",
				color: "transparent",
				elevation: 0,
				sx: {
					borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
					bgcolor: "#161514",
					position: "relative",
					zIndex: 1,
					pt: "env(safe-area-inset-top)",
					boxShadow: "0 1px 0 rgba(0,0,0,0.4)",
					"&::after": {
						content: "\"\"",
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: "1px",
						background: "rgba(255,255,255,0.05)"
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, {
					sx: {
						gap: 1,
						minHeight: "72px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							edge: "start",
							onClick: () => router.back(),
							sx: { color: "text.secondary" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								size: 20,
								strokeWidth: 1.5
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							onClick: (e) => setAnchorEl(e.currentTarget),
							sx: {
								display: "flex",
								alignItems: "center",
								gap: 1.5,
								flex: 1,
								cursor: "pointer",
								"&:hover": { opacity: .8 }
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								src: conversation?.avatarUrl,
								sx: {
									width: 36,
									height: 36,
									bgcolor: conversation?.avatarUrl ? isSelf ? alpha("#6366F1", .1) : alpha("#F59E0B", .1) : "#F59E0B",
									color: conversation?.avatarUrl ? isSelf ? "#6366F1" : "#F59E0B" : "#FFFFFF",
									border: "1px solid rgba(255, 255, 255, 0.05)",
									boxShadow: "0 1px 0 rgba(0,0,0,0.4)"
								},
								children: isSelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
									size: 18,
									color: "#6366F1",
									strokeWidth: 1.5
								}) : conversation?.type === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 20,
									strokeWidth: 1.5
								}) : conversation?.name?.replace(/^@/, "").charAt(0).toUpperCase() || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									size: 20,
									color: "#F59E0B",
									strokeWidth: 1.5
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
								conversation?.type === "direct" && !isSelf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityName, {
									verified: partnerVerification.verified,
									verifiedOn: partnerVerification.verifiedOn,
									sx: {
										fontWeight: 800,
										fontFamily: "var(--font-clash)",
										lineHeight: 1.2,
										color: "text.primary"
									},
									children: conversation?.name || "Loading..."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "subtitle1",
									sx: {
										fontWeight: 800,
										fontFamily: "var(--font-clash)",
										lineHeight: 1.2,
										color: isSelf ? "#6366F1" : "text.primary"
									},
									children: conversation?.name || "Loading..."
								}),
								conversation?.type === "group" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
									variant: "caption",
									sx: {
										color: "text.secondary",
										fontWeight: 600,
										opacity: .65,
										display: "block"
									},
									children: [conversation?.participantCount || conversation?.participants?.length || 0, " members"]
								}),
								!isSelf && conversation?.type === "direct" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "text.secondary",
										fontWeight: 600,
										opacity: .6,
										display: "flex",
										alignItems: "center",
										gap: .5
									},
									children: (() => {
										const otherPresence = presence[conversation.participants.find((p) => p !== user?.$id)];
										if (!otherPresence) return "Offline";
										if (otherPresence.status === "online" && Date.now() - new Date(otherPresence.lastSeen).getTime() < 1e3 * 60 * 5) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
											width: 6,
											height: 6,
											borderRadius: "50%",
											bgcolor: "#6366F1",
											boxShadow: "0 0 8px #6366F1"
										} }), "Online"] });
										return "Offline";
									})()
								}),
								isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "text.secondary",
										fontWeight: 600,
										opacity: .6
									},
									children: "End-to-end encrypted vault"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							spacing: .5,
							children: [!isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: () => handleCall("audio"),
								sx: { color: "text.secondary" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
									size: 20,
									strokeWidth: 1.5
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: () => handleCall("video"),
								sx: { color: "text.secondary" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
									size: 20,
									strokeWidth: 1.5
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: (e) => setAnchorEl(e.currentTarget),
								sx: { color: "text.secondary" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {
									size: 20,
									strokeWidth: 1.5
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, {
				anchorEl,
				open: Boolean(anchorEl),
				onClose: () => setAnchorEl(null),
				PaperProps: { sx: {
					mt: 1,
					borderRadius: "16px",
					bgcolor: "#1F1D1B",
					border: "1px solid rgba(255, 255, 255, 0.08)",
					backgroundImage: "none",
					minWidth: 220
				} },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: handleExport,
						sx: {
							gap: 1.5,
							py: 1.2,
							fontWeight: 600,
							fontSize: "0.85rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File$1, {
							size: 18,
							strokeWidth: 1.5,
							style: { opacity: .7 }
						}), " Export Chat (.json)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: {
						my: 1,
						opacity: .1
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: () => handleClearChat("me"),
						sx: {
							gap: 1.5,
							py: 1.2,
							fontWeight: 600,
							fontSize: "0.85rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							size: 18,
							strokeWidth: 1.5,
							style: { opacity: .7 }
						}), " Clear Chat (For Me)"]
					}),
					!isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: () => handleClearChat("everyone"),
						sx: {
							gap: 1.5,
							py: 1.2,
							fontWeight: 600,
							fontSize: "0.85rem",
							color: "#ff4d4d"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							size: 18,
							strokeWidth: 1.5,
							style: { opacity: .7 }
						}), " Wipe My Footprint"]
					}),
					isSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: () => handleClearChat("everyone"),
						sx: {
							gap: 1.5,
							py: 1.2,
							fontWeight: 600,
							fontSize: "0.85rem",
							color: "#ff4d4d"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							size: 18,
							strokeWidth: 1.5,
							style: { opacity: .7 }
						}), " Nuclear Wipe"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					p: 2,
					display: "flex",
					flexDirection: "column",
					gap: 1.5,
					pb: "calc(16px + env(safe-area-inset-bottom))",
					position: "relative",
					zIndex: 2
				},
				children: [
					!isUnlocked && conversation?.isEncrypted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							p: 2,
							mb: 2,
							bgcolor: "#161514",
							borderRadius: "16px",
							border: "1px solid rgba(255, 255, 255, 0.07)",
							boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.08), 0 0 24px rgba(99, 102, 241, 0.1)",
							textAlign: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								mb: 1.5,
								fontWeight: 600,
								color: "#6366F1"
							},
							children: "This conversation is end-to-end encrypted."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outlined",
							size: "small",
							onClick: () => setUnlockModalOpen(true),
							startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
								size: 16,
								strokeWidth: 1.5
							}),
							sx: {
								borderRadius: "10px",
								fontWeight: 800,
								borderColor: "#6366F1",
								color: "#6366F1",
								"&:hover": {
									borderColor: "#6366F1",
									bgcolor: alpha("#6366F1", .1)
								}
							},
							children: "Unlock Vault to Read"
						})]
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							display: "flex",
							flexDirection: "column",
							gap: 1.25,
							py: 1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							spacing: 1,
							alignItems: "center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								variant: "circular",
								width: 40,
								height: 40,
								sx: { bgcolor: "rgba(255,255,255,0.06)" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
								sx: { flex: 1 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									width: "28%",
									sx: { bgcolor: "rgba(255,255,255,0.06)" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									width: "42%",
									sx: { bgcolor: "rgba(255,255,255,0.06)" }
								})]
							})]
						}), Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							variant: "rounded",
							height: 68,
							sx: {
								borderRadius: "18px",
								bgcolor: "rgba(255,255,255,0.06)"
							}
						}, index))]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [showFirstContactWarning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							p: 1.5,
							mb: 1,
							borderRadius: "16px",
							bgcolor: "#161514",
							border: "1px solid rgba(245, 158, 11, 0.18)",
							boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.06), 0 0 24px rgba(245, 158, 11, 0.08)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								fontSize: "0.85rem",
								lineHeight: 1.5,
								color: "text.primary",
								fontWeight: 600
							},
							children: buildSafetyWarning(conversation?.name || "this contact")
						})
					}), messages.map((msg, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [index === clientReadSegments.firstUnreadIncomingIndex && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							display: "flex",
							justifyContent: "center",
							my: .5
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								px: 1.5,
								py: .4,
								borderRadius: "999px",
								bgcolor: "#161514",
								border: "1px solid rgba(245, 158, 11, 0.18)",
								boxShadow: "0 0 0 1px rgba(245, 158, 11, 0.05), 0 0 18px rgba(245, 158, 11, 0.06)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "caption",
								sx: {
									fontSize: "0.68rem",
									fontWeight: 800,
									letterSpacing: 1,
									textTransform: "uppercase",
									color: "#F59E0B"
								},
								children: "Unread messages"
							})
						})
					}), (() => {
						const isOutgoing = msg.senderId === user?.$id;
						const senderProfile = senderProfiles[msg.senderId] || getCachedIdentityById(msg.senderId);
						const senderVerification = getVerificationState(senderProfile?.preferences || null);
						const senderName = isOutgoing ? "You" : senderProfile?.displayName || senderProfile?.username || (conversation?.type === "direct" ? conversation?.name || "Partner" : `@${String(msg.senderId || "").slice(0, 7)}`);
						const senderAvatarSrc = senderProfiles[msg.senderId]?.avatarUrl || (senderProfile?.avatar?.startsWith?.("http") ? senderProfile.avatar : null);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							id: `msg-${msg.$id}`,
							sx: {
								width: "100%",
								display: "flex",
								justifyContent: isOutgoing ? "flex-end" : "flex-start",
								position: "relative",
								zIndex: 2
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: isOutgoing ? "row-reverse" : "row",
								spacing: 1,
								alignItems: "flex-end",
								sx: {
									width: "100%",
									maxWidth: "80%"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityAvatar, {
									src: senderAvatarSrc || void 0,
									alt: senderName,
									fallback: senderName.slice(0, 1).toUpperCase(),
									size: 30,
									borderRadius: "50%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									sx: {
										display: "flex",
										flexDirection: "column",
										gap: .5,
										minWidth: 0,
										flex: "0 1 auto",
										alignItems: isOutgoing ? "flex-end" : "flex-start"
									},
									children: [
										!isOutgoing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityName, {
											verified: senderVerification.verified,
											verifiedOn: senderVerification.verifiedOn,
											sx: {
												fontSize: "0.72rem",
												fontWeight: 800,
												color: "rgba(255,255,255,0.72)",
												pl: .5
											},
											children: senderName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
											onContextMenu: (e) => handleMessageContextMenu(e, msg),
											sx: {
												p: 1.2,
												px: 1.8,
												width: "fit-content",
												maxWidth: "100%",
												alignSelf: isOutgoing ? "flex-end" : "flex-start",
												borderRadius: isOutgoing ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
												bgcolor: "#161514",
												backgroundImage: isOutgoing ? "linear-gradient(180deg, rgba(99, 102, 241, 0.08) 0%, rgba(255,255,255,0.02) 34%, rgba(0,0,0,0.16) 100%)" : "linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, rgba(255,255,255,0.015) 34%, rgba(0,0,0,0.18) 100%)",
												border: "1px solid",
												borderColor: isOutgoing ? "rgba(99, 102, 241, 0.45)" : "rgba(245, 158, 11, 0.35)",
												color: "text.primary",
												boxShadow: isOutgoing ? "0 0 0 1px rgba(99, 102, 241, 0.14), 0 0 26px rgba(99, 102, 241, 0.12), 0 16px 34px rgba(0,0,0,0.42)" : "0 0 0 1px rgba(245, 158, 11, 0.12), 0 0 26px rgba(245, 158, 11, 0.14), 0 16px 34px rgba(0,0,0,0.42)",
												position: "relative",
												zIndex: 2,
												"&::after": {
													content: "\"\"",
													position: "absolute",
													top: 0,
													left: 0,
													right: 0,
													height: "1px",
													background: isOutgoing ? "rgba(99, 102, 241, 0.1)" : "rgba(245, 158, 11, 0.1)",
													borderRadius: isOutgoing ? "20px 20px 4px 20px" : "20px 20px 20px 4px"
												}
											},
											children: [msg.replyTo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
												onClick: () => {
													const el = document.getElementById(`msg-${msg.replyTo}`);
													if (el) el.scrollIntoView({
														behavior: "smooth",
														block: "center"
													});
												},
												sx: {
													mb: 1,
													p: 1,
													bgcolor: "#161514",
													borderRadius: "8px",
													borderLeft: "3px solid",
													borderColor: "primary.main",
													cursor: "pointer",
													opacity: .8,
													boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
													"&:hover": {
														opacity: 1,
														bgcolor: "#161514"
													}
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													variant: "caption",
													sx: {
														fontWeight: 800,
														color: "primary.main",
														display: "block",
														mb: .5
													},
													children: messages.find((m) => m.$id === msg.replyTo)?.senderId === user?.$id ? "You" : conversation?.name || "Partner"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													variant: "caption",
													sx: {
														display: "-webkit-box",
														WebkitLineClamp: 2,
														WebkitBoxOrient: "vertical",
														overflow: "hidden",
														fontSize: "0.75rem",
														lineHeight: 1.2
													},
													children: messages.find((m) => m.$id === msg.replyTo)?.content || "Original message"
												})]
											}), renderMessageContent(msg)]
										}),
										(() => {
											const reactionGroups = sortReactionGroups(reactionsByMessageId[msg.$id] || [], user?.$id).slice(0, 3);
											if (!reactionGroups.length) return null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
												sx: {
													display: "flex",
													flexWrap: "wrap",
													gap: .75,
													alignSelf: isOutgoing ? "flex-end" : "flex-start",
													maxWidth: "100%",
													mt: .5,
													px: .5
												},
												children: reactionGroups.map((reaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
													component: "button",
													type: "button",
													onClick: (e) => openReactionPopover(e, msg.$id),
													sx: {
														p: 0,
														m: 0,
														border: 0,
														background: "transparent",
														color: "inherit",
														cursor: "pointer",
														fontSize: "1rem",
														lineHeight: 1,
														opacity: reaction.reactedBySelf ? 1 : .95,
														"&:hover": {
															opacity: 1,
															transform: "translateY(-1px)"
														}
													},
													children: reaction.emoji
												}, reaction.emoji))
											});
										})(),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
											sx: {
												display: "flex",
												alignItems: "center",
												gap: .5,
												alignSelf: isOutgoing ? "flex-end" : "flex-start",
												px: .5,
												position: "relative",
												zIndex: 2
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
												variant: "caption",
												sx: {
													fontSize: "0.65rem",
													opacity: 1,
													color: "rgba(255,255,255,0.72)",
													fontWeight: 700
												},
												children: format(new Date(msg.$createdAt || Date.now()), "h:mm a")
											}), isOutgoing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
												sx: {
													display: "flex",
													alignItems: "center"
												},
												children: String(msg.$id).startsWith("optimistic-") || msg.status === "sending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
													sx: {
														opacity: 1,
														display: "flex",
														color: "rgba(255,255,255,0.72)"
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
														size: 11,
														strokeWidth: 2.5
													})
												}) : msg.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													variant: "caption",
													sx: {
														color: "#ff4d4d",
														fontSize: "10px",
														opacity: 1
													},
													children: "Failed"
												}) : getMessageTimestamp(msg) <= clientReadSegments.outgoingReadAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, {
													size: 13,
													color: "var(--color-primary)",
													strokeWidth: 2.5,
													style: { opacity: 1 }
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													size: 13,
													strokeWidth: 2.5,
													style: {
														opacity: 1,
														color: "rgba(255,255,255,0.72)"
													}
												})
											})]
										})
									]
								})]
							})
						});
					})()] }, msg.$id))] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover, {
				open: Boolean(reactionPopoverAnchorEl && reactionPopoverMessageId),
				anchorEl: reactionPopoverAnchorEl,
				onClose: closeReactionPopover,
				anchorOrigin: {
					vertical: "top",
					horizontal: "center"
				},
				transformOrigin: {
					vertical: "bottom",
					horizontal: "center"
				},
				PaperProps: { sx: {
					mt: 1,
					minWidth: 240,
					maxWidth: 320,
					borderRadius: "16px",
					bgcolor: "#1F1D1B",
					border: "1px solid rgba(255, 255, 255, 0.08)",
					backgroundImage: "none",
					p: 1.5
				} },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					spacing: 1,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "subtitle2",
							sx: { fontWeight: 800 },
							children: "Reactions"
						}),
						reactionPopoverGroups.length ? reactionPopoverGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								display: "flex",
								flexDirection: "column",
								gap: .5
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								component: "div",
								sx: {
									fontSize: "1rem",
									lineHeight: 1
								},
								children: group.emoji
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
								spacing: .35,
								children: group.actors.map((actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: {
										fontSize: "0.82rem",
										color: actor.isSelf ? "#F59E0B" : "text.secondary",
										fontWeight: actor.isSelf ? 700 : 500
									},
									children: actor.label
								}, `${group.emoji}-${actor.userId}`))
							})]
						}, group.emoji)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								color: "text.secondary",
								fontSize: "0.82rem"
							},
							children: "No reactions yet."
						}),
						reactionPopoverMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								color: "text.secondary",
								fontSize: "0.7rem",
								lineHeight: 1.4
							},
							children: String(reactionPopoverMessage.content || "").slice(0, 96)
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					p: 2,
					pb: isMobile ? 4 : 2,
					bgcolor: "transparent",
					position: "relative",
					zIndex: 2
				},
				children: [replyingTo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						mb: 1,
						p: 1.5,
						bgcolor: "rgba(255, 255, 255, 0.03)",
						borderLeft: "4px solid",
						borderColor: "primary.main",
						borderRadius: "12px 12px 0 0",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						animation: "slideUp 0.2s ease"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							flex: 1,
							minWidth: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
							variant: "caption",
							sx: {
								fontWeight: 800,
								color: "primary.main",
								display: "block"
							},
							children: ["Replying to ", replyingTo.senderId === user?.$id ? "yourself" : conversation?.name || "Partner"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							noWrap: true,
							sx: {
								opacity: .6,
								fontSize: "0.85rem"
							},
							children: replyingTo.content
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						size: "small",
						onClick: () => setReplyingTo(null),
						sx: {
							ml: 1,
							opacity: .5
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					elevation: 0,
					sx: {
						p: .5,
						display: "flex",
						alignItems: "center",
						gap: .75,
						borderRadius: replyingTo ? "0 0 24px 24px" : "24px",
						bgcolor: "#161514",
						border: "1px solid rgba(255, 255, 255, 0.08)",
						position: "relative",
						zIndex: 2,
						"&:focus-within": {
							borderColor: "primary.main",
							bgcolor: "#161514"
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							hidden: true,
							ref: fileInputRef,
							onChange: onFileChange
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, {
							anchorEl: attachAnchorEl,
							open: Boolean(attachAnchorEl),
							onClose: () => setAttachAnchorEl(null),
							anchorOrigin: {
								vertical: "top",
								horizontal: "left"
							},
							transformOrigin: {
								vertical: "bottom",
								horizontal: "left"
							},
							PaperProps: { sx: {
								mb: 1,
								borderRadius: "16px",
								bgcolor: "#1F1D1B",
								border: "1px solid rgba(255, 255, 255, 0.08)",
								backgroundImage: "none",
								minWidth: 200
							} },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
									onClick: () => {
										handleFileSelect("*");
										setAttachAnchorEl(null);
									},
									sx: {
										gap: 1.5,
										py: 1.2,
										fontWeight: 600,
										fontSize: "0.85rem"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File$1, {
										size: 18,
										strokeWidth: 1.5,
										style: { opacity: .7 }
									}), " Upload File"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
									onClick: () => {
										setNoteModalOpen(true);
										setAttachAnchorEl(null);
									},
									sx: {
										gap: 1.5,
										py: 1.2,
										fontWeight: 600,
										fontSize: "0.85rem"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										size: 18,
										strokeWidth: 1.5,
										style: { opacity: .7 }
									}), " Attach Note"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
									onClick: () => {
										setSecretModalOpen(true);
										setAttachAnchorEl(null);
									},
									sx: {
										gap: 1.5,
										py: 1.2,
										fontWeight: 600,
										fontSize: "0.85rem"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
										size: 18,
										strokeWidth: 1.5,
										style: { opacity: .7 }
									}), " Attach Secret (Keep)"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								position: "sticky",
								bottom: 0,
								pt: 1.5,
								pb: "calc(12px + env(safe-area-inset-bottom))",
								bgcolor: "#161514",
								zIndex: 2
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatDraftInput, {
								attachment,
								sending,
								isRecording,
								attachmentDisabled: !isProPlan,
								enableMentions: conversation?.type === "group",
								mentionTargets: groupMentionTargets,
								onAttach: (e) => setAttachAnchorEl(e.currentTarget),
								onUpgradeRequested: () => showUpgradeIsland("attach files/images/videos"),
								onSend: handleSend,
								onToggleRecording: toggleRecording
							}, conversationId)
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteSelectorModal, {
				open: noteModalOpen,
				onClose: () => setNoteModalOpen(false),
				onSelect: handleNoteSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecretSelectorModal, {
				open: secretModalOpen,
				onClose: () => setSecretModalOpen(false),
				onSelect: handleSecretSelect,
				isSelf: isSelf || false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SudoModal, {
				isOpen: unlockModalOpen,
				onCancel: () => setUnlockModalOpen(false),
				onSuccess: () => {
					setUnlockModalOpen(false);
					setIsUnlocked(true);
					loadMessages();
					loadConversation();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, {
				open: Boolean(messageAnchorEl),
				anchorEl: messageAnchorEl?.el,
				onClose: () => setMessageAnchorEl(null),
				PaperProps: { sx: {
					borderRadius: "12px",
					bgcolor: "#1F1D1B",
					border: "1px solid rgba(255, 255, 255, 0.08)",
					minWidth: 160
				} },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: () => handleReply(messageAnchorEl.msg),
						sx: {
							gap: 1.5,
							py: 1,
							fontSize: "0.85rem",
							fontWeight: 600
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reply, { size: 16 }), " Reply"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: () => handleCopy(messageAnchorEl.msg.content),
						sx: {
							gap: 1.5,
							py: 1,
							fontSize: "0.85rem",
							fontWeight: 600
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 }), " Copy Text"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							px: 1,
							py: .75,
							opacity: .6
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								fontSize: "0.68rem",
								fontWeight: 800,
								textTransform: "uppercase",
								letterSpacing: 1
							},
							children: "React"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
						onClick: () => handleReact("👍"),
						sx: {
							gap: 1.5,
							py: 1,
							fontSize: "0.85rem",
							fontWeight: 600
						},
						children: "👍 Like"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
						onClick: () => handleReact("❤️"),
						sx: {
							gap: 1.5,
							py: 1,
							fontSize: "0.85rem",
							fontWeight: 600
						},
						children: "❤️ Love"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
						onClick: () => handleReact("😂"),
						sx: {
							gap: 1.5,
							py: 1,
							fontSize: "0.85rem",
							fontWeight: 600
						},
						children: "😂 Laugh"
					}),
					messageAnchorEl?.msg.senderId === user?.$id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: () => {
							_handleDeleteMessage(messageAnchorEl.msg.$id, true);
							setMessageAnchorEl(null);
						},
						sx: {
							gap: 1.5,
							py: 1,
							fontSize: "0.85rem",
							fontWeight: 600,
							color: "#ff4d4d"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 }), " Delete"]
					})
				]
			})
		]
	});
};
function ChatPage() {
	const conversationId = useParams$1().id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWindow, { conversationId }) });
}
var SplitComponent = ChatPage;
//#endregion
export { SplitComponent as component };
