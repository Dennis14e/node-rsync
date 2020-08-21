'use strict';

var Rsync = require('../rsync');
var path = require('path');


describe('accessors', function () {

    describe('#executable', function () {
        it('Should set the executable to use', function () {
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
        it('Should set the the executable shell to use', function () {
            var rsync = Rsync.build({
                'source':          'a.txt',
                'destination':     'b.txt',
                'executableShell': '/bin/zsh'
            });

            expect(rsync.executableShell()).toBe('/bin/zsh');
        });
    });


    describe('#cwd', function () {
        it('Should set the the cwd to use', function () {
            var rsync = Rsync.build({
                'source':      'a.txt',
                'destination': 'b.txt',
                'cwd':         __dirname + '/..'
            });

            expect(rsync.cwd()).toBe(path.resolve(__dirname, '..'));
        });
    });

    describe('#env', function () {
        it('Should set the the env variables to use', function () {
            var rsync = Rsync.build({
                'source':      'a.txt',
                'destination': 'b.txt',
                'env':         {'red': 'blue'}
            });

            expect(rsync.env().red).toBe('blue');
        });
    });

});
