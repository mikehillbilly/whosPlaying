function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateMobile(str) {
	var pattern = new RegExp("^[0-9]{10}$");
	return pattern.test(str);
}

  // adds an element to the array if it does not already exist using a comparer 
// function
function pushIfNotExist(array, element, comparer) { 
    if (!inArray(array, comparer)) {
        array.push(element);
    }
}

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
function inArray(array, comparer) { 
    for(var i=0; i < array.length; i++) { 
        if(comparer(array[i])) return true; 
    }
    return false; 
}

export { validateEmail, validateMobile, pushIfNotExist, inArray };