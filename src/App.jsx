import { useState } from "react";
import Home from "./screens/Home.jsx";
import Alerts from "./screens/Alerts.jsx";
import Urgent from "./screens/Urgent.jsx";
import Register from "./screens/Register.jsx";
import Cows from "./screens/Cows.jsx";
import CowDetails from "./screens/CowDetails.jsx";
import WeeklyData from "./screens/WeeklyData.jsx";
import Reports from "./screens/Reports.jsx";
import Login from "./screens/Login.jsx";

export default function App() {
  const defaultCowStatus = {
    100: "Prenha",
    120: "Vazia",
    127: "Vazia",
  };

  const [view, setView] = useState("login");
  const [selectedCow, setSelectedCow] = useState("120");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [lastBirth, setLastBirth] = useState("");
  const [lastInsemination, setLastInsemination] = useState("");
  const [nameNumber, setNameNumber] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [reproStatus, setReproStatus] = useState("");
  const [nCrias, setNCrias] = useState("");
  const [fertilizationDate, setFertilizationDate] = useState("");
  const [cows, setCows] = useState([
    {
      id: "100",
      severity: "ok",
      severityLabel: "Saudável",
      weight: "700 kg",
      consumption: "20 kg",
      production: "30 litros",
    },
    {
      id: "120",
      severity: "critical",
      severityLabel: "Crítico",
      weight: "700 kg",
      consumption: "13 kg",
      production: "10 litros",
    },
    {
      id: "127",
      severity: "attention",
      severityLabel: "Atenção",
      weight: "700 kg",
      consumption: "17 kg",
      production: "28 litros",
    },
  ]);
  const [fertilizations, setFertilizations] = useState({
    100: [],
    120: [],
    127: [],
  });
  const [cowStatus, setCowStatus] = useState(defaultCowStatus);

  const goBack = () => setView("home");

  const formatDateInput = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);
    if (digits.length <= 2) return day;
    if (digits.length <= 4) return `${day}/${month}`;
    return `${day}/${month}/${year}`;
  };

  const addFertilization = () => {
    if (!fertilizationDate) return;
    setFertilizations((prev) => {
      const list = prev[selectedCow] || [];
      return {
        ...prev,
        [selectedCow]: [...list, { date: fertilizationDate, success: null }],
      };
    });
    setFertilizationDate("");
  };

  const removeFertilization = (cowId, index) => {
    setFertilizations((prev) => {
      const list = prev[cowId] || [];
      return {
        ...prev,
        [cowId]: list.filter((_, idx) => idx !== index),
      };
    });
  };

  const updateFertilizationResult = (cowId, index, value) => {
    setFertilizations((prev) => {
      const list = prev[cowId] || [];
      const updated = list.map((item, idx) =>
        idx === index ? { ...item, success: value } : item
      );
      return { ...prev, [cowId]: updated };
    });
    if (value === "sim") {
      setCowStatus((prev) => ({ ...prev, [cowId]: "Prenha" }));
    } else {
      setCowStatus((prev) => ({ ...prev, [cowId]: defaultCowStatus[cowId] }));
    }
  };

  const updateCowStatus = (cowId, value) => {
    setCowStatus((prev) => ({ ...prev, [cowId]: value }));
  };

  const addCow = () => {
    const id = nameNumber.trim();
    if (!id) return;
    const weightText = weight ? `${weight} kg` : "0 kg";
    setCows((prev) => [
      ...prev,
      {
        id,
        severity: "attention",
        severityLabel: "Atenção",
        weight: weightText,
        consumption: "0 kg",
        production: "0 litros",
      },
    ]);
    setCowStatus((prev) => ({ ...prev, [id]: reproStatus || "Vazia" }));
    setFertilizations((prev) => ({ ...prev, [id]: [] }));
    setSelectedCow(id);
    setView("cows");
    setNameNumber("");
    setBreed("");
    setWeight("");
    setReproStatus("");
    setNCrias("");
    setBirthDate("");
    setLastBirth("");
    setLastInsemination("");
  };

  const openCowDetails = (cowId) => {
    setSelectedCow(cowId);
    setView("cowDetails");
  };

  const removeCow = (cowId) => {
    setCows((prev) => prev.filter((cow) => cow.id !== cowId));
    setFertilizations((prev) => {
      const next = { ...prev };
      delete next[cowId];
      return next;
    });
    setCowStatus((prev) => {
      const next = { ...prev };
      delete next[cowId];
      return next;
    });
    if (selectedCow === cowId) {
      setSelectedCow("120");
    }
  };

  const removeCowWithConfirm = (cowId) => {
    const ok = window.confirm("Tem certeza que deseja remover esta vaca?");
    if (!ok) return;
    removeCow(cowId);
  };

  const isLogin = view === "login";

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6fa]">
      {!isLogin && (
        <div className="relative bg-[#6EB56B] flex items-center h-20 px-4 rounded-2xl">
          <div className="flex items-center h-full">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shadow overflow-hidden">
              <img src="/LogoBar.svg" alt="Logo da empresa" className="w-9 h-9 object-contain" />
            </div>
          </div>
          <div className="absolute right-18 top-1/2 -translate-y-1/2 flex items-center">
            <div className="relative">
              <span className="material-icons text-white text-3xl">notifications</span>
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs text-black rounded-full px-1">1</span>
            </div>
          </div>
          <div className="ml-auto flex items-center h-full">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
              <span className="material-icons text-agroGreen text-2xl">person</span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`flex-1 px-4 py-3 flex flex-col ${
          isLogin ? "items-center justify-center" : "gap-4"
        }`}
      >
        {view === "login" && <Login onLogin={() => setView("home")} />}

        {view === "home" && (
          <Home
            onViewAlerts={() => setView("alerts")}
            onViewUrgent={() => setView("urgent")}
            onViewCows={() => setView("cows")}
            onViewRegister={() => setView("register")}
            onViewWeekly={() => setView("weekly")}
            onViewReports={() => setView("reports")}
          />
        )}

        {view === "alerts" && <Alerts onBack={goBack} />}

        {view === "urgent" && <Urgent onBack={goBack} />}

        {view === "register" && (
          <Register
            onBack={goBack}
            onSubmit={addCow}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            lastBirth={lastBirth}
            setLastBirth={setLastBirth}
            lastInsemination={lastInsemination}
            setLastInsemination={setLastInsemination}
            nameNumber={nameNumber}
            setNameNumber={setNameNumber}
            breed={breed}
            setBreed={setBreed}
            weight={weight}
            setWeight={setWeight}
            reproStatus={reproStatus}
            setReproStatus={setReproStatus}
            nCrias={nCrias}
            setNCrias={setNCrias}
            formatDateInput={formatDateInput}
          />
        )}

        {view === "cows" && (
          <Cows
            onBack={goBack}
            onViewDetails={openCowDetails}
            cowStatus={cowStatus}
            cows={cows}
            onRemoveCow={removeCowWithConfirm}
          />
        )}

        {view === "cowDetails" && (
          <CowDetails
            cowId={selectedCow}
            onBack={() => setView("cows")}
            fertilizationDate={fertilizationDate}
            setFertilizationDate={setFertilizationDate}
            addFertilization={addFertilization}
            fertilizations={fertilizations}
            updateFertilizationResult={updateFertilizationResult}
            removeFertilization={removeFertilization}
            cowStatus={cowStatus}
            updateCowStatus={updateCowStatus}
            formatDateInput={formatDateInput}
          />
        )}

        {view === "weekly" && <WeeklyData onBack={goBack} />}

        {view === "reports" && <Reports onBack={goBack} />}
      </div>

      {isMenuOpen && view === "home" && (
        <div className="px-4 pb-2">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="grid grid-cols-4 gap-3 text-center text-xs text-gray-600">
              <button type="button" onClick={() => setView("cows")} className="flex flex-col items-center gap-1">
                <span className="material-icons text-[#6EB56B]">agriculture</span>
                Vacas
              </button>
              <button type="button" onClick={() => setView("reports")} className="flex flex-col items-center gap-1">
                <span className="material-icons text-[#6EB56B]">description</span>
                Relatórios
              </button>
              <button type="button" onClick={() => setView("register")} className="flex flex-col items-center gap-1">
                <span className="material-icons text-[#6EB56B]">add</span>
                Novo
              </button>
              <button type="button" onClick={() => setView("weekly")} className="flex flex-col items-center gap-1">
                <span className="material-icons text-[#6EB56B]">bar_chart</span>
                Semana
              </button>
            </div>
          </div>
        </div>
      )}

      {!isLogin && (
        <nav className="bg-[#6EB56B] px-6 py-2 flex justify-between items-center text-white text-xs rounded-t-2xl">
          <button
            type="button"
            onClick={() => {
              setView("home");
              setIsMenuOpen(false);
            }}
            className="flex flex-col items-center flex-1"
          >
            <span className="material-icons">home</span>
            Home
          </button>
          <button type="button" onClick={() => setIsMenuOpen((prev) => !prev)} className="flex flex-col items-center flex-1">
            <span className="material-icons">menu</span>
            Menu
          </button>
          <button type="button" className="flex flex-col items-center flex-1">
            <span className="material-icons">settings</span>
            Suporte
          </button>
        </nav>
      )}
    </div>
  );
}
