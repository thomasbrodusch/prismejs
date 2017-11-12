import { assert, expect } from 'chai';
import prismejs from '../lib/prismejs.js';
import userPrisme from '../examples/prismeModels/user';
import mockupJSONAPIInput from '../examples/mockupAPI';

const PrismeJS = new prismejs();
const PrismeJSOutput = PrismeJS.format(mockupJSONAPIInput, userPrisme);

describe('PrismeJS instance', function() {
    it('return type should be "json" by default', function() {
        assert.equal('json', PrismeJS.returnType);
    });

    it('a wrong return type should set the return type by default', function() {
        PrismeJS.setReturnType('toto');
        assert.equal('json', PrismeJS.returnType);
    });
});

describe("PrismeJS formatted API's output for mockup user", function() {
    describe('First User PrismeJSOutput[0]', function() {
        it('PrismeJS formatted first user name >>> "Barney Stinson"', function() {
            assert.equal('Barney Stinson', PrismeJSOutput[0].name);
        });

        it('PrismeJS formatted first user type >>> "moderator"', function() {
            assert.equal('moderator', PrismeJSOutput[0].type);
        });

        it('PrismeJS formatted first user status >>> "sleeping"', function() {
            assert.equal('sleeping', PrismeJSOutput[0].status);
        });

        it('PrismeJS formatted first user current project id >>> "project_moon"', function() {
            assert.equal('project_moon', PrismeJSOutput[0].currentProject.id);
        });

        it('PrismeJS formatted first user current project id >>> "2022-10-26T16:54:05+01:00"', function() {
            assert.equal(
                '2022-10-26T16:54:05+01:00',
                PrismeJSOutput[0].currentProject.deadline
            );
        });
    });

    describe('Second User PrismeJSOutput[1]', function() {
        it('PrismeJS formatted first user name >>> "John Doe"', function() {
            assert.equal('Barney Stinson', PrismeJSOutput[0].name);
        });

        it('PrismeJS formatted first user type >>> "administrator"', function() {
            assert.equal('moderator', PrismeJSOutput[0].type);
        });

        it('PrismeJS formatted first user status >>> "eating"', function() {
            assert.equal('sleeping', PrismeJSOutput[0].status);
        });

        it('PrismeJS formatted first user current project id >>> "project_c3456fgrg_345D"', function() {
            assert.equal('project_moon', PrismeJSOutput[0].currentProject.id);
        });

        it('PrismeJS formatted first user current project id >>> "2018-04-03T16:54:05+01:00"', function() {
            assert.equal(
                '2022-10-26T16:54:05+01:00',
                PrismeJSOutput[0].currentProject.deadline
            );
        });
    });
});
