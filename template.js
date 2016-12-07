/*
 * grunt-init-webpage-scaffold
 * https://gruntjs.com/
 *
 * Copyright (c) 2016 Nzar Tofiq
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Webpage module, including Gulp and Jasmine unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "webpage" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with gulp. For ' +
  'more information about installing and configuring Gulp, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({
    type: 'web-app'
  }, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('main'),
    init.prompt('npm_test', 'gulp test')
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      'gulp': '~3.8.10',
      'gulp-concat': '~2.6.1',
      'gulp-imagemin': '^3.1.1',
      'gulp-jasmine': '~2.4.2',
      'gulp-jshint': '~1.9.0',
      'gulp-rename': '~1.2.2',
      'gulp-sass': '~2.3.2',
      'gulp-sourcemaps': '~1.3.0',
      'gulp-uglify': '~2.0.0',
      'gulp-uglifycss': '~1.0.6',
      'gulp-util': '~3.0.2',
      'jshint-stylish': '~1.0.0',
      'node-sass': '~3.13.0'
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
