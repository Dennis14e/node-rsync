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

        it('should add rsh option', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                'source':       'source',
                'destination':  'destination',
                'shell':        'ssh'
            });

            expect(rsync.command()).toBe('rsync --rsh=ssh source destination');
        });

        it('should escape options with spaces', function () {
            expect.assertions(1);

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

        it('should allow a simple value through build', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination',
                'chmod':       'ug=rwx'
            });

            expect(rsync.command()).toMatch(/--chmod=ug=rwx/i);
        });

        it('should allow multiple values through build', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination',
                'chmod':       [ 'og=uwx', 'rx=ogw' ]
            });

            expect(rsync.command()).toMatch(/--chmod=og=uwx --chmod=rx=ogw/i);
        });

        it('should allow multiple values through setter', function () {
            expect.assertions(1);

            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination'
            });
            rsync.chmod('o=rx');
            rsync.chmod('ug=rwx');

            expect(rsync.command()).toMatch(/--chmod=o=rx --chmod=ug=rwx/i);
        });

        it('should return all the chmod values', function () {
            expect.assertions(1);

            var inputValues = [ 'og=uwx', 'rx=ogw' ];

            rsync = Rsync.build({
                'source':      'source',
                'destination': 'destination',
                'chmod':       inputValues
            });

            var values = rsync.chmod();

            expect(inputValues).toStrictEqual(values);
        });
    });


    // #delete
    describe('#delete', function () {
        var testSet = function () {
            command.delete();
            return command;
        };

        it('should add the delete option', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync --delete/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the progress option', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync --progress/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the archive flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -a/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the compress flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -z/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the recursive flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -r/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the update flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -u/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the quiet flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -q/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the dirs flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -d/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the links flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -l/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the dry flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -n/);
        });

        it('should be able to be unset', function () {
            expect.assertions(1);

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

        it('should add the hard links flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -H/);
        });

        it('should unset the hard links flag', function () {
            expect.assertions(1);

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

        it('should add the perms flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -p/);
        });

        it('should unset the perms flag', function () {
            expect.assertions(1);

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

        it('should add the executability flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -E/);
        });

        it('should unset the executability flag', function () {
            expect.assertions(1);

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

        it('should add the owner flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -o/);
        });

        it('should unset the owner flag', function () {
            expect.assertions(1);

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

        it('should add the group flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -g/);
        });

        it('should unset the group flag', function () {
            expect.assertions(1);

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

        it('should set the acls flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -A/);
        });

        it('should unset the acls flag', function () {
            expect.assertions(1);

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

        it('should set the xattrs flag', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -X/);
        });

        it('should unset the xattrs flag', function () {
            expect.assertions(1);

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

        it('should set the the devices option', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync --devices/);
        });

        it('should unset the devices option', function () {
            expect.assertions(1);

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

        it('should set the the specials option', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync --specials/);
        });

        it('should unset the specials option', function () {
            expect.assertions(1);

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

        it('should set the the times option', function () {
            expect.assertions(1);

            testSet();
            expect(command.command()).toMatch(/^rsync -t/);
        });

        it('should unset the times option', function () {
            expect.assertions(1);

            command = testSet().times(false);
            expect(command.command()).toBe(output);
        });
    });
});
