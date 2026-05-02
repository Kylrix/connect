//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Dv3TXKlW.js
var manifest = {
	"96b090dcf2867a28c3096f6193e7b495b4d4528cc3a2e152a27ad806678bdc31": {
		functionName: "createCloudflareSession_createServerFn_handler",
		importer: () => import("./_ssr/api-BI4b59vR.mjs")
	},
	"6777c8ad61799cef1db802c125a549969477db5ae761078351c3925ec547ed33": {
		functionName: "createCloudflareTracks_createServerFn_handler",
		importer: () => import("./_ssr/api-BI4b59vR.mjs")
	},
	"b26a660488f133f54a22ce7204a706b0cae40fb70a24e5050d543fdd4c95f4a5": {
		functionName: "generateAIResponse_createServerFn_handler",
		importer: () => import("./_ssr/api-BI4b59vR.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
