'use strict';

var Rsync = require('../rsync');


describe('input', function () {

    // #source
    describe('#source', function () {
        var rsync;

        it('should be able to be set as a single String', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      'afile.txt',
                destination: 'some_location.txt'
            });

            expect(rsync.command()).toMatch(/\safile.txt\s/g);
        });

        it('should be able to be set as an Array', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'afile.txt', 'bfile.txt' ],
                destination: 'some_location.txt'
            });

            expect(rsync.command()).toMatch(/\safile.txt bfile.txt\s/g);
        });

        it('should not escape regular filenames', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'some_file.txt' ],
                destination: 'wherever_we_want.txt'
            });

            expect(rsync.command()).toMatch(/\ssome_file.txt\s/g);
        });

        it('should escape spaced filenames', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'some file.txt' ],
                destination: 'wherever_we_want.txt'
            });

            expect(rsync.command()).toMatch(/\ssome\\ file.txt\s/g);
        });

        it('should have quote characters escaped',function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'a_quoted\'filename".txt' ],
                destination: 'themoon'
            });

            expect(rsync.command()).toMatch(/ a_quoted\\'filename\\".txt /);
        });

        it('should have parentheses escaped', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'a (file) with parantheses.txt' ],
                destination: 'themoon'
            });

            expect(rsync.command()).toMatch(/a\\ \\\(file\\\)\\ with\\ parantheses.txt/);
        });

        it('should allow mixed filenames', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source: [
                    'example file.txt', 'manual.pdf', '\'special_case 1\'.rtf'
                ],
                destination: 'somewhere_else/'
            });

            expect(rsync.command()).toMatch(/ example\\ file.txt manual.pdf \\'special_case\\ 1\\'.rtf/);
        });
    });


    //# destination
    describe('#destination', function () {
        var rsync;

        it('should not have regular filenames escaped', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'file1.txt' ],
                destination: 'the_destination/'
            });

            expect(rsync.command()).toMatch(/the_destination\/$/);
        });

        it('should have spaced filenames escaped', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'file2.txt' ],
                destination: 'whereever we want.txt'
            });

            expect(rsync.command()).toMatch(/whereever\\ we\\ want.txt$/);
        });

        it('should have quote characters escaped', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'space.txt' ],
                destination: '\'to infinity and beyond"/'
            });

            expect(rsync.command()).toMatch(/\\'to\\ infinity\\ and\\ beyond\\"\/$/);
        });

        it('should have dollar sign characters escaped', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                source:      [ 'file3.txt' ],
                destination: '$some_destination/'
            });

            expect(rsync.command()).toMatch(/\$some_destination\/$/);
        });
    });

});
