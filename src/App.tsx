import PinkPartices from "./componensts/pinkPartices"
import QuizCard from "./componensts/quizCard"

function App() {
  return (
    <div className="h-screen w-full flex flex-col items-center bg-pink-50 gap-5 justify-center">
      <PinkPartices />
      <p className="text-4xl font-bold text-pink-600">Valentine's Day Quiz</p>
      <p className="text-lg text-pink-800 font-medium">Find Your Perfect Match This Valentines!</p>
      <QuizCard />
    </div>
  )
}
export default App
