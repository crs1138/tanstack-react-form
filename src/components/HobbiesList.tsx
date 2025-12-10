import type { MyForm } from '../hooks/useMyForm'

export function HobbiesList({ form }: { form: MyForm }) {
  return (
    <>
      {/* 
        This way the form re-renders when the hobbies change, as well as the selected hobbies list
        <div>
          <h2>Selected Hobbies</h2>
          <ul>
            {Object.entries(hobbies)
              .filter(([, value]) => value)
              .map(([hobby]) => {
                console.log('Selected hobby re-render')
                return <li key={hobby}>{hobby}</li>
              })}
          </ul>
        </div> */}

      <h2>Selected Hobbies</h2>
      <ul>
        {/* This way the selected hobbies list re-renders when the hobbies change, but the form does not */}
        <form.Subscribe
          selector={(state) => state.values.hobbies}
          children={(hobbies) => {
            console.log('Selected hobbies re-render')
            return (
              <>
                {Object.entries(hobbies)
                  .filter(([, value]) => value)
                  .map(([hobby]) => {
                    console.log('Selected hobby re-render')
                    return <li key={hobby}>{hobby}</li>
                  })}
              </>
            )
          }}
        />
      </ul>
    </>
  )
}
