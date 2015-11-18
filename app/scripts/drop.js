(function() {
	var target = document.getElementById('dropTarget');
	
	target.ondragover = function() {
		return false;
	}
	target.ondragend = function() {
		return false;
	}
	
	target.ondrop = function(e) {
		e.preventDefault();
		
		var file = e.dataTransfer.files[0];
		console.log(file);
		
		return false;
	}
	
	
})();
