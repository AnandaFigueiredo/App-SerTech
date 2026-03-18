export default function CowDetails({
  cowId,
  onBack,
  fertilizationDate,
  setFertilizationDate,
  addFertilization,
  fertilizations,
  updateFertilizationResult,
  removeFertilization,
  cowStatus,
  updateCowStatus,
  formatDateInput,
}) {
  return (
    <>
      <div className="flex items-center gap-2 text-[#6EB56B]">
        <button type="button" onClick={onBack} className="material-icons" aria-label="Voltar">
          arrow_back
        </button>
        <h1 className="text-2xl font-bold text-[#1f2937]">Vaca {cowId}</h1>
      </div>

      <div className="text-lg font-semibold">Alimentação</div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <svg viewBox="0 0 320 180" className="w-full h-40">
          <rect x="0" y="0" width="320" height="180" rx="8" fill="#F5F5F5" />
          <g stroke="#D1D5DB" strokeWidth="1">
            <line x1="24" y1="20" x2="24" y2="156" />
            <line x1="24" y1="156" x2="296" y2="156" />
            <line x1="24" y1="120" x2="296" y2="120" />
            <line x1="24" y1="84" x2="296" y2="84" />
            <line x1="24" y1="48" x2="296" y2="48" />
          </g>
          <polyline
            points="24,120 70,118 116,90 162,140 208,126 254,60 296,74"
            fill="none"
            stroke="#6EB56B"
            strokeWidth="3"
          />
          <g fill="#6EB56B">
            <circle cx="24" cy="120" r="3" />
            <circle cx="70" cy="118" r="3" />
            <circle cx="116" cy="90" r="3" />
            <circle cx="162" cy="140" r="3" />
            <circle cx="208" cy="126" r="3" />
            <circle cx="254" cy="60" r="3" />
            <circle cx="296" cy="74" r="3" />
          </g>
          <g fill="#6B7280" fontSize="9">
            <text x="24" y="170" textAnchor="middle">Seg</text>
            <text x="70" y="170" textAnchor="middle">Ter</text>
            <text x="116" y="170" textAnchor="middle">Qua</text>
            <text x="162" y="170" textAnchor="middle">Qui</text>
            <text x="208" y="170" textAnchor="middle">Sex</text>
            <text x="254" y="170" textAnchor="middle">Sab</text>
            <text x="296" y="170" textAnchor="middle">Dom</text>
          </g>
        </svg>
      </div>

      <div className="bg-[#FDEDED] rounded-xl p-4 shadow-sm">
        <div className="text-center font-semibold">Análise da IA</div>
        <p className="text-sm text-gray-700 mt-2">
          O gráfico mostra que a vaca está comendo cada vez menos ao longo da semana,
          apresentando uma queda visível no consumo diário de alimento. Esse padrão
          indica que o animal pode estar com perda de apetite.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">O que fazer?</span>
          <br />
          Observe o comportamento da vaca e verifique sinais de desconforto. Se o baixo consumo continuar,
          consulte um veterinário e avalie a qualidade da ração e da água.
        </p>
      </div>

      <div className="text-lg font-semibold">Reprodução</div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-sm text-gray-700">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
            <span>Status</span>
            <select
              value={cowStatus[cowId]}
              onChange={(e) => updateCowStatus(cowId, e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            >
              <option>Prenha</option>
              <option>Vazia</option>
              <option>Inseminada</option>
            </select>
          </div>
          <div className="rounded-lg border border-gray-200 px-3 py-2">
            <div className="text-xs text-gray-500">Próxima inseminação</div>
            <div className="font-semibold text-gray-800">15/09/2025</div>
          </div>
          <div className="rounded-lg border border-gray-200 px-3 py-2">
            <div className="text-xs text-gray-500">Quantidade de filhos</div>
            <div className="font-semibold text-gray-800">5</div>
          </div>
          <div className="rounded-lg border border-gray-200 px-3 py-2">
            <div className="text-xs text-gray-500">Último parto</div>
            <div className="font-semibold text-gray-800">15/02/2025</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="font-semibold">Filhos cadastrados</div>
          <div className="flex gap-2 mt-2">
            {['140','141','142','143','144'].map((id) => (
              <div key={id} className="px-3 py-1 rounded-lg border border-[#6EB56B] text-[#6EB56B] text-sm shadow-sm">{id}</div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="font-semibold">Fertilização</div>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              inputMode="numeric"
              placeholder="DD/MM/AAAA"
              value={fertilizationDate}
              onChange={(e) => setFertilizationDate(formatDateInput(e.target.value))}
              className="w-full sm:flex-1 h-10 rounded-md border border-gray-300 px-3 bg-white shadow-sm"
            />
            <button
              type="button"
              onClick={addFertilization}
              className="h-10 w-full sm:w-auto sm:min-w-[120px] border border-[#6EB56B] text-[#6EB56B] rounded-lg px-3 shadow-sm"
            >
              + Registrar
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {(fertilizations[cowId] || []).map((item, idx) => (
              <div key={`${item.date}-${idx}`} className="flex items-center justify-between gap-2 rounded-lg bg-[#F1FAF3] text-[#6EB56B] text-xs border border-[#6EB56B] px-3 py-2">
                <span>{item.date}</span>
                <div className="flex items-center gap-2">
                  <select
                    value={item.success || ""}
                    onChange={(e) => updateFertilizationResult(cowId, idx, e.target.value)}
                    className="rounded-md border border-[#6EB56B] bg-white px-2 py-1 text-xs text-[#6EB56B]"
                  >
                    <option value="" disabled>Resultado</option>
                    <option value="sim">Deu certo</option>
                    <option value="nao">Não deu</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeFertilization(cowId, idx)}
                    className="text-[#D46A6A]"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
