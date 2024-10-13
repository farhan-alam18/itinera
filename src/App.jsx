import HeroSection from "./components/HeroSection"
import NavBar from "./components/NavBar"
import Planner from "./components/Planner"

const App = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <div className="border mx-14 -my-5"></div>
      <Planner />
    </div>
  )
}

export default App