import * as mocha from 'mocha';
import {getModuleInfo} from '../src';
import {assert} from 'chai';

describe(`Tests for method: getModuleInfo`, function() {

    describe("Default usage", () => {

        it(`Succeeds on an active URL`, async () => {

            const result = await getModuleInfo('mocha');
            assert(result.dependency === false, 'failed');
            assert(result.devDependency === true, 'failed');
            assert(result.peerDependency === false, 'failed');
            assert(result.version, 'failed');
        });

    });

});