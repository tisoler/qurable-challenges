import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmationDialogProps {
  open: boolean,
  handleConfirm: () => void,
  handleCancel: () => void,
  title: string,
  text: string,
}

const ConfirmationDialog = ({ open, handleConfirm, handleCancel, title, text }: ConfirmationDialogProps) => (
  <div>
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>No</Button>
        <Button onClick={handleConfirm} autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  </div>
)

export default ConfirmationDialog
