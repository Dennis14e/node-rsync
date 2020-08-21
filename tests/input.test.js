'use strict';

var Rsync = require('../rsync');


describe('input', function () {

    // #source
    describe('#source', function () {
        var rsync;

        it('Should be able to be set as a single String', function () {
            rsync = Rsync.build({
                source:      'afile.txt',
                destination: 'some_location.txt'
            });

            expect(rsync.command()).toMatch(/\safile.txt\s/g);
        });

        it('Should be able to be set as an Array', function () {
            rsync = Rsync.build({
                source:      [ 'afile.txt', 'bfile.txt' ],
                destination: 'some_location.txt'
            });

            expect(rsync.command()).toMatch(/\safile.txt bfile.txt\s/g);
        });

        it('Should not escape regular filenames', function () {
            rsync = Rsync.build({
                source:      [ 'some_file.txt' ],
                destination: 'wherever_we_want.txt'
            });

            expect(rsync.command()).toMatch(/\ssome_file.txt\s/g);
        });

        it('Should escape spaced filenames', function () {
            rsync = Rsync.build({
                source:      [ 'some file.txt' ],
                destination: 'wherever_we_want.txt'
            });

            expect(rsync.command()).toMatch(/\ssome\\ file.txt\s/g);
        });

        it('Should have quote characters escaped',function () {
            rsync = Rsync.build({
                source:      [ 'a_quoted\'filename".txt' ],
                destination: 'themoon'
            });

            expect(rsync.command()).toMatch(/ a_quoted\\'filename\\".txt /);
        });

        it('Should have parentheses escaped', function () {
            rsync = Rsync.build({
                source:      [ 'a (file) with parantheses.txt' ],
                destination: 'themoon'
            });

            expect(rsync.command()).toMatch(/a\\ \\\(file\\\)\\ with\\ parantheses.txt/);
        });

        it('Should allow mixed filenames', function () {
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

        it('Should not have regular filenames escaped', function () {
            rsync = Rsync.build({
                source:      [ 'file1.txt' ],
                destination: 'the_destination/'
            });

            expect(rsync.command()).toMatch(/the_destination\/$/);
        });

        it('Should have spaced filenames escaped', function () {
            rsync = Rsync.build({
                source:      [ 'file2.txt' ],
                destination: 'whereever we want.txt'
            });

            expect(rsync.command()).toMatch(/whereever\\ we\\ want.txt$/);
        });

        it('Should have quote characters escaped', function () {
            rsync = Rsync.build({
                source:      [ 'space.txt' ],
                destination: '\'to infinity and beyond"/'
            });

            expect(rsync.command()).toMatch(/\\'to\\ infinity\\ and\\ beyond\\"\/$/);
        });

        it('Should have dollar sign characters escaped', function () {
            rsync = Rsync.build({
                source:      [ 'file3.txt' ],
                destination: '$some_destination/'
            });

            expect(rsync.command()).toMatch(/\$some_destination\/$/);
        });
    });

});
