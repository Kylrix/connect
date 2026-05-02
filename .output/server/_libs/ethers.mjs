import { w as secp256k1 } from "./noble__curves+noble__hashes.mjs";
import { d as ripemd160$1, f as keccak_256, l as scrypt$1, u as scryptAsync } from "./noble__hashes.mjs";
import { t as CTR } from "./aes-js.mjs";
import { createHash, createHmac, pbkdf2Sync, randomBytes as randomBytes$1 } from "crypto";
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/_version.js
/**
*  The current version of Ethers.
*/
var version = "6.16.0";
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/properties.js
/**
*  Property helper functions.
*
*  @_subsection api/utils:Properties  [about-properties]
*/
function checkType(value, type, name) {
	const types = type.split("|").map((t) => t.trim());
	for (let i = 0; i < types.length; i++) switch (type) {
		case "any": return;
		case "bigint":
		case "boolean":
		case "number":
		case "string": if (typeof value === type) return;
	}
	const error = /* @__PURE__ */ new Error(`invalid value for type ${type}`);
	error.code = "INVALID_ARGUMENT";
	error.argument = `value.${name}`;
	error.value = value;
	throw error;
}
/**
*  Resolves to a new object that is a copy of %%value%%, but with all
*  values resolved.
*/
async function resolveProperties(value) {
	const keys = Object.keys(value);
	return (await Promise.all(keys.map((k) => Promise.resolve(value[k])))).reduce((accum, v, index) => {
		accum[keys[index]] = v;
		return accum;
	}, {});
}
/**
*  Assigns the %%values%% to %%target%% as read-only values.
*
*  It %%types%% is specified, the values are checked.
*/
function defineProperties(target, values, types) {
	for (let key in values) {
		let value = values[key];
		const type = types ? types[key] : null;
		if (type) checkType(value, type, key);
		Object.defineProperty(target, key, {
			enumerable: true,
			value,
			writable: false
		});
	}
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/errors.js
/**
*  All errors in ethers include properties to ensure they are both
*  human-readable (i.e. ``.message``) and machine-readable (i.e. ``.code``).
*
*  The [[isError]] function can be used to check the error ``code`` and
*  provide a type guard for the properties present on that error interface.
*
*  @_section: api/utils/errors:Errors  [about-errors]
*/
function stringify(value, seen) {
	if (value == null) return "null";
	if (seen == null) seen = /* @__PURE__ */ new Set();
	if (typeof value === "object") {
		if (seen.has(value)) return "[Circular]";
		seen.add(value);
	}
	if (Array.isArray(value)) return "[ " + value.map((v) => stringify(v, seen)).join(", ") + " ]";
	if (value instanceof Uint8Array) {
		const HEX = "0123456789abcdef";
		let result = "0x";
		for (let i = 0; i < value.length; i++) {
			result += HEX[value[i] >> 4];
			result += HEX[value[i] & 15];
		}
		return result;
	}
	if (typeof value === "object" && typeof value.toJSON === "function") return stringify(value.toJSON(), seen);
	switch (typeof value) {
		case "boolean":
		case "number":
		case "symbol": return value.toString();
		case "bigint": return BigInt(value).toString();
		case "string": return JSON.stringify(value);
		case "object": {
			const keys = Object.keys(value);
			keys.sort();
			return "{ " + keys.map((k) => `${stringify(k, seen)}: ${stringify(value[k], seen)}`).join(", ") + " }";
		}
	}
	return `[ COULD NOT SERIALIZE ]`;
}
/**
*  Returns a new Error configured to the format ethers emits errors, with
*  the %%message%%, [[api:ErrorCode]] %%code%% and additional properties
*  for the corresponding EthersError.
*
*  Each error in ethers includes the version of ethers, a
*  machine-readable [[ErrorCode]], and depending on %%code%%, additional
*  required properties. The error message will also include the %%message%%,
*  ethers version, %%code%% and all additional properties, serialized.
*/
function makeError(message, code, info) {
	let shortMessage = message;
	{
		const details = [];
		if (info) {
			if ("message" in info || "code" in info || "name" in info) throw new Error(`value will overwrite populated values: ${stringify(info)}`);
			for (const key in info) {
				if (key === "shortMessage") continue;
				const value = info[key];
				details.push(key + "=" + stringify(value));
			}
		}
		details.push(`code=${code}`);
		details.push(`version=${version}`);
		if (details.length) message += " (" + details.join(", ") + ")";
	}
	let error;
	switch (code) {
		case "INVALID_ARGUMENT":
			error = new TypeError(message);
			break;
		case "NUMERIC_FAULT":
		case "BUFFER_OVERRUN":
			error = new RangeError(message);
			break;
		default: error = new Error(message);
	}
	defineProperties(error, { code });
	if (info) Object.assign(error, info);
	if (error.shortMessage == null) defineProperties(error, { shortMessage });
	return error;
}
/**
*  Throws an EthersError with %%message%%, %%code%% and additional error
*  %%info%% when %%check%% is falsish..
*
*  @see [[api:makeError]]
*/
function assert(check, message, code, info) {
	if (!check) throw makeError(message, code, info);
}
/**
*  A simple helper to simply ensuring provided arguments match expected
*  constraints, throwing if not.
*
*  In TypeScript environments, the %%check%% has been asserted true, so
*  any further code does not need additional compile-time checks.
*/
function assertArgument(check, message, name, value) {
	assert(check, message, "INVALID_ARGUMENT", {
		argument: name,
		value
	});
}
var _normalizeForms = [
	"NFD",
	"NFC",
	"NFKD",
	"NFKC"
].reduce((accum, form) => {
	try {
		/* c8 ignore start */
		if ("test".normalize(form) !== "test") throw new Error("bad");
		/* c8 ignore stop */
		if (form === "NFD") {
			/* c8 ignore start */
			if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) throw new Error("broken");
		}
		accum.push(form);
	} catch (error) {}
	return accum;
}, []);
/**
*  Throws if the normalization %%form%% is not supported.
*/
function assertNormalize(form) {
	assert(_normalizeForms.indexOf(form) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
		operation: "String.prototype.normalize",
		info: { form }
	});
}
/**
*  Many classes use file-scoped values to guard the constructor,
*  making it effectively private. This facilitates that pattern
*  by ensuring the %%givenGaurd%% matches the file-scoped %%guard%%,
*  throwing if not, indicating the %%className%% if provided.
*/
function assertPrivate(givenGuard, guard, className) {
	if (className == null) className = "";
	if (givenGuard !== guard) {
		let method = className, operation = "new";
		if (className) {
			method += ".";
			operation += " " + className;
		}
		assert(false, `private constructor; use ${method}from* methods`, "UNSUPPORTED_OPERATION", { operation });
	}
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/data.js
/**
*  Some data helpers.
*
*
*  @_subsection api/utils:Data Helpers  [about-data]
*/
function _getBytes(value, name, copy) {
	if (value instanceof Uint8Array) {
		if (copy) return new Uint8Array(value);
		return value;
	}
	if (typeof value === "string" && value.length % 2 === 0 && value.match(/^0x[0-9a-f]*$/i)) {
		const result = new Uint8Array((value.length - 2) / 2);
		let offset = 2;
		for (let i = 0; i < result.length; i++) {
			result[i] = parseInt(value.substring(offset, offset + 2), 16);
			offset += 2;
		}
		return result;
	}
	assertArgument(false, "invalid BytesLike value", name || "value", value);
}
/**
*  Get a typed Uint8Array for %%value%%. If already a Uint8Array
*  the original %%value%% is returned; if a copy is required use
*  [[getBytesCopy]].
*
*  @see: getBytesCopy
*/
function getBytes(value, name) {
	return _getBytes(value, name, false);
}
/**
*  Get a typed Uint8Array for %%value%%, creating a copy if necessary
*  to prevent any modifications of the returned value from being
*  reflected elsewhere.
*
*  @see: getBytes
*/
function getBytesCopy(value, name) {
	return _getBytes(value, name, true);
}
/**
*  Returns true if %%value%% is a valid [[HexString]].
*
*  If %%length%% is ``true`` or a //number//, it also checks that
*  %%value%% is a valid [[DataHexString]] of %%length%% (if a //number//)
*  bytes of data (e.g. ``0x1234`` is 2 bytes).
*/
function isHexString(value, length) {
	if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) return false;
	if (typeof length === "number" && value.length !== 2 + 2 * length) return false;
	if (length === true && value.length % 2 !== 0) return false;
	return true;
}
/**
*  Returns true if %%value%% is a valid representation of arbitrary
*  data (i.e. a valid [[DataHexString]] or a Uint8Array).
*/
function isBytesLike(value) {
	return isHexString(value, true) || value instanceof Uint8Array;
}
var HexCharacters = "0123456789abcdef";
/**
*  Returns a [[DataHexString]] representation of %%data%%.
*/
function hexlify(data) {
	const bytes = getBytes(data);
	let result = "0x";
	for (let i = 0; i < bytes.length; i++) {
		const v = bytes[i];
		result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
	}
	return result;
}
/**
*  Returns a [[DataHexString]] by concatenating all values
*  within %%data%%.
*/
function concat(datas) {
	return "0x" + datas.map((d) => hexlify(d).substring(2)).join("");
}
/**
*  Returns the length of %%data%%, in bytes.
*/
function dataLength(data) {
	if (isHexString(data, true)) return (data.length - 2) / 2;
	return getBytes(data).length;
}
/**
*  Returns a [[DataHexString]] by slicing %%data%% from the %%start%%
*  offset to the %%end%% offset.
*
*  By default %%start%% is 0 and %%end%% is the length of %%data%%.
*/
function dataSlice(data, start, end) {
	const bytes = getBytes(data);
	if (end != null && end > bytes.length) assert(false, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
		buffer: bytes,
		length: bytes.length,
		offset: end
	});
	return hexlify(bytes.slice(start == null ? 0 : start, end == null ? bytes.length : end));
}
function zeroPad(data, length, left) {
	const bytes = getBytes(data);
	assert(length >= bytes.length, "padding exceeds data length", "BUFFER_OVERRUN", {
		buffer: new Uint8Array(bytes),
		length,
		offset: length + 1
	});
	const result = new Uint8Array(length);
	result.fill(0);
	if (left) result.set(bytes, length - bytes.length);
	else result.set(bytes, 0);
	return hexlify(result);
}
/**
*  Return the [[DataHexString]] of %%data%% padded on the **left**
*  to %%length%% bytes.
*
*  If %%data%% already exceeds %%length%%, a [[BufferOverrunError]] is
*  thrown.
*
*  This pads data the same as **values** are in Solidity
*  (e.g. ``uint128``).
*/
function zeroPadValue(data, length) {
	return zeroPad(data, length, true);
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/maths.js
/**
*  Some mathematic operations.
*
*  @_subsection: api/utils:Math Helpers  [about-maths]
*/
var BN_0$5 = BigInt(0);
var BN_1$2 = BigInt(1);
var maxValue = 9007199254740991;
/**
*  Convert %%value%% to a twos-compliment representation of
*  %%width%% bits.
*
*  The result will always be positive.
*/
function toTwos(_value, _width) {
	let value = getBigInt(_value, "value");
	const width = BigInt(getNumber(_width, "width"));
	const limit = BN_1$2 << width - BN_1$2;
	if (value < BN_0$5) {
		value = -value;
		assert(value <= limit, "too low", "NUMERIC_FAULT", {
			operation: "toTwos",
			fault: "overflow",
			value: _value
		});
		const mask = (BN_1$2 << width) - BN_1$2;
		return (~value & mask) + BN_1$2;
	} else assert(value < limit, "too high", "NUMERIC_FAULT", {
		operation: "toTwos",
		fault: "overflow",
		value: _value
	});
	return value;
}
/**
*  Mask %%value%% with a bitmask of %%bits%% ones.
*/
function mask(_value, _bits) {
	return getUint(_value, "value") & (BN_1$2 << BigInt(getNumber(_bits, "bits"))) - BN_1$2;
}
/**
*  Gets a BigInt from %%value%%. If it is an invalid value for
*  a BigInt, then an ArgumentError will be thrown for %%name%%.
*/
function getBigInt(value, name) {
	switch (typeof value) {
		case "bigint": return value;
		case "number":
			assertArgument(Number.isInteger(value), "underflow", name || "value", value);
			assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
			return BigInt(value);
		case "string": try {
			if (value === "") throw new Error("empty string");
			if (value[0] === "-" && value[1] !== "-") return -BigInt(value.substring(1));
			return BigInt(value);
		} catch (e) {
			assertArgument(false, `invalid BigNumberish string: ${e.message}`, name || "value", value);
		}
	}
	assertArgument(false, "invalid BigNumberish value", name || "value", value);
}
/**
*  Returns %%value%% as a bigint, validating it is valid as a bigint
*  value and that it is positive.
*/
function getUint(value, name) {
	const result = getBigInt(value, name);
	assert(result >= BN_0$5, "unsigned value cannot be negative", "NUMERIC_FAULT", {
		fault: "overflow",
		operation: "getUint",
		value
	});
	return result;
}
var Nibbles$1 = "0123456789abcdef";
function toBigInt(value) {
	if (value instanceof Uint8Array) {
		let result = "0x0";
		for (const v of value) {
			result += Nibbles$1[v >> 4];
			result += Nibbles$1[v & 15];
		}
		return BigInt(result);
	}
	return getBigInt(value);
}
/**
*  Gets a //number// from %%value%%. If it is an invalid value for
*  a //number//, then an ArgumentError will be thrown for %%name%%.
*/
function getNumber(value, name) {
	switch (typeof value) {
		case "bigint":
			assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
			return Number(value);
		case "number":
			assertArgument(Number.isInteger(value), "underflow", name || "value", value);
			assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
			return value;
		case "string": try {
			if (value === "") throw new Error("empty string");
			return getNumber(BigInt(value), name);
		} catch (e) {
			assertArgument(false, `invalid numeric string: ${e.message}`, name || "value", value);
		}
	}
	assertArgument(false, "invalid numeric value", name || "value", value);
}
/**
*  Converts %%value%% to a Big Endian hexstring, optionally padded to
*  %%width%% bytes.
*/
function toBeHex(_value, _width) {
	const value = getUint(_value, "value");
	let result = value.toString(16);
	if (_width == null) {
		if (result.length % 2) result = "0" + result;
	} else {
		const width = getNumber(_width, "width");
		if (width === 0 && value === BN_0$5) return "0x";
		assert(width * 2 >= result.length, `value exceeds width (${width} bytes)`, "NUMERIC_FAULT", {
			operation: "toBeHex",
			fault: "overflow",
			value: _value
		});
		while (result.length < width * 2) result = "0" + result;
	}
	return "0x" + result;
}
/**
*  Converts %%value%% to a Big Endian Uint8Array.
*/
function toBeArray(_value, _width) {
	const value = getUint(_value, "value");
	if (value === BN_0$5) {
		const width = _width != null ? getNumber(_width, "width") : 0;
		return new Uint8Array(width);
	}
	let hex = value.toString(16);
	if (hex.length % 2) hex = "0" + hex;
	if (_width != null) {
		const width = getNumber(_width, "width");
		while (hex.length < width * 2) hex = "00" + hex;
		assert(width * 2 === hex.length, `value exceeds width (${width} bytes)`, "NUMERIC_FAULT", {
			operation: "toBeArray",
			fault: "overflow",
			value: _value
		});
	}
	const result = new Uint8Array(hex.length / 2);
	for (let i = 0; i < result.length; i++) {
		const offset = i * 2;
		result[i] = parseInt(hex.substring(offset, offset + 2), 16);
	}
	return result;
}
/**
*  Returns a [[HexString]] for %%value%% safe to use as a //Quantity//.
*
*  A //Quantity// does not have and leading 0 values unless the value is
*  the literal value `0x0`. This is most commonly used for JSSON-RPC
*  numeric values.
*/
function toQuantity(value) {
	let result = hexlify(isBytesLike(value) ? value : toBeArray(value)).substring(2);
	while (result.startsWith("0")) result = result.substring(1);
	if (result === "") result = "0";
	return "0x" + result;
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/base58.js
/**
*  The [Base58 Encoding](link-base58) scheme allows a **numeric** value
*  to be encoded as a compact string using a radix of 58 using only
*  alpha-numeric characters. Confusingly similar characters are omitted
*  (i.e. ``"l0O"``).
*
*  Note that Base58 encodes a **numeric** value, not arbitrary bytes,
*  since any zero-bytes on the left would get removed. To mitigate this
*  issue most schemes that use Base58 choose specific high-order values
*  to ensure non-zero prefixes.
*
*  @_subsection: api/utils:Base58 Encoding [about-base58]
*/
var Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var Lookup = null;
function getAlpha(letter) {
	if (Lookup == null) {
		Lookup = {};
		for (let i = 0; i < 58; i++) Lookup[Alphabet[i]] = BigInt(i);
	}
	const result = Lookup[letter];
	assertArgument(result != null, `invalid base58 value`, "letter", letter);
	return result;
}
var BN_0$4 = BigInt(0);
var BN_58 = BigInt(58);
/**
*  Encode %%value%% as a Base58-encoded string.
*/
function encodeBase58(_value) {
	const bytes = getBytes(_value);
	let value = toBigInt(bytes);
	let result = "";
	while (value) {
		result = Alphabet[Number(value % BN_58)] + result;
		value /= BN_58;
	}
	for (let i = 0; i < bytes.length; i++) {
		if (bytes[i]) break;
		result = Alphabet[0] + result;
	}
	return result;
}
/**
*  Decode the Base58-encoded %%value%%.
*/
function decodeBase58(value) {
	let result = BN_0$4;
	for (let i = 0; i < value.length; i++) {
		result *= BN_58;
		result += getAlpha(value[i]);
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/utf8.js
function errorFunc(reason, offset, bytes, output, badCodepoint) {
	assertArgument(false, `invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
}
function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
	if (reason === "BAD_PREFIX" || reason === "UNEXPECTED_CONTINUE") {
		let i = 0;
		for (let o = offset + 1; o < bytes.length; o++) {
			if (bytes[o] >> 6 !== 2) break;
			i++;
		}
		return i;
	}
	if (reason === "OVERRUN") return bytes.length - offset - 1;
	return 0;
}
function replaceFunc(reason, offset, bytes, output, badCodepoint) {
	if (reason === "OVERLONG") {
		assertArgument(typeof badCodepoint === "number", "invalid bad code point for replacement", "badCodepoint", badCodepoint);
		output.push(badCodepoint);
		return 0;
	}
	output.push(65533);
	return ignoreFunc(reason, offset, bytes, output, badCodepoint);
}
Object.freeze({
	error: errorFunc,
	ignore: ignoreFunc,
	replace: replaceFunc
});
/**
*  Returns the UTF-8 byte representation of %%str%%.
*
*  If %%form%% is specified, the string is normalized.
*/
function toUtf8Bytes(str, form) {
	assertArgument(typeof str === "string", "invalid string value", "str", str);
	if (form != null) {
		assertNormalize(form);
		str = str.normalize(form);
	}
	let result = [];
	for (let i = 0; i < str.length; i++) {
		const c = str.charCodeAt(i);
		if (c < 128) result.push(c);
		else if (c < 2048) {
			result.push(c >> 6 | 192);
			result.push(c & 63 | 128);
		} else if ((c & 64512) == 55296) {
			i++;
			const c2 = str.charCodeAt(i);
			assertArgument(i < str.length && (c2 & 64512) === 56320, "invalid surrogate pair", "str", str);
			const pair = 65536 + ((c & 1023) << 10) + (c2 & 1023);
			result.push(pair >> 18 | 240);
			result.push(pair >> 12 & 63 | 128);
			result.push(pair >> 6 & 63 | 128);
			result.push(pair & 63 | 128);
		} else {
			result.push(c >> 12 | 224);
			result.push(c >> 6 & 63 | 128);
			result.push(c & 63 | 128);
		}
	}
	return new Uint8Array(result);
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/rlp-decode.js
function hexlifyByte(value) {
	let result = value.toString(16);
	while (result.length < 2) result = "0" + result;
	return "0x" + result;
}
function unarrayifyInteger(data, offset, length) {
	let result = 0;
	for (let i = 0; i < length; i++) result = result * 256 + data[offset + i];
	return result;
}
function _decodeChildren(data, offset, childOffset, length) {
	const result = [];
	while (childOffset < offset + 1 + length) {
		const decoded = _decode(data, childOffset);
		result.push(decoded.result);
		childOffset += decoded.consumed;
		assert(childOffset <= offset + 1 + length, "child data too short", "BUFFER_OVERRUN", {
			buffer: data,
			length,
			offset
		});
	}
	return {
		consumed: 1 + length,
		result
	};
}
function _decode(data, offset) {
	assert(data.length !== 0, "data too short", "BUFFER_OVERRUN", {
		buffer: data,
		length: 0,
		offset: 1
	});
	const checkOffset = (offset) => {
		assert(offset <= data.length, "data short segment too short", "BUFFER_OVERRUN", {
			buffer: data,
			length: data.length,
			offset
		});
	};
	if (data[offset] >= 248) {
		const lengthLength = data[offset] - 247;
		checkOffset(offset + 1 + lengthLength);
		const length = unarrayifyInteger(data, offset + 1, lengthLength);
		checkOffset(offset + 1 + lengthLength + length);
		return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);
	} else if (data[offset] >= 192) {
		const length = data[offset] - 192;
		checkOffset(offset + 1 + length);
		return _decodeChildren(data, offset, offset + 1, length);
	} else if (data[offset] >= 184) {
		const lengthLength = data[offset] - 183;
		checkOffset(offset + 1 + lengthLength);
		const length = unarrayifyInteger(data, offset + 1, lengthLength);
		checkOffset(offset + 1 + lengthLength + length);
		const result = hexlify(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
		return {
			consumed: 1 + lengthLength + length,
			result
		};
	} else if (data[offset] >= 128) {
		const length = data[offset] - 128;
		checkOffset(offset + 1 + length);
		const result = hexlify(data.slice(offset + 1, offset + 1 + length));
		return {
			consumed: 1 + length,
			result
		};
	}
	return {
		consumed: 1,
		result: hexlifyByte(data[offset])
	};
}
/**
*  Decodes %%data%% into the structured data it represents.
*/
function decodeRlp(_data) {
	const data = getBytes(_data, "data");
	const decoded = _decode(data, 0);
	assertArgument(decoded.consumed === data.length, "unexpected junk after rlp payload", "data", _data);
	return decoded.result;
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/rlp-encode.js
function arrayifyInteger(value) {
	const result = [];
	while (value) {
		result.unshift(value & 255);
		value >>= 8;
	}
	return result;
}
function _encode(object) {
	if (Array.isArray(object)) {
		let payload = [];
		object.forEach(function(child) {
			payload = payload.concat(_encode(child));
		});
		if (payload.length <= 55) {
			payload.unshift(192 + payload.length);
			return payload;
		}
		const length = arrayifyInteger(payload.length);
		length.unshift(247 + length.length);
		return length.concat(payload);
	}
	const data = Array.prototype.slice.call(getBytes(object, "object"));
	if (data.length === 1 && data[0] <= 127) return data;
	else if (data.length <= 55) {
		data.unshift(128 + data.length);
		return data;
	}
	const length = arrayifyInteger(data.length);
	length.unshift(183 + length.length);
	return length.concat(data);
}
var nibbles = "0123456789abcdef";
/**
*  Encodes %%object%% as an RLP-encoded [[DataHexString]].
*/
function encodeRlp(object) {
	let result = "0x";
	for (const v of _encode(object)) {
		result += nibbles[v >> 4];
		result += nibbles[v & 15];
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/utils/uuid.js
/**
*  Explain UUID and link to RFC here.
*
*  @_subsection: api/utils:UUID  [about-uuid]
*/
/**
*  Returns the version 4 [[link-uuid]] for the %%randomBytes%%.
*
*  @see: https://www.ietf.org/rfc/rfc4122.txt (Section 4.4)
*/
function uuidV4(randomBytes) {
	const bytes = getBytes(randomBytes, "randomBytes");
	bytes[6] = bytes[6] & 15 | 64;
	bytes[8] = bytes[8] & 63 | 128;
	const value = hexlify(bytes);
	return [
		value.substring(2, 10),
		value.substring(10, 14),
		value.substring(14, 18),
		value.substring(18, 22),
		value.substring(22, 34)
	].join("-");
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/hmac.js
/**
*  An **HMAC** enables verification that a given key was used
*  to authenticate a payload.
*
*  See: [[link-wiki-hmac]]
*
*  @_subsection: api/crypto:HMAC  [about-hmac]
*/
var locked$4 = false;
var _computeHmac = function(algorithm, key, data) {
	return createHmac(algorithm, key).update(data).digest();
};
var __computeHmac = _computeHmac;
/**
*  Return the HMAC for %%data%% using the %%key%% key with the underlying
*  %%algo%% used for compression.
*
*  @example:
*    key = id("some-secret")
*
*    // Compute the HMAC
*    computeHmac("sha256", key, "0x1337")
*    //_result:
*
*    // To compute the HMAC of UTF-8 data, the data must be
*    // converted to UTF-8 bytes
*    computeHmac("sha256", key, toUtf8Bytes("Hello World"))
*    //_result:
*
*/
function computeHmac(algorithm, _key, _data) {
	const key = getBytes(_key, "key");
	const data = getBytes(_data, "data");
	return hexlify(__computeHmac(algorithm, key, data));
}
computeHmac._ = _computeHmac;
computeHmac.lock = function() {
	locked$4 = true;
};
computeHmac.register = function(func) {
	if (locked$4) throw new Error("computeHmac is locked");
	__computeHmac = func;
};
Object.freeze(computeHmac);
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/keccak.js
/**
*  Cryptographic hashing functions
*
*  @_subsection: api/crypto:Hash Functions [about-crypto-hashing]
*/
var locked$3 = false;
var _keccak256 = function(data) {
	return keccak_256(data);
};
var __keccak256 = _keccak256;
/**
*  Compute the cryptographic KECCAK256 hash of %%data%%.
*
*  The %%data%% **must** be a data representation, to compute the
*  hash of UTF-8 data use the [[id]] function.
*
*  @returns DataHexstring
*  @example:
*    keccak256("0x")
*    //_result:
*
*    keccak256("0x1337")
*    //_result:
*
*    keccak256(new Uint8Array([ 0x13, 0x37 ]))
*    //_result:
*
*    // Strings are assumed to be DataHexString, otherwise it will
*    // throw. To hash UTF-8 data, see the note above.
*    keccak256("Hello World")
*    //_error:
*/
function keccak256(_data) {
	const data = getBytes(_data, "data");
	return hexlify(__keccak256(data));
}
keccak256._ = _keccak256;
keccak256.lock = function() {
	locked$3 = true;
};
keccak256.register = function(func) {
	if (locked$3) throw new TypeError("keccak256 is locked");
	__keccak256 = func;
};
Object.freeze(keccak256);
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/ripemd160.js
var locked$2 = false;
var _ripemd160 = function(data) {
	return ripemd160$1(data);
};
var __ripemd160 = _ripemd160;
/**
*  Compute the cryptographic RIPEMD-160 hash of %%data%%.
*
*  @_docloc: api/crypto:Hash Functions
*  @returns DataHexstring
*
*  @example:
*    ripemd160("0x")
*    //_result:
*
*    ripemd160("0x1337")
*    //_result:
*
*    ripemd160(new Uint8Array([ 0x13, 0x37 ]))
*    //_result:
*
*/
function ripemd160(_data) {
	const data = getBytes(_data, "data");
	return hexlify(__ripemd160(data));
}
ripemd160._ = _ripemd160;
ripemd160.lock = function() {
	locked$2 = true;
};
ripemd160.register = function(func) {
	if (locked$2) throw new TypeError("ripemd160 is locked");
	__ripemd160 = func;
};
Object.freeze(ripemd160);
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/pbkdf2.js
/**
*  A **Password-Based Key-Derivation Function** is designed to create
*  a sequence of bytes suitible as a **key** from a human-rememberable
*  password.
*
*  @_subsection: api/crypto:Passwords  [about-pbkdf]
*/
var locked$1 = false;
var _pbkdf2 = function(password, salt, iterations, keylen, algo) {
	return pbkdf2Sync(password, salt, iterations, keylen, algo);
};
var __pbkdf2 = _pbkdf2;
/**
*  Return the [[link-pbkdf2]] for %%keylen%% bytes for %%password%% using
*  the %%salt%% and using %%iterations%% of %%algo%%.
*
*  This PBKDF is outdated and should not be used in new projects, but is
*  required to decrypt older files.
*
*  @example:
*    // The password must be converted to bytes, and it is generally
*    // best practices to ensure the string has been normalized. Many
*    // formats explicitly indicate the normalization form to use.
*    password = "hello"
*    passwordBytes = toUtf8Bytes(password, "NFKC")
*
*    salt = id("some-salt")
*
*    // Compute the PBKDF2
*    pbkdf2(passwordBytes, salt, 1024, 16, "sha256")
*    //_result:
*/
function pbkdf2(_password, _salt, iterations, keylen, algo) {
	const password = getBytes(_password, "password");
	const salt = getBytes(_salt, "salt");
	return hexlify(__pbkdf2(password, salt, iterations, keylen, algo));
}
pbkdf2._ = _pbkdf2;
pbkdf2.lock = function() {
	locked$1 = true;
};
pbkdf2.register = function(func) {
	if (locked$1) throw new Error("pbkdf2 is locked");
	__pbkdf2 = func;
};
Object.freeze(pbkdf2);
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/random.js
/**
*  A **Cryptographically Secure Random Value** is one that has been
*  generated with additional care take to prevent side-channels
*  from allowing others to detect it and prevent others from through
*  coincidence generate the same values.
*
*  @_subsection: api/crypto:Random Values  [about-crypto-random]
*/
var locked = false;
var _randomBytes = function(length) {
	return new Uint8Array(randomBytes$1(length));
};
var __randomBytes = _randomBytes;
/**
*  Return %%length%% bytes of cryptographically secure random data.
*
*  @example:
*    randomBytes(8)
*    //_result:
*/
function randomBytes(length) {
	return __randomBytes(length);
}
randomBytes._ = _randomBytes;
randomBytes.lock = function() {
	locked = true;
};
randomBytes.register = function(func) {
	if (locked) throw new Error("randomBytes is locked");
	__randomBytes = func;
};
Object.freeze(randomBytes);
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/scrypt.js
var lockedSync = false, lockedAsync = false;
var _scryptAsync = async function(passwd, salt, N, r, p, dkLen, onProgress) {
	return await scryptAsync(passwd, salt, {
		N,
		r,
		p,
		dkLen,
		onProgress
	});
};
var _scryptSync = function(passwd, salt, N, r, p, dkLen) {
	return scrypt$1(passwd, salt, {
		N,
		r,
		p,
		dkLen
	});
};
var __scryptAsync = _scryptAsync;
var __scryptSync = _scryptSync;
/**
*  The [[link-wiki-scrypt]] uses a memory and cpu hard method of
*  derivation to increase the resource cost to brute-force a password
*  for a given key.
*
*  This means this algorithm is intentionally slow, and can be tuned to
*  become slower. As computation and memory speed improve over time,
*  increasing the difficulty maintains the cost of an attacker.
*
*  For example, if a target time of 5 seconds is used, a legitimate user
*  which knows their password requires only 5 seconds to unlock their
*  account. A 6 character password has 68 billion possibilities, which
*  would require an attacker to invest over 10,000 years of CPU time. This
*  is of course a crude example (as password generally aren't random),
*  but demonstrates to value of imposing large costs to decryption.
*
*  For this reason, if building a UI which involved decrypting or
*  encrypting datsa using scrypt, it is recommended to use a
*  [[ProgressCallback]] (as event short periods can seem lik an eternity
*  if the UI freezes). Including the phrase //"decrypting"// in the UI
*  can also help, assuring the user their waiting is for a good reason.
*
*  @_docloc: api/crypto:Passwords
*
*  @example:
*    // The password must be converted to bytes, and it is generally
*    // best practices to ensure the string has been normalized. Many
*    // formats explicitly indicate the normalization form to use.
*    password = "hello"
*    passwordBytes = toUtf8Bytes(password, "NFKC")
*
*    salt = id("some-salt")
*
*    // Compute the scrypt
*    scrypt(passwordBytes, salt, 1024, 8, 1, 16)
*    //_result:
*/
async function scrypt(_passwd, _salt, N, r, p, dkLen, progress) {
	const passwd = getBytes(_passwd, "passwd");
	const salt = getBytes(_salt, "salt");
	return hexlify(await __scryptAsync(passwd, salt, N, r, p, dkLen, progress));
}
scrypt._ = _scryptAsync;
scrypt.lock = function() {
	lockedAsync = true;
};
scrypt.register = function(func) {
	if (lockedAsync) throw new Error("scrypt is locked");
	__scryptAsync = func;
};
Object.freeze(scrypt);
/**
*  Provides a synchronous variant of [[scrypt]].
*
*  This will completely lock up and freeze the UI in a browser and will
*  prevent any event loop from progressing. For this reason, it is
*  preferred to use the [async variant](scrypt).
*
*  @_docloc: api/crypto:Passwords
*
*  @example:
*    // The password must be converted to bytes, and it is generally
*    // best practices to ensure the string has been normalized. Many
*    // formats explicitly indicate the normalization form to use.
*    password = "hello"
*    passwordBytes = toUtf8Bytes(password, "NFKC")
*
*    salt = id("some-salt")
*
*    // Compute the scrypt
*    scryptSync(passwordBytes, salt, 1024, 8, 1, 16)
*    //_result:
*/
function scryptSync(_passwd, _salt, N, r, p, dkLen) {
	const passwd = getBytes(_passwd, "passwd");
	const salt = getBytes(_salt, "salt");
	return hexlify(__scryptSync(passwd, salt, N, r, p, dkLen));
}
scryptSync._ = _scryptSync;
scryptSync.lock = function() {
	lockedSync = true;
};
scryptSync.register = function(func) {
	if (lockedSync) throw new Error("scryptSync is locked");
	__scryptSync = func;
};
Object.freeze(scryptSync);
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/sha2.js
var _sha256 = function(data) {
	return createHash("sha256").update(data).digest();
};
var _sha512 = function(data) {
	return createHash("sha512").update(data).digest();
};
var __sha256 = _sha256;
var __sha512 = _sha512;
var locked256 = false, locked512 = false;
/**
*  Compute the cryptographic SHA2-256 hash of %%data%%.
*
*  @_docloc: api/crypto:Hash Functions
*  @returns DataHexstring
*
*  @example:
*    sha256("0x")
*    //_result:
*
*    sha256("0x1337")
*    //_result:
*
*    sha256(new Uint8Array([ 0x13, 0x37 ]))
*    //_result:
*
*/
function sha256(_data) {
	const data = getBytes(_data, "data");
	return hexlify(__sha256(data));
}
sha256._ = _sha256;
sha256.lock = function() {
	locked256 = true;
};
sha256.register = function(func) {
	if (locked256) throw new Error("sha256 is locked");
	__sha256 = func;
};
Object.freeze(sha256);
/**
*  Compute the cryptographic SHA2-512 hash of %%data%%.
*
*  @_docloc: api/crypto:Hash Functions
*  @returns DataHexstring
*
*  @example:
*    sha512("0x")
*    //_result:
*
*    sha512("0x1337")
*    //_result:
*
*    sha512(new Uint8Array([ 0x13, 0x37 ]))
*    //_result:
*/
function sha512(_data) {
	const data = getBytes(_data, "data");
	return hexlify(__sha512(data));
}
sha512._ = _sha512;
sha512.lock = function() {
	locked512 = true;
};
sha512.register = function(func) {
	if (locked512) throw new Error("sha512 is locked");
	__sha512 = func;
};
Object.freeze(sha256);
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/constants/addresses.js
/**
*  A constant for the zero address.
*
*  (**i.e.** ``"0x0000000000000000000000000000000000000000"``)
*/
var ZeroAddress = "0x0000000000000000000000000000000000000000";
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/constants/hashes.js
/**
*  A constant for the zero hash.
*
*  (**i.e.** ``"0x0000000000000000000000000000000000000000000000000000000000000000"``)
*/
var ZeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/constants/strings.js
/**
*  A constant for the [[link-eip-191]] personal message prefix.
*
*  (**i.e.** ``"\\x19Ethereum Signed Message:\\n"``)
*/
var MessagePrefix = "Ethereum Signed Message:\n";
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/signature.js
var BN_0$3 = BigInt(0);
var BN_1$1 = BigInt(1);
var BN_2$1 = BigInt(2);
var BN_27$1 = BigInt(27);
var BN_28$1 = BigInt(28);
var BN_35$1 = BigInt(35);
var BN_N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var BN_N_2 = BN_N / BN_2$1;
var inspect$1 = Symbol.for("nodejs.util.inspect.custom");
var _guard$2 = {};
function toUint256(value) {
	return zeroPadValue(toBeArray(value), 32);
}
/**
*  A Signature  @TODO
*
*
*  @_docloc: api/crypto:Signing
*/
var Signature = class Signature {
	#r;
	#s;
	#v;
	#networkV;
	/**
	*  The ``r`` value for a signature.
	*
	*  This represents the ``x`` coordinate of a "reference" or
	*  challenge point, from which the ``y`` can be computed.
	*/
	get r() {
		return this.#r;
	}
	set r(value) {
		assertArgument(dataLength(value) === 32, "invalid r", "value", value);
		this.#r = hexlify(value);
	}
	/**
	*  The ``s`` value for a signature.
	*/
	get s() {
		assertArgument(parseInt(this.#s.substring(0, 3)) < 8, "non-canonical s; use ._s", "s", this.#s);
		return this.#s;
	}
	set s(_value) {
		assertArgument(dataLength(_value) === 32, "invalid s", "value", _value);
		this.#s = hexlify(_value);
	}
	/**
	*  Return the s value, unchecked for EIP-2 compliance.
	*
	*  This should generally not be used and is for situations where
	*  a non-canonical S value might be relevant, such as Frontier blocks
	*  that were mined prior to EIP-2 or invalid Authorization List
	*  signatures.
	*/
	get _s() {
		return this.#s;
	}
	/**
	*  Returns true if the Signature is valid for [[link-eip-2]] signatures.
	*/
	isValid() {
		return BigInt(this.#s) <= BN_N_2;
	}
	/**
	*  The ``v`` value for a signature.
	*
	*  Since a given ``x`` value for ``r`` has two possible values for
	*  its correspondin ``y``, the ``v`` indicates which of the two ``y``
	*  values to use.
	*
	*  It is normalized to the values ``27`` or ``28`` for legacy
	*  purposes.
	*/
	get v() {
		return this.#v;
	}
	set v(value) {
		const v = getNumber(value, "value");
		assertArgument(v === 27 || v === 28, "invalid v", "v", value);
		this.#v = v;
	}
	/**
	*  The EIP-155 ``v`` for legacy transactions. For non-legacy
	*  transactions, this value is ``null``.
	*/
	get networkV() {
		return this.#networkV;
	}
	/**
	*  The chain ID for EIP-155 legacy transactions. For non-legacy
	*  transactions, this value is ``null``.
	*/
	get legacyChainId() {
		const v = this.networkV;
		if (v == null) return null;
		return Signature.getChainId(v);
	}
	/**
	*  The ``yParity`` for the signature.
	*
	*  See ``v`` for more details on how this value is used.
	*/
	get yParity() {
		return this.v === 27 ? 0 : 1;
	}
	/**
	*  The [[link-eip-2098]] compact representation of the ``yParity``
	*  and ``s`` compacted into a single ``bytes32``.
	*/
	get yParityAndS() {
		const yParityAndS = getBytes(this.s);
		if (this.yParity) yParityAndS[0] |= 128;
		return hexlify(yParityAndS);
	}
	/**
	*  The [[link-eip-2098]] compact representation.
	*/
	get compactSerialized() {
		return concat([this.r, this.yParityAndS]);
	}
	/**
	*  The serialized representation.
	*/
	get serialized() {
		return concat([
			this.r,
			this.s,
			this.yParity ? "0x1c" : "0x1b"
		]);
	}
	/**
	*  @private
	*/
	constructor(guard, r, s, v) {
		assertPrivate(guard, _guard$2, "Signature");
		this.#r = r;
		this.#s = s;
		this.#v = v;
		this.#networkV = null;
	}
	/**
	*  Returns the canonical signature.
	*
	*  This is only necessary when dealing with legacy transaction which
	*  did not enforce canonical S values (i.e. [[link-eip-2]]. Most
	*  developers should never require this.
	*/
	getCanonical() {
		if (this.isValid()) return this;
		const s = BN_N - BigInt(this._s);
		const v = 55 - this.v;
		const result = new Signature(_guard$2, this.r, toUint256(s), v);
		if (this.networkV) result.#networkV = this.networkV;
		return result;
	}
	/**
	*  Returns a new identical [[Signature]].
	*/
	clone() {
		const clone = new Signature(_guard$2, this.r, this._s, this.v);
		if (this.networkV) clone.#networkV = this.networkV;
		return clone;
	}
	/**
	*  Returns a representation that is compatible with ``JSON.stringify``.
	*/
	toJSON() {
		const networkV = this.networkV;
		return {
			_type: "signature",
			networkV: networkV != null ? networkV.toString() : null,
			r: this.r,
			s: this._s,
			v: this.v
		};
	}
	[inspect$1]() {
		return this.toString();
	}
	toString() {
		if (this.isValid()) return `Signature { r: ${this.r}, s: ${this._s}, v: ${this.v} }`;
		return `Signature { r: ${this.r}, s: ${this._s}, v: ${this.v}, valid: false }`;
	}
	/**
	*  Compute the chain ID from the ``v`` in a legacy EIP-155 transactions.
	*
	*  @example:
	*    Signature.getChainId(45)
	*    //_result:
	*
	*    Signature.getChainId(46)
	*    //_result:
	*/
	static getChainId(v) {
		const bv = getBigInt(v, "v");
		if (bv == BN_27$1 || bv == BN_28$1) return BN_0$3;
		assertArgument(bv >= BN_35$1, "invalid EIP-155 v", "v", v);
		return (bv - BN_35$1) / BN_2$1;
	}
	/**
	*  Compute the ``v`` for a chain ID for a legacy EIP-155 transactions.
	*
	*  Legacy transactions which use [[link-eip-155]] hijack the ``v``
	*  property to include the chain ID.
	*
	*  @example:
	*    Signature.getChainIdV(5, 27)
	*    //_result:
	*
	*    Signature.getChainIdV(5, 28)
	*    //_result:
	*
	*/
	static getChainIdV(chainId, v) {
		return getBigInt(chainId) * BN_2$1 + BigInt(35 + v - 27);
	}
	/**
	*  Compute the normalized legacy transaction ``v`` from a ``yParirty``,
	*  a legacy transaction ``v`` or a legacy [[link-eip-155]] transaction.
	*
	*  @example:
	*    // The values 0 and 1 imply v is actually yParity
	*    Signature.getNormalizedV(0)
	*    //_result:
	*
	*    // Legacy non-EIP-1559 transaction (i.e. 27 or 28)
	*    Signature.getNormalizedV(27)
	*    //_result:
	*
	*    // Legacy EIP-155 transaction (i.e. >= 35)
	*    Signature.getNormalizedV(46)
	*    //_result:
	*
	*    // Invalid values throw
	*    Signature.getNormalizedV(5)
	*    //_error:
	*/
	static getNormalizedV(v) {
		const bv = getBigInt(v);
		if (bv === BN_0$3 || bv === BN_27$1) return 27;
		if (bv === BN_1$1 || bv === BN_28$1) return 28;
		assertArgument(bv >= BN_35$1, "invalid v", "v", v);
		return bv & BN_1$1 ? 27 : 28;
	}
	/**
	*  Creates a new [[Signature]].
	*
	*  If no %%sig%% is provided, a new [[Signature]] is created
	*  with default values.
	*
	*  If %%sig%% is a string, it is parsed.
	*/
	static from(sig) {
		function assertError(check, message) {
			assertArgument(check, message, "signature", sig);
		}
		if (sig == null) return new Signature(_guard$2, ZeroHash, ZeroHash, 27);
		if (typeof sig === "string") {
			const bytes = getBytes(sig, "signature");
			if (bytes.length === 64) {
				const r = hexlify(bytes.slice(0, 32));
				const s = bytes.slice(32, 64);
				const v = s[0] & 128 ? 28 : 27;
				s[0] &= 127;
				return new Signature(_guard$2, r, hexlify(s), v);
			}
			if (bytes.length === 65) return new Signature(_guard$2, hexlify(bytes.slice(0, 32)), hexlify(bytes.slice(32, 64)), Signature.getNormalizedV(bytes[64]));
			assertError(false, "invalid raw signature length");
		}
		if (sig instanceof Signature) return sig.clone();
		const _r = sig.r;
		assertError(_r != null, "missing r");
		const r = toUint256(_r);
		const s = (function(s, yParityAndS) {
			if (s != null) return toUint256(s);
			if (yParityAndS != null) {
				assertError(isHexString(yParityAndS, 32), "invalid yParityAndS");
				const bytes = getBytes(yParityAndS);
				bytes[0] &= 127;
				return hexlify(bytes);
			}
			assertError(false, "missing s");
		})(sig.s, sig.yParityAndS);
		const { networkV, v } = (function(_v, yParityAndS, yParity) {
			if (_v != null) {
				const v = getBigInt(_v);
				return {
					networkV: v >= BN_35$1 ? v : void 0,
					v: Signature.getNormalizedV(v)
				};
			}
			if (yParityAndS != null) {
				assertError(isHexString(yParityAndS, 32), "invalid yParityAndS");
				return { v: getBytes(yParityAndS)[0] & 128 ? 28 : 27 };
			}
			if (yParity != null) {
				switch (getNumber(yParity, "sig.yParity")) {
					case 0: return { v: 27 };
					case 1: return { v: 28 };
				}
				assertError(false, "invalid yParity");
			}
			assertError(false, "missing v");
		})(sig.v, sig.yParityAndS, sig.yParity);
		const result = new Signature(_guard$2, r, s, v);
		if (networkV) result.#networkV = networkV;
		assertError(sig.yParity == null || getNumber(sig.yParity, "sig.yParity") === result.yParity, "yParity mismatch");
		assertError(sig.yParityAndS == null || sig.yParityAndS === result.yParityAndS, "yParityAndS mismatch");
		return result;
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/crypto/signing-key.js
/**
*  Add details about signing here.
*
*  @_subsection: api/crypto:Signing  [about-signing]
*/
/**
*  A **SigningKey** provides high-level access to the elliptic curve
*  cryptography (ECC) operations and key management.
*/
var SigningKey = class SigningKey {
	#privateKey;
	/**
	*  Creates a new **SigningKey** for %%privateKey%%.
	*/
	constructor(privateKey) {
		assertArgument(dataLength(privateKey) === 32, "invalid private key", "privateKey", "[REDACTED]");
		this.#privateKey = hexlify(privateKey);
	}
	/**
	*  The private key.
	*/
	get privateKey() {
		return this.#privateKey;
	}
	/**
	*  The uncompressed public key.
	*
	* This will always begin with the prefix ``0x04`` and be 132
	* characters long (the ``0x`` prefix and 130 hexadecimal nibbles).
	*/
	get publicKey() {
		return SigningKey.computePublicKey(this.#privateKey);
	}
	/**
	*  The compressed public key.
	*
	*  This will always begin with either the prefix ``0x02`` or ``0x03``
	*  and be 68 characters long (the ``0x`` prefix and 33 hexadecimal
	*  nibbles)
	*/
	get compressedPublicKey() {
		return SigningKey.computePublicKey(this.#privateKey, true);
	}
	/**
	*  Return the signature of the signed %%digest%%.
	*/
	sign(digest) {
		assertArgument(dataLength(digest) === 32, "invalid digest length", "digest", digest);
		const sig = secp256k1.sign(getBytesCopy(digest), getBytesCopy(this.#privateKey), { lowS: true });
		return Signature.from({
			r: toBeHex(sig.r, 32),
			s: toBeHex(sig.s, 32),
			v: sig.recovery ? 28 : 27
		});
	}
	/**
	*  Returns the [[link-wiki-ecdh]] shared secret between this
	*  private key and the %%other%% key.
	*
	*  The %%other%% key may be any type of key, a raw public key,
	*  a compressed/uncompressed pubic key or aprivate key.
	*
	*  Best practice is usually to use a cryptographic hash on the
	*  returned value before using it as a symetric secret.
	*
	*  @example:
	*    sign1 = new SigningKey(id("some-secret-1"))
	*    sign2 = new SigningKey(id("some-secret-2"))
	*
	*    // Notice that privA.computeSharedSecret(pubB)...
	*    sign1.computeSharedSecret(sign2.publicKey)
	*    //_result:
	*
	*    // ...is equal to privB.computeSharedSecret(pubA).
	*    sign2.computeSharedSecret(sign1.publicKey)
	*    //_result:
	*/
	computeSharedSecret(other) {
		const pubKey = SigningKey.computePublicKey(other);
		return hexlify(secp256k1.getSharedSecret(getBytesCopy(this.#privateKey), getBytes(pubKey), false));
	}
	/**
	*  Compute the public key for %%key%%, optionally %%compressed%%.
	*
	*  The %%key%% may be any type of key, a raw public key, a
	*  compressed/uncompressed public key or private key.
	*
	*  @example:
	*    sign = new SigningKey(id("some-secret"));
	*
	*    // Compute the uncompressed public key for a private key
	*    SigningKey.computePublicKey(sign.privateKey)
	*    //_result:
	*
	*    // Compute the compressed public key for a private key
	*    SigningKey.computePublicKey(sign.privateKey, true)
	*    //_result:
	*
	*    // Compute the uncompressed public key
	*    SigningKey.computePublicKey(sign.publicKey, false);
	*    //_result:
	*
	*    // Compute the Compressed a public key
	*    SigningKey.computePublicKey(sign.publicKey, true);
	*    //_result:
	*/
	static computePublicKey(key, compressed) {
		let bytes = getBytes(key, "key");
		if (bytes.length === 32) return hexlify(secp256k1.getPublicKey(bytes, !!compressed));
		if (bytes.length === 64) {
			const pub = new Uint8Array(65);
			pub[0] = 4;
			pub.set(bytes, 1);
			bytes = pub;
		}
		return hexlify(secp256k1.ProjectivePoint.fromHex(bytes).toRawBytes(compressed));
	}
	/**
	*  Returns the public key for the private key which produced the
	*  %%signature%% for the given %%digest%%.
	*
	*  @example:
	*    key = new SigningKey(id("some-secret"))
	*    digest = id("hello world")
	*    sig = key.sign(digest)
	*
	*    // Notice the signer public key...
	*    key.publicKey
	*    //_result:
	*
	*    // ...is equal to the recovered public key
	*    SigningKey.recoverPublicKey(digest, sig)
	*    //_result:
	*
	*/
	static recoverPublicKey(digest, signature) {
		assertArgument(dataLength(digest) === 32, "invalid digest length", "digest", digest);
		const sig = Signature.from(signature);
		let secpSig = secp256k1.Signature.fromCompact(getBytesCopy(concat([sig.r, sig.s])));
		secpSig = secpSig.addRecoveryBit(sig.yParity);
		const pubKey = secpSig.recoverPublicKey(getBytesCopy(digest));
		assertArgument(pubKey != null, "invalid signature for digest", "signature", signature);
		return "0x" + pubKey.toHex(false);
	}
	/**
	*  Returns the point resulting from adding the ellipic curve points
	*  %%p0%% and %%p1%%.
	*
	*  This is not a common function most developers should require, but
	*  can be useful for certain privacy-specific techniques.
	*
	*  For example, it is used by [[HDNodeWallet]] to compute child
	*  addresses from parent public keys and chain codes.
	*/
	static addPoints(p0, p1, compressed) {
		const pub0 = secp256k1.ProjectivePoint.fromHex(SigningKey.computePublicKey(p0).substring(2));
		const pub1 = secp256k1.ProjectivePoint.fromHex(SigningKey.computePublicKey(p1).substring(2));
		return "0x" + pub0.add(pub1).toHex(!!compressed);
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/address/address.js
var BN_0$2 = BigInt(0);
var BN_36 = BigInt(36);
function getChecksumAddress(address) {
	address = address.toLowerCase();
	const chars = address.substring(2).split("");
	const expanded = new Uint8Array(40);
	for (let i = 0; i < 40; i++) expanded[i] = chars[i].charCodeAt(0);
	const hashed = getBytes(keccak256(expanded));
	for (let i = 0; i < 40; i += 2) {
		if (hashed[i >> 1] >> 4 >= 8) chars[i] = chars[i].toUpperCase();
		if ((hashed[i >> 1] & 15) >= 8) chars[i + 1] = chars[i + 1].toUpperCase();
	}
	return "0x" + chars.join("");
}
var ibanLookup = {};
for (let i = 0; i < 10; i++) ibanLookup[String(i)] = String(i);
for (let i = 0; i < 26; i++) ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
var safeDigits = 15;
function ibanChecksum(address) {
	address = address.toUpperCase();
	address = address.substring(4) + address.substring(0, 2) + "00";
	let expanded = address.split("").map((c) => {
		return ibanLookup[c];
	}).join("");
	while (expanded.length >= safeDigits) {
		let block = expanded.substring(0, safeDigits);
		expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
	}
	let checksum = String(98 - parseInt(expanded, 10) % 97);
	while (checksum.length < 2) checksum = "0" + checksum;
	return checksum;
}
var Base36 = (function() {
	const result = {};
	for (let i = 0; i < 36; i++) {
		const key = "0123456789abcdefghijklmnopqrstuvwxyz"[i];
		result[key] = BigInt(i);
	}
	return result;
})();
function fromBase36(value) {
	value = value.toLowerCase();
	let result = BN_0$2;
	for (let i = 0; i < value.length; i++) result = result * BN_36 + Base36[value[i]];
	return result;
}
/**
*  Returns a normalized and checksumed address for %%address%%.
*  This accepts non-checksum addresses, checksum addresses and
*  [[getIcapAddress]] formats.
*
*  The checksum in Ethereum uses the capitalization (upper-case
*  vs lower-case) of the characters within an address to encode
*  its checksum, which offers, on average, a checksum of 15-bits.
*
*  If %%address%% contains both upper-case and lower-case, it is
*  assumed to already be a checksum address and its checksum is
*  validated, and if the address fails its expected checksum an
*  error is thrown.
*
*  If you wish the checksum of %%address%% to be ignore, it should
*  be converted to lower-case (i.e. ``.toLowercase()``) before
*  being passed in. This should be a very rare situation though,
*  that you wish to bypass the safegaurds in place to protect
*  against an address that has been incorrectly copied from another
*  source.
*
*  @example:
*    // Adds the checksum (via upper-casing specific letters)
*    getAddress("0x8ba1f109551bd432803012645ac136ddd64dba72")
*    //_result:
*
*    // Converts ICAP address and adds checksum
*    getAddress("XE65GB6LDNXYOFTX0NSV3FUWKOWIXAMJK36");
*    //_result:
*
*    // Throws an error if an address contains mixed case,
*    // but the checksum fails
*    getAddress("0x8Ba1f109551bD432803012645Ac136ddd64DBA72")
*    //_error:
*/
function getAddress(address) {
	assertArgument(typeof address === "string", "invalid address", "address", address);
	if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
		if (!address.startsWith("0x")) address = "0x" + address;
		const result = getChecksumAddress(address);
		assertArgument(!address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || result === address, "bad address checksum", "address", address);
		return result;
	}
	if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
		assertArgument(address.substring(2, 4) === ibanChecksum(address), "bad icap checksum", "address", address);
		let result = fromBase36(address.substring(4)).toString(16);
		while (result.length < 40) result = "0" + result;
		return getChecksumAddress("0x" + result);
	}
	assertArgument(false, "invalid address", "address", address);
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/address/checks.js
/**
*  Returns true if %%value%% is an object which implements the
*  [[Addressable]] interface.
*
*  @example:
*    // Wallets and AbstractSigner sub-classes
*    isAddressable(Wallet.createRandom())
*    //_result:
*
*    // Contracts
*    contract = new Contract("dai.tokens.ethers.eth", [ ], provider)
*    isAddressable(contract)
*    //_result:
*/
function isAddressable(value) {
	return value && typeof value.getAddress === "function";
}
async function checkAddress(target, promise) {
	const result = await promise;
	if (result == null || result === "0x0000000000000000000000000000000000000000") {
		assert(typeof target !== "string", "unconfigured name", "UNCONFIGURED_NAME", { value: target });
		assertArgument(false, "invalid AddressLike value; did not resolve to a value address", "target", target);
	}
	return getAddress(result);
}
/**
*  Resolves to an address for the %%target%%, which may be any
*  supported address type, an [[Addressable]] or a Promise which
*  resolves to an address.
*
*  If an ENS name is provided, but that name has not been correctly
*  configured a [[UnconfiguredNameError]] is thrown.
*
*  @example:
*    addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
*
*    // Addresses are return synchronously
*    resolveAddress(addr, provider)
*    //_result:
*
*    // Address promises are resolved asynchronously
*    resolveAddress(Promise.resolve(addr))
*    //_result:
*
*    // ENS names are resolved asynchronously
*    resolveAddress("dai.tokens.ethers.eth", provider)
*    //_result:
*
*    // Addressable objects are resolved asynchronously
*    contract = new Contract(addr, [ ])
*    resolveAddress(contract, provider)
*    //_result:
*
*    // Unconfigured ENS names reject
*    resolveAddress("nothing-here.ricmoo.eth", provider)
*    //_error:
*
*    // ENS names require a NameResolver object passed in
*    // (notice the provider was omitted)
*    resolveAddress("nothing-here.ricmoo.eth")
*    //_error:
*/
function resolveAddress(target, resolver) {
	if (typeof target === "string") {
		if (target.match(/^0x[0-9a-f]{40}$/i)) return getAddress(target);
		assert(resolver != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" });
		return checkAddress(target, resolver.resolveName(target));
	} else if (isAddressable(target)) return checkAddress(target, target.getAddress());
	else if (target && typeof target.then === "function") return checkAddress(target, target);
	assertArgument(false, "unsupported addressable value", "target", target);
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/transaction/accesslist.js
function accessSetify(addr, storageKeys) {
	return {
		address: getAddress(addr),
		storageKeys: storageKeys.map((storageKey, index) => {
			assertArgument(isHexString(storageKey, 32), "invalid slot", `storageKeys[${index}]`, storageKey);
			return storageKey.toLowerCase();
		})
	};
}
/**
*  Returns a [[AccessList]] from any ethers-supported access-list structure.
*/
function accessListify(value) {
	if (Array.isArray(value)) return value.map((set, index) => {
		if (Array.isArray(set)) {
			assertArgument(set.length === 2, "invalid slot set", `value[${index}]`, set);
			return accessSetify(set[0], set[1]);
		}
		assertArgument(set != null && typeof set === "object", "invalid address-slot set", "value", value);
		return accessSetify(set.address, set.storageKeys);
	});
	assertArgument(value != null && typeof value === "object", "invalid access list", "value", value);
	const result = Object.keys(value).map((addr) => {
		const storageKeys = value[addr].reduce((accum, storageKey) => {
			accum[storageKey] = true;
			return accum;
		}, {});
		return accessSetify(addr, Object.keys(storageKeys).sort());
	});
	result.sort((a, b) => a.address.localeCompare(b.address));
	return result;
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/transaction/authorization.js
function authorizationify(auth) {
	return {
		address: getAddress(auth.address),
		nonce: getBigInt(auth.nonce != null ? auth.nonce : 0),
		chainId: getBigInt(auth.chainId != null ? auth.chainId : 0),
		signature: Signature.from(auth.signature)
	};
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/transaction/address.js
/**
*  Returns the address for the %%key%%.
*
*  The key may be any standard form of public key or a private key.
*/
function computeAddress(key) {
	let pubkey;
	if (typeof key === "string") pubkey = SigningKey.computePublicKey(key, false);
	else pubkey = key.publicKey;
	return getAddress(keccak256("0x" + pubkey.substring(4)).substring(26));
}
/**
*  Returns the recovered address for the private key that was
*  used to sign %%digest%% that resulted in %%signature%%.
*/
function recoverAddress(digest, signature) {
	return computeAddress(SigningKey.recoverPublicKey(digest, signature));
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/transaction/transaction.js
var BN_0$1 = BigInt(0);
var BN_2 = BigInt(2);
var BN_27 = BigInt(27);
var BN_28 = BigInt(28);
var BN_35 = BigInt(35);
var BN_MAX_UINT = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var inspect = Symbol.for("nodejs.util.inspect.custom");
var BLOB_SIZE = 4096 * 32;
var CELL_COUNT = 128;
function getKzgLibrary(kzg) {
	const blobToKzgCommitment = (blob) => {
		if ("computeBlobProof" in kzg) {
			if ("blobToKzgCommitment" in kzg && typeof kzg.blobToKzgCommitment === "function") return getBytes(kzg.blobToKzgCommitment(hexlify(blob)));
		} else if ("blobToKzgCommitment" in kzg && typeof kzg.blobToKzgCommitment === "function") return getBytes(kzg.blobToKzgCommitment(blob));
		if ("blobToKZGCommitment" in kzg && typeof kzg.blobToKZGCommitment === "function") return getBytes(kzg.blobToKZGCommitment(hexlify(blob)));
		assertArgument(false, "unsupported KZG library", "kzg", kzg);
	};
	const computeBlobKzgProof = (blob, commitment) => {
		if ("computeBlobProof" in kzg && typeof kzg.computeBlobProof === "function") return getBytes(kzg.computeBlobProof(hexlify(blob), hexlify(commitment)));
		if ("computeBlobKzgProof" in kzg && typeof kzg.computeBlobKzgProof === "function") return kzg.computeBlobKzgProof(blob, commitment);
		if ("computeBlobKZGProof" in kzg && typeof kzg.computeBlobKZGProof === "function") return getBytes(kzg.computeBlobKZGProof(hexlify(blob), hexlify(commitment)));
		assertArgument(false, "unsupported KZG library", "kzg", kzg);
	};
	return {
		blobToKzgCommitment,
		computeBlobKzgProof
	};
}
function getVersionedHash(version, hash) {
	let versioned = version.toString(16);
	while (versioned.length < 2) versioned = "0" + versioned;
	versioned += sha256(hash).substring(4);
	return "0x" + versioned;
}
function handleAddress(value) {
	if (value === "0x") return null;
	return getAddress(value);
}
function handleAccessList(value, param) {
	try {
		return accessListify(value);
	} catch (error) {
		assertArgument(false, error.message, param, value);
	}
}
function handleAuthorizationList(value, param) {
	try {
		if (!Array.isArray(value)) throw new Error("authorizationList: invalid array");
		const result = [];
		for (let i = 0; i < value.length; i++) {
			const auth = value[i];
			if (!Array.isArray(auth)) throw new Error(`authorization[${i}]: invalid array`);
			if (auth.length !== 6) throw new Error(`authorization[${i}]: wrong length`);
			if (!auth[1]) throw new Error(`authorization[${i}]: null address`);
			result.push({
				address: handleAddress(auth[1]),
				nonce: handleUint(auth[2], "nonce"),
				chainId: handleUint(auth[0], "chainId"),
				signature: Signature.from({
					yParity: handleNumber(auth[3], "yParity"),
					r: zeroPadValue(auth[4], 32),
					s: zeroPadValue(auth[5], 32)
				})
			});
		}
		return result;
	} catch (error) {
		assertArgument(false, error.message, param, value);
	}
}
function handleNumber(_value, param) {
	if (_value === "0x") return 0;
	return getNumber(_value, param);
}
function handleUint(_value, param) {
	if (_value === "0x") return BN_0$1;
	const value = getBigInt(_value, param);
	assertArgument(value <= BN_MAX_UINT, "value exceeds uint size", param, value);
	return value;
}
function formatNumber(_value, name) {
	const value = getBigInt(_value, "value");
	const result = toBeArray(value);
	assertArgument(result.length <= 32, `value too large`, `tx.${name}`, value);
	return result;
}
function formatAccessList(value) {
	return accessListify(value).map((set) => [set.address, set.storageKeys]);
}
function formatAuthorizationList(value) {
	return value.map((a) => {
		return [
			formatNumber(a.chainId, "chainId"),
			a.address,
			formatNumber(a.nonce, "nonce"),
			formatNumber(a.signature.yParity, "yParity"),
			toBeArray(a.signature.r),
			toBeArray(a.signature._s)
		];
	});
}
function formatHashes(value, param) {
	assertArgument(Array.isArray(value), `invalid ${param}`, "value", value);
	for (let i = 0; i < value.length; i++) assertArgument(isHexString(value[i], 32), "invalid ${ param } hash", `value[${i}]`, value[i]);
	return value;
}
function _parseLegacy(data) {
	const fields = decodeRlp(data);
	assertArgument(Array.isArray(fields) && (fields.length === 9 || fields.length === 6), "invalid field count for legacy transaction", "data", data);
	const tx = {
		type: 0,
		nonce: handleNumber(fields[0], "nonce"),
		gasPrice: handleUint(fields[1], "gasPrice"),
		gasLimit: handleUint(fields[2], "gasLimit"),
		to: handleAddress(fields[3]),
		value: handleUint(fields[4], "value"),
		data: hexlify(fields[5]),
		chainId: BN_0$1
	};
	if (fields.length === 6) return tx;
	const v = handleUint(fields[6], "v");
	const r = handleUint(fields[7], "r");
	const s = handleUint(fields[8], "s");
	if (r === BN_0$1 && s === BN_0$1) tx.chainId = v;
	else {
		let chainId = (v - BN_35) / BN_2;
		if (chainId < BN_0$1) chainId = BN_0$1;
		tx.chainId = chainId;
		assertArgument(chainId !== BN_0$1 || v === BN_27 || v === BN_28, "non-canonical legacy v", "v", fields[6]);
		tx.signature = Signature.from({
			r: zeroPadValue(fields[7], 32),
			s: zeroPadValue(fields[8], 32),
			v
		});
	}
	return tx;
}
function _serializeLegacy(tx, sig) {
	const fields = [
		formatNumber(tx.nonce, "nonce"),
		formatNumber(tx.gasPrice || 0, "gasPrice"),
		formatNumber(tx.gasLimit, "gasLimit"),
		tx.to || "0x",
		formatNumber(tx.value, "value"),
		tx.data
	];
	let chainId = BN_0$1;
	if (tx.chainId != BN_0$1) {
		chainId = getBigInt(tx.chainId, "tx.chainId");
		assertArgument(!sig || sig.networkV == null || sig.legacyChainId === chainId, "tx.chainId/sig.v mismatch", "sig", sig);
	} else if (tx.signature) {
		const legacy = tx.signature.legacyChainId;
		if (legacy != null) chainId = legacy;
	}
	if (!sig) {
		if (chainId !== BN_0$1) {
			fields.push(toBeArray(chainId));
			fields.push("0x");
			fields.push("0x");
		}
		return encodeRlp(fields);
	}
	let v = BigInt(27 + sig.yParity);
	if (chainId !== BN_0$1) v = Signature.getChainIdV(chainId, sig.v);
	else if (BigInt(sig.v) !== v) assertArgument(false, "tx.chainId/sig.v mismatch", "sig", sig);
	fields.push(toBeArray(v));
	fields.push(toBeArray(sig.r));
	fields.push(toBeArray(sig._s));
	return encodeRlp(fields);
}
function _parseEipSignature(tx, fields) {
	let yParity;
	try {
		yParity = handleNumber(fields[0], "yParity");
		if (yParity !== 0 && yParity !== 1) throw new Error("bad yParity");
	} catch (error) {
		assertArgument(false, "invalid yParity", "yParity", fields[0]);
	}
	const r = zeroPadValue(fields[1], 32);
	const s = zeroPadValue(fields[2], 32);
	tx.signature = Signature.from({
		r,
		s,
		yParity
	});
}
function _parseEip1559(data) {
	const fields = decodeRlp(getBytes(data).slice(1));
	assertArgument(Array.isArray(fields) && (fields.length === 9 || fields.length === 12), "invalid field count for transaction type: 2", "data", hexlify(data));
	const tx = {
		type: 2,
		chainId: handleUint(fields[0], "chainId"),
		nonce: handleNumber(fields[1], "nonce"),
		maxPriorityFeePerGas: handleUint(fields[2], "maxPriorityFeePerGas"),
		maxFeePerGas: handleUint(fields[3], "maxFeePerGas"),
		gasPrice: null,
		gasLimit: handleUint(fields[4], "gasLimit"),
		to: handleAddress(fields[5]),
		value: handleUint(fields[6], "value"),
		data: hexlify(fields[7]),
		accessList: handleAccessList(fields[8], "accessList")
	};
	if (fields.length === 9) return tx;
	_parseEipSignature(tx, fields.slice(9));
	return tx;
}
function _serializeEip1559(tx, sig) {
	const fields = [
		formatNumber(tx.chainId, "chainId"),
		formatNumber(tx.nonce, "nonce"),
		formatNumber(tx.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
		formatNumber(tx.maxFeePerGas || 0, "maxFeePerGas"),
		formatNumber(tx.gasLimit, "gasLimit"),
		tx.to || "0x",
		formatNumber(tx.value, "value"),
		tx.data,
		formatAccessList(tx.accessList || [])
	];
	if (sig) {
		fields.push(formatNumber(sig.yParity, "yParity"));
		fields.push(toBeArray(sig.r));
		fields.push(toBeArray(sig.s));
	}
	return concat(["0x02", encodeRlp(fields)]);
}
function _parseEip2930(data) {
	const fields = decodeRlp(getBytes(data).slice(1));
	assertArgument(Array.isArray(fields) && (fields.length === 8 || fields.length === 11), "invalid field count for transaction type: 1", "data", hexlify(data));
	const tx = {
		type: 1,
		chainId: handleUint(fields[0], "chainId"),
		nonce: handleNumber(fields[1], "nonce"),
		gasPrice: handleUint(fields[2], "gasPrice"),
		gasLimit: handleUint(fields[3], "gasLimit"),
		to: handleAddress(fields[4]),
		value: handleUint(fields[5], "value"),
		data: hexlify(fields[6]),
		accessList: handleAccessList(fields[7], "accessList")
	};
	if (fields.length === 8) return tx;
	_parseEipSignature(tx, fields.slice(8));
	return tx;
}
function _serializeEip2930(tx, sig) {
	const fields = [
		formatNumber(tx.chainId, "chainId"),
		formatNumber(tx.nonce, "nonce"),
		formatNumber(tx.gasPrice || 0, "gasPrice"),
		formatNumber(tx.gasLimit, "gasLimit"),
		tx.to || "0x",
		formatNumber(tx.value, "value"),
		tx.data,
		formatAccessList(tx.accessList || [])
	];
	if (sig) {
		fields.push(formatNumber(sig.yParity, "recoveryParam"));
		fields.push(toBeArray(sig.r));
		fields.push(toBeArray(sig.s));
	}
	return concat(["0x01", encodeRlp(fields)]);
}
function _parseEip4844(data) {
	let fields = decodeRlp(getBytes(data).slice(1));
	let typeName = "3";
	let blobWrapperVersion = null;
	let blobs = null;
	if (fields.length === 4 && Array.isArray(fields[0])) {
		typeName = "3 (network format)";
		const fBlobs = fields[1], fCommits = fields[2], fProofs = fields[3];
		assertArgument(Array.isArray(fBlobs), "invalid network format: blobs not an array", "fields[1]", fBlobs);
		assertArgument(Array.isArray(fCommits), "invalid network format: commitments not an array", "fields[2]", fCommits);
		assertArgument(Array.isArray(fProofs), "invalid network format: proofs not an array", "fields[3]", fProofs);
		assertArgument(fBlobs.length === fCommits.length, "invalid network format: blobs/commitments length mismatch", "fields", fields);
		assertArgument(fBlobs.length === fProofs.length, "invalid network format: blobs/proofs length mismatch", "fields", fields);
		blobs = [];
		for (let i = 0; i < fields[1].length; i++) blobs.push({
			data: fBlobs[i],
			commitment: fCommits[i],
			proof: fProofs[i]
		});
		fields = fields[0];
	} else if (fields.length === 5 && Array.isArray(fields[0])) {
		typeName = "3 (EIP-7594 network format)";
		blobWrapperVersion = getNumber(fields[1]);
		const fBlobs = fields[2], fCommits = fields[3], fProofs = fields[4];
		assertArgument(blobWrapperVersion === 1, `unsupported EIP-7594 network format version: ${blobWrapperVersion}`, "fields[1]", blobWrapperVersion);
		assertArgument(Array.isArray(fBlobs), "invalid EIP-7594 network format: blobs not an array", "fields[2]", fBlobs);
		assertArgument(Array.isArray(fCommits), "invalid EIP-7594 network format: commitments not an array", "fields[3]", fCommits);
		assertArgument(Array.isArray(fProofs), "invalid EIP-7594 network format: proofs not an array", "fields[4]", fProofs);
		assertArgument(fBlobs.length === fCommits.length, "invalid network format: blobs/commitments length mismatch", "fields", fields);
		assertArgument(fBlobs.length * CELL_COUNT === fProofs.length, "invalid network format: blobs/proofs length mismatch", "fields", fields);
		blobs = [];
		for (let i = 0; i < fBlobs.length; i++) {
			const proof = [];
			for (let j = 0; j < CELL_COUNT; j++) proof.push(fProofs[i * CELL_COUNT + j]);
			blobs.push({
				data: fBlobs[i],
				commitment: fCommits[i],
				proof: concat(proof)
			});
		}
		fields = fields[0];
	}
	assertArgument(Array.isArray(fields) && (fields.length === 11 || fields.length === 14), `invalid field count for transaction type: ${typeName}`, "data", hexlify(data));
	const tx = {
		type: 3,
		chainId: handleUint(fields[0], "chainId"),
		nonce: handleNumber(fields[1], "nonce"),
		maxPriorityFeePerGas: handleUint(fields[2], "maxPriorityFeePerGas"),
		maxFeePerGas: handleUint(fields[3], "maxFeePerGas"),
		gasPrice: null,
		gasLimit: handleUint(fields[4], "gasLimit"),
		to: handleAddress(fields[5]),
		value: handleUint(fields[6], "value"),
		data: hexlify(fields[7]),
		accessList: handleAccessList(fields[8], "accessList"),
		maxFeePerBlobGas: handleUint(fields[9], "maxFeePerBlobGas"),
		blobVersionedHashes: fields[10],
		blobWrapperVersion
	};
	if (blobs) tx.blobs = blobs;
	assertArgument(tx.to != null, `invalid address for transaction type: ${typeName}`, "data", data);
	assertArgument(Array.isArray(tx.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", data);
	for (let i = 0; i < tx.blobVersionedHashes.length; i++) assertArgument(isHexString(tx.blobVersionedHashes[i], 32), `invalid blobVersionedHash at index ${i}: must be length 32`, "data", data);
	if (fields.length === 11) return tx;
	_parseEipSignature(tx, fields.slice(11));
	return tx;
}
function _serializeEip4844(tx, sig, blobs) {
	const fields = [
		formatNumber(tx.chainId, "chainId"),
		formatNumber(tx.nonce, "nonce"),
		formatNumber(tx.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
		formatNumber(tx.maxFeePerGas || 0, "maxFeePerGas"),
		formatNumber(tx.gasLimit, "gasLimit"),
		tx.to || "0x0000000000000000000000000000000000000000",
		formatNumber(tx.value, "value"),
		tx.data,
		formatAccessList(tx.accessList || []),
		formatNumber(tx.maxFeePerBlobGas || 0, "maxFeePerBlobGas"),
		formatHashes(tx.blobVersionedHashes || [], "blobVersionedHashes")
	];
	if (sig) {
		fields.push(formatNumber(sig.yParity, "yParity"));
		fields.push(toBeArray(sig.r));
		fields.push(toBeArray(sig.s));
		if (blobs) {
			if (tx.blobWrapperVersion != null) {
				const wrapperVersion = toBeArray(tx.blobWrapperVersion);
				const cellProofs = [];
				for (const { proof } of blobs) {
					const p = getBytes(proof);
					const cellSize = p.length / CELL_COUNT;
					for (let i = 0; i < p.length; i += cellSize) cellProofs.push(p.subarray(i, i + cellSize));
				}
				return concat(["0x03", encodeRlp([
					fields,
					wrapperVersion,
					blobs.map((b) => b.data),
					blobs.map((b) => b.commitment),
					cellProofs
				])]);
			}
			return concat(["0x03", encodeRlp([
				fields,
				blobs.map((b) => b.data),
				blobs.map((b) => b.commitment),
				blobs.map((b) => b.proof)
			])]);
		}
	}
	return concat(["0x03", encodeRlp(fields)]);
}
function _parseEip7702(data) {
	const fields = decodeRlp(getBytes(data).slice(1));
	assertArgument(Array.isArray(fields) && (fields.length === 10 || fields.length === 13), "invalid field count for transaction type: 4", "data", hexlify(data));
	const tx = {
		type: 4,
		chainId: handleUint(fields[0], "chainId"),
		nonce: handleNumber(fields[1], "nonce"),
		maxPriorityFeePerGas: handleUint(fields[2], "maxPriorityFeePerGas"),
		maxFeePerGas: handleUint(fields[3], "maxFeePerGas"),
		gasPrice: null,
		gasLimit: handleUint(fields[4], "gasLimit"),
		to: handleAddress(fields[5]),
		value: handleUint(fields[6], "value"),
		data: hexlify(fields[7]),
		accessList: handleAccessList(fields[8], "accessList"),
		authorizationList: handleAuthorizationList(fields[9], "authorizationList")
	};
	if (fields.length === 10) return tx;
	_parseEipSignature(tx, fields.slice(10));
	return tx;
}
function _serializeEip7702(tx, sig) {
	const fields = [
		formatNumber(tx.chainId, "chainId"),
		formatNumber(tx.nonce, "nonce"),
		formatNumber(tx.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
		formatNumber(tx.maxFeePerGas || 0, "maxFeePerGas"),
		formatNumber(tx.gasLimit, "gasLimit"),
		tx.to || "0x",
		formatNumber(tx.value, "value"),
		tx.data,
		formatAccessList(tx.accessList || []),
		formatAuthorizationList(tx.authorizationList || [])
	];
	if (sig) {
		fields.push(formatNumber(sig.yParity, "yParity"));
		fields.push(toBeArray(sig.r));
		fields.push(toBeArray(sig.s));
	}
	return concat(["0x04", encodeRlp(fields)]);
}
/**
*  A **Transaction** describes an operation to be executed on
*  Ethereum by an Externally Owned Account (EOA). It includes
*  who (the [[to]] address), what (the [[data]]) and how much (the
*  [[value]] in ether) the operation should entail.
*
*  @example:
*    tx = new Transaction()
*    //_result:
*
*    tx.data = "0x1234";
*    //_result:
*/
var Transaction = class Transaction {
	#type;
	#to;
	#data;
	#nonce;
	#gasLimit;
	#gasPrice;
	#maxPriorityFeePerGas;
	#maxFeePerGas;
	#value;
	#chainId;
	#sig;
	#accessList;
	#maxFeePerBlobGas;
	#blobVersionedHashes;
	#kzg;
	#blobs;
	#auths;
	#blobWrapperVersion;
	/**
	*  The transaction type.
	*
	*  If null, the type will be automatically inferred based on
	*  explicit properties.
	*/
	get type() {
		return this.#type;
	}
	set type(value) {
		switch (value) {
			case null:
				this.#type = null;
				break;
			case 0:
			case "legacy":
				this.#type = 0;
				break;
			case 1:
			case "berlin":
			case "eip-2930":
				this.#type = 1;
				break;
			case 2:
			case "london":
			case "eip-1559":
				this.#type = 2;
				break;
			case 3:
			case "cancun":
			case "eip-4844":
				this.#type = 3;
				break;
			case 4:
			case "pectra":
			case "eip-7702":
				this.#type = 4;
				break;
			default: assertArgument(false, "unsupported transaction type", "type", value);
		}
	}
	/**
	*  The name of the transaction type.
	*/
	get typeName() {
		switch (this.type) {
			case 0: return "legacy";
			case 1: return "eip-2930";
			case 2: return "eip-1559";
			case 3: return "eip-4844";
			case 4: return "eip-7702";
		}
		return null;
	}
	/**
	*  The ``to`` address for the transaction or ``null`` if the
	*  transaction is an ``init`` transaction.
	*/
	get to() {
		const value = this.#to;
		if (value == null && this.type === 3) return ZeroAddress;
		return value;
	}
	set to(value) {
		this.#to = value == null ? null : getAddress(value);
	}
	/**
	*  The transaction nonce.
	*/
	get nonce() {
		return this.#nonce;
	}
	set nonce(value) {
		this.#nonce = getNumber(value, "value");
	}
	/**
	*  The gas limit.
	*/
	get gasLimit() {
		return this.#gasLimit;
	}
	set gasLimit(value) {
		this.#gasLimit = getBigInt(value);
	}
	/**
	*  The gas price.
	*
	*  On legacy networks this defines the fee that will be paid. On
	*  EIP-1559 networks, this should be ``null``.
	*/
	get gasPrice() {
		const value = this.#gasPrice;
		if (value == null && (this.type === 0 || this.type === 1)) return BN_0$1;
		return value;
	}
	set gasPrice(value) {
		this.#gasPrice = value == null ? null : getBigInt(value, "gasPrice");
	}
	/**
	*  The maximum priority fee per unit of gas to pay. On legacy
	*  networks this should be ``null``.
	*/
	get maxPriorityFeePerGas() {
		const value = this.#maxPriorityFeePerGas;
		if (value == null) {
			if (this.type === 2 || this.type === 3) return BN_0$1;
			return null;
		}
		return value;
	}
	set maxPriorityFeePerGas(value) {
		this.#maxPriorityFeePerGas = value == null ? null : getBigInt(value, "maxPriorityFeePerGas");
	}
	/**
	*  The maximum total fee per unit of gas to pay. On legacy
	*  networks this should be ``null``.
	*/
	get maxFeePerGas() {
		const value = this.#maxFeePerGas;
		if (value == null) {
			if (this.type === 2 || this.type === 3) return BN_0$1;
			return null;
		}
		return value;
	}
	set maxFeePerGas(value) {
		this.#maxFeePerGas = value == null ? null : getBigInt(value, "maxFeePerGas");
	}
	/**
	*  The transaction data. For ``init`` transactions this is the
	*  deployment code.
	*/
	get data() {
		return this.#data;
	}
	set data(value) {
		this.#data = hexlify(value);
	}
	/**
	*  The amount of ether (in wei) to send in this transactions.
	*/
	get value() {
		return this.#value;
	}
	set value(value) {
		this.#value = getBigInt(value, "value");
	}
	/**
	*  The chain ID this transaction is valid on.
	*/
	get chainId() {
		return this.#chainId;
	}
	set chainId(value) {
		this.#chainId = getBigInt(value);
	}
	/**
	*  If signed, the signature for this transaction.
	*/
	get signature() {
		return this.#sig || null;
	}
	set signature(value) {
		this.#sig = value == null ? null : Signature.from(value);
	}
	isValid() {
		const sig = this.signature;
		if (sig && !sig.isValid()) return false;
		const auths = this.authorizationList;
		if (auths) {
			for (const auth of auths) if (!auth.signature.isValid()) return false;
		}
		return true;
	}
	/**
	*  The access list.
	*
	*  An access list permits discounted (but pre-paid) access to
	*  bytecode and state variable access within contract execution.
	*/
	get accessList() {
		const value = this.#accessList || null;
		if (value == null) {
			if (this.type === 1 || this.type === 2 || this.type === 3) return [];
			return null;
		}
		return value;
	}
	set accessList(value) {
		this.#accessList = value == null ? null : accessListify(value);
	}
	get authorizationList() {
		const value = this.#auths || null;
		if (value == null) {
			if (this.type === 4) return [];
		}
		return value;
	}
	set authorizationList(auths) {
		this.#auths = auths == null ? null : auths.map((a) => authorizationify(a));
	}
	/**
	*  The max fee per blob gas for Cancun transactions.
	*/
	get maxFeePerBlobGas() {
		const value = this.#maxFeePerBlobGas;
		if (value == null && this.type === 3) return BN_0$1;
		return value;
	}
	set maxFeePerBlobGas(value) {
		this.#maxFeePerBlobGas = value == null ? null : getBigInt(value, "maxFeePerBlobGas");
	}
	/**
	*  The BLOb versioned hashes for Cancun transactions.
	*/
	get blobVersionedHashes() {
		let value = this.#blobVersionedHashes;
		if (value == null && this.type === 3) return [];
		return value;
	}
	set blobVersionedHashes(value) {
		if (value != null) {
			assertArgument(Array.isArray(value), "blobVersionedHashes must be an Array", "value", value);
			value = value.slice();
			for (let i = 0; i < value.length; i++) assertArgument(isHexString(value[i], 32), "invalid blobVersionedHash", `value[${i}]`, value[i]);
		}
		this.#blobVersionedHashes = value;
	}
	/**
	*  The BLObs for the Transaction, if any.
	*
	*  If ``blobs`` is non-``null``, then the [[seriailized]]
	*  will return the network formatted sidecar, otherwise it
	*  will return the standard [[link-eip-2718]] payload. The
	*  [[unsignedSerialized]] is unaffected regardless.
	*
	*  When setting ``blobs``, either fully valid [[Blob]] objects
	*  may be specified (i.e. correctly padded, with correct
	*  committments and proofs) or a raw [[BytesLike]] may
	*  be provided.
	*
	*  If raw [[BytesLike]] are provided, the [[kzg]] property **must**
	*  be already set. The blob will be correctly padded and the
	*  [[KzgLibrary]] will be used to compute the committment and
	*  proof for the blob.
	*
	*  A BLOb is a sequence of field elements, each of which must
	*  be within the BLS field modulo, so some additional processing
	*  may be required to encode arbitrary data to ensure each 32 byte
	*  field is within the valid range.
	*
	*  Setting this automatically populates [[blobVersionedHashes]],
	*  overwriting any existing values. Setting this to ``null``
	*  does **not** remove the [[blobVersionedHashes]], leaving them
	*  present.
	*/
	get blobs() {
		if (this.#blobs == null) return null;
		return this.#blobs.map((b) => Object.assign({}, b));
	}
	set blobs(_blobs) {
		if (_blobs == null) {
			this.#blobs = null;
			return;
		}
		const blobs = [];
		const versionedHashes = [];
		for (let i = 0; i < _blobs.length; i++) {
			const blob = _blobs[i];
			if (isBytesLike(blob)) {
				assert(this.#kzg, "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", { operation: "set blobs()" });
				let data = getBytes(blob);
				assertArgument(data.length <= BLOB_SIZE, "blob is too large", `blobs[${i}]`, blob);
				if (data.length !== BLOB_SIZE) {
					const padded = new Uint8Array(BLOB_SIZE);
					padded.set(data);
					data = padded;
				}
				const commit = this.#kzg.blobToKzgCommitment(data);
				const proof = hexlify(this.#kzg.computeBlobKzgProof(data, commit));
				blobs.push({
					data: hexlify(data),
					commitment: hexlify(commit),
					proof
				});
				versionedHashes.push(getVersionedHash(1, commit));
			} else {
				const data = hexlify(blob.data);
				const commitment = hexlify(blob.commitment);
				const proof = hexlify(blob.proof);
				blobs.push({
					data,
					commitment,
					proof
				});
				versionedHashes.push(getVersionedHash(1, commitment));
			}
		}
		this.#blobs = blobs;
		this.#blobVersionedHashes = versionedHashes;
	}
	get kzg() {
		return this.#kzg;
	}
	set kzg(kzg) {
		if (kzg == null) this.#kzg = null;
		else this.#kzg = getKzgLibrary(kzg);
	}
	get blobWrapperVersion() {
		return this.#blobWrapperVersion;
	}
	set blobWrapperVersion(value) {
		this.#blobWrapperVersion = value;
	}
	/**
	*  Creates a new Transaction with default values.
	*/
	constructor() {
		this.#type = null;
		this.#to = null;
		this.#nonce = 0;
		this.#gasLimit = BN_0$1;
		this.#gasPrice = null;
		this.#maxPriorityFeePerGas = null;
		this.#maxFeePerGas = null;
		this.#data = "0x";
		this.#value = BN_0$1;
		this.#chainId = BN_0$1;
		this.#sig = null;
		this.#accessList = null;
		this.#maxFeePerBlobGas = null;
		this.#blobVersionedHashes = null;
		this.#kzg = null;
		this.#blobs = null;
		this.#auths = null;
		this.#blobWrapperVersion = null;
	}
	/**
	*  The transaction hash, if signed. Otherwise, ``null``.
	*/
	get hash() {
		if (this.signature == null) return null;
		return keccak256(this.#getSerialized(true, false));
	}
	/**
	*  The pre-image hash of this transaction.
	*
	*  This is the digest that a [[Signer]] must sign to authorize
	*  this transaction.
	*/
	get unsignedHash() {
		return keccak256(this.unsignedSerialized);
	}
	/**
	*  The sending address, if signed. Otherwise, ``null``.
	*/
	get from() {
		if (this.signature == null) return null;
		return recoverAddress(this.unsignedHash, this.signature.getCanonical());
	}
	/**
	*  The public key of the sender, if signed. Otherwise, ``null``.
	*/
	get fromPublicKey() {
		if (this.signature == null) return null;
		return SigningKey.recoverPublicKey(this.unsignedHash, this.signature.getCanonical());
	}
	/**
	*  Returns true if signed.
	*
	*  This provides a Type Guard that properties requiring a signed
	*  transaction are non-null.
	*/
	isSigned() {
		return this.signature != null;
	}
	#getSerialized(signed, sidecar) {
		assert(!signed || this.signature != null, "cannot serialize unsigned transaction; maybe you meant .unsignedSerialized", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
		const sig = signed ? this.signature : null;
		switch (this.inferType()) {
			case 0: return _serializeLegacy(this, sig);
			case 1: return _serializeEip2930(this, sig);
			case 2: return _serializeEip1559(this, sig);
			case 3: return _serializeEip4844(this, sig, sidecar ? this.blobs : null);
			case 4: return _serializeEip7702(this, sig);
		}
		assert(false, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
	}
	/**
	*  The serialized transaction.
	*
	*  This throws if the transaction is unsigned. For the pre-image,
	*  use [[unsignedSerialized]].
	*/
	get serialized() {
		return this.#getSerialized(true, true);
	}
	/**
	*  The transaction pre-image.
	*
	*  The hash of this is the digest which needs to be signed to
	*  authorize this transaction.
	*/
	get unsignedSerialized() {
		return this.#getSerialized(false, false);
	}
	/**
	*  Return the most "likely" type; currently the highest
	*  supported transaction type.
	*/
	inferType() {
		const types = this.inferTypes();
		if (types.indexOf(2) >= 0) return 2;
		return types.pop();
	}
	/**
	*  Validates the explicit properties and returns a list of compatible
	*  transaction types.
	*/
	inferTypes() {
		const hasGasPrice = this.gasPrice != null;
		const hasFee = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null;
		const hasAccessList = this.accessList != null;
		const hasBlob = this.#maxFeePerBlobGas != null || this.#blobVersionedHashes;
		if (this.maxFeePerGas != null && this.maxPriorityFeePerGas != null) assert(this.maxFeePerGas >= this.maxPriorityFeePerGas, "priorityFee cannot be more than maxFee", "BAD_DATA", { value: this });
		assert(!hasFee || this.type !== 0 && this.type !== 1, "transaction type cannot have maxFeePerGas or maxPriorityFeePerGas", "BAD_DATA", { value: this });
		assert(this.type !== 0 || !hasAccessList, "legacy transaction cannot have accessList", "BAD_DATA", { value: this });
		const types = [];
		if (this.type != null) types.push(this.type);
		else if (this.authorizationList && this.authorizationList.length) types.push(4);
		else if (hasFee) types.push(2);
		else if (hasGasPrice) {
			types.push(1);
			if (!hasAccessList) types.push(0);
		} else if (hasAccessList) {
			types.push(1);
			types.push(2);
		} else if (hasBlob && this.to) types.push(3);
		else {
			types.push(0);
			types.push(1);
			types.push(2);
			types.push(3);
		}
		types.sort();
		return types;
	}
	/**
	*  Returns true if this transaction is a legacy transaction (i.e.
	*  ``type === 0``).
	*
	*  This provides a Type Guard that the related properties are
	*  non-null.
	*/
	isLegacy() {
		return this.type === 0;
	}
	/**
	*  Returns true if this transaction is berlin hardform transaction (i.e.
	*  ``type === 1``).
	*
	*  This provides a Type Guard that the related properties are
	*  non-null.
	*/
	isBerlin() {
		return this.type === 1;
	}
	/**
	*  Returns true if this transaction is london hardform transaction (i.e.
	*  ``type === 2``).
	*
	*  This provides a Type Guard that the related properties are
	*  non-null.
	*/
	isLondon() {
		return this.type === 2;
	}
	/**
	*  Returns true if this transaction is an [[link-eip-4844]] BLOB
	*  transaction.
	*
	*  This provides a Type Guard that the related properties are
	*  non-null.
	*/
	isCancun() {
		return this.type === 3;
	}
	/**
	*  Create a copy of this transaciton.
	*/
	clone() {
		return Transaction.from(this);
	}
	/**
	*  Return a JSON-friendly object.
	*/
	toJSON() {
		const s = (v) => {
			if (v == null) return null;
			return v.toString();
		};
		return {
			type: this.type,
			to: this.to,
			data: this.data,
			nonce: this.nonce,
			gasLimit: s(this.gasLimit),
			gasPrice: s(this.gasPrice),
			maxPriorityFeePerGas: s(this.maxPriorityFeePerGas),
			maxFeePerGas: s(this.maxFeePerGas),
			value: s(this.value),
			chainId: s(this.chainId),
			sig: this.signature ? this.signature.toJSON() : null,
			accessList: this.accessList
		};
	}
	[inspect]() {
		return this.toString();
	}
	toString() {
		const output = [];
		const add = (key) => {
			let value = this[key];
			if (typeof value === "string") value = JSON.stringify(value);
			output.push(`${key}: ${value}`);
		};
		if (this.type) add("type");
		add("to");
		add("data");
		add("nonce");
		add("gasLimit");
		add("value");
		if (this.chainId != null) add("chainId");
		if (this.signature) {
			add("from");
			output.push(`signature: ${this.signature.toString()}`);
		}
		const auths = this.authorizationList;
		if (auths) {
			const outputAuths = [];
			for (const auth of auths) {
				const o = [];
				o.push(`address: ${JSON.stringify(auth.address)}`);
				if (auth.nonce != null) o.push(`nonce: ${auth.nonce}`);
				if (auth.chainId != null) o.push(`chainId: ${auth.chainId}`);
				if (auth.signature) o.push(`signature: ${auth.signature.toString()}`);
				outputAuths.push(`Authorization { ${o.join(", ")} }`);
			}
			output.push(`authorizations: [ ${outputAuths.join(", ")} ]`);
		}
		return `Transaction { ${output.join(", ")} }`;
	}
	/**
	*  Create a **Transaction** from a serialized transaction or a
	*  Transaction-like object.
	*/
	static from(tx) {
		if (tx == null) return new Transaction();
		if (typeof tx === "string") {
			const payload = getBytes(tx);
			if (payload[0] >= 127) return Transaction.from(_parseLegacy(payload));
			switch (payload[0]) {
				case 1: return Transaction.from(_parseEip2930(payload));
				case 2: return Transaction.from(_parseEip1559(payload));
				case 3: return Transaction.from(_parseEip4844(payload));
				case 4: return Transaction.from(_parseEip7702(payload));
			}
			assert(false, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: "from" });
		}
		const result = new Transaction();
		if (tx.type != null) result.type = tx.type;
		if (tx.to != null) result.to = tx.to;
		if (tx.nonce != null) result.nonce = tx.nonce;
		if (tx.gasLimit != null) result.gasLimit = tx.gasLimit;
		if (tx.gasPrice != null) result.gasPrice = tx.gasPrice;
		if (tx.maxPriorityFeePerGas != null) result.maxPriorityFeePerGas = tx.maxPriorityFeePerGas;
		if (tx.maxFeePerGas != null) result.maxFeePerGas = tx.maxFeePerGas;
		if (tx.maxFeePerBlobGas != null) result.maxFeePerBlobGas = tx.maxFeePerBlobGas;
		if (tx.data != null) result.data = tx.data;
		if (tx.value != null) result.value = tx.value;
		if (tx.chainId != null) result.chainId = tx.chainId;
		if (tx.signature != null) result.signature = Signature.from(tx.signature);
		if (tx.accessList != null) result.accessList = tx.accessList;
		if (tx.authorizationList != null) result.authorizationList = tx.authorizationList;
		if (tx.blobVersionedHashes != null) result.blobVersionedHashes = tx.blobVersionedHashes;
		if (tx.kzg != null) result.kzg = tx.kzg;
		if (tx.blobWrapperVersion != null) result.blobWrapperVersion = tx.blobWrapperVersion;
		if (tx.blobs != null) result.blobs = tx.blobs;
		if (tx.hash != null) {
			assertArgument(result.isSigned(), "unsigned transaction cannot define '.hash'", "tx", tx);
			assertArgument(result.hash === tx.hash, "hash mismatch", "tx", tx);
		}
		if (tx.from != null) {
			assertArgument(result.isSigned(), "unsigned transaction cannot define '.from'", "tx", tx);
			assertArgument(result.from.toLowerCase() === (tx.from || "").toLowerCase(), "from mismatch", "tx", tx);
		}
		return result;
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/hash/authorization.js
/**
*  Computes the [[link-eip-7702]] authorization digest to sign.
*/
function hashAuthorization(auth) {
	assertArgument(typeof auth.address === "string", "invalid address for hashAuthorization", "auth.address", auth);
	return keccak256(concat(["0x05", encodeRlp([
		auth.chainId != null ? toBeArray(auth.chainId) : "0x",
		getAddress(auth.address),
		auth.nonce != null ? toBeArray(auth.nonce) : "0x"
	])]));
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/hash/id.js
/**
*  A simple hashing function which operates on UTF-8 strings to
*  compute an 32-byte identifier.
*
*  This simply computes the [UTF-8 bytes](toUtf8Bytes) and computes
*  the [[keccak256]].
*
*  @example:
*    id("hello world")
*    //_result:
*/
function id(value) {
	return keccak256(toUtf8Bytes(value));
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/hash/message.js
/**
*  Computes the [[link-eip-191]] personal-sign message digest to sign.
*
*  This prefixes the message with [[MessagePrefix]] and the decimal length
*  of %%message%% and computes the [[keccak256]] digest.
*
*  If %%message%% is a string, it is converted to its UTF-8 bytes
*  first. To compute the digest of a [[DataHexString]], it must be converted
*  to [bytes](getBytes).
*
*  @example:
*    hashMessage("Hello World")
*    //_result:
*
*    // Hashes the SIX (6) string characters, i.e.
*    // [ "0", "x", "4", "2", "4", "3" ]
*    hashMessage("0x4243")
*    //_result:
*
*    // Hashes the TWO (2) bytes [ 0x42, 0x43 ]...
*    hashMessage(getBytes("0x4243"))
*    //_result:
*
*    // ...which is equal to using data
*    hashMessage(new Uint8Array([ 0x42, 0x43 ]))
*    //_result:
*
*/
function hashMessage(message) {
	if (typeof message === "string") message = toUtf8Bytes(message);
	return keccak256(concat([
		toUtf8Bytes(MessagePrefix),
		toUtf8Bytes(String(message.length)),
		message
	]));
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/hash/typed-data.js
var padding = new Uint8Array(32);
padding.fill(0);
var BN__1 = BigInt(-1);
var BN_0 = BigInt(0);
var BN_1 = BigInt(1);
var BN_MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function hexPadRight(value) {
	const bytes = getBytes(value);
	const padOffset = bytes.length % 32;
	if (padOffset) return concat([bytes, padding.slice(padOffset)]);
	return hexlify(bytes);
}
var hexTrue = toBeHex(BN_1, 32);
var hexFalse = toBeHex(BN_0, 32);
var domainFieldTypes = {
	name: "string",
	version: "string",
	chainId: "uint256",
	verifyingContract: "address",
	salt: "bytes32"
};
var domainFieldNames = [
	"name",
	"version",
	"chainId",
	"verifyingContract",
	"salt"
];
function checkString(key) {
	return function(value) {
		assertArgument(typeof value === "string", `invalid domain value for ${JSON.stringify(key)}`, `domain.${key}`, value);
		return value;
	};
}
var domainChecks = {
	name: checkString("name"),
	version: checkString("version"),
	chainId: function(_value) {
		const value = getBigInt(_value, "domain.chainId");
		assertArgument(value >= 0, "invalid chain ID", "domain.chainId", _value);
		if (Number.isSafeInteger(value)) return Number(value);
		return toQuantity(value);
	},
	verifyingContract: function(value) {
		try {
			return getAddress(value).toLowerCase();
		} catch (error) {}
		assertArgument(false, `invalid domain value "verifyingContract"`, "domain.verifyingContract", value);
	},
	salt: function(value) {
		const bytes = getBytes(value, "domain.salt");
		assertArgument(bytes.length === 32, `invalid domain value "salt"`, "domain.salt", value);
		return hexlify(bytes);
	}
};
function getBaseEncoder(type) {
	{
		const match = type.match(/^(u?)int(\d+)$/);
		if (match) {
			const signed = match[1] === "";
			const width = parseInt(match[2]);
			assertArgument(width % 8 === 0 && width !== 0 && width <= 256 && match[2] === String(width), "invalid numeric width", "type", type);
			const boundsUpper = mask(BN_MAX_UINT256, signed ? width - 1 : width);
			const boundsLower = signed ? (boundsUpper + BN_1) * BN__1 : BN_0;
			return function(_value) {
				const value = getBigInt(_value, "value");
				assertArgument(value >= boundsLower && value <= boundsUpper, `value out-of-bounds for ${type}`, "value", value);
				return toBeHex(signed ? toTwos(value, 256) : value, 32);
			};
		}
	}
	{
		const match = type.match(/^bytes(\d+)$/);
		if (match) {
			const width = parseInt(match[1]);
			assertArgument(width !== 0 && width <= 32 && match[1] === String(width), "invalid bytes width", "type", type);
			return function(value) {
				assertArgument(getBytes(value).length === width, `invalid length for ${type}`, "value", value);
				return hexPadRight(value);
			};
		}
	}
	switch (type) {
		case "address": return function(value) {
			return zeroPadValue(getAddress(value), 32);
		};
		case "bool": return function(value) {
			return !value ? hexFalse : hexTrue;
		};
		case "bytes": return function(value) {
			return keccak256(value);
		};
		case "string": return function(value) {
			return id(value);
		};
	}
	return null;
}
function encodeType(name, fields) {
	return `${name}(${fields.map(({ name, type }) => type + " " + name).join(",")})`;
}
function splitArray(type) {
	const match = type.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);
	if (match) return {
		base: match[1],
		index: match[2] + match[4],
		array: {
			base: match[1],
			prefix: match[1] + match[2],
			count: match[5] ? parseInt(match[5]) : -1
		}
	};
	return { base: type };
}
/**
*  A **TypedDataEncode** prepares and encodes [[link-eip-712]] payloads
*  for signed typed data.
*
*  This is useful for those that wish to compute various components of a
*  typed data hash, primary types, or sub-components, but generally the
*  higher level [[Signer-signTypedData]] is more useful.
*/
var TypedDataEncoder = class TypedDataEncoder {
	/**
	*  The primary type for the structured [[types]].
	*
	*  This is derived automatically from the [[types]], since no
	*  recursion is possible, once the DAG for the types is consturcted
	*  internally, the primary type must be the only remaining type with
	*  no parent nodes.
	*/
	primaryType;
	#types;
	/**
	*  The types.
	*/
	get types() {
		return JSON.parse(this.#types);
	}
	#fullTypes;
	#encoderCache;
	/**
	*  Create a new **TypedDataEncoder** for %%types%%.
	*
	*  This performs all necessary checking that types are valid and
	*  do not violate the [[link-eip-712]] structural constraints as
	*  well as computes the [[primaryType]].
	*/
	constructor(_types) {
		this.#fullTypes = /* @__PURE__ */ new Map();
		this.#encoderCache = /* @__PURE__ */ new Map();
		const links = /* @__PURE__ */ new Map();
		const parents = /* @__PURE__ */ new Map();
		const subtypes = /* @__PURE__ */ new Map();
		const types = {};
		Object.keys(_types).forEach((type) => {
			types[type] = _types[type].map(({ name, type }) => {
				let { base, index } = splitArray(type);
				if (base === "int" && !_types["int"]) base = "int256";
				if (base === "uint" && !_types["uint"]) base = "uint256";
				return {
					name,
					type: base + (index || "")
				};
			});
			links.set(type, /* @__PURE__ */ new Set());
			parents.set(type, []);
			subtypes.set(type, /* @__PURE__ */ new Set());
		});
		this.#types = JSON.stringify(types);
		for (const name in types) {
			const uniqueNames = /* @__PURE__ */ new Set();
			for (const field of types[name]) {
				assertArgument(!uniqueNames.has(field.name), `duplicate variable name ${JSON.stringify(field.name)} in ${JSON.stringify(name)}`, "types", _types);
				uniqueNames.add(field.name);
				const baseType = splitArray(field.type).base;
				assertArgument(baseType !== name, `circular type reference to ${JSON.stringify(baseType)}`, "types", _types);
				if (getBaseEncoder(baseType)) continue;
				assertArgument(parents.has(baseType), `unknown type ${JSON.stringify(baseType)}`, "types", _types);
				parents.get(baseType).push(name);
				links.get(name).add(baseType);
			}
		}
		const primaryTypes = Array.from(parents.keys()).filter((n) => parents.get(n).length === 0);
		assertArgument(primaryTypes.length !== 0, "missing primary type", "types", _types);
		assertArgument(primaryTypes.length === 1, `ambiguous primary types or unused types: ${primaryTypes.map((t) => JSON.stringify(t)).join(", ")}`, "types", _types);
		defineProperties(this, { primaryType: primaryTypes[0] });
		function checkCircular(type, found) {
			assertArgument(!found.has(type), `circular type reference to ${JSON.stringify(type)}`, "types", _types);
			found.add(type);
			for (const child of links.get(type)) {
				if (!parents.has(child)) continue;
				checkCircular(child, found);
				for (const subtype of found) subtypes.get(subtype).add(child);
			}
			found.delete(type);
		}
		checkCircular(this.primaryType, /* @__PURE__ */ new Set());
		for (const [name, set] of subtypes) {
			const st = Array.from(set);
			st.sort();
			this.#fullTypes.set(name, encodeType(name, types[name]) + st.map((t) => encodeType(t, types[t])).join(""));
		}
	}
	/**
	*  Returnthe encoder for the specific %%type%%.
	*/
	getEncoder(type) {
		let encoder = this.#encoderCache.get(type);
		if (!encoder) {
			encoder = this.#getEncoder(type);
			this.#encoderCache.set(type, encoder);
		}
		return encoder;
	}
	#getEncoder(type) {
		{
			const encoder = getBaseEncoder(type);
			if (encoder) return encoder;
		}
		const array = splitArray(type).array;
		if (array) {
			const subtype = array.prefix;
			const subEncoder = this.getEncoder(subtype);
			return (value) => {
				assertArgument(array.count === -1 || array.count === value.length, `array length mismatch; expected length ${array.count}`, "value", value);
				let result = value.map(subEncoder);
				if (this.#fullTypes.has(subtype)) result = result.map(keccak256);
				return keccak256(concat(result));
			};
		}
		const fields = this.types[type];
		if (fields) {
			const encodedType = id(this.#fullTypes.get(type));
			return (value) => {
				const values = fields.map(({ name, type }) => {
					const result = this.getEncoder(type)(value[name]);
					if (this.#fullTypes.has(type)) return keccak256(result);
					return result;
				});
				values.unshift(encodedType);
				return concat(values);
			};
		}
		assertArgument(false, `unknown type: ${type}`, "type", type);
	}
	/**
	*  Return the full type for %%name%%.
	*/
	encodeType(name) {
		const result = this.#fullTypes.get(name);
		assertArgument(result, `unknown type: ${JSON.stringify(name)}`, "name", name);
		return result;
	}
	/**
	*  Return the encoded %%value%% for the %%type%%.
	*/
	encodeData(type, value) {
		return this.getEncoder(type)(value);
	}
	/**
	*  Returns the hash of %%value%% for the type of %%name%%.
	*/
	hashStruct(name, value) {
		return keccak256(this.encodeData(name, value));
	}
	/**
	*  Return the fulled encoded %%value%% for the [[types]].
	*/
	encode(value) {
		return this.encodeData(this.primaryType, value);
	}
	/**
	*  Return the hash of the fully encoded %%value%% for the [[types]].
	*/
	hash(value) {
		return this.hashStruct(this.primaryType, value);
	}
	/**
	*  @_ignore:
	*/
	_visit(type, value, callback) {
		if (getBaseEncoder(type)) return callback(type, value);
		const array = splitArray(type).array;
		if (array) {
			assertArgument(array.count === -1 || array.count === value.length, `array length mismatch; expected length ${array.count}`, "value", value);
			return value.map((v) => this._visit(array.prefix, v, callback));
		}
		const fields = this.types[type];
		if (fields) return fields.reduce((accum, { name, type }) => {
			accum[name] = this._visit(type, value[name], callback);
			return accum;
		}, {});
		assertArgument(false, `unknown type: ${type}`, "type", type);
	}
	/**
	*  Call %%calback%% for each value in %%value%%, passing the type and
	*  component within %%value%%.
	*
	*  This is useful for replacing addresses or other transformation that
	*  may be desired on each component, based on its type.
	*/
	visit(value, callback) {
		return this._visit(this.primaryType, value, callback);
	}
	/**
	*  Create a new **TypedDataEncoder** for %%types%%.
	*/
	static from(types) {
		return new TypedDataEncoder(types);
	}
	/**
	*  Return the primary type for %%types%%.
	*/
	static getPrimaryType(types) {
		return TypedDataEncoder.from(types).primaryType;
	}
	/**
	*  Return the hashed struct for %%value%% using %%types%% and %%name%%.
	*/
	static hashStruct(name, types, value) {
		return TypedDataEncoder.from(types).hashStruct(name, value);
	}
	/**
	*  Return the domain hash for %%domain%%.
	*/
	static hashDomain(domain) {
		const domainFields = [];
		for (const name in domain) {
			if (domain[name] == null) continue;
			const type = domainFieldTypes[name];
			assertArgument(type, `invalid typed-data domain key: ${JSON.stringify(name)}`, "domain", domain);
			domainFields.push({
				name,
				type
			});
		}
		domainFields.sort((a, b) => {
			return domainFieldNames.indexOf(a.name) - domainFieldNames.indexOf(b.name);
		});
		return TypedDataEncoder.hashStruct("EIP712Domain", { EIP712Domain: domainFields }, domain);
	}
	/**
	*  Return the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
	*/
	static encode(domain, types, value) {
		return concat([
			"0x1901",
			TypedDataEncoder.hashDomain(domain),
			TypedDataEncoder.from(types).hash(value)
		]);
	}
	/**
	*  Return the hash of the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
	*/
	static hash(domain, types, value) {
		return keccak256(TypedDataEncoder.encode(domain, types, value));
	}
	/**
	* Resolves to the value from resolving all addresses in %%value%% for
	* %%types%% and the %%domain%%.
	*/
	static async resolveNames(domain, types, value, resolveName) {
		domain = Object.assign({}, domain);
		for (const key in domain) if (domain[key] == null) delete domain[key];
		const ensCache = {};
		if (domain.verifyingContract && !isHexString(domain.verifyingContract, 20)) ensCache[domain.verifyingContract] = "0x";
		const encoder = TypedDataEncoder.from(types);
		encoder.visit(value, (type, value) => {
			if (type === "address" && !isHexString(value, 20)) ensCache[value] = "0x";
			return value;
		});
		for (const name in ensCache) ensCache[name] = await resolveName(name);
		if (domain.verifyingContract && ensCache[domain.verifyingContract]) domain.verifyingContract = ensCache[domain.verifyingContract];
		value = encoder.visit(value, (type, value) => {
			if (type === "address" && ensCache[value]) return ensCache[value];
			return value;
		});
		return {
			domain,
			value
		};
	}
	/**
	*  Returns the JSON-encoded payload expected by nodes which implement
	*  the JSON-RPC [[link-eip-712]] method.
	*/
	static getPayload(domain, types, value) {
		TypedDataEncoder.hashDomain(domain);
		const domainValues = {};
		const domainTypes = [];
		domainFieldNames.forEach((name) => {
			const value = domain[name];
			if (value == null) return;
			domainValues[name] = domainChecks[name](value);
			domainTypes.push({
				name,
				type: domainFieldTypes[name]
			});
		});
		const encoder = TypedDataEncoder.from(types);
		types = encoder.types;
		const typesWithDomain = Object.assign({}, types);
		assertArgument(typesWithDomain.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", types);
		typesWithDomain.EIP712Domain = domainTypes;
		encoder.encode(value);
		return {
			types: typesWithDomain,
			domain: domainValues,
			primaryType: encoder.primaryType,
			message: encoder.visit(value, (type, value) => {
				if (type.match(/^bytes(\d*)/)) return hexlify(getBytes(value));
				if (type.match(/^u?int/)) return getBigInt(value).toString();
				switch (type) {
					case "address": return value.toLowerCase();
					case "bool": return !!value;
					case "string":
						assertArgument(typeof value === "string", "invalid string", "value", value);
						return value;
				}
				assertArgument(false, "unsupported type", "type", type);
			})
		};
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/providers/provider.js
/**
*  Returns a copy of %%req%% with all properties coerced to their strict
*  types.
*/
function copyRequest(req) {
	const result = {};
	if (req.to) result.to = req.to;
	if (req.from) result.from = req.from;
	if (req.data) result.data = hexlify(req.data);
	const bigIntKeys = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
	for (const key of bigIntKeys) {
		if (!(key in req) || req[key] == null) continue;
		result[key] = getBigInt(req[key], `request.${key}`);
	}
	const numberKeys = "type,nonce".split(/,/);
	for (const key of numberKeys) {
		if (!(key in req) || req[key] == null) continue;
		result[key] = getNumber(req[key], `request.${key}`);
	}
	if (req.accessList) result.accessList = accessListify(req.accessList);
	if (req.authorizationList) result.authorizationList = req.authorizationList.slice();
	if ("blockTag" in req) result.blockTag = req.blockTag;
	if ("enableCcipRead" in req) result.enableCcipRead = !!req.enableCcipRead;
	if ("customData" in req) result.customData = req.customData;
	if ("blobVersionedHashes" in req && req.blobVersionedHashes) result.blobVersionedHashes = req.blobVersionedHashes.slice();
	if ("kzg" in req) result.kzg = req.kzg;
	if ("blobWrapperVersion" in req) result.blobWrapperVersion = req.blobWrapperVersion;
	if ("blobs" in req && req.blobs) result.blobs = req.blobs.map((b) => {
		if (isBytesLike(b)) return hexlify(b);
		return Object.assign({}, b);
	});
	return result;
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/providers/abstract-signer.js
/**
*  Generally the [[Wallet]] and [[JsonRpcSigner]] and their sub-classes
*  are sufficient for most developers, but this is provided to
*  fascilitate more complex Signers.
*
*  @_section: api/providers/abstract-signer: Subclassing Signer [abstract-signer]
*/
function checkProvider(signer, operation) {
	if (signer.provider) return signer.provider;
	assert(false, "missing provider", "UNSUPPORTED_OPERATION", { operation });
}
async function populate(signer, tx) {
	let pop = copyRequest(tx);
	if (pop.to != null) pop.to = resolveAddress(pop.to, signer);
	if (pop.from != null) {
		const from = pop.from;
		pop.from = Promise.all([signer.getAddress(), resolveAddress(from, signer)]).then(([address, from]) => {
			assertArgument(address.toLowerCase() === from.toLowerCase(), "transaction from mismatch", "tx.from", from);
			return address;
		});
	} else pop.from = signer.getAddress();
	return await resolveProperties(pop);
}
/**
*  An **AbstractSigner** includes most of teh functionality required
*  to get a [[Signer]] working as expected, but requires a few
*  Signer-specific methods be overridden.
*
*/
var AbstractSigner = class {
	/**
	*  The provider this signer is connected to.
	*/
	provider;
	/**
	*  Creates a new Signer connected to %%provider%%.
	*/
	constructor(provider) {
		defineProperties(this, { provider: provider || null });
	}
	async getNonce(blockTag) {
		return checkProvider(this, "getTransactionCount").getTransactionCount(await this.getAddress(), blockTag);
	}
	async populateCall(tx) {
		return await populate(this, tx);
	}
	async populateTransaction(tx) {
		const provider = checkProvider(this, "populateTransaction");
		const pop = await populate(this, tx);
		if (pop.nonce == null) pop.nonce = await this.getNonce("pending");
		if (pop.gasLimit == null) pop.gasLimit = await this.estimateGas(pop);
		const network = await this.provider.getNetwork();
		if (pop.chainId != null) assertArgument(getBigInt(pop.chainId) === network.chainId, "transaction chainId mismatch", "tx.chainId", tx.chainId);
		else pop.chainId = network.chainId;
		const hasEip1559 = pop.maxFeePerGas != null || pop.maxPriorityFeePerGas != null;
		if (pop.gasPrice != null && (pop.type === 2 || hasEip1559)) assertArgument(false, "eip-1559 transaction do not support gasPrice", "tx", tx);
		else if ((pop.type === 0 || pop.type === 1) && hasEip1559) assertArgument(false, "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "tx", tx);
		if ((pop.type === 2 || pop.type == null) && pop.maxFeePerGas != null && pop.maxPriorityFeePerGas != null) pop.type = 2;
		else if (pop.type === 0 || pop.type === 1) {
			const feeData = await provider.getFeeData();
			assert(feeData.gasPrice != null, "network does not support gasPrice", "UNSUPPORTED_OPERATION", { operation: "getGasPrice" });
			if (pop.gasPrice == null) pop.gasPrice = feeData.gasPrice;
		} else {
			const feeData = await provider.getFeeData();
			if (pop.type == null) if (feeData.maxFeePerGas != null && feeData.maxPriorityFeePerGas != null) {
				if (pop.authorizationList && pop.authorizationList.length) pop.type = 4;
				else pop.type = 2;
				if (pop.gasPrice != null) {
					const gasPrice = pop.gasPrice;
					delete pop.gasPrice;
					pop.maxFeePerGas = gasPrice;
					pop.maxPriorityFeePerGas = gasPrice;
				} else {
					if (pop.maxFeePerGas == null) pop.maxFeePerGas = feeData.maxFeePerGas;
					if (pop.maxPriorityFeePerGas == null) pop.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
				}
			} else if (feeData.gasPrice != null) {
				assert(!hasEip1559, "network does not support EIP-1559", "UNSUPPORTED_OPERATION", { operation: "populateTransaction" });
				if (pop.gasPrice == null) pop.gasPrice = feeData.gasPrice;
				pop.type = 0;
			} else assert(false, "failed to get consistent fee data", "UNSUPPORTED_OPERATION", { operation: "signer.getFeeData" });
			else if (pop.type === 2 || pop.type === 3 || pop.type === 4) {
				if (pop.maxFeePerGas == null) pop.maxFeePerGas = feeData.maxFeePerGas;
				if (pop.maxPriorityFeePerGas == null) pop.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
			}
		}
		return await resolveProperties(pop);
	}
	async populateAuthorization(_auth) {
		const auth = Object.assign({}, _auth);
		if (auth.chainId == null) auth.chainId = (await checkProvider(this, "getNetwork").getNetwork()).chainId;
		if (auth.nonce == null) auth.nonce = await this.getNonce();
		return auth;
	}
	async estimateGas(tx) {
		return checkProvider(this, "estimateGas").estimateGas(await this.populateCall(tx));
	}
	async call(tx) {
		return checkProvider(this, "call").call(await this.populateCall(tx));
	}
	async resolveName(name) {
		return await checkProvider(this, "resolveName").resolveName(name);
	}
	async sendTransaction(tx) {
		const provider = checkProvider(this, "sendTransaction");
		const pop = await this.populateTransaction(tx);
		delete pop.from;
		const txObj = Transaction.from(pop);
		return await provider.broadcastTransaction(await this.signTransaction(txObj));
	}
	authorize(authorization) {
		assert(false, "authorization not implemented for this signer", "UNSUPPORTED_OPERATION", { operation: "authorize" });
	}
};
/**
*  A **VoidSigner** is a class designed to allow an address to be used
*  in any API which accepts a Signer, but for which there are no
*  credentials available to perform any actual signing.
*
*  This for example allow impersonating an account for the purpose of
*  static calls or estimating gas, but does not allow sending transactions.
*/
var VoidSigner = class VoidSigner extends AbstractSigner {
	/**
	*  The signer address.
	*/
	address;
	/**
	*  Creates a new **VoidSigner** with %%address%% attached to
	*  %%provider%%.
	*/
	constructor(address, provider) {
		super(provider);
		defineProperties(this, { address });
	}
	async getAddress() {
		return this.address;
	}
	connect(provider) {
		return new VoidSigner(this.address, provider);
	}
	#throwUnsupported(suffix, operation) {
		assert(false, `VoidSigner cannot sign ${suffix}`, "UNSUPPORTED_OPERATION", { operation });
	}
	async signTransaction(tx) {
		this.#throwUnsupported("transactions", "signTransaction");
	}
	async signMessage(message) {
		this.#throwUnsupported("messages", "signMessage");
	}
	async signTypedData(domain, types, value) {
		this.#throwUnsupported("typed-data", "signTypedData");
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wallet/base-wallet.js
/**
*  The **BaseWallet** is a stream-lined implementation of a
*  [[Signer]] that operates with a private key.
*
*  It is preferred to use the [[Wallet]] class, as it offers
*  additional functionality and simplifies loading a variety
*  of JSON formats, Mnemonic Phrases, etc.
*
*  This class may be of use for those attempting to implement
*  a minimal Signer.
*/
var BaseWallet = class BaseWallet extends AbstractSigner {
	/**
	*  The wallet address.
	*/
	address;
	#signingKey;
	/**
	*  Creates a new BaseWallet for %%privateKey%%, optionally
	*  connected to %%provider%%.
	*
	*  If %%provider%% is not specified, only offline methods can
	*  be used.
	*/
	constructor(privateKey, provider) {
		super(provider);
		assertArgument(privateKey && typeof privateKey.sign === "function", "invalid private key", "privateKey", "[ REDACTED ]");
		this.#signingKey = privateKey;
		const address = computeAddress(this.signingKey.publicKey);
		defineProperties(this, { address });
	}
	/**
	*  The [[SigningKey]] used for signing payloads.
	*/
	get signingKey() {
		return this.#signingKey;
	}
	/**
	*  The private key for this wallet.
	*/
	get privateKey() {
		return this.signingKey.privateKey;
	}
	async getAddress() {
		return this.address;
	}
	connect(provider) {
		return new BaseWallet(this.#signingKey, provider);
	}
	async signTransaction(tx) {
		tx = copyRequest(tx);
		const { to, from } = await resolveProperties({
			to: tx.to ? resolveAddress(tx.to, this) : void 0,
			from: tx.from ? resolveAddress(tx.from, this) : void 0
		});
		if (to != null) tx.to = to;
		if (from != null) tx.from = from;
		if (tx.from != null) {
			assertArgument(getAddress(tx.from) === this.address, "transaction from address mismatch", "tx.from", tx.from);
			delete tx.from;
		}
		const btx = Transaction.from(tx);
		btx.signature = this.signingKey.sign(btx.unsignedHash);
		return btx.serialized;
	}
	async signMessage(message) {
		return this.signMessageSync(message);
	}
	/**
	*  Returns the signature for %%message%% signed with this wallet.
	*/
	signMessageSync(message) {
		return this.signingKey.sign(hashMessage(message)).serialized;
	}
	/**
	*  Returns the Authorization for %%auth%%.
	*/
	authorizeSync(auth) {
		assertArgument(typeof auth.address === "string", "invalid address for authorizeSync", "auth.address", auth);
		const signature = this.signingKey.sign(hashAuthorization(auth));
		return Object.assign({}, {
			address: getAddress(auth.address),
			nonce: getBigInt(auth.nonce || 0),
			chainId: getBigInt(auth.chainId || 0)
		}, { signature });
	}
	/**
	*  Resolves to the Authorization for %%auth%%.
	*/
	async authorize(auth) {
		auth = Object.assign({}, auth, { address: await resolveAddress(auth.address, this) });
		return this.authorizeSync(await this.populateAuthorization(auth));
	}
	async signTypedData(domain, types, value) {
		const populated = await TypedDataEncoder.resolveNames(domain, types, value, async (name) => {
			assert(this.provider != null, "cannot resolve ENS names without a provider", "UNSUPPORTED_OPERATION", {
				operation: "resolveName",
				info: { name }
			});
			const address = await this.provider.resolveName(name);
			assert(address != null, "unconfigured ENS name", "UNCONFIGURED_NAME", { value: name });
			return address;
		});
		return this.signingKey.sign(TypedDataEncoder.hash(populated.domain, types, populated.value)).serialized;
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wordlists/decode-owl.js
var subsChrs = " !#$%&'()*+,-./<=>?@[]^_`{|}~";
var Word = /^[a-z]*$/i;
function unfold(words, sep) {
	let initial = 97;
	return words.reduce((accum, word) => {
		if (word === sep) initial++;
		else if (word.match(Word)) accum.push(String.fromCharCode(initial) + word);
		else {
			initial = 97;
			accum.push(word);
		}
		return accum;
	}, []);
}
/**
*  @_ignore
*/
function decode(data, subs) {
	for (let i = 28; i >= 0; i--) data = data.split(subsChrs[i]).join(subs.substring(2 * i, 2 * i + 2));
	const clumps = [];
	const leftover = data.replace(/(:|([0-9])|([A-Z][a-z]*))/g, (all, item, semi, word) => {
		if (semi) for (let i = parseInt(semi); i >= 0; i--) clumps.push(";");
		else clumps.push(item.toLowerCase());
		return "";
	});
	/* c8 ignore start */
	if (leftover) throw new Error(`leftovers: ${JSON.stringify(leftover)}`);
	/* c8 ignore stop */
	return unfold(unfold(clumps, ";"), ":");
}
/**
*  @_ignore
*/
function decodeOwl(data) {
	assertArgument(data[0] === "0", "unsupported auwl data", "data", data);
	return decode(data.substring(59), data.substring(1, 59));
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wordlists/wordlist.js
/**
*  A Wordlist represents a collection of language-specific
*  words used to encode and devoce [[link-bip-39]] encoded data
*  by mapping words to 11-bit values and vice versa.
*/
var Wordlist = class {
	locale;
	/**
	*  Creates a new Wordlist instance.
	*
	*  Sub-classes MUST call this if they provide their own constructor,
	*  passing in the locale string of the language.
	*
	*  Generally there is no need to create instances of a Wordlist,
	*  since each language-specific Wordlist creates an instance and
	*  there is no state kept internally, so they are safe to share.
	*/
	constructor(locale) {
		defineProperties(this, { locale });
	}
	/**
	*  Sub-classes may override this to provide a language-specific
	*  method for spliting %%phrase%% into individual words.
	*
	*  By default, %%phrase%% is split using any sequences of
	*  white-space as defined by regular expressions (i.e. ``/\s+/``).
	*/
	split(phrase) {
		return phrase.toLowerCase().split(/\s+/g);
	}
	/**
	*  Sub-classes may override this to provider a language-specific
	*  method for joining %%words%% into a phrase.
	*
	*  By default, %%words%% are joined by a single space.
	*/
	join(words) {
		return words.join(" ");
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wordlists/wordlist-owl.js
/**
*  An OWL format Wordlist is an encoding method that exploits
*  the general locality of alphabetically sorted words to
*  achieve a simple but effective means of compression.
*
*  This class is generally not useful to most developers as
*  it is used mainly internally to keep Wordlists for languages
*  based on ASCII-7 small.
*
*  If necessary, there are tools within the ``generation/`` folder
*  to create the necessary data.
*/
var WordlistOwl = class extends Wordlist {
	#data;
	#checksum;
	/**
	*  Creates a new Wordlist for %%locale%% using the OWL %%data%%
	*  and validated against the %%checksum%%.
	*/
	constructor(locale, data, checksum) {
		super(locale);
		this.#data = data;
		this.#checksum = checksum;
		this.#words = null;
	}
	/**
	*  The OWL-encoded data.
	*/
	get _data() {
		return this.#data;
	}
	/**
	*  Decode all the words for the wordlist.
	*/
	_decodeWords() {
		return decodeOwl(this.#data);
	}
	#words;
	#loadWords() {
		if (this.#words == null) {
			const words = this._decodeWords();
			/* c8 ignore start */
			if (id(words.join("\n") + "\n") !== this.#checksum) throw new Error(`BIP39 Wordlist for ${this.locale} FAILED`);
			/* c8 ignore stop */
			this.#words = words;
		}
		return this.#words;
	}
	getWord(index) {
		const words = this.#loadWords();
		assertArgument(index >= 0 && index < words.length, `invalid word index: ${index}`, "index", index);
		return words[index];
	}
	getWordIndex(word) {
		return this.#loadWords().indexOf(word);
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wordlists/lang-en.js
var words = "0erleonalorenseinceregesticitStanvetearctssi#ch2Athck&tneLl0And#Il.yLeOutO=S|S%b/ra@SurdU'0Ce[Cid|CountCu'Hie=IdOu,-Qui*Ro[TT]T%T*[Tu$0AptDD-tD*[Ju,M.UltV<)Vi)0Rob-0FairF%dRaid0A(EEntRee0Ead0MRRp%tS!_rmBumCoholErtI&LLeyLowMo,O}PhaReadySoT Ways0A>urAz(gOngOuntU'd0Aly,Ch%Ci|G G!GryIm$K!Noun)Nu$O` Sw T&naTiqueXietyY1ArtOlogyPe?P!Pro=Ril1ChCt-EaEnaGueMMedM%MyOundR<+Re,Ri=RowTTefa@Ti,Tw%k0KPe@SaultSetSi,SumeThma0H!>OmTa{T&dT.udeTra@0Ct]D.Gu,NtTh%ToTumn0Era+OcadoOid0AkeA*AyEsomeFulKw?d0Is:ByChel%C#D+GL<)Lc#y~MbooN<aNn RRelyRga(R*lSeS-SketTt!3A^AnAutyCau'ComeEfF%eG(Ha=H(dLie=LowLtN^Nef./TrayTt Twe&Y#d3Cyc!DKeNdOlogyRdR`Tt _{AdeAmeAnketA,EakE[IndOodO[omOu'UeUrUsh_rdAtDyIlMbNeNusOkO,Rd R(gRrowSsTtomUn)XY_{etA(AndA[A=EadEezeI{Id+IefIghtIngIskOccoliOk&OnzeOomO` OwnUsh2Bb!DdyD+tFf$oIldLbLkL!tNd!Nk Rd&Rg R,SS(e[SyTt Y Zz:Bba+B(B!CtusGeKe~LmM aMpNN$N)lNdyNn#NoeNvasNy#Pab!P.$Pta(RRb#RdRgoRpetRryRtSeShS(o/!Su$TT$ogT^Teg%yTt!UghtU'Ut]Ve3Il(gL yM|NsusNturyRe$Rta(_irAlkAmp]An+AosApt Ar+A'AtEapE{Ee'EfErryE,I{&IefIldIm}yOi)Oo'R#-U{!UnkUrn0G?Nnam#Rc!Tiz&TyVil_imApArifyAwAyE<ErkEv I{I|IffImbIn-IpO{OgO'O`OudOwnUbUmpU, Ut^_^A,C#utDeFfeeIlInL!@L%LumnMb(eMeMf%tM-Mm#Mp<yNc tNdu@NfirmNg*[N}@Nsid NtrolNv()OkOlPp PyR$ReRnR*@/Tt#U^UntryUp!Ur'Us(V Yo>_{Ad!AftAmA}AshAt AwlAzyEamEd.EekEwI{etImeIspIt-OpO[Ou^OwdUci$UelUi'Umb!Un^UshYY,$2BeLtu*PPbo?dRiousRr|Rta(R=Sh]/omTe3C!:DMa+MpN)Ng R(gShUght WnY3AlBa>BrisCadeCemb CideCl(eC%a>C*a'ErF&'F(eFyG*eLayLiv M<dMi'Ni$Nti,NyP?tP&dPos.P`PutyRi=ScribeS tSignSkSpair/royTailTe@VelopVi)Vo>3AgramAlAm#dAryCeE'lEtFf G.$Gn.yLemmaNn NosaurRe@RtSag*eScov Sea'ShSmi[S%d Splay/<)V tVideV%)Zzy5Ct%Cum|G~Lph(Ma(Na>NkeyN%OrSeUb!Ve_ftAg#AmaA,-AwEamE[IftIllInkIpI=OpUmY2CkMbNeR(g/T^Ty1Arf1Nam-:G G!RlyRnR`Sily/Sy1HoOlogyOnomy0GeItUca>1F%t0G1GhtTh 2BowD E@r-Eg<tEm|Eph<tEvat%I>Se0B?kBodyBra)Er+Ot]PloyPow Pty0Ab!A@DD![D%'EmyErgyF%)Ga+G(eH<)JoyLi,OughR-hRollSu*T Ti*TryVelope1Isode0U$Uip0AA'OdeOs]R%Upt0CapeSayS&)Ta>0Ern$H-s1Id&)IlOkeOl=1A@Amp!Ce[Ch<+C.eCludeCu'Ecu>Erci'Hau,Hib.I!I,ItOt-P<dPe@Pi*Pla(Po'P*[T&dTra0EEbrow:Br-CeCultyDeIntI`~L'MeMilyMousNNcyNtasyRmSh]TT$Th TigueUltV%.e3Atu*Bru?yD $EEdElMa!N)/iv$T^V W3B Ct]EldGu*LeLmLt N$NdNeNg NishReRmR,Sc$ShTT}[X_gAmeAshAtAv%EeIghtIpOatO{O%Ow UidUshY_mCusGIlLd~owOdOtR)Re,R+tRkRtu}RumRw?dSsil/ UndX_gi!AmeEqu|EshI&dIn+OgOntO,OwnOz&U.2ElNNnyRna)RyTu*:D+tInLaxy~ yMePRa+Rba+Rd&Rl-Rm|SSpTeTh U+Ze3N $NiusN*Nt!Nu(e/u*2O,0AntFtGg!Ng RaffeRlVe_dAn)A*A[IdeImp'ObeOomOryO=OwUe_tDde[LdOdO'RillaSpelSsipV nWn_bA)A(AntApeA[Av.yEatE&IdIefItOc yOupOwUnt_rdE[IdeIltIt?N3M:B.IrLfMm M, NdPpyRb%RdRshR=,TVeWkZ?d3AdAl`ArtAvyD+hogIght~oLmetLpNRo3Dd&Gh~NtPRe/%y5BbyCkeyLdLeLiday~owMeNeyOdPeRnRr%R'Sp.$/TelUrV 5BGeM<Mb!M%Nd*dNgryNtRd!RryRtSb<d3Brid:1EOn0EaEntifyLe2N%e4LLeg$L}[0A+Ita>M&'Mu}Pa@Po'Pro=Pul'0ChCludeComeC*a'DexD-a>Do%Du,ryF<tFl-tF%mHa!H .Iti$Je@JuryMa>N Noc|PutQuiryS<eSe@SideSpi*/$lTa@T e,ToVe,V.eVol=3On0L<dOla>Sue0Em1Ory:CketGu?RZz3AlousAns~yWel9BInKeUr}yY5D+I)MpNg!Ni%Nk/:Ng?oo3EnEpT^upY3CkDD}yNdNgdomSsTT^&TeTt&Wi4EeIfeO{Ow:BBelB%Dd DyKeMpNgua+PtopR+T T(UghUndryVaWWnWsu.Y Zy3Ad AfArnA=Ctu*FtGG$G&dIsu*M#NdNg`NsOp?dSs#Tt Vel3ArB tyBr?yC&'FeFtGhtKeMbM.NkOnQuid/Tt!VeZ?d5AdAnB, C$CkG-NelyNgOpTt yUdUn+VeY$5CkyGga+Mb N?N^Xury3R-s:Ch(eDG-G}tIdIlInJ%KeMm$NNa+Nda>NgoNs]Nu$P!Rb!R^Rg(R(eRketRria+SkSs/ T^T i$ThTrixTt XimumZe3AdowAnAsu*AtCh<-D$DiaLodyLtMb M%yNt]NuRcyR+R.RryShSsa+T$Thod3Dd!DnightLk~]M-NdNimumN%Nu>Rac!Rr%S ySs/akeXXedXtu*5Bi!DelDifyMM|N.%NkeyN, N`OnR$ReRn(gSqu.oTh T]T%Unta(U'VeVie5ChFf(LeLtiplySc!SeumShroomS-/Tu$3Self/ yTh:I=MePk(Rrow/yT]Tu*3ArCkEdGati=G!@I` PhewR=/TTw%kUtr$V WsXt3CeGht5B!I'M(eeOd!Rm$R`SeTab!TeTh(gTi)VelW5C!?Mb R'T:K0EyJe@Li+Scu*S =Ta(Vious0CurE<Tob 0Or1FF Fi)T&2L1Ay0DI=Ymp-0It0CeEI#L(eLy1EnEraIn]Po'T]1An+B.Ch?dD D(?yG<I|Ig($Ph<0Tr-h0H 0Tdo%T TputTside0AlEnEr0NN 0Yg&0/ 0O}:CtDd!GeIrLa)LmNdaNelN-N` P RadeR|RkRrotRtySsT^ThTi|TrolTt nU'VeYm|3A)AnutArAs<tL-<NN$tyNcilOp!Pp Rfe@Rm.Rs#T2O}OtoRa'Ys-$0AnoCn-Ctu*E)GGe#~LotNkO} Pe/olT^Zza_)A}tA,-A>AyEa'Ed+U{UgUn+2EmEtIntL?LeLi)NdNyOlPul?Rt]S.]Ssib!/TatoTt yV tyWd W _@i)Ai'Ed-tEf Epa*Es|EttyEv|I)IdeIm?yIntI%.yIs#Iva>IzeOb!mO)[Odu)Of.OgramOje@Omo>OofOp tyOsp O>@OudOvide2Bl-Dd(g~LpL'Mpk(N^PilPpyR^a'R.yRpo'R'ShTZz!3Ramid:99Al.yAntumArt E,]I{ItIzO>:Bb.Cco#CeCkD?DioIlInI'~yMpN^NdomN+PidReTeTh V&WZ%3AdyAlAs#BelBuildC$lCei=CipeC%dCyc!Du)F!@F%mFu'G]G*tGul?Je@LaxLea'LiefLyMa(Memb M(dMo=Nd NewNtOp&PairPeatPla)P%tQui*ScueSemb!Si,Sour)Sp#'SultTi*T*atTurnUn]Ve$ViewW?d2Y`m0BBb#CeChDeD+F!GhtGidNgOtPp!SkTu$V$V 5AdA,BotBu,CketM<)OfOkieOmSeTa>UghUndU>Y$5Bb DeGLeNNwayR$:DDd!D}[FeIlLadLm#L#LtLu>MeMp!NdTisfyToshiU)Usa+VeY1A!AnA*Att E}HemeHoolI&)I[%sOrp]OutRapRe&RiptRub1AAr^As#AtC#dC*tCt]Cur.yEdEkGm|Le@~M(?Ni%N'Nt&)RiesRvi)Ss]Tt!TupV&_dowAftAllowA*EdEllEriffIeldIftI}IpIv O{OeOotOpOrtOuld O=RimpRugUff!Y0Bl(gCkDeE+GhtGnL|Lk~yLv Mil?Mp!N)NgR&/ Tua>XZe1A>Et^IIllInIrtUll0AbAmEepEnd I)IdeIghtImOg<OtOwUsh0AllArtI!OkeOo`0A{AkeApIffOw0ApCc Ci$CkDaFtL?Ldi LidLut]L=Me#eNgOnRryRtUlUndUpUr)U`0A)A*Ati$AwnEakEci$EedEllEndH eI)Id IkeInIr.L.OilOns%O#OrtOtRayReadR(gY0Ua*UeezeUir*l_b!AdiumAffA+AirsAmpAndArtA>AyEakEelEmEpE*oI{IllIngO{Oma^O}OolOryO=Ra>gyReetRikeR#gRugg!Ud|UffUmb!Y!0Bje@Bm.BwayC)[ChDd&Ff G?G+,ItMm NNnyN'tP PplyP*meReRfa)R+Rpri'RroundR=ySpe@/a(1AllowAmpApArmE?EetIftImIngIt^Ord1MbolMptomRup/em:B!Ck!GIlL|LkNkPeR+tSk/eTtooXi3A^Am~NN<tNnisNtRm/Xt_nkAtEmeEnE%yE*EyIngIsOughtReeRi=RowUmbUnd 0CketDeG LtMb MeNyPRedSsueT!5A,BaccoDayDdl EGe` I!tK&MatoM%rowNeNgueNightOlO`PP-Pp!R^RnadoRtoi'SsT$Uri,W?dW WnY_{AdeAff-Ag-A(Ansf ApAshA=lAyEatEeEndI$IbeI{Igg ImIpOphyOub!U{UeUlyUmpetU,U`Y2BeIt]Mb!NaN}lRkeyRnRt!1El=EntyI)InI,O1PeP-$:5Ly5B*lla0Ab!Awa*C!Cov D DoFairFoldHappyIf%mIqueItIv 'KnownLo{TilUsu$Veil1Da>GradeHoldOnP Set1B<Ge0A+EEdEfulE![U$0Il.y:C<tCuumGueLidL!yL=NNishP%Rious/Ult3H-!L=tNd%Ntu*NueRbRifyRs]RyS'lT <3Ab!Br<tCiousCt%yDeoEw~a+Nta+Ol(Rtu$RusSaS.Su$T$Vid5C$I)IdLc<oLumeTeYa+:GeG#ItLk~LnutNtRfa*RmRri%ShSp/eT VeY3Al`Ap#ArA'lA` BDd(gEk&dIrdLcome/T_!AtEatEelEnE*IpIsp 0DeD`FeLd~NNdowNeNgNkNn Nt ReSdomSeShT}[5LfM<Nd OdOlRdRkRldRryR`_pE{E,!I,I>Ong::Rd3Ar~ow9UUngU`:3BraRo9NeO";
var checksum = "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60";
var wordlist = null;
/**
*  The [[link-bip39-en]] for [mnemonic phrases](link-bip-39).
*
*  @_docloc: api/wordlists
*/
var LangEn = class LangEn extends WordlistOwl {
	/**
	*  Creates a new instance of the English language Wordlist.
	*
	*  This should be unnecessary most of the time as the exported
	*  [[langEn]] should suffice.
	*
	*  @_ignore:
	*/
	constructor() {
		super("en", words, checksum);
	}
	/**
	*  Returns a singleton instance of a ``LangEn``, creating it
	*  if this is the first time being called.
	*/
	static wordlist() {
		if (wordlist == null) wordlist = new LangEn();
		return wordlist;
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wallet/mnemonic.js
function getUpperMask(bits) {
	return (1 << bits) - 1 << 8 - bits & 255;
}
function getLowerMask(bits) {
	return (1 << bits) - 1 & 255;
}
function mnemonicToEntropy(mnemonic, wordlist) {
	assertNormalize("NFKD");
	if (wordlist == null) wordlist = LangEn.wordlist();
	const words = wordlist.split(mnemonic);
	assertArgument(words.length % 3 === 0 && words.length >= 12 && words.length <= 24, "invalid mnemonic length", "mnemonic", "[ REDACTED ]");
	const entropy = new Uint8Array(Math.ceil(11 * words.length / 8));
	let offset = 0;
	for (let i = 0; i < words.length; i++) {
		let index = wordlist.getWordIndex(words[i].normalize("NFKD"));
		assertArgument(index >= 0, `invalid mnemonic word at index ${i}`, "mnemonic", "[ REDACTED ]");
		for (let bit = 0; bit < 11; bit++) {
			if (index & 1 << 10 - bit) entropy[offset >> 3] |= 1 << 7 - offset % 8;
			offset++;
		}
	}
	const entropyBits = 32 * words.length / 3;
	const checksumMask = getUpperMask(words.length / 3);
	assertArgument((getBytes(sha256(entropy.slice(0, entropyBits / 8)))[0] & checksumMask) === (entropy[entropy.length - 1] & checksumMask), "invalid mnemonic checksum", "mnemonic", "[ REDACTED ]");
	return hexlify(entropy.slice(0, entropyBits / 8));
}
function entropyToMnemonic(entropy, wordlist) {
	assertArgument(entropy.length % 4 === 0 && entropy.length >= 16 && entropy.length <= 32, "invalid entropy size", "entropy", "[ REDACTED ]");
	if (wordlist == null) wordlist = LangEn.wordlist();
	const indices = [0];
	let remainingBits = 11;
	for (let i = 0; i < entropy.length; i++) if (remainingBits > 8) {
		indices[indices.length - 1] <<= 8;
		indices[indices.length - 1] |= entropy[i];
		remainingBits -= 8;
	} else {
		indices[indices.length - 1] <<= remainingBits;
		indices[indices.length - 1] |= entropy[i] >> 8 - remainingBits;
		indices.push(entropy[i] & getLowerMask(8 - remainingBits));
		remainingBits += 3;
	}
	const checksumBits = entropy.length / 4;
	const checksum = parseInt(sha256(entropy).substring(2, 4), 16) & getUpperMask(checksumBits);
	indices[indices.length - 1] <<= checksumBits;
	indices[indices.length - 1] |= checksum >> 8 - checksumBits;
	return wordlist.join(indices.map((index) => wordlist.getWord(index)));
}
var _guard$1 = {};
/**
*  A **Mnemonic** wraps all properties required to compute [[link-bip-39]]
*  seeds and convert between phrases and entropy.
*/
var Mnemonic = class Mnemonic {
	/**
	*  The mnemonic phrase of 12, 15, 18, 21 or 24 words.
	*
	*  Use the [[wordlist]] ``split`` method to get the individual words.
	*/
	phrase;
	/**
	*  The password used for this mnemonic. If no password is used this
	*  is the empty string (i.e. ``""``) as per the specification.
	*/
	password;
	/**
	*  The wordlist for this mnemonic.
	*/
	wordlist;
	/**
	*  The underlying entropy which the mnemonic encodes.
	*/
	entropy;
	/**
	*  @private
	*/
	constructor(guard, entropy, phrase, password, wordlist) {
		if (password == null) password = "";
		if (wordlist == null) wordlist = LangEn.wordlist();
		assertPrivate(guard, _guard$1, "Mnemonic");
		defineProperties(this, {
			phrase,
			password,
			wordlist,
			entropy
		});
	}
	/**
	*  Returns the seed for the mnemonic.
	*/
	computeSeed() {
		const salt = toUtf8Bytes("mnemonic" + this.password, "NFKD");
		return pbkdf2(toUtf8Bytes(this.phrase, "NFKD"), salt, 2048, 64, "sha512");
	}
	/**
	*  Creates a new Mnemonic for the %%phrase%%.
	*
	*  The default %%password%% is the empty string and the default
	*  wordlist is the [English wordlists](LangEn).
	*/
	static fromPhrase(phrase, password, wordlist) {
		const entropy = mnemonicToEntropy(phrase, wordlist);
		phrase = entropyToMnemonic(getBytes(entropy), wordlist);
		return new Mnemonic(_guard$1, entropy, phrase, password, wordlist);
	}
	/**
	*  Create a new **Mnemonic** from the %%entropy%%.
	*
	*  The default %%password%% is the empty string and the default
	*  wordlist is the [English wordlists](LangEn).
	*/
	static fromEntropy(_entropy, password, wordlist) {
		const entropy = getBytes(_entropy, "entropy");
		const phrase = entropyToMnemonic(entropy, wordlist);
		return new Mnemonic(_guard$1, hexlify(entropy), phrase, password, wordlist);
	}
	/**
	*  Returns the phrase for %%mnemonic%%.
	*/
	static entropyToPhrase(_entropy, wordlist) {
		return entropyToMnemonic(getBytes(_entropy, "entropy"), wordlist);
	}
	/**
	*  Returns the entropy for %%phrase%%.
	*/
	static phraseToEntropy(phrase, wordlist) {
		return mnemonicToEntropy(phrase, wordlist);
	}
	/**
	*  Returns true if %%phrase%% is a valid [[link-bip-39]] phrase.
	*
	*  This checks all the provided words belong to the %%wordlist%%,
	*  that the length is valid and the checksum is correct.
	*/
	static isValidMnemonic(phrase, wordlist) {
		try {
			mnemonicToEntropy(phrase, wordlist);
			return true;
		} catch (error) {}
		return false;
	}
};
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wallet/utils.js
/**
*  @_ignore
*/
function zpad$1(value, length) {
	value = String(value);
	while (value.length < length) value = "0" + value;
	return value;
}
function getPassword(password) {
	if (typeof password === "string") return toUtf8Bytes(password, "NFKC");
	return getBytesCopy(password);
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wallet/json-keystore.js
/**
*  The JSON Wallet formats allow a simple way to store the private
*  keys needed in Ethereum along with related information and allows
*  for extensible forms of encryption.
*
*  These utilities facilitate decrypting and encrypting the most common
*  JSON Wallet formats.
*
*  @_subsection: api/wallet:JSON Wallets  [json-wallets]
*/
var defaultPath$1 = "m/44'/60'/0'/0/0";
function getEncryptKdfParams(options) {
	const salt = options.salt != null ? getBytes(options.salt, "options.salt") : randomBytes(32);
	let N = 1 << 17, r = 8, p = 1;
	if (options.scrypt) {
		if (options.scrypt.N) N = options.scrypt.N;
		if (options.scrypt.r) r = options.scrypt.r;
		if (options.scrypt.p) p = options.scrypt.p;
	}
	assertArgument(typeof N === "number" && N > 0 && Number.isSafeInteger(N) && (BigInt(N) & BigInt(N - 1)) === BigInt(0), "invalid scrypt N parameter", "options.N", N);
	assertArgument(typeof r === "number" && r > 0 && Number.isSafeInteger(r), "invalid scrypt r parameter", "options.r", r);
	assertArgument(typeof p === "number" && p > 0 && Number.isSafeInteger(p), "invalid scrypt p parameter", "options.p", p);
	return {
		name: "scrypt",
		dkLen: 32,
		salt,
		N,
		r,
		p
	};
}
function _encryptKeystore(key, kdf, account, options) {
	const privateKey = getBytes(account.privateKey, "privateKey");
	const iv = options.iv != null ? getBytes(options.iv, "options.iv") : randomBytes(16);
	assertArgument(iv.length === 16, "invalid options.iv length", "options.iv", options.iv);
	const uuidRandom = options.uuid != null ? getBytes(options.uuid, "options.uuid") : randomBytes(16);
	assertArgument(uuidRandom.length === 16, "invalid options.uuid length", "options.uuid", options.iv);
	const derivedKey = key.slice(0, 16);
	const macPrefix = key.slice(16, 32);
	const ciphertext = getBytes(new CTR(derivedKey, iv).encrypt(privateKey));
	const mac = keccak256(concat([macPrefix, ciphertext]));
	const data = {
		address: account.address.substring(2).toLowerCase(),
		id: uuidV4(uuidRandom),
		version: 3,
		Crypto: {
			cipher: "aes-128-ctr",
			cipherparams: { iv: hexlify(iv).substring(2) },
			ciphertext: hexlify(ciphertext).substring(2),
			kdf: "scrypt",
			kdfparams: {
				salt: hexlify(kdf.salt).substring(2),
				n: kdf.N,
				dklen: 32,
				p: kdf.p,
				r: kdf.r
			},
			mac: mac.substring(2)
		}
	};
	if (account.mnemonic) {
		const client = options.client != null ? options.client : `ethers/${version}`;
		const path = account.mnemonic.path || defaultPath$1;
		const locale = account.mnemonic.locale || "en";
		const mnemonicKey = key.slice(32, 64);
		const entropy = getBytes(account.mnemonic.entropy, "account.mnemonic.entropy");
		const mnemonicIv = randomBytes(16);
		const mnemonicCiphertext = getBytes(new CTR(mnemonicKey, mnemonicIv).encrypt(entropy));
		const now = /* @__PURE__ */ new Date();
		data["x-ethers"] = {
			client,
			gethFilename: "UTC--" + (now.getUTCFullYear() + "-" + zpad$1(now.getUTCMonth() + 1, 2) + "-" + zpad$1(now.getUTCDate(), 2) + "T" + zpad$1(now.getUTCHours(), 2) + "-" + zpad$1(now.getUTCMinutes(), 2) + "-" + zpad$1(now.getUTCSeconds(), 2) + ".0Z") + "--" + data.address,
			path,
			locale,
			mnemonicCounter: hexlify(mnemonicIv).substring(2),
			mnemonicCiphertext: hexlify(mnemonicCiphertext).substring(2),
			version: "0.1"
		};
	}
	return JSON.stringify(data);
}
/**
*  Return the JSON Keystore Wallet for %%account%% encrypted with
*  %%password%%.
*
*  The %%options%% can be used to tune the password-based key
*  derivation function parameters, explicitly set the random values
*  used. Any provided [[ProgressCallback]] is ignord.
*/
function encryptKeystoreJsonSync(account, password, options) {
	if (options == null) options = {};
	const passwordBytes = getPassword(password);
	const kdf = getEncryptKdfParams(options);
	return _encryptKeystore(getBytes(scryptSync(passwordBytes, kdf.salt, kdf.N, kdf.r, kdf.p, 64)), kdf, account, options);
}
/**
*  Resolved to the JSON Keystore Wallet for %%account%% encrypted
*  with %%password%%.
*
*  The %%options%% can be used to tune the password-based key
*  derivation function parameters, explicitly set the random values
*  used and provide a [[ProgressCallback]] to receive periodic updates
*  on the completion status..
*/
async function encryptKeystoreJson(account, password, options) {
	if (options == null) options = {};
	const passwordBytes = getPassword(password);
	const kdf = getEncryptKdfParams(options);
	return _encryptKeystore(getBytes(await scrypt(passwordBytes, kdf.salt, kdf.N, kdf.r, kdf.p, 64, options.progressCallback)), kdf, account, options);
}
//#endregion
//#region node_modules/.pnpm/ethers@6.16.0_bufferutil@4.1.0_utf-8-validate@6.0.6/node_modules/ethers/lib.esm/wallet/hdwallet.js
/**
*  Explain HD Wallets..
*
*  @_subsection: api/wallet:HD Wallets  [hd-wallets]
*/
/**
*  The default derivation path for Ethereum HD Nodes. (i.e. ``"m/44'/60'/0'/0/0"``)
*/
var defaultPath = "m/44'/60'/0'/0/0";
var MasterSecret = new Uint8Array([
	66,
	105,
	116,
	99,
	111,
	105,
	110,
	32,
	115,
	101,
	101,
	100
]);
var HardenedBit = 2147483648;
var N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var Nibbles = "0123456789abcdef";
function zpad(value, length) {
	let result = "";
	while (value) {
		result = Nibbles[value % 16] + result;
		value = Math.trunc(value / 16);
	}
	while (result.length < length * 2) result = "0" + result;
	return "0x" + result;
}
function encodeBase58Check(_value) {
	const value = getBytes(_value);
	return encodeBase58(concat([value, dataSlice(sha256(sha256(value)), 0, 4)]));
}
var _guard = {};
function ser_I(index, chainCode, publicKey, privateKey) {
	const data = new Uint8Array(37);
	if (index & HardenedBit) {
		assert(privateKey != null, "cannot derive child of neutered node", "UNSUPPORTED_OPERATION", { operation: "deriveChild" });
		data.set(getBytes(privateKey), 1);
	} else data.set(getBytes(publicKey));
	for (let i = 24; i >= 0; i -= 8) data[33 + (i >> 3)] = index >> 24 - i & 255;
	const I = getBytes(computeHmac("sha512", chainCode, data));
	return {
		IL: I.slice(0, 32),
		IR: I.slice(32)
	};
}
function derivePath(node, path) {
	const components = path.split("/");
	assertArgument(components.length > 0, "invalid path", "path", path);
	if (components[0] === "m") {
		assertArgument(node.depth === 0, `cannot derive root path (i.e. path starting with "m/") for a node at non-zero depth ${node.depth}`, "path", path);
		components.shift();
	}
	let result = node;
	for (let i = 0; i < components.length; i++) {
		const component = components[i];
		if (component.match(/^[0-9]+'$/)) {
			const index = parseInt(component.substring(0, component.length - 1));
			assertArgument(index < HardenedBit, "invalid path index", `path[${i}]`, component);
			result = result.deriveChild(HardenedBit + index);
		} else if (component.match(/^[0-9]+$/)) {
			const index = parseInt(component);
			assertArgument(index < HardenedBit, "invalid path index", `path[${i}]`, component);
			result = result.deriveChild(index);
		} else assertArgument(false, "invalid path component", `path[${i}]`, component);
	}
	return result;
}
/**
*  An **HDNodeWallet** is a [[Signer]] backed by the private key derived
*  from an HD Node using the [[link-bip-32]] stantard.
*
*  An HD Node forms a hierarchal structure with each HD Node having a
*  private key and the ability to derive child HD Nodes, defined by
*  a path indicating the index of each child.
*/
var HDNodeWallet = class HDNodeWallet extends BaseWallet {
	/**
	*  The compressed public key.
	*/
	publicKey;
	/**
	*  The fingerprint.
	*
	*  A fingerprint allows quick qay to detect parent and child nodes,
	*  but developers should be prepared to deal with collisions as it
	*  is only 4 bytes.
	*/
	fingerprint;
	/**
	*  The parent fingerprint.
	*/
	parentFingerprint;
	/**
	*  The mnemonic used to create this HD Node, if available.
	*
	*  Sources such as extended keys do not encode the mnemonic, in
	*  which case this will be ``null``.
	*/
	mnemonic;
	/**
	*  The chaincode, which is effectively a public key used
	*  to derive children.
	*/
	chainCode;
	/**
	*  The derivation path of this wallet.
	*
	*  Since extended keys do not provide full path details, this
	*  may be ``null``, if instantiated from a source that does not
	*  encode it.
	*/
	path;
	/**
	*  The child index of this wallet. Values over ``2 *\* 31`` indicate
	*  the node is hardened.
	*/
	index;
	/**
	*  The depth of this wallet, which is the number of components
	*  in its path.
	*/
	depth;
	/**
	*  @private
	*/
	constructor(guard, signingKey, parentFingerprint, chainCode, path, index, depth, mnemonic, provider) {
		super(signingKey, provider);
		assertPrivate(guard, _guard, "HDNodeWallet");
		defineProperties(this, { publicKey: signingKey.compressedPublicKey });
		const fingerprint = dataSlice(ripemd160(sha256(this.publicKey)), 0, 4);
		defineProperties(this, {
			parentFingerprint,
			fingerprint,
			chainCode,
			path,
			index,
			depth
		});
		defineProperties(this, { mnemonic });
	}
	connect(provider) {
		return new HDNodeWallet(_guard, this.signingKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, this.mnemonic, provider);
	}
	#account() {
		const account = {
			address: this.address,
			privateKey: this.privateKey
		};
		const m = this.mnemonic;
		if (this.path && m && m.wordlist.locale === "en" && m.password === "") account.mnemonic = {
			path: this.path,
			locale: "en",
			entropy: m.entropy
		};
		return account;
	}
	/**
	*  Resolves to a [JSON Keystore Wallet](json-wallets) encrypted with
	*  %%password%%.
	*
	*  If %%progressCallback%% is specified, it will receive periodic
	*  updates as the encryption process progreses.
	*/
	async encrypt(password, progressCallback) {
		return await encryptKeystoreJson(this.#account(), password, { progressCallback });
	}
	/**
	*  Returns a [JSON Keystore Wallet](json-wallets) encryped with
	*  %%password%%.
	*
	*  It is preferred to use the [async version](encrypt) instead,
	*  which allows a [[ProgressCallback]] to keep the user informed.
	*
	*  This method will block the event loop (freezing all UI) until
	*  it is complete, which may be a non-trivial duration.
	*/
	encryptSync(password) {
		return encryptKeystoreJsonSync(this.#account(), password);
	}
	/**
	*  The extended key.
	*
	*  This key will begin with the prefix ``xpriv`` and can be used to
	*  reconstruct this HD Node to derive its children.
	*/
	get extendedKey() {
		assert(this.depth < 256, "Depth too deep", "UNSUPPORTED_OPERATION", { operation: "extendedKey" });
		return encodeBase58Check(concat([
			"0x0488ADE4",
			zpad(this.depth, 1),
			this.parentFingerprint,
			zpad(this.index, 4),
			this.chainCode,
			concat(["0x00", this.privateKey])
		]));
	}
	/**
	*  Returns true if this wallet has a path, providing a Type Guard
	*  that the path is non-null.
	*/
	hasPath() {
		return this.path != null;
	}
	/**
	*  Returns a neutered HD Node, which removes the private details
	*  of an HD Node.
	*
	*  A neutered node has no private key, but can be used to derive
	*  child addresses and other public data about the HD Node.
	*/
	neuter() {
		return new HDNodeVoidWallet(_guard, this.address, this.publicKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, this.provider);
	}
	/**
	*  Return the child for %%index%%.
	*/
	deriveChild(_index) {
		const index = getNumber(_index, "index");
		assertArgument(index <= 4294967295, "invalid index", "index", index);
		let path = this.path;
		if (path) {
			path += "/" + (index & ~HardenedBit);
			if (index & HardenedBit) path += "'";
		}
		const { IR, IL } = ser_I(index, this.chainCode, this.publicKey, this.privateKey);
		return new HDNodeWallet(_guard, new SigningKey(toBeHex((toBigInt(IL) + BigInt(this.privateKey)) % N, 32)), this.fingerprint, hexlify(IR), path, index, this.depth + 1, this.mnemonic, this.provider);
	}
	/**
	*  Return the HDNode for %%path%% from this node.
	*/
	derivePath(path) {
		return derivePath(this, path);
	}
	static #fromSeed(_seed, mnemonic) {
		assertArgument(isBytesLike(_seed), "invalid seed", "seed", "[REDACTED]");
		const seed = getBytes(_seed, "seed");
		assertArgument(seed.length >= 16 && seed.length <= 64, "invalid seed", "seed", "[REDACTED]");
		const I = getBytes(computeHmac("sha512", MasterSecret, seed));
		return new HDNodeWallet(_guard, new SigningKey(hexlify(I.slice(0, 32))), "0x00000000", hexlify(I.slice(32)), "m", 0, 0, mnemonic, null);
	}
	/**
	*  Creates a new HD Node from %%extendedKey%%.
	*
	*  If the %%extendedKey%% will either have a prefix or ``xpub`` or
	*  ``xpriv``, returning a neutered HD Node ([[HDNodeVoidWallet]])
	*  or full HD Node ([[HDNodeWallet) respectively.
	*/
	static fromExtendedKey(extendedKey) {
		const bytes = toBeArray(decodeBase58(extendedKey));
		assertArgument(bytes.length === 82 || encodeBase58Check(bytes.slice(0, 78)) === extendedKey, "invalid extended key", "extendedKey", "[ REDACTED ]");
		const depth = bytes[4];
		const parentFingerprint = hexlify(bytes.slice(5, 9));
		const index = parseInt(hexlify(bytes.slice(9, 13)).substring(2), 16);
		const chainCode = hexlify(bytes.slice(13, 45));
		const key = bytes.slice(45, 78);
		switch (hexlify(bytes.slice(0, 4))) {
			case "0x0488b21e":
			case "0x043587cf": {
				const publicKey = hexlify(key);
				return new HDNodeVoidWallet(_guard, computeAddress(publicKey), publicKey, parentFingerprint, chainCode, null, index, depth, null);
			}
			case "0x0488ade4":
			case "0x04358394 ":
				if (key[0] !== 0) break;
				return new HDNodeWallet(_guard, new SigningKey(key.slice(1)), parentFingerprint, chainCode, null, index, depth, null, null);
		}
		assertArgument(false, "invalid extended key prefix", "extendedKey", "[ REDACTED ]");
	}
	/**
	*  Creates a new random HDNode.
	*/
	static createRandom(password, path, wordlist) {
		if (password == null) password = "";
		if (path == null) path = defaultPath;
		if (wordlist == null) wordlist = LangEn.wordlist();
		const mnemonic = Mnemonic.fromEntropy(randomBytes(16), password, wordlist);
		return HDNodeWallet.#fromSeed(mnemonic.computeSeed(), mnemonic).derivePath(path);
	}
	/**
	*  Create an HD Node from %%mnemonic%%.
	*/
	static fromMnemonic(mnemonic, path) {
		if (!path) path = defaultPath;
		return HDNodeWallet.#fromSeed(mnemonic.computeSeed(), mnemonic).derivePath(path);
	}
	/**
	*  Creates an HD Node from a mnemonic %%phrase%%.
	*/
	static fromPhrase(phrase, password, path, wordlist) {
		if (password == null) password = "";
		if (path == null) path = defaultPath;
		if (wordlist == null) wordlist = LangEn.wordlist();
		const mnemonic = Mnemonic.fromPhrase(phrase, password, wordlist);
		return HDNodeWallet.#fromSeed(mnemonic.computeSeed(), mnemonic).derivePath(path);
	}
	/**
	*  Creates an HD Node from a %%seed%%.
	*/
	static fromSeed(seed) {
		return HDNodeWallet.#fromSeed(seed, null);
	}
};
/**
*  A **HDNodeVoidWallet** cannot sign, but provides access to
*  the children nodes of a [[link-bip-32]] HD wallet addresses.
*
*  The can be created by using an extended ``xpub`` key to
*  [[HDNodeWallet_fromExtendedKey]] or by
*  [nuetering](HDNodeWallet-neuter) a [[HDNodeWallet]].
*/
var HDNodeVoidWallet = class HDNodeVoidWallet extends VoidSigner {
	/**
	*  The compressed public key.
	*/
	publicKey;
	/**
	*  The fingerprint.
	*
	*  A fingerprint allows quick qay to detect parent and child nodes,
	*  but developers should be prepared to deal with collisions as it
	*  is only 4 bytes.
	*/
	fingerprint;
	/**
	*  The parent node fingerprint.
	*/
	parentFingerprint;
	/**
	*  The chaincode, which is effectively a public key used
	*  to derive children.
	*/
	chainCode;
	/**
	*  The derivation path of this wallet.
	*
	*  Since extended keys do not provider full path details, this
	*  may be ``null``, if instantiated from a source that does not
	*  enocde it.
	*/
	path;
	/**
	*  The child index of this wallet. Values over ``2 *\* 31`` indicate
	*  the node is hardened.
	*/
	index;
	/**
	*  The depth of this wallet, which is the number of components
	*  in its path.
	*/
	depth;
	/**
	*  @private
	*/
	constructor(guard, address, publicKey, parentFingerprint, chainCode, path, index, depth, provider) {
		super(address, provider);
		assertPrivate(guard, _guard, "HDNodeVoidWallet");
		defineProperties(this, { publicKey });
		const fingerprint = dataSlice(ripemd160(sha256(publicKey)), 0, 4);
		defineProperties(this, {
			publicKey,
			fingerprint,
			parentFingerprint,
			chainCode,
			path,
			index,
			depth
		});
	}
	connect(provider) {
		return new HDNodeVoidWallet(_guard, this.address, this.publicKey, this.parentFingerprint, this.chainCode, this.path, this.index, this.depth, provider);
	}
	/**
	*  The extended key.
	*
	*  This key will begin with the prefix ``xpub`` and can be used to
	*  reconstruct this neutered key to derive its children addresses.
	*/
	get extendedKey() {
		assert(this.depth < 256, "Depth too deep", "UNSUPPORTED_OPERATION", { operation: "extendedKey" });
		return encodeBase58Check(concat([
			"0x0488B21E",
			zpad(this.depth, 1),
			this.parentFingerprint,
			zpad(this.index, 4),
			this.chainCode,
			this.publicKey
		]));
	}
	/**
	*  Returns true if this wallet has a path, providing a Type Guard
	*  that the path is non-null.
	*/
	hasPath() {
		return this.path != null;
	}
	/**
	*  Return the child for %%index%%.
	*/
	deriveChild(_index) {
		const index = getNumber(_index, "index");
		assertArgument(index <= 4294967295, "invalid index", "index", index);
		let path = this.path;
		if (path) {
			path += "/" + (index & ~HardenedBit);
			if (index & HardenedBit) path += "'";
		}
		const { IR, IL } = ser_I(index, this.chainCode, this.publicKey, null);
		const Ki = SigningKey.addPoints(IL, this.publicKey, true);
		return new HDNodeVoidWallet(_guard, computeAddress(Ki), Ki, this.fingerprint, hexlify(IR), path, index, this.depth + 1, this.provider);
	}
	/**
	*  Return the signer for %%path%% from this node.
	*/
	derivePath(path) {
		return derivePath(this, path);
	}
};
//#endregion
export { HDNodeWallet as t };
