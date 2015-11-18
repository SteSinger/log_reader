(function () {
	var fs = require('fs');
    var readline = require('readline');

	angular.module('app').factory('parser', ['$q', parser]);

	function parser($q) {
		
		var logs = [];
		var parseFile = function (file) {
			return $q(function (resolve, reject) {
				console.log('Started parsing file:');
				console.log(file);
				logs = [];
				
				if(!(file instanceof File)) {
					reject('Call with file as parameter');
				}
				
				// if(file.type != "text/plain")
				// {
				// 	reject('Provide a textfile. Type is: ' + file.type);
				// }
				
				var rd = readline.createInterface({
					input: fs.createReadStream(file.path),
					output: null,
					terminal: false
				});

				rd.on('line', function (line) {
					_parseLine(line)
				});

				rd.on('close', function () {
					console.log('Finished parsing file.');
					resolve(logs);					
				});
			});
		};


		var _parseLine = function (line) {

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

			logs.push(logLine);
		}
		return {parseFile: parseFile};
	}
})();