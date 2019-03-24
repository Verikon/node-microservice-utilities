"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_reachable_1 = __importDefault(require("is-reachable"));
;
function awaitURL(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = options || {};
        options.retries = options.retries === undefined ? Infinity : options.retries;
        options.retryInterval = options.retryInterval === undefined ? 3000 : options.retryInterval;
        options.silent = options.silent === undefined ? true : options.silent;
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const i = setInterval((_) => __awaiter(this, void 0, void 0, function* () {
                if (attempts >= options.retries) {
                    clearInterval(i);
                    return reject(`URL inactive after ${attempts} attempts`);
                }
                attempts++;
                const alive = yield is_reachable_1.default(url);
                if (alive) {
                    if (!options.silent)
                        console.log(`connected to downstream PRISMA server at ${process.env.AUTH_PRISMA_URI}`);
                    clearInterval(i);
                    resolve(true);
                }
                else {
                    if (!options.silent)
                        console.log(`waiting for downstream PRISMA server at ${process.env.AUTH_PRISMA_URI}`);
                }
            }), options.retryInterval);
        });
    });
}
exports.awaitURL = awaitURL;
