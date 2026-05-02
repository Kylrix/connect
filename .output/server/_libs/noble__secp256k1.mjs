//#region node_modules/.pnpm/@noble+secp256k1@3.1.0/node_modules/@noble/secp256k1/index.js
/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
/**
* 5KB JS implementation of secp256k1 ECDSA / Schnorr signatures & ECDH.
* Compliant with RFC6979 & BIP340.
* @module
*/
/**
* Curve params from SEC 2 v2 §2.4.1.
* secp256k1 is a short Weierstrass / Koblitz curve with equation
* `y² == x³ + ax + b`.
* * P = `2n**256n - 2n**32n - 977n` // field over which calculations are done
* * N = `2n**256n - 0x14551231950b75fc4402da1732fc9bebfn` // group order, amount of curve points
* * h = `1n` // cofactor
* * a = `0n` // equation param
* * b = `7n` // equation param
* * Gx, Gy are coordinates of Generator / base point
*/
var secp256k1_CURVE = Object.freeze({
	p: 115792089237316195423570985008687907853269984665640564039457584007908834671663n,
	n: 115792089237316195423570985008687907852837564279074904382605163141518161494337n,
	h: 1n,
	a: 0n,
	b: 7n,
	Gx: 55066263022277343669578718895168534326250603453777594175500187360389116729240n,
	Gy: 32670510020758816978083085130507043184471273380659243275938904335757337482424n
});
var { p: P, n: N, Gx, Gy, b: _b } = secp256k1_CURVE;
var L = 32;
var L2 = 64;
var lengths = {
	publicKey: L + 1,
	publicKeyUncompressed: L2 + 1,
	signature: L2,
	seed: L + L / 2
};
var err = (message = "", E = Error) => {
	const e = new E(message);
	const { captureStackTrace } = Error;
	if (typeof captureStackTrace === "function") captureStackTrace(e, err);
	throw e;
};
var isBytes = (a) => a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && a.BYTES_PER_ELEMENT === 1;
/** Asserts something is Bytes. */
var abytes = (value, length, title = "") => {
	const bytes = isBytes(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title && `"${title}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		const msg = prefix + "expected Uint8Array" + ofLen + ", got " + got;
		return bytes ? err(msg, RangeError) : err(msg, TypeError);
	}
	return value;
};
/** create Uint8Array */
var u8n = (len) => new Uint8Array(len);
var padh = (n, pad) => n.toString(16).padStart(pad, "0");
/** Render bytes as lowercase hex. */
var bytesToHex = (b) => {
	let hex = "";
	for (const e of abytes(b)) hex += padh(e, 2);
	return hex;
};
var C = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
var _ch = (ch) => ch >= C._0 && ch <= C._9 ? ch - C._0 : ch >= C.A && ch <= C.F ? ch - (C.A - 10) : ch >= C.a && ch <= C.f ? ch - (C.a - 10) : void 0;
var hexToBytes = (hex) => {
	const e = "hex invalid";
	if (typeof hex !== "string") return err(e);
	const hl = hex.length;
	const al = hl / 2;
	if (hl % 2) return err(e);
	const array = u8n(al);
	for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		const n1 = _ch(hex.charCodeAt(hi));
		const n2 = _ch(hex.charCodeAt(hi + 1));
		if (n1 === void 0 || n2 === void 0) return err(e);
		array[ai] = n1 * 16 + n2;
	}
	return array;
};
var subtle = () => globalThis?.crypto?.subtle ?? err("crypto.subtle must be defined, consider polyfill");
var concatBytes = (...arrs) => {
	let len = 0;
	for (const a of arrs) len += abytes(a).length;
	const r = u8n(len);
	let pad = 0;
	for (const a of arrs) r.set(a, pad), pad += a.length;
	return r;
};
/**
* WebCrypto OS-level CSPRNG (random number generator).
* Will throw when not available; large-request ceilings are delegated to getRandomValues().
*/
var randomBytes = (len = L) => (globalThis?.crypto).getRandomValues(u8n(len));
var big = BigInt;
var arange = (n, min, max, msg = "bad number: out of range") => {
	if (typeof n !== "bigint") return err(msg, TypeError);
	if (min <= n && n < max) return n;
	return err(msg, RangeError);
};
/** Canonical modular reduction. Callers must provide a positive modulus. */
var M = (a, b = P) => {
	const r = a % b;
	return r >= 0n ? r : b + r;
};
var modN = (a) => M(a, N);
/** Modular inversion using eucledian GCD (non-CT). No negative exponent for now. */
var invert = (num, md) => {
	if (num === 0n || md <= 0n) err("no inverse n=" + num + " mod=" + md);
	let a = M(num, md), b = md, x = 0n, y = 1n, u = 1n, v = 0n;
	while (a !== 0n) {
		const q = b / a, r = b % a;
		const m = x - u * q, n = y - v * q;
		b = a, a = r, x = u, y = v, u = m, v = n;
	}
	return b === 1n ? M(x, md) : err("no inverse");
};
var callHash = (name) => {
	const fn = hashes[name];
	if (typeof fn !== "function") err("hashes." + name + " not set");
	return fn;
};
var gh = (name, a, b) => abytes(callHash(name)(a, b), L, "digest");
var gha = (name, a, b) => Promise.resolve(callHash(name)(a, b)).then((r) => abytes(r, L, "digest"));
var apoint = (p) => p instanceof Point ? p : err("Point expected");
/**
* secp256k1 formula. Koblitz curves are subclass of weierstrass curves with a=0,
* making it x³+b; callers validate x first.
*/
var koblitz = (x) => M(M(x * x) * x + _b);
/** assert is element of field mod P (incl. 0 for projective infinity coordinates) */
var FpIsValid = (n) => arange(n, 0n, P);
/** assert is element of field mod P (excl. 0 where current callers need a non-zero coordinate) */
var FpIsValidNot0 = (n) => arange(n, 1n, P);
/** assert is element of field mod N (excl. 0), matching the shared BIP340 scalar-failure rule used here */
var FnIsValidNot0 = (n) => arange(n, 1n, N);
var isEven = (y) => !(y & 1n);
/** create Uint8Array of byte n */
var u8of = (n) => Uint8Array.of(n);
/** SEC 1 compressed-prefix helper. Parity only: callers validate y before asking for the prefix byte. */
var getPrefix = (y) => u8of(isEven(y) ? 2 : 3);
/** lift_x from BIP340 returns the unique even square root for x³+7.
* SEC 1 callers still flip it for the odd-prefix branch. */
var lift_x = (x) => {
	const c = koblitz(FpIsValidNot0(x));
	let r = 1n;
	for (let num = c, e = (P + 1n) / 4n; e > 0n; e >>= 1n) {
		if (e & 1n) r = r * num % P;
		num = num * num % P;
	}
	if (M(r * r) !== c) err("sqrt invalid");
	return isEven(r) ? r : M(-r);
};
/**
* Point in 3d xyz projective coordinates. 3d takes less inversions than 2d.
* @param X - X coordinate.
* @param Y - Y coordinate.
* @param Z - projective Z coordinate.
* @example
* Do point arithmetic with the base point and encode the result as hex.
* ```ts
* import { Point } from '@noble/secp256k1';
* const hex = Point.BASE.double().toHex();
* ```
*/
var Point = class Point {
	static BASE;
	static ZERO;
	X;
	Y;
	Z;
	constructor(X, Y, Z) {
		this.X = FpIsValid(X);
		this.Y = FpIsValidNot0(Y);
		this.Z = FpIsValid(Z);
		Object.freeze(this);
	}
	/** Returns the shared curve metadata object by reference.
	* It is readonly only at type level, and mutating it won't retarget arithmetic,
	* which already uses module-load snapshots. */
	static CURVE() {
		return secp256k1_CURVE;
	}
	/** Create 3d xyz point from 2d xy. (0, 0) => (0, 1, 0), not (0, 0, 1) */
	static fromAffine(ap) {
		const { x, y } = ap;
		return x === 0n && y === 0n ? I : new Point(x, y, 1n);
	}
	/** Convert Uint8Array or hex string to Point. */
	static fromBytes(bytes) {
		abytes(bytes);
		const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
		let p = void 0;
		const length = bytes.length;
		const head = bytes[0];
		const tail = bytes.subarray(1);
		const x = sliceBytesNumBE(tail, 0, L);
		if (length === comp && (head === 2 || head === 3)) {
			let y = lift_x(x);
			if (head === 3) y = M(-y);
			p = new Point(x, y, 1n);
		}
		if (length === uncomp && head === 4) p = new Point(x, sliceBytesNumBE(tail, L, L2), 1n);
		return p ? p.assertValidity() : err("bad point: not on curve");
	}
	static fromHex(hex) {
		return Point.fromBytes(hexToBytes(hex));
	}
	get x() {
		return this.toAffine().x;
	}
	get y() {
		return this.toAffine().y;
	}
	/** Equality check: compare points P&Q. */
	equals(other) {
		const { X: X1, Y: Y1, Z: Z1 } = this;
		const { X: X2, Y: Y2, Z: Z2 } = apoint(other);
		const X1Z2 = M(X1 * Z2);
		const X2Z1 = M(X2 * Z1);
		const Y1Z2 = M(Y1 * Z2);
		const Y2Z1 = M(Y2 * Z1);
		return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
	}
	is0() {
		return this.equals(I);
	}
	/** Flip point over y coordinate. */
	negate() {
		return new Point(this.X, M(-this.Y), this.Z);
	}
	/** Point doubling: P+P, complete formula. */
	double() {
		return this.add(this);
	}
	/**
	* Point addition: P+Q, complete, exception-free formula
	* (Renes-Costello-Batina, algo 1 of [2015/1060](https://eprint.iacr.org/2015/1060)).
	* Cost: `12M + 0S + 3*a + 3*b3 + 23add`.
	*/
	add(other) {
		const { X: X1, Y: Y1, Z: Z1 } = this;
		const { X: X2, Y: Y2, Z: Z2 } = apoint(other);
		const a = 0n;
		const b = _b;
		let X3 = 0n, Y3 = 0n, Z3 = 0n;
		const b3 = M(b * 3n);
		let t0 = M(X1 * X2), t1 = M(Y1 * Y2), t2 = M(Z1 * Z2), t3 = M(X1 + Y1);
		let t4 = M(X2 + Y2);
		t3 = M(t3 * t4);
		t4 = M(t0 + t1);
		t3 = M(t3 - t4);
		t4 = M(X1 + Z1);
		let t5 = M(X2 + Z2);
		t4 = M(t4 * t5);
		t5 = M(t0 + t2);
		t4 = M(t4 - t5);
		t5 = M(Y1 + Z1);
		X3 = M(Y2 + Z2);
		t5 = M(t5 * X3);
		X3 = M(t1 + t2);
		t5 = M(t5 - X3);
		Z3 = M(a * t4);
		X3 = M(b3 * t2);
		Z3 = M(X3 + Z3);
		X3 = M(t1 - Z3);
		Z3 = M(t1 + Z3);
		Y3 = M(X3 * Z3);
		t1 = M(t0 + t0);
		t1 = M(t1 + t0);
		t2 = M(a * t2);
		t4 = M(b3 * t4);
		t1 = M(t1 + t2);
		t2 = M(t0 - t2);
		t2 = M(a * t2);
		t4 = M(t4 + t2);
		t0 = M(t1 * t4);
		Y3 = M(Y3 + t0);
		t0 = M(t5 * t4);
		X3 = M(t3 * X3);
		X3 = M(X3 - t0);
		t0 = M(t3 * t1);
		Z3 = M(t5 * Z3);
		Z3 = M(Z3 + t0);
		return new Point(X3, Y3, Z3);
	}
	subtract(other) {
		return this.add(apoint(other).negate());
	}
	/**
	* Point-by-scalar multiplication. Scalar must be in range 1 <= n < CURVE.n.
	* Uses {@link wNAF} for base point.
	* Uses fake point to mitigate leakage shape in JS, not as a hard constant-time guarantee.
	* @param n scalar by which point is multiplied
	* @param safe safe mode guards against timing attacks; unsafe mode is faster
	*/
	multiply(n, safe = true) {
		if (!safe && n === 0n) return I;
		FnIsValidNot0(n);
		if (n === 1n) return this;
		if (this.equals(G)) return wNAF(n).p;
		let p = I;
		let f = G;
		for (let d = this; n > 0n; d = d.double(), n >>= 1n) if (n & 1n) p = p.add(d);
		else if (safe) f = f.add(d);
		return p;
	}
	multiplyUnsafe(scalar) {
		return this.multiply(scalar, false);
	}
	/** Convert point to 2d xy affine point. (X, Y, Z) ∋ (x=X/Z, y=Y/Z) */
	toAffine() {
		const { X: x, Y: y, Z: z } = this;
		if (this.equals(I)) return {
			x: 0n,
			y: 0n
		};
		if (z === 1n) return {
			x,
			y
		};
		const iz = invert(z, P);
		if (M(z * iz) !== 1n) err("inverse invalid");
		return {
			x: M(x * iz),
			y: M(y * iz)
		};
	}
	/** Checks if the point is valid and on-curve. */
	assertValidity() {
		const { x, y } = this.toAffine();
		FpIsValidNot0(x);
		FpIsValidNot0(y);
		return M(y * y) === koblitz(x) ? this : err("bad point: not on curve");
	}
	/** Converts point to 33/65-byte Uint8Array. */
	toBytes(isCompressed = true) {
		const { x, y } = this.assertValidity().toAffine();
		const x32b = numTo32b(x);
		if (isCompressed) return concatBytes(getPrefix(y), x32b);
		return concatBytes(u8of(4), x32b, numTo32b(y));
	}
	toHex(isCompressed) {
		return bytesToHex(this.toBytes(isCompressed));
	}
};
/** Generator / base point */
var G = new Point(Gx, Gy, 1n);
/** Identity / zero point */
var I = new Point(0n, 1n, 0n);
Point.BASE = G;
Point.ZERO = I;
/** `Q = u1⋅G + u2⋅R`. Verifies Q is not ZERO. Unsafe: non-CT. */
var doubleScalarMulUns = (R, u1, u2) => {
	return G.multiply(u1, false).add(R.multiply(u2, false)).assertValidity();
};
var bytesToNumBE = (b) => big("0x" + (bytesToHex(b) || "0"));
var sliceBytesNumBE = (b, from, to) => bytesToNumBE(b.subarray(from, to));
var B256 = 2n ** 256n;
/** Generic 32-byte big-endian encoder. Must be 0 <= num < B256; call sites need not be field/scalar elements. */
var numTo32b = (num) => hexToBytes(padh(arange(num, 0n, B256), L2));
/** Normalize private key to scalar (bigint). Verifies scalar is in range 1 <= d < N. */
var secretKeyToScalar = (secretKey) => {
	return arange(bytesToNumBE(abytes(secretKey, L, "secret key")), 1n, N, "invalid secret key: outside of range");
};
/** For signature malleability, checks the strict upper-half predicate s > floor(N/2). */
var highS = (n) => n > N >> 1n;
/**
* Creates a SEC 1 public key from a 32-byte private key.
* @param privKey - 32-byte secret key.
* @param isCompressed - return 33-byte compressed SEC 1 encoding when `true`, otherwise 65-byte uncompressed.
* @returns serialized secp256k1 public key in SEC 1 encoding.
* @example
* Derive the serialized public key for a secp256k1 secret key.
* ```ts
* import * as secp from '@noble/secp256k1';
* const secretKey = secp.utils.randomSecretKey();
* const publicKey = secp.getPublicKey(secretKey);
* ```
*/
var getPublicKey = (privKey, isCompressed = true) => {
	return G.multiply(secretKeyToScalar(privKey)).toBytes(isCompressed);
};
var assertRecoveryBit = (recovery) => [
	0,
	1,
	2,
	3
].includes(recovery) ? recovery : err("invalid recovery id");
var assertSigFormat = (format) => {
	if (format === SIG_DER) err("Signature format \"der\" is not supported: switch to noble-curves");
	if (format != null && format !== SIG_COMPACT && format !== SIG_RECOVERED) err("Signature format must be one of: compact, recovered, der");
};
var assertSigLength = (sig, format = SIG_COMPACT) => {
	assertSigFormat(format);
	const len = lengths.signature + Number(format === SIG_RECOVERED);
	if (sig.length !== len) err(`Signature format "${format}" expects Uint8Array with length ${len}`);
};
/**
* ECDSA Signature class. Supports only compact 64-byte representation, not DER.
* @param r - signature `r` scalar.
* @param s - signature `s` scalar.
* @param recovery - optional recovery id.
* @example
* Build a recovered-format signature object and serialize it.
* ```ts
* import { Signature } from '@noble/secp256k1';
* const bytes = new Signature(1n, 2n, 0).toBytes('recovered');
* ```
*/
var Signature = class Signature {
	r;
	s;
	recovery;
	constructor(r, s, recovery) {
		this.r = FnIsValidNot0(r);
		this.s = FnIsValidNot0(s);
		if (recovery != null) this.recovery = assertRecoveryBit(recovery);
		Object.freeze(this);
	}
	static fromBytes(b, format = SIG_COMPACT) {
		assertSigLength(b, format);
		let rec;
		if (format === SIG_RECOVERED) {
			rec = b[0];
			b = b.subarray(1);
		}
		return new Signature(sliceBytesNumBE(b, 0, L), sliceBytesNumBE(b, L, L2), rec);
	}
	addRecoveryBit(bit) {
		return new Signature(this.r, this.s, bit);
	}
	hasHighS() {
		return highS(this.s);
	}
	toBytes(format = SIG_COMPACT) {
		assertSigFormat(format);
		const { r, s, recovery } = this;
		const res = concatBytes(numTo32b(r), numTo32b(s));
		if (format === SIG_RECOVERED) return concatBytes(u8of(assertRecoveryBit(recovery)), res);
		return res;
	}
};
/**
* RFC6979: ensure ECDSA msg is X bytes, convert to BigInt.
* RFC 6979 §2.3.2 says bits2int keeps the leftmost qlen bits and discards the rest.
* FIPS 186-4 4.6 gives the same leftmost-bit truncation rule. bits2int can produce res>N.
*/
var bits2int = (bytes) => {
	if (bytes.length > 8192) err("input is too large");
	const delta = bytes.length * 8 - 256;
	const num = bytesToNumBE(bytes);
	return delta > 0 ? num >> big(delta) : num;
};
/** int2octets can't be used; pads small msgs with 0: BAD for truncation as per RFC vectors */
var bits2int_modN = (bytes) => modN(bits2int(abytes(bytes)));
var SIG_COMPACT = "compact";
var SIG_RECOVERED = "recovered";
var SIG_DER = "der";
var _sha = "SHA-256";
/**
* Hash implementations used by the synchronous and async ECDSA / Schnorr helpers.
* All slots are configurable API surface; wrapper helpers revalidate that SHA-256 and HMAC-SHA256
* providers still return exact 32-byte Uint8Array digests.
* @example
* Provide sync hash helpers before calling the synchronous signing API.
* ```ts
* import * as secp from '@noble/secp256k1';
* import { hmac } from '@noble/hashes/hmac.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* secp.hashes.sha256 = sha256;
* secp.hashes.hmacSha256 = (key, msg) => hmac(sha256, key, msg);
* const secretKey = secp.utils.randomSecretKey();
* const sig = secp.sign(new Uint8Array([1, 2, 3]), secretKey);
* ```
*/
var hashes = {
	hmacSha256Async: async (key, message) => {
		const s = subtle();
		const name = "HMAC";
		const k = await s.importKey("raw", key, {
			name,
			hash: { name: _sha }
		}, false, ["sign"]);
		return u8n(await s.sign(name, k, message));
	},
	hmacSha256: void 0,
	sha256Async: async (msg) => u8n(await subtle().digest(_sha, msg)),
	sha256: void 0
};
var prepMsg = (msg, opts, async_) => {
	const message = abytes(msg, void 0, "message");
	if (!opts.prehash) return message;
	return async_ ? gha("sha256Async", message) : gh("sha256", message);
};
var NULL = /* @__PURE__ */ u8n(0);
var byte0 = /* @__PURE__ */ u8of(0);
var byte1 = /* @__PURE__ */ u8of(1);
var _maxDrbgIters = 1e3;
var _drbgErr = "drbg: tried max amount of iterations";
var hmacDrbg = (seed, pred) => {
	let v = u8n(L);
	let k = u8n(L);
	let i = 0;
	const reset = () => {
		v.fill(1);
		k.fill(0);
	};
	const h = (...b) => gh("hmacSha256", k, concatBytes(v, ...b));
	const reseed = (seed = NULL) => {
		k = h(byte0, seed);
		v = h();
		if (seed.length === 0) return;
		k = h(byte1, seed);
		v = h();
	};
	const gen = () => {
		if (i++ >= _maxDrbgIters) err(_drbgErr);
		v = h();
		return v;
	};
	reset();
	reseed(seed);
	let res = void 0;
	while (!(res = pred(gen()))) reseed();
	reset();
	return res;
};
var _sign = (messageHash, secretKey, opts, hmacDrbg) => {
	let { lowS, extraEntropy } = opts;
	const int2octets = numTo32b;
	const h1i = bits2int_modN(messageHash);
	const h1o = int2octets(h1i);
	const d = secretKeyToScalar(secretKey);
	const seedArgs = [int2octets(d), h1o];
	/** RFC6979 3.6: additional k' (optional). See {@link ECDSAExtraEntropy}. */
	if (extraEntropy != null && extraEntropy !== false) {
		const e = extraEntropy === true ? randomBytes(L) : extraEntropy;
		seedArgs.push(abytes(e, void 0, "extraEntropy"));
	}
	const seed = concatBytes(...seedArgs);
	const m = h1i;
	const k2sig = (kBytes) => {
		const k = bits2int(kBytes);
		if (!(1n <= k && k < N)) return;
		const ik = invert(k, N);
		const q = G.multiply(k).toAffine();
		const r = modN(q.x);
		if (r === 0n) return;
		const s = modN(ik * modN(m + r * d));
		if (s === 0n) return;
		let recovery = (q.x === r ? 0 : 2) | Number(q.y & 1n);
		let normS = s;
		if (lowS && highS(s)) {
			normS = modN(-s);
			recovery ^= 1;
		}
		return new Signature(r, normS, recovery).toBytes(opts.format);
	};
	return hmacDrbg(seed, k2sig);
};
var _verify = (sig, messageHash, publicKey, opts = {}) => {
	const { lowS, format } = opts;
	if (sig instanceof Signature) err("Signature must be in Uint8Array, use .toBytes()");
	assertSigLength(sig, format);
	abytes(publicKey, void 0, "publicKey");
	try {
		const { r, s } = Signature.fromBytes(sig, format);
		const h = bits2int_modN(messageHash);
		const P = Point.fromBytes(publicKey);
		if (lowS && highS(s)) return false;
		const is = invert(s, N);
		return modN(doubleScalarMulUns(P, modN(h * is), modN(r * is)).toAffine().x) === r;
	} catch (error) {
		return false;
	}
};
var setDefaults = (opts) => {
	return {
		lowS: opts.lowS ?? true,
		prehash: opts.prehash ?? true,
		format: opts.format ?? SIG_COMPACT,
		extraEntropy: opts.extraEntropy ?? false
	};
};
/**
* Sign a message using secp256k1. Sync: uses `hashes.sha256` and `hashes.hmacSha256`.
* Prehashes message with sha256, disable using `prehash: false`.
* @param message - message bytes to sign.
* @param secretKey - 32-byte secret key.
* @param opts - See {@link ECDSASignOpts} for details. Enabling {@link ECDSAExtraEntropy} improves security.
* @returns ECDSA signature encoded according to `opts.format`.
* @example
* Sign a message using secp256k1.
* ```ts
* import * as secp from '@noble/secp256k1';
* import { hmac } from '@noble/hashes/hmac.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* secp.hashes.sha256 = sha256;
* secp.hashes.hmacSha256 = (key, msg) => hmac(sha256, key, msg);
* const secretKey = secp.utils.randomSecretKey();
* const msg = new TextEncoder().encode('hello noble');
* secp.sign(msg, secretKey);
* secp.sign(msg, secretKey, { extraEntropy: true });
* secp.sign(msg, secretKey, { format: 'recovered' });
* ```
*/
var sign = (message, secretKey, opts = {}) => {
	opts = setDefaults(opts);
	assertSigFormat(opts.format);
	return _sign(prepMsg(message, opts, false), secretKey, opts, hmacDrbg);
};
/**
* Verify a signature using secp256k1. Sync: uses `hashes.sha256` and `hashes.hmacSha256`.
* @param signature - default is 64-byte `compact` format; also see {@link ECDSASignatureFormat}.
* @param message - message which was signed. Keep in mind `prehash` from opts.
* @param publicKey - public key that should verify the signature.
* @param opts - See {@link ECDSAVerifyOpts} for details.
* @returns `true` when the signature is valid. Unsupported format configuration still
* throws instead of returning `false`.
* @example
* Verify a signature using secp256k1.
* ```ts
* import * as secp from '@noble/secp256k1';
* import { hmac } from '@noble/hashes/hmac.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* import { keccak_256 } from '@noble/hashes/sha3.js';
* secp.hashes.sha256 = sha256;
* secp.hashes.hmacSha256 = (key, msg) => hmac(sha256, key, msg);
* const secretKey = secp.utils.randomSecretKey();
* const msg = new TextEncoder().encode('hello noble');
* const publicKey = secp.getPublicKey(secretKey);
* const sig = secp.sign(msg, secretKey);
* const sigr = secp.sign(msg, secretKey, { format: 'recovered' });
* secp.verify(sig, msg, publicKey);
* secp.verify(sig, keccak_256(msg), publicKey, { prehash: false });
* secp.verify(sig, msg, publicKey, { lowS: false });
* secp.verify(sigr, msg, publicKey, { format: 'recovered' });
* ```
*/
var verify = (signature, message, publicKey, opts = {}) => {
	opts = setDefaults(opts);
	return _verify(signature, prepMsg(message, opts, false), publicKey, opts);
};
/**
* Elliptic Curve Diffie-Hellman (ECDH) on secp256k1.
* Result is **NOT hashed** and returns the serialized shared point (compressed by default),
* not the SEC 1 x-only primitive `z = x_P`.
* secp256k1 has cofactor `h = 1`, so there is no separate cofactor-ECDH distinction here.
* @param secretKeyA - local 32-byte secret key.
* @param publicKeyB - peer public key.
* @param isCompressed - return 33-byte compressed output when `true`.
* @returns shared secret point bytes.
* @example
* Derive a shared secp256k1 secret with ECDH.
* ```ts
* import * as secp from '@noble/secp256k1';
* const alice = secp.utils.randomSecretKey();
* const bob = secp.utils.randomSecretKey();
* const shared = secp.getSharedSecret(alice, secp.getPublicKey(bob));
* ```
*/
var getSharedSecret = (secretKeyA, publicKeyB, isCompressed = true) => {
	return Point.fromBytes(publicKeyB).multiply(secretKeyToScalar(secretKeyA)).toBytes(isCompressed);
};
var randomSecretKey = (seed) => {
	seed = seed === void 0 ? randomBytes(lengths.seed) : seed;
	abytes(seed);
	if (seed.length < lengths.seed || seed.length > 1024) return err("expected 48-1024b", RangeError);
	return numTo32b(M(bytesToNumBE(seed), N - 1n) + 1n);
};
var createKeygen = (getPublicKey) => (seed) => {
	const secretKey = randomSecretKey(seed);
	return {
		secretKey,
		publicKey: getPublicKey(secretKey)
	};
};
var getTag = (tag) => Uint8Array.from("BIP0340/" + tag, (c) => c.charCodeAt(0));
var T_AUX = "aux";
var T_NONCE = "nonce";
var T_CHALLENGE = "challenge";
var taggedHash = (tag, ...messages) => {
	const tagH = gh("sha256", getTag(tag));
	return gh("sha256", concatBytes(tagH, tagH, ...messages));
};
var taggedHashAsync = (tag, ...messages) => gha("sha256Async", getTag(tag)).then((tagH) => gha("sha256Async", concatBytes(tagH, tagH, ...messages)));
var extpubSchnorr = (priv) => {
	const d_ = secretKeyToScalar(priv);
	const { x, y } = G.multiply(d_).assertValidity().toAffine();
	return {
		d: isEven(y) ? d_ : modN(-d_),
		px: numTo32b(x)
	};
};
var bytesModN = (bytes) => modN(bytesToNumBE(bytes));
var challenge = (...args) => bytesModN(taggedHash(T_CHALLENGE, ...args));
var challengeAsync = async (...args) => bytesModN(await taggedHashAsync(T_CHALLENGE, ...args));
/** Schnorr public key is just `x` coordinate of Point as per BIP340. */
var pubSchnorr = (secretKey) => {
	return extpubSchnorr(secretKey).px;
};
var keygenSchnorr = /* @__PURE__ */ createKeygen(pubSchnorr);
var prepSigSchnorr = (message, secretKey, auxRand) => {
	const { px, d } = extpubSchnorr(secretKey);
	return {
		m: abytes(message),
		px,
		d,
		a: abytes(auxRand, L)
	};
};
var extractK = (rand) => {
	const k_ = bytesModN(rand);
	if (k_ === 0n) err("sign failed: k is zero");
	const { px, d } = extpubSchnorr(numTo32b(k_));
	return {
		rx: px,
		k: d
	};
};
var createSigSchnorr = (k, px, e, d) => {
	return concatBytes(px, numTo32b(modN(k + e * d)));
};
var E_INVSIG = "invalid signature produced";
/**
* Creates Schnorr signature as per BIP340. Verifies itself before returning anything.
* auxRand is optional and defaults to fresh 32-byte randomness; it is not the sole source of
* k generation, so bad CSPRNG won't be the only entropy source.
*/
var signSchnorr = (message, secretKey, auxRand = randomBytes(L)) => {
	const { m, px, d, a } = prepSigSchnorr(message, secretKey, auxRand);
	const { rx, k } = extractK(taggedHash(T_NONCE, numTo32b(d ^ bytesToNumBE(taggedHash(T_AUX, a))), px, m));
	const sig = createSigSchnorr(k, rx, challenge(rx, px, m), d);
	if (!verifySchnorr(sig, m, px)) err(E_INVSIG);
	return sig;
};
var signSchnorrAsync = async (message, secretKey, auxRand = randomBytes(L)) => {
	const { m, px, d, a } = prepSigSchnorr(message, secretKey, auxRand);
	const { rx, k } = extractK(await taggedHashAsync(T_NONCE, numTo32b(d ^ bytesToNumBE(await taggedHashAsync(T_AUX, a))), px, m));
	const sig = createSigSchnorr(k, rx, await challengeAsync(rx, px, m), d);
	if (!await verifySchnorrAsync(sig, m, px)) err(E_INVSIG);
	return sig;
};
var callSyncAsyncFn = (res, later) => {
	return res instanceof Promise ? res.then(later) : later(res);
};
var _verifSchnorr = (signature, message, publicKey, challengeFn) => {
	const sig = abytes(signature, L2, "signature");
	const msg = abytes(message, void 0, "message");
	const pub = abytes(publicKey, L, "publicKey");
	try {
		const x = bytesToNumBE(pub);
		const P_ = new Point(x, lift_x(x), 1n).assertValidity();
		const px = numTo32b(P_.toAffine().x);
		const r = sliceBytesNumBE(sig, 0, L);
		arange(r, 1n, P);
		const s = sliceBytesNumBE(sig, L, L2);
		arange(s, 1n, N);
		return callSyncAsyncFn(challengeFn(concatBytes(numTo32b(r), px, msg)), (e) => {
			const { x, y } = doubleScalarMulUns(P_, s, modN(-e)).toAffine();
			if (!isEven(y) || x !== r) return false;
			return true;
		});
	} catch (error) {
		return false;
	}
};
/** Verifies Schnorr signature. Sync wrapper returns false for post-validation failures
* after the initial byte checks. */
var verifySchnorr = (s, m, p) => _verifSchnorr(s, m, p, challenge);
/** Async Schnorr verification. Curve/encoding failures after the initial byte checks still
* become false, but async backend failures reject the promise. Missing crypto.subtle is a
* runtime/backend error, not an "invalid signature" result, so we surface it instead of
* turning it into false. */
var verifySchnorrAsync = async (s, m, p) => _verifSchnorr(s, m, p, challengeAsync);
/**
* BIP340 Schnorr helpers over secp256k1.
* @example
* Sign and verify a BIP340 Schnorr signature.
* ```ts
* import * as secp from '@noble/secp256k1';
* import { sha256 } from '@noble/hashes/sha2.js';
* secp.hashes.sha256 = sha256;
* const secretKey = secp.utils.randomSecretKey();
* const message = new Uint8Array([1, 2, 3]);
* const sig = secp.schnorr.sign(message, secretKey);
* const publicKey = secp.schnorr.getPublicKey(secretKey);
* const isValid = secp.schnorr.verify(sig, message, publicKey);
* ```
*/
var schnorr = /* @__PURE__ */ Object.freeze({
	keygen: keygenSchnorr,
	getPublicKey: pubSchnorr,
	sign: signSchnorr,
	verify: verifySchnorr,
	signAsync: signSchnorrAsync,
	verifyAsync: verifySchnorrAsync
});
var W = 8;
var pwindows = Math.ceil(256 / W) + 1;
var pwindowSize = 2 ** (W - 1);
var precompute = () => {
	const points = [];
	let p = G;
	let b = p;
	for (let w = 0; w < pwindows; w++) {
		b = p;
		points.push(b);
		for (let i = 1; i < pwindowSize; i++) {
			b = b.add(p);
			points.push(b);
		}
		p = b.double();
	}
	return points;
};
var Gpows = void 0;
var ctneg = (cnd, p) => {
	const n = p.negate();
	return cnd ? n : p;
};
/**
* Precomputes give 12x faster getPublicKey(), 10x sign(), 2x verify() by
* caching multiples of G (base point). Cache is stored in 32MB of RAM.
* Any time `G.multiply` is done, precomputes are used.
* Not used for getSharedSecret, which instead multiplies random pubkey `P.multiply`.
*
* w-ary non-adjacent form (wNAF) precomputation method is 10% slower than windowed method,
* but takes 2x less RAM. RAM reduction is possible by utilizing `.subtract`.
*
* !! Precomputes can be disabled by commenting-out call of the wNAF() inside Point#multiply().
*/
var wNAF = (n) => {
	const comp = Gpows || (Gpows = precompute());
	let p = I;
	let f = G;
	const pow_2_w = 2 ** W;
	const maxNum = pow_2_w;
	const mask = big(pow_2_w - 1);
	const shiftBy = big(W);
	for (let w = 0; w < pwindows; w++) {
		let wbits = Number(n & mask);
		n >>= shiftBy;
		if (wbits > pwindowSize) {
			wbits -= maxNum;
			n += 1n;
		}
		const off = w * pwindowSize;
		const offF = off;
		const offP = off + Math.abs(wbits) - 1;
		const isEven = w % 2 !== 0;
		const isNeg = wbits < 0;
		if (wbits === 0) f = f.add(ctneg(isEven, comp[offF]));
		else p = p.add(ctneg(isNeg, comp[offP]));
	}
	if (n !== 0n) err("invalid wnaf");
	return {
		p,
		f
	};
};
//#endregion
export { schnorr as a, hashes as i, getPublicKey as n, sign as o, getSharedSecret as r, verify as s, Point as t };
