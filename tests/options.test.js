'use strict';

var Rsync = require('../rsync');


describe('options', function () {
    var command;
    beforeEach(function () {
        command = new Rsync();
    });


    // #set
    describe('#set', function () {
        it('Should set a an option with a value', function () {
            command.set('rsh', 'ssh');
            expect(command._options).toHaveProperty('rsh', 'ssh');
        });

        it('Should enable an option without a value', function () {
            command.set('dir');
            expect(command._options).toHaveProperty('dir');
        });

        it('Should strip leading dashes', function () {
            command.set('--progress');
            command.set('--rsh', 'ssh');
            expect(command._options).toHaveProperty('progress');
            expect(command._options).toHaveProperty('rsh', 'ssh');
        });

    });

    // #unset
    describe('#unset', function () {
        it('Should unset an option that has a value', function () {
            command.set('rsh', 'ssh');
            expect(command._options).toHaveProperty('rsh', 'ssh');

            command.unset('rsh');
            expect(Object.keys(command._options)).toHaveLength(0);
            expect(command._options).not.toHaveProperty('rsh');
        });

        it('Should unset an enabled options', function () {
            command.set('progress');
            expect(command._options).toHaveProperty('progress');

            command.unset('progress');
            expect(command._options).not.toHaveProperty('progress');
        });

        it('Should unset an option that was not set', function () {
            expect(command._options).not.toHaveProperty('dirs');
            command.unset('dirs');
            expect(command._options).not.toHaveProperty('dirs');
        });
    });


    // #isSet
    describe('#isSet', function () {

        it('Should return if an option is set', function () {
            command.set('inplace');
            expect(command.isSet('inplace')).toBe(true);

            command.set('b');
            expect(command.isSet('b')).toBe(true);

            command.set('max-size', '1009');
            expect(command.isSet('max-size')).toBe(true);
        });

        it('Should strip leading dashes from option name', function () {
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
        it('Should return the value for an option', function () {
            command.set('max-size', '1009');
            expect(command.option('max-size')).toBe('1009');
        });


        it('Should return null for a valueless options', function () {
            command.set('progress');
            expect(command.option('progress')).toBeNull();
        });

        it('Should return undefined for an option that is not set', function () {
            expect(command.option('random')).toBeUndefined();
        });

        it('Should strip leading dashes from option names', function () {
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
        it('Should set multiple flags from a String', function () {
            command.flags('avz');
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['a', 'v', 'z']));
        });

        it('Should set multiple flags from arguments', function () {
            command.flags('v', 'z', 'a');
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['a', 'v', 'z']));
        });

        it('Should set multiple flags from an array', function () {
            command.flags(['z', 'a', 'v']);
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['a', 'v', 'z']));
        });

        it('Should unset multiple flags from a string', function () {
            command.flags('avz');
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['a', 'v', 'z']));

            command.flags('az', false);
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['v']));
        });

        it('Should set multiple flags from arguments (string)', function () {
            command.flags('avz');
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['a', 'v', 'z']));

            command.flags('z', 'v', false);
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['a']));
        });

        it('Should set multiple flags from an array (string)', function () {
            command.flags('avz');
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['a', 'v', 'z']));

            command.flags(['a', 'v'], false);
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['z']));
        });

        it('Should set/unset flags from an object', function () {
            command.flags('flag');
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['f', 'l', 'a', 'g']));

            command.flags({
                'l': false,
                's': false,
                'u': true,
                'w': true,
                'b': true
            });
            expect(Object.keys(command._options)).toEqual(expect.arrayContaining(['f', 'u', 'w', 'g', 'a', 'b']));

        });
    });
});
