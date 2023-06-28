var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')


GetPuzzle.onclick = function () {
    // const data = null;

    // const xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === this.DONE) {
    //         console.log(this.responseText);
    //     }
    // });
    
    // xhr.open("GET", "https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku?create=32&output=raw");
    // xhr.setRequestHeader("X-RapidAPI-Key", "06ecc8a4a9msh0847d9d7adf0872p1218b9jsn7489b41cd95a");
    // xhr.setRequestHeader("X-RapidAPI-Host", "sudoku-all-purpose-pro.p.rapidapi.com");
    
    // xhr.send(data);
	board=[[],[],[],[],[],[],[],[],[]];
	FillBoard(board);
	fillDiagonal();
	// Fill remaining blocks
	fillRemaining(0,3);
	// Remove Randomly K digits to make game
	let k=Math.floor(Math.random()*15 + 50);
	removeKDigits(k);
	FillBoard(board);
}

function fillDiagonal()
{
	for (let i = 0; i < 9; i = i + 3)
	{
		fillBox(i, i);
	}
}
function fillBox(row,col)
{
	let num;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			do {
				num = Math.floor(Math.random()*9);
			} while (!unUsedInBox(row, col, num));
			board[row + i][col + j] = num;
		}
	}
}
function fillRemaining(i,j)
	{
		// System.out.prletln(i+" "+j);
		if (j >= 9 && i < 8) {
			i = i + 1;
			j = 0;
		}
		if (i >= 9 && j >= 9) {
			return true;
		}
		if (i < 3) {
			if (j < 3) {
				j = 3;
			}
		}
		else if (i < 6) {
			if (j == Math.floor(i / 3) * 3) {
				j = j + 3;
			}
		}
		else {
			if (j == 6) {
				i = i + 1;
				j = 0;
				if (i >= 9) {
					return true;
				}
			}
		}
		for (let num = 1; num <= 9; num++) {
			if (is_valid(board,i, j,num,9)) {
				board[i][j] = num;
				if (fillRemaining(i, j + 1)) {
					return true;
				}
				board[i][j] = 0;
			}
		}
		return false;
	}
function unUsedInBox(rowStart,colStart,num)
{
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[rowStart + i][colStart + j]== num) {
				return false;
			}
		}
	}
	return true;
}
function removeKDigits(k)
	{
		let count = k;
		
		while (count != 0) {
			let cellId = Math.floor(Math.random()*(80));
			
			let i = Math.floor(cellId / 9);
			let j = cellId % 9;
			if (j != 0) {
				j = j - 1;
			}
			if (board[i][j] != 0) {
				
				count--;
				board[i][j] = 0;
			}
		}
	}


SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
	FillBoard(board);
};

// function SudokuSolver(board, i, j, n) {
// 	// Write your Code here
// }
function SudokuSolver(board,i,j,n){
    if(i==9){
		
        return true;
    }
    if(j>n){
        return SudokuSolver(board,i+1,0,n);
    }
    if(board[i][j]!=0){
        return SudokuSolver(board,i,j+1,n);
    }
    for(let num=1;num<=9;num++){
        if(is_valid(board,i,j,num,n)){
            board[i][j]=num;
            let sub_ans=SudokuSolver(board,i,j+1,n);
            if(sub_ans) return true;
            //backtrack
            board[i][j]=0;
        }
    }
    return false;
}
function is_valid(board,i,j,num,n){
    for(let x=0;x<n;x++){
        if(board[i][x]==num || board[x][j]==num) return false;
    }
    let rn=3;
    let si=i-i%rn;
    let sj=j-j%rn;
    for(let x=si;x<si+rn;x++){
        for(let y=sj;y<sj+rn;y++){
            if(board[x][y]==num) return false;
        }
    }
    return true;
}