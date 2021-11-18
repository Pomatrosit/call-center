import { Button } from "react-bootstrap"
import { useAppSelector } from "./hooks/useAppSelector"

const App = () => {
  const { firstName, lastName } = useAppSelector((state) => state.user)

  return (
    <div className='App'>
      {firstName + " " + lastName}
      <Button variant='primary' onClick={() => console.log("click")}>
        Primary
      </Button>{" "}
    </div>
  )
}

export default App
