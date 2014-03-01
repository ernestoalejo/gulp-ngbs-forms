
# gulp-ngbs-forms

> Generate forms using Angular for validations and Bootstrap for styles from short and concise descriptions of the fields.

To read more about the format of the form files see the [ngbs-forms](https://github.com/ernestoalejo/ngbs-forms) project directly.


## Installation

Install via [npm](https://npmjs.org/package/gulp-ngbs-forms):

```
npm install gulp-ngbs-forms --save-dev
```


## Example

```js
var gulp = require('gulp'),
    forms = require('gulp-ngbs-forms');

gulp.task('default', function() {
  return gulp.src('client/partials/**/*.html')
    .pipe(forms())
    .pipe(gulp.dest('tmp/partials'));
});
```


## Example changing the forms folder

You can specify the route of the forms relative to whatever folder you want. Pass
the `formsCwd` option to the plugin to change the base folder.

For example with this code you can specify forms routes relative to the `client`
folder.

```js
var gulp = require('gulp'),
    forms = require('gulp-ngbs-forms');

gulp.task('default', function() {
  return gulp.src('client/partials/**/*.html')
    .pipe(forms({formsCwd: 'client'}))
    .pipe(gulp.dest('tmp/partials'));
});
```

