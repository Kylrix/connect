import { i as getCachedIdentityByUsername, r as getCachedIdentityById } from "./users-vRrLGFai.mjs";
import { n as format, r as isValid, t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/time-pgZ5YIc8.js
var normalizeUsername = (value) => {
	if (!value) return null;
	return value.toString().trim().replace(/^@+/, "").toLowerCase().replace(/[^a-z0-9_-]/g, "") || null;
};
var formatFallbackHandle = (fallbackId) => {
	const id = fallbackId?.trim();
	if (!id) return null;
	return `@${id.slice(0, 7)}`;
};
function resolveIdentity(identity, fallbackId) {
	const cachedById = fallbackId ? getCachedIdentityById(fallbackId) : null;
	const cachedByUsername = normalizeUsername(identity?.username) ? getCachedIdentityByUsername(identity?.username) : null;
	const resolved = {
		...cachedById || {},
		...cachedByUsername || {},
		...identity || {}
	};
	const username = normalizeUsername(resolved.username) || normalizeUsername(cachedByUsername?.username) || normalizeUsername(cachedById?.username) || null;
	const fallbackHandle = formatFallbackHandle(fallbackId);
	return {
		username,
		displayName: resolved.displayName?.trim() || cachedById?.displayName?.trim() || cachedByUsername?.displayName?.trim() || username || fallbackHandle || "User",
		handle: username ? `@${username}` : fallbackHandle || "@user"
	};
}
function resolveIdentityUsername(identity, fallbackId) {
	return resolveIdentity(identity, fallbackId).username;
}
var TIME_FORMAT = "MMM d, h:mm a";
var toDate = (value) => {
	if (!value) return null;
	const date = value instanceof Date ? value : new Date(value);
	return isValid(date) ? date : null;
};
var formatPostTimestamp = (createdAt, updatedAt) => {
	const created = toDate(createdAt);
	if (!created) return "";
	const exactCreated = format(created, TIME_FORMAT);
	const ageSuffix = formatDistanceToNowStrict(created, {
		addSuffix: true,
		roundingMethod: "floor"
	});
	let label = Math.abs(Date.now() - created.getTime()) < 1e3 * 60 * 60 * 24 * 30 ? `${ageSuffix} · ${exactCreated}` : exactCreated;
	const updated = toDate(updatedAt);
	if (updated && Math.abs(updated.getTime() - created.getTime()) > 6e4) label += ` · Edited ${format(updated, TIME_FORMAT)}`;
	return label;
};
//#endregion
export { resolveIdentity as n, resolveIdentityUsername as r, formatPostTimestamp as t };
