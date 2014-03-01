'use strict';

var laravelValidator = require('../index'),
    expect = require('expect.js'),
    fs = require('fs'),
    File = require('vinyl');

describe('gulp-laravel-validator', function() {
  it('should generate the min-example', function(done) {
    var stream = laravelValidator();

    fs.readFile('test/fixtures/min-example.html', function(err, buffer) {
      if (err) {
        throw err;
      }

      var fakeFile = new File({
        contents: buffer,
      });
      stream.write(fakeFile);

      stream.once('data', function(file) {
        expect(file.isBuffer()).to.be.ok();
        var expected = fs.readFileSync('test/expected/min-example.html');
        expect(file.contents.toString()).to.be.eql(expected.toString());
        done();
      });
    });
  });

  it('should generate the cwd-example', function(done) {
    var stream = laravelValidator({
      formsCwd: 'test/fixtures/folder',
    });

    fs.readFile('test/fixtures/folder/cwd-example.html', function(err, buffer) {
      if (err) {
        throw err;
      }

      var fakeFile = new File({
        contents: buffer,
      });
      stream.write(fakeFile);

      stream.once('data', function(file) {
        expect(file.isBuffer()).to.be.ok();
        var expected = fs.readFileSync('test/expected/cwd-example.html');
        expect(file.contents.toString()).to.be.eql(expected.toString());
        done();
      });
    });
  });
});
