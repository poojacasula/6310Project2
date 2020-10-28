



var angle;

var bookdata; 
let gengarden  = false; 

var counter = 0;

//these values are where the book title text goes 
let x1 = 50;
let y1 = 860; 
//these values are where the tree begins drawing
let x = 275;
let y = 840;


function setup() {
  createCanvas(windowWidth, windowHeight);

  button = createButton('Plant a tree');
  button.position(100, 150);
  button.mousePressed(generateGarden);
  //default angle for fractal tree 
  angle = PI/3;
  background(0);
  textSize(30);
  fill(255);
  //TBH title is work in progress
  text('Book Ratings Garden', 100, 75);
  textSize(20);
  text('Grow a library of book-ish trees formed through their Goodreads ratings', 100, 110);
  textSize(18);
  fill(210,180,140);
  rect(0, 840, windowWidth,90);
  
}






function generateGarden(){
  print(counter);
  //only prints 4 trees on screen, otherwise will get too crowded and go off screen
  if (counter > 3){
    background(0);
    textSize(30);
    fill(255);
    //TBH title is work in progress
    text('Book Ratings Garden', 100, 75);
    textSize(20);
    text('Grow a library of book-ish trees formed through their Goodreads ratings', 100, 110);
    textSize(18);
    x1 = 50;
    y1 =860;
    x=275;
    counter = 0; 
    fill(210,180,140);
    rect(0, 840, windowWidth,90);
  }
  //randomly select book ID
  //top 600 books 
  num = random(1,600);
  url = "https://www.asdesigned.com/6310examples/proxy.php?url=" + "https://www.goodreads.com/book/show/" + num.toString() + ".xml?key=MIFjCtak0wvdzSCO4MIVog"
  loadXML(url, gotData);

}


function gotData(data){
  let x = data.listChildren(); 
  if (x.length > 1){
    bookdata = data; 
    parseData( );
  }else{
    //if book ID doesn't exist, go through it again 
    generateGarden();

  }
}




//filters out to get title, author and ratings for books
function parseData(){
  let book = bookdata.getChildren('book'); 
  let bookTitle = book[0].getChildren('title');
  let title = bookTitle[0].getContent();
  let work = book[0].getChildren('work');
  let rating = work[0].getChildren('rating_dist');
  let author = book[0].getChildren('author');
  let authorName = author[0].getChildren('name');
  print(authorName);
  let realAuthorName = authorName[0].getContent();
  BookDict = createStringDict("title", title);
  BookDict.set('author', realAuthorName);
  let temp = rating[0].getContent(); 
  let splitstring = temp.split("|"); 
  for(i=0; i<splitstring.length; i++){
    temp2 = splitstring[i].split(":")
    BookDict.set(temp2[0], temp2[1]);
    }

  gengarden = true;
}



//displays text 
function showText(x,y){
  let text1 = BookDict.get("title");
  let text2 = BookDict.get("author");
  fill(255);
  textSize(14);
  text(text1+" by "+text2, x,y);
  counter = counter+1;
  x1 = x1 + 300; 
  //changes where book title text goes 
  if (counter%2==0){
    y1 = y1-30;
  }else{
    y1 = y1 +30;
  }
}



function draw() {
  if (gengarden == true){
    showText(x1,y1);
    //y1 = y1 -50; 
    for (i = 0; i < (BookDict.size()); i++){
      //if rating is 1 star
      if (i==1){
        drawRating1();
      }
      //if rating is 2 star
      if (i==2){
        drawRating2();
      }
      //3 star rating
      if (i==3){
        let value = BookDict.get(3);
        //random colors
        r = random(255); 
        g = random(255); 
        b = random(255); 
        stroke(r,g,b);
        //if more than 1 million 3 star ratings
        if (int(value) >= 1000000){
          let temp = round(int(value)/10000);
          if (temp > 400) {
            //so it doesn't go off screen
            drawTree3(350);
          }else{
            drawTree3(temp);
          }
        }
        //if more than 100,000 3 star ratings
        else if (int(value) >= 100000){
          let temp = round(int(value)/10000);
          print(temp+90);
          drawTree3(temp+90);
        }
        else if (int(value) >= 10000){
          let temp = round(int(value)/1000);
          drawTree3(temp+80);
        }
        else if (int(value)>=1000){
          let temp = round(int(value)/100);
          drawTree3(temp+70);
        }
        else if (int(value) < 50 && int(value)>0){
          drawTree3(int(value)+40);
        }
        else {
          if (temp =0){
            drawTree3(10);
          }
          else{
          let temp = int(value)/10
          drawTree3(temp+50);
          }
        }
        print('went through 3');
      }
      //4 star rating
      if (i==4){
        let value = BookDict.get(4);
        r = random(255); 
        g = random(255); 
        b = random(255); 
        stroke(r,g,b);
        if (int(value) >= 1000000){
          let temp = round(int(value)/10000);
          if (temp > 400) {
            drawTree4(350);
          }else{
            drawTree4(temp);
          }
        }
        else if (int(value) >= 100000){
          let temp = round(int(value)/10000);
          drawTree4(temp+90);
        }
        else if (int(value) >= 10000){
          let temp = round(int(value)/1000);
          drawTree4(temp+80);
        }
        else if (int(value)>=1000){
          let temp = round(int(value)/100)
          drawTree4(temp + 70);
        }
        else if (int(value) < 50 && int(value)>0){
          drawTree4(int(value)+40);
        }
        else{
          if (temp =0){
            drawTree4(10);
          }
          else{
          let temp = int(value)/10
          drawTree4(temp+50);
          }
        }

        print('went through 4');
      }
      //5 star ratings
      if (i==5){
        let value = BookDict.get(5);
        r = random(255);
        g = random(255); 
        b = random(255); 
        stroke(r,g,b);
        if (int(value) >= 1000000){
          let temp = round(int(value)/10000);
          print(temp);
          if (temp > 400) {
            drawTree5(150);
          }else{
            drawTree5(temp);
          }
        }
        else if (int(value) >= 100000){
          let temp = round(int(value)/10000);
          drawTree5(temp+90);
        }
        else if (int(value) >= 10000){
          let temp = round(int(value)/1000);
          drawTree5(temp+80);
        }
        else if (int(value)>=1000){
          let temp = round(int(value)/100);
          drawTree5(temp+70);
        }
        else if (int(value) < 50 && int(value)>0){
          drawTree5(int(value)+40);
        }
        else {
          if (temp =0){
            drawTree5(10);
          }
          else{
          let temp = int(value)/10
          drawTree5(temp+50);
          }
        }
        print('went through 5');
      }
    }
    gengarden= false; 

  }  
}

