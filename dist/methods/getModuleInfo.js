"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
function getModuleInfo(pkg, options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = options || {};
        let result = {
            dependency: false,
            devDependency: false,
            peerDependency: false,
            version: ''
        };
        if (!fs_1.existsSync(path_1.resolve('package.json')))
            throw new Error('Could not find package.json');
        const contents = JSON.parse(fs_1.readFileSync(path_1.resolve('package.json'), 'utf8'));
        result.dependency = !!contents.dependencies && !!contents.dependencies[pkg];
        result.devDependency = !!contents.devDependencies && !!contents.devDependencies[pkg];
        result.peerDependency = !!contents.peerDependencies && !!contents.peerDependencies[pkg];
        if (!result.dependency && !result.devDependency)
            throw new Error(`Module ${pkg} not found in package.json as either a dependency of devDependency`);
        result.version = contents.dependencies[pkg] || contents.devDependencies[pkg];
        return result;
    });
}
exports.getModuleInfo = getModuleInfo;
