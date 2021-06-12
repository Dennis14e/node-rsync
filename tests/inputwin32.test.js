'use strict';

var Rsync = require('../rsync');


describe('inputwin32', function () {
    var originalPlatform;

    beforeAll(function () {
        originalPlatform = process.platform;

        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
    });


    // #sources under windows
    describe('#sourcewin32', function () {
        var rsync;

        it('should convert windows path under windows',function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'C:\\home\\username\\develop\\readme.txt' ],
                destination: 'themoon'
            });

            expect(rsync.command()).toMatch(/ \/home\/username\/develop\/readme\.txt /);
        });
    });


    // #destination under win32
    describe('#destinationwin32', function () {
        var rsync;

        it('should convert widows path for destination', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'readme.txt' ],
                destination: 'C:\\home\\username\\develop\\'
            });

            expect(rsync.command()).toMatch(/\/home\/username\/develop\//);
        });
    });


    afterAll(function () {
        Object.defineProperty(process, 'platform', {
            value: originalPlatform
        });
    });
});
