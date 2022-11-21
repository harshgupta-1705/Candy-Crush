document.addEventListener("DOMContentLoaded",()=>{
   const grid=document.querySelector(".grid1");
   const image=["url(images/RedcandyHTML5.webp)",
                "url(images/BluecandyHTML5.webp)" ,
                "url(images/YellowcandyHTML5.webp)",
                "url(images/GreencandyHTML5.webp)",
                "url(images/OrangecandyHTML5.webp)",
                "url(images/PurplecandyHTML5.webp)"];
     const scr=document.getElementById("score");
   const width=8;
   let candies=[];
   let score=(JSON.parse(window.localStorage.getItem("score"))==null)?0:JSON.parse(window.localStorage.getItem("score"));
   let trn=(JSON.parse(window.localStorage.getItem("a"))==null)?0:JSON.parse(window.localStorage.getItem("a"));
   function creategrid()
   {
     let board=JSON.parse(window.localStorage.getItem("Board"));
    for(let i=0;i<width*width;i++)
    {
        let candy=document.createElement('div');
        //candy.style.border="1px solid";
        let j;
        if(board!=null)
        {
          j=JSON.parse(board[i]);
        }
        candy.style.backgroundImage=(j!=null&&j!=undefined)?(j):(image[Math.floor(image.length*Math.random())]);
        candy.style.backgroundSize="contain";
        candy.style.backgroundRepeat="no-repeat";
        candy.setAttribute("draggable",true);
        candy.setAttribute("id",i);
        candies.push(candy);
        grid.appendChild(candy);
    }
    candies.forEach(candy=>candy.addEventListener("dragenter",dragEnter));
   candies.forEach(candy=>candy.addEventListener("dragover",dragOver));
   candies.forEach(candy=>candy.addEventListener("dragstart",dragStart));
   candies.forEach(candy=>candy.addEventListener("dragleave",dragLeave));
   candies.forEach(candy=>candy.addEventListener("dragend",dragEnd));
   candies.forEach(candy=>candy.addEventListener("drop",dragDrop));
   }
   creategrid();
   let imageBeingDragged,candyBeingDrag;
   let imageBeingReplaced,candyBeingReplaced;
   function score_Generator(a=0)
   {
     // scr.setAttribute("class",scr.getAttribute("class")+" "+bold);
     trn=(a==0)?trn:a;

     scr.innerText="SCORE"+"\t+"+trn+"\t="+score;
   }
   score_Generator();
   

   function dragOver(e)
   {
     e.preventDefault(); 
     //console.log(e);
        
   }
   function dragEnter(e)
   {
     e.preventDefault();
   }
   function dragStart()
   {
     imageBeingDragged=this.style.backgroundImage;
     candyBeingDrag=parseInt(this.id);
   }
   function dragEnd()
   {
     let validmoves=[candyBeingDrag+1,candyBeingDrag-1,candyBeingDrag+width,candyBeingDrag-width];
     let valid=validmoves.includes(candyBeingReplaced);
     if(valid&&candyBeingReplaced)
     {
          candyBeingDrag=null;
          candyBeingReplaced=null;
          imageBeingDragged=null;
          imageBeingReplaced=null;
          checker();
          //score_Generator();
     }
     else if(candyBeingReplaced&&!valid)
     {
          candies[candyBeingReplaced].style.backgroundImage=imageBeingReplaced;
          candies[candyBeingDrag].style.backgroundImage=imageBeingDragged;    
     }
   }
  
   function dragLeave()
   {
        //console.log("drag leave");
   }
   function dragDrop()
   {
     imageBeingReplaced=this.style.backgroundImage;
     candyBeingReplaced=parseInt(this.id);
     candies[candyBeingReplaced].style.backgroundImage=imageBeingDragged;
     candies[candyBeingDrag].style.backgroundImage=imageBeingReplaced;
        console.log("drag Drop");
   }
   function sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
  }
   async function checker()
   {
     let flag=1;
     let turnscore=0;
     while(flag==1)
     {
          let c1=0,c2=0;
          for(let i=0;i<width*width;i++)
          {
               c1=0,c2=0;
               let left=i,right=i,top=i,down=i;
               while(true)
               {
                    if(left%8==0)
                    {
                         if(candies[left].style.backgroundImage==candies[i].style.backgroundImage)
                         {c1++;left--;}
                         break;
                    }
                    else if(candies[left].style.backgroundImage==candies[i].style.backgroundImage)
                    {
                         c1++;
                         left--;
                         
                    }
                    else
                    break;
               }
               while(true)
               {
                    if(right%8==7)
                    {
                         if(candies[right].style.backgroundImage==candies[i].style.backgroundImage)
                         {c1++;right++;}
                         break;    
                    }
                    else if(candies[right].style.backgroundImage==candies[i].style.backgroundImage)
                    {
                         c1++;
                         right++;
                         continue;
                    }
                    else
                    break;
               }
               while(top>=0)
               {
                    if(candies[top].style.backgroundImage==candies[i].style.backgroundImage)
                    {
                         c2++;
                         top-=8;
                         continue;
                    }
                    break;
               }
               while(down<=63)
               {
                    if(candies[down].style.backgroundImage==candies[i].style.backgroundImage)
                    {
                         c2++;
                         down+=8;
                         continue;
                    }
                    break;
               }
               //console.log(c1,c2);
               if(c1-1>=3)
               {
                    turnscore+=c1-1;
                    left++;
                    right--;
                    let l1=left;
                    while(l1<=right)
                    {
                         candies[l1++].style.backgroundImage=null;
                         //candies[l1++].style.backgroundImage=image[Math.floor(image.length*Math.random())];
                         await sleep(200);
                    }
                    l1=left;
                    while(l1<=right)
                    {
                         //candies[l1].style.backgroundImage=null;
                         candies[l1++].style.backgroundImage=image[Math.floor(image.length*Math.random())];
                         await sleep(200);
                         
                    }
               }
               if(c2-1>=3)
               {
                    turnscore+=c2-1;
                    top+=8;down-=8;
                    let t1=top,d1=down;
                    while(t1<=d1)
                    {
                         candies[t1].style.backgroundImage=null;
                         // candies[t1].style.backgroundImage=image[Math.floor(image.length*Math.random())];
                         t1+=8;
                         await sleep(200);
                    }
                    
                    t1=top;
                    while(t1<=d1)
                    {
                         candies[t1].style.backgroundImage=image[Math.floor(image.length*Math.random())];
                         t1+=8;
                         await sleep(200);
                    }

               }
          }
          score+=turnscore;
          score_Generator(turnscore);
          if(c1-1>=3||c2-1>=3)
          {
               i=0;
               continue;
          }
          flag=-1;

     }
   }
   function saveGame()
   {
     let board=[];
     for(let i=0;i<64;i++)
     {
          board[i]=JSON.stringify(candies[i].style.backgroundImage);
     }
     window.localStorage.setItem("Board",JSON.stringify(board));
     window.localStorage.setItem("score",JSON.stringify(score));
     window.localStorage.setItem("a",JSON.stringify(trn));
   }
   function newGame()
   {
     window.localStorage.clear();
     
     candies=[];
     grid.innerHTML="";
     score=0;
     trn=0;
     score_Generator(trn);
     creategrid();
     checker();
   }
   checker();
   //newGame();
   const savegame=document.getElementById('save');
//    savegame.setAttribute("onclick","saveGame");
//console.log(candies[0]);
savegame.addEventListener("click",saveGame);
//console.log(JSON.parse(window.localStorage.getItem("Board")));
const newgame=document.getElementById('new');
newgame.addEventListener('click',newGame);
   
});
