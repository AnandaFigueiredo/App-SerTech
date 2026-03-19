const severityStyles = {
  ok: {
    bg: "bg-[#F1FAF3]",
    border: "border-[#6EB56B]",
    text: "text-[#6EB56B]",
    icon: "check_circle",
    label: "Saudável",
  },
  critical: {
    bg: "bg-[#FDEDED]",
    border: "border-[#D46A6A]",
    text: "text-[#D46A6A]",
    icon: "report",
    label: "Crítico",
  },
  attention: {
    bg: "bg-[#FFF7D6]",
    border: "border-[#E0B84E]",
    text: "text-[#E0B84E]",
    icon: "warning",
    label: "Atenção",
  },
  pending: {
    bg: "bg-[#E8F3FF]",
    border: "border-[#6AA7D4]",
    text: "text-[#3B82C4]",
    icon: "hourglass_empty",
    label: "Sem dados",
  },
};

export default function Cows({ onBack, onViewDetails, onEditCow, cowStatus, cows, onRemoveCow }) {
  return (
    <>
      <div className="flex items-center gap-2 text-[#6EB56B]">
        <button type="button" onClick={onBack} className="material-icons" aria-label="Voltar">
          arrow_back
        </button>
        <h1 className="text-2xl font-bold text-[#1f2937]">Vacas</h1>
      </div>
      <div className="text-sm text-gray-600">Resumo dos animais cadastrados</div>

      <div className="flex flex-col gap-4">
        {(cows || []).map((cow) => {
          const style = severityStyles[cow.severity] || severityStyles.attention;
          return (
            <div key={cow.id} className={`${style.bg} border-l-4 ${style.border} rounded-xl p-4 shadow`}>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-3 ${style.text}`}>
                  <span className="text-4xl" role="img" aria-label="Vaca">
                    🐄
                  </span>
                  <div className="text-xs text-gray-500">Vaca</div>
                </div>
                <div className="text-lg font-semibold">{cow.id}</div>
                <div className={`flex flex-col items-center ${style.text}`}>
                  <span className="material-icons text-3xl">{style.icon}</span>
                  <span className="text-xs text-gray-500">{cow.severityLabel || style.label}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 text-center mt-3 text-sm text-gray-700">
                <div>
                  <div className="font-semibold">Peso</div>
                  <div>{cow.weight}</div>
                </div>
                <div>
                  <div className="font-semibold">Consumo</div>
                  <div>{cow.consumption}</div>
                </div>
                <div>
                  <div className="font-semibold">Produção</div>
                  <div>{cow.production}</div>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <div>Status: {cowStatus[cow.id]}</div>
                <div className="mt-2 flex items-center justify-between">
                  <button type="button" onClick={() => onViewDetails(cow.id)} className={style.text}>Ver Detalhes →</button>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => onEditCow(cow.id)} className="text-[#6EB56B]">Atualizar</button>
                    <button type="button" onClick={() => onRemoveCow(cow.id)} className="text-red-500">Remover</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
