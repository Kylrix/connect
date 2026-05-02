import { t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/.pnpm/base32.js@0.0.1/node_modules/base32.js/base32.js
var require_base32 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Generate a character map.
	* @param {string} alphabet e.g. "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
	* @param {object} mappings map overrides from key to value
	* @method
	*/
	var charmap = function(alphabet, mappings) {
		mappings || (mappings = {});
		alphabet.split("").forEach(function(c, i) {
			if (!(c in mappings)) mappings[c] = i;
		});
		return mappings;
	};
	/**
	* The RFC 4648 base 32 alphabet and character map.
	* @see {@link https://tools.ietf.org/html/rfc4648}
	*/
	var rfc4648 = {
		alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
		charmap: {
			0: 14,
			1: 8
		}
	};
	rfc4648.charmap = charmap(rfc4648.alphabet, rfc4648.charmap);
	/**
	* The Crockford base 32 alphabet and character map.
	* @see {@link http://www.crockford.com/wrmg/base32.html}
	*/
	var crockford = {
		alphabet: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
		charmap: {
			O: 0,
			I: 1,
			L: 1
		}
	};
	crockford.charmap = charmap(crockford.alphabet, crockford.charmap);
	/**
	* Create a new `Decoder` with the given options.
	*
	* @param {object} [options]
	*   @param {string} [type] Supported Base-32 variants are "rfc4648" and
	*     "crockford".
	*   @param {object} [charmap] Override the character map used in decoding.
	*/
	function Decoder(options) {
		this.buf = [];
		this.shift = 8;
		this.carry = 0;
		if (options) {
			switch (options.type) {
				case "rfc4648":
					this.charmap = exports.rfc4648.charmap;
					break;
				case "crockford":
					this.charmap = exports.crockford.charmap;
					break;
				default: throw new Error("invalid type");
			}
			if (options.charmap) this.charmap = options.charmap;
		}
	}
	/**
	* The default character map coresponds to RFC4648.
	*/
	Decoder.prototype.charmap = rfc4648.charmap;
	/**
	* Decode a string, continuing from the previous state.
	*
	* @param {string} str
	* @return {Decoder} this
	*/
	Decoder.prototype.write = function(str) {
		var charmap = this.charmap;
		var buf = this.buf;
		var shift = this.shift;
		var carry = this.carry;
		str.toUpperCase().split("").forEach(function(char) {
			if (char == "=") return;
			var symbol = charmap[char] & 255;
			shift -= 5;
			if (shift > 0) carry |= symbol << shift;
			else if (shift < 0) {
				buf.push(carry | symbol >> -shift);
				shift += 8;
				carry = symbol << shift & 255;
			} else {
				buf.push(carry | symbol);
				shift = 8;
				carry = 0;
			}
		});
		this.shift = shift;
		this.carry = carry;
		return this;
	};
	/**
	* Finish decoding.
	*
	* @param {string} [str] The final string to decode.
	* @return {Array} Decoded byte array.
	*/
	Decoder.prototype.finalize = function(str) {
		if (str) this.write(str);
		if (this.shift !== 8 && this.carry !== 0) {
			this.buf.push(this.carry);
			this.shift = 8;
			this.carry = 0;
		}
		return this.buf;
	};
	/**
	* Create a new `Encoder` with the given options.
	*
	* @param {object} [options]
	*   @param {string} [type] Supported Base-32 variants are "rfc4648" and
	*     "crockford".
	*   @param {object} [alphabet] Override the alphabet used in encoding.
	*/
	function Encoder(options) {
		this.buf = "";
		this.shift = 3;
		this.carry = 0;
		if (options) {
			switch (options.type) {
				case "rfc4648":
					this.alphabet = exports.rfc4648.alphabet;
					break;
				case "crockford":
					this.alphabet = exports.crockford.alphabet;
					break;
				default: throw new Error("invalid type");
			}
			if (options.alphabet) this.alphabet = options.alphabet;
			else if (options.lc) this.alphabet = this.alphabet.toLowerCase();
		}
	}
	/**
	* The default alphabet coresponds to RFC4648.
	*/
	Encoder.prototype.alphabet = rfc4648.alphabet;
	/**
	* Encode a byte array, continuing from the previous state.
	*
	* @param {byte[]} buf The byte array to encode.
	* @return {Encoder} this
	*/
	Encoder.prototype.write = function(buf) {
		var shift = this.shift;
		var carry = this.carry;
		var symbol;
		var byte;
		var i;
		for (i = 0; i < buf.length; i++) {
			byte = buf[i];
			symbol = carry | byte >> shift;
			this.buf += this.alphabet[symbol & 31];
			if (shift > 5) {
				shift -= 5;
				symbol = byte >> shift;
				this.buf += this.alphabet[symbol & 31];
			}
			shift = 5 - shift;
			carry = byte << shift;
			shift = 8 - shift;
		}
		this.shift = shift;
		this.carry = carry;
		return this;
	};
	/**
	* Finish encoding.
	*
	* @param {byte[]} [buf] The final byte array to encode.
	* @return {string} The encoded byte array.
	*/
	Encoder.prototype.finalize = function(buf) {
		if (buf) this.write(buf);
		if (this.shift !== 3) {
			this.buf += this.alphabet[this.carry & 31];
			this.shift = 3;
			this.carry = 0;
		}
		return this.buf;
	};
	/**
	* Convenience encoder.
	*
	* @param {byte[]} buf The byte array to encode.
	* @param {object} [options] Options to pass to the encoder.
	* @return {string} The encoded string.
	*/
	exports.encode = function(buf, options) {
		return new Encoder(options).finalize(buf);
	};
	/**
	* Convenience decoder.
	*
	* @param {string} str The string to decode.
	* @param {object} [options] Options to pass to the decoder.
	* @return {byte[]} The decoded byte array.
	*/
	exports.decode = function(str, options) {
		return new Decoder(options).finalize(str);
	};
	exports.Decoder = Decoder;
	exports.Encoder = Encoder;
	exports.charmap = charmap;
	exports.crockford = crockford;
	exports.rfc4648 = rfc4648;
}));
//#endregion
//#region node_modules/.pnpm/base32.js@0.0.1/node_modules/base32.js/index.js
var require_base32_js = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var base32 = require_base32();
	var finalizeDecode = base32.Decoder.prototype.finalize;
	base32.Decoder.prototype.finalize = function(buf) {
		var bytes = finalizeDecode.call(this, buf);
		return new Buffer(bytes);
	};
	module.exports = base32;
}));
//#endregion
export { require_base32_js as t };
