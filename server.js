const express = require("express");
const path = require('path');

const app = express();
const port = 80;


app.set('view engine', 'ejs');

app.use(express.static("public"));

const appServer = app.listen( port, () => {
    console.log(`server started at http://localhost:${ port }`);
})

app.use(express.json());

 //Add header
app.use((req,res,next) => {
    res.append("X-CSE356", "6306bbbd2988c22186b26cb2")
    next();
})


app.get('/',(req,res) => {
    res.sendFile('index.html', { root: path.join(__dirname) })
})


app.get("/ttt", (req,res) => {
    if(req.query.name) {
        res.render('index.ejs', {root: path.join(__dirname), name: req.query.name});
    }
    else {
        res.sendFile('index.html', { root: path.join(__dirname) })
    }

})

app.get("/index.css", (req,res) => {
    res.sendFile('index.css', { root: path.join(__dirname) })
})

app.get("/index.js", (req,res) => {
    res.sendFile('index.js', { root: path.join(__dirname) })
})

app.post('/ttt/play', (req,res) => {
    if(verifyGame(req.body.grid)) {
        const [newGrid, winner] = playGame(req.body.grid);
        if(winner !== null) {
            res.json({grid : newGrid, winner: winner})
        }
        else {
            res.json({ grid: newGrid, winner: ''});
        }
    }

})




playGame = (grid) => {
    // Horizontal
    let winner = checkWinner(grid);
    console.log(winner)
    if(winner) {
        return [grid,winner];
    }
    let start = 4;
    while(true) {
        if(grid[start] === ' ') {
            grid[start] = 'O';
            break;
        }
        start = (start + 2) % grid.length;
    }
    winner = checkWinner(grid);
    return [grid,winner];
}



checkWinner = (grid) => {
    if(grid[0] !== ' ' && grid[0] === grid[1] && grid[1] === grid[2]) {
        return grid[0];
    }
    if(grid[3] !== ' ' && grid[3] === grid[4] && grid[4] === grid[5]) {
        return grid[3];
    }
    if(grid[6] !== ' ' && grid[6] === grid[7] && grid[7] === grid[8]) {
        return grid[6];
    }
    // Vertical
    if(grid[0] !== ' ' && grid[0] === grid[3] && grid[3] === grid[6]) {
        return grid[0];
    }
    if(grid[1] !== ' ' && grid[1] === grid[4] && grid[4] === grid[7]) {
        return grid[1];
    }
    if(grid[2] !== ' ' && grid[2] === grid[5] && grid[5] === grid[8]) {
        return grid[2];
    }
    // Diagonal
    if(grid[0] !== ' ' && grid[0] === grid[4] && grid[4] === grid[8]) {
        return grid[0];
    }
    if(grid[2] !== ' ' && grid[2] === grid[4] && grid[4] === grid[6]) {
        return grid[2];
    }
    let numSpaces = 0;
    for(let i = 0; i < grid.length; i++) {
        if(grid[i] === ' ') {
            numSpaces++;
        }
    }
    if(numSpaces === 0) {
        return 'T'
    }
    return null;
}

verifyGame = (grid) => {
    if (grid.length !== 9) {
        return false;
    }
    for(let i = 0; i < grid.length; i++) {
        if(grid[i] !== 'X' && grid[i] !== 'O' && grid[i] !== ' ') {
            return false;
        }
    }
    return true;
}