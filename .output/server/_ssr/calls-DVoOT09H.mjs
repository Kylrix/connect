import { o as __toESM } from "../_runtime.mjs";
import { n as UsersService, o as seedIdentityCache } from "./users-vRrLGFai.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { H as useTheme, J as alpha, S as Call_default, _ as Delete_default, b as CallReceived_default, g as Stop_default, h as Refresh_default, m as History_default, v as AddIcCall_default, x as Videocam_default, xt as require_jsx_runtime, y as CallMade_default } from "../_libs/@mui/icons-material+[...].mjs";
import { B as Box, D as Divider, E as Drawer, H as Avatar, J as IconButton, K as Typography, N as Container, O as DialogTitle, T as Fab, V as Badge, W as Chip, X as Paper, Y as CircularProgress, b as ListItemButton, f as Skeleton, g as ListItemText, k as DialogContent, n as TextField, p as MenuItem, s as Stack, t as useMediaQuery, u as Tooltip, v as ListItemAvatar, x as List, y as ListItem, z as Button } from "../_libs/@mui/material+[...].mjs";
import { i as useAuth, s as useRouter, t as ChatService } from "./chat-GLmU6cBO.mjs";
import { t as CallService } from "./call-DhmbyQFj.mjs";
import { $ as Hash, A as Plus, Ot as ArrowRight, Tt as Calendar, f as Type, i as Video, j as Phone, kt as ArrowLeft, m as Timer, n as X, o as Users, pt as Clock, s as User } from "../_libs/lucide-react.mjs";
import { r as zt } from "../_libs/react-hot-toast.mjs";
import { t as AppShell } from "./AppShell-JgOEZgrs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calls-DVoOT09H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CallHistory = ({ onNewCall }) => {
	const { user } = useAuth();
	const [calls, setCalls] = (0, import_react.useState)([]);
	const [activeCalls, setActiveCalls] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const router = useRouter();
	const loadCalls = import_react.useCallback(async () => {
		if (!user) return;
		setLoading(true);
		try {
			await CallService.cleanupOldCallLogs();
			const [history, ongoing] = await Promise.all([CallService.getCallHistory(user.$id), CallService.getActiveCalls(user.$id)]);
			const enrich = async (callList) => {
				return await Promise.all(callList.map(async (call) => {
					const isCaller = call.callerId === user.$id;
					const otherId = isCaller ? call.receiverId : call.callerId;
					try {
						const profile = otherId ? await UsersService.getProfileById(otherId) : null;
						if (profile) seedIdentityCache(profile);
						return {
							...call,
							otherUser: profile || {
								username: call.isLink ? call.title || "Public Link" : "User",
								displayName: call.isLink ? call.title || "Public Link Session" : void 0,
								$id: otherId
							},
							direction: isCaller ? "outgoing" : "incoming"
						};
					} catch (_e) {
						return {
							...call,
							otherUser: {
								username: call.isLink ? call.title || "Public Link" : "User",
								$id: otherId
							},
							direction: isCaller ? "outgoing" : "incoming"
						};
					}
				}));
			};
			const [enrichedHistory, enrichedActive] = await Promise.all([enrich(history), enrich(ongoing)]);
			setCalls(enrichedHistory);
			setActiveCalls(enrichedActive);
		} catch (error) {
			console.error("Failed to load call history:", error);
			zt.error("Failed to load calls");
		} finally {
			setLoading(false);
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (user) loadCalls();
	}, [user, loadCalls]);
	const handleEndCall = async (callId) => {
		try {
			await CallService.endCall(callId);
			zt.success("Call ended");
			loadCalls();
		} catch (_e) {
			zt.error("Failed to end call");
		}
	};
	const handleDeleteCall = async (callId) => {
		if (!confirm("Are you sure you want to delete this call log?")) return;
		try {
			await CallService.deleteCallLog(callId);
			zt.success("Call log deleted");
			loadCalls();
		} catch (_e) {
			zt.error("Failed to delete call log");
		}
	};
	const startCall = (call) => {
		if (call.isLink) {
			window.location.assign(`/call/${call.$id}`);
			return;
		}
		if (!call.otherUser?.$id) {
			zt.error("User ID not available for this call");
			return;
		}
		window.location.assign(`/chat/${call.otherUser.$id}`);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2
		},
		children: [
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			sx: {
				p: 2,
				borderRadius: 3,
				bgcolor: "rgba(255,255,255,0.02)",
				border: "1px solid rgba(255,255,255,0.05)"
			},
			elevation: 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				direction: "row",
				spacing: 2,
				alignItems: "center",
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
						width: "22%",
						sx: { bgcolor: "rgba(255,255,255,0.05)" }
					})]
				})]
			})
		}, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2,
			position: "relative",
			minHeight: "50vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "subtitle2",
					color: "text.secondary",
					fontWeight: "bold",
					children: activeCalls.length > 0 ? `Ongoing Sessions (${activeCalls.length})` : "No active sessions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					size: "small",
					onClick: loadCalls,
					sx: { opacity: .6 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Refresh_default, { fontSize: "small" })
				})]
			}),
			activeCalls.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
				sx: { mb: 2 },
				children: activeCalls.map((call) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
					sx: {
						mb: 1.5,
						borderRadius: 3,
						border: "1px solid #6366F1",
						cursor: "pointer",
						transition: "all 0.2s ease",
						"&:hover": {
							bgcolor: "rgba(99, 102, 241, 0.05)",
							transform: "translateY(-2px)"
						}
					},
					elevation: 0,
					variant: "outlined",
					onClick: () => startCall(call),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
						secondaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							spacing: 1,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								title: "End Call",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									edge: "end",
									onClick: (e) => {
										e.stopPropagation();
										handleEndCall(call.$id);
									},
									color: "warning",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stop_default, {})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								title: "Delete Permanently",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									edge: "end",
									onClick: (e) => {
										e.stopPropagation();
										handleDeleteCall(call.$id);
									},
									color: "error",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete_default, {})
								})
							})]
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemAvatar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							overlap: "circular",
							anchorOrigin: {
								vertical: "bottom",
								horizontal: "right"
							},
							variant: "dot",
							sx: { "& .MuiBadge-badge": {
								bgcolor: "#10B981",
								boxShadow: "0 0 0 2px #161412"
							} },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								sx: {
									bgcolor: "primary.main",
									color: "white"
								},
								children: call.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Videocam_default, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Call_default, {})
							})
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
							primary: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								fontWeight: "bold",
								sx: { color: "#6366F1" },
								children: call.otherUser.displayName || call.otherUser.username
							}),
							secondary: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
								variant: "caption",
								sx: {
									color: "text.secondary",
									display: "block"
								},
								children: ["Started ", new Date(call.startedAt).toLocaleTimeString()]
							})
						})]
					})
				}, call.$id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: {
				opacity: .1,
				mb: 1
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 1
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "subtitle2",
					color: "text.secondary",
					fontWeight: "bold",
					children: "Recent History"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					title: "Call logs are cleared every 7 days",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						spacing: .5,
						alignItems: "center",
						sx: {
							opacity: .5,
							cursor: "help"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History_default, { sx: { fontSize: 14 } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							fontWeight: "bold",
							children: "7D Retention"
						})]
					})
				})]
			}),
			calls.filter((c) => c.status !== "ongoing").length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					textAlign: "center",
					py: 5,
					color: "text.secondary"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Call_default, { sx: {
					fontSize: 60,
					mb: 2,
					opacity: .5
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, { children: "No recent calls" })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: calls.filter((c) => c.status !== "ongoing").map((call) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				sx: {
					mb: 1.5,
					borderRadius: 3,
					cursor: "pointer",
					transition: "all 0.2s ease",
					"&:hover": {
						bgcolor: "rgba(255, 255, 255, 0.02)",
						transform: "translateY(-2px)"
					}
				},
				elevation: 0,
				variant: "outlined",
				onClick: () => startCall(call),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
					secondaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						direction: "row",
						spacing: 1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							edge: "end",
							onClick: (e) => {
								e.stopPropagation();
								handleDeleteCall(call.$id);
							},
							size: "small",
							sx: { opacity: .3 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete_default, { fontSize: "small" })
						})
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemAvatar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						sx: {
							bgcolor: call.status === "missed" ? "error.light" : "primary.light",
							color: call.status === "missed" ? "error.main" : "primary.main"
						},
						children: call.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Videocam_default, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Call_default, {})
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
						primary: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							fontWeight: "bold",
							children: call.otherUser.displayName || call.otherUser.username
						}),
						secondary: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								display: "flex",
								alignItems: "center",
								gap: 1,
								mt: .5
							},
							children: [
								call.direction === "outgoing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallMade_default, { fontSize: "small" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallReceived_default, { fontSize: "small" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									color: "text.secondary",
									children: new Date(call.startedAt).toLocaleDateString()
								}),
								call.status === "missed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									label: "Missed",
									size: "small",
									color: "error",
									variant: "outlined",
									sx: {
										height: 20,
										fontSize: "0.65rem"
									}
								})
							]
						})
					})]
				})
			}, call.$id)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fab, {
				color: "primary",
				"aria-label": "add call",
				sx: {
					position: "fixed",
					bottom: 80,
					right: 24,
					bgcolor: "#6366F1",
					"&:hover": { bgcolor: "#4F46E5" }
				},
				onClick: () => onNewCall ? onNewCall() : router.push("/chats"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddIcCall_default, {})
			})
		]
	});
};
var COLORS = {
	background: "#0A0908",
	surface: "#161412",
	hover: "#1C1A18",
	primary: "#6366F1",
	secondary: "#F59E0B",
	rim: "rgba(255, 255, 255, 0.05)"
};
var CallActionModal = ({ open, onClose }) => {
	const { user } = useAuth();
	const router = useRouter();
	const isMobile = useMediaQuery(useTheme().breakpoints.down("md"), { noSsr: true });
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showScheduleForm, setShowScheduleForm] = (0, import_react.useState)(false);
	const [showJoinWithId, setShowJoinWithId] = (0, import_react.useState)(false);
	const [scheduleTitle, setScheduleTitle] = (0, import_react.useState)("");
	const [instantTitle, setInstantTitle] = (0, import_react.useState)("");
	const [scheduleTime, setScheduleTime] = (0, import_react.useState)("");
	const [joinId, setJoinId] = (0, import_react.useState)("");
	const [duration, setDuration] = (0, import_react.useState)(120);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const loadConversations = (0, import_react.useCallback)(async () => {
		if (!user) return;
		setLoading(true);
		try {
			setConversations((await ChatService.getConversations(user.$id)).rows.filter((c) => {
				return !(c.type === "direct" && c.participants && (c.participants.length === 1 || c.participants.length === 2 && c.participants.every((p) => p === user.$id)));
			}));
		} catch (e) {
			console.error("Failed to load individuals:", e);
		} finally {
			setLoading(false);
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (open && user) {
			loadConversations();
			setShowScheduleForm(false);
			setShowJoinWithId(false);
			setScheduleTitle("");
			setInstantTitle("");
			setScheduleTime("");
			setJoinId("");
			setDuration(120);
		}
	}, [
		open,
		user,
		loadConversations
	]);
	const handleStartPublicCall = async () => {
		if (!user) return;
		setCreating(true);
		try {
			const _link = await CallService.createCallLink(user.$id, "video", void 0, instantTitle || void 0, void 0, duration);
			router.push(`/call/${_link.$id}?caller=true`);
			onClose();
		} catch (e) {
			console.error("[CallActionModal] Failed to start public call:", e);
			const errorMessage = e.message || "Failed to start public call";
			zt.error(errorMessage);
		} finally {
			setCreating(false);
		}
	};
	const handleScheduleCall = async () => {
		if (!user) return;
		if (!scheduleTime) {
			zt.error("Please select a start time");
			return;
		}
		setCreating(true);
		try {
			await CallService.createCallLink(user.$id, "video", void 0, scheduleTitle || void 0, new Date(scheduleTime).toISOString(), duration);
			zt.success("Call scheduled successfully!");
			router.push(`/calls`);
			onClose();
		} catch (e) {
			console.error("[CallActionModal] Failed to schedule call:", e);
			const errorMessage = e.message || "Failed to schedule call";
			zt.error(errorMessage);
		} finally {
			setCreating(false);
		}
	};
	const handleJoinWithId = () => {
		if (!joinId.trim()) {
			zt.error("Please enter a meeting ID");
			return;
		}
		router.push(`/call/${joinId.trim()}`);
		onClose();
	};
	const handleCallIndividual = (convId, type = "video") => {
		router.push(`/call/${convId}?caller=true&type=${type}`);
		onClose();
	};
	const inputStyles = {
		"& .MuiOutlinedInput-root": {
			bgcolor: "rgba(255,255,255,0.02)",
			borderRadius: "12px",
			border: `1px solid ${COLORS.rim}`,
			transition: "all 0.2s ease",
			"&:hover": {
				bgcolor: "rgba(255,255,255,0.04)",
				borderColor: "rgba(255,255,255,0.1)"
			},
			"&.Mui-focused": {
				bgcolor: "rgba(255,255,255,0.05)",
				borderColor: COLORS.secondary
			}
		},
		"& .MuiInputLabel-root": {
			color: "rgba(255,255,255,0.4)",
			"&.Mui-focused": { color: COLORS.secondary }
		},
		"& .MuiOutlinedInput-notchedOutline": { border: "none" }
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		open,
		onClose,
		anchor: isMobile ? "bottom" : "right",
		PaperProps: { sx: {
			bgcolor: COLORS.surface,
			backgroundImage: "none",
			borderRadius: isMobile ? "24px 24px 0 0" : "28px 0 0 28px",
			border: `1px solid ${COLORS.rim}`,
			maxWidth: "480px",
			width: "100%",
			height: isMobile ? "92vh" : "100%",
			boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
			overflow: "hidden"
		} },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
			sx: {
				p: 3,
				pb: 2,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				borderBottom: `1px solid ${COLORS.rim}`
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				direction: "row",
				spacing: 1.5,
				alignItems: "center",
				children: [(showScheduleForm || showJoinWithId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					onClick: () => {
						setShowScheduleForm(false);
						setShowJoinWithId(false);
					},
					size: "small",
					sx: {
						color: "rgba(255,255,255,0.5)",
						ml: -1
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 20 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "h6",
					sx: {
						fontWeight: 900,
						fontFamily: "var(--font-clash)",
						letterSpacing: "-0.02em",
						color: "white"
					},
					children: showScheduleForm ? "Schedule Session" : showJoinWithId ? "Join with ID" : "New Session"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
				onClick: onClose,
				sx: {
					color: "rgba(255,255,255,0.3)",
					"&:hover": {
						color: "white",
						bgcolor: COLORS.hover
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			sx: {
				p: 3,
				display: "flex",
				flexDirection: "column",
				gap: 3
			},
			children: [!showJoinWithId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: 2.5
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextField, {
					select: true,
					fullWidth: true,
					label: "Call Duration",
					value: duration,
					onChange: (e) => setDuration(Number(e.target.value)),
					sx: inputStyles,
					InputProps: { startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {
						size: 18,
						style: {
							marginRight: "12px",
							color: COLORS.secondary
						}
					}) },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
							value: 15,
							children: "15 Minutes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
							value: 30,
							children: "30 Minutes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
							value: 60,
							children: "1 Hour"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
							value: 120,
							children: "2 Hours (Free Max)"
						})
					]
				}), !showScheduleForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					fullWidth: true,
					label: "Meeting Title (Optional)",
					placeholder: "e.g. Quick Sync",
					value: instantTitle,
					onChange: (e) => setInstantTitle(e.target.value),
					sx: inputStyles,
					InputProps: { startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, {
						size: 18,
						style: {
							marginRight: "12px",
							color: COLORS.primary
						}
					}) }
				})]
			}), !showScheduleForm && !showJoinWithId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					spacing: 2,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						fullWidth: true,
						variant: "contained",
						onClick: handleStartPublicCall,
						disabled: creating,
						startIcon: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
							size: 18,
							color: "inherit"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 }),
						sx: {
							bgcolor: COLORS.primary,
							py: 2,
							borderRadius: "16px",
							fontWeight: 900,
							textTransform: "none",
							fontFamily: "var(--font-satoshi)",
							boxShadow: `0 8px 20px -6px ${alpha(COLORS.primary, .4)}`,
							"&:hover": {
								bgcolor: alpha(COLORS.primary, .9),
								boxShadow: `0 12px 24px -6px ${alpha(COLORS.primary, .5)}`
							}
						},
						children: "Start Now"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						fullWidth: true,
						variant: "outlined",
						onClick: () => setShowScheduleForm(true),
						startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { size: 18 }),
						sx: {
							borderColor: COLORS.rim,
							color: "white",
							py: 2,
							borderRadius: "16px",
							fontWeight: 900,
							textTransform: "none",
							fontFamily: "var(--font-satoshi)",
							bgcolor: "rgba(255,255,255,0.01)",
							"&:hover": {
								borderColor: "rgba(255,255,255,0.1)",
								bgcolor: COLORS.hover
							}
						},
						children: "Schedule"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					fullWidth: true,
					variant: "text",
					onClick: () => setShowJoinWithId(true),
					startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { size: 18 }),
					sx: {
						color: "rgba(255,255,255,0.4)",
						py: 1,
						borderRadius: "12px",
						fontWeight: 800,
						textTransform: "none",
						"&:hover": {
							color: "white",
							bgcolor: "rgba(255,255,255,0.05)"
						}
					},
					children: "Join with Meeting ID"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: {
					opacity: .05,
					my: 1
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							fontWeight: 900,
							color: "rgba(255,255,255,0.3)",
							letterSpacing: "0.1em",
							mb: 2,
							display: "block",
							fontFamily: "var(--font-satoshi)"
						},
						children: "RECENT INDIVIDUALS"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							display: "flex",
							justifyContent: "center",
							py: 4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
							size: 20,
							sx: { color: COLORS.secondary }
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
						sx: {
							p: 0,
							display: "flex",
							flexDirection: "column",
							gap: 1
						},
						children: conversations.map((conv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, {
							disablePadding: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemButton, {
								onClick: () => handleCallIndividual(conv.$id),
								sx: {
									borderRadius: "18px",
									bgcolor: "rgba(255,255,255,0.02)",
									border: `1px solid ${COLORS.rim}`,
									p: 1.5,
									transition: "all 0.2s ease",
									"&:hover": {
										bgcolor: COLORS.hover,
										borderColor: "rgba(255,255,255,0.1)",
										transform: "translateY(-2px)"
									}
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemAvatar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
										sx: {
											bgcolor: COLORS.background,
											border: `1px solid ${COLORS.rim}`,
											width: 44,
											height: 44
										},
										children: conv.type === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 22 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 22 })
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
										primary: conv.name,
										primaryTypographyProps: {
											fontWeight: 800,
											fontSize: "0.95rem",
											fontFamily: "var(--font-satoshi)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: 1,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											size: "small",
											sx: {
												color: COLORS.primary,
												bgcolor: alpha(COLORS.primary, .08),
												"&:hover": { bgcolor: alpha(COLORS.primary, .15) }
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 16 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											size: "small",
											sx: {
												color: COLORS.secondary,
												bgcolor: alpha(COLORS.secondary, .08),
												"&:hover": { bgcolor: alpha(COLORS.secondary, .15) }
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { size: 16 })
										})]
									})
								]
							})
						}, conv.$id))
					})]
				})
			] }) : showJoinWithId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				spacing: 3,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					fullWidth: true,
					label: "Meeting ID",
					placeholder: "Paste the ID here...",
					value: joinId,
					onChange: (e) => setJoinId(e.target.value),
					sx: inputStyles,
					InputProps: { startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, {
						size: 18,
						style: {
							marginRight: "12px",
							color: COLORS.primary
						}
					}) }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					fullWidth: true,
					variant: "contained",
					onClick: handleJoinWithId,
					sx: {
						py: 2,
						borderRadius: "16px",
						fontWeight: 900,
						textTransform: "none",
						bgcolor: COLORS.primary,
						color: "white",
						fontFamily: "var(--font-satoshi)",
						boxShadow: `0 8px 20px -6px ${alpha(COLORS.primary, .4)}`,
						"&:hover": {
							bgcolor: alpha(COLORS.primary, .9),
							boxShadow: `0 12px 24px -6px ${alpha(COLORS.primary, .5)}`
						}
					},
					children: "Join Session"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				spacing: 3,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						fullWidth: true,
						label: "Meeting Title",
						placeholder: "e.g. Weekly Sync",
						value: scheduleTitle,
						onChange: (e) => setScheduleTitle(e.target.value),
						sx: inputStyles,
						InputProps: { startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, {
							size: 18,
							style: {
								marginRight: "12px",
								color: COLORS.primary
							}
						}) }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						fullWidth: true,
						label: "Start Time",
						type: "datetime-local",
						value: scheduleTime,
						onChange: (e) => setScheduleTime(e.target.value),
						sx: inputStyles,
						InputLabelProps: { shrink: true },
						InputProps: { startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							size: 18,
							style: {
								marginRight: "12px",
								color: COLORS.secondary
							}
						}) }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						fullWidth: true,
						variant: "contained",
						onClick: handleScheduleCall,
						disabled: creating,
						sx: {
							py: 2,
							borderRadius: "16px",
							fontWeight: 900,
							textTransform: "none",
							bgcolor: COLORS.secondary,
							color: COLORS.background,
							fontFamily: "var(--font-satoshi)",
							boxShadow: `0 8px 20px -6px ${alpha(COLORS.secondary, .4)}`,
							"&:hover": {
								bgcolor: alpha(COLORS.secondary, .9),
								boxShadow: `0 12px 24px -6px ${alpha(COLORS.secondary, .5)}`
							},
							"&.Mui-disabled": {
								bgcolor: alpha(COLORS.secondary, .3),
								color: alpha(COLORS.background, .5)
							}
						},
						children: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
							size: 22,
							color: "inherit"
						}) : "Schedule Session"
					})
				]
			})]
		})]
	});
};
function CallsPage() {
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [joinInput, setJoinId] = (0, import_react.useState)("");
	const router = useRouter();
	const handleJoin = () => {
		if (!joinInput.trim()) {
			zt.error("Please enter a meeting ID or URL");
			return;
		}
		let id = joinInput.trim();
		if (id.includes("/call/")) id = id.split("/call/").pop() || id;
		router.push(`/call/${id}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		maxWidth: "md",
		sx: {
			py: 3,
			position: "relative",
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					mb: 4,
					display: "flex",
					flexDirection: {
						xs: "column",
						md: "row"
					},
					gap: 3,
					alignItems: "center",
					justifyContent: "space-between"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "h5",
					fontWeight: "bold",
					children: "Call History"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					sx: {
						p: 1,
						pl: 2,
						bgcolor: "rgba(255,255,255,0.02)",
						border: "1px solid rgba(255,255,255,0.05)",
						borderRadius: "16px",
						display: "flex",
						alignItems: "center",
						gap: 1,
						width: {
							xs: "100%",
							md: "400px"
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, {
							size: 18,
							style: { opacity: .3 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							variant: "standard",
							placeholder: "Join with ID or Link...",
							value: joinInput,
							onChange: (e) => setJoinId(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleJoin(),
							InputProps: {
								disableUnderline: true,
								sx: {
									fontSize: "0.9rem",
									fontWeight: 700,
									color: "white"
								}
							},
							sx: { flex: 1 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "contained",
							size: "small",
							onClick: handleJoin,
							sx: {
								bgcolor: "#6366F1",
								borderRadius: "10px",
								minWidth: "40px",
								height: "36px",
								p: 0
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 18 })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						display: "flex",
						justifyContent: "center",
						py: 4
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {})
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallHistory, { onNewCall: () => setModalOpen(true) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallActionModal, {
				open: modalOpen,
				onClose: () => setModalOpen(false)
			})
		]
	}) });
}
var SplitComponent = CallsPage;
//#endregion
export { SplitComponent as component };
