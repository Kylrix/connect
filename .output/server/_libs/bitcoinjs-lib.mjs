import { i as ripemd160, r as sha256 } from "./noble__hashes.mjs";
import { S as union, _ as parse, a as bigint, b as regex, c as instance, d as length, f as maxValue, g as object, h as number, i as array, l as integer, m as nullish, n as esm_default, o as custom, p as minValue, r as any, s as everyItem, u as is, v as partial, x as string, y as pipe } from "./bip32+[...].mjs";
import { a as fromHex, c as readUInt8, d as writeUInt8, i as concat, l as writeUInt16, n as encodingLength$1, o as readUInt16, r as compare, s as readUInt32, t as encode$2, u as writeUInt32 } from "./bip174+[...].mjs";
import { t as require_dist } from "./bech32.mjs";
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/networks.js
/**
* Represents the Bitcoin network configuration.
*/
var bitcoin = {
	messagePrefix: "Bitcoin Signed Message:\n",
	bech32: "bc",
	bip32: {
		public: 76067358,
		private: 76066276
	},
	pubKeyHash: 0,
	scriptHash: 5,
	wif: 128
};
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/bip66.js
/**
* Checks if the given buffer is a valid BIP66-encoded signature.
*
* @param buffer - The buffer to check.
* @returns A boolean indicating whether the buffer is a valid BIP66-encoded signature.
*/
function check(buffer) {
	if (buffer.length < 8) return false;
	if (buffer.length > 72) return false;
	if (buffer[0] !== 48) return false;
	if (buffer[1] !== buffer.length - 2) return false;
	if (buffer[2] !== 2) return false;
	const lenR = buffer[3];
	if (lenR === 0) return false;
	if (5 + lenR >= buffer.length) return false;
	if (buffer[4 + lenR] !== 2) return false;
	const lenS = buffer[5 + lenR];
	if (lenS === 0) return false;
	if (6 + lenR + lenS !== buffer.length) return false;
	if (buffer[4] & 128) return false;
	if (lenR > 1 && buffer[4] === 0 && !(buffer[5] & 128)) return false;
	if (buffer[lenR + 6] & 128) return false;
	if (lenS > 1 && buffer[lenR + 6] === 0 && !(buffer[lenR + 7] & 128)) return false;
	return true;
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/ops.js
var OPS$8;
(function(OPS) {
	OPS[OPS["OP_FALSE"] = 0] = "OP_FALSE";
	OPS[OPS["OP_0"] = 0] = "OP_0";
	OPS[OPS["OP_PUSHDATA1"] = 76] = "OP_PUSHDATA1";
	OPS[OPS["OP_PUSHDATA2"] = 77] = "OP_PUSHDATA2";
	OPS[OPS["OP_PUSHDATA4"] = 78] = "OP_PUSHDATA4";
	OPS[OPS["OP_1NEGATE"] = 79] = "OP_1NEGATE";
	OPS[OPS["OP_RESERVED"] = 80] = "OP_RESERVED";
	OPS[OPS["OP_TRUE"] = 81] = "OP_TRUE";
	OPS[OPS["OP_1"] = 81] = "OP_1";
	OPS[OPS["OP_2"] = 82] = "OP_2";
	OPS[OPS["OP_3"] = 83] = "OP_3";
	OPS[OPS["OP_4"] = 84] = "OP_4";
	OPS[OPS["OP_5"] = 85] = "OP_5";
	OPS[OPS["OP_6"] = 86] = "OP_6";
	OPS[OPS["OP_7"] = 87] = "OP_7";
	OPS[OPS["OP_8"] = 88] = "OP_8";
	OPS[OPS["OP_9"] = 89] = "OP_9";
	OPS[OPS["OP_10"] = 90] = "OP_10";
	OPS[OPS["OP_11"] = 91] = "OP_11";
	OPS[OPS["OP_12"] = 92] = "OP_12";
	OPS[OPS["OP_13"] = 93] = "OP_13";
	OPS[OPS["OP_14"] = 94] = "OP_14";
	OPS[OPS["OP_15"] = 95] = "OP_15";
	OPS[OPS["OP_16"] = 96] = "OP_16";
	OPS[OPS["OP_NOP"] = 97] = "OP_NOP";
	OPS[OPS["OP_VER"] = 98] = "OP_VER";
	OPS[OPS["OP_IF"] = 99] = "OP_IF";
	OPS[OPS["OP_NOTIF"] = 100] = "OP_NOTIF";
	OPS[OPS["OP_VERIF"] = 101] = "OP_VERIF";
	OPS[OPS["OP_VERNOTIF"] = 102] = "OP_VERNOTIF";
	OPS[OPS["OP_ELSE"] = 103] = "OP_ELSE";
	OPS[OPS["OP_ENDIF"] = 104] = "OP_ENDIF";
	OPS[OPS["OP_VERIFY"] = 105] = "OP_VERIFY";
	OPS[OPS["OP_RETURN"] = 106] = "OP_RETURN";
	OPS[OPS["OP_TOALTSTACK"] = 107] = "OP_TOALTSTACK";
	OPS[OPS["OP_FROMALTSTACK"] = 108] = "OP_FROMALTSTACK";
	OPS[OPS["OP_2DROP"] = 109] = "OP_2DROP";
	OPS[OPS["OP_2DUP"] = 110] = "OP_2DUP";
	OPS[OPS["OP_3DUP"] = 111] = "OP_3DUP";
	OPS[OPS["OP_2OVER"] = 112] = "OP_2OVER";
	OPS[OPS["OP_2ROT"] = 113] = "OP_2ROT";
	OPS[OPS["OP_2SWAP"] = 114] = "OP_2SWAP";
	OPS[OPS["OP_IFDUP"] = 115] = "OP_IFDUP";
	OPS[OPS["OP_DEPTH"] = 116] = "OP_DEPTH";
	OPS[OPS["OP_DROP"] = 117] = "OP_DROP";
	OPS[OPS["OP_DUP"] = 118] = "OP_DUP";
	OPS[OPS["OP_NIP"] = 119] = "OP_NIP";
	OPS[OPS["OP_OVER"] = 120] = "OP_OVER";
	OPS[OPS["OP_PICK"] = 121] = "OP_PICK";
	OPS[OPS["OP_ROLL"] = 122] = "OP_ROLL";
	OPS[OPS["OP_ROT"] = 123] = "OP_ROT";
	OPS[OPS["OP_SWAP"] = 124] = "OP_SWAP";
	OPS[OPS["OP_TUCK"] = 125] = "OP_TUCK";
	OPS[OPS["OP_CAT"] = 126] = "OP_CAT";
	OPS[OPS["OP_SUBSTR"] = 127] = "OP_SUBSTR";
	OPS[OPS["OP_LEFT"] = 128] = "OP_LEFT";
	OPS[OPS["OP_RIGHT"] = 129] = "OP_RIGHT";
	OPS[OPS["OP_SIZE"] = 130] = "OP_SIZE";
	OPS[OPS["OP_INVERT"] = 131] = "OP_INVERT";
	OPS[OPS["OP_AND"] = 132] = "OP_AND";
	OPS[OPS["OP_OR"] = 133] = "OP_OR";
	OPS[OPS["OP_XOR"] = 134] = "OP_XOR";
	OPS[OPS["OP_EQUAL"] = 135] = "OP_EQUAL";
	OPS[OPS["OP_EQUALVERIFY"] = 136] = "OP_EQUALVERIFY";
	OPS[OPS["OP_RESERVED1"] = 137] = "OP_RESERVED1";
	OPS[OPS["OP_RESERVED2"] = 138] = "OP_RESERVED2";
	OPS[OPS["OP_1ADD"] = 139] = "OP_1ADD";
	OPS[OPS["OP_1SUB"] = 140] = "OP_1SUB";
	OPS[OPS["OP_2MUL"] = 141] = "OP_2MUL";
	OPS[OPS["OP_2DIV"] = 142] = "OP_2DIV";
	OPS[OPS["OP_NEGATE"] = 143] = "OP_NEGATE";
	OPS[OPS["OP_ABS"] = 144] = "OP_ABS";
	OPS[OPS["OP_NOT"] = 145] = "OP_NOT";
	OPS[OPS["OP_0NOTEQUAL"] = 146] = "OP_0NOTEQUAL";
	OPS[OPS["OP_ADD"] = 147] = "OP_ADD";
	OPS[OPS["OP_SUB"] = 148] = "OP_SUB";
	OPS[OPS["OP_MUL"] = 149] = "OP_MUL";
	OPS[OPS["OP_DIV"] = 150] = "OP_DIV";
	OPS[OPS["OP_MOD"] = 151] = "OP_MOD";
	OPS[OPS["OP_LSHIFT"] = 152] = "OP_LSHIFT";
	OPS[OPS["OP_RSHIFT"] = 153] = "OP_RSHIFT";
	OPS[OPS["OP_BOOLAND"] = 154] = "OP_BOOLAND";
	OPS[OPS["OP_BOOLOR"] = 155] = "OP_BOOLOR";
	OPS[OPS["OP_NUMEQUAL"] = 156] = "OP_NUMEQUAL";
	OPS[OPS["OP_NUMEQUALVERIFY"] = 157] = "OP_NUMEQUALVERIFY";
	OPS[OPS["OP_NUMNOTEQUAL"] = 158] = "OP_NUMNOTEQUAL";
	OPS[OPS["OP_LESSTHAN"] = 159] = "OP_LESSTHAN";
	OPS[OPS["OP_GREATERTHAN"] = 160] = "OP_GREATERTHAN";
	OPS[OPS["OP_LESSTHANOREQUAL"] = 161] = "OP_LESSTHANOREQUAL";
	OPS[OPS["OP_GREATERTHANOREQUAL"] = 162] = "OP_GREATERTHANOREQUAL";
	OPS[OPS["OP_MIN"] = 163] = "OP_MIN";
	OPS[OPS["OP_MAX"] = 164] = "OP_MAX";
	OPS[OPS["OP_WITHIN"] = 165] = "OP_WITHIN";
	OPS[OPS["OP_RIPEMD160"] = 166] = "OP_RIPEMD160";
	OPS[OPS["OP_SHA1"] = 167] = "OP_SHA1";
	OPS[OPS["OP_SHA256"] = 168] = "OP_SHA256";
	OPS[OPS["OP_HASH160"] = 169] = "OP_HASH160";
	OPS[OPS["OP_HASH256"] = 170] = "OP_HASH256";
	OPS[OPS["OP_CODESEPARATOR"] = 171] = "OP_CODESEPARATOR";
	OPS[OPS["OP_CHECKSIG"] = 172] = "OP_CHECKSIG";
	OPS[OPS["OP_CHECKSIGVERIFY"] = 173] = "OP_CHECKSIGVERIFY";
	OPS[OPS["OP_CHECKMULTISIG"] = 174] = "OP_CHECKMULTISIG";
	OPS[OPS["OP_CHECKMULTISIGVERIFY"] = 175] = "OP_CHECKMULTISIGVERIFY";
	OPS[OPS["OP_NOP1"] = 176] = "OP_NOP1";
	OPS[OPS["OP_CHECKLOCKTIMEVERIFY"] = 177] = "OP_CHECKLOCKTIMEVERIFY";
	OPS[OPS["OP_NOP2"] = 177] = "OP_NOP2";
	OPS[OPS["OP_CHECKSEQUENCEVERIFY"] = 178] = "OP_CHECKSEQUENCEVERIFY";
	OPS[OPS["OP_NOP3"] = 178] = "OP_NOP3";
	OPS[OPS["OP_NOP4"] = 179] = "OP_NOP4";
	OPS[OPS["OP_NOP5"] = 180] = "OP_NOP5";
	OPS[OPS["OP_NOP6"] = 181] = "OP_NOP6";
	OPS[OPS["OP_NOP7"] = 182] = "OP_NOP7";
	OPS[OPS["OP_NOP8"] = 183] = "OP_NOP8";
	OPS[OPS["OP_NOP9"] = 184] = "OP_NOP9";
	OPS[OPS["OP_NOP10"] = 185] = "OP_NOP10";
	OPS[OPS["OP_CHECKSIGADD"] = 186] = "OP_CHECKSIGADD";
	OPS[OPS["OP_PUBKEYHASH"] = 253] = "OP_PUBKEYHASH";
	OPS[OPS["OP_PUBKEY"] = 254] = "OP_PUBKEY";
	OPS[OPS["OP_INVALIDOPCODE"] = 255] = "OP_INVALIDOPCODE";
})(OPS$8 || (OPS$8 = {}));
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/push_data.js
/**
* Calculates the encoding length of a number used for push data in Bitcoin transactions.
* @param i The number to calculate the encoding length for.
* @returns The encoding length of the number.
*/
function encodingLength(i) {
	return i < OPS$8.OP_PUSHDATA1 ? 1 : i <= 255 ? 2 : i <= 65535 ? 3 : 5;
}
/**
* Encodes a number into a buffer using a variable-length encoding scheme.
* The encoded buffer is written starting at the specified offset.
* Returns the size of the encoded buffer.
*
* @param buffer - The buffer to write the encoded data into.
* @param num - The number to encode.
* @param offset - The offset at which to start writing the encoded buffer.
* @returns The size of the encoded buffer.
*/
function encode$1(buffer, num, offset) {
	const size = encodingLength(num);
	if (size === 1) writeUInt8(buffer, offset, num);
	else if (size === 2) {
		writeUInt8(buffer, offset, OPS$8.OP_PUSHDATA1);
		writeUInt8(buffer, offset + 1, num);
	} else if (size === 3) {
		writeUInt8(buffer, offset, OPS$8.OP_PUSHDATA2);
		writeUInt16(buffer, offset + 1, num, "LE");
	} else {
		writeUInt8(buffer, offset, OPS$8.OP_PUSHDATA4);
		writeUInt32(buffer, offset + 1, num, "LE");
	}
	return size;
}
/**
* Decodes a buffer and returns information about the opcode, number, and size.
* @param buffer - The buffer to decode.
* @param offset - The offset within the buffer to start decoding.
* @returns An object containing the opcode, number, and size, or null if decoding fails.
*/
function decode$1(buffer, offset) {
	const opcode = readUInt8(buffer, offset);
	let num;
	let size;
	if (opcode < OPS$8.OP_PUSHDATA1) {
		num = opcode;
		size = 1;
	} else if (opcode === OPS$8.OP_PUSHDATA1) {
		if (offset + 2 > buffer.length) return null;
		num = readUInt8(buffer, offset + 1);
		size = 2;
	} else if (opcode === OPS$8.OP_PUSHDATA2) {
		if (offset + 3 > buffer.length) return null;
		num = readUInt16(buffer, offset + 1, "LE");
		size = 3;
	} else {
		if (offset + 5 > buffer.length) return null;
		if (opcode !== OPS$8.OP_PUSHDATA4) throw new Error("Unexpected opcode");
		num = readUInt32(buffer, offset + 1, "LE");
		size = 5;
	}
	return {
		opcode,
		number: num,
		size
	};
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/script_number.js
/**
* Decodes a script number from a buffer.
*
* @param buffer - The buffer containing the script number.
* @param maxLength - The maximum length of the script number. Defaults to 4.
* @param minimal - Whether the script number should be minimal. Defaults to true.
* @returns The decoded script number.
* @throws {TypeError} If the script number overflows the maximum length.
* @throws {Error} If the script number is not minimally encoded when minimal is true.
*/
function decode(buffer, maxLength, minimal) {
	maxLength = maxLength || 4;
	minimal = minimal === void 0 ? true : minimal;
	const length = buffer.length;
	if (length === 0) return 0;
	if (length > maxLength) throw new TypeError("Script number overflow");
	if (minimal) {
		if ((buffer[length - 1] & 127) === 0) {
			if (length <= 1 || (buffer[length - 2] & 128) === 0) throw new Error("Non-minimally encoded script number");
		}
	}
	if (length === 5) {
		const a = readUInt32(buffer, 0, "LE");
		const b = readUInt8(buffer, 4);
		if (b & 128) return -((b & -129) * 4294967296 + a);
		return b * 4294967296 + a;
	}
	let result = 0;
	for (let i = 0; i < length; ++i) result |= buffer[i] << 8 * i;
	if (buffer[length - 1] & 128) return -(result & ~(128 << 8 * (length - 1)));
	return result;
}
function scriptNumSize(i) {
	return i > 2147483647 ? 5 : i > 8388607 ? 4 : i > 32767 ? 3 : i > 127 ? 2 : i > 0 ? 1 : 0;
}
/**
* Encodes a number into a Uint8Array using a specific format.
*
* @param _number - The number to encode.
* @returns The encoded number as a Uint8Array.
*/
function encode(_number) {
	let value = Math.abs(_number);
	const size = scriptNumSize(value);
	const buffer = new Uint8Array(size);
	const negative = _number < 0;
	for (let i = 0; i < size; ++i) {
		writeUInt8(buffer, i, value & 255);
		value >>= 8;
	}
	if (buffer[size - 1] & 128) writeUInt8(buffer, size - 1, negative ? 128 : 0);
	else if (negative) buffer[size - 1] |= 128;
	return buffer;
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/types.js
var ZERO32 = new Uint8Array(32);
var EC_P = fromHex("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var NBufferSchemaFactory = (size) => pipe(instance(Uint8Array), length(size));
/**
* Checks if two arrays of Buffers are equal.
* @param a - The first array of Buffers.
* @param b - The second array of Buffers.
* @returns True if the arrays are equal, false otherwise.
*/
function stacksEqual(a, b) {
	if (a.length !== b.length) return false;
	return a.every((x, i) => {
		return compare(x, b[i]) === 0;
	});
}
/**
* Checks if the given value is a valid elliptic curve point.
* @param p - The value to check.
* @returns True if the value is a valid elliptic curve point, false otherwise.
*/
function isPoint(p) {
	if (!(p instanceof Uint8Array)) return false;
	if (p.length < 33) return false;
	const t = p[0];
	const x = p.slice(1, 33);
	if (compare(ZERO32, x) === 0) return false;
	if (compare(x, EC_P) >= 0) return false;
	if ((t === 2 || t === 3) && p.length === 33) return true;
	const y = p.slice(33);
	if (compare(ZERO32, y) === 0) return false;
	if (compare(y, EC_P) >= 0) return false;
	if (t === 4 && p.length === 65) return true;
	return false;
}
function isTapleaf(o) {
	if (!o || !("output" in o)) return false;
	if (!(o.output instanceof Uint8Array)) return false;
	if (o.version !== void 0) return (o.version & 254) === o.version;
	return true;
}
function isTaptree(scriptTree) {
	if (!Array.isArray(scriptTree)) return isTapleaf(scriptTree);
	if (scriptTree.length !== 2) return false;
	return scriptTree.every((t) => isTaptree(t));
}
var Buffer256bitSchema = NBufferSchemaFactory(32);
var Hash160bitSchema = NBufferSchemaFactory(20);
NBufferSchemaFactory(32);
var BufferSchema = instance(Uint8Array);
pipe(string(), regex(/^([0-9a-f]{2})+$/i));
pipe(number(), integer(), minValue(0), maxValue(255));
pipe(number(), integer(), minValue(0), maxValue(4294967295));
pipe(bigint(), minValue(0n), maxValue(9223372036854775807n));
var NullablePartial = (a) => object(Object.entries(a).reduce((acc, next) => ({
	...acc,
	[next[0]]: nullish(next[1])
}), {}));
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/script.js
/**
* Script tools module for working with Bitcoin scripts.
* Provides utilities such as decompiling, compiling, converting to/from ASM, stack manipulation,
* and script validation functions.
*
* @packageDocumentation
*/
/** Base opcode for OP_INT values. */
var OP_INT_BASE$1 = OPS$8.OP_RESERVED;
/** Validation schema for a Bitcoin script stack. */
var StackSchema = array(union([instance(Uint8Array), number()]));
/**
* Determines if a value corresponds to an OP_INT opcode.
*
* @param value - The opcode to check.
* @returns True if the value is an OP_INT, false otherwise.
*/
function isOPInt(value) {
	return is(number(), value) && (value === OPS$8.OP_0 || value >= OPS$8.OP_1 && value <= OPS$8.OP_16 || value === OPS$8.OP_1NEGATE);
}
/**
* Checks if a script chunk is push-only (contains only data or OP_INT opcodes).
*
* @param value - The chunk to check.
* @returns True if the chunk is push-only, false otherwise.
*/
function isPushOnlyChunk(value) {
	return is(BufferSchema, value) || isOPInt(value);
}
/**
* Determines if a stack consists of only push operations.
*
* @param value - The stack to check.
* @returns True if all elements in the stack are push-only, false otherwise.
*/
function isPushOnly(value) {
	return is(pipe(any(), everyItem(isPushOnlyChunk)), value);
}
/**
* Counts the number of non-push-only opcodes in a stack.
*
* @param value - The stack to analyze.
* @returns The count of non-push-only opcodes.
*/
function countNonPushOnlyOPs(value) {
	return value.length - value.filter(isPushOnlyChunk).length;
}
/**
* Converts a minimal script buffer to its corresponding opcode, if applicable.
*
* @param buffer - The buffer to check.
* @returns The corresponding opcode or undefined if not minimal.
*/
function asMinimalOP(buffer) {
	if (buffer.length === 0) return OPS$8.OP_0;
	if (buffer.length !== 1) return;
	if (buffer[0] >= 1 && buffer[0] <= 16) return OP_INT_BASE$1 + buffer[0];
	if (buffer[0] === 129) return OPS$8.OP_1NEGATE;
}
/**
* Determines if a buffer or stack is a Uint8Array.
*
* @param buf - The buffer or stack to check.
* @returns True if the input is a Uint8Array, false otherwise.
*/
function chunksIsBuffer(buf) {
	return buf instanceof Uint8Array;
}
/**
* Determines if a buffer or stack is a valid stack.
*
* @param buf - The buffer or stack to check.
* @returns True if the input is a stack, false otherwise.
*/
function chunksIsArray(buf) {
	return is(StackSchema, buf);
}
/**
* Determines if a single chunk is a Uint8Array.
*
* @param buf - The chunk to check.
* @returns True if the chunk is a Uint8Array, false otherwise.
*/
function singleChunkIsBuffer(buf) {
	return buf instanceof Uint8Array;
}
/**
* Compiles an array of script chunks into a Uint8Array.
*
* @param chunks - The chunks to compile.
* @returns The compiled script as a Uint8Array.
* @throws Error if compilation fails.
*/
function compile(chunks) {
	if (chunksIsBuffer(chunks)) return chunks;
	parse(StackSchema, chunks);
	const bufferSize = chunks.reduce((accum, chunk) => {
		if (singleChunkIsBuffer(chunk)) {
			if (chunk.length === 1 && asMinimalOP(chunk) !== void 0) return accum + 1;
			return accum + encodingLength(chunk.length) + chunk.length;
		}
		return accum + 1;
	}, 0);
	const buffer = new Uint8Array(bufferSize);
	let offset = 0;
	chunks.forEach((chunk) => {
		if (singleChunkIsBuffer(chunk)) {
			const opcode = asMinimalOP(chunk);
			if (opcode !== void 0) {
				writeUInt8(buffer, offset, opcode);
				offset += 1;
				return;
			}
			offset += encode$1(buffer, chunk.length, offset);
			buffer.set(chunk, offset);
			offset += chunk.length;
		} else {
			writeUInt8(buffer, offset, chunk);
			offset += 1;
		}
	});
	if (offset !== buffer.length) throw new Error("Could not decode chunks");
	return buffer;
}
/**
* Decompiles a script buffer into an array of chunks.
*
* @param buffer - The script buffer to decompile.
* @returns The decompiled chunks or null if decompilation fails.
*/
function decompile(buffer) {
	if (chunksIsArray(buffer)) return buffer;
	parse(BufferSchema, buffer);
	const chunks = [];
	let i = 0;
	while (i < buffer.length) {
		const opcode = buffer[i];
		if (opcode > OPS$8.OP_0 && opcode <= OPS$8.OP_PUSHDATA4) {
			const d = decode$1(buffer, i);
			if (d === null) return null;
			i += d.size;
			if (i + d.number > buffer.length) return null;
			const data = buffer.slice(i, i + d.number);
			i += d.number;
			const op = asMinimalOP(data);
			if (op !== void 0) chunks.push(op);
			else chunks.push(data);
		} else {
			chunks.push(opcode);
			i += 1;
		}
	}
	return chunks;
}
/**
* Converts the given chunks into a stack of buffers.
*
* @param chunks - The chunks to convert.
* @returns The stack of buffers.
*/
function toStack(chunks) {
	chunks = decompile(chunks);
	parse(custom(isPushOnly), chunks);
	return chunks.map((op) => {
		if (singleChunkIsBuffer(op)) return op;
		if (op === OPS$8.OP_0) return new Uint8Array(0);
		return encode(op - OP_INT_BASE$1);
	});
}
/**
* Checks if the provided hash type is defined.
*
* A hash type is considered defined if its modified value (after masking with ~0x80)
* is greater than 0x00 and less than 0x04.
*
* @param hashType - The hash type to check.
* @returns True if the hash type is defined, false otherwise.
*/
function isDefinedHashType(hashType) {
	const hashTypeMod = hashType & -129;
	return hashTypeMod > 0 && hashTypeMod < 4;
}
/**
* Checks if the provided buffer is a canonical script signature.
*
* A canonical script signature is a valid DER-encoded signature followed by a valid hash type byte.
*
* @param buffer - The buffer to check.
* @returns `true` if the buffer is a canonical script signature, `false` otherwise.
*/
function isCanonicalScriptSignature(buffer) {
	if (!(buffer instanceof Uint8Array)) return false;
	if (!isDefinedHashType(buffer[buffer.length - 1])) return false;
	return check(buffer.slice(0, -1));
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/payments/lazy.js
function prop(object, name, f) {
	Object.defineProperty(object, name, {
		configurable: true,
		enumerable: true,
		get() {
			const _value = f.call(this);
			this[name] = _value;
			return _value;
		},
		set(_value) {
			Object.defineProperty(this, name, {
				configurable: true,
				enumerable: true,
				value: _value,
				writable: true
			});
		}
	});
}
function value(f) {
	let _value;
	return () => {
		if (_value !== void 0) return _value;
		_value = f();
		return _value;
	};
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/payments/p2ms.js
var OPS$6 = OPS$8;
var OP_INT_BASE = OPS$6.OP_RESERVED;
function encodeSmallOrScriptNum(n) {
	return n <= 16 ? OP_INT_BASE + n : encode(n);
}
function decodeSmallOrScriptNum(chunk) {
	if (typeof chunk === "number") {
		const val = chunk - OP_INT_BASE;
		if (val < 1 || val > 16) throw new TypeError(`Invalid opcode: expected OP_1–OP_16, got ${chunk}`);
		return val;
	} else return decode(chunk);
}
function isSmallOrScriptNum(chunk) {
	if (typeof chunk === "number") return chunk - OP_INT_BASE >= 1 && chunk - OP_INT_BASE <= 16;
	else return Number.isInteger(decode(chunk));
}
/**
* Represents a function that creates a Pay-to-Multisig (P2MS) payment object.
* @param a - The payment object.
* @param opts - Optional payment options.
* @returns The created payment object.
* @throws {TypeError} If the provided data is not valid.
*/
function p2ms(a, opts) {
	if (!a.input && !a.output && !(a.pubkeys && a.m !== void 0) && !a.signatures) throw new TypeError("Not enough data");
	opts = Object.assign({ validate: true }, opts || {});
	function isAcceptableSignature(x) {
		return isCanonicalScriptSignature(x) || (opts.allowIncomplete && x === OPS$6.OP_0) !== void 0;
	}
	parse(partial(object({
		network: object({}),
		m: number(),
		n: number(),
		output: BufferSchema,
		pubkeys: array(custom(isPoint), "Received invalid pubkey"),
		signatures: array(custom(isAcceptableSignature), "Expected signature to be of type isAcceptableSignature"),
		input: BufferSchema
	})), a);
	const o = { network: a.network || bitcoin };
	let chunks = [];
	let decoded = false;
	function decode(output) {
		if (decoded) return;
		decoded = true;
		chunks = decompile(output);
		if (chunks.length < 3) throw new TypeError("Output is invalid");
		o.m = decodeSmallOrScriptNum(chunks[0]);
		o.n = decodeSmallOrScriptNum(chunks[chunks.length - 2]);
		o.pubkeys = chunks.slice(1, -2);
	}
	prop(o, "output", () => {
		if (!a.m) return;
		if (!o.n) return;
		if (!a.pubkeys) return;
		return compile([].concat(encodeSmallOrScriptNum(a.m), a.pubkeys, encodeSmallOrScriptNum(o.n), OPS$6.OP_CHECKMULTISIG));
	});
	prop(o, "m", () => {
		if (!o.output) return;
		decode(o.output);
		return o.m;
	});
	prop(o, "n", () => {
		if (!o.pubkeys) return;
		return o.pubkeys.length;
	});
	prop(o, "pubkeys", () => {
		if (!a.output) return;
		decode(a.output);
		return o.pubkeys;
	});
	prop(o, "signatures", () => {
		if (!a.input) return;
		return decompile(a.input).slice(1);
	});
	prop(o, "input", () => {
		if (!a.signatures) return;
		return compile([OPS$6.OP_0].concat(a.signatures));
	});
	prop(o, "witness", () => {
		if (!o.input) return;
		return [];
	});
	prop(o, "name", () => {
		if (!o.m || !o.n) return;
		return `p2ms(${o.m} of ${o.n})`;
	});
	if (opts.validate) {
		if (a.output) {
			decode(a.output);
			if (!isSmallOrScriptNum(chunks[0])) throw new TypeError("Output is invalid");
			if (!isSmallOrScriptNum(chunks[chunks.length - 2])) throw new TypeError("Output is invalid");
			if (chunks[chunks.length - 1] !== OPS$6.OP_CHECKMULTISIG) throw new TypeError("Output is invalid");
			if (o.m <= 0 || o.n > 20 || o.m > o.n || o.n !== chunks.length - 3) throw new TypeError("Output is invalid");
			if (!o.pubkeys.every((x) => isPoint(x))) throw new TypeError("Output is invalid");
			if (a.m !== void 0 && a.m !== o.m) throw new TypeError("m mismatch");
			if (a.n !== void 0 && a.n !== o.n) throw new TypeError("n mismatch");
			if (a.pubkeys && !stacksEqual(a.pubkeys, o.pubkeys)) throw new TypeError("Pubkeys mismatch");
		}
		if (a.pubkeys) {
			if (a.n !== void 0 && a.n !== a.pubkeys.length) throw new TypeError("Pubkey count mismatch");
			o.n = a.pubkeys.length;
			if (o.n < o.m) throw new TypeError("Pubkey count cannot be less than m");
		}
		if (a.signatures) {
			if (a.signatures.length < o.m) throw new TypeError("Not enough signatures provided");
			if (a.signatures.length > o.m) throw new TypeError("Too many signatures provided");
		}
		if (a.input) {
			if (a.input[0] !== OPS$6.OP_0) throw new TypeError("Input is invalid");
			if (o.signatures.length === 0 || !o.signatures.every(isAcceptableSignature)) throw new TypeError("Input has invalid signature(s)");
			if (a.signatures && !stacksEqual(a.signatures, o.signatures)) throw new TypeError("Signature mismatch");
			if (a.m !== void 0 && a.m !== a.signatures.length) throw new TypeError("Signature count mismatch");
		}
	}
	return Object.assign(o, a);
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/payments/p2pk.js
var OPS$5 = OPS$8;
/**
* Creates a pay-to-public-key (P2PK) payment object.
*
* @param a - The payment object containing the necessary data.
* @param opts - Optional payment options.
* @returns The P2PK payment object.
* @throws {TypeError} If the required data is not provided or if the data is invalid.
*/
function p2pk(a, opts) {
	if (!a.input && !a.output && !a.pubkey && !a.input && !a.signature) throw new TypeError("Not enough data");
	opts = Object.assign({ validate: true }, opts || {});
	parse(partial(object({
		network: object({}),
		output: BufferSchema,
		pubkey: custom(isPoint, "invalid pubkey"),
		signature: custom(isCanonicalScriptSignature, "Expected signature to be of type isCanonicalScriptSignature"),
		input: BufferSchema
	})), a);
	const _chunks = value(() => {
		return decompile(a.input);
	});
	const o = {
		name: "p2pk",
		network: a.network || bitcoin
	};
	prop(o, "output", () => {
		if (!a.pubkey) return;
		return compile([a.pubkey, OPS$5.OP_CHECKSIG]);
	});
	prop(o, "pubkey", () => {
		if (!a.output) return;
		return a.output.slice(1, -1);
	});
	prop(o, "signature", () => {
		if (!a.input) return;
		return _chunks()[0];
	});
	prop(o, "input", () => {
		if (!a.signature) return;
		return compile([a.signature]);
	});
	prop(o, "witness", () => {
		if (!o.input) return;
		return [];
	});
	if (opts.validate) {
		if (a.output) {
			if (a.output[a.output.length - 1] !== OPS$5.OP_CHECKSIG) throw new TypeError("Output is invalid");
			if (!isPoint(o.pubkey)) throw new TypeError("Output pubkey is invalid");
			if (a.pubkey && compare(a.pubkey, o.pubkey) !== 0) throw new TypeError("Pubkey mismatch");
		}
		if (a.signature) {
			if (a.input && compare(a.input, o.input) !== 0) throw new TypeError("Signature mismatch");
		}
		if (a.input) {
			if (_chunks().length !== 1) throw new TypeError("Input is invalid");
			if (!isCanonicalScriptSignature(o.signature)) throw new TypeError("Input has invalid signature");
		}
	}
	return Object.assign(o, a);
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/crypto.js
/**
* A module for hashing functions.
* include ripemd160、sha1、sha256、hash160、hash256、taggedHash
*
* @packageDocumentation
*/
/**
* Computes the HASH160 (RIPEMD-160 after SHA-256) of the given buffer.
*
* @param buffer - The input data to be hashed.
* @returns The HASH160 of the input buffer.
*/
function hash160(buffer) {
	return ripemd160(sha256(buffer));
}
/**
* A collection of tagged hash prefixes used in various BIP (Bitcoin Improvement Proposals)
* and Taproot-related operations. Each prefix is represented as a `Uint8Array`.
*
* @constant
* @type {TaggedHashPrefixes}
*
* @property {'BIP0340/challenge'} - Prefix for BIP0340 challenge.
* @property {'BIP0340/aux'} - Prefix for BIP0340 auxiliary data.
* @property {'BIP0340/nonce'} - Prefix for BIP0340 nonce.
* @property {TapLeaf} - Prefix for Taproot leaf.
* @property {TapBranch} - Prefix for Taproot branch.
* @property {TapSighash} - Prefix for Taproot sighash.
* @property {TapTweak} - Prefix for Taproot tweak.
* @property {'KeyAgg list'} - Prefix for key aggregation list.
* @property {'KeyAgg coefficient'} - Prefix for key aggregation coefficient.
*/
var TAGGED_HASH_PREFIXES = {
	"BIP0340/challenge": Uint8Array.from([
		123,
		181,
		45,
		122,
		159,
		239,
		88,
		50,
		62,
		177,
		191,
		122,
		64,
		125,
		179,
		130,
		210,
		243,
		242,
		216,
		27,
		177,
		34,
		79,
		73,
		254,
		81,
		143,
		109,
		72,
		211,
		124,
		123,
		181,
		45,
		122,
		159,
		239,
		88,
		50,
		62,
		177,
		191,
		122,
		64,
		125,
		179,
		130,
		210,
		243,
		242,
		216,
		27,
		177,
		34,
		79,
		73,
		254,
		81,
		143,
		109,
		72,
		211,
		124
	]),
	"BIP0340/aux": Uint8Array.from([
		241,
		239,
		78,
		94,
		192,
		99,
		202,
		218,
		109,
		148,
		202,
		250,
		157,
		152,
		126,
		160,
		105,
		38,
		88,
		57,
		236,
		193,
		31,
		151,
		45,
		119,
		165,
		46,
		216,
		193,
		204,
		144,
		241,
		239,
		78,
		94,
		192,
		99,
		202,
		218,
		109,
		148,
		202,
		250,
		157,
		152,
		126,
		160,
		105,
		38,
		88,
		57,
		236,
		193,
		31,
		151,
		45,
		119,
		165,
		46,
		216,
		193,
		204,
		144
	]),
	"BIP0340/nonce": Uint8Array.from([
		7,
		73,
		119,
		52,
		167,
		155,
		203,
		53,
		91,
		155,
		140,
		125,
		3,
		79,
		18,
		28,
		244,
		52,
		215,
		62,
		247,
		45,
		218,
		25,
		135,
		0,
		97,
		251,
		82,
		191,
		235,
		47,
		7,
		73,
		119,
		52,
		167,
		155,
		203,
		53,
		91,
		155,
		140,
		125,
		3,
		79,
		18,
		28,
		244,
		52,
		215,
		62,
		247,
		45,
		218,
		25,
		135,
		0,
		97,
		251,
		82,
		191,
		235,
		47
	]),
	TapLeaf: Uint8Array.from([
		174,
		234,
		143,
		220,
		66,
		8,
		152,
		49,
		5,
		115,
		75,
		88,
		8,
		29,
		30,
		38,
		56,
		211,
		95,
		28,
		181,
		64,
		8,
		212,
		211,
		87,
		202,
		3,
		190,
		120,
		233,
		238,
		174,
		234,
		143,
		220,
		66,
		8,
		152,
		49,
		5,
		115,
		75,
		88,
		8,
		29,
		30,
		38,
		56,
		211,
		95,
		28,
		181,
		64,
		8,
		212,
		211,
		87,
		202,
		3,
		190,
		120,
		233,
		238
	]),
	TapBranch: Uint8Array.from([
		25,
		65,
		161,
		242,
		229,
		110,
		185,
		95,
		162,
		169,
		241,
		148,
		190,
		92,
		1,
		247,
		33,
		111,
		51,
		237,
		130,
		176,
		145,
		70,
		52,
		144,
		208,
		91,
		245,
		22,
		160,
		21,
		25,
		65,
		161,
		242,
		229,
		110,
		185,
		95,
		162,
		169,
		241,
		148,
		190,
		92,
		1,
		247,
		33,
		111,
		51,
		237,
		130,
		176,
		145,
		70,
		52,
		144,
		208,
		91,
		245,
		22,
		160,
		21
	]),
	TapSighash: Uint8Array.from([
		244,
		10,
		72,
		223,
		75,
		42,
		112,
		200,
		180,
		146,
		75,
		242,
		101,
		70,
		97,
		237,
		61,
		149,
		253,
		102,
		163,
		19,
		235,
		135,
		35,
		117,
		151,
		198,
		40,
		228,
		160,
		49,
		244,
		10,
		72,
		223,
		75,
		42,
		112,
		200,
		180,
		146,
		75,
		242,
		101,
		70,
		97,
		237,
		61,
		149,
		253,
		102,
		163,
		19,
		235,
		135,
		35,
		117,
		151,
		198,
		40,
		228,
		160,
		49
	]),
	TapTweak: Uint8Array.from([
		232,
		15,
		225,
		99,
		156,
		156,
		160,
		80,
		227,
		175,
		27,
		57,
		193,
		67,
		198,
		62,
		66,
		156,
		188,
		235,
		21,
		217,
		64,
		251,
		181,
		197,
		161,
		244,
		175,
		87,
		197,
		233,
		232,
		15,
		225,
		99,
		156,
		156,
		160,
		80,
		227,
		175,
		27,
		57,
		193,
		67,
		198,
		62,
		66,
		156,
		188,
		235,
		21,
		217,
		64,
		251,
		181,
		197,
		161,
		244,
		175,
		87,
		197,
		233
	]),
	"KeyAgg list": Uint8Array.from([
		72,
		28,
		151,
		28,
		60,
		11,
		70,
		215,
		240,
		178,
		117,
		174,
		89,
		141,
		78,
		44,
		126,
		215,
		49,
		156,
		89,
		74,
		92,
		110,
		199,
		158,
		160,
		212,
		153,
		2,
		148,
		240,
		72,
		28,
		151,
		28,
		60,
		11,
		70,
		215,
		240,
		178,
		117,
		174,
		89,
		141,
		78,
		44,
		126,
		215,
		49,
		156,
		89,
		74,
		92,
		110,
		199,
		158,
		160,
		212,
		153,
		2,
		148,
		240
	]),
	"KeyAgg coefficient": Uint8Array.from([
		191,
		201,
		4,
		3,
		77,
		28,
		136,
		232,
		200,
		14,
		34,
		229,
		61,
		36,
		86,
		109,
		100,
		130,
		78,
		214,
		66,
		114,
		129,
		192,
		145,
		0,
		249,
		77,
		205,
		82,
		201,
		129,
		191,
		201,
		4,
		3,
		77,
		28,
		136,
		232,
		200,
		14,
		34,
		229,
		61,
		36,
		86,
		109,
		100,
		130,
		78,
		214,
		66,
		114,
		129,
		192,
		145,
		0,
		249,
		77,
		205,
		82,
		201,
		129
	])
};
/**
* Computes a tagged hash using the specified prefix and data.
*
* @param prefix - The prefix to use for the tagged hash. This should be one of the values from the `TaggedHashPrefix` enum.
* @param data - The data to hash, provided as a `Uint8Array`.
* @returns The resulting tagged hash as a `Uint8Array`.
*/
function taggedHash(prefix, data) {
	return sha256(concat([TAGGED_HASH_PREFIXES[prefix], data]));
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/payments/p2pkh.js
var OPS$4 = OPS$8;
/**
* Creates a Pay-to-Public-Key-Hash (P2PKH) payment object.
*
* @param a - The payment object containing the necessary data.
* @param opts - Optional payment options.
* @returns The P2PKH payment object.
* @throws {TypeError} If the required data is not provided or if the data is invalid.
*/
function p2pkh(a, opts) {
	if (!a.address && !a.hash && !a.output && !a.pubkey && !a.input) throw new TypeError("Not enough data");
	opts = Object.assign({ validate: true }, opts || {});
	parse(partial(object({
		network: object({}),
		address: string(),
		hash: Hash160bitSchema,
		output: NBufferSchemaFactory(25),
		pubkey: custom(isPoint),
		signature: custom(isCanonicalScriptSignature),
		input: BufferSchema
	})), a);
	const _address = value(() => {
		const payload = esm_default.decode(a.address);
		return {
			version: readUInt8(payload, 0),
			hash: payload.slice(1)
		};
	});
	const _chunks = value(() => {
		return decompile(a.input);
	});
	const network = a.network || bitcoin;
	const o = {
		name: "p2pkh",
		network
	};
	prop(o, "address", () => {
		if (!o.hash) return;
		const payload = new Uint8Array(21);
		writeUInt8(payload, 0, network.pubKeyHash);
		payload.set(o.hash, 1);
		return esm_default.encode(payload);
	});
	prop(o, "hash", () => {
		if (a.output) return a.output.slice(3, 23);
		if (a.address) return _address().hash;
		if (a.pubkey || o.pubkey) return hash160(a.pubkey || o.pubkey);
	});
	prop(o, "output", () => {
		if (!o.hash) return;
		return compile([
			OPS$4.OP_DUP,
			OPS$4.OP_HASH160,
			o.hash,
			OPS$4.OP_EQUALVERIFY,
			OPS$4.OP_CHECKSIG
		]);
	});
	prop(o, "pubkey", () => {
		if (!a.input) return;
		return _chunks()[1];
	});
	prop(o, "signature", () => {
		if (!a.input) return;
		return _chunks()[0];
	});
	prop(o, "input", () => {
		if (!a.pubkey) return;
		if (!a.signature) return;
		return compile([a.signature, a.pubkey]);
	});
	prop(o, "witness", () => {
		if (!o.input) return;
		return [];
	});
	if (opts.validate) {
		let hash = Uint8Array.from([]);
		if (a.address) {
			if (_address().version !== network.pubKeyHash) throw new TypeError("Invalid version or Network mismatch");
			if (_address().hash.length !== 20) throw new TypeError("Invalid address");
			hash = _address().hash;
		}
		if (a.hash) if (hash.length > 0 && compare(hash, a.hash) !== 0) throw new TypeError("Hash mismatch");
		else hash = a.hash;
		if (a.output) {
			if (a.output.length !== 25 || a.output[0] !== OPS$4.OP_DUP || a.output[1] !== OPS$4.OP_HASH160 || a.output[2] !== 20 || a.output[23] !== OPS$4.OP_EQUALVERIFY || a.output[24] !== OPS$4.OP_CHECKSIG) throw new TypeError("Output is invalid");
			const hash2 = a.output.slice(3, 23);
			if (hash.length > 0 && compare(hash, hash2) !== 0) throw new TypeError("Hash mismatch");
			else hash = hash2;
		}
		if (a.pubkey) {
			const pkh = hash160(a.pubkey);
			if (hash.length > 0 && compare(hash, pkh) !== 0) throw new TypeError("Hash mismatch");
			else hash = pkh;
		}
		if (a.input) {
			const chunks = _chunks();
			if (chunks.length !== 2) throw new TypeError("Input is invalid");
			if (!isCanonicalScriptSignature(chunks[0])) throw new TypeError("Input has invalid signature");
			if (!isPoint(chunks[1])) throw new TypeError("Input has invalid pubkey");
			if (a.signature && compare(a.signature, chunks[0]) !== 0) throw new TypeError("Signature mismatch");
			if (a.pubkey && compare(a.pubkey, chunks[1]) !== 0) throw new TypeError("Pubkey mismatch");
			const pkh = hash160(chunks[1]);
			if (hash.length > 0 && compare(hash, pkh) !== 0) throw new TypeError("Hash mismatch");
		}
	}
	return Object.assign(o, a);
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/payments/p2sh.js
var OPS$3 = OPS$8;
/**
* Creates a Pay-to-Script-Hash (P2SH) payment object.
*
* @param a - The payment object containing the necessary data.
* @param opts - Optional payment options.
* @returns The P2SH payment object.
* @throws {TypeError} If the required data is not provided or if the data is invalid.
*/
function p2sh(a, opts) {
	if (!a.address && !a.hash && !a.output && !a.redeem && !a.input) throw new TypeError("Not enough data");
	opts = Object.assign({ validate: true }, opts || {});
	parse(partial(object({
		network: object({}),
		address: string(),
		hash: NBufferSchemaFactory(20),
		output: NBufferSchemaFactory(23),
		redeem: partial(object({
			network: object({}),
			output: BufferSchema,
			input: BufferSchema,
			witness: array(BufferSchema)
		})),
		input: BufferSchema,
		witness: array(BufferSchema)
	})), a);
	let network = a.network;
	if (!network) network = a.redeem && a.redeem.network || bitcoin;
	const o = { network };
	const _address = value(() => {
		const payload = esm_default.decode(a.address);
		return {
			version: readUInt8(payload, 0),
			hash: payload.slice(1)
		};
	});
	const _chunks = value(() => {
		return decompile(a.input);
	});
	const _redeem = value(() => {
		const chunks = _chunks();
		const lastChunk = chunks[chunks.length - 1];
		return {
			network,
			output: lastChunk === OPS$3.OP_FALSE ? Uint8Array.from([]) : lastChunk,
			input: compile(chunks.slice(0, -1)),
			witness: a.witness || []
		};
	});
	prop(o, "address", () => {
		if (!o.hash) return;
		const payload = new Uint8Array(21);
		writeUInt8(payload, 0, o.network.scriptHash);
		payload.set(o.hash, 1);
		return esm_default.encode(payload);
	});
	prop(o, "hash", () => {
		if (a.output) return a.output.slice(2, 22);
		if (a.address) return _address().hash;
		if (o.redeem && o.redeem.output) return hash160(o.redeem.output);
	});
	prop(o, "output", () => {
		if (!o.hash) return;
		return compile([
			OPS$3.OP_HASH160,
			o.hash,
			OPS$3.OP_EQUAL
		]);
	});
	prop(o, "redeem", () => {
		if (!a.input) return;
		return _redeem();
	});
	prop(o, "input", () => {
		if (!a.redeem || !a.redeem.input || !a.redeem.output) return;
		return compile([].concat(decompile(a.redeem.input), a.redeem.output));
	});
	prop(o, "witness", () => {
		if (o.redeem && o.redeem.witness) return o.redeem.witness;
		if (o.input) return [];
	});
	prop(o, "name", () => {
		const nameParts = ["p2sh"];
		if (o.redeem !== void 0 && o.redeem.name !== void 0) nameParts.push(o.redeem.name);
		return nameParts.join("-");
	});
	if (opts.validate) {
		let hash = Uint8Array.from([]);
		if (a.address) {
			if (_address().version !== network.scriptHash) throw new TypeError("Invalid version or Network mismatch");
			if (_address().hash.length !== 20) throw new TypeError("Invalid address");
			hash = _address().hash;
		}
		if (a.hash) if (hash.length > 0 && compare(hash, a.hash) !== 0) throw new TypeError("Hash mismatch");
		else hash = a.hash;
		if (a.output) {
			if (a.output.length !== 23 || a.output[0] !== OPS$3.OP_HASH160 || a.output[1] !== 20 || a.output[22] !== OPS$3.OP_EQUAL) throw new TypeError("Output is invalid");
			const hash2 = a.output.slice(2, 22);
			if (hash.length > 0 && compare(hash, hash2) !== 0) throw new TypeError("Hash mismatch");
			else hash = hash2;
		}
		const checkRedeem = (redeem) => {
			if (redeem.output) {
				const decompile$2 = decompile(redeem.output);
				if (!decompile$2 || decompile$2.length < 1) throw new TypeError("Redeem.output too short");
				if (redeem.output.byteLength > 520) throw new TypeError("Redeem.output unspendable if larger than 520 bytes");
				if (countNonPushOnlyOPs(decompile$2) > 201) throw new TypeError("Redeem.output unspendable with more than 201 non-push ops");
				const hash2 = hash160(redeem.output);
				if (hash.length > 0 && compare(hash, hash2) !== 0) throw new TypeError("Hash mismatch");
				else hash = hash2;
			}
			if (redeem.input) {
				const hasInput = redeem.input.length > 0;
				const hasWitness = redeem.witness && redeem.witness.length > 0;
				if (!hasInput && !hasWitness) throw new TypeError("Empty input");
				if (hasInput && hasWitness) throw new TypeError("Input and witness provided");
				if (hasInput) {
					if (!isPushOnly(decompile(redeem.input))) throw new TypeError("Non push-only scriptSig");
				}
			}
		};
		if (a.input) {
			const chunks = _chunks();
			if (!chunks || chunks.length < 1) throw new TypeError("Input too short");
			if (!(_redeem().output instanceof Uint8Array)) throw new TypeError("Input is invalid");
			checkRedeem(_redeem());
		}
		if (a.redeem) {
			if (a.redeem.network && a.redeem.network !== network) throw new TypeError("Network mismatch");
			if (a.input) {
				const redeem = _redeem();
				if (a.redeem.output && compare(a.redeem.output, redeem.output) !== 0) throw new TypeError("Redeem.output mismatch");
				if (a.redeem.input && compare(a.redeem.input, redeem.input) !== 0) throw new TypeError("Redeem.input mismatch");
			}
			checkRedeem(a.redeem);
		}
		if (a.witness) {
			if (a.redeem && a.redeem.witness && !stacksEqual(a.redeem.witness, a.witness)) throw new TypeError("Witness and redeem.witness mismatch");
		}
	}
	return Object.assign(o, a);
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/payments/p2wpkh.js
var import_dist = require_dist();
var OPS$2 = OPS$8;
var EMPTY_BUFFER$2 = new Uint8Array(0);
/**
* Creates a pay-to-witness-public-key-hash (p2wpkh) payment object.
*
* @param a - The payment object containing the necessary data.
* @param opts - Optional payment options.
* @returns The p2wpkh payment object.
* @throws {TypeError} If the required data is missing or invalid.
*/
function p2wpkh(a, opts) {
	if (!a.address && !a.hash && !a.output && !a.pubkey && !a.witness) throw new TypeError("Not enough data");
	opts = Object.assign({ validate: true }, opts || {});
	parse(partial(object({
		address: string(),
		hash: NBufferSchemaFactory(20),
		input: NBufferSchemaFactory(0),
		network: object({}),
		output: NBufferSchemaFactory(22),
		pubkey: custom(isPoint, "Not a valid pubkey"),
		signature: custom(isCanonicalScriptSignature),
		witness: array(BufferSchema)
	})), a);
	const _address = value(() => {
		const result = import_dist.bech32.decode(a.address);
		const version = result.words.shift();
		const data = import_dist.bech32.fromWords(result.words);
		return {
			version,
			prefix: result.prefix,
			data: Uint8Array.from(data)
		};
	});
	const network = a.network || bitcoin;
	const o = {
		name: "p2wpkh",
		network
	};
	prop(o, "address", () => {
		if (!o.hash) return;
		const words = import_dist.bech32.toWords(o.hash);
		words.unshift(0);
		return import_dist.bech32.encode(network.bech32, words);
	});
	prop(o, "hash", () => {
		if (a.output) return a.output.slice(2, 22);
		if (a.address) return _address().data;
		if (a.pubkey || o.pubkey) return hash160(a.pubkey || o.pubkey);
	});
	prop(o, "output", () => {
		if (!o.hash) return;
		return compile([OPS$2.OP_0, o.hash]);
	});
	prop(o, "pubkey", () => {
		if (a.pubkey) return a.pubkey;
		if (!a.witness) return;
		return a.witness[1];
	});
	prop(o, "signature", () => {
		if (!a.witness) return;
		return a.witness[0];
	});
	prop(o, "input", () => {
		if (!o.witness) return;
		return EMPTY_BUFFER$2;
	});
	prop(o, "witness", () => {
		if (!a.pubkey) return;
		if (!a.signature) return;
		return [a.signature, a.pubkey];
	});
	if (opts.validate) {
		let hash = Uint8Array.from([]);
		if (a.address) {
			if (network && network.bech32 !== _address().prefix) throw new TypeError("Invalid prefix or Network mismatch");
			if (_address().version !== 0) throw new TypeError("Invalid address version");
			if (_address().data.length !== 20) throw new TypeError("Invalid address data");
			hash = _address().data;
		}
		if (a.hash) if (hash.length > 0 && compare(hash, a.hash) !== 0) throw new TypeError("Hash mismatch");
		else hash = a.hash;
		if (a.output) {
			if (a.output.length !== 22 || a.output[0] !== OPS$2.OP_0 || a.output[1] !== 20) throw new TypeError("Output is invalid");
			if (hash.length > 0 && compare(hash, a.output.slice(2)) !== 0) throw new TypeError("Hash mismatch");
			else hash = a.output.slice(2);
		}
		if (a.pubkey) {
			const pkh = hash160(a.pubkey);
			if (hash.length > 0 && compare(hash, pkh) !== 0) throw new TypeError("Hash mismatch");
			else hash = pkh;
			if (!isPoint(a.pubkey) || a.pubkey.length !== 33) throw new TypeError("Invalid pubkey for p2wpkh");
		}
		if (a.witness) {
			if (a.witness.length !== 2) throw new TypeError("Witness is invalid");
			if (!isCanonicalScriptSignature(a.witness[0])) throw new TypeError("Witness has invalid signature");
			if (!isPoint(a.witness[1]) || a.witness[1].length !== 33) throw new TypeError("Witness has invalid pubkey");
			if (a.signature && compare(a.signature, a.witness[0]) !== 0) throw new TypeError("Signature mismatch");
			if (a.pubkey && compare(a.pubkey, a.witness[1]) !== 0) throw new TypeError("Pubkey mismatch");
			const pkh = hash160(a.witness[1]);
			if (hash.length > 0 && compare(hash, pkh) !== 0) throw new TypeError("Hash mismatch");
		}
	}
	return Object.assign(o, a);
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/payments/p2wsh.js
var OPS$1 = OPS$8;
var EMPTY_BUFFER$1 = new Uint8Array(0);
function chunkHasUncompressedPubkey(chunk) {
	if (chunk instanceof Uint8Array && chunk.length === 65 && chunk[0] === 4 && isPoint(chunk)) return true;
	else return false;
}
/**
* Creates a Pay-to-Witness-Script-Hash (P2WSH) payment object.
*
* @param a - The payment object containing the necessary data.
* @param opts - Optional payment options.
* @returns The P2WSH payment object.
* @throws {TypeError} If the required data is missing or invalid.
*/
function p2wsh(a, opts) {
	if (!a.address && !a.hash && !a.output && !a.redeem && !a.witness) throw new TypeError("Not enough data");
	opts = Object.assign({ validate: true }, opts || {});
	parse(NullablePartial({
		network: object({}),
		address: string(),
		hash: Buffer256bitSchema,
		output: NBufferSchemaFactory(34),
		redeem: NullablePartial({
			input: BufferSchema,
			network: object({}),
			output: BufferSchema,
			witness: array(BufferSchema)
		}),
		input: NBufferSchemaFactory(0),
		witness: array(BufferSchema)
	}), a);
	const _address = value(() => {
		const result = import_dist.bech32.decode(a.address);
		const version = result.words.shift();
		const data = import_dist.bech32.fromWords(result.words);
		return {
			version,
			prefix: result.prefix,
			data: Uint8Array.from(data)
		};
	});
	const _rchunks = value(() => {
		return decompile(a.redeem.input);
	});
	let network = a.network;
	if (!network) network = a.redeem && a.redeem.network || bitcoin;
	const o = { network };
	prop(o, "address", () => {
		if (!o.hash) return;
		const words = import_dist.bech32.toWords(o.hash);
		words.unshift(0);
		return import_dist.bech32.encode(network.bech32, words);
	});
	prop(o, "hash", () => {
		if (a.output) return a.output.slice(2);
		if (a.address) return _address().data;
		if (o.redeem && o.redeem.output) return sha256(o.redeem.output);
	});
	prop(o, "output", () => {
		if (!o.hash) return;
		return compile([OPS$1.OP_0, o.hash]);
	});
	prop(o, "redeem", () => {
		if (!a.witness) return;
		return {
			output: a.witness[a.witness.length - 1],
			input: EMPTY_BUFFER$1,
			witness: a.witness.slice(0, -1)
		};
	});
	prop(o, "input", () => {
		if (!o.witness) return;
		return EMPTY_BUFFER$1;
	});
	prop(o, "witness", () => {
		if (a.redeem && a.redeem.input && a.redeem.input.length > 0 && a.redeem.output && a.redeem.output.length > 0) {
			const stack = toStack(_rchunks());
			o.redeem = Object.assign({ witness: stack }, a.redeem);
			o.redeem.input = EMPTY_BUFFER$1;
			return [].concat(stack, a.redeem.output);
		}
		if (!a.redeem) return;
		if (!a.redeem.output) return;
		if (!a.redeem.witness) return;
		return [].concat(a.redeem.witness, a.redeem.output);
	});
	prop(o, "name", () => {
		const nameParts = ["p2wsh"];
		if (o.redeem !== void 0 && o.redeem.name !== void 0) nameParts.push(o.redeem.name);
		return nameParts.join("-");
	});
	if (opts.validate) {
		let hash = Uint8Array.from([]);
		if (a.address) {
			if (_address().prefix !== network.bech32) throw new TypeError("Invalid prefix or Network mismatch");
			if (_address().version !== 0) throw new TypeError("Invalid address version");
			if (_address().data.length !== 32) throw new TypeError("Invalid address data");
			hash = _address().data;
		}
		if (a.hash) if (hash.length > 0 && compare(hash, a.hash) !== 0) throw new TypeError("Hash mismatch");
		else hash = a.hash;
		if (a.output) {
			if (a.output.length !== 34 || a.output[0] !== OPS$1.OP_0 || a.output[1] !== 32) throw new TypeError("Output is invalid");
			const hash2 = a.output.slice(2);
			if (hash.length > 0 && compare(hash, hash2) !== 0) throw new TypeError("Hash mismatch");
			else hash = hash2;
		}
		if (a.redeem) {
			if (a.redeem.network && a.redeem.network !== network) throw new TypeError("Network mismatch");
			if (a.redeem.input && a.redeem.input.length > 0 && a.redeem.witness && a.redeem.witness.length > 0) throw new TypeError("Ambiguous witness source");
			if (a.redeem.output) {
				const decompile$1 = decompile(a.redeem.output);
				if (!decompile$1 || decompile$1.length < 1) throw new TypeError("Redeem.output is invalid");
				if (a.redeem.output.byteLength > 3600) throw new TypeError("Redeem.output unspendable if larger than 3600 bytes");
				if (countNonPushOnlyOPs(decompile$1) > 201) throw new TypeError("Redeem.output unspendable with more than 201 non-push ops");
				const hash2 = sha256(a.redeem.output);
				if (hash.length > 0 && compare(hash, hash2) !== 0) throw new TypeError("Hash mismatch");
				else hash = hash2;
			}
			if (a.redeem.input && !isPushOnly(_rchunks())) throw new TypeError("Non push-only scriptSig");
			if (a.witness && a.redeem.witness && !stacksEqual(a.witness, a.redeem.witness)) throw new TypeError("Witness and redeem.witness mismatch");
			if (a.redeem.input && _rchunks().some(chunkHasUncompressedPubkey) || a.redeem.output && (decompile(a.redeem.output) || []).some(chunkHasUncompressedPubkey)) throw new TypeError("redeem.input or redeem.output contains uncompressed pubkey");
		}
		if (a.witness && a.witness.length > 0) {
			const wScript = a.witness[a.witness.length - 1];
			if (a.redeem && a.redeem.output && compare(a.redeem.output, wScript) !== 0) throw new TypeError("Witness and redeem.output mismatch");
			if (a.witness.some(chunkHasUncompressedPubkey) || (decompile(wScript) || []).some(chunkHasUncompressedPubkey)) throw new TypeError("Witness contains uncompressed pubkey");
		}
	}
	return Object.assign(o, a);
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/ecc_lib.js
var _ECCLIB_CACHE = {};
/**
* Initializes the ECC library with the provided instance.
* If `eccLib` is `undefined`, the library will be cleared.
* If `eccLib` is a new instance, it will be verified before setting it as the active library.
*
* @param eccLib The instance of the ECC library to initialize.
* @param opts Extra initialization options. Use {DANGER_DO_NOT_VERIFY_ECCLIB:true} if ecc verification should not be executed. Not recommended!
*/
function initEccLib(eccLib, opts) {
	if (!eccLib) _ECCLIB_CACHE.eccLib = eccLib;
	else if (eccLib !== _ECCLIB_CACHE.eccLib) {
		if (!opts?.DANGER_DO_NOT_VERIFY_ECCLIB) verifyEcc(eccLib);
		_ECCLIB_CACHE.eccLib = eccLib;
	}
}
/**
* Retrieves the ECC Library instance.
* Throws an error if the ECC Library is not provided.
* You must call initEccLib() with a valid TinySecp256k1Interface instance before calling this function.
* @returns The ECC Library instance.
* @throws Error if the ECC Library is not provided.
*/
function getEccLib() {
	if (!_ECCLIB_CACHE.eccLib) throw new Error("No ECC Library provided. You must call initEccLib() with a valid TinySecp256k1Interface instance");
	return _ECCLIB_CACHE.eccLib;
}
var h = (hex) => fromHex(hex);
/**
* Verifies the ECC functionality.
*
* @param ecc - The TinySecp256k1Interface object.
*/
function verifyEcc(ecc) {
	assert(typeof ecc.isXOnlyPoint === "function");
	assert(ecc.isXOnlyPoint(h("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798")));
	assert(ecc.isXOnlyPoint(h("fffffffffffffffffffffffffffffffffffffffffffffffffffffffeeffffc2e")));
	assert(ecc.isXOnlyPoint(h("f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9")));
	assert(ecc.isXOnlyPoint(h("0000000000000000000000000000000000000000000000000000000000000001")));
	assert(!ecc.isXOnlyPoint(h("0000000000000000000000000000000000000000000000000000000000000000")));
	assert(!ecc.isXOnlyPoint(h("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")));
	assert(typeof ecc.xOnlyPointAddTweak === "function");
	tweakAddVectors.forEach((t) => {
		const r = ecc.xOnlyPointAddTweak(h(t.pubkey), h(t.tweak));
		if (t.result === null) assert(r === null);
		else {
			assert(r !== null);
			assert(r.parity === t.parity);
			assert(compare(r.xOnlyPubkey, h(t.result)) === 0);
		}
	});
}
function assert(bool) {
	if (!bool) throw new Error("ecc library invalid");
}
var tweakAddVectors = [
	{
		pubkey: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
		tweak: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140",
		parity: -1,
		result: null
	},
	{
		pubkey: "1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b",
		tweak: "a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac",
		parity: 1,
		result: "e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf"
	},
	{
		pubkey: "2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991",
		tweak: "823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47",
		parity: 0,
		result: "9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c"
	}
];
var isHashBranch = (ht) => "left" in ht && "right" in ht;
/**
* Calculates the root hash from a given control block and leaf hash.
* @param controlBlock - The control block buffer.
* @param leafHash - The leaf hash buffer.
* @returns The root hash buffer.
* @throws {TypeError} If the control block length is less than 33.
*/
function rootHashFromPath(controlBlock, leafHash) {
	if (controlBlock.length < 33) throw new TypeError(`The control-block length is too small. Got ${controlBlock.length}, expected min 33.`);
	const m = (controlBlock.length - 33) / 32;
	let kj = leafHash;
	for (let j = 0; j < m; j++) {
		const ej = controlBlock.slice(33 + 32 * j, 65 + 32 * j);
		if (compare(kj, ej) < 0) kj = tapBranchHash(kj, ej);
		else kj = tapBranchHash(ej, kj);
	}
	return kj;
}
/**
* Build a hash tree of merkle nodes from the scripts binary tree.
* @param scriptTree - the tree of scripts to pairwise hash.
*/
function toHashTree(scriptTree) {
	if (isTapleaf(scriptTree)) return { hash: tapleafHash(scriptTree) };
	const hashes = [toHashTree(scriptTree[0]), toHashTree(scriptTree[1])];
	hashes.sort((a, b) => compare(a.hash, b.hash));
	const [left, right] = hashes;
	return {
		hash: tapBranchHash(left.hash, right.hash),
		left,
		right
	};
}
/**
* Given a HashTree, finds the path from a particular hash to the root.
* @param node - the root of the tree
* @param hash - the hash to search for
* @returns - array of sibling hashes, from leaf (inclusive) to root
* (exclusive) needed to prove inclusion of the specified hash. undefined if no
* path is found
*/
function findScriptPath(node, hash) {
	if (isHashBranch(node)) {
		const leftPath = findScriptPath(node.left, hash);
		if (leftPath !== void 0) return [...leftPath, node.right.hash];
		const rightPath = findScriptPath(node.right, hash);
		if (rightPath !== void 0) return [...rightPath, node.left.hash];
	} else if (compare(node.hash, hash) === 0) return [];
}
/**
* Calculates the tapleaf hash for a given Tapleaf object.
* @param leaf - The Tapleaf object to calculate the hash for.
* @returns The tapleaf hash as a Buffer.
*/
function tapleafHash(leaf) {
	const version = leaf.version || 192;
	return taggedHash("TapLeaf", concat([Uint8Array.from([version]), serializeScript(leaf.output)]));
}
/**
* Computes the taproot tweak hash for a given public key and optional hash.
* If a hash is provided, the public key and hash are concatenated before computing the hash.
* If no hash is provided, only the public key is used to compute the hash.
*
* @param pubKey - The public key buffer.
* @param h - The optional hash buffer.
* @returns The taproot tweak hash.
*/
function tapTweakHash(pubKey, h) {
	return taggedHash("TapTweak", concat(h ? [pubKey, h] : [pubKey]));
}
/**
* Tweak a public key with a given tweak hash.
* @param pubKey - The public key to be tweaked.
* @param h - The tweak hash.
* @returns The tweaked public key or null if the input is invalid.
*/
function tweakKey(pubKey, h) {
	if (!(pubKey instanceof Uint8Array)) return null;
	if (pubKey.length !== 32) return null;
	if (h && h.length !== 32) return null;
	const tweakHash = tapTweakHash(pubKey, h);
	const res = getEccLib().xOnlyPointAddTweak(pubKey, tweakHash);
	if (!res || res.xOnlyPubkey === null) return null;
	return {
		parity: res.parity,
		x: Uint8Array.from(res.xOnlyPubkey)
	};
}
/**
* Computes the TapBranch hash by concatenating two buffers and applying the 'TapBranch' tagged hash algorithm.
*
* @param a - The first buffer.
* @param b - The second buffer.
* @returns The TapBranch hash of the concatenated buffers.
*/
function tapBranchHash(a, b) {
	return taggedHash("TapBranch", concat([a, b]));
}
/**
* Serializes a script by encoding its length as a varint and concatenating it with the script.
*
* @param s - The script to be serialized.
* @returns The serialized script as a Buffer.
*/
function serializeScript(s) {
	const varintLen = encodingLength$1(s.length);
	const buffer = new Uint8Array(varintLen);
	encode$2(s.length, buffer);
	return concat([buffer, s]);
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/payments/p2tr.js
var OPS = OPS$8;
var TAPROOT_WITNESS_VERSION = 1;
var ANNEX_PREFIX = 80;
/**
* Creates a Pay-to-Taproot (P2TR) payment object.
*
* @param a - The payment object containing the necessary data for P2TR.
* @param opts - Optional payment options.
* @returns The P2TR payment object.
* @throws {TypeError} If the provided data is invalid or insufficient.
*/
function p2tr(a, opts) {
	if (!a.address && !a.output && !a.pubkey && !a.internalPubkey && !(a.witness && a.witness.length > 1)) throw new TypeError("Not enough data");
	opts = Object.assign({ validate: true }, opts || {});
	parse(partial(object({
		address: string(),
		input: NBufferSchemaFactory(0),
		network: object({}),
		output: NBufferSchemaFactory(34),
		internalPubkey: NBufferSchemaFactory(32),
		hash: NBufferSchemaFactory(32),
		pubkey: NBufferSchemaFactory(32),
		signature: union([NBufferSchemaFactory(64), NBufferSchemaFactory(65)]),
		witness: array(BufferSchema),
		scriptTree: custom(isTaptree, "Taptree is not of type isTaptree"),
		redeem: partial(object({
			output: BufferSchema,
			redeemVersion: number(),
			witness: array(BufferSchema)
		})),
		redeemVersion: number()
	})), a);
	const _address = value(() => {
		return fromBech32(a.address);
	});
	const _witness = value(() => {
		if (!a.witness || !a.witness.length) return;
		if (a.witness.length >= 2 && a.witness[a.witness.length - 1][0] === ANNEX_PREFIX) return a.witness.slice(0, -1);
		return a.witness.slice();
	});
	const _hashTree = value(() => {
		if (a.scriptTree) return toHashTree(a.scriptTree);
		if (a.hash) return { hash: a.hash };
	});
	const network = a.network || bitcoin;
	const o = {
		name: "p2tr",
		network
	};
	prop(o, "address", () => {
		if (!o.pubkey) return;
		const words = import_dist.bech32m.toWords(o.pubkey);
		words.unshift(TAPROOT_WITNESS_VERSION);
		return import_dist.bech32m.encode(network.bech32, words);
	});
	prop(o, "hash", () => {
		const hashTree = _hashTree();
		if (hashTree) return hashTree.hash;
		const w = _witness();
		if (w && w.length > 1) {
			const controlBlock = w[w.length - 1];
			const leafVersion = controlBlock[0] & 254;
			const script = w[w.length - 2];
			return rootHashFromPath(controlBlock, tapleafHash({
				output: script,
				version: leafVersion
			}));
		}
		return null;
	});
	prop(o, "output", () => {
		if (!o.pubkey) return;
		return compile([OPS.OP_1, o.pubkey]);
	});
	prop(o, "redeemVersion", () => {
		if (a.redeemVersion) return a.redeemVersion;
		if (a.redeem && a.redeem.redeemVersion !== void 0 && a.redeem.redeemVersion !== null) return a.redeem.redeemVersion;
		return 192;
	});
	prop(o, "redeem", () => {
		const witness = _witness();
		if (!witness || witness.length < 2) return;
		return {
			output: witness[witness.length - 2],
			witness: witness.slice(0, -2),
			redeemVersion: witness[witness.length - 1][0] & 254
		};
	});
	prop(o, "pubkey", () => {
		if (a.pubkey) return a.pubkey;
		if (a.output) return a.output.slice(2);
		if (a.address) return _address().data;
		if (o.internalPubkey) {
			const tweakedKey = tweakKey(o.internalPubkey, o.hash);
			if (tweakedKey) return tweakedKey.x;
		}
	});
	prop(o, "internalPubkey", () => {
		if (a.internalPubkey) return a.internalPubkey;
		const witness = _witness();
		if (witness && witness.length > 1) return witness[witness.length - 1].slice(1, 33);
	});
	prop(o, "signature", () => {
		if (a.signature) return a.signature;
		const witness = _witness();
		if (!witness || witness.length !== 1) return;
		return witness[0];
	});
	prop(o, "witness", () => {
		if (a.witness) return a.witness;
		const hashTree = _hashTree();
		if (hashTree && a.redeem && a.redeem.output && a.internalPubkey) {
			const path = findScriptPath(hashTree, tapleafHash({
				output: a.redeem.output,
				version: o.redeemVersion
			}));
			if (!path) return;
			const outputKey = tweakKey(a.internalPubkey, hashTree.hash);
			if (!outputKey) return;
			const controlBock = concat([Uint8Array.from([o.redeemVersion | outputKey.parity]), a.internalPubkey].concat(path));
			return [a.redeem.output, controlBock];
		}
		if (a.signature) return [a.signature];
	});
	if (opts.validate) {
		let pubkey = Uint8Array.from([]);
		if (a.address) {
			if (network && network.bech32 !== _address().prefix) throw new TypeError("Invalid prefix or Network mismatch");
			if (_address().version !== TAPROOT_WITNESS_VERSION) throw new TypeError("Invalid address version");
			if (_address().data.length !== 32) throw new TypeError("Invalid address data");
			pubkey = _address().data;
		}
		if (a.pubkey) if (pubkey.length > 0 && compare(pubkey, a.pubkey) !== 0) throw new TypeError("Pubkey mismatch");
		else pubkey = a.pubkey;
		if (a.output) {
			if (a.output.length !== 34 || a.output[0] !== OPS.OP_1 || a.output[1] !== 32) throw new TypeError("Output is invalid");
			if (pubkey.length > 0 && compare(pubkey, a.output.slice(2)) !== 0) throw new TypeError("Pubkey mismatch");
			else pubkey = a.output.slice(2);
		}
		if (a.internalPubkey) {
			const tweakedKey = tweakKey(a.internalPubkey, o.hash);
			if (pubkey.length > 0 && compare(pubkey, tweakedKey.x) !== 0) throw new TypeError("Pubkey mismatch");
			else pubkey = tweakedKey.x;
		}
		if (pubkey && pubkey.length) {
			if (!getEccLib().isXOnlyPoint(pubkey)) throw new TypeError("Invalid pubkey for p2tr");
		}
		const hashTree = _hashTree();
		if (a.hash && hashTree) {
			if (compare(a.hash, hashTree.hash) !== 0) throw new TypeError("Hash mismatch");
		}
		if (a.redeem && a.redeem.output && hashTree) {
			if (!findScriptPath(hashTree, tapleafHash({
				output: a.redeem.output,
				version: o.redeemVersion
			}))) throw new TypeError("Redeem script not in tree");
		}
		const witness = _witness();
		if (a.redeem && o.redeem) {
			if (a.redeem.redeemVersion) {
				if (a.redeem.redeemVersion !== o.redeem.redeemVersion) throw new TypeError("Redeem.redeemVersion and witness mismatch");
			}
			if (a.redeem.output) {
				if (decompile(a.redeem.output).length === 0) throw new TypeError("Redeem.output is invalid");
				if (o.redeem.output && compare(a.redeem.output, o.redeem.output) !== 0) throw new TypeError("Redeem.output and witness mismatch");
			}
			if (a.redeem.witness) {
				if (o.redeem.witness && !stacksEqual(a.redeem.witness, o.redeem.witness)) throw new TypeError("Redeem.witness and witness mismatch");
			}
		}
		if (witness && witness.length) if (witness.length === 1) {
			if (a.signature && compare(a.signature, witness[0]) !== 0) throw new TypeError("Signature mismatch");
		} else {
			const controlBlock = witness[witness.length - 1];
			if (controlBlock.length < 33) throw new TypeError(`The control-block length is too small. Got ${controlBlock.length}, expected min 33.`);
			if ((controlBlock.length - 33) % 32 !== 0) throw new TypeError(`The control-block length of ${controlBlock.length} is incorrect!`);
			const m = (controlBlock.length - 33) / 32;
			if (m > 128) throw new TypeError(`The script path is too long. Got ${m}, expected max 128.`);
			const internalPubkey = controlBlock.slice(1, 33);
			if (a.internalPubkey && compare(a.internalPubkey, internalPubkey) !== 0) throw new TypeError("Internal pubkey mismatch");
			if (!getEccLib().isXOnlyPoint(internalPubkey)) throw new TypeError("Invalid internalPubkey for p2tr witness");
			const leafVersion = controlBlock[0] & 254;
			const script = witness[witness.length - 2];
			const outputKey = tweakKey(internalPubkey, rootHashFromPath(controlBlock, tapleafHash({
				output: script,
				version: leafVersion
			})));
			if (!outputKey) throw new TypeError("Invalid outputKey for p2tr witness");
			if (pubkey.length && compare(pubkey, outputKey.x) !== 0) throw new TypeError("Pubkey mismatch for p2tr witness");
			if (outputKey.parity !== (controlBlock[0] & 1)) throw new Error("Incorrect parity");
		}
	}
	return Object.assign(o, a);
}
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/address.js
/**
* Converts a Bech32 or Bech32m encoded address to its corresponding data representation.
* @param address - The Bech32 or Bech32m encoded address.
* @returns An object containing the version, prefix, and data of the address.
* @throws {TypeError} If the address uses the wrong encoding.
*/
function fromBech32(address) {
	let result;
	let version;
	try {
		result = import_dist.bech32.decode(address);
	} catch (e) {}
	if (result) {
		version = result.words[0];
		if (version !== 0) throw new TypeError(address + " uses wrong encoding");
	} else {
		result = import_dist.bech32m.decode(address);
		version = result.words[0];
		if (version === 0) throw new TypeError(address + " uses wrong encoding");
	}
	const data = import_dist.bech32.fromWords(result.words.slice(1));
	return {
		version,
		prefix: result.prefix,
		data: Uint8Array.from(data)
	};
}
fromHex("0000000000000000000000000000000000000000000000000000000000000000");
fromHex("0000000000000000000000000000000000000000000000000000000000000001");
fromHex("ffffffffffffffff");
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/psbt/psbtutils.js
/**
* Checks if a given payment factory can generate a payment script from a given script.
* @param payment The payment factory to check.
* @returns A function that takes a script and returns a boolean indicating whether the payment factory can generate a payment script from the script.
*/
function isPaymentFactory(payment) {
	return (script) => {
		try {
			payment({ output: script });
			return true;
		} catch (err) {
			return false;
		}
	};
}
isPaymentFactory(p2ms);
isPaymentFactory(p2pk);
isPaymentFactory(p2pkh);
isPaymentFactory(p2wpkh);
isPaymentFactory(p2wsh);
isPaymentFactory(p2sh);
isPaymentFactory(p2tr);
//#endregion
//#region node_modules/.pnpm/bitcoinjs-lib@7.0.1_typescript@5.8.2/node_modules/bitcoinjs-lib/src/esm/psbt.js
function scriptCheckerFactory(payment, paymentScriptName) {
	return (inputIndex, scriptPubKey, redeemScript, ioType) => {
		const redeemScriptOutput = payment({ redeem: { output: redeemScript } }).output;
		if (compare(scriptPubKey, redeemScriptOutput)) throw new Error(`${paymentScriptName} for ${ioType} #${inputIndex} doesn't match the scriptPubKey in the prevout`);
	};
}
scriptCheckerFactory(p2sh, "Redeem script");
scriptCheckerFactory(p2wsh, "Witness script");
//#endregion
export { p2wpkh as n, bitcoin as r, initEccLib as t };
