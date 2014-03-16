'use strict';

var through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    forms = require('ngbs-forms'),
    _ = require('underscore'),
    path = require('path');

var PLUGIN_NAME = 'gulp-ngbs-forms';

function gulpNgbsForms(options) {
  options = _.extend({
    formsCwd: '.',
  }, options);

  var stream = through.obj(function(file, enc, callback) {
    var that = this;

    // Do nothing if no contents
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    // We cannot handle streams without bufferring them first
    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Streaming not supported');
    }

    // For buffers read them and push the generated forms
    if (file.isBuffer()) {
      var result = _.template(file.contents.toString(), {
        buildForm: function(filename) {
          var frmPath = path.join(options.formsCwd, filename);
          try {
            return forms.generate(path.resolve(frmPath));
          } catch (err) {
            that.emit('error', err);
          }
        },
      });
      file.contents = new Buffer(result);
      this.push(file);
      return callback();
    }
  });

  return stream;
}

module.exports = gulpNgbsForms;
