/* Shorter element selection function */

function getElem (el) {
  return document.querySelector(el)
}

/*
=== === === === ===
=== Create todo ===
=== === === === ===
*/

function createTodo (val) {
  const elem = document.createElement('li')
  const content = document.createElement('span')
  const actionButtons = createActionButtons()
  elem.classList.add('list-item')
  content.classList.add('list-item-content')
  content.innerHTML = val
  elem.appendChild(content)
  elem.appendChild(actionButtons)
  return elem
}

function createActionButtons () {
  const container = document.createElement('div')
  const edit = document.createElement('i')
  const remove = document.createElement('i')
  edit.classList.add('fas', 'fa-edit', 'a-btn', 'edit-btn')
  edit.setAttribute('title', 'Edit To-Do')
  remove.classList.add('fas', 'fa-times', 'a-btn', 'remove-btn')
  remove.setAttribute('title', 'Remove To-Do')
  container.appendChild(edit)
  container.appendChild(remove)
  return container
}

function addTodo () {
  const el = getElem('#list')
  const input = getElem('.add-list-input')
  const todo = createTodo(input.value)
  todo.setAttribute('data-edit', false)
  el.appendChild(todo)
}

/*
=== === === === ===
===- Edit todo -===
=== === === === === */

function createEditInput (todo) {
  const content = todo.querySelector('.list-item-content').innerHTML
  const input = document.createElement('input')
  input.classList.add('edit-field')
  input.value = content
  return input
}

function editTodo (todo) {
  const content = todo.querySelector('.list-item-content')
  const input = createEditInput(todo)
  const icon = getElem('.edit-btn')
  icon.classList.remove('fa-edit')
  icon.classList.add('fa-save')
  icon.title = 'Save edit'
  input.classList.add('edit-field')
  todo.removeChild(content)
  todo.insertBefore(input, todo.firstChild)
  input.focus()
}

function saveEdit (todo) {
  const newContent = todo.firstChild.value
  const content = document.createElement('span')
  const icon = getElem('.edit-btn')
  icon.classList.remove('fa-save')
  icon.classList.add('fa-edit')
  icon.title = 'Edit To-Do'
  content.classList.add('list-item-content')
  content.innerHTML = newContent
  todo.removeChild(todo.firstChild)
  todo.insertBefore(content, todo.firstChild)
}

function removeTodo (todo) {
  getElem('#list').removeChild(todo)
}

/* Event listeners */

getElem('.add-list-item').addEventListener('submit', function (ev) {
  ev.preventDefault()
  addTodo()
  getElem('input').value = ''
})

getElem('#list').addEventListener('click', function (ev) {
  const target = ev.target
  const parent = target.parentNode.parentNode
  if (
    target.classList.contains('edit-btn') &&
    parent.getAttribute('data-edit') === 'false'
  ) {
    console.log('Editing')
    editTodo(parent)
    parent.setAttribute('data-edit', 'true')
  } else if (
    target.classList.contains('edit-btn') &&
    parent.getAttribute('data-edit') === 'true'
  ) {
    console.log('Saving')
    saveEdit(parent)
    parent.setAttribute('data-edit', 'false')
  }

  if (target.classList.contains('remove-btn')) {
    console.log('remove')
    removeTodo(parent)
  }
})
