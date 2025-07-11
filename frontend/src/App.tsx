import CalculatorLayout from "./Components/CalculatorLayout"
import { CalculatorProvider } from "./Context/CalculatorContext"
const App = () => {
  return (
    <div>
      <CalculatorProvider>
          <CalculatorLayout/>
      </CalculatorProvider>
    </div>
  )
}

export default App
