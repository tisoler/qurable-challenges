import AppContainer from "../container"
import Lobby from "./components/event/lobby"
import DialogProvider from "./context/dialogContext"
import GlobalProvider from "./context/globalContext"

const ExerciseFive = () => (
  <GlobalProvider>
    <DialogProvider>
      <AppContainer>
        <Lobby />
      </AppContainer>
    </DialogProvider>
  </GlobalProvider>
)

export default ExerciseFive
