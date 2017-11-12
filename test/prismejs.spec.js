import { assert, expect } from 'chai';
import prismejs from '../lib/prismejs.js';

const PrismeJS = new prismejs();

const mockupJSONAPIInput = {
    id: '2610-MY-SUPER-UUID',
    data: [
        {
            modelDataId: 'user_name',
            value: 'Barney Stinson'
        },
        {
            modelDataId: 'user_status',
            value: 'sleeping'
        },
        {
            modelDataId: 'user_type',
            value: 'moderator'
        },
        {
            modelDataId: 'user_current_project_id',
            value: 'project_moon'
        },
        {
            modelDataId: 'user_current_project_deadline',
            value: '2022-10-26T16:54:05+01:00'
        }
    ]
};

const modelOutput = {
    id: 'id',
    name: 'data.modelDataId:user_name[value]',
    type: 'data.modelDataId:user_type[value]',
    status: 'data.modelDataId:user_status[value]',
    currentProject: {
        id: 'data.modelDataId:user_current_project_id[value]',
        deadline: 'data.modelDataId:user_current_project_deadline[value]'
    }
};

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
    const PrismeJSOutput = PrismeJS.format(mockupJSONAPIInput, modelOutput);

    it('PrismeJS formatted user name >>> "Barney Stinson"', function() {
        assert.equal('Barney Stinson', PrismeJSOutput[0].name);
    });

    it('PrismeJS formatted user type >>> "moderator"', function() {
        assert.equal('moderator', PrismeJSOutput[0].type);
    });

    it('PrismeJS formatted user status >>> "sleeping"', function() {
        assert.equal('sleeping', PrismeJSOutput[0].status);
    });

    it('PrismeJS formatted user current project id >>> "project_moon"', function() {
        assert.equal('project_moon', PrismeJSOutput[0].currentProject.id);
    });

    it('PrismeJS formatted user current project id >>> "2022-10-26T16:54:05+01:00"', function() {
        assert.equal(
            '2022-10-26T16:54:05+01:00',
            PrismeJSOutput[0].currentProject.deadline
        );
    });
});
