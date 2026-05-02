import "../_runtime.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { J as alpha, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { B as Box, K as Typography, S as Link } from "../_libs/@mui/material+[...].mjs";
import { U as Lock, ct as ExternalLink, it as FileText, t as Zap, z as MessageSquare } from "../_libs/lucide-react.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var FormattedText = ({ text, variant = "body1", sx = {} }) => {
	if (!text) return null;
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const parts = text.split(urlRegex);
	const getEcosystemType = (url) => {
		if (url.includes("connect.kylrix")) return {
			label: "CONNECT",
			color: "#F59E0B",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 12 })
		};
		if (url.includes("flow.kylrix")) return {
			label: "FLOW",
			color: "#A855F7",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 12 })
		};
		if (url.includes("vault.kylrix")) return {
			label: "VAULT",
			color: "#10B981",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 12 })
		};
		if (url.includes("note.kylrix")) return {
			label: "NOTE",
			color: "#EC4899",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 12 })
		};
		return null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
		variant,
		component: "div",
		sx: {
			...sx,
			whiteSpace: "pre-wrap",
			wordBreak: "break-word",
			lineHeight: 1.6
		},
		children: parts.map((part, i) => {
			if (part.match(urlRegex)) {
				const eco = getEcosystemType(part);
				if (eco) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					component: "a",
					href: part,
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: (e) => e.stopPropagation(),
					sx: {
						display: "inline-flex",
						alignItems: "center",
						gap: 1,
						bgcolor: alpha(eco.color, .1),
						color: eco.color,
						px: 1.5,
						py: .5,
						borderRadius: "8px",
						textDecoration: "none",
						fontWeight: 800,
						fontSize: "0.85rem",
						border: `1px solid ${alpha(eco.color, .2)}`,
						my: .5,
						mr: .5,
						verticalAlign: "middle",
						transition: "all 0.2s ease",
						fontFamily: "var(--font-satoshi)",
						"&:hover": {
							bgcolor: alpha(eco.color, .2),
							transform: "translateY(-1px)",
							boxShadow: `0 4px 12px ${alpha(eco.color, .2)}`
						}
					},
					children: [
						eco.icon,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: eco.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							size: 12,
							style: { opacity: .5 }
						})
					]
				}, i);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: part,
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: (e) => e.stopPropagation(),
					sx: {
						color: "#6366F1",
						textDecoration: "none",
						fontWeight: 700,
						position: "relative",
						"&:hover": {
							textDecoration: "none",
							"&::after": { width: "100%" }
						},
						"&::after": {
							content: "\"\"",
							position: "absolute",
							bottom: -2,
							left: 0,
							width: "0%",
							height: "2px",
							bgcolor: "#6366F1",
							transition: "width 0.2s ease",
							borderRadius: "2px"
						}
					},
					children: part
				}, i);
			}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
		})
	});
};
//#endregion
export { FormattedText as t };
