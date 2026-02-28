"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/0.js
var require__ = __commonJS({
  "node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/0.js"(exports2, module2) {
    "use strict";
    module2.exports = function(fn2) {
      return function() {
        return fn2.apply(null, arguments);
      };
    };
  }
});

// node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/1.js
var require__2 = __commonJS({
  "node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/1.js"(exports2, module2) {
    "use strict";
    module2.exports = function(fn2) {
      return function(a) {
        return fn2.apply(null, arguments);
      };
    };
  }
});

// node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/2.js
var require__3 = __commonJS({
  "node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/2.js"(exports2, module2) {
    "use strict";
    module2.exports = function(fn2) {
      return function(a, b) {
        return fn2.apply(null, arguments);
      };
    };
  }
});

// node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/3.js
var require__4 = __commonJS({
  "node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/3.js"(exports2, module2) {
    "use strict";
    module2.exports = function(fn2) {
      return function(a, b, c) {
        return fn2.apply(null, arguments);
      };
    };
  }
});

// node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/4.js
var require__5 = __commonJS({
  "node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/4.js"(exports2, module2) {
    "use strict";
    module2.exports = function(fn2) {
      return function(a, b, c, d) {
        return fn2.apply(null, arguments);
      };
    };
  }
});

// node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/5.js
var require__6 = __commonJS({
  "node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/5.js"(exports2, module2) {
    "use strict";
    module2.exports = function(fn2) {
      return function(a, b, c, d, e) {
        return fn2.apply(null, arguments);
      };
    };
  }
});

// node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/N.js
var require_N = __commonJS({
  "node_modules/.pnpm/arity-n@1.0.4/node_modules/arity-n/N.js"(exports2, module2) {
    "use strict";
    var arityFn = [
      require__(),
      require__2(),
      require__3(),
      require__4(),
      require__5(),
      require__6()
    ];
    module2.exports = function(fn2, n) {
      if (n && n <= 5) {
        return arityFn[n](fn2);
      } else {
        return fn2;
      }
    };
  }
});

// node_modules/.pnpm/compose-function@3.0.3/node_modules/compose-function/index.js
var require_compose_function = __commonJS({
  "node_modules/.pnpm/compose-function@3.0.3/node_modules/compose-function/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = compose;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _arityN = require_N();
    var _arityN2 = _interopRequireDefault(_arityN);
    var compose2 = function compose22(f, g) {
      return function() {
        return f(g.apply(void 0, arguments));
      };
    };
    function compose() {
      for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
        functions[_key] = arguments[_key];
      }
      var funcs = functions.filter(function(fn2) {
        return typeof fn2 === "function";
      });
      var lastIdx = funcs.length - 1;
      var arity2 = 0;
      if (funcs.length <= 0) {
        throw new Error("No funcs passed");
      }
      if (lastIdx >= 0 && funcs[lastIdx]) {
        arity2 = funcs[lastIdx].length;
      }
      return (0, _arityN2["default"])(funcs.reduce(compose2), arity2);
    }
    module2.exports = exports2["default"];
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/shell-lexer.js
var require_shell_lexer = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/shell-lexer.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var posixShellLexer = (mode, options) => ({
      lex() {
        const item = this.tokenizer.next();
        const tk = item.value;
        const tkType = tk.originalType;
        const text = tk.value;
        this.yytext = { text };
        if (tk.expansion) {
          this.yytext.expansion = tk.expansion;
        }
        if (tk.originalText) {
          this.yytext.originalText = tk.originalText;
        }
        if (tk.type) {
          this.yytext.type = tk.type;
        }
        if (tk.maybeSimpleCommandName) {
          this.yytext.maybeSimpleCommandName = tk.maybeSimpleCommandName;
        }
        if (tk.joined) {
          this.yytext.joined = tk.joined;
        }
        if (tk.fieldIdx !== void 0) {
          this.yytext.fieldIdx = tk.fieldIdx;
        }
        if (options.insertLOC && tk.loc) {
          this.yytext.loc = tk.loc;
        }
        if (tk.loc) {
          this.yylineno = tk.loc.start.row - 1;
        }
        return tkType;
      },
      setInput(source) {
        const tokenizer = mode.tokenizer(options);
        let previousPhases = [tokenizer];
        const phases = [tokenizer].concat(mode.lexerPhases.map((phase) => {
          const ph = phase(options, mode, previousPhases);
          previousPhases = previousPhases.concat(ph);
          return ph;
        }));
        const tokenize = compose.apply(null, phases.reverse());
        this.tokenizer = tokenize(source);
      }
    });
    module2.exports = posixShellLexer;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/logger-phase.js
var require_logger_phase = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/logger-phase.js"(exports2, module2) {
    "use strict";
    var logger = (name) => () => function* (tokens) {
      for (const tk of tokens) {
        if (!tk) {
          console.log(`In ${name} token null.`);
        }
        console.log(
          name,
          "<<<",
          tk,
          ">>>"
        );
        yield tk;
      }
    };
    module2.exports = logger;
  }
});

// node_modules/.pnpm/has-own-property@0.1.0/node_modules/has-own-property/index.js
var require_has_own_property = __commonJS({
  "node_modules/.pnpm/has-own-property@0.1.0/node_modules/has-own-property/index.js"(exports2, module2) {
    "use strict";
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    module2.exports = function hasOwnProperty(obj, prop) {
      return _hasOwnProperty.call(obj, prop);
    };
  }
});

// node_modules/.pnpm/filter-obj@1.1.0/node_modules/filter-obj/index.js
var require_filter_obj = __commonJS({
  "node_modules/.pnpm/filter-obj@1.1.0/node_modules/filter-obj/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(obj, predicate) {
      var ret = {};
      var keys = Object.keys(obj);
      var isArr = Array.isArray(predicate);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var val = obj[key];
        if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
          ret[key] = val;
        }
      }
      return ret;
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/operators.js
var require_operators = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/operators.js"(exports2, module2) {
    "use strict";
    var operators = {
      "&": "AND",
      "|": "PIPE",
      "(": "OPEN_PAREN",
      ")": "CLOSE_PAREN",
      ">": "GREAT",
      "<": "LESS",
      "&&": "AND_IF",
      "||": "OR_IF",
      ";;": "DSEMI",
      "<<": "DLESS",
      ">>": "DGREAT",
      "<&": "LESSAND",
      ">&": "GREATAND",
      "<>": "LESSGREAT",
      "<<-": "DLESSDASH",
      ">|": "CLOBBER",
      ";": "SEMICOLON"
    };
    module2.exports = operators;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/tokens.js
var require_tokens = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/tokens.js"(exports2) {
    "use strict";
    var hasOwnProperty = require_has_own_property();
    var filter = require_filter_obj();
    var operators = require_operators();
    var Token = class _Token {
      constructor(fields) {
        const definedFields = filter(fields, (key, value) => value !== void 0);
        Object.assign(this, definedFields);
        if (this._ === void 0) {
          this._ = {};
        }
      }
      is(type) {
        return this.type === type;
      }
      appendTo(chunk) {
        return new _Token(Object.assign({}, this, { value: this.value + chunk }));
      }
      changeTokenType(type, value) {
        return new _Token({ type, value, loc: this.loc, _: this._, expansion: this.expansion });
      }
      setValue(value) {
        return new _Token(Object.assign({}, this, { value }));
      }
      alterValue(value) {
        return new _Token(Object.assign({}, this, { value, originalText: this.originalText || this.value }));
      }
      addExpansions() {
        return new _Token(Object.assign({}, this, { expansion: [] }));
      }
      setExpansions(expansion) {
        return new _Token(Object.assign({}, this, { expansion }));
      }
    };
    exports2.token = (args2) => new Token(args2);
    function mkToken(type, value, loc, expansion) {
      const tk = new Token({ type, value, loc });
      if (expansion && expansion.length) {
        tk.expansion = expansion;
      }
      return tk;
    }
    exports2.mkToken = mkToken;
    exports2.mkFieldSplitToken = function mkFieldSplitToken(joinedTk, value, fieldIdx) {
      const tk = new Token({
        type: joinedTk.type,
        value,
        joined: joinedTk.value,
        fieldIdx,
        loc: joinedTk.loc,
        expansion: joinedTk.expansion,
        originalText: joinedTk.originalText
      });
      return tk;
    };
    exports2.appendTo = (tk, chunk) => tk.appendTo(chunk);
    exports2.changeTokenType = (tk, type, value) => tk.changeTokenType(type, value);
    exports2.setValue = (tk, value) => tk.setValue(value);
    exports2.alterValue = (tk, value) => tk.alterValue(value);
    exports2.addExpansions = (tk) => tk.addExpansions();
    exports2.setExpansions = (tk, expansion) => tk.setExpansions(expansion);
    exports2.tokenOrEmpty = function tokenOrEmpty(state) {
      if (state.current !== "" && state.current !== "\n") {
        const expansion = (state.expansion || []).map((xp) => {
          return Object.assign({}, xp, { loc: {
            start: xp.loc.start.char - state.loc.start.char,
            end: xp.loc.end.char - state.loc.start.char
          } });
        });
        const token = mkToken("TOKEN", state.current, {
          start: Object.assign({}, state.loc.start),
          end: Object.assign({}, state.loc.previous)
        }, expansion);
        return [token];
      }
      return [];
    };
    exports2.operatorTokens = function operatorTokens(state) {
      const token = mkToken(
        operators[state.current],
        state.current,
        {
          start: Object.assign({}, state.loc.start),
          end: Object.assign({}, state.loc.previous)
        }
      );
      return [token];
    };
    exports2.newLine = function newLine() {
      return mkToken("NEWLINE", "\n");
    };
    exports2.continueToken = function continueToken(expectedChar) {
      return mkToken("CONTINUE", expectedChar);
    };
    exports2.eof = function eof() {
      return mkToken("EOF", "");
    };
    exports2.isPartOfOperator = function isPartOfOperator(text) {
      return Object.keys(operators).some((op) => op.slice(0, text.length) === text);
    };
    exports2.isOperator = function isOperator(text) {
      return hasOwnProperty(operators, text);
    };
    exports2.applyTokenizerVisitor = (visitor) => (tk, idx, iterable) => {
      if (hasOwnProperty(visitor, tk.type)) {
        const visit = visitor[tk.type];
        return visit(tk, iterable);
      }
      if (hasOwnProperty(visitor, "defaultMethod")) {
        const visit = visitor.defaultMethod;
        return visit(tk, iterable);
      }
      return tk;
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/is-valid-name.js
var require_is_valid_name = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/is-valid-name.js"(exports2, module2) {
    "use strict";
    module2.exports = function isValidName(text) {
      return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(text);
    };
  }
});

// node_modules/.pnpm/curry@1.2.0/node_modules/curry/curry.js
var require_curry = __commonJS({
  "node_modules/.pnpm/curry@1.2.0/node_modules/curry/curry.js"(exports, module) {
    "use strict";
    var slice = Array.prototype.slice;
    var toArray = function(a) {
      return slice.call(a);
    };
    var tail = function(a) {
      return slice.call(a, 1);
    };
    var createFn = function(fn2, args2, totalArity) {
      var remainingArity = totalArity - args2.length;
      switch (remainingArity) {
        case 0:
          return function() {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 1:
          return function(a) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 2:
          return function(a, b) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 3:
          return function(a, b, c) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 4:
          return function(a, b, c, d) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 5:
          return function(a, b, c, d, e) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 6:
          return function(a, b, c, d, e, f) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 7:
          return function(a, b, c, d, e, f, g) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 8:
          return function(a, b, c, d, e, f, g, h) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 9:
          return function(a, b, c, d, e, f, g, h, i) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        case 10:
          return function(a, b, c, d, e, f, g, h, i, j) {
            return processInvocation(fn2, concatArgs(args2, arguments), totalArity);
          };
        default:
          return createEvalFn(fn2, args2, remainingArity);
      }
    };
    var concatArgs = function(args1, args2) {
      return args1.concat(toArray(args2));
    };
    var createEvalFn = function(fn, args, arity) {
      var argList = makeArgList(arity);
      var fnStr = "false||function(" + argList + "){ return processInvocation(fn, concatArgs(args, arguments)); }";
      return eval(fnStr);
    };
    var makeArgList = function(len) {
      var a = [];
      for (var i = 0; i < len; i += 1) a.push("a" + i.toString());
      return a.join(",");
    };
    var trimArrLength = function(arr, length) {
      if (arr.length > length) return arr.slice(0, length);
      else return arr;
    };
    var processInvocation = function(fn2, argsArr, totalArity) {
      argsArr = trimArrLength(argsArr, totalArity);
      if (argsArr.length === totalArity) return fn2.apply(null, argsArr);
      return createFn(fn2, argsArr, totalArity);
    };
    var curry = function(fn2) {
      return createFn(fn2, [], fn2.length);
    };
    curry.to = curry(function(arity2, fn2) {
      return createFn(fn2, [], arity2);
    });
    curry.adaptTo = curry(function(num, fn2) {
      return curry.to(num, function(context) {
        var args2 = tail(arguments).concat(context);
        return fn2.apply(this, args2);
      });
    });
    curry.adapt = function(fn2) {
      return curry.adaptTo(fn2.length, fn2);
    };
    module.exports = curry;
  }
});

// node_modules/.pnpm/iterable-transform-replace@1.2.0/node_modules/iterable-transform-replace/index.js
var require_iterable_transform_replace = __commonJS({
  "node_modules/.pnpm/iterable-transform-replace@1.2.0/node_modules/iterable-transform-replace/index.js"(exports2, module2) {
    "use strict";
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var curry2 = _interopDefault(require_curry());
    function replace(oldItem, newItem, array) {
      return array.map((item) => {
        if (item === oldItem) {
          return newItem;
        }
        return item;
      });
    }
    var main2 = curry2(replace);
    module2.exports = main2;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/index.js
var require_utils = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/index.js"(exports2) {
    "use strict";
    exports2.loggerPhase = require_logger_phase();
    exports2.tokens = require_tokens();
    exports2.isValidName = require_is_valid_name();
    exports2.replaceRule = require_iterable_transform_replace();
  }
});

// node_modules/.pnpm/identity-function@1.0.0/node_modules/identity-function/index.js
var require_identity_function = __commonJS({
  "node_modules/.pnpm/identity-function@1.0.0/node_modules/identity-function/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(x) {
      return x;
    };
  }
});

// node_modules/.pnpm/is-iterable@1.1.1/node_modules/is-iterable/index.js
var require_is_iterable = __commonJS({
  "node_modules/.pnpm/is-iterable@1.1.1/node_modules/is-iterable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(val) {
      return typeof Symbol !== "undefined" && Symbol && "iterator" in Symbol && val != null && typeof val[Symbol.iterator] === "function";
    };
  }
});

// node_modules/.pnpm/map-iterable@1.0.1/node_modules/map-iterable/index.js
var require_map_iterable = __commonJS({
  "node_modules/.pnpm/map-iterable@1.0.1/node_modules/map-iterable/index.js"(exports2, module2) {
    "use strict";
    var curry2 = require_curry();
    var isIterable = require_is_iterable();
    function initDefault(data) {
      return data;
    }
    function map(options, data) {
      if (typeof options !== "function" && (typeof options !== "object" || options === null)) {
        throw new TypeError("Callback argument must be a function or option object");
      }
      if (!isIterable(data)) {
        throw new TypeError("Data argument must be an iterable");
      }
      let idx = 0;
      const init = options.init || initDefault;
      const callback = options.callback || options;
      const ctx = init(data);
      const dataIterator = data[Symbol.iterator]();
      return {
        [Symbol.iterator]() {
          return this;
        },
        next() {
          const item = dataIterator.next();
          if (!item.done) {
            item.value = callback(item.value, idx++, ctx);
          }
          return item;
        }
      };
    }
    module2.exports = curry2(map);
  }
});

// node_modules/.pnpm/object-values@1.0.0/node_modules/object-values/index.js
var require_object_values = __commonJS({
  "node_modules/.pnpm/object-values@1.0.0/node_modules/object-values/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(obj) {
      var keys = Object.keys(obj);
      var ret = [];
      for (var i = 0; i < keys.length; i++) {
        ret.push(obj[keys[i]]);
      }
      return ret;
    };
  }
});

// node_modules/.pnpm/transform-spread-iterable@1.4.1/node_modules/transform-spread-iterable/index.js
var require_transform_spread_iterable = __commonJS({
  "node_modules/.pnpm/transform-spread-iterable@1.4.1/node_modules/transform-spread-iterable/index.js"(exports2, module2) {
    "use strict";
    function* spread(source) {
      for (const item of source) {
        if (typeof item[Symbol.iterator] === "function") {
          yield* item;
        } else {
          yield item;
        }
      }
    }
    module2.exports = spread;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/bash/rules/alias-substitution.js
var require_alias_substitution = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/bash/rules/alias-substitution.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var identity = require_identity_function();
    var map = require_map_iterable();
    var values = require_object_values();
    var merge = require_transform_spread_iterable();
    var tokens = require_tokens();
    var expandAlias = (preAliasLexer, resolveAlias, reservedWords) => {
      function* tryExpandToken(token, expandingAliases) {
        if (expandingAliases.indexOf(token.value) !== -1) {
          yield token;
          return;
        }
        const result = resolveAlias(token.value);
        if (result === void 0) {
          yield token;
        } else {
          for (const newToken of preAliasLexer(result)) {
            if (newToken.is("WORD") || reservedWords.some((word) => newToken.is(word))) {
              yield* tryExpandToken(
                newToken,
                expandingAliases.concat(token.value)
              );
            } else if (!newToken.is("EOF")) {
              yield newToken;
            }
          }
        }
      }
      function expandToken(tk) {
        return Array.from(tryExpandToken(tk, []));
      }
      const visitor = {
        WORD: expandToken
      };
      reservedWords.forEach((w) => {
        visitor[w] = expandToken;
      });
      return visitor;
    };
    module2.exports = (options, mode, previousPhases) => {
      if (typeof options.resolveAlias !== "function") {
        return identity;
      }
      const preAliasLexer = compose.apply(null, previousPhases.reverse());
      const visitor = expandAlias(preAliasLexer, options.resolveAlias, values(mode.enums.reservedWords));
      return compose(
        merge,
        map(
          tokens.applyTokenizerVisitor(visitor)
        )
      );
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/bash/index.js
var require_bash = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/bash/index.js"(exports2, module2) {
    "use strict";
    var bashAliasSubstitution = require_alias_substitution();
    var name = "[a-zA-Z_][a-zA-Z0-9_]*";
    var parameterOperators = {
      // This is referred to as Substring Expansion.
      // It expands to up to length characters of the value
      // of parameter starting at the character specified by offset.
      [`^(${name}):([^:]*):?([^:]*)$`]: {
        op: "substring",
        parameter: (m) => m[1],
        offset: (m) => parseInt(m[2], 10),
        length: (m) => parseInt(m[3], 10) || void 0
      },
      // Expands to the names of variables whose names begin with prefix,
      // separated by the first character of the IFS special variable.
      // When ‘@’ is used and the expansion appears within double quotes,
      // each variable name expands to a separate word.
      // TODO: @ case may need some investigation, maybe it's not actually possible
      [`^!(${name})(\\*|@)$`]: {
        op: "prefix",
        prefix: (m) => m[1],
        expandWords: (m) => m[2] === "@",
        parameter: () => void 0
      },
      // If name is an array variable, expands to the list of array indices
      // (keys) assigned in name. If name is not an array, expands to 0 if
      // name is set and null otherwise. When ‘@’ is used and the expansion
      // appears within double quotes, each key expands to a separate word.
      // TODO: @ case may need some investigation, maybe it's not actually possible
      [`^!(${name})(\\[\\*\\]|\\[@\\])$`]: {
        op: "arrayIndices",
        parameter: (m) => m[1],
        expandWords: (m) => m[2] === "[@]"
      },
      // Parameter is expanded and the longest match of pattern against its
      // value is replaced with string. If pattern begins with ‘/’, all matches
      // of pattern are replaced with string.
      [`^(${name})\\/(\\/)?([^\\/])+\\/(.*)$`]: {
        op: "stringReplace",
        parameter: (m) => m[1],
        substitute: (m) => m[3],
        replace: (m) => m[4],
        globally: (m) => m[2] === "/"
      },
      // This expansion modifies the case of alphabetic characters in parameter.
      // The pattern is expanded to produce a pattern just as in filename expansion.
      // Each character in the expanded value of parameter is tested against pattern,
      // and, if it matches the pattern, its case is converted. The pattern should
      // not attempt to match more than one character. The ‘^’ operator converts
      // lowercase letters matching pattern to uppercase; the ‘,’ operator converts
      // matching uppercase letters to lowercase. The ‘^^’ and ‘,,’ expansions convert
      // each matched character in the expanded value; the ‘^’ and ‘,’ expansions match
      // and convert only the first character in the expanded value. If pattern is omitted,
      // it is treated like a ‘?’, which matches every character. If parameter is ‘@’
      // or ‘*’, the case modification operation is applied to each positional parameter
      // in turn, and the expansion is the resultant list. If parameter is an array variable
      // subscripted with ‘@’ or ‘*’, the case modification operation is applied to each
      // member of the array in turn, and the expansion is the resultant list.
      [`^(${name})(\\^\\^|\\^|,,|,)(.*)$`]: {
        op: "caseChange",
        parameter: (m) => m[1],
        pattern: (m) => m[3] || "?",
        case: (m) => m[2][0] === "," ? "lower" : "upper",
        globally: (m) => m[2].length === 2
      },
      // The expansion is either a transformation of the value of parameter or information about
      // parameter itself, depending on the value of operator. Each operator is a single letter:
      //
      // Q - The expansion is a string that is the value of parameter quoted in a format that can
      // 	be reused as input.
      // E - The expansion is a string that is the value of parameter with backslash escape
      // 	sequences expanded as with the $'…' quoting mechansim.
      // P - The expansion is a string that is the result of expanding the value of parameter
      // 	as if it were a prompt string (see Controlling the Prompt).
      // A - The expansion is a string in the form of an assignment statement or declare command
      // 	that, if evaluated, will recreate parameter with its attributes and value.
      // a - The expansion is a string consisting of flag values representing parameter’s attributes.
      //
      // If parameter is ‘@’ or ‘*’, the operation is applied to each positional parameter in turn,
      // and the expansion is the resultant list. If parameter is an array variable subscripted
      // with ‘@’ or ‘*’, the operation is applied to each member of the array in turn, and the
      // expansion is the resultant list.
      // The result of the expansion is subject to word splitting and pathname expansion as
      // described below.
      [`^(${name})@([Q|E|P|A|a])$`]: {
        op: "transformation",
        parameter: (m) => m[1],
        kind: (m) => {
          switch (m[2]) {
            case "Q":
              return "quoted";
            case "E":
              return "escape";
            case "P":
              return "prompt";
            case "A":
              return "assignment";
            case "a":
              return "flags";
            default:
              return "unknown";
          }
        }
      },
      // If the first character of parameter is an exclamation point (!), and parameter is not
      // a nameref, it introduces a level of variable indirection. Bash uses the value of the
      // variable formed from the rest of parameter as the name of the variable; this variable
      // is then expanded and that value is used in the rest of the substitution, rather than
      // the value of parameter itself. This is known as indirect expansion. If parameter is a
      // nameref, this expands to the name of the variable referenced by parameter instead of
      // performing the complete indirect expansion. The exceptions to this are the expansions
      // of ${!prefix*} and ${!name[@]} described below. The exclamation point must immediately
      // follow the left brace in order to introduce indirection.
      [`^!(.+)$`]: {
        op: "indirection",
        word: (m) => m[1],
        parameter: () => void 0
      }
    };
    module2.exports = {
      inherits: "posix",
      init: (posixMode, utils) => {
        const phaseCatalog = Object.assign(
          {},
          posixMode.phaseCatalog,
          { bashAliasSubstitution }
        );
        const lexerPhases = utils.replaceRule(
          phaseCatalog.aliasSubstitution,
          bashAliasSubstitution,
          posixMode.lexerPhases
        );
        const bashOperators = Object.assign(
          parameterOperators,
          posixMode.enums.parameterOperators
        );
        const enums = Object.assign(
          {},
          posixMode.enums,
          { parameterOperators: bashOperators }
        );
        return Object.assign(
          {},
          posixMode,
          { phaseCatalog, lexerPhases, enums }
        );
      }
    };
  }
});

// node_modules/.pnpm/is-number@4.0.0/node_modules/is-number/index.js
var require_is_number = __commonJS({
  "node_modules/.pnpm/is-number@4.0.0/node_modules/is-number/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isNumber(num) {
      var type = typeof num;
      if (type === "string" || num instanceof String) {
        if (!num.trim()) return false;
      } else if (type !== "number" && !(num instanceof Number)) {
        return false;
      }
      return num - num + 1 >= 0;
    };
  }
});

// node_modules/.pnpm/array-last@1.3.0/node_modules/array-last/index.js
var require_array_last = __commonJS({
  "node_modules/.pnpm/array-last@1.3.0/node_modules/array-last/index.js"(exports2, module2) {
    "use strict";
    var isNumber = require_is_number();
    module2.exports = function last(arr, n) {
      if (!Array.isArray(arr)) {
        throw new Error("expected the first argument to be an array");
      }
      var len = arr.length;
      if (len === 0) {
        return null;
      }
      n = isNumber(n) ? +n : 1;
      if (n === 1) {
        return arr[len - 1];
      }
      var res = new Array(n);
      while (n--) {
        res[n] = arr[--len];
      }
      return res;
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/ast-builder.js
var require_ast_builder = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/ast-builder.js"(exports2, module2) {
    "use strict";
    module2.exports = (options) => {
      const builder = {};
      mkListHelper(builder, "caseList");
      mkListHelper(builder, "pattern");
      mkListHelper(builder, "prefix");
      mkListHelper(builder, "suffix");
      builder.caseItem = (pattern, body, locStart, locEnd) => {
        const type = "CaseItem";
        const node = { type, pattern, body };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, locStart), locEnd);
        }
        return node;
      };
      builder.caseClause = (clause, cases, locStart, locEnd) => {
        const type = "Case";
        const node = { type, clause };
        if (cases) {
          Object.assign(node, { cases });
        }
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, locStart), locEnd);
        }
        return node;
      };
      builder.doGroup = (group, locStart, locEnd) => {
        if (options.insertLOC) {
          setLocEnd(setLocStart(group.loc, locStart), locEnd);
        }
        return group;
      };
      builder.braceGroup = (group, locStart, locEnd) => {
        if (options.insertLOC) {
          setLocEnd(setLocStart(group.loc, locStart), locEnd);
        }
        return group;
      };
      builder.list = (logicalExpression) => {
        const node = { type: "Script", commands: [logicalExpression] };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, logicalExpression.loc), logicalExpression.loc);
        }
        return node;
      };
      function isAsyncSeparator(separator) {
        return separator.text.indexOf("&") !== -1;
      }
      const last = require_array_last();
      builder.checkAsync = (list, separator) => {
        if (isAsyncSeparator(separator)) {
          last(list.commands).async = true;
        }
        return list;
      };
      builder.listAppend = (list, logicalExpression, separator) => {
        if (isAsyncSeparator(separator)) {
          last(list.commands).async = true;
        }
        list.commands.push(logicalExpression);
        if (options.insertLOC) {
          setLocEnd(list.loc, logicalExpression.loc);
        }
        return list;
      };
      builder.addRedirections = (compoundCommand, redirectList) => {
        compoundCommand.redirections = redirectList;
        if (options.insertLOC) {
          const lastRedirect = redirectList[redirectList.length - 1];
          setLocEnd(compoundCommand.loc, lastRedirect.loc);
        }
        return compoundCommand;
      };
      builder.term = (logicalExpression) => {
        const node = { type: "CompoundList", commands: [logicalExpression] };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, logicalExpression.loc), logicalExpression.loc);
        }
        return node;
      };
      builder.termAppend = (term, logicalExpression, separator) => {
        if (isAsyncSeparator(separator)) {
          last(term.commands).async = true;
        }
        term.commands.push(logicalExpression);
        setLocEnd(term.loc, logicalExpression.loc);
        return term;
      };
      builder.subshell = (list, locStart, locEnd) => {
        const node = { type: "Subshell", list };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, locStart), locEnd);
        }
        return node;
      };
      builder.pipeSequence = (command) => {
        const node = { type: "Pipeline", commands: [command] };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, command.loc), command.loc);
        }
        return node;
      };
      builder.pipeSequenceAppend = (pipe, command) => {
        pipe.commands.push(command);
        if (options.insertLOC) {
          setLocEnd(pipe.loc, command.loc);
        }
        return pipe;
      };
      builder.bangPipeLine = (pipe) => {
        const bang = true;
        if (pipe.commands.length === 1) {
          return Object.assign(pipe.commands[0], { bang });
        }
        return Object.assign(pipe, { bang });
      };
      builder.pipeLine = (pipe) => {
        if (pipe.commands.length === 1) {
          return pipe.commands[0];
        }
        return pipe;
      };
      builder.andAndOr = (left, right) => {
        const node = { type: "LogicalExpression", op: "and", left, right };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, left.loc), right.loc);
        }
        return node;
      };
      builder.orAndOr = (left, right) => {
        const node = { type: "LogicalExpression", op: "or", left, right };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, left.loc), right.loc);
        }
        return node;
      };
      builder.forClause = (name, wordlist, doGroup, locStart) => {
        const node = { type: "For", name, wordlist, do: doGroup };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, locStart), doGroup.loc);
        }
        return node;
      };
      builder.forClauseDefault = (name, doGroup, locStart) => {
        const node = { type: "For", name, do: doGroup };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, locStart), doGroup.loc);
        }
        return node;
      };
      builder.functionDefinition = (name, body) => {
        const node = { type: "Function", name };
        node.body = body[0];
        if (body[1]) {
          node.redirections = body[1];
        }
        const endLoc = body[1] || body[0];
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, name.loc), endLoc.loc);
        }
        return node;
      };
      builder.elseClause = (compoundList, locStart) => {
        if (options.insertLOC) {
          setLocStart(compoundList.loc, locStart.loc);
        }
        return compoundList;
      };
      builder.ifClause = (clause, then, elseBranch, locStart, locEnd) => {
        const node = { type: "If", clause, then };
        if (elseBranch) {
          node.else = elseBranch;
        }
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, locStart), locEnd);
        }
        return node;
      };
      builder.while = (clause, body, whileWord) => {
        const node = { type: "While", clause, do: body };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, whileWord.loc), body.loc);
        }
        return node;
      };
      builder.until = (clause, body, whileWord) => {
        const node = { type: "Until", clause, do: body };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, whileWord.loc), body.loc);
        }
        return node;
      };
      builder.commandName = (name) => name;
      builder.commandAssignment = function commandAssignment(prefix) {
        return builder.command(prefix);
      };
      builder.command = function command(prefix, command, suffix) {
        const node = { type: "Command" };
        if (command) {
          node.name = command;
        }
        if (options.insertLOC) {
          node.loc = {};
          if (prefix) {
            const firstPrefix = prefix[0];
            node.loc.start = firstPrefix.loc.start;
          } else {
            node.loc.start = command.loc.start;
          }
          if (suffix) {
            const lastSuffix = suffix[suffix.length - 1];
            node.loc.end = lastSuffix.loc.end;
          } else if (command) {
            node.loc.end = command.loc.end;
          } else {
            const lastPrefix = prefix[prefix.length - 1];
            node.loc.end = lastPrefix.loc.end;
          }
        }
        if (prefix) {
          node.prefix = prefix;
        }
        if (suffix) {
          node.suffix = suffix;
        }
        return node;
      };
      builder.ioRedirect = (op, file) => {
        const node = { type: "Redirect", op, file };
        if (options.insertLOC) {
          node.loc = setLocEnd(setLocStart({}, op.loc), file.loc);
        }
        return node;
      };
      builder.numberIoRedirect = (ioRedirect, numberIo) => {
        const node = Object.assign({}, ioRedirect, { numberIo });
        if (options.insertLOC) {
          setLocStart(node.loc, numberIo.loc);
        }
        return node;
      };
      return builder;
    };
    function setLocStart(target, source) {
      if (source) {
        target.start = source.start;
      }
      return target;
    }
    function setLocEnd(target, source) {
      if (source) {
        target.end = source.end;
      }
      return target;
    }
    function mkListHelper(builder, listName) {
      builder[listName] = (item) => {
        return [item];
      };
      builder[`${listName}Append`] = (list, item) => {
        list.push(item);
        return list;
      };
    }
  }
});

// node_modules/.pnpm/deep-freeze@0.0.1/node_modules/deep-freeze/index.js
var require_deep_freeze = __commonJS({
  "node_modules/.pnpm/deep-freeze@0.0.1/node_modules/deep-freeze/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function deepFreeze(o) {
      Object.freeze(o);
      Object.getOwnPropertyNames(o).forEach(function(prop) {
        if (o.hasOwnProperty(prop) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])) {
          deepFreeze(o[prop]);
        }
      });
      return o;
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/end.js
var require_end = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/end.js"(exports2, module2) {
    "use strict";
    var eof = require_tokens().eof;
    module2.exports = function end() {
      return {
        nextReduction: null,
        tokensToEmit: [eof()]
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/operator.js
var require_operator = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/operator.js"(exports2, module2) {
    "use strict";
    var t = require_tokens();
    var isPartOfOperator = t.isPartOfOperator;
    var operatorTokens = t.operatorTokens;
    var isOperator = t.isOperator;
    module2.exports = function operator(state, source, reducers) {
      const char = source && source.shift();
      if (char === void 0) {
        if (isOperator(state.current)) {
          return {
            nextReduction: reducers.end,
            tokensToEmit: operatorTokens(state),
            nextState: state.resetCurrent().saveCurrentLocAsStart()
          };
        }
        return reducers.start(state, char);
      }
      if (isPartOfOperator(state.current + char)) {
        return {
          nextReduction: reducers.operator,
          nextState: state.appendChar(char)
        };
      }
      let tokens = [];
      if (isOperator(state.current)) {
        tokens = operatorTokens(state);
        state = state.resetCurrent().saveCurrentLocAsStart();
      }
      const ret = reducers.start(state, [char].concat(source), reducers);
      const nextReduction = ret.nextReduction;
      const tokensToEmit = ret.tokensToEmit;
      const nextState = ret.nextState;
      if (tokensToEmit) {
        tokens = tokens.concat(tokensToEmit);
      }
      return {
        nextReduction,
        tokensToEmit: tokens,
        nextState
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/comment.js
var require_comment = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/comment.js"(exports2, module2) {
    "use strict";
    var newLine = require_tokens().newLine;
    module2.exports = function comment(state, source, reducers) {
      const char = source && source.shift();
      if (char === void 0) {
        return {
          nextReduction: reducers.end,
          nextState: state
        };
      }
      if (char === "\n") {
        return {
          tokensToEmit: [newLine()],
          nextReduction: reducers.start,
          nextState: state
        };
      }
      return {
        nextReduction: comment,
        nextState: state
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/single-quoting.js
var require_single_quoting = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/single-quoting.js"(exports2, module2) {
    "use strict";
    var t = require_tokens();
    var tokenOrEmpty = t.tokenOrEmpty;
    var continueToken = t.continueToken;
    module2.exports = function singleQuoting(state, source, reducers) {
      const char = source && source.shift();
      if (char === void 0) {
        return {
          nextState: state,
          nextReduction: null,
          tokensToEmit: tokenOrEmpty(state).concat(continueToken("'"))
        };
      }
      if (char === "'") {
        return {
          nextReduction: reducers.start,
          nextState: state.appendChar(char)
        };
      }
      return {
        nextReduction: reducers.singleQuoting,
        nextState: state.appendChar(char)
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/double-quoting.js
var require_double_quoting = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/double-quoting.js"(exports2, module2) {
    "use strict";
    var t = require_tokens();
    var tokenOrEmpty = t.tokenOrEmpty;
    var continueToken = t.continueToken;
    module2.exports = function doubleQuoting(state, source, reducers) {
      const char = source && source.shift();
      state = state.setPreviousReducer(doubleQuoting);
      if (char === void 0) {
        return {
          nextReduction: null,
          tokensToEmit: tokenOrEmpty(state).concat(continueToken('"')),
          nextState: state
        };
      }
      if (!state.escaping && char === "\\") {
        return {
          nextReduction: doubleQuoting,
          nextState: state.setEscaping(true).appendChar(char)
        };
      }
      if (!state.escaping && char === '"') {
        return {
          nextReduction: reducers.start,
          nextState: state.setPreviousReducer(reducers.start).appendChar(char)
        };
      }
      if (!state.escaping && char === "$") {
        return {
          nextReduction: reducers.expansionStart,
          nextState: state.appendEmptyExpansion().appendChar(char)
        };
      }
      if (!state.escaping && char === "`") {
        return {
          nextReduction: reducers.expansionCommandTick,
          nextState: state.appendEmptyExpansion().appendChar(char)
        };
      }
      return {
        nextReduction: reducers.doubleQuoting,
        nextState: state.setEscaping(false).appendChar(char)
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-start.js
var require_expansion_start = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-start.js"(exports2, module2) {
    "use strict";
    function isSpecialParameter(char) {
      return char.match(/^[0-9\-!@#\?\*\$]$/);
    }
    module2.exports = function expansionStart(state, source, reducers) {
      const char = source && source.shift();
      if (char === "{") {
        return {
          nextReduction: reducers.expansionParameterExtended,
          nextState: state.appendChar(char)
        };
      }
      if (char === "(") {
        return {
          nextReduction: reducers.expansionCommandOrArithmetic,
          nextState: state.appendChar(char)
        };
      }
      if (char.match(/[a-zA-Z_]/)) {
        return {
          nextReduction: reducers.expansionParameter,
          nextState: state.appendChar(char).replaceLastExpansion({
            parameter: char,
            type: "parameter_expansion"
          })
        };
      }
      if (isSpecialParameter(char)) {
        return reducers.expansionSpecialParameter(state, [char].concat(source));
      }
      return state.previousReducer(state, [char].concat(source));
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-command-tick.js
var require_expansion_command_tick = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-command-tick.js"(exports2, module2) {
    "use strict";
    var last = require_array_last();
    var t = require_tokens();
    var continueToken = t.continueToken;
    module2.exports = function expansionCommandTick(state, source, reducers) {
      const char = source && source.shift();
      const xp = last(state.expansion);
      if (!state.escaping && char === "`") {
        return {
          nextReduction: state.previousReducer,
          nextState: state.appendChar(char).replaceLastExpansion({
            type: "command_expansion",
            loc: Object.assign({}, xp.loc, { end: state.loc.current })
          })
        };
      }
      if (char === void 0) {
        return {
          nextReduction: state.previousReducer,
          tokensToEmit: [continueToken("`")],
          nextState: state.replaceLastExpansion({
            loc: Object.assign({}, xp.loc, { end: state.loc.previous })
          })
        };
      }
      if (!state.escaping && char === "\\") {
        return {
          nextReduction: reducers.expansionCommandTick,
          nextState: state.appendChar(char).setEscaping(true)
        };
      }
      return {
        nextReduction: reducers.expansionCommandTick,
        nextState: state.setEscaping(false).appendChar(char).replaceLastExpansion({ command: (xp.command || "") + char })
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/start.js
var require_start = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/start.js"(exports2, module2) {
    "use strict";
    var t = require_tokens();
    var tokenOrEmpty = t.tokenOrEmpty;
    var newLine = t.newLine;
    var isPartOfOperator = t.isPartOfOperator;
    module2.exports = function start(state, source, reducers) {
      const char = source && source.shift();
      if (char === void 0) {
        return {
          nextReduction: reducers.end,
          tokensToEmit: tokenOrEmpty(state),
          nextState: state.resetCurrent().saveCurrentLocAsStart()
        };
      }
      if (state.escaping && char === "\n") {
        return {
          nextReduction: reducers.start,
          nextState: state.setEscaping(false).removeLastChar()
        };
      }
      if (!state.escaping && char === "#" && state.current === "") {
        return {
          nextReduction: reducers.comment
        };
      }
      if (!state.escaping && char === "\n") {
        return {
          nextReduction: reducers.start,
          tokensToEmit: tokenOrEmpty(state).concat(newLine()),
          nextState: state.resetCurrent().saveCurrentLocAsStart()
        };
      }
      if (!state.escaping && char === "\\") {
        return {
          nextReduction: reducers.start,
          nextState: state.setEscaping(true).appendChar(char)
        };
      }
      if (!state.escaping && isPartOfOperator(char)) {
        return {
          nextReduction: reducers.operator,
          tokensToEmit: tokenOrEmpty(state),
          nextState: state.setCurrent(char).saveCurrentLocAsStart()
        };
      }
      if (!state.escaping && char === "'") {
        return {
          nextReduction: reducers.singleQuoting,
          nextState: state.appendChar(char)
        };
      }
      if (!state.escaping && char === '"') {
        return {
          nextReduction: reducers.doubleQuoting,
          nextState: state.appendChar(char)
        };
      }
      if (!state.escaping && char.match(/\s/)) {
        return {
          nextReduction: reducers.start,
          tokensToEmit: tokenOrEmpty(state),
          nextState: state.resetCurrent().saveCurrentLocAsStart().setExpansion([])
        };
      }
      if (!state.escaping && char === "$") {
        return {
          nextReduction: reducers.expansionStart,
          nextState: state.appendChar(char).appendEmptyExpansion()
        };
      }
      if (!state.escaping && char === "`") {
        return {
          nextReduction: reducers.expansionCommandTick,
          nextState: state.appendChar(char).appendEmptyExpansion()
        };
      }
      return {
        nextReduction: reducers.start,
        nextState: state.appendChar(char).setEscaping(false)
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-arithmetic.js
var require_expansion_arithmetic = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-arithmetic.js"(exports2, module2) {
    "use strict";
    var last = require_array_last();
    var t = require_tokens();
    var continueToken = t.continueToken;
    module2.exports = function expansionArithmetic(state, source) {
      const char = source && source.shift();
      const xp = last(state.expansion);
      if (char === ")" && state.current.slice(-1)[0] === ")") {
        return {
          nextReduction: state.previousReducer,
          nextState: state.appendChar(char).replaceLastExpansion({
            type: "arithmetic_expansion",
            expression: xp.value.slice(0, -1),
            loc: Object.assign({}, xp.loc, { end: state.loc.current })
          }).deleteLastExpansionValue()
        };
      }
      if (char === void 0) {
        return {
          nextReduction: state.previousReducer,
          tokensToEmit: [continueToken("$((")],
          nextState: state.replaceLastExpansion({
            loc: Object.assign({}, xp.loc, { end: state.loc.previous })
          })
        };
      }
      return {
        nextReduction: expansionArithmetic,
        nextState: state.appendChar(char).replaceLastExpansion({ value: (xp.value || "") + char })
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-special-parameter.js
var require_expansion_special_parameter = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-special-parameter.js"(exports2, module2) {
    "use strict";
    var last = require_array_last();
    module2.exports = function expansionSpecialParameter(state, source) {
      const char = source && source.shift();
      const xp = last(state.expansion);
      return {
        nextReduction: state.previousReducer,
        nextState: state.appendChar(char).replaceLastExpansion({
          parameter: char,
          type: "parameter_expansion",
          loc: Object.assign({}, xp.loc, { end: state.loc.current })
        })
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-parameter.js
var require_expansion_parameter = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-parameter.js"(exports2, module2) {
    "use strict";
    var last = require_array_last();
    module2.exports = function expansionParameter(state, source, reducers) {
      const char = source && source.shift();
      const xp = last(state.expansion);
      if (char === void 0) {
        return {
          nextReduction: reducers.start,
          nextState: state.replaceLastExpansion({
            loc: Object.assign({}, xp.loc, { end: state.loc.previous })
          })
        };
      }
      if (char.match(/[0-9a-zA-Z_]/)) {
        return {
          nextReduction: reducers.expansionParameter,
          nextState: state.appendChar(char).replaceLastExpansion({
            parameter: xp.parameter + (char || "")
          })
        };
      }
      return state.previousReducer(
        state.replaceLastExpansion({ loc: Object.assign({}, xp.loc, { end: state.loc.previous }) }),
        [char].concat(source),
        reducers
      );
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-command-or-arithmetic.js
var require_expansion_command_or_arithmetic = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-command-or-arithmetic.js"(exports2, module2) {
    "use strict";
    var last = require_array_last();
    var t = require_tokens();
    var continueToken = t.continueToken;
    module2.exports = function expansionCommandOrArithmetic(state, source, reducers) {
      const char = source && source.shift();
      const xp = last(state.expansion);
      if (char === "(" && state.current.slice(-2) === "$(") {
        return {
          nextReduction: reducers.expansionArithmetic,
          nextState: state.appendChar(char)
        };
      }
      if (char === void 0) {
        return {
          nextReduction: state.previousReducer,
          tokensToEmit: [continueToken("$(")],
          nextState: state.replaceLastExpansion({
            loc: Object.assign({}, xp.loc, { end: state.loc.previous })
          })
        };
      }
      if (char === ")") {
        return {
          nextReduction: state.previousReducer,
          nextState: state.appendChar(char).replaceLastExpansion({
            type: "command_expansion",
            loc: Object.assign({}, xp.loc, {
              end: state.loc.current
            })
          })
        };
      }
      return {
        nextReduction: reducers.expansionCommandOrArithmetic,
        nextState: state.appendChar(char).replaceLastExpansion({ command: (xp.command || "") + char })
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-parameter-extended.js
var require_expansion_parameter_extended = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/expansion-parameter-extended.js"(exports2, module2) {
    "use strict";
    var last = require_array_last();
    var t = require_tokens();
    var continueToken = t.continueToken;
    module2.exports = function expansionParameterExtended(state, source, reducers) {
      const char = source && source.shift();
      const xp = last(state.expansion);
      if (char === "}") {
        return {
          nextReduction: state.previousReducer,
          nextState: state.appendChar(char).replaceLastExpansion({
            type: "parameter_expansion",
            loc: Object.assign({}, xp.loc, { end: state.loc.current })
          })
        };
      }
      if (char === void 0) {
        return {
          nextReduction: state.previousReducer,
          tokensToEmit: [continueToken("${")],
          nextState: state.replaceLastExpansion({
            loc: Object.assign({}, xp.loc, { end: state.loc.previous })
          })
        };
      }
      return {
        nextReduction: reducers.expansionParameterExtended,
        nextState: state.appendChar(char).replaceLastExpansion({ parameter: (xp.parameter || "") + char })
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/index.js
var require_reducers = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/reducers/index.js"(exports2, module2) {
    "use strict";
    var end = require_end();
    var operator = require_operator();
    var comment = require_comment();
    var singleQuoting = require_single_quoting();
    var doubleQuoting = require_double_quoting();
    var expansionStart = require_expansion_start();
    var expansionCommandTick = require_expansion_command_tick();
    var start = require_start();
    var expansionArithmetic = require_expansion_arithmetic();
    var expansionSpecialParameter = require_expansion_special_parameter();
    var expansionParameter = require_expansion_parameter();
    var expansionCommandOrArithmetic = require_expansion_command_or_arithmetic();
    var expansionParameterExtended = require_expansion_parameter_extended();
    module2.exports = {
      end,
      operator,
      comment,
      singleQuoting,
      doubleQuoting,
      expansionStart,
      expansionCommandTick,
      start,
      expansionArithmetic,
      expansionSpecialParameter,
      expansionParameter,
      expansionCommandOrArithmetic,
      expansionParameterExtended
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/index.js
var require_tokenizer = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/tokenizer/index.js"(exports2, module2) {
    "use strict";
    var deepFreeze = require_deep_freeze();
    var last = require_array_last();
    var defaultFields = (reducers) => ({
      current: "",
      escaping: false,
      previousReducer: reducers.start,
      loc: {
        start: { col: 1, row: 1, char: 0 },
        previous: null,
        current: { col: 1, row: 1, char: 0 }
      }
    });
    var mkImmutableState = (reducers) => class ImmutableState {
      constructor(fields) {
        Object.assign(this, fields || defaultFields(reducers));
        deepFreeze(this);
      }
      setLoc(loc) {
        return new ImmutableState(Object.assign({}, this, { loc }));
      }
      setEscaping(escaping) {
        return new ImmutableState(Object.assign({}, this, { escaping }));
      }
      setExpansion(expansion) {
        return new ImmutableState(Object.assign({}, this, { expansion }));
      }
      setPreviousReducer(previousReducer) {
        return new ImmutableState(Object.assign({}, this, { previousReducer }));
      }
      setCurrent(current) {
        return new ImmutableState(Object.assign({}, this, { current }));
      }
      appendEmptyExpansion() {
        const expansion = (this.expansion || []).concat({
          loc: { start: Object.assign({}, this.loc.current) }
        });
        return this.setExpansion(expansion);
      }
      appendChar(char) {
        return new ImmutableState(Object.assign({}, this, { current: this.current + char }));
      }
      removeLastChar() {
        return new ImmutableState(Object.assign({}, this, { current: this.current.slice(0, -1) }));
      }
      saveCurrentLocAsStart() {
        return new ImmutableState(Object.assign({}, this, { loc: Object.assign({}, this.loc, { start: this.loc.current }) }));
      }
      resetCurrent() {
        return new ImmutableState(Object.assign({}, this, { current: "" }));
      }
      advanceLoc(char) {
        const loc = Object.assign(
          {},
          this.loc,
          {
            current: Object.assign({}, this.loc.current),
            previous: Object.assign({}, this.loc.current)
          }
        );
        if (char === "\n") {
          loc.current.row++;
          loc.current.col = 1;
        } else {
          loc.current.col++;
        }
        loc.current.char++;
        if (char && char.match(/\s/) && this.current === "") {
          loc.start = Object.assign({}, loc.current);
        }
        return this.setLoc(loc);
      }
    };
    var mkMutableState = (reducers) => class {
      constructor(fields) {
        Object.assign(this, fields || defaultFields(reducers));
      }
      setLoc(loc) {
        this.loc = loc;
        return this;
      }
      setEscaping(escaping) {
        this.escaping = escaping;
        return this;
      }
      setExpansion(expansion) {
        this.expansion = expansion;
        return this;
      }
      setPreviousReducer(previousReducer) {
        this.previousReducer = previousReducer;
        return this;
      }
      setCurrent(current) {
        this.current = current;
        return this;
      }
      appendEmptyExpansion() {
        this.expansion = this.expansion || [];
        this.expansion.push({
          loc: { start: Object.assign({}, this.loc.current) }
        });
        return this;
      }
      appendChar(char) {
        this.current = this.current + char;
        return this;
      }
      removeLastChar() {
        this.current = this.current.slice(0, -1);
        return this;
      }
      saveCurrentLocAsStart() {
        this.loc.start = Object.assign({}, this.loc.current);
        return this;
      }
      resetCurrent() {
        this.current = "";
        return this;
      }
      replaceLastExpansion(fields) {
        const xp = last(this.expansion);
        Object.assign(xp, fields);
        return this;
      }
      deleteLastExpansionValue() {
        const xp = last(this.expansion);
        delete xp.value;
        return this;
      }
      advanceLoc(char) {
        const loc = JSON.parse(JSON.stringify(this.loc));
        loc.previous = Object.assign({}, this.loc.current);
        if (char === "\n") {
          loc.current.row++;
          loc.current.col = 1;
        } else {
          loc.current.col++;
        }
        loc.current.char++;
        if (char && char.match(/\s/) && this.current === "") {
          loc.start = Object.assign({}, loc.current);
        }
        return this.setLoc(loc);
      }
    };
    module2.exports = (options, reducers) => function* tokenizer(src) {
      reducers = reducers || require_reducers();
      const State = process.env.NODE_NEV === "development" ? mkImmutableState(reducers) : mkMutableState(reducers);
      let state = new State();
      let reduction = reducers.start;
      const source = Array.from(src);
      while (typeof reduction === "function") {
        const char = source[0];
        const r = reduction(state, source, reducers);
        const nextReduction = r.nextReduction;
        const tokensToEmit = r.tokensToEmit;
        const nextState = r.nextState;
        if (tokensToEmit) {
          yield* tokensToEmit;
        }
        if (nextState) {
          state = nextState.advanceLoc(char);
        } else {
          state = state.advanceLoc(char);
        }
        reduction = nextReduction;
      }
    };
    module2.exports.reducers = require_reducers();
  }
});

// node_modules/.pnpm/map-obj@2.0.0/node_modules/map-obj/index.js
var require_map_obj = __commonJS({
  "node_modules/.pnpm/map-obj@2.0.0/node_modules/map-obj/index.js"(exports2, module2) {
    "use strict";
    var isObject2 = (x) => typeof x === "object" && x !== null && !(x instanceof RegExp) && !(x instanceof Error) && !(x instanceof Date);
    module2.exports = function mapObj(obj, fn2, opts, seen) {
      opts = Object.assign({
        deep: false,
        target: {}
      }, opts);
      seen = seen || /* @__PURE__ */ new WeakMap();
      if (seen.has(obj)) {
        return seen.get(obj);
      }
      seen.set(obj, opts.target);
      const target = opts.target;
      delete opts.target;
      for (const key of Object.keys(obj)) {
        const val = obj[key];
        const res = fn2(key, val, obj);
        let newVal = res[1];
        if (opts.deep && isObject2(newVal)) {
          if (Array.isArray(newVal)) {
            newVal = newVal.map((x) => isObject2(x) ? mapObj(x, fn2, opts, seen) : x);
          } else {
            newVal = mapObj(newVal, fn2, opts, seen);
          }
        }
        target[res[0]] = newVal;
      }
      return target;
    };
  }
});

// node_modules/.pnpm/object-pairs@0.1.0/node_modules/object-pairs/index.js
var require_object_pairs = __commonJS({
  "node_modules/.pnpm/object-pairs@0.1.0/node_modules/object-pairs/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(obj) {
      return Object.keys(obj).map(function(key) {
        return [key, obj[key]];
      });
    };
  }
});

// node_modules/.pnpm/vlq@0.2.3/node_modules/vlq/src/vlq.js
function encode(value) {
  var result;
  if (typeof value === "number") {
    result = encodeInteger(value);
  } else {
    result = "";
    for (var i = 0; i < value.length; i += 1) {
      result += encodeInteger(value[i]);
    }
  }
  return result;
}
function encodeInteger(num) {
  var result = "";
  if (num < 0) {
    num = -num << 1 | 1;
  } else {
    num <<= 1;
  }
  do {
    var clamped = num & 31;
    num >>= 5;
    if (num > 0) {
      clamped |= 32;
    }
    result += integerToChar[clamped];
  } while (num > 0);
  return result;
}
var charToInteger, integerToChar;
var init_vlq = __esm({
  "node_modules/.pnpm/vlq@0.2.3/node_modules/vlq/src/vlq.js"() {
    "use strict";
    charToInteger = {};
    integerToChar = {};
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("").forEach(function(char, i) {
      charToInteger[char] = i;
      integerToChar[i] = char;
    });
  }
});

// node_modules/.pnpm/magic-string@0.16.0/node_modules/magic-string/dist/magic-string.es6.js
var magic_string_es6_exports = {};
__export(magic_string_es6_exports, {
  Bundle: () => Bundle,
  default: () => magic_string_es6_default
});
function Chunk(start, end, content) {
  this.start = start;
  this.end = end;
  this.original = content;
  this.intro = "";
  this.outro = "";
  this.content = content;
  this.storeName = false;
  this.edited = false;
  Object.defineProperties(this, {
    previous: { writable: true, value: null },
    next: { writable: true, value: null }
  });
}
function SourceMap(properties) {
  this.version = 3;
  this.file = properties.file;
  this.sources = properties.sources;
  this.sourcesContent = properties.sourcesContent;
  this.names = properties.names;
  this.mappings = properties.mappings;
}
function guessIndent(code) {
  var lines = code.split("\n");
  var tabbed = lines.filter(function(line) {
    return /^\t+/.test(line);
  });
  var spaced = lines.filter(function(line) {
    return /^ {2,}/.test(line);
  });
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  var min = spaced.reduce(function(previous, current) {
    var numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getSemis(str) {
  return new Array(str.split("\n").length).join(";");
}
function getLocator(source) {
  var originalLines = source.split("\n");
  var start = 0;
  var lineRanges = originalLines.map(function(line, i2) {
    var end = start + line.length + 1;
    var range = { start, end, line: i2 };
    start = end;
    return range;
  });
  var i = 0;
  function rangeContains(range, index) {
    return range.start <= index && index < range.end;
  }
  function getLocation(range, index) {
    return { line: range.line, column: index - range.start };
  }
  return function locate(index) {
    var range = lineRanges[i];
    var d = index >= range.end ? 1 : -1;
    while (range) {
      if (rangeContains(range, index)) return getLocation(range, index);
      i += d;
      range = lineRanges[i];
    }
  };
}
function encodeMappings(original, intro, outro, chunk, hires, sourcemapLocations, sourceIndex, offsets, names) {
  var rawLines = [];
  var generatedCodeLine = intro.split("\n").length - 1;
  var rawSegments = rawLines[generatedCodeLine] = [];
  var generatedCodeColumn = 0;
  var locate = getLocator(original);
  function addEdit(content, original2, loc2, nameIndex, i) {
    if (i || content.length && nonWhitespace.test(content)) {
      rawSegments.push({
        generatedCodeLine,
        generatedCodeColumn,
        sourceCodeLine: loc2.line,
        sourceCodeColumn: loc2.column,
        sourceCodeName: nameIndex,
        sourceIndex
      });
    }
    var lines = content.split("\n");
    var lastLine = lines.pop();
    if (lines.length) {
      generatedCodeLine += lines.length;
      rawLines[generatedCodeLine] = rawSegments = [];
      generatedCodeColumn = lastLine.length;
    } else {
      generatedCodeColumn += lastLine.length;
    }
    lines = original2.split("\n");
    lastLine = lines.pop();
    if (lines.length) {
      loc2.line += lines.length;
      loc2.column = lastLine.length;
    } else {
      loc2.column += lastLine.length;
    }
  }
  function addUneditedChunk(chunk2, loc2) {
    var originalCharIndex = chunk2.start;
    var first = true;
    while (originalCharIndex < chunk2.end) {
      if (hires || first || sourcemapLocations[originalCharIndex]) {
        rawSegments.push({
          generatedCodeLine,
          generatedCodeColumn,
          sourceCodeLine: loc2.line,
          sourceCodeColumn: loc2.column,
          sourceCodeName: -1,
          sourceIndex
        });
      }
      if (original[originalCharIndex] === "\n") {
        loc2.line += 1;
        loc2.column = 0;
        generatedCodeLine += 1;
        rawLines[generatedCodeLine] = rawSegments = [];
        generatedCodeColumn = 0;
      } else {
        loc2.column += 1;
        generatedCodeColumn += 1;
      }
      originalCharIndex += 1;
      first = false;
    }
  }
  var hasContent = false;
  while (chunk) {
    var loc = locate(chunk.start);
    if (chunk.intro.length) {
      addEdit(chunk.intro, "", loc, -1, hasContent);
    }
    if (chunk.edited) {
      addEdit(chunk.content, chunk.original, loc, chunk.storeName ? names.indexOf(chunk.original) : -1, hasContent);
    } else {
      addUneditedChunk(chunk, loc);
    }
    if (chunk.outro.length) {
      addEdit(chunk.outro, "", loc, -1, hasContent);
    }
    if (chunk.content || chunk.intro || chunk.outro) hasContent = true;
    var nextChunk = chunk.next;
    chunk = nextChunk;
  }
  offsets.sourceIndex = offsets.sourceIndex || 0;
  offsets.sourceCodeLine = offsets.sourceCodeLine || 0;
  offsets.sourceCodeColumn = offsets.sourceCodeColumn || 0;
  offsets.sourceCodeName = offsets.sourceCodeName || 0;
  return rawLines.map(function(segments) {
    var generatedCodeColumn2 = 0;
    return segments.map(function(segment) {
      var arr = [
        segment.generatedCodeColumn - generatedCodeColumn2,
        segment.sourceIndex - offsets.sourceIndex,
        segment.sourceCodeLine - offsets.sourceCodeLine,
        segment.sourceCodeColumn - offsets.sourceCodeColumn
      ];
      generatedCodeColumn2 = segment.generatedCodeColumn;
      offsets.sourceIndex = segment.sourceIndex;
      offsets.sourceCodeLine = segment.sourceCodeLine;
      offsets.sourceCodeColumn = segment.sourceCodeColumn;
      if (~segment.sourceCodeName) {
        arr.push(segment.sourceCodeName - offsets.sourceCodeName);
        offsets.sourceCodeName = segment.sourceCodeName;
      }
      return encode(arr);
    }).join(",");
  }).join(";") + getSemis(outro);
}
function getRelativePath(from, to) {
  var fromParts = from.split(/[\/\\]/);
  var toParts = to.split(/[\/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    var i = fromParts.length;
    while (i--) fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
function isObject(thing) {
  return toString3.call(thing) === "[object Object]";
}
function MagicString(string, options) {
  if (options === void 0) options = {};
  var chunk = new Chunk(0, string.length, string);
  Object.defineProperties(this, {
    original: { writable: true, value: string },
    outro: { writable: true, value: "" },
    intro: { writable: true, value: "" },
    firstChunk: { writable: true, value: chunk },
    lastChunk: { writable: true, value: chunk },
    lastSearchedChunk: { writable: true, value: chunk },
    byStart: { writable: true, value: {} },
    byEnd: { writable: true, value: {} },
    filename: { writable: true, value: options.filename },
    indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
    sourcemapLocations: { writable: true, value: {} },
    storedNames: { writable: true, value: {} },
    indentStr: { writable: true, value: guessIndent(string) }
  });
  if (false) {
  }
  this.byStart[0] = chunk;
  this.byEnd[string.length] = chunk;
}
function Bundle(options) {
  if (options === void 0) options = {};
  this.intro = options.intro || "";
  this.separator = options.separator !== void 0 ? options.separator : "\n";
  this.sources = [];
  this.uniqueSources = [];
  this.uniqueSourceIndexByFilename = {};
}
var _btoa, btoa2, nonWhitespace, toString3, hasOwnProp, magic_string_es6_default;
var init_magic_string_es6 = __esm({
  "node_modules/.pnpm/magic-string@0.16.0/node_modules/magic-string/dist/magic-string.es6.js"() {
    "use strict";
    init_vlq();
    Chunk.prototype = {
      append: function append(content) {
        this.outro += content;
      },
      clone: function clone() {
        var chunk = new Chunk(this.start, this.end, this.original);
        chunk.intro = this.intro;
        chunk.outro = this.outro;
        chunk.content = this.content;
        chunk.storeName = this.storeName;
        chunk.edited = this.edited;
        return chunk;
      },
      contains: function contains(index) {
        return this.start < index && index < this.end;
      },
      eachNext: function eachNext(fn2) {
        var chunk = this;
        while (chunk) {
          fn2(chunk);
          chunk = chunk.next;
        }
      },
      eachPrevious: function eachPrevious(fn2) {
        var chunk = this;
        while (chunk) {
          fn2(chunk);
          chunk = chunk.previous;
        }
      },
      edit: function edit(content, storeName) {
        this.content = content;
        this.intro = "";
        this.outro = "";
        this.storeName = storeName;
        this.edited = true;
        return this;
      },
      prepend: function prepend(content) {
        this.intro = content + this.intro;
      },
      split: function split(index) {
        var sliceIndex = index - this.start;
        var originalBefore = this.original.slice(0, sliceIndex);
        var originalAfter = this.original.slice(sliceIndex);
        this.original = originalBefore;
        var newChunk = new Chunk(index, this.end, originalAfter);
        newChunk.outro = this.outro;
        this.outro = "";
        this.end = index;
        if (this.edited) {
          newChunk.edit("", false);
          this.content = "";
        } else {
          this.content = originalBefore;
        }
        newChunk.next = this.next;
        if (newChunk.next) newChunk.next.previous = newChunk;
        newChunk.previous = this;
        this.next = newChunk;
        return newChunk;
      },
      toString: function toString() {
        return this.intro + this.content + this.outro;
      },
      trimEnd: function trimEnd(rx) {
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length) return true;
        var trimmed = this.content.replace(rx, "");
        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.start + trimmed.length).edit("", false);
          }
          return true;
        } else {
          this.edit("", false);
          this.intro = this.intro.replace(rx, "");
          if (this.intro.length) return true;
        }
      },
      trimStart: function trimStart(rx) {
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length) return true;
        var trimmed = this.content.replace(rx, "");
        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.end - trimmed.length);
            this.edit("", false);
          }
          return true;
        } else {
          this.edit("", false);
          this.outro = this.outro.replace(rx, "");
          if (this.outro.length) return true;
        }
      }
    };
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      _btoa = window.btoa;
    } else if (typeof Buffer === "function") {
      _btoa = function(str) {
        return new Buffer(str).toString("base64");
      };
    } else {
      _btoa = function() {
        throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
      };
    }
    btoa2 = _btoa;
    SourceMap.prototype = {
      toString: function toString2() {
        return JSON.stringify(this);
      },
      toUrl: function toUrl() {
        return "data:application/json;charset=utf-8;base64," + btoa2(this.toString());
      }
    };
    nonWhitespace = /\S/;
    toString3 = Object.prototype.toString;
    MagicString.prototype = {
      addSourcemapLocation: function addSourcemapLocation(char) {
        this.sourcemapLocations[char] = true;
      },
      append: function append2(content) {
        if (typeof content !== "string") throw new TypeError("outro content must be a string");
        this.outro += content;
        return this;
      },
      clone: function clone2() {
        var cloned = new MagicString(this.original, { filename: this.filename });
        var originalChunk = this.firstChunk;
        var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
        while (originalChunk) {
          cloned.byStart[clonedChunk.start] = clonedChunk;
          cloned.byEnd[clonedChunk.end] = clonedChunk;
          var nextOriginalChunk = originalChunk.next;
          var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
          if (nextClonedChunk) {
            clonedChunk.next = nextClonedChunk;
            nextClonedChunk.previous = clonedChunk;
            clonedChunk = nextClonedChunk;
          }
          originalChunk = nextOriginalChunk;
        }
        cloned.lastChunk = clonedChunk;
        if (this.indentExclusionRanges) {
          cloned.indentExclusionRanges = typeof this.indentExclusionRanges[0] === "number" ? [this.indentExclusionRanges[0], this.indentExclusionRanges[1]] : this.indentExclusionRanges.map(function(range) {
            return [range.start, range.end];
          });
        }
        Object.keys(this.sourcemapLocations).forEach(function(loc) {
          cloned.sourcemapLocations[loc] = true;
        });
        return cloned;
      },
      generateMap: function generateMap(options) {
        options = options || {};
        var names = Object.keys(this.storedNames);
        if (false) {
        }
        var map = new SourceMap({
          file: options.file ? options.file.split(/[\/\\]/).pop() : null,
          sources: [options.source ? getRelativePath(options.file || "", options.source) : null],
          sourcesContent: options.includeContent ? [this.original] : [null],
          names,
          mappings: this.getMappings(options.hires, 0, {}, names)
        });
        if (false) {
        }
        return map;
      },
      getIndentString: function getIndentString() {
        return this.indentStr === null ? "	" : this.indentStr;
      },
      getMappings: function getMappings(hires, sourceIndex, offsets, names) {
        return encodeMappings(this.original, this.intro, this.outro, this.firstChunk, hires, this.sourcemapLocations, sourceIndex, offsets, names);
      },
      indent: function indent(indentStr, options) {
        var this$1 = this;
        var pattern = /^[^\r\n]/gm;
        if (isObject(indentStr)) {
          options = indentStr;
          indentStr = void 0;
        }
        indentStr = indentStr !== void 0 ? indentStr : this.indentStr || "	";
        if (indentStr === "") return this;
        options = options || {};
        var isExcluded = {};
        if (options.exclude) {
          var exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
          exclusions.forEach(function(exclusion) {
            for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
              isExcluded[i] = true;
            }
          });
        }
        var shouldIndentNextCharacter = options.indentStart !== false;
        var replacer = function(match) {
          if (shouldIndentNextCharacter) return "" + indentStr + match;
          shouldIndentNextCharacter = true;
          return match;
        };
        this.intro = this.intro.replace(pattern, replacer);
        var charIndex = 0;
        var chunk = this.firstChunk;
        while (chunk) {
          var end = chunk.end;
          if (chunk.edited) {
            if (!isExcluded[charIndex]) {
              chunk.content = chunk.content.replace(pattern, replacer);
              if (chunk.content.length) {
                shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
              }
            }
          } else {
            charIndex = chunk.start;
            while (charIndex < end) {
              if (!isExcluded[charIndex]) {
                var char = this$1.original[charIndex];
                if (char === "\n") {
                  shouldIndentNextCharacter = true;
                } else if (char !== "\r" && shouldIndentNextCharacter) {
                  shouldIndentNextCharacter = false;
                  if (charIndex === chunk.start) {
                    chunk.prepend(indentStr);
                  } else {
                    var rhs = chunk.split(charIndex);
                    rhs.prepend(indentStr);
                    this$1.byStart[charIndex] = rhs;
                    this$1.byEnd[charIndex] = chunk;
                    chunk = rhs;
                  }
                }
              }
              charIndex += 1;
            }
          }
          charIndex = chunk.end;
          chunk = chunk.next;
        }
        this.outro = this.outro.replace(pattern, replacer);
        return this;
      },
      insert: function insert() {
        throw new Error("magicString.insert(...) is deprecated. Use insertRight(...) or insertLeft(...)");
      },
      insertLeft: function insertLeft(index, content) {
        if (typeof content !== "string") throw new TypeError("inserted content must be a string");
        if (false) {
        }
        this._split(index);
        var chunk = this.byEnd[index];
        if (chunk) {
          chunk.append(content);
        } else {
          this.intro += content;
        }
        if (false) {
        }
        return this;
      },
      insertRight: function insertRight(index, content) {
        if (typeof content !== "string") throw new TypeError("inserted content must be a string");
        if (false) {
        }
        this._split(index);
        var chunk = this.byStart[index];
        if (chunk) {
          chunk.prepend(content);
        } else {
          this.outro += content;
        }
        if (false) {
        }
        return this;
      },
      move: function move(start, end, index) {
        if (index >= start && index <= end) throw new Error("Cannot move a selection inside itself");
        if (false) {
        }
        this._split(start);
        this._split(end);
        this._split(index);
        var first = this.byStart[start];
        var last = this.byEnd[end];
        var oldLeft = first.previous;
        var oldRight = last.next;
        var newRight = this.byStart[index];
        if (!newRight && last === this.lastChunk) return this;
        var newLeft = newRight ? newRight.previous : this.lastChunk;
        if (oldLeft) oldLeft.next = oldRight;
        if (oldRight) oldRight.previous = oldLeft;
        if (newLeft) newLeft.next = first;
        if (newRight) newRight.previous = last;
        if (!first.previous) this.firstChunk = last.next;
        if (!last.next) {
          this.lastChunk = first.previous;
          this.lastChunk.next = null;
        }
        first.previous = newLeft;
        last.next = newRight;
        if (!newLeft) this.firstChunk = first;
        if (!newRight) this.lastChunk = last;
        if (false) {
        }
        return this;
      },
      overwrite: function overwrite(start, end, content, storeName) {
        var this$1 = this;
        if (typeof content !== "string") throw new TypeError("replacement content must be a string");
        while (start < 0) start += this$1.original.length;
        while (end < 0) end += this$1.original.length;
        if (end > this.original.length) throw new Error("end is out of bounds");
        if (start === end) throw new Error("Cannot overwrite a zero-length range \u2013 use insertLeft or insertRight instead");
        if (false) {
        }
        this._split(start);
        this._split(end);
        if (storeName) {
          var original = this.original.slice(start, end);
          this.storedNames[original] = true;
        }
        var first = this.byStart[start];
        var last = this.byEnd[end];
        if (first) {
          first.edit(content, storeName);
          if (first !== last) {
            var chunk = first.next;
            while (chunk !== last) {
              chunk.edit("", false);
              chunk = chunk.next;
            }
            chunk.edit("", false);
          }
        } else {
          var newChunk = new Chunk(start, end, "").edit(content, storeName);
          last.next = newChunk;
          newChunk.previous = last;
        }
        if (false) {
        }
        return this;
      },
      prepend: function prepend2(content) {
        if (typeof content !== "string") throw new TypeError("outro content must be a string");
        this.intro = content + this.intro;
        return this;
      },
      remove: function remove(start, end) {
        var this$1 = this;
        while (start < 0) start += this$1.original.length;
        while (end < 0) end += this$1.original.length;
        if (start === end) return this;
        if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
        if (start > end) throw new Error("end must be greater than start");
        return this.overwrite(start, end, "", false);
      },
      slice: function slice2(start, end) {
        var this$1 = this;
        if (start === void 0) start = 0;
        if (end === void 0) end = this.original.length;
        while (start < 0) start += this$1.original.length;
        while (end < 0) end += this$1.original.length;
        var result = "";
        var chunk = this.firstChunk;
        while (chunk && (chunk.start > start || chunk.end <= start)) {
          if (chunk.start < end && chunk.end >= end) {
            return result;
          }
          chunk = chunk.next;
        }
        if (chunk && chunk.edited && chunk.start !== start) throw new Error("Cannot use replaced character " + start + " as slice start anchor.");
        var startChunk = chunk;
        while (chunk) {
          if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
            result += chunk.intro;
          }
          var containsEnd = chunk.start < end && chunk.end >= end;
          if (containsEnd && chunk.edited && chunk.end !== end) throw new Error("Cannot use replaced character " + end + " as slice end anchor.");
          var sliceStart = startChunk === chunk ? start - chunk.start : 0;
          var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
          result += chunk.content.slice(sliceStart, sliceEnd);
          if (chunk.outro && (!containsEnd || chunk.end === end)) {
            result += chunk.outro;
          }
          if (containsEnd) {
            break;
          }
          chunk = chunk.next;
        }
        return result;
      },
      // TODO deprecate this? not really very useful
      snip: function snip(start, end) {
        var clone4 = this.clone();
        clone4.remove(0, start);
        clone4.remove(end, clone4.original.length);
        return clone4;
      },
      _split: function _split(index) {
        var this$1 = this;
        if (this.byStart[index] || this.byEnd[index]) return;
        if (false) {
        }
        var chunk = this.lastSearchedChunk;
        var searchForward = index > chunk.end;
        while (true) {
          if (chunk.contains(index)) return this$1._splitChunk(chunk, index);
          chunk = searchForward ? this$1.byStart[chunk.end] : this$1.byEnd[chunk.start];
        }
      },
      _splitChunk: function _splitChunk(chunk, index) {
        if (chunk.edited && chunk.content.length) {
          var loc = getLocator(this.original)(index);
          throw new Error("Cannot split a chunk that has already been edited (" + loc.line + ":" + loc.column + ' \u2013 "' + chunk.original + '")');
        }
        var newChunk = chunk.split(index);
        this.byEnd[index] = chunk;
        this.byStart[index] = newChunk;
        this.byEnd[newChunk.end] = newChunk;
        if (chunk === this.lastChunk) this.lastChunk = newChunk;
        this.lastSearchedChunk = chunk;
        if (false) {
        }
        return true;
      },
      toString: function toString4() {
        var str = this.intro;
        var chunk = this.firstChunk;
        while (chunk) {
          str += chunk.toString();
          chunk = chunk.next;
        }
        return str + this.outro;
      },
      trimLines: function trimLines() {
        return this.trim("[\\r\\n]");
      },
      trim: function trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      },
      trimEnd: function trimEnd2(charType) {
        var this$1 = this;
        var rx = new RegExp((charType || "\\s") + "+$");
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length) return this;
        var chunk = this.lastChunk;
        do {
          var end = chunk.end;
          var aborted = chunk.trimEnd(rx);
          if (chunk.end !== end) {
            this$1.lastChunk = chunk.next;
            this$1.byEnd[chunk.end] = chunk;
            this$1.byStart[chunk.next.start] = chunk.next;
          }
          if (aborted) return this$1;
          chunk = chunk.previous;
        } while (chunk);
        return this;
      },
      trimStart: function trimStart2(charType) {
        var this$1 = this;
        var rx = new RegExp("^" + (charType || "\\s") + "+");
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length) return this;
        var chunk = this.firstChunk;
        do {
          var end = chunk.end;
          var aborted = chunk.trimStart(rx);
          if (chunk.end !== end) {
            if (chunk === this$1.lastChunk) this$1.lastChunk = chunk.next;
            this$1.byEnd[chunk.end] = chunk;
            this$1.byStart[chunk.next.start] = chunk.next;
          }
          if (aborted) return this$1;
          chunk = chunk.next;
        } while (chunk);
        return this;
      }
    };
    hasOwnProp = Object.prototype.hasOwnProperty;
    Bundle.prototype = {
      addSource: function addSource(source) {
        if (source instanceof MagicString) {
          return this.addSource({
            content: source,
            filename: source.filename,
            separator: this.separator
          });
        }
        if (!isObject(source) || !source.content) {
          throw new Error("bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`");
        }
        ["filename", "indentExclusionRanges", "separator"].forEach(function(option) {
          if (!hasOwnProp.call(source, option)) source[option] = source.content[option];
        });
        if (source.separator === void 0) {
          source.separator = this.separator;
        }
        if (source.filename) {
          if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
            this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
            this.uniqueSources.push({ filename: source.filename, content: source.content.original });
          } else {
            var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
            if (source.content.original !== uniqueSource.content) {
              throw new Error("Illegal source: same filename (" + source.filename + "), different contents");
            }
          }
        }
        this.sources.push(source);
        return this;
      },
      append: function append3(str, options) {
        this.addSource({
          content: new MagicString(str),
          separator: options && options.separator || ""
        });
        return this;
      },
      clone: function clone3() {
        var bundle = new Bundle({
          intro: this.intro,
          separator: this.separator
        });
        this.sources.forEach(function(source) {
          bundle.addSource({
            filename: source.filename,
            content: source.content.clone(),
            separator: source.separator
          });
        });
        return bundle;
      },
      generateMap: function generateMap2(options) {
        var this$1 = this;
        options = options || {};
        var offsets = {};
        var names = [];
        this.sources.forEach(function(source) {
          Object.keys(source.content.storedNames).forEach(function(name) {
            if (!~names.indexOf(name)) names.push(name);
          });
        });
        var encoded = getSemis(this.intro) + this.sources.map(function(source, i) {
          var prefix = i > 0 ? getSemis(source.separator) || "," : "";
          var mappings;
          if (!source.filename) {
            mappings = getSemis(source.content.toString());
          } else {
            var sourceIndex = this$1.uniqueSourceIndexByFilename[source.filename];
            mappings = source.content.getMappings(options.hires, sourceIndex, offsets, names);
          }
          return prefix + mappings;
        }).join("");
        return new SourceMap({
          file: options.file ? options.file.split(/[\/\\]/).pop() : null,
          sources: this.uniqueSources.map(function(source) {
            return options.file ? getRelativePath(options.file, source.filename) : source.filename;
          }),
          sourcesContent: this.uniqueSources.map(function(source) {
            return options.includeContent ? source.content : null;
          }),
          names,
          mappings: encoded
        });
      },
      getIndentString: function getIndentString2() {
        var indentStringCounts = {};
        this.sources.forEach(function(source) {
          var indentStr = source.content.indentStr;
          if (indentStr === null) return;
          if (!indentStringCounts[indentStr]) indentStringCounts[indentStr] = 0;
          indentStringCounts[indentStr] += 1;
        });
        return Object.keys(indentStringCounts).sort(function(a, b) {
          return indentStringCounts[a] - indentStringCounts[b];
        })[0] || "	";
      },
      indent: function indent2(indentStr) {
        var this$1 = this;
        if (!arguments.length) {
          indentStr = this.getIndentString();
        }
        if (indentStr === "") return this;
        var trailingNewline = !this.intro || this.intro.slice(-1) === "\n";
        this.sources.forEach(function(source, i) {
          var separator = source.separator !== void 0 ? source.separator : this$1.separator;
          var indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
          source.content.indent(indentStr, {
            exclude: source.indentExclusionRanges,
            indentStart
            //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
          });
          trailingNewline = source.content.toString().slice(0, -1) === "\n";
        });
        if (this.intro) {
          this.intro = indentStr + this.intro.replace(/^[^\n]/gm, function(match, index) {
            return index > 0 ? indentStr + match : match;
          });
        }
        return this;
      },
      prepend: function prepend3(str) {
        this.intro = str + this.intro;
        return this;
      },
      toString: function toString5() {
        var this$1 = this;
        var body = this.sources.map(function(source, i) {
          var separator = source.separator !== void 0 ? source.separator : this$1.separator;
          var str = (i > 0 ? separator : "") + source.content.toString();
          return str;
        }).join("");
        return this.intro + body;
      },
      trimLines: function trimLines2() {
        return this.trim("[\\r\\n]");
      },
      trim: function trim2(charType) {
        return this.trimStart(charType).trimEnd(charType);
      },
      trimStart: function trimStart3(charType) {
        var this$1 = this;
        var rx = new RegExp("^" + (charType || "\\s") + "+");
        this.intro = this.intro.replace(rx, "");
        if (!this.intro) {
          var source;
          var i = 0;
          do {
            source = this$1.sources[i];
            if (!source) {
              break;
            }
            source.content.trimStart(charType);
            i += 1;
          } while (source.content.toString() === "");
        }
        return this;
      },
      trimEnd: function trimEnd3(charType) {
        var this$1 = this;
        var rx = new RegExp((charType || "\\s") + "+$");
        var source;
        var i = this.sources.length - 1;
        do {
          source = this$1.sources[i];
          if (!source) {
            this$1.intro = this$1.intro.replace(rx, "");
            break;
          }
          source.content.trimEnd(charType);
          i -= 1;
        } while (source.content.toString() === "");
        return this;
      }
    };
    magic_string_es6_default = MagicString;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/field-splitting.js
var require_field_splitting = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/field-splitting.js"(exports2) {
    "use strict";
    var map = require_map_iterable();
    var merge = require_transform_spread_iterable();
    var compose = require_compose_function();
    var mkFieldSplitToken = require_tokens().mkFieldSplitToken;
    exports2.mark = function markFieldSplitting(result, text, options) {
      if (typeof options.resolveEnv === "function" && text[0] !== "'" && text[0] !== '"') {
        const ifs = options.resolveEnv("IFS");
        if (ifs !== null) {
          return result.replace(new RegExp(`[${ifs}]+`, "g"), "\0");
        }
      }
      return result;
    };
    exports2.split = () => compose(
      merge,
      map((token) => {
        if (token.is("WORD")) {
          const fields = token.value.split("\0");
          if (fields.length > 1) {
            let idx = 0;
            return fields.map(
              (field) => mkFieldSplitToken(token, field, idx++)
            );
          }
        }
        return token;
      })
    );
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/parameter-expansion.js
var require_parameter_expansion = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/parameter-expansion.js"(exports2, module2) {
    "use strict";
    var mapObj = require_map_obj();
    var filter = require_filter_obj();
    var map = require_map_iterable();
    var pairs = require_object_pairs();
    var MagicString2 = (init_magic_string_es6(), __toCommonJS(magic_string_es6_exports));
    var tokens = require_tokens();
    var fieldSplitting = require_field_splitting();
    var handleParameter = (obj, match) => {
      const ret = mapObj(obj, (k, v) => {
        if (typeof v === "function") {
          const val = v(match);
          return [k, val];
        }
        if (typeof v === "object" && k !== "expand") {
          return [k, handleParameter(v, match)];
        }
        return [k, v];
      });
      if (ret.expand) {
        const bashParser = require_src();
        for (const prop of ret.expand) {
          const ast = bashParser(ret[prop], { mode: "word-expansion" });
          ret[prop] = ast.commands[0].name;
        }
        delete ret.expand;
      }
      return ret;
    };
    function expandParameter(xp, enums) {
      let parameter = xp.parameter;
      for (const pair of pairs(enums.parameterOperators)) {
        const re = new RegExp(pair[0]);
        const match = parameter.match(re);
        if (match) {
          const opProps = handleParameter(pair[1], match);
          return filter(Object.assign(
            xp,
            opProps
          ), (k, v) => v !== void 0);
        }
      }
      return xp;
    }
    var parameterExpansion = (options, mode) => map((token) => {
      if (token.is("WORD") || token.is("ASSIGNMENT_WORD")) {
        if (!token.expansion || token.expansion.length === 0) {
          return token;
        }
        return tokens.setExpansions(token, token.expansion.map((xp) => {
          if (xp.type === "parameter_expansion") {
            return expandParameter(xp, mode.enums);
          }
          return xp;
        }));
      }
      return token;
    });
    parameterExpansion.resolve = (options) => map((token) => {
      if (token.is("WORD") || token.is("ASSIGNMENT_WORD")) {
        if (!options.resolveParameter || !token.expansion || token.expansion.length === 0) {
          return token;
        }
        const value = token.value;
        const magic = new MagicString2(value);
        for (const xp of token.expansion) {
          if (xp.type === "parameter_expansion") {
            const result = options.resolveParameter(xp);
            xp.resolved = true;
            magic.overwrite(
              xp.loc.start,
              xp.loc.end + 1,
              fieldSplitting.mark(result, value, options)
            );
          }
        }
        return tokens.alterValue(token, magic.toString());
      }
      return token;
    });
    module2.exports = parameterExpansion;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/command-expansion.js
var require_command_expansion = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/command-expansion.js"(exports2, module2) {
    "use strict";
    var map = require_map_iterable();
    var MagicString2 = (init_magic_string_es6(), __toCommonJS(magic_string_es6_exports));
    var tokensUtils = require_tokens();
    var fieldSplitting = require_field_splitting();
    function setCommandExpansion(xp, token) {
      let command = xp.command;
      if (token.value[xp.loc.start - 1] === "`") {
        command = command.replace(/\\`/g, "`");
      }
      const bashParser = require_src();
      const commandAST = bashParser(command);
      return Object.assign({}, xp, { command, commandAST });
    }
    var commandExpansion = () => map((token) => {
      if (token.is("WORD") || token.is("ASSIGNMENT_WORD")) {
        if (!token.expansion || token.expansion.length === 0) {
          return token;
        }
        return tokensUtils.setExpansions(token, token.expansion.map((xp) => {
          if (xp.type === "command_expansion") {
            return setCommandExpansion(xp, token);
          }
          return xp;
        }));
      }
      return token;
    });
    commandExpansion.resolve = (options) => map((token) => {
      if (options.execCommand && token.expansion) {
        const value = token.value;
        const magic = new MagicString2(value);
        for (const xp of token.expansion) {
          if (xp.type === "command_expansion") {
            const result = options.execCommand(xp);
            magic.overwrite(
              xp.loc.start,
              xp.loc.end + 1,
              fieldSplitting.mark(result.replace(/\n+$/, ""), value, options)
            );
            xp.resolved = true;
          }
        }
        return token.alterValue(magic.toString());
      }
      return token;
    });
    module2.exports = commandExpansion;
  }
});

// node_modules/.pnpm/babylon@6.18.0/node_modules/babylon/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/babylon@6.18.0/node_modules/babylon/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function makePredicate(words) {
      words = words.split(" ");
      return function(str) {
        return words.indexOf(str) >= 0;
      };
    }
    var reservedWords = {
      6: makePredicate("enum await"),
      strict: makePredicate("implements interface let package private protected public static yield"),
      strictBind: makePredicate("eval arguments")
    };
    var isKeyword = makePredicate("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this let const class extends export import yield super");
    var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 785, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 54, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 86, 25, 391, 63, 32, 0, 449, 56, 264, 8, 2, 36, 18, 0, 50, 29, 881, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 65, 0, 32, 6124, 20, 754, 9486, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 60, 67, 1213, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 10591, 541];
    var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 10, 2, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 87, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 423, 9, 838, 7, 2, 7, 17, 9, 57, 21, 2, 13, 19882, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 2214, 6, 110, 6, 6, 9, 792487, 239];
    function isInAstralSet(code, set) {
      var pos = 65536;
      for (var i = 0; i < set.length; i += 2) {
        pos += set[i];
        if (pos > code) return false;
        pos += set[i + 1];
        if (pos >= code) return true;
      }
    }
    function isIdentifierStart(code) {
      if (code < 65) return code === 36;
      if (code < 91) return true;
      if (code < 97) return code === 95;
      if (code < 123) return true;
      if (code <= 65535) return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
      return isInAstralSet(code, astralIdentifierStartCodes);
    }
    function isIdentifierChar(code) {
      if (code < 48) return code === 36;
      if (code < 58) return true;
      if (code < 65) return false;
      if (code < 91) return true;
      if (code < 97) return code === 95;
      if (code < 123) return true;
      if (code <= 65535) return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
      return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
    }
    var defaultOptions = {
      // Source type ("script" or "module") for different semantics
      sourceType: "script",
      // Source filename.
      sourceFilename: void 0,
      // Line from which to start counting source. Useful for
      // integration with other tools.
      startLine: 1,
      // When enabled, a return at the top level is not considered an
      // error.
      allowReturnOutsideFunction: false,
      // When enabled, import/export statements are not constrained to
      // appearing at the top of the program.
      allowImportExportEverywhere: false,
      // TODO
      allowSuperOutsideMethod: false,
      // An array of plugins to enable
      plugins: [],
      // TODO
      strictMode: null
    };
    function getOptions(opts) {
      var options = {};
      for (var key in defaultOptions) {
        options[key] = opts && key in opts ? opts[key] : defaultOptions[key];
      }
      return options;
    }
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var classCallCheck = function(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };
    var inherits = function(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };
    var possibleConstructorReturn = function(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };
    var beforeExpr = true;
    var startsExpr = true;
    var isLoop = true;
    var isAssign = true;
    var prefix = true;
    var postfix = true;
    var TokenType = function TokenType2(label) {
      var conf = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      classCallCheck(this, TokenType2);
      this.label = label;
      this.keyword = conf.keyword;
      this.beforeExpr = !!conf.beforeExpr;
      this.startsExpr = !!conf.startsExpr;
      this.rightAssociative = !!conf.rightAssociative;
      this.isLoop = !!conf.isLoop;
      this.isAssign = !!conf.isAssign;
      this.prefix = !!conf.prefix;
      this.postfix = !!conf.postfix;
      this.binop = conf.binop || null;
      this.updateContext = null;
    };
    var KeywordTokenType = (function(_TokenType) {
      inherits(KeywordTokenType2, _TokenType);
      function KeywordTokenType2(name) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        classCallCheck(this, KeywordTokenType2);
        options.keyword = name;
        return possibleConstructorReturn(this, _TokenType.call(this, name, options));
      }
      return KeywordTokenType2;
    })(TokenType);
    var BinopTokenType = (function(_TokenType2) {
      inherits(BinopTokenType2, _TokenType2);
      function BinopTokenType2(name, prec) {
        classCallCheck(this, BinopTokenType2);
        return possibleConstructorReturn(this, _TokenType2.call(this, name, { beforeExpr, binop: prec }));
      }
      return BinopTokenType2;
    })(TokenType);
    var types = {
      num: new TokenType("num", { startsExpr }),
      regexp: new TokenType("regexp", { startsExpr }),
      string: new TokenType("string", { startsExpr }),
      name: new TokenType("name", { startsExpr }),
      eof: new TokenType("eof"),
      // Punctuation token types.
      bracketL: new TokenType("[", { beforeExpr, startsExpr }),
      bracketR: new TokenType("]"),
      braceL: new TokenType("{", { beforeExpr, startsExpr }),
      braceBarL: new TokenType("{|", { beforeExpr, startsExpr }),
      braceR: new TokenType("}"),
      braceBarR: new TokenType("|}"),
      parenL: new TokenType("(", { beforeExpr, startsExpr }),
      parenR: new TokenType(")"),
      comma: new TokenType(",", { beforeExpr }),
      semi: new TokenType(";", { beforeExpr }),
      colon: new TokenType(":", { beforeExpr }),
      doubleColon: new TokenType("::", { beforeExpr }),
      dot: new TokenType("."),
      question: new TokenType("?", { beforeExpr }),
      arrow: new TokenType("=>", { beforeExpr }),
      template: new TokenType("template"),
      ellipsis: new TokenType("...", { beforeExpr }),
      backQuote: new TokenType("`", { startsExpr }),
      dollarBraceL: new TokenType("${", { beforeExpr, startsExpr }),
      at: new TokenType("@"),
      // Operators. These carry several kinds of properties to help the
      // parser use them properly (the presence of these properties is
      // what categorizes them as operators).
      //
      // `binop`, when present, specifies that this operator is a binary
      // operator, and will refer to its precedence.
      //
      // `prefix` and `postfix` mark the operator as a prefix or postfix
      // unary operator.
      //
      // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
      // binary operators with a very low precedence, that should result
      // in AssignmentExpression nodes.
      eq: new TokenType("=", { beforeExpr, isAssign }),
      assign: new TokenType("_=", { beforeExpr, isAssign }),
      incDec: new TokenType("++/--", { prefix, postfix, startsExpr }),
      prefix: new TokenType("prefix", { beforeExpr, prefix, startsExpr }),
      logicalOR: new BinopTokenType("||", 1),
      logicalAND: new BinopTokenType("&&", 2),
      bitwiseOR: new BinopTokenType("|", 3),
      bitwiseXOR: new BinopTokenType("^", 4),
      bitwiseAND: new BinopTokenType("&", 5),
      equality: new BinopTokenType("==/!=", 6),
      relational: new BinopTokenType("</>", 7),
      bitShift: new BinopTokenType("<</>>", 8),
      plusMin: new TokenType("+/-", { beforeExpr, binop: 9, prefix, startsExpr }),
      modulo: new BinopTokenType("%", 10),
      star: new BinopTokenType("*", 10),
      slash: new BinopTokenType("/", 10),
      exponent: new TokenType("**", { beforeExpr, binop: 11, rightAssociative: true })
    };
    var keywords = {
      "break": new KeywordTokenType("break"),
      "case": new KeywordTokenType("case", { beforeExpr }),
      "catch": new KeywordTokenType("catch"),
      "continue": new KeywordTokenType("continue"),
      "debugger": new KeywordTokenType("debugger"),
      "default": new KeywordTokenType("default", { beforeExpr }),
      "do": new KeywordTokenType("do", { isLoop, beforeExpr }),
      "else": new KeywordTokenType("else", { beforeExpr }),
      "finally": new KeywordTokenType("finally"),
      "for": new KeywordTokenType("for", { isLoop }),
      "function": new KeywordTokenType("function", { startsExpr }),
      "if": new KeywordTokenType("if"),
      "return": new KeywordTokenType("return", { beforeExpr }),
      "switch": new KeywordTokenType("switch"),
      "throw": new KeywordTokenType("throw", { beforeExpr }),
      "try": new KeywordTokenType("try"),
      "var": new KeywordTokenType("var"),
      "let": new KeywordTokenType("let"),
      "const": new KeywordTokenType("const"),
      "while": new KeywordTokenType("while", { isLoop }),
      "with": new KeywordTokenType("with"),
      "new": new KeywordTokenType("new", { beforeExpr, startsExpr }),
      "this": new KeywordTokenType("this", { startsExpr }),
      "super": new KeywordTokenType("super", { startsExpr }),
      "class": new KeywordTokenType("class"),
      "extends": new KeywordTokenType("extends", { beforeExpr }),
      "export": new KeywordTokenType("export"),
      "import": new KeywordTokenType("import", { startsExpr }),
      "yield": new KeywordTokenType("yield", { beforeExpr, startsExpr }),
      "null": new KeywordTokenType("null", { startsExpr }),
      "true": new KeywordTokenType("true", { startsExpr }),
      "false": new KeywordTokenType("false", { startsExpr }),
      "in": new KeywordTokenType("in", { beforeExpr, binop: 7 }),
      "instanceof": new KeywordTokenType("instanceof", { beforeExpr, binop: 7 }),
      "typeof": new KeywordTokenType("typeof", { beforeExpr, prefix, startsExpr }),
      "void": new KeywordTokenType("void", { beforeExpr, prefix, startsExpr }),
      "delete": new KeywordTokenType("delete", { beforeExpr, prefix, startsExpr })
    };
    Object.keys(keywords).forEach(function(name) {
      types["_" + name] = keywords[name];
    });
    var lineBreak = /\r\n?|\n|\u2028|\u2029/;
    var lineBreakG = new RegExp(lineBreak.source, "g");
    function isNewLine(code) {
      return code === 10 || code === 13 || code === 8232 || code === 8233;
    }
    var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
    var TokContext = function TokContext2(token, isExpr, preserveSpace, override) {
      classCallCheck(this, TokContext2);
      this.token = token;
      this.isExpr = !!isExpr;
      this.preserveSpace = !!preserveSpace;
      this.override = override;
    };
    var types$1 = {
      braceStatement: new TokContext("{", false),
      braceExpression: new TokContext("{", true),
      templateQuasi: new TokContext("${", true),
      parenStatement: new TokContext("(", false),
      parenExpression: new TokContext("(", true),
      template: new TokContext("`", true, true, function(p) {
        return p.readTmplToken();
      }),
      functionExpression: new TokContext("function", true)
    };
    types.parenR.updateContext = types.braceR.updateContext = function() {
      if (this.state.context.length === 1) {
        this.state.exprAllowed = true;
        return;
      }
      var out = this.state.context.pop();
      if (out === types$1.braceStatement && this.curContext() === types$1.functionExpression) {
        this.state.context.pop();
        this.state.exprAllowed = false;
      } else if (out === types$1.templateQuasi) {
        this.state.exprAllowed = true;
      } else {
        this.state.exprAllowed = !out.isExpr;
      }
    };
    types.name.updateContext = function(prevType) {
      this.state.exprAllowed = false;
      if (prevType === types._let || prevType === types._const || prevType === types._var) {
        if (lineBreak.test(this.input.slice(this.state.end))) {
          this.state.exprAllowed = true;
        }
      }
    };
    types.braceL.updateContext = function(prevType) {
      this.state.context.push(this.braceIsBlock(prevType) ? types$1.braceStatement : types$1.braceExpression);
      this.state.exprAllowed = true;
    };
    types.dollarBraceL.updateContext = function() {
      this.state.context.push(types$1.templateQuasi);
      this.state.exprAllowed = true;
    };
    types.parenL.updateContext = function(prevType) {
      var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
      this.state.context.push(statementParens ? types$1.parenStatement : types$1.parenExpression);
      this.state.exprAllowed = true;
    };
    types.incDec.updateContext = function() {
    };
    types._function.updateContext = function() {
      if (this.curContext() !== types$1.braceStatement) {
        this.state.context.push(types$1.functionExpression);
      }
      this.state.exprAllowed = false;
    };
    types.backQuote.updateContext = function() {
      if (this.curContext() === types$1.template) {
        this.state.context.pop();
      } else {
        this.state.context.push(types$1.template);
      }
      this.state.exprAllowed = false;
    };
    var Position = function Position2(line, col) {
      classCallCheck(this, Position2);
      this.line = line;
      this.column = col;
    };
    var SourceLocation = function SourceLocation2(start, end) {
      classCallCheck(this, SourceLocation2);
      this.start = start;
      this.end = end;
    };
    function getLineInfo(input, offset) {
      for (var line = 1, cur = 0; ; ) {
        lineBreakG.lastIndex = cur;
        var match = lineBreakG.exec(input);
        if (match && match.index < offset) {
          ++line;
          cur = match.index + match[0].length;
        } else {
          return new Position(line, offset - cur);
        }
      }
    }
    var State = (function() {
      function State2() {
        classCallCheck(this, State2);
      }
      State2.prototype.init = function init(options, input) {
        this.strict = options.strictMode === false ? false : options.sourceType === "module";
        this.input = input;
        this.potentialArrowAt = -1;
        this.inMethod = this.inFunction = this.inGenerator = this.inAsync = this.inPropertyName = this.inType = this.inClassProperty = this.noAnonFunctionType = false;
        this.labels = [];
        this.decorators = [];
        this.tokens = [];
        this.comments = [];
        this.trailingComments = [];
        this.leadingComments = [];
        this.commentStack = [];
        this.pos = this.lineStart = 0;
        this.curLine = options.startLine;
        this.type = types.eof;
        this.value = null;
        this.start = this.end = this.pos;
        this.startLoc = this.endLoc = this.curPosition();
        this.lastTokEndLoc = this.lastTokStartLoc = null;
        this.lastTokStart = this.lastTokEnd = this.pos;
        this.context = [types$1.braceStatement];
        this.exprAllowed = true;
        this.containsEsc = this.containsOctal = false;
        this.octalPosition = null;
        this.invalidTemplateEscapePosition = null;
        this.exportedIdentifiers = [];
        return this;
      };
      State2.prototype.curPosition = function curPosition() {
        return new Position(this.curLine, this.pos - this.lineStart);
      };
      State2.prototype.clone = function clone4(skipArrays) {
        var state = new State2();
        for (var key in this) {
          var val = this[key];
          if ((!skipArrays || key === "context") && Array.isArray(val)) {
            val = val.slice();
          }
          state[key] = val;
        }
        return state;
      };
      return State2;
    })();
    var Token = function Token2(state) {
      classCallCheck(this, Token2);
      this.type = state.type;
      this.value = state.value;
      this.start = state.start;
      this.end = state.end;
      this.loc = new SourceLocation(state.startLoc, state.endLoc);
    };
    function codePointToString(code) {
      if (code <= 65535) {
        return String.fromCharCode(code);
      } else {
        return String.fromCharCode((code - 65536 >> 10) + 55296, (code - 65536 & 1023) + 56320);
      }
    }
    var Tokenizer = (function() {
      function Tokenizer2(options, input) {
        classCallCheck(this, Tokenizer2);
        this.state = new State();
        this.state.init(options, input);
      }
      Tokenizer2.prototype.next = function next() {
        if (!this.isLookahead) {
          this.state.tokens.push(new Token(this.state));
        }
        this.state.lastTokEnd = this.state.end;
        this.state.lastTokStart = this.state.start;
        this.state.lastTokEndLoc = this.state.endLoc;
        this.state.lastTokStartLoc = this.state.startLoc;
        this.nextToken();
      };
      Tokenizer2.prototype.eat = function eat(type) {
        if (this.match(type)) {
          this.next();
          return true;
        } else {
          return false;
        }
      };
      Tokenizer2.prototype.match = function match(type) {
        return this.state.type === type;
      };
      Tokenizer2.prototype.isKeyword = function isKeyword$$1(word) {
        return isKeyword(word);
      };
      Tokenizer2.prototype.lookahead = function lookahead() {
        var old = this.state;
        this.state = old.clone(true);
        this.isLookahead = true;
        this.next();
        this.isLookahead = false;
        var curr = this.state.clone(true);
        this.state = old;
        return curr;
      };
      Tokenizer2.prototype.setStrict = function setStrict(strict) {
        this.state.strict = strict;
        if (!this.match(types.num) && !this.match(types.string)) return;
        this.state.pos = this.state.start;
        while (this.state.pos < this.state.lineStart) {
          this.state.lineStart = this.input.lastIndexOf("\n", this.state.lineStart - 2) + 1;
          --this.state.curLine;
        }
        this.nextToken();
      };
      Tokenizer2.prototype.curContext = function curContext() {
        return this.state.context[this.state.context.length - 1];
      };
      Tokenizer2.prototype.nextToken = function nextToken() {
        var curContext = this.curContext();
        if (!curContext || !curContext.preserveSpace) this.skipSpace();
        this.state.containsOctal = false;
        this.state.octalPosition = null;
        this.state.start = this.state.pos;
        this.state.startLoc = this.state.curPosition();
        if (this.state.pos >= this.input.length) return this.finishToken(types.eof);
        if (curContext.override) {
          return curContext.override(this);
        } else {
          return this.readToken(this.fullCharCodeAtPos());
        }
      };
      Tokenizer2.prototype.readToken = function readToken(code) {
        if (isIdentifierStart(code) || code === 92) {
          return this.readWord();
        } else {
          return this.getTokenFromCode(code);
        }
      };
      Tokenizer2.prototype.fullCharCodeAtPos = function fullCharCodeAtPos() {
        var code = this.input.charCodeAt(this.state.pos);
        if (code <= 55295 || code >= 57344) return code;
        var next = this.input.charCodeAt(this.state.pos + 1);
        return (code << 10) + next - 56613888;
      };
      Tokenizer2.prototype.pushComment = function pushComment(block, text, start, end, startLoc, endLoc) {
        var comment = {
          type: block ? "CommentBlock" : "CommentLine",
          value: text,
          start,
          end,
          loc: new SourceLocation(startLoc, endLoc)
        };
        if (!this.isLookahead) {
          this.state.tokens.push(comment);
          this.state.comments.push(comment);
          this.addComment(comment);
        }
      };
      Tokenizer2.prototype.skipBlockComment = function skipBlockComment() {
        var startLoc = this.state.curPosition();
        var start = this.state.pos;
        var end = this.input.indexOf("*/", this.state.pos += 2);
        if (end === -1) this.raise(this.state.pos - 2, "Unterminated comment");
        this.state.pos = end + 2;
        lineBreakG.lastIndex = start;
        var match = void 0;
        while ((match = lineBreakG.exec(this.input)) && match.index < this.state.pos) {
          ++this.state.curLine;
          this.state.lineStart = match.index + match[0].length;
        }
        this.pushComment(true, this.input.slice(start + 2, end), start, this.state.pos, startLoc, this.state.curPosition());
      };
      Tokenizer2.prototype.skipLineComment = function skipLineComment(startSkip) {
        var start = this.state.pos;
        var startLoc = this.state.curPosition();
        var ch = this.input.charCodeAt(this.state.pos += startSkip);
        while (this.state.pos < this.input.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
          ++this.state.pos;
          ch = this.input.charCodeAt(this.state.pos);
        }
        this.pushComment(false, this.input.slice(start + startSkip, this.state.pos), start, this.state.pos, startLoc, this.state.curPosition());
      };
      Tokenizer2.prototype.skipSpace = function skipSpace() {
        loop: while (this.state.pos < this.input.length) {
          var ch = this.input.charCodeAt(this.state.pos);
          switch (ch) {
            case 32:
            case 160:
              ++this.state.pos;
              break;
            case 13:
              if (this.input.charCodeAt(this.state.pos + 1) === 10) {
                ++this.state.pos;
              }
            case 10:
            case 8232:
            case 8233:
              ++this.state.pos;
              ++this.state.curLine;
              this.state.lineStart = this.state.pos;
              break;
            case 47:
              switch (this.input.charCodeAt(this.state.pos + 1)) {
                case 42:
                  this.skipBlockComment();
                  break;
                case 47:
                  this.skipLineComment(2);
                  break;
                default:
                  break loop;
              }
              break;
            default:
              if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
                ++this.state.pos;
              } else {
                break loop;
              }
          }
        }
      };
      Tokenizer2.prototype.finishToken = function finishToken(type, val) {
        this.state.end = this.state.pos;
        this.state.endLoc = this.state.curPosition();
        var prevType = this.state.type;
        this.state.type = type;
        this.state.value = val;
        this.updateContext(prevType);
      };
      Tokenizer2.prototype.readToken_dot = function readToken_dot() {
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next >= 48 && next <= 57) {
          return this.readNumber(true);
        }
        var next2 = this.input.charCodeAt(this.state.pos + 2);
        if (next === 46 && next2 === 46) {
          this.state.pos += 3;
          return this.finishToken(types.ellipsis);
        } else {
          ++this.state.pos;
          return this.finishToken(types.dot);
        }
      };
      Tokenizer2.prototype.readToken_slash = function readToken_slash() {
        if (this.state.exprAllowed) {
          ++this.state.pos;
          return this.readRegexp();
        }
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next === 61) {
          return this.finishOp(types.assign, 2);
        } else {
          return this.finishOp(types.slash, 1);
        }
      };
      Tokenizer2.prototype.readToken_mult_modulo = function readToken_mult_modulo(code) {
        var type = code === 42 ? types.star : types.modulo;
        var width = 1;
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next === 42) {
          width++;
          next = this.input.charCodeAt(this.state.pos + 2);
          type = types.exponent;
        }
        if (next === 61) {
          width++;
          type = types.assign;
        }
        return this.finishOp(type, width);
      };
      Tokenizer2.prototype.readToken_pipe_amp = function readToken_pipe_amp(code) {
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next === code) return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2);
        if (next === 61) return this.finishOp(types.assign, 2);
        if (code === 124 && next === 125 && this.hasPlugin("flow")) return this.finishOp(types.braceBarR, 2);
        return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1);
      };
      Tokenizer2.prototype.readToken_caret = function readToken_caret() {
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next === 61) {
          return this.finishOp(types.assign, 2);
        } else {
          return this.finishOp(types.bitwiseXOR, 1);
        }
      };
      Tokenizer2.prototype.readToken_plus_min = function readToken_plus_min(code) {
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next === code) {
          if (next === 45 && this.input.charCodeAt(this.state.pos + 2) === 62 && lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.pos))) {
            this.skipLineComment(3);
            this.skipSpace();
            return this.nextToken();
          }
          return this.finishOp(types.incDec, 2);
        }
        if (next === 61) {
          return this.finishOp(types.assign, 2);
        } else {
          return this.finishOp(types.plusMin, 1);
        }
      };
      Tokenizer2.prototype.readToken_lt_gt = function readToken_lt_gt(code) {
        var next = this.input.charCodeAt(this.state.pos + 1);
        var size = 1;
        if (next === code) {
          size = code === 62 && this.input.charCodeAt(this.state.pos + 2) === 62 ? 3 : 2;
          if (this.input.charCodeAt(this.state.pos + size) === 61) return this.finishOp(types.assign, size + 1);
          return this.finishOp(types.bitShift, size);
        }
        if (next === 33 && code === 60 && this.input.charCodeAt(this.state.pos + 2) === 45 && this.input.charCodeAt(this.state.pos + 3) === 45) {
          if (this.inModule) this.unexpected();
          this.skipLineComment(4);
          this.skipSpace();
          return this.nextToken();
        }
        if (next === 61) {
          size = 2;
        }
        return this.finishOp(types.relational, size);
      };
      Tokenizer2.prototype.readToken_eq_excl = function readToken_eq_excl(code) {
        var next = this.input.charCodeAt(this.state.pos + 1);
        if (next === 61) return this.finishOp(types.equality, this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2);
        if (code === 61 && next === 62) {
          this.state.pos += 2;
          return this.finishToken(types.arrow);
        }
        return this.finishOp(code === 61 ? types.eq : types.prefix, 1);
      };
      Tokenizer2.prototype.getTokenFromCode = function getTokenFromCode(code) {
        switch (code) {
          // The interpretation of a dot depends on whether it is followed
          // by a digit or another two dots.
          case 46:
            return this.readToken_dot();
          // Punctuation tokens.
          case 40:
            ++this.state.pos;
            return this.finishToken(types.parenL);
          case 41:
            ++this.state.pos;
            return this.finishToken(types.parenR);
          case 59:
            ++this.state.pos;
            return this.finishToken(types.semi);
          case 44:
            ++this.state.pos;
            return this.finishToken(types.comma);
          case 91:
            ++this.state.pos;
            return this.finishToken(types.bracketL);
          case 93:
            ++this.state.pos;
            return this.finishToken(types.bracketR);
          case 123:
            if (this.hasPlugin("flow") && this.input.charCodeAt(this.state.pos + 1) === 124) {
              return this.finishOp(types.braceBarL, 2);
            } else {
              ++this.state.pos;
              return this.finishToken(types.braceL);
            }
          case 125:
            ++this.state.pos;
            return this.finishToken(types.braceR);
          case 58:
            if (this.hasPlugin("functionBind") && this.input.charCodeAt(this.state.pos + 1) === 58) {
              return this.finishOp(types.doubleColon, 2);
            } else {
              ++this.state.pos;
              return this.finishToken(types.colon);
            }
          case 63:
            ++this.state.pos;
            return this.finishToken(types.question);
          case 64:
            ++this.state.pos;
            return this.finishToken(types.at);
          case 96:
            ++this.state.pos;
            return this.finishToken(types.backQuote);
          case 48:
            var next = this.input.charCodeAt(this.state.pos + 1);
            if (next === 120 || next === 88) return this.readRadixNumber(16);
            if (next === 111 || next === 79) return this.readRadixNumber(8);
            if (next === 98 || next === 66) return this.readRadixNumber(2);
          // '0b', '0B' - binary number
          // Anything else beginning with a digit is an integer, octal
          // number, or float.
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return this.readNumber(false);
          // Quotes produce strings.
          case 34:
          case 39:
            return this.readString(code);
          // Operators are parsed inline in tiny state machines. '=' (61) is
          // often referred to. `finishOp` simply skips the amount of
          // characters it is given as second argument, and returns a token
          // of the type given by its first argument.
          case 47:
            return this.readToken_slash();
          case 37:
          case 42:
            return this.readToken_mult_modulo(code);
          case 124:
          case 38:
            return this.readToken_pipe_amp(code);
          case 94:
            return this.readToken_caret();
          case 43:
          case 45:
            return this.readToken_plus_min(code);
          case 60:
          case 62:
            return this.readToken_lt_gt(code);
          case 61:
          case 33:
            return this.readToken_eq_excl(code);
          case 126:
            return this.finishOp(types.prefix, 1);
        }
        this.raise(this.state.pos, "Unexpected character '" + codePointToString(code) + "'");
      };
      Tokenizer2.prototype.finishOp = function finishOp(type, size) {
        var str = this.input.slice(this.state.pos, this.state.pos + size);
        this.state.pos += size;
        return this.finishToken(type, str);
      };
      Tokenizer2.prototype.readRegexp = function readRegexp() {
        var start = this.state.pos;
        var escaped = void 0, inClass = void 0;
        for (; ; ) {
          if (this.state.pos >= this.input.length) this.raise(start, "Unterminated regular expression");
          var ch = this.input.charAt(this.state.pos);
          if (lineBreak.test(ch)) {
            this.raise(start, "Unterminated regular expression");
          }
          if (escaped) {
            escaped = false;
          } else {
            if (ch === "[") {
              inClass = true;
            } else if (ch === "]" && inClass) {
              inClass = false;
            } else if (ch === "/" && !inClass) {
              break;
            }
            escaped = ch === "\\";
          }
          ++this.state.pos;
        }
        var content = this.input.slice(start, this.state.pos);
        ++this.state.pos;
        var mods = this.readWord1();
        if (mods) {
          var validFlags = /^[gmsiyu]*$/;
          if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
        }
        return this.finishToken(types.regexp, {
          pattern: content,
          flags: mods
        });
      };
      Tokenizer2.prototype.readInt = function readInt(radix, len) {
        var start = this.state.pos;
        var total = 0;
        for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
          var code = this.input.charCodeAt(this.state.pos);
          var val = void 0;
          if (code >= 97) {
            val = code - 97 + 10;
          } else if (code >= 65) {
            val = code - 65 + 10;
          } else if (code >= 48 && code <= 57) {
            val = code - 48;
          } else {
            val = Infinity;
          }
          if (val >= radix) break;
          ++this.state.pos;
          total = total * radix + val;
        }
        if (this.state.pos === start || len != null && this.state.pos - start !== len) return null;
        return total;
      };
      Tokenizer2.prototype.readRadixNumber = function readRadixNumber(radix) {
        this.state.pos += 2;
        var val = this.readInt(radix);
        if (val == null) this.raise(this.state.start + 2, "Expected number in radix " + radix);
        if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.state.pos, "Identifier directly after number");
        return this.finishToken(types.num, val);
      };
      Tokenizer2.prototype.readNumber = function readNumber(startsWithDot) {
        var start = this.state.pos;
        var octal = this.input.charCodeAt(start) === 48;
        var isFloat = false;
        if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
        if (octal && this.state.pos == start + 1) octal = false;
        var next = this.input.charCodeAt(this.state.pos);
        if (next === 46 && !octal) {
          ++this.state.pos;
          this.readInt(10);
          isFloat = true;
          next = this.input.charCodeAt(this.state.pos);
        }
        if ((next === 69 || next === 101) && !octal) {
          next = this.input.charCodeAt(++this.state.pos);
          if (next === 43 || next === 45) ++this.state.pos;
          if (this.readInt(10) === null) this.raise(start, "Invalid number");
          isFloat = true;
        }
        if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.state.pos, "Identifier directly after number");
        var str = this.input.slice(start, this.state.pos);
        var val = void 0;
        if (isFloat) {
          val = parseFloat(str);
        } else if (!octal || str.length === 1) {
          val = parseInt(str, 10);
        } else if (this.state.strict) {
          this.raise(start, "Invalid number");
        } else if (/[89]/.test(str)) {
          val = parseInt(str, 10);
        } else {
          val = parseInt(str, 8);
        }
        return this.finishToken(types.num, val);
      };
      Tokenizer2.prototype.readCodePoint = function readCodePoint(throwOnInvalid) {
        var ch = this.input.charCodeAt(this.state.pos);
        var code = void 0;
        if (ch === 123) {
          var codePos = ++this.state.pos;
          code = this.readHexChar(this.input.indexOf("}", this.state.pos) - this.state.pos, throwOnInvalid);
          ++this.state.pos;
          if (code === null) {
            --this.state.invalidTemplateEscapePosition;
          } else if (code > 1114111) {
            if (throwOnInvalid) {
              this.raise(codePos, "Code point out of bounds");
            } else {
              this.state.invalidTemplateEscapePosition = codePos - 2;
              return null;
            }
          }
        } else {
          code = this.readHexChar(4, throwOnInvalid);
        }
        return code;
      };
      Tokenizer2.prototype.readString = function readString(quote) {
        var out = "", chunkStart = ++this.state.pos;
        for (; ; ) {
          if (this.state.pos >= this.input.length) this.raise(this.state.start, "Unterminated string constant");
          var ch = this.input.charCodeAt(this.state.pos);
          if (ch === quote) break;
          if (ch === 92) {
            out += this.input.slice(chunkStart, this.state.pos);
            out += this.readEscapedChar(false);
            chunkStart = this.state.pos;
          } else {
            if (isNewLine(ch)) this.raise(this.state.start, "Unterminated string constant");
            ++this.state.pos;
          }
        }
        out += this.input.slice(chunkStart, this.state.pos++);
        return this.finishToken(types.string, out);
      };
      Tokenizer2.prototype.readTmplToken = function readTmplToken() {
        var out = "", chunkStart = this.state.pos, containsInvalid = false;
        for (; ; ) {
          if (this.state.pos >= this.input.length) this.raise(this.state.start, "Unterminated template");
          var ch = this.input.charCodeAt(this.state.pos);
          if (ch === 96 || ch === 36 && this.input.charCodeAt(this.state.pos + 1) === 123) {
            if (this.state.pos === this.state.start && this.match(types.template)) {
              if (ch === 36) {
                this.state.pos += 2;
                return this.finishToken(types.dollarBraceL);
              } else {
                ++this.state.pos;
                return this.finishToken(types.backQuote);
              }
            }
            out += this.input.slice(chunkStart, this.state.pos);
            return this.finishToken(types.template, containsInvalid ? null : out);
          }
          if (ch === 92) {
            out += this.input.slice(chunkStart, this.state.pos);
            var escaped = this.readEscapedChar(true);
            if (escaped === null) {
              containsInvalid = true;
            } else {
              out += escaped;
            }
            chunkStart = this.state.pos;
          } else if (isNewLine(ch)) {
            out += this.input.slice(chunkStart, this.state.pos);
            ++this.state.pos;
            switch (ch) {
              case 13:
                if (this.input.charCodeAt(this.state.pos) === 10) ++this.state.pos;
              case 10:
                out += "\n";
                break;
              default:
                out += String.fromCharCode(ch);
                break;
            }
            ++this.state.curLine;
            this.state.lineStart = this.state.pos;
            chunkStart = this.state.pos;
          } else {
            ++this.state.pos;
          }
        }
      };
      Tokenizer2.prototype.readEscapedChar = function readEscapedChar(inTemplate) {
        var throwOnInvalid = !inTemplate;
        var ch = this.input.charCodeAt(++this.state.pos);
        ++this.state.pos;
        switch (ch) {
          case 110:
            return "\n";
          // 'n' -> '\n'
          case 114:
            return "\r";
          // 'r' -> '\r'
          case 120: {
            var code = this.readHexChar(2, throwOnInvalid);
            return code === null ? null : String.fromCharCode(code);
          }
          case 117: {
            var _code = this.readCodePoint(throwOnInvalid);
            return _code === null ? null : codePointToString(_code);
          }
          case 116:
            return "	";
          // 't' -> '\t'
          case 98:
            return "\b";
          // 'b' -> '\b'
          case 118:
            return "\v";
          // 'v' -> '\u000b'
          case 102:
            return "\f";
          // 'f' -> '\f'
          case 13:
            if (this.input.charCodeAt(this.state.pos) === 10) ++this.state.pos;
          // '\r\n'
          case 10:
            this.state.lineStart = this.state.pos;
            ++this.state.curLine;
            return "";
          default:
            if (ch >= 48 && ch <= 55) {
              var codePos = this.state.pos - 1;
              var octalStr = this.input.substr(this.state.pos - 1, 3).match(/^[0-7]+/)[0];
              var octal = parseInt(octalStr, 8);
              if (octal > 255) {
                octalStr = octalStr.slice(0, -1);
                octal = parseInt(octalStr, 8);
              }
              if (octal > 0) {
                if (inTemplate) {
                  this.state.invalidTemplateEscapePosition = codePos;
                  return null;
                } else if (this.state.strict) {
                  this.raise(codePos, "Octal literal in strict mode");
                } else if (!this.state.containsOctal) {
                  this.state.containsOctal = true;
                  this.state.octalPosition = codePos;
                }
              }
              this.state.pos += octalStr.length - 1;
              return String.fromCharCode(octal);
            }
            return String.fromCharCode(ch);
        }
      };
      Tokenizer2.prototype.readHexChar = function readHexChar(len, throwOnInvalid) {
        var codePos = this.state.pos;
        var n = this.readInt(16, len);
        if (n === null) {
          if (throwOnInvalid) {
            this.raise(codePos, "Bad character escape sequence");
          } else {
            this.state.pos = codePos - 1;
            this.state.invalidTemplateEscapePosition = codePos - 1;
          }
        }
        return n;
      };
      Tokenizer2.prototype.readWord1 = function readWord1() {
        this.state.containsEsc = false;
        var word = "", first = true, chunkStart = this.state.pos;
        while (this.state.pos < this.input.length) {
          var ch = this.fullCharCodeAtPos();
          if (isIdentifierChar(ch)) {
            this.state.pos += ch <= 65535 ? 1 : 2;
          } else if (ch === 92) {
            this.state.containsEsc = true;
            word += this.input.slice(chunkStart, this.state.pos);
            var escStart = this.state.pos;
            if (this.input.charCodeAt(++this.state.pos) !== 117) {
              this.raise(this.state.pos, "Expecting Unicode escape sequence \\uXXXX");
            }
            ++this.state.pos;
            var esc = this.readCodePoint(true);
            if (!(first ? isIdentifierStart : isIdentifierChar)(esc, true)) {
              this.raise(escStart, "Invalid Unicode escape");
            }
            word += codePointToString(esc);
            chunkStart = this.state.pos;
          } else {
            break;
          }
          first = false;
        }
        return word + this.input.slice(chunkStart, this.state.pos);
      };
      Tokenizer2.prototype.readWord = function readWord() {
        var word = this.readWord1();
        var type = types.name;
        if (!this.state.containsEsc && this.isKeyword(word)) {
          type = keywords[word];
        }
        return this.finishToken(type, word);
      };
      Tokenizer2.prototype.braceIsBlock = function braceIsBlock(prevType) {
        if (prevType === types.colon) {
          var parent = this.curContext();
          if (parent === types$1.braceStatement || parent === types$1.braceExpression) {
            return !parent.isExpr;
          }
        }
        if (prevType === types._return) {
          return lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
        }
        if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR) {
          return true;
        }
        if (prevType === types.braceL) {
          return this.curContext() === types$1.braceStatement;
        }
        return !this.state.exprAllowed;
      };
      Tokenizer2.prototype.updateContext = function updateContext(prevType) {
        var type = this.state.type;
        var update = void 0;
        if (type.keyword && prevType === types.dot) {
          this.state.exprAllowed = false;
        } else if (update = type.updateContext) {
          update.call(this, prevType);
        } else {
          this.state.exprAllowed = type.beforeExpr;
        }
      };
      return Tokenizer2;
    })();
    var plugins = {};
    var frozenDeprecatedWildcardPluginList = ["jsx", "doExpressions", "objectRestSpread", "decorators", "classProperties", "exportExtensions", "asyncGenerators", "functionBind", "functionSent", "dynamicImport", "flow"];
    var Parser = (function(_Tokenizer) {
      inherits(Parser2, _Tokenizer);
      function Parser2(options, input) {
        classCallCheck(this, Parser2);
        options = getOptions(options);
        var _this = possibleConstructorReturn(this, _Tokenizer.call(this, options, input));
        _this.options = options;
        _this.inModule = _this.options.sourceType === "module";
        _this.input = input;
        _this.plugins = _this.loadPlugins(_this.options.plugins);
        _this.filename = options.sourceFilename;
        if (_this.state.pos === 0 && _this.input[0] === "#" && _this.input[1] === "!") {
          _this.skipLineComment(2);
        }
        return _this;
      }
      Parser2.prototype.isReservedWord = function isReservedWord(word) {
        if (word === "await") {
          return this.inModule;
        } else {
          return reservedWords[6](word);
        }
      };
      Parser2.prototype.hasPlugin = function hasPlugin(name) {
        if (this.plugins["*"] && frozenDeprecatedWildcardPluginList.indexOf(name) > -1) {
          return true;
        }
        return !!this.plugins[name];
      };
      Parser2.prototype.extend = function extend(name, f) {
        this[name] = f(this[name]);
      };
      Parser2.prototype.loadAllPlugins = function loadAllPlugins() {
        var _this2 = this;
        var pluginNames = Object.keys(plugins).filter(function(name) {
          return name !== "flow" && name !== "estree";
        });
        pluginNames.push("flow");
        pluginNames.forEach(function(name) {
          var plugin = plugins[name];
          if (plugin) plugin(_this2);
        });
      };
      Parser2.prototype.loadPlugins = function loadPlugins(pluginList) {
        if (pluginList.indexOf("*") >= 0) {
          this.loadAllPlugins();
          return { "*": true };
        }
        var pluginMap = {};
        if (pluginList.indexOf("flow") >= 0) {
          pluginList = pluginList.filter(function(plugin2) {
            return plugin2 !== "flow";
          });
          pluginList.push("flow");
        }
        if (pluginList.indexOf("estree") >= 0) {
          pluginList = pluginList.filter(function(plugin2) {
            return plugin2 !== "estree";
          });
          pluginList.unshift("estree");
        }
        for (var _iterator = pluginList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
          var _ref;
          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }
          var name = _ref;
          if (!pluginMap[name]) {
            pluginMap[name] = true;
            var plugin = plugins[name];
            if (plugin) plugin(this);
          }
        }
        return pluginMap;
      };
      Parser2.prototype.parse = function parse3() {
        var file = this.startNode();
        var program = this.startNode();
        this.nextToken();
        return this.parseTopLevel(file, program);
      };
      return Parser2;
    })(Tokenizer);
    var pp = Parser.prototype;
    pp.addExtra = function(node, key, val) {
      if (!node) return;
      var extra = node.extra = node.extra || {};
      extra[key] = val;
    };
    pp.isRelational = function(op) {
      return this.match(types.relational) && this.state.value === op;
    };
    pp.expectRelational = function(op) {
      if (this.isRelational(op)) {
        this.next();
      } else {
        this.unexpected(null, types.relational);
      }
    };
    pp.isContextual = function(name) {
      return this.match(types.name) && this.state.value === name;
    };
    pp.eatContextual = function(name) {
      return this.state.value === name && this.eat(types.name);
    };
    pp.expectContextual = function(name, message) {
      if (!this.eatContextual(name)) this.unexpected(null, message);
    };
    pp.canInsertSemicolon = function() {
      return this.match(types.eof) || this.match(types.braceR) || lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start));
    };
    pp.isLineTerminator = function() {
      return this.eat(types.semi) || this.canInsertSemicolon();
    };
    pp.semicolon = function() {
      if (!this.isLineTerminator()) this.unexpected(null, types.semi);
    };
    pp.expect = function(type, pos) {
      return this.eat(type) || this.unexpected(pos, type);
    };
    pp.unexpected = function(pos) {
      var messageOrType = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Unexpected token";
      if (messageOrType && (typeof messageOrType === "undefined" ? "undefined" : _typeof(messageOrType)) === "object" && messageOrType.label) {
        messageOrType = "Unexpected token, expected " + messageOrType.label;
      }
      this.raise(pos != null ? pos : this.state.start, messageOrType);
    };
    var pp$1 = Parser.prototype;
    pp$1.parseTopLevel = function(file, program) {
      program.sourceType = this.options.sourceType;
      this.parseBlockBody(program, true, true, types.eof);
      file.program = this.finishNode(program, "Program");
      file.comments = this.state.comments;
      file.tokens = this.state.tokens;
      return this.finishNode(file, "File");
    };
    var loopLabel = { kind: "loop" };
    var switchLabel = { kind: "switch" };
    pp$1.stmtToDirective = function(stmt) {
      var expr = stmt.expression;
      var directiveLiteral = this.startNodeAt(expr.start, expr.loc.start);
      var directive = this.startNodeAt(stmt.start, stmt.loc.start);
      var raw = this.input.slice(expr.start, expr.end);
      var val = directiveLiteral.value = raw.slice(1, -1);
      this.addExtra(directiveLiteral, "raw", raw);
      this.addExtra(directiveLiteral, "rawValue", val);
      directive.value = this.finishNodeAt(directiveLiteral, "DirectiveLiteral", expr.end, expr.loc.end);
      return this.finishNodeAt(directive, "Directive", stmt.end, stmt.loc.end);
    };
    pp$1.parseStatement = function(declaration, topLevel) {
      if (this.match(types.at)) {
        this.parseDecorators(true);
      }
      var starttype = this.state.type;
      var node = this.startNode();
      switch (starttype) {
        case types._break:
        case types._continue:
          return this.parseBreakContinueStatement(node, starttype.keyword);
        case types._debugger:
          return this.parseDebuggerStatement(node);
        case types._do:
          return this.parseDoStatement(node);
        case types._for:
          return this.parseForStatement(node);
        case types._function:
          if (!declaration) this.unexpected();
          return this.parseFunctionStatement(node);
        case types._class:
          if (!declaration) this.unexpected();
          return this.parseClass(node, true);
        case types._if:
          return this.parseIfStatement(node);
        case types._return:
          return this.parseReturnStatement(node);
        case types._switch:
          return this.parseSwitchStatement(node);
        case types._throw:
          return this.parseThrowStatement(node);
        case types._try:
          return this.parseTryStatement(node);
        case types._let:
        case types._const:
          if (!declaration) this.unexpected();
        // NOTE: falls through to _var
        case types._var:
          return this.parseVarStatement(node, starttype);
        case types._while:
          return this.parseWhileStatement(node);
        case types._with:
          return this.parseWithStatement(node);
        case types.braceL:
          return this.parseBlock();
        case types.semi:
          return this.parseEmptyStatement(node);
        case types._export:
        case types._import:
          if (this.hasPlugin("dynamicImport") && this.lookahead().type === types.parenL) break;
          if (!this.options.allowImportExportEverywhere) {
            if (!topLevel) {
              this.raise(this.state.start, "'import' and 'export' may only appear at the top level");
            }
            if (!this.inModule) {
              this.raise(this.state.start, `'import' and 'export' may appear only with 'sourceType: "module"'`);
            }
          }
          return starttype === types._import ? this.parseImport(node) : this.parseExport(node);
        case types.name:
          if (this.state.value === "async") {
            var state = this.state.clone();
            this.next();
            if (this.match(types._function) && !this.canInsertSemicolon()) {
              this.expect(types._function);
              return this.parseFunction(node, true, false, true);
            } else {
              this.state = state;
            }
          }
      }
      var maybeName = this.state.value;
      var expr = this.parseExpression();
      if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon)) {
        return this.parseLabeledStatement(node, maybeName, expr);
      } else {
        return this.parseExpressionStatement(node, expr);
      }
    };
    pp$1.takeDecorators = function(node) {
      if (this.state.decorators.length) {
        node.decorators = this.state.decorators;
        this.state.decorators = [];
      }
    };
    pp$1.parseDecorators = function(allowExport) {
      while (this.match(types.at)) {
        var decorator = this.parseDecorator();
        this.state.decorators.push(decorator);
      }
      if (allowExport && this.match(types._export)) {
        return;
      }
      if (!this.match(types._class)) {
        this.raise(this.state.start, "Leading decorators must be attached to a class declaration");
      }
    };
    pp$1.parseDecorator = function() {
      if (!this.hasPlugin("decorators")) {
        this.unexpected();
      }
      var node = this.startNode();
      this.next();
      node.expression = this.parseMaybeAssign();
      return this.finishNode(node, "Decorator");
    };
    pp$1.parseBreakContinueStatement = function(node, keyword) {
      var isBreak = keyword === "break";
      this.next();
      if (this.isLineTerminator()) {
        node.label = null;
      } else if (!this.match(types.name)) {
        this.unexpected();
      } else {
        node.label = this.parseIdentifier();
        this.semicolon();
      }
      var i = void 0;
      for (i = 0; i < this.state.labels.length; ++i) {
        var lab = this.state.labels[i];
        if (node.label == null || lab.name === node.label.name) {
          if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
          if (node.label && isBreak) break;
        }
      }
      if (i === this.state.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
      return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
    };
    pp$1.parseDebuggerStatement = function(node) {
      this.next();
      this.semicolon();
      return this.finishNode(node, "DebuggerStatement");
    };
    pp$1.parseDoStatement = function(node) {
      this.next();
      this.state.labels.push(loopLabel);
      node.body = this.parseStatement(false);
      this.state.labels.pop();
      this.expect(types._while);
      node.test = this.parseParenExpression();
      this.eat(types.semi);
      return this.finishNode(node, "DoWhileStatement");
    };
    pp$1.parseForStatement = function(node) {
      this.next();
      this.state.labels.push(loopLabel);
      var forAwait = false;
      if (this.hasPlugin("asyncGenerators") && this.state.inAsync && this.isContextual("await")) {
        forAwait = true;
        this.next();
      }
      this.expect(types.parenL);
      if (this.match(types.semi)) {
        if (forAwait) {
          this.unexpected();
        }
        return this.parseFor(node, null);
      }
      if (this.match(types._var) || this.match(types._let) || this.match(types._const)) {
        var _init = this.startNode();
        var varKind = this.state.type;
        this.next();
        this.parseVar(_init, true, varKind);
        this.finishNode(_init, "VariableDeclaration");
        if (this.match(types._in) || this.isContextual("of")) {
          if (_init.declarations.length === 1 && !_init.declarations[0].init) {
            return this.parseForIn(node, _init, forAwait);
          }
        }
        if (forAwait) {
          this.unexpected();
        }
        return this.parseFor(node, _init);
      }
      var refShorthandDefaultPos = { start: 0 };
      var init = this.parseExpression(true, refShorthandDefaultPos);
      if (this.match(types._in) || this.isContextual("of")) {
        var description = this.isContextual("of") ? "for-of statement" : "for-in statement";
        this.toAssignable(init, void 0, description);
        this.checkLVal(init, void 0, void 0, description);
        return this.parseForIn(node, init, forAwait);
      } else if (refShorthandDefaultPos.start) {
        this.unexpected(refShorthandDefaultPos.start);
      }
      if (forAwait) {
        this.unexpected();
      }
      return this.parseFor(node, init);
    };
    pp$1.parseFunctionStatement = function(node) {
      this.next();
      return this.parseFunction(node, true);
    };
    pp$1.parseIfStatement = function(node) {
      this.next();
      node.test = this.parseParenExpression();
      node.consequent = this.parseStatement(false);
      node.alternate = this.eat(types._else) ? this.parseStatement(false) : null;
      return this.finishNode(node, "IfStatement");
    };
    pp$1.parseReturnStatement = function(node) {
      if (!this.state.inFunction && !this.options.allowReturnOutsideFunction) {
        this.raise(this.state.start, "'return' outside of function");
      }
      this.next();
      if (this.isLineTerminator()) {
        node.argument = null;
      } else {
        node.argument = this.parseExpression();
        this.semicolon();
      }
      return this.finishNode(node, "ReturnStatement");
    };
    pp$1.parseSwitchStatement = function(node) {
      this.next();
      node.discriminant = this.parseParenExpression();
      node.cases = [];
      this.expect(types.braceL);
      this.state.labels.push(switchLabel);
      var cur = void 0;
      for (var sawDefault; !this.match(types.braceR); ) {
        if (this.match(types._case) || this.match(types._default)) {
          var isCase = this.match(types._case);
          if (cur) this.finishNode(cur, "SwitchCase");
          node.cases.push(cur = this.startNode());
          cur.consequent = [];
          this.next();
          if (isCase) {
            cur.test = this.parseExpression();
          } else {
            if (sawDefault) this.raise(this.state.lastTokStart, "Multiple default clauses");
            sawDefault = true;
            cur.test = null;
          }
          this.expect(types.colon);
        } else {
          if (cur) {
            cur.consequent.push(this.parseStatement(true));
          } else {
            this.unexpected();
          }
        }
      }
      if (cur) this.finishNode(cur, "SwitchCase");
      this.next();
      this.state.labels.pop();
      return this.finishNode(node, "SwitchStatement");
    };
    pp$1.parseThrowStatement = function(node) {
      this.next();
      if (lineBreak.test(this.input.slice(this.state.lastTokEnd, this.state.start))) this.raise(this.state.lastTokEnd, "Illegal newline after throw");
      node.argument = this.parseExpression();
      this.semicolon();
      return this.finishNode(node, "ThrowStatement");
    };
    var empty = [];
    pp$1.parseTryStatement = function(node) {
      this.next();
      node.block = this.parseBlock();
      node.handler = null;
      if (this.match(types._catch)) {
        var clause = this.startNode();
        this.next();
        this.expect(types.parenL);
        clause.param = this.parseBindingAtom();
        this.checkLVal(clause.param, true, /* @__PURE__ */ Object.create(null), "catch clause");
        this.expect(types.parenR);
        clause.body = this.parseBlock();
        node.handler = this.finishNode(clause, "CatchClause");
      }
      node.guardedHandlers = empty;
      node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
      if (!node.handler && !node.finalizer) {
        this.raise(node.start, "Missing catch or finally clause");
      }
      return this.finishNode(node, "TryStatement");
    };
    pp$1.parseVarStatement = function(node, kind) {
      this.next();
      this.parseVar(node, false, kind);
      this.semicolon();
      return this.finishNode(node, "VariableDeclaration");
    };
    pp$1.parseWhileStatement = function(node) {
      this.next();
      node.test = this.parseParenExpression();
      this.state.labels.push(loopLabel);
      node.body = this.parseStatement(false);
      this.state.labels.pop();
      return this.finishNode(node, "WhileStatement");
    };
    pp$1.parseWithStatement = function(node) {
      if (this.state.strict) this.raise(this.state.start, "'with' in strict mode");
      this.next();
      node.object = this.parseParenExpression();
      node.body = this.parseStatement(false);
      return this.finishNode(node, "WithStatement");
    };
    pp$1.parseEmptyStatement = function(node) {
      this.next();
      return this.finishNode(node, "EmptyStatement");
    };
    pp$1.parseLabeledStatement = function(node, maybeName, expr) {
      for (var _iterator = this.state.labels, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
        var _ref;
        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }
        var _label = _ref;
        if (_label.name === maybeName) {
          this.raise(expr.start, "Label '" + maybeName + "' is already declared");
        }
      }
      var kind = this.state.type.isLoop ? "loop" : this.match(types._switch) ? "switch" : null;
      for (var i = this.state.labels.length - 1; i >= 0; i--) {
        var label = this.state.labels[i];
        if (label.statementStart === node.start) {
          label.statementStart = this.state.start;
          label.kind = kind;
        } else {
          break;
        }
      }
      this.state.labels.push({ name: maybeName, kind, statementStart: this.state.start });
      node.body = this.parseStatement(true);
      this.state.labels.pop();
      node.label = expr;
      return this.finishNode(node, "LabeledStatement");
    };
    pp$1.parseExpressionStatement = function(node, expr) {
      node.expression = expr;
      this.semicolon();
      return this.finishNode(node, "ExpressionStatement");
    };
    pp$1.parseBlock = function(allowDirectives) {
      var node = this.startNode();
      this.expect(types.braceL);
      this.parseBlockBody(node, allowDirectives, false, types.braceR);
      return this.finishNode(node, "BlockStatement");
    };
    pp$1.isValidDirective = function(stmt) {
      return stmt.type === "ExpressionStatement" && stmt.expression.type === "StringLiteral" && !stmt.expression.extra.parenthesized;
    };
    pp$1.parseBlockBody = function(node, allowDirectives, topLevel, end) {
      node.body = [];
      node.directives = [];
      var parsedNonDirective = false;
      var oldStrict = void 0;
      var octalPosition = void 0;
      while (!this.eat(end)) {
        if (!parsedNonDirective && this.state.containsOctal && !octalPosition) {
          octalPosition = this.state.octalPosition;
        }
        var stmt = this.parseStatement(true, topLevel);
        if (allowDirectives && !parsedNonDirective && this.isValidDirective(stmt)) {
          var directive = this.stmtToDirective(stmt);
          node.directives.push(directive);
          if (oldStrict === void 0 && directive.value.value === "use strict") {
            oldStrict = this.state.strict;
            this.setStrict(true);
            if (octalPosition) {
              this.raise(octalPosition, "Octal literal in strict mode");
            }
          }
          continue;
        }
        parsedNonDirective = true;
        node.body.push(stmt);
      }
      if (oldStrict === false) {
        this.setStrict(false);
      }
    };
    pp$1.parseFor = function(node, init) {
      node.init = init;
      this.expect(types.semi);
      node.test = this.match(types.semi) ? null : this.parseExpression();
      this.expect(types.semi);
      node.update = this.match(types.parenR) ? null : this.parseExpression();
      this.expect(types.parenR);
      node.body = this.parseStatement(false);
      this.state.labels.pop();
      return this.finishNode(node, "ForStatement");
    };
    pp$1.parseForIn = function(node, init, forAwait) {
      var type = void 0;
      if (forAwait) {
        this.eatContextual("of");
        type = "ForAwaitStatement";
      } else {
        type = this.match(types._in) ? "ForInStatement" : "ForOfStatement";
        this.next();
      }
      node.left = init;
      node.right = this.parseExpression();
      this.expect(types.parenR);
      node.body = this.parseStatement(false);
      this.state.labels.pop();
      return this.finishNode(node, type);
    };
    pp$1.parseVar = function(node, isFor, kind) {
      node.declarations = [];
      node.kind = kind.keyword;
      for (; ; ) {
        var decl = this.startNode();
        this.parseVarHead(decl);
        if (this.eat(types.eq)) {
          decl.init = this.parseMaybeAssign(isFor);
        } else if (kind === types._const && !(this.match(types._in) || this.isContextual("of"))) {
          this.unexpected();
        } else if (decl.id.type !== "Identifier" && !(isFor && (this.match(types._in) || this.isContextual("of")))) {
          this.raise(this.state.lastTokEnd, "Complex binding patterns require an initialization value");
        } else {
          decl.init = null;
        }
        node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
        if (!this.eat(types.comma)) break;
      }
      return node;
    };
    pp$1.parseVarHead = function(decl) {
      decl.id = this.parseBindingAtom();
      this.checkLVal(decl.id, true, void 0, "variable declaration");
    };
    pp$1.parseFunction = function(node, isStatement, allowExpressionBody, isAsync, optionalId) {
      var oldInMethod = this.state.inMethod;
      this.state.inMethod = false;
      this.initFunction(node, isAsync);
      if (this.match(types.star)) {
        if (node.async && !this.hasPlugin("asyncGenerators")) {
          this.unexpected();
        } else {
          node.generator = true;
          this.next();
        }
      }
      if (isStatement && !optionalId && !this.match(types.name) && !this.match(types._yield)) {
        this.unexpected();
      }
      if (this.match(types.name) || this.match(types._yield)) {
        node.id = this.parseBindingIdentifier();
      }
      this.parseFunctionParams(node);
      this.parseFunctionBody(node, allowExpressionBody);
      this.state.inMethod = oldInMethod;
      return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
    };
    pp$1.parseFunctionParams = function(node) {
      this.expect(types.parenL);
      node.params = this.parseBindingList(types.parenR);
    };
    pp$1.parseClass = function(node, isStatement, optionalId) {
      this.next();
      this.takeDecorators(node);
      this.parseClassId(node, isStatement, optionalId);
      this.parseClassSuper(node);
      this.parseClassBody(node);
      return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
    };
    pp$1.isClassProperty = function() {
      return this.match(types.eq) || this.match(types.semi) || this.match(types.braceR);
    };
    pp$1.isClassMethod = function() {
      return this.match(types.parenL);
    };
    pp$1.isNonstaticConstructor = function(method) {
      return !method.computed && !method.static && (method.key.name === "constructor" || // Identifier
      method.key.value === "constructor");
    };
    pp$1.parseClassBody = function(node) {
      var oldStrict = this.state.strict;
      this.state.strict = true;
      var hadConstructorCall = false;
      var hadConstructor = false;
      var decorators = [];
      var classBody = this.startNode();
      classBody.body = [];
      this.expect(types.braceL);
      while (!this.eat(types.braceR)) {
        if (this.eat(types.semi)) {
          if (decorators.length > 0) {
            this.raise(this.state.lastTokEnd, "Decorators must not be followed by a semicolon");
          }
          continue;
        }
        if (this.match(types.at)) {
          decorators.push(this.parseDecorator());
          continue;
        }
        var method = this.startNode();
        if (decorators.length) {
          method.decorators = decorators;
          decorators = [];
        }
        method.static = false;
        if (this.match(types.name) && this.state.value === "static") {
          var key = this.parseIdentifier(true);
          if (this.isClassMethod()) {
            method.kind = "method";
            method.computed = false;
            method.key = key;
            this.parseClassMethod(classBody, method, false, false);
            continue;
          } else if (this.isClassProperty()) {
            method.computed = false;
            method.key = key;
            classBody.body.push(this.parseClassProperty(method));
            continue;
          }
          method.static = true;
        }
        if (this.eat(types.star)) {
          method.kind = "method";
          this.parsePropertyName(method);
          if (this.isNonstaticConstructor(method)) {
            this.raise(method.key.start, "Constructor can't be a generator");
          }
          if (!method.computed && method.static && (method.key.name === "prototype" || method.key.value === "prototype")) {
            this.raise(method.key.start, "Classes may not have static property named prototype");
          }
          this.parseClassMethod(classBody, method, true, false);
        } else {
          var isSimple = this.match(types.name);
          var _key = this.parsePropertyName(method);
          if (!method.computed && method.static && (method.key.name === "prototype" || method.key.value === "prototype")) {
            this.raise(method.key.start, "Classes may not have static property named prototype");
          }
          if (this.isClassMethod()) {
            if (this.isNonstaticConstructor(method)) {
              if (hadConstructor) {
                this.raise(_key.start, "Duplicate constructor in the same class");
              } else if (method.decorators) {
                this.raise(method.start, "You can't attach decorators to a class constructor");
              }
              hadConstructor = true;
              method.kind = "constructor";
            } else {
              method.kind = "method";
            }
            this.parseClassMethod(classBody, method, false, false);
          } else if (this.isClassProperty()) {
            if (this.isNonstaticConstructor(method)) {
              this.raise(method.key.start, "Classes may not have a non-static field named 'constructor'");
            }
            classBody.body.push(this.parseClassProperty(method));
          } else if (isSimple && _key.name === "async" && !this.isLineTerminator()) {
            var isGenerator = this.hasPlugin("asyncGenerators") && this.eat(types.star);
            method.kind = "method";
            this.parsePropertyName(method);
            if (this.isNonstaticConstructor(method)) {
              this.raise(method.key.start, "Constructor can't be an async function");
            }
            this.parseClassMethod(classBody, method, isGenerator, true);
          } else if (isSimple && (_key.name === "get" || _key.name === "set") && !(this.isLineTerminator() && this.match(types.star))) {
            method.kind = _key.name;
            this.parsePropertyName(method);
            if (this.isNonstaticConstructor(method)) {
              this.raise(method.key.start, "Constructor can't have get/set modifier");
            }
            this.parseClassMethod(classBody, method, false, false);
            this.checkGetterSetterParamCount(method);
          } else if (this.hasPlugin("classConstructorCall") && isSimple && _key.name === "call" && this.match(types.name) && this.state.value === "constructor") {
            if (hadConstructorCall) {
              this.raise(method.start, "Duplicate constructor call in the same class");
            } else if (method.decorators) {
              this.raise(method.start, "You can't attach decorators to a class constructor");
            }
            hadConstructorCall = true;
            method.kind = "constructorCall";
            this.parsePropertyName(method);
            this.parseClassMethod(classBody, method, false, false);
          } else if (this.isLineTerminator()) {
            if (this.isNonstaticConstructor(method)) {
              this.raise(method.key.start, "Classes may not have a non-static field named 'constructor'");
            }
            classBody.body.push(this.parseClassProperty(method));
          } else {
            this.unexpected();
          }
        }
      }
      if (decorators.length) {
        this.raise(this.state.start, "You have trailing decorators with no method");
      }
      node.body = this.finishNode(classBody, "ClassBody");
      this.state.strict = oldStrict;
    };
    pp$1.parseClassProperty = function(node) {
      this.state.inClassProperty = true;
      if (this.match(types.eq)) {
        if (!this.hasPlugin("classProperties")) this.unexpected();
        this.next();
        node.value = this.parseMaybeAssign();
      } else {
        node.value = null;
      }
      this.semicolon();
      this.state.inClassProperty = false;
      return this.finishNode(node, "ClassProperty");
    };
    pp$1.parseClassMethod = function(classBody, method, isGenerator, isAsync) {
      this.parseMethod(method, isGenerator, isAsync);
      classBody.body.push(this.finishNode(method, "ClassMethod"));
    };
    pp$1.parseClassId = function(node, isStatement, optionalId) {
      if (this.match(types.name)) {
        node.id = this.parseIdentifier();
      } else {
        if (optionalId || !isStatement) {
          node.id = null;
        } else {
          this.unexpected();
        }
      }
    };
    pp$1.parseClassSuper = function(node) {
      node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
    };
    pp$1.parseExport = function(node) {
      this.next();
      if (this.match(types.star)) {
        var specifier = this.startNode();
        this.next();
        if (this.hasPlugin("exportExtensions") && this.eatContextual("as")) {
          specifier.exported = this.parseIdentifier();
          node.specifiers = [this.finishNode(specifier, "ExportNamespaceSpecifier")];
          this.parseExportSpecifiersMaybe(node);
          this.parseExportFrom(node, true);
        } else {
          this.parseExportFrom(node, true);
          return this.finishNode(node, "ExportAllDeclaration");
        }
      } else if (this.hasPlugin("exportExtensions") && this.isExportDefaultSpecifier()) {
        var _specifier = this.startNode();
        _specifier.exported = this.parseIdentifier(true);
        node.specifiers = [this.finishNode(_specifier, "ExportDefaultSpecifier")];
        if (this.match(types.comma) && this.lookahead().type === types.star) {
          this.expect(types.comma);
          var _specifier2 = this.startNode();
          this.expect(types.star);
          this.expectContextual("as");
          _specifier2.exported = this.parseIdentifier();
          node.specifiers.push(this.finishNode(_specifier2, "ExportNamespaceSpecifier"));
        } else {
          this.parseExportSpecifiersMaybe(node);
        }
        this.parseExportFrom(node, true);
      } else if (this.eat(types._default)) {
        var expr = this.startNode();
        var needsSemi = false;
        if (this.eat(types._function)) {
          expr = this.parseFunction(expr, true, false, false, true);
        } else if (this.match(types._class)) {
          expr = this.parseClass(expr, true, true);
        } else {
          needsSemi = true;
          expr = this.parseMaybeAssign();
        }
        node.declaration = expr;
        if (needsSemi) this.semicolon();
        this.checkExport(node, true, true);
        return this.finishNode(node, "ExportDefaultDeclaration");
      } else if (this.shouldParseExportDeclaration()) {
        node.specifiers = [];
        node.source = null;
        node.declaration = this.parseExportDeclaration(node);
      } else {
        node.declaration = null;
        node.specifiers = this.parseExportSpecifiers();
        this.parseExportFrom(node);
      }
      this.checkExport(node, true);
      return this.finishNode(node, "ExportNamedDeclaration");
    };
    pp$1.parseExportDeclaration = function() {
      return this.parseStatement(true);
    };
    pp$1.isExportDefaultSpecifier = function() {
      if (this.match(types.name)) {
        return this.state.value !== "async";
      }
      if (!this.match(types._default)) {
        return false;
      }
      var lookahead = this.lookahead();
      return lookahead.type === types.comma || lookahead.type === types.name && lookahead.value === "from";
    };
    pp$1.parseExportSpecifiersMaybe = function(node) {
      if (this.eat(types.comma)) {
        node.specifiers = node.specifiers.concat(this.parseExportSpecifiers());
      }
    };
    pp$1.parseExportFrom = function(node, expect) {
      if (this.eatContextual("from")) {
        node.source = this.match(types.string) ? this.parseExprAtom() : this.unexpected();
        this.checkExport(node);
      } else {
        if (expect) {
          this.unexpected();
        } else {
          node.source = null;
        }
      }
      this.semicolon();
    };
    pp$1.shouldParseExportDeclaration = function() {
      return this.state.type.keyword === "var" || this.state.type.keyword === "const" || this.state.type.keyword === "let" || this.state.type.keyword === "function" || this.state.type.keyword === "class" || this.isContextual("async");
    };
    pp$1.checkExport = function(node, checkNames, isDefault) {
      if (checkNames) {
        if (isDefault) {
          this.checkDuplicateExports(node, "default");
        } else if (node.specifiers && node.specifiers.length) {
          for (var _iterator2 = node.specifiers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
            var _ref2;
            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }
            var specifier = _ref2;
            this.checkDuplicateExports(specifier, specifier.exported.name);
          }
        } else if (node.declaration) {
          if (node.declaration.type === "FunctionDeclaration" || node.declaration.type === "ClassDeclaration") {
            this.checkDuplicateExports(node, node.declaration.id.name);
          } else if (node.declaration.type === "VariableDeclaration") {
            for (var _iterator3 = node.declaration.declarations, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ; ) {
              var _ref3;
              if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
              } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
              }
              var declaration = _ref3;
              this.checkDeclaration(declaration.id);
            }
          }
        }
      }
      if (this.state.decorators.length) {
        var isClass = node.declaration && (node.declaration.type === "ClassDeclaration" || node.declaration.type === "ClassExpression");
        if (!node.declaration || !isClass) {
          this.raise(node.start, "You can only use decorators on an export when exporting a class");
        }
        this.takeDecorators(node.declaration);
      }
    };
    pp$1.checkDeclaration = function(node) {
      if (node.type === "ObjectPattern") {
        for (var _iterator4 = node.properties, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ; ) {
          var _ref4;
          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref4 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref4 = _i4.value;
          }
          var prop = _ref4;
          this.checkDeclaration(prop);
        }
      } else if (node.type === "ArrayPattern") {
        for (var _iterator5 = node.elements, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ; ) {
          var _ref5;
          if (_isArray5) {
            if (_i5 >= _iterator5.length) break;
            _ref5 = _iterator5[_i5++];
          } else {
            _i5 = _iterator5.next();
            if (_i5.done) break;
            _ref5 = _i5.value;
          }
          var elem = _ref5;
          if (elem) {
            this.checkDeclaration(elem);
          }
        }
      } else if (node.type === "ObjectProperty") {
        this.checkDeclaration(node.value);
      } else if (node.type === "RestElement" || node.type === "RestProperty") {
        this.checkDeclaration(node.argument);
      } else if (node.type === "Identifier") {
        this.checkDuplicateExports(node, node.name);
      }
    };
    pp$1.checkDuplicateExports = function(node, name) {
      if (this.state.exportedIdentifiers.indexOf(name) > -1) {
        this.raiseDuplicateExportError(node, name);
      }
      this.state.exportedIdentifiers.push(name);
    };
    pp$1.raiseDuplicateExportError = function(node, name) {
      this.raise(node.start, name === "default" ? "Only one default export allowed per module." : "`" + name + "` has already been exported. Exported identifiers must be unique.");
    };
    pp$1.parseExportSpecifiers = function() {
      var nodes = [];
      var first = true;
      var needsFrom = void 0;
      this.expect(types.braceL);
      while (!this.eat(types.braceR)) {
        if (first) {
          first = false;
        } else {
          this.expect(types.comma);
          if (this.eat(types.braceR)) break;
        }
        var isDefault = this.match(types._default);
        if (isDefault && !needsFrom) needsFrom = true;
        var node = this.startNode();
        node.local = this.parseIdentifier(isDefault);
        node.exported = this.eatContextual("as") ? this.parseIdentifier(true) : node.local.__clone();
        nodes.push(this.finishNode(node, "ExportSpecifier"));
      }
      if (needsFrom && !this.isContextual("from")) {
        this.unexpected();
      }
      return nodes;
    };
    pp$1.parseImport = function(node) {
      this.eat(types._import);
      if (this.match(types.string)) {
        node.specifiers = [];
        node.source = this.parseExprAtom();
      } else {
        node.specifiers = [];
        this.parseImportSpecifiers(node);
        this.expectContextual("from");
        node.source = this.match(types.string) ? this.parseExprAtom() : this.unexpected();
      }
      this.semicolon();
      return this.finishNode(node, "ImportDeclaration");
    };
    pp$1.parseImportSpecifiers = function(node) {
      var first = true;
      if (this.match(types.name)) {
        var startPos = this.state.start;
        var startLoc = this.state.startLoc;
        node.specifiers.push(this.parseImportSpecifierDefault(this.parseIdentifier(), startPos, startLoc));
        if (!this.eat(types.comma)) return;
      }
      if (this.match(types.star)) {
        var specifier = this.startNode();
        this.next();
        this.expectContextual("as");
        specifier.local = this.parseIdentifier();
        this.checkLVal(specifier.local, true, void 0, "import namespace specifier");
        node.specifiers.push(this.finishNode(specifier, "ImportNamespaceSpecifier"));
        return;
      }
      this.expect(types.braceL);
      while (!this.eat(types.braceR)) {
        if (first) {
          first = false;
        } else {
          if (this.eat(types.colon)) {
            this.unexpected(null, "ES2015 named imports do not destructure. Use another statement for destructuring after the import.");
          }
          this.expect(types.comma);
          if (this.eat(types.braceR)) break;
        }
        this.parseImportSpecifier(node);
      }
    };
    pp$1.parseImportSpecifier = function(node) {
      var specifier = this.startNode();
      specifier.imported = this.parseIdentifier(true);
      if (this.eatContextual("as")) {
        specifier.local = this.parseIdentifier();
      } else {
        this.checkReservedWord(specifier.imported.name, specifier.start, true, true);
        specifier.local = specifier.imported.__clone();
      }
      this.checkLVal(specifier.local, true, void 0, "import specifier");
      node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
    };
    pp$1.parseImportSpecifierDefault = function(id, startPos, startLoc) {
      var node = this.startNodeAt(startPos, startLoc);
      node.local = id;
      this.checkLVal(node.local, true, void 0, "default import specifier");
      return this.finishNode(node, "ImportDefaultSpecifier");
    };
    var pp$2 = Parser.prototype;
    pp$2.toAssignable = function(node, isBinding, contextDescription) {
      if (node) {
        switch (node.type) {
          case "Identifier":
          case "ObjectPattern":
          case "ArrayPattern":
          case "AssignmentPattern":
            break;
          case "ObjectExpression":
            node.type = "ObjectPattern";
            for (var _iterator = node.properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
              var _ref;
              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }
              var prop = _ref;
              if (prop.type === "ObjectMethod") {
                if (prop.kind === "get" || prop.kind === "set") {
                  this.raise(prop.key.start, "Object pattern can't contain getter or setter");
                } else {
                  this.raise(prop.key.start, "Object pattern can't contain methods");
                }
              } else {
                this.toAssignable(prop, isBinding, "object destructuring pattern");
              }
            }
            break;
          case "ObjectProperty":
            this.toAssignable(node.value, isBinding, contextDescription);
            break;
          case "SpreadProperty":
            node.type = "RestProperty";
            var arg = node.argument;
            this.toAssignable(arg, isBinding, contextDescription);
            break;
          case "ArrayExpression":
            node.type = "ArrayPattern";
            this.toAssignableList(node.elements, isBinding, contextDescription);
            break;
          case "AssignmentExpression":
            if (node.operator === "=") {
              node.type = "AssignmentPattern";
              delete node.operator;
            } else {
              this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
            }
            break;
          case "MemberExpression":
            if (!isBinding) break;
          default: {
            var message = "Invalid left-hand side" + (contextDescription ? " in " + contextDescription : (
              /* istanbul ignore next */
              "expression"
            ));
            this.raise(node.start, message);
          }
        }
      }
      return node;
    };
    pp$2.toAssignableList = function(exprList, isBinding, contextDescription) {
      var end = exprList.length;
      if (end) {
        var last2 = exprList[end - 1];
        if (last2 && last2.type === "RestElement") {
          --end;
        } else if (last2 && last2.type === "SpreadElement") {
          last2.type = "RestElement";
          var arg = last2.argument;
          this.toAssignable(arg, isBinding, contextDescription);
          if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern") {
            this.unexpected(arg.start);
          }
          --end;
        }
      }
      for (var i = 0; i < end; i++) {
        var elt = exprList[i];
        if (elt) this.toAssignable(elt, isBinding, contextDescription);
      }
      return exprList;
    };
    pp$2.toReferencedList = function(exprList) {
      return exprList;
    };
    pp$2.parseSpread = function(refShorthandDefaultPos) {
      var node = this.startNode();
      this.next();
      node.argument = this.parseMaybeAssign(false, refShorthandDefaultPos);
      return this.finishNode(node, "SpreadElement");
    };
    pp$2.parseRest = function() {
      var node = this.startNode();
      this.next();
      node.argument = this.parseBindingIdentifier();
      return this.finishNode(node, "RestElement");
    };
    pp$2.shouldAllowYieldIdentifier = function() {
      return this.match(types._yield) && !this.state.strict && !this.state.inGenerator;
    };
    pp$2.parseBindingIdentifier = function() {
      return this.parseIdentifier(this.shouldAllowYieldIdentifier());
    };
    pp$2.parseBindingAtom = function() {
      switch (this.state.type) {
        case types._yield:
          if (this.state.strict || this.state.inGenerator) this.unexpected();
        // fall-through
        case types.name:
          return this.parseIdentifier(true);
        case types.bracketL:
          var node = this.startNode();
          this.next();
          node.elements = this.parseBindingList(types.bracketR, true);
          return this.finishNode(node, "ArrayPattern");
        case types.braceL:
          return this.parseObj(true);
        default:
          this.unexpected();
      }
    };
    pp$2.parseBindingList = function(close, allowEmpty) {
      var elts = [];
      var first = true;
      while (!this.eat(close)) {
        if (first) {
          first = false;
        } else {
          this.expect(types.comma);
        }
        if (allowEmpty && this.match(types.comma)) {
          elts.push(null);
        } else if (this.eat(close)) {
          break;
        } else if (this.match(types.ellipsis)) {
          elts.push(this.parseAssignableListItemTypes(this.parseRest()));
          this.expect(close);
          break;
        } else {
          var decorators = [];
          while (this.match(types.at)) {
            decorators.push(this.parseDecorator());
          }
          var left = this.parseMaybeDefault();
          if (decorators.length) {
            left.decorators = decorators;
          }
          this.parseAssignableListItemTypes(left);
          elts.push(this.parseMaybeDefault(left.start, left.loc.start, left));
        }
      }
      return elts;
    };
    pp$2.parseAssignableListItemTypes = function(param) {
      return param;
    };
    pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
      startLoc = startLoc || this.state.startLoc;
      startPos = startPos || this.state.start;
      left = left || this.parseBindingAtom();
      if (!this.eat(types.eq)) return left;
      var node = this.startNodeAt(startPos, startLoc);
      node.left = left;
      node.right = this.parseMaybeAssign();
      return this.finishNode(node, "AssignmentPattern");
    };
    pp$2.checkLVal = function(expr, isBinding, checkClashes, contextDescription) {
      switch (expr.type) {
        case "Identifier":
          this.checkReservedWord(expr.name, expr.start, false, true);
          if (checkClashes) {
            var key = "_" + expr.name;
            if (checkClashes[key]) {
              this.raise(expr.start, "Argument name clash in strict mode");
            } else {
              checkClashes[key] = true;
            }
          }
          break;
        case "MemberExpression":
          if (isBinding) this.raise(expr.start, (isBinding ? "Binding" : "Assigning to") + " member expression");
          break;
        case "ObjectPattern":
          for (var _iterator2 = expr.properties, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
            var _ref2;
            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }
            var prop = _ref2;
            if (prop.type === "ObjectProperty") prop = prop.value;
            this.checkLVal(prop, isBinding, checkClashes, "object destructuring pattern");
          }
          break;
        case "ArrayPattern":
          for (var _iterator3 = expr.elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ; ) {
            var _ref3;
            if (_isArray3) {
              if (_i3 >= _iterator3.length) break;
              _ref3 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done) break;
              _ref3 = _i3.value;
            }
            var elem = _ref3;
            if (elem) this.checkLVal(elem, isBinding, checkClashes, "array destructuring pattern");
          }
          break;
        case "AssignmentPattern":
          this.checkLVal(expr.left, isBinding, checkClashes, "assignment pattern");
          break;
        case "RestProperty":
          this.checkLVal(expr.argument, isBinding, checkClashes, "rest property");
          break;
        case "RestElement":
          this.checkLVal(expr.argument, isBinding, checkClashes, "rest element");
          break;
        default: {
          var message = (isBinding ? (
            /* istanbul ignore next */
            "Binding invalid"
          ) : "Invalid") + " left-hand side" + (contextDescription ? " in " + contextDescription : (
            /* istanbul ignore next */
            "expression"
          ));
          this.raise(expr.start, message);
        }
      }
    };
    var pp$3 = Parser.prototype;
    pp$3.checkPropClash = function(prop, propHash) {
      if (prop.computed || prop.kind) return;
      var key = prop.key;
      var name = key.type === "Identifier" ? key.name : String(key.value);
      if (name === "__proto__") {
        if (propHash.proto) this.raise(key.start, "Redefinition of __proto__ property");
        propHash.proto = true;
      }
    };
    pp$3.getExpression = function() {
      this.nextToken();
      var expr = this.parseExpression();
      if (!this.match(types.eof)) {
        this.unexpected();
      }
      return expr;
    };
    pp$3.parseExpression = function(noIn, refShorthandDefaultPos) {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      var expr = this.parseMaybeAssign(noIn, refShorthandDefaultPos);
      if (this.match(types.comma)) {
        var node = this.startNodeAt(startPos, startLoc);
        node.expressions = [expr];
        while (this.eat(types.comma)) {
          node.expressions.push(this.parseMaybeAssign(noIn, refShorthandDefaultPos));
        }
        this.toReferencedList(node.expressions);
        return this.finishNode(node, "SequenceExpression");
      }
      return expr;
    };
    pp$3.parseMaybeAssign = function(noIn, refShorthandDefaultPos, afterLeftParse, refNeedsArrowPos) {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      if (this.match(types._yield) && this.state.inGenerator) {
        var _left = this.parseYield();
        if (afterLeftParse) _left = afterLeftParse.call(this, _left, startPos, startLoc);
        return _left;
      }
      var failOnShorthandAssign = void 0;
      if (refShorthandDefaultPos) {
        failOnShorthandAssign = false;
      } else {
        refShorthandDefaultPos = { start: 0 };
        failOnShorthandAssign = true;
      }
      if (this.match(types.parenL) || this.match(types.name)) {
        this.state.potentialArrowAt = this.state.start;
      }
      var left = this.parseMaybeConditional(noIn, refShorthandDefaultPos, refNeedsArrowPos);
      if (afterLeftParse) left = afterLeftParse.call(this, left, startPos, startLoc);
      if (this.state.type.isAssign) {
        var node = this.startNodeAt(startPos, startLoc);
        node.operator = this.state.value;
        node.left = this.match(types.eq) ? this.toAssignable(left, void 0, "assignment expression") : left;
        refShorthandDefaultPos.start = 0;
        this.checkLVal(left, void 0, void 0, "assignment expression");
        if (left.extra && left.extra.parenthesized) {
          var errorMsg = void 0;
          if (left.type === "ObjectPattern") {
            errorMsg = "`({a}) = 0` use `({a} = 0)`";
          } else if (left.type === "ArrayPattern") {
            errorMsg = "`([a]) = 0` use `([a] = 0)`";
          }
          if (errorMsg) {
            this.raise(left.start, "You're trying to assign to a parenthesized expression, eg. instead of " + errorMsg);
          }
        }
        this.next();
        node.right = this.parseMaybeAssign(noIn);
        return this.finishNode(node, "AssignmentExpression");
      } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
        this.unexpected(refShorthandDefaultPos.start);
      }
      return left;
    };
    pp$3.parseMaybeConditional = function(noIn, refShorthandDefaultPos, refNeedsArrowPos) {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      var expr = this.parseExprOps(noIn, refShorthandDefaultPos);
      if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
      return this.parseConditional(expr, noIn, startPos, startLoc, refNeedsArrowPos);
    };
    pp$3.parseConditional = function(expr, noIn, startPos, startLoc) {
      if (this.eat(types.question)) {
        var node = this.startNodeAt(startPos, startLoc);
        node.test = expr;
        node.consequent = this.parseMaybeAssign();
        this.expect(types.colon);
        node.alternate = this.parseMaybeAssign(noIn);
        return this.finishNode(node, "ConditionalExpression");
      }
      return expr;
    };
    pp$3.parseExprOps = function(noIn, refShorthandDefaultPos) {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      var expr = this.parseMaybeUnary(refShorthandDefaultPos);
      if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
        return expr;
      } else {
        return this.parseExprOp(expr, startPos, startLoc, -1, noIn);
      }
    };
    pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
      var prec = this.state.type.binop;
      if (prec != null && (!noIn || !this.match(types._in))) {
        if (prec > minPrec) {
          var node = this.startNodeAt(leftStartPos, leftStartLoc);
          node.left = left;
          node.operator = this.state.value;
          if (node.operator === "**" && left.type === "UnaryExpression" && left.extra && !left.extra.parenthesizedArgument && !left.extra.parenthesized) {
            this.raise(left.argument.start, "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.");
          }
          var op = this.state.type;
          this.next();
          var startPos = this.state.start;
          var startLoc = this.state.startLoc;
          node.right = this.parseExprOp(this.parseMaybeUnary(), startPos, startLoc, op.rightAssociative ? prec - 1 : prec, noIn);
          this.finishNode(node, op === types.logicalOR || op === types.logicalAND ? "LogicalExpression" : "BinaryExpression");
          return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
        }
      }
      return left;
    };
    pp$3.parseMaybeUnary = function(refShorthandDefaultPos) {
      if (this.state.type.prefix) {
        var node = this.startNode();
        var update = this.match(types.incDec);
        node.operator = this.state.value;
        node.prefix = true;
        this.next();
        var argType = this.state.type;
        node.argument = this.parseMaybeUnary();
        this.addExtra(node, "parenthesizedArgument", argType === types.parenL && (!node.argument.extra || !node.argument.extra.parenthesized));
        if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
          this.unexpected(refShorthandDefaultPos.start);
        }
        if (update) {
          this.checkLVal(node.argument, void 0, void 0, "prefix operation");
        } else if (this.state.strict && node.operator === "delete" && node.argument.type === "Identifier") {
          this.raise(node.start, "Deleting local variable in strict mode");
        }
        return this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
      }
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      var expr = this.parseExprSubscripts(refShorthandDefaultPos);
      if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
      while (this.state.type.postfix && !this.canInsertSemicolon()) {
        var _node = this.startNodeAt(startPos, startLoc);
        _node.operator = this.state.value;
        _node.prefix = false;
        _node.argument = expr;
        this.checkLVal(expr, void 0, void 0, "postfix operation");
        this.next();
        expr = this.finishNode(_node, "UpdateExpression");
      }
      return expr;
    };
    pp$3.parseExprSubscripts = function(refShorthandDefaultPos) {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      var potentialArrowAt = this.state.potentialArrowAt;
      var expr = this.parseExprAtom(refShorthandDefaultPos);
      if (expr.type === "ArrowFunctionExpression" && expr.start === potentialArrowAt) {
        return expr;
      }
      if (refShorthandDefaultPos && refShorthandDefaultPos.start) {
        return expr;
      }
      return this.parseSubscripts(expr, startPos, startLoc);
    };
    pp$3.parseSubscripts = function(base, startPos, startLoc, noCalls) {
      for (; ; ) {
        if (!noCalls && this.eat(types.doubleColon)) {
          var node = this.startNodeAt(startPos, startLoc);
          node.object = base;
          node.callee = this.parseNoCallExpr();
          return this.parseSubscripts(this.finishNode(node, "BindExpression"), startPos, startLoc, noCalls);
        } else if (this.eat(types.dot)) {
          var _node2 = this.startNodeAt(startPos, startLoc);
          _node2.object = base;
          _node2.property = this.parseIdentifier(true);
          _node2.computed = false;
          base = this.finishNode(_node2, "MemberExpression");
        } else if (this.eat(types.bracketL)) {
          var _node3 = this.startNodeAt(startPos, startLoc);
          _node3.object = base;
          _node3.property = this.parseExpression();
          _node3.computed = true;
          this.expect(types.bracketR);
          base = this.finishNode(_node3, "MemberExpression");
        } else if (!noCalls && this.match(types.parenL)) {
          var possibleAsync = this.state.potentialArrowAt === base.start && base.type === "Identifier" && base.name === "async" && !this.canInsertSemicolon();
          this.next();
          var _node4 = this.startNodeAt(startPos, startLoc);
          _node4.callee = base;
          _node4.arguments = this.parseCallExpressionArguments(types.parenR, possibleAsync);
          if (_node4.callee.type === "Import" && _node4.arguments.length !== 1) {
            this.raise(_node4.start, "import() requires exactly one argument");
          }
          base = this.finishNode(_node4, "CallExpression");
          if (possibleAsync && this.shouldParseAsyncArrow()) {
            return this.parseAsyncArrowFromCallExpression(this.startNodeAt(startPos, startLoc), _node4);
          } else {
            this.toReferencedList(_node4.arguments);
          }
        } else if (this.match(types.backQuote)) {
          var _node5 = this.startNodeAt(startPos, startLoc);
          _node5.tag = base;
          _node5.quasi = this.parseTemplate(true);
          base = this.finishNode(_node5, "TaggedTemplateExpression");
        } else {
          return base;
        }
      }
    };
    pp$3.parseCallExpressionArguments = function(close, possibleAsyncArrow) {
      var elts = [];
      var innerParenStart = void 0;
      var first = true;
      while (!this.eat(close)) {
        if (first) {
          first = false;
        } else {
          this.expect(types.comma);
          if (this.eat(close)) break;
        }
        if (this.match(types.parenL) && !innerParenStart) {
          innerParenStart = this.state.start;
        }
        elts.push(this.parseExprListItem(false, possibleAsyncArrow ? { start: 0 } : void 0, possibleAsyncArrow ? { start: 0 } : void 0));
      }
      if (possibleAsyncArrow && innerParenStart && this.shouldParseAsyncArrow()) {
        this.unexpected();
      }
      return elts;
    };
    pp$3.shouldParseAsyncArrow = function() {
      return this.match(types.arrow);
    };
    pp$3.parseAsyncArrowFromCallExpression = function(node, call) {
      this.expect(types.arrow);
      return this.parseArrowExpression(node, call.arguments, true);
    };
    pp$3.parseNoCallExpr = function() {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      return this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
    };
    pp$3.parseExprAtom = function(refShorthandDefaultPos) {
      var canBeArrow = this.state.potentialArrowAt === this.state.start;
      var node = void 0;
      switch (this.state.type) {
        case types._super:
          if (!this.state.inMethod && !this.state.inClassProperty && !this.options.allowSuperOutsideMethod) {
            this.raise(this.state.start, "'super' outside of function or class");
          }
          node = this.startNode();
          this.next();
          if (!this.match(types.parenL) && !this.match(types.bracketL) && !this.match(types.dot)) {
            this.unexpected();
          }
          if (this.match(types.parenL) && this.state.inMethod !== "constructor" && !this.options.allowSuperOutsideMethod) {
            this.raise(node.start, "super() outside of class constructor");
          }
          return this.finishNode(node, "Super");
        case types._import:
          if (!this.hasPlugin("dynamicImport")) this.unexpected();
          node = this.startNode();
          this.next();
          if (!this.match(types.parenL)) {
            this.unexpected(null, types.parenL);
          }
          return this.finishNode(node, "Import");
        case types._this:
          node = this.startNode();
          this.next();
          return this.finishNode(node, "ThisExpression");
        case types._yield:
          if (this.state.inGenerator) this.unexpected();
        case types.name:
          node = this.startNode();
          var allowAwait = this.state.value === "await" && this.state.inAsync;
          var allowYield = this.shouldAllowYieldIdentifier();
          var id = this.parseIdentifier(allowAwait || allowYield);
          if (id.name === "await") {
            if (this.state.inAsync || this.inModule) {
              return this.parseAwait(node);
            }
          } else if (id.name === "async" && this.match(types._function) && !this.canInsertSemicolon()) {
            this.next();
            return this.parseFunction(node, false, false, true);
          } else if (canBeArrow && id.name === "async" && this.match(types.name)) {
            var params = [this.parseIdentifier()];
            this.expect(types.arrow);
            return this.parseArrowExpression(node, params, true);
          }
          if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
            return this.parseArrowExpression(node, [id]);
          }
          return id;
        case types._do:
          if (this.hasPlugin("doExpressions")) {
            var _node6 = this.startNode();
            this.next();
            var oldInFunction = this.state.inFunction;
            var oldLabels = this.state.labels;
            this.state.labels = [];
            this.state.inFunction = false;
            _node6.body = this.parseBlock(false, true);
            this.state.inFunction = oldInFunction;
            this.state.labels = oldLabels;
            return this.finishNode(_node6, "DoExpression");
          }
        case types.regexp:
          var value = this.state.value;
          node = this.parseLiteral(value.value, "RegExpLiteral");
          node.pattern = value.pattern;
          node.flags = value.flags;
          return node;
        case types.num:
          return this.parseLiteral(this.state.value, "NumericLiteral");
        case types.string:
          return this.parseLiteral(this.state.value, "StringLiteral");
        case types._null:
          node = this.startNode();
          this.next();
          return this.finishNode(node, "NullLiteral");
        case types._true:
        case types._false:
          node = this.startNode();
          node.value = this.match(types._true);
          this.next();
          return this.finishNode(node, "BooleanLiteral");
        case types.parenL:
          return this.parseParenAndDistinguishExpression(null, null, canBeArrow);
        case types.bracketL:
          node = this.startNode();
          this.next();
          node.elements = this.parseExprList(types.bracketR, true, refShorthandDefaultPos);
          this.toReferencedList(node.elements);
          return this.finishNode(node, "ArrayExpression");
        case types.braceL:
          return this.parseObj(false, refShorthandDefaultPos);
        case types._function:
          return this.parseFunctionExpression();
        case types.at:
          this.parseDecorators();
        case types._class:
          node = this.startNode();
          this.takeDecorators(node);
          return this.parseClass(node, false);
        case types._new:
          return this.parseNew();
        case types.backQuote:
          return this.parseTemplate(false);
        case types.doubleColon:
          node = this.startNode();
          this.next();
          node.object = null;
          var callee = node.callee = this.parseNoCallExpr();
          if (callee.type === "MemberExpression") {
            return this.finishNode(node, "BindExpression");
          } else {
            this.raise(callee.start, "Binding should be performed on object property.");
          }
        default:
          this.unexpected();
      }
    };
    pp$3.parseFunctionExpression = function() {
      var node = this.startNode();
      var meta = this.parseIdentifier(true);
      if (this.state.inGenerator && this.eat(types.dot) && this.hasPlugin("functionSent")) {
        return this.parseMetaProperty(node, meta, "sent");
      } else {
        return this.parseFunction(node, false);
      }
    };
    pp$3.parseMetaProperty = function(node, meta, propertyName) {
      node.meta = meta;
      node.property = this.parseIdentifier(true);
      if (node.property.name !== propertyName) {
        this.raise(node.property.start, "The only valid meta property for new is " + meta.name + "." + propertyName);
      }
      return this.finishNode(node, "MetaProperty");
    };
    pp$3.parseLiteral = function(value, type, startPos, startLoc) {
      startPos = startPos || this.state.start;
      startLoc = startLoc || this.state.startLoc;
      var node = this.startNodeAt(startPos, startLoc);
      this.addExtra(node, "rawValue", value);
      this.addExtra(node, "raw", this.input.slice(startPos, this.state.end));
      node.value = value;
      this.next();
      return this.finishNode(node, type);
    };
    pp$3.parseParenExpression = function() {
      this.expect(types.parenL);
      var val = this.parseExpression();
      this.expect(types.parenR);
      return val;
    };
    pp$3.parseParenAndDistinguishExpression = function(startPos, startLoc, canBeArrow) {
      startPos = startPos || this.state.start;
      startLoc = startLoc || this.state.startLoc;
      var val = void 0;
      this.expect(types.parenL);
      var innerStartPos = this.state.start;
      var innerStartLoc = this.state.startLoc;
      var exprList = [];
      var refShorthandDefaultPos = { start: 0 };
      var refNeedsArrowPos = { start: 0 };
      var first = true;
      var spreadStart = void 0;
      var optionalCommaStart = void 0;
      while (!this.match(types.parenR)) {
        if (first) {
          first = false;
        } else {
          this.expect(types.comma, refNeedsArrowPos.start || null);
          if (this.match(types.parenR)) {
            optionalCommaStart = this.state.start;
            break;
          }
        }
        if (this.match(types.ellipsis)) {
          var spreadNodeStartPos = this.state.start;
          var spreadNodeStartLoc = this.state.startLoc;
          spreadStart = this.state.start;
          exprList.push(this.parseParenItem(this.parseRest(), spreadNodeStartPos, spreadNodeStartLoc));
          break;
        } else {
          exprList.push(this.parseMaybeAssign(false, refShorthandDefaultPos, this.parseParenItem, refNeedsArrowPos));
        }
      }
      var innerEndPos = this.state.start;
      var innerEndLoc = this.state.startLoc;
      this.expect(types.parenR);
      var arrowNode = this.startNodeAt(startPos, startLoc);
      if (canBeArrow && this.shouldParseArrow() && (arrowNode = this.parseArrow(arrowNode))) {
        for (var _iterator = exprList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
          var _ref;
          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }
          var param = _ref;
          if (param.extra && param.extra.parenthesized) this.unexpected(param.extra.parenStart);
        }
        return this.parseArrowExpression(arrowNode, exprList);
      }
      if (!exprList.length) {
        this.unexpected(this.state.lastTokStart);
      }
      if (optionalCommaStart) this.unexpected(optionalCommaStart);
      if (spreadStart) this.unexpected(spreadStart);
      if (refShorthandDefaultPos.start) this.unexpected(refShorthandDefaultPos.start);
      if (refNeedsArrowPos.start) this.unexpected(refNeedsArrowPos.start);
      if (exprList.length > 1) {
        val = this.startNodeAt(innerStartPos, innerStartLoc);
        val.expressions = exprList;
        this.toReferencedList(val.expressions);
        this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
      } else {
        val = exprList[0];
      }
      this.addExtra(val, "parenthesized", true);
      this.addExtra(val, "parenStart", startPos);
      return val;
    };
    pp$3.shouldParseArrow = function() {
      return !this.canInsertSemicolon();
    };
    pp$3.parseArrow = function(node) {
      if (this.eat(types.arrow)) {
        return node;
      }
    };
    pp$3.parseParenItem = function(node) {
      return node;
    };
    pp$3.parseNew = function() {
      var node = this.startNode();
      var meta = this.parseIdentifier(true);
      if (this.eat(types.dot)) {
        var metaProp = this.parseMetaProperty(node, meta, "target");
        if (!this.state.inFunction) {
          this.raise(metaProp.property.start, "new.target can only be used in functions");
        }
        return metaProp;
      }
      node.callee = this.parseNoCallExpr();
      if (this.eat(types.parenL)) {
        node.arguments = this.parseExprList(types.parenR);
        this.toReferencedList(node.arguments);
      } else {
        node.arguments = [];
      }
      return this.finishNode(node, "NewExpression");
    };
    pp$3.parseTemplateElement = function(isTagged) {
      var elem = this.startNode();
      if (this.state.value === null) {
        if (!isTagged || !this.hasPlugin("templateInvalidEscapes")) {
          this.raise(this.state.invalidTemplateEscapePosition, "Invalid escape sequence in template");
        } else {
          this.state.invalidTemplateEscapePosition = null;
        }
      }
      elem.value = {
        raw: this.input.slice(this.state.start, this.state.end).replace(/\r\n?/g, "\n"),
        cooked: this.state.value
      };
      this.next();
      elem.tail = this.match(types.backQuote);
      return this.finishNode(elem, "TemplateElement");
    };
    pp$3.parseTemplate = function(isTagged) {
      var node = this.startNode();
      this.next();
      node.expressions = [];
      var curElt = this.parseTemplateElement(isTagged);
      node.quasis = [curElt];
      while (!curElt.tail) {
        this.expect(types.dollarBraceL);
        node.expressions.push(this.parseExpression());
        this.expect(types.braceR);
        node.quasis.push(curElt = this.parseTemplateElement(isTagged));
      }
      this.next();
      return this.finishNode(node, "TemplateLiteral");
    };
    pp$3.parseObj = function(isPattern, refShorthandDefaultPos) {
      var decorators = [];
      var propHash = /* @__PURE__ */ Object.create(null);
      var first = true;
      var node = this.startNode();
      node.properties = [];
      this.next();
      var firstRestLocation = null;
      while (!this.eat(types.braceR)) {
        if (first) {
          first = false;
        } else {
          this.expect(types.comma);
          if (this.eat(types.braceR)) break;
        }
        while (this.match(types.at)) {
          decorators.push(this.parseDecorator());
        }
        var prop = this.startNode(), isGenerator = false, isAsync = false, startPos = void 0, startLoc = void 0;
        if (decorators.length) {
          prop.decorators = decorators;
          decorators = [];
        }
        if (this.hasPlugin("objectRestSpread") && this.match(types.ellipsis)) {
          prop = this.parseSpread(isPattern ? { start: 0 } : void 0);
          prop.type = isPattern ? "RestProperty" : "SpreadProperty";
          if (isPattern) this.toAssignable(prop.argument, true, "object pattern");
          node.properties.push(prop);
          if (isPattern) {
            var position = this.state.start;
            if (firstRestLocation !== null) {
              this.unexpected(firstRestLocation, "Cannot have multiple rest elements when destructuring");
            } else if (this.eat(types.braceR)) {
              break;
            } else if (this.match(types.comma) && this.lookahead().type === types.braceR) {
              continue;
            } else {
              firstRestLocation = position;
              continue;
            }
          } else {
            continue;
          }
        }
        prop.method = false;
        prop.shorthand = false;
        if (isPattern || refShorthandDefaultPos) {
          startPos = this.state.start;
          startLoc = this.state.startLoc;
        }
        if (!isPattern) {
          isGenerator = this.eat(types.star);
        }
        if (!isPattern && this.isContextual("async")) {
          if (isGenerator) this.unexpected();
          var asyncId = this.parseIdentifier();
          if (this.match(types.colon) || this.match(types.parenL) || this.match(types.braceR) || this.match(types.eq) || this.match(types.comma)) {
            prop.key = asyncId;
            prop.computed = false;
          } else {
            isAsync = true;
            if (this.hasPlugin("asyncGenerators")) isGenerator = this.eat(types.star);
            this.parsePropertyName(prop);
          }
        } else {
          this.parsePropertyName(prop);
        }
        this.parseObjPropValue(prop, startPos, startLoc, isGenerator, isAsync, isPattern, refShorthandDefaultPos);
        this.checkPropClash(prop, propHash);
        if (prop.shorthand) {
          this.addExtra(prop, "shorthand", true);
        }
        node.properties.push(prop);
      }
      if (firstRestLocation !== null) {
        this.unexpected(firstRestLocation, "The rest element has to be the last element when destructuring");
      }
      if (decorators.length) {
        this.raise(this.state.start, "You have trailing decorators with no property");
      }
      return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
    };
    pp$3.isGetterOrSetterMethod = function(prop, isPattern) {
      return !isPattern && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.match(types.string) || // get "string"() {}
      this.match(types.num) || // get 1() {}
      this.match(types.bracketL) || // get ["string"]() {}
      this.match(types.name) || // get foo() {}
      this.state.type.keyword);
    };
    pp$3.checkGetterSetterParamCount = function(method) {
      var paramCount = method.kind === "get" ? 0 : 1;
      if (method.params.length !== paramCount) {
        var start = method.start;
        if (method.kind === "get") {
          this.raise(start, "getter should have no params");
        } else {
          this.raise(start, "setter should have exactly one param");
        }
      }
    };
    pp$3.parseObjectMethod = function(prop, isGenerator, isAsync, isPattern) {
      if (isAsync || isGenerator || this.match(types.parenL)) {
        if (isPattern) this.unexpected();
        prop.kind = "method";
        prop.method = true;
        this.parseMethod(prop, isGenerator, isAsync);
        return this.finishNode(prop, "ObjectMethod");
      }
      if (this.isGetterOrSetterMethod(prop, isPattern)) {
        if (isGenerator || isAsync) this.unexpected();
        prop.kind = prop.key.name;
        this.parsePropertyName(prop);
        this.parseMethod(prop);
        this.checkGetterSetterParamCount(prop);
        return this.finishNode(prop, "ObjectMethod");
      }
    };
    pp$3.parseObjectProperty = function(prop, startPos, startLoc, isPattern, refShorthandDefaultPos) {
      if (this.eat(types.colon)) {
        prop.value = isPattern ? this.parseMaybeDefault(this.state.start, this.state.startLoc) : this.parseMaybeAssign(false, refShorthandDefaultPos);
        return this.finishNode(prop, "ObjectProperty");
      }
      if (!prop.computed && prop.key.type === "Identifier") {
        this.checkReservedWord(prop.key.name, prop.key.start, true, true);
        if (isPattern) {
          prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone());
        } else if (this.match(types.eq) && refShorthandDefaultPos) {
          if (!refShorthandDefaultPos.start) {
            refShorthandDefaultPos.start = this.state.start;
          }
          prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key.__clone());
        } else {
          prop.value = prop.key.__clone();
        }
        prop.shorthand = true;
        return this.finishNode(prop, "ObjectProperty");
      }
    };
    pp$3.parseObjPropValue = function(prop, startPos, startLoc, isGenerator, isAsync, isPattern, refShorthandDefaultPos) {
      var node = this.parseObjectMethod(prop, isGenerator, isAsync, isPattern) || this.parseObjectProperty(prop, startPos, startLoc, isPattern, refShorthandDefaultPos);
      if (!node) this.unexpected();
      return node;
    };
    pp$3.parsePropertyName = function(prop) {
      if (this.eat(types.bracketL)) {
        prop.computed = true;
        prop.key = this.parseMaybeAssign();
        this.expect(types.bracketR);
      } else {
        prop.computed = false;
        var oldInPropertyName = this.state.inPropertyName;
        this.state.inPropertyName = true;
        prop.key = this.match(types.num) || this.match(types.string) ? this.parseExprAtom() : this.parseIdentifier(true);
        this.state.inPropertyName = oldInPropertyName;
      }
      return prop.key;
    };
    pp$3.initFunction = function(node, isAsync) {
      node.id = null;
      node.generator = false;
      node.expression = false;
      node.async = !!isAsync;
    };
    pp$3.parseMethod = function(node, isGenerator, isAsync) {
      var oldInMethod = this.state.inMethod;
      this.state.inMethod = node.kind || true;
      this.initFunction(node, isAsync);
      this.expect(types.parenL);
      node.params = this.parseBindingList(types.parenR);
      node.generator = !!isGenerator;
      this.parseFunctionBody(node);
      this.state.inMethod = oldInMethod;
      return node;
    };
    pp$3.parseArrowExpression = function(node, params, isAsync) {
      this.initFunction(node, isAsync);
      node.params = this.toAssignableList(params, true, "arrow function parameters");
      this.parseFunctionBody(node, true);
      return this.finishNode(node, "ArrowFunctionExpression");
    };
    pp$3.isStrictBody = function(node, isExpression) {
      if (!isExpression && node.body.directives.length) {
        for (var _iterator2 = node.body.directives, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
          var _ref2;
          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }
          var directive = _ref2;
          if (directive.value.value === "use strict") {
            return true;
          }
        }
      }
      return false;
    };
    pp$3.parseFunctionBody = function(node, allowExpression) {
      var isExpression = allowExpression && !this.match(types.braceL);
      var oldInAsync = this.state.inAsync;
      this.state.inAsync = node.async;
      if (isExpression) {
        node.body = this.parseMaybeAssign();
        node.expression = true;
      } else {
        var oldInFunc = this.state.inFunction;
        var oldInGen = this.state.inGenerator;
        var oldLabels = this.state.labels;
        this.state.inFunction = true;
        this.state.inGenerator = node.generator;
        this.state.labels = [];
        node.body = this.parseBlock(true);
        node.expression = false;
        this.state.inFunction = oldInFunc;
        this.state.inGenerator = oldInGen;
        this.state.labels = oldLabels;
      }
      this.state.inAsync = oldInAsync;
      var isStrict = this.isStrictBody(node, isExpression);
      var checkLVal = this.state.strict || allowExpression || isStrict;
      if (isStrict && node.id && node.id.type === "Identifier" && node.id.name === "yield") {
        this.raise(node.id.start, "Binding yield in strict mode");
      }
      if (checkLVal) {
        var nameHash = /* @__PURE__ */ Object.create(null);
        var oldStrict = this.state.strict;
        if (isStrict) this.state.strict = true;
        if (node.id) {
          this.checkLVal(node.id, true, void 0, "function name");
        }
        for (var _iterator3 = node.params, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ; ) {
          var _ref3;
          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }
          var param = _ref3;
          if (isStrict && param.type !== "Identifier") {
            this.raise(param.start, "Non-simple parameter in strict mode");
          }
          this.checkLVal(param, true, nameHash, "function parameter list");
        }
        this.state.strict = oldStrict;
      }
    };
    pp$3.parseExprList = function(close, allowEmpty, refShorthandDefaultPos) {
      var elts = [];
      var first = true;
      while (!this.eat(close)) {
        if (first) {
          first = false;
        } else {
          this.expect(types.comma);
          if (this.eat(close)) break;
        }
        elts.push(this.parseExprListItem(allowEmpty, refShorthandDefaultPos));
      }
      return elts;
    };
    pp$3.parseExprListItem = function(allowEmpty, refShorthandDefaultPos, refNeedsArrowPos) {
      var elt = void 0;
      if (allowEmpty && this.match(types.comma)) {
        elt = null;
      } else if (this.match(types.ellipsis)) {
        elt = this.parseSpread(refShorthandDefaultPos);
      } else {
        elt = this.parseMaybeAssign(false, refShorthandDefaultPos, this.parseParenItem, refNeedsArrowPos);
      }
      return elt;
    };
    pp$3.parseIdentifier = function(liberal) {
      var node = this.startNode();
      if (!liberal) {
        this.checkReservedWord(this.state.value, this.state.start, !!this.state.type.keyword, false);
      }
      if (this.match(types.name)) {
        node.name = this.state.value;
      } else if (this.state.type.keyword) {
        node.name = this.state.type.keyword;
      } else {
        this.unexpected();
      }
      if (!liberal && node.name === "await" && this.state.inAsync) {
        this.raise(node.start, "invalid use of await inside of an async function");
      }
      node.loc.identifierName = node.name;
      this.next();
      return this.finishNode(node, "Identifier");
    };
    pp$3.checkReservedWord = function(word, startLoc, checkKeywords, isBinding) {
      if (this.isReservedWord(word) || checkKeywords && this.isKeyword(word)) {
        this.raise(startLoc, word + " is a reserved word");
      }
      if (this.state.strict && (reservedWords.strict(word) || isBinding && reservedWords.strictBind(word))) {
        this.raise(startLoc, word + " is a reserved word in strict mode");
      }
    };
    pp$3.parseAwait = function(node) {
      if (!this.state.inAsync) {
        this.unexpected();
      }
      if (this.match(types.star)) {
        this.raise(node.start, "await* has been removed from the async functions proposal. Use Promise.all() instead.");
      }
      node.argument = this.parseMaybeUnary();
      return this.finishNode(node, "AwaitExpression");
    };
    pp$3.parseYield = function() {
      var node = this.startNode();
      this.next();
      if (this.match(types.semi) || this.canInsertSemicolon() || !this.match(types.star) && !this.state.type.startsExpr) {
        node.delegate = false;
        node.argument = null;
      } else {
        node.delegate = this.eat(types.star);
        node.argument = this.parseMaybeAssign();
      }
      return this.finishNode(node, "YieldExpression");
    };
    var pp$4 = Parser.prototype;
    var commentKeys = ["leadingComments", "trailingComments", "innerComments"];
    var Node = (function() {
      function Node2(pos, loc, filename) {
        classCallCheck(this, Node2);
        this.type = "";
        this.start = pos;
        this.end = 0;
        this.loc = new SourceLocation(loc);
        if (filename) this.loc.filename = filename;
      }
      Node2.prototype.__clone = function __clone() {
        var node2 = new Node2();
        for (var key in this) {
          if (commentKeys.indexOf(key) < 0) {
            node2[key] = this[key];
          }
        }
        return node2;
      };
      return Node2;
    })();
    pp$4.startNode = function() {
      return new Node(this.state.start, this.state.startLoc, this.filename);
    };
    pp$4.startNodeAt = function(pos, loc) {
      return new Node(pos, loc, this.filename);
    };
    function finishNodeAt(node, type, pos, loc) {
      node.type = type;
      node.end = pos;
      node.loc.end = loc;
      this.processComment(node);
      return node;
    }
    pp$4.finishNode = function(node, type) {
      return finishNodeAt.call(this, node, type, this.state.lastTokEnd, this.state.lastTokEndLoc);
    };
    pp$4.finishNodeAt = function(node, type, pos, loc) {
      return finishNodeAt.call(this, node, type, pos, loc);
    };
    var pp$5 = Parser.prototype;
    pp$5.raise = function(pos, message) {
      var loc = getLineInfo(this.input, pos);
      message += " (" + loc.line + ":" + loc.column + ")";
      var err = new SyntaxError(message);
      err.pos = pos;
      err.loc = loc;
      throw err;
    };
    function last(stack) {
      return stack[stack.length - 1];
    }
    var pp$6 = Parser.prototype;
    pp$6.addComment = function(comment) {
      if (this.filename) comment.loc.filename = this.filename;
      this.state.trailingComments.push(comment);
      this.state.leadingComments.push(comment);
    };
    pp$6.processComment = function(node) {
      if (node.type === "Program" && node.body.length > 0) return;
      var stack = this.state.commentStack;
      var firstChild = void 0, lastChild = void 0, trailingComments = void 0, i = void 0, j = void 0;
      if (this.state.trailingComments.length > 0) {
        if (this.state.trailingComments[0].start >= node.end) {
          trailingComments = this.state.trailingComments;
          this.state.trailingComments = [];
        } else {
          this.state.trailingComments.length = 0;
        }
      } else {
        var lastInStack = last(stack);
        if (stack.length > 0 && lastInStack.trailingComments && lastInStack.trailingComments[0].start >= node.end) {
          trailingComments = lastInStack.trailingComments;
          lastInStack.trailingComments = null;
        }
      }
      if (stack.length > 0 && last(stack).start >= node.start) {
        firstChild = stack.pop();
      }
      while (stack.length > 0 && last(stack).start >= node.start) {
        lastChild = stack.pop();
      }
      if (!lastChild && firstChild) lastChild = firstChild;
      if (firstChild && this.state.leadingComments.length > 0) {
        var lastComment = last(this.state.leadingComments);
        if (firstChild.type === "ObjectProperty") {
          if (lastComment.start >= node.start) {
            if (this.state.commentPreviousNode) {
              for (j = 0; j < this.state.leadingComments.length; j++) {
                if (this.state.leadingComments[j].end < this.state.commentPreviousNode.end) {
                  this.state.leadingComments.splice(j, 1);
                  j--;
                }
              }
              if (this.state.leadingComments.length > 0) {
                firstChild.trailingComments = this.state.leadingComments;
                this.state.leadingComments = [];
              }
            }
          }
        } else if (node.type === "CallExpression" && node.arguments && node.arguments.length) {
          var lastArg = last(node.arguments);
          if (lastArg && lastComment.start >= lastArg.start && lastComment.end <= node.end) {
            if (this.state.commentPreviousNode) {
              if (this.state.leadingComments.length > 0) {
                lastArg.trailingComments = this.state.leadingComments;
                this.state.leadingComments = [];
              }
            }
          }
        }
      }
      if (lastChild) {
        if (lastChild.leadingComments) {
          if (lastChild !== node && last(lastChild.leadingComments).end <= node.start) {
            node.leadingComments = lastChild.leadingComments;
            lastChild.leadingComments = null;
          } else {
            for (i = lastChild.leadingComments.length - 2; i >= 0; --i) {
              if (lastChild.leadingComments[i].end <= node.start) {
                node.leadingComments = lastChild.leadingComments.splice(0, i + 1);
                break;
              }
            }
          }
        }
      } else if (this.state.leadingComments.length > 0) {
        if (last(this.state.leadingComments).end <= node.start) {
          if (this.state.commentPreviousNode) {
            for (j = 0; j < this.state.leadingComments.length; j++) {
              if (this.state.leadingComments[j].end < this.state.commentPreviousNode.end) {
                this.state.leadingComments.splice(j, 1);
                j--;
              }
            }
          }
          if (this.state.leadingComments.length > 0) {
            node.leadingComments = this.state.leadingComments;
            this.state.leadingComments = [];
          }
        } else {
          for (i = 0; i < this.state.leadingComments.length; i++) {
            if (this.state.leadingComments[i].end > node.start) {
              break;
            }
          }
          node.leadingComments = this.state.leadingComments.slice(0, i);
          if (node.leadingComments.length === 0) {
            node.leadingComments = null;
          }
          trailingComments = this.state.leadingComments.slice(i);
          if (trailingComments.length === 0) {
            trailingComments = null;
          }
        }
      }
      this.state.commentPreviousNode = node;
      if (trailingComments) {
        if (trailingComments.length && trailingComments[0].start >= node.start && last(trailingComments).end <= node.end) {
          node.innerComments = trailingComments;
        } else {
          node.trailingComments = trailingComments;
        }
      }
      stack.push(node);
    };
    var pp$7 = Parser.prototype;
    pp$7.estreeParseRegExpLiteral = function(_ref) {
      var pattern = _ref.pattern, flags = _ref.flags;
      var regex = null;
      try {
        regex = new RegExp(pattern, flags);
      } catch (e) {
      }
      var node = this.estreeParseLiteral(regex);
      node.regex = { pattern, flags };
      return node;
    };
    pp$7.estreeParseLiteral = function(value) {
      return this.parseLiteral(value, "Literal");
    };
    pp$7.directiveToStmt = function(directive) {
      var directiveLiteral = directive.value;
      var stmt = this.startNodeAt(directive.start, directive.loc.start);
      var expression = this.startNodeAt(directiveLiteral.start, directiveLiteral.loc.start);
      expression.value = directiveLiteral.value;
      expression.raw = directiveLiteral.extra.raw;
      stmt.expression = this.finishNodeAt(expression, "Literal", directiveLiteral.end, directiveLiteral.loc.end);
      stmt.directive = directiveLiteral.extra.raw.slice(1, -1);
      return this.finishNodeAt(stmt, "ExpressionStatement", directive.end, directive.loc.end);
    };
    function isSimpleProperty(node) {
      return node && node.type === "Property" && node.kind === "init" && node.method === false;
    }
    var estreePlugin = function(instance) {
      instance.extend("checkDeclaration", function(inner) {
        return function(node) {
          if (isSimpleProperty(node)) {
            this.checkDeclaration(node.value);
          } else {
            inner.call(this, node);
          }
        };
      });
      instance.extend("checkGetterSetterParamCount", function() {
        return function(prop) {
          var paramCount = prop.kind === "get" ? 0 : 1;
          if (prop.value.params.length !== paramCount) {
            var start = prop.start;
            if (prop.kind === "get") {
              this.raise(start, "getter should have no params");
            } else {
              this.raise(start, "setter should have exactly one param");
            }
          }
        };
      });
      instance.extend("checkLVal", function(inner) {
        return function(expr, isBinding, checkClashes) {
          var _this = this;
          switch (expr.type) {
            case "ObjectPattern":
              expr.properties.forEach(function(prop) {
                _this.checkLVal(prop.type === "Property" ? prop.value : prop, isBinding, checkClashes, "object destructuring pattern");
              });
              break;
            default:
              for (var _len = arguments.length, args2 = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                args2[_key - 3] = arguments[_key];
              }
              inner.call.apply(inner, [this, expr, isBinding, checkClashes].concat(args2));
          }
        };
      });
      instance.extend("checkPropClash", function() {
        return function(prop, propHash) {
          if (prop.computed || !isSimpleProperty(prop)) return;
          var key = prop.key;
          var name = key.type === "Identifier" ? key.name : String(key.value);
          if (name === "__proto__") {
            if (propHash.proto) this.raise(key.start, "Redefinition of __proto__ property");
            propHash.proto = true;
          }
        };
      });
      instance.extend("isStrictBody", function() {
        return function(node, isExpression) {
          if (!isExpression && node.body.body.length > 0) {
            for (var _iterator = node.body.body, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
              var _ref2;
              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref2 = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref2 = _i.value;
              }
              var directive = _ref2;
              if (directive.type === "ExpressionStatement" && directive.expression.type === "Literal") {
                if (directive.expression.value === "use strict") return true;
              } else {
                break;
              }
            }
          }
          return false;
        };
      });
      instance.extend("isValidDirective", function() {
        return function(stmt) {
          return stmt.type === "ExpressionStatement" && stmt.expression.type === "Literal" && typeof stmt.expression.value === "string" && (!stmt.expression.extra || !stmt.expression.extra.parenthesized);
        };
      });
      instance.extend("stmtToDirective", function(inner) {
        return function(stmt) {
          var directive = inner.call(this, stmt);
          var value = stmt.expression.value;
          directive.value.value = value;
          return directive;
        };
      });
      instance.extend("parseBlockBody", function(inner) {
        return function(node) {
          var _this2 = this;
          for (var _len2 = arguments.length, args2 = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args2[_key2 - 1] = arguments[_key2];
          }
          inner.call.apply(inner, [this, node].concat(args2));
          node.directives.reverse().forEach(function(directive) {
            node.body.unshift(_this2.directiveToStmt(directive));
          });
          delete node.directives;
        };
      });
      instance.extend("parseClassMethod", function() {
        return function(classBody, method, isGenerator, isAsync) {
          this.parseMethod(method, isGenerator, isAsync);
          if (method.typeParameters) {
            method.value.typeParameters = method.typeParameters;
            delete method.typeParameters;
          }
          classBody.body.push(this.finishNode(method, "MethodDefinition"));
        };
      });
      instance.extend("parseExprAtom", function(inner) {
        return function() {
          switch (this.state.type) {
            case types.regexp:
              return this.estreeParseRegExpLiteral(this.state.value);
            case types.num:
            case types.string:
              return this.estreeParseLiteral(this.state.value);
            case types._null:
              return this.estreeParseLiteral(null);
            case types._true:
              return this.estreeParseLiteral(true);
            case types._false:
              return this.estreeParseLiteral(false);
            default:
              for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args2[_key3] = arguments[_key3];
              }
              return inner.call.apply(inner, [this].concat(args2));
          }
        };
      });
      instance.extend("parseLiteral", function(inner) {
        return function() {
          for (var _len4 = arguments.length, args2 = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args2[_key4] = arguments[_key4];
          }
          var node = inner.call.apply(inner, [this].concat(args2));
          node.raw = node.extra.raw;
          delete node.extra;
          return node;
        };
      });
      instance.extend("parseMethod", function(inner) {
        return function(node) {
          var funcNode = this.startNode();
          funcNode.kind = node.kind;
          for (var _len5 = arguments.length, args2 = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            args2[_key5 - 1] = arguments[_key5];
          }
          funcNode = inner.call.apply(inner, [this, funcNode].concat(args2));
          delete funcNode.kind;
          node.value = this.finishNode(funcNode, "FunctionExpression");
          return node;
        };
      });
      instance.extend("parseObjectMethod", function(inner) {
        return function() {
          for (var _len6 = arguments.length, args2 = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args2[_key6] = arguments[_key6];
          }
          var node = inner.call.apply(inner, [this].concat(args2));
          if (node) {
            if (node.kind === "method") node.kind = "init";
            node.type = "Property";
          }
          return node;
        };
      });
      instance.extend("parseObjectProperty", function(inner) {
        return function() {
          for (var _len7 = arguments.length, args2 = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args2[_key7] = arguments[_key7];
          }
          var node = inner.call.apply(inner, [this].concat(args2));
          if (node) {
            node.kind = "init";
            node.type = "Property";
          }
          return node;
        };
      });
      instance.extend("toAssignable", function(inner) {
        return function(node, isBinding) {
          for (var _len8 = arguments.length, args2 = Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
            args2[_key8 - 2] = arguments[_key8];
          }
          if (isSimpleProperty(node)) {
            this.toAssignable.apply(this, [node.value, isBinding].concat(args2));
            return node;
          } else if (node.type === "ObjectExpression") {
            node.type = "ObjectPattern";
            for (var _iterator2 = node.properties, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
              var _ref3;
              if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref3 = _iterator2[_i2++];
              } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref3 = _i2.value;
              }
              var prop = _ref3;
              if (prop.kind === "get" || prop.kind === "set") {
                this.raise(prop.key.start, "Object pattern can't contain getter or setter");
              } else if (prop.method) {
                this.raise(prop.key.start, "Object pattern can't contain methods");
              } else {
                this.toAssignable(prop, isBinding, "object destructuring pattern");
              }
            }
            return node;
          }
          return inner.call.apply(inner, [this, node, isBinding].concat(args2));
        };
      });
    };
    var primitiveTypes = ["any", "mixed", "empty", "bool", "boolean", "number", "string", "void", "null"];
    var pp$8 = Parser.prototype;
    pp$8.flowParseTypeInitialiser = function(tok) {
      var oldInType = this.state.inType;
      this.state.inType = true;
      this.expect(tok || types.colon);
      var type = this.flowParseType();
      this.state.inType = oldInType;
      return type;
    };
    pp$8.flowParsePredicate = function() {
      var node = this.startNode();
      var moduloLoc = this.state.startLoc;
      var moduloPos = this.state.start;
      this.expect(types.modulo);
      var checksLoc = this.state.startLoc;
      this.expectContextual("checks");
      if (moduloLoc.line !== checksLoc.line || moduloLoc.column !== checksLoc.column - 1) {
        this.raise(moduloPos, "Spaces between \xB4%\xB4 and \xB4checks\xB4 are not allowed here.");
      }
      if (this.eat(types.parenL)) {
        node.expression = this.parseExpression();
        this.expect(types.parenR);
        return this.finishNode(node, "DeclaredPredicate");
      } else {
        return this.finishNode(node, "InferredPredicate");
      }
    };
    pp$8.flowParseTypeAndPredicateInitialiser = function() {
      var oldInType = this.state.inType;
      this.state.inType = true;
      this.expect(types.colon);
      var type = null;
      var predicate = null;
      if (this.match(types.modulo)) {
        this.state.inType = oldInType;
        predicate = this.flowParsePredicate();
      } else {
        type = this.flowParseType();
        this.state.inType = oldInType;
        if (this.match(types.modulo)) {
          predicate = this.flowParsePredicate();
        }
      }
      return [type, predicate];
    };
    pp$8.flowParseDeclareClass = function(node) {
      this.next();
      this.flowParseInterfaceish(node, true);
      return this.finishNode(node, "DeclareClass");
    };
    pp$8.flowParseDeclareFunction = function(node) {
      this.next();
      var id = node.id = this.parseIdentifier();
      var typeNode = this.startNode();
      var typeContainer = this.startNode();
      if (this.isRelational("<")) {
        typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        typeNode.typeParameters = null;
      }
      this.expect(types.parenL);
      var tmp = this.flowParseFunctionTypeParams();
      typeNode.params = tmp.params;
      typeNode.rest = tmp.rest;
      this.expect(types.parenR);
      var predicate = null;
      var _flowParseTypeAndPred = this.flowParseTypeAndPredicateInitialiser();
      typeNode.returnType = _flowParseTypeAndPred[0];
      predicate = _flowParseTypeAndPred[1];
      typeContainer.typeAnnotation = this.finishNode(typeNode, "FunctionTypeAnnotation");
      typeContainer.predicate = predicate;
      id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation");
      this.finishNode(id, id.type);
      this.semicolon();
      return this.finishNode(node, "DeclareFunction");
    };
    pp$8.flowParseDeclare = function(node) {
      if (this.match(types._class)) {
        return this.flowParseDeclareClass(node);
      } else if (this.match(types._function)) {
        return this.flowParseDeclareFunction(node);
      } else if (this.match(types._var)) {
        return this.flowParseDeclareVariable(node);
      } else if (this.isContextual("module")) {
        if (this.lookahead().type === types.dot) {
          return this.flowParseDeclareModuleExports(node);
        } else {
          return this.flowParseDeclareModule(node);
        }
      } else if (this.isContextual("type")) {
        return this.flowParseDeclareTypeAlias(node);
      } else if (this.isContextual("opaque")) {
        return this.flowParseDeclareOpaqueType(node);
      } else if (this.isContextual("interface")) {
        return this.flowParseDeclareInterface(node);
      } else if (this.match(types._export)) {
        return this.flowParseDeclareExportDeclaration(node);
      } else {
        this.unexpected();
      }
    };
    pp$8.flowParseDeclareExportDeclaration = function(node) {
      this.expect(types._export);
      if (this.isContextual("opaque")) {
        node.declaration = this.flowParseDeclare(this.startNode());
        node.default = false;
        return this.finishNode(node, "DeclareExportDeclaration");
      }
      throw this.unexpected();
    };
    pp$8.flowParseDeclareVariable = function(node) {
      this.next();
      node.id = this.flowParseTypeAnnotatableIdentifier();
      this.semicolon();
      return this.finishNode(node, "DeclareVariable");
    };
    pp$8.flowParseDeclareModule = function(node) {
      this.next();
      if (this.match(types.string)) {
        node.id = this.parseExprAtom();
      } else {
        node.id = this.parseIdentifier();
      }
      var bodyNode = node.body = this.startNode();
      var body = bodyNode.body = [];
      this.expect(types.braceL);
      while (!this.match(types.braceR)) {
        var _bodyNode = this.startNode();
        if (this.match(types._import)) {
          var lookahead = this.lookahead();
          if (lookahead.value !== "type" && lookahead.value !== "typeof") {
            this.unexpected(null, "Imports within a `declare module` body must always be `import type` or `import typeof`");
          }
          this.parseImport(_bodyNode);
        } else {
          this.expectContextual("declare", "Only declares and type imports are allowed inside declare module");
          _bodyNode = this.flowParseDeclare(_bodyNode, true);
        }
        body.push(_bodyNode);
      }
      this.expect(types.braceR);
      this.finishNode(bodyNode, "BlockStatement");
      return this.finishNode(node, "DeclareModule");
    };
    pp$8.flowParseDeclareModuleExports = function(node) {
      this.expectContextual("module");
      this.expect(types.dot);
      this.expectContextual("exports");
      node.typeAnnotation = this.flowParseTypeAnnotation();
      this.semicolon();
      return this.finishNode(node, "DeclareModuleExports");
    };
    pp$8.flowParseDeclareTypeAlias = function(node) {
      this.next();
      this.flowParseTypeAlias(node);
      return this.finishNode(node, "DeclareTypeAlias");
    };
    pp$8.flowParseDeclareOpaqueType = function(node) {
      this.next();
      this.flowParseOpaqueType(node, true);
      return this.finishNode(node, "DeclareOpaqueType");
    };
    pp$8.flowParseDeclareInterface = function(node) {
      this.next();
      this.flowParseInterfaceish(node);
      return this.finishNode(node, "DeclareInterface");
    };
    pp$8.flowParseInterfaceish = function(node) {
      node.id = this.parseIdentifier();
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        node.typeParameters = null;
      }
      node.extends = [];
      node.mixins = [];
      if (this.eat(types._extends)) {
        do {
          node.extends.push(this.flowParseInterfaceExtends());
        } while (this.eat(types.comma));
      }
      if (this.isContextual("mixins")) {
        this.next();
        do {
          node.mixins.push(this.flowParseInterfaceExtends());
        } while (this.eat(types.comma));
      }
      node.body = this.flowParseObjectType(true, false, false);
    };
    pp$8.flowParseInterfaceExtends = function() {
      var node = this.startNode();
      node.id = this.flowParseQualifiedTypeIdentifier();
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterInstantiation();
      } else {
        node.typeParameters = null;
      }
      return this.finishNode(node, "InterfaceExtends");
    };
    pp$8.flowParseInterface = function(node) {
      this.flowParseInterfaceish(node, false);
      return this.finishNode(node, "InterfaceDeclaration");
    };
    pp$8.flowParseRestrictedIdentifier = function(liberal) {
      if (primitiveTypes.indexOf(this.state.value) > -1) {
        this.raise(this.state.start, "Cannot overwrite primitive type " + this.state.value);
      }
      return this.parseIdentifier(liberal);
    };
    pp$8.flowParseTypeAlias = function(node) {
      node.id = this.flowParseRestrictedIdentifier();
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        node.typeParameters = null;
      }
      node.right = this.flowParseTypeInitialiser(types.eq);
      this.semicolon();
      return this.finishNode(node, "TypeAlias");
    };
    pp$8.flowParseOpaqueType = function(node, declare) {
      this.expectContextual("type");
      node.id = this.flowParseRestrictedIdentifier();
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        node.typeParameters = null;
      }
      node.supertype = null;
      if (this.match(types.colon)) {
        node.supertype = this.flowParseTypeInitialiser(types.colon);
      }
      node.impltype = null;
      if (!declare) {
        node.impltype = this.flowParseTypeInitialiser(types.eq);
      }
      this.semicolon();
      return this.finishNode(node, "OpaqueType");
    };
    pp$8.flowParseTypeParameter = function() {
      var node = this.startNode();
      var variance = this.flowParseVariance();
      var ident = this.flowParseTypeAnnotatableIdentifier();
      node.name = ident.name;
      node.variance = variance;
      node.bound = ident.typeAnnotation;
      if (this.match(types.eq)) {
        this.eat(types.eq);
        node.default = this.flowParseType();
      }
      return this.finishNode(node, "TypeParameter");
    };
    pp$8.flowParseTypeParameterDeclaration = function() {
      var oldInType = this.state.inType;
      var node = this.startNode();
      node.params = [];
      this.state.inType = true;
      if (this.isRelational("<") || this.match(types.jsxTagStart)) {
        this.next();
      } else {
        this.unexpected();
      }
      do {
        node.params.push(this.flowParseTypeParameter());
        if (!this.isRelational(">")) {
          this.expect(types.comma);
        }
      } while (!this.isRelational(">"));
      this.expectRelational(">");
      this.state.inType = oldInType;
      return this.finishNode(node, "TypeParameterDeclaration");
    };
    pp$8.flowParseTypeParameterInstantiation = function() {
      var node = this.startNode();
      var oldInType = this.state.inType;
      node.params = [];
      this.state.inType = true;
      this.expectRelational("<");
      while (!this.isRelational(">")) {
        node.params.push(this.flowParseType());
        if (!this.isRelational(">")) {
          this.expect(types.comma);
        }
      }
      this.expectRelational(">");
      this.state.inType = oldInType;
      return this.finishNode(node, "TypeParameterInstantiation");
    };
    pp$8.flowParseObjectPropertyKey = function() {
      return this.match(types.num) || this.match(types.string) ? this.parseExprAtom() : this.parseIdentifier(true);
    };
    pp$8.flowParseObjectTypeIndexer = function(node, isStatic, variance) {
      node.static = isStatic;
      this.expect(types.bracketL);
      if (this.lookahead().type === types.colon) {
        node.id = this.flowParseObjectPropertyKey();
        node.key = this.flowParseTypeInitialiser();
      } else {
        node.id = null;
        node.key = this.flowParseType();
      }
      this.expect(types.bracketR);
      node.value = this.flowParseTypeInitialiser();
      node.variance = variance;
      this.flowObjectTypeSemicolon();
      return this.finishNode(node, "ObjectTypeIndexer");
    };
    pp$8.flowParseObjectTypeMethodish = function(node) {
      node.params = [];
      node.rest = null;
      node.typeParameters = null;
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
      this.expect(types.parenL);
      while (!this.match(types.parenR) && !this.match(types.ellipsis)) {
        node.params.push(this.flowParseFunctionTypeParam());
        if (!this.match(types.parenR)) {
          this.expect(types.comma);
        }
      }
      if (this.eat(types.ellipsis)) {
        node.rest = this.flowParseFunctionTypeParam();
      }
      this.expect(types.parenR);
      node.returnType = this.flowParseTypeInitialiser();
      return this.finishNode(node, "FunctionTypeAnnotation");
    };
    pp$8.flowParseObjectTypeMethod = function(startPos, startLoc, isStatic, key) {
      var node = this.startNodeAt(startPos, startLoc);
      node.value = this.flowParseObjectTypeMethodish(this.startNodeAt(startPos, startLoc));
      node.static = isStatic;
      node.key = key;
      node.optional = false;
      this.flowObjectTypeSemicolon();
      return this.finishNode(node, "ObjectTypeProperty");
    };
    pp$8.flowParseObjectTypeCallProperty = function(node, isStatic) {
      var valueNode = this.startNode();
      node.static = isStatic;
      node.value = this.flowParseObjectTypeMethodish(valueNode);
      this.flowObjectTypeSemicolon();
      return this.finishNode(node, "ObjectTypeCallProperty");
    };
    pp$8.flowParseObjectType = function(allowStatic, allowExact, allowSpread) {
      var oldInType = this.state.inType;
      this.state.inType = true;
      var nodeStart = this.startNode();
      var node = void 0;
      var propertyKey = void 0;
      var isStatic = false;
      nodeStart.callProperties = [];
      nodeStart.properties = [];
      nodeStart.indexers = [];
      var endDelim = void 0;
      var exact = void 0;
      if (allowExact && this.match(types.braceBarL)) {
        this.expect(types.braceBarL);
        endDelim = types.braceBarR;
        exact = true;
      } else {
        this.expect(types.braceL);
        endDelim = types.braceR;
        exact = false;
      }
      nodeStart.exact = exact;
      while (!this.match(endDelim)) {
        var optional = false;
        var startPos = this.state.start;
        var startLoc = this.state.startLoc;
        node = this.startNode();
        if (allowStatic && this.isContextual("static") && this.lookahead().type !== types.colon) {
          this.next();
          isStatic = true;
        }
        var variancePos = this.state.start;
        var variance = this.flowParseVariance();
        if (this.match(types.bracketL)) {
          nodeStart.indexers.push(this.flowParseObjectTypeIndexer(node, isStatic, variance));
        } else if (this.match(types.parenL) || this.isRelational("<")) {
          if (variance) {
            this.unexpected(variancePos);
          }
          nodeStart.callProperties.push(this.flowParseObjectTypeCallProperty(node, isStatic));
        } else {
          if (this.match(types.ellipsis)) {
            if (!allowSpread) {
              this.unexpected(null, "Spread operator cannot appear in class or interface definitions");
            }
            if (variance) {
              this.unexpected(variance.start, "Spread properties cannot have variance");
            }
            this.expect(types.ellipsis);
            node.argument = this.flowParseType();
            this.flowObjectTypeSemicolon();
            nodeStart.properties.push(this.finishNode(node, "ObjectTypeSpreadProperty"));
          } else {
            propertyKey = this.flowParseObjectPropertyKey();
            if (this.isRelational("<") || this.match(types.parenL)) {
              if (variance) {
                this.unexpected(variance.start);
              }
              nodeStart.properties.push(this.flowParseObjectTypeMethod(startPos, startLoc, isStatic, propertyKey));
            } else {
              if (this.eat(types.question)) {
                optional = true;
              }
              node.key = propertyKey;
              node.value = this.flowParseTypeInitialiser();
              node.optional = optional;
              node.static = isStatic;
              node.variance = variance;
              this.flowObjectTypeSemicolon();
              nodeStart.properties.push(this.finishNode(node, "ObjectTypeProperty"));
            }
          }
        }
        isStatic = false;
      }
      this.expect(endDelim);
      var out = this.finishNode(nodeStart, "ObjectTypeAnnotation");
      this.state.inType = oldInType;
      return out;
    };
    pp$8.flowObjectTypeSemicolon = function() {
      if (!this.eat(types.semi) && !this.eat(types.comma) && !this.match(types.braceR) && !this.match(types.braceBarR)) {
        this.unexpected();
      }
    };
    pp$8.flowParseQualifiedTypeIdentifier = function(startPos, startLoc, id) {
      startPos = startPos || this.state.start;
      startLoc = startLoc || this.state.startLoc;
      var node = id || this.parseIdentifier();
      while (this.eat(types.dot)) {
        var node2 = this.startNodeAt(startPos, startLoc);
        node2.qualification = node;
        node2.id = this.parseIdentifier();
        node = this.finishNode(node2, "QualifiedTypeIdentifier");
      }
      return node;
    };
    pp$8.flowParseGenericType = function(startPos, startLoc, id) {
      var node = this.startNodeAt(startPos, startLoc);
      node.typeParameters = null;
      node.id = this.flowParseQualifiedTypeIdentifier(startPos, startLoc, id);
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterInstantiation();
      }
      return this.finishNode(node, "GenericTypeAnnotation");
    };
    pp$8.flowParseTypeofType = function() {
      var node = this.startNode();
      this.expect(types._typeof);
      node.argument = this.flowParsePrimaryType();
      return this.finishNode(node, "TypeofTypeAnnotation");
    };
    pp$8.flowParseTupleType = function() {
      var node = this.startNode();
      node.types = [];
      this.expect(types.bracketL);
      while (this.state.pos < this.input.length && !this.match(types.bracketR)) {
        node.types.push(this.flowParseType());
        if (this.match(types.bracketR)) break;
        this.expect(types.comma);
      }
      this.expect(types.bracketR);
      return this.finishNode(node, "TupleTypeAnnotation");
    };
    pp$8.flowParseFunctionTypeParam = function() {
      var name = null;
      var optional = false;
      var typeAnnotation = null;
      var node = this.startNode();
      var lh = this.lookahead();
      if (lh.type === types.colon || lh.type === types.question) {
        name = this.parseIdentifier();
        if (this.eat(types.question)) {
          optional = true;
        }
        typeAnnotation = this.flowParseTypeInitialiser();
      } else {
        typeAnnotation = this.flowParseType();
      }
      node.name = name;
      node.optional = optional;
      node.typeAnnotation = typeAnnotation;
      return this.finishNode(node, "FunctionTypeParam");
    };
    pp$8.reinterpretTypeAsFunctionTypeParam = function(type) {
      var node = this.startNodeAt(type.start, type.loc.start);
      node.name = null;
      node.optional = false;
      node.typeAnnotation = type;
      return this.finishNode(node, "FunctionTypeParam");
    };
    pp$8.flowParseFunctionTypeParams = function() {
      var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var ret = { params, rest: null };
      while (!this.match(types.parenR) && !this.match(types.ellipsis)) {
        ret.params.push(this.flowParseFunctionTypeParam());
        if (!this.match(types.parenR)) {
          this.expect(types.comma);
        }
      }
      if (this.eat(types.ellipsis)) {
        ret.rest = this.flowParseFunctionTypeParam();
      }
      return ret;
    };
    pp$8.flowIdentToTypeAnnotation = function(startPos, startLoc, node, id) {
      switch (id.name) {
        case "any":
          return this.finishNode(node, "AnyTypeAnnotation");
        case "void":
          return this.finishNode(node, "VoidTypeAnnotation");
        case "bool":
        case "boolean":
          return this.finishNode(node, "BooleanTypeAnnotation");
        case "mixed":
          return this.finishNode(node, "MixedTypeAnnotation");
        case "empty":
          return this.finishNode(node, "EmptyTypeAnnotation");
        case "number":
          return this.finishNode(node, "NumberTypeAnnotation");
        case "string":
          return this.finishNode(node, "StringTypeAnnotation");
        default:
          return this.flowParseGenericType(startPos, startLoc, id);
      }
    };
    pp$8.flowParsePrimaryType = function() {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      var node = this.startNode();
      var tmp = void 0;
      var type = void 0;
      var isGroupedType = false;
      var oldNoAnonFunctionType = this.state.noAnonFunctionType;
      switch (this.state.type) {
        case types.name:
          return this.flowIdentToTypeAnnotation(startPos, startLoc, node, this.parseIdentifier());
        case types.braceL:
          return this.flowParseObjectType(false, false, true);
        case types.braceBarL:
          return this.flowParseObjectType(false, true, true);
        case types.bracketL:
          return this.flowParseTupleType();
        case types.relational:
          if (this.state.value === "<") {
            node.typeParameters = this.flowParseTypeParameterDeclaration();
            this.expect(types.parenL);
            tmp = this.flowParseFunctionTypeParams();
            node.params = tmp.params;
            node.rest = tmp.rest;
            this.expect(types.parenR);
            this.expect(types.arrow);
            node.returnType = this.flowParseType();
            return this.finishNode(node, "FunctionTypeAnnotation");
          }
          break;
        case types.parenL:
          this.next();
          if (!this.match(types.parenR) && !this.match(types.ellipsis)) {
            if (this.match(types.name)) {
              var token = this.lookahead().type;
              isGroupedType = token !== types.question && token !== types.colon;
            } else {
              isGroupedType = true;
            }
          }
          if (isGroupedType) {
            this.state.noAnonFunctionType = false;
            type = this.flowParseType();
            this.state.noAnonFunctionType = oldNoAnonFunctionType;
            if (this.state.noAnonFunctionType || !(this.match(types.comma) || this.match(types.parenR) && this.lookahead().type === types.arrow)) {
              this.expect(types.parenR);
              return type;
            } else {
              this.eat(types.comma);
            }
          }
          if (type) {
            tmp = this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(type)]);
          } else {
            tmp = this.flowParseFunctionTypeParams();
          }
          node.params = tmp.params;
          node.rest = tmp.rest;
          this.expect(types.parenR);
          this.expect(types.arrow);
          node.returnType = this.flowParseType();
          node.typeParameters = null;
          return this.finishNode(node, "FunctionTypeAnnotation");
        case types.string:
          return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");
        case types._true:
        case types._false:
          node.value = this.match(types._true);
          this.next();
          return this.finishNode(node, "BooleanLiteralTypeAnnotation");
        case types.plusMin:
          if (this.state.value === "-") {
            this.next();
            if (!this.match(types.num)) this.unexpected(null, "Unexpected token, expected number");
            return this.parseLiteral(-this.state.value, "NumericLiteralTypeAnnotation", node.start, node.loc.start);
          }
          this.unexpected();
        case types.num:
          return this.parseLiteral(this.state.value, "NumericLiteralTypeAnnotation");
        case types._null:
          node.value = this.match(types._null);
          this.next();
          return this.finishNode(node, "NullLiteralTypeAnnotation");
        case types._this:
          node.value = this.match(types._this);
          this.next();
          return this.finishNode(node, "ThisTypeAnnotation");
        case types.star:
          this.next();
          return this.finishNode(node, "ExistentialTypeParam");
        default:
          if (this.state.type.keyword === "typeof") {
            return this.flowParseTypeofType();
          }
      }
      this.unexpected();
    };
    pp$8.flowParsePostfixType = function() {
      var startPos = this.state.start, startLoc = this.state.startLoc;
      var type = this.flowParsePrimaryType();
      while (!this.canInsertSemicolon() && this.match(types.bracketL)) {
        var node = this.startNodeAt(startPos, startLoc);
        node.elementType = type;
        this.expect(types.bracketL);
        this.expect(types.bracketR);
        type = this.finishNode(node, "ArrayTypeAnnotation");
      }
      return type;
    };
    pp$8.flowParsePrefixType = function() {
      var node = this.startNode();
      if (this.eat(types.question)) {
        node.typeAnnotation = this.flowParsePrefixType();
        return this.finishNode(node, "NullableTypeAnnotation");
      } else {
        return this.flowParsePostfixType();
      }
    };
    pp$8.flowParseAnonFunctionWithoutParens = function() {
      var param = this.flowParsePrefixType();
      if (!this.state.noAnonFunctionType && this.eat(types.arrow)) {
        var node = this.startNodeAt(param.start, param.loc.start);
        node.params = [this.reinterpretTypeAsFunctionTypeParam(param)];
        node.rest = null;
        node.returnType = this.flowParseType();
        node.typeParameters = null;
        return this.finishNode(node, "FunctionTypeAnnotation");
      }
      return param;
    };
    pp$8.flowParseIntersectionType = function() {
      var node = this.startNode();
      this.eat(types.bitwiseAND);
      var type = this.flowParseAnonFunctionWithoutParens();
      node.types = [type];
      while (this.eat(types.bitwiseAND)) {
        node.types.push(this.flowParseAnonFunctionWithoutParens());
      }
      return node.types.length === 1 ? type : this.finishNode(node, "IntersectionTypeAnnotation");
    };
    pp$8.flowParseUnionType = function() {
      var node = this.startNode();
      this.eat(types.bitwiseOR);
      var type = this.flowParseIntersectionType();
      node.types = [type];
      while (this.eat(types.bitwiseOR)) {
        node.types.push(this.flowParseIntersectionType());
      }
      return node.types.length === 1 ? type : this.finishNode(node, "UnionTypeAnnotation");
    };
    pp$8.flowParseType = function() {
      var oldInType = this.state.inType;
      this.state.inType = true;
      var type = this.flowParseUnionType();
      this.state.inType = oldInType;
      return type;
    };
    pp$8.flowParseTypeAnnotation = function() {
      var node = this.startNode();
      node.typeAnnotation = this.flowParseTypeInitialiser();
      return this.finishNode(node, "TypeAnnotation");
    };
    pp$8.flowParseTypeAndPredicateAnnotation = function() {
      var node = this.startNode();
      var _flowParseTypeAndPred2 = this.flowParseTypeAndPredicateInitialiser();
      node.typeAnnotation = _flowParseTypeAndPred2[0];
      node.predicate = _flowParseTypeAndPred2[1];
      return this.finishNode(node, "TypeAnnotation");
    };
    pp$8.flowParseTypeAnnotatableIdentifier = function() {
      var ident = this.flowParseRestrictedIdentifier();
      if (this.match(types.colon)) {
        ident.typeAnnotation = this.flowParseTypeAnnotation();
        this.finishNode(ident, ident.type);
      }
      return ident;
    };
    pp$8.typeCastToParameter = function(node) {
      node.expression.typeAnnotation = node.typeAnnotation;
      return this.finishNodeAt(node.expression, node.expression.type, node.typeAnnotation.end, node.typeAnnotation.loc.end);
    };
    pp$8.flowParseVariance = function() {
      var variance = null;
      if (this.match(types.plusMin)) {
        if (this.state.value === "+") {
          variance = "plus";
        } else if (this.state.value === "-") {
          variance = "minus";
        }
        this.next();
      }
      return variance;
    };
    var flowPlugin = function(instance) {
      instance.extend("parseFunctionBody", function(inner) {
        return function(node, allowExpression) {
          if (this.match(types.colon) && !allowExpression) {
            node.returnType = this.flowParseTypeAndPredicateAnnotation();
          }
          return inner.call(this, node, allowExpression);
        };
      });
      instance.extend("parseStatement", function(inner) {
        return function(declaration, topLevel) {
          if (this.state.strict && this.match(types.name) && this.state.value === "interface") {
            var node = this.startNode();
            this.next();
            return this.flowParseInterface(node);
          } else {
            return inner.call(this, declaration, topLevel);
          }
        };
      });
      instance.extend("parseExpressionStatement", function(inner) {
        return function(node, expr) {
          if (expr.type === "Identifier") {
            if (expr.name === "declare") {
              if (this.match(types._class) || this.match(types.name) || this.match(types._function) || this.match(types._var) || this.match(types._export)) {
                return this.flowParseDeclare(node);
              }
            } else if (this.match(types.name)) {
              if (expr.name === "interface") {
                return this.flowParseInterface(node);
              } else if (expr.name === "type") {
                return this.flowParseTypeAlias(node);
              } else if (expr.name === "opaque") {
                return this.flowParseOpaqueType(node, false);
              }
            }
          }
          return inner.call(this, node, expr);
        };
      });
      instance.extend("shouldParseExportDeclaration", function(inner) {
        return function() {
          return this.isContextual("type") || this.isContextual("interface") || this.isContextual("opaque") || inner.call(this);
        };
      });
      instance.extend("isExportDefaultSpecifier", function(inner) {
        return function() {
          if (this.match(types.name) && (this.state.value === "type" || this.state.value === "interface" || this.state.value === "opaque")) {
            return false;
          }
          return inner.call(this);
        };
      });
      instance.extend("parseConditional", function(inner) {
        return function(expr, noIn, startPos, startLoc, refNeedsArrowPos) {
          if (refNeedsArrowPos && this.match(types.question)) {
            var state = this.state.clone();
            try {
              return inner.call(this, expr, noIn, startPos, startLoc);
            } catch (err) {
              if (err instanceof SyntaxError) {
                this.state = state;
                refNeedsArrowPos.start = err.pos || this.state.start;
                return expr;
              } else {
                throw err;
              }
            }
          }
          return inner.call(this, expr, noIn, startPos, startLoc);
        };
      });
      instance.extend("parseParenItem", function(inner) {
        return function(node, startPos, startLoc) {
          node = inner.call(this, node, startPos, startLoc);
          if (this.eat(types.question)) {
            node.optional = true;
          }
          if (this.match(types.colon)) {
            var typeCastNode = this.startNodeAt(startPos, startLoc);
            typeCastNode.expression = node;
            typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();
            return this.finishNode(typeCastNode, "TypeCastExpression");
          }
          return node;
        };
      });
      instance.extend("parseExport", function(inner) {
        return function(node) {
          node = inner.call(this, node);
          if (node.type === "ExportNamedDeclaration") {
            node.exportKind = node.exportKind || "value";
          }
          return node;
        };
      });
      instance.extend("parseExportDeclaration", function(inner) {
        return function(node) {
          if (this.isContextual("type")) {
            node.exportKind = "type";
            var declarationNode = this.startNode();
            this.next();
            if (this.match(types.braceL)) {
              node.specifiers = this.parseExportSpecifiers();
              this.parseExportFrom(node);
              return null;
            } else {
              return this.flowParseTypeAlias(declarationNode);
            }
          } else if (this.isContextual("opaque")) {
            node.exportKind = "type";
            var _declarationNode = this.startNode();
            this.next();
            return this.flowParseOpaqueType(_declarationNode, false);
          } else if (this.isContextual("interface")) {
            node.exportKind = "type";
            var _declarationNode2 = this.startNode();
            this.next();
            return this.flowParseInterface(_declarationNode2);
          } else {
            return inner.call(this, node);
          }
        };
      });
      instance.extend("parseClassId", function(inner) {
        return function(node) {
          inner.apply(this, arguments);
          if (this.isRelational("<")) {
            node.typeParameters = this.flowParseTypeParameterDeclaration();
          }
        };
      });
      instance.extend("isKeyword", function(inner) {
        return function(name) {
          if (this.state.inType && name === "void") {
            return false;
          } else {
            return inner.call(this, name);
          }
        };
      });
      instance.extend("readToken", function(inner) {
        return function(code) {
          if (this.state.inType && (code === 62 || code === 60)) {
            return this.finishOp(types.relational, 1);
          } else {
            return inner.call(this, code);
          }
        };
      });
      instance.extend("jsx_readToken", function(inner) {
        return function() {
          if (!this.state.inType) return inner.call(this);
        };
      });
      instance.extend("toAssignable", function(inner) {
        return function(node, isBinding, contextDescription) {
          if (node.type === "TypeCastExpression") {
            return inner.call(this, this.typeCastToParameter(node), isBinding, contextDescription);
          } else {
            return inner.call(this, node, isBinding, contextDescription);
          }
        };
      });
      instance.extend("toAssignableList", function(inner) {
        return function(exprList, isBinding, contextDescription) {
          for (var i = 0; i < exprList.length; i++) {
            var expr = exprList[i];
            if (expr && expr.type === "TypeCastExpression") {
              exprList[i] = this.typeCastToParameter(expr);
            }
          }
          return inner.call(this, exprList, isBinding, contextDescription);
        };
      });
      instance.extend("toReferencedList", function() {
        return function(exprList) {
          for (var i = 0; i < exprList.length; i++) {
            var expr = exprList[i];
            if (expr && expr._exprListItem && expr.type === "TypeCastExpression") {
              this.raise(expr.start, "Unexpected type cast");
            }
          }
          return exprList;
        };
      });
      instance.extend("parseExprListItem", function(inner) {
        return function() {
          var container = this.startNode();
          for (var _len = arguments.length, args2 = Array(_len), _key = 0; _key < _len; _key++) {
            args2[_key] = arguments[_key];
          }
          var node = inner.call.apply(inner, [this].concat(args2));
          if (this.match(types.colon)) {
            container._exprListItem = true;
            container.expression = node;
            container.typeAnnotation = this.flowParseTypeAnnotation();
            return this.finishNode(container, "TypeCastExpression");
          } else {
            return node;
          }
        };
      });
      instance.extend("checkLVal", function(inner) {
        return function(node) {
          if (node.type !== "TypeCastExpression") {
            return inner.apply(this, arguments);
          }
        };
      });
      instance.extend("parseClassProperty", function(inner) {
        return function(node) {
          delete node.variancePos;
          if (this.match(types.colon)) {
            node.typeAnnotation = this.flowParseTypeAnnotation();
          }
          return inner.call(this, node);
        };
      });
      instance.extend("isClassMethod", function(inner) {
        return function() {
          return this.isRelational("<") || inner.call(this);
        };
      });
      instance.extend("isClassProperty", function(inner) {
        return function() {
          return this.match(types.colon) || inner.call(this);
        };
      });
      instance.extend("isNonstaticConstructor", function(inner) {
        return function(method) {
          return !this.match(types.colon) && inner.call(this, method);
        };
      });
      instance.extend("parseClassMethod", function(inner) {
        return function(classBody, method) {
          if (method.variance) {
            this.unexpected(method.variancePos);
          }
          delete method.variance;
          delete method.variancePos;
          if (this.isRelational("<")) {
            method.typeParameters = this.flowParseTypeParameterDeclaration();
          }
          for (var _len2 = arguments.length, args2 = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args2[_key2 - 2] = arguments[_key2];
          }
          inner.call.apply(inner, [this, classBody, method].concat(args2));
        };
      });
      instance.extend("parseClassSuper", function(inner) {
        return function(node, isStatement) {
          inner.call(this, node, isStatement);
          if (node.superClass && this.isRelational("<")) {
            node.superTypeParameters = this.flowParseTypeParameterInstantiation();
          }
          if (this.isContextual("implements")) {
            this.next();
            var implemented = node.implements = [];
            do {
              var _node = this.startNode();
              _node.id = this.parseIdentifier();
              if (this.isRelational("<")) {
                _node.typeParameters = this.flowParseTypeParameterInstantiation();
              } else {
                _node.typeParameters = null;
              }
              implemented.push(this.finishNode(_node, "ClassImplements"));
            } while (this.eat(types.comma));
          }
        };
      });
      instance.extend("parsePropertyName", function(inner) {
        return function(node) {
          var variancePos = this.state.start;
          var variance = this.flowParseVariance();
          var key = inner.call(this, node);
          node.variance = variance;
          node.variancePos = variancePos;
          return key;
        };
      });
      instance.extend("parseObjPropValue", function(inner) {
        return function(prop) {
          if (prop.variance) {
            this.unexpected(prop.variancePos);
          }
          delete prop.variance;
          delete prop.variancePos;
          var typeParameters = void 0;
          if (this.isRelational("<")) {
            typeParameters = this.flowParseTypeParameterDeclaration();
            if (!this.match(types.parenL)) this.unexpected();
          }
          inner.apply(this, arguments);
          if (typeParameters) {
            (prop.value || prop).typeParameters = typeParameters;
          }
        };
      });
      instance.extend("parseAssignableListItemTypes", function() {
        return function(param) {
          if (this.eat(types.question)) {
            param.optional = true;
          }
          if (this.match(types.colon)) {
            param.typeAnnotation = this.flowParseTypeAnnotation();
          }
          this.finishNode(param, param.type);
          return param;
        };
      });
      instance.extend("parseMaybeDefault", function(inner) {
        return function() {
          for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args2[_key3] = arguments[_key3];
          }
          var node = inner.apply(this, args2);
          if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
            this.raise(node.typeAnnotation.start, "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`");
          }
          return node;
        };
      });
      instance.extend("parseImportSpecifiers", function(inner) {
        return function(node) {
          node.importKind = "value";
          var kind = null;
          if (this.match(types._typeof)) {
            kind = "typeof";
          } else if (this.isContextual("type")) {
            kind = "type";
          }
          if (kind) {
            var lh = this.lookahead();
            if (lh.type === types.name && lh.value !== "from" || lh.type === types.braceL || lh.type === types.star) {
              this.next();
              node.importKind = kind;
            }
          }
          inner.call(this, node);
        };
      });
      instance.extend("parseImportSpecifier", function() {
        return function(node) {
          var specifier = this.startNode();
          var firstIdentLoc = this.state.start;
          var firstIdent = this.parseIdentifier(true);
          var specifierTypeKind = null;
          if (firstIdent.name === "type") {
            specifierTypeKind = "type";
          } else if (firstIdent.name === "typeof") {
            specifierTypeKind = "typeof";
          }
          var isBinding = false;
          if (this.isContextual("as")) {
            var as_ident = this.parseIdentifier(true);
            if (specifierTypeKind !== null && !this.match(types.name) && !this.state.type.keyword) {
              specifier.imported = as_ident;
              specifier.importKind = specifierTypeKind;
              specifier.local = as_ident.__clone();
            } else {
              specifier.imported = firstIdent;
              specifier.importKind = null;
              specifier.local = this.parseIdentifier();
            }
          } else if (specifierTypeKind !== null && (this.match(types.name) || this.state.type.keyword)) {
            specifier.imported = this.parseIdentifier(true);
            specifier.importKind = specifierTypeKind;
            if (this.eatContextual("as")) {
              specifier.local = this.parseIdentifier();
            } else {
              isBinding = true;
              specifier.local = specifier.imported.__clone();
            }
          } else {
            isBinding = true;
            specifier.imported = firstIdent;
            specifier.importKind = null;
            specifier.local = specifier.imported.__clone();
          }
          if ((node.importKind === "type" || node.importKind === "typeof") && (specifier.importKind === "type" || specifier.importKind === "typeof")) {
            this.raise(firstIdentLoc, "`The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements`");
          }
          if (isBinding) this.checkReservedWord(specifier.local.name, specifier.start, true, true);
          this.checkLVal(specifier.local, true, void 0, "import specifier");
          node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
        };
      });
      instance.extend("parseFunctionParams", function(inner) {
        return function(node) {
          if (this.isRelational("<")) {
            node.typeParameters = this.flowParseTypeParameterDeclaration();
          }
          inner.call(this, node);
        };
      });
      instance.extend("parseVarHead", function(inner) {
        return function(decl) {
          inner.call(this, decl);
          if (this.match(types.colon)) {
            decl.id.typeAnnotation = this.flowParseTypeAnnotation();
            this.finishNode(decl.id, decl.id.type);
          }
        };
      });
      instance.extend("parseAsyncArrowFromCallExpression", function(inner) {
        return function(node, call) {
          if (this.match(types.colon)) {
            var oldNoAnonFunctionType = this.state.noAnonFunctionType;
            this.state.noAnonFunctionType = true;
            node.returnType = this.flowParseTypeAnnotation();
            this.state.noAnonFunctionType = oldNoAnonFunctionType;
          }
          return inner.call(this, node, call);
        };
      });
      instance.extend("shouldParseAsyncArrow", function(inner) {
        return function() {
          return this.match(types.colon) || inner.call(this);
        };
      });
      instance.extend("parseMaybeAssign", function(inner) {
        return function() {
          var jsxError = null;
          for (var _len4 = arguments.length, args2 = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args2[_key4] = arguments[_key4];
          }
          if (types.jsxTagStart && this.match(types.jsxTagStart)) {
            var state = this.state.clone();
            try {
              return inner.apply(this, args2);
            } catch (err) {
              if (err instanceof SyntaxError) {
                this.state = state;
                this.state.context.length -= 2;
                jsxError = err;
              } else {
                throw err;
              }
            }
          }
          if (jsxError != null || this.isRelational("<")) {
            var arrowExpression = void 0;
            var typeParameters = void 0;
            try {
              typeParameters = this.flowParseTypeParameterDeclaration();
              arrowExpression = inner.apply(this, args2);
              arrowExpression.typeParameters = typeParameters;
              arrowExpression.start = typeParameters.start;
              arrowExpression.loc.start = typeParameters.loc.start;
            } catch (err) {
              throw jsxError || err;
            }
            if (arrowExpression.type === "ArrowFunctionExpression") {
              return arrowExpression;
            } else if (jsxError != null) {
              throw jsxError;
            } else {
              this.raise(typeParameters.start, "Expected an arrow function after this type parameter declaration");
            }
          }
          return inner.apply(this, args2);
        };
      });
      instance.extend("parseArrow", function(inner) {
        return function(node) {
          if (this.match(types.colon)) {
            var state = this.state.clone();
            try {
              var oldNoAnonFunctionType = this.state.noAnonFunctionType;
              this.state.noAnonFunctionType = true;
              var returnType = this.flowParseTypeAndPredicateAnnotation();
              this.state.noAnonFunctionType = oldNoAnonFunctionType;
              if (this.canInsertSemicolon()) this.unexpected();
              if (!this.match(types.arrow)) this.unexpected();
              node.returnType = returnType;
            } catch (err) {
              if (err instanceof SyntaxError) {
                this.state = state;
              } else {
                throw err;
              }
            }
          }
          return inner.call(this, node);
        };
      });
      instance.extend("shouldParseArrow", function(inner) {
        return function() {
          return this.match(types.colon) || inner.call(this);
        };
      });
    };
    var fromCodePoint = String.fromCodePoint;
    if (!fromCodePoint) {
      stringFromCharCode = String.fromCharCode;
      floor = Math.floor;
      fromCodePoint = function fromCodePoint2() {
        var MAX_SIZE = 16384;
        var codeUnits = [];
        var highSurrogate = void 0;
        var lowSurrogate = void 0;
        var index = -1;
        var length = arguments.length;
        if (!length) {
          return "";
        }
        var result = "";
        while (++index < length) {
          var codePoint = Number(arguments[index]);
          if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
          codePoint < 0 || // not a valid Unicode code point
          codePoint > 1114111 || // not a valid Unicode code point
          floor(codePoint) != codePoint) {
            throw RangeError("Invalid code point: " + codePoint);
          }
          if (codePoint <= 65535) {
            codeUnits.push(codePoint);
          } else {
            codePoint -= 65536;
            highSurrogate = (codePoint >> 10) + 55296;
            lowSurrogate = codePoint % 1024 + 56320;
            codeUnits.push(highSurrogate, lowSurrogate);
          }
          if (index + 1 == length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }
        return result;
      };
    }
    var stringFromCharCode;
    var floor;
    var fromCodePoint$1 = fromCodePoint;
    var XHTMLEntities = {
      quot: '"',
      amp: "&",
      apos: "'",
      lt: "<",
      gt: ">",
      nbsp: "\xA0",
      iexcl: "\xA1",
      cent: "\xA2",
      pound: "\xA3",
      curren: "\xA4",
      yen: "\xA5",
      brvbar: "\xA6",
      sect: "\xA7",
      uml: "\xA8",
      copy: "\xA9",
      ordf: "\xAA",
      laquo: "\xAB",
      not: "\xAC",
      shy: "\xAD",
      reg: "\xAE",
      macr: "\xAF",
      deg: "\xB0",
      plusmn: "\xB1",
      sup2: "\xB2",
      sup3: "\xB3",
      acute: "\xB4",
      micro: "\xB5",
      para: "\xB6",
      middot: "\xB7",
      cedil: "\xB8",
      sup1: "\xB9",
      ordm: "\xBA",
      raquo: "\xBB",
      frac14: "\xBC",
      frac12: "\xBD",
      frac34: "\xBE",
      iquest: "\xBF",
      Agrave: "\xC0",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Atilde: "\xC3",
      Auml: "\xC4",
      Aring: "\xC5",
      AElig: "\xC6",
      Ccedil: "\xC7",
      Egrave: "\xC8",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Euml: "\xCB",
      Igrave: "\xCC",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Iuml: "\xCF",
      ETH: "\xD0",
      Ntilde: "\xD1",
      Ograve: "\xD2",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Otilde: "\xD5",
      Ouml: "\xD6",
      times: "\xD7",
      Oslash: "\xD8",
      Ugrave: "\xD9",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Uuml: "\xDC",
      Yacute: "\xDD",
      THORN: "\xDE",
      szlig: "\xDF",
      agrave: "\xE0",
      aacute: "\xE1",
      acirc: "\xE2",
      atilde: "\xE3",
      auml: "\xE4",
      aring: "\xE5",
      aelig: "\xE6",
      ccedil: "\xE7",
      egrave: "\xE8",
      eacute: "\xE9",
      ecirc: "\xEA",
      euml: "\xEB",
      igrave: "\xEC",
      iacute: "\xED",
      icirc: "\xEE",
      iuml: "\xEF",
      eth: "\xF0",
      ntilde: "\xF1",
      ograve: "\xF2",
      oacute: "\xF3",
      ocirc: "\xF4",
      otilde: "\xF5",
      ouml: "\xF6",
      divide: "\xF7",
      oslash: "\xF8",
      ugrave: "\xF9",
      uacute: "\xFA",
      ucirc: "\xFB",
      uuml: "\xFC",
      yacute: "\xFD",
      thorn: "\xFE",
      yuml: "\xFF",
      OElig: "\u0152",
      oelig: "\u0153",
      Scaron: "\u0160",
      scaron: "\u0161",
      Yuml: "\u0178",
      fnof: "\u0192",
      circ: "\u02C6",
      tilde: "\u02DC",
      Alpha: "\u0391",
      Beta: "\u0392",
      Gamma: "\u0393",
      Delta: "\u0394",
      Epsilon: "\u0395",
      Zeta: "\u0396",
      Eta: "\u0397",
      Theta: "\u0398",
      Iota: "\u0399",
      Kappa: "\u039A",
      Lambda: "\u039B",
      Mu: "\u039C",
      Nu: "\u039D",
      Xi: "\u039E",
      Omicron: "\u039F",
      Pi: "\u03A0",
      Rho: "\u03A1",
      Sigma: "\u03A3",
      Tau: "\u03A4",
      Upsilon: "\u03A5",
      Phi: "\u03A6",
      Chi: "\u03A7",
      Psi: "\u03A8",
      Omega: "\u03A9",
      alpha: "\u03B1",
      beta: "\u03B2",
      gamma: "\u03B3",
      delta: "\u03B4",
      epsilon: "\u03B5",
      zeta: "\u03B6",
      eta: "\u03B7",
      theta: "\u03B8",
      iota: "\u03B9",
      kappa: "\u03BA",
      lambda: "\u03BB",
      mu: "\u03BC",
      nu: "\u03BD",
      xi: "\u03BE",
      omicron: "\u03BF",
      pi: "\u03C0",
      rho: "\u03C1",
      sigmaf: "\u03C2",
      sigma: "\u03C3",
      tau: "\u03C4",
      upsilon: "\u03C5",
      phi: "\u03C6",
      chi: "\u03C7",
      psi: "\u03C8",
      omega: "\u03C9",
      thetasym: "\u03D1",
      upsih: "\u03D2",
      piv: "\u03D6",
      ensp: "\u2002",
      emsp: "\u2003",
      thinsp: "\u2009",
      zwnj: "\u200C",
      zwj: "\u200D",
      lrm: "\u200E",
      rlm: "\u200F",
      ndash: "\u2013",
      mdash: "\u2014",
      lsquo: "\u2018",
      rsquo: "\u2019",
      sbquo: "\u201A",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bdquo: "\u201E",
      dagger: "\u2020",
      Dagger: "\u2021",
      bull: "\u2022",
      hellip: "\u2026",
      permil: "\u2030",
      prime: "\u2032",
      Prime: "\u2033",
      lsaquo: "\u2039",
      rsaquo: "\u203A",
      oline: "\u203E",
      frasl: "\u2044",
      euro: "\u20AC",
      image: "\u2111",
      weierp: "\u2118",
      real: "\u211C",
      trade: "\u2122",
      alefsym: "\u2135",
      larr: "\u2190",
      uarr: "\u2191",
      rarr: "\u2192",
      darr: "\u2193",
      harr: "\u2194",
      crarr: "\u21B5",
      lArr: "\u21D0",
      uArr: "\u21D1",
      rArr: "\u21D2",
      dArr: "\u21D3",
      hArr: "\u21D4",
      forall: "\u2200",
      part: "\u2202",
      exist: "\u2203",
      empty: "\u2205",
      nabla: "\u2207",
      isin: "\u2208",
      notin: "\u2209",
      ni: "\u220B",
      prod: "\u220F",
      sum: "\u2211",
      minus: "\u2212",
      lowast: "\u2217",
      radic: "\u221A",
      prop: "\u221D",
      infin: "\u221E",
      ang: "\u2220",
      and: "\u2227",
      or: "\u2228",
      cap: "\u2229",
      cup: "\u222A",
      "int": "\u222B",
      there4: "\u2234",
      sim: "\u223C",
      cong: "\u2245",
      asymp: "\u2248",
      ne: "\u2260",
      equiv: "\u2261",
      le: "\u2264",
      ge: "\u2265",
      sub: "\u2282",
      sup: "\u2283",
      nsub: "\u2284",
      sube: "\u2286",
      supe: "\u2287",
      oplus: "\u2295",
      otimes: "\u2297",
      perp: "\u22A5",
      sdot: "\u22C5",
      lceil: "\u2308",
      rceil: "\u2309",
      lfloor: "\u230A",
      rfloor: "\u230B",
      lang: "\u2329",
      rang: "\u232A",
      loz: "\u25CA",
      spades: "\u2660",
      clubs: "\u2663",
      hearts: "\u2665",
      diams: "\u2666"
    };
    var HEX_NUMBER = /^[\da-fA-F]+$/;
    var DECIMAL_NUMBER = /^\d+$/;
    types$1.j_oTag = new TokContext("<tag", false);
    types$1.j_cTag = new TokContext("</tag", false);
    types$1.j_expr = new TokContext("<tag>...</tag>", true, true);
    types.jsxName = new TokenType("jsxName");
    types.jsxText = new TokenType("jsxText", { beforeExpr: true });
    types.jsxTagStart = new TokenType("jsxTagStart", { startsExpr: true });
    types.jsxTagEnd = new TokenType("jsxTagEnd");
    types.jsxTagStart.updateContext = function() {
      this.state.context.push(types$1.j_expr);
      this.state.context.push(types$1.j_oTag);
      this.state.exprAllowed = false;
    };
    types.jsxTagEnd.updateContext = function(prevType) {
      var out = this.state.context.pop();
      if (out === types$1.j_oTag && prevType === types.slash || out === types$1.j_cTag) {
        this.state.context.pop();
        this.state.exprAllowed = this.curContext() === types$1.j_expr;
      } else {
        this.state.exprAllowed = true;
      }
    };
    var pp$9 = Parser.prototype;
    pp$9.jsxReadToken = function() {
      var out = "";
      var chunkStart = this.state.pos;
      for (; ; ) {
        if (this.state.pos >= this.input.length) {
          this.raise(this.state.start, "Unterminated JSX contents");
        }
        var ch = this.input.charCodeAt(this.state.pos);
        switch (ch) {
          case 60:
          // "<"
          case 123:
            if (this.state.pos === this.state.start) {
              if (ch === 60 && this.state.exprAllowed) {
                ++this.state.pos;
                return this.finishToken(types.jsxTagStart);
              }
              return this.getTokenFromCode(ch);
            }
            out += this.input.slice(chunkStart, this.state.pos);
            return this.finishToken(types.jsxText, out);
          case 38:
            out += this.input.slice(chunkStart, this.state.pos);
            out += this.jsxReadEntity();
            chunkStart = this.state.pos;
            break;
          default:
            if (isNewLine(ch)) {
              out += this.input.slice(chunkStart, this.state.pos);
              out += this.jsxReadNewLine(true);
              chunkStart = this.state.pos;
            } else {
              ++this.state.pos;
            }
        }
      }
    };
    pp$9.jsxReadNewLine = function(normalizeCRLF) {
      var ch = this.input.charCodeAt(this.state.pos);
      var out = void 0;
      ++this.state.pos;
      if (ch === 13 && this.input.charCodeAt(this.state.pos) === 10) {
        ++this.state.pos;
        out = normalizeCRLF ? "\n" : "\r\n";
      } else {
        out = String.fromCharCode(ch);
      }
      ++this.state.curLine;
      this.state.lineStart = this.state.pos;
      return out;
    };
    pp$9.jsxReadString = function(quote) {
      var out = "";
      var chunkStart = ++this.state.pos;
      for (; ; ) {
        if (this.state.pos >= this.input.length) {
          this.raise(this.state.start, "Unterminated string constant");
        }
        var ch = this.input.charCodeAt(this.state.pos);
        if (ch === quote) break;
        if (ch === 38) {
          out += this.input.slice(chunkStart, this.state.pos);
          out += this.jsxReadEntity();
          chunkStart = this.state.pos;
        } else if (isNewLine(ch)) {
          out += this.input.slice(chunkStart, this.state.pos);
          out += this.jsxReadNewLine(false);
          chunkStart = this.state.pos;
        } else {
          ++this.state.pos;
        }
      }
      out += this.input.slice(chunkStart, this.state.pos++);
      return this.finishToken(types.string, out);
    };
    pp$9.jsxReadEntity = function() {
      var str = "";
      var count = 0;
      var entity = void 0;
      var ch = this.input[this.state.pos];
      var startPos = ++this.state.pos;
      while (this.state.pos < this.input.length && count++ < 10) {
        ch = this.input[this.state.pos++];
        if (ch === ";") {
          if (str[0] === "#") {
            if (str[1] === "x") {
              str = str.substr(2);
              if (HEX_NUMBER.test(str)) entity = fromCodePoint$1(parseInt(str, 16));
            } else {
              str = str.substr(1);
              if (DECIMAL_NUMBER.test(str)) entity = fromCodePoint$1(parseInt(str, 10));
            }
          } else {
            entity = XHTMLEntities[str];
          }
          break;
        }
        str += ch;
      }
      if (!entity) {
        this.state.pos = startPos;
        return "&";
      }
      return entity;
    };
    pp$9.jsxReadWord = function() {
      var ch = void 0;
      var start = this.state.pos;
      do {
        ch = this.input.charCodeAt(++this.state.pos);
      } while (isIdentifierChar(ch) || ch === 45);
      return this.finishToken(types.jsxName, this.input.slice(start, this.state.pos));
    };
    function getQualifiedJSXName(object) {
      if (object.type === "JSXIdentifier") {
        return object.name;
      }
      if (object.type === "JSXNamespacedName") {
        return object.namespace.name + ":" + object.name.name;
      }
      if (object.type === "JSXMemberExpression") {
        return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
      }
    }
    pp$9.jsxParseIdentifier = function() {
      var node = this.startNode();
      if (this.match(types.jsxName)) {
        node.name = this.state.value;
      } else if (this.state.type.keyword) {
        node.name = this.state.type.keyword;
      } else {
        this.unexpected();
      }
      this.next();
      return this.finishNode(node, "JSXIdentifier");
    };
    pp$9.jsxParseNamespacedName = function() {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      var name = this.jsxParseIdentifier();
      if (!this.eat(types.colon)) return name;
      var node = this.startNodeAt(startPos, startLoc);
      node.namespace = name;
      node.name = this.jsxParseIdentifier();
      return this.finishNode(node, "JSXNamespacedName");
    };
    pp$9.jsxParseElementName = function() {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      var node = this.jsxParseNamespacedName();
      while (this.eat(types.dot)) {
        var newNode = this.startNodeAt(startPos, startLoc);
        newNode.object = node;
        newNode.property = this.jsxParseIdentifier();
        node = this.finishNode(newNode, "JSXMemberExpression");
      }
      return node;
    };
    pp$9.jsxParseAttributeValue = function() {
      var node = void 0;
      switch (this.state.type) {
        case types.braceL:
          node = this.jsxParseExpressionContainer();
          if (node.expression.type === "JSXEmptyExpression") {
            this.raise(node.start, "JSX attributes must only be assigned a non-empty expression");
          } else {
            return node;
          }
        case types.jsxTagStart:
        case types.string:
          node = this.parseExprAtom();
          node.extra = null;
          return node;
        default:
          this.raise(this.state.start, "JSX value should be either an expression or a quoted JSX text");
      }
    };
    pp$9.jsxParseEmptyExpression = function() {
      var node = this.startNodeAt(this.state.lastTokEnd, this.state.lastTokEndLoc);
      return this.finishNodeAt(node, "JSXEmptyExpression", this.state.start, this.state.startLoc);
    };
    pp$9.jsxParseSpreadChild = function() {
      var node = this.startNode();
      this.expect(types.braceL);
      this.expect(types.ellipsis);
      node.expression = this.parseExpression();
      this.expect(types.braceR);
      return this.finishNode(node, "JSXSpreadChild");
    };
    pp$9.jsxParseExpressionContainer = function() {
      var node = this.startNode();
      this.next();
      if (this.match(types.braceR)) {
        node.expression = this.jsxParseEmptyExpression();
      } else {
        node.expression = this.parseExpression();
      }
      this.expect(types.braceR);
      return this.finishNode(node, "JSXExpressionContainer");
    };
    pp$9.jsxParseAttribute = function() {
      var node = this.startNode();
      if (this.eat(types.braceL)) {
        this.expect(types.ellipsis);
        node.argument = this.parseMaybeAssign();
        this.expect(types.braceR);
        return this.finishNode(node, "JSXSpreadAttribute");
      }
      node.name = this.jsxParseNamespacedName();
      node.value = this.eat(types.eq) ? this.jsxParseAttributeValue() : null;
      return this.finishNode(node, "JSXAttribute");
    };
    pp$9.jsxParseOpeningElementAt = function(startPos, startLoc) {
      var node = this.startNodeAt(startPos, startLoc);
      node.attributes = [];
      node.name = this.jsxParseElementName();
      while (!this.match(types.slash) && !this.match(types.jsxTagEnd)) {
        node.attributes.push(this.jsxParseAttribute());
      }
      node.selfClosing = this.eat(types.slash);
      this.expect(types.jsxTagEnd);
      return this.finishNode(node, "JSXOpeningElement");
    };
    pp$9.jsxParseClosingElementAt = function(startPos, startLoc) {
      var node = this.startNodeAt(startPos, startLoc);
      node.name = this.jsxParseElementName();
      this.expect(types.jsxTagEnd);
      return this.finishNode(node, "JSXClosingElement");
    };
    pp$9.jsxParseElementAt = function(startPos, startLoc) {
      var node = this.startNodeAt(startPos, startLoc);
      var children = [];
      var openingElement = this.jsxParseOpeningElementAt(startPos, startLoc);
      var closingElement = null;
      if (!openingElement.selfClosing) {
        contents: for (; ; ) {
          switch (this.state.type) {
            case types.jsxTagStart:
              startPos = this.state.start;
              startLoc = this.state.startLoc;
              this.next();
              if (this.eat(types.slash)) {
                closingElement = this.jsxParseClosingElementAt(startPos, startLoc);
                break contents;
              }
              children.push(this.jsxParseElementAt(startPos, startLoc));
              break;
            case types.jsxText:
              children.push(this.parseExprAtom());
              break;
            case types.braceL:
              if (this.lookahead().type === types.ellipsis) {
                children.push(this.jsxParseSpreadChild());
              } else {
                children.push(this.jsxParseExpressionContainer());
              }
              break;
            // istanbul ignore next - should never happen
            default:
              this.unexpected();
          }
        }
        if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
          this.raise(closingElement.start, "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
        }
      }
      node.openingElement = openingElement;
      node.closingElement = closingElement;
      node.children = children;
      if (this.match(types.relational) && this.state.value === "<") {
        this.raise(this.state.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
      }
      return this.finishNode(node, "JSXElement");
    };
    pp$9.jsxParseElement = function() {
      var startPos = this.state.start;
      var startLoc = this.state.startLoc;
      this.next();
      return this.jsxParseElementAt(startPos, startLoc);
    };
    var jsxPlugin = function(instance) {
      instance.extend("parseExprAtom", function(inner) {
        return function(refShortHandDefaultPos) {
          if (this.match(types.jsxText)) {
            var node = this.parseLiteral(this.state.value, "JSXText");
            node.extra = null;
            return node;
          } else if (this.match(types.jsxTagStart)) {
            return this.jsxParseElement();
          } else {
            return inner.call(this, refShortHandDefaultPos);
          }
        };
      });
      instance.extend("readToken", function(inner) {
        return function(code) {
          if (this.state.inPropertyName) return inner.call(this, code);
          var context = this.curContext();
          if (context === types$1.j_expr) {
            return this.jsxReadToken();
          }
          if (context === types$1.j_oTag || context === types$1.j_cTag) {
            if (isIdentifierStart(code)) {
              return this.jsxReadWord();
            }
            if (code === 62) {
              ++this.state.pos;
              return this.finishToken(types.jsxTagEnd);
            }
            if ((code === 34 || code === 39) && context === types$1.j_oTag) {
              return this.jsxReadString(code);
            }
          }
          if (code === 60 && this.state.exprAllowed) {
            ++this.state.pos;
            return this.finishToken(types.jsxTagStart);
          }
          return inner.call(this, code);
        };
      });
      instance.extend("updateContext", function(inner) {
        return function(prevType) {
          if (this.match(types.braceL)) {
            var curContext = this.curContext();
            if (curContext === types$1.j_oTag) {
              this.state.context.push(types$1.braceExpression);
            } else if (curContext === types$1.j_expr) {
              this.state.context.push(types$1.templateQuasi);
            } else {
              inner.call(this, prevType);
            }
            this.state.exprAllowed = true;
          } else if (this.match(types.slash) && prevType === types.jsxTagStart) {
            this.state.context.length -= 2;
            this.state.context.push(types$1.j_cTag);
            this.state.exprAllowed = false;
          } else {
            return inner.call(this, prevType);
          }
        };
      });
    };
    plugins.estree = estreePlugin;
    plugins.flow = flowPlugin;
    plugins.jsx = jsxPlugin;
    function parse2(input, options) {
      return new Parser(options, input).parse();
    }
    function parseExpression(input, options) {
      var parser = new Parser(options, input);
      if (parser.options.strictMode) {
        parser.state.strict = true;
      }
      return parser.getExpression();
    }
    exports2.parse = parse2;
    exports2.parseExpression = parseExpression;
    exports2.tokTypes = types;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/arithmetic-expansion.js
var require_arithmetic_expansion = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/arithmetic-expansion.js"(exports2, module2) {
    "use strict";
    var map = require_map_iterable();
    var babylon = require_lib();
    var MagicString2 = (init_magic_string_es6(), __toCommonJS(magic_string_es6_exports));
    var tokens = require_tokens();
    var fieldSplitting = require_field_splitting();
    function parseArithmeticAST(xp) {
      let AST;
      try {
        AST = babylon.parse(xp.expression);
      } catch (err) {
        throw new SyntaxError(`Cannot parse arithmetic expression "${xp.expression}": ${err.message}`);
      }
      const expression = AST.program.body[0].expression;
      if (expression === void 0) {
        throw new SyntaxError(`Cannot parse arithmetic expression "${xp.expression}": Not an expression`);
      }
      return JSON.parse(JSON.stringify(expression));
    }
    var arithmeticExpansion = () => map((token) => {
      if (token.is("WORD") || token.is("ASSIGNMENT_WORD")) {
        if (!token.expansion || token.expansion.length === 0) {
          return token;
        }
        return tokens.setExpansions(token, token.expansion.map((xp) => {
          if (xp.type === "arithmetic_expansion") {
            return Object.assign({}, xp, { arithmeticAST: parseArithmeticAST(xp) });
          }
          return xp;
        }));
      }
      return token;
    });
    arithmeticExpansion.resolve = (options) => map((token) => {
      if (options.runArithmeticExpression && token.expansion) {
        const value = token.value;
        const magic = new MagicString2(value);
        for (const xp of token.expansion) {
          if (xp.type === "arithmetic_expansion") {
            const result = options.runArithmeticExpression(xp);
            magic.overwrite(
              xp.loc.start,
              xp.loc.end + 1,
              fieldSplitting.mark(result, value, options)
            );
            xp.resolved = true;
          }
        }
        return token.alterValue(magic.toString());
      }
      return token;
    });
    module2.exports = arithmeticExpansion;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/alias-substitution.js
var require_alias_substitution2 = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/alias-substitution.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var identity = require_identity_function();
    var map = require_map_iterable();
    var merge = require_transform_spread_iterable();
    var tokens = require_tokens();
    var expandAlias = (preAliasLexer, resolveAlias) => {
      function* tryExpandToken(token, expandingAliases) {
        if (expandingAliases.indexOf(token.value) !== -1 || !token._.maybeSimpleCommandName) {
          yield token;
          return;
        }
        const result = resolveAlias(token.value);
        if (result === void 0) {
          yield token;
        } else {
          for (const newToken of preAliasLexer(result)) {
            if (newToken.is("WORD")) {
              yield* tryExpandToken(
                newToken,
                expandingAliases.concat(token.value)
              );
            } else if (!newToken.is("EOF")) {
              yield newToken;
            }
          }
        }
      }
      return {
        WORD: (tk) => {
          return Array.from(tryExpandToken(tk, []));
        }
      };
    };
    module2.exports = (options, mode, previousPhases) => {
      if (typeof options.resolveAlias !== "function") {
        return identity;
      }
      const preAliasLexer = compose.apply(null, previousPhases.reverse());
      const visitor = expandAlias(preAliasLexer, options.resolveAlias);
      return compose(
        merge,
        map(
          tokens.applyTokenizerVisitor(visitor)
        )
      );
    };
  }
});

// node_modules/.pnpm/to-no-case@1.0.2/node_modules/to-no-case/index.js
var require_to_no_case = __commonJS({
  "node_modules/.pnpm/to-no-case@1.0.2/node_modules/to-no-case/index.js"(exports2, module2) {
    "use strict";
    module2.exports = toNoCase;
    var hasSpace = /\s/;
    var hasSeparator = /(_|-|\.|:)/;
    var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;
    function toNoCase(string) {
      if (hasSpace.test(string)) return string.toLowerCase();
      if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();
      if (hasCamel.test(string)) return uncamelize(string).toLowerCase();
      return string.toLowerCase();
    }
    var separatorSplitter = /[\W_]+(.|$)/g;
    function unseparate(string) {
      return string.replace(separatorSplitter, function(m, next) {
        return next ? " " + next : "";
      });
    }
    var camelSplitter = /(.)([A-Z]+)/g;
    function uncamelize(string) {
      return string.replace(camelSplitter, function(m, previous, uppers) {
        return previous + " " + uppers.toLowerCase().split("").join(" ");
      });
    }
  }
});

// node_modules/.pnpm/to-space-case@1.0.0/node_modules/to-space-case/index.js
var require_to_space_case = __commonJS({
  "node_modules/.pnpm/to-space-case@1.0.0/node_modules/to-space-case/index.js"(exports2, module2) {
    "use strict";
    var clean = require_to_no_case();
    module2.exports = toSpaceCase;
    function toSpaceCase(string) {
      return clean(string).replace(/[\W_]+(.|$)/g, function(matches, match) {
        return match ? " " + match : "";
      }).trim();
    }
  }
});

// node_modules/.pnpm/to-pascal-case@1.0.0/node_modules/to-pascal-case/index.js
var require_to_pascal_case = __commonJS({
  "node_modules/.pnpm/to-pascal-case@1.0.0/node_modules/to-pascal-case/index.js"(exports2, module2) {
    "use strict";
    var space = require_to_space_case();
    module2.exports = toPascalCase;
    function toPascalCase(string) {
      return space(string).replace(/(?:^|\s)(\w)/g, function(matches, letter) {
        return letter.toUpperCase();
      });
    }
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/default-node-type.js
var require_default_node_type = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/default-node-type.js"(exports2, module2) {
    "use strict";
    var toPascal = require_to_pascal_case();
    var map = require_map_iterable();
    module2.exports = () => map((token) => {
      const tk = Object.assign({}, token);
      if (tk.type) {
        tk.originalType = token.type;
        if (token.is("WORD") || token.is("NAME") || token.is("ASSIGNMENT_WORD")) {
          tk.type = toPascal(tk.type);
        } else {
          tk.type = token.type.toLowerCase();
        }
        for (const xp of tk.expansion || []) {
          xp.type = toPascal(xp.type);
        }
        delete tk._;
      }
      return tk;
    });
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/tilde-expanding.js
var require_tilde_expanding = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/tilde-expanding.js"(exports2, module2) {
    "use strict";
    var map = require_map_iterable();
    var tokens = require_tokens();
    var replace = (text, resolveHomeUser) => {
      let replaced = false;
      let result = text.replace(/^~([^\/]*)\//, (match, p1) => {
        replaced = true;
        return resolveHomeUser(p1 || null) + "/";
      });
      if (!replaced) {
        result = text.replace(/^~(.*)$/, (match, p1) => {
          return resolveHomeUser(p1 || null);
        });
      }
      return result;
    };
    module2.exports = (options) => map((token) => {
      if (token.is("WORD") && typeof options.resolveHomeUser === "function") {
        return tokens.setValue(token, replace(token.value, options.resolveHomeUser));
      }
      if (token.is("ASSIGNMENT_WORD") && typeof options.resolveHomeUser === "function") {
        const parts = token.value.split("=", 2);
        const target = parts[0];
        const sourceParts = parts[1];
        const source = sourceParts.split(":").map((text) => replace(text, options.resolveHomeUser)).join(":");
        return tokens.setValue(token, target + "=" + source);
      }
      return token;
    });
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/path-expansion.js
var require_path_expansion = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/path-expansion.js"(exports2, module2) {
    "use strict";
    var map = require_map_iterable();
    var tokens = require_tokens();
    module2.exports = (options) => map((token) => {
      if (token.is("WORD") && typeof options.resolvePath === "function") {
        return tokens.setValue(token, options.resolvePath(token.value));
      }
      if (token.is("ASSIGNMENT_WORD") && typeof options.resolvePath === "function") {
        const parts = token.value.split("=");
        return tokens.setValue(token, parts[0] + "=" + options.resolvePath(parts[1]));
      }
      return token;
    });
  }
});

// node_modules/.pnpm/shell-quote-word@1.0.1/node_modules/shell-quote-word/index.js
var require_shell_quote_word = __commonJS({
  "node_modules/.pnpm/shell-quote-word@1.0.1/node_modules/shell-quote-word/index.js"(exports2, module2) {
    "use strict";
    var META = "|&;()<> \\t";
    var BAREWORD = `(\\\\['"` + META + `]|[^\\s'"` + META + "])+";
    var SINGLE_QUOTE = '"((\\\\"|[^"])*?)"';
    var DOUBLE_QUOTE = "'((\\\\'|[^'])*?)'";
    var TOKEN = "";
    for (i = 0; i < 4; i++) {
      TOKEN += (Math.pow(16, 8) * Math.random()).toString(16);
    }
    var i;
    module2.exports = function parse2(s) {
      var chunker = new RegExp([
        "(" + BAREWORD + "|" + SINGLE_QUOTE + "|" + DOUBLE_QUOTE + ")*"
      ].join("|"), "g");
      var match = s.match(chunker).filter(Boolean);
      var commented = false;
      if (!match) {
        return [];
      }
      return match.map((s2, j) => {
        if (commented) {
          return void 0;
        }
        var SQ = "'";
        var DQ = '"';
        var BS = "\\";
        var quote = false;
        var esc = false;
        var out = "";
        for (var i2 = 0, len = s2.length; i2 < len; i2++) {
          var c = s2.charAt(i2);
          if (esc) {
            out += c;
            esc = false;
          } else if (quote) {
            if (c === quote) {
              quote = false;
            } else if (quote === SQ) {
              out += c;
            } else if (c === BS) {
              i2 += 1;
              c = s2.charAt(i2);
              if (c === DQ || c === BS) {
                out += c;
              } else {
                out += BS + c;
              }
            } else {
              out += c;
            }
          } else if (c === DQ || c === SQ) {
            quote = c;
          } else if (RegExp("^#$").test(c)) {
            commented = true;
            if (out.length) {
              return [out, { comment: s2.slice(i2 + 1) + match.slice(j + 1).join(" ") }];
            }
            return [{ comment: s2.slice(i2 + 1) + match.slice(j + 1).join(" ") }];
          } else if (c === BS) {
            esc = true;
          } else {
            out += c;
          }
        }
        return out;
      }).reduce((prev, arg) => {
        if (arg === void 0) {
          return prev;
        }
        return prev.concat(arg);
      }, []);
    };
  }
});

// node_modules/.pnpm/string.fromcodepoint@0.2.1/node_modules/string.fromcodepoint/fromcodepoint.js
var require_fromcodepoint = __commonJS({
  "node_modules/.pnpm/string.fromcodepoint@0.2.1/node_modules/string.fromcodepoint/fromcodepoint.js"() {
    "use strict";
    if (!String.fromCodePoint) {
      (function() {
        var defineProperty = (function() {
          try {
            var object = {};
            var $defineProperty = Object.defineProperty;
            var result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {
          }
          return result;
        })();
        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        var fromCodePoint = function(_) {
          var MAX_SIZE = 16384;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = arguments.length;
          if (!length) {
            return "";
          }
          var result = "";
          while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 1114111 || // not a valid Unicode code point
            floor(codePoint) != codePoint) {
              throw RangeError("Invalid code point: " + codePoint);
            }
            if (codePoint <= 65535) {
              codeUnits.push(codePoint);
            } else {
              codePoint -= 65536;
              highSurrogate = (codePoint >> 10) + 55296;
              lowSurrogate = codePoint % 1024 + 56320;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        };
        if (defineProperty) {
          defineProperty(String, "fromCodePoint", {
            "value": fromCodePoint,
            "configurable": true,
            "writable": true
          });
        } else {
          String.fromCodePoint = fromCodePoint;
        }
      })();
    }
  }
});

// node_modules/.pnpm/unescape-js@1.1.4/node_modules/unescape-js/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/unescape-js@1.1.4/node_modules/unescape-js/dist/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    require_fromcodepoint();
    var jsEscapeRegex = /\\(u\{([0-9A-Fa-f]+)\}|u([0-9A-Fa-f]{4})|x([0-9A-Fa-f]{2})|([1-7][0-7]{0,2}|[0-7]{2,3})|(['"tbrnfv0\\]))|\\U([0-9A-Fa-f]{8})/g;
    var usualEscapeSequences = {
      "0": "\0",
      "b": "\b",
      "f": "\f",
      "n": "\n",
      "r": "\r",
      "t": "	",
      "v": "\v",
      "'": "'",
      '"': '"',
      "\\": "\\"
    };
    var fromHex = function fromHex2(str) {
      return String.fromCodePoint(parseInt(str, 16));
    };
    var fromOct = function fromOct2(str) {
      return String.fromCodePoint(parseInt(str, 8));
    };
    var _default = function _default2(string) {
      return string.replace(jsEscapeRegex, function(_, __, varHex, longHex, shortHex, octal, specialCharacter, python) {
        if (varHex !== void 0) {
          return fromHex(varHex);
        } else if (longHex !== void 0) {
          return fromHex(longHex);
        } else if (shortHex !== void 0) {
          return fromHex(shortHex);
        } else if (octal !== void 0) {
          return fromOct(octal);
        } else if (python !== void 0) {
          return fromHex(python);
        } else {
          return usualEscapeSequences[specialCharacter];
        }
      });
    };
    exports2.default = _default;
    module2.exports = exports2.default;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/quote-removal.js
var require_quote_removal = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/quote-removal.js"(exports2, module2) {
    "use strict";
    var parse2 = require_shell_quote_word();
    var unescape = require_dist();
    var map = require_map_iterable();
    var tokens = require_tokens();
    function unquote(text) {
      const unquoted = parse2(text);
      if (unquoted.length === 0) {
        return text;
      }
      if (unquoted[0].comment) {
        return "";
      }
      return unescape(unquoted[0]);
    }
    function unresolvedExpansions(token) {
      if (!token.expansion) {
        return false;
      }
      const unresolved = token.expansion.filter((xp) => !xp.resolved);
      return unresolved.length > 0;
    }
    module2.exports = () => map((token) => {
      if (token.is("WORD") || token.is("ASSIGNMENT_WORD")) {
        if (!unresolvedExpansions(token)) {
          return tokens.setValue(token, unquote(token.value));
        }
      }
      return token;
    });
  }
});

// node_modules/.pnpm/iterable-lookahead@1.0.0/node_modules/iterable-lookahead/index.js
var require_iterable_lookahead = __commonJS({
  "node_modules/.pnpm/iterable-lookahead@1.0.0/node_modules/iterable-lookahead/index.js"(exports2, module2) {
    "use strict";
    function lookahead(iterable, size) {
      if (size === void 0) {
        size = 1;
      }
      if (typeof size !== "number" && !(size instanceof Number)) {
        throw new TypeError("Size argument must be a number");
      }
      if (size < 1) {
        throw new RangeError("Size argument must be greater than 0");
      }
      const behindCache = new Array(size + 1);
      const aheadCache = [];
      const iterator = iterable[Symbol.iterator]();
      return {
        ahead(idx) {
          if (idx > size) {
            throw new RangeError(`Cannot look ahead of ${idx} position, currently depth is ${size}`);
          }
          if (idx < 1) {
            throw new RangeError("Look ahead index must be greater than 0");
          }
          return aheadCache[idx - 1];
        },
        behind(idx) {
          if (idx > size) {
            throw new RangeError(`Cannot look behind of ${idx} position, currently depth is ${size}`);
          }
          if (idx < 1) {
            throw new RangeError("Look behind index must be greater than 0");
          }
          return behindCache[idx];
        },
        [Symbol.iterator]() {
          return this;
        },
        next() {
          let item = iterator.next();
          while (!item.done && aheadCache.length <= size) {
            aheadCache.push(item.value);
            item = iterator.next();
          }
          if (!item.done) {
            aheadCache.push(item.value);
          }
          if (item.done && aheadCache.length === 0) {
            return { done: true };
          }
          const value = aheadCache.shift();
          behindCache.unshift(value);
          behindCache.pop();
          return { done: false, value };
        }
      };
    }
    lookahead.depth = (size) => (iterable) => lookahead(iterable, size);
    lookahead.spread = function lookaheadSpread(iterable, size) {
      const it = lookahead(iterable, size);
      it._next = it.next;
      it.next = function() {
        let item = this._next();
        if (!item.done) {
          item.value = [item.value, it];
        }
        return item;
      };
      return it;
    };
    module2.exports = lookahead;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/identify-simplecommand-names.js
var require_identify_simplecommand_names = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/identify-simplecommand-names.js"(exports2, module2) {
    "use strict";
    var lookahead = require_iterable_lookahead();
    var compose = require_compose_function();
    var map = require_map_iterable();
    var isValidName = require_is_valid_name();
    function couldEndSimpleCommand(scTk) {
      return scTk && (scTk.is("SEPARATOR_OP") || scTk.is("NEWLINE") || scTk.is("NEWLINE_LIST") || scTk.value === ";" || scTk.is("PIPE") || scTk.is("OR_IF") || scTk.is("PIPE") || scTk.is("AND_IF"));
    }
    function couldBeCommandName(tk) {
      return tk && tk.is("WORD") && isValidName(tk.value);
    }
    module2.exports = (options, mode) => compose(
      map((tk, idx, iterable) => {
        if (tk._.maybeStartOfSimpleCommand) {
          if (couldBeCommandName(tk)) {
            tk._.maybeSimpleCommandName = true;
          } else {
            const next = iterable.ahead(1);
            if (next && !couldEndSimpleCommand(next)) {
              next._.commandNameNotFoundYet = true;
            }
          }
        }
        if (tk._.commandNameNotFoundYet) {
          const last = iterable.behind(1);
          if (!mode.enums.IOFileOperators.isOperator(last) && couldBeCommandName(tk)) {
            tk._.maybeSimpleCommandName = true;
          } else {
            const next = iterable.ahead(1);
            if (next && !couldEndSimpleCommand(next)) {
              next._.commandNameNotFoundYet = true;
            }
          }
          delete tk._.commandNameNotFoundYet;
        }
        return tk;
      }),
      lookahead
    );
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/identify-maybe-simple-commands.js
var require_identify_maybe_simple_commands = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/identify-maybe-simple-commands.js"(exports2, module2) {
    "use strict";
    var values = require_object_values();
    var compose = require_compose_function();
    var map = require_map_iterable();
    var lookahead = require_iterable_lookahead();
    module2.exports = function identifyMaybeSimpleCommands(options, mode) {
      return compose(map((tk, idx, iterable) => {
        const last = iterable.behind(1) || { EMPTY: true, is: (type) => type === "EMPTY" };
        tk._.maybeStartOfSimpleCommand = Boolean(
          last.is("EMPTY") || last.is("SEPARATOR_OP") || last.is("OPEN_PAREN") || last.is("CLOSE_PAREN") || last.is("NEWLINE") || last.is("NEWLINE_LIST") || last.is("TOKEN") === ";" || last.is("PIPE") || last.is("DSEMI") || last.is("OR_IF") || last.is("PIPE") || last.is("AND_IF") || !last.is("For") && !last.is("In") && !last.is("Case") && values(mode.enums.reservedWords).some((word) => last.is(word))
        );
        return tk;
      }), lookahead);
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/operator-tokens.js
var require_operator_tokens = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/operator-tokens.js"(exports2, module2) {
    "use strict";
    var hasOwnProperty = require_has_own_property();
    var map = require_map_iterable();
    var tokens = require_tokens();
    var reduceToOperatorTokenVisitor = (operators) => ({
      OPERATOR(tk) {
        if (hasOwnProperty(operators, tk.value)) {
          return tokens.changeTokenType(
            tk,
            operators[tk.value],
            tk.value
          );
        }
        return tk;
      }
    });
    module2.exports = (options, mode) => map(
      tokens.applyTokenizerVisitor(reduceToOperatorTokenVisitor(mode.enums.operators))
    );
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/reserved-words.js
var require_reserved_words = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/reserved-words.js"(exports2, module2) {
    "use strict";
    var hasOwnProperty = require_has_own_property();
    var values = require_object_values();
    var compose = require_compose_function();
    var map = require_map_iterable();
    var lookahead = require_iterable_lookahead();
    function isValidReservedWordPosition(tk, iterable, words) {
      const last = iterable.behind(1) || { EMPTY: true, is: (type) => type === "EMPTY" };
      const twoAgo = iterable.behind(2) || { EMPTY: true, is: (type) => type === "EMPTY" };
      const startOfCommand = last.is("EMPTY") || last.is("SEPARATOR_OP") || last.is("OPEN_PAREN") || last.is("CLOSE_PAREN") || last.is("NEWLINE") || last.is("NEWLINE_LIST") || last.is("DSEMI") || last.value === ";" || last.is("PIPE") || last.is("OR_IF") || last.is("PIPE") || last.is("AND_IF");
      const lastIsReservedWord = !last.value === "for" && !last.value === "in" && !last.value === "case" && values(words).some((word) => last.is(word));
      const thirdInCase = twoAgo.value === "case" && tk.is("TOKEN") && tk.value.toLowerCase() === "in";
      const thirdInFor = twoAgo.value === "for" && tk.is("TOKEN") && (tk.value.toLowerCase() === "in" || tk.value.toLowerCase() === "do");
      return tk.value === "}" || startOfCommand || lastIsReservedWord || thirdInFor || thirdInCase;
    }
    module2.exports = function reservedWords(options, mode) {
      return compose(map((tk, idx, iterable) => {
        if (isValidReservedWordPosition(tk, iterable, mode.enums.reservedWords) && hasOwnProperty(mode.enums.reservedWords, tk.value)) {
          return tk.changeTokenType(mode.enums.reservedWords[tk.value], tk.value);
        }
        if (tk.is("TOKEN")) {
          return tk.changeTokenType("WORD", tk.value);
        }
        return tk;
      }), lookahead.depth(2));
    };
  }
});

// node_modules/.pnpm/filter-iterator@0.0.1/node_modules/filter-iterator/index.js
var require_filter_iterator = __commonJS({
  "node_modules/.pnpm/filter-iterator@0.0.1/node_modules/filter-iterator/index.js"(exports2, module2) {
    "use strict";
    module2.exports = filterIterator;
    function* filterIterator(xs, pred) {
      for (let x of xs) {
        if (pred(x)) yield x;
      }
    }
  }
});

// node_modules/.pnpm/reverse-arguments@1.0.0/node_modules/reverse-arguments/index.js
var require_reverse_arguments = __commonJS({
  "node_modules/.pnpm/reverse-arguments@1.0.0/node_modules/reverse-arguments/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function reverseArgs(fn2, scope) {
      return function() {
        var args2 = Array.prototype.slice.call(arguments);
        return fn2.apply(scope || this, args2.reverse());
      };
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/filter.js
var require_filter = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/filter.js"(exports2, module2) {
    "use strict";
    var filterIterator = require_filter_iterator();
    var reverse = require_reverse_arguments();
    var curry2 = require_curry();
    var filter = curry2.to(2, reverse(filterIterator));
    module2.exports = filter;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/non-null.js
var require_non_null = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/utils/non-null.js"(exports2, module2) {
    "use strict";
    var filter = require_filter();
    var nonNull = (tk) => {
      return tk !== null;
    };
    module2.exports = filter(nonNull);
    filter.predicate = nonNull;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/separator.js
var require_separator = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/separator.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var map = require_map_iterable();
    var lookahead = require_iterable_lookahead();
    var tokens = require_tokens();
    var filterNonNull = require_non_null();
    var isSeparator = (tk) => tk && (tk.is("NEWLINE") || tk.is("NEWLINE_LIST") || tk.is("AND") || tk.is("SEMICOLON") || tk.is("OPERATOR") && tk.value === ";" || tk.is("OPERATOR") && tk.value === "&");
    function toSeparatorToken(tk, iterable) {
      if (skipJoined(tk) === null) {
        return null;
      }
      let newTk = tokens.changeTokenType(
        tk,
        "SEPARATOR_OP",
        tk.value
      );
      let i = 1;
      let nextTk = iterable.ahead(i);
      while (isSeparator(nextTk)) {
        nextTk._.joinedToSeparator = true;
        i++;
        newTk = newTk.appendTo(nextTk.value);
        nextTk = iterable.ahead(i);
      }
      return newTk;
    }
    function skipJoined(tk) {
      if (tk._.joinedToSeparator) {
        return null;
      }
      return tk;
    }
    var AccumulateSeparators = {
      NEWLINE: skipJoined,
      NEWLINE_LIST: skipJoined,
      SEMICOLON: toSeparatorToken,
      AND: toSeparatorToken,
      OPERATOR: (tk, iterable) => tk.value === "&" || tk.value === ";" ? toSeparatorToken(tk, iterable) : tk
    };
    module2.exports = () => compose(
      filterNonNull,
      map(
        tokens.applyTokenizerVisitor(AccumulateSeparators)
      ),
      lookahead.depth(10)
    );
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/linebreak-in.js
var require_linebreak_in = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/linebreak-in.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var map = require_map_iterable();
    var lookahead = require_iterable_lookahead();
    var tokens = require_tokens();
    var filterNonNull = require_non_null();
    var ReplaceWithLineBreakIn = {
      NEWLINE_LIST(tk, iterable) {
        const nextToken = iterable.ahead(1) || tokens.mkToken("EMPTY");
        if (nextToken.is("In")) {
          return tokens.changeTokenType(
            tk,
            "LINEBREAK_IN",
            "\nin"
          );
        }
        return tk;
      },
      In(tk, iterable) {
        const lastToken = iterable.behind(1) || tokens.mkToken("EMPTY");
        if (lastToken.is("NEWLINE_LIST")) {
          return null;
        }
        return tk;
      }
    };
    module2.exports = () => compose(
      filterNonNull,
      map(
        tokens.applyTokenizerVisitor(ReplaceWithLineBreakIn)
      ),
      lookahead
    );
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/for-name-variable.js
var require_for_name_variable = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/for-name-variable.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var map = require_map_iterable();
    var lookahead = require_iterable_lookahead();
    var isValidName = require_is_valid_name();
    module2.exports = function forNameVariable() {
      return compose(map((tk, idx, iterable) => {
        let lastToken = iterable.behind(1) || { is: () => false };
        if (lastToken.is("For") && tk.is("WORD") && isValidName(tk.value)) {
          return tk.changeTokenType("NAME", tk.value);
        }
        return tk;
      }), lookahead);
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/function-name.js
var require_function_name = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/function-name.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var map = require_map_iterable();
    var lookahead = require_iterable_lookahead();
    module2.exports = function functionName() {
      return compose(map((tk, idx, iterable) => {
        if (tk._.maybeStartOfSimpleCommand && tk.is("WORD") && iterable.ahead(2) && iterable.ahead(1).is("OPEN_PAREN") && iterable.ahead(2).is("CLOSE_PAREN")) {
          tk = tk.changeTokenType("NAME", tk.value);
        }
        return tk;
      }), lookahead.depth(2));
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/io-number.js
var require_io_number = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/io-number.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var map = require_map_iterable();
    var lookahead = require_iterable_lookahead();
    module2.exports = function ioNumber(options, mode) {
      return compose(map((tk, idx, iterable) => {
        const next = iterable.ahead(1);
        if (tk && tk.is("WORD") && tk.value.match(/^[0-9]+$/) && mode.enums.IOFileOperators.isOperator(next)) {
          return tk.changeTokenType("IO_NUMBER", tk.value);
        }
        return tk;
      }), lookahead);
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/new-line-list.js
var require_new_line_list = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/new-line-list.js"(exports2, module2) {
    "use strict";
    var compose = require_compose_function();
    var map = require_map_iterable();
    var lookahead = require_iterable_lookahead();
    var tokens = require_tokens();
    var filterNonNull = require_non_null();
    var SkipRepeatedNewLines = {
      NEWLINE(tk, iterable) {
        const lastToken = iterable.behind(1) || tokens.mkToken("EMPTY");
        if (lastToken.is("NEWLINE")) {
          return null;
        }
        return tokens.changeTokenType(tk, "NEWLINE_LIST", "\n");
      }
    };
    module2.exports = () => compose(
      filterNonNull,
      map(
        tokens.applyTokenizerVisitor(SkipRepeatedNewLines)
      ),
      lookahead
    );
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/assignment-word.js
var require_assignment_word = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/assignment-word.js"(exports2, module2) {
    "use strict";
    var map = require_map_iterable();
    var isValidName = require_is_valid_name();
    module2.exports = function assignmentWord() {
      return map((tk, idx, ctx) => {
        if (tk._.maybeStartOfSimpleCommand) {
          ctx.commandPrefixNotAllowed = false;
        }
        if (!ctx.commandPrefixNotAllowed && tk.is("WORD") && tk.value.indexOf("=") > 0 && // left part must be a valid name
        isValidName(tk.value.slice(0, tk.value.indexOf("=")))) {
          return tk.changeTokenType("ASSIGNMENT_WORD", tk.value);
        }
        ctx.commandPrefixNotAllowed = true;
        return tk;
      });
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/syntaxerror-oncontinue.js
var require_syntaxerror_oncontinue = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/syntaxerror-oncontinue.js"(exports2, module2) {
    "use strict";
    var map = require_map_iterable();
    module2.exports = function syntaxerrorOnContinue() {
      return map((tk) => {
        if (tk && tk.is("CONTINUE")) {
          throw new SyntaxError("Unclosed " + tk.value);
        }
        return tk;
      });
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/index.js
var require_rules = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/rules/index.js"(exports2) {
    "use strict";
    exports2.parameterExpansion = require_parameter_expansion();
    exports2.commandExpansion = require_command_expansion();
    exports2.arithmeticExpansion = require_arithmetic_expansion();
    exports2.aliasSubstitution = require_alias_substitution2();
    exports2.defaultNodeType = require_default_node_type();
    exports2.fieldSplitting = require_field_splitting();
    exports2.tildeExpanding = require_tilde_expanding();
    exports2.pathExpansion = require_path_expansion();
    exports2.quoteRemoval = require_quote_removal();
    exports2.identifySimpleCommandNames = require_identify_simplecommand_names();
    exports2.identifyMaybeSimpleCommands = require_identify_maybe_simple_commands();
    exports2.operatorTokens = require_operator_tokens();
    exports2.reservedWords = require_reserved_words();
    exports2.separator = require_separator();
    exports2.linebreakIn = require_linebreak_in();
    exports2.forNameVariable = require_for_name_variable();
    exports2.functionName = require_function_name();
    exports2.ioNumber = require_io_number();
    exports2.newLineList = require_new_line_list();
    exports2.assignmentWord = require_assignment_word();
    exports2.syntaxerrorOnContinue = require_syntaxerror_oncontinue();
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/grammar.js
var require_grammar = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/grammar.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      start: "complete_command",
      bnf: {
        complete_command: [
          [
            "list separator EOF",
            " return yy.checkAsync($list, $separator)"
          ],
          [
            "list EOF",
            " return $list "
          ],
          [
            "separator list EOF",
            " return $list "
          ],
          [
            "separator list separator EOF",
            " return yy.checkAsync($list, $separator)"
          ]
        ],
        list: [
          [
            "list separator and_or",
            "$$ = yy.listAppend($list, $and_or, $separator);"
          ],
          [
            "and_or",
            "$$ = yy.list($and_or);"
          ]
        ],
        and_or: [
          [
            "pipeline",
            "$$ = $pipeline;"
          ],
          [
            "and_or AND_IF linebreak pipeline",
            "$$ = yy.andAndOr($and_or, $pipeline);"
          ],
          [
            "and_or OR_IF linebreak pipeline",
            "$$ = yy.orAndOr($and_or, $pipeline);"
          ]
        ],
        pipeline: [
          [
            "pipe_sequence",
            "$$ = yy.pipeLine($pipe_sequence);"
          ],
          [
            "Bang pipe_sequence",
            "$$ = yy.bangPipeLine($pipe_sequence);"
          ]
        ],
        pipe_sequence: [
          [
            "command",
            "$$ = yy.pipeSequence($command);"
          ],
          [
            "pipe_sequence PIPE linebreak command",
            "$$ = yy.pipeSequenceAppend($pipe_sequence, $command);"
          ]
        ],
        command: [
          "simple_command",
          "compound_command",
          [
            "compound_command redirect_list",
            "$$ = yy.addRedirections($compound_command, $redirect_list)"
          ],
          "function_definition"
        ],
        compound_command: [
          "brace_group",
          "subshell",
          "for_clause",
          "case_clause",
          "if_clause",
          "while_clause",
          "until_clause"
        ],
        subshell: [
          [
            "OPEN_PAREN compound_list CLOSE_PAREN",
            "$$ = yy.subshell($compound_list, $OPEN_PAREN.loc, $CLOSE_PAREN.loc);"
          ]
        ],
        compound_list: [
          [
            "term",
            "$$ = $term;"
          ],
          [
            "NEWLINE_LIST term",
            "$$ = $term;"
          ],
          [
            "term separator",
            "$$ = yy.checkAsync($term, $separator);"
          ],
          [
            "NEWLINE_LIST term separator",
            "$$ = yy.checkAsync($term, $separator);"
          ]
        ],
        term: [
          [
            "term separator and_or",
            "$$ = yy.termAppend($term, $and_or, $separator);"
          ],
          [
            "and_or",
            "$$ = yy.term($and_or);"
          ]
        ],
        for_clause: [
          [
            "For name linebreak do_group",
            "$$ = yy.forClauseDefault($name, $do_group, $For.loc);"
          ],
          [
            "For name LINEBREAK_IN separator do_group",
            "$$ = yy.forClauseDefault($name, $do_group, $For.loc);"
          ],
          [
            "For name In separator do_group",
            "$$ = yy.forClauseDefault($name, $do_group, $For.loc);"
          ],
          [
            "For name in wordlist separator do_group",
            "$$ = yy.forClause($name, $wordlist, $do_group, $For.loc);"
            /* todo: here allow only ';' separator */
          ]
        ],
        name: [
          "NAME"
        ],
        in: [
          "In"
        ],
        wordlist: [
          "wordlist_repetition_plus0"
        ],
        case_clause: [
          [
            "Case WORD linebreak in linebreak case_list Esac",
            "$$ = yy.caseClause($WORD, $case_list, $Case.loc, $Esac.loc);"
          ],
          [
            "Case WORD linebreak in linebreak case_list_ns Esac",
            "$$ = yy.caseClause($WORD, $case_list_ns, $Case.loc, $Esac.loc);"
          ],
          [
            "Case WORD linebreak in linebreak Esac",
            "$$ = yy.caseClause($WORD, null, $Case.loc, $Esac.loc);"
          ]
        ],
        case_list_ns: [
          [
            "case_list case_item_ns",
            "$$ = yy.caseListAppend($case_list, $case_item_ns);"
          ],
          [
            "case_item_ns",
            "$$ = yy.caseList($case_item_ns);"
          ]
        ],
        case_list: [
          [
            "case_list case_item",
            "$$ = yy.caseListAppend($case_list, $case_item);"
          ],
          [
            "case_item",
            "$$ = yy.caseList($case_item);"
          ]
        ],
        case_item_ns: [
          [
            "pattern CLOSE_PAREN linebreak",
            "$$ = yy.caseItem($pattern, null, $pattern[0].loc, $CLOSE_PAREN.loc);"
          ],
          [
            "pattern CLOSE_PAREN compound_list linebreak",
            "$$ = yy.caseItem($pattern, $compound_list, $pattern[0].loc, $compound_list.loc);"
          ],
          [
            "OPEN_PAREN pattern CLOSE_PAREN linebreak",
            "$$ = yy.caseItem($pattern, null, $OPEN_PAREN.loc, $CLOSE_PAREN.loc );"
          ],
          [
            "OPEN_PAREN pattern CLOSE_PAREN compound_list linebreak",
            "$$ = yy.caseItem($pattern, $compound_list, $OPEN_PAREN.loc, $compound_list.loc);"
          ]
        ],
        case_item: [
          [
            "pattern CLOSE_PAREN linebreak DSEMI linebreak",
            "$$ = yy.caseItem($pattern, null, $pattern[0].loc, $DSEMI.loc);"
          ],
          [
            "pattern CLOSE_PAREN compound_list DSEMI linebreak",
            "$$ = yy.caseItem($pattern, $compound_list, $pattern[0].loc, $DSEMI.loc);"
          ],
          [
            "OPEN_PAREN pattern CLOSE_PAREN linebreak DSEMI linebreak",
            "$$ = yy.caseItem($pattern, null, $OPEN_PAREN.loc, $DSEMI.loc );"
          ],
          [
            "OPEN_PAREN pattern CLOSE_PAREN compound_list DSEMI linebreak",
            "$$ = yy.caseItem($pattern, $compound_list, $OPEN_PAREN.loc, $DSEMI.loc);"
          ]
        ],
        pattern: [
          [
            "WORD",
            "$$ = yy.pattern($WORD);"
          ],
          [
            "pattern PIPE WORD",
            "$$ = yy.patternAppend($pattern, $WORD);"
          ]
        ],
        if_clause: [
          [
            "If compound_list Then compound_list else_part Fi",
            "$$ = yy.ifClause($2, $4, $else_part, $If.loc, $Fi.loc);"
          ],
          [
            "If compound_list Then compound_list Fi",
            "$$ = yy.ifClause($2, $4, null, $If.loc, $Fi.loc);"
          ]
        ],
        else_part: [
          [
            "Elif compound_list Then compound_list",
            "$$ = yy.ifClause($2, $4, null, $Elif.loc, $4.loc);"
          ],
          [
            "Elif compound_list Then compound_list else_part",
            "$$ = yy.ifClause($2, $4, $else_part, $Elif.loc, $else_part.loc);"
          ],
          [
            "Else compound_list",
            "$$ = yy.elseClause($compound_list, $Else);"
          ]
        ],
        while_clause: [
          [
            "While compound_list do_group",
            "$$ = yy.while($2, $3, $While);"
          ]
        ],
        until_clause: [
          [
            "Until compound_list do_group",
            "$$ = yy.until($2, $3, $Until);"
          ]
        ],
        function_definition: [
          [
            "fname OPEN_PAREN CLOSE_PAREN linebreak function_body",
            "$$ = yy.functionDefinition($fname, $function_body);"
          ]
        ],
        function_body: [
          [
            "compound_command",
            "$$ = [$compound_command, null];"
          ],
          [
            "compound_command redirect_list",
            "$$ = [$compound_command, $redirect_list];"
          ]
        ],
        fname: [
          "NAME"
        ],
        brace_group: [
          [
            "Lbrace compound_list Rbrace",
            "$$ = yy.braceGroup($compound_list, $Lbrace.loc, $Rbrace.loc);"
          ]
        ],
        do_group: [
          [
            "Do compound_list Done",
            "$$ = yy.doGroup($compound_list, $Do.loc, $Done.loc);"
          ]
        ],
        simple_command: [
          [
            "cmd_prefix cmd_word cmd_suffix",
            "$$ =yy.command($cmd_prefix, $cmd_word, $cmd_suffix);"
          ],
          [
            "cmd_prefix cmd_word",
            "$$ =yy.command($cmd_prefix, $cmd_word, null);"
          ],
          [
            "cmd_prefix",
            "$$ =yy.commandAssignment($cmd_prefix);"
          ],
          [
            "cmd_name cmd_suffix",
            "$$ =yy.command(null, $cmd_name, $cmd_suffix);"
          ],
          [
            "cmd_name",
            "$$ =yy.command(null, $cmd_name);"
          ]
        ],
        cmd_name: [
          [
            "WORD",
            "$$ =yy.commandName(yytext) /* Apply rule 7a */;"
          ]
        ],
        cmd_word: [
          [
            "WORD",
            "$$ = yytext	/* Apply rule 7B */;"
          ]
        ],
        cmd_prefix: [
          [
            "io_redirect",
            "$$ = yy.prefix($io_redirect);"
          ],
          [
            "cmd_prefix io_redirect",
            "$$ = yy.prefixAppend($1, $2);"
          ],
          [
            "ASSIGNMENT_WORD",
            "$$ = yy.prefix($1);"
          ],
          [
            "cmd_prefix ASSIGNMENT_WORD",
            "$$ = yy.prefixAppend($1, $2);"
          ]
        ],
        cmd_suffix: [
          [
            "io_redirect",
            "$$ = yy.suffix($io_redirect);"
          ],
          [
            "cmd_suffix io_redirect",
            "$$ = yy.suffixAppend($cmd_suffix, $io_redirect);"
          ],
          [
            "WORD",
            "$$ = yy.suffix($1);"
          ],
          [
            "cmd_suffix WORD",
            "$$ = yy.suffixAppend($cmd_suffix, $2);"
          ]
        ],
        redirect_list: [
          [
            "io_redirect",
            "$$ = [$io_redirect];"
          ],
          [
            "redirect_list io_redirect",
            "$$ = $redirect_list.concat($io_redirect);"
          ]
        ],
        io_redirect: [
          [
            "io_file",
            "$$ = $io_file;"
          ],
          [
            "IO_NUMBER io_file",
            "$$ = yy.numberIoRedirect($io_file, $1);"
          ],
          "io_here",
          "IO_NUMBER io_here"
        ],
        io_file: [
          [
            "LESS filename",
            "$$ =yy.ioRedirect($1, $filename);"
          ],
          [
            "LESSAND filename",
            "$$ =yy.ioRedirect($1, $filename);"
          ],
          [
            "GREAT filename",
            "$$ =yy.ioRedirect($1, $filename);"
          ],
          [
            "GREATAND filename",
            "$$ =yy.ioRedirect($1, $filename);"
          ],
          [
            "DGREAT filename",
            "$$ =yy.ioRedirect($1, $filename);"
          ],
          [
            "LESSGREAT filename",
            "$$ =yy.ioRedirect($1, $filename);"
          ],
          [
            "CLOBBER filename",
            "$$ =yy.ioRedirect($1, $filename);"
          ]
        ],
        filename: [
          "WORD"
        ],
        io_here: [
          "DLESS here_end",
          "DLESSDASH here_end"
        ],
        here_end: [
          "WORD"
        ],
        linebreak: [
          "NEWLINE_LIST",
          ""
        ],
        separator: [
          "SEPARATOR_OP",
          "NEWLINE_LIST"
        ],
        wordlist_repetition_plus0: [
          [
            "WORD",
            "$$ = [$1];"
          ],
          [
            "wordlist_repetition_plus0 WORD",
            "$1.push($2);"
          ]
        ]
      }
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/io-file-operators.js
var require_io_file_operators = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/io-file-operators.js"(exports2, module2) {
    "use strict";
    var ioFileOperators = module2.exports = [
      "LESS",
      "DLESS",
      "DGREAT",
      "LESSAND",
      "GREATAND",
      "GREAT",
      "LESSGREAT",
      "CLOBBER"
    ];
    ioFileOperators.isOperator = function isOperator(tk) {
      for (const op of ioFileOperators) {
        if (tk.type === op) {
          return true;
        }
      }
      return false;
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/parameter-operators.js
var require_parameter_operators = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/parameter-operators.js"(exports2, module2) {
    "use strict";
    var name = "[a-zA-Z_][a-zA-Z0-9_]*";
    var parameterOps = {
      [`^(${name}):\\-(.*)$`]: {
        op: "useDefaultValue",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name}):\\=(.*)$`]: {
        op: "assignDefaultValue",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name}):\\?(.*)$`]: {
        op: "indicateErrorIfNull",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name}):\\+(.*)$`]: {
        op: "useAlternativeValue",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name})\\-(.*)$`]: {
        op: "useDefaultValueIfUnset",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name})\\=(.*)$`]: {
        op: "assignDefaultValueIfUnset",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name})\\?(.*)$`]: {
        op: "indicateErrorIfUnset",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name})\\+(.*)$`]: {
        op: "useAlternativeValueIfUnset",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name})\\%\\%(.*)$`]: {
        op: "removeLargestSuffixPattern",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name})\\#\\#(.*)$`]: {
        op: "removeLargestPrefixPattern",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name})\\%(.*)$`]: {
        op: "removeSmallestSuffixPattern",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^(${name})\\#(.*)$`]: {
        op: "removeSmallestPrefixPattern",
        parameter: (m) => m[1],
        word: (m) => m[2],
        expand: ["word"]
      },
      [`^\\#(${name})$`]: {
        op: "stringLength",
        parameter: (m) => m[1]
      },
      [`^([1-9][0-9]*)$`]: {
        kind: "positional",
        parameter: (m) => Number(m[1])
      },
      "^!$": {
        kind: "last-background-pid"
      },
      "^\\@$": {
        kind: "positional-list"
      },
      "^\\-$": {
        kind: "current-option-flags"
      },
      "^\\#$": {
        kind: "positional-count"
      },
      "^\\?$": {
        kind: "last-exit-status"
      },
      "^\\*$": {
        kind: "positional-string"
      },
      "^\\$$": {
        kind: "shell-process-id"
      },
      "^0$": {
        kind: "shell-script-name"
      }
    };
    module2.exports = parameterOps;
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/reserved-words.js
var require_reserved_words2 = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/reserved-words.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      "if": "If",
      "then": "Then",
      "else": "Else",
      "elif": "Elif",
      "fi": "Fi",
      "do": "Do",
      "done": "Done",
      "case": "Case",
      "esac": "Esac",
      "while": "While",
      "until": "Until",
      "for": "For",
      "in": "In",
      "{": "Lbrace",
      "}": "Rbrace",
      "!": "Bang"
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/index.js
var require_enums = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/enums/index.js"(exports2) {
    "use strict";
    exports2.IOFileOperators = require_io_file_operators();
    exports2.operators = require_operators();
    exports2.parameterOperators = require_parameter_operators();
    exports2.reservedWords = require_reserved_words2();
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/built-grammar.js
var require_built_grammar = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/built-grammar.js"(exports2, module2) {
    "use strict";
    var parser = (function() {
      var o = function(k, v, o2, l) {
        for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v) ;
        return o2;
      }, $V0 = [1, 9], $V1 = [1, 28], $V2 = [1, 6], $V3 = [1, 29], $V4 = [1, 34], $V5 = [1, 30], $V6 = [1, 26], $V7 = [1, 31], $V8 = [1, 32], $V9 = [1, 33], $Va = [1, 27], $Vb = [1, 25], $Vc = [1, 36], $Vd = [1, 38], $Ve = [1, 39], $Vf = [1, 40], $Vg = [1, 41], $Vh = [1, 42], $Vi = [1, 43], $Vj = [1, 44], $Vk = [1, 45], $Vl = [1, 46], $Vm = [1, 5], $Vn = [6, 31, 84], $Vo = [1, 50], $Vp = [1, 51], $Vq = [6, 13, 27, 29, 31, 32, 39, 41, 42, 44, 49, 50, 51, 53, 54, 55, 56, 57, 60, 61, 62, 63, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83], $Vr = [6, 9, 11, 29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63, 84], $Vs = [1, 52], $Vt = [6, 9, 11, 15, 29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63, 84], $Vu = [1, 62], $Vv = [6, 9, 11, 15, 29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84], $Vw = [6, 9, 11, 15, 29, 31, 42, 44, 49, 51, 53, 54, 55, 61, 62, 63, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84], $Vx = [6, 9, 11, 15, 29, 31, 42, 44, 49, 51, 53, 54, 55, 61, 62, 63, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84], $Vy = [1, 66], $Vz = [1, 78], $VA = [1, 86], $VB = [13, 27, 32, 39, 41, 42, 50, 56, 57, 60, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83], $VC = [2, 102], $VD = [1, 93], $VE = [1, 99], $VF = [29, 44, 49, 51, 53, 54, 55, 61, 62, 63], $VG = [29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63, 84], $VH = [1, 112], $VI = [2, 101], $VJ = [29, 31, 44, 49, 51, 53, 54, 55, 61, 62, 63], $VK = [2, 37], $VL = [31, 42, 84], $VM = [27, 42, 44], $VN = [1, 140], $VO = [1, 141], $VP = [1, 151], $VQ = [1, 152], $VR = [1, 161], $VS = [15, 29], $VT = [44, 49], $VU = [1, 166];
      var parser2 = {
        trace: function trace() {
        },
        yy: {},
        symbols_: { "error": 2, "complete_command": 3, "list": 4, "separator": 5, "EOF": 6, "and_or": 7, "pipeline": 8, "AND_IF": 9, "linebreak": 10, "OR_IF": 11, "pipe_sequence": 12, "Bang": 13, "command": 14, "PIPE": 15, "simple_command": 16, "compound_command": 17, "redirect_list": 18, "function_definition": 19, "brace_group": 20, "subshell": 21, "for_clause": 22, "case_clause": 23, "if_clause": 24, "while_clause": 25, "until_clause": 26, "OPEN_PAREN": 27, "compound_list": 28, "CLOSE_PAREN": 29, "term": 30, "NEWLINE_LIST": 31, "For": 32, "name": 33, "do_group": 34, "LINEBREAK_IN": 35, "In": 36, "in": 37, "wordlist": 38, "NAME": 39, "wordlist_repetition_plus0": 40, "Case": 41, "WORD": 42, "case_list": 43, "Esac": 44, "case_list_ns": 45, "case_item_ns": 46, "case_item": 47, "pattern": 48, "DSEMI": 49, "If": 50, "Then": 51, "else_part": 52, "Fi": 53, "Elif": 54, "Else": 55, "While": 56, "Until": 57, "fname": 58, "function_body": 59, "Lbrace": 60, "Rbrace": 61, "Do": 62, "Done": 63, "cmd_prefix": 64, "cmd_word": 65, "cmd_suffix": 66, "cmd_name": 67, "io_redirect": 68, "ASSIGNMENT_WORD": 69, "io_file": 70, "IO_NUMBER": 71, "io_here": 72, "LESS": 73, "filename": 74, "LESSAND": 75, "GREAT": 76, "GREATAND": 77, "DGREAT": 78, "LESSGREAT": 79, "CLOBBER": 80, "DLESS": 81, "here_end": 82, "DLESSDASH": 83, "SEPARATOR_OP": 84, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 6: "EOF", 9: "AND_IF", 11: "OR_IF", 13: "Bang", 15: "PIPE", 27: "OPEN_PAREN", 29: "CLOSE_PAREN", 31: "NEWLINE_LIST", 32: "For", 35: "LINEBREAK_IN", 36: "In", 39: "NAME", 41: "Case", 42: "WORD", 44: "Esac", 49: "DSEMI", 50: "If", 51: "Then", 53: "Fi", 54: "Elif", 55: "Else", 56: "While", 57: "Until", 60: "Lbrace", 61: "Rbrace", 62: "Do", 63: "Done", 69: "ASSIGNMENT_WORD", 71: "IO_NUMBER", 73: "LESS", 75: "LESSAND", 76: "GREAT", 77: "GREATAND", 78: "DGREAT", 79: "LESSGREAT", 80: "CLOBBER", 81: "DLESS", 83: "DLESSDASH", 84: "SEPARATOR_OP" },
        productions_: [0, [3, 3], [3, 2], [3, 3], [3, 4], [4, 3], [4, 1], [7, 1], [7, 4], [7, 4], [8, 1], [8, 2], [12, 1], [12, 4], [14, 1], [14, 1], [14, 2], [14, 1], [17, 1], [17, 1], [17, 1], [17, 1], [17, 1], [17, 1], [17, 1], [21, 3], [28, 1], [28, 2], [28, 2], [28, 3], [30, 3], [30, 1], [22, 4], [22, 5], [22, 5], [22, 6], [33, 1], [37, 1], [38, 1], [23, 7], [23, 7], [23, 6], [45, 2], [45, 1], [43, 2], [43, 1], [46, 3], [46, 4], [46, 4], [46, 5], [47, 5], [47, 5], [47, 6], [47, 6], [48, 1], [48, 3], [24, 6], [24, 5], [52, 4], [52, 5], [52, 2], [25, 3], [26, 3], [19, 5], [59, 1], [59, 2], [58, 1], [20, 3], [34, 3], [16, 3], [16, 2], [16, 1], [16, 2], [16, 1], [67, 1], [65, 1], [64, 1], [64, 2], [64, 1], [64, 2], [66, 1], [66, 2], [66, 1], [66, 2], [18, 1], [18, 2], [68, 1], [68, 2], [68, 1], [68, 2], [70, 2], [70, 2], [70, 2], [70, 2], [70, 2], [70, 2], [70, 2], [74, 1], [72, 2], [72, 2], [82, 1], [10, 1], [10, 0], [5, 1], [5, 1], [40, 1], [40, 2]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return yy.checkAsync($$[$0 - 2], $$[$0 - 1]);
              break;
            case 2:
            case 3:
              return $$[$0 - 1];
              break;
            case 4:
              return yy.checkAsync($$[$0 - 2], $$[$0 - 3]);
              break;
            case 5:
              this.$ = yy.listAppend($$[$0 - 2], $$[$0], $$[$0 - 1]);
              break;
            case 6:
              this.$ = yy.list($$[$0]);
              break;
            case 7:
            case 26:
            case 27:
            case 86:
              this.$ = $$[$0];
              break;
            case 8:
              this.$ = yy.andAndOr($$[$0 - 3], $$[$0]);
              break;
            case 9:
              this.$ = yy.orAndOr($$[$0 - 3], $$[$0]);
              break;
            case 10:
              this.$ = yy.pipeLine($$[$0]);
              break;
            case 11:
              this.$ = yy.bangPipeLine($$[$0]);
              break;
            case 12:
              this.$ = yy.pipeSequence($$[$0]);
              break;
            case 13:
              this.$ = yy.pipeSequenceAppend($$[$0 - 3], $$[$0]);
              break;
            case 16:
              this.$ = yy.addRedirections($$[$0 - 1], $$[$0]);
              break;
            case 25:
              this.$ = yy.subshell($$[$0 - 1], $$[$0 - 2].loc, $$[$0].loc);
              break;
            case 28:
            case 29:
              this.$ = yy.checkAsync($$[$0 - 1], $$[$0]);
              break;
            case 30:
              this.$ = yy.termAppend($$[$0 - 2], $$[$0], $$[$0 - 1]);
              break;
            case 31:
              this.$ = yy.term($$[$0]);
              break;
            case 32:
              this.$ = yy.forClauseDefault($$[$0 - 2], $$[$0], $$[$0 - 3].loc);
              break;
            case 33:
            case 34:
              this.$ = yy.forClauseDefault($$[$0 - 3], $$[$0], $$[$0 - 4].loc);
              break;
            case 35:
              this.$ = yy.forClause($$[$0 - 4], $$[$0 - 2], $$[$0], $$[$0 - 5].loc);
              break;
            case 39:
            case 40:
              this.$ = yy.caseClause($$[$0 - 5], $$[$0 - 1], $$[$0 - 6].loc, $$[$0].loc);
              break;
            case 41:
              this.$ = yy.caseClause($$[$0 - 4], null, $$[$0 - 5].loc, $$[$0].loc);
              break;
            case 42:
            case 44:
              this.$ = yy.caseListAppend($$[$0 - 1], $$[$0]);
              break;
            case 43:
            case 45:
              this.$ = yy.caseList($$[$0]);
              break;
            case 46:
              this.$ = yy.caseItem($$[$0 - 2], null, $$[$0 - 2][0].loc, $$[$0 - 1].loc);
              break;
            case 47:
              this.$ = yy.caseItem($$[$0 - 3], $$[$0 - 1], $$[$0 - 3][0].loc, $$[$0 - 1].loc);
              break;
            case 48:
              this.$ = yy.caseItem($$[$0 - 2], null, $$[$0 - 3].loc, $$[$0 - 1].loc);
              break;
            case 49:
              this.$ = yy.caseItem($$[$0 - 3], $$[$0 - 1], $$[$0 - 4].loc, $$[$0 - 1].loc);
              break;
            case 50:
              this.$ = yy.caseItem($$[$0 - 4], null, $$[$0 - 4][0].loc, $$[$0 - 1].loc);
              break;
            case 51:
              this.$ = yy.caseItem($$[$0 - 4], $$[$0 - 2], $$[$0 - 4][0].loc, $$[$0 - 1].loc);
              break;
            case 52:
              this.$ = yy.caseItem($$[$0 - 4], null, $$[$0 - 5].loc, $$[$0 - 1].loc);
              break;
            case 53:
              this.$ = yy.caseItem($$[$0 - 4], $$[$0 - 2], $$[$0 - 5].loc, $$[$0 - 1].loc);
              break;
            case 54:
              this.$ = yy.pattern($$[$0]);
              break;
            case 55:
              this.$ = yy.patternAppend($$[$0 - 2], $$[$0]);
              break;
            case 56:
              this.$ = yy.ifClause($$[$0 - 4], $$[$0 - 2], $$[$0 - 1], $$[$0 - 5].loc, $$[$0].loc);
              break;
            case 57:
              this.$ = yy.ifClause($$[$0 - 3], $$[$0 - 1], null, $$[$0 - 4].loc, $$[$0].loc);
              break;
            case 58:
              this.$ = yy.ifClause($$[$0 - 2], $$[$0], null, $$[$0 - 3].loc, $$[$0].loc);
              break;
            case 59:
              this.$ = yy.ifClause($$[$0 - 3], $$[$0 - 1], $$[$0], $$[$0 - 4].loc, $$[$0].loc);
              break;
            case 60:
              this.$ = yy.elseClause($$[$0], $$[$0 - 1]);
              break;
            case 61:
              this.$ = yy.while($$[$0 - 1], $$[$0], $$[$0 - 2]);
              break;
            case 62:
              this.$ = yy.until($$[$0 - 1], $$[$0], $$[$0 - 2]);
              break;
            case 63:
              this.$ = yy.functionDefinition($$[$0 - 4], $$[$0]);
              break;
            case 64:
              this.$ = [$$[$0], null];
              break;
            case 65:
              this.$ = [$$[$0 - 1], $$[$0]];
              break;
            case 67:
              this.$ = yy.braceGroup($$[$0 - 1], $$[$0 - 2].loc, $$[$0].loc);
              break;
            case 68:
              this.$ = yy.doGroup($$[$0 - 1], $$[$0 - 2].loc, $$[$0].loc);
              break;
            case 69:
              this.$ = yy.command($$[$0 - 2], $$[$0 - 1], $$[$0]);
              break;
            case 70:
              this.$ = yy.command($$[$0 - 1], $$[$0], null);
              break;
            case 71:
              this.$ = yy.commandAssignment($$[$0]);
              break;
            case 72:
              this.$ = yy.command(null, $$[$0 - 1], $$[$0]);
              break;
            case 73:
              this.$ = yy.command(null, $$[$0]);
              break;
            case 74:
              this.$ = yy.commandName(yytext);
              break;
            case 75:
              this.$ = yytext;
              break;
            case 76:
            case 78:
              this.$ = yy.prefix($$[$0]);
              break;
            case 77:
            case 79:
              this.$ = yy.prefixAppend($$[$0 - 1], $$[$0]);
              break;
            case 80:
            case 82:
              this.$ = yy.suffix($$[$0]);
              break;
            case 81:
            case 83:
              this.$ = yy.suffixAppend($$[$0 - 1], $$[$0]);
              break;
            case 84:
            case 105:
              this.$ = [$$[$0]];
              break;
            case 85:
              this.$ = $$[$0 - 1].concat($$[$0]);
              break;
            case 87:
              this.$ = yy.numberIoRedirect($$[$0], $$[$0 - 1]);
              break;
            case 90:
            case 91:
            case 92:
            case 93:
            case 94:
            case 95:
            case 96:
              this.$ = yy.ioRedirect($$[$0 - 1], $$[$0]);
              break;
            case 106:
              $$[$0 - 1].push($$[$0]);
              break;
          }
        },
        table: [{ 3: 1, 4: 2, 5: 3, 7: 4, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 31: $V2, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl, 84: $Vm }, { 1: [3] }, { 5: 47, 6: [1, 48], 31: $V2, 84: $Vm }, { 4: 49, 7: 4, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o($Vn, [2, 6], { 9: $Vo, 11: $Vp }), o($Vq, [2, 103]), o($Vq, [2, 104]), o($Vr, [2, 7]), o($Vr, [2, 10], { 15: $Vs }), { 12: 53, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o($Vt, [2, 12]), o($Vt, [2, 14]), o($Vt, [2, 15], { 70: 35, 72: 37, 18: 54, 68: 55, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vt, [2, 17]), o($Vt, [2, 71], { 70: 35, 72: 37, 65: 56, 68: 57, 42: [1, 59], 69: [1, 58], 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vt, [2, 73], { 70: 35, 72: 37, 66: 60, 68: 61, 42: $Vu, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vv, [2, 18]), o($Vv, [2, 19]), o($Vv, [2, 20]), o($Vv, [2, 21]), o($Vv, [2, 22]), o($Vv, [2, 23]), o($Vv, [2, 24]), { 27: [1, 63] }, o($Vw, [2, 76]), o($Vw, [2, 78]), o($Vx, [2, 74]), { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 64, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 68, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 33: 69, 39: [1, 70] }, { 42: [1, 71] }, { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 72, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 73, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 74, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 27: [2, 66] }, o($Vw, [2, 86]), { 70: 75, 72: 76, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o($Vw, [2, 88]), { 42: $Vz, 74: 77 }, { 42: $Vz, 74: 79 }, { 42: $Vz, 74: 80 }, { 42: $Vz, 74: 81 }, { 42: $Vz, 74: 82 }, { 42: $Vz, 74: 83 }, { 42: $Vz, 74: 84 }, { 42: $VA, 82: 85 }, { 42: $VA, 82: 87 }, { 6: [1, 88], 7: 89, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 1: [2, 2] }, { 5: 91, 6: [1, 90], 31: $V2, 84: $Vm }, o($VB, $VC, { 10: 92, 31: $VD }), o($VB, $VC, { 10: 94, 31: $VD }), o([27, 32, 39, 41, 42, 50, 56, 57, 60, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83], $VC, { 10: 95, 31: $VD }), o($Vr, [2, 11], { 15: $Vs }), o($Vt, [2, 16], { 70: 35, 72: 37, 68: 96, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vv, [2, 84]), o($Vt, [2, 70], { 70: 35, 72: 37, 68: 61, 66: 97, 42: $Vu, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vw, [2, 77]), o($Vw, [2, 79]), o($Vx, [2, 75]), o($Vt, [2, 72], { 70: 35, 72: 37, 68: 98, 42: $VE, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vx, [2, 80]), o($Vx, [2, 82]), { 29: [1, 100] }, { 61: [1, 101] }, o($VF, [2, 26], { 5: 102, 31: $V2, 84: $Vm }), { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 30: 103, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o($VG, [2, 31], { 9: $Vo, 11: $Vp }), { 29: [1, 104] }, { 10: 105, 31: $VD, 35: [1, 106], 36: [1, 107], 37: 108, 62: $VC }, o([31, 35, 36, 62], [2, 36]), { 10: 109, 31: $VD, 36: $VC }, { 51: [1, 110] }, { 34: 111, 62: $VH }, { 34: 113, 62: $VH }, o($Vw, [2, 87]), o($Vw, [2, 89]), o($Vw, [2, 90]), o($Vw, [2, 97]), o($Vw, [2, 91]), o($Vw, [2, 92]), o($Vw, [2, 93]), o($Vw, [2, 94]), o($Vw, [2, 95]), o($Vw, [2, 96]), o($Vw, [2, 98]), o($Vw, [2, 100]), o($Vw, [2, 99]), { 1: [2, 1] }, o($Vn, [2, 5], { 9: $Vo, 11: $Vp }), { 1: [2, 3] }, { 6: [1, 114], 7: 89, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 8: 115, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o([13, 27, 32, 36, 39, 41, 42, 44, 50, 56, 57, 60, 62, 69, 71, 73, 75, 76, 77, 78, 79, 80, 81, 83], $VI), { 8: 116, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 14: 117, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o($Vv, [2, 85]), o($Vt, [2, 69], { 70: 35, 72: 37, 68: 98, 42: $VE, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vx, [2, 81]), o($Vx, [2, 83]), o([27, 32, 41, 50, 56, 57, 60], $VC, { 10: 118, 31: $VD }), o($Vv, [2, 67]), o($VJ, [2, 28], { 8: 7, 12: 8, 14: 10, 16: 11, 17: 12, 19: 13, 64: 14, 67: 15, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 58: 23, 68: 24, 70: 35, 72: 37, 7: 119, 13: $V0, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 60: $Va, 69: $Vb, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($VF, [2, 27], { 5: 120, 31: $V2, 84: $Vm }), o($Vv, [2, 25]), { 34: 121, 62: $VH }, { 5: 122, 31: $V2, 84: $Vm }, { 5: 123, 31: $V2, 42: $VK, 84: $Vm }, { 38: 124, 40: 125, 42: [1, 126] }, { 36: [1, 128], 37: 127 }, { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 129, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o($Vv, [2, 61]), { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 130, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o($Vv, [2, 62]), { 1: [2, 4] }, o($Vr, [2, 8]), o($Vr, [2, 9]), o($Vt, [2, 13]), { 17: 132, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 32: $V3, 41: $V5, 50: $V7, 56: $V8, 57: $V9, 59: 131, 60: $Va }, o($VG, [2, 30], { 9: $Vo, 11: $Vp }), o($VJ, [2, 29], { 8: 7, 12: 8, 14: 10, 16: 11, 17: 12, 19: 13, 64: 14, 67: 15, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 58: 23, 68: 24, 70: 35, 72: 37, 7: 119, 13: $V0, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 60: $Va, 69: $Vb, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vv, [2, 32]), { 34: 133, 62: $VH }, { 34: 134, 62: $VH }, { 5: 135, 31: $V2, 84: $Vm }, o([31, 84], [2, 38], { 42: [1, 136] }), o($VL, [2, 105]), o($VM, $VC, { 10: 137, 31: $VD }), o([27, 31, 42, 44], $VK), { 52: 138, 53: [1, 139], 54: $VN, 55: $VO }, { 63: [1, 142] }, o($Vt, [2, 63]), o($Vt, [2, 64], { 70: 35, 72: 37, 68: 55, 18: 143, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vv, [2, 33]), o($Vv, [2, 34]), { 34: 144, 62: $VH }, o($VL, [2, 106]), { 27: $VP, 42: $VQ, 43: 145, 44: [1, 147], 45: 146, 46: 149, 47: 148, 48: 150 }, { 53: [1, 153] }, o($Vv, [2, 57]), { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 154, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 155, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, o($Vv, [2, 68]), o($Vt, [2, 65], { 70: 35, 72: 37, 68: 96, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($Vv, [2, 35]), { 27: $VP, 42: $VQ, 44: [1, 156], 46: 158, 47: 157, 48: 150 }, { 44: [1, 159] }, o($Vv, [2, 41]), o($VM, [2, 45]), { 44: [2, 43] }, { 15: $VR, 29: [1, 160] }, { 42: $VQ, 48: 162 }, o($VS, [2, 54]), o($Vv, [2, 56]), { 51: [1, 163] }, { 53: [2, 60] }, o($Vv, [2, 39]), o($VM, [2, 44]), { 44: [2, 42] }, o($Vv, [2, 40]), o($VT, $VC, { 8: 7, 12: 8, 14: 10, 16: 11, 17: 12, 19: 13, 64: 14, 67: 15, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 58: 23, 68: 24, 70: 35, 72: 37, 30: 65, 7: 67, 10: 164, 28: 165, 13: $V0, 27: $V1, 31: $VU, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 60: $Va, 69: $Vb, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), { 42: [1, 167] }, { 15: $VR, 29: [1, 168] }, { 7: 67, 8: 7, 12: 8, 13: $V0, 14: 10, 16: 11, 17: 12, 19: 13, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V1, 28: 169, 30: 65, 31: $Vy, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 58: 23, 60: $Va, 64: 14, 67: 15, 68: 24, 69: $Vb, 70: 35, 71: $Vc, 72: 37, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }, { 44: [2, 46], 49: [1, 170] }, { 10: 172, 31: $VD, 44: $VC, 49: [1, 171] }, o($VT, $VI, { 8: 7, 12: 8, 14: 10, 16: 11, 17: 12, 19: 13, 64: 14, 67: 15, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 58: 23, 68: 24, 70: 35, 72: 37, 7: 67, 30: 103, 13: $V0, 27: $V1, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 60: $Va, 69: $Vb, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), o($VS, [2, 55]), o($VT, $VC, { 8: 7, 12: 8, 14: 10, 16: 11, 17: 12, 19: 13, 64: 14, 67: 15, 20: 16, 21: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 58: 23, 68: 24, 70: 35, 72: 37, 30: 65, 7: 67, 10: 173, 28: 174, 13: $V0, 27: $V1, 31: $VU, 32: $V3, 39: $V4, 41: $V5, 42: $V6, 50: $V7, 56: $V8, 57: $V9, 60: $Va, 69: $Vb, 71: $Vc, 73: $Vd, 75: $Ve, 76: $Vf, 77: $Vg, 78: $Vh, 79: $Vi, 80: $Vj, 81: $Vk, 83: $Vl }), { 52: 175, 53: [2, 58], 54: $VN, 55: $VO }, o($VM, $VC, { 10: 176, 31: $VD }), o($VM, $VC, { 10: 177, 31: $VD }), { 44: [2, 47] }, { 44: [2, 48], 49: [1, 178] }, { 10: 180, 31: $VD, 44: $VC, 49: [1, 179] }, { 53: [2, 59] }, o($VM, [2, 50]), o($VM, [2, 51]), o($VM, $VC, { 10: 181, 31: $VD }), o($VM, $VC, { 10: 182, 31: $VD }), { 44: [2, 49] }, o($VM, [2, 52]), o($VM, [2, 53])],
        defaultActions: { 34: [2, 66], 48: [2, 2], 88: [2, 1], 90: [2, 3], 114: [2, 4], 149: [2, 43], 155: [2, 60], 158: [2, 42], 172: [2, 47], 175: [2, 59], 180: [2, 49] },
        parseError: function parseError(str, hash) {
          if (hash.recoverable) {
            this.trace(str);
          } else {
            let _parseError2 = function(msg, hash2) {
              this.message = msg;
              this.hash = hash2;
            };
            var _parseError = _parseError2;
            _parseError2.prototype = Error;
            throw new _parseError2(str, hash);
          }
        },
        parse: function parse2(input) {
          var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
          var args2 = lstack.slice.call(arguments, 1);
          var lexer = Object.create(this.lexer);
          var sharedState = { yy: {} };
          for (var k in this.yy) {
            if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
              sharedState.yy[k] = this.yy[k];
            }
          }
          lexer.setInput(input, sharedState.yy);
          sharedState.yy.lexer = lexer;
          sharedState.yy.parser = this;
          if (typeof lexer.yylloc == "undefined") {
            lexer.yylloc = {};
          }
          var yyloc = lexer.yylloc;
          lstack.push(yyloc);
          var ranges = lexer.options && lexer.options.ranges;
          if (typeof sharedState.yy.parseError === "function") {
            this.parseError = sharedState.yy.parseError;
          } else {
            this.parseError = Object.getPrototypeOf(this).parseError;
          }
          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
          }
          _token_stack:
            var lex = function() {
              var token;
              token = lexer.lex() || EOF;
              if (typeof token !== "number") {
                token = self.symbols_[token] || token;
              }
              return token;
            };
          var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              expected = [];
              for (p in table[state]) {
                if (this.terminals_[p] && p > TERROR) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
              }
              if (lexer.showPosition) {
                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
              } else {
                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }
              this.parseError(errStr, {
                text: lexer.match,
                token: this.terminals_[symbol] || symbol,
                line: lexer.yylineno,
                loc: yyloc,
                expected
              });
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                  yyleng = lexer.yyleng;
                  yytext = lexer.yytext;
                  yylineno = lexer.yylineno;
                  yyloc = lexer.yylloc;
                  if (recovering > 0) {
                    recovering--;
                  }
                } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                  yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                  ];
                }
                r = this.performAction.apply(yyval, [
                  yytext,
                  yyleng,
                  yylineno,
                  sharedState.yy,
                  action[1],
                  vstack,
                  lstack
                ].concat(args2));
                if (typeof r !== "undefined") {
                  return r;
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true;
            }
          }
          return true;
        }
      };
      function Parser() {
        this.yy = {};
      }
      Parser.prototype = parser2;
      parser2.Parser = Parser;
      return new Parser();
    })();
    if (typeof require !== "undefined" && typeof exports2 !== "undefined") {
      exports2.parser = parser;
      exports2.Parser = parser.Parser;
      exports2.parse = function() {
        return parser.parse.apply(parser, arguments);
      };
      exports2.main = function commonjsMain(args2) {
        if (!args2[1]) {
          console.log("Usage: " + args2[0] + " FILE");
          process.exit(1);
        }
        var source = require("fs").readFileSync(require("path").normalize(args2[1]), "utf8");
        return exports2.parser.parse(source);
      };
      if (typeof module2 !== "undefined" && require.main === module2) {
        exports2.main(process.argv.slice(1));
      }
    }
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/index.js
var require_posix = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/posix/index.js"(exports2, module2) {
    "use strict";
    var astBuilder = require_ast_builder();
    var tokenizer = require_tokenizer();
    var phaseCatalog = require_rules();
    var grammarSource = require_grammar();
    var enums = require_enums();
    var lexerPhases = () => [
      phaseCatalog.newLineList,
      phaseCatalog.operatorTokens,
      phaseCatalog.separator,
      phaseCatalog.reservedWords,
      phaseCatalog.linebreakIn,
      phaseCatalog.ioNumber,
      phaseCatalog.identifyMaybeSimpleCommands,
      phaseCatalog.assignmentWord,
      phaseCatalog.parameterExpansion,
      phaseCatalog.arithmeticExpansion,
      phaseCatalog.commandExpansion,
      phaseCatalog.forNameVariable,
      phaseCatalog.functionName,
      phaseCatalog.identifySimpleCommandNames,
      // utils.loggerPhase('pre'),
      phaseCatalog.aliasSubstitution,
      // utils.loggerPhase('post'),
      phaseCatalog.tildeExpanding,
      phaseCatalog.parameterExpansion.resolve,
      phaseCatalog.commandExpansion.resolve,
      phaseCatalog.arithmeticExpansion.resolve,
      phaseCatalog.fieldSplitting.split,
      phaseCatalog.pathExpansion,
      phaseCatalog.quoteRemoval,
      phaseCatalog.syntaxerrorOnContinue,
      phaseCatalog.defaultNodeType
      // utils.loggerPhase('tokenizer'),
    ];
    module2.exports = {
      inherits: null,
      init: (posixMode, utils) => {
        let grammar = null;
        try {
          grammar = require_built_grammar();
        } catch (err) {
        }
        return {
          enums,
          phaseCatalog,
          lexerPhases: lexerPhases(utils),
          tokenizer,
          grammarSource,
          grammar,
          astBuilder
        };
      }
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/word-expansion/index.js
var require_word_expansion = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/modes/word-expansion/index.js"(exports2, module2) {
    "use strict";
    var map = require_map_iterable();
    var tokenOrEmpty = require_tokens().tokenOrEmpty;
    var convertToWord = () => map((tk) => {
      if (tk.is("TOKEN")) {
        return tk.changeTokenType("WORD", tk.value);
      }
      return tk;
    });
    function start(state, source, reducers) {
      const char = source && source.shift();
      if (char === void 0) {
        return {
          nextReduction: reducers.end,
          tokensToEmit: tokenOrEmpty(state),
          nextState: state.resetCurrent().saveCurrentLocAsStart()
        };
      }
      if (state.escaping && char === "\n") {
        return {
          nextReduction: reducers.start,
          nextState: state.setEscaping(false).removeLastChar()
        };
      }
      if (!state.escaping && char === "\\") {
        return {
          nextReduction: reducers.start,
          nextState: state.setEscaping(true).appendChar(char)
        };
      }
      if (!state.escaping && char === "'") {
        return {
          nextReduction: reducers.singleQuoting,
          nextState: state.appendChar(char)
        };
      }
      if (!state.escaping && char === '"') {
        return {
          nextReduction: reducers.doubleQuoting,
          nextState: state.appendChar(char)
        };
      }
      if (!state.escaping && char === "$") {
        return {
          nextReduction: reducers.expansionStart,
          nextState: state.appendChar(char).appendEmptyExpansion()
        };
      }
      if (!state.escaping && char === "`") {
        return {
          nextReduction: reducers.expansionCommandTick,
          nextState: state.appendChar(char).appendEmptyExpansion()
        };
      }
      return {
        nextReduction: reducers.start,
        nextState: state.appendChar(char).setEscaping(false)
      };
    }
    module2.exports = {
      inherits: "posix",
      init: (posixMode) => {
        const phaseCatalog = posixMode.phaseCatalog;
        const lexerPhases = [
          convertToWord,
          phaseCatalog.parameterExpansion,
          phaseCatalog.arithmeticExpansion,
          phaseCatalog.commandExpansion,
          phaseCatalog.tildeExpanding,
          phaseCatalog.parameterExpansion.resolve,
          phaseCatalog.commandExpansion.resolve,
          phaseCatalog.arithmeticExpansion.resolve,
          phaseCatalog.fieldSplitting.split,
          phaseCatalog.pathExpansion,
          phaseCatalog.quoteRemoval,
          phaseCatalog.defaultNodeType
        ];
        const reducers = Object.assign({}, posixMode.tokenizer.reducers, { start });
        const tokenizer = () => posixMode.tokenizer({}, reducers);
        return Object.assign({}, posixMode, { lexerPhases, tokenizer });
      }
    };
  }
});

// node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/bash-parser@0.5.0/node_modules/bash-parser/src/index.js"(exports2, module2) {
    "use strict";
    var shellLexer = require_shell_lexer();
    var utils = require_utils();
    var modes = {
      "bash": require_bash(),
      "posix": require_posix(),
      "word-expansion": require_word_expansion()
    };
    function loadPlugin(name) {
      const modePlugin = modes[name];
      if (modePlugin.inherits) {
        return modePlugin.init(loadPlugin(modePlugin.inherits), utils);
      }
      return modePlugin.init(null, utils);
    }
    module2.exports = function parse2(sourceCode, options) {
      try {
        options = options || {};
        options.mode = options.mode || "posix";
        const mode = loadPlugin(options.mode);
        const Parser = mode.grammar.Parser;
        const astBuilder = mode.astBuilder;
        const parser = new Parser();
        parser.lexer = shellLexer(mode, options);
        parser.yy = astBuilder(options);
        const ast = parser.parse(sourceCode);
        return ast;
      } catch (err) {
        if (err instanceof SyntaxError) {
          throw err;
        }
        throw new Error(err.stack || err.message);
      }
    };
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/identity.js"(exports2) {
    "use strict";
    var ALIAS = /* @__PURE__ */ Symbol.for("yaml.alias");
    var DOC = /* @__PURE__ */ Symbol.for("yaml.document");
    var MAP = /* @__PURE__ */ Symbol.for("yaml.map");
    var PAIR = /* @__PURE__ */ Symbol.for("yaml.pair");
    var SCALAR = /* @__PURE__ */ Symbol.for("yaml.scalar");
    var SEQ = /* @__PURE__ */ Symbol.for("yaml.seq");
    var NODE_TYPE = /* @__PURE__ */ Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
    exports2.ALIAS = ALIAS;
    exports2.DOC = DOC;
    exports2.MAP = MAP;
    exports2.NODE_TYPE = NODE_TYPE;
    exports2.PAIR = PAIR;
    exports2.SCALAR = SCALAR;
    exports2.SEQ = SEQ;
    exports2.hasAnchor = hasAnchor;
    exports2.isAlias = isAlias;
    exports2.isCollection = isCollection;
    exports2.isDocument = isDocument;
    exports2.isMap = isMap;
    exports2.isNode = isNode;
    exports2.isPair = isPair;
    exports2.isScalar = isScalar;
    exports2.isSeq = isSeq;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/visit.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path) {
      const ctrl = callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = visit_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = visit_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path) {
      const ctrl = await callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = await visitAsync_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path) {
      if (typeof visitor === "function")
        return visitor(key, node, path);
      if (identity.isMap(node))
        return visitor.Map?.(key, node, path);
      if (identity.isSeq(node))
        return visitor.Seq?.(key, node, path);
      if (identity.isPair(node))
        return visitor.Pair?.(key, node, path);
      if (identity.isScalar(node))
        return visitor.Scalar?.(key, node, path);
      if (identity.isAlias(node))
        return visitor.Alias?.(key, node, path);
      return void 0;
    }
    function replaceNode(key, path, node) {
      const parent = path[path.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    exports2.visit = visit;
    exports2.visitAsync = visitAsync;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/directives.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class _Directives {
      constructor(yaml, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports2.Directives = Directives;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/anchors.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
          return name;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          prevAnchors ?? (prevAnchors = anchorNames(doc));
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports2.anchorIsValid = anchorIsValid;
    exports2.anchorNames = anchorNames;
    exports2.createNodeAnchors = createNodeAnchors;
    exports2.findNewAnchor = findNewAnchor;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/applyReviver.js"(exports2) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; ++i) {
            const v0 = val[i];
            const v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0)
              delete val[i];
            else if (v1 !== v0)
              val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports2.applyReviver = applyReviver;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/toJS.js"(exports2) {
    "use strict";
    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !ctx?.keep)
        return Number(value);
      return value;
    }
    exports2.toJS = toJS;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Node.js"(exports2) {
    "use strict";
    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports2.NodeBase = NodeBase;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Alias.js"(exports2) {
    "use strict";
    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node.NodeBase {
      constructor(source) {
        super(identity.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc, ctx) {
        let nodes;
        if (ctx?.aliasResolveCache) {
          nodes = ctx.aliasResolveCache;
        } else {
          nodes = [];
          visit.visit(doc, {
            Node: (_key, node) => {
              if (identity.isAlias(node) || identity.hasAnchor(node))
                nodes.push(node);
            }
          });
          if (ctx)
            ctx.aliasResolveCache = nodes;
        }
        let found = void 0;
        for (const node of nodes) {
          if (node === this)
            break;
          if (node.anchor === this.source)
            found = node;
        }
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const { anchors: anchors2, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc, ctx);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        let data = anchors2.get(source);
        if (!data) {
          toJS.toJS(source, null, ctx);
          data = anchors2.get(source);
        }
        if (data?.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          data.count += 1;
          if (data.aliasCount === 0)
            data.aliasCount = getAliasCount(doc, source, anchors2);
          if (data.count * data.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(msg);
          }
        }
        return data.res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count)
            count = c;
        }
        return count;
      } else if (identity.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports2.Alias = Alias;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Scalar.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    var Scalar = class extends Node.NodeBase {
      constructor(value) {
        super(identity.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports2.Scalar = Scalar;
    exports2.isScalarValue = isScalarValue;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/createNode.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t) => t.identify?.(value) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (identity.isDocument(value))
        value = value.contents;
      if (identity.isNode(value))
        return value;
      if (identity.isPair(value)) {
        const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          ref.anchor ?? (ref.anchor = onAnchor(value));
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName?.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    exports2.createNode = createNode;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Collection.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var identity = require_identity();
    var Node = require_Node();
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
    var Collection = class extends Node.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity.isScalar(node) ? node.value : node;
        else
          return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    exports2.Collection = Collection;
    exports2.collectionFromPath = collectionFromPath;
    exports2.isEmptyPath = isEmptyPath;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyComment.js"(exports2) {
    "use strict";
    var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent3) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent3 ? comment.replace(/^(?! *$)/gm, indent3) : comment;
    }
    var lineComment = (str, indent3, comment) => str.endsWith("\n") ? indentComment(comment, indent3) : comment.includes("\n") ? "\n" + indentComment(comment, indent3) : (str.endsWith(" ") ? "" : " ") + comment;
    exports2.indentComment = indentComment;
    exports2.lineComment = lineComment;
    exports2.stringifyComment = stringifyComment;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/foldFlowLines.js"(exports2) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent3, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text;
      if (lineWidth < minContentWidth)
        minContentWidth = 0;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent3.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent3.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split2 = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i, indent3.length);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i, indent3.length);
          end = i + indent3.length + endStep;
          split2 = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split2 = i;
          }
          if (i >= end) {
            if (split2) {
              folds.push(split2);
              end = split2 + endStep;
              split2 = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split2 = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent3}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent3}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text, i, indent3) {
      let end = i;
      let start = i + 1;
      let ch = text[start];
      while (ch === " " || ch === "	") {
        if (i < start + indent3) {
          ch = text[++i];
        } else {
          do {
            ch = text[++i];
          } while (ch && ch !== "\n");
          end = i;
          start = i + 1;
          ch = text[start];
        }
      }
      return end;
    }
    exports2.FOLD_BLOCK = FOLD_BLOCK;
    exports2.FOLD_FLOW = FOLD_FLOW;
    exports2.FOLD_QUOTED = FOLD_QUOTED;
    exports2.foldFlowLines = foldFlowLines;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyString.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent3 = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent3;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent3, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent3 = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent3}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent3, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent3 = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent3.length);
      if (!value)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent3}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent3}`);
      }
      const indentSize = indent3 ? "2" : "1";
      let header = (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (!literal) {
        const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent3}`);
        let literalFallback = false;
        const foldOptions = getFoldOptions(ctx, true);
        if (blockQuote !== "folded" && type !== Scalar.Scalar.BLOCK_FOLDED) {
          foldOptions.onOverflow = () => {
            literalFallback = true;
          };
        }
        const body = foldFlowLines.foldFlowLines(`${start}${foldedValue}${end}`, indent3, foldFlowLines.FOLD_BLOCK, foldOptions);
        if (!literalFallback)
          return `>${header}
${indent3}${body}`;
      }
      value = value.replace(/\n+/g, `$&${indent3}`);
      return `|${header}
${indent3}${start}${value}${end}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent: indent3, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent3 === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent3 === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str = value.replace(/\n+/g, `$&
${indent3}`);
      if (actualString) {
        const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
          return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent3, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null)
          throw new Error(`Unsupported default string type ${t}`);
      }
      return res;
    }
    exports2.stringifyString = stringifyString;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringify.js"(exports2) {
    "use strict";
    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity.isScalar(item)) {
        obj = item.value;
        let match = tags.filter((t) => t.identify?.(obj));
        if (match.length > 1) {
          const testMatch = match.filter((t) => t.test);
          if (testMatch.length > 0)
            match = testMatch;
        }
        tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      if (identity.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    exports2.createStringifyContext = createStringifyContext;
    exports2.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyPair.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent: indent3, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key) || !identity.isNode(key) && typeof key === "object") {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent3 + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent3}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n" && valueComment)
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports2.stringifyPair = stringifyPair;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/log.js"(exports2) {
    "use strict";
    var node_process = require("process");
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof node_process.emitWarning === "function")
          node_process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports2.debug = debug;
    exports2.warn = warn;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/merge.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var MERGE_KEY = "<<";
    var merge = {
      identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
      default: "key",
      tag: "tag:yaml.org,2002:merge",
      test: /^<<$/,
      resolve: () => Object.assign(new Scalar.Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
      }),
      stringify: () => MERGE_KEY
    };
    var isMergeKey = (ctx, key) => (merge.identify(key) || identity.isScalar(key) && (!key.type || key.type === Scalar.Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
    function addMergeToJSMap(ctx, map, value) {
      value = ctx && identity.isAlias(value) ? value.resolve(ctx.doc) : value;
      if (identity.isSeq(value))
        for (const it of value.items)
          mergeValue(ctx, map, it);
      else if (Array.isArray(value))
        for (const it of value)
          mergeValue(ctx, map, it);
      else
        mergeValue(ctx, map, value);
    }
    function mergeValue(ctx, map, value) {
      const source = ctx && identity.isAlias(value) ? value.resolve(ctx.doc) : value;
      if (!identity.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    exports2.addMergeToJSMap = addMergeToJSMap;
    exports2.isMergeKey = isMergeKey;
    exports2.merge = merge;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports2) {
    "use strict";
    var log = require_log();
    var merge = require_merge();
    var stringify = require_stringify();
    var identity = require_identity();
    var toJS = require_toJS();
    function addPairToJSMap(ctx, map, { key, value }) {
      if (identity.isNode(key) && key.addToJSMap)
        key.addToJSMap(ctx, map, value);
      else if (merge.isMergeKey(ctx, key))
        merge.addMergeToJSMap(ctx, map, value);
      else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity.isNode(key) && ctx?.doc) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports2.addPairToJSMap = addPairToJSMap;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/Pair.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity.isNode(key))
          key = key.clone(schema);
        if (identity.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports2.Pair = Pair;
    exports2.createPair = createPair;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyCollection.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent: indent3, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          str += line ? `
${indent3}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent3);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
      const { indent: indent3, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik?.comment) {
            comment = ik.comment;
          }
        }
        if (comment)
          reqNewline = true;
        let str = stringify.stringify(item, itemCtx, () => comment = null);
        if (i < items.length - 1)
          str += ",";
        if (comment)
          str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        if (!reqNewline && (lines.length > linesAtValue || str.includes("\n")))
          reqNewline = true;
        lines.push(str);
        linesAtValue = lines.length;
      }
      const { start, end } = flowChars;
      if (lines.length === 0) {
        return start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
          let str = start;
          for (const line of lines)
            str += line ? `
${indentStep}${indent3}${line}` : "\n";
          return `${str}
${indent3}${end}`;
        } else {
          return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
    }
    function addCommentBefore({ indent: indent3, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent3);
        lines.push(ic.trimStart());
      }
    }
    exports2.stringifyCollection = stringifyCollection;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/YAMLMap.js"(exports2) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k = identity.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (identity.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite2) {
        let _pair;
        if (identity.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair?.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite2)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1)
            this.items.push(_pair);
          else
            this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports2.YAMLMap = YAMLMap;
    exports2.findPair = findPair;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/common/map.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports2.map = map;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/nodes/YAMLSeq.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports2.YAMLSeq = YAMLSeq;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/common/seq.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports2.seq = seq;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/common/string.js"(exports2) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports2.string = string;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/common/null.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports2.nullTag = nullTag;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/core/bool.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports2.boolTag = boolTag;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyNumber.js"(exports2) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    exports2.stringifyNumber = stringifyNumber;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/core/float.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports2.float = float;
    exports2.floatExp = floatExp;
    exports2.floatNaN = floatNaN;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/core/int.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports2.int = int;
    exports2.intHex = intHex;
    exports2.intOct = intOct;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/core/schema.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports2.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/json/schema.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true$|^false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports2.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports2) {
    "use strict";
    var node_buffer = require("buffer");
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof node_buffer.Buffer === "function") {
          return node_buffer.Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        if (!value)
          return "";
        const buf = value;
        let str;
        if (typeof node_buffer.Buffer === "function") {
          str = buf instanceof node_buffer.Buffer ? buf.toString("base64") : node_buffer.Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < buf.length; ++i)
            s += String.fromCharCode(buf[i]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        type ?? (type = Scalar.Scalar.BLOCK_LITERAL);
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports2.binary = binary;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (identity.isPair(item))
            continue;
          else if (identity.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports2.createPairs = createPairs;
    exports2.pairs = pairs;
    exports2.resolvePairs = resolvePairs;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports2.YAMLOMap = YAMLOMap;
    exports2.omap = omap;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports2.falseTag = falseTag;
    exports2.trueTag = trueTag;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports2.float = float;
    exports2.floatExp = floatExp;
    exports2.floatNaN = floatNaN;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports2.int = int;
    exports2.intBin = intBin;
    exports2.intHex = intHex;
    exports2.intOct = intOct;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports2.YAMLSet = YAMLSet;
    exports2.set = set;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = (n) => asBigInt ? BigInt(n) : Number(n);
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = (n) => n;
      if (typeof value === "bigint")
        num = (n) => BigInt(n);
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
    };
    exports2.floatTime = floatTime;
    exports2.intTime = intTime;
    exports2.timestamp = timestamp;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      merge.merge,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports2.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/tags.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      merge: merge.merge,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:merge": merge.merge,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName, addMergeTag) {
      const schemaTags = schemas.get(schemaName);
      if (schemaTags && !customTags) {
        return addMergeTag && !schemaTags.includes(merge.merge) ? schemaTags.concat(merge.merge) : schemaTags.slice();
      }
      let tags = schemaTags;
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      if (addMergeTag)
        tags = tags.concat(merge.merge);
      return tags.reduce((tags2, tag) => {
        const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
        if (!tagObj) {
          const tagName = JSON.stringify(tag);
          const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
        }
        if (!tags2.includes(tagObj))
          tags2.push(tagObj);
        return tags2;
      }, []);
    }
    exports2.coreKnownTags = coreKnownTags;
    exports2.getTags = getTags;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/schema/Schema.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema = class _Schema {
      constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name, merge);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity.MAP, { value: map.map });
        Object.defineProperty(this, identity.SCALAR, { value: string.string });
        Object.defineProperty(this, identity.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports2.Schema = Schema;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/stringify/stringifyDocument.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      const lines = [];
      let hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify.createStringifyContext(doc, options);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if (doc.directives?.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports2.stringifyDocument = stringifyDocument;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/doc/Document.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          stringKeys: false,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity.NODE_TYPE]: { value: identity.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair.Pair(k, v);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
          return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity.isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path) {
        if (Collection.isEmptyPath(path))
          return this.contents !== void 0;
        return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        if (Collection.isEmptyPath(path)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version, options = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object)
          this.schema = options.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
      }
    };
    function assertCollection(contents) {
      if (identity.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports2.Document = Document;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/errors.js"(exports2) {
    "use strict";
    var YAMLError = class extends Error {
      constructor(name, pos, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLParseError", pos, code, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLWarning", pos, code, message);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart4 = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart4);
        ci -= trimStart4 - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end?.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports2.YAMLError = YAMLError;
    exports2.YAMLParseError = YAMLParseError;
    exports2.YAMLWarning = YAMLWarning;
    exports2.prettifyError = prettifyError;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-props.js"(exports2) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let reqSpace = false;
      let tab = null;
      let anchor = null;
      let tag = null;
      let newlineAfterProp = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        if (tab) {
          if (atNewline && token.type !== "comment" && token.type !== "newline") {
            onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
          }
          tab = null;
        }
        switch (token.type) {
          case "space":
            if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
              tab = token;
            }
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else if (!found || indicator !== "seq-item-ind")
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              newlineAfterProp = token;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          // else fallthrough
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      }
      if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        anchor,
        tag,
        newlineAfterProp,
        end,
        start: start ?? end
      };
    }
    exports2.resolveProps = resolveProps;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/util-contains-newline.js"(exports2) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports2.containsNewline = containsNewline;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports2) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent3, fc, onError) {
      if (fc?.type === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent3 && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports2.flowIndentCheck = flowIndentCheck;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/util-map-includes.js"(exports2) {
    "use strict";
    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value;
      return items.some((pair) => isEqual(pair.key, search));
    }
    exports2.mapIncludes = mapIncludes;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-block-map.js"(exports2) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: bm.indent,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.newlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (keyProps.found?.indent !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        ctx.atKey = true;
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        ctx.atKey = false;
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: bm.indent,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if (value?.type === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports2.resolveBlockMap = resolveBlockMap;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-block-seq.js"(exports2) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          parentIndent: bs.indent,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value?.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports2.resolveBlockSeq = resolveBlockSeq;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-end.js"(exports2) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports2.resolveEnd = resolveEnd;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: fc.indent,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop: for (const st of start) {
              switch (st.type) {
                case "comma":
                case "space":
                  break;
                case "comment":
                  prevItemComment = st.source.substring(1);
                  break loop;
                default:
                  break loop;
              }
            }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          ctx.atKey = true;
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          ctx.atKey = false;
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            parentIndent: fc.indent,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep)
                for (const st of sep) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source?.[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            const endRange = (valueNode ?? keyNode).range;
            map.range = [keyNode.range[0], endRange[1], endRange[2]];
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce?.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports2.resolveFlowCollection = resolveFlowCollection;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/compose-collection.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, props, onError) {
      const tagToken = props.tag;
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      if (token.type === "block-seq") {
        const { anchor, newlineAfterProp: nl } = props;
        const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
        if (lastProp && (!nl || nl.offset < lastProp.offset)) {
          const message = "Missing newline after block sequence props";
          onError(lastProp, "MISSING_CHAR", message);
        }
      }
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq") {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt?.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          if (kt) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
      const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag?.format)
        node.format = tag.format;
      return node;
    }
    exports2.composeCollection = composeCollection;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(ctx, scalar, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === "" || content === "\r")
          chompStart = i;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i = 0; i < chompStart; ++i) {
        const [indent3, content] = lines[i];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent3.length > trimIndent)
            trimIndent = indent3.length;
        } else {
          if (indent3.length < trimIndent) {
            const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent3.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0)
            trimIndent = indent3.length;
          contentStart = i;
          if (trimIndent === 0 && !ctx.atRoot) {
            const message = "Block scalar values in collections must be indented";
            onError(offset, "BAD_INDENT", message);
          }
          break;
        }
        offset += indent3.length + content.length + 1;
      }
      for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
          chompStart = i + 1;
      }
      let value = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + "\n";
      for (let i = contentStart; i < chompStart; ++i) {
        let [indent3, content] = lines[i];
        offset += indent3.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent3.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
          indent3 = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + indent3.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent3.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value += sep + indent3.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value += "\n";
          else
            sep = "\n";
        } else {
          value += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i = chompStart; i < lines.length; ++i)
            value += "\n" + lines[i][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent3 = 0;
      let chomp = "";
      let error = -1;
      for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent3 && n)
            indent3 = n;
          else if (error === -1)
            error = offset + i;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
          case "space":
            hasSpace = true;
          // fallthrough
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          /* istanbul ignore next should not happen */
          default: {
            const message = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent: indent3, chomp, comment, length };
    }
    function splitLines(source) {
      const split2 = source.split(/\n( *)/);
      const first = split2[0];
      const m = first.match(/^( *)/);
      const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      const lines = [line0];
      for (let i = 1; i < split2.length; i += 2)
        lines.push([split2[i], split2[i + 1]]);
      return lines;
    }
    exports2.resolveBlockScalar = resolveBlockScalar;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        /* istanbul ignore next should not happen */
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        /* istanbul ignore next should not happen */
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return foldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return foldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function foldLines(source) {
      let first, line;
      try {
        first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
        line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
      } catch {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
      }
      let match = first.exec(source);
      if (!match)
        return source;
      let res = match[1];
      let sep = " ";
      let pos = first.lastIndex;
      line.lastIndex = pos;
      while (match = line.exec(source)) {
        if (match[1] === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + match[1];
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + (match?.[1] ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i);
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          let next = source[++i];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = { x: 2, u: 4, U: 8 }[next];
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            const raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i;
          let next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
          if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
            res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      // null character
      a: "\x07",
      // bell character
      b: "\b",
      // backspace
      e: "\x1B",
      // escape character
      f: "\f",
      // form feed
      n: "\n",
      // line feed
      r: "\r",
      // carriage return
      t: "	",
      // horizontal tab
      v: "\v",
      // vertical tab
      N: "\x85",
      // Unicode next line
      _: "\xA0",
      // Unicode non-breaking space
      L: "\u2028",
      // Unicode line separator
      P: "\u2029",
      // Unicode paragraph separator
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code = ok ? parseInt(cc, 16) : NaN;
      if (isNaN(code)) {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
      return String.fromCodePoint(code);
    }
    exports2.resolveFlowScalar = resolveFlowScalar;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/compose-scalar.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(ctx, token, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      let tag;
      if (ctx.options.stringKeys && ctx.atKey) {
        tag = ctx.schema[identity.SCALAR];
      } else if (tagName)
        tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
      else if (token.type === "scalar")
        tag = findScalarTagByTest(ctx, value, token, onError);
      else
        tag = ctx.schema[identity.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!")
        return schema[identity.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if (tag.test?.test(value))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema[identity.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports2.composeScalar = composeScalar;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports2) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        pos ?? (pos = before.length);
        for (let i = pos - 1; i >= 0; --i) {
          let st = before[i];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i];
          while (st?.type === "space") {
            offset += st.source.length;
            st = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    exports2.emptyScalarPosition = emptyScalarPosition;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/compose-node.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const atKey = ctx.atKey;
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          node = composeCollection.composeCollection(CN, ctx, token, props, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        default: {
          const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message);
          node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
          isSrcToken = false;
        }
      }
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (atKey && ctx.options.stringKeys && (!identity.isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
        const msg = "With stringKeys, all keys must be strings";
        onError(tag ?? token, "NON_STRING_KEY", msg);
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    exports2.composeEmptyNode = composeEmptyNode;
    exports2.composeNode = composeNode;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/compose-doc.js"(exports2) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, { offset, start, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atKey: false,
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value ?? end?.[0],
        offset,
        onError,
        parentIndent: 0,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports2.composeDoc = composeDoc;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/compose/composer.js"(exports2) {
    "use strict";
    var node_process = require("process");
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (prelude[i + 1]?.[0] !== "#")
              i += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code, message));
          else
            this.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        this.directives = new directives.Directives({ version: options.version || "1.2" });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          Array.prototype.push.apply(doc.errors, this.errors);
          Array.prototype.push.apply(doc.warnings, this.warnings);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (node_process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports2.Composer = Composer;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/cst-scalar.js"(exports2) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code, message) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code, message);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      const { implicitKey = false, indent: indent3, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent3 > 0 ? " ".repeat(indent3) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent: indent3, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent: indent3, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent: indent3, source: "\n" });
          return { type: "block-scalar", offset, indent: indent3, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent: indent3, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent: indent3, source, end };
        default:
          return { type: "scalar", offset, indent: indent3, source, end };
      }
    }
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent3 = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent3 === "number")
        indent3 += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent3 === null,
        indent: indent3 !== null && indent3 > 0 ? " ".repeat(indent3) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent3 = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent: indent3, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent: indent3, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent: indent3, props, source: body });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent3 = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent: indent3, source, end });
        }
      }
    }
    exports2.createScalarToken = createScalarToken;
    exports2.resolveAsScalar = resolveAsScalar;
    exports2.setScalarValue = setScalarValue;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/cst-stringify.js"(exports2) {
    "use strict";
    var stringify = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    function stringifyItem({ start, key, sep, value }) {
      let res = "";
      for (const st of start)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st of sep)
          res += st.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    exports2.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/cst-visit.js"(exports2) {
    "use strict";
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path) => {
      let item = cst;
      for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path) => {
      const parent = visit.itemAtPath(cst, path.slice(0, -1));
      const field = path[path.length - 1][0];
      const coll = parent?.[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path, item, visitor) {
      let ctrl = visitor(item, path);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i = 0; i < token.items.length; ++i) {
            const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
    }
    exports2.visit = visit;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/cst.js"(exports2) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = (token) => !!token && "items" in token;
    var isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports2.createScalarToken = cstScalar.createScalarToken;
    exports2.resolveAsScalar = cstScalar.resolveAsScalar;
    exports2.setScalarValue = cstScalar.setScalarValue;
    exports2.stringify = cstStringify.stringify;
    exports2.visit = cstVisit.visit;
    exports2.BOM = BOM;
    exports2.DOCUMENT = DOCUMENT;
    exports2.FLOW_END = FLOW_END;
    exports2.SCALAR = SCALAR;
    exports2.isCollection = isCollection;
    exports2.isScalar = isScalar;
    exports2.prettyToken = prettyToken;
    exports2.tokenType = tokenType;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/lexer.js"(exports2) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = new Set("0123456789ABCDEFabcdef");
    var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
    var flowIndicatorChars = new Set(",[]{}");
    var invalidAnchorChars = new Set(" ,[]{}\n\r	");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
    var Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          if (typeof source !== "string")
            throw TypeError("source is not a string");
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent3 = 0;
          while (ch === " ")
            ch = this.buffer[++indent3 + offset];
          if (ch === "\r") {
            const next = this.buffer[indent3 + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent3 + 1;
          }
          return ch === "\n" || indent3 >= this.indentNext || !ch && !this.atEnd ? offset + indent3 : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          let cs = line.indexOf("#");
          while (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	") {
              dirEnd = cs - 1;
              break;
            } else {
              cs = line.indexOf("#", cs + 1);
            }
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s = this.peek(3);
          if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return s === "---" ? "doc" : "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return yield* this.parseBlockStart();
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          // fallthrough
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent3 = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent3 = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent3 !== -1 && indent3 < this.indentNext && line[0] !== "#" || indent3 === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent3 === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          // fallthrough
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent3 = 0;
        let ch;
        loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
          switch (ch) {
            case " ":
              indent3 += 1;
              break;
            case "\n":
              nl = i2;
              indent3 = 0;
              break;
            case "\r": {
              const next = this.buffer[i2 + 1];
              if (!next && !this.atEnd)
                return this.setNext("block-scalar");
              if (next === "\n")
                break;
            }
            // fallthrough
            default:
              break loop;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent3 >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent3;
          else {
            this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
          }
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        let i = nl + 1;
        ch = this.buffer[i];
        while (ch === " ")
          ch = this.buffer[++i];
        if (ch === "	") {
          while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
            ch = this.buffer[++i];
          nl = i - 1;
        } else if (!this.blockScalarKeep) {
          do {
            let i2 = nl - 1;
            let ch2 = this.buffer[i2];
            if (ch2 === "\r")
              ch2 = this.buffer[--i2];
            const lastChar = i2;
            while (ch2 === " ")
              ch2 = this.buffer[--i2];
            if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent3 > lastChar)
              nl = i2;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
              break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else
                end = i;
            }
            if (next === "#" || inFlow && flowIndicatorChars.has(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1)
                break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && flowIndicatorChars.has(ch))
              break;
            end = i;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        switch (this.charAt(0)) {
          case "!":
            return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "&":
            return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "-":
          // this is an error
          case "?":
          // this is an error outside flow collections
          case ":": {
            const inFlow = this.flowLevel > 0;
            const ch1 = this.charAt(1);
            if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
              if (!inFlow)
                this.indentNext = this.indentValue + 1;
              else if (this.flowKey)
                this.flowKey = false;
              return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
            }
          }
        }
        return 0;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.has(ch))
              ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i;
        }
        return n;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
          ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
    exports2.Lexer = Lexer;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/line-counter.js"(exports2) {
    "use strict";
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports2.LineCounter = LineCounter;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/parse/parser.js"(exports2) {
    "use strict";
    var node_process = require("process");
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token?.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        /* istanbul ignore next should not happen */
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0)
        return [];
      let i = prev.length;
      loop: while (--i >= 0) {
        switch (prev[i].type) {
          case "doc-start":
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
          case "newline":
            break loop;
        }
      }
      while (prev[++i]?.type === "space") {
      }
      return prev.splice(i, prev.length);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                Array.prototype.push.apply(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              Array.prototype.push.apply(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser = class {
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (node_process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && top?.type !== "doc-end") {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !it.explicitKey;
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            /* istanbul ignore next should not happen */
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          /* istanbul ignore next should not happen */
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atMapIndent = !this.onKeyLine && this.indent === map.indent;
          const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st = it.sep[i];
              switch (st.type) {
                case "newline":
                  nl.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !it.explicitKey) {
                it.start.push(this.sourceToken);
                it.explicitKey = true;
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start, explicitKey: true });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken], explicitKey: true }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (it.explicitKey) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key;
                  delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs);
              } else {
                Object.assign(it, { key: fs, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (bv.type === "block-seq") {
                  if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                    yield* this.pop({
                      type: "error",
                      offset: this.offset,
                      message: "Unexpected block-seq-ind on same line with key",
                      source: this.source
                    });
                    return;
                  }
                } else if (atMapIndent) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top?.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs, sep: [] });
              else if (it.sep)
                this.stack.push(fs);
              else
                Object.assign(it, { key: fs, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, explicitKey: true }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent3) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent3)
          return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          // fallthrough
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports2.Parser = Parser;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/public-api.js"(exports2) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log = require_log();
    var identity = require_identity();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options) {
      const prettyErrors = options.prettyErrors !== false;
      const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse2(src, reviver, options) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && typeof reviver === "object") {
        options = reviver;
      }
      const doc = parseDocument(src, options);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options));
    }
    function stringify(value, replacer, options) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string")
        options = options.length;
      if (typeof options === "number") {
        const indent3 = Math.round(options);
        options = indent3 < 1 ? void 0 : indent3 > 8 ? { indent: 8 } : { indent: indent3 };
      }
      if (value === void 0) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      if (identity.isDocument(value) && !_replacer)
        return value.toString(options);
      return new Document.Document(value, _replacer, options).toString(options);
    }
    exports2.parse = parse2;
    exports2.parseAllDocuments = parseAllDocuments;
    exports2.parseDocument = parseDocument;
    exports2.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/.pnpm/yaml@2.8.2/node_modules/yaml/dist/index.js"(exports2) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports2.Composer = composer.Composer;
    exports2.Document = Document.Document;
    exports2.Schema = Schema.Schema;
    exports2.YAMLError = errors.YAMLError;
    exports2.YAMLParseError = errors.YAMLParseError;
    exports2.YAMLWarning = errors.YAMLWarning;
    exports2.Alias = Alias.Alias;
    exports2.isAlias = identity.isAlias;
    exports2.isCollection = identity.isCollection;
    exports2.isDocument = identity.isDocument;
    exports2.isMap = identity.isMap;
    exports2.isNode = identity.isNode;
    exports2.isPair = identity.isPair;
    exports2.isScalar = identity.isScalar;
    exports2.isSeq = identity.isSeq;
    exports2.Pair = Pair.Pair;
    exports2.Scalar = Scalar.Scalar;
    exports2.YAMLMap = YAMLMap.YAMLMap;
    exports2.YAMLSeq = YAMLSeq.YAMLSeq;
    exports2.CST = cst;
    exports2.Lexer = lexer.Lexer;
    exports2.LineCounter = lineCounter.LineCounter;
    exports2.Parser = parser.Parser;
    exports2.parse = publicApi.parse;
    exports2.parseAllDocuments = publicApi.parseAllDocuments;
    exports2.parseDocument = publicApi.parseDocument;
    exports2.stringify = publicApi.stringify;
    exports2.visit = visit.visit;
    exports2.visitAsync = visit.visitAsync;
  }
});

// src/parser.ts
var import_bash_parser = __toESM(require_src(), 1);
var import_path = require("path");
var HEREDOC_REGEX = /<<-?\s*['"]?\w+['"]?/;
function preprocessCatHeredocs(input) {
  const regex = /\$\(cat\s+<<-?\s*['"]?(\w+)['"]?\n([\s\S]*?)\n\1\s*\)/g;
  return input.replace(regex, "__HEREDOC_TEXT__");
}
function convertCommand(node) {
  if (!node.name) return null;
  const command = node.name.text.includes("/") ? (0, import_path.basename)(node.name.text) : node.name.text;
  const envPrefixes = [];
  if (node.prefix) {
    for (const p of node.prefix) {
      if (p.type === "AssignmentWord") {
        envPrefixes.push(p.text);
      }
    }
  }
  const args2 = [];
  if (node.suffix) {
    for (const s of node.suffix) {
      if (s.type === "Word") {
        args2.push(s.text);
      }
    }
  }
  const rawParts = [
    ...envPrefixes,
    node.name.text,
    ...args2
  ];
  const raw = rawParts.join(" ");
  return { command, args: args2, envPrefixes, raw };
}
function collectCommandExpansions(node) {
  const commands = [];
  if (node.type === "Command") {
    const cmd = node;
    if (cmd.suffix) {
      for (const s of cmd.suffix) {
        if (s.type === "Word" && s.expansion) {
          for (const exp of s.expansion) {
            if (exp.type === "CommandExpansion" && exp.command) {
              commands.push(exp.command);
            }
          }
        }
      }
    }
    if (cmd.name?.expansion) {
      for (const exp of cmd.name.expansion) {
        if (exp.type === "CommandExpansion" && exp.command) {
          commands.push(exp.command);
        }
      }
    }
  }
  return commands;
}
function walkNode(node, result) {
  switch (node.type) {
    case "Command": {
      const cmd = node;
      const expansions = collectCommandExpansions(node);
      if (expansions.length > 0) {
        result.hasSubshell = true;
        result.subshellCommands.push(...expansions);
      }
      const parsed = convertCommand(cmd);
      if (!parsed) break;
      if ((parsed.command === "sh" || parsed.command === "bash" || parsed.command === "zsh") && parsed.args.length >= 2 && parsed.args[0] === "-c") {
        const innerResult = parseCommand(parsed.args[1]);
        if (innerResult.parseError) {
          result.commands.push(parsed);
        } else {
          result.commands.push(...innerResult.commands);
          if (innerResult.hasSubshell) {
            result.hasSubshell = true;
          }
          result.subshellCommands.push(...innerResult.subshellCommands);
        }
      } else {
        result.commands.push(parsed);
      }
      break;
    }
    case "Pipeline": {
      const pipeline = node;
      for (const cmd of pipeline.commands) {
        walkNode(cmd, result);
      }
      break;
    }
    case "LogicalExpression": {
      const logical = node;
      walkNode(logical.left, result);
      walkNode(logical.right, result);
      break;
    }
    case "Subshell": {
      result.hasSubshell = true;
      const subshell = node;
      if (subshell.list?.commands) {
        for (const cmd of subshell.list.commands) {
          walkNode(cmd, result);
        }
      }
      break;
    }
    // Complex constructs — flag as subshell for safety
    case "If":
    case "For":
    case "While":
    case "Until":
    case "Case":
    case "Function":
      result.hasSubshell = true;
      break;
    default:
      break;
  }
}
function hasHeredocRedirect(node) {
  if (!node.suffix) return false;
  return node.suffix.some((s) => s.type === "dless" || s.type === "dlessdash");
}
function astHasHeredoc(ast) {
  function check(node) {
    if (node.type === "Command") {
      if (hasHeredocRedirect(node)) return true;
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === "commandAST" || key === "expansion") continue;
      if (Array.isArray(value)) {
        for (const child of value) {
          if (child && typeof child === "object" && "type" in child && check(child)) return true;
        }
      } else if (value && typeof value === "object" && "type" in value) {
        if (check(value)) return true;
      }
    }
    return false;
  }
  for (const cmd of ast.commands) {
    if (check(cmd)) return true;
  }
  return false;
}
function parseCommand(input) {
  if (!input || !input.trim()) {
    return { commands: [], hasSubshell: false, subshellCommands: [], parseError: false };
  }
  input = preprocessCatHeredocs(input);
  try {
    const ast = (0, import_bash_parser.default)(input);
    const result = { commands: [], hasSubshell: false, subshellCommands: [] };
    if (astHasHeredoc(ast)) {
      const firstLine = input.split("\n")[0];
      const cmdPart = firstLine.replace(/<<-?\s*['"]?\w+['"]?.*$/, "").trim();
      if (!cmdPart) {
        return { commands: [], hasSubshell: false, subshellCommands: [], parseError: true };
      }
      try {
        const cmdAst = (0, import_bash_parser.default)(cmdPart);
        for (const cmd of cmdAst.commands) {
          walkNode(cmd, result);
        }
        return { commands: result.commands, hasSubshell: true, subshellCommands: result.subshellCommands, parseError: false };
      } catch {
        return { commands: [], hasSubshell: true, subshellCommands: [], parseError: true };
      }
    }
    for (const cmd of ast.commands) {
      walkNode(cmd, result);
    }
    return { commands: result.commands, hasSubshell: result.hasSubshell, subshellCommands: result.subshellCommands, parseError: false };
  } catch {
    if (HEREDOC_REGEX.test(input)) {
      const firstLine = input.split("\n")[0];
      const cmdPart = firstLine.replace(/<<-?\s*['"]?\w+['"]?.*$/, "").trim();
      if (!cmdPart) {
        return { commands: [], hasSubshell: true, subshellCommands: [], parseError: true };
      }
      try {
        const ast = (0, import_bash_parser.default)(cmdPart);
        const result = { commands: [], hasSubshell: false, subshellCommands: [] };
        for (const cmd of ast.commands) {
          walkNode(cmd, result);
        }
        return { commands: result.commands, hasSubshell: true, subshellCommands: result.subshellCommands, parseError: false };
      } catch {
        return { commands: [], hasSubshell: true, subshellCommands: [], parseError: true };
      }
    }
    return { commands: [], hasSubshell: false, subshellCommands: [], parseError: true };
  }
}

// src/evaluator.ts
function evaluate(parsed, config) {
  if (parsed.parseError) {
    return { decision: "ask", reason: "Could not parse command safely", details: [] };
  }
  if (parsed.commands.length === 0) {
    return { decision: "allow", reason: "Empty command", details: [] };
  }
  if (parsed.hasSubshell && parsed.subshellCommands.length > 0) {
    for (const subCmd of parsed.subshellCommands) {
      const subParsed = parseCommand(subCmd);
      const subResult = evaluate(subParsed, config);
      if (subResult.decision === "deny") {
        return { decision: "deny", reason: `Subshell command: ${subResult.reason}`, details: subResult.details };
      }
      if (subResult.decision === "ask") {
        return { decision: "ask", reason: `Subshell command: ${subResult.reason}`, details: subResult.details };
      }
    }
  } else if (parsed.hasSubshell && parsed.subshellCommands.length === 0 && config.askOnSubshell) {
    return { decision: "ask", reason: "Command contains subshell/command substitution", details: [] };
  }
  const details = [];
  for (const cmd of parsed.commands) {
    details.push(evaluateCommand(cmd, config));
  }
  const decisions = details.map((d) => d.decision);
  if (decisions.includes("deny")) {
    const denied = details.filter((d) => d.decision === "deny");
    return {
      decision: "deny",
      reason: denied.map((d) => `${d.command}: ${d.reason}`).join("; "),
      details
    };
  }
  if (decisions.includes("ask")) {
    const asked = details.filter((d) => d.decision === "ask");
    return {
      decision: "ask",
      reason: asked.map((d) => `${d.command}: ${d.reason}`).join("; "),
      details
    };
  }
  return { decision: "allow", reason: "All commands are safe", details };
}
function evaluateCommand(cmd, config) {
  const { command, args: args2 } = cmd;
  for (const layer of config.layers) {
    if (layer.alwaysDeny.includes(command)) {
      return { command, args: args2, decision: "deny", reason: `"${command}" is blocked`, matchedRule: "alwaysDeny" };
    }
    if (layer.alwaysAllow.includes(command)) {
      return { command, args: args2, decision: "allow", reason: `"${command}" is safe`, matchedRule: "alwaysAllow" };
    }
  }
  if ((command === "ssh" || command === "scp" || command === "rsync") && config.trustedSSHHosts?.length) {
    const sshResult = evaluateSSHCommand(cmd, config);
    if (sshResult) return sshResult;
  }
  if (command === "docker" && config.trustedDockerContainers?.length) {
    const dockerResult = evaluateDockerExec(cmd, config);
    if (dockerResult) return dockerResult;
  }
  if (command === "kubectl" && config.trustedKubectlContexts?.length) {
    const kubectlResult = evaluateKubectlExec(cmd, config);
    if (kubectlResult) return kubectlResult;
  }
  if (command === "sprite" && config.trustedSprites?.length) {
    const spriteResult = evaluateSpriteExec(cmd, config);
    if (spriteResult) return spriteResult;
  }
  for (const layer of config.layers) {
    const rule = layer.rules.find((r) => r.command === command);
    if (rule) {
      return evaluateRule(cmd, rule);
    }
  }
  return { command, args: args2, decision: config.defaultDecision, reason: `No rule for "${command}"`, matchedRule: "default" };
}
function evaluateRule(cmd, rule) {
  const { command, args: args2 } = cmd;
  const argsJoined = args2.join(" ");
  for (const pattern of rule.argPatterns || []) {
    const m = pattern.match;
    let matched = true;
    if (m.noArgs !== void 0) {
      matched = matched && m.noArgs === (args2.length === 0);
    }
    if (m.argsMatch && matched) {
      matched = m.argsMatch.some((re) => new RegExp(re).test(argsJoined));
    }
    if (m.anyArgMatches && matched) {
      matched = args2.some((arg) => m.anyArgMatches.some((re) => new RegExp(re).test(arg)));
    }
    if (m.argCount && matched) {
      if (m.argCount.min !== void 0) matched = matched && args2.length >= m.argCount.min;
      if (m.argCount.max !== void 0) matched = matched && args2.length <= m.argCount.max;
    }
    if (m.not) matched = !matched;
    if (matched) {
      return {
        command,
        args: args2,
        decision: pattern.decision,
        reason: pattern.reason || pattern.description || `Matched pattern for "${command}"`,
        matchedRule: `${command}:argPattern`
      };
    }
  }
  return {
    command,
    args: args2,
    decision: rule.default,
    reason: `Default for "${command}"`,
    matchedRule: `${command}:default`
  };
}
var SSH_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
  "-b",
  "-c",
  "-D",
  "-E",
  "-e",
  "-F",
  "-I",
  "-i",
  "-J",
  "-L",
  "-l",
  "-m",
  "-O",
  "-o",
  "-p",
  "-Q",
  "-R",
  "-S",
  "-W",
  "-w"
]);
function globToRegex(pattern) {
  let regex = "";
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === "*") {
      regex += ".*";
    } else if (ch === "?") {
      regex += ".";
    } else if (ch === "[") {
      i++;
      if (i < pattern.length && pattern[i] === "!") {
        regex += "[^";
        i++;
      } else {
        regex += "[";
      }
      while (i < pattern.length && pattern[i] !== "]") {
        regex += pattern[i];
        i++;
      }
      if (i < pattern.length) {
        regex += "]";
      }
    } else if (ch === "{") {
      const end = pattern.indexOf("}", i);
      if (end !== -1) {
        const alternatives = pattern.slice(i + 1, end).split(",").map((s) => s.replace(/[.+^$|\\()]/g, "\\$&"));
        regex += `(${alternatives.join("|")})`;
        i = end;
      } else {
        regex += "\\{";
      }
    } else if (".+^$|\\()".includes(ch)) {
      regex += "\\" + ch;
    } else {
      regex += ch;
    }
    i++;
  }
  return new RegExp(`^${regex}$`);
}
function matchesPattern(value, patterns) {
  return patterns.some((p) => globToRegex(p).test(value));
}
function parseSSHArgs(args2) {
  let host = null;
  const remoteArgs = [];
  let i = 0;
  while (i < args2.length) {
    const arg = args2[i];
    if (SSH_FLAGS_WITH_VALUE.has(arg)) {
      i += 2;
      continue;
    }
    if (arg.startsWith("-")) {
      i++;
      continue;
    }
    if (!host) {
      host = arg.includes("@") ? arg.split("@").pop() : arg;
      i++;
      while (i < args2.length) {
        remoteArgs.push(args2[i]);
        i++;
      }
      break;
    }
    i++;
  }
  return {
    host,
    remoteCommand: remoteArgs.length > 0 ? remoteArgs.join(" ") : null
  };
}
function extractHostFromRemotePath(args2) {
  for (const arg of args2) {
    const match = arg.match(/^(?:[^@]+@)?([^:]+):/);
    if (match) return match[1];
  }
  return null;
}
function evaluateSSHCommand(cmd, config) {
  const { command, args: args2 } = cmd;
  const trustedHosts = config.trustedSSHHosts || [];
  if (command === "scp" || command === "rsync") {
    const host2 = extractHostFromRemotePath(args2);
    if (host2 && matchesPattern(host2, trustedHosts)) {
      return {
        command,
        args: args2,
        decision: "allow",
        reason: `Trusted SSH host "${host2}"`,
        matchedRule: "trustedSSHHosts"
      };
    }
    return null;
  }
  const { host, remoteCommand } = parseSSHArgs(args2);
  if (!host || !matchesPattern(host, trustedHosts)) return null;
  if (!remoteCommand) {
    return {
      command,
      args: args2,
      decision: "allow",
      reason: `Trusted SSH host "${host}" (interactive)`,
      matchedRule: "trustedSSHHosts"
    };
  }
  const parsed = parseCommand(remoteCommand);
  const result = evaluate(parsed, configWithContextOverrides(config));
  return {
    command,
    args: args2,
    decision: result.decision,
    reason: `Trusted SSH host "${host}": ${result.reason}`,
    matchedRule: "trustedSSHHosts"
  };
}
var DOCKER_EXEC_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
  "-e",
  "--env",
  "--env-file",
  "-u",
  "--user",
  "-w",
  "--workdir",
  "--detach-keys"
]);
var INTERACTIVE_SHELLS = /* @__PURE__ */ new Set(["bash", "sh", "zsh"]);
function configWithContextOverrides(config) {
  if (!config.trustedContextOverrides) return config;
  return {
    ...config,
    layers: [config.trustedContextOverrides, ...config.layers]
  };
}
function evaluateRemoteCommand(remoteArgs, config) {
  const overriddenConfig = configWithContextOverrides(config);
  if (remoteArgs.length === 0) {
    return { decision: "allow", reason: "interactive", details: [] };
  }
  const remoteCmd = remoteArgs[0];
  if (INTERACTIVE_SHELLS.has(remoteCmd) && remoteArgs.length === 1) {
    return { decision: "allow", reason: "interactive shell", details: [] };
  }
  if (INTERACTIVE_SHELLS.has(remoteCmd) && remoteArgs[1] === "-c" && remoteArgs.length >= 3) {
    const innerCommand = remoteArgs.slice(2).join(" ");
    const parsed2 = parseCommand(innerCommand);
    return evaluate(parsed2, overriddenConfig);
  }
  const parsed = {
    commands: [{ command: remoteCmd, args: remoteArgs.slice(1) }],
    hasSubshell: false,
    subshellCommands: []
  };
  return evaluate(parsed, overriddenConfig);
}
function parseDockerExecArgs(args2) {
  let target = null;
  const remoteArgs = [];
  let i = 0;
  while (i < args2.length) {
    const arg = args2[i];
    if (DOCKER_EXEC_FLAGS_WITH_VALUE.has(arg)) {
      i += 2;
      continue;
    }
    if (arg.startsWith("-")) {
      i++;
      continue;
    }
    if (!target) {
      target = arg;
      i++;
      while (i < args2.length) {
        remoteArgs.push(args2[i]);
        i++;
      }
      break;
    }
    i++;
  }
  return { target, remoteArgs };
}
function evaluateDockerExec(cmd, config) {
  const { command, args: args2 } = cmd;
  if (args2[0] !== "exec") return null;
  const { target, remoteArgs } = parseDockerExecArgs(args2.slice(1));
  if (!target || !matchesPattern(target, config.trustedDockerContainers || [])) return null;
  const result = evaluateRemoteCommand(remoteArgs, config);
  return {
    command,
    args: args2,
    decision: result.decision,
    reason: `Trusted Docker container "${target}" (${result.reason})`,
    matchedRule: "trustedDockerContainers"
  };
}
var KUBECTL_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
  "-n",
  "--namespace",
  "-c",
  "--container",
  "--context",
  "--cluster",
  "--kubeconfig",
  "-s",
  "--server",
  "--token",
  "--user",
  "--as",
  "--as-group",
  "--certificate-authority",
  "--client-certificate",
  "--client-key",
  "-l",
  "--selector",
  "-f",
  "--filename",
  "--cache-dir",
  "--request-timeout",
  "-o",
  "--output"
]);
function parseKubectlExecArgs(args2) {
  let context = null;
  let pod = null;
  const remoteArgs = [];
  let i = 0;
  while (i < args2.length) {
    const arg = args2[i];
    if (arg === "--") {
      i++;
      while (i < args2.length) {
        remoteArgs.push(args2[i]);
        i++;
      }
      break;
    }
    if (arg.startsWith("--") && arg.includes("=")) {
      if (arg.startsWith("--context=")) {
        context = arg.split("=")[1];
      }
      i++;
      continue;
    }
    if (KUBECTL_FLAGS_WITH_VALUE.has(arg)) {
      if (arg === "--context") context = args2[i + 1] || null;
      i += 2;
      continue;
    }
    if (arg.startsWith("-")) {
      i++;
      continue;
    }
    if (!pod) {
      pod = arg;
    }
    i++;
  }
  return { context, pod, remoteArgs };
}
function evaluateKubectlExec(cmd, config) {
  const { command, args: args2 } = cmd;
  if (args2[0] !== "exec") return null;
  const { context, pod, remoteArgs } = parseKubectlExecArgs(args2.slice(1));
  const trustedContexts = config.trustedKubectlContexts || [];
  if (!context || !matchesPattern(context, trustedContexts)) return null;
  const result = evaluateRemoteCommand(remoteArgs, config);
  return {
    command,
    args: args2,
    decision: result.decision,
    reason: `Trusted kubectl context "${context}"${pod ? `, pod "${pod}"` : ""} (${result.reason})`,
    matchedRule: "trustedKubectlContexts"
  };
}
var SPRITE_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
  "-o",
  "--org",
  "-s",
  "--sprite"
]);
function parseSpriteExecArgs(args2) {
  let spriteName = null;
  const remoteArgs = [];
  let foundExec = false;
  let i = 0;
  while (i < args2.length) {
    const arg = args2[i];
    if (arg.startsWith("--") && arg.includes("=")) {
      if (arg.startsWith("--sprite=")) {
        spriteName = arg.split("=")[1];
      }
      i++;
      continue;
    }
    if (SPRITE_FLAGS_WITH_VALUE.has(arg)) {
      if (arg === "-s" || arg === "--sprite") {
        spriteName = args2[i + 1] || null;
      }
      i += 2;
      continue;
    }
    if (arg === "--debug") {
      i++;
      continue;
    }
    if (arg.startsWith("-")) {
      i++;
      continue;
    }
    if (!foundExec) {
      if (arg === "exec" || arg === "x" || arg === "console" || arg === "c") {
        foundExec = true;
        i++;
        continue;
      }
      return { spriteName: null, remoteArgs: [] };
    }
    while (i < args2.length) {
      remoteArgs.push(args2[i]);
      i++;
    }
    break;
  }
  return { spriteName, remoteArgs };
}
function evaluateSpriteExec(cmd, config) {
  const { command, args: args2 } = cmd;
  const { spriteName, remoteArgs } = parseSpriteExecArgs(args2);
  const trustedSprites = config.trustedSprites || [];
  if (!spriteName || !matchesPattern(spriteName, trustedSprites)) return null;
  const result = evaluateRemoteCommand(remoteArgs, config);
  return {
    command,
    args: args2,
    decision: result.decision,
    reason: `Trusted sprite "${spriteName}" (${result.reason})`,
    matchedRule: "trustedSprites"
  };
}

// src/rules.ts
var import_fs = require("fs");
var import_yaml = __toESM(require_dist2(), 1);
var import_os = require("os");
var import_path2 = require("path");

// src/defaults.ts
var SAFE_DEV_TOOLS = [
  "jest",
  "vitest",
  "tsc",
  "eslint",
  "prettier",
  "mkdirp",
  "concurrently",
  "turbo",
  "next",
  "nuxt",
  "vite",
  "astro",
  "playwright",
  "cypress",
  "mocha",
  "nyc",
  "c8",
  "ts-jest",
  "tsup",
  "esbuild",
  "rollup",
  "webpack",
  "prisma",
  "drizzle-kit",
  "typeorm",
  "knex",
  "sequelize-cli",
  "tailwindcss",
  "postcss",
  "autoprefixer",
  "lint-staged",
  "husky",
  "changeset",
  "semantic-release",
  "lerna",
  "nx",
  "create-react-app",
  "create-next-app",
  "create-vite",
  "degit",
  "storybook",
  "wrangler",
  "netlify",
  "vercel",
  "json"
];
var SCRIPT_RUNNERS = ["tsx", "ts-node", "nodemon"];
var REGISTRY_OPS = ["publish", "unpublish", "deprecate", "owner", "access", "token", "adduser", "login", "logout"];
var SAFE_PKG_MANAGER_CMDS = [
  "install",
  "add",
  "remove",
  "uninstall",
  "update",
  "upgrade",
  "outdated",
  "ls",
  "list",
  "run",
  "test",
  "start",
  "build",
  "init",
  "create",
  "info",
  "view",
  "show",
  "why",
  "pack",
  "cache",
  "config",
  "get",
  "set",
  "version",
  "help",
  "exec",
  "dedupe",
  "prune",
  "audit",
  "completion"
];
var VERSION_HELP_FLAGS = {
  match: { anyArgMatches: ["^--(version|help)$", "^-[vh]$"] },
  decision: "allow",
  description: "Version/help flags"
};
function anyArgMatchesPattern(items) {
  return `^(${items.join("|")})$`;
}
function safeDevToolsPattern() {
  return {
    match: { anyArgMatches: [anyArgMatchesPattern(SAFE_DEV_TOOLS)] },
    decision: "allow",
    description: "Well-known dev tools"
  };
}
function scriptRunnersPattern() {
  return {
    match: { anyArgMatches: [anyArgMatchesPattern(SCRIPT_RUNNERS)] },
    decision: "ask",
    reason: "Script runners can execute arbitrary code"
  };
}
function registryOpsPattern() {
  return {
    match: { anyArgMatches: [anyArgMatchesPattern(REGISTRY_OPS)] },
    decision: "ask",
    reason: "Registry modification"
  };
}
function pkgManagerRule(command, extraSafeCmds = []) {
  const safeCmds = [...SAFE_PKG_MANAGER_CMDS, ...extraSafeCmds];
  return {
    command,
    default: "ask",
    argPatterns: [
      registryOpsPattern(),
      {
        match: { anyArgMatches: [anyArgMatchesPattern(safeCmds)] },
        decision: "allow",
        description: `Standard ${command} commands`
      },
      VERSION_HELP_FLAGS
    ]
  };
}
function pkgRunnerRule(command) {
  return {
    command,
    default: "ask",
    argPatterns: [
      safeDevToolsPattern(),
      scriptRunnersPattern(),
      VERSION_HELP_FLAGS
    ]
  };
}
var DEFAULT_CONFIG = {
  defaultDecision: "ask",
  askOnSubshell: true,
  trustedSSHHosts: [],
  trustedDockerContainers: [],
  trustedKubectlContexts: [],
  trustedSprites: [],
  layers: [{
    alwaysAllow: [
      // Read-only file operations
      "cat",
      "head",
      "tail",
      "less",
      "more",
      "wc",
      "sort",
      "uniq",
      "tee",
      "diff",
      "comm",
      "cut",
      "paste",
      "tr",
      "fold",
      "expand",
      "unexpand",
      "column",
      "rev",
      "tac",
      "nl",
      "od",
      "xxd",
      "file",
      "stat",
      // Search/find
      "grep",
      "egrep",
      "fgrep",
      "rg",
      "ag",
      "ack",
      "find",
      "fd",
      "fzf",
      "locate",
      "which",
      "whereis",
      "type",
      "command",
      // Directory listing
      "ls",
      "dir",
      "tree",
      "exa",
      "eza",
      "lsd",
      // Path/string utilities
      "basename",
      "dirname",
      "realpath",
      "readlink",
      "echo",
      "printf",
      "true",
      "false",
      "test",
      "[",
      // Date/time
      "date",
      "cal",
      // Environment info
      "env",
      "printenv",
      "uname",
      "hostname",
      "whoami",
      "id",
      "pwd",
      // Process viewing (read-only)
      "ps",
      "top",
      "htop",
      "uptime",
      "free",
      "df",
      "du",
      "lsof",
      // Text processing
      "sed",
      "awk",
      "jq",
      "yq",
      "xargs",
      "seq",
      // Pagers and formatters
      "bat",
      "pygmentize",
      "highlight",
      // Version managers (read-only)
      "nvm",
      "fnm",
      "rbenv",
      "pyenv",
      // Terminal
      "stty",
      "tput",
      "reset",
      "clear",
      // Misc safe
      "cd",
      "pushd",
      "popd",
      "dirs",
      "hash",
      "alias",
      "set",
      "sleep",
      "wait",
      "time",
      "md5",
      "md5sum",
      "sha256sum",
      "shasum",
      "cksum",
      "base64",
      "openssl"
    ],
    alwaysDeny: [
      "sudo",
      "su",
      "doas",
      "mkfs",
      "fdisk",
      "dd",
      "shutdown",
      "reboot",
      "halt",
      "poweroff",
      "iptables",
      "ip6tables",
      "nft",
      "useradd",
      "userdel",
      "usermod",
      "groupadd",
      "groupdel",
      "crontab",
      "systemctl",
      "service",
      "launchctl"
    ],
    rules: [
      // --- CLI tools ---
      {
        command: "claude",
        default: "ask",
        argPatterns: [
          { match: { anyArgMatches: ["^--(version|help)$", "^-[vh]$"] }, decision: "allow", description: "Version/help flags" }
        ]
      },
      // --- Shell interpreters ---
      ...["bash", "sh", "zsh"].map((cmd) => ({
        command: cmd,
        default: "ask",
        argPatterns: [
          { match: { anyArgMatches: ["^--(version|help)$"] }, decision: "allow", description: "Version/help flags" }
        ]
      })),
      // --- Node.js ecosystem ---
      {
        command: "node",
        default: "ask",
        argPatterns: [
          { match: { anyArgMatches: ["^-e$", "^--eval", "^-p$", "^--print"] }, decision: "ask", reason: "Evaluating inline code" },
          { match: { anyArgMatches: ["^--(version|help)$", "^-[vh]$"] }, decision: "allow", description: "Version/help flags" },
          { match: { noArgs: true }, decision: "ask", reason: "Interactive REPL" }
        ]
      },
      // npx / bunx — package runners
      pkgRunnerRule("npx"),
      pkgRunnerRule("bunx"),
      // npm / pnpm / yarn — package managers
      pkgManagerRule("npm", ["ci", "search", "explain", "prefix", "root", "fund", "doctor", "diff", "pkg", "query", "shrinkwrap"]),
      pkgManagerRule("pnpm", ["store", "fetch", "doctor", "patch"]),
      pkgManagerRule("yarn", ["up", "dlx", "workspaces"]),
      // bun — runtime + package manager
      {
        command: "bun",
        default: "ask",
        argPatterns: [
          { match: { anyArgMatches: [anyArgMatchesPattern([...SAFE_PKG_MANAGER_CMDS, "ci", "pm", "x", "link", "unlink"])] }, decision: "allow", description: "Standard bun commands" },
          safeDevToolsPattern(),
          scriptRunnersPattern(),
          VERSION_HELP_FLAGS
        ]
      },
      // --- Python ---
      ...["python", "python3"].map((cmd) => ({
        command: cmd,
        default: "ask",
        argPatterns: [
          { match: { anyArgMatches: ["^--(version|help)$", "^-V$"] }, decision: "allow" }
        ]
      })),
      { command: "pip", default: "allow" },
      { command: "pip3", default: "allow" },
      {
        command: "uv",
        default: "allow",
        argPatterns: [
          { match: { anyArgMatches: ["^publish$"] }, decision: "ask", reason: "Publishing to PyPI" }
        ]
      },
      { command: "pipx", default: "ask" },
      // --- Git ---
      {
        command: "git",
        default: "allow",
        argPatterns: [
          { match: { argsMatch: ["push\\s+--force", "push\\s+-f\\b"] }, decision: "ask", reason: "Force push can overwrite remote history" },
          { match: { argsMatch: ["reset\\s+--hard"] }, decision: "ask", reason: "Hard reset discards changes" },
          { match: { anyArgMatches: ["^clean$"] }, decision: "ask", reason: "git clean removes untracked files" }
        ]
      },
      {
        command: "gh",
        default: "allow",
        argPatterns: [
          { match: { argsMatch: ["repo\\s+delete", "repo\\s+archive"] }, decision: "ask", reason: "Destructive repo operation" }
        ]
      },
      // --- Build tools ---
      { command: "make", default: "allow" },
      { command: "cmake", default: "allow" },
      {
        command: "cargo",
        default: "allow",
        argPatterns: [
          { match: { anyArgMatches: ["^(publish|login|logout|owner|yank)$"] }, decision: "ask", reason: "Registry modification" }
        ]
      },
      {
        command: "go",
        default: "allow",
        argPatterns: [
          { match: { anyArgMatches: ["^generate$"] }, decision: "ask", reason: "go generate runs arbitrary commands" }
        ]
      },
      { command: "rustup", default: "allow" },
      { command: "tsc", default: "allow" },
      { command: "turbo", default: "allow" },
      { command: "nx", default: "allow" },
      { command: "lerna", default: "allow" },
      // --- Docker ---
      {
        command: "docker",
        default: "ask",
        argPatterns: [
          { match: { anyArgMatches: ["^(ps|images|logs|inspect|stats|top|version|info)$"] }, decision: "allow", description: "Read-only docker commands" },
          { match: { anyArgMatches: ["^(build|run|compose|exec|pull|stop|start|restart|create)$"] }, decision: "ask", reason: "Docker state-changing operation" },
          { match: { anyArgMatches: ["^(system\\s+prune|container\\s+prune|image\\s+prune)$"] }, decision: "ask", reason: "Docker prune operations" }
        ]
      },
      { command: "docker-compose", default: "ask" },
      { command: "kubectl", default: "ask" },
      // --- File operations ---
      {
        command: "rm",
        default: "ask",
        argPatterns: [
          { match: { argsMatch: ["-[^\\s]*r[^\\s]*f|-[^\\s]*f[^\\s]*r"] }, decision: "ask", reason: "Recursive force delete (rm -rf)" },
          { match: { argsMatch: ["-[^\\s]*r"] }, decision: "ask", reason: "Recursive delete" },
          { match: { argCount: { max: 3 }, not: false }, decision: "allow", description: "Deleting a small number of non-recursive files" }
        ]
      },
      { command: "mkdir", default: "allow" },
      { command: "touch", default: "allow" },
      { command: "cp", default: "allow" },
      { command: "mv", default: "allow" },
      { command: "ln", default: "allow" },
      {
        command: "chmod",
        default: "ask",
        argPatterns: [
          { match: { argsMatch: ["-R\\s+777"] }, decision: "deny", reason: "Recursively setting world-writable permissions" }
        ]
      },
      { command: "chown", default: "ask" },
      // --- Network ---
      { command: "curl", default: "allow" },
      { command: "wget", default: "allow" },
      { command: "ssh", default: "ask" },
      { command: "scp", default: "ask" },
      { command: "rsync", default: "ask" },
      // --- Package managers ---
      { command: "brew", default: "allow" },
      { command: "apt", default: "ask" },
      { command: "apt-get", default: "ask" },
      { command: "yum", default: "ask" },
      { command: "dnf", default: "ask" },
      { command: "pacman", default: "ask" },
      // --- Terraform / IaC ---
      { command: "terraform", default: "ask", argPatterns: [
        { match: { anyArgMatches: ["^(plan|validate|fmt|show|state|output|providers|version|graph|console)$"] }, decision: "allow", description: "Read-only terraform commands" }
      ] }
    ]
  }]
};

// src/rules.ts
var USER_CONFIG_PATHS = [
  (0, import_path2.join)((0, import_os.homedir)(), ".claude", "warden.yaml"),
  (0, import_path2.join)((0, import_os.homedir)(), ".claude", "warden.json")
];
var PROJECT_CONFIG_NAMES = [
  ".claude/warden.yaml",
  ".claude/warden.json"
];
function loadConfig(cwd) {
  const config = structuredClone(DEFAULT_CONFIG);
  const defaultLayer = config.layers[0];
  let userLayer = null;
  let userRaw = null;
  for (const configPath of USER_CONFIG_PATHS) {
    const result = tryLoadFile(configPath);
    if (result) {
      userLayer = extractLayer(result);
      userRaw = result;
      break;
    }
  }
  let workspaceLayer = null;
  let workspaceRaw = null;
  if (cwd) {
    for (const name of PROJECT_CONFIG_NAMES) {
      const result = tryLoadFile((0, import_path2.join)(cwd, name));
      if (result) {
        workspaceLayer = extractLayer(result);
        workspaceRaw = result;
        break;
      }
    }
  }
  config.layers = [
    ...workspaceLayer ? [workspaceLayer] : [],
    ...userLayer ? [userLayer] : [],
    defaultLayer
  ];
  if (userRaw) mergeNonLayerFields(config, userRaw);
  if (workspaceRaw) mergeNonLayerFields(config, workspaceRaw);
  return config;
}
function tryLoadFile(filePath) {
  if (!(0, import_fs.existsSync)(filePath)) return null;
  try {
    const raw = (0, import_fs.readFileSync)(filePath, "utf-8");
    const parsed = filePath.endsWith(".yaml") || filePath.endsWith(".yml") ? (0, import_yaml.parse)(raw) : JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch {
  }
  return null;
}
function extractLayer(raw) {
  return {
    alwaysAllow: Array.isArray(raw.alwaysAllow) ? raw.alwaysAllow : [],
    alwaysDeny: Array.isArray(raw.alwaysDeny) ? raw.alwaysDeny : [],
    rules: Array.isArray(raw.rules) ? raw.rules : []
  };
}
function mergeNonLayerFields(config, raw) {
  if (Array.isArray(raw.trustedSSHHosts)) {
    config.trustedSSHHosts = [...config.trustedSSHHosts || [], ...raw.trustedSSHHosts];
  }
  if (Array.isArray(raw.trustedDockerContainers)) {
    config.trustedDockerContainers = [...config.trustedDockerContainers || [], ...raw.trustedDockerContainers];
  }
  if (Array.isArray(raw.trustedKubectlContexts)) {
    config.trustedKubectlContexts = [...config.trustedKubectlContexts || [], ...raw.trustedKubectlContexts];
  }
  if (Array.isArray(raw.trustedSprites)) {
    config.trustedSprites = [...config.trustedSprites || [], ...raw.trustedSprites];
  }
  if (typeof raw.defaultDecision === "string") {
    config.defaultDecision = raw.defaultDecision;
  }
  if (typeof raw.askOnSubshell === "boolean") {
    config.askOnSubshell = raw.askOnSubshell;
  }
  if (raw.trustedContextOverrides && typeof raw.trustedContextOverrides === "object") {
    const overrides = raw.trustedContextOverrides;
    const layer = extractLayer(overrides);
    if (config.trustedContextOverrides) {
      config.trustedContextOverrides = {
        alwaysAllow: [...layer.alwaysAllow, ...config.trustedContextOverrides.alwaysAllow],
        alwaysDeny: [...layer.alwaysDeny, ...config.trustedContextOverrides.alwaysDeny],
        rules: [...layer.rules, ...config.trustedContextOverrides.rules]
      };
    } else {
      config.trustedContextOverrides = layer;
    }
  }
}

// src/suggest.ts
function generateAllowSnippet(details) {
  const lines = [];
  const alwaysAllowCmds = [];
  const ruleCmds = [];
  for (const d of details) {
    if (d.decision === "allow") continue;
    if (d.matchedRule === "alwaysDeny" || d.matchedRule === "default") {
      if (!alwaysAllowCmds.includes(d.command)) {
        alwaysAllowCmds.push(d.command);
      }
    } else if (d.matchedRule?.endsWith(":default") || d.matchedRule?.endsWith(":argPattern")) {
      if (!ruleCmds.includes(d.command)) {
        ruleCmds.push(d.command);
      }
    }
  }
  if (alwaysAllowCmds.length > 0) {
    lines.push("alwaysAllow:");
    for (const cmd of alwaysAllowCmds) {
      lines.push(`  - "${cmd}"`);
    }
  }
  if (ruleCmds.length > 0) {
    lines.push("rules:");
    for (const cmd of ruleCmds) {
      lines.push(`  - command: "${cmd}"`);
      lines.push("    default: allow");
    }
  }
  return lines.join("\n");
}
function formatSystemMessage(decision, rawCommand, details) {
  const relevant = details.filter((d) => d.decision !== "allow");
  if (decision === "ask") {
    const parts = relevant.map((d) => `\`${d.command}\`: ${d.reason}`);
    const header = `[warden] ${parts.join(" | ")}`;
    const subcommandHints = relevant.filter((d) => d.args.length > 0).map((d) => {
      const sub = d.args[0];
      return `  Option A: Allow all \`${d.command}\` \u2192 \`/warden-allow ${d.command}\`
  Option B: Allow only \`${d.command} ${sub}\` \u2192 \`/warden-allow ${d.command} ${sub}\``;
    });
    if (subcommandHints.length > 0) {
      return `${header}
${subcommandHints.join("\n")}
See /warden-allow`;
    }
    return `${header} \u2014 To auto-allow, see /warden-allow`;
  }
  const lines = ["[warden] Command blocked", ""];
  if (relevant.length > 0) {
    for (const d of relevant) {
      lines.push(`- \`${d.command}\`: ${d.reason}`);
    }
    lines.push("");
  }
  const snippet = generateAllowSnippet(details);
  if (snippet) {
    lines.push("To allow this in the future, add to your warden config:");
    lines.push("");
    lines.push("```yaml");
    lines.push(snippet);
    lines.push("```");
    lines.push("");
    lines.push("Config locations:");
    lines.push("- User-level (all projects): `~/.claude/warden.yaml`");
    lines.push("- Project-level (this project): `.claude/warden.yaml`");
    lines.push("");
    lines.push("Project config takes priority over user config.");
  }
  return lines.join("\n");
}

// src/index.ts
async function main() {
  let raw = "";
  for await (const chunk of process.stdin) {
    raw += chunk;
  }
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }
  if (input.tool_name !== "Bash") {
    process.exit(0);
  }
  const command = input.tool_input?.command;
  if (!command || typeof command !== "string") {
    process.exit(0);
  }
  const config = loadConfig(input.cwd);
  const parsed = parseCommand(command);
  const result = evaluate(parsed, config);
  if (result.decision === "allow") {
    const output2 = {
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "allow",
        permissionDecisionReason: `[warden] ${result.reason}`
      }
    };
    process.stdout.write(JSON.stringify(output2));
    process.exit(0);
  }
  if (result.decision === "deny") {
    const msg2 = formatSystemMessage("deny", command, result.details);
    const output2 = {
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: msg2
      }
    };
    process.stdout.write(JSON.stringify(output2));
    process.stderr.write(`[warden] Blocked: ${result.reason}
`);
    process.exit(2);
  }
  const msg = formatSystemMessage("ask", command, result.details);
  const output = {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: msg
    }
  };
  process.stdout.write(JSON.stringify(output));
  process.exit(0);
}
main().catch(() => process.exit(0));
/*! Bundled license information:

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

array-last/index.js:
  (*!
   * array-last <https://github.com/jonschlinkert/array-last>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

babylon/lib/index.js:
  (*! https://mths.be/fromcodepoint v0.2.1 by @mathias *)

string.fromcodepoint/fromcodepoint.js:
  (*! http://mths.be/fromcodepoint v0.2.1 by @mathias *)
*/
