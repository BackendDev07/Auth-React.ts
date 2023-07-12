import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

interface Props {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  setNotes: Dispatch<
    SetStateAction<
      { id: number; title: string; description: string; userId: number }[]
    >
  >
  defaultValues: {
    id: number
    title: string
    description: string
  }
}

function UpdateNoteModal({
  isShow,
  setIsShow,
  setNotes,
  defaultValues,
}: Props) {
  const [title, setTitle] = useState(defaultValues.title)
  const [description, setDescription] = useState(defaultValues.description)

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetch(`http://192.168.2.86:3000/note/${defaultValues.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('user') ?? '').token,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)

        setNotes((prevStates) =>
          prevStates.map((item) =>
            item.id === result.note.id ? result.note : item
          )
        )
        setIsShow(false)
      })
  }

  if (!isShow) {
    return null
  }
  return (
    <div className='w-full h-screen fixed top-0 left-0 bg-black/70 backdrop-blur-sm'>
      <div className='w-[400px] p-4 bg-white rounded-lg shadow-lg absolute left-1/2 top-32 -translate-x-1/2'>
        <h3>Update Note</h3>
        <button
          onClick={() => setIsShow(false)}
          className='absolute right-4 top-4'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        <form onSubmit={submitHandler} className='flex flex-col gap-4 mt-4'>
          <input
            className='border-2 p-2 rounded'
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Title'
            type='text'
            defaultValue={defaultValues.title}
          />
          <textarea
            className='border-2 p-2 rounded'
            onChange={(event) => setDescription(event.target.value)}
            placeholder='Description'
            defaultValue={defaultValues.description}
          />
          <div className='flex justify-end gap-4'>
            <button
              type='button'
              className='p-2 px-6 bg-red-500 font-bold text-white rounded-md '
            >
              Cancel
            </button>
            <button
              type='submit'
              className='p-2 px-6 bg-teal-500 font-bold text-white rounded-md '
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateNoteModal
