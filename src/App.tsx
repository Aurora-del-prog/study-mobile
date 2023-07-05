import { useQuery } from '@apollo/client'
import { FIND } from './graphql/demo'
import './App.css'


const App = () => {
  const { loading, data } =  useQuery(FIND,{
    variables: {
      id: '6498a9c2-9529-405f-9fcc-0b191f75f82b'
    }
  })
  return (
    <div>
      <p>data: {JSON.stringify(data)}</p>
      <p>loading: {`${loading}`}</p>
    </div>
  )
}

export default App
