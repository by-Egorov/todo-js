const inputText = document.querySelector('.header__input')
const addBtn = document.querySelector('.header__button')
const todoList = document.querySelector('.content__list')
const deleteBtn = document.querySelector('.header__remove')

let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
const renderTodo = () =>  {
	todoList.innerHTML = ''

	if(todos.length <= 0) {
		const span = document.createElement('span')
		span.textContent = 'Список дел пуст'
		todoList.appendChild(span)
	}
	todos.forEach(todo => {
		const item = document.createElement('li')
		const iconDel = document.createElement('div')
		const icon = document.createElement('img')
		icon.src = './image/delete.png'
		icon.alt = 'delete icon'
		item.className = 'item'
		iconDel.className = 'item-del'
		item.textContent = todo.title
		iconDel.appendChild(icon)
		item.appendChild(iconDel)
		todoList.appendChild(item)
	})
}
const createTodo = () => {
	const newTodo = {
		id: new Date(),
		title: inputText.value,
	}
	todos.push(newTodo)
	localStorage.setItem('todos', JSON.stringify(todos))

	renderTodo()
	inputText.value = ''
}
const removeAllTodo = () => {
	localStorage.removeItem('todos')

	renderTodo()
	window.location.reload()
}
const removeTodo = () => {
	const currentTodo = todos.filter(todo => todo.id === id)
	console.log(currentTodo)
}

addBtn.addEventListener('click', createTodo)
deleteBtn.addEventListener('click', removeAllTodo)

renderTodo()