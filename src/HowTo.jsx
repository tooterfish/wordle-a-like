
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
      {isOpen ?
      <>
      <RowHowTo word={['A','','','','']} type={'match'}/>
      <RowHowTo word={['','','B','','']} type={'partial-match'}/>
      <RowHowTo word={['','','','','C']} type={'no-match'}/>
      </>
      : <></>}
      
    </dialog>
  )
}