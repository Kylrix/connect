import { o as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { o as require_react, t as import_emotion_react_cjs } from "../@emotion/react+[...].mjs";
import { $ as generateUtilityClasses, B as rootShouldForwardProp, F as memoTheme, G as createTypography, H as useTheme$3, I as globalCss, J as alpha, K as composeClasses, L as internal_createExtendSxProp, N as createSvgIcon, P as useDefaultProps, Q as createStyled, R as capitalize_default, U as createTheme$1, V as slotShouldForwardProp, W as getOverlayAlpha, X as clamp, Y as emphasize, Z as resolveProps, _t as styled$1, at as useTheme$1, bt as formatMuiErrorMessage, ct as styleFunctionSx, dt as getPath, et as generateUtilityClass, ft as capitalize, gt as deepmerge, ht as resolveBreakpointValues, it as GlobalStyles$1, lt as createUnarySpacing, mt as mergeBreakpointsInOrder, nt as ClassNameGenerator, ot as useTheme$2, pt as handleBreakpoints, q as DefaultPropsProvider, rt as extendSxProp$1, st as createTheme, tt as clsx, ut as getValue, vt as GlobalStyles$2, xt as require_jsx_runtime, yt as identifier_default, z as styled$2 } from "./icons-material+[...].mjs";
import { i as _extends, n as _inheritsLoose, r as _objectWithoutPropertiesLoose, t as _assertThisInitialized } from "../babel__runtime.mjs";
//#region node_modules/.pnpm/react-dom@19.2.0_react@19.2.0/node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	}, REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.2.0";
}));
//#endregion
//#region node_modules/.pnpm/react-dom@19.2.0_react@19.2.0/node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/createBox/createBox.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function createBox(options = {}) {
	const { themeId, defaultTheme, defaultClassName = "MuiBox-root", generateClassName } = options;
	const BoxRoot = styled$1("div", { shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as" })(styleFunctionSx);
	return /* @__PURE__ */ import_react.forwardRef(function Box(inProps, ref) {
		const theme = useTheme$1(defaultTheme);
		const { className, component = "div", ...other } = extendSxProp$1(inProps);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxRoot, {
			as: component,
			ref,
			className: clsx(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
			theme: themeId ? theme[themeId] || theme : theme,
			...other
		});
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/styled/styled.js
var styled = createStyled();
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
function getThemeProps(params) {
	const { theme, name, props } = params;
	if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) return props;
	return resolveProps(theme.components[name].defaultProps, props);
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({ props, name, defaultTheme, themeId }) {
	let theme = useTheme$1(defaultTheme);
	if (themeId) theme = theme[themeId] || theme;
	return getThemeProps({
		theme,
		name,
		props
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
/**
* A version of `React.useLayoutEffect` that does not show a warning when server-side rendering.
* This is useful for effects that are only needed for client-side rendering but not for SSR.
*
* Before you use this hook, make sure to read https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
* and confirm it doesn't apply to your use-case.
*/
var useEnhancedEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/useMediaQuery/useMediaQuery.js
function useMediaQueryOld(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
	const [match, setMatch] = import_react.useState(() => {
		if (noSsr && matchMedia) return matchMedia(query).matches;
		if (ssrMatchMedia) return ssrMatchMedia(query).matches;
		return defaultMatches;
	});
	useEnhancedEffect(() => {
		if (!matchMedia) return;
		const queryList = matchMedia(query);
		const updateMatch = () => {
			setMatch(queryList.matches);
		};
		updateMatch();
		queryList.addEventListener("change", updateMatch);
		return () => {
			queryList.removeEventListener("change", updateMatch);
		};
	}, [query, matchMedia]);
	return match;
}
var maybeReactUseSyncExternalStore = { ...import_react }.useSyncExternalStore;
function useMediaQueryNew(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
	const getDefaultSnapshot = import_react.useCallback(() => defaultMatches, [defaultMatches]);
	const getServerSnapshot = import_react.useMemo(() => {
		if (noSsr && matchMedia) return () => matchMedia(query).matches;
		if (ssrMatchMedia !== null) {
			const { matches } = ssrMatchMedia(query);
			return () => matches;
		}
		return getDefaultSnapshot;
	}, [
		getDefaultSnapshot,
		query,
		ssrMatchMedia,
		noSsr,
		matchMedia
	]);
	const [getSnapshot, subscribe] = import_react.useMemo(() => {
		if (matchMedia === null) return [getDefaultSnapshot, () => () => {}];
		const mediaQueryList = matchMedia(query);
		return [() => mediaQueryList.matches, (notify) => {
			mediaQueryList.addEventListener("change", notify);
			return () => {
				mediaQueryList.removeEventListener("change", notify);
			};
		}];
	}, [
		getDefaultSnapshot,
		matchMedia,
		query
	]);
	return maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
function unstable_createUseMediaQuery(params = {}) {
	const { themeId } = params;
	return function useMediaQuery(queryInput, options = {}) {
		let theme = useTheme$2();
		if (theme && themeId) theme = theme[themeId] || theme;
		const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
		const { defaultMatches = false, matchMedia = supportMatchMedia ? window.matchMedia : null, ssrMatchMedia = null, noSsr = false } = getThemeProps({
			name: "MuiUseMediaQuery",
			props: options,
			theme
		});
		let query = typeof queryInput === "function" ? queryInput(theme) : queryInput;
		query = query.replace(/^@media( ?)/m, "");
		if (query.includes("print")) console.warn([
			`MUI: You have provided a \`print\` query to the \`useMediaQuery\` hook.`,
			"Using the print media query to modify print styles can lead to unexpected results.",
			"Consider using the `displayPrint` field in the `sx` prop instead.",
			"More information about `displayPrint` on our docs: https://mui.com/system/display/#display-in-print."
		].join("\n"));
		return (maybeReactUseSyncExternalStore !== void 0 ? useMediaQueryNew : useMediaQueryOld)(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);
	};
}
unstable_createUseMediaQuery();
//#endregion
//#region node_modules/.pnpm/@mui+private-theming@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/private-theming/esm/useTheme/ThemeContext.js
var ThemeContext = /* @__PURE__ */ import_react.createContext(null);
//#endregion
//#region node_modules/.pnpm/@mui+private-theming@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/private-theming/esm/useTheme/useTheme.js
function useTheme() {
	return import_react.useContext(ThemeContext);
}
var nested_default = typeof Symbol === "function" && Symbol.for ? Symbol.for("mui.nested") : "__THEME_NESTED__";
//#endregion
//#region node_modules/.pnpm/@mui+private-theming@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/private-theming/esm/ThemeProvider/ThemeProvider.js
function mergeOuterLocalTheme(outerTheme, localTheme) {
	if (typeof localTheme === "function") return localTheme(outerTheme);
	return {
		...outerTheme,
		...localTheme
	};
}
/**
* This component takes a `theme` prop.
* It makes the `theme` available down the React tree thanks to React context.
* This component should preferably be used at **the root of your component tree**.
*/
function ThemeProvider$2(props) {
	const { children, theme: localTheme } = props;
	const outerTheme = useTheme();
	const theme = import_react.useMemo(() => {
		const output = outerTheme === null ? { ...localTheme } : mergeOuterLocalTheme(outerTheme, localTheme);
		if (output != null) output[nested_default] = outerTheme !== null;
		return output;
	}, [localTheme, outerTheme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: theme,
		children
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/RtlProvider/index.js
var RtlContext = /* @__PURE__ */ import_react.createContext();
function RtlProvider({ value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RtlContext.Provider, {
		value: value ?? true,
		...props
	});
}
var useRtl = () => {
	return import_react.useContext(RtlContext) ?? false;
};
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useId/useId.js
var globalId = 0;
function useGlobalId(idOverride) {
	const [defaultId, setDefaultId] = import_react.useState(idOverride);
	const id = idOverride || defaultId;
	import_react.useEffect(() => {
		if (defaultId == null) {
			globalId += 1;
			setDefaultId(`mui-${globalId}`);
		}
	}, [defaultId]);
	return id;
}
var maybeReactUseId = { ...import_react }.useId;
/**
*
* @example <div id={useId()} />
* @param idOverride
* @returns {string}
*/
function useId(idOverride) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? reactId;
	}
	return useGlobalId(idOverride);
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/ThemeProvider/useLayerOrder.js
/**
* This hook returns a `GlobalStyles` component that sets the CSS layer order (for server-side rendering).
* Then on client-side, it injects the CSS layer order into the document head to ensure that the layer order is always present first before other Emotion styles.
*/
function useLayerOrder(theme) {
	const upperTheme = useTheme$2();
	const id = useId() || "";
	const { modularCssLayers } = theme;
	let layerOrder = "mui.global, mui.components, mui.theme, mui.custom, mui.sx";
	if (!modularCssLayers || upperTheme !== null) layerOrder = "";
	else if (typeof modularCssLayers === "string") layerOrder = modularCssLayers.replace(/mui(?!\.)/g, layerOrder);
	else layerOrder = `@layer ${layerOrder};`;
	useEnhancedEffect(() => {
		const head = document.querySelector("head");
		if (!head) return;
		const firstChild = head.firstChild;
		if (layerOrder) {
			if (firstChild && firstChild.hasAttribute?.("data-mui-layer-order") && firstChild.getAttribute("data-mui-layer-order") === id) return;
			const styleElement = document.createElement("style");
			styleElement.setAttribute("data-mui-layer-order", id);
			styleElement.textContent = layerOrder;
			head.prepend(styleElement);
		} else head.querySelector(`style[data-mui-layer-order="${id}"]`)?.remove();
	}, [layerOrder, id]);
	if (!layerOrder) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles$1, { styles: layerOrder });
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js
var EMPTY_THEME = {};
function useThemeScoping(themeId, upperTheme, localTheme, isPrivate = false) {
	return import_react.useMemo(() => {
		const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
		if (typeof localTheme === "function") {
			const mergedTheme = localTheme(resolvedTheme);
			const result = themeId ? {
				...upperTheme,
				[themeId]: mergedTheme
			} : mergedTheme;
			if (isPrivate) return () => result;
			return result;
		}
		return themeId ? {
			...upperTheme,
			[themeId]: localTheme
		} : {
			...upperTheme,
			...localTheme
		};
	}, [
		themeId,
		upperTheme,
		localTheme,
		isPrivate
	]);
}
/**
* This component makes the `theme` available down the React tree.
* It should preferably be used at **the root of your component tree**.
*
* <ThemeProvider theme={theme}> // existing use case
* <ThemeProvider theme={{ id: theme }}> // theme scoping
*/
function ThemeProvider$1(props) {
	const { children, theme: localTheme, themeId } = props;
	const upperTheme = useTheme$2(EMPTY_THEME);
	const upperPrivateTheme = useTheme() || EMPTY_THEME;
	const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
	const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
	const rtlValue = (themeId ? engineTheme[themeId] : engineTheme).direction === "rtl";
	const layerOrder = useLayerOrder(engineTheme);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider$2, {
		theme: privateTheme,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_emotion_react_cjs.ThemeContext.Provider, {
			value: engineTheme,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RtlProvider, {
				value: rtlValue,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DefaultPropsProvider, {
					value: themeId ? engineTheme[themeId].components : engineTheme.components,
					children: [layerOrder, children]
				})
			})
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/InitColorSchemeScript/InitColorSchemeScript.js
var DEFAULT_MODE_STORAGE_KEY = "mode";
var DEFAULT_COLOR_SCHEME_STORAGE_KEY = "color-scheme";
var DEFAULT_ATTRIBUTE = "data-color-scheme";
function InitColorSchemeScript(options) {
	const { defaultMode = "system", defaultLightColorScheme = "light", defaultDarkColorScheme = "dark", modeStorageKey = DEFAULT_MODE_STORAGE_KEY, colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY, attribute: initialAttribute = DEFAULT_ATTRIBUTE, colorSchemeNode = "document.documentElement", nonce } = options || {};
	let setter = "";
	let attribute = initialAttribute;
	if (initialAttribute === "class") attribute = ".%s";
	if (initialAttribute === "data") attribute = "[data-%s]";
	if (attribute.startsWith(".")) {
		const selector = attribute.substring(1);
		setter += `${colorSchemeNode}.classList.remove('${selector}'.replace('%s', light), '${selector}'.replace('%s', dark));
      ${colorSchemeNode}.classList.add('${selector}'.replace('%s', colorScheme));`;
	}
	const matches = attribute.match(/\[([^[\]]+)\]/);
	if (matches) {
		const [attr, value] = matches[1].split("=");
		if (!value) setter += `${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', light));
      ${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', dark));`;
		setter += `
      ${colorSchemeNode}.setAttribute('${attr}'.replace('%s', colorScheme), ${value ? `${value}.replace('%s', colorScheme)` : "\"\""});`;
	} else if (attribute !== ".%s") setter += `${colorSchemeNode}.setAttribute('${attribute}', colorScheme);`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		suppressHydrationWarning: true,
		nonce: typeof window === "undefined" ? nonce : "",
		dangerouslySetInnerHTML: { __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${modeStorageKey}') || '${defaultMode}';
  const dark = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
  const light = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${setter}
  }
} catch(e){}})();` }
	}, "mui-color-scheme-init");
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/cssVars/localStorageManager.js
function noop$3() {}
var localStorageManager = ({ key, storageWindow }) => {
	if (!storageWindow && typeof window !== "undefined") storageWindow = window;
	return {
		get(defaultValue) {
			if (typeof window === "undefined") return;
			if (!storageWindow) return defaultValue;
			let value;
			try {
				value = storageWindow.localStorage.getItem(key);
			} catch {}
			return value || defaultValue;
		},
		set: (value) => {
			if (storageWindow) try {
				storageWindow.localStorage.setItem(key, value);
			} catch {}
		},
		subscribe: (handler) => {
			if (!storageWindow) return noop$3;
			const listener = (event) => {
				const value = event.newValue;
				if (event.key === key) handler(value);
			};
			storageWindow.addEventListener("storage", listener);
			return () => {
				storageWindow.removeEventListener("storage", listener);
			};
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js
function noop$2() {}
function getSystemMode(mode) {
	if (typeof window !== "undefined" && typeof window.matchMedia === "function" && mode === "system") {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
		return "light";
	}
}
function processState(state, callback) {
	if (state.mode === "light" || state.mode === "system" && state.systemMode === "light") return callback("light");
	if (state.mode === "dark" || state.mode === "system" && state.systemMode === "dark") return callback("dark");
}
function getColorScheme(state) {
	return processState(state, (mode) => {
		if (mode === "light") return state.lightColorScheme;
		if (mode === "dark") return state.darkColorScheme;
	});
}
function useCurrentColorScheme(options) {
	const { defaultMode = "light", defaultLightColorScheme, defaultDarkColorScheme, supportedColorSchemes = [], modeStorageKey = DEFAULT_MODE_STORAGE_KEY, colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY, storageWindow = typeof window === "undefined" ? void 0 : window, storageManager = localStorageManager, noSsr = false } = options;
	const joinedColorSchemes = supportedColorSchemes.join(",");
	const isMultiSchemes = supportedColorSchemes.length > 1;
	const modeStorage = import_react.useMemo(() => storageManager?.({
		key: modeStorageKey,
		storageWindow
	}), [
		storageManager,
		modeStorageKey,
		storageWindow
	]);
	const lightStorage = import_react.useMemo(() => storageManager?.({
		key: `${colorSchemeStorageKey}-light`,
		storageWindow
	}), [
		storageManager,
		colorSchemeStorageKey,
		storageWindow
	]);
	const darkStorage = import_react.useMemo(() => storageManager?.({
		key: `${colorSchemeStorageKey}-dark`,
		storageWindow
	}), [
		storageManager,
		colorSchemeStorageKey,
		storageWindow
	]);
	const [state, setState] = import_react.useState(() => {
		const initialMode = modeStorage?.get(defaultMode) || defaultMode;
		const lightColorScheme = lightStorage?.get(defaultLightColorScheme) || defaultLightColorScheme;
		const darkColorScheme = darkStorage?.get(defaultDarkColorScheme) || defaultDarkColorScheme;
		return {
			mode: initialMode,
			systemMode: getSystemMode(initialMode),
			lightColorScheme,
			darkColorScheme
		};
	});
	const [isClient, setIsClient] = import_react.useState(noSsr || !isMultiSchemes);
	import_react.useEffect(() => {
		setIsClient(true);
	}, []);
	const colorScheme = getColorScheme(state);
	const setMode = import_react.useCallback((mode) => {
		setState((currentState) => {
			if (mode === currentState.mode) return currentState;
			const newMode = mode ?? defaultMode;
			modeStorage?.set(newMode);
			return {
				...currentState,
				mode: newMode,
				systemMode: getSystemMode(newMode)
			};
		});
	}, [modeStorage, defaultMode]);
	const setColorScheme = import_react.useCallback((value) => {
		if (!value) setState((currentState) => {
			lightStorage?.set(defaultLightColorScheme);
			darkStorage?.set(defaultDarkColorScheme);
			return {
				...currentState,
				lightColorScheme: defaultLightColorScheme,
				darkColorScheme: defaultDarkColorScheme
			};
		});
		else if (typeof value === "string") if (value && !joinedColorSchemes.includes(value)) console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
		else setState((currentState) => {
			const newState = { ...currentState };
			processState(currentState, (mode) => {
				if (mode === "light") {
					lightStorage?.set(value);
					newState.lightColorScheme = value;
				}
				if (mode === "dark") {
					darkStorage?.set(value);
					newState.darkColorScheme = value;
				}
			});
			return newState;
		});
		else setState((currentState) => {
			const newState = { ...currentState };
			const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
			const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
			if (newLightColorScheme) if (!joinedColorSchemes.includes(newLightColorScheme)) console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
			else {
				newState.lightColorScheme = newLightColorScheme;
				lightStorage?.set(newLightColorScheme);
			}
			if (newDarkColorScheme) if (!joinedColorSchemes.includes(newDarkColorScheme)) console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
			else {
				newState.darkColorScheme = newDarkColorScheme;
				darkStorage?.set(newDarkColorScheme);
			}
			return newState;
		});
	}, [
		joinedColorSchemes,
		lightStorage,
		darkStorage,
		defaultLightColorScheme,
		defaultDarkColorScheme
	]);
	const handleMediaQuery = import_react.useCallback((event) => {
		if (state.mode === "system") setState((currentState) => {
			const systemMode = event?.matches ? "dark" : "light";
			if (currentState.systemMode === systemMode) return currentState;
			return {
				...currentState,
				systemMode
			};
		});
	}, [state.mode]);
	const mediaListener = import_react.useRef(handleMediaQuery);
	mediaListener.current = handleMediaQuery;
	import_react.useEffect(() => {
		if (typeof window.matchMedia !== "function" || !isMultiSchemes) return;
		const handler = (...args) => mediaListener.current(...args);
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		media.addListener(handler);
		handler(media);
		return () => {
			media.removeListener(handler);
		};
	}, [isMultiSchemes]);
	import_react.useEffect(() => {
		if (isMultiSchemes) {
			const unsubscribeMode = modeStorage?.subscribe((value) => {
				if (!value || [
					"light",
					"dark",
					"system"
				].includes(value)) setMode(value || defaultMode);
			}) || noop$2;
			const unsubscribeLight = lightStorage?.subscribe((value) => {
				if (!value || joinedColorSchemes.match(value)) setColorScheme({ light: value });
			}) || noop$2;
			const unsubscribeDark = darkStorage?.subscribe((value) => {
				if (!value || joinedColorSchemes.match(value)) setColorScheme({ dark: value });
			}) || noop$2;
			return () => {
				unsubscribeMode();
				unsubscribeLight();
				unsubscribeDark();
			};
		}
	}, [
		setColorScheme,
		setMode,
		joinedColorSchemes,
		defaultMode,
		storageWindow,
		isMultiSchemes,
		modeStorage,
		lightStorage,
		darkStorage
	]);
	return {
		...state,
		mode: isClient ? state.mode : void 0,
		systemMode: isClient ? state.systemMode : void 0,
		colorScheme: isClient ? colorScheme : void 0,
		setMode,
		setColorScheme
	};
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
var DISABLE_CSS_TRANSITION = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function createCssVarsProvider(options) {
	const { themeId, theme: defaultTheme = {}, modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY, colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY, disableTransitionOnChange: designSystemTransitionOnChange = false, defaultColorScheme, resolveTheme } = options;
	const defaultContext = {
		allColorSchemes: [],
		colorScheme: void 0,
		darkColorScheme: void 0,
		lightColorScheme: void 0,
		mode: void 0,
		setColorScheme: () => {},
		setMode: () => {},
		systemMode: void 0
	};
	const ColorSchemeContext = /* @__PURE__ */ import_react.createContext(void 0);
	const useColorScheme = () => import_react.useContext(ColorSchemeContext) || defaultContext;
	const defaultColorSchemes = {};
	const defaultComponents = {};
	function CssVarsProvider(props) {
		const { children, theme: themeProp, modeStorageKey = defaultModeStorageKey, colorSchemeStorageKey = defaultColorSchemeStorageKey, disableTransitionOnChange = designSystemTransitionOnChange, storageManager, storageWindow = typeof window === "undefined" ? void 0 : window, documentNode = typeof document === "undefined" ? void 0 : document, colorSchemeNode = typeof document === "undefined" ? void 0 : document.documentElement, disableNestedContext = false, disableStyleSheetGeneration = false, defaultMode: initialMode = "system", forceThemeRerender = false, noSsr } = props;
		const hasMounted = import_react.useRef(false);
		const upperTheme = useTheme();
		const ctx = import_react.useContext(ColorSchemeContext);
		const nested = !!ctx && !disableNestedContext;
		const initialTheme = import_react.useMemo(() => {
			if (themeProp) return themeProp;
			return typeof defaultTheme === "function" ? defaultTheme() : defaultTheme;
		}, [themeProp]);
		const scopedTheme = initialTheme[themeId];
		const restThemeProp = scopedTheme || initialTheme;
		const { colorSchemes = defaultColorSchemes, components = defaultComponents, cssVarPrefix } = restThemeProp;
		const joinedColorSchemes = Object.keys(colorSchemes).filter((k) => !!colorSchemes[k]).join(",");
		const allColorSchemes = import_react.useMemo(() => joinedColorSchemes.split(","), [joinedColorSchemes]);
		const defaultLightColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
		const defaultDarkColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
		const { mode: stateMode, setMode, systemMode, lightColorScheme, darkColorScheme, colorScheme: stateColorScheme, setColorScheme } = useCurrentColorScheme({
			supportedColorSchemes: allColorSchemes,
			defaultLightColorScheme,
			defaultDarkColorScheme,
			modeStorageKey,
			colorSchemeStorageKey,
			defaultMode: colorSchemes[defaultLightColorScheme] && colorSchemes[defaultDarkColorScheme] ? initialMode : colorSchemes[restThemeProp.defaultColorScheme]?.palette?.mode || restThemeProp.palette?.mode,
			storageManager,
			storageWindow,
			noSsr
		});
		let mode = stateMode;
		let colorScheme = stateColorScheme;
		if (nested) {
			mode = ctx.mode;
			colorScheme = ctx.colorScheme;
		}
		let calculatedColorScheme = colorScheme || restThemeProp.defaultColorScheme;
		if (restThemeProp.vars && !forceThemeRerender) calculatedColorScheme = restThemeProp.defaultColorScheme;
		const memoTheme = import_react.useMemo(() => {
			const themeVars = restThemeProp.generateThemeVars?.() || restThemeProp.vars;
			const theme = {
				...restThemeProp,
				components,
				colorSchemes,
				cssVarPrefix,
				vars: themeVars
			};
			if (typeof theme.generateSpacing === "function") theme.spacing = theme.generateSpacing();
			if (calculatedColorScheme) {
				const scheme = colorSchemes[calculatedColorScheme];
				if (scheme && typeof scheme === "object") Object.keys(scheme).forEach((schemeKey) => {
					if (scheme[schemeKey] && typeof scheme[schemeKey] === "object") theme[schemeKey] = {
						...theme[schemeKey],
						...scheme[schemeKey]
					};
					else theme[schemeKey] = scheme[schemeKey];
				});
			}
			return resolveTheme ? resolveTheme(theme) : theme;
		}, [
			restThemeProp,
			calculatedColorScheme,
			components,
			colorSchemes,
			cssVarPrefix
		]);
		const colorSchemeSelector = restThemeProp.colorSchemeSelector;
		useEnhancedEffect(() => {
			if (colorScheme && colorSchemeNode && colorSchemeSelector && colorSchemeSelector !== "media") {
				const selector = colorSchemeSelector;
				let rule = colorSchemeSelector;
				if (selector === "class") rule = `.%s`;
				if (selector === "data") rule = `[data-%s]`;
				if (selector?.startsWith("data-") && !selector.includes("%s")) rule = `[${selector}="%s"]`;
				if (rule.startsWith(".")) {
					colorSchemeNode.classList.remove(...allColorSchemes.map((scheme) => rule.substring(1).replace("%s", scheme)));
					colorSchemeNode.classList.add(rule.substring(1).replace("%s", colorScheme));
				} else {
					const matches = rule.replace("%s", colorScheme).match(/\[([^\]]+)\]/);
					if (matches) {
						const [attr, value] = matches[1].split("=");
						if (!value) allColorSchemes.forEach((scheme) => {
							colorSchemeNode.removeAttribute(attr.replace(colorScheme, scheme));
						});
						colorSchemeNode.setAttribute(attr, value ? value.replace(/"|'/g, "") : "");
					} else colorSchemeNode.setAttribute(rule, colorScheme);
				}
			}
		}, [
			colorScheme,
			colorSchemeSelector,
			colorSchemeNode,
			allColorSchemes
		]);
		import_react.useEffect(() => {
			let timer;
			if (disableTransitionOnChange && hasMounted.current && documentNode) {
				const css = documentNode.createElement("style");
				css.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
				documentNode.head.appendChild(css);
				window.getComputedStyle(documentNode.body);
				timer = setTimeout(() => {
					documentNode.head.removeChild(css);
				}, 1);
			}
			return () => {
				clearTimeout(timer);
			};
		}, [
			colorScheme,
			disableTransitionOnChange,
			documentNode
		]);
		import_react.useEffect(() => {
			hasMounted.current = true;
			return () => {
				hasMounted.current = false;
			};
		}, []);
		const contextValue = import_react.useMemo(() => ({
			allColorSchemes,
			colorScheme,
			darkColorScheme,
			lightColorScheme,
			mode,
			setColorScheme,
			setMode,
			systemMode
		}), [
			allColorSchemes,
			colorScheme,
			darkColorScheme,
			lightColorScheme,
			mode,
			setColorScheme,
			setMode,
			systemMode,
			memoTheme.colorSchemeSelector
		]);
		let shouldGenerateStyleSheet = true;
		if (disableStyleSheetGeneration || restThemeProp.cssVariables === false || nested && upperTheme?.cssVarPrefix === cssVarPrefix) shouldGenerateStyleSheet = false;
		const element = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider$1, {
			themeId: scopedTheme ? themeId : void 0,
			theme: memoTheme,
			children
		}), shouldGenerateStyleSheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles$2, { styles: memoTheme.generateStyleSheets?.() || [] })] });
		if (nested) return element;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorSchemeContext.Provider, {
			value: contextValue,
			children: element
		});
	}
	const defaultLightColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
	const defaultDarkColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
	const getInitColorSchemeScript = (params) => InitColorSchemeScript({
		colorSchemeStorageKey: defaultColorSchemeStorageKey,
		defaultLightColorScheme,
		defaultDarkColorScheme,
		modeStorageKey: defaultModeStorageKey,
		...params
	});
	return {
		CssVarsProvider,
		useColorScheme,
		getInitColorSchemeScript
	};
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/Container/createContainer.js
var defaultTheme$1 = createTheme();
var defaultCreateStyledComponent$1 = styled("div", {
	name: "MuiContainer",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`],
			ownerState.fixed && styles.fixed,
			ownerState.disableGutters && styles.disableGutters
		];
	}
});
var useThemePropsDefault$1 = (inProps) => useThemeProps({
	props: inProps,
	name: "MuiContainer",
	defaultTheme: defaultTheme$1
});
var useUtilityClasses$62 = (ownerState, componentName) => {
	const getContainerUtilityClass = (slot) => {
		return generateUtilityClass(componentName, slot);
	};
	const { classes, fixed, disableGutters, maxWidth } = ownerState;
	return composeClasses({ root: [
		"root",
		maxWidth && `maxWidth${capitalize(String(maxWidth))}`,
		fixed && "fixed",
		disableGutters && "disableGutters"
	] }, getContainerUtilityClass, classes);
};
function createContainer(options = {}) {
	const { createStyledComponent = defaultCreateStyledComponent$1, useThemeProps = useThemePropsDefault$1, componentName = "MuiContainer" } = options;
	const ContainerRoot = createStyledComponent(({ theme, ownerState }) => ({
		width: "100%",
		marginLeft: "auto",
		boxSizing: "border-box",
		marginRight: "auto",
		...!ownerState.disableGutters && {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			[theme.breakpoints.up("sm")]: {
				paddingLeft: theme.spacing(3),
				paddingRight: theme.spacing(3)
			}
		}
	}), ({ theme, ownerState }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
		const breakpoint = breakpointValueKey;
		const value = theme.breakpoints.values[breakpoint];
		if (value !== 0) acc[theme.breakpoints.up(breakpoint)] = { maxWidth: `${value}${theme.breakpoints.unit}` };
		return acc;
	}, {}), ({ theme, ownerState }) => ({
		...ownerState.maxWidth === "xs" && { [theme.breakpoints.up("xs")]: { maxWidth: Math.max(theme.breakpoints.values.xs, 444) } },
		...ownerState.maxWidth && ownerState.maxWidth !== "xs" && { [theme.breakpoints.up(ownerState.maxWidth)]: { maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}` } }
	}));
	return /* @__PURE__ */ import_react.forwardRef(function Container(inProps, ref) {
		const props = useThemeProps(inProps);
		const { className, component = "div", disableGutters = false, fixed = false, maxWidth = "lg", classes: classesProp, ...other } = props;
		const ownerState = {
			...props,
			component,
			disableGutters,
			fixed,
			maxWidth
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerRoot, {
			as: component,
			ownerState,
			className: clsx(useUtilityClasses$62(ownerState, componentName).root, className),
			ref,
			...other
		});
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js
function isMuiElement(element, muiNames) {
	return /* @__PURE__ */ import_react.isValidElement(element) && muiNames.indexOf(element.type.muiName ?? element.type?._payload?.value?.muiName) !== -1;
}
//#endregion
//#region node_modules/.pnpm/@mui+system@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+st_f8cdefdeb1660c4f3efbcbc18fd3b28c/node_modules/@mui/system/esm/Stack/createStack.js
var defaultTheme = createTheme();
var defaultCreateStyledComponent = styled("div", {
	name: "MuiStack",
	slot: "Root"
});
function useThemePropsDefault(props) {
	return useThemeProps({
		props,
		name: "MuiStack",
		defaultTheme
	});
}
/**
* Return an array with the separator React element interspersed between
* each React node of the input children.
*
* > joinChildren([1,2,3], 0)
* [1,0,2,0,3]
*/
function joinChildren(children, separator) {
	const childrenArray = import_react.Children.toArray(children).filter(Boolean);
	return childrenArray.reduce((output, child, index) => {
		output.push(child);
		if (index < childrenArray.length - 1) output.push(/* @__PURE__ */ import_react.cloneElement(separator, { key: `separator-${index}` }));
		return output;
	}, []);
}
var getSideFromDirection = (direction) => {
	return {
		row: "Left",
		"row-reverse": "Right",
		column: "Top",
		"column-reverse": "Bottom"
	}[direction];
};
var style = ({ ownerState, theme }) => {
	let styles = {
		display: "flex",
		flexDirection: "column",
		...handleBreakpoints({ theme }, resolveBreakpointValues({
			values: ownerState.direction,
			breakpoints: theme.breakpoints.values
		}), (propValue) => ({ flexDirection: propValue }))
	};
	if (ownerState.spacing) {
		const transformer = createUnarySpacing(theme);
		const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
			if (typeof ownerState.spacing === "object" && ownerState.spacing[breakpoint] != null || typeof ownerState.direction === "object" && ownerState.direction[breakpoint] != null) acc[breakpoint] = true;
			return acc;
		}, {});
		const directionValues = resolveBreakpointValues({
			values: ownerState.direction,
			base
		});
		const spacingValues = resolveBreakpointValues({
			values: ownerState.spacing,
			base
		});
		if (typeof directionValues === "object") Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
			if (!directionValues[breakpoint]) directionValues[breakpoint] = index > 0 ? directionValues[breakpoints[index - 1]] : "column";
		});
		const styleFromPropValue = (propValue, breakpoint) => {
			if (ownerState.useFlexGap) return { gap: getValue(transformer, propValue) };
			return {
				"& > :not(style):not(style)": { margin: 0 },
				"& > :not(style) ~ :not(style)": { [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: getValue(transformer, propValue) }
			};
		};
		styles = deepmerge(styles, handleBreakpoints({ theme }, spacingValues, styleFromPropValue));
	}
	styles = mergeBreakpointsInOrder(theme.breakpoints, styles);
	return styles;
};
function createStack(options = {}) {
	const { createStyledComponent = defaultCreateStyledComponent, useThemeProps = useThemePropsDefault, componentName = "MuiStack" } = options;
	const useUtilityClasses = () => {
		return composeClasses({ root: ["root"] }, (slot) => generateUtilityClass(componentName, slot), {});
	};
	const StackRoot = createStyledComponent(style);
	return /* @__PURE__ */ import_react.forwardRef(function Grid(inProps, ref) {
		const { component = "div", direction = "column", spacing = 0, divider, children, className, useFlexGap = false, ...other } = extendSxProp$1(useThemeProps(inProps));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackRoot, {
			as: component,
			ownerState: {
				direction,
				spacing,
				useFlexGap
			},
			ref,
			className: clsx(useUtilityClasses().root, className),
			...other,
			children: divider ? joinChildren(children, divider) : children
		});
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/styles/cssUtils.js
function getUnit(input) {
	return String(input).match(/[\d.\-+]*\s*(.*)/)[1] || "";
}
function toUnitless(length) {
	return parseFloat(length);
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/styles/ThemeProviderNoVars.js
function ThemeProviderNoVars({ theme: themeInput, ...props }) {
	const scopedTheme = "$$material" in themeInput ? themeInput[identifier_default] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider$1, {
		...props,
		themeId: scopedTheme ? identifier_default : void 0,
		theme: scopedTheme || themeInput
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/InitColorSchemeScript/InitColorSchemeScript.js
var defaultConfig = {
	attribute: "data-mui-color-scheme",
	colorSchemeStorageKey: "mui-color-scheme",
	defaultLightColorScheme: "light",
	defaultDarkColorScheme: "dark",
	modeStorageKey: "mui-mode"
};
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/styles/ThemeProviderWithVars.js
var { CssVarsProvider: InternalCssVarsProvider, useColorScheme, getInitColorSchemeScript: deprecatedGetInitColorSchemeScript } = createCssVarsProvider({
	themeId: identifier_default,
	theme: () => createTheme$1({ cssVariables: true }),
	colorSchemeStorageKey: defaultConfig.colorSchemeStorageKey,
	modeStorageKey: defaultConfig.modeStorageKey,
	defaultColorScheme: {
		light: defaultConfig.defaultLightColorScheme,
		dark: defaultConfig.defaultDarkColorScheme
	},
	resolveTheme: (theme) => {
		const newTheme = {
			...theme,
			typography: createTypography(theme.palette, theme.typography)
		};
		newTheme.unstable_sx = function sx(props) {
			return styleFunctionSx({
				sx: props,
				theme: this
			});
		};
		return newTheme;
	}
});
/**
* TODO: remove this export in v7
* @deprecated
* The `CssVarsProvider` component has been deprecated and ported into `ThemeProvider`.
*
* You should use `ThemeProvider` and `createTheme()` instead:
*
* ```diff
* - import { CssVarsProvider, extendTheme } from '@mui/material/styles';
* + import { ThemeProvider, createTheme } from '@mui/material/styles';
*
* - const theme = extendTheme();
* + const theme = createTheme({
* +   cssVariables: true,
* +   colorSchemes: { light: true, dark: true },
* + });
*
* - <CssVarsProvider theme={theme}>
* + <ThemeProvider theme={theme}>
* ```
*
* To see the full documentation, check out https://mui.com/material-ui/customization/css-theme-variables/usage/.
*/
var CssVarsProvider = InternalCssVarsProvider;
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/styles/ThemeProvider.js
function ThemeProvider({ theme, ...props }) {
	const noVarsTheme = import_react.useMemo(() => {
		if (typeof theme === "function") return theme;
		const muiTheme = "$$material" in theme ? theme[identifier_default] : theme;
		if (!("colorSchemes" in muiTheme)) {
			if (!("vars" in muiTheme)) return {
				...theme,
				vars: null
			};
			return theme;
		}
		return null;
	}, [theme]);
	if (noVarsTheme) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProviderNoVars, {
		theme: noVarsTheme,
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CssVarsProvider, {
		theme,
		...props
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js
/**
* Safe chained function.
*
* Will only create a new function if needed,
* otherwise will pass back existing functions or null.
*/
function createChainedFunction(...funcs) {
	return funcs.reduce((acc, func) => {
		if (func == null) return acc;
		return function chainedFunction(...args) {
			acc.apply(this, args);
			func.apply(this, args);
		};
	}, () => {});
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/debounce/debounce.js
function debounce$1(func, wait = 166) {
	let timeout;
	function debounced(...args) {
		const later = () => {
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}
	debounced.clear = () => {
		clearTimeout(timeout);
	};
	return debounced;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/debounce.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var debounce_default = debounce$1;
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/isMuiElement.js
var isMuiElement_default = isMuiElement;
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node) {
	return node && node.ownerDocument || document;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/ownerDocument.js
var ownerDocument_default = ownerDocument;
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function ownerWindow(node) {
	return ownerDocument(node).defaultView || window;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/ownerWindow.js
var ownerWindow_default = ownerWindow;
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/setRef/setRef.js
/**
* TODO v5: consider making it private
*
* passes {value} to {ref}
*
* WARNING: Be sure to only call this inside a callback that is passed as a ref.
* Otherwise, make sure to cleanup the previous {ref} if it changes. See
* https://github.com/mui/material-ui/issues/13539
*
* Useful if you want to expose the ref of an inner component to the public API
* while still using it inside the component.
* @param ref A ref callback or ref object. If anything falsy, this is a no-op.
*/
function setRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/useEnhancedEffect.js
var useEnhancedEffect_default = useEnhancedEffect;
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/useId.js
var useId_default = useId;
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useControlled/useControlled.js
function useControlled(props) {
	const { controlled, default: defaultProp, name, state = "value" } = props;
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	return [isControlled ? controlled : valueState, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/useControlled.js
var useControlled_default = useControlled;
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
/**
* Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
* See RFC in https://github.com/reactjs/rfcs/pull/220
*/
function useEventCallback(fn) {
	const ref = import_react.useRef(fn);
	useEnhancedEffect(() => {
		ref.current = fn;
	});
	return import_react.useRef((...args) => (0, ref.current)(...args)).current;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/useEventCallback.js
var useEventCallback_default = useEventCallback;
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useForkRef/useForkRef.js
/**
* Merges refs into a single memoized callback ref or `null`.
*
* ```tsx
* const rootRef = React.useRef<Instance>(null);
* const refFork = useForkRef(rootRef, props.ref);
*
* return (
*   <Root {...props} ref={refFork} />
* );
* ```
*
* @param {Array<React.Ref<Instance> | undefined>} refs The ref array.
* @returns {React.RefCallback<Instance> | null} The new ref callback.
*/
function useForkRef(...refs) {
	const cleanupRef = import_react.useRef(void 0);
	const refEffect = import_react.useCallback((instance) => {
		const cleanups = refs.map((ref) => {
			if (ref == null) return null;
			if (typeof ref === "function") {
				const refCallback = ref;
				const refCleanup = refCallback(instance);
				return typeof refCleanup === "function" ? refCleanup : () => {
					refCallback(null);
				};
			}
			ref.current = instance;
			return () => {
				ref.current = null;
			};
		});
		return () => {
			cleanups.forEach((refCleanup) => refCleanup?.());
		};
	}, refs);
	return import_react.useMemo(() => {
		if (refs.every((ref) => ref == null)) return null;
		return (value) => {
			if (cleanupRef.current) {
				cleanupRef.current();
				cleanupRef.current = void 0;
			}
			if (value != null) cleanupRef.current = refEffect(value);
		};
	}, refs);
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/useForkRef.js
var useForkRef_default = useForkRef;
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/mergeSlotProps.js
function isEventHandler(key, value) {
	const thirdCharCode = key.charCodeAt(2);
	return key[0] === "o" && key[1] === "n" && thirdCharCode >= 65 && thirdCharCode <= 90 && typeof value === "function";
}
function mergeSlotProps$1(externalSlotProps, defaultSlotProps) {
	if (!externalSlotProps) return defaultSlotProps;
	function extractHandlers(externalSlotPropsValue, defaultSlotPropsValue) {
		const handlers = {};
		Object.keys(defaultSlotPropsValue).forEach((key) => {
			if (isEventHandler(key, defaultSlotPropsValue[key]) && typeof externalSlotPropsValue[key] === "function") handlers[key] = (...args) => {
				externalSlotPropsValue[key](...args);
				defaultSlotPropsValue[key](...args);
			};
		});
		return handlers;
	}
	if (typeof externalSlotProps === "function" || typeof defaultSlotProps === "function") return (ownerState) => {
		const defaultSlotPropsValue = typeof defaultSlotProps === "function" ? defaultSlotProps(ownerState) : defaultSlotProps;
		const externalSlotPropsValue = typeof externalSlotProps === "function" ? externalSlotProps({
			...ownerState,
			...defaultSlotPropsValue
		}) : externalSlotProps;
		const className = clsx(ownerState?.className, defaultSlotPropsValue?.className, externalSlotPropsValue?.className);
		const handlers = extractHandlers(externalSlotPropsValue, defaultSlotPropsValue);
		return {
			...defaultSlotPropsValue,
			...externalSlotPropsValue,
			...handlers,
			...!!className && { className },
			...defaultSlotPropsValue?.style && externalSlotPropsValue?.style && { style: {
				...defaultSlotPropsValue.style,
				...externalSlotPropsValue.style
			} },
			...defaultSlotPropsValue?.sx && externalSlotPropsValue?.sx && { sx: [...Array.isArray(defaultSlotPropsValue.sx) ? defaultSlotPropsValue.sx : [defaultSlotPropsValue.sx], ...Array.isArray(externalSlotPropsValue.sx) ? externalSlotPropsValue.sx : [externalSlotPropsValue.sx]] }
		};
	};
	const typedDefaultSlotProps = defaultSlotProps;
	const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
	const className = clsx(typedDefaultSlotProps?.className, externalSlotProps?.className);
	return {
		...defaultSlotProps,
		...externalSlotProps,
		...handlers,
		...!!className && { className },
		...typedDefaultSlotProps?.style && externalSlotProps?.style && { style: {
			...typedDefaultSlotProps.style,
			...externalSlotProps.style
		} },
		...typedDefaultSlotProps?.sx && externalSlotProps?.sx && { sx: [...Array.isArray(typedDefaultSlotProps.sx) ? typedDefaultSlotProps.sx : [typedDefaultSlotProps.sx], ...Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]] }
	};
}
//#endregion
//#region node_modules/.pnpm/react-transition-group@4.4.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/react-transition-group/esm/config.js
var config_default = { disabled: false };
//#endregion
//#region node_modules/.pnpm/react-transition-group@4.4.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/react-transition-group/esm/TransitionGroupContext.js
var TransitionGroupContext_default = import_react.createContext(null);
//#endregion
//#region node_modules/.pnpm/react-transition-group@4.4.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow(node) {
	return node.scrollTop;
};
//#endregion
//#region node_modules/.pnpm/react-transition-group@4.4.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
/**
* The Transition component lets you describe a transition from one component
* state to another _over time_ with a simple declarative API. Most commonly
* it's used to animate the mounting and unmounting of a component, but can also
* be used to describe in-place transition states as well.
*
* ---
*
* **Note**: `Transition` is a platform-agnostic base component. If you're using
* transitions in CSS, you'll probably want to use
* [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
* instead. It inherits all the features of `Transition`, but contains
* additional features necessary to play nice with CSS transitions (hence the
* name of the component).
*
* ---
*
* By default the `Transition` component does not alter the behavior of the
* component it renders, it only tracks "enter" and "exit" states for the
* components. It's up to you to give meaning and effect to those states. For
* example we can add styles to a component when it enters or exits:
*
* ```jsx
* import { Transition } from 'react-transition-group';
*
* const duration = 300;
*
* const defaultStyle = {
*   transition: `opacity ${duration}ms ease-in-out`,
*   opacity: 0,
* }
*
* const transitionStyles = {
*   entering: { opacity: 1 },
*   entered:  { opacity: 1 },
*   exiting:  { opacity: 0 },
*   exited:  { opacity: 0 },
* };
*
* const Fade = ({ in: inProp }) => (
*   <Transition in={inProp} timeout={duration}>
*     {state => (
*       <div style={{
*         ...defaultStyle,
*         ...transitionStyles[state]
*       }}>
*         I'm a fade Transition!
*       </div>
*     )}
*   </Transition>
* );
* ```
*
* There are 4 main states a Transition can be in:
*  - `'entering'`
*  - `'entered'`
*  - `'exiting'`
*  - `'exited'`
*
* Transition state is toggled via the `in` prop. When `true` the component
* begins the "Enter" stage. During this stage, the component will shift from
* its current transition state, to `'entering'` for the duration of the
* transition and then to the `'entered'` stage once it's complete. Let's take
* the following example (we'll use the
* [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
*
* ```jsx
* function App() {
*   const [inProp, setInProp] = useState(false);
*   return (
*     <div>
*       <Transition in={inProp} timeout={500}>
*         {state => (
*           // ...
*         )}
*       </Transition>
*       <button onClick={() => setInProp(true)}>
*         Click to Enter
*       </button>
*     </div>
*   );
* }
* ```
*
* When the button is clicked the component will shift to the `'entering'` state
* and stay there for 500ms (the value of `timeout`) before it finally switches
* to `'entered'`.
*
* When `in` is `false` the same thing happens except the state moves from
* `'exiting'` to `'exited'`.
*/
var Transition = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(Transition, _React$Component);
	function Transition(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		var parentGroup = context;
		var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
		var initialStatus;
		_this.appearStatus = null;
		if (props.in) if (appear) {
			initialStatus = EXITED;
			_this.appearStatus = ENTERING;
		} else initialStatus = ENTERED;
		else if (props.unmountOnExit || props.mountOnEnter) initialStatus = UNMOUNTED;
		else initialStatus = EXITED;
		_this.state = { status: initialStatus };
		_this.nextCallback = null;
		return _this;
	}
	Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
		if (_ref.in && prevState.status === "unmounted") return { status: EXITED };
		return null;
	};
	var _proto = Transition.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.updateStatus(true, this.appearStatus);
	};
	_proto.componentDidUpdate = function componentDidUpdate(prevProps) {
		var nextStatus = null;
		if (prevProps !== this.props) {
			var status = this.state.status;
			if (this.props.in) {
				if (status !== "entering" && status !== "entered") nextStatus = ENTERING;
			} else if (status === "entering" || status === "entered") nextStatus = EXITING;
		}
		this.updateStatus(false, nextStatus);
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.cancelNextCallback();
	};
	_proto.getTimeouts = function getTimeouts() {
		var timeout = this.props.timeout;
		var exit = enter = appear = timeout, enter, appear;
		if (timeout != null && typeof timeout !== "number") {
			exit = timeout.exit;
			enter = timeout.enter;
			appear = timeout.appear !== void 0 ? timeout.appear : enter;
		}
		return {
			exit,
			enter,
			appear
		};
	};
	_proto.updateStatus = function updateStatus(mounting, nextStatus) {
		if (mounting === void 0) mounting = false;
		if (nextStatus !== null) {
			this.cancelNextCallback();
			if (nextStatus === "entering") {
				if (this.props.unmountOnExit || this.props.mountOnEnter) {
					var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
					if (node) forceReflow(node);
				}
				this.performEnter(mounting);
			} else this.performExit();
		} else if (this.props.unmountOnExit && this.state.status === "exited") this.setState({ status: UNMOUNTED });
	};
	_proto.performEnter = function performEnter(mounting) {
		var _this2 = this;
		var enter = this.props.enter;
		var appearing = this.context ? this.context.isMounting : mounting;
		var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom.default.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
		var timeouts = this.getTimeouts();
		var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
		if (!mounting && !enter || config_default.disabled) {
			this.safeSetState({ status: ENTERED }, function() {
				_this2.props.onEntered(maybeNode);
			});
			return;
		}
		this.props.onEnter(maybeNode, maybeAppearing);
		this.safeSetState({ status: ENTERING }, function() {
			_this2.props.onEntering(maybeNode, maybeAppearing);
			_this2.onTransitionEnd(enterTimeout, function() {
				_this2.safeSetState({ status: ENTERED }, function() {
					_this2.props.onEntered(maybeNode, maybeAppearing);
				});
			});
		});
	};
	_proto.performExit = function performExit() {
		var _this3 = this;
		var exit = this.props.exit;
		var timeouts = this.getTimeouts();
		var maybeNode = this.props.nodeRef ? void 0 : import_react_dom.default.findDOMNode(this);
		if (!exit || config_default.disabled) {
			this.safeSetState({ status: EXITED }, function() {
				_this3.props.onExited(maybeNode);
			});
			return;
		}
		this.props.onExit(maybeNode);
		this.safeSetState({ status: EXITING }, function() {
			_this3.props.onExiting(maybeNode);
			_this3.onTransitionEnd(timeouts.exit, function() {
				_this3.safeSetState({ status: EXITED }, function() {
					_this3.props.onExited(maybeNode);
				});
			});
		});
	};
	_proto.cancelNextCallback = function cancelNextCallback() {
		if (this.nextCallback !== null) {
			this.nextCallback.cancel();
			this.nextCallback = null;
		}
	};
	_proto.safeSetState = function safeSetState(nextState, callback) {
		callback = this.setNextCallback(callback);
		this.setState(nextState, callback);
	};
	_proto.setNextCallback = function setNextCallback(callback) {
		var _this4 = this;
		var active = true;
		this.nextCallback = function(event) {
			if (active) {
				active = false;
				_this4.nextCallback = null;
				callback(event);
			}
		};
		this.nextCallback.cancel = function() {
			active = false;
		};
		return this.nextCallback;
	};
	_proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
		this.setNextCallback(handler);
		var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
		var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
		if (!node || doesNotHaveTimeoutOrListener) {
			setTimeout(this.nextCallback, 0);
			return;
		}
		if (this.props.addEndListener) {
			var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
			this.props.addEndListener(maybeNode, maybeNextCallback);
		}
		if (timeout != null) setTimeout(this.nextCallback, timeout);
	};
	_proto.render = function render() {
		var status = this.state.status;
		if (status === "unmounted") return null;
		var _this$props = this.props, children = _this$props.children;
		_this$props.in;
		_this$props.mountOnEnter;
		_this$props.unmountOnExit;
		_this$props.appear;
		_this$props.enter;
		_this$props.exit;
		_this$props.timeout;
		_this$props.addEndListener;
		_this$props.onEnter;
		_this$props.onEntering;
		_this$props.onEntered;
		_this$props.onExit;
		_this$props.onExiting;
		_this$props.onExited;
		_this$props.nodeRef;
		var childProps = _objectWithoutPropertiesLoose(_this$props, [
			"children",
			"in",
			"mountOnEnter",
			"unmountOnExit",
			"appear",
			"enter",
			"exit",
			"timeout",
			"addEndListener",
			"onEnter",
			"onEntering",
			"onEntered",
			"onExit",
			"onExiting",
			"onExited",
			"nodeRef"
		]);
		return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: null }, typeof children === "function" ? children(status, childProps) : import_react.cloneElement(import_react.Children.only(children), childProps));
	};
	return Transition;
}(import_react.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = {};
function noop$1() {}
Transition.defaultProps = {
	in: false,
	mountOnEnter: false,
	unmountOnExit: false,
	appear: false,
	enter: true,
	exit: true,
	onEnter: noop$1,
	onEntering: noop$1,
	onEntered: noop$1,
	onExit: noop$1,
	onExiting: noop$1,
	onExited: noop$1
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
//#endregion
//#region node_modules/.pnpm/react-transition-group@4.4.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/react-transition-group/esm/utils/ChildMapping.js
/**
* Given `this.props.children`, return an object mapping key to child.
*
* @param {*} children `this.props.children`
* @return {object} Mapping of key to child
*/
function getChildMapping(children, mapFn) {
	var mapper = function mapper(child) {
		return mapFn && (0, import_react.isValidElement)(child) ? mapFn(child) : child;
	};
	var result = Object.create(null);
	if (children) import_react.Children.map(children, function(c) {
		return c;
	}).forEach(function(child) {
		result[child.key] = mapper(child);
	});
	return result;
}
/**
* When you're adding or removing children some may be added or removed in the
* same render pass. We want to show *both* since we want to simultaneously
* animate elements in and out. This function takes a previous set of keys
* and a new set of keys and merges them with its best guess of the correct
* ordering. In the future we may expose some of the utilities in
* ReactMultiChild to make this easy, but for now React itself does not
* directly have this concept of the union of prevChildren and nextChildren
* so we implement it here.
*
* @param {object} prev prev children as returned from
* `ReactTransitionChildMapping.getChildMapping()`.
* @param {object} next next children as returned from
* `ReactTransitionChildMapping.getChildMapping()`.
* @return {object} a key set that contains all keys in `prev` and all keys
* in `next` in a reasonable order.
*/
function mergeChildMappings(prev, next) {
	prev = prev || {};
	next = next || {};
	function getValueForKey(key) {
		return key in next ? next[key] : prev[key];
	}
	var nextKeysPending = Object.create(null);
	var pendingKeys = [];
	for (var prevKey in prev) if (prevKey in next) {
		if (pendingKeys.length) {
			nextKeysPending[prevKey] = pendingKeys;
			pendingKeys = [];
		}
	} else pendingKeys.push(prevKey);
	var i;
	var childMapping = {};
	for (var nextKey in next) {
		if (nextKeysPending[nextKey]) for (i = 0; i < nextKeysPending[nextKey].length; i++) {
			var pendingNextKey = nextKeysPending[nextKey][i];
			childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
		}
		childMapping[nextKey] = getValueForKey(nextKey);
	}
	for (i = 0; i < pendingKeys.length; i++) childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	return childMapping;
}
function getProp(child, prop, props) {
	return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
	return getChildMapping(props.children, function(child) {
		return (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			appear: getProp(child, "appear", props),
			enter: getProp(child, "enter", props),
			exit: getProp(child, "exit", props)
		});
	});
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
	var nextChildMapping = getChildMapping(nextProps.children);
	var children = mergeChildMappings(prevChildMapping, nextChildMapping);
	Object.keys(children).forEach(function(key) {
		var child = children[key];
		if (!(0, import_react.isValidElement)(child)) return;
		var hasPrev = key in prevChildMapping;
		var hasNext = key in nextChildMapping;
		var prevChild = prevChildMapping[key];
		var isLeaving = (0, import_react.isValidElement)(prevChild) && !prevChild.props.in;
		if (hasNext && (!hasPrev || isLeaving)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
		else if (!hasNext && hasPrev && !isLeaving) children[key] = (0, import_react.cloneElement)(child, { in: false });
		else if (hasNext && hasPrev && (0, import_react.isValidElement)(prevChild)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: prevChild.props.in,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
	});
	return children;
}
//#endregion
//#region node_modules/.pnpm/react-transition-group@4.4.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/react-transition-group/esm/TransitionGroup.js
var values = Object.values || function(obj) {
	return Object.keys(obj).map(function(k) {
		return obj[k];
	});
};
var defaultProps = {
	component: "div",
	childFactory: function childFactory(child) {
		return child;
	}
};
/**
* The `<TransitionGroup>` component manages a set of transition components
* (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
* components, `<TransitionGroup>` is a state machine for managing the mounting
* and unmounting of components over time.
*
* Consider the example below. As items are removed or added to the TodoList the
* `in` prop is toggled automatically by the `<TransitionGroup>`.
*
* Note that `<TransitionGroup>`  does not define any animation behavior!
* Exactly _how_ a list item animates is up to the individual transition
* component. This means you can mix and match animations across different list
* items.
*/
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(TransitionGroup, _React$Component);
	function TransitionGroup(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		_this.state = {
			contextValue: { isMounting: true },
			handleExited: _this.handleExited.bind(_assertThisInitialized(_this)),
			firstRender: true
		};
		return _this;
	}
	var _proto = TransitionGroup.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.mounted = true;
		this.setState({ contextValue: { isMounting: false } });
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.mounted = false;
	};
	TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
		var prevChildMapping = _ref.children, handleExited = _ref.handleExited;
		return {
			children: _ref.firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
			firstRender: false
		};
	};
	_proto.handleExited = function handleExited(child, node) {
		var currentChildMapping = getChildMapping(this.props.children);
		if (child.key in currentChildMapping) return;
		if (child.props.onExited) child.props.onExited(node);
		if (this.mounted) this.setState(function(state) {
			var children = _extends({}, state.children);
			delete children[child.key];
			return { children };
		});
	};
	_proto.render = function render() {
		var _this$props = this.props, Component = _this$props.component, childFactory = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
		var contextValue = this.state.contextValue;
		var children = values(this.state.children).map(childFactory);
		delete props.appear;
		delete props.enter;
		delete props.exit;
		if (Component === null) return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, children);
		return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, /* @__PURE__ */ import_react.createElement(Component, props, children));
	};
	return TransitionGroup;
}(import_react.Component);
TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
var UNINITIALIZED = {};
/**
* A React.useRef() that is initialized lazily with a function. Note that it accepts an optional
* initialization argument, so the initialization function doesn't need to be an inline closure.
*
* @usage
*   const ref = useLazyRef(sortColumns, columns)
*/
function useLazyRef(init, initArg) {
	const ref = import_react.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useOnMount/useOnMount.js
var EMPTY = [];
/**
* A React.useEffect equivalent that runs once, when the component is mounted.
*/
function useOnMount(fn) {
	import_react.useEffect(fn, EMPTY);
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useTimeout/useTimeout.js
var Timeout = class Timeout {
	static create() {
		return new Timeout();
	}
	currentId = null;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	start(delay, fn) {
		this.clear();
		this.currentId = setTimeout(() => {
			this.currentId = null;
			fn();
		}, delay);
	}
	clear = () => {
		if (this.currentId !== null) {
			clearTimeout(this.currentId);
			this.currentId = null;
		}
	};
	disposeEffect = () => {
		return this.clear;
	};
};
function useTimeout() {
	const timeout = useLazyRef(Timeout.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/transitions/utils.js
var reflow = (node) => node.scrollTop;
function getTransitionProps(props, options) {
	const { timeout, easing, style = {} } = props;
	return {
		duration: style.transitionDuration ?? (typeof timeout === "number" ? timeout : timeout[options.mode] || 0),
		easing: style.transitionTimingFunction ?? (typeof easing === "object" ? easing[options.mode] : easing),
		delay: style.transitionDelay
	};
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js
/**
* Determines if a given element is a DOM element name (i.e. not a React component).
*/
function isHostComponent(element) {
	return typeof element === "string";
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js
/**
* Type of the ownerState based on the type of an element it applies to.
* This resolves to the provided OwnerState for React components and `undefined` for host components.
* Falls back to `OwnerState | undefined` when the exact type can't be determined in development time.
*/
/**
* Appends the ownerState object to the props, merging with the existing one if necessary.
*
* @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node or undefined, `ownerState` is not applied.
* @param otherProps Props of the element.
* @param ownerState
*/
function appendOwnerState(elementType, otherProps, ownerState) {
	if (elementType === void 0 || isHostComponent(elementType)) return otherProps;
	return {
		...otherProps,
		ownerState: {
			...otherProps.ownerState,
			...ownerState
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js
/**
* If `componentProps` is a function, calls it with the provided `ownerState`.
* Otherwise, just returns `componentProps`.
*/
function resolveComponentProps(componentProps, ownerState, slotState) {
	if (typeof componentProps === "function") return componentProps(ownerState, slotState);
	return componentProps;
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js
/**
* Extracts event handlers from a given object.
* A prop is considered an event handler if it is a function and its name starts with `on`.
*
* @param object An object to extract event handlers from.
* @param excludeKeys An array of keys to exclude from the returned object.
*/
function extractEventHandlers(object, excludeKeys = []) {
	if (object === void 0) return {};
	const result = {};
	Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
		result[prop] = object[prop];
	});
	return result;
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js
/**
* Removes event handlers from the given object.
* A field is considered an event handler if it is a function with a name beginning with `on`.
*
* @param object Object to remove event handlers from.
* @returns Object with event handlers removed.
*/
function omitEventHandlers(object) {
	if (object === void 0) return {};
	const result = {};
	Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
		result[prop] = object[prop];
	});
	return result;
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js
/**
* Merges the slot component internal props (usually coming from a hook)
* with the externally provided ones.
*
* The merge order is (the latter overrides the former):
* 1. The internal props (specified as a getter function to work with get*Props hook result)
* 2. Additional props (specified internally on a Base UI component)
* 3. External props specified on the owner component. These should only be used on a root slot.
* 4. External props specified in the `slotProps.*` prop.
* 5. The `className` prop - combined from all the above.
* @param parameters
* @returns
*/
function mergeSlotProps(parameters) {
	const { getSlotProps, additionalProps, externalSlotProps, externalForwardedProps, className } = parameters;
	if (!getSlotProps) {
		const joinedClasses = clsx(additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
		const mergedStyle = {
			...additionalProps?.style,
			...externalForwardedProps?.style,
			...externalSlotProps?.style
		};
		const props = {
			...additionalProps,
			...externalForwardedProps,
			...externalSlotProps
		};
		if (joinedClasses.length > 0) props.className = joinedClasses;
		if (Object.keys(mergedStyle).length > 0) props.style = mergedStyle;
		return {
			props,
			internalRef: void 0
		};
	}
	const eventHandlers = extractEventHandlers({
		...externalForwardedProps,
		...externalSlotProps
	});
	const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
	const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
	const internalSlotProps = getSlotProps(eventHandlers);
	const joinedClasses = clsx(internalSlotProps?.className, additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
	const mergedStyle = {
		...internalSlotProps?.style,
		...additionalProps?.style,
		...externalForwardedProps?.style,
		...externalSlotProps?.style
	};
	const props = {
		...internalSlotProps,
		...additionalProps,
		...otherPropsWithoutEventHandlers,
		...componentsPropsWithoutEventHandlers
	};
	if (joinedClasses.length > 0) props.className = joinedClasses;
	if (Object.keys(mergedStyle).length > 0) props.style = mergedStyle;
	return {
		props,
		internalRef: internalSlotProps.ref
	};
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/useSlot.js
/**
* An internal function to create a Material UI slot.
*
* This is an advanced version of Base UI `useSlotProps` because Material UI allows leaf component to be customized via `component` prop
* while Base UI does not need to support leaf component customization.
*
* @param {string} name: name of the slot
* @param {object} parameters
* @returns {[Slot, slotProps]} The slot's React component and the slot's props
*
* Note: the returned slot's props
* - will never contain `component` prop.
* - might contain `as` prop.
*/
function useSlot(name, parameters) {
	const { className, elementType: initialElementType, ownerState, externalForwardedProps, internalForwardedProps, shouldForwardComponentProp = false, ...useSlotPropsParams } = parameters;
	const { component: rootComponent, slots = { [name]: void 0 }, slotProps = { [name]: void 0 }, ...other } = externalForwardedProps;
	const elementType = slots[name] || initialElementType;
	const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
	const { props: { component: slotComponent, ...mergedProps }, internalRef } = mergeSlotProps({
		className,
		...useSlotPropsParams,
		externalForwardedProps: name === "root" ? other : void 0,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);
	const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
	return [elementType, appendOwnerState(elementType, {
		...name === "root" && !rootComponent && !slots[name] && internalForwardedProps,
		...name !== "root" && !slots[name] && internalForwardedProps,
		...mergedProps,
		...LeafComponent && !shouldForwardComponentProp && { as: LeafComponent },
		...LeafComponent && shouldForwardComponentProp && { component: LeafComponent },
		ref
	}, ownerState)];
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Paper/paperClasses.js
function getPaperUtilityClass(slot) {
	return generateUtilityClass("MuiPaper", slot);
}
generateUtilityClasses("MuiPaper", [
	"root",
	"rounded",
	"outlined",
	"elevation",
	"elevation0",
	"elevation1",
	"elevation2",
	"elevation3",
	"elevation4",
	"elevation5",
	"elevation6",
	"elevation7",
	"elevation8",
	"elevation9",
	"elevation10",
	"elevation11",
	"elevation12",
	"elevation13",
	"elevation14",
	"elevation15",
	"elevation16",
	"elevation17",
	"elevation18",
	"elevation19",
	"elevation20",
	"elevation21",
	"elevation22",
	"elevation23",
	"elevation24"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Paper/Paper.js
var useUtilityClasses$61 = (ownerState) => {
	const { square, elevation, variant, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		!square && "rounded",
		variant === "elevation" && `elevation${elevation}`
	] }, getPaperUtilityClass, classes);
};
var PaperRoot = styled$2("div", {
	name: "MuiPaper",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			!ownerState.square && styles.rounded,
			ownerState.variant === "elevation" && styles[`elevation${ownerState.elevation}`]
		];
	}
})(memoTheme(({ theme }) => ({
	backgroundColor: (theme.vars || theme).palette.background.paper,
	color: (theme.vars || theme).palette.text.primary,
	transition: theme.transitions.create("box-shadow"),
	variants: [
		{
			props: ({ ownerState }) => !ownerState.square,
			style: { borderRadius: theme.shape.borderRadius }
		},
		{
			props: { variant: "outlined" },
			style: { border: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: { variant: "elevation" },
			style: {
				boxShadow: "var(--Paper-shadow)",
				backgroundImage: "var(--Paper-overlay)"
			}
		}
	]
})));
var Paper = /* @__PURE__ */ import_react.forwardRef(function Paper(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiPaper"
	});
	const theme = useTheme$3();
	const { className, component = "div", elevation = 1, square = false, variant = "elevation", ...other } = props;
	const ownerState = {
		...props,
		component,
		elevation,
		square,
		variant
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperRoot, {
		as: component,
		ownerState,
		className: clsx(useUtilityClasses$61(ownerState).root, className),
		ref,
		...other,
		style: {
			...variant === "elevation" && {
				"--Paper-shadow": (theme.vars || theme).shadows[elevation],
				...theme.vars && { "--Paper-overlay": theme.vars.overlays?.[elevation] },
				...!theme.vars && theme.palette.mode === "dark" && { "--Paper-overlay": `linear-gradient(${alpha("#fff", getOverlayAlpha(elevation))}, ${alpha("#fff", getOverlayAlpha(elevation))})` }
			},
			...other.style
		}
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/isFocusVisible/isFocusVisible.js
/**
* Returns a boolean indicating if the event's target has :focus-visible
*/
function isFocusVisible(element) {
	try {
		return element.matches(":focus-visible");
	} catch (error) {}
	return false;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/useLazyRipple/useLazyRipple.js
/**
* Lazy initialization container for the Ripple instance. This improves
* performance by delaying mounting the ripple until it's needed.
*/
var LazyRipple = class LazyRipple {
	/** React ref to the ripple instance */
	/** If the ripple component should be mounted */
	/** Promise that resolves when the ripple component is mounted */
	/** If the ripple component has been mounted */
	/** React state hook setter */
	static create() {
		return new LazyRipple();
	}
	static use() {
		const ripple = useLazyRef(LazyRipple.create).current;
		const [shouldMount, setShouldMount] = import_react.useState(false);
		ripple.shouldMount = shouldMount;
		ripple.setShouldMount = setShouldMount;
		import_react.useEffect(ripple.mountEffect, [shouldMount]);
		return ripple;
	}
	constructor() {
		this.ref = { current: null };
		this.mounted = null;
		this.didMount = false;
		this.shouldMount = false;
		this.setShouldMount = null;
	}
	mount() {
		if (!this.mounted) {
			this.mounted = createControlledPromise();
			this.shouldMount = true;
			this.setShouldMount(this.shouldMount);
		}
		return this.mounted;
	}
	mountEffect = () => {
		if (this.shouldMount && !this.didMount) {
			if (this.ref.current !== null) {
				this.didMount = true;
				this.mounted.resolve();
			}
		}
	};
	start(...args) {
		this.mount().then(() => this.ref.current?.start(...args));
	}
	stop(...args) {
		this.mount().then(() => this.ref.current?.stop(...args));
	}
	pulsate(...args) {
		this.mount().then(() => this.ref.current?.pulsate(...args));
	}
};
function useLazyRipple() {
	return LazyRipple.use();
}
function createControlledPromise() {
	let resolve;
	let reject;
	const p = new Promise((resolveFn, rejectFn) => {
		resolve = resolveFn;
		reject = rejectFn;
	});
	p.resolve = resolve;
	p.reject = reject;
	return p;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ButtonBase/Ripple.js
/**
* @ignore - internal component.
*/
function Ripple(props) {
	const { className, classes, pulsate = false, rippleX, rippleY, rippleSize, in: inProp, onExited, timeout } = props;
	const [leaving, setLeaving] = import_react.useState(false);
	const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
	const rippleStyles = {
		width: rippleSize,
		height: rippleSize,
		top: -(rippleSize / 2) + rippleY,
		left: -(rippleSize / 2) + rippleX
	};
	const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
	if (!inProp && !leaving) setLeaving(true);
	import_react.useEffect(() => {
		if (!inProp && onExited != null) {
			const timeoutId = setTimeout(onExited, timeout);
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [
		onExited,
		inProp,
		timeout
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: rippleClassName,
		style: rippleStyles,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: childClassName })
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ButtonBase/touchRippleClasses.js
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", [
	"root",
	"ripple",
	"rippleVisible",
	"ripplePulsate",
	"child",
	"childLeaving",
	"childPulsate"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ButtonBase/TouchRipple.js
var DURATION = 550;
var enterKeyframe = import_emotion_react_cjs.keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
var exitKeyframe = import_emotion_react_cjs.keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
var pulsateKeyframe = import_emotion_react_cjs.keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
var TouchRippleRoot = styled$2("span", {
	name: "MuiTouchRipple",
	slot: "Root"
})({
	overflow: "hidden",
	pointerEvents: "none",
	position: "absolute",
	zIndex: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	borderRadius: "inherit"
});
var TouchRippleRipple = styled$2(Ripple, {
	name: "MuiTouchRipple",
	slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  &.${touchRippleClasses.ripplePulsate} {
    animation-duration: ${({ theme }) => theme.transitions.duration.shorter}ms;
  }

  & .${touchRippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  & .${touchRippleClasses.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;
/**
* @ignore - internal component.
*
* TODO v5: Make private
*/
var TouchRipple = /* @__PURE__ */ import_react.forwardRef(function TouchRipple(inProps, ref) {
	const { center: centerProp = false, classes = {}, className, ...other } = useDefaultProps({
		props: inProps,
		name: "MuiTouchRipple"
	});
	const [ripples, setRipples] = import_react.useState([]);
	const nextKey = import_react.useRef(0);
	const rippleCallback = import_react.useRef(null);
	import_react.useEffect(() => {
		if (rippleCallback.current) {
			rippleCallback.current();
			rippleCallback.current = null;
		}
	}, [ripples]);
	const ignoringMouseDown = import_react.useRef(false);
	const startTimer = useTimeout();
	const startTimerCommit = import_react.useRef(null);
	const container = import_react.useRef(null);
	const startCommit = import_react.useCallback((params) => {
		const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
		setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRippleRipple, {
			classes: {
				ripple: clsx(classes.ripple, touchRippleClasses.ripple),
				rippleVisible: clsx(classes.rippleVisible, touchRippleClasses.rippleVisible),
				ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses.ripplePulsate),
				child: clsx(classes.child, touchRippleClasses.child),
				childLeaving: clsx(classes.childLeaving, touchRippleClasses.childLeaving),
				childPulsate: clsx(classes.childPulsate, touchRippleClasses.childPulsate)
			},
			timeout: DURATION,
			pulsate,
			rippleX,
			rippleY,
			rippleSize
		}, nextKey.current)]);
		nextKey.current += 1;
		rippleCallback.current = cb;
	}, [classes]);
	const start = import_react.useCallback((event = {}, options = {}, cb = () => {}) => {
		const { pulsate = false, center = centerProp || options.pulsate, fakeElement = false } = options;
		if (event?.type === "mousedown" && ignoringMouseDown.current) {
			ignoringMouseDown.current = false;
			return;
		}
		if (event?.type === "touchstart") ignoringMouseDown.current = true;
		const element = fakeElement ? null : container.current;
		const rect = element ? element.getBoundingClientRect() : {
			width: 0,
			height: 0,
			left: 0,
			top: 0
		};
		let rippleX;
		let rippleY;
		let rippleSize;
		if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
			rippleX = Math.round(rect.width / 2);
			rippleY = Math.round(rect.height / 2);
		} else {
			const { clientX, clientY } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
			rippleX = Math.round(clientX - rect.left);
			rippleY = Math.round(clientY - rect.top);
		}
		if (center) {
			rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
			if (rippleSize % 2 === 0) rippleSize += 1;
		} else {
			const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
			const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
			rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
		}
		if (event?.touches) {
			if (startTimerCommit.current === null) {
				startTimerCommit.current = () => {
					startCommit({
						pulsate,
						rippleX,
						rippleY,
						rippleSize,
						cb
					});
				};
				startTimer.start(80, () => {
					if (startTimerCommit.current) {
						startTimerCommit.current();
						startTimerCommit.current = null;
					}
				});
			}
		} else startCommit({
			pulsate,
			rippleX,
			rippleY,
			rippleSize,
			cb
		});
	}, [
		centerProp,
		startCommit,
		startTimer
	]);
	const pulsate = import_react.useCallback(() => {
		start({}, { pulsate: true });
	}, [start]);
	const stop = import_react.useCallback((event, cb) => {
		startTimer.clear();
		if (event?.type === "touchend" && startTimerCommit.current) {
			startTimerCommit.current();
			startTimerCommit.current = null;
			startTimer.start(0, () => {
				stop(event, cb);
			});
			return;
		}
		startTimerCommit.current = null;
		setRipples((oldRipples) => {
			if (oldRipples.length > 0) return oldRipples.slice(1);
			return oldRipples;
		});
		rippleCallback.current = cb;
	}, [startTimer]);
	import_react.useImperativeHandle(ref, () => ({
		pulsate,
		start,
		stop
	}), [
		pulsate,
		start,
		stop
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRippleRoot, {
		className: clsx(touchRippleClasses.root, classes.root, className),
		ref: container,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionGroup, {
			component: null,
			exit: true,
			children: ripples
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ButtonBase/buttonBaseClasses.js
function getButtonBaseUtilityClass(slot) {
	return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", [
	"root",
	"disabled",
	"focusVisible"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ButtonBase/ButtonBase.js
var useUtilityClasses$60 = (ownerState) => {
	const { disabled, focusVisible, focusVisibleClassName, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		disabled && "disabled",
		focusVisible && "focusVisible"
	] }, getButtonBaseUtilityClass, classes);
	if (focusVisible && focusVisibleClassName) composedClasses.root += ` ${focusVisibleClassName}`;
	return composedClasses;
};
var ButtonBaseRoot = styled$2("button", {
	name: "MuiButtonBase",
	slot: "Root"
})({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	boxSizing: "border-box",
	WebkitTapHighlightColor: "transparent",
	backgroundColor: "transparent",
	outline: 0,
	border: 0,
	margin: 0,
	borderRadius: 0,
	padding: 0,
	cursor: "pointer",
	userSelect: "none",
	verticalAlign: "middle",
	MozAppearance: "none",
	WebkitAppearance: "none",
	textDecoration: "none",
	color: "inherit",
	"&::-moz-focus-inner": { borderStyle: "none" },
	[`&.${buttonBaseClasses.disabled}`]: {
		pointerEvents: "none",
		cursor: "default"
	},
	"@media print": { colorAdjust: "exact" }
});
/**
* `ButtonBase` contains as few styles as possible.
* It aims to be a simple building block for creating a button.
* It contains a load of style reset and some focus/ripple logic.
*/
var ButtonBase = /* @__PURE__ */ import_react.forwardRef(function ButtonBase(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiButtonBase"
	});
	const { action, centerRipple = false, children, className, component = "button", disabled = false, disableRipple = false, disableTouchRipple = false, focusRipple = false, focusVisibleClassName, LinkComponent = "a", onBlur, onClick, onContextMenu, onDragLeave, onFocus, onFocusVisible, onKeyDown, onKeyUp, onMouseDown, onMouseLeave, onMouseUp, onTouchEnd, onTouchMove, onTouchStart, tabIndex = 0, TouchRippleProps, touchRippleRef, type, ...other } = props;
	const buttonRef = import_react.useRef(null);
	const ripple = useLazyRipple();
	const handleRippleRef = useForkRef_default(ripple.ref, touchRippleRef);
	const [focusVisible, setFocusVisible] = import_react.useState(false);
	if (disabled && focusVisible) setFocusVisible(false);
	import_react.useImperativeHandle(action, () => ({ focusVisible: () => {
		setFocusVisible(true);
		buttonRef.current.focus();
	} }), []);
	const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
	import_react.useEffect(() => {
		if (focusVisible && focusRipple && !disableRipple) ripple.pulsate();
	}, [
		disableRipple,
		focusRipple,
		focusVisible,
		ripple
	]);
	const handleMouseDown = useRippleHandler(ripple, "start", onMouseDown, disableTouchRipple);
	const handleContextMenu = useRippleHandler(ripple, "stop", onContextMenu, disableTouchRipple);
	const handleDragLeave = useRippleHandler(ripple, "stop", onDragLeave, disableTouchRipple);
	const handleMouseUp = useRippleHandler(ripple, "stop", onMouseUp, disableTouchRipple);
	const handleMouseLeave = useRippleHandler(ripple, "stop", (event) => {
		if (focusVisible) event.preventDefault();
		if (onMouseLeave) onMouseLeave(event);
	}, disableTouchRipple);
	const handleTouchStart = useRippleHandler(ripple, "start", onTouchStart, disableTouchRipple);
	const handleTouchEnd = useRippleHandler(ripple, "stop", onTouchEnd, disableTouchRipple);
	const handleTouchMove = useRippleHandler(ripple, "stop", onTouchMove, disableTouchRipple);
	const handleBlur = useRippleHandler(ripple, "stop", (event) => {
		if (!isFocusVisible(event.target)) setFocusVisible(false);
		if (onBlur) onBlur(event);
	}, false);
	const handleFocus = useEventCallback_default((event) => {
		if (!buttonRef.current) buttonRef.current = event.currentTarget;
		if (isFocusVisible(event.target)) {
			setFocusVisible(true);
			if (onFocusVisible) onFocusVisible(event);
		}
		if (onFocus) onFocus(event);
	});
	const isNonNativeButton = () => {
		const button = buttonRef.current;
		return component && component !== "button" && !(button.tagName === "A" && button.href);
	};
	const handleKeyDown = useEventCallback_default((event) => {
		if (focusRipple && !event.repeat && focusVisible && event.key === " ") ripple.stop(event, () => {
			ripple.start(event);
		});
		if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") event.preventDefault();
		if (onKeyDown) onKeyDown(event);
		if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
			event.preventDefault();
			if (onClick) onClick(event);
		}
	});
	const handleKeyUp = useEventCallback_default((event) => {
		if (focusRipple && event.key === " " && focusVisible && !event.defaultPrevented) ripple.stop(event, () => {
			ripple.pulsate(event);
		});
		if (onKeyUp) onKeyUp(event);
		if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) onClick(event);
	});
	let ComponentProp = component;
	if (ComponentProp === "button" && (other.href || other.to)) ComponentProp = LinkComponent;
	const buttonProps = {};
	if (ComponentProp === "button") {
		const hasFormAttributes = !!other.formAction;
		buttonProps.type = type === void 0 && !hasFormAttributes ? "button" : type;
		buttonProps.disabled = disabled;
	} else {
		if (!other.href && !other.to) buttonProps.role = "button";
		if (disabled) buttonProps["aria-disabled"] = disabled;
	}
	const handleRef = useForkRef_default(ref, buttonRef);
	const ownerState = {
		...props,
		centerRipple,
		component,
		disabled,
		disableRipple,
		disableTouchRipple,
		focusRipple,
		tabIndex,
		focusVisible
	};
	const classes = useUtilityClasses$60(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonBaseRoot, {
		as: ComponentProp,
		className: clsx(classes.root, className),
		ownerState,
		onBlur: handleBlur,
		onClick,
		onContextMenu: handleContextMenu,
		onFocus: handleFocus,
		onKeyDown: handleKeyDown,
		onKeyUp: handleKeyUp,
		onMouseDown: handleMouseDown,
		onMouseLeave: handleMouseLeave,
		onMouseUp: handleMouseUp,
		onDragLeave: handleDragLeave,
		onTouchEnd: handleTouchEnd,
		onTouchMove: handleTouchMove,
		onTouchStart: handleTouchStart,
		ref: handleRef,
		tabIndex: disabled ? -1 : tabIndex,
		type,
		...buttonProps,
		...other,
		children: [children, enableTouchRipple ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRipple, {
			ref: handleRippleRef,
			center: centerRipple,
			...TouchRippleProps
		}) : null]
	});
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
	return useEventCallback_default((event) => {
		if (eventCallback) eventCallback(event);
		if (!skipRippleAction) ripple[rippleAction](event);
		return true;
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/createSimplePaletteValueFilter.js
/**
* Type guard to check if the object has a "main" property of type string.
*
* @param obj - the object to check
* @returns boolean
*/
function hasCorrectMainProperty(obj) {
	return typeof obj.main === "string";
}
/**
* Checks if the object conforms to the SimplePaletteColorOptions type.
* The minimum requirement is that the object has a "main" property of type string, this is always checked.
* Optionally, you can pass additional properties to check.
*
* @param obj - The object to check
* @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
* @returns boolean
*/
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
	if (!hasCorrectMainProperty(obj)) return false;
	for (const value of additionalPropertiesToCheck) if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") return false;
	return true;
}
/**
* Creates a filter function used to filter simple palette color options.
* The minimum requirement is that the object has a "main" property of type string, this is always checked.
* Optionally, you can pass additional properties to check.
*
* @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
* @returns ([, value]: [any, PaletteColorOptions]) => boolean
*/
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
	return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Alert/alertClasses.js
function getAlertUtilityClass(slot) {
	return generateUtilityClass("MuiAlert", slot);
}
var alertClasses = generateUtilityClasses("MuiAlert", [
	"root",
	"action",
	"icon",
	"message",
	"filled",
	"colorSuccess",
	"colorInfo",
	"colorWarning",
	"colorError",
	"filledSuccess",
	"filledInfo",
	"filledWarning",
	"filledError",
	"outlined",
	"outlinedSuccess",
	"outlinedInfo",
	"outlinedWarning",
	"outlinedError",
	"standard",
	"standardSuccess",
	"standardInfo",
	"standardWarning",
	"standardError"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CircularProgress/circularProgressClasses.js
function getCircularProgressUtilityClass(slot) {
	return generateUtilityClass("MuiCircularProgress", slot);
}
generateUtilityClasses("MuiCircularProgress", [
	"root",
	"determinate",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"svg",
	"track",
	"circle",
	"circleDeterminate",
	"circleIndeterminate",
	"circleDisableShrink"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js
var SIZE = 44;
var circularRotateKeyframe = import_emotion_react_cjs.keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
var circularDashKeyframe = import_emotion_react_cjs.keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;
var rotateAnimation = typeof circularRotateKeyframe !== "string" ? import_emotion_react_cjs.css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
var dashAnimation = typeof circularDashKeyframe !== "string" ? import_emotion_react_cjs.css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
var useUtilityClasses$59 = (ownerState) => {
	const { classes, variant, color, disableShrink } = ownerState;
	return composeClasses({
		root: [
			"root",
			variant,
			`color${capitalize_default(color)}`
		],
		svg: ["svg"],
		track: ["track"],
		circle: [
			"circle",
			`circle${capitalize_default(variant)}`,
			disableShrink && "circleDisableShrink"
		]
	}, getCircularProgressUtilityClass, classes);
};
var CircularProgressRoot = styled$2("span", {
	name: "MuiCircularProgress",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	display: "inline-block",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: theme.transitions.create("transform") }
		},
		{
			props: { variant: "indeterminate" },
			style: rotateAnimation || { animation: `${circularRotateKeyframe} 1.4s linear infinite` }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars || theme).palette[color].main }
		}))
	]
})));
var CircularProgressSVG = styled$2("svg", {
	name: "MuiCircularProgress",
	slot: "Svg"
})({ display: "block" });
var CircularProgressCircle = styled$2("circle", {
	name: "MuiCircularProgress",
	slot: "Circle",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.circle,
			styles[`circle${capitalize_default(ownerState.variant)}`],
			ownerState.disableShrink && styles.circleDisableShrink
		];
	}
})(memoTheme(({ theme }) => ({
	stroke: "currentColor",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: theme.transitions.create("stroke-dashoffset") }
		},
		{
			props: { variant: "indeterminate" },
			style: {
				strokeDasharray: "80px, 200px",
				strokeDashoffset: 0
			}
		},
		{
			props: ({ ownerState }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
			style: dashAnimation || { animation: `${circularDashKeyframe} 1.4s ease-in-out infinite` }
		}
	]
})));
var CircularProgressTrack = styled$2("circle", {
	name: "MuiCircularProgress",
	slot: "Track"
})(memoTheme(({ theme }) => ({
	stroke: "currentColor",
	opacity: (theme.vars || theme).palette.action.activatedOpacity
})));
/**
* ## ARIA
*
* If the progress bar is describing the loading progress of a particular region of a page,
* you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
* attribute to `true` on that region until it has finished loading.
*/
var CircularProgress = /* @__PURE__ */ import_react.forwardRef(function CircularProgress(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCircularProgress"
	});
	const { className, color = "primary", disableShrink = false, enableTrackSlot = false, size = 40, style, thickness = 3.6, value = 0, variant = "indeterminate", ...other } = props;
	const ownerState = {
		...props,
		color,
		disableShrink,
		size,
		thickness,
		value,
		variant,
		enableTrackSlot
	};
	const classes = useUtilityClasses$59(ownerState);
	const circleStyle = {};
	const rootStyle = {};
	const rootProps = {};
	if (variant === "determinate") {
		const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
		circleStyle.strokeDasharray = circumference.toFixed(3);
		rootProps["aria-valuenow"] = Math.round(value);
		circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
		rootStyle.transform = "rotate(-90deg)";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressRoot, {
		className: clsx(classes.root, className),
		style: {
			width: size,
			height: size,
			...rootStyle,
			...style
		},
		ownerState,
		ref,
		role: "progressbar",
		...rootProps,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CircularProgressSVG, {
			className: classes.svg,
			ownerState,
			viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
			children: [enableTrackSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressTrack, {
				className: classes.track,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness,
				"aria-hidden": "true"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressCircle, {
				className: classes.circle,
				style: circleStyle,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness
			})]
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/IconButton/iconButtonClasses.js
function getIconButtonUtilityClass(slot) {
	return generateUtilityClass("MuiIconButton", slot);
}
var iconButtonClasses = generateUtilityClasses("MuiIconButton", [
	"root",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorError",
	"colorInfo",
	"colorSuccess",
	"colorWarning",
	"edgeStart",
	"edgeEnd",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"loading",
	"loadingIndicator",
	"loadingWrapper"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/IconButton/IconButton.js
var useUtilityClasses$58 = (ownerState) => {
	const { classes, disabled, color, edge, size, loading } = ownerState;
	return composeClasses({
		root: [
			"root",
			loading && "loading",
			disabled && "disabled",
			color !== "default" && `color${capitalize_default(color)}`,
			edge && `edge${capitalize_default(edge)}`,
			`size${capitalize_default(size)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, getIconButtonUtilityClass, classes);
};
var IconButtonRoot = styled$2(ButtonBase, {
	name: "MuiIconButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.loading && styles.loading,
			ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`],
			ownerState.edge && styles[`edge${capitalize_default(ownerState.edge)}`],
			styles[`size${capitalize_default(ownerState.size)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	textAlign: "center",
	flex: "0 0 auto",
	fontSize: theme.typography.pxToRem(24),
	padding: 8,
	borderRadius: "50%",
	color: (theme.vars || theme).palette.action.active,
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shortest }),
	variants: [
		{
			props: (props) => !props.disableRipple,
			style: {
				"--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
				"&:hover": {
					backgroundColor: "var(--IconButton-hoverBg)",
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		},
		{
			props: { edge: "start" },
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: { edge: "end" },
			style: { marginRight: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		}
	]
})), memoTheme(({ theme }) => ({
	variants: [
		{
			props: { color: "inherit" },
			style: { color: "inherit" }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars || theme).palette[color].main }
		})),
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { "--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity) }
		})),
		{
			props: { size: "small" },
			style: {
				padding: 5,
				fontSize: theme.typography.pxToRem(18)
			}
		},
		{
			props: { size: "large" },
			style: {
				padding: 12,
				fontSize: theme.typography.pxToRem(28)
			}
		}
	],
	[`&.${iconButtonClasses.disabled}`]: {
		backgroundColor: "transparent",
		color: (theme.vars || theme).palette.action.disabled
	},
	[`&.${iconButtonClasses.loading}`]: { color: "transparent" }
})));
var IconButtonLoadingIndicator = styled$2("span", {
	name: "MuiIconButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	color: (theme.vars || theme).palette.action.disabled,
	variants: [{
		props: { loading: true },
		style: { display: "flex" }
	}]
}));
/**
* Refer to the [Icons](/material-ui/icons/) section of the documentation
* regarding the available icon options.
*/
var IconButton = /* @__PURE__ */ import_react.forwardRef(function IconButton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiIconButton"
	});
	const { edge = false, children, className, color = "default", disabled = false, disableFocusRipple = false, size = "medium", id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, ...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		edge,
		color,
		disabled,
		disableFocusRipple,
		loading,
		loadingIndicator,
		size
	};
	const classes = useUtilityClasses$58(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconButtonRoot, {
		id: loading ? loadingId : idProp,
		className: clsx(classes.root, className),
		centerRipple: true,
		focusRipple: !disableFocusRipple,
		disabled: disabled || loading,
		ref,
		...other,
		ownerState,
		children: [typeof loading === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: classes.loadingWrapper,
			style: { display: "contents" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButtonLoadingIndicator, {
				className: classes.loadingIndicator,
				ownerState,
				children: loading && loadingIndicator
			})
		}), children]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/SuccessOutlined.js
/**
* @ignore - internal component.
*/
var SuccessOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" }), "SuccessOutlined");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/ReportProblemOutlined.js
/**
* @ignore - internal component.
*/
var ReportProblemOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" }), "ReportProblemOutlined");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/ErrorOutline.js
/**
* @ignore - internal component.
*/
var ErrorOutline_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), "ErrorOutline");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/InfoOutlined.js
/**
* @ignore - internal component.
*/
var InfoOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z" }), "InfoOutlined");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/Close.js
/**
* @ignore - internal component.
*
* Alias to `Clear`.
*/
var Close_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }), "Close");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Alert/Alert.js
var useUtilityClasses$57 = (ownerState) => {
	const { variant, color, severity, classes } = ownerState;
	return composeClasses({
		root: [
			"root",
			`color${capitalize_default(color || severity)}`,
			`${variant}${capitalize_default(color || severity)}`,
			`${variant}`
		],
		icon: ["icon"],
		message: ["message"],
		action: ["action"]
	}, getAlertUtilityClass, classes);
};
var AlertRoot = styled$2(Paper, {
	name: "MuiAlert",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`${ownerState.variant}${capitalize_default(ownerState.color || ownerState.severity)}`]
		];
	}
})(memoTheme(({ theme }) => {
	const getColor = theme.palette.mode === "light" ? theme.darken : theme.lighten;
	const getBackgroundColor = theme.palette.mode === "light" ? theme.lighten : theme.darken;
	return {
		...theme.typography.body2,
		backgroundColor: "transparent",
		display: "flex",
		padding: "6px 16px",
		variants: [
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color]) => ({
				props: {
					colorSeverity: color,
					variant: "standard"
				},
				style: {
					color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, .6),
					backgroundColor: theme.vars ? theme.vars.palette.Alert[`${color}StandardBg`] : getBackgroundColor(theme.palette[color].light, .9),
					[`& .${alertClasses.icon}`]: theme.vars ? { color: theme.vars.palette.Alert[`${color}IconColor`] } : { color: theme.palette[color].main }
				}
			})),
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color]) => ({
				props: {
					colorSeverity: color,
					variant: "outlined"
				},
				style: {
					color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, .6),
					border: `1px solid ${(theme.vars || theme).palette[color].light}`,
					[`& .${alertClasses.icon}`]: theme.vars ? { color: theme.vars.palette.Alert[`${color}IconColor`] } : { color: theme.palette[color].main }
				}
			})),
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => ({
				props: {
					colorSeverity: color,
					variant: "filled"
				},
				style: {
					fontWeight: theme.typography.fontWeightMedium,
					...theme.vars ? {
						color: theme.vars.palette.Alert[`${color}FilledColor`],
						backgroundColor: theme.vars.palette.Alert[`${color}FilledBg`]
					} : {
						backgroundColor: theme.palette.mode === "dark" ? theme.palette[color].dark : theme.palette[color].main,
						color: theme.palette.getContrastText(theme.palette[color].main)
					}
				}
			}))
		]
	};
}));
var AlertIcon = styled$2("div", {
	name: "MuiAlert",
	slot: "Icon"
})({
	marginRight: 12,
	padding: "7px 0",
	display: "flex",
	fontSize: 22,
	opacity: .9
});
var AlertMessage = styled$2("div", {
	name: "MuiAlert",
	slot: "Message"
})({
	padding: "8px 0",
	minWidth: 0,
	overflow: "auto"
});
var AlertAction = styled$2("div", {
	name: "MuiAlert",
	slot: "Action"
})({
	display: "flex",
	alignItems: "flex-start",
	padding: "4px 0 0 16px",
	marginLeft: "auto",
	marginRight: -8
});
var defaultIconMapping = {
	success: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessOutlined_default, { fontSize: "inherit" }),
	warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportProblemOutlined_default, { fontSize: "inherit" }),
	error: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorOutline_default, { fontSize: "inherit" }),
	info: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoOutlined_default, { fontSize: "inherit" })
};
var Alert = /* @__PURE__ */ import_react.forwardRef(function Alert(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiAlert"
	});
	const { action, children, className, closeText = "Close", color, components = {}, componentsProps = {}, icon, iconMapping = defaultIconMapping, onClose, role = "alert", severity = "success", slotProps = {}, slots = {}, variant = "standard", ...other } = props;
	const ownerState = {
		...props,
		color,
		severity,
		variant,
		colorSeverity: color || severity
	};
	const classes = useUtilityClasses$57(ownerState);
	const externalForwardedProps = {
		slots: {
			closeButton: components.CloseButton,
			closeIcon: components.CloseIcon,
			...slots
		},
		slotProps: {
			...componentsProps,
			...slotProps
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		shouldForwardComponentProp: true,
		className: clsx(classes.root, className),
		elementType: AlertRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		additionalProps: {
			role,
			elevation: 0
		}
	});
	const [IconSlot, iconSlotProps] = useSlot("icon", {
		className: classes.icon,
		elementType: AlertIcon,
		externalForwardedProps,
		ownerState
	});
	const [MessageSlot, messageSlotProps] = useSlot("message", {
		className: classes.message,
		elementType: AlertMessage,
		externalForwardedProps,
		ownerState
	});
	const [ActionSlot, actionSlotProps] = useSlot("action", {
		className: classes.action,
		elementType: AlertAction,
		externalForwardedProps,
		ownerState
	});
	const [CloseButtonSlot, closeButtonProps] = useSlot("closeButton", {
		elementType: IconButton,
		externalForwardedProps,
		ownerState
	});
	const [CloseIconSlot, closeIconProps] = useSlot("closeIcon", {
		elementType: Close_default,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [
			icon !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSlot, {
				...iconSlotProps,
				children: icon || iconMapping[severity] || defaultIconMapping[severity]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSlot, {
				...messageSlotProps,
				children
			}),
			action != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionSlot, {
				...actionSlotProps,
				children: action
			}) : null,
			action == null && onClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionSlot, {
				...actionSlotProps,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButtonSlot, {
					size: "small",
					"aria-label": closeText,
					title: closeText,
					color: "inherit",
					onClick: onClose,
					...closeButtonProps,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIconSlot, {
						fontSize: "small",
						...closeIconProps
					})
				})
			}) : null
		]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Typography/typographyClasses.js
function getTypographyUtilityClass(slot) {
	return generateUtilityClass("MuiTypography", slot);
}
var typographyClasses = generateUtilityClasses("MuiTypography", [
	"root",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"subtitle1",
	"subtitle2",
	"body1",
	"body2",
	"inherit",
	"button",
	"caption",
	"overline",
	"alignLeft",
	"alignRight",
	"alignCenter",
	"alignJustify",
	"noWrap",
	"gutterBottom",
	"paragraph"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Typography/Typography.js
var v6Colors$1 = {
	primary: true,
	secondary: true,
	error: true,
	info: true,
	success: true,
	warning: true,
	textPrimary: true,
	textSecondary: true,
	textDisabled: true
};
var extendSxProp = internal_createExtendSxProp();
var useUtilityClasses$56 = (ownerState) => {
	const { align, gutterBottom, noWrap, paragraph, variant, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		ownerState.align !== "inherit" && `align${capitalize_default(align)}`,
		gutterBottom && "gutterBottom",
		noWrap && "noWrap",
		paragraph && "paragraph"
	] }, getTypographyUtilityClass, classes);
};
var TypographyRoot = styled$2("span", {
	name: "MuiTypography",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.variant && styles[ownerState.variant],
			ownerState.align !== "inherit" && styles[`align${capitalize_default(ownerState.align)}`],
			ownerState.noWrap && styles.noWrap,
			ownerState.gutterBottom && styles.gutterBottom,
			ownerState.paragraph && styles.paragraph
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 0,
	variants: [
		{
			props: { variant: "inherit" },
			style: {
				font: "inherit",
				lineHeight: "inherit",
				letterSpacing: "inherit"
			}
		},
		...Object.entries(theme.typography).filter(([variant, value]) => variant !== "inherit" && value && typeof value === "object").map(([variant, value]) => ({
			props: { variant },
			style: value
		})),
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars || theme).palette[color].main }
		})),
		...Object.entries(theme.palette?.text || {}).filter(([, value]) => typeof value === "string").map(([color]) => ({
			props: { color: `text${capitalize_default(color)}` },
			style: { color: (theme.vars || theme).palette.text[color] }
		})),
		{
			props: ({ ownerState }) => ownerState.align !== "inherit",
			style: { textAlign: "var(--Typography-textAlign)" }
		},
		{
			props: ({ ownerState }) => ownerState.noWrap,
			style: {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			}
		},
		{
			props: ({ ownerState }) => ownerState.gutterBottom,
			style: { marginBottom: "0.35em" }
		},
		{
			props: ({ ownerState }) => ownerState.paragraph,
			style: { marginBottom: 16 }
		}
	]
})));
var defaultVariantMapping = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	subtitle1: "h6",
	subtitle2: "h6",
	body1: "p",
	body2: "p",
	inherit: "p"
};
var Typography = /* @__PURE__ */ import_react.forwardRef(function Typography(inProps, ref) {
	const { color, ...themeProps } = useDefaultProps({
		props: inProps,
		name: "MuiTypography"
	});
	const isSxColor = !v6Colors$1[color];
	const props = extendSxProp({
		...themeProps,
		...isSxColor && { color }
	});
	const { align = "inherit", className, component, gutterBottom = false, noWrap = false, paragraph = false, variant = "body1", variantMapping = defaultVariantMapping, ...other } = props;
	const ownerState = {
		...props,
		align,
		color,
		className,
		component,
		gutterBottom,
		noWrap,
		paragraph,
		variant,
		variantMapping
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypographyRoot, {
		as: component || (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) || "span",
		ref,
		className: clsx(useUtilityClasses$56(ownerState).root, className),
		...other,
		ownerState,
		style: {
			...align !== "inherit" && { "--Typography-textAlign": align },
			...other.style
		}
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/AppBar/appBarClasses.js
function getAppBarUtilityClass(slot) {
	return generateUtilityClass("MuiAppBar", slot);
}
generateUtilityClasses("MuiAppBar", [
	"root",
	"positionFixed",
	"positionAbsolute",
	"positionSticky",
	"positionStatic",
	"positionRelative",
	"colorDefault",
	"colorPrimary",
	"colorSecondary",
	"colorInherit",
	"colorTransparent",
	"colorError",
	"colorInfo",
	"colorSuccess",
	"colorWarning"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/AppBar/AppBar.js
var useUtilityClasses$55 = (ownerState) => {
	const { color, position, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		`color${capitalize_default(color)}`,
		`position${capitalize_default(position)}`
	] }, getAppBarUtilityClass, classes);
};
var joinVars = (var1, var2) => var1 ? `${var1.replace(")", "")}, ${var2})` : var2;
var AppBarRoot = styled$2(Paper, {
	name: "MuiAppBar",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[`position${capitalize_default(ownerState.position)}`],
			styles[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	boxSizing: "border-box",
	flexShrink: 0,
	variants: [
		{
			props: { position: "fixed" },
			style: {
				position: "fixed",
				zIndex: (theme.vars || theme).zIndex.appBar,
				top: 0,
				left: "auto",
				right: 0,
				"@media print": { position: "absolute" }
			}
		},
		{
			props: { position: "absolute" },
			style: {
				position: "absolute",
				zIndex: (theme.vars || theme).zIndex.appBar,
				top: 0,
				left: "auto",
				right: 0
			}
		},
		{
			props: { position: "sticky" },
			style: {
				position: "sticky",
				zIndex: (theme.vars || theme).zIndex.appBar,
				top: 0,
				left: "auto",
				right: 0
			}
		},
		{
			props: { position: "static" },
			style: { position: "static" }
		},
		{
			props: { position: "relative" },
			style: { position: "relative" }
		},
		{
			props: { color: "inherit" },
			style: {
				"--AppBar-color": "inherit",
				color: "var(--AppBar-color)"
			}
		},
		{
			props: { color: "default" },
			style: {
				"--AppBar-background": theme.vars ? theme.vars.palette.AppBar.defaultBg : theme.palette.grey[100],
				"--AppBar-color": theme.vars ? theme.vars.palette.text.primary : theme.palette.getContrastText(theme.palette.grey[100]),
				...theme.applyStyles("dark", {
					"--AppBar-background": theme.vars ? theme.vars.palette.AppBar.defaultBg : theme.palette.grey[900],
					"--AppBar-color": theme.vars ? theme.vars.palette.text.primary : theme.palette.getContrastText(theme.palette.grey[900])
				})
			}
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["contrastText"])).map(([color]) => ({
			props: { color },
			style: {
				"--AppBar-background": (theme.vars ?? theme).palette[color].main,
				"--AppBar-color": (theme.vars ?? theme).palette[color].contrastText
			}
		})),
		{
			props: (props) => props.enableColorOnDark === true && !["inherit", "transparent"].includes(props.color),
			style: {
				backgroundColor: "var(--AppBar-background)",
				color: "var(--AppBar-color)"
			}
		},
		{
			props: (props) => props.enableColorOnDark === false && !["inherit", "transparent"].includes(props.color),
			style: {
				backgroundColor: "var(--AppBar-background)",
				color: "var(--AppBar-color)",
				...theme.applyStyles("dark", {
					backgroundColor: theme.vars ? joinVars(theme.vars.palette.AppBar.darkBg, "var(--AppBar-background)") : null,
					color: theme.vars ? joinVars(theme.vars.palette.AppBar.darkColor, "var(--AppBar-color)") : null
				})
			}
		},
		{
			props: { color: "transparent" },
			style: {
				"--AppBar-background": "transparent",
				"--AppBar-color": "inherit",
				backgroundColor: "var(--AppBar-background)",
				color: "var(--AppBar-color)",
				...theme.applyStyles("dark", { backgroundImage: "none" })
			}
		}
	]
})));
var AppBar = /* @__PURE__ */ import_react.forwardRef(function AppBar(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiAppBar"
	});
	const { className, color = "primary", enableColorOnDark = false, position = "fixed", ...other } = props;
	const ownerState = {
		...props,
		color,
		position,
		enableColorOnDark
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppBarRoot, {
		square: true,
		component: "header",
		ownerState,
		elevation: 4,
		className: clsx(useUtilityClasses$55(ownerState).root, className, position === "fixed" && "mui-fixed"),
		ref,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/usePreviousProps/usePreviousProps.js
function usePreviousProps(value) {
	const ref = import_react.useRef({});
	import_react.useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [
	"top",
	bottom,
	right,
	left
];
var start = "start";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
	return acc.concat([placement + "-" + start, placement + "-end"]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
	return acc.concat([
		placement,
		placement + "-" + start,
		placement + "-end"
	]);
}, []);
var modifierPhases = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
	return element ? (element.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
	if (node == null) return window;
	if (node.toString() !== "[object Window]") {
		var ownerDocument = node.ownerDocument;
		return ownerDocument ? ownerDocument.defaultView || window : window;
	}
	return node;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
	return node instanceof getWindow(node).Element || node instanceof Element;
}
function isHTMLElement$1(node) {
	return node instanceof getWindow(node).HTMLElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
	if (typeof ShadowRoot === "undefined") return false;
	return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
	var state = _ref.state;
	Object.keys(state.elements).forEach(function(name) {
		var style = state.styles[name] || {};
		var attributes = state.attributes[name] || {};
		var element = state.elements[name];
		if (!isHTMLElement$1(element) || !getNodeName(element)) return;
		Object.assign(element.style, style);
		Object.keys(attributes).forEach(function(name) {
			var value = attributes[name];
			if (value === false) element.removeAttribute(name);
			else element.setAttribute(name, value === true ? "" : value);
		});
	});
}
function effect$2(_ref2) {
	var state = _ref2.state;
	var initialStyles = {
		popper: {
			position: state.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	Object.assign(state.elements.popper.style, initialStyles.popper);
	state.styles = initialStyles;
	if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
	return function() {
		Object.keys(state.elements).forEach(function(name) {
			var element = state.elements[name];
			var attributes = state.attributes[name] || {};
			var style = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]).reduce(function(style, property) {
				style[property] = "";
				return style;
			}, {});
			if (!isHTMLElement$1(element) || !getNodeName(element)) return;
			Object.assign(element.style, style);
			Object.keys(attributes).forEach(function(attribute) {
				element.removeAttribute(attribute);
			});
		});
	};
}
var applyStyles_default = {
	name: "applyStyles",
	enabled: true,
	phase: "write",
	fn: applyStyles,
	effect: effect$2,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
	return placement.split("-")[0];
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round$1 = Math.round;
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
	var uaData = navigator.userAgentData;
	if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) return uaData.brands.map(function(item) {
		return item.brand + "/" + item.version;
	}).join(" ");
	return navigator.userAgent;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
	return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	var clientRect = element.getBoundingClientRect();
	var scaleX = 1;
	var scaleY = 1;
	if (includeScale && isHTMLElement$1(element)) {
		scaleX = element.offsetWidth > 0 ? round$1(clientRect.width) / element.offsetWidth || 1 : 1;
		scaleY = element.offsetHeight > 0 ? round$1(clientRect.height) / element.offsetHeight || 1 : 1;
	}
	var visualViewport = (isElement(element) ? getWindow(element) : window).visualViewport;
	var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	var width = clientRect.width / scaleX;
	var height = clientRect.height / scaleY;
	return {
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x,
		x,
		y
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
	var clientRect = getBoundingClientRect(element);
	var width = element.offsetWidth;
	var height = element.offsetHeight;
	if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
	if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
	return {
		x: element.offsetLeft,
		y: element.offsetTop,
		width,
		height
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
	var rootNode = child.getRootNode && child.getRootNode();
	if (parent.contains(child)) return true;
	else if (rootNode && isShadowRoot(rootNode)) {
		var next = child;
		do {
			if (next && parent.isSameNode(next)) return true;
			next = next.parentNode || next.host;
		} while (next);
	}
	return false;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
	return getWindow(element).getComputedStyle(element);
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
	return [
		"table",
		"td",
		"th"
	].indexOf(getNodeName(element)) >= 0;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
	return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
	if (getNodeName(element) === "html") return element;
	return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
	if (!isHTMLElement$1(element) || getComputedStyle(element).position === "fixed") return null;
	return element.offsetParent;
}
function getContainingBlock(element) {
	var isFirefox = /firefox/i.test(getUAString());
	if (/Trident/i.test(getUAString()) && isHTMLElement$1(element)) {
		if (getComputedStyle(element).position === "fixed") return null;
	}
	var currentNode = getParentNode(element);
	if (isShadowRoot(currentNode)) currentNode = currentNode.host;
	while (isHTMLElement$1(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
		var css = getComputedStyle(currentNode);
		if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") return currentNode;
		else currentNode = currentNode.parentNode;
	}
	return null;
}
function getOffsetParent(element) {
	var window = getWindow(element);
	var offsetParent = getTrueOffsetParent(element);
	while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") offsetParent = getTrueOffsetParent(offsetParent);
	if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) return window;
	return offsetParent || getContainingBlock(element) || window;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
	return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/within.js
function within(min$2, value, max$2) {
	return max(min$2, min(value, max$2));
}
function withinMaxClamp(min, value, max) {
	var v = within(min, value, max);
	return v > max ? max : v;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
	return Object.assign({}, getFreshSideObject(), paddingObject);
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
	return keys.reduce(function(hashMap, key) {
		hashMap[key] = value;
		return hashMap;
	}, {});
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject(padding, state) {
	padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, { placement: state.placement })) : padding;
	return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
	var _state$modifiersData$;
	var state = _ref.state, name = _ref.name, options = _ref.options;
	var arrowElement = state.elements.arrow;
	var popperOffsets = state.modifiersData.popperOffsets;
	var basePlacement = getBasePlacement(state.placement);
	var axis = getMainAxisFromPlacement(basePlacement);
	var len = ["left", "right"].indexOf(basePlacement) >= 0 ? "height" : "width";
	if (!arrowElement || !popperOffsets) return;
	var paddingObject = toPaddingObject(options.padding, state);
	var arrowRect = getLayoutRect(arrowElement);
	var minProp = axis === "y" ? "top" : left;
	var maxProp = axis === "y" ? bottom : right;
	var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	var arrowOffsetParent = getOffsetParent(arrowElement);
	var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	var centerToReference = endDiff / 2 - startDiff / 2;
	var min = paddingObject[minProp];
	var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	var offset = within(min, center, max);
	var axisProp = axis;
	state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect$1(_ref2) {
	var state = _ref2.state;
	var _options$element = _ref2.options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
	if (arrowElement == null) return;
	if (typeof arrowElement === "string") {
		arrowElement = state.elements.popper.querySelector(arrowElement);
		if (!arrowElement) return;
	}
	if (!contains(state.elements.popper, arrowElement)) return;
	state.elements.arrow = arrowElement;
}
var arrow_default = {
	name: "arrow",
	enabled: true,
	phase: "main",
	fn: arrow,
	effect: effect$1,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
	return placement.split("-")[1];
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
	var x = _ref.x, y = _ref.y;
	var dpr = win.devicePixelRatio || 1;
	return {
		x: round$1(x * dpr) / dpr || 0,
		y: round$1(y * dpr) / dpr || 0
	};
}
function mapToStyles(_ref2) {
	var _Object$assign2;
	var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
	var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
	var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
		x,
		y
	}) : {
		x,
		y
	};
	x = _ref3.x;
	y = _ref3.y;
	var hasX = offsets.hasOwnProperty("x");
	var hasY = offsets.hasOwnProperty("y");
	var sideX = left;
	var sideY = "top";
	var win = window;
	if (adaptive) {
		var offsetParent = getOffsetParent(popper);
		var heightProp = "clientHeight";
		var widthProp = "clientWidth";
		if (offsetParent === getWindow(popper)) {
			offsetParent = getDocumentElement(popper);
			if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
				heightProp = "scrollHeight";
				widthProp = "scrollWidth";
			}
		}
		offsetParent = offsetParent;
		if (placement === "top" || (placement === "left" || placement === "right") && variation === "end") {
			sideY = bottom;
			var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
			y -= offsetY - popperRect.height;
			y *= gpuAcceleration ? 1 : -1;
		}
		if (placement === "left" || (placement === "top" || placement === "bottom") && variation === "end") {
			sideX = right;
			var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
			x -= offsetX - popperRect.width;
			x *= gpuAcceleration ? 1 : -1;
		}
	}
	var commonStyles = Object.assign({ position }, adaptive && unsetSides);
	var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
		x,
		y
	}, getWindow(popper)) : {
		x,
		y
	};
	x = _ref4.x;
	y = _ref4.y;
	if (gpuAcceleration) {
		var _Object$assign;
		return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	}
	return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
	var state = _ref5.state, options = _ref5.options;
	var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	var commonStyles = {
		placement: getBasePlacement(state.placement),
		variation: getVariation(state.placement),
		popper: state.elements.popper,
		popperRect: state.rects.popper,
		gpuAcceleration,
		isFixed: state.options.strategy === "fixed"
	};
	if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.popperOffsets,
		position: state.options.strategy,
		adaptive,
		roundOffsets
	})));
	if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.arrow,
		position: "absolute",
		adaptive: false,
		roundOffsets
	})));
	state.attributes.popper = Object.assign({}, state.attributes.popper, { "data-popper-placement": state.placement });
}
var computeStyles_default = {
	name: "computeStyles",
	enabled: true,
	phase: "beforeWrite",
	fn: computeStyles,
	data: {}
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = { passive: true };
function effect(_ref) {
	var state = _ref.state, instance = _ref.instance, options = _ref.options;
	var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
	var window = getWindow(state.elements.popper);
	var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	if (scroll) scrollParents.forEach(function(scrollParent) {
		scrollParent.addEventListener("scroll", instance.update, passive);
	});
	if (resize) window.addEventListener("resize", instance.update, passive);
	return function() {
		if (scroll) scrollParents.forEach(function(scrollParent) {
			scrollParent.removeEventListener("scroll", instance.update, passive);
		});
		if (resize) window.removeEventListener("resize", instance.update, passive);
	};
}
var eventListeners_default = {
	name: "eventListeners",
	enabled: true,
	phase: "write",
	fn: function fn() {},
	effect,
	data: {}
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash$1 = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function getOppositePlacement(placement) {
	return placement.replace(/left|right|bottom|top/g, function(matched) {
		return hash$1[matched];
	});
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash = {
	start: "end",
	end: "start"
};
function getOppositeVariationPlacement(placement) {
	return placement.replace(/start|end/g, function(matched) {
		return hash[matched];
	});
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
	var win = getWindow(node);
	return {
		scrollLeft: win.pageXOffset,
		scrollTop: win.pageYOffset
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
	return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
	var win = getWindow(element);
	var html = getDocumentElement(element);
	var visualViewport = win.visualViewport;
	var width = html.clientWidth;
	var height = html.clientHeight;
	var x = 0;
	var y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		var layoutViewport = isLayoutViewport();
		if (layoutViewport || !layoutViewport && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	return {
		width,
		height,
		x: x + getWindowScrollBarX(element),
		y
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
	var _element$ownerDocumen;
	var html = getDocumentElement(element);
	var winScroll = getWindowScroll(element);
	var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	var y = -winScroll.scrollTop;
	if (getComputedStyle(body || html).direction === "rtl") x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	return {
		width,
		height,
		x,
		y
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
	var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
	return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
	if ([
		"html",
		"body",
		"#document"
	].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
	if (isHTMLElement$1(node) && isScrollParent(node)) return node;
	return getScrollParent(getParentNode(node));
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
	var _element$ownerDocumen;
	if (list === void 0) list = [];
	var scrollParent = getScrollParent(element);
	var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	var win = getWindow(scrollParent);
	var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	var updatedList = list.concat(target);
	return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
	return Object.assign({}, rect, {
		left: rect.x,
		top: rect.y,
		right: rect.x + rect.width,
		bottom: rect.y + rect.height
	});
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
	var rect = getBoundingClientRect(element, false, strategy === "fixed");
	rect.top = rect.top + element.clientTop;
	rect.left = rect.left + element.clientLeft;
	rect.bottom = rect.top + element.clientHeight;
	rect.right = rect.left + element.clientWidth;
	rect.width = element.clientWidth;
	rect.height = element.clientHeight;
	rect.x = rect.left;
	rect.y = rect.top;
	return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
	return clippingParent === "viewport" ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
	var clippingParents = listScrollParents(getParentNode(element));
	var clipperElement = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0 && isHTMLElement$1(element) ? getOffsetParent(element) : element;
	if (!isElement(clipperElement)) return [];
	return clippingParents.filter(function(clippingParent) {
		return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
	});
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
	var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
	var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	var firstClippingParent = clippingParents[0];
	var clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
		var rect = getClientRectFromMixedType(element, clippingParent, strategy);
		accRect.top = max(rect.top, accRect.top);
		accRect.right = min(rect.right, accRect.right);
		accRect.bottom = min(rect.bottom, accRect.bottom);
		accRect.left = max(rect.left, accRect.left);
		return accRect;
	}, getClientRectFromMixedType(element, firstClippingParent, strategy));
	clippingRect.width = clippingRect.right - clippingRect.left;
	clippingRect.height = clippingRect.bottom - clippingRect.top;
	clippingRect.x = clippingRect.left;
	clippingRect.y = clippingRect.top;
	return clippingRect;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
	var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
	var basePlacement = placement ? getBasePlacement(placement) : null;
	var variation = placement ? getVariation(placement) : null;
	var commonX = reference.x + reference.width / 2 - element.width / 2;
	var commonY = reference.y + reference.height / 2 - element.height / 2;
	var offsets;
	switch (basePlacement) {
		case "top":
			offsets = {
				x: commonX,
				y: reference.y - element.height
			};
			break;
		case bottom:
			offsets = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case right:
			offsets = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case left:
			offsets = {
				x: reference.x - element.width,
				y: commonY
			};
			break;
		default: offsets = {
			x: reference.x,
			y: reference.y
		};
	}
	var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	if (mainAxis != null) {
		var len = mainAxis === "y" ? "height" : "width";
		switch (variation) {
			case start:
				offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
				break;
			case "end":
				offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
				break;
			default:
		}
	}
	return offsets;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
	if (options === void 0) options = {};
	var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
	var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
	var altContext = elementContext === "popper" ? reference : popper;
	var popperRect = state.rects.popper;
	var element = state.elements[altBoundary ? altContext : elementContext];
	var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	var referenceClientRect = getBoundingClientRect(state.elements.reference);
	var popperOffsets = computeOffsets({
		reference: referenceClientRect,
		element: popperRect,
		strategy: "absolute",
		placement
	});
	var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	var elementClientRect = elementContext === "popper" ? popperClientRect : referenceClientRect;
	var overflowOffsets = {
		top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
		bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
		left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
		right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	};
	var offsetData = state.modifiersData.offset;
	if (elementContext === "popper" && offsetData) {
		var offset = offsetData[placement];
		Object.keys(overflowOffsets).forEach(function(key) {
			var multiply = ["right", "bottom"].indexOf(key) >= 0 ? 1 : -1;
			var axis = ["top", "bottom"].indexOf(key) >= 0 ? "y" : "x";
			overflowOffsets[key] += offset[axis] * multiply;
		});
	}
	return overflowOffsets;
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
	if (options === void 0) options = {};
	var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	var variation = getVariation(placement);
	var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement) {
		return getVariation(placement) === variation;
	}) : basePlacements;
	var allowedPlacements = placements$1.filter(function(placement) {
		return allowedAutoPlacements.indexOf(placement) >= 0;
	});
	if (allowedPlacements.length === 0) allowedPlacements = placements$1;
	var overflows = allowedPlacements.reduce(function(acc, placement) {
		acc[placement] = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			padding
		})[getBasePlacement(placement)];
		return acc;
	}, {});
	return Object.keys(overflows).sort(function(a, b) {
		return overflows[a] - overflows[b];
	});
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
	if (getBasePlacement(placement) === "auto") return [];
	var oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeVariationPlacement(placement),
		oppositePlacement,
		getOppositeVariationPlacement(oppositePlacement)
	];
}
function flip(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	if (state.modifiersData[name]._skip) return;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
	var preferredPlacement = state.options.placement;
	var isBasePlacement = getBasePlacement(preferredPlacement) === preferredPlacement;
	var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement) {
		return acc.concat(getBasePlacement(placement) === "auto" ? computeAutoPlacement(state, {
			placement,
			boundary,
			rootBoundary,
			padding,
			flipVariations,
			allowedAutoPlacements
		}) : placement);
	}, []);
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var checksMap = /* @__PURE__ */ new Map();
	var makeFallbackChecks = true;
	var firstFittingPlacement = placements[0];
	for (var i = 0; i < placements.length; i++) {
		var placement = placements[i];
		var _basePlacement = getBasePlacement(placement);
		var isStartVariation = getVariation(placement) === start;
		var isVertical = ["top", bottom].indexOf(_basePlacement) >= 0;
		var len = isVertical ? "width" : "height";
		var overflow = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			altBoundary,
			padding
		});
		var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : "top";
		if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
		var altVariationSide = getOppositePlacement(mainVariationSide);
		var checks = [];
		if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
		if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
		if (checks.every(function(check) {
			return check;
		})) {
			firstFittingPlacement = placement;
			makeFallbackChecks = false;
			break;
		}
		checksMap.set(placement, checks);
	}
	if (makeFallbackChecks) {
		var numberOfChecks = flipVariations ? 3 : 1;
		var _loop = function _loop(_i) {
			var fittingPlacement = placements.find(function(placement) {
				var checks = checksMap.get(placement);
				if (checks) return checks.slice(0, _i).every(function(check) {
					return check;
				});
			});
			if (fittingPlacement) {
				firstFittingPlacement = fittingPlacement;
				return "break";
			}
		};
		for (var _i = numberOfChecks; _i > 0; _i--) if (_loop(_i) === "break") break;
	}
	if (state.placement !== firstFittingPlacement) {
		state.modifiersData[name]._skip = true;
		state.placement = firstFittingPlacement;
		state.reset = true;
	}
}
var flip_default = {
	name: "flip",
	enabled: true,
	phase: "main",
	fn: flip,
	requiresIfExists: ["offset"],
	data: { _skip: false }
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
	if (preventedOffsets === void 0) preventedOffsets = {
		x: 0,
		y: 0
	};
	return {
		top: overflow.top - rect.height - preventedOffsets.y,
		right: overflow.right - rect.width + preventedOffsets.x,
		bottom: overflow.bottom - rect.height + preventedOffsets.y,
		left: overflow.left - rect.width - preventedOffsets.x
	};
}
function isAnySideFullyClipped(overflow) {
	return [
		"top",
		right,
		bottom,
		left
	].some(function(side) {
		return overflow[side] >= 0;
	});
}
function hide(_ref) {
	var state = _ref.state, name = _ref.name;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var preventedOffsets = state.modifiersData.preventOverflow;
	var referenceOverflow = detectOverflow(state, { elementContext: "reference" });
	var popperAltOverflow = detectOverflow(state, { altBoundary: true });
	var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	state.modifiersData[name] = {
		referenceClippingOffsets,
		popperEscapeOffsets,
		isReferenceHidden,
		hasPopperEscaped
	};
	state.attributes.popper = Object.assign({}, state.attributes.popper, {
		"data-popper-reference-hidden": isReferenceHidden,
		"data-popper-escaped": hasPopperEscaped
	});
}
var hide_default = {
	name: "hide",
	enabled: true,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: hide
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset) {
	var basePlacement = getBasePlacement(placement);
	var invertDistance = ["left", "top"].indexOf(basePlacement) >= 0 ? -1 : 1;
	var _ref = typeof offset === "function" ? offset(Object.assign({}, rects, { placement })) : offset, skidding = _ref[0], distance = _ref[1];
	skidding = skidding || 0;
	distance = (distance || 0) * invertDistance;
	return ["left", "right"].indexOf(basePlacement) >= 0 ? {
		x: distance,
		y: skidding
	} : {
		x: skidding,
		y: distance
	};
}
function offset(_ref2) {
	var state = _ref2.state, options = _ref2.options, name = _ref2.name;
	var _options$offset = options.offset, offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	var data = placements.reduce(function(acc, placement) {
		acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
		return acc;
	}, {});
	var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
	if (state.modifiersData.popperOffsets != null) {
		state.modifiersData.popperOffsets.x += x;
		state.modifiersData.popperOffsets.y += y;
	}
	state.modifiersData[name] = data;
}
var offset_default = {
	name: "offset",
	enabled: true,
	phase: "main",
	requires: ["popperOffsets"],
	fn: offset
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
	var state = _ref.state, name = _ref.name;
	state.modifiersData[name] = computeOffsets({
		reference: state.rects.reference,
		element: state.rects.popper,
		strategy: "absolute",
		placement: state.placement
	});
}
var popperOffsets_default = {
	name: "popperOffsets",
	enabled: true,
	phase: "read",
	fn: popperOffsets,
	data: {}
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
	return axis === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	var overflow = detectOverflow(state, {
		boundary,
		rootBoundary,
		padding,
		altBoundary
	});
	var basePlacement = getBasePlacement(state.placement);
	var variation = getVariation(state.placement);
	var isBasePlacement = !variation;
	var mainAxis = getMainAxisFromPlacement(basePlacement);
	var altAxis = getAltAxis(mainAxis);
	var popperOffsets = state.modifiersData.popperOffsets;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, { placement: state.placement })) : tetherOffset;
	var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
		mainAxis: tetherOffsetValue,
		altAxis: tetherOffsetValue
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, tetherOffsetValue);
	var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	var data = {
		x: 0,
		y: 0
	};
	if (!popperOffsets) return;
	if (checkMainAxis) {
		var _offsetModifierState$;
		var mainSide = mainAxis === "y" ? "top" : left;
		var altSide = mainAxis === "y" ? bottom : right;
		var len = mainAxis === "y" ? "height" : "width";
		var offset = popperOffsets[mainAxis];
		var min$1 = offset + overflow[mainSide];
		var max$1 = offset - overflow[altSide];
		var additive = tether ? -popperRect[len] / 2 : 0;
		var minLen = variation === "start" ? referenceRect[len] : popperRect[len];
		var maxLen = variation === "start" ? -popperRect[len] : -referenceRect[len];
		var arrowElement = state.elements.arrow;
		var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
			width: 0,
			height: 0
		};
		var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
		var arrowPaddingMin = arrowPaddingObject[mainSide];
		var arrowPaddingMax = arrowPaddingObject[altSide];
		var arrowLen = within(0, referenceRect[len], arrowRect[len]);
		var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
		var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
		var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
		var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
		var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
		var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
		var tetherMax = offset + maxOffset - offsetModifierValue;
		var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
		popperOffsets[mainAxis] = preventedOffset;
		data[mainAxis] = preventedOffset - offset;
	}
	if (checkAltAxis) {
		var _offsetModifierState$2;
		var _mainSide = mainAxis === "x" ? "top" : left;
		var _altSide = mainAxis === "x" ? bottom : right;
		var _offset = popperOffsets[altAxis];
		var _len = altAxis === "y" ? "height" : "width";
		var _min = _offset + overflow[_mainSide];
		var _max = _offset - overflow[_altSide];
		var isOriginSide = ["top", left].indexOf(basePlacement) !== -1;
		var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
		var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
		var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
		var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
		popperOffsets[altAxis] = _preventedOffset;
		data[altAxis] = _preventedOffset - _offset;
	}
	state.modifiersData[name] = data;
}
var preventOverflow_default = {
	name: "preventOverflow",
	enabled: true,
	phase: "main",
	fn: preventOverflow,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
	return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
	if (node === getWindow(node) || !isHTMLElement$1(node)) return getWindowScroll(node);
	else return getHTMLElementScroll(node);
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
	var rect = element.getBoundingClientRect();
	var scaleX = round$1(rect.width) / element.offsetWidth || 1;
	var scaleY = round$1(rect.height) / element.offsetHeight || 1;
	return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	if (isFixed === void 0) isFixed = false;
	var isOffsetParentAnElement = isHTMLElement$1(offsetParent);
	var offsetParentIsScaled = isHTMLElement$1(offsetParent) && isElementScaled(offsetParent);
	var documentElement = getDocumentElement(offsetParent);
	var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	var scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	var offsets = {
		x: 0,
		y: 0
	};
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isHTMLElement$1(offsetParent)) {
			offsets = getBoundingClientRect(offsetParent, true);
			offsets.x += offsetParent.clientLeft;
			offsets.y += offsetParent.clientTop;
		} else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
	}
	return {
		x: rect.left + scroll.scrollLeft - offsets.x,
		y: rect.top + scroll.scrollTop - offsets.y,
		width: rect.width,
		height: rect.height
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
	var map = /* @__PURE__ */ new Map();
	var visited = /* @__PURE__ */ new Set();
	var result = [];
	modifiers.forEach(function(modifier) {
		map.set(modifier.name, modifier);
	});
	function sort(modifier) {
		visited.add(modifier.name);
		[].concat(modifier.requires || [], modifier.requiresIfExists || []).forEach(function(dep) {
			if (!visited.has(dep)) {
				var depModifier = map.get(dep);
				if (depModifier) sort(depModifier);
			}
		});
		result.push(modifier);
	}
	modifiers.forEach(function(modifier) {
		if (!visited.has(modifier.name)) sort(modifier);
	});
	return result;
}
function orderModifiers(modifiers) {
	var orderedModifiers = order(modifiers);
	return modifierPhases.reduce(function(acc, phase) {
		return acc.concat(orderedModifiers.filter(function(modifier) {
			return modifier.phase === phase;
		}));
	}, []);
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
	var pending;
	return function() {
		if (!pending) pending = new Promise(function(resolve) {
			Promise.resolve().then(function() {
				pending = void 0;
				resolve(fn());
			});
		});
		return pending;
	};
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
	var merged = modifiers.reduce(function(merged, current) {
		var existing = merged[current.name];
		merged[current.name] = existing ? Object.assign({}, existing, current, {
			options: Object.assign({}, existing.options, current.options),
			data: Object.assign({}, existing.data, current.data)
		}) : current;
		return merged;
	}, {});
	return Object.keys(merged).map(function(key) {
		return merged[key];
	});
}
//#endregion
//#region node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function areValidElements() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return !args.some(function(element) {
		return !(element && typeof element.getBoundingClientRect === "function");
	});
}
function popperGenerator(generatorOptions) {
	if (generatorOptions === void 0) generatorOptions = {};
	var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	return function createPopper(reference, popper, options) {
		if (options === void 0) options = defaultOptions;
		var state = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
			modifiersData: {},
			elements: {
				reference,
				popper
			},
			attributes: {},
			styles: {}
		};
		var effectCleanupFns = [];
		var isDestroyed = false;
		var instance = {
			state,
			setOptions: function setOptions(setOptionsAction) {
				var options = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
				cleanupModifierEffects();
				state.options = Object.assign({}, defaultOptions, state.options, options);
				state.scrollParents = {
					reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
					popper: listScrollParents(popper)
				};
				var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
				state.orderedModifiers = orderedModifiers.filter(function(m) {
					return m.enabled;
				});
				runModifierEffects();
				return instance.update();
			},
			forceUpdate: function forceUpdate() {
				if (isDestroyed) return;
				var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
				if (!areValidElements(reference, popper)) return;
				state.rects = {
					reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === "fixed"),
					popper: getLayoutRect(popper)
				};
				state.reset = false;
				state.placement = state.options.placement;
				state.orderedModifiers.forEach(function(modifier) {
					return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
				});
				for (var index = 0; index < state.orderedModifiers.length; index++) {
					if (state.reset === true) {
						state.reset = false;
						index = -1;
						continue;
					}
					var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
					if (typeof fn === "function") state = fn({
						state,
						options: _options,
						name,
						instance
					}) || state;
				}
			},
			update: debounce(function() {
				return new Promise(function(resolve) {
					instance.forceUpdate();
					resolve(state);
				});
			}),
			destroy: function destroy() {
				cleanupModifierEffects();
				isDestroyed = true;
			}
		};
		if (!areValidElements(reference, popper)) return instance;
		instance.setOptions(options).then(function(state) {
			if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
		});
		function runModifierEffects() {
			state.orderedModifiers.forEach(function(_ref) {
				var name = _ref.name, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, effect = _ref.effect;
				if (typeof effect === "function") {
					var cleanupFn = effect({
						state,
						name,
						instance,
						options
					});
					effectCleanupFns.push(cleanupFn || function noopFn() {});
				}
			});
		}
		function cleanupModifierEffects() {
			effectCleanupFns.forEach(function(fn) {
				return fn();
			});
			effectCleanupFns = [];
		}
		return instance;
	};
}
var createPopper = /* @__PURE__ */ popperGenerator({ defaultModifiers: [
	eventListeners_default,
	popperOffsets_default,
	computeStyles_default,
	applyStyles_default,
	offset_default,
	flip_default,
	preventOverflow_default,
	arrow_default,
	hide_default
] });
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js
/**
* @ignore - do not document.
* Builds the props to be passed into the slot of an unstyled component.
* It merges the internal props of the component with the ones supplied by the user, allowing to customize the behavior.
* If the slot component is not a host component, it also merges in the `ownerState`.
*
* @param parameters.getSlotProps - A function that returns the props to be passed to the slot component.
*/
function useSlotProps(parameters) {
	const { elementType, externalSlotProps, ownerState, skipResolvingSlotProps = false, ...other } = parameters;
	const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
	const { props: mergedProps, internalRef } = mergeSlotProps({
		...other,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.additionalProps?.ref);
	return appendOwnerState(elementType, {
		...mergedProps,
		ref
	}, ownerState);
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js
/**
* Returns the ref of a React element handling differences between React 19 and older versions.
* It will throw runtime error if the element is not a valid React element.
*
* @param element React.ReactElement
* @returns React.Ref<any> | null
*/
function getReactElementRef(element) {
	if (parseInt("19.2.0", 10) >= 19) return element?.props?.ref || null;
	return element?.ref || null;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Portal/Portal.js
function getContainer$1(container) {
	return typeof container === "function" ? container() : container;
}
/**
* Portals provide a first-class way to render children into a DOM node
* that exists outside the DOM hierarchy of the parent component.
*
* Demos:
*
* - [Portal](https://mui.com/material-ui/react-portal/)
*
* API:
*
* - [Portal API](https://mui.com/material-ui/api/portal/)
*/
var Portal = /* @__PURE__ */ import_react.forwardRef(function Portal(props, forwardedRef) {
	const { children, container, disablePortal = false } = props;
	const [mountNode, setMountNode] = import_react.useState(null);
	const handleRef = useForkRef(/* @__PURE__ */ import_react.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
	useEnhancedEffect(() => {
		if (!disablePortal) setMountNode(getContainer$1(container) || document.body);
	}, [container, disablePortal]);
	useEnhancedEffect(() => {
		if (mountNode && !disablePortal) {
			setRef(forwardedRef, mountNode);
			return () => {
				setRef(forwardedRef, null);
			};
		}
	}, [
		forwardedRef,
		mountNode,
		disablePortal
	]);
	if (disablePortal) {
		if (/* @__PURE__ */ import_react.isValidElement(children)) {
			const newProps = { ref: handleRef };
			return /* @__PURE__ */ import_react.cloneElement(children, newProps);
		}
		return children;
	}
	return mountNode ? /* @__PURE__ */ import_react_dom.createPortal(children, mountNode) : mountNode;
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Popper/popperClasses.js
function getPopperUtilityClass(slot) {
	return generateUtilityClass("MuiPopper", slot);
}
generateUtilityClasses("MuiPopper", ["root"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Popper/BasePopper.js
function flipPlacement(placement, direction) {
	if (direction === "ltr") return placement;
	switch (placement) {
		case "bottom-end": return "bottom-start";
		case "bottom-start": return "bottom-end";
		case "top-end": return "top-start";
		case "top-start": return "top-end";
		default: return placement;
	}
}
function resolveAnchorEl$1(anchorEl) {
	return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement(element) {
	return element.nodeType !== void 0;
}
var useUtilityClasses$54 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getPopperUtilityClass, classes);
};
var defaultPopperOptions = {};
var PopperTooltip = /* @__PURE__ */ import_react.forwardRef(function PopperTooltip(props, forwardedRef) {
	const { anchorEl, children, direction, disablePortal, modifiers, open, placement: initialPlacement, popperOptions, popperRef: popperRefProp, slotProps = {}, slots = {}, TransitionProps, ownerState: ownerStateProp, ...other } = props;
	const tooltipRef = import_react.useRef(null);
	const ownRef = useForkRef(tooltipRef, forwardedRef);
	const popperRef = import_react.useRef(null);
	const handlePopperRef = useForkRef(popperRef, popperRefProp);
	const handlePopperRefRef = import_react.useRef(handlePopperRef);
	useEnhancedEffect(() => {
		handlePopperRefRef.current = handlePopperRef;
	}, [handlePopperRef]);
	import_react.useImperativeHandle(popperRefProp, () => popperRef.current, []);
	const rtlPlacement = flipPlacement(initialPlacement, direction);
	/**
	* placement initialized from prop but can change during lifetime if modifiers.flip.
	* modifiers.flip is essentially a flip for controlled/uncontrolled behavior
	*/
	const [placement, setPlacement] = import_react.useState(rtlPlacement);
	const [resolvedAnchorElement, setResolvedAnchorElement] = import_react.useState(resolveAnchorEl$1(anchorEl));
	import_react.useEffect(() => {
		if (popperRef.current) popperRef.current.forceUpdate();
	});
	import_react.useEffect(() => {
		if (anchorEl) setResolvedAnchorElement(resolveAnchorEl$1(anchorEl));
	}, [anchorEl]);
	useEnhancedEffect(() => {
		if (!resolvedAnchorElement || !open) return;
		const handlePopperUpdate = (data) => {
			setPlacement(data.placement);
		};
		let popperModifiers = [
			{
				name: "preventOverflow",
				options: { altBoundary: disablePortal }
			},
			{
				name: "flip",
				options: { altBoundary: disablePortal }
			},
			{
				name: "onUpdate",
				enabled: true,
				phase: "afterWrite",
				fn: ({ state }) => {
					handlePopperUpdate(state);
				}
			}
		];
		if (modifiers != null) popperModifiers = popperModifiers.concat(modifiers);
		if (popperOptions && popperOptions.modifiers != null) popperModifiers = popperModifiers.concat(popperOptions.modifiers);
		const popper = createPopper(resolvedAnchorElement, tooltipRef.current, {
			placement: rtlPlacement,
			...popperOptions,
			modifiers: popperModifiers
		});
		handlePopperRefRef.current(popper);
		return () => {
			popper.destroy();
			handlePopperRefRef.current(null);
		};
	}, [
		resolvedAnchorElement,
		disablePortal,
		modifiers,
		open,
		popperOptions,
		rtlPlacement
	]);
	const childProps = { placement };
	if (TransitionProps !== null) childProps.TransitionProps = TransitionProps;
	const classes = useUtilityClasses$54(props);
	const Root = slots.root ?? "div";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		...useSlotProps({
			elementType: Root,
			externalSlotProps: slotProps.root,
			externalForwardedProps: other,
			additionalProps: {
				role: "tooltip",
				ref: ownRef
			},
			ownerState: props,
			className: classes.root
		}),
		children: typeof children === "function" ? children(childProps) : children
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Popper/Popper.js
var PopperRoot = styled$2(/* @__PURE__ */ import_react.forwardRef(function Popper(props, forwardedRef) {
	const { anchorEl, children, container: containerProp, direction = "ltr", disablePortal = false, keepMounted = false, modifiers, open, placement = "bottom", popperOptions = defaultPopperOptions, popperRef, style, transition = false, slotProps = {}, slots = {}, ...other } = props;
	const [exited, setExited] = import_react.useState(true);
	const handleEnter = () => {
		setExited(false);
	};
	const handleExited = () => {
		setExited(true);
	};
	if (!keepMounted && !open && (!transition || exited)) return null;
	let container;
	if (containerProp) container = containerProp;
	else if (anchorEl) {
		const resolvedAnchorEl = resolveAnchorEl$1(anchorEl);
		container = resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
	}
	const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
	const transitionProps = transition ? {
		in: open,
		onEnter: handleEnter,
		onExited: handleExited
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		disablePortal,
		container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperTooltip, {
			anchorEl,
			direction,
			disablePortal,
			modifiers,
			ref: forwardedRef,
			open: transition ? !exited : open,
			placement,
			popperOptions,
			popperRef,
			slotProps,
			slots,
			...other,
			style: {
				position: "fixed",
				top: 0,
				left: 0,
				display,
				...style
			},
			TransitionProps: transitionProps,
			children
		})
	});
}), {
	name: "MuiPopper",
	slot: "Root"
})({});
/**
*
* Demos:
*
* - [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
* - [Menu](https://mui.com/material-ui/react-menu/)
* - [Popper](https://mui.com/material-ui/react-popper/)
*
* API:
*
* - [Popper API](https://mui.com/material-ui/api/popper/)
*/
var Popper = /* @__PURE__ */ import_react.forwardRef(function Popper(inProps, ref) {
	const isRtl = useRtl();
	const { anchorEl, component, components, componentsProps, container, disablePortal, keepMounted, modifiers, open, placement, popperOptions, popperRef, transition, slots, slotProps, ...other } = useDefaultProps({
		props: inProps,
		name: "MuiPopper"
	});
	const RootComponent = slots?.root ?? components?.Root;
	const otherProps = {
		anchorEl,
		container,
		disablePortal,
		keepMounted,
		modifiers,
		open,
		placement,
		popperOptions,
		popperRef,
		transition,
		...other
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperRoot, {
		as: component,
		direction: isRtl ? "rtl" : "ltr",
		slots: { root: RootComponent },
		slotProps: slotProps ?? componentsProps,
		...otherProps,
		ref
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/Cancel.js
/**
* @ignore - internal component.
*/
var Cancel_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" }), "Cancel");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Chip/chipClasses.js
function getChipUtilityClass(slot) {
	return generateUtilityClass("MuiChip", slot);
}
var chipClasses = generateUtilityClasses("MuiChip", [
	"root",
	"sizeSmall",
	"sizeMedium",
	"colorDefault",
	"colorError",
	"colorInfo",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorWarning",
	"disabled",
	"clickable",
	"clickableColorPrimary",
	"clickableColorSecondary",
	"deletable",
	"deletableColorPrimary",
	"deletableColorSecondary",
	"outlined",
	"filled",
	"outlinedPrimary",
	"outlinedSecondary",
	"filledPrimary",
	"filledSecondary",
	"avatar",
	"avatarSmall",
	"avatarMedium",
	"avatarColorPrimary",
	"avatarColorSecondary",
	"icon",
	"iconSmall",
	"iconMedium",
	"iconColorPrimary",
	"iconColorSecondary",
	"label",
	"labelSmall",
	"labelMedium",
	"deleteIcon",
	"deleteIconSmall",
	"deleteIconMedium",
	"deleteIconColorPrimary",
	"deleteIconColorSecondary",
	"deleteIconOutlinedColorPrimary",
	"deleteIconOutlinedColorSecondary",
	"deleteIconFilledColorPrimary",
	"deleteIconFilledColorSecondary",
	"focusVisible"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Chip/Chip.js
var useUtilityClasses$53 = (ownerState) => {
	const { classes, disabled, size, color, iconColor, onDelete, clickable, variant } = ownerState;
	return composeClasses({
		root: [
			"root",
			variant,
			disabled && "disabled",
			`size${capitalize_default(size)}`,
			`color${capitalize_default(color)}`,
			clickable && "clickable",
			clickable && `clickableColor${capitalize_default(color)}`,
			onDelete && "deletable",
			onDelete && `deletableColor${capitalize_default(color)}`,
			`${variant}${capitalize_default(color)}`
		],
		label: ["label", `label${capitalize_default(size)}`],
		avatar: [
			"avatar",
			`avatar${capitalize_default(size)}`,
			`avatarColor${capitalize_default(color)}`
		],
		icon: [
			"icon",
			`icon${capitalize_default(size)}`,
			`iconColor${capitalize_default(iconColor)}`
		],
		deleteIcon: [
			"deleteIcon",
			`deleteIcon${capitalize_default(size)}`,
			`deleteIconColor${capitalize_default(color)}`,
			`deleteIcon${capitalize_default(variant)}Color${capitalize_default(color)}`
		]
	}, getChipUtilityClass, classes);
};
var ChipRoot = styled$2("div", {
	name: "MuiChip",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		const { color, iconColor, clickable, onDelete, size, variant } = ownerState;
		return [
			{ [`& .${chipClasses.avatar}`]: styles.avatar },
			{ [`& .${chipClasses.avatar}`]: styles[`avatar${capitalize_default(size)}`] },
			{ [`& .${chipClasses.avatar}`]: styles[`avatarColor${capitalize_default(color)}`] },
			{ [`& .${chipClasses.icon}`]: styles.icon },
			{ [`& .${chipClasses.icon}`]: styles[`icon${capitalize_default(size)}`] },
			{ [`& .${chipClasses.icon}`]: styles[`iconColor${capitalize_default(iconColor)}`] },
			{ [`& .${chipClasses.deleteIcon}`]: styles.deleteIcon },
			{ [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize_default(size)}`] },
			{ [`& .${chipClasses.deleteIcon}`]: styles[`deleteIconColor${capitalize_default(color)}`] },
			{ [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize_default(variant)}Color${capitalize_default(color)}`] },
			styles.root,
			styles[`size${capitalize_default(size)}`],
			styles[`color${capitalize_default(color)}`],
			clickable && styles.clickable,
			clickable && color !== "default" && styles[`clickableColor${capitalize_default(color)}`],
			onDelete && styles.deletable,
			onDelete && color !== "default" && styles[`deletableColor${capitalize_default(color)}`],
			styles[variant],
			styles[`${variant}${capitalize_default(color)}`]
		];
	}
})(memoTheme(({ theme }) => {
	const textColor = theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.grey[300];
	return {
		maxWidth: "100%",
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.pxToRem(13),
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		height: 32,
		lineHeight: 1.5,
		color: (theme.vars || theme).palette.text.primary,
		backgroundColor: (theme.vars || theme).palette.action.selected,
		borderRadius: 32 / 2,
		whiteSpace: "nowrap",
		transition: theme.transitions.create(["background-color", "box-shadow"]),
		cursor: "unset",
		outline: 0,
		textDecoration: "none",
		border: 0,
		padding: 0,
		verticalAlign: "middle",
		boxSizing: "border-box",
		[`&.${chipClasses.disabled}`]: {
			opacity: (theme.vars || theme).palette.action.disabledOpacity,
			pointerEvents: "none"
		},
		[`& .${chipClasses.avatar}`]: {
			marginLeft: 5,
			marginRight: -6,
			width: 24,
			height: 24,
			color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
			fontSize: theme.typography.pxToRem(12)
		},
		[`& .${chipClasses.avatarColorPrimary}`]: {
			color: (theme.vars || theme).palette.primary.contrastText,
			backgroundColor: (theme.vars || theme).palette.primary.dark
		},
		[`& .${chipClasses.avatarColorSecondary}`]: {
			color: (theme.vars || theme).palette.secondary.contrastText,
			backgroundColor: (theme.vars || theme).palette.secondary.dark
		},
		[`& .${chipClasses.avatarSmall}`]: {
			marginLeft: 4,
			marginRight: -4,
			width: 18,
			height: 18,
			fontSize: theme.typography.pxToRem(10)
		},
		[`& .${chipClasses.icon}`]: {
			marginLeft: 5,
			marginRight: -6
		},
		[`& .${chipClasses.deleteIcon}`]: {
			WebkitTapHighlightColor: "transparent",
			color: theme.alpha((theme.vars || theme).palette.text.primary, .26),
			fontSize: 22,
			cursor: "pointer",
			margin: "0 5px 0 -6px",
			"&:hover": { color: theme.alpha((theme.vars || theme).palette.text.primary, .4) }
		},
		variants: [
			{
				props: { size: "small" },
				style: {
					height: 24,
					[`& .${chipClasses.icon}`]: {
						fontSize: 18,
						marginLeft: 4,
						marginRight: -4
					},
					[`& .${chipClasses.deleteIcon}`]: {
						fontSize: 16,
						marginRight: 4,
						marginLeft: -4
					}
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["contrastText"])).map(([color]) => {
				return {
					props: { color },
					style: {
						backgroundColor: (theme.vars || theme).palette[color].main,
						color: (theme.vars || theme).palette[color].contrastText,
						[`& .${chipClasses.deleteIcon}`]: {
							color: theme.alpha((theme.vars || theme).palette[color].contrastText, .7),
							"&:hover, &:active": { color: (theme.vars || theme).palette[color].contrastText }
						}
					}
				};
			}),
			{
				props: (props) => props.iconColor === props.color,
				style: { [`& .${chipClasses.icon}`]: { color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor } }
			},
			{
				props: (props) => props.iconColor === props.color && props.color !== "default",
				style: { [`& .${chipClasses.icon}`]: { color: "inherit" } }
			},
			{
				props: { onDelete: true },
				style: { [`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) } }
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => {
				return {
					props: {
						color,
						onDelete: true
					},
					style: { [`&.${chipClasses.focusVisible}`]: { background: (theme.vars || theme).palette[color].dark } }
				};
			}),
			{
				props: { clickable: true },
				style: {
					userSelect: "none",
					WebkitTapHighlightColor: "transparent",
					cursor: "pointer",
					"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`) },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) },
					"&:active": { boxShadow: (theme.vars || theme).shadows[1] }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => ({
				props: {
					color,
					clickable: true
				},
				style: { [`&:hover, &.${chipClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette[color].dark } }
			})),
			{
				props: { variant: "outlined" },
				style: {
					backgroundColor: "transparent",
					border: theme.vars ? `1px solid ${theme.vars.palette.Chip.defaultBorder}` : `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[700]}`,
					[`&.${chipClasses.clickable}:hover`]: { backgroundColor: (theme.vars || theme).palette.action.hover },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette.action.focus },
					[`& .${chipClasses.avatar}`]: { marginLeft: 4 },
					[`& .${chipClasses.avatarSmall}`]: { marginLeft: 2 },
					[`& .${chipClasses.icon}`]: { marginLeft: 4 },
					[`& .${chipClasses.iconSmall}`]: { marginLeft: 2 },
					[`& .${chipClasses.deleteIcon}`]: { marginRight: 5 },
					[`& .${chipClasses.deleteIconSmall}`]: { marginRight: 3 }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: {
					variant: "outlined",
					color
				},
				style: {
					color: (theme.vars || theme).palette[color].main,
					border: `1px solid ${theme.alpha((theme.vars || theme).palette[color].main, .7)}`,
					[`&.${chipClasses.clickable}:hover`]: { backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity) },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.focusOpacity) },
					[`& .${chipClasses.deleteIcon}`]: {
						color: theme.alpha((theme.vars || theme).palette[color].main, .7),
						"&:hover, &:active": { color: (theme.vars || theme).palette[color].main }
					}
				}
			}))
		]
	};
}));
var ChipLabel = styled$2("span", {
	name: "MuiChip",
	slot: "Label",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		const { size } = ownerState;
		return [styles.label, styles[`label${capitalize_default(size)}`]];
	}
})({
	overflow: "hidden",
	textOverflow: "ellipsis",
	paddingLeft: 12,
	paddingRight: 12,
	whiteSpace: "nowrap",
	variants: [
		{
			props: { variant: "outlined" },
			style: {
				paddingLeft: 11,
				paddingRight: 11
			}
		},
		{
			props: { size: "small" },
			style: {
				paddingLeft: 8,
				paddingRight: 8
			}
		},
		{
			props: {
				size: "small",
				variant: "outlined"
			},
			style: {
				paddingLeft: 7,
				paddingRight: 7
			}
		}
	]
});
function isDeleteKeyboardEvent(keyboardEvent) {
	return keyboardEvent.key === "Backspace" || keyboardEvent.key === "Delete";
}
/**
* Chips represent complex entities in small blocks, such as a contact.
*/
var Chip = /* @__PURE__ */ import_react.forwardRef(function Chip(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiChip"
	});
	const { avatar: avatarProp, className, clickable: clickableProp, color = "default", component: ComponentProp, deleteIcon: deleteIconProp, disabled = false, icon: iconProp, label, onClick, onDelete, onKeyDown, onKeyUp, size = "medium", variant = "filled", tabIndex, skipFocusWhenDisabled = false, slots = {}, slotProps = {}, ...other } = props;
	const handleRef = useForkRef_default(import_react.useRef(null), ref);
	const handleDeleteIconClick = (event) => {
		event.stopPropagation();
		onDelete(event);
	};
	const handleKeyDown = (event) => {
		if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) event.preventDefault();
		if (onKeyDown) onKeyDown(event);
	};
	const handleKeyUp = (event) => {
		if (event.currentTarget === event.target) {
			if (onDelete && isDeleteKeyboardEvent(event)) onDelete(event);
		}
		if (onKeyUp) onKeyUp(event);
	};
	const clickable = clickableProp !== false && onClick ? true : clickableProp;
	const component = clickable || onDelete ? ButtonBase : ComponentProp || "div";
	const ownerState = {
		...props,
		component,
		disabled,
		size,
		color,
		iconColor: /* @__PURE__ */ import_react.isValidElement(iconProp) ? iconProp.props.color || color : color,
		onDelete: !!onDelete,
		clickable,
		variant
	};
	const classes = useUtilityClasses$53(ownerState);
	const moreProps = component === ButtonBase ? {
		component: ComponentProp || "div",
		focusVisibleClassName: classes.focusVisible,
		...onDelete && { disableRipple: true }
	} : {};
	let deleteIcon = null;
	if (onDelete) deleteIcon = deleteIconProp && /* @__PURE__ */ import_react.isValidElement(deleteIconProp) ? /* @__PURE__ */ import_react.cloneElement(deleteIconProp, {
		className: clsx(deleteIconProp.props.className, classes.deleteIcon),
		onClick: handleDeleteIconClick
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel_default, {
		className: classes.deleteIcon,
		onClick: handleDeleteIconClick
	});
	let avatar = null;
	if (avatarProp && /* @__PURE__ */ import_react.isValidElement(avatarProp)) avatar = /* @__PURE__ */ import_react.cloneElement(avatarProp, { className: clsx(classes.avatar, avatarProp.props.className) });
	let icon = null;
	if (iconProp && /* @__PURE__ */ import_react.isValidElement(iconProp)) icon = /* @__PURE__ */ import_react.cloneElement(iconProp, { className: clsx(classes.icon, iconProp.props.className) });
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: ChipRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		shouldForwardComponentProp: true,
		ref: handleRef,
		className: clsx(classes.root, className),
		additionalProps: {
			disabled: clickable && disabled ? true : void 0,
			tabIndex: skipFocusWhenDisabled && disabled ? -1 : tabIndex,
			...moreProps
		},
		getSlotProps: (handlers) => ({
			...handlers,
			onClick: (event) => {
				handlers.onClick?.(event);
				onClick?.(event);
			},
			onKeyDown: (event) => {
				handlers.onKeyDown?.(event);
				handleKeyDown(event);
			},
			onKeyUp: (event) => {
				handlers.onKeyUp?.(event);
				handleKeyUp(event);
			}
		})
	});
	const [LabelSlot, labelProps] = useSlot("label", {
		elementType: ChipLabel,
		externalForwardedProps,
		ownerState,
		className: classes.label
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		as: component,
		...rootProps,
		children: [
			avatar || icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelSlot, {
				...labelProps,
				children: label
			}),
			deleteIcon
		]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/TextareaAutosize/TextareaAutosize.js
function getStyleValue(value) {
	return parseInt(value, 10) || 0;
}
var styles$5 = { shadow: {
	visibility: "hidden",
	position: "absolute",
	overflow: "hidden",
	height: 0,
	top: 0,
	left: 0,
	transform: "translateZ(0)"
} };
function isObjectEmpty(object) {
	for (const _ in object) return false;
	return true;
}
function isEmpty$1(obj) {
	return isObjectEmpty(obj) || obj.outerHeightStyle === 0 && !obj.overflowing;
}
/**
*
* Demos:
*
* - [Textarea Autosize](https://mui.com/material-ui/react-textarea-autosize/)
*
* API:
*
* - [TextareaAutosize API](https://mui.com/material-ui/api/textarea-autosize/)
*/
var TextareaAutosize = /* @__PURE__ */ import_react.forwardRef(function TextareaAutosize(props, forwardedRef) {
	const { onChange, maxRows, minRows = 1, style, value, ...other } = props;
	const { current: isControlled } = import_react.useRef(value != null);
	const textareaRef = import_react.useRef(null);
	const handleRef = useForkRef(forwardedRef, textareaRef);
	const heightRef = import_react.useRef(null);
	const hiddenTextareaRef = import_react.useRef(null);
	const calculateTextareaStyles = import_react.useCallback(() => {
		const textarea = textareaRef.current;
		const hiddenTextarea = hiddenTextareaRef.current;
		if (!textarea || !hiddenTextarea) return;
		const computedStyle = ownerWindow(textarea).getComputedStyle(textarea);
		if (computedStyle.width === "0px") return {
			outerHeightStyle: 0,
			overflowing: false
		};
		hiddenTextarea.style.width = computedStyle.width;
		hiddenTextarea.value = textarea.value || props.placeholder || "x";
		if (hiddenTextarea.value.slice(-1) === "\n") hiddenTextarea.value += " ";
		const boxSizing = computedStyle.boxSizing;
		const padding = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
		const border = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);
		const innerHeight = hiddenTextarea.scrollHeight;
		hiddenTextarea.value = "x";
		const singleRowHeight = hiddenTextarea.scrollHeight;
		let outerHeight = innerHeight;
		if (minRows) outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
		if (maxRows) outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
		outerHeight = Math.max(outerHeight, singleRowHeight);
		return {
			outerHeightStyle: outerHeight + (boxSizing === "border-box" ? padding + border : 0),
			overflowing: Math.abs(outerHeight - innerHeight) <= 1
		};
	}, [
		maxRows,
		minRows,
		props.placeholder
	]);
	const didHeightChange = useEventCallback(() => {
		const textarea = textareaRef.current;
		const textareaStyles = calculateTextareaStyles();
		if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) return false;
		const outerHeightStyle = textareaStyles.outerHeightStyle;
		return heightRef.current != null && heightRef.current !== outerHeightStyle;
	});
	const syncHeight = import_react.useCallback(() => {
		const textarea = textareaRef.current;
		const textareaStyles = calculateTextareaStyles();
		if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) return;
		const outerHeightStyle = textareaStyles.outerHeightStyle;
		if (heightRef.current !== outerHeightStyle) {
			heightRef.current = outerHeightStyle;
			textarea.style.height = `${outerHeightStyle}px`;
		}
		textarea.style.overflow = textareaStyles.overflowing ? "hidden" : "";
	}, [calculateTextareaStyles]);
	const frameRef = import_react.useRef(-1);
	useEnhancedEffect(() => {
		const debouncedHandleResize = debounce$1(syncHeight);
		const textarea = textareaRef?.current;
		if (!textarea) return;
		const containerWindow = ownerWindow(textarea);
		containerWindow.addEventListener("resize", debouncedHandleResize);
		let resizeObserver;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => {
				if (didHeightChange()) {
					resizeObserver.unobserve(textarea);
					cancelAnimationFrame(frameRef.current);
					syncHeight();
					frameRef.current = requestAnimationFrame(() => {
						resizeObserver.observe(textarea);
					});
				}
			});
			resizeObserver.observe(textarea);
		}
		return () => {
			debouncedHandleResize.clear();
			cancelAnimationFrame(frameRef.current);
			containerWindow.removeEventListener("resize", debouncedHandleResize);
			if (resizeObserver) resizeObserver.disconnect();
		};
	}, [
		calculateTextareaStyles,
		syncHeight,
		didHeightChange
	]);
	useEnhancedEffect(() => {
		syncHeight();
	});
	const handleChange = (event) => {
		if (!isControlled) syncHeight();
		const textarea = event.target;
		const countOfCharacters = textarea.value.length;
		const isLastCharacterNewLine = textarea.value.endsWith("\n");
		const isEndOfTheLine = textarea.selectionStart === countOfCharacters;
		if (isLastCharacterNewLine && isEndOfTheLine) textarea.setSelectionRange(countOfCharacters, countOfCharacters);
		if (onChange) onChange(event);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: handleChange,
		ref: handleRef,
		rows: minRows,
		style,
		...other
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"aria-hidden": true,
		className: props.className,
		readOnly: true,
		ref: hiddenTextareaRef,
		tabIndex: -1,
		style: {
			...styles$5.shadow,
			...style,
			paddingTop: 0,
			paddingBottom: 0
		}
	})] });
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormControl/formControlState.js
function formControlState({ props, states, muiFormControl }) {
	return states.reduce((acc, state) => {
		acc[state] = props[state];
		if (muiFormControl) {
			if (typeof props[state] === "undefined") acc[state] = muiFormControl[state];
		}
		return acc;
	}, {});
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormControl/FormControlContext.js
/**
* @ignore - internal component.
*/
var FormControlContext = /* @__PURE__ */ import_react.createContext(void 0);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormControl/useFormControl.js
function useFormControl() {
	return import_react.useContext(FormControlContext);
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/InputBase/utils.js
function hasValue(value) {
	return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR = false) {
	return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
	return obj.startAdornment;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/InputBase/inputBaseClasses.js
function getInputBaseUtilityClass(slot) {
	return generateUtilityClass("MuiInputBase", slot);
}
var inputBaseClasses = generateUtilityClasses("MuiInputBase", [
	"root",
	"formControl",
	"focused",
	"disabled",
	"adornedStart",
	"adornedEnd",
	"error",
	"sizeSmall",
	"multiline",
	"colorSecondary",
	"fullWidth",
	"hiddenLabel",
	"readOnly",
	"input",
	"inputSizeSmall",
	"inputMultiline",
	"inputTypeSearch",
	"inputAdornedStart",
	"inputAdornedEnd",
	"inputHiddenLabel"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/InputBase/InputBase.js
var _InputGlobalStyles;
var rootOverridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.formControl && styles.formControl,
		ownerState.startAdornment && styles.adornedStart,
		ownerState.endAdornment && styles.adornedEnd,
		ownerState.error && styles.error,
		ownerState.size === "small" && styles.sizeSmall,
		ownerState.multiline && styles.multiline,
		ownerState.color && styles[`color${capitalize_default(ownerState.color)}`],
		ownerState.fullWidth && styles.fullWidth,
		ownerState.hiddenLabel && styles.hiddenLabel
	];
};
var inputOverridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.input,
		ownerState.size === "small" && styles.inputSizeSmall,
		ownerState.multiline && styles.inputMultiline,
		ownerState.type === "search" && styles.inputTypeSearch,
		ownerState.startAdornment && styles.inputAdornedStart,
		ownerState.endAdornment && styles.inputAdornedEnd,
		ownerState.hiddenLabel && styles.inputHiddenLabel
	];
};
var useUtilityClasses$52 = (ownerState) => {
	const { classes, color, disabled, error, endAdornment, focused, formControl, fullWidth, hiddenLabel, multiline, readOnly, size, startAdornment, type } = ownerState;
	return composeClasses({
		root: [
			"root",
			`color${capitalize_default(color)}`,
			disabled && "disabled",
			error && "error",
			fullWidth && "fullWidth",
			focused && "focused",
			formControl && "formControl",
			size && size !== "medium" && `size${capitalize_default(size)}`,
			multiline && "multiline",
			startAdornment && "adornedStart",
			endAdornment && "adornedEnd",
			hiddenLabel && "hiddenLabel",
			readOnly && "readOnly"
		],
		input: [
			"input",
			disabled && "disabled",
			type === "search" && "inputTypeSearch",
			multiline && "inputMultiline",
			size === "small" && "inputSizeSmall",
			hiddenLabel && "inputHiddenLabel",
			startAdornment && "inputAdornedStart",
			endAdornment && "inputAdornedEnd",
			readOnly && "readOnly"
		]
	}, getInputBaseUtilityClass, classes);
};
var InputBaseRoot = styled$2("div", {
	name: "MuiInputBase",
	slot: "Root",
	overridesResolver: rootOverridesResolver
})(memoTheme(({ theme }) => ({
	...theme.typography.body1,
	color: (theme.vars || theme).palette.text.primary,
	lineHeight: "1.4375em",
	boxSizing: "border-box",
	position: "relative",
	cursor: "text",
	display: "inline-flex",
	alignItems: "center",
	[`&.${inputBaseClasses.disabled}`]: {
		color: (theme.vars || theme).palette.text.disabled,
		cursor: "default"
	},
	variants: [
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: { padding: "4px 0 5px" }
		},
		{
			props: ({ ownerState, size }) => ownerState.multiline && size === "small",
			style: { paddingTop: 1 }
		},
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: { width: "100%" }
		}
	]
})));
var InputBaseInput = styled$2("input", {
	name: "MuiInputBase",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme(({ theme }) => {
	const light = theme.palette.mode === "light";
	const placeholder = {
		color: "currentColor",
		...theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: light ? .42 : .5 },
		transition: theme.transitions.create("opacity", { duration: theme.transitions.duration.shorter })
	};
	const placeholderHidden = { opacity: "0 !important" };
	const placeholderVisible = theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: light ? .42 : .5 };
	return {
		font: "inherit",
		letterSpacing: "inherit",
		color: "currentColor",
		padding: "4px 0 5px",
		border: 0,
		boxSizing: "content-box",
		background: "none",
		height: "1.4375em",
		margin: 0,
		WebkitTapHighlightColor: "transparent",
		display: "block",
		minWidth: 0,
		width: "100%",
		"&::-webkit-input-placeholder": placeholder,
		"&::-moz-placeholder": placeholder,
		"&::-ms-input-placeholder": placeholder,
		"&:focus": { outline: 0 },
		"&:invalid": { boxShadow: "none" },
		"&::-webkit-search-decoration": { WebkitAppearance: "none" },
		[`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
			"&::-webkit-input-placeholder": placeholderHidden,
			"&::-moz-placeholder": placeholderHidden,
			"&::-ms-input-placeholder": placeholderHidden,
			"&:focus::-webkit-input-placeholder": placeholderVisible,
			"&:focus::-moz-placeholder": placeholderVisible,
			"&:focus::-ms-input-placeholder": placeholderVisible
		},
		[`&.${inputBaseClasses.disabled}`]: {
			opacity: 1,
			WebkitTextFillColor: (theme.vars || theme).palette.text.disabled
		},
		variants: [
			{
				props: ({ ownerState }) => !ownerState.disableInjectingGlobalStyles,
				style: {
					animationName: "mui-auto-fill-cancel",
					animationDuration: "10ms",
					"&:-webkit-autofill": {
						animationDuration: "5000s",
						animationName: "mui-auto-fill"
					}
				}
			},
			{
				props: { size: "small" },
				style: { paddingTop: 1 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: {
					height: "auto",
					resize: "none",
					padding: 0,
					paddingTop: 0
				}
			},
			{
				props: { type: "search" },
				style: { MozAppearance: "textfield" }
			}
		]
	};
}));
var InputGlobalStyles = globalCss({
	"@keyframes mui-auto-fill": { from: { display: "block" } },
	"@keyframes mui-auto-fill-cancel": { from: { display: "block" } }
});
/**
* `InputBase` contains as few styles as possible.
* It aims to be a simple building block for creating an input.
* It contains a load of style reset and some state logic.
*/
var InputBase = /* @__PURE__ */ import_react.forwardRef(function InputBase(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInputBase"
	});
	const { "aria-describedby": ariaDescribedby, autoComplete, autoFocus, className, color, components = {}, componentsProps = {}, defaultValue, disabled, disableInjectingGlobalStyles, endAdornment, error, fullWidth = false, id, inputComponent = "input", inputProps: inputPropsProp = {}, inputRef: inputRefProp, margin, maxRows, minRows, multiline = false, name, onBlur, onChange, onClick, onFocus, onKeyDown, onKeyUp, placeholder, readOnly, renderSuffix, rows, size, slotProps = {}, slots = {}, startAdornment, type = "text", value: valueProp, ...other } = props;
	const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
	const { current: isControlled } = import_react.useRef(value != null);
	const inputRef = import_react.useRef();
	const handleInputRefWarning = import_react.useCallback((instance) => {}, []);
	const handleInputRef = useForkRef_default(inputRef, inputRefProp, inputPropsProp.ref, handleInputRefWarning);
	const [focused, setFocused] = import_react.useState(false);
	const muiFormControl = useFormControl();
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"color",
			"disabled",
			"error",
			"hiddenLabel",
			"size",
			"required",
			"filled"
		]
	});
	fcs.focused = muiFormControl ? muiFormControl.focused : focused;
	import_react.useEffect(() => {
		if (!muiFormControl && disabled && focused) {
			setFocused(false);
			if (onBlur) onBlur();
		}
	}, [
		muiFormControl,
		disabled,
		focused,
		onBlur
	]);
	const onFilled = muiFormControl && muiFormControl.onFilled;
	const onEmpty = muiFormControl && muiFormControl.onEmpty;
	const checkDirty = import_react.useCallback((obj) => {
		if (isFilled(obj)) {
			if (onFilled) onFilled();
		} else if (onEmpty) onEmpty();
	}, [onFilled, onEmpty]);
	useEnhancedEffect_default(() => {
		if (isControlled) checkDirty({ value });
	}, [
		value,
		checkDirty,
		isControlled
	]);
	const handleFocus = (event) => {
		if (onFocus) onFocus(event);
		if (inputPropsProp.onFocus) inputPropsProp.onFocus(event);
		if (muiFormControl && muiFormControl.onFocus) muiFormControl.onFocus(event);
		else setFocused(true);
	};
	const handleBlur = (event) => {
		if (onBlur) onBlur(event);
		if (inputPropsProp.onBlur) inputPropsProp.onBlur(event);
		if (muiFormControl && muiFormControl.onBlur) muiFormControl.onBlur(event);
		else setFocused(false);
	};
	const handleChange = (event, ...args) => {
		if (!isControlled) {
			const element = event.target || inputRef.current;
			if (element == null) throw new Error(formatMuiErrorMessage(1));
			checkDirty({ value: element.value });
		}
		if (inputPropsProp.onChange) inputPropsProp.onChange(event, ...args);
		if (onChange) onChange(event, ...args);
	};
	import_react.useEffect(() => {
		checkDirty(inputRef.current);
	}, []);
	const handleClick = (event) => {
		if (inputRef.current && event.currentTarget === event.target) inputRef.current.focus();
		if (onClick) onClick(event);
	};
	let InputComponent = inputComponent;
	let inputProps = inputPropsProp;
	if (multiline && InputComponent === "input") {
		if (rows) inputProps = {
			type: void 0,
			minRows: rows,
			maxRows: rows,
			...inputProps
		};
		else inputProps = {
			type: void 0,
			maxRows,
			minRows,
			...inputProps
		};
		InputComponent = TextareaAutosize;
	}
	const handleAutoFill = (event) => {
		checkDirty(event.animationName === "mui-auto-fill-cancel" ? inputRef.current : { value: "x" });
	};
	import_react.useEffect(() => {
		if (muiFormControl) muiFormControl.setAdornedStart(Boolean(startAdornment));
	}, [muiFormControl, startAdornment]);
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		disabled: fcs.disabled,
		endAdornment,
		error: fcs.error,
		focused: fcs.focused,
		formControl: muiFormControl,
		fullWidth,
		hiddenLabel: fcs.hiddenLabel,
		multiline,
		size: fcs.size,
		startAdornment,
		type
	};
	const classes = useUtilityClasses$52(ownerState);
	const Root = slots.root || components.Root || InputBaseRoot;
	const rootProps = slotProps.root || componentsProps.root || {};
	const Input = slots.input || components.Input || InputBaseInput;
	inputProps = {
		...inputProps,
		...slotProps.input ?? componentsProps.input
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [!disableInjectingGlobalStyles && typeof InputGlobalStyles === "function" && (_InputGlobalStyles || (_InputGlobalStyles = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGlobalStyles, {}))), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		...rootProps,
		ref,
		onClick: handleClick,
		...other,
		...!isHostComponent(Root) && { ownerState: {
			...ownerState,
			...rootProps.ownerState
		} },
		className: clsx(classes.root, rootProps.className, className, readOnly && "MuiInputBase-readOnly"),
		children: [
			startAdornment,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlContext.Provider, {
				value: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"aria-invalid": fcs.error,
					"aria-describedby": ariaDescribedby,
					autoComplete,
					autoFocus,
					defaultValue,
					disabled: fcs.disabled,
					id,
					onAnimationStart: handleAutoFill,
					name,
					placeholder,
					readOnly,
					required: fcs.required,
					rows,
					value,
					onKeyDown,
					onKeyUp,
					type,
					...inputProps,
					...!isHostComponent(Input) && {
						as: InputComponent,
						ownerState: {
							...ownerState,
							...inputProps.ownerState
						}
					},
					ref: handleInputRef,
					className: clsx(classes.input, inputProps.className, readOnly && "MuiInputBase-readOnly"),
					onBlur: handleBlur,
					onChange: handleChange,
					onFocus: handleFocus
				})
			}),
			endAdornment,
			renderSuffix ? renderSuffix({
				...fcs,
				startAdornment
			}) : null
		]
	})] });
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Input/inputClasses.js
function getInputUtilityClass(slot) {
	return generateUtilityClass("MuiInput", slot);
}
var inputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiInput", [
		"root",
		"underline",
		"input"
	])
};
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/OutlinedInput/outlinedInputClasses.js
function getOutlinedInputUtilityClass(slot) {
	return generateUtilityClass("MuiOutlinedInput", slot);
}
var outlinedInputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiOutlinedInput", [
		"root",
		"notchedOutline",
		"input"
	])
};
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FilledInput/filledInputClasses.js
function getFilledInputUtilityClass(slot) {
	return generateUtilityClass("MuiFilledInput", slot);
}
var filledInputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiFilledInput", [
		"root",
		"underline",
		"input",
		"adornedStart",
		"adornedEnd",
		"sizeSmall",
		"multiline",
		"hiddenLabel"
	])
};
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/ArrowDropDown.js
/**
* @ignore - internal component.
*/
var ArrowDropDown_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 10l5 5 5-5z" }), "ArrowDropDown");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/Person.js
/**
* @ignore - internal component.
*/
var Person_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }), "Person");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Avatar/avatarClasses.js
function getAvatarUtilityClass(slot) {
	return generateUtilityClass("MuiAvatar", slot);
}
generateUtilityClasses("MuiAvatar", [
	"root",
	"colorDefault",
	"circular",
	"rounded",
	"square",
	"img",
	"fallback"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Avatar/Avatar.js
var useUtilityClasses$51 = (ownerState) => {
	const { classes, variant, colorDefault } = ownerState;
	return composeClasses({
		root: [
			"root",
			variant,
			colorDefault && "colorDefault"
		],
		img: ["img"],
		fallback: ["fallback"]
	}, getAvatarUtilityClass, classes);
};
var AvatarRoot = styled$2("div", {
	name: "MuiAvatar",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			ownerState.colorDefault && styles.colorDefault
		];
	}
})(memoTheme(({ theme }) => ({
	position: "relative",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
	width: 40,
	height: 40,
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.pxToRem(20),
	lineHeight: 1,
	borderRadius: "50%",
	overflow: "hidden",
	userSelect: "none",
	variants: [
		{
			props: { variant: "rounded" },
			style: { borderRadius: (theme.vars || theme).shape.borderRadius }
		},
		{
			props: { variant: "square" },
			style: { borderRadius: 0 }
		},
		{
			props: { colorDefault: true },
			style: {
				color: (theme.vars || theme).palette.background.default,
				...theme.vars ? { backgroundColor: theme.vars.palette.Avatar.defaultBg } : {
					backgroundColor: theme.palette.grey[400],
					...theme.applyStyles("dark", { backgroundColor: theme.palette.grey[600] })
				}
			}
		}
	]
})));
var AvatarImg = styled$2("img", {
	name: "MuiAvatar",
	slot: "Img"
})({
	width: "100%",
	height: "100%",
	textAlign: "center",
	objectFit: "cover",
	color: "transparent",
	textIndent: 1e4
});
var AvatarFallback = styled$2(Person_default, {
	name: "MuiAvatar",
	slot: "Fallback"
})({
	width: "75%",
	height: "75%"
});
function useLoaded({ crossOrigin, referrerPolicy, src, srcSet }) {
	const [loaded, setLoaded] = import_react.useState(false);
	import_react.useEffect(() => {
		if (!src && !srcSet) return;
		setLoaded(false);
		let active = true;
		const image = new Image();
		image.onload = () => {
			if (!active) return;
			setLoaded("loaded");
		};
		image.onerror = () => {
			if (!active) return;
			setLoaded("error");
		};
		image.crossOrigin = crossOrigin;
		image.referrerPolicy = referrerPolicy;
		image.src = src;
		if (srcSet) image.srcset = srcSet;
		return () => {
			active = false;
		};
	}, [
		crossOrigin,
		referrerPolicy,
		src,
		srcSet
	]);
	return loaded;
}
var Avatar = /* @__PURE__ */ import_react.forwardRef(function Avatar(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiAvatar"
	});
	const { alt, children: childrenProp, className, component = "div", slots = {}, slotProps = {}, imgProps, sizes, src, srcSet, variant = "circular", ...other } = props;
	let children = null;
	const ownerState = {
		...props,
		component,
		variant
	};
	const loaded = useLoaded({
		...imgProps,
		...typeof slotProps.img === "function" ? slotProps.img(ownerState) : slotProps.img,
		src,
		srcSet
	});
	const hasImg = src || srcSet;
	const hasImgNotFailing = hasImg && loaded !== "error";
	ownerState.colorDefault = !hasImgNotFailing;
	delete ownerState.ownerState;
	const classes = useUtilityClasses$51(ownerState);
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		className: clsx(classes.root, className),
		elementType: AvatarRoot,
		externalForwardedProps: {
			slots,
			slotProps,
			component,
			...other
		},
		ownerState
	});
	const [ImgSlot, imgSlotProps] = useSlot("img", {
		className: classes.img,
		elementType: AvatarImg,
		externalForwardedProps: {
			slots,
			slotProps: { img: {
				...imgProps,
				...slotProps.img
			} }
		},
		additionalProps: {
			alt,
			src,
			srcSet,
			sizes
		},
		ownerState
	});
	const [FallbackSlot, fallbackSlotProps] = useSlot("fallback", {
		className: classes.fallback,
		elementType: AvatarFallback,
		externalForwardedProps: {
			slots,
			slotProps
		},
		shouldForwardComponentProp: true,
		ownerState
	});
	if (hasImgNotFailing) children = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImgSlot, { ...imgSlotProps });
	else if (!!childrenProp || childrenProp === 0) children = childrenProp;
	else if (hasImg && alt) children = alt[0];
	else children = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackSlot, { ...fallbackSlotProps });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		...rootSlotProps,
		children
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Fade/Fade.js
var styles$4 = {
	entering: { opacity: 1 },
	entered: { opacity: 1 }
};
/**
* The Fade transition is used by the [Modal](/material-ui/react-modal/) component.
* It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
*/
var Fade = /* @__PURE__ */ import_react.forwardRef(function Fade(props, ref) {
	const theme = useTheme$3();
	const defaultTimeout = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { addEndListener, appear = true, children, easing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style, timeout = defaultTimeout, TransitionComponent = Transition, ...other } = props;
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
		if (callback) {
			const node = nodeRef.current;
			if (maybeIsAppearing === void 0) callback(node);
			else callback(node, maybeIsAppearing);
		}
	};
	const handleEntering = normalizedTransitionCallback(onEntering);
	const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
		reflow(node);
		const transitionProps = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "enter" });
		node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
		node.style.transition = theme.transitions.create("opacity", transitionProps);
		if (onEnter) onEnter(node, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node) => {
		const transitionProps = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "exit" });
		node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
		node.style.transition = theme.transitions.create("opacity", transitionProps);
		if (onExit) onExit(node);
	});
	const handleExited = normalizedTransitionCallback(onExited);
	const handleAddEndListener = (next) => {
		if (addEndListener) addEndListener(nodeRef.current, next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		timeout,
		...other,
		children: (state, { ownerState, ...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				style: {
					opacity: 0,
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...styles$4[state],
					...style,
					...children.props.style
				},
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Backdrop/backdropClasses.js
function getBackdropUtilityClass(slot) {
	return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Backdrop/Backdrop.js
var useUtilityClasses$50 = (ownerState) => {
	const { classes, invisible } = ownerState;
	return composeClasses({ root: ["root", invisible && "invisible"] }, getBackdropUtilityClass, classes);
};
var BackdropRoot = styled$2("div", {
	name: "MuiBackdrop",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.invisible && styles.invisible];
	}
})({
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	WebkitTapHighlightColor: "transparent",
	variants: [{
		props: { invisible: true },
		style: { backgroundColor: "transparent" }
	}]
});
var Backdrop = /* @__PURE__ */ import_react.forwardRef(function Backdrop(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiBackdrop"
	});
	const { children, className, component = "div", invisible = false, open, components = {}, componentsProps = {}, slotProps = {}, slots = {}, TransitionComponent: TransitionComponentProp, transitionDuration, ...other } = props;
	const ownerState = {
		...props,
		component,
		invisible
	};
	const classes = useUtilityClasses$50(ownerState);
	const externalForwardedProps = {
		component,
		slots: {
			transition: TransitionComponentProp,
			root: components.Root,
			...slots
		},
		slotProps: {
			...componentsProps,
			...slotProps
		}
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: BackdropRoot,
		externalForwardedProps,
		className: clsx(classes.root, className),
		ownerState
	});
	const [TransitionSlot, transitionProps] = useSlot("transition", {
		elementType: Fade,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
		in: open,
		timeout: transitionDuration,
		...other,
		...transitionProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
			"aria-hidden": true,
			...rootProps,
			ref,
			children
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Badge/useBadge.js
function useBadge(parameters) {
	const { badgeContent: badgeContentProp, invisible: invisibleProp = false, max: maxProp = 99, showZero = false } = parameters;
	const prevProps = usePreviousProps({
		badgeContent: badgeContentProp,
		max: maxProp
	});
	let invisible = invisibleProp;
	if (invisibleProp === false && badgeContentProp === 0 && !showZero) invisible = true;
	const { badgeContent, max = maxProp } = invisible ? prevProps : parameters;
	const displayValue = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;
	return {
		badgeContent,
		invisible,
		max,
		displayValue
	};
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Badge/badgeClasses.js
function getBadgeUtilityClass(slot) {
	return generateUtilityClass("MuiBadge", slot);
}
var badgeClasses = generateUtilityClasses("MuiBadge", [
	"root",
	"badge",
	"dot",
	"standard",
	"anchorOriginTopRight",
	"anchorOriginBottomRight",
	"anchorOriginTopLeft",
	"anchorOriginBottomLeft",
	"invisible",
	"colorError",
	"colorInfo",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorWarning",
	"overlapRectangular",
	"overlapCircular",
	"anchorOriginTopLeftCircular",
	"anchorOriginTopLeftRectangular",
	"anchorOriginTopRightCircular",
	"anchorOriginTopRightRectangular",
	"anchorOriginBottomLeftCircular",
	"anchorOriginBottomLeftRectangular",
	"anchorOriginBottomRightCircular",
	"anchorOriginBottomRightRectangular"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Badge/Badge.js
var RADIUS_STANDARD = 10;
var RADIUS_DOT = 4;
var useUtilityClasses$49 = (ownerState) => {
	const { color, anchorOrigin, invisible, overlap, variant, classes = {} } = ownerState;
	return composeClasses({
		root: ["root"],
		badge: [
			"badge",
			variant,
			invisible && "invisible",
			`anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}`,
			`anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}${capitalize_default(overlap)}`,
			`overlap${capitalize_default(overlap)}`,
			color !== "default" && `color${capitalize_default(color)}`
		]
	}, getBadgeUtilityClass, classes);
};
var BadgeRoot = styled$2("span", {
	name: "MuiBadge",
	slot: "Root"
})({
	position: "relative",
	display: "inline-flex",
	verticalAlign: "middle",
	flexShrink: 0
});
var BadgeBadge = styled$2("span", {
	name: "MuiBadge",
	slot: "Badge",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.badge,
			styles[ownerState.variant],
			styles[`anchorOrigin${capitalize_default(ownerState.anchorOrigin.vertical)}${capitalize_default(ownerState.anchorOrigin.horizontal)}${capitalize_default(ownerState.overlap)}`],
			ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`],
			ownerState.invisible && styles.invisible
		];
	}
})(memoTheme(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	justifyContent: "center",
	alignContent: "center",
	alignItems: "center",
	position: "absolute",
	boxSizing: "border-box",
	fontFamily: theme.typography.fontFamily,
	fontWeight: theme.typography.fontWeightMedium,
	fontSize: theme.typography.pxToRem(12),
	minWidth: RADIUS_STANDARD * 2,
	lineHeight: 1,
	padding: "0 6px",
	height: RADIUS_STANDARD * 2,
	borderRadius: RADIUS_STANDARD,
	zIndex: 1,
	transition: theme.transitions.create("transform", {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.enteringScreen
	}),
	variants: [
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["contrastText"])).map(([color]) => ({
			props: { color },
			style: {
				backgroundColor: (theme.vars || theme).palette[color].main,
				color: (theme.vars || theme).palette[color].contrastText
			}
		})),
		{
			props: { variant: "dot" },
			style: {
				borderRadius: RADIUS_DOT,
				height: RADIUS_DOT * 2,
				minWidth: RADIUS_DOT * 2,
				padding: 0
			}
		},
		{
			props: { invisible: true },
			style: { transition: theme.transitions.create("transform", {
				easing: theme.transitions.easing.easeInOut,
				duration: theme.transitions.duration.leavingScreen
			}) }
		},
		{ style: ({ ownerState }) => {
			const { vertical, horizontal } = ownerState.anchorOrigin;
			const offset = ownerState.overlap === "circular" ? "14%" : 0;
			return {
				"--Badge-translateX": horizontal === "right" ? "50%" : "-50%",
				"--Badge-translateY": vertical === "top" ? "-50%" : "50%",
				top: vertical === "top" ? offset : "initial",
				bottom: vertical === "bottom" ? offset : "initial",
				right: horizontal === "right" ? offset : "initial",
				left: horizontal === "left" ? offset : "initial",
				transform: "scale(1) translate(var(--Badge-translateX), var(--Badge-translateY))",
				transformOrigin: `${horizontal === "right" ? "100%" : "0%"} ${vertical === "top" ? "0%" : "100%"}`,
				[`&.${badgeClasses.invisible}`]: { transform: "scale(0) translate(var(--Badge-translateX), var(--Badge-translateY))" }
			};
		} }
	]
})));
function getAnchorOrigin(anchorOrigin) {
	return {
		vertical: anchorOrigin?.vertical ?? "top",
		horizontal: anchorOrigin?.horizontal ?? "right"
	};
}
var Badge = /* @__PURE__ */ import_react.forwardRef(function Badge(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiBadge"
	});
	const { anchorOrigin: anchorOriginProp, className, classes: classesProp, component, components = {}, componentsProps = {}, children, overlap: overlapProp = "rectangular", color: colorProp = "default", invisible: invisibleProp = false, max: maxProp = 99, badgeContent: badgeContentProp, slots, slotProps, showZero = false, variant: variantProp = "standard", ...other } = props;
	const { badgeContent, invisible: invisibleFromHook, max, displayValue: displayValueFromHook } = useBadge({
		max: maxProp,
		invisible: invisibleProp,
		badgeContent: badgeContentProp,
		showZero
	});
	const prevProps = usePreviousProps({
		anchorOrigin: getAnchorOrigin(anchorOriginProp),
		color: colorProp,
		overlap: overlapProp,
		variant: variantProp,
		badgeContent: badgeContentProp
	});
	const invisible = invisibleFromHook || badgeContent == null && variantProp !== "dot";
	const { color = colorProp, overlap = overlapProp, anchorOrigin: anchorOriginPropProp, variant = variantProp } = invisible ? prevProps : props;
	const anchorOrigin = getAnchorOrigin(anchorOriginPropProp);
	const displayValue = variant !== "dot" ? displayValueFromHook : void 0;
	const ownerState = {
		...props,
		badgeContent,
		invisible,
		max,
		displayValue,
		showZero,
		anchorOrigin,
		color,
		overlap,
		variant
	};
	const classes = useUtilityClasses$49(ownerState);
	const externalForwardedProps = {
		slots: {
			root: slots?.root ?? components.Root,
			badge: slots?.badge ?? components.Badge
		},
		slotProps: {
			root: slotProps?.root ?? componentsProps.root,
			badge: slotProps?.badge ?? componentsProps.badge
		}
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: BadgeRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		className: clsx(classes.root, className),
		ref,
		additionalProps: { as: component }
	});
	const [BadgeSlot, badgeProps] = useSlot("badge", {
		elementType: BadgeBadge,
		externalForwardedProps,
		ownerState,
		className: classes.badge
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootProps,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeSlot, {
			...badgeProps,
			children: displayValue
		})]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Box/boxClasses.js
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Box/Box.js
var Box = createBox({
	themeId: identifier_default,
	defaultTheme: createTheme$1(),
	defaultClassName: boxClasses.root,
	generateClassName: ClassNameGenerator.generate
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
	return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", [
	"root",
	"text",
	"textInherit",
	"textPrimary",
	"textSecondary",
	"textSuccess",
	"textError",
	"textInfo",
	"textWarning",
	"outlined",
	"outlinedInherit",
	"outlinedPrimary",
	"outlinedSecondary",
	"outlinedSuccess",
	"outlinedError",
	"outlinedInfo",
	"outlinedWarning",
	"contained",
	"containedInherit",
	"containedPrimary",
	"containedSecondary",
	"containedSuccess",
	"containedError",
	"containedInfo",
	"containedWarning",
	"disableElevation",
	"focusVisible",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorError",
	"colorInfo",
	"colorWarning",
	"textSizeSmall",
	"textSizeMedium",
	"textSizeLarge",
	"outlinedSizeSmall",
	"outlinedSizeMedium",
	"outlinedSizeLarge",
	"containedSizeSmall",
	"containedSizeMedium",
	"containedSizeLarge",
	"sizeMedium",
	"sizeSmall",
	"sizeLarge",
	"fullWidth",
	"startIcon",
	"endIcon",
	"icon",
	"iconSizeSmall",
	"iconSizeMedium",
	"iconSizeLarge",
	"loading",
	"loadingWrapper",
	"loadingIconPlaceholder",
	"loadingIndicator",
	"loadingPositionCenter",
	"loadingPositionStart",
	"loadingPositionEnd"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ButtonGroup/ButtonGroupContext.js
/**
* @ignore - internal component.
*/
var ButtonGroupContext = /* @__PURE__ */ import_react.createContext({});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ButtonGroup/ButtonGroupButtonContext.js
/**
* @ignore - internal component.
*/
var ButtonGroupButtonContext = /* @__PURE__ */ import_react.createContext(void 0);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Button/Button.js
var useUtilityClasses$48 = (ownerState) => {
	const { color, disableElevation, fullWidth, size, variant, loading, loadingPosition, classes } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			loading && "loading",
			variant,
			`${variant}${capitalize_default(color)}`,
			`size${capitalize_default(size)}`,
			`${variant}Size${capitalize_default(size)}`,
			`color${capitalize_default(color)}`,
			disableElevation && "disableElevation",
			fullWidth && "fullWidth",
			loading && `loadingPosition${capitalize_default(loadingPosition)}`
		],
		startIcon: [
			"icon",
			"startIcon",
			`iconSize${capitalize_default(size)}`
		],
		endIcon: [
			"icon",
			"endIcon",
			`iconSize${capitalize_default(size)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, getButtonUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var commonIconStyles = [
	{
		props: { size: "small" },
		style: { "& > *:nth-of-type(1)": { fontSize: 18 } }
	},
	{
		props: { size: "medium" },
		style: { "& > *:nth-of-type(1)": { fontSize: 20 } }
	},
	{
		props: { size: "large" },
		style: { "& > *:nth-of-type(1)": { fontSize: 22 } }
	}
];
var ButtonRoot = styled$2(ButtonBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`${ownerState.variant}${capitalize_default(ownerState.color)}`],
			styles[`size${capitalize_default(ownerState.size)}`],
			styles[`${ownerState.variant}Size${capitalize_default(ownerState.size)}`],
			ownerState.color === "inherit" && styles.colorInherit,
			ownerState.disableElevation && styles.disableElevation,
			ownerState.fullWidth && styles.fullWidth,
			ownerState.loading && styles.loading
		];
	}
})(memoTheme(({ theme }) => {
	const inheritContainedBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
	const inheritContainedHoverBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey.A100 : theme.palette.grey[700];
	return {
		...theme.typography.button,
		minWidth: 64,
		padding: "6px 16px",
		border: 0,
		borderRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create([
			"background-color",
			"box-shadow",
			"border-color",
			"color"
		], { duration: theme.transitions.duration.short }),
		"&:hover": { textDecoration: "none" },
		[`&.${buttonClasses.disabled}`]: { color: (theme.vars || theme).palette.action.disabled },
		variants: [
			{
				props: { variant: "contained" },
				style: {
					color: `var(--variant-containedColor)`,
					backgroundColor: `var(--variant-containedBg)`,
					boxShadow: (theme.vars || theme).shadows[2],
					"&:hover": {
						boxShadow: (theme.vars || theme).shadows[4],
						"@media (hover: none)": { boxShadow: (theme.vars || theme).shadows[2] }
					},
					"&:active": { boxShadow: (theme.vars || theme).shadows[8] },
					[`&.${buttonClasses.focusVisible}`]: { boxShadow: (theme.vars || theme).shadows[6] },
					[`&.${buttonClasses.disabled}`]: {
						color: (theme.vars || theme).palette.action.disabled,
						boxShadow: (theme.vars || theme).shadows[0],
						backgroundColor: (theme.vars || theme).palette.action.disabledBackground
					}
				}
			},
			{
				props: { variant: "outlined" },
				style: {
					padding: "5px 15px",
					border: "1px solid currentColor",
					borderColor: `var(--variant-outlinedBorder, currentColor)`,
					backgroundColor: `var(--variant-outlinedBg)`,
					color: `var(--variant-outlinedColor)`,
					[`&.${buttonClasses.disabled}`]: { border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}` }
				}
			},
			{
				props: { variant: "text" },
				style: {
					padding: "6px 8px",
					color: `var(--variant-textColor)`,
					backgroundColor: `var(--variant-textBg)`
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: { color },
				style: {
					"--variant-textColor": (theme.vars || theme).palette[color].main,
					"--variant-outlinedColor": (theme.vars || theme).palette[color].main,
					"--variant-outlinedBorder": theme.alpha((theme.vars || theme).palette[color].main, .5),
					"--variant-containedColor": (theme.vars || theme).palette[color].contrastText,
					"--variant-containedBg": (theme.vars || theme).palette[color].main,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": (theme.vars || theme).palette[color].dark,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBorder": (theme.vars || theme).palette[color].main,
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			})),
			{
				props: { color: "inherit" },
				style: {
					color: "inherit",
					borderColor: "currentColor",
					"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			},
			{
				props: {
					size: "small",
					variant: "text"
				},
				style: {
					padding: "4px 5px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "text"
				},
				style: {
					padding: "8px 11px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "outlined"
				},
				style: {
					padding: "3px 9px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "outlined"
				},
				style: {
					padding: "7px 21px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "contained"
				},
				style: {
					padding: "4px 10px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "contained"
				},
				style: {
					padding: "8px 22px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: { disableElevation: true },
				style: {
					boxShadow: "none",
					"&:hover": { boxShadow: "none" },
					[`&.${buttonClasses.focusVisible}`]: { boxShadow: "none" },
					"&:active": { boxShadow: "none" },
					[`&.${buttonClasses.disabled}`]: { boxShadow: "none" }
				}
			},
			{
				props: { fullWidth: true },
				style: { width: "100%" }
			},
			{
				props: { loadingPosition: "center" },
				style: {
					transition: theme.transitions.create([
						"background-color",
						"box-shadow",
						"border-color"
					], { duration: theme.transitions.duration.short }),
					[`&.${buttonClasses.loading}`]: { color: "transparent" }
				}
			}
		]
	};
}));
var ButtonStartIcon = styled$2("span", {
	name: "MuiButton",
	slot: "StartIcon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.startIcon,
			ownerState.loading && styles.startIconLoadingStart,
			styles[`iconSize${capitalize_default(ownerState.size)}`]
		];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: 8,
	marginLeft: -4,
	variants: [
		{
			props: { size: "small" },
			style: { marginLeft: -2 }
		},
		{
			props: {
				loadingPosition: "start",
				loading: true
			},
			style: {
				transition: theme.transitions.create(["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "start",
				loading: true,
				fullWidth: true
			},
			style: { marginRight: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonEndIcon = styled$2("span", {
	name: "MuiButton",
	slot: "EndIcon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.endIcon,
			ownerState.loading && styles.endIconLoadingEnd,
			styles[`iconSize${capitalize_default(ownerState.size)}`]
		];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: -4,
	marginLeft: 8,
	variants: [
		{
			props: { size: "small" },
			style: { marginRight: -2 }
		},
		{
			props: {
				loadingPosition: "end",
				loading: true
			},
			style: {
				transition: theme.transitions.create(["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "end",
				loading: true,
				fullWidth: true
			},
			style: { marginLeft: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonLoadingIndicator = styled$2("span", {
	name: "MuiButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	variants: [
		{
			props: { loading: true },
			style: { display: "flex" }
		},
		{
			props: { loadingPosition: "start" },
			style: { left: 14 }
		},
		{
			props: {
				loadingPosition: "start",
				size: "small"
			},
			style: { left: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "start"
			},
			style: { left: 6 }
		},
		{
			props: { loadingPosition: "center" },
			style: {
				left: "50%",
				transform: "translate(-50%)",
				color: (theme.vars || theme).palette.action.disabled
			}
		},
		{
			props: { loadingPosition: "end" },
			style: { right: 14 }
		},
		{
			props: {
				loadingPosition: "end",
				size: "small"
			},
			style: { right: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "end"
			},
			style: { right: 6 }
		},
		{
			props: {
				loadingPosition: "start",
				fullWidth: true
			},
			style: {
				position: "relative",
				left: -10
			}
		},
		{
			props: {
				loadingPosition: "end",
				fullWidth: true
			},
			style: {
				position: "relative",
				right: -10
			}
		}
	]
}));
var ButtonLoadingIconPlaceholder = styled$2("span", {
	name: "MuiButton",
	slot: "LoadingIconPlaceholder"
})({
	display: "inline-block",
	width: "1em",
	height: "1em"
});
var Button = /* @__PURE__ */ import_react.forwardRef(function Button(inProps, ref) {
	const contextProps = import_react.useContext(ButtonGroupContext);
	const buttonGroupButtonContextPositionClassName = import_react.useContext(ButtonGroupButtonContext);
	const props = useDefaultProps({
		props: resolveProps(contextProps, inProps),
		name: "MuiButton"
	});
	const { children, color = "primary", component = "button", className, disabled = false, disableElevation = false, disableFocusRipple = false, endIcon: endIconProp, focusVisibleClassName, fullWidth = false, id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, loadingPosition = "center", size = "medium", startIcon: startIconProp, type, variant = "text", ...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		color,
		component,
		disabled,
		disableElevation,
		disableFocusRipple,
		fullWidth,
		loading,
		loadingIndicator,
		loadingPosition,
		size,
		type,
		variant
	};
	const classes = useUtilityClasses$48(ownerState);
	const startIcon = (startIconProp || loading && loadingPosition === "start") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonStartIcon, {
		className: classes.startIcon,
		ownerState,
		children: startIconProp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const endIcon = (endIconProp || loading && loadingPosition === "end") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonEndIcon, {
		className: classes.endIcon,
		ownerState,
		children: endIconProp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const positionClassName = buttonGroupButtonContextPositionClassName || "";
	const loader = typeof loading === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: classes.loadingWrapper,
		style: { display: "contents" },
		children: loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIndicator, {
			className: classes.loadingIndicator,
			ownerState,
			children: loadingIndicator
		})
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonRoot, {
		ownerState,
		className: clsx(contextProps.className, classes.root, className, positionClassName),
		component,
		disabled: disabled || loading,
		focusRipple: !disableFocusRipple,
		focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
		ref,
		type,
		id: loading ? loadingId : idProp,
		...other,
		classes,
		children: [
			startIcon,
			loadingPosition !== "end" && loader,
			children,
			loadingPosition === "end" && loader,
			endIcon
		]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Card/cardClasses.js
function getCardUtilityClass(slot) {
	return generateUtilityClass("MuiCard", slot);
}
generateUtilityClasses("MuiCard", ["root"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Card/Card.js
var useUtilityClasses$47 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getCardUtilityClass, classes);
};
var CardRoot = styled$2(Paper, {
	name: "MuiCard",
	slot: "Root"
})({ overflow: "hidden" });
var Card = /* @__PURE__ */ import_react.forwardRef(function Card(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCard"
	});
	const { className, raised = false, ...other } = props;
	const ownerState = {
		...props,
		raised
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardRoot, {
		className: clsx(useUtilityClasses$47(ownerState).root, className),
		elevation: raised ? 8 : void 0,
		ref,
		ownerState,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CardActions/cardActionsClasses.js
function getCardActionsUtilityClass(slot) {
	return generateUtilityClass("MuiCardActions", slot);
}
generateUtilityClasses("MuiCardActions", ["root", "spacing"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CardActions/CardActions.js
var useUtilityClasses$46 = (ownerState) => {
	const { classes, disableSpacing } = ownerState;
	return composeClasses({ root: ["root", !disableSpacing && "spacing"] }, getCardActionsUtilityClass, classes);
};
var CardActionsRoot = styled$2("div", {
	name: "MuiCardActions",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, !ownerState.disableSpacing && styles.spacing];
	}
})({
	display: "flex",
	alignItems: "center",
	padding: 8,
	variants: [{
		props: { disableSpacing: false },
		style: { "& > :not(style) ~ :not(style)": { marginLeft: 8 } }
	}]
});
var CardActions = /* @__PURE__ */ import_react.forwardRef(function CardActions(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCardActions"
	});
	const { disableSpacing = false, className, ...other } = props;
	const ownerState = {
		...props,
		disableSpacing
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardActionsRoot, {
		className: clsx(useUtilityClasses$46(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CardContent/cardContentClasses.js
function getCardContentUtilityClass(slot) {
	return generateUtilityClass("MuiCardContent", slot);
}
generateUtilityClasses("MuiCardContent", ["root"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CardContent/CardContent.js
var useUtilityClasses$45 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getCardContentUtilityClass, classes);
};
var CardContentRoot = styled$2("div", {
	name: "MuiCardContent",
	slot: "Root"
})({
	padding: 16,
	"&:last-child": { paddingBottom: 24 }
});
var CardContent = /* @__PURE__ */ import_react.forwardRef(function CardContent(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCardContent"
	});
	const { className, component = "div", ...other } = props;
	const ownerState = {
		...props,
		component
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContentRoot, {
		as: component,
		className: clsx(useUtilityClasses$45(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CardHeader/cardHeaderClasses.js
function getCardHeaderUtilityClass(slot) {
	return generateUtilityClass("MuiCardHeader", slot);
}
var cardHeaderClasses = generateUtilityClasses("MuiCardHeader", [
	"root",
	"avatar",
	"action",
	"content",
	"title",
	"subheader"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CardHeader/CardHeader.js
var useUtilityClasses$44 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({
		root: ["root"],
		avatar: ["avatar"],
		action: ["action"],
		content: ["content"],
		title: ["title"],
		subheader: ["subheader"]
	}, getCardHeaderUtilityClass, classes);
};
var CardHeaderRoot = styled$2("div", {
	name: "MuiCardHeader",
	slot: "Root",
	overridesResolver: (props, styles) => {
		return [
			{ [`& .${cardHeaderClasses.title}`]: styles.title },
			{ [`& .${cardHeaderClasses.subheader}`]: styles.subheader },
			styles.root
		];
	}
})({
	display: "flex",
	alignItems: "center",
	padding: 16
});
var CardHeaderAvatar = styled$2("div", {
	name: "MuiCardHeader",
	slot: "Avatar"
})({
	display: "flex",
	flex: "0 0 auto",
	marginRight: 16
});
var CardHeaderAction = styled$2("div", {
	name: "MuiCardHeader",
	slot: "Action"
})({
	flex: "0 0 auto",
	alignSelf: "flex-start",
	marginTop: -4,
	marginRight: -8,
	marginBottom: -4
});
var CardHeaderContent = styled$2("div", {
	name: "MuiCardHeader",
	slot: "Content"
})({
	flex: "1 1 auto",
	[`.${typographyClasses.root}:where(& .${cardHeaderClasses.title})`]: { display: "block" },
	[`.${typographyClasses.root}:where(& .${cardHeaderClasses.subheader})`]: { display: "block" }
});
var CardHeader = /* @__PURE__ */ import_react.forwardRef(function CardHeader(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCardHeader"
	});
	const { action, avatar, component = "div", disableTypography = false, subheader: subheaderProp, subheaderTypographyProps, title: titleProp, titleTypographyProps, slots = {}, slotProps = {}, ...other } = props;
	const ownerState = {
		...props,
		component,
		disableTypography
	};
	const classes = useUtilityClasses$44(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps: {
			title: titleTypographyProps,
			subheader: subheaderTypographyProps,
			...slotProps
		}
	};
	let title = titleProp;
	const [TitleSlot, titleSlotProps] = useSlot("title", {
		className: classes.title,
		elementType: Typography,
		externalForwardedProps,
		ownerState,
		additionalProps: {
			variant: avatar ? "body2" : "h5",
			component: "span"
		}
	});
	if (title != null && title.type !== Typography && !disableTypography) title = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleSlot, {
		...titleSlotProps,
		children: title
	});
	let subheader = subheaderProp;
	const [SubheaderSlot, subheaderSlotProps] = useSlot("subheader", {
		className: classes.subheader,
		elementType: Typography,
		externalForwardedProps,
		ownerState,
		additionalProps: {
			variant: avatar ? "body2" : "body1",
			color: "textSecondary",
			component: "span"
		}
	});
	if (subheader != null && subheader.type !== Typography && !disableTypography) subheader = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubheaderSlot, {
		...subheaderSlotProps,
		children: subheader
	});
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		className: classes.root,
		elementType: CardHeaderRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			component
		},
		ownerState
	});
	const [AvatarSlot, avatarSlotProps] = useSlot("avatar", {
		className: classes.avatar,
		elementType: CardHeaderAvatar,
		externalForwardedProps,
		ownerState
	});
	const [ContentSlot, contentSlotProps] = useSlot("content", {
		className: classes.content,
		elementType: CardHeaderContent,
		externalForwardedProps,
		ownerState
	});
	const [ActionSlot, actionSlotProps] = useSlot("action", {
		className: classes.action,
		elementType: CardHeaderAction,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [
			avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarSlot, {
				...avatarSlotProps,
				children: avatar
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContentSlot, {
				...contentSlotProps,
				children: [title, subheader]
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionSlot, {
				...actionSlotProps,
				children: action
			})
		]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/switchBaseClasses.js
function getSwitchBaseUtilityClass(slot) {
	return generateUtilityClass("PrivateSwitchBase", slot);
}
generateUtilityClasses("PrivateSwitchBase", [
	"root",
	"checked",
	"disabled",
	"input",
	"edgeStart",
	"edgeEnd"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/SwitchBase.js
var useUtilityClasses$43 = (ownerState) => {
	const { classes, checked, disabled, edge } = ownerState;
	return composeClasses({
		root: [
			"root",
			checked && "checked",
			disabled && "disabled",
			edge && `edge${capitalize_default(edge)}`
		],
		input: ["input"]
	}, getSwitchBaseUtilityClass, classes);
};
var SwitchBaseRoot = styled$2(ButtonBase, { name: "MuiSwitchBase" })({
	padding: 9,
	borderRadius: "50%",
	variants: [
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: ({ edge, ownerState }) => edge === "start" && ownerState.size !== "small",
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		},
		{
			props: ({ edge, ownerState }) => edge === "end" && ownerState.size !== "small",
			style: { marginRight: -12 }
		}
	]
});
var SwitchBaseInput = styled$2("input", {
	name: "MuiSwitchBase",
	shouldForwardProp: rootShouldForwardProp
})({
	cursor: "inherit",
	position: "absolute",
	opacity: 0,
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	margin: 0,
	padding: 0,
	zIndex: 1
});
/**
* @ignore - internal component.
*/
var SwitchBase = /* @__PURE__ */ import_react.forwardRef(function SwitchBase(props, ref) {
	const { autoFocus, checked: checkedProp, checkedIcon, defaultChecked, disabled: disabledProp, disableFocusRipple = false, edge = false, icon, id, inputProps, inputRef, name, onBlur, onChange, onFocus, readOnly, required = false, tabIndex, type, value, slots = {}, slotProps = {}, ...other } = props;
	const [checked, setCheckedState] = useControlled_default({
		controlled: checkedProp,
		default: Boolean(defaultChecked),
		name: "SwitchBase",
		state: "checked"
	});
	const muiFormControl = useFormControl();
	const handleFocus = (event) => {
		if (onFocus) onFocus(event);
		if (muiFormControl && muiFormControl.onFocus) muiFormControl.onFocus(event);
	};
	const handleBlur = (event) => {
		if (onBlur) onBlur(event);
		if (muiFormControl && muiFormControl.onBlur) muiFormControl.onBlur(event);
	};
	const handleInputChange = (event) => {
		if (event.nativeEvent.defaultPrevented || readOnly) return;
		const newChecked = event.target.checked;
		setCheckedState(newChecked);
		if (onChange) onChange(event, newChecked);
	};
	let disabled = disabledProp;
	if (muiFormControl) {
		if (typeof disabled === "undefined") disabled = muiFormControl.disabled;
	}
	const hasLabelFor = type === "checkbox" || type === "radio";
	const ownerState = {
		...props,
		checked,
		disabled,
		disableFocusRipple,
		edge
	};
	const classes = useUtilityClasses$43(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps: {
			input: inputProps,
			...slotProps
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		elementType: SwitchBaseRoot,
		className: classes.root,
		shouldForwardComponentProp: true,
		externalForwardedProps: {
			...externalForwardedProps,
			component: "span",
			...other
		},
		getSlotProps: (handlers) => ({
			...handlers,
			onFocus: (event) => {
				handlers.onFocus?.(event);
				handleFocus(event);
			},
			onBlur: (event) => {
				handlers.onBlur?.(event);
				handleBlur(event);
			}
		}),
		ownerState,
		additionalProps: {
			centerRipple: true,
			focusRipple: !disableFocusRipple,
			role: void 0,
			tabIndex: null
		}
	});
	const [InputSlot, inputSlotProps] = useSlot("input", {
		ref: inputRef,
		elementType: SwitchBaseInput,
		className: classes.input,
		externalForwardedProps,
		getSlotProps: (handlers) => ({
			...handlers,
			onChange: (event) => {
				handlers.onChange?.(event);
				handleInputChange(event);
			}
		}),
		ownerState,
		additionalProps: {
			autoFocus,
			checked: checkedProp,
			defaultChecked,
			disabled,
			id: hasLabelFor ? id : void 0,
			name,
			readOnly,
			required,
			tabIndex,
			type,
			...type === "checkbox" && value === void 0 ? {} : { value }
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputSlot, { ...inputSlotProps }), checked ? checkedIcon : icon]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/CheckBoxOutlineBlank.js
/**
* @ignore - internal component.
*/
var CheckBoxOutlineBlank_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }), "CheckBoxOutlineBlank");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/CheckBox.js
/**
* @ignore - internal component.
*/
var CheckBox_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }), "CheckBox");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/IndeterminateCheckBox.js
/**
* @ignore - internal component.
*/
var IndeterminateCheckBox_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" }), "IndeterminateCheckBox");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Checkbox/checkboxClasses.js
function getCheckboxUtilityClass(slot) {
	return generateUtilityClass("MuiCheckbox", slot);
}
var checkboxClasses = generateUtilityClasses("MuiCheckbox", [
	"root",
	"checked",
	"disabled",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"sizeSmall",
	"sizeMedium"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Checkbox/Checkbox.js
var useUtilityClasses$42 = (ownerState) => {
	const { classes, indeterminate, color, size } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		indeterminate && "indeterminate",
		`color${capitalize_default(color)}`,
		`size${capitalize_default(size)}`
	] }, getCheckboxUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var CheckboxRoot = styled$2(SwitchBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiCheckbox",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.indeterminate && styles.indeterminate,
			styles[`size${capitalize_default(ownerState.size)}`],
			ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	color: (theme.vars || theme).palette.text.secondary,
	variants: [
		{
			props: {
				color: "default",
				disableRipple: false
			},
			style: { "&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity) } }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: {
				color,
				disableRipple: false
			},
			style: { "&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity) } }
		})),
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: {
				[`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: { color: (theme.vars || theme).palette[color].main },
				[`&.${checkboxClasses.disabled}`]: { color: (theme.vars || theme).palette.action.disabled }
			}
		})),
		{
			props: { disableRipple: false },
			style: { "&:hover": { "@media (hover: none)": { backgroundColor: "transparent" } } }
		}
	]
})));
var defaultCheckedIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckBox_default, {});
var defaultIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckBoxOutlineBlank_default, {});
var defaultIndeterminateIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndeterminateCheckBox_default, {});
var Checkbox = /* @__PURE__ */ import_react.forwardRef(function Checkbox(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCheckbox"
	});
	const { checkedIcon = defaultCheckedIcon, color = "primary", icon: iconProp = defaultIcon, indeterminate = false, indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon, inputProps, size = "medium", disableRipple = false, className, slots = {}, slotProps = {}, ...other } = props;
	const icon = indeterminate ? indeterminateIconProp : iconProp;
	const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
	const ownerState = {
		...props,
		disableRipple,
		color,
		indeterminate,
		size
	};
	const classes = useUtilityClasses$42(ownerState);
	const externalInputProps = slotProps.input ?? inputProps;
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		elementType: CheckboxRoot,
		className: clsx(classes.root, className),
		shouldForwardComponentProp: true,
		externalForwardedProps: {
			slots,
			slotProps,
			...other
		},
		ownerState,
		additionalProps: {
			type: "checkbox",
			icon: /* @__PURE__ */ import_react.cloneElement(icon, { fontSize: icon.props.fontSize ?? size }),
			checkedIcon: /* @__PURE__ */ import_react.cloneElement(indeterminateIcon, { fontSize: indeterminateIcon.props.fontSize ?? size }),
			disableRipple,
			slots,
			slotProps: { input: mergeSlotProps$1(typeof externalInputProps === "function" ? externalInputProps(ownerState) : externalInputProps, { "data-indeterminate": indeterminate }) }
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		...rootSlotProps,
		classes
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Container/Container.js
var Container = createContainer({
	createStyledComponent: styled$2("div", {
		name: "MuiContainer",
		slot: "Root",
		overridesResolver: (props, styles) => {
			const { ownerState } = props;
			return [
				styles.root,
				styles[`maxWidth${capitalize_default(String(ownerState.maxWidth))}`],
				ownerState.fixed && styles.fixed,
				ownerState.disableGutters && styles.disableGutters
			];
		}
	}),
	useThemeProps: (inProps) => useDefaultProps({
		props: inProps,
		name: "MuiContainer"
	})
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/CssBaseline/CssBaseline.js
var isDynamicSupport = typeof globalCss({}) === "function";
var html = (theme, enableColorScheme) => ({
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
	boxSizing: "border-box",
	WebkitTextSizeAdjust: "100%",
	...enableColorScheme && !theme.vars && { colorScheme: theme.palette.mode }
});
var body = (theme) => ({
	color: (theme.vars || theme).palette.text.primary,
	...theme.typography.body1,
	backgroundColor: (theme.vars || theme).palette.background.default,
	"@media print": { backgroundColor: (theme.vars || theme).palette.common.white }
});
var styles$3 = (theme, enableColorScheme = false) => {
	const colorSchemeStyles = {};
	if (enableColorScheme && theme.colorSchemes && typeof theme.getColorSchemeSelector === "function") Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
		const selector = theme.getColorSchemeSelector(key);
		if (selector.startsWith("@")) colorSchemeStyles[selector] = { ":root": { colorScheme: scheme.palette?.mode } };
		else colorSchemeStyles[selector.replace(/\s*&/, "")] = { colorScheme: scheme.palette?.mode };
	});
	let defaultStyles = {
		html: html(theme, enableColorScheme),
		"*, *::before, *::after": { boxSizing: "inherit" },
		"strong, b": { fontWeight: theme.typography.fontWeightBold },
		body: {
			margin: 0,
			...body(theme),
			"&::backdrop": { backgroundColor: (theme.vars || theme).palette.background.default }
		},
		...colorSchemeStyles
	};
	const themeOverrides = theme.components?.MuiCssBaseline?.styleOverrides;
	if (themeOverrides) defaultStyles = [defaultStyles, themeOverrides];
	return defaultStyles;
};
var SELECTOR = "mui-ecs";
var staticStyles = (theme) => {
	const result = styles$3(theme, false);
	const baseStyles = Array.isArray(result) ? result[0] : result;
	if (!theme.vars && baseStyles) baseStyles.html[`:root:has(${SELECTOR})`] = { colorScheme: theme.palette.mode };
	if (theme.colorSchemes) Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
		const selector = theme.getColorSchemeSelector(key);
		if (selector.startsWith("@")) baseStyles[selector] = { [`:root:not(:has(.${SELECTOR}))`]: { colorScheme: scheme.palette?.mode } };
		else baseStyles[selector.replace(/\s*&/, "")] = { [`&:not(:has(.${SELECTOR}))`]: { colorScheme: scheme.palette?.mode } };
	});
	return result;
};
var GlobalStyles = globalCss(isDynamicSupport ? ({ theme, enableColorScheme }) => styles$3(theme, enableColorScheme) : ({ theme }) => staticStyles(theme));
/**
* Kickstart an elegant, consistent, and simple baseline to build upon.
*/
function CssBaseline(inProps) {
	const { children, enableColorScheme = false } = useDefaultProps({
		props: inProps,
		name: "MuiCssBaseline"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		isDynamicSupport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles, { enableColorScheme }),
		!isDynamicSupport && !enableColorScheme && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: SELECTOR,
			style: { display: "none" }
		}),
		children
	] });
}
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js
function getScrollbarSize(win = window) {
	const documentWidth = win.document.documentElement.clientWidth;
	return win.innerWidth - documentWidth;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Modal/ModalManager.js
function isOverflowing(container) {
	const doc = ownerDocument(container);
	if (doc.body === container) return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
	return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, hide) {
	if (hide) element.setAttribute("aria-hidden", "true");
	else element.removeAttribute("aria-hidden");
}
function getPaddingRight(element) {
	return parseFloat(ownerWindow(element).getComputedStyle(element).paddingRight) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
	const isForbiddenTagName = [
		"TEMPLATE",
		"SCRIPT",
		"STYLE",
		"LINK",
		"MAP",
		"META",
		"NOSCRIPT",
		"PICTURE",
		"COL",
		"COLGROUP",
		"PARAM",
		"SLOT",
		"SOURCE",
		"TRACK"
	].includes(element.tagName);
	const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
	return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, hide) {
	const blacklist = [
		mountElement,
		currentElement,
		...elementsToExclude
	];
	[].forEach.call(container.children, (element) => {
		const isNotExcludedElement = !blacklist.includes(element);
		const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
		if (isNotExcludedElement && isNotForbiddenElement) ariaHidden(element, hide);
	});
}
function findIndexOf(items, callback) {
	let idx = -1;
	items.some((item, index) => {
		if (callback(item)) {
			idx = index;
			return true;
		}
		return false;
	});
	return idx;
}
function handleContainer(containerInfo, props) {
	const restoreStyle = [];
	const container = containerInfo.container;
	if (!props.disableScrollLock) {
		if (isOverflowing(container)) {
			const scrollbarSize = getScrollbarSize(ownerWindow(container));
			restoreStyle.push({
				value: container.style.paddingRight,
				property: "padding-right",
				el: container
			});
			container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
			const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
			[].forEach.call(fixedElements, (element) => {
				restoreStyle.push({
					value: element.style.paddingRight,
					property: "padding-right",
					el: element
				});
				element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
			});
		}
		let scrollContainer;
		if (container.parentNode instanceof DocumentFragment) scrollContainer = ownerDocument(container).body;
		else {
			const parent = container.parentElement;
			const containerWindow = ownerWindow(container);
			scrollContainer = parent?.nodeName === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
		}
		restoreStyle.push({
			value: scrollContainer.style.overflow,
			property: "overflow",
			el: scrollContainer
		}, {
			value: scrollContainer.style.overflowX,
			property: "overflow-x",
			el: scrollContainer
		}, {
			value: scrollContainer.style.overflowY,
			property: "overflow-y",
			el: scrollContainer
		});
		scrollContainer.style.overflow = "hidden";
	}
	const restore = () => {
		restoreStyle.forEach(({ value, el, property }) => {
			if (value) el.style.setProperty(property, value);
			else el.style.removeProperty(property);
		});
	};
	return restore;
}
function getHiddenSiblings(container) {
	const hiddenSiblings = [];
	[].forEach.call(container.children, (element) => {
		if (element.getAttribute("aria-hidden") === "true") hiddenSiblings.push(element);
	});
	return hiddenSiblings;
}
/**
* @ignore - do not document.
*
* Proper state management for containers and the modals in those containers.
* Simplified, but inspired by react-overlay's ModalManager class.
* Used by the Modal to ensure proper styling of containers.
*/
var ModalManager = class {
	constructor() {
		this.modals = [];
		this.containers = [];
	}
	add(modal, container) {
		let modalIndex = this.modals.indexOf(modal);
		if (modalIndex !== -1) return modalIndex;
		modalIndex = this.modals.length;
		this.modals.push(modal);
		if (modal.modalRef) ariaHidden(modal.modalRef, false);
		const hiddenSiblings = getHiddenSiblings(container);
		ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
		const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
		if (containerIndex !== -1) {
			this.containers[containerIndex].modals.push(modal);
			return modalIndex;
		}
		this.containers.push({
			modals: [modal],
			container,
			restore: null,
			hiddenSiblings
		});
		return modalIndex;
	}
	mount(modal, props) {
		const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
		const containerInfo = this.containers[containerIndex];
		if (!containerInfo.restore) containerInfo.restore = handleContainer(containerInfo, props);
	}
	remove(modal, ariaHiddenState = true) {
		const modalIndex = this.modals.indexOf(modal);
		if (modalIndex === -1) return modalIndex;
		const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
		const containerInfo = this.containers[containerIndex];
		containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
		this.modals.splice(modalIndex, 1);
		if (containerInfo.modals.length === 0) {
			if (containerInfo.restore) containerInfo.restore();
			if (modal.modalRef) ariaHidden(modal.modalRef, ariaHiddenState);
			ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
			this.containers.splice(containerIndex, 1);
		} else {
			const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
			if (nextTop.modalRef) ariaHidden(nextTop.modalRef, false);
		}
		return modalIndex;
	}
	isTopModal(modal) {
		return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
	}
};
//#endregion
//#region node_modules/.pnpm/@mui+utils@7.3.8_@types+react@19.2.14_react@19.2.0/node_modules/@mui/utils/esm/getActiveElement/getActiveElement.js
/**
* Gets the actual active element, traversing through shadow roots if necessary.
*
* When an element inside a shadow root has focus, `document.activeElement` returns
* the shadow host element. This function recursively traverses shadow roots to find
* the actual focused element.
*
* @param root - The document or shadow root to start the search from.
* @returns The actual focused element, or null if no element has focus.
*
* @example
* // In a shadow DOM context
* const activeElement = getActiveElement(document);
* // Returns the actual focused element inside the shadow root
*
* @example
* // Starting from a specific document
* const activeElement = getActiveElement(ownerDocument(element));
*/
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/getActiveElement.js
var getActiveElement_default = activeElement;
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Unstable_TrapFocus/FocusTrap.js
var candidatesSelector = [
	"input",
	"select",
	"textarea",
	"a[href]",
	"button",
	"[tabindex]",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable=\"false\"])"
].join(",");
function getTabIndex(node) {
	const tabindexAttr = parseInt(node.getAttribute("tabindex") || "", 10);
	if (!Number.isNaN(tabindexAttr)) return tabindexAttr;
	if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) return 0;
	return node.tabIndex;
}
function isNonTabbableRadio(node) {
	if (node.tagName !== "INPUT" || node.type !== "radio") return false;
	if (!node.name) return false;
	const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
	let roving = getRadio(`[name="${node.name}"]:checked`);
	if (!roving) roving = getRadio(`[name="${node.name}"]`);
	return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
	if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) return false;
	return true;
}
function defaultGetTabbable(root) {
	const regularTabNodes = [];
	const orderedTabNodes = [];
	Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
		const nodeTabIndex = getTabIndex(node);
		if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) return;
		if (nodeTabIndex === 0) regularTabNodes.push(node);
		else orderedTabNodes.push({
			documentOrder: i,
			tabIndex: nodeTabIndex,
			node
		});
	});
	return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
	return true;
}
/**
* @ignore - internal component.
*/
function FocusTrap(props) {
	const { children, disableAutoFocus = false, disableEnforceFocus = false, disableRestoreFocus = false, getTabbable = defaultGetTabbable, isEnabled = defaultIsEnabled, open } = props;
	const ignoreNextEnforceFocus = import_react.useRef(false);
	const sentinelStart = import_react.useRef(null);
	const sentinelEnd = import_react.useRef(null);
	const nodeToRestore = import_react.useRef(null);
	const reactFocusEventTarget = import_react.useRef(null);
	const activated = import_react.useRef(false);
	const rootRef = import_react.useRef(null);
	const handleRef = useForkRef(getReactElementRef(children), rootRef);
	const lastKeydown = import_react.useRef(null);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		activated.current = !disableAutoFocus;
	}, [disableAutoFocus, open]);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		const activeElement = getActiveElement_default(ownerDocument(rootRef.current));
		if (!rootRef.current.contains(activeElement)) {
			if (!rootRef.current.hasAttribute("tabIndex")) rootRef.current.setAttribute("tabIndex", "-1");
			if (activated.current) rootRef.current.focus();
		}
		return () => {
			if (!disableRestoreFocus) {
				if (nodeToRestore.current && nodeToRestore.current.focus) {
					ignoreNextEnforceFocus.current = true;
					nodeToRestore.current.focus();
				}
				nodeToRestore.current = null;
			}
		};
	}, [open]);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		const doc = ownerDocument(rootRef.current);
		const loopFocus = (nativeEvent) => {
			lastKeydown.current = nativeEvent;
			if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") return;
			if (getActiveElement_default(doc) === rootRef.current && nativeEvent.shiftKey) {
				ignoreNextEnforceFocus.current = true;
				if (sentinelEnd.current) sentinelEnd.current.focus();
			}
		};
		const contain = () => {
			const rootElement = rootRef.current;
			if (rootElement === null) return;
			const activeEl = getActiveElement_default(doc);
			if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
				ignoreNextEnforceFocus.current = false;
				return;
			}
			if (rootElement.contains(activeEl)) return;
			if (disableEnforceFocus && activeEl !== sentinelStart.current && activeEl !== sentinelEnd.current) return;
			if (activeEl !== reactFocusEventTarget.current) reactFocusEventTarget.current = null;
			else if (reactFocusEventTarget.current !== null) return;
			if (!activated.current) return;
			let tabbable = [];
			if (activeEl === sentinelStart.current || activeEl === sentinelEnd.current) tabbable = getTabbable(rootRef.current);
			if (tabbable.length > 0) {
				const isShiftTab = Boolean(lastKeydown.current?.shiftKey && lastKeydown.current?.key === "Tab");
				const focusNext = tabbable[0];
				const focusPrevious = tabbable[tabbable.length - 1];
				if (typeof focusNext !== "string" && typeof focusPrevious !== "string") if (isShiftTab) focusPrevious.focus();
				else focusNext.focus();
			} else rootElement.focus();
		};
		doc.addEventListener("focusin", contain);
		doc.addEventListener("keydown", loopFocus, true);
		const interval = setInterval(() => {
			const activeEl = getActiveElement_default(doc);
			if (activeEl && activeEl.tagName === "BODY") contain();
		}, 50);
		return () => {
			clearInterval(interval);
			doc.removeEventListener("focusin", contain);
			doc.removeEventListener("keydown", loopFocus, true);
		};
	}, [
		disableAutoFocus,
		disableEnforceFocus,
		disableRestoreFocus,
		isEnabled,
		open,
		getTabbable
	]);
	const onFocus = (event) => {
		if (nodeToRestore.current === null) nodeToRestore.current = event.relatedTarget;
		activated.current = true;
		reactFocusEventTarget.current = event.target;
		const childrenPropsHandler = children.props.onFocus;
		if (childrenPropsHandler) childrenPropsHandler(event);
	};
	const handleFocusSentinel = (event) => {
		if (nodeToRestore.current === null) nodeToRestore.current = event.relatedTarget;
		activated.current = true;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: open ? 0 : -1,
			onFocus: handleFocusSentinel,
			ref: sentinelStart,
			"data-testid": "sentinelStart"
		}),
		/* @__PURE__ */ import_react.cloneElement(children, {
			ref: handleRef,
			onFocus
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: open ? 0 : -1,
			onFocus: handleFocusSentinel,
			ref: sentinelEnd,
			"data-testid": "sentinelEnd"
		})
	] });
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Modal/useModal.js
function getContainer(container) {
	return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
	return children ? children.props.hasOwnProperty("in") : false;
}
var noop = () => {};
var manager = new ModalManager();
function useModal(parameters) {
	const { container, disableEscapeKeyDown = false, disableScrollLock = false, closeAfterTransition = false, onTransitionEnter, onTransitionExited, children, onClose, open, rootRef } = parameters;
	const modal = import_react.useRef({});
	const mountNodeRef = import_react.useRef(null);
	const modalRef = import_react.useRef(null);
	const handleRef = useForkRef(modalRef, rootRef);
	const [exited, setExited] = import_react.useState(!open);
	const hasTransition = getHasTransition(children);
	let ariaHiddenProp = true;
	if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) ariaHiddenProp = false;
	const getDoc = () => ownerDocument(mountNodeRef.current);
	const getModal = () => {
		modal.current.modalRef = modalRef.current;
		modal.current.mount = mountNodeRef.current;
		return modal.current;
	};
	const handleMounted = () => {
		manager.mount(getModal(), { disableScrollLock });
		if (modalRef.current) modalRef.current.scrollTop = 0;
	};
	const handleOpen = useEventCallback(() => {
		const resolvedContainer = getContainer(container) || getDoc().body;
		manager.add(getModal(), resolvedContainer);
		if (modalRef.current) handleMounted();
	});
	const isTopModal = () => manager.isTopModal(getModal());
	const handlePortalRef = useEventCallback((node) => {
		mountNodeRef.current = node;
		if (!node) return;
		if (open && isTopModal()) handleMounted();
		else if (modalRef.current) ariaHidden(modalRef.current, ariaHiddenProp);
	});
	const handleClose = import_react.useCallback(() => {
		manager.remove(getModal(), ariaHiddenProp);
	}, [ariaHiddenProp]);
	import_react.useEffect(() => {
		return () => {
			handleClose();
		};
	}, [handleClose]);
	import_react.useEffect(() => {
		if (open) handleOpen();
		else if (!hasTransition || !closeAfterTransition) handleClose();
	}, [
		open,
		handleClose,
		hasTransition,
		closeAfterTransition,
		handleOpen
	]);
	const createHandleKeyDown = (otherHandlers) => (event) => {
		otherHandlers.onKeyDown?.(event);
		if (event.key !== "Escape" || event.which === 229 || !isTopModal()) return;
		if (!disableEscapeKeyDown) {
			event.stopPropagation();
			if (onClose) onClose(event, "escapeKeyDown");
		}
	};
	const createHandleBackdropClick = (otherHandlers) => (event) => {
		otherHandlers.onClick?.(event);
		if (event.target !== event.currentTarget) return;
		if (onClose) onClose(event, "backdropClick");
	};
	const getRootProps = (otherHandlers = {}) => {
		const propsEventHandlers = extractEventHandlers(parameters);
		delete propsEventHandlers.onTransitionEnter;
		delete propsEventHandlers.onTransitionExited;
		const externalEventHandlers = {
			...propsEventHandlers,
			...otherHandlers
		};
		return {
			role: "presentation",
			...externalEventHandlers,
			onKeyDown: createHandleKeyDown(externalEventHandlers),
			ref: handleRef
		};
	};
	const getBackdropProps = (otherHandlers = {}) => {
		const externalEventHandlers = otherHandlers;
		return {
			"aria-hidden": true,
			...externalEventHandlers,
			onClick: createHandleBackdropClick(externalEventHandlers),
			open
		};
	};
	const getTransitionProps = () => {
		const handleEnter = () => {
			setExited(false);
			if (onTransitionEnter) onTransitionEnter();
		};
		const handleExited = () => {
			setExited(true);
			if (onTransitionExited) onTransitionExited();
			if (closeAfterTransition) handleClose();
		};
		return {
			onEnter: createChainedFunction(handleEnter, children?.props.onEnter ?? noop),
			onExited: createChainedFunction(handleExited, children?.props.onExited ?? noop)
		};
	};
	return {
		getRootProps,
		getBackdropProps,
		getTransitionProps,
		rootRef: handleRef,
		portalRef: handlePortalRef,
		isTopModal,
		exited,
		hasTransition
	};
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Modal/modalClasses.js
function getModalUtilityClass(slot) {
	return generateUtilityClass("MuiModal", slot);
}
generateUtilityClasses("MuiModal", [
	"root",
	"hidden",
	"backdrop"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Modal/Modal.js
var useUtilityClasses$41 = (ownerState) => {
	const { open, exited, classes } = ownerState;
	return composeClasses({
		root: ["root", !open && exited && "hidden"],
		backdrop: ["backdrop"]
	}, getModalUtilityClass, classes);
};
var ModalRoot = styled$2("div", {
	name: "MuiModal",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, !ownerState.open && ownerState.exited && styles.hidden];
	}
})(memoTheme(({ theme }) => ({
	position: "fixed",
	zIndex: (theme.vars || theme).zIndex.modal,
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	variants: [{
		props: ({ ownerState }) => !ownerState.open && ownerState.exited,
		style: { visibility: "hidden" }
	}]
})));
var ModalBackdrop = styled$2(Backdrop, {
	name: "MuiModal",
	slot: "Backdrop"
})({ zIndex: -1 });
/**
* Modal is a lower-level construct that is leveraged by the following components:
*
* - [Dialog](/material-ui/api/dialog/)
* - [Drawer](/material-ui/api/drawer/)
* - [Menu](/material-ui/api/menu/)
* - [Popover](/material-ui/api/popover/)
*
* If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/api/dialog/) component
* rather than directly using Modal.
*
* This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
*/
var Modal = /* @__PURE__ */ import_react.forwardRef(function Modal(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiModal",
		props: inProps
	});
	const { BackdropComponent = ModalBackdrop, BackdropProps, classes: classesProp, className, closeAfterTransition = false, children, container, component, components = {}, componentsProps = {}, disableAutoFocus = false, disableEnforceFocus = false, disableEscapeKeyDown = false, disablePortal = false, disableRestoreFocus = false, disableScrollLock = false, hideBackdrop = false, keepMounted = false, onClose, onTransitionEnter, onTransitionExited, open, slotProps = {}, slots = {}, theme, ...other } = props;
	const propsWithDefaults = {
		...props,
		closeAfterTransition,
		disableAutoFocus,
		disableEnforceFocus,
		disableEscapeKeyDown,
		disablePortal,
		disableRestoreFocus,
		disableScrollLock,
		hideBackdrop,
		keepMounted
	};
	const { getRootProps, getBackdropProps, getTransitionProps, portalRef, isTopModal, exited, hasTransition } = useModal({
		...propsWithDefaults,
		rootRef: ref
	});
	const ownerState = {
		...propsWithDefaults,
		exited
	};
	const classes = useUtilityClasses$41(ownerState);
	const childProps = {};
	if (children.props.tabIndex === void 0) childProps.tabIndex = "-1";
	if (hasTransition) {
		const { onEnter, onExited } = getTransitionProps();
		childProps.onEnter = onEnter;
		childProps.onExited = onExited;
	}
	const externalForwardedProps = {
		slots: {
			root: components.Root,
			backdrop: components.Backdrop,
			...slots
		},
		slotProps: {
			...componentsProps,
			...slotProps
		}
	};
	const [RootSlot, rootProps] = useSlot("root", {
		ref,
		elementType: ModalRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			component
		},
		getSlotProps: getRootProps,
		ownerState,
		className: clsx(className, classes?.root, !ownerState.open && ownerState.exited && classes?.hidden)
	});
	const [BackdropSlot, backdropProps] = useSlot("backdrop", {
		ref: BackdropProps?.ref,
		elementType: BackdropComponent,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		additionalProps: BackdropProps,
		getSlotProps: (otherHandlers) => {
			return getBackdropProps({
				...otherHandlers,
				onClick: (event) => {
					if (otherHandlers?.onClick) otherHandlers.onClick(event);
				}
			});
		},
		className: clsx(BackdropProps?.className, classes?.backdrop),
		ownerState
	});
	if (!keepMounted && !open && (!hasTransition || exited)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		ref: portalRef,
		container,
		disablePortal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
			...rootProps,
			children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackdropSlot, { ...backdropProps }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTrap, {
				disableEnforceFocus,
				disableAutoFocus,
				disableRestoreFocus,
				isEnabled: isTopModal,
				open,
				children: /* @__PURE__ */ import_react.cloneElement(children, childProps)
			})]
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Dialog/dialogClasses.js
function getDialogUtilityClass(slot) {
	return generateUtilityClass("MuiDialog", slot);
}
var dialogClasses = generateUtilityClasses("MuiDialog", [
	"root",
	"backdrop",
	"scrollPaper",
	"scrollBody",
	"container",
	"paper",
	"paperScrollPaper",
	"paperScrollBody",
	"paperWidthFalse",
	"paperWidthXs",
	"paperWidthSm",
	"paperWidthMd",
	"paperWidthLg",
	"paperWidthXl",
	"paperFullWidth",
	"paperFullScreen"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Dialog/DialogContext.js
var DialogContext = /* @__PURE__ */ import_react.createContext({});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Dialog/Dialog.js
var DialogBackdrop = styled$2(Backdrop, {
	name: "MuiDialog",
	slot: "Backdrop"
})({ zIndex: -1 });
var useUtilityClasses$40 = (ownerState) => {
	const { classes, scroll, maxWidth, fullWidth, fullScreen } = ownerState;
	return composeClasses({
		root: ["root"],
		backdrop: ["backdrop"],
		container: ["container", `scroll${capitalize_default(scroll)}`],
		paper: [
			"paper",
			`paperScroll${capitalize_default(scroll)}`,
			`paperWidth${capitalize_default(String(maxWidth))}`,
			fullWidth && "paperFullWidth",
			fullScreen && "paperFullScreen"
		]
	}, getDialogUtilityClass, classes);
};
var DialogRoot = styled$2(Modal, {
	name: "MuiDialog",
	slot: "Root"
})({ "@media print": { position: "absolute !important" } });
var DialogContainer = styled$2("div", {
	name: "MuiDialog",
	slot: "Container",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.container, styles[`scroll${capitalize_default(ownerState.scroll)}`]];
	}
})({
	height: "100%",
	"@media print": { height: "auto" },
	outline: 0,
	variants: [{
		props: { scroll: "paper" },
		style: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		}
	}, {
		props: { scroll: "body" },
		style: {
			overflowY: "auto",
			overflowX: "hidden",
			textAlign: "center",
			"&::after": {
				content: "\"\"",
				display: "inline-block",
				verticalAlign: "middle",
				height: "100%",
				width: "0"
			}
		}
	}]
});
var DialogPaper = styled$2(Paper, {
	name: "MuiDialog",
	slot: "Paper",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.paper,
			styles[`scrollPaper${capitalize_default(ownerState.scroll)}`],
			styles[`paperWidth${capitalize_default(String(ownerState.maxWidth))}`],
			ownerState.fullWidth && styles.paperFullWidth,
			ownerState.fullScreen && styles.paperFullScreen
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 32,
	position: "relative",
	overflowY: "auto",
	"@media print": {
		overflowY: "visible",
		boxShadow: "none"
	},
	variants: [
		{
			props: { scroll: "paper" },
			style: {
				display: "flex",
				flexDirection: "column",
				maxHeight: "calc(100% - 64px)"
			}
		},
		{
			props: { scroll: "body" },
			style: {
				display: "inline-block",
				verticalAlign: "middle",
				textAlign: "initial"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.maxWidth,
			style: { maxWidth: "calc(100% - 64px)" }
		},
		{
			props: { maxWidth: "xs" },
			style: {
				maxWidth: theme.breakpoints.unit === "px" ? Math.max(theme.breakpoints.values.xs, 444) : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)`,
				[`&.${dialogClasses.paperScrollBody}`]: { [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 64)]: { maxWidth: "calc(100% - 64px)" } }
			}
		},
		...Object.keys(theme.breakpoints.values).filter((maxWidth) => maxWidth !== "xs").map((maxWidth) => ({
			props: { maxWidth },
			style: {
				maxWidth: `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit}`,
				[`&.${dialogClasses.paperScrollBody}`]: { [theme.breakpoints.down(theme.breakpoints.values[maxWidth] + 64)]: { maxWidth: "calc(100% - 64px)" } }
			}
		})),
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: { width: "calc(100% - 64px)" }
		},
		{
			props: ({ ownerState }) => ownerState.fullScreen,
			style: {
				margin: 0,
				width: "100%",
				maxWidth: "100%",
				height: "100%",
				maxHeight: "none",
				borderRadius: 0,
				[`&.${dialogClasses.paperScrollBody}`]: {
					margin: 0,
					maxWidth: "100%"
				}
			}
		}
	]
})));
/**
* Dialogs are overlaid modal paper based components with a backdrop.
*/
var Dialog = /* @__PURE__ */ import_react.forwardRef(function Dialog(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialog"
	});
	const theme = useTheme$3();
	const defaultTransitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { "aria-describedby": ariaDescribedby, "aria-labelledby": ariaLabelledbyProp, "aria-modal": ariaModal = true, BackdropComponent, BackdropProps, children, className, disableEscapeKeyDown = false, fullScreen = false, fullWidth = false, maxWidth = "sm", onClick, onClose, open, PaperComponent = Paper, PaperProps = {}, scroll = "paper", slots = {}, slotProps = {}, TransitionComponent = Fade, transitionDuration = defaultTransitionDuration, TransitionProps, ...other } = props;
	const ownerState = {
		...props,
		disableEscapeKeyDown,
		fullScreen,
		fullWidth,
		maxWidth,
		scroll
	};
	const classes = useUtilityClasses$40(ownerState);
	const backdropClick = import_react.useRef();
	const handleMouseDown = (event) => {
		backdropClick.current = event.target === event.currentTarget;
	};
	const handleBackdropClick = (event) => {
		if (onClick) onClick(event);
		if (!backdropClick.current) return;
		backdropClick.current = null;
		if (onClose) onClose(event, "backdropClick");
	};
	const ariaLabelledby = useId(ariaLabelledbyProp);
	const dialogContextValue = import_react.useMemo(() => {
		return { titleId: ariaLabelledby };
	}, [ariaLabelledby]);
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponent,
			...slots
		},
		slotProps: {
			transition: TransitionProps,
			paper: PaperProps,
			backdrop: BackdropProps,
			...slotProps
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		elementType: DialogRoot,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: clsx(classes.root, className),
		ref
	});
	const [BackdropSlot, backdropSlotProps] = useSlot("backdrop", {
		elementType: DialogBackdrop,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: classes.backdrop
	});
	const [PaperSlot, paperSlotProps] = useSlot("paper", {
		elementType: DialogPaper,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: clsx(classes.paper, PaperProps.className)
	});
	const [ContainerSlot, containerSlotProps] = useSlot("container", {
		elementType: DialogContainer,
		externalForwardedProps,
		ownerState,
		className: classes.container
	});
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Fade,
		externalForwardedProps,
		ownerState,
		additionalProps: {
			appear: true,
			in: open,
			timeout: transitionDuration,
			role: "presentation"
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		closeAfterTransition: true,
		slots: { backdrop: BackdropSlot },
		slotProps: { backdrop: {
			transitionDuration,
			as: BackdropComponent,
			...backdropSlotProps
		} },
		disableEscapeKeyDown,
		onClose,
		open,
		onClick: handleBackdropClick,
		...rootSlotProps,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
			...transitionSlotProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerSlot, {
				onMouseDown: handleMouseDown,
				...containerSlotProps,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlot, {
					as: PaperComponent,
					elevation: 24,
					role: "dialog",
					"aria-describedby": ariaDescribedby,
					"aria-labelledby": ariaLabelledby,
					"aria-modal": ariaModal,
					...paperSlotProps,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContext.Provider, {
						value: dialogContextValue,
						children
					})
				})
			})
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/DialogActions/dialogActionsClasses.js
function getDialogActionsUtilityClass(slot) {
	return generateUtilityClass("MuiDialogActions", slot);
}
generateUtilityClasses("MuiDialogActions", ["root", "spacing"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/DialogActions/DialogActions.js
var useUtilityClasses$39 = (ownerState) => {
	const { classes, disableSpacing } = ownerState;
	return composeClasses({ root: ["root", !disableSpacing && "spacing"] }, getDialogActionsUtilityClass, classes);
};
var DialogActionsRoot = styled$2("div", {
	name: "MuiDialogActions",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, !ownerState.disableSpacing && styles.spacing];
	}
})({
	display: "flex",
	alignItems: "center",
	padding: 8,
	justifyContent: "flex-end",
	flex: "0 0 auto",
	variants: [{
		props: ({ ownerState }) => !ownerState.disableSpacing,
		style: { "& > :not(style) ~ :not(style)": { marginLeft: 8 } }
	}]
});
var DialogActions = /* @__PURE__ */ import_react.forwardRef(function DialogActions(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialogActions"
	});
	const { className, disableSpacing = false, ...other } = props;
	const ownerState = {
		...props,
		disableSpacing
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogActionsRoot, {
		className: clsx(useUtilityClasses$39(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/DialogContent/dialogContentClasses.js
function getDialogContentUtilityClass(slot) {
	return generateUtilityClass("MuiDialogContent", slot);
}
generateUtilityClasses("MuiDialogContent", ["root", "dividers"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/DialogTitle/dialogTitleClasses.js
function getDialogTitleUtilityClass(slot) {
	return generateUtilityClass("MuiDialogTitle", slot);
}
var dialogTitleClasses = generateUtilityClasses("MuiDialogTitle", ["root"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/DialogContent/DialogContent.js
var useUtilityClasses$38 = (ownerState) => {
	const { classes, dividers } = ownerState;
	return composeClasses({ root: ["root", dividers && "dividers"] }, getDialogContentUtilityClass, classes);
};
var DialogContentRoot = styled$2("div", {
	name: "MuiDialogContent",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.dividers && styles.dividers];
	}
})(memoTheme(({ theme }) => ({
	flex: "1 1 auto",
	WebkitOverflowScrolling: "touch",
	overflowY: "auto",
	padding: "20px 24px",
	variants: [{
		props: ({ ownerState }) => ownerState.dividers,
		style: {
			padding: "16px 24px",
			borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
			borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
		}
	}, {
		props: ({ ownerState }) => !ownerState.dividers,
		style: { [`.${dialogTitleClasses.root} + &`]: { paddingTop: 0 } }
	}]
})));
var DialogContent = /* @__PURE__ */ import_react.forwardRef(function DialogContent(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialogContent"
	});
	const { className, dividers = false, ...other } = props;
	const ownerState = {
		...props,
		dividers
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentRoot, {
		className: clsx(useUtilityClasses$38(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/DialogTitle/DialogTitle.js
var useUtilityClasses$37 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getDialogTitleUtilityClass, classes);
};
var DialogTitleRoot = styled$2(Typography, {
	name: "MuiDialogTitle",
	slot: "Root"
})({
	padding: "16px 24px",
	flex: "0 0 auto"
});
var DialogTitle = /* @__PURE__ */ import_react.forwardRef(function DialogTitle(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialogTitle"
	});
	const { className, id: idProp, ...other } = props;
	const ownerState = props;
	const classes = useUtilityClasses$37(ownerState);
	const { titleId = idProp } = import_react.useContext(DialogContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitleRoot, {
		component: "h2",
		className: clsx(classes.root, className),
		ownerState,
		ref,
		variant: "h6",
		id: idProp ?? titleId,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Divider/dividerClasses.js
function getDividerUtilityClass(slot) {
	return generateUtilityClass("MuiDivider", slot);
}
var dividerClasses = generateUtilityClasses("MuiDivider", [
	"root",
	"absolute",
	"fullWidth",
	"inset",
	"middle",
	"flexItem",
	"light",
	"vertical",
	"withChildren",
	"withChildrenVertical",
	"textAlignRight",
	"textAlignLeft",
	"wrapper",
	"wrapperVertical"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Divider/Divider.js
var useUtilityClasses$36 = (ownerState) => {
	const { absolute, children, classes, flexItem, light, orientation, textAlign, variant } = ownerState;
	return composeClasses({
		root: [
			"root",
			absolute && "absolute",
			variant,
			light && "light",
			orientation === "vertical" && "vertical",
			flexItem && "flexItem",
			children && "withChildren",
			children && orientation === "vertical" && "withChildrenVertical",
			textAlign === "right" && orientation !== "vertical" && "textAlignRight",
			textAlign === "left" && orientation !== "vertical" && "textAlignLeft"
		],
		wrapper: ["wrapper", orientation === "vertical" && "wrapperVertical"]
	}, getDividerUtilityClass, classes);
};
var DividerRoot = styled$2("div", {
	name: "MuiDivider",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.absolute && styles.absolute,
			styles[ownerState.variant],
			ownerState.light && styles.light,
			ownerState.orientation === "vertical" && styles.vertical,
			ownerState.flexItem && styles.flexItem,
			ownerState.children && styles.withChildren,
			ownerState.children && ownerState.orientation === "vertical" && styles.withChildrenVertical,
			ownerState.textAlign === "right" && ownerState.orientation !== "vertical" && styles.textAlignRight,
			ownerState.textAlign === "left" && ownerState.orientation !== "vertical" && styles.textAlignLeft
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 0,
	flexShrink: 0,
	borderWidth: 0,
	borderStyle: "solid",
	borderColor: (theme.vars || theme).palette.divider,
	borderBottomWidth: "thin",
	variants: [
		{
			props: { absolute: true },
			style: {
				position: "absolute",
				bottom: 0,
				left: 0,
				width: "100%"
			}
		},
		{
			props: { light: true },
			style: { borderColor: theme.alpha((theme.vars || theme).palette.divider, .08) }
		},
		{
			props: { variant: "inset" },
			style: { marginLeft: 72 }
		},
		{
			props: {
				variant: "middle",
				orientation: "horizontal"
			},
			style: {
				marginLeft: theme.spacing(2),
				marginRight: theme.spacing(2)
			}
		},
		{
			props: {
				variant: "middle",
				orientation: "vertical"
			},
			style: {
				marginTop: theme.spacing(1),
				marginBottom: theme.spacing(1)
			}
		},
		{
			props: { orientation: "vertical" },
			style: {
				height: "100%",
				borderBottomWidth: 0,
				borderRightWidth: "thin"
			}
		},
		{
			props: { flexItem: true },
			style: {
				alignSelf: "stretch",
				height: "auto"
			}
		},
		{
			props: ({ ownerState }) => !!ownerState.children,
			style: {
				display: "flex",
				textAlign: "center",
				border: 0,
				borderTopStyle: "solid",
				borderLeftStyle: "solid",
				"&::before, &::after": {
					content: "\"\"",
					alignSelf: "center"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.children && ownerState.orientation !== "vertical",
			style: { "&::before, &::after": {
				width: "100%",
				borderTop: `thin solid ${(theme.vars || theme).palette.divider}`,
				borderTopStyle: "inherit"
			} }
		},
		{
			props: ({ ownerState }) => ownerState.orientation === "vertical" && ownerState.children,
			style: {
				flexDirection: "column",
				"&::before, &::after": {
					height: "100%",
					borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`,
					borderLeftStyle: "inherit"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.textAlign === "right" && ownerState.orientation !== "vertical",
			style: {
				"&::before": { width: "90%" },
				"&::after": { width: "10%" }
			}
		},
		{
			props: ({ ownerState }) => ownerState.textAlign === "left" && ownerState.orientation !== "vertical",
			style: {
				"&::before": { width: "10%" },
				"&::after": { width: "90%" }
			}
		}
	]
})));
var DividerWrapper = styled$2("span", {
	name: "MuiDivider",
	slot: "Wrapper",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.wrapper, ownerState.orientation === "vertical" && styles.wrapperVertical];
	}
})(memoTheme(({ theme }) => ({
	display: "inline-block",
	paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
	paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
	whiteSpace: "nowrap",
	variants: [{
		props: { orientation: "vertical" },
		style: {
			paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
			paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
		}
	}]
})));
var Divider = /* @__PURE__ */ import_react.forwardRef(function Divider(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDivider"
	});
	const { absolute = false, children, className, orientation = "horizontal", component = children || orientation === "vertical" ? "div" : "hr", flexItem = false, light = false, role = component !== "hr" ? "separator" : void 0, textAlign = "center", variant = "fullWidth", ...other } = props;
	const ownerState = {
		...props,
		absolute,
		component,
		flexItem,
		light,
		orientation,
		role,
		textAlign,
		variant
	};
	const classes = useUtilityClasses$36(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DividerRoot, {
		as: component,
		className: clsx(classes.root, className),
		role,
		ref,
		ownerState,
		"aria-orientation": role === "separator" && (component !== "hr" || orientation === "vertical") ? orientation : void 0,
		...other,
		children: children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DividerWrapper, {
			className: classes.wrapper,
			ownerState,
			children
		}) : null
	});
});
/**
* The following flag is used to ensure that this component isn't tabbable i.e.
* does not get highlight/focus inside of MUI List.
*/
if (Divider) Divider.muiSkipListHighlight = true;
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Slide/Slide.js
function getTranslateValue(direction, node, resolvedContainer) {
	const rect = node.getBoundingClientRect();
	const containerRect = resolvedContainer && resolvedContainer.getBoundingClientRect();
	const containerWindow = ownerWindow_default(node);
	let transform;
	if (node.fakeTransform) transform = node.fakeTransform;
	else {
		const computedStyle = containerWindow.getComputedStyle(node);
		transform = computedStyle.getPropertyValue("-webkit-transform") || computedStyle.getPropertyValue("transform");
	}
	let offsetX = 0;
	let offsetY = 0;
	if (transform && transform !== "none" && typeof transform === "string") {
		const transformValues = transform.split("(")[1].split(")")[0].split(",");
		offsetX = parseInt(transformValues[4], 10);
		offsetY = parseInt(transformValues[5], 10);
	}
	if (direction === "left") {
		if (containerRect) return `translateX(${containerRect.right + offsetX - rect.left}px)`;
		return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
	}
	if (direction === "right") {
		if (containerRect) return `translateX(-${rect.right - containerRect.left - offsetX}px)`;
		return `translateX(-${rect.left + rect.width - offsetX}px)`;
	}
	if (direction === "up") {
		if (containerRect) return `translateY(${containerRect.bottom + offsetY - rect.top}px)`;
		return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
	}
	if (containerRect) return `translateY(-${rect.top - containerRect.top + rect.height - offsetY}px)`;
	return `translateY(-${rect.top + rect.height - offsetY}px)`;
}
function resolveContainer(containerPropProp) {
	return typeof containerPropProp === "function" ? containerPropProp() : containerPropProp;
}
function setTranslateValue(direction, node, containerProp) {
	const transform = getTranslateValue(direction, node, resolveContainer(containerProp));
	if (transform) {
		node.style.webkitTransform = transform;
		node.style.transform = transform;
	}
}
/**
* The Slide transition is used by the [Drawer](/material-ui/react-drawer/) component.
* It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
*/
var Slide = /* @__PURE__ */ import_react.forwardRef(function Slide(props, ref) {
	const theme = useTheme$3();
	const defaultEasing = {
		enter: theme.transitions.easing.easeOut,
		exit: theme.transitions.easing.sharp
	};
	const defaultTimeout = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { addEndListener, appear = true, children, container: containerProp, direction = "down", easing: easingProp = defaultEasing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style, timeout = defaultTimeout, TransitionComponent = Transition, ...other } = props;
	const childrenRef = import_react.useRef(null);
	const handleRef = useForkRef_default(getReactElementRef(children), childrenRef, ref);
	const normalizedTransitionCallback = (callback) => (isAppearing) => {
		if (callback) if (isAppearing === void 0) callback(childrenRef.current);
		else callback(childrenRef.current, isAppearing);
	};
	const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
		setTranslateValue(direction, node, containerProp);
		reflow(node);
		if (onEnter) onEnter(node, isAppearing);
	});
	const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
		const transitionProps = getTransitionProps({
			timeout,
			style,
			easing: easingProp
		}, { mode: "enter" });
		node.style.webkitTransition = theme.transitions.create("-webkit-transform", { ...transitionProps });
		node.style.transition = theme.transitions.create("transform", { ...transitionProps });
		node.style.webkitTransform = "none";
		node.style.transform = "none";
		if (onEntering) onEntering(node, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node) => {
		const transitionProps = getTransitionProps({
			timeout,
			style,
			easing: easingProp
		}, { mode: "exit" });
		node.style.webkitTransition = theme.transitions.create("-webkit-transform", transitionProps);
		node.style.transition = theme.transitions.create("transform", transitionProps);
		setTranslateValue(direction, node, containerProp);
		if (onExit) onExit(node);
	});
	const handleExited = normalizedTransitionCallback((node) => {
		node.style.webkitTransition = "";
		node.style.transition = "";
		if (onExited) onExited(node);
	});
	const handleAddEndListener = (next) => {
		if (addEndListener) addEndListener(childrenRef.current, next);
	};
	const updatePosition = import_react.useCallback(() => {
		if (childrenRef.current) setTranslateValue(direction, childrenRef.current, containerProp);
	}, [direction, containerProp]);
	import_react.useEffect(() => {
		if (inProp || direction === "down" || direction === "right") return;
		const handleResize = debounce_default(() => {
			if (childrenRef.current) setTranslateValue(direction, childrenRef.current, containerProp);
		});
		const containerWindow = ownerWindow_default(childrenRef.current);
		containerWindow.addEventListener("resize", handleResize);
		return () => {
			handleResize.clear();
			containerWindow.removeEventListener("resize", handleResize);
		};
	}, [
		direction,
		inProp,
		containerProp
	]);
	import_react.useEffect(() => {
		if (!inProp) updatePosition();
	}, [inProp, updatePosition]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		nodeRef: childrenRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		appear,
		in: inProp,
		timeout,
		...other,
		children: (state, { ownerState, ...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				ref: handleRef,
				style: {
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...style,
					...children.props.style
				},
				...restChildProps
			});
		}
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Drawer/drawerClasses.js
function getDrawerUtilityClass(slot) {
	return generateUtilityClass("MuiDrawer", slot);
}
generateUtilityClasses("MuiDrawer", [
	"root",
	"docked",
	"paper",
	"anchorLeft",
	"anchorRight",
	"anchorTop",
	"anchorBottom",
	"paperAnchorLeft",
	"paperAnchorRight",
	"paperAnchorTop",
	"paperAnchorBottom",
	"paperAnchorDockedLeft",
	"paperAnchorDockedRight",
	"paperAnchorDockedTop",
	"paperAnchorDockedBottom",
	"modal"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Drawer/Drawer.js
var overridesResolver$4 = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		(ownerState.variant === "permanent" || ownerState.variant === "persistent") && styles.docked,
		ownerState.variant === "temporary" && styles.modal
	];
};
var useUtilityClasses$35 = (ownerState) => {
	const { classes, anchor, variant } = ownerState;
	return composeClasses({
		root: ["root", `anchor${capitalize_default(anchor)}`],
		docked: [(variant === "permanent" || variant === "persistent") && "docked"],
		modal: ["modal"],
		paper: [
			"paper",
			`paperAnchor${capitalize_default(anchor)}`,
			variant !== "temporary" && `paperAnchorDocked${capitalize_default(anchor)}`
		]
	}, getDrawerUtilityClass, classes);
};
var DrawerRoot = styled$2(Modal, {
	name: "MuiDrawer",
	slot: "Root",
	overridesResolver: overridesResolver$4
})(memoTheme(({ theme }) => ({ zIndex: (theme.vars || theme).zIndex.drawer })));
var DrawerDockedRoot = styled$2("div", {
	shouldForwardProp: rootShouldForwardProp,
	name: "MuiDrawer",
	slot: "Docked",
	skipVariantsResolver: false,
	overridesResolver: overridesResolver$4
})({ flex: "0 0 auto" });
var DrawerPaper = styled$2(Paper, {
	name: "MuiDrawer",
	slot: "Paper",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.paper,
			styles[`paperAnchor${capitalize_default(ownerState.anchor)}`],
			ownerState.variant !== "temporary" && styles[`paperAnchorDocked${capitalize_default(ownerState.anchor)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	overflowY: "auto",
	display: "flex",
	flexDirection: "column",
	height: "100%",
	flex: "1 0 auto",
	zIndex: (theme.vars || theme).zIndex.drawer,
	WebkitOverflowScrolling: "touch",
	position: "fixed",
	top: 0,
	outline: 0,
	variants: [
		{
			props: { anchor: "left" },
			style: { left: 0 }
		},
		{
			props: { anchor: "top" },
			style: {
				top: 0,
				left: 0,
				right: 0,
				height: "auto",
				maxHeight: "100%"
			}
		},
		{
			props: { anchor: "right" },
			style: { right: 0 }
		},
		{
			props: { anchor: "bottom" },
			style: {
				top: "auto",
				left: 0,
				bottom: 0,
				right: 0,
				height: "auto",
				maxHeight: "100%"
			}
		},
		{
			props: ({ ownerState }) => ownerState.anchor === "left" && ownerState.variant !== "temporary",
			style: { borderRight: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: ({ ownerState }) => ownerState.anchor === "top" && ownerState.variant !== "temporary",
			style: { borderBottom: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: ({ ownerState }) => ownerState.anchor === "right" && ownerState.variant !== "temporary",
			style: { borderLeft: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: ({ ownerState }) => ownerState.anchor === "bottom" && ownerState.variant !== "temporary",
			style: { borderTop: `1px solid ${(theme.vars || theme).palette.divider}` }
		}
	]
})));
var oppositeDirection = {
	left: "right",
	right: "left",
	top: "down",
	bottom: "up"
};
function isHorizontal(anchor) {
	return ["left", "right"].includes(anchor);
}
function getAnchor({ direction }, anchor) {
	return direction === "rtl" && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}
/**
* The props of the [Modal](/material-ui/api/modal/) component are available
* when `variant="temporary"` is set.
*/
var Drawer = /* @__PURE__ */ import_react.forwardRef(function Drawer(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDrawer"
	});
	const theme = useTheme$3();
	const isRtl = useRtl();
	const defaultTransitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { anchor: anchorProp = "left", BackdropProps, children, className, elevation = 16, hideBackdrop = false, ModalProps: { BackdropProps: BackdropPropsProp, ...ModalProps } = {}, onClose, open = false, PaperProps = {}, SlideProps, TransitionComponent, transitionDuration = defaultTransitionDuration, variant = "temporary", slots = {}, slotProps = {}, ...other } = props;
	const mounted = import_react.useRef(false);
	import_react.useEffect(() => {
		mounted.current = true;
	}, []);
	const anchorInvariant = getAnchor({ direction: isRtl ? "rtl" : "ltr" }, anchorProp);
	const anchor = anchorProp;
	const ownerState = {
		...props,
		anchor,
		elevation,
		open,
		variant,
		...other
	};
	const classes = useUtilityClasses$35(ownerState);
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponent,
			...slots
		},
		slotProps: {
			paper: PaperProps,
			transition: SlideProps,
			...slotProps,
			backdrop: mergeSlotProps$1(slotProps.backdrop || {
				...BackdropProps,
				...BackdropPropsProp
			}, { transitionDuration })
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		elementType: DrawerRoot,
		className: clsx(classes.root, classes.modal, className),
		shouldForwardComponentProp: true,
		ownerState,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			...ModalProps
		},
		additionalProps: {
			open,
			onClose,
			hideBackdrop,
			slots: { backdrop: externalForwardedProps.slots.backdrop },
			slotProps: { backdrop: externalForwardedProps.slotProps.backdrop }
		}
	});
	const [PaperSlot, paperSlotProps] = useSlot("paper", {
		elementType: DrawerPaper,
		shouldForwardComponentProp: true,
		className: clsx(classes.paper, PaperProps.className),
		ownerState,
		externalForwardedProps,
		additionalProps: {
			elevation: variant === "temporary" ? elevation : 0,
			square: true,
			...variant === "temporary" && {
				role: "dialog",
				"aria-modal": "true"
			}
		}
	});
	const [DockedSlot, dockedSlotProps] = useSlot("docked", {
		elementType: DrawerDockedRoot,
		ref,
		className: clsx(classes.root, classes.docked, className),
		ownerState,
		externalForwardedProps,
		additionalProps: other
	});
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Slide,
		ownerState,
		externalForwardedProps,
		additionalProps: {
			in: open,
			direction: oppositeDirection[anchorInvariant],
			timeout: transitionDuration,
			appear: mounted.current
		}
	});
	const drawer = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlot, {
		...paperSlotProps,
		children
	});
	if (variant === "permanent") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockedSlot, {
		...dockedSlotProps,
		children: drawer
	});
	const slidingDrawer = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
		...transitionSlotProps,
		children: drawer
	});
	if (variant === "persistent") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockedSlot, {
		...dockedSlotProps,
		children: slidingDrawer
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		...rootSlotProps,
		children: slidingDrawer
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Fab/fabClasses.js
function getFabUtilityClass(slot) {
	return generateUtilityClass("MuiFab", slot);
}
var fabClasses = generateUtilityClasses("MuiFab", [
	"root",
	"primary",
	"secondary",
	"extended",
	"circular",
	"focusVisible",
	"disabled",
	"colorInherit",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"info",
	"error",
	"warning",
	"success"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Fab/Fab.js
var useUtilityClasses$34 = (ownerState) => {
	const { color, variant, classes, size } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		variant,
		`size${capitalize_default(size)}`,
		color === "inherit" ? "colorInherit" : color
	] }, getFabUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var FabRoot = styled$2(ButtonBase, {
	name: "MuiFab",
	slot: "Root",
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`size${capitalize_default(ownerState.size)}`],
			ownerState.color === "inherit" && styles.colorInherit,
			styles[capitalize_default(ownerState.size)],
			styles[ownerState.color]
		];
	}
})(memoTheme(({ theme }) => ({
	...theme.typography.button,
	minHeight: 36,
	transition: theme.transitions.create([
		"background-color",
		"box-shadow",
		"border-color"
	], { duration: theme.transitions.duration.short }),
	borderRadius: "50%",
	padding: 0,
	minWidth: 0,
	width: 56,
	height: 56,
	zIndex: (theme.vars || theme).zIndex.fab,
	boxShadow: (theme.vars || theme).shadows[6],
	"&:active": { boxShadow: (theme.vars || theme).shadows[12] },
	color: theme.vars ? theme.vars.palette.grey[900] : theme.palette.getContrastText?.(theme.palette.grey[300]),
	backgroundColor: (theme.vars || theme).palette.grey[300],
	"&:hover": {
		backgroundColor: (theme.vars || theme).palette.grey.A100,
		"@media (hover: none)": { backgroundColor: (theme.vars || theme).palette.grey[300] },
		textDecoration: "none"
	},
	[`&.${fabClasses.focusVisible}`]: { boxShadow: (theme.vars || theme).shadows[6] },
	variants: [
		{
			props: { size: "small" },
			style: {
				width: 40,
				height: 40
			}
		},
		{
			props: { size: "medium" },
			style: {
				width: 48,
				height: 48
			}
		},
		{
			props: { variant: "extended" },
			style: {
				borderRadius: 48 / 2,
				padding: "0 16px",
				width: "auto",
				minHeight: "auto",
				minWidth: 48,
				height: 48
			}
		},
		{
			props: {
				variant: "extended",
				size: "small"
			},
			style: {
				width: "auto",
				padding: "0 8px",
				borderRadius: 34 / 2,
				minWidth: 34,
				height: 34
			}
		},
		{
			props: {
				variant: "extended",
				size: "medium"
			},
			style: {
				width: "auto",
				padding: "0 16px",
				borderRadius: 40 / 2,
				minWidth: 40,
				height: 40
			}
		},
		{
			props: { color: "inherit" },
			style: { color: "inherit" }
		}
	]
})), memoTheme(({ theme }) => ({ variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark", "contrastText"])).map(([color]) => ({
	props: { color },
	style: {
		color: (theme.vars || theme).palette[color].contrastText,
		backgroundColor: (theme.vars || theme).palette[color].main,
		"&:hover": {
			backgroundColor: (theme.vars || theme).palette[color].dark,
			"@media (hover: none)": { backgroundColor: (theme.vars || theme).palette[color].main }
		}
	}
}))] })), memoTheme(({ theme }) => ({ [`&.${fabClasses.disabled}`]: {
	color: (theme.vars || theme).palette.action.disabled,
	boxShadow: (theme.vars || theme).shadows[0],
	backgroundColor: (theme.vars || theme).palette.action.disabledBackground
} })));
var Fab = /* @__PURE__ */ import_react.forwardRef(function Fab(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFab"
	});
	const { children, className, color = "default", component = "button", disabled = false, disableFocusRipple = false, focusVisibleClassName, size = "large", variant = "circular", ...other } = props;
	const ownerState = {
		...props,
		color,
		component,
		disabled,
		disableFocusRipple,
		size,
		variant
	};
	const classes = useUtilityClasses$34(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FabRoot, {
		className: clsx(classes.root, className),
		component,
		disabled,
		focusRipple: !disableFocusRipple,
		focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
		ownerState,
		ref,
		...other,
		classes,
		children
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FilledInput/FilledInput.js
var useUtilityClasses$33 = (ownerState) => {
	const { classes, disableUnderline, startAdornment, endAdornment, size, hiddenLabel, multiline } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			!disableUnderline && "underline",
			startAdornment && "adornedStart",
			endAdornment && "adornedEnd",
			size === "small" && `size${capitalize_default(size)}`,
			hiddenLabel && "hiddenLabel",
			multiline && "multiline"
		],
		input: ["input"]
	}, getFilledInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var FilledInputRoot = styled$2(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiFilledInput",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [...rootOverridesResolver(props, styles), !ownerState.disableUnderline && styles.underline];
	}
})(memoTheme(({ theme }) => {
	const light = theme.palette.mode === "light";
	const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	const backgroundColor = light ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
	const hoverBackground = light ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)";
	const disabledBackground = light ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
	return {
		position: "relative",
		backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
		borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
		borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create("background-color", {
			duration: theme.transitions.duration.shorter,
			easing: theme.transitions.easing.easeOut
		}),
		"&:hover": {
			backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
			"@media (hover: none)": { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor }
		},
		[`&.${filledInputClasses.focused}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor },
		[`&.${filledInputClasses.disabled}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground },
		variants: [
			{
				props: ({ ownerState }) => !ownerState.disableUnderline,
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: theme.transitions.create("transform", {
							duration: theme.transitions.duration.shorter,
							easing: theme.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${filledInputClasses.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${filledInputClasses.error}`]: { "&::before, &::after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline) : bottomLineColor}`,
						left: 0,
						bottom: 0,
						content: "\"\\00a0\"",
						position: "absolute",
						right: 0,
						transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${filledInputClasses.disabled}, .${filledInputClasses.error}):before`]: { borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}` },
					[`&.${filledInputClasses.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: {
					disableUnderline: false,
					color
				},
				style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color]?.main}` } }
			})),
			{
				props: ({ ownerState }) => ownerState.startAdornment,
				style: { paddingLeft: 12 }
			},
			{
				props: ({ ownerState }) => ownerState.endAdornment,
				style: { paddingRight: 12 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: { padding: "25px 12px 8px" }
			},
			{
				props: ({ ownerState, size }) => ownerState.multiline && size === "small",
				style: {
					paddingTop: 21,
					paddingBottom: 4
				}
			},
			{
				props: ({ ownerState }) => ownerState.multiline && ownerState.hiddenLabel,
				style: {
					paddingTop: 16,
					paddingBottom: 17
				}
			},
			{
				props: ({ ownerState }) => ownerState.multiline && ownerState.hiddenLabel && ownerState.size === "small",
				style: {
					paddingTop: 8,
					paddingBottom: 9
				}
			}
		]
	};
}));
var FilledInputInput = styled$2(InputBaseInput, {
	name: "MuiFilledInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme(({ theme }) => ({
	paddingTop: 25,
	paddingRight: 12,
	paddingBottom: 8,
	paddingLeft: 12,
	...!theme.vars && { "&:-webkit-autofill": {
		WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
		WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
		caretColor: theme.palette.mode === "light" ? null : "#fff",
		borderTopLeftRadius: "inherit",
		borderTopRightRadius: "inherit"
	} },
	...theme.vars && {
		"&:-webkit-autofill": {
			borderTopLeftRadius: "inherit",
			borderTopRightRadius: "inherit"
		},
		[theme.getColorSchemeSelector("dark")]: { "&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 100px #266798 inset",
			WebkitTextFillColor: "#fff",
			caretColor: "#fff"
		} }
	},
	variants: [
		{
			props: { size: "small" },
			style: {
				paddingTop: 21,
				paddingBottom: 4
			}
		},
		{
			props: ({ ownerState }) => ownerState.hiddenLabel,
			style: {
				paddingTop: 16,
				paddingBottom: 17
			}
		},
		{
			props: ({ ownerState }) => ownerState.startAdornment,
			style: { paddingLeft: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.endAdornment,
			style: { paddingRight: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.hiddenLabel && ownerState.size === "small",
			style: {
				paddingTop: 8,
				paddingBottom: 9
			}
		},
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: {
				paddingTop: 0,
				paddingBottom: 0,
				paddingLeft: 0,
				paddingRight: 0
			}
		}
	]
})));
var FilledInput = /* @__PURE__ */ import_react.forwardRef(function FilledInput(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFilledInput"
	});
	const { disableUnderline = false, components = {}, componentsProps: componentsPropsProp, fullWidth = false, hiddenLabel, inputComponent = "input", multiline = false, slotProps, slots = {}, type = "text", ...other } = props;
	const ownerState = {
		...props,
		disableUnderline,
		fullWidth,
		inputComponent,
		multiline,
		type
	};
	const classes = useUtilityClasses$33(props);
	const filledInputComponentsProps = {
		root: { ownerState },
		input: { ownerState }
	};
	const componentsProps = slotProps ?? componentsPropsProp ? deepmerge(filledInputComponentsProps, slotProps ?? componentsPropsProp) : filledInputComponentsProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
		slots: {
			root: slots.root ?? components.Root ?? FilledInputRoot,
			input: slots.input ?? components.Input ?? FilledInputInput
		},
		slotProps: componentsProps,
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes
	});
});
FilledInput.muiName = "Input";
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormControl/formControlClasses.js
function getFormControlUtilityClasses(slot) {
	return generateUtilityClass("MuiFormControl", slot);
}
generateUtilityClasses("MuiFormControl", [
	"root",
	"marginNone",
	"marginNormal",
	"marginDense",
	"fullWidth",
	"disabled"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormControl/FormControl.js
var useUtilityClasses$32 = (ownerState) => {
	const { classes, margin, fullWidth } = ownerState;
	return composeClasses({ root: [
		"root",
		margin !== "none" && `margin${capitalize_default(margin)}`,
		fullWidth && "fullWidth"
	] }, getFormControlUtilityClasses, classes);
};
var FormControlRoot = styled$2("div", {
	name: "MuiFormControl",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[`margin${capitalize_default(ownerState.margin)}`],
			ownerState.fullWidth && styles.fullWidth
		];
	}
})({
	display: "inline-flex",
	flexDirection: "column",
	position: "relative",
	minWidth: 0,
	padding: 0,
	margin: 0,
	border: 0,
	verticalAlign: "top",
	variants: [
		{
			props: { margin: "normal" },
			style: {
				marginTop: 16,
				marginBottom: 8
			}
		},
		{
			props: { margin: "dense" },
			style: {
				marginTop: 8,
				marginBottom: 4
			}
		},
		{
			props: { fullWidth: true },
			style: { width: "100%" }
		}
	]
});
/**
* Provides context such as filled/focused/error/required for form inputs.
* Relying on the context provides high flexibility and ensures that the state always stays
* consistent across the children of the `FormControl`.
* This context is used by the following components:
*
*  - FormLabel
*  - FormHelperText
*  - Input
*  - InputLabel
*
* You can find one composition example below and more going to [the demos](/material-ui/react-text-field/#components).
*
* ```jsx
* <FormControl>
*   <InputLabel htmlFor="my-input">Email address</InputLabel>
*   <Input id="my-input" aria-describedby="my-helper-text" />
*   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
* </FormControl>
* ```
*
* ⚠️ Only one `InputBase` can be used within a FormControl because it creates visual inconsistencies.
* For instance, only one input can be focused at the same time, the state shouldn't be shared.
*/
var FormControl = /* @__PURE__ */ import_react.forwardRef(function FormControl(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormControl"
	});
	const { children, className, color = "primary", component = "div", disabled = false, error = false, focused: visuallyFocused, fullWidth = false, hiddenLabel = false, margin = "none", required = false, size = "medium", variant = "outlined", ...other } = props;
	const ownerState = {
		...props,
		color,
		component,
		disabled,
		error,
		fullWidth,
		hiddenLabel,
		margin,
		required,
		size,
		variant
	};
	const classes = useUtilityClasses$32(ownerState);
	const [adornedStart, setAdornedStart] = import_react.useState(() => {
		let initialAdornedStart = false;
		if (children) import_react.Children.forEach(children, (child) => {
			if (!isMuiElement_default(child, ["Input", "Select"])) return;
			const input = isMuiElement_default(child, ["Select"]) ? child.props.input : child;
			if (input && isAdornedStart(input.props)) initialAdornedStart = true;
		});
		return initialAdornedStart;
	});
	const [filled, setFilled] = import_react.useState(() => {
		let initialFilled = false;
		if (children) import_react.Children.forEach(children, (child) => {
			if (!isMuiElement_default(child, ["Input", "Select"])) return;
			if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) initialFilled = true;
		});
		return initialFilled;
	});
	const [focusedState, setFocused] = import_react.useState(false);
	if (disabled && focusedState) setFocused(false);
	const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
	let registerEffect;
	import_react.useRef(false);
	const onFilled = import_react.useCallback(() => {
		setFilled(true);
	}, []);
	const onEmpty = import_react.useCallback(() => {
		setFilled(false);
	}, []);
	const childContext = import_react.useMemo(() => {
		return {
			adornedStart,
			setAdornedStart,
			color,
			disabled,
			error,
			filled,
			focused,
			fullWidth,
			hiddenLabel,
			size,
			onBlur: () => {
				setFocused(false);
			},
			onFocus: () => {
				setFocused(true);
			},
			onEmpty,
			onFilled,
			registerEffect,
			required,
			variant
		};
	}, [
		adornedStart,
		color,
		disabled,
		error,
		filled,
		focused,
		fullWidth,
		hiddenLabel,
		registerEffect,
		onEmpty,
		onFilled,
		required,
		size,
		variant
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlContext.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlRoot, {
			as: component,
			ownerState,
			className: clsx(classes.root, className),
			ref,
			...other,
			children
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormControlLabel/formControlLabelClasses.js
function getFormControlLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiFormControlLabel", slot);
}
var formControlLabelClasses = generateUtilityClasses("MuiFormControlLabel", [
	"root",
	"labelPlacementStart",
	"labelPlacementTop",
	"labelPlacementBottom",
	"disabled",
	"label",
	"error",
	"required",
	"asterisk"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js
var useUtilityClasses$31 = (ownerState) => {
	const { classes, disabled, labelPlacement, error, required } = ownerState;
	return composeClasses({
		root: [
			"root",
			disabled && "disabled",
			`labelPlacement${capitalize_default(labelPlacement)}`,
			error && "error",
			required && "required"
		],
		label: ["label", disabled && "disabled"],
		asterisk: ["asterisk", error && "error"]
	}, getFormControlLabelUtilityClasses, classes);
};
var FormControlLabelRoot = styled$2("label", {
	name: "MuiFormControlLabel",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${formControlLabelClasses.label}`]: styles.label },
			styles.root,
			styles[`labelPlacement${capitalize_default(ownerState.labelPlacement)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	display: "inline-flex",
	alignItems: "center",
	cursor: "pointer",
	verticalAlign: "middle",
	WebkitTapHighlightColor: "transparent",
	marginLeft: -11,
	marginRight: 16,
	[`&.${formControlLabelClasses.disabled}`]: { cursor: "default" },
	[`& .${formControlLabelClasses.label}`]: { [`&.${formControlLabelClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled } },
	variants: [
		{
			props: { labelPlacement: "start" },
			style: {
				flexDirection: "row-reverse",
				marginRight: -11
			}
		},
		{
			props: { labelPlacement: "top" },
			style: { flexDirection: "column-reverse" }
		},
		{
			props: { labelPlacement: "bottom" },
			style: { flexDirection: "column" }
		},
		{
			props: ({ labelPlacement }) => labelPlacement === "start" || labelPlacement === "top" || labelPlacement === "bottom",
			style: { marginLeft: 16 }
		}
	]
})));
var AsteriskComponent$1 = styled$2("span", {
	name: "MuiFormControlLabel",
	slot: "Asterisk"
})(memoTheme(({ theme }) => ({ [`&.${formControlLabelClasses.error}`]: { color: (theme.vars || theme).palette.error.main } })));
/**
* Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
* Use this component if you want to display an extra label.
*/
var FormControlLabel = /* @__PURE__ */ import_react.forwardRef(function FormControlLabel(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormControlLabel"
	});
	const { checked, className, componentsProps = {}, control, disabled: disabledProp, disableTypography, inputRef, label: labelProp, labelPlacement = "end", name, onChange, required: requiredProp, slots = {}, slotProps = {}, value, ...other } = props;
	const muiFormControl = useFormControl();
	const disabled = disabledProp ?? control.props.disabled ?? muiFormControl?.disabled;
	const required = requiredProp ?? control.props.required;
	const controlProps = {
		disabled,
		required
	};
	[
		"checked",
		"name",
		"onChange",
		"value",
		"inputRef"
	].forEach((key) => {
		if (typeof control.props[key] === "undefined" && typeof props[key] !== "undefined") controlProps[key] = props[key];
	});
	const fcs = formControlState({
		props,
		muiFormControl,
		states: ["error"]
	});
	const ownerState = {
		...props,
		disabled,
		labelPlacement,
		required,
		error: fcs.error
	};
	const classes = useUtilityClasses$31(ownerState);
	const [TypographySlot, typographySlotProps] = useSlot("typography", {
		elementType: Typography,
		externalForwardedProps: {
			slots,
			slotProps: {
				...componentsProps,
				...slotProps
			}
		},
		ownerState
	});
	let label = labelProp;
	if (label != null && label.type !== Typography && !disableTypography) label = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypographySlot, {
		component: "span",
		...typographySlotProps,
		className: clsx(classes.label, typographySlotProps?.className),
		children: label
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormControlLabelRoot, {
		className: clsx(classes.root, className),
		ownerState,
		ref,
		...other,
		children: [/* @__PURE__ */ import_react.cloneElement(control, controlProps), required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AsteriskComponent$1, {
			ownerState,
			"aria-hidden": true,
			className: classes.asterisk,
			children: [" ", "*"]
		})] }) : label]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormHelperText/formHelperTextClasses.js
function getFormHelperTextUtilityClasses(slot) {
	return generateUtilityClass("MuiFormHelperText", slot);
}
var formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", [
	"root",
	"error",
	"disabled",
	"sizeSmall",
	"sizeMedium",
	"contained",
	"focused",
	"filled",
	"required"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormHelperText/FormHelperText.js
var _span$3;
var useUtilityClasses$30 = (ownerState) => {
	const { classes, contained, size, disabled, error, filled, focused, required } = ownerState;
	return composeClasses({ root: [
		"root",
		disabled && "disabled",
		error && "error",
		size && `size${capitalize_default(size)}`,
		contained && "contained",
		focused && "focused",
		filled && "filled",
		required && "required"
	] }, getFormHelperTextUtilityClasses, classes);
};
var FormHelperTextRoot = styled$2("p", {
	name: "MuiFormHelperText",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.size && styles[`size${capitalize_default(ownerState.size)}`],
			ownerState.contained && styles.contained,
			ownerState.filled && styles.filled
		];
	}
})(memoTheme(({ theme }) => ({
	color: (theme.vars || theme).palette.text.secondary,
	...theme.typography.caption,
	textAlign: "left",
	marginTop: 3,
	marginRight: 0,
	marginBottom: 0,
	marginLeft: 0,
	[`&.${formHelperTextClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled },
	[`&.${formHelperTextClasses.error}`]: { color: (theme.vars || theme).palette.error.main },
	variants: [{
		props: { size: "small" },
		style: { marginTop: 4 }
	}, {
		props: ({ ownerState }) => ownerState.contained,
		style: {
			marginLeft: 14,
			marginRight: 14
		}
	}]
})));
var FormHelperText = /* @__PURE__ */ import_react.forwardRef(function FormHelperText(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormHelperText"
	});
	const { children, className, component = "p", disabled, error, filled, focused, margin, required, variant, ...other } = props;
	const fcs = formControlState({
		props,
		muiFormControl: useFormControl(),
		states: [
			"variant",
			"size",
			"disabled",
			"error",
			"filled",
			"focused",
			"required"
		]
	});
	const ownerState = {
		...props,
		component,
		contained: fcs.variant === "filled" || fcs.variant === "outlined",
		variant: fcs.variant,
		size: fcs.size,
		disabled: fcs.disabled,
		error: fcs.error,
		filled: fcs.filled,
		focused: fcs.focused,
		required: fcs.required
	};
	delete ownerState.ownerState;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormHelperTextRoot, {
		as: component,
		className: clsx(useUtilityClasses$30(ownerState).root, className),
		ref,
		...other,
		ownerState,
		children: children === " " ? _span$3 || (_span$3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "notranslate",
			"aria-hidden": true,
			children: "​"
		})) : children
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormLabel/formLabelClasses.js
function getFormLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiFormLabel", slot);
}
var formLabelClasses = generateUtilityClasses("MuiFormLabel", [
	"root",
	"colorSecondary",
	"focused",
	"disabled",
	"error",
	"filled",
	"required",
	"asterisk"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/FormLabel/FormLabel.js
var useUtilityClasses$29 = (ownerState) => {
	const { classes, color, focused, disabled, error, filled, required } = ownerState;
	return composeClasses({
		root: [
			"root",
			`color${capitalize_default(color)}`,
			disabled && "disabled",
			error && "error",
			filled && "filled",
			focused && "focused",
			required && "required"
		],
		asterisk: ["asterisk", error && "error"]
	}, getFormLabelUtilityClasses, classes);
};
var FormLabelRoot = styled$2("label", {
	name: "MuiFormLabel",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.color === "secondary" && styles.colorSecondary,
			ownerState.filled && styles.filled
		];
	}
})(memoTheme(({ theme }) => ({
	color: (theme.vars || theme).palette.text.secondary,
	...theme.typography.body1,
	lineHeight: "1.4375em",
	padding: 0,
	position: "relative",
	variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
		props: { color },
		style: { [`&.${formLabelClasses.focused}`]: { color: (theme.vars || theme).palette[color].main } }
	})), {
		props: {},
		style: {
			[`&.${formLabelClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled },
			[`&.${formLabelClasses.error}`]: { color: (theme.vars || theme).palette.error.main }
		}
	}]
})));
var AsteriskComponent = styled$2("span", {
	name: "MuiFormLabel",
	slot: "Asterisk"
})(memoTheme(({ theme }) => ({ [`&.${formLabelClasses.error}`]: { color: (theme.vars || theme).palette.error.main } })));
var FormLabel = /* @__PURE__ */ import_react.forwardRef(function FormLabel(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormLabel"
	});
	const { children, className, color, component = "label", disabled, error, filled, focused, required, ...other } = props;
	const fcs = formControlState({
		props,
		muiFormControl: useFormControl(),
		states: [
			"color",
			"required",
			"focused",
			"disabled",
			"error",
			"filled"
		]
	});
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		component,
		disabled: fcs.disabled,
		error: fcs.error,
		filled: fcs.filled,
		focused: fcs.focused,
		required: fcs.required
	};
	const classes = useUtilityClasses$29(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabelRoot, {
		as: component,
		ownerState,
		className: clsx(classes.root, className),
		ref,
		...other,
		children: [children, fcs.required && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AsteriskComponent, {
			ownerState,
			"aria-hidden": true,
			className: classes.asterisk,
			children: [" ", "*"]
		})]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Grow/Grow.js
function getScale(value) {
	return `scale(${value}, ${value ** 2})`;
}
var styles$2 = {
	entering: {
		opacity: 1,
		transform: getScale(1)
	},
	entered: {
		opacity: 1,
		transform: "none"
	}
};
var isWebKit154 = typeof navigator !== "undefined" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent);
/**
* The Grow transition is used by the [Tooltip](/material-ui/react-tooltip/) and
* [Popover](/material-ui/react-popover/) components.
* It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
*/
var Grow = /* @__PURE__ */ import_react.forwardRef(function Grow(props, ref) {
	const { addEndListener, appear = true, children, easing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style, timeout = "auto", TransitionComponent = Transition, ...other } = props;
	const timer = useTimeout();
	const autoTimeout = import_react.useRef();
	const theme = useTheme$3();
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
		if (callback) {
			const node = nodeRef.current;
			if (maybeIsAppearing === void 0) callback(node);
			else callback(node, maybeIsAppearing);
		}
	};
	const handleEntering = normalizedTransitionCallback(onEntering);
	const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
		reflow(node);
		const { duration: transitionDuration, delay, easing: transitionTimingFunction } = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "enter" });
		let duration;
		if (timeout === "auto") {
			duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
			autoTimeout.current = duration;
		} else duration = transitionDuration;
		node.style.transition = [theme.transitions.create("opacity", {
			duration,
			delay
		}), theme.transitions.create("transform", {
			duration: isWebKit154 ? duration : duration * .666,
			delay,
			easing: transitionTimingFunction
		})].join(",");
		if (onEnter) onEnter(node, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node) => {
		const { duration: transitionDuration, delay, easing: transitionTimingFunction } = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "exit" });
		let duration;
		if (timeout === "auto") {
			duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
			autoTimeout.current = duration;
		} else duration = transitionDuration;
		node.style.transition = [theme.transitions.create("opacity", {
			duration,
			delay
		}), theme.transitions.create("transform", {
			duration: isWebKit154 ? duration : duration * .666,
			delay: isWebKit154 ? delay : delay || duration * .333,
			easing: transitionTimingFunction
		})].join(",");
		node.style.opacity = 0;
		node.style.transform = getScale(.75);
		if (onExit) onExit(node);
	});
	const handleExited = normalizedTransitionCallback(onExited);
	const handleAddEndListener = (next) => {
		if (timeout === "auto") timer.start(autoTimeout.current || 0, next);
		if (addEndListener) addEndListener(nodeRef.current, next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		timeout: timeout === "auto" ? null : timeout,
		...other,
		children: (state, { ownerState, ...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				style: {
					opacity: 0,
					transform: getScale(.75),
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...styles$2[state],
					...style,
					...children.props.style
				},
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
if (Grow) Grow.muiSupportAuto = true;
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Input/Input.js
var useUtilityClasses$28 = (ownerState) => {
	const { classes, disableUnderline } = ownerState;
	const composedClasses = composeClasses({
		root: ["root", !disableUnderline && "underline"],
		input: ["input"]
	}, getInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var InputRoot = styled$2(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiInput",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [...rootOverridesResolver(props, styles), !ownerState.disableUnderline && styles.underline];
	}
})(memoTheme(({ theme }) => {
	let bottomLineColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	if (theme.vars) bottomLineColor = theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline);
	return {
		position: "relative",
		variants: [
			{
				props: ({ ownerState }) => ownerState.formControl,
				style: { "label + &": { marginTop: 16 } }
			},
			{
				props: ({ ownerState }) => !ownerState.disableUnderline,
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: theme.transitions.create("transform", {
							duration: theme.transitions.duration.shorter,
							easing: theme.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${inputClasses.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${inputClasses.error}`]: { "&::before, &::after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${bottomLineColor}`,
						left: 0,
						bottom: 0,
						content: "\"\\00a0\"",
						position: "absolute",
						right: 0,
						transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${inputClasses.disabled}, .${inputClasses.error}):before`]: {
						borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
						"@media (hover: none)": { borderBottom: `1px solid ${bottomLineColor}` }
					},
					[`&.${inputClasses.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: {
					color,
					disableUnderline: false
				},
				style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}` } }
			}))
		]
	};
}));
var InputInput = styled$2(InputBaseInput, {
	name: "MuiInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})({});
var Input = /* @__PURE__ */ import_react.forwardRef(function Input(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInput"
	});
	const { disableUnderline = false, components = {}, componentsProps: componentsPropsProp, fullWidth = false, inputComponent = "input", multiline = false, slotProps, slots = {}, type = "text", ...other } = props;
	const classes = useUtilityClasses$28(props);
	const inputComponentsProps = { root: { ownerState: { disableUnderline } } };
	const componentsProps = slotProps ?? componentsPropsProp ? deepmerge(slotProps ?? componentsPropsProp, inputComponentsProps) : inputComponentsProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
		slots: {
			root: slots.root ?? components.Root ?? InputRoot,
			input: slots.input ?? components.Input ?? InputInput
		},
		slotProps: componentsProps,
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes
	});
});
Input.muiName = "Input";
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/InputAdornment/inputAdornmentClasses.js
function getInputAdornmentUtilityClass(slot) {
	return generateUtilityClass("MuiInputAdornment", slot);
}
var inputAdornmentClasses = generateUtilityClasses("MuiInputAdornment", [
	"root",
	"filled",
	"standard",
	"outlined",
	"positionStart",
	"positionEnd",
	"disablePointerEvents",
	"hiddenLabel",
	"sizeSmall"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js
var _span$2;
var overridesResolver$3 = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		styles[`position${capitalize_default(ownerState.position)}`],
		ownerState.disablePointerEvents === true && styles.disablePointerEvents,
		styles[ownerState.variant]
	];
};
var useUtilityClasses$27 = (ownerState) => {
	const { classes, disablePointerEvents, hiddenLabel, position, size, variant } = ownerState;
	return composeClasses({ root: [
		"root",
		disablePointerEvents && "disablePointerEvents",
		position && `position${capitalize_default(position)}`,
		variant,
		hiddenLabel && "hiddenLabel",
		size && `size${capitalize_default(size)}`
	] }, getInputAdornmentUtilityClass, classes);
};
var InputAdornmentRoot = styled$2("div", {
	name: "MuiInputAdornment",
	slot: "Root",
	overridesResolver: overridesResolver$3
})(memoTheme(({ theme }) => ({
	display: "flex",
	maxHeight: "2em",
	alignItems: "center",
	whiteSpace: "nowrap",
	color: (theme.vars || theme).palette.action.active,
	variants: [
		{
			props: { variant: "filled" },
			style: { [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]: { marginTop: 16 } }
		},
		{
			props: { position: "start" },
			style: { marginRight: 8 }
		},
		{
			props: { position: "end" },
			style: { marginLeft: 8 }
		},
		{
			props: { disablePointerEvents: true },
			style: { pointerEvents: "none" }
		}
	]
})));
var InputAdornment = /* @__PURE__ */ import_react.forwardRef(function InputAdornment(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInputAdornment"
	});
	const { children, className, component = "div", disablePointerEvents = false, disableTypography = false, position, variant: variantProp, ...other } = props;
	const muiFormControl = useFormControl() || {};
	let variant = variantProp;
	if (variantProp && muiFormControl.variant) {}
	if (muiFormControl && !variant) variant = muiFormControl.variant;
	const ownerState = {
		...props,
		hiddenLabel: muiFormControl.hiddenLabel,
		size: muiFormControl.size,
		disablePointerEvents,
		position,
		variant
	};
	const classes = useUtilityClasses$27(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlContext.Provider, {
		value: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornmentRoot, {
			as: component,
			ownerState,
			className: clsx(classes.root, className),
			ref,
			...other,
			children: typeof children === "string" && !disableTypography ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				color: "textSecondary",
				children
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [position === "start" ? _span$2 || (_span$2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			})) : null, children] })
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/InputLabel/inputLabelClasses.js
function getInputLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiInputLabel", slot);
}
generateUtilityClasses("MuiInputLabel", [
	"root",
	"focused",
	"disabled",
	"error",
	"required",
	"asterisk",
	"formControl",
	"sizeSmall",
	"shrink",
	"animated",
	"standard",
	"filled",
	"outlined"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/InputLabel/InputLabel.js
var useUtilityClasses$26 = (ownerState) => {
	const { classes, formControl, size, shrink, disableAnimation, variant, required } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			formControl && "formControl",
			!disableAnimation && "animated",
			shrink && "shrink",
			size && size !== "medium" && `size${capitalize_default(size)}`,
			variant
		],
		asterisk: [required && "asterisk"]
	}, getInputLabelUtilityClasses, classes);
	return {
		...classes,
		...composedClasses
	};
};
var InputLabelRoot = styled$2(FormLabel, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiInputLabel",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${formLabelClasses.asterisk}`]: styles.asterisk },
			styles.root,
			ownerState.formControl && styles.formControl,
			ownerState.size === "small" && styles.sizeSmall,
			ownerState.shrink && styles.shrink,
			!ownerState.disableAnimation && styles.animated,
			ownerState.focused && styles.focused,
			styles[ownerState.variant]
		];
	}
})(memoTheme(({ theme }) => ({
	display: "block",
	transformOrigin: "top left",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	maxWidth: "100%",
	variants: [
		{
			props: ({ ownerState }) => ownerState.formControl,
			style: {
				position: "absolute",
				left: 0,
				top: 0,
				transform: "translate(0, 20px) scale(1)"
			}
		},
		{
			props: { size: "small" },
			style: { transform: "translate(0, 17px) scale(1)" }
		},
		{
			props: ({ ownerState }) => ownerState.shrink,
			style: {
				transform: "translate(0, -1.5px) scale(0.75)",
				transformOrigin: "top left",
				maxWidth: "133%"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disableAnimation,
			style: { transition: theme.transitions.create([
				"color",
				"transform",
				"max-width"
			], {
				duration: theme.transitions.duration.shorter,
				easing: theme.transitions.easing.easeOut
			}) }
		},
		{
			props: { variant: "filled" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(12px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "filled",
				size: "small"
			},
			style: { transform: "translate(12px, 13px) scale(1)" }
		},
		{
			props: ({ variant, ownerState }) => variant === "filled" && ownerState.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				transform: "translate(12px, 7px) scale(0.75)",
				maxWidth: "calc(133% - 24px)"
			}
		},
		{
			props: ({ variant, ownerState, size }) => variant === "filled" && ownerState.shrink && size === "small",
			style: { transform: "translate(12px, 4px) scale(0.75)" }
		},
		{
			props: { variant: "outlined" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(14px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "outlined",
				size: "small"
			},
			style: { transform: "translate(14px, 9px) scale(1)" }
		},
		{
			props: ({ variant, ownerState }) => variant === "outlined" && ownerState.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				maxWidth: "calc(133% - 32px)",
				transform: "translate(14px, -9px) scale(0.75)"
			}
		}
	]
})));
var InputLabel = /* @__PURE__ */ import_react.forwardRef(function InputLabel(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiInputLabel",
		props: inProps
	});
	const { disableAnimation = false, margin, shrink: shrinkProp, variant, className, ...other } = props;
	const muiFormControl = useFormControl();
	let shrink = shrinkProp;
	if (typeof shrink === "undefined" && muiFormControl) shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"size",
			"variant",
			"required",
			"focused"
		]
	});
	const ownerState = {
		...props,
		disableAnimation,
		formControl: muiFormControl,
		shrink,
		size: fcs.size,
		variant: fcs.variant,
		required: fcs.required,
		focused: fcs.focused
	};
	const classes = useUtilityClasses$26(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputLabelRoot, {
		"data-shrink": shrink,
		ref,
		className: clsx(classes.root, className),
		...other,
		ownerState,
		classes
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Link/linkClasses.js
function getLinkUtilityClass(slot) {
	return generateUtilityClass("MuiLink", slot);
}
var linkClasses = generateUtilityClasses("MuiLink", [
	"root",
	"underlineNone",
	"underlineHover",
	"underlineAlways",
	"button",
	"focusVisible"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Link/getTextDecoration.js
var getTextDecoration = ({ theme, ownerState }) => {
	const transformedColor = ownerState.color;
	if ("colorSpace" in theme && theme.colorSpace) {
		const color = getPath(theme, `palette.${transformedColor}.main`) || getPath(theme, `palette.${transformedColor}`) || ownerState.color;
		return theme.alpha(color, .4);
	}
	const color = getPath(theme, `palette.${transformedColor}.main`, false) || getPath(theme, `palette.${transformedColor}`, false) || ownerState.color;
	const channelColor = getPath(theme, `palette.${transformedColor}.mainChannel`) || getPath(theme, `palette.${transformedColor}Channel`);
	if ("vars" in theme && channelColor) return `rgba(${channelColor} / 0.4)`;
	return alpha(color, .4);
};
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Link/Link.js
var v6Colors = {
	primary: true,
	secondary: true,
	error: true,
	info: true,
	success: true,
	warning: true,
	textPrimary: true,
	textSecondary: true,
	textDisabled: true
};
var useUtilityClasses$25 = (ownerState) => {
	const { classes, component, focusVisible, underline } = ownerState;
	return composeClasses({ root: [
		"root",
		`underline${capitalize_default(underline)}`,
		component === "button" && "button",
		focusVisible && "focusVisible"
	] }, getLinkUtilityClass, classes);
};
var LinkRoot = styled$2(Typography, {
	name: "MuiLink",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[`underline${capitalize_default(ownerState.underline)}`],
			ownerState.component === "button" && styles.button
		];
	}
})(memoTheme(({ theme }) => {
	return { variants: [
		{
			props: { underline: "none" },
			style: { textDecoration: "none" }
		},
		{
			props: { underline: "hover" },
			style: {
				textDecoration: "none",
				"&:hover": { textDecoration: "underline" }
			}
		},
		{
			props: { underline: "always" },
			style: {
				textDecoration: "underline",
				"&:hover": { textDecorationColor: "inherit" }
			}
		},
		{
			props: ({ underline, ownerState }) => underline === "always" && ownerState.color !== "inherit",
			style: { textDecorationColor: "var(--Link-underlineColor)" }
		},
		{
			props: ({ underline, ownerState }) => underline === "always" && ownerState.color === "inherit",
			style: theme.colorSpace ? { textDecorationColor: theme.alpha("currentColor", .4) } : null
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: {
				underline: "always",
				color
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette[color].main, .4) }
		})),
		{
			props: {
				underline: "always",
				color: "textPrimary"
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette.text.primary, .4) }
		},
		{
			props: {
				underline: "always",
				color: "textSecondary"
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette.text.secondary, .4) }
		},
		{
			props: {
				underline: "always",
				color: "textDisabled"
			},
			style: { "--Link-underlineColor": (theme.vars || theme).palette.text.disabled }
		},
		{
			props: { component: "button" },
			style: {
				position: "relative",
				WebkitTapHighlightColor: "transparent",
				backgroundColor: "transparent",
				outline: 0,
				border: 0,
				margin: 0,
				borderRadius: 0,
				padding: 0,
				cursor: "pointer",
				userSelect: "none",
				verticalAlign: "middle",
				MozAppearance: "none",
				WebkitAppearance: "none",
				"&::-moz-focus-inner": { borderStyle: "none" },
				[`&.${linkClasses.focusVisible}`]: { outline: "auto" }
			}
		}
	] };
}));
var Link = /* @__PURE__ */ import_react.forwardRef(function Link(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiLink"
	});
	const theme = useTheme$3();
	const { className, color = "primary", component = "a", onBlur, onFocus, TypographyClasses, underline = "always", variant = "inherit", sx, ...other } = props;
	const [focusVisible, setFocusVisible] = import_react.useState(false);
	const handleBlur = (event) => {
		if (!isFocusVisible(event.target)) setFocusVisible(false);
		if (onBlur) onBlur(event);
	};
	const handleFocus = (event) => {
		if (isFocusVisible(event.target)) setFocusVisible(true);
		if (onFocus) onFocus(event);
	};
	const ownerState = {
		...props,
		color,
		component,
		focusVisible,
		underline,
		variant
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkRoot, {
		color,
		className: clsx(useUtilityClasses$25(ownerState).root, className),
		classes: TypographyClasses,
		component,
		onBlur: handleBlur,
		onFocus: handleFocus,
		ref,
		ownerState,
		variant,
		...other,
		sx: [...v6Colors[color] === void 0 ? [{ color }] : [], ...Array.isArray(sx) ? sx : [sx]],
		style: {
			...other.style,
			...underline === "always" && color !== "inherit" && !v6Colors[color] && { "--Link-underlineColor": getTextDecoration({
				theme,
				ownerState
			}) }
		}
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/List/ListContext.js
/**
* @ignore - internal component.
*/
var ListContext = /* @__PURE__ */ import_react.createContext({});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/List/listClasses.js
function getListUtilityClass(slot) {
	return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", [
	"root",
	"padding",
	"dense",
	"subheader"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/List/List.js
var useUtilityClasses$24 = (ownerState) => {
	const { classes, disablePadding, dense, subheader } = ownerState;
	return composeClasses({ root: [
		"root",
		!disablePadding && "padding",
		dense && "dense",
		subheader && "subheader"
	] }, getListUtilityClass, classes);
};
var ListRoot = styled$2("ul", {
	name: "MuiList",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			!ownerState.disablePadding && styles.padding,
			ownerState.dense && styles.dense,
			ownerState.subheader && styles.subheader
		];
	}
})({
	listStyle: "none",
	margin: 0,
	padding: 0,
	position: "relative",
	variants: [{
		props: ({ ownerState }) => !ownerState.disablePadding,
		style: {
			paddingTop: 8,
			paddingBottom: 8
		}
	}, {
		props: ({ ownerState }) => ownerState.subheader,
		style: { paddingTop: 0 }
	}]
});
var List$1 = /* @__PURE__ */ import_react.forwardRef(function List(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiList"
	});
	const { children, className, component = "ul", dense = false, disablePadding = false, subheader, ...other } = props;
	const context = import_react.useMemo(() => ({ dense }), [dense]);
	const ownerState = {
		...props,
		component,
		dense,
		disablePadding
	};
	const classes = useUtilityClasses$24(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: context,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListRoot, {
			as: component,
			className: clsx(classes.root, className),
			ref,
			ownerState,
			...other,
			children: [subheader, children]
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItem/listItemClasses.js
function getListItemUtilityClass(slot) {
	return generateUtilityClass("MuiListItem", slot);
}
generateUtilityClasses("MuiListItem", [
	"root",
	"container",
	"dense",
	"alignItemsFlexStart",
	"divider",
	"gutters",
	"padding",
	"secondaryAction"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemButton/listItemButtonClasses.js
function getListItemButtonUtilityClass(slot) {
	return generateUtilityClass("MuiListItemButton", slot);
}
var listItemButtonClasses = generateUtilityClasses("MuiListItemButton", [
	"root",
	"focusVisible",
	"dense",
	"alignItemsFlexStart",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemButton/ListItemButton.js
var overridesResolver$2 = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.dense && styles.dense,
		ownerState.alignItems === "flex-start" && styles.alignItemsFlexStart,
		ownerState.divider && styles.divider,
		!ownerState.disableGutters && styles.gutters
	];
};
var useUtilityClasses$23 = (ownerState) => {
	const { alignItems, classes, dense, disabled, disableGutters, divider, selected } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		dense && "dense",
		!disableGutters && "gutters",
		divider && "divider",
		disabled && "disabled",
		alignItems === "flex-start" && "alignItemsFlexStart",
		selected && "selected"
	] }, getListItemButtonUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var ListItemButtonRoot = styled$2(ButtonBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiListItemButton",
	slot: "Root",
	overridesResolver: overridesResolver$2
})(memoTheme(({ theme }) => ({
	display: "flex",
	flexGrow: 1,
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	textDecoration: "none",
	minWidth: 0,
	boxSizing: "border-box",
	textAlign: "left",
	paddingTop: 8,
	paddingBottom: 8,
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shortest }),
	"&:hover": {
		textDecoration: "none",
		backgroundColor: (theme.vars || theme).palette.action.hover,
		"@media (hover: none)": { backgroundColor: "transparent" }
	},
	[`&.${listItemButtonClasses.selected}`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
		[`&.${listItemButtonClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) }
	},
	[`&.${listItemButtonClasses.selected}:hover`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
		"@media (hover: none)": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity) }
	},
	[`&.${listItemButtonClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette.action.focus },
	[`&.${listItemButtonClasses.disabled}`]: { opacity: (theme.vars || theme).palette.action.disabledOpacity },
	variants: [
		{
			props: ({ ownerState }) => ownerState.divider,
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				backgroundClip: "padding-box"
			}
		},
		{
			props: { alignItems: "flex-start" },
			style: { alignItems: "flex-start" }
		},
		{
			props: ({ ownerState }) => !ownerState.disableGutters,
			style: {
				paddingLeft: 16,
				paddingRight: 16
			}
		},
		{
			props: ({ ownerState }) => ownerState.dense,
			style: {
				paddingTop: 4,
				paddingBottom: 4
			}
		}
	]
})));
var ListItemButton = /* @__PURE__ */ import_react.forwardRef(function ListItemButton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItemButton"
	});
	const { alignItems = "center", autoFocus = false, component = "div", children, dense = false, disableGutters = false, divider = false, focusVisibleClassName, selected = false, className, ...other } = props;
	const context = import_react.useContext(ListContext);
	const childContext = import_react.useMemo(() => ({
		dense: dense || context.dense || false,
		alignItems,
		disableGutters
	}), [
		alignItems,
		context.dense,
		dense,
		disableGutters
	]);
	const listItemRef = import_react.useRef(null);
	useEnhancedEffect_default(() => {
		if (autoFocus) {
			if (listItemRef.current) listItemRef.current.focus();
		}
	}, [autoFocus]);
	const ownerState = {
		...props,
		alignItems,
		dense: childContext.dense,
		disableGutters,
		divider,
		selected
	};
	const classes = useUtilityClasses$23(ownerState);
	const handleRef = useForkRef_default(listItemRef, ref);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemButtonRoot, {
			ref: handleRef,
			href: other.href || other.to,
			component: (other.href || other.to) && component === "div" ? "button" : component,
			focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
			ownerState,
			className: clsx(classes.root, className),
			...other,
			classes,
			children
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemSecondaryAction/listItemSecondaryActionClasses.js
function getListItemSecondaryActionClassesUtilityClass(slot) {
	return generateUtilityClass("MuiListItemSecondaryAction", slot);
}
generateUtilityClasses("MuiListItemSecondaryAction", ["root", "disableGutters"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemSecondaryAction/ListItemSecondaryAction.js
var useUtilityClasses$22 = (ownerState) => {
	const { disableGutters, classes } = ownerState;
	return composeClasses({ root: ["root", disableGutters && "disableGutters"] }, getListItemSecondaryActionClassesUtilityClass, classes);
};
var ListItemSecondaryActionRoot = styled$2("div", {
	name: "MuiListItemSecondaryAction",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.disableGutters && styles.disableGutters];
	}
})({
	position: "absolute",
	right: 16,
	top: "50%",
	transform: "translateY(-50%)",
	variants: [{
		props: ({ ownerState }) => ownerState.disableGutters,
		style: { right: 0 }
	}]
});
/**
* Must be used as the last child of ListItem to function properly.
*
* @deprecated Use the `secondaryAction` prop in the `ListItem` component instead. This component will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
*/
var ListItemSecondaryAction = /* @__PURE__ */ import_react.forwardRef(function ListItemSecondaryAction(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItemSecondaryAction"
	});
	const { className, ...other } = props;
	const context = import_react.useContext(ListContext);
	const ownerState = {
		...props,
		disableGutters: context.disableGutters
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemSecondaryActionRoot, {
		className: clsx(useUtilityClasses$22(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
ListItemSecondaryAction.muiName = "ListItemSecondaryAction";
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItem/ListItem.js
var overridesResolver$1 = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.dense && styles.dense,
		ownerState.alignItems === "flex-start" && styles.alignItemsFlexStart,
		ownerState.divider && styles.divider,
		!ownerState.disableGutters && styles.gutters,
		!ownerState.disablePadding && styles.padding,
		ownerState.hasSecondaryAction && styles.secondaryAction
	];
};
var useUtilityClasses$21 = (ownerState) => {
	const { alignItems, classes, dense, disableGutters, disablePadding, divider, hasSecondaryAction } = ownerState;
	return composeClasses({
		root: [
			"root",
			dense && "dense",
			!disableGutters && "gutters",
			!disablePadding && "padding",
			divider && "divider",
			alignItems === "flex-start" && "alignItemsFlexStart",
			hasSecondaryAction && "secondaryAction"
		],
		container: ["container"],
		secondaryAction: ["secondaryAction"]
	}, getListItemUtilityClass, classes);
};
var ListItemRoot = styled$2("div", {
	name: "MuiListItem",
	slot: "Root",
	overridesResolver: overridesResolver$1
})(memoTheme(({ theme }) => ({
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	textDecoration: "none",
	width: "100%",
	boxSizing: "border-box",
	textAlign: "left",
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disablePadding,
			style: {
				paddingTop: 8,
				paddingBottom: 8
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && ownerState.dense,
			style: {
				paddingTop: 4,
				paddingBottom: 4
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && !ownerState.disableGutters,
			style: {
				paddingLeft: 16,
				paddingRight: 16
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && !!ownerState.secondaryAction,
			style: { paddingRight: 48 }
		},
		{
			props: ({ ownerState }) => !!ownerState.secondaryAction,
			style: { [`& > .${listItemButtonClasses.root}`]: { paddingRight: 48 } }
		},
		{
			props: { alignItems: "flex-start" },
			style: { alignItems: "flex-start" }
		},
		{
			props: ({ ownerState }) => ownerState.divider,
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				backgroundClip: "padding-box"
			}
		},
		{
			props: ({ ownerState }) => ownerState.button,
			style: {
				transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shortest }),
				"&:hover": {
					textDecoration: "none",
					backgroundColor: (theme.vars || theme).palette.action.hover,
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.hasSecondaryAction,
			style: { paddingRight: 48 }
		}
	]
})));
var ListItemContainer = styled$2("li", {
	name: "MuiListItem",
	slot: "Container"
})({ position: "relative" });
/**
* Uses an additional container component if `ListItemSecondaryAction` is the last child.
*/
var ListItem = /* @__PURE__ */ import_react.forwardRef(function ListItem(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItem"
	});
	const { alignItems = "center", children: childrenProp, className, component: componentProp, components = {}, componentsProps = {}, ContainerComponent = "li", ContainerProps: { className: ContainerClassName, ...ContainerProps } = {}, dense = false, disableGutters = false, disablePadding = false, divider = false, secondaryAction, slotProps = {}, slots = {}, ...other } = props;
	const context = import_react.useContext(ListContext);
	const childContext = import_react.useMemo(() => ({
		dense: dense || context.dense || false,
		alignItems,
		disableGutters
	}), [
		alignItems,
		context.dense,
		dense,
		disableGutters
	]);
	const listItemRef = import_react.useRef(null);
	const children = import_react.Children.toArray(childrenProp);
	const hasSecondaryAction = children.length && isMuiElement_default(children[children.length - 1], ["ListItemSecondaryAction"]);
	const ownerState = {
		...props,
		alignItems,
		dense: childContext.dense,
		disableGutters,
		disablePadding,
		divider,
		hasSecondaryAction
	};
	const classes = useUtilityClasses$21(ownerState);
	const handleRef = useForkRef_default(listItemRef, ref);
	const [SecondaryActionSlot, secondaryActionSlotProps] = useSlot("secondaryAction", {
		elementType: ListItemSecondaryAction,
		externalForwardedProps: {
			slots,
			slotProps
		},
		ownerState,
		className: classes.secondaryAction
	});
	const Root = slots.root || components.Root || ListItemRoot;
	const rootProps = slotProps.root || componentsProps.root || {};
	const componentProps = {
		className: clsx(classes.root, rootProps.className, className),
		...other
	};
	let Component = componentProp || "li";
	if (hasSecondaryAction) {
		Component = !componentProps.component && !componentProp ? "div" : Component;
		if (ContainerComponent === "li") {
			if (Component === "li") Component = "div";
			else if (componentProps.component === "li") componentProps.component = "div";
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
			value: childContext,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemContainer, {
				as: ContainerComponent,
				className: clsx(classes.container, ContainerClassName),
				ref: handleRef,
				ownerState,
				...ContainerProps,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
					...rootProps,
					...!isHostComponent(Root) && {
						as: Component,
						ownerState: {
							...ownerState,
							...rootProps.ownerState
						}
					},
					...componentProps,
					children
				}), children.pop()]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
			...rootProps,
			as: Component,
			ref: handleRef,
			...!isHostComponent(Root) && { ownerState: {
				...ownerState,
				...rootProps.ownerState
			} },
			...componentProps,
			children: [children, secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecondaryActionSlot, {
				...secondaryActionSlotProps,
				children: secondaryAction
			})]
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemAvatar/listItemAvatarClasses.js
function getListItemAvatarUtilityClass(slot) {
	return generateUtilityClass("MuiListItemAvatar", slot);
}
generateUtilityClasses("MuiListItemAvatar", ["root", "alignItemsFlexStart"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemAvatar/ListItemAvatar.js
var useUtilityClasses$20 = (ownerState) => {
	const { alignItems, classes } = ownerState;
	return composeClasses({ root: ["root", alignItems === "flex-start" && "alignItemsFlexStart"] }, getListItemAvatarUtilityClass, classes);
};
var ListItemAvatarRoot = styled$2("div", {
	name: "MuiListItemAvatar",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.alignItems === "flex-start" && styles.alignItemsFlexStart];
	}
})({
	minWidth: 56,
	flexShrink: 0,
	variants: [{
		props: { alignItems: "flex-start" },
		style: { marginTop: 8 }
	}]
});
/**
* A simple wrapper to apply `List` styles to an `Avatar`.
*/
var ListItemAvatar = /* @__PURE__ */ import_react.forwardRef(function ListItemAvatar(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItemAvatar"
	});
	const { className, ...other } = props;
	const context = import_react.useContext(ListContext);
	const ownerState = {
		...props,
		alignItems: context.alignItems
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemAvatarRoot, {
		className: clsx(useUtilityClasses$20(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemIcon/listItemIconClasses.js
function getListItemIconUtilityClass(slot) {
	return generateUtilityClass("MuiListItemIcon", slot);
}
var listItemIconClasses = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemIcon/ListItemIcon.js
var useUtilityClasses$19 = (ownerState) => {
	const { alignItems, classes } = ownerState;
	return composeClasses({ root: ["root", alignItems === "flex-start" && "alignItemsFlexStart"] }, getListItemIconUtilityClass, classes);
};
var ListItemIconRoot = styled$2("div", {
	name: "MuiListItemIcon",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.alignItems === "flex-start" && styles.alignItemsFlexStart];
	}
})(memoTheme(({ theme }) => ({
	minWidth: 56,
	color: (theme.vars || theme).palette.action.active,
	flexShrink: 0,
	display: "inline-flex",
	variants: [{
		props: { alignItems: "flex-start" },
		style: { marginTop: 8 }
	}]
})));
/**
* A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
*/
var ListItemIcon = /* @__PURE__ */ import_react.forwardRef(function ListItemIcon(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItemIcon"
	});
	const { className, ...other } = props;
	const context = import_react.useContext(ListContext);
	const ownerState = {
		...props,
		alignItems: context.alignItems
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemIconRoot, {
		className: clsx(useUtilityClasses$19(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemText/listItemTextClasses.js
function getListItemTextUtilityClass(slot) {
	return generateUtilityClass("MuiListItemText", slot);
}
var listItemTextClasses = generateUtilityClasses("MuiListItemText", [
	"root",
	"multiline",
	"dense",
	"inset",
	"primary",
	"secondary"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/ListItemText/ListItemText.js
var useUtilityClasses$18 = (ownerState) => {
	const { classes, inset, primary, secondary, dense } = ownerState;
	return composeClasses({
		root: [
			"root",
			inset && "inset",
			dense && "dense",
			primary && secondary && "multiline"
		],
		primary: ["primary"],
		secondary: ["secondary"]
	}, getListItemTextUtilityClass, classes);
};
var ListItemTextRoot = styled$2("div", {
	name: "MuiListItemText",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${listItemTextClasses.primary}`]: styles.primary },
			{ [`& .${listItemTextClasses.secondary}`]: styles.secondary },
			styles.root,
			ownerState.inset && styles.inset,
			ownerState.primary && ownerState.secondary && styles.multiline,
			ownerState.dense && styles.dense
		];
	}
})({
	flex: "1 1 auto",
	minWidth: 0,
	marginTop: 4,
	marginBottom: 4,
	[`.${typographyClasses.root}:where(& .${listItemTextClasses.primary})`]: { display: "block" },
	[`.${typographyClasses.root}:where(& .${listItemTextClasses.secondary})`]: { display: "block" },
	variants: [{
		props: ({ ownerState }) => ownerState.primary && ownerState.secondary,
		style: {
			marginTop: 6,
			marginBottom: 6
		}
	}, {
		props: ({ ownerState }) => ownerState.inset,
		style: { paddingLeft: 56 }
	}]
});
var ListItemText = /* @__PURE__ */ import_react.forwardRef(function ListItemText(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItemText"
	});
	const { children, className, disableTypography = false, inset = false, primary: primaryProp, primaryTypographyProps, secondary: secondaryProp, secondaryTypographyProps, slots = {}, slotProps = {}, ...other } = props;
	const { dense } = import_react.useContext(ListContext);
	let primary = primaryProp != null ? primaryProp : children;
	let secondary = secondaryProp;
	const ownerState = {
		...props,
		disableTypography,
		inset,
		primary: !!primary,
		secondary: !!secondary,
		dense
	};
	const classes = useUtilityClasses$18(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps: {
			primary: primaryTypographyProps,
			secondary: secondaryTypographyProps,
			...slotProps
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		className: clsx(classes.root, className),
		elementType: ListItemTextRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		ref
	});
	const [PrimarySlot, primarySlotProps] = useSlot("primary", {
		className: classes.primary,
		elementType: Typography,
		externalForwardedProps,
		ownerState
	});
	const [SecondarySlot, secondarySlotProps] = useSlot("secondary", {
		className: classes.secondary,
		elementType: Typography,
		externalForwardedProps,
		ownerState
	});
	if (primary != null && primary.type !== Typography && !disableTypography) primary = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimarySlot, {
		variant: dense ? "body2" : "body1",
		component: primarySlotProps?.variant ? void 0 : "span",
		...primarySlotProps,
		children: primary
	});
	if (secondary != null && secondary.type !== Typography && !disableTypography) secondary = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecondarySlot, {
		variant: "body2",
		color: "textSecondary",
		...secondarySlotProps,
		children: secondary
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [primary, secondary]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/utils/getScrollbarSize.js
var getScrollbarSize_default = getScrollbarSize;
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/MenuList/MenuList.js
function nextItem$1(list, item, disableListWrap) {
	if (list === item) return list.firstChild;
	if (item && item.nextElementSibling) return item.nextElementSibling;
	return disableListWrap ? null : list.firstChild;
}
function previousItem$1(list, item, disableListWrap) {
	if (list === item) return disableListWrap ? list.firstChild : list.lastChild;
	if (item && item.previousElementSibling) return item.previousElementSibling;
	return disableListWrap ? null : list.lastChild;
}
function textCriteriaMatches(nextFocus, textCriteria) {
	if (textCriteria === void 0) return true;
	let text = nextFocus.innerText;
	if (text === void 0) text = nextFocus.textContent;
	text = text.trim().toLowerCase();
	if (text.length === 0) return false;
	if (textCriteria.repeating) return text[0] === textCriteria.keys[0];
	return text.startsWith(textCriteria.keys.join(""));
}
function moveFocus$1(list, currentFocus, disableListWrap, disabledItemsFocusable, traversalFunction, textCriteria) {
	let wrappedOnce = false;
	let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);
	while (nextFocus) {
		if (nextFocus === list.firstChild) {
			if (wrappedOnce) return false;
			wrappedOnce = true;
		}
		const nextFocusDisabled = disabledItemsFocusable ? false : nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
		if (!nextFocus.hasAttribute("tabindex") || !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled) nextFocus = traversalFunction(list, nextFocus, disableListWrap);
		else {
			nextFocus.focus();
			return true;
		}
	}
	return false;
}
/**
* A permanently displayed menu following https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/.
* It's exposed to help customization of the [`Menu`](/material-ui/api/menu/) component if you
* use it separately you need to move focus into the component manually. Once
* the focus is placed inside the component it is fully keyboard accessible.
*/
var MenuList = /* @__PURE__ */ import_react.forwardRef(function MenuList(props, ref) {
	const { actions, autoFocus = false, autoFocusItem = false, children, className, disabledItemsFocusable = false, disableListWrap = false, onKeyDown, variant = "selectedMenu", ...other } = props;
	const listRef = import_react.useRef(null);
	const textCriteriaRef = import_react.useRef({
		keys: [],
		repeating: true,
		previousKeyMatched: true,
		lastTime: null
	});
	useEnhancedEffect_default(() => {
		if (autoFocus) listRef.current.focus();
	}, [autoFocus]);
	import_react.useImperativeHandle(actions, () => ({ adjustStyleForScrollbar: (containerElement, { direction }) => {
		const noExplicitWidth = !listRef.current.style.width;
		if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
			const scrollbarSize = `${getScrollbarSize_default(ownerWindow_default(containerElement))}px`;
			listRef.current.style[direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
			listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
		}
		return listRef.current;
	} }), []);
	const handleKeyDown = (event) => {
		const list = listRef.current;
		const key = event.key;
		if (event.ctrlKey || event.metaKey || event.altKey) {
			if (onKeyDown) onKeyDown(event);
			return;
		}
		/**
		* @type {Element} - will always be defined since we are in a keydown handler
		* attached to an element. A keydown event is either dispatched to the activeElement
		* or document.body or document.documentElement. Only the first case will
		* trigger this specific handler.
		*/
		const currentFocus = getActiveElement_default(ownerDocument_default(list));
		if (key === "ArrowDown") {
			event.preventDefault();
			moveFocus$1(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem$1);
		} else if (key === "ArrowUp") {
			event.preventDefault();
			moveFocus$1(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem$1);
		} else if (key === "Home") {
			event.preventDefault();
			moveFocus$1(list, null, disableListWrap, disabledItemsFocusable, nextItem$1);
		} else if (key === "End") {
			event.preventDefault();
			moveFocus$1(list, null, disableListWrap, disabledItemsFocusable, previousItem$1);
		} else if (key.length === 1) {
			const criteria = textCriteriaRef.current;
			const lowerKey = key.toLowerCase();
			const currTime = performance.now();
			if (criteria.keys.length > 0) {
				if (currTime - criteria.lastTime > 500) {
					criteria.keys = [];
					criteria.repeating = true;
					criteria.previousKeyMatched = true;
				} else if (criteria.repeating && lowerKey !== criteria.keys[0]) criteria.repeating = false;
			}
			criteria.lastTime = currTime;
			criteria.keys.push(lowerKey);
			const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
			if (criteria.previousKeyMatched && (keepFocusOnCurrent || moveFocus$1(list, currentFocus, false, disabledItemsFocusable, nextItem$1, criteria))) event.preventDefault();
			else criteria.previousKeyMatched = false;
		}
		if (onKeyDown) onKeyDown(event);
	};
	const handleRef = useForkRef_default(listRef, ref);
	/**
	* the index of the item should receive focus
	* in a `variant="selectedMenu"` it's the first `selected` item
	* otherwise it's the very first item.
	*/
	let activeItemIndex = -1;
	import_react.Children.forEach(children, (child, index) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) {
			if (activeItemIndex === index) {
				activeItemIndex += 1;
				if (activeItemIndex >= children.length) activeItemIndex = -1;
			}
			return;
		}
		if (!child.props.disabled) {
			if (variant === "selectedMenu" && child.props.selected) activeItemIndex = index;
			else if (activeItemIndex === -1) activeItemIndex = index;
		}
		if (activeItemIndex === index && (child.props.disabled || child.props.muiSkipListHighlight || child.type.muiSkipListHighlight)) {
			activeItemIndex += 1;
			if (activeItemIndex >= children.length) activeItemIndex = -1;
		}
	});
	const items = import_react.Children.map(children, (child, index) => {
		if (index === activeItemIndex) {
			const newChildProps = {};
			if (autoFocusItem) newChildProps.autoFocus = true;
			if (child.props.tabIndex === void 0 && variant === "selectedMenu") newChildProps.tabIndex = 0;
			return /* @__PURE__ */ import_react.cloneElement(child, newChildProps);
		}
		return child;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List$1, {
		role: "menu",
		ref: handleRef,
		className,
		onKeyDown: handleKeyDown,
		tabIndex: autoFocus ? 0 : -1,
		...other,
		children: items
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Popover/popoverClasses.js
function getPopoverUtilityClass(slot) {
	return generateUtilityClass("MuiPopover", slot);
}
generateUtilityClasses("MuiPopover", ["root", "paper"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Popover/Popover.js
function getOffsetTop(rect, vertical) {
	let offset = 0;
	if (typeof vertical === "number") offset = vertical;
	else if (vertical === "center") offset = rect.height / 2;
	else if (vertical === "bottom") offset = rect.height;
	return offset;
}
function getOffsetLeft(rect, horizontal) {
	let offset = 0;
	if (typeof horizontal === "number") offset = horizontal;
	else if (horizontal === "center") offset = rect.width / 2;
	else if (horizontal === "right") offset = rect.width;
	return offset;
}
function getTransformOriginValue(transformOrigin) {
	return [transformOrigin.horizontal, transformOrigin.vertical].map((n) => typeof n === "number" ? `${n}px` : n).join(" ");
}
function resolveAnchorEl(anchorEl) {
	return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
var useUtilityClasses$17 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({
		root: ["root"],
		paper: ["paper"]
	}, getPopoverUtilityClass, classes);
};
var PopoverRoot = styled$2(Modal, {
	name: "MuiPopover",
	slot: "Root"
})({});
var PopoverPaper = styled$2(Paper, {
	name: "MuiPopover",
	slot: "Paper"
})({
	position: "absolute",
	overflowY: "auto",
	overflowX: "hidden",
	minWidth: 16,
	minHeight: 16,
	maxWidth: "calc(100% - 32px)",
	maxHeight: "calc(100% - 32px)",
	outline: 0
});
var Popover = /* @__PURE__ */ import_react.forwardRef(function Popover(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiPopover"
	});
	const { action, anchorEl, anchorOrigin = {
		vertical: "top",
		horizontal: "left"
	}, anchorPosition, anchorReference = "anchorEl", children, className, container: containerProp, elevation = 8, marginThreshold = 16, open, PaperProps: PaperPropsProp = {}, slots = {}, slotProps = {}, transformOrigin = {
		vertical: "top",
		horizontal: "left"
	}, TransitionComponent, transitionDuration: transitionDurationProp = "auto", TransitionProps = {}, disableScrollLock = false, ...other } = props;
	const paperRef = import_react.useRef();
	const ownerState = {
		...props,
		anchorOrigin,
		anchorReference,
		elevation,
		marginThreshold,
		transformOrigin,
		TransitionComponent,
		transitionDuration: transitionDurationProp,
		TransitionProps
	};
	const classes = useUtilityClasses$17(ownerState);
	const getAnchorOffset = import_react.useCallback(() => {
		if (anchorReference === "anchorPosition") return anchorPosition;
		const resolvedAnchorEl = resolveAnchorEl(anchorEl);
		const anchorRect = (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument_default(paperRef.current).body).getBoundingClientRect();
		return {
			top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
			left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
		};
	}, [
		anchorEl,
		anchorOrigin.horizontal,
		anchorOrigin.vertical,
		anchorPosition,
		anchorReference
	]);
	const getTransformOrigin = import_react.useCallback((elemRect) => {
		return {
			vertical: getOffsetTop(elemRect, transformOrigin.vertical),
			horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
		};
	}, [transformOrigin.horizontal, transformOrigin.vertical]);
	const getPositioningStyle = import_react.useCallback((element) => {
		const elemRect = {
			width: element.offsetWidth,
			height: element.offsetHeight
		};
		const elemTransformOrigin = getTransformOrigin(elemRect);
		if (anchorReference === "none") return {
			top: null,
			left: null,
			transformOrigin: getTransformOriginValue(elemTransformOrigin)
		};
		const anchorOffset = getAnchorOffset();
		let top = anchorOffset.top - elemTransformOrigin.vertical;
		let left = anchorOffset.left - elemTransformOrigin.horizontal;
		const bottom = top + elemRect.height;
		const right = left + elemRect.width;
		const containerWindow = ownerWindow_default(resolveAnchorEl(anchorEl));
		const heightThreshold = containerWindow.innerHeight - marginThreshold;
		const widthThreshold = containerWindow.innerWidth - marginThreshold;
		if (marginThreshold !== null && top < marginThreshold) {
			const diff = top - marginThreshold;
			top -= diff;
			elemTransformOrigin.vertical += diff;
		} else if (marginThreshold !== null && bottom > heightThreshold) {
			const diff = bottom - heightThreshold;
			top -= diff;
			elemTransformOrigin.vertical += diff;
		}
		if (marginThreshold !== null && left < marginThreshold) {
			const diff = left - marginThreshold;
			left -= diff;
			elemTransformOrigin.horizontal += diff;
		} else if (right > widthThreshold) {
			const diff = right - widthThreshold;
			left -= diff;
			elemTransformOrigin.horizontal += diff;
		}
		return {
			top: `${Math.round(top)}px`,
			left: `${Math.round(left)}px`,
			transformOrigin: getTransformOriginValue(elemTransformOrigin)
		};
	}, [
		anchorEl,
		anchorReference,
		getAnchorOffset,
		getTransformOrigin,
		marginThreshold
	]);
	const [isPositioned, setIsPositioned] = import_react.useState(open);
	const setPositioningStyles = import_react.useCallback(() => {
		const element = paperRef.current;
		if (!element) return;
		const positioning = getPositioningStyle(element);
		if (positioning.top !== null) element.style.setProperty("top", positioning.top);
		if (positioning.left !== null) element.style.left = positioning.left;
		element.style.transformOrigin = positioning.transformOrigin;
		setIsPositioned(true);
	}, [getPositioningStyle]);
	import_react.useEffect(() => {
		if (disableScrollLock) window.addEventListener("scroll", setPositioningStyles);
		return () => window.removeEventListener("scroll", setPositioningStyles);
	}, [
		anchorEl,
		disableScrollLock,
		setPositioningStyles
	]);
	const handleEntering = () => {
		setPositioningStyles();
	};
	const handleExited = () => {
		setIsPositioned(false);
	};
	import_react.useEffect(() => {
		if (open) setPositioningStyles();
	});
	import_react.useImperativeHandle(action, () => open ? { updatePosition: () => {
		setPositioningStyles();
	} } : null, [open, setPositioningStyles]);
	import_react.useEffect(() => {
		if (!open) return;
		const handleResize = debounce_default(() => {
			setPositioningStyles();
		});
		const containerWindow = ownerWindow_default(resolveAnchorEl(anchorEl));
		containerWindow.addEventListener("resize", handleResize);
		return () => {
			handleResize.clear();
			containerWindow.removeEventListener("resize", handleResize);
		};
	}, [
		anchorEl,
		open,
		setPositioningStyles
	]);
	let transitionDuration = transitionDurationProp;
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponent,
			...slots
		},
		slotProps: {
			transition: TransitionProps,
			paper: PaperPropsProp,
			...slotProps
		}
	};
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Grow,
		externalForwardedProps,
		ownerState,
		getSlotProps: (handlers) => ({
			...handlers,
			onEntering: (element, isAppearing) => {
				handlers.onEntering?.(element, isAppearing);
				handleEntering();
			},
			onExited: (element) => {
				handlers.onExited?.(element);
				handleExited();
			}
		}),
		additionalProps: {
			appear: true,
			in: open
		}
	});
	if (transitionDurationProp === "auto" && !TransitionSlot.muiSupportAuto) transitionDuration = void 0;
	const container = containerProp || (anchorEl ? ownerDocument_default(resolveAnchorEl(anchorEl)).body : void 0);
	const [RootSlot, { slots: rootSlotsProp, slotProps: rootSlotPropsProp, ...rootProps }] = useSlot("root", {
		ref,
		elementType: PopoverRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		shouldForwardComponentProp: true,
		additionalProps: {
			slots: { backdrop: slots.backdrop },
			slotProps: { backdrop: mergeSlotProps$1(typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop, { invisible: true }) },
			container,
			open
		},
		ownerState,
		className: clsx(classes.root, className)
	});
	const [PaperSlot, paperProps] = useSlot("paper", {
		ref: paperRef,
		className: classes.paper,
		elementType: PopoverPaper,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		additionalProps: {
			elevation,
			style: isPositioned ? void 0 : { opacity: 0 }
		},
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		...rootProps,
		...!isHostComponent(RootSlot) && {
			slots: rootSlotsProp,
			slotProps: rootSlotPropsProp,
			disableScrollLock
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
			...transitionSlotProps,
			timeout: transitionDuration,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlot, {
				...paperProps,
				children
			})
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Menu/menuClasses.js
function getMenuUtilityClass(slot) {
	return generateUtilityClass("MuiMenu", slot);
}
generateUtilityClasses("MuiMenu", [
	"root",
	"paper",
	"list"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Menu/Menu.js
var RTL_ORIGIN = {
	vertical: "top",
	horizontal: "right"
};
var LTR_ORIGIN = {
	vertical: "top",
	horizontal: "left"
};
var useUtilityClasses$16 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({
		root: ["root"],
		paper: ["paper"],
		list: ["list"]
	}, getMenuUtilityClass, classes);
};
var MenuRoot = styled$2(Popover, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiMenu",
	slot: "Root"
})({});
var MenuPaper = styled$2(PopoverPaper, {
	name: "MuiMenu",
	slot: "Paper"
})({
	maxHeight: "calc(100% - 96px)",
	WebkitOverflowScrolling: "touch"
});
var MenuMenuList = styled$2(MenuList, {
	name: "MuiMenu",
	slot: "List"
})({ outline: 0 });
var Menu = /* @__PURE__ */ import_react.forwardRef(function Menu(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiMenu"
	});
	const { autoFocus = true, children, className, disableAutoFocusItem = false, MenuListProps = {}, onClose, open, PaperProps = {}, PopoverClasses, transitionDuration = "auto", TransitionProps: { onEntering, ...TransitionProps } = {}, variant = "selectedMenu", slots = {}, slotProps = {}, ...other } = props;
	const isRtl = useRtl();
	const ownerState = {
		...props,
		autoFocus,
		disableAutoFocusItem,
		MenuListProps,
		onEntering,
		PaperProps,
		transitionDuration,
		TransitionProps,
		variant
	};
	const classes = useUtilityClasses$16(ownerState);
	const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
	const menuListActionsRef = import_react.useRef(null);
	const handleEntering = (element, isAppearing) => {
		if (menuListActionsRef.current) menuListActionsRef.current.adjustStyleForScrollbar(element, { direction: isRtl ? "rtl" : "ltr" });
		if (onEntering) onEntering(element, isAppearing);
	};
	const handleListKeyDown = (event) => {
		if (event.key === "Tab") {
			event.preventDefault();
			if (onClose) onClose(event, "tabKeyDown");
		}
	};
	/**
	* the index of the item should receive focus
	* in a `variant="selectedMenu"` it's the first `selected` item
	* otherwise it's the very first item.
	*/
	let activeItemIndex = -1;
	import_react.Children.map(children, (child, index) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) return;
		if (!child.props.disabled) {
			if (variant === "selectedMenu" && child.props.selected) activeItemIndex = index;
			else if (activeItemIndex === -1) activeItemIndex = index;
		}
	});
	const externalForwardedProps = {
		slots,
		slotProps: {
			list: MenuListProps,
			transition: TransitionProps,
			paper: PaperProps,
			...slotProps
		}
	};
	const rootSlotProps = useSlotProps({
		elementType: slots.root,
		externalSlotProps: slotProps.root,
		ownerState,
		className: [classes.root, className]
	});
	const [PaperSlot, paperSlotProps] = useSlot("paper", {
		className: classes.paper,
		elementType: MenuPaper,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		ownerState
	});
	const [ListSlot, listSlotProps] = useSlot("list", {
		className: clsx(classes.list, MenuListProps.className),
		elementType: MenuMenuList,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		getSlotProps: (handlers) => ({
			...handlers,
			onKeyDown: (event) => {
				handleListKeyDown(event);
				handlers.onKeyDown?.(event);
			}
		}),
		ownerState
	});
	const resolvedTransitionProps = typeof externalForwardedProps.slotProps.transition === "function" ? externalForwardedProps.slotProps.transition(ownerState) : externalForwardedProps.slotProps.transition;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, {
		onClose,
		anchorOrigin: {
			vertical: "bottom",
			horizontal: isRtl ? "right" : "left"
		},
		transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
		slots: {
			root: slots.root,
			paper: PaperSlot,
			backdrop: slots.backdrop,
			...slots.transition && { transition: slots.transition }
		},
		slotProps: {
			root: rootSlotProps,
			paper: paperSlotProps,
			backdrop: typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop,
			transition: {
				...resolvedTransitionProps,
				onEntering: (...args) => {
					handleEntering(...args);
					resolvedTransitionProps?.onEntering?.(...args);
				}
			}
		},
		open,
		ref,
		transitionDuration,
		ownerState,
		...other,
		classes: PopoverClasses,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSlot, {
			actions: menuListActionsRef,
			autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
			autoFocusItem,
			variant,
			...listSlotProps,
			children
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/MenuItem/menuItemClasses.js
function getMenuItemUtilityClass(slot) {
	return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemClasses = generateUtilityClasses("MuiMenuItem", [
	"root",
	"focusVisible",
	"dense",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/MenuItem/MenuItem.js
var overridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.dense && styles.dense,
		ownerState.divider && styles.divider,
		!ownerState.disableGutters && styles.gutters
	];
};
var useUtilityClasses$15 = (ownerState) => {
	const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		dense && "dense",
		disabled && "disabled",
		!disableGutters && "gutters",
		divider && "divider",
		selected && "selected"
	] }, getMenuItemUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var MenuItemRoot = styled$2(ButtonBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiMenuItem",
	slot: "Root",
	overridesResolver
})(memoTheme(({ theme }) => ({
	...theme.typography.body1,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	textDecoration: "none",
	minHeight: 48,
	paddingTop: 6,
	paddingBottom: 6,
	boxSizing: "border-box",
	whiteSpace: "nowrap",
	"&:hover": {
		textDecoration: "none",
		backgroundColor: (theme.vars || theme).palette.action.hover,
		"@media (hover: none)": { backgroundColor: "transparent" }
	},
	[`&.${menuItemClasses.selected}`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
		[`&.${menuItemClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) }
	},
	[`&.${menuItemClasses.selected}:hover`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
		"@media (hover: none)": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity) }
	},
	[`&.${menuItemClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette.action.focus },
	[`&.${menuItemClasses.disabled}`]: { opacity: (theme.vars || theme).palette.action.disabledOpacity },
	[`& + .${dividerClasses.root}`]: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	[`& + .${dividerClasses.inset}`]: { marginLeft: 52 },
	[`& .${listItemTextClasses.root}`]: {
		marginTop: 0,
		marginBottom: 0
	},
	[`& .${listItemTextClasses.inset}`]: { paddingLeft: 36 },
	[`& .${listItemIconClasses.root}`]: { minWidth: 36 },
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disableGutters,
			style: {
				paddingLeft: 16,
				paddingRight: 16
			}
		},
		{
			props: ({ ownerState }) => ownerState.divider,
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				backgroundClip: "padding-box"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.dense,
			style: { [theme.breakpoints.up("sm")]: { minHeight: "auto" } }
		},
		{
			props: ({ ownerState }) => ownerState.dense,
			style: {
				minHeight: 32,
				paddingTop: 4,
				paddingBottom: 4,
				...theme.typography.body2,
				[`& .${listItemIconClasses.root} svg`]: { fontSize: "1.25rem" }
			}
		}
	]
})));
var MenuItem = /* @__PURE__ */ import_react.forwardRef(function MenuItem(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiMenuItem"
	});
	const { autoFocus = false, component = "li", dense = false, divider = false, disableGutters = false, focusVisibleClassName, role = "menuitem", tabIndex: tabIndexProp, className, ...other } = props;
	const context = import_react.useContext(ListContext);
	const childContext = import_react.useMemo(() => ({
		dense: dense || context.dense || false,
		disableGutters
	}), [
		context.dense,
		dense,
		disableGutters
	]);
	const menuItemRef = import_react.useRef(null);
	useEnhancedEffect_default(() => {
		if (autoFocus) {
			if (menuItemRef.current) menuItemRef.current.focus();
		}
	}, [autoFocus]);
	const ownerState = {
		...props,
		dense: childContext.dense,
		divider,
		disableGutters
	};
	const classes = useUtilityClasses$15(props);
	const handleRef = useForkRef_default(menuItemRef, ref);
	let tabIndex;
	if (!props.disabled) tabIndex = tabIndexProp !== void 0 ? tabIndexProp : -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemRoot, {
			ref: handleRef,
			role,
			tabIndex,
			component,
			focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
			className: clsx(classes.root, className),
			...other,
			ownerState,
			classes
		})
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/NativeSelect/nativeSelectClasses.js
function getNativeSelectUtilityClasses(slot) {
	return generateUtilityClass("MuiNativeSelect", slot);
}
var nativeSelectClasses = generateUtilityClasses("MuiNativeSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/NativeSelect/NativeSelectInput.js
var useUtilityClasses$14 = (ownerState) => {
	const { classes, variant, disabled, multiple, open, error } = ownerState;
	return composeClasses({
		select: [
			"select",
			variant,
			disabled && "disabled",
			multiple && "multiple",
			error && "error"
		],
		icon: [
			"icon",
			`icon${capitalize_default(variant)}`,
			open && "iconOpen",
			disabled && "disabled"
		]
	}, getNativeSelectUtilityClasses, classes);
};
var StyledSelectSelect = styled$2("select", { name: "MuiNativeSelect" })(({ theme }) => ({
	MozAppearance: "none",
	WebkitAppearance: "none",
	userSelect: "none",
	borderRadius: 0,
	cursor: "pointer",
	"&:focus": { borderRadius: 0 },
	[`&.${nativeSelectClasses.disabled}`]: { cursor: "default" },
	"&[multiple]": { height: "auto" },
	"&:not([multiple]) option, &:not([multiple]) optgroup": { backgroundColor: (theme.vars || theme).palette.background.paper },
	variants: [
		{
			props: ({ ownerState }) => ownerState.variant !== "filled" && ownerState.variant !== "outlined",
			style: { "&&&": {
				paddingRight: 24,
				minWidth: 16
			} }
		},
		{
			props: { variant: "filled" },
			style: { "&&&": { paddingRight: 32 } }
		},
		{
			props: { variant: "outlined" },
			style: {
				borderRadius: (theme.vars || theme).shape.borderRadius,
				"&:focus": { borderRadius: (theme.vars || theme).shape.borderRadius },
				"&&&": { paddingRight: 32 }
			}
		}
	]
}));
var NativeSelectSelect = styled$2(StyledSelectSelect, {
	name: "MuiNativeSelect",
	slot: "Select",
	shouldForwardProp: rootShouldForwardProp,
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.select,
			styles[ownerState.variant],
			ownerState.error && styles.error,
			{ [`&.${nativeSelectClasses.multiple}`]: styles.multiple }
		];
	}
})({});
var StyledSelectIcon = styled$2("svg", { name: "MuiNativeSelect" })(({ theme }) => ({
	position: "absolute",
	right: 0,
	top: "calc(50% - .5em)",
	pointerEvents: "none",
	color: (theme.vars || theme).palette.action.active,
	[`&.${nativeSelectClasses.disabled}`]: { color: (theme.vars || theme).palette.action.disabled },
	variants: [
		{
			props: ({ ownerState }) => ownerState.open,
			style: { transform: "rotate(180deg)" }
		},
		{
			props: { variant: "filled" },
			style: { right: 7 }
		},
		{
			props: { variant: "outlined" },
			style: { right: 7 }
		}
	]
}));
var NativeSelectIcon = styled$2(StyledSelectIcon, {
	name: "MuiNativeSelect",
	slot: "Icon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.icon,
			ownerState.variant && styles[`icon${capitalize_default(ownerState.variant)}`],
			ownerState.open && styles.iconOpen
		];
	}
})({});
/**
* @ignore - internal component.
*/
var NativeSelectInput = /* @__PURE__ */ import_react.forwardRef(function NativeSelectInput(props, ref) {
	const { className, disabled, error, IconComponent, inputRef, variant = "standard", ...other } = props;
	const ownerState = {
		...props,
		disabled,
		variant,
		error
	};
	const classes = useUtilityClasses$14(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectSelect, {
		ownerState,
		className: clsx(classes.select, className),
		disabled,
		ref: inputRef || ref,
		...other
	}), props.multiple ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectIcon, {
		as: IconComponent,
		ownerState,
		className: classes.icon
	})] });
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/OutlinedInput/NotchedOutline.js
var _span$1;
var NotchedOutlineRoot$1 = styled$2("fieldset", {
	name: "MuiNotchedOutlined",
	shouldForwardProp: rootShouldForwardProp
})({
	textAlign: "left",
	position: "absolute",
	bottom: 0,
	right: 0,
	top: -5,
	left: 0,
	margin: 0,
	padding: "0 8px",
	pointerEvents: "none",
	borderRadius: "inherit",
	borderStyle: "solid",
	borderWidth: 1,
	overflow: "hidden",
	minWidth: "0%"
});
var NotchedOutlineLegend = styled$2("legend", {
	name: "MuiNotchedOutlined",
	shouldForwardProp: rootShouldForwardProp
})(memoTheme(({ theme }) => ({
	float: "unset",
	width: "auto",
	overflow: "hidden",
	variants: [
		{
			props: ({ ownerState }) => !ownerState.withLabel,
			style: {
				padding: 0,
				lineHeight: "11px",
				transition: theme.transitions.create("width", {
					duration: 150,
					easing: theme.transitions.easing.easeOut
				})
			}
		},
		{
			props: ({ ownerState }) => ownerState.withLabel,
			style: {
				display: "block",
				padding: 0,
				height: 11,
				fontSize: "0.75em",
				visibility: "hidden",
				maxWidth: .01,
				transition: theme.transitions.create("max-width", {
					duration: 50,
					easing: theme.transitions.easing.easeOut
				}),
				whiteSpace: "nowrap",
				"& > span": {
					paddingLeft: 5,
					paddingRight: 5,
					display: "inline-block",
					opacity: 0,
					visibility: "visible"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.withLabel && ownerState.notched,
			style: {
				maxWidth: "100%",
				transition: theme.transitions.create("max-width", {
					duration: 100,
					easing: theme.transitions.easing.easeOut,
					delay: 50
				})
			}
		}
	]
})));
/**
* @ignore - internal component.
*/
function NotchedOutline(props) {
	const { children, classes, className, label, notched, ...other } = props;
	const withLabel = label != null && label !== "";
	const ownerState = {
		...props,
		notched,
		withLabel
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedOutlineRoot$1, {
		"aria-hidden": true,
		className,
		ownerState,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedOutlineLegend, {
			ownerState,
			children: withLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }) : _span$1 || (_span$1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			}))
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/OutlinedInput/OutlinedInput.js
var useUtilityClasses$13 = (ownerState) => {
	const { classes } = ownerState;
	const composedClasses = composeClasses({
		root: ["root"],
		notchedOutline: ["notchedOutline"],
		input: ["input"]
	}, getOutlinedInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var OutlinedInputRoot = styled$2(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiOutlinedInput",
	slot: "Root",
	overridesResolver: rootOverridesResolver
})(memoTheme(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return {
		position: "relative",
		borderRadius: (theme.vars || theme).shape.borderRadius,
		[`&:hover .${outlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.text.primary },
		"@media (hover: none)": { [`&:hover .${outlinedInputClasses.notchedOutline}`]: { borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, .23) : borderColor } },
		[`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: { borderWidth: 2 },
		variants: [
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: { color },
				style: { [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette[color].main } }
			})),
			{
				props: {},
				style: {
					[`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.error.main },
					[`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.action.disabled }
				}
			},
			{
				props: ({ ownerState }) => ownerState.startAdornment,
				style: { paddingLeft: 14 }
			},
			{
				props: ({ ownerState }) => ownerState.endAdornment,
				style: { paddingRight: 14 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: { padding: "16.5px 14px" }
			},
			{
				props: ({ ownerState, size }) => ownerState.multiline && size === "small",
				style: { padding: "8.5px 14px" }
			}
		]
	};
}));
var NotchedOutlineRoot = styled$2(NotchedOutline, {
	name: "MuiOutlinedInput",
	slot: "NotchedOutline"
})(memoTheme(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return { borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, .23) : borderColor };
}));
var OutlinedInputInput = styled$2(InputBaseInput, {
	name: "MuiOutlinedInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme(({ theme }) => ({
	padding: "16.5px 14px",
	...!theme.vars && { "&:-webkit-autofill": {
		WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
		WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
		caretColor: theme.palette.mode === "light" ? null : "#fff",
		borderRadius: "inherit"
	} },
	...theme.vars && {
		"&:-webkit-autofill": { borderRadius: "inherit" },
		[theme.getColorSchemeSelector("dark")]: { "&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 100px #266798 inset",
			WebkitTextFillColor: "#fff",
			caretColor: "#fff"
		} }
	},
	variants: [
		{
			props: { size: "small" },
			style: { padding: "8.5px 14px" }
		},
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: { padding: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.startAdornment,
			style: { paddingLeft: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.endAdornment,
			style: { paddingRight: 0 }
		}
	]
})));
var OutlinedInput = /* @__PURE__ */ import_react.forwardRef(function OutlinedInput(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiOutlinedInput"
	});
	const { components = {}, fullWidth = false, inputComponent = "input", label, multiline = false, notched, slots = {}, slotProps = {}, type = "text", ...other } = props;
	const classes = useUtilityClasses$13(props);
	const muiFormControl = useFormControl();
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"color",
			"disabled",
			"error",
			"focused",
			"hiddenLabel",
			"size",
			"required"
		]
	});
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		disabled: fcs.disabled,
		error: fcs.error,
		focused: fcs.focused,
		formControl: muiFormControl,
		fullWidth,
		hiddenLabel: fcs.hiddenLabel,
		multiline,
		size: fcs.size,
		type
	};
	const RootSlot = slots.root ?? components.Root ?? OutlinedInputRoot;
	const InputSlot = slots.input ?? components.Input ?? OutlinedInputInput;
	const [NotchedSlot, notchedProps] = useSlot("notchedOutline", {
		elementType: NotchedOutlineRoot,
		className: classes.notchedOutline,
		shouldForwardComponentProp: true,
		ownerState,
		externalForwardedProps: {
			slots,
			slotProps
		},
		additionalProps: { label: label != null && label !== "" && fcs.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
			label,
			" ",
			"*"
		] }) : label }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
		slots: {
			root: RootSlot,
			input: InputSlot
		},
		slotProps,
		renderSuffix: (state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedSlot, {
			...notchedProps,
			notched: typeof notched !== "undefined" ? notched : Boolean(state.startAdornment || state.filled || state.focused)
		}),
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes: {
			...classes,
			notchedOutline: null
		}
	});
});
OutlinedInput.muiName = "Input";
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Select/selectClasses.js
function getSelectUtilityClasses(slot) {
	return generateUtilityClass("MuiSelect", slot);
}
var selectClasses = generateUtilityClasses("MuiSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"focused",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Select/SelectInput.js
var _span;
var SelectSelect = styled$2(StyledSelectSelect, {
	name: "MuiSelect",
	slot: "Select",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`&.${selectClasses.select}`]: styles.select },
			{ [`&.${selectClasses.select}`]: styles[ownerState.variant] },
			{ [`&.${selectClasses.error}`]: styles.error },
			{ [`&.${selectClasses.multiple}`]: styles.multiple }
		];
	}
})({ [`&.${selectClasses.select}`]: {
	height: "auto",
	minHeight: "1.4375em",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	overflow: "hidden"
} });
var SelectIcon = styled$2(StyledSelectIcon, {
	name: "MuiSelect",
	slot: "Icon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.icon,
			ownerState.variant && styles[`icon${capitalize_default(ownerState.variant)}`],
			ownerState.open && styles.iconOpen
		];
	}
})({});
var SelectNativeInput = styled$2("input", {
	shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
	name: "MuiSelect",
	slot: "NativeInput"
})({
	bottom: 0,
	left: 0,
	position: "absolute",
	opacity: 0,
	pointerEvents: "none",
	width: "100%",
	boxSizing: "border-box"
});
function areEqualValues(a, b) {
	if (typeof b === "object" && b !== null) return a === b;
	return String(a) === String(b);
}
function isEmpty(display) {
	return display == null || typeof display === "string" && !display.trim();
}
var useUtilityClasses$12 = (ownerState) => {
	const { classes, variant, disabled, multiple, open, error } = ownerState;
	return composeClasses({
		select: [
			"select",
			variant,
			disabled && "disabled",
			multiple && "multiple",
			error && "error"
		],
		icon: [
			"icon",
			`icon${capitalize_default(variant)}`,
			open && "iconOpen",
			disabled && "disabled"
		],
		nativeInput: ["nativeInput"]
	}, getSelectUtilityClasses, classes);
};
/**
* @ignore - internal component.
*/
var SelectInput = /* @__PURE__ */ import_react.forwardRef(function SelectInput(props, ref) {
	const { "aria-describedby": ariaDescribedby, "aria-label": ariaLabel, autoFocus, autoWidth, children, className, defaultOpen, defaultValue, disabled, displayEmpty, error = false, IconComponent, inputRef: inputRefProp, labelId, MenuProps = {}, multiple, name, onBlur, onChange, onClose, onFocus, onKeyDown, onMouseDown, onOpen, open: openProp, readOnly, renderValue, required, SelectDisplayProps = {}, tabIndex: tabIndexProp, type, value: valueProp, variant = "standard", ...other } = props;
	const [value, setValueState] = useControlled_default({
		controlled: valueProp,
		default: defaultValue,
		name: "Select"
	});
	const [openState, setOpenState] = useControlled_default({
		controlled: openProp,
		default: defaultOpen,
		name: "Select"
	});
	const inputRef = import_react.useRef(null);
	const displayRef = import_react.useRef(null);
	const [displayNode, setDisplayNode] = import_react.useState(null);
	const { current: isOpenControlled } = import_react.useRef(openProp != null);
	const [menuMinWidthState, setMenuMinWidthState] = import_react.useState();
	const handleRef = useForkRef_default(ref, inputRefProp);
	const handleDisplayRef = import_react.useCallback((node) => {
		displayRef.current = node;
		if (node) setDisplayNode(node);
	}, []);
	const anchorElement = displayNode?.parentNode;
	import_react.useImperativeHandle(handleRef, () => ({
		focus: () => {
			displayRef.current.focus();
		},
		node: inputRef.current,
		value
	}), [value]);
	const open = displayNode !== null && openState;
	import_react.useEffect(() => {
		if (!open || !anchorElement || autoWidth) return;
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(() => {
			setMenuMinWidthState(anchorElement.clientWidth);
		});
		observer.observe(anchorElement);
		return () => {
			observer.disconnect();
		};
	}, [
		open,
		anchorElement,
		autoWidth
	]);
	import_react.useEffect(() => {
		if (defaultOpen && openState && displayNode && !isOpenControlled) {
			setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
			displayRef.current.focus();
		}
	}, [displayNode, autoWidth]);
	import_react.useEffect(() => {
		if (autoFocus) displayRef.current.focus();
	}, [autoFocus]);
	import_react.useEffect(() => {
		if (!labelId) return;
		const label = ownerDocument_default(displayRef.current).getElementById(labelId);
		if (label) {
			const handler = () => {
				if (getSelection().isCollapsed) displayRef.current.focus();
			};
			label.addEventListener("click", handler);
			return () => {
				label.removeEventListener("click", handler);
			};
		}
	}, [labelId]);
	const update = (openParam, event) => {
		if (openParam) {
			if (onOpen) onOpen(event);
		} else if (onClose) onClose(event);
		if (!isOpenControlled) {
			setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
			setOpenState(openParam);
		}
	};
	const handleMouseDown = (event) => {
		onMouseDown?.(event);
		if (event.button !== 0) return;
		event.preventDefault();
		displayRef.current.focus();
		update(true, event);
	};
	const handleClose = (event) => {
		update(false, event);
	};
	const childrenArray = import_react.Children.toArray(children);
	const handleChange = (event) => {
		const child = childrenArray.find((childItem) => childItem.props.value === event.target.value);
		if (child === void 0) return;
		setValueState(child.props.value);
		if (onChange) onChange(event, child);
	};
	const handleItemClick = (child) => (event) => {
		let newValue;
		if (!event.currentTarget.hasAttribute("tabindex")) return;
		if (multiple) {
			newValue = Array.isArray(value) ? value.slice() : [];
			const itemIndex = value.indexOf(child.props.value);
			if (itemIndex === -1) newValue.push(child.props.value);
			else newValue.splice(itemIndex, 1);
		} else newValue = child.props.value;
		if (child.props.onClick) child.props.onClick(event);
		if (value !== newValue) {
			setValueState(newValue);
			if (onChange) {
				const nativeEvent = event.nativeEvent || event;
				const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
				Object.defineProperty(clonedEvent, "target", {
					writable: true,
					value: {
						value: newValue,
						name
					}
				});
				onChange(clonedEvent, child);
			}
		}
		if (!multiple) update(false, event);
	};
	const handleKeyDown = (event) => {
		if (!readOnly) {
			if ([
				" ",
				"ArrowUp",
				"ArrowDown",
				"Enter"
			].includes(event.key)) {
				event.preventDefault();
				update(true, event);
			}
			onKeyDown?.(event);
		}
	};
	const handleBlur = (event) => {
		if (!open && onBlur) {
			Object.defineProperty(event, "target", {
				writable: true,
				value: {
					value,
					name
				}
			});
			onBlur(event);
		}
	};
	delete other["aria-invalid"];
	let display;
	let displaySingle;
	const displayMultiple = [];
	let computeDisplay = false;
	if (isFilled({ value }) || displayEmpty) if (renderValue) display = renderValue(value);
	else computeDisplay = true;
	const items = childrenArray.map((child) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) return null;
		let selected;
		if (multiple) {
			if (!Array.isArray(value)) throw new Error(formatMuiErrorMessage(2));
			selected = value.some((v) => areEqualValues(v, child.props.value));
			if (selected && computeDisplay) displayMultiple.push(child.props.children);
		} else {
			selected = areEqualValues(value, child.props.value);
			if (selected && computeDisplay) displaySingle = child.props.children;
		}
		if (selected);
		return /* @__PURE__ */ import_react.cloneElement(child, {
			"aria-selected": selected ? "true" : "false",
			onClick: handleItemClick(child),
			onKeyUp: (event) => {
				if (event.key === " ") event.preventDefault();
				if (child.props.onKeyUp) child.props.onKeyUp(event);
			},
			role: "option",
			selected,
			value: void 0,
			"data-value": child.props.value
		});
	});
	if (computeDisplay) if (multiple) if (displayMultiple.length === 0) display = null;
	else display = displayMultiple.reduce((output, child, index) => {
		output.push(child);
		if (index < displayMultiple.length - 1) output.push(", ");
		return output;
	}, []);
	else display = displaySingle;
	let menuMinWidth = menuMinWidthState;
	if (!autoWidth && isOpenControlled && displayNode) menuMinWidth = anchorElement.clientWidth;
	let tabIndex;
	if (typeof tabIndexProp !== "undefined") tabIndex = tabIndexProp;
	else tabIndex = disabled ? null : 0;
	const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : void 0);
	const ownerState = {
		...props,
		variant,
		value,
		open,
		error
	};
	const classes = useUtilityClasses$12(ownerState);
	const paperProps = {
		...MenuProps.PaperProps,
		...typeof MenuProps.slotProps?.paper === "function" ? MenuProps.slotProps.paper(ownerState) : MenuProps.slotProps?.paper
	};
	const listProps = {
		...MenuProps.MenuListProps,
		...typeof MenuProps.slotProps?.list === "function" ? MenuProps.slotProps.list(ownerState) : MenuProps.slotProps?.list
	};
	const listboxId = useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSelect, {
			as: "div",
			ref: handleDisplayRef,
			tabIndex,
			role: "combobox",
			"aria-controls": open ? listboxId : void 0,
			"aria-disabled": disabled ? "true" : void 0,
			"aria-expanded": open ? "true" : "false",
			"aria-haspopup": "listbox",
			"aria-label": ariaLabel,
			"aria-labelledby": [labelId, buttonId].filter(Boolean).join(" ") || void 0,
			"aria-describedby": ariaDescribedby,
			"aria-required": required ? "true" : void 0,
			"aria-invalid": error ? "true" : void 0,
			onKeyDown: handleKeyDown,
			onMouseDown: disabled || readOnly ? null : handleMouseDown,
			onBlur: handleBlur,
			onFocus,
			...SelectDisplayProps,
			ownerState,
			className: clsx(SelectDisplayProps.className, classes.select, className),
			id: buttonId,
			children: isEmpty(display) ? _span || (_span = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			})) : display
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectNativeInput, {
			"aria-invalid": error,
			value: Array.isArray(value) ? value.join(",") : value,
			name,
			ref: inputRef,
			"aria-hidden": true,
			onChange: handleChange,
			tabIndex: -1,
			disabled,
			className: classes.nativeInput,
			autoFocus,
			required,
			...other,
			ownerState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			as: IconComponent,
			className: classes.icon,
			ownerState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
			id: `menu-${name || ""}`,
			anchorEl: anchorElement,
			open,
			onClose: handleClose,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "center"
			},
			transformOrigin: {
				vertical: "top",
				horizontal: "center"
			},
			...MenuProps,
			slotProps: {
				...MenuProps.slotProps,
				list: {
					"aria-labelledby": labelId,
					role: "listbox",
					"aria-multiselectable": multiple ? "true" : void 0,
					disableListWrap: true,
					id: listboxId,
					...listProps
				},
				paper: {
					...paperProps,
					style: {
						minWidth: menuMinWidth,
						...paperProps != null ? paperProps.style : null
					}
				}
			},
			children: items
		})
	] });
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Select/Select.js
var useUtilityClasses$11 = (ownerState) => {
	const { classes } = ownerState;
	const composedClasses = composeClasses({ root: ["root"] }, getSelectUtilityClasses, classes);
	return {
		...classes,
		...composedClasses
	};
};
var styledRootConfig = {
	name: "MuiSelect",
	slot: "Root",
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) && prop !== "variant"
};
var StyledInput = styled$2(Input, styledRootConfig)("");
var StyledOutlinedInput = styled$2(OutlinedInput, styledRootConfig)("");
var StyledFilledInput = styled$2(FilledInput, styledRootConfig)("");
var Select = /* @__PURE__ */ import_react.forwardRef(function Select(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiSelect",
		props: inProps
	});
	const { autoWidth = false, children, classes: classesProp = {}, className, defaultOpen = false, displayEmpty = false, IconComponent = ArrowDropDown_default, id, input, inputProps, label, labelId, MenuProps, multiple = false, native = false, onClose, onOpen, open, renderValue, SelectDisplayProps, variant: variantProp = "outlined", ...other } = props;
	const inputComponent = native ? NativeSelectInput : SelectInput;
	const fcs = formControlState({
		props,
		muiFormControl: useFormControl(),
		states: ["variant", "error"]
	});
	const variant = fcs.variant || variantProp;
	const ownerState = {
		...props,
		variant,
		classes: classesProp
	};
	const classes = useUtilityClasses$11(ownerState);
	const { root, ...restOfClasses } = classes;
	const InputComponent = input || {
		standard: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledInput, { ownerState }),
		outlined: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledOutlinedInput, {
			label,
			ownerState
		}),
		filled: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledFilledInput, { ownerState })
	}[variant];
	const inputComponentRef = useForkRef_default(ref, getReactElementRef(InputComponent));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: /* @__PURE__ */ import_react.cloneElement(InputComponent, {
		inputComponent,
		inputProps: {
			children,
			error: fcs.error,
			IconComponent,
			variant,
			type: void 0,
			multiple,
			...native ? { id } : {
				autoWidth,
				defaultOpen,
				displayEmpty,
				labelId,
				MenuProps,
				onClose,
				onOpen,
				open,
				renderValue,
				SelectDisplayProps: {
					id,
					...SelectDisplayProps
				}
			},
			...inputProps,
			classes: inputProps ? deepmerge(restOfClasses, inputProps.classes) : restOfClasses,
			...input ? input.props.inputProps : {}
		},
		...(multiple && native || displayEmpty) && variant === "outlined" ? { notched: true } : {},
		ref: inputComponentRef,
		className: clsx(InputComponent.props.className, className, classes.root),
		...!input && { variant },
		...other
	}) });
});
Select.muiName = "Select";
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Skeleton/skeletonClasses.js
function getSkeletonUtilityClass(slot) {
	return generateUtilityClass("MuiSkeleton", slot);
}
generateUtilityClasses("MuiSkeleton", [
	"root",
	"text",
	"rectangular",
	"rounded",
	"circular",
	"pulse",
	"wave",
	"withChildren",
	"fitContent",
	"heightAuto"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Skeleton/Skeleton.js
var useUtilityClasses$10 = (ownerState) => {
	const { classes, variant, animation, hasChildren, width, height } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		animation,
		hasChildren && "withChildren",
		hasChildren && !width && "fitContent",
		hasChildren && !height && "heightAuto"
	] }, getSkeletonUtilityClass, classes);
};
var pulseKeyframe = import_emotion_react_cjs.keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;
var waveKeyframe = import_emotion_react_cjs.keyframes`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`;
var pulseAnimation = typeof pulseKeyframe !== "string" ? import_emotion_react_cjs.css`
        animation: ${pulseKeyframe} 2s ease-in-out 0.5s infinite;
      ` : null;
var waveAnimation = typeof waveKeyframe !== "string" ? import_emotion_react_cjs.css`
        &::after {
          animation: ${waveKeyframe} 2s linear 0.5s infinite;
        }
      ` : null;
var SkeletonRoot = styled$2("span", {
	name: "MuiSkeleton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			ownerState.animation !== false && styles[ownerState.animation],
			ownerState.hasChildren && styles.withChildren,
			ownerState.hasChildren && !ownerState.width && styles.fitContent,
			ownerState.hasChildren && !ownerState.height && styles.heightAuto
		];
	}
})(memoTheme(({ theme }) => {
	const radiusUnit = getUnit(theme.shape.borderRadius) || "px";
	const radiusValue = toUnitless(theme.shape.borderRadius);
	return {
		display: "block",
		backgroundColor: theme.vars ? theme.vars.palette.Skeleton.bg : theme.alpha(theme.palette.text.primary, theme.palette.mode === "light" ? .11 : .13),
		height: "1.2em",
		variants: [
			{
				props: { variant: "text" },
				style: {
					marginTop: 0,
					marginBottom: 0,
					height: "auto",
					transformOrigin: "0 55%",
					transform: "scale(1, 0.60)",
					borderRadius: `${radiusValue}${radiusUnit}/${Math.round(radiusValue / .6 * 10) / 10}${radiusUnit}`,
					"&:empty:before": { content: "\"\\00a0\"" }
				}
			},
			{
				props: { variant: "circular" },
				style: { borderRadius: "50%" }
			},
			{
				props: { variant: "rounded" },
				style: { borderRadius: (theme.vars || theme).shape.borderRadius }
			},
			{
				props: ({ ownerState }) => ownerState.hasChildren,
				style: { "& > *": { visibility: "hidden" } }
			},
			{
				props: ({ ownerState }) => ownerState.hasChildren && !ownerState.width,
				style: { maxWidth: "fit-content" }
			},
			{
				props: ({ ownerState }) => ownerState.hasChildren && !ownerState.height,
				style: { height: "auto" }
			},
			{
				props: { animation: "pulse" },
				style: pulseAnimation || { animation: `${pulseKeyframe} 2s ease-in-out 0.5s infinite` }
			},
			{
				props: { animation: "wave" },
				style: {
					position: "relative",
					overflow: "hidden",
					WebkitMaskImage: "-webkit-radial-gradient(white, black)",
					"&::after": {
						background: `linear-gradient(
                90deg,
                transparent,
                ${(theme.vars || theme).palette.action.hover},
                transparent
              )`,
						content: "\"\"",
						position: "absolute",
						transform: "translateX(-100%)",
						bottom: 0,
						left: 0,
						right: 0,
						top: 0
					}
				}
			},
			{
				props: { animation: "wave" },
				style: waveAnimation || { "&::after": { animation: `${waveKeyframe} 2s linear 0.5s infinite` } }
			}
		]
	};
}));
var Skeleton = /* @__PURE__ */ import_react.forwardRef(function Skeleton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSkeleton"
	});
	const { animation = "pulse", className, component = "span", height, style, variant = "text", width, ...other } = props;
	const ownerState = {
		...props,
		animation,
		component,
		variant,
		hasChildren: Boolean(other.children)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonRoot, {
		as: component,
		ref,
		className: clsx(useUtilityClasses$10(ownerState).root, className),
		ownerState,
		...other,
		style: {
			width,
			height,
			...style
		}
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Zoom/Zoom.js
var styles$1 = {
	entering: { transform: "none" },
	entered: { transform: "none" }
};
/**
* The Zoom transition can be used for the floating variant of the
* [Button](/material-ui/react-floating-action-button/#animation) component.
* It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
*/
var Zoom = /* @__PURE__ */ import_react.forwardRef(function Zoom(props, ref) {
	const theme = useTheme$3();
	const defaultTimeout = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { addEndListener, appear = true, children, easing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style, timeout = defaultTimeout, TransitionComponent = Transition, ...other } = props;
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
		if (callback) {
			const node = nodeRef.current;
			if (maybeIsAppearing === void 0) callback(node);
			else callback(node, maybeIsAppearing);
		}
	};
	const handleEntering = normalizedTransitionCallback(onEntering);
	const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
		reflow(node);
		const transitionProps = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "enter" });
		node.style.webkitTransition = theme.transitions.create("transform", transitionProps);
		node.style.transition = theme.transitions.create("transform", transitionProps);
		if (onEnter) onEnter(node, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node) => {
		const transitionProps = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "exit" });
		node.style.webkitTransition = theme.transitions.create("transform", transitionProps);
		node.style.transition = theme.transitions.create("transform", transitionProps);
		if (onExit) onExit(node);
	});
	const handleExited = normalizedTransitionCallback(onExited);
	const handleAddEndListener = (next) => {
		if (addEndListener) addEndListener(nodeRef.current, next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		timeout,
		...other,
		children: (state, { ownerState, ...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				style: {
					transform: "scale(0)",
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...styles$1[state],
					...style,
					...children.props.style
				},
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/SpeedDial/speedDialClasses.js
function getSpeedDialUtilityClass(slot) {
	return generateUtilityClass("MuiSpeedDial", slot);
}
var speedDialClasses = generateUtilityClasses("MuiSpeedDial", [
	"root",
	"fab",
	"directionUp",
	"directionDown",
	"directionLeft",
	"directionRight",
	"actions",
	"actionsClosed"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/SpeedDial/SpeedDial.js
var useUtilityClasses$9 = (ownerState) => {
	const { classes, open, direction } = ownerState;
	return composeClasses({
		root: ["root", `direction${capitalize_default(direction)}`],
		fab: ["fab"],
		actions: ["actions", !open && "actionsClosed"]
	}, getSpeedDialUtilityClass, classes);
};
function getOrientation(direction) {
	if (direction === "up" || direction === "down") return "vertical";
	if (direction === "right" || direction === "left") return "horizontal";
}
var dialRadius = 32;
var spacingActions = 16;
var SpeedDialRoot = styled$2("div", {
	name: "MuiSpeedDial",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, styles[`direction${capitalize_default(ownerState.direction)}`]];
	}
})(memoTheme(({ theme }) => ({
	zIndex: (theme.vars || theme).zIndex.speedDial,
	display: "flex",
	alignItems: "center",
	pointerEvents: "none",
	variants: [
		{
			props: { direction: "up" },
			style: {
				flexDirection: "column-reverse",
				[`& .${speedDialClasses.actions}`]: {
					flexDirection: "column-reverse",
					marginBottom: -dialRadius,
					paddingBottom: spacingActions + dialRadius
				}
			}
		},
		{
			props: { direction: "down" },
			style: {
				flexDirection: "column",
				[`& .${speedDialClasses.actions}`]: {
					flexDirection: "column",
					marginTop: -dialRadius,
					paddingTop: spacingActions + dialRadius
				}
			}
		},
		{
			props: { direction: "left" },
			style: {
				flexDirection: "row-reverse",
				[`& .${speedDialClasses.actions}`]: {
					flexDirection: "row-reverse",
					marginRight: -dialRadius,
					paddingRight: spacingActions + dialRadius
				}
			}
		},
		{
			props: { direction: "right" },
			style: {
				flexDirection: "row",
				[`& .${speedDialClasses.actions}`]: {
					flexDirection: "row",
					marginLeft: -dialRadius,
					paddingLeft: spacingActions + dialRadius
				}
			}
		}
	]
})));
var SpeedDialFab = styled$2(Fab, {
	name: "MuiSpeedDial",
	slot: "Fab"
})({ pointerEvents: "auto" });
var SpeedDialActions = styled$2("div", {
	name: "MuiSpeedDial",
	slot: "Actions",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.actions, !ownerState.open && styles.actionsClosed];
	}
})({
	display: "flex",
	pointerEvents: "auto",
	variants: [{
		props: ({ ownerState }) => !ownerState.open,
		style: {
			transition: "top 0s linear 0.2s",
			pointerEvents: "none"
		}
	}]
});
var SpeedDial = /* @__PURE__ */ import_react.forwardRef(function SpeedDial(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSpeedDial"
	});
	const theme = useTheme$3();
	const defaultTransitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { ariaLabel, FabProps: { ref: origDialButtonRef, ...FabProps } = {}, children: childrenProp, className, direction = "up", hidden = false, icon, onBlur, onClose, onFocus, onKeyDown, onMouseEnter, onMouseLeave, onOpen, open: openProp, openIcon, slots = {}, slotProps = {}, TransitionComponent: TransitionComponentProp, TransitionProps: TransitionPropsProp, transitionDuration = defaultTransitionDuration, ...other } = props;
	const [open, setOpenState] = useControlled_default({
		controlled: openProp,
		default: false,
		name: "SpeedDial",
		state: "open"
	});
	const ownerState = {
		...props,
		open,
		direction
	};
	const classes = useUtilityClasses$9(ownerState);
	const eventTimer = useTimeout();
	/**
	* an index in actions.current
	*/
	const focusedAction = import_react.useRef(0);
	/**
	* pressing this key while the focus is on a child SpeedDialAction focuses
	* the next SpeedDialAction.
	* It is equal to the first arrow key pressed while focus is on the SpeedDial
	* that is not orthogonal to the direction.
	* @type {utils.ArrowKey?}
	*/
	const nextItemArrowKey = import_react.useRef();
	/**
	* refs to the Button that have an action associated to them in this SpeedDial
	* [Fab, ...(SpeedDialActions > Button)]
	* @type {HTMLButtonElement[]}
	*/
	const actions = import_react.useRef([]);
	actions.current = [actions.current[0]];
	const handleFabRef = useForkRef_default(origDialButtonRef, import_react.useCallback((fabFef) => {
		actions.current[0] = fabFef;
	}, []));
	/**
	* creates a ref callback for the Button in a SpeedDialAction
	* Is called before the original ref callback for Button that was set in buttonProps
	*
	* @param dialActionIndex {number}
	* @param origButtonRef {React.RefObject?}
	* @param fabSlotOrigButtonRef {React.RefObject?}
	*/
	const createHandleSpeedDialActionButtonRef = (dialActionIndex, origButtonRef, fabSlotOrigButtonRef) => {
		return (buttonRef) => {
			actions.current[dialActionIndex + 1] = buttonRef;
			if (origButtonRef) origButtonRef(buttonRef);
			if (fabSlotOrigButtonRef) fabSlotOrigButtonRef(buttonRef);
		};
	};
	const handleKeyDown = (event) => {
		if (onKeyDown) onKeyDown(event);
		const key = event.key.replace("Arrow", "").toLowerCase();
		const { current: nextItemArrowKeyCurrent = key } = nextItemArrowKey;
		if (event.key === "Escape") {
			setOpenState(false);
			actions.current[0].focus();
			if (onClose) onClose(event, "escapeKeyDown");
			return;
		}
		if (getOrientation(key) === getOrientation(nextItemArrowKeyCurrent) && getOrientation(key) !== void 0) {
			event.preventDefault();
			const actionStep = key === nextItemArrowKeyCurrent ? 1 : -1;
			const nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
			actions.current[nextAction].focus();
			focusedAction.current = nextAction;
			nextItemArrowKey.current = nextItemArrowKeyCurrent;
		}
	};
	import_react.useEffect(() => {
		if (!open) {
			focusedAction.current = 0;
			nextItemArrowKey.current = void 0;
		}
	}, [open]);
	const handleClose = (event) => {
		if (event.type === "mouseleave" && onMouseLeave) onMouseLeave(event);
		if (event.type === "blur" && onBlur) onBlur(event);
		eventTimer.clear();
		if (event.type === "blur") eventTimer.start(0, () => {
			setOpenState(false);
			if (onClose) onClose(event, "blur");
		});
		else {
			setOpenState(false);
			if (onClose) onClose(event, "mouseLeave");
		}
	};
	const handleClick = (event) => {
		if (FabProps.onClick) FabProps.onClick(event);
		eventTimer.clear();
		if (open) {
			setOpenState(false);
			if (onClose) onClose(event, "toggle");
		} else {
			setOpenState(true);
			if (onOpen) onOpen(event, "toggle");
		}
	};
	const handleOpen = (event) => {
		if (event.type === "mouseenter" && onMouseEnter) onMouseEnter(event);
		if (event.type === "focus" && onFocus) onFocus(event);
		eventTimer.clear();
		if (!open) eventTimer.start(0, () => {
			setOpenState(true);
			if (onOpen) onOpen(event, {
				focus: "focus",
				mouseenter: "mouseEnter"
			}[event.type]);
		});
	};
	const id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
	const allItems = import_react.Children.toArray(childrenProp).filter((child) => {
		return /* @__PURE__ */ import_react.isValidElement(child);
	});
	const children = allItems.map((child, index) => {
		const { FabProps: { ref: origButtonRef } = {}, slotProps: childSlotProps = {}, tooltipPlacement: tooltipPlacementProp } = child.props;
		const { fab: { ref: fabSlotOrigButtonRef, ...fabSlotProps } = {}, ...restOfSlotProps } = childSlotProps;
		const tooltipPlacement = tooltipPlacementProp || (getOrientation(direction) === "vertical" ? "left" : "top");
		return /* @__PURE__ */ import_react.cloneElement(child, {
			slotProps: {
				fab: {
					...fabSlotProps,
					ref: createHandleSpeedDialActionButtonRef(index, origButtonRef, fabSlotOrigButtonRef)
				},
				...restOfSlotProps
			},
			delay: 30 * (open ? index : allItems.length - index),
			open,
			tooltipPlacement,
			id: `${id}-action-${index}`
		});
	});
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponentProp,
			...slots
		},
		slotProps: {
			transition: TransitionPropsProp,
			...slotProps
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		elementType: SpeedDialRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		ref,
		className: clsx(classes.root, className),
		additionalProps: { role: "presentation" },
		getSlotProps: (handlers) => ({
			...handlers,
			onKeyDown: (event) => {
				handlers.onKeyDown?.(event);
				handleKeyDown(event);
			},
			onBlur: (event) => {
				handlers.onBlur?.(event);
				handleClose(event);
			},
			onFocus: (event) => {
				handlers.onFocus?.(event);
				handleOpen(event);
			},
			onMouseEnter: (event) => {
				handlers.onMouseEnter?.(event);
				handleOpen(event);
			},
			onMouseLeave: (event) => {
				handlers.onMouseLeave?.(event);
				handleClose(event);
			}
		})
	});
	const [TransitionSlot, transitionProps] = useSlot("transition", {
		elementType: Zoom,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
			in: !hidden,
			timeout: transitionDuration,
			unmountOnExit: true,
			...transitionProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedDialFab, {
				color: "primary",
				"aria-label": ariaLabel,
				"aria-haspopup": "true",
				"aria-expanded": open,
				"aria-controls": `${id}-actions`,
				...FabProps,
				onClick: handleClick,
				className: clsx(classes.fab, FabProps.className),
				ref: handleFabRef,
				ownerState,
				children: /* @__PURE__ */ import_react.isValidElement(icon) && isMuiElement_default(icon, ["SpeedDialIcon"]) ? /* @__PURE__ */ import_react.cloneElement(icon, { open }) : icon
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeedDialActions, {
			id: `${id}-actions`,
			role: "menu",
			"aria-orientation": getOrientation(direction),
			className: clsx(classes.actions, !open && classes.actionsClosed),
			ownerState,
			children
		})]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Tooltip/tooltipClasses.js
function getTooltipUtilityClass(slot) {
	return generateUtilityClass("MuiTooltip", slot);
}
var tooltipClasses = generateUtilityClasses("MuiTooltip", [
	"popper",
	"popperInteractive",
	"popperArrow",
	"popperClose",
	"tooltip",
	"tooltipArrow",
	"touch",
	"tooltipPlacementLeft",
	"tooltipPlacementRight",
	"tooltipPlacementTop",
	"tooltipPlacementBottom",
	"arrow"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Tooltip/Tooltip.js
function round(value) {
	return Math.round(value * 1e5) / 1e5;
}
var useUtilityClasses$8 = (ownerState) => {
	const { classes, disableInteractive, arrow, touch, placement } = ownerState;
	return composeClasses({
		popper: [
			"popper",
			!disableInteractive && "popperInteractive",
			arrow && "popperArrow"
		],
		tooltip: [
			"tooltip",
			arrow && "tooltipArrow",
			touch && "touch",
			`tooltipPlacement${capitalize_default(placement.split("-")[0])}`
		],
		arrow: ["arrow"]
	}, getTooltipUtilityClass, classes);
};
var TooltipPopper = styled$2(Popper, {
	name: "MuiTooltip",
	slot: "Popper",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.popper,
			!ownerState.disableInteractive && styles.popperInteractive,
			ownerState.arrow && styles.popperArrow,
			!ownerState.open && styles.popperClose
		];
	}
})(memoTheme(({ theme }) => ({
	zIndex: (theme.vars || theme).zIndex.tooltip,
	pointerEvents: "none",
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disableInteractive,
			style: { pointerEvents: "auto" }
		},
		{
			props: ({ open }) => !open,
			style: { pointerEvents: "none" }
		},
		{
			props: ({ ownerState }) => ownerState.arrow,
			style: {
				[`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
					top: 0,
					marginTop: "-0.71em",
					"&::before": { transformOrigin: "0 100%" }
				},
				[`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
					bottom: 0,
					marginBottom: "-0.71em",
					"&::before": { transformOrigin: "100% 0" }
				},
				[`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
					height: "1em",
					width: "0.71em",
					"&::before": { transformOrigin: "100% 100%" }
				},
				[`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
					height: "1em",
					width: "0.71em",
					"&::before": { transformOrigin: "0 0" }
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.arrow && !ownerState.isRtl,
			style: { [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
				left: 0,
				marginLeft: "-0.71em"
			} }
		},
		{
			props: ({ ownerState }) => ownerState.arrow && !!ownerState.isRtl,
			style: { [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
				right: 0,
				marginRight: "-0.71em"
			} }
		},
		{
			props: ({ ownerState }) => ownerState.arrow && !ownerState.isRtl,
			style: { [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
				right: 0,
				marginRight: "-0.71em"
			} }
		},
		{
			props: ({ ownerState }) => ownerState.arrow && !!ownerState.isRtl,
			style: { [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
				left: 0,
				marginLeft: "-0.71em"
			} }
		}
	]
})));
var TooltipTooltip = styled$2("div", {
	name: "MuiTooltip",
	slot: "Tooltip",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.tooltip,
			ownerState.touch && styles.touch,
			ownerState.arrow && styles.tooltipArrow,
			styles[`tooltipPlacement${capitalize_default(ownerState.placement.split("-")[0])}`]
		];
	}
})(memoTheme(({ theme }) => ({
	backgroundColor: theme.vars ? theme.vars.palette.Tooltip.bg : theme.alpha(theme.palette.grey[700], .92),
	borderRadius: (theme.vars || theme).shape.borderRadius,
	color: (theme.vars || theme).palette.common.white,
	fontFamily: theme.typography.fontFamily,
	padding: "4px 8px",
	fontSize: theme.typography.pxToRem(11),
	maxWidth: 300,
	margin: 2,
	wordWrap: "break-word",
	fontWeight: theme.typography.fontWeightMedium,
	[`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { transformOrigin: "right center" },
	[`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: { transformOrigin: "left center" },
	[`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
		transformOrigin: "center bottom",
		marginBottom: "14px"
	},
	[`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
		transformOrigin: "center top",
		marginTop: "14px"
	},
	variants: [
		{
			props: ({ ownerState }) => ownerState.arrow,
			style: {
				position: "relative",
				margin: 0
			}
		},
		{
			props: ({ ownerState }) => ownerState.touch,
			style: {
				padding: "8px 16px",
				fontSize: theme.typography.pxToRem(14),
				lineHeight: `${round(16 / 14)}em`,
				fontWeight: theme.typography.fontWeightRegular
			}
		},
		{
			props: ({ ownerState }) => !ownerState.isRtl,
			style: {
				[`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { marginRight: "14px" },
				[`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: { marginLeft: "14px" }
			}
		},
		{
			props: ({ ownerState }) => !ownerState.isRtl && ownerState.touch,
			style: {
				[`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { marginRight: "24px" },
				[`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: { marginLeft: "24px" }
			}
		},
		{
			props: ({ ownerState }) => !!ownerState.isRtl,
			style: {
				[`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { marginLeft: "14px" },
				[`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: { marginRight: "14px" }
			}
		},
		{
			props: ({ ownerState }) => !!ownerState.isRtl && ownerState.touch,
			style: {
				[`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: { marginLeft: "24px" },
				[`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: { marginRight: "24px" }
			}
		},
		{
			props: ({ ownerState }) => ownerState.touch,
			style: { [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: { marginBottom: "24px" } }
		},
		{
			props: ({ ownerState }) => ownerState.touch,
			style: { [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: { marginTop: "24px" } }
		}
	]
})));
var TooltipArrow = styled$2("span", {
	name: "MuiTooltip",
	slot: "Arrow"
})(memoTheme(({ theme }) => ({
	overflow: "hidden",
	position: "absolute",
	width: "1em",
	height: "0.71em",
	boxSizing: "border-box",
	color: theme.vars ? theme.vars.palette.Tooltip.bg : theme.alpha(theme.palette.grey[700], .9),
	"&::before": {
		content: "\"\"",
		margin: "auto",
		display: "block",
		width: "100%",
		height: "100%",
		backgroundColor: "currentColor",
		transform: "rotate(45deg)"
	}
})));
var hystersisOpen = false;
var hystersisTimer = new Timeout();
var cursorPosition = {
	x: 0,
	y: 0
};
function composeEventHandler(handler, eventHandler) {
	return (event, ...params) => {
		if (eventHandler) eventHandler(event, ...params);
		handler(event, ...params);
	};
}
var Tooltip = /* @__PURE__ */ import_react.forwardRef(function Tooltip(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTooltip"
	});
	const { arrow = false, children: childrenProp, classes: classesProp, components = {}, componentsProps = {}, describeChild = false, disableFocusListener = false, disableHoverListener = false, disableInteractive: disableInteractiveProp = false, disableTouchListener = false, enterDelay = 100, enterNextDelay = 0, enterTouchDelay = 700, followCursor = false, id: idProp, leaveDelay = 0, leaveTouchDelay = 1500, onClose, onOpen, open: openProp, placement = "bottom", PopperComponent: PopperComponentProp, PopperProps = {}, slotProps = {}, slots = {}, title, TransitionComponent: TransitionComponentProp, TransitionProps, ...other } = props;
	const children = /* @__PURE__ */ import_react.isValidElement(childrenProp) ? childrenProp : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: childrenProp });
	const theme = useTheme$3();
	const isRtl = useRtl();
	const [childNode, setChildNode] = import_react.useState();
	const [arrowRef, setArrowRef] = import_react.useState(null);
	const ignoreNonTouchEvents = import_react.useRef(false);
	const disableInteractive = disableInteractiveProp || followCursor;
	const closeTimer = useTimeout();
	const enterTimer = useTimeout();
	const leaveTimer = useTimeout();
	const touchTimer = useTimeout();
	const [openState, setOpenState] = useControlled_default({
		controlled: openProp,
		default: false,
		name: "Tooltip",
		state: "open"
	});
	let open = openState;
	const id = useId_default(idProp);
	const prevUserSelect = import_react.useRef();
	const stopTouchInteraction = useEventCallback_default(() => {
		if (prevUserSelect.current !== void 0) {
			document.body.style.WebkitUserSelect = prevUserSelect.current;
			prevUserSelect.current = void 0;
		}
		touchTimer.clear();
	});
	import_react.useEffect(() => stopTouchInteraction, [stopTouchInteraction]);
	const handleOpen = (event) => {
		hystersisTimer.clear();
		hystersisOpen = true;
		setOpenState(true);
		if (onOpen && !open) onOpen(event);
	};
	const handleClose = useEventCallback_default(
		/**
		* @param {React.SyntheticEvent | Event} event
		*/
		(event) => {
			hystersisTimer.start(800 + leaveDelay, () => {
				hystersisOpen = false;
			});
			setOpenState(false);
			if (onClose && open) onClose(event);
			closeTimer.start(theme.transitions.duration.shortest, () => {
				ignoreNonTouchEvents.current = false;
			});
		}
	);
	const handleMouseOver = (event) => {
		if (ignoreNonTouchEvents.current && event.type !== "touchstart") return;
		if (childNode) childNode.removeAttribute("title");
		enterTimer.clear();
		leaveTimer.clear();
		if (enterDelay || hystersisOpen && enterNextDelay) enterTimer.start(hystersisOpen ? enterNextDelay : enterDelay, () => {
			handleOpen(event);
		});
		else handleOpen(event);
	};
	const handleMouseLeave = (event) => {
		enterTimer.clear();
		leaveTimer.start(leaveDelay, () => {
			handleClose(event);
		});
	};
	const [, setChildIsFocusVisible] = import_react.useState(false);
	const handleBlur = (event) => {
		if (!isFocusVisible(event.target)) {
			setChildIsFocusVisible(false);
			handleMouseLeave(event);
		}
	};
	const handleFocus = (event) => {
		if (!childNode) setChildNode(event.currentTarget);
		if (isFocusVisible(event.target)) {
			setChildIsFocusVisible(true);
			handleMouseOver(event);
		}
	};
	const detectTouchStart = (event) => {
		ignoreNonTouchEvents.current = true;
		const childrenProps = children.props;
		if (childrenProps.onTouchStart) childrenProps.onTouchStart(event);
	};
	const handleTouchStart = (event) => {
		detectTouchStart(event);
		leaveTimer.clear();
		closeTimer.clear();
		stopTouchInteraction();
		prevUserSelect.current = document.body.style.WebkitUserSelect;
		document.body.style.WebkitUserSelect = "none";
		touchTimer.start(enterTouchDelay, () => {
			document.body.style.WebkitUserSelect = prevUserSelect.current;
			handleMouseOver(event);
		});
	};
	const handleTouchEnd = (event) => {
		if (children.props.onTouchEnd) children.props.onTouchEnd(event);
		stopTouchInteraction();
		leaveTimer.start(leaveTouchDelay, () => {
			handleClose(event);
		});
	};
	import_react.useEffect(() => {
		if (!open) return;
		/**
		* @param {KeyboardEvent} nativeEvent
		*/
		function handleKeyDown(nativeEvent) {
			if (nativeEvent.key === "Escape") handleClose(nativeEvent);
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleClose, open]);
	const handleRef = useForkRef_default(getReactElementRef(children), setChildNode, ref);
	if (!title && title !== 0) open = false;
	const popperRef = import_react.useRef();
	const handleMouseMove = (event) => {
		const childrenProps = children.props;
		if (childrenProps.onMouseMove) childrenProps.onMouseMove(event);
		cursorPosition = {
			x: event.clientX,
			y: event.clientY
		};
		if (popperRef.current) popperRef.current.update();
	};
	const nameOrDescProps = {};
	const titleIsString = typeof title === "string";
	if (describeChild) {
		nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
		nameOrDescProps["aria-describedby"] = open ? id : null;
	} else {
		nameOrDescProps["aria-label"] = titleIsString ? title : null;
		nameOrDescProps["aria-labelledby"] = open && !titleIsString ? id : null;
	}
	const childrenProps = {
		...nameOrDescProps,
		...other,
		...children.props,
		className: clsx(other.className, children.props.className),
		onTouchStart: detectTouchStart,
		ref: handleRef,
		...followCursor ? { onMouseMove: handleMouseMove } : {}
	};
	const interactiveWrapperListeners = {};
	if (!disableTouchListener) {
		childrenProps.onTouchStart = handleTouchStart;
		childrenProps.onTouchEnd = handleTouchEnd;
	}
	if (!disableHoverListener) {
		childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
		childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);
		if (!disableInteractive) {
			interactiveWrapperListeners.onMouseOver = handleMouseOver;
			interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
		}
	}
	if (!disableFocusListener) {
		childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
		childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);
		if (!disableInteractive) {
			interactiveWrapperListeners.onFocus = handleFocus;
			interactiveWrapperListeners.onBlur = handleBlur;
		}
	}
	const ownerState = {
		...props,
		isRtl,
		arrow,
		disableInteractive,
		placement,
		PopperComponentProp,
		touch: ignoreNonTouchEvents.current
	};
	const resolvedPopperProps = typeof slotProps.popper === "function" ? slotProps.popper(ownerState) : slotProps.popper;
	const popperOptions = import_react.useMemo(() => {
		let tooltipModifiers = [{
			name: "arrow",
			enabled: Boolean(arrowRef),
			options: {
				element: arrowRef,
				padding: 4
			}
		}];
		if (PopperProps.popperOptions?.modifiers) tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
		if (resolvedPopperProps?.popperOptions?.modifiers) tooltipModifiers = tooltipModifiers.concat(resolvedPopperProps.popperOptions.modifiers);
		return {
			...PopperProps.popperOptions,
			...resolvedPopperProps?.popperOptions,
			modifiers: tooltipModifiers
		};
	}, [
		arrowRef,
		PopperProps.popperOptions,
		resolvedPopperProps?.popperOptions
	]);
	const classes = useUtilityClasses$8(ownerState);
	const resolvedTransitionProps = typeof slotProps.transition === "function" ? slotProps.transition(ownerState) : slotProps.transition;
	const externalForwardedProps = {
		slots: {
			popper: components.Popper,
			transition: components.Transition ?? TransitionComponentProp,
			tooltip: components.Tooltip,
			arrow: components.Arrow,
			...slots
		},
		slotProps: {
			arrow: slotProps.arrow ?? componentsProps.arrow,
			popper: {
				...PopperProps,
				...resolvedPopperProps ?? componentsProps.popper
			},
			tooltip: slotProps.tooltip ?? componentsProps.tooltip,
			transition: {
				...TransitionProps,
				...resolvedTransitionProps ?? componentsProps.transition
			}
		}
	};
	const [PopperSlot, popperSlotProps] = useSlot("popper", {
		elementType: TooltipPopper,
		externalForwardedProps,
		ownerState,
		className: clsx(classes.popper, PopperProps?.className)
	});
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Grow,
		externalForwardedProps,
		ownerState
	});
	const [TooltipSlot, tooltipSlotProps] = useSlot("tooltip", {
		elementType: TooltipTooltip,
		className: classes.tooltip,
		externalForwardedProps,
		ownerState
	});
	const [ArrowSlot, arrowSlotProps] = useSlot("arrow", {
		elementType: TooltipArrow,
		className: classes.arrow,
		externalForwardedProps,
		ownerState,
		ref: setArrowRef
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ import_react.cloneElement(children, childrenProps), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperSlot, {
		as: PopperComponentProp ?? Popper,
		placement,
		anchorEl: followCursor ? { getBoundingClientRect: () => ({
			top: cursorPosition.y,
			left: cursorPosition.x,
			right: cursorPosition.x,
			bottom: cursorPosition.y,
			width: 0,
			height: 0
		}) } : childNode,
		popperRef,
		open: childNode ? open : false,
		id,
		transition: true,
		...interactiveWrapperListeners,
		...popperSlotProps,
		popperOptions,
		children: ({ TransitionProps: TransitionPropsInner }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
			timeout: theme.transitions.duration.shorter,
			...TransitionPropsInner,
			...transitionSlotProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipSlot, {
				...tooltipSlotProps,
				children: [title, arrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowSlot, { ...arrowSlotProps }) : null]
			})
		})
	})] });
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/SpeedDialAction/speedDialActionClasses.js
function getSpeedDialActionUtilityClass(slot) {
	return generateUtilityClass("MuiSpeedDialAction", slot);
}
var speedDialActionClasses = generateUtilityClasses("MuiSpeedDialAction", [
	"fab",
	"fabClosed",
	"staticTooltip",
	"staticTooltipClosed",
	"staticTooltipLabel",
	"tooltipPlacementLeft",
	"tooltipPlacementRight"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/SpeedDialAction/SpeedDialAction.js
var useUtilityClasses$7 = (ownerState) => {
	const { open, tooltipPlacement, classes } = ownerState;
	return composeClasses({
		fab: ["fab", !open && "fabClosed"],
		staticTooltip: [
			"staticTooltip",
			`tooltipPlacement${capitalize_default(tooltipPlacement)}`,
			!open && "staticTooltipClosed"
		],
		staticTooltipLabel: ["staticTooltipLabel"]
	}, getSpeedDialActionUtilityClass, classes);
};
var SpeedDialActionFab = styled$2(Fab, {
	name: "MuiSpeedDialAction",
	slot: "Fab",
	skipVariantsResolver: false,
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.fab, !ownerState.open && styles.fabClosed];
	}
})(memoTheme(({ theme }) => ({
	margin: 8,
	color: (theme.vars || theme).palette.text.secondary,
	backgroundColor: (theme.vars || theme).palette.background.paper,
	"&:hover": { backgroundColor: theme.vars ? theme.vars.palette.SpeedDialAction.fabHoverBg : emphasize(theme.palette.background.paper, .15) },
	transition: `${theme.transitions.create("transform", { duration: theme.transitions.duration.shorter })}, opacity 0.8s`,
	opacity: 1,
	variants: [{
		props: ({ ownerState }) => !ownerState.open,
		style: {
			opacity: 0,
			transform: "scale(0)"
		}
	}]
})));
var SpeedDialActionStaticTooltip = styled$2("span", {
	name: "MuiSpeedDialAction",
	slot: "StaticTooltip",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.staticTooltip,
			!ownerState.open && styles.staticTooltipClosed,
			styles[`tooltipPlacement${capitalize_default(ownerState.tooltipPlacement)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	position: "relative",
	display: "flex",
	alignItems: "center",
	[`& .${speedDialActionClasses.staticTooltipLabel}`]: {
		transition: theme.transitions.create(["transform", "opacity"], { duration: theme.transitions.duration.shorter }),
		opacity: 1
	},
	variants: [
		{
			props: ({ ownerState }) => !ownerState.open,
			style: { [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
				opacity: 0,
				transform: "scale(0.5)"
			} }
		},
		{
			props: { tooltipPlacement: "left" },
			style: { [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
				transformOrigin: "100% 50%",
				right: "100%",
				marginRight: 8
			} }
		},
		{
			props: { tooltipPlacement: "right" },
			style: { [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
				transformOrigin: "0% 50%",
				left: "100%",
				marginLeft: 8
			} }
		}
	]
})));
var SpeedDialActionStaticTooltipLabel = styled$2("span", {
	name: "MuiSpeedDialAction",
	slot: "StaticTooltipLabel"
})(memoTheme(({ theme }) => ({
	position: "absolute",
	...theme.typography.body1,
	backgroundColor: (theme.vars || theme).palette.background.paper,
	borderRadius: (theme.vars || theme).shape.borderRadius,
	boxShadow: (theme.vars || theme).shadows[1],
	color: (theme.vars || theme).palette.text.secondary,
	padding: "4px 16px",
	wordBreak: "keep-all"
})));
var SpeedDialAction = /* @__PURE__ */ import_react.forwardRef(function SpeedDialAction(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSpeedDialAction"
	});
	const { className, delay = 0, FabProps = {}, icon, id, open, TooltipClasses, tooltipOpen: tooltipOpenProp = false, tooltipPlacement = "left", tooltipTitle, slots = {}, slotProps = {}, ...other } = props;
	const ownerState = {
		...props,
		tooltipPlacement
	};
	const classes = useUtilityClasses$7(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps: {
			fab: FabProps,
			...slotProps,
			tooltip: mergeSlotProps$1(typeof slotProps.tooltip === "function" ? slotProps.tooltip(ownerState) : slotProps.tooltip, {
				title: tooltipTitle,
				open: tooltipOpenProp,
				placement: tooltipPlacement,
				classes: TooltipClasses
			})
		}
	};
	const [tooltipOpen, setTooltipOpen] = import_react.useState(externalForwardedProps.slotProps.tooltip?.open);
	const handleTooltipClose = () => {
		setTooltipOpen(false);
	};
	const handleTooltipOpen = () => {
		setTooltipOpen(true);
	};
	const transitionStyle = { transitionDelay: `${delay}ms` };
	const [FabSlot, fabSlotProps] = useSlot("fab", {
		elementType: SpeedDialActionFab,
		externalForwardedProps,
		ownerState,
		shouldForwardComponentProp: true,
		className: clsx(classes.fab, className),
		additionalProps: {
			style: transitionStyle,
			tabIndex: -1,
			role: "menuitem",
			size: "small"
		}
	});
	const [TooltipSlot, tooltipSlotProps] = useSlot("tooltip", {
		elementType: Tooltip,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		ref,
		additionalProps: { id },
		ownerState,
		getSlotProps: (handlers) => ({
			...handlers,
			onClose: (event) => {
				handlers.onClose?.(event);
				handleTooltipClose();
			},
			onOpen: (event) => {
				handlers.onOpen?.(event);
				handleTooltipOpen();
			}
		})
	});
	const [StaticTooltipSlot, staticTooltipSlotProps] = useSlot("staticTooltip", {
		elementType: SpeedDialActionStaticTooltip,
		externalForwardedProps,
		ownerState,
		ref,
		className: classes.staticTooltip,
		additionalProps: { id }
	});
	const [StaticTooltipLabelSlot, staticTooltipLabelSlotProps] = useSlot("staticTooltipLabel", {
		elementType: SpeedDialActionStaticTooltipLabel,
		externalForwardedProps,
		ownerState,
		className: classes.staticTooltipLabel,
		additionalProps: {
			style: transitionStyle,
			id: `${id}-label`
		}
	});
	const fab = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FabSlot, {
		...fabSlotProps,
		children: icon
	});
	if (tooltipSlotProps.open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaticTooltipSlot, {
		...staticTooltipSlotProps,
		...other,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaticTooltipLabelSlot, {
			...staticTooltipLabelSlotProps,
			children: tooltipSlotProps.title
		}), /* @__PURE__ */ import_react.cloneElement(fab, { "aria-labelledby": `${id}-label` })]
	});
	if (!open && tooltipOpen) setTooltipOpen(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipSlot, {
		...tooltipSlotProps,
		title: tooltipSlotProps.title,
		open: open && tooltipOpen,
		placement: tooltipSlotProps.placement,
		classes: tooltipSlotProps.classes,
		...other,
		children: fab
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/Add.js
/**
* @ignore - internal component.
*/
var Add_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }), "Add");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/SpeedDialIcon/speedDialIconClasses.js
function getSpeedDialIconUtilityClass(slot) {
	return generateUtilityClass("MuiSpeedDialIcon", slot);
}
var speedDialIconClasses = generateUtilityClasses("MuiSpeedDialIcon", [
	"root",
	"icon",
	"iconOpen",
	"iconWithOpenIconOpen",
	"openIcon",
	"openIconOpen"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/SpeedDialIcon/SpeedDialIcon.js
var useUtilityClasses$6 = (ownerState) => {
	const { classes, open, openIcon } = ownerState;
	return composeClasses({
		root: ["root"],
		icon: [
			"icon",
			open && "iconOpen",
			openIcon && open && "iconWithOpenIconOpen"
		],
		openIcon: ["openIcon", open && "openIconOpen"]
	}, getSpeedDialIconUtilityClass, classes);
};
var SpeedDialIconRoot = styled$2("span", {
	name: "MuiSpeedDialIcon",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${speedDialIconClasses.icon}`]: styles.icon },
			{ [`& .${speedDialIconClasses.icon}`]: ownerState.open && styles.iconOpen },
			{ [`& .${speedDialIconClasses.icon}`]: ownerState.open && ownerState.openIcon && styles.iconWithOpenIconOpen },
			{ [`& .${speedDialIconClasses.openIcon}`]: styles.openIcon },
			{ [`& .${speedDialIconClasses.openIcon}`]: ownerState.open && styles.openIconOpen },
			styles.root
		];
	}
})(memoTheme(({ theme }) => ({
	height: 24,
	[`& .${speedDialIconClasses.icon}`]: { transition: theme.transitions.create(["transform", "opacity"], { duration: theme.transitions.duration.short }) },
	[`& .${speedDialIconClasses.openIcon}`]: {
		position: "absolute",
		transition: theme.transitions.create(["transform", "opacity"], { duration: theme.transitions.duration.short }),
		opacity: 0,
		transform: "rotate(-45deg)"
	},
	variants: [
		{
			props: ({ ownerState }) => ownerState.open,
			style: { [`& .${speedDialIconClasses.icon}`]: { transform: "rotate(45deg)" } }
		},
		{
			props: ({ ownerState }) => ownerState.open && ownerState.openIcon,
			style: { [`& .${speedDialIconClasses.icon}`]: { opacity: 0 } }
		},
		{
			props: ({ ownerState }) => ownerState.open,
			style: { [`& .${speedDialIconClasses.openIcon}`]: {
				transform: "rotate(0deg)",
				opacity: 1
			} }
		}
	]
})));
var SpeedDialIcon = /* @__PURE__ */ import_react.forwardRef(function SpeedDialIcon(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSpeedDialIcon"
	});
	const { className, icon: iconProp, open, openIcon: openIconProp, ...other } = props;
	const ownerState = props;
	const classes = useUtilityClasses$6(ownerState);
	function formatIcon(icon, newClassName) {
		if (/* @__PURE__ */ import_react.isValidElement(icon)) return /* @__PURE__ */ import_react.cloneElement(icon, { className: newClassName });
		return icon;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpeedDialIconRoot, {
		className: clsx(classes.root, className),
		ref,
		ownerState,
		...other,
		children: [openIconProp ? formatIcon(openIconProp, classes.openIcon) : null, iconProp ? formatIcon(iconProp, classes.icon) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Add_default, { className: classes.icon })]
	});
});
SpeedDialIcon.muiName = "SpeedDialIcon";
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Stack/Stack.js
var Stack = createStack({
	createStyledComponent: styled$2("div", {
		name: "MuiStack",
		slot: "Root"
	}),
	useThemeProps: (inProps) => useDefaultProps({
		props: inProps,
		name: "MuiStack"
	})
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Switch/switchClasses.js
function getSwitchUtilityClass(slot) {
	return generateUtilityClass("MuiSwitch", slot);
}
var switchClasses = generateUtilityClasses("MuiSwitch", [
	"root",
	"edgeStart",
	"edgeEnd",
	"switchBase",
	"colorPrimary",
	"colorSecondary",
	"sizeSmall",
	"sizeMedium",
	"checked",
	"disabled",
	"input",
	"thumb",
	"track"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Switch/Switch.js
var useUtilityClasses$5 = (ownerState) => {
	const { classes, edge, size, color, checked, disabled } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			edge && `edge${capitalize_default(edge)}`,
			`size${capitalize_default(size)}`
		],
		switchBase: [
			"switchBase",
			`color${capitalize_default(color)}`,
			checked && "checked",
			disabled && "disabled"
		],
		thumb: ["thumb"],
		track: ["track"],
		input: ["input"]
	}, getSwitchUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var SwitchRoot = styled$2("span", {
	name: "MuiSwitch",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.edge && styles[`edge${capitalize_default(ownerState.edge)}`],
			styles[`size${capitalize_default(ownerState.size)}`]
		];
	}
})({
	display: "inline-flex",
	width: 58,
	height: 38,
	overflow: "hidden",
	padding: 12,
	boxSizing: "border-box",
	position: "relative",
	flexShrink: 0,
	zIndex: 0,
	verticalAlign: "middle",
	"@media print": { colorAdjust: "exact" },
	variants: [
		{
			props: { edge: "start" },
			style: { marginLeft: -8 }
		},
		{
			props: { edge: "end" },
			style: { marginRight: -8 }
		},
		{
			props: { size: "small" },
			style: {
				width: 40,
				height: 24,
				padding: 7,
				[`& .${switchClasses.thumb}`]: {
					width: 16,
					height: 16
				},
				[`& .${switchClasses.switchBase}`]: {
					padding: 4,
					[`&.${switchClasses.checked}`]: { transform: "translateX(16px)" }
				}
			}
		}
	]
});
var SwitchSwitchBase = styled$2(SwitchBase, {
	name: "MuiSwitch",
	slot: "SwitchBase",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.switchBase,
			{ [`& .${switchClasses.input}`]: styles.input },
			ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 1,
	color: theme.vars ? theme.vars.palette.Switch.defaultColor : `${theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[300]}`,
	transition: theme.transitions.create(["left", "transform"], { duration: theme.transitions.duration.shortest }),
	[`&.${switchClasses.checked}`]: { transform: "translateX(20px)" },
	[`&.${switchClasses.disabled}`]: { color: theme.vars ? theme.vars.palette.Switch.defaultDisabledColor : `${theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]}` },
	[`&.${switchClasses.checked} + .${switchClasses.track}`]: { opacity: .5 },
	[`&.${switchClasses.disabled} + .${switchClasses.track}`]: { opacity: theme.vars ? theme.vars.opacity.switchTrackDisabled : `${theme.palette.mode === "light" ? .12 : .2}` },
	[`& .${switchClasses.input}`]: {
		left: "-100%",
		width: "300%"
	}
})), memoTheme(({ theme }) => ({
	"&:hover": {
		backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
		"@media (hover: none)": { backgroundColor: "transparent" }
	},
	variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color]) => ({
		props: { color },
		style: {
			[`&.${switchClasses.checked}`]: {
				color: (theme.vars || theme).palette[color].main,
				"&:hover": {
					backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity),
					"@media (hover: none)": { backgroundColor: "transparent" }
				},
				[`&.${switchClasses.disabled}`]: { color: theme.vars ? theme.vars.palette.Switch[`${color}DisabledColor`] : `${theme.palette.mode === "light" ? theme.lighten(theme.palette[color].main, .62) : theme.darken(theme.palette[color].main, .55)}` }
			},
			[`&.${switchClasses.checked} + .${switchClasses.track}`]: { backgroundColor: (theme.vars || theme).palette[color].main }
		}
	}))]
})));
var SwitchTrack = styled$2("span", {
	name: "MuiSwitch",
	slot: "Track"
})(memoTheme(({ theme }) => ({
	height: "100%",
	width: "100%",
	borderRadius: 14 / 2,
	zIndex: -1,
	transition: theme.transitions.create(["opacity", "background-color"], { duration: theme.transitions.duration.shortest }),
	backgroundColor: theme.vars ? theme.vars.palette.common.onBackground : `${theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white}`,
	opacity: theme.vars ? theme.vars.opacity.switchTrack : `${theme.palette.mode === "light" ? .38 : .3}`
})));
var SwitchThumb = styled$2("span", {
	name: "MuiSwitch",
	slot: "Thumb"
})(memoTheme(({ theme }) => ({
	boxShadow: (theme.vars || theme).shadows[1],
	backgroundColor: "currentColor",
	width: 20,
	height: 20,
	borderRadius: "50%"
})));
var Switch = /* @__PURE__ */ import_react.forwardRef(function Switch(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSwitch"
	});
	const { className, color = "primary", edge = false, size = "medium", sx, slots = {}, slotProps = {}, ...other } = props;
	const ownerState = {
		...props,
		color,
		edge,
		size
	};
	const classes = useUtilityClasses$5(ownerState);
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		className: clsx(classes.root, className),
		elementType: SwitchRoot,
		externalForwardedProps,
		ownerState,
		additionalProps: { sx }
	});
	const [ThumbSlot, thumbSlotProps] = useSlot("thumb", {
		className: classes.thumb,
		elementType: SwitchThumb,
		externalForwardedProps,
		ownerState
	});
	const icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbSlot, { ...thumbSlotProps });
	const [TrackSlot, trackSlotProps] = useSlot("track", {
		className: classes.track,
		elementType: SwitchTrack,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchSwitchBase, {
			type: "checkbox",
			icon,
			checkedIcon: icon,
			ref,
			ownerState,
			...other,
			classes: {
				...classes,
				root: classes.switchBase
			},
			slots: {
				...slots.switchBase && { root: slots.switchBase },
				...slots.input && { input: slots.input }
			},
			slotProps: {
				...slotProps.switchBase && { root: typeof slotProps.switchBase === "function" ? slotProps.switchBase(ownerState) : slotProps.switchBase },
				input: { role: "switch" },
				...slotProps.input && { input: typeof slotProps.input === "function" ? slotProps.input(ownerState) : slotProps.input }
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackSlot, { ...trackSlotProps })]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Tab/tabClasses.js
function getTabUtilityClass(slot) {
	return generateUtilityClass("MuiTab", slot);
}
var tabClasses = generateUtilityClasses("MuiTab", [
	"root",
	"labelIcon",
	"textColorInherit",
	"textColorPrimary",
	"textColorSecondary",
	"selected",
	"disabled",
	"fullWidth",
	"wrapped",
	"iconWrapper",
	"icon"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Tab/Tab.js
var useUtilityClasses$4 = (ownerState) => {
	const { classes, textColor, fullWidth, wrapped, icon, label, selected, disabled } = ownerState;
	return composeClasses({
		root: [
			"root",
			icon && label && "labelIcon",
			`textColor${capitalize_default(textColor)}`,
			fullWidth && "fullWidth",
			wrapped && "wrapped",
			selected && "selected",
			disabled && "disabled"
		],
		icon: ["iconWrapper", "icon"]
	}, getTabUtilityClass, classes);
};
var TabRoot = styled$2(ButtonBase, {
	name: "MuiTab",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.label && ownerState.icon && styles.labelIcon,
			styles[`textColor${capitalize_default(ownerState.textColor)}`],
			ownerState.fullWidth && styles.fullWidth,
			ownerState.wrapped && styles.wrapped,
			{ [`& .${tabClasses.iconWrapper}`]: styles.iconWrapper },
			{ [`& .${tabClasses.icon}`]: styles.icon }
		];
	}
})(memoTheme(({ theme }) => ({
	...theme.typography.button,
	maxWidth: 360,
	minWidth: 90,
	position: "relative",
	minHeight: 48,
	flexShrink: 0,
	padding: "12px 16px",
	overflow: "hidden",
	whiteSpace: "normal",
	textAlign: "center",
	lineHeight: 1.25,
	variants: [
		{
			props: ({ ownerState }) => ownerState.label && (ownerState.iconPosition === "top" || ownerState.iconPosition === "bottom"),
			style: { flexDirection: "column" }
		},
		{
			props: ({ ownerState }) => ownerState.label && ownerState.iconPosition !== "top" && ownerState.iconPosition !== "bottom",
			style: { flexDirection: "row" }
		},
		{
			props: ({ ownerState }) => ownerState.icon && ownerState.label,
			style: {
				minHeight: 72,
				paddingTop: 9,
				paddingBottom: 9
			}
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "top",
			style: { [`& > .${tabClasses.icon}`]: { marginBottom: 6 } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "bottom",
			style: { [`& > .${tabClasses.icon}`]: { marginTop: 6 } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "start",
			style: { [`& > .${tabClasses.icon}`]: { marginRight: theme.spacing(1) } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "end",
			style: { [`& > .${tabClasses.icon}`]: { marginLeft: theme.spacing(1) } }
		},
		{
			props: { textColor: "inherit" },
			style: {
				color: "inherit",
				opacity: .6,
				[`&.${tabClasses.selected}`]: { opacity: 1 },
				[`&.${tabClasses.disabled}`]: { opacity: (theme.vars || theme).palette.action.disabledOpacity }
			}
		},
		{
			props: { textColor: "primary" },
			style: {
				color: (theme.vars || theme).palette.text.secondary,
				[`&.${tabClasses.selected}`]: { color: (theme.vars || theme).palette.primary.main },
				[`&.${tabClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled }
			}
		},
		{
			props: { textColor: "secondary" },
			style: {
				color: (theme.vars || theme).palette.text.secondary,
				[`&.${tabClasses.selected}`]: { color: (theme.vars || theme).palette.secondary.main },
				[`&.${tabClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled }
			}
		},
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: {
				flexShrink: 1,
				flexGrow: 1,
				flexBasis: 0,
				maxWidth: "none"
			}
		},
		{
			props: ({ ownerState }) => ownerState.wrapped,
			style: { fontSize: theme.typography.pxToRem(12) }
		}
	]
})));
var Tab = /* @__PURE__ */ import_react.forwardRef(function Tab(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTab"
	});
	const { className, disabled = false, disableFocusRipple = false, fullWidth, icon: iconProp, iconPosition = "top", indicator, label, onChange, onClick, onFocus, selected, selectionFollowsFocus, textColor = "inherit", value, wrapped = false, ...other } = props;
	const ownerState = {
		...props,
		disabled,
		disableFocusRipple,
		selected,
		icon: !!iconProp,
		iconPosition,
		label: !!label,
		fullWidth,
		textColor,
		wrapped
	};
	const classes = useUtilityClasses$4(ownerState);
	const icon = iconProp && label && /* @__PURE__ */ import_react.isValidElement(iconProp) ? /* @__PURE__ */ import_react.cloneElement(iconProp, { className: clsx(classes.icon, iconProp.props.className) }) : iconProp;
	const handleClick = (event) => {
		if (!selected && onChange) onChange(event, value);
		if (onClick) onClick(event);
	};
	const handleFocus = (event) => {
		if (selectionFollowsFocus && !selected && onChange) onChange(event, value);
		if (onFocus) onFocus(event);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabRoot, {
		focusRipple: !disableFocusRipple,
		className: clsx(classes.root, className),
		ref,
		role: "tab",
		"aria-selected": selected,
		disabled,
		onClick: handleClick,
		onFocus: handleFocus,
		ownerState,
		tabIndex: selected ? 0 : -1,
		...other,
		children: [iconPosition === "top" || iconPosition === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [icon, label] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [label, icon] }), indicator]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Toolbar/toolbarClasses.js
function getToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiToolbar", slot);
}
generateUtilityClasses("MuiToolbar", [
	"root",
	"gutters",
	"regular",
	"dense"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Toolbar/Toolbar.js
var useUtilityClasses$3 = (ownerState) => {
	const { classes, disableGutters, variant } = ownerState;
	return composeClasses({ root: [
		"root",
		!disableGutters && "gutters",
		variant
	] }, getToolbarUtilityClass, classes);
};
var ToolbarRoot = styled$2("div", {
	name: "MuiToolbar",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			!ownerState.disableGutters && styles.gutters,
			styles[ownerState.variant]
		];
	}
})(memoTheme(({ theme }) => ({
	position: "relative",
	display: "flex",
	alignItems: "center",
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disableGutters,
			style: {
				paddingLeft: theme.spacing(2),
				paddingRight: theme.spacing(2),
				[theme.breakpoints.up("sm")]: {
					paddingLeft: theme.spacing(3),
					paddingRight: theme.spacing(3)
				}
			}
		},
		{
			props: { variant: "dense" },
			style: { minHeight: 48 }
		},
		{
			props: { variant: "regular" },
			style: theme.mixins.toolbar
		}
	]
})));
var Toolbar = /* @__PURE__ */ import_react.forwardRef(function Toolbar(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiToolbar"
	});
	const { className, component = "div", disableGutters = false, variant = "regular", ...other } = props;
	const ownerState = {
		...props,
		component,
		disableGutters,
		variant
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarRoot, {
		as: component,
		className: clsx(useUtilityClasses$3(ownerState).root, className),
		ref,
		ownerState,
		...other
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/KeyboardArrowLeft.js
/**
* @ignore - internal component.
*/
var KeyboardArrowLeft_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" }), "KeyboardArrowLeft");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/svg-icons/KeyboardArrowRight.js
/**
* @ignore - internal component.
*/
var KeyboardArrowRight_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }), "KeyboardArrowRight");
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/internal/animate.js
function easeInOutSin(time) {
	return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}
function animate(property, element, to, options = {}, cb = () => {}) {
	const { ease = easeInOutSin, duration = 300 } = options;
	let start = null;
	const from = element[property];
	let cancelled = false;
	const cancel = () => {
		cancelled = true;
	};
	const step = (timestamp) => {
		if (cancelled) {
			cb(/* @__PURE__ */ new Error("Animation cancelled"));
			return;
		}
		if (start === null) start = timestamp;
		const time = Math.min(1, (timestamp - start) / duration);
		element[property] = ease(time) * (to - from) + from;
		if (time >= 1) {
			requestAnimationFrame(() => {
				cb(null);
			});
			return;
		}
		requestAnimationFrame(step);
	};
	if (from === to) {
		cb(/* @__PURE__ */ new Error("Element already at target position"));
		return cancel;
	}
	requestAnimationFrame(step);
	return cancel;
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Tabs/ScrollbarSize.js
var styles = {
	width: 99,
	height: 99,
	position: "absolute",
	top: -9999,
	overflow: "scroll"
};
/**
* @ignore - internal component.
* The component originates from https://github.com/STORIS/react-scrollbar-size.
* It has been moved into the core in order to minimize the bundle size.
*/
function ScrollbarSize(props) {
	const { onChange, ...other } = props;
	const scrollbarHeight = import_react.useRef();
	const nodeRef = import_react.useRef(null);
	const setMeasurements = () => {
		scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
	};
	useEnhancedEffect_default(() => {
		const handleResize = debounce_default(() => {
			const prevHeight = scrollbarHeight.current;
			setMeasurements();
			if (prevHeight !== scrollbarHeight.current) onChange(scrollbarHeight.current);
		});
		const containerWindow = ownerWindow_default(nodeRef.current);
		containerWindow.addEventListener("resize", handleResize);
		return () => {
			handleResize.clear();
			containerWindow.removeEventListener("resize", handleResize);
		};
	}, [onChange]);
	import_react.useEffect(() => {
		setMeasurements();
		onChange(scrollbarHeight.current);
	}, [onChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: styles,
		...other,
		ref: nodeRef
	});
}
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/TabScrollButton/tabScrollButtonClasses.js
function getTabScrollButtonUtilityClass(slot) {
	return generateUtilityClass("MuiTabScrollButton", slot);
}
var tabScrollButtonClasses = generateUtilityClasses("MuiTabScrollButton", [
	"root",
	"vertical",
	"horizontal",
	"disabled"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/TabScrollButton/TabScrollButton.js
var useUtilityClasses$2 = (ownerState) => {
	const { classes, orientation, disabled } = ownerState;
	return composeClasses({ root: [
		"root",
		orientation,
		disabled && "disabled"
	] }, getTabScrollButtonUtilityClass, classes);
};
var TabScrollButtonRoot = styled$2(ButtonBase, {
	name: "MuiTabScrollButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.orientation && styles[ownerState.orientation]];
	}
})({
	width: 40,
	flexShrink: 0,
	opacity: .8,
	[`&.${tabScrollButtonClasses.disabled}`]: { opacity: 0 },
	variants: [{
		props: { orientation: "vertical" },
		style: {
			width: "100%",
			height: 40,
			"& svg": { transform: "var(--TabScrollButton-svgRotate)" }
		}
	}]
});
var TabScrollButton = /* @__PURE__ */ import_react.forwardRef(function TabScrollButton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTabScrollButton"
	});
	const { className, slots = {}, slotProps = {}, direction, orientation, disabled, ...other } = props;
	const isRtl = useRtl();
	const ownerState = {
		isRtl,
		...props
	};
	const classes = useUtilityClasses$2(ownerState);
	const StartButtonIcon = slots.StartScrollButtonIcon ?? KeyboardArrowLeft_default;
	const EndButtonIcon = slots.EndScrollButtonIcon ?? KeyboardArrowRight_default;
	const startButtonIconProps = useSlotProps({
		elementType: StartButtonIcon,
		externalSlotProps: slotProps.startScrollButtonIcon,
		additionalProps: { fontSize: "small" },
		ownerState
	});
	const endButtonIconProps = useSlotProps({
		elementType: EndButtonIcon,
		externalSlotProps: slotProps.endScrollButtonIcon,
		additionalProps: { fontSize: "small" },
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabScrollButtonRoot, {
		component: "div",
		className: clsx(classes.root, className),
		ref,
		role: null,
		ownerState,
		tabIndex: null,
		...other,
		style: {
			...other.style,
			...orientation === "vertical" && { "--TabScrollButton-svgRotate": `rotate(${isRtl ? -90 : 90}deg)` }
		},
		children: direction === "left" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartButtonIcon, { ...startButtonIconProps }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndButtonIcon, { ...endButtonIconProps })
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Tabs/tabsClasses.js
function getTabsUtilityClass(slot) {
	return generateUtilityClass("MuiTabs", slot);
}
var tabsClasses = generateUtilityClasses("MuiTabs", [
	"root",
	"vertical",
	"list",
	"flexContainer",
	"flexContainerVertical",
	"centered",
	"scroller",
	"fixed",
	"scrollableX",
	"scrollableY",
	"hideScrollbar",
	"scrollButtons",
	"scrollButtonsHideMobile",
	"indicator"
]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/Tabs/Tabs.js
var nextItem = (list, item) => {
	if (list === item) return list.firstChild;
	if (item && item.nextElementSibling) return item.nextElementSibling;
	return list.firstChild;
};
var previousItem = (list, item) => {
	if (list === item) return list.lastChild;
	if (item && item.previousElementSibling) return item.previousElementSibling;
	return list.lastChild;
};
var moveFocus = (list, currentFocus, traversalFunction) => {
	let wrappedOnce = false;
	let nextFocus = traversalFunction(list, currentFocus);
	while (nextFocus) {
		if (nextFocus === list.firstChild) {
			if (wrappedOnce) return;
			wrappedOnce = true;
		}
		const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
		if (!nextFocus.hasAttribute("tabindex") || nextFocusDisabled) nextFocus = traversalFunction(list, nextFocus);
		else {
			nextFocus.focus();
			return;
		}
	}
};
var useUtilityClasses$1 = (ownerState) => {
	const { vertical, fixed, hideScrollbar, scrollableX, scrollableY, centered, scrollButtonsHideMobile, classes } = ownerState;
	return composeClasses({
		root: ["root", vertical && "vertical"],
		scroller: [
			"scroller",
			fixed && "fixed",
			hideScrollbar && "hideScrollbar",
			scrollableX && "scrollableX",
			scrollableY && "scrollableY"
		],
		list: [
			"list",
			"flexContainer",
			vertical && "flexContainerVertical",
			vertical && "vertical",
			centered && "centered"
		],
		indicator: ["indicator"],
		scrollButtons: ["scrollButtons", scrollButtonsHideMobile && "scrollButtonsHideMobile"],
		scrollableX: [scrollableX && "scrollableX"],
		hideScrollbar: [hideScrollbar && "hideScrollbar"]
	}, getTabsUtilityClass, classes);
};
var TabsRoot = styled$2("div", {
	name: "MuiTabs",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${tabsClasses.scrollButtons}`]: styles.scrollButtons },
			{ [`& .${tabsClasses.scrollButtons}`]: ownerState.scrollButtonsHideMobile && styles.scrollButtonsHideMobile },
			styles.root,
			ownerState.vertical && styles.vertical
		];
	}
})(memoTheme(({ theme }) => ({
	overflow: "hidden",
	minHeight: 48,
	WebkitOverflowScrolling: "touch",
	display: "flex",
	variants: [{
		props: ({ ownerState }) => ownerState.vertical,
		style: { flexDirection: "column" }
	}, {
		props: ({ ownerState }) => ownerState.scrollButtonsHideMobile,
		style: { [`& .${tabsClasses.scrollButtons}`]: { [theme.breakpoints.down("sm")]: { display: "none" } } }
	}]
})));
var TabsScroller = styled$2("div", {
	name: "MuiTabs",
	slot: "Scroller",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.scroller,
			ownerState.fixed && styles.fixed,
			ownerState.hideScrollbar && styles.hideScrollbar,
			ownerState.scrollableX && styles.scrollableX,
			ownerState.scrollableY && styles.scrollableY
		];
	}
})({
	position: "relative",
	display: "inline-block",
	flex: "1 1 auto",
	whiteSpace: "nowrap",
	variants: [
		{
			props: ({ ownerState }) => ownerState.fixed,
			style: {
				overflowX: "hidden",
				width: "100%"
			}
		},
		{
			props: ({ ownerState }) => ownerState.hideScrollbar,
			style: {
				scrollbarWidth: "none",
				"&::-webkit-scrollbar": { display: "none" }
			}
		},
		{
			props: ({ ownerState }) => ownerState.scrollableX,
			style: {
				overflowX: "auto",
				overflowY: "hidden"
			}
		},
		{
			props: ({ ownerState }) => ownerState.scrollableY,
			style: {
				overflowY: "auto",
				overflowX: "hidden"
			}
		}
	]
});
var List = styled$2("div", {
	name: "MuiTabs",
	slot: "List",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.list,
			styles.flexContainer,
			ownerState.vertical && styles.flexContainerVertical,
			ownerState.centered && styles.centered
		];
	}
})({
	display: "flex",
	variants: [{
		props: ({ ownerState }) => ownerState.vertical,
		style: { flexDirection: "column" }
	}, {
		props: ({ ownerState }) => ownerState.centered,
		style: { justifyContent: "center" }
	}]
});
var TabsIndicator = styled$2("span", {
	name: "MuiTabs",
	slot: "Indicator"
})(memoTheme(({ theme }) => ({
	position: "absolute",
	height: 2,
	bottom: 0,
	width: "100%",
	transition: theme.transitions.create(),
	variants: [
		{
			props: { indicatorColor: "primary" },
			style: { backgroundColor: (theme.vars || theme).palette.primary.main }
		},
		{
			props: { indicatorColor: "secondary" },
			style: { backgroundColor: (theme.vars || theme).palette.secondary.main }
		},
		{
			props: ({ ownerState }) => ownerState.vertical,
			style: {
				height: "100%",
				width: 2,
				right: 0
			}
		}
	]
})));
var TabsScrollbarSize = styled$2(ScrollbarSize)({
	overflowX: "auto",
	overflowY: "hidden",
	scrollbarWidth: "none",
	"&::-webkit-scrollbar": { display: "none" }
});
var defaultIndicatorStyle = {};
var Tabs = /* @__PURE__ */ import_react.forwardRef(function Tabs(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTabs"
	});
	const theme = useTheme$3();
	const isRtl = useRtl();
	const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, action, centered = false, children: childrenProp, className, component = "div", allowScrollButtonsMobile = false, indicatorColor = "primary", onChange, orientation = "horizontal", ScrollButtonComponent, scrollButtons = "auto", selectionFollowsFocus, slots = {}, slotProps = {}, TabIndicatorProps = {}, TabScrollButtonProps = {}, textColor = "primary", value, variant = "standard", visibleScrollbar = false, ...other } = props;
	const scrollable = variant === "scrollable";
	const vertical = orientation === "vertical";
	const scrollStart = vertical ? "scrollTop" : "scrollLeft";
	const start = vertical ? "top" : "left";
	const end = vertical ? "bottom" : "right";
	const clientSize = vertical ? "clientHeight" : "clientWidth";
	const size = vertical ? "height" : "width";
	const ownerState = {
		...props,
		component,
		allowScrollButtonsMobile,
		indicatorColor,
		orientation,
		vertical,
		scrollButtons,
		textColor,
		variant,
		visibleScrollbar,
		fixed: !scrollable,
		hideScrollbar: scrollable && !visibleScrollbar,
		scrollableX: scrollable && !vertical,
		scrollableY: scrollable && vertical,
		centered: centered && !scrollable,
		scrollButtonsHideMobile: !allowScrollButtonsMobile
	};
	const classes = useUtilityClasses$1(ownerState);
	const startScrollButtonIconProps = useSlotProps({
		elementType: slots.StartScrollButtonIcon,
		externalSlotProps: slotProps.startScrollButtonIcon,
		ownerState
	});
	const endScrollButtonIconProps = useSlotProps({
		elementType: slots.EndScrollButtonIcon,
		externalSlotProps: slotProps.endScrollButtonIcon,
		ownerState
	});
	const [mounted, setMounted] = import_react.useState(false);
	const [indicatorStyle, setIndicatorStyle] = import_react.useState(defaultIndicatorStyle);
	const [displayStartScroll, setDisplayStartScroll] = import_react.useState(false);
	const [displayEndScroll, setDisplayEndScroll] = import_react.useState(false);
	const [updateScrollObserver, setUpdateScrollObserver] = import_react.useState(false);
	const [scrollerStyle, setScrollerStyle] = import_react.useState({
		overflow: "hidden",
		scrollbarWidth: 0
	});
	const valueToIndex = /* @__PURE__ */ new Map();
	const tabsRef = import_react.useRef(null);
	const tabListRef = import_react.useRef(null);
	const externalForwardedProps = {
		slots,
		slotProps: {
			indicator: TabIndicatorProps,
			scrollButtons: TabScrollButtonProps,
			...slotProps
		}
	};
	const getTabsMeta = () => {
		const tabsNode = tabsRef.current;
		let tabsMeta;
		if (tabsNode) {
			const rect = tabsNode.getBoundingClientRect();
			tabsMeta = {
				clientWidth: tabsNode.clientWidth,
				scrollLeft: tabsNode.scrollLeft,
				scrollTop: tabsNode.scrollTop,
				scrollWidth: tabsNode.scrollWidth,
				top: rect.top,
				bottom: rect.bottom,
				left: rect.left,
				right: rect.right
			};
		}
		let tabMeta;
		if (tabsNode && value !== false) {
			const children = tabListRef.current.children;
			if (children.length > 0) {
				const tab = children[valueToIndex.get(value)];
				tabMeta = tab ? tab.getBoundingClientRect() : null;
			}
		}
		return {
			tabsMeta,
			tabMeta
		};
	};
	const updateIndicatorState = useEventCallback_default(() => {
		const { tabsMeta, tabMeta } = getTabsMeta();
		let startValue = 0;
		let startIndicator;
		if (vertical) {
			startIndicator = "top";
			if (tabMeta && tabsMeta) startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
		} else {
			startIndicator = isRtl ? "right" : "left";
			if (tabMeta && tabsMeta) startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + tabsMeta.scrollLeft);
		}
		const newIndicatorStyle = {
			[startIndicator]: startValue,
			[size]: tabMeta ? tabMeta[size] : 0
		};
		if (typeof indicatorStyle[startIndicator] !== "number" || typeof indicatorStyle[size] !== "number") setIndicatorStyle(newIndicatorStyle);
		else {
			const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
			const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);
			if (dStart >= 1 || dSize >= 1) setIndicatorStyle(newIndicatorStyle);
		}
	});
	const scroll = (scrollValue, { animation = true } = {}) => {
		if (animation) animate(scrollStart, tabsRef.current, scrollValue, { duration: theme.transitions.duration.standard });
		else tabsRef.current[scrollStart] = scrollValue;
	};
	const moveTabsScroll = (delta) => {
		let scrollValue = tabsRef.current[scrollStart];
		if (vertical) scrollValue += delta;
		else scrollValue += delta * (isRtl ? -1 : 1);
		scroll(scrollValue);
	};
	const getScrollSize = () => {
		const containerSize = tabsRef.current[clientSize];
		let totalSize = 0;
		const children = Array.from(tabListRef.current.children);
		for (let i = 0; i < children.length; i += 1) {
			const tab = children[i];
			if (totalSize + tab[clientSize] > containerSize) {
				if (i === 0) totalSize = containerSize;
				break;
			}
			totalSize += tab[clientSize];
		}
		return totalSize;
	};
	const handleStartScrollClick = () => {
		moveTabsScroll(-1 * getScrollSize());
	};
	const handleEndScrollClick = () => {
		moveTabsScroll(getScrollSize());
	};
	const [ScrollbarSlot, { onChange: scrollbarOnChange, ...scrollbarSlotProps }] = useSlot("scrollbar", {
		className: clsx(classes.scrollableX, classes.hideScrollbar),
		elementType: TabsScrollbarSize,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState
	});
	const handleScrollbarSizeChange = import_react.useCallback((scrollbarWidth) => {
		scrollbarOnChange?.(scrollbarWidth);
		setScrollerStyle({
			overflow: null,
			scrollbarWidth
		});
	}, [scrollbarOnChange]);
	const [ScrollButtonsSlot, scrollButtonSlotProps] = useSlot("scrollButtons", {
		className: clsx(classes.scrollButtons, TabScrollButtonProps.className),
		elementType: TabScrollButton,
		externalForwardedProps,
		ownerState,
		additionalProps: {
			orientation,
			slots: {
				StartScrollButtonIcon: slots.startScrollButtonIcon || slots.StartScrollButtonIcon,
				EndScrollButtonIcon: slots.endScrollButtonIcon || slots.EndScrollButtonIcon
			},
			slotProps: {
				startScrollButtonIcon: startScrollButtonIconProps,
				endScrollButtonIcon: endScrollButtonIconProps
			}
		}
	});
	const getConditionalElements = () => {
		const conditionalElements = {};
		conditionalElements.scrollbarSizeListener = scrollable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollbarSlot, {
			...scrollbarSlotProps,
			onChange: handleScrollbarSizeChange
		}) : null;
		const showScrollButtons = scrollable && (scrollButtons === "auto" && (displayStartScroll || displayEndScroll) || scrollButtons === true);
		conditionalElements.scrollButtonStart = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollButtonsSlot, {
			direction: isRtl ? "right" : "left",
			onClick: handleStartScrollClick,
			disabled: !displayStartScroll,
			...scrollButtonSlotProps
		}) : null;
		conditionalElements.scrollButtonEnd = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollButtonsSlot, {
			direction: isRtl ? "left" : "right",
			onClick: handleEndScrollClick,
			disabled: !displayEndScroll,
			...scrollButtonSlotProps
		}) : null;
		return conditionalElements;
	};
	const scrollSelectedIntoView = useEventCallback_default((animation) => {
		const { tabsMeta, tabMeta } = getTabsMeta();
		if (!tabMeta || !tabsMeta) return;
		if (tabMeta[start] < tabsMeta[start]) scroll(tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]), { animation });
		else if (tabMeta[end] > tabsMeta[end]) scroll(tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]), { animation });
	});
	const updateScrollButtonState = useEventCallback_default(() => {
		if (scrollable && scrollButtons !== false) setUpdateScrollObserver(!updateScrollObserver);
	});
	import_react.useEffect(() => {
		const handleResize = debounce_default(() => {
			if (tabsRef.current) updateIndicatorState();
		});
		let resizeObserver;
		/**
		* @type {MutationCallback}
		*/
		const handleMutation = (records) => {
			records.forEach((record) => {
				record.removedNodes.forEach((item) => {
					resizeObserver?.unobserve(item);
				});
				record.addedNodes.forEach((item) => {
					resizeObserver?.observe(item);
				});
			});
			handleResize();
			updateScrollButtonState();
		};
		const win = ownerWindow_default(tabsRef.current);
		win.addEventListener("resize", handleResize);
		let mutationObserver;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(handleResize);
			Array.from(tabListRef.current.children).forEach((child) => {
				resizeObserver.observe(child);
			});
		}
		if (typeof MutationObserver !== "undefined") {
			mutationObserver = new MutationObserver(handleMutation);
			mutationObserver.observe(tabListRef.current, { childList: true });
		}
		return () => {
			handleResize.clear();
			win.removeEventListener("resize", handleResize);
			mutationObserver?.disconnect();
			resizeObserver?.disconnect();
		};
	}, [updateIndicatorState, updateScrollButtonState]);
	/**
	* Toggle visibility of start and end scroll buttons
	* Using IntersectionObserver on first and last Tabs.
	*/
	import_react.useEffect(() => {
		const tabListChildren = Array.from(tabListRef.current.children);
		const length = tabListChildren.length;
		if (typeof IntersectionObserver !== "undefined" && length > 0 && scrollable && scrollButtons !== false) {
			const firstTab = tabListChildren[0];
			const lastTab = tabListChildren[length - 1];
			const observerOptions = {
				root: tabsRef.current,
				threshold: .99
			};
			const handleScrollButtonStart = (entries) => {
				setDisplayStartScroll(!entries[0].isIntersecting);
			};
			const firstObserver = new IntersectionObserver(handleScrollButtonStart, observerOptions);
			firstObserver.observe(firstTab);
			const handleScrollButtonEnd = (entries) => {
				setDisplayEndScroll(!entries[0].isIntersecting);
			};
			const lastObserver = new IntersectionObserver(handleScrollButtonEnd, observerOptions);
			lastObserver.observe(lastTab);
			return () => {
				firstObserver.disconnect();
				lastObserver.disconnect();
			};
		}
	}, [
		scrollable,
		scrollButtons,
		updateScrollObserver,
		childrenProp?.length
	]);
	import_react.useEffect(() => {
		setMounted(true);
	}, []);
	import_react.useEffect(() => {
		updateIndicatorState();
	});
	import_react.useEffect(() => {
		scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
	}, [scrollSelectedIntoView, indicatorStyle]);
	import_react.useImperativeHandle(action, () => ({
		updateIndicator: updateIndicatorState,
		updateScrollButtons: updateScrollButtonState
	}), [updateIndicatorState, updateScrollButtonState]);
	const [IndicatorSlot, indicatorSlotProps] = useSlot("indicator", {
		className: clsx(classes.indicator, TabIndicatorProps.className),
		elementType: TabsIndicator,
		externalForwardedProps,
		ownerState,
		additionalProps: { style: indicatorStyle }
	});
	const indicator = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndicatorSlot, { ...indicatorSlotProps });
	let childIndex = 0;
	const children = import_react.Children.map(childrenProp, (child) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) return null;
		const childValue = child.props.value === void 0 ? childIndex : child.props.value;
		valueToIndex.set(childValue, childIndex);
		const selected = childValue === value;
		childIndex += 1;
		return /* @__PURE__ */ import_react.cloneElement(child, {
			fullWidth: variant === "fullWidth",
			indicator: selected && !mounted && indicator,
			selected,
			selectionFollowsFocus,
			onChange,
			textColor,
			value: childValue,
			...childIndex === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : {}
		});
	});
	const handleKeyDown = (event) => {
		if (event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) return;
		const list = tabListRef.current;
		const currentFocus = getActiveElement_default(ownerDocument_default(list));
		if (currentFocus?.getAttribute("role") !== "tab") return;
		let previousItemKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
		let nextItemKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
		if (orientation === "horizontal" && isRtl) {
			previousItemKey = "ArrowRight";
			nextItemKey = "ArrowLeft";
		}
		switch (event.key) {
			case previousItemKey:
				event.preventDefault();
				moveFocus(list, currentFocus, previousItem);
				break;
			case nextItemKey:
				event.preventDefault();
				moveFocus(list, currentFocus, nextItem);
				break;
			case "Home":
				event.preventDefault();
				moveFocus(list, null, nextItem);
				break;
			case "End":
				event.preventDefault();
				moveFocus(list, null, previousItem);
				break;
			default: break;
		}
	};
	const conditionalElements = getConditionalElements();
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		className: clsx(classes.root, className),
		elementType: TabsRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			component
		},
		ownerState
	});
	const [ScrollerSlot, scrollerSlotProps] = useSlot("scroller", {
		ref: tabsRef,
		className: classes.scroller,
		elementType: TabsScroller,
		externalForwardedProps,
		ownerState,
		additionalProps: { style: {
			overflow: scrollerStyle.overflow,
			[vertical ? `margin${isRtl ? "Left" : "Right"}` : "marginBottom"]: visibleScrollbar ? void 0 : -scrollerStyle.scrollbarWidth
		} }
	});
	const [ListSlot, listSlotProps] = useSlot("list", {
		ref: tabListRef,
		className: clsx(classes.list, classes.flexContainer),
		elementType: List,
		externalForwardedProps,
		ownerState,
		getSlotProps: (handlers) => ({
			...handlers,
			onKeyDown: (event) => {
				handleKeyDown(event);
				handlers.onKeyDown?.(event);
			}
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [
			conditionalElements.scrollButtonStart,
			conditionalElements.scrollbarSizeListener,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollerSlot, {
				...scrollerSlotProps,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSlot, {
					"aria-label": ariaLabel,
					"aria-labelledby": ariaLabelledBy,
					"aria-orientation": orientation === "vertical" ? "vertical" : null,
					role: "tablist",
					...listSlotProps,
					children
				}), mounted && indicator]
			}),
			conditionalElements.scrollButtonEnd
		]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/TextField/textFieldClasses.js
function getTextFieldUtilityClass(slot) {
	return generateUtilityClass("MuiTextField", slot);
}
generateUtilityClasses("MuiTextField", ["root"]);
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/TextField/TextField.js
var variantComponent = {
	standard: Input,
	filled: FilledInput,
	outlined: OutlinedInput
};
var useUtilityClasses = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getTextFieldUtilityClass, classes);
};
var TextFieldRoot = styled$2(FormControl, {
	name: "MuiTextField",
	slot: "Root"
})({});
/**
* The `TextField` is a convenience wrapper for the most common cases (80%).
* It cannot be all things to all people, otherwise the API would grow out of control.
*
* ## Advanced Configuration
*
* It's important to understand that the text field is a simple abstraction
* on top of the following components:
*
* - [FormControl](/material-ui/api/form-control/)
* - [InputLabel](/material-ui/api/input-label/)
* - [FilledInput](/material-ui/api/filled-input/)
* - [OutlinedInput](/material-ui/api/outlined-input/)
* - [Input](/material-ui/api/input/)
* - [FormHelperText](/material-ui/api/form-helper-text/)
*
* If you wish to alter the props applied to the `input` element, you can do so as follows:
*
* ```jsx
* const inputProps = {
*   step: 300,
* };
*
* return <TextField id="time" type="time" inputProps={inputProps} />;
* ```
*
* For advanced cases, please look at the source of TextField by clicking on the
* "Edit this page" button above. Consider either:
*
* - using the upper case props for passing values directly to the components
* - using the underlying components directly as shown in the demos
*/
var TextField = /* @__PURE__ */ import_react.forwardRef(function TextField(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTextField"
	});
	const { autoComplete, autoFocus = false, children, className, color = "primary", defaultValue, disabled = false, error = false, FormHelperTextProps: FormHelperTextPropsProp, fullWidth = false, helperText, id: idOverride, InputLabelProps: InputLabelPropsProp, inputProps: inputPropsProp, InputProps: InputPropsProp, inputRef, label, maxRows, minRows, multiline = false, name, onBlur, onChange, onFocus, placeholder, required = false, rows, select = false, SelectProps: SelectPropsProp, slots = {}, slotProps = {}, type, value, variant = "outlined", ...other } = props;
	const ownerState = {
		...props,
		autoFocus,
		color,
		disabled,
		error,
		fullWidth,
		multiline,
		required,
		select,
		variant
	};
	const classes = useUtilityClasses(ownerState);
	const id = useId(idOverride);
	const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
	const inputLabelId = label && id ? `${id}-label` : void 0;
	const InputComponent = variantComponent[variant];
	const externalForwardedProps = {
		slots,
		slotProps: {
			input: InputPropsProp,
			inputLabel: InputLabelPropsProp,
			htmlInput: inputPropsProp,
			formHelperText: FormHelperTextPropsProp,
			select: SelectPropsProp,
			...slotProps
		}
	};
	const inputAdditionalProps = {};
	const inputLabelSlotProps = externalForwardedProps.slotProps.inputLabel;
	if (variant === "outlined") {
		if (inputLabelSlotProps && typeof inputLabelSlotProps.shrink !== "undefined") inputAdditionalProps.notched = inputLabelSlotProps.shrink;
		inputAdditionalProps.label = label;
	}
	if (select) {
		if (!SelectPropsProp || !SelectPropsProp.native) inputAdditionalProps.id = void 0;
		inputAdditionalProps["aria-describedby"] = void 0;
	}
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: TextFieldRoot,
		shouldForwardComponentProp: true,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		className: clsx(classes.root, className),
		ref,
		additionalProps: {
			disabled,
			error,
			fullWidth,
			required,
			color,
			variant
		}
	});
	const [InputSlot, inputProps] = useSlot("input", {
		elementType: InputComponent,
		externalForwardedProps,
		additionalProps: inputAdditionalProps,
		ownerState
	});
	const [InputLabelSlot, inputLabelProps] = useSlot("inputLabel", {
		elementType: InputLabel,
		externalForwardedProps,
		ownerState
	});
	const [HtmlInputSlot, htmlInputProps] = useSlot("htmlInput", {
		elementType: "input",
		externalForwardedProps,
		ownerState
	});
	const [FormHelperTextSlot, formHelperTextProps] = useSlot("formHelperText", {
		elementType: FormHelperText,
		externalForwardedProps,
		ownerState
	});
	const [SelectSlot, selectProps] = useSlot("select", {
		elementType: Select,
		externalForwardedProps,
		ownerState
	});
	const InputElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputSlot, {
		"aria-describedby": helperTextId,
		autoComplete,
		autoFocus,
		defaultValue,
		fullWidth,
		multiline,
		name,
		rows,
		maxRows,
		minRows,
		type,
		value,
		id,
		inputRef,
		onBlur,
		onChange,
		onFocus,
		placeholder,
		inputProps: htmlInputProps,
		slots: { input: slots.htmlInput ? HtmlInputSlot : void 0 },
		...inputProps
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootProps,
		children: [
			label != null && label !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputLabelSlot, {
				htmlFor: id,
				id: inputLabelId,
				...inputLabelProps,
				children: label
			}),
			select ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSlot, {
				"aria-describedby": helperTextId,
				id,
				labelId: inputLabelId,
				value,
				input: InputElement,
				...selectProps,
				children
			}) : InputElement,
			helperText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormHelperTextSlot, {
				id: helperTextId,
				...formHelperTextProps,
				children: helperText
			})
		]
	});
});
//#endregion
//#region node_modules/.pnpm/@mui+material@7.3.8_@emotion+react@11.14.0_@types+react@19.2.14_react@19.2.0__@emotion+_62a095cde718d1025eb89ee1bf4ce4a1/node_modules/@mui/material/esm/useMediaQuery/index.js
var useMediaQuery = unstable_createUseMediaQuery({ themeId: identifier_default });
//#endregion
export { DialogActions as A, Box as B, InputAdornment as C, Divider as D, Drawer as E, CardHeader as F, AppBar as G, Avatar as H, CardContent as I, IconButton as J, Typography as K, CardActions as L, CssBaseline as M, Container as N, DialogTitle as O, Checkbox as P, require_react_dom as Q, Card as R, Link as S, Fab as T, InputBase as U, Badge as V, Chip as W, Paper as X, CircularProgress as Y, ThemeProvider as Z, ListItemIcon as _, Tab as a, ListItemButton as b, SpeedDialIcon as c, SpeedDial as d, Skeleton as f, ListItemText as g, Popover as h, Toolbar as i, Dialog as j, DialogContent as k, SpeedDialAction as l, Menu as m, TextField as n, Switch as o, MenuItem as p, Alert as q, Tabs as r, Stack as s, useMediaQuery as t, Tooltip as u, ListItemAvatar as v, FormControlLabel as w, List$1 as x, ListItem as y, Button as z };
