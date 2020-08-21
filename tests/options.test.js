'use strict';

var Rsync = require('../rsync');


describe('options', function () {
    var command;
    beforeEach(function () {
        command = new Rsync();
    });


    // #set
    describe('#set', function () {
        it('should set a an option with a value', function () {
            expect.assertions(1);

            command.set('rsh', 'ssh');
            expect(command._options).toHaveProperty('rsh', 'ssh');
        });

        it('should enable an option without a value', function () {
            expect.assertions(1);

            command.set('dir');
            expect(command._options).toHaveProperty('dir');
        });

        it('should strip leading dashes', function () {
            expect.assertions(2);

            command.set('--progress');
            command.set('--rsh', 'ssh');
            expect(command._options).toHaveProperty('progress');
            expect(command._options).toHaveProperty('rsh', 'ssh');
        });

    });

    // #unset
    describe('#unset', function () {
        it('should unset an option that has a value', function () {
            expect.assertions(3);

            command.set('rsh', 'ssh');
            expect(command._options).toHaveProperty('rsh', 'ssh');

            command.unset('rsh');
            expect(Object.keys(command._options)).toHaveLength(0);
            expect(command._options).not.toHaveProperty('rsh');
        });

        it('should unset an enabled options', function () {
            expect.assertions(2);

            command.set('progress');
            expect(command._options).toHaveProperty('progress');

            command.unset('progress');
            expect(command._options).not.toHaveProperty('progress');
        });

        it('should unset an option that was not set', function () {
            expect.assertions(2);

            expect(command._options).not.toHaveProperty('dirs');
            command.unset('dirs');
            expect(command._options).not.toHaveProperty('dirs');
        });
    });


    // #isSet
    describe('#isSet', function () {

        it('should return if an option is set', function () {
            expect.assertions(3);

            command.set('inplace');
            expect(command.isSet('inplace')).toBe(true);

            command.set('b');
            expect(command.isSet('b')).toBe(true);

            command.set('max-size', '1009');
            expect(command.isSet('max-size')).toBe(true);
        });

        it('should strip leading dashes from option name', function () {
            expect.assertions(3);

            command.set('inplace');
            expect(command.isSet('--inplace')).toBe(true);

            command.set('b');
            expect(command.isSet('-b')).toBe(true);

            command.set('max-size', '1009');
            expect(command.isSet('--max-size')).toBe(true);
        });

    });


    // #option
    describe('#option', function () {
        it('should return the value for an option', function () {
            expect.assertions(1);

            command.set('max-size', '1009');
            expect(command.option('max-size')).toBe('1009');
        });


        it('should return null for a valueless options', function () {
            expect.assertions(1);

            command.set('progress');
            expect(command.option('progress')).toBeNull();
        });

        it('should return undefined for an option that is not set', function () {
            expect.assertions(1);
            expect(command.option('random')).toBeUndefined();
        });

        it('should strip leading dashes from option names', function () {
            expect.assertions(4);

            command.set('progress');
            expect(command.option('--progress')).toBeNull();

            command.set('g');
            expect(command.option('-g')).toBeNull();

            command.set('max-size', '2009');
            expect(command.option('--max-size')).toBe('2009');

            expect(command.option('--random')).toBeUndefined();
        });
    });


    // #flags
    describe('#flags', function () {
        it('should set multiple flags from a String', function () {
            expect.assertions(1);

            command.flags('avz');
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['a', 'v', 'z']));
        });

        it('should set multiple flags from arguments', function () {
            expect.assertions(1);

            command.flags('v', 'z', 'a');
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['a', 'v', 'z']));
        });

        it('should set multiple flags from an array', function () {
            expect.assertions(1);

            command.flags(['z', 'a', 'v']);
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['a', 'v', 'z']));
        });

        it('should unset multiple flags from a string', function () {
            expect.assertions(2);

            command.flags('avz');
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['a', 'v', 'z']));

            command.flags('az', false);
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['v']));
        });

        it('should set multiple flags from arguments (string)', function () {
            expect.assertions(2);

            command.flags('avz');
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['a', 'v', 'z']));

            command.flags('z', 'v', false);
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['a']));
        });

        it('should set multiple flags from an array (string)', function () {
            expect.assertions(2);

            command.flags('avz');
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['a', 'v', 'z']));

            command.flags(['a', 'v'], false);
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['z']));
        });

        it('should set/unset flags from an object', function () {
            expect.assertions(2);

            command.flags('flag');
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['f', 'l', 'a', 'g']));

            command.flags({
                'l': false,
                's': false,
                'u': true,
                'w': true,
                'b': true
            });
            expect(Object.keys(command._options)).toStrictEqual(expect.arrayContaining(['f', 'u', 'w', 'g', 'a', 'b']));
        });
    });
});
