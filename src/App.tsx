import { formOptions, useForm, type AnyFieldApi } from '@tanstack/react-form'
import * as z from 'zod'
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
  console.log({ field })
  return (
    <div>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  )
}

const userSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  hobbies: z.record(z.string(), z.boolean()),
})

const userSchemaAsync = z.object({
  firstName: z
    .string()
    .min(3)
    .refine(
      async (value) => {
        console.log('validating first name', value)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return !value.includes('error')
      },
      { message: 'Error is not allowed in first name' },
    ),
})

function App() {
  const formOpts = formOptions({
    defaultValues: defaultUser,
    validators: {
      onChange: userSchema,
    },
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
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: z.string().refine(
                async (value) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return !value.includes('error')
                },
                { message: 'Error is not allowed in first name' },
              ),
            }}
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
          />
        </div>
        <div>
          <form.Field
            name="lastName"
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
          <button type="submit" onClick={form.handleSubmit} disabled={form.state.canSubmit}>
            {form.state.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form.Subscribe>
      </form>
    </div>
  )
}

export default App
