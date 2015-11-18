(function () {
    
    angular.module('app').controller('logController', ['$scope', 'NgTableParams', 'parser', LogController]);

    function LogController($scope, NgTableParams, parser) {
        var self = this;
       	var target = document.getElementById('dropTarget');
	
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
        
        self.tableParams = new NgTableParams({ count: 200 }, { counts: [50, 100, 200, 500]});
                
        function setTableParams(logs) {
            self.tableParams.settings({data: logs});    
        }
        
        function error(msg) {
            console.log(msg);
        }
        
        

    }
})();
    
    

