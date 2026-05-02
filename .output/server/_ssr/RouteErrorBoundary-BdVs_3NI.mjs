import { xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { B as Box, K as Typography, X as Paper, s as Stack, z as Button } from "../_libs/@mui/material+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RouteErrorBoundary-BdVs_3NI.js
var import_jsx_runtime = require_jsx_runtime();
function RouteErrorBoundary({ error, reset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: {
			minHeight: "100vh",
			bgcolor: "#0A0908",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			p: 3
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
			sx: {
				p: 3,
				bgcolor: "#161412",
				border: "1px solid rgba(255,255,255,0.08)",
				maxWidth: 520,
				width: "100%"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				spacing: 2,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h5",
						sx: {
							fontWeight: 800,
							color: "#fff"
						},
						children: "Route error"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: { color: "rgba(255,255,255,0.72)" },
						children: error.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						spacing: 1,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "contained",
							onClick: reset,
							children: "Retry"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outlined",
							onClick: () => window.location.reload(),
							children: "Reload"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { RouteErrorBoundary as t };
