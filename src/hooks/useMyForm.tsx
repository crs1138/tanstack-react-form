import {
  formOptions,
  useForm,
  // useStore
} from '@tanstack/react-form'
import * as z from 'zod'

export interface User {
  firstName: string
  lastName: string
  email: string
  hobbies: Record<string, boolean>
}

export type MyForm = ReturnType<typeof useMyForm>['form']

export const useMyForm = () => {
  const defaultUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    hobbies: {},
  }

  const userSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    hobbies: z.record(z.string(), z.boolean()),
  })
  const formOpts = formOptions({
    defaultValues: defaultUser,
    validators: {
      onChange: userSchema,
    },
  })

  // Note, that useStore will cause a whole component re-render whenever the value subscribed to changes.
  // const hobbies = useStore(form.store, (state) => state.values.hobbies)

  const form = useForm({
    ...formOpts,
    onSubmit: ({ formApi, meta, value }) => {
      console.log({ formApi, meta, value })
    },
  })

  return { form }
}
