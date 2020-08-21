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
        it('should interpret the first character', function () {
            expect.assertions(2);

            command.patterns(['-.git', '+/tests/*.test.js']);

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--exclude=.git --include=/tests/*.test.js');
        });

        it('should be able to be set as an Object', function () {
            expect.assertions(2);

            command.patterns([
                { 'action': '+', 'pattern': '.git' },
                { 'action': '-', 'pattern': '/tests/*.test.js' }
            ]);

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--include=.git --exclude=/tests/*.test.js');
        });

        it('should throw an error for invalid patterns', function () {
            expect.assertions(1);

            expect(function () {
                command.patterns(['*invalid'])
            }).toThrow(/^invalid pattern:/i);
        });

        it('should add patterns to output in order added', function () {
            expect.assertions(2);

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
        it('should accept patterns as arguments', function () {
            expect.assertions(2);

            command.exclude('.git', '.out');

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--exclude=.git --exclude=.out');
        });

        it ('should accept patterns as an Array', function () {
            expect.assertions(2);

            command.exclude(['.build', 'docs']);

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--exclude=.build --exclude=docs');
        });

        it('should add patterns to output in order added', function () {
            expect.assertions(2);

            command.exclude('.git', 'docs', '/tests/*.test.js');

            expect(command._patterns).toHaveLength(3);
            expect(command.command()).toMatch('--exclude=.git --exclude=docs --exclude=/tests/*.test.js');
        });

        it('should escape filenames', function () {
            expect.assertions(2);

            command.exclude('with space', 'tests/* test.js');

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--exclude=with\\ space --exclude=tests/*\\ test.js')
        });
    });


    describe('#include', function () {
        it('should accept patterns as arguments', function () {
            expect.assertions(2);

            command.include('.git', '.out');

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--include=.git --include=.out');
        });

        it ('should accept patterns as an Array', function () {
            expect.assertions(2);

            command.include(['.build', 'docs']);

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--include=.build --include=docs');
        });

        it('should add patterns to output in order added', function () {
            expect.assertions(2);

            command.include('LICENSE', 'README.md', 'rsync.js');

            expect(command._patterns).toHaveLength(3);
            expect(command.command()).toMatch('--include=LICENSE --include=README.md --include=rsync.js');
        });

        it('should escape filenames', function () {
            expect.assertions(2);

            command.include('LICENSE FILE', '/tests/* test.js');

            expect(command._patterns).toHaveLength(2);
            expect(command.command()).toMatch('--include=LICENSE\\ FILE --include=/tests/*\\ test.js');
        });
    });
});
