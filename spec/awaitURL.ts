import * as mocha from 'mocha';
import {awaitURL} from '../src';
import {assert} from 'chai';

describe(`Tests for method: awaitURL`, function() {

    this.timeout('10s');

    describe("Default usage", () => {

        it(`Succeeds on an active URL`, async () => {

            const result = await awaitURL('http://google.com');
            assert(result === true, 'failed');
        });

        it(`fails on an inactive URL`, function(done) {

            awaitURL('http://nowherenohownevereveratall.com', {retries:1})
                .then(_ => {
                    done('Returned successfully - which it should of done.')
                })
                .catch(err => done());
        })

    });

});