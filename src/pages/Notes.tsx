import { useEffect, useState } from 'react'
import Note from '../components/Note'
import CreateNoteModal from '../components/CreateNoteModal'

function Notes() {
  const [notes, setNotes] = useState<
    Array<{ id: number; title: string; description: string; userId: number }>
  >([])

  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    fetch('http://192.168.2.86:3000/note', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user') ?? '').token,
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw response.json()
        }
        return response.json()
      })
      .then((result) => {
        setNotes(result.notes)
      })
  }, [])

  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-4xl py-10'>Notes</h1>
        <div className='grid grid-cols-5 gap-4'>
          <div
            onClick={() => setIsShow(true)}
            className='bg-stone-100 grid place-items-center rounded-lg shadow-lg cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-10 h-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
          </div>
          {notes.map((note) => {
            return <Note key={note.id} setNotes={setNotes} note={note} />
          })}
        </div>
      </div>
      <CreateNoteModal
        setNotes={setNotes}
        isShow={isShow}
        setIsShow={setIsShow}
      />
    </>
  )
}

export default Notes
