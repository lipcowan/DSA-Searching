class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if(this.key == null) {
            this.key = key;
            this.value = value;
        }
        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key,value)
            }
            else {
                this.left.insert(key,value)
            }
        }

        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key,value)
            }
            else {
                this.right.insert(key,value)
            }
        }
    }
    preOrder() {
        console.log(this.key)  
        if (this.left) {
            this.left.preOrder();
        }
        if (this.right) {
            this.right.preOrder();
        }
    }
    inOrder() {  
        if (this.left) {
            this.left.inOrder();
        }
        console.log(this.key)
        if (this.right) {
            this.right.inOrder();
        }
    }
    postOrder() {
        if (this.left) {
            this.left.postOrder();
        }
        if (this.right) {
            this.right.postOrder();
        }
        console.log(this.key)
    }

    bfs() {
        const queue = [this];
        const values = [] 
        while (queue.length) {
            const node = queue.shift();
            values.push(node.value);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        console.log(values);
    }
}

function binarySearch(array, value, start, end, c = 0) {
  var start = start === undefined ? 0 : start;
  var end = end === undefined ? array.length : end;
  let count = c;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];

  if (item == value) {
    console.log("binary:", count);
  } else if (item < value) {
    count++;
    return binarySearch(array, value, index + 1, end, count);
  } else if (item > value) {
    count++;
    return binarySearch(array, value, start, index - 1, count);
  }
}

function linearSearch(array, value) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    count++;
    if (array[i] == value) {
      console.log("linear: ", count);
      return i;
    }
  }
}

function deweySearch(bookArray, deweyValue, title, start, end) {
  var start = start === undefined ? 0 : start;
  var end = end === undefined ? bookArray.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const book = bookArray[index];

  if (book.deweyValue == deweyValue) {
    if (book.title == title) {
      return title;
    } else {
      return "Book must be checked out";
    }
  } else if (book.deweyValue < deweyValue) {
    return binarySearch(bookArray, deweyValue, title, index + 1, end);
  } else if (book.deweyValue > deweyValue) {
    return binarySearch(bookArray, deweyValue, title, start, index - 1);
  }
}

let array = [89,30,25,32,72,70,51,42,25,24,53,55,78,50,13,40,48,32,26,2,14,33,45,72,56,44,21,88,27,68,15,62,93,98,73,28,16,46,87,28,65,38,67,16,85,63,23,69,64,91,9,70,81,27,97,82,6,88,3,7,46,13,11,64,15,76,31,26,38,28,13,17,69,90,1,6,7,64,43,9,73,80,98,46,27,22,87,49,83,6,39,42,51,54,84,34,53,78,40,14,5,];

array = array.sort();


/* 
BinarySearch for index, then BinarySearch the title.
Dewey Decimal Index = 600.34
Book Title = "Coding 101"
*/

let books = [
  { title: "Hello World", deweyValue: 400.2 },
  { title: "Coding 101", deweyValue: 600.1 },
  {title: "Testing", deweyValue: 100.4},
];

function makeTree(array, start=0, end=array.length) {
    if(start >= end){ 
        return null
     } 

    const middle = Math.floor((end + start) / 2); 
    const value = array[middle]; 
    const node = new BinarySearchTree(value);

    node.left = makeTree(array, start, middle);
    node.right = makeTree(array, middle +1, end);

    return node;
}

function makeBDT(array, start=0, end=array.length) {
    if(start >= end){ 
        return null
     } 

    const middle = Math.floor((end + start) / 2); 
    const key = array[middle].key;
    const value = array[middle].value; 
    const node = new BinarySearchTree(key,value);

    node.left = makeBDT(array, start, middle);
    node.right = makeBDT(array, middle +1, end);

    return node;
}

let arrayFive = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
arrayFive = arrayFive.sort((a, b) => {return a - b});

let testTree = makeTree(arrayFive);
testTree.postOrder()

let commandRank = [
    {
        key: 6,
        value: 'Lieutenant Selar'
    },
    {
        key: 2,
        value: 'Lt. Cmdr. Worf'
    },
    {   
        key: 3,
        value: 'Commander Riker'
    },
    {
        key: 4, 
        value: 'Lt. Cmdr. LaForge'
    },
    {   
        key: 5,
        value: 'Captain Picard'
    },
    {
        key: 8,
        value: 'Lt. Cmdr. Crusher'
    },
    {
        key: 7,
        value: 'Commander Data'
    },
    {
        key: 1,
        value: 'Lieutenant security-officer'
    },
]

let commandRankTree = makeBDT(commandRank);

/*
captain picard - a
commander riker - b
commander data - c
lt cmdr worf - d
lt cmdr laforge - e
lt cmdr crusher - f
lieutenant sec-off - g
lieut selar - h

a
(left b 
    (left d 
        (left g, right null), 
    right e 
        (left null, right null)), 
right c 
    (left null, 
        
    right f 
        (left h, right null ))
)
*/

function maxProfit(arr) {
    let profit = 0;
    let buyDay = 0;
    let sellDay = 0;
    for(let i=0; i<arr.length; i++){
        for(let j=1; j<arr.length; j++){
            let diff = arr[i] - arr[j];
            if(diff < profit){
                profit=diff;
                buyDay=i;
                sellDay=j
            }
        }
    }
    return `Day to purchase: ${buyDay} Day to sell: ${sellDay}`
}

console.log(maxProfit([128, 97, 121, 123, 98, 97, 105]))