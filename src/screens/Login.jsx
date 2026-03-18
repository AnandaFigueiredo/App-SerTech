
export default function Login({ onLogin }) {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/LogoInicio.svg"
            alt="Logo do app"
            className="w-40 h-40 object-contain"
          />
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1f2937]">Bem-vindo</div>
            <div className="text-sm text-gray-500">Acesse para acompanhar seu rebanho</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <label className="text-sm text-gray-600">
            Email
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 bg-white shadow-sm"
            />
          </label>
          <label className="text-sm text-gray-600">
            Senha
            <input
              type="password"
              placeholder="********"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 bg-white shadow-sm"
            />
          </label>
          <button type="button" className="self-end text-xs text-[#6EB56B]">
            Esqueci minha senha
          </button>
        </div>

        <button
          type="button"
          onClick={onLogin}
          className="mt-6 w-full bg-[#6EB56B] text-white font-semibold py-2 rounded-xl shadow"
        >
          Entrar
        </button>

        <div className="mt-4 text-center text-xs text-gray-500">
          Nao tem conta? Fale com o suporte.
        </div>
      </div>
    </div>
  );
}
