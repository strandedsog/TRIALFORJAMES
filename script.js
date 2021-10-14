(function() {
	// set probability of being on for initial state of cells
	var probabilityOfOn = 30, cellState;
	// set grid size
	var gameSize = 5;

	// gather necessary DOM elements
	var cellArray = [];
	cellArray = document.getElementsByClassName("lightit");
	winCont = document.getElementsByClassName("winner-cont")[0];

	// initialize array for neighbors and fill it
	var cellNeighborArray = [];
	for(var i = 0, j = cellArray.length; i < j; i++) {
		// check for topleft corner
		if(i === 0) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i + gameSize]];
		// check for bottomright corner
		} else if(i === gameSize * gameSize - 1) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i - gameSize]];
		// check for bottomleft corner
		} else if(i === gameSize * gameSize - gameSize) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i - gameSize]];
		// check for topright corner
		} else if(i === gameSize - 1) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + gameSize]];
		// check for left side border
		} else if(i % gameSize === 0) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i + 1], cellArray[i - gameSize], cellArray[i + gameSize]];
		// check for right side border
		} else if(i % gameSize === gameSize - 1) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i - gameSize], cellArray[i + gameSize]];
		// check for top border
		} else if(i < gameSize) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i + gameSize]];
		// check for bottom border
		} else if(i >= gameSize * gameSize - gameSize) {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i - gameSize]];
		// rest of cells
		} else {
			cellNeighborArray[i] = [cellArray[i], cellArray[i - 1], cellArray[i + 1], cellArray[i - gameSize], cellArray[i + gameSize]];
		};
	}

	// start the game
	start();

	// randomize cells and add on click events
	function start() {
		for(var ii = 0, jj = cellArray.length; ii < jj; ii++) {
			cellState = Math.floor(Math.random() * 100);
			if(cellState < probabilityOfOn) {
				cellArray[ii].classList.toggle("light-on");
			}
			// remove previous event listener if it exists (for game reset)
			cellArray[ii].removeEventListener("click", lightClick);
			cellArray[ii].addEventListener("click", lightClick);
		}
	}	

	// toggle lights and neighbors when clicked
	function lightClick() {
		this.classList.toggle("light-on");
		for(var iii = 0, jjj = cellNeighborArray.length; iii < jjj; iii++) {
			if(this === cellNeighborArray[iii][0]) {
				for(var iiii = 1; iiii < cellNeighborArray[iii].length; iiii++) {
					cellNeighborArray[iii][iiii].classList.toggle("light-on");
				}
			}
		}
		// test if winner on every click and display the winner dialog
		if(testWinner()) {
			winCont.style.display = "block";
			document.getElementsByClassName('reset-btn')[0].addEventListener("click", function() {
				start();
				winCont.style.display = "none";
			});
		};
	}

	// winner if no elements with .light-on
	function testWinner() {
		if(document.getElementsByClassName("light-on")[0]) {
			return false;
		};
		return true;
	}
})();