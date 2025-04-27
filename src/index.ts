// Set html elements
const taskInput = document.getElementById('new-task') as HTMLInputElement
const addTaskButton = document.getElementById('add-task') as HTMLButtonElement
const toDoList = document.getElementById('to-do-list') as HTMLUListElement
const doneList = document.getElementById('done-list') as HTMLUListElement

const doneContainer = document.getElementById('done-container') as HTMLDivElement

type Task = {
  id: number
  text: string
  completed: boolean
}

addTaskButton.addEventListener('click', () => {
  // Create a new task object with the current timestamp as the id
  let task: Task = {
    id: toDoList.children.length + 1, // Generate a unique ID based on the number of tasks
    text: taskInput.value.trim(),
    completed: false
  }

  if (!task.text) return // If the input is empty, do nothing

  const taskItem = document.createElement('li')

  const taskTextSpan = document.createElement('span')
  taskTextSpan.innerText = task.text
  taskTextSpan.style.marginLeft = '10px' // Add marginLeft instead

  const completeTaskButton = document.createElement('button')
  completeTaskButton.innerText = 'Complete'
  completeTaskButton.classList.add('complete-task-btn')

  // Append button first, then the text span
  taskItem.appendChild(completeTaskButton) // Append the complete button to the task item
  taskItem.appendChild(taskTextSpan) // Append the task text AFTER the button

  toDoList.appendChild(taskItem) // Append the task item to the task list
  taskInput.value = '' // Clear the input field

  completeTaskButton.addEventListener('click', () => {
    task.completed = true

    taskItem.removeChild(completeTaskButton) // Remove the complete button from the task item

    // Check if the done list was previously empty *before* adding the new item
    const wasDoneListEmpty = doneList.children.length === 0

    doneList.appendChild(taskItem)

    // If the done list was empty before adding this item, show the container
    if (wasDoneListEmpty) {
      doneContainer.style.display = 'block' // Or 'flex', 'grid', etc., depending on your layout needs
    }
  })
})

