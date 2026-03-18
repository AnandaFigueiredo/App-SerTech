export default function Home({
  onViewAlerts,
  onViewUrgent,
  onViewCows,
  onViewRegister,
  onViewWeekly,
  onViewReports,
}) {
  return (
    <>
      <h1 className="text-2xl font-bold mt-2">Painel</h1>
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-xl p-4 flex items-center gap-4 shadow">
        <span className="material-icons text-white text-3xl">wb_sunny</span>
        <div className="flex flex-col">
          <span className="text-2xl text-white font-bold leading-none">35°</span>
          <span className="text-white font-medium">
            Risco de estresse térmico
            <span className="material-icons align-middle text-white text-base ml-1">
              error_outline
            </span>
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Avisos</h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onViewAlerts}
            className="flex-1 bg-yellow-100 rounded-lg p-3 flex flex-col items-center shadow"
          >
            <span className="material-icons text-yellow-500 text-2xl mb-1">
              warning
            </span>
            <span className="font-bold text-yellow-800">2 alertas</span>
            <span className="text-xs text-yellow-800">Toque para visualizar</span>
          </button>
          <button
            type="button"
            onClick={onViewUrgent}
            className="flex-1 bg-red-100 rounded-lg p-3 flex flex-col items-center shadow"
          >
            <span className="material-icons text-red-500 text-2xl mb-1">error</span>
            <span className="font-bold text-red-800">2 urgências</span>
            <span className="text-xs text-red-800">Toque para visualizar</span>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Funcionalidades</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onViewCows}
            className="bg-[#6EB56B] rounded-lg flex flex-col items-center justify-center p-6 text-white font-bold text-lg gap-2 shadow"
          >
            <span className="material-icons text-3xl">agriculture</span>
            Vacas
          </button>
          <button
            type="button"
            onClick={onViewReports}
            className="bg-[#6EB56B] rounded-lg flex flex-col items-center justify-center p-6 text-white font-bold text-lg gap-2 shadow"
          >
            <span className="material-icons text-3xl">description</span>
            Relatórios
          </button>
          <button
            type="button"
            onClick={onViewRegister}
            className="bg-[#6EB56B] rounded-lg flex flex-col items-center justify-center p-6 text-white font-bold text-lg gap-2 shadow"
          >
            <span className="material-icons text-3xl">add</span>
            Novo animal
          </button>
          <button
            type="button"
            onClick={onViewWeekly}
            className="bg-[#6EB56B] rounded-lg flex flex-col items-center justify-center p-6 text-white font-bold text-lg gap-2 shadow"
          >
            <span className="material-icons text-3xl">bar_chart</span>
            Dados da semana
          </button>
        </div>
      </div>
    </>
  );
}
