const shell = require('shelljs');

shell.exec('heroku container:push web');
shell.exec('heroku container:release web');
