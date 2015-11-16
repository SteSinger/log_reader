(function () {
    var jetpack = require('fs-jetpack');
    var fs = require('fs');
    var readline = require('readline');

    angular.module('app').controller('logController', ['$scope', LogController]);

    function LogController($scope) {
        $scope.logs = [{ name: 'test' }];
        LoadLog(process.cwd() + '/logs/test.txt', $scope);
        $scope.logs.push({ name: 'test1' });
    }


    function LoadLog(path, $scope) {
        var rd = readline.createInterface({
            input: fs.createReadStream(path),
            output: null,
            terminal: false
        });

        var logs = [];

        rd.on('line', function (line) {
            ParseLine(line, logs)
        });

        rd.on('close', function () {
            console.log('done');
            $scope.logs = logs;
            $scope.$apply();
        });

    }

    function ParseLine(line, logs) {

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
        if(dateStart > 0)
        {
            logLine.date = Date.parse(line.substring(dateStart + 1, dateEnd));
        }           
        
        var pos = line.indexOf('-->');
        if(pos < 0){
            logLine.content = line;
        } else
        {
            logLine.content = line.substring(pos+3).trim();
        }
            

        logs.push(logLine);
    }
})();
    
    

