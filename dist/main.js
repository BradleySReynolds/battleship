(()=>{"use strict";function t(){let t=[];for(let e=0;e<10;e++){let e=[];for(let t=0;t<10;t++)e.push("o");t.push(e)}return t}class e{constructor(t,e){this.name=t,this.length=e,this.location=[]}}class r{constructor(){this.board=t(),this.ships=[new e("Carrier",5),new e("Battleship",4),new e("Destroyer",3),new e("Submarine",3),new e("Patrol Boat",2)],this.hits=0}positionShips(){this.ships.forEach((t=>{let e,r,i,s=!1;t:for(;!s;){if(i=Math.floor(2*Math.random()),e=Math.floor(10*Math.random()),r=Math.floor(10*Math.random()),0===i){if(e+t.length>9){for(let i=t.length;i>0;i--)if("x"===this.board[r][e-i])continue t}else for(let i=0;i<t.length;i++)if(t.location.push([e+i,r]),"x"===this.board[r][e+i])continue t}else if(r+t.length>9){for(let i=t.length;i>0;i--)if("x"===this.board[r-i][e])continue t}else for(let i=0;i<t.length;i++)if("x"===this.board[r+i][e])continue t;s=!0}if(0===i)if(e+t.length>9)for(let i=t.length;i>0;i--)t.location.push([e-i,r]),this.board[r][e-i]="x";else for(let i=0;i<t.length;i++)t.location.push([e+i,r]),this.board[r][e+i]="x";else if(r+t.length>9)for(let i=t.length;i>0;i--)t.location.push([e,r-i]),this.board[r-i][e]="x";else for(let i=0;i<t.length;i++)t.location.push([e,r+i]),this.board[r+i][e]="x"}))}isHit(){this.hits++}}class i{constructor(){this.board=t(),this.ships=[new e("Carrier",5),new e("Battleship",4),new e("Destroyer",3),new e("Submarine",3),new e("Patrol Boat",2)],this.hits=0,this.iterator=0,this.invert="horizontal",this.instruct=document.querySelector(".player-instruct"),this.playerSquares=null,this.showComputerBoard=document.querySelector(".computer-container"),this.invertBtn=document.querySelector(".invert")}boardLogic(t,e,r,i=this.invert,s=this.iterator){if(5===s)return 0;if("horizontal"===i)if(e+this.ships[s].length>9)for(let i=0;i<this.ships[s].length;i++)"placed"!==this.board[t][e-i]&&(this.board[t][e-i]=r);else for(let i=0;i<this.ships[s].length;i++)"placed"!==this.board[t][e+i]&&(this.board[t][e+i]=r);else if(t+this.ships[s].length>9)for(let i=0;i<this.ships[s].length;i++)"placed"!==this.board[t-i][e]&&(this.board[t-i][e]=r);else for(let i=0;i<this.ships[s].length;i++)"placed"!==this.board[t+i][e]&&(this.board[t+i][e]=r)}isHit(){this.hits++}findXandY(t){return[Number(t.getAttribute("x")),Number(t.getAttribute("y"))]}iteratorLogic(t=this.iterator){t>=5&&(this.playerSquares.forEach((t=>{t.style.pointerEvents="none"})),this.showComputerBoard.style.display="flex",this.instruct.remove(),this.invertBtn.remove()),t<5&&(this.instruct.textContent=`Place your ${this.ships[t].name}`)}placeShips(){this.invertBtn.addEventListener("click",(()=>{this.invert="horizontal"===this.invert?"vertical":"horizontal",this.invertBtn.textContent=`${this.invert}`}));const t=t=>{let e=t.target,[r,i]=this.findXandY(e);this.boardLogic(r,i,"hovered"),this.renderBoard()},e=t=>{let e=t.target,[r,i]=this.findXandY(e);this.boardLogic(r,i,"exit"),this.renderBoard()},r=t=>{let e=t.target,[r,i]=this.findXandY(e);this.boardLogic(r,i,"placed"),this.renderBoard(),this.iterator++,this.iteratorLogic()};this.playerSquares.forEach((i=>{i.addEventListener("mouseenter",t),i.addEventListener("mouseleave",e),i.addEventListener("click",r)}))}renderBoard(t=this.playerSquares){const e={hovered:"ship-hit",placed:"ship-placed",exit:"ship-empty"};this.board.flat().forEach(((r,i)=>{const s=t[i],o=e[r];s.classList.remove("ship-placed","ship-hit","ship-empty"),s.classList.add(o),"placed"===r&&(s.textContent="x")}))}}class s{constructor(t,e){this.player=t,this.computer=e,this.turn=!0,this.gameover=!1,this.computerMoves=[],this.winner=null}checkwin(){17===this.player.hits?(this.gameover=!0,this.winner="Computer"):17===this.computer.hits&&(this.gameover=!0,this.winner="Player"),!0===this.gameover&&(document.createElement("button"),document.body.innerHTML="",document.body.innerHTML=`\n      <div class="winner-container">\n        <p class='winner-text'>The ${this.winner} wins!</p>\n        <button class="winner-btn">Play Again</button>\n      </div>`,document.querySelector(".winner-btn").addEventListener("click",(()=>{location.reload()})))}computerMove(){if(!1===this.gameover){const t=document.querySelectorAll(".player-square");let e=Math.floor(10*Math.random()),r=Math.floor(10*Math.random());this.computerMoves.includes(JSON.stringify([e,r]))?this.computerMove():("w"===this.player.board[r][e]?(this.player.isHit(),this.player.board[r][e]="i",this.player.board.flat().forEach(((e,r)=>{"i"===e&&(t[r].style.textContent="x",t[r].style.color="red")}))):(this.player.board[r][e]="m",this.player.board.flat().forEach(((e,r)=>{"m"===e&&(t[r].style.textContent="o",t[r].style.color="black")}))),this.computerMoves.push(JSON.stringify([e,r])))}}}!function(){const t=document.querySelector(".computer-board"),e=document.querySelector(".player-board"),o=new r,n=new i,a=new s(n,o);n.board.forEach(((t,r)=>t.forEach(((t,i)=>{let s=document.createElement("div");s.classList.add("player-square"),s.setAttribute("x",r),s.setAttribute("y",i),s.textContent=n.board[r][i],e.append(s)})))),n.playerSquares=document.querySelectorAll(".player-square"),n.placeShips(),o.positionShips(),o.board.forEach(((e,r)=>e.forEach(((e,i)=>{let s=document.createElement("div");s.classList.add("square"),s.textContent=o.board[r][i],t.append(s)}))));const h=document.querySelectorAll(".square"),l=document.querySelectorAll(".player-square");h.forEach((t=>{t.addEventListener("click",(function t(e){"x"===e.target.textContent?(e.target.style.color="red",o.isHit()):e.target.style.color="black",console.log(n.hits,o.hits),a.checkwin(),a.computerMove(),n.renderBoard(l),e.target.removeEventListener("click",t)}))}))}()})();