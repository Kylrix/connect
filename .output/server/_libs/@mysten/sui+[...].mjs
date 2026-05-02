import { a as fromBase64, c as toBase58, i as toHex, l as bech32, n as splitGenericParameters, o as toBase64, r as fromHex, s as fromBase58, t as bcs } from "./bcs+[...].mjs";
//#region node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/utils.js
/**
* Checks if something is Uint8Array. Be careful: nodejs Buffer will return true.
* @param a - value to test
* @returns `true` when the value is a Uint8Array-compatible view.
* @example
* Check whether a value is a Uint8Array-compatible view.
* ```ts
* isBytes(new Uint8Array([1, 2, 3]));
* ```
*/
function isBytes$1(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
/**
* Asserts something is a non-negative integer.
* @param n - number to validate
* @param title - label included in thrown errors
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate a non-negative integer option.
* ```ts
* anumber(32, 'length');
* ```
*/
function anumber$1(n, title = "") {
	if (typeof n !== "number") {
		const prefix = title && `"${title}" `;
		throw new TypeError(`${prefix}expected number, got ${typeof n}`);
	}
	if (!Number.isSafeInteger(n) || n < 0) {
		const prefix = title && `"${title}" `;
		throw new RangeError(`${prefix}expected integer >= 0, got ${n}`);
	}
}
/**
* Asserts something is Uint8Array.
* @param value - value to validate
* @param length - optional exact length constraint
* @param title - label included in thrown errors
* @returns The validated byte array.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate that a value is a byte array.
* ```ts
* abytes(new Uint8Array([1, 2, 3]));
* ```
*/
function abytes$1(value, length, title = "") {
	const bytes = isBytes$1(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title && `"${title}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		const message = prefix + "expected Uint8Array" + ofLen + ", got " + got;
		if (!bytes) throw new TypeError(message);
		throw new RangeError(message);
	}
	return value;
}
/**
* Asserts something is a wrapped hash constructor.
* @param h - hash constructor to validate
* @throws On wrong argument types or invalid hash wrapper shape. {@link TypeError}
* @throws On invalid hash metadata ranges or values. {@link RangeError}
* @throws If the hash metadata allows empty outputs or block sizes. {@link Error}
* @example
* Validate a callable hash wrapper.
* ```ts
* import { ahash } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* ahash(sha256);
* ```
*/
function ahash$1(h) {
	if (typeof h !== "function" || typeof h.create !== "function") throw new TypeError("Hash must wrapped by utils.createHasher");
	anumber$1(h.outputLen);
	anumber$1(h.blockLen);
	if (h.outputLen < 1) throw new Error("\"outputLen\" must be >= 1");
	if (h.blockLen < 1) throw new Error("\"blockLen\" must be >= 1");
}
/**
* Asserts a hash instance has not been destroyed or finished.
* @param instance - hash instance to validate
* @param checkFinished - whether to reject finalized instances
* @throws If the hash instance has already been destroyed or finalized. {@link Error}
* @example
* Validate that a hash instance is still usable.
* ```ts
* import { aexists } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const hash = sha256.create();
* aexists(hash);
* ```
*/
function aexists$1(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
/**
* Asserts output is a sufficiently-sized byte array.
* @param out - destination buffer
* @param instance - hash instance providing output length
* Oversized buffers are allowed; downstream code only promises to fill the first `outputLen` bytes.
* @throws On wrong argument types. {@link TypeError}
* @throws On wrong argument ranges or values. {@link RangeError}
* @example
* Validate a caller-provided digest buffer.
* ```ts
* import { aoutput } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const hash = sha256.create();
* aoutput(new Uint8Array(hash.outputLen), hash);
* ```
*/
function aoutput$1(out, instance) {
	abytes$1(out, void 0, "digestInto() output");
	const min = instance.outputLen;
	if (out.length < min) throw new RangeError("\"digestInto() output\" expected to be of length >=" + min);
}
/**
* Casts a typed array view to Uint32Array.
* `arr.byteOffset` must already be 4-byte aligned or the platform
* Uint32Array constructor will throw.
* @param arr - source typed array
* @returns Uint32Array view over the same buffer.
* @example
* Reinterpret a byte array as 32-bit words.
* ```ts
* u32(new Uint8Array(8));
* ```
*/
function u32(arr) {
	return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
/**
* Zeroizes typed arrays in place. Warning: JS provides no guarantees.
* @param arrays - arrays to overwrite with zeros
* @example
* Zeroize sensitive buffers in place.
* ```ts
* clean(new Uint8Array([1, 2, 3]));
* ```
*/
function clean$1(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
/**
* Creates a DataView for byte-level manipulation.
* @param arr - source typed array
* @returns DataView over the same buffer region.
* @example
* Create a DataView over an existing buffer.
* ```ts
* createView(new Uint8Array(4));
* ```
*/
function createView$1(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
/**
* Rotate-right operation for uint32 values.
* @param word - source word
* @param shift - shift amount in bits
* @returns Rotated word.
* @example
* Rotate a 32-bit word to the right.
* ```ts
* rotr(0x12345678, 8);
* ```
*/
function rotr(word, shift) {
	return word << 32 - shift | word >>> shift;
}
/** Whether the current platform is little-endian. */
var isLE$1 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
/**
* Byte-swap operation for uint32 values.
* @param word - source word
* @returns Word with reversed byte order.
* @example
* Reverse the byte order of a 32-bit word.
* ```ts
* byteSwap(0x11223344);
* ```
*/
function byteSwap(word) {
	return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
/**
* Conditionally byte-swaps one 32-bit word on big-endian platforms.
* @param n - source word
* @returns Original or byte-swapped word depending on platform endianness.
* @example
* Normalize a 32-bit word for host endianness.
* ```ts
* swap8IfBE(0x11223344);
* ```
*/
var swap8IfBE = isLE$1 ? (n) => n : (n) => byteSwap(n) >>> 0;
/**
* Byte-swaps every word of a Uint32Array in place.
* @param arr - array to mutate
* @returns The same array after mutation; callers pass live state arrays here.
* @example
* Reverse the byte order of every word in place.
* ```ts
* byteSwap32(new Uint32Array([0x11223344]));
* ```
*/
function byteSwap32(arr) {
	for (let i = 0; i < arr.length; i++) arr[i] = byteSwap(arr[i]);
	return arr;
}
/**
* Conditionally byte-swaps a Uint32Array on big-endian platforms.
* @param u - array to normalize for host endianness
* @returns Original or byte-swapped array depending on platform endianness.
*   On big-endian runtimes this mutates `u` in place via `byteSwap32(...)`.
* @example
* Normalize a word array for host endianness.
* ```ts
* swap32IfBE(new Uint32Array([0x11223344]));
* ```
*/
var swap32IfBE = isLE$1 ? (u) => u : byteSwap32;
var hasHexBuiltin$1 = typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function";
var hexes$1 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
/**
* Convert byte array to hex string.
* Uses the built-in function when available and assumes it matches the tested
* fallback semantics.
* @param bytes - bytes to encode
* @returns Lowercase hexadecimal string.
* @throws On wrong argument types. {@link TypeError}
* @example
* Convert bytes to lowercase hexadecimal.
* ```ts
* bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])); // 'cafe0123'
* ```
*/
function bytesToHex$1(bytes) {
	abytes$1(bytes);
	if (hasHexBuiltin$1) return bytes.toHex();
	let hex = "";
	for (let i = 0; i < bytes.length; i++) hex += hexes$1[bytes[i]];
	return hex;
}
/**
* Creates a callable hash function from a stateful class constructor.
* @param hashCons - hash constructor or factory
* @param info - optional metadata such as DER OID
* @returns Frozen callable hash wrapper with `.create()`.
*   Wrapper construction eagerly calls `hashCons(undefined)` once to read
*   `outputLen` / `blockLen`, so constructor side effects happen at module
*   init time.
* @example
* Wrap a stateful hash constructor into a callable helper.
* ```ts
* import { createHasher } from '@noble/hashes/utils.js';
* import { sha256 } from '@noble/hashes/sha2.js';
* const wrapped = createHasher(sha256.create, { oid: sha256.oid });
* wrapped(new Uint8Array([1]));
* ```
*/
function createHasher$2(hashCons, info = {}) {
	const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
	const tmp = hashCons(void 0);
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.canXOF = tmp.canXOF;
	hashC.create = (opts) => hashCons(opts);
	Object.assign(hashC, info);
	return Object.freeze(hashC);
}
/**
* Creates OID metadata for NIST hashes with prefix `06 09 60 86 48 01 65 03 04 02`.
* @param suffix - final OID byte for the selected hash.
*   The helper accepts any byte even though only the documented NIST hash
*   suffixes are meaningful downstream.
* @returns Object containing the DER-encoded OID.
* @example
* Build OID metadata for a NIST hash.
* ```ts
* oidNist(0x01);
* ```
*/
var oidNist$1 = (suffix) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	suffix
]) });
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/hmac.js
/**
* HMAC: RFC2104 message authentication code.
* @module
*/
/**
* Internal class for HMAC.
* Accepts any byte key, although RFC 2104 §3 recommends keys at least
* `HashLen` bytes long.
*/
var _HMAC$1 = class {
	oHash;
	iHash;
	blockLen;
	outputLen;
	canXOF = false;
	finished = false;
	destroyed = false;
	constructor(hash, key) {
		ahash$1(hash);
		abytes$1(key, void 0, "key");
		this.iHash = hash.create();
		if (typeof this.iHash.update !== "function") throw new Error("Expected instance of class which extends utils.Hash");
		this.blockLen = this.iHash.blockLen;
		this.outputLen = this.iHash.outputLen;
		const blockLen = this.blockLen;
		const pad = new Uint8Array(blockLen);
		pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
		for (let i = 0; i < pad.length; i++) pad[i] ^= 54;
		this.iHash.update(pad);
		this.oHash = hash.create();
		for (let i = 0; i < pad.length; i++) pad[i] ^= 106;
		this.oHash.update(pad);
		clean$1(pad);
	}
	update(buf) {
		aexists$1(this);
		this.iHash.update(buf);
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		aoutput$1(out, this);
		this.finished = true;
		const buf = out.subarray(0, this.outputLen);
		this.iHash.digestInto(buf);
		this.oHash.update(buf);
		this.oHash.digestInto(buf);
		this.destroy();
	}
	digest() {
		const out = new Uint8Array(this.oHash.outputLen);
		this.digestInto(out);
		return out;
	}
	_cloneInto(to) {
		to ||= Object.create(Object.getPrototypeOf(this), {});
		const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
		to = to;
		to.finished = finished;
		to.destroyed = destroyed;
		to.blockLen = blockLen;
		to.outputLen = outputLen;
		to.oHash = oHash._cloneInto(to.oHash);
		to.iHash = iHash._cloneInto(to.iHash);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
	destroy() {
		this.destroyed = true;
		this.oHash.destroy();
		this.iHash.destroy();
	}
};
var hmac$1 = /* @__PURE__ */ (() => {
	const hmac_ = ((hash, key, message) => new _HMAC$1(hash, key).update(message).digest());
	hmac_.create = (hash, key) => new _HMAC$1(hash, key);
	return hmac_;
})();
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_md.js
/**
* Internal Merkle-Damgard hash utils.
* @module
*/
/**
* Shared 32-bit conditional boolean primitive reused by SHA-256, SHA-1, and MD5 `F`.
* Returns bits from `b` when `a` is set, otherwise from `c`.
* The XOR form is equivalent to MD5's `F(X,Y,Z) = XY v not(X)Z` because the masked terms never
* set the same bit.
* @param a - selector word
* @param b - word chosen when selector bit is set
* @param c - word chosen when selector bit is clear
* @returns Mixed 32-bit word.
* @example
* Combine three words with the shared 32-bit choice primitive.
* ```ts
* Chi(0xffffffff, 0x12345678, 0x87654321);
* ```
*/
function Chi(a, b, c) {
	return a & b ^ ~a & c;
}
/**
* Shared 32-bit majority primitive reused by SHA-256 and SHA-1.
* Returns bits shared by at least two inputs.
* @param a - first input word
* @param b - second input word
* @param c - third input word
* @returns Mixed 32-bit word.
* @example
* Combine three words with the shared 32-bit majority primitive.
* ```ts
* Maj(0xffffffff, 0x12345678, 0x87654321);
* ```
*/
function Maj(a, b, c) {
	return a & b ^ a & c ^ b & c;
}
/**
* Merkle-Damgard hash construction base class.
* Could be used to create MD5, RIPEMD, SHA1, SHA2.
* Accepts only byte-aligned `Uint8Array` input, even when the underlying spec describes bit
* strings with partial-byte tails.
* @param blockLen - internal block size in bytes
* @param outputLen - digest size in bytes
* @param padOffset - trailing length field size in bytes
* @param isLE - whether length and state words are encoded in little-endian
* @example
* Use a concrete subclass to get the shared Merkle-Damgard update/digest flow.
* ```ts
* import { _SHA1 } from '@noble/hashes/legacy.js';
* const hash = new _SHA1();
* hash.update(new Uint8Array([97, 98, 99]));
* hash.digest();
* ```
*/
var HashMD$1 = class {
	blockLen;
	outputLen;
	canXOF = false;
	padOffset;
	isLE;
	buffer;
	view;
	finished = false;
	length = 0;
	pos = 0;
	destroyed = false;
	constructor(blockLen, outputLen, padOffset, isLE) {
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.padOffset = padOffset;
		this.isLE = isLE;
		this.buffer = new Uint8Array(blockLen);
		this.view = createView$1(this.buffer);
	}
	update(data) {
		aexists$1(this);
		abytes$1(data);
		const { view, buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				const dataView = createView$1(data);
				for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(view, 0);
				this.pos = 0;
			}
		}
		this.length += data.length;
		this.roundClean();
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		aoutput$1(out, this);
		this.finished = true;
		const { buffer, view, blockLen, isLE } = this;
		let { pos } = this;
		buffer[pos++] = 128;
		clean$1(this.buffer.subarray(pos));
		if (this.padOffset > blockLen - pos) {
			this.process(view, 0);
			pos = 0;
		}
		for (let i = pos; i < blockLen; i++) buffer[i] = 0;
		view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE);
		this.process(view, 0);
		const oview = createView$1(out);
		const len = this.outputLen;
		if (len % 4) throw new Error("_sha2: outputLen must be aligned to 32bit");
		const outLen = len / 4;
		const state = this.get();
		if (outLen > state.length) throw new Error("_sha2: outputLen bigger than state");
		for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneInto(to) {
		to ||= new this.constructor();
		to.set(...this.get());
		const { blockLen, buffer, length, finished, destroyed, pos } = this;
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		if (length % blockLen) to.buffer.set(buffer);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
/**
* Initial SHA-2 state: fractional parts of square roots of first 16 primes 2..53.
* Check out `test/misc/sha2-gen-iv.js` for recomputation guide.
*/
/** Initial SHA256 state from RFC 6234 §6.1: the first 32 bits of the fractional parts of the
* square roots of the first eight prime numbers. Exported as a shared table; callers must treat
* it as read-only because constructors copy words from it by index. */
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]);
/** Initial SHA512 state from RFC 6234 §6.3: eight RFC 64-bit `H(0)` words stored as sixteen
* big-endian 32-bit halves. Derived from the fractional parts of the square roots of the first
* eight prime numbers. Exported as a shared table; callers must treat it as read-only because
* constructors copy halves from it by index. */
var SHA512_IV$1 = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	4089235720,
	3144134277,
	2227873595,
	1013904242,
	4271175723,
	2773480762,
	1595750129,
	1359893119,
	2917565137,
	2600822924,
	725511199,
	528734635,
	4215389547,
	1541459225,
	327033209
]);
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_u64.js
var U32_MASK64$1 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n$1 = /* @__PURE__ */ BigInt(32);
function fromBig$1(n, le = false) {
	if (le) return {
		h: Number(n & U32_MASK64$1),
		l: Number(n >> _32n$1 & U32_MASK64$1)
	};
	return {
		h: Number(n >> _32n$1 & U32_MASK64$1) | 0,
		l: Number(n & U32_MASK64$1) | 0
	};
}
function split$1(lst, le = false) {
	const len = lst.length;
	let Ah = new Uint32Array(len);
	let Al = new Uint32Array(len);
	for (let i = 0; i < len; i++) {
		const { h, l } = fromBig$1(lst[i], le);
		[Ah[i], Al[i]] = [h, l];
	}
	return [Ah, Al];
}
var shrSH$1 = (h, _l, s) => h >>> s;
var shrSL$1 = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH$1 = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL$1 = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH$1 = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL$1 = (h, l, s) => h >>> s - 32 | l << 64 - s;
var rotr32H = (_h, l) => l;
var rotr32L = (h, _l) => h;
function add$1(Ah, Al, Bh, Bl) {
	const l = (Al >>> 0) + (Bl >>> 0);
	return {
		h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
		l: l | 0
	};
}
var add3L$1 = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H$1 = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L$1 = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H$1 = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L$1 = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H$1 = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/sha2.js
/**
* SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
* SHA256 is the fastest hash implementable in JS, even faster than Blake3.
* Check out {@link https://www.rfc-editor.org/rfc/rfc4634 | RFC 4634} and
* {@link https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | FIPS 180-4}.
* @module
*/
/**
* SHA-224 / SHA-256 round constants from RFC 6234 §5.1: the first 32 bits
* of the cube roots of the first 64 primes (2..311).
*/
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]);
/** Reusable SHA-224 / SHA-256 message schedule buffer `W_t` from RFC 6234 §6.2 step 1. */
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
/** Internal SHA-224 / SHA-256 compression engine from RFC 6234 §6.2. */
var SHA2_32B = class extends HashMD$1 {
	constructor(outputLen) {
		super(64, outputLen, 8, false);
	}
	get() {
		const { A, B, C, D, E, F, G, H } = this;
		return [
			A,
			B,
			C,
			D,
			E,
			F,
			G,
			H
		];
	}
	set(A, B, C, D, E, F, G, H) {
		this.A = A | 0;
		this.B = B | 0;
		this.C = C | 0;
		this.D = D | 0;
		this.E = E | 0;
		this.F = F | 0;
		this.G = G | 0;
		this.H = H | 0;
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
		for (let i = 16; i < 64; i++) {
			const W15 = SHA256_W[i - 15];
			const W2 = SHA256_W[i - 2];
			const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
			SHA256_W[i] = (rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10) + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
		}
		let { A, B, C, D, E, F, G, H } = this;
		for (let i = 0; i < 64; i++) {
			const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
			const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
			const T2 = (rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22)) + Maj(A, B, C) | 0;
			H = G;
			G = F;
			F = E;
			E = D + T1 | 0;
			D = C;
			C = B;
			B = A;
			A = T1 + T2 | 0;
		}
		A = A + this.A | 0;
		B = B + this.B | 0;
		C = C + this.C | 0;
		D = D + this.D | 0;
		E = E + this.E | 0;
		F = F + this.F | 0;
		G = G + this.G | 0;
		H = H + this.H | 0;
		this.set(A, B, C, D, E, F, G, H);
	}
	roundClean() {
		clean$1(SHA256_W);
	}
	destroy() {
		this.destroyed = true;
		this.set(0, 0, 0, 0, 0, 0, 0, 0);
		clean$1(this.buffer);
	}
};
/** Internal SHA-256 hash class grounded in RFC 6234 §6.2. */
var _SHA256 = class extends SHA2_32B {
	A = SHA256_IV[0] | 0;
	B = SHA256_IV[1] | 0;
	C = SHA256_IV[2] | 0;
	D = SHA256_IV[3] | 0;
	E = SHA256_IV[4] | 0;
	F = SHA256_IV[5] | 0;
	G = SHA256_IV[6] | 0;
	H = SHA256_IV[7] | 0;
	constructor() {
		super(32);
	}
};
var K512$1 = split$1([
	"0x428a2f98d728ae22",
	"0x7137449123ef65cd",
	"0xb5c0fbcfec4d3b2f",
	"0xe9b5dba58189dbbc",
	"0x3956c25bf348b538",
	"0x59f111f1b605d019",
	"0x923f82a4af194f9b",
	"0xab1c5ed5da6d8118",
	"0xd807aa98a3030242",
	"0x12835b0145706fbe",
	"0x243185be4ee4b28c",
	"0x550c7dc3d5ffb4e2",
	"0x72be5d74f27b896f",
	"0x80deb1fe3b1696b1",
	"0x9bdc06a725c71235",
	"0xc19bf174cf692694",
	"0xe49b69c19ef14ad2",
	"0xefbe4786384f25e3",
	"0x0fc19dc68b8cd5b5",
	"0x240ca1cc77ac9c65",
	"0x2de92c6f592b0275",
	"0x4a7484aa6ea6e483",
	"0x5cb0a9dcbd41fbd4",
	"0x76f988da831153b5",
	"0x983e5152ee66dfab",
	"0xa831c66d2db43210",
	"0xb00327c898fb213f",
	"0xbf597fc7beef0ee4",
	"0xc6e00bf33da88fc2",
	"0xd5a79147930aa725",
	"0x06ca6351e003826f",
	"0x142929670a0e6e70",
	"0x27b70a8546d22ffc",
	"0x2e1b21385c26c926",
	"0x4d2c6dfc5ac42aed",
	"0x53380d139d95b3df",
	"0x650a73548baf63de",
	"0x766a0abb3c77b2a8",
	"0x81c2c92e47edaee6",
	"0x92722c851482353b",
	"0xa2bfe8a14cf10364",
	"0xa81a664bbc423001",
	"0xc24b8b70d0f89791",
	"0xc76c51a30654be30",
	"0xd192e819d6ef5218",
	"0xd69906245565a910",
	"0xf40e35855771202a",
	"0x106aa07032bbd1b8",
	"0x19a4c116b8d2d0c8",
	"0x1e376c085141ab53",
	"0x2748774cdf8eeb99",
	"0x34b0bcb5e19b48a8",
	"0x391c0cb3c5c95a63",
	"0x4ed8aa4ae3418acb",
	"0x5b9cca4f7763e373",
	"0x682e6ff3d6b2b8a3",
	"0x748f82ee5defb2fc",
	"0x78a5636f43172f60",
	"0x84c87814a1f0ab72",
	"0x8cc702081a6439ec",
	"0x90befffa23631e28",
	"0xa4506cebde82bde9",
	"0xbef9a3f7b2c67915",
	"0xc67178f2e372532b",
	"0xca273eceea26619c",
	"0xd186b8c721c0c207",
	"0xeada7dd6cde0eb1e",
	"0xf57d4f7fee6ed178",
	"0x06f067aa72176fba",
	"0x0a637dc5a2c898a6",
	"0x113f9804bef90dae",
	"0x1b710b35131c471b",
	"0x28db77f523047d84",
	"0x32caab7b40c72493",
	"0x3c9ebe0a15c9bebc",
	"0x431d67c49c100d4c",
	"0x4cc5d4becb3e42b6",
	"0x597f299cfc657e2a",
	"0x5fcb6fab3ad6faec",
	"0x6c44198c4a475817"
].map((n) => BigInt(n)));
var SHA512_Kh$1 = K512$1[0];
var SHA512_Kl$1 = K512$1[1];
var SHA512_W_H$1 = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L$1 = /* @__PURE__ */ new Uint32Array(80);
/** Internal SHA-384 / SHA-512 compression engine from RFC 6234 §6.4. */
var SHA2_64B$1 = class extends HashMD$1 {
	constructor(outputLen) {
		super(128, outputLen, 16, false);
	}
	get() {
		const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
		return [
			Ah,
			Al,
			Bh,
			Bl,
			Ch,
			Cl,
			Dh,
			Dl,
			Eh,
			El,
			Fh,
			Fl,
			Gh,
			Gl,
			Hh,
			Hl
		];
	}
	set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
		this.Ah = Ah | 0;
		this.Al = Al | 0;
		this.Bh = Bh | 0;
		this.Bl = Bl | 0;
		this.Ch = Ch | 0;
		this.Cl = Cl | 0;
		this.Dh = Dh | 0;
		this.Dl = Dl | 0;
		this.Eh = Eh | 0;
		this.El = El | 0;
		this.Fh = Fh | 0;
		this.Fl = Fl | 0;
		this.Gh = Gh | 0;
		this.Gl = Gl | 0;
		this.Hh = Hh | 0;
		this.Hl = Hl | 0;
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) {
			SHA512_W_H$1[i] = view.getUint32(offset);
			SHA512_W_L$1[i] = view.getUint32(offset += 4);
		}
		for (let i = 16; i < 80; i++) {
			const W15h = SHA512_W_H$1[i - 15] | 0;
			const W15l = SHA512_W_L$1[i - 15] | 0;
			const s0h = rotrSH$1(W15h, W15l, 1) ^ rotrSH$1(W15h, W15l, 8) ^ shrSH$1(W15h, W15l, 7);
			const s0l = rotrSL$1(W15h, W15l, 1) ^ rotrSL$1(W15h, W15l, 8) ^ shrSL$1(W15h, W15l, 7);
			const W2h = SHA512_W_H$1[i - 2] | 0;
			const W2l = SHA512_W_L$1[i - 2] | 0;
			const s1h = rotrSH$1(W2h, W2l, 19) ^ rotrBH$1(W2h, W2l, 61) ^ shrSH$1(W2h, W2l, 6);
			const SUMl = add4L$1(s0l, rotrSL$1(W2h, W2l, 19) ^ rotrBL$1(W2h, W2l, 61) ^ shrSL$1(W2h, W2l, 6), SHA512_W_L$1[i - 7], SHA512_W_L$1[i - 16]);
			SHA512_W_H$1[i] = add4H$1(SUMl, s0h, s1h, SHA512_W_H$1[i - 7], SHA512_W_H$1[i - 16]) | 0;
			SHA512_W_L$1[i] = SUMl | 0;
		}
		let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
		for (let i = 0; i < 80; i++) {
			const sigma1h = rotrSH$1(Eh, El, 14) ^ rotrSH$1(Eh, El, 18) ^ rotrBH$1(Eh, El, 41);
			const sigma1l = rotrSL$1(Eh, El, 14) ^ rotrSL$1(Eh, El, 18) ^ rotrBL$1(Eh, El, 41);
			const CHIh = Eh & Fh ^ ~Eh & Gh;
			const CHIl = El & Fl ^ ~El & Gl;
			const T1ll = add5L$1(Hl, sigma1l, CHIl, SHA512_Kl$1[i], SHA512_W_L$1[i]);
			const T1h = add5H$1(T1ll, Hh, sigma1h, CHIh, SHA512_Kh$1[i], SHA512_W_H$1[i]);
			const T1l = T1ll | 0;
			const sigma0h = rotrSH$1(Ah, Al, 28) ^ rotrBH$1(Ah, Al, 34) ^ rotrBH$1(Ah, Al, 39);
			const sigma0l = rotrSL$1(Ah, Al, 28) ^ rotrBL$1(Ah, Al, 34) ^ rotrBL$1(Ah, Al, 39);
			const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
			const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
			Hh = Gh | 0;
			Hl = Gl | 0;
			Gh = Fh | 0;
			Gl = Fl | 0;
			Fh = Eh | 0;
			Fl = El | 0;
			({h: Eh, l: El} = add$1(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
			Dh = Ch | 0;
			Dl = Cl | 0;
			Ch = Bh | 0;
			Cl = Bl | 0;
			Bh = Ah | 0;
			Bl = Al | 0;
			const All = add3L$1(T1l, sigma0l, MAJl);
			Ah = add3H$1(All, T1h, sigma0h, MAJh);
			Al = All | 0;
		}
		({h: Ah, l: Al} = add$1(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
		({h: Bh, l: Bl} = add$1(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
		({h: Ch, l: Cl} = add$1(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
		({h: Dh, l: Dl} = add$1(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
		({h: Eh, l: El} = add$1(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
		({h: Fh, l: Fl} = add$1(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
		({h: Gh, l: Gl} = add$1(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
		({h: Hh, l: Hl} = add$1(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
		this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
	}
	roundClean() {
		clean$1(SHA512_W_H$1, SHA512_W_L$1);
	}
	destroy() {
		this.destroyed = true;
		clean$1(this.buffer);
		this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
};
/** Internal SHA-512 hash class grounded in RFC 6234 §6.3 and §6.4. */
var _SHA512$1 = class extends SHA2_64B$1 {
	Ah = SHA512_IV$1[0] | 0;
	Al = SHA512_IV$1[1] | 0;
	Bh = SHA512_IV$1[2] | 0;
	Bl = SHA512_IV$1[3] | 0;
	Ch = SHA512_IV$1[4] | 0;
	Cl = SHA512_IV$1[5] | 0;
	Dh = SHA512_IV$1[6] | 0;
	Dl = SHA512_IV$1[7] | 0;
	Eh = SHA512_IV$1[8] | 0;
	El = SHA512_IV$1[9] | 0;
	Fh = SHA512_IV$1[10] | 0;
	Fl = SHA512_IV$1[11] | 0;
	Gh = SHA512_IV$1[12] | 0;
	Gl = SHA512_IV$1[13] | 0;
	Hh = SHA512_IV$1[14] | 0;
	Hl = SHA512_IV$1[15] | 0;
	constructor() {
		super(64);
	}
};
/**
* SHA2-256 hash function from RFC 4634. In JS it's the fastest: even faster than Blake3. Some info:
*
* - Trying 2^128 hashes would get 50% chance of collision, using birthday attack.
* - BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
* - Each sha256 hash is executing 2^18 bit operations.
* - Good 2024 ASICs can do 200Th/sec with 3500 watts of power, corresponding to 2^36 hashes/joule.
* @param msg - message bytes to hash
* @returns Digest bytes.
* @example
* Hash a message with SHA2-256.
* ```ts
* sha256(new Uint8Array([97, 98, 99]));
* ```
*/
var sha256 = /* @__PURE__ */ createHasher$2(() => new _SHA256(), /* @__PURE__ */ oidNist$1(1));
/**
* SHA2-512 hash function from RFC 4634.
* @param msg - message bytes to hash
* @returns Digest bytes.
* @example
* Hash a message with SHA2-512.
* ```ts
* sha512(new Uint8Array([97, 98, 99]));
* ```
*/
var sha512$1 = /* @__PURE__ */ createHasher$2(() => new _SHA512$1(), /* @__PURE__ */ oidNist$1(3));
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/cryptography/signature-scheme.mjs
var SIGNATURE_SCHEME_TO_FLAG = {
	ED25519: 0,
	Secp256k1: 1,
	Secp256r1: 2,
	MultiSig: 3,
	ZkLogin: 5,
	Passkey: 6
};
var SIGNATURE_SCHEME_TO_SIZE = {
	ED25519: 32,
	Secp256k1: 33,
	Secp256r1: 33,
	Passkey: 33
};
var SIGNATURE_FLAG_TO_SCHEME = {
	0: "ED25519",
	1: "Secp256k1",
	2: "Secp256r1",
	3: "MultiSig",
	5: "ZkLogin",
	6: "Passkey"
};
function isValidSuiAddress(value) {
	return isHex(value) && getHexByteLength(value) === 32;
}
/**
* Perform the following operations:
* 1. Make the address lower case
* 2. Prepend `0x` if the string does not start with `0x`.
* 3. Add more zeros if the length of the address(excluding `0x`) is less than `SUI_ADDRESS_LENGTH`
*
* WARNING: if the address value itself starts with `0x`, e.g., `0x0x`, the default behavior
* is to treat the first `0x` not as part of the address. The default behavior can be overridden by
* setting `forceAdd0x` to true
*
*/
function normalizeSuiAddress(value, forceAdd0x = false) {
	let address = value.toLowerCase();
	if (!forceAdd0x && address.startsWith("0x")) address = address.slice(2);
	return `0x${address.padStart(64, "0")}`;
}
function isHex(value) {
	return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}
function getHexByteLength(value) {
	return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/bcs/type-tag-serializer.mjs
var VECTOR_REGEX = /^vector<(.+)>$/;
var STRUCT_REGEX = /^([^:]+)::([^:]+)::([^<]+)(<(.+)>)?/;
var TypeTagSerializer = class TypeTagSerializer {
	static parseFromStr(str, normalizeAddress = false) {
		if (str === "address") return { address: null };
		else if (str === "bool") return { bool: null };
		else if (str === "u8") return { u8: null };
		else if (str === "u16") return { u16: null };
		else if (str === "u32") return { u32: null };
		else if (str === "u64") return { u64: null };
		else if (str === "u128") return { u128: null };
		else if (str === "u256") return { u256: null };
		else if (str === "signer") return { signer: null };
		const vectorMatch = str.match(VECTOR_REGEX);
		if (vectorMatch) return { vector: TypeTagSerializer.parseFromStr(vectorMatch[1], normalizeAddress) };
		const structMatch = str.match(STRUCT_REGEX);
		if (structMatch) return { struct: {
			address: normalizeAddress ? normalizeSuiAddress(structMatch[1]) : structMatch[1],
			module: structMatch[2],
			name: structMatch[3],
			typeParams: structMatch[5] === void 0 ? [] : TypeTagSerializer.parseStructTypeArgs(structMatch[5], normalizeAddress)
		} };
		throw new Error(`Encountered unexpected token when parsing type args for ${str}`);
	}
	static parseStructTypeArgs(str, normalizeAddress = false) {
		return splitGenericParameters(str).map((tok) => TypeTagSerializer.parseFromStr(tok, normalizeAddress));
	}
	static tagToString(tag) {
		if ("bool" in tag) return "bool";
		if ("u8" in tag) return "u8";
		if ("u16" in tag) return "u16";
		if ("u32" in tag) return "u32";
		if ("u64" in tag) return "u64";
		if ("u128" in tag) return "u128";
		if ("u256" in tag) return "u256";
		if ("address" in tag) return "address";
		if ("signer" in tag) return "signer";
		if ("vector" in tag) return `vector<${TypeTagSerializer.tagToString(tag.vector)}>`;
		if ("struct" in tag) {
			const struct = tag.struct;
			const typeParams = struct.typeParams.map(TypeTagSerializer.tagToString).join(", ");
			return `${struct.address}::${struct.module}::${struct.name}${typeParams ? `<${typeParams}>` : ""}`;
		}
		throw new Error("Invalid TypeTag");
	}
};
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/bcs/bcs.mjs
function unsafe_u64(options) {
	return bcs.u64({
		name: "unsafe_u64",
		...options
	}).transform({
		input: (val) => val,
		output: (val) => Number(val)
	});
}
function optionEnum(type) {
	return bcs.enum("Option", {
		None: null,
		Some: type
	});
}
var Address = bcs.bytes(32).transform({
	validate: (val) => {
		const address = typeof val === "string" ? val : toHex(val);
		if (!address || !isValidSuiAddress(normalizeSuiAddress(address))) throw new Error(`Invalid Sui address ${address}`);
	},
	input: (val) => typeof val === "string" ? fromHex(normalizeSuiAddress(val)) : val,
	output: (val) => normalizeSuiAddress(toHex(val))
});
var ObjectDigest = bcs.byteVector().transform({
	name: "ObjectDigest",
	input: (value) => fromBase58(value),
	output: (value) => toBase58(new Uint8Array(value)),
	validate: (value) => {
		if (fromBase58(value).length !== 32) throw new Error("ObjectDigest must be 32 bytes");
	}
});
var SuiObjectRef = bcs.struct("SuiObjectRef", {
	objectId: Address,
	version: bcs.u64(),
	digest: ObjectDigest
});
var SharedObjectRef = bcs.struct("SharedObjectRef", {
	objectId: Address,
	initialSharedVersion: bcs.u64(),
	mutable: bcs.bool()
});
var ObjectArg = bcs.enum("ObjectArg", {
	ImmOrOwnedObject: SuiObjectRef,
	SharedObject: SharedObjectRef,
	Receiving: SuiObjectRef
});
var Owner = bcs.enum("Owner", {
	AddressOwner: Address,
	ObjectOwner: Address,
	Shared: bcs.struct("Shared", { initialSharedVersion: bcs.u64() }),
	Immutable: null,
	ConsensusAddressOwner: bcs.struct("ConsensusAddressOwner", {
		startVersion: bcs.u64(),
		owner: Address
	})
});
var Reservation = bcs.enum("Reservation", { MaxAmountU64: bcs.u64() });
var WithdrawalType = bcs.enum("WithdrawalType", { Balance: bcs.lazy(() => TypeTag) });
var WithdrawFrom = bcs.enum("WithdrawFrom", {
	Sender: null,
	Sponsor: null
});
var FundsWithdrawal = bcs.struct("FundsWithdrawal", {
	reservation: Reservation,
	typeArg: WithdrawalType,
	withdrawFrom: WithdrawFrom
});
var CallArg = bcs.enum("CallArg", {
	Pure: bcs.struct("Pure", { bytes: bcs.byteVector().transform({
		input: (val) => typeof val === "string" ? fromBase64(val) : val,
		output: (val) => toBase64(new Uint8Array(val))
	}) }),
	Object: ObjectArg,
	FundsWithdrawal
});
var InnerTypeTag = bcs.enum("TypeTag", {
	bool: null,
	u8: null,
	u64: null,
	u128: null,
	address: null,
	signer: null,
	vector: bcs.lazy(() => InnerTypeTag),
	struct: bcs.lazy(() => StructTag),
	u16: null,
	u32: null,
	u256: null
});
var TypeTag = InnerTypeTag.transform({
	input: (typeTag) => typeof typeTag === "string" ? TypeTagSerializer.parseFromStr(typeTag, true) : typeTag,
	output: (typeTag) => TypeTagSerializer.tagToString(typeTag)
});
var Argument = bcs.enum("Argument", {
	GasCoin: null,
	Input: bcs.u16(),
	Result: bcs.u16(),
	NestedResult: bcs.tuple([bcs.u16(), bcs.u16()])
});
var ProgrammableMoveCall = bcs.struct("ProgrammableMoveCall", {
	package: Address,
	module: bcs.string(),
	function: bcs.string(),
	typeArguments: bcs.vector(TypeTag),
	arguments: bcs.vector(Argument)
});
var Command = bcs.enum("Command", {
	MoveCall: ProgrammableMoveCall,
	TransferObjects: bcs.struct("TransferObjects", {
		objects: bcs.vector(Argument),
		address: Argument
	}),
	SplitCoins: bcs.struct("SplitCoins", {
		coin: Argument,
		amounts: bcs.vector(Argument)
	}),
	MergeCoins: bcs.struct("MergeCoins", {
		destination: Argument,
		sources: bcs.vector(Argument)
	}),
	Publish: bcs.struct("Publish", {
		modules: bcs.vector(bcs.byteVector().transform({
			input: (val) => typeof val === "string" ? fromBase64(val) : val,
			output: (val) => toBase64(new Uint8Array(val))
		})),
		dependencies: bcs.vector(Address)
	}),
	MakeMoveVec: bcs.struct("MakeMoveVec", {
		type: optionEnum(TypeTag).transform({
			input: (val) => val === null ? { None: true } : { Some: val },
			output: (val) => val.Some ?? null
		}),
		elements: bcs.vector(Argument)
	}),
	Upgrade: bcs.struct("Upgrade", {
		modules: bcs.vector(bcs.byteVector().transform({
			input: (val) => typeof val === "string" ? fromBase64(val) : val,
			output: (val) => toBase64(new Uint8Array(val))
		})),
		dependencies: bcs.vector(Address),
		package: Address,
		ticket: Argument
	})
});
var ProgrammableTransaction = bcs.struct("ProgrammableTransaction", {
	inputs: bcs.vector(CallArg),
	commands: bcs.vector(Command)
});
var TransactionKind = bcs.enum("TransactionKind", {
	ProgrammableTransaction,
	ChangeEpoch: null,
	Genesis: null,
	ConsensusCommitPrologue: null
});
var ValidDuring = bcs.struct("ValidDuring", {
	minEpoch: bcs.option(bcs.u64()),
	maxEpoch: bcs.option(bcs.u64()),
	minTimestamp: bcs.option(bcs.u64()),
	maxTimestamp: bcs.option(bcs.u64()),
	chain: ObjectDigest,
	nonce: bcs.u32()
});
var TransactionExpiration = bcs.enum("TransactionExpiration", {
	None: null,
	Epoch: unsafe_u64(),
	ValidDuring
});
var StructTag = bcs.struct("StructTag", {
	address: Address,
	module: bcs.string(),
	name: bcs.string(),
	typeParams: bcs.vector(InnerTypeTag)
});
var GasData = bcs.struct("GasData", {
	payment: bcs.vector(SuiObjectRef),
	owner: Address,
	price: bcs.u64(),
	budget: bcs.u64()
});
var TransactionDataV1 = bcs.struct("TransactionDataV1", {
	kind: TransactionKind,
	sender: Address,
	gasData: GasData,
	expiration: TransactionExpiration
});
var TransactionData = bcs.enum("TransactionData", { V1: TransactionDataV1 });
var IntentScope = bcs.enum("IntentScope", {
	TransactionData: null,
	TransactionEffects: null,
	CheckpointSummary: null,
	PersonalMessage: null
});
var IntentVersion = bcs.enum("IntentVersion", { V0: null });
var AppId = bcs.enum("AppId", { Sui: null });
var Intent = bcs.struct("Intent", {
	scope: IntentScope,
	version: IntentVersion,
	appId: AppId
});
function IntentMessage(T) {
	return bcs.struct(`IntentMessage<${T.name}>`, {
		intent: Intent,
		value: T
	});
}
var CompressedSignature = bcs.enum("CompressedSignature", {
	ED25519: bcs.bytes(64),
	Secp256k1: bcs.bytes(64),
	Secp256r1: bcs.bytes(64),
	ZkLogin: bcs.byteVector(),
	Passkey: bcs.byteVector()
});
var PublicKey$1 = bcs.enum("PublicKey", {
	ED25519: bcs.bytes(32),
	Secp256k1: bcs.bytes(33),
	Secp256r1: bcs.bytes(33),
	ZkLogin: bcs.byteVector(),
	Passkey: bcs.bytes(33)
});
var MultiSigPkMap = bcs.struct("MultiSigPkMap", {
	pubKey: PublicKey$1,
	weight: bcs.u8()
});
var MultiSigPublicKey = bcs.struct("MultiSigPublicKey", {
	pk_map: bcs.vector(MultiSigPkMap),
	threshold: bcs.u16()
});
var MultiSig = bcs.struct("MultiSig", {
	sigs: bcs.vector(CompressedSignature),
	bitmap: bcs.u16(),
	multisig_pk: MultiSigPublicKey
});
var base64String = bcs.byteVector().transform({
	input: (val) => typeof val === "string" ? fromBase64(val) : val,
	output: (val) => toBase64(new Uint8Array(val))
});
var SenderSignedTransaction = bcs.struct("SenderSignedTransaction", {
	intentMessage: IntentMessage(TransactionData),
	txSignatures: bcs.vector(base64String)
});
var SenderSignedData = bcs.vector(SenderSignedTransaction, { name: "SenderSignedData" });
var PasskeyAuthenticator = bcs.struct("PasskeyAuthenticator", {
	authenticatorData: bcs.byteVector(),
	clientDataJson: bcs.string(),
	userSignature: bcs.byteVector()
});
var MoveObjectType = bcs.enum("MoveObjectType", {
	Other: StructTag,
	GasCoin: null,
	StakedSui: null,
	Coin: TypeTag,
	AccumulatorBalanceWrapper: null
});
var TypeOrigin = bcs.struct("TypeOrigin", {
	moduleName: bcs.string(),
	datatypeName: bcs.string(),
	package: Address
});
var UpgradeInfo = bcs.struct("UpgradeInfo", {
	upgradedId: Address,
	upgradedVersion: bcs.u64()
});
var MovePackage = bcs.struct("MovePackage", {
	id: Address,
	version: bcs.u64(),
	moduleMap: bcs.map(bcs.string(), bcs.byteVector()),
	typeOriginTable: bcs.vector(TypeOrigin),
	linkageTable: bcs.map(Address, UpgradeInfo)
});
var MoveObject = bcs.struct("MoveObject", {
	type: MoveObjectType,
	hasPublicTransfer: bcs.bool(),
	version: bcs.u64(),
	contents: bcs.byteVector()
});
var Data = bcs.enum("Data", {
	Move: MoveObject,
	Package: MovePackage
});
var ObjectInner = bcs.struct("ObjectInner", {
	data: Data,
	owner: Owner,
	previousTransaction: ObjectDigest,
	storageRebate: bcs.u64()
});
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/bcs/effects.mjs
var PackageUpgradeError = bcs.enum("PackageUpgradeError", {
	UnableToFetchPackage: bcs.struct("UnableToFetchPackage", { packageId: Address }),
	NotAPackage: bcs.struct("NotAPackage", { objectId: Address }),
	IncompatibleUpgrade: null,
	DigestDoesNotMatch: bcs.struct("DigestDoesNotMatch", { digest: bcs.byteVector() }),
	UnknownUpgradePolicy: bcs.struct("UnknownUpgradePolicy", { policy: bcs.u8() }),
	PackageIDDoesNotMatch: bcs.struct("PackageIDDoesNotMatch", {
		packageId: Address,
		ticketId: Address
	})
});
var ModuleId = bcs.struct("ModuleId", {
	address: Address,
	name: bcs.string()
});
var MoveLocation = bcs.struct("MoveLocation", {
	module: ModuleId,
	function: bcs.u16(),
	instruction: bcs.u16(),
	functionName: bcs.option(bcs.string())
});
var CommandArgumentError = bcs.enum("CommandArgumentError", {
	TypeMismatch: null,
	InvalidBCSBytes: null,
	InvalidUsageOfPureArg: null,
	InvalidArgumentToPrivateEntryFunction: null,
	IndexOutOfBounds: bcs.struct("IndexOutOfBounds", { idx: bcs.u16() }),
	SecondaryIndexOutOfBounds: bcs.struct("SecondaryIndexOutOfBounds", {
		resultIdx: bcs.u16(),
		secondaryIdx: bcs.u16()
	}),
	InvalidResultArity: bcs.struct("InvalidResultArity", { resultIdx: bcs.u16() }),
	InvalidGasCoinUsage: null,
	InvalidValueUsage: null,
	InvalidObjectByValue: null,
	InvalidObjectByMutRef: null,
	SharedObjectOperationNotAllowed: null,
	InvalidArgumentArity: null,
	InvalidTransferObject: null,
	InvalidMakeMoveVecNonObjectArgument: null,
	ArgumentWithoutValue: null,
	CannotMoveBorrowedValue: null,
	CannotWriteToExtendedReference: null,
	InvalidReferenceArgument: null
});
var TypeArgumentError = bcs.enum("TypeArgumentError", {
	TypeNotFound: null,
	ConstraintNotSatisfied: null
});
var ExecutionFailureStatus = bcs.enum("ExecutionFailureStatus", {
	InsufficientGas: null,
	InvalidGasObject: null,
	InvariantViolation: null,
	FeatureNotYetSupported: null,
	MoveObjectTooBig: bcs.struct("MoveObjectTooBig", {
		objectSize: bcs.u64(),
		maxObjectSize: bcs.u64()
	}),
	MovePackageTooBig: bcs.struct("MovePackageTooBig", {
		objectSize: bcs.u64(),
		maxObjectSize: bcs.u64()
	}),
	CircularObjectOwnership: bcs.struct("CircularObjectOwnership", { object: Address }),
	InsufficientCoinBalance: null,
	CoinBalanceOverflow: null,
	PublishErrorNonZeroAddress: null,
	SuiMoveVerificationError: null,
	MovePrimitiveRuntimeError: bcs.option(MoveLocation),
	MoveAbort: bcs.tuple([MoveLocation, bcs.u64()]),
	VMVerificationOrDeserializationError: null,
	VMInvariantViolation: null,
	FunctionNotFound: null,
	ArityMismatch: null,
	TypeArityMismatch: null,
	NonEntryFunctionInvoked: null,
	CommandArgumentError: bcs.struct("CommandArgumentError", {
		argIdx: bcs.u16(),
		kind: CommandArgumentError
	}),
	TypeArgumentError: bcs.struct("TypeArgumentError", {
		argumentIdx: bcs.u16(),
		kind: TypeArgumentError
	}),
	UnusedValueWithoutDrop: bcs.struct("UnusedValueWithoutDrop", {
		resultIdx: bcs.u16(),
		secondaryIdx: bcs.u16()
	}),
	InvalidPublicFunctionReturnType: bcs.struct("InvalidPublicFunctionReturnType", { idx: bcs.u16() }),
	InvalidTransferObject: null,
	EffectsTooLarge: bcs.struct("EffectsTooLarge", {
		currentSize: bcs.u64(),
		maxSize: bcs.u64()
	}),
	PublishUpgradeMissingDependency: null,
	PublishUpgradeDependencyDowngrade: null,
	PackageUpgradeError: bcs.struct("PackageUpgradeError", { upgradeError: PackageUpgradeError }),
	WrittenObjectsTooLarge: bcs.struct("WrittenObjectsTooLarge", {
		currentSize: bcs.u64(),
		maxSize: bcs.u64()
	}),
	CertificateDenied: null,
	SuiMoveVerificationTimedout: null,
	SharedObjectOperationNotAllowed: null,
	InputObjectDeleted: null,
	ExecutionCancelledDueToSharedObjectCongestion: bcs.struct("ExecutionCancelledDueToSharedObjectCongestion", { congested_objects: bcs.vector(Address) }),
	AddressDeniedForCoin: bcs.struct("AddressDeniedForCoin", {
		address: Address,
		coinType: bcs.string()
	}),
	CoinTypeGlobalPause: bcs.struct("CoinTypeGlobalPause", { coinType: bcs.string() }),
	ExecutionCancelledDueToRandomnessUnavailable: null,
	MoveVectorElemTooBig: bcs.struct("MoveVectorElemTooBig", {
		valueSize: bcs.u64(),
		maxScaledSize: bcs.u64()
	}),
	MoveRawValueTooBig: bcs.struct("MoveRawValueTooBig", {
		valueSize: bcs.u64(),
		maxScaledSize: bcs.u64()
	}),
	InvalidLinkage: null,
	InsufficientBalanceForWithdraw: null,
	NonExclusiveWriteInputObjectModified: bcs.struct("NonExclusiveWriteInputObjectModified", { id: Address })
});
var ExecutionStatus = bcs.enum("ExecutionStatus", {
	Success: null,
	Failure: bcs.struct("Failure", {
		error: ExecutionFailureStatus,
		command: bcs.option(bcs.u64())
	})
});
var GasCostSummary = bcs.struct("GasCostSummary", {
	computationCost: bcs.u64(),
	storageCost: bcs.u64(),
	storageRebate: bcs.u64(),
	nonRefundableStorageFee: bcs.u64()
});
var TransactionEffectsV1 = bcs.struct("TransactionEffectsV1", {
	status: ExecutionStatus,
	executedEpoch: bcs.u64(),
	gasUsed: GasCostSummary,
	modifiedAtVersions: bcs.vector(bcs.tuple([Address, bcs.u64()])),
	sharedObjects: bcs.vector(SuiObjectRef),
	transactionDigest: ObjectDigest,
	created: bcs.vector(bcs.tuple([SuiObjectRef, Owner])),
	mutated: bcs.vector(bcs.tuple([SuiObjectRef, Owner])),
	unwrapped: bcs.vector(bcs.tuple([SuiObjectRef, Owner])),
	deleted: bcs.vector(SuiObjectRef),
	unwrappedThenDeleted: bcs.vector(SuiObjectRef),
	wrapped: bcs.vector(SuiObjectRef),
	gasObject: bcs.tuple([SuiObjectRef, Owner]),
	eventsDigest: bcs.option(ObjectDigest),
	dependencies: bcs.vector(ObjectDigest)
});
var VersionDigest = bcs.tuple([bcs.u64(), ObjectDigest]);
var ObjectIn = bcs.enum("ObjectIn", {
	NotExist: null,
	Exist: bcs.tuple([VersionDigest, Owner])
});
var AccumulatorAddress = bcs.struct("AccumulatorAddress", {
	address: Address,
	ty: TypeTag
});
var AccumulatorOperation = bcs.enum("AccumulatorOperation", {
	Merge: null,
	Split: null
});
var AccumulatorValue = bcs.enum("AccumulatorValue", {
	Integer: bcs.u64(),
	IntegerTuple: bcs.tuple([bcs.u64(), bcs.u64()]),
	EventDigest: bcs.vector(bcs.tuple([bcs.u64(), ObjectDigest]))
});
var AccumulatorWriteV1 = bcs.struct("AccumulatorWriteV1", {
	address: AccumulatorAddress,
	operation: AccumulatorOperation,
	value: AccumulatorValue
});
var ObjectOut = bcs.enum("ObjectOut", {
	NotExist: null,
	ObjectWrite: bcs.tuple([ObjectDigest, Owner]),
	PackageWrite: VersionDigest,
	AccumulatorWriteV1
});
var IDOperation = bcs.enum("IDOperation", {
	None: null,
	Created: null,
	Deleted: null
});
var EffectsObjectChange = bcs.struct("EffectsObjectChange", {
	inputState: ObjectIn,
	outputState: ObjectOut,
	idOperation: IDOperation
});
var UnchangedConsensusKind = bcs.enum("UnchangedConsensusKind", {
	ReadOnlyRoot: VersionDigest,
	MutateConsensusStreamEnded: bcs.u64(),
	ReadConsensusStreamEnded: bcs.u64(),
	Cancelled: bcs.u64(),
	PerEpochConfig: null
});
var TransactionEffectsV2 = bcs.struct("TransactionEffectsV2", {
	status: ExecutionStatus,
	executedEpoch: bcs.u64(),
	gasUsed: GasCostSummary,
	transactionDigest: ObjectDigest,
	gasObjectIndex: bcs.option(bcs.u32()),
	eventsDigest: bcs.option(ObjectDigest),
	dependencies: bcs.vector(ObjectDigest),
	lamportVersion: bcs.u64(),
	changedObjects: bcs.vector(bcs.tuple([Address, EffectsObjectChange])),
	unchangedConsensusObjects: bcs.vector(bcs.tuple([Address, UnchangedConsensusKind])),
	auxDataDigest: bcs.option(ObjectDigest)
});
var TransactionEffects = bcs.enum("TransactionEffects", {
	V1: TransactionEffectsV1,
	V2: TransactionEffectsV2
});
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/bcs/index.mjs
var suiBcs = {
	...bcs,
	U8: bcs.u8(),
	U16: bcs.u16(),
	U32: bcs.u32(),
	U64: bcs.u64(),
	U128: bcs.u128(),
	U256: bcs.u256(),
	ULEB128: bcs.uleb128(),
	Bool: bcs.bool(),
	String: bcs.string(),
	Address,
	AppId,
	Argument,
	CallArg,
	Command,
	CompressedSignature,
	Data,
	GasData,
	Intent,
	IntentMessage,
	IntentScope,
	IntentVersion,
	MoveObject,
	MoveObjectType,
	MovePackage,
	MultiSig,
	MultiSigPkMap,
	MultiSigPublicKey,
	Object: ObjectInner,
	ObjectArg,
	ObjectDigest,
	Owner,
	PasskeyAuthenticator,
	ProgrammableMoveCall,
	ProgrammableTransaction,
	PublicKey: PublicKey$1,
	SenderSignedData,
	SenderSignedTransaction,
	SharedObjectRef,
	StructTag,
	SuiObjectRef,
	TransactionData,
	TransactionDataV1,
	TransactionEffects,
	TransactionExpiration,
	TransactionKind,
	TypeOrigin,
	TypeTag,
	UpgradeInfo
};
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/cryptography/intent.mjs
/**
* Inserts a domain separator for a message that is being signed
*/
function messageWithIntent(scope, message) {
	return suiBcs.IntentMessage(suiBcs.bytes(message.length)).serialize({
		intent: {
			scope: { [scope]: true },
			version: { V0: true },
			appId: { Sui: true }
		},
		value: message
	}).toBytes();
}
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_blake.js
/**
* Internal blake permutation table.
* Rows `0..9` serve BLAKE2s, rows `0..11` serve BLAKE2b with `10..11 = 0..1`, and Blake1 also
* reuses the later rows shown below. Blake1 expands rounds `10..15` as `SIGMA[i % 10]`, so rows
* `10..15` intentionally repeat rows `0..5` for the 14-round (256) and 16-round (512) variants.
*/
var BSIGMA = /* @__PURE__ */ Uint8Array.from([
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	14,
	10,
	4,
	8,
	9,
	15,
	13,
	6,
	1,
	12,
	0,
	2,
	11,
	7,
	5,
	3,
	11,
	8,
	12,
	0,
	5,
	2,
	15,
	13,
	10,
	14,
	3,
	6,
	7,
	1,
	9,
	4,
	7,
	9,
	3,
	1,
	13,
	12,
	11,
	14,
	2,
	6,
	5,
	10,
	4,
	0,
	15,
	8,
	9,
	0,
	5,
	7,
	2,
	4,
	10,
	15,
	14,
	1,
	11,
	12,
	6,
	8,
	3,
	13,
	2,
	12,
	6,
	10,
	0,
	11,
	8,
	3,
	4,
	13,
	7,
	5,
	15,
	14,
	1,
	9,
	12,
	5,
	1,
	15,
	14,
	13,
	4,
	10,
	0,
	7,
	6,
	3,
	9,
	2,
	8,
	11,
	13,
	11,
	7,
	14,
	12,
	1,
	3,
	9,
	5,
	0,
	15,
	4,
	8,
	6,
	2,
	10,
	6,
	15,
	14,
	9,
	11,
	3,
	0,
	8,
	12,
	2,
	13,
	7,
	1,
	4,
	10,
	5,
	10,
	2,
	8,
	4,
	7,
	6,
	1,
	5,
	15,
	11,
	9,
	14,
	3,
	12,
	13,
	0,
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	14,
	10,
	4,
	8,
	9,
	15,
	13,
	6,
	1,
	12,
	0,
	2,
	11,
	7,
	5,
	3,
	11,
	8,
	12,
	0,
	5,
	2,
	15,
	13,
	10,
	14,
	3,
	6,
	7,
	1,
	9,
	4,
	7,
	9,
	3,
	1,
	13,
	12,
	11,
	14,
	2,
	6,
	5,
	10,
	4,
	0,
	15,
	8,
	9,
	0,
	5,
	7,
	2,
	4,
	10,
	15,
	14,
	1,
	11,
	12,
	6,
	8,
	3,
	13,
	2,
	12,
	6,
	10,
	0,
	11,
	8,
	3,
	4,
	13,
	7,
	5,
	15,
	14,
	1,
	9
]);
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/blake2.js
/**
* blake2b (64-bit) & blake2s (8 to 32-bit) hash functions.
* b could have been faster, but there is no fast u64 in js, so s is 1.5x faster.
* @module
*/
var B2B_IV = /* @__PURE__ */ Uint32Array.from([
	4089235720,
	1779033703,
	2227873595,
	3144134277,
	4271175723,
	1013904242,
	1595750129,
	2773480762,
	2917565137,
	1359893119,
	725511199,
	2600822924,
	4215389547,
	528734635,
	327033209,
	1541459225
]);
var BBUF = /* @__PURE__ */ new Uint32Array(32);
function G1b(a, b, c, d, msg, x) {
	const Xl = msg[x], Xh = msg[x + 1];
	let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
	let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
	let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
	let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
	let ll = add3L$1(Al, Bl, Xl);
	Ah = add3H$1(ll, Ah, Bh, Xh);
	Al = ll | 0;
	({Dh, Dl} = {
		Dh: Dh ^ Ah,
		Dl: Dl ^ Al
	});
	({Dh, Dl} = {
		Dh: rotr32H(Dh, Dl),
		Dl: rotr32L(Dh, Dl)
	});
	({h: Ch, l: Cl} = add$1(Ch, Cl, Dh, Dl));
	({Bh, Bl} = {
		Bh: Bh ^ Ch,
		Bl: Bl ^ Cl
	});
	({Bh, Bl} = {
		Bh: rotrSH$1(Bh, Bl, 24),
		Bl: rotrSL$1(Bh, Bl, 24)
	});
	BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
	BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
	BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
	BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function G2b(a, b, c, d, msg, x) {
	const Xl = msg[x], Xh = msg[x + 1];
	let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
	let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
	let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
	let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
	let ll = add3L$1(Al, Bl, Xl);
	Ah = add3H$1(ll, Ah, Bh, Xh);
	Al = ll | 0;
	({Dh, Dl} = {
		Dh: Dh ^ Ah,
		Dl: Dl ^ Al
	});
	({Dh, Dl} = {
		Dh: rotrSH$1(Dh, Dl, 16),
		Dl: rotrSL$1(Dh, Dl, 16)
	});
	({h: Ch, l: Cl} = add$1(Ch, Cl, Dh, Dl));
	({Bh, Bl} = {
		Bh: Bh ^ Ch,
		Bl: Bl ^ Cl
	});
	({Bh, Bl} = {
		Bh: rotrBH$1(Bh, Bl, 63),
		Bl: rotrBL$1(Bh, Bl, 63)
	});
	BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
	BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
	BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
	BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function checkBlake2Opts(outputLen, opts = {}, keyLen, saltLen, persLen) {
	anumber$1(keyLen);
	if (outputLen <= 0 || outputLen > keyLen) throw new Error("outputLen bigger than keyLen");
	const { key, salt, personalization } = opts;
	if (key !== void 0 && (key.length < 1 || key.length > keyLen)) throw new Error("\"key\" expected to be undefined or of length=1.." + keyLen);
	if (salt !== void 0) abytes$1(salt, saltLen, "salt");
	if (personalization !== void 0) abytes$1(personalization, persLen, "personalization");
}
/** Internal base class for BLAKE2. */
var _BLAKE2 = class {
	buffer;
	buffer32;
	finished = false;
	destroyed = false;
	length = 0;
	pos = 0;
	blockLen;
	outputLen;
	canXOF = false;
	constructor(blockLen, outputLen) {
		anumber$1(blockLen);
		anumber$1(outputLen);
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.buffer = new Uint8Array(blockLen);
		this.buffer32 = u32(this.buffer);
	}
	update(data) {
		aexists$1(this);
		abytes$1(data);
		const { blockLen, buffer, buffer32 } = this;
		const len = data.length;
		const offset = data.byteOffset;
		const buf = data.buffer;
		for (let pos = 0; pos < len;) {
			if (this.pos === blockLen) {
				swap32IfBE(buffer32);
				this.compress(buffer32, 0, false);
				swap32IfBE(buffer32);
				this.pos = 0;
			}
			const take = Math.min(blockLen - this.pos, len - pos);
			const dataOffset = offset + pos;
			if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
				const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
				swap32IfBE(data32);
				for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
					this.length += blockLen;
					this.compress(data32, pos32, false);
				}
				swap32IfBE(data32);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			this.length += take;
			pos += take;
		}
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		aoutput$1(out, this);
		const { pos, buffer32 } = this;
		this.finished = true;
		clean$1(this.buffer.subarray(pos));
		swap32IfBE(buffer32);
		this.compress(buffer32, 0, true);
		swap32IfBE(buffer32);
		if (out.byteOffset & 3) throw new RangeError("\"digestInto() output\" expected 4-byte aligned byteOffset, got " + out.byteOffset);
		const state = this.get();
		const out32 = u32(out);
		const full = Math.floor(this.outputLen / 4);
		for (let i = 0; i < full; i++) out32[i] = swap8IfBE(state[i]);
		const tail = this.outputLen % 4;
		if (!tail) return;
		const off = full * 4;
		const word = state[full];
		for (let i = 0; i < tail; i++) out[off + i] = word >>> 8 * i;
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneInto(to) {
		const { buffer, length, finished, destroyed, outputLen, pos } = this;
		to ||= new this.constructor({ dkLen: outputLen });
		to.set(...this.get());
		to.buffer.set(buffer);
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		to.outputLen = outputLen;
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
/** Internal blake2b hash class with state stored as LE u32 low/high halves. */
var _BLAKE2b = class extends _BLAKE2 {
	v0l = B2B_IV[0] | 0;
	v0h = B2B_IV[1] | 0;
	v1l = B2B_IV[2] | 0;
	v1h = B2B_IV[3] | 0;
	v2l = B2B_IV[4] | 0;
	v2h = B2B_IV[5] | 0;
	v3l = B2B_IV[6] | 0;
	v3h = B2B_IV[7] | 0;
	v4l = B2B_IV[8] | 0;
	v4h = B2B_IV[9] | 0;
	v5l = B2B_IV[10] | 0;
	v5h = B2B_IV[11] | 0;
	v6l = B2B_IV[12] | 0;
	v6h = B2B_IV[13] | 0;
	v7l = B2B_IV[14] | 0;
	v7h = B2B_IV[15] | 0;
	constructor(opts = {}) {
		const olen = opts.dkLen === void 0 ? 64 : opts.dkLen;
		super(128, olen);
		checkBlake2Opts(olen, opts, 64, 16, 16);
		let { key, personalization, salt } = opts;
		let keyLength = 0;
		if (key !== void 0) {
			abytes$1(key, void 0, "key");
			keyLength = key.length;
		}
		this.v0l ^= this.outputLen | keyLength << 8 | 16842752;
		if (salt !== void 0) {
			abytes$1(salt, void 0, "salt");
			const slt = u32(salt);
			this.v4l ^= swap8IfBE(slt[0]);
			this.v4h ^= swap8IfBE(slt[1]);
			this.v5l ^= swap8IfBE(slt[2]);
			this.v5h ^= swap8IfBE(slt[3]);
		}
		if (personalization !== void 0) {
			abytes$1(personalization, void 0, "personalization");
			const pers = u32(personalization);
			this.v6l ^= swap8IfBE(pers[0]);
			this.v6h ^= swap8IfBE(pers[1]);
			this.v7l ^= swap8IfBE(pers[2]);
			this.v7h ^= swap8IfBE(pers[3]);
		}
		if (key !== void 0) {
			const tmp = new Uint8Array(this.blockLen);
			tmp.set(key);
			this.update(tmp);
		}
	}
	get() {
		let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
		return [
			v0l,
			v0h,
			v1l,
			v1h,
			v2l,
			v2h,
			v3l,
			v3h,
			v4l,
			v4h,
			v5l,
			v5h,
			v6l,
			v6h,
			v7l,
			v7h
		];
	}
	set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
		this.v0l = v0l | 0;
		this.v0h = v0h | 0;
		this.v1l = v1l | 0;
		this.v1h = v1h | 0;
		this.v2l = v2l | 0;
		this.v2h = v2h | 0;
		this.v3l = v3l | 0;
		this.v3h = v3h | 0;
		this.v4l = v4l | 0;
		this.v4h = v4h | 0;
		this.v5l = v5l | 0;
		this.v5h = v5h | 0;
		this.v6l = v6l | 0;
		this.v6h = v6h | 0;
		this.v7l = v7l | 0;
		this.v7h = v7h | 0;
	}
	compress(msg, offset, isLast) {
		this.get().forEach((v, i) => BBUF[i] = v);
		BBUF.set(B2B_IV, 16);
		let { h, l } = fromBig$1(BigInt(this.length));
		BBUF[24] = B2B_IV[8] ^ l;
		BBUF[25] = B2B_IV[9] ^ h;
		if (isLast) {
			BBUF[28] = ~BBUF[28];
			BBUF[29] = ~BBUF[29];
		}
		let j = 0;
		const s = BSIGMA;
		for (let i = 0; i < 12; i++) {
			G1b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
			G2b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
			G1b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
			G2b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
			G1b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
			G2b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
			G1b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
			G2b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
			G1b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
			G2b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
			G1b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
			G2b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
			G1b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
			G2b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
			G1b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
			G2b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
		}
		this.v0l ^= BBUF[0] ^ BBUF[16];
		this.v0h ^= BBUF[1] ^ BBUF[17];
		this.v1l ^= BBUF[2] ^ BBUF[18];
		this.v1h ^= BBUF[3] ^ BBUF[19];
		this.v2l ^= BBUF[4] ^ BBUF[20];
		this.v2h ^= BBUF[5] ^ BBUF[21];
		this.v3l ^= BBUF[6] ^ BBUF[22];
		this.v3h ^= BBUF[7] ^ BBUF[23];
		this.v4l ^= BBUF[8] ^ BBUF[24];
		this.v4h ^= BBUF[9] ^ BBUF[25];
		this.v5l ^= BBUF[10] ^ BBUF[26];
		this.v5h ^= BBUF[11] ^ BBUF[27];
		this.v6l ^= BBUF[12] ^ BBUF[28];
		this.v6h ^= BBUF[13] ^ BBUF[29];
		this.v7l ^= BBUF[14] ^ BBUF[30];
		this.v7h ^= BBUF[15] ^ BBUF[31];
		clean$1(BBUF);
	}
	destroy() {
		this.destroyed = true;
		clean$1(this.buffer32);
		this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
};
/**
* Blake2b hash function. 64-bit. 1.5x slower than blake2s in JS.
* @param msg - message that would be hashed
* @param opts - Optional output, MAC, salt, and personalization settings.
*   `dkLen` must be 1..64 bytes; `salt` and `personalization`, if present,
*   must be 16 bytes each. See {@link Blake2Opts}.
* @returns Digest bytes.
* @example
* Hash a message with Blake2b.
* ```ts
* blake2b(new Uint8Array([97, 98, 99]));
* ```
*/
var blake2b = /* @__PURE__ */ createHasher$2((opts) => new _BLAKE2b(opts));
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/cryptography/publickey.mjs
function bytesEqual(a, b) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
/**
* A public key
*/
var PublicKey = class {
	/**
	* Checks if two public keys are equal
	*/
	equals(publicKey) {
		return bytesEqual(this.toRawBytes(), publicKey.toRawBytes());
	}
	/**
	* Return the base-64 representation of the public key
	*/
	toBase64() {
		return toBase64(this.toRawBytes());
	}
	toString() {
		throw new Error("`toString` is not implemented on public keys. Use `toBase64()` or `toRawBytes()` instead.");
	}
	/**
	* Return the Sui representation of the public key encoded in
	* base-64. A Sui public key is formed by the concatenation
	* of the scheme flag with the raw bytes of the public key
	*/
	toSuiPublicKey() {
		return toBase64(this.toSuiBytes());
	}
	verifyWithIntent(bytes, signature, intent) {
		const digest = blake2b(messageWithIntent(intent, bytes), { dkLen: 32 });
		return this.verify(digest, signature);
	}
	/**
	* Verifies that the signature is valid for for the provided PersonalMessage
	*/
	verifyPersonalMessage(message, signature) {
		return this.verifyWithIntent(suiBcs.byteVector().serialize(message).toBytes(), signature, "PersonalMessage");
	}
	/**
	* Verifies that the signature is valid for for the provided Transaction
	*/
	verifyTransaction(transaction, signature) {
		return this.verifyWithIntent(transaction, signature, "TransactionData");
	}
	/**
	* Verifies that the public key is associated with the provided address
	*/
	verifyAddress(address) {
		return this.toSuiAddress() === address;
	}
	/**
	* Returns the bytes representation of the public key
	* prefixed with the signature scheme flag
	*/
	toSuiBytes() {
		const rawBytes = this.toRawBytes();
		const suiBytes = new Uint8Array(rawBytes.length + 1);
		suiBytes.set([this.flag()]);
		suiBytes.set(rawBytes, 1);
		return suiBytes;
	}
	/**
	* Return the Sui address associated with this Ed25519 public key
	*/
	toSuiAddress() {
		return normalizeSuiAddress(bytesToHex$1(blake2b(this.toSuiBytes(), { dkLen: 32 })).slice(0, 64));
	}
};
function parseSerializedKeypairSignature(serializedSignature) {
	const bytes = fromBase64(serializedSignature);
	const signatureScheme = SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
	switch (signatureScheme) {
		case "ED25519":
		case "Secp256k1":
		case "Secp256r1":
			const size = SIGNATURE_SCHEME_TO_SIZE[signatureScheme];
			const signature = bytes.slice(1, bytes.length - size);
			return {
				serializedSignature,
				signatureScheme,
				signature,
				publicKey: bytes.slice(1 + signature.length),
				bytes
			};
		default: throw new Error("Unsupported signature scheme");
	}
}
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.0.1/node_modules/@noble/hashes/utils.js
/**
* Utilities for hex, bytes, CSPRNG.
* @module
*/
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/** Checks if something is Uint8Array. Be careful: nodejs Buffer will return true. */
function isBytes(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
/** Asserts something is positive integer. */
function anumber(n, title = "") {
	if (!Number.isSafeInteger(n) || n < 0) {
		const prefix = title && `"${title}" `;
		throw new Error(`${prefix}expected integer >= 0, got ${n}`);
	}
}
/** Asserts something is Uint8Array. */
function abytes(value, length, title = "") {
	const bytes = isBytes(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title && `"${title}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
	}
	return value;
}
/** Asserts something is hash */
function ahash(h) {
	if (typeof h !== "function" || typeof h.create !== "function") throw new Error("Hash must wrapped by utils.createHasher");
	anumber(h.outputLen);
	anumber(h.blockLen);
}
/** Asserts a hash instance has not been destroyed / finished */
function aexists(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
/** Asserts output is properly-sized byte array */
function aoutput(out, instance) {
	abytes(out, void 0, "digestInto() output");
	const min = instance.outputLen;
	if (out.length < min) throw new Error("\"digestInto() output\" expected to be of length >=" + min);
}
/** Zeroize a byte array. Warning: JS provides no guarantees. */
function clean(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
/** Create DataView of an array for easy byte-level manipulation. */
function createView(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
var hasHexBuiltin = typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function";
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
/**
* Convert byte array to hex string. Uses built-in function, when available.
* @example bytesToHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) // 'cafe0123'
*/
function bytesToHex(bytes) {
	abytes(bytes);
	if (hasHexBuiltin) return bytes.toHex();
	let hex = "";
	for (let i = 0; i < bytes.length; i++) hex += hexes[bytes[i]];
	return hex;
}
var asciis = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function asciiToBase16(ch) {
	if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0;
	if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10);
	if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10);
}
/**
* Convert hex string to byte array. Uses built-in function, when available.
* @example hexToBytes('cafe0123') // Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
*/
function hexToBytes(hex) {
	if (typeof hex !== "string") throw new Error("hex string expected, got " + typeof hex);
	if (hasHexBuiltin) return Uint8Array.fromHex(hex);
	const hl = hex.length;
	const al = hl / 2;
	if (hl % 2) throw new Error("hex string expected, got unpadded hex of length " + hl);
	const array = new Uint8Array(al);
	for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		const n1 = asciiToBase16(hex.charCodeAt(hi));
		const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
		if (n1 === void 0 || n2 === void 0) {
			const char = hex[hi] + hex[hi + 1];
			throw new Error("hex string expected, got non-hex character \"" + char + "\" at index " + hi);
		}
		array[ai] = n1 * 16 + n2;
	}
	return array;
}
/**
* Converts string to bytes using UTF8 encoding.
* Built-in doesn't validate input to be string: we do the check.
* @example utf8ToBytes('abc') // Uint8Array.from([97, 98, 99])
*/
function utf8ToBytes(str) {
	if (typeof str !== "string") throw new Error("string expected");
	return new Uint8Array(new TextEncoder().encode(str));
}
/**
* Helper for KDFs: consumes uint8array or string.
* When string is passed, does utf8 decoding, using TextDecoder.
*/
function kdfInputToBytes(data, errorTitle = "") {
	if (typeof data === "string") return utf8ToBytes(data);
	return abytes(data, void 0, errorTitle);
}
/** Copies several Uint8Arrays into one. */
function concatBytes(...arrays) {
	let sum = 0;
	for (let i = 0; i < arrays.length; i++) {
		const a = arrays[i];
		abytes(a);
		sum += a.length;
	}
	const res = new Uint8Array(sum);
	for (let i = 0, pad = 0; i < arrays.length; i++) {
		const a = arrays[i];
		res.set(a, pad);
		pad += a.length;
	}
	return res;
}
/** Merges default options and passed options. */
function checkOpts(defaults, opts) {
	if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]") throw new Error("options must be object or undefined");
	return Object.assign(defaults, opts);
}
/** Creates function with outputLen, blockLen, create properties from a class constructor. */
function createHasher$1(hashCons, info = {}) {
	const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
	const tmp = hashCons(void 0);
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.create = (opts) => hashCons(opts);
	Object.assign(hashC, info);
	return Object.freeze(hashC);
}
/** Cryptographically secure PRNG. Uses internal OS-level `crypto.getRandomValues`. */
function randomBytes(bytesLength = 32) {
	const cr = typeof globalThis === "object" ? globalThis.crypto : null;
	if (typeof cr?.getRandomValues !== "function") throw new Error("crypto.getRandomValues must be defined");
	return cr.getRandomValues(new Uint8Array(bytesLength));
}
/** Creates OID opts for NIST hashes, with prefix 06 09 60 86 48 01 65 03 04 02. */
var oidNist = (suffix) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	suffix
]) });
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.0.1/node_modules/@noble/hashes/_md.js
/**
* Internal Merkle-Damgard hash utils.
* @module
*/
/**
* Merkle-Damgard hash construction base class.
* Could be used to create MD5, RIPEMD, SHA1, SHA2.
*/
var HashMD = class {
	blockLen;
	outputLen;
	padOffset;
	isLE;
	buffer;
	view;
	finished = false;
	length = 0;
	pos = 0;
	destroyed = false;
	constructor(blockLen, outputLen, padOffset, isLE) {
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.padOffset = padOffset;
		this.isLE = isLE;
		this.buffer = new Uint8Array(blockLen);
		this.view = createView(this.buffer);
	}
	update(data) {
		aexists(this);
		abytes(data);
		const { view, buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				const dataView = createView(data);
				for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(view, 0);
				this.pos = 0;
			}
		}
		this.length += data.length;
		this.roundClean();
		return this;
	}
	digestInto(out) {
		aexists(this);
		aoutput(out, this);
		this.finished = true;
		const { buffer, view, blockLen, isLE } = this;
		let { pos } = this;
		buffer[pos++] = 128;
		clean(this.buffer.subarray(pos));
		if (this.padOffset > blockLen - pos) {
			this.process(view, 0);
			pos = 0;
		}
		for (let i = pos; i < blockLen; i++) buffer[i] = 0;
		view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE);
		this.process(view, 0);
		const oview = createView(out);
		const len = this.outputLen;
		if (len % 4) throw new Error("_sha2: outputLen must be aligned to 32bit");
		const outLen = len / 4;
		const state = this.get();
		if (outLen > state.length) throw new Error("_sha2: outputLen bigger than state");
		for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneInto(to) {
		to ||= new this.constructor();
		to.set(...this.get());
		const { blockLen, buffer, length, finished, destroyed, pos } = this;
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		if (length % blockLen) to.buffer.set(buffer);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
/** Initial SHA512 state. Bits 0..64 of frac part of sqrt of primes 2..19 */
var SHA512_IV = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	4089235720,
	3144134277,
	2227873595,
	1013904242,
	4271175723,
	2773480762,
	1595750129,
	1359893119,
	2917565137,
	2600822924,
	725511199,
	528734635,
	4215389547,
	1541459225,
	327033209
]);
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.0.1/node_modules/@noble/hashes/_u64.js
/**
* Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
* @todo re-check https://issues.chromium.org/issues/42212588
* @module
*/
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
	if (le) return {
		h: Number(n & U32_MASK64),
		l: Number(n >> _32n & U32_MASK64)
	};
	return {
		h: Number(n >> _32n & U32_MASK64) | 0,
		l: Number(n & U32_MASK64) | 0
	};
}
function split(lst, le = false) {
	const len = lst.length;
	let Ah = new Uint32Array(len);
	let Al = new Uint32Array(len);
	for (let i = 0; i < len; i++) {
		const { h, l } = fromBig(lst[i], le);
		[Ah[i], Al[i]] = [h, l];
	}
	return [Ah, Al];
}
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
function add(Ah, Al, Bh, Bl) {
	const l = (Al >>> 0) + (Bl >>> 0);
	return {
		h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
		l: l | 0
	};
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.0.1/node_modules/@noble/hashes/sha2.js
/**
* SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
* SHA256 is the fastest hash implementable in JS, even faster than Blake3.
* Check out [RFC 4634](https://www.rfc-editor.org/rfc/rfc4634) and
* [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
* @module
*/
var K512 = split([
	"0x428a2f98d728ae22",
	"0x7137449123ef65cd",
	"0xb5c0fbcfec4d3b2f",
	"0xe9b5dba58189dbbc",
	"0x3956c25bf348b538",
	"0x59f111f1b605d019",
	"0x923f82a4af194f9b",
	"0xab1c5ed5da6d8118",
	"0xd807aa98a3030242",
	"0x12835b0145706fbe",
	"0x243185be4ee4b28c",
	"0x550c7dc3d5ffb4e2",
	"0x72be5d74f27b896f",
	"0x80deb1fe3b1696b1",
	"0x9bdc06a725c71235",
	"0xc19bf174cf692694",
	"0xe49b69c19ef14ad2",
	"0xefbe4786384f25e3",
	"0x0fc19dc68b8cd5b5",
	"0x240ca1cc77ac9c65",
	"0x2de92c6f592b0275",
	"0x4a7484aa6ea6e483",
	"0x5cb0a9dcbd41fbd4",
	"0x76f988da831153b5",
	"0x983e5152ee66dfab",
	"0xa831c66d2db43210",
	"0xb00327c898fb213f",
	"0xbf597fc7beef0ee4",
	"0xc6e00bf33da88fc2",
	"0xd5a79147930aa725",
	"0x06ca6351e003826f",
	"0x142929670a0e6e70",
	"0x27b70a8546d22ffc",
	"0x2e1b21385c26c926",
	"0x4d2c6dfc5ac42aed",
	"0x53380d139d95b3df",
	"0x650a73548baf63de",
	"0x766a0abb3c77b2a8",
	"0x81c2c92e47edaee6",
	"0x92722c851482353b",
	"0xa2bfe8a14cf10364",
	"0xa81a664bbc423001",
	"0xc24b8b70d0f89791",
	"0xc76c51a30654be30",
	"0xd192e819d6ef5218",
	"0xd69906245565a910",
	"0xf40e35855771202a",
	"0x106aa07032bbd1b8",
	"0x19a4c116b8d2d0c8",
	"0x1e376c085141ab53",
	"0x2748774cdf8eeb99",
	"0x34b0bcb5e19b48a8",
	"0x391c0cb3c5c95a63",
	"0x4ed8aa4ae3418acb",
	"0x5b9cca4f7763e373",
	"0x682e6ff3d6b2b8a3",
	"0x748f82ee5defb2fc",
	"0x78a5636f43172f60",
	"0x84c87814a1f0ab72",
	"0x8cc702081a6439ec",
	"0x90befffa23631e28",
	"0xa4506cebde82bde9",
	"0xbef9a3f7b2c67915",
	"0xc67178f2e372532b",
	"0xca273eceea26619c",
	"0xd186b8c721c0c207",
	"0xeada7dd6cde0eb1e",
	"0xf57d4f7fee6ed178",
	"0x06f067aa72176fba",
	"0x0a637dc5a2c898a6",
	"0x113f9804bef90dae",
	"0x1b710b35131c471b",
	"0x28db77f523047d84",
	"0x32caab7b40c72493",
	"0x3c9ebe0a15c9bebc",
	"0x431d67c49c100d4c",
	"0x4cc5d4becb3e42b6",
	"0x597f299cfc657e2a",
	"0x5fcb6fab3ad6faec",
	"0x6c44198c4a475817"
].map((n) => BigInt(n)));
var SHA512_Kh = K512[0];
var SHA512_Kl = K512[1];
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
/** Internal 64-byte base SHA2 hash class. */
var SHA2_64B = class extends HashMD {
	constructor(outputLen) {
		super(128, outputLen, 16, false);
	}
	get() {
		const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
		return [
			Ah,
			Al,
			Bh,
			Bl,
			Ch,
			Cl,
			Dh,
			Dl,
			Eh,
			El,
			Fh,
			Fl,
			Gh,
			Gl,
			Hh,
			Hl
		];
	}
	set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
		this.Ah = Ah | 0;
		this.Al = Al | 0;
		this.Bh = Bh | 0;
		this.Bl = Bl | 0;
		this.Ch = Ch | 0;
		this.Cl = Cl | 0;
		this.Dh = Dh | 0;
		this.Dl = Dl | 0;
		this.Eh = Eh | 0;
		this.El = El | 0;
		this.Fh = Fh | 0;
		this.Fl = Fl | 0;
		this.Gh = Gh | 0;
		this.Gl = Gl | 0;
		this.Hh = Hh | 0;
		this.Hl = Hl | 0;
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) {
			SHA512_W_H[i] = view.getUint32(offset);
			SHA512_W_L[i] = view.getUint32(offset += 4);
		}
		for (let i = 16; i < 80; i++) {
			const W15h = SHA512_W_H[i - 15] | 0;
			const W15l = SHA512_W_L[i - 15] | 0;
			const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
			const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
			const W2h = SHA512_W_H[i - 2] | 0;
			const W2l = SHA512_W_L[i - 2] | 0;
			const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
			const SUMl = add4L(s0l, rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6), SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
			SHA512_W_H[i] = add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]) | 0;
			SHA512_W_L[i] = SUMl | 0;
		}
		let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
		for (let i = 0; i < 80; i++) {
			const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
			const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
			const CHIh = Eh & Fh ^ ~Eh & Gh;
			const CHIl = El & Fl ^ ~El & Gl;
			const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
			const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
			const T1l = T1ll | 0;
			const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
			const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
			const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
			const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
			Hh = Gh | 0;
			Hl = Gl | 0;
			Gh = Fh | 0;
			Gl = Fl | 0;
			Fh = Eh | 0;
			Fl = El | 0;
			({h: Eh, l: El} = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
			Dh = Ch | 0;
			Dl = Cl | 0;
			Ch = Bh | 0;
			Cl = Bl | 0;
			Bh = Ah | 0;
			Bl = Al | 0;
			const All = add3L(T1l, sigma0l, MAJl);
			Ah = add3H(All, T1h, sigma0h, MAJh);
			Al = All | 0;
		}
		({h: Ah, l: Al} = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
		({h: Bh, l: Bl} = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
		({h: Ch, l: Cl} = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
		({h: Dh, l: Dl} = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
		({h: Eh, l: El} = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
		({h: Fh, l: Fl} = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
		({h: Gh, l: Gl} = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
		({h: Hh, l: Hl} = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
		this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
	}
	roundClean() {
		clean(SHA512_W_H, SHA512_W_L);
	}
	destroy() {
		clean(this.buffer);
		this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	}
};
/** Internal SHA2-512 hash class. */
var _SHA512 = class extends SHA2_64B {
	Ah = SHA512_IV[0] | 0;
	Al = SHA512_IV[1] | 0;
	Bh = SHA512_IV[2] | 0;
	Bl = SHA512_IV[3] | 0;
	Ch = SHA512_IV[4] | 0;
	Cl = SHA512_IV[5] | 0;
	Dh = SHA512_IV[6] | 0;
	Dl = SHA512_IV[7] | 0;
	Eh = SHA512_IV[8] | 0;
	El = SHA512_IV[9] | 0;
	Fh = SHA512_IV[10] | 0;
	Fl = SHA512_IV[11] | 0;
	Gh = SHA512_IV[12] | 0;
	Gl = SHA512_IV[13] | 0;
	Hh = SHA512_IV[14] | 0;
	Hl = SHA512_IV[15] | 0;
	constructor() {
		super(64);
	}
};
/** SHA2-512 hash function from RFC 4634. */
var sha512 = /* @__PURE__ */ createHasher$1(() => new _SHA512(), /* @__PURE__ */ oidNist(3));
//#endregion
//#region node_modules/.pnpm/@noble+curves@2.0.1/node_modules/@noble/curves/utils.js
/**
* Hex, bytes and number utilities.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$4 = /* @__PURE__ */ BigInt(0);
var _1n$4 = /* @__PURE__ */ BigInt(1);
function abool(value, title = "") {
	if (typeof value !== "boolean") {
		const prefix = title && `"${title}" `;
		throw new Error(prefix + "expected boolean, got type=" + typeof value);
	}
	return value;
}
function abignumber(n) {
	if (typeof n === "bigint") {
		if (!isPosBig(n)) throw new Error("positive bigint expected, got " + n);
	} else anumber(n);
	return n;
}
function asafenumber(value, title = "") {
	if (!Number.isSafeInteger(value)) {
		const prefix = title && `"${title}" `;
		throw new Error(prefix + "expected safe integer, got type=" + typeof value);
	}
}
function hexToNumber(hex) {
	if (typeof hex !== "string") throw new Error("hex string expected, got " + typeof hex);
	return hex === "" ? _0n$4 : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
	return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
	return hexToNumber(bytesToHex(copyBytes(abytes(bytes)).reverse()));
}
function numberToBytesBE(n, len) {
	anumber(len);
	n = abignumber(n);
	const res = hexToBytes(n.toString(16).padStart(len * 2, "0"));
	if (res.length !== len) throw new Error("number too large");
	return res;
}
function numberToBytesLE(n, len) {
	return numberToBytesBE(n, len).reverse();
}
function equalBytes(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
	return diff === 0;
}
/**
* Copies Uint8Array. We can't use u8a.slice(), because u8a can be Buffer,
* and Buffer#slice creates mutable copy. Never use Buffers!
*/
function copyBytes(bytes) {
	return Uint8Array.from(bytes);
}
/**
* Decodes 7-bit ASCII string to Uint8Array, throws on non-ascii symbols
* Should be safe to use for things expected to be ASCII.
* Returns exact same result as `TextEncoder` for ASCII or throws.
*/
function asciiToBytes(ascii) {
	return Uint8Array.from(ascii, (c, i) => {
		const charCode = c.charCodeAt(0);
		if (c.length !== 1 || charCode > 127) throw new Error(`string contains non-ASCII character "${ascii[i]}" with code ${charCode} at position ${i}`);
		return charCode;
	});
}
var isPosBig = (n) => typeof n === "bigint" && _0n$4 <= n;
function inRange(n, min, max) {
	return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
/**
* Asserts min <= n < max. NOTE: It's < max and not <= max.
* @example
* aInRange('x', x, 1n, 256n); // would assume x is in (1n..255n)
*/
function aInRange(title, n, min, max) {
	if (!inRange(n, min, max)) throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
/**
* Calculates amount of bits in a bigint.
* Same as `n.toString(2).length`
* TODO: merge with nLength in modular
*/
function bitLen(n) {
	let len;
	for (len = 0; n > _0n$4; n >>= _1n$4, len += 1);
	return len;
}
/**
* Calculate mask for N bits. Not using ** operator with bigints because of old engines.
* Same as BigInt(`0b${Array(i).fill('1').join('')}`)
*/
var bitMask = (n) => (_1n$4 << BigInt(n)) - _1n$4;
function validateObject(object, fields = {}, optFields = {}) {
	if (!object || typeof object !== "object") throw new Error("expected valid options object");
	function checkField(fieldName, expectedType, isOpt) {
		const val = object[fieldName];
		if (isOpt && val === void 0) return;
		const current = typeof val;
		if (current !== expectedType || val === null) throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
	}
	const iter = (f, isOpt) => Object.entries(f).forEach(([k, v]) => checkField(k, v, isOpt));
	iter(fields, false);
	iter(optFields, true);
}
/**
* throws not implemented error
*/
var notImplemented = () => {
	throw new Error("not implemented");
};
/**
* Memoizes (caches) computation result.
* Uses WeakMap: the value is going auto-cleaned by GC after last reference is removed.
*/
function memoized(fn) {
	const map = /* @__PURE__ */ new WeakMap();
	return (arg, ...args) => {
		const val = map.get(arg);
		if (val !== void 0) return val;
		const computed = fn(arg, ...args);
		map.set(arg, computed);
		return computed;
	};
}
//#endregion
//#region node_modules/.pnpm/@noble+curves@2.0.1/node_modules/@noble/curves/abstract/modular.js
/**
* Utils for modular division and fields.
* Field over 11 is a finite (Galois) field is integer number operations `mod 11`.
* There is no division: it is replaced by modular multiplicative inverse.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$3 = /* @__PURE__ */ BigInt(0), _1n$3 = /* @__PURE__ */ BigInt(1), _2n$2 = /* @__PURE__ */ BigInt(2);
var _3n$1 = /* @__PURE__ */ BigInt(3), _4n = /* @__PURE__ */ BigInt(4), _5n$1 = /* @__PURE__ */ BigInt(5);
var _7n = /* @__PURE__ */ BigInt(7), _8n$2 = /* @__PURE__ */ BigInt(8), _9n = /* @__PURE__ */ BigInt(9);
var _16n = /* @__PURE__ */ BigInt(16);
function mod(a, b) {
	const result = a % b;
	return result >= _0n$3 ? result : b + result;
}
/** Does `x^(2^power)` mod p. `pow2(30, 4)` == `30^(2^4)` */
function pow2(x, power, modulo) {
	let res = x;
	while (power-- > _0n$3) {
		res *= res;
		res %= modulo;
	}
	return res;
}
/**
* Inverses number over modulo.
* Implemented using [Euclidean GCD](https://brilliant.org/wiki/extended-euclidean-algorithm/).
*/
function invert(number, modulo) {
	if (number === _0n$3) throw new Error("invert: expected non-zero number");
	if (modulo <= _0n$3) throw new Error("invert: expected positive modulus, got " + modulo);
	let a = mod(number, modulo);
	let b = modulo;
	let x = _0n$3, y = _1n$3, u = _1n$3, v = _0n$3;
	while (a !== _0n$3) {
		const q = b / a;
		const r = b % a;
		const m = x - u * q;
		const n = y - v * q;
		b = a, a = r, x = u, y = v, u = m, v = n;
	}
	if (b !== _1n$3) throw new Error("invert: does not exist");
	return mod(x, modulo);
}
function assertIsSquare(Fp, root, n) {
	if (!Fp.eql(Fp.sqr(root), n)) throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp, n) {
	const p1div4 = (Fp.ORDER + _1n$3) / _4n;
	const root = Fp.pow(n, p1div4);
	assertIsSquare(Fp, root, n);
	return root;
}
function sqrt5mod8(Fp, n) {
	const p5div8 = (Fp.ORDER - _5n$1) / _8n$2;
	const n2 = Fp.mul(n, _2n$2);
	const v = Fp.pow(n2, p5div8);
	const nv = Fp.mul(n, v);
	const i = Fp.mul(Fp.mul(nv, _2n$2), v);
	const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
	assertIsSquare(Fp, root, n);
	return root;
}
function sqrt9mod16(P) {
	const Fp_ = Field(P);
	const tn = tonelliShanks(P);
	const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
	const c2 = tn(Fp_, c1);
	const c3 = tn(Fp_, Fp_.neg(c1));
	const c4 = (P + _7n) / _16n;
	return (Fp, n) => {
		let tv1 = Fp.pow(n, c4);
		let tv2 = Fp.mul(tv1, c1);
		const tv3 = Fp.mul(tv1, c2);
		const tv4 = Fp.mul(tv1, c3);
		const e1 = Fp.eql(Fp.sqr(tv2), n);
		const e2 = Fp.eql(Fp.sqr(tv3), n);
		tv1 = Fp.cmov(tv1, tv2, e1);
		tv2 = Fp.cmov(tv4, tv3, e2);
		const e3 = Fp.eql(Fp.sqr(tv2), n);
		const root = Fp.cmov(tv1, tv2, e3);
		assertIsSquare(Fp, root, n);
		return root;
	};
}
/**
* Tonelli-Shanks square root search algorithm.
* 1. https://eprint.iacr.org/2012/685.pdf (page 12)
* 2. Square Roots from 1; 24, 51, 10 to Dan Shanks
* @param P field order
* @returns function that takes field Fp (created from P) and number n
*/
function tonelliShanks(P) {
	if (P < _3n$1) throw new Error("sqrt is not defined for small field");
	let Q = P - _1n$3;
	let S = 0;
	while (Q % _2n$2 === _0n$3) {
		Q /= _2n$2;
		S++;
	}
	let Z = _2n$2;
	const _Fp = Field(P);
	while (FpLegendre(_Fp, Z) === 1) if (Z++ > 1e3) throw new Error("Cannot find square root: probably non-prime P");
	if (S === 1) return sqrt3mod4;
	let cc = _Fp.pow(Z, Q);
	const Q1div2 = (Q + _1n$3) / _2n$2;
	return function tonelliSlow(Fp, n) {
		if (Fp.is0(n)) return n;
		if (FpLegendre(Fp, n) !== 1) throw new Error("Cannot find square root");
		let M = S;
		let c = Fp.mul(Fp.ONE, cc);
		let t = Fp.pow(n, Q);
		let R = Fp.pow(n, Q1div2);
		while (!Fp.eql(t, Fp.ONE)) {
			if (Fp.is0(t)) return Fp.ZERO;
			let i = 1;
			let t_tmp = Fp.sqr(t);
			while (!Fp.eql(t_tmp, Fp.ONE)) {
				i++;
				t_tmp = Fp.sqr(t_tmp);
				if (i === M) throw new Error("Cannot find square root");
			}
			const exponent = _1n$3 << BigInt(M - i - 1);
			const b = Fp.pow(c, exponent);
			M = i;
			c = Fp.sqr(b);
			t = Fp.mul(t, c);
			R = Fp.mul(R, b);
		}
		return R;
	};
}
/**
* Square root for a finite field. Will try optimized versions first:
*
* 1. P ≡ 3 (mod 4)
* 2. P ≡ 5 (mod 8)
* 3. P ≡ 9 (mod 16)
* 4. Tonelli-Shanks algorithm
*
* Different algorithms can give different roots, it is up to user to decide which one they want.
* For example there is FpSqrtOdd/FpSqrtEven to choice root based on oddness (used for hash-to-curve).
*/
function FpSqrt(P) {
	if (P % _4n === _3n$1) return sqrt3mod4;
	if (P % _8n$2 === _5n$1) return sqrt5mod8;
	if (P % _16n === _9n) return sqrt9mod16(P);
	return tonelliShanks(P);
}
var isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n$3) === _1n$3;
var FIELD_FIELDS = [
	"create",
	"isValid",
	"is0",
	"neg",
	"inv",
	"sqrt",
	"sqr",
	"eql",
	"add",
	"sub",
	"mul",
	"pow",
	"div",
	"addN",
	"subN",
	"mulN",
	"sqrN"
];
function validateField(field) {
	validateObject(field, FIELD_FIELDS.reduce((map, val) => {
		map[val] = "function";
		return map;
	}, {
		ORDER: "bigint",
		BYTES: "number",
		BITS: "number"
	}));
	return field;
}
/**
* Same as `pow` but for Fp: non-constant-time.
* Unsafe in some contexts: uses ladder, so can expose bigint bits.
*/
function FpPow(Fp, num, power) {
	if (power < _0n$3) throw new Error("invalid exponent, negatives unsupported");
	if (power === _0n$3) return Fp.ONE;
	if (power === _1n$3) return num;
	let p = Fp.ONE;
	let d = num;
	while (power > _0n$3) {
		if (power & _1n$3) p = Fp.mul(p, d);
		d = Fp.sqr(d);
		power >>= _1n$3;
	}
	return p;
}
/**
* Efficiently invert an array of Field elements.
* Exception-free. Will return `undefined` for 0 elements.
* @param passZero map 0 to 0 (instead of undefined)
*/
function FpInvertBatch(Fp, nums, passZero = false) {
	const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
	const multipliedAcc = nums.reduce((acc, num, i) => {
		if (Fp.is0(num)) return acc;
		inverted[i] = acc;
		return Fp.mul(acc, num);
	}, Fp.ONE);
	const invertedAcc = Fp.inv(multipliedAcc);
	nums.reduceRight((acc, num, i) => {
		if (Fp.is0(num)) return acc;
		inverted[i] = Fp.mul(acc, inverted[i]);
		return Fp.mul(acc, num);
	}, invertedAcc);
	return inverted;
}
/**
* Legendre symbol.
* Legendre constant is used to calculate Legendre symbol (a | p)
* which denotes the value of a^((p-1)/2) (mod p).
*
* * (a | p) ≡ 1    if a is a square (mod p), quadratic residue
* * (a | p) ≡ -1   if a is not a square (mod p), quadratic non residue
* * (a | p) ≡ 0    if a ≡ 0 (mod p)
*/
function FpLegendre(Fp, n) {
	const p1mod2 = (Fp.ORDER - _1n$3) / _2n$2;
	const powered = Fp.pow(n, p1mod2);
	const yes = Fp.eql(powered, Fp.ONE);
	const zero = Fp.eql(powered, Fp.ZERO);
	const no = Fp.eql(powered, Fp.neg(Fp.ONE));
	if (!yes && !zero && !no) throw new Error("invalid Legendre symbol result");
	return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
	if (nBitLength !== void 0) anumber(nBitLength);
	const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
	return {
		nBitLength: _nBitLength,
		nByteLength: Math.ceil(_nBitLength / 8)
	};
}
var _Field = class {
	ORDER;
	BITS;
	BYTES;
	isLE;
	ZERO = _0n$3;
	ONE = _1n$3;
	_lengths;
	_sqrt;
	_mod;
	constructor(ORDER, opts = {}) {
		if (ORDER <= _0n$3) throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
		let _nbitLength = void 0;
		this.isLE = false;
		if (opts != null && typeof opts === "object") {
			if (typeof opts.BITS === "number") _nbitLength = opts.BITS;
			if (typeof opts.sqrt === "function") this.sqrt = opts.sqrt;
			if (typeof opts.isLE === "boolean") this.isLE = opts.isLE;
			if (opts.allowedLengths) this._lengths = opts.allowedLengths?.slice();
			if (typeof opts.modFromBytes === "boolean") this._mod = opts.modFromBytes;
		}
		const { nBitLength, nByteLength } = nLength(ORDER, _nbitLength);
		if (nByteLength > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
		this.ORDER = ORDER;
		this.BITS = nBitLength;
		this.BYTES = nByteLength;
		this._sqrt = void 0;
		Object.preventExtensions(this);
	}
	create(num) {
		return mod(num, this.ORDER);
	}
	isValid(num) {
		if (typeof num !== "bigint") throw new Error("invalid field element: expected bigint, got " + typeof num);
		return _0n$3 <= num && num < this.ORDER;
	}
	is0(num) {
		return num === _0n$3;
	}
	isValidNot0(num) {
		return !this.is0(num) && this.isValid(num);
	}
	isOdd(num) {
		return (num & _1n$3) === _1n$3;
	}
	neg(num) {
		return mod(-num, this.ORDER);
	}
	eql(lhs, rhs) {
		return lhs === rhs;
	}
	sqr(num) {
		return mod(num * num, this.ORDER);
	}
	add(lhs, rhs) {
		return mod(lhs + rhs, this.ORDER);
	}
	sub(lhs, rhs) {
		return mod(lhs - rhs, this.ORDER);
	}
	mul(lhs, rhs) {
		return mod(lhs * rhs, this.ORDER);
	}
	pow(num, power) {
		return FpPow(this, num, power);
	}
	div(lhs, rhs) {
		return mod(lhs * invert(rhs, this.ORDER), this.ORDER);
	}
	sqrN(num) {
		return num * num;
	}
	addN(lhs, rhs) {
		return lhs + rhs;
	}
	subN(lhs, rhs) {
		return lhs - rhs;
	}
	mulN(lhs, rhs) {
		return lhs * rhs;
	}
	inv(num) {
		return invert(num, this.ORDER);
	}
	sqrt(num) {
		if (!this._sqrt) this._sqrt = FpSqrt(this.ORDER);
		return this._sqrt(this, num);
	}
	toBytes(num) {
		return this.isLE ? numberToBytesLE(num, this.BYTES) : numberToBytesBE(num, this.BYTES);
	}
	fromBytes(bytes, skipValidation = false) {
		abytes(bytes);
		const { _lengths: allowedLengths, BYTES, isLE, ORDER, _mod: modFromBytes } = this;
		if (allowedLengths) {
			if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
			const padded = new Uint8Array(BYTES);
			padded.set(bytes, isLE ? 0 : padded.length - bytes.length);
			bytes = padded;
		}
		if (bytes.length !== BYTES) throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
		let scalar = isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
		if (modFromBytes) scalar = mod(scalar, ORDER);
		if (!skipValidation) {
			if (!this.isValid(scalar)) throw new Error("invalid field element: outside of range 0..ORDER");
		}
		return scalar;
	}
	invertBatch(lst) {
		return FpInvertBatch(this, lst);
	}
	cmov(a, b, condition) {
		return condition ? b : a;
	}
};
/**
* Creates a finite field. Major performance optimizations:
* * 1. Denormalized operations like mulN instead of mul.
* * 2. Identical object shape: never add or remove keys.
* * 3. `Object.freeze`.
* Fragile: always run a benchmark on a change.
* Security note: operations don't check 'isValid' for all elements for performance reasons,
* it is caller responsibility to check this.
* This is low-level code, please make sure you know what you're doing.
*
* Note about field properties:
* * CHARACTERISTIC p = prime number, number of elements in main subgroup.
* * ORDER q = similar to cofactor in curves, may be composite `q = p^m`.
*
* @param ORDER field order, probably prime, or could be composite
* @param bitLen how many bits the field consumes
* @param isLE (default: false) if encoding / decoding should be in little-endian
* @param redef optional faster redefinitions of sqrt and other methods
*/
function Field(ORDER, opts = {}) {
	return new _Field(ORDER, opts);
}
function FpSqrtEven(Fp, elm) {
	if (!Fp.isOdd) throw new Error("Field doesn't have isOdd");
	const root = Fp.sqrt(elm);
	return Fp.isOdd(root) ? Fp.neg(root) : root;
}
/**
* Returns total number of bytes consumed by the field element.
* For example, 32 bytes for usual 256-bit weierstrass curve.
* @param fieldOrder number of field elements, usually CURVE.n
* @returns byte length of field
*/
function getFieldBytesLength(fieldOrder) {
	if (typeof fieldOrder !== "bigint") throw new Error("field order must be bigint");
	const bitLength = fieldOrder.toString(2).length;
	return Math.ceil(bitLength / 8);
}
/**
* Returns minimal amount of bytes that can be safely reduced
* by field order.
* Should be 2^-128 for 128-bit curve such as P256.
* @param fieldOrder number of field elements, usually CURVE.n
* @returns byte length of target hash
*/
function getMinHashLength(fieldOrder) {
	const length = getFieldBytesLength(fieldOrder);
	return length + Math.ceil(length / 2);
}
/**
* "Constant-time" private key generation utility.
* Can take (n + n/2) or more bytes of uniform input e.g. from CSPRNG or KDF
* and convert them into private scalar, with the modulo bias being negligible.
* Needs at least 48 bytes of input for 32-byte private key.
* https://research.kudelskisecurity.com/2020/07/28/the-definitive-guide-to-modulo-bias-and-how-to-avoid-it/
* FIPS 186-5, A.2 https://csrc.nist.gov/publications/detail/fips/186/5/final
* RFC 9380, https://www.rfc-editor.org/rfc/rfc9380#section-5
* @param hash hash output from SHA3 or a similar function
* @param groupOrder size of subgroup - (e.g. secp256k1.Point.Fn.ORDER)
* @param isLE interpret hash bytes as LE num
* @returns valid private scalar
*/
function mapHashToField(key, fieldOrder, isLE = false) {
	abytes(key);
	const len = key.length;
	const fieldLen = getFieldBytesLength(fieldOrder);
	const minLen = getMinHashLength(fieldOrder);
	if (len < 16 || len < minLen || len > 1024) throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
	const reduced = mod(isLE ? bytesToNumberLE(key) : bytesToNumberBE(key), fieldOrder - _1n$3) + _1n$3;
	return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
//#endregion
//#region node_modules/.pnpm/@noble+curves@2.0.1/node_modules/@noble/curves/abstract/curve.js
/**
* Methods for elliptic curve multiplication by scalars.
* Contains wNAF, pippenger.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$2 = /* @__PURE__ */ BigInt(0);
var _1n$2 = /* @__PURE__ */ BigInt(1);
function negateCt(condition, item) {
	const neg = item.negate();
	return condition ? neg : item;
}
/**
* Takes a bunch of Projective Points but executes only one
* inversion on all of them. Inversion is very slow operation,
* so this improves performance massively.
* Optimization: converts a list of projective points to a list of identical points with Z=1.
*/
function normalizeZ(c, points) {
	const invertedZs = FpInvertBatch(c.Fp, points.map((p) => p.Z));
	return points.map((p, i) => c.fromAffine(p.toAffine(invertedZs[i])));
}
function validateW(W, bits) {
	if (!Number.isSafeInteger(W) || W <= 0 || W > bits) throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
	validateW(W, scalarBits);
	const windows = Math.ceil(scalarBits / W) + 1;
	const windowSize = 2 ** (W - 1);
	const maxNumber = 2 ** W;
	return {
		windows,
		windowSize,
		mask: bitMask(W),
		maxNumber,
		shiftBy: BigInt(W)
	};
}
function calcOffsets(n, window, wOpts) {
	const { windowSize, mask, maxNumber, shiftBy } = wOpts;
	let wbits = Number(n & mask);
	let nextN = n >> shiftBy;
	if (wbits > windowSize) {
		wbits -= maxNumber;
		nextN += _1n$2;
	}
	const offsetStart = window * windowSize;
	const offset = offsetStart + Math.abs(wbits) - 1;
	const isZero = wbits === 0;
	const isNeg = wbits < 0;
	const isNegF = window % 2 !== 0;
	return {
		nextN,
		offset,
		isZero,
		isNeg,
		isNegF,
		offsetF: offsetStart
	};
}
function validateMSMPoints(points, c) {
	if (!Array.isArray(points)) throw new Error("array expected");
	points.forEach((p, i) => {
		if (!(p instanceof c)) throw new Error("invalid point at index " + i);
	});
}
function validateMSMScalars(scalars, field) {
	if (!Array.isArray(scalars)) throw new Error("array of scalars expected");
	scalars.forEach((s, i) => {
		if (!field.isValid(s)) throw new Error("invalid scalar at index " + i);
	});
}
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
	return pointWindowSizes.get(P) || 1;
}
function assert0(n) {
	if (n !== _0n$2) throw new Error("invalid wNAF");
}
/**
* Elliptic curve multiplication of Point by scalar. Fragile.
* Table generation takes **30MB of ram and 10ms on high-end CPU**,
* but may take much longer on slow devices. Actual generation will happen on
* first call of `multiply()`. By default, `BASE` point is precomputed.
*
* Scalars should always be less than curve order: this should be checked inside of a curve itself.
* Creates precomputation tables for fast multiplication:
* - private scalar is split by fixed size windows of W bits
* - every window point is collected from window's table & added to accumulator
* - since windows are different, same point inside tables won't be accessed more than once per calc
* - each multiplication is 'Math.ceil(CURVE_ORDER / 𝑊) + 1' point additions (fixed for any scalar)
* - +1 window is neccessary for wNAF
* - wNAF reduces table size: 2x less memory + 2x faster generation, but 10% slower multiplication
*
* @todo Research returning 2d JS array of windows, instead of a single window.
* This would allow windows to be in different memory locations
*/
var wNAF = class {
	BASE;
	ZERO;
	Fn;
	bits;
	constructor(Point, bits) {
		this.BASE = Point.BASE;
		this.ZERO = Point.ZERO;
		this.Fn = Point.Fn;
		this.bits = bits;
	}
	_unsafeLadder(elm, n, p = this.ZERO) {
		let d = elm;
		while (n > _0n$2) {
			if (n & _1n$2) p = p.add(d);
			d = d.double();
			n >>= _1n$2;
		}
		return p;
	}
	/**
	* Creates a wNAF precomputation window. Used for caching.
	* Default window size is set by `utils.precompute()` and is equal to 8.
	* Number of precomputed points depends on the curve size:
	* 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
	* - 𝑊 is the window size
	* - 𝑛 is the bitlength of the curve order.
	* For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
	* @param point Point instance
	* @param W window size
	* @returns precomputed point tables flattened to a single array
	*/
	precomputeWindow(point, W) {
		const { windows, windowSize } = calcWOpts(W, this.bits);
		const points = [];
		let p = point;
		let base = p;
		for (let window = 0; window < windows; window++) {
			base = p;
			points.push(base);
			for (let i = 1; i < windowSize; i++) {
				base = base.add(p);
				points.push(base);
			}
			p = base.double();
		}
		return points;
	}
	/**
	* Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
	* More compact implementation:
	* https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
	* @returns real and fake (for const-time) points
	*/
	wNAF(W, precomputes, n) {
		if (!this.Fn.isValid(n)) throw new Error("invalid scalar");
		let p = this.ZERO;
		let f = this.BASE;
		const wo = calcWOpts(W, this.bits);
		for (let window = 0; window < wo.windows; window++) {
			const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window, wo);
			n = nextN;
			if (isZero) f = f.add(negateCt(isNegF, precomputes[offsetF]));
			else p = p.add(negateCt(isNeg, precomputes[offset]));
		}
		assert0(n);
		return {
			p,
			f
		};
	}
	/**
	* Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
	* @param acc accumulator point to add result of multiplication
	* @returns point
	*/
	wNAFUnsafe(W, precomputes, n, acc = this.ZERO) {
		const wo = calcWOpts(W, this.bits);
		for (let window = 0; window < wo.windows; window++) {
			if (n === _0n$2) break;
			const { nextN, offset, isZero, isNeg } = calcOffsets(n, window, wo);
			n = nextN;
			if (isZero) continue;
			else {
				const item = precomputes[offset];
				acc = acc.add(isNeg ? item.negate() : item);
			}
		}
		assert0(n);
		return acc;
	}
	getPrecomputes(W, point, transform) {
		let comp = pointPrecomputes.get(point);
		if (!comp) {
			comp = this.precomputeWindow(point, W);
			if (W !== 1) {
				if (typeof transform === "function") comp = transform(comp);
				pointPrecomputes.set(point, comp);
			}
		}
		return comp;
	}
	cached(point, scalar, transform) {
		const W = getW(point);
		return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
	}
	unsafe(point, scalar, transform, prev) {
		const W = getW(point);
		if (W === 1) return this._unsafeLadder(point, scalar, prev);
		return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
	}
	createCache(P, W) {
		validateW(W, this.bits);
		pointWindowSizes.set(P, W);
		pointPrecomputes.delete(P);
	}
	hasCache(elm) {
		return getW(elm) !== 1;
	}
};
/**
* Pippenger algorithm for multi-scalar multiplication (MSM, Pa + Qb + Rc + ...).
* 30x faster vs naive addition on L=4096, 10x faster than precomputes.
* For N=254bit, L=1, it does: 1024 ADD + 254 DBL. For L=5: 1536 ADD + 254 DBL.
* Algorithmically constant-time (for same L), even when 1 point + scalar, or when scalar = 0.
* @param c Curve Point constructor
* @param fieldN field over CURVE.N - important that it's not over CURVE.P
* @param points array of L curve points
* @param scalars array of L scalars (aka secret keys / bigints)
*/
function pippenger(c, points, scalars) {
	const fieldN = c.Fn;
	validateMSMPoints(points, c);
	validateMSMScalars(scalars, fieldN);
	const plength = points.length;
	const slength = scalars.length;
	if (plength !== slength) throw new Error("arrays of points and scalars must have equal length");
	const zero = c.ZERO;
	const wbits = bitLen(BigInt(plength));
	let windowSize = 1;
	if (wbits > 12) windowSize = wbits - 3;
	else if (wbits > 4) windowSize = wbits - 2;
	else if (wbits > 0) windowSize = 2;
	const MASK = bitMask(windowSize);
	const buckets = new Array(Number(MASK) + 1).fill(zero);
	const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
	let sum = zero;
	for (let i = lastBits; i >= 0; i -= windowSize) {
		buckets.fill(zero);
		for (let j = 0; j < slength; j++) {
			const scalar = scalars[j];
			const wbits = Number(scalar >> BigInt(i) & MASK);
			buckets[wbits] = buckets[wbits].add(points[j]);
		}
		let resI = zero;
		for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
			sumI = sumI.add(buckets[j]);
			resI = resI.add(sumI);
		}
		sum = sum.add(resI);
		if (i !== 0) for (let j = 0; j < windowSize; j++) sum = sum.double();
	}
	return sum;
}
function createField(order, field, isLE) {
	if (field) {
		if (field.ORDER !== order) throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
		validateField(field);
		return field;
	} else return Field(order, { isLE });
}
/** Validates CURVE opts and creates fields */
function createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
	if (FpFnLE === void 0) FpFnLE = type === "edwards";
	if (!CURVE || typeof CURVE !== "object") throw new Error(`expected valid ${type} CURVE object`);
	for (const p of [
		"p",
		"n",
		"h"
	]) {
		const val = CURVE[p];
		if (!(typeof val === "bigint" && val > _0n$2)) throw new Error(`CURVE.${p} must be positive bigint`);
	}
	const Fp = createField(CURVE.p, curveOpts.Fp, FpFnLE);
	const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
	const params = [
		"Gx",
		"Gy",
		"a",
		type === "weierstrass" ? "b" : "d"
	];
	for (const p of params) if (!Fp.isValid(CURVE[p])) throw new Error(`CURVE.${p} must be valid field element of CURVE.Fp`);
	CURVE = Object.freeze(Object.assign({}, CURVE));
	return {
		CURVE,
		Fp,
		Fn
	};
}
function createKeygen(randomSecretKey, getPublicKey) {
	return function keygen(seed) {
		const secretKey = randomSecretKey(seed);
		return {
			secretKey,
			publicKey: getPublicKey(secretKey)
		};
	};
}
//#endregion
//#region node_modules/.pnpm/@noble+curves@2.0.1/node_modules/@noble/curves/abstract/edwards.js
/**
* Twisted Edwards curve. The formula is: ax² + y² = 1 + dx²y².
* For design rationale of types / exports, see weierstrass module documentation.
* Untwisted Edwards curves exist, but they aren't used in real-world protocols.
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n$1 = BigInt(0), _1n$1 = BigInt(1), _2n$1 = BigInt(2), _8n$1 = BigInt(8);
function isEdValidXY(Fp, CURVE, x, y) {
	const x2 = Fp.sqr(x);
	const y2 = Fp.sqr(y);
	const left = Fp.add(Fp.mul(CURVE.a, x2), y2);
	const right = Fp.add(Fp.ONE, Fp.mul(CURVE.d, Fp.mul(x2, y2)));
	return Fp.eql(left, right);
}
function edwards(params, extraOpts = {}) {
	const validated = createCurveFields("edwards", params, extraOpts, extraOpts.FpFnLE);
	const { Fp, Fn } = validated;
	let CURVE = validated.CURVE;
	const { h: cofactor } = CURVE;
	validateObject(extraOpts, {}, { uvRatio: "function" });
	const MASK = _2n$1 << BigInt(Fn.BYTES * 8) - _1n$1;
	const modP = (n) => Fp.create(n);
	const uvRatio = extraOpts.uvRatio || ((u, v) => {
		try {
			return {
				isValid: true,
				value: Fp.sqrt(Fp.div(u, v))
			};
		} catch (e) {
			return {
				isValid: false,
				value: _0n$1
			};
		}
	});
	if (!isEdValidXY(Fp, CURVE, CURVE.Gx, CURVE.Gy)) throw new Error("bad curve params: generator point");
	/**
	* Asserts coordinate is valid: 0 <= n < MASK.
	* Coordinates >= Fp.ORDER are allowed for zip215.
	*/
	function acoord(title, n, banZero = false) {
		const min = banZero ? _1n$1 : _0n$1;
		aInRange("coordinate " + title, n, min, MASK);
		return n;
	}
	function aedpoint(other) {
		if (!(other instanceof Point)) throw new Error("EdwardsPoint expected");
	}
	const toAffineMemo = memoized((p, iz) => {
		const { X, Y, Z } = p;
		const is0 = p.is0();
		if (iz == null) iz = is0 ? _8n$1 : Fp.inv(Z);
		const x = modP(X * iz);
		const y = modP(Y * iz);
		const zz = Fp.mul(Z, iz);
		if (is0) return {
			x: _0n$1,
			y: _1n$1
		};
		if (zz !== _1n$1) throw new Error("invZ was invalid");
		return {
			x,
			y
		};
	});
	const assertValidMemo = memoized((p) => {
		const { a, d } = CURVE;
		if (p.is0()) throw new Error("bad point: ZERO");
		const { X, Y, Z, T } = p;
		const X2 = modP(X * X);
		const Y2 = modP(Y * Y);
		const Z2 = modP(Z * Z);
		const Z4 = modP(Z2 * Z2);
		if (modP(Z2 * modP(modP(X2 * a) + Y2)) !== modP(Z4 + modP(d * modP(X2 * Y2)))) throw new Error("bad point: equation left != right (1)");
		if (modP(X * Y) !== modP(Z * T)) throw new Error("bad point: equation left != right (2)");
		return true;
	});
	class Point {
		static BASE = new Point(CURVE.Gx, CURVE.Gy, _1n$1, modP(CURVE.Gx * CURVE.Gy));
		static ZERO = new Point(_0n$1, _1n$1, _1n$1, _0n$1);
		static Fp = Fp;
		static Fn = Fn;
		X;
		Y;
		Z;
		T;
		constructor(X, Y, Z, T) {
			this.X = acoord("x", X);
			this.Y = acoord("y", Y);
			this.Z = acoord("z", Z, true);
			this.T = acoord("t", T);
			Object.freeze(this);
		}
		static CURVE() {
			return CURVE;
		}
		static fromAffine(p) {
			if (p instanceof Point) throw new Error("extended point not allowed");
			const { x, y } = p || {};
			acoord("x", x);
			acoord("y", y);
			return new Point(x, y, _1n$1, modP(x * y));
		}
		static fromBytes(bytes, zip215 = false) {
			const len = Fp.BYTES;
			const { a, d } = CURVE;
			bytes = copyBytes(abytes(bytes, len, "point"));
			abool(zip215, "zip215");
			const normed = copyBytes(bytes);
			const lastByte = bytes[len - 1];
			normed[len - 1] = lastByte & -129;
			const y = bytesToNumberLE(normed);
			aInRange("point.y", y, _0n$1, zip215 ? MASK : Fp.ORDER);
			const y2 = modP(y * y);
			let { isValid, value: x } = uvRatio(modP(y2 - _1n$1), modP(d * y2 - a));
			if (!isValid) throw new Error("bad point: invalid y coordinate");
			const isXOdd = (x & _1n$1) === _1n$1;
			const isLastByteOdd = (lastByte & 128) !== 0;
			if (!zip215 && x === _0n$1 && isLastByteOdd) throw new Error("bad point: x=0 and x_0=1");
			if (isLastByteOdd !== isXOdd) x = modP(-x);
			return Point.fromAffine({
				x,
				y
			});
		}
		static fromHex(hex, zip215 = false) {
			return Point.fromBytes(hexToBytes(hex), zip215);
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(windowSize = 8, isLazy = true) {
			wnaf.createCache(this, windowSize);
			if (!isLazy) this.multiply(_2n$1);
			return this;
		}
		assertValidity() {
			assertValidMemo(this);
		}
		equals(other) {
			aedpoint(other);
			const { X: X1, Y: Y1, Z: Z1 } = this;
			const { X: X2, Y: Y2, Z: Z2 } = other;
			const X1Z2 = modP(X1 * Z2);
			const X2Z1 = modP(X2 * Z1);
			const Y1Z2 = modP(Y1 * Z2);
			const Y2Z1 = modP(Y2 * Z1);
			return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
		}
		is0() {
			return this.equals(Point.ZERO);
		}
		negate() {
			return new Point(modP(-this.X), this.Y, this.Z, modP(-this.T));
		}
		double() {
			const { a } = CURVE;
			const { X: X1, Y: Y1, Z: Z1 } = this;
			const A = modP(X1 * X1);
			const B = modP(Y1 * Y1);
			const C = modP(_2n$1 * modP(Z1 * Z1));
			const D = modP(a * A);
			const x1y1 = X1 + Y1;
			const E = modP(modP(x1y1 * x1y1) - A - B);
			const G = D + B;
			const F = G - C;
			const H = D - B;
			const X3 = modP(E * F);
			const Y3 = modP(G * H);
			const T3 = modP(E * H);
			return new Point(X3, Y3, modP(F * G), T3);
		}
		add(other) {
			aedpoint(other);
			const { a, d } = CURVE;
			const { X: X1, Y: Y1, Z: Z1, T: T1 } = this;
			const { X: X2, Y: Y2, Z: Z2, T: T2 } = other;
			const A = modP(X1 * X2);
			const B = modP(Y1 * Y2);
			const C = modP(T1 * d * T2);
			const D = modP(Z1 * Z2);
			const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
			const F = D - C;
			const G = D + C;
			const H = modP(B - a * A);
			const X3 = modP(E * F);
			const Y3 = modP(G * H);
			const T3 = modP(E * H);
			return new Point(X3, Y3, modP(F * G), T3);
		}
		subtract(other) {
			return this.add(other.negate());
		}
		multiply(scalar) {
			if (!Fn.isValidNot0(scalar)) throw new Error("invalid scalar: expected 1 <= sc < curve.n");
			const { p, f } = wnaf.cached(this, scalar, (p) => normalizeZ(Point, p));
			return normalizeZ(Point, [p, f])[0];
		}
		multiplyUnsafe(scalar, acc = Point.ZERO) {
			if (!Fn.isValid(scalar)) throw new Error("invalid scalar: expected 0 <= sc < curve.n");
			if (scalar === _0n$1) return Point.ZERO;
			if (this.is0() || scalar === _1n$1) return this;
			return wnaf.unsafe(this, scalar, (p) => normalizeZ(Point, p), acc);
		}
		isSmallOrder() {
			return this.multiplyUnsafe(cofactor).is0();
		}
		isTorsionFree() {
			return wnaf.unsafe(this, CURVE.n).is0();
		}
		toAffine(invertedZ) {
			return toAffineMemo(this, invertedZ);
		}
		clearCofactor() {
			if (cofactor === _1n$1) return this;
			return this.multiplyUnsafe(cofactor);
		}
		toBytes() {
			const { x, y } = this.toAffine();
			const bytes = Fp.toBytes(y);
			bytes[bytes.length - 1] |= x & _1n$1 ? 128 : 0;
			return bytes;
		}
		toHex() {
			return bytesToHex(this.toBytes());
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
	}
	const wnaf = new wNAF(Point, Fn.BITS);
	Point.BASE.precompute(8);
	return Point;
}
/**
* Base class for prime-order points like Ristretto255 and Decaf448.
* These points eliminate cofactor issues by representing equivalence classes
* of Edwards curve points.
*/
var PrimeEdwardsPoint = class {
	static BASE;
	static ZERO;
	static Fp;
	static Fn;
	ep;
	constructor(ep) {
		this.ep = ep;
	}
	static fromBytes(_bytes) {
		notImplemented();
	}
	static fromHex(_hex) {
		notImplemented();
	}
	get x() {
		return this.toAffine().x;
	}
	get y() {
		return this.toAffine().y;
	}
	clearCofactor() {
		return this;
	}
	assertValidity() {
		this.ep.assertValidity();
	}
	toAffine(invertedZ) {
		return this.ep.toAffine(invertedZ);
	}
	toHex() {
		return bytesToHex(this.toBytes());
	}
	toString() {
		return this.toHex();
	}
	isTorsionFree() {
		return true;
	}
	isSmallOrder() {
		return false;
	}
	add(other) {
		this.assertSame(other);
		return this.init(this.ep.add(other.ep));
	}
	subtract(other) {
		this.assertSame(other);
		return this.init(this.ep.subtract(other.ep));
	}
	multiply(scalar) {
		return this.init(this.ep.multiply(scalar));
	}
	multiplyUnsafe(scalar) {
		return this.init(this.ep.multiplyUnsafe(scalar));
	}
	double() {
		return this.init(this.ep.double());
	}
	negate() {
		return this.init(this.ep.negate());
	}
	precompute(windowSize, isLazy) {
		return this.init(this.ep.precompute(windowSize, isLazy));
	}
};
/**
* Initializes EdDSA signatures over given Edwards curve.
*/
function eddsa(Point, cHash, eddsaOpts = {}) {
	if (typeof cHash !== "function") throw new Error("\"hash\" function param is required");
	validateObject(eddsaOpts, {}, {
		adjustScalarBytes: "function",
		randomBytes: "function",
		domain: "function",
		prehash: "function",
		mapToCurve: "function"
	});
	const { prehash } = eddsaOpts;
	const { BASE, Fp, Fn } = Point;
	const randomBytes$1 = eddsaOpts.randomBytes || randomBytes;
	const adjustScalarBytes = eddsaOpts.adjustScalarBytes || ((bytes) => bytes);
	const domain = eddsaOpts.domain || ((data, ctx, phflag) => {
		abool(phflag, "phflag");
		if (ctx.length || phflag) throw new Error("Contexts/pre-hash are not supported");
		return data;
	});
	function modN_LE(hash) {
		return Fn.create(bytesToNumberLE(hash));
	}
	function getPrivateScalar(key) {
		const len = lengths.secretKey;
		abytes(key, lengths.secretKey, "secretKey");
		const hashed = abytes(cHash(key), 2 * len, "hashedSecretKey");
		const head = adjustScalarBytes(hashed.slice(0, len));
		return {
			head,
			prefix: hashed.slice(len, 2 * len),
			scalar: modN_LE(head)
		};
	}
	/** Convenience method that creates public key from scalar. RFC8032 5.1.5 */
	function getExtendedPublicKey(secretKey) {
		const { head, prefix, scalar } = getPrivateScalar(secretKey);
		const point = BASE.multiply(scalar);
		return {
			head,
			prefix,
			scalar,
			point,
			pointBytes: point.toBytes()
		};
	}
	/** Calculates EdDSA pub key. RFC8032 5.1.5. */
	function getPublicKey(secretKey) {
		return getExtendedPublicKey(secretKey).pointBytes;
	}
	function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
		return modN_LE(cHash(domain(concatBytes(...msgs), abytes(context, void 0, "context"), !!prehash)));
	}
	/** Signs message with secret key. RFC8032 5.1.6 */
	function sign(msg, secretKey, options = {}) {
		msg = abytes(msg, void 0, "message");
		if (prehash) msg = prehash(msg);
		const { prefix, scalar, pointBytes } = getExtendedPublicKey(secretKey);
		const r = hashDomainToScalar(options.context, prefix, msg);
		const R = BASE.multiply(r).toBytes();
		const k = hashDomainToScalar(options.context, R, pointBytes, msg);
		const s = Fn.create(r + k * scalar);
		if (!Fn.isValid(s)) throw new Error("sign failed: invalid s");
		return abytes(concatBytes(R, Fn.toBytes(s)), lengths.signature, "result");
	}
	const verifyOpts = { zip215: true };
	/**
	* Verifies EdDSA signature against message and public key. RFC8032 5.1.7.
	* An extended group equation is checked.
	*/
	function verify(sig, msg, publicKey, options = verifyOpts) {
		const { context, zip215 } = options;
		const len = lengths.signature;
		sig = abytes(sig, len, "signature");
		msg = abytes(msg, void 0, "message");
		publicKey = abytes(publicKey, lengths.publicKey, "publicKey");
		if (zip215 !== void 0) abool(zip215, "zip215");
		if (prehash) msg = prehash(msg);
		const mid = len / 2;
		const r = sig.subarray(0, mid);
		const s = bytesToNumberLE(sig.subarray(mid, len));
		let A, R, SB;
		try {
			A = Point.fromBytes(publicKey, zip215);
			R = Point.fromBytes(r, zip215);
			SB = BASE.multiplyUnsafe(s);
		} catch (error) {
			return false;
		}
		if (!zip215 && A.isSmallOrder()) return false;
		const k = hashDomainToScalar(context, R.toBytes(), A.toBytes(), msg);
		return R.add(A.multiplyUnsafe(k)).subtract(SB).clearCofactor().is0();
	}
	const _size = Fp.BYTES;
	const lengths = {
		secretKey: _size,
		publicKey: _size,
		signature: 2 * _size,
		seed: _size
	};
	function randomSecretKey(seed = randomBytes$1(lengths.seed)) {
		return abytes(seed, lengths.seed, "seed");
	}
	function isValidSecretKey(key) {
		return isBytes(key) && key.length === Fn.BYTES;
	}
	function isValidPublicKey(key, zip215) {
		try {
			return !!Point.fromBytes(key, zip215);
		} catch (error) {
			return false;
		}
	}
	const utils = {
		getExtendedPublicKey,
		randomSecretKey,
		isValidSecretKey,
		isValidPublicKey,
		toMontgomery(publicKey) {
			const { y } = Point.fromBytes(publicKey);
			const size = lengths.publicKey;
			const is25519 = size === 32;
			if (!is25519 && size !== 57) throw new Error("only defined for 25519 and 448");
			const u = is25519 ? Fp.div(_1n$1 + y, _1n$1 - y) : Fp.div(y - _1n$1, y + _1n$1);
			return Fp.toBytes(u);
		},
		toMontgomerySecret(secretKey) {
			const size = lengths.secretKey;
			abytes(secretKey, size);
			return adjustScalarBytes(cHash(secretKey.subarray(0, size))).subarray(0, size);
		}
	};
	return Object.freeze({
		keygen: createKeygen(randomSecretKey, getPublicKey),
		getPublicKey,
		sign,
		verify,
		utils,
		Point,
		lengths
	});
}
//#endregion
//#region node_modules/.pnpm/@noble+curves@2.0.1/node_modules/@noble/curves/abstract/hash-to-curve.js
var os2ip = bytesToNumberBE;
function i2osp(value, length) {
	asafenumber(value);
	asafenumber(length);
	if (value < 0 || value >= 1 << 8 * length) throw new Error("invalid I2OSP input: " + value);
	const res = Array.from({ length }).fill(0);
	for (let i = length - 1; i >= 0; i--) {
		res[i] = value & 255;
		value >>>= 8;
	}
	return new Uint8Array(res);
}
function strxor(a, b) {
	const arr = new Uint8Array(a.length);
	for (let i = 0; i < a.length; i++) arr[i] = a[i] ^ b[i];
	return arr;
}
function normDST(DST) {
	if (!isBytes(DST) && typeof DST !== "string") throw new Error("DST must be Uint8Array or ascii string");
	return typeof DST === "string" ? asciiToBytes(DST) : DST;
}
/**
* Produces a uniformly random byte string using a cryptographic hash function H that outputs b bits.
* [RFC 9380 5.3.1](https://www.rfc-editor.org/rfc/rfc9380#section-5.3.1).
*/
function expand_message_xmd(msg, DST, lenInBytes, H) {
	abytes(msg);
	asafenumber(lenInBytes);
	DST = normDST(DST);
	if (DST.length > 255) DST = H(concatBytes(asciiToBytes("H2C-OVERSIZE-DST-"), DST));
	const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
	const ell = Math.ceil(lenInBytes / b_in_bytes);
	if (lenInBytes > 65535 || ell > 255) throw new Error("expand_message_xmd: invalid lenInBytes");
	const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
	const Z_pad = i2osp(0, r_in_bytes);
	const l_i_b_str = i2osp(lenInBytes, 2);
	const b = new Array(ell);
	const b_0 = H(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
	b[0] = H(concatBytes(b_0, i2osp(1, 1), DST_prime));
	for (let i = 1; i <= ell; i++) b[i] = H(concatBytes(...[
		strxor(b_0, b[i - 1]),
		i2osp(i + 1, 1),
		DST_prime
	]));
	return concatBytes(...b).slice(0, lenInBytes);
}
/**
* Produces a uniformly random byte string using an extendable-output function (XOF) H.
* 1. The collision resistance of H MUST be at least k bits.
* 2. H MUST be an XOF that has been proved indifferentiable from
*    a random oracle under a reasonable cryptographic assumption.
* [RFC 9380 5.3.2](https://www.rfc-editor.org/rfc/rfc9380#section-5.3.2).
*/
function expand_message_xof(msg, DST, lenInBytes, k, H) {
	abytes(msg);
	asafenumber(lenInBytes);
	DST = normDST(DST);
	if (DST.length > 255) {
		const dkLen = Math.ceil(2 * k / 8);
		DST = H.create({ dkLen }).update(asciiToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
	}
	if (lenInBytes > 65535 || DST.length > 255) throw new Error("expand_message_xof: invalid lenInBytes");
	return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
/**
* Hashes arbitrary-length byte strings to a list of one or more elements of a finite field F.
* [RFC 9380 5.2](https://www.rfc-editor.org/rfc/rfc9380#section-5.2).
* @param msg a byte string containing the message to hash
* @param count the number of elements of F to output
* @param options `{DST: string, p: bigint, m: number, k: number, expand: 'xmd' | 'xof', hash: H}`, see above
* @returns [u_0, ..., u_(count - 1)], a list of field elements.
*/
function hash_to_field(msg, count, options) {
	validateObject(options, {
		p: "bigint",
		m: "number",
		k: "number",
		hash: "function"
	});
	const { p, k, m, hash, expand, DST } = options;
	asafenumber(hash.outputLen, "valid hash");
	abytes(msg);
	asafenumber(count);
	const log2p = p.toString(2).length;
	const L = Math.ceil((log2p + k) / 8);
	const len_in_bytes = count * m * L;
	let prb;
	if (expand === "xmd") prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
	else if (expand === "xof") prb = expand_message_xof(msg, DST, len_in_bytes, k, hash);
	else if (expand === "_internal_pass") prb = msg;
	else throw new Error("expand must be \"xmd\" or \"xof\"");
	const u = new Array(count);
	for (let i = 0; i < count; i++) {
		const e = new Array(m);
		for (let j = 0; j < m; j++) {
			const elm_offset = L * (j + i * m);
			e[j] = mod(os2ip(prb.subarray(elm_offset, elm_offset + L)), p);
		}
		u[i] = e;
	}
	return u;
}
var _DST_scalar = asciiToBytes("HashToScalar-");
/** Creates hash-to-curve methods from EC Point and mapToCurve function. See {@link H2CHasher}. */
function createHasher(Point, mapToCurve, defaults) {
	if (typeof mapToCurve !== "function") throw new Error("mapToCurve() must be defined");
	function map(num) {
		return Point.fromAffine(mapToCurve(num));
	}
	function clear(initial) {
		const P = initial.clearCofactor();
		if (P.equals(Point.ZERO)) return Point.ZERO;
		P.assertValidity();
		return P;
	}
	return {
		defaults: Object.freeze(defaults),
		Point,
		hashToCurve(msg, options) {
			const u = hash_to_field(msg, 2, Object.assign({}, defaults, options));
			const u0 = map(u[0]);
			const u1 = map(u[1]);
			return clear(u0.add(u1));
		},
		encodeToCurve(msg, options) {
			const optsDst = defaults.encodeDST ? { DST: defaults.encodeDST } : {};
			return clear(map(hash_to_field(msg, 1, Object.assign({}, defaults, optsDst, options))[0]));
		},
		mapToCurve(scalars) {
			if (defaults.m === 1) {
				if (typeof scalars !== "bigint") throw new Error("expected bigint (m=1)");
				return clear(map([scalars]));
			}
			if (!Array.isArray(scalars)) throw new Error("expected array of bigints");
			for (const i of scalars) if (typeof i !== "bigint") throw new Error("expected array of bigints");
			return clear(map(scalars));
		},
		hashToScalar(msg, options) {
			const N = Point.Fn.ORDER;
			return hash_to_field(msg, 1, Object.assign({}, defaults, {
				p: N,
				m: 1,
				DST: _DST_scalar
			}, options))[0][0];
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@noble+curves@2.0.1/node_modules/@noble/curves/abstract/oprf.js
/**
* RFC 9497: Oblivious Pseudorandom Functions (OPRFs) Using Prime-Order Groups.
* https://www.rfc-editor.org/rfc/rfc9497
*

OPRF allows to interactively create an `Output = PRF(Input, serverSecretKey)`:

- Server cannot calculate Output by itself: it doesn't know Input
- Client cannot calculate Output by itself: it doesn't know server secretKey
- An attacker interception the communication can't restore Input/Output/serverSecretKey and can't
link Input to some value.

## Issues

- Low-entropy inputs (e.g. password '123') enable brute-forced dictionary attacks by the server
(solveable by domain separation in POPRF)
- High-level protocol needs to be constructed on top, because OPRF is low-level

## Use cases

1. **Password-Authenticated Key Exchange (PAKE):** Enables secure password login (e.g., OPAQUE)
without revealing the password to the server.
2. **Private Set Intersection (PSI):** Allows two parties to compute the intersection of their
private sets without revealing non-intersecting elements.
3. **Anonymous Credential Systems:** Supports issuance of anonymous, unlinkable credentials
(e.g., Privacy Pass) using blind OPRF evaluation.
4. **Private Information Retrieval (PIR):** Helps users query databases without revealing which
item they accessed.
5. **Encrypted Search / Secure Indexing:** Enables keyword search over encrypted data while keeping
queries private.
6. **Spam Prevention and Rate-Limiting:** Issues anonymous tokens to prevent abuse
(e.g., CAPTCHA bypass) without compromising user privacy.

## Modes

- OPRF: simple mode, client doesn't need to know server public key
- VOPRF: verifable mode, allows client to verify that server used secret key corresponding to known public key
- POPRF: partially oblivious mode, VOPRF + domain separation

There is also non-interactive mode (Evaluate) that supports creating Output in non-interactive mode with knowledge of secret key.

Flow:
- (once) Server generates secret and public keys, distributes public keys to clients
- deterministically: `deriveKeyPair` or just random: `generateKeyPair`
- Client blinds input: `blind(secretInput)`
- Server evaluates blinded input: `blindEvaluate` generated by client, sends result to client
- Client creates output using result of evaluation via 'finalize'

* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function createORPF(opts) {
	validateObject(opts, {
		name: "string",
		hash: "function",
		hashToScalar: "function",
		hashToGroup: "function"
	});
	const { name, Point, hash } = opts;
	const { Fn } = Point;
	const hashToGroup = (msg, ctx) => opts.hashToGroup(msg, { DST: concatBytes(asciiToBytes("HashToGroup-"), ctx) });
	const hashToScalarPrefixed = (msg, ctx) => opts.hashToScalar(msg, { DST: concatBytes(_DST_scalar, ctx) });
	const randomScalar = (rng = randomBytes) => {
		const t = mapHashToField(rng(getMinHashLength(Fn.ORDER)), Fn.ORDER, Fn.isLE);
		return Fn.isLE ? bytesToNumberLE(t) : bytesToNumberBE(t);
	};
	const msm = (points, scalars) => pippenger(Point, points, scalars);
	const getCtx = (mode) => concatBytes(asciiToBytes("OPRFV1-"), new Uint8Array([mode]), asciiToBytes("-" + name));
	const ctxOPRF = getCtx(0);
	const ctxVOPRF = getCtx(1);
	const ctxPOPRF = getCtx(2);
	function encode(...args) {
		const res = [];
		for (const a of args) if (typeof a === "number") res.push(numberToBytesBE(a, 2));
		else if (typeof a === "string") res.push(asciiToBytes(a));
		else {
			abytes(a);
			res.push(numberToBytesBE(a.length, 2), a);
		}
		return concatBytes(...res);
	}
	const hashInput = (...bytes) => hash(encode(...bytes, "Finalize"));
	function getTranscripts(B, C, D, ctx) {
		const seed = hash(encode(B.toBytes(), concatBytes(asciiToBytes("Seed-"), ctx)));
		const res = [];
		for (let i = 0; i < C.length; i++) {
			const Ci = C[i].toBytes();
			const Di = D[i].toBytes();
			const di = hashToScalarPrefixed(encode(seed, i, Ci, Di, "Composite"), ctx);
			res.push(di);
		}
		return res;
	}
	function computeComposites(B, C, D, ctx) {
		const T = getTranscripts(B, C, D, ctx);
		return {
			M: msm(C, T),
			Z: msm(D, T)
		};
	}
	function computeCompositesFast(k, B, C, D, ctx) {
		const M = msm(C, getTranscripts(B, C, D, ctx));
		return {
			M,
			Z: M.multiply(k)
		};
	}
	function challengeTranscript(B, M, Z, t2, t3, ctx) {
		const [Bm, a0, a1, a2, a3] = [
			B,
			M,
			Z,
			t2,
			t3
		].map((i) => i.toBytes());
		return hashToScalarPrefixed(encode(Bm, a0, a1, a2, a3, "Challenge"), ctx);
	}
	function generateProof(ctx, k, B, C, D, rng) {
		const { M, Z } = computeCompositesFast(k, B, C, D, ctx);
		const r = randomScalar(rng);
		const c = challengeTranscript(B, M, Z, Point.BASE.multiply(r), M.multiply(r), ctx);
		return concatBytes(...[c, Fn.sub(r, Fn.mul(c, k))].map((i) => Fn.toBytes(i)));
	}
	function verifyProof(ctx, B, C, D, proof) {
		abytes(proof, 2 * Fn.BYTES);
		const { M, Z } = computeComposites(B, C, D, ctx);
		const [c, s] = [proof.subarray(0, Fn.BYTES), proof.subarray(Fn.BYTES)].map((f) => Fn.fromBytes(f));
		const expectedC = challengeTranscript(B, M, Z, Point.BASE.multiply(s).add(B.multiply(c)), M.multiply(s).add(Z.multiply(c)), ctx);
		if (!Fn.eql(c, expectedC)) throw new Error("proof verification failed");
	}
	function generateKeyPair() {
		const skS = randomScalar();
		const pkS = Point.BASE.multiply(skS);
		return {
			secretKey: Fn.toBytes(skS),
			publicKey: pkS.toBytes()
		};
	}
	function deriveKeyPair(ctx, seed, info) {
		const dst = concatBytes(asciiToBytes("DeriveKeyPair"), ctx);
		const msg = concatBytes(seed, encode(info), Uint8Array.of(0));
		for (let counter = 0; counter <= 255; counter++) {
			msg[msg.length - 1] = counter;
			const skS = opts.hashToScalar(msg, { DST: dst });
			if (Fn.is0(skS)) continue;
			return {
				secretKey: Fn.toBytes(skS),
				publicKey: Point.BASE.multiply(skS).toBytes()
			};
		}
		throw new Error("Cannot derive key");
	}
	function blind(ctx, input, rng = randomBytes) {
		const blind = randomScalar(rng);
		const inputPoint = hashToGroup(input, ctx);
		if (inputPoint.equals(Point.ZERO)) throw new Error("Input point at infinity");
		const blinded = inputPoint.multiply(blind);
		return {
			blind: Fn.toBytes(blind),
			blinded: blinded.toBytes()
		};
	}
	function evaluate(ctx, secretKey, input) {
		const skS = Fn.fromBytes(secretKey);
		const inputPoint = hashToGroup(input, ctx);
		if (inputPoint.equals(Point.ZERO)) throw new Error("Input point at infinity");
		return hashInput(input, inputPoint.multiply(skS).toBytes());
	}
	const oprf = {
		generateKeyPair,
		deriveKeyPair: (seed, keyInfo) => deriveKeyPair(ctxOPRF, seed, keyInfo),
		blind: (input, rng = randomBytes) => blind(ctxOPRF, input, rng),
		blindEvaluate(secretKey, blindedPoint) {
			const skS = Fn.fromBytes(secretKey);
			return Point.fromBytes(blindedPoint).multiply(skS).toBytes();
		},
		finalize(input, blindBytes, evaluatedBytes) {
			const blind = Fn.fromBytes(blindBytes);
			return hashInput(input, Point.fromBytes(evaluatedBytes).multiply(Fn.inv(blind)).toBytes());
		},
		evaluate: (secretKey, input) => evaluate(ctxOPRF, secretKey, input)
	};
	const voprf = {
		generateKeyPair,
		deriveKeyPair: (seed, keyInfo) => deriveKeyPair(ctxVOPRF, seed, keyInfo),
		blind: (input, rng = randomBytes) => blind(ctxVOPRF, input, rng),
		blindEvaluateBatch(secretKey, publicKey, blinded, rng = randomBytes) {
			if (!Array.isArray(blinded)) throw new Error("expected array");
			const skS = Fn.fromBytes(secretKey);
			const pkS = Point.fromBytes(publicKey);
			const blindedPoints = blinded.map(Point.fromBytes);
			const evaluated = blindedPoints.map((i) => i.multiply(skS));
			const proof = generateProof(ctxVOPRF, skS, pkS, blindedPoints, evaluated, rng);
			return {
				evaluated: evaluated.map((i) => i.toBytes()),
				proof
			};
		},
		blindEvaluate(secretKey, publicKey, blinded, rng = randomBytes) {
			const res = this.blindEvaluateBatch(secretKey, publicKey, [blinded], rng);
			return {
				evaluated: res.evaluated[0],
				proof: res.proof
			};
		},
		finalizeBatch(items, publicKey, proof) {
			if (!Array.isArray(items)) throw new Error("expected array");
			verifyProof(ctxVOPRF, Point.fromBytes(publicKey), items.map((i) => i.blinded).map(Point.fromBytes), items.map((i) => i.evaluated).map(Point.fromBytes), proof);
			return items.map((i) => oprf.finalize(i.input, i.blind, i.evaluated));
		},
		finalize(input, blind, evaluated, blinded, publicKey, proof) {
			return this.finalizeBatch([{
				input,
				blind,
				evaluated,
				blinded
			}], publicKey, proof)[0];
		},
		evaluate: (secretKey, input) => evaluate(ctxVOPRF, secretKey, input)
	};
	const poprf = (info) => {
		const m = hashToScalarPrefixed(encode("Info", info), ctxPOPRF);
		const T = Point.BASE.multiply(m);
		return {
			generateKeyPair,
			deriveKeyPair: (seed, keyInfo) => deriveKeyPair(ctxPOPRF, seed, keyInfo),
			blind(input, publicKey, rng = randomBytes) {
				const pkS = Point.fromBytes(publicKey);
				const tweakedKey = T.add(pkS);
				if (tweakedKey.equals(Point.ZERO)) throw new Error("tweakedKey point at infinity");
				const blind = randomScalar(rng);
				const inputPoint = hashToGroup(input, ctxPOPRF);
				if (inputPoint.equals(Point.ZERO)) throw new Error("Input point at infinity");
				const blindedPoint = inputPoint.multiply(blind);
				return {
					blind: Fn.toBytes(blind),
					blinded: blindedPoint.toBytes(),
					tweakedKey: tweakedKey.toBytes()
				};
			},
			blindEvaluateBatch(secretKey, blinded, rng = randomBytes) {
				if (!Array.isArray(blinded)) throw new Error("expected array");
				const skS = Fn.fromBytes(secretKey);
				const t = Fn.add(skS, m);
				const invT = Fn.inv(t);
				const blindedPoints = blinded.map(Point.fromBytes);
				const evalPoints = blindedPoints.map((i) => i.multiply(invT));
				const proof = generateProof(ctxPOPRF, t, Point.BASE.multiply(t), evalPoints, blindedPoints, rng);
				return {
					evaluated: evalPoints.map((i) => i.toBytes()),
					proof
				};
			},
			blindEvaluate(secretKey, blinded, rng = randomBytes) {
				const res = this.blindEvaluateBatch(secretKey, [blinded], rng);
				return {
					evaluated: res.evaluated[0],
					proof: res.proof
				};
			},
			finalizeBatch(items, proof, tweakedKey) {
				if (!Array.isArray(items)) throw new Error("expected array");
				const evalPoints = items.map((i) => i.evaluated).map(Point.fromBytes);
				verifyProof(ctxPOPRF, Point.fromBytes(tweakedKey), evalPoints, items.map((i) => i.blinded).map(Point.fromBytes), proof);
				return items.map((i, j) => {
					const blind = Fn.fromBytes(i.blind);
					const point = evalPoints[j].multiply(Fn.inv(blind)).toBytes();
					return hashInput(i.input, info, point);
				});
			},
			finalize(input, blind, evaluated, blinded, proof, tweakedKey) {
				return this.finalizeBatch([{
					input,
					blind,
					evaluated,
					blinded
				}], proof, tweakedKey)[0];
			},
			evaluate(secretKey, input) {
				const skS = Fn.fromBytes(secretKey);
				const inputPoint = hashToGroup(input, ctxPOPRF);
				if (inputPoint.equals(Point.ZERO)) throw new Error("Input point at infinity");
				const t = Fn.add(skS, m);
				const invT = Fn.inv(t);
				return hashInput(input, info, inputPoint.multiply(invT).toBytes());
			}
		};
	};
	return Object.freeze({
		name,
		oprf,
		voprf,
		poprf,
		__tests: { Fn }
	});
}
//#endregion
//#region node_modules/.pnpm/@noble+curves@2.0.1/node_modules/@noble/curves/ed25519.js
/**
* ed25519 Twisted Edwards curve with following addons:
* - X25519 ECDH
* - Ristretto cofactor elimination
* - Elligator hash-to-group / point indistinguishability
* @module
*/
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var _0n = /* @__PURE__ */ BigInt(0), _1n = BigInt(1), _2n = BigInt(2), _3n = /* @__PURE__ */ BigInt(3);
var _5n = BigInt(5), _8n = BigInt(8);
var ed25519_CURVE_p = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed");
var ed25519_CURVE = {
	p: ed25519_CURVE_p,
	n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
	h: _8n,
	a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
	d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
	Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
	Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
};
function ed25519_pow_2_252_3(x) {
	const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
	const P = ed25519_CURVE_p;
	const b2 = x * x % P * x % P;
	const b5 = pow2(pow2(b2, _2n, P) * b2 % P, _1n, P) * x % P;
	const b10 = pow2(b5, _5n, P) * b5 % P;
	const b20 = pow2(b10, _10n, P) * b10 % P;
	const b40 = pow2(b20, _20n, P) * b20 % P;
	const b80 = pow2(b40, _40n, P) * b40 % P;
	return {
		pow_p_5_8: pow2(pow2(pow2(pow2(b80, _80n, P) * b80 % P, _80n, P) * b80 % P, _10n, P) * b10 % P, _2n, P) * x % P,
		b2
	};
}
function adjustScalarBytes(bytes) {
	bytes[0] &= 248;
	bytes[31] &= 127;
	bytes[31] |= 64;
	return bytes;
}
var ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
function uvRatio(u, v) {
	const P = ed25519_CURVE_p;
	const v3 = mod(v * v * v, P);
	const pow = ed25519_pow_2_252_3(u * mod(v3 * v3 * v, P)).pow_p_5_8;
	let x = mod(u * v3 * pow, P);
	const vx2 = mod(v * x * x, P);
	const root1 = x;
	const root2 = mod(x * ED25519_SQRT_M1, P);
	const useRoot1 = vx2 === u;
	const useRoot2 = vx2 === mod(-u, P);
	const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P);
	if (useRoot1) x = root1;
	if (useRoot2 || noRoot) x = root2;
	if (isNegativeLE(x, P)) x = mod(-x, P);
	return {
		isValid: useRoot1 || useRoot2,
		value: x
	};
}
var ed25519_Point = /* @__PURE__ */ edwards(ed25519_CURVE, { uvRatio });
var Fp = ed25519_Point.Fp;
var Fn = ed25519_Point.Fn;
function ed(opts) {
	return eddsa(ed25519_Point, sha512, Object.assign({ adjustScalarBytes }, opts));
}
/**
* ed25519 curve with EdDSA signatures.
* @example
* ```js
* import { ed25519 } from '@noble/curves/ed25519.js';
* const { secretKey, publicKey } = ed25519.keygen();
* // const publicKey = ed25519.getPublicKey(secretKey);
* const msg = new TextEncoder().encode('hello noble');
* const sig = ed25519.sign(msg, secretKey);
* const isValid = ed25519.verify(sig, msg, pub); // ZIP215
* // RFC8032 / FIPS 186-5
* const isValid2 = ed25519.verify(sig, msg, pub, { zip215: false });
* ```
*/
var ed25519 = /* @__PURE__ */ ed({});
var ELL2_C1 = (ed25519_CURVE_p + _3n) / _8n;
var ELL2_C2 = Fp.pow(_2n, ELL2_C1);
var ELL2_C3 = Fp.sqrt(Fp.neg(Fp.ONE));
/**
* RFC 9380 method `map_to_curve_elligator2_curve25519`. Experimental name: may be renamed later.
* @private
*/
function _map_to_curve_elligator2_curve25519(u) {
	const ELL2_C4 = (ed25519_CURVE_p - _5n) / _8n;
	const ELL2_J = BigInt(486662);
	let tv1 = Fp.sqr(u);
	tv1 = Fp.mul(tv1, _2n);
	let xd = Fp.add(tv1, Fp.ONE);
	let x1n = Fp.neg(ELL2_J);
	let tv2 = Fp.sqr(xd);
	let gxd = Fp.mul(tv2, xd);
	let gx1 = Fp.mul(tv1, ELL2_J);
	gx1 = Fp.mul(gx1, x1n);
	gx1 = Fp.add(gx1, tv2);
	gx1 = Fp.mul(gx1, x1n);
	let tv3 = Fp.sqr(gxd);
	tv2 = Fp.sqr(tv3);
	tv3 = Fp.mul(tv3, gxd);
	tv3 = Fp.mul(tv3, gx1);
	tv2 = Fp.mul(tv2, tv3);
	let y11 = Fp.pow(tv2, ELL2_C4);
	y11 = Fp.mul(y11, tv3);
	let y12 = Fp.mul(y11, ELL2_C3);
	tv2 = Fp.sqr(y11);
	tv2 = Fp.mul(tv2, gxd);
	let e1 = Fp.eql(tv2, gx1);
	let y1 = Fp.cmov(y12, y11, e1);
	let x2n = Fp.mul(x1n, tv1);
	let y21 = Fp.mul(y11, u);
	y21 = Fp.mul(y21, ELL2_C2);
	let y22 = Fp.mul(y21, ELL2_C3);
	let gx2 = Fp.mul(gx1, tv1);
	tv2 = Fp.sqr(y21);
	tv2 = Fp.mul(tv2, gxd);
	let e2 = Fp.eql(tv2, gx2);
	let y2 = Fp.cmov(y22, y21, e2);
	tv2 = Fp.sqr(y1);
	tv2 = Fp.mul(tv2, gxd);
	let e3 = Fp.eql(tv2, gx1);
	let xn = Fp.cmov(x2n, x1n, e3);
	let y = Fp.cmov(y2, y1, e3);
	let e4 = Fp.isOdd(y);
	y = Fp.cmov(y, Fp.neg(y), e3 !== e4);
	return {
		xMn: xn,
		xMd: xd,
		yMn: y,
		yMd: _1n
	};
}
var ELL2_C1_EDWARDS = FpSqrtEven(Fp, Fp.neg(BigInt(486664)));
function map_to_curve_elligator2_edwards25519(u) {
	const { xMn, xMd, yMn, yMd } = _map_to_curve_elligator2_curve25519(u);
	let xn = Fp.mul(xMn, yMd);
	xn = Fp.mul(xn, ELL2_C1_EDWARDS);
	let xd = Fp.mul(xMd, yMn);
	let yn = Fp.sub(xMn, xMd);
	let yd = Fp.add(xMn, xMd);
	let tv1 = Fp.mul(xd, yd);
	let e = Fp.eql(tv1, Fp.ZERO);
	xn = Fp.cmov(xn, Fp.ZERO, e);
	xd = Fp.cmov(xd, Fp.ONE, e);
	yn = Fp.cmov(yn, Fp.ONE, e);
	yd = Fp.cmov(yd, Fp.ONE, e);
	const [xd_inv, yd_inv] = FpInvertBatch(Fp, [xd, yd], true);
	return {
		x: Fp.mul(xn, xd_inv),
		y: Fp.mul(yn, yd_inv)
	};
}
createHasher(ed25519_Point, (scalars) => map_to_curve_elligator2_edwards25519(scalars[0]), {
	DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
	encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
	p: ed25519_CURVE_p,
	m: 1,
	k: 128,
	expand: "xmd",
	hash: sha512
});
var SQRT_M1 = ED25519_SQRT_M1;
var SQRT_AD_MINUS_ONE = /* @__PURE__ */ BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = /* @__PURE__ */ BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = /* @__PURE__ */ BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = /* @__PURE__ */ BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var invertSqrt = (number) => uvRatio(_1n, number);
var MAX_255B = /* @__PURE__ */ BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var bytes255ToNumberLE = (bytes) => Fp.create(bytesToNumberLE(bytes) & MAX_255B);
/**
* Computes Elligator map for Ristretto255.
* Described in [RFC9380](https://www.rfc-editor.org/rfc/rfc9380#appendix-B) and on
* the [website](https://ristretto.group/formulas/elligator.html).
*/
function calcElligatorRistrettoMap(r0) {
	const { d } = ed25519_CURVE;
	const P = ed25519_CURVE_p;
	const mod = (n) => Fp.create(n);
	const r = mod(SQRT_M1 * r0 * r0);
	const Ns = mod((r + _1n) * ONE_MINUS_D_SQ);
	let c = BigInt(-1);
	const D = mod((c - d * r) * mod(r + d));
	let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
	let s_ = mod(s * r0);
	if (!isNegativeLE(s_, P)) s_ = mod(-s_);
	if (!Ns_D_is_sq) s = s_;
	if (!Ns_D_is_sq) c = r;
	const Nt = mod(c * (r - _1n) * D_MINUS_ONE_SQ - D);
	const s2 = s * s;
	const W0 = mod((s + s) * D);
	const W1 = mod(Nt * SQRT_AD_MINUS_ONE);
	const W2 = mod(_1n - s2);
	const W3 = mod(_1n + s2);
	return new ed25519_Point(mod(W0 * W3), mod(W2 * W1), mod(W1 * W3), mod(W0 * W2));
}
/**
* Wrapper over Edwards Point for ristretto255.
*
* Each ed25519/EdwardsPoint has 8 different equivalent points. This can be
* a source of bugs for protocols like ring signatures. Ristretto was created to solve this.
* Ristretto point operates in X:Y:Z:T extended coordinates like EdwardsPoint,
* but it should work in its own namespace: do not combine those two.
* See [RFC9496](https://www.rfc-editor.org/rfc/rfc9496).
*/
var _RistrettoPoint = class _RistrettoPoint extends PrimeEdwardsPoint {
	static BASE = new _RistrettoPoint(ed25519_Point.BASE);
	static ZERO = new _RistrettoPoint(ed25519_Point.ZERO);
	static Fp = Fp;
	static Fn = Fn;
	constructor(ep) {
		super(ep);
	}
	static fromAffine(ap) {
		return new _RistrettoPoint(ed25519_Point.fromAffine(ap));
	}
	assertSame(other) {
		if (!(other instanceof _RistrettoPoint)) throw new Error("RistrettoPoint expected");
	}
	init(ep) {
		return new _RistrettoPoint(ep);
	}
	static fromBytes(bytes) {
		abytes(bytes, 32);
		const { a, d } = ed25519_CURVE;
		const P = ed25519_CURVE_p;
		const mod = (n) => Fp.create(n);
		const s = bytes255ToNumberLE(bytes);
		if (!equalBytes(Fp.toBytes(s), bytes) || isNegativeLE(s, P)) throw new Error("invalid ristretto255 encoding 1");
		const s2 = mod(s * s);
		const u1 = mod(_1n + a * s2);
		const u2 = mod(_1n - a * s2);
		const u1_2 = mod(u1 * u1);
		const u2_2 = mod(u2 * u2);
		const v = mod(a * d * u1_2 - u2_2);
		const { isValid, value: I } = invertSqrt(mod(v * u2_2));
		const Dx = mod(I * u2);
		const Dy = mod(I * Dx * v);
		let x = mod((s + s) * Dx);
		if (isNegativeLE(x, P)) x = mod(-x);
		const y = mod(u1 * Dy);
		const t = mod(x * y);
		if (!isValid || isNegativeLE(t, P) || y === _0n) throw new Error("invalid ristretto255 encoding 2");
		return new _RistrettoPoint(new ed25519_Point(x, y, _1n, t));
	}
	/**
	* Converts ristretto-encoded string to ristretto point.
	* Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-decode).
	* @param hex Ristretto-encoded 32 bytes. Not every 32-byte string is valid ristretto encoding
	*/
	static fromHex(hex) {
		return _RistrettoPoint.fromBytes(hexToBytes(hex));
	}
	/**
	* Encodes ristretto point to Uint8Array.
	* Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-encode).
	*/
	toBytes() {
		let { X, Y, Z, T } = this.ep;
		const P = ed25519_CURVE_p;
		const mod = (n) => Fp.create(n);
		const u1 = mod(mod(Z + Y) * mod(Z - Y));
		const u2 = mod(X * Y);
		const { value: invsqrt } = invertSqrt(mod(u1 * mod(u2 * u2)));
		const D1 = mod(invsqrt * u1);
		const D2 = mod(invsqrt * u2);
		const zInv = mod(D1 * D2 * T);
		let D;
		if (isNegativeLE(T * zInv, P)) {
			let _x = mod(Y * SQRT_M1);
			let _y = mod(X * SQRT_M1);
			X = _x;
			Y = _y;
			D = mod(D1 * INVSQRT_A_MINUS_D);
		} else D = D2;
		if (isNegativeLE(X * zInv, P)) Y = mod(-Y);
		let s = mod((Z - Y) * D);
		if (isNegativeLE(s, P)) s = mod(-s);
		return Fp.toBytes(s);
	}
	/**
	* Compares two Ristretto points.
	* Described in [RFC9496](https://www.rfc-editor.org/rfc/rfc9496#name-equals).
	*/
	equals(other) {
		this.assertSame(other);
		const { X: X1, Y: Y1 } = this.ep;
		const { X: X2, Y: Y2 } = other.ep;
		const mod = (n) => Fp.create(n);
		const one = mod(X1 * Y2) === mod(Y1 * X2);
		const two = mod(Y1 * Y2) === mod(X1 * X2);
		return one || two;
	}
	is0() {
		return this.equals(_RistrettoPoint.ZERO);
	}
};
/** Hashing to ristretto255 points / field. RFC 9380 methods. */
var ristretto255_hasher = {
	Point: _RistrettoPoint,
	hashToCurve(msg, options) {
		const xmd = expand_message_xmd(msg, options?.DST || "ristretto255_XMD:SHA-512_R255MAP_RO_", 64, sha512);
		return ristretto255_hasher.deriveToCurve(xmd);
	},
	hashToScalar(msg, options = { DST: _DST_scalar }) {
		const xmd = expand_message_xmd(msg, options.DST, 64, sha512);
		return Fn.create(bytesToNumberLE(xmd));
	},
	deriveToCurve(bytes) {
		abytes(bytes, 64);
		const R1 = calcElligatorRistrettoMap(bytes255ToNumberLE(bytes.subarray(0, 32)));
		const R2 = calcElligatorRistrettoMap(bytes255ToNumberLE(bytes.subarray(32, 64)));
		return new _RistrettoPoint(R1.add(R2));
	}
};
createORPF({
	name: "ristretto255-SHA512",
	Point: _RistrettoPoint,
	hash: sha512,
	hashToGroup: ristretto255_hasher.hashToCurve,
	hashToScalar: ristretto255_hasher.hashToScalar
});
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/keypairs/ed25519/publickey.mjs
var PUBLIC_KEY_SIZE = 32;
/**
* An Ed25519 public key
*/
var Ed25519PublicKey = class extends PublicKey {
	static {
		this.SIZE = PUBLIC_KEY_SIZE;
	}
	/**
	* Create a new Ed25519PublicKey object
	* @param value ed25519 public key as buffer or base-64 encoded string
	*/
	constructor(value) {
		super();
		if (typeof value === "string") this.data = fromBase64(value);
		else if (value instanceof Uint8Array) this.data = value;
		else this.data = Uint8Array.from(value);
		if (this.data.length !== PUBLIC_KEY_SIZE) throw new Error(`Invalid public key input. Expected ${PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`);
	}
	/**
	* Checks if two Ed25519 public keys are equal
	*/
	equals(publicKey) {
		return super.equals(publicKey);
	}
	/**
	* Return the byte array representation of the Ed25519 public key
	*/
	toRawBytes() {
		return this.data;
	}
	/**
	* Return the Sui address associated with this Ed25519 public key
	*/
	flag() {
		return SIGNATURE_SCHEME_TO_FLAG["ED25519"];
	}
	/**
	* Verifies that the signature is valid for for the provided message
	*/
	async verify(message, signature) {
		let bytes;
		if (typeof signature === "string") {
			const parsed = parseSerializedKeypairSignature(signature);
			if (parsed.signatureScheme !== "ED25519") throw new Error("Invalid signature scheme");
			if (!bytesEqual(this.toRawBytes(), parsed.publicKey)) throw new Error("Signature does not match public key");
			bytes = parsed.signature;
		} else bytes = signature;
		return ed25519.verify(bytes, message, this.toRawBytes());
	}
};
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.0.1/node_modules/@noble/hashes/hmac.js
/**
* HMAC: RFC2104 message authentication code.
* @module
*/
/** Internal class for HMAC. */
var _HMAC = class {
	oHash;
	iHash;
	blockLen;
	outputLen;
	finished = false;
	destroyed = false;
	constructor(hash, key) {
		ahash(hash);
		abytes(key, void 0, "key");
		this.iHash = hash.create();
		if (typeof this.iHash.update !== "function") throw new Error("Expected instance of class which extends utils.Hash");
		this.blockLen = this.iHash.blockLen;
		this.outputLen = this.iHash.outputLen;
		const blockLen = this.blockLen;
		const pad = new Uint8Array(blockLen);
		pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
		for (let i = 0; i < pad.length; i++) pad[i] ^= 54;
		this.iHash.update(pad);
		this.oHash = hash.create();
		for (let i = 0; i < pad.length; i++) pad[i] ^= 106;
		this.oHash.update(pad);
		clean(pad);
	}
	update(buf) {
		aexists(this);
		this.iHash.update(buf);
		return this;
	}
	digestInto(out) {
		aexists(this);
		abytes(out, this.outputLen, "output");
		this.finished = true;
		this.iHash.digestInto(out);
		this.oHash.update(out);
		this.oHash.digestInto(out);
		this.destroy();
	}
	digest() {
		const out = new Uint8Array(this.oHash.outputLen);
		this.digestInto(out);
		return out;
	}
	_cloneInto(to) {
		to ||= Object.create(Object.getPrototypeOf(this), {});
		const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
		to = to;
		to.finished = finished;
		to.destroyed = destroyed;
		to.blockLen = blockLen;
		to.outputLen = outputLen;
		to.oHash = oHash._cloneInto(to.oHash);
		to.iHash = iHash._cloneInto(to.iHash);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
	destroy() {
		this.destroyed = true;
		this.oHash.destroy();
		this.iHash.destroy();
	}
};
/**
* HMAC: RFC2104 message authentication code.
* @param hash - function that would be used e.g. sha256
* @param key - message key
* @param message - message data
* @example
* import { hmac } from '@noble/hashes/hmac';
* import { sha256 } from '@noble/hashes/sha2';
* const mac1 = hmac(sha256, 'key', 'message');
*/
var hmac = (hash, key, message) => new _HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new _HMAC(hash, key);
//#endregion
//#region node_modules/.pnpm/@noble+hashes@2.0.1/node_modules/@noble/hashes/pbkdf2.js
/**
* PBKDF (RFC 2898). Can be used to create a key from password and salt.
* @module
*/
function pbkdf2Init(hash, _password, _salt, _opts) {
	ahash(hash);
	const { c, dkLen, asyncTick } = checkOpts({
		dkLen: 32,
		asyncTick: 10
	}, _opts);
	anumber(c, "c");
	anumber(dkLen, "dkLen");
	anumber(asyncTick, "asyncTick");
	if (c < 1) throw new Error("iterations (c) must be >= 1");
	const password = kdfInputToBytes(_password, "password");
	const salt = kdfInputToBytes(_salt, "salt");
	const DK = new Uint8Array(dkLen);
	const PRF = hmac.create(hash, password);
	return {
		c,
		dkLen,
		asyncTick,
		DK,
		PRF,
		PRFSalt: PRF._cloneInto().update(salt)
	};
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
	PRF.destroy();
	PRFSalt.destroy();
	if (prfW) prfW.destroy();
	clean(u);
	return DK;
}
/**
* PBKDF2-HMAC: RFC 2898 key derivation function
* @param hash - hash function that would be used e.g. sha256
* @param password - password from which a derived key is generated
* @param salt - cryptographic salt
* @param opts - {c, dkLen} where c is work factor and dkLen is output message size
* @example
* const key = pbkdf2(sha256, 'password', 'salt', { dkLen: 32, c: Math.pow(2, 18) });
*/
function pbkdf2(hash, password, salt, opts) {
	const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
	let prfW;
	const arr = new Uint8Array(4);
	const view = createView(arr);
	const u = new Uint8Array(PRF.outputLen);
	for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
		const Ti = DK.subarray(pos, pos + PRF.outputLen);
		view.setInt32(0, ti, false);
		(prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
		Ti.set(u.subarray(0, Ti.length));
		for (let ui = 1; ui < c; ui++) {
			PRF._cloneInto(prfW).update(u).digestInto(u);
			for (let i = 0; i < Ti.length; i++) Ti[i] ^= u[i];
		}
	}
	return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}
//#endregion
//#region node_modules/.pnpm/@scure+bip39@2.0.1/node_modules/@scure/bip39/index.js
/*! scure-bip39 - MIT License (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) */
function nfkd(str) {
	if (typeof str !== "string") throw new TypeError("invalid mnemonic type: " + typeof str);
	return str.normalize("NFKD");
}
function normalize(str) {
	const norm = nfkd(str);
	const words = norm.split(" ");
	if (![
		12,
		15,
		18,
		21,
		24
	].includes(words.length)) throw new Error("Invalid mnemonic");
	return {
		nfkd: norm,
		words
	};
}
var psalt = (passphrase) => nfkd("mnemonic" + passphrase);
/**
* Irreversible: Uses KDF to derive 64 bytes of key data from mnemonic + optional password.
* @param mnemonic 12-24 words
* @param passphrase string that will additionally protect the key
* @returns 64 bytes of key data
* @example
* const mnem = 'legal winner thank year wave sausage worth useful legal winner thank yellow';
* mnemonicToSeedSync(mnem, 'password');
* // new Uint8Array([...64 bytes])
*/
function mnemonicToSeedSync(mnemonic, passphrase = "") {
	return pbkdf2(sha512, normalize(mnemonic).nfkd, psalt(passphrase), {
		c: 2048,
		dkLen: 64
	});
}
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/cryptography/mnemonics.mjs
/**
* Parse and validate a path that is compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
*
* @param path path string (e.g. `m/44'/784'/0'/0'/0'`).
*/
function isValidHardenedPath(path) {
	if (!(/* @__PURE__ */ new RegExp("^m\\/44'\\/784'\\/[0-9]+'\\/[0-9]+'\\/[0-9]+'+$")).test(path)) return false;
	return true;
}
/**
* Uses KDF to derive 64 bytes of key data from mnemonic with empty password.
*
* @param mnemonics 12 words string split by spaces.
*/
function mnemonicToSeed(mnemonics) {
	return mnemonicToSeedSync(mnemonics, "");
}
/**
* Derive the seed in hex format from a 12-word mnemonic string.
*
* @param mnemonics 12 words string split by spaces.
*/
function mnemonicToSeedHex(mnemonics) {
	return toHex(mnemonicToSeed(mnemonics));
}
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/cryptography/signature.mjs
/**
* Takes in a signature, its associated signing scheme and a public key, then serializes this data
*/
function toSerializedSignature({ signature, signatureScheme, publicKey }) {
	if (!publicKey) throw new Error("`publicKey` is required");
	const pubKeyBytes = publicKey.toRawBytes();
	const serializedSignature = new Uint8Array(1 + signature.length + pubKeyBytes.length);
	serializedSignature.set([SIGNATURE_SCHEME_TO_FLAG[signatureScheme]]);
	serializedSignature.set(signature, 1);
	serializedSignature.set(pubKeyBytes, 1 + signature.length);
	return toBase64(serializedSignature);
}
var SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
/**
* TODO: Document
*/
var Signer = class {
	/**
	* Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
	* it ensures that a signed message is tied to a specific purpose and domain separator is provided
	*/
	async signWithIntent(bytes, intent) {
		const digest = blake2b(messageWithIntent(intent, bytes), { dkLen: 32 });
		return {
			signature: toSerializedSignature({
				signature: await this.sign(digest),
				signatureScheme: this.getKeyScheme(),
				publicKey: this.getPublicKey()
			}),
			bytes: toBase64(bytes)
		};
	}
	/**
	* Signs provided transaction by calling `signWithIntent()` with a `TransactionData` provided as intent scope
	*/
	async signTransaction(bytes) {
		return this.signWithIntent(bytes, "TransactionData");
	}
	/**
	* Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
	*/
	async signPersonalMessage(bytes) {
		const { signature } = await this.signWithIntent(bcs.byteVector().serialize(bytes).toBytes(), "PersonalMessage");
		return {
			bytes: toBase64(bytes),
			signature
		};
	}
	async signAndExecuteTransaction({ transaction, client }) {
		transaction.setSenderIfNotSet(this.toSuiAddress());
		const bytes = await transaction.build({ client });
		const { signature } = await this.signTransaction(bytes);
		return client.core.executeTransaction({
			transaction: bytes,
			signatures: [signature],
			include: {
				transaction: true,
				effects: true
			}
		});
	}
	toSuiAddress() {
		return this.getPublicKey().toSuiAddress();
	}
};
var Keypair = class extends Signer {};
/**
* This returns an ParsedKeypair object based by validating the
* 33-byte Bech32 encoded string starting with `suiprivkey`, and
* parse out the signature scheme and the private key in bytes.
*/
function decodeSuiPrivateKey(value) {
	const { prefix, words } = bech32.decode(value);
	if (prefix !== "suiprivkey") throw new Error("invalid private key prefix");
	const extendedSecretKey = new Uint8Array(bech32.fromWords(words));
	const secretKey = extendedSecretKey.slice(1);
	return {
		scheme: SIGNATURE_FLAG_TO_SCHEME[extendedSecretKey[0]],
		secretKey
	};
}
/**
* This returns a Bech32 encoded string starting with `suiprivkey`,
* encoding 33-byte `flag || bytes` for the given the 32-byte private
* key and its signature scheme.
*/
function encodeSuiPrivateKey(bytes, scheme) {
	if (bytes.length !== 32) throw new Error("Invalid bytes length");
	const flag = SIGNATURE_SCHEME_TO_FLAG[scheme];
	const privKeyBytes = new Uint8Array(bytes.length + 1);
	privKeyBytes.set([flag]);
	privKeyBytes.set(bytes, 1);
	return bech32.encode(SUI_PRIVATE_KEY_PREFIX, bech32.toWords(privKeyBytes));
}
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/keypairs/ed25519/ed25519-hd-key.mjs
var ED25519_CURVE = "ed25519 seed";
var HARDENED_OFFSET = 2147483648;
var pathRegex = /* @__PURE__ */ new RegExp("^m(\\/[0-9]+')+$");
var replaceDerive = (val) => val.replace("'", "");
var getMasterKeyFromSeed = (seed) => {
	const I = hmac$1.create(sha512$1, new TextEncoder().encode(ED25519_CURVE)).update(fromHex(seed)).digest();
	return {
		key: I.slice(0, 32),
		chainCode: I.slice(32)
	};
};
var CKDPriv = ({ key, chainCode }, index) => {
	const indexBuffer = /* @__PURE__ */ new ArrayBuffer(4);
	new DataView(indexBuffer).setUint32(0, index);
	const data = new Uint8Array(1 + key.length + indexBuffer.byteLength);
	data.set(new Uint8Array(1).fill(0));
	data.set(key, 1);
	data.set(new Uint8Array(indexBuffer, 0, indexBuffer.byteLength), key.length + 1);
	const I = hmac$1.create(sha512$1, chainCode).update(data).digest();
	return {
		key: I.slice(0, 32),
		chainCode: I.slice(32)
	};
};
var isValidPath = (path) => {
	if (!pathRegex.test(path)) return false;
	return !path.split("/").slice(1).map(replaceDerive).some(isNaN);
};
var derivePath = (path, seed, offset = HARDENED_OFFSET) => {
	if (!isValidPath(path)) throw new Error("Invalid derivation path");
	const { key, chainCode } = getMasterKeyFromSeed(seed);
	return path.split("/").slice(1).map(replaceDerive).map((el) => parseInt(el, 10)).reduce((parentKeys, segment) => CKDPriv(parentKeys, segment + offset), {
		key,
		chainCode
	});
};
//#endregion
//#region node_modules/.pnpm/@mysten+sui@2.9.1_typescript@5.8.2/node_modules/@mysten/sui/dist/keypairs/ed25519/keypair.mjs
var DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
/**
* An Ed25519 Keypair used for signing transactions.
*/
var Ed25519Keypair = class Ed25519Keypair extends Keypair {
	/**
	* Create a new Ed25519 keypair instance.
	* Generate random keypair if no {@link Ed25519Keypair} is provided.
	*
	* @param keypair Ed25519 keypair
	*/
	constructor(keypair) {
		super();
		if (keypair) this.keypair = {
			publicKey: keypair.publicKey,
			secretKey: keypair.secretKey.slice(0, 32)
		};
		else {
			const privateKey = ed25519.utils.randomSecretKey();
			this.keypair = {
				publicKey: ed25519.getPublicKey(privateKey),
				secretKey: privateKey
			};
		}
	}
	/**
	* Get the key scheme of the keypair ED25519
	*/
	getKeyScheme() {
		return "ED25519";
	}
	/**
	* Generate a new random Ed25519 keypair
	*/
	static generate() {
		const secretKey = ed25519.utils.randomSecretKey();
		return new Ed25519Keypair({
			publicKey: ed25519.getPublicKey(secretKey),
			secretKey
		});
	}
	/**
	* Create a Ed25519 keypair from a raw secret key byte array, also known as seed.
	* This is NOT the private scalar which is result of hashing and bit clamping of
	* the raw secret key.
	*
	* @throws error if the provided secret key is invalid and validation is not skipped.
	*
	* @param secretKey secret key as a byte array or Bech32 secret key string
	* @param options: skip secret key validation
	*/
	static fromSecretKey(secretKey, options) {
		if (typeof secretKey === "string") {
			const decoded = decodeSuiPrivateKey(secretKey);
			if (decoded.scheme !== "ED25519") throw new Error(`Expected a ED25519 keypair, got ${decoded.scheme}`);
			return this.fromSecretKey(decoded.secretKey, options);
		}
		const secretKeyLength = secretKey.length;
		if (secretKeyLength !== 32) throw new Error(`Wrong secretKey size. Expected 32 bytes, got ${secretKeyLength}.`);
		const keypair = {
			publicKey: ed25519.getPublicKey(secretKey),
			secretKey
		};
		if (!options || !options.skipValidation) {
			const signData = new TextEncoder().encode("sui validation");
			const signature = ed25519.sign(signData, secretKey);
			if (!ed25519.verify(signature, signData, keypair.publicKey)) throw new Error("provided secretKey is invalid");
		}
		return new Ed25519Keypair(keypair);
	}
	/**
	* The public key for this Ed25519 keypair
	*/
	getPublicKey() {
		return new Ed25519PublicKey(this.keypair.publicKey);
	}
	/**
	* The Bech32 secret key string for this Ed25519 keypair
	*/
	getSecretKey() {
		return encodeSuiPrivateKey(this.keypair.secretKey.slice(0, 32), this.getKeyScheme());
	}
	/**
	* Return the signature for the provided data using Ed25519.
	*/
	async sign(data) {
		return ed25519.sign(data, this.keypair.secretKey);
	}
	/**
	* Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
	* and validated against the english wordlist.
	*
	* If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
	* be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
	*/
	static deriveKeypair(mnemonics, path) {
		if (path == null) path = DEFAULT_ED25519_DERIVATION_PATH;
		if (!isValidHardenedPath(path)) throw new Error("Invalid derivation path");
		const { key } = derivePath(path, mnemonicToSeedHex(mnemonics));
		return Ed25519Keypair.fromSecretKey(key);
	}
	/**
	* Derive Ed25519 keypair from mnemonicSeed and path.
	*
	* If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
	* be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
	*
	* @param seed - The seed as a hex string or Uint8Array.
	*/
	static deriveKeypairFromSeed(seed, path) {
		if (path == null) path = DEFAULT_ED25519_DERIVATION_PATH;
		if (!isValidHardenedPath(path)) throw new Error("Invalid derivation path");
		const seedHex = typeof seed === "string" ? seed : toHex(seed);
		const { key } = derivePath(path, seedHex);
		return Ed25519Keypair.fromSecretKey(key);
	}
};
//#endregion
export { sha256 as n, hmac$1 as r, Ed25519Keypair as t };
