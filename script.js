document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.querySelector('.completed-button').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function AddTask() {
    let text = document.getElementById('new-task');
  
    if (text.value.trim() === '') {
        alert("Insira a tarefa");
    } else {
        addTaskToDOM(text.value);
        saveTasks();
        text.value = '';
    }
}

function addTaskToDOM(taskTextValue, isCompleted = false) {
    const new_li = document.createElement('li');
    new_li.className = 'task-item';

    const completedButton = document.createElement('input');
    completedButton.type = 'checkbox';
    completedButton.className = 'completed-button';
    completedButton.checked = isCompleted;

    const taskText = document.createElement('span');
    taskText.textContent = taskTextValue;
    taskText.className = 'task-text';

    if (isCompleted) {
        taskText.classList.add('completed');
    }

    completedButton.addEventListener('change', () => {
        if (completedButton.checked) {
            taskText.classList.add('completed');
        } else {
            taskText.classList.remove('completed');
        }
        saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', () => {
        new_li.remove();
        saveTasks();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'edit-button';

    editButton.addEventListener('click', () => {
        if (editButton.textContent === 'Editar') {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskText.textContent;
            input.className = 'edit-mode';

            new_li.replaceChild(input, taskText);
            editButton.textContent = 'Salvar';

            input.focus();

            input.addEventListener('blur', () => saveEdit());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit();
                }
            });

            function saveEdit() {
                taskText.textContent = input.value;
                new_li.replaceChild(taskText, input);
                editButton.textContent = 'Editar';
                saveTasks();
            }
        } else {
            saveEdit();
        }
    });

    new_li.appendChild(completedButton);
    new_li.appendChild(taskText);
    new_li.appendChild(editButton);
    new_li.appendChild(deleteButton);

    const container = document.getElementById('container');
    container.appendChild(new_li);
}
