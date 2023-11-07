
import './Modal.css'
import './HowTo.css'

import { useRef, useState, useEffect } from 'react'
import RowHowTo from './RowHowTo'

export default function HowTo({isOpen, setOpen, onClose, children}) {
  const modalRef = useRef(null)

  useEffect(() => {
    const modalElement = modalRef.current
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal()
      } else {
        modalElement.close()
      }
    }
  }, [isOpen])

  const handleCloseModal = () => {
    if (onClose) {
      onClose()
    }

    const modalElement = modalRef.current
    const closeAnim = () => {
      modalElement.removeEventListener('webkitAnimationEnd', closeAnim)
      modalElement.classList.remove('howto-close')
      setOpen(false)
    }
    modalElement.classList.add('howto-close')
    modalElement.addEventListener('webkitAnimationEnd', closeAnim)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault() //default esc behavior skips closing transition animation
      handleCloseModal()
    }
  }

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className={`modal howto-open`}>
       <button className='modal-close-btn' onClick={handleCloseModal}>
        Close
      </button>
      <div className={'howto'}>
      {isOpen ?
      <>
      <h2>How to play</h2>
      <p>Guess the word in 6 tries.</p>
      <ul>
        <li>Each guess must be a valid word.</li>
        <li>The color of the tiles will change to show how close your guess was to the word.</li>
      </ul>
      <RowHowTo word={['A','L','E','R','T']} type={'match'} position={0}/>
      <p>A is in the word and in the correct spot.</p>
      <RowHowTo word={['I','M','P','L','Y']} type={'partial-match'} position={1}/>
      <p>M is in the word but in the incorrect spot.</p>
      <RowHowTo word={['S','M','I','L','E']} type={'no-match'} position={3}/>
      <p>I is not in the word</p>
      </>
      : <></>}
      </div>
    </dialog>
  )
}