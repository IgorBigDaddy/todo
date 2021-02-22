let taskTodo = document.querySelector('.message'),
  addTask = document.querySelector('.add'),
  priority = document.querySelector('.priority'),
  todo = document.querySelector('.todo'),
  buttonRadio = document.querySelector('#radiofilter');

let todoList = []; //LocalStorage для востановления данных
if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayTasks();
}
function add() {
  let error1 = document.querySelector('.p1');
  let error2 = document.querySelector('.p2');
  let error3 = document.querySelector('.p3');

  if (priority.value === '1' || priority.value === '2' || priority.value === '3') {
    error3.style.display = 'none';
    if (priority.value === '' && taskTodo.value === '') {
      error1.style.display = 'block';
      error2.style.display = 'block';
    } else if (priority.value === '') {
      error1.style.display = 'none';
      error2.style.display = 'block';
    } else if (taskTodo.value === '') {
      error1.style.display = 'block';
      error2.style.display = 'none';
    } else {
      error1.style.display = 'none'; //Создает массив из обьектов
      error2.style.display = 'none';
      let newTODO = {
        todo: taskTodo.value,
        checked: false,
        priority: priority.value,
      };
      todoList.push(newTODO);
      console.log(todoList);
      let comment = document.querySelector('.comment');
      comment.style.display = 'block';
      setTimeout(() => {
        comment.style.display = 'none';
      }, 5000);
      displayTasks();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  } else {
    error3.style.display = 'block';
  }
}
taskTodo.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    add();
  }
});
priority.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    add();
  }
});

addTask.addEventListener('click', function () {
  // Если поля не заполнены

  add();
});

function displayTasks() {
  //Создает элементы списка
  let displayTask = '';
  if (todoList.length === 0) {
    todo.innerHTML = '';
    localStorage.removeItem('todo');
  }
  todoList.forEach(function (item, i) {
    displayTask += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}'  class="${
      item.priority == 1 ? 'priority1' : item.priority == 2 ? 'priority2' : ''
    }">${item.todo}</label>
            
        </li>
        `;
    todo.innerHTML = displayTask;
  });
}

todo.addEventListener('change', (e) => {
  let valueLabel = todo.querySelector('[for=' + e.target.getAttribute('id') + ']').innerHTML; //Сохраняет положение галочки
  console.log(valueLabel);
  todoList.forEach((item) => {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});

todo.addEventListener('contextmenu', (e) => {
  //Удаление задания Правой кнопкой мыши!!!
  e.preventDefault();
  todoList.forEach(function (item, i) {
    if (item.todo === e.target.innerHTML) {
      todoList.splice(i, 1);
      displayTasks();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});

let radios = document.querySelectorAll('input[type="radio"]'); //Фильтр с помоцью радио
buttonRadio.addEventListener('click', () => {
  let ListOfPrior1 = [];
  let ListOfPrior2 = [];
  let ListOfPrior3 = [];
  todoList.forEach((item) => {
    if (item.priority == 1) {
      let NewList = item;
      ListOfPrior1.push(NewList);
    }
    if (item.priority == 2) {
      let NewList = item;
      ListOfPrior2.push(NewList);
    }
    if (item.priority == 3) {
      let NewList = item;
      ListOfPrior3.push(NewList);
    }
  });

  for (let radio of radios) {
    if (radio.checked) {
      let displayPriority = '';
      function displayPrior(arr) {
        arr.forEach(function (item, i) {
          displayPriority += `
                    <li>
                        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                        <label for='item_${i}' class="${
            item.priority == 1 ? 'priority1' : item.priority == 2 ? 'priority2' : ''
          }">${item.todo}</label>
                    </li>
                    `;
          todo.innerHTML = displayPriority;
        });
      }
      if (radio.value === 'prior1') {
        if (ListOfPrior1.length === 0) {
          todo.innerHTML = '';
        } else {
          displayPrior(ListOfPrior1);
        }
      }
      if (radio.value === 'prior2') {
        if (ListOfPrior2.length === 0) {
          todo.innerHTML = '';
        } else {
          displayPrior(ListOfPrior2);
        }
      }
      if (radio.value === 'prior3') {
        if (ListOfPrior3.length === 0) {
          todo.innerHTML = '';
        } else {
          displayPrior(ListOfPrior3);
        }
      }
      if (radio.value === 'all') {
        displayTasks();
      }
    }
  }
});

//подвязать энтер
//hovers
