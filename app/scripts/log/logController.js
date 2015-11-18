(function () {
    var fs = require('fs');
    var readline = require('readline');
    
    angular.module('app').controller('logController', ['$scope', 'NgTableParams', LogController]);

    function LogController($scope, NgTableParams) {
        var self = this;
        LoadLog(process.cwd() + '/logs/test.txt', $scope, NgTableParams);
        self.tableParams = new NgTableParams({ count: 200 }, { counts: [50, 100, 200, 500]});
        self.logs = []

        function LoadLog(path, $scope, NgTableParams) {
            var rd = readline.createInterface({
                input: fs.createReadStream(path),
                output: null,
                terminal: false
            });
    
            
    
            rd.on('line', function (line) {
                ParseLine(line)
            });
    
            rd.on('close', function () {
                self.tableParams.settings({data: self.logs});
            });
    
        }
    
        function ParseLine(line) {
    
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
                    
            self.logs.push(logLine);
        }
    }
})();
    
    

