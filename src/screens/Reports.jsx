const reportsTree = [
  {
    year: "2026",
    months: [
      { name: "Janeiro", folders: ["Produção", "Saúde", "Reprodução", "Alimentação"] },
      { name: "Fevereiro", folders: ["Produção", "Saúde", "Reprodução", "Alimentação"] },
      { name: "Março", folders: ["Produção", "Saúde", "Reprodução", "Alimentação"] },
    ],
  },
  {
    year: "2025",
    months: [
      { name: "Outubro", folders: ["Produção", "Saúde", "Reprodução", "Alimentação"] },
      { name: "Novembro", folders: ["Produção", "Saúde", "Reprodução", "Alimentação"] },
      { name: "Dezembro", folders: ["Produção", "Saúde", "Reprodução", "Alimentação"] },
    ],
  },
];

const quickFilters = ["7 dias", "30 dias", "90 dias", "Somente alertas"];

export default function Reports({ onBack }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-[#6EB56B]">
        <button type="button" onClick={onBack} className="material-icons" aria-label="Voltar">
          arrow_back
        </button>
        <h1 className="text-2xl font-bold text-[#1f2937]">Relatórios</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-2 rounded-xl border border-[#D6E8D5] bg-[#F1FAF3] px-3 py-2">
          <span className="material-icons text-[#6EB56B]">search</span>
          <input
            type="text"
            placeholder="Buscar por vaca, data, palavra-chave"
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {quickFilters.map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-[#6EB56B] px-3 py-1 text-xs text-[#1f2937] shadow-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="text-lg font-semibold text-[#1f2937]">Resumo do Mês</div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-[#E4EAD8] bg-[#F5F9EE] p-3 text-center">
            <div className="text-xs text-gray-600">Litros totais</div>
            <div className="text-lg font-semibold text-[#1f2937]">12.430</div>
          </div>
          <div className="rounded-xl border border-[#E4EAD8] bg-[#F5F9EE] p-3 text-center">
            <div className="text-xs text-gray-600">Média por vaca</div>
            <div className="text-lg font-semibold text-[#1f2937]">24 L/dia</div>
          </div>
          <div className="rounded-xl border border-[#E4EAD8] bg-[#F5F9EE] p-3 text-center">
            <div className="text-xs text-gray-600">Top 3 produção</div>
            <div className="text-lg font-semibold text-[#1f2937]">140, 141, 142</div>
          </div>
          <div className="rounded-xl border border-[#E4EAD8] bg-[#F5F9EE] p-3 text-center">
            <div className="text-xs text-gray-600">Piores 3</div>
            <div className="text-lg font-semibold text-[#1f2937]">144, 145, 146</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {reportsTree.map((year) => (
          <div key={year.year} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-[#1f2937]">{year.year}</div>
              <span className="material-icons text-[#6EB56B]">folder</span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3">
              {year.months.map((month) => (
                <div key={month.name} className="rounded-xl border border-[#E6EFE5] bg-[#F7FBF7] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-[#6EB56B]">folder_open</span>
                      <span className="font-semibold text-[#1f2937]">{month.name}</span>
                    </div>
                    <button type="button" className="text-xs text-[#6EB56B]">Abrir</button>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    {month.folders.map((folder) => (
                      <div
                        key={`${month.name}-${folder}`}
                        className="flex items-center gap-2 rounded-lg border border-[#D6E8D5] bg-white px-2 py-2 text-[#1f2937]"
                      >
                        <span className="material-icons text-[#6EB56B] text-base">description</span>
                        {folder}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="text-lg font-semibold text-[#1f2937]">Ações rápidas</div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
          <button type="button" className="rounded-xl border border-[#6EB56B] py-2 text-[#1f2937] shadow-sm">
            Abrir
          </button>
          <button type="button" className="rounded-xl border border-[#6EB56B] py-2 text-[#1f2937] shadow-sm">
            PDF
          </button>
          <button type="button" className="rounded-xl border border-[#6EB56B] py-2 text-[#1f2937] shadow-sm">
            CSV
          </button>
        </div>
      </div>
    </div>
  );
}
