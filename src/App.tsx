import { formOptions, useForm } from '@tanstack/react-form'
import './App.css'

interface User {
  firstName: string
  lastName: string
  email: string
  hobbies: string[]
}

const defaultUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  hobbies: [],
}

function App() {
  const formOpts = formOptions({
    defaultValues: defaultUser,
  })
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      alert(value.hobbies.join(', '))
      console.log(value)
    },
  })

  return (
    <div>
      <form>
        <h1>User Form</h1>
        <div>
          <form.Field
            name="firstName"
            children={(field) => (
              <>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="lastName"
            children={(field) => (
              <>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="email"
            children={(field) => (
              <>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="hobbies"
            children={(field) => (
              <>
                <fieldset>
                  <legend>Hobbies</legend>
                  <input
                    id="reading"
                    name="hobbies"
                    type="checkbox"
                    value="reading"
                    onChange={(e) => field.handleChange([...field.state.value, e.target.value])}
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor="reading">Reading</label>
                  <input
                    id="writing"
                    name="hobbies"
                    type="checkbox"
                    value="writing"
                    onChange={(e) => field.handleChange([...field.state.value, e.target.value])}
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor="writing">Writing</label>
                  <input
                    id="coding"
                    name="hobbies"
                    type="checkbox"
                    value="coding"
                    onChange={(e) => field.handleChange([...field.state.value, e.target.value])}
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor="coding">Coding</label>
                  <input
                    id="other"
                    name="hobbies"
                    type="checkbox"
                    value="other"
                    onChange={(e) => field.handleChange([...field.state.value, e.target.value])}
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor="other">Other</label>
                </fieldset>
              </>
            )}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            form.handleSubmit()
          }}
        >
          {form.state.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default App
