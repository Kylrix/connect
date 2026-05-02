import { o as __toESM } from "../_runtime.mjs";
import { n as account } from "./client-bVtyOxJQ.mjs";
import { t as KYLRIX_AUTH_URI } from "./users-vRrLGFai.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { J as alpha, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { B as Box, H as Avatar, K as Typography, N as Container, X as Paper, s as Stack, z as Button } from "../_libs/@mui/material+[...].mjs";
import { a as useParams$1, i as useAuth, s as useRouter } from "./chat-GLmU6cBO.mjs";
import { Ot as ArrowRight, o as Users, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JgOEZgrs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/groups.invite._conversationId-Ysp5sHU4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GroupInvitePage() {
	const params = useParams$1();
	const router = useRouter();
	const conversationId = params.conversationId;
	const { user, loading } = useAuth();
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [requestState, setRequestState] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)(null);
	const buildAuthHeaders = async () => {
		const headers = {};
		const jwt = await account.createJWT().catch(() => null);
		if (jwt?.jwt) headers.Authorization = `Bearer ${jwt.jwt}`;
		return headers;
	};
	const inviteUrl = (0, import_react.useMemo)(() => {
		if (!conversationId || typeof window === "undefined") return "";
		return `${window.location.origin}/groups/invite/${conversationId}`;
	}, [conversationId]);
	(0, import_react.useEffect)(() => {
		if (loading || user || !inviteUrl) return;
		const loginUrl = new URL("/login", "https://accounts.kylrix.space");
		loginUrl.searchParams.set("source", inviteUrl);
		window.location.replace(loginUrl.toString());
	}, [
		inviteUrl,
		loading,
		user
	]);
	(0, import_react.useEffect)(() => {
		if (!conversationId || loading) return;
		let active = true;
		const loadPreview = async () => {
			setRequestState("loading");
			setError(null);
			try {
				const requesterId = user?.$id ? `&requesterId=${encodeURIComponent(user.$id)}` : "";
				const response = await fetch(`${KYLRIX_AUTH_URI}/api/connect/join-requests?resourceType=chat.conversation&resourceId=${encodeURIComponent(conversationId)}${requesterId}`, { credentials: "include" });
				const data = await response.json().catch(() => ({}));
				if (!response.ok) throw new Error(data.error || "Group does not exist");
				if (!active) return;
				setPreview(data.resource || null);
				if (data.alreadyJoined || data.request?.status === "accepted") setRequestState("joined");
				else if (data.request?.status === "pending") setRequestState("pending");
				else setRequestState("idle");
			} catch (loadError) {
				if (!active) return;
				setPreview(null);
				setRequestState("error");
				setError(loadError?.message || "Group does not exist");
			}
		};
		loadPreview();
		return () => {
			active = false;
		};
	}, [
		conversationId,
		loading,
		user?.$id
	]);
	const handleRequestJoin = async () => {
		if (!conversationId) return;
		setRequestState("loading");
		setError(null);
		try {
			const authHeaders = user ? await buildAuthHeaders() : {};
			const response = await fetch(`${KYLRIX_AUTH_URI}/api/connect/join-requests`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...authHeaders
				},
				credentials: "include",
				body: JSON.stringify({
					resourceType: "chat.conversation",
					resourceId: conversationId
				})
			});
			const data = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(data.error || "Failed to request access");
			if (data.alreadyJoined) {
				setRequestState("joined");
				router.push(`/chat/${conversationId}`);
				return;
			}
			setRequestState("pending");
		} catch (requestError) {
			setRequestState("error");
			setError(requestError?.message || "Failed to request access");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		maxWidth: "sm",
		sx: { py: 4 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			sx: {
				p: 3,
				borderRadius: 4,
				bgcolor: "#161412",
				border: "1px solid rgba(255,255,255,0.08)",
				backgroundImage: "none"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				spacing: 2.5,
				alignItems: "center",
				textAlign: "center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						src: preview?.avatarUrl || void 0,
						imgProps: { referrerPolicy: "no-referrer" },
						sx: {
							width: 72,
							height: 72,
							bgcolor: alpha("#F59E0B", .12),
							color: "#F59E0B",
							border: "1px solid rgba(255,255,255,0.08)",
							"& img": { objectFit: "cover" }
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 30 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						sx: {
							fontWeight: 900,
							fontFamily: "var(--font-clash)",
							fontSize: "1.4rem"
						},
						children: preview?.name || "Group invite"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							opacity: .68,
							mt: .75
						},
						children: preview?.description || "Request access to this private group."
					})] }),
					preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						spacing: 1,
						alignItems: "center",
						flexWrap: "wrap",
						justifyContent: "center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChipLike, { children: [preview.participantCount, " members"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipLike, { children: "Invite enabled" })]
					}) : null,
					requestState === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: { width: "100%" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							sx: {
								fontWeight: 800,
								color: "#F87171"
							},
							children: error || "Group does not exist"
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						spacing: 1.25,
						sx: { width: "100%" },
						children: [requestState === "joined" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								opacity: .72,
								fontWeight: 700
							},
							children: "Already in group"
						}) : null, requestState === "joined" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							variant: "contained",
							endIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 }),
							onClick: () => router.push(`/chat/${conversationId}`),
							children: "Go to chat"
						}) : requestState === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							variant: "outlined",
							disabled: true,
							children: "Request pending"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							variant: "contained",
							startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
							onClick: () => void handleRequestJoin(),
							disabled: requestState === "loading" || !preview,
							children: preview ? "Request access" : "Loading..."
						})]
					}),
					inviteUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							opacity: .45,
							wordBreak: "break-all"
						},
						children: inviteUrl
					}) : null
				]
			})
		})
	}) });
}
function ChipLike({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: {
			px: 1.25,
			py: .5,
			borderRadius: 999,
			bgcolor: "rgba(255,255,255,0.04)",
			border: "1px solid rgba(255,255,255,0.06)",
			fontSize: "0.78rem",
			fontWeight: 700
		},
		children
	});
}
var SplitComponent = GroupInvitePage;
//#endregion
export { SplitComponent as component };
