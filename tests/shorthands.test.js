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

            expect(rsync.command()).toMatch(/--chmod=ug=rwx/i);
        });

        it('Should allow multiple values through build', function () {
            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination',
                'chmod':       [ 'og=uwx', 'rx=ogw' ]
            });

            expect(rsync.command()).toMatch(/--chmod=og=uwx --chmod=rx=ogw/i);
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
        var testSet = function () {
            command.hardLinks();
            return command;
        };

        it('Should add the hard links flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -H/);
        });

        it('Should unset the hard links flag', function () {
            command = testSet().hardLinks(false);
            expect(command.command()).toBe(output);
        });
    });


    // #perms
    describe('#perms', function () {
        var testSet = function () {
            command.perms();
            return command;
        };

        it('Should add the perms flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -p/);
        });

        it('Should unset the perms flag', function () {
            command = testSet().perms(false);
            expect(command.command()).toBe(output);
        });
    });


    // #executability
    describe('#executability', function () {
        var testSet = function () {
            command.executability();
            return command;
        };

        it('Should add the executability flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -E/);
        });

        it('Should unset the executability flag', function () {
            command = testSet().executability(false);
            expect(command.command()).toBe(output);
        });
    });


    // #owner
    describe('#owner', function () {
        var testSet = function () {
            command.owner();
            return command;
        };

        it('Should add the owner flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -o/);
        });

        it('Should unset the owner flag', function () {
            command = testSet().owner(false);
            expect(command.command()).toBe(output);
        });
    });


    // #group
    describe('#group', function () {
        var testSet = function () {
            command.group();
            return command;
        };

        it('Should add the group flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -g/);
        });

        it('Should unset the group flag', function () {
            command = testSet().group(false);
            expect(command.command()).toBe(output);
        });
    });


    // #acls
    describe('#acls', function () {
        var testSet = function () {
            command.acls();
            return command;
        };

        it('Should set the acls flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -A/);
        });

        it('Should unset the acls flag', function () {
            command = testSet().acls(false);
            expect(command.command()).toBe(output);
        });
    });


    // #xattrs
    describe('#xattrs', function () {
        var testSet = function () {
            command.xattrs();
            return command;
        };

        it('Should set the xattrs flag', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -X/);
        });

        it('Should unset the xattrs flag', function () {
            command = testSet().xattrs(false);
            expect(command.command()).toBe(output);
        });
    });


    // #devices
    describe('#devices', function () {
        var testSet = function () {
            command.devices();
            return command;
        };

        it('Should set the the devices option', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync --devices/);
        });

        it('Should unset the devices option', function () {
            command = testSet().devices(false);
            expect(command.command()).toBe(output);
        });
    });


    // #specials
    describe('#specials', function () {
        var testSet = function () {
            command.specials();
            return command;
        };

        it('Should set the the specials option', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync --specials/);
        });

        it('Should unset the specials option', function () {
            command = testSet().specials(false);
            expect(command.command()).toBe(output);
        });
    });


    // #times
    describe('#times', function () {
        var testSet = function () {
            command.times();
            return command;
        };

        it('Should set the the times option', function () {
            testSet();
            expect(command.command()).toMatch(/^rsync -t/);
        });

        it('Should unset the times option', function () {
            command = testSet().times(false);
            expect(command.command()).toBe(output);
        });
    });
});
