import { t as getRequest } from "./request-response-2TQubZMA.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-Da1AeZ6t.mjs";
import { l as resolveCurrentUser } from "./client-bVtyOxJQ.mjs";
import { t as GoogleGenerativeAI } from "../_libs/google__generative-ai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BI4b59vR.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createCloudflareSession_createServerFn_handler = createServerRpc({
	id: "96b090dcf2867a28c3096f6193e7b495b4d4528cc3a2e152a27ad806678bdc31",
	name: "createCloudflareSession",
	filename: "src/lib/server/api.ts"
}, (opts) => createCloudflareSession.__executeServer(opts));
var createCloudflareSession = createServerFn({ method: "POST" }).handler(createCloudflareSession_createServerFn_handler, async () => {
	const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API;
	const CLOUDFLARE_APP_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_APP_ID;
	if (!CLOUDFLARE_API_KEY || !CLOUDFLARE_APP_ID) throw new Error("Cloudflare configuration missing");
	const response = await fetch(`https://rtc.cloudflare.com/v1/apps/${CLOUDFLARE_APP_ID}/sessions/new`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
			"Content-Type": "application/json"
		}
	});
	if (!response.ok) throw new Error(await response.text());
	return await response.json();
});
var createCloudflareTracks_createServerFn_handler = createServerRpc({
	id: "6777c8ad61799cef1db802c125a549969477db5ae761078351c3925ec547ed33",
	name: "createCloudflareTracks",
	filename: "src/lib/server/api.ts"
}, (opts) => createCloudflareTracks.__executeServer(opts));
var createCloudflareTracks = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(createCloudflareTracks_createServerFn_handler, async ({ data }) => {
	const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API;
	const CLOUDFLARE_APP_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_APP_ID;
	if (!CLOUDFLARE_API_KEY || !CLOUDFLARE_APP_ID) throw new Error("Cloudflare configuration missing");
	const response = await fetch(`https://rtc.cloudflare.com/v1/apps/${CLOUDFLARE_APP_ID}/sessions/${data.sessionId}/tracks/new`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ tracks: data.tracks })
	});
	if (!response.ok) throw new Error(await response.text());
	return await response.json();
});
var generateAIResponse_createServerFn_handler = createServerRpc({
	id: "b26a660488f133f54a22ce7204a706b0cae40fb70a24e5050d543fdd4c95f4a5",
	name: "generateAIResponse",
	filename: "src/lib/server/api.ts"
}, (opts) => generateAIResponse.__executeServer(opts));
var generateAIResponse = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(generateAIResponse_createServerFn_handler, async ({ data }) => {
	const user = await resolveCurrentUser(getRequest());
	if (!user) throw new Error("Unauthorized");
	const apiKey = data.apiKey || process.env.GOOGLE_API_KEY;
	if (!apiKey) throw new Error("AI service not configured");
	if (!data.apiKey) {
		const plan = user.prefs?.subscriptionTier || "FREE";
		if (![
			"PRO",
			"ORG",
			"LIFETIME"
		].includes(plan)) throw new Error("AI features require a Pro account. Upgrade to continue or provide your own API key in settings.");
	}
	const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
		model: process.env.GEMINI_MODEL_NAME || "gemini-2.0-flash",
		systemInstruction: data.systemInstruction || "You are Kylrixbot, an intelligent assistant for Kylrixconnect, a premium secure communication and networking app. You represent 'Quiet Power' and 'The Glass Monolith' aesthetic. Be concise, professional, and helpful. Help users communicate more effectively while maintaining privacy."
	});
	if (data.history && data.history.length > 0) return (await model.startChat({ history: data.history.map((h) => ({
		role: h.role === "assistant" ? "model" : "user",
		parts: [{ text: h.content }]
	})) }).sendMessage(data.prompt)).response.text();
	return (await model.generateContent(data.prompt)).response.text();
});
//#endregion
export { createCloudflareSession_createServerFn_handler, createCloudflareTracks_createServerFn_handler, generateAIResponse_createServerFn_handler };
