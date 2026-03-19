export default function Profile({ userEmail, planLabel, onLogout }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-[#6EB56B]">
        <span className="material-icons" aria-hidden="true">settings</span>
        <h1 className="text-2xl font-bold text-[#1f2937]">Perfil</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="text-sm text-gray-500">Email</div>
        <div className="text-lg font-semibold text-[#1f2937]">{userEmail || "-"}</div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="text-sm text-gray-500">Plano</div>
        <div className="text-lg font-semibold text-[#1f2937]">{planLabel}</div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-2 bg-[#E57373] text-white font-semibold py-2 rounded-xl shadow"
      >
        Sair
      </button>
    </div>
  );
}
