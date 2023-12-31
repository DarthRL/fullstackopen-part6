import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useMessageDispatch } from "./MessageContextProvider"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const messageDispatch = useMessageDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (axiosError) => {
      console.log(axiosError.response.data.error)
      messageDispatch({ type: 'CREATE', payload: `Error: ${axiosError.response.data.error}` })
      setTimeout(() => {
        messageDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    messageDispatch({ type: 'CREATE', payload: `you created ${content}` })
    setTimeout(() => {
      messageDispatch({ type: 'CLEAR' })
    }, 5000)
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
