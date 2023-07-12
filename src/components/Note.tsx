import { Dispatch, SetStateAction, useState } from 'react'
import UpdateNoteModal from './UpdateNoteModal copy'

interface Props {
  note: {
    id: number
    title: string
    description: string
    userId: number
  }
  setNotes: Dispatch<SetStateAction<Props['note'][]>>
}

function Note({ note, setNotes }: Props) {
  const [isShow, setIsShow] = useState(false)
  const deleteNote = () => {
    fetch(`http://192.168.2.86:3000/note/${note.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('user') ?? '').token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setNotes((prevState) =>
          prevState.filter((item) => item.id !== result.note.id)
        )
      })
  }
  return (
    <div className='border shadow-lg rounded-lg p-4'>
      <h2 className='text-xl font-bold'>{note.title}</h2>
      <p className='text-gray-600'>{note.description}</p>
      <button
        onClick={() => setIsShow(true)}
        className='py-1 px-4 text-xs rounded mt-2 font-bold text-white bg-teal-600'
      >
        Edit
      </button>
      <button
        onClick={deleteNote}
        className='py-1 px-4 text-xs rounded ml-2 font-bold text-white bg-red-600'
      >
        Delete
      </button>
      <UpdateNoteModal
        isShow={isShow}
        setIsShow={setIsShow}
        setNotes={setNotes}
        defaultValues={{
          id: note.id,
          title: note.title,
          description: note.description,
        }}
      />
    </div>
  )
}

export default Note
