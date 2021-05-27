let arr = [];                        

let count = (n, m , l)=>{            
  while(n <= m && arr.length < l){   
    arr.push(Math.floor(Math.random() * (m - n)) + n);                   
  }
}
count(3, 17, 8); 
console.log(arr); 
console.log(arr.length); 


