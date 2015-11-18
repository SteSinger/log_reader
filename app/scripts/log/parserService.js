(function () {
	var fs = require('fs');
    var readline = require('readline');

	angular.module('app').factory('parser', ['$q', parser]);

	function parser($q) {
		var self = this;
		self.logs = [];

		self.parseFile = function (file) {
			return $q(function (resolve, reject) {
				var rd = readline.createInterface({
					input: fs.createReadStream(file.path),
					output: null,
					terminal: false
				});

				rd.on('line', function (line) {
					self._parseLine(line)
				});

				rd.on('close', function () {
					resolve(self.logs);
				});
			});
		};


		self._parseLine = function (line) {

			var logLine = {};

			if (line.indexOf('INFO') === 0) {
				logLine.type = 'I';
			} else if (line.indexOf('ERROR') === 0) {
				logLine.type = 'E';
			} else {
				logLine.type = 'D';
			}

			var dateStart = line.indexOf('[');
			var dateEnd = line.indexOf(']');
			if (dateStart > 0) {
				logLine.date = Date.parse(line.substring(dateStart + 1, dateEnd));
			}

			var pos = line.indexOf('-->');
			if (pos < 0) {
				logLine.content = line;
			} else {
				logLine.content = line.substring(pos + 3).trim();
			}

			self.logs.push(logLine);
		}
		return self;
	}
})();