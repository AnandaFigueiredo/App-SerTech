export default function Alerts({ onBack }) {
  return (
    <>
      <div className="flex items-center gap-2 text-[#6EB56B]">
        <button type="button" onClick={onBack} className="material-icons" aria-label="Voltar">
          arrow_back
        </button>
        <h1 className="text-2xl font-bold text-[#1f2937]">Alertas</h1>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-[#FFF7D6] border-l-4 border-[#E0B84E] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="material-icons text-[#E0B84E]">warning</span>
          <p className="text-sm text-[#3f3f46]">Previsão de parto da vaca 100 para daqui 2 dias</p>
        </div>
        <div className="bg-[#FFF7D6] border-l-4 border-[#E0B84E] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="material-icons text-[#E0B84E]">warning</span>
          <p className="text-sm text-[#3f3f46]">Vaca 120 não se alimentou direito hoje</p>
        </div>
        <div className="bg-[#FFF7D6] border-l-4 border-[#E0B84E] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="material-icons text-[#E0B84E]">warning</span>
          <p className="text-sm text-[#3f3f46]">Produção baixa</p>
        </div>
        <div className="bg-[#FFF7D6] border-l-4 border-[#E0B84E] rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="material-icons text-[#E0B84E]">warning</span>
          <p className="text-sm text-[#3f3f46]">Previsão de secagem da vaca 100 para daqui 2 dias</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-2">Fim dos alertas</div>
      <div className="h-px bg-gray-200" />
    </>
  );
}
