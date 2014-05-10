'use strict';

var through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    forms = require('ngbs-forms'),
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs');

var PLUGIN_NAME = 'gulp-ngbs-forms';


var exists = function(filepath) {
  try {
    fs.statSync(filepath);
    return true;
  } catch (e) {
    return false;
  }
};


function gulpNgbsForms(options) {
  options = _.extend({
    formsCwd: ['.'],
  }, options);

  if (!_.isArray(options.formsCwd)) {
    options.formsCwd = [options.formsCwd];
  }

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
          var ret;

          _.each(options.formsCwd, function(folder) {
            if (ret) {
              return;
            }

            var frmPath = path.join(folder, filename);
            if (exists(frmPath)) {
              try {
                ret = forms.generate(path.resolve(frmPath));
                return;
              } catch (err) {
                that.emit('error', err);
              }
            }
          });

          if (!ret) {
            that.emit('error', new Error('file not found: ' + filename));
          }

          return ret;
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
