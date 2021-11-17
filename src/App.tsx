import { Button } from "react-bootstrap"

const App = () => {
  return (
    <div className='App'>
      <Button variant='primary' onClick={() => console.log("click")}>
        Primary
      </Button>{" "}
    </div>
  )
}

export default App
