console.log('project 2');

// books Constructor
function BookInfo(bookName, author, typeOFBook){
    this.bookName = bookName;
    this.author = author;
    this.typeOFBook = typeOFBook;
}

//Display Constructor
function Display(){

}

//type of Book Validation
Display.prototype.validateType = function(type1, type2, type3){
    if(type1.checked){
        return type1.value;
    }else if(type2.checked){
        return type2.value;
    }else if(type3.checked){
        return type3.value;
    }
}

//clear Form
Display.prototype.clearForm = function(){
    let addBook = document.getElementById('addBook');
    addBook.reset();
}

// Add to local storage
Display.prototype.addToLocalStorage = function(newBook, bookList){
    let storage =  (localStorage.getItem('bookList'));
        if(storage !== null)
            bookList = JSON.parse(storage);
        else
            bookList = [];

        bookList.push(newBook);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        console.log(bookList)
}


// Display Added book to DOM
Display.prototype.showBook = function(bookList){
    let storage =  localStorage.getItem('bookList');
        if(storage !== null)
            bookList = JSON.parse(storage);
        else
            bookList = [];

        let listTable = document.getElementById('list');
        let list= "";
        bookList.forEach((i, index) => {
            list += `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${i.bookName}</td>
                        <td>${i.author}</td>
                        <td>${i.typeOFBook}</td>
                    </tr>`
        });
        listTable.innerHTML = list;
}

//Event Listener Funtion for Add
function insertBook(e){
    let loader = document.getElementById('loadingSpinner');
    
    loader.classList.remove('hideItem');
    loader.classList.add('showItem');

    setTimeout(() => {
        loader.classList.remove('showItem');
        loader.classList.add('hideItem');

        let bookName = document.getElementById('bookName').value;
        let author = document.getElementById('author').value;
        let scienceFiction = document.getElementById('scienceFiction');
        let programming = document.getElementById('programming');
        let novels = document.getElementById('novels');    
    
        let type = dispaly.validateType(scienceFiction, programming, novels);
    
        let newBook = new BookInfo(bookName, author, type);
        
        dispaly.addToLocalStorage(newBook, bookList);
        dispaly.clearForm();
        dispaly.showBook(bookList);
    }, 1000);
    
    e.preventDefault();
}

let bookList = [];
const dispaly = new Display();
dispaly.showBook(bookList);

let addBook = document.getElementById('addBook');

addBook.addEventListener('submit', insertBook);
