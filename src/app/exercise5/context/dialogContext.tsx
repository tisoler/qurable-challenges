'use client'

import { ReactNode, createContext, useContext, useState } from "react"
import ConfirmationDialog from "../components/confirmationDialog"

const DialogContext = createContext({
  openDialog: (title: string, text: string, handleConfirm: () => void, handleCancel: () => void,) => {},
  closeDialog: () => {}
})

export const useDialogContext = () => useContext(DialogContext)

interface ConfirmationDialogProps {
  open: boolean,
  handleConfirm: () => void,
  handleCancel: () => void,
  title: string,
  text: string,
}

const INITIAL_DIALOG_PROPS = {
  open: false,
  handleConfirm: () => {},
  handleCancel: () => {},
  title: '',
  text: '',
}

export default function DialogProvider({children}: {children: ReactNode}) {
  const [dialogProps, setDialogProps] = useState<ConfirmationDialogProps>(INITIAL_DIALOG_PROPS)

  const openDialog = (title: string, text: string, handleConfirm: () => void, handleCancel: () => void,) => {
    setDialogProps({
      open: true,
      title,
      text,
      handleConfirm,
      handleCancel,
    })
  }

  const closeDialog = () => {
    setDialogProps({
      ...dialogProps,
      open: false,
    })
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <ConfirmationDialog
        open={dialogProps.open}
        title={dialogProps.title}
        text={dialogProps.text}
        handleConfirm={dialogProps.handleConfirm}
        handleCancel={dialogProps.handleCancel}
      />
    </DialogContext.Provider>
  )
}
