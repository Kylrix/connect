import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-Da1AeZ6t.mjs";
import { n as account, r as client, t as APPWRITE_CONFIG } from "./client-bVtyOxJQ.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Dv3TXKlW.mjs";
import { n as UsersService } from "./users-vRrLGFai.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { J as alpha, xt as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { B as Box, C as InputAdornment, D as Divider, H as Avatar, J as IconButton, K as Typography, N as Container, T as Fab, V as Badge, X as Paper, Y as CircularProgress, _ as ListItemIcon, g as ListItemText, m as Menu, n as TextField, p as MenuItem, s as Stack, u as Tooltip, z as Button } from "../_libs/@mui/material+[...].mjs";
import { a as useParams$1, c as useSearchParams, i as useAuth, s as useRouter, t as ChatService } from "./chat-GLmU6cBO.mjs";
import { t as CallService } from "./call-DhmbyQFj.mjs";
import { $ as Hash, F as Paperclip, H as LogIn, I as Monitor, L as Mic, M as PhoneOff, R as MicOff, S as ShieldAlert, St as Check, T as Send, Tt as Calendar, a as VideoOff, c as UserX, d as UserCheck, ft as Copy, h as Square, i as Video, it as FileText, kt as ArrowLeft, mt as Circle, n as X, o as Users, pt as Clock, q as Laptop, s as User, v as Smartphone, vt as ChevronUp, x as ShieldCheck, z as MessageSquare } from "../_libs/lucide-react.mjs";
import { t as FormattedText } from "./FormattedText-D8u0iX80.mjs";
import { r as zt } from "../_libs/react-hot-toast.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/call._id-7XZhCyEg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createCloudflareSession = createServerFn({ method: "POST" }).handler(createSsrRpc("96b090dcf2867a28c3096f6193e7b495b4d4528cc3a2e152a27ad806678bdc31"));
var createCloudflareTracks = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(createSsrRpc("6777c8ad61799cef1db802c125a549969477db5ae761078351c3925ec547ed33"));
createServerFn({ method: "POST" }).inputValidator((data) => data).handler(createSsrRpc("b26a660488f133f54a22ce7204a706b0cae40fb70a24e5050d543fdd4c95f4a5"));
var WebRTCManager = class {
	peerConnection = null;
	localStream = null;
	remoteStream = null;
	config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:global.stun.twilio.com:3478" }] };
	events;
	state = "idle";
	candidateQueue = [];
	isRemoteDescriptionSet = false;
	currentTargetId = null;
	mediaRecorder = null;
	recordedChunks = [];
	screenStream = null;
	sessionId = null;
	cloudflareSessionToken = null;
	constructor(events) {
		this.events = events;
	}
	async fetchCloudflareSession() {
		if (this.sessionId) return {
			sessionId: this.sessionId,
			sessionToken: this.cloudflareSessionToken
		};
		console.log("[WebRTCManager] Fetching Cloudflare session...");
		const data = await createCloudflareSession();
		console.log("[WebRTCManager] Cloudflare session created:", data.sessionId);
		this.sessionId = data.sessionId;
		this.cloudflareSessionToken = data.sessionToken;
		return data;
	}
	async getDevices() {
		return await navigator.mediaDevices.enumerateDevices();
	}
	async switchDevice(kind, deviceId) {
		if (!this.localStream) return;
		const constraints = {
			audio: kind === "audioinput" ? { deviceId: { exact: deviceId } } : true,
			video: kind === "videoinput" ? { deviceId: { exact: deviceId } } : true
		};
		const newStream = await navigator.mediaDevices.getUserMedia(constraints);
		const newTrack = kind === "audioinput" ? newStream.getAudioTracks()[0] : newStream.getVideoTracks()[0];
		if (this.peerConnection) {
			const sender = this.peerConnection.getSenders().find((s) => s.track?.kind === (kind === "audioinput" ? "audio" : "video"));
			if (sender) await sender.replaceTrack(newTrack);
		}
		const oldTrack = kind === "audioinput" ? this.localStream.getAudioTracks()[0] : this.localStream.getVideoTracks()[0];
		this.localStream.removeTrack(oldTrack);
		oldTrack.stop();
		this.localStream.addTrack(newTrack);
		return this.localStream;
	}
	async toggleScreenShare(enable) {
		if (enable) {
			this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
			const screenTrack = this.screenStream.getVideoTracks()[0];
			if (this.peerConnection) {
				const sender = this.peerConnection.getSenders().find((s) => s.track?.kind === "video");
				if (sender) await sender.replaceTrack(screenTrack);
			}
			screenTrack.onended = () => this.toggleScreenShare(false);
			return this.screenStream;
		} else {
			if (this.screenStream) {
				this.screenStream.getTracks().forEach((t) => t.stop());
				this.screenStream = null;
			}
			if (this.localStream && this.peerConnection) {
				const videoTrack = this.localStream.getVideoTracks()[0];
				const sender = this.peerConnection.getSenders().find((s) => s.track?.kind === "video");
				if (sender) await sender.replaceTrack(videoTrack);
			}
			return null;
		}
	}
	startRecording() {
		if (!this.remoteStream && !this.localStream) return;
		const tracks = [...this.remoteStream ? this.remoteStream.getTracks() : [], ...this.localStream ? this.localStream.getAudioTracks() : []];
		const combinedStream = new MediaStream(tracks);
		this.recordedChunks = [];
		this.mediaRecorder = new MediaRecorder(combinedStream);
		this.mediaRecorder.ondataavailable = (e) => {
			if (e.data.size > 0) this.recordedChunks.push(e.data);
		};
		this.mediaRecorder.onstop = () => {
			const blob = new Blob(this.recordedChunks, { type: "video/webm" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `call-record-${Date.now()}.webm`;
			a.click();
		};
		this.mediaRecorder.start();
	}
	stopRecording() {
		this.mediaRecorder?.stop();
		this.mediaRecorder = null;
	}
	async initializeLocalStream(video = true, audio = true) {
		try {
			if (!video && !audio) {
				this.localStream = new MediaStream();
				return this.localStream;
			}
			this.localStream = await navigator.mediaDevices.getUserMedia({
				video,
				audio
			});
			return this.localStream;
		} catch (error) {
			console.error("Error accessing media devices:", error);
			throw error;
		}
	}
	createPeerConnection(senderId, targetId) {
		if (this.peerConnection) return;
		this.currentTargetId = targetId;
		console.log(`[WebRTCManager] Creating PeerConnection for ${senderId} -> ${targetId}`);
		this.peerConnection = new RTCPeerConnection(this.config);
		this.peerConnection.onicecandidate = (event) => {
			if (event.candidate && this.currentTargetId) {
				console.log(`[WebRTCManager] ICE Candidate generated for ${this.currentTargetId}`);
				this.events.onSignal({
					type: "candidate",
					candidate: event.candidate.toJSON(),
					target: this.currentTargetId,
					sender: senderId
				});
			}
		};
		this.peerConnection.ontrack = (event) => {
			console.log(`[WebRTCManager] Remote track received`);
			this.remoteStream = event.streams[0];
			this.events.onTrack(this.remoteStream);
		};
		this.peerConnection.onconnectionstatechange = () => {
			const state = this.peerConnection?.connectionState;
			console.log(`[WebRTCManager] Connection state changed: ${state}`);
			this.updateState(state);
		};
		this.peerConnection.oniceconnectionstatechange = () => {
			console.log(`[WebRTCManager] ICE state changed: ${this.peerConnection?.iceConnectionState}`);
		};
		if (this.localStream) {
			console.log(`[WebRTCManager] Adding ${this.localStream.getTracks().length} local tracks`);
			this.localStream.getTracks().forEach((track) => {
				this.peerConnection?.addTrack(track, this.localStream);
			});
		}
	}
	async createOffer(senderId, targetId) {
		try {
			const { sessionId } = await this.fetchCloudflareSession();
			this.createPeerConnection(senderId, targetId);
			if (!this.peerConnection) return;
			const tracks = this.localStream?.getTracks().map((track) => ({
				location: "local",
				mid: track.kind === "audio" ? "0" : "1",
				trackName: `${track.kind}-${senderId}`
			}));
			const trackData = await createCloudflareTracks({ data: {
				sessionId,
				tracks
			} });
			const offer = await this.peerConnection.createOffer();
			await this.peerConnection.setLocalDescription(offer);
			this.events.onSignal({
				type: "offer",
				sdp: offer.sdp,
				target: targetId,
				sender: senderId,
				cloudflareSessionId: sessionId,
				cloudflareTracks: trackData.tracks
			});
		} catch (error) {
			console.error("Cloudflare SFU Initiation failed, falling back to pure P2P:", error);
			this.createPeerConnection(senderId, targetId);
			if (!this.peerConnection) return;
			const offer = await this.peerConnection.createOffer();
			await this.peerConnection.setLocalDescription(offer);
			this.events.onSignal({
				type: "offer",
				sdp: offer.sdp,
				target: targetId,
				sender: senderId
			});
		}
	}
	async handleSignal(signal) {
		if (!this.peerConnection && signal.type === "offer") this.createPeerConnection(signal.target, signal.sender);
		if (!this.peerConnection) return;
		if (signal.type === "offer" && signal.sdp) {
			console.log(`[WebRTCManager] Offer received from ${signal.sender}`);
			if (signal.cloudflareSessionId && signal.cloudflareTracks) {}
			try {
				await this.peerConnection.setRemoteDescription(new RTCSessionDescription({
					type: "offer",
					sdp: signal.sdp
				}));
				this.isRemoteDescriptionSet = true;
				await this.processCandidateQueue();
				const answer = await this.peerConnection.createAnswer();
				await this.peerConnection.setLocalDescription(answer);
				console.log(`[WebRTCManager] Sending answer to ${signal.sender}`);
				this.events.onSignal({
					type: "answer",
					sdp: answer.sdp,
					target: signal.sender,
					sender: signal.target
				});
			} catch (err) {
				console.error("[WebRTCManager] Error handling offer:", err);
			}
		} else if (signal.type === "answer" && signal.sdp) {
			console.log(`[WebRTCManager] Answer received from ${signal.sender}`);
			try {
				await this.peerConnection.setRemoteDescription(new RTCSessionDescription({
					type: "answer",
					sdp: signal.sdp
				}));
				this.isRemoteDescriptionSet = true;
				await this.processCandidateQueue();
			} catch (err) {
				console.error("[WebRTCManager] Error handling answer:", err);
			}
		} else if (signal.type === "candidate" && signal.candidate) {
			console.log(`[WebRTCManager] Candidate received from ${signal.sender}`);
			try {
				if (this.isRemoteDescriptionSet) await this.peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
				else this.candidateQueue.push(signal.candidate);
			} catch (err) {
				console.error("[WebRTCManager] Error handling candidate:", err);
			}
		}
	}
	async processCandidateQueue() {
		for (const candidate of this.candidateQueue) await this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
		this.candidateQueue = [];
	}
	cleanup() {
		this.localStream?.getTracks().forEach((track) => track.stop());
		this.peerConnection?.close();
		this.peerConnection = null;
		this.localStream = null;
		this.remoteStream = null;
		this.isRemoteDescriptionSet = false;
		this.candidateQueue = [];
		this.currentTargetId = null;
		this.updateState("disconnected");
	}
	updateState(newState) {
		this.state = newState;
		this.events.onStateChange(newState);
	}
};
var InCallChat = ({ isOpen, onClose, onSendMessage, messages }) => {
	const { user } = useAuth();
	const [input, setInput] = (0, import_react.useState)("");
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [messages, isOpen]);
	const handleSend = () => {
		if (!input.trim()) return;
		onSendMessage(input);
		setInput("");
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
		elevation: 24,
		sx: {
			position: "absolute",
			right: 20,
			top: 80,
			bottom: 140,
			width: 360,
			bgcolor: "#161412",
			borderRadius: "24px",
			display: "flex",
			flexDirection: "column",
			border: "1px solid rgba(255,255,255,0.1)",
			zIndex: 1400,
			overflow: "hidden",
			boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					p: 2,
					borderBottom: "1px solid rgba(255,255,255,0.05)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					direction: "row",
					spacing: 1.5,
					alignItems: "center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
						size: 18,
						color: "#6366F1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "subtitle2",
						sx: {
							fontWeight: 900,
							color: "white"
						},
						children: "In-call Messages"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
					onClick: onClose,
					size: "small",
					sx: { color: "rgba(255,255,255,0.3)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				ref: scrollRef,
				sx: {
					flex: 1,
					overflowY: "auto",
					p: 2,
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					sx: {
						p: 2,
						bgcolor: alpha("#6366F1", .05),
						borderRadius: 3,
						border: "1px solid rgba(99, 102, 241, 0.1)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							color: "#6366F1",
							fontWeight: 800,
							textAlign: "center",
							display: "block"
						},
						children: "Messages are only visible to people in the call and are deleted when you leave."
					})
				}), messages.map((msg) => {
					const isMe = msg.senderId === user?.$id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							alignSelf: isMe ? "flex-end" : "flex-start",
							maxWidth: "85%"
						},
						children: [!isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "caption",
							sx: {
								ml: 1,
								mb: .5,
								display: "block",
								fontWeight: 800,
								color: "rgba(255,255,255,0.4)"
							},
							children: msg.senderName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							sx: {
								p: 1.5,
								bgcolor: isMe ? "#6366F1" : "rgba(255,255,255,0.05)",
								color: isMe ? "white" : "white",
								borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
								border: isMe ? "none" : "1px solid rgba(255,255,255,0.05)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormattedText, {
									text: msg.content,
									variant: "body2",
									sx: { fontWeight: 500 }
								}),
								msg.attachment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									sx: {
										mt: 1,
										p: 1,
										bgcolor: "rgba(0,0,0,0.2)",
										borderRadius: 2,
										display: "flex",
										alignItems: "center",
										gap: 1
									},
									children: [msg.attachment.type === "note" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: { fontWeight: 800 },
										children: msg.attachment.title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										display: "block",
										textAlign: "right",
										mt: .5,
										fontSize: "0.65rem",
										opacity: .5,
										fontWeight: 700
									},
									children: format(msg.timestamp, "h:mm a")
								})
							]
						})]
					}, msg.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					p: 2,
					borderTop: "1px solid rgba(255,255,255,0.05)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					fullWidth: true,
					multiline: true,
					maxRows: 3,
					placeholder: "Send a message to everyone",
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSend();
						}
					},
					InputProps: {
						sx: {
							bgcolor: "rgba(255,255,255,0.03)",
							borderRadius: 4,
							color: "white",
							fontSize: "0.9rem",
							fontWeight: 500,
							"& fieldset": { borderColor: "rgba(255,255,255,0.1)" }
						},
						endAdornment: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
							position: "end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: handleSend,
								disabled: !input.trim(),
								sx: { color: "#6366F1" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 18 })
							})
						}),
						startAdornment: user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment, {
							position: "start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								title: "Attach Object",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									size: "small",
									sx: { color: "rgba(255,255,255,0.3)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { size: 18 })
								})
							})
						})
					}
				})
			})
		]
	});
};
var CallInterface = ({ conversationId, isCaller, callType: _callType = "video", targetId: initialTargetId, callCode, initialMediaSettings = {
	video: true,
	audio: true,
	companion: false
}, autoInitiate = false, callTitle, expiresAt }) => {
	const { user } = useAuth();
	const [status, setStatus] = (0, import_react.useState)("Initializing...");
	const [isMuted, setIsMuted] = (0, import_react.useState)(!initialMediaSettings.audio || initialMediaSettings.companion);
	const [isVideoOff, setIsVideoOff] = (0, import_react.useState)(!initialMediaSettings.video || initialMediaSettings.companion);
	const [isCompanion, _setIsCompanion] = (0, import_react.useState)(initialMediaSettings.companion);
	const [targetId, setTargetId] = (0, import_react.useState)(initialTargetId);
	const [timeRemaining, setTimeRemaining] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [joinRequests, setJoinRequests] = (0, import_react.useState)([]);
	const [participants, setParticipants] = (0, import_react.useState)([]);
	const [isChatOpen, setIsChatOpen] = (0, import_react.useState)(false);
	const [chatMessages, setChatMessages] = (0, import_react.useState)([]);
	const [unreadChatCount, setUnreadChatCount] = (0, import_react.useState)(0);
	const [isScreenSharing, setIsScreenSharing] = (0, import_react.useState)(false);
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [devices, setDevices] = (0, import_react.useState)([]);
	const [deviceMenuAnchor, setDeviceMenuAnchor] = (0, import_react.useState)(null);
	const localVideoRef = (0, import_react.useRef)(null);
	const remoteVideoRef = (0, import_react.useRef)(null);
	const rtcManager = (0, import_react.useRef)(null);
	const hasInitiatedCall = (0, import_react.useRef)(false);
	const router = useRouter();
	const callStartTime = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (callStartTime.current === null) callStartTime.current = Date.now();
	}, []);
	const handleDeviceMenuOpen = async (event) => {
		const devs = await rtcManager.current?.getDevices();
		if (devs) setDevices(devs);
		setDeviceMenuAnchor(event.currentTarget);
	};
	const handleSwitchDevice = async (kind, deviceId) => {
		const stream = await rtcManager.current?.switchDevice(kind, deviceId);
		if (stream && localVideoRef.current) localVideoRef.current.srcObject = stream;
		setDeviceMenuAnchor(null);
	};
	const toggleScreenShare = async () => {
		try {
			const stream = await rtcManager.current?.toggleScreenShare(!isScreenSharing);
			setIsScreenSharing(!isScreenSharing);
			if (localVideoRef.current) localVideoRef.current.srcObject = stream || rtcManager.current.localStream;
		} catch (_e) {
			console.error("Screen share failed:", _e);
			setIsScreenSharing(false);
		}
	};
	const toggleRecording = () => {
		if (isRecording) {
			rtcManager.current?.stopRecording();
			zt.success("Recording saved");
		} else {
			rtcManager.current?.startRecording();
			zt.success("Recording started");
		}
		setIsRecording(!isRecording);
	};
	const broadcastMessage = async (content, attachment) => {
		if (!user || !targetId) return;
		const msg = {
			id: Math.random().toString(36).substring(7),
			senderId: user.$id,
			senderName: user.name || "Guest",
			content,
			timestamp: Date.now(),
			attachment
		};
		setChatMessages((prev) => [...prev, msg]);
		try {
			await CallService.sendSignal(user.$id, targetId, {
				type: "chat_message",
				message: msg
			});
		} catch (_e) {
			console.error("Failed to broadcast message:", _e);
		}
	};
	(0, import_react.useEffect)(() => {
		const initDirectCall = async () => {
			if (!user || !conversationId || targetId) return;
			try {
				const other = (await ChatService.getConversationById(conversationId, user.$id)).participants.find((p) => p !== user.$id);
				if (other) {
					setTargetId(other);
					if (isCaller) rtcManager.current?.createOffer(user.$id, other);
				}
			} catch (_e) {
				console.error("Failed to init direct call:", _e);
			}
		};
		if (conversationId && !targetId) {
			const timer = setTimeout(() => {
				initDirectCall();
			}, 0);
			return () => clearTimeout(timer);
		}
	}, [
		conversationId,
		targetId,
		user,
		isCaller
	]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		rtcManager.current = new WebRTCManager({
			onTrack: (stream) => {
				if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
			},
			onStateChange: (state) => setStatus(state),
			onSignal: async (signal) => {
				if ([
					"join_request",
					"let_in",
					"presence",
					"chat_message"
				].includes(signal.type)) {
					if (signal.target) try {
						await CallService.sendSignal(user.$id, signal.target, {
							...signal,
							callId: callCode || conversationId
						});
					} catch (_e) {
						console.error("Failed to send signal");
					}
					return;
				}
				if ([
					"offer",
					"answer",
					"candidate"
				].includes(signal.type)) return;
			}
		});
		const initVideo = !isCompanion && initialMediaSettings.video;
		const initAudio = !isCompanion && initialMediaSettings.audio;
		rtcManager.current.initializeLocalStream(initVideo, initAudio).then((stream) => {
			if (localVideoRef.current && initVideo) localVideoRef.current.srcObject = stream;
			if ((isCaller || autoInitiate) && targetId && !hasInitiatedCall.current) {
				hasInitiatedCall.current = true;
				rtcManager.current?.createOffer(user.$id, targetId);
			} else if ((isCaller || autoInitiate) && !targetId) setStatus("Waiting for participants...");
		}).catch((err) => {
			console.error("Failed to init media stream:", err);
			setStatus("Media Access Error");
			zt.error("Could not access camera/microphone");
		});
		const unsubscribe = client.subscribe(`databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.APP_ACTIVITY}.rows`, (response) => {
			if (response.events.some((e) => e.includes(".update") || e.includes(".create"))) {
				const activity = response.payload;
				if (!activity.customStatus) return;
				try {
					const signal = JSON.parse(activity.customStatus);
					if (signal.target !== user.$id) return;
					if (Date.now() - signal.ts > 1e4) return;
					if (signal.type === "join_request") {
						if (signal.callId === (callCode || conversationId) || !signal.callId) {
							setJoinRequests((prev) => {
								if (prev.some((r) => r.senderId === signal.sender)) return prev;
								return [...prev, {
									senderId: signal.sender,
									senderName: signal.senderName || "Guest"
								}];
							});
							zt(`Join Request from ${signal.senderName || "Guest"}`, { icon: "👋" });
						}
					} else if (signal.type === "let_in") {
						console.log("[CallInterface] Admitted by host, creating offer...");
						setStatus("Joining...");
						setTargetId(signal.sender);
						if (!hasInitiatedCall.current) {
							hasInitiatedCall.current = true;
							setTimeout(() => {
								rtcManager.current?.createOffer(user.$id, signal.sender);
							}, 500);
						}
					} else if (signal.type === "chat_message") {
						setChatMessages((prev) => [...prev, signal.message]);
						setUnreadChatCount((c) => c + 1);
						zt(`${signal.message.senderName}: ${signal.message.content.substring(0, 30)}...`, {
							icon: "💬",
							style: {
								borderRadius: "12px",
								background: "#161412",
								color: "#fff",
								border: "1px solid rgba(255,255,255,0.1)"
							}
						});
					} else rtcManager.current?.handleSignal(signal);
				} catch (_e) {}
			}
		});
		return () => {
			unsubscribe();
			if (rtcManager.current) rtcManager.current.cleanup();
		};
	}, [
		user,
		isCaller,
		autoInitiate,
		callCode,
		conversationId,
		initialMediaSettings.audio,
		initialMediaSettings.video,
		isCompanion,
		targetId
	]);
	const handleAcceptRequest = async (request) => {
		if (!user) return;
		setJoinRequests((prev) => prev.filter((r) => r.senderId !== request.senderId));
		try {
			await CallService.sendSignal(user.$id, request.senderId, {
				type: "let_in",
				callId: callCode || conversationId
			});
			setStatus("Connecting to guest...");
		} catch (_e) {
			zt.error("Failed to admit guest");
		}
	};
	const handleRejectRequest = (request) => {
		setJoinRequests((prev) => prev.filter((r) => r.senderId !== request.senderId));
	};
	const endCall = () => {
		if (rtcManager.current) rtcManager.current.cleanup();
		router.back();
	};
	(0, import_react.useEffect)(() => {
		if (!user || !callCode) return;
		const updatePresence = async () => {
			try {
				const signal = {
					type: "presence",
					sender: user.$id,
					senderName: user.name || "User",
					callId: callCode || conversationId,
					ts: Date.now()
				};
				await CallService.sendSignal(user.$id, isCaller ? "broadcast" : targetId || "host", signal);
			} catch (_e) {}
		};
		const fetchParticipants = async () => {
			setParticipants(await CallService.getActiveParticipants(callCode || conversationId || ""));
		};
		updatePresence();
		fetchParticipants();
		const interval = setInterval(() => {
			updatePresence();
			fetchParticipants();
		}, 1e4);
		return () => clearInterval(interval);
	}, [
		user,
		callCode,
		conversationId,
		isCaller,
		targetId
	]);
	(0, import_react.useEffect)(() => {
		if (!expiresAt) return;
		const interval = setInterval(() => {
			const now = /* @__PURE__ */ new Date();
			const diff = new Date(expiresAt).getTime() - now.getTime();
			if (diff <= 0) {
				setTimeRemaining("Ended");
				clearInterval(interval);
				zt.error("Call duration exceeded. Ending session...");
				setTimeout(endCall, 3e3);
				return;
			}
			const hours = Math.floor(diff / 36e5);
			const mins = Math.floor(diff % 36e5 / 6e4);
			const secs = Math.floor(diff % 6e4 / 1e3);
			if (hours > 0) setTimeRemaining(`${hours}h ${mins}m`);
			else setTimeRemaining(`${mins}m ${secs}s`);
			if (diff <= 3e5 && diff > 299e3) zt("5 minutes remaining in this session", { icon: "⏳" });
		}, 1e3);
		return () => clearInterval(interval);
	}, [expiresAt, endCall]);
	const handleCopyLink = () => {
		const url = `${window.location.origin}/call/${callCode || conversationId}`;
		navigator.clipboard.writeText(url);
		setCopied(true);
		zt.success("Link copied to clipboard");
		setTimeout(() => setCopied(false), 2e3);
	};
	const handleCopyId = () => {
		navigator.clipboard.writeText(callCode || conversationId || "");
		zt.success("Meeting ID copied");
	};
	const toggleMute = () => {
		if (localVideoRef.current?.srcObject) {
			localVideoRef.current.srcObject.getAudioTracks().forEach((track) => track.enabled = !track.enabled);
			setIsMuted(!isMuted);
		}
	};
	const toggleVideo = () => {
		if (localVideoRef.current?.srcObject) {
			localVideoRef.current.srcObject.getVideoTracks().forEach((track) => track.enabled = !track.enabled);
			setIsVideoOff(!isVideoOff);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
		sx: {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			bgcolor: "#0A0908",
			zIndex: 1300,
			display: "flex",
			flexDirection: "column",
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					flex: 1,
					position: "relative",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					p: 2
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
						elevation: 24,
						sx: {
							width: "100%",
							height: "100%",
							maxWidth: "1200px",
							maxHeight: "800px",
							bgcolor: "#161412",
							borderRadius: "32px",
							overflow: "hidden",
							position: "relative",
							border: "1px solid rgba(255,255,255,0.05)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							boxShadow: "0 50px 100px -20px rgba(0,0,0,0.7)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							component: "video",
							ref: remoteVideoRef,
							autoPlay: true,
							playsInline: true,
							sx: {
								width: "100%",
								height: "100%",
								objectFit: "cover",
								display: status === "connected" && !isVideoOff ? "block" : "none",
								transform: "scaleX(-1)"
							}
						}), (status !== "connected" || status === "failed") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								textAlign: "center",
								color: "white",
								zIndex: 1,
								px: 3
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									sx: {
										width: 120,
										height: 120,
										mb: 3,
										mx: "auto",
										bgcolor: alpha("#6366F1", .1),
										border: "2px solid #6366F1"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
										size: 64,
										color: "#6366F1"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "h4",
									sx: {
										fontWeight: 900,
										fontFamily: "var(--font-clash)",
										letterSpacing: "-0.02em",
										mb: 1
									},
									children: status === "Initializing..." ? "Kylrix Connect" : status === "new" ? "Connecting..." : status
								}),
								isCaller && !targetId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
									spacing: 2,
									alignItems: "center",
									sx: { mt: 3 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "body1",
										sx: {
											opacity: .5,
											fontWeight: 700
										},
										children: "Share this link or ID to start the session"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: 1,
										sx: {
											width: "100%",
											maxWidth: 400
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
											sx: {
												flex: 1,
												p: 1.5,
												bgcolor: "rgba(255,255,255,0.03)",
												border: "1px solid rgba(255,255,255,0.05)",
												borderRadius: 3,
												display: "flex",
												alignItems: "center",
												gap: 1,
												overflow: "hidden"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
												variant: "caption",
												sx: {
													color: "rgba(255,255,255,0.4)",
													fontWeight: 800,
													whiteSpace: "nowrap",
													textOverflow: "ellipsis",
													overflow: "hidden"
												},
												children: `${window.location.origin.replace(/^https?:\/\//, "")}/call/${callCode || conversationId}`
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
												size: "small",
												onClick: handleCopyLink,
												sx: { color: COLORS$1.primary },
												children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
											sx: {
												p: 1.5,
												bgcolor: "rgba(255,255,255,0.03)",
												border: "1px solid rgba(255,255,255,0.05)",
												borderRadius: 3,
												display: "flex",
												alignItems: "center",
												gap: 1
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, {
													size: 14,
													color: "rgba(255,255,255,0.3)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
													variant: "caption",
													sx: {
														color: "white",
														fontWeight: 900,
														fontFamily: "var(--font-jetbrains)"
													},
													children: (callCode || conversationId || "").slice(0, 8)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
													size: "small",
													onClick: handleCopyId,
													sx: { color: COLORS$1.secondary },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 })
												})
											]
										})]
									})]
								}),
								(!isCaller || targetId) && status === "Initializing..." && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
									size: 24,
									sx: {
										mt: 4,
										color: "#6366F1"
									}
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
						elevation: 12,
						sx: {
							position: "absolute",
							bottom: 40,
							right: 40,
							width: {
								xs: 120,
								sm: 180
							},
							height: {
								xs: 160,
								sm: 240
							},
							bgcolor: "#161412",
							borderRadius: "24px",
							overflow: "hidden",
							border: "2px solid rgba(255,255,255,0.1)",
							boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
							zIndex: 1301,
							transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							component: "video",
							ref: localVideoRef,
							autoPlay: true,
							playsInline: true,
							muted: true,
							sx: {
								width: "100%",
								height: "100%",
								objectFit: "cover",
								transform: "scaleX(-1)"
							}
						}), isVideoOff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								position: "absolute",
								inset: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								bgcolor: "rgba(0,0,0,0.8)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoOff, {
								size: 32,
								color: "rgba(255,255,255,0.2)"
							})
						})]
					}),
					joinRequests.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
						sx: {
							position: "absolute",
							top: 100,
							right: 40,
							width: 300,
							zIndex: 1305,
							display: "flex",
							flexDirection: "column",
							gap: 1
						},
						children: joinRequests.map((req) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
							sx: {
								p: 2,
								bgcolor: "#161412",
								border: "1px solid #6366F1",
								borderRadius: 3
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
								variant: "subtitle2",
								sx: {
									fontWeight: 800,
									color: "white",
									mb: 1.5
								},
								children: [req.senderName, " wants to join"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
								sx: {
									display: "flex",
									gap: 1
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									fullWidth: true,
									size: "small",
									variant: "contained",
									onClick: () => handleAcceptRequest(req),
									startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { size: 14 }),
									sx: {
										bgcolor: "#6366F1",
										fontWeight: 900
									},
									children: "Admit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "small",
									variant: "outlined",
									onClick: () => handleRejectRequest(req),
									sx: {
										borderColor: "rgba(255,255,255,0.1)",
										color: "white"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { size: 14 })
								})]
							})]
						}, req.senderId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							position: "absolute",
							top: 40,
							left: 40,
							display: "flex",
							flexDirection: "column",
							gap: 1.5
						},
						children: [
							callTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
								sx: {
									px: 2,
									py: 1,
									bgcolor: "rgba(22,20,18,0.6)",
									backdropFilter: "blur(10px)",
									borderRadius: 3,
									border: "1px solid rgba(255,255,255,0.05)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "subtitle2",
									sx: {
										fontWeight: 900,
										color: "white",
										fontFamily: "var(--font-clash)"
									},
									children: callTitle.toUpperCase()
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								spacing: 1.5,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
									sx: {
										display: "flex",
										alignItems: "center",
										gap: 1.5,
										px: 2,
										py: 1,
										bgcolor: "rgba(22,20,18,0.6)",
										backdropFilter: "blur(10px)",
										borderRadius: 3,
										border: "1px solid rgba(255,255,255,0.05)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { sx: {
										width: 8,
										height: 8,
										bgcolor: status === "connected" ? "#10B981" : "#F59E0B",
										borderRadius: "50%",
										boxShadow: `0 0 10px ${status === "connected" ? "#10B981" : "#F59E0B"}`
									} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: {
											fontWeight: 800,
											letterSpacing: "0.05em",
											color: "white"
										},
										children: status.toUpperCase()
									})]
								}), timeRemaining && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
									sx: {
										display: "flex",
										alignItems: "center",
										gap: 1,
										px: 2,
										py: 1,
										bgcolor: "rgba(239, 68, 68, 0.1)",
										backdropFilter: "blur(10px)",
										borderRadius: 3,
										border: "1px solid rgba(239, 68, 68, 0.2)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										size: 12,
										color: "#EF4444"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
										variant: "caption",
										sx: {
											fontWeight: 900,
											color: "#EF4444",
											fontFamily: "var(--font-jetbrains)"
										},
										children: timeRemaining
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
								sx: {
									display: "flex",
									alignItems: "center",
									gap: 1.5,
									px: 2,
									py: 1,
									bgcolor: "rgba(22,20,18,0.6)",
									backdropFilter: "blur(10px)",
									borderRadius: 3,
									border: "1px solid rgba(255,255,255,0.05)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 14,
									color: "#6366F1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
									variant: "caption",
									sx: {
										fontWeight: 800,
										color: "white",
										opacity: .8
									},
									children: [
										participants.length || 1,
										" ",
										participants.length === 1 ? "PARTICIPANT" : "PARTICIPANTS"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
								sx: {
									display: "flex",
									alignItems: "center",
									gap: 1.5,
									px: 2,
									py: 1,
									bgcolor: "rgba(22,20,18,0.6)",
									backdropFilter: "blur(10px)",
									borderRadius: 3,
									border: "1px solid rgba(255,255,255,0.05)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									size: 14,
									color: "#6366F1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										fontWeight: 800,
										color: "white",
										opacity: .8
									},
									children: "E2E ENCRYPTED P2P"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				sx: {
					height: 120,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: {
						xs: 1,
						sm: 4
					},
					bgcolor: "transparent",
					pb: 4,
					px: 2
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							display: "flex",
							gap: 1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							title: isMuted ? "Unmute" : "Mute",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: toggleMute,
								sx: {
									width: 56,
									height: 56,
									bgcolor: isMuted ? "#EF4444" : "rgba(255,255,255,0.05)",
									color: "white",
									border: "1px solid rgba(255,255,255,0.1)",
									"&:hover": { bgcolor: isMuted ? "#DC2626" : "rgba(255,255,255,0.1)" }
								},
								children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { size: 22 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { size: 22 })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							onClick: handleDeviceMenuOpen,
							size: "small",
							sx: {
								color: "rgba(255,255,255,0.3)",
								mt: -2
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 16 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						title: isScreenSharing ? "Stop Sharing" : "Share Screen",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							onClick: toggleScreenShare,
							sx: {
								width: 56,
								height: 56,
								bgcolor: isScreenSharing ? "#6366F1" : "rgba(255,255,255,0.05)",
								color: "white",
								border: "1px solid rgba(255,255,255,0.1)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { size: 22 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						title: "End Call",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fab, {
							onClick: endCall,
							sx: {
								width: 72,
								height: 72,
								bgcolor: "#EF4444",
								color: "white",
								"&:hover": {
									bgcolor: "#DC2626",
									transform: "scale(1.05)"
								},
								transition: "all 0.2s"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOff, { size: 32 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						title: isVideoOff ? "Start Video" : "Stop Video",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							onClick: toggleVideo,
							sx: {
								width: 56,
								height: 56,
								bgcolor: isVideoOff ? "#EF4444" : "rgba(255,255,255,0.05)",
								color: "white",
								border: "1px solid rgba(255,255,255,0.1)",
								"&:hover": { bgcolor: isVideoOff ? "#DC2626" : "rgba(255,255,255,0.1)" }
							},
							children: isVideoOff ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoOff, { size: 22 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { size: 22 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						title: isRecording ? "Stop Recording" : "Record Call",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
							onClick: toggleRecording,
							sx: {
								width: 56,
								height: 56,
								bgcolor: "rgba(255,255,255,0.05)",
								color: isRecording ? "#EF4444" : "white",
								border: "1px solid rgba(255,255,255,0.1)"
							},
							children: isRecording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
								size: 20,
								fill: isRecording ? "#EF4444" : "none"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						title: "Messages",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							badgeContent: unreadChatCount,
							color: "primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: () => {
									setIsChatOpen(!isChatOpen);
									setUnreadChatCount(0);
								},
								sx: {
									width: 56,
									height: 56,
									bgcolor: isChatOpen ? "#6366F1" : "rgba(255,255,255,0.05)",
									color: "white",
									border: "1px solid rgba(255,255,255,0.1)",
									"&:hover": { bgcolor: isChatOpen ? "#4F46E5" : "rgba(255,255,255,0.1)" }
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 22 })
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, {
				anchorEl: deviceMenuAnchor,
				open: Boolean(deviceMenuAnchor),
				onClose: () => setDeviceMenuAnchor(null),
				PaperProps: { sx: {
					bgcolor: "#161412",
					color: "white",
					border: "1px solid rgba(255,255,255,0.1)",
					borderRadius: 3,
					mt: -10
				} },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							px: 2,
							py: 1,
							display: "block",
							opacity: .5,
							fontWeight: 800
						},
						children: "AUDIO INPUT"
					}),
					devices.filter((d) => d.kind === "audioinput").map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: () => handleSwitchDevice("audioinput", d.deviceId),
						sx: {
							fontSize: "0.8rem",
							py: 1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
							size: 16,
							color: "white"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, { primary: d.label || `Microphone ${d.deviceId.slice(0, 5)}` })]
					}, d.deviceId)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: { opacity: .1 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "caption",
						sx: {
							px: 2,
							py: 1,
							display: "block",
							opacity: .5,
							fontWeight: 800
						},
						children: "VIDEO INPUT"
					}),
					devices.filter((d) => d.kind === "videoinput").map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuItem, {
						onClick: () => handleSwitchDevice("videoinput", d.deviceId),
						sx: {
							fontSize: "0.8rem",
							py: 1
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
							size: 16,
							color: "white"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText, { primary: d.label || `Camera ${d.deviceId.slice(0, 5)}` })]
					}, d.deviceId))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InCallChat, {
				isOpen: isChatOpen,
				onClose: () => setIsChatOpen(false),
				messages: chatMessages,
				onSendMessage: broadcastMessage
			})
		]
	});
};
var COLORS$1 = {
	background: "#0A0908",
	surface: "#161412",
	hover: "#1C1A18",
	primary: "#6366F1",
	secondary: "#F59E0B",
	rim: "rgba(255, 255, 255, 0.05)"
};
var COLORS = {
	background: "#0A0908",
	surface: "#161412",
	hover: "#1C1A18",
	primary: "#6366F1",
	secondary: "#F59E0B",
	success: "#10B981",
	error: "#EF4444",
	rim: "rgba(255, 255, 255, 0.05)"
};
function PreCallCheck({ onJoin, userProfile, isCompanionDetected = false }) {
	const [videoEnabled, setVideoEnabled] = (0, import_react.useState)(true);
	const [audioEnabled, setAudioEnabled] = (0, import_react.useState)(true);
	const [companionMode, setCompanionMode] = (0, import_react.useState)(isCompanionDetected);
	const [permissions, setPermissions] = (0, import_react.useState)({
		video: false,
		audio: false
	});
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const checkPermissions = (0, import_react.useCallback)(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			});
			streamRef.current = stream;
			if (videoRef.current) videoRef.current.srcObject = stream;
			setPermissions({
				video: true,
				audio: true
			});
		} catch (_e) {
			console.error("Permission denied:", _e);
			try {
				streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
				setPermissions({
					video: false,
					audio: true
				});
			} catch (_e2) {
				setPermissions({
					video: false,
					audio: false
				});
			}
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			checkPermissions();
		}, 0);
		return () => {
			clearTimeout(timer);
			if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
		};
	}, [checkPermissions]);
	const toggleVideo = () => {
		if (!permissions.video) return;
		setVideoEnabled(!videoEnabled);
		if (streamRef.current) streamRef.current.getVideoTracks().forEach((track) => track.enabled = !videoEnabled);
	};
	const toggleAudio = () => {
		if (!permissions.audio) return;
		setAudioEnabled(!audioEnabled);
		if (streamRef.current) streamRef.current.getAudioTracks().forEach((track) => track.enabled = !audioEnabled);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
		sx: {
			p: 4,
			bgcolor: COLORS.surface,
			borderRadius: 8,
			border: `1px solid ${COLORS.rim}`,
			maxWidth: 800,
			width: "100%",
			boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
			direction: {
				xs: "column",
				md: "row"
			},
			spacing: 4,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
				sx: {
					flex: 1.5,
					position: "relative"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					sx: {
						width: "100%",
						aspectRatio: "16/9",
						bgcolor: "#000",
						borderRadius: 6,
						overflow: "hidden",
						position: "relative",
						border: `1px solid ${COLORS.rim}`
					},
					children: [videoEnabled && permissions.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						autoPlay: true,
						muted: true,
						playsInline: true,
						style: {
							width: "100%",
							height: "100%",
							objectFit: "cover"
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
						sx: {
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							gap: 2
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							src: userProfile?.avatar,
							sx: {
								width: 80,
								height: 80,
								border: `2px solid ${alpha(COLORS.primary, .2)}`
							},
							children: userProfile?.displayName?.charAt(0) || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 32 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "body2",
							sx: {
								color: "rgba(255,255,255,0.4)",
								fontWeight: 700
							},
							children: "Camera is off"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						direction: "row",
						spacing: 2,
						sx: {
							position: "absolute",
							bottom: 16,
							left: "50%",
							transform: "translateX(-50%)",
							zIndex: 10
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							title: permissions.audio ? audioEnabled ? "Mute" : "Unmute" : "Microphone blocked",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: toggleAudio,
								sx: {
									bgcolor: audioEnabled ? "rgba(255,255,255,0.1)" : COLORS.error,
									color: "white",
									"&:hover": { bgcolor: audioEnabled ? "rgba(255,255,255,0.2)" : alpha(COLORS.error, .8) },
									backdropFilter: "blur(10px)"
								},
								children: audioEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { size: 20 })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							title: permissions.video ? videoEnabled ? "Turn off camera" : "Turn on camera" : "Camera blocked",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
								onClick: toggleVideo,
								sx: {
									bgcolor: videoEnabled ? "rgba(255,255,255,0.1)" : COLORS.error,
									color: "white",
									"&:hover": { bgcolor: videoEnabled ? "rgba(255,255,255,0.2)" : alpha(COLORS.error, .8) },
									backdropFilter: "blur(10px)"
								},
								children: videoEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoOff, { size: 20 })
							})
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
				sx: { flex: 1 },
				spacing: 3,
				justifyContent: "center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "h5",
						sx: {
							fontWeight: 900,
							fontFamily: "var(--font-clash)",
							mb: 1
						},
						children: "Ready to join?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						variant: "body2",
						sx: {
							color: "rgba(255,255,255,0.5)",
							fontWeight: 700
						},
						children: "Check your hardware settings before entering."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
						spacing: 2,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							sx: {
								p: 2,
								borderRadius: 4,
								bgcolor: alpha(permissions.video && permissions.audio ? COLORS.success : COLORS.secondary, .05),
								border: `1px solid ${alpha(permissions.video && permissions.audio ? COLORS.success : COLORS.secondary, .1)}`
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								spacing: 1.5,
								alignItems: "center",
								children: [permissions.video && permissions.audio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									size: 18,
									color: COLORS.success
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
									size: 18,
									color: COLORS.secondary
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									sx: {
										fontWeight: 800,
										color: permissions.video && permissions.audio ? COLORS.success : COLORS.secondary
									},
									children: permissions.video && permissions.audio ? "Hardware verified and ready" : "Limited hardware access detected"
								})]
							})
						}), isCompanionDetected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							fullWidth: true,
							variant: "outlined",
							onClick: () => setCompanionMode(!companionMode),
							startIcon: companionMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { size: 18 }),
							sx: {
								py: 1.5,
								borderRadius: 4,
								borderColor: companionMode ? COLORS.secondary : COLORS.rim,
								color: companionMode ? COLORS.secondary : "white",
								bgcolor: companionMode ? alpha(COLORS.secondary, .05) : "transparent",
								textTransform: "none",
								fontWeight: 800,
								"&:hover": {
									borderColor: COLORS.secondary,
									bgcolor: alpha(COLORS.secondary, .1)
								}
							},
							children: companionMode ? "Companion Mode Active" : "Join as Companion?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						fullWidth: true,
						variant: "contained",
						size: "large",
						onClick: () => onJoin({
							video: videoEnabled && permissions.video,
							audio: audioEnabled && permissions.audio,
							companion: companionMode
						}),
						sx: {
							bgcolor: COLORS.primary,
							color: "white",
							py: 2,
							borderRadius: 4,
							fontWeight: 900,
							fontSize: "1.1rem",
							textTransform: "none",
							boxShadow: `0 20px 40px -10px ${alpha(COLORS.primary, .3)}`,
							"&:hover": { bgcolor: alpha(COLORS.primary, .9) }
						},
						children: "Join Now"
					})
				]
			})]
		})
	});
}
function PublicCall({ id }) {
	const { user, login } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const callerRequested = searchParams.get("caller") === "true";
	const requestedType = searchParams.get("type") === "audio" ? "audio" : "video";
	const [linkData, setLinkData] = (0, import_react.useState)(null);
	const [hostProfile, setHostProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [joining, setJoining] = (0, import_react.useState)(false);
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [isAdmitted, setIsAdmitted] = (0, import_react.useState)(false);
	const [requestStatus, setRequestStatus] = (0, import_react.useState)("none");
	const [localUser, setLocalUser] = (0, import_react.useState)(user);
	const [timeToStart, setTimeToStart] = (0, import_react.useState)("");
	const [showPreCheck, setShowPreCheck] = (0, import_react.useState)(false);
	const [mediaSettings, setMediaSettings] = (0, import_react.useState)({
		video: true,
		audio: true,
		companion: false
	});
	const [isCompanionDetected, setIsCompanionDetected] = (0, import_react.useState)(false);
	const [callMode, setCallMode] = (0, import_react.useState)(null);
	const [autoStartAfterPreCheck, setAutoStartAfterPreCheck] = (0, import_react.useState)(false);
	const [conversationTitle, setConversationTitle] = (0, import_react.useState)("");
	const [resolvedTargetId, setResolvedTargetId] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		setLocalUser(user);
	}, [user]);
	(0, import_react.useEffect)(() => {
		if (!linkData?.isScheduled) return;
		const interval = setInterval(() => {
			const now = /* @__PURE__ */ new Date();
			const diff = new Date(linkData.startsAt).getTime() - now.getTime();
			if (diff <= 0) {
				setLinkData((prev) => ({
					...prev,
					isScheduled: false
				}));
				clearInterval(interval);
				return;
			}
			setTimeToStart(`${Math.floor(diff / 6e4)}m ${Math.floor(diff % 6e4 / 1e3)}s`);
		}, 1e3);
		return () => clearInterval(interval);
	}, [linkData]);
	const loadCallDetails = (0, import_react.useCallback)(async () => {
		try {
			let link = await CallService.getCallLink(id);
			if (!link) link = await CallService.getCallLinkByCode(id);
			if (link) {
				setCallMode("link");
				setLinkData(link);
				setShowPreCheck(false);
				setAutoStartAfterPreCheck(false);
				setResolvedTargetId(link.userId);
				if (link.isExpired) CallService.cleanupLink(link.$id).catch((error) => {
					console.warn("[PublicCall] Failed to clean expired call link", error);
				});
				setHostProfile(await UsersService.getProfileById(link.userId));
				if (user) setIsCompanionDetected((await CallService.getActiveParticipants(id)).some((p) => p.userId === user.$id));
				return;
			}
			const conversation = await ChatService.getConversationById(id, user?.$id);
			const participants = Array.from(new Set((conversation?.participants || []).filter((participant) => typeof participant === "string" && participant.length > 0)));
			const currentUserId = user?.$id;
			if (!conversation || !currentUserId || !participants.includes(currentUserId)) {
				setLoading(false);
				return;
			}
			const otherParticipantId = participants.find((participant) => participant !== currentUserId) || conversation.otherUserId || conversation.creatorId;
			if (!otherParticipantId) {
				setLoading(false);
				return;
			}
			setCallMode("conversation");
			setLinkData({
				$id: conversation.$id,
				userId: currentUserId,
				type: requestedType,
				title: conversation.name || "Direct Chat",
				isExpired: false,
				isScheduled: false,
				startsAt: null,
				expiresAt: null
			});
			setConversationTitle(conversation.name || "Direct Chat");
			setResolvedTargetId(otherParticipantId);
			setHostProfile(await UsersService.getProfileById(otherParticipantId));
			setIsCompanionDetected(false);
			setAutoStartAfterPreCheck(false);
			setShowPreCheck(true);
		} catch (_e) {
			console.error("Failed to load call details:", _e);
		} finally {
			setLoading(false);
		}
	}, [
		id,
		requestedType,
		user
	]);
	(0, import_react.useEffect)(() => {
		loadCallDetails();
	}, [loadCallDetails, id]);
	(0, import_react.useEffect)(() => {
		if (!localUser || requestStatus !== "pending") return;
		const unsubscribe = client.subscribe(`databases.${APPWRITE_CONFIG.DATABASES.CHAT}.tables.${APPWRITE_CONFIG.TABLES.CHAT.APP_ACTIVITY}.rows`, (response) => {
			if (response.events.some((e) => e.includes(".update") || e.includes(".create"))) {
				const activity = response.payload;
				if (!activity.customStatus) return;
				try {
					const signal = JSON.parse(activity.customStatus);
					if (signal.target === localUser.$id && signal.type === "let_in" && (signal.callId === id || !signal.callId)) {
						setShowPreCheck(true);
						setJoining(false);
						setAutoStartAfterPreCheck(true);
						zt.success("Host admitted you to the call!");
					}
				} catch (_e) {}
			}
		});
		return () => unsubscribe();
	}, [
		localUser,
		requestStatus,
		id
	]);
	const handleJoinRequest = async () => {
		if (!displayName.trim() && !localUser) {
			zt.error("Please enter your name");
			return;
		}
		setJoining(true);
		try {
			let activeUser = localUser;
			if (!activeUser) {
				await CallService.createAnonymousSession();
				activeUser = await account.get();
				setLocalUser(activeUser);
			}
			if (activeUser.$id === linkData.userId) {
				setShowPreCheck(true);
				setJoining(false);
				setAutoStartAfterPreCheck(false);
				return;
			}
			await CallService.sendSignal(activeUser.$id, linkData.userId, {
				type: "join_request",
				senderName: displayName || activeUser.name || "Guest",
				callId: id
			});
			setRequestStatus("pending");
			zt("Request sent to host. Please wait...", { icon: "⏳" });
		} catch (_e) {
			setJoining(false);
			zt.error("Failed to send join request");
		}
	};
	const onPreCheckJoin = (settings) => {
		setMediaSettings(settings);
		setIsAdmitted(true);
		setShowPreCheck(false);
	};
	const isConversationCall = callMode === "conversation";
	const interfaceIsCaller = isConversationCall ? callerRequested : localUser?.$id === linkData?.userId;
	const interfaceTargetId = isConversationCall ? resolvedTargetId : interfaceIsCaller ? void 0 : linkData?.userId;
	const interfaceAutoInitiate = isConversationCall ? callerRequested : autoStartAfterPreCheck;
	const interfaceTitle = isConversationCall ? conversationTitle : linkData?.title || "Join Call";
	const contactLabel = isConversationCall ? "Calling" : "Hosted by";
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: {
			minHeight: "100vh",
			bgcolor: "#0A0908",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, { sx: { color: "#6366F1" } })
	});
	if (!linkData || linkData.isExpired) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: {
			minHeight: "100vh",
			bgcolor: "#0A0908",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			p: 3
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Paper, {
			sx: {
				p: 6,
				textAlign: "center",
				maxWidth: 500,
				bgcolor: "#161412",
				borderRadius: 8,
				border: "1px solid rgba(255,255,255,0.05)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
					size: 64,
					color: "#EF4444",
					style: { marginBottom: "24px" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "h4",
					sx: {
						fontWeight: 900,
						mb: 2,
						fontFamily: "var(--font-clash)"
					},
					children: linkData?.isExpired ? "Call Ended" : "Link Not Found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					variant: "body1",
					sx: {
						color: "rgba(255,255,255,0.5)",
						mb: 4
					},
					children: linkData?.isExpired ? "This call has expired. Links last for 3 hours from the start time. Please ask the host for a new link." : "This call link is no longer active or never existed. Check with the host for a new link."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outlined",
					startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 18 }),
					onClick: () => router.push("/"),
					sx: {
						borderColor: "rgba(255,255,255,0.1)",
						color: "white",
						borderRadius: 3,
						px: 4
					},
					children: "Back to Feed"
				})
			]
		})
	});
	if (isAdmitted || localUser?.$id === linkData.userId && showPreCheck || showPreCheck) {
		if (showPreCheck) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
			sx: {
				minHeight: "100vh",
				bgcolor: "#0A0908",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 3
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreCallCheck, {
				onJoin: onPreCheckJoin,
				userProfile: localUser,
				isCompanionDetected
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallInterface, {
			isCaller: Boolean(interfaceIsCaller),
			callType: isConversationCall ? requestedType : linkData.type,
			targetId: interfaceTargetId,
			callCode: id,
			initialMediaSettings: mediaSettings,
			autoInitiate: interfaceAutoInitiate,
			callTitle: interfaceTitle,
			expiresAt: linkData.expiresAt
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		sx: {
			minHeight: "100vh",
			bgcolor: "#0A0908",
			backgroundImage: "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			p: 3
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			maxWidth: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paper, {
				sx: {
					p: {
						xs: 4,
						md: 6
					},
					bgcolor: "#161412",
					borderRadius: 8,
					border: "1px solid rgba(255,255,255,0.05)",
					boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
					spacing: 4,
					alignItems: "center",
					textAlign: "center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							overlap: "circular",
							anchorOrigin: {
								vertical: "bottom",
								horizontal: "right"
							},
							badgeContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
								sx: {
									p: .5,
									bgcolor: "#10B981",
									borderRadius: "50%",
									border: "3px solid #161412"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
									size: 14,
									color: "white"
								})
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								src: hostProfile?.avatar,
								sx: {
									width: 100,
									height: 100,
									border: "3px solid rgba(99, 102, 241, 0.2)"
								},
								children: hostProfile?.displayName?.charAt(0) || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 40 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
							variant: "h4",
							sx: {
								fontWeight: 900,
								fontFamily: "var(--font-clash)",
								letterSpacing: "-0.02em",
								mb: 1
							},
							children: interfaceTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
							variant: "body1",
							sx: {
								color: "rgba(255,255,255,0.5)",
								fontWeight: 700
							},
							children: [
								contactLabel,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { color: "#6366F1" },
									children: ["@", hostProfile?.username || "user"]
								})
							]
						})] }),
						linkData.isScheduled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							spacing: 3,
							alignItems: "center",
							sx: {
								py: 2,
								width: "100%"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
									sx: {
										p: 3,
										borderRadius: 4,
										bgcolor: "rgba(99, 102, 241, 0.05)",
										border: "1px dashed rgba(99, 102, 241, 0.2)",
										width: "100%"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: 2,
										alignItems: "center",
										justifyContent: "center",
										sx: { mb: 2 },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
											size: 20,
											color: "#6366F1"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "h6",
											fontWeight: 800,
											children: new Date(linkData.startsAt).toLocaleDateString()
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
										direction: "row",
										spacing: 2,
										alignItems: "center",
										justifyContent: "center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											size: 20,
											color: "#6366F1"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
											variant: "h5",
											fontWeight: 900,
											sx: { fontFamily: "var(--font-jetbrains)" },
											children: new Date(linkData.startsAt).toLocaleTimeString()
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
									variant: "body2",
									sx: { color: "rgba(255,255,255,0.4)" },
									children: ["Starts in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "#6366F1",
											fontWeight: 900
										},
										children: timeToStart || "..."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									fullWidth: true,
									variant: "outlined",
									disabled: true,
									sx: {
										py: 2,
										borderRadius: 4,
										borderColor: "rgba(255,255,255,0.05)",
										color: "rgba(255,255,255,0.2)"
									},
									children: "Waiting for start time..."
								})
							]
						}) : requestStatus === "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							spacing: 3,
							sx: { width: "100%" },
							children: [
								!user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									fullWidth: true,
									placeholder: "What's your name?",
									value: displayName,
									onChange: (e) => setDisplayName(e.target.value),
									variant: "outlined",
									InputProps: { sx: {
										bgcolor: "rgba(255,255,255,0.03)",
										borderRadius: 4,
										color: "white",
										fontWeight: 800,
										"& fieldset": { borderColor: "rgba(255,255,255,0.1)" }
									} }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									fullWidth: true,
									variant: "contained",
									size: "large",
									onClick: handleJoinRequest,
									disabled: joining,
									sx: {
										bgcolor: "#6366F1",
										color: "white",
										py: 2,
										borderRadius: 4,
										fontWeight: 900,
										fontSize: "1.1rem",
										textTransform: "none",
										"&:hover": { bgcolor: "#4F46E5" }
									},
									children: joining ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
										size: 24,
										color: "inherit"
									}) : user ? "Enter Meeting" : "Ask to Join"
								}),
								!user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									fullWidth: true,
									startIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { size: 18 }),
									onClick: () => login(),
									sx: {
										color: "rgba(255,255,255,0.4)",
										fontWeight: 800
									},
									children: "Sign in for better experience"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
							spacing: 3,
							alignItems: "center",
							sx: { py: 2 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
									size: 48,
									sx: { color: "#6366F1" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "h6",
									sx: {
										fontWeight: 800,
										color: "white"
									},
									children: "Waiting for host..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "body2",
									sx: {
										color: "rgba(255,255,255,0.4)",
										maxWidth: 300
									},
									children: "The host has been notified of your request to join this encrypted P2P session."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							sx: {
								pt: 2,
								display: "flex",
								gap: 3,
								opacity: .3
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								spacing: 1,
								alignItems: "center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									fontWeight: 900,
									children: "P2P MESH"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, {
								direction: "row",
								spacing: 1,
								alignItems: "center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
									variant: "caption",
									fontWeight: 900,
									children: "ENCRYPTED"
								})]
							})]
						})
					]
				})
			})
		})
	});
}
function CallPage() {
	const id = useParams$1().id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicCall, { id });
}
var SplitComponent = CallPage;
//#endregion
export { SplitComponent as component };
