export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  )
}
