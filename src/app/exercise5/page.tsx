import Lobby from "./components/lobby"
import DialogProvider from "./context/dialogContext"

interface ExerciseTwoProps {
  onGoBack: () => void
}

const ExerciseFive = ({ onGoBack }: ExerciseTwoProps) => (
  <DialogProvider>
    <Lobby onGoBack={onGoBack} />
  </DialogProvider>
)

export default ExerciseFive
