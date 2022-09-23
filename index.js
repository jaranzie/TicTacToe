let buttonArray = [];
let grid = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
const url = ""

for(let i = 0; i < 9; i++) {
    document.getElementById(`s${i}`).onclick = () => {
        let button = document.getElementById(`s${i}`);
        button.disabled = true;
        button.innerText = 'X'
        grid[i] = 'X';
        sendGrid();
    }
}

renderGrid = () => {
    for(let i = 0; i < 9; i++) {
        let square = document.getElementById(`s${i}`)
        if(grid[i] === ' ') {
            square.disabled = false;
            square.innerText = 'blank';
        }
        else {
            square.disabled = true;
            square.innerText = grid[i];
        }
    }
}

sendGrid = () => {
    fetch('/ttt/play', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"grid":grid})
    }).then(res => {
        res.json().then((data) => {
            grid = data.grid;
            renderGrid();
            if(data.winner === 'X' || data.winner === 'O' || data.winner ==='T') {
                let wBox = document.getElementById('winner');
                wBox.hidden = false;
                wBox.innerText = `Winner: ${data.winner}`
            }
        })
    })
}



















