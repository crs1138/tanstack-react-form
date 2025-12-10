import { MyForm } from './components/MyForm'
import { HobbiesList } from './components/HobbiesList'
import { useMyForm } from './hooks/useMyForm'
import './App.css'

function App() {
  const { form } = useMyForm()
  return (
    <div>
      <h1>Reactive User Form</h1>
      <HobbiesList form={form} />
      <MyForm form={form} />
    </div>
  )
}

export default App