//draw 2 star rating
function drawRating2(){
  let value = BookDict.get(2);
  r = random(255); 
  g = random(255); 
  b = random(255); 
  stroke(r,g,b);
  if (int(value) >= 1000000){
    let temp = round(int(value)/10000);
    if (temp > 400) {
      drawTree2(350);
    }else{
      drawTree2(temp);
    }
  }
  else if (int(value) >= 100000){
    let temp = round(int(value)/10000);
    drawTree2(temp+90);
  }
  else if (int(value) >= 10000){
    let temp = round(int(value)/1000);
    drawTree2(temp+80);
  }
  else if (int(value)>=1000){
    let temp = round(int(value)/100);
    drawTree2(temp+70);
  }
  else if (int(value) < 50 && int(value)>0){
    drawTree2(int(value)+40);
  }
  else{
    if (temp =0){
      drawTree2(10);
    }
    else{
    let temp = int(value)/10
    drawTree2(temp+50);
    }
  }
  print('went through 2');
}


function drawRating1(){
  let value = BookDict.get(1);
  translate(x,y);
  x = x +280;
  r = random(255); 
  g = random(255); 
  b = random(255); 
  stroke(r,g,b);

  if (int(value) >= 1000000){
    //print('yers');
    let temp = round(int(value)/10000);
    if (temp > 400) {
      drawTree1(350);
    }else{
      drawTree1(temp);
    }
  }
  else if (int(value) >= 100000){
    let temp = round(int(value)/10000);
    drawTree1(temp+90);

  }
  else if (int(value) >= 10000){
    let temp = round(int(value)/1000);
    drawTree1(temp+80);
  }
  else if (int(value)>=1000){
    let temp = round(int(value)/100);
    drawTree1(temp+70);
  }
  else if (int(value) < 50 && int(value)>0){
    drawTree1(int(value)+40);
  }
  else{
    if (temp =0){
      drawTree1(10);
    }
    else{
    let temp = int(value)/10
    drawTree1(temp+50);
    }
  }
  print('went through 1');
}




// Based on The Coding Train's "Coding Challenge #14 : Fractal Trees - Recursive"
// https://www.youtube.com/watch?v=0jjeOYMjmDU&ab_channel=TheCodingTrain

//draw a 1 star tree
function drawTree1(len){  
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 1) {
    push();
    rotate(angle);
    drawTree1(len * 0.58);
    pop();
    push();
    rotate(-angle);
    drawTree1(len * 0.58);
    pop();
  }
  
}


function drawTree2(len){  
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 2) {
    push();
    rotate(PI/2);
    drawTree2(len * 0.62);
    pop();
    push();
    rotate(-(PI/2));
    drawTree2(len * 0.62);
    pop();
  }
  
}


function drawTree3(len){  
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 3) {
    push();
    rotate(PI/5);
    drawTree3(len * 0.70);
    pop();
    push();
    rotate(-PI/5);
    drawTree3(len * 0.7);
    pop();
  }
  
}

function drawTree4(len){  
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(PI/4);
    drawTree4(len * 0.69);
    pop();
    push();
    rotate(-PI/4);
    drawTree4(len * 0.69);
    pop();
  }
  
}

function drawTree5(len){  
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 5) {
    push();
    rotate(PI/5);
    drawTree5(len * 0.75);
    pop();
    push();
    rotate(-PI/5);
    drawTree5(len * 0.75);
    pop();
  }
  gengarden = false; 
  
}