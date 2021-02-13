import React, { useState } from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { TodoItem, Todo } from '../Todo'
import { TaskPreview } from '../TaskPreview'
import { StyledTodoList } from './style'
import { User } from '../Layout'

interface Props {
    todos: Todo[]
    toggleDone: (todo: Todo) => void
    deleteTodo: (todo: Todo) => void
    user: User
}

const TodoList = SortableContainer(({ todos, toggleDone, deleteTodo, user }: Props) => {
    const [selectedTask, setSelectedTask] = useState<Todo | undefined>(undefined)

    return (
        <StyledTodoList>
            {todos.map((todo, index) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleDone={toggleDone}
                    deleteTodo={deleteTodo}
                    index={index}
                    onSelect={todo => setSelectedTask(todo)}
                />
            ))}

            {selectedTask?.id && (
                <TaskPreview
                    done={selectedTask.done}
                    task={selectedTask.task}
                    useruid={selectedTask.useruid}
                    id={selectedTask.id}
                    createdAt={selectedTask.createdAt}
                    onClose={() => setSelectedTask(undefined)}
                    user={user}
                    note={selectedTask.note}
                />
            )}
        </StyledTodoList>
    )
})

export { TodoList }
