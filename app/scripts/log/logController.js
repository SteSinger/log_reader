(function () {
    
    angular.module('app').controller('logController', ['$scope', 'NgTableParams', 'parser', LogController]);

    function LogController($scope, NgTableParams, parser) {
        var self = this;
        
        var test = {path: process.cwd() + '/logs/test.txt'};
        
        parser.parseFile(test).then(setTableParams, error);
        
        self.tableParams = new NgTableParams({ count: 200 }, { counts: [50, 100, 200, 500]});
                
        function setTableParams(logs) {
            self.tableParams.settings({data: logs});    
        }
        
        function error(msg) {
            console.log(error);
        }
        
        

    }
})();
    
    

