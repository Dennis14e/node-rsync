'use strict';

var Rsync = require('../rsync');


/**
 * Some general and weird test cases for command output.
 *
 * These tests are meant as a general safeguard to complement
 * unit tests.
 */
describe('output tests', function () {
    var rsync;

    it('shoud build case 1', function () {
        expect.assertions(1);

        rsync = new Rsync()
            .flags('avz')
            .source('path_a/')
            .exclude('no-go.txt')
            .exclude('with space')
            .exclude('.git')
            .exclude('*.tiff')
            .destination('path_b');

        expect(rsync.command()).toBe(
            'rsync -avz --exclude=no-go.txt --exclude=with\\ space --exclude=.git --exclude=*.tiff path_a/ path_b'
        );
    });

    it('shoud build case 2', function () {
        expect.assertions(1);

        rsync = new Rsync()
            .flags('rav')
            .set('f', '- .git')
            .source('test-dir/')
            .destination('test-dir-copy');

        expect(rsync.command()).toBe(
            'rsync -rav -f "- .git" test-dir/ test-dir-copy'
        );
    });

});
