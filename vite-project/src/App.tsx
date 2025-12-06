import { Board } from './components/Board';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)]">
        <Board />
      </div>
    </div>
  )
}

export default App
