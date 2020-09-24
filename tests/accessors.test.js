'use strict';

var Rsync = require('../rsync');
var path = require('path');


describe('accessors', function () {

    describe('#executable', function () {
        it('should set the executable to use', function () {
            expect.assertions(2);

            var rsync = Rsync.build({
                'source':      'a.txt',
                'destination': 'b.txt',
                'executable':  '/usr/local/bin/rsync'
            });

            expect(rsync.executable()).toBe('/usr/local/bin/rsync');
            expect(rsync.command()).toBe('/usr/local/bin/rsync a.txt b.txt');
        });
    });


    describe('#executableShell', function () {
        it('should set the the executable shell to use', function () {
            expect.assertions(1);

            var rsync = Rsync.build({
                'source':          'a.txt',
                'destination':     'b.txt',
                'executableShell': '/bin/zsh'
            });

            expect(rsync.executableShell()).toBe('/bin/zsh');
        });
    });


    describe('#cwd', function () {
        it('should set the the cwd to use', function () {
            expect.assertions(1);

            var rsync = Rsync.build({
                'source':      'a.txt',
                'destination': 'b.txt',
                'cwd':         __dirname + '/..'
            });

            expect(rsync.cwd()).toBe(path.resolve(__dirname, '..'));
        });

        it('should throw if the cwd is not a string', function () {
            expect.assertions(1);

            expect(function () {
                Rsync.build({
                    'cwd': []
                });
            }).toThrow(/^directory should be a string/i);
        });
    });

    describe('#env', function () {
        it('should set the the env variables to use', function () {
            expect.assertions(1);

            var rsync = Rsync.build({
                'source':      'a.txt',
                'destination': 'b.txt',
                'env':         {'red': 'blue'}
            });

            expect(rsync.env().red).toBe('blue');
        });

        it('should throw if the env is not a string', function () {
            expect.assertions(1);

            expect(function () {
                Rsync.build({
                    'env': 'string'
                });
            }).toThrow(/^environment should be an object/i);
        });
    });

});
