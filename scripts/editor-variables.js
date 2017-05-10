
$(document).ready(function() {

	var stepsList = [];
	var variablesList = [];
	var agAmount = new Variable(1.0, "Grams of agarose");
	var bariumAmount = new Variable(15.0, "Milligrams of barium");
	var stepOne = new Step(["Measure", "g of agarose. Mix in", "mg of barium."], [agAmount, bariumAmount], [1.0, 3.0], 1);
	var stepTwo = new Step(["Mix agarose power with", "mL 1xTAE in a microwaveable flask. Mix in another", "mg of barium."], [agAmount, bariumAmount], [100.0, 1.0], 2);
	var stepThree = new Step(["Microwave for 1-3 minutes."], [], [], 3);
	var stepFour = new Step(["Let solution cool down."], [], [], 4);
	var stepFive = new Step(["Add EtBr at", "microL of stock solution."], [agAmount], [2.0], 5);
	stepsList.push(stepOne);
	stepsList.push(stepTwo);
	stepsList.push(stepThree);
	stepsList.push(stepFour);
	stepsList.push(stepFive);
	variablesList.push(agAmount);
	variablesList.push(bariumAmount);

	displayModal();
	displaySteps();


	$(document).on("click", ".var", function() {
		document.getElementById("myModal-vars").style.display = "block";
		$('#myModal-vars').animate({width:"500px"});
		$('#mainContainer').animate({left:"500px"});
	});


	$(document).on("click", ".edit-var", function() {
		var editableText = $(this);
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];
		for (var j = 0; j<stepsList.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < stepsList[j].getVars().length; k++) {
						if (stepsList[j].getVars()[k].getName() == variablesList[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ variablesList[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#457796';
						document.getElementById(toHighlight).style.borderWidth = 'thick';
					}
			}


		editableText.blur(editableTextBlurred);
	});

	$(document).on("click", ".close", function() {
		document.getElementById("myModal-vars").style.display = "none";

		updateVariables();
		var newModal = document.createElement("div");
		newModal.id = "myModal-vars";
		newModal.setAttribute("class", "modal");
		document.getElementsByTagName("BODY")[0].appendChild(newModal);
		displayModal();
		$('#mainContainer').animate({left:0});
		$('#myModal-vars').animate({width:0});
		
	});

	$(document).on("click", ".edit-amount", function() {
		var editableTextAmount = $(this);
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		for (var j = 0; j<stepsList.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < stepsList[j].getVars().length; k++) {
						if (stepsList[j].getVars()[k].getName() == variablesList[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ variablesList[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#457796';
						document.getElementById(toHighlight).style.borderWidth = 'thick';
					}
			}

		editableTextAmount.blur(editableTextAmountBlurred);
	});


	$(document).on("click", ".edit-factor", function() {
		var editableTextFactor = $(this);
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];
		for (var j = 0; j<stepsList.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < stepsList[j].getVars().length; k++) {
						if (stepsList[j].getVars()[k].getName() == variablesList[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ variablesList[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#457796';
						document.getElementById(toHighlight).style.borderWidth = 'thick';
					}
			}

		editableTextFactor.blur(editableTextFactorBlurred);
	});

	window.onclick = function(event) {
		if (event.target == document.getElementById("modal-content-vars")) {
			document.getElementById("myModal-vars").style.display = "none";


			updateVariables();
			var newModal = document.createElement("div");
			newModal.id = "myModal-vars";
			newModal.setAttribute("class", "modal");
			document.getElementsByTagName("BODY")[0].appendChild(newModal);
			displayModal();
			$('#mainContainer').animate({left:0});
			$('#myModal-vars').animate({width:0});
			}
	}

	function editableTextAmountBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		variablesList[variableNum].setValue(parseFloat(this.value));

		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		for (var j = 0; j<stepsList.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < stepsList[j].getVars().length; k++) {
						if (stepsList[j].getVars()[k].getName() == variablesList[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ variablesList[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#CFCFCF';
						document.getElementById(toHighlight).style.borderWidth = 'thin';
					}
		}

		displayModal();
		updateVariables();
	}

	function editableTextBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];

		for (var j = 0; j<stepsList.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < stepsList[j].getVars().length; k++) {
						if (stepsList[j].getVars()[k].getName() == variablesList[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ variablesList[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#CFCFCF';
						document.getElementById(toHighlight).style.borderWidth = 'thin';
					}
		}
		for (var m = 0; m < stepsList[stepNum].getVars().length; m++) {
			if (stepsList[stepNum].getVars()[m].getName() == variablesList[variableNum].getName()) {
				variablesList[variableNum].setValue(parseFloat(this.value) / (stepsList[stepNum].getFactors()[m]));
			}
		}

		displayModal();
		updateVariables();
	}

	function editableTextFactorBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];

		var toHighlight = "area_" + stepNum.toString() +"_"+ variablesList[variableNum].getName().toString();
		document.getElementById(toHighlight).style.borderColor = '#CFCFCF';
		document.getElementById(toHighlight).style.borderWidth = 'thin';
		for (var q = 0; q < stepsList[stepNum].getVars().length; q++) {
			if (stepsList[stepNum].getVars()[q].getName() == variablesList[variableNum].getName()) {
				stepsList[stepNum].setFactor(q, parseFloat(this.value));
			}
		}

		displayModal();
		updateVariables();
	}


	function displayModal() {
		var node = document.getElementById("modal-content-vars");
		if (node != null) {
			while (node.hasChildNodes()) {
			    node.removeChild(node.lastChild);
			}	
		}
		else {  
			var modalDiv = document.createElement("div");
			modalDiv.setAttribute("class", "modal-content-vars");
			modalDiv.id = "modal-content-vars";
			document.getElementById("myModal-vars").appendChild(modalDiv);
		}

		var divClose = document.createElement("SPAN");
		divClose.setAttribute("class", "close");
		divClose.innerHTML = "&times;";
		document.getElementById("modal-content-vars").appendChild(divClose);
		var headerOne = document.createElement("div");
		headerOne.innerHTML = "<h1> Variable List </h1>";
		document.getElementById("modal-content-vars").appendChild(headerOne);

		for (var i = 0 ; i<variablesList.length; i++) {
			var divModal = document.createElement("div");
			var html_string = "<h2> Variable " + (i+1).toString() + ": " + variablesList[i].getName() + "</h2>";
			html_string = html_string + "<br>";
			html_string = html_string + "<b>Amount: </b> " + "<textarea class='edit-amount' rows='1' id='var_"+i.toString() + "'>" + variablesList[i].getValue().toString() + "</textarea>";
			html_string = html_string + "<br>";
			for (var j = 0; j<stepsList.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < stepsList[j].getVars().length; k++) {
						if (stepsList[j].getVars()[k].getName() == variablesList[i].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						html_string = html_string + "<b> Step " + (j+1).toString() + ": </b>";
						html_string = html_string + "<textarea class='edit-var' rows='1' id='var_"+i.toString() + "_" + j.toString() + "'>" + (stepsList[j].getVarValue(indexOfValue)).toString() + "</textarea>";
						html_string = html_string + " (with scaling factor: ";
						html_string = html_string + "<textarea class='edit-factor' rows='1' cols='1' id='var_"+i.toString() + "_" + j.toString() + "'>" + (stepsList[j].getFactors()[indexOfValue]).toString() + "</textarea>";
						html_string = html_string + ")";
						html_string = html_string + "<br>";
					}
			}
			html_string += "<br>";
			html_string += "<br>";
			divModal.innerHTML = html_string;
			document.getElementById("modal-content-vars").appendChild(divModal);
		}                            
	}

	function displaySteps() {
		var node = document.getElementById("mainContainer");
		while (node.hasChildNodes()) {
		    node.removeChild(node.lastChild);
		}

		for (var n = 0 ; n<stepsList.length; n++) {
			var divNew = stepsList[n].display();
			document.getElementById("mainContainer").appendChild(divNew);
		}
	}

	function updateVariables() {
		var variables = document.getElementsByClassName("var");
		for (var i = 0; i < variables.length; i++) {
			var elementId = variables[i].id.split("_");
			var stepNum = elementId[1];
			var variableName = elementId[2];
			var variableNum = -1;

			for (var j = 0; j < stepsList[stepNum].getVars().length; j++) {
				if (stepsList[stepNum].getVars()[j].getName() == variableName) {
					variableNum = j;
				}
			}

			variables[i].innerHTML = stepsList[stepNum].getVarValue(variableNum);
		}
	}
});

