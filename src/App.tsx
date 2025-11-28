import { formOptions, useForm, type AnyFieldApi } from '@tanstack/react-form'
import './App.css'

interface User {
  firstName: string
  lastName: string
  email: string
  hobbies: Record<string, boolean>
}

const defaultUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  hobbies: {},
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div>
      {field.state.meta.isTouched && !field.state.meta.isValid ? <em>{field.state.meta.errors.join(',')}</em> : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  )
}

function App() {
  const formOpts = formOptions({
    defaultValues: defaultUser,
  })
  const form = useForm({
    ...formOpts,
    onSubmit: ({ formApi, meta, value }) => {
      console.log({ formApi, meta, value })
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <h1>User Form</h1>
        <div>
          <form.Field
            name="firstName"
            children={(field) => (
              <>
                <label htmlFor="firstName">
                  First Name <span className="required">*</span>
                </label>
                <input
                  id="firstName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldInfo field={field} />
              </>
            )}
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'First name is required'
                  : value.length < 3
                    ? 'First name must be at least 3 characters long'
                    : undefined,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return value.includes('error') && 'No "error" allowed in first name'
              },
            }}
          />
        </div>
        <div>
          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) => {
                if (!value) {
                  return 'Last name is required'
                }
                return value.length < 3 ? 'Last name must be at least 3 characters long' : undefined
              },
            }}
            children={(field) => (
              <>
                <label htmlFor="lastName">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  id="lastName"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Email is required' : !value.includes('@') ? 'Email must contain @' : undefined,
            }}
            children={(field) => (
              <>
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  id="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldInfo field={field} />
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
                    onChange={(e) =>
                      field.handleChange((prev) =>
                        e.target.checked ? { ...prev, reading: true } : { ...prev, reading: false },
                      )
                    }
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor="reading">Reading</label>
                  <input
                    id="writing"
                    name="hobbies"
                    type="checkbox"
                    value="writing"
                    onChange={(e) =>
                      field.handleChange((prev) =>
                        e.target.checked ? { ...prev, writing: true } : { ...prev, writing: false },
                      )
                    }
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor="writing">Writing</label>
                  <input
                    id="coding"
                    name="hobbies"
                    type="checkbox"
                    value="coding"
                    onChange={(e) =>
                      field.handleChange((prev) =>
                        e.target.checked ? { ...prev, coding: true } : { ...prev, coding: false },
                      )
                    }
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor="coding">Coding</label>
                  <input
                    id="other"
                    name="hobbies"
                    type="checkbox"
                    value="other"
                    onChange={(e) =>
                      field.handleChange((prev) =>
                        e.target.checked ? { ...prev, other: true } : { ...prev, other: false },
                      )
                    }
                    onBlur={field.handleBlur}
                  />
                  <label htmlFor="other">Other</label>
                </fieldset>
              </>
            )}
          />
        </div>
        <form.Subscribe>
          <button type="submit" onClick={form.handleSubmit}>
            {form.state.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form.Subscribe>
      </form>
    </div>
  )
}

export default App
