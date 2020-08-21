'use strict';

var Rsync  = require('../rsync');


describe('filters', function () {
    var command;

    beforeEach(function () {
        command = Rsync.build({
            'source':      'SOURCE',
            'destination': 'DESTINATION'
        });
    });


    describe('#patterns', function () {
        it('Should interpret the first character', function () {
            command.patterns(['-.git', '+/tests/*.test.js']);

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--exclude=.git --include=/tests/*.test.js');
        });

        it('Should be able to be set as an Object', function () {
            command.patterns([
                { 'action': '+', 'pattern': '.git' },
                { 'action': '-', 'pattern': '/tests/*.test.js' }
            ]);

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--include=.git --exclude=/tests/*.test.js');
        });

        it('Should throw an error for invalid patterns', function () {
            expect(() => {
                command.patterns(['*invalid'])
            }).toThrow(/^invalid pattern:/i);
        });

        it('Should add patterns to output in order added', function () {
            command.patterns([
                { 'action': '-', 'pattern': '.git' },
                { 'action': '+', 'pattern': '/tests/*.test.js' },
                '-build/*'
            ]);

            expect(command._patterns).toHaveLength(3);
            expect(command.command()).toMatch('--exclude=.git --include=/tests/*.test.js --exclude=build/*');
        });
    });


    describe('#exclude', function () {
        it('Should accept patterns as arguments', function () {
            command.exclude('.git', '.out');

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--exclude=.git --exclude=.out');
        });

        it ('Should accept patterns as an Array', function () {
            command.exclude(['.build', 'docs']);

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--exclude=.build --exclude=docs');
        });

        it('Should add patterns to output in order added', function () {
            command.exclude('.git', 'docs', '/tests/*.test.js');

            expect(command._patterns).toHaveLength(3);
            expect(command.command()).toMatch('--exclude=.git --exclude=docs --exclude=/tests/*.test.js');
        });

        it('Should escape filenames', function () {
            command.exclude('with space', 'tests/* test.js');

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--exclude=with\\ space --exclude=tests/*\\ test.js')
        });
    });


    describe('#include', function () {
        it('Should accept patterns as arguments', function () {
            command.include('.git', '.out');

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--include=.git --include=.out');
        });

        it ('Should accept patterns as an Array', function () {
            command.include(['.build', 'docs']);

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--include=.build --include=docs');
        });

        it('Should add patterns to output in order added', function () {
            command.include('LICENSE', 'README.md', 'rsync.js');

            expect(command._patterns).toHaveLength(3);
            expect(command.command()).toMatch('--include=LICENSE --include=README.md --include=rsync.js');
        });

        it('Should escape filenames', function () {
            command.include('LICENSE FILE', '/tests/* test.js');

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--include=LICENSE\\ FILE --include=/tests/*\\ test.js');
        });
    });
});
