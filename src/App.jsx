import bemmboLogo from './assets/bemmbo-logo.svg'

function App() {
  return (
    <>
     {/* Build your page here */}
      <div className="flex justify-center items-center h-screen w-screen bg-slate-50">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={bemmboLogo} alt="Bemmbo Logo" className="w-1/2 h-1/2" />
          <h1 className="text-3xl font-bold text-blue-600">Prueba técnica Bemmbo</h1>
        </div>
      </div>
    </>
  )
}

export default App
