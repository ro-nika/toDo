const $title = document.querySelector('.titleInput')
const $description = document.querySelector('.descriptionInput')
const $addBtn = document.querySelector('.addBtn')
const $container = document.querySelector('.todos')
const $categorySelect = document.querySelector('.categorySelect')
const $categoryFilterSelect = document.querySelector('.categoryFilterSelect')




// Load todos from local storage
window.addEventListener('load', () => {
  const todos = getTodos()

  todos.reverse().forEach(todo => {
    $container.insertAdjacentHTML('beforeend', cardTemplate(todo))
  })
})

$addBtn.addEventListener('click', () => {
  if (isValidated($title) && isValidated($categorySelect) && isValidated($description)) {
    createTodo({
      title: $title.value,
      description: $description.value,
      category: $categorySelect.value
    })
  }
})

function categoryTemplate(category) {
  const {
    id,
    title
  } = category

  return `
    <option value="${id}">
      ${title}
    </option>
  `
}

// Load categories from LS
window.addEventListener('load', () => {
  const categories = getCategories()

  categories.forEach(category => {
    $categorySelect.insertAdjacentHTML('beforeend', categoryTemplate(category))
    $categoryFilterSelect.insertAdjacentHTML('beforeend', categoryTemplate(category))
  })
})


function cardTemplate(todo) {
  const {
    title,
    description,
    id,
    completed,
    createdAt,
    editedAt,
    category
  } = todo

  const categories = getCategories()

  const findCategory = categories.find(ctg => ctg.id === +category)

  const isLongText = description.length > 350

  return `
    <div class="todoCard ${completed ? 'completed' : ''}">
      <h2>${title}</h2>

      ${findCategory ? `<div class="categoryChange"><p>Категория: <strong>${findCategory.title}</strong></p> 
          <button onclick="openCategoryCrudModal(${category})"><img src = "./img/2.png"></button>
        </div>` : ''
    }

      <div class="content">
        <div class="${isLongText ? 'shorten' : 'descriptionContainer'}">
          <p>${description}</p>
        </div>
      </div>

      <div class="todo_bottom">
        <p class="dates">
        <span>${createdAt}</span> <br>
        ${editedAt ? `<span>Edited at: ${editedAt}</span>` : ''
    }
        </p>
        

          <div>
            <button onclick="completeTodo(${id})"><img src="./img/6.png"></button>
            <button onclick="deleteTodo(${id})"><img src="./img/4.png"></button>
            <button onclick="editTodo(${id})"><img src="./img/5.png"></button>
          </div>
      </div>
    </div>
  `
}

function createTodo({ title, description, category }) {
  const currentTodos = getTodos()

  const todo = {
    id: generateId(),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: currentDate(),
    editedAt: null,
    category,
  }

  setTodos([...currentTodos, todo])

  $container.insertAdjacentHTML('afterbegin', cardTemplate(todo))

  resetFields()
}


function deleteTodo(id) {
  const confirmDelete = confirm('Are you sure?')

  if (!confirmDelete) return

  const updatedTodos = getTodos().filter(todo => todo.id !== id)

  setTodos(updatedTodos)

  reloadPage()
}

function completeTodo(id) {
  const updatedTodos = getTodos().map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed

    }

    return todo
  })

  setTodos(updatedTodos)

  reloadPage()
}

function editTodo(id) {
  const updatedTodos = getTodos().map(todo => {
    if (todo.id === id) {
      todo.title = prompt('Title', todo.title) || todo.title
      todo.description = prompt('Description', todo.description) || todo.description
      todo.category = editCtg() || todo.category(id)
      todo.editedAt = currentDate()
    }

    return todo
  })

  setTodos(updatedTodos)

  reloadPage()
}

// Filter by categories

$categoryFilterSelect.addEventListener('change', e => {
  const categoryId = e.target.value
  const todos = getTodos()
  $container.innerHTML = ''

  if (!categoryId) {
    todos.reverse().forEach(todo => {
      $container.insertAdjacentHTML('beforeend', cardTemplate(todo))
    })
    

    return
  }
  const filteredTodosByCategory = todos.filter(todo => todo.category === categoryId)


  filteredTodosByCategory.reverse().forEach(todo => {
    $container.insertAdjacentHTML('beforeend', cardTemplate(todo))
  })
  
})

// Utilities

function isValidated(element) {
  if (!element.value) {
    element.classList.add('error')

    element.focus()

    return false
  }

  element.classList.remove('error')
  return true
}

function resetFields() {
  $title.value = ''
  $description.value = ''
  $categorySelect.value = ''
}


// Current date function

function currentDate() {
  return new Date().toLocaleString()
}


// Id Generator
function generateId() {
  const todos = getTodos()
  const maxID = todos.reduce((acc, todo) => todo.id > acc ? todo.id : acc, 0)

  return maxID + 1
}

// Get todos function

function getTodos() {
  return JSON.parse(localStorage.getItem('todos')) || []
}

// Set todo function

function setTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}


// Reload page function

function reloadPage() {
  window.location.reload()
}



// Get categories from LS

function getCategories() {
  return JSON.parse(localStorage.getItem('categories')) || []
}

function setCategories(categories) {
  localStorage.setItem('categories', JSON.stringify(categories))
}

