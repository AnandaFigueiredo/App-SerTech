export default function Urgent({ onBack }) {
  return (
    <>
      <div className="flex items-center gap-2 text-[#6EB56B]">
        <button type="button" onClick={onBack} className="material-icons" aria-label="Voltar">
          arrow_back
        </button>
        <h1 className="text-2xl font-bold text-[#1f2937]">Avisos de Urgência</h1>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-[#FDEDED] border-l-4 border-[#D46A6A] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="material-icons text-[#D46A6A]">report</span>
          <p className="text-sm text-[#3f3f46]">O parto da vaca 100 está previsto para hoje</p>
        </div>
        <div className="bg-[#FDEDED] border-l-4 border-[#D46A6A] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="material-icons text-[#D46A6A]">report</span>
          <p className="text-sm text-[#3f3f46]">Vaca 120 não se alimenta direito há 3 dias</p>
        </div>
        <div className="bg-[#FDEDED] border-l-4 border-[#D46A6A] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="material-icons text-[#D46A6A]">report</span>
          <p className="text-sm text-[#3f3f46]">Clima</p>
        </div>
        <div className="bg-[#FDEDED] border-l-4 border-[#D46A6A] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="material-icons text-[#D46A6A]">report</span>
          <p className="text-sm text-[#3f3f46]">Produção baixa</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-2">Fim dos avisos de urgência</div>
      <div className="h-px bg-gray-200" />
    </>
  );
}
