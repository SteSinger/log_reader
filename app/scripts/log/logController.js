(function () {
    
    angular.module('app').controller('logController', ['$scope', 'parser', LogController]);

    function LogController($scope, parser) {
        
       	var target = document.getElementById('dropTarget');
	
        $scope.logs = [];
        
        target.ondragover = function(e) {
            e.preventDefault();
            return false;
        }
        target.ondragend = function(e) {
            e.preventDefault();
            return false;
        }
        
        
        target.ondrop = function(e) {
            e.preventDefault();
            
            var file = e.dataTransfer.files[0];
            parser.parseFile(file).then(setTableParams, error);
            
            return false;
        }
        
        function setTableParams(logs) {
            $scope.logs = logs;
        }
        
        
        
        function error(msg) {
            console.log(msg);
        }
        
        $scope.itemsByPage = 15;    

    }
})();
    
    

