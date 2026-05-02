import { o as __toESM } from "../_runtime.mjs";
import { i as getCachedIdentityByUsername, n as UsersService, o as seedIdentityCache, r as getCachedIdentityById } from "./users-vRrLGFai.mjs";
import { n as ecosystemSecurity } from "./security-DTzL0999.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { H as useTheme, T as Search_default, c as Person_default, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { A as DialogActions, B as Box, H as Avatar, K as Typography, O as DialogTitle, P as Checkbox, X as Paper, Y as CircularProgress, b as ListItemButton, c as SpeedDialIcon, d as SpeedDial, f as Skeleton, g as ListItemText, j as Dialog, k as DialogContent, l as SpeedDialAction, n as TextField, s as Stack, t as useMediaQuery, v as ListItemAvatar, x as List, y as ListItem, z as Button } from "../_libs/@mui/material+[...].mjs";
import { c as useSearchParams, i as useAuth, s as useRouter, t as ChatService } from "./chat-GLmU6cBO.mjs";
import { A as Plus, B as MessageCircle, j as Phone, n as X, o as Users } from "../_libs/lucide-react.mjs";
import { r as zt } from "../_libs/react-hot-toast.mjs";
import { _ as fetchProfilePreview, k as useSudo, s as KeychainService } from "./DynamicIsland-DPFhB0ig.mjs";
import { n as ChatList, t as AppShell } from "./AppShell-JgOEZgrs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chats-BOPClfHv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SearchResultAvatar = ({ u }) => {
	const cachedById = getCachedIdentityById(u.userId || u.$id);
	const cachedByUsername = getCachedIdentityByUsername(u.username);
	const avatar = u.avatar || cachedById?.avatar || cachedByUsername?.avatar;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		src: avatar || void 0,
		sx: {
			bgcolor: "rgba(255, 255, 255, 0.05)",
			border: "1px solid rgba(255, 255, 255, 0.1)",
			width: 44,
			height: 44
		},
		children: !avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Person_default, { sx: { color: "rgba(255, 255, 255, 0.3)" } })
	});
};
var UserSearch = () => {
	const [query, setQuery] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { user } = useAuth();
	const router = useRouter();
	const { requestSudo } = useSudo();
	const handleSearch = (0, import_react.useCallback)(async (e) => {
		if (e) e.preventDefault();
		if (!query.trim()) return;
		setLoading(true);
		try {
			const nextRows = (await UsersService.searchUsers(query)).rows;
			nextRows.forEach((u) => seedIdentityCache(u));
			setResults(nextRows);
		} catch (error) {
			console.error("Search failed:", error);
		} finally {
			setLoading(false);
		}
	}, [query]);
	(0, import_react.useEffect)(() => {
		const timeoutId = setTimeout(() => {
			if (query.trim()) handleSearch();
			else setResults([]);
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [query, handleSearch]);
	const startChat = async (targetUser) => {
		if (!user) return;
		const targetUserId = targetUser.$id;
		if (!targetUser.publicKey) {
			zt.error(`${targetUser.displayName || targetUser.username} hasn't set up their account for secure chatting yet.`);
			return;
		}
		try {
			const existing = await ChatService.getConversations(user.$id);
			let found;
			if (targetUserId === user.$id) found = existing.rows.find((c) => c.type === "direct" && c.participants.length === 1 && c.participants[0] === user.$id);
			else found = existing.rows.find((c) => c.type === "direct" && c.participants.includes(targetUserId) && c.participants.length > 1);
			if (found) {
				router.push(`/chat/${found.$id}`);
				return;
			}
		} catch (e) {
			console.error("Local check failed", e);
		}
		requestSudo({ onSuccess: async () => {
			try {
				const participants = targetUserId === user.$id ? [user.$id] : [user.$id, targetUserId];
				const newConv = await ChatService.createConversation(participants, "direct");
				router.push(`/chat/${newConv.$id}`);
			} catch (error) {
				console.error("Failed to create chat:", error);
				zt.error(`Failed to create chat: ${error?.message || "Unknown error"}`);
			}
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: { p: 2 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
				component: "form",
				onSubmit: handleSearch,
				sx: {
					p: "8px 16px",
					display: "flex",
					alignItems: "center",
					mb: 4,
					borderRadius: "16px",
					bgcolor: "rgba(255, 255, 255, 0.03)",
					border: "1px solid rgba(255, 255, 255, 0.1)",
					boxShadow: "none"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search_default, { sx: {
						color: "rgba(255, 255, 255, 0.3)",
						mr: 2
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						sx: { flex: 1 },
						placeholder: "Search by name or @username...",
						variant: "standard",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						InputProps: {
							disableUnderline: true,
							sx: {
								color: "white",
								fontWeight: 500
							}
						}
					}),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
						size: 20,
						sx: { ml: 1 }
					})
				]
			}),
			loading && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
				spacing: 1.5,
				sx: { mb: 2 },
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					sx: {
						p: 2,
						borderRadius: "20px",
						bgcolor: "rgba(255, 255, 255, 0.02)",
						border: "1px solid rgba(255, 255, 255, 0.05)"
					},
					elevation: 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							display: "flex",
							alignItems: "center",
							gap: 2
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							variant: "circular",
							width: 44,
							height: 44,
							sx: { bgcolor: "rgba(255,255,255,0.05)" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: { flex: 1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								width: "40%",
								sx: { bgcolor: "rgba(255,255,255,0.05)" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								width: "25%",
								sx: { bgcolor: "rgba(255,255,255,0.05)" }
							})]
						})]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: [results.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					sx: {
						borderRadius: "20px",
						bgcolor: "rgba(255, 255, 255, 0.02)",
						border: "1px solid rgba(255, 255, 255, 0.05)",
						transition: "all 0.2s ease",
						"&:hover": {
							bgcolor: "rgba(255, 255, 255, 0.04)",
							borderColor: "rgba(0, 240, 255, 0.2)"
						}
					},
					elevation: 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
						sx: {
							p: 2,
							cursor: "pointer",
							"&:hover": { bgcolor: "rgba(255, 255, 255, 0.04)" }
						},
						onClick: () => startChat(u),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemAvatar, {
							sx: { mr: 1 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResultAvatar, { u })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
							primary: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								sx: {
									fontWeight: 800,
									color: "white",
									fontSize: "1rem"
								},
								children: u.displayName || u.username || `@${(u.userId || u.$id || "").slice(0, 7)}`
							}),
							secondary: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
								sx: {
									color: "rgba(255, 255, 255, 0.4)",
									fontSize: "0.85rem",
									fontWeight: 600
								},
								children: ["@", u.username || (u.userId || u.$id || "").slice(0, 7)]
							})
						})]
					})
				}, u.$id)), results.length === 0 && query.trim().length >= 2 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						textAlign: "center",
						py: 8,
						opacity: .5
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body1",
						sx: { fontWeight: 700 },
						children: "No users found"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						children: "Try a different name or @username"
					})]
				})]
			})
		]
	});
};
var ActionAvatar = ({ user }) => {
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const resolveAvatar = async () => {
			const avatar = user.avatar;
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
		resolveAvatar();
		return () => {
			active = false;
		};
	}, [user.avatar]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		src: avatarUrl || void 0,
		sx: {
			width: 44,
			height: 44,
			bgcolor: "#F59E0B",
			color: "#FFFFFF"
		},
		children: !avatarUrl && (user.displayName || user.username || "?").charAt(0).toUpperCase()
	});
};
function ChatQuickActionsFab({ hidden = false }) {
	const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
	const router = useRouter();
	const { user } = useAuth();
	const { requestSudo } = useSudo();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [results, setResults] = (0, import_react.useState)([]);
	const [selectedUsers, setSelectedUsers] = (0, import_react.useState)([]);
	const [groupName, setGroupName] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const title = (0, import_react.useMemo)(() => mode === "group" ? "New Group" : "New Chat", [mode]);
	(0, import_react.useEffect)(() => {
		let active = true;
		const timer = setTimeout(() => {
			if (!mode || query.trim().length < 2) {
				setResults([]);
				setLoading(false);
				return;
			}
			setLoading(true);
			UsersService.searchUsers(query).then((res) => {
				if (!active) return;
				const filtered = (res.rows || []).filter((u) => (u.userId || u.$id) !== user?.$id);
				filtered.forEach((u) => seedIdentityCache(u));
				setResults(filtered);
			}).catch((error) => {
				console.error("[ChatQuickActionsFab] Search failed:", error);
			}).finally(() => {
				if (active) setLoading(false);
			});
		}, 350);
		return () => {
			active = false;
			clearTimeout(timer);
		};
	}, [
		mode,
		query,
		user?.$id
	]);
	const reset = () => {
		setQuery("");
		setLoading(false);
		setResults([]);
		setSelectedUsers([]);
		setGroupName("");
		setMode(null);
		setOpen(false);
	};
	const openComposer = (nextMode) => {
		setMode(nextMode);
		setOpen(false);
	};
	const ensureUnlocked = async (run) => {
		if (ecosystemSecurity.status.isUnlocked) {
			await run();
			return;
		}
		requestSudo({ onSuccess: () => {
			run();
		} });
	};
	const startDirectChat = async (targetUser) => {
		if (!user) return;
		const targetUserId = targetUser.userId || targetUser.$id;
		if (!targetUser.publicKey) {
			zt.error(`${targetUser.displayName || targetUser.username} hasn't set up secure chatting yet.`);
			return;
		}
		try {
			const found = (await ChatService.getConversations(user.$id)).rows.find((c) => c.type === "direct" && c.participants?.includes(targetUserId));
			if (found) {
				router.push(`/chat/${found.$id}`);
				reset();
				return;
			}
		} catch (error) {
			console.error("[ChatQuickActionsFab] Direct lookup failed:", error);
		}
		await ensureUnlocked(async () => {
			try {
				await UsersService.ensureProfileForUser(user);
				await ecosystemSecurity.ensureE2EIdentity(user.$id);
				const participants = targetUserId === user.$id ? [user.$id] : [user.$id, targetUserId];
				const newConv = await ChatService.createConversation(participants, "direct");
				router.push(`/chat/${newConv.$id}`);
				reset();
			} catch (error) {
				console.error("[ChatQuickActionsFab] Failed to create chat:", error);
				zt.error(`Failed to create chat: ${error?.message || "Unknown error"}`);
			}
		});
	};
	const createGroup = async () => {
		if (!user) return;
		const participants = Array.from(new Set([user.$id, ...selectedUsers.map((u) => u.userId || u.$id)].filter(Boolean)));
		const name = groupName.trim() || "Group Chat";
		if (participants.length < 2) {
			zt.error("Pick at least one other person for the group.");
			return;
		}
		await ensureUnlocked(async () => {
			setSubmitting(true);
			try {
				await UsersService.ensureProfileForUser(user);
				await ecosystemSecurity.ensureE2EIdentity(user.$id);
				const newConv = await ChatService.createConversation(participants, "group", name);
				router.push(`/chat/${newConv.$id}`);
				reset();
			} catch (error) {
				console.error("[ChatQuickActionsFab] Failed to create group:", error);
				zt.error(`Failed to create group: ${error?.message || "Unknown error"}`);
			} finally {
				setSubmitting(false);
			}
		});
	};
	if (hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			"aria-hidden": true,
			sx: {
				position: "fixed",
				inset: 0,
				zIndex: 999,
				pointerEvents: "none",
				opacity: open ? 1 : 0,
				transition: "opacity 220ms ease",
				backdropFilter: open ? "blur(14px) saturate(170%)" : "blur(0px)",
				bgcolor: open ? "rgba(10, 9, 8, 0.22)" : "transparent"
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpeedDial, {
			ariaLabel: "Quick chat actions",
			sx: {
				position: "fixed",
				right: {
					xs: 16,
					md: 32
				},
				bottom: {
					xs: "calc(104px + env(safe-area-inset-bottom))",
					md: 32
				},
				zIndex: 1e3,
				"& .MuiFab-primary": {
					bgcolor: "#6366F1",
					color: "#000000",
					boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&::before": {
						content: "\"\"",
						position: "absolute",
						inset: 0,
						borderRadius: "50%",
						background: "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.02))",
						opacity: .8,
						pointerEvents: "none"
					},
					"&:hover": {
						bgcolor: "#00D1DA",
						transform: "scale(1.1) rotate(90deg)",
						boxShadow: "0 0 50px rgba(99, 102, 241, 0.6)"
					}
				},
				"& .MuiSpeedDialAction-fab": {
					bgcolor: "rgba(10, 10, 10, 0.72)",
					border: "1px solid rgba(255, 255, 255, 0.12)",
					color: "rgba(255, 255, 255, 0.78)",
					transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
					backdropFilter: "blur(16px) saturate(180%)",
					clipPath: "polygon(18% 0, 100% 0, 82% 100%, 0 100%)",
					borderRadius: "14px",
					boxShadow: "0 16px 40px rgba(0, 0, 0, 0.38)",
					transform: "skewX(-12deg)",
					"& .MuiSvgIcon-root, svg": { transform: "skewX(12deg)" },
					"&:hover": {
						bgcolor: "rgba(99, 102, 241, 0.14)",
						color: "#6366F1",
						borderColor: "#6366F1",
						transform: "skewX(-12deg) translateY(-4px)"
					},
					"& .MuiSpeedDialAction-staticTooltipLabel": { transform: "translateY(-1px)" }
				},
				"& .MuiSpeedDialAction-fab + .MuiSpeedDialAction-fab": { mt: 1 },
				"& .MuiSpeedDialAction-staticTooltipLabel": {
					bgcolor: "rgba(10, 10, 10, 0.88)",
					border: "1px solid rgba(255, 255, 255, 0.12)",
					color: "#fff",
					fontFamily: "var(--font-satoshi)",
					fontWeight: 700,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					fontSize: "0.75rem",
					padding: "6px 12px",
					borderRadius: "10px",
					backdropFilter: "blur(14px) saturate(180%)"
				}
			},
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedDialIcon, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					size: 24,
					strokeWidth: 1.5
				}),
				openIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					size: 24,
					strokeWidth: 1.5
				})
			}),
			open,
			onOpen: () => setOpen(true),
			onClose: () => setOpen(false),
			direction: "up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedDialAction, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
						size: 20,
						strokeWidth: 1.5,
						color: "#F59E0B"
					}),
					tooltipTitle: "Call",
					tooltipOpen: true,
					onClick: () => {
						setOpen(false);
						router.push("/calls");
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedDialAction, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
						size: 20,
						strokeWidth: 1.5,
						color: "#10B981"
					}),
					tooltipTitle: "Group",
					tooltipOpen: true,
					onClick: () => openComposer("group")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedDialAction, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
						size: 20,
						strokeWidth: 1.5,
						color: "#6366F1"
					}),
					tooltipTitle: "Chat",
					tooltipOpen: true,
					onClick: () => openComposer("chat")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: Boolean(mode),
			onClose: reset,
			fullWidth: true,
			maxWidth: "sm",
			fullScreen: isMobile,
			PaperProps: { sx: {
				borderRadius: isMobile ? 0 : "24px",
				bgcolor: "#161412",
				border: "1px solid rgba(255, 255, 255, 0.08)",
				backgroundImage: "none"
			} },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					sx: {
						pb: 1,
						fontWeight: 900
					},
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					sx: { pt: 1 },
					children: [
						mode === "group" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							fullWidth: true,
							value: groupName,
							onChange: (e) => setGroupName(e.target.value),
							placeholder: "Group name",
							sx: { mb: 2 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							fullWidth: true,
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search by name or @username...",
							autoFocus: true,
							sx: { mb: 2 }
						}),
						loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								opacity: .6,
								py: 1
							},
							children: "Searching..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, {
							sx: {
								display: "flex",
								flexDirection: "column",
								gap: 1
							},
							children: [results.map((u) => {
								const id = u.userId || u.$id;
								const checked = selectedUsers.some((item) => (item.userId || item.$id) === id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
									elevation: 0,
									sx: {
										borderRadius: "18px",
										bgcolor: checked ? "rgba(99, 102, 241, 0.08)" : "rgba(255,255,255,0.02)",
										border: "1px solid",
										borderColor: checked ? "rgba(99, 102, 241, 0.35)" : "rgba(255,255,255,0.06)"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, {
										disablePadding: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemButton, {
											onClick: () => {
												if (mode === "chat") {
													startDirectChat(u);
													return;
												}
												setSelectedUsers((current) => {
													if (checked) return current.filter((item) => (item.userId || item.$id) !== id);
													return [...current, u];
												});
											},
											sx: {
												py: 1.25,
												px: 1.5
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemAvatar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionAvatar, { user: u }) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
													primary: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
														sx: { fontWeight: 800 },
														children: u.displayName || u.username || "Unknown"
													}),
													secondary: `@${u.username || id.slice(0, 7)}`
												}),
												mode === "group" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, { checked })
											]
										})
									})
								}, id);
							}), query.trim().length >= 2 && !loading && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									py: 4,
									textAlign: "center",
									opacity: .6
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: { fontWeight: 700 },
									children: "No users found"
								})
							})]
						}),
						mode === "group" && selectedUsers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
							direction: "row",
							spacing: 1,
							useFlexGap: true,
							flexWrap: "wrap",
							sx: { mt: 2 },
							children: selectedUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								sx: {
									px: 1.25,
									py: .5,
									borderRadius: "999px",
									bgcolor: "rgba(255,255,255,0.04)",
									border: "1px solid rgba(255,255,255,0.08)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: { fontWeight: 700 },
									children: u.displayName || u.username
								})
							}, u.userId || u.$id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogActions, {
					sx: { p: 2 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: reset,
						sx: { color: "text.secondary" },
						children: "Cancel"
					}), mode === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void createGroup(),
						variant: "contained",
						disabled: submitting || selectedUsers.length === 0,
						sx: { bgcolor: "#6366F1" },
						children: "Create Group"
					}) : null]
				})
			]
		})
	] });
}
function ChatHandler() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { user } = useAuth();
	const { requestSudo } = useSudo();
	const userId = searchParams.get("userId");
	const [checkedSudoOnMount, setCheckedSudoOnMount] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (userId && user) {
			const initChat = async () => {
				try {
					await UsersService.ensureProfileForUser(user);
					const targetProfile = await UsersService.getProfileById(userId);
					if (!targetProfile) {
						zt.error("User profile not found.");
						router.replace("/chats");
						return;
					}
					if (!targetProfile.publicKey) {
						zt.error(`${targetProfile.displayName || targetProfile.username} hasn't set up their account for secure chatting yet.`);
						router.replace("/chats");
						return;
					}
					const actualTargetUserId = targetProfile.userId || userId;
					if (!actualTargetUserId) {
						zt.error("User ID missing from profile.");
						router.replace("/chats");
						return;
					}
					const found = (await ChatService.getConversations(user.$id)).rows.find((c) => c.type === "direct" && c.participants.includes(actualTargetUserId));
					if (found) {
						router.push(`/chat/${found.$id}`);
						return;
					}
					if (ecosystemSecurity.status.isUnlocked) try {
						await ecosystemSecurity.ensureE2EIdentity(user.$id);
						const newConv = await ChatService.createConversation([user.$id, actualTargetUserId], "direct");
						router.push(`/chat/${newConv.$id}`);
					} catch (err) {
						console.error("Failed to create chat:", err);
						zt.error(`Failed to create chat: ${err?.message || "Unknown error"}`);
						router.replace("/chats");
					}
					else requestSudo({
						intent: await KeychainService.hasMasterpass(user.$id) ? void 0 : "initialize",
						onSuccess: async () => {
							try {
								await UsersService.ensureProfileForUser(user);
								await ecosystemSecurity.ensureE2EIdentity(user.$id);
								const newConv = await ChatService.createConversation([user.$id, actualTargetUserId], "direct");
								router.push(`/chat/${newConv.$id}`);
							} catch (err) {
								console.error("Failed to create chat:", err);
								zt.error(`Failed to create chat: ${err?.message || "Unknown error"}`);
								router.replace("/chats");
							}
						},
						onCancel: () => {
							router.replace("/chats");
						}
					});
				} catch (e) {
					console.error("Failed to auto-init chat", e);
					zt.error("Failed to initialize chat.");
					router.replace("/chats");
				}
			};
			initChat();
		}
	}, [
		userId,
		user,
		router,
		requestSudo
	]);
	(0, import_react.useEffect)(() => {
		const runCheck = async () => {
			if (!user?.$id || checkedSudoOnMount) return;
			if (ecosystemSecurity.status.isUnlocked) {
				UsersService.ensureProfileForUser(user).catch((error) => {
					console.warn("[Chats] Background profile bootstrap failed:", error);
				});
				setCheckedSudoOnMount(true);
				return;
			}
			try {
				requestSudo({
					intent: await KeychainService.hasMasterpass(user.$id) ? void 0 : "initialize",
					onSuccess: () => {
						UsersService.ensureProfileForUser(user).catch((error) => {
							console.warn("[Chats] Background profile bootstrap failed:", error);
						});
						setCheckedSudoOnMount(true);
					},
					onCancel: () => {
						setCheckedSudoOnMount(true);
						router.replace("/");
					}
				});
			} catch (e) {
				console.error("Failed to check masterpass on mount", e);
				setCheckedSudoOnMount(true);
			}
		};
		runCheck();
	}, [
		user?.$id,
		user,
		checkedSudoOnMount,
		requestSudo,
		router
	]);
	return null;
}
function Home$1() {
	const isMobile = useMediaQuery(useTheme().breakpoints.down("md"), { noSsr: true });
	const { requestSudo } = useSudo();
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(ecosystemSecurity.status.isUnlocked);
	(0, import_react.useEffect)(() => {
		return ecosystemSecurity.onStatusChange((status) => {
			setIsUnlocked(status.isUnlocked);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatHandler, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			position: "relative",
			height: "100%"
		},
		children: [
			isUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					height: "100%"
				},
				children: [isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						width: "100%",
						borderRight: 0,
						display: "flex",
						flexDirection: "column"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatList, {})
				}), !isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						flex: 1,
						p: 3
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h5",
						fontWeight: "bold",
						mb: 3,
						children: "Find People"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserSearch, {})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					minHeight: "70vh",
					display: "grid",
					placeItems: "center",
					px: 3
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					spacing: 2,
					alignItems: "center",
					sx: {
						maxWidth: 420,
						textAlign: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "h4",
							fontWeight: 900,
							children: "Vault Locked"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							sx: { opacity: .7 },
							children: "Unlock the Vault before chats, identities, or self-chat can initialize."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "contained",
							onClick: () => requestSudo({ onSuccess: () => void 0 }),
							children: "Unlock Vault"
						})
					]
				})
			}),
			!isUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				"aria-hidden": true,
				sx: {
					position: "absolute",
					inset: 0,
					zIndex: 1,
					pointerEvents: "none",
					bgcolor: "rgba(10, 9, 8, 0.28)",
					backdropFilter: "blur(14px)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatQuickActionsFab, { hidden: !isUnlocked })
		]
	})] });
}
var SplitComponent = Home$1;
//#endregion
export { SplitComponent as component };
