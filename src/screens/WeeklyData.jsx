const chartPoints = [
  { day: "Seg", value: 22 },
  { day: "Ter", value: 23 },
  { day: "Qua", value: 25 },
  { day: "Qui", value: 26 },
  { day: "Sex", value: 19 },
  { day: "Sab", value: 28 },
  { day: "Dom", value: 22 },
];

const highestIds = ["140", "141", "142", "143"];
const lowestIds = ["144", "145", "146", "147"];

const getPolyline = (points) => {
  const min = Math.min(...points.map((p) => p.value));
  const max = Math.max(...points.map((p) => p.value));
  const height = 150;
  const width = 320;
  const paddingX = 18;
  const paddingY = 18;
  const step = (width - paddingX * 2) / (points.length - 1);

  return points
    .map((point, index) => {
      const x = paddingX + step * index;
      const normalized = max === min ? 0.5 : (point.value - min) / (max - min);
      const y = paddingY + (1 - normalized) * (height - paddingY * 2);
      return `${x},${y}`;
    })
    .join(" ");
};

const getPointCoords = (points) => {
  const min = Math.min(...points.map((p) => p.value));
  const max = Math.max(...points.map((p) => p.value));
  const height = 150;
  const width = 320;
  const paddingX = 18;
  const paddingY = 18;
  const step = (width - paddingX * 2) / (points.length - 1);

  return points.map((point, index) => {
    const x = paddingX + step * index;
    const normalized = max === min ? 0.5 : (point.value - min) / (max - min);
    const y = paddingY + (1 - normalized) * (height - paddingY * 2);
    return { x, y, value: point.value, day: point.day };
  });
};

export default function WeeklyData({ onBack }) {
  const polyline = getPolyline(chartPoints);
  const pointCoords = getPointCoords(chartPoints);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-[#6EB56B]">
        <button type="button" onClick={onBack} className="material-icons" aria-label="Voltar">
          arrow_back
        </button>
        <h1 className="text-2xl font-bold text-[#1f2937]">Dados da Semana</h1>
      </div>

      <div className="text-lg font-semibold text-[#1f2937]">Produção Semanal</div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F5F9EE] rounded-2xl p-3 shadow-sm text-center border border-[#E4EAD8]">
          <div className="text-xs text-gray-600 font-semibold">Produção da Semana</div>
          <div className="text-lg font-bold text-[#1f2937]">1000 Litros</div>
        </div>
        <div className="bg-[#F5F9EE] rounded-2xl p-3 shadow-sm text-center border border-[#E4EAD8]">
          <div className="text-xs text-gray-600 font-semibold">Aumento de</div>
          <div className="text-sm font-semibold text-[#1f2937]">+20% em relação à semana anterior</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
        <svg viewBox="0 0 320 170" className="w-full h-44">
          <rect x="0" y="0" width="320" height="170" rx="10" fill="#F5F5F5" />
          <g stroke="#D1D5DB" strokeWidth="1">
            <line x1="18" y1="20" x2="18" y2="150" />
            <line x1="18" y1="150" x2="302" y2="150" />
            <line x1="18" y1="120" x2="302" y2="120" />
            <line x1="18" y1="90" x2="302" y2="90" />
            <line x1="18" y1="60" x2="302" y2="60" />
            <line x1="18" y1="30" x2="302" y2="30" />
          </g>
          <polyline points={polyline} fill="none" stroke="#6EB56B" strokeWidth="3" />
          {pointCoords.map((point) => (
            <g key={point.day}>
              <circle cx={point.x} cy={point.y} r="3.5" fill="#6EB56B" />
              <text x={point.x} y={point.y - 8} textAnchor="middle" fontSize="9" fill="#6B7280">
                {point.value}
              </text>
            </g>
          ))}
          <g fill="#6B7280" fontSize="9">
            {pointCoords.map((point) => (
              <text key={`${point.day}-label`} x={point.x} y="164" textAnchor="middle">
                {point.day}
              </text>
            ))}
          </g>
          <text x="10" y="16" fontSize="9" fill="#6B7280" transform="rotate(-90 10 16)">
            Produção (litros)
          </text>
        </svg>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="text-lg font-semibold text-[#1f2937]">Maiores Produções</div>
        <div className="mt-3 grid grid-cols-4 gap-3 text-center">
          {highestIds.map((id) => (
            <div key={id} className="rounded-xl border border-[#6EB56B] text-[#1f2937] py-2 shadow-sm">
              {id}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="text-lg font-semibold text-[#1f2937]">Menores Produções</div>
        <div className="mt-3 grid grid-cols-4 gap-3 text-center">
          {lowestIds.map((id) => (
            <div key={id} className="rounded-xl border border-[#6EB56B] text-[#1f2937] py-2 shadow-sm">
              {id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
