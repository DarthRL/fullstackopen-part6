import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useMessageDispatch } from './components/MessageContextProvider'

const App = () => {
  const queryClient = useQueryClient()
  const messageDispatch = useMessageDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const newAnecdotes = anecdotes.map(a => a.id !== newAnecdote.id ? a : newAnecdote)
      queryClient.setQueryData('anecdotes', newAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(newAnecdote)
    messageDispatch({type:'CREATE', payload:`you voted for ${anecdote.content}`})
    setTimeout(() => {
      messageDispatch({type:'CLEAR'})
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes,
    {
      retry: 1
    }
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>{result.error.message}</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
