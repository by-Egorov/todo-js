const inputText = document.querySelector('.footer__input')
const addBtn = document.querySelector('.footer__button')
const todoList = document.querySelector('.content__list-body')
const deleteBtn = document.querySelector('.footer__remove')

let todos = localStorage.getItem('todos')
	? JSON.parse(localStorage.getItem('todos'))
	: []
const renderTodo = () => {
	todoList.innerHTML = ''

	if (todos.length <= 0) {
		const span = document.createElement('span')
		span.textContent = 'Список дел пуст'
		todoList.appendChild(span)
		deleteBtn.classList.add('disabled')
	}
	todos.forEach(todo => {
		const item = document.createElement('li')
		const iconDel = document.createElement('div')
		const icon = document.createElement('img')
		icon.src = './image/dellItem.svg'
		icon.alt = 'delete icon'
		item.className = 'item'
		icon.className = 'item-del'
		item.textContent = todo.title
		iconDel.appendChild(icon)
		item.appendChild(iconDel)
		todoList.appendChild(item)
	})
}

renderTodo()

const createTodo = () => {
	if(inputText.value !== '') {
		const newTodo = {
			id: new Date(),
			title: inputText.value,
		}
		todos.push(newTodo)
		localStorage.setItem('todos', JSON.stringify(todos))
	
		renderTodo()
		inputText.value = ''
	}
}
const removeAllTodo = () => {
	localStorage.removeItem('todos')

	renderTodo()
	window.location.reload()
}
const removeTodo = e => {
	// Выбор элемента внутри общего родителя
	const targetItem = e.target
	try {
		// если элемент содержит класс item-del
		if (targetItem.classList.contains('item-del')) {
			// тут определяем конкретный item у которого был элемент с классом item-del
			const listItem = targetItem.closest('.item')
			// получаем индекс этого элемента
			const index = Array.from(listItem.parentNode.children).indexOf(listItem)
			// удаляем из массива
			todos.splice(index, 1)
			// обновляем локальное хранилище
			localStorage.setItem('todos', JSON.stringify(todos))
			// перерисовываем список дел
			renderTodo()
		}
	} catch (error) {
		console.warn(error)
	}
}
addBtn.addEventListener('click', createTodo)
deleteBtn.addEventListener('click', removeAllTodo)

todoList.addEventListener('click', removeTodo)
