import {resolve} from 'path';
import {existsSync, readFileSync} from 'fs';

interface IgetModuleInfoOptions {
    useInstalledVersion?: boolean
}

interface IgetModuleInfoResponse {
    dependency: boolean;
    devDependency: boolean;
    peerDependency: boolean;
    version: string;
}

export async function getModuleInfo( pkg: string, options?:IgetModuleInfoOptions ): Promise<IgetModuleInfoResponse> {

    options = options || {};

    let result:IgetModuleInfoResponse = {
        dependency: false,
        devDependency: false,
        peerDependency: false,
        version: ''
    };

    if(!existsSync(resolve('package.json')))
        throw new Error('Could not find package.json');

    const contents = JSON.parse(readFileSync(resolve('package.json'), 'utf8'));

    result.dependency = !!contents.dependencies && !!contents.dependencies[pkg];
    result.devDependency = !!contents.devDependencies && !!contents.devDependencies[pkg];
    result.peerDependency = !!contents.peerDependencies && !!contents.peerDependencies[pkg];

    if(!result.dependency && !result.devDependency)
        throw new Error(`Module ${pkg} not found in package.json as either a dependency of devDependency`);

    result.version = contents.dependencies[pkg] || contents.devDependencies[pkg];
    result.version = result.version.replace(/\^|@|~/g, '');
    return result;
}