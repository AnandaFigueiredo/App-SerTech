
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6fa]">


      {/* Top Bar - Exatamente como o design */}
      <div className="relative bg-[#6EB56B] flex items-center h-20 px-4 rounded-2xl">
        {/* Logo à esquerda */}
        <div className="flex items-center h-full">
          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shadow overflow-hidden">
            {/* Troque o src abaixo pela sua logo .webp */}
            <img src="/public/LogoBar.svg" alt="Logo da empresa" className="w-9 h-9 object-contain" />
          </div>
        </div>
        {/* Sino mais perto do perfil */}
        <div className="absolute right-18 top-1/2 -translate-y-1/2 flex items-center">
          <div className="relative">
            <span className="material-icons text-white text-3xl">notifications</span>
            <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs text-black rounded-full px-1">1</span>
          </div>
        </div>
        {/* Avatar à direita */}
        <div className="ml-auto flex items-center h-full">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
            <span className="material-icons text-agroGreen text-2xl">person</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 px-4 py-2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mt-2">Painel</h1>
        {/* Painel de temperatura */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-xl p-4 flex items-center gap-4 shadow">
          <span className="material-icons text-white text-3xl">wb_sunny</span>
          <div className="flex flex-col">
            <span className="text-2xl text-white font-bold leading-none">35°</span>
            <span className="text-white font-medium">Risco de estresse térmico <span className="material-icons align-middle text-white text-base ml-1">error_outline</span></span>
          </div>
        </div>

        {/* Avisos */}
        <div>
          <h2 className="text-lg font-bold mb-2">Avisos</h2>
          <div className="flex gap-3">
            <div className="flex-1 bg-yellow-100 rounded-lg p-3 flex flex-col items-center shadow">
              <span className="material-icons text-yellow-500 text-2xl mb-1">warning</span>
              <span className="font-bold text-yellow-800">2 alertas</span>
              <span className="text-xs text-yellow-800">Toque para visualizar</span>
            </div>
            <div className="flex-1 bg-red-100 rounded-lg p-3 flex flex-col items-center shadow">
              <span className="material-icons text-red-500 text-2xl mb-1">error</span>
              <span className="font-bold text-red-800">2 urgência</span>
              <span className="text-xs text-red-800">Toque para visualizar</span>
            </div>
          </div>
        </div>

        {/* Funcionalidades */}
        <div>
          <h2 className="text-lg font-bold mb-2">Funcionalidades</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#6EB56B] rounded-lg flex flex-col items-center justify-center p-6 text-white font-bold text-lg gap-2 shadow">
              <span className="material-icons text-3xl">agriculture</span>
              Vacas
            </button>
            <button className="bg-[#6EB56B] rounded-lg flex flex-col items-center justify-center p-6 text-white font-bold text-lg gap-2 shadow">
              <span className="material-icons text-3xl">description</span>
              Relatórios
            </button>
            <button className="bg-[#6EB56B] rounded-lg flex flex-col items-center justify-center p-6 text-white font-bold text-lg gap-2 shadow">
              <span className="material-icons text-3xl">add</span>
              Novo animal
            </button>
            <button className="bg-[#6EB56B] rounded-lg flex flex-col items-center justify-center p-6 text-white font-bold text-lg gap-2 shadow">
              <span className="material-icons text-3xl">bar_chart</span>
              Dados da semana
            </button>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <nav className="bg-agroGreen px-4 py-2 flex justify-between items-center text-white text-xs">
        <div className="flex flex-col items-center flex-1">
          <span className="material-icons">home</span>
          Home
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="material-icons">menu</span>
          Menu
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="material-icons">settings</span>
          Suporte
        </div>
      </nav>
    </div>
  );
}
