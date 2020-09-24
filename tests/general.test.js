'use strict';

var Rsync = require('../rsync');


/**
 * Some general and weird test cases for command output.
 *
 * These tests are meant as a general safeguard to complement
 * unit tests.
 */
describe('general tests', function () {
    it('should throw error for invalid config', function () {
        expect.assertions(1);

        expect(function () {
            new Rsync('invalid config');
        }).toThrow(/^rsync config must be an object/i);
    });
});
