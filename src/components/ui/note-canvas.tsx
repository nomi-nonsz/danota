'use client'

export const NoteCanvas = () => {
  return (
    <div className="w-[960px] h-screen bg-white p-8 mx-auto border rounded-2xl">
      <textarea className="block w-full h-full p-2" placeholder="Type your note..."></textarea>
    </div>
  )
}