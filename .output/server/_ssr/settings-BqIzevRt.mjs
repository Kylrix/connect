import { o as __toESM } from "../_runtime.mjs";
import { n as UsersService } from "./users-vRrLGFai.mjs";
import { n as ecosystemSecurity } from "./security-DTzL0999.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { H as useTheme, J as alpha, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { A as DialogActions, B as Box, D as Divider, H as Avatar, J as IconButton, K as Typography, O as DialogTitle, X as Paper, Y as CircularProgress, _ as ListItemIcon, g as ListItemText, j as Dialog, k as DialogContent, n as TextField, o as Switch, s as Stack, w as FormControlLabel, x as List, y as ListItem, z as Button } from "../_libs/@mui/material+[...].mjs";
import { i as useAuth } from "./chat-GLmU6cBO.mjs";
import { E as Search, N as Pen, S as ShieldAlert, St as Check, U as Lock, Y as Image, b as Shield, et as Globe, n as X, nt as FingerprintPattern, p as Trash2, s as User, v as Smartphone, z as MessageSquare } from "../_libs/lucide-react.mjs";
import { n, r as zt } from "../_libs/react-hot-toast.mjs";
import { l as PasskeySetup, p as SudoModal, s as KeychainService } from "./DynamicIsland-DPFhB0ig.mjs";
import { r as getUserProfilePicId, t as AppShell } from "./AppShell-JgOEZgrs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BqIzevRt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DiscoverabilitySettings = () => {
	const { user } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [savingAvatar, setSavingAvatar] = (0, import_react.useState)(false);
	const [savingDiscoverable, setSavingDiscoverable] = (0, import_react.useState)(false);
	const [savingContact, setSavingContact] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [username, setUsername] = (0, import_react.useState)("");
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [newUsername, setNewUsername] = (0, import_react.useState)("");
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [checkingAvailability, setCheckingAvailability] = (0, import_react.useState)(false);
	const [isAvailable, setIsAvailable] = (0, import_react.useState)(null);
	const [syncError, setSyncError] = (0, import_react.useState)(null);
	const [isSudoOpen, setIsSudoOpen] = (0, import_react.useState)(false);
	const loadProfile = (0, import_react.useCallback)(async () => {
		try {
			const p = await UsersService.getProfileById(user.$id);
			setProfile(p);
			if (p) {
				setUsername(p.username || "");
				setNewUsername(p.username || "");
			}
		} catch (_e) {
			console.error("Failed to load profile", _e);
		} finally {
			setLoading(false);
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (user?.$id) loadProfile();
	}, [user, loadProfile]);
	(0, import_react.useEffect)(() => {
		const check = async () => {
			const normalized = newUsername.toLowerCase().trim().replace(/^@/, "").replace(/[^a-z0-9_]/g, "");
			if (!normalized || normalized === username || normalized.length < 3) {
				setIsAvailable(null);
				return;
			}
			setCheckingAvailability(true);
			try {
				setIsAvailable(await UsersService.isUsernameAvailable(normalized));
			} catch (e) {
				console.error("Check failed", e);
				setIsAvailable(null);
			} finally {
				setCheckingAvailability(false);
			}
		};
		const timeoutId = setTimeout(check, 500);
		return () => clearTimeout(timeoutId);
	}, [newUsername, username]);
	const handleToggleDiscoverability = async (checked) => {
		if (!user?.$id) return;
		setSavingDiscoverable(true);
		try {
			setProfile(await UsersService.setProfileDiscoverable(user.$id, checked) || profile);
			zt.success(checked ? "Profile is now discoverable to everyone" : "Profile is now private");
		} catch (e) {
			zt.error(e.message || "Failed to toggle profile discoverability");
		} finally {
			setSavingDiscoverable(false);
		}
	};
	const handleToggleAvatarVisibility = async (checked) => {
		if (!user?.$id) return;
		const fileId = getUserProfilePicId(user);
		if (!fileId) {
			zt.error("Set a profile picture first to enable visibility");
			return;
		}
		setSavingAvatar(true);
		try {
			setProfile(await UsersService.setAvatarVisible(user.$id, fileId, checked) || profile);
			zt.success(checked ? "Profile image is now public" : "Profile image visibility disabled");
		} catch (e) {
			zt.error(e.message || "Failed to toggle avatar visibility");
		} finally {
			setSavingAvatar(false);
		}
	};
	const handleToggleContact = async (checked) => {
		if (!user?.$id) return;
		if (checked) {
			if (!ecosystemSecurity.status.isUnlocked) {
				setIsSudoOpen(true);
				return;
			}
			setSavingContact(true);
			try {
				const pub = await ecosystemSecurity.ensureE2EIdentity(user.$id);
				if (pub) {
					setProfile(await UsersService.updateProfile(user.$id, { publicKey: pub }) || {
						...profile,
						publicKey: pub
					});
					zt.success("People can now contact you securely");
				}
			} catch (e) {
				zt.error("Failed to enable contact: " + e.message);
			} finally {
				setSavingContact(false);
			}
		} else {
			setSavingContact(true);
			try {
				setProfile(await UsersService.updateProfile(user.$id, { publicKey: "" }) || {
					...profile,
					publicKey: ""
				});
				zt.success("Secure contact disabled");
			} catch (e) {
				zt.error("Failed to disable contact: " + e.message);
			} finally {
				setSavingContact(false);
			}
		}
	};
	const handleSyncE2E = async () => {
		if (!user?.$id || !profile) return;
		if (!ecosystemSecurity.status.isUnlocked) {
			zt.error("Unlock your vault to enable secure discoverability");
			return;
		}
		setSaving(true);
		setSyncError(null);
		try {
			const pub = await ecosystemSecurity.ensureE2EIdentity(user.$id);
			if (pub) {
				setProfile({
					...profile,
					publicKey: pub
				});
				zt.success("E2E Identity initialized");
			} else setSyncError("Identity exists locally but could not be published.");
		} catch (e) {
			console.error("Sync error:", e);
			setSyncError(e.message || "Failed to sync identity keys");
			zt.error("Failed to initialize identity");
		} finally {
			setSaving(false);
		}
	};
	const handleSaveUsername = async () => {
		if (!user?.$id || !newUsername) return;
		const normalized = newUsername.toLowerCase().trim().replace(/^@/, "").replace(/[^a-z0-9_]/g, "");
		if (normalized.length < 3) {
			zt.error("Username must be at least 3 characters");
			return;
		}
		setSaving(true);
		try {
			let publicKey;
			try {
				if (ecosystemSecurity.status.isUnlocked) {
					const pub = await ecosystemSecurity.ensureE2EIdentity(user.$id);
					if (pub) publicKey = pub;
				}
			} catch (e) {
				console.warn("Could not sync public key during handle change", e);
			}
			if (profile) {
				const updated = await UsersService.updateProfile(user.$id, {
					username: normalized,
					publicKey
				});
				setUsername(normalized);
				setProfile(updated || {
					...profile,
					username: normalized,
					publicKey
				});
				zt.success("Handle updated");
			} else {
				setProfile(await UsersService.createProfile(user.$id, normalized, {
					displayName: user.name || normalized.charAt(0).toUpperCase() + normalized.slice(1),
					publicKey
				}));
				setUsername(normalized);
				zt.success("Universal identity initialized!");
			}
			setIsEditing(false);
			setShowConfirm(false);
		} catch (e) {
			zt.error(e.message || "Failed to save handle");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 24 });
	const isDiscoverable = profile?.$permissions?.some((p) => p.includes("read(\"any\")"));
	const isAvatarVisible = !!profile?.avatar;
	const isContactable = !!profile?.publicKey;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
			variant: "h6",
			sx: {
				fontWeight: 700,
				mb: 2,
				display: "flex",
				alignItems: "center",
				gap: 1
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				size: 20,
				color: "#00F0FF"
			}), " Discoverability"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			sx: {
				p: 3,
				borderRadius: "24px",
				bgcolor: "rgba(255, 255, 255, 0.02)",
				border: "1px solid rgba(255, 255, 255, 0.05)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				spacing: 3,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								display: "flex",
								gap: 2,
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									p: 1,
									borderRadius: "12px",
									bgcolor: alpha("#00F0FF", .1),
									color: "#00F0FF"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 18 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "subtitle1",
								sx: { fontWeight: 800 },
								children: "Global Discoverability"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									opacity: .5,
									fontSize: "0.8rem"
								},
								children: "Allow anyone in Kylrix to find your profile"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: !!isDiscoverable,
							onChange: (e) => handleToggleDiscoverability(e.target.checked),
							disabled: savingDiscoverable,
							color: "primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { opacity: .05 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								display: "flex",
								gap: 2,
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									p: 1,
									borderRadius: "12px",
									bgcolor: alpha("#F43F5E", .1),
									color: "#F43F5E"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { size: 18 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "subtitle1",
								sx: { fontWeight: 800 },
								children: "Profile Image Visibility"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									opacity: .5,
									fontSize: "0.8rem"
								},
								children: "Show your universal avatar to others"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: !!isAvatarVisible,
							onChange: (e) => handleToggleAvatarVisibility(e.target.checked),
							disabled: savingAvatar,
							sx: {
								"& .MuiSwitch-switchBase.Mui-checked": { color: "#F43F5E" },
								"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#F43F5E" }
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { opacity: .05 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								display: "flex",
								gap: 2,
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									p: 1,
									borderRadius: "12px",
									bgcolor: alpha("#6366F1", .1),
									color: "#6366F1"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 18 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "subtitle1",
								sx: { fontWeight: 800 },
								children: "Allow Contact"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									opacity: .5,
									fontSize: "0.8rem"
								},
								children: "Allow others to send you encrypted messages"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: isContactable,
							onChange: (e) => handleToggleContact(e.target.checked),
							disabled: savingContact || !isContactable && !ecosystemSecurity.status.isUnlocked,
							sx: {
								opacity: !isContactable && !ecosystemSecurity.status.isUnlocked ? .5 : 1,
								filter: !isContactable && !ecosystemSecurity.status.isUnlocked ? "blur(0.5px)" : "none",
								"& .MuiSwitch-switchBase.Mui-checked": { color: "#6366F1" },
								"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#6366F1" }
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { opacity: .05 } }),
					profile && !profile.publicKey && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							mt: 1,
							mb: 1,
							p: 2,
							borderRadius: "20px",
							bgcolor: alpha("#E2B714", .05),
							border: "1px solid",
							borderColor: alpha("#E2B714", .15),
							display: "flex",
							flexDirection: "column",
							gap: 1.5
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							spacing: 2,
							alignItems: "center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									sx: {
										p: 1,
										borderRadius: "12px",
										bgcolor: alpha("#E2B714", .1),
										color: "#E2B714",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 20 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									sx: { flex: 1 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "subtitle2",
										sx: {
											fontWeight: 800,
											color: "#E2B714",
											letterSpacing: "-0.01em"
										},
										children: "Communication Sync Incomplete"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: {
											color: "rgba(255, 255, 255, 0.5)",
											lineHeight: 1.4
										},
										children: "Your handle is reserved, but your E2E encryption keys aren't published. Others cannot send you encrypted messages yet."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "small",
									variant: "contained",
									onClick: handleSyncE2E,
									disabled: saving,
									sx: {
										bgcolor: "#E2B714",
										color: "#000",
										"&:hover": { bgcolor: alpha("#E2B714", .8) },
										textTransform: "none",
										fontWeight: 800,
										borderRadius: "10px",
										px: 2,
										whiteSpace: "nowrap"
									},
									children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
										size: 16,
										color: "inherit"
									}) : "Sync Keys"
								})
							]
						}), syncError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								p: 1.5,
								borderRadius: "12px",
								bgcolor: alpha("#FF5252", .05),
								border: "1px solid",
								borderColor: alpha("#FF5252", .2)
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
								variant: "caption",
								sx: {
									color: "#FF5252",
									display: "flex",
									alignItems: "center",
									gap: 1,
									fontWeight: 600
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 }),
									" Sync Error: ",
									syncError
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								display: "flex",
								alignItems: "center",
								gap: 1,
								mb: 1
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
								size: 14,
								color: "rgba(255, 255, 255, 0.4)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "subtitle2",
								sx: {
									fontWeight: 800,
									color: "rgba(255, 255, 255, 0.5)",
									textTransform: "uppercase",
									fontSize: "0.65rem",
									letterSpacing: "0.05em"
								},
								children: "Universal Identity Handle"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								display: "flex",
								alignItems: "center",
								gap: 2,
								p: "2px 2px 2px 16px",
								borderRadius: "20px",
								bgcolor: "rgba(255, 255, 255, 0.03)",
								border: "1px solid rgba(255, 255, 255, 0.08)",
								transition: "all 0.2s ease-in-out",
								"&:focus-within": {
									borderColor: alpha("#00F0FF", .3),
									bgcolor: alpha("#00F0FF", .02)
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									flex: 1,
									py: 1.5
								},
								children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									fullWidth: true,
									size: "small",
									variant: "standard",
									value: newUsername,
									onChange: (e) => setNewUsername(e.target.value),
									placeholder: "Your handle",
									autoFocus: true,
									InputProps: {
										disableUnderline: true,
										startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											sx: {
												color: "#00F0FF",
												fontWeight: 900,
												mr: .5,
												fontSize: "1.1rem"
											},
											children: "@"
										}),
										endAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
											sx: {
												display: "flex",
												alignItems: "center",
												gap: 1,
												pr: 1
											},
											children: [
												checkingAvailability && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
													size: 14,
													sx: { color: "#00F0FF" }
												}),
												!checkingAvailability && isAvailable === true && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													size: 16,
													color: "#00F0FF",
													strokeWidth: 3
												}),
												!checkingAvailability && isAvailable === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
													size: 16,
													color: "#FF5252",
													strokeWidth: 3
												})
											]
										}),
										sx: {
											fontFamily: "var(--font-jetbrains-mono)",
											fontWeight: 800,
											fontSize: "1rem",
											color: "white",
											letterSpacing: "-0.02em"
										}
									}
								}), isAvailable === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										color: "#FF5252",
										fontWeight: 700,
										mt: .5,
										display: "block",
										textTransform: "uppercase",
										fontSize: "0.65rem",
										letterSpacing: "0.05em"
									},
									children: "Handle unavailable"
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
									sx: {
										fontFamily: "var(--font-jetbrains-mono)",
										fontWeight: 800,
										fontSize: "1.1rem",
										letterSpacing: "-0.03em",
										opacity: isDiscoverable || !profile ? 1 : .4,
										color: !profile ? "#E2B714" : "inherit"
									},
									children: ["@", username || "not_set"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										opacity: .3,
										display: "block",
										mt: .2,
										fontWeight: 600,
										textTransform: "uppercase",
										fontSize: "0.6rem",
										letterSpacing: "0.05em"
									},
									children: !profile ? "Identity Required" : "Verified Ecosystem Handle"
								})] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									display: "flex",
									gap: .5,
									pr: .5
								},
								children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									size: "small",
									onClick: () => {
										setIsEditing(false);
										setNewUsername(username);
										setIsAvailable(null);
									},
									sx: {
										color: "rgba(255, 255, 255, 0.3)",
										bgcolor: "rgba(255, 255, 255, 0.05)",
										borderRadius: "14px",
										p: 1.5,
										"&:hover": {
											bgcolor: alpha("#FF5252", .1),
											color: "#FF5252"
										}
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										size: 18,
										strokeWidth: 2.5
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									size: "small",
									onClick: () => setShowConfirm(true),
									disabled: saving || !newUsername || isAvailable === false || checkingAvailability || newUsername === username && !!profile,
									sx: {
										color: "#000",
										bgcolor: "#00F0FF",
										borderRadius: "14px",
										p: 1.5,
										"&:hover": { bgcolor: alpha("#00F0FF", .8) },
										"&.Mui-disabled": {
											bgcolor: "rgba(255, 255, 255, 0.05)",
											color: "rgba(255, 255, 255, 0.1)"
										}
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										size: 18,
										strokeWidth: 3
									})
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "small",
									onClick: () => setIsEditing(true),
									startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
										size: 14,
										strokeWidth: 2.5
									}),
									sx: {
										color: !profile ? "#000" : "#00F0FF",
										bgcolor: !profile ? "#E2B714" : alpha("#00F0FF", .05),
										borderRadius: "16px",
										px: 2,
										py: 1,
										fontWeight: 800,
										textTransform: "none",
										fontSize: "0.8rem",
										border: "1px solid",
										borderColor: !profile ? "#E2B714" : alpha("#00F0FF", .1),
										"&:hover": {
											bgcolor: !profile ? alpha("#E2B714", .8) : alpha("#00F0FF", .1),
											borderColor: !profile ? "#E2B714" : alpha("#00F0FF", .2)
										}
									},
									children: profile ? "Modify" : "Setup Identity"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								mt: 1,
								display: "block",
								opacity: .4
							},
							children: "This handle is shared across the entire Kylrix ecosystem."
						})
					] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SudoModal, {
			isOpen: isSudoOpen,
			onCancel: () => setIsSudoOpen(false),
			onSuccess: () => {
				setIsSudoOpen(false);
				handleToggleContact(true);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				mt: 3,
				p: 2,
				borderRadius: "16px",
				bgcolor: "rgba(255, 255, 255, 0.02)",
				border: "1px solid rgba(255, 255, 255, 0.05)",
				display: "flex",
				alignItems: "center",
				gap: 2
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
				src: profile?.avatar,
				alt: "Profile Preview",
				sx: {
					width: 48,
					height: 48,
					border: "2px solid rgba(255, 255, 255, 0.1)"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				variant: "subtitle2",
				sx: { fontWeight: 800 },
				children: "Profile Preview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				variant: "caption",
				sx: { opacity: .5 },
				children: "How you appear in search results"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: showConfirm,
			onClose: () => setShowConfirm(false),
			PaperProps: { sx: {
				borderRadius: "24px",
				bgcolor: "rgba(10, 10, 10, 0.95)",
				backdropFilter: "blur(20px)",
				border: "1px solid rgba(255, 255, 255, 0.1)",
				width: "100%",
				maxWidth: "400px"
			} },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					sx: {
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						fontWeight: 700,
						color: "white"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { color: "#00F0FF" }), " Confirm Identity Change"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "body2",
					sx: {
						opacity: .7,
						mb: 3,
						color: "white"
					},
					children: "Updating your universal handle will change how you are found across all Kylrix apps. This action cannot be easily undone."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						p: 2,
						borderRadius: "12px",
						bgcolor: "rgba(255, 255, 255, 0.03)",
						border: "1px dotted rgba(255, 255, 255, 0.2)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							opacity: .5,
							display: "block",
							mb: .5
						},
						children: "NEW UNIVERSAL HANDLE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
						sx: {
							fontFamily: "var(--font-jetbrains-mono)",
							fontWeight: 700,
							color: "#00F0FF"
						},
						children: ["@", newUsername.toLowerCase().trim()]
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogActions, {
					sx: {
						p: 3,
						pt: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setShowConfirm(false),
						sx: { color: "rgba(255, 255, 255, 0.5)" },
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleSaveUsername,
						variant: "contained",
						disabled: saving,
						sx: {
							borderRadius: "12px",
							bgcolor: "#00F0FF",
							color: "#000",
							fontWeight: 700,
							"&:hover": { bgcolor: alpha("#00F0FF", .8) }
						},
						children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
							size: 20,
							color: "inherit"
						}) : "Update Identity"
					})]
				})
			]
		})
	] });
};
function SettingsPage() {
	const { user } = useAuth();
	useTheme();
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(ecosystemSecurity.status.isUnlocked);
	const [unlockModalOpen, setUnlockModalOpen] = (0, import_react.useState)(false);
	const [passkeySetupOpen, setPasskeySetupOpen] = (0, import_react.useState)(false);
	const [hasMasterpass, setHasMasterpass] = (0, import_react.useState)(null);
	const [passkeyEntries, setPasskeyEntries] = (0, import_react.useState)([]);
	const [_loadingPasskeys, setLoadingPasskeys] = (0, import_react.useState)(true);
	const loadPasskeys = import_react.useCallback(async () => {
		if (!user?.$id) return;
		try {
			setPasskeyEntries((await KeychainService.listKeychainEntries(user.$id)).filter((e) => e.type === "passkey").map((e) => ({
				...e,
				params: typeof e.params === "string" ? JSON.parse(e.params) : e.params
			})));
		} catch (e) {
			console.error("Failed to load passkeys", e);
		} finally {
			setLoadingPasskeys(false);
		}
	}, [user?.$id]);
	(0, import_react.useEffect)(() => {
		const unsubscribe = ecosystemSecurity.onStatusChange((status) => {
			if (status.isUnlocked !== isUnlocked) setIsUnlocked(status.isUnlocked);
		});
		if (user?.$id) {
			loadPasskeys();
			(async () => {
				try {
					setHasMasterpass(await KeychainService.hasMasterpass(user.$id));
				} catch (e) {
					console.error("Failed to check masterpass presence", e);
					setHasMasterpass(null);
				}
			})();
		}
		return unsubscribe;
	}, [
		isUnlocked,
		user,
		loadPasskeys
	]);
	const handleRemovePasskey = async (id) => {
		if (!window.confirm("Are you sure you want to remove this passkey? This cannot be undone.")) return;
		try {
			await KeychainService.deleteKeychainEntry(id);
			n.success("Passkey removed");
			loadPasskeys();
		} catch (_e) {
			n.error("Failed to remove passkey");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				maxWidth: 800,
				mx: "auto",
				py: 4,
				px: 2
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				variant: "h4",
				sx: {
					fontWeight: 900,
					mb: 4,
					fontFamily: "var(--font-space-grotesk)"
				},
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				spacing: 4,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoverabilitySettings, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
						variant: "h6",
						sx: {
							fontWeight: 700,
							mb: 2,
							display: "flex",
							alignItems: "center",
							gap: 1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							size: 20,
							color: "var(--color-primary)"
						}), " Security & Privacy"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						sx: {
							p: 3,
							borderRadius: "24px",
							bgcolor: "rgba(255, 255, 255, 0.02)",
							border: "1px solid rgba(255, 255, 255, 0.05)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							spacing: 3,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									sx: {
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "subtitle1",
										sx: { fontWeight: 700 },
										children: "Vault Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "body2",
										sx: { opacity: .6 },
										children: "Current encryption state of your session"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: isUnlocked ? "outlined" : "contained",
										onClick: () => isUnlocked ? ecosystemSecurity.lock() : setUnlockModalOpen(true),
										color: isUnlocked ? "inherit" : "primary",
										startIcon: isUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 16 }),
										sx: { borderRadius: "12px" },
										children: isUnlocked ? "Lock Vault" : hasMasterpass === false ? "Setup" : "Unlock Vault"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { opacity: .05 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									sx: {
										display: "flex",
										justifyContent: "space-between",
										alignItems: "flex-start",
										mb: 2
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "subtitle1",
										sx: { fontWeight: 700 },
										children: "Passkeys"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "body2",
										sx: { opacity: .6 },
										children: "Use biometrics to unlock your secure session."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "contained",
										size: "small",
										startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { size: 16 }),
										onClick: () => setPasskeySetupOpen(true),
										disabled: hasMasterpass === false,
										sx: { borderRadius: "10px" },
										children: "Add Passkey"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									sx: {
										bgcolor: "rgba(255, 255, 255, 0.02)",
										borderRadius: "16px",
										p: 0,
										overflow: "hidden"
									},
									children: passkeyEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
										sx: {
											p: 2,
											textAlign: "center",
											opacity: .5
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "body2",
											children: "No passkeys registered."
										})
									}) : passkeyEntries.map((pk, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
										secondaryAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											edge: "end",
											color: "error",
											onClick: () => handleRemovePasskey(pk.$id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 18 })
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, {
											size: 20,
											color: "var(--color-primary)"
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, {
											primary: pk.params?.name || `Passkey ${idx + 1}`,
											secondary: "Active",
											primaryTypographyProps: {
												fontWeight: 700,
												fontSize: "0.9rem"
											},
											secondaryTypographyProps: { fontSize: "0.75rem" }
										})]
									}), idx < passkeyEntries.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { opacity: .05 } })] }, pk.$id))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { opacity: .05 } })
							]
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
						variant: "h6",
						sx: {
							fontWeight: 700,
							mb: 2,
							display: "flex",
							alignItems: "center",
							gap: 1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
							size: 20,
							color: "var(--color-electric)"
						}), " App Preferences"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
						sx: {
							p: 3,
							borderRadius: "24px",
							bgcolor: "rgba(255, 255, 255, 0.02)",
							border: "1px solid rgba(255, 255, 255, 0.05)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							spacing: 2,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlLabel, {
									control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										defaultChecked: true,
										color: "primary"
									}),
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "body1",
										sx: { fontWeight: 600 },
										children: "Push Notifications"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: { opacity: .6 },
										children: "Get notified of new messages"
									})] }),
									sx: {
										justifyContent: "space-between",
										width: "100%",
										ml: 0,
										flexDirection: "row-reverse"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { opacity: .05 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlLabel, {
									control: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										defaultChecked: true,
										color: "primary"
									}),
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "body1",
										sx: { fontWeight: 600 },
										children: "Active Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: { opacity: .6 },
										children: "Show when you are online"
									})] }),
									sx: {
										justifyContent: "space-between",
										width: "100%",
										ml: 0,
										flexDirection: "row-reverse"
									}
								})
							]
						})
					})] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasskeySetup, {
			isOpen: passkeySetupOpen,
			onClose: () => setPasskeySetupOpen(false),
			userId: user?.$id || "",
			onSuccess: () => {
				setPasskeySetupOpen(false);
				loadPasskeys();
			},
			trustUnlocked: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SudoModal, {
			isOpen: unlockModalOpen,
			onSuccess: () => {
				setUnlockModalOpen(false);
				setIsUnlocked(true);
			},
			onCancel: () => setUnlockModalOpen(false)
		})
	] });
}
var SplitComponent = SettingsPage;
//#endregion
export { SplitComponent as component };
