import { o as __toESM } from "../_runtime.mjs";
import { n as account } from "./client-bVtyOxJQ.mjs";
import { a as getEcosystemUrl, i as getCachedIdentityByUsername, n as UsersService, o as seedIdentityCache, s as subscribeIdentityCache } from "./users-vRrLGFai.mjs";
import { n as ecosystemSecurity } from "./security-DTzL0999.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { A as CheckCircle_default, H as useTheme, J as alpha, t as Error_default, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { B as Box, C as InputAdornment, E as Drawer, K as Typography, N as Container, X as Paper, Y as CircularProgress, f as Skeleton, n as TextField, p as MenuItem, q as Alert, s as Stack, t as useMediaQuery, z as Button } from "../_libs/@mui/material+[...].mjs";
import { a as useParams$1, c as useSearchParams, i as useAuth, s as useRouter } from "./chat-GLmU6cBO.mjs";
import { B as MessageCircle, O as Repeat2, P as PenLine, Q as Heart, S as ShieldAlert, jt as Activity, l as UserPlus, tt as Flag, w as Settings, z as MessageSquare } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion+[...].mjs";
import { O as useProfile, _ as fetchProfilePreview, a as IdentityName, g as computeIdentityFlags, i as IdentityAvatar, v as getCachedProfilePreview, x as stageProfileView, y as getProfileView } from "./DynamicIsland-DPFhB0ig.mjs";
import { r as getUserProfilePicId, t as AppShell } from "./AppShell-JgOEZgrs.mjs";
import { n as SocialService, t as ActorsListDrawer } from "./ActorsListDrawer-NQvy58wX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/u._username-BRDOvtdu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EditProfileModal = ({ open, onClose, profile, onUpdate }) => {
	const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
	const { user } = useAuth();
	const [username, setUsername] = (0, import_react.useState)(profile?.username || "");
	const [bio, setBio] = (0, import_react.useState)(profile?.bio || "");
	const [displayName, setDisplayName] = (0, import_react.useState)(profile?.displayName || "");
	const [isChecking, setIsChecking] = (0, import_react.useState)(false);
	const [isAvailable, setIsAvailable] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (profile) {
			setUsername(profile.username || "");
			setBio(profile.bio || "");
			setDisplayName(profile.displayName || "");
		}
	}, [profile, open]);
	(0, import_react.useEffect)(() => {
		const checkUsername = async () => {
			if (!username || username === profile?.username) {
				setIsAvailable(null);
				return;
			}
			if (username.length < 3) {
				setIsAvailable(false);
				return;
			}
			setIsChecking(true);
			try {
				setIsAvailable(await UsersService.isUsernameAvailable(username));
			} catch (err) {
				console.error("Failed to check username:", err);
			} finally {
				setIsChecking(false);
			}
		};
		const timer = setTimeout(checkUsername, 500);
		return () => clearTimeout(timer);
	}, [username, profile?.username]);
	const handleSave = async () => {
		if (!profile?.$id) return;
		if (username !== profile.username && isAvailable === false) {
			setError("Please pick an available username");
			return;
		}
		setLoading(true);
		setError("");
		try {
			const userId = profile.userId || profile.$id;
			let publicKey;
			try {
				if (ecosystemSecurity.status.isUnlocked) {
					const pub = await ecosystemSecurity.ensureE2EIdentity(userId);
					if (pub) publicKey = pub;
				}
			} catch (e) {
				console.warn("Could not sync public key during profile update", e);
			}
			await UsersService.updateProfile(userId, {
				username,
				bio,
				displayName,
				publicKey
			});
			try {
				if (displayName || username) {
					if (displayName) await account.updateName(displayName);
					const currentPrefs = user?.prefs || {};
					await account.updatePrefs({
						...currentPrefs,
						username: username.toLowerCase().trim()
					});
				}
			} catch (prefErr) {
				console.warn("Failed to sync display name or username to account prefs", prefErr);
			}
			onUpdate();
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update profile");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		anchor: isMobile ? "bottom" : "right",
		open,
		onClose,
		PaperProps: { sx: {
			width: isMobile ? "100%" : "min(100vw, 500px)",
			maxWidth: "100%",
			height: isMobile ? "auto" : "100%",
			maxHeight: isMobile ? "92dvh" : "100%",
			borderRadius: isMobile ? "24px 24px 0 0" : "0",
			display: "flex",
			flexDirection: "column"
		} },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					fontWeight: "bold",
					px: 3,
					pt: 3,
					pb: 2,
					borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
					flexShrink: 0
				},
				children: "Edit Profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					px: 3,
					py: 2,
					flex: 1,
					overflowY: "auto"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						display: "flex",
						flexDirection: "column",
						gap: 3,
						pt: 1
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Username",
							fullWidth: true,
							value: username,
							onChange: (e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-0_]/g, "")),
							error: isAvailable === false && username !== profile?.username,
							helperText: isAvailable === false && username !== profile?.username ? "Username is already taken" : "Only letters, numbers, and underscores allowed",
							InputProps: {
								startAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
									position: "start",
									children: "@"
								}),
								endAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputAdornment, {
									position: "end",
									children: [
										isChecking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 20 }),
										!isChecking && isAvailable === true && username !== profile?.username && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCircle_default, { color: "success" }),
										!isChecking && isAvailable === false && username !== profile?.username && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Error_default, { color: "error" })
									]
								})
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Display Name",
							fullWidth: true,
							value: displayName,
							onChange: (e) => setDisplayName(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Bio",
							fullWidth: true,
							multiline: true,
							rows: 4,
							value: bio,
							onChange: (e) => setBio(e.target.value),
							placeholder: "Tell the world about yourself..."
						})
					]
				}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					color: "error",
					variant: "body2",
					sx: { mt: 2 },
					children: error
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					p: 3,
					display: "flex",
					gap: 1,
					borderTop: "1px solid rgba(255, 255, 255, 0.05)",
					flexShrink: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onClose,
					disabled: loading,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "contained",
					onClick: handleSave,
					disabled: loading || isAvailable === false && username !== profile?.username,
					sx: { boxShadow: "none" },
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 24 }) : "Save Changes"
				})]
			})
		]
	});
};
function ReportUserDialog({ open, onClose, targetUserId, targetUsername, contextType = "profile", contextId = null, contextUrl = null, sourceApp = "connect" }) {
	const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
	const [reason, setReason] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [selectedContextType, setSelectedContextType] = (0, import_react.useState)(contextType);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)(null);
	const helperText = (0, import_react.useMemo)(() => {
		return "Reports start as unverified and stay that way until moderation reviews them. They do not change reputation on submission.";
	}, []);
	const handleSubmit = async () => {
		if (!targetUserId) return;
		if (!reason.trim()) {
			setMessage("Please provide a reason.");
			return;
		}
		setSubmitting(true);
		setMessage(null);
		try {
			const res = await fetch(`${getEcosystemUrl("accounts")}/api/reports`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					targetUserIds: [targetUserId],
					reason: reason.trim(),
					notes: notes.trim() || void 0,
					contextType: selectedContextType,
					contextId: contextId || void 0,
					contextUrl: contextUrl || void 0,
					sourceApp,
					metadata: {
						targetUsername,
						sourceApp
					}
				})
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(data?.error || "Failed to submit report");
			setMessage("Report submitted as unverified.");
			setReason("");
			setNotes("");
		} catch (error) {
			setMessage(error?.message || "Failed to submit report");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		anchor: isMobile ? "bottom" : "right",
		open,
		onClose,
		PaperProps: { sx: {
			width: isMobile ? "100%" : "min(100vw, 500px)",
			maxWidth: "100%",
			height: isMobile ? "auto" : "100%",
			maxHeight: isMobile ? "92dvh" : "100%",
			borderRadius: isMobile ? "24px 24px 0 0" : "0",
			display: "flex",
			flexDirection: "column"
		} },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					fontWeight: 900,
					display: "flex",
					alignItems: "center",
					gap: 1,
					px: 3,
					pt: 3,
					pb: 2,
					borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
					flexShrink: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { size: 18 }),
					"Report @",
					targetUsername
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					px: 3,
					py: 2,
					flex: 1,
					overflowY: "auto"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					spacing: 2.25,
					sx: { pt: 1 },
					children: [
						message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
							severity: "info",
							children: message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: { color: "text.secondary" },
							children: helperText
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TextField, {
							select: true,
							label: "Report context",
							value: selectedContextType,
							onChange: (e) => setSelectedContextType(e.target.value),
							fullWidth: true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
									value: "profile",
									children: "Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
									value: "message",
									children: "DM / Chat"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
									value: "post",
									children: "Post"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
									value: "comment",
									children: "Comment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
									value: "other",
									children: "Other"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Reason",
							value: reason,
							onChange: (e) => setReason(e.target.value),
							fullWidth: true,
							multiline: true,
							minRows: 3,
							placeholder: "Why are you reporting this user?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Extra notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							fullWidth: true,
							multiline: true,
							minRows: 3,
							placeholder: "Optional supporting detail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								p: 2,
								borderRadius: "16px",
								bgcolor: alpha("#6366F1", .06),
								border: "1px solid rgba(99,102,241,0.12)",
								display: "flex",
								gap: 1.5,
								alignItems: "flex-start"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								size: 18,
								color: "#6366F1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: { color: "text.secondary" },
								children: "The report is stored as a pending account event and will not affect reputation until moderation changes its state."
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					p: 3,
					display: "flex",
					gap: 1,
					borderTop: "1px solid rgba(255, 255, 255, 0.05)",
					flexShrink: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onClose,
					disabled: submitting,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "contained",
					onClick: handleSubmit,
					disabled: submitting || !reason.trim(),
					sx: { fontWeight: 800 },
					children: submitting ? "Submitting..." : "Submit Report"
				})]
			})
		]
	});
}
var normalizeUsername = (value) => {
	if (!value) return null;
	return value.toString().trim().replace(/^@+/, "").toLowerCase().replace(/[^a-z0-9_-]/g, "") || null;
};
var Profile = ({ username }) => {
	const { user: currentUser } = useAuth();
	const { profile: myProfile, refreshProfile: refreshMyProfile } = useProfile();
	const router = useRouter();
	const searchParams = useSearchParams();
	const normalizedUsername = normalizeUsername(username);
	const preloadedProfile = normalizedUsername ? getProfileView(normalizedUsername)?.profile || null : null;
	const cachedUsernameProfile = normalizedUsername ? getCachedIdentityByUsername(normalizedUsername) : null;
	const [profile, setProfile] = (0, import_react.useState)(() => preloadedProfile || cachedUsernameProfile);
	const [profileUrl, setProfileUrl] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(() => !normalizedUsername || !(preloadedProfile || cachedUsernameProfile));
	const [isFollowing, setIsFollowing] = (0, import_react.useState)(false);
	const [followLoading, setFollowLoading] = (0, import_react.useState)(false);
	const [isEditModalOpen, setIsEditModalOpen] = (0, import_react.useState)(false);
	const [isReportModalOpen, setIsReportModalOpen] = (0, import_react.useState)(false);
	const [moments, setMoments] = (0, import_react.useState)([]);
	const [momentsLoading, setMomentsLoading] = (0, import_react.useState)(false);
	const [stats, setStats] = (0, import_react.useState)({
		posts: 0,
		followers: 0,
		following: 0
	});
	const [actorsDrawerOpen, setActorsDrawerOpen] = (0, import_react.useState)(false);
	const [actorsTitle, setActorsTitle] = (0, import_react.useState)("");
	const [actorsList, setActorsList] = (0, import_react.useState)([]);
	const morphFromPanel = searchParams.get("transition") === "profile";
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const profilePicId = profile?.avatar || getUserProfilePicId(currentUser);
		const cached = getCachedProfilePreview(profilePicId || void 0);
		if (cached !== void 0 && mounted) setProfileUrl(cached ?? null);
		const fetchPreview = async () => {
			try {
				if (profilePicId?.startsWith("http")) setProfileUrl(profilePicId);
				else if (profilePicId) {
					const url = await fetchProfilePreview(profilePicId, 140, 140);
					if (mounted) setProfileUrl(url);
				} else if (mounted) setProfileUrl(null);
			} catch (_err) {
				if (mounted) setProfileUrl(null);
			}
		};
		fetchPreview();
		return () => {
			mounted = false;
		};
	}, [profile, currentUser]);
	(0, import_react.useEffect)(() => {
		return subscribeIdentityCache((identity) => {
			if (normalizedUsername && identity.username === normalizedUsername) setProfile(identity);
			else if (profile?.userId && identity.userId === profile.userId) setProfile(identity);
		});
	}, [normalizedUsername, profile?.userId]);
	const isOwnProfile = Boolean(currentUser && profile && profile.userId && currentUser.$id && profile.userId === currentUser.$id);
	const identityFlags = computeIdentityFlags({
		createdAt: profile?.$createdAt || profile?.createdAt || null,
		lastUsernameEdit: profile?.last_username_edit || profile?.preferences?.last_username_edit || null,
		profilePicId: profile?.avatar || profile?.profilePicId || null,
		username: profile?.username || null,
		bio: profile?.bio || null,
		tier: profile?.tier || null,
		publicKey: profile?.publicKey || null,
		preferences: profile?.preferences || null
	});
	const loadRelatedData = (0, import_react.useCallback)(async (data) => {
		if (!data) return;
		const targetId = data.userId || data.$id;
		if (!targetId) return;
		setMomentsLoading(true);
		try {
			const [feedRes, followStats, followingStatus] = await Promise.all([
				SocialService.getFeed(currentUser?.$id, targetId),
				SocialService.getFollowStats(targetId),
				currentUser ? SocialService.isFollowing(currentUser.$id, targetId) : Promise.resolve(false)
			]);
			setMoments(feedRes.rows);
			setStats({
				posts: feedRes.total,
				followers: typeof followStats.followers === "number" ? followStats.followers : followStats.followerRows ? followStats.followerRows.length : 0,
				following: typeof followStats.following === "number" ? followStats.following : followStats.followingRows ? followStats.followingRows.length : 0
			});
			setIsFollowing(Boolean(followingStatus));
		} catch (error) {
			console.error("Failed to load profile activity:", error);
		} finally {
			setMomentsLoading(false);
		}
	}, [currentUser]);
	const loadProfile = (0, import_react.useCallback)(async () => {
		const stagedProfile = normalizedUsername ? preloadedProfile || cachedUsernameProfile : null;
		if (stagedProfile) {
			seedIdentityCache(stagedProfile);
			stageProfileView(stagedProfile, null);
			setProfile(stagedProfile);
			setLoading(false);
			loadRelatedData(stagedProfile);
			return;
		}
		setLoading(true);
		try {
			let data;
			if (normalizedUsername) data = await UsersService.getProfile(normalizedUsername);
			else if (currentUser) {
				data = await UsersService.forceSyncProfileWithIdentity(currentUser) || (myProfile && myProfile.userId === currentUser.$id ? myProfile : null);
				if (!data) data = await UsersService.ensureProfileForUser(currentUser);
			}
			if (data) {
				seedIdentityCache(data);
				stageProfileView(data, profileUrl || null);
				setProfile((prev) => {
					if (prev && prev.$id === data.$id && prev.username === data.username && prev.bio === data.bio && prev.displayName === data.displayName && prev.avatar === data.avatar) return prev;
					return data;
				});
				stageProfileView(data, null);
				loadRelatedData(data);
			} else setProfile(null);
		} catch (error) {
			console.error("Failed to load profile:", error);
		} finally {
			setLoading(false);
		}
	}, [
		cachedUsernameProfile,
		currentUser,
		loadRelatedData,
		myProfile,
		normalizedUsername,
		preloadedProfile
	]);
	(0, import_react.useEffect)(() => {
		loadProfile();
	}, [loadProfile]);
	const getTargetId = () => profile?.userId || profile?.$id;
	const handleFollow = async () => {
		if (!currentUser || !profile) return;
		setFollowLoading(true);
		try {
			const targetId = getTargetId();
			if (!targetId) return;
			if (isFollowing) {
				await SocialService.unfollowUser(currentUser.$id, targetId);
				setIsFollowing(false);
			} else {
				await SocialService.followUser(currentUser.$id, targetId);
				setIsFollowing(true);
			}
			try {
				const newStats = await SocialService.getFollowStats(targetId);
				setStats((prev) => ({
					...prev,
					followers: newStats.followers,
					following: newStats.following
				}));
			} catch (e) {
				console.warn("Failed to refresh follow stats after follow/unfollow", e);
			}
		} catch (error) {
			console.error("Follow operation failed:", error);
		} finally {
			setFollowLoading(false);
		}
	};
	const handleOpenFollowers = async () => {
		const targetId = getTargetId();
		if (!targetId) return;
		setActorsTitle("Followers");
		setActorsDrawerOpen(true);
		setActorsList([]);
		setActorsList(await SocialService.getFollowers(targetId, currentUser?.$id));
	};
	const handleOpenFollowing = async () => {
		const targetId = getTargetId();
		if (!targetId) return;
		setActorsTitle("Following");
		setActorsDrawerOpen(true);
		setActorsList([]);
		setActorsList(await SocialService.getFollowing(targetId, currentUser?.$id));
	};
	const handleActorAction = async (actor, type) => {
		if (!currentUser) return;
		const targetId = actor.userId || actor.$id;
		if (type === "follow") await SocialService.followUser(currentUser.$id, targetId);
		else await SocialService.unfollowUser(currentUser.$id, targetId);
		setActorsList((prev) => prev.map((a) => a.$id === actor.$id || a.userId === actor.userId ? {
			...a,
			isFollowing: type === "follow"
		} : a));
		if (getTargetId() === targetId) setIsFollowing(type === "follow");
		const newStats = await SocialService.getFollowStats(getTargetId());
		setStats((prev) => ({
			...prev,
			followers: newStats.followers,
			following: newStats.following
		}));
	};
	const handleMessage = () => {
		if (!profile) return;
		const targetId = profile.userId || profile.$id;
		router.push(`/chats?userId=${targetId}`);
	};
	if (loading && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			maxWidth: 800,
			mx: "auto",
			p: 2,
			pt: 4
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			sx: {
				p: 4,
				borderRadius: "32px",
				mb: 4,
				bgcolor: "#161412",
				border: "1px solid rgba(255, 255, 255, 0.05)"
			},
			elevation: 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				direction: "row",
				spacing: 2,
				alignItems: "center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					variant: "rounded",
					width: 72,
					height: 72,
					sx: {
						borderRadius: "20px",
						bgcolor: "rgba(255,255,255,0.05)"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: { flex: 1 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							width: "35%",
							height: 32,
							sx: { bgcolor: "rgba(255,255,255,0.05)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							width: "20%",
							sx: { bgcolor: "rgba(255,255,255,0.05)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							width: "50%",
							sx: { bgcolor: "rgba(255,255,255,0.05)" }
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			spacing: 2,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				variant: "rounded",
				height: 140,
				sx: {
					borderRadius: 4,
					bgcolor: "rgba(255,255,255,0.05)"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				variant: "rounded",
				height: 140,
				sx: {
					borderRadius: 4,
					bgcolor: "rgba(255,255,255,0.05)"
				}
			})]
		})]
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			textAlign: "center",
			py: 8
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				variant: "h5",
				gutterBottom: true,
				children: "Profile not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
				color: "text.secondary",
				children: [
					"The user @",
					username,
					" doesn't exist in our ecosystem."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				sx: { mt: 2 },
				variant: "contained",
				onClick: () => router.push("/"),
				children: "Go Home"
			})
		]
	});
	const handleNavigateToPublic = () => {
		if (!profile) return;
		const uname = profile.username;
		if (uname) {
			if (window.location.pathname === `/u/${uname}`) return;
			router.push(`/u/${encodeURIComponent(uname)}`);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: morphFromPanel ? {
			opacity: 0,
			y: 18,
			scale: .985
		} : false,
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		transition: {
			type: "spring",
			stiffness: 280,
			damping: 28
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
			sx: {
				maxWidth: 800,
				mx: "auto",
				p: 2,
				pt: 4
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
					sx: {
						p: 4,
						borderRadius: "32px",
						mb: 4,
						background: "#161412",
						backdropFilter: "blur(20px)",
						border: "1px solid rgba(255, 255, 255, 0.05)",
						position: "relative",
						overflow: "hidden",
						boxShadow: "0 1px 0 rgba(0,0,0,0.4)",
						"&::before": {
							content: "\"\"",
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							height: "1px",
							background: "rgba(255,255,255,0.05)",
							borderRadius: "32px"
						}
					},
					elevation: 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
						position: "absolute",
						top: -100,
						right: -100,
						width: 200,
						height: 200,
						background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0) 70%)",
						filter: "blur(40px)",
						zIndex: 0
					} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							display: "flex",
							flexDirection: {
								xs: "column",
								sm: "row"
							},
							alignItems: "center",
							gap: 4,
							position: "relative",
							zIndex: 1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							onClick: handleNavigateToPublic,
							sx: { cursor: "pointer" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityAvatar, {
								src: profileUrl || profile.avatar,
								alt: profile.displayName || profile.username || "profile",
								fallback: (profile.displayName || profile.username || "U").charAt(0).toUpperCase(),
								verified: identityFlags.verified,
								verifiedOn: identityFlags.verifiedOn,
								pro: identityFlags.pro,
								size: 140,
								verifiedSize: 22,
								borderRadius: "28px"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								flex: 1,
								textAlign: {
									xs: "center",
									sm: "left"
								}
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									onClick: handleNavigateToPublic,
									variant: "h3",
									sx: {
										fontWeight: 900,
										mb: .5,
										fontFamily: "var(--font-clash)",
										letterSpacing: "-0.04em"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityName, {
										verified: identityFlags.verified,
										verifiedOn: identityFlags.verifiedOn,
										sx: { fontWeight: 900 },
										children: profile.displayName || profile.username || "Anonymous"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
									variant: "body1",
									sx: {
										opacity: .5,
										mb: 2,
										fontWeight: 600,
										fontFamily: "var(--font-mono)",
										fontSize: "0.9rem"
									},
									children: ["@", profile.username]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body1",
									sx: {
										mt: 2,
										lineHeight: 1.6,
										color: "var(--color-gunmetal)",
										maxWidth: "500px",
										opacity: profile?.__isFallback ? .4 : 1
									},
									children: profile.bio || (profile?.__isFallback ? "This identity is private within Connect." : "No bio yet. This user prefers to stay mysterious.")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
									sx: {
										display: "flex",
										gap: 1.5,
										mt: 4,
										justifyContent: {
											xs: "center",
											sm: "flex-start"
										},
										flexWrap: "wrap"
									},
									children: isOwnProfile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "contained",
										startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 18 }),
										sx: {
											borderRadius: "14px",
											px: 3,
											py: 1,
											fontWeight: 700,
											bgcolor: "#F59E0B",
											color: "black",
											"&:hover": { bgcolor: alpha("#F59E0B", .8) }
										},
										onClick: () => setIsEditModalOpen(true),
										children: "Edit Profile"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outlined",
										startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 18 }),
										sx: {
											borderRadius: "14px",
											px: 3,
											py: 1,
											fontWeight: 700,
											borderColor: "rgba(255, 255, 255, 0.1)",
											color: "var(--color-titanium)",
											bgcolor: "rgba(255, 255, 255, 0.03)",
											"&:hover": {
												borderColor: "#6366F1",
												bgcolor: alpha("#6366F1", .05)
											}
										},
										onClick: () => {
											const domain = process.env.NEXT_PUBLIC_DOMAIN || "kylrix.space";
											const idSubdomain = process.env.NEXT_PUBLIC_AUTH_SUBDOMAIN || "accounts";
											window.location.href = `https://${idSubdomain}.${domain}/settings?source=${encodeURIComponent(window.location.origin)}`;
										},
										children: "Settings"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: isFollowing ? "outlined" : "contained",
											startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 18 }),
											sx: {
												borderRadius: "14px",
												px: 3,
												py: 1,
												fontWeight: 700,
												bgcolor: isFollowing ? "transparent" : "#F59E0B",
												color: isFollowing ? "#F59E0B" : "black",
												borderColor: isFollowing ? "#F59E0B" : "none",
												"&:hover": { bgcolor: isFollowing ? alpha("#F59E0B", .05) : alpha("#F59E0B", .8) }
											},
											onClick: handleFollow,
											disabled: followLoading || !currentUser,
											children: isFollowing ? "Following" : "Follow"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outlined",
											startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 18 }),
											sx: {
												borderRadius: "14px",
												px: 3,
												py: 1,
												fontWeight: 700,
												borderColor: "rgba(255, 255, 255, 0.1)",
												color: "var(--color-titanium)",
												bgcolor: "rgba(255, 255, 255, 0.03)",
												"&:hover": {
													borderColor: "#6366F1",
													bgcolor: alpha("#6366F1", .05)
												}
											},
											onClick: handleMessage,
											children: "Message"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outlined",
											startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { size: 18 }),
											sx: {
												borderRadius: "14px",
												px: 3,
												py: 1,
												fontWeight: 700,
												borderColor: "rgba(255, 255, 255, 0.1)",
												color: "var(--color-titanium)",
												bgcolor: "rgba(255, 255, 255, 0.03)",
												"&:hover": {
													borderColor: "#EF4444",
													bgcolor: alpha("#EF4444", .06)
												}
											},
											onClick: () => setIsReportModalOpen(true),
											disabled: !currentUser,
											children: "Report"
										})
									] })
								})
							]
						})]
					})]
				}),
				!isOwnProfile && profile?.userId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportUserDialog, {
					open: isReportModalOpen,
					onClose: () => setIsReportModalOpen(false),
					targetUserId: profile.userId || profile.$id,
					targetUsername: profile.username,
					contextType: "profile",
					contextId: profile.$id,
					contextUrl: typeof window !== "undefined" ? window.location.href : null,
					sourceApp: "connect"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
					variant: "h6",
					sx: {
						fontWeight: 800,
						mb: 3,
						fontFamily: "var(--font-clash)",
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						opacity: .8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
						size: 20,
						color: "#F59E0B"
					}), " Activity Stats"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					spacing: 2,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							sx: {
								p: 3,
								textAlign: "center",
								borderRadius: "24px",
								flex: 1,
								background: "#161412",
								border: "1px solid rgba(255, 255, 255, 0.05)",
								boxShadow: "0 1px 0 rgba(0,0,0,0.4)",
								position: "relative",
								"&::before": {
									content: "\"\"",
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									height: "1px",
									background: "rgba(255,255,255,0.05)",
									borderRadius: "24px"
								}
							},
							elevation: 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "h4",
								sx: {
									fontWeight: 900,
									color: "#F59E0B",
									fontFamily: "var(--font-clash)"
								},
								children: stats.posts
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									fontWeight: 700,
									opacity: .4,
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									mt: 1
								},
								children: "Posts"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							sx: {
								p: 3,
								textAlign: "center",
								borderRadius: "24px",
								flex: 1,
								background: "#161412",
								border: "1px solid rgba(255, 255, 255, 0.05)",
								boxShadow: "0 1px 0 rgba(0,0,0,0.4)",
								position: "relative",
								cursor: "pointer",
								transition: "all 0.2s ease",
								"&:hover": {
									bgcolor: "rgba(255, 255, 255, 0.03)",
									borderColor: "rgba(99, 102, 241, 0.3)"
								},
								"&::before": {
									content: "\"\"",
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									height: "1px",
									background: "rgba(255,255,255,0.05)",
									borderRadius: "24px"
								}
							},
							elevation: 0,
							onClick: handleOpenFollowers,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "h4",
								sx: {
									fontWeight: 900,
									color: "var(--color-primary)",
									fontFamily: "var(--font-clash)"
								},
								children: stats.followers
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									fontWeight: 700,
									opacity: .4,
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									mt: 1
								},
								children: "Followers"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							sx: {
								p: 3,
								textAlign: "center",
								borderRadius: "24px",
								flex: 1,
								background: "#161412",
								border: "1px solid rgba(255, 255, 255, 0.05)",
								boxShadow: "0 1px 0 rgba(0,0,0,0.4)",
								position: "relative",
								cursor: "pointer",
								transition: "all 0.2s ease",
								"&:hover": {
									bgcolor: "rgba(255, 255, 255, 0.03)",
									borderColor: "rgba(245, 158, 11, 0.3)"
								},
								"&::before": {
									content: "\"\"",
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									height: "1px",
									background: "rgba(255,255,255,0.05)",
									borderRadius: "24px"
								}
							},
							elevation: 0,
							onClick: handleOpenFollowing,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "h4",
								sx: {
									fontWeight: 900,
									color: "#F59E0B",
									fontFamily: "var(--font-clash)"
								},
								children: stats.following
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									fontWeight: 700,
									opacity: .4,
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									mt: 1
								},
								children: "Following"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: { mt: 6 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h6",
						sx: {
							fontWeight: 800,
							mb: 3,
							fontFamily: "var(--font-clash)",
							opacity: .8
						},
						children: "Moments"
					}), momentsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							display: "flex",
							justifyContent: "center",
							py: 4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { size: 24 })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						spacing: 2,
						children: [moments.map((moment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							onClick: () => router.push(`/post/${moment.$id}`),
							sx: {
								p: 2.5,
								borderRadius: 5,
								bgcolor: "rgba(255, 255, 255, 0.02)",
								border: "1px solid rgba(255, 255, 255, 0.05)",
								cursor: "pointer",
								transition: "all 0.2s ease",
								"&:hover": {
									bgcolor: "rgba(255, 255, 255, 0.04)",
									borderColor: "rgba(245, 158, 11, 0.3)",
									transform: "translateY(-2px)"
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								variant: "body2",
								sx: {
									mb: 2,
									color: "rgba(255, 255, 255, 0.9)",
									lineHeight: 1.6
								},
								children: moment.caption
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								spacing: 3,
								sx: { color: "text.disabled" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: .5,
										alignItems: "center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
											size: 14,
											fill: moment.isLiked ? "#F59E0B" : "none",
											color: moment.isLiked ? "#F59E0B" : "currentColor"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "caption",
											fontWeight: 700,
											children: moment.stats?.likes || 0
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: .5,
										alignItems: "center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "caption",
											fontWeight: 700,
											children: moment.stats?.replies || 0
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: .5,
										alignItems: "center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat2, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "caption",
											fontWeight: 700,
											children: moment.stats?.pulses || 0
										})]
									})
								]
							})]
						}, moment.$id)), moments.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							sx: {
								textAlign: "center",
								py: 4,
								opacity: .4,
								fontWeight: 600
							},
							children: "No moments shared yet."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProfileModal, {
					open: isEditModalOpen,
					onClose: () => setIsEditModalOpen(false),
					profile,
					onUpdate: () => {
						refreshMyProfile();
						loadProfile();
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActorsListDrawer, {
					open: actorsDrawerOpen,
					onClose: () => setActorsDrawerOpen(false),
					title: actorsTitle,
					actors: actorsList,
					onSelect: (actor) => {
						setActorsDrawerOpen(false);
						router.push(`/u/${actor.username}`);
					},
					onAction: handleActorAction
				})
			]
		})
	});
};
function UserProfilePage() {
	const username = useParams$1().username;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		maxWidth: "lg",
		sx: { py: 3 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, { username })
	}) });
}
var SplitComponent = UserProfilePage;
//#endregion
export { SplitComponent as component };
