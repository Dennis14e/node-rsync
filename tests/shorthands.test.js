'use strict';

var Rsync = require('../rsync');


describe('shorthands', function () {
    var command, output;

    beforeEach(function () {
        command = Rsync.build({
            'source':      'SOURCE',
            'destination': 'DESTINATION'
        });
        output = 'rsync SOURCE DESTINATION';
    });


    // #shell
    describe('#shell', function () {
        var rsync;

        it('Should add rsh option', function () {
            rsync = Rsync.build({
                'source':       'source',
                'destination':  'destination',
                'shell':        'ssh'
            });

            expect(rsync.command()).toBe('rsync --rsh=ssh source destination');
        });

        it('Should escape options with spaces', function () {
            rsync = Rsync.build({
                'source':       'source',
                'destination':  'destination',
                'shell':        'ssh -i /home/user/.ssh/rsync.key'
            });

            expect(rsync.command()).toBe('rsync --rsh="ssh -i /home/user/.ssh/rsync.key" source destination');
        });
    });


    // #chmod
    describe('#chmod', function () {
        var rsync;

        it('Should allow a simple value through build', function () {
            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination',
                'chmod':       'ug=rwx'
            });

            expect(rsync.command()).toMatch(/chmod=ug=rwx/i);
        });

        it('Should allow multiple values through build', function () {
            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination',
                'chmod':       [ 'og=uwx', 'rx=ogw' ]
            });

            expect(rsync.command()).toMatch(/chmod=og=uwx --chmod=rx=ogw/i);
        });

        it('Should allow multiple values through setter', function () {
            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination'
            });
            rsync.chmod('o=rx');
            rsync.chmod('ug=rwx');

            expect(rsync.command()).toMatch(/--chmod=o=rx --chmod=ug=rwx/i);
        });

        it('Should return all the chmod values', function () {
            var inputValues = [ 'og=uwx', 'rx=ogw' ];

            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination',
                'chmod':       inputValues
            });

            var values = rsync.chmod();

            expect(inputValues).toEqual(values);
        });
    });


    // #delete
    describe('#delete', function () {
        var testSet = function () {
            command.delete();
            return command;
        };

        it('Should add the delete option', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync --delete/);
        });

        it('Should be able to be unset', function () {
            testSet().delete(false);
            expect(command.command()).toBe(output);
        });
    });


    // #progress
    describe('#progress', function () {
        var testSet = function () {
            command.progress();
            return command;
        };

        it('Should add the progress option', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync --progress/);
        });

        it('Should be able to be unset', function () {
            testSet().progress(false);
            expect(command.command()).toBe(output);
        });
    });


    // #archive
    describe('#archive', function () {
        var testSet = function () {
            command.archive();
            return command;
        };

        it('Should add the archive flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -a/);
        });

        it('Should be able to be unset', function () {
            testSet().archive(false);
            expect(command.command()).toBe(output);
        });
    });


    // #compress
    describe('#compress', function () {
        var testSet = function () {
            command.compress();
            return command;
        };

        it('Should add the compress flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -z/);
        });

        it('Should be able to be unset', function () {
            command = testSet().compress(false);
            expect(command.command()).toBe(output);
        });
    });


    // #recursive
    describe('#recursive', function () {
        var testSet = function () {
            command.recursive();
            return command;
        };

        it('Should add the recursive flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -r/);
        });

        it('Should be able to be unset', function () {
            command = testSet().recursive(false);
            expect(command.command()).toBe(output);
        });
    });


    // #update
    describe('#update', function () {
        var testSet = function () {
            command.update();
            return command;
        };

        it('Should add the update flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -u/);
        });

        it('Should be able to be unset', function () {
            command = testSet().update(false);
            expect(command.command()).toBe(output);
        });
    });


    // #quiet
    describe('#quiet', function () {
        var testSet = function () {
            command.quiet();
            return command;
        };

        it('Should add the quiet flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -q/);
        });

        it('Should be able to be unset', function () {
            command = testSet().quiet(false);
            expect(command.command()).toBe(output);
        });
    });


    // #dirs
    describe('#dirs', function () {
        var testSet = function () {
            command.dirs();
            return command;
        };

        it('Should add the dirs flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -d/);
        });

        it('Should be able to be unset', function () {
            command = testSet().dirs(false);
            expect(command.command()).toBe(output);
        });
    });


    // #links
    describe('#links', function () {
        var testSet = function () {
            command.links();
            return command;
        };

        it('Should add the links flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -l/);
        });

        it('Should be able to be unset', function () {
            command = testSet().links(false);
            expect(command.command()).toBe(output);
        });
    });


    // #dry
    describe('#dry', function () {
        var testSet = function () {
            command.dry();
            return command;
        };

        it('Should add the dry flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -n/);
        });

        it('Should be able to be unset', function () {
            command = testSet().dry(false);
            expect(command.command()).toBe(output);
        });
    });


    // #hardLinks
    describe('#hardLinks', function () {
        it('Should add the hard links flag', function () {
            command.hardLinks();
            expect(command.command()).toMatch(/^rsync -H/);
        });

        it('Should unset the hard links flag', function () {
            command.hardLinks();
            expect(command.command()).toMatch(/^rsync -H/);

            command.hardLinks(false);
            expect(command.command()).toBe(output);
        });
    });


    // #perms
    describe('#perms', function () {
        it('Should add the perms flag', function () {
            command.perms();
            expect(command.command()).toMatch(/^rsync -p/);
        });

        it('Should unset the perms flag', function () {
            command.perms();
            expect(command.command()).toMatch(/^rsync -p/);

            command.perms(false);
            expect(command.command()).toBe(output);
        });
    });


    // #executability
    describe('#executability', function () {
        it('Should add the executability flag', function () {
            command.executability();
            expect(command.command()).toMatch(/^rsync -E/);
        });

        it('Should unset the executability flag', function () {
            command.executability();
            expect(command.command()).toMatch(/^rsync -E/);

            command.executability(false);
            expect(command.command()).toBe(output);
        });
    });


    // #owner
    describe('#owner', function () {
        it('Should add the owner flag', function () {
            command.owner();
            expect(command.command()).toMatch(/^rsync -o/);
        });

        it('Should unset the owner flag', function () {
            command.owner();
            expect(command.command()).toMatch(/^rsync -o/);

            command.owner(false);
            expect(command.command()).toBe(output);
        });
    });


    // #group
    describe('#group', function () {
        it('Should add the group flag', function () {
            command.group();
            expect(command.command()).toMatch(/^rsync -g/);
        });

        it('Should unset the group flag', function () {
            command.group();
            expect(command.command()).toMatch(/^rsync -g/);

            command.group(false);
            expect(command.command()).toBe(output);
        });
    });


    // #acls
    describe('#acls', function () {
        it('Should set the acls flag', function () {
            command.acls();
            expect(command.command()).toMatch(/^rsync -A/);
        });

        it('Should unset the acls flag', function () {
            command.acls();
            expect(command.command()).toMatch(/^rsync -A/);

            command.acls(false);
            expect(command.command()).toBe(output);
        });
    });


    // #xattrs
    describe('#xattrs', function () {
        it('Should set the xattrs flag', function () {
            command.xattrs();
            expect(command.command()).toMatch(/^rsync -X/);
        });

        it('Should unset the xattrs flag', function () {
            command.xattrs();
            expect(command.command()).toMatch(/^rsync -X/);

            command.xattrs(false);
            expect(command.command()).toBe(output);
        });
    });


    // #devices
    describe('#devices', function () {
        it('Should set the the devices option', function () {
            command.devices();
            expect(command.command()).toMatch(/^rsync --devices/);
        });

        it('Should unset the devices option', function () {
            command.devices();
            expect(command.command()).toMatch(/^rsync --devices/);

            command.devices(false);
            expect(command.command()).toBe(output);
        });
    });


    // #specials
    describe('#specials', function () {
        it('Should set the the specials option', function () {
            command.specials();
            expect(command.command()).toMatch(/^rsync --specials/);
        });

        it('Should unset the specials option', function () {
            command.specials();
            expect(command.command()).toMatch(/^rsync --specials/);

            command.specials(false);
            expect(command.command()).toBe(output);
        });
    });


    // #times
    describe('#times', function () {
        it('Should set the the times option', function () {
            command.times();
            expect(command.command()).toMatch(/^rsync -t/);
        });

        it('Should unset the times option', function () {
            command.times(false);
            expect(command.command()).toBe(output);
        });
    });

});
